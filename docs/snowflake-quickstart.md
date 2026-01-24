# Snowflake Integration - Quick Start Guide

## 5-Minute Setup

Get Snowflake events flowing into your War Room in 5 steps.

---

## Prerequisites

- ✅ Snowflake account with ACCOUNTADMIN access
- ✅ Vercel project deployed
- ✅ War Room running at `https://yourdomain.vercel.app`

---

## Step 1: Generate Token (30 seconds)

```bash
# Generate secure 64-character token
openssl rand -hex 32

# Example output:
# a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456
```

**Save this token** - you'll need it twice (Snowflake + Vercel).

---

## Step 2: Configure Vercel (1 minute)

```bash
# Add token to Vercel environment
vercel env add KIQ_INGEST_TOKEN production
# Paste your token when prompted

# Deploy
vercel --prod
```

**Verify**:
```bash
vercel env ls
# Should show: KIQ_INGEST_TOKEN (production)
```

---

## Step 3: Setup Snowflake (2 minutes)

```sql
-- Run as ACCOUNTADMIN
USE ROLE ACCOUNTADMIN;

-- 1. Create schema (if not exists)
CREATE SCHEMA IF NOT EXISTS KIQ;

-- 2. Create tables
CREATE OR REPLACE TABLE KIQ.WARROOM_EVENTS (
  EVENT_ID            STRING PRIMARY KEY,
  LANE                STRING,
  TITLE               STRING,
  SUBTITLE            STRING,
  AMOUNT              NUMBER(18,2),
  CONFIDENCE          FLOAT,
  TIME_SENSITIVITY    FLOAT,
  LEDGER_STATE        STRING,
  OWNER               STRING,
  UPDATED_AT          TIMESTAMP_NTZ,
  SOURCE_SYSTEM       STRING,
  SOURCE_REF          STRING,
  RECEIPTS_JSON       VARIANT,
  LAST_DELIVERED_AT   TIMESTAMP_NTZ,
  DELIVERY_HASH       STRING
);

CREATE OR REPLACE TABLE KIQ.WARROOM_DELIVERY_LOG (
  EVENT_ID          STRING,
  DELIVERY_HASH     STRING,
  DELIVERED_AT      TIMESTAMP_NTZ,
  HTTP_STATUS       NUMBER,
  RESPONSE_SNIPPET  STRING,
  PRIMARY KEY (EVENT_ID, DELIVERY_HASH)
);

-- 3. Create network rule
CREATE OR REPLACE NETWORK RULE KIQ_VERCEL_API_RULE
  MODE = EGRESS
  TYPE = HOST_PORT
  VALUE_LIST = ('yourdomain.vercel.app:443');  -- ⚠️ UPDATE THIS

-- 4. Create external access integration
CREATE OR REPLACE EXTERNAL ACCESS INTEGRATION KIQ_VERCEL_EAI
  ALLOWED_NETWORK_RULES = (KIQ_VERCEL_API_RULE)
  ENABLED = TRUE;

-- 5. Store token as secret
CREATE OR REPLACE SECRET KIQ_INGEST_TOKEN_SECRET
  TYPE = GENERIC_STRING
  SECRET_STRING = 'PASTE_YOUR_TOKEN_HERE';  -- ⚠️ UPDATE THIS
```

---

## Step 4: Create Delivery Procedure (1 minute)

```sql
-- Copy-paste this entire block
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
    s = json.dumps(payload, sort_keys=True, separators=(",",":")).encode("utf-8")
    return hashlib.sha256(s).hexdigest()

def run(session):
    endpoint = "https://yourdomain.vercel.app/api/war-room/ingest"  # ⚠️ UPDATE THIS
    token = session.get_secret("INGEST_TOKEN")
    batch_size = 50

    rows = session.sql("""
        SELECT
          EVENT_ID, LANE, TITLE, SUBTITLE, AMOUNT, CONFIDENCE, TIME_SENSITIVITY,
          LEDGER_STATE, OWNER, UPDATED_AT, SOURCE_SYSTEM, SOURCE_REF, RECEIPTS_JSON,
          LAST_DELIVERED_AT, DELIVERY_HASH
        FROM KIQ.WARROOM_EVENTS
        WHERE LAST_DELIVERED_AT IS NULL OR UPDATED_AT > LAST_DELIVERED_AT
        ORDER BY UPDATED_AT DESC
        LIMIT 500
    """).collect()

    events_to_send = []
    meta = []

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
        if r["DELIVERY_HASH"] == h:
            continue

        events_to_send.append(payload)
        meta.append((r["EVENT_ID"], h))

    sent = 0
    failures = []

    for i in range(0, len(events_to_send), batch_size):
        batch = events_to_send[i:i+batch_size]
        batch_meta = meta[i:i+batch_size]

        try:
            resp = requests.post(
                endpoint,
                headers={"Content-Type": "application/json", "x-kiq-ingest-token": token},
                data=json.dumps(batch),
                timeout=20
            )

            status = resp.status_code
            snippet = resp.text[:400] if resp.text else ""
            now = _iso_now()

            for (event_id, hsh) in batch_meta:
                session.sql("""
                    INSERT INTO KIQ.WARROOM_DELIVERY_LOG(
                        EVENT_ID, DELIVERY_HASH, DELIVERED_AT, HTTP_STATUS, RESPONSE_SNIPPET
                    )
                    VALUES(%s, %s, TO_TIMESTAMP_NTZ(%s), %s, %s)
                """, (event_id, hsh, now, status, snippet)).collect()

            if 200 <= status < 300:
                sent += len(batch)
                for (event_id, hsh) in batch_meta:
                    session.sql("""
                        UPDATE KIQ.WARROOM_EVENTS
                        SET LAST_DELIVERED_AT = TO_TIMESTAMP_NTZ(%s), DELIVERY_HASH = %s
                        WHERE EVENT_ID = %s
                    """, (now, hsh, event_id)).collect()
            else:
                failures.append({"status": status, "snippet": snippet})

        except Exception as e:
            failures.append({"error": str(e)})

    return {"ok": True, "attempted": len(events_to_send), "sent": sent, "failures": failures[:10]}
$$;
```

---

## Step 5: Test Integration (30 seconds)

```sql
-- Insert test event
INSERT INTO KIQ.WARROOM_EVENTS (
  EVENT_ID, LANE, TITLE, SUBTITLE, AMOUNT,
  CONFIDENCE, TIME_SENSITIVITY, LEDGER_STATE, OWNER, UPDATED_AT,
  SOURCE_SYSTEM, SOURCE_REF, RECEIPTS_JSON
) VALUES (
  'EVT-TEST-001',
  'value',
  'Test event from Snowflake',
  'Quick start test • Should appear in War Room immediately',
  100000.00,
  0.90,
  0.75,
  'IDENTIFIED',
  'Unassigned',
  CURRENT_TIMESTAMP(),
  'snowflake',
  'quickstart_test',
  PARSE_JSON('[]')
);

-- Trigger delivery
CALL KIQ.PUSH_WARROOM_EVENTS();

-- Expected output:
-- {"ok": true, "attempted": 1, "sent": 1, "failures": []}
```

**Verify in War Room:**
1. Navigate to `https://yourdomain.vercel.app/war-room`
2. Click **Value** lane
3. See "Test event from Snowflake" appear in grid
4. ✅ Integration working!

---

## Optional: Enable Automatic Sync (30 seconds)

```sql
-- Sync every 5 minutes automatically
CREATE OR REPLACE TASK KIQ.WARROOM_DELIVERY_TASK
  WAREHOUSE = COMPUTE_WH  -- ⚠️ UPDATE to your warehouse name
  SCHEDULE = 'USING CRON */5 * * * * UTC'
AS
  CALL KIQ.PUSH_WARROOM_EVENTS();

-- Enable task
ALTER TASK KIQ.WARROOM_DELIVERY_TASK RESUME;

-- Verify task is running
SHOW TASKS LIKE 'WARROOM_DELIVERY_TASK';
-- STATE should be "started"
```

---

## 🎉 Done!

Your Snowflake → War Room pipeline is live!

**What happens now:**
- Every 5 minutes, Snowflake checks `WARROOM_EVENTS` for new/updated events
- Changed events are sent to War Room API in batches of 50
- War Room SSE broadcasts updates to all connected clients
- Delivery log tracks every API call for audit compliance

---

## Next Steps

### Add Real Events

```sql
-- Example: Detect high-value anomalies
INSERT INTO KIQ.WARROOM_EVENTS
SELECT
  'EVT-ANOM-' || claim_id,
  'value',
  'Unexpected claim variance',
  client_name || ' • ' || product_line,
  variance_amount,
  0.85,
  0.70,
  'IDENTIFIED',
  'Unassigned',
  CURRENT_TIMESTAMP(),
  'snowflake',
  claim_id,
  PARSE_JSON('[]')
FROM your_analytics_table
WHERE variance_amount > 100000;
```

### Monitor Health

```sql
-- Check recent deliveries
SELECT EVENT_ID, HTTP_STATUS, DELIVERED_AT
FROM KIQ.WARROOM_DELIVERY_LOG
ORDER BY DELIVERED_AT DESC
LIMIT 20;

-- Success rate (last 24 hours)
SELECT 
  COUNT(*) AS total,
  SUM(CASE WHEN HTTP_STATUS BETWEEN 200 AND 299 THEN 1 ELSE 0 END) AS success,
  ROUND(100.0 * success / total, 2) AS success_rate_pct
FROM KIQ.WARROOM_DELIVERY_LOG
WHERE DELIVERED_AT > DATEADD('day', -1, CURRENT_TIMESTAMP());
```

### Rotate Token (Every 90 Days)

```bash
# 1. Generate new token
openssl rand -hex 32

# 2. Update Vercel
vercel env rm KIQ_INGEST_TOKEN production
vercel env add KIQ_INGEST_TOKEN production
vercel --prod
```

```sql
-- 3. Update Snowflake
CREATE OR REPLACE SECRET KIQ_INGEST_TOKEN_SECRET
  TYPE = GENERIC_STRING
  SECRET_STRING = 'NEW_TOKEN_HERE';

-- 4. Test
CALL KIQ.PUSH_WARROOM_EVENTS();
```

**No procedure redeployment needed!** 🎉

---

## Troubleshooting

### "Unauthorized ingest" error

**Problem**: Token mismatch between Snowflake and Vercel

**Solution**:
```bash
# Check Vercel token
vercel env ls

# Regenerate if needed
vercel env rm KIQ_INGEST_TOKEN production
vercel env add KIQ_INGEST_TOKEN production
vercel --prod
```

```sql
-- Update Snowflake secret
CREATE OR REPLACE SECRET KIQ_INGEST_TOKEN_SECRET
  TYPE = GENERIC_STRING
  SECRET_STRING = 'MATCHING_TOKEN_HERE';
```

### No events appearing in War Room

**Check delivery log**:
```sql
SELECT * FROM KIQ.WARROOM_DELIVERY_LOG
ORDER BY DELIVERED_AT DESC
LIMIT 10;
```

**Common causes**:
- HTTP 401: Token mismatch (see above)
- HTTP 400: Missing required fields (id, lane, title)
- HTTP 500: Redis connection issue (check Vercel logs)
- Empty result: All events already delivered (DELIVERY_HASH matches)

### Task not running

```sql
-- Check task status
SHOW TASKS LIKE 'WARROOM_DELIVERY_TASK';

-- If suspended, resume
ALTER TASK WARROOM_DELIVERY_TASK RESUME;

-- Check task history
SELECT NAME, STATE, ERROR_MESSAGE
FROM TABLE(INFORMATION_SCHEMA.TASK_HISTORY(
  TASK_NAME => 'WARROOM_DELIVERY_TASK'
))
ORDER BY SCHEDULED_TIME DESC
LIMIT 10;
```

---

## Full Documentation

For advanced patterns, security hardening, and production optimization:

- **Complete Setup Guide**: `docs/snowflake-integration.md`
- **API Examples**: `docs/api-ingest-examples.md`
- **Secrets Management**: `docs/snowflake-secrets-guide.md`

---

## Support

Questions? Check:
1. Snowflake task history: `SHOW TASKS`
2. Delivery log: `SELECT * FROM KIQ.WARROOM_DELIVERY_LOG`
3. Vercel logs: `vercel logs --follow`

**Status: Production-Ready** ✅