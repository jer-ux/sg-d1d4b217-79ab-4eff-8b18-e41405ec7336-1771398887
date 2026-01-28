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
        ts: new Date(Date.now() - 1000 * 60 * 43).toISOString(),
        actor: "System (Event Detection Engine)",
        action: "EVENT_CREATED",
        notes: "Auto-detected via scheduled SQL scan against eligibility × claims join",
      },
      {
        ts: new Date(Date.now() - 1000 * 60 * 38).toISOString(),
        actor: "Benefits Ops Lead",
        action: "STATUS_CHANGE: NEW → INVESTIGATING",
        notes: "Assigned to team; initial root-cause analysis in progress",
      },
      {
        ts: new Date(Date.now() - 1000 * 60 * 22).toISOString(),
        actor: "Benefits Ops Lead",
        action: "EVIDENCE_VERIFIED",
        notes: "Manually spot-checked 8 member cases; confirmed termination dates vs. paid claim dates",
      },
    ],

    sql: {
      detection_query: `-- Detection query: Eligibility Mismatch
SELECT 
  m.member_id,
  m.termination_date,
  c.claim_id,
  c.service_date,
  c.paid_amount,
  DATEDIFF(day, m.termination_date, c.service_date) AS days_post_term
FROM curated.eligibility_coverage_windows m
JOIN raw.payer_claims_medical c
  ON m.member_id = c.member_id
WHERE c.service_date > m.termination_date
  AND c.claim_status = 'PAID'
  AND c.service_date >= DATEADD(day, -90, CURRENT_DATE())
ORDER BY c.paid_amount DESC;`,
      validation_query: `-- Validation query: Confirm member term dates exist
SELECT COUNT(*) AS termed_members_with_null_term_date
FROM curated.eligibility_coverage_windows
WHERE coverage_status = 'TERMINATED'
  AND termination_date IS NULL;`,
    },
  },

  {
    event_id: "AE-10829",
    title: "PBM Rebate Guarantee Shortfall vs. Contract Terms",
    category: "PBM Contract Compliance",
    severity: "HIGH",
    status: "NEW",
    detected_at: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    payer: "CVS Caremark",
    employer: "Kincaid Demo Manufacturing (2,430 lives)",

    score: {
      rank: 2,
      confidence: 0.91,
      time_sensitivity: 0.65,
      delta_value: 580_000,
      formula:
        "rank_score = (delta_value × confidence × time_sensitivity); rebate guarantee is contractual, high confidence",
    },

    narrative: {
      executive_summary:
        "Actual rebate payments received from PBM are tracking 23% below the contractual guarantee floor for Q4 2025. This represents a direct cash shortfall that should trigger true-up or contract renegotiation.",
      why_it_matters:
        "PBM rebates are a material component of pharmacy spend attribution. If the guarantee is not enforced, the CFO's plan cost forecast becomes unreliable and finance cannot accurately attribute benefit cost drivers.",
      what_changed:
        "Q4 formulary changes shifted utilization toward non-rebatable specialty drugs; PBM did not proactively flag the guarantee miss or propose formulary adjustments to preserve rebate yield.",
      scope:
        "Impact concentrated in specialty tier; affects projected 2026 budget reconciliation. Shortfall is $145k in Q4; annualized exposure is $580k if trend continues.",
    },

    kpis: [
      { label: "Contractual Guarantee", value: "$2.47 PMPM", note: "Per member per month floor" },
      { label: "Actual Rebate (Q4)", value: "$1.90 PMPM", note: "23% below guarantee" },
      { label: "Shortfall (Q4)", value: "$145,000", note: "Quarterly variance" },
      { label: "Annualized Exposure", value: "$580,000", note: "If trend persists" },
      { label: "Confidence", value: "91%", note: "Contract terms + payment records verified" },
      { label: "Contract Review Due", value: "45 days", note: "Annual renewal window" },
    ],

    evidence: {
      receipt_id: "ER-PBM-2026-01-28-00018",
      verified: true,
      confidence: 0.91,
      freshness_minutes: 45,
      owner: "Pharmacy Benefits Manager",
      source_system: "Snowflake + Contract Vault",
      source_artifact_hash: "sha256:7c3e...d891",
      transform_hash: "sha256:4a1f...c2b7",
      dq_tests: [
        { name: "Rebate payment records complete for Q4", pass: true },
        { name: "Member months denominator matches enrollment", pass: true },
        { name: "Contract guarantee terms parsed correctly", pass: true },
        { name: "Specialty tier utilization within expected variance", pass: true },
      ],
      lineage: [
        { node: "RAW.PBM_REBATE_PAYMENTS", kind: "TABLE", ref: "pbm/rebate_payments" },
        { node: "RAW.CONTRACT_TERMS", kind: "TABLE", ref: "legal/contract_vault" },
        { node: "CURATED.PHARMACY_UTILIZATION", kind: "VIEW", ref: "dt_pharm_util" },
        { node: "MART.ARBITRAGE_EVENTS_PBM", kind: "TABLE", ref: "event_builder_v3" },
        { node: "APP.EVENTS_API", kind: "JOB", ref: "events_api_publish" },
      ],
    },

    model: {
      baseline_cost: 7_320_000,
      expected_cost: 6_740_000,
      delta_value: 580_000,
      units: "$/year",
      assumptions: [
        { key: "Member months", value: "29,160 (2,430 lives × 12 months)" },
        { key: "Contractual guarantee", value: "$2.47 PMPM" },
        { key: "Actual Q4 trend", value: "$1.90 PMPM" },
        { key: "Recovery mechanism", value: "True-up payment or formulary adjustment" },
      ],
      sensitivity: [
        { variable: "Specialty utilization trend", low: 320_000, base: 580_000, high: 840_000 },
        { variable: "PBM negotiation outcome", low: 410_000, base: 580_000, high: 720_000 },
        { variable: "Contract renewal terms", low: 290_000, base: 580_000, high: 1_020_000 },
      ],
    },

    packet: {
      recommended_owner: "Pharmacy Benefits Manager + Legal",
      actions: [
        {
          step: "Pull Q4 rebate guarantee clause from contract; validate interpretation with legal",
          system: "Contract Vault",
          due_in_days: 3,
          rationale: "Ensure contractual interpretation is accurate before engaging PBM.",
        },
        {
          step: "Submit formal variance notice to PBM; request true-up calculation + payment timeline",
          system: "PBM Portal",
          due_in_days: 7,
          rationale: "Contractual guarantee is enforceable; PBM must respond with reconciliation plan.",
        },
        {
          step: "Analyze formulary tier shifts; model impact of reverting specialty tier changes",
          system: "Snowflake",
          due_in_days: 10,
          rationale: "Quantify trade-off: rebate yield vs. member disruption from formulary changes.",
        },
      ],
      artifacts: [
        { name: "Contract Guarantee Clause (PDF)", type: "PDF", value: "app://artifact/AE-10829/contract.pdf" },
        { name: "Q4 Rebate Payment Summary (CSV)", type: "LINK", value: "app://artifact/AE-10829/rebates.csv" },
        { name: "Variance Letter Template", type: "PDF", value: "app://artifact/AE-10829/letter.pdf" },
        { name: "Detection SQL", type: "SQL", value: "app://artifact/AE-10829/detect.sql" },
      ],
    },

    audit_log: [
      {
        ts: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
        actor: "System (Event Detection Engine)",
        action: "EVENT_CREATED",
        notes: "Auto-detected via scheduled contract compliance scan",
      },
    ],

    sql: {
      detection_query: `-- Detection query: PBM Rebate Guarantee Shortfall
SELECT 
  DATE_TRUNC('quarter', payment_date) AS quarter,
  SUM(rebate_amount) / SUM(member_months) AS actual_pmpm,
  2.47 AS guaranteed_pmpm,
  (2.47 - (SUM(rebate_amount) / SUM(member_months))) * SUM(member_months) AS shortfall
FROM raw.pbm_rebate_payments
WHERE payment_date >= DATEADD(quarter, -1, CURRENT_DATE())
GROUP BY DATE_TRUNC('quarter', payment_date)
HAVING actual_pmpm < 2.47;`,
      validation_query: `-- Validation query: Confirm member months denominator
SELECT 
  DATE_TRUNC('quarter', month) AS quarter,
  SUM(member_count) AS member_months
FROM curated.enrollment_monthly
WHERE month >= DATEADD(quarter, -1, CURRENT_DATE())
GROUP BY DATE_TRUNC('quarter', month);`,
    },
  },

  {
    event_id: "AE-10827",
    title: "Duplicate Claim Payments Due to Payer System Bug",
    category: "Claims Processing Error",
    severity: "MED",
    status: "ACTIONED",
    detected_at: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
    payer: "UnitedHealthcare",
    employer: "Kincaid Demo Manufacturing (2,430 lives)",

    score: {
      rank: 3,
      confidence: 0.94,
      time_sensitivity: 0.55,
      delta_value: 320_000,
      formula:
        "rank_score = (delta_value × confidence × time_sensitivity); duplicate detection is deterministic, high confidence",
    },

    narrative: {
      executive_summary:
        "Payer system processed and paid identical claims twice due to a claim ID collision bug during a recent system upgrade. Claims were submitted once, but paid twice with different payment IDs.",
      why_it_matters:
        "This is direct overpayment that should be 100% recoverable. It also signals a payer system control gap that may affect other claim types or time periods.",
      what_changed:
        "Payer rolled out a new claim adjudication module in November 2025; bug introduced claim ID hashing collision for a subset of provider NPI + service date combinations.",
      scope:
        "42 duplicate payments detected across 11 providers; all are medical claims in the outpatient facility category. Recovery packet submitted; payer acknowledged.",
    },

    kpis: [
      { label: "Duplicate Payments (90d)", value: "$80,200", note: "Paid twice for same service" },
      { label: "Annualized Exposure", value: "$320,000", note: "If bug persists" },
      { label: "Claims Impacted", value: "42", note: "Unique claim IDs duplicated" },
      { label: "Recovery Likelihood", value: "High", note: "Payer acknowledged; 100% recoverable" },
      { label: "Confidence", value: "94%", note: "Deterministic duplicate detection" },
      { label: "Action Status", value: "Recovery Packet Submitted", note: "Awaiting payer response" },
    ],

    evidence: {
      receipt_id: "ER-DUP-2026-01-28-00017",
      verified: true,
      confidence: 0.94,
      freshness_minutes: 60,
      owner: "Claims Integrity Lead",
      source_system: "Snowflake",
      source_artifact_hash: "sha256:5d2a...f4e9",
      transform_hash: "sha256:8b7c...a1d3",
      dq_tests: [
        { name: "Claim ID uniqueness within payment window", pass: false, details: "42 duplicates" },
        { name: "Payment amount matching for duplicates", pass: true },
        { name: "Provider NPI + service date hash collision", pass: false, details: "Pattern detected" },
        { name: "Member eligibility valid for both payments", pass: true },
      ],
      lineage: [
        { node: "RAW.PAYER_CLAIMS_PAYMENTS", kind: "TABLE", ref: "payer/claims/payments" },
        { node: "CURATED.CLAIMS_DEDUPLICATION", kind: "VIEW", ref: "dt_claims_dedup" },
        { node: "MART.ARBITRAGE_EVENTS_CLAIMS", kind: "TABLE", ref: "event_builder_v3" },
        { node: "APP.EVENTS_API", kind: "JOB", ref: "events_api_publish" },
      ],
    },

    model: {
      baseline_cost: 4_200_000,
      expected_cost: 3_880_000,
      delta_value: 320_000,
      units: "$/year",
      assumptions: [
        { key: "Annualization window", value: "Trailing 90 days × 4.0 factor" },
        { key: "Recovery rate", value: "100% (payer acknowledged)" },
        { key: "Admin effort", value: "3.2 hrs per case average" },
        { key: "Payer response SLA", value: "30 days per contract" },
      ],
      sensitivity: [
        { variable: "Bug resolution timeline", low: 180_000, base: 320_000, high: 480_000 },
        { variable: "Recovery rate", low: 280_000, base: 320_000, high: 320_000 },
        { variable: "Detection window expansion", low: 320_000, base: 320_000, high: 560_000 },
      ],
    },

    packet: {
      recommended_owner: "Claims Integrity Lead",
      actions: [
        {
          step: "Submit recovery packet to payer for 42 duplicate payments",
          system: "Payer Portal",
          due_in_days: 0,
          rationale: "COMPLETED: Recovery packet submitted; awaiting payer response.",
        },
        {
          step: "Monitor payer system release notes for bug fix confirmation",
          system: "Payer Portal",
          due_in_days: 14,
          rationale: "Ensure bug is resolved to prevent future duplicates.",
        },
        {
          step: "Expand detection window to 180 days; rerun duplicate scan",
          system: "Snowflake",
          due_in_days: 7,
          rationale: "Quantify full exposure from bug introduction to present.",
        },
      ],
      artifacts: [
        { name: "Recovery Packet (CSV)", type: "LINK", value: "app://artifact/AE-10827/recovery.csv" },
        { name: "Duplicate Claim IDs (List)", type: "LINK", value: "app://artifact/AE-10827/claim_ids.csv" },
        { name: "Payer Acknowledgment Email", type: "PDF", value: "app://artifact/AE-10827/ack.pdf" },
        { name: "Detection SQL", type: "SQL", value: "app://artifact/AE-10827/detect.sql" },
      ],
    },

    audit_log: [
      {
        ts: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
        actor: "System (Event Detection Engine)",
        action: "EVENT_CREATED",
        notes: "Auto-detected via duplicate payment scan",
      },
      {
        ts: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
        actor: "Claims Integrity Lead",
        action: "STATUS_CHANGE: NEW → INVESTIGATING",
        notes: "Assigned to team; root-cause analysis in progress",
      },
      {
        ts: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
        actor: "Claims Integrity Lead",
        action: "STATUS_CHANGE: INVESTIGATING → ACTIONED",
        notes: "Recovery packet submitted to payer; awaiting response",
      },
    ],

    sql: {
      detection_query: `-- Detection query: Duplicate Claim Payments
SELECT 
  claim_id,
  member_id,
  provider_npi,
  service_date,
  paid_amount,
  payment_id,
  COUNT(*) OVER (PARTITION BY claim_id) AS payment_count
FROM raw.payer_claims_payments
WHERE payment_date >= DATEADD(day, -90, CURRENT_DATE())
  AND payment_count > 1
ORDER BY paid_amount DESC;`,
      validation_query: `-- Validation query: Confirm payment amount matching
SELECT 
  claim_id,
  COUNT(DISTINCT paid_amount) AS distinct_amounts
FROM raw.payer_claims_payments
WHERE payment_date >= DATEADD(day, -90, CURRENT_DATE())
GROUP BY claim_id
HAVING COUNT(*) > 1 AND distinct_amounts > 1;`,
    },
  },

  {
    event_id: "AE-10825",
    title: "Preventable ER Utilization Pattern in High-Cost Cohort",
    category: "Utilization Management",
    severity: "LOW",
    status: "NEW",
    detected_at: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
    payer: "Anthem",
    employer: "Kincaid Demo Manufacturing (2,430 lives)",

    score: {
      rank: 4,
      confidence: 0.68,
      time_sensitivity: 0.42,
      delta_value: 180_000,
      formula:
        "rank_score = (delta_value × confidence × time_sensitivity); preventable ER is probabilistic, moderate confidence",
    },

    narrative: {
      executive_summary:
        "A cohort of 14 high-cost members show repeated ER visits for conditions that are typically manageable in primary care or urgent care settings. This suggests a care navigation or access gap.",
      why_it_matters:
        "Preventable ER utilization is a leading driver of excess medical spend. It also signals member experience friction: if members can't access appropriate care, satisfaction and outcomes suffer.",
      what_changed:
        "Recent PCP network contraction in rural markets reduced same-day appointment availability; members defaulted to ER for acute but non-emergent needs.",
      scope:
        "14 members with 3+ preventable ER visits in 90 days; concentrated in 2 rural ZIP codes. Estimated avoidable cost: $45k in Q4; annualized exposure: $180k.",
    },

    kpis: [
      { label: "Preventable ER Visits (90d)", value: "47", note: "Acute but non-emergent" },
      { label: "Avoidable Cost (90d)", value: "$45,000", note: "ER - UC cost delta" },
      { label: "Annualized Exposure", value: "$180,000", note: "If pattern persists" },
      { label: "Members Impacted", value: "14", note: "High-frequency cohort" },
      { label: "Confidence", value: "68%", note: "Diagnosis code classification probabilistic" },
      { label: "PCP Access", value: "Constrained", note: "2 rural ZIPs affected" },
    ],

    evidence: {
      receipt_id: "ER-UTIL-2026-01-28-00016",
      verified: true,
      confidence: 0.68,
      freshness_minutes: 90,
      owner: "Utilization Management Lead",
      source_system: "Snowflake",
      source_artifact_hash: "sha256:3f8d...c5a2",
      transform_hash: "sha256:6e1b...d9f4",
      dq_tests: [
        { name: "ER visit diagnosis codes within NYU classification", pass: true },
        { name: "Member ZIP code valid", pass: true },
        { name: "PCP attribution current", pass: true },
        { name: "ER cost estimates within expected range", pass: true },
      ],
      lineage: [
        { node: "RAW.PAYER_CLAIMS_MEDICAL", kind: "TABLE", ref: "payer/claims/medical" },
        { node: "RAW.PROVIDER_NETWORK", kind: "TABLE", ref: "network/providers" },
        { node: "CURATED.UTILIZATION_PATTERNS", kind: "VIEW", ref: "dt_util_patterns" },
        { node: "MART.ARBITRAGE_EVENTS_UTIL", kind: "TABLE", ref: "event_builder_v3" },
        { node: "APP.EVENTS_API", kind: "JOB", ref: "events_api_publish" },
      ],
    },

    model: {
      baseline_cost: 820_000,
      expected_cost: 640_000,
      delta_value: 180_000,
      units: "$/year",
      assumptions: [
        { key: "ER visit cost", value: "$1,200 average" },
        { key: "Urgent care alternative cost", value: "$240 average" },
        { key: "Preventable classification", value: "NYU algorithm (moderate confidence)" },
        { key: "Intervention success rate", value: "45% (care navigation program)" },
      ],
      sensitivity: [
        { variable: "Intervention success rate", low: 90_000, base: 180_000, high: 270_000 },
        { variable: "PCP network expansion", low: 120_000, base: 180_000, high: 180_000 },
        { variable: "Member engagement", low: 140_000, base: 180_000, high: 220_000 },
      ],
    },

    packet: {
      recommended_owner: "Utilization Management Lead + Network Strategy",
      actions: [
        {
          step: "Enroll 14 high-frequency members in care navigation program",
          system: "Care Management Platform",
          due_in_days: 14,
          rationale: "Proactive outreach to connect members with appropriate care settings.",
        },
        {
          step: "Analyze PCP appointment availability in affected ZIP codes",
          system: "Network Analytics",
          due_in_days: 21,
          rationale: "Quantify access gap; inform network expansion strategy.",
        },
        {
          step: "Deploy member education campaign on urgent care vs. ER",
          system: "Member Portal + Email",
          due_in_days: 30,
          rationale: "Address knowledge gap; promote cost-effective care utilization.",
        },
      ],
      artifacts: [
        { name: "High-Frequency Member List (CSV)", type: "LINK", value: "app://artifact/AE-10825/members.csv" },
        { name: "ER Visit Detail (CSV)", type: "LINK", value: "app://artifact/AE-10825/visits.csv" },
        { name: "NYU Classification Logic", type: "PDF", value: "app://artifact/AE-10825/nyu.pdf" },
        { name: "Detection SQL", type: "SQL", value: "app://artifact/AE-10825/detect.sql" },
      ],
    },

    audit_log: [
      {
        ts: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
        actor: "System (Event Detection Engine)",
        action: "EVENT_CREATED",
        notes: "Auto-detected via utilization pattern analysis",
      },
    ],

    sql: {
      detection_query: `-- Detection query: Preventable ER Utilization
SELECT 
  member_id,
  COUNT(*) AS er_visits,
  SUM(CASE WHEN nyu_classification = 'Preventable' THEN 1 ELSE 0 END) AS preventable_visits,
  SUM(paid_amount) AS total_cost,
  SUM(CASE WHEN nyu_classification = 'Preventable' THEN paid_amount ELSE 0 END) AS preventable_cost
FROM curated.utilization_patterns
WHERE service_type = 'ER'
  AND service_date >= DATEADD(day, -90, CURRENT_DATE())
GROUP BY member_id
HAVING preventable_visits >= 3
ORDER BY preventable_cost DESC;`,
      validation_query: `-- Validation query: PCP network availability in affected ZIPs
SELECT 
  provider_zip,
  COUNT(DISTINCT provider_npi) AS pcp_count,
  SUM(member_count) AS members_in_zip
FROM raw.provider_network
WHERE provider_specialty = 'PRIMARY_CARE'
  AND provider_zip IN ('12345', '12346')
GROUP BY provider_zip;`,
    },
  },
];