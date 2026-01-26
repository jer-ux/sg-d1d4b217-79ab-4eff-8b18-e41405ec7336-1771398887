import type { SnapshotResponse, TileData, EvidenceReceipt, ChartDataPoint } from "@/components/warroom/executiveTypes";

type Ctx = {
  org: string;
  period: "MTD" | "QTD" | "YTD";
  currency: "USD" | "GBP" | "EUR";
  businessUnit: string;
};

function nowIso() {
  return new Date().toISOString();
}

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function money(n: number, currency: Ctx["currency"]) {
  const fmt = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 1,
  });
  return fmt.format(n);
}

function shortHash(prefix = "sha256:") {
  const chars = "abcdef0123456789";
  let s = "";
  for (let i = 0; i < 12; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return `${prefix}${s}…${chars[Math.floor(Math.random() * chars.length)]}${chars[Math.floor(Math.random() * chars.length)]}${chars[Math.floor(Math.random() * chars.length)]}${chars[Math.floor(Math.random() * chars.length)]}`;
}

function receipt(owner: string, verified: boolean, confidence: number, notes?: string): EvidenceReceipt {
  const dqTotal = 10;
  const dqPassed = verified ? 10 : Math.max(6, Math.floor(rand(6, 9)));
  return {
    receipt_id: `rcpt_${Math.floor(rand(100000, 999999))}`,
    source_artifact_hash: shortHash(),
    transform_hash: shortHash(),
    freshness_minutes: Math.floor(rand(1, 35)),
    dq_tests_passed: dqPassed,
    dq_tests_total: dqTotal,
    owner,
    confidence,
    verified,
    notes,
  };
}

function generateChartData(baseValue: number, points: number = 7): ChartDataPoint[] {
  const data: ChartDataPoint[] = [];
  const now = new Date();
  
  for (let i = points - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const variance = rand(0.85, 1.15);
    data.push({
      period: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      value: Math.round(baseValue * variance),
    });
  }
  
  return data;
}

function determineTrend(chartData: ChartDataPoint[]): "up" | "down" | "flat" {
  if (chartData.length < 2) return "flat";
  const first = chartData[0].value;
  const last = chartData[chartData.length - 1].value;
  const change = ((last - first) / first) * 100;
  if (change > 2) return "up";
  if (change < -2) return "down";
  return "flat";
}

export function buildSnapshot(ctx: Ctx): SnapshotResponse {
  const tiles = buildStreamTiles(ctx);

  const tickerItems = [
    `RECOVERABLE EBITDA: ${money(rand(250_000, 650_000), ctx.currency)} variance flagged • confidence 91% • ${ctx.period}`,
    `PBM GUARANTEE: potential shortfall detected • action packet generated • BU=${ctx.businessUnit}`,
    `CASHFLOW: claims paid +${rand(0.8, 2.8).toFixed(1)}% WoW • driver: Rx specialty`,
    `EXECUTION: ${Math.floor(rand(2, 6))} vendor disputes opened • receipts attached`,
    `RISK/HEALTH IQ: composite moved ${rand(-3, 2).toFixed(0)} pts • watchlist updated`,
  ];

  return { tiles, tickerItems };
}

export function buildStreamTiles(ctx: Ctx): TileData[] {
  // Demo economics (replace with Snowflake queries later)
  const cash = rand(8_500_000, 17_500_000);
  const recEbitda = rand(1_200_000, 4_800_000);
  const health = Math.floor(rand(62, 86));
  const inflight = Math.floor(rand(6, 14));

  const cashChartData = generateChartData(cash);
  const ebitdaChartData = generateChartData(recEbitda);
  const healthChartData = generateChartData(health);
  const executionChartData = generateChartData(inflight);

  const cashflow: TileData = {
    key: "cashflow",
    title: "Realtime Cashflow",
    value: money(cash, ctx.currency),
    delta: `+${rand(0.6, 2.4).toFixed(1)}% WoW`,
    subtitle: `Live feeds • CFO view • ${ctx.org}`,
    updatedAt: nowIso(),
    receipt: receipt("CFO Ops", true, rand(0.86, 0.96), "Tied to paid claims, payroll, vendor invoices."),
    chartData: cashChartData,
    trend: determineTrend(cashChartData),
  };

  const recoverableEbitda: TileData = {
    key: "recoverableEbitda",
    title: "Recoverable EBITDA",
    value: money(recEbitda, ctx.currency),
    delta: "Ranked by $ × confidence × urgency",
    subtitle: `Leakage opportunities queued • ${ctx.period}`,
    updatedAt: nowIso(),
    receipt: receipt("Benefits Integrity", true, rand(0.82, 0.93), "Eligibility, PBM, admin billing, guarantees."),
    chartData: ebitdaChartData,
    trend: determineTrend(ebitdaChartData),
  };

  // Intentionally sometimes UNVERIFIED to showcase the concept
  const healthVerified = Math.random() > 0.35;
  const healthIQ: TileData = {
    key: "healthIQ",
    title: "Pollution / Health IQ",
    value: `${health}`,
    delta: `${rand(-3.5, 2.5).toFixed(0)} pts ${ctx.period}`,
    subtitle: "Risk composite • configurable",
    updatedAt: nowIso(),
    receipt: receipt(
      "Risk & Health",
      healthVerified,
      healthVerified ? rand(0.74, 0.9) : rand(0.55, 0.72),
      healthVerified ? "Composite includes trend + exposure proxies (as available)." : "Some upstream sources missing freshness SLA."
    ),
    chartData: healthChartData,
    trend: determineTrend(healthChartData),
  };

  const execution: TileData = {
    key: "execution",
    title: "Execution + Realization",
    value: `${inflight} Actions In-Flight`,
    delta: `${Math.floor(inflight * rand(0.4, 0.7))} verified • ${Math.floor(inflight * rand(0.3, 0.6))} pending`,
    subtitle: "Projected vs realized tracking",
    updatedAt: nowIso(),
    receipt: receipt("PMO", true, rand(0.78, 0.9), "Action packets with owners + due dates."),
    chartData: executionChartData,
    trend: determineTrend(executionChartData),
  };

  return [cashflow, recoverableEbitda, healthIQ, execution];
}

export function buildStreamTick(ctx: Ctx): string {
  const roll = Math.random();

  if (roll < 0.25) {
    return `LIVE: eligibility variance detected • est ${money(rand(80_000, 420_000), ctx.currency)} • confidence ${Math.floor(rand(88, 96))}%`;
  }
  if (roll < 0.5) {
    return `LIVE: Rx specialty trend spike • driver review opened • freshness ${Math.floor(rand(2, 18))}m`;
  }
  if (roll < 0.75) {
    return `LIVE: vendor SLA breach flagged • dispute packet generated • owner: Vendor Mgmt`;
  }
  return `LIVE: cashflow delta ${rand(-1.1, 2.3).toFixed(1)}% • ${ctx.period} • BU=${ctx.businessUnit}`;
}