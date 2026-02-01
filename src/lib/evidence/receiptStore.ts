import type { EvidenceReceipt } from "@/lib/storage/adapters/types";

const DEMO_RECEIPT_REASONS = [
  "RECEIPT_GATE_UNVERIFIED",
  "POLICY_APPROVAL_THRESHOLD_EXCEEDED",
  "DQ_MISSING_COLUMN",
  "SECURITY_PII_EXPOSURE",
];

// Temporary mock data generator until real store is connected
function generateMockReceipts(count: number): EvidenceReceipt[] {
  const receipts: EvidenceReceipt[] = [];
  const now = Date.now();
  const reasons = [
    "EVIDENCE_MISSING", "HASH_MISMATCH", "ATTACHMENT_MISSING", 
    "RECEIPT_GATE_UNVERIFIED", "SUCCESSION_SINGLE_POINT_FAILURE",
    "CEO_EMERGENCY_PLAN_STALE", "EBITDA_AT_RISK"
  ];

  for (let i = 0; i < count; i++) {
    // Random time in last 48 hours
    const timeOffset = Math.floor(Math.random() * 48 * 60 * 60 * 1000);
    
    // Weighted random for verification status
    const isVerified = Math.random() > 0.3;
    
    receipts.push({
      receipt_id: `rcpt_${Math.random().toString(36).substring(2, 9)}`,
      captured_at: new Date(now - timeOffset).toISOString(),
      reason_codes: [reasons[Math.floor(Math.random() * reasons.length)]],
      gate: isVerified ? "VERIFIED" : "UNVERIFIED",
      confidence: 0.5 + (Math.random() * 0.5), // 0.5 - 1.0
    });
  }
  
  return receipts.sort((a, b) => 
    new Date(b.captured_at).getTime() - new Date(a.captured_at).getTime()
  );
}

export async function listReceipts(args: { limit: number }): Promise<EvidenceReceipt[]> {
  // In a real implementation, this would query the database/blob store
  // returning mock data for the demo
  return generateMockReceipts(args.limit);
}