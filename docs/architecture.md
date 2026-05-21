# Drishti Architecture

## Overview

```mermaid
flowchart LR
    A[Input Source<br/>Image / Video / RTSP / Webcam] --> B[Preprocess<br/>Resize / Normalize / Frame Sampling]
    B --> C[CNN Backbone<br/>YOLOv8 Feature Extraction]
    C --> D[YOLO Detection Head<br/>Boxes / Classes / Confidence]
    D --> E[Classify and Filter<br/>Person / Weapon / Risk Rules]
    E --> F[Alert Layer<br/>Dashboard / Logs / Snapshots / Webhook]
```

## Detailed Layer Breakdown

```mermaid
flowchart TB
    subgraph L1[Layer 1: Input]
        I1[Upload Image]
        I2[Upload Video]
        I3[Webcam]
        I4[RTSP / CCTV Stream]
    end

    subgraph L2[Layer 2: Preprocess]
        P1[Decode Frames]
        P2[Resize to Model Image Size]
        P3[Normalize Pixel Values]
        P4[Batch Frames]
    end

    subgraph L3[Layer 3: CNN Backbone]
        C1[Convolution Blocks]
        C2[Feature Pyramid]
        C3[Multi-scale Features]
    end

    subgraph L4[Layer 4: YOLO Detection]
        Y1[Bounding Box Regression]
        Y2[Class Prediction]
        Y3[Confidence Scoring]
        Y4[Non-max Suppression]
    end

    subgraph L5[Layer 5: Classify and Risk]
        R1[Keep Person and Weapon Classes]
        R2[Apply Confidence Threshold]
        R3[Check Person-Weapon Proximity]
        R4[Assign Risk Level]
    end

    subgraph L6[Layer 6: Alert]
        A1[Draw Annotated Frame]
        A2[Save Alert Snapshot]
        A3[Write Event Log]
        A4[Optional Webhook]
    end

    I1 --> P1
    I2 --> P1
    I3 --> P1
    I4 --> P1
    P1 --> P2 --> P3 --> P4 --> C1 --> C2 --> C3 --> Y1
    C3 --> Y2
    C3 --> Y3
    Y1 --> Y4
    Y2 --> Y4
    Y3 --> Y4
    Y4 --> R1 --> R2 --> R3 --> R4 --> A1 --> A2 --> A3 --> A4
```

## Data Flow

The system accepts a frame source, converts it into model-ready frames, runs YOLOv8 inference, filters detections into application-level events, then records or displays the result.

The current baseline treats `weapon` detections as high risk and `person` detections as context. If the model is trained with more specific classes such as `gun`, `knife`, or `rifle`, keep those names in `configs/data.yaml` and update `WEAPON_CLASS_NAMES` in `src/drishti/config.py`.

## Training Flow

1. Collect YOLO-format weapon/person data.
2. Update `configs/data.yaml`.
3. Train with `scripts/train_yolo.py`.
4. Evaluate predictions in `runs/detect`.
5. Use best weights in `scripts/detect.py` or `streamlit_app.py`.

