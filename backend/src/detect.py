from __future__ import annotations

import argparse
import os
from pathlib import Path
from typing import Any

os.environ.setdefault("MPLCONFIGDIR", str(Path(".cache/matplotlib").resolve()))

import cv2
from ultralytics import YOLO


DEFAULT_MODEL_PATH = "models/yolov8/best.pt"
CLASS_COLORS = {"person": (0, 255, 0), "weapon": (0, 0, 255)}


def load_yolo_model(model_path: str = DEFAULT_MODEL_PATH) -> YOLO:
    """Load the trained YOLOv8 model from disk."""
    try:
        path = Path(model_path)
        if not path.exists():
            raise FileNotFoundError(f"Model not found: {path}. Train first or pass --model.")
        print(f"Loading YOLO model: {path}")
        return YOLO(str(path))
    except Exception as error:
        print(f"load_yolo_model failed: {error}")
        raise


def _detections_from_result(result: Any) -> list[dict[str, Any]]:
    """Convert Ultralytics result boxes into simple dictionaries."""
    detections: list[dict[str, Any]] = []
    try:
        names = result.names
        for box in result.boxes:
            class_id = int(box.cls[0].item())
            class_name = names.get(class_id, str(class_id))
            confidence = float(box.conf[0].item())
            x1, y1, x2, y2 = [int(value) for value in box.xyxy[0].tolist()]
            detections.append(
                {
                    "class_id": class_id,
                    "class_name": class_name,
                    "confidence": confidence,
                    "bbox": [x1, y1, x2, y2],
                }
            )
    except Exception as error:
        print(f"_detections_from_result failed: {error}")
    return detections


def draw_detections(image, detections: list[dict[str, Any]]):
    """Draw green boxes for persons and red boxes for weapons."""
    try:
        annotated = image.copy()
        for detection in detections:
            class_name = detection["class_name"].lower()
            confidence = detection["confidence"]
            x1, y1, x2, y2 = detection["bbox"]
            color = CLASS_COLORS.get(class_name, (255, 255, 0))
            label = f"{class_name} {confidence:.2f}"

            cv2.rectangle(annotated, (x1, y1), (x2, y2), color, 2)
            cv2.putText(
                annotated,
                label,
                (x1, max(y1 - 8, 20)),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.6,
                color,
                2,
                cv2.LINE_AA,
            )
        return annotated
    except Exception as error:
        print(f"draw_detections failed: {error}")
        return image


def detect_image(image_path: str, conf_threshold: float = 0.6, model_path: str = DEFAULT_MODEL_PATH):
    """Run YOLOv8 on one image and return annotated image plus detections."""
    try:
        image = cv2.imread(str(image_path))
        if image is None:
            raise ValueError(f"Could not read image: {image_path}")

        model = load_yolo_model(model_path)
        results = model.predict(source=image, conf=conf_threshold, verbose=False)
        detections = _detections_from_result(results[0])
        annotated = draw_detections(image, detections)
        print(f"Detected {len(detections)} objects in {image_path}")
        return annotated, detections
    except Exception as error:
        print(f"detect_image failed: {error}")
        return None, []


def detect_frame(frame, conf_threshold: float = 0.6, model_path: str = DEFAULT_MODEL_PATH):
    """Run YOLOv8 on one OpenCV frame."""
    try:
        model = load_yolo_model(model_path)
        results = model.predict(source=frame, conf=conf_threshold, verbose=False)
        detections = _detections_from_result(results[0])
        annotated = draw_detections(frame, detections)
        return annotated, detections
    except Exception as error:
        print(f"detect_frame failed: {error}")
        return frame, []


def detect_video(
    video_path: str,
    output_path: str,
    conf_threshold: float = 0.6,
    model_path: str = DEFAULT_MODEL_PATH,
) -> int:
    """Run detection on a video file and save an annotated output video."""
    try:
        model = load_yolo_model(model_path)
        capture = cv2.VideoCapture(str(video_path))
        if not capture.isOpened():
            raise ValueError(f"Could not open video: {video_path}")

        width = int(capture.get(cv2.CAP_PROP_FRAME_WIDTH))
        height = int(capture.get(cv2.CAP_PROP_FRAME_HEIGHT))
        fps = capture.get(cv2.CAP_PROP_FPS) or 25
        Path(output_path).parent.mkdir(parents=True, exist_ok=True)

        writer = cv2.VideoWriter(
            str(output_path),
            cv2.VideoWriter_fourcc(*"mp4v"),
            fps,
            (width, height),
        )

        frame_count = 0
        while True:
            ok, frame = capture.read()
            if not ok:
                break

            results = model.predict(source=frame, conf=conf_threshold, verbose=False)
            detections = _detections_from_result(results[0])
            annotated = draw_detections(frame, detections)
            writer.write(annotated)
            frame_count += 1

        capture.release()
        writer.release()
        print(f"Saved annotated video to {output_path}; processed {frame_count} frames")
        return frame_count
    except Exception as error:
        print(f"detect_video failed: {error}")
        return 0


def detect_webcam(conf_threshold: float = 0.6, model_path: str = DEFAULT_MODEL_PATH) -> None:
    """Open webcam and run real-time detection until Q is pressed."""
    try:
        model = load_yolo_model(model_path)
        capture = cv2.VideoCapture(0)
        if not capture.isOpened():
            raise ValueError("Could not open webcam")

        print("Webcam detection started. Press Q to quit.")
        while True:
            ok, frame = capture.read()
            if not ok:
                print("Could not read webcam frame")
                break

            results = model.predict(source=frame, conf=conf_threshold, verbose=False)
            detections = _detections_from_result(results[0])
            annotated = draw_detections(frame, detections)
            cv2.imshow("DRISHTI Webcam Detection", annotated)

            if cv2.waitKey(1) & 0xFF == ord("q"):
                break

        capture.release()
        cv2.destroyAllWindows()
    except Exception as error:
        print(f"detect_webcam failed: {error}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Run DRISHTI YOLOv8 detection")
    parser.add_argument("--model", default=DEFAULT_MODEL_PATH, help="Path to YOLO model")
    parser.add_argument("--image", default=None, help="Image path")
    parser.add_argument("--video", default=None, help="Video path")
    parser.add_argument("--output", default="outputs/predictions/output.mp4", help="Output path")
    parser.add_argument("--conf", type=float, default=0.6, help="Confidence threshold")
    parser.add_argument("--webcam", action="store_true", help="Run webcam detection")
    args = parser.parse_args()

    if args.image:
        annotated_image, image_detections = detect_image(args.image, args.conf, args.model)
        if annotated_image is not None:
            output_file = Path("outputs/predictions") / f"{Path(args.image).stem}_detected.jpg"
            output_file.parent.mkdir(parents=True, exist_ok=True)
            cv2.imwrite(str(output_file), annotated_image)
            print(f"Saved image output to {output_file}")
            print(image_detections)
    elif args.video:
        detect_video(args.video, args.output, args.conf, args.model)
    elif args.webcam:
        detect_webcam(args.conf, args.model)
    else:
        print("Pass --image, --video, or --webcam")
