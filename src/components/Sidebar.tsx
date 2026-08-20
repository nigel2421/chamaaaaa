import React from 'react';
import { 
  Users, CreditCard, TrendingUp, Clock, BarChart3, 
  Mail, Vote, Shield, LayoutDashboard, UserCheck, RefreshCw, Landmark, X
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
    { name: 'Membership', icon: Users, id: 'Membership' },
    { name: 'Contributions', icon: CreditCard, id: 'Contributions' },
    { name: 'Loans Credit', icon: TrendingUp, id: 'Loans' },
    { name: 'Agendas', icon: Landmark, id: 'Agendas' },
    { name: 'Attendance', icon: Clock, id: 'Attendance' },
    { name: 'Expenditures', icon: BarChart3, id: 'Expenditures' },
    { name: 'Chatroom', icon: Mail, id: 'Communication' },
    { name: 'Elections', icon: Vote, id: 'Elections' },
    { name: 'Admin Sector', icon: Shield, id: 'Administrator' }
  ];

  const activeTenant = tenants.find(t => t.id === currentTenantId);
  const titleText = activeTenant ? activeTenant.name : "All Chamas";
  const subtitleText = activeTenant ? `${activeTenant.code} Sacco Hub` : "Consolidated Hub";
  const firstLetter = titleText.charAt(0);

  const handleNavigation = (id: string) => {
    onNavigate(id);
    onClose(); // Automatically close sidebar on mobile navigation
  };

  return (
    <>
      {/* Mobile Sidebar Overlay Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40 lg:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar Navigation Panel */}
      <aside 
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-slate-900 text-slate-100 flex flex-col justify-between border-r border-slate-800 z-50 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } shrink-0`}
      >
        <div className="flex flex-col shrink-0">
          {/* Brand Header & Mobile Close Button */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center font-black text-slate-900 text-lg">
                {firstLetter}
              </div>
              <div className="min-w-0">
                <span className="block font-black text-sm tracking-wider uppercase text-white truncate max-w-[130px]" title={titleText}>
                  {titleText}
                </span>
                <span className="block text-[10px] text-slate-400 font-bold font-mono">
                  {subtitleText}
                </span>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button 
              onClick={onClose}
              className="lg:hidden p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition cursor-pointer"
              id="close-sidebar-btn"
            >
              <X size={18} />
            </button>
          </div>

          {/* Tenant/Chama Switcher for Super Admin */}
          {currentUser.role === 'Super Admin' && (
            <div className="px-6 py-3 bg-slate-950/60 border-b border-slate-800 space-y-1.5">
              <span className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                Active Organization
              </span>
              <select
                value={currentTenantId}
                onChange={e => onSelectTenant(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-2 py-1.5 text-[11px] font-bold focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="all">🌐 All Organizations (Consolidated)</option>
                {tenants.map(t => (
                  <option key={t.id} value={t.id}>🏢 {t.name} ({t.code})</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Navigation menu items */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map(item => {
            const IconComponent = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                  isActive 
                    ? 'bg-emerald-600 text-white shadow-sm' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <IconComponent size={16} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>

        {/* Interactive Switch Testing Persona Block */}
        <div className="p-4 border-t border-slate-800 space-y-3 bg-slate-950/40 shrink-0">
          <div>
            <span className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
              <RefreshCw size={10} />
              <span>Interactive Persona Switcher</span>
            </span>
            <p className="text-[10px] text-slate-400 mt-1">Simulate Member vs Treasurer/Admin perspectives.</p>
          </div>

          <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
            {members.map(m => {
              const mTenant = tenants.find(t => t.id === m.tenantId);
              const isMe = m.id === currentUser.id;
              return (
                <button
                  key={m.id}
                  onClick={() => {
                    onSelectUser(m.id);
                    onClose();
                  }}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-[11px] font-medium transition flex items-center justify-between ${
                    isMe 
                      ? 'bg-slate-800 text-emerald-400 font-bold border border-emerald-500/30' 
                      : 'text-slate-400 hover:bg-slate-800/20 hover:text-slate-200'
                  }`}
                >
                  <div className="truncate pr-1 flex-1">
                    <div className="flex items-center justify-between gap-1.5">
                      <span className="font-bold truncate max-w-[110px]">{m.name}</span>
                      <span className="text-[8px] bg-slate-950 text-slate-400 px-1 py-0.2 rounded font-mono uppercase shrink-0">
                        {mTenant ? mTenant.code : 'SYS'}
                      </span>
                    </div>
                    <span className="block text-[9px] text-slate-500 leading-none mt-0.5">{m.role}</span>
                  </div>
                  {isMe && <UserCheck size={12} className="shrink-0 text-emerald-400 ml-1" />}
                </button>
              );
            })}
          </div>
        </div>
      </aside>
    </>
  );
};
