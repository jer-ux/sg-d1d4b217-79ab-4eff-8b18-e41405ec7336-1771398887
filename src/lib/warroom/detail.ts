// CFO-grade demo dataset generator with comprehensive drill-down data
// Production: Swap internals for Snowflake queries/dynamic tables

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
    "This is a demo dataset shaped like real accounting/claims/vendor data to support comprehensive storytelling.",
    "Production deployment: Replace generators with Snowflake dynamic tables or Databricks Delta Live Tables.",
    "Evidence chain: Source → Transform → DQ Pipeline → Receipt → KPI Badge with cryptographic integrity.",
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
  const priorPeriodClaims = paidClaims * rand(0.88, 1.12);
  const forecastedClaims = paidClaims * rand(1.05, 1.15);

  const kpiBadges: KPIBadge[] = [
    {
      kpi_id: "KPI_CASH_NET",
      name: "Net Operating Cashflow",
      domain: "FINANCE",
      definition: "Net cash movement attributable to operating activities (cash basis) for selected period. Excludes investing and financing activities per GAAP statement of cash flows methodology.",
      formula: "Cash Inflows (Collections + Other Operating) − Cash Outflows (Benefits Paid + Payroll + AP Disbursements + Operating Expenses)",
      owner: "CFO Operations / Treasury",
      frequency: "REALTIME",
      unit: "USD",
      value: fmtMoney(net, ctx.currency),
      verified: true,
      confidence: rand(0.88, 0.96),
      receipt: receipt("CFO Operations", true, rand(0.88, 0.96), "Derived from bank reconciliation feeds, claims clearing house, and payroll processor. Daily reconciliation with +/- 0.2% variance tolerance."),
    },
    {
      kpi_id: "KPI_BEN_PAID",
      name: "Benefits Paid (Medical + Rx)",
      domain: "BENEFITS",
      definition: "Total medical and pharmacy claims payments net of reversals, coordination of benefits recoveries, and subrogation. Includes adjudicated claims paid during period regardless of service date.",
      formula: "SUM(gross_paid_amount) − SUM(reversals + COB_recoveries + subrogation) WHERE payment_date IN period",
      owner: "Benefits Integrity / Claims Analytics",
      frequency: "DAILY",
      unit: "USD",
      value: fmtMoney(paidClaims, ctx.currency),
      verified: true,
      confidence: rand(0.84, 0.93),
      receipt: receipt("Benefits Integrity", true, rand(0.84, 0.93), "Multi-carrier feed reconciliation: BCBS, Aetna, PBM (CVS Caremark). 837 EDI transaction validation with 99.4% match rate to bank clears."),
    },
    {
      kpi_id: "KPI_PAYROLL",
      name: "Payroll Cash Disbursements",
      domain: "FINANCE",
      definition: "Total payroll outflow including gross wages, employer payroll taxes (FICA, FUTA, SUTA), and employer-sponsored benefit contributions (401k match, HSA contributions).",
      formula: "SUM(gross_wages + employer_taxes + employer_benefit_contributions) WHERE disbursement_date IN period",
      owner: "Finance Systems / Payroll Operations",
      frequency: "DAILY",
      unit: "USD",
      value: fmtMoney(payroll, ctx.currency),
      verified: true,
      confidence: rand(0.86, 0.95),
      receipt: receipt("Finance Systems", true, rand(0.86, 0.95), "ADP payroll register reconciled to bank disbursement file. Automated three-way match: payroll GL posting, bank statement, ADP confirm file."),
    },
    {
      kpi_id: "KPI_AP",
      name: "AP Disbursements (Vendors)",
      domain: "FINANCE",
      definition: "Vendor payments cleared during period excluding payroll and benefits. Includes operating expenses, professional services, technology subscriptions, and capital expenditures under $5K.",
      formula: "SUM(ap_paid_amount) WHERE payment_cleared_date IN period AND vendor_type NOT IN ('payroll','benefits')",
      owner: "AP Operations / Procurement",
      frequency: "DAILY",
      unit: "USD",
      value: fmtMoney(vendor, ctx.currency),
      verified: true,
      confidence: rand(0.82, 0.92),
      receipt: receipt("AP Operations", true, rand(0.82, 0.92), "NetSuite AP subledger tied to bank positive pay file. Three-way PO match rate 94.2%, invoice approval workflow with segregation of duties."),
    },
    {
      kpi_id: "KPI_CLAIMS_FORECAST",
      name: "Claims Forecast (Next Period)",
      domain: "ACTUARIAL",
      definition: "Actuarial projection of expected claims payments for next reporting period based on historical trends, seasonality adjustments, and known plan changes.",
      formula: "IBNR_reserve + completion_factor_adjustment + trend_factor + seasonal_index",
      owner: "Actuarial Analytics",
      frequency: "WEEKLY",
      unit: "USD",
      value: fmtMoney(forecastedClaims, ctx.currency),
      verified: false,
      confidence: rand(0.72, 0.84),
      receipt: receipt("Actuarial Analytics", false, rand(0.72, 0.84), "Development triangle analysis with 36-month lookback. Confidence interval +/- 8.5% at 90% level. Pending final IBNR review."),
    },
  ];

  const ledger: LedgerRow[] = Array.from({ length: 42 }).map((_, i) => {
    const debit = Math.random() > 0.45 ? rand(15_000, 340_000) : 0;
    const credit = debit === 0 ? rand(15_000, 340_000) : 0;
    const accounts = [
      { name: "Benefits Expense - Medical", code: "6105" },
      { name: "Benefits Expense - Rx", code: "6106" },
      { name: "Payroll Expense", code: "6200" },
      { name: "Professional Services", code: "6410" },
      { name: "Cash - Operating Account", code: "1000" },
      { name: "AP - Trade Payables", code: "2100" },
    ];
    const acct = accounts[Math.floor(rand(0, accounts.length))];
    return {
      as_of: asOf,
      account: acct.name,
      account_code: acct.code,
      cost_center: ["Corporate HQ", "Midwest Region", "EMEA Operations", "APAC Division"][Math.floor(rand(0, 4))],
      vendor_or_source: ["BCBS of IL", "CVS Caremark", "ADP Payroll", "Accenture", "Bank of America"][Math.floor(rand(0, 5))],
      memo: ["Claims payment batch", "Payroll run #" + (i + 100), "Professional services invoice", "Bank transfer", "Recon adjustment"][Math.floor(rand(0, 5))],
      debit: Math.round(debit),
      credit: Math.round(credit),
      currency: ctx.currency,
      evidence_ref: kpiBadges[Math.floor(rand(0, kpiBadges.length))].receipt.receipt_id,
    };
  });

  const variances: VarianceRow[] = [
    {
      driver: "Medical + Rx Claims Payments",
      prior: priorPeriodClaims,
      current: paidClaims,
      delta: paidClaims - priorPeriodClaims,
      explanation: paidClaims > priorPeriodClaims 
        ? "Increased utilization driven by seasonal flu activity (+12% urgent care visits), higher specialty drug mix (+8% oncology/biologics), and catch-up from prior period deferrals. Emergency room visits up 15% vs. prior period."
        : "Favorable claims experience vs. prior period. Contributing factors: wellness program impact reducing preventable ER visits (-9%), generic drug substitution program (+11% generic fill rate), successful prior authorization protocols for high-cost imaging.",
      confidence: rand(0.8, 0.92),
      evidence_ref: kpiBadges[1].receipt.receipt_id,
    },
    {
      driver: "Payroll + Employer Taxes",
      prior: payroll * 0.98,
      current: payroll,
      delta: payroll * 0.02,
      explanation: "Timing factors: annual merit increases effective mid-period (+2.8% avg increase), bonus accrual for Q4 performance payouts, higher employer FICA due to wage base increases. New hire onboarding added 23 FTEs in period.",
      confidence: rand(0.84, 0.94),
      evidence_ref: kpiBadges[2].receipt.receipt_id,
    },
    {
      driver: "Accounts Payable Disbursements",
      prior: vendor * 1.05,
      current: vendor,
      delta: -vendor * 0.05,
      explanation: "Payment timing normalization: prior period included prepayment of annual software licenses. Current period reflects standard vendor payment terms (Net 45). Technology spend down 8% due to cloud migration efficiencies.",
      confidence: rand(0.78, 0.88),
      evidence_ref: kpiBadges[3].receipt.receipt_id,
    },
    {
      driver: "Cash Flow Volatility",
      prior: net * 0.94,
      current: net,
      delta: net * 0.06,
      explanation: "Improved cash position driven by better working capital management: A/R collections improved by 4 days DSO, strategic timing of vendor payments, and favorable claims payment patterns. Treasury optimization reduced idle cash by $1.2M.",
      confidence: rand(0.82, 0.91),
      evidence_ref: kpiBadges[0].receipt.receipt_id,
    },
  ];

  return {
    tile: "cashflow",
    title: "Realtime Operating Cashflow",
    asOf,
    executiveSummary: [
      `Net operating cashflow ${fmtMoney(net, ctx.currency)} for ${ctx.period} (${ctx.org} / ${ctx.businessUnit}). Cash position improved ${fmtPct((net - (net * 0.94)) / (net * 0.94))} vs. prior period.`,
      `Benefits paid ${fmtMoney(paidClaims, ctx.currency)} (${fmtPct((paidClaims - priorPeriodClaims) / priorPeriodClaims)} vs. prior), Payroll ${fmtMoney(payroll, ctx.currency)}, AP Disbursements ${fmtMoney(vendor, ctx.currency)}.`,
      `Forecast for next period: ${fmtMoney(forecastedClaims, ctx.currency)} estimated claims payments (actuarial confidence ${fmtPct(0.78)}).`,
      "All figures include Evidence Receipts with cryptographic integrity: source lineage → transform pipeline → data quality validation → owner certification.",
      `Working capital efficiency: ${Math.round(rand(42, 58))} days cash on hand, DSO improved to ${Math.round(rand(38, 45))} days, DPO optimized at ${Math.round(rand(52, 61))} days.`,
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
  const annualizedImpact = net * 3.8;
  const recoveryRate = rand(0.72, 0.85);

  const kpiBadges: KPIBadge[] = [
    {
      kpi_id: "KPI_EBITDA_REC",
      name: "Recoverable EBITDA Opportunity",
      domain: "FINANCE",
      definition: "Total identified leakage opportunities ranked by evidence strength, realizability score, and time-to-value. Includes clinical waste, financial overpayments, and operational inefficiencies with validated recovery paths.",
      formula: "SUM(clinical_waste + financial_overpayment + billing_error + operational_inefficiency) × realizability_factor × confidence_score",
      owner: "CFO Strategy / Performance Improvement",
      frequency: "WEEKLY",
      unit: "USD",
      value: fmtMoney(net, ctx.currency),
      verified: true,
      confidence: rand(0.82, 0.91),
      receipt: receipt("CFO Strategy", true, rand(0.82, 0.91), "Multi-source aggregation: Benefits Integrity analytics, AP audit findings, procurement forensics, clinical utilization review. Cross-validated against GL actuals and external benchmarks."),
    },
    {
      kpi_id: "KPI_CLINICAL_WASTE",
      name: "Clinical Waste (Preventable + Low-Value)",
      domain: "CLINICAL",
      definition: "Healthcare spend on preventable conditions, low-value care patterns (per Choosing Wisely guidelines), and services with negative ROI per evidence-based medicine standards. Includes unnecessary imaging, brand-when-generic-available, and preventable readmissions.",
      formula: "SUM(preventable_er_visits + low_value_imaging + brand_vs_generic + preventable_readmit + ineffective_treatments)",
      owner: "Clinical Analytics / Medical Director",
      frequency: "WEEKLY",
      unit: "USD",
      value: fmtMoney(waste, ctx.currency),
      verified: true,
      confidence: rand(0.78, 0.89),
      receipt: receipt("Clinical Analytics", true, rand(0.78, 0.89), "Clinical validation using peer-reviewed protocols: HEDIS measures, ACO quality benchmarks, Milliman cost analytics. Independent physician review panel validated 94% of flagged cases."),
    },
    {
      kpi_id: "KPI_FINANCIAL_OVERPAY",
      name: "Financial Overpayments (Claims + Invoices)",
      domain: "AUDIT",
      definition: "Duplicate payments, incorrect contract rates, billing errors, and pricing discrepancies identified through payment integrity analytics. Includes both recoverable (within SOL) and preventable future exposure.",
      formula: "SUM(duplicate_payments + rate_errors + billing_mistakes + upcoding + unbundling) WHERE recoverable = TRUE",
      owner: "Payment Integrity / Audit Services",
      frequency: "DAILY",
      unit: "USD",
      value: fmtMoney(overpay, ctx.currency),
      verified: false,
      confidence: rand(0.68, 0.82),
      receipt: receipt("Payment Integrity", false, rand(0.68, 0.82), "Algorithmic detection with 18% of flagged items pending manual validation. Historical recovery rate 73% on validated items. Legal review required for items >$50K."),
    },
    {
      kpi_id: "KPI_VENDOR_BILLING_ERROR",
      name: "Vendor Invoice Discrepancies",
      domain: "PROCUREMENT",
      definition: "Invoice variances vs. executed contract terms, purchase order quantities/pricing, or service level agreements. Includes overbilling, phantom charges, and unauthorized scope creep.",
      formula: "SUM(invoice_amount - contract_rate) WHERE variance > tolerance_threshold AND within_dispute_period",
      owner: "Procurement / Contract Management",
      frequency: "WEEKLY",
      unit: "USD",
      value: fmtMoney(error, ctx.currency),
      verified: true,
      confidence: rand(0.8, 0.9),
      receipt: receipt("Procurement", true, rand(0.8, 0.9), "Automated contract vs. invoice matching (Coupa platform). Three-way match: PO + receipt + invoice. Vendor cooperation rate 92% on dispute resolution."),
    },
    {
      kpi_id: "KPI_ANNUALIZED_IMPACT",
      name: "Annualized Impact (Run-Rate)",
      domain: "FINANCE",
      definition: "Projected 12-month financial impact if identified leakage patterns persist at current rates. Conservative estimate using trailing 90-day average with seasonal adjustments.",
      formula: "current_period_leakage × (365 / period_days) × persistence_factor",
      owner: "FP&A / Strategic Finance",
      frequency: "MONTHLY",
      unit: "USD",
      value: fmtMoney(annualizedImpact, ctx.currency),
      verified: false,
      confidence: rand(0.75, 0.86),
      receipt: receipt("FP&A", false, rand(0.75, 0.86), "Projection model with +/- 12% confidence interval. Assumes no intervention; actual results depend on remediation timing and effectiveness."),
    },
  ];

  const ledger: LedgerRow[] = Array.from({ length: 38 }).map(() => {
    const amt = rand(8_000, 280_000);
    const categories = [
      { account: "Recoverable Assets - Clinical", code: "1255", memo: "Low-value care identified" },
      { account: "Recoverable Assets - Payment", code: "1256", memo: "Overpayment flagged for recovery" },
      { account: "Recoverable Assets - Vendor", code: "1257", memo: "Invoice dispute filed" },
      { account: "EBITDA Opportunity - Prevention", code: "1258", memo: "Future waste prevention program" },
    ];
    const cat = categories[Math.floor(rand(0, categories.length))];
    return {
      as_of: asOf,
      account: cat.account,
      account_code: cat.code,
      cost_center: ["Corporate HQ", "Midwest Region", "Benefits Operations", "Procurement"][Math.floor(rand(0, 4))],
      vendor_or_source: ["BCBS", "CVS Caremark", "Accenture Consulting", "Tech Vendor ABC", "Facilities Management"][Math.floor(rand(0, 5))],
      memo: cat.memo,
      debit: Math.round(amt),
      credit: 0,
      currency: ctx.currency,
      evidence_ref: kpiBadges[Math.floor(rand(0, kpiBadges.length))].receipt.receipt_id,
    };
  });

  const variances: VarianceRow[] = [
    {
      driver: "Clinical Waste Identification",
      prior: waste * 0.88,
      current: waste,
      delta: waste * 0.12,
      explanation: "Increased detection driven by enhanced analytics: new ML models identifying low-value imaging patterns (+24% detection rate), expanded preventable ER visit criteria, enhanced specialty drug clinical review. Flu season drove +18% preventable urgent care utilization.",
      confidence: rand(0.75, 0.87),
      evidence_ref: kpiBadges[1].receipt.receipt_id,
    },
    {
      driver: "Financial Overpayment Recovery",
      prior: overpay * 1.08,
      current: overpay,
      delta: -overpay * 0.08,
      explanation: "Improved controls reducing new overpayments: pre-payment edits catching 91% of duplicates (up from 84%), real-time contract rate validation, enhanced vendor master data governance. Active recovery efforts collected $247K in period.",
      confidence: rand(0.68, 0.8),
      evidence_ref: kpiBadges[2].receipt.receipt_id,
    },
    {
      driver: "Vendor Billing Accuracy",
      prior: error * 0.95,
      current: error,
      delta: error * 0.05,
      explanation: "Temporary variance spike from new vendor onboarding (6 vendors added, 23% error rate in first 90 days typical). Established vendor error rate improved to 1.8% (from 2.4% prior period). Enhanced PO matching preventing $128K in incorrect payments.",
      confidence: rand(0.78, 0.88),
      evidence_ref: kpiBadges[3].receipt.receipt_id,
    },
    {
      driver: "Total Recoverable Opportunity",
      prior: net * 0.91,
      current: net,
      delta: net * 0.09,
      explanation: "Opportunity pipeline growth driven by expanded analytics coverage (claims data now 98% complete vs. 89% prior), vendor audit completion, and clinical utilization review capacity increase. Recovery realization improved to " + fmtPct(recoveryRate) + " (up from 68%).",
      confidence: rand(0.8, 0.89),
      evidence_ref: kpiBadges[0].receipt.receipt_id,
    },
  ];

  return {
    tile: "recoverableEbitda",
    title: "Recoverable EBITDA Opportunities",
    asOf,
    executiveSummary: [
      `Total recoverable EBITDA opportunity ${fmtMoney(net, ctx.currency)} for ${ctx.period} (${ctx.org} / ${ctx.businessUnit}). Annualized impact: ${fmtMoney(annualizedImpact, ctx.currency)} if patterns persist.`,
      `Clinical waste ${fmtMoney(waste, ctx.currency)} (${fmtPct(waste / net)} of total), Financial overpayments ${fmtMoney(overpay, ctx.currency)} (${fmtPct(overpay / net)}), Vendor billing errors ${fmtMoney(error, ctx.currency)} (${fmtPct(error / net)}).`,
      `Estimated recovery rate: ${fmtPct(recoveryRate)} based on historical success rates and legal review. Immediate recovery potential: ${fmtMoney(net * recoveryRate, ctx.currency)}.`,
      "Each opportunity traced to audit-grade evidence receipts with clinical validation, financial reconciliation, and legal defensibility assessment.",
      `Pipeline maturity: ${Math.round(rand(32, 48))}% in active recovery, ${Math.round(rand(28, 38))}% pending validation, ${Math.round(rand(18, 26))}% in prevention programs.`,
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
  const dqPassRate = rand(0.82, 0.95);

  const kpiBadges: KPIBadge[] = [
    {
      kpi_id: "KPI_HEALTH_IQ",
      name: "Health IQ (Composite Index)",
      domain: "DATA_GOVERNANCE",
      definition: "Proprietary composite index measuring overall data ecosystem health: data quality (40% weight), incident severity & frequency (30%), pollution/anomaly rates (20%), and risk exposure (10%). Benchmark: Top quartile >0.85, Industry median 0.72.",
      formula: "(dq_pass_rate × 0.4) + ((1 - incident_severity) × 0.3) + ((1 - pollution_rate) × 0.2) + ((1 - risk_score) × 0.1)",
      owner: "Chief Data Officer / Data Governance Council",
      frequency: "DAILY",
      unit: "INDEX",
      value: fmtPct(healthIQ),
      verified: false,
      confidence: rand(0.72, 0.86),
      receipt: receipt("Data Governance Council", false, rand(0.72, 0.86), "Pending manual review on 3 high-severity incidents. Automated DQ scoring with human-in-loop validation for ambiguous cases. Last external audit: 94% alignment with methodology."),
    },
    {
      kpi_id: "KPI_DQ_PASS_RATE",
      name: "Data Quality Pass Rate",
      domain: "DATA_QUALITY",
      definition: "Percentage of records passing all configured data quality rules across completeness, accuracy, consistency, timeliness, and validity dimensions. Over 847 active DQ rules covering critical data elements.",
      formula: "SUM(records_passed_all_rules) / SUM(total_records_evaluated) WHERE rule_priority IN ('P0','P1')",
      owner: "Data Quality Engineering",
      frequency: "REALTIME",
      unit: "PCT",
      value: fmtPct(dqPassRate),
      verified: true,
      confidence: rand(0.88, 0.96),
      receipt: receipt("Data Quality Engineering", true, rand(0.88, 0.96), "Automated Great Expectations pipeline with DBT tests. Continuously validated against golden records. Test execution: 847 rules, 2.3M records/day, <15min latency end-to-end."),
    },
    {
      kpi_id: "KPI_POLLUTION_RATE",
      name: "Data Pollution Rate",
      domain: "DATA_QUALITY",
      definition: "Percentage of records flagged as anomalous, duplicated, or containing material errors requiring remediation. Includes both systemic issues (bad source data) and episodic failures (pipeline breaks).",
      formula: "(COUNT(anomalies) + COUNT(duplicates) + COUNT(critical_failures)) / COUNT(total_records)",
      owner: "Data Observability / SRE",
      frequency: "REALTIME",
      unit: "PCT",
      value: fmtPct(pollutionPct),
      verified: true,
      confidence: rand(0.8, 0.92),
      receipt: receipt("Data Observability", true, rand(0.8, 0.92), "Monte Carlo data observability platform with ML anomaly detection. 99.2% precision on critical anomalies. Automated alerting + PagerDuty escalation for P0 issues."),
    },
    {
      kpi_id: "KPI_ACTIVE_INCIDENTS",
      name: "Active Data Incidents",
      domain: "INCIDENT_MANAGEMENT",
      definition: "Open incidents requiring resolution: P0 (system down), P1 (critical data impact), P2 (degraded quality), P3 (minor issues). Tracks data pipeline failures, quality regressions, and operational exceptions.",
      formula: "COUNT(status = 'OPEN') WHERE created_at > (NOW() - INTERVAL '30 days')",
      owner: "Data Incident Response Team",
      frequency: "REALTIME",
      unit: "COUNT",
      value: incidentCount.toString(),
      verified: true,
      confidence: rand(0.85, 0.95),
      receipt: receipt("Incident Response", true, rand(0.85, 0.95), "ServiceNow ITSM system of record. Automated incident creation from observability alerts. SLA tracking: P0 <2hr, P1 <8hr, P2 <24hr. Current SLA attainment: 96.4%."),
    },
    {
      kpi_id: "KPI_RISK_EXPOSURE",
      name: "Financial Risk Exposure Score",
      domain: "RISK_MANAGEMENT",
      definition: "Probability-weighted financial exposure from active data incidents and quality issues. Calculated as sum of (incident financial impact × incident probability × time-to-resolution). Used for risk reserves and insurance underwriting.",
      formula: "SUM(incident_financial_impact × incident_probability × urgency_multiplier)",
      owner: "Enterprise Risk Management / CFO",
      frequency: "WEEKLY",
      unit: "INDEX",
      value: fmtPct(riskScore),
      verified: false,
      confidence: rand(0.65, 0.78),
      receipt: receipt("Enterprise Risk", false, rand(0.65, 0.78), "Model-based estimate using Monte Carlo simulation (10K iterations). Historical calibration: predicted risk within +/- 15% of realized losses. Pending quarterly validation by external actuaries."),
    },
  ];

  const ledger: LedgerRow[] = Array.from({ length: 28 }).map(() => {
    const amt = rand(2_000, 125_000);
    const categories = [
      { account: "Data Quality Reserve", code: "2405", memo: "DQ failure contingency accrual" },
      { account: "Incident Remediation Expense", code: "6820", memo: "Data incident resolution cost" },
      { account: "Pollution Cleanup Expense", code: "6825", memo: "Anomaly investigation & correction" },
      { account: "Risk Mitigation Investment", code: "1420", memo: "Proactive DQ controls" },
      { account: "Data Governance Operations", code: "6805", memo: "Ongoing governance activities" },
    ];
    const cat = categories[Math.floor(rand(0, categories.length))];
    return {
      as_of: asOf,
      account: cat.account,
      account_code: cat.code,
      cost_center: ["Data Platform", "Corporate IT", "Benefits Analytics", "Finance Systems"][Math.floor(rand(0, 4))],
      vendor_or_source: ["Monte Carlo", "Great Expectations", "DBT Labs", "Snowflake", "Internal Eng"][Math.floor(rand(0, 5))],
      memo: cat.memo,
      debit: cat.account.includes("Expense") || cat.account.includes("Investment") ? Math.round(amt) : 0,
      credit: cat.account.includes("Reserve") ? Math.round(amt) : 0,
      currency: ctx.currency,
      evidence_ref: kpiBadges[Math.floor(rand(0, kpiBadges.length))].receipt.receipt_id,
    };
  });

  const variances: VarianceRow[] = [
    {
      driver: "Overall Health IQ Score",
      prior: healthIQ * 0.94,
      current: healthIQ,
      delta: healthIQ * 0.06,
      explanation: "Improved score driven by: DQ pass rate increase (+3.2ppt from enhanced validation rules), incident closure rate acceleration (MTTR reduced from 18hr to 14hr), and pollution rate reduction via automated cleanup pipelines. New data contracts with upstream systems reducing ingest errors by 22%.",
      confidence: rand(0.7, 0.84),
      evidence_ref: kpiBadges[0].receipt.receipt_id,
    },
    {
      driver: "Data Quality Pass Rate",
      prior: dqPassRate * 0.97,
      current: dqPassRate,
      delta: dqPassRate * 0.03,
      explanation: "Quality improvements from: expanded test coverage (847 rules, up from 712), stricter validation thresholds on critical fields, and pre-ingestion data contracts with 5 major source systems. Automated remediation handling 76% of common failures without human intervention.",
      confidence: rand(0.85, 0.93),
      evidence_ref: kpiBadges[1].receipt.receipt_id,
    },
    {
      driver: "Pollution Rate Reduction",
      prior: pollutionPct * 1.18,
      current: pollutionPct,
      delta: -pollutionPct * 0.18,
      explanation: "Significant reduction from: ML anomaly detection improvements (precision up to 99.2%), automated duplicate detection & deduplication (processing 400K records/day), and source system data quality enforcement via SLAs. Three major pollution sources eliminated through root cause analysis.",
      confidence: rand(0.78, 0.9),
      evidence_ref: kpiBadges[2].receipt.receipt_id,
    },
    {
      driver: "Incident Volume & Severity",
      prior: incidentCount * 1.25,
      current: incidentCount,
      delta: -incidentCount * 0.25,
      explanation: "Incident backlog reduction: accelerated response through automated runbooks (handling 68% of P2/P3 incidents), improved on-call coverage (2-hour P0 SLA now 96% attainment), and proactive monitoring catching issues before user impact. Major pipeline stability improvements deployed in period.",
      confidence: rand(0.82, 0.93),
      evidence_ref: kpiBadges[3].receipt.receipt_id,
    },
  ];

  return {
    tile: "healthIQ",
    title: "Data Health & Pollution Metrics",
    asOf,
    executiveSummary: [
      `Health IQ composite score ${fmtPct(healthIQ)} for ${ctx.period} (${ctx.org} / ${ctx.businessUnit}). Score improved ${fmtPct((healthIQ - (healthIQ * 0.94)) / (healthIQ * 0.94))} vs. prior period. Target: Top quartile (${fmtPct(0.85)}).`,
      `Data quality pass rate ${fmtPct(dqPassRate)} across 847 validation rules processing 2.3M records/day. Pollution rate ${fmtPct(pollutionPct)} (${incidentCount} active incidents requiring resolution).`,
      `Financial risk exposure score ${fmtPct(riskScore)} represents probability-weighted impact of data quality issues on business operations. Estimated reserves: ${fmtMoney(rand(180_000, 520_000), ctx.currency)}.`,
      `System reliability: ${fmtPct(rand(0.994, 0.999))} uptime, MTTR ${Math.round(rand(12, 16))}hr (target <18hr), incident SLA attainment ${fmtPct(rand(0.94, 0.98))}.`,
      "Unverified badges indicate model-based estimates requiring quarterly external actuarial validation. All DQ metrics validated against golden record test sets.",
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
  const projectedValue = realizedValue * rand(1.4, 2.2);
  const avgCycleTime = Math.round(rand(42, 78));

  const kpiBadges: KPIBadge[] = [
    {
      kpi_id: "KPI_PORTFOLIO_SIZE",
      name: "Active Transformation Portfolio",
      domain: "PMO",
      definition: "Total count of active transformation initiatives across all stages: Draft (planning), In-Flight (execution), and Realized (completed with validated impact). Excludes cancelled and on-hold initiatives.",
      formula: "COUNT(initiative_id) WHERE status IN ('DRAFT','IN_FLIGHT','REALIZED') AND end_date IS NULL",
      owner: "Transformation PMO / Chief Transformation Officer",
      frequency: "DAILY",
      unit: "COUNT",
      value: totalActions.toString(),
      verified: true,
      confidence: rand(0.88, 0.96),
      receipt: receipt("Transformation PMO", true, rand(0.88, 0.96), "Monday.com project tracking system of record. Daily syncs from Jira, Asana, Smartsheet for distributed teams. Executive steering committee reviews weekly. Last audit: 98.7% data accuracy."),
    },
    {
      kpi_id: "KPI_IN_FLIGHT_COUNT",
      name: "In-Flight Initiatives",
      domain: "EXECUTION",
      definition: "Initiatives currently in execution phase with active work streams. Includes initiatives with committed resources, approved budgets, and active sprint/milestone tracking.",
      formula: "COUNT(initiative_id) WHERE status = 'IN_FLIGHT' AND has_active_workstream = TRUE",
      owner: "Execution Teams / Program Managers",
      frequency: "REALTIME",
      unit: "COUNT",
      value: inFlight.toString(),
      verified: true,
      confidence: rand(0.85, 0.94),
      receipt: receipt("Execution Teams", true, rand(0.85, 0.94), "Real-time status updates via integrated tools: Jira for engineering, Asana for ops, Smartsheet for finance. Automated status roll-ups with anomaly detection for stalled initiatives. Weekly standup cadence across 12 program workstreams."),
    },
    {
      kpi_id: "KPI_REALIZED_COUNT",
      name: "Realized Initiatives",
      domain: "VALUE_DELIVERY",
      definition: "Completed initiatives with validated financial impact tied to general ledger actuals. Requires sign-off from Finance and business owner confirming value realization per business case.",
      formula: "COUNT(initiative_id) WHERE status = 'REALIZED' AND financial_validation = 'APPROVED' AND gl_impact_verified = TRUE",
      owner: "Finance / Value Realization Team",
      frequency: "WEEKLY",
      unit: "COUNT",
      value: realized.toString(),
      verified: true,
      confidence: rand(0.82, 0.92),
      receipt: receipt("Value Realization", true, rand(0.82, 0.92), "Impact validated against GL actuals with 90-day trailing verification. CFO sign-off required for initiatives >$250K. Independent finance review confirms value capture methodology. Historical validation accuracy: 94% (actuals within +/- 10% of business case)."),
    },
    {
      kpi_id: "KPI_REALIZED_VALUE",
      name: "Validated Financial Impact (Realized)",
      domain: "FINANCE",
      definition: "Total annualized financial value from initiatives with completed execution and validated GL impact. Includes cost savings, revenue uplift, and working capital improvements. Conservative recognition: only counts value after business-as-usual transition.",
      formula: "SUM(annualized_financial_impact) WHERE status = 'REALIZED' AND value_realization_date <= current_period_end",
      owner: "CFO / FP&A",
      frequency: "MONTHLY",
      unit: "USD",
      value: fmtMoney(realizedValue, ctx.currency),
      verified: true,
      confidence: rand(0.8, 0.9),
      receipt: receipt("FP&A", true, rand(0.8, 0.9), "Tied to GL with evidence chain: business case → implementation → go-live → value validation → GL reconciliation. External audit trail for SOX compliance. Quarterly CFO certification of portfolio value."),
    },
    {
      kpi_id: "KPI_PROJECTED_VALUE",
      name: "Total Portfolio Value (Projected)",
      domain: "STRATEGY",
      definition: "Projected annualized value across entire active portfolio including in-flight initiatives at various probability-weighted completion stages. Used for board reporting and strategic planning.",
      formula: "SUM(initiative_projected_value × probability_of_success × completion_factor)",
      owner: "Strategy / Corporate Development",
      frequency: "MONTHLY",
      unit: "USD",
      value: fmtMoney(projectedValue, ctx.currency),
      verified: false,
      confidence: rand(0.68, 0.82),
      receipt: receipt("Strategy", false, rand(0.68, 0.82), "Projection model with stage-gate probability adjustments: Draft 40%, In-Flight 75%, Realized 100%. Conservative estimates using P75 from historical distributions. Refresh quarterly based on latest execution velocity."),
    },
    {
      kpi_id: "KPI_CYCLE_TIME",
      name: "Average Initiative Cycle Time",
      domain: "DELIVERY",
      definition: "Mean time from initiative approval to value realization (days). Key metric for execution velocity and organizational change capacity. Benchmark: Best-in-class <60 days, Industry median 90 days.",
      formula: "AVG(value_realization_date - approval_date) WHERE status = 'REALIZED' AND realized_in_last_12_months = TRUE",
      owner: "PMO / Delivery Excellence",
      frequency: "MONTHLY",
      unit: "DAYS",
      value: avgCycleTime.toString(),
      verified: true,
      confidence: rand(0.84, 0.93),
      receipt: receipt("PMO", true, rand(0.84, 0.93), "Calculated from audit trail timestamps in Monday.com. Excludes initiatives on hold or with extended approval delays. Rolling 12-month average to normalize for portfolio mix changes."),
    },
  ];

  const ledger: LedgerRow[] = Array.from({ length: 32 }).map(() => {
    const amt = rand(15_000, 420_000);
    const categories = [
      { account: "Transformation Value (Revenue)", code: "4200", memo: "Revenue uplift - initiative realized", credit: true },
      { account: "Transformation Value (Cost Savings)", code: "4205", memo: "Cost reduction - initiative realized", credit: true },
      { account: "Working Capital Improvement", code: "1800", memo: "WC efficiency gain", debit: true },
      { account: "Initiative Investment (CapEx)", code: "1500", memo: "Technology investment", debit: true },
      { account: "Change Management Expense", code: "6830", memo: "Training & communications", debit: true },
    ];
    const cat = categories[Math.floor(rand(0, categories.length))];
    return {
      as_of: asOf,
      account: cat.account,
      account_code: cat.code,
      cost_center: ["Transformation PMO", "Business Unit A", "Corporate Functions", "Technology"][Math.floor(rand(0, 4))],
      vendor_or_source: ["Internal Execution", "Accenture", "Deloitte", "Technology Platform", "HR / Training"][Math.floor(rand(0, 5))],
      memo: cat.memo,
      debit: cat.debit ? Math.round(amt) : 0,
      credit: cat.credit ? Math.round(amt) : 0,
      currency: ctx.currency,
      evidence_ref: kpiBadges[Math.floor(rand(0, kpiBadges.length))].receipt.receipt_id,
    };
  });

  const variances: VarianceRow[] = [
    {
      driver: "Portfolio Size Growth",
      prior: totalActions * 0.92,
      current: totalActions,
      delta: totalActions * 0.08,
      explanation: "New initiative launches in strategic priority areas: 8 cost optimization initiatives (procurement, benefits, real estate), 4 revenue initiatives (product launches, market expansion), 3 operational efficiency programs. Portfolio governance ensuring initiatives align with strategic pillars and have committed executive sponsorship.",
      confidence: rand(0.85, 0.94),
      evidence_ref: kpiBadges[0].receipt.receipt_id,
    },
    {
      driver: "In-Flight Execution Velocity",
      prior: inFlight * 1.12,
      current: inFlight,
      delta: -inFlight * 0.12,
      explanation: "Accelerated realization cycle reduced backlog: improved project management rigor (daily standups, blocker escalation), dedicated execution teams (no longer part-time resources), enhanced change management reducing organizational friction. Cycle time improved to " + avgCycleTime + " days from " + Math.round(avgCycleTime * 1.15) + " days prior period.",
      confidence: rand(0.82, 0.91),
      evidence_ref: kpiBadges[1].receipt.receipt_id,
    },
    {
      driver: "Value Realization (Realized)",
      prior: realizedValue * 0.88,
      current: realizedValue,
      delta: realizedValue * 0.12,
      explanation: "Strong value capture: higher-value initiatives completed ahead of schedule (3 initiatives >$500K each), better-than-modeled results from procurement consolidation (+18% vs. business case), successful pilot-to-scale transition (reducing risk-adjusted probability discounts). Active portfolio management ensuring value realization discipline.",
      confidence: rand(0.78, 0.88),
      evidence_ref: kpiBadges[3].receipt.receipt_id,
    },
    {
      driver: "Projected Portfolio Value",
      prior: projectedValue * 0.94,
      current: projectedValue,
      delta: projectedValue * 0.06,
      explanation: "Upward revision driven by: in-flight initiative progress exceeding milestones (completion factors updated), new high-value initiatives added to portfolio, and improved probability scores based on execution track record. Conservative estimate maintained: using P75 from historical distributions vs. P50 business case assumptions.",
      confidence: rand(0.68, 0.8),
      evidence_ref: kpiBadges[4].receipt.receipt_id,
    },
  ];

  return {
    tile: "execution",
    title: "Transformation Execution & Value Realization",
    asOf,
    executiveSummary: [
      `Active transformation portfolio: ${totalActions} total initiatives (${inFlight} in-flight, ${realized} realized) for ${ctx.period} (${ctx.org} / ${ctx.businessUnit}).`,
      `Realized value ${fmtMoney(realizedValue, ctx.currency)} with audit-grade GL reconciliation. Total projected portfolio value: ${fmtMoney(projectedValue, ctx.currency)} (probability-weighted).`,
      `Execution velocity: ${avgCycleTime} days average cycle time from approval to realization (target: <60 days best-in-class). ${fmtPct(realized / totalActions)} completion rate.`,
      `Value realization discipline: 100% of realized initiatives validated by Finance with GL impact traceability. Historical accuracy: actuals within +/- 10% of business case for ${fmtPct(0.94)} of initiatives.`,
      `Portfolio health: ${Math.round(rand(88, 96))}% initiatives on track or ahead of schedule, ${Math.round(rand(4, 8))}% at risk requiring intervention, ${Math.round(rand(1, 4))}% stalled pending decisions.`,
    ],
    kpiBadges,
    ledger,
    variances,
    notes,
  };
}

export function generateDemoData() {
  // Generate a robust set of demo events for the detail drawer lookup
  const events = [
    {
      id: "EVT-2024-001",
      title: "Pharmacy Benefit Contract Leakage",
      subtitle: "Specialty Drug Pricing Discrepancy",
      lane: "value" as const,
      amount: 1250000,
      timeSensitivity: 0.95,
      confidence: 0.92,
      owner: "Sarah Chen",
      state: "IDENTIFIED" as const,
      receipts: [
        { receipt_id: "RCPT-001", owner: "Claims Audit", confidence: 0.95, verified: true },
        { receipt_id: "RCPT-002", owner: "PBM Liaison", confidence: 0.88, verified: true }
      ],
      notes: "Identified during Q3 audit cycle. Validated against contract terms.",
      severity: "critical" as const,
      priority: "High",
      category: "Financial"
    },
    {
      id: "EVT-2024-002",
      title: "Duplicate Vendor Payments",
      subtitle: "IT Services - Cloud Infrastructure",
      lane: "controls" as const,
      amount: 450000,
      timeSensitivity: 0.6,
      confidence: 0.98,
      owner: "Mike Ross",
      state: "APPROVED" as const,
      receipts: [
        { receipt_id: "RCPT-003", owner: "AP Audit", confidence: 0.99, verified: true }
      ],
      notes: "Duplicate invoices processed for May/June service periods.",
      severity: "high" as const,
      priority: "Medium",
      category: "Operational"
    },
    {
      id: "EVT-2024-003",
      title: "Clinical Waste Reduction",
      subtitle: "Low-Value Imaging Protocols",
      lane: "value" as const,
      amount: 850000,
      timeSensitivity: 0.4,
      confidence: 0.75,
      owner: "Dr. Emily Wei",
      state: "IDENTIFIED" as const,
      receipts: [],
      notes: "Analysis of MRI utilization shows 15% non-compliance with new guidelines.",
      severity: "medium" as const,
      priority: "Low",
      category: "Clinical"
    }
  ];

  return { events };
}