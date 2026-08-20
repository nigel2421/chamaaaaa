import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
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
import { Printer, X, Download, ShieldCheck, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
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
    // Default to Nigel
    return DEFAULT_MEMBERS[0];
  });

  const [currentView, setCurrentView] = useState('Dashboard');
  const [showPrintConsole, setShowPrintConsole] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Derived config based on current tenant
  const activeTenant = currentTenantId === 'all'
    ? {
        id: 'all',
        name: 'All Chama Organizations',
        code: 'ALL',
        vision: 'Sacco Multi-Tenant Consolidated Platform',
        lengoKuu: 'CONSOLIDATED MONITORING & SECTOR CONTROLS',
        adminCode: '1234',
        constitution: 'Platform-level master guidelines.'
      }
    : (tenants.find(t => t.id === currentTenantId) || tenants[0]);

  const config: GroupConfig = {
    name: activeTenant.name,
    vision: activeTenant.vision,
    lengoKuu: activeTenant.lengoKuu,
    adminCode: activeTenant.adminCode,
    constitution: activeTenant.constitution,
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

  // Auto-elevate Nigel to Super Admin (self-healing for cached local storage state)
  useEffect(() => {
    let membersUpdated = false;
    const updatedMembers = members.map(m => {
      if ((m.email === 'nigelandahuabusula@gmail.com' || m.id === 'mem-1' || m.id === 'mem-super') && m.role !== 'Super Admin') {
        membersUpdated = true;
        return { ...m, role: 'Super Admin' as const };
      }
      return m;
    });

    if (membersUpdated) {
      setMembers(updatedMembers);
    }

    if (currentUser.email === 'nigelandahuabusula@gmail.com' || currentUser.id === 'mem-1' || currentUser.id === 'mem-super') {
      if (currentUser.role !== 'Super Admin') {
        setCurrentUser(prev => ({ ...prev, role: 'Super Admin' as const }));
      }
    }
  }, [members, currentUser]);

  // Handler functions
  const handleSelectUser = (id: string) => {
    const found = members.find(m => m.id === id);
    if (found) {
      setCurrentUser(found);
      // Lock tenant view to user's registered tenant if they are not a Super Admin
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
  };

  const handleAddContribution = (newCon: Omit<Contribution, 'id' | 'date' | 'status' | 'approvedBy' | 'tenantId'>) => {
    const memberObj = members.find(m => m.id === newCon.memberId);
    const targetTenantId = memberObj?.tenantId || (currentUser.role === 'Super Admin' && currentTenantId !== 'all' ? currentTenantId : currentUser.tenantId);
    const con: Contribution = {
      ...newCon,
      tenantId: targetTenantId,
      id: `con-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status: newCon.paymentMethod === 'Cash' ? 'Pending' : 'Approved', // Cash is pending treasurer validation
      approvedBy: newCon.paymentMethod !== 'Cash' ? currentUser.id : undefined
    };
    setContributions([...contributions, con]);
  };

  const handleApproveContribution = (id: string, adminId: string) => {
    setContributions(contributions.map(c => 
      c.id === id ? { ...c, status: 'Approved', approvedBy: adminId } : c
    ));
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
  };

  const handleApproveLoan = (id: string) => {
    setLoans(loans.map(l => {
      if (l.id !== id) return l;
      
      // Auto-generate 5% flat amortized repayment list
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

      return {
        ...l,
        status: 'Approved',
        dateApproved: new Date().toISOString().split('T')[0],
        repayments
      };
    }));
  };

  const handleRejectLoan = (id: string) => {
    setLoans(loans.map(l => l.id === id ? { ...l, status: 'Rejected' } : l));
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
  };

  const handleVoteAgenda = (id: string, feeling: 'urgent' | 'important' | 'keyStrategy' | 'needsMod') => {
    setAgendas(agendas.map(a => {
      if (a.id !== id) return a;
      const f = { ...a.memberFeelings };
      f[feeling] = Math.min(100, f[feeling] + 5); // Add 5% per vote up to 100
      return { ...a, memberFeelings: f };
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

      // If absent without apology, auto-add a delay penalty of KES 200 (Image 18 Penalty rules)
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
      }

      return { ...m, records };
    }));
  };

  const handlePayPenalty = (id: string) => {
    setPenalties(penalties.map(p => p.id === id ? { ...p, status: 'Paid' } : p));
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
  };

  const handleAdjournMeeting = (meetingId: string) => {
    setMeetings(meetings.map(m => m.id === meetingId ? { ...m, adjourned: true } : m));
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
  };

  const handleUpdateConfig = (newConfig: GroupConfig) => {
    setTenants(prev => prev.map(t => t.id === currentTenantId ? {
      ...t,
      name: newConfig.name,
      vision: newConfig.vision,
      lengoKuu: newConfig.lengoKuu,
      adminCode: newConfig.adminCode,
      constitution: newConfig.constitution
    } : t));
  };

  const handleCreateTenant = (newTenant: Omit<ChamaTenant, 'id' | 'createdDate'>) => {
    const tenant: ChamaTenant = {
      ...newTenant,
      id: `chama-${Date.now()}`,
      createdDate: new Date().toISOString().split('T')[0]
    };
    setTenants(prev => [...prev, tenant]);

    // Create default Chairman for the new Chama so they have a starting official
    const chairman: Member = {
      id: `mem-chairman-${Date.now()}`,
      tenantId: tenant.id,
      name: `${newTenant.name} Chairman`,
      memberId: `${newTenant.code}-001`,
      nationalId: `112233${Math.floor(Math.random() * 90) + 10}`,
      occupation: "Agribusiness Director",
      residence: "Nairobi",
      phone: "0700" + Math.floor(100000 + Math.random() * 900000),
      email: `chairman@${newTenant.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
      beneficiary: "Spouse",
      role: "Chairman",
      status: "Active",
      joinedDate: new Date().toISOString().split('T')[0]
    };

    setMembers(prev => [...prev, chairman]);
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
  };

  const handleVoteCandidate = (id: string, voterId: string) => {
    setCandidates(candidates.map(c => {
      if (c.id !== id) return c;
      if (c.voters.includes(voterId)) return c; // Standard 1 vote limit per post
      return {
        ...c,
        votesCount: c.votesCount + 1,
        voters: [...c.voters, voterId]
      };
    }));
  };

  // Tenant Filter Selector
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

  const activeMeeting = filteredMeetings.find(m => !m.adjourned) || filteredMeetings[filteredMeetings.length - 1];

  return (
    <div className="flex bg-slate-100 font-sans min-h-screen text-slate-800 antialiased selection:bg-emerald-500 selection:text-white">
      
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

      {/* Main Container Container */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        
        {/* Global Top Navigation Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between sticky top-0 z-30 shadow-xs gap-4 shrink-0">
          <div className="flex items-center justify-between md:justify-start gap-4">
            {/* Mobile Sidebar Toggle Button */}
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition cursor-pointer"
              aria-label="Open sidebar"
              id="open-sidebar-btn"
            >
              <Menu size={20} />
            </button>
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-500 flex items-center justify-center font-black text-white text-sm shadow-sm shrink-0">
                {config.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <h1 className="font-extrabold text-sm tracking-tight text-slate-900 uppercase truncate max-w-[200px] md:max-w-md">
                  {config.name}
                </h1>
                <p className="text-[10px] text-slate-400 font-bold font-mono uppercase tracking-wide leading-none mt-0.5">
                  {currentTenantId === 'all' ? 'Consolidated Master Hub' : `${activeTenant?.code || 'Sacco'} Portal`}
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Active User Info & Tenant Filter Dropdown & Quick Switch */}
          <div className="flex flex-wrap items-center gap-3 md:gap-4">
            {/* Super Admin Tenant Dropdown in Header too! for ultra easy access */}
            {currentUser.role === 'Super Admin' && (
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 shadow-2xs">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider font-mono">Organization:</span>
                <select
                  value={currentTenantId}
                  onChange={e => setCurrentTenantId(e.target.value)}
                  className="bg-transparent text-xs font-bold text-slate-700 focus:outline-none cursor-pointer pr-1"
                >
                  <option value="all">🌐 All Organizations (Consolidated)</option>
                  {tenants.map(t => (
                    <option key={t.id} value={t.id}>🏢 {t.name}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Quick Switch to Super Admin View (if logged in as member but they have Nigel's email or identity) */}
            {currentUser.role !== 'Super Admin' && (
              <button
                onClick={() => {
                  const superAdminUser = members.find(m => m.role === 'Super Admin');
                  if (superAdminUser) {
                    handleSelectUser(superAdminUser.id);
                  } else {
                    // Fail-safe: elevate current member
                    const updatedUser = { ...currentUser, role: 'Super Admin' as const };
                    setCurrentUser(updatedUser);
                    setMembers(prev => prev.map(m => m.id === currentUser.id ? updatedUser : m));
                  }
                }}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[11px] rounded-xl transition shadow-sm flex items-center gap-1 cursor-pointer"
              >
                <ShieldCheck size={12} />
                <span>Switch to Super Admin View</span>
              </button>
            )}

            {/* Current Profile Card */}
            <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 shadow-2xs">
              <div className="w-6 h-6 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center font-black text-[10px] text-slate-700 uppercase">
                {currentUser.name.charAt(0)}
              </div>
              <div className="text-left hidden sm:block">
                <span className="block text-[11px] font-extrabold text-slate-800 leading-tight max-w-[120px] truncate" title={currentUser.name}>
                  {currentUser.name}
                </span>
                <span className="block text-[9px] text-slate-400 font-extrabold uppercase leading-none mt-0.5">
                  {currentUser.role}
                </span>
              </div>
              {/* Fallback label for mobile */}
              <span className="block sm:hidden text-[10px] bg-slate-200 text-slate-700 font-extrabold px-1.5 py-0.5 rounded font-mono uppercase">
                {currentUser.role}
              </span>
            </div>
          </div>
        </header>

        {/* Main Panel */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-6">
        
        {/* Navigation router views */}
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
      </div>

      {/* Mock Printing Overlay Modal for Sacco Minutes */}
      <AnimatePresence>
        {showPrintConsole && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="p-5 border-b border-slate-100 bg-slate-50 flex justify-between items-center shrink-0">
                <div className="flex items-center gap-2.5">
                  <Printer className="text-emerald-600" size={20} />
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm">Chama Digital Printer Console</h3>
                    <p className="text-[10px] text-slate-500">Official minutes copy for {config.name}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowPrintConsole(false)}
                  className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Printable Body */}
              <div className="p-8 overflow-y-auto font-mono text-xs text-slate-800 space-y-6 leading-relaxed bg-amber-50/25 flex-1">
                <div className="text-center space-y-1 pb-4 border-b border-dashed border-slate-300">
                  <h4 className="font-black text-sm uppercase tracking-wide">{config.name} OFFICIAL MINUTES REPORT</h4>
                  <p className="text-[10px]">P.O BOX 4920 Nairobi Kenya | Tel: +254 712 345678</p>
                  <p className="text-[10px] font-bold">DATE GENERATED: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</p>
                </div>

                <div className="space-y-2">
                  <span className="block font-black underline">1. SACCO PREAMBLE & OBJECTIVES</span>
                  <p className="text-slate-600">Vision: "{config.vision}"</p>
                  <p className="text-slate-600">Lengo Kuu: "{config.lengoKuu}"</p>
                </div>

                <div className="space-y-2">
                  <span className="block font-black underline">2. RUNNING CONSTITUENCY AGENDAS</span>
                  {agendas.map((a, i) => (
                    <div key={a.id} className="pl-4">
                      <span className="block font-bold">1.{i+1} Agenda: {a.title}</span>
                      <span className="block text-slate-500">Status: {a.status} | Review Date: {a.reviewDate}</span>
                      <span className="block text-slate-500">Consensus: Urgent ({a.memberFeelings.urgent}%), Important ({a.memberFeelings.important}%)</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <span className="block font-black underline">3. FINANCIAL SYNC RECAP</span>
                  <div className="pl-4 space-y-1">
                    <div className="flex justify-between">
                      <span>Total Savings Pool:</span>
                      <span className="font-bold">KES {contributions.filter(c => c.status === 'Approved').reduce((s, c) => s + c.amount, 0).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Active Capital Credit:</span>
                      <span className="font-bold">KES {loans.filter(l => l.status === 'Approved').reduce((s, l) => s + l.amount, 0).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>General Expenditure Outflows:</span>
                      <span className="font-bold">KES {expenditures.reduce((s, e) => s + e.amount, 0).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="block font-black underline">4. ATTENDANCE CHECK-IN LOG</span>
                  <p className="text-slate-600">Latest recorded session: {activeMeeting?.title} on {activeMeeting?.meetingDate}</p>
                  <div className="pl-4 space-y-1 text-slate-600">
                    {activeMeeting?.records.map(r => {
                      const m = members.find(mem => mem.id === r.memberId);
                      return (
                        <div key={r.memberId} className="flex justify-between">
                          <span>{m?.name || r.memberId} ({m?.memberId}):</span>
                          <span>{r.status} {r.reason ? `[Excuse: ${r.reason}]` : ''}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-6 border-t border-dashed border-slate-300 text-center space-y-4">
                  <div className="flex justify-around text-[10px] italic">
                    <div className="space-y-1">
                      <div className="h-6 border-b border-slate-300 w-28 mx-auto" />
                      <span>Ezekiel Kiprop<br/>Chairman Signatory</span>
                    </div>
                    <div className="space-y-1">
                      <div className="h-6 border-b border-slate-300 w-28 mx-auto" />
                      <span>Amina Omondi<br/>Treasurer Signatory</span>
                    </div>
                  </div>
                  <div className="flex justify-center gap-1.5 items-center text-[10px] text-emerald-700 font-bold">
                    <ShieldCheck size={14} />
                    <span>Digitally secured and signed via Mkebe Sacco Network</span>
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 shrink-0">
                <button
                  onClick={() => setShowPrintConsole(false)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-100 rounded-xl text-xs font-bold transition text-slate-600"
                >
                  Close Console
                </button>
                <button
                  onClick={() => {
                    window.print();
                  }}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-md transition flex items-center gap-1.5"
                >
                  <Download size={14} />
                  <span>Download / Print PDF</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
