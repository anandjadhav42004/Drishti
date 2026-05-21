import React, { useState, useEffect } from 'react';
import { AreaChart, Cpu, Clock, Percent, ShieldAlert, BarChart2 } from 'lucide-react';
import { ThemeMode, MetricStats, SystemConfig } from '../types';

interface AnalyticsPanelProps {
  themeMode: ThemeMode;
  stats: MetricStats;
  config: SystemConfig;
}

export const AnalyticsPanel: React.FC<AnalyticsPanelProps> = ({ themeMode, stats, config }) => {
  const [frames, setFrames] = useState(stats.framesProcessed);
  const [secsLive, setSecsLive] = useState(0);

  // Animate CCTV frame feed rolling
  useEffect(() => {
    if (!config.isDetecting) return;
    const interval = setInterval(() => {
      setFrames(f => f + Math.floor(Math.random() * 3) + 1);
    }, 120);

    return () => clearInterval(interval);
  }, [config.isDetecting]);

  // Animate dynamic uptime counter
  useEffect(() => {
    const interval = setInterval(() => {
      setSecsLive(s => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatSecsLive = (totalSecs: number) => {
    const hours = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    
    // Add base design uptime 48h 12m for continuity
    const finalHrs = 48 + hours;
    const finalMins = 12 + mins;
    return `${finalHrs}h ${finalMins}m ${secs}s`;
  };

  return (
    <div className="space-y-6">
      {/* 4-Column bento telemetry metric metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Metric Card 1 */}
        <div className={`p-4 rounded-xl relative overflow-hidden shadow-md border transition-all duration-300 ${
          themeMode === 'military-crt'
            ? 'border-primary/40 bg-[#0d1122]/70 text-[#39ff14]'
            : themeMode === 'neon-cyber'
              ? 'border-neon-cyan/40 bg-[#0a0a0c] text-white'
              : 'glass-slate-panel text-white'
        }`}>
          <div className="absolute top-2 right-2 opacity-15">
            <Cpu className="w-8 h-8" />
          </div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant">
            Frames Processed
          </p>
          <p className={`font-mono text-2xl font-bold mt-1 ${
            themeMode === 'military-crt' ? 'text-primary' : themeMode === 'neon-cyber' ? 'text-neon-cyan' : 'text-primary-container text-sky-400'
          }`}>
            {frames.toLocaleString()}
          </p>
          <div className="mt-2.5 h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
            <div className={`h-full transition-all duration-500 ${
              themeMode === 'military-crt' ? 'bg-primary' : themeMode === 'neon-cyber' ? 'bg-neon-cyan' : 'bg-sky-400'
            }`} style={{ width: '70%' }}></div>
          </div>
        </div>

        {/* Metric Card 2 */}
        <div className={`p-4 rounded-xl relative overflow-hidden shadow-md border transition-all duration-300 ${
          themeMode === 'military-crt'
            ? 'border-neon-red/40 bg-[#0d1122]/70 text-[#ff3131] animate-[pulse_3s_infinite]'
            : themeMode === 'neon-cyber'
              ? 'border-neon-red/40 bg-[#0a0a0c] text-white'
              : 'glass-slate-panel text-white border-red-500/10'
        }`}>
          <div className="absolute top-2 right-2 opacity-15">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant">
            Threats Logged
          </p>
          <p className="font-mono text-2xl font-bold mt-1 text-neon-red">
            {stats.threatsDetected}
          </p>
          <div className="mt-2.5 h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
            <div className="h-full bg-neon-red transition-all duration-500" style={{ width: `${Math.min(stats.threatsDetected * 6, 100)}%` }}></div>
          </div>
        </div>

        {/* Metric Card 3 */}
        <div className={`p-4 rounded-xl relative overflow-hidden shadow-md border transition-all duration-300 ${
          themeMode === 'military-crt'
            ? 'border-primary/40 bg-[#0d1122]/70 text-[#39ff14]'
            : themeMode === 'neon-cyber'
              ? 'border-neon-green/40 bg-[#0a0a0c] text-white'
              : 'glass-slate-panel text-white'
        }`}>
          <div className="absolute top-2 right-2 opacity-15">
            <Percent className="w-8 h-8" />
          </div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant">
            Model Accuracy
          </p>
          <p className={`font-mono text-2xl font-bold mt-1 ${
            themeMode === 'military-crt' ? 'text-primary' : 'text-[#39ff14]'
          }`}>
            {(config.yoloThreshold === 0.5 ? 98.4 : (100 - config.yoloThreshold * 15)).toFixed(1)}%
          </p>
          <div className="mt-2.5 h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
            <div className="h-full bg-neon-green transition-all duration-500" style={{ width: '96%' }}></div>
          </div>
        </div>

        {/* Metric Card 4 */}
        <div className={`p-4 rounded-xl relative overflow-hidden shadow-md border transition-all duration-300 ${
          themeMode === 'military-crt'
            ? 'border-primary/40 bg-[#0d1122]/70 text-[#39ff14]'
            : themeMode === 'neon-cyber'
              ? 'border-neon-cyan/40 bg-[#0a0a0c] text-white'
              : 'glass-slate-panel text-white'
        }`}>
          <div className="absolute top-2 right-2 opacity-15">
            <Clock className="w-8 h-8" />
          </div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant">
            Radar Uptime
          </p>
          <p className="font-mono text-sm font-bold mt-2 text-white">
            {formatSecsLive(secsLive)}
          </p>
          <div className="mt-2.5 h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
            <div className="h-full bg-on-surface-variant w-full transition-all duration-500"></div>
          </div>
        </div>
      </div>

      {/* Detection Class Breakdown bar chart representation */}
      <div className={`rounded-xl p-5 shadow-lg border transition-all duration-300 ${
        themeMode === 'military-crt'
          ? 'border-primary/45 bg-[#0d1122]/85 text-[#39ff14]'
          : themeMode === 'neon-cyber'
            ? 'border-neon-cyan/35 bg-[#0a0a0c] text-white'
            : 'glass-slate-panel text-white'
      }`}>
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-neon-green" />
            <h3 className="font-mono text-xs uppercase tracking-widest font-semibold">
              Live Entity Target Breakdown
            </h3>
          </div>
          <span className="font-mono text-[10px] bg-white/5 px-2.5 py-1 rounded border border-white/5 text-on-surface-variant uppercase">
            Surveillance Analytics
          </span>
        </div>

        <div className="space-y-4 font-mono">
          {/* PERSONNEL statistics */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px] font-semibold tracking-wider text-on-surface-variant">
              <span>PERSONNEL (SAFE / SECURED)</span>
              <span className="text-white font-bold">{config.accuracyStats.person}</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ${
                  themeMode === 'military-crt' ? 'bg-primary' : themeMode === 'neon-cyber' ? 'bg-neon-cyan' : 'bg-sky-400'
                }`}
                style={{ width: '85%' }}
              ></div>
            </div>
          </div>

          {/* VEHICLES statistics */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px] font-semibold tracking-wider text-on-surface-variant">
              <span>VEHICLES (DEFENSE MONITORING)</span>
              <span className="text-white font-bold">{config.accuracyStats.vehicle}</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
              <div 
                className="h-full bg-neon-green rounded-full transition-all duration-1000"
                style={{ width: '40%' }}
              ></div>
            </div>
          </div>

          {/* WEAPONS/ORDNANCE statistics */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px] font-semibold tracking-wider text-on-surface-variant">
              <span>ORDNANCE / THREATS INTERCEPTED</span>
              <span className="text-white font-bold">{config.accuracyStats.weapon + stats.threatsDetected}</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
              <div 
                className="h-full bg-neon-red rounded-full transition-all duration-1000 pulsing-threat-border"
                style={{ width: `${Math.min(12 + stats.threatsDetected * 4, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
