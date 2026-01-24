// ===============================
// War Room Type Definitions
// ===============================

export type LaneKey = "value" | "controls" | "agentic" | "marketplace";
export type LedgerState = "IDENTIFIED" | "APPROVED" | "REALIZED" | "AT_RISK";

export type EvidenceReceipt = {
  id: string;
  title: string;
  hash?: string;
  freshness?: string;
  url?: string;
};

export type WarEvent = {
  id: string;
  lane: LaneKey;
  title: string;
  subtitle?: string;
  amount: number; // + value, - risk/cost
  confidence: number; // 0..1
  timeSensitivity: number; // 0..1
  state: LedgerState;
  owner?: string;
  receipts?: EvidenceReceipt[];
  updatedAt: string; // ISO
};

export type LaneSummary = {
  lane: LaneKey;
  label: string;
  headline: string;
  identified: number;
  approved: number;
  realized: number;
  atRisk: number;
};

export type StreamMessage =
  | { type: "hello"; serverTime: string }
  | { type: "snapshot"; events: WarEvent[]; summaries: LaneSummary[] }
  | { type: "event_upsert"; event: WarEvent }
  | { type: "summary_upsert"; summary: LaneSummary }
  | { type: "ticker"; text: string; amount: number; state: LedgerState; lane: LaneKey; at: string }
  | { type: "error"; message: string };