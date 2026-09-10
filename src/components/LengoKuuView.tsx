import React, { useState } from 'react';
import { 
  Target, ShieldCheck, MapPin, Truck, BookOpen, 
  Users, Lock, CheckCircle2, ChevronRight, Award, KeyRound 
} from 'lucide-react';
import { GroupConfig, Member, ProjectTracker } from '../types';
import { DEFAULT_PROJECTS } from '../data/mockData';

interface LengoKuuViewProps {
  config: GroupConfig;
  currentUser: Member;
  members: Member[];
  onUpdateConfig?: (newConfig: GroupConfig) => void;
}

export const LengoKuuView: React.FC<LengoKuuViewProps> = ({
  config,
  currentUser,
  members,
  onUpdateConfig
}) => {
  const [projects, setProjects] = useState<ProjectTracker[]>(DEFAULT_PROJECTS);
  const [activeTab, setActiveTab] = useState<'projects' | 'constitution' | 'rbac'>('projects');

  const rbacRoles = [
    {
      role: 'Chairman',
      official: members.find(m => m.role === 'Chairman')?.name || 'Ezekiel Kiprop',
      icon: Award,
      color: 'amber',
      responsibilities: [
        'Final authority on Project Simba & Project Farasi capital allocations.',
        'Rules interpretation and physical assembly control.',
        'Signs official meeting minutes and MGR rotation triggers.'
      ]
    },
    {
      role: 'Treasurer',
      official: members.find(m => m.role === 'Treasurer')?.name || 'Amina Omondi',
      icon: Target,
      color: 'emerald',
      responsibilities: [
        'Oversees the 5 sub-wallet ledgers (General, Mkebe, SAYE, Okolea, Penalty).',
        'Validates cash & Mpesa transactions.',
        'Executes cross-app webhook synchronization with MGR rotation engine.'
      ]
    },
    {
      role: 'Secretary',
      official: members.find(m => m.role === 'Secretary')?.name || 'David Ndwiga',
      icon: BookOpen,
      color: 'teal',
      responsibilities: [
        'Maintains official attendance records & Siku ya Chama minutes.',
        'Issues formal notices and broadcast announcements.',
        'Logs visitor introductions and agenda voting tallies.'
      ]
    },
    {
      role: 'Custodian',
      official: members.find(m => m.role === 'Custodian' || m.role === 'Disciplinarian')?.name || 'Charles Mwangi',
      icon: KeyRound,
      color: 'indigo',
      responsibilities: [
        'Holds physical lockbox keys for Mkebe locked releases.',
        'Safeguards land title deeds & Project Simba property documents.',
        'Oversees physical collateral verification.'
      ]
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* LENGO KUU HEADER CARD */}
      <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-6 text-white shadow-xl border border-emerald-500/20 relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-full text-xs font-mono font-bold">
              <Target size={14} />
              <span>LENGO KUU (Primary Sacco Goal)</span>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-bold">
              Group Vision Alignment 100%
            </span>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white font-mono">
              {config.lengoKuu}
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl font-medium leading-relaxed italic mt-2">
              "{config.vision}"
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800/80 flex flex-wrap gap-4 text-xs font-mono">
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-4 py-2 rounded-xl font-bold transition ${
                activeTab === 'projects'
                  ? 'bg-emerald-500 text-slate-950 font-black shadow-md glow-emerald'
                  : 'bg-slate-800/80 text-slate-300 hover:text-white'
              }`}
            >
              🚀 Project Simba & Farasi Trackers
            </button>
            <button
              onClick={() => setActiveTab('constitution')}
              className={`px-4 py-2 rounded-xl font-bold transition ${
                activeTab === 'constitution'
                  ? 'bg-emerald-500 text-slate-950 font-black shadow-md glow-emerald'
                  : 'bg-slate-800/80 text-slate-300 hover:text-white'
              }`}
            >
              📜 Group Constitution
            </button>
            <button
              onClick={() => setActiveTab('rbac')}
              className={`px-4 py-2 rounded-xl font-bold transition ${
                activeTab === 'rbac'
                  ? 'bg-emerald-500 text-slate-950 font-black shadow-md glow-emerald'
                  : 'bg-slate-800/80 text-slate-300 hover:text-white'
              }`}
            >
              🛡️ Delegated Role Governance (RBAC)
            </button>
          </div>
        </div>
      </div>

      {/* TAB CONTENT: PROJECTS */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {projects.map(p => {
              const isSimba = p.codeName === 'Project Simba';
              const Icon = isSimba ? MapPin : Truck;
              const pct = Math.round((p.currentAmount / p.targetAmount) * 100);

              return (
                <div 
                  key={p.id}
                  className="bg-slate-900/90 border border-slate-800/80 rounded-3xl p-6 text-white space-y-5 shadow-xl relative overflow-hidden group hover:border-emerald-500/50 transition-all duration-300"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-2xl ${isSimba ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' : 'bg-teal-500/10 text-teal-400 border border-teal-500/30'}`}>
                        <Icon size={24} />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                          {p.category}
                        </span>
                        <h3 className="text-xl font-black text-white">{p.codeName}</h3>
                        <p className="text-xs text-slate-300 font-medium">{p.name}</p>
                      </div>
                    </div>

                    <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full border ${
                      pct >= 70 
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    }`}>
                      {pct}% Funded
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed font-medium">
                    {p.description}
                  </p>

                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-400 font-bold">Capital Raised</span>
                      <span className="text-white font-bold">
                        KES {p.currentAmount.toLocaleString()} / <span className="text-slate-400">KES {p.targetAmount.toLocaleString()}</span>
                      </span>
                    </div>

                    <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          isSimba ? 'bg-gradient-to-r from-amber-500 to-yellow-400' : 'bg-gradient-to-r from-teal-500 to-emerald-400'
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex justify-between items-center text-xs font-mono text-slate-400">
                    <span>Lead: <strong className="text-white">{p.leadOfficial}</strong></span>
                    <span>Target Date: <strong className="text-emerald-400">{p.deadline}</strong></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB CONTENT: CONSTITUTION */}
      {activeTab === 'constitution' && (
        <div className="bg-slate-900/90 border border-slate-800/80 rounded-3xl p-6 text-white space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-base pb-3 border-b border-slate-800">
            <BookOpen size={20} />
            <h3>Official Sacco Constitution & By-Laws</h3>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed max-h-[500px] overflow-y-auto">
            {config.constitution}
          </div>
        </div>
      )}

      {/* TAB CONTENT: RBAC */}
      {activeTab === 'rbac' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rbacRoles.map(r => {
            const Icon = r.icon;
            return (
              <div 
                key={r.role}
                className="bg-slate-900/90 border border-slate-800/80 rounded-3xl p-6 text-white space-y-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-2xl">
                    <Icon size={22} />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-white">{r.role}</h4>
                    <p className="text-xs text-slate-400 font-mono font-bold">Official: {r.official}</p>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                    Delegated Duties & Approvals
                  </span>
                  <ul className="space-y-2">
                    {r.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
