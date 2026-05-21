from __future__ import annotations

import tempfile
from pathlib import Path

import cv2
import streamlit as st
from PIL import Image

from drishti.alerts import build_alert_event, save_alert
from drishti.config import DetectionSettings
from drishti.inference import load_model, predict


st.set_page_config(page_title="Drishti", layout="wide")

st.title("Drishti")

with st.sidebar:
    weights = st.text_input("YOLO weights", "yolov8n.pt")
    confidence = st.slider("Confidence", 0.05, 0.95, 0.35, 0.05)
    iou = st.slider("IoU", 0.05, 0.95, 0.45, 0.05)
    image_size = st.selectbox("Image size", [416, 512, 640, 768, 1024], index=2)
    save_alerts = st.checkbox("Save high-risk alerts", value=True)

settings = DetectionSettings(
    confidence_threshold=confidence,
    iou_threshold=iou,
    image_size=image_size,
    save_alerts=save_alerts,
)

uploaded_file = st.file_uploader("Upload image", type=["jpg", "jpeg", "png", "webp"])

if uploaded_file:
    with tempfile.NamedTemporaryFile(delete=False, suffix=Path(uploaded_file.name).suffix) as temp_file:
        temp_file.write(uploaded_file.getbuffer())
        temp_path = Path(temp_file.name)

    model = load_model(weights)
    annotated, detections, risk_level = predict(model, str(temp_path), settings)
    annotated_rgb = cv2.cvtColor(annotated, cv2.COLOR_BGR2RGB)

    left, right = st.columns([2, 1])
    with left:
        st.image(Image.fromarray(annotated_rgb), use_container_width=True)
    with right:
        st.metric("Risk", risk_level.upper())
        st.metric("Detections", len(detections))
        st.dataframe(detections, use_container_width=True)

        if risk_level in {"high", "critical"} and settings.save_alerts:
            event = build_alert_event(uploaded_file.name, detections, risk_level)
            image_path, json_path = save_alert(annotated, event)
            st.warning(f"Alert saved: {image_path.name}, {json_path.name}")
else:
    st.info("Upload an image to run detection.")

