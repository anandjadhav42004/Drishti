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
          let bgColor = 'bg-surface-variant/90 border-outline-variant/50 text-on-surface';
          let icon = 'info';
          let iconColor = 'text-primary-fixed-dim';
          if (toast.type === 'error') { bgColor = 'bg-error/20 border-error/50 text-error'; icon = 'warning'; iconColor = 'text-error'; }
          if (toast.type === 'success') { bgColor = 'bg-primary-fixed-dim/20 border-primary-fixed-dim/50 text-primary-fixed-dim'; icon = 'check_circle'; }
          if (toast.type === 'warning') { bgColor = 'bg-secondary-fixed-dim/20 border-secondary-fixed-dim/50 text-secondary-fixed-dim'; icon = 'warning'; iconColor = 'text-secondary-fixed-dim'; }

          return (
            <div key={toast.id} className={`flex items-center gap-3 px-4 py-3 rounded backdrop-blur-xl border shadow-2xl pointer-events-auto min-w-[250px] animate-[slide-in-right_0.3s_ease-out]`}>
              <span className={`material-symbols-outlined ${iconColor}`}>{icon}</span>
              <span className="font-data-mono text-sm tracking-wide flex-1">{toast.message}</span>
              <button onClick={() => removeToast(toast.id)} className="text-on-surface/50 hover:text-on-surface">
                <span className="material-symbols-outlined text-[16px]">close</span>
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
          <div className="fixed inset-0 z-[9800] bg-black/20" onClick={() => setNotificationsOpen(false)} />
          <div className="fixed top-16 right-0 bottom-0 w-80 bg-surface-container-lowest/95 backdrop-blur-2xl border-l border-outline-variant/20 shadow-2xl z-[9850] flex flex-col animate-[slide-in-right_0.3s_ease-out]">
            <div className="p-4 border-b border-outline-variant/20 flex justify-between items-center">
              <h3 className="font-display-lg text-lg text-on-surface tracking-tight">System Alerts</h3>
              <button onClick={() => setNotificationsOpen(false)} className="text-on-surface-variant hover:text-on-surface">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 custom-scrollbar">
              <div className="p-3 bg-error/10 border border-error/20 rounded-sm">
                <div className="flex items-center gap-2 mb-1 text-error">
                  <span className="material-symbols-outlined text-[16px]">warning</span>
                  <span className="font-data-mono text-[10px] font-bold tracking-wider uppercase">Critical Alert</span>
                </div>
                <p className="font-data-mono text-xs text-on-surface/80">Perimeter breach detected at Zone Charlie. Requires immediate attention.</p>
                <span className="font-data-mono text-[9px] text-on-surface-variant/60 block mt-2">Just now</span>
              </div>
              <div className="p-3 bg-surface-variant/20 border border-outline-variant/10 rounded-sm">
                <div className="flex items-center gap-2 mb-1 text-secondary-fixed-dim">
                  <span className="material-symbols-outlined text-[16px]">info</span>
                  <span className="font-data-mono text-[10px] font-bold tracking-wider uppercase">System Update</span>
                </div>
                <p className="font-data-mono text-xs text-on-surface/80">AI Model v4.2.1 deployment completed successfully.</p>
                <span className="font-data-mono text-[9px] text-on-surface-variant/60 block mt-2">12 mins ago</span>
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
