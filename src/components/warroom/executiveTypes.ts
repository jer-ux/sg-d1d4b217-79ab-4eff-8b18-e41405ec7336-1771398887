export type Period = "MTD" | "QTD" | "YTD";

export type Filters = {
  org: string;
  period: Period;
  currency: "USD" | "GBP" | "EUR";
  businessUnit: string;
};

export type TileKey = "cashflow" | "recoverableEbitda" | "healthIQ" | "execution";

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

export type TileData = {
  key: TileKey;
  title: string;
  value: string;
  delta?: string;
  subtitle?: string;
  updatedAt?: string;
  receipt?: EvidenceReceipt;
  chartData?: ChartDataPoint[];
  trend?: "up" | "down" | "flat";
};

export type SnapshotResponse = {
  tiles: TileData[];
  tickerItems: string[];
};

export type StreamMessage =
  | { type: "tiles"; tiles: TileData[] }
  | { type: "ticker"; item: string }
  | { type: "ping" };

export type KPIBadge = {
  kpi_id: string;
  name: string;
  domain: "FINANCE" | "BENEFITS" | "RISK" | "OPERATIONS";
  definition: string;
  formula: string;
  owner: string;
  frequency: "REALTIME" | "DAILY" | "WEEKLY" | "MONTHLY";
  unit: "USD" | "PCT" | "COUNT" | "INDEX";
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