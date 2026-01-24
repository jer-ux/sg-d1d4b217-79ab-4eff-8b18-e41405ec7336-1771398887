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
- ✅ Token authentication (secure API access)

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
CREATE OR REPLACE EXTERNAL ACCESS INTEGRATION KIQ_VERCEL_INTEGRATION
  ALLOWED_NETWORK_RULES = (KIQ_VERCEL_API_RULE)
  ENABLED = TRUE;
```

---

## Step 3: Create External Function

```sql
-- External function that calls War Room ingest API
CREATE OR REPLACE EXTERNAL FUNCTION KIQ.DELIVER_TO_WARROOM(payload VARIANT)
  RETURNS VARIANT
  API_INTEGRATION = KIQ_VERCEL_INTEGRATION
  HEADERS = (
    'Content-Type' = 'application/json',
    'x-kiq-ingest-token' = '<YOUR_KIQ_INGEST_TOKEN>'  -- Replace with your actual token
  )
  MAX_BATCH_ROWS = 50                    -- Send up to 50 events per HTTP call
  AS 'https://your-domain.vercel.app/api/war-room/ingest';  -- Replace with your actual domain
```

**Important:** Replace `<YOUR_KIQ_INGEST_TOKEN>` with the value from your `.env.local`:
```bash
# Generate a secure token
openssl rand -hex 32

# Add to .env.local
KIQ_INGEST_TOKEN=your-generated-token-here
```

---

## Step 4: Create CDC Stored Procedure

```sql
CREATE OR REPLACE PROCEDURE KIQ.SYNC_WARROOM_EVENTS()
RETURNS STRING
LANGUAGE SQL
AS
$$
DECLARE
  rows_delivered INT DEFAULT 0;
  batch_size INT DEFAULT 50;
  current_hash STRING;
  payload VARIANT;
  response VARIANT;
BEGIN
  -- Find events that have changed since last delivery
  FOR event_record IN (
    SELECT
      EVENT_ID,
      LANE,
      TITLE,
      SUBTITLE,
      AMOUNT,
      CONFIDENCE,
      TIME_SENSITIVITY,
      LEDGER_STATE AS state,
      OWNER,
      UPDATED_AT,
      SOURCE_SYSTEM,
      SOURCE_REF,
      RECEIPTS_JSON,
      DELIVERY_HASH
    FROM KIQ.WARROOM_EVENTS
    WHERE
      -- Event has been updated since last delivery
      (LAST_DELIVERED_AT IS NULL OR UPDATED_AT > LAST_DELIVERED_AT)
      
      -- Only deliver "hot" events (skip old stale data)
      AND UPDATED_AT > DATEADD(day, -30, CURRENT_TIMESTAMP())
    
    ORDER BY UPDATED_AT DESC
    LIMIT :batch_size
  ) DO
    -- Calculate hash of current event state
    SET current_hash = SHA2(TO_JSON(event_record), 256);
    
    -- Skip if hash unchanged (idempotency check)
    IF (event_record.DELIVERY_HASH = current_hash) THEN
      CONTINUE;
    END IF;
    
    -- Build payload
    SET payload = OBJECT_CONSTRUCT(
      'id', event_record.EVENT_ID,
      'lane', event_record.LANE,
      'title', event_record.TITLE,
      'subtitle', event_record.SUBTITLE,
      'amount', event_record.AMOUNT,
      'confidence', event_record.CONFIDENCE,
      'timeSensitivity', event_record.TIME_SENSITIVITY,
      'state', event_record.state,
      'owner', event_record.OWNER,
      'updatedAt', event_record.UPDATED_AT,
      'sourceSystem', event_record.SOURCE_SYSTEM,
      'sourceRef', event_record.SOURCE_REF,
      'receipts', event_record.RECEIPTS_JSON
    );
    
    -- Call external function (delivers to War Room API)
    SET response = KIQ.DELIVER_TO_WARROOM(payload);
    
    -- Update delivery tracking
    UPDATE KIQ.WARROOM_EVENTS
    SET
      LAST_DELIVERED_AT = CURRENT_TIMESTAMP(),
      DELIVERY_HASH = :current_hash
    WHERE EVENT_ID = event_record.EVENT_ID;
    
    -- Log delivery
    INSERT INTO KIQ.WARROOM_DELIVERY_LOG (
      EVENT_ID,
      DELIVERY_HASH,
      DELIVERED_AT,
      HTTP_STATUS,
      RESPONSE_SNIPPET
    ) VALUES (
      event_record.EVENT_ID,
      :current_hash,
      CURRENT_TIMESTAMP(),
      response:statusCode::NUMBER,
      SUBSTR(response:body::STRING, 1, 500)
    );
    
    SET rows_delivered = rows_delivered + 1;
  END FOR;
  
  RETURN 'Delivered ' || rows_delivered || ' events to War Room';
END;
$$;
```

---

## Step 5: Create Scheduled Task

```sql
-- Run sync every 5 minutes
CREATE OR REPLACE TASK KIQ.SYNC_WARROOM_TASK
  WAREHOUSE = COMPUTE_WH            -- Replace with your warehouse name
  SCHEDULE = 'USING CRON */5 * * * * UTC'  -- Every 5 minutes
AS
  CALL KIQ.SYNC_WARROOM_EVENTS();

-- Enable the task
ALTER TASK KIQ.SYNC_WARROOM_TASK RESUME;

-- Check task history
SELECT *
FROM TABLE(INFORMATION_SCHEMA.TASK_HISTORY(
  TASK_NAME => 'SYNC_WARROOM_TASK',
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
CALL KIQ.SYNC_WARROOM_EVENTS();
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
CALL KIQ.SYNC_WARROOM_EVENTS();

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
  CALL KIQ.SYNC_WARROOM_EVENTS();

ALTER TASK KIQ.SYNC_WARROOM_STREAM_TASK RESUME;
```

---

## Monitoring & Troubleshooting

### Check Task Execution History

```sql
SELECT
  NAME,
  STATE,
  SCHEDULED_TIME,
  COMPLETED_TIME,
  RETURN_VALUE,
  ERROR_CODE,
  ERROR_MESSAGE
FROM TABLE(INFORMATION_SCHEMA.TASK_HISTORY(
  TASK_NAME => 'SYNC_WARROOM_TASK',
  SCHEDULED_TIME_RANGE_START => DATEADD(day, -7, CURRENT_TIMESTAMP())
))
ORDER BY SCHEDULED_TIME DESC;
```

### Check External Function Logs

```sql
-- Failed deliveries
SELECT *
FROM KIQ.WARROOM_DELIVERY_LOG
WHERE HTTP_STATUS <> 200
ORDER BY DELIVERED_AT DESC;

-- Delivery rate (events per hour)
SELECT
  DATE_TRUNC('hour', DELIVERED_AT) AS hour,
  COUNT(*) AS events_delivered,
  COUNT(DISTINCT EVENT_ID) AS unique_events
FROM KIQ.WARROOM_DELIVERY_LOG
WHERE DELIVERED_AT > DATEADD(day, -1, CURRENT_TIMESTAMP())
GROUP BY hour
ORDER BY hour DESC;
```

### Common Issues

**Issue 1: "Unauthorized ingest" error**
```
Solution: Verify KIQ_INGEST_TOKEN matches in both:
- Snowflake External Function HEADERS
- Vercel .env.local (or Vercel dashboard environment variables)
```

**Issue 2: Network rule prevents egress**
```sql
-- Check if your domain is allowlisted
SHOW NETWORK RULES LIKE 'KIQ_VERCEL_API_RULE';

-- Update if needed
ALTER NETWORK RULE KIQ_VERCEL_API_RULE
  SET VALUE_LIST = ('your-actual-domain.vercel.app:443');
```

**Issue 3: Task not running**
```sql
-- Check task state
SHOW TASKS LIKE 'SYNC_WARROOM_TASK';

-- Resume if suspended
ALTER TASK KIQ.SYNC_WARROOM_TASK RESUME;

-- Check warehouse status
SHOW WAREHOUSES LIKE 'COMPUTE_WH';
```

---

## Security Best Practices

### 1. Rotate Ingest Token Regularly

```bash
# Generate new token
openssl rand -hex 32

# Update Vercel environment variable
vercel env add KIQ_INGEST_TOKEN production

# Update Snowflake external function
ALTER EXTERNAL FUNCTION KIQ.DELIVER_TO_WARROOM
  SET HEADERS = (
    'Content-Type' = 'application/json',
    'x-kiq-ingest-token' = '<NEW_TOKEN>'
  );
```

### 2. Use IP Allowlisting

```typescript
// src/pages/api/war-room/ingest.ts
const ALLOWED_IPS = [
  '34.215.32.0/24',  // Snowflake US West 2
  '52.40.192.0/24',  // Snowflake US West 2
  // Add your Snowflake account's egress IPs
];

function assertIngestAuth(req: NextApiRequest) {
  const clientIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  
  if (!ALLOWED_IPS.some(range => ipInRange(clientIP, range))) {
    throw Object.assign(
      new Error("IP not allowlisted"),
      { status: 403 }
    );
  }
  
  // ... token check
}
```

### 3. Add HMAC Signatures

```sql
-- Snowflake external function with HMAC
CREATE OR REPLACE EXTERNAL FUNCTION KIQ.DELIVER_TO_WARROOM_SECURE(payload VARIANT)
  RETURNS VARIANT
  API_INTEGRATION = KIQ_VERCEL_INTEGRATION
  HEADERS = (
    'Content-Type' = 'application/json',
    'x-kiq-ingest-token' = '<TOKEN>',
    'x-kiq-signature' = SHA2_HEX(CONCAT(payload::STRING, '<SHARED_SECRET>'))
  )
  AS 'https://your-domain.vercel.app/api/war-room/ingest';
```

```typescript
// Verify HMAC in API
const expectedSig = crypto
  .createHmac('sha256', process.env.KIQ_SHARED_SECRET!)
  .update(JSON.stringify(req.body))
  .digest('hex');

if (req.headers['x-kiq-signature'] !== expectedSig) {
  throw new Error("Invalid signature");
}
```

---

## Performance Tuning

### Batch Size Optimization

```sql
-- Adjust batch size based on event payload size
-- Small events (< 1KB): MAX_BATCH_ROWS = 100
-- Large events (> 10KB): MAX_BATCH_ROWS = 10

ALTER EXTERNAL FUNCTION KIQ.DELIVER_TO_WARROOM
  SET MAX_BATCH_ROWS = 100;
```

### Task Scheduling

```sql
-- High-frequency (every minute, for real-time alerts)
ALTER TASK KIQ.SYNC_WARROOM_TASK
  SET SCHEDULE = 'USING CRON */1 * * * * UTC';

-- Low-frequency (every 30 minutes, for bulk analytics)
ALTER TASK KIQ.SYNC_WARROOM_TASK
  SET SCHEDULE = 'USING CRON */30 * * * * UTC';

-- Business hours only (9 AM - 6 PM weekdays)
ALTER TASK KIQ.SYNC_WARROOM_TASK
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
- IP allowlisting: Add all Snowflake egress IPs for your region
- HMAC signatures: Recommended for production

**Status: Production-Ready** ✅