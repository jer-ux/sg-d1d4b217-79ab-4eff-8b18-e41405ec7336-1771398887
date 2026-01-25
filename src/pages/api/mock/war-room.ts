import type { NextApiRequest, NextApiResponse } from "next";

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashStr(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

function pick<T>(rand: () => number, arr: T[]) {
  return arr[Math.floor(rand() * arr.length)];
}

function r(rand: () => number, min: number, max: number) {
  return rand() * (max - min) + min;
}

type ReceiptStatus = "VERIFIED" | "DEGRADED" | "UNVERIFIED";
type Stage = "RECOMMENDED" | "ACCEPTED" | "IMPLEMENTED" | "VALIDATED";

const STAGES: Stage[] = ["RECOMMENDED", "ACCEPTED", "IMPLEMENTED", "VALIDATED"];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const tenant = (req.query.tenant as string) ?? "tenant_demo";
  const range = (req.query.range as string) ?? "30d";

  // stable seed by tenant+range so numbers don't jump every refresh
  const seed = hashStr(`${tenant}:${range}:war-room:v2`);
  const rand = mulberry32(seed);

  const asOf = new Date().toISOString();

  const titles = [
    "PBM rebate true-up variance flagged",
    "Eligibility drift detected vs prior month",
    "Duplicate claim line pattern detected",
    "Carrier funding reconciliation mismatch",
    "Out-of-network utilization spike vs baseline",
    "Stop-loss reimbursement lag vs SLA",
    "Rx effective rate above guarantee",
    "Dependent eligibility leakage signal",
  ];

  const categories = ["PBM", "MEDICAL", "ELIGIBILITY", "STOPLOSS", "CONTRACT"] as const;

  // Create a plausible set of events with controlled totals
  const events = Array.from({ length: 14 }).map((_, i) => {
    const value = Math.round(r(rand, 35_000, 525_000));
    const confidence = Number(r(rand, 0.70, 0.95).toFixed(2));
    const timeSensitivity = Number(r(rand, 0.45, 0.95).toFixed(2));
    const friction = Number(r(rand, 0.20, 0.85).toFixed(2));
    const score = Math.round((value * confidence * timeSensitivity) / Math.max(friction, 0.05));

    const status = pick(rand, STAGES);
    const type = pick(rand, categories as any);

    // Make receipts more often VERIFIED than not, or it reads fake/immature
    const receipt_status: ReceiptStatus = pick(rand, [
      "VERIFIED",
      "VERIFIED",
      "VERIFIED",
      "DEGRADED",
      "UNVERIFIED",
    ]);

    return {
      event_id: `EVT-${String(i + 1).padStart(3, "0")}`,
      title: pick(rand, titles),
      type,
      status,
      identified_value: value,
      confidence,
      time_sensitivity: timeSensitivity,
      execution_friction: friction,
      score,
      owner_role: pick(rand, ["Finance", "Benefits Ops", "Vendor Manager", "Consultant Lead"]),
      due_date: new Date(Date.now() + Math.floor(r(rand, 2, 18)) * 86400000).toISOString(),
      evidence_receipt_id: `RCP-${Math.floor(r(rand, 10000, 99999))}`,
      receipt_status,
      updated_at: asOf,
    };
  });

  // Reconcile ledger from events (this is what makes it CFO-believable)
  const sum = (arr: number[]) => arr.reduce((a, b) => a + b, 0);

  const identified = sum(events.map((e) => e.identified_value));

  const accepted = sum(events.filter((e) => e.status === "ACCEPTED").map((e) => e.identified_value));
  const implemented = sum(events.filter((e) => e.status === "IMPLEMENTED").map((e) => e.identified_value));
  const validated = sum(events.filter((e) => e.status === "VALIDATED").map((e) => e.identified_value));

  // Finance logic: "approved" is typically accepted+implemented; "realized" is validated
  const approved = Math.round(accepted * 0.55 + implemented * 0.90);
  const realized = Math.round(validated * 0.92);

  const atRisk = Math.round(
    sum(
      events
        .filter((e) => e.receipt_status !== "VERIFIED" || e.status === "RECOMMENDED")
        .map((e) => e.identified_value * 0.25)
    )
  );

  // Variance drivers (baseline vs actual) – mock but coherent
  const baselineTrend = Number(r(rand, 4.8, 6.2).toFixed(1)); // %
  const actualTrend = Number((baselineTrend + r(rand, -0.8, 1.4)).toFixed(1));
  const trendDelta = Number((actualTrend - baselineTrend).toFixed(1));

  const drivers = [
    { label: "Utilization", delta_pct: Number(r(rand, 0.4, 1.4).toFixed(1)), note: "OP/ED mix shift" },
    { label: "Unit cost", delta_pct: Number(r(rand, 0.2, 1.1).toFixed(1)), note: "allowed amount inflation" },
    { label: "Rx effective rate", delta_pct: Number(r(rand, -0.8, 0.6).toFixed(1)), note: "rebate timing / NDC mix" },
    { label: "Eligibility leakage", delta_pct: Number(r(rand, -0.4, 0.7).toFixed(1)), note: "dependent/TERM lag" },
  ].sort((a, b) => Math.abs(b.delta_pct) - Math.abs(a.delta_pct));

  // Data health signals
  const data_health = {
    freshness_hours: Math.floor(r(rand, 6, 38)),
    dq_pass_rate: Number(r(rand, 0.93, 0.995).toFixed(3)),
    verified_receipts_rate: Number(r(rand, 0.78, 0.92).toFixed(2)),
    open_incidents: Math.floor(r(rand, 1, 7)),
    last_replay: new Date(Date.now() - Math.floor(r(rand, 2, 20)) * 3600000).toISOString(),
  };

  // CFO-style summary numbers
  const ebitda = {
    ytd_validated: realized,
    mtd_validated: Math.round(realized * r(rand, 0.08, 0.22)),
    run_rate: Math.round((realized / 12) * r(rand, 0.85, 1.25)),
    confidence: Number(r(rand, 0.78, 0.94).toFixed(2)),
    as_of: asOf,
  };

  const ledger = {
    identified,
    approved,
    realized,
    at_risk: atRisk,
    as_of: asOf,
  };

  const ticker = Array.from({ length: 14 }).map(() => ({
    text: pick(rand, [
      `Reconciliation OK: ledger ties to event stages`,
      `DQ gate pass rate ${(data_health.dq_pass_rate * 100).toFixed(1)}%`,
      `Receipts VERIFIED ${(data_health.verified_receipts_rate * 100).toFixed(0)}%`,
      `Variance driver updated: ${drivers[0].label}`,
      `Next vendor SLA due: ${new Date(Date.now() + 5 * 86400000).toLocaleDateString()}`,
      `Deterministic replay completed`,
    ]),
    ts: asOf,
  }));

  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({
    tenant,
    range,
    asOf,
    ebitda,
    ledger,
    drivers: {
      baseline_trend_pct: baselineTrend,
      actual_trend_pct: actualTrend,
      delta_pct: trendDelta,
      attribution: drivers,
    },
    data_health,
    events,
    ticker,
  });
}