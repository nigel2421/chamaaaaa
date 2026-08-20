import React, { useState } from 'react';
import { 
  Users, CreditCard, TrendingUp, Clock, AlertTriangle, 
  BarChart3, Shield, Mail, CheckCircle, Plus, Trash, BookOpen, Bell
} from 'lucide-react';
import { Member, Contribution, Loan, GroupConfig, AttendanceMeeting, Penalty, Expenditure } from '../types';
import { motion } from 'motion/react';

export const DashboardView: React.FC<{
  currentUser: Member;
  config: GroupConfig;
  members: Member[];
  contributions: Contribution[];
  loans: Loan[];
  meetings: AttendanceMeeting[];
  penalties: Penalty[];
  expenditures: Expenditure[];
  onNavigate: (module: string) => void;
}> = ({ 
  currentUser, config, members, contributions, 
  loans, meetings, penalties, expenditures, onNavigate 
}) => {
  // To-Do list state for My Acc (Image 21)
  const [todos, setTodos] = useState<{ id: string; text: string; done: boolean }[]>([
    { id: '1', text: 'Submit June shares contribution', done: true },
    { id: '2', text: 'Clear outstanding delay penalty', done: false },
    { id: '3', text: 'Review land project prospectus', done: false }
  ]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    setTodos([...todos, { id: Date.now().toString(), text: newTodo, done: false }]);
    setNewTodo('');
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const removeTodo = (id: string) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  // Financial aggregation for Group Metrics
  const approvedCon = contributions.filter(c => c.status === 'Approved');
  const totalSavingsGroup = approvedCon.reduce((sum, c) => sum + c.amount, 0);
  
  const mySavings = approvedCon
    .filter(c => c.memberId === currentUser.id)
    .reduce((sum, c) => sum + c.amount, 0);

  const activeLoansGroup = loans.filter(l => l.status === 'Approved');
  const myActiveLoans = loans.filter(l => l.memberId === currentUser.id && l.status === 'Approved');
  const myPendingLoans = loans.filter(l => l.memberId === currentUser.id && l.status === 'Pending');

  const totalUnpaidPenalties = penalties
    .filter(p => p.memberId === currentUser.id && p.status === 'Unpaid')
    .reduce((sum, p) => sum + p.amount, 0);

  const totalAssetsVal = expenditures
    .filter(e => e.category === 'Projects' && e.isPremise)
    .reduce((sum, e) => sum + e.amount, 0);

  const totalExpenditureVal = expenditures.reduce((sum, e) => sum + e.amount, 0);

  // Latest Meeting Attendance percentage
  const lastMeeting = meetings[meetings.length - 1];
  let checkInPercentage = 0;
  if (lastMeeting && lastMeeting.records.length > 0) {
    const presentCount = lastMeeting.records.filter(r => r.status === 'Present').length;
    checkInPercentage = Math.round((presentCount / lastMeeting.records.length) * 100);
  }

  return (
    <div className="space-y-6">
      {/* Group Announcement & Ticker */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg shrink-0">
            <Bell size={18} className="animate-bounce" />
          </div>
          <div>
            <span className="block text-xs font-bold text-emerald-950 uppercase tracking-wide">Sacco Board Broadcast</span>
            <span className="text-xs text-emerald-800">
              Welcome, <strong className="font-bold">{currentUser.name}</strong>. June ledger reports have been audited by Amina. Next physical session is scheduled for {lastMeeting?.meetingDate || 'next week'}.
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT & CENTER PANEL: Sacco Overview & Core Modules */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Header & Vision */}
          <div className="bg-gradient-to-br from-emerald-600 to-teal-800 rounded-2xl p-6 text-white shadow-sm space-y-4 relative overflow-hidden">
            <div className="relative z-10 space-y-2">
              <h1 className="text-3xl font-extrabold tracking-tight">{config.name}</h1>
              <p className="text-xs text-emerald-100 max-w-xl font-medium leading-relaxed italic">
                "{config.vision}"
              </p>
              <div className="pt-3 border-t border-emerald-500/50 flex flex-wrap gap-x-6 gap-y-1 text-xs">
                <span>📍 Location: <strong>Nairobi Headquarters</strong></span>
                <span>📋 Reg No: <strong>MKB/4492/2026</strong></span>
              </div>
            </div>
            {/* Geometric visual decoration */}
            <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-10 translate-y-10 scale-150">
              <BookOpen size={200} />
            </div>
          </div>

          {/* Lengo Kuu Indicator (Image 20) */}
          <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
            <span className="text-[10px] font-bold text-amber-950 uppercase tracking-wider block mb-1">🎯 LENGO KUU (Sacco Primary Goal)</span>
            <p className="text-sm font-black text-amber-900 tracking-tight uppercase font-mono">{config.lengoKuu}</p>
          </div>

          {/* 8 Core Modules Grid (Image 20 Blueprint mapping) */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Core Sacco Modules</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              
              <button 
                onClick={() => onNavigate('Membership')}
                className="bg-white p-4 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-slate-50 text-left transition duration-150 space-y-2 shadow-sm"
              >
                <Users className="text-emerald-600" size={20} />
                <span className="block text-xs font-bold text-slate-900">Membership</span>
                <span className="block text-[10px] text-slate-400 font-mono">{members.length} Members</span>
              </button>

              <button 
                onClick={() => onNavigate('Contributions')}
                className="bg-white p-4 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-slate-50 text-left transition duration-150 space-y-2 shadow-sm"
              >
                <CreditCard className="text-emerald-600" size={20} />
                <span className="block text-xs font-bold text-slate-900">Contributions</span>
                <span className="block text-[10px] text-emerald-600 font-bold font-mono">KES {totalSavingsGroup.toLocaleString()}</span>
              </button>

              <button 
                onClick={() => onNavigate('Loans')}
                className="bg-white p-4 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-slate-50 text-left transition duration-150 space-y-2 shadow-sm"
              >
                <TrendingUp className="text-emerald-600" size={20} />
                <span className="block text-xs font-bold text-slate-900">Loans Credit</span>
                <span className="block text-[10px] text-slate-400 font-mono">{activeLoansGroup.length} Active Loans</span>
              </button>

              <button 
                onClick={() => onNavigate('Attendance')}
                className="bg-white p-4 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-slate-50 text-left transition duration-150 space-y-2 shadow-sm"
              >
                <Clock className="text-emerald-600" size={20} />
                <span className="block text-xs font-bold text-slate-900">Attendance</span>
                <span className="block text-[10px] text-slate-400 font-mono">{checkInPercentage}% Presence</span>
              </button>

              <button 
                onClick={() => onNavigate('Expenditures')}
                className="bg-white p-4 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-slate-50 text-left transition duration-150 space-y-2 shadow-sm"
              >
                <BarChart3 className="text-emerald-600" size={20} />
                <span className="block text-xs font-bold text-slate-900">Expenses</span>
                <span className="block text-[10px] text-slate-400 font-mono">KES {totalExpenditureVal.toLocaleString()}</span>
              </button>

              <button 
                onClick={() => onNavigate('Expenditures')} // Shifting projects to active premises
                className="bg-white p-4 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-slate-50 text-left transition duration-150 space-y-2 shadow-sm"
              >
                <TrendingUp className="text-emerald-600" size={20} />
                <span className="block text-xs font-bold text-slate-900">Assets Portfolio</span>
                <span className="block text-[10px] text-slate-400 font-mono">KES {totalAssetsVal.toLocaleString()}</span>
              </button>

              <button 
                onClick={() => onNavigate('Communication')}
                className="bg-white p-4 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-slate-50 text-left transition duration-150 space-y-2 shadow-sm"
              >
                <Mail className="text-emerald-600" size={20} />
                <span className="block text-xs font-bold text-slate-900">Communication</span>
                <span className="block text-[10px] text-slate-400 font-mono">Instant Chat</span>
              </button>

              <button 
                onClick={() => onNavigate('Administrator')}
                className="bg-slate-900 hover:bg-slate-800 p-4 rounded-xl text-left transition duration-150 space-y-2 shadow-sm border border-slate-950 text-white"
              >
                <Shield className="text-emerald-400" size={20} />
                <span className="block text-xs font-bold">Admin Portal</span>
                <span className="block text-[10px] text-slate-400 font-mono">Passcode Protected</span>
              </button>

            </div>
          </div>

        </div>

        {/* RIGHT PANEL: MY ACC (Image 21 Wireframe Layout) */}
        <div className="space-y-6">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-6">
            
            {/* Account Card Header */}
            <div className="pb-4 border-b border-slate-200">
              <span className="text-[10px] bg-slate-900 text-white font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                My Acc Panel (Image 21)
              </span>
              <h3 className="text-lg font-black text-slate-900 mt-2">{currentUser.name}</h3>
              <p className="text-xs text-slate-500 mt-0.5">Sacco Designation: <strong className="text-emerald-600 font-semibold">{currentUser.role}</strong></p>
            </div>

            {/* Account Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 text-center">
                <span className="block text-[10px] text-slate-400 uppercase font-bold">My Total Savings</span>
                <span className="block text-sm font-bold text-slate-900 font-mono mt-1">KES {mySavings.toLocaleString()}</span>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 text-center">
                <span className="block text-[10px] text-slate-400 uppercase font-bold">Unpaid Penalty Fees</span>
                <span className={`block text-sm font-bold font-mono mt-1 ${totalUnpaidPenalties > 0 ? 'text-rose-600 animate-pulse' : 'text-slate-900'}`}>
                  KES {totalUnpaidPenalties.toLocaleString()}
                </span>
              </div>
            </div>

            {/* My Active Loan Indicator */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase">My Sacco Credit Status</h4>
              {myActiveLoans.length > 0 ? (
                myActiveLoans.map(loan => {
                  const paidRepayments = loan.repayments.filter(r => r.status === 'Paid').length;
                  const totalRepayments = loan.repayments.length;
                  const pct = Math.round((paidRepayments / totalRepayments) * 100);

                  return (
                    <div key={loan.id} className="p-3 bg-white border border-slate-100 rounded-xl space-y-2">
                      <div className="flex justify-between text-xs font-bold text-slate-800">
                        <span>Active Loan Credit</span>
                        <span className="font-mono">KES {loan.amount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                        <span>Repayment Progress</span>
                        <span>{paidRepayments} / {totalRepayments} paid ({pct}%)</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-600 transition-all duration-300" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })
              ) : myPendingLoans.length > 0 ? (
                <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl text-xs text-amber-800 flex items-center gap-2">
                  <Clock size={16} />
                  <span>My loan request of <strong>KES {myPendingLoans[0].amount.toLocaleString()}</strong> is pending review.</span>
                </div>
              ) : (
                <div className="p-3 bg-slate-100 border border-slate-200 rounded-xl text-center text-xs text-slate-400">
                  No active or pending Sacco loans.
                </div>
              )}
            </div>

            {/* My Personal To-Dos (Image 21 Detail: Members list checkboxes) */}
            <div className="space-y-3 pt-4 border-t border-slate-200">
              <h4 className="text-xs font-bold text-slate-400 uppercase">My Sacco Tasks Checklist</h4>
              <form onSubmit={addTodo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add custom Sacco task..."
                  value={newTodo}
                  onChange={e => setNewTodo(e.target.value)}
                  className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
                <button
                  type="submit"
                  className="p-1.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition shadow-sm"
                >
                  <Plus size={15} />
                </button>
              </form>

              <div className="space-y-1.5 max-h-40 overflow-y-auto">
                {todos.map(t => (
                  <div key={t.id} className="flex items-center justify-between p-2 bg-white rounded-lg border border-slate-100">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={t.done}
                        onChange={() => toggleTodo(t.id)}
                        className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className={`text-xs ${t.done ? 'line-through text-slate-400 font-medium' : 'text-slate-700 font-bold'}`}>
                        {t.text}
                      </span>
                    </div>
                    <button
                      onClick={() => removeTodo(t.id)}
                      className="text-slate-300 hover:text-rose-500 transition"
                    >
                      <Trash size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
