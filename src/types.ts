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
  role: 'Super Admin' | 'Chairman' | 'Vice Chairman' | 'Treasurer' | 'Secretary' | 'Disciplinarian' | 'Member';
  status: 'Active' | 'Inactive';
  joinedDate: string;
}

export interface Contribution {
  id: string;
  tenantId: string;
  memberId: string;
  memberName: string;
  type: 'Shares' | 'Monthly' | 'Special';
  amount: number;
  date: string;
  purpose: string;
  paymentMethod: 'Mpesa' | 'Cash' | 'Bank';
  status: 'Pending' | 'Approved';
  approvedBy?: string;
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
  category: 'Projects' | 'Maintenance' | 'Miscellaneous';
  title: string;
  amount: number;
  date: string;
  status: 'Approved' | 'Completed';
  isPremise?: boolean; // Completed projects are shifted to premises in Assets
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
  post: string; // 'Chairman' | 'Treasurer' | etc.
  votesCount: number;
  voters: string[]; // List of member IDs who voted for them
}

export interface GroupConfig {
  name: string;
  vision: string;
  lengoKuu: string;
  adminCode: string;
  constitution: string;
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
