import React from 'react';
import { 
  Flame, Award, Activity, Video, Cloud, ShieldCheck, 
  Menu, ChevronRight, Layers, Sparkles
} from 'lucide-react';
import { Member, ChamaTenant, GroupConfig } from '../types';

interface GamifiedHeaderProps {
  currentUser: Member;
  config: GroupConfig;
  tenants: ChamaTenant[];
  currentTenantId: string;
  onSelectTenant: (id: string) => void;
  onOpenSidebar: () => void;
  onNavigate: (view: string) => void;
  activeMeetingLive?: boolean;
}

export const GamifiedHeader: React.FC<GamifiedHeaderProps> = ({
  currentUser,
  config,
  tenants,
  currentTenantId,
  onSelectTenant,
  onOpenSidebar,
  onNavigate,
  activeMeetingLive = true
}) => {
  const healthScore = config.healthIndexScore || 94;
  const streakMonths = currentUser.contributionStreakMonths || 12;
  const tier = currentUser.tier || 'Gold Contributor';

  const getTierColor = (t: string) => {
    switch (t) {
      case 'Platinum Trustee': return 'from-amber-400 via-yellow-300 to-amber-500 text-amber-950 shadow-amber-500/20';
      case 'Gold Contributor': return 'from-yellow-400 to-amber-600 text-slate-900 shadow-yellow-500/20';
      case 'Silver Member': return 'from-slate-300 to-slate-400 text-slate-900 shadow-slate-400/20';
      default: return 'from-emerald-400 to-teal-600 text-white shadow-emerald-500/20';
    }
  };

  return (
    <header className="bg-slate-900 text-white sticky top-0 z-30 shadow-lg border-b border-slate-800/80 backdrop-blur-md bg-slate-900/95 px-4 sm:px-6 py-3.5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      
      {/* LEFT SECTION: Sidebar Toggle & Group Identity */}
      <div className="flex items-center justify-between lg:justify-start gap-4">
        <div className="flex items-center gap-3">
          <button 
            onClick={onOpenSidebar}
            className="lg:hidden p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition cursor-pointer"
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-emerald-400 p-0.5 shadow-md glow-emerald flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center font-black text-emerald-400 text-base">
                {config.name.charAt(0)}
              </div>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="font-black text-sm tracking-tight text-white uppercase truncate max-w-[160px] sm:max-w-xs">
                  {config.name}
                </h1>
                <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded-full font-mono font-bold uppercase tracking-wider shrink-0">
                  MGR Sync Active
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium font-mono leading-none mt-0.5 flex items-center gap-1">
                <span>{currentTenantId === 'all' ? 'Consolidated Sector Portal' : 'Group Savings Hub'}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Live Meza Gateway Shortcut */}
        <button
          onClick={() => onNavigate('SikuYaChama')}
          className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-black text-xs shadow-md glow-emerald animate-pulse cursor-pointer"
        >
          <Video size={13} className="fill-slate-950" />
          <span>Meza</span>
        </button>
      </div>

      {/* CENTER & RIGHT SECTION: Gamified Badges, Health Index, Streaks & Meza Gateway */}
      <div className="flex flex-wrap items-center justify-between lg:justify-end gap-2 sm:gap-4 pt-2 lg:pt-0 border-t border-slate-800/60 lg:border-t-0">
        
        {/* 1. Group Health Index Meter */}
        <div className="flex items-center gap-2.5 px-3 py-1.5 bg-slate-950/80 rounded-2xl border border-slate-800/80">
          <div className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded-xl">
            <Activity size={14} className="animate-pulse" />
          </div>
          <div>
            <div className="flex items-center justify-between text-[10px] gap-2 font-mono">
              <span className="text-slate-400 font-bold uppercase">Health Index</span>
              <span className="text-emerald-400 font-black">{healthScore}%</span>
            </div>
            <div className="w-20 sm:w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden mt-1">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-300 rounded-full transition-all duration-500" 
                style={{ width: `${healthScore}%` }} 
              />
            </div>
          </div>
        </div>

        {/* 2. Contribution Streak Counter */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-amber-950/40 to-orange-950/30 rounded-2xl border border-amber-500/20 text-amber-300 shadow-xs">
          <div className="p-1 bg-amber-500/20 rounded-lg text-amber-400 animate-bounce">
            <Flame size={14} />
          </div>
          <div>
            <span className="block text-[9px] text-amber-400/80 font-mono font-bold uppercase leading-none">Streak</span>
            <span className="text-xs font-black font-mono tracking-tight text-amber-300">
              🔥 {streakMonths} Mo
            </span>
          </div>
        </div>

        {/* 3. Member Tier / Badge Chip */}
        <div className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-gradient-to-r ${getTierColor(tier)} shadow-md font-bold text-xs`}>
          <Award size={14} />
          <span className="truncate max-w-[110px]">{tier}</span>
        </div>

        {/* 4. Interactive Live "Meza" Gateway Link */}
        <button
          onClick={() => onNavigate('SikuYaChama')}
          className="hidden lg:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-xs rounded-2xl shadow-lg glow-emerald transition-all duration-200 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-900 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-slate-950"></span>
          </span>
          <Video size={15} />
          <span>Siku ya Chama ("Meza")</span>
          <ChevronRight size={14} className="opacity-80" />
        </button>

        {/* Super Admin Tenant Selector dropdown */}
        {currentUser.role === 'Super Admin' && (
          <div className="hidden xl:flex items-center gap-1 bg-slate-800/80 border border-slate-700/80 rounded-2xl px-2.5 py-1">
            <Layers size={12} className="text-slate-400" />
            <select
              value={currentTenantId}
              onChange={e => onSelectTenant(e.target.value)}
              className="bg-transparent text-[11px] font-bold text-slate-200 focus:outline-none cursor-pointer pr-1"
            >
              <option value="all" className="bg-slate-900 text-white">🌐 All Chamas</option>
              {tenants.map(t => (
                <option key={t.id} value={t.id} className="bg-slate-900 text-white">🏢 {t.name}</option>
              ))}
            </select>
          </div>
        )}

      </div>
    </header>
  );
};
