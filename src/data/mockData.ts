import { Member, GroupConfig, Contribution, Loan, Agenda, AttendanceMeeting, Expenditure, ChatMessage, Candidate, Penalty, ChamaTenant } from '../types';

export const DEFAULT_CONFIG: GroupConfig = {
  name: "Mkebe Sacco",
  vision: "To empower members through collective savings, financial discipline, and unified long-term investments.",
  lengoKuu: "MAIN - TO CREATE WEALTH AND FINANCIAL SECURITY",
  adminCode: "1234",
  constitution: `1. MEMBERSHIP
All members must provide valid national identification, next of kin information, and pay a standard entrance fee.
2. MKEBE SAVINGS & CONTRIBUTIONS
Members must contribute a minimum of monthly savings. Special contributions (Welfare/Mchango) are triggered on specified occasions like medical emergencies, wedding celebrations, or calamity relief.
3. LOANS & AMORTIZATION
Loans are awarded based on 3x of a member's total savings. Interest is charged on a flat rate. Non-disclosure of candidate names is enforced for standard members' logs to maintain group transparency without sacrificing personal privacy.
4. ATTENDANCE & PUNCTUALITY
Meetings start promptly. Absences without apologies or late arrivals will attract a penalty fee updated by the Disciplinarian or Treasurer.
5. COMMITTEE ROLES
- Chairman: Rules interpretation and overall meeting control.
- Treasurer: Manages accounts, cash registries, and Mpesa references.
- Secretary: Record keeper, notification broadcasts, and meeting minutes.
- Disciplinarian: Enforces meeting guidelines, decorum, and penalty collections.`
};

export const DEFAULT_TENANTS: ChamaTenant[] = [
  {
    id: "chama-1",
    name: "Mkebe Sacco",
    code: "MKB",
    vision: "To empower members through collective savings, financial discipline, and unified long-term investments.",
    lengoKuu: "MAIN - TO CREATE WEALTH AND FINANCIAL SECURITY",
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
    tenantId: "chama-1", // default primary tenant, but can access all
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
    joinedDate: "2026-01-01"
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
    joinedDate: "2026-01-10"
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
    joinedDate: "2026-01-01"
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
    joinedDate: "2026-01-02"
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
    joinedDate: "2026-01-03"
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
    joinedDate: "2026-01-05"
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
    joinedDate: "2026-02-15"
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
    joinedDate: "2026-02-16"
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
    joinedDate: "2026-02-20"
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
    joinedDate: "2026-03-20"
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
    joinedDate: "2026-03-22"
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
    amount: 15000,
    date: "2026-06-01",
    purpose: "Monthly savings deposit",
    paymentMethod: "Mpesa",
    status: "Approved"
  },
  {
    id: "con-2",
    tenantId: "chama-1",
    memberId: "mem-2",
    memberName: "Ezekiel Kiprop",
    type: "Shares",
    amount: 25000,
    date: "2026-06-01",
    purpose: "Regular share capital increase",
    paymentMethod: "Bank",
    status: "Approved"
  },
  {
    id: "con-3",
    tenantId: "chama-1",
    memberId: "mem-3",
    memberName: "Amina Omondi",
    type: "Monthly",
    amount: 5000,
    date: "2026-06-05",
    purpose: "June Monthly contribution contribution",
    paymentMethod: "Cash",
    status: "Approved",
    approvedBy: "mem-3"
  },
  {
    id: "con-4",
    tenantId: "chama-1",
    memberId: "mem-1",
    memberName: "Nigel Andahua Busula",
    type: "Special",
    amount: 3000,
    date: "2026-06-12",
    purpose: "Welfare support: hospital checkup fund",
    paymentMethod: "Mpesa",
    status: "Approved"
  },
  {
    id: "con-5",
    tenantId: "chama-1",
    memberId: "mem-4",
    memberName: "David Ndwiga",
    type: "Shares",
    amount: 18000,
    date: "2026-06-15",
    purpose: "Quarterly savings boost",
    paymentMethod: "Mpesa",
    status: "Pending"
  },
  {
    id: "con-6",
    tenantId: "chama-1",
    memberId: "mem-5",
    memberName: "Charles Mwangi",
    type: "Monthly",
    amount: 5000,
    date: "2026-06-20",
    purpose: "June regular subscription",
    paymentMethod: "Cash",
    status: "Pending"
  },

  // Chama 2 (Kileleshwa Women Group)
  {
    id: "con-7",
    tenantId: "chama-2",
    memberId: "mem-6",
    memberName: "Mary Wanjiku",
    type: "Shares",
    amount: 30000,
    date: "2026-06-10",
    purpose: "First shares buy-in",
    paymentMethod: "Bank",
    status: "Approved",
    approvedBy: "mem-7"
  },
  {
    id: "con-8",
    tenantId: "chama-2",
    memberId: "mem-8",
    memberName: "Jane Atieno",
    type: "Monthly",
    amount: 4000,
    date: "2026-06-12",
    purpose: "Weekly table banking collective",
    paymentMethod: "Mpesa",
    status: "Approved"
  },

  // Chama 3 (Upendo Youth Invest)
  {
    id: "con-9",
    tenantId: "chama-3",
    memberId: "mem-9",
    memberName: "Collins Kipkirui",
    type: "Shares",
    amount: 20000,
    date: "2026-06-15",
    purpose: "Initial seed shares",
    paymentMethod: "Mpesa",
    status: "Approved"
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
    title: "Chama Land Project Procurement",
    description: "Finalizing negotiations on the 5-acre piece of land in Kangundo Road. Shifting finished budgets directly to asset ledger.",
    status: "In Review",
    type: "Goal",
    dateAdded: "2026-05-12",
    reviewDate: "2026-07-15",
    memberFeelings: { urgent: 80, important: 95, keyStrategy: 90, needsMod: 10 }
  },
  {
    id: "age-2",
    tenantId: "chama-1",
    title: "Enforcement of Punctuality Penalty Fees",
    description: "Proposed increase in meeting delay penalty fee from KES 200 to KES 500 to drive physical attendance discipline.",
    status: "Pending",
    type: "Immediate",
    dateAdded: "2026-07-02",
    reviewDate: "2026-07-15",
    memberFeelings: { urgent: 40, important: 60, keyStrategy: 30, needsMod: 75 }
  },
  {
    id: "age-3",
    tenantId: "chama-1",
    title: "Transition to Digital MPesa Till Registry",
    description: "Establishing automated notifications to general chatroom immediately upon member payment.",
    status: "Done",
    type: "Strategy",
    dateAdded: "2026-04-01",
    reviewDate: "2026-05-01",
    memberFeelings: { urgent: 90, important: 85, keyStrategy: 95, needsMod: 5 }
  },

  // Chama 2
  {
    id: "age-4",
    tenantId: "chama-2",
    title: "Joint Kiambu Agribusiness Stall",
    description: "Establishing a communal store space at Kiambu Fresh Market to showcase members' products directly.",
    status: "Pending",
    type: "Goal",
    dateAdded: "2026-06-20",
    reviewDate: "2026-08-01",
    memberFeelings: { urgent: 60, important: 85, keyStrategy: 75, needsMod: 20 }
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
    title: "July General Meeting & Loan Allocation",
    adjourned: false,
    records: [
      { memberId: "mem-1", status: "Present" },
      { memberId: "mem-2", status: "Present" },
      { memberId: "mem-3", status: "Present" },
      { memberId: "mem-4", status: "Absent With Apology", reason: "Medical appointment" },
      { memberId: "mem-5", status: "Present" }
    ]
  },

  // Chama 2
  {
    id: "meet-3",
    tenantId: "chama-2",
    meetingDate: "2026-07-05",
    title: "KWG Monthly Table Banking Checkin",
    adjourned: false,
    records: [
      { memberId: "mem-6", status: "Present" },
      { memberId: "mem-7", status: "Present" },
      { memberId: "mem-8", status: "Present" }
    ]
  }
];

export const DEFAULT_EXPENDITURES: Expenditure[] = [
  // Chama 1
  {
    id: "exp-1",
    tenantId: "chama-1",
    category: "Projects",
    title: "Fence wire procurement for Kamulu plot",
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
    category: "Miscellaneous",
    title: "Welfare support paid to bereaved member",
    amount: 15000,
    date: "2026-05-20",
    status: "Completed"
  },

  // Chama 2
  {
    id: "exp-4",
    tenantId: "chama-2",
    category: "Projects",
    title: "Stall rental deposit (Kiambu Market)",
    amount: 8000,
    date: "2026-06-25",
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
    text: "Welcome back all members to our July session. Ensure your monthly contributions are updated.",
    timestamp: "2026-07-08T09:00:00Z",
    isPrivate: false
  },
  {
    id: "msg-2",
    tenantId: "chama-1",
    senderId: "mem-3",
    senderName: "Amina Omondi",
    text: "I have uploaded the latest Cash logs. Please review and flag any discrepancies.",
    timestamp: "2026-07-08T09:15:00Z",
    isPrivate: false
  },

  // Chama 2
  {
    id: "msg-3",
    tenantId: "chama-2",
    senderId: "mem-6",
    senderName: "Mary Wanjiku",
    text: "Jambo sisters! Let us contribute our weekly shares early so that Jane can get her agribusiness loan approved.",
    timestamp: "2026-07-08T09:30:00Z",
    isPrivate: false
  }
];

export const DEFAULT_CANDIDATES: Candidate[] = [
  // Chama 1
  { id: "cand-1", tenantId: "chama-1", name: "Ezekiel Kiprop", post: "Chairman", votesCount: 3, voters: ["mem-1", "mem-3", "mem-4"] },
  { id: "cand-2", tenantId: "chama-1", name: "David Ndwiga", post: "Chairman", votesCount: 1, voters: ["mem-5"] },
  { id: "cand-3", tenantId: "chama-1", name: "Amina Omondi", post: "Treasurer", votesCount: 4, voters: ["mem-1", "mem-2", "mem-4", "mem-5"] },

  // Chama 2
  { id: "cand-4", tenantId: "chama-2", name: "Jane Atieno", post: "Vice Chairman", votesCount: 2, voters: ["mem-6", "mem-7"] }
];

export const DEFAULT_PENALTIES: Penalty[] = [
  // Chama 1
  { id: "pen-1", tenantId: "chama-1", memberId: "mem-5", memberName: "Charles Mwangi", amount: 200, reason: "Meeting delay (15 mins late)", date: "2026-06-12", status: "Unpaid" },
  { id: "pen-2", tenantId: "chama-1", memberId: "mem-1", memberName: "Nigel Andahua Busula", amount: 200, reason: "Late payment submission", date: "2026-05-15", status: "Paid" },

  // Chama 2
  { id: "pen-3", tenantId: "chama-2", memberId: "mem-8", memberName: "Jane Atieno", amount: 500, reason: "Late stall inventory opening", date: "2026-06-20", status: "Unpaid" }
];
