from __future__ import annotations

import argparse
import os
import shutil
from pathlib import Path

os.environ.setdefault("NO_ALBUMENTATIONS_UPDATE", "1")

import albumentations as A
import cv2
import numpy as np


IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".bmp", ".webp"}


def extract_frames(video_path: str, output_dir: str, fps: int = 5) -> int:
    """Extract frames from a video at the requested FPS."""
    try:
        video_file = Path(video_path)
        output_path = Path(output_dir)
        output_path.mkdir(parents=True, exist_ok=True)

        if not video_file.exists():
            raise FileNotFoundError(f"Video not found: {video_file}")

        capture = cv2.VideoCapture(str(video_file))
        if not capture.isOpened():
            raise ValueError(f"Could not open video: {video_file}")

        source_fps = capture.get(cv2.CAP_PROP_FPS) or 30
        frame_interval = max(int(source_fps / fps), 1)
        saved_count = 0
        frame_index = 0

        print(f"Extracting frames from {video_file} to {output_path}")
        while True:
            ok, frame = capture.read()
            if not ok:
                break

            if frame_index % frame_interval == 0:
                frame_name = output_path / f"{video_file.stem}_frame_{saved_count:06d}.jpg"
                cv2.imwrite(str(frame_name), frame)
                saved_count += 1

            frame_index += 1

        capture.release()
        print(f"Saved {saved_count} frames")
        return saved_count
    except Exception as error:
        print(f"extract_frames failed: {error}")
        return 0


def resize_and_normalize(image_path: str, size: int = 640) -> np.ndarray | None:
    """Resize an image to size x size and normalize pixel values from 0 to 1."""
    try:
        image = cv2.imread(str(image_path))
        if image is None:
            raise ValueError(f"Could not read image: {image_path}")

        resized = cv2.resize(image, (size, size))
        normalized = resized.astype(np.float32) / 255.0
        print(f"Resized and normalized: {image_path}")
        return normalized
    except Exception as error:
        print(f"resize_and_normalize failed: {error}")
        return None


def augment_dataset(image_dir: str, label_dir: str) -> int:
    """Create simple augmented image copies while keeping YOLO labels unchanged."""
    try:
        image_path = Path(image_dir)
        label_path = Path(label_dir)
        if not image_path.exists():
            raise FileNotFoundError(f"Image directory not found: {image_path}")
        if not label_path.exists():
            raise FileNotFoundError(f"Label directory not found: {label_path}")

        transform = A.Compose(
            [
                A.HorizontalFlip(p=0.5),
                A.RandomBrightnessContrast(p=0.4),
                A.Rotate(limit=10, border_mode=cv2.BORDER_CONSTANT, p=0.4),
                A.Blur(blur_limit=3, p=0.2),
            ],
            bbox_params=A.BboxParams(format="yolo", label_fields=["class_labels"], min_visibility=0.2),
        )

        augmented_count = 0
        for file in sorted(image_path.iterdir()):
            if file.suffix.lower() not in IMAGE_EXTENSIONS:
                continue

            label_file = label_path / f"{file.stem}.txt"
            if not label_file.exists():
                print(f"Skipping image without label: {file.name}")
                continue

            image = cv2.imread(str(file))
            if image is None:
                print(f"Skipping unreadable image: {file.name}")
                continue

            bboxes: list[list[float]] = []
            class_labels: list[int] = []
            for line in label_file.read_text(encoding="utf-8").splitlines():
                parts = line.strip().split()
                if len(parts) != 5:
                    continue
                class_labels.append(int(float(parts[0])))
                bboxes.append([float(value) for value in parts[1:]])

            if not bboxes:
                print(f"Skipping empty label file: {label_file.name}")
                continue

            augmented = transform(image=image, bboxes=bboxes, class_labels=class_labels)
            output_image = image_path / f"{file.stem}_aug{file.suffix}"
            output_label = label_path / f"{file.stem}_aug.txt"

            cv2.imwrite(str(output_image), augmented["image"])
            with output_label.open("w", encoding="utf-8") as handle:
                for class_id, bbox in zip(augmented["class_labels"], augmented["bboxes"], strict=False):
                    values = " ".join(f"{float(value):.6f}" for value in bbox)
                    handle.write(f"{int(class_id)} {values}\n")

            augmented_count += 1

        print(f"Created {augmented_count} augmented images")
        return augmented_count
    except Exception as error:
        print(f"augment_dataset failed: {error}")
        return 0


def validate_dataset(data_dir: str) -> dict[str, int]:
    """Check image-label pairs and print simple dataset statistics."""
    try:
        root = Path(data_dir)
        if not root.exists():
            raise FileNotFoundError(f"Dataset directory not found: {root}")

        stats = {"images": 0, "labels": 0, "missing_labels": 0, "person": 0, "weapon": 0}
        for split in ["train", "valid", "test"]:
            images_dir = root / split / "images"
            labels_dir = root / split / "labels"
            if not images_dir.exists():
                print(f"Missing split image directory: {images_dir}")
                continue

            for image_file in images_dir.iterdir():
                if image_file.suffix.lower() not in IMAGE_EXTENSIONS:
                    continue
                stats["images"] += 1
                label_file = labels_dir / f"{image_file.stem}.txt"
                if not label_file.exists():
                    stats["missing_labels"] += 1
                    print(f"Missing label: {label_file}")
                    continue

                stats["labels"] += 1
                for line in label_file.read_text(encoding="utf-8").splitlines():
                    parts = line.strip().split()
                    if not parts:
                        continue
                    class_id = int(float(parts[0]))
                    if class_id == 0:
                        stats["person"] += 1
                    elif class_id == 1:
                        stats["weapon"] += 1

        print("Dataset statistics:")
        for key, value in stats.items():
            print(f"  {key}: {value}")
        return stats
    except Exception as error:
        print(f"validate_dataset failed: {error}")
        return {"images": 0, "labels": 0, "missing_labels": 0, "person": 0, "weapon": 0}


def copy_labelled_to_processed(labelled_dir: str, processed_dir: str) -> None:
    """Copy a labelled YOLO dataset into the processed folder."""
    try:
        source = Path(labelled_dir)
        destination = Path(processed_dir)
        if not source.exists():
            raise FileNotFoundError(f"Labelled dataset not found: {source}")
        destination.mkdir(parents=True, exist_ok=True)
        shutil.copytree(source, destination, dirs_exist_ok=True)
        print(f"Copied labelled dataset from {source} to {destination}")
    except Exception as error:
        print(f"copy_labelled_to_processed failed: {error}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="DRISHTI preprocessing helpers")
    parser.add_argument("--validate", default="data/processed/weapon_person", help="Dataset folder to validate")
    parser.add_argument("--video", default=None, help="Optional video path for frame extraction")
    parser.add_argument("--frames-out", default="data/raw/frames", help="Output folder for extracted frames")
    args = parser.parse_args()

    validate_dataset(args.validate)
    if args.video:
        extract_frames(args.video, args.frames_out)
