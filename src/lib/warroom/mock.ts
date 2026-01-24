export type LaneKey = "value" | "controls" | "agentic" | "marketplace";

export type LedgerState = "IDENTIFIED" | "APPROVED" | "REALIZED" | "AT_RISK";

export type EvidenceReceipt = {
  id: string;
  title: string;
  url?: string;
  hash?: string;
  freshness?: string;
};

export type WarEvent = {
  id: string;
  lane: LaneKey;
  title: string;
  subtitle?: string;
  amount: number;
  confidence: number;
  timeSensitivity: number;
  state?: LedgerState;
  owner?: string;
  receipts?: EvidenceReceipt[];
  updatedAt: string;
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

export const laneMeta: Record<LaneKey, { label: string; headline: string }> = {
  value: { label: "Verified Savings Ledger", headline: "Reconcile value with receipts and owners." },
  controls: { label: "Controls & Compliance", headline: "Continuous controls. Evidence-first posture." },
  agentic: { label: "Agentic Ops & Sales", headline: "Governed automation with telemetry and gates." },
  marketplace: { label: "Marketplace Execution", headline: "Ship once. Distribute with low delivery drag." },
};

export function seedSummaries(): LaneSummary[] {
  return (Object.keys(laneMeta) as LaneKey[]).map((lane) => ({
    lane,
    label: laneMeta[lane].label,
    headline: laneMeta[lane].headline,
    identified: lane === "value" ? 7_800_000 : lane === "controls" ? 2_100_000 : lane === "agentic" ? 3_400_000 : 1_250_000,
    approved: lane === "value" ? 2_900_000 : lane === "controls" ? 850_000 : lane === "agentic" ? 1_100_000 : 420_000,
    realized: lane === "value" ? 1_650_000 : lane === "controls" ? 390_000 : lane === "agentic" ? 610_000 : 180_000,
    atRisk: lane === "value" ? 980_000 : lane === "controls" ? 260_000 : lane === "agentic" ? 540_000 : 90_000,
  }));
}

export function seedEvents(): WarEvent[] {
  const now = new Date().toISOString();
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
      receipts: [
        { id: "r-1", title: "Contract guarantee schedule", hash: "0xA13...", freshness: "2h ago" },
        { id: "r-2", title: "Claims reconciliation report", hash: "0xB24...", freshness: "4h ago" }
      ],
      updatedAt: now,
    },
    {
      id: "evt-002",
      lane: "controls",
      title: "Eligibility-feed control drift: stale file freshness threshold breached",
      subtitle: "Control gate failed; requires owner acknowledgement",
      amount: -120_000,
      confidence: 0.78,
      timeSensitivity: 0.82,
      state: "AT_RISK",
      owner: "Data Governance",
      receipts: [
        { id: "r-3", title: "Freshness check report", hash: "0xC77...", freshness: "1h ago" }
      ],
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
      receipts: [
        { id: "r-4", title: "Agent telemetry snapshot", hash: "0xD09...", freshness: "30m ago" },
        { id: "r-5", title: "Cycle time baseline", hash: "0xE12...", freshness: "6h ago" }
      ],
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
      receipts: [
        { id: "r-6", title: "Onboarding checklist + receipts", hash: "0xF11...", freshness: "3h ago" }
      ],
      updatedAt: now,
    },
    {
      id: "evt-005",
      lane: "value",
      title: "Cloud cost optimization: reserved instance arbitrage captured",
      subtitle: "AWS RI commitment vs on-demand spread",
      amount: 340_000,
      confidence: 0.91,
      timeSensitivity: 0.58,
      state: "APPROVED",
      owner: "FinOps",
      receipts: [
        { id: "r-7", title: "AWS Cost Explorer export", hash: "0xG45...", freshness: "1h ago" }
      ],
      updatedAt: now,
    },
    {
      id: "evt-006",
      lane: "controls",
      title: "SOC 2 Type II prep: 3 control gaps closed with automation",
      subtitle: "Evidence collection now continuous",
      amount: 180_000,
      confidence: 0.82,
      timeSensitivity: 0.66,
      state: "REALIZED",
      owner: "InfoSec",
      receipts: [
        { id: "r-8", title: "Control testing results", hash: "0xH23...", freshness: "5h ago" }
      ],
      updatedAt: now,
    },
    {
      id: "evt-007",
      lane: "agentic",
      title: "Sales agent hallucination rate: 2.4% → 0.7% after guardrail update",
      subtitle: "Confidence layer prevents bad quotes",
      amount: 125_000,
      confidence: 0.76,
      timeSensitivity: 0.71,
      state: "IDENTIFIED",
      owner: "Sales Ops",
      receipts: [
        { id: "r-9", title: "Hallucination audit log", hash: "0xI56...", freshness: "2h ago" }
      ],
      updatedAt: now,
    },
    {
      id: "evt-008",
      lane: "marketplace",
      title: "Snowflake marketplace: 4 new customers via native listing",
      subtitle: "Zero sales motion, pure discovery",
      amount: 280_000,
      confidence: 0.88,
      timeSensitivity: 0.44,
      state: "REALIZED",
      owner: "Partnerships",
      receipts: [
        { id: "r-10", title: "Snowflake transaction log", hash: "0xJ78...", freshness: "4h ago" }
      ],
      updatedAt: now,
    },
  ];
}

export function formatMoney(n: number) {
  const abs = Math.abs(n);
  const sign = n < 0 ? "-" : "";
  if (abs >= 1_000_000_000) return `${sign}$${(abs / 1_000_000_000).toFixed(2)}B`;
  if (abs >= 1_000_000) return `${sign}$${(abs / 1_000_000).toFixed(2)}M`;
  if (abs >= 1_000) return `${sign}$${(abs / 1_000).toFixed(1)}K`;
  return `${sign}$${abs.toFixed(0)}`;
}