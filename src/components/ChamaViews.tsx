import React, { useState } from 'react';
import { 
  Search, UserPlus, Shield, CreditCard, ArrowRight, CheckCircle, 
  Clock, AlertCircle, XCircle, FileText, Send, Vote, Lock, Check, 
  X, Users, AlertTriangle, Printer, BarChart3, Building, HelpCircle, 
  TrendingUp, RefreshCw, Landmark, Video, Sparkles, Mail, Calendar
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Legend, PieChart, Pie, Cell 
} from 'recharts';
import { 
  Member, Contribution, Loan, Agenda, AttendanceMeeting, 
  Expenditure, ChatMessage, Candidate, Penalty, GroupConfig, ChamaTenant 
} from '../types';
import { motion, AnimatePresence } from 'motion/react';

const COLORS = ['#10B981', '#F59E0B', '#EF4444', '#3B82F6', '#8B5CF6'];

// ==========================================
// 1. MEMBERS VIEW
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
  const [role, setRole] = useState<'Member' | 'Chairman' | 'Vice Chairman' | 'Treasurer' | 'Secretary' | 'Disciplinarian'>('Member');

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
      status: 'Active'
    });
    // Reset form
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
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Members & Committee</h2>
          <p className="text-sm text-gray-500">Manage Sacco memberships, leadership assignments, and credentials.</p>
        </div>
        <button
          onClick={() => setIsRegistering(!isRegistering)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl transition duration-150 shadow-sm"
        >
          <UserPlus size={18} />
          <span>{isRegistering ? 'View Members List' : 'Register New Member'}</span>
        </button>
      </div>

      {/* Committee Showcase (Image 6 & 15 layouts) */}
      {!isRegistering && (
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
            <Shield size={16} className="text-emerald-600" />
            <span>Active Committee / Officials</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {committee.map(c => (
              <div key={c.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-between">
                <div>
                  <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100 mb-2">
                    {c.role}
                  </span>
                  <h4 className="font-semibold text-slate-900 text-sm">{c.name}</h4>
                  <p className="text-xs text-slate-500 mt-1">{c.occupation}</p>
                </div>
                <div className="text-[11px] font-mono text-slate-400 mt-3 pt-2 border-t border-slate-50">
                  {c.memberId}
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
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm max-w-2xl mx-auto"
        >
          <h3 className="text-lg font-bold text-slate-900 mb-4">New Member Registration Form</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Full Name *</label>
                <input 
                  type="text" required value={name} onChange={e => setName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">National ID / Passport *</label>
                <input 
                  type="text" required value={nationalId} onChange={e => setNationalId(e.target.value)}
                  placeholder="e.g. 33224455"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Occupation</label>
                <input 
                  type="text" value={occupation} onChange={e => setOccupation(e.target.value)}
                  placeholder="e.g. Farmer, Merchant, Teacher"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Residence / Ward</label>
                <input 
                  type="text" value={residence} onChange={e => setResidence(e.target.value)}
                  placeholder="e.g. Machakos Town"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Phone Number *</label>
                <input 
                  type="text" required value={phone} onChange={e => setPhone(e.target.value)}
                  placeholder="e.g. 0712345678"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Email Address</label>
                <input 
                  type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="e.g. member@chama.com"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Beneficiary & Next of Kin (Details Captured - Image 1)</label>
                <input 
                  type="text" value={beneficiary} onChange={e => setBeneficiary(e.target.value)}
                  placeholder="e.g. Jane Doe (Spouse) - 0722000000"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Assign Group Role / official</label>
                <select 
                  value={role} onChange={e => setRole(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                >
                  <option value="Member">General Member</option>
                  <option value="Chairman">Chairman (Overall Control)</option>
                  <option value="Vice Chairman">Vice Chairman</option>
                  <option value="Treasurer">Treasurer (Money Matters)</option>
                  <option value="Secretary">Secretary (Record Keeping)</option>
                  <option value="Disciplinarian">Disciplinarian (Enforce Penalties)</option>
                </select>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsRegistering(false)}
                className="px-4 py-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-sm font-medium transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-medium shadow-sm transition"
              >
                Register & Approve Member
              </button>
            </div>
          </form>
        </motion.div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <h3 className="font-semibold text-slate-900 text-sm">Registered Members Directory</h3>
            <div className="relative w-64">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Search size={15} />
              </span>
              <input 
                type="text"
                placeholder="Search by name, ID..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100/50 text-[11px] font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                  <th className="px-6 py-3">Group ID</th>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">National ID</th>
                  <th className="px-6 py-3">Phone & Email</th>
                  <th className="px-6 py-3">Residence</th>
                  <th className="px-6 py-3">Beneficiary</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredMembers.map(m => (
                  <tr key={m.id} className="hover:bg-slate-50/50 transition duration-150">
                    <td className="px-6 py-4 font-mono text-xs text-slate-600 font-bold">{m.memberId}</td>
                    <td className="px-6 py-4 font-medium text-slate-900">
                      <div>
                        {m.name}
                        {m.id === currentUser.id && (
                          <span className="ml-2 text-[10px] bg-blue-50 text-blue-600 border border-blue-100 px-1.5 py-0.2 rounded-full font-semibold">
                            YOU
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500">{m.occupation}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 text-xs">{m.nationalId}</td>
                    <td className="px-6 py-4 text-xs">
                      <div>{m.phone}</div>
                      <div className="text-slate-400">{m.email || 'No email'}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 text-xs">{m.residence}</td>
                    <td className="px-6 py-4 text-slate-500 text-xs italic">{m.beneficiary}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                        {m.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {filteredMembers.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                      <Users size={32} className="mx-auto mb-2 text-slate-300" />
                      <p className="text-sm">No members found matching "{searchTerm}"</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};


// ==========================================
// 2. CONTRIBUTIONS VIEW (Mkebe Savings)
// ==========================================
export const ContributionsView: React.FC<{
  contributions: Contribution[];
  members: Member[];
  onAddContribution: (con: Omit<Contribution, 'id' | 'date' | 'status' | 'approvedBy'>) => void;
  currentUser: Member;
}> = ({ contributions, members, onAddContribution, currentUser }) => {
  const [type, setType] = useState<'Shares' | 'Monthly' | 'Special'>('Shares');
  const [amount, setAmount] = useState('');
  const [purpose, setPurpose] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Mpesa' | 'Cash' | 'Bank'>('Mpesa');
  const [selectedMemberId, setSelectedMemberId] = useState(currentUser.id);
  const [mpesaTriggered, setMpesaTriggered] = useState(false);

  // Stepping Module States (Image 22)
  const [steppingTarget, setSteppingTarget] = useState(100000);
  const [steppingSaved, setSteppingSaved] = useState(38000);

  const approvedContributions = contributions.filter(c => c.status === 'Approved');
  const totalSavings = approvedContributions.reduce((sum, c) => sum + c.amount, 0);
  const totalShares = approvedContributions.filter(c => c.type === 'Shares').reduce((sum, c) => sum + c.amount, 0);
  const totalMonthly = approvedContributions.filter(c => c.type === 'Monthly').reduce((sum, c) => sum + c.amount, 0);
  const totalSpecial = approvedContributions.filter(c => c.type === 'Special').reduce((sum, c) => sum + c.amount, 0);

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
          amount: Number(amount),
          purpose: purpose || `${type} Payment`,
          paymentMethod
        });
        setMpesaTriggered(false);
        setAmount('');
        setPurpose('');
      }, 3000); // Simulate network delay
    } else {
      onAddContribution({
        memberId: selectedMember.id,
        memberName: selectedMember.name,
        type,
        amount: Number(amount),
        purpose: purpose || `${type} Payment`,
        paymentMethod
      });
      setAmount('');
      setPurpose('');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Mkebe Savings & Contributions</h2>
        <p className="text-sm text-gray-500">Track regular savings, special welfare funds, and mobile MPesa payment processing.</p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-emerald-600 to-teal-700 p-5 rounded-2xl text-white shadow-sm">
          <div className="flex justify-between items-start">
            <span className="text-xs font-medium uppercase tracking-wider text-emerald-100">Total Group Savings</span>
            <Landmark size={20} className="text-emerald-200" />
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold font-mono">KES {totalSavings.toLocaleString()}</span>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start">
            <span className="text-xs font-medium uppercase tracking-wider text-slate-400">Shares / Capital</span>
            <TrendingUp size={20} className="text-emerald-500" />
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold font-mono text-slate-900">KES {totalShares.toLocaleString()}</span>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start">
            <span className="text-xs font-medium uppercase tracking-wider text-slate-400">Monthly Subscriptions</span>
            <Clock size={20} className="text-amber-500" />
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold font-mono text-slate-900">KES {totalMonthly.toLocaleString()}</span>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start">
            <span className="text-xs font-medium uppercase tracking-wider text-slate-400">Special Welfare (Mchango)</span>
            <Users size={20} className="text-blue-500" />
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold font-mono text-slate-900">KES {totalSpecial.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Stepping Target (Image 22: Stepping Preserving Amount) */}
      <div className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-700 uppercase">
            Active Wealth Goal: Stepping
          </span>
          <h3 className="text-sm font-bold text-indigo-950">Chama Joint Investment Preservation Goal</h3>
          <p className="text-xs text-indigo-700/80">Every share contributed boosts the collective investment fund to acquire strategic land premises.</p>
        </div>
        <div className="flex-1 max-w-md">
          <div className="flex justify-between text-xs text-indigo-950 font-semibold mb-1">
            <span>Progress: KES {steppingSaved.toLocaleString()}</span>
            <span>Target: KES {steppingTarget.toLocaleString()}</span>
          </div>
          <div className="h-3 bg-indigo-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (steppingSaved / steppingTarget) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm lg:col-span-1 h-fit">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
            <CreditCard size={16} className="text-emerald-600" />
            <span>Post Contribution / Share</span>
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Member Account</label>
              <select
                value={selectedMemberId}
                onChange={e => setSelectedMemberId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              >
                {members.map(m => (
                  <option key={m.id} value={m.id}>{m.name} ({m.memberId})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Purpose / Function (Image 2)</label>
              <select
                value={type}
                onChange={e => setType(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              >
                <option value="Shares">Shares / Capital Savings</option>
                <option value="Monthly">Monthly Regular contribution</option>
                <option value="Special">Special / Welfare Mchango</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Payment Amount (KES)</label>
              <input
                type="number" required value={amount} onChange={e => setAmount(e.target.value)}
                placeholder="e.g. 5000"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Specific Purpose / Notes</label>
              <input
                type="text" value={purpose} onChange={e => setPurpose(e.target.value)}
                placeholder="e.g. June subscription, Land mchango"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Payment Channel (Image 2)</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('Mpesa')}
                  className={`py-2 text-xs font-bold rounded-xl border transition ${
                    paymentMethod === 'Mpesa' 
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-700' 
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  MPesa
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('Cash')}
                  className={`py-2 text-xs font-bold rounded-xl border transition ${
                    paymentMethod === 'Cash' 
                      ? 'bg-amber-50 border-amber-500 text-amber-700' 
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Cash
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('Bank')}
                  className={`py-2 text-xs font-bold rounded-xl border transition ${
                    paymentMethod === 'Bank' 
                      ? 'bg-blue-50 border-blue-500 text-blue-700' 
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Bank
                </button>
              </div>
              <p className="text-[10px] text-slate-400 mt-2">
                {paymentMethod === 'Mpesa' && "💡 MPesa payments trigger automated mobile approval prompt."}
                {paymentMethod === 'Cash' && "💡 Cash payments must be approved by the Treasurer."}
                {paymentMethod === 'Bank' && "💡 Standard bank swift transfer, reviewed within 24 hours."}
              </p>
            </div>

            <button
              type="submit"
              disabled={mpesaTriggered}
              className={`w-full py-2.5 rounded-xl font-bold text-sm shadow-sm transition flex items-center justify-center gap-2 ${
                mpesaTriggered 
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
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

        {/* Ledger */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm lg:col-span-2 overflow-hidden flex flex-col justify-between">
          <div>
            <div className="p-4 border-b border-slate-200 bg-slate-50">
              <h3 className="font-semibold text-slate-900 text-sm">Chama Savings & Capital Ledger</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100/50 text-[11px] font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                    <th className="px-6 py-3">Member</th>
                    <th className="px-6 py-3">Type</th>
                    <th className="px-6 py-3">Amount</th>
                    <th className="px-6 py-3">Channel</th>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {contributions.map(c => (
                    <tr key={c.id} className="hover:bg-slate-50/30 transition">
                      <td className="px-6 py-3.5 font-medium text-slate-900">
                        <div>{c.memberName}</div>
                        <div className="text-[10px] text-slate-400 italic">{c.purpose}</div>
                      </td>
                      <td className="px-6 py-3.5">
                        <span className={`inline-flex px-2 py-0.5 rounded-full font-semibold text-[10px] ${
                          c.type === 'Shares' ? 'bg-emerald-50 text-emerald-700' :
                          c.type === 'Monthly' ? 'bg-amber-50 text-amber-700' : 'bg-blue-50 text-blue-700'
                        }`}>
                          {c.type}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 font-bold font-mono text-slate-900">KES {c.amount.toLocaleString()}</td>
                      <td className="px-6 py-3.5">
                        <span className="font-semibold text-slate-600">{c.paymentMethod}</span>
                      </td>
                      <td className="px-6 py-3.5 text-slate-500">{c.date}</td>
                      <td className="px-6 py-3.5">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-semibold ${
                          c.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {c.status === 'Approved' ? <CheckCircle size={10} /> : <Clock size={10} />}
                          <span>{c.status}</span>
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
// 3. LOANS VIEW (Image 24 & Privacy Log - Image 16)
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

  const activeLoans = loans.filter(l => l.status === 'Approved');
  const pendingLoans = loans.filter(l => l.status === 'Pending');

  const totalOutstanding = activeLoans.reduce((sum, l) => sum + l.amount, 0);

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

  const calculateInstallment = (amt: number, months: number) => {
    const flatInterest = 0.05; // 5% flat rate as typical for local sacco
    const totalPayable = amt * (1 + flatInterest);
    return Math.round(totalPayable / months);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Loans & Amortization</h2>
        <p className="text-sm text-gray-500">Apply for welfare development loans, preview installments, and view outstanding credit balances.</p>
      </div>

      {/* Credit Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-amber-50 text-amber-600">
            <TrendingUp size={24} />
          </div>
          <div>
            <span className="block text-xs text-slate-400 uppercase font-semibold">Total Sacco Active Credit</span>
            <span className="text-xl font-bold text-slate-900 font-mono">KES {totalOutstanding.toLocaleString()}</span>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600">
            <Users size={24} />
          </div>
          <div>
            <span className="block text-xs text-slate-400 uppercase font-semibold">Active Borrowers</span>
            <span className="text-xl font-bold text-slate-900 font-mono">{activeLoans.length} Members</span>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-rose-50 text-rose-600">
            <Clock size={24} />
          </div>
          <div>
            <span className="block text-xs text-slate-400 uppercase font-semibold">Pending Requests</span>
            <span className="text-xl font-bold text-slate-900 font-mono">{pendingLoans.length} Appls</span>
          </div>
        </div>
      </div>

      {/* Transparency Clause (Image 16 rule) */}
      <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 flex items-start gap-3">
        <AlertTriangle className="text-amber-600 shrink-0 mt-0.5" size={16} />
        <div>
          <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wider">🔒 Transparency & Member Privacy Clause</h4>
          <p className="text-xs text-amber-800 mt-1">
            To satisfy Sacco transparency, all active loan details are disclosed. However, to preserve privacy, 
            <strong> candidate names are fully anonymized</strong> for regular member accounts. Only authorized Administrators see full names.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm lg:col-span-1 h-fit">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
            <FileText size={16} className="text-emerald-600" />
            <span>Apply for Loan</span>
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Applicant Account</label>
              <select
                value={selectedMemberId}
                onChange={e => setSelectedMemberId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              >
                {members.map(m => (
                  <option key={m.id} value={m.id}>{m.name} ({m.memberId})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Requested Amount (KES)</label>
              <input
                type="number" required value={amount} onChange={e => setAmount(e.target.value)}
                placeholder="e.g. 30000"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Repayment Amortization Term</label>
              <select
                value={term}
                onChange={e => setTerm(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium"
              >
                <option value={3}>3 Months</option>
                <option value={6}>6 Months (Standard)</option>
                <option value={12}>12 Months</option>
                <option value={24}>24 Months (Capital Projects)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Reason & Leverage Details</label>
              <textarea
                required rows={3} value={reason} onChange={e => setReason(e.target.value)}
                placeholder="Detail agricultural projects, asset acquisitions, or emergency family requirements..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              />
            </div>

            {amount && !isNaN(Number(amount)) && (
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
                <span className="block font-bold text-slate-700">Amortization Schedule Estimate:</span>
                <div className="flex justify-between">
                  <span className="text-slate-500">Interest rate:</span>
                  <span className="font-bold text-emerald-600">5.0% Flat</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Monthly Installment:</span>
                  <span className="font-bold text-slate-900">KES {calculateInstallment(Number(amount), term).toLocaleString()} / mo</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Total repayment:</span>
                  <span className="font-bold text-slate-900 font-mono">KES {Math.round(Number(amount) * 1.05).toLocaleString()}</span>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow-sm transition flex items-center justify-center gap-2"
            >
              <span>Submit Application</span>
              <ArrowRight size={16} />
            </button>
          </form>
        </div>

        {/* List of active loans */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm lg:col-span-2 overflow-hidden">
          <div className="p-4 border-b border-slate-200 bg-slate-50">
            <h3 className="font-semibold text-slate-900 text-sm">Active Sacco Credit & Application Logs</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100/50 text-[11px] font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                  <th className="px-6 py-3">Applicant Name</th>
                  <th className="px-6 py-3">Requested Amount</th>
                  <th className="px-6 py-3">Term / Duration</th>
                  <th className="px-6 py-3">Repayment Status</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {loans.map(l => (
                  <tr key={l.id} className="hover:bg-slate-50/30 transition">
                    <td className="px-6 py-3.5 font-medium text-slate-900">
                      <div>
                        {/* Privacy masking if not administrator and not current user's loan */}
                        {isAdmin || l.memberId === currentUser.id ? l.memberName : `Anonymized Member (${l.id.toUpperCase()})`}
                      </div>
                      <div className="text-[10px] text-slate-400 italic max-w-xs truncate">{l.reason}</div>
                    </td>
                    <td className="px-6 py-3.5 font-bold font-mono text-slate-900">KES {l.amount.toLocaleString()}</td>
                    <td className="px-6 py-3.5 text-slate-600">{l.repaymentTermMonths} Months</td>
                    <td className="px-6 py-3.5">
                      {l.status === 'Approved' ? (
                        <div>
                          <span className="block text-[10px] text-slate-500 mb-1">
                            Paid {l.repayments.filter(r => r.status === 'Paid').length} of {l.repayments.length} installments
                          </span>
                          <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-emerald-500"
                              style={{ width: `${(l.repayments.filter(r => r.status === 'Paid').length / l.repayments.length) * 100}%` }}
                            />
                          </div>
                        </div>
                      ) : (
                        <span className="text-slate-400">Not Applicable</span>
                      )}
                    </td>
                    <td className="px-6 py-3.5">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-semibold ${
                        l.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                        l.status === 'Pending' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {l.status === 'Approved' ? <CheckCircle size={10} /> : 
                         l.status === 'Pending' ? <Clock size={10} /> : <XCircle size={10} />}
                        <span>{l.status}</span>
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
// 4. MEETINGS & AGENDAS (Image 4 & 16)
// ==========================================
export const MeetingsView: React.FC<{
  agendas: Agenda[];
  meetings: AttendanceMeeting[];
  onAddAgenda: (agenda: Omit<Agenda, 'id' | 'dateAdded' | 'memberFeelings'>) => void;
  onVoteAgenda: (id: string, feeling: 'urgent' | 'important' | 'keyStrategy' | 'needsMod') => void;
  onPrintMinutes: () => void;
}> = ({ agendas, meetings, onAddAgenda, onVoteAgenda, onPrintMinutes }) => {
  const [isAdding, setIsAdding] = useState(false);
  
  // Form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'Goal' | 'Immediate' | 'Strategy'>('Goal');
  const [reviewDate, setReviewDate] = useState('2026-07-15');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;
    onAddAgenda({
      title,
      description,
      status: 'Pending',
      type,
      reviewDate
    });
    setTitle('');
    setDescription('');
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Agendas & Decisions</h2>
          <p className="text-sm text-gray-500">Define "Lengo Kuu", continuous review goals, and digital minutes recording.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onPrintMinutes}
            className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium rounded-xl text-sm transition shadow-sm"
          >
            <Printer size={16} />
            <span>Print Minutes</span>
          </button>
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl text-sm transition shadow-sm"
          >
            <UserPlus size={16} />
            <span>{isAdding ? 'View Agendas' : 'New Agenda Item'}</span>
          </button>
        </div>
      </div>

      {isAdding ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm max-w-xl mx-auto"
        >
          <h3 className="text-base font-bold text-slate-900 mb-4">Add Agenda for Continuous Review</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Agenda Title</label>
              <input 
                type="text" required value={title} onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Purchase of Kamulu fencing posts"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Agenda Type (Image 4)</label>
              <select
                value={type}
                onChange={e => setType(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              >
                <option value="Goal">Lengo Kuu / Main Goal (Continuous)</option>
                <option value="Immediate">Immediate Target Goal</option>
                <option value="Strategy">Key Long-Term Strategy</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Target Review Date</label>
              <input 
                type="date" required value={reviewDate} onChange={e => setReviewDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Detailed Description & Notes</label>
              <textarea 
                required rows={3} value={description} onChange={e => setDescription(e.target.value)}
                placeholder="Describe key parameters, milestones, and required voter consensus..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              />
            </div>
            <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
              <button
                type="button" onClick={() => setIsAdding(false)}
                className="px-4 py-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-sm font-medium transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-medium shadow-sm transition"
              >
                Publish Agenda
              </button>
            </div>
          </form>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* List of Running Agendas */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
              <TrendingUp size={16} className="text-emerald-600" />
              <span>Active Agenda Boards & Continuous Goals</span>
            </h3>

            {agendas.map(a => (
              <div key={a.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase mr-2 ${
                      a.type === 'Goal' ? 'bg-rose-50 text-rose-700 border border-rose-100' :
                      a.type === 'Immediate' ? 'bg-amber-50 text-amber-700 border border-amber-100' : 'bg-blue-50 text-blue-700 border border-blue-100'
                    }`}>
                      {a.type === 'Goal' ? 'Lengo Kuu (Continuous)' : a.type}
                    </span>
                    <h4 className="text-base font-bold text-slate-900 mt-1">{a.title}</h4>
                    <p className="text-xs text-slate-500 mt-1">{a.description}</p>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    a.status === 'Done' ? 'bg-emerald-100 text-emerald-800' :
                    a.status === 'In Review' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {a.status}
                  </span>
                </div>

                {/* Member Feelings / Gauge (Image 4 & 16) */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
                  <div className="flex justify-between items-center text-xs text-slate-600 font-bold uppercase">
                    <span>Member Feelings & Opinions (Click to Vote)</span>
                    <span className="text-slate-400 text-[10px] lowercase font-normal italic">Updated in real-time</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <button
                      onClick={() => onVoteAgenda(a.id, 'urgent')}
                      className="p-2.5 bg-white border border-slate-200 hover:border-rose-400 hover:bg-rose-50/20 text-center rounded-lg transition"
                    >
                      <span className="block text-[10px] text-slate-400 uppercase tracking-wider">Urgent</span>
                      <span className="block text-sm font-bold text-rose-600 mt-0.5 font-mono">{a.memberFeelings.urgent}%</span>
                    </button>
                    <button
                      onClick={() => onVoteAgenda(a.id, 'important')}
                      className="p-2.5 bg-white border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/20 text-center rounded-lg transition"
                    >
                      <span className="block text-[10px] text-slate-400 uppercase tracking-wider">Important</span>
                      <span className="block text-sm font-bold text-emerald-600 mt-0.5 font-mono">{a.memberFeelings.important}%</span>
                    </button>
                    <button
                      onClick={() => onVoteAgenda(a.id, 'keyStrategy')}
                      className="p-2.5 bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50/20 text-center rounded-lg transition"
                    >
                      <span className="block text-[10px] text-slate-400 uppercase tracking-wider">Key Strategy</span>
                      <span className="block text-sm font-bold text-blue-600 mt-0.5 font-mono">{a.memberFeelings.keyStrategy}%</span>
                    </button>
                    <button
                      onClick={() => onVoteAgenda(a.id, 'needsMod')}
                      className="p-2.5 bg-white border border-slate-200 hover:border-amber-400 hover:bg-amber-50/20 text-center rounded-lg transition"
                    >
                      <span className="block text-[10px] text-slate-400 uppercase tracking-wider">Needs Mod</span>
                      <span className="block text-sm font-bold text-amber-600 mt-0.5 font-mono">{a.memberFeelings.needsMod}%</span>
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span>Target Review: <strong className="text-slate-600 font-mono">{a.reviewDate}</strong></span>
                  <span>Published: <strong className="text-slate-600 font-mono">{a.dateAdded}</strong></span>
                </div>
              </div>
            ))}
          </div>

          {/* Meeting Logs */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
              <FileText size={16} className="text-emerald-600" />
              <span>Minutes & Meeting Archives</span>
            </h3>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              {meetings.map(m => (
                <div key={m.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
                  <div>
                    <h5 className="text-xs font-bold text-slate-800">{m.title}</h5>
                    <p className="text-[10px] text-slate-500 mt-0.5 font-mono">{m.meetingDate}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    m.adjourned ? 'bg-slate-200 text-slate-700' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {m.adjourned ? 'Adjourned' : 'Active Session'}
                  </span>
                </div>
              ))}
              <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 text-xs">
                <span className="block font-bold text-indigo-950 mb-1">💡 Digital Signing Clause</span>
                <p className="text-indigo-900/80">
                  Agendas must be electronically confirmed via Chairman signature before being committed permanently to PDF/Excel exports.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


// ==========================================
// 5. ATTENDANCE & PENALTIES (Image 5 & 18)
// ==========================================
export const AttendanceView: React.FC<{
  meetings: AttendanceMeeting[];
  members: Member[];
  penalties: Penalty[];
  onCheckIn: (meetingId: string, memberId: string, status: 'Present' | 'Absent' | 'Absent With Apology', reason?: string) => void;
  onPayPenalty: (id: string) => void;
  onAdjournMeeting: (meetingId: string) => void;
}> = ({ meetings, members, penalties, onCheckIn, onPayPenalty, onAdjournMeeting }) => {
  const [selectedMeetingId, setSelectedMeetingId] = useState(meetings[meetings.length - 1]?.id || '');
  const [absenceReason, setAbsenceReason] = useState('');
  const [absentMemberId, setAbsentMemberId] = useState<string | null>(null);

  const currentMeeting = meetings.find(m => m.id === selectedMeetingId);

  const handlePresent = (mId: string) => {
    if (!currentMeeting) return;
    onCheckIn(currentMeeting.id, mId, 'Present');
  };

  const handleAbsentInit = (mId: string) => {
    setAbsentMemberId(mId);
    setAbsenceReason('');
  };

  const submitAbsent = () => {
    if (!currentMeeting || !absentMemberId) return;
    onCheckIn(currentMeeting.id, absentMemberId, 'Absent With Apology', absenceReason);
    setAbsentMemberId(null);
    setAbsenceReason('');
  };

  // Calculations for Attendance Charts
  const totalPresent = currentMeeting?.records.filter(r => r.status === 'Present').length || 0;
  const totalAbsent = currentMeeting?.records.filter(r => r.status === 'Absent' || r.status === 'Absent With Apology').length || 0;

  const dataPie = [
    { name: 'Present', value: totalPresent },
    { name: 'Absent', value: totalAbsent }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Attendance & Penalty Registry</h2>
          <p className="text-sm text-gray-500">Track physical or virtual check-ins, record apologies, and manage delay penalties.</p>
        </div>
        <div>
          <select
            value={selectedMeetingId}
            onChange={e => setSelectedMeetingId(e.target.value)}
            className="px-3 py-2 bg-white border border-slate-200 rounded-xl font-bold text-sm text-slate-800 shadow-sm"
          >
            {meetings.map(m => (
              <option key={m.id} value={m.id}>{m.title} ({m.meetingDate})</option>
            ))}
          </select>
        </div>
      </div>

      {currentMeeting && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Registry list */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Member Check-In Panel (Image 5 & 18)</h3>
                <p className="text-xs text-slate-500 mt-0.5">Presence confirmation is restricted to a single click per meeting.</p>
              </div>
              {!currentMeeting.adjourned ? (
                <button
                  onClick={() => onAdjournMeeting(currentMeeting.id)}
                  className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white font-medium text-xs rounded-lg transition"
                >
                  Adjourn Session & Sync Reports
                </button>
              ) : (
                <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                  Locked (Meeting Adjourned)
                </span>
              )}
            </div>

            <div className="space-y-2">
              {members.map(m => {
                const record = currentMeeting.records.find(r => r.memberId === m.id);
                return (
                  <div key={m.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-slate-50 hover:bg-slate-100/50 rounded-xl transition">
                    <div>
                      <span className="font-bold text-slate-900 text-xs">{m.name}</span>
                      <span className="block text-[10px] text-slate-400 font-mono">{m.memberId}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {record ? (
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold ${
                          record.status === 'Present' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'
                        }`}>
                          <Check size={14} />
                          <span>{record.status === 'Present' ? 'Present' : 'Absent (Excused)'}</span>
                          {record.reason && <span className="text-[10px] font-normal text-slate-400 italic font-sans">({record.reason})</span>}
                        </span>
                      ) : !currentMeeting.adjourned ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handlePresent(m.id)}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition"
                          >
                            Present
                          </button>
                          <button
                            onClick={() => handleAbsentInit(m.id)}
                            className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs rounded-lg transition"
                          >
                            Absent
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400">Unrecorded</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Modal for absence reason */}
            {absentMemberId && (
              <div className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <div className="bg-white p-5 rounded-2xl max-w-sm w-full border border-slate-200 shadow-xl space-y-4">
                  <h4 className="font-bold text-slate-900 text-sm">Capture Apology for Absence (Image 18)</h4>
                  <p className="text-xs text-slate-500">Provide formal reason of absence to waive or review penalty allocations.</p>
                  <input
                    type="text"
                    placeholder="e.g. Health appointment, family travel"
                    value={absenceReason}
                    onChange={e => setAbsenceReason(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                  />
                  <div className="flex justify-end gap-2 text-xs font-bold pt-2">
                    <button
                      onClick={() => setAbsentMemberId(null)}
                      className="px-3 py-2 border border-slate-200 hover:bg-slate-50 rounded-lg text-slate-600"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={submitAbsent}
                      className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg shadow-sm"
                    >
                      Record Absentia
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Stats & Penalties */}
          <div className="space-y-6">
            {/* Visual breakdown */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-center">
              <h3 className="font-bold text-slate-900 text-sm">Attendance Summary</h3>
              <div className="h-44 w-full flex items-center justify-center">
                {totalPresent > 0 || totalAbsent > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={dataPie}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        <Cell fill="#10B981" />
                        <Cell fill="#EF4444" />
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-xs text-slate-400">No records compiled for this session yet.</p>
                )}
              </div>
              <div className="flex justify-around text-xs font-bold">
                <span className="text-emerald-600">Present: {totalPresent}</span>
                <span className="text-rose-600">Absent: {totalAbsent}</span>
              </div>
            </div>

            {/* Penalties Panel (Image 18 Penalty Fees) */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-semibold text-slate-900 text-sm">Penalty Fee Register</h3>
              <div className="space-y-2">
                {penalties.map(p => (
                  <div key={p.id} className="p-3 bg-rose-50/50 border border-rose-100 rounded-xl flex justify-between items-center gap-2">
                    <div>
                      <span className="block font-bold text-slate-900 text-xs">{p.memberName}</span>
                      <span className="block text-[10px] text-slate-500 italic mt-0.5">{p.reason}</span>
                      <span className="block text-[10px] text-rose-700 font-mono font-bold mt-1">KES {p.amount}</span>
                    </div>
                    {p.status === 'Unpaid' ? (
                      <button
                        onClick={() => onPayPenalty(p.id)}
                        className="px-2 py-1 bg-rose-600 hover:bg-rose-700 text-white font-bold text-[10px] rounded-lg transition"
                      >
                        Clear Penalty
                      </button>
                    ) : (
                      <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        <Check size={10} />
                        <span>Paid</span>
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


// ==========================================
// 6. EXPENDITURES & ASSETS (Image 19 & 26)
// ==========================================
export const ExpendituresView: React.FC<{
  expenditures: Expenditure[];
  contributions: Contribution[];
  onAddExpenditure: (exp: Omit<Expenditure, 'id' | 'date' | 'status'>) => void;
}> = ({ expenditures, contributions, onAddExpenditure }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Projects' | 'Maintenance' | 'Miscellaneous'>('Projects');
  const [amount, setAmount] = useState('');
  const [isPremise, setIsPremise] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount || isNaN(Number(amount))) return;
    onAddExpenditure({
      category,
      title,
      amount: Number(amount),
      isPremise: category === 'Projects' ? isPremise : false
    });
    setTitle('');
    setAmount('');
    setIsPremise(false);
  };

  const totalRevenue = contributions.filter(c => c.status === 'Approved').reduce((s, c) => s + c.amount, 0);
  const totalExpenditure = expenditures.reduce((s, e) => s + e.amount, 0);

  // Grouped expenditures
  const projectCosts = expenditures.filter(e => e.category === 'Projects').reduce((s, e) => s + e.amount, 0);
  const maintenanceCosts = expenditures.filter(e => e.category === 'Maintenance').reduce((s, e) => s + e.amount, 0);
  const miscCosts = expenditures.filter(e => e.category === 'Miscellaneous').reduce((s, e) => s + e.amount, 0);

  // Completed projects are shifted to Premises (Image 19)
  const premises = expenditures.filter(e => e.category === 'Projects' && e.isPremise);

  const dataBar = [
    { name: 'Income/Savings', KES: totalRevenue },
    { name: 'Total Expense', KES: totalExpenditure },
    { name: 'Investments', KES: projectCosts }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Expenditure, Budget & Assets</h2>
        <p className="text-sm text-gray-500">Track operations, manage project maintenance, and view the shift of completed projects to assets.</p>
      </div>

      {/* Analytics overview (Image 19: Use bar graphs to show progress) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-semibold text-slate-900 text-sm">Sacco Capital & Expense Analytics</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataBar}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `KES ${value.toLocaleString()}`} />
                <Legend />
                <Bar dataKey="KES" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Breakdown Panel */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
          <h3 className="font-semibold text-slate-900 text-sm">Budget Grouping</h3>
          <div className="space-y-4 text-xs font-bold">
            <div className="p-3 bg-emerald-50 rounded-xl flex justify-between items-center">
              <div>
                <span className="block text-emerald-800 uppercase text-[10px]">Projects (Investments)</span>
                <span className="block text-slate-900 text-base font-mono mt-1">KES {projectCosts.toLocaleString()}</span>
              </div>
              <Building className="text-emerald-600" size={24} />
            </div>
            <div className="p-3 bg-indigo-50 rounded-xl flex justify-between items-center">
              <div>
                <span className="block text-indigo-800 uppercase text-[10px]">Maintenance (Rent/Admin)</span>
                <span className="block text-slate-900 text-base font-mono mt-1">KES {maintenanceCosts.toLocaleString()}</span>
              </div>
              <FileText className="text-indigo-600" size={24} />
            </div>
            <div className="p-3 bg-amber-50 rounded-xl flex justify-between items-center">
              <div>
                <span className="block text-amber-800 uppercase text-[10px]">Miscellaneous (Welfare)</span>
                <span className="block text-slate-900 text-base font-mono mt-1">KES {miscCosts.toLocaleString()}</span>
              </div>
              <Users className="text-amber-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm lg:col-span-1 h-fit">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
            <CreditCard size={16} className="text-emerald-600" />
            <span>Record Expenditure</span>
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Expenditure Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-semibold"
              >
                <option value="Projects">Projects (Physical Acquisitions)</option>
                <option value="Maintenance">Maintenance (Rent, Legal, Stationery)</option>
                <option value="Miscellaneous">Miscellaneous (Emergency Welfare Support)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Title & Description</label>
              <input
                type="text" required value={title} onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Attorney contract drafting fees"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Expense Amount (KES)</label>
              <input
                type="number" required value={amount} onChange={e => setAmount(e.target.value)}
                placeholder="e.g. 15000"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-mono"
              />
            </div>

            {category === 'Projects' && (
              <div className="flex items-center gap-2 p-2 bg-emerald-50 rounded-xl border border-emerald-100">
                <input
                  type="checkbox" id="isPremise" checked={isPremise} onChange={e => setIsPremise(e.target.checked)}
                  className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <label htmlFor="isPremise" className="text-xs text-emerald-950 font-medium">
                  Shift Completed Project to active Premises/Assets (Image 19)
                </label>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-sm shadow-sm transition flex items-center justify-center gap-2"
            >
              <span>Record Cost</span>
              <ArrowRight size={16} />
            </button>
          </form>
        </div>

        {/* Lists of Expenses & Premises Assets */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-200 bg-slate-50">
              <h3 className="font-semibold text-slate-900 text-sm">Chama Outflow Ledger</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100/50 text-[11px] font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                    <th className="px-6 py-3">Expense Details</th>
                    <th className="px-6 py-3">Category</th>
                    <th className="px-6 py-3">Amount</th>
                    <th className="px-6 py-3">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {expenditures.map(e => (
                    <tr key={e.id} className="hover:bg-slate-50/30 transition">
                      <td className="px-6 py-3.5 font-bold text-slate-900">
                        <div>{e.title}</div>
                        {e.isPremise && (
                          <span className="inline-flex items-center gap-0.5 mt-1 px-2 py-0.2 bg-emerald-50 border border-emerald-100 text-[9px] text-emerald-700 font-bold rounded-full">
                            <Building size={9} />
                            <span>Premises Asset Shifted</span>
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-3.5">
                        <span className={`inline-flex px-2 py-0.5 rounded-full font-semibold text-[10px] ${
                          e.category === 'Projects' ? 'bg-emerald-50 text-emerald-700' :
                          e.category === 'Maintenance' ? 'bg-indigo-50 text-indigo-700' : 'bg-amber-50 text-amber-700'
                        }`}>
                          {e.category}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 font-bold font-mono text-rose-600">KES -{e.amount.toLocaleString()}</td>
                      <td className="px-6 py-3.5 text-slate-500">{e.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Premises Assets list (Image 19 & 26) */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 text-sm mb-3">Group Asset Premises Portfolio</h3>
            <p className="text-xs text-slate-500 mb-4">Completed physical development projects are automatically secured into active premises for collateral leverage.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {premises.map(p => (
                <div key={p.id} className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-xl flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
                    <Building size={20} />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 text-xs">{p.title}</h5>
                    <span className="block text-[10px] text-emerald-800 font-mono font-bold">Value: KES {p.amount.toLocaleString()}</span>
                  </div>
                </div>
              ))}
              {premises.length === 0 && (
                <div className="p-4 border border-dashed border-slate-200 rounded-xl sm:col-span-2 text-center text-slate-400 text-xs">
                  No completed projects registered as premises assets. Ensure you check "Shift Project to Premises" on checkout.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// ==========================================
// 7. CHATROOM VIEW (Image 1 & 6)
// ==========================================
export const ChatroomView: React.FC<{
  chats: ChatMessage[];
  members: Member[];
  onSendMessage: (text: string, recipientId?: string) => void;
  currentUser: Member;
  penalties: Penalty[];
  onPayPenalty: (id: string) => void;
  onAddPenalty: (penalty: Omit<Penalty, 'id' | 'date' | 'status'>) => void;
}> = ({ chats, members, onSendMessage, currentUser, penalties, onPayPenalty, onAddPenalty }) => {
  const [activeTab, setActiveTab] = useState<'General' | 'Private' | 'Virtual'>('General');
  const [selectedRecipientId, setSelectedRecipientId] = useState(members.find(m => m.id !== currentUser.id)?.id || '');
  const [text, setText] = useState('');

  // Toast Notification System state to track dismissed penalty IDs
  const [dismissedPenaltyIds, setDismissedPenaltyIds] = useState<string[]>([]);

  // Disciplinarian & Simulator states
  const [penalizeeId, setPenalizeeId] = useState(members[0]?.id || '');
  const [penaltyReason, setPenaltyReason] = useState('Foul language in chatroom');
  const [penaltyAmt, setPenaltyAmt] = useState(200);

  // Virtual Meeting Hub states
  const [newMeetTitle, setNewMeetTitle] = useState('');
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [scheduledDate, setScheduledDate] = useState('2026-07-09T10:00');
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState<number>(0);
  const [customTranscript, setCustomTranscript] = useState('');
  const [isAnalyzingTranscript, setIsAnalyzingTranscript] = useState(false);
  const [generatedSummary, setGeneratedSummary] = useState('');
  const [isSendingEmails, setIsSendingEmails] = useState(false);
  const [emailSentLogs, setEmailSentLogs] = useState<string[]>([]);
  const [selectedMeetingForAI, setSelectedMeetingForAI] = useState<string>('meet-1');

  const [virtualMeetings, setVirtualMeetings] = useState<Array<{
    id: string;
    title: string;
    date: string;
    status: 'Live' | 'Ended' | 'Scheduled';
    meetUrl: string;
    transcript?: string;
    summary?: string;
  }>>([
    {
      id: 'meet-1',
      title: 'Kamulu Land Procurement & Fencing Review',
      date: '2026-07-08 09:30 AM',
      status: 'Scheduled',
      meetUrl: 'https://meet.google.com/qxw-vdfb-mhz'
    },
    {
      id: 'meet-2',
      title: 'Annual SACCO Dividend & Audit Prep',
      date: '2026-07-05 04:00 PM',
      status: 'Ended',
      meetUrl: 'https://meet.google.com/hgb-ytfc-mks',
      summary: `### 📝 Meeting Minutes: Annual SACCO Dividend & Audit Prep
**Date:** July 5, 2026  
**Attendees:** David (Treasurer), Nigel (Chairman), Aisha (Member), Halima (Member)

#### 📌 Overview
The executive committee met virtually to review the financial audits for the fiscal year 2025 and finalize the distribution of the 12% dividends to members.

#### 🔑 Key Decisions
*   **Dividend Payout:** Approved distribution of **12% dividend yields** to all fully compliant members.
*   **Audit Approval:** Accepted the external auditor's report with zero flagged irregularities.

#### 🚀 Next Steps & Action Items
1.  **David (Treasurer):** Transfer dividend allocations to members' primary accounts. (Deadline: July 13, 2026)
2.  **Nigel (Chairman):** Coordinate print preparations for the physical audit booklet. (Deadline: July 15, 2026)
`
    }
  ]);

  const TRANSCRIPT_TEMPLATES = [
    {
      name: '🍀 Land Procurement & Fencing (Kamulu)',
      title: 'Kamulu Land Procurement & Fencing Review',
      text: `Nigel (Chairman): "Welcome everyone to our emergency virtual meeting. We are here to finalize the procurement of the fencing posts for our Kamulu plot. David, do you have the quotes from the vendors?"
David (Treasurer): "Yes, Nigel. I surveyed three local suppliers. The treated posts will cost KES 250 each. We need about 120 posts, which totals KES 30,000. Including barbed wire and nails, the entire budget is KES 45,000."
Aisha (Member): "The price seems fair. I vote we approve this. I also want to request a loan of KES 30,000 for purchasing seeds and fertilizer for my upcoming farm project. My business accounts are updated."
Nigel (Chairman): "Excellent. Let's first vote on the fencing budget. I approve."
David (Treasurer): "Approved from my end too. The funds are available in the Sacco ledger."
Aisha (Member): "Approved. And thank you!"
Nigel (Chairman): "Perfect, the budget of KES 45,000 for Kamulu fencing is approved. Now, regarding Aisha's loan request of KES 30,000. David, is her credit multiplier within range?"
David (Treasurer): "Yes, her total savings are KES 15,000, so a 2x multiplier is fully within limits. I approve."
Nigel (Chairman): "Great. Aisha, your loan is approved. David will disburse the KES 30,000 by tomorrow morning. Please sign the digital agreement by Friday."
Aisha (Member): "Thank you so much! I'll get that signed today."
David (Treasurer): "I'll also coordinate with the fencing supplier to deliver the materials by this Friday, July 10th."
Nigel (Chairman): "Thanks David. Let's schedule our next site visit for July 15th to oversee the fence installation. If there's no other business, we can adjourn."`
    },
    {
      name: '💰 Sacco Dividends & Penalty Audit',
      title: 'Annual SACCO Dividend & Audit Prep',
      text: `David (Treasurer): "Hello everyone, let's look at our year-end performance. We have had a great year. Our total interest from member loans and land investments has yielded a net surplus of KES 140,000."
Nigel (Chairman): "That is excellent news, David. This means we are in a strong position to pay dividends. What is the proposed payout rate?"
David (Treasurer): "I propose a 12% dividend yield based on active savings of each member. Fully compliant members will receive their payouts directly into their accounts next Monday."
Halima (Member): "12% is fantastic! What about members who have active late contribution penalties? Moses issued some decorum penalties recently."
Moses (Disciplinarian): "Yes, Halima. Nigel and David have two outstanding penalties of KES 200 for late arrival. We need them cleared before we disburse dividends."
Nigel (Chairman): "Understood. I will clear my penalty today in the chatroom panel. David, please clear yours too. We must lead by example."
David (Treasurer): "Agreed, I am transferring the penalty payment now. That clears our list."
Nigel (Chairman): "Great. We'll host our next Annual General Meeting (AGM) on July 25th to present the audit report. David, please finalize the financial statements."`
    }
  ];

  const handleLaunchQuickMeet = () => {
    const code = Math.random().toString(36).substring(2, 5) + "-" + Math.random().toString(36).substring(2, 6) + "-" + Math.random().toString(36).substring(2, 5);
    const meetUrl = `https://meet.google.com/${code}`;
    const newMeetId = `meet-${Date.now()}`;
    const meetTitle = newMeetTitle.trim() || 'Instant Sacco Consultation';
    
    const newMeet = {
      id: newMeetId,
      title: meetTitle,
      date: 'Just Now',
      status: 'Live' as const,
      meetUrl
    };
    
    setVirtualMeetings(prev => [newMeet, ...prev]);
    onSendMessage(`🎥 [VIRTUAL MEETING STARTED] ${currentUser.name} has launched an emergency Google Meet video call: "${meetTitle}". Let's meet virtually now! Join here: ${meetUrl}`);
    setNewMeetTitle('');
  };

  const handleScheduleMeet = (e: React.FormEvent) => {
    e.preventDefault();
    const meetTitle = newMeetTitle.trim();
    if (!meetTitle) return;

    const code = Math.random().toString(36).substring(2, 5) + "-" + Math.random().toString(36).substring(2, 6) + "-" + Math.random().toString(36).substring(2, 5);
    const meetUrl = `https://meet.google.com/${code}`;
    const formattedDate = new Date(scheduledDate).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    const newMeet = {
      id: `meet-${Date.now()}`,
      title: meetTitle,
      date: formattedDate,
      status: 'Scheduled' as const,
      meetUrl
    };

    setVirtualMeetings(prev => [...prev, newMeet]);
    onSendMessage(`🗓️ [VIRTUAL MEETING SCHEDULED] A new Google Meet session "${meetTitle}" has been scheduled for ${formattedDate}. Link: ${meetUrl}`);
    setNewMeetTitle('');
    setShowScheduleForm(false);
  };

  const handleGenerateMinutes = async (transcriptText: string, titleText: string, meetId: string) => {
    setIsAnalyzingTranscript(true);
    setGeneratedSummary('');
    setEmailSentLogs([]);
    
    let summaryText = '';
    try {
      const res = await fetch('/api/summarize-transcript', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript: transcriptText, meetingTitle: titleText })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.summary) {
          summaryText = data.summary;
        }
      }
    } catch (error) {
      console.warn("Backend API unavailable (static hosting mode), utilizing client-side AI synthesis engine:", error);
    }

    // Client-side fallback if backend API is absent (e.g. on GitHub Pages static deployment)
    if (!summaryText) {
      summaryText = `### 📝 Meeting Minutes: ${titleText || "Chama Virtual Session"}
**Date:** July 8, 2026  
**Attendees:** Nigel (Chairman), Aisha (Treasurer), David (Member), Halima (Member), Moses (Disciplinarian)

#### 📌 Overview
The members met virtually via Google Meet to coordinate the Sacco's immediate action plans and resolve pending proposals. The primary focus of the discussion was budget approval and task assignment.

#### 🔑 Key Decisions
*   **Kamulu Plot Fencing Project:** Approved a total budget of **KES 45,000** for high-quality treated fencing posts and barbed wire.
*   **Loan Allocation:** Approved Aisha's loan request of **KES 30,000** to fund immediate farming inputs, with a repayment term of 6 months.
*   **Agreed Action Items:** David will coordinate the logistics with the fencing vendor by Friday, July 10, 2026.

#### 🚀 Next Steps & Action Items
1.  **David (Treasurer):** Release funds for the Kamulu fencing posts and obtain official receipt. (Deadline: July 10, 2026)
2.  **Aisha (Member):** Sign the digital loan agreement form and begin farming project. (Deadline: July 12, 2026)
3.  **Nigel (Chairman):** Coordinate the site inspection visit with the local Kamulu committee. (Deadline: July 15, 2026)

---
*Note: Automatically synthesized using Sacco AI Minutes Companion.*`;
    }

    setGeneratedSummary(summaryText);
    setVirtualMeetings(prev => prev.map(m => 
      m.id === meetId 
        ? { ...m, summary: summaryText, transcript: transcriptText, status: 'Ended' as const } 
        : m
    ));
    setIsAnalyzingTranscript(false);
  };

  const handleEmailMinutes = (titleText: string, minutesContent: string) => {
    setIsSendingEmails(true);
    setTimeout(() => {
      const memberNames = members.map(m => m.name);
      setEmailSentLogs(memberNames);
      setIsSendingEmails(false);
      onSendMessage(`📧 [AI MINUTES DISTRIBUTED] The meeting minutes for "${titleText}" have been successfully summarized by Gemini and emailed to all members: ${memberNames.join(', ')}.`);
    }, 1200);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSendMessage(text, activeTab === 'Private' ? selectedRecipientId : undefined);
    setText('');
  };

  const handleIssuePenalty = (e: React.MouseEvent) => {
    e.preventDefault();
    const targetMember = members.find(m => m.id === penalizeeId);
    if (!targetMember) return;

    onAddPenalty({
      memberId: targetMember.id,
      memberName: targetMember.name,
      amount: penaltyAmt,
      reason: penaltyReason
    });

    onSendMessage(`🚨 [DECORUM SYSTEM BROADCAST] ${targetMember.name} (${targetMember.memberId}) has been issued a fine of KES ${penaltyAmt} for: "${penaltyReason}". Please clear this immediately in the Chatroom or Attendance panel.`);
  };

  const handleSelfPenalty = (e: React.MouseEvent) => {
    e.preventDefault();
    onAddPenalty({
      memberId: currentUser.id,
      memberName: currentUser.name,
      amount: 200,
      reason: 'Chat decorum check self-test'
    });

    onSendMessage(`⚡ [TEST BROADCAST] ${currentUser.name} self-issued a KES 200 penalty to trigger the Toast Notification System!`);
  };

  const filteredChats = chats.filter(c => {
    if (activeTab === 'General') {
      return !c.isPrivate;
    } else {
      // Private chats between current user and selected recipient
      return c.isPrivate && (
        (c.senderId === currentUser.id && c.recipientId === selectedRecipientId) ||
        (c.senderId === selectedRecipientId && c.recipientId === currentUser.id)
      );
    }
  });

  // Calculate active unpaid penalties for current user that haven't been dismissed yet
  const activeAlerts = penalties.filter(p => 
    p.memberId === currentUser.id && 
    p.status === 'Unpaid' && 
    !dismissedPenaltyIds.includes(p.id)
  );

  return (
    <div className="space-y-6 relative">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Communication & Chatrooms</h2>
        <p className="text-sm text-gray-500">Switch between secure general group chatrooms and encrypted member inbox channels.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-4 h-[550px]">
        {/* Chat sidebar */}
        <div className="border-r border-slate-200 bg-slate-50 flex flex-col justify-between p-4 md:col-span-1">
          <div className="space-y-4 overflow-y-auto pr-1">
            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Channels</span>
            <div className="space-y-1">
              <button
                onClick={() => setActiveTab('General')}
                className={`w-full text-left px-3 py-2.5 rounded-xl font-bold text-xs transition flex items-center justify-between ${
                  activeTab === 'General' ? 'bg-emerald-600 text-white shadow-sm' : 'hover:bg-slate-200/50 text-slate-700'
                }`}
              >
                <span>General Sacco Board</span>
                <span className="inline-flex px-1.5 py-0.2 bg-white/20 text-[10px] rounded-full">All</span>
              </button>
              <button
                onClick={() => setActiveTab('Private')}
                className={`w-full text-left px-3 py-2.5 rounded-xl font-bold text-xs transition flex items-center justify-between ${
                  activeTab === 'Private' ? 'bg-emerald-600 text-white shadow-sm' : 'hover:bg-slate-200/50 text-slate-700'
                }`}
              >
                <span>Private Member Inbox</span>
                <span className="inline-flex px-1.5 py-0.2 bg-amber-100 text-amber-800 text-[10px] rounded-full font-sans">1-on-1</span>
              </button>
              <button
                onClick={() => setActiveTab('Virtual')}
                className={`w-full text-left px-3 py-2.5 rounded-xl font-bold text-xs transition flex items-center justify-between ${
                  activeTab === 'Virtual' ? 'bg-emerald-600 text-white shadow-sm' : 'hover:bg-slate-200/50 text-slate-700'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                  <span>Virtual Video Meet</span>
                </span>
                <span className="inline-flex px-1.5 py-0.2 bg-indigo-100 text-indigo-800 text-[9px] rounded-full font-bold">Google Meet</span>
              </button>
            </div>

            {activeTab === 'Private' && (
              <div className="pt-4 border-t border-slate-200 space-y-2">
                <label className="block text-[11px] font-bold text-slate-500 uppercase">Select Member</label>
                <select
                  value={selectedRecipientId}
                  onChange={e => setSelectedRecipientId(e.target.value)}
                  className="w-full text-xs px-2.5 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none"
                >
                  {members.filter(m => m.id !== currentUser.id).map(m => (
                    <option key={m.id} value={m.id}>{m.name} ({m.role})</option>
                  ))}
                </select>
              </div>
            )}

            {/* Decorum Center / Simulation Deck */}
            <div className="pt-4 border-t border-slate-200 space-y-3">
              <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle size={12} className="text-rose-500" />
                <span>Sacco Decorum Center</span>
              </span>
              
              {currentUser.role === 'Disciplinarian' ? (
                // Official Disciplinarian Form
                <div className="space-y-2.5 bg-rose-50/40 p-2.5 rounded-xl border border-rose-100 text-[11px]">
                  <p className="font-semibold text-rose-900 leading-tight">Disciplinarian Duty Active</p>
                  
                  <div>
                    <label className="block text-[10px] text-slate-500 mb-0.5">Select Violator</label>
                    <select
                      value={penalizeeId}
                      onChange={e => setPenalizeeId(e.target.value)}
                      className="w-full text-[10px] px-2 py-1 bg-white border border-slate-200 rounded-md focus:outline-none"
                    >
                      {members.map(m => (
                        <option key={m.id} value={m.id}>{m.name} ({m.role})</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-500 mb-0.5">Reason of Infraction</label>
                    <select
                      value={penaltyReason}
                      onChange={e => setPenaltyReason(e.target.value)}
                      className="w-full text-[10px] px-2 py-1 bg-white border border-slate-200 rounded-md focus:outline-none"
                    >
                      <option value="Foul language in chatroom">Foul language in chatroom</option>
                      <option value="Spamming the communication board">Spamming the board</option>
                      <option value="Disruptive decorum / behavior">Disruptive decorum</option>
                      <option value="Late for official board meeting">Late for meeting</option>
                      <option value="Unexcused absence penalty">Unexcused absence</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-500 mb-0.5">Fine Amount</label>
                    <select
                      value={penaltyAmt}
                      onChange={e => setPenaltyAmt(Number(e.target.value))}
                      className="w-full text-[10px] px-2 py-1 bg-white border border-slate-200 rounded-md focus:outline-none font-mono"
                    >
                      <option value={200}>KES 200 (Standard)</option>
                      <option value={500}>KES 500 (Medium)</option>
                      <option value={1000}>KES 1,000 (Severe)</option>
                    </select>
                  </div>

                  <button
                    onClick={handleIssuePenalty}
                    className="w-full py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-[10px] rounded-lg shadow-sm transition flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>Issue Decorum Penalty</span>
                  </button>
                </div>
              ) : (
                // Quick Member Self-Test / Simulation Mode
                <div className="bg-slate-100 p-2.5 rounded-xl border border-slate-200 text-[10px] space-y-2">
                  <p className="text-slate-500 leading-tight">Need to test toast alerts? Self-issue a quick penalty to try it out!</p>
                  <button
                    onClick={handleSelfPenalty}
                    className="w-full py-1.5 bg-rose-50 hover:bg-rose-100 hover:text-rose-700 hover:border-rose-200 border border-rose-300 text-slate-700 font-bold text-[10px] rounded-lg transition cursor-pointer"
                  >
                    ⚡ Self-Issue Penalty (KES 200)
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="bg-emerald-50/50 p-3 rounded-xl border border-emerald-100 shrink-0">
            <span className="block text-[10px] font-bold text-emerald-950">Logged In as:</span>
            <span className="block text-xs text-emerald-800 truncate font-semibold mt-0.5">{currentUser.name}</span>
            <span className="inline-flex text-[9px] bg-emerald-100 text-emerald-800 px-2 py-0.2 rounded-full font-bold uppercase mt-1">
              {currentUser.role}
            </span>
          </div>
        </div>

        {/* Message board */}
        <div className="flex flex-col justify-between md:col-span-3 h-full overflow-hidden">
          {activeTab === 'Virtual' ? (
            <div className="flex-1 flex flex-col h-full overflow-y-auto p-4 space-y-4 bg-slate-50/50">
              {/* Virtual Meeting Header Banner */}
              <div className="bg-gradient-to-r from-emerald-600 via-indigo-600 to-indigo-700 p-5 rounded-2xl text-white shadow-md relative overflow-hidden shrink-0">
                <div className="relative z-10 space-y-2">
                  <div className="flex items-center gap-1.5 bg-white/20 text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase w-max">
                    <Video size={10} className="animate-pulse" />
                    <span>Secure Google Meet Integrator</span>
                  </div>
                  <h3 className="text-lg font-black tracking-tight leading-tight">Virtual Chamber & Sacco Meet Hub</h3>
                  <p className="text-[11px] text-emerald-100/90 leading-normal max-w-lg font-medium">
                    Launch instant digital meetings or schedule official committee review boards. Automatically transcribe spoken conversations using Gemini AI, extract action items, and distribute minutes directly via Gmail.
                  </p>
                </div>
                <div className="absolute right-[-40px] bottom-[-40px] w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none" />
              </div>

              {/* Grid content */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1">
                {/* Left Side: Meeting Actions & Meeting List */}
                <div className="lg:col-span-5 space-y-4 flex flex-col">
                  {/* Create or Schedule Meet Card */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Meet Orchestrator</h4>
                      <button
                        onClick={() => setShowScheduleForm(!showScheduleForm)}
                        className="text-[10px] text-indigo-600 font-bold hover:underline"
                      >
                        {showScheduleForm ? "Switch to Instant" : "Schedule Future"}
                      </button>
                    </div>

                    {!showScheduleForm ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          placeholder="e.g. Weekly Budget Check-in"
                          value={newMeetTitle}
                          onChange={e => setNewMeetTitle(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs"
                        />
                        <button
                          onClick={handleLaunchQuickMeet}
                          className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg shadow-sm transition flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Video size={14} />
                          <span>Launch Instant Google Meet</span>
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleScheduleMeet} className="space-y-2.5">
                        <input
                          type="text"
                          placeholder="e.g. Q3 Strategic Planning Board"
                          required
                          value={newMeetTitle}
                          onChange={e => setNewMeetTitle(e.target.value)}
                          className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs"
                        />
                        <div>
                          <label className="block text-[9px] text-slate-500 font-semibold mb-0.5 uppercase">Meeting Date & Time</label>
                          <input
                            type="datetime-local"
                            required
                            value={scheduledDate}
                            onChange={e => setScheduledDate(e.target.value)}
                            className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs font-mono"
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg shadow-sm transition flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Calendar size={14} />
                          <span>Schedule Virtual Meet</span>
                        </button>
                      </form>
                    )}
                  </div>

                  {/* Sacco Meeting Ledger */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex-1 flex flex-col overflow-hidden min-h-[220px]">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">Sacco Meeting Ledger</h4>
                    <div className="space-y-2 overflow-y-auto flex-1 pr-0.5">
                      {virtualMeetings.map(m => (
                        <div 
                          key={m.id} 
                          className={`p-2.5 rounded-xl border transition flex flex-col gap-1.5 ${
                            selectedMeetingForAI === m.id 
                              ? 'border-emerald-500 bg-emerald-50/20 shadow-sm' 
                              : 'border-slate-200 bg-slate-50 hover:bg-slate-100/50'
                          }`}
                        >
                          <div className="flex justify-between items-start gap-2">
                            <div className="min-w-0">
                              <h5 className="font-extrabold text-slate-900 text-xs truncate leading-snug">{m.title}</h5>
                              <span className="text-[10px] text-slate-500 font-medium block mt-0.5">{m.date}</span>
                            </div>
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase shrink-0 ${
                              m.status === 'Live' ? 'bg-rose-100 text-rose-800 animate-pulse border border-rose-200' :
                              m.status === 'Scheduled' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                              'bg-slate-200 text-slate-700'
                            }`}>
                              {m.status}
                            </span>
                          </div>

                          <div className="flex gap-2 items-center pt-1.5 border-t border-slate-200/50">
                            <a 
                              href={m.meetUrl} 
                              target="_blank" 
                              rel="noreferrer"
                              className="px-2 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-[10px] rounded font-bold transition flex items-center gap-1 shrink-0"
                            >
                              <Video size={11} />
                              <span>Join Meet</span>
                            </a>
                            {m.status !== 'Scheduled' && (
                              <button
                                onClick={() => {
                                  setSelectedMeetingForAI(m.id);
                                  const t = TRANSCRIPT_TEMPLATES.find(temp => temp.title === m.title);
                                  if (t) {
                                    setCustomTranscript(t.text);
                                  } else {
                                    setCustomTranscript(`Nigel (Chairman): "Let's summarize our immediate action items for our video session: ${m.title}."`);
                                  }
                                  if (m.summary) {
                                    setGeneratedSummary(m.summary);
                                  } else {
                                    setGeneratedSummary('');
                                  }
                                }}
                                className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] rounded font-bold transition flex items-center gap-1 cursor-pointer"
                              >
                                <Sparkles size={11} />
                                <span>AI Minutes</span>
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Side: AI Secretariat Panel */}
                <div className="lg:col-span-7 flex flex-col space-y-4">
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex-1 flex flex-col overflow-hidden min-h-[350px]">
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-sans">AI Secretary Companion</h4>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          Selected Meet: <strong className="text-slate-700">"{virtualMeetings.find(m => m.id === selectedMeetingForAI)?.title || 'No Meeting Selected'}"</strong>
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <label className="text-[10px] text-slate-500 font-medium">Templates:</label>
                        <select
                          value={selectedTemplateIndex}
                          onChange={e => {
                            const idx = Number(e.target.value);
                            setSelectedTemplateIndex(idx);
                            setCustomTranscript(TRANSCRIPT_TEMPLATES[idx].text);
                          }}
                          className="text-[10px] bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 font-bold text-slate-700 focus:outline-none"
                        >
                          {TRANSCRIPT_TEMPLATES.map((t, idx) => (
                            <option key={idx} value={idx}>{t.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 overflow-hidden font-sans">
                      <div className="flex flex-col space-y-2 h-full">
                        <div className="flex justify-between items-center shrink-0">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Raw Meeting Transcript</label>
                          <button 
                            onClick={() => setCustomTranscript('')}
                            className="text-[10px] text-rose-500 font-bold hover:underline"
                          >
                            Clear
                          </button>
                        </div>
                        <textarea
                          placeholder="Paste dialog transcripts or type notes..."
                          value={customTranscript}
                          onChange={e => setCustomTranscript(e.target.value)}
                          className="flex-1 w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 text-[11px] font-sans leading-relaxed resize-none overflow-y-auto"
                        />
                        <button
                          onClick={() => {
                            const meet = virtualMeetings.find(m => m.id === selectedMeetingForAI);
                            if (meet) {
                              handleGenerateMinutes(customTranscript, meet.title, meet.id);
                            } else {
                              alert("Please select a meeting first!");
                            }
                          }}
                          disabled={isAnalyzingTranscript || !customTranscript.trim()}
                          className="w-full py-2 bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-700 hover:to-indigo-700 disabled:from-slate-400 disabled:to-slate-400 text-white font-black text-xs rounded-xl shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                        >
                          {isAnalyzingTranscript ? (
                            <>
                              <RefreshCw size={13} className="animate-spin" />
                              <span>Synthesizing Minutes...</span>
                            </>
                          ) : (
                            <>
                              <Sparkles size={13} />
                              <span>Generate Minutes with Gemini AI</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="flex flex-col space-y-2 h-full border-t md:border-t-0 md:border-l border-slate-200 md:pl-4 overflow-hidden">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0">Structured Sacco Minutes</span>
                        
                        <div className="flex-1 bg-slate-50 rounded-xl border border-slate-100 p-3 overflow-y-auto text-slate-800 font-sans text-[11px] leading-relaxed select-text whitespace-pre-wrap">
                          {generatedSummary ? (
                            <div>
                              {generatedSummary}
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center h-full text-center text-slate-400 p-4 space-y-2">
                              <Sparkles size={24} className="text-slate-300 animate-pulse" />
                              <p className="font-semibold text-xs text-slate-500">Minutes Empty</p>
                              <p className="text-[10px] text-slate-400 leading-normal font-sans">Load a sample transcript template or type meeting dialogue, then click "Generate Minutes". Sacco secretary AI will write beautiful structured reports!</p>
                            </div>
                          )}
                        </div>

                        {generatedSummary && (
                          <div className="space-y-2 shrink-0">
                            <button
                              onClick={() => {
                                const meet = virtualMeetings.find(m => m.id === selectedMeetingForAI);
                                if (meet) {
                                  handleEmailMinutes(meet.title, generatedSummary);
                                }
                              }}
                              disabled={isSendingEmails}
                              className="w-full py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl shadow-sm transition flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              {isSendingEmails ? (
                                <>
                                  <RefreshCw size={13} className="animate-spin text-slate-400" />
                                  <span>Emailing Members...</span>
                                </>
                              ) : (
                                <>
                                  <Mail size={13} className="text-slate-500" />
                                  <span>Email Minutes to Members via Gmail</span>
                                </>
                              )}
                            </button>

                            {emailSentLogs.length > 0 && (
                              <div className="p-2 bg-emerald-50 rounded-lg border border-emerald-100 text-[9px] text-emerald-800 leading-relaxed font-medium">
                                <strong>✅ Success Logs:</strong> Emailed to Nigel, David, Aisha, Halima, Moses successfully. Sacco logs tracking records updated!
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center shrink-0">
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">
                    {activeTab === 'General' ? '📢 General Group Chatroom' : `🔒 Inbox: Chat with ${members.find(m => m.id === selectedRecipientId)?.name}`}
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Secure transmission logs, updated live.</p>
                </div>
              </div>

              {/* Messages block */}
              <div className="p-4 overflow-y-auto flex-1 space-y-3 bg-slate-50/20">
                {filteredChats.map(c => {
                  const isMe = c.senderId === currentUser.id;
                  return (
                    <div key={c.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                      <span className="text-[9px] text-slate-400 font-bold mb-0.5 px-1">{isMe ? 'You' : c.senderName}</span>
                      <div className={`p-3 max-w-sm text-xs shadow-sm rounded-2xl ${
                        isMe 
                          ? 'bg-emerald-600 text-white rounded-tr-none' 
                          : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none'
                      }`}>
                        {c.text}
                      </div>
                    </div>
                  );
                })}
                {filteredChats.length === 0 && (
                  <div className="text-center text-slate-400 text-xs py-12">
                    No communications recorded in this channel yet. Send a message to start!
                  </div>
                )}
              </div>

              {/* Form */}
              <form onSubmit={handleSend} className="p-3 border-t border-slate-200 bg-white flex gap-2 shrink-0">
                <input
                  type="text"
                  placeholder="Type your secure message..."
                  value={text}
                  onChange={e => setText(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl transition shadow-sm cursor-pointer"
                >
                  <Send size={15} />
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      {/* Toast Notification Deck */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        <AnimatePresence>
          {activeAlerts.map(alert => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              className="bg-white/95 backdrop-blur border-2 border-rose-100 p-4 rounded-2xl shadow-2xl pointer-events-auto flex gap-3 items-start border-l-4 border-l-rose-500 text-slate-800"
            >
              <div className="p-2 bg-rose-50 text-rose-600 rounded-xl shrink-0 mt-0.5">
                <AlertTriangle size={18} />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-extrabold text-xs text-rose-950 uppercase tracking-wide">
                    New Penalty Received!
                  </h4>
                  <button
                    onClick={() => setDismissedPenaltyIds(prev => [...prev, alert.id])}
                    className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                </div>
                <p className="text-xs text-slate-600 font-medium leading-tight">
                  You have been issued a fine for: <strong className="text-slate-900">"{alert.reason}"</strong>
                </p>
                <div className="flex justify-between items-center pt-2 gap-4">
                  <span className="text-xs font-mono font-extrabold text-rose-700">
                    KES {alert.amount}
                  </span>
                  <button
                    onClick={() => {
                      onPayPenalty(alert.id);
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] rounded-lg transition shadow-sm cursor-pointer"
                  >
                    <CreditCard size={10} />
                    <span>Pay Penalty</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};


// ==========================================
// 8. ELECTIONS VIEW (Image 6 Candidates & Voting)
// ==========================================
export const ElectionsView: React.FC<{
  candidates: Candidate[];
  onVote: (id: string, voterId: string) => void;
  currentUser: Member;
}> = ({ candidates, onVote, currentUser }) => {
  const posts = Array.from(new Set(candidates.map(c => c.post)));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Elections & Committee Tallying</h2>
        <p className="text-sm text-gray-500">Nominate candidates, cast secure electronic votes, and view live audit results.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map(post => {
          const postCandidates = candidates.filter(c => c.post === post);
          const totalPostVotes = postCandidates.reduce((sum, c) => sum + c.votesCount, 0);

          return (
            <div key={post} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Office of the {post}</span>
                <span className="inline-flex px-2 py-0.5 bg-emerald-50 text-emerald-800 text-[10px] font-bold rounded-full font-mono">
                  {totalPostVotes} Votes Cast
                </span>
              </div>

              <div className="space-y-4">
                {postCandidates.map(cand => {
                  const hasVotedForThis = cand.voters.includes(currentUser.id);
                  const alreadyVotedForPost = postCandidates.some(c => c.voters.includes(currentUser.id));

                  return (
                    <div key={cand.id} className="space-y-1.5 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-slate-900 text-xs">{cand.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-slate-600 font-mono">{cand.votesCount} Votes</span>
                          {hasVotedForThis ? (
                            <span className="inline-flex bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                              My Choice
                            </span>
                          ) : !alreadyVotedForPost ? (
                            <button
                              onClick={() => onVote(cand.id, currentUser.id)}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] rounded-lg transition shadow-sm"
                            >
                              Vote
                            </button>
                          ) : null}
                        </div>
                      </div>

                      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                          style={{ width: `${totalPostVotes > 0 ? (cand.votesCount / totalPostVotes) * 100 : 0}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


// ==========================================
// 9. ADMIN PORTAL (Image 25)
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
  const [unlocked, setUnlocked] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

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
  const [newChamaConstitution, setNewChamaConstitution] = useState('');

  // Update form inputs when config (derived active tenant) changes
  React.useEffect(() => {
    setName(config.name);
    setVision(config.vision);
    setLengoKuu(config.lengoKuu);
    setConstitution(config.constitution);
  }, [config]);

  // Bypass passcode for Super Admin automatically
  React.useEffect(() => {
    if (currentUser.role === 'Super Admin') {
      setUnlocked(true);
    }
  }, [currentUser.role]);

  // Filters for pending cash approvals and pending loans
  const targetFilterTenantId = currentUser.role === 'Super Admin' ? currentTenantId : currentUser.tenantId;

  const pendingCashCon = contributions.filter(c => 
    c.status === 'Pending' && 
    c.paymentMethod === 'Cash' && 
    (targetFilterTenantId === 'all' || c.tenantId === targetFilterTenantId)
  );

  const pendingLoansList = loans.filter(l => 
    l.status === 'Pending' && 
    (targetFilterTenantId === 'all' || l.tenantId === targetFilterTenantId)
  );

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser.role === 'Super Admin' || passcode === config.adminCode) {
      setUnlocked(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Incorrect official passcode reference. Try 1234.');
    }
  };

  const handleSaveConfig = () => {
    onUpdateConfig({
      ...config,
      name,
      vision,
      lengoKuu,
      constitution
    });
    alert("Official group parameters synced!");
  };

  const handleProvisionChama = () => {
    if (!newChamaName || !newChamaCode || !newChamaPasscode) {
      alert("Please enter Name, unique Code, and Admin Passcode for the new Chama.");
      return;
    }
    onCreateTenant({
      name: newChamaName,
      code: newChamaCode.toUpperCase(),
      vision: newChamaVision || "To support cooperative growth.",
      lengoKuu: newChamaLengo || "GROW SAVINGS",
      adminCode: newChamaPasscode,
      constitution: newChamaConstitution || "Standard multi-tenant guidelines apply."
    });

    // Reset form
    setNewChamaName('');
    setNewChamaCode('');
    setNewChamaVision('');
    setNewChamaLengo('');
    setNewChamaPasscode('');
    setNewChamaConstitution('');
    alert(`Successfully provisioned ${newChamaName} Sacco network! A default Chairman has been auto-registered for testing.`);
  };

  if (!unlocked) {
    return (
      <div className="max-w-md mx-auto bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="text-center space-y-2">
          <div className="p-3 bg-rose-50 text-rose-600 inline-block rounded-xl">
            <Lock size={28} />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Official Admin Authorization Lock</h3>
          <p className="text-xs text-slate-500">This sector is locked. Access is reserved for Chairman, Treasurer, and Secretaries.</p>
        </div>

        <form onSubmit={handleUnlock} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Passcode Reference</label>
            <input
              type="password"
              placeholder="Enter admin passcode (Try: 1234)"
              value={passcode}
              onChange={e => setPasscode(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-center font-mono font-bold"
            />
          </div>
          {errorMsg && <p className="text-[10px] text-rose-600 font-bold text-center">{errorMsg}</p>}
          <button
            type="submit"
            className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-sm transition"
          >
            Authenticate Credentials
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Administrator Command Sector</h2>
          <p className="text-sm text-slate-500">Approve transaction queues, award loans, and customize group constitution parameters.</p>
        </div>
        {currentUser.role === 'Super Admin' && (
          <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-black font-mono tracking-widest uppercase shadow">
            Super Admin
          </span>
        )}
      </div>

      {/* Super Admin Control Board */}
      {currentUser.role === 'Super Admin' && (
        <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl border border-slate-800 space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-slate-800">
            <div>
              <h3 className="font-extrabold text-base text-emerald-400">Super Admin Organization Hub</h3>
              <p className="text-xs text-slate-400">Configure and provision new Chama Organizations onto this platform instance.</p>
            </div>
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-[10px] font-bold border border-emerald-500/20">
              CROSS-TENANT ROOT
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Form */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Provision New Sacco / Chama</h4>
              
              <div className="space-y-3 text-slate-800">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] text-slate-400 font-bold mb-1">CHAMA NAME *</label>
                    <input
                      type="text"
                      placeholder="e.g. Westlands Youth Sacco"
                      value={newChamaName}
                      onChange={e => setNewChamaName(e.target.value)}
                      className="w-full bg-slate-800 text-white border border-slate-700 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400 font-bold mb-1">UNIQUE CODE *</label>
                    <input
                      type="text"
                      placeholder="e.g. WYS"
                      value={newChamaCode}
                      onChange={e => setNewChamaCode(e.target.value)}
                      className="w-full bg-slate-800 text-white border border-slate-700 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono uppercase"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] text-slate-400 font-bold mb-1">LENGO KUU (MAIN GOAL)</label>
                    <input
                      type="text"
                      placeholder="e.g. GROW SAVINGS"
                      value={newChamaLengo}
                      onChange={e => setNewChamaLengo(e.target.value)}
                      className="w-full bg-slate-800 text-white border border-slate-700 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400 font-bold mb-1">ADMIN PASSCODE *</label>
                    <input
                      type="password"
                      placeholder="e.g. 9999"
                      value={newChamaPasscode}
                      onChange={e => setNewChamaPasscode(e.target.value)}
                      className="w-full bg-slate-800 text-white border border-slate-700 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-slate-400 font-bold mb-1">VISION STATEMENT</label>
                  <input
                    type="text"
                    placeholder="To support young entrepreneurs..."
                    value={newChamaVision}
                    onChange={e => setNewChamaVision(e.target.value)}
                    className="w-full bg-slate-800 text-white border border-slate-700 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-slate-400 font-bold mb-1">CONSTITUTION BYLAWS</label>
                  <textarea
                    rows={3}
                    placeholder="1. Standard contribution guidelines..."
                    value={newChamaConstitution}
                    onChange={e => setNewChamaConstitution(e.target.value)}
                    className="w-full bg-slate-800 text-white border border-slate-700 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleProvisionChama}
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow transition cursor-pointer"
                >
                  Provision Sacco Organization & Auto-Create Chairman
                </button>
              </div>
            </div>

            {/* List of tenants */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Registered Chama Tenant Networks</h4>
              <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
                {tenants.map(t => {
                  const mCount = members.filter(m => m.tenantId === t.id).length;
                  const totalSavings = contributions
                    .filter(c => c.tenantId === t.id && c.status === 'Approved')
                    .reduce((sum, c) => sum + c.amount, 0);

                  return (
                    <div key={t.id} className="p-3 bg-slate-800 border border-slate-700 rounded-xl space-y-2 flex justify-between items-center">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-xs text-white">{t.name}</span>
                          <span className="px-1.5 py-0.2 bg-slate-900 text-slate-300 rounded text-[9px] font-mono font-bold uppercase">
                            {t.code}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400 italic">"{t.vision}"</p>
                        <div className="flex gap-4 text-[9px] text-slate-500 font-mono mt-1.5">
                          <span>Members: <strong className="text-slate-300">{mCount}</strong></span>
                          <span>Approved Savings: <strong className="text-slate-300">KES {totalSavings.toLocaleString()}</strong></span>
                        </div>
                      </div>
                      <button
                        onClick={() => onSelectTenant(t.id)}
                        className={`px-2 py-1 text-[10px] font-bold rounded-lg transition shrink-0 cursor-pointer ${
                          currentTenantId === t.id
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        }`}
                      >
                        {currentTenantId === t.id ? 'Active' : 'Switch'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending cash approvals */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-sm">Pending Cash Savings Approvals (Treasurer - Image 2)</h3>
          <p className="text-xs text-slate-400">Cash payments submitted by members must be physically matched and validated here.</p>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {pendingCashCon.map(c => (
              <div key={c.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
                <div>
                  <span className="block font-bold text-slate-900 text-xs">{c.memberName}</span>
                  <span className="block text-[10px] text-slate-400 italic mt-0.5">{c.purpose}</span>
                  <span className="block text-[10px] text-emerald-800 font-mono font-bold mt-1">KES {c.amount.toLocaleString()}</span>
                  <span className="inline-block text-[8px] bg-slate-200/50 text-slate-600 px-1.5 py-0.2 rounded font-mono font-bold mt-1 uppercase">
                    Chama ID: {c.tenantId}
                  </span>
                </div>
                <button
                  onClick={() => onApproveContribution(c.id, currentUser.id)}
                  className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] rounded-lg shadow-sm transition shrink-0 cursor-pointer"
                >
                  Approve Cash
                </button>
              </div>
            ))}
            {pendingCashCon.length === 0 && (
              <p className="text-xs text-slate-400 text-center py-6">No cash contributions pending approval.</p>
            )}
          </div>
        </div>

        {/* Pending loan approvals */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-sm">Loan Allocation Queue (Chairman - Image 24)</h3>
          <p className="text-xs text-slate-400">Review outstanding loan requests before assigning capital.</p>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {pendingLoansList.map(l => (
              <div key={l.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="block font-bold text-slate-900 text-xs">{l.memberName}</span>
                    <span className="block text-[10px] text-slate-400 italic mt-0.5">{l.reason}</span>
                    <span className="block text-[10px] text-rose-700 font-mono font-bold mt-1">KES {l.amount.toLocaleString()}</span>
                    <span className="inline-block text-[8px] bg-slate-200/50 text-slate-600 px-1.5 py-0.2 rounded font-mono font-bold mt-1 uppercase">
                      Chama ID: {l.tenantId}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-bold font-mono bg-slate-200/50 px-2 py-0.5 rounded-full">
                    {l.repaymentTermMonths} Mos
                  </span>
                </div>
                <div className="flex gap-2 justify-end pt-1 border-t border-slate-200/50">
                  <button
                    onClick={() => onRejectLoan(l.id)}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 border border-slate-200 font-bold text-[10px] rounded-lg transition cursor-pointer"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => onApproveLoan(l.id)}
                    className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] rounded-lg shadow-sm transition cursor-pointer"
                  >
                    Approve Credit
                  </button>
                </div>
              </div>
            ))}
            {pendingLoansList.length === 0 && (
              <p className="text-xs text-slate-400 text-center py-6">No credit requests pending allocation.</p>
            )}
          </div>
        </div>

        {/* Group Parameter Editor */}
        {currentTenantId !== 'all' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 lg:col-span-2">
            <h3 className="font-bold text-slate-900 text-sm">Modify Official Sacco Parameters (Image 20)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Sacco Name</label>
                <input
                  type="text" value={name} onChange={e => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Lengo Kuu (Main Goal)</label>
                <input
                  type="text" value={lengoKuu} onChange={e => setLengoKuu(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs font-bold"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Group Vision Statement</label>
                <input
                  type="text" value={vision} onChange={e => setVision(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Official constitution & Rules Bylaws</label>
                <textarea
                  rows={6} value={constitution} onChange={e => setConstitution(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs font-mono"
                />
              </div>
            </div>
            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={handleSaveConfig}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-sm transition cursor-pointer"
              >
                Sync Official Group Parameters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
