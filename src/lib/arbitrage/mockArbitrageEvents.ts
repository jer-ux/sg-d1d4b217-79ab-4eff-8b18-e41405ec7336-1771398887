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
  },
];