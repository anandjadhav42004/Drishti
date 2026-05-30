import React from 'react';
import { useGlobalState } from '../GlobalState';

export function Dashboard() {
  const { addToast, setLockdown, openModal } = useGlobalState();

  const handleQuickAction = (label: string) => {
    if (label === 'LOCKDOWN') {
      setLockdown(true);
    } else if (label === 'FULL SCAN') {
      addToast('Initiating full perimeter scan...', 'info');
      setTimeout(() => addToast('Scan complete. No anomalies detected.', 'success'), 3000);
    } else if (label === 'ALL CAMS') {
      addToast('Syncing 52 camera feeds to main view', 'info');
    } else if (label === 'REPORT') {
      openModal('Generate Incident Report', (
        <div className="flex flex-col gap-4">
          <p>Select timeline for the incident report export.</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-primary-fixed-dim/20 text-primary-fixed-dim rounded border border-primary-fixed-dim/30">Last 24 Hours</button>
            <button className="px-4 py-2 bg-surface-variant/20 hover:bg-surface-variant/40 rounded border border-outline-variant/30 text-on-surface">Last 7 Days</button>
          </div>
          <button className="mt-4 px-4 py-2 bg-primary-fixed-dim text-on-primary-fixed font-bold rounded" onClick={() => addToast('Report generation started', 'success')}>Export PDF</button>
        </div>
      ));
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .glass-card {
            background: linear-gradient(135deg, rgba(29, 32, 35, 0.8) 0%, rgba(16, 20, 23, 0.9) 100%);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(132, 149, 135, 0.15);
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
        }
        .scan-line {
            background: linear-gradient(to right, transparent, rgba(0, 227, 138, 0.4), transparent);
            height: 1px;
            width: 100%;
            position: absolute;
            animation: scan 4s linear infinite;
            z-index: 5;
        }
        @keyframes scan {
            0% { top: -10%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 110%; opacity: 0; }
        }
        @keyframes radar-sweep {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .radar-sweep {
            animation: radar-sweep 4s linear infinite;
        }
        @keyframes pulse-ring {
            0% { transform: scale(0.8); opacity: 1; }
            100% { transform: scale(2.2); opacity: 0; }
        }
        .pulse-ring {
            animation: pulse-ring 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite;
        }
        .activity-line {
            background: repeating-linear-gradient(90deg, #00daf3, #00daf3 2px, transparent 2px, transparent 6px);
        }
      ` }} />
<main className="ml-20 mt-16 p-8 h-[calc(100vh-64px)] overflow-y-auto overflow-x-hidden custom-scrollbar">
<div className="grid grid-cols-12 gap-gutter max-w-[1700px] mx-auto">

{/* Hero Status Banner */}
<div className="col-span-12 glass-card rounded-sm p-8 relative overflow-hidden">
<div className="scan-line"></div>
<div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(0,227,138,0.06),transparent_60%)]"></div>
<div className="flex justify-between items-center z-10 relative">
<div className="flex items-center gap-8">
<div className="relative">
<div className="w-20 h-20 rounded-full border-2 border-primary-fixed-dim/40 flex items-center justify-center">
<div className="w-14 h-14 rounded-full bg-primary-fixed-dim/10 flex items-center justify-center border border-primary-fixed-dim/30">
<span className="material-symbols-outlined text-primary-fixed-dim text-3xl">shield</span>
</div>
</div>
<div className="absolute inset-0 rounded-full border-2 border-primary-fixed-dim/20 pulse-ring"></div>
</div>
<div className="space-y-2">
<div className="flex items-center gap-3">
<h1 className="font-display-lg text-3xl text-on-surface tracking-tight">DEFENSE GRID ACTIVE</h1>
<span className="px-3 py-1 bg-primary-fixed-dim/15 border border-primary-fixed-dim/40 rounded-sm font-data-mono text-[10px] text-primary-fixed-dim uppercase tracking-[0.2em] animate-pulse">ONLINE</span>
</div>
<p className="font-data-mono text-[11px] text-on-surface-variant tracking-wider uppercase">All systems nominal · Threat Level: LOW · Coverage: 98.7%</p>
</div>
</div>
<div className="flex gap-8 font-data-mono text-right">
<div className="space-y-1">
<span className="text-[9px] text-on-surface-variant tracking-widest block">LOCAL_TIME</span>
<span className="text-lg text-secondary-fixed-dim">08:52:32</span>
</div>
<div className="space-y-1">
<span className="text-[9px] text-on-surface-variant tracking-widest block">SESSION</span>
<span className="text-lg text-on-surface">432:12:08</span>
</div>
</div>
</div>
</div>

{/* Quick Stats Row */}
{[
  { icon: 'videocam', label: 'ACTIVE_CAMERAS', value: '48', sub: '/ 52 Total', color: 'text-secondary-fixed-dim', borderColor: 'border-secondary-fixed-dim/30', bgColor: 'bg-secondary-fixed-dim/10' },
  { icon: 'warning', label: 'OPEN_THREATS', value: '03', sub: 'Critical: 1', color: 'text-error', borderColor: 'border-error/30', bgColor: 'bg-error/10' },
  { icon: 'target', label: 'DETECTIONS_24H', value: '1,247', sub: '+12% vs avg', color: 'text-primary-fixed-dim', borderColor: 'border-primary-fixed-dim/30', bgColor: 'bg-primary-fixed-dim/10' },
  { icon: 'speed', label: 'SYSTEM_HEALTH', value: '99.8%', sub: 'Optimal', color: 'text-primary-fixed-dim', borderColor: 'border-primary-fixed-dim/30', bgColor: 'bg-primary-fixed-dim/10' },
].map((stat, i) => (
<div key={i} className={`col-span-12 md:col-span-3 glass-card rounded-sm p-6 border-l-2 ${stat.borderColor} hover:shadow-lg transition-all`}>
<div className="flex items-start justify-between">
<div className="space-y-3">
<span className="font-data-mono text-[10px] text-on-surface-variant tracking-widest uppercase block">{stat.label}</span>
<div className="flex items-baseline gap-2">
<span className={`font-display-lg text-3xl ${stat.color}`}>{stat.value}</span>
<span className="font-data-mono text-[10px] text-on-surface-variant">{stat.sub}</span>
</div>
</div>
<div className={`p-3 rounded-sm ${stat.bgColor}`}>
<span className={`material-symbols-outlined ${stat.color} text-[22px]`}>{stat.icon}</span>
</div>
</div>
</div>
))}

{/* Zone Map */}
<div className="col-span-12 md:col-span-8 glass-card rounded-sm p-8 relative overflow-hidden min-h-[420px]">
<div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(0,218,243,0.04),transparent_60%)]"></div>
<div className="flex justify-between items-center mb-8 z-10 relative">
<div className="flex items-center gap-4">
<div className="w-2 h-8 bg-secondary-fixed-dim shadow-[0_0_10px_#00daf3]"></div>
<div>
<h3 className="font-display-lg text-xl tracking-tight text-on-surface uppercase">Perimeter Zone Map</h3>
<p className="font-data-mono text-[10px] text-on-surface-variant tracking-widest mt-0.5">LIVE_FEED · GRID_REF: SECTOR_ALPHA</p>
</div>
</div>
<div className="flex gap-6 font-data-mono">
<div className="flex items-center gap-2">
<div className="w-2 h-2 bg-primary-fixed-dim rounded-full shadow-[0_0_8px_#00e38a]"></div>
<span className="text-[10px] text-on-surface-variant uppercase">Secure</span>
</div>
<div className="flex items-center gap-2">
<div className="w-2 h-2 bg-error rounded-full shadow-[0_0_8px_#ffb4ab] animate-pulse"></div>
<span className="text-[10px] text-on-surface-variant uppercase">Alert</span>
</div>
<div className="flex items-center gap-2">
<div className="w-2 h-2 bg-secondary-fixed-dim rounded-full shadow-[0_0_8px_#00daf3]"></div>
<span className="text-[10px] text-on-surface-variant uppercase">Scanning</span>
</div>
</div>
</div>

{/* SVG Zone Grid */}
<div className="relative z-10">
<svg viewBox="0 0 800 300" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
{/* Grid lines */}
<g stroke="rgba(132,149,135,0.08)" strokeWidth="0.5">
{[...Array(9)].map((_, i) => <line key={`h${i}`} x1="0" y1={i * 37.5} x2="800" y2={i * 37.5} />)}
{[...Array(17)].map((_, i) => <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="300" />)}
</g>
{/* Zone polygons */}
<polygon points="50,40 300,40 300,140 50,140" fill="rgba(0,227,138,0.08)" stroke="#00e38a" strokeWidth="1" opacity="0.8" />
<text x="170" y="95" fill="#00e38a" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle" opacity="0.7">ZONE_ALPHA</text>
<polygon points="320,30 550,30 550,130 320,130" fill="rgba(0,218,243,0.08)" stroke="#00daf3" strokeWidth="1" opacity="0.8" />
<text x="435" y="85" fill="#00daf3" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle" opacity="0.7">ZONE_BRAVO</text>
<polygon points="570,50 760,50 760,160 570,160" fill="rgba(255,180,171,0.08)" stroke="#ffb4ab" strokeWidth="1" opacity="0.8" />
<text x="665" y="110" fill="#ffb4ab" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle" opacity="0.7">ZONE_CHARLIE</text>
<circle cx="680" cy="90" r="5" fill="#ffb4ab" opacity="0.8"><animate attributeName="r" values="5;9;5" dur="2s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite" /></circle>
<polygon points="80,170 350,170 350,270 80,270" fill="rgba(0,227,138,0.06)" stroke="#00e38a" strokeWidth="1" opacity="0.6" />
<text x="215" y="225" fill="#00e38a" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle" opacity="0.7">ZONE_DELTA</text>
<polygon points="380,160 750,160 750,280 380,280" fill="rgba(0,218,243,0.06)" stroke="#00daf3" strokeWidth="1" opacity="0.6" />
<text x="565" y="225" fill="#00daf3" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle" opacity="0.7">ZONE_ECHO</text>
{/* Camera dots */}
{[[100,60],[250,120],[200,200],[340,80],[500,70],[450,190],[620,80],[700,130],[600,250],[150,250]].map(([cx,cy], i) => (
<g key={i}>
<circle cx={cx} cy={cy} r="3" fill="#00daf3" opacity="0.9" />
<circle cx={cx} cy={cy} r="6" fill="none" stroke="#00daf3" strokeWidth="0.5" opacity="0.4" />
</g>
))}
{/* Radar sweep at alert zone */}
<circle cx="680" cy="90" r="25" fill="none" stroke="#ffb4ab" strokeWidth="0.5" strokeDasharray="4 3" opacity="0.5">
<animateTransform attributeName="transform" type="rotate" from="0 680 90" to="360 680 90" dur="4s" repeatCount="indefinite" />
</circle>
</svg>
</div>
</div>

{/* Right Column: Activity Feed + Quick Actions */}
<div className="col-span-12 md:col-span-4 flex flex-col gap-gutter">
{/* Live Activity Feed */}
<div className="glass-card rounded-sm p-6 flex-1 flex flex-col">
<div className="flex items-center justify-between mb-6">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-secondary-fixed-dim text-[20px]">rss_feed</span>
<h3 className="font-display-lg text-lg tracking-tight text-on-surface uppercase">Live Feed</h3>
</div>
<div className="flex items-center gap-2">
<div className="w-1.5 h-1.5 bg-primary-fixed-dim rounded-full animate-pulse"></div>
<span className="font-data-mono text-[9px] text-primary-fixed-dim tracking-wider">STREAMING</span>
</div>
</div>
<div className="space-y-3 flex-1 overflow-y-auto pr-2 custom-scrollbar max-h-[280px]">
{[
  { time: '08:52:18', event: 'Person detected — Zone Alpha Gate B', type: 'info', icon: 'person' },
  { time: '08:51:42', event: 'Vehicle license plate scanned: MH-04-XX-1234', type: 'info', icon: 'directions_car' },
  { time: '08:50:55', event: 'ALERT: Unidentified object — Zone Charlie', type: 'alert', icon: 'warning' },
  { time: '08:49:30', event: 'Camera CAM-17 auto-recalibrated', type: 'system', icon: 'settings' },
  { time: '08:48:12', event: 'Perimeter scan complete — All clear', type: 'success', icon: 'check_circle' },
  { time: '08:47:01', event: 'AI model v4.2.1 inference latency: 12ms', type: 'system', icon: 'memory' },
  { time: '08:45:38', event: 'Shift change logged — Team Bravo on duty', type: 'info', icon: 'groups' },
  { time: '08:44:10', event: 'Thermal anomaly resolved — Zone Delta', type: 'success', icon: 'thermostat' },
].map((item, i) => (
<div key={i} className={`flex items-start gap-3 p-3 rounded-sm border transition-all hover:bg-surface-variant/20 ${item.type === 'alert' ? 'border-error/20 bg-error/5' : 'border-outline-variant/10'}`}>
<span className={`material-symbols-outlined text-[16px] mt-0.5 ${item.type === 'alert' ? 'text-error' : item.type === 'success' ? 'text-primary-fixed-dim' : 'text-on-surface-variant/60'}`}>{item.icon}</span>
<div className="flex-1 min-w-0">
<p className={`font-data-mono text-[11px] leading-relaxed ${item.type === 'alert' ? 'text-error' : 'text-on-surface/80'}`}>{item.event}</p>
<span className="font-data-mono text-[9px] text-on-surface-variant/50 mt-1 block">{item.time}</span>
</div>
</div>
))}
</div>
</div>

{/* Quick Actions */}
<div className="glass-card rounded-sm p-6">
<h3 className="font-display-lg text-lg tracking-tight text-on-surface uppercase mb-5 flex items-center gap-3">
<span className="material-symbols-outlined text-primary-fixed-dim text-[20px]">bolt</span>
Quick Actions
</h3>
<div className="grid grid-cols-2 gap-3">
{[
  { icon: 'crisis_alert', label: 'LOCKDOWN', color: 'text-error', bg: 'bg-error/10 border-error/20 hover:bg-error/20' },
  { icon: 'radar', label: 'FULL SCAN', color: 'text-secondary-fixed-dim', bg: 'bg-secondary-fixed-dim/10 border-secondary-fixed-dim/20 hover:bg-secondary-fixed-dim/20' },
  { icon: 'videocam', label: 'ALL CAMS', color: 'text-on-surface-variant', bg: 'bg-surface-variant/30 border-outline-variant/20 hover:bg-surface-variant/50' },
  { icon: 'description', label: 'REPORT', color: 'text-primary-fixed-dim', bg: 'bg-primary-fixed-dim/10 border-primary-fixed-dim/20 hover:bg-primary-fixed-dim/20' },
].map((action, i) => (
<button key={i} onClick={() => handleQuickAction(action.label)} className={`flex flex-col items-center justify-center gap-2 p-4 rounded-sm border transition-all ${action.bg}`}>
<span className={`material-symbols-outlined ${action.color} text-[22px]`}>{action.icon}</span>
<span className={`font-data-mono text-[9px] ${action.color} tracking-[0.15em]`}>{action.label}</span>
</button>
))}
</div>
</div>
</div>

{/* Recent Detections Table */}
<div className="col-span-12 glass-card rounded-sm p-8 mb-10">
<div className="flex items-center justify-between mb-8">
<div className="flex items-center gap-4">
<div className="w-2 h-8 bg-primary-fixed-dim shadow-[0_0_10px_#00e38a]"></div>
<div>
<h3 className="font-display-lg text-xl tracking-tight text-on-surface uppercase">Recent Detections</h3>
<p className="font-data-mono text-[10px] text-on-surface-variant tracking-widest mt-0.5">LAST_24H · AUTO_CLASSIFIED</p>
</div>
</div>
<button onClick={() => addToast('Loading full detections log...', 'info')} className="px-4 py-2 bg-surface-variant/20 border border-outline-variant/20 hover:border-primary-fixed-dim hover:text-primary-fixed-dim transition-all font-data-mono text-[10px] uppercase tracking-[0.15em] rounded-sm">
View All
</button>
</div>
<div className="overflow-x-auto">
<table className="w-full">
<thead>
<tr className="border-b border-outline-variant/15">
{['TIMESTAMP', 'TYPE', 'ZONE', 'CONFIDENCE', 'STATUS', 'ACTION'].map(h => (
<th key={h} className="text-left py-3 px-4 font-data-mono text-[10px] text-on-surface-variant/60 uppercase tracking-widest">{h}</th>
))}
</tr>
</thead>
<tbody>
{[
  { time: '08:50:55', type: 'Unidentified Object', zone: 'CHARLIE', confidence: '87.2%', status: 'ACTIVE', statusColor: 'text-error bg-error/10 border-error/30' },
  { time: '08:48:22', type: 'Personnel', zone: 'ALPHA', confidence: '99.8%', status: 'CLEARED', statusColor: 'text-primary-fixed-dim bg-primary-fixed-dim/10 border-primary-fixed-dim/30' },
  { time: '08:45:10', type: 'Vehicle', zone: 'BRAVO', confidence: '98.1%', status: 'LOGGED', statusColor: 'text-secondary-fixed-dim bg-secondary-fixed-dim/10 border-secondary-fixed-dim/30' },
  { time: '08:42:33', type: 'Personnel', zone: 'DELTA', confidence: '99.4%', status: 'CLEARED', statusColor: 'text-primary-fixed-dim bg-primary-fixed-dim/10 border-primary-fixed-dim/30' },
  { time: '08:38:17', type: 'Thermal Anomaly', zone: 'ECHO', confidence: '72.6%', status: 'RESOLVED', statusColor: 'text-on-surface-variant bg-surface-variant/30 border-outline-variant/20' },
].map((row, i) => (
<tr key={i} className="border-b border-outline-variant/8 hover:bg-surface-variant/10 transition-colors">
<td className="py-3 px-4 font-data-mono text-[11px] text-secondary-fixed-dim">{row.time}</td>
<td className="py-3 px-4 font-data-mono text-[11px] text-on-surface">{row.type}</td>
<td className="py-3 px-4 font-data-mono text-[11px] text-on-surface-variant">{row.zone}</td>
<td className="py-3 px-4 font-data-mono text-[11px] text-on-surface">{row.confidence}</td>
<td className="py-3 px-4">
<span className={`px-2.5 py-1 rounded-sm font-data-mono text-[9px] border uppercase tracking-wider ${row.statusColor}`}>{row.status}</span>
</td>
<td className="py-3 px-4">
<span onClick={() => addToast('Opening detection details...', 'info')} className="material-symbols-outlined text-on-surface-variant/40 hover:text-secondary-fixed-dim cursor-pointer transition-colors text-[18px]">visibility</span>
</td>
</tr>
))}
</tbody>
</table>
</div>
</div>

</div>
</main>

{/* Footer */}
<footer className="fixed bottom-0 left-0 w-full z-50 flex justify-between items-center px-margin-edge h-10 bg-surface-container-lowest/95 backdrop-blur-xl border-t border-outline-variant/10 shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
<div className="flex items-center gap-8">
<div className="flex items-center gap-2">
<span className="font-data-mono text-[10px] text-primary-fixed-dim/60 uppercase">Position</span>
<span className="font-data-mono text-label-sm text-primary-fixed-dim tracking-wider font-bold">28.6139° N, 77.2090° E</span>
</div>
<div className="w-px h-3 bg-outline-variant/30"></div>
<div className="flex items-center gap-2">
<span className="font-data-mono text-[10px] text-primary-fixed-dim/60 uppercase">Link</span>
<span className="font-data-mono text-label-sm text-primary-fixed-dim tracking-wider">SECURE_SSL_v4</span>
</div>
</div>
<div className="flex items-center gap-10">
<div className="flex items-center gap-2 group cursor-help">
<span className="font-data-mono text-[10px] text-on-surface-variant uppercase">Node Ping</span>
<span className="font-data-mono text-label-sm text-primary-fixed-dim font-bold">14.00 MS</span>
</div>
<div className="flex items-center gap-2">
<span className="font-data-mono text-[10px] text-on-surface-variant uppercase">Health</span>
<div className="flex gap-0.5">
<div className="w-1 h-3 bg-primary-fixed-dim"></div>
<div className="w-1 h-3 bg-primary-fixed-dim"></div>
<div className="w-1 h-3 bg-primary-fixed-dim"></div>
<div className="w-1 h-3 bg-primary-fixed-dim/30"></div>
</div>
<span className="font-data-mono text-label-sm text-primary-fixed-dim uppercase ml-1">Excellent</span>
</div>
</div>
</footer>

    </>
  );
}
