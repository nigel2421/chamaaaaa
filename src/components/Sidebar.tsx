import React from 'react';
import { 
  Users, CreditCard, TrendingUp, Clock, BarChart3, 
  Mail, Vote, Shield, LayoutDashboard, UserCheck, RefreshCw, Landmark, X,
  Video, Wallet, Target, Sparkles
} from 'lucide-react';
import { Member, ChamaTenant } from '../types';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  currentUser: Member;
  members: Member[];
  onSelectUser: (id: string) => void;
  tenants: ChamaTenant[];
  currentTenantId: string;
  onSelectTenant: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  currentView, onNavigate, currentUser, members, onSelectUser,
  tenants, currentTenantId, onSelectTenant, isOpen, onClose
}) => {
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, id: 'Dashboard' },
    { name: 'Siku ya Chama ("Meza")', icon: Video, id: 'SikuYaChama', badge: 'LIVE' },
    { name: 'Sub-Wallet Ledger', icon: Wallet, id: 'MultiBucket', badge: '5 Pools' },
    { name: 'Governance (Lengo Kuu)', icon: Target, id: 'LengoKuu', badge: 'Simba/Farasi' },
    { name: 'Membership Directory', icon: Users, id: 'Membership' },
    { name: 'Contributions', icon: CreditCard, id: 'Contributions' },
    { name: 'Loans Credit', icon: TrendingUp, id: 'Loans' },
    { name: 'Agendas & Voting', icon: Landmark, id: 'Agendas' },
    { name: 'Attendance Registry', icon: Clock, id: 'Attendance' },
    { name: 'Expenditures & Assets', icon: BarChart3, id: 'Expenditures' },
    { name: 'Chatroom', icon: Mail, id: 'Communication' },
    { name: 'Elections', icon: Vote, id: 'Elections' },
    { name: 'Admin Command', icon: Shield, id: 'Administrator' }
  ];

  const activeTenant = tenants.find(t => t.id === currentTenantId);
  const titleText = activeTenant ? activeTenant.name : "All Chamas";
  const subtitleText = activeTenant ? `${activeTenant.code} Sacco Hub` : "Consolidated Hub";
  const firstLetter = titleText.charAt(0);

  const handleNavigation = (id: string) => {
    onNavigate(id);
    onClose();
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar Panel */}
      <aside 
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-slate-950 text-slate-100 flex flex-col justify-between border-r border-slate-800/80 z-50 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } shrink-0`}
      >
        <div className="flex flex-col shrink-0">
          {/* Brand Header */}
          <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-md flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-black text-emerald-400 text-sm">
                  {firstLetter}
                </div>
              </div>
              <div className="min-w-0">
                <span className="block font-black text-xs tracking-wider uppercase text-white truncate max-w-[120px]" title={titleText}>
                  {titleText}
                </span>
                <span className="block text-[9px] text-slate-400 font-bold font-mono">
                  {subtitleText}
                </span>
              </div>
            </div>

            <button 
              onClick={onClose}
              className="lg:hidden p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          {/* Super Admin Tenant Selector */}
          {currentUser.role === 'Super Admin' && (
            <div className="px-5 py-2.5 bg-slate-900/60 border-b border-slate-800/80 space-y-1">
              <span className="block text-[8px] font-bold text-slate-500 uppercase tracking-wider font-mono">
                Active Organization
              </span>
              <select
                value={currentTenantId}
                onChange={e => onSelectTenant(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-2 py-1 text-[10px] font-bold focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="all">🌐 All Organizations (Consolidated)</option>
                {tenants.map(t => (
                  <option key={t.id} value={t.id}>🏢 {t.name} ({t.code})</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {menuItems.map(item => {
            const IconComponent = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition duration-200 cursor-pointer ${
                  isActive 
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 shadow-md glow-emerald font-black' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-900/80'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <IconComponent size={16} className={isActive ? 'text-slate-950' : 'text-slate-400'} />
                  <span className="truncate">{item.name}</span>
                </div>
                {item.badge && (
                  <span className={`text-[8px] font-mono px-1.5 py-0.2 rounded-full font-bold uppercase shrink-0 ${
                    isActive 
                      ? 'bg-slate-950 text-emerald-400' 
                      : item.badge === 'LIVE' 
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 animate-pulse'
                        : 'bg-slate-800 text-slate-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Persona Switcher Deck */}
        <div className="p-4 border-t border-slate-800/80 space-y-2 bg-slate-900/40 shrink-0">
          <div className="flex items-center justify-between">
            <span className="block text-[8px] font-bold text-slate-400 uppercase font-mono flex items-center gap-1">
              <RefreshCw size={10} />
              <span>Persona Switcher</span>
            </span>
            <span className="text-[9px] font-mono text-emerald-400 font-bold">{currentUser.tier}</span>
          </div>

          <div className="space-y-1 max-h-28 overflow-y-auto pr-1">
            {members.slice(0, 6).map(m => {
              const isMe = m.id === currentUser.id;
              return (
                <button
                  key={m.id}
                  onClick={() => {
                    onSelectUser(m.id);
                    onClose();
                  }}
                  className={`w-full text-left px-2.5 py-1 rounded-lg text-[10px] font-medium transition flex items-center justify-between ${
                    isMe 
                      ? 'bg-slate-800 text-emerald-400 font-bold border border-emerald-500/30' 
                      : 'text-slate-400 hover:bg-slate-800/30 hover:text-slate-200'
                  }`}
                >
                  <span className="truncate font-bold max-w-[120px]">{m.name}</span>
                  <span className="text-[8px] text-slate-500 font-mono uppercase">{m.role}</span>
                </button>
              );
            })}
          </div>
        </div>
      </aside>
    </>
  );
};
