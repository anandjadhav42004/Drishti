from __future__ import annotations

import argparse
from pathlib import Path
from typing import Any

import cv2
import torch
from PIL import Image
from torchvision import models


DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
THREAT_KEYWORDS = {
    "rifle",
    "assault rifle",
    "revolver",
    "pistol",
    "knife",
    "projectile",
    "missile",
}
SUSPICIOUS_KEYWORDS = {"military uniform", "holster", "mask", "backpack", "truck", "jeep"}


def load_resnet50():
    """Load pretrained ResNet-50 and its preprocessing transforms."""
    try:
        weights = models.ResNet50_Weights.DEFAULT
        model = models.resnet50(weights=weights)
        model.eval()
        model.to(DEVICE)
        preprocess = weights.transforms()
        categories = weights.meta["categories"]
        print(f"Loaded ResNet-50 on {DEVICE}")
        return model, preprocess, categories
    except Exception as error:
        print(f"load_resnet50 failed: {error}")
        raise


def crop_detection(image, bbox: list[int]):
    """Crop detected object from an OpenCV image using [x1, y1, x2, y2]."""
    try:
        height, width = image.shape[:2]
        x1, y1, x2, y2 = bbox
        x1 = max(0, min(x1, width - 1))
        x2 = max(0, min(x2, width))
        y1 = max(0, min(y1, height - 1))
        y2 = max(0, min(y2, height))

        if x2 <= x1 or y2 <= y1:
            raise ValueError(f"Invalid bounding box: {bbox}")

        cropped = image[y1:y2, x1:x2]
        print(f"Cropped object with bbox: {bbox}")
        return cropped
    except Exception as error:
        print(f"crop_detection failed: {error}")
        return None


def classify_threat(cropped_image) -> tuple[str, float]:
    """Classify cropped object with ResNet-50 and return threat level plus confidence."""
    try:
        if cropped_image is None:
            raise ValueError("Empty cropped image received")

        model, preprocess, categories = load_resnet50()
        rgb_image = cv2.cvtColor(cropped_image, cv2.COLOR_BGR2RGB)
        pil_image = Image.fromarray(rgb_image)
        tensor = preprocess(pil_image).unsqueeze(0).to(DEVICE)

        with torch.no_grad():
            probabilities = torch.nn.functional.softmax(model(tensor)[0], dim=0)

        confidence, class_index = torch.max(probabilities, dim=0)
        label = categories[int(class_index)].lower()
        score = float(confidence.item())

        if any(keyword in label for keyword in THREAT_KEYWORDS):
            threat_level = "Threat"
        elif any(keyword in label for keyword in SUSPICIOUS_KEYWORDS):
            threat_level = "Suspicious"
        else:
            threat_level = "Safe"

        print(f"ResNet-50 classified crop as {label} with {score:.2f}; level={threat_level}")
        return threat_level, score
    except Exception as error:
        print(f"classify_threat failed: {error}")
        return "Safe", 0.0


def risk_score(detections: list[dict[str, Any]]) -> dict[str, Any]:
    """Calculate overall frame risk from YOLO detections."""
    try:
        has_weapon = any(d.get("class_name", "").lower() == "weapon" for d in detections)
        has_person = any(d.get("class_name", "").lower() == "person" for d in detections)
        max_confidence = max((float(d.get("confidence", 0.0)) for d in detections), default=0.0)

        if has_weapon:
            level = "Threat"
            score = max(80, int(max_confidence * 100))
        elif has_person:
            level = "Safe"
            score = max(20, int(max_confidence * 40))
        else:
            level = "Safe"
            score = 0

        result = {
            "risk_level": level,
            "risk_score": score,
            "has_person": has_person,
            "has_weapon": has_weapon,
            "detections": len(detections),
        }
        print(f"Frame risk: {result}")
        return result
    except Exception as error:
        print(f"risk_score failed: {error}")
        return {"risk_level": "Safe", "risk_score": 0, "has_person": False, "has_weapon": False, "detections": 0}


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Classify a detected crop with ResNet-50")
    parser.add_argument("--image", required=True, help="Path to crop image")
    args = parser.parse_args()

    image_path = Path(args.image)
    image = cv2.imread(str(image_path))
    if image is None:
        print(f"Could not read image: {image_path}")
    else:
        classify_threat(image)
