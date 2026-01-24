# Snowflake → War Room Integration

## Overview

This guide shows how to automatically ingest events from Snowflake into the War Room using External Functions and Tasks.

**Architecture:**
```
Snowflake Tables → CDC Procedure → External Function → Vercel API → Redis → War Room SSE
```

**Key Features:**
- ✅ Change Data Capture (only send modified events)
- ✅ Delivery idempotency (hash-based deduplication)
- ✅ Automated scheduling (runs every 5 minutes)
- ✅ Delivery audit log (track all API calls)
- ✅ Secrets management (secure token storage)

---

## Step 1: Create Source Tables

```sql
-- Event storage table
CREATE OR REPLACE TABLE KIQ.WARROOM_EVENTS (
  EVENT_ID            STRING PRIMARY KEY,
  LANE                STRING,              -- value | controls | agentic | marketplace
  TITLE               STRING,
  SUBTITLE            STRING,
  AMOUNT              NUMBER(18,2),
  CONFIDENCE          FLOAT,
  TIME_SENSITIVITY    FLOAT,
  LEDGER_STATE        STRING,              -- IDENTIFIED | APPROVED | REALIZED | AT_RISK
  OWNER               STRING,
  UPDATED_AT          TIMESTAMP_NTZ,

  -- Evidence metadata
  SOURCE_SYSTEM       STRING,              -- snowflake, servicenow, databricks, etc.
  SOURCE_REF          STRING,              -- e.g., claim_batch_id, ticket_id, query_id
  RECEIPTS_JSON       VARIANT,             -- array of receipt objects

  -- CDC control (prevents duplicate deliveries)
  LAST_DELIVERED_AT   TIMESTAMP_NTZ,
  DELIVERY_HASH       STRING               -- SHA256 of last payload delivered
);

-- Delivery audit log
CREATE OR REPLACE TABLE KIQ.WARROOM_DELIVERY_LOG (
  EVENT_ID          STRING,
  DELIVERY_HASH     STRING,
  DELIVERED_AT      TIMESTAMP_NTZ,
  HTTP_STATUS       NUMBER,
  RESPONSE_SNIPPET  STRING,
  PRIMARY KEY (EVENT_ID, DELIVERY_HASH)
);

-- Index for CDC queries
CREATE INDEX IF NOT EXISTS IDX_WARROOM_EVENTS_UPDATED 
  ON KIQ.WARROOM_EVENTS(UPDATED_AT);
```

---

## Step 2: Create Network Rule (Egress Access)

```sql
-- Allow Snowflake to call your Vercel API
CREATE OR REPLACE NETWORK RULE KIQ_VERCEL_API_RULE
  MODE = EGRESS
  TYPE = HOST_PORT
  VALUE_LIST = ('your-domain.vercel.app:443');  -- Replace with your actual domain

-- Create external access integration
CREATE OR REPLACE EXTERNAL ACCESS INTEGRATION KIQ_VERCEL_EAI
  ALLOWED_NETWORK_RULES = (KIQ_VERCEL_API_RULE)
  ENABLED = TRUE;
```

---

## Step 3: Create Secret for Token Management

```sql
-- Store ingest token as Snowflake secret (run as ACCOUNTADMIN)
USE ROLE ACCOUNTADMIN;

CREATE OR REPLACE SECRET KIQ_INGEST_TOKEN_SECRET
  TYPE = GENERIC_STRING
  SECRET_STRING = 'YOUR_LONG_RANDOM_TOKEN';  -- Replace with token from: openssl rand -hex 32

-- Grant usage to service role
GRANT USAGE ON SECRET KIQ_INGEST_TOKEN_SECRET TO ROLE KIQ_SERVICE_ROLE;
```

**Generate Secure Token:**
```bash
# Generate 64-character token
openssl rand -hex 32

# Add to both Snowflake (above) and Vercel (.env.local)
KIQ_INGEST_TOKEN=your-generated-token
```

---

## Step 4: Create CDC Stored Procedure

This Python procedure implements change-data-capture logic with batching, secrets management, and comprehensive error handling.

```sql
CREATE OR REPLACE PROCEDURE KIQ.PUSH_WARROOM_EVENTS()
RETURNS VARIANT
LANGUAGE PYTHON
RUNTIME_VERSION = 3.11
PACKAGES = ('requests')
HANDLER = 'run'
EXTERNAL_ACCESS_INTEGRATIONS = (KIQ_VERCEL_EAI)
SECRETS = ('INGEST_TOKEN' = KIQ_INGEST_TOKEN_SECRET)
AS
$$
import json
import hashlib
import requests
from datetime import datetime, timezone

def _iso_now():
    return datetime.now(timezone.utc).isoformat().replace("+00:00","Z")

def _hash_payload(payload: dict) -> str:
    """Hash the payload to detect meaningful changes"""
    s = json.dumps(payload, sort_keys=True, separators=(",",":")).encode("utf-8")
    return hashlib.sha256(s).hexdigest()

def run(session):
    # Configure
    endpoint = "https://your-domain.vercel.app/api/war-room/ingest"  # UPDATE THIS
    token = session.get_secret("INGEST_TOKEN")
    batch_size = 50

    # Pull candidates: never delivered OR updated after last delivered
    rows = session.sql("""
        SELECT
          EVENT_ID, LANE, TITLE, SUBTITLE, AMOUNT, CONFIDENCE, TIME_SENSITIVITY,
          LEDGER_STATE, OWNER, UPDATED_AT, SOURCE_SYSTEM, SOURCE_REF, RECEIPTS_JSON,
          LAST_DELIVERED_AT, DELIVERY_HASH
        FROM KIQ.WARROOM_EVENTS
        WHERE LAST_DELIVERED_AT IS NULL
           OR UPDATED_AT > LAST_DELIVERED_AT
        ORDER BY UPDATED_AT DESC
        LIMIT 500
    """).collect()

    events_to_send = []
    meta = []

    # Build payloads and check if hash changed
    for r in rows:
        payload = {
            "id": r["EVENT_ID"],
            "lane": r["LANE"],
            "title": r["TITLE"],
            "subtitle": r["SUBTITLE"],
            "amount": float(r["AMOUNT"]) if r["AMOUNT"] is not None else 0.0,
            "confidence": float(r["CONFIDENCE"]) if r["CONFIDENCE"] is not None else 0.0,
            "timeSensitivity": float(r["TIME_SENSITIVITY"]) if r["TIME_SENSITIVITY"] is not None else 0.0,
            "state": r["LEDGER_STATE"],
            "owner": r["OWNER"],
            "updatedAt": r["UPDATED_AT"].isoformat() if r["UPDATED_AT"] else _iso_now(),
            "sourceSystem": r["SOURCE_SYSTEM"],
            "sourceRef": r["SOURCE_REF"],
            "receipts": r["RECEIPTS_JSON"] if r["RECEIPTS_JSON"] is not None else [],
            "packetStatus": "DRAFT",
            "packetSignatures": []
        }

        h = _hash_payload(payload)
        
        # Skip if hash unchanged (no meaningful changes)
        if r["DELIVERY_HASH"] == h:
            continue

        events_to_send.append(payload)
        meta.append((r["EVENT_ID"], h))

    sent = 0
    failures = []

    # Send in batches
    for i in range(0, len(events_to_send), batch_size):
        batch = events_to_send[i:i+batch_size]
        batch_meta = meta[i:i+batch_size]

        try:
            resp = requests.post(
                endpoint,
                headers={
                    "Content-Type": "application/json",
                    "x-kiq-ingest-token": token
                },
                data=json.dumps(batch),
                timeout=20
            )

            status = resp.status_code
            snippet = resp.text[:400] if resp.text else ""
            now = _iso_now()

            # Log every delivery attempt
            for (event_id, hsh) in batch_meta:
                session.sql("""
                    INSERT INTO KIQ.WARROOM_DELIVERY_LOG(
                        EVENT_ID, DELIVERY_HASH, DELIVERED_AT, HTTP_STATUS, RESPONSE_SNIPPET
                    )
                    VALUES(%s, %s, TO_TIMESTAMP_NTZ(%s), %s, %s)
                """, (event_id, hsh, now, status, snippet)).collect()

            # Update delivery markers only on success
            if 200 <= status < 300:
                sent += len(batch)
                for (event_id, hsh) in batch_meta:
                    session.sql("""
                        UPDATE KIQ.WARROOM_EVENTS
                        SET LAST_DELIVERED_AT = TO_TIMESTAMP_NTZ(%s),
                            DELIVERY_HASH = %s
                        WHERE EVENT_ID = %s
                    """, (now, hsh, event_id)).collect()
            else:
                failures.append({"status": status, "snippet": snippet})

        except Exception as e:
            failures.append({"error": str(e)})

    return {
        "ok": True,
        "attempted": len(events_to_send),
        "sent": sent,
        "failures": failures[:10]  # Return first 10 failures for debugging
    }
$$;
```

**Key Features:**
- **Secrets Management**: Token retrieved from Snowflake secrets (not hardcoded)
- **Smart CDC**: Hash-based comparison skips unchanged events
- **Batch Processing**: Sends up to 50 events per HTTP request
- **Comprehensive Logging**: Every attempt logged to `WARROOM_DELIVERY_LOG`
- **Error Handling**: Try/catch with detailed failure tracking
- **Idempotency**: `DELIVERY_HASH` prevents duplicate deliveries

### Test the Procedure

```sql
-- Manual test
CALL KIQ.PUSH_WARROOM_EVENTS();

-- Expected output
{
  "ok": true,
  "attempted": 12,
  "sent": 12,
  "failures": []
}
```

---

## Step 5: Create Scheduled Task

```sql
-- Run sync every 5 minutes
CREATE OR REPLACE TASK KIQ.WARROOM_DELIVERY_TASK
  WAREHOUSE = COMPUTE_WH            -- Replace with your warehouse name
  SCHEDULE = 'USING CRON */5 * * * * UTC'  -- Every 5 minutes
AS
  CALL KIQ.PUSH_WARROOM_EVENTS();

-- Enable the task
ALTER TASK KIQ.WARROOM_DELIVERY_TASK RESUME;

-- Check task history
SELECT *
FROM TABLE(INFORMATION_SCHEMA.TASK_HISTORY(
  TASK_NAME => 'WARROOM_DELIVERY_TASK',
  SCHEDULED_TIME_RANGE_START => DATEADD(hour, -24, CURRENT_TIMESTAMP())
))
ORDER BY SCHEDULED_TIME DESC;
```

---

## Step 6: Populate Sample Events

```sql
-- Example: PBM rebate guarantee shortfall
INSERT INTO KIQ.WARROOM_EVENTS (
  EVENT_ID,
  LANE,
  TITLE,
  SUBTITLE,
  AMOUNT,
  CONFIDENCE,
  TIME_SENSITIVITY,
  LEDGER_STATE,
  OWNER,
  UPDATED_AT,
  SOURCE_SYSTEM,
  SOURCE_REF,
  RECEIPTS_JSON
) VALUES (
  'EVT-PBM-001',
  'value',
  'PBM rebate guarantee shortfall',
  'Client ABC • Rx • Q4 true-up variance',
  340000.00,
  0.86,
  0.72,
  'IDENTIFIED',
  'alice@kiq.com',
  CURRENT_TIMESTAMP(),
  'snowflake',
  'query_xyz123',
  PARSE_JSON('[
    {
      "id": "rcpt-sf-001",
      "title": "Snowflake query evidence",
      "hash": "sha256:abc123...",
      "freshness": "PT5M",
      "url": null,
      "meta": {
        "query_id": "01b2c3d4-5678-90ab-cdef-123456789012",
        "warehouse": "COMPUTE_WH",
        "tables": ["KIQ.CLAIMS", "KIQ.CONTRACTS"]
      }
    }
  ]')
);

-- Example: High-risk control gap
INSERT INTO KIQ.WARROOM_EVENTS (
  EVENT_ID,
  LANE,
  TITLE,
  SUBTITLE,
  AMOUNT,
  CONFIDENCE,
  TIME_SENSITIVITY,
  LEDGER_STATE,
  OWNER,
  UPDATED_AT,
  SOURCE_SYSTEM,
  SOURCE_REF,
  RECEIPTS_JSON
) VALUES (
  'EVT-CTRL-001',
  'controls',
  'SoD violation detected in AP workflow',
  'Finance dept • 3 users can both create & approve invoices',
  0.00,
  0.92,
  0.88,
  'IDENTIFIED',
  'bob@kiq.com',
  CURRENT_TIMESTAMP(),
  'snowflake',
  'audit_report_2026_q1',
  PARSE_JSON('[]')
);

-- Trigger immediate delivery (don't wait for scheduled task)
CALL KIQ.PUSH_WARROOM_EVENTS();
```

---

## Step 7: Verify Integration

### A. Check Snowflake Delivery Log

```sql
SELECT
  EVENT_ID,
  DELIVERED_AT,
  HTTP_STATUS,
  RESPONSE_SNIPPET
FROM KIQ.WARROOM_DELIVERY_LOG
ORDER BY DELIVERED_AT DESC
LIMIT 10;
```

**Expected Output:**
```
EVENT_ID       | DELIVERED_AT           | HTTP_STATUS | RESPONSE_SNIPPET
---------------|------------------------|-------------|------------------
EVT-PBM-001    | 2026-01-24 15:35:00   | 200         | {"ok":true,"count":1}
EVT-CTRL-001   | 2026-01-24 15:35:01   | 200         | {"ok":true,"count":1}
```

### B. Check War Room UI

1. Navigate to **War Room** → **Value Lane**
2. You should see "PBM rebate guarantee shortfall" event
3. Click to open **Evidence Drawer**
4. Verify receipt shows Snowflake query metadata

### C. Test CDC (Change Detection)

```sql
-- Update an event
UPDATE KIQ.WARROOM_EVENTS
SET
  AMOUNT = 350000.00,  -- Increase amount
  UPDATED_AT = CURRENT_TIMESTAMP()
WHERE EVENT_ID = 'EVT-PBM-001';

-- Trigger sync
CALL KIQ.PUSH_WARROOM_EVENTS();

-- Verify new delivery was logged
SELECT * FROM KIQ.WARROOM_DELIVERY_LOG
WHERE EVENT_ID = 'EVT-PBM-001'
ORDER BY DELIVERED_AT DESC;
```

**Expected:** New delivery row with different `DELIVERY_HASH`

---

## Advanced Patterns

### Pattern 1: Derived Events from Analytics

```sql
-- Automatically create events from anomaly detection queries
INSERT INTO KIQ.WARROOM_EVENTS
SELECT
  'EVT-ANOM-' || ROW_NUMBER() OVER (ORDER BY variance DESC),
  'value',
  'Unexpected variance in ' || category,
  client_name || ' • ' || product_line || ' • ' || period,
  ABS(variance),
  confidence_score,
  urgency_score,
  'IDENTIFIED',
  'Unassigned',
  CURRENT_TIMESTAMP(),
  'snowflake',
  'anomaly_detection_v3',
  NULL,  -- No receipts yet
  NULL,  -- No delivery yet
  NULL   -- No hash yet
FROM (
  SELECT
    client_name,
    product_line,
    category,
    period,
    expected_value - actual_value AS variance,
    statistical_confidence AS confidence_score,
    time_sensitivity AS urgency_score
  FROM KIQ.ANOMALY_DETECTION_RESULTS
  WHERE
    ABS(expected_value - actual_value) > 100000  -- $100K+ variance only
    AND statistical_confidence > 0.80            -- High confidence
    AND detected_at > DATEADD(hour, -1, CURRENT_TIMESTAMP())  -- Fresh data only
)
ORDER BY variance DESC
LIMIT 50;  -- Top 50 anomalies
```

### Pattern 2: ServiceNow Ticket Integration

```sql
-- Mirror high-priority tickets into Controls lane
INSERT INTO KIQ.WARROOM_EVENTS
SELECT
  'EVT-SNW-' || sys_id,
  'controls',
  short_description,
  'Priority: ' || priority || ' • Assigned: ' || assigned_to,
  0.00,  -- No dollar amount for tickets
  CASE priority
    WHEN 1 THEN 0.95
    WHEN 2 THEN 0.85
    ELSE 0.70
  END AS confidence,
  CASE priority
    WHEN 1 THEN 0.90
    WHEN 2 THEN 0.75
    ELSE 0.50
  END AS time_sensitivity,
  'IDENTIFIED',
  COALESCE(assigned_to, 'Unassigned'),
  sys_updated_on,
  'servicenow',
  sys_id,
  PARSE_JSON('[]'),
  NULL,
  NULL
FROM SERVICENOW.INCIDENT
WHERE
  state IN ('New', 'In Progress')
  AND priority IN (1, 2)  -- Critical and High only
  AND sys_updated_on > DATEADD(hour, -6, CURRENT_TIMESTAMP());
```

### Pattern 3: Real-Time Streaming (via Snowpipe)

```sql
-- For sub-minute latency, use Snowpipe + immediate task trigger

-- Create stream on source table
CREATE OR REPLACE STREAM KIQ.WARROOM_EVENTS_STREAM
  ON TABLE KIQ.WARROOM_EVENTS;

-- Task triggers on stream changes
CREATE OR REPLACE TASK KIQ.SYNC_WARROOM_STREAM_TASK
  WAREHOUSE = COMPUTE_WH
  SCHEDULE = 'USING CRON */1 * * * * UTC'  -- Every minute
  WHEN SYSTEM$STREAM_HAS_DATA('KIQ.WARROOM_EVENTS_STREAM')
AS
  CALL KIQ.PUSH_WARROOM_EVENTS();

ALTER TASK KIQ.SYNC_WARROOM_STREAM_TASK RESUME;
```

---

## Security: Token Rotation

When rotating your ingest token:

```sql
-- 1. Generate new token (use: openssl rand -hex 32)

-- 2. Update Snowflake secret
CREATE OR REPLACE SECRET KIQ_INGEST_TOKEN_SECRET
  TYPE = GENERIC_STRING
  SECRET_STRING = 'NEW_TOKEN_HERE';

-- 3. Update Vercel environment variable
-- vercel env rm KIQ_INGEST_TOKEN production
-- vercel env add KIQ_INGEST_TOKEN production
-- (paste new token)

-- 4. Deploy Vercel
-- vercel --prod

-- 5. Test delivery
CALL KIQ.PUSH_WARROOM_EVENTS();

-- 6. Verify in delivery log
SELECT * FROM KIQ.WARROOM_DELIVERY_LOG
WHERE DELIVERED_AT > DATEADD('minute', -5, CURRENT_TIMESTAMP())
  AND HTTP_STATUS BETWEEN 200 AND 299;
```

**No procedure redeployment needed!** Token is read from secret at runtime.

---

## Monitoring & Debugging

### Check Recent Deliveries
```sql
SELECT 
  EVENT_ID,
  DELIVERY_HASH,
  DELIVERED_AT,
  HTTP_STATUS,
  RESPONSE_SNIPPET
FROM KIQ.WARROOM_DELIVERY_LOG
ORDER BY DELIVERED_AT DESC
LIMIT 50;
```

### Find Failed Deliveries
```sql
SELECT 
  EVENT_ID,
  HTTP_STATUS,
  RESPONSE_SNIPPET,
  DELIVERED_AT
FROM KIQ.WARROOM_DELIVERY_LOG
WHERE HTTP_STATUS NOT BETWEEN 200 AND 299
ORDER BY DELIVERED_AT DESC;
```

### Check Pending Events
```sql
-- Events that need delivery (never sent OR updated since last delivery)
SELECT 
  EVENT_ID,
  TITLE,
  AMOUNT,
  UPDATED_AT,
  LAST_DELIVERED_AT,
  DATEDIFF('minute', LAST_DELIVERED_AT, UPDATED_AT) AS minutes_since_update
FROM KIQ.WARROOM_EVENTS
WHERE LAST_DELIVERED_AT IS NULL
   OR UPDATED_AT > LAST_DELIVERED_AT
ORDER BY UPDATED_AT DESC;
```

### Delivery Success Rate
```sql
SELECT 
  DATE_TRUNC('hour', DELIVERED_AT) AS hour,
  COUNT(*) AS total_attempts,
  SUM(CASE WHEN HTTP_STATUS BETWEEN 200 AND 299 THEN 1 ELSE 0 END) AS successful,
  SUM(CASE WHEN HTTP_STATUS NOT BETWEEN 200 AND 299 THEN 1 ELSE 0 END) AS failed,
  ROUND(100.0 * successful / total_attempts, 2) AS success_rate_pct
FROM KIQ.WARROOM_DELIVERY_LOG
WHERE DELIVERED_AT > DATEADD('day', -7, CURRENT_TIMESTAMP())
GROUP BY 1
ORDER BY 1 DESC;
```

### Event Freshness (Time from creation to delivery)
```sql
SELECT 
  e.EVENT_ID,
  e.TITLE,
  e.UPDATED_AT AS event_updated,
  l.DELIVERED_AT,
  DATEDIFF('minute', e.UPDATED_AT, l.DELIVERED_AT) AS delivery_latency_minutes
FROM KIQ.WARROOM_EVENTS e
JOIN KIQ.WARROOM_DELIVERY_LOG l ON e.EVENT_ID = l.EVENT_ID
WHERE l.HTTP_STATUS BETWEEN 200 AND 299
  AND l.DELIVERED_AT > DATEADD('day', -1, CURRENT_TIMESTAMP())
ORDER BY delivery_latency_minutes DESC
LIMIT 100;
```

---

## Troubleshooting

### Issue: "Unauthorized ingest" errors in delivery log

**Cause**: Token mismatch between Snowflake secret and Vercel environment variable

**Solution**:
```sql
-- Check current secret (won't show actual value)
DESC SECRET KIQ_INGEST_TOKEN_SECRET;

-- Verify Vercel env: vercel env ls
-- Ensure they match, then redeploy: vercel --prod
```

### Issue: No events being delivered

**Cause**: All events already delivered (DELIVERY_HASH matches)

**Solution**:
```sql
-- Force re-delivery by clearing delivery markers
UPDATE KIQ.WARROOM_EVENTS
SET DELIVERY_HASH = NULL,
    LAST_DELIVERED_AT = NULL
WHERE EVENT_ID IN ('EVT-001', 'EVT-002');

-- Then run procedure
CALL KIQ.PUSH_WARROOM_EVENTS();
```

### Issue: Task not running

**Check task status**:
```sql
SHOW TASKS LIKE 'WARROOM_DELIVERY_TASK';

-- If suspended
ALTER TASK WARROOM_DELIVERY_TASK RESUME;
```

**Check task history**:
```sql
SELECT 
  NAME,
  STATE,
  SCHEDULED_TIME,
  COMPLETED_TIME,
  ERROR_CODE,
  ERROR_MESSAGE
FROM TABLE(INFORMATION_SCHEMA.TASK_HISTORY(
  TASK_NAME => 'WARROOM_DELIVERY_TASK',
  SCHEDULED_TIME_RANGE_START => DATEADD('hour', -24, CURRENT_TIMESTAMP())
))
ORDER BY SCHEDULED_TIME DESC
LIMIT 50;
```

### Issue: Slow procedure execution

**Optimize batch size**:
```python
# In procedure, adjust:
batch_size = 25  # Reduce if network latency is high
batch_size = 100 # Increase if latency is low and events are small
```

**Add index on UPDATED_AT**:
```sql
CREATE INDEX IF NOT EXISTS idx_warroom_events_updated 
ON KIQ.WARROOM_EVENTS(UPDATED_AT);
```

---

## Security Best Practices

### 1. Use Secrets (Not Hardcoded Tokens)

See `docs/snowflake-secrets-guide.md` for complete guide.

### 2. Rotate Tokens Regularly

Recommended: Every 90 days minimum.

### 3. Grant Minimal Permissions

```sql
-- Service role with minimal grants
CREATE ROLE IF NOT EXISTS KIQ_SERVICE_ROLE;

GRANT USAGE ON SECRET KIQ_INGEST_TOKEN_SECRET TO ROLE KIQ_SERVICE_ROLE;
GRANT USAGE ON PROCEDURE KIQ.PUSH_WARROOM_EVENTS() TO ROLE KIQ_SERVICE_ROLE;
GRANT SELECT, INSERT, UPDATE ON TABLE KIQ.WARROOM_EVENTS TO ROLE KIQ_SERVICE_ROLE;
GRANT INSERT ON TABLE KIQ.WARROOM_DELIVERY_LOG TO ROLE KIQ_SERVICE_ROLE;
```

### 4. Monitor Access Logs

```sql
-- Track procedure executions
SELECT 
  USER_NAME,
  ROLE_NAME,
  START_TIME,
  QUERY_TEXT
FROM SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY
WHERE QUERY_TEXT ILIKE '%PUSH_WARROOM_EVENTS%'
  AND START_TIME > DATEADD('day', -7, CURRENT_TIMESTAMP())
ORDER BY START_TIME DESC;
```

---

## Performance Tuning

### Batch Size Optimization

```python
# Small events (< 1KB): batch_size = 100
# Medium events (1-5KB): batch_size = 50
# Large events (> 10KB): batch_size = 10
```

### Task Scheduling

```sql
# High-frequency (every minute, for real-time alerts)
ALTER TASK KIQ.WARROOM_DELIVERY_TASK
  SET SCHEDULE = 'USING CRON */1 * * * * UTC';

# Low-frequency (every 30 minutes, for bulk analytics)
ALTER TASK KIQ.WARROOM_DELIVERY_TASK
  SET SCHEDULE = 'USING CRON */30 * * * * UTC';

# Business hours only (9 AM - 6 PM weekdays)
ALTER TASK KIQ.WARROOM_DELIVERY_TASK
  SET SCHEDULE = 'USING CRON 0 9-18 * * 1-5 UTC';
```

---

## Next Steps

1. **Add More Event Sources:**
   - Databricks notebooks → Marketplace lane
   - Google Sheets → Value lane
   - Salesforce opportunities → Value lane

2. **Enhance Receipt Generation:**
   - Auto-attach query results as PDFs
   - Link to Snowflake query history UI
   - Include row-level evidence samples

3. **Build Feedback Loop:**
   - Write War Room packet decisions back to Snowflake
   - Track realized savings vs. projections
   - Feed audit trails into compliance tables

4. **Add ML-Driven Prioritization:**
   - Train model on historical packet approvals
   - Auto-score confidence/urgency
   - Route events to appropriate owners

---

## Support

For integration issues:
- Check Snowflake task history: `TABLE(INFORMATION_SCHEMA.TASK_HISTORY(...))`
- Check Vercel logs: `vercel logs --follow`
- Review delivery log: `SELECT * FROM KIQ.WARROOM_DELIVERY_LOG`

For security questions:
- Token rotation: Every 90 days minimum
- Secrets management: See `docs/snowflake-secrets-guide.md`
- Access control: Grant minimal permissions to service role

**Status: Production-Ready** ✅