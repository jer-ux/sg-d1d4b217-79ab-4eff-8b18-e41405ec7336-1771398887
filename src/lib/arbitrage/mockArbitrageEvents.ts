import type { ArbitrageEvent } from "@/components/arbitrage/ArbitrageEventsPanel";

export const mockArbitrageEvents: ArbitrageEvent[] = [
  {
    event_id: "AE-10831",
    title: "Eligibility Mismatch Causing Paid Claims for Termed Members",
    category: "Eligibility Leakage",
    severity: "CRITICAL",
    status: "INVESTIGATING",
    detected_at: new Date(Date.now() - 1000 * 60 * 43).toISOString(),
    payer: "Anthem",
    employer: "Kincaid Demo Manufacturing (2,430 lives)",

    score: {
      rank: 1,
      confidence: 0.86,
      time_sensitivity: 0.82,
      delta_value: 742_000,
      formula:
        "rank_score = (delta_value × confidence × time_sensitivity) with VERIFIED gate; delta_value annualized from trailing 90d overpayment run-rate",
    },

    narrative: {
      executive_summary:
        "We detected paid medical claims tied to members whose eligibility termination dates precede the claim service dates. This indicates an eligibility feed timing or mapping gap (HRIS → eligibility file → payer) and creates direct overpayment exposure and stop-loss risk.",
      why_it_matters:
        "This is direct cash leakage. It also undermines auditability: eligibility is the control boundary for claims liability. If eligibility is wrong, finance attribution becomes storytelling.",
      what_changed:
        "A new HRIS job schedule introduced a 24–48 hour lag in termination propagation; concurrent file layout update shifted EMPLOYEE_STATUS mapping for a subset of job codes.",
      scope:
        "Impact concentrated in Terminations + LOA transitions. 37 member-episodes detected across 11 groups; 14 high-dollar claim clusters exceed $10k each.",
    },

    kpis: [
      { label: "Overpaid Claims (90d)", value: "$185,400", note: "Paid post-term service dates" },
      { label: "Run-rate Annualized", value: "$742,000", note: "Annualized from 90d trend" },
      { label: "Members Impacted", value: "37", note: "Unique member-episodes" },
      { label: "Avg Lag", value: "31 hrs", note: "Termination effective → payer recognized" },
      { label: "Stop-Loss Exposure", value: "High", note: "2 claims > $50k post-term" },
      { label: "Confidence", value: "86%", note: "DQ pass + deterministic join checks" },
    ],

    evidence: {
      receipt_id: "ER-ELIG-2026-01-28-00019",
      verified: true,
      confidence: 0.86,
      freshness_minutes: 22,
      owner: "Benefits Ops Lead",
      source_system: "Snowflake",
      source_artifact_hash: "sha256:9a1b...e77c",
      transform_hash: "sha256:2f9d...b3a1",
      dq_tests: [
        { name: "Eligibility termination_date not null for termed members", pass: true },
        { name: "Claims service_date within coverage window", pass: false, details: "37 violations" },
        { name: "Member ID referential integrity (elig ↔ claims)", pass: true },
        { name: "Duplicate termination records", pass: true },
        { name: "Payer file row counts within expected band", pass: true },
      ],
      lineage: [
        { node: "RAW.HRIS_TERMINATIONS", kind: "TABLE", ref: "snowpipe/hris_terminations" },
        { node: "RAW.PAYER_CLAIMS_MEDICAL", kind: "TABLE", ref: "payer/claims/medical" },
        { node: "CURATED.ELIGIBILITY_COVERAGE_WINDOWS", kind: "VIEW", ref: "dt_elig_windows" },
        { node: "MART.ARBITRAGE_EVENTS_ELIG", kind: "TABLE", ref: "event_builder_v3" },
        { node: "APP.EVENTS_API", kind: "JOB", ref: "events_api_publish" },
      ],
    },

    model: {
      baseline_cost: 2_470_000,
      expected_cost: 1_728_000,
      delta_value: 742_000,
      units: "$/year",
      assumptions: [
        { key: "Annualization window", value: "Trailing 90 days × 4.06 seasonality factor" },
        { key: "Recovery rate", value: "62% based on payer recovery historical" },
        { key: "Admin effort", value: "6.5 hrs per case average" },
        { key: "Stop-loss notification window", value: "14 days SLA" },
      ],
      sensitivity: [
        { variable: "Recovery rate", low: 410_000, base: 742_000, high: 920_000 },
        { variable: "Termination lag (hrs)", low: 320_000, base: 742_000, high: 1_120_000 },
        { variable: "High-dollar claims frequency", low: 610_000, base: 742_000, high: 1_380_000 },
      ],
    },

    packet: {
      recommended_owner: "Benefits Ops + HRIS Integration Owner",
      actions: [
        {
          step: "Freeze eligibility file layout version; validate EMPLOYEE_STATUS mapping",
          system: "HRIS → Eligibility Extract",
          due_in_days: 2,
          rationale:
            "Mapping drift is the most likely root cause. Prevents new leakage while recovery is pursued.",
        },
        {
          step: "Submit recovery packet to payer for the 37 identified member-episodes",
          system: "Payer Portal",
          due_in_days: 5,
          rationale: "Claims paid post-term are generally recoverable with deterministic evidence.",
        },
        {
          step: "Implement termination propagation SLA dashboard + alerting",
          system: "Snowflake + App",
          due_in_days: 7,
          rationale: "Make the control measurable: lag, exceptions, and weekly trend.",
        },
      ],
      artifacts: [
        { name: "Recovery Packet (CSV)", type: "LINK", value: "app://artifact/AE-10831/recovery.csv" },
        { name: "Eligibility Feed Diff Report", type: "PDF", value: "app://artifact/AE-10831/diff.pdf" },
        { name: "Detection SQL Signature", type: "SQL", value: "app://artifact/AE-10831/detect.sql" },
        { name: "ServiceNow Ticket", type: "TICKET", value: "SNOW-INC-34901" },
      ],
    },

    audit_log: [
      {
        ts: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
        actor: "events-engine",
        action: "Event created from deterministic ruleset v3",
        notes: "Join: member_id + coverage_window; filter: service_date > term_date",
      },
      {
        ts: new Date(Date.now() - 1000 * 60 * 28).toISOString(),
        actor: "dq-gate",
        action: "Evidence receipt VERIFIED",
        notes: "All critical DQ tests passed; exception count recorded (37)",
      },
      {
        ts: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
        actor: "ops-lead",
        action: "Status changed: NEW → INVESTIGATING",
        notes: "Engaged HRIS owner; pulling last 14 days extract logs",
      },
    ],

    sql: {
      detection_query: `-- Detect claims paid after eligibility termination
SELECT
  c.member_id,
  c.claim_id,
  c.service_date,
  e.term_date,
  c.paid_amount
FROM RAW.PAYER_CLAIMS_MEDICAL c
JOIN CURATED.ELIGIBILITY_COVERAGE_WINDOWS e
  ON e.member_id = c.member_id
WHERE c.service_date > e.term_date
  AND c.paid_amount > 0
  AND c.service_date >= DATEADD(day, -90, CURRENT_DATE());`,
      validation_query: `-- Validate termination lag distribution
SELECT
  DATE_TRUNC('hour', t.termination_effective_ts) AS term_hour,
  AVG(DATEDIFF('hour', t.termination_effective_ts, p.payer_effective_ts)) AS avg_lag_hours
FROM RAW.HRIS_TERMINATIONS t
JOIN CURATED.PAYER_ELIGIBILITY_ACK p
  ON p.member_id = t.member_id
WHERE t.termination_effective_ts >= DATEADD(day, -30, CURRENT_TIMESTAMP())
GROUP BY 1
ORDER BY 1;`,
    },

    related: {
      summary: [
        { label: "Rows", value: "37", note: "member-episodes" },
        { label: "High-dollar", value: "2", note: "claims > $50k" },
        { label: "Top reason", value: "TERM_LAG", note: "dominant exception" },
      ],
      transactions: Array.from({ length: 37 }).map((_, i) => ({
        row_id: `AE-10831-${i + 1}`,
        type: "CLAIM" as const,
        member_id: `M-${100000 + i}`,
        claim_id: `C-${900000 + i}`,
        service_date: new Date(Date.now() - 1000 * 60 * 60 * 24 * (i % 35)).toISOString(),
        paid_amount: 1200 + (i % 7) * 780,
        allowed_amount: 2400 + (i % 7) * 920,
        vendor: i % 3 === 0 ? "Hospital Network A" : i % 3 === 1 ? "Specialist Group B" : "Primary Care C",
        status: i % 9 === 0 ? "High-dollar cluster" : "Paid post-term",
        reason: i % 9 === 0 ? "Paid after termination; high-dollar stop-loss exposure" : "Service date exceeds coverage window (term lag)",
        ledger: {
          header: [
            { label: "Claim ID", value: `C-${900000 + i}` },
            { label: "Member ID", value: `M-${100000 + i}` },
            { label: "Service Date", value: new Date(Date.now() - 1000 * 60 * 60 * 24 * (i % 35)).toLocaleDateString() },
            { label: "Processed Date", value: new Date(Date.now() - 1000 * 60 * 60 * 24 * (i % 30)).toLocaleDateString() },
          ],
          financial: [
            { label: "Billed Amount", value: `$${(2400 + (i % 7) * 920).toLocaleString()}` },
            { label: "Allowed Amount", value: `$${(2400 + (i % 7) * 920).toLocaleString()}` },
            { label: "Paid Amount", value: `$${(1200 + (i % 7) * 780).toLocaleString()}` },
            { label: "Member Responsibility", value: `$${(1200).toLocaleString()}` },
          ],
          mapping: [
            { label: "Provider", value: i % 3 === 0 ? "Hospital Network A" : i % 3 === 1 ? "Specialist Group B" : "Primary Care C" },
            { label: "Network Status", value: "IN-NETWORK" },
            { label: "Procedure Code", value: `99${213 + (i % 5)}` },
            { label: "Diagnosis Code", value: `Z00.${i % 9}` },
          ],
          controls: [
            { label: "Eligibility Check", value: "FAILED" },
            { label: "Termination Date", value: new Date(Date.now() - 1000 * 60 * 60 * 24 * (i % 35 + 5)).toLocaleDateString() },
            { label: "Coverage Window", value: "EXPIRED" },
            { label: "Stop-Loss Flag", value: i % 9 === 0 ? "YES" : "NO" },
          ],
          notes: i % 9 === 0
            ? "High-dollar claim paid after member termination. Stop-loss notification required within 14 days. Recovery probability: 85%."
            : "Claim paid after eligibility termination due to HRIS feed lag. Standard recovery process applicable.",
        },
      })),
    },

    realization: {
      owner: "Benefits Ops Lead",
      forecast_value: 742_000,
      realized_value: 185_400,
      currency: "$",
      stage: "SUBMITTED",
      milestones: [
        {
          stage: "IDENTIFIED",
          ts: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
          actor: "events-engine",
          notes: "Detected via deterministic ruleset; 37 member-episodes flagged",
        },
        {
          stage: "VALIDATED",
          ts: new Date(Date.now() - 1000 * 60 * 28).toISOString(),
          actor: "dq-gate",
          notes: "Evidence receipt VERIFIED; all critical DQ tests passed",
        },
        {
          stage: "SUBMITTED",
          ts: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
          actor: "ops-lead",
          notes: "Recovery packet submitted to payer for 37 claims totaling $185.4K",
        },
        {
          stage: "APPROVED",
          ts: "",
          actor: "payer",
          notes: "Pending payer review (14-day SLA)",
        },
        {
          stage: "RECOVERED",
          ts: "",
          actor: "finance",
          notes: "Awaiting credit memo from payer",
        },
        {
          stage: "BOOKED",
          ts: "",
          actor: "finance",
          notes: "Pending EBITDA booking confirmation",
        },
        {
          stage: "CLOSED",
          ts: "",
          actor: "ops-lead",
          notes: "Pending final reconciliation",
        },
      ],
      risks: [
        {
          label: "Payer recovery rate uncertainty",
          severity: "MED",
          mitigation: "Historical recovery rate is 62%; $460K forecasted recovery at risk if lower",
        },
        {
          label: "HRIS mapping fix delayed",
          severity: "HIGH",
          mitigation: "New leakage continues at ~$6K/day until mapping corrected; freeze file layout",
        },
      ],
    },
  },

  {
    event_id: "AE-10852",
    title: "PBM Rebate Guarantee Shortfall vs Contract Minimum",
    category: "PBM / Rx Economics",
    severity: "HIGH",
    status: "NEW",
    detected_at: new Date(Date.now() - 1000 * 60 * 140).toISOString(),
    payer: "Express Scripts",
    employer: "Kincaid Demo Manufacturing (2,430 lives)",

    score: {
      rank: 2,
      confidence: 0.78,
      time_sensitivity: 0.66,
      delta_value: 318_000,
      formula:
        "rank_score = (delta_value × confidence × time_sensitivity); confidence reduced due to missing NDC normalization for 4% of rows",
    },

    narrative: {
      executive_summary:
        "Rebate guarantee tracking indicates current period performance is trending below the contractual minimum per-script rebate guarantee. Root drivers appear to be specialty mix shift and formulary exception patterns.",
      why_it_matters:
        "If unaddressed, this becomes an end-of-year true-up dispute. Catching it now turns it into a negotiation lever and an operational fix (formulary/PA enforcement).",
      what_changed:
        "Specialty utilization increased 11% QoQ; a subset of high-cost NDCs are not capturing expected rebate class due to mapping gaps.",
      scope:
        "Applies to Rx claims and rebate eligibility. Impact concentrated in specialty and a single manufacturer class.",
    },

    kpis: [
      { label: "Rebate Gap (YTD)", value: "$96,200", note: "vs contract minimum" },
      { label: "Projected Gap (EOY)", value: "$318,000", note: "if trend continues" },
      { label: "Specialty Mix Shift", value: "+11%", note: "QoQ specialty share" },
      { label: "NDC Mapping Coverage", value: "96%", note: "4% unmapped" },
      { label: "Confidence", value: "78%", note: "pending NDC normalization" },
    ],

    evidence: {
      receipt_id: "ER-PBM-2026-01-28-00007",
      verified: false,
      confidence: 0.78,
      freshness_minutes: 55,
      owner: "Pharmacy Analytics",
      source_system: "Snowflake",
      source_artifact_hash: "sha256:6c2f...1aa9",
      transform_hash: "sha256:90d1...c401",
      dq_tests: [
        { name: "Rx claim NDC populated", pass: true },
        { name: "NDC normalized to 11-digit", pass: false, details: "4% unmapped" },
        { name: "Contract guarantee table present for period", pass: true },
        { name: "Duplicate rebate rows removed", pass: true },
      ],
      lineage: [
        { node: "RAW.PBM_RX_CLAIMS", kind: "TABLE", ref: "pbm/rx_claims" },
        { node: "REF.NDC_NORMALIZATION", kind: "TABLE", ref: "ndc_norm_v2" },
        { node: "REF.PBM_CONTRACT_GUARANTEES", kind: "TABLE", ref: "contract_terms" },
        { node: "MART.ARBITRAGE_EVENTS_PBM", kind: "TABLE", ref: "event_builder_v3" },
      ],
    },

    model: {
      baseline_cost: 4_210_000,
      expected_cost: 3_892_000,
      delta_value: 318_000,
      units: "$/year",
      assumptions: [
        { key: "Guarantee metric", value: "Per-script rebate floor" },
        { key: "True-up mechanism", value: "Annual reconciliation" },
        { key: "Mapping completion", value: "Assumes NDC coverage to 99% after fix" },
      ],
      sensitivity: [
        { variable: "Specialty trend", low: 140_000, base: 318_000, high: 610_000 },
        { variable: "NDC mapping completion", low: 220_000, base: 318_000, high: 390_000 },
      ],
    },

    packet: {
      recommended_owner: "Pharmacy Lead + Vendor Manager",
      actions: [
        {
          step: "Fix NDC normalization gaps and re-run rebate class mapping",
          system: "Snowflake",
          due_in_days: 3,
          rationale: "Move evidence receipt to VERIFIED and improve negotiation footing.",
        },
        {
          step: "Request interim rebate performance report + manufacturer exclusions list",
          system: "PBM",
          due_in_days: 5,
          rationale: "Identify contract carve-outs and validate true-up expectations early.",
        },
        {
          step: "Initiate vendor governance meeting with contract language ready",
          system: "Ops / Vendor Mgmt",
          due_in_days: 10,
          rationale: "Convert data into dollars before year-end.",
        },
      ],
      artifacts: [
        { name: "Contract Guarantee Snapshot", type: "PDF", value: "app://artifact/AE-10852/contract.pdf" },
        { name: "Vendor Email Draft", type: "LINK", value: "app://artifact/AE-10852/email" },
        { name: "Normalization Patch SQL", type: "SQL", value: "app://artifact/AE-10852/patch.sql" },
      ],
    },

    audit_log: [
      {
        ts: new Date(Date.now() - 1000 * 60 * 138).toISOString(),
        actor: "events-engine",
        action: "Event created from PBM guarantee monitor",
        notes: "Detected below-floor trend over rolling 60d window",
      },
    ],

    sql: {
      detection_query: `-- Detect rebate guarantee performance gap
SELECT
  contract_year,
  contract_quarter,
  SUM(claim_amount) AS total_claim_spend,
  SUM(rebate_amount) AS total_rebates,
  (SUM(rebate_amount) / NULLIF(COUNT(DISTINCT claim_id), 0)) AS rebate_per_script,
  guarantee_per_script,
  (guarantee_per_script - rebate_per_script) AS gap_per_script
FROM MART.PBM_REBATE_PERFORMANCE
WHERE contract_year = YEAR(CURRENT_DATE())
  AND contract_quarter = QUARTER(CURRENT_DATE())
GROUP BY 1, 2, guarantee_per_script
HAVING gap_per_script > 0;`,
      validation_query: `-- Validate NDC normalization coverage
SELECT
  ndc_normalized_flag,
  COUNT(*) AS claim_count,
  SUM(paid_amount) AS total_paid
FROM RAW.PBM_RX_CLAIMS
WHERE service_date >= DATEADD(day, -90, CURRENT_DATE())
GROUP BY 1;`,
    },

    related: {
      summary: [
        { label: "NDCs impacted", value: "112", note: "rebate class mapping" },
        { label: "Unmapped NDCs", value: "4%", note: "needs normalization patch" },
        { label: "Specialty share", value: "+11%", note: "QoQ" },
      ],
      transactions: Array.from({ length: 60 }).map((_, i) => ({
        row_id: `AE-10852-${i + 1}`,
        type: "RX" as const,
        member_id: `RXM-${200000 + i}`,
        claim_id: `RXC-${700000 + i}`,
        service_date: new Date(Date.now() - 1000 * 60 * 60 * 24 * (i % 60)).toISOString(),
        paid_amount: 220 + (i % 5) * 140,
        allowed_amount: 310 + (i % 5) * 160,
        payer: "Express Scripts",
        status: i % 10 === 0 ? "Unmapped NDC" : "Mapped",
        reason: i % 10 === 0 ? "NDC not normalized to 11-digit; rebate class unknown" : "Rebate below contractual floor trend",
        ledger: {
          header: [
            { label: "Claim ID", value: `RXC-${700000 + i}` },
            { label: "Member ID", value: `RXM-${200000 + i}` },
            { label: "Fill Date", value: new Date(Date.now() - 1000 * 60 * 60 * 24 * (i % 60)).toLocaleDateString() },
            { label: "Pharmacy", value: `Pharmacy #${1001 + (i % 15)}` },
          ],
          financial: [
            { label: "AWP", value: `$${(310 + (i % 5) * 160).toLocaleString()}` },
            { label: "Allowed Amount", value: `$${(310 + (i % 5) * 160).toLocaleString()}` },
            { label: "Paid Amount", value: `$${(220 + (i % 5) * 140).toLocaleString()}` },
            { label: "Expected Rebate", value: `$${(28 + (i % 5) * 18).toLocaleString()}` },
          ],
          mapping: [
            { label: "NDC", value: i % 10 === 0 ? `UNMAPPED-${i}` : `00024-${5500 + i}-01` },
            { label: "Drug Name", value: i % 3 === 0 ? "Specialty Drug A" : i % 3 === 1 ? "Specialty Drug B" : "Brand Drug C" },
            { label: "Rebate Class", value: i % 10 === 0 ? "UNKNOWN" : "SPECIALTY_TIER_1" },
            { label: "Formulary Tier", value: "SPECIALTY" },
          ],
          controls: [
            { label: "NDC Normalized", value: i % 10 === 0 ? "NO" : "YES" },
            { label: "Rebate Eligible", value: i % 10 === 0 ? "UNKNOWN" : "YES" },
            { label: "Contract Floor", value: "$32/script" },
            { label: "Actual Rebate", value: i % 10 === 0 ? "N/A" : `$${(24 + (i % 5) * 3).toLocaleString()}` },
          ],
          notes: i % 10 === 0
            ? "NDC requires normalization patch. Rebate class unknown; cannot validate guarantee compliance until mapping complete."
            : "Rebate captured but trending below contractual guarantee floor. Recommend vendor discussion.",
        },
      })),
    },

    realization: {
      owner: "Pharmacy Lead",
      forecast_value: 318_000,
      realized_value: 0,
      currency: "$",
      stage: "VALIDATED",
      milestones: [
        {
          stage: "IDENTIFIED",
          ts: new Date(Date.now() - 1000 * 60 * 138).toISOString(),
          actor: "events-engine",
          notes: "PBM rebate guarantee below floor; specialty mix shift detected",
        },
        {
          stage: "VALIDATED",
          ts: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
          actor: "pharmacy-analytics",
          notes: "NDC normalization gap identified (4%); forecast adjusted to $318K pending fix",
        },
        {
          stage: "SUBMITTED",
          ts: "",
          actor: "vendor-manager",
          notes: "Pending NDC fix completion before vendor submission",
        },
        {
          stage: "APPROVED",
          ts: "",
          actor: "pbm",
          notes: "Awaiting vendor governance meeting",
        },
        {
          stage: "RECOVERED",
          ts: "",
          actor: "finance",
          notes: "Annual true-up mechanism per contract Section 4.2",
        },
        {
          stage: "BOOKED",
          ts: "",
          actor: "finance",
        },
        {
          stage: "CLOSED",
          ts: "",
          actor: "pharmacy-lead",
        },
      ],
      risks: [
        {
          label: "NDC normalization incomplete",
          severity: "MED",
          mitigation: "4% of rows unmapped; evidence receipt not VERIFIED until fix complete",
        },
        {
          label: "Specialty trend acceleration",
          severity: "HIGH",
          mitigation: "+11% QoQ specialty share increases exposure; forecast may be conservative",
        },
        {
          label: "Vendor negotiation timeline",
          severity: "LOW",
          mitigation: "Year-end true-up window closes in 21 days; early submission critical",
        },
      ],
    },
  },

  {
    event_id: "AE-10877",
    title: "Specialty Drug AWP-to-Actual Variance Exceeds Contract Tolerance",
    category: "Pharmacy Pricing",
    severity: "HIGH",
    status: "NEW",
    detected_at: new Date(Date.now() - 1000 * 60 * 220).toISOString(),
    payer: "CVS Caremark",
    employer: "Kincaid Demo Manufacturing (2,430 lives)",

    score: {
      rank: 3,
      confidence: 0.91,
      time_sensitivity: 0.71,
      delta_value: 890_000,
      formula:
        "rank_score = (delta_value × confidence × time_sensitivity); high confidence due to contract language + deterministic NDC pricing join",
    },

    narrative: {
      executive_summary:
        "We detected paid specialty drug claims where the AWP discount percentage applied is outside the contractual tolerance band (AWP-18% ±2%). This indicates either a pricing file version mismatch or a formulary exception approval process that bypasses contract enforcement.",
      why_it_matters:
        "Specialty represents 2% of scripts but 38% of Rx spend. A 3-point AWP variance on specialty is material and compounds quarterly. This is a vendor accountability issue and a contract enforcement gap.",
      what_changed:
        "New specialty drugs added to formulary in Q4 without corresponding pricing rules. PBM pricing file shows 'list price' fallback for 8 high-utilization NDCs.",
      scope:
        "Applies to specialty tier claims. 14 NDCs identified; 89 member-months impacted; concentrated in oncology and immunology classes.",
    },

    kpis: [
      { label: "Overpaid (90d)", value: "$223,000", note: "Above contract pricing" },
      { label: "Annualized Delta", value: "$890,000", note: "If trend continues" },
      { label: "NDCs Affected", value: "14", note: "High-cost specialty" },
      { label: "Member-Months", value: "89", note: "Unique utilization" },
      { label: "Avg Variance", value: "AWP-12%", note: "vs AWP-18% contract" },
      { label: "Confidence", value: "91%", note: "Deterministic contract join" },
    ],

    evidence: {
      receipt_id: "ER-RX-2026-01-28-00011",
      verified: true,
      confidence: 0.91,
      freshness_minutes: 18,
      owner: "Pharmacy Analytics Lead",
      source_system: "Snowflake",
      source_artifact_hash: "sha256:4e8a...d2c9",
      transform_hash: "sha256:7b3f...a891",
      dq_tests: [
        { name: "NDC present and normalized", pass: true },
        { name: "Contract pricing table loaded for period", pass: true },
        { name: "AWP reference file freshness < 7 days", pass: true },
        { name: "Claim-to-contract join coverage > 95%", pass: true },
        { name: "Pricing variance calculation validated", pass: true },
      ],
      lineage: [
        { node: "RAW.PBM_RX_CLAIMS", kind: "TABLE", ref: "pbm/rx_claims" },
        { node: "REF.AWP_PRICING", kind: "TABLE", ref: "awp_reference_v2" },
        { node: "REF.PBM_CONTRACT_PRICING", kind: "TABLE", ref: "contract_pricing_rules" },
        { node: "CURATED.RX_PRICING_VARIANCE", kind: "VIEW", ref: "pricing_variance_v1" },
        { node: "MART.ARBITRAGE_EVENTS_RX", kind: "TABLE", ref: "event_builder_v3" },
      ],
    },

    model: {
      baseline_cost: 8_920_000,
      expected_cost: 8_030_000,
      delta_value: 890_000,
      units: "$/year",
      assumptions: [
        { key: "AWP contract guarantee", value: "AWP-18% ±2% tolerance" },
        { key: "Specialty mix", value: "38% of total Rx spend" },
        { key: "Recovery mechanism", value: "Quarterly true-up per contract Section 4.2" },
        { key: "NDC coverage assumption", value: "99% coverage post-fix" },
      ],
      sensitivity: [
        { variable: "Specialty utilization trend", low: 620_000, base: 890_000, high: 1_240_000 },
        { variable: "AWP variance magnitude", low: 710_000, base: 890_000, high: 1_180_000 },
        { variable: "Recovery rate", low: 490_000, base: 890_000, high: 890_000 },
      ],
    },

    packet: {
      recommended_owner: "Pharmacy Lead + PBM Vendor Manager",
      actions: [
        {
          step: "Generate detailed variance report by NDC with contract reference",
          system: "Snowflake",
          due_in_days: 2,
          rationale: "Creates audit-ready packet for vendor discussion.",
        },
        {
          step: "Submit pricing variance dispute to PBM with contractual true-up request",
          system: "PBM Vendor Portal",
          due_in_days: 7,
          rationale: "Quarterly true-up window closes in 21 days; early submission improves recovery.",
        },
        {
          step: "Implement automated pricing variance monitoring dashboard",
          system: "App + Alerting",
          due_in_days: 14,
          rationale: "Prevent recurrence; make control measurable and real-time.",
        },
      ],
      artifacts: [
        { name: "Pricing Variance Report (CSV)", type: "LINK", value: "app://artifact/AE-10877/variance.csv" },
        { name: "Contract Section 4.2 (Pricing)", type: "PDF", value: "app://artifact/AE-10877/contract_42.pdf" },
        { name: "Vendor Dispute Letter Draft", type: "LINK", value: "app://artifact/AE-10877/dispute_draft" },
        { name: "Detection SQL", type: "SQL", value: "app://artifact/AE-10877/detect.sql" },
      ],
    },

    audit_log: [
      {
        ts: new Date(Date.now() - 1000 * 60 * 218).toISOString(),
        actor: "events-engine",
        action: "Event created from specialty pricing variance monitor",
        notes: "Detected AWP variance outside contract tolerance for 14 NDCs",
      },
      {
        ts: new Date(Date.now() - 1000 * 60 * 205).toISOString(),
        actor: "dq-gate",
        action: "Evidence receipt VERIFIED",
        notes: "All DQ tests passed; contract pricing join validated",
      },
    ],

    sql: {
      detection_query: `-- Detect specialty drug AWP variance outside contract tolerance
SELECT
  c.ndc,
  c.drug_name,
  COUNT(DISTINCT c.claim_id) AS claim_count,
  SUM(c.paid_amount) AS total_paid,
  AVG(a.awp_unit_price) AS avg_awp,
  AVG(c.paid_amount / c.quantity) AS avg_paid_per_unit,
  AVG((a.awp_unit_price - (c.paid_amount / c.quantity)) / a.awp_unit_price) AS avg_discount_pct,
  p.contract_discount_pct,
  (AVG((a.awp_unit_price - (c.paid_amount / c.quantity)) / a.awp_unit_price) - p.contract_discount_pct) AS variance
FROM RAW.PBM_RX_CLAIMS c
JOIN REF.AWP_PRICING a ON a.ndc = c.ndc
JOIN REF.PBM_CONTRACT_PRICING p ON p.drug_class = 'SPECIALTY'
WHERE c.service_date >= DATEADD(day, -90, CURRENT_DATE())
  AND c.drug_tier = 'SPECIALTY'
GROUP BY 1, 2, p.contract_discount_pct
HAVING ABS(variance) > 0.02;`,
      validation_query: `-- Validate specialty spend distribution
SELECT
  drug_tier,
  COUNT(DISTINCT claim_id) AS script_count,
  SUM(paid_amount) AS total_spend,
  (SUM(paid_amount) / (SELECT SUM(paid_amount) FROM RAW.PBM_RX_CLAIMS WHERE service_date >= DATEADD(day, -90, CURRENT_DATE()))) AS pct_of_total_spend
FROM RAW.PBM_RX_CLAIMS
WHERE service_date >= DATEADD(day, -90, CURRENT_DATE())
GROUP BY 1
ORDER BY 3 DESC;`,
    },

    related: {
      summary: [
        { label: "NDCs Affected", value: "14", note: "High-cost specialty" },
        { label: "Member-Months", value: "89", note: "Unique utilization" },
        { label: "Avg Variance", value: "AWP-12%", note: "vs AWP-18% contract" },
      ],
      transactions: Array.from({ length: 89 }).map((_, i) => ({
        row_id: `AE-10877-${i + 1}`,
        type: "RX" as const,
        member_id: `SPEC-${300000 + i}`,
        claim_id: `SPEC-${800000 + i}`,
        service_date: new Date(Date.now() - 1000 * 60 * 60 * 24 * (i % 89)).toISOString(),
        paid_amount: 4200 + (i % 8) * 1800,
        allowed_amount: 5100 + (i % 8) * 2200,
        payer: "CVS Caremark",
        status: i % 6 === 0 ? "High Variance" : "Moderate Variance",
        reason: i % 6 === 0 ? "AWP discount below contract floor by >4 points" : "AWP discount variance 2-4 points",
        ledger: {
          header: [
            { label: "Claim ID", value: `SPEC-${800000 + i}` },
            { label: "Member ID", value: `SPEC-${300000 + i}` },
            { label: "Fill Date", value: new Date(Date.now() - 1000 * 60 * 60 * 24 * (i % 89)).toLocaleDateString() },
            { label: "Pharmacy", value: `Specialty Pharmacy ${(i % 3) + 1}` },
          ],
          financial: [
            { label: "AWP", value: `$${(5100 + (i % 8) * 2200).toLocaleString()}` },
            { label: "Contract Price", value: `$${Math.round((5100 + (i % 8) * 2200) * 0.82).toLocaleString()}` },
            { label: "Actual Paid", value: `$${(4200 + (i % 8) * 1800).toLocaleString()}` },
            { label: "Overpayment", value: `$${((4200 + (i % 8) * 1800) - Math.round((5100 + (i % 8) * 2200) * 0.82)).toLocaleString()}` },
          ],
          mapping: [
            { label: "NDC", value: `00024-${6000 + (i % 14)}-01` },
            { label: "Drug Name", value: i % 3 === 0 ? "Oncology Drug A" : i % 3 === 1 ? "Immunology Drug B" : "Specialty Drug C" },
            { label: "Drug Class", value: i % 3 === 0 ? "ONCOLOGY" : i % 3 === 1 ? "IMMUNOLOGY" : "SPECIALTY_OTHER" },
            { label: "Formulary Status", value: "SPECIALTY_TIER" },
          ],
          controls: [
            { label: "Contract Discount", value: "AWP-18%" },
            { label: "Actual Discount", value: `AWP-${Math.round(12 + (i % 6))}%` },
            { label: "Variance", value: `${Math.round(6 - (i % 6))} points` },
            { label: "Tolerance", value: "±2 points" },
          ],
          notes: i % 6 === 0
            ? "Pricing variance exceeds contract tolerance significantly. High-priority recovery candidate with strong contract language support."
            : "Moderate pricing variance. Aggregate for quarterly true-up discussion with PBM.",
        },
      })),
    },

    realization: {
      owner: "Pharmacy Lead + PBM Vendor Manager",
      forecast_value: 890_000,
      realized_value: 0,
      currency: "$",
      stage: "VALIDATED",
      milestones: [
        {
          stage: "IDENTIFIED",
          ts: new Date(Date.now() - 1000 * 60 * 218).toISOString(),
          actor: "events-engine",
          notes: "AWP variance outside contract tolerance; 14 NDCs flagged",
        },
        {
          stage: "VALIDATED",
          ts: new Date(Date.now() - 1000 * 60 * 205).toISOString(),
          actor: "dq-gate",
          notes: "Evidence receipt VERIFIED; deterministic contract pricing join validated",
        },
        {
          stage: "SUBMITTED",
          ts: "",
          actor: "vendor-manager",
          notes: "Pending variance report generation and vendor submission (due in 7 days)",
        },
        {
          stage: "APPROVED",
          ts: "",
          actor: "pbm",
          notes: "Quarterly true-up per contract Section 4.2",
        },
        {
          stage: "RECOVERED",
          ts: "",
          actor: "finance",
          notes: "Credit memo expected within 30 days of approval",
        },
        {
          stage: "BOOKED",
          ts: "",
          actor: "finance",
        },
        {
          stage: "CLOSED",
          ts: "",
          actor: "pharmacy-lead",
        },
      ],
      risks: [
        {
          label: "Pricing file version dispute",
          severity: "MED",
          mitigation: "PBM may claim 'list price' fallback was documented; contract language review ready",
        },
        {
          label: "Quarterly true-up window",
          severity: "HIGH",
          mitigation: "Window closes in 21 days; late submission reduces recovery probability",
        },
        {
          label: "Specialty utilization growth",
          severity: "LOW",
          mitigation: "If specialty trend continues, forecast may be conservative (upside risk)",
        },
      ],
    },
  },

  {
    event_id: "AE-10903",
    title: "Network Adequacy Gap: Primary Care Access Desert in Zip 12345-12346",
    category: "Network / Access",
    severity: "MED",
    status: "ACTIONED",
    detected_at: new Date(Date.now() - 1000 * 60 * 380).toISOString(),
    payer: "UnitedHealthcare",
    employer: "Kincaid Demo Manufacturing (2,430 lives)",

    score: {
      rank: 4,
      confidence: 0.82,
      time_sensitivity: 0.58,
      delta_value: 220_000,
      formula:
        "rank_score = (delta_value × confidence × time_sensitivity); time_sensitivity moderate due to 6-month enrollment cycle lag",
    },

    narrative: {
      executive_summary:
        "We detected elevated out-of-network utilization for primary care services in zip codes 12345-12346. Root cause analysis indicates insufficient in-network PCP capacity (member-to-PCP ratio 3,200:1 vs 1,800:1 target).",
      why_it_matters:
        "OON utilization is 2.4x more expensive and creates member friction (balance billing, prior auth). This also signals a network adequacy issue that could trigger regulatory compliance review.",
      what_changed:
        "Two in-network primary care practices closed in Q3 2025; no network backfill occurred. Member concentration in affected zips increased 14% due to new hire location patterns.",
      scope:
        "Affects ~380 members in 2 zip codes. Primary care visits only; specialty access unaffected.",
    },

    kpis: [
      { label: "OON Utilization", value: "34%", note: "vs 12% network avg" },
      { label: "Cost Delta (12mo)", value: "$220,000", note: "OON premium" },
      { label: "Members Impacted", value: "380", note: "In affected zips" },
      { label: "PCP Ratio", value: "3,200:1", note: "vs 1,800:1 target" },
      { label: "Member Satisfaction", value: "6.2/10", note: "vs 8.1/10 avg" },
      { label: "Confidence", value: "82%", note: "Geographic + claims join" },
    ],

    evidence: {
      receipt_id: "ER-NETWORK-2026-01-28-00003",
      verified: true,
      confidence: 0.82,
      freshness_minutes: 42,
      owner: "Network Strategy Lead",
      source_system: "Snowflake",
      source_artifact_hash: "sha256:1d4c...8b2a",
      transform_hash: "sha256:5e7f...c3d1",
      dq_tests: [
        { name: "Member zip code populated", pass: true },
        { name: "Provider network status current", pass: true },
        { name: "Claims network flag accuracy > 95%", pass: true },
        { name: "Geographic distance calculations validated", pass: true },
      ],
      lineage: [
        { node: "RAW.MEMBER_DEMOGRAPHICS", kind: "TABLE", ref: "member_demo" },
        { node: "RAW.PAYER_CLAIMS_MEDICAL", kind: "TABLE", ref: "payer/claims/medical" },
        { node: "REF.PROVIDER_NETWORK", kind: "TABLE", ref: "network_directory" },
        { node: "CURATED.NETWORK_ADEQUACY", kind: "VIEW", ref: "network_adequacy_v2" },
        { node: "MART.ARBITRAGE_EVENTS_NETWORK", kind: "TABLE", ref: "event_builder_v3" },
      ],
    },

    model: {
      baseline_cost: 820_000,
      expected_cost: 600_000,
      delta_value: 220_000,
      units: "$/year",
      assumptions: [
        { key: "OON cost multiplier", value: "2.4x in-network equivalent" },
        { key: "Member retention assumption", value: "92% annual retention" },
        { key: "Network recruitment timeline", value: "6 months to operational" },
      ],
      sensitivity: [
        { variable: "OON cost multiplier", low: 140_000, base: 220_000, high: 310_000 },
        { variable: "Member concentration growth", low: 180_000, base: 220_000, high: 290_000 },
      ],
    },

    packet: {
      recommended_owner: "Network Strategy + Broker",
      actions: [
        {
          step: "Engage payer network development team with geographic gap analysis",
          system: "Payer Portal",
          due_in_days: 14,
          rationale: "Contractual network adequacy requirement; payer owns recruitment.",
        },
        {
          step: "Evaluate direct contracting or clinic partnership for affected zips",
          system: "Vendor / Partnership Team",
          due_in_days: 30,
          rationale: "Backstop if payer recruitment stalls; improves member experience.",
        },
        {
          step: "Implement member communication: nearest in-network PCPs + telehealth option",
          system: "Member Comms",
          due_in_days: 7,
          rationale: "Immediate member friction reduction while long-term fix is pursued.",
        },
      ],
      artifacts: [
        { name: "Geographic Gap Analysis (Map)", type: "PDF", value: "app://artifact/AE-10903/geo_map.pdf" },
        { name: "Member Communication Draft", type: "LINK", value: "app://artifact/AE-10903/comms_draft" },
        { name: "Network Adequacy Query", type: "SQL", value: "app://artifact/AE-10903/adequacy.sql" },
      ],
    },

    audit_log: [
      {
        ts: new Date(Date.now() - 1000 * 60 * 378).toISOString(),
        actor: "events-engine",
        action: "Event created from network adequacy monitor",
        notes: "PCP ratio threshold breached in 2 zips",
      },
      {
        ts: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
        actor: "network-lead",
        action: "Status changed: NEW → ACTIONED",
        notes: "Engaged payer network development; member comms scheduled",
      },
    ],

    sql: {
      detection_query: `-- Detect primary care access gaps by zip code
SELECT
  m.member_zip,
  COUNT(DISTINCT m.member_id) AS member_count,
  COUNT(DISTINCT CASE WHEN c.network_status = 'OON' THEN c.claim_id END) AS oon_claims,
  COUNT(DISTINCT c.claim_id) AS total_claims,
  (oon_claims / NULLIF(total_claims, 0)) AS oon_rate,
  (member_count / NULLIF(provider_count, 0)) AS member_per_pcp_ratio
FROM RAW.MEMBER_DEMOGRAPHICS m
LEFT JOIN RAW.PAYER_CLAIMS_MEDICAL c
  ON c.member_id = m.member_id
  AND c.service_category = 'PRIMARY_CARE'
  AND c.service_date >= DATEADD(day, -365, CURRENT_DATE())
LEFT JOIN (
  SELECT provider_zip, COUNT(*) AS provider_count
  FROM REF.PROVIDER_NETWORK
  WHERE provider_type = 'PCP' AND network_status = 'IN_NETWORK'
  GROUP BY 1
) p ON p.provider_zip = m.member_zip
GROUP BY m.member_zip, provider_count
HAVING oon_rate > 0.25 OR member_per_pcp_ratio > 2500;`,
      validation_query: `-- Validate provider network distribution
SELECT
  provider_zip,
  provider_type,
  network_status,
  COUNT(*) AS provider_count
FROM REF.PROVIDER_NETWORK
WHERE provider_type = 'PRIMARY_CARE'
  AND provider_zip IN ('12345', '12346')
GROUP BY 1, 2, 3;`,
    },

    related: {
      summary: [
        { label: "Members Affected", value: "380", note: "In affected zips" },
        { label: "OON Rate", value: "34%", note: "vs 12% network avg" },
        { label: "PCP Ratio", value: "3,200:1", note: "vs 1,800:1 target" },
      ],
      transactions: Array.from({ length: 120 }).map((_, i) => ({
        row_id: `AE-10903-${i + 1}`,
        type: "CLAIM" as const,
        member_id: `NET-${400000 + i}`,
        claim_id: `NET-${500000 + i}`,
        service_date: new Date(Date.now() - 1000 * 60 * 60 * 24 * (i % 120)).toISOString(),
        paid_amount: 180 + (i % 6) * 120,
        allowed_amount: 150 + (i % 6) * 90,
        vendor: i % 2 === 0 ? "Out-of-Network PCP" : "In-Network PCP (20mi away)",
        status: i % 2 === 0 ? "OON" : "INN - Distance",
        reason: i % 2 === 0 ? "No in-network PCP within 15 miles" : "Nearest in-network PCP 20+ miles away",
        ledger: {
          header: [
            { label: "Claim ID", value: `NET-${500000 + i}` },
            { label: "Member ID", value: `NET-${400000 + i}` },
            { label: "Service Date", value: new Date(Date.now() - 1000 * 60 * 60 * 24 * (i % 120)).toLocaleDateString() },
            { label: "Member Zip", value: i % 2 === 0 ? "12345" : "12346" },
          ],
          financial: [
            { label: "Billed Amount", value: `$${(250 + (i % 6) * 80).toLocaleString()}` },
            { label: "Allowed Amount", value: `$${(150 + (i % 6) * 90).toLocaleString()}` },
            { label: "Paid Amount", value: `$${(180 + (i % 6) * 120).toLocaleString()}` },
            { label: "Member Balance Bill", value: i % 2 === 0 ? `$${(70 + (i % 4) * 20).toLocaleString()}` : "$0" },
          ],
          mapping: [
            { label: "Provider", value: i % 2 === 0 ? `OON PCP ${i % 15}` : `INN PCP ${i % 8}` },
            { label: "Network Status", value: i % 2 === 0 ? "OUT-OF-NETWORK" : "IN-NETWORK" },
            { label: "Distance", value: i % 2 === 0 ? "3.2 miles" : "22.4 miles" },
            { label: "Procedure Code", value: `99${213 + (i % 3)}` },
          ],
          controls: [
            { label: "Network Adequacy", value: "FAILED" },
            { label: "PCP Count (15mi)", value: i % 2 === 0 ? "0" : "1" },
            { label: "Member-PCP Ratio", value: "3,200:1" },
            { label: "Cost Multiplier", value: i % 2 === 0 ? "2.4x" : "1.0x" },
          ],
          notes: i % 2 === 0
            ? "Member used out-of-network provider due to lack of in-network PCPs within reasonable distance. Network adequacy issue; payer responsibility per contract."
            : "Member traveled 20+ miles to nearest in-network PCP. Indicates network adequacy gap despite technical compliance.",
        },
      })),
    },

    realization: {
      owner: "Network Strategy Lead",
      forecast_value: 220_000,
      realized_value: 0,
      currency: "$",
      stage: "ACTIONED",
      milestones: [
        {
          stage: "IDENTIFIED",
          ts: new Date(Date.now() - 1000 * 60 * 378).toISOString(),
          actor: "events-engine",
          notes: "Network adequacy gap detected; 34% OON rate in affected zips",
        },
        {
          stage: "VALIDATED",
          ts: new Date(Date.now() - 1000 * 60 * 365).toISOString(),
          actor: "network-lead",
          notes: "PCP ratio 3,200:1 confirmed; contract adequacy requirement breached",
        },
        {
          stage: "SUBMITTED",
          ts: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
          actor: "network-lead",
          notes: "Payer network development engaged; member comms scheduled",
        },
        {
          stage: "APPROVED",
          ts: "",
          actor: "payer",
          notes: "Awaiting payer recruitment timeline (6-month SLA per contract)",
        },
        {
          stage: "RECOVERED",
          ts: "",
          actor: "network-lead",
          notes: "OON cost premium reduction tied to network recruitment completion",
        },
        {
          stage: "BOOKED",
          ts: "",
          actor: "finance",
          notes: "EBITDA impact realized over 12-month member retention cycle",
        },
        {
          stage: "CLOSED",
          ts: "",
          actor: "network-lead",
        },
      ],
      risks: [
        {
          label: "Payer recruitment timeline",
          severity: "HIGH",
          mitigation: "6-month SLA; evaluating direct contracting or clinic partnership as backstop",
        },
        {
          label: "Member attrition",
          severity: "MED",
          mitigation: "Member satisfaction 6.2/10 in affected zips; risk of enrollment loss if not addressed",
        },
        {
          label: "OON cost multiplier variance",
          severity: "LOW",
          mitigation: "Assumed 2.4x in-network; actual variance 2.1-2.7x depending on service mix",
        },
      ],
    },
  },
];