export type EvidenceReceipt = {
  receipt_id: string;
  captured_at: string; // ISO string
  reason_codes?: string[];
  gate: "VERIFIED" | "UNVERIFIED";
  confidence?: number;
  
  // Additional fields commonly used
  event_id?: string;
  attachment_hash?: string;
  metadata?: Record<string, any>;
};