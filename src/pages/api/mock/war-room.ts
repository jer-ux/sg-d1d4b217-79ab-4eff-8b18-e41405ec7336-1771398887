import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { tenant = "tenant_demo", range = "30d" } = req.query;

  // Mock War Room data
  const mockEvents = [
    {
      event_id: "ARB-2024-001",
      title: "PBM formulary tier mismatch — Bronze plans paying Gold rates",
      type: "PBM",
      status: "IDENTIFIED",
      owner_role: "Pharmacy",
      identified_value: 347200,
      confidence: 0.94,
      time_sensitivity: 0.88,
      execution_friction: 0.22,
      score: 12847,
      receipt_status: "VERIFIED",
      evidence_receipt_id: "RCP-001",
      created_at: new Date().toISOString(),
    },
    {
      event_id: "ARB-2024-002",
      title: "Medical claim repricing error — ASC vs. HOPD",
      type: "MEDICAL",
      status: "NEGOTIATING",
      owner_role: "Medical",
      identified_value: 189500,
      confidence: 0.91,
      time_sensitivity: 0.76,
      execution_friction: 0.31,
      score: 9234,
      receipt_status: "VERIFIED",
      evidence_receipt_id: "RCP-002",
      created_at: new Date().toISOString(),
    },
    {
      event_id: "ARB-2024-003",
      title: "Eligibility retroactive termination not applied",
      type: "ELIGIBILITY",
      status: "APPROVED",
      owner_role: "Eligibility",
      identified_value: 156000,
      confidence: 0.87,
      time_sensitivity: 0.92,
      execution_friction: 0.18,
      score: 11200,
      receipt_status: "PENDING",
      evidence_receipt_id: "RCP-003",
      created_at: new Date().toISOString(),
    },
    {
      event_id: "ARB-2024-004",
      title: "Stop-loss aggregating factor missing on large claims",
      type: "STOPLOSS",
      status: "IDENTIFIED",
      owner_role: "Finance",
      identified_value: 423000,
      confidence: 0.89,
      time_sensitivity: 0.81,
      execution_friction: 0.44,
      score: 8756,
      receipt_status: "UNVERIFIED",
      evidence_receipt_id: "RCP-004",
      created_at: new Date().toISOString(),
    },
    {
      event_id: "ARB-2024-005",
      title: "Contract addendum rate not honored — specialty Rx",
      type: "CONTRACT",
      status: "CLOSED",
      owner_role: "Procurement",
      identified_value: 98000,
      confidence: 0.96,
      time_sensitivity: 0.44,
      execution_friction: 0.12,
      score: 7890,
      receipt_status: "VERIFIED",
      evidence_receipt_id: "RCP-005",
      created_at: new Date().toISOString(),
    },
  ];

  const response = {
    tenant,
    range,
    events: mockEvents,
    ebitda: {
      ytd_savings: 1213700,
      run_rate: 145000,
      confidence: 0.91,
    },
    ledger: {
      realized: 890000,
      identified: 1213700,
      approved: 345500,
      at_risk: 423000,
    },
    ticker: [
      { label: "YTD Savings", value: "$1.21M", trend: "+12% vs plan" },
      { label: "Active Events", value: "5", trend: "2 high-priority" },
      { label: "Avg Confidence", value: "91%", trend: "+3% MoM" },
      { label: "Time to Close", value: "18d", trend: "-2d vs Q3" },
    ],
    incidentFeed: [
      {
        t: "DQ",
        s: "WARNING",
        msg: "Freshness alert: eligibility snapshot is 72h old",
        ts: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      },
      {
        t: "POLICY",
        s: "INFO",
        msg: "New rule: All ARB events >$100k require CFO approval",
        ts: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      },
      {
        t: "SYSTEM",
        s: "OK",
        msg: "Connector health: All 4 sources green",
        ts: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      },
    ],
  };

  res.status(200).json(response);
}