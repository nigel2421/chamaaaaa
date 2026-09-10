import React, { useState, useEffect } from 'react';
import { 
  Search, UserPlus, Shield, CreditCard, ArrowRight, CheckCircle, 
  Clock, AlertCircle, XCircle, FileText, Send, Vote, Lock, Check, 
  X, Users, AlertTriangle, Printer, BarChart3, Building, HelpCircle, 
  TrendingUp, RefreshCw, Landmark, Video, Sparkles, Mail, Calendar,
  Globe, Radio, Server, Activity, ShieldCheck, Plus, CheckCircle2, ChevronRight
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Legend, PieChart, Pie, Cell 
} from 'recharts';
import { 
  Member, Contribution, Loan, Agenda, AttendanceMeeting, 
  Expenditure, ChatMessage, Candidate, Penalty, GroupConfig, ChamaTenant,
  SubWalletType, WebhookConfig, WebhookEventLog 
} from '../types';
import { 
  getWebhookConfig, saveWebhookConfig, getWebhookLogs, dispatchMgrEvent 
} from '../lib/mgrEventBus';
import { motion, AnimatePresence } from 'motion/react';

const COLORS = ['#10B981', '#F59E0B', '#EF4444', '#3B82F6', '#8B5CF6'];

// ==========================================
// 1. MEMBERS VIEW (Frameless UI)
// ==========================================
export const MembersView: React.FC<{
  members: Member[];
  onAddMember: (member: Omit<Member, 'id' | 'joinedDate'>) => void;
  currentUser: Member;
}> = ({ members, onAddMember, currentUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  
  // Form fields
  const [name, setName] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [occupation, setOccupation] = useState('');
  const [residence, setResidence] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [beneficiary, setBeneficiary] = useState('');
  const [role, setRole] = useState<'Member' | 'Chairman' | 'Vice Chairman' | 'Treasurer' | 'Secretary' | 'Disciplinarian' | 'Custodian'>('Member');

  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.memberId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.occupation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const committee = members.filter(m => m.role !== 'Member');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !nationalId || !phone) return;
    onAddMember({
      name,
      memberId: `MKB-0${members.length + 1}`,
      nationalId,
      occupation,
      residence,
      phone,
      email,
      beneficiary,
      role,
      status: 'Active',
      tier: 'Bronze Starter',
      contributionStreakMonths: 1,
      badges: ['🌟 New Member'],
      subWalletBalances: { general: 0, mkebe: 0, saye: 0, okolea: 0, penaltyPool: 0 }
    });

    dispatchMgrEvent(currentUser.tenantId, 'member.synced', { name, phone, role });

    setName('');
    setNationalId('');
    setOccupation('');
    setResidence('');
    setPhone('');
    setEmail('');
    setBeneficiary('');
    setRole('Member');
    setIsRegistering(false);
  };

  return (
    <div className="space-y-6 text-white">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-white">Members Directory & Officials</h2>
          <p className="text-xs text-slate-400">Manage Chama membership roster, committee roles, and gamified tier badges.</p>
        </div>
        <button
          onClick={() => setIsRegistering(!isRegistering)}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs rounded-2xl transition duration-150 shadow-md glow-emerald cursor-pointer"
        >
          <UserPlus size={16} />
          <span>{isRegistering ? 'View Members List' : 'Register New Member'}</span>
        </button>
      </div>

      {/* Committee Showcase Frameless Grid */}
      {!isRegistering && (
        <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800/80 space-y-4 shadow-xl">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
            <Shield size={16} />
            <span>Active Executive Committee & Officials</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {committee.map(c => (
              <div key={c.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 flex flex-col justify-between space-y-3">
                <div>
                  <span className="inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono mb-2">
                    {c.role}
                  </span>
                  <h4 className="font-extrabold text-white text-sm">{c.name}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{c.occupation}</p>
                </div>
                <div className="text-[10px] font-mono text-slate-500 pt-2 border-t border-slate-800 flex justify-between items-center">
                  <span>{c.memberId}</span>
                  <span className="text-amber-400 font-bold">{c.tier}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {isRegistering ? (
        <motion.div 
          initial={{ opacity: 0, y: 15 }} 
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800/80 shadow-xl max-w-2xl mx-auto space-y-4"
        >
          <h3 className="text-lg font-black text-white">New Member Registration Form</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-bold text-slate-400 uppercase mb-1">Full Name *</label>
                <input 
                  type="text" required value={name} onChange={e => setName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-mono font-bold text-slate-400 uppercase mb-1">National ID / Passport *</label>
                <input 
                  type="text" required value={nationalId} onChange={e => setNationalId(e.target.value)}
                  placeholder="e.g. 33224455"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-mono font-bold text-slate-400 uppercase mb-1">Occupation</label>
                <input 
                  type="text" value={occupation} onChange={e => setOccupation(e.target.value)}
                  placeholder="e.g. Engineer, Merchant"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-mono font-bold text-slate-400 uppercase mb-1">Residence / Ward</label>
                <input 
                  type="text" value={residence} onChange={e => setResidence(e.target.value)}
                  placeholder="e.g. Kilimani, Nairobi"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-mono font-bold text-slate-400 uppercase mb-1">Phone Number *</label>
                <input 
                  type="text" required value={phone} onChange={e => setPhone(e.target.value)}
                  placeholder="e.g. 0712345678"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-mono font-bold text-slate-400 uppercase mb-1">Email Address</label>
                <input 
                  type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="e.g. member@chama.com"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-mono font-bold text-slate-400 uppercase mb-1">Beneficiary & Next of Kin</label>
                <input 
                  type="text" value={beneficiary} onChange={e => setBeneficiary(e.target.value)}
                  placeholder="e.g. Grace Doe (Spouse) - 0722000000"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-mono font-bold text-slate-400 uppercase mb-1">Group Role</label>
                <select 
                  value={role} onChange={e => setRole(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 font-bold"
                >
                  <option value="Member">General Member</option>
                  <option value="Chairman">Chairman (Overall Control)</option>
                  <option value="Treasurer">Treasurer (Sub-wallet Manager)</option>
                  <option value="Secretary">Secretary (Record Keeper)</option>
                  <option value="Disciplinarian">Disciplinarian (Penalties)</option>
                  <option value="Custodian">Custodian (Mkebe Lockbox)</option>
                </select>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsRegistering(false)}
                className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold hover:bg-slate-700 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-xs font-black shadow-md glow-emerald transition cursor-pointer"
              >
                Register & Sync Member
              </button>
            </div>
          </form>
        </motion.div>
      ) : (
        <div className="bg-slate-900/90 rounded-3xl border border-slate-800/80 shadow-xl overflow-hidden">
          <div className="p-4 border-b border-slate-800 bg-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="font-extrabold text-white text-sm">Registered Members Roster</h3>
            <div className="relative w-full sm:w-64">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Search size={14} />
              </span>
              <input 
                type="text"
                placeholder="Search member name, ID..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-950 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800">
                  <th className="px-6 py-3">Group ID</th>
                  <th className="px-6 py-3">Member Name</th>
                  <th className="px-6 py-3">Tier & Streak</th>
                  <th className="px-6 py-3">National ID</th>
                  <th className="px-6 py-3">Phone & Email</th>
                  <th className="px-6 py-3">Residence</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {filteredMembers.map(m => (
                  <tr key={m.id} className="hover:bg-slate-800/30 transition">
                    <td className="px-6 py-4 font-mono font-bold text-emerald-400">{m.memberId}</td>
                    <td className="px-6 py-4 font-bold text-white">
                      <div>
                        {m.name}
                        {m.id === currentUser.id && (
                          <span className="ml-2 text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.2 rounded-full font-mono">
                            YOU
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400">{m.occupation} • <strong className="text-slate-300">{m.role}</strong></div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="block text-amber-400 font-bold">{m.tier || 'Silver Member'}</span>
                      <span className="text-[9px] font-mono text-slate-400">🔥 {m.contributionStreakMonths || 6} Mo Streak</span>
                    </td>
                    <td className="px-6 py-4 text-slate-300 font-mono">{m.nationalId}</td>
                    <td className="px-6 py-4 text-slate-300">
                      <div>{m.phone}</div>
                      <div className="text-[10px] text-slate-500">{m.email || 'No email'}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-300">{m.residence}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        {m.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};


// ==========================================
// 2. CONTRIBUTIONS VIEW (Frameless + Multi-Bucket Selector)
// ==========================================
export const ContributionsView: React.FC<{
  contributions: Contribution[];
  members: Member[];
  onAddContribution: (con: Omit<Contribution, 'id' | 'date' | 'status' | 'approvedBy'>) => void;
  currentUser: Member;
}> = ({ contributions, members, onAddContribution, currentUser }) => {
  const [type, setType] = useState<'Shares' | 'Monthly' | 'Special'>('Shares');
  const [subWallet, setSubWallet] = useState<SubWalletType>('General Savings');
  const [amount, setAmount] = useState('');
  const [purpose, setPurpose] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Mpesa' | 'Cash' | 'Bank'>('Mpesa');
  const [selectedMemberId, setSelectedMemberId] = useState(currentUser.id);
  const [mpesaTriggered, setMpesaTriggered] = useState(false);

  const approvedContributions = contributions.filter(c => c.status === 'Approved');
  const totalSavings = approvedContributions.reduce((sum, c) => sum + c.amount, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount))) return;
    
    const selectedMember = members.find(m => m.id === selectedMemberId) || currentUser;

    if (paymentMethod === 'Mpesa') {
      setMpesaTriggered(true);
      setTimeout(() => {
        onAddContribution({
          memberId: selectedMember.id,
          memberName: selectedMember.name,
          type,
          subWallet,
          amount: Number(amount),
          purpose: purpose || `${type} Payment into ${subWallet}`,
          paymentMethod
        });

        dispatchMgrEvent(currentUser.tenantId, 'contribution.recorded', {
          memberId: selectedMember.id,
          amount: Number(amount),
          subWallet
        });

        setMpesaTriggered(false);
        setAmount('');
        setPurpose('');
      }, 2500);
    } else {
      onAddContribution({
        memberId: selectedMember.id,
        memberName: selectedMember.name,
        type,
        subWallet,
        amount: Number(amount),
        purpose: purpose || `${type} Payment into ${subWallet}`,
        paymentMethod
      });
      setAmount('');
      setPurpose('');
    }
  };

  return (
    <div className="space-y-6 text-white">
      <div>
        <h2 className="text-2xl font-black tracking-tight text-white">Savings & Sub-Wallet Ledger</h2>
        <p className="text-xs text-slate-400">Track group contributions and route funds directly into designated sub-wallets.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Post Contribution Form */}
        <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800/80 shadow-xl lg:col-span-1 space-y-4">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
            <CreditCard size={16} />
            <span>Post Contribution / Share</span>
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-bold text-slate-400 uppercase mb-1">Member Account</label>
              <select
                value={selectedMemberId}
                onChange={e => setSelectedMemberId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 font-bold"
              >
                {members.map(m => (
                  <option key={m.id} value={m.id}>{m.name} ({m.memberId})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-slate-400 uppercase mb-1">Target Sub-Wallet Pool</label>
              <select
                value={subWallet}
                onChange={e => setSubWallet(e.target.value as SubWalletType)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-bold"
              >
                <option value="General Savings">🏦 General Chama Savings</option>
                <option value="Mkebe (Locked)">🔒 Mkebe (Locked Project Simba Capital)</option>
                <option value="SAYE">🐷 SAYE (Save As You Earn)</option>
                <option value="Okolea (Emergency)">🤝 Okolea (Emergency Relief)</option>
                <option value="Penalty Pool">🛡️ Penalty Pool</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-slate-400 uppercase mb-1">Amount (KES)</label>
              <input
                type="number" required value={amount} onChange={e => setAmount(e.target.value)}
                placeholder="e.g. 5000"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs font-mono font-bold text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-slate-400 uppercase mb-1">Payment Channel</label>
              <div className="grid grid-cols-3 gap-2">
                {(['Mpesa', 'Cash', 'Bank'] as const).map(method => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPaymentMethod(method)}
                    className={`py-2 text-xs font-bold rounded-xl border transition ${
                      paymentMethod === method
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-black'
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={mpesaTriggered}
              className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-black text-xs rounded-xl shadow-md glow-emerald transition flex items-center justify-center gap-2 cursor-pointer"
            >
              {mpesaTriggered ? (
                <>
                  <RefreshCw className="animate-spin" size={16} />
                  <span>Pushing MPesa Prompt...</span>
                </>
              ) : (
                <>
                  <span>Submit Payment</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Ledger Table */}
        <div className="bg-slate-900/90 rounded-3xl border border-slate-800/80 shadow-xl lg:col-span-2 overflow-hidden flex flex-col justify-between">
          <div>
            <div className="p-4 border-b border-slate-800 bg-slate-950 flex justify-between items-center">
              <h3 className="font-extrabold text-white text-sm">Chama Savings & Capital Ledger</h3>
              <span className="text-xs font-mono font-bold text-emerald-400">Total: KES {totalSavings.toLocaleString()}</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-950 text-[10px] font-mono font-bold uppercase text-slate-400 border-b border-slate-800">
                    <th className="px-6 py-3">Member</th>
                    <th className="px-6 py-3">Sub-Wallet</th>
                    <th className="px-6 py-3">Amount</th>
                    <th className="px-6 py-3">Channel</th>
                    <th className="px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium">
                  {contributions.map(c => (
                    <tr key={c.id} className="hover:bg-slate-800/30 transition">
                      <td className="px-6 py-3.5 font-bold text-white">{c.memberName}</td>
                      <td className="px-6 py-3.5">
                        <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                          {c.subWallet || 'General Savings'}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 font-mono font-black text-white">KES {c.amount.toLocaleString()}</td>
                      <td className="px-6 py-3.5 text-slate-300 font-mono">{c.paymentMethod}</td>
                      <td className="px-6 py-3.5">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                          c.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                        }`}>
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// ==========================================
// 3. LOANS VIEW (Frameless)
// ==========================================
export const LoansView: React.FC<{
  loans: Loan[];
  members: Member[];
  onApplyLoan: (loan: Omit<Loan, 'id' | 'status' | 'dateApplied' | 'repayments'>) => void;
  currentUser: Member;
  isAdmin: boolean;
}> = ({ loans, members, onApplyLoan, currentUser, isAdmin }) => {
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [term, setTerm] = useState(6);
  const [selectedMemberId, setSelectedMemberId] = useState(currentUser.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount)) || !reason) return;
    const selectedMember = members.find(m => m.id === selectedMemberId) || currentUser;

    onApplyLoan({
      memberId: selectedMember.id,
      memberName: selectedMember.name,
      amount: Number(amount),
      reason,
      repaymentTermMonths: term
    });

    setAmount('');
    setReason('');
  };

  return (
    <div className="space-y-6 text-white">
      <div>
        <h2 className="text-2xl font-black tracking-tight text-white">Loans & Credit Facility</h2>
        <p className="text-xs text-slate-400">Apply for capital credit and track loan amortization repayments.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800/80 shadow-xl space-y-4 lg:col-span-1">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
            <FileText size={16} />
            <span>Apply for Loan</span>
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-bold text-slate-400 uppercase mb-1">Applicant Account</label>
              <select
                value={selectedMemberId}
                onChange={e => setSelectedMemberId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white font-bold focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                {members.map(m => (
                  <option key={m.id} value={m.id}>{m.name} ({m.memberId})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-mono font-bold text-slate-400 uppercase mb-1">Requested Amount (KES)</label>
              <input
                type="number" required value={amount} onChange={e => setAmount(e.target.value)}
                placeholder="e.g. 30000"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs font-mono font-bold text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-mono font-bold text-slate-400 uppercase mb-1">Duration Term</label>
              <select
                value={term}
                onChange={e => setTerm(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white font-bold focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value={3}>3 Months</option>
                <option value={6}>6 Months (Standard)</option>
                <option value={12}>12 Months</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-mono font-bold text-slate-400 uppercase mb-1">Reason</label>
              <textarea
                required rows={3} value={reason} onChange={e => setReason(e.target.value)}
                placeholder="Detail agricultural or business project..."
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-black text-xs rounded-xl shadow-md glow-emerald transition cursor-pointer"
            >
              Submit Application
            </button>
          </form>
        </div>

        <div className="bg-slate-900/90 rounded-3xl border border-slate-800/80 shadow-xl lg:col-span-2 overflow-hidden">
          <div className="p-4 border-b border-slate-800 bg-slate-950">
            <h3 className="font-extrabold text-white text-sm">Active Credit & Loan Applications</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-950 text-[10px] font-mono font-bold uppercase text-slate-400 border-b border-slate-800">
                  <th className="px-6 py-3">Borrower Name</th>
                  <th className="px-6 py-3">Amount</th>
                  <th className="px-6 py-3">Term</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {loans.map(l => (
                  <tr key={l.id} className="hover:bg-slate-800/30 transition">
                    <td className="px-6 py-3.5 font-bold text-white">{l.memberName}</td>
                    <td className="px-6 py-3.5 font-mono font-black text-white">KES {l.amount.toLocaleString()}</td>
                    <td className="px-6 py-3.5 text-slate-300 font-mono">{l.repaymentTermMonths} Mos</td>
                    <td className="px-6 py-3.5">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                        l.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      }`}>
                        {l.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};


// ==========================================
// 4. MEETINGS / AGENDAS VIEW
// ==========================================
export const MeetingsView: React.FC<{
  agendas: Agenda[];
  meetings: AttendanceMeeting[];
  onAddAgenda: (agenda: Omit<Agenda, 'id' | 'dateAdded' | 'memberFeelings'>) => void;
  onVoteAgenda: (id: string, feeling: 'urgent' | 'important' | 'keyStrategy' | 'needsMod') => void;
  onPrintMinutes: () => void;
}> = ({ agendas, meetings, onAddAgenda, onVoteAgenda, onPrintMinutes }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'Goal' | 'Immediate' | 'Strategy'>('Goal');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    onAddAgenda({ title, description, status: 'Pending', type, reviewDate: new Date().toISOString().split('T')[0] });
    setTitle('');
    setDescription('');
  };

  return (
    <div className="space-y-6 text-white">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-white">Constituency Agendas & Voting</h2>
          <p className="text-xs text-slate-400">Collaborative voting on group strategy and project milestones.</p>
        </div>
        <button
          onClick={onPrintMinutes}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition flex items-center gap-2 cursor-pointer"
        >
          <Printer size={16} />
          <span>Print Minutes Report</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800/80 shadow-xl space-y-4 lg:col-span-1">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
            <Landmark size={16} />
            <span>Propose Agenda Item</span>
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-bold text-slate-400 uppercase mb-1">Agenda Title</label>
              <input
                type="text" required value={title} onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Project Simba Top-Up"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-mono font-bold text-slate-400 uppercase mb-1">Category</label>
              <select
                value={type} onChange={e => setType(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 font-bold"
              >
                <option value="Goal">Long-Term Goal</option>
                <option value="Immediate">Immediate Priority</option>
                <option value="Strategy">Strategic Direction</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-mono font-bold text-slate-400 uppercase mb-1">Description</label>
              <textarea
                rows={3} value={description} onChange={e => setDescription(e.target.value)}
                placeholder="Provide proposal context..."
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-black text-xs rounded-xl shadow-md glow-emerald transition cursor-pointer"
            >
              Submit Agenda Proposal
            </button>
          </form>
        </div>

        <div className="space-y-4 lg:col-span-2">
          {agendas.map(a => (
            <div key={a.id} className="p-5 bg-slate-900/90 border border-slate-800/80 rounded-3xl space-y-3 shadow-xl">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[9px] font-mono font-bold uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                    {a.type} Agenda
                  </span>
                  <h4 className="text-base font-extrabold text-white mt-1">{a.title}</h4>
                </div>
                <span className="text-xs font-mono font-bold text-amber-400">{a.status}</span>
              </div>
              <p className="text-xs text-slate-300">{a.description}</p>
              <div className="flex gap-2 pt-2">
                {(['urgent', 'important', 'keyStrategy'] as const).map(feeling => (
                  <button
                    key={feeling}
                    onClick={() => onVoteAgenda(a.id, feeling)}
                    className="px-3 py-1 bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 border border-slate-700 text-slate-300 rounded-xl text-xs font-bold transition cursor-pointer"
                  >
                    + Vote {feeling} ({a.memberFeelings[feeling]}%)
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


// ==========================================
// 5. ATTENDANCE VIEW
// ==========================================
export const AttendanceView: React.FC<{
  meetings: AttendanceMeeting[];
  members: Member[];
  penalties: Penalty[];
  onCheckIn: (meetingId: string, memberId: string, status: 'Present' | 'Absent' | 'Absent With Apology', reason?: string) => void;
  onPayPenalty: (id: string) => void;
  onAdjournMeeting: (meetingId: string) => void;
}> = ({ meetings, members, penalties, onCheckIn, onPayPenalty, onAdjournMeeting }) => {
  const activeMeeting = meetings.find(m => !m.adjourned) || meetings[meetings.length - 1];

  return (
    <div className="space-y-6 text-white">
      <div>
        <h2 className="text-2xl font-black tracking-tight text-white">Assembly Attendance Registry</h2>
        <p className="text-xs text-slate-400">Physical attendance check-in and delay penalty tracking.</p>
      </div>

      <div className="bg-slate-900/90 rounded-3xl border border-slate-800/80 shadow-xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 bg-slate-950 flex justify-between items-center">
          <h3 className="font-extrabold text-white text-sm">{activeMeeting?.title || 'Assembly Session'} Check-in</h3>
          <span className="text-xs font-mono font-bold text-emerald-400">{activeMeeting?.meetingDate}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-950 text-[10px] font-mono font-bold uppercase text-slate-400 border-b border-slate-800">
                <th className="px-6 py-3">Member</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Attendance Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {members.map(m => {
                const rec = activeMeeting?.records.find(r => r.memberId === m.id);
                const status = rec?.status || 'Not Checked In';

                return (
                  <tr key={m.id} className="hover:bg-slate-800/30 transition">
                    <td className="px-6 py-3.5 font-bold text-white">{m.name}</td>
                    <td className="px-6 py-3.5 text-slate-400">{m.role}</td>
                    <td className="px-6 py-3.5">
                      <div className="flex gap-2">
                        <button
                          onClick={() => activeMeeting && onCheckIn(activeMeeting.id, m.id, 'Present')}
                          className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                            status === 'Present' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          Present
                        </button>
                        <button
                          onClick={() => activeMeeting && onCheckIn(activeMeeting.id, m.id, 'Absent')}
                          className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                            status === 'Absent' ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          Absent (Fine KES 200)
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


// ==========================================
// 6. EXPENDITURES VIEW
// ==========================================
export const ExpendituresView: React.FC<{
  expenditures: Expenditure[];
  contributions: Contribution[];
  onAddExpenditure: (exp: Omit<Expenditure, 'id' | 'date' | 'status'>) => void;
}> = ({ expenditures, contributions, onAddExpenditure }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<'Projects' | 'Maintenance' | 'Miscellaneous' | 'Welfare Relief'>('Projects');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount) return;
    onAddExpenditure({ title, amount: Number(amount), category, isPremise: category === 'Projects' });
    setTitle('');
    setAmount('');
  };

  return (
    <div className="space-y-6 text-white">
      <div>
        <h2 className="text-2xl font-black tracking-tight text-white">Expenditures & Assets Portfolio</h2>
        <p className="text-xs text-slate-400">Track group spending and finished capital assets (Project Simba / Farasi premises).</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800/80 shadow-xl space-y-4 lg:col-span-1">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
            <BarChart3 size={16} />
            <span>Record Expenditure</span>
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-bold text-slate-400 uppercase mb-1">Expenditure Title</label>
              <input
                type="text" required value={title} onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Kamulu plot survey fee"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-mono font-bold text-slate-400 uppercase mb-1">Amount (KES)</label>
              <input
                type="number" required value={amount} onChange={e => setAmount(e.target.value)}
                placeholder="e.g. 45000"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs font-mono font-bold text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-mono font-bold text-slate-400 uppercase mb-1">Category</label>
              <select
                value={category} onChange={e => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white font-bold focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="Projects">Capital Project (Asset Premise)</option>
                <option value="Maintenance">Maintenance & Operations</option>
                <option value="Welfare Relief">Welfare Relief</option>
                <option value="Miscellaneous">Miscellaneous</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-black text-xs rounded-xl shadow-md glow-emerald transition cursor-pointer"
            >
              Post Expenditure
            </button>
          </form>
        </div>

        <div className="bg-slate-900/90 rounded-3xl border border-slate-800/80 shadow-xl lg:col-span-2 overflow-hidden">
          <div className="p-4 border-b border-slate-800 bg-slate-950">
            <h3 className="font-extrabold text-white text-sm">Expenditures & Assets Portfolio Ledger</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-950 text-[10px] font-mono font-bold uppercase text-slate-400 border-b border-slate-800">
                  <th className="px-6 py-3">Title</th>
                  <th className="px-6 py-3">Category</th>
                  <th className="px-6 py-3">Amount</th>
                  <th className="px-6 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {expenditures.map(e => (
                  <tr key={e.id} className="hover:bg-slate-800/30 transition">
                    <td className="px-6 py-3.5 font-bold text-white">{e.title}</td>
                    <td className="px-6 py-3.5">
                      <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                        {e.category}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 font-mono font-black text-white">KES {e.amount.toLocaleString()}</td>
                    <td className="px-6 py-3.5 text-slate-400 font-mono">{e.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};


// ==========================================
// 7. CHATROOM VIEW
// ==========================================
export const ChatroomView: React.FC<{
  chats: ChatMessage[];
  members: Member[];
  onSendMessage: (text: string, recipientId?: string) => void;
  currentUser: Member;
  penalties: Penalty[];
  onPayPenalty: (id: string) => void;
  onAddPenalty: (pen: Omit<Penalty, 'id' | 'date' | 'status'>) => void;
}> = ({ chats, members, onSendMessage, currentUser }) => {
  const [text, setText] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSendMessage(text);
    setText('');
  };

  return (
    <div className="space-y-6 text-white">
      <div>
        <h2 className="text-2xl font-black tracking-tight text-white">Chama Group Communication</h2>
        <p className="text-xs text-slate-400">Instant messaging for announcements and member queries.</p>
      </div>

      <div className="bg-slate-900/90 rounded-3xl border border-slate-800/80 shadow-xl overflow-hidden h-[500px] flex flex-col justify-between">
        <div className="p-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <span className="font-extrabold text-white text-sm"># general-announcements</span>
          <span className="text-xs font-mono text-emerald-400 font-bold">● {members.length} Members Online</span>
        </div>

        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {chats.map(c => {
            const isMe = c.senderId === currentUser.id;
            return (
              <div key={c.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                <span className="text-[10px] font-mono text-slate-400 mb-1">{c.senderName}</span>
                <div className={`p-3.5 rounded-2xl max-w-md text-xs font-medium ${
                  isMe ? 'bg-emerald-500 text-slate-950 font-semibold' : 'bg-slate-800 text-white border border-slate-700'
                }`}>
                  {c.text}
                </div>
              </div>
            );
          })}
        </div>

        <form onSubmit={handleSend} className="p-4 border-t border-slate-800 bg-slate-950 flex gap-3">
          <input
            type="text"
            placeholder="Type message..."
            value={text}
            onChange={e => setText(e.target.value)}
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
          <button
            type="submit"
            className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl shadow-md glow-emerald transition cursor-pointer"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};


// ==========================================
// 8. ELECTIONS VIEW
// ==========================================
export const ElectionsView: React.FC<{
  candidates: Candidate[];
  onVote: (candidateId: string, voterId: string) => void;
  currentUser: Member;
}> = ({ candidates, onVote, currentUser }) => {
  return (
    <div className="space-y-6 text-white">
      <div>
        <h2 className="text-2xl font-black tracking-tight text-white">Committee Elections</h2>
        <p className="text-xs text-slate-400">Cast your democratic vote for group officials.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {candidates.map(c => {
          const hasVoted = c.voters.includes(currentUser.id);

          return (
            <div key={c.id} className="p-6 bg-slate-900/90 border border-slate-800/80 rounded-3xl space-y-4 shadow-xl text-center">
              <div className="w-16 h-16 rounded-full bg-slate-800 text-emerald-400 border border-slate-700 mx-auto flex items-center justify-center font-black text-xl">
                {c.name.charAt(0)}
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-amber-400 uppercase bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
                  Post: {c.post}
                </span>
                <h4 className="text-lg font-black text-white mt-2">{c.name}</h4>
              </div>

              <div className="text-xs font-mono text-slate-400">
                Total Votes: <strong className="text-emerald-400 text-sm">{c.votesCount}</strong>
              </div>

              <button
                onClick={() => onVote(c.id, currentUser.id)}
                disabled={hasVoted}
                className={`w-full py-2.5 rounded-xl text-xs font-black transition ${
                  hasVoted 
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                    : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md glow-emerald cursor-pointer'
                }`}
              >
                {hasVoted ? '✓ Vote Cast' : 'Vote for Candidate'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};


// ==========================================
// 9. ADMIN PORTAL (With MGR Webhook Engine)
// ==========================================
export const AdminPortal: React.FC<{
  contributions: Contribution[];
  loans: Loan[];
  config: GroupConfig;
  onApproveContribution: (id: string, adminId: string) => void;
  onApproveLoan: (id: string) => void;
  onRejectLoan: (id: string) => void;
  onUpdateConfig: (newConfig: GroupConfig) => void;
  currentUser: Member;
  tenants: ChamaTenant[];
  currentTenantId: string;
  onSelectTenant: (id: string) => void;
  onCreateTenant: (newTenant: Omit<ChamaTenant, 'id' | 'createdDate'>) => void;
  members: Member[];
}> = ({ 
  contributions, loans, config, onApproveContribution, 
  onApproveLoan, onRejectLoan, onUpdateConfig, currentUser,
  tenants, currentTenantId, onSelectTenant, onCreateTenant, members
}) => {
  const [passcode, setPasscode] = useState('');
  const [unlocked, setUnlocked] = useState(currentUser.role === 'Super Admin');
  const [errorMsg, setErrorMsg] = useState('');

  // Webhook state
  const [webhookConfig, setWebhookConfigState] = useState<WebhookConfig>(getWebhookConfig());
  const [webhookLogs, setWebhookLogsState] = useState<WebhookEventLog[]>(getWebhookLogs());
  const [testingWebhook, setTestingWebhook] = useState(false);

  // Config edits
  const [name, setName] = useState(config.name);
  const [vision, setVision] = useState(config.vision);
  const [lengoKuu, setLengoKuu] = useState(config.lengoKuu);
  const [constitution, setConstitution] = useState(config.constitution);

  // Super Admin New Tenant Form State
  const [newChamaName, setNewChamaName] = useState('');
  const [newChamaCode, setNewChamaCode] = useState('');
  const [newChamaVision, setNewChamaVision] = useState('');
  const [newChamaLengo, setNewChamaLengo] = useState('');
  const [newChamaPasscode, setNewChamaPasscode] = useState('');

  useEffect(() => {
    setName(config.name);
    setVision(config.vision);
    setLengoKuu(config.lengoKuu);
    setConstitution(config.constitution);
  }, [config]);

  const pendingCashCon = contributions.filter(c => c.status === 'Pending' && c.paymentMethod === 'Cash');
  const pendingLoansList = loans.filter(l => l.status === 'Pending');

  const handleSaveWebhookConfig = (e: React.FormEvent) => {
    e.preventDefault();
    saveWebhookConfig(webhookConfig);
    alert('MGR Webhook settings updated successfully!');
  };

  const handleTestWebhookDispatch = async () => {
    setTestingWebhook(true);
    await dispatchMgrEvent(currentTenantId, 'mgr.rotation_triggered', {
      testTrigger: true,
      sender: currentUser.name,
      amount: 150000
    });
    setWebhookLogsState(getWebhookLogs());
    setTestingWebhook(false);
  };

  if (!unlocked) {
    return (
      <div className="max-w-md mx-auto bg-slate-900 p-6 rounded-3xl border border-slate-800 text-white space-y-4 shadow-xl text-center">
        <Lock size={32} className="text-amber-400 mx-auto" />
        <h3 className="font-extrabold text-sm">Official Admin Authorization Lock</h3>
        <p className="text-xs text-slate-400">Enter committee passcode reference (1234).</p>
        <form onSubmit={e => { e.preventDefault(); passcode === config.adminCode ? setUnlocked(true) : setErrorMsg('Incorrect code'); }} className="space-y-3">
          <input
            type="password"
            placeholder="Passcode..."
            value={passcode}
            onChange={e => setPasscode(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-center font-mono font-bold text-white focus:outline-none"
          />
          {errorMsg && <p className="text-xs text-rose-400 font-bold">{errorMsg}</p>}
          <button type="submit" className="w-full py-2.5 bg-emerald-500 text-slate-950 font-black text-xs rounded-xl cursor-pointer">
            Unlock Admin Portal
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-white">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-white">Admin Command & MGR Sync Engine</h2>
          <p className="text-xs text-slate-400">Approve transaction queues, configure MGR webhooks, and manage organization parameters.</p>
        </div>
        <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase">
          Authorized Role: {currentUser.role}
        </span>
      </div>

      {/* MGR CROSS-APP WEBHOOK INTEGRATION PANEL */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded-3xl p-6 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-0.5 bg-teal-500/10 border border-teal-500/30 text-teal-400 rounded-full text-xs font-mono font-bold">
              <Radio size={14} className="animate-pulse" />
              <span>MGR Rotation Engine Webhook Bus</span>
            </div>
            <h3 className="text-lg font-black text-white mt-1">Cross-App Synchronization Settings</h3>
          </div>

          <button
            onClick={handleTestWebhookDispatch}
            disabled={testingWebhook}
            className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs rounded-xl transition shadow-md cursor-pointer flex items-center justify-center gap-2"
          >
            <Server size={14} />
            <span>{testingWebhook ? 'Dispatching Test Payload...' : 'Trigger Test Webhook Dispatch'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Webhook Configuration Form */}
          <form onSubmit={handleSaveWebhookConfig} className="space-y-4 bg-slate-950 p-5 rounded-2xl border border-slate-800">
            <h4 className="text-xs font-mono font-bold text-slate-300 uppercase">Webhook Endpoint Details</h4>

            <div>
              <label className="block text-[10px] font-mono text-slate-400 uppercase font-bold mb-1">MGR Webhook Endpoint URL</label>
              <input
                type="text"
                value={webhookConfig.endpointUrl}
                onChange={e => setWebhookConfigState({ ...webhookConfig, endpointUrl: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono text-slate-400 uppercase font-bold mb-1">HMAC Secret Signing Key</label>
              <input
                type="password"
                value={webhookConfig.secretKey}
                onChange={e => setWebhookConfigState({ ...webhookConfig, secretKey: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition cursor-pointer"
              >
                Save Webhook Parameters
              </button>
            </div>
          </form>

          {/* Webhook Dispatch Log Table */}
          <div className="space-y-3 bg-slate-950 p-5 rounded-2xl border border-slate-800">
            <h4 className="text-xs font-mono font-bold text-slate-300 uppercase flex justify-between items-center">
              <span>Real-Time Dispatch Event Audit Logs</span>
              <span className="text-emerald-400 font-bold">{webhookLogs.length} Events</span>
            </h4>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {webhookLogs.map(log => (
                <div key={log.id} className="p-2.5 bg-slate-900 rounded-xl border border-slate-800/80 flex justify-between items-center font-mono text-xs">
                  <div>
                    <span className="block font-bold text-white">{log.event}</span>
                    <span className="text-[9px] text-slate-500">{log.timestamp}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    log.status === 'Success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                  }`}>
                    {log.responseCode} {log.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* TRANSACTION QUEUE APPROVALS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800/80 shadow-xl space-y-4">
          <h3 className="font-extrabold text-sm text-white">Pending Cash Savings Approvals (Treasurer)</h3>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {pendingCashCon.map(c => (
              <div key={c.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                <div>
                  <span className="block font-bold text-white text-xs">{c.memberName}</span>
                  <span className="block text-[10px] text-emerald-400 font-mono font-bold">KES {c.amount.toLocaleString()}</span>
                </div>
                <button
                  onClick={() => onApproveContribution(c.id, currentUser.id)}
                  className="px-3 py-1 bg-emerald-500 text-slate-950 font-black text-xs rounded-lg shadow-md glow-emerald cursor-pointer"
                >
                  Approve Cash
                </button>
              </div>
            ))}
            {pendingCashCon.length === 0 && <p className="text-xs text-slate-500 text-center py-4">No cash deposits pending.</p>}
          </div>
        </div>

        <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800/80 shadow-xl space-y-4">
          <h3 className="font-extrabold text-sm text-white">Pending Loan Applications (Chairman)</h3>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {pendingLoansList.map(l => (
              <div key={l.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                <div>
                  <span className="block font-bold text-white text-xs">{l.memberName}</span>
                  <span className="block text-[10px] text-rose-400 font-mono font-bold">KES {l.amount.toLocaleString()}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => onRejectLoan(l.id)}
                    className="px-2.5 py-1 bg-slate-800 text-slate-300 font-bold text-xs rounded-lg cursor-pointer"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => onApproveLoan(l.id)}
                    className="px-3 py-1 bg-emerald-500 text-slate-950 font-black text-xs rounded-lg shadow-md glow-emerald cursor-pointer"
                  >
                    Approve Credit
                  </button>
                </div>
              </div>
            ))}
            {pendingLoansList.length === 0 && <p className="text-xs text-slate-500 text-center py-4">No pending loan requests.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};
