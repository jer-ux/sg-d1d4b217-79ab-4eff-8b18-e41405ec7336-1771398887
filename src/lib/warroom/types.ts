import { z } from "zod";

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

// ===============================
// New Adapter Pattern Types
// ===============================

export type WarRoomLaneId = "ebitda" | "ar" | "claims" | "workforce";

export type ReceiptData = {
  receiptId: string;
  verified: boolean;
  freshnessMinutes: number;
  dqPassRate: number;
  sourceHash: string;
  transformHash: string;
  owner: string;
  confidence: number;
  reasons: string[];
};

export type KpiData = {
  label: string;
  value: string;
  trend?: string;
  receipt: ReceiptData;
};

export type LaneData = {
  lane: WarRoomLaneId;
  title: string;
  subtitle: string;
  primaryKpi: KpiData;
  secondaryKpis: KpiData[];
};

export type TickerItem = {
  id: string;
  text: string;
  tone: "good" | "warn" | "neutral";
};

export type WarRoomSummary = {
  asOfIso: string;
  ticker: TickerItem[];
  lanes: LaneData[];
};

// Zod schemas for runtime validation
const ReceiptDataSchema = z.object({
  receiptId: z.string(),
  verified: z.boolean(),
  freshnessMinutes: z.number(),
  dqPassRate: z.number(),
  sourceHash: z.string(),
  transformHash: z.string(),
  owner: z.string(),
  confidence: z.number(),
  reasons: z.array(z.string()),
});

const KpiDataSchema = z.object({
  label: z.string(),
  value: z.string(),
  trend: z.string().optional(),
  receipt: ReceiptDataSchema,
});

const LaneDataSchema = z.object({
  lane: z.enum(["ebitda", "ar", "claims", "workforce"]),
  title: z.string(),
  subtitle: z.string(),
  primaryKpi: KpiDataSchema,
  secondaryKpis: z.array(KpiDataSchema),
});

const TickerItemSchema = z.object({
  id: z.string(),
  text: z.string(),
  tone: z.enum(["good", "warn", "neutral"]),
});

export const WarRoomSummarySchema = z.object({
  asOfIso: z.string(),
  ticker: z.array(TickerItemSchema),
  lanes: z.array(LaneDataSchema),
});