from __future__ import annotations

from pathlib import Path
from typing import Iterator

import cv2


IMAGE_SUFFIXES = {".jpg", ".jpeg", ".png", ".bmp", ".webp"}
VIDEO_SUFFIXES = {".mp4", ".mov", ".avi", ".mkv", ".webm"}


def is_image_source(source: str | Path) -> bool:
    return Path(str(source)).suffix.lower() in IMAGE_SUFFIXES


def is_video_source(source: str | Path) -> bool:
    return Path(str(source)).suffix.lower() in VIDEO_SUFFIXES


def iter_video_frames(source: str | Path, frame_stride: int = 1) -> Iterator[tuple[int, object]]:
    capture = cv2.VideoCapture(str(source))
    if not capture.isOpened():
        raise ValueError(f"Could not open video source: {source}")

    frame_index = 0
    try:
        while True:
            ok, frame = capture.read()
            if not ok:
                break
            if frame_index % frame_stride == 0:
                yield frame_index, frame
            frame_index += 1
    finally:
        capture.release()

