from __future__ import annotations

from pathlib import Path
from typing import Any

from ultralytics import YOLO

from drishti.config import DetectionSettings, PERSON_CLASS_NAMES, WEAPON_CLASS_NAMES


def load_model(weights: str | Path) -> YOLO:
    return YOLO(str(weights))


def detections_from_result(result: Any) -> list[dict[str, Any]]:
    names = result.names
    detections: list[dict[str, Any]] = []

    for box in result.boxes:
        class_id = int(box.cls[0].item())
        confidence = float(box.conf[0].item())
        xyxy = [float(value) for value in box.xyxy[0].tolist()]
        class_name = names.get(class_id, str(class_id))
        detections.append(
            {
                "class_id": class_id,
                "class_name": class_name,
                "confidence": confidence,
                "box": xyxy,
            }
        )

    return detections


def classify_risk(detections: list[dict[str, Any]]) -> str:
    has_weapon = any(item["class_name"].lower() in WEAPON_CLASS_NAMES for item in detections)
    has_person = any(item["class_name"].lower() in PERSON_CLASS_NAMES for item in detections)

    if has_weapon and has_person:
        return "critical"
    if has_weapon:
        return "high"
    if has_person:
        return "low"
    return "none"


def predict(model: YOLO, source: object, settings: DetectionSettings) -> tuple[Any, list[dict[str, Any]], str]:
    results = model.predict(
        source=source,
        conf=settings.confidence_threshold,
        iou=settings.iou_threshold,
        imgsz=settings.image_size,
        verbose=False,
    )
    result = results[0]
    detections = detections_from_result(result)
    risk_level = classify_risk(detections)
    annotated = result.plot()
    return annotated, detections, risk_level

