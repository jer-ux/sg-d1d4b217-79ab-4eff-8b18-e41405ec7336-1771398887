export type Period = "MTD" | "QTD" | "YTD";

export type Filters = {
  org: string;
  period: Period;
  currency: "USD" | "GBP" | "EUR";
  businessUnit: string;
};

export type TileKey = 
  // PE Operator Keys
  | "ebitdaLift"
  | "valueCreation"
  | "exitReadiness"
  | "rollupSynergies"
  // Board Room Keys
  | "fiduciary"
  | "risk"
  | "renewals"
  | "governance"
  // New Healthcare CFO Keys
  | "costTrendStress" 
  | "planDesignAdoption" 
  | "pharmacyExposure" 
  | "contractLeakage" 
  | "contractAmbiguity" 
  | "contractCompliance" 
  | "contractCompliance" 
  | "benefitsNPS" 
  | "employeeNPS"
  // CHRO Keys (Human Capital & Benefits)
  | "benefitsUtilization"
  | "employeeRetention"
  | "healthcareROI"
  | "wellnessEngagement"
  | "dependentCoverage"
  | "benefitsAdoption"
  | "employeeSatisfaction"
  | "totalRewards"
  // Legacy Keys (kept for compatibility with WarRoom.tsx)
  | "cashflow"
  | "recoverableEbitda"
  | "healthIQ"
  | "execution";

export type EvidenceReceipt = {
  receipt_id: string;
  source_artifact_hash: string;
  transform_hash: string;
  freshness_minutes: number;
  dq_tests_passed: number;
  dq_tests_total: number;
  owner: string;
  confidence: number;
  verified: boolean;
  notes?: string;
};

export type ChartDataPoint = {
  period: string;
  value: number;
};

export interface TileData {
  key: TileKey;
  title: string;
  value: string | number;
  delta: string;
  trend: "up" | "down" | "flat";
  subtitle: string;
  framework?: string;
  chartData?: ChartDataPoint[];
  gradient?: string;
  iconBg?: string;
  iconBorder?: string;
  iconColor?: string;
  updatedAt?: string;
  receipt?: {
    id: string;
    status: "verified" | "unverified";
  };
}

export type ExecutiveEvent = {
  id: string;
  timestamp: string;
  category: "cost_trend" | "contract" | "pharmacy" | "compliance" | "nps" | "plan_design";
  severity: "critical" | "high" | "medium" | "low";
  title: string;
  description: string;
  impact: string;
  kpi: string;
  framework: "McKinsey" | "Bain";
  details?: {
    root_cause?: string;
    affected_contracts?: string[];
    recommended_actions?: string[];
  };
};

export type SnapshotResponse = {
  tiles: TileData[];
  tickerItems: string[];
};

export type StreamMessage =
  | { type: "tiles"; tiles: TileData[] }
  | { type: "ticker"; item: string }
  | { type: "event"; event: ExecutiveEvent }
  | { type: "ping" };

export type KPIBadge = {
  kpi_id: string;
  name: string;
  domain: 
    | "FINANCE" 
    | "BENEFITS" 
    | "RISK" 
    | "OPERATIONS" 
    | "ACTUARIAL" 
    | "CLINICAL" 
    | "AUDIT" 
    | "PROCUREMENT" 
    | "DATA_GOVERNANCE" 
    | "DATA_QUALITY" 
    | "INCIDENT_MANAGEMENT" 
    | "RISK_MANAGEMENT" 
    | "PMO" 
    | "EXECUTION" 
    | "VALUE_DELIVERY" 
    | "STRATEGY" 
    | "DELIVERY";
  definition: string;
  formula: string;
  owner: string;
  frequency: "REALTIME" | "DAILY" | "WEEKLY" | "MONTHLY" | "QUARTERLY";
  unit: "USD" | "PCT" | "COUNT" | "INDEX" | "DAYS";
  value: string;
  verified: boolean;
  confidence: number;
  receipt: EvidenceReceipt;
};

export type LedgerRow = {
  as_of: string;
  account: string;
  account_code: string;
  cost_center: string;
  vendor_or_source: string;
  memo: string;
  debit: number;
  credit: number;
  currency: "USD" | "GBP" | "EUR";
  evidence_ref: string;
};

export type VarianceRow = {
  driver: string;
  prior: number;
  current: number;
  delta: number;
  explanation: string;
  confidence: number;
  evidence_ref: string;
};

export type DetailResponse = {
  tile: TileKey;
  title: string;
  asOf: string;
  executiveSummary: string[];
  kpiBadges: KPIBadge[];
  ledger: LedgerRow[];
  variances: VarianceRow[];
  notes: string[];
};