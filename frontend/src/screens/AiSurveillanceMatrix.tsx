import React, { useEffect, useRef } from 'react';
import { useGlobalState } from '../GlobalState';
import { Link, useNavigate } from 'react-router-dom';

export function AiSurveillanceMatrix() {
  const { addToast, setLockdown, openModal } = useGlobalState();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => console.error("Error accessing webcam: ", err));
    }
  }, []);
  return (
    <>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .scanline {
            background: linear-gradient(to bottom, transparent 50%, rgba(0, 227, 138, 0.05) 50%);
            background-size: 100% 4px;
        }
        @keyframes pulse-red {
            0%, 100% { opacity: 1; filter: drop-shadow(0 0 5px rgba(255, 180, 171, 0.8)); }
            50% { opacity: 0.2; filter: drop-shadow(0 0 1px rgba(255, 180, 171, 0)); }
        }
        .animate-blink {
            animation: pulse-red 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes scanner-line {
            0% { top: 0%; opacity: 0; }
            5% { opacity: 1; }
            95% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
        }
        .ai-scanner {
            position: absolute;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, transparent, #00e38a, transparent);
            box-shadow: 0 0 15px #00e38a;
            animation: scanner-line 4s linear infinite;
            z-index: 20;
        }
        .bracket-corner {
            position: absolute;
            width: 20px;
            height: 20px;
            border-color: rgba(0, 227, 138, 0.6);
            filter: drop-shadow(0 0 4px rgba(0, 227, 138, 0.4));
        }
        .glitch-overlay {
            background: repeating-linear-gradient(0deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px, transparent 1px, transparent 2px);
        }
        .thermal-overlay {
            mix-blend-mode: color-burn;
            background: radial-gradient(circle, rgba(0,255,100,0.05) 0%, rgba(0,0,0,0.2) 100%);
        }
        .glass-panel {
            background: rgba(29, 32, 35, 0.4);
            backdrop-filter: blur(12px) saturate(180%);
            border: 1px solid rgba(132, 149, 135, 0.15);
        }
        .night-vision {
            filter: sepia(100%) hue-rotate(80deg) brightness(1.1) contrast(1.2);
        }
    ` }} />
      





<main className="pl-20 pt-16 pb-8 min-h-screen bg-surface-dim selection:bg-primary-fixed-dim/30">
<div className="p-gutter grid grid-cols-12 grid-rows-6 gap-unit h-[calc(100vh-6rem)]">

<div className="col-span-12 lg:col-span-8 row-span-4 relative group overflow-hidden border border-outline-variant/30 bg-black shadow-inner ring-1 ring-white/5">
<video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-all duration-[10s] group-hover:scale-[1.02]" />

<div className="absolute inset-0 pointer-events-none glitch-overlay opacity-40"></div>
<div className="ai-scanner"></div>

<div className="absolute top-6 right-6 flex items-center gap-3 bg-black/60 backdrop-blur-xl px-4 py-1.5 border border-white/10 rounded shadow-2xl">
<div className="w-2.5 h-2.5 bg-error rounded-full animate-blink"></div>
<span className="font-data-mono text-label-sm text-error uppercase tracking-[0.2em] font-bold">REC</span>
<span className="font-data-mono text-label-sm text-on-surface/90 font-medium tracking-wider">04:22:15:09</span>
</div>


<div className="absolute top-[20%] left-[35%] w-[12%] h-[40%] border-[0.5px] border-primary-fixed-dim/80 shadow-[0_0_12px_rgba(0,227,138,0.3)] ring-1 ring-primary-fixed-dim/20">
<div className="absolute -top-6 left-0 bg-primary-fixed-dim/90 text-on-primary-fixed font-body-lg text-[9px] px-2 py-0.5 whitespace-nowrap rounded-t-sm shadow-lg font-bold tracking-tight">
    PERSON: 98.4% [TARGET_01]
</div>
<div className="absolute inset-0 bg-primary-fixed-dim/5"></div>
</div>

<div className="absolute bottom-[15%] right-[25%] w-[25%] h-[20%] border-[0.5px] border-secondary-fixed-dim/80 shadow-[0_0_12px_rgba(0,218,243,0.3)] ring-1 ring-secondary-fixed-dim/20">
<div className="absolute -top-6 left-0 bg-secondary-fixed-dim/90 text-on-secondary-fixed font-body-lg text-[9px] px-2 py-0.5 whitespace-nowrap rounded-t-sm shadow-lg font-bold tracking-tight">
    VEHICLE: 92.1% [MOBILE_UNIT_04]
</div>
<div className="absolute inset-0 bg-secondary-fixed-dim/5"></div>
</div>

<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
<div className="w-64 h-64 border border-white/5 rounded-full flex items-center justify-center relative">
<div className="w-32 h-px bg-gradient-to-r from-transparent via-primary-fixed-dim/20 to-transparent"></div>
<div className="h-32 w-px bg-gradient-to-b from-transparent via-primary-fixed-dim/20 to-transparent absolute"></div>
<div className="absolute inset-0 border-[0.5px] border-primary-fixed-dim/10 rounded-full scale-110"></div>
</div>

<div className="absolute top-8 left-8 bracket-corner border-t-2 border-l-2"></div>
<div className="absolute top-8 right-8 bracket-corner border-t-2 border-r-2"></div>
<div className="absolute bottom-8 left-8 bracket-corner border-b-2 border-l-2"></div>
<div className="absolute bottom-8 right-8 bracket-corner border-b-2 border-r-2"></div>
</div>

<div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 bg-black/40 backdrop-blur-md p-3 border border-white/5 rounded-full">
<div className="flex flex-col gap-1 items-center">
<span className="text-[7px] text-on-surface-variant font-bold">ALT</span>
<div className="w-[1.5px] h-24 bg-surface-variant/40 relative rounded-full overflow-hidden">
<div className="absolute bottom-1/4 left-0 w-full h-4 bg-primary-fixed-dim shadow-[0_0_8px_#00e38a]"></div>
</div>
</div>
<span className="font-data-mono text-[9px] text-primary-fixed-dim font-bold">842M</span>
</div>
<div className="absolute bottom-8 left-8 flex items-end gap-10">
<div className="flex flex-col gap-1">
<span className="font-data-mono text-[9px] text-on-surface-variant font-bold tracking-widest opacity-80">CAM_01_FEED</span>
<span className="font-headline-lg text-headline-md text-primary-fixed tracking-tight uppercase drop-shadow-[0_0_10px_rgba(243,255,243,0.3)]">North_Plaza_Main</span>
</div>
<div className="flex gap-1">
<span className="bg-black/60 text-on-surface font-data-mono text-[9px] px-3 py-1.5 border border-white/10 rounded backdrop-blur-md">ZOOM: 4.5X</span>
<span className="bg-black/60 text-on-surface font-data-mono text-[9px] px-3 py-1.5 border border-white/10 rounded backdrop-blur-md">IRIS: F1.8</span>
</div>
</div>
</div>

<div className="col-span-12 lg:col-span-4 row-span-4 flex flex-col gap-unit">

<div className="flex-1 relative group overflow-hidden border border-outline-variant/30 bg-black ring-1 ring-white/5">
<img className="w-full h-full object-cover opacity-70 grayscale group-hover:opacity-90 transition-all night-vision" data-alt="A tactical birds-eye view of a loading dock at a high-security industrial facility during dawn. The scene is bathed in a cold, blue-hour light, with strong shadows and sharp metallic textures. Digital UI elements show small tracking markers over moving forklifts. The mood is utilitarian, professional, and high-stakes, fitting a dark tactical cyber-intelligence dashboard." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcBcz1lf5xrMxb6PdiCidZ3FHADyQJHyc3BNalCB1b0t4mwf7cv0I3UAa23wG-bo-wDeFOInEyXokV6kDDopGM0zsnfeEfmg0m0Dn-EtXDTEsjAvQt4eTK8H3U0FhmUwWERjdD8yWV7alkF86U4JvuoC7bODqfVTrkb2I0BUNJ1b4eYgaAaHzt5dMJYniJfwxIoOBuuUuFt63sP-b6YJNvYWNpknxBXrxvGQmnK3-9N5FmroaulQdjpCVxrhZXShWNeQSJJNMXVHc1"/>
<div className="absolute inset-0 thermal-overlay"></div>
<div className="absolute top-2 left-2 font-data-mono text-[9px] text-primary-fixed-dim bg-black/70 px-2 py-0.5 border border-primary-fixed-dim/20 backdrop-blur-sm rounded">CAM_02 [LOADING_BAY] <span className="ml-2 animate-pulse">• NV_ACTIVE</span></div>
<div className="absolute inset-0 border-2 border-transparent group-hover:border-primary-fixed-dim/20 transition-colors"></div>
</div>

<div className="flex-1 relative group overflow-hidden border border-outline-variant/30 bg-black ring-1 ring-white/5">
<img className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-all contrast-125 saturate-50" data-alt="Internal CCTV view of a dimly lit high-tech server room with rows of blinking LED racks. The lighting is dominated by cooling blue and red status indicators. A digital lens effect adds a slight curve to the edges. A tactical overlay shows temperature data points hovering over specific server racks. The atmosphere is quiet, technological, and intense." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3KDvJYjIUSp8SQmORFovP5KbxOLOJFhS0KSr9wh1dwDoG-TCvuUdrQ7fjzRvy2bm7-oN-fsoMEmd7T6wVTrkQYfQK7hjYceN8A9JdW3UvnjipgMVlV8aFdKId9TVEH9XPGdN6iyhZSRnH40sJZ6D_efBJ7PyHaBEiuqfmma07JHOkL-JqwpQBiS1FPTzvMCeXoIIyPDxVASFV8f5HjhXcLS9612pAuAQM789bMdIUC2UZfSFADBJX4DWR4GKpk-Ne_1qhbO2gkOU6"/>
<div className="absolute top-2 left-2 font-data-mono text-[9px] text-on-surface-variant bg-black/70 px-2 py-0.5 border border-white/10 backdrop-blur-sm rounded">CAM_03 [SERVER_CORE]</div>
<div className="absolute inset-0 border-2 border-transparent group-hover:border-secondary-fixed-dim/20 transition-colors"></div>
</div>

<div className="flex-1 relative group overflow-hidden border border-outline-variant/30 bg-black ring-1 ring-white/5">
<img className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-all brightness-75" data-alt="Surveillance perspective of a minimalist corporate lobby featuring polished concrete and glass. A stark, dramatic lighting setup creates deep shadows. The camera angle is high, looking down on the entrance gates. Bounding boxes are visible around the turnstiles. The aesthetic is clean, cold, and highly detailed." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3ifMQ4P8Kofht02HQuiIPUgVjlH6vl_-jHW45Uwt4RoQEmqM0AKscjLgGrBqoVjRJBcBfYYYhRmwpV-qy5uVZF84s8Qo4IbEELax15wz5JsjOIh7qafHvbaPVsGaQAEaMefahN4hfx-2sZvt1T4jII4u3RU3dIXNQTaUb6Myn0C14VOxy2VntM7yhC8XHL0Zdhz4Ak4JvI_8_iZM_CuPm6TxNlC6MLa45Mxej6C5qnRWMAzxmaBrzjHVMI2n6_h4GDmiXfMfTcTnX"/>
<div className="absolute top-2 left-2 font-data-mono text-[9px] text-on-surface-variant bg-black/70 px-2 py-0.5 border border-white/10 backdrop-blur-sm rounded">CAM_04 [LOBBY_EAST]</div>
<div className="absolute inset-0 border-2 border-transparent group-hover:border-primary-fixed-dim/20 transition-colors"></div>
</div>
</div>

<div className="col-span-12 row-span-2 grid grid-cols-1 md:grid-cols-4 gap-unit">

<div className="glass-panel p-gutter relative overflow-hidden flex items-center justify-center rounded-lg shadow-2xl">
<div className="absolute inset-0 opacity-10 scanline"></div>

<div className="relative w-36 h-36 border border-secondary-fixed-dim/20 rounded-full flex items-center justify-center">
<div className="absolute inset-0 border border-secondary-fixed-dim/5 rounded-full scale-75"></div>
<div className="absolute inset-0 border border-secondary-fixed-dim/5 rounded-full scale-50"></div>

<div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-transparent border-secondary-fixed-dim/40 shadow-[0_0_20px_rgba(0,218,243,0.2)] animate-[spin_3s_linear_infinite]"></div>

<div className="absolute top-1/4 right-1/4 w-2 h-2 bg-primary-fixed-dim rounded-full animate-pulse shadow-[0_0_12px_#00e38a]"></div>
<div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-error rounded-full animate-pulse shadow-[0_0_12px_#ffb4ab]"></div>
</div>
<div className="absolute top-3 left-3 font-data-mono text-[10px] text-secondary-fixed-dim font-bold tracking-widest">RADAR_SWEEP</div>
</div>

<div className="glass-panel p-gutter rounded-lg shadow-2xl">
<div className="flex justify-between items-center mb-6">
<span className="font-data-mono text-label-sm text-on-surface-variant/80 font-bold uppercase">THREAT_LEVEL</span>
<span className="font-data-mono text-label-sm text-error bg-error/10 px-2 py-0.5 rounded border border-error/30 animate-pulse">CRITICAL_V_9</span>
</div>
<div className="flex flex-col gap-4">
<div className="flex flex-col gap-1.5">
<div className="flex justify-between text-[10px] font-data-mono font-medium">
<span className="opacity-70">PERSONNEL_DENSITY</span>
<span className="text-primary-fixed-dim font-bold">74%</span>
</div>
<div className="h-1 bg-white/5 rounded-full overflow-hidden">
<div className="h-full bg-gradient-to-r from-primary-fixed-dim/50 to-primary-fixed-dim w-[74%] shadow-[0_0_10px_#00e38a]"></div>
</div>
</div>
<div className="flex flex-col gap-1.5">
<div className="flex justify-between text-[10px] font-data-mono font-medium">
<span className="opacity-70">VEHICLE_ACTIVITY</span>
<span className="text-secondary-fixed-dim font-bold">22%</span>
</div>
<div className="h-1 bg-white/5 rounded-full overflow-hidden">
<div className="h-full bg-gradient-to-r from-secondary-fixed-dim/50 to-secondary-fixed-dim w-[22%] shadow-[0_0_10px_#00daf3]"></div>
</div>
</div>
<div className="flex flex-col gap-1.5">
<div className="flex justify-between text-[10px] font-data-mono font-medium">
<span className="opacity-70">ANOMALY_DETECTION</span>
<span className="text-error font-bold">04</span>
</div>
<div className="h-1 bg-white/5 rounded-full overflow-hidden flex gap-0.5">
<div className="flex-1 bg-error shadow-[0_0_5px_#ffb4ab]"></div>
<div className="flex-1 bg-error shadow-[0_0_5px_#ffb4ab]"></div>
<div className="flex-1 bg-error shadow-[0_0_5px_#ffb4ab]"></div>
<div className="flex-1 bg-error shadow-[0_0_5px_#ffb4ab]"></div>
<div className="flex-1 bg-white/5"></div>
</div>
</div>
</div>
</div>

<div className="glass-panel p-gutter col-span-2 overflow-hidden rounded-lg shadow-2xl">
<div className="flex justify-between items-center mb-4">
<div className="font-data-mono text-label-sm text-on-surface-variant font-bold tracking-widest uppercase">SYSTEM_LOG_STREAM</div>
<div className="text-[9px] font-data-mono text-primary-fixed-dim/60">BUF: 512KB / LIVE</div>
</div>
<div className="flex flex-col gap-2 font-data-mono text-[10px]">
<div className="flex gap-4 border-l-2 border-primary-fixed-dim/40 pl-3 py-1 bg-primary-fixed-dim/5 rounded-r">
<span className="text-on-surface-variant/40 font-bold">[22:45:01]</span>
<span className="text-primary-fixed-dim font-medium">OBJ_DET: PERSON detected in Sector_B <span className="opacity-50">#0091</span></span>
</div>
<div className="flex gap-4 border-l-2 border-secondary-fixed-dim/40 pl-3 py-1 hover:bg-secondary-fixed-dim/5 transition-colors">
<span className="text-on-surface-variant/40 font-bold">[22:45:04]</span>
<span className="text-secondary-fixed-dim font-medium">CAM_SYNC: Resynchronizing feed CAM_04 ... [OK]</span>
</div>
<div className="flex gap-4 border-l-2 border-error/50 pl-3 py-1 bg-error/10 rounded-r animate-pulse">
<span className="text-on-surface-variant/40 font-bold">[22:45:08]</span>
<span className="text-error font-bold">ALERT: Perimeter breach detected at fence 09 [PRIO: HIGH]</span>
</div>
<div className="flex gap-4 border-l-2 border-white/10 pl-3 py-1 hover:bg-white/5 transition-colors">
<span className="text-on-surface-variant/40 font-bold">[22:45:12]</span>
<span className="text-on-surface/80 font-medium">SYS_INF: AI weight optimization complete [MODEL: V4.2]</span>
</div>
</div>
</div>
</div>
</div>
</main>

<footer className="fixed bottom-0 left-0 w-full z-50 flex justify-between items-center px-margin-edge h-10 bg-surface-container-lowest/90 backdrop-blur-2xl border-t border-outline-variant/20 font-data-mono text-[10px] text-primary-fixed-dim font-bold">
<div className="flex gap-10 items-center">
<div className="flex items-center gap-2">
<span className="text-on-surface-variant/50">LOCATION:</span>
<span className="text-primary-fixed">28.6139° N, 77.2090° E</span>
</div>
<span className="text-on-surface-variant/20">|</span>
<div className="flex items-center gap-2">
<span className="text-on-surface-variant/50">LATENCY:</span>
<span>14MS</span>
</div>
</div>
<div className="flex gap-10 items-center">
<div className="flex items-center gap-4">
<span className="hover:text-primary cursor-pointer transition-colors opacity-80">STATUS: NOMINAL</span>
<span className="hover:text-primary cursor-pointer transition-colors opacity-80">UPTIME: 99.9%</span>
</div>
<div className="flex items-center gap-2 bg-primary-fixed-dim/10 px-3 py-1 rounded-full border border-primary-fixed-dim/20 shadow-[0_0_10px_rgba(0,227,138,0.1)]">
<span className="w-1.5 h-1.5 bg-primary-fixed-dim rounded-full animate-pulse shadow-[0_0_8px_#00e38a]"></span>
<span className="tracking-widest">DRISHTI_V_4.2.1</span>
</div>
</div>
</footer>


    </>
  );
}
