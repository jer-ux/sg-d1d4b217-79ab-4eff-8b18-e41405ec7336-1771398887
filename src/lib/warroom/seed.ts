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
      title: "PBM guarantee variance detected (audit-grade receipts ready)",
      subtitle: "Potential reconciliation against contract guarantees",
      amount: 420_000,
      confidence: 0.86,
      timeSensitivity: 0.74,
      state: "IDENTIFIED",
      owner: "Finance Ops",
      receipts: [{ id: "r-1", title: "Contract guarantee schedule", hash: "0xA13..." }],
      updatedAt: now,
    },
    {
      id: "evt-002",
      lane: "controls",
      title: "Eligibility-feed control drift: freshness threshold breached",
      subtitle: "Control gate failed; requires owner acknowledgement",
      amount: -120_000,
      confidence: 0.78,
      timeSensitivity: 0.82,
      state: "AT_RISK",
      owner: "Data Governance",
      receipts: [{ id: "r-2", title: "Freshness check report", hash: "0xB77..." }],
      updatedAt: now,
    },
    {
      id: "evt-003",
      lane: "agentic",
      title: "Agent workflow: quote-to-cash cycle time reduced 12%",
      subtitle: "Telemetry confirms sustained improvement",
      amount: 210_000,
      confidence: 0.73,
      timeSensitivity: 0.40,
      state: "REALIZED",
      owner: "RevOps",
      receipts: [{ id: "r-3", title: "Agent telemetry snapshot", hash: "0xC09..." }],
      updatedAt: now,
    },
    {
      id: "evt-004",
      lane: "marketplace",
      title: "Marketplace onboarding: time-to-value down to 9 days",
      subtitle: "Standardized pack reduced services drag",
      amount: 95_000,
      confidence: 0.69,
      timeSensitivity: 0.35,
      state: "APPROVED",
      owner: "Delivery",
      receipts: [{ id: "r-4", title: "Onboarding checklist + receipts", hash: "0xD11..." }],
      updatedAt: now,
    },
  ];
}