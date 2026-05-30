import React from 'react';
import { useGlobalState } from '../GlobalState';
import { Link, useNavigate } from 'react-router-dom';

export function StrategicAnalytics() {
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
        .active-glow {
            box-shadow: 0 0 15px rgba(0, 227, 138, 0.15);
            border-color: rgba(0, 227, 138, 0.5);
        }
        .holographic-line {
            filter: drop-shadow(0 0 8px rgba(0, 218, 243, 0.8));
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
        .segment-bar {
            background-image: repeating-linear-gradient(90deg, #00daf3, #00daf3 1px, transparent 1px, transparent 3px);
        }
        .cyan-glow {
            filter: drop-shadow(0 0 6px rgba(0, 218, 243, 0.5));
        }
        .grid-pixel {
            transition: all 0.3s ease;
        }
        .grid-pixel:hover {
            transform: scale(1.1);
            z-index: 10;
            box-shadow: 0 0 10px currentColor;
        }
        .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(255,255,255,0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(132, 149, 135, 0.3);
            border-radius: 2px;
        }
    ` }} />
      





<main className="ml-20 mt-16 p-8 h-[calc(100vh-64px)] overflow-y-auto overflow-x-hidden custom-scrollbar">
<div className="grid grid-cols-12 gap-gutter max-w-[1700px] mx-auto">

<div className="col-span-12 md:col-span-8 glass-card rounded-sm p-8 relative overflow-hidden flex flex-col min-h-[350px]">
<div className="scan-line"></div>
<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,218,243,0.05),transparent_70%)]"></div>
<div className="flex justify-between items-start z-10">
<div className="space-y-1">
<div className="flex items-center gap-3">
<div className="w-4 h-[2px] bg-secondary-fixed-dim shadow-[0_0_8px_#00daf3]"></div>
<span className="font-data-mono text-[11px] text-secondary-fixed-dim/80 uppercase tracking-[0.3em]">Neural Integrity Diagnostic</span>
</div>
<h2 className="font-display-lg text-4xl text-on-surface flex items-baseline gap-3 mt-2">
                        99.8<span className="text-secondary-fixed-dim text-xl font-data-mono">%</span>
<span className="text-sm font-data-mono text-primary-fixed-dim animate-pulse ml-2">[OPTIMAL]</span>
</h2>
</div>
<div className="text-right font-data-mono space-y-1">
<div className="flex flex-col items-end">
<span className="text-[10px] text-on-surface-variant tracking-widest">UPTIME</span>
<span className="text-secondary-fixed-dim text-lg">432:12:08</span>
</div>
</div>
</div>
<div className="flex-1 mt-10 flex items-end gap-2 z-10 h-40">


</div>
<div className="grid grid-cols-3 gap-10 mt-10 z-10 pt-8 border-t border-outline-variant/20">
<div className="space-y-1">
<span className="font-data-mono text-[10px] text-on-surface-variant uppercase tracking-widest">Processing Latency</span>
<div className="flex items-baseline gap-2">
<span className="font-display-lg text-2xl text-on-surface">14.02<span className="text-xs ml-1 text-on-surface-variant">ms</span></span>
<span className="text-primary-fixed-dim text-[10px] font-data-mono flex items-center"><span className="material-symbols-outlined text-[12px]">arrow_drop_down</span> 2ms</span>
</div>
</div>
<div className="space-y-1">
<span className="font-data-mono text-[10px] text-on-surface-variant uppercase tracking-widest">FPR Deviation</span>
<div className="flex items-baseline gap-2">
<span className="font-display-lg text-2xl text-on-surface">0.002<span className="text-xs ml-1 text-on-surface-variant">%</span></span>
<span className="text-secondary-fixed-dim text-[10px] font-data-mono uppercase tracking-tighter">Minimal</span>
</div>
</div>
<div className="space-y-1">
<span className="font-data-mono text-[10px] text-on-surface-variant uppercase tracking-widest">Active Neural Nodes</span>
<div className="flex items-baseline gap-2">
<span className="font-display-lg text-2xl text-on-surface">8,192</span>
<span className="text-primary-fixed-dim text-[10px] font-data-mono">SCALED</span>
</div>
</div>
</div>
</div>

<div className="col-span-12 md:col-span-4 glass-card rounded-sm p-8 flex flex-col justify-between overflow-hidden relative">
<div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 blur-3xl -mr-16 -mt-16"></div>
<div>
<div className="flex justify-between items-center mb-8">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-secondary-fixed-dim text-[20px]">hardware</span>
<h3 className="font-display-lg text-xl tracking-tight text-on-surface uppercase">Telemetry</h3>
</div>
<span className="material-symbols-outlined text-on-surface-variant/40 hover:text-secondary-fixed-dim transition-colors cursor-pointer">settings_suggest</span>
</div>
<div className="space-y-8">

<div className="space-y-3">
<div className="flex justify-between items-baseline font-data-mono">
<span className="text-[11px] text-on-surface-variant tracking-wider uppercase">GPU_CORE_LOAD</span>
<span className="text-secondary-fixed-dim text-sm">74.2%</span>
</div>
<div className="h-1.5 w-full bg-surface-variant/30 rounded-full overflow-hidden">
<div className="h-full w-[74%] segment-bar shadow-[0_0_10px_rgba(0,218,243,0.3)]"></div>
</div>
</div>

<div className="space-y-3">
<div className="flex justify-between items-baseline font-data-mono">
<span className="text-[11px] text-on-surface-variant tracking-wider uppercase">MEM_ALLOC_OFFSET</span>
<span className="text-on-surface text-sm">12.4 <span className="text-[10px] text-on-surface-variant">GB</span></span>
</div>
<div className="h-1.5 w-full bg-surface-variant/30 rounded-full overflow-hidden">
<div className="h-full w-[82%] bg-gradient-to-r from-secondary-fixed-dim/40 to-secondary-fixed-dim shadow-[0_0_8px_rgba(0,218,243,0.2)]"></div>
</div>
</div>

<div className="space-y-3">
<div className="flex justify-between items-baseline font-data-mono">
<span className="text-[11px] text-on-surface-variant tracking-wider uppercase">THERMAL_THRESHOLD</span>
<span className="text-primary-fixed-dim text-sm">42°C</span>
</div>
<div className="h-1.5 w-full bg-surface-variant/30 rounded-full overflow-hidden">
<div className="h-full w-[42%] bg-primary-fixed-dim shadow-[0_0_8px_rgba(0,227,138,0.3)]"></div>
</div>
</div>
</div>
</div>
<div className="bg-surface-container-highest/40 border border-outline-variant/10 p-5 rounded-sm mt-10 backdrop-blur-md">
<div className="flex items-center gap-4">
<div className="p-3 bg-primary-fixed-dim/10 rounded-sm border border-primary-fixed-dim/20">
<span className="material-symbols-outlined text-primary-fixed-dim text-[18px]">bolt</span>
</div>
<div className="flex-1">
<span className="block font-data-mono text-[9px] text-on-surface-variant tracking-widest">PWR_EFFICIENCY</span>
<span className="block font-data-mono text-sm text-primary-fixed-dim mt-0.5">285.4W <span className="text-[10px] opacity-60">[-12% PK]</span></span>
</div>
<div className="h-8 w-px bg-outline-variant/20"></div>
<span className="material-symbols-outlined text-primary-fixed-dim animate-pulse">auto_awesome</span>
</div>
</div>
</div>

<div className="col-span-12 md:col-span-9 glass-card rounded-sm p-8 h-[450px] flex flex-col relative">
<div className="flex justify-between items-center mb-10 z-10">
<div className="flex items-center gap-6">
<h3 className="font-display-lg text-xl tracking-tight text-on-surface uppercase">Detection Frequency</h3>
<div className="flex bg-surface-variant/30 p-1 rounded-sm border border-outline-variant/10">
<button className="px-4 py-1 font-data-mono text-[10px] text-on-surface-variant hover:text-on-surface transition-colors">24H</button>
<button className="px-4 py-1 font-data-mono text-[10px] bg-secondary-fixed-dim text-on-primary-fixed rounded-sm shadow-[0_0_10px_rgba(0,218,243,0.4)]">7D</button>
<button className="px-4 py-1 font-data-mono text-[10px] text-on-surface-variant hover:text-on-surface transition-colors">30D</button>
</div>
</div>
<div className="flex gap-6 font-data-mono">
<div className="flex items-center gap-2">
<span className="w-1.5 h-1.5 rounded-full bg-error shadow-[0_0_8px_#ffb4ab]"></span>
<span className="text-[10px] text-on-surface-variant uppercase tracking-widest">Anomalies</span>
</div>
<div className="flex items-center gap-2">
<span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed-dim shadow-[0_0_8px_#00daf3]"></span>
<span className="text-[10px] text-on-surface-variant uppercase tracking-widest">Resolved</span>
</div>
</div>
</div>
<div className="flex-1 relative ml-12 mb-10 border-l border-b border-outline-variant/10">

<svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 300">
<defs>
<linearGradient id="cyan-grad" x1="0" x2="0" y1="0" y2="1">
<stop offset="0%" stopColor="#00daf3" stopOpacity="0.8"></stop>
<stop offset="100%" stopColor="#00daf3" stopOpacity="0.1"></stop>
</linearGradient>
<filter id="glow">
<feGaussianBlur result="blur" stdDeviation="3"></feGaussianBlur>
<feComposite in="SourceGraphic" in2="blur" operator="over"></feComposite>
</filter>
</defs>

<g stroke="rgba(132, 149, 135, 0.05)" strokeWidth="1">
<line x1="0" x2="1000" y1="75" y2="75"></line>
<line x1="0" x2="1000" y1="150" y2="150"></line>
<line x1="0" x2="1000" y1="225" y2="225"></line>

</g>

<path className="holographic-line" d="M0,80 L100,120 L200,100 L300,180 L400,150 L500,220 L600,190 L700,240 L800,210 L900,260 L1000,240" fill="none" filter="url(#glow)" stroke="#00daf3" strokeWidth="2.5"></path>

<path d="M0,280 L100,260 L200,290 L300,270 L400,285 L500,275 L600,288 L700,282 L800,295 L900,290 L1000,298" fill="none" stroke="#ffb4ab" strokeDasharray="4 2" strokeWidth="1.5"></path>


</svg>
<div className="absolute -left-12 top-0 h-full flex flex-col justify-between font-data-mono text-[9px] text-on-surface-variant/50 py-1">
<span>100</span>
<span>75</span>
<span>50</span>
<span>25</span>
<span>0</span>
</div>
<div className="absolute -bottom-8 left-0 w-full flex justify-between font-data-mono text-[9px] text-on-surface-variant/50">
<span>MON</span>
<span>TUE</span>
<span>WED</span>
<span>THU</span>
<span>FRI</span>
<span>SAT</span>
<span>SUN</span>
</div>
</div>
</div>

<div className="col-span-12 md:col-span-3 glass-card rounded-sm p-8 flex flex-col h-[450px]">
<div className="flex items-center gap-3 mb-10">
<span className="material-symbols-outlined text-primary-fixed-dim">category</span>
<h3 className="font-display-lg text-xl tracking-tight text-on-surface uppercase">Classification</h3>
</div>
<div className="space-y-7 flex-1 overflow-y-auto pr-3 custom-scrollbar">
<div className="flex justify-between items-center group cursor-pointer p-2 -mx-2 hover:bg-surface-variant/20 rounded-sm transition-all border border-transparent hover:border-outline-variant/10">
<div className="flex items-center gap-4">
<div className="w-10 h-10 flex items-center justify-center rounded bg-surface-variant/40 group-hover:bg-primary-fixed-dim/20 transition-colors">
<span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary-fixed-dim">person</span>
</div>
<div className="flex flex-col">
<span className="font-data-mono text-[11px] text-on-surface tracking-wider">PERSONNEL</span>
<span className="font-data-mono text-[9px] text-on-surface-variant uppercase">Biometric Verified</span>
</div>
</div>
<span className="font-data-mono text-sm text-primary-fixed-dim font-bold">99.9<span className="text-[10px] ml-0.5">%</span></span>
</div>
<div className="flex justify-between items-center group cursor-pointer p-2 -mx-2 hover:bg-surface-variant/20 rounded-sm transition-all border border-transparent hover:border-outline-variant/10">
<div className="flex items-center gap-4">
<div className="w-10 h-10 flex items-center justify-center rounded bg-surface-variant/40 group-hover:bg-primary-fixed-dim/20 transition-colors">
<span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary-fixed-dim">directions_car</span>
</div>
<div className="flex flex-col">
<span className="font-data-mono text-[11px] text-on-surface tracking-wider">VEHICLES</span>
<span className="font-data-mono text-[9px] text-on-surface-variant uppercase">Plate Recognition</span>
</div>
</div>
<span className="font-data-mono text-sm text-primary-fixed-dim font-bold">98.4<span className="text-[10px] ml-0.5">%</span></span>
</div>
<div className="flex justify-between items-center group cursor-pointer p-2 -mx-2 hover:bg-surface-variant/20 rounded-sm transition-all border border-transparent hover:border-outline-variant/10">
<div className="flex items-center gap-4">
<div className="w-10 h-10 flex items-center justify-center rounded bg-surface-variant/40 group-hover:bg-secondary-fixed-dim/20 transition-colors">
<span className="material-symbols-outlined text-on-surface-variant group-hover:text-secondary-fixed-dim">work</span>
</div>
<div className="flex flex-col">
<span className="font-data-mono text-[11px] text-on-surface tracking-wider">UNATTENDED_OBJ</span>
<span className="font-data-mono text-[9px] text-on-surface-variant uppercase">Heat Signal Low</span>
</div>
</div>
<span className="font-data-mono text-sm text-secondary-fixed-dim font-bold">94.1<span className="text-[10px] ml-0.5">%</span></span>
</div>
<div className="flex justify-between items-center group cursor-pointer p-2 -mx-2 hover:bg-surface-variant/20 rounded-sm transition-all border border-transparent hover:border-outline-variant/10">
<div className="flex items-center gap-4">
<div className="w-10 h-10 flex items-center justify-center rounded bg-surface-variant/40 group-hover:bg-on-surface-variant/20 transition-colors">
<span className="material-symbols-outlined text-on-surface-variant">forest</span>
</div>
<div className="flex flex-col">
<span className="font-data-mono text-[11px] text-on-surface tracking-wider">ENV_FLORA</span>
<span className="font-data-mono text-[9px] text-on-surface-variant uppercase">Noise Filtered</span>
</div>
</div>
<span className="font-data-mono text-sm text-on-surface-variant font-bold">82.3<span className="text-[10px] ml-0.5">%</span></span>
</div>
</div>
<button className="mt-8 w-full py-4 bg-surface-variant/20 border border-outline-variant/20 hover:border-primary-fixed-dim hover:text-primary-fixed-dim transition-all text-on-surface-variant font-data-mono text-[10px] uppercase tracking-[0.2em] relative group overflow-hidden">
<div className="absolute inset-0 bg-primary-fixed-dim/0 group-hover:bg-primary-fixed-dim/5 transition-colors"></div>
<span className="relative z-10">Initialize Retraining Suite</span>
</button>
</div>

<div className="col-span-12 glass-card rounded-sm p-8 mb-10 overflow-hidden relative">
<div className="flex items-center justify-between mb-8">
<div className="flex items-center gap-4">
<div className="w-2 h-8 bg-primary-fixed-dim shadow-[0_0_10px_#00e38a]"></div>
<div>
<h3 className="font-display-lg text-xl tracking-tight text-on-surface uppercase">Hardware Sensor Mesh</h3>
<p className="font-data-mono text-[10px] text-on-surface-variant tracking-widest mt-0.5">GRID_REF: AREA_ALPHA_IX_V2</p>
</div>
</div>
<div className="flex gap-8 font-data-mono">
<div className="flex items-center gap-3">
<div className="w-3 h-3 bg-primary-fixed-dim rounded-sm shadow-[0_0_8px_#00e38a]"></div>
<span className="text-[10px] text-on-surface-variant uppercase">Operational</span>
</div>
<div className="flex items-center gap-3">
<div className="w-3 h-3 bg-error rounded-sm shadow-[0_0_8px_#ffb4ab]"></div>
<span className="text-[10px] text-on-surface-variant uppercase">Manual Bypass</span>
</div>
<div className="flex items-center gap-3">
<div className="w-3 h-3 bg-surface-variant rounded-sm"></div>
<span className="text-[10px] text-on-surface-variant uppercase">Standby</span>
</div>
</div>
</div>
<div className="grid grid-cols-4 md:grid-cols-12 lg:grid-cols-24 gap-1.5 p-1 bg-surface-container-lowest/50 border border-outline-variant/10 rounded-sm">


</div>
<div className="mt-6 flex justify-between items-center px-2">
<div className="flex gap-4">
<span className="font-data-mono text-[9px] text-on-surface-variant uppercase">Sync Rate: 1.2GHZ</span>
<span className="font-data-mono text-[9px] text-on-surface-variant uppercase">Packet Loss: 0.00%</span>
</div>
<div className="flex items-center gap-2">
<span className="font-data-mono text-[9px] text-primary-fixed-dim uppercase tracking-tighter">Self-Healing Protocol Active</span>
<span className="material-symbols-outlined text-[14px] text-primary-fixed-dim animate-spin">sync</span>
</div>
</div>
</div>
</div>
</main>

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
