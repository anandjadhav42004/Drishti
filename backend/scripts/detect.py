from __future__ import annotations

import argparse
from pathlib import Path

import cv2

from drishti.alerts import build_alert_event, save_alert, send_webhook
from drishti.config import DetectionSettings, PREDICTION_DIR
from drishti.inference import load_model, predict
from drishti.preprocess import is_image_source, iter_video_frames


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Run Drishti detection on an image or video.")
    parser.add_argument("--weights", required=True, help="Path to trained YOLO weights.")
    parser.add_argument("--source", required=True, help="Image, video, webcam index, or stream URL.")
    parser.add_argument("--conf", type=float, default=0.35, help="Confidence threshold.")
    parser.add_argument("--iou", type=float, default=0.45, help="IoU threshold.")
    parser.add_argument("--imgsz", type=int, default=640, help="Inference image size.")
    parser.add_argument("--frame-stride", type=int, default=5, help="Process every Nth frame for videos.")
    parser.add_argument("--webhook-url", default=None, help="Optional alert webhook URL.")
    return parser.parse_args()


def run_image(source: str, weights: str, settings: DetectionSettings) -> None:
    model = load_model(weights)
    annotated, detections, risk_level = predict(model, source, settings)

    PREDICTION_DIR.mkdir(parents=True, exist_ok=True)
    output_path = PREDICTION_DIR / f"{Path(source).stem}_prediction.jpg"
    cv2.imwrite(str(output_path), annotated)

    event = build_alert_event(source, detections, risk_level)
    if risk_level in {"high", "critical"} and settings.save_alerts:
        save_alert(annotated, event)
        send_webhook(event, settings.webhook_url)

    print(f"risk={risk_level} detections={len(detections)} output={output_path}")


def run_video(source: str, weights: str, settings: DetectionSettings, frame_stride: int) -> None:
    model = load_model(weights)
    processed = 0
    alert_count = 0

    for frame_index, frame in iter_video_frames(source, frame_stride=frame_stride):
        annotated, detections, risk_level = predict(model, frame, settings)
        processed += 1

        if risk_level in {"high", "critical"}:
            alert_count += 1
            event = build_alert_event(f"{source}#frame={frame_index}", detections, risk_level)
            if settings.save_alerts:
                save_alert(annotated, event)
            send_webhook(event, settings.webhook_url)

    print(f"processed_frames={processed} alerts={alert_count}")


def main() -> None:
    args = parse_args()
    settings = DetectionSettings(
        confidence_threshold=args.conf,
        iou_threshold=args.iou,
        image_size=args.imgsz,
        webhook_url=args.webhook_url,
    )

    if is_image_source(args.source):
        run_image(args.source, args.weights, settings)
    else:
        run_video(args.source, args.weights, settings, args.frame_stride)


if __name__ == "__main__":
    main()

