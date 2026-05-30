import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useGlobalState } from './GlobalState';

export function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { setLockdown, setNotificationsOpen, openModal, addToast } = useGlobalState();

  const handleProfileClick = () => {
    openModal('Operator Profile', (
      <div className="space-y-4">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded bg-primary-fixed-dim/20 flex items-center justify-center border border-primary-fixed-dim/50">
            <span className="material-symbols-outlined text-4xl text-primary-fixed-dim">shield_person</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-primary-fixed-dim">OPERATOR_01</h3>
            <p className="text-xs text-on-surface-variant">Clearance Level: OMEGA</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button onClick={() => { addToast('Authentication keys rotated', 'success'); }} className="p-3 bg-surface-variant/20 border border-outline-variant/30 rounded hover:bg-surface-variant/50 transition-colors">Rotate Auth Keys</button>
          <button onClick={() => { addToast('Shift report generated', 'info'); }} className="p-3 bg-surface-variant/20 border border-outline-variant/30 rounded hover:bg-surface-variant/50 transition-colors">End Shift</button>
        </div>
      </div>
    ));
  };

  const currentPath = location.pathname;

  return (
    <div className="bg-[#101417] text-[#e0e2e6] min-h-screen overflow-hidden selection:bg-[#00e38a]/30">
      {/* Shared Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(132, 149, 135, 0.3); border-radius: 2px; }
      ` }} />

      {/* TopNavBar */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-surface-dim/80 backdrop-blur-xl border-b border-outline-variant/20 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
        <div className="flex items-center gap-4">
          <span className="font-display-lg text-2xl font-bold tracking-tighter text-primary-fixed-dim drop-shadow-[0_0_10px_rgba(0,227,138,0.4)]">DRISHTI</span>
          <div className="h-6 w-px bg-outline-variant/30 mx-2"></div>
          <div className="flex flex-col">
            <span className="font-data-mono text-[9px] text-primary-fixed-dim/70 tracking-[0.2em] leading-none">COMMAND_CENTER</span>
            <span className="font-data-mono text-[11px] text-on-surface-variant leading-none mt-1 uppercase">
              {currentPath === '/' && 'Mission Dashboard'}
              {currentPath === '/surveillance' && 'Surveillance Matrix'}
              {currentPath === '/alerts' && 'Threat Intelligence'}
              {currentPath === '/analytics' && 'Strategic Analytics'}
              {currentPath === '/command' && 'Tactical Command'}
              {currentPath === '/health' && 'System Vitals'}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-2">
            {[
              { path: '/', label: 'Dashboard' },
              { path: '/surveillance', label: 'Surveillance' },
              { path: '/alerts', label: 'Alerts' },
              { path: '/analytics', label: 'Analytics' },
              { path: '/command', label: 'Command' },
              { path: '/health', label: 'Health' },
            ].map(link => (
              <Link
                key={link.path}
                className={`px-3 py-1.5 rounded-sm text-xs font-medium transition-all ${currentPath === link.path ? 'text-primary-fixed font-bold bg-primary-fixed-dim/10 border-b-2 border-primary-fixed-dim' : 'text-on-surface-variant hover:bg-primary/5 hover:text-primary-fixed-dim'}`}
                to={link.path}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4 ml-6">
            <div className="flex items-center gap-1 group cursor-pointer" onClick={() => addToast('Sensors fully operational', 'success')}>
              <span className="material-symbols-outlined text-primary-fixed-dim group-hover:scale-110 transition-transform text-[20px]">sensors</span>
            </div>
            <div className="flex items-center gap-1 group cursor-pointer" onClick={() => addToast('Security parameters nominal', 'info')}>
              <span className="material-symbols-outlined text-primary-fixed-dim group-hover:scale-110 transition-transform text-[20px]">security</span>
            </div>
            <div className="relative group cursor-pointer" onClick={() => setNotificationsOpen(true)}>
              <span className="material-symbols-outlined text-primary-fixed-dim group-hover:scale-110 transition-transform text-[20px]">notifications</span>
              <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-error rounded-full ring-2 ring-surface-dim animate-pulse"></span>
            </div>
            <div onClick={handleProfileClick} className="flex items-center gap-3 ml-4 bg-surface-variant/20 px-4 py-2 rounded-sm border border-outline-variant/10 cursor-pointer hover:bg-surface-variant/40 transition-colors">
              <div className="w-1.5 h-1.5 bg-primary-fixed-dim rounded-full animate-pulse shadow-[0_0_8px_rgba(0,227,138,0.8)]"></div>
              <span className="font-data-mono text-[11px] text-primary-fixed-dim tracking-wider font-bold">OPERATOR_01</span>
            </div>
          </div>
        </div>
      </header>

      {/* SideNavBar */}
      <aside className="fixed left-0 top-16 bottom-0 z-40 flex flex-col py-6 bg-surface-container-lowest/90 backdrop-blur-2xl border-r border-outline-variant/20 shadow-2xl w-20 hover:w-64 transition-all duration-500 group">
        <div className="flex items-center gap-4 px-6 mb-10 overflow-hidden">
          <div className="w-8 h-8 rounded-sm bg-secondary/10 flex items-center justify-center shrink-0 border border-secondary/20">
            <span className="material-symbols-outlined text-secondary-fixed-dim text-[20px]">monitor_heart</span>
          </div>
          <div className="flex flex-col whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="font-display-lg text-lg font-bold text-primary-fixed leading-none">AI CORE</span>
            <span className="font-data-mono text-[10px] text-secondary-fixed-dim tracking-widest uppercase">Live Link Active</span>
          </div>
        </div>
        <nav className="flex-1 flex flex-col gap-1 px-2">
          {[
            { path: '/', icon: 'dashboard', label: 'Dashboard' },
            { path: '/surveillance', icon: 'videocam', label: 'Surveillance' },
            { path: '/alerts', icon: 'warning', label: 'Alerts' },
            { path: '/analytics', icon: 'insights', label: 'Analytics' },
            { path: '/command', icon: 'terminal', label: 'Command' },
            { path: '/health', icon: 'monitor_heart', label: 'Health' },
          ].map(nav => (
            <button key={nav.path} onClick={() => navigate(nav.path)} className={`flex items-center gap-5 px-4 py-3.5 rounded-sm transition-all ${currentPath === nav.path ? 'bg-secondary/10 text-secondary-fixed-dim border-r-2 border-secondary-fixed-dim shadow-[inset_-10px_0_20px_-10px_rgba(0,218,243,0.2)]' : 'text-on-surface-variant/60 hover:bg-surface-variant/40 hover:text-on-surface'}`}>
              <span className="material-symbols-outlined text-[22px] shrink-0">{nav.icon}</span>
              <span className={`font-label-sm text-sm opacity-0 group-hover:opacity-100 whitespace-nowrap ${currentPath === nav.path ? 'font-bold' : ''}`}>{nav.label}</span>
            </button>
          ))}
        </nav>
        <div className="px-2 mt-auto">
          <button onClick={() => setLockdown(true)} className="w-full flex items-center justify-center gap-4 px-4 py-4 rounded-sm bg-error/10 text-error border border-error/30 hover:bg-error hover:text-on-error transition-all group/btn overflow-hidden relative">
            <span className="material-symbols-outlined text-[20px] shrink-0">lock</span>
            <span className="font-label-sm text-[10px] opacity-0 group-hover:opacity-100 whitespace-nowrap uppercase tracking-[0.2em] font-bold">Emergency Lock</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      {children}
    </div>
  );
}
