import type { LaneKey, LaneSummary, WarEvent } from "@/lib/warroom/types";

const lanes: LaneKey[] = ["value", "controls", "agentic", "marketplace"];

function isoNow() {
  return new Date().toISOString();
}

export function seedSummaries(): LaneSummary[] {
  return lanes.map((lane) => ({
    lane,
    label: lane === "value" ? "Verified Savings Ledger" : 
           lane === "controls" ? "Controls & Compliance" :
           lane === "agentic" ? "Agentic Ops & Sales" : 
           "Marketplace Execution",
    headline: lane === "value" ? "Reconcile value with receipts and owners." :
              lane === "controls" ? "Continuous controls. Evidence-first posture." :
              lane === "agentic" ? "Governed automation with telemetry and gates." :
              "Ship once. Distribute with low delivery drag.",
    identified: lane === "value" ? 7_800_000 : lane === "controls" ? 2_100_000 : lane === "agentic" ? 3_400_000 : 1_250_000,
    approved: lane === "value" ? 2_900_000 : lane === "controls" ? 850_000 : lane === "agentic" ? 1_100_000 : 420_000,
    realized: lane === "value" ? 1_650_000 : lane === "controls" ? 390_000 : lane === "agentic" ? 610_000 : 180_000,
    atRisk: lane === "value" ? 980_000 : lane === "controls" ? 260_000 : lane === "agentic" ? 540_000 : 90_000,
  }));
}

export function seedEvents(): WarEvent[] {
  const now = isoNow();
  return [
    {
      id: "evt-001",
      lane: "value",
      title: "Oracle license optimization",
      subtitle: "Usage analysis indicates 40% seat redundancy in engineering.",
      amount: 420000,
      confidence: 0.85,
      timeSensitivity: 0.4,
      state: "IDENTIFIED",
      owner: "CFO",
      receipts: [
        { id: "rcpt-1", title: "Usage Report Q4", hash: "abc123hash" },
        { id: "rcpt-2", title: "Contract Terms", hash: "def456hash" },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "evt-002",
      lane: "controls",
      title: "AWS S3 public bucket alert",
      subtitle: "Critical production data potentially exposed.",
      amount: 0,
      confidence: 0.99,
      timeSensitivity: 0.95,
      state: "AT_RISK",
      owner: "CISO",
      receipts: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "evt-003",
      lane: "agentic",
      title: "Q1 Sales Agent deployment",
      subtitle: "Automated outreach to 5k prospects.",
      amount: 150000,
      confidence: 0.75,
      timeSensitivity: 0.6,
      state: "REALIZED",
      owner: "CRO",
      receipts: [{ id: "rcpt-3", title: "Deployment Log", hash: "ghi789hash" }],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "evt-004",
      lane: "marketplace",
      title: "Snowflake data clean room",
      subtitle: "Partner integration for retail analytics.",
      amount: 85000,
      confidence: 0.9,
      timeSensitivity: 0.2,
      state: "APPROVED",
      owner: "CDO",
      receipts: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];
}