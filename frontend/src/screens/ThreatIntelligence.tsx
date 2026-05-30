import React from 'react';
import { useGlobalState } from '../GlobalState';
import { Link, useNavigate } from 'react-router-dom';

export function ThreatIntelligence() {
  const { addToast, setLockdown, openModal } = useGlobalState();
  const navigate = useNavigate();
  return (
    <>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .pulse-red {
            animation: pulse-red 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse-red {
            0%, 100% { border-color: rgba(199, 4, 26, 0.3); box-shadow: inset 0 0 10px rgba(199, 4, 26, 0.2); }
            50% { border-color: rgba(199, 4, 26, 1); box-shadow: inset 0 0 20px rgba(199, 4, 26, 0.5), 0 0 15px rgba(199, 4, 26, 0.3); }
        }
        .scanline {
            width: 100%;
            height: 2px;
            background: linear-gradient(to right, transparent, #00e38a, transparent);
            position: absolute;
            top: 0;
            animation: scan 4s linear infinite;
            opacity: 0.15;
            z-index: 20;
        }
        @keyframes scan {
            0% { top: 0; }
            100% { top: 100%; }
        }
        .bento-grid {
            display: grid;
            grid-template-columns: repeat(12, 1fr);
            gap: 12px;
        }
        .glass-panel {
            backdrop-filter: blur(20px);
            background: rgba(16, 20, 23, 0.7);
            border: 1px solid rgba(132, 149, 135, 0.15);
        }
        .neon-edge-red {
            box-shadow: 0 0 10px -2px rgba(199, 4, 26, 0.5);
            border-left: 4px solid #c7041a;
        }
        .neon-edge-cyan {
            box-shadow: 0 0 10px -2px rgba(0, 218, 243, 0.5);
            border-left: 4px solid #00daf3;
        }
        .map-ping {
            position: absolute;
            width: 12px;
            height: 12px;
            background: #c7041a;
            border-radius: 50%;
            transform: translate(-50%, -50%);
        }
        .map-ping::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: inherit;
            animation: ping-expand 2s ease-out infinite;
        }
        @keyframes ping-expand {
            0% { transform: scale(1); opacity: 0.8; }
            100% { transform: scale(4); opacity: 0; }
        }
        .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.1);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(132, 149, 135, 0.3);
            border-radius: 2px;
        }
    ` }} />
      





<main className="ml-20 mt-16 p-6 min-h-screen pb-12">
<div className="max-w-[1700px] mx-auto">

<div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
<div>
<div className="flex items-center gap-3 mb-2">
<span className="w-3 h-3 rounded-full bg-on-tertiary-container animate-pulse shadow-[0_0_10px_#c7041a]"></span>
<h2 className="font-headline-lg text-headline-lg text-on-surface uppercase tracking-widest">Global_Threat_Monitor</h2>
</div>
<p className="font-data-mono text-label-sm text-on-surface-variant flex items-center gap-2">
<span className="text-primary-fixed-dim">ONLINE</span> // SIGINT STREAM ACTIVE // ENCRYPTION: AES-512
                </p>
</div>
<div className="flex gap-4">
<div className="glass-panel px-6 py-3 border-l-4 border-l-on-tertiary-container shadow-[0_0_20px_rgba(199,4,26,0.1)]">
<span className="font-data-mono text-[10px] text-on-tertiary-container font-bold tracking-widest block mb-1">ACTIVE_ALERTS</span>
<span className="font-headline-md text-on-surface">14</span>
</div>
<div className="glass-panel px-6 py-3 border-l-4 border-l-primary-fixed-dim shadow-[0_0_20px_rgba(0,227,138,0.1)]">
<span className="font-data-mono text-[10px] text-primary-fixed-dim font-bold tracking-widest block mb-1">SYSTEM_CONFIDENCE</span>
<span className="font-headline-md text-on-surface">99.2%</span>
</div>
</div>
</div>
<div className="bento-grid">

<div className="col-span-12 lg:col-span-4 flex flex-col gap-3">
<div className="flex items-center justify-between px-2 mb-1">
<span className="font-data-mono text-label-sm text-on-surface-variant uppercase tracking-tighter">Queue: Sector_Delta</span>
<div className="flex gap-1">
<button className="bg-surface-container-high px-3 py-1 text-[10px] font-bold border border-outline-variant/30 hover:bg-surface-variant transition-colors">ALL</button>
<button className="bg-on-tertiary-container/20 px-3 py-1 text-[10px] font-bold border border-on-tertiary-container text-on-tertiary-container">HIGH_ONLY</button>
</div>
</div>

<div className="glass-panel p-4 neon-edge-red pulse-red cursor-pointer group relative overflow-hidden transition-all hover:translate-x-1">
<div className="scanline"></div>
<div className="flex justify-between items-start mb-3 relative z-10">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-on-tertiary-container animate-pulse">radar</span>
<h3 className="font-headline-md text-[16px] text-on-surface tracking-tight uppercase">Unidentified Incursion</h3>
</div>
<span className="font-data-mono text-[11px] text-on-tertiary-container font-bold">02:44:12</span>
</div>
<div className="flex flex-wrap gap-2 mb-4 relative z-10">
<span className="bg-on-tertiary-container text-white px-2 py-0.5 text-[9px] font-bold uppercase">Critical</span>
<span className="bg-surface-container-highest/80 text-on-surface-variant px-2 py-0.5 text-[9px] font-data-mono border border-outline-variant/30">ID: TH-8922</span>
<span className="bg-surface-container-highest/80 text-on-surface-variant px-2 py-0.5 text-[9px] font-data-mono border border-outline-variant/30">LOC: 24.1N 88.3E</span>
</div>
<p className="font-body-md text-label-sm text-on-surface/80 leading-relaxed mb-4 relative z-10">
                        Kinetic signature detected at Mach 3.1. Non-civilian profile. Intersecting Restricted Zone 4.
                    </p>
<div className="flex justify-between items-center relative z-10 border-t border-outline-variant/10 pt-3">
<div className="flex items-center gap-2">
<div className="w-5 h-5 rounded bg-on-tertiary-container/20 flex items-center justify-center"><span className="material-symbols-outlined text-[14px] text-on-tertiary-container">person</span></div>
<span className="text-[10px] text-on-surface-variant font-data-mono">Sgt. Miller</span>
</div>
<button className="font-data-mono text-[10px] text-on-tertiary-container hover:bg-on-tertiary-container/10 px-2 py-1 border border-on-tertiary-container/30 uppercase tracking-widest transition-all">Intercept</button>
</div>
</div>

<div className="glass-panel p-4 neon-edge-cyan cursor-pointer group relative overflow-hidden transition-all hover:translate-x-1 border-outline-variant/20">
<div className="flex justify-between items-start mb-3">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary-fixed-dim">security</span>
<h3 className="font-headline-md text-[16px] text-on-surface tracking-tight uppercase">Encryption Breach</h3>
</div>
<span className="font-data-mono text-[11px] text-secondary-fixed-dim font-bold">02:38:05</span>
</div>
<div className="flex gap-2 mb-4">
<span className="bg-secondary-fixed-dim text-on-secondary px-2 py-0.5 text-[9px] font-bold uppercase">Security</span>
<span className="bg-surface-container-highest/80 text-on-surface-variant px-2 py-0.5 text-[9px] font-data-mono border border-outline-variant/30">NODE: DB_01</span>
</div>
<p className="font-body-md text-label-sm text-on-surface/80 leading-relaxed mb-4">
                        Brute force attempt on secondary vault. Multiple auth failures. Source: 10.24.8.122
                    </p>
<div className="flex justify-between items-center border-t border-outline-variant/10 pt-3">
<span className="text-[10px] text-secondary-fixed-dim font-data-mono">AUTOLOCK_ENGAGED</span>
<button className="font-data-mono text-[10px] text-secondary-fixed-dim hover:bg-secondary-fixed-dim/10 px-2 py-1 border border-secondary-fixed-dim/30 uppercase tracking-widest">Detail</button>
</div>
</div>

<div className="glass-panel p-4 border-l-4 border-l-outline-variant cursor-pointer group relative transition-all hover:translate-x-1">
<div className="flex justify-between items-start mb-3">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-on-surface-variant">analytics</span>
<h3 className="font-headline-md text-[16px] text-on-surface tracking-tight uppercase">Comm Loss</h3>
</div>
<span className="font-data-mono text-[11px] text-on-surface-variant">02:30:19</span>
</div>
<p className="font-body-md text-label-sm text-on-surface-variant leading-relaxed">
                        Signal degradation on relay R-04. Atmospheric interference detected.
                    </p>
</div>
</div>

<div className="col-span-12 lg:col-span-8 flex flex-col gap-3">

<div className="glass-panel h-[480px] relative overflow-hidden border border-outline-variant/30 flex flex-col">
<div className="absolute inset-0 bg-[#0a0c0e]">

<img alt="Tactical Terrain Map" className="w-full h-full object-cover opacity-30 contrast-150 grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6z2oUA4OpN6_Sq39FsRtnDHkv_AlHp29fs82x6Y0pNzo4s2aQHSk6_eipAOSZ_tmPfTIRP1BnoRKCynvmEXvV259WC5fLCy90TtY48YZvYn5-1bYCYNPSXq8LMkAS3-JEnFF2mfFILZhHASGsHfRWZWqgThNIceqCHYLJSikBuaCutDFbsmKbIXERZMpLc9zINoQM9Ld_fiDIdgNjO3C9wv8Tq3WLjUkMngk-Ctks2RfZ7sVbcgShBbAqwa-KWtC0dy8gxgJc9Ahv"/>

<div className="absolute inset-0 pointer-events-none p-6">

<div className="absolute top-[42%] left-[48%] transform -translate-x-1/2 -translate-y-1/2">
<div className="w-48 h-48 border border-on-tertiary-container/40 border-dashed rounded-full animate-[spin_10s_linear_infinite]"></div>
<div className="absolute inset-0 flex items-center justify-center">
<div className="map-ping"></div>
</div>
<div className="absolute top-0 right-0 -mr-24 -mt-4 bg-on-tertiary-container/90 px-3 py-1 border border-on-tertiary-container/30 backdrop-blur-md">
<span className="font-data-mono text-[10px] text-white font-bold block">TRACKING: TH-8922</span>
<span className="font-data-mono text-[8px] text-white/70 block uppercase">Confidence: 94.2%</span>
</div>
</div>

<div className="absolute bottom-6 left-6 flex flex-col gap-1">
<div className="flex items-center gap-2 bg-black/40 px-3 py-1 border border-outline-variant/20 backdrop-blur-sm">
<span className="w-1.5 h-1.5 bg-primary-fixed-dim rounded-full"></span>
<span className="font-data-mono text-[10px] text-primary-fixed-dim">RADAR_NODE_ACTIVE: 12/12</span>
</div>
<div className="flex items-center gap-2 bg-black/40 px-3 py-1 border border-outline-variant/20 backdrop-blur-sm">
<span className="w-1.5 h-1.5 bg-secondary-fixed-dim rounded-full"></span>
<span className="font-data-mono text-[10px] text-secondary-fixed-dim">SAT_OVERHEAD: GEO_STAT_04</span>
</div>
</div>
<div className="absolute top-6 right-6 w-40 glass-panel p-3 border-outline-variant/30">
<p className="font-data-mono text-[10px] text-on-surface-variant mb-2 border-b border-outline-variant/20 pb-1">SIG_INT_FLOW</p>
<div className="flex flex-col gap-2">
<div className="h-1 bg-surface-container-high w-full rounded-full overflow-hidden">
<div className="h-full bg-primary-fixed-dim w-[85%]"></div>
</div>
<div className="h-1 bg-surface-container-high w-full rounded-full overflow-hidden">
<div className="h-full bg-on-tertiary-container w-[40%]"></div>
</div>
</div>
</div>
</div>
</div>

<div className="absolute top-6 left-6 flex flex-col gap-2">
<button className="bg-surface-dim/90 p-2 border border-outline-variant/30 hover:border-primary-fixed-dim transition-all text-on-surface hover:text-primary-fixed-dim"><span className="material-symbols-outlined text-[20px]">zoom_in</span></button>
<button className="bg-surface-dim/90 p-2 border border-outline-variant/30 hover:border-primary-fixed-dim transition-all text-on-surface"><span className="material-symbols-outlined text-[20px]">my_location</span></button>
<button className="bg-surface-dim/90 p-2 border border-outline-variant/30 hover:border-primary-fixed-dim transition-all text-on-surface"><span className="material-symbols-outlined text-[20px]">layers</span></button>
</div>
</div>

<div className="glass-panel p-5 border-outline-variant/30 flex-1">
<div className="flex items-center justify-between mb-6">
<div className="flex items-center gap-3">
<div className="bg-secondary-fixed-dim/20 p-2 rounded-lg">
<span className="material-symbols-outlined text-secondary-fixed-dim">psychology</span>
</div>
<div>
<h3 className="font-headline-md text-[18px] text-on-surface tracking-wide">AI_STRATEGIC_ADVISORY</h3>
<p className="text-[10px] font-data-mono text-on-surface-variant">Recommended counter-measures for active threats</p>
</div>
</div>
<span className="bg-surface-container-highest px-3 py-1 text-[10px] font-data-mono text-primary-fixed-dim border border-primary-fixed-dim/30">ENGINE_LOAD: 14%</span>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<div className="bg-surface-container-lowest border border-on-tertiary-container/30 p-4 relative group">
<div className="absolute top-0 right-0 bg-on-tertiary-container text-[8px] font-bold text-white px-2 py-0.5">PRIORITY: P0</div>
<span className="font-data-mono text-[10px] text-on-tertiary-container block mb-1">PROTO_FIREWALL_PURGE</span>
<h4 className="font-display-lg text-[14px] text-on-surface font-bold uppercase mb-3">Hard Isolation</h4>
<p className="font-body-md text-[12px] text-on-surface-variant mb-4 leading-snug">Sever all external data uplinks for Segment-D. Initiates automated honeycomb lockdowns. Estimated recovery: 4h.</p>
<button className="w-full py-2 bg-on-tertiary-container text-white font-data-mono text-[11px] font-bold tracking-[0.2em] hover:bg-on-tertiary-container/80 transition-all uppercase">Authorize Execution</button>
</div>
<div className="bg-surface-container-lowest border border-secondary-fixed-dim/30 p-4 relative group">
<div className="absolute top-0 right-0 bg-secondary-fixed-dim text-[8px] font-bold text-on-secondary px-2 py-0.5">PRIORITY: P1</div>
<span className="font-data-mono text-[10px] text-secondary-fixed-dim block mb-1">PROTO_GHOST_ECHO</span>
<h4 className="font-display-lg text-[14px] text-on-surface font-bold uppercase mb-3">Signal Decoy</h4>
<p className="font-body-md text-[12px] text-on-surface-variant mb-4 leading-snug">Deploy deceptive telemetry packets to misdirect threat actors. 88% success rate in simulated tests.</p>
<button className="w-full py-2 bg-secondary-fixed-dim text-on-secondary font-data-mono text-[11px] font-bold tracking-[0.2em] hover:bg-secondary-fixed-dim/80 transition-all uppercase">Authorize Execution</button>
</div>
</div>
</div>
</div>

<div className="col-span-12 glass-panel border border-outline-variant/30 overflow-hidden">
<div className="flex items-center justify-between p-4 bg-surface-container-low/50 border-b border-outline-variant/20">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-primary-fixed-dim">receipt_long</span>
<span className="font-headline-md text-[14px] text-on-surface tracking-[0.1em] font-bold">LIVE_TELEMETRY_STREAM</span>
</div>
<div className="flex gap-4">
<div className="flex items-center gap-2 px-3 py-1 bg-surface-container-high rounded border border-outline-variant/20">
<span className="w-2 h-2 rounded-full bg-primary-fixed-dim animate-pulse"></span>
<span className="font-data-mono text-[10px] text-on-surface font-medium uppercase">Feed Status: Nominal</span>
</div>
<button className="px-4 py-1 bg-surface-container-highest border border-outline-variant/30 text-[10px] font-data-mono text-on-surface hover:border-primary-fixed-dim transition-all">DUMP_JSON</button>
</div>
</div>
<div className="h-48 overflow-y-auto p-4 font-data-mono text-[12px] custom-scrollbar bg-black/20">
<div className="flex gap-4 py-1.5 border-b border-outline-variant/5">
<span className="text-primary-fixed-dim/70 shrink-0">[02:44:12]</span>
<span className="text-on-tertiary-container font-bold w-20 uppercase">CRITICAL</span>
<span className="text-on-surface/90">Long-range ping confirms target TH-8922 Mach speed increase to 3.1.</span>
</div>
<div className="flex gap-4 py-1.5 border-b border-outline-variant/5">
<span className="text-primary-fixed-dim/70 shrink-0">[02:44:08]</span>
<span className="text-secondary-fixed-dim font-bold w-20 uppercase">INFO</span>
<span className="text-on-surface/90">Satellite GEO_STAT_04 visual lock established. Visual index 0.98.</span>
</div>
<div className="flex gap-4 py-1.5 border-b border-outline-variant/5">
<span className="text-primary-fixed-dim/70 shrink-0">[02:43:55]</span>
<span className="text-secondary-fixed-dim font-bold w-20 uppercase">INFO</span>
<span className="text-on-surface/90">AI Advisory Protocol PROTO_FIREWALL_PURGE generated for Node_01.</span>
</div>
<div className="flex gap-4 py-1.5 border-b border-outline-variant/5">
<span className="text-primary-fixed-dim/70 shrink-0">[02:43:20]</span>
<span className="text-outline font-bold w-20 uppercase">SEC_LOG</span>
<span className="text-on-surface-variant italic">System-wide encryption rotation completed. (AES-512)</span>
</div>
<div className="flex gap-4 py-1.5 border-b border-outline-variant/5">
<span className="text-primary-fixed-dim/70 shrink-0">[02:42:12]</span>
<span className="text-secondary-fixed-dim font-bold w-20 uppercase">INFO</span>
<span className="text-on-surface/90">Atmospheric pressure at Zone 4 within expected deviation parameters.</span>
</div>
<div className="flex gap-4 py-1.5 border-b border-outline-variant/5 opacity-60">
<span className="text-primary-fixed-dim/70 shrink-0">[02:41:05]</span>
<span className="text-outline font-bold w-20 uppercase">SEC_LOG</span>
<span className="text-on-surface-variant italic">User OPR_892 session verified. Identity: MIL-SIG-A8.</span>
</div>
</div>
</div>
</div>
</div>
</main>

<footer className="fixed bottom-0 left-0 w-full z-50 flex justify-between items-center px-margin-edge py-1 h-8 bg-surface-container-lowest/95 backdrop-blur-md border-t border-outline-variant/20">
<div className="flex items-center gap-8">
<div className="flex items-center gap-2">
<span className="font-data-mono text-[10px] text-primary-fixed-dim">LATENCY: <span className="font-bold">14MS</span></span>
</div>
<div className="flex items-center gap-2">
<span className="font-data-mono text-[10px] text-primary-fixed-dim">UPTIME: <span className="font-bold">99.999%</span></span>
</div>
<div className="hidden sm:block font-data-mono text-[10px] text-on-surface-variant">GRID: 28.61° N, 77.21° E</div>
</div>
<div className="flex items-center gap-4">
<span className="font-data-mono text-[10px] text-on-surface-variant">SECURE_LINK // DRISHTI_GLOBAL_SYSTEMS</span>
<div className="w-2 h-2 rounded-full bg-primary-fixed-dim shadow-[0_0_8px_#00e38a]"></div>
</div>
</footer>


    </>
  );
}
