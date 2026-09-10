import { 
  Member, GroupConfig, Contribution, Loan, Agenda, 
  AttendanceMeeting, Expenditure, ChatMessage, Candidate, Penalty, 
  ChamaTenant, ProjectTracker, WelfareAppeal, VisitorIntro, 
  ProjectFundingVote, WebhookConfig, WebhookEventLog 
} from '../types';

export const DEFAULT_CONFIG: GroupConfig = {
  name: "Mkebe Sacco",
  vision: "To empower members through collective savings, financial discipline, and unified long-term investments.",
  lengoKuu: "MAIN - TO CREATE WEALTH AND FINANCIAL SECURITY THROUGH INTEGRATED PROJECT SIMBA & FARASI",
  adminCode: "1234",
  constitution: `1. MEMBERSHIP & DELEGATED RBAC
All members must provide valid national identification, next of kin information, and pay a standard entrance fee. Official decisions are delegated across Chairman, Treasurer, Secretary, and Custodian roles.
2. MULTI-BUCKET SAVINGS SYSTEM
Members maintain sub-wallets for General Chama Savings, Mkebe (Locked time deposits), SAYE (Save As You Earn), Okolea (Emergency relief pool), and Penalty Pool collections.
3. LOANS & AMORTIZATION
Loans are awarded based on 3x of a member's total savings. Interest is charged on a flat rate. Non-disclosure of candidate names is enforced for standard members' logs to maintain group transparency without sacrificing personal privacy.
4. ATTENDANCE & PUNCTUALITY
Meetings start promptly. Absences without apologies or late arrivals will attract a penalty fee updated by the Disciplinarian or Treasurer.
5. COMMITTEE ROLES
- Chairman: Rules interpretation, Project Simba/Farasi approvals, and meeting control.
- Treasurer: Manages multi-bucket sub-wallets, cash registries, and Mpesa references.
- Secretary: Record keeper, notification broadcasts, and meeting minutes.
- Custodian: Oversees lockbox keys, Mkebe locked releases, and collateral custody.`,
  healthIndexScore: 94
};

export const DEFAULT_TENANTS: ChamaTenant[] = [
  {
    id: "chama-1",
    name: "Mkebe Sacco",
    code: "MKB",
    vision: "To empower members through collective savings, financial discipline, and unified long-term investments.",
    lengoKuu: "MAIN - TO CREATE WEALTH AND FINANCIAL SECURITY THROUGH PROJECT SIMBA & FARASI",
    adminCode: "1234",
    constitution: DEFAULT_CONFIG.constitution,
    createdDate: "2026-01-01"
  },
  {
    id: "chama-2",
    name: "Kileleshwa Women Group",
    code: "KWG",
    vision: "Empowering local women entrepreneurs in agribusiness and retail through structured savings and micro-finance credit circles.",
    lengoKuu: "GROWTH - MICRO-CREDIT & AGRI-VALUE CHAINS",
    adminCode: "5678",
    constitution: `1. MEMBERSHIP
Only women business owners or farmers based in Nairobi/Kiambu counties are eligible.
2. SAVINGS PLAN
Weekly table banking savings contribution of KES 1,000. Under-contributing triggers warning alerts.
3. ENTERPRISE LOANS
Guaranteed loans at 1% per month flat rate with 12-month max repayment.
4. ATTENDANCE & WELFARE
Fines of KES 500 apply for missing monthly agro-seminars.`,
    createdDate: "2026-02-15"
  },
  {
    id: "chama-3",
    name: "Upendo Youth Invest",
    code: "UYI",
    vision: "Fostering youth-led startups and investment portfolios through collaborative trust-based capital compounding.",
    lengoKuu: "VENTURE - SEED CAPITAL & PEER MENTORSHIP",
    adminCode: "9012",
    constitution: `1. MEMBERSHIP
Open to young innovators aged 18 to 35. Entrance fee is KES 2,500.
2. INVESTMENT TARGETS
Pooled capital is co-invested in logistics, real estate, and digital products.
3. CO-GUARANTOR LOANS
Every loan application must have at least 2 active members sign as co-guarantors.`,
    createdDate: "2026-03-20"
  }
];

export const DEFAULT_MEMBERS: Member[] = [
  // Super Admin
  {
    id: "mem-super",
    tenantId: "chama-1",
    name: "Nigel Super Admin",
    memberId: "SUP-001",
    nationalId: "11223344",
    occupation: "Platform Systems Architect",
    residence: "Nairobi, Westlands",
    phone: "0711000222",
    email: "super.admin@chama.com",
    beneficiary: "System Core Registry",
    role: "Super Admin",
    status: "Active",
    joinedDate: "2026-01-01",
    tier: "Platinum Trustee",
    contributionStreakMonths: 18,
    badges: ["🏆 Platform Architect", "🛡️ Sacco Trustee", "🔥 18-Month Streak"],
    subWalletBalances: {
      general: 250000,
      mkebe: 100000,
      saye: 50000,
      okolea: 20000,
      penaltyPool: 0
    }
  },
  // Chama 1 Members (Mkebe Sacco)
  {
    id: "mem-1",
    tenantId: "chama-1",
    name: "Nigel Andahua Busula",
    memberId: "MKB-001",
    nationalId: "33445566",
    occupation: "Software Engineer",
    residence: "Nairobi, Kilimani",
    phone: "0712345678",
    email: "nigelandahuabusula@gmail.com",
    beneficiary: "Grace Busula (Sister)",
    role: "Super Admin",
    status: "Active",
    joinedDate: "2026-01-10",
    tier: "Platinum Trustee",
    contributionStreakMonths: 12,
    badges: ["🏆 Lead Developer", "⚡ Eagle Contributor", "🛡️ Sacco Trustee"],
    subWalletBalances: {
      general: 120000,
      mkebe: 45000,
      saye: 30000,
      okolea: 15000,
      penaltyPool: 0
    }
  },
  {
    id: "mem-2",
    tenantId: "chama-1",
    name: "Ezekiel Kiprop",
    memberId: "MKB-002",
    nationalId: "29887766",
    occupation: "Business Owner",
    residence: "Eldoret, Elgon View",
    phone: "0722888999",
    email: "ezekiel@sacco.com",
    beneficiary: "Sarah Kiprop (Spouse)",
    role: "Chairman",
    status: "Active",
    joinedDate: "2026-01-01",
    tier: "Platinum Trustee",
    contributionStreakMonths: 15,
    badges: ["👑 Group Chairman", "🏆 Project Simba Lead", "🔥 15-Month Streak"],
    subWalletBalances: {
      general: 180000,
      mkebe: 60000,
      saye: 40000,
      okolea: 25000,
      penaltyPool: 0
    }
  },
  {
    id: "mem-3",
    tenantId: "chama-1",
    name: "Amina Omondi",
    memberId: "MKB-003",
    nationalId: "31223344",
    occupation: "Accountant",
    residence: "Nairobi, Westlands",
    phone: "0733777666",
    email: "amina.treasurer@sacco.com",
    beneficiary: "John Omondi (Son)",
    role: "Treasurer",
    status: "Active",
    joinedDate: "2026-01-02",
    tier: "Gold Contributor",
    contributionStreakMonths: 10,
    badges: ["💰 Chief Custodian", "⚡ Financial Guardian", "📊 Master Auditor"],
    subWalletBalances: {
      general: 95000,
      mkebe: 35000,
      saye: 20000,
      okolea: 10000,
      penaltyPool: 0
    }
  },
  {
    id: "mem-4",
    tenantId: "chama-1",
    name: "David Ndwiga",
    memberId: "MKB-004",
    nationalId: "28776655",
    occupation: "Legal Consultant",
    residence: "Mombasa, Nyali",
    phone: "0799111222",
    email: "ndwiga.sec@sacco.com",
    beneficiary: "Clara Ndwiga (Daughter)",
    role: "Secretary",
    status: "Active",
    joinedDate: "2026-01-03",
    tier: "Gold Contributor",
    contributionStreakMonths: 8,
    badges: ["📜 Group Secretary", "⚖️ Legal Advisor"],
    subWalletBalances: {
      general: 85000,
      mkebe: 25000,
      saye: 15000,
      okolea: 8000,
      penaltyPool: 0
    }
  },
  {
    id: "mem-5",
    tenantId: "chama-1",
    name: "Charles Mwangi",
    memberId: "MKB-005",
    nationalId: "27665544",
    occupation: "Security Supervisor",
    residence: "Thika, Section 9",
    phone: "0700555444",
    email: "mwangi.disp@sacco.com",
    beneficiary: "James Mwangi (Brother)",
    role: "Disciplinarian",
    status: "Active",
    joinedDate: "2026-01-05",
    tier: "Silver Member",
    contributionStreakMonths: 6,
    badges: ["🛡️ Chief Disciplinarian"],
    subWalletBalances: {
      general: 50000,
      mkebe: 15000,
      saye: 10000,
      okolea: 5000,
      penaltyPool: 200
    }
  },

  // Chama 2 Members (Kileleshwa Women Group)
  {
    id: "mem-6",
    tenantId: "chama-2",
    name: "Mary Wanjiku",
    memberId: "KWG-001",
    nationalId: "12349876",
    occupation: "Floriculturist",
    residence: "Kiambu, Runda Side",
    phone: "0722100200",
    email: "mary@kileleshwawomen.com",
    beneficiary: "Peter Wanjiku (Son)",
    role: "Chairman",
    status: "Active",
    joinedDate: "2026-02-15",
    tier: "Platinum Trustee",
    contributionStreakMonths: 14,
    badges: ["👑 Group Leader", "🌱 Agri-Champion"],
    subWalletBalances: {
      general: 140000,
      mkebe: 50000,
      saye: 20000,
      okolea: 10000,
      penaltyPool: 0
    }
  },
  {
    id: "mem-7",
    tenantId: "chama-2",
    name: "Grace Mutua",
    memberId: "KWG-002",
    nationalId: "23450987",
    occupation: "Boutique Owner",
    residence: "Nairobi, Kileleshwa",
    phone: "0733200300",
    email: "grace@kileleshwawomen.com",
    beneficiary: "Samuel Mutua (Spouse)",
    role: "Treasurer",
    status: "Active",
    joinedDate: "2026-02-16",
    tier: "Gold Contributor",
    contributionStreakMonths: 9,
    badges: ["💰 Table Banker"],
    subWalletBalances: {
      general: 75000,
      mkebe: 20000,
      saye: 15000,
      okolea: 5000,
      penaltyPool: 0
    }
  },
  {
    id: "mem-8",
    tenantId: "chama-2",
    name: "Jane Atieno",
    memberId: "KWG-003",
    nationalId: "34561098",
    occupation: "Organic Grocer",
    residence: "Nairobi, Lavington",
    phone: "0711300400",
    email: "jane@kileleshwawomen.com",
    beneficiary: "Baby Alicia (Daughter)",
    role: "Member",
    status: "Active",
    joinedDate: "2026-02-20",
    tier: "Bronze Starter",
    contributionStreakMonths: 4,
    badges: ["🌟 Rising Star"],
    subWalletBalances: {
      general: 35000,
      mkebe: 10000,
      saye: 5000,
      okolea: 2000,
      penaltyPool: 500
    }
  },

  // Chama 3 Members (Upendo Youth Invest)
  {
    id: "mem-9",
    tenantId: "chama-3",
    name: "Collins Kipkirui",
    memberId: "UYI-001",
    nationalId: "45672109",
    occupation: "Tech Co-Founder",
    residence: "Nairobi, Ngong Road",
    phone: "0725400500",
    email: "collins@upendoyouth.com",
    beneficiary: "Ester Kipkirui (Mother)",
    role: "Chairman",
    status: "Active",
    joinedDate: "2026-03-20",
    tier: "Gold Contributor",
    contributionStreakMonths: 7,
    badges: ["💡 Tech Pioneer"],
    subWalletBalances: {
      general: 90000,
      mkebe: 30000,
      saye: 20000,
      okolea: 5000,
      penaltyPool: 0
    }
  },
  {
    id: "mem-10",
    tenantId: "chama-3",
    name: "Mercy Jelagat",
    memberId: "UYI-002",
    nationalId: "56783210",
    occupation: "Graphic Designer",
    residence: "Nairobi, Roysambu",
    phone: "0702500600",
    email: "mercy@upendoyouth.com",
    beneficiary: "Mark Jelagat (Brother)",
    role: "Member",
    status: "Active",
    joinedDate: "2026-03-22",
    tier: "Bronze Starter",
    contributionStreakMonths: 3,
    badges: ["🎨 Creative Catalyst"],
    subWalletBalances: {
      general: 25000,
      mkebe: 8000,
      saye: 4000,
      okolea: 1000,
      penaltyPool: 0
    }
  }
];

export const DEFAULT_CONTRIBUTIONS: Contribution[] = [
  // Chama 1 (Mkebe Sacco)
  {
    id: "con-1",
    tenantId: "chama-1",
    memberId: "mem-1",
    memberName: "Nigel Andahua Busula",
    type: "Shares",
    subWallet: "General Savings",
    amount: 15000,
    date: "2026-06-01",
    purpose: "Monthly savings deposit",
    paymentMethod: "Mpesa",
    status: "Approved",
    mgrSynced: true
  },
  {
    id: "con-2",
    tenantId: "chama-1",
    memberId: "mem-2",
    memberName: "Ezekiel Kiprop",
    type: "Shares",
    subWallet: "Mkebe (Locked)",
    amount: 25000,
    date: "2026-06-01",
    purpose: "Project Simba land equity locked reserve",
    paymentMethod: "Bank",
    status: "Approved",
    mgrSynced: true
  },
  {
    id: "con-3",
    tenantId: "chama-1",
    memberId: "mem-3",
    memberName: "Amina Omondi",
    type: "Monthly",
    subWallet: "SAYE",
    amount: 5000,
    date: "2026-06-05",
    purpose: "June Save-As-You-Earn contribution",
    paymentMethod: "Cash",
    status: "Approved",
    approvedBy: "mem-3",
    mgrSynced: true
  },
  {
    id: "con-4",
    tenantId: "chama-1",
    memberId: "mem-1",
    memberName: "Nigel Andahua Busula",
    type: "Special",
    subWallet: "Okolea (Emergency)",
    amount: 3000,
    date: "2026-06-12",
    purpose: "Okolea welfare support fund deposit",
    paymentMethod: "Mpesa",
    status: "Approved",
    mgrSynced: true
  },
  {
    id: "con-5",
    tenantId: "chama-1",
    memberId: "mem-4",
    memberName: "David Ndwiga",
    type: "Shares",
    subWallet: "General Savings",
    amount: 18000,
    date: "2026-06-15",
    purpose: "Quarterly savings boost",
    paymentMethod: "Mpesa",
    status: "Pending",
    mgrSynced: false
  },
  {
    id: "con-6",
    tenantId: "chama-1",
    memberId: "mem-5",
    memberName: "Charles Mwangi",
    type: "Penalty Payment",
    subWallet: "Penalty Pool",
    amount: 200,
    date: "2026-06-20",
    purpose: "Punctuality penalty settlement",
    paymentMethod: "Cash",
    status: "Pending",
    mgrSynced: false
  },

  // Chama 2 (Kileleshwa Women Group)
  {
    id: "con-7",
    tenantId: "chama-2",
    memberId: "mem-6",
    memberName: "Mary Wanjiku",
    type: "Shares",
    subWallet: "General Savings",
    amount: 30000,
    date: "2026-06-10",
    purpose: "First shares buy-in",
    paymentMethod: "Bank",
    status: "Approved",
    approvedBy: "mem-7",
    mgrSynced: true
  },
  {
    id: "con-8",
    tenantId: "chama-2",
    memberId: "mem-8",
    memberName: "Jane Atieno",
    type: "Monthly",
    subWallet: "SAYE",
    amount: 4000,
    date: "2026-06-12",
    purpose: "Weekly table banking collective",
    paymentMethod: "Mpesa",
    status: "Approved",
    mgrSynced: true
  },

  // Chama 3 (Upendo Youth Invest)
  {
    id: "con-9",
    tenantId: "chama-3",
    memberId: "mem-9",
    memberName: "Collins Kipkirui",
    type: "Shares",
    subWallet: "General Savings",
    amount: 20000,
    date: "2026-06-15",
    purpose: "Initial seed shares",
    paymentMethod: "Mpesa",
    status: "Approved",
    mgrSynced: true
  }
];

export const DEFAULT_LOANS: Loan[] = [
  // Chama 1 (Mkebe Sacco)
  {
    id: "loan-1",
    tenantId: "chama-1",
    memberId: "mem-1",
    memberName: "Nigel Andahua Busula",
    amount: 30000,
    reason: "Purchase server upgrade hardware and tools",
    status: "Approved",
    repaymentTermMonths: 6,
    dateApplied: "2026-05-10",
    dateApproved: "2026-05-12",
    repayments: [
      { id: "rep-1-1", amount: 5500, date: "2026-06-10", status: "Paid" },
      { id: "rep-1-2", amount: 5500, date: "2026-07-10", status: "Pending" },
      { id: "rep-1-3", amount: 5500, date: "2026-08-10", status: "Pending" }
    ]
  },
  {
    id: "loan-2",
    tenantId: "chama-1",
    memberId: "mem-5",
    memberName: "Charles Mwangi",
    amount: 50000,
    reason: "Agricultural project development",
    status: "Pending",
    repaymentTermMonths: 12,
    dateApplied: "2026-07-01",
    repayments: []
  },
  {
    id: "loan-3",
    tenantId: "chama-1",
    memberId: "mem-2",
    memberName: "Ezekiel Kiprop",
    amount: 100000,
    reason: "Commercial shop expansion",
    status: "Approved",
    repaymentTermMonths: 12,
    dateApplied: "2026-03-10",
    dateApproved: "2026-03-12",
    repayments: [
      { id: "rep-3-1", amount: 9000, date: "2026-04-10", status: "Paid" },
      { id: "rep-3-2", amount: 9000, date: "2026-05-10", status: "Paid" },
      { id: "rep-3-3", amount: 9000, date: "2026-06-10", status: "Paid" }
    ]
  },

  // Chama 2 (Kileleshwa Women Group)
  {
    id: "loan-4",
    tenantId: "chama-2",
    memberId: "mem-8",
    memberName: "Jane Atieno",
    amount: 15000,
    reason: "Restocking grocery catalog",
    status: "Approved",
    repaymentTermMonths: 3,
    dateApplied: "2026-06-15",
    dateApproved: "2026-06-16",
    repayments: [
      { id: "rep-4-1", amount: 5200, date: "2026-07-15", status: "Pending" }
    ]
  }
];

export const DEFAULT_AGENDAS: Agenda[] = [
  // Chama 1
  {
    id: "age-1",
    tenantId: "chama-1",
    title: "Project Simba Land Procurement",
    description: "Finalizing negotiations on the 5-acre piece of land in Kangundo Road under Project Simba master plan.",
    status: "In Review",
    type: "Goal",
    dateAdded: "2026-05-12",
    reviewDate: "2026-07-15",
    memberFeelings: { urgent: 80, important: 95, keyStrategy: 90, needsMod: 10 }
  },
  {
    id: "age-2",
    tenantId: "chama-1",
    title: "Project Farasi Transport Asset Acquisition",
    description: "Reviewing commercial van transport lease proposal for Project Farasi fleet diversification.",
    status: "Pending",
    type: "Strategy",
    dateAdded: "2026-07-02",
    reviewDate: "2026-07-15",
    memberFeelings: { urgent: 60, important: 85, keyStrategy: 80, needsMod: 15 }
  },
  {
    id: "age-3",
    tenantId: "chama-3",
    title: "Transition to Digital MPesa Till Registry",
    description: "Establishing automated notifications to general chatroom immediately upon member payment.",
    status: "Done",
    type: "Strategy",
    dateAdded: "2026-04-01",
    reviewDate: "2026-05-01",
    memberFeelings: { urgent: 90, important: 85, keyStrategy: 95, needsMod: 5 }
  }
];

export const DEFAULT_PROJECTS: ProjectTracker[] = [
  {
    id: "proj-simba",
    tenantId: "chama-1",
    codeName: "Project Simba",
    name: "Kangundo Road 5-Acre Land Acquisition",
    category: "Land Acquisition",
    targetAmount: 5000000,
    currentAmount: 3750000,
    deadline: "2026-12-31",
    status: "Active",
    description: "Purchasing 5 acres of commercial sub-divided plots along Kangundo Highway for member parcel distribution and capital growth.",
    milestonePercentage: 75,
    leadOfficial: "Ezekiel Kiprop (Chairman)"
  },
  {
    id: "proj-farasi",
    tenantId: "chama-1",
    codeName: "Project Farasi",
    name: "Nairobi Commuter Logistics Fleet",
    category: "Fleet & Transport",
    targetAmount: 2500000,
    currentAmount: 1800000,
    deadline: "2026-10-30",
    status: "Active",
    description: "Acquiring two 14-seater commercial shuttles leased to established Nairobi route operators for weekly passive dividend payouts.",
    milestonePercentage: 72,
    leadOfficial: "Amina Omondi (Treasurer)"
  }
];

export const DEFAULT_MEETINGS: AttendanceMeeting[] = [
  // Chama 1
  {
    id: "meet-1",
    tenantId: "chama-1",
    meetingDate: "2026-06-12",
    title: "Q2 Sacco Midterm Performance Review",
    adjourned: true,
    activeModules: ['welfare_appeals', 'visitor_intros', 'instant_penalties'],
    cashReconciled: true,
    reconciledAmount: 145000,
    minutesSignedBy: { chairman: 'mem-2', secretary: 'mem-4', treasurer: 'mem-3' },
    records: [
      { memberId: "mem-1", status: "Present" },
      { memberId: "mem-2", status: "Present" },
      { memberId: "mem-3", status: "Present" },
      { memberId: "mem-4", status: "Present" },
      { memberId: "mem-5", status: "Absent", reason: "Attending family engagement" }
    ]
  },
  {
    id: "meet-2",
    tenantId: "chama-1",
    meetingDate: "2026-07-08",
    title: "Siku ya Chama - Live Meza Assembly",
    adjourned: false,
    activeModules: ['welfare_appeals', 'visitor_intros', 'instant_penalties', 'project_votes', 'cash_reconciliation'],
    cashReconciled: false,
    reconciledAmount: 85000,
    records: [
      { memberId: "mem-1", status: "Present" },
      { memberId: "mem-2", status: "Present" },
      { memberId: "mem-3", status: "Present" },
      { memberId: "mem-4", status: "Absent With Apology", reason: "Medical appointment" },
      { memberId: "mem-5", status: "Present" }
    ]
  }
];

export const DEFAULT_WELFARE_APPEALS: WelfareAppeal[] = [
  {
    id: "wel-1",
    tenantId: "chama-1",
    memberId: "mem-5",
    memberName: "Charles Mwangi",
    reason: "Medical surgery emergency support for daughter",
    targetAmount: 50000,
    raisedAmount: 32000,
    urgency: "Critical",
    date: "2026-07-07",
    status: "Open"
  }
];

export const DEFAULT_VISITOR_INTROS: VisitorIntro[] = [
  {
    id: "vis-1",
    tenantId: "chama-1",
    guestName: "Eng. Samuel Kariuki",
    organization: "Apex Land Surveyors Ltd",
    introducedBy: "Ezekiel Kiprop",
    purpose: "Presentation of Kangundo plot title deed verification survey for Project Simba",
    date: "2026-07-08"
  }
];

export const DEFAULT_PROJECT_VOTES: ProjectFundingVote[] = [
  {
    id: "vote-1",
    tenantId: "chama-1",
    projectCode: "Project Simba",
    title: "Authorize KES 500,000 top-up from Mkebe Locked fund for plot boundary walling",
    allocationRequested: 500000,
    votesFor: 4,
    votesAgainst: 1,
    status: "Passed",
    votedMembers: ["mem-1", "mem-2", "mem-3", "mem-4", "mem-5"]
  }
];

export const DEFAULT_EXPENDITURES: Expenditure[] = [
  // Chama 1
  {
    id: "exp-1",
    tenantId: "chama-1",
    category: "Projects",
    title: "Fence wire procurement for Project Simba Kamulu plot",
    amount: 45000,
    date: "2026-04-18",
    status: "Completed",
    isPremise: true
  },
  {
    id: "exp-2",
    tenantId: "chama-1",
    category: "Maintenance",
    title: "AGM Venue booking & stationery materials",
    amount: 12000,
    date: "2026-06-10",
    status: "Completed"
  },
  {
    id: "exp-3",
    tenantId: "chama-1",
    category: "Welfare Relief",
    title: "Okolea emergency medical payout",
    amount: 15000,
    date: "2026-05-20",
    status: "Completed"
  }
];

export const DEFAULT_CHATS: ChatMessage[] = [
  // Chama 1
  {
    id: "msg-1",
    tenantId: "chama-1",
    senderId: "mem-2",
    senderName: "Ezekiel Kiprop",
    text: "Welcome back all members to Siku ya Chama! Check out the Project Simba progress in the governance tab.",
    timestamp: "2026-07-08T09:00:00Z",
    isPrivate: false
  },
  {
    id: "msg-2",
    tenantId: "chama-1",
    senderId: "mem-3",
    senderName: "Amina Omondi",
    text: "I have updated the multi-bucket sub-wallet ledgers. Check your Mkebe and SAYE balances.",
    timestamp: "2026-07-08T09:15:00Z",
    isPrivate: false
  }
];

export const DEFAULT_CANDIDATES: Candidate[] = [
  { id: "cand-1", tenantId: "chama-1", name: "Ezekiel Kiprop", post: "Chairman", votesCount: 3, voters: ["mem-1", "mem-3", "mem-4"] },
  { id: "cand-2", tenantId: "chama-1", name: "David Ndwiga", post: "Chairman", votesCount: 1, voters: ["mem-5"] },
  { id: "cand-3", tenantId: "chama-1", name: "Amina Omondi", post: "Treasurer", votesCount: 4, voters: ["mem-1", "mem-2", "mem-4", "mem-5"] }
];

export const DEFAULT_PENALTIES: Penalty[] = [
  { id: "pen-1", tenantId: "chama-1", memberId: "mem-5", memberName: "Charles Mwangi", amount: 200, reason: "Meeting delay (15 mins late)", date: "2026-06-12", status: "Unpaid" },
  { id: "pen-2", tenantId: "chama-1", memberId: "mem-1", memberName: "Nigel Andahua Busula", amount: 200, reason: "Late payment submission", date: "2026-05-15", status: "Paid" }
];

export const DEFAULT_WEBHOOK_CONFIG: WebhookConfig = {
  endpointUrl: "https://api.mgr-rotation-engine.com/v1/chama/webhook",
  secretKey: "mgr_sec_live_99482749102",
  enabledEvents: ["member.synced", "contribution.recorded", "mgr.rotation_triggered", "penalty.applied"],
  autoSyncOnPayment: true
};

export const DEFAULT_WEBHOOK_LOGS: WebhookEventLog[] = [
  {
    id: "wh-1",
    tenantId: "chama-1",
    timestamp: "2026-07-08T09:30:12Z",
    event: "contribution.recorded",
    payload: { contributionId: "con-1", memberId: "mem-1", amount: 15000, subWallet: "General Savings" },
    status: "Success",
    responseCode: 200
  },
  {
    id: "wh-2",
    tenantId: "chama-1",
    timestamp: "2026-07-08T09:35:45Z",
    event: "mgr.rotation_triggered",
    payload: { roundNumber: 4, payoutMemberId: "mem-2", amount: 120000 },
    status: "Success",
    responseCode: 200
  }
];
