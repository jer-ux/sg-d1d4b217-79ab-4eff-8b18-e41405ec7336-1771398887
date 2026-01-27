/**
 * Verified Savings Ledger Types
 * Finance-native value tracking with evidence receipts
 */

export type LedgerState = "identified" | "approved" | "realized" | "at-risk" | "disputed" | "rejected";

export type LedgerCategory = 
  | "cost-reduction"
  | "revenue-enhancement"
  | "productivity-gain"
  | "risk-avoidance"
  | "working-capital"
  | "capex-avoidance";

export type DQTestStatus = "PASS" | "WARN" | "FAIL";

export type ReconciliationStatus = "PASS" | "WARN" | "FAIL";

export interface DQTest {
  name: string;
  status: DQTestStatus;
  description?: string;
  lastRun?: string;
  details?: string;
}

export interface ReconciliationCheck {
  name: string;
  status: ReconciliationStatus;
  expected: number;
  actual: number;
  delta: number;
  unit: string;
  description?: string;
}

export interface EvidenceReceipt {
  id: string;
  type: "source-artifact" | "test-result" | "transform-version" | "approval-doc" | "realization-proof";
  url: string;
  description: string;
  uploadedBy: string;
  uploadedAt: string;
  confidence?: number;
  lineage?: string[];
}

export interface ExternalSource {
  name: string;
  type: string;
  authority: string;
  url: string;
  evidenceRule: string;
  description: string;
  usageNotes: string[];
  citation?: string;
}

export interface LedgerEntry {
  id: string;
  title: string;
  description: string;
  category: LedgerCategory;
  state: LedgerState;
  
  // Financial
  estimatedValue: number;
  realizedValue: number;
  currency: string;
  
  // Ownership & Accountability
  owner: string;
  approver?: string;
  dueDate: string;
  recognitionDate?: string;
  
  // Evidence & Audit
  receipts: EvidenceReceipt[];
  externalSources?: ExternalSource[];
  auditTrail: AuditEntry[];
  confidence: number;
  
  // Data Quality & Reconciliation
  dqTests?: DQTest[];
  reconciliation?: ReconciliationCheck[];
  
  // Metadata
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  counterparty?: string;
  tags: string[];
  
  // Risk & Aging
  daysInState: number;
  decayRate?: number;
  blockers?: string[];
}

export interface AuditEntry {
  timestamp: string;
  actor: string;
  action: "created" | "assigned" | "approved" | "realized" | "disputed" | "rejected" | "receipt-attached" | "value-adjusted" | "dq-test-run" | "reconciliation-check";
  previousState?: LedgerState;
  newState?: LedgerState;
  previousValue?: number;
  newValue?: number;
  reason?: string;
  note?: string;
  metadata?: Record<string, any>;
}

export interface LedgerSummary {
  totalIdentified: number;
  totalApproved: number;
  totalRealized: number;
  totalAtRisk: number;
  
  byCategory: Record<LedgerCategory, {
    count: number;
    estimatedValue: number;
    realizedValue: number;
  }>;
  
  aging: {
    staleEntries: number;
    avgDaysInState: number;
    overdueApprovals: number;
  };
  
  recentActivity: AuditEntry[];
}

export interface ReconciliationReport {
  period: string;
  openingBalance: number;
  additions: number;
  realizations: number;
  adjustments: number;
  closingBalance: number;
  
  byCategory: Record<LedgerCategory, {
    opening: number;
    realized: number;
    closing: number;
  }>;
  
  exceptions: {
    missingReceipts: LedgerEntry[];
    blockedApprovals: LedgerEntry[];
    staleDisputes: LedgerEntry[];
    overdueRealizations: LedgerEntry[];
  };
}