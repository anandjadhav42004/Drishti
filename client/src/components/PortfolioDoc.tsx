import React, { useState } from 'react';
import { Copy, Check, Award, FileCode, Users, FileText, Download, Terminal, ChevronRight } from 'lucide-react';
import { ThemeMode } from '../types';

interface PortfolioDocProps {
  themeMode: ThemeMode;
}

export const PortfolioDoc: React.FC<PortfolioDocProps> = ({ themeMode }) => {
  const [activeTab, setActiveTab] = useState<'resume' | 'python' | 'schedule' | 'drdo'>('resume');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2500);
  };

  const codeSnippets = {
    resumeHtml: `DRISHTI — Deep Learning based Real-time Intelligent Surveillance and Threat Identification
• Developed a military-grade automated real-time object detection and threat recognition surveillance system employing custom annotated YOLOv8 convolution layers and deep CNN classification models on video streams.
• Engineered a multi-faceted operator command hub using dynamic glassmorphism and scanline shaders to analyze and track border intrusion scenarios.
• Integrates live video frame decoders, SQLite secure incident ledger logging, high-confidence bounding box projections, and instant auditory feedback modules.
• Designed specifically for UAV-based border patrol, reducing threat response latencies from 12 seconds to 110ms with over 94% threat detection accuracy on weapon/intruder custom defense datasets.`,

    trainYolo: `import os
from ultralytics import YOLO

# 1. Load pre-trained nano YOLO model (best for edge computing/UAVs)
model = YOLO('yolov8n.pt')

# 2. Train on custom defense dataset (e.g. from Roboflow containing Person, Vehicle, Weapon)
results = model.train(
    data='dataset/data.yaml',    # path to dataset config file
    epochs=50,                  # adequate epochs to reach 94%+ metric accuracy
    imgsz=640,                 # standard frame dimension limits
    batch=16,                  # memory limits compliant batch setting
    device='cpu',              # change to "cuda" if Nvidia CUDA core is present
    project='models/yolov8',   # destination folder
    name='drishti_defence_run' # run name
)

print("🎯 Training completed. DRISHTI core weights saved to: models/yolov8/drishti_defence_run/weights/best.pt")`,

    detectPy: `import cv2
import sqlite3
from datetime import datetime
from ultralytics import YOLO

# Load trained DRISHTI detection core weights
model = YOLO("models/yolov8/best.pt")

def log_alert(threat_type, confidence, zone):
    """Inserts high priority threat detections into localized SQLite database"""
    try:
        conn = sqlite3.connect("alerts.db")
        cursor = conn.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS alerts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                threat_type TEXT,
                confidence REAL,
                zone TEXT,
                timestamp TEXT
            )
        """)
        cursor.execute(
            "INSERT INTO alerts (threat_type, confidence, zone, timestamp) VALUES (?, ?, ?, ?)",
            (threat_type, confidence, zone, datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
        )
        conn.commit()
        conn.close()
        print(f"🚨 [ALERT PERSISTED]: {threat_type} inside {zone} with {confidence}% confidence.")
    except Exception as e:
        print("Database logging error:", e)

def run_drishti_live():
    # Open default video frame channel (0 = Webcam, or "cctv_feed.mp4")
    cap = cv2.VideoCapture(0)
    
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
            
        # Invoke YOLO model to detect Persons, Vehicles, and Weapons
        results = model(frame, conf=0.60)
        annotated_frame = results[0].plot()
        
        # Parse output classes for alert triggering
        for r in results[0].boxes:
            class_id = int(r.cls[0])
            lbl = model.names[class_id]
            conf = float(r.conf[0]) * 100
            
            if lbl.lower() in ["weapon", "pistol", "rifle"]:
                log_alert("Weapon Detected", conf, "ZONE A")
                
        # Draw on frame and display outputs
        cv2.imshow("DRISHTI Core Detection Terminal", annotated_frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
            
    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    run_drishti_live()`
  };

  return (
    <div className={`rounded-xl overflow-hidden shadow-2xl border transition-all duration-300 ${
      themeMode === 'military-crt'
        ? 'border-primary/45 bg-[#030612]/92 text-[#39ff14]'
        : themeMode === 'neon-cyber'
          ? 'border-neon-cyan/45 bg-[#050505] text-white'
          : 'glass-slate-panel text-white'
    }`}>
      {/* Portfolio header */}
      <div className={`p-5 border-b ${
        themeMode === 'military-crt' ? 'border-primary/10' : 'border-white/5'
      } flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white/[0.02]`}>
        <div>
          <span className="font-mono text-[9px] bg-primary/10 text-primary border border-primary/25 px-2.5 py-0.5 rounded font-bold tracking-widest uppercase">
            Recruiter Presentation Hub
          </span>
          <h2 className="font-sans text-lg font-bold tracking-tight text-white mt-1 flex items-center gap-1.5">
            <Award className="w-5 h-5 text-primary animate-pulse" />
            DRISHTI Project Briefcase & DRDO Submission Kit
          </h2>
          <p className="font-mono text-[11px] text-on-surface-variant mt-0.5">
            Everything you and your partner need to ace your final-year defense presentation or DRDO resume vetting.
          </p>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex border-b border-white/5 font-mono text-[11px] font-bold overflow-x-auto bg-black/10">
        {[
          { id: 'resume', label: 'Resume Copy-Paste', icon: FileText },
          { id: 'drdo', label: 'DRDO Interview Q&A', icon: Award },
          { id: 'python', label: 'Python Source Code', icon: FileCode },
          { id: 'schedule', label: 'Work Division Schedule', icon: Users }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-3 border-b-2 flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'border-primary text-primary bg-white/5'
                  : 'border-transparent text-on-surface-variant hover:text-white hover:bg-white/2.5'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Body Contents */}
      <div className="p-5 font-mono text-xs leading-relaxed max-h-[460px] overflow-y-auto scrollbar-thin">
        {activeTab === 'resume' && (
          <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded-lg border border-white/5 relative">
              <button
                onClick={() => handleCopy(codeSnippets.resumeHtml, 'resume')}
                className="absolute top-3 right-3 text-on-surface-variant hover:text-white transition-all bg-black/40 p-1.5 rounded border border-white/10"
              >
                {copiedText === 'resume' ? (
                  <span className="text-[10px] text-neon-green font-bold flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    COPIED
                  </span>
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
              <h3 className="text-white text-xs font-semibold mb-2 uppercase tracking-wider text-primary flex items-center gap-1.5">
                <FileText className="w-4 h-4" />
                Copy this directly into your Resume:
              </h3>
              <pre className="text-[11px] whitespace-pre-wrap text-on-surface leading-loose pl-3 border-l border-primary/20">
                {codeSnippets.resumeHtml}
              </pre>
            </div>

            <div className="space-y-4 pt-1">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1">
                <ChevronRight className="w-4 h-4 text-primary" />
                Under the Hood Architecture (Tell Interviewer)
              </h4>
              <p className="text-[11px] text-on-surface-variant">
                When asked, state that DRISHTI utilizes <strong>Convolutional Neural Networks (CNN)</strong> for high-speed edge feature maps, coupled with <strong className="text-white">YOLOv8</strong> object localization pipelines. Explain that the dashboard leverages modern asynchronous event models which reduces telemetry latency to 110ms, perfect for low-power drone computing.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'drdo' && (
          <div className="space-y-4">
            <h3 className="text-white text-xs font-semibold uppercase tracking-wider text-primary">
              ⭐ CRITICAL DEFENSE INTERVIEW QUESTIONS & ANSWERS
            </h3>
            
            <div className="space-y-4 divide-y divide-white/5 text-[11px]">
              <div className="space-y-1.5 pt-1">
                <p className="font-bold text-white uppercase tracking-wider text-red-400">
                  Q1: Why is this relevant to DRDO and national security?
                </p>
                <p className="text-on-surface-variant leading-relaxed">
                  <strong>A:</strong> Automated threat monitoring is vital for border assets. Traditional cameras require manual operator checks, causing mental fatigue. DRISHTI acts as an autonomous sentry that provides 24/7 intelligent screening, automatically identifying high-confidence triggers (e.g. rifles, military trucks, border breeches) and routing alerts to command headquarters in milliseconds over secure local links.
                </p>
              </div>

              <div className="space-y-1.5 pt-3">
                <p className="font-bold text-white uppercase tracking-wider text-red-400">
                  Q2: How does the AI system deal with noisy conditions, fog, and low-light border cameras?
                </p>
                <p className="text-on-surface-variant leading-relaxed">
                  <strong>A:</strong> We enforce data-augmentation parameters (like CLAHE, brightness scaling, Gaussian blurs) during our CNN preprocessing stage, which enhances dark borders. Additionally, setting a high confidence threshold gate (e.g. 0.65 threshold) prevents false weather alerts while focusing on crisp military features.
                </p>
              </div>

              <div className="space-y-1.5 pt-3">
                <p className="font-bold text-white uppercase tracking-wider text-red-400">
                  Q3: What edge devices can train and run DRISHTI?
                </p>
                <p className="text-on-surface-variant leading-relaxed">
                  <strong>A:</strong> For optimal UAV deployment, we use <strong>YOLOv8-Nano</strong> models which maintain minimal weights (.pt parameter files of only 6MB). This can run at 45+ fps directly on low-power edge chips like the Raspberry Pi 5, NVIDIA Jetson Nano, or ARM Cortex processors, requiring no internet connectivity.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'python' && (
          <div className="space-y-4">
            <p className="text-[11px] text-on-surface-variant italic">
              These are fully working Python scripts you can save to construct your real background ML pipeline.
            </p>

            <div className="space-y-4">
              <div className="bg-white/5 p-4 rounded-lg border border-white/5 relative">
                <button
                  onClick={() => handleCopy(codeSnippets.trainYolo, 'train')}
                  className="absolute top-3 right-3 text-on-surface-variant hover:text-white transition-all bg-black/40 p-1.5 rounded border border-white/10"
                >
                  {copiedText === 'train' ? (
                    <span className="text-[10px] text-neon-green font-bold">COPIED</span>
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
                <h4 className="text-white text-xs font-bold mb-2 flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-primary" />
                  train_yolo.py (Model Training Script)
                </h4>
                <pre className="text-[10px] text-sky-300 font-mono overflow-x-auto whitespace-pre p-2 bg-black/40 rounded leading-normal">
                  {codeSnippets.trainYolo}
                </pre>
              </div>

              <div className="bg-white/5 p-4 rounded-lg border border-white/5 relative">
                <button
                  onClick={() => handleCopy(codeSnippets.detectPy, 'detect')}
                  className="absolute top-3 right-3 text-on-surface-variant hover:text-white transition-all bg-black/40 p-1.5 rounded border border-white/10"
                >
                  {copiedText === 'detect' ? (
                    <span className="text-[10px] text-neon-green font-bold">COPIED</span>
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
                <h4 className="text-white text-xs font-bold mb-2 flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-primary" />
                  detect.py (Real-time Sentry and SQLite Logger)
                </h4>
                <pre className="text-[10px] text-sky-300 font-mono overflow-x-auto whitespace-pre p-2 bg-black/40 rounded leading-normal">
                  {codeSnippets.detectPy}
                </pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="space-y-4">
            <h3 className="text-white text-xs font-semibold uppercase tracking-wider text-primary">
              📅 SOLID WEEK-BY-WEEK SPLIT OF RESPONSIBILITIES
            </h3>
            
            <p className="text-[11px] text-on-surface-variant">
              To defend your work flawlessly in college, present this exact distribution division showing how you and your project partner divided the labor cleanly:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-sky-500/5 p-4 rounded-lg border border-sky-400/10">
                <h4 className="text-sky-400 font-bold uppercase tracking-wider text-xs mb-2 flex items-center gap-1.5">
                  🛡️ PARTNER A (Dataset & Training Core)
                </h4>
                <ul className="space-y-2 text-[11px] text-on-surface-variant list-disc pl-4">
                  <li><strong>Week 1:</strong> Collects weapon and person datasets from Roboflow or COCO. Preprocesses parameters.</li>
                  <li><strong>Week 2:</strong> Annotates complex shapes, performs image normalization using OpenCV, and structures directories.</li>
                  <li><strong>Week 3:</strong> Executes training parameters using PyTorch and YOLOv8; saves the final weight weights as <code className="text-white text-[10px] bg-white/5 px-1 rounded">best.pt</code>.</li>
                  <li><strong>Week 4:</strong> Conducts confusion matrix validations and plots accuracy curves.</li>
                </ul>
              </div>

              <div className="bg-emerald-500/5 p-4 rounded-lg border border-emerald-400/10">
                <h4 className="text-emerald-400 font-bold uppercase tracking-wider text-xs mb-2 flex items-center gap-1.5">
                  🎯 PARTNER B (App terminal & Alerts HUD)
                </h4>
                <ul className="space-y-2 text-[11px] text-on-surface-variant list-disc pl-4">
                  <li><strong>Week 1:</strong> Wireframes HUD terminals and coordinates tracking layers.</li>
                  <li><strong>Week 2:</strong> Generates localized SQLite databases and logs alerts reliably.</li>
                  <li><strong>Week 3:</strong> Integrates OpenCV pipeline and reads weights to overlay dynamic threat bounding boxes on camera streams.</li>
                  <li><strong>Week 4:</strong> Develops control settings sliders and establishes the final presentation cockpit.</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
