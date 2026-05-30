import React from 'react';
import { useGlobalState } from '../GlobalState';
import { Link, useNavigate } from 'react-router-dom';

export function Health() {
  const { addToast, setLockdown, openModal } = useGlobalState();
  const navigate = useNavigate();
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
            height: 1px; width: 100%; position: absolute;
            animation: scan 4s linear infinite; z-index: 5;
        }
        @keyframes scan {
            0% { top: -10%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 110%; opacity: 0; }
        }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(132, 149, 135, 0.3); border-radius: 2px; }
        @keyframes heartbeat {
            0%, 100% { transform: scale(1); }
            14% { transform: scale(1.15); }
            28% { transform: scale(1); }
            42% { transform: scale(1.1); }
            56% { transform: scale(1); }
        }
        .heartbeat { animation: heartbeat 1.8s ease-in-out infinite; }
        .segment-bar {
            background-image: repeating-linear-gradient(90deg, #00daf3, #00daf3 1px, transparent 1px, transparent 3px);
        }
      ` }} />





{/* Main Content */}
<main className="ml-20 mt-16 p-8 h-[calc(100vh-64px)] overflow-y-auto overflow-x-hidden custom-scrollbar">
<div className="grid grid-cols-12 gap-gutter max-w-[1700px] mx-auto">

{/* Heartbeat Hero */}
<div className="col-span-12 glass-card rounded-sm p-8 relative overflow-hidden">
<div className="scan-line"></div>
<div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,227,138,0.05),transparent_60%)]"></div>
<div className="flex justify-between items-center z-10 relative">
<div className="flex items-center gap-8">
<div className="relative">
<div className="w-20 h-20 rounded-full border-2 border-primary-fixed-dim/30 flex items-center justify-center">
<span className="material-symbols-outlined text-primary-fixed-dim text-4xl heartbeat">favorite</span>
</div>
</div>
<div className="space-y-2">
<div className="flex items-center gap-3">
<h1 className="font-display-lg text-3xl text-on-surface tracking-tight">SYSTEM VITALS</h1>
<span className="px-3 py-1 bg-primary-fixed-dim/15 border border-primary-fixed-dim/40 rounded-sm font-data-mono text-[10px] text-primary-fixed-dim uppercase tracking-[0.2em]">ALL NOMINAL</span>
</div>
<p className="font-data-mono text-[11px] text-on-surface-variant tracking-wider uppercase">Uptime: 432h 12m · Last Incident: 72h ago · Integrity Score: 99.8%</p>
</div>
</div>
<div className="flex gap-8 font-data-mono">
<div className="text-right space-y-1">
<span className="text-[9px] text-on-surface-variant tracking-widest block">HEALTH_INDEX</span>
<span className="text-3xl text-primary-fixed-dim font-bold">A+</span>
</div>
</div>
</div>
</div>

{/* Infrastructure Cards */}
{[
  { icon: 'dns', label: 'AI_INFERENCE_NODE', status: 'ONLINE', cpu: 68, mem: 74, temp: 52, ip: '10.0.1.10', color: 'primary-fixed-dim' },
  { icon: 'storage', label: 'DATA_LAKE_PRIMARY', status: 'ONLINE', cpu: 42, mem: 88, temp: 38, ip: '10.0.1.20', color: 'secondary-fixed-dim' },
  { icon: 'cloud', label: 'EDGE_GATEWAY_01', status: 'ONLINE', cpu: 31, mem: 55, temp: 34, ip: '10.0.2.01', color: 'primary-fixed-dim' },
  { icon: 'router', label: 'NETWORK_CORE', status: 'DEGRADED', cpu: 89, mem: 92, temp: 68, ip: '10.0.0.01', color: 'error' },
].map((node, i) => (
<div key={i} className="col-span-12 md:col-span-3 glass-card rounded-sm p-6 hover:shadow-lg transition-all relative overflow-hidden">
<div className={`absolute top-0 right-0 w-24 h-24 bg-${node.color}/5 blur-3xl -mr-12 -mt-12`}></div>
<div className="flex items-center justify-between mb-5 z-10 relative">
<div className="flex items-center gap-3">
<div className={`p-2.5 rounded-sm bg-${node.color}/10 border border-${node.color}/20`}>
<span className={`material-symbols-outlined text-${node.color} text-[20px]`}>{node.icon}</span>
</div>
<div>
<span className="font-data-mono text-[10px] text-on-surface tracking-wider block">{node.label}</span>
<span className="font-data-mono text-[9px] text-on-surface-variant/50">{node.ip}</span>
</div>
</div>
<span className={`px-2 py-0.5 rounded-sm font-data-mono text-[8px] uppercase tracking-widest border ${node.status === 'ONLINE' ? 'text-primary-fixed-dim bg-primary-fixed-dim/10 border-primary-fixed-dim/30' : 'text-error bg-error/10 border-error/30 animate-pulse'}`}>{node.status}</span>
</div>
<div className="space-y-4 z-10 relative">
<div className="space-y-1.5">
<div className="flex justify-between font-data-mono text-[10px]">
<span className="text-on-surface-variant tracking-wider">CPU</span>
<span className={node.cpu > 80 ? 'text-error' : 'text-secondary-fixed-dim'}>{node.cpu}%</span>
</div>
<div className="h-1 w-full bg-surface-variant/30 rounded-full overflow-hidden">
<div className={`h-full rounded-full transition-all ${node.cpu > 80 ? 'bg-error shadow-[0_0_8px_rgba(255,180,171,0.4)]' : 'bg-secondary-fixed-dim shadow-[0_0_8px_rgba(0,218,243,0.2)]'}`} style={{ width: `${node.cpu}%` }}></div>
</div>
</div>
<div className="space-y-1.5">
<div className="flex justify-between font-data-mono text-[10px]">
<span className="text-on-surface-variant tracking-wider">MEM</span>
<span className={node.mem > 85 ? 'text-error' : 'text-on-surface'}>{node.mem}%</span>
</div>
<div className="h-1 w-full bg-surface-variant/30 rounded-full overflow-hidden">
<div className={`h-full rounded-full transition-all ${node.mem > 85 ? 'bg-gradient-to-r from-error/60 to-error shadow-[0_0_8px_rgba(255,180,171,0.3)]' : 'bg-gradient-to-r from-secondary-fixed-dim/40 to-secondary-fixed-dim'}`} style={{ width: `${node.mem}%` }}></div>
</div>
</div>
<div className="space-y-1.5">
<div className="flex justify-between font-data-mono text-[10px]">
<span className="text-on-surface-variant tracking-wider">TEMP</span>
<span className={node.temp > 60 ? 'text-error' : 'text-primary-fixed-dim'}>{node.temp}°C</span>
</div>
<div className="h-1 w-full bg-surface-variant/30 rounded-full overflow-hidden">
<div className={`h-full rounded-full transition-all ${node.temp > 60 ? 'bg-error' : 'bg-primary-fixed-dim shadow-[0_0_8px_rgba(0,227,138,0.2)]'}`} style={{ width: `${node.temp}%` }}></div>
</div>
</div>
</div>
</div>
))}

{/* Response Time Chart */}
<div className="col-span-12 md:col-span-8 glass-card rounded-sm p-8 h-[400px] flex flex-col relative">
<div className="flex justify-between items-center mb-8 z-10">
<div className="flex items-center gap-6">
<h3 className="font-display-lg text-xl tracking-tight text-on-surface uppercase">API Response Latency</h3>
<div className="flex bg-surface-variant/30 p-1 rounded-sm border border-outline-variant/10">
<button className="px-4 py-1 font-data-mono text-[10px] text-on-surface-variant hover:text-on-surface transition-colors">1H</button>
<button className="px-4 py-1 font-data-mono text-[10px] bg-secondary-fixed-dim text-on-primary-fixed rounded-sm shadow-[0_0_10px_rgba(0,218,243,0.4)]">6H</button>
<button className="px-4 py-1 font-data-mono text-[10px] text-on-surface-variant hover:text-on-surface transition-colors">24H</button>
</div>
</div>
<div className="flex gap-6 font-data-mono">
<div className="flex items-center gap-2">
<div className="w-4 h-[2px] bg-primary-fixed-dim shadow-[0_0_4px_#00e38a]"></div>
<span className="text-[10px] text-on-surface-variant uppercase">Inference</span>
</div>
<div className="flex items-center gap-2">
<div className="w-4 h-[2px] bg-secondary-fixed-dim shadow-[0_0_4px_#00daf3]"></div>
<span className="text-[10px] text-on-surface-variant uppercase">Gateway</span>
</div>
</div>
</div>
<div className="flex-1 relative ml-10 mb-8 border-l border-b border-outline-variant/10">
<svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 250">
<defs>
<linearGradient id="green-area" x1="0" x2="0" y1="0" y2="1">
<stop offset="0%" stopColor="#00e38a" stopOpacity="0.15" />
<stop offset="100%" stopColor="#00e38a" stopOpacity="0.01" />
</linearGradient>
<linearGradient id="cyan-area" x1="0" x2="0" y1="0" y2="1">
<stop offset="0%" stopColor="#00daf3" stopOpacity="0.1" />
<stop offset="100%" stopColor="#00daf3" stopOpacity="0.01" />
</linearGradient>
</defs>
<g stroke="rgba(132,149,135,0.05)" strokeWidth="1">
{[62.5, 125, 187.5].map(y => <line key={y} x1="0" y1={y} x2="1000" y2={y} />)}
</g>
{/* Inference line */}
<path d="M0,200 L100,190 L200,195 L300,180 L400,185 L500,170 L600,175 L700,160 L800,165 L900,155 L1000,150" fill="url(#green-area)" stroke="none" />
<path d="M0,200 L100,190 L200,195 L300,180 L400,185 L500,170 L600,175 L700,160 L800,165 L900,155 L1000,150" fill="none" stroke="#00e38a" strokeWidth="2" filter="drop-shadow(0 0 4px rgba(0,227,138,0.6))" />
{/* Gateway line */}
<path d="M0,220 L100,215 L200,218 L300,210 L400,212 L500,205 L600,208 L700,200 L800,195 L900,198 L1000,190" fill="url(#cyan-area)" stroke="none" />
<path d="M0,220 L100,215 L200,218 L300,210 L400,212 L500,205 L600,208 L700,200 L800,195 L900,198 L1000,190" fill="none" stroke="#00daf3" strokeWidth="1.5" strokeDasharray="6 3" />
{/* Data points */}
{[[100,190],[300,180],[500,170],[700,160],[900,155]].map(([cx,cy], idx) => (
<g key={idx}>
<circle cx={cx} cy={cy} r="3" fill="#00e38a" filter="drop-shadow(0 0 4px #00e38a)" />
<circle cx={cx} cy={cy} r="6" fill="#00e38a" opacity="0.15" />
</g>
))}
</svg>
<div className="absolute -left-10 top-0 h-full flex flex-col justify-between font-data-mono text-[9px] text-on-surface-variant/50 py-1">
<span>40ms</span><span>30ms</span><span>20ms</span><span>10ms</span><span>0</span>
</div>
<div className="absolute -bottom-6 left-0 w-full flex justify-between font-data-mono text-[9px] text-on-surface-variant/50">
{['03:00','04:00','05:00','06:00','07:00','08:00','09:00'].map(t => <span key={t}>{t}</span>)}
</div>
</div>
<div className="flex gap-8 mt-2 z-10 pt-4 border-t border-outline-variant/15">
<div className="space-y-1">
<span className="font-data-mono text-[9px] text-on-surface-variant tracking-widest">AVG_LATENCY</span>
<div className="flex items-baseline gap-1">
<span className="font-display-lg text-xl text-on-surface">12.4</span>
<span className="text-[10px] text-on-surface-variant">ms</span>
<span className="text-primary-fixed-dim text-[10px] font-data-mono ml-2">▼ 1.2ms</span>
</div>
</div>
<div className="space-y-1">
<span className="font-data-mono text-[9px] text-on-surface-variant tracking-widest">P99_LATENCY</span>
<div className="flex items-baseline gap-1">
<span className="font-display-lg text-xl text-on-surface">28.7</span>
<span className="text-[10px] text-on-surface-variant">ms</span>
</div>
</div>
<div className="space-y-1">
<span className="font-data-mono text-[9px] text-on-surface-variant tracking-widest">ERROR_RATE</span>
<div className="flex items-baseline gap-1">
<span className="font-display-lg text-xl text-primary-fixed-dim">0.001</span>
<span className="text-[10px] text-on-surface-variant">%</span>
</div>
</div>
</div>
</div>

{/* Service Status Panel */}
<div className="col-span-12 md:col-span-4 glass-card rounded-sm p-6 h-[400px] flex flex-col">
<div className="flex items-center justify-between mb-6">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-primary-fixed-dim text-[20px]">checklist</span>
<h3 className="font-display-lg text-lg tracking-tight text-on-surface uppercase">Service Status</h3>
</div>
<span className="font-data-mono text-[9px] text-primary-fixed-dim tracking-wider">11/12 UP</span>
</div>
<div className="space-y-2 flex-1 overflow-y-auto pr-2 custom-scrollbar">
{[
  { name: 'Object Detection Engine', status: 'RUNNING', latency: '14ms', uptime: '99.99%' },
  { name: 'Face Recognition Module', status: 'RUNNING', latency: '22ms', uptime: '99.95%' },
  { name: 'License Plate Reader', status: 'RUNNING', latency: '8ms', uptime: '99.98%' },
  { name: 'Thermal Analysis Pipeline', status: 'RUNNING', latency: '31ms', uptime: '99.92%' },
  { name: 'Alert Dispatch Service', status: 'RUNNING', latency: '5ms', uptime: '99.99%' },
  { name: 'Video Encoder (H.265)', status: 'RUNNING', latency: '45ms', uptime: '99.87%' },
  { name: 'Anomaly Scoring Engine', status: 'RUNNING', latency: '18ms', uptime: '99.96%' },
  { name: 'Geo-Fence Controller', status: 'RUNNING', latency: '3ms', uptime: '99.99%' },
  { name: 'Backup Sync Daemon', status: 'RUNNING', latency: '120ms', uptime: '99.80%' },
  { name: 'Audit Logger', status: 'RUNNING', latency: '2ms', uptime: '100%' },
  { name: 'Model Update Service', status: 'RUNNING', latency: '85ms', uptime: '99.91%' },
  { name: 'Cloud Relay (West)', status: 'DOWN', latency: '—', uptime: '98.40%' },
].map((svc, i) => (
<div key={i} className={`flex items-center justify-between p-3 rounded-sm border transition-all hover:bg-surface-variant/15 ${svc.status === 'DOWN' ? 'border-error/25 bg-error/5' : 'border-outline-variant/8'}`}>
<div className="flex items-center gap-3">
<div className={`w-2 h-2 rounded-full ${svc.status === 'DOWN' ? 'bg-error shadow-[0_0_8px_#ffb4ab] animate-pulse' : 'bg-primary-fixed-dim shadow-[0_0_4px_#00e38a]'}`}></div>
<div>
<span className={`font-data-mono text-[10px] block ${svc.status === 'DOWN' ? 'text-error' : 'text-on-surface/80'}`}>{svc.name}</span>
<span className="font-data-mono text-[8px] text-on-surface-variant/50">{svc.latency} · {svc.uptime}</span>
</div>
</div>
<span className={`font-data-mono text-[8px] uppercase tracking-wider ${svc.status === 'DOWN' ? 'text-error' : 'text-primary-fixed-dim/60'}`}>{svc.status}</span>
</div>
))}
</div>
</div>

{/* Network & Connectivity */}
<div className="col-span-12 md:col-span-6 glass-card rounded-sm p-8">
<div className="flex items-center gap-4 mb-8">
<div className="w-2 h-8 bg-secondary-fixed-dim shadow-[0_0_10px_#00daf3]"></div>
<div>
<h3 className="font-display-lg text-xl tracking-tight text-on-surface uppercase">Network Topology</h3>
<p className="font-data-mono text-[10px] text-on-surface-variant tracking-widest mt-0.5">MESH_STATUS · 4 NODES ACTIVE</p>
</div>
</div>
<div className="relative py-4">
<svg viewBox="0 0 500 200" className="w-full h-auto">
{/* Connection lines */}
<line x1="250" y1="40" x2="100" y2="140" stroke="#00daf3" strokeWidth="1" opacity="0.4" strokeDasharray="4 3" />
<line x1="250" y1="40" x2="250" y2="160" stroke="#00e38a" strokeWidth="1" opacity="0.4" />
<line x1="250" y1="40" x2="400" y2="140" stroke="#00daf3" strokeWidth="1" opacity="0.4" strokeDasharray="4 3" />
<line x1="100" y1="140" x2="250" y2="160" stroke="#00e38a" strokeWidth="0.5" opacity="0.25" />
<line x1="400" y1="140" x2="250" y2="160" stroke="#00e38a" strokeWidth="0.5" opacity="0.25" />
{/* Core node */}
<circle cx="250" cy="40" r="18" fill="rgba(0,227,138,0.1)" stroke="#00e38a" strokeWidth="1.5" />
<text x="250" y="44" fill="#00e38a" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">CORE</text>
{/* Edge nodes */}
<circle cx="100" cy="140" r="15" fill="rgba(0,218,243,0.08)" stroke="#00daf3" strokeWidth="1" />
<text x="100" y="143" fill="#00daf3" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle">EDGE1</text>
<circle cx="250" cy="160" r="15" fill="rgba(0,218,243,0.08)" stroke="#00daf3" strokeWidth="1" />
<text x="250" y="163" fill="#00daf3" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle">STORE</text>
<circle cx="400" cy="140" r="15" fill="rgba(255,180,171,0.1)" stroke="#ffb4ab" strokeWidth="1" strokeDasharray="3 2" />
<text x="400" y="143" fill="#ffb4ab" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle">RELAY</text>
{/* Animated pulse along connections */}
<circle r="2" fill="#00e38a" opacity="0.8">
<animateMotion dur="3s" repeatCount="indefinite" path="M250,40 L250,160" />
</circle>
<circle r="2" fill="#00daf3" opacity="0.8">
<animateMotion dur="4s" repeatCount="indefinite" path="M250,40 L100,140" />
</circle>
</svg>
</div>
<div className="grid grid-cols-3 gap-4 mt-4">
{[
  { label: 'BANDWIDTH', value: '9.2 Gbps', color: 'text-secondary-fixed-dim' },
  { label: 'PACKET_LOSS', value: '0.001%', color: 'text-primary-fixed-dim' },
  { label: 'JITTER', value: '0.4 ms', color: 'text-on-surface' },
].map((m, i) => (
<div key={i} className="text-center space-y-1 p-3 bg-surface-container-highest/20 rounded-sm border border-outline-variant/10">
<span className="font-data-mono text-[9px] text-on-surface-variant tracking-widest block">{m.label}</span>
<span className={`font-data-mono text-sm ${m.color}`}>{m.value}</span>
</div>
))}
</div>
</div>

{/* System Log Stream */}
<div className="col-span-12 md:col-span-6 glass-card rounded-sm p-8 mb-10">
<div className="flex items-center justify-between mb-6">
<div className="flex items-center gap-4">
<div className="w-2 h-8 bg-primary-fixed-dim shadow-[0_0_10px_#00e38a]"></div>
<div>
<h3 className="font-display-lg text-xl tracking-tight text-on-surface uppercase">System Log</h3>
<p className="font-data-mono text-[10px] text-on-surface-variant tracking-widest mt-0.5">REAL_TIME · KERNEL + APP LEVEL</p>
</div>
</div>
<div className="flex items-center gap-2">
<div className="w-1.5 h-1.5 bg-primary-fixed-dim rounded-full animate-pulse"></div>
<span className="font-data-mono text-[9px] text-primary-fixed-dim tracking-wider">LIVE</span>
</div>
</div>
<div className="bg-surface-container-lowest/70 border border-outline-variant/10 rounded-sm p-4 font-data-mono text-[11px] leading-relaxed max-h-[260px] overflow-y-auto custom-scrollbar space-y-1.5">
{[
  { time: '08:52:31.442', level: 'INFO', msg: '[inference] batch processed — 48 frames, avg 12.4ms', color: 'text-on-surface/70' },
  { time: '08:52:30.118', level: 'INFO', msg: '[gateway] health-check passed: all endpoints 200 OK', color: 'text-on-surface/70' },
  { time: '08:52:28.901', level: 'WARN', msg: '[relay-west] connection timeout — retry 3/5 in 30s', color: 'text-error' },
  { time: '08:52:27.334', level: 'INFO', msg: '[encoder] H.265 stream stable — bitrate 4.2Mbps', color: 'text-on-surface/70' },
  { time: '08:52:25.887', level: 'INFO', msg: '[detector] model v4.2.1 — confidence threshold: 0.82', color: 'text-on-surface/70' },
  { time: '08:52:24.102', level: 'DEBUG', msg: '[geofence] zone CHARLIE boundary updated +2m', color: 'text-on-surface-variant/50' },
  { time: '08:52:22.556', level: 'INFO', msg: '[thermal] pipeline latency within SLA — 31ms p50', color: 'text-on-surface/70' },
  { time: '08:52:20.019', level: 'WARN', msg: '[network-core] memory usage elevated — 92% utilized', color: 'text-error' },
  { time: '08:52:18.443', level: 'INFO', msg: '[audit] operator_01 session heartbeat — active', color: 'text-on-surface/70' },
  { time: '08:52:16.887', level: 'INFO', msg: '[sync] backup delta snapshot completed — 2.4GB', color: 'text-on-surface/70' },
  { time: '08:52:14.220', level: 'DEBUG', msg: '[core] GC cycle completed — heap: 812MB/1024MB', color: 'text-on-surface-variant/50' },
  { time: '08:52:12.001', level: 'INFO', msg: '[faces] enrollment DB sync — 12,847 entries current', color: 'text-on-surface/70' },
].map((log, i) => (
<div key={i} className="flex gap-3">
<span className="text-secondary-fixed-dim/60 shrink-0">{log.time}</span>
<span className={`shrink-0 w-12 ${log.level === 'WARN' ? 'text-error' : log.level === 'DEBUG' ? 'text-on-surface-variant/40' : 'text-primary-fixed-dim/60'}`}>{log.level}</span>
<span className={log.color}>{log.msg}</span>
</div>
))}
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
