// CFO-grade demo dataset generator. Swap internals for Snowflake queries later.

import type { DetailResponse, KPIBadge, LedgerRow, VarianceRow, TileKey } from "@/components/warroom/executiveTypes";

type Ctx = {
  tile: TileKey;
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

function shortHash(prefix = "sha256:") {
  const chars = "abcdef0123456789";
  let s = "";
  for (let i = 0; i < 12; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return `${prefix}${s}…${chars[Math.floor(Math.random() * chars.length)]}${chars[Math.floor(Math.random() * chars.length)]}${chars[Math.floor(Math.random() * chars.length)]}${chars[Math.floor(Math.random() * chars.length)]}`;
}

function receipt(owner: string, verified: boolean, confidence: number, notes?: string) {
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

function fmtMoney(n: number, currency: Ctx["currency"]) {
  const fmt = new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 0 });
  return fmt.format(n);
}
function fmtPct(p: number) {
  return `${(p * 100).toFixed(1)}%`;
}

export function buildDetail(ctx: Ctx): DetailResponse {
  const asOf = nowIso();

  const commonNotes = [
    "All KPI badges include Evidence Receipts (source lineage, freshness, data-quality tests, owner, confidence).",
    "This is a demo dataset shaped like real accounting/claims/vendor data to support click-through storytelling.",
    "Swap demo generators for Snowflake views/dynamic tables without changing the UI contract.",
  ];

  if (ctx.tile === "cashflow") return cashflowDetail(ctx, asOf, commonNotes);
  if (ctx.tile === "recoverableEbitda") return recoverableEbitdaDetail(ctx, asOf, commonNotes);
  if (ctx.tile === "healthIQ") return healthIQDetail(ctx, asOf, commonNotes);
  return executionDetail(ctx, asOf, commonNotes);
}

function cashflowDetail(ctx: Ctx, asOf: string, notes: string[]): DetailResponse {
  const paidClaims = rand(2_400_000, 6_800_000);
  const payroll = rand(4_500_000, 10_500_000);
  const vendor = rand(450_000, 1_400_000);
  const net = rand(7_500_000, 18_000_000);

  const kpiBadges: KPIBadge[] = [
    {
      kpi_id: "KPI_CASH_NET",
      name: "Net Operating Cashflow",
      domain: "FINANCE",
      definition: "Net cash movement attributable to operating activities (cash basis) for selected period.",
      formula: "Cash Inflows − Cash Outflows (Ops only)",
      owner: "CFO Ops",
      frequency: "REALTIME",
      unit: "USD",
      value: fmtMoney(net, ctx.currency),
      verified: true,
      confidence: rand(0.88, 0.96),
      receipt: receipt("CFO Ops", true, rand(0.88, 0.96), "Derived from paid claims + payroll + AP disbursements."),
    },
    {
      kpi_id: "KPI_BEN_PAID",
      name: "Benefits Paid (Medical + Rx)",
      domain: "BENEFITS",
      definition: "Paid claims and Rx payments net of reversals for selected period.",
      formula: "SUM(paid_amount) − SUM(reversals)",
      owner: "Benefits Integrity",
      frequency: "DAILY",
      unit: "USD",
      value: fmtMoney(paidClaims, ctx.currency),
      verified: true,
      confidence: rand(0.84, 0.93),
      receipt: receipt("Benefits Integrity", true, rand(0.84, 0.93), "Carrier + PBM paid feeds reconciled."),
    },
    {
      kpi_id: "KPI_PAYROLL",
      name: "Payroll Cash Out",
      domain: "FINANCE",
      definition: "Payroll outflow including taxes and employer contributions.",
      formula: "SUM(payroll_disbursements)",
      owner: "Finance Systems",
      frequency: "DAILY",
      unit: "USD",
      value: fmtMoney(payroll, ctx.currency),
      verified: true,
      confidence: rand(0.86, 0.95),
      receipt: receipt("Finance Systems", true, rand(0.86, 0.95), "Payroll register to bank disbursement match."),
    },
    {
      kpi_id: "KPI_AP",
      name: "AP Disbursements (Vendors)",
      domain: "FINANCE",
      definition: "Vendor payments cleared for period (excluding payroll).",
      formula: "SUM(ap_paid_amount)",
      owner: "AP / Procurement",
      frequency: "DAILY",
      unit: "USD",
      value: fmtMoney(vendor, ctx.currency),
      verified: true,
      confidence: rand(0.82, 0.92),
      receipt: receipt("AP / Procurement", true, rand(0.82, 0.92), "AP subledger tied to bank clears."),
    },
  ];

  const ledger: LedgerRow[] = Array.from({ length: 28 }).map((_, i) => {
    const debit = Math.random() > 0.45 ? rand(15_000, 240_000) : 0;
    const credit = debit === 0 ? rand(15_000, 240_000) : 0;
    return {
      as_of: asOf,
      account: debit > 0 ? "Benefits Expense" : "Cash",
      account_code: debit > 0 ? "6105" : "1000",
      cost_center: ["HQ", "Midwest", "EMEA"][Math.floor(rand(0, 3))],
      vendor_or_source: ["Carrier", "PBM", "Payroll", "AP Vendor"][Math.floor(rand(0, 4))],
      memo: ["Paid claims", "Payroll run", "Vendor invoice", "Reconciliation adj."][Math.floor(rand(0, 4))],
      debit: Math.round(debit),
      credit: Math.round(credit),
      currency: ctx.currency,
      evidence_ref: kpiBadges[Math.floor(rand(0, kpiBadges.length))].receipt.receipt_id,
    };
  });

  const variances: VarianceRow[] = [
    {
      driver: "Benefits Claims (Medical + Rx)",
      prior: paidClaims * 0.92,
      current: paidClaims,
      delta: paidClaims * 0.08,
      explanation: "Seasonal flu + higher specialty drug utilization.",
      confidence: rand(0.8, 0.92),
      evidence_ref: kpiBadges[1].receipt.receipt_id,
    },
    {
      driver: "Payroll + Taxes",
      prior: payroll * 0.98,
      current: payroll,
      delta: payroll * 0.02,
      explanation: "Bonus accrual timing + merit increases.",
      confidence: rand(0.84, 0.94),
      evidence_ref: kpiBadges[2].receipt.receipt_id,
    },
    {
      driver: "AP Disbursements",
      prior: vendor * 1.05,
      current: vendor,
      delta: -vendor * 0.05,
      explanation: "Vendor payment timing shift from prior period.",
      confidence: rand(0.78, 0.88),
      evidence_ref: kpiBadges[3].receipt.receipt_id,
    },
  ];

  return {
    tile: "cashflow",
    title: "Realtime Cashflow",
    asOf,
    executiveSummary: [
      `Net operating cashflow ${fmtMoney(net, ctx.currency)} for ${ctx.period} (${ctx.org} / ${ctx.businessUnit}).`,
      `Benefits paid ${fmtMoney(paidClaims, ctx.currency)}, Payroll ${fmtMoney(payroll, ctx.currency)}, AP ${fmtMoney(vendor, ctx.currency)}.`,
      "All figures include Evidence Receipts with source lineage, freshness, DQ tests, and owner.",
    ],
    kpiBadges,
    ledger,
    variances,
    notes,
  };
}

function recoverableEbitdaDetail(ctx: Ctx, asOf: string, notes: string[]): DetailResponse {
  const waste = rand(850_000, 2_400_000);
  const overpay = rand(320_000, 980_000);
  const error = rand(180_000, 520_000);
  const net = waste + overpay + error;

  const kpiBadges: KPIBadge[] = [
    {
      kpi_id: "KPI_EBITDA_REC",
      name: "Recoverable EBITDA",
      domain: "FINANCE",
      definition: "Identified leakage opportunities ranked by evidence strength and realizability.",
      formula: "SUM(waste + overpayment + billing_error)",
      owner: "CFO Strategy",
      frequency: "WEEKLY",
      unit: "USD",
      value: fmtMoney(net, ctx.currency),
      verified: true,
      confidence: rand(0.82, 0.91),
      receipt: receipt("CFO Strategy", true, rand(0.82, 0.91), "Aggregated from Benefits Integrity + AP + Procurement."),
    },
    {
      kpi_id: "KPI_WASTE",
      name: "Waste (Low-Value / Preventable)",
      domain: "BENEFITS",
      definition: "Medical/Rx spend on preventable conditions or low-value care patterns.",
      formula: "SUM(low_value_spend)",
      owner: "Benefits Analytics",
      frequency: "WEEKLY",
      unit: "USD",
      value: fmtMoney(waste, ctx.currency),
      verified: true,
      confidence: rand(0.78, 0.89),
      receipt: receipt("Benefits Analytics", true, rand(0.78, 0.89), "Clinical validation + peer benchmarks."),
    },
    {
      kpi_id: "KPI_OVERPAY",
      name: "Overpayments (Claims + AP)",
      domain: "RISK",
      definition: "Duplicate payments, billing errors, and incorrect rates identified.",
      formula: "SUM(duplicate + rate_error)",
      owner: "Audit / Recovery",
      frequency: "DAILY",
      unit: "USD",
      value: fmtMoney(overpay, ctx.currency),
      verified: false,
      confidence: rand(0.68, 0.82),
      receipt: receipt("Audit / Recovery", false, rand(0.68, 0.82), "Pending validation on 18% of flagged items."),
    },
    {
      kpi_id: "KPI_BILLING_ERR",
      name: "Billing Errors (Vendor Invoices)",
      domain: "OPERATIONS",
      definition: "Invoice discrepancies vs. contract terms or purchase orders.",
      formula: "SUM(invoice_variance)",
      owner: "Procurement",
      frequency: "WEEKLY",
      unit: "USD",
      value: fmtMoney(error, ctx.currency),
      verified: true,
      confidence: rand(0.8, 0.9),
      receipt: receipt("Procurement", true, rand(0.8, 0.9), "Contract audit + PO match."),
    },
  ];

  const ledger: LedgerRow[] = Array.from({ length: 22 }).map(() => {
    const amt = rand(8_000, 180_000);
    return {
      as_of: asOf,
      account: "Recoverable / Leakage",
      account_code: "1250",
      cost_center: ["HQ", "Midwest", "EMEA"][Math.floor(rand(0, 3))],
      vendor_or_source: ["Carrier", "PBM", "AP Vendor", "Procurement"][Math.floor(rand(0, 4))],
      memo: ["Waste identified", "Overpayment flagged", "Billing error", "Duplicate detected"][Math.floor(rand(0, 4))],
      debit: Math.round(amt),
      credit: 0,
      currency: ctx.currency,
      evidence_ref: kpiBadges[Math.floor(rand(0, kpiBadges.length))].receipt.receipt_id,
    };
  });

  const variances: VarianceRow[] = [
    {
      driver: "Waste (Low-Value Care)",
      prior: waste * 0.88,
      current: waste,
      delta: waste * 0.12,
      explanation: "Increased preventable ER visits + low-value imaging.",
      confidence: rand(0.75, 0.87),
      evidence_ref: kpiBadges[1].receipt.receipt_id,
    },
    {
      driver: "Overpayments",
      prior: overpay * 1.08,
      current: overpay,
      delta: -overpay * 0.08,
      explanation: "Improved duplicate detection reducing flagged items.",
      confidence: rand(0.68, 0.8),
      evidence_ref: kpiBadges[2].receipt.receipt_id,
    },
    {
      driver: "Billing Errors",
      prior: error * 0.95,
      current: error,
      delta: error * 0.05,
      explanation: "New vendor onboarding created temporary invoice variance.",
      confidence: rand(0.78, 0.88),
      evidence_ref: kpiBadges[3].receipt.receipt_id,
    },
  ];

  return {
    tile: "recoverableEbitda",
    title: "Recoverable EBITDA",
    asOf,
    executiveSummary: [
      `Total recoverable EBITDA ${fmtMoney(net, ctx.currency)} for ${ctx.period} (${ctx.org} / ${ctx.businessUnit}).`,
      `Waste ${fmtMoney(waste, ctx.currency)}, Overpayments ${fmtMoney(overpay, ctx.currency)}, Billing Errors ${fmtMoney(error, ctx.currency)}.`,
      "Each line item traced to Evidence Receipts with audit-grade lineage.",
    ],
    kpiBadges,
    ledger,
    variances,
    notes,
  };
}

function healthIQDetail(ctx: Ctx, asOf: string, notes: string[]): DetailResponse {
  const healthIQ = rand(0.68, 0.88);
  const pollutionPct = rand(0.08, 0.22);
  const incidentCount = Math.floor(rand(4, 18));
  const riskScore = rand(0.15, 0.45);

  const kpiBadges: KPIBadge[] = [
    {
      kpi_id: "KPI_HEALTH_IQ",
      name: "Health IQ (Composite)",
      domain: "RISK",
      definition: "Weighted composite of data quality, incident severity, and pollution rates.",
      formula: "(1 − pollution_rate) × (1 − risk_score) × dq_pass_rate",
      owner: "Data Governance",
      frequency: "DAILY",
      unit: "INDEX",
      value: fmtPct(healthIQ),
      verified: false,
      confidence: rand(0.72, 0.86),
      receipt: receipt("Data Governance", false, rand(0.72, 0.86), "Pending manual review on 3 incidents."),
    },
    {
      kpi_id: "KPI_POLLUTION",
      name: "Pollution Rate",
      domain: "RISK",
      definition: "Percentage of records failing DQ tests or flagged as anomalies.",
      formula: "COUNT(failures) / COUNT(total)",
      owner: "Data Quality",
      frequency: "REALTIME",
      unit: "PCT",
      value: fmtPct(pollutionPct),
      verified: true,
      confidence: rand(0.8, 0.92),
      receipt: receipt("Data Quality", true, rand(0.8, 0.92), "Automated DQ pipeline with manual spot-checks."),
    },
    {
      kpi_id: "KPI_INCIDENTS",
      name: "Open Incidents",
      domain: "OPERATIONS",
      definition: "Active data quality or operational incidents requiring resolution.",
      formula: "COUNT(status = OPEN)",
      owner: "Incident Response",
      frequency: "REALTIME",
      unit: "COUNT",
      value: incidentCount.toString(),
      verified: true,
      confidence: rand(0.85, 0.95),
      receipt: receipt("Incident Response", true, rand(0.85, 0.95), "Incident tracking system of record."),
    },
    {
      kpi_id: "KPI_RISK_SCORE",
      name: "Risk Score",
      domain: "RISK",
      definition: "Probability-weighted financial exposure from active incidents.",
      formula: "SUM(incident_severity × incident_probability)",
      owner: "Risk Management",
      frequency: "WEEKLY",
      unit: "INDEX",
      value: fmtPct(riskScore),
      verified: false,
      confidence: rand(0.65, 0.78),
      receipt: receipt("Risk Management", false, rand(0.65, 0.78), "Model-based estimate pending final review."),
    },
  ];

  const ledger: LedgerRow[] = Array.from({ length: 15 }).map(() => {
    const amt = rand(2_000, 65_000);
    return {
      as_of: asOf,
      account: "Risk Reserve / Contingency",
      account_code: "2400",
      cost_center: ["HQ", "Midwest", "EMEA"][Math.floor(rand(0, 3))],
      vendor_or_source: "Data Governance",
      memo: ["DQ failure reserve", "Incident remediation", "Pollution cleanup", "Risk mitigation"][Math.floor(rand(0, 4))],
      debit: 0,
      credit: Math.round(amt),
      currency: ctx.currency,
      evidence_ref: kpiBadges[Math.floor(rand(0, kpiBadges.length))].receipt.receipt_id,
    };
  });

  const variances: VarianceRow[] = [
    {
      driver: "Health IQ Score",
      prior: healthIQ * 0.94,
      current: healthIQ,
      delta: healthIQ * 0.06,
      explanation: "Improved DQ test pass rate + incident resolution.",
      confidence: rand(0.7, 0.84),
      evidence_ref: kpiBadges[0].receipt.receipt_id,
    },
    {
      driver: "Pollution Rate",
      prior: pollutionPct * 1.18,
      current: pollutionPct,
      delta: -pollutionPct * 0.18,
      explanation: "Automated cleanup pipelines reduced anomalies.",
      confidence: rand(0.78, 0.9),
      evidence_ref: kpiBadges[1].receipt.receipt_id,
    },
    {
      driver: "Open Incidents",
      prior: incidentCount * 1.25,
      current: incidentCount,
      delta: -incidentCount * 0.25,
      explanation: "Accelerated incident response reduced backlog.",
      confidence: rand(0.82, 0.93),
      evidence_ref: kpiBadges[2].receipt.receipt_id,
    },
  ];

  return {
    tile: "healthIQ",
    title: "Pollution / Health IQ",
    asOf,
    executiveSummary: [
      `Health IQ composite ${fmtPct(healthIQ)} for ${ctx.period} (${ctx.org} / ${ctx.businessUnit}).`,
      `Pollution rate ${fmtPct(pollutionPct)}, ${incidentCount} open incidents, risk score ${fmtPct(riskScore)}.`,
      "Unverified badges indicate pending manual review or model-based estimates.",
    ],
    kpiBadges,
    ledger,
    variances,
    notes,
  };
}

function executionDetail(ctx: Ctx, asOf: string, notes: string[]): DetailResponse {
  const totalActions = Math.floor(rand(45, 95));
  const inFlight = Math.floor(totalActions * rand(0.35, 0.65));
  const realized = totalActions - inFlight;
  const realizedValue = rand(1_200_000, 4_800_000);

  const kpiBadges: KPIBadge[] = [
    {
      kpi_id: "KPI_ACTIONS_TOTAL",
      name: "Total Actions",
      domain: "OPERATIONS",
      definition: "Count of all active transformation initiatives across portfolio.",
      formula: "COUNT(status IN (DRAFT, IN_FLIGHT, REALIZED))",
      owner: "Transformation PMO",
      frequency: "DAILY",
      unit: "COUNT",
      value: totalActions.toString(),
      verified: true,
      confidence: rand(0.88, 0.96),
      receipt: receipt("Transformation PMO", true, rand(0.88, 0.96), "Action tracking system of record."),
    },
    {
      kpi_id: "KPI_INFLIGHT",
      name: "In-Flight Actions",
      domain: "OPERATIONS",
      definition: "Actions currently being executed (not yet realized).",
      formula: "COUNT(status = IN_FLIGHT)",
      owner: "Execution Team",
      frequency: "REALTIME",
      unit: "COUNT",
      value: inFlight.toString(),
      verified: true,
      confidence: rand(0.85, 0.94),
      receipt: receipt("Execution Team", true, rand(0.85, 0.94), "Real-time status updates from field teams."),
    },
    {
      kpi_id: "KPI_REALIZED",
      name: "Realized Actions",
      domain: "OPERATIONS",
      definition: "Completed actions with verified financial impact.",
      formula: "COUNT(status = REALIZED)",
      owner: "Finance / PMO",
      frequency: "WEEKLY",
      unit: "COUNT",
      value: realized.toString(),
      verified: true,
      confidence: rand(0.82, 0.92),
      receipt: receipt("Finance / PMO", true, rand(0.82, 0.92), "Impact verified against actual financials."),
    },
    {
      kpi_id: "KPI_REALIZED_VALUE",
      name: "Realized Value",
      domain: "FINANCE",
      definition: "Total financial value from realized actions (annualized).",
      formula: "SUM(action_value WHERE status = REALIZED)",
      owner: "Finance / PMO",
      frequency: "WEEKLY",
      unit: "USD",
      value: fmtMoney(realizedValue, ctx.currency),
      verified: true,
      confidence: rand(0.8, 0.9),
      receipt: receipt("Finance / PMO", true, rand(0.8, 0.9), "Tied to GL impact with evidence receipts."),
    },
  ];

  const ledger: LedgerRow[] = Array.from({ length: 18 }).map(() => {
    const amt = rand(15_000, 320_000);
    return {
      as_of: asOf,
      account: "Transformation Value",
      account_code: "4200",
      cost_center: ["HQ", "Midwest", "EMEA"][Math.floor(rand(0, 3))],
      vendor_or_source: "PMO / Execution",
      memo: ["Action realized", "Impact verified", "Value captured", "Initiative completed"][Math.floor(rand(0, 4))],
      debit: 0,
      credit: Math.round(amt),
      currency: ctx.currency,
      evidence_ref: kpiBadges[Math.floor(rand(0, kpiBadges.length))].receipt.receipt_id,
    };
  });

  const variances: VarianceRow[] = [
    {
      driver: "Total Actions",
      prior: totalActions * 0.92,
      current: totalActions,
      delta: totalActions * 0.08,
      explanation: "New initiatives launched in priority areas.",
      confidence: rand(0.85, 0.94),
      evidence_ref: kpiBadges[0].receipt.receipt_id,
    },
    {
      driver: "In-Flight Actions",
      prior: inFlight * 1.12,
      current: inFlight,
      delta: -inFlight * 0.12,
      explanation: "Accelerated realization cycle reduced backlog.",
      confidence: rand(0.82, 0.91),
      evidence_ref: kpiBadges[1].receipt.receipt_id,
    },
    {
      driver: "Realized Value",
      prior: realizedValue * 0.88,
      current: realizedValue,
      delta: realizedValue * 0.12,
      explanation: "Higher-value actions completed ahead of schedule.",
      confidence: rand(0.78, 0.88),
      evidence_ref: kpiBadges[3].receipt.receipt_id,
    },
  ];

  return {
    tile: "execution",
    title: "Execution + Realization",
    asOf,
    executiveSummary: [
      `${totalActions} total actions (${inFlight} in-flight, ${realized} realized) for ${ctx.period} (${ctx.org} / ${ctx.businessUnit}).`,
      `Realized value ${fmtMoney(realizedValue, ctx.currency)} with audit-grade evidence receipts.`,
      "All impact tied back to GL with DQ tests and ownership.",
    ],
    kpiBadges,
    ledger,
    variances,
    notes,
  };
}