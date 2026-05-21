import React, { useState, useEffect } from 'react';
import { Shield, Radio, ShieldAlert, Sparkles, AlertTriangle, Cpu, Terminal, Layers } from 'lucide-react';
import { ThemeMode, ThreatAlert, MetricStats, SystemConfig } from './types';
import { SurveillanceFeed } from './components/SurveillanceFeed';
import { AlertTracker } from './components/AlertTracker';
import { AnalyticsPanel } from './components/AnalyticsPanel';
import { SettingsPanel } from './components/SettingsPanel';
import { PortfolioDoc } from './components/PortfolioDoc';

// Default mock alert dataset matching user templates
const INITIAL_ALERTS: ThreatAlert[] = [
  {
    id: 'init_1',
    threat_type: 'Weapon Detected',
    confidence: 94,
    zone: 'ZONE A_04',
    timestamp: '2 mins ago',
    status: 'active',
    details: 'Weapon system parsed from optical video feed. Tactical rifle localized with high signature matching.'
  },
  {
    id: 'init_2',
    threat_type: 'Suspicious Vehicle',
    confidence: 72,
    zone: 'ZONE C_01',
    timestamp: '15 mins ago',
    status: 'acknowledged',
    details: 'Unmarked light cargo truck tracked entering perimeter fence. Tracking speed: 22 km/h.'
  },
  {
    id: 'init_3',
    threat_type: 'Unauthorized Entry',
    confidence: 89,
    zone: 'ZONE B_02',
    timestamp: '45 mins ago',
    status: 'active',
    details: 'Infrared motion threshold breeched. Live person signature registered under low surveillance visibility.'
  }
];

export default function App() {
  const [themeMode, setThemeMode] = useState<ThemeMode>('classic-glass');
  
  // DRISHTI active state registers
  const [alerts, setAlerts] = useState<ThreatAlert[]>(INITIAL_ALERTS);
  const [stats, setStats] = useState<MetricStats>({
    framesProcessed: 124502,
    threatsDetected: 3,
    modelAccuracy: 98.4,
    systemUptime: '48h 12m'
  });

  const [config, setConfig] = useState<SystemConfig>({
    defconLevel: 3,
    yoloThreshold: 0.60,
    soundEnabled: true,
    selectedCamera: 'CAM_SEC_01',
    isDetecting: true,
    accuracyStats: {
      person: 642,
      vehicle: 128,
      weapon: 14
    }
  });

  // Keep stats in sync with alerts log lengths
  useEffect(() => {
    const activeCount = alerts.filter(a => a.status === 'active').length;
    setStats(prev => ({
      ...prev,
      threatsDetected: activeCount
    }));
  }, [alerts]);

  // Handler for status mutations (Safe, Acknowledge, etc.)
  const handleUpdateAlertStatus = (id: string, status: 'active' | 'cleared' | 'acknowledged') => {
    setAlerts(prev =>
      prev.map(alert => (alert.id === id ? { ...alert, status } : alert))
    );
  };

  // Add a newly detected alert securely
  const handleAddAlert = (newAlert: ThreatAlert) => {
    setAlerts(prev => [newAlert, ...prev]);
  };

  // Bump analytical telemetry when new CV detections land
  const handleAddDetections = (count: number) => {
    setConfig(prev => ({
      ...prev,
      accuracyStats: {
        ...prev.accuracyStats,
        weapon: prev.accuracyStats.weapon + count
      }
    }));
  };

  // Inject a synthetic simulated security threat on command
  const handleInjectThreat = () => {
    const randomClasses = [
      { name: 'Tactical Weapon Detected', details: 'Weapon outline matched against defense standard profiles. Confidence range high.' },
      { name: 'Unauthorized Intrusion Sector Cross', details: 'Personnel signature tracked trespassing coordinate sensors. Alerting garrison commanders.' },
      { name: 'Unidentified Armored Carrier', details: 'Suspicious vehicle registered crossing barricade limits without response signatures.' }
    ];
    const item = randomClasses[Math.floor(Math.random() * randomClasses.length)];
    const zones = ['ZONE A_01', 'ZONE B_04', 'ZONE C_08', 'ZONE D_12'];
    const zone = zones[Math.floor(Math.random() * zones.length)];

    const simulatedAlert: ThreatAlert = {
      id: 'simulation_' + Date.now(),
      threat_type: item.name,
      confidence: 84 + Math.floor(Math.random() * 12),
      zone: zone,
      timestamp: new Date().toLocaleTimeString(),
      status: 'active',
      details: item.details
    };

    handleAddAlert(simulatedAlert);
    handleAddDetections(1);
    
    // Simulate DEFCON going up if alert lands under active vigilance
    if (config.defconLevel > 1) {
      setConfig(prev => ({ ...prev, defconLevel: 1 }));
    }
  };

  // Reset metrics to factory defaults
  const handleResetStats = () => {
    setAlerts([]);
    setConfig(prev => ({
      ...prev,
      defconLevel: 5,
      accuracyStats: {
        person: 0,
        vehicle: 0,
        weapon: 0
      }
    }));
  };

  const handleClearAllAlerts = () => {
    setAlerts([]);
  };

  const handleConfigChange = (updater: Partial<SystemConfig>) => {
    setConfig(prev => ({ ...prev, ...updater }));
  };

  // Define background style skins based on selected Theme Mode
  const getBodySkinClass = () => {
    switch (themeMode) {
      case 'military-crt':
        return 'military-grid min-h-screen font-sans overflow-x-hidden relative selection:bg-[#39ff14]/30 text-white pb-12';
      case 'neon-cyber':
        return 'bg-[#030305] min-h-screen font-sans overflow-x-hidden relative selection:bg-[#00ffff]/30 text-white pb-12';
      default:
        return 'bg-[#121214] min-h-screen font-sans overflow-x-hidden relative selection:bg-sky-400/30 text-white pb-12';
    }
  };

  const getHeaderSkinClass = () => {
    switch (themeMode) {
      case 'military-crt':
        return 'bg-black/80 border-b border-primary/20 shadow-[0_0_15px_rgba(57,255,20,0.15)]';
      case 'neon-cyber':
        return 'bg-[#070709]/90 border-b border-neon-cyan/30 shadow-[0_4px_20px_rgba(0,0,0,0.6)]';
      default:
        return 'bg-[#18181b]/70 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.30)]';
    }
  };

  return (
    <div className={getBodySkinClass()}>
      {/* Global CRT Scanner line overlay */}
      {themeMode === 'military-crt' && <div className="crt-scanline"></div>}

      {/* Top Header Bar */}
      <header className={`sticky top-0 w-full z-50 transition-all duration-300 ${getHeaderSkinClass()} flex items-center justify-between px-6 h-16`}>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Shield className={`w-5 h-5 ${themeMode === 'military-crt' ? 'text-primary animate-pulse' : themeMode === 'neon-cyber' ? 'text-neon-cyan' : 'text-sky-400'}`} />
            <h1 className={`font-bold tracking-widest text-lg ${themeMode === 'military-crt' ? 'font-headline text-primary' : 'text-white'}`}>
              DRISHTI <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded ml-1 tracking-normal text-on-surface-variant font-mono">v4.2 PRO</span>
            </h1>
          </div>
          <span className="hidden md:inline-block h-4 w-[1px] bg-white/10"></span>
          <p className="hidden md:inline-block font-mono text-[10px] text-on-surface-variant uppercase tracking-wider">
            Real-time Intelligent Surveillance & Threat Sentry
          </p>
        </div>

        <div className="flex items-center gap-4 select-none">
          {/* Active Sensor Beacon */}
          <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
            <Radio className="w-3.5 h-3.5 text-secondary animate-pulse" />
            <span className="font-mono text-[9px] text-secondary font-bold tracking-widest uppercase">
              Core Active
            </span>
          </div>

          <span className="h-6 w-[1px] bg-white/10"></span>

          {/* Skin selector shorthand */}
          <button
            onClick={() => {
              const modes: ThemeMode[] = ['classic-glass', 'neon-cyber', 'military-crt'];
              const currentIdx = modes.indexOf(themeMode);
              setThemeMode(modes[(currentIdx + 1) % modes.length]);
            }}
            className="p-1.5 hover:bg-white/5 rounded-lg text-on-surface-variant hover:text-white transition-all flex items-center gap-1 cursor-pointer"
            title="Swap Theme Mode Skin"
          >
            <Layers className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-mono uppercase tracking-wider hidden sm:inline">Theme</span>
          </button>
        </div>
      </header>

      {/* Main HUD Interface body */}
      <main className="pt-6 px-4 md:px-8 max-w-7xl mx-auto space-y-6">
        {/* Dynamic Alarm Banner if DEFCON 1 is Active */}
        {config.defconLevel === 1 && (
          <div className="p-4 rounded-xl border border-neon-red bg-neon-red/10 text-white animate-pulse flex items-center justify-between gap-4 shadow-lg shadow-red-500/15">
            <div className="flex items-center gap-3">
              <ShieldAlert className="w-6 h-6 text-neon-red shrink-0" />
              <div>
                <h4 className="font-bold text-xs uppercase tracking-widest font-mono text-neon-red">
                  SECURED DEFENSE ALERT LEVEL 1 ACTIVE
                </h4>
                <p className="text-[11px] font-mono text-on-surface-variant mt-0.5">
                  Critical optical threshold exceeded. Tracking active weapon/intruder parameters. High alerts routed.
                </p>
              </div>
            </div>
            <span className="font-mono text-[10px] bg-neon-red text-black px-3 py-1 rounded font-bold uppercase tracking-wider hidden sm:inline-block">
              Immediate Danger
            </span>
          </div>
        )}

        {/* Analytics row */}
        <AnalyticsPanel
          themeMode={themeMode}
          stats={stats}
          config={config}
        />

        {/* Core Double Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Area - Video Sentry Channel feeds */}
          <div className="lg:col-span-8 space-y-6">
            <SurveillanceFeed
              themeMode={themeMode}
              config={config}
              onAddAlert={handleAddAlert}
              onAddDetections={handleAddDetections}
            />
            
            <PortfolioDoc
              themeMode={themeMode}
            />
          </div>

          {/* Right Sidebar - Alerts & Controls Cockpit */}
          <div className="lg:col-span-4 space-y-6">
            <SettingsPanel
              themeMode={themeMode}
              config={config}
              onThemeChange={setThemeMode}
              onConfigChange={handleConfigChange}
              onInjectThreat={handleInjectThreat}
              onResetStats={handleResetStats}
            />

            <AlertTracker
              themeMode={themeMode}
              alerts={alerts}
              soundEnabled={config.soundEnabled}
              onUpdateAlertStatus={handleUpdateAlertStatus}
              onClearAll={handleClearAllAlerts}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
