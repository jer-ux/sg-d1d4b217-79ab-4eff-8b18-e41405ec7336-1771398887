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
  state: LedgerState;
  title: string;
  subtitle?: string;
  amount: number;
  confidence: number;
  timeSensitivity?: "low" | "medium" | "high";
  owner?: string;
  receipts?: EvidenceReceipt[];
  notes?: EventNotes;
  createdAt: string;
  updatedAt: string;
};

export type EventNotes = {
  notes?: string;
  attachments?: Attachment[];
};

export type Attachment = {
  id: string;
  title: string;
  url: string;
  hash?: string;
  addedAt: string;
  addedBy?: string;
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