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
  const dqTotal = 50;
  const dqPassed = verified ? Math.floor(rand(45, 50)) : Math.floor(rand(35, 44));
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

function generateChartData(baseValue: number, points: number = 4): ChartDataPoint[] {
  const data: ChartDataPoint[] = [];
  const quarters = ["Q1", "Q2", "Q3", "Q4"];
  
  for (let i = 0; i < points; i++) {
    const variance = rand(0.85, 1.15);
    data.push({
      period: quarters[i],
      value: Math.round(baseValue * variance * 10) / 10,
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
    `${ctx.org} ${ctx.period}: Cost Trend +${rand(10, 13).toFixed(1)}% | Contract Compliance ${rand(92, 96).toFixed(1)}% | Benefits NPS +${Math.floor(rand(35, 42))}`,
    `McKinsey Alert: YoY PMPM exceeds baseline by ${Math.floor(rand(200, 300))}bps | ${money(rand(4_000_000, 6_000_000), ctx.currency)} EBITDA at risk`,
    `Contract Leakage: ${money(rand(1_800_000, 2_500_000), ctx.currency)} recovery opportunity identified in Q4 vendor reconciliation`,
    `Pharmacy Exposure: ${rand(32, 36).toFixed(0)}% Rx spend under opaque terms → shifting to cost-based models`,
    `Plan Design Adoption: ${rand(45, 49).toFixed(0)}% enrollment in HDHP/HSA + COE → McKinsey innovation hedge`,
  ];

  return { tiles, tickerItems };
}

export function buildStreamTiles(ctx: Ctx): TileData[] {
  const costTrendValue = rand(115, 120);
  const costTrendChartData = generateChartData(100);
  
  const costTrendStress: TileData = {
    key: "costTrendStress",
    title: "Cost Trend Stress Index",
    value: `${costTrendValue.toFixed(0)}`,
    delta: `+${(costTrendValue - 100).toFixed(0)}pp`,
    trend: "up",
    subtitle: "YoY PMPM vs McKinsey Baseline",
    framework: "McKinsey",
    updatedAt: nowIso(),
    chartData: costTrendChartData,
    receipt: receipt("CFO Office", true, rand(0.92, 0.96), "YoY net PMPM trend exceeds McKinsey commercial baseline (9-10%). EBITDA at risk."),
  };

  const leakageValue = rand(2.8, 3.5);
  const leakageChartData = generateChartData(1.5);
  
  const contractLeakage: TileData = {
    key: "contractLeakage",
    title: "Contract Value Leakage Rate",
    value: `${leakageValue.toFixed(1)}%`,
    delta: `+${(leakageValue - 1.5).toFixed(1)}pp`,
    trend: "up",
    subtitle: "Off-contract + Pricing Variance",
    framework: "McKinsey",
    updatedAt: nowIso(),
    chartData: leakageChartData,
    receipt: receipt("Procurement Ops", true, rand(0.94, 0.98), "Off-contract spend + pricing misses + missed rebates. Recoverable via enforcement."),
  };

  const complianceValue = rand(93, 96);
  const complianceChartData = generateChartData(98);
  
  const contractCompliance: TileData = {
    key: "contractCompliance",
    title: "Contract Compliance Rate",
    value: `${complianceValue.toFixed(1)}%`,
    delta: `-${(98 - complianceValue).toFixed(1)}pp`,
    trend: "down",
    subtitle: "Contract Terms Adherence",
    framework: "McKinsey",
    updatedAt: nowIso(),
    chartData: complianceChartData,
    receipt: receipt("Compliance + Audit", true, rand(0.91, 0.95), "Compliant invoices/claims. Non-compliance spend reduced via enforcement automation."),
  };

  const ambiguityValue = rand(38, 45);
  const ambiguityChartData = generateChartData(25);
  
  const contractAmbiguity: TileData = {
    key: "contractAmbiguity",
    title: "Contract Ambiguity Risk Score",
    value: `${Math.floor(ambiguityValue)}`,
    delta: `+${Math.floor(ambiguityValue - 25)}pts`,
    trend: "up",
    subtitle: "High-spend Contract Clarity",
    framework: "McKinsey",
    updatedAt: nowIso(),
    chartData: ambiguityChartData,
    receipt: receipt("Legal + Procurement", true, rand(0.87, 0.92), "Clause-quality score (definitions, audit rights, pricing terms). High-spend contracts monitored."),
  };

  const adoptionValue = rand(45, 49);
  const adoptionChartData = generateChartData(35);
  
  const planDesignAdoption: TileData = {
    key: "planDesignAdoption",
    title: "Plan Design Innovation Adoption",
    value: `${Math.floor(adoptionValue)}%`,
    delta: `+${Math.floor(adoptionValue - 35)}pp QoQ`,
    trend: "up",
    subtitle: "HDHP/HSA + COE Enrollment",
    framework: "McKinsey",
    updatedAt: nowIso(),
    chartData: adoptionChartData,
    receipt: receipt("Benefits Strategy", true, rand(0.89, 0.93), "Eligible population enrolled in innovative designs (HDHP/HSA steering, navigation, COE). Target: 60% by EOY."),
  };

  const pharmacyValue = rand(7.5, 9.0);
  const pharmacyChartData = generateChartData(5.0);
  
  const pharmacyExposure: TileData = {
    key: "pharmacyExposure",
    title: "Pharmacy Reimbursement Exposure",
    value: `${pharmacyValue.toFixed(1)}%`,
    delta: `+${(pharmacyValue - 5.0).toFixed(1)}pp`,
    trend: "up",
    subtitle: "Opaque PBM Terms Risk",
    framework: "McKinsey",
    updatedAt: nowIso(),
    chartData: pharmacyChartData,
    receipt: receipt("Pharmacy Operations", true, rand(0.86, 0.91), "Rx spend under opaque reimbursement terms. Shifting to cost-based models; target <25% by Q2 2026."),
  };

  const benefitsNPSValue = rand(36, 40);
  const benefitsNPSChartData = generateChartData(31);
  
  const benefitsNPS: TileData = {
    key: "benefitsNPS",
    title: "Benefits NPS",
    value: `+${Math.floor(benefitsNPSValue)}`,
    delta: `+${Math.floor(benefitsNPSValue - 31)}pts QoQ`,
    trend: "up",
    subtitle: "Employee Benefits Experience",
    framework: "Bain",
    updatedAt: nowIso(),
    chartData: benefitsNPSChartData,
    receipt: receipt("Employee Experience", true, rand(0.85, 0.90), "Bain NPS for enrollment, claims, navigation, pharmacy experience. Correlation with plan adoption."),
  };

  const employeeNPSValue = rand(40, 44);
  const employeeNPSChartData = generateChartData(37);
  
  const employeeNPS: TileData = {
    key: "employeeNPS",
    title: "Employee NPS (eNPS)",
    value: `+${Math.floor(employeeNPSValue)}`,
    delta: `+${Math.floor(employeeNPSValue - 37)}pts`,
    trend: "up",
    subtitle: "Internal + Vendor Service Teams",
    framework: "Bain",
    updatedAt: nowIso(),
    chartData: employeeNPSChartData,
    receipt: receipt("People Ops", true, rand(0.88, 0.93), "eNPS for internal benefits ops + vendor service teams. Leading indicator of execution quality and retention."),
  };

  return [
    costTrendStress,
    contractLeakage,
    contractCompliance,
    contractAmbiguity,
    planDesignAdoption,
    pharmacyExposure,
    benefitsNPS,
    employeeNPS,
  ];
}

export function buildStreamTick(ctx: Ctx): string {
  const roll = Math.random();

  if (roll < 0.2) {
    return `${ctx.org} ${ctx.period}: Cost Trend +${rand(10, 13).toFixed(1)}% | Contract Compliance ${rand(92, 96).toFixed(1)}% | Benefits NPS +${Math.floor(rand(35, 42))}`;
  }
  if (roll < 0.4) {
    return `McKinsey Alert: YoY PMPM exceeds baseline by ${Math.floor(rand(200, 300))}bps | ${money(rand(4_000_000, 6_000_000), ctx.currency)} EBITDA at risk`;
  }
  if (roll < 0.6) {
    return `Contract Leakage: ${money(rand(1_800_000, 2_500_000), ctx.currency)} recovery opportunity identified in Q4 vendor reconciliation`;
  }
  if (roll < 0.8) {
    return `Pharmacy Exposure: ${rand(32, 36).toFixed(0)}% Rx spend under opaque terms → shifting to cost-based models`;
  }
  return `Plan Design Adoption: ${rand(45, 49).toFixed(0)}% enrollment in HDHP/HSA + COE → McKinsey innovation hedge`;
}