# Value Ledger ↔ Snowflake Integration Guide

## Overview

The **Verified Savings Ledger** in Kincaid IQ is backed by Snowflake's `KINCAID_IQ.LINEAGE` schema, which provides:
- Cryptographic evidence receipts
- Artifact lineage tracking
- Transform registration and execution
- DQ test execution and results
- Reconciliation check storage

This document shows how the Snowflake backend generates the receipts that power the Value Ledger UI.

---

## Architecture Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    INGESTION & PROCESSING                        │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  1. INGEST ARTIFACTS                                            │
│     INSERT INTO KINCAID_IQ.LINEAGE.ARTIFACTS                    │
│     → artifact_id (UUID)                                        │
│     → source, type, hash, metadata                              │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  2. REGISTER TRANSFORMS                                         │
│     CALL KINCAID_IQ.LINEAGE.REGISTER_TRANSFORM(...)            │
│     → transform_id (UUID)                                       │
│     → transform logic, version, inputs/outputs                  │
└─────────────────────────────────────────────────────────────────┐
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  3. RUN DQ TESTS                                                │
│     SET dq_run_id = CALL RUN_CORE3_DQ()                        │
│     → Executes all registered DQ tests                          │
│     → Returns dq_run_id for linking                             │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  4. CREATE EVIDENCE RECEIPT                                     │
│     INSERT INTO KINCAID_IQ.LINEAGE.EVIDENCE_RECEIPTS           │
│     → Links artifacts, transforms, DQ results                   │
│     → Generates cryptographic signature                         │
│     → Sets confidence score & verification status               │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                  VALUE LEDGER UI (Frontend)                     │
│     Displays receipts, DQ tests, reconciliation results         │
└─────────────────────────────────────────────────────────────────┘
```

---

## SQL Implementation Example

### Step 1: Ingest Source Artifacts

```sql
-- Insert raw data artifacts (claims, invoices, etc.)
INSERT INTO KINCAID_IQ.LINEAGE.ARTIFACTS (
  artifact_id,
  source_system,
  artifact_type,
  content_hash,
  uploaded_at,
  metadata
)
VALUES (
  'artifact-uuid-1',
  'PBM_PORTAL',
  'REBATE_INVOICE',
  'sha256:abc123...',
  CURRENT_TIMESTAMP(),
  OBJECT_CONSTRUCT(
    'file_name', 'Q1_2026_Rebates.pdf',
    'file_size_mb', 2.4,
    'vendor', 'OptumRx'
  )
);
```

### Step 2: Register Transform Logic

```sql
-- Register a transformation (e.g., calculate PMPM)
CALL KINCAID_IQ.LINEAGE.REGISTER_TRANSFORM(
  'transform-uuid-1',
  'CALCULATE_PMPM',
  'v2.1.0',
  $$
    SELECT 
      employer_id,
      month,
      SUM(total_cost) / SUM(member_months) AS cost_pmpm
    FROM staging.claims
    GROUP BY 1, 2
  $$,
  ARRAY_CONSTRUCT('artifact-uuid-1', 'artifact-uuid-2')  -- input artifacts
);
```

### Step 3: Run DQ Tests

```sql
-- Execute all registered DQ tests
SET dq_run_id = (CALL KINCAID_IQ.LINEAGE.RUN_CORE3_DQ());

-- This runs tests like:
--   • Completeness checks (null rates < 1%)
--   • Freshness checks (data < 48h old)
--   • Distribution checks (PMPM within expected range)
--   • Reconciliation checks (totals match source)
```

### Step 4: Create Evidence Receipt

```sql
-- Generate cryptographic receipt for the KPI
INSERT INTO KINCAID_IQ.LINEAGE.EVIDENCE_RECEIPTS (
  subject_type,
  subject_id,
  subject_period_start,
  subject_period_end,
  grain,
  artifact_ids,
  transform_ids,
  dq_run_id,
  freshness_ts,
  confidence_score,
  verification_status,
  owner,
  approver
)
VALUES (
  'KPI',                              -- Subject type
  'KPI_TOTAL_COST_PMPM',             -- KPI identifier
  '2026-01-01'::DATE,                -- Period start
  '2026-01-31'::DATE,                -- Period end
  'employer_month',                   -- Grain level
  ARRAY_CONSTRUCT(                    -- Source artifacts
    'artifact-uuid-1',
    'artifact-uuid-2'
  ),
  ARRAY_CONSTRUCT(                    -- Applied transforms
    'transform-uuid-1',
    'transform-uuid-2'
  ),
  $dq_run_id,                        -- DQ test run reference
  CURRENT_TIMESTAMP(),                -- Freshness timestamp
  0.92,                              -- Confidence score (0-1)
  'VERIFIED',                         -- Status: DRAFT|PENDING|VERIFIED|DISPUTED
  'benefits_finance_lead',            -- Owner
  'cfo'                              -- Approver
);
```

---

## Evidence Receipt Schema

```sql
CREATE TABLE KINCAID_IQ.LINEAGE.EVIDENCE_RECEIPTS (
  -- Identity
  receipt_id          STRING PRIMARY KEY,
  created_at          TIMESTAMP_NTZ DEFAULT CURRENT_TIMESTAMP(),
  
  -- Subject (what is being receipted)
  subject_type        STRING,           -- 'KPI', 'METRIC', 'CLAIM', 'SAVINGS'
  subject_id          STRING,           -- Unique identifier
  subject_period_start DATE,
  subject_period_end   DATE,
  grain               STRING,           -- 'employer_month', 'member_day', etc.
  
  -- Lineage
  artifact_ids        ARRAY,            -- Source data artifacts
  transform_ids       ARRAY,            -- Applied transformations
  dq_run_id          STRING,            -- DQ test run reference
  
  -- Quality Metadata
  freshness_ts        TIMESTAMP_NTZ,
  confidence_score    FLOAT,            -- 0.0 to 1.0
  verification_status STRING,           -- DRAFT|PENDING|VERIFIED|DISPUTED
  
  -- Approval Workflow
  owner              STRING,
  approver           STRING,
  approved_at        TIMESTAMP_NTZ,
  
  -- Cryptographic Signature
  signature_hash     STRING,            -- SHA-256 of canonical receipt JSON
  signature_ts       TIMESTAMP_NTZ
);
```

---

## Value Ledger Entry Creation

Once an Evidence Receipt is created in Snowflake, it flows to the Value Ledger:

```typescript
// Backend API (Next.js) queries Snowflake
const receipt = await snowflake.query(`
  SELECT 
    receipt_id,
    subject_id,
    subject_period_start,
    subject_period_end,
    confidence_score,
    verification_status,
    artifact_ids,
    dq_run_id
  FROM KINCAID_IQ.LINEAGE.EVIDENCE_RECEIPTS
  WHERE subject_id = 'KPI_TOTAL_COST_PMPM'
`);

// Transform to Ledger Entry
const ledgerEntry: LedgerEntry = {
  id: receipt.receipt_id,
  title: "Total Cost PMPM - January 2026",
  amount: 485.32,  // From KPI value
  category: "actuarial-validation",
  state: receipt.verification_status.toLowerCase(),
  receipts: [{
    id: receipt.receipt_id,
    type: "source-artifact",
    hash: receipt.signature_hash,
    timestamp: receipt.created_at,
    confidence: receipt.confidence_score
  }],
  dqTests: await fetchDQTests(receipt.dq_run_id),
  reconciliation: await fetchReconChecks(receipt.dq_run_id),
  externalSources: await fetchExternalSources(receipt.artifact_ids)
};
```

---

## Key Benefits

### 1. **Immutable Audit Trail**
- Every receipt is cryptographically signed
- Changes tracked via `EVIDENCE_RECEIPTS_HISTORY` table
- Full lineage from raw artifact → transform → KPI

### 2. **Automated DQ Validation**
- DQ tests run before receipt creation
- Failed tests block verification
- Confidence score computed from test results

### 3. **Finance-Grade Reconciliation**
- Every receipt links to source artifacts
- Transform logic is versioned and auditable
- Reconciliation checks validate totals match sources

### 4. **Approval Workflow**
- Owner/approver assignment
- State transitions: DRAFT → PENDING → VERIFIED
- Dispute handling with root cause tracking

---

## Integration with Value Ledger UI

The Value Ledger UI (`/ledger`) displays:

1. **Evidence Receipts** tab
   - Shows all receipts linked to entry
   - Displays signature hash, timestamp, confidence score
   - Links to source artifacts

2. **DQ Tests** tab
   - Queries `KINCAID_IQ.LINEAGE.DQ_TEST_RESULTS` by `dq_run_id`
   - Shows PASS/WARN/FAIL status for each test
   - Displays test parameters and actual values

3. **Reconciliation** tab
   - Queries reconciliation checks from DQ run
   - Shows expected vs actual values
   - Highlights variances and deltas

4. **External Sources** tab
   - Links to external artifacts (SEC filings, vendor docs)
   - Provides context for truth claims
   - Supports link-out to authoritative sources

---

## Example: Complete Flow for Rebate Savings

```sql
-- 1. Ingest rebate invoice
INSERT INTO ARTIFACTS VALUES (
  'artifact-rebate-2026q1',
  'OPTUM_PORTAL',
  'PDF_INVOICE',
  'sha256:xyz789...',
  CURRENT_TIMESTAMP(),
  OBJECT_CONSTRUCT('amount_usd', 2450000)
);

-- 2. Register rebate calculation transform
CALL REGISTER_TRANSFORM(
  'transform-rebate-calc',
  'CALCULATE_NET_REBATE',
  'v1.0.0',
  $$ SELECT invoice_amount * 0.85 AS net_rebate $$,
  ARRAY_CONSTRUCT('artifact-rebate-2026q1')
);

-- 3. Run DQ tests
SET dq_run_id = (CALL RUN_CORE3_DQ());

-- 4. Create receipt for verified savings
INSERT INTO EVIDENCE_RECEIPTS (
  subject_type, subject_id,
  subject_period_start, subject_period_end,
  grain,
  artifact_ids, transform_ids, dq_run_id,
  freshness_ts, confidence_score, verification_status,
  owner, approver
)
VALUES (
  'SAVINGS', 'SAV_PBM_REBATE_2026Q1',
  '2026-01-01'::DATE, '2026-03-31'::DATE,
  'employer_quarter',
  ARRAY_CONSTRUCT('artifact-rebate-2026q1'),
  ARRAY_CONSTRUCT('transform-rebate-calc'),
  $dq_run_id,
  CURRENT_TIMESTAMP(),
  0.98,
  'VERIFIED',
  'pharmacy_lead',
  'cfo'
);

-- 5. Query for Value Ledger display
SELECT * FROM EVIDENCE_RECEIPTS 
WHERE subject_id = 'SAV_PBM_REBATE_2026Q1';
```

Result in UI:
- **Ledger Entry**: "PBM Rebate - Q1 2026" → $2,082,500
- **Evidence Receipt**: `sha256:xyz789...` (98% confidence)
- **DQ Tests**: 15/15 PASS
- **Reconciliation**: Invoice amount matches portal ($2,450,000)
- **External Source**: OptumRx Transparency Portal

---

## API Endpoints

### Create Ledger Entry from Receipt
```typescript
// POST /api/ledger/from-receipt
{
  "receipt_id": "receipt-uuid",
  "title": "PBM Rebate - Q1 2026",
  "amount": 2082500,
  "category": "pbm-rebates"
}
```

### Fetch DQ Results
```typescript
// GET /api/ledger/{id}/dq-tests
{
  "dq_run_id": "dq-run-uuid",
  "tests": [
    { "name": "Completeness Check", "status": "PASS" },
    { "name": "Freshness Check", "status": "PASS" }
  ]
}
```

### Fetch Reconciliation Checks
```typescript
// GET /api/ledger/{id}/reconciliation
{
  "checks": [
    {
      "name": "Invoice Total Match",
      "expected": 2450000,
      "actual": 2450000,
      "delta": 0,
      "status": "PASS"
    }
  ]
}
```

---

## Best Practices

1. **Always run DQ tests before creating receipts**
   - Ensures data quality before verification
   - Prevents low-confidence entries in ledger

2. **Version all transforms**
   - Enables audit trail of logic changes
   - Supports rollback if needed

3. **Link external sources when available**
   - SEC filings for market claims
   - Vendor portals for invoice validation
   - Regulatory databases for compliance

4. **Set appropriate confidence scores**
   - 0.95+ = High confidence (automated validation)
   - 0.85-0.95 = Medium confidence (some manual review)
   - <0.85 = Low confidence (requires approval)

5. **Use grain consistently**
   - Enables rollup to different aggregation levels
   - Supports drill-down in UI

---

## Monitoring & Alerts

```sql
-- Alert: Low confidence receipts
SELECT * FROM EVIDENCE_RECEIPTS
WHERE confidence_score < 0.85
  AND verification_status = 'VERIFIED'
  AND created_at > DATEADD(day, -7, CURRENT_DATE());

-- Alert: Stale drafts
SELECT * FROM EVIDENCE_RECEIPTS
WHERE verification_status = 'DRAFT'
  AND created_at < DATEADD(day, -30, CURRENT_DATE());

-- Alert: High variance reconciliation
SELECT * FROM DQ_TEST_RESULTS
WHERE test_type = 'RECONCILIATION'
  AND status = 'FAIL'
  AND created_at > DATEADD(day, -1, CURRENT_DATE());
```

---

## Summary

The Value Ledger is powered by a robust Snowflake backend that provides:
- ✅ Cryptographic evidence receipts
- ✅ Automated DQ validation
- ✅ Transform lineage tracking
- ✅ Finance-grade reconciliation
- ✅ Approval workflow state machine

This architecture ensures every dollar in the ledger is backed by auditable, verifiable evidence—delivering the trust finance teams require.