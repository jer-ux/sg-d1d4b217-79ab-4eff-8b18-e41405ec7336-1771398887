import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Missing receipt ID" });
  }

  const mockReceipts: Record<string, any> = {
    "RCP-001": {
      receipt_id: "RCP-001",
      verification_status: "VERIFIED",
      generated_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      lineage_hash: "sha256:a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456",
      transform_hash: "sha256:1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcd",
      freshness: "24h",
      confidence_score: 0.94,
      dq_severity_max: "WARNING",
      dq_pass_rate: 0.98,
      why_not_green: "One minor DQ warning on address normalization; does not impact value calculation.",
    },
    "RCP-002": {
      receipt_id: "RCP-002",
      verification_status: "VERIFIED",
      generated_at: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
      lineage_hash: "sha256:b2c3d4e5f67890123456789012345678901abcdef2345678901bcdef2345678",
      transform_hash: "sha256:2345678901bcdef2345678901bcdef2345678901bcdef2345678901bcdef23",
      freshness: "48h",
      confidence_score: 0.91,
      dq_severity_max: "INFO",
      dq_pass_rate: 0.99,
      why_not_green: "All checks passed. Minor info-level note on data completeness.",
    },
    "RCP-003": {
      receipt_id: "RCP-003",
      verification_status: "PENDING",
      generated_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      lineage_hash: "sha256:c3d4e5f678901234567890123456789012abcdef3456789012cdef3456789012",
      transform_hash: "sha256:3456789012cdef3456789012cdef3456789012cdef3456789012cdef345678",
      freshness: "12h",
      confidence_score: 0.87,
      dq_severity_max: "WARNING",
      dq_pass_rate: 0.96,
      why_not_green: "Pending review: eligibility snapshot is 72h old. Awaiting refresh.",
    },
    "RCP-004": {
      receipt_id: "RCP-004",
      verification_status: "UNVERIFIED",
      generated_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      lineage_hash: "sha256:d4e5f6789012345678901234567890123abcdef4567890123def4567890123a",
      transform_hash: "sha256:4567890123def4567890123def4567890123def4567890123def4567890123",
      freshness: "6h",
      confidence_score: 0.89,
      dq_severity_max: "ERROR",
      dq_pass_rate: 0.82,
      why_not_green: "DQ error: 18% of claim records missing aggregating factor field. Blocking verification.",
    },
    "RCP-005": {
      receipt_id: "RCP-005",
      verification_status: "VERIFIED",
      generated_at: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
      lineage_hash: "sha256:e5f67890123456789012345678901234abcdef5678901234ef5678901234abc",
      transform_hash: "sha256:5678901234ef5678901234ef5678901234ef5678901234ef5678901234ef56",
      freshness: "72h",
      confidence_score: 0.96,
      dq_severity_max: "INFO",
      dq_pass_rate: 1.0,
      why_not_green: "All checks passed.",
    },
  };

  const receipt = mockReceipts[id as string];

  if (!receipt) {
    return res.status(404).json({ error: "Receipt not found" });
  }

  res.status(200).json(receipt);
}