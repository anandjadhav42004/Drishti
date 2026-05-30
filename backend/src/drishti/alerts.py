from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

import cv2
import requests

from drishti.config import ALERT_DIR


def build_alert_event(source: str, detections: list[dict[str, Any]], risk_level: str) -> dict[str, Any]:
    return {
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "source": source,
        "risk_level": risk_level,
        "detections": detections,
    }


def save_alert(frame: object, event: dict[str, Any], output_dir: Path = ALERT_DIR) -> tuple[Path, Path]:
    output_dir.mkdir(parents=True, exist_ok=True)
    stamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    image_path = output_dir / f"alert_{stamp}.jpg"
    json_path = output_dir / f"alert_{stamp}.json"

    cv2.imwrite(str(image_path), frame)
    json_path.write_text(json.dumps(event, indent=2), encoding="utf-8")
    return image_path, json_path


def send_webhook(event: dict[str, Any], webhook_url: str | None) -> None:
    if not webhook_url:
        return
    response = requests.post(webhook_url, json=event, timeout=10)
    response.raise_for_status()

