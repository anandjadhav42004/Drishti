import React from 'react';
import { useGlobalState } from '../GlobalState';
import { Link, useNavigate } from 'react-router-dom';

export function TacticalCommand() {
  const { addToast, setLockdown, openModal } = useGlobalState();
  const navigate = useNavigate();
  return (
    <>
      
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
            --bg-color: #050816;
            --card-bg: #111827;
            --primary-accent: #00FF9C;
            --secondary-accent: #00E5FF;
            --glass-border: rgba(255, 255, 255, 0.08);
        }

        body {
            background-color: var(--bg-color);
            background-image: 
                radial-gradient(circle at 50% 0%, rgba(0, 255, 156, 0.05) 0%, transparent 50%),
                radial-gradient(circle at 100% 100%, rgba(0, 229, 255, 0.05) 0%, transparent 50%);
        }

        .font-orbitron { font-family: 'Orbitron', sans-serif; }
        .font-inter { font-family: 'Inter', sans-serif; }

        .radar-sweep {
            background: conic-gradient(from 0deg, rgba(0, 229, 255, 0.15) 0%, transparent 40%);
            animation: sweep 6s linear infinite;
        }
        @keyframes sweep {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }

        .grain-texture {
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
            opacity: 0.03;
            pointer-events: none;
        }

        .glass-card {
            background: rgba(17, 24, 39, 0.6);
            backdrop-filter: blur(12px) saturate(180%);
            border: 1px solid var(--glass-border);
            box-shadow: 
                inset 0 1px 1px rgba(255, 255, 255, 0.02),
                0 8px 32px 0 rgba(0, 0, 0, 0.4);
        }

        .inner-glow {
            box-shadow: inset 0 0 15px rgba(0, 255, 156, 0.05);
        }

        .volumetric-light {
            position: absolute;
            width: 150px;
            height: 150px;
            background: radial-gradient(circle, rgba(0, 255, 156, 0.1) 0%, transparent 70%);
            filter: blur(40px);
            pointer-events: none;
        }

        .scanline {
            background: linear-gradient(to bottom, transparent, rgba(0, 255, 156, 0.03) 50%, transparent);
            background-size: 100% 4px;
            animation: scan 8s linear infinite;
        }
        @keyframes scan {
            from { background-position: 0 0; }
            to { background-position: 0 100%; }
        }

        .map-grid {
            background-image: 
                linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
            background-size: 40px 40px;
        }

        .pulse-primary {
            animation: pulse-p 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse-p {
            0%, 100% { opacity: 1; filter: drop-shadow(0 0 2px var(--primary-accent)); }
            50% { opacity: 0.6; filter: drop-shadow(0 0 8px var(--primary-accent)); }
        }
    ` }} />
      

<div className="fixed inset-0 grain-texture z-0"></div>
<div className="fixed inset-0 scanline z-0 pointer-events-none opacity-40"></div>





<main className="ml-16 pt-14 pb-8 px-8 grid grid-cols-12 gap-6 h-screen relative z-10">

<div className="col-span-3 flex flex-col gap-6 overflow-hidden">

<section className="glass-card p-5 rounded-lg inner-glow relative group">
<div className="volumetric-light -top-10 -left-10"></div>
<div className="flex items-center justify-between mb-6">
<h3 className="font-orbitron text-[10px] tracking-[0.2em] font-bold text-white flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-lg">psychology</span>
                    COGNITIVE_ENGINE
                </h3>
<span className="text-[9px] font-mono text-primary px-1.5 py-0.5 bg-primary/10 rounded">LIVE</span>
</div>
<div className="space-y-5">
<div>
<div className="flex justify-between mb-2">
<span className="text-[9px] font-orbitron tracking-wider text-on-surface-variant uppercase">Threat Recognition</span>
<span className="text-[10px] font-mono font-bold text-primary">99.2%</span>
</div>
<div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
<div className="h-full bg-primary"></div>
</div>
</div>
<div>
<div className="flex justify-between mb-2">
<span className="text-[9px] font-orbitron tracking-wider text-on-surface-variant uppercase">Predictive Accuracy</span>
<span className="text-[10px] font-mono font-bold text-secondary">87.5%</span>
</div>
<div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
<div className="h-full bg-secondary"></div>
</div>
</div>
<div className="grid grid-cols-2 gap-3 mt-2">
<div className="bg-white/5 border border-outline p-3 rounded">
<div className="text-[8px] font-orbitron text-on-surface-variant mb-1 uppercase">Alert Level</div>
<div className="text-xs font-orbitron font-bold text-primary">ALPHA_1</div>
</div>
<div className="bg-white/5 border border-outline p-3 rounded">
<div className="text-[8px] font-orbitron text-on-surface-variant mb-1 uppercase">Active Nodes</div>
<div className="text-xs font-orbitron font-bold text-secondary">1,244</div>
</div>
</div>
</div>
</section>

<section className="glass-card flex-1 p-5 rounded-lg inner-glow overflow-hidden flex flex-col">
<h3 className="font-orbitron text-[10px] tracking-[0.2em] font-bold text-white mb-6 uppercase flex items-center gap-2">
<span className="material-symbols-outlined text-lg">videocam</span>
                Optical_Arrays
            </h3>
<div className="flex-1 space-y-4 overflow-y-auto pr-1">

<div className="group cursor-pointer">
<div className="relative h-28 bg-black rounded border border-outline overflow-hidden">
<img className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmf9KWMYthj__HD3iU2Qrg9mFC0uAYgz5tVBzWqIUqh3Q1_G9-Cn9SX3ob9muhUvvfcz178RDnW-VxOqYYvuA0sWI7LGr-CnOy33Is9E03No9mhLf05gKQ5yAe9uggiGmcoPMljEiA7iX4zQ3qeGCaVRHtSFBK75blrnZqEyNUEOIBIOFo3ys3Dv0IelFMu8GgXxhRYvpt_LsPQ_QuHC27zQSFcSXlASzgoRoTEBmg3wZueERTm7ayzscHsl3__dSl9ukoYFOdVASm"/>
<div className="absolute top-2 left-2 flex items-center gap-2">
<span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
<span className="text-[8px] font-orbitron font-bold text-white bg-black/40 px-1 backdrop-blur-sm">SEC_NORTH_A</span>
</div>
</div>
<div className="flex justify-between items-center mt-2 px-1">
<span className="text-[9px] font-mono text-on-surface-variant">0.144 FPS / 4K</span>
<span className="text-[8px] font-orbitron font-bold text-primary">STABLE</span>
</div>
</div>

<div className="group cursor-pointer">
<div className="relative h-28 bg-black rounded border border-outline overflow-hidden">
<img className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDB8mFfo5ygCFPGB8qU4WOIEGCtGI2ynWfDsjnBkOTKdDc1d7ZCj23PWBz_3OGBZJ9juN3dr5jnT2_Uo8_YQwb83sjJhkfVccU41s0V_59b-VX5TEYOjKkdxkL1TGCbD6EwNQA-8YL7yx0NhG7Nmvva3aB4FhT6kbjqPsBpoY8uI9nH8UqiLB9q2bEmS0NNQupHBlizVp8wyk8Kv1bDPtzZ0VObI6OeWJ2xH9vXGPicSRGhULphA5AS-SyG-KwNgXEpmYNn79MLXxi5"/>
<div className="absolute top-2 left-2 flex items-center gap-2">
<span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
<span className="text-[8px] font-orbitron font-bold text-white bg-black/40 px-1 backdrop-blur-sm">WAREHOUSE_04</span>
</div>
</div>
<div className="flex justify-between items-center mt-2 px-1">
<span className="text-[9px] font-mono text-on-surface-variant">0.082 FPS / 1080P</span>
<span className="text-[8px] font-orbitron font-bold text-secondary">LINKED</span>
</div>
</div>
</div>
<button className="mt-4 w-full py-2 bg-primary/5 border border-primary/20 text-primary font-orbitron text-[9px] font-bold tracking-[0.2em] hover:bg-primary/10 transition-all uppercase">
                Initialize_Global_View
            </button>
</section>
</div>

<div className="col-span-6 flex flex-col gap-6">
<div className="flex-1 glass-card rounded-lg relative overflow-hidden group/map border-primary/20 shadow-[0_0_50px_rgba(0,255,156,0.03)]">

<div className="absolute inset-0 grayscale opacity-30 contrast-125 brightness-[0.4] mix-blend-lighten">
<img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDySyaztzVtcev5ThzWtKUyIbXo7FzbyHlb1euQ6X-N4-mZ9D1EEVW-txPnlucPjMnErWzgoUGNZe9bd7lMwKJkz-G7xtW5f0zMMYloYAQ2UCeaZTgE1mV6NutO8_9BK4ZZ6tUFyhnIJqJPiazy0CF7UCKKlSaOUPjEmq85hD8FigOiDPUYN_9QKVDJ3xmewpibu-vsPrls4llGFBjiM550tIb0MDekfH0wfi1GLREUPIGqoztvV7FNAlmipBZ5ZX1398m2TPGEdrBN"/>
</div>

<div className="absolute inset-0 map-grid pointer-events-none opacity-20"></div>

<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none">
<div className="radar-sweep absolute inset-0 rounded-full opacity-40"></div>
<div className="absolute inset-0 border border-secondary/10 rounded-full scale-[0.3]"></div>
<div className="absolute inset-0 border border-secondary/5 rounded-full scale-[0.6]"></div>
</div>

<div className="absolute top-6 left-6 p-4 glass-card rounded border-outline min-w-[200px]">
<div className="flex items-center gap-2 mb-3">
<div className="w-2 h-2 rounded-full bg-secondary pulse-primary"></div>
<span className="text-[9px] font-orbitron font-black text-secondary tracking-widest uppercase">Targeting Vector</span>
</div>
<div className="space-y-1">
<div className="text-2xl font-orbitron font-bold text-white tracking-tight">28° 36' 50" N</div>
<div className="text-2xl font-orbitron font-bold text-white tracking-tight">77° 12' 32" E</div>
</div>
<div className="mt-4 flex gap-4 border-t border-outline pt-4">
<div>
<div className="text-[8px] font-orbitron text-on-surface-variant uppercase">Altitude</div>
<div className="text-[11px] font-mono font-bold text-primary">1,240m</div>
</div>
<div>
<div className="text-[8px] font-orbitron text-on-surface-variant uppercase">Velocity</div>
<div className="text-[11px] font-mono font-bold text-primary">44 KM/H</div>
</div>
</div>
</div>

<div className="absolute top-[45%] left-[55%] -translate-x-1/2 -translate-y-1/2 z-20">
<div className="relative">

<div className="absolute -inset-6 border-2 border-secondary/40 w-12 h-12 rounded-sm border-t-0 border-r-0"></div>
<div className="absolute -inset-6 border-2 border-secondary/40 w-12 h-12 rounded-sm border-b-0 border-l-0 left-auto top-auto right-0 bottom-0"></div>
<div className="w-14 h-14 glass-card border-secondary/50 flex items-center justify-center animate-pulse">
<span className="material-symbols-outlined text-secondary text-2xl">airplanemode_active</span>
</div>
<div className="absolute top-0 -right-24 glass-card p-2 border-secondary/30 min-w-[80px]">
<div className="text-[8px] font-orbitron font-bold text-secondary mb-1">DRN_ALPHA_01</div>
<div className="flex items-center gap-1">
<div className="h-0.5 w-full bg-white/10 overflow-hidden">
<div className="h-full bg-primary w-2/3"></div>
</div>
<span className="text-[8px] font-mono text-white">68%</span>
</div>
</div>
</div>
</div>

<div className="absolute bottom-6 right-6 flex flex-col gap-2">
<button className="w-10 h-10 glass-card flex items-center justify-center hover:bg-primary/20 transition-all text-white border-outline"><span className="material-symbols-outlined">add</span></button>
<button className="w-10 h-10 glass-card flex items-center justify-center hover:bg-primary/20 transition-all text-white border-outline"><span className="material-symbols-outlined">remove</span></button>
<button className="w-10 h-10 glass-card flex items-center justify-center hover:bg-primary/20 transition-all text-primary border-outline"><span className="material-symbols-outlined">my_location</span></button>
</div>
</div>

<div className="glass-card p-4 rounded-lg inner-glow flex items-center justify-between">
<div className="flex gap-12">
<div className="flex gap-3 items-center">
<div className="w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center">
<span className="material-symbols-outlined text-primary text-sm">wifi_tethering</span>
</div>
<div>
<div className="text-[8px] font-orbitron text-on-surface-variant uppercase">Bandwidth</div>
<div className="text-xs font-mono font-bold text-white">12.4 GB/s</div>
</div>
</div>
<div className="flex gap-3 items-center">
<div className="w-8 h-8 rounded-full border border-secondary/20 flex items-center justify-center">
<span className="material-symbols-outlined text-secondary text-sm">memory</span>
</div>
<div>
<div className="text-[8px] font-orbitron text-on-surface-variant uppercase">Compute Load</div>
<div className="text-xs font-mono font-bold text-white">42.2%</div>
</div>
</div>
<div className="flex gap-3 items-center">
<div className="w-8 h-8 rounded-full border border-outline flex items-center justify-center">
<span className="material-symbols-outlined text-white/40 text-sm">database</span>
</div>
<div>
<div className="text-[8px] font-orbitron text-on-surface-variant uppercase">Node Sync</div>
<div className="text-xs font-mono font-bold text-white">SYNCED</div>
</div>
</div>
</div>
<div className="flex items-center gap-4">
<span className="text-[9px] font-orbitron font-bold tracking-[0.2em] text-white">REC_SYSTEM_ACTIVE</span>
<div className="w-2.5 h-2.5 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)] animate-pulse"></div>
</div>
</div>
</div>

<div className="col-span-3 flex flex-col gap-6">

<section className="glass-card flex-1 p-5 rounded-lg inner-glow flex flex-col overflow-hidden relative">
<div className="volumetric-light -bottom-10 -right-10 opacity-50"></div>
<div className="flex justify-between items-center mb-6">
<h3 className="font-orbitron text-[10px] tracking-[0.2em] font-bold text-white flex items-center gap-2 uppercase">
<span className="material-symbols-outlined text-red-500 text-lg">crisis_alert</span>
                    Tactical_Alerts
                </h3>
<span className="text-[8px] font-orbitron font-bold text-red-500 bg-red-500/10 px-1.5 py-0.5 border border-red-500/30 animate-pulse">CRITICAL_9</span>
</div>
<div className="flex-1 space-y-4 overflow-y-auto pr-1">

<div className="p-4 bg-red-500/5 border border-red-500/20 rounded relative group overflow-hidden">
<div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 pointer-events-none"></div>
<div className="flex justify-between items-start mb-3">
<span className="text-[10px] font-orbitron font-black text-red-500">INTRUSION_DETECTED</span>
<span className="text-[9px] font-mono text-red-500/60">12:44:02</span>
</div>
<p className="text-[11px] text-on-surface-variant leading-relaxed mb-4">
                        Unauthorized visual signature identified at <span className="text-white font-bold">GRID_B4_GATE</span>. Cross-referencing database...
                    </p>
<div className="flex gap-2">
<button className="flex-1 py-1.5 bg-red-500 text-white text-[9px] font-orbitron font-bold tracking-widest hover:brightness-110">INTERCEPT</button>
<button className="px-3 py-1.5 border border-red-500/30 text-red-500 text-[9px] font-orbitron font-bold tracking-widest hover:bg-red-500/10">IGNORE</button>
</div>
</div>

<div className="p-4 bg-secondary/5 border border-secondary/20 rounded">
<div className="flex justify-between items-start mb-3">
<span className="text-[10px] font-orbitron font-black text-secondary">SIGNAL_DEGRADATION</span>
<span className="text-[9px] font-mono text-secondary/60">12:41:15</span>
</div>
<p className="text-[11px] text-on-surface-variant leading-relaxed">
                        Satellite Link <span className="text-white font-bold">XJ-09</span> reporting intermittent interference in Zone E.
                    </p>
<div className="mt-3 text-[9px] font-orbitron text-secondary uppercase font-bold flex items-center gap-2">
<span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                        Auto_Rerouting...
                    </div>
</div>

<div className="p-4 bg-white/5 border border-outline rounded">
<div className="flex justify-between items-start mb-3">
<span className="text-[10px] font-orbitron font-black text-on-surface-variant">LOG_UPDATE</span>
<span className="text-[9px] font-mono text-on-surface-variant/60">12:35:01</span>
</div>
<p className="text-[11px] text-on-surface-variant leading-relaxed">
                        Fleet maintenance completed for Drone <span className="text-white">AX-04</span>. Returning to station.
                    </p>
</div>
</div>
</section>

<div className="grid grid-cols-2 gap-3">
<button className="glass-card h-20 flex flex-col items-center justify-center gap-2 hover:bg-primary/10 hover:border-primary/40 transition-all rounded group">
<span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">broadcast_on_personal</span>
<span className="text-[9px] font-orbitron font-bold tracking-widest text-on-surface-variant group-hover:text-primary transition-colors">VOICE_COMMS</span>
</button>
<button className="glass-card h-20 flex flex-col items-center justify-center gap-2 hover:bg-secondary/10 hover:border-secondary/40 transition-all rounded group">
<span className="material-symbols-outlined text-secondary group-hover:scale-110 transition-transform">support_agent</span>
<span className="text-[9px] font-orbitron font-bold tracking-widest text-on-surface-variant group-hover:text-secondary transition-colors">HQ_DIRECT</span>
</button>
<button className="glass-card h-20 flex flex-col items-center justify-center gap-2 hover:bg-white/10 hover:border-white/30 transition-all rounded group">
<span className="material-symbols-outlined text-on-surface-variant group-hover:scale-110 transition-transform">history</span>
<span className="text-[9px] font-orbitron font-bold tracking-widest text-on-surface-variant group-hover:text-white transition-colors">ARCHIVES</span>
</button>
<button className="glass-card h-20 flex flex-col items-center justify-center gap-2 hover:bg-white/10 hover:border-white/30 transition-all rounded group">
<span className="material-symbols-outlined text-on-surface-variant group-hover:scale-110 transition-transform">settings_input_antenna</span>
<span className="text-[9px] font-orbitron font-bold tracking-widest text-on-surface-variant group-hover:text-white transition-colors">NET_MAPPING</span>
</button>
</div>
</div>
</main>

<footer className="fixed bottom-0 left-0 w-full z-50 h-7 bg-surface/80 backdrop-blur-xl border-t border-outline px-8 flex justify-between items-center text-[9px] font-mono tracking-widest text-on-surface-variant/60 uppercase">
<div className="flex items-center gap-8">
<div className="flex items-center gap-2">
<span className="text-primary/60">G_COORD:</span>
<span className="text-on-surface">28.6139° N, 77.2090° E</span>
</div>
<div className="flex items-center gap-2">
<span className="text-primary/60">KERNEL:</span>
<span className="text-on-surface">V.4.2.0-STABLE</span>
</div>
</div>
<div className="flex items-center gap-8">
<div className="flex items-center gap-2">
<div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
<span className="text-on-surface">System Optimal</span>
</div>
<div className="w-px h-2 bg-outline"></div>
<div className="text-on-surface">Uptime: 284:12:04</div>
</div>
</footer>


    </>
  );
}
