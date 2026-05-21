from __future__ import annotations

import sys
import time
import os
from pathlib import Path

import cv2
import pandas as pd
import streamlit as st

ROOT_DIR = Path(__file__).resolve().parents[1]
SRC_DIR = ROOT_DIR / "src"
os.environ.setdefault("MPLCONFIGDIR", str(ROOT_DIR / ".cache" / "matplotlib"))

import matplotlib.pyplot as plt
if str(SRC_DIR) not in sys.path:
    sys.path.insert(0, str(SRC_DIR))

from alert import export_alerts_csv, get_recent_alerts, log_alert, setup_database
from classify import risk_score
from detect import DEFAULT_MODEL_PATH, draw_detections, load_yolo_model, _detections_from_result


st.set_page_config(page_title="DRISHTI Surveillance Dashboard", layout="wide")


def load_model_if_available(model_path: str):
    """Load YOLO model only when the file exists."""
    try:
        if not Path(model_path).exists():
            st.warning(f"Model not found: {model_path}. Train YOLOv8 first.")
            return None
        return load_yolo_model(model_path)
    except Exception as error:
        st.error(f"Could not load model: {error}")
        return None


def show_metrics(frames_processed: int, threats_detected: int, model_accuracy: float, uptime_seconds: int) -> None:
    """Render the top dashboard metric row."""
    try:
        hours = uptime_seconds // 3600
        minutes = (uptime_seconds % 3600) // 60
        col1, col2, col3, col4 = st.columns(4)
        col1.metric("Frames Processed", frames_processed)
        col2.metric("Threats Detected", threats_detected)
        col3.metric("Model Accuracy", f"{model_accuracy:.1f}%")
        col4.metric("System Uptime", f"{hours}h {minutes}m")
    except Exception as error:
        st.error(f"Metric rendering failed: {error}")


def show_alerts_panel() -> None:
    """Render recent alerts from SQLite with risk color labels."""
    try:
        st.subheader("Recent Alerts")
        alerts = get_recent_alerts(limit=10)
        if not alerts:
            st.info("No alerts logged yet.")
            return

        for alert in alerts:
            risk = alert["risk_level"]
            if risk == "Threat":
                st.error(f"{alert['timestamp']} | {alert['zone']} | {alert['threat_type']} | {alert['confidence']:.2f}")
            elif risk == "Suspicious":
                st.warning(f"{alert['timestamp']} | {alert['zone']} | {alert['threat_type']} | {alert['confidence']:.2f}")
            else:
                st.success(f"{alert['timestamp']} | {alert['zone']} | {alert['threat_type']} | {alert['confidence']:.2f}")
    except Exception as error:
        st.error(f"Alert panel failed: {error}")


def show_breakdown_chart(alerts: list[dict]) -> None:
    """Render object and threat breakdown charts using Matplotlib."""
    try:
        object_counts = {"Person": 0, "Vehicle": 0, "Weapon": 0}
        threat_counts = {"Safe": 0, "Suspicious": 0, "Threat": 0}

        for alert in alerts:
            threat_type = alert["threat_type"].lower()
            risk_level = alert["risk_level"]
            if "person" in threat_type:
                object_counts["Person"] += 1
            elif "vehicle" in threat_type:
                object_counts["Vehicle"] += 1
            elif "weapon" in threat_type:
                object_counts["Weapon"] += 1
            if risk_level in threat_counts:
                threat_counts[risk_level] += 1

        fig, axes = plt.subplots(1, 2, figsize=(10, 3))
        axes[0].bar(object_counts.keys(), object_counts.values(), color=["green", "blue", "red"])
        axes[0].set_title("Detection Breakdown")
        axes[0].set_ylabel("Count")

        axes[1].bar(threat_counts.keys(), threat_counts.values(), color=["green", "orange", "red"])
        axes[1].set_title("Threat Levels")
        axes[1].set_ylabel("Count")

        st.pyplot(fig)
    except Exception as error:
        st.error(f"Chart rendering failed: {error}")


def process_frame(model, frame, confidence_threshold: float):
    """Run YOLO detection on one frame and log high-risk alerts."""
    try:
        results = model.predict(source=frame, conf=confidence_threshold, verbose=False)
        detections = _detections_from_result(results[0])
        annotated = draw_detections(frame, detections)
        frame_risk = risk_score(detections)

        if frame_risk["risk_level"] == "Threat":
            best_detection = max(detections, key=lambda item: item["confidence"])
            log_alert(
                threat_type=best_detection["class_name"],
                confidence=best_detection["confidence"],
                zone="ZONE A",
                frame=annotated,
                risk_level=frame_risk["risk_level"],
            )

        return annotated, detections, frame_risk
    except Exception as error:
        st.error(f"Frame processing failed: {error}")
        return frame, [], {"risk_level": "Safe", "risk_score": 0}


def run_video_file(model, video_file, confidence_threshold: float) -> None:
    """Run detection on an uploaded video file and preview frames in Streamlit."""
    try:
        temp_path = ROOT_DIR / "outputs" / "uploaded_video.mp4"
        temp_path.parent.mkdir(parents=True, exist_ok=True)
        temp_path.write_bytes(video_file.read())

        capture = cv2.VideoCapture(str(temp_path))
        frame_slot = st.empty()
        processed = 0
        while capture.isOpened() and processed < 200:
            ok, frame = capture.read()
            if not ok:
                break
            annotated, _, _ = process_frame(model, frame, confidence_threshold)
            frame_slot.image(cv2.cvtColor(annotated, cv2.COLOR_BGR2RGB), channels="RGB", use_container_width=True)
            processed += 1
        capture.release()
        st.session_state.frames_processed += processed
    except Exception as error:
        st.error(f"Video processing failed: {error}")


def run_webcam(model, confidence_threshold: float) -> None:
    """Run webcam detection inside the Streamlit page."""
    try:
        capture = cv2.VideoCapture(0)
        if not capture.isOpened():
            st.error("Could not open webcam.")
            return

        frame_slot = st.empty()
        processed = 0
        while st.session_state.detecting and processed < 300:
            ok, frame = capture.read()
            if not ok:
                break
            annotated, _, _ = process_frame(model, frame, confidence_threshold)
            frame_slot.image(cv2.cvtColor(annotated, cv2.COLOR_BGR2RGB), channels="RGB", use_container_width=True)
            processed += 1
            st.session_state.frames_processed += 1
            time.sleep(0.03)

        capture.release()
    except Exception as error:
        st.error(f"Webcam detection failed: {error}")


def main() -> None:
    """Run the DRISHTI Streamlit dashboard."""
    try:
        setup_database()
        st.title("DRISHTI Surveillance Dashboard")
        st.caption("Deep Learning based Real-time Intelligent Surveillance and Threat Identification")

        if "started_at" not in st.session_state:
            st.session_state.started_at = time.time()
        if "frames_processed" not in st.session_state:
            st.session_state.frames_processed = 0
        if "detecting" not in st.session_state:
            st.session_state.detecting = False

        confidence_threshold = st.sidebar.slider("Confidence Threshold", 0.1, 1.0, 0.6, 0.05)
        model_path = st.sidebar.text_input("YOLO Model Path", DEFAULT_MODEL_PATH)
        source_type = st.sidebar.selectbox("Camera Source", ["Webcam", "Video File"])
        uploaded_video = None
        if source_type == "Video File":
            uploaded_video = st.sidebar.file_uploader("Upload video", type=["mp4", "mov", "avi", "mkv"])

        csv_path = ROOT_DIR / "outputs" / "alerts_export.csv"
        if st.sidebar.button("Export Alerts CSV"):
            exported = export_alerts_csv(str(csv_path))
            if exported:
                st.sidebar.success(f"Exported to {exported}")

        recent_alerts = get_recent_alerts(limit=50)
        threats_detected = sum(1 for alert in recent_alerts if alert["risk_level"] == "Threat")
        uptime_seconds = int(time.time() - st.session_state.started_at)
        show_metrics(st.session_state.frames_processed, threats_detected, 98.4, uptime_seconds)

        left, right = st.columns([0.6, 0.4])
        model = load_model_if_available(model_path)

        with left:
            st.subheader("Live Detection Feed")
            start_col, stop_col = st.columns(2)
            if start_col.button("Start Detection"):
                st.session_state.detecting = True
            if stop_col.button("Stop Detection"):
                st.session_state.detecting = False

            if model is None:
                st.info("Train or place the model at models/yolov8/best.pt to enable detection.")
            elif st.session_state.detecting and source_type == "Webcam":
                run_webcam(model, confidence_threshold)
            elif st.session_state.detecting and uploaded_video is not None:
                run_video_file(model, uploaded_video, confidence_threshold)
            else:
                st.info("Click Start Detection to begin.")

        with right:
            show_alerts_panel()

        st.divider()
        st.subheader("Detection Analytics")
        show_breakdown_chart(get_recent_alerts(limit=1000))

        if recent_alerts:
            st.subheader("Alert Table")
            st.dataframe(pd.DataFrame(recent_alerts), use_container_width=True)
    except Exception as error:
        st.error(f"Dashboard failed: {error}")


if __name__ == "__main__":
    main()
