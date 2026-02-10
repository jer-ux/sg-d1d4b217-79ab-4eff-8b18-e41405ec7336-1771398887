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
  receipt_id?: string;
  source_artifact_hash?: string;
  transform_hash?: string;
  freshness_minutes?: number;
  dq_tests_passed?: number;
  dq_tests_total?: number;
  owner?: string;
  confidence?: number;
  verified?: boolean;
  notes?: string;
  // Legacy/Optional properties for compatibility
  id?: string;
  title?: string;
  url?: string;
  hash?: string;
  freshness?: string;
};

export type WarEvent = {
  id: string;
  title: string;
  subtitle: string;
  lane: LaneKey;
  amount: number;
  timeSensitivity: number;
  confidence: number;
  owner?: string;
  state: "IDENTIFIED" | "APPROVED" | "REALIZED" | "AT_RISK";
  receipts: EvidenceReceipt[];
  // Extended properties for comprehensive detail view
  notes?: string | EventNotes;
  trend?: number | "up" | "down" | "flat";
  severity?: "critical" | "high" | "medium" | "low";
  carrier?: string;
  priority?: string;
  category?: string;
  daysInState?: number;
  updatedAt?: string;
  packetStatus?: PacketStatus;
  packetSignatures?: PacketSignature[];
  type?: string;
  // Legacy/Compatibility fields
  createdAt?: string;
  estImpact?: number | string;
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
  velocity?: number;
  avgConfidence?: number;
  criticalCount?: number;
  trendData?: number[];
};

export type StreamMessage =
  | { type: "hello"; serverTime: string }
  | { type: "snapshot"; events: WarEvent[]; summaries: LaneSummary[] }
  | { type: "event_upsert"; event: WarEvent }
  | { type: "summary_upsert"; summary: LaneSummary }
  | { type: "ticker"; text: string; amount: number; state: LedgerState; lane: LaneKey; at: string }
  | { type: "error"; message: string };

// ===============================
// New Adapter Pattern Types (Zod-First)
// ===============================

export type WarRoomLaneId = "ebitda" | "ar" | "claims" | "workforce";

// 1. Define Schemas
export const ReceiptDataSchema = z.object({
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

export const KpiDataSchema = z.object({
  label: z.string(),
  value: z.string(),
  trend: z.string().optional(),
  receipt: ReceiptDataSchema,
});

export const LaneDataSchema = z.object({
  lane: z.enum(["ebitda", "ar", "claims", "workforce"]),
  title: z.string(),
  subtitle: z.string(),
  primaryKpi: KpiDataSchema,
  secondaryKpis: z.array(KpiDataSchema),
});

export const TickerItemSchema = z.object({
  id: z.string(),
  text: z.string(),
  tone: z.enum(["good", "warn", "neutral"]),
});

export const WarRoomSummarySchema = z.object({
  asOfIso: z.string(),
  ticker: z.array(TickerItemSchema),
  lanes: z.array(LaneDataSchema),
});

// 2. Infer Types
export type ReceiptData = z.infer<typeof ReceiptDataSchema>;
export type KpiData = z.infer<typeof KpiDataSchema>;
export type LaneData = z.infer<typeof LaneDataSchema>;
export type TickerItem = z.infer<typeof TickerItemSchema>;
export type WarRoomSummary = z.infer<typeof WarRoomSummarySchema>;

// ===============================
// Ranked Events Types (New)
// ===============================

export type Gate = "VERIFIED" | "UNVERIFIED";

export type EventStatus = "OPEN" | "WATCH" | "RESOLVED";

export type EventCategory =
  | "Governance"
  | "Financial"
  | "Talent"
  | "Operational"
  | "Compliance"
  | "Reputation"
  | "Unknown";

export type WarRoomEvent = {
  event_id: string;              // stable id (hashable)
  title: string;
  category: EventCategory;
  status: EventStatus;

  // ties back to evidence
  receipt_ids: string[];
  top_reason_codes: string[];

  // time
  first_seen_at: string;
  last_seen_at: string;

  // scoring inputs
  severity: number;              // 0..100
  velocity: number;              // 0..100
  confidence_score: number;      // 0..1
  confidence_gate: Gate;

  // output score for ranking
  rank_score: number;            // 0..100

  // explainability
  why: string[];                 // short reasons
};

export type TagCategory =
  | "DQ"
  | "Compliance"
  | "Security"
  | "Operational"
  | "Financial";