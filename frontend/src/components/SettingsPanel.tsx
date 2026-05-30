import React from 'react';
import { Sliders, Volume2, VolumeX, ShieldAlert, BadgeInfo, Layers, Trash2, ShieldCheck, Play } from 'lucide-react';
import { ThemeMode, SystemConfig, ThreatAlert } from '../types';

interface SettingsPanelProps {
  themeMode: ThemeMode;
  config: SystemConfig;
  onThemeChange: (mode: ThemeMode) => void;
  onConfigChange: (updater: Partial<SystemConfig>) => void;
  onInjectThreat: () => void;
  onResetStats: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  themeMode,
  config,
  onThemeChange,
  onConfigChange,
  onInjectThreat,
  onResetStats
}) => {
  return (
    <div className={`rounded-xl p-5 shadow-lg border transition-all duration-300 ${
      themeMode === 'military-crt'
        ? 'border-primary/45 bg-[#0d1122]/85 text-[#39ff14]'
        : themeMode === 'neon-cyber'
          ? 'border-neon-cyan/45 bg-[#0a0a0c] text-white'
          : 'glass-slate-panel text-white'
    }`}>
      {/* Settings Head */}
      <div className="flex justify-between items-center mb-5 border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-primary" />
          <h3 className="font-mono text-xs uppercase tracking-widest font-semibold">
            System Cockpit & Radar Controls
          </h3>
        </div>
        <span className="font-mono text-[9px] bg-red-950/20 text-neon-red px-2 py-0.5 rounded uppercase font-bold tracking-widest border border-neon-red/10 animate-pulse">
          Admin Clearance
        </span>
      </div>

      <div className="space-y-5 font-mono text-xs select-none">
        {/* Toggle Skins theme mode */}
        <div className="space-y-2">
          <label className="text-on-surface-variant font-bold uppercase tracking-wider text-[11px] block">
            Visual Theme HUD Configuration (Swap Interface Skin)
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['classic-glass', 'neon-cyber', 'military-crt'] as ThemeMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => onThemeChange(mode)}
                className={`px-2.5 py-2 rounded text-[10px] tracking-wider uppercase font-bold transition-all border ${
                  themeMode === mode
                    ? mode === 'military-crt'
                      ? 'border-primary bg-primary/25 text-primary shadow-[0_0_8px_rgba(57,255,20,0.35)]'
                      : mode === 'neon-cyber'
                        ? 'border-neon-cyan bg-neon-cyan/20 text-neon-cyan'
                        : 'border-white text-white bg-white/10'
                    : 'border-white/5 bg-white/5 text-on-surface-variant hover:bg-white/10'
                }`}
              >
                {mode.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* DEFCON Level settings */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-on-surface-variant font-bold uppercase tracking-wider block">
              DEFCON Status Level (Threat Assessment Level)
            </span>
            <span className={`font-bold px-2 py-0.5 rounded text-[10px] ${
              config.defconLevel === 1 
                ? 'bg-neon-red/15 text-neon-red border border-neon-red/20' 
                : config.defconLevel === 3
                  ? 'bg-amber-400/10 text-amber-400 border border-amber-400/20'
                  : 'bg-neon-green/10 text-neon-green border border-neon-green/20'
            }`}>
              DEFCON {config.defconLevel === 1 ? '1 [CRITICAL AIR DEFENSE]' : `${config.defconLevel} [SECURED PERIMETER]`}
            </span>
          </div>

          <input
            type="range"
            min="1"
            max="5"
            step="1"
            value={config.defconLevel}
            onChange={(e) => onConfigChange({ defconLevel: parseInt(e.target.value) })}
            className="w-full h-1 bg-white/5 rounded-lg appearance-none cursor-pointer accent-neon-red"
          />
          <div className="flex justify-between text-[9px] text-on-surface-variant px-1 font-bold">
            <span className="text-neon-red">DEFCON 1 (THREAT)</span>
            <span>DEFCON 3</span>
            <span className="text-neon-green">DEFCON 5 (SECURE)</span>
          </div>
        </div>

        {/* Sliders for filtering */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-on-surface-variant font-bold uppercase tracking-wider block">
              YOLOv8 Class Confidence Gate
            </span>
            <span className="text-primary font-bold">{config.yoloThreshold.toFixed(2)} Match</span>
          </div>
          <input
            type="range"
            min="0.10"
            max="0.90"
            step="0.05"
            value={config.yoloThreshold}
            onChange={(e) => onConfigChange({ yoloThreshold: parseFloat(e.target.value) })}
            className="w-full h-1 bg-white/5 rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <p className="text-[10px] text-on-surface-variant mt-1 leading-normal italic">
            Filters out detections with confidence layers below this threshold. Prevents false triggers in dusty conditions.
          </p>
        </div>

        {/* Audio warnings & Detection State controls */}
        <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
          <div className="space-y-2">
            <span className="text-on-surface-variant font-bold uppercase tracking-wider text-[10px] block">
              Audio Warning Chirps
            </span>
            <button
              onClick={() => onConfigChange({ soundEnabled: !config.soundEnabled })}
              className={`w-full py-2 px-3 rounded flex items-center justify-center gap-2 border text-xs font-bold uppercase tracking-wider transition-all ${
                config.soundEnabled
                  ? 'bg-primary/15 text-primary border-primary/20'
                  : 'bg-white/5 text-on-surface-variant border-white/5'
              }`}
            >
              {config.soundEnabled ? (
                <>
                  <Volume2 className="w-4 h-4 text-neon-green" />
                  SIREN ON
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-[#ff3131]" />
                  MUTED
                </>
              )}
            </button>
          </div>

          <div className="space-y-2">
            <span className="text-on-surface-variant font-bold uppercase tracking-wider text-[10px] block">
              Radar Simulation
            </span>
            <button
              onClick={() => onConfigChange({ isDetecting: !config.isDetecting })}
              className={`w-full py-2 px-3 rounded flex items-center justify-center gap-1.5 border text-xs font-bold uppercase tracking-wider transition-all ${
                config.isDetecting
                  ? 'bg-neon-green/15 text-neon-green border-neon-green/20'
                  : 'bg-white/5 text-on-surface-variant border-white/5'
              }`}
            >
              {config.isDetecting ? (
                <>
                  <ShieldCheck className="w-4 h-4 animate-bounce" />
                  RUNNING
                </>
              ) : (
                <>
                  <ShieldAlert className="w-4 h-4" />
                  PAUSED
                </>
              )}
            </button>
          </div>
        </div>

        {/* Trigger manually or Clean stats buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5">
          <button
            onClick={onInjectThreat}
            disabled={!config.isDetecting}
            className={`py-2 rounded flex items-center justify-center gap-1.5 font-bold uppercase tracking-widest text-[10px] border transition-all ${
              config.isDetecting
                ? 'bg-neon-red/10 text-white hover:bg-neon-red/20 border-neon-red/25 cursor-pointer'
                : 'bg-white/2.5 text-white/20 border-white/5 cursor-not-allowed'
            }`}
          >
            <Play className="w-3.5 h-3.5 text-neon-red" />
            Inject Alarm
          </button>

          <button
            onClick={onResetStats}
            className="py-2 bg-white/5 text-on-surface-variant hover:text-white hover:bg-red-500/10 border border-white/5 hover:border-red-500/20 rounded flex items-center justify-center gap-1.5 text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5 text-neon-red" />
            Reset Radar
          </button>
        </div>
      </div>
    </div>
  );
};
