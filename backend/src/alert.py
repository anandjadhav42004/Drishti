from __future__ import annotations

import argparse
import csv
import sqlite3
from datetime import datetime
from pathlib import Path

import cv2


DATABASE_PATH = Path("alerts.db")
SCREENSHOT_DIR = Path("alerts/screenshots")


def setup_database(db_path: Path = DATABASE_PATH) -> None:
    """Create SQLite alerts table if it does not already exist."""
    try:
        with sqlite3.connect(db_path) as connection:
            connection.execute(
                """
                CREATE TABLE IF NOT EXISTS alerts (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    threat_type TEXT NOT NULL,
                    confidence REAL NOT NULL,
                    zone TEXT NOT NULL,
                    timestamp TEXT NOT NULL,
                    screenshot_path TEXT NOT NULL,
                    risk_level TEXT NOT NULL
                )
                """
            )
        print(f"Alert database ready: {db_path}")
    except Exception as error:
        print(f"setup_database failed: {error}")


def log_alert(
    threat_type: str,
    confidence: float,
    zone: str,
    frame,
    risk_level: str,
    db_path: Path = DATABASE_PATH,
) -> int | None:
    """Save alert screenshot and insert alert row into SQLite database."""
    try:
        setup_database(db_path)
        SCREENSHOT_DIR.mkdir(parents=True, exist_ok=True)

        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        file_stamp = datetime.now().strftime("%Y%m%d_%H%M%S_%f")
        screenshot_path = SCREENSHOT_DIR / f"alert_{file_stamp}.png"

        if frame is None:
            raise ValueError("Frame is empty; cannot save screenshot")

        cv2.imwrite(str(screenshot_path), frame)

        with sqlite3.connect(db_path) as connection:
            cursor = connection.execute(
                """
                INSERT INTO alerts
                (threat_type, confidence, zone, timestamp, screenshot_path, risk_level)
                VALUES (?, ?, ?, ?, ?, ?)
                """,
                (threat_type, confidence, zone, timestamp, str(screenshot_path), risk_level),
            )
            alert_id = int(cursor.lastrowid)

        print(f"Logged alert #{alert_id}: {threat_type} ({risk_level})")
        return alert_id
    except Exception as error:
        print(f"log_alert failed: {error}")
        return None


def get_recent_alerts(limit: int = 10, db_path: Path = DATABASE_PATH) -> list[dict]:
    """Return the latest alerts from SQLite as a list of dictionaries."""
    try:
        setup_database(db_path)
        with sqlite3.connect(db_path) as connection:
            connection.row_factory = sqlite3.Row
            rows = connection.execute(
                """
                SELECT id, threat_type, confidence, zone, timestamp, screenshot_path, risk_level
                FROM alerts
                ORDER BY id DESC
                LIMIT ?
                """,
                (limit,),
            ).fetchall()

        alerts = [dict(row) for row in rows]
        print(f"Loaded {len(alerts)} recent alerts")
        return alerts
    except Exception as error:
        print(f"get_recent_alerts failed: {error}")
        return []


def export_alerts_csv(output_path: str, db_path: Path = DATABASE_PATH) -> Path | None:
    """Export all SQLite alerts into a CSV file."""
    try:
        setup_database(db_path)
        output_file = Path(output_path)
        output_file.parent.mkdir(parents=True, exist_ok=True)

        with sqlite3.connect(db_path) as connection:
            connection.row_factory = sqlite3.Row
            rows = connection.execute(
                """
                SELECT id, threat_type, confidence, zone, timestamp, screenshot_path, risk_level
                FROM alerts
                ORDER BY id DESC
                """
            ).fetchall()

        with output_file.open("w", newline="", encoding="utf-8") as handle:
            writer = csv.DictWriter(
                handle,
                fieldnames=["id", "threat_type", "confidence", "zone", "timestamp", "screenshot_path", "risk_level"],
            )
            writer.writeheader()
            for row in rows:
                writer.writerow(dict(row))

        print(f"Exported {len(rows)} alerts to {output_file}")
        return output_file
    except Exception as error:
        print(f"export_alerts_csv failed: {error}")
        return None


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="DRISHTI alert database utilities")
    parser.add_argument("--export", default=None, help="Optional CSV output path")
    args = parser.parse_args()

    setup_database()
    print(get_recent_alerts())
    if args.export:
        export_alerts_csv(args.export)
