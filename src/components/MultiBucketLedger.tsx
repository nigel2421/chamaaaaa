import React, { useState } from 'react';
import { 
  Wallet, Lock, PiggyBank, HeartHandshake, ShieldAlert, 
  ArrowRightLeft, PlusCircle, ArrowUpRight, TrendingUp, CheckCircle2 
} from 'lucide-react';
import { Member, Contribution, SubWalletType, SubWalletBalances } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface MultiBucketLedgerProps {
  currentUser: Member;
  members: Member[];
  contributions: Contribution[];
  onAddContribution: (newCon: Omit<Contribution, 'id' | 'date' | 'status' | 'approvedBy' | 'tenantId'>) => void;
}

export const MultiBucketLedger: React.FC<MultiBucketLedgerProps> = ({
  currentUser,
  members,
  contributions,
  onAddContribution
}) => {
  const [selectedBucket, setSelectedBucket] = useState<SubWalletType | 'All'>('All');
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [depositBucket, setDepositBucket] = useState<SubWalletType>('General Savings');
  const [depositAmount, setDepositAmount] = useState('');
  const [depositMemberId, setDepositMemberId] = useState(currentUser.id);
  const [depositPurpose, setDepositPurpose] = useState('');
  const [depositMethod, setDepositMethod] = useState<'Mpesa' | 'Cash' | 'Bank'>('Mpesa');

  // Compute aggregate totals across members for all 5 sub-wallets
  const totalSubWalletBalances = members.reduce(
    (acc, m) => {
      const b = m.subWalletBalances || { general: 0, mkebe: 0, saye: 0, okolea: 0, penaltyPool: 0 };
      acc.general += b.general || 0;
      acc.mkebe += b.mkebe || 0;
      acc.saye += b.saye || 0;
      acc.okolea += b.okolea || 0;
      acc.penaltyPool += b.penaltyPool || 0;
      return acc;
    },
    { general: 0, mkebe: 0, saye: 0, okolea: 0, penaltyPool: 0 }
  );

  const grandTotalSavings = 
    totalSubWalletBalances.general + 
    totalSubWalletBalances.mkebe + 
    totalSubWalletBalances.saye + 
    totalSubWalletBalances.okolea + 
    totalSubWalletBalances.penaltyPool;

  const handleDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(depositAmount);
    if (isNaN(amt) || amt <= 0) return;

    const targetMem = members.find(m => m.id === depositMemberId) || currentUser;

    onAddContribution({
      memberId: targetMem.id,
      memberName: targetMem.name,
      type: depositBucket === 'General Savings' ? 'Shares' : 
            depositBucket === 'Mkebe (Locked)' ? 'Mkebe Deposit' :
            depositBucket === 'SAYE' ? 'SAYE Deposit' :
            depositBucket === 'Okolea (Emergency)' ? 'Okolea Fund' : 'Penalty Payment',
      subWallet: depositBucket,
      amount: amt,
      purpose: depositPurpose || `Deposit into ${depositBucket}`,
      paymentMethod: depositMethod
    });

    setShowDepositModal(false);
    setDepositAmount('');
    setDepositPurpose('');
  };

  const bucketsList = [
    {
      name: 'General Savings' as SubWalletType,
      balance: totalSubWalletBalances.general,
      icon: Wallet,
      color: 'emerald',
      bgGradient: 'from-emerald-500/10 via-teal-500/5 to-transparent',
      textAccent: 'text-emerald-400',
      badgeBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
      desc: 'Core equity shares & member capital deposits.'
    },
    {
      name: 'Mkebe (Locked)' as SubWalletType,
      balance: totalSubWalletBalances.mkebe,
      icon: Lock,
      color: 'amber',
      bgGradient: 'from-amber-500/10 via-yellow-500/5 to-transparent',
      textAccent: 'text-amber-400',
      badgeBg: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
      desc: 'Time-locked capital reserved for Project Simba land acquisition.'
    },
    {
      name: 'SAYE' as SubWalletType,
      balance: totalSubWalletBalances.saye,
      icon: PiggyBank,
      color: 'teal',
      bgGradient: 'from-teal-500/10 via-cyan-500/5 to-transparent',
      textAccent: 'text-teal-400',
      badgeBg: 'bg-teal-500/10 text-teal-300 border-teal-500/30',
      desc: 'Save-As-You-Earn automated monthly investment pool.'
    },
    {
      name: 'Okolea (Emergency)' as SubWalletType,
      balance: totalSubWalletBalances.okolea,
      icon: HeartHandshake,
      color: 'rose',
      bgGradient: 'from-rose-500/10 via-pink-500/5 to-transparent',
      textAccent: 'text-rose-400',
      badgeBg: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
      desc: 'Solidarity welfare relief fund for member health & emergencies.'
    },
    {
      name: 'Penalty Pool' as SubWalletType,
      balance: totalSubWalletBalances.penaltyPool,
      icon: ShieldAlert,
      color: 'indigo',
      bgGradient: 'from-indigo-500/10 via-purple-500/5 to-transparent',
      textAccent: 'text-indigo-400',
      badgeBg: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30',
      desc: 'Collected meeting delay fines & disciplinary penalties repository.'
    }
  ];

  const filteredContributions = selectedBucket === 'All'
    ? contributions
    : contributions.filter(c => c.subWallet === selectedBucket);

  return (
    <div className="space-y-6">
      
      {/* HEADER & TOP BANNER */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 rounded-3xl p-6 text-white shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full text-xs font-mono font-bold">
              <TrendingUp size={14} />
              <span>Multi-Bucket Accounting Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Group Capital Sub-Wallets
            </h2>
            <p className="text-xs text-slate-400 max-w-xl font-medium leading-relaxed">
              Ring-fenced multi-pool accounting ensuring strict separation between core shares, locked Project Simba capital, SAYE automation, emergency welfare, and penalty collections.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="bg-slate-800/80 backdrop-blur-md px-5 py-3 rounded-2xl border border-slate-700/80 text-center sm:text-right">
              <span className="block text-[10px] uppercase font-mono font-bold text-slate-400">Total Group Capital</span>
              <span className="text-xl sm:text-2xl font-black font-mono text-emerald-400">
                KES {grandTotalSavings.toLocaleString()}
              </span>
            </div>
            <button
              onClick={() => setShowDepositModal(true)}
              className="px-5 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs rounded-2xl shadow-lg glow-emerald transition cursor-pointer flex items-center justify-center gap-2"
            >
              <PlusCircle size={16} />
              <span>New Bucket Deposit</span>
            </button>
          </div>
        </div>
      </div>

      {/* 5 SUB-WALLETS FRAMELESS CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {bucketsList.map(b => {
          const Icon = b.icon;
          const pctOfTotal = grandTotalSavings > 0 ? Math.round((b.balance / grandTotalSavings) * 100) : 0;

          return (
            <div 
              key={b.name}
              onClick={() => setSelectedBucket(selectedBucket === b.name ? 'All' : b.name)}
              className={`p-5 rounded-3xl bg-slate-900/90 border transition-all duration-300 cursor-pointer space-y-4 relative overflow-hidden group ${
                selectedBucket === b.name 
                  ? 'border-emerald-500 shadow-lg glow-emerald scale-[1.02]' 
                  : 'border-slate-800/80 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${b.bgGradient} opacity-50 pointer-events-none`} />

              <div className="relative z-10 flex justify-between items-start">
                <div className={`p-2.5 rounded-2xl bg-slate-800/80 ${b.textAccent}`}>
                  <Icon size={20} />
                </div>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${b.badgeBg}`}>
                  {pctOfTotal}% pool
                </span>
              </div>

              <div className="relative z-10 space-y-1">
                <h4 className="text-xs font-extrabold text-slate-300 uppercase tracking-wide">
                  {b.name}
                </h4>
                <div className="text-lg font-black text-white font-mono">
                  KES {b.balance.toLocaleString()}
                </div>
                <p className="text-[10px] text-slate-400 leading-relaxed font-medium line-clamp-2">
                  {b.desc}
                </p>
              </div>

              {/* Progress bar line */}
              <div className="relative z-10 w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500" 
                  style={{ width: `${pctOfTotal}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* MEMBER BREAKDOWN & RECENT TRANSACTIONS TABLE */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded-3xl p-6 text-white space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <span>Sub-Wallet Member Allocations</span>
              {selectedBucket !== 'All' && (
                <span className="text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                  Filtered by: {selectedBucket}
                </span>
              )}
            </h3>
            <p className="text-xs text-slate-400">Individual member balances across all 5 sub-wallets.</p>
          </div>

          {/* Bucket Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setSelectedBucket('All')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                selectedBucket === 'All'
                  ? 'bg-emerald-500 text-slate-950 font-black'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              All Buckets
            </button>
            {bucketsList.map(b => (
              <button
                key={b.name}
                onClick={() => setSelectedBucket(b.name)}
                className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition ${
                  selectedBucket === b.name
                    ? 'bg-emerald-500 text-slate-950 font-black'
                    : 'bg-slate-800/80 text-slate-400 hover:text-white'
                }`}
              >
                {b.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Member Sub-wallet table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase text-[10px]">
                <th className="py-3 px-4">Member Name</th>
                <th className="py-3 px-4">Role & Tier</th>
                <th className="py-3 px-4 text-right">General</th>
                <th className="py-3 px-4 text-right">Mkebe (Locked)</th>
                <th className="py-3 px-4 text-right">SAYE</th>
                <th className="py-3 px-4 text-right">Okolea</th>
                <th className="py-3 px-4 text-right">Penalty</th>
                <th className="py-3 px-4 text-right font-black">Total Equity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {members.map(m => {
                const b = m.subWalletBalances || { general: 0, mkebe: 0, saye: 0, okolea: 0, penaltyPool: 0 };
                const total = (b.general || 0) + (b.mkebe || 0) + (b.saye || 0) + (b.okolea || 0) + (b.penaltyPool || 0);

                return (
                  <tr key={m.id} className="hover:bg-slate-800/30 transition">
                    <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center font-extrabold text-[11px] text-emerald-400 border border-slate-700">
                        {m.name.charAt(0)}
                      </div>
                      <span>{m.name}</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400">
                      <span className="block text-slate-300 font-bold">{m.role}</span>
                      <span className="text-[9px] font-mono text-emerald-400 font-bold">{m.tier}</span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-slate-200">
                      KES {(b.general || 0).toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-amber-400 font-semibold">
                      KES {(b.mkebe || 0).toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-teal-400 font-semibold">
                      KES {(b.saye || 0).toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-rose-400 font-semibold">
                      KES {(b.okolea || 0).toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-indigo-400">
                      KES {(b.penaltyPool || 0).toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-black text-emerald-400 text-sm">
                      KES {total.toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* DEPOSIT MODAL */}
      <AnimatePresence>
        {showDepositModal && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 text-white space-y-6 shadow-2xl"
            >
              <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-base">
                  <PlusCircle size={20} />
                  <h3>Sub-Wallet Deposit Allocation</h3>
                </div>
                <button
                  onClick={() => setShowDepositModal(false)}
                  className="text-slate-400 hover:text-white transition text-xs font-mono font-bold"
                >
                  ✕ Close
                </button>
              </div>

              <form onSubmit={handleDepositSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-400 uppercase font-mono">Target Sub-Wallet</label>
                  <select
                    value={depositBucket}
                    onChange={e => setDepositBucket(e.target.value as SubWalletType)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="General Savings">🏦 General Chama Savings</option>
                    <option value="Mkebe (Locked)">🔒 Mkebe (Locked Time-Deposit)</option>
                    <option value="SAYE">🐷 SAYE (Save As You Earn)</option>
                    <option value="Okolea (Emergency)">🤝 Okolea (Emergency Relief)</option>
                    <option value="Penalty Pool">🛡️ Penalty Pool</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-400 uppercase font-mono">Contributing Member</label>
                  <select
                    value={depositMemberId}
                    onChange={e => setDepositMemberId(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    {members.map(m => (
                      <option key={m.id} value={m.id}>{m.name} ({m.role})</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-400 uppercase font-mono">Amount (KES)</label>
                  <input
                    type="number"
                    min="1"
                    placeholder="e.g. 5000"
                    value={depositAmount}
                    onChange={e => setDepositAmount(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono font-bold text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-400 uppercase font-mono">Payment Channel</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['Mpesa', 'Cash', 'Bank'] as const).map(method => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setDepositMethod(method)}
                        className={`py-2 rounded-xl text-xs font-bold transition border ${
                          depositMethod === method
                            ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-black'
                            : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-400 uppercase font-mono">Purpose / Reference Notes</label>
                  <input
                    type="text"
                    placeholder="e.g. July locked share top-up"
                    value={depositPurpose}
                    onChange={e => setDepositPurpose(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs font-medium text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowDepositModal(false)}
                    className="flex-1 py-2.5 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold hover:bg-slate-700 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 rounded-xl text-xs font-black hover:from-emerald-400 hover:to-teal-500 transition shadow-md glow-emerald"
                  >
                    Submit Deposit
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
