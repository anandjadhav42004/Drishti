import React, { useEffect } from 'react';
import { Shield, ShieldAlert, Check, X, BellOff, Volume2, AlertCircle } from 'lucide-react';
import { ThemeMode, ThreatAlert } from '../types';

interface AlertTrackerProps {
  themeMode: ThemeMode;
  alerts: ThreatAlert[];
  soundEnabled: boolean;
  onUpdateAlertStatus: (id: string, status: 'active' | 'cleared' | 'acknowledged') => void;
  onClearAll: () => void;
}

export const AlertTracker: React.FC<AlertTrackerProps> = ({
  themeMode,
  alerts,
  soundEnabled,
  onUpdateAlertStatus,
  onClearAll
}) => {
  // Synthesize warning alarm beep safely
  useEffect(() => {
    if (!soundEnabled || alerts.length === 0) return;
    
    // Play sound cue purely on the newest active alert
    const latestAlert = alerts[0];
    if (latestAlert.status === 'active') {
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        
        // Custom military high-pitch warning double pulse
        const playBeep = (delay: number, duration: number, frequency: number) => {
          setTimeout(() => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            
            osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);
            osc.type = 'sawtooth';
            
            gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
            // Quick decay envelope
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
            
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            
            osc.start();
            osc.stop(audioCtx.currentTime + duration);
          }, delay);
        };

        // Double warning chirp code
        playBeep(0, 0.15, 880);
        playBeep(180, 0.18, 1200);
      } catch (err) {
        console.warn("Audio warning chirp failed:", err);
      }
    }
  }, [alerts, soundEnabled]);

  return (
    <div className={`rounded-xl overflow-hidden shadow-lg transition-all duration-300 ${
      themeMode === 'military-crt'
        ? 'border border-neon-red/50 bg-[#0d1122]/85 text-[#ff3131]'
        : themeMode === 'neon-cyber'
          ? 'border border-neon-red bg-[#0a0a0c] text-white'
          : 'glass-slate-panel text-white'
    }`}>
      {/* Alert Header bar */}
      <div className={`p-4 border-b flex justify-between items-center ${
        themeMode === 'military-crt'
          ? 'border-neon-red/30 bg-red-950/20'
          : themeMode === 'neon-cyber'
            ? 'border-neon-red/20 bg-neon-red/5'
            : 'border-white/5 bg-white/5'
      }`}>
        <div className="flex items-center gap-2">
          <ShieldAlert className={`w-4 h-4 ${
            themeMode === 'military-crt' ? 'animate-pulse text-neon-red' : 'text-neon-red'
          }`} />
          <h3 className={`font-mono text-sm uppercase tracking-wider font-semibold ${
            themeMode === 'military-crt' ? 'text-neon-red font-headline' : 'text-white'
          }`}>
            Threat Notification Stream
          </h3>
          <span className="bg-neon-red/15 text-neon-red text-[11px] px-2 py-0.5 rounded-full font-mono font-bold">
            {alerts.filter(a => a.status === 'active').length} Active
          </span>
        </div>

        <button
          onClick={onClearAll}
          className="text-on-surface-variant hover:text-white transition-colors cursor-pointer text-xs font-mono flex items-center gap-1.5 uppercase tracking-wider"
        >
          <BellOff className="w-3.5 h-3.5" />
          Clear Log
        </button>
      </div>

      {/* alerts stream items list */}
      <div className="divide-y divide-white/5 max-h-[360px] overflow-y-auto font-mono scrollbar-thin">
        {alerts.length === 0 ? (
          <div className="p-8 text-center text-on-surface-variant flex flex-col items-center justify-center gap-2">
            <Shield className="w-8 h-8 text-on-surface-variant/40" />
            <p className="text-xs uppercase tracking-wider">Secure State — No actively logged alerts</p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 transition-all duration-300 flex items-start gap-4 hover:bg-white/[0.04] group ${
                alert.status === 'cleared'
                  ? 'opacity-40'
                  : alert.status === 'acknowledged'
                    ? 'border-l-4 border-[#ff914d] bg-[#ff914d]/3'
                    : 'border-l-4 border-neon-red bg-neon-red/3'
              }`}
            >
              {/* Vertical Color indicator bar */}
              <div className={`w-1 h-12 rounded-full flex-shrink-0 ${
                alert.status === 'cleared'
                  ? 'bg-secondary'
                  : alert.status === 'acknowledged'
                    ? 'bg-[#ff914d] shadow-[0_0_8px_rgba(255,145,77,0.5)]'
                    : 'bg-neon-red shadow-[0_0_8px_rgba(255,49,49,0.5)] animate-pulse'
              }`} />

              {/* Threat context */}
              <div className="flex-1 space-y-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className={`text-xs font-bold uppercase tracking-wider ${
                      alert.status === 'cleared'
                        ? 'text-secondary line-through'
                        : alert.status === 'acknowledged'
                          ? 'text-[#ff914d]'
                          : 'text-white'
                    }`}>
                      {alert.threat_type}
                    </h4>
                    <p className="text-[10px] text-on-surface-variant leading-relaxed mt-0.5 max-w-sm">
                      {alert.details}
                    </p>
                  </div>
                  <span className="text-[10px] text-on-surface-variant font-medium whitespace-nowrap">
                    {alert.timestamp}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 pt-1.5">
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                    alert.confidence > 85 
                      ? 'bg-error/10 text-error border border-error/20' 
                      : 'bg-[#ff914d]/10 text-[#ff914d] border border-[#ff914d]/20'
                  }`}>
                    {alert.confidence}% CONF
                  </span>

                  <span className="bg-white/5 border border-white/10 text-on-surface-variant px-2 py-0.5 rounded text-[9px] font-bold">
                    {alert.zone}
                  </span>

                  {alert.status !== 'cleared' && (
                    <div className="ml-auto flex items-center gap-1">
                      {alert.status === 'active' && (
                        <button
                          onClick={() => onUpdateAlertStatus(alert.id, 'acknowledged')}
                          className="bg-white/5 hover:bg-[#ff914d]/20 text-[#ff914d] p-1 rounded text-[9px] font-bold transition-all flex items-center gap-0.5"
                          title="Acknowledge Alert"
                        >
                          <AlertCircle className="w-3 h-3" />
                          ACK
                        </button>
                      )}
                      <button
                        onClick={() => onUpdateAlertStatus(alert.id, 'cleared')}
                        className="bg-white/5 hover:bg-secondary/25 text-secondary p-1 rounded text-[9px] font-bold transition-all flex items-center gap-0.5"
                        title="Clear as Safe"
                      >
                        <Check className="w-3 h-3" />
                        SAFE
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {alerts.length > 0 && (
        <div className={`p-2 text-center text-[10px] uppercase tracking-widest font-bold border-t ${
          themeMode === 'military-crt'
            ? 'border-neon-red/20 bg-red-950/10'
            : 'border-white/5 bg-white/5'
        }`}>
          END OF REGISTERED LOGS — MONITORING
        </div>
      )}
    </div>
  );
};
