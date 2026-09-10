import React, { useState } from 'react';
import { 
  Video, Users, ShieldAlert, HeartHandshake, UserPlus, 
  Vote, CheckSquare, Plus, DollarSign, FileCheck, CheckCircle2,
  Clock, AlertCircle, Lock, Play, Pause, Layers
} from 'lucide-react';
import { 
  Member, AttendanceMeeting, MeetingModuleKey, WelfareAppeal, 
  VisitorIntro, ProjectFundingVote, Penalty, Contribution 
} from '../types';
import { 
  DEFAULT_WELFARE_APPEALS, DEFAULT_VISITOR_INTROS, DEFAULT_PROJECT_VOTES 
} from '../data/mockData';
import { motion, AnimatePresence } from 'motion/react';

interface SikuYaChamaHubProps {
  currentUser: Member;
  members: Member[];
  meetings: AttendanceMeeting[];
  penalties: Penalty[];
  contributions: Contribution[];
  onCheckIn: (meetingId: string, memberId: string, status: 'Present' | 'Absent' | 'Absent With Apology', reason?: string) => void;
  onPayPenalty: (id: string) => void;
  onAddPenalty: (newPen: Omit<Penalty, 'id' | 'date' | 'status' | 'tenantId'>) => void;
  onAddContribution: (newCon: Omit<Contribution, 'id' | 'date' | 'status' | 'approvedBy' | 'tenantId'>) => void;
  onAdjournMeeting: (meetingId: string) => void;
}

export const SikuYaChamaHub: React.FC<SikuYaChamaHubProps> = ({
  currentUser,
  members,
  meetings,
  penalties,
  contributions,
  onCheckIn,
  onPayPenalty,
  onAddPenalty,
  onAddContribution,
  onAdjournMeeting
}) => {
  const activeMeeting = meetings.find(m => !m.adjourned) || meetings[meetings.length - 1];

  // Dynamic modules toggle state
  const [activeModules, setActiveModules] = useState<MeetingModuleKey[]>(
    activeMeeting?.activeModules || ['welfare_appeals', 'visitor_intros', 'instant_penalties', 'project_votes', 'cash_reconciliation']
  );

  // Welfare Appeals local state
  const [appeals, setAppeals] = useState<WelfareAppeal[]>(DEFAULT_WELFARE_APPEALS);
  const [newAppealReason, setNewAppealReason] = useState('');
  const [newAppealAmount, setNewAppealAmount] = useState('');

  // Visitors local state
  const [visitors, setVisitors] = useState<VisitorIntro[]>(DEFAULT_VISITOR_INTROS);
  const [newGuestName, setNewGuestName] = useState('');
  const [newGuestOrg, setNewGuestOrg] = useState('');
  const [newGuestPurpose, setNewGuestPurpose] = useState('');

  // Project Votes local state
  const [votes, setVotes] = useState<ProjectFundingVote[]>(DEFAULT_PROJECT_VOTES);

  // Cash Reconciliation state
  const [reconciled, setReconciled] = useState(activeMeeting?.cashReconciled || false);
  const [minutesSigned, setMinutesSigned] = useState({
    chairman: !!activeMeeting?.minutesSignedBy?.chairman,
    secretary: !!activeMeeting?.minutesSignedBy?.secretary,
    treasurer: !!activeMeeting?.minutesSignedBy?.treasurer
  });

  // Toggle dynamic module
  const toggleModule = (moduleKey: MeetingModuleKey) => {
    if (activeModules.includes(moduleKey)) {
      setActiveModules(activeModules.filter(m => m !== moduleKey));
    } else {
      setActiveModules([...activeModules, moduleKey]);
    }
  };

  // Add Welfare Appeal
  const handleAddAppeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAppealReason.trim() || !newAppealAmount) return;
    const appeal: WelfareAppeal = {
      id: `wel-${Date.now()}`,
      tenantId: currentUser.tenantId,
      memberId: currentUser.id,
      memberName: currentUser.name,
      reason: newAppealReason,
      targetAmount: parseFloat(newAppealAmount),
      raisedAmount: 0,
      urgency: 'High',
      date: new Date().toISOString().split('T')[0],
      status: 'Open'
    };
    setAppeals([appeal, ...appeals]);
    setNewAppealReason('');
    setNewAppealAmount('');
  };

  // Add Visitor Intro
  const handleAddVisitor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuestName.trim()) return;
    const visitor: VisitorIntro = {
      id: `vis-${Date.now()}`,
      tenantId: currentUser.tenantId,
      guestName: newGuestName,
      organization: newGuestOrg || 'Independent Guest',
      introducedBy: currentUser.name,
      purpose: newGuestPurpose || 'Observer / Sacco Partner Presentation',
      date: new Date().toISOString().split('T')[0]
    };
    setVisitors([visitor, ...visitors]);
    setNewGuestName('');
    setNewGuestOrg('');
    setNewGuestPurpose('');
  };

  // Vote on Project Poll
  const handleVoteProject = (voteId: string, choice: 'for' | 'against') => {
    setVotes(votes.map(v => {
      if (v.id !== voteId) return v;
      if (v.votedMembers.includes(currentUser.id)) return v; // standard 1 vote limit
      return {
        ...v,
        votesFor: choice === 'for' ? v.votesFor + 1 : v.votesFor,
        votesAgainst: choice === 'against' ? v.votesAgainst + 1 : v.votesAgainst,
        votedMembers: [...v.votedMembers, currentUser.id]
      };
    }));
  };

  // Sign minutes delegation
  const handleSignMinutes = (role: 'chairman' | 'secretary' | 'treasurer') => {
    setMinutesSigned(prev => ({ ...prev, [role]: true }));
  };

  const isCommittee = ['Super Admin', 'Chairman', 'Secretary', 'Treasurer'].includes(currentUser.role);

  return (
    <div className="space-y-6">
      
      {/* SIKU YA CHAMA LIVE ASSEMBLY HERO CARD */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 rounded-3xl p-6 text-white shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-0.5 rounded-full">
                Siku ya Chama Live ("Meza" Active Session)
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {activeMeeting?.title || "Monthly Siku ya Chama Assembly"}
            </h2>
            <p className="text-xs text-slate-400 max-w-xl font-medium leading-relaxed">
              Live physical & digital meeting room ("Meza"). Dynamic module loader allows committee to activate ad-hoc welfare appeals, guest introductions, instant penalty collections, and project votes on the fly.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <div className="bg-slate-800/80 px-4 py-3 rounded-2xl border border-slate-700 text-center sm:text-right font-mono text-xs">
              <span className="block text-[10px] text-slate-400 uppercase font-bold">Assembly Date</span>
              <span className="font-bold text-white text-sm">{activeMeeting?.meetingDate || new Date().toISOString().split('T')[0]}</span>
            </div>

            {isCommittee && !activeMeeting?.adjourned && (
              <button
                onClick={() => activeMeeting && onAdjournMeeting(activeMeeting.id)}
                className="px-5 py-3 bg-rose-600 hover:bg-rose-700 text-white font-black text-xs rounded-2xl shadow-md transition cursor-pointer flex items-center justify-center gap-2"
              >
                <Pause size={15} />
                <span>Adjourn Session</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* DYNAMIC MODULE CONTROLLER & TOGGLE DECK (COMMITTEE CONTROL) */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded-3xl p-6 text-white space-y-4 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <Layers size={18} />
            <h3>Committee Dynamic Module Deck (Siku ya Chama Loader)</h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400 font-bold">
            {activeModules.length} Modules Active
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { key: 'welfare_appeals' as MeetingModuleKey, name: 'Welfare Appeals', icon: HeartHandshake, color: 'rose' },
            { key: 'visitor_intros' as MeetingModuleKey, name: 'Visitor Registry', icon: UserPlus, color: 'teal' },
            { key: 'instant_penalties' as MeetingModuleKey, name: 'Instant Penalties', icon: ShieldAlert, color: 'amber' },
            { key: 'project_votes' as MeetingModuleKey, name: 'Project Funding Polls', icon: Vote, color: 'indigo' },
            { key: 'cash_reconciliation' as MeetingModuleKey, name: 'Cash Reconciliation', icon: FileCheck, color: 'emerald' }
          ].map(m => {
            const Icon = m.icon;
            const isActive = activeModules.includes(m.key);

            return (
              <button
                key={m.key}
                onClick={() => toggleModule(m.key)}
                className={`p-3 rounded-2xl border text-left transition flex items-center justify-between cursor-pointer ${
                  isActive 
                    ? 'bg-slate-800 border-emerald-500 text-white shadow-md' 
                    : 'bg-slate-950/60 border-slate-800/80 text-slate-500 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon size={16} className={isActive ? 'text-emerald-400' : 'text-slate-500'} />
                  <span className="text-xs font-bold truncate max-w-[100px]">{m.name}</span>
                </div>
                <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-emerald-400 animate-pulse' : 'bg-slate-700'}`} />
              </button>
            );
          })}
        </div>
      </div>

      {/* ACTIVE MODULE 1: AD-HOC WELFARE APPEALS */}
      {activeModules.includes('welfare_appeals') && (
        <div className="bg-slate-900/90 border border-slate-800/80 rounded-3xl p-6 text-white space-y-5 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5 text-rose-400 font-extrabold text-base">
              <HeartHandshake size={20} />
              <h3>Ad-Hoc Member Welfare Appeals ("Okolea Solidarity")</h3>
            </div>
            <span className="text-xs font-mono font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30 px-3 py-1 rounded-full">
              Live Appeal Drive
            </span>
          </div>

          {/* New Appeal Form */}
          <form onSubmit={handleAddAppeal} className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <input
              type="text"
              placeholder="Describe welfare emergency appeal..."
              value={newAppealReason}
              onChange={e => setNewAppealReason(e.target.value)}
              className="bg-slate-900 border border-slate-800 text-xs px-3 py-2 rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-rose-500 md:col-span-1"
              required
            />
            <input
              type="number"
              placeholder="Target Appeal Amount (KES)"
              value={newAppealAmount}
              onChange={e => setNewAppealAmount(e.target.value)}
              className="bg-slate-900 border border-slate-800 text-xs font-mono px-3 py-2 rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-rose-500"
              required
            />
            <button
              type="submit"
              className="bg-rose-600 hover:bg-rose-500 text-white font-black text-xs rounded-xl py-2 transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Plus size={15} />
              <span>Launch Welfare Drive</span>
            </button>
          </form>

          {/* Appeals List */}
          <div className="space-y-3">
            {appeals.map(a => {
              const pct = Math.round((a.raisedAmount / a.targetAmount) * 100);

              return (
                <div key={a.id} className="p-4 bg-slate-950 rounded-2xl border border-slate-800/80 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-rose-400 uppercase tracking-wider block">
                        Applicant: {a.memberName}
                      </span>
                      <h4 className="text-sm font-bold text-white">{a.reason}</h4>
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                      KES {a.raisedAmount.toLocaleString()} / KES {a.targetAmount.toLocaleString()} ({pct}%)
                    </span>
                  </div>

                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-rose-500 to-amber-400 transition-all duration-300" style={{ width: `${pct}%` }} />
                  </div>

                  <div className="flex justify-between items-center pt-2 text-xs font-mono">
                    <span className="text-slate-400">Status: <strong className="text-amber-400">{a.status}</strong></span>
                    <button
                      onClick={() => {
                        onAddContribution({
                          memberId: currentUser.id,
                          memberName: currentUser.name,
                          type: 'Special',
                          subWallet: 'Okolea (Emergency)',
                          amount: 1000,
                          purpose: `Soladarity contribution for ${a.memberName}`,
                          paymentMethod: 'Mpesa'
                        });
                        setAppeals(appeals.map(item => item.id === a.id ? { ...item, raisedAmount: item.raisedAmount + 1000 } : item));
                      }}
                      className="px-3 py-1 bg-emerald-500 text-slate-950 font-black rounded-lg hover:bg-emerald-400 transition cursor-pointer"
                    >
                      + Contribute KES 1,000
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ACTIVE MODULE 2: VISITOR INTRODUCTIONS */}
      {activeModules.includes('visitor_intros') && (
        <div className="bg-slate-900/90 border border-slate-800/80 rounded-3xl p-6 text-white space-y-5 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5 text-teal-400 font-extrabold text-base">
              <UserPlus size={20} />
              <h3>Visitor Introductions & Guest Registry</h3>
            </div>
            <span className="text-xs font-mono text-slate-400 font-bold">
              {visitors.length} Guest(s) Registered
            </span>
          </div>

          <form onSubmit={handleAddVisitor} className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <input
              type="text"
              placeholder="Guest Full Name..."
              value={newGuestName}
              onChange={e => setNewGuestName(e.target.value)}
              className="bg-slate-900 border border-slate-800 text-xs px-3 py-2 rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
              required
            />
            <input
              type="text"
              placeholder="Organization / Firm..."
              value={newGuestOrg}
              onChange={e => setNewGuestOrg(e.target.value)}
              className="bg-slate-900 border border-slate-800 text-xs px-3 py-2 rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
            <button
              type="submit"
              className="bg-teal-600 hover:bg-teal-500 text-slate-950 font-black text-xs rounded-xl py-2 transition shadow-md cursor-pointer"
            >
              + Register Guest
            </button>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {visitors.map(v => (
              <div key={v.id} className="p-4 bg-slate-950 rounded-2xl border border-slate-800/80 space-y-1">
                <span className="text-[9px] font-mono text-teal-400 font-bold uppercase">Guest Observer</span>
                <h4 className="text-sm font-bold text-white">{v.guestName}</h4>
                <p className="text-xs text-slate-400">Org: <strong className="text-slate-300">{v.organization}</strong></p>
                <p className="text-xs text-slate-400">Purpose: {v.purpose}</p>
                <span className="block text-[9px] font-mono text-slate-500 pt-1">Introduced by {v.introducedBy} on {v.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ACTIVE MODULE 3: INSTANT PENALTY COLLECTION */}
      {activeModules.includes('instant_penalties') && (
        <div className="bg-slate-900/90 border border-slate-800/80 rounded-3xl p-6 text-white space-y-5 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5 text-amber-400 font-extrabold text-base">
              <ShieldAlert size={20} />
              <h3>Instant Meeting Penalty Collections (Disciplinarian Desk)</h3>
            </div>
            <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-0.5 rounded-full">
              Standard Fine: KES 200 / 500
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase text-[10px]">
                  <th className="py-2.5 px-3">Member</th>
                  <th className="py-2.5 px-3">Reason</th>
                  <th className="py-2.5 px-3 text-right">Fine Amount</th>
                  <th className="py-2.5 px-3 text-center">Status</th>
                  <th className="py-2.5 px-3 text-right">Instant Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {penalties.map(p => (
                  <tr key={p.id} className="hover:bg-slate-800/30 transition">
                    <td className="py-3 px-3 font-bold text-white">{p.memberName}</td>
                    <td className="py-3 px-3 text-slate-300">{p.reason}</td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-amber-400">
                      KES {p.amount.toLocaleString()}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                        p.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      {p.status === 'Unpaid' ? (
                        <button
                          onClick={() => onPayPenalty(p.id)}
                          className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-lg transition text-[11px] cursor-pointer"
                        >
                          Clear Fine
                        </button>
                      ) : (
                        <span className="text-[10px] font-mono text-emerald-400 font-bold flex items-center justify-end gap-1">
                          <CheckCircle2 size={12} /> Settled
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ACTIVE MODULE 4: PROJECT FUNDING VOTES */}
      {activeModules.includes('project_votes') && (
        <div className="bg-slate-900/90 border border-slate-800/80 rounded-3xl p-6 text-white space-y-5 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5 text-indigo-400 font-extrabold text-base">
              <Vote size={20} />
              <h3>Project Funding Polls & Voting (Simba vs Farasi)</h3>
            </div>
            <span className="text-xs font-mono text-slate-400 font-bold">
              1 Vote Per Member
            </span>
          </div>

          <div className="space-y-4">
            {votes.map(v => {
              const totalVotes = v.votesFor + v.votesAgainst;
              const pctFor = totalVotes > 0 ? Math.round((v.votesFor / totalVotes) * 100) : 0;
              const hasVoted = v.votedMembers.includes(currentUser.id);

              return (
                <div key={v.id} className="p-5 bg-slate-950 rounded-2xl border border-slate-800/80 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-wider">
                        {v.projectCode} Resolution
                      </span>
                      <h4 className="text-base font-bold text-white">{v.title}</h4>
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full">
                      KES {v.allocationRequested.toLocaleString()}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-emerald-400 font-bold">In Favor: {v.votesFor} ({pctFor}%)</span>
                      <span className="text-rose-400 font-bold">Against: {v.votesAgainst} ({100 - pctFor}%)</span>
                    </div>
                    <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden flex">
                      <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${pctFor}%` }} />
                      <div className="h-full bg-rose-500 transition-all duration-300" style={{ width: `${100 - pctFor}%` }} />
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <span className="text-xs text-slate-400 font-mono">
                      {hasVoted ? '✓ You voted on this motion' : 'Cast your vote:'}
                    </span>
                    {!hasVoted && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleVoteProject(v.id, 'against')}
                          className="px-3 py-1 bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-xl text-xs font-bold hover:bg-rose-500/30 transition cursor-pointer"
                        >
                          Vote Against
                        </button>
                        <button
                          onClick={() => handleVoteProject(v.id, 'for')}
                          className="px-3 py-1 bg-emerald-500 text-slate-950 font-black rounded-xl text-xs hover:bg-emerald-400 transition shadow-md glow-emerald cursor-pointer"
                        >
                          Vote In Favor
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ACTIVE MODULE 5: CASH RECONCILIATION & TRIPARTITE MINUTES SIGNING */}
      {activeModules.includes('cash_reconciliation') && (
        <div className="bg-slate-900/90 border border-slate-800/80 rounded-3xl p-6 text-white space-y-5 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5 text-emerald-400 font-extrabold text-base">
              <FileCheck size={20} />
              <h3>Cash Reconciliation & Tripartite Minutes Signing</h3>
            </div>
            <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full border ${
              reconciled ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
            }`}>
              {reconciled ? '✓ Fully Reconciled' : 'Pending Reconciliation'}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-xs font-mono font-bold uppercase text-slate-400">Tripartite Committee Digital Signatures</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { role: 'chairman' as const, title: 'Chairman', icon: CheckCircle2 },
                  { role: 'secretary' as const, title: 'Secretary', icon: CheckCircle2 },
                  { role: 'treasurer' as const, title: 'Treasurer', icon: CheckCircle2 }
                ].map(sig => {
                  const isSigned = minutesSigned[sig.role];

                  return (
                    <div key={sig.role} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-center">
                      <span className="block text-xs font-bold text-white uppercase">{sig.title}</span>
                      {isSigned ? (
                        <div className="py-2 text-emerald-400 font-mono font-bold text-xs flex items-center justify-center gap-1">
                          <CheckCircle2 size={16} />
                          <span>Minutes Signed</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleSignMinutes(sig.role)}
                          className="w-full py-1.5 bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-slate-950 font-bold text-xs rounded-xl transition cursor-pointer"
                        >
                          Sign Minutes
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase text-slate-400">Assembly Cash Audit</h4>
              <div className="space-y-1 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Collected Cash:</span>
                  <span className="font-bold text-white">KES 85,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Mpesa Receipts:</span>
                  <span className="font-bold text-white">KES 140,000</span>
                </div>
              </div>
              <button
                onClick={() => setReconciled(true)}
                className="w-full py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-xs rounded-xl hover:from-emerald-400 hover:to-teal-400 transition shadow-md glow-emerald cursor-pointer"
              >
                Finalize Cash Reconciliation
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
