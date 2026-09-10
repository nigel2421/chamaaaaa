export type SubWalletType = 'General Savings' | 'Mkebe (Locked)' | 'SAYE' | 'Okolea (Emergency)' | 'Penalty Pool';

export interface SubWalletBalances {
  general: number;
  mkebe: number;
  saye: number;
  okolea: number;
  penaltyPool: number;
}

export type MemberTier = 'Platinum Trustee' | 'Gold Contributor' | 'Silver Member' | 'Bronze Starter';

export interface Member {
  id: string;
  tenantId: string; // Belongs to a specific Chama
  name: string;
  memberId: string; // Group ID (within Chama)
  nationalId: string;
  occupation: string;
  residence: string;
  phone: string;
  email: string;
  beneficiary: string; // Next of kin
  role: 'Super Admin' | 'Chairman' | 'Vice Chairman' | 'Treasurer' | 'Secretary' | 'Disciplinarian' | 'Custodian' | 'Member';
  status: 'Active' | 'Inactive';
  joinedDate: string;
  subWalletBalances: SubWalletBalances;
  tier: MemberTier;
  contributionStreakMonths: number;
  badges: string[];
}

export interface Contribution {
  id: string;
  tenantId: string;
  memberId: string;
  memberName: string;
  type: 'Shares' | 'Monthly' | 'Special' | 'Penalty Payment' | 'Mkebe Deposit' | 'SAYE Deposit' | 'Okolea Fund';
  subWallet: SubWalletType;
  amount: number;
  date: string;
  purpose: string;
  paymentMethod: 'Mpesa' | 'Cash' | 'Bank';
  status: 'Pending' | 'Approved';
  approvedBy?: string;
  mgrSynced?: boolean;
}

export interface LoanRepayment {
  id: string;
  amount: number;
  date: string;
  status: 'Paid' | 'Pending';
}

export interface Loan {
  id: string;
  tenantId: string;
  memberId: string;
  memberName: string;
  amount: number;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Repaid';
  repaymentTermMonths: number;
  dateApplied: string;
  dateApproved?: string;
  repayments: LoanRepayment[];
}

export interface Agenda {
  id: string;
  tenantId: string;
  title: string;
  description: string;
  status: 'Pending' | 'In Review' | 'Done';
  type: 'Goal' | 'Immediate' | 'Strategy';
  dateAdded: string;
  reviewDate: string;
  memberFeelings: {
    urgent: number;       // Percentage or vote count
    important: number;
    keyStrategy: number;
    needsMod: number;
  };
}

export interface AttendanceRecord {
  memberId: string;
  status: 'Present' | 'Absent' | 'Absent With Apology';
  reason?: string;
  checkedInAt?: string;
}

export interface AttendanceMeeting {
  id: string;
  tenantId: string;
  meetingDate: string;
  title: string;
  records: AttendanceRecord[];
  adjourned: boolean;
  activeModules?: MeetingModuleKey[];
  cashReconciled?: boolean;
  reconciledAmount?: number;
  minutesSignedBy?: {
    chairman?: string;
    secretary?: string;
    treasurer?: string;
  };
}

export interface Penalty {
  id: string;
  tenantId: string;
  memberId: string;
  memberName: string;
  amount: number;
  reason: string;
  date: string;
  status: 'Paid' | 'Unpaid';
}

export interface Expenditure {
  id: string;
  tenantId: string;
  category: 'Projects' | 'Maintenance' | 'Miscellaneous' | 'Welfare Relief';
  title: string;
  amount: number;
  date: string;
  status: 'Approved' | 'Completed';
  isPremise?: boolean; // Completed projects shifted to assets
}

export interface ChatMessage {
  id: string;
  tenantId: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isPrivate: boolean;
  recipientId?: string; // If private
}

export interface Candidate {
  id: string;
  tenantId: string;
  name: string;
  post: string;
  votesCount: number;
  voters: string[];
}

export interface ProjectTracker {
  id: string;
  tenantId: string;
  codeName: string; // e.g. 'Project Simba', 'Project Farasi'
  name: string;
  category: 'Land Acquisition' | 'Fleet & Transport' | 'Real Estate' | 'Agribusiness';
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  status: 'Planning' | 'Active' | 'Funded' | 'Completed';
  description: string;
  milestonePercentage: number;
  leadOfficial: string;
}

export interface GroupConfig {
  name: string;
  vision: string;
  lengoKuu: string;
  adminCode: string;
  constitution: string;
  healthIndexScore?: number;
}

export interface ChamaTenant {
  id: string;
  name: string;
  code: string;
  vision: string;
  lengoKuu: string;
  adminCode: string;
  constitution: string;
  createdDate: string;
}

// Extensible "Siku ya Chama" Dynamic Meeting Hub Models
export type MeetingModuleKey = 'welfare_appeals' | 'visitor_intros' | 'instant_penalties' | 'project_votes' | 'cash_reconciliation';

export interface WelfareAppeal {
  id: string;
  tenantId: string;
  memberId: string;
  memberName: string;
  reason: string;
  targetAmount: number;
  raisedAmount: number;
  urgency: 'High' | 'Critical' | 'Medium';
  date: string;
  status: 'Open' | 'Closed';
}

export interface VisitorIntro {
  id: string;
  tenantId: string;
  guestName: string;
  organization: string;
  introducedBy: string;
  purpose: string;
  date: string;
}

export interface ProjectFundingVote {
  id: string;
  tenantId: string;
  projectCode: string; // e.g., 'Project Simba'
  title: string;
  allocationRequested: number;
  votesFor: number;
  votesAgainst: number;
  status: 'Voting' | 'Passed' | 'Rejected';
  votedMembers: string[];
}

// MGR Synchronization & Webhook Interfaces
export interface WebhookConfig {
  endpointUrl: string;
  secretKey: string;
  enabledEvents: string[];
  autoSyncOnPayment: boolean;
}

export interface WebhookEventLog {
  id: string;
  tenantId: string;
  timestamp: string;
  event: 'member.synced' | 'contribution.recorded' | 'mgr.rotation_triggered' | 'penalty.applied';
  payload: any;
  status: 'Success' | 'Failed';
  responseCode: number;
}
