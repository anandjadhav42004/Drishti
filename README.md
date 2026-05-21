# DRISHTI

**Deep Learning based Real-time Intelligent Surveillance and Threat Identification**

DRISHTI is a resume-ready defense surveillance prototype that detects persons and weapons from images, video files, or webcam feeds. It uses YOLOv8 for object detection, optional ResNet-50 classification on detected crops, SQLite alert logging, and a Streamlit monitoring dashboard.

## Architecture

```text
Input Source
  -> Preprocess
  -> YOLOv8 Detection
  -> Crop Object
  -> ResNet-50 Classify
  -> Alert Engine
  -> Streamlit Dashboard
```

## Folder Structure

```text
DRISHTI/
  data/
    raw/
    labelled/
    processed/
      weapon_person/
        train/images + labels
        valid/images + labels
        test/images + labels
  configs/
    data.yaml
  models/
    backbone/
    yolov8/
      best.pt
    classifier/
  src/
    preprocess.py
    train_yolo.py
    detect.py
    classify.py
    alert.py
  dashboard/
    app.py
  notebooks/
  requirements.txt
  README.md
```

## Tech Stack

| Area | Tools |
|---|---|
| Language | Python 3.10+ |
| Detection | YOLOv8, Ultralytics |
| Classification | PyTorch, Torchvision, ResNet-50 |
| Computer Vision | OpenCV, NumPy, Albumentations |
| Dataset | Roboflow, YOLO labels |
| Dashboard | Streamlit, Matplotlib |
| Storage | SQLite, CSV |
| Version Control | GitHub |

## Installation

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
pip install -e .
```

## Dataset Setup

Download a YOLO-format dataset from Roboflow or another labelled source and place it here:

```text
data/processed/weapon_person/
  train/images
  train/labels
  valid/images
  valid/labels
  test/images
  test/labels
```

Validate the dataset:

```bash
python src/preprocess.py --validate data/processed/weapon_person
```

## Training

```bash
python src/train_yolo.py --data configs/data.yaml --model yolov8n.pt --epochs 50 --imgsz 640 --batch 16 --evaluate --export
```

The best model is copied to:

```text
models/yolov8/best.pt
```

## Detection

Image detection:

```bash
python src/detect.py --image path/to/image.jpg --model models/yolov8/best.pt --conf 0.6
```

Video detection:

```bash
python src/detect.py --video path/to/video.mp4 --output outputs/predictions/output.mp4
```

Webcam detection:

```bash
python src/detect.py --webcam
```

## Dashboard

```bash
streamlit run dashboard/app.py
```

The dashboard provides:

- Frames processed
- Threat count
- Model accuracy display
- System uptime
- YOLO bounding box overlay
- Recent SQLite alerts
- CSV export
- Detection and threat breakdown charts

## Team Split

| Member | Responsibility |
|---|---|
| Person A | Dataset collection, preprocessing, YOLOv8 training, evaluation |
| Person B | Detection pipeline, ResNet-50 classification, alert engine, Streamlit dashboard |

## Results

| Metric | Value |
|---|---|
| mAP50 | Add after training |
| mAP50-95 | Add after training |
| Precision | Add after training |
| Recall | Add after training |
| Model Accuracy | Add after testing |

## DRDO Resume Description

Built **DRISHTI**, a deep learning based real-time surveillance and threat identification prototype for automated person and weapon detection. Designed a modular pipeline using YOLOv8 for object detection, ResNet-50 for crop-level classification, OpenCV for video processing, SQLite for alert logging, and Streamlit for real-time dashboard visualization. Implemented dataset validation, augmentation, model training, image/video/webcam inference, risk scoring, screenshot capture, and CSV alert export. Evaluated the system using precision, recall, mAP50, and mAP50-95 to demonstrate detection performance on custom YOLO-format surveillance datasets.

## React Tactical Dashboard

This repo also includes a React/Express tactical UI export in `client/`.

```bash
npm run client:install
npm run client:dev
```

The React app runs on `http://localhost:3000`.
