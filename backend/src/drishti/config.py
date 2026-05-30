from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path


ROOT_DIR = Path(__file__).resolve().parents[2]
OUTPUT_DIR = ROOT_DIR / "outputs"
ALERT_DIR = OUTPUT_DIR / "alerts"
PREDICTION_DIR = OUTPUT_DIR / "predictions"

PERSON_CLASS_NAMES = {"person"}
WEAPON_CLASS_NAMES = {"weapon", "gun", "knife", "pistol", "rifle"}


@dataclass(frozen=True)
class DetectionSettings:
    confidence_threshold: float = 0.35
    iou_threshold: float = 0.45
    image_size: int = 640
    save_alerts: bool = True
    webhook_url: str | None = None

