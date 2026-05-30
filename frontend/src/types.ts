export type ThemeMode = 'classic-glass' | 'neon-cyber' | 'military-crt';

export interface ThreatAlert {
  id: string;
  threat_type: string;
  confidence: number;
  zone: string;
  timestamp: string;
  screenshot_path?: string;
  details?: string;
  status: 'active' | 'cleared' | 'acknowledged';
}

export interface MetricStats {
  framesProcessed: number;
  threatsDetected: number;
  modelAccuracy: number;
  systemUptime: string;
}

export interface DetectionBox {
  label: string;
  confidence: number;
  // Normalized coordinates (0 to 100) for flexible canvas overlay
  x: number;
  y: number;
  w: number;
  h: number;
  color?: string;
}

export interface SystemConfig {
  defconLevel: number;
  yoloThreshold: number;
  soundEnabled: boolean;
  selectedCamera: string;
  isDetecting: boolean;
  accuracyStats: {
    person: number;
    vehicle: number;
    weapon: number;
  };
}
