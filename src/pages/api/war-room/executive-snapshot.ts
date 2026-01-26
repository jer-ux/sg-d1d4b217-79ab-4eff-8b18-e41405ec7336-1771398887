import type { NextApiRequest, NextApiResponse } from "next";
import type { SnapshotResponse } from "@/components/warroom/executiveTypes";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SnapshotResponse>
) {
  const { org, period, currency, businessUnit } = req.query;

  const tiles = [
    {
      key: "cashflow" as const,
      title: "Cashflow Impact",
      value: "$2.4M",
      delta: "+18.2% vs prior period",
      subtitle: "Free cash flow improvement",
      updatedAt: "2 min ago",
      trend: "up" as const,
      chartData: [
        { period: "W1", value: 1.8 },
        { period: "W2", value: 2.0 },
        { period: "W3", value: 2.1 },
        { period: "W4", value: 2.4 },
      ],
      receipt: {
        receipt_id: "rcpt_cf_001",
        source_artifact_hash: "sha256:a3f9c2e1...",
        transform_hash: "sha256:b8d4e7f2...",
        freshness_minutes: 2,
        dq_tests_passed: 12,
        dq_tests_total: 12,
        owner: "Finance Analytics",
        confidence: 0.96,
        verified: true,
        notes: "Validated against bank statements and GL reconciliation",
      },
    },
    {
      key: "recoverableEbitda" as const,
      title: "Recoverable EBITDA",
      value: "$8.7M",
      delta: "+$1.2M identified",
      subtitle: "Waste reduction + process optimization",
      updatedAt: "5 min ago",
      trend: "up" as const,
      chartData: [
        { period: "W1", value: 7.2 },
        { period: "W2", value: 7.8 },
        { period: "W3", value: 8.3 },
        { period: "W4", value: 8.7 },
      ],
      receipt: {
        receipt_id: "rcpt_eb_002",
        source_artifact_hash: "sha256:c7b5d3e4...",
        transform_hash: "sha256:d9f6a1c2...",
        freshness_minutes: 5,
        dq_tests_passed: 15,
        dq_tests_total: 15,
        owner: "Operations Analytics",
        confidence: 0.94,
        verified: true,
        notes: "Cross-validated with procurement and operations data",
      },
    },
    {
      key: "healthIQ" as const,
      title: "Health IQ Score",
      value: "87/100",
      delta: "+3 pts",
      subtitle: "Data quality & control strength",
      updatedAt: "1 min ago",
      trend: "up" as const,
      chartData: [
        { period: "W1", value: 82 },
        { period: "W2", value: 84 },
        { period: "W3", value: 86 },
        { period: "W4", value: 87 },
      ],
      receipt: {
        receipt_id: "rcpt_hiq_003",
        source_artifact_hash: "sha256:e8c4b7f1...",
        transform_hash: "sha256:f2d9a6e3...",
        freshness_minutes: 1,
        dq_tests_passed: 18,
        dq_tests_total: 20,
        owner: "Data Governance",
        confidence: 0.90,
        verified: true,
        notes: "2 non-critical tests pending resolution",
      },
    },
    {
      key: "execution" as const,
      title: "Execution Velocity",
      value: "92%",
      delta: "On track",
      subtitle: "Actions closed on time",
      updatedAt: "3 min ago",
      trend: "flat" as const,
      chartData: [
        { period: "W1", value: 89 },
        { period: "W2", value: 91 },
        { period: "W3", value: 92 },
        { period: "W4", value: 92 },
      ],
      receipt: {
        receipt_id: "rcpt_ex_004",
        source_artifact_hash: "sha256:g1f8c3d2...",
        transform_hash: "sha256:h4b7e9a1...",
        freshness_minutes: 3,
        dq_tests_passed: 10,
        dq_tests_total: 10,
        owner: "PMO",
        confidence: 0.98,
        verified: true,
        notes: "Tracked via project management system integration",
      },
    },
  ];

  const tickerItems = [
    "$124K opportunity identified in AP process → Controls lane",
    "$89K EBITDA recovery validated → Approved for realization",
    "New data quality rule deployed → Health IQ +2 pts",
    "$340K marketplace savings locked in → Agentic transformation complete",
    "Critical control gap detected → Escalated to CFO",
  ];

  res.status(200).json({ tiles, tickerItems });
}