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