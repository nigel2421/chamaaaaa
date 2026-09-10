import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { GamifiedHeader } from './components/GamifiedHeader';
import { MobileBottomNav } from './components/MobileBottomNav';
import { SikuYaChamaHub } from './components/SikuYaChamaHub';
import { MultiBucketLedger } from './components/MultiBucketLedger';
import { LengoKuuView } from './components/LengoKuuView';
import { DashboardView } from './components/DashboardView';
import { 
  MembersView, ContributionsView, LoansView, 
  MeetingsView, AttendanceView, ExpendituresView, 
  ChatroomView, ElectionsView, AdminPortal 
} from './components/ChamaViews';
import { 
  DEFAULT_CONFIG, DEFAULT_MEMBERS, DEFAULT_CONTRIBUTIONS, 
  DEFAULT_LOANS, DEFAULT_AGENDAS, DEFAULT_MEETINGS, 
  DEFAULT_EXPENDITURES, DEFAULT_CHATS, DEFAULT_CANDIDATES, DEFAULT_PENALTIES,
  DEFAULT_TENANTS
} from './data/mockData';
import { 
  Member, GroupConfig, Contribution, Loan, Agenda, 
  AttendanceMeeting, Expenditure, ChatMessage, Candidate, Penalty,
  ChamaTenant
} from './types';
import { Printer, X, LayoutDashboard, Video, Wallet, Mail, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { testFirebaseConnection, saveDocument, seedInitialDataIfEmpty, collections } from './lib/firebaseSync';

export default function App() {
  const [firebaseConnected, setFirebaseConnected] = useState<boolean | null>(null);

  // Load state from local storage or default
  const [tenants, setTenants] = useState<ChamaTenant[]>(() => {
    const saved = localStorage.getItem('sacco_tenants');
    return saved ? JSON.parse(saved) : DEFAULT_TENANTS;
  });

  const [currentTenantId, setCurrentTenantId] = useState<string>(() => {
    const saved = localStorage.getItem('sacco_current_tenant_id');
    return saved || 'chama-1';
  });

  const [members, setMembers] = useState<Member[]>(() => {
    const saved = localStorage.getItem('sacco_members');
    return saved ? JSON.parse(saved) : DEFAULT_MEMBERS;
  });

  const [contributions, setContributions] = useState<Contribution[]>(() => {
    const saved = localStorage.getItem('sacco_contributions');
    return saved ? JSON.parse(saved) : DEFAULT_CONTRIBUTIONS;
  });

  const [loans, setLoans] = useState<Loan[]>(() => {
    const saved = localStorage.getItem('sacco_loans');
    return saved ? JSON.parse(saved) : DEFAULT_LOANS;
  });

  const [agendas, setAgendas] = useState<Agenda[]>(() => {
    const saved = localStorage.getItem('sacco_agendas');
    return saved ? JSON.parse(saved) : DEFAULT_AGENDAS;
  });

  const [meetings, setMeetings] = useState<AttendanceMeeting[]>(() => {
    const saved = localStorage.getItem('sacco_meetings');
    return saved ? JSON.parse(saved) : DEFAULT_MEETINGS;
  });

  const [penalties, setPenalties] = useState<Penalty[]>(() => {
    const saved = localStorage.getItem('sacco_penalties');
    return saved ? JSON.parse(saved) : DEFAULT_PENALTIES;
  });

  const [expenditures, setExpenditures] = useState<Expenditure[]>(() => {
    const saved = localStorage.getItem('sacco_expenditures');
    return saved ? JSON.parse(saved) : DEFAULT_EXPENDITURES;
  });

  const [chats, setChats] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('sacco_chats');
    return saved ? JSON.parse(saved) : DEFAULT_CHATS;
  });

  const [candidates, setCandidates] = useState<Candidate[]>(() => {
    const saved = localStorage.getItem('sacco_candidates');
    return saved ? JSON.parse(saved) : DEFAULT_CANDIDATES;
  });

  // Test User Persona context state
  const [currentUser, setCurrentUser] = useState<Member>(() => {
    const saved = localStorage.getItem('sacco_current_user');
    if (saved) return JSON.parse(saved);
    return DEFAULT_MEMBERS[0];
  });

  const [currentView, setCurrentView] = useState('Dashboard');
  const [showPrintConsole, setShowPrintConsole] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Initialize Firebase connection check & seed initial collections
  useEffect(() => {
    async function initFirebase() {
      const isHealthy = await testFirebaseConnection();
      setFirebaseConnected(isHealthy);
      
      try {
        await seedInitialDataIfEmpty(collections.tenants, tenants, 'id');
        await seedInitialDataIfEmpty(collections.members, members, 'id');
        await seedInitialDataIfEmpty(collections.contributions, contributions, 'id');
        await seedInitialDataIfEmpty(collections.loans, loans, 'id');
        await seedInitialDataIfEmpty(collections.penalties, penalties, 'id');
      } catch (err) {
        console.warn('Firebase initial seed error:', err);
      }
    }
    initFirebase();
  }, []);

  // Derived config based on current tenant
  const activeTenant = currentTenantId === 'all'
    ? {
        id: 'all',
        name: 'All Chama Organizations',
        code: 'ALL',
        vision: 'Sacco Multi-Tenant Consolidated Platform',
        lengoKuu: 'CONSOLIDATED MONITORING & SECTOR CONTROLS',
        adminCode: '1234',
        constitution: 'Platform-level master guidelines.',
        healthIndexScore: 95
      }
    : (tenants.find(t => t.id === currentTenantId) || tenants[0]);

  const config: GroupConfig = {
    name: activeTenant.name,
    vision: activeTenant.vision,
    lengoKuu: activeTenant.lengoKuu,
    adminCode: activeTenant.adminCode,
    constitution: activeTenant.constitution,
    healthIndexScore: 94
  };

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('sacco_tenants', JSON.stringify(tenants));
    localStorage.setItem('sacco_current_tenant_id', currentTenantId);
    localStorage.setItem('sacco_members', JSON.stringify(members));
    localStorage.setItem('sacco_contributions', JSON.stringify(contributions));
    localStorage.setItem('sacco_loans', JSON.stringify(loans));
    localStorage.setItem('sacco_agendas', JSON.stringify(agendas));
    localStorage.setItem('sacco_meetings', JSON.stringify(meetings));
    localStorage.setItem('sacco_penalties', JSON.stringify(penalties));
    localStorage.setItem('sacco_expenditures', JSON.stringify(expenditures));
    localStorage.setItem('sacco_chats', JSON.stringify(chats));
    localStorage.setItem('sacco_candidates', JSON.stringify(candidates));
    localStorage.setItem('sacco_current_user', JSON.stringify(currentUser));
  }, [tenants, currentTenantId, members, contributions, loans, agendas, meetings, penalties, expenditures, chats, candidates, currentUser]);

  // Handler functions
  const handleSelectUser = (id: string) => {
    const found = members.find(m => m.id === id);
    if (found) {
      setCurrentUser(found);
      if (found.role !== 'Super Admin') {
        setCurrentTenantId(found.tenantId);
      }
    }
  };

  const handleAddMember = (newMem: Omit<Member, 'id' | 'joinedDate' | 'tenantId'>) => {
    const targetTenantId = currentUser.role === 'Super Admin'
      ? (currentTenantId === 'all' ? 'chama-1' : currentTenantId)
      : currentUser.tenantId;

    const mem: Member = {
      ...newMem,
      tenantId: targetTenantId,
      id: `mem-${Date.now()}`,
      joinedDate: new Date().toISOString().split('T')[0]
    };
    setMembers([...members, mem]);
    saveDocument(collections.members, mem.id, mem);
  };

  const handleAddContribution = (newCon: Omit<Contribution, 'id' | 'date' | 'status' | 'approvedBy' | 'tenantId'>) => {
    const memberObj = members.find(m => m.id === newCon.memberId);
    const targetTenantId = memberObj?.tenantId || (currentUser.role === 'Super Admin' && currentTenantId !== 'all' ? currentTenantId : currentUser.tenantId);
    const con: Contribution = {
      ...newCon,
      tenantId: targetTenantId,
      id: `con-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status: newCon.paymentMethod === 'Cash' ? 'Pending' : 'Approved',
      approvedBy: newCon.paymentMethod !== 'Cash' ? currentUser.id : undefined,
      mgrSynced: true
    };

    setContributions(prev => [...prev, con]);
    saveDocument(collections.contributions, con.id, con);

    // Update target member's subWalletBalances
    setMembers(prev => prev.map(m => {
      if (m.id === con.memberId) {
        const balances = { ...m.subWalletBalances };
        const bucket = con.subWallet || 'General Savings';
        if (bucket === 'General Savings') balances.general = (balances.general || 0) + con.amount;
        else if (bucket === 'Mkebe (Locked)') balances.mkebe = (balances.mkebe || 0) + con.amount;
        else if (bucket === 'SAYE') balances.saye = (balances.saye || 0) + con.amount;
        else if (bucket === 'Okolea (Emergency)') balances.okolea = (balances.okolea || 0) + con.amount;
        else if (bucket === 'Penalty Pool') balances.penaltyPool = (balances.penaltyPool || 0) + con.amount;

        return { ...m, subWalletBalances: balances };
      }
      return m;
    }));
  };

  const handleApproveContribution = (id: string, adminId: string) => {
    const updated = contributions.map(c => 
      c.id === id ? { ...c, status: 'Approved' as const, approvedBy: adminId } : c
    );
    setContributions(updated);
    const item = updated.find(c => c.id === id);
    if (item) saveDocument(collections.contributions, id, item);
  };

  const handleApplyLoan = (newLoan: Omit<Loan, 'id' | 'status' | 'dateApplied' | 'repayments' | 'tenantId'>) => {
    const memberObj = members.find(m => m.id === newLoan.memberId);
    const targetTenantId = memberObj?.tenantId || (currentUser.role === 'Super Admin' && currentTenantId !== 'all' ? currentTenantId : currentUser.tenantId);
    const loan: Loan = {
      ...newLoan,
      tenantId: targetTenantId,
      id: `loan-${Date.now()}`,
      status: 'Pending',
      dateApplied: new Date().toISOString().split('T')[0],
      repayments: []
    };
    setLoans([...loans, loan]);
    saveDocument(collections.loans, loan.id, loan);
  };

  const handleApproveLoan = (id: string) => {
    let approvedLoan: Loan | undefined;
    setLoans(loans.map(l => {
      if (l.id !== id) return l;
      
      const repayments = [];
      const monthlyAmt = Math.round((l.amount * 1.05) / l.repaymentTermMonths);
      
      const today = new Date();
      for (let i = 1; i <= l.repaymentTermMonths; i++) {
        const nextMonth = new Date(today);
        nextMonth.setMonth(today.getMonth() + i);
        repayments.push({
          id: `rep-${id}-${i}`,
          amount: monthlyAmt,
          date: nextMonth.toISOString().split('T')[0],
          status: 'Pending' as const
        });
      }

      const updated = {
        ...l,
        status: 'Approved' as const,
        dateApproved: new Date().toISOString().split('T')[0],
        repayments
      };
      approvedLoan = updated;
      return updated;
    }));
    if (approvedLoan) saveDocument(collections.loans, id, approvedLoan);
  };

  const handleRejectLoan = (id: string) => {
    setLoans(loans.map(l => {
      if (l.id === id) {
        const updated = { ...l, status: 'Rejected' as const };
        saveDocument(collections.loans, id, updated);
        return updated;
      }
      return l;
    }));
  };

  const handleAddAgenda = (newAge: Omit<Agenda, 'id' | 'dateAdded' | 'memberFeelings' | 'tenantId'>) => {
    const targetTenantId = currentUser.role === 'Super Admin' && currentTenantId !== 'all' ? currentTenantId : currentUser.tenantId;
    const age: Agenda = {
      ...newAge,
      tenantId: targetTenantId,
      id: `age-${Date.now()}`,
      dateAdded: new Date().toISOString().split('T')[0],
      memberFeelings: { urgent: 50, important: 50, keyStrategy: 50, needsMod: 10 }
    };
    setAgendas([...agendas, age]);
    saveDocument(collections.agendas, age.id, age);
  };

  const handleVoteAgenda = (id: string, feeling: 'urgent' | 'important' | 'keyStrategy' | 'needsMod') => {
    setAgendas(agendas.map(a => {
      if (a.id !== id) return a;
      const f = { ...a.memberFeelings };
      f[feeling] = Math.min(100, f[feeling] + 5);
      const updated = { ...a, memberFeelings: f };
      saveDocument(collections.agendas, id, updated);
      return updated;
    }));
  };

  const handleCheckIn = (meetingId: string, memberId: string, status: 'Present' | 'Absent' | 'Absent With Apology', reason?: string) => {
    setMeetings(meetings.map(m => {
      if (m.id !== meetingId) return m;
      
      const exists = m.records.some(r => r.memberId === memberId);
      let records = [...m.records];
      
      if (exists) {
        records = records.map(r => r.memberId === memberId ? { 
          ...r, status, reason, checkedInAt: new Date().toLocaleTimeString() 
        } : r);
      } else {
        records.push({
          memberId,
          status,
          reason,
          checkedInAt: new Date().toLocaleTimeString()
        });
      }

      if (status === 'Absent' || (status === 'Absent With Apology' && !reason)) {
        const memberObj = members.find(mem => mem.id === memberId);
        const penalty: Penalty = {
          id: `pen-${Date.now()}`,
          tenantId: memberObj?.tenantId || currentUser.tenantId,
          memberId,
          memberName: memberObj?.name || 'Unknown',
          amount: 200,
          reason: `Meeting absence on ${m.meetingDate}`,
          date: new Date().toISOString().split('T')[0],
          status: 'Unpaid'
        };
        setPenalties(prev => [...prev, penalty]);
        saveDocument(collections.penalties, penalty.id, penalty);
      }

      const updated = { ...m, records };
      saveDocument(collections.meetings, meetingId, updated);
      return updated;
    }));
  };

  const handlePayPenalty = (id: string) => {
    setPenalties(penalties.map(p => {
      if (p.id === id) {
        const updated = { ...p, status: 'Paid' as const };
        saveDocument(collections.penalties, id, updated);
        return updated;
      }
      return p;
    }));
  };

  const handleCreatePenalty = (newPen: Omit<Penalty, 'id' | 'date' | 'status' | 'tenantId'>) => {
    const memberObj = members.find(m => m.id === newPen.memberId);
    const targetTenantId = memberObj?.tenantId || (currentUser.role === 'Super Admin' && currentTenantId !== 'all' ? currentTenantId : currentUser.tenantId);
    const penalty: Penalty = {
      ...newPen,
      tenantId: targetTenantId,
      id: `pen-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Unpaid'
    };
    setPenalties(prev => [...prev, penalty]);
    saveDocument(collections.penalties, penalty.id, penalty);
  };

  const handleAdjournMeeting = (meetingId: string) => {
    setMeetings(meetings.map(m => {
      if (m.id === meetingId) {
        const updated = { ...m, adjourned: true };
        saveDocument(collections.meetings, meetingId, updated);
        return updated;
      }
      return m;
    }));
  };

  const handleAddExpenditure = (newExp: Omit<Expenditure, 'id' | 'date' | 'status' | 'tenantId'>) => {
    const targetTenantId = currentUser.role === 'Super Admin' && currentTenantId !== 'all' ? currentTenantId : currentUser.tenantId;
    const exp: Expenditure = {
      ...newExp,
      tenantId: targetTenantId,
      id: `exp-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Completed'
    };
    setExpenditures([...expenditures, exp]);
    saveDocument(collections.expenditures, exp.id, exp);
  };

  const handleUpdateConfig = (newConfig: GroupConfig) => {
    setTenants(prev => prev.map(t => {
      if (t.id === currentTenantId) {
        const updated = {
          ...t,
          name: newConfig.name,
          vision: newConfig.vision,
          lengoKuu: newConfig.lengoKuu,
          adminCode: newConfig.adminCode,
          constitution: newConfig.constitution
        };
        saveDocument(collections.tenants, t.id, updated);
        return updated;
      }
      return t;
    }));
  };

  const handleCreateTenant = (newTenant: Omit<ChamaTenant, 'id' | 'createdDate'>) => {
    const tenant: ChamaTenant = {
      ...newTenant,
      id: `chama-${Date.now()}`,
      createdDate: new Date().toISOString().split('T')[0]
    };
    setTenants(prev => [...prev, tenant]);
    saveDocument(collections.tenants, tenant.id, tenant);
  };

  const handleSendMessage = (text: string, recipientId?: string) => {
    const targetTenantId = currentUser.role === 'Super Admin' && currentTenantId !== 'all' ? currentTenantId : currentUser.tenantId;
    const chat: ChatMessage = {
      id: `msg-${Date.now()}`,
      tenantId: targetTenantId,
      senderId: currentUser.id,
      senderName: currentUser.name,
      text,
      timestamp: new Date().toISOString(),
      isPrivate: !!recipientId,
      recipientId
    };
    setChats([...chats, chat]);
    saveDocument(collections.chats, chat.id, chat);
  };

  const handleVoteCandidate = (id: string, voterId: string) => {
    setCandidates(candidates.map(c => {
      if (c.id !== id) return c;
      if (c.voters.includes(voterId)) return c;
      const updated = {
        ...c,
        votesCount: c.votesCount + 1,
        voters: [...c.voters, voterId]
      };
      saveDocument(collections.candidates, id, updated);
      return updated;
    }));
  };

  // Filter list by selected tenant
  const activeTenantFilterId = currentUser.role === 'Super Admin' ? currentTenantId : currentUser.tenantId;

  const tenantFilter = <T extends { tenantId: string }>(list: T[]): T[] => {
    if (currentUser.role === 'Super Admin' && activeTenantFilterId === 'all') {
      return list;
    }
    return list.filter(item => item.tenantId === activeTenantFilterId);
  };

  const filteredMembers = tenantFilter<Member>(members);
  const filteredContributions = tenantFilter<Contribution>(contributions);
  const filteredLoans = tenantFilter<Loan>(loans);
  const filteredAgendas = tenantFilter<Agenda>(agendas);
  const filteredMeetings = tenantFilter<AttendanceMeeting>(meetings);
  const filteredPenalties = tenantFilter<Penalty>(penalties);
  const filteredExpenditures = tenantFilter<Expenditure>(expenditures);
  const filteredChats = tenantFilter<ChatMessage>(chats);
  const filteredCandidates = tenantFilter<Candidate>(candidates);

  return (
    <div className="flex bg-slate-950 font-sans min-h-screen text-slate-100 antialiased selection:bg-emerald-500 selection:text-slate-950 relative">
      
      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav 
        currentView={currentView}
        onNavigate={setCurrentView}
        onOpenSidebar={() => setIsSidebarOpen(true)}
      />

      {/* Sidebar Control Deck */}
      <Sidebar 
        currentView={currentView}
        onNavigate={setCurrentView}
        currentUser={currentUser}
        members={members}
        onSelectUser={handleSelectUser}
        tenants={tenants}
        currentTenantId={currentTenantId}
        onSelectTenant={setCurrentTenantId}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        
        {/* Top Gamified Master Navigation Header */}
        <GamifiedHeader 
          currentUser={currentUser}
          config={config}
          tenants={tenants}
          currentTenantId={currentTenantId}
          onSelectTenant={setCurrentTenantId}
          onOpenSidebar={() => setIsSidebarOpen(true)}
          onNavigate={setCurrentView}
        />

        {/* Main Panel View Router with Mobile Safe Padding */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-6 pb-24 lg:pb-8">
        
        {currentView === 'Dashboard' && (
          <DashboardView 
            currentUser={currentUser}
            config={config}
            members={filteredMembers}
            contributions={filteredContributions}
            loans={filteredLoans}
            meetings={filteredMeetings}
            penalties={filteredPenalties}
            expenditures={filteredExpenditures}
            onNavigate={setCurrentView}
          />
        )}

        {currentView === 'SikuYaChama' && (
          <SikuYaChamaHub 
            currentUser={currentUser}
            members={filteredMembers}
            meetings={filteredMeetings}
            penalties={filteredPenalties}
            contributions={filteredContributions}
            onCheckIn={handleCheckIn}
            onPayPenalty={handlePayPenalty}
            onAddPenalty={handleCreatePenalty}
            onAddContribution={handleAddContribution}
            onAdjournMeeting={handleAdjournMeeting}
          />
        )}

        {currentView === 'MultiBucket' && (
          <MultiBucketLedger 
            currentUser={currentUser}
            members={filteredMembers}
            contributions={filteredContributions}
            onAddContribution={handleAddContribution}
          />
        )}

        {currentView === 'LengoKuu' && (
          <LengoKuuView 
            config={config}
            currentUser={currentUser}
            members={filteredMembers}
            onUpdateConfig={handleUpdateConfig}
          />
        )}

        {currentView === 'Membership' && (
          <MembersView 
            members={filteredMembers}
            onAddMember={handleAddMember}
            currentUser={currentUser}
          />
        )}

        {currentView === 'Contributions' && (
          <ContributionsView 
            contributions={filteredContributions}
            members={filteredMembers}
            onAddContribution={handleAddContribution}
            currentUser={currentUser}
          />
        )}

        {currentView === 'Loans' && (
          <LoansView 
            loans={filteredLoans}
            members={filteredMembers}
            onApplyLoan={handleApplyLoan}
            currentUser={currentUser}
            isAdmin={currentUser.role !== 'Member'}
          />
        )}

        {currentView === 'Agendas' && (
          <MeetingsView 
            agendas={filteredAgendas}
            meetings={filteredMeetings}
            onAddAgenda={handleAddAgenda}
            onVoteAgenda={handleVoteAgenda}
            onPrintMinutes={() => setShowPrintConsole(true)}
          />
        )}

        {currentView === 'Attendance' && (
          <AttendanceView 
            meetings={filteredMeetings}
            members={filteredMembers}
            penalties={filteredPenalties}
            onCheckIn={handleCheckIn}
            onPayPenalty={handlePayPenalty}
            onAdjournMeeting={handleAdjournMeeting}
          />
        )}

        {currentView === 'Expenditures' && (
          <ExpendituresView 
            expenditures={filteredExpenditures}
            contributions={filteredContributions}
            onAddExpenditure={handleAddExpenditure}
          />
        )}

        {currentView === 'Communication' && (
          <ChatroomView 
            chats={filteredChats}
            members={filteredMembers}
            onSendMessage={handleSendMessage}
            currentUser={currentUser}
            penalties={filteredPenalties}
            onPayPenalty={handlePayPenalty}
            onAddPenalty={handleCreatePenalty}
          />
        )}

        {currentView === 'Elections' && (
          <ElectionsView 
            candidates={filteredCandidates}
            onVote={handleVoteCandidate}
            currentUser={currentUser}
          />
        )}

        {currentView === 'Administrator' && (
          <AdminPortal 
            contributions={contributions}
            loans={loans}
            config={config}
            onApproveContribution={handleApproveContribution}
            onApproveLoan={handleApproveLoan}
            onRejectLoan={handleRejectLoan}
            onUpdateConfig={handleUpdateConfig}
            currentUser={currentUser}
            tenants={tenants}
            currentTenantId={currentTenantId}
            onSelectTenant={setCurrentTenantId}
            onCreateTenant={handleCreateTenant}
            members={members}
          />
        )}

      </main>

        {/* Mobile Bottom Quick Navigation Bar */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800/90 px-3 py-2 flex items-center justify-around text-slate-400 shadow-2xl">
          <button
            onClick={() => setCurrentView('Dashboard')}
            className={`flex flex-col items-center gap-1 text-[10px] font-bold transition cursor-pointer ${
              currentView === 'Dashboard' ? 'text-emerald-400 font-extrabold' : 'hover:text-slate-200'
            }`}
          >
            <LayoutDashboard size={18} />
            <span>Home</span>
          </button>

          <button
            onClick={() => setCurrentView('SikuYaChama')}
            className={`flex flex-col items-center gap-1 text-[10px] font-bold transition relative cursor-pointer ${
              currentView === 'SikuYaChama' ? 'text-emerald-400 font-extrabold' : 'hover:text-slate-200'
            }`}
          >
            <span className="relative">
              <Video size={18} />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            </span>
            <span>Meza</span>
          </button>

          <button
            onClick={() => setCurrentView('MultiBucket')}
            className={`flex flex-col items-center gap-1 text-[10px] font-bold transition cursor-pointer ${
              currentView === 'MultiBucket' ? 'text-emerald-400 font-extrabold' : 'hover:text-slate-200'
            }`}
          >
            <Wallet size={18} />
            <span>Ledger</span>
          </button>

          <button
            onClick={() => setCurrentView('Communication')}
            className={`flex flex-col items-center gap-1 text-[10px] font-bold transition cursor-pointer ${
              currentView === 'Communication' ? 'text-emerald-400 font-extrabold' : 'hover:text-slate-200'
            }`}
          >
            <Mail size={18} />
            <span>Chat</span>
          </button>

          <button
            onClick={() => setIsSidebarOpen(true)}
            className="flex flex-col items-center gap-1 text-[10px] font-bold hover:text-slate-200 transition cursor-pointer"
          >
            <Menu size={18} />
            <span>Menu</span>
          </button>
        </nav>
      </div>

      {/* Printing Modal */}
      <AnimatePresence>
        {showPrintConsole && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 rounded-3xl shadow-2xl border border-slate-800 max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden text-white"
            >
              <div className="p-5 border-b border-slate-800 bg-slate-950 flex justify-between items-center shrink-0">
                <div className="flex items-center gap-2.5">
                  <Printer className="text-emerald-400" size={20} />
                  <div>
                    <h3 className="font-extrabold text-white text-sm">Official Sacco Minutes Printer Console</h3>
                    <p className="text-[10px] text-slate-400">Authenticated copy for {config.name}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowPrintConsole(false)}
                  className="p-1.5 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white transition cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-8 overflow-y-auto font-mono text-xs text-slate-300 space-y-6 leading-relaxed bg-slate-950 flex-1">
                <div className="text-center space-y-1 pb-4 border-b border-dashed border-slate-800">
                  <h4 className="font-black text-sm uppercase tracking-wide text-white">{config.name} OFFICIAL MINUTES</h4>
                  <p className="text-[10px] text-slate-400">P.O BOX 4920 Nairobi Kenya | Tel: +254 712 345678</p>
                  <p className="text-[10px] font-bold text-emerald-400">DATE GENERATED: {new Date().toLocaleDateString()}</p>
                </div>

                <div className="space-y-2">
                  <span className="block font-black underline text-white">1. SACCO PREAMBLE & OBJECTIVES</span>
                  <p className="text-slate-400">Vision: "{config.vision}"</p>
                  <p className="text-slate-400">Lengo Kuu: "{config.lengoKuu}"</p>
                </div>

                <div className="space-y-2">
                  <span className="block font-black underline text-white">2. RUNNING CONSTITUENCY AGENDAS</span>
                  {agendas.map((a, i) => (
                    <div key={a.id} className="pl-4">
                      <span className="block font-bold text-white">1.{i+1} Agenda: {a.title}</span>
                      <span className="block text-slate-400">Status: {a.status} | Review Date: {a.reviewDate}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
