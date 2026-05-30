import React from 'react';
import { useGlobalState } from './GlobalState';

export function GlobalOverlay() {
  const { 
    toasts, 
    removeToast, 
    isLockdown, 
    setLockdown, 
    modal, 
    closeModal,
    isNotificationsOpen,
    setNotificationsOpen
  } = useGlobalState();

  return (
    <>
      {/* 1. Toasts */}
      <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => {
          let toastStyles = 'bg-[#181c1f]/95 border-l-4 border-l-[#849587] border-y-[#849587]/20 border-r-[#849587]/20 text-[#e0e2e6] shadow-[0_0_20px_rgba(132,149,135,0.15)]';
          let icon = 'info';
          let iconColor = 'text-[#849587]';
          
          if (toast.type === 'error') { 
            toastStyles = 'bg-[#220d0f]/95 border-l-4 border-l-[#c7041a] border-y-[#c7041a]/20 border-r-[#c7041a]/20 text-[#ffb4ab] shadow-[0_0_20px_rgba(199,4,26,0.3)]'; 
            icon = 'warning'; 
            iconColor = 'text-[#ffb4ab] animate-pulse'; 
          }
          if (toast.type === 'success') { 
            toastStyles = 'bg-[#0e1f17]/95 border-l-4 border-l-[#00e38a] border-y-[#00e38a]/20 border-r-[#00e38a]/20 text-[#56ffa7] shadow-[0_0_20px_rgba(0,227,138,0.3)]'; 
            icon = 'check_circle'; 
            iconColor = 'text-[#56ffa7]'; 
          }
          if (toast.type === 'warning') { 
            toastStyles = 'bg-[#0c1f24]/95 border-l-4 border-l-[#00daf3] border-y-[#00daf3]/20 border-r-[#00daf3]/20 text-[#9cf0ff] shadow-[0_0_20px_rgba(0,218,243,0.3)]'; 
            icon = 'warning'; 
            iconColor = 'text-[#9cf0ff]'; 
          }

          return (
            <div key={toast.id} className={`flex items-center gap-3 px-5 py-4 rounded border shadow-2xl pointer-events-auto min-w-[280px] max-w-[400px] backdrop-blur-md animate-[slide-in-right_0.3s_ease-out] ${toastStyles}`}>
              <span className={`material-symbols-outlined text-[22px] ${iconColor}`}>{icon}</span>
              <span className="font-data-mono text-xs font-semibold tracking-wide flex-1 leading-snug">{toast.message}</span>
              <button onClick={() => removeToast(toast.id)} className="text-on-surface-variant/70 hover:text-on-surface transition-colors p-1 rounded hover:bg-white/5 ml-2">
                <span className="material-symbols-outlined text-[16px] block">close</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* 2. Generic Modal */}
      {modal && (
        <div className="fixed inset-0 z-[9900] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg shadow-[0_10px_50px_rgba(0,0,0,0.5)] max-w-2xl w-full flex flex-col max-h-[85vh]">
            <div className="flex justify-between items-center p-4 border-b border-outline-variant/20">
              <h2 className="font-display-lg text-xl tracking-tight text-on-surface">{modal.title}</h2>
              <button onClick={closeModal} className="p-1 hover:bg-surface-variant/50 rounded transition-colors text-on-surface-variant hover:text-on-surface">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-6 overflow-y-auto custom-scrollbar font-data-mono text-sm text-on-surface/80">
              {modal.content}
            </div>
          </div>
        </div>
      )}

      {/* 3. Notifications Panel */}
      {isNotificationsOpen && (
        <>
          <div className="fixed inset-0 z-[9800] bg-black/40 backdrop-blur-sm" onClick={() => setNotificationsOpen(false)} />
          <div className="fixed top-16 right-0 bottom-0 w-85 bg-[#0c0f11]/98 border-l border-outline-variant/20 shadow-2xl z-[9850] flex flex-col animate-[slide-in-right_0.3s_ease-out]">
            <div className="p-5 border-b border-outline-variant/20 flex justify-between items-center bg-[#070a0c]">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary-fixed-dim animate-pulse">radar</span>
                <h3 className="font-display-lg text-lg text-on-surface tracking-tight font-bold">System Alerts Queue</h3>
              </div>
              <button onClick={() => setNotificationsOpen(false)} className="text-on-surface-variant hover:text-on-surface p-1 rounded hover:bg-white/5 transition-colors">
                <span className="material-symbols-outlined text-[20px] block">close</span>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 custom-scrollbar bg-black/10">
              {/* Critical Alert */}
              <div className="p-4 bg-[#220d0f]/90 border border-error/20 border-l-4 border-l-[#c7041a] rounded shadow-md relative overflow-hidden group">
                <div className="absolute top-0 right-0 bg-[#c7041a] text-[8px] font-bold text-white px-2 py-0.5 uppercase tracking-widest animate-pulse">CRITICAL</div>
                <div className="flex items-center gap-2 mb-2 text-[#ffb4ab]">
                  <span className="material-symbols-outlined text-[18px]">warning</span>
                  <span className="font-data-mono text-[10px] font-black tracking-widest uppercase">Perimeter Breach</span>
                </div>
                <p className="font-data-mono text-xs text-[#e0e2e6]/90 leading-relaxed">Perimeter breach detected at Zone Charlie. Security dispatch advised.</p>
                <div className="flex justify-between items-center mt-3 pt-2 border-t border-outline-variant/10">
                  <span className="font-data-mono text-[9px] text-[#ffb4ab]/60">Just now</span>
                  <button className="text-[9px] font-data-mono bg-[#c7041a]/20 text-[#ffb4ab] px-2 py-0.5 border border-[#c7041a]/30 hover:bg-[#c7041a]/40 rounded transition-all">ACKNOWLEDGE</button>
                </div>
              </div>

              {/* System Update */}
              <div className="p-4 bg-[#0c1f24]/90 border border-secondary-fixed-dim/20 border-l-4 border-l-[#00daf3] rounded shadow-md relative overflow-hidden">
                <div className="flex items-center gap-2 mb-2 text-[#9cf0ff]">
                  <span className="material-symbols-outlined text-[18px]">info</span>
                  <span className="font-data-mono text-[10px] font-black tracking-widest uppercase">System Update</span>
                </div>
                <p className="font-data-mono text-xs text-[#e0e2e6]/90 leading-relaxed">AI Model v4.2.1 deployment completed successfully across all active nodes.</p>
                <div className="flex justify-between items-center mt-3 pt-2 border-t border-outline-variant/10">
                  <span className="font-data-mono text-[9px] text-[#9cf0ff]/60">12 mins ago</span>
                  <span className="text-[9px] font-data-mono text-[#00daf3] uppercase font-bold">NOMINAL</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* 4. Emergency Lockdown Mode */}
      {isLockdown && (
        <div className="fixed inset-0 z-[10000] bg-error/10 backdrop-blur-sm flex flex-col items-center justify-center p-4">
          {/* Pulsing red scanline effect */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(255,0,0,0.1)_50%)] bg-[length:100%_4px] pointer-events-none"></div>
          <div className="absolute top-0 left-0 w-full h-2 bg-error shadow-[0_0_20px_#ff0000] animate-[pulse_1s_infinite]"></div>
          
          <div className="bg-surface-dim/90 p-10 border border-error/50 rounded-lg shadow-[0_0_50px_rgba(255,0,0,0.3)] text-center max-w-md relative z-10 backdrop-blur-xl">
            <span className="material-symbols-outlined text-6xl text-error mb-4 animate-[pulse_1s_infinite]">lock</span>
            <h1 className="font-display-lg text-4xl text-error tracking-tight mb-2 uppercase">Lockdown Active</h1>
            <p className="font-data-mono text-sm text-on-surface-variant mb-8">All facility access points secured. Enter override code to restore normal operations.</p>
            
            <div className="flex gap-2 justify-center mb-6">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-12 h-14 border-b-2 border-error/40 flex items-center justify-center text-xl font-mono text-on-surface/50">•</div>
              ))}
            </div>

            <button 
              onClick={() => {
                setLockdown(false);
                // The toast logic will be called from wherever the override originates, but we can fake it here for simplicity
              }}
              className="px-6 py-3 bg-error text-on-error font-data-mono text-sm uppercase tracking-widest rounded-sm hover:bg-error/80 transition-colors w-full font-bold"
            >
              Simulate Override
            </button>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slide-in-right {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}} />
    </>
  );
}
