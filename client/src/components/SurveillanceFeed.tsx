import React, { useRef, useState, useEffect } from 'react';
import { Camera, Upload, AlertTriangle, Eye, ShieldAlert, Sparkles, RefreshCw } from 'lucide-react';
import { ThemeMode, ThreatAlert, DetectionBox, SystemConfig } from '../types';

interface SurveillanceFeedProps {
  themeMode: ThemeMode;
  config: SystemConfig;
  onAddAlert: (alert: ThreatAlert) => void;
  onAddDetections: (count: number) => void;
}

// Fixed realistic cctv feed scenes
const CCTV_CHANNELS = [
  {
    id: 'CAM_SEC_01',
    name: 'Sector 01 — Main Entry Gate',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBo1Z7Qiae50c9wOaVzT6kj9oGQ_8yWtz7isCqs2D9X9Qc5UMgqP8jg8VTJcVDmCep23jCl3GJa5vBotXbogrtqCMhk2iTSG8Rg8JGT_Q28ae3WjHUtIgc1T8Y_8-UZsS8YARqjXV0w7vrvalqlmqztVrBr8WHzFT6937Ag9fRWZK6jV55bHcRE9_By4eFY8cQV0oEX3c1KBNcC0_jFbTe-y2JJVaGAZCJ46e3gundhQ6JMifNyE0R6A60TPF0QUlu0w-m3mCvxer0',
    coordinates: 'COORDS: 34.0522° N, 118.2437° W'
  },
  {
    id: 'CAM_SEC_02',
    name: 'Sector 02 — Cargo Bunker Bravo',
    imageUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
    coordinates: 'COORDS: 34.0510° N, 118.2445° W'
  },
  {
    id: 'CAM_SEC_03',
    name: 'Sector 03 — Perimeter West Rail',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80',
    coordinates: 'COORDS: 34.0535° N, 118.2410° W'
  }
];

export const SurveillanceFeed: React.FC<SurveillanceFeedProps> = ({
  themeMode,
  config,
  onAddAlert,
  onAddDetections
}) => {
  const [selectedCam, setSelectedCam] = useState(CCTV_CHANNELS[0]);
  const [webcamActive, setWebcamActive] = useState(false);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any | null>(null);
  const [analysysError, setAnalysisError] = useState<string | null>(null);

  // Active simulated bounding box states
  const [simBoxes, setSimBoxes] = useState<DetectionBox[]>([]);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Sync state transitions if CCTV channel changes
  useEffect(() => {
    if (config.isDetecting && !webcamActive && !uploadPreview) {
      // Simulate radar scanning bounding boxes for specific CCTV channels
      const generateMockBoxes = () => {
        if (selectedCam.id === 'CAM_SEC_01') {
          return [
            { label: 'WEAPON DETECTED', confidence: 0.94, x: 45, y: 30, w: 18, h: 42, color: 'text-error border-error' },
            { label: 'PERSONNEL TARGET_01', confidence: 0.88, x: 20, y: 25, w: 22, h: 68, color: 'text-secondary border-secondary' }
          ];
        } else if (selectedCam.id === 'CAM_SEC_02') {
          return [
            { label: 'PERSONNEL TARGET_03', confidence: 0.76, x: 60, y: 40, w: 15, h: 45, color: 'text-primary border-primary' },
            { label: 'UNIDENTIFIED VEHICLE', confidence: 0.82, x: 10, y: 50, w: 40, h: 38, color: 'text-secondary border-secondary' }
          ];
        } else {
          return [
            { label: 'SUSPICIOUS EXTRUSION', confidence: 0.71, x: 35, y: 60, w: 20, h: 25, color: 'text-[#ff914d] border-[#ff914d]' }
          ];
        }
      };
      setSimBoxes(generateMockBoxes());
    } else {
      setSimBoxes([]);
    }
  }, [selectedCam, config.isDetecting, webcamActive, uploadPreview]);

  // Handle mock threat generation cycle for simulated live video feed
  useEffect(() => {
    if (!config.isDetecting) return;
    
    const interval = setInterval(() => {
      // Generate randomized incident alarms to simulate live system alerts
      if (Math.random() > 0.75 && !webcamActive && !uploadPreview) {
        const zones = ['ZONE A', 'ZONE B', 'ZONE C', 'ZONE D'];
        const threats = [
          { type: 'Weapon Detected', conf: 92 + Math.floor(Math.random() * 7), priority: 'high' },
          { type: 'Suspicious Vehicle', conf: 70 + Math.floor(Math.random() * 15), priority: 'medium' },
          { type: 'Unauthorized Entry Border Breach', conf: 85 + Math.floor(Math.random() * 12), priority: 'high' }
        ];
        
        const selectedThreat = threats[Math.floor(Math.random() * threats.length)];
        const zone = zones[Math.floor(Math.random() * zones.length)];
        
        const newAlert: ThreatAlert = {
          id: 'mock_' + Date.now(),
          threat_type: selectedThreat.type,
          confidence: selectedThreat.conf,
          zone: zone,
          timestamp: new Date().toLocaleTimeString(),
          status: 'active',
          details: 'Automatic tracking radar trigger. Coordinates matching Sector ' + zone
        };
        
        onAddAlert(newAlert);
        onAddDetections(1);
      }
    }, 12000);

    return () => clearInterval(interval);
  }, [config.isDetecting, webcamActive, uploadPreview]);

  // Start webcam feed securely
  const startWebcam = async () => {
    try {
      setUploadPreview(null);
      setAnalysisResult(null);
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setWebcamActive(true);
      }
    } catch (err: any) {
      console.error("Webcam trigger failed:", err);
      alert("⚠️ Request Permission failed. Ensure camera hardware is available and allowed inside browser frame settings.");
    }
  };

  // Stop webcam feed securely
  const stopWebcam = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setWebcamActive(false);
  };

  // File Uploader triggers
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      stopWebcam();
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadPreview(reader.result as string);
        setAnalysisResult(null);
        setAnalysisError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  // Connect to server-side Gemini analysis engine
  const triggerCoreAnalysis = async () => {
    const activeImage = uploadPreview || getCanvasSnapBase64();
    if (!activeImage) {
      setAnalysisError("Missing physical image buffer to scan.");
      return;
    }

    setAnalyzing(true);
    setAnalysisError(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: activeImage,
          threshold: config.yoloThreshold
        })
      });

      if (!response.ok) {
        throw new Error("Target server diagnostics returned bad state.");
      }

      const data = await response.json();
      setAnalysisResult(data);

      if (data.threat_found) {
        data.detections.forEach((det: any) => {
          onAddAlert({
            id: 'real_' + Date.now() + '_' + Math.floor(Math.random()*1000),
            threat_type: det.label,
            confidence: Math.round(det.confidence * 100),
            zone: 'SCAN LAB',
            timestamp: new Date().toLocaleTimeString(),
            status: 'active',
            details: det.details || data.summary
          });
        });
        onAddDetections(data.detections.length);
      }
    } catch (error: any) {
      console.error(error);
      setAnalysisError("Failed to verify image against security layers: " + error.message);
    } finally {
      setAnalyzing(false);
    }
  };

  // Snap high-res matrix coordinates of live webcam to analyze
  const getCanvasSnapBase64 = (): string | null => {
    if (!webcamActive || !videoRef.current || !canvasRef.current) return null;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL('image/jpeg');
    }
    return null;
  };

  // Release simulation mode and reset targets
  const handleResetFeed = () => {
    stopWebcam();
    setUploadPreview(null);
    setAnalysisResult(null);
    setAnalysisError(null);
    setSelectedCam(CCTV_CHANNELS[0]);
  };

  return (
    <div className="space-y-4">
      {/* CCTV Navigation Rail */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-2">
        <div className="flex items-center gap-2">
          {CCTV_CHANNELS.map(cam => (
            <button
              key={cam.id}
              onClick={() => {
                setWebcamActive(false);
                setUploadPreview(null);
                setAnalysisResult(null);
                setSelectedCam(cam);
              }}
              className={`px-3 py-1.5 font-mono text-[11px] rounded transition-all tracking-wider ${
                selectedCam.id === cam.id && !webcamActive && !uploadPreview
                  ? themeMode === 'military-crt'
                    ? 'bg-primary/20 text-primary border border-primary font-bold'
                    : 'bg-primary text-black font-semibold'
                  : 'bg-white/5 hover:bg-white/10 text-on-surface-variant'
              }`}
            >
              {cam.id}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={startWebcam}
            className={`px-3 py-1.5 font-mono text-[11px] rounded flex items-center gap-1.5 transition-all ${
              webcamActive
                ? 'bg-secondary text-black font-semibold'
                : 'bg-white/5 hover:bg-white/10 text-on-surface-variant'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            WEBCAM
          </button>
          <button
            onClick={handleUploadClick}
            className={`px-3 py-1.5 font-mono text-[11px] rounded flex items-center gap-1.5 transition-all ${
              uploadPreview
                ? 'bg-primary text-black font-semibold'
                : 'bg-white/5 hover:bg-white/10 text-on-surface-variant'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            UPLOAD FILE
          </button>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Tactical Video Feed Screen */}
      <div
        className={`relative aspect-video rounded-xl overflow-hidden shadow-2xl transition-all duration-300 ${
          themeMode === 'military-crt'
            ? 'border-2 border-primary/55 military-grid crt-screen'
            : themeMode === 'neon-cyber'
              ? 'border-2 border-neon-cyan/40 bg-black'
              : 'border border-white/10 bg-[#0e0e10]/90'
        }`}
      >
        {/* Subtle scan-line overlay for military or cyberpunk vibes */}
        {(themeMode === 'military-crt' || themeMode === 'neon-cyber') && (
          <div className="laser-scanner-line"></div>
        )}

        {/* Video stream content */}
        {!webcamActive && !uploadPreview ? (
          <img
            src={selectedCam.imageUrl}
            alt="CCTV surveillance feed snapshot"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover filter brightness-75 contrast-125 transition-all duration-700"
          />
        ) : webcamActive ? (
          <video
            ref={videoRef}
            playsInline
            muted
            className="w-full h-full object-cover transform -scale-x-100"
          />
        ) : (
          <img
            src={uploadPreview!}
            alt="Uploaded payload visual"
            className="w-full h-full object-contain bg-black"
          />
        )}

        <canvas ref={canvasRef} className="hidden" />

        {/* HUD Stats overlay */}
        <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between text-white select-none">
          <div className="flex justify-between items-start">
            <div className="flex gap-2">
              <span className={`px-2 py-0.5 font-mono text-[10px] font-bold rounded flex items-center gap-1 ${
                config.isDetecting 
                  ? 'bg-error text-black animate-pulse' 
                  : 'bg-white/20 text-white'
              }`}>
                {config.isDetecting ? (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping"></span>
                    REC LIVE
                  </>
                ) : (
                  'STANDBY'
                )}
              </span>
              <span className="bg-black/60 backdrop-blur-md px-2 py-0.5 font-mono text-[10px] border border-white/10 rounded">
                {webcamActive 
                  ? 'LOCAL DEVICE 01' 
                  : uploadPreview 
                    ? 'CV ANALYZER LAB' 
                    : selectedCam.name}
              </span>
            </div>

            <div className="text-right font-mono text-[10px] text-white/75 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded border border-white/5">
              <div>{webcamActive ? 'COORD: LOCAL WEBCAM TARGET' : uploadPreview ? 'SCAN: STATIC PAYLOAD' : selectedCam.coordinates}</div>
              <div>ZONE STATUS: {config.defconLevel === 1 ? 'DEFCON 1 CRITICAL' : `DEFCON ${config.defconLevel} CLEAR`}</div>
            </div>
          </div>

          {/* Draw YOLO / CNN bounding boxes */}
          <div className="absolute inset-0 z-40">
            {/* Draw Simulated Bounding boxes */}
            {config.isDetecting && !webcamActive && !uploadPreview && simBoxes.map((box, index) => (
              <div
                key={index}
                style={{
                  left: `${box.x}%`,
                  top: `${box.y}%`,
                  width: `${box.w}%`,
                  height: `${box.h}%`
                }}
                className={`absolute border-2 transition-all duration-500 rounded-sm ${
                  box.label.includes('WEAPON') ? 'border-neon-red pulsing-threat-border shadow-[0_0_12px_rgba(255,49,49,0.35)]' : 'border-neon-cyan shadow-[0_0_10px_rgba(0,255,255,0.25)]'
                }`}
              >
                <div className={`absolute -top-6 left-0 px-1.5 py-0.5 font-mono text-[9px] uppercase font-bold tracking-widest ${
                  box.label.includes('WEAPON') ? 'bg-neon-red text-black' : 'bg-neon-cyan text-black'
                }`}>
                  {box.label} [{(box.confidence * 100).toFixed(0)}%]
                </div>
                <div className={`absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 ${box.label.includes('WEAPON') ? 'border-neon-red' : 'border-neon-cyan'}`}></div>
                <div className={`absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 ${box.label.includes('WEAPON') ? 'border-neon-red' : 'border-neon-cyan'}`}></div>
              </div>
            ))}

            {/* Draw Real Gemini AI Detection Boxes */}
            {analysisResult && analysisResult.detections && analysisResult.detections.map((box: any, index: number) => {
              const isWeapon = box.label.toLowerCase().includes('weapon') || box.label.toLowerCase().includes('alert');
              return (
                <div
                  key={index}
                  style={{
                    left: `${box.x}%`,
                    top: `${box.y}%`,
                    width: `${box.w}%`,
                    height: `${box.h}%`
                  }}
                  className={`absolute border-2 rounded-sm ${
                    isWeapon ? 'border-neon-red pulsing-threat-border shadow-[0_0_15px_rgba(255,49,49,0.5)]' : 'border-neon-green shadow-[0_0_10px_rgba(57,255,20,0.3)]'
                  }`}
                >
                  <div className={`absolute -top-6 left-0 px-1.5 py-0.5 font-mono text-[9px] uppercase font-bold tracking-widest ${
                    isWeapon ? 'bg-neon-red text-black' : 'bg-neon-green text-black'
                  }`}>
                    {box.label} [{(box.confidence * 100).toFixed(0)}%]
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 ${isWeapon ? 'border-neon-red' : 'border-neon-green'}`}></div>
                  <div className={`absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 ${isWeapon ? 'border-neon-red' : 'border-neon-green'}`}></div>
                </div>
              );
            })}
          </div>

          {/* Technical Scope HUD Corners */}
          <div className="absolute inset-4 border border-white/5 pointer-events-none">
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary/45"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-primary/45"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-primary/45"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary/45"></div>
          </div>
        </div>
      </div>

      {/* Analysis trigger controls */}
      {(uploadPreview || webcamActive) && (
        <div className="flex-col md:flex md:flex-row items-center justify-between gap-4 p-4 rounded-xl border border-white/5 bg-white/5">
          <div className="mb-2 md:mb-0">
            <h4 className="font-mono text-xs font-semibold text-white uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-primary animate-spin" />
              DRISHTI ML CV Core Test Bench
            </h4>
            <p className="text-on-surface-variant text-[11px] mt-0.5 max-w-xl font-mono">
              Verifies feed targets against live server-side ML algorithms. Takes a snapshot of webcam feed or uploaded payload, sending it to the multi-layered neural threat classifiers.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleResetFeed}
              disabled={analyzing}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white font-mono text-xs rounded transition-all flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              RESET
            </button>
            <button
              onClick={triggerCoreAnalysis}
              disabled={analyzing}
              className={`px-5 py-2 rounded text-xs font-bold tracking-wider font-mono shadow-md flex items-center gap-2 transition-all ${
                analyzing 
                  ? 'bg-white/10 text-white/50 cursor-not-allowed'
                  : 'bg-primary text-black hover:scale-[1.02] active:scale-95'
              }`}
            >
              {analyzing ? (
                <>
                  <div className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  SCANNING PAYLOAD...
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5" />
                  INITIATE CLASSIFICATION
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Analysis result alerts feed message box */}
      {analysisResult && (
        <div className={`p-4 rounded-xl border font-mono text-xs ${
          analysisResult.threat_found 
            ? 'bg-error/10 border-error/20 text-error' 
            : 'bg-secondary/10 border-secondary/20 text-secondary'
        }`}>
          <div className="flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <div className="space-y-1">
              <div className="font-bold flex items-center gap-2">
                <span>RADAR AI SUMMARY: {analysisResult.threat_level}</span>
                {analysisResult.isFallbackDemo && (
                  <span className="bg-[#ff914d]/20 text-[#ff914d] text-[10px] px-2 py-0.5 rounded font-mono font-medium">DEMO FALLBACK</span>
                )}
              </div>
              <p className="text-on-surface text-[11px]">{analysisResult.summary}</p>
              {analysisResult.detections.length > 0 && (
                <div className="pt-2 text-[11px] space-y-1">
                  <span className="font-medium">Identified Classes:</span>
                  {analysisResult.detections.map((det: any, key: number) => (
                    <div key={key} className="text-on-surface-variant flex items-center gap-1">
                      <span>• {det.label} ({Math.round(det.confidence * 100)}% Match) at [{det.x}%, {det.y}%] —</span>
                      <span className="italic">{det.details}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Analysis fail screen */}
      {analysysError && (
        <div className="p-4 rounded-xl border border-error/20 bg-error/1s text-error font-mono text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          <span>Error processing threat matrix: {analysysError}</span>
        </div>
      )}
    </div>
  );
};
