from __future__ import annotations

import argparse
import os
import shutil
from pathlib import Path

os.environ.setdefault("MPLCONFIGDIR", str(Path(".cache/matplotlib").resolve()))

from ultralytics import YOLO


def train_model(
    data_yaml: str,
    model_size: str = "yolov8n.pt",
    epochs: int = 50,
    imgsz: int = 640,
    batch: int = 16,
) -> Path | None:
    """Train YOLOv8 on the custom DRISHTI dataset and copy best.pt to models/yolov8."""
    try:
        data_path = Path(data_yaml)
        if not data_path.exists():
            raise FileNotFoundError(f"data.yaml not found: {data_path}")

        print("Starting YOLOv8 training")
        model = YOLO(model_size)
        results = model.train(
            data=str(data_path),
            epochs=epochs,
            imgsz=imgsz,
            batch=batch,
            project="runs/detect",
            name="drishti-yolov8",
            exist_ok=True,
        )

        best_source = Path(results.save_dir) / "weights" / "best.pt"
        best_destination = Path("models/yolov8/best.pt")
        best_destination.parent.mkdir(parents=True, exist_ok=True)

        if best_source.exists():
            shutil.copy2(best_source, best_destination)
            print(f"Best model saved to {best_destination}")
            return best_destination

        print(f"Training completed, but best.pt was not found at {best_source}")
        return None
    except Exception as error:
        print(f"train_model failed: {error}")
        return None


def evaluate_model(model_path: str, data_yaml: str) -> dict[str, float]:
    """Evaluate a YOLOv8 model and print common detection metrics."""
    try:
        model_file = Path(model_path)
        data_path = Path(data_yaml)
        if not model_file.exists():
            raise FileNotFoundError(f"Model not found: {model_file}")
        if not data_path.exists():
            raise FileNotFoundError(f"data.yaml not found: {data_path}")

        print(f"Evaluating model: {model_file}")
        model = YOLO(str(model_file))
        metrics = model.val(data=str(data_path), plots=True)

        results = {
            "mAP50": float(metrics.box.map50),
            "mAP50_95": float(metrics.box.map),
            "precision": float(metrics.box.mp),
            "recall": float(metrics.box.mr),
        }

        print("Evaluation metrics:")
        for key, value in results.items():
            print(f"  {key}: {value:.4f}")
        print("Confusion matrix and validation plots are saved in the latest runs/detect folder")
        return results
    except Exception as error:
        print(f"evaluate_model failed: {error}")
        return {"mAP50": 0.0, "mAP50_95": 0.0, "precision": 0.0, "recall": 0.0}


def export_model(model_path: str) -> Path | None:
    """Export a trained YOLOv8 model to ONNX format for deployment."""
    try:
        model_file = Path(model_path)
        if not model_file.exists():
            raise FileNotFoundError(f"Model not found: {model_file}")

        print(f"Exporting model to ONNX: {model_file}")
        model = YOLO(str(model_file))
        output_path = model.export(format="onnx")
        print(f"ONNX model exported to {output_path}")
        return Path(output_path)
    except Exception as error:
        print(f"export_model failed: {error}")
        return None


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Train and evaluate DRISHTI YOLOv8 model")
    parser.add_argument("--data", default="configs/data.yaml", help="Path to data.yaml")
    parser.add_argument("--model", default="yolov8n.pt", help="YOLOv8 model size or checkpoint")
    parser.add_argument("--epochs", type=int, default=50, help="Number of training epochs")
    parser.add_argument("--imgsz", type=int, default=640, help="Image size")
    parser.add_argument("--batch", type=int, default=16, help="Batch size")
    parser.add_argument("--evaluate", action="store_true", help="Evaluate models/yolov8/best.pt after training")
    parser.add_argument("--export", action="store_true", help="Export models/yolov8/best.pt to ONNX")
    args = parser.parse_args()

    best_model = train_model(args.data, args.model, args.epochs, args.imgsz, args.batch)
    model_to_use = best_model or Path("models/yolov8/best.pt")

    if args.evaluate:
        evaluate_model(str(model_to_use), args.data)
    if args.export:
        export_model(str(model_to_use))
