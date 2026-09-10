import React from 'react';
import { 
  LayoutDashboard, Video, Wallet, Target, Menu 
} from 'lucide-react';

interface MobileBottomNavProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onOpenSidebar: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentView,
  onNavigate,
  onOpenSidebar
}) => {
  const navItems = [
    { id: 'Dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'SikuYaChama', label: 'Meza Live', icon: Video, isLive: true },
    { id: 'MultiBucket', label: 'Wallets', icon: Wallet },
    { id: 'LengoKuu', label: 'Governance', icon: Target },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800/80 px-2 py-1.5 flex items-center justify-around text-slate-400 shadow-2xl safe-area-pb">
      {navItems.map(item => {
        const Icon = item.icon;
        const isActive = currentView === item.id;

        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition cursor-pointer relative ${
              isActive ? 'text-emerald-400 font-extrabold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="relative">
              <Icon size={18} className={isActive ? 'text-emerald-400' : 'text-slate-400'} />
              {item.isLive && (
                <span className="absolute -top-1 -right-1.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              )}
            </div>
            <span className="text-[10px] font-mono tracking-tight mt-1 font-bold">
              {item.label}
            </span>
            {isActive && (
              <span className="w-4 h-0.5 bg-emerald-400 rounded-full mt-0.5 animate-pulse" />
            )}
          </button>
        );
      })}

      {/* Menu Drawer Toggle */}
      <button
        onClick={onOpenSidebar}
        className="flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-slate-400 hover:text-slate-200 transition cursor-pointer"
      >
        <Menu size={18} />
        <span className="text-[10px] font-mono tracking-tight mt-1 font-bold">Menu</span>
      </button>
    </div>
  );
};
