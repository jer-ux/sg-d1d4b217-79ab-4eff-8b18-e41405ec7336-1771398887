// ===============================
// War Room Type Definitions
// ===============================

export type LaneKey = "value" | "controls" | "agentic" | "marketplace";
export type LedgerState = "IDENTIFIED" | "APPROVED" | "REALIZED" | "AT_RISK";

export type PacketStatus = "DRAFT" | "SUBMITTED" | "APPROVED" | "CLOSED";

export type PacketSignature = {
  id: string;
  signer: string;
  role: string;
  action: "SUBMIT" | "APPROVE";
  at: string;
};

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
  timeSensitivity: number;
  owner?: string;
  receipts?: EvidenceReceipt[];
  notes?: EventNotes;
  packetStatus?: PacketStatus;
  packetSignatures?: PacketSignature[];
  createdAt: string;
  updatedAt: string;
  
  // External system integration fields
  sourceSystem?: string;  // e.g., "snowflake", "servicenow", "databricks"
  sourceRef?: string;      // e.g., query_id, ticket_id, job_id
  tags?: string[];         // Custom tags for filtering/search
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