# War Room Ingest API - Usage Examples

## API Endpoint

```
POST /api/war-room/ingest
```

**Authentication:**
```
x-kiq-ingest-token: <your-secret-token>
```

---

## Example 1: Single Event (Value Lane)

### Request

```bash
curl -X POST https://your-domain.vercel.app/api/war-room/ingest \
  -H "Content-Type: application/json" \
  -H "x-kiq-ingest-token: your-secret-token" \
  -d '{
    "id": "EVT-PBM-001",
    "lane": "value",
    "title": "PBM rebate guarantee shortfall",
    "subtitle": "Client ABC • Rx • Q4 true-up variance",
    "amount": 340000,
    "confidence": 0.86,
    "timeSensitivity": 0.72,
    "state": "IDENTIFIED",
    "owner": "alice@kiq.com",
    "sourceSystem": "snowflake",
    "sourceRef": "query_xyz123",
    "receipts": [
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
    ]
  }'
```

### Response (Success)

```json
{
  "ok": true,
  "count": 1
}
```

---

## Example 2: Batch Events (Multiple Lanes)

### Request

```bash
curl -X POST https://your-domain.vercel.app/api/war-room/ingest \
  -H "Content-Type: application/json" \
  -H "x-kiq-ingest-token: your-secret-token" \
  -d '[
    {
      "id": "EVT-VAL-001",
      "lane": "value",
      "title": "Cloud waste optimization opportunity",
      "subtitle": "AWS EC2 • Unused m5.4xlarge instances",
      "amount": 180000,
      "confidence": 0.92,
      "timeSensitivity": 0.65,
      "state": "IDENTIFIED",
      "owner": "alice@kiq.com"
    },
    {
      "id": "EVT-CTRL-001",
      "lane": "controls",
      "title": "SoD violation in AP workflow",
      "subtitle": "Finance dept • 3 users can create & approve",
      "amount": 0,
      "confidence": 0.88,
      "timeSensitivity": 0.90,
      "state": "IDENTIFIED",
      "owner": "bob@kiq.com"
    },
    {
      "id": "EVT-AGT-001",
      "lane": "agentic",
      "title": "Invoice matching agent deployed",
      "subtitle": "Accounts payable • v2.3 release",
      "amount": 0,
      "confidence": 0.95,
      "timeSensitivity": 0.50,
      "state": "IDENTIFIED",
      "owner": "Unassigned"
    }
  ]'
```

### Response (Success)

```json
{
  "ok": true,
  "count": 3
}
```

---

## Example 3: Partial Success (207 Multi-Status)

### Request

```bash
curl -X POST https://your-domain.vercel.app/api/war-room/ingest \
  -H "Content-Type: application/json" \
  -H "x-kiq-ingest-token: your-secret-token" \
  -d '[
    {
      "id": "EVT-VALID-001",
      "lane": "value",
      "title": "Valid event",
      "amount": 100000
    },
    {
      "lane": "value",
      "title": "Missing ID - INVALID"
    },
    {
      "id": "EVT-VALID-002",
      "title": "Missing lane - INVALID"
    }
  ]'
```

### Response (Partial Success)

```json
{
  "ok": true,
  "count": 1,
  "errors": 2,
  "details": [
    {
      "index": 1,
      "error": "Missing required fields (id/lane/title): {\"lane\":\"value\",\"title\":\"Missing ID - INVALID\"}"
    },
    {
      "index": 2,
      "error": "Missing required fields (id/lane/title): {\"id\":\"EVT-VALID-002\",\"title\":\"Missing lane - INVALID\"}"
    }
  ]
}
```

---

## Example 4: With Evidence Receipts

### Request

```bash
curl -X POST https://your-domain.vercel.app/api/war-room/ingest \
  -H "Content-Type: application/json" \
  -H "x-kiq-ingest-token: your-secret-token" \
  -d '{
    "id": "EVT-MARKET-001",
    "lane": "marketplace",
    "title": "Snowflake connector active",
    "subtitle": "Data warehouse integration • 847 TB scanned",
    "amount": 0,
    "confidence": 0.99,
    "timeSensitivity": 0.40,
    "state": "IDENTIFIED",
    "owner": "integrations@kiq.com",
    "sourceSystem": "snowflake",
    "sourceRef": "integration_health_check",
    "receipts": [
      {
        "id": "rcpt-health-001",
        "title": "Integration health check",
        "hash": "sha256:def456...",
        "freshness": "PT1M",
        "url": "https://app.snowflake.com/...",
        "meta": {
          "status": "healthy",
          "last_sync": "2026-01-24T15:32:00Z",
          "bytes_scanned": 847000000000,
          "tables_synced": ["CLAIMS", "CONTRACTS", "MEMBERS"]
        }
      },
      {
        "id": "rcpt-perf-001",
        "title": "Query performance metrics",
        "hash": "sha256:ghi789...",
        "freshness": "PT5M",
        "url": null,
        "meta": {
          "avg_query_time_ms": 1850,
          "p95_query_time_ms": 4200,
          "queries_last_hour": 342
        }
      }
    ]
  }'
```

### Response

```json
{
  "ok": true,
  "count": 1
}
```

---

## Example 5: ServiceNow Integration

### Request

```javascript
// Node.js example using fetch
const event = {
  id: `EVT-SNW-${incident.sys_id}`,
  lane: "controls",
  title: incident.short_description,
  subtitle: `Priority ${incident.priority} • ${incident.assigned_to}`,
  amount: 0,
  confidence: incident.priority === "1" ? 0.95 : 0.80,
  timeSensitivity: incident.priority === "1" ? 0.90 : 0.70,
  state: "IDENTIFIED",
  owner: incident.assigned_to || "Unassigned",
  sourceSystem: "servicenow",
  sourceRef: incident.sys_id,
  receipts: [
    {
      id: `rcpt-snw-${incident.sys_id}`,
      title: "ServiceNow incident",
      hash: `sha256:${crypto.createHash('sha256').update(incident.sys_id).digest('hex')}`,
      freshness: "PT10M",
      url: `https://your-instance.service-now.com/incident.do?sys_id=${incident.sys_id}`,
      meta: {
        state: incident.state,
        priority: incident.priority,
        opened_at: incident.sys_created_on,
        category: incident.category,
      }
    }
  ]
};

const response = await fetch("https://your-domain.vercel.app/api/war-room/ingest", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-kiq-ingest-token": process.env.KIQ_INGEST_TOKEN,
  },
  body: JSON.stringify(event),
});

const result = await response.json();
console.log(result);
// { ok: true, count: 1 }
```

---

## Example 6: Databricks Integration

### Python (PySpark)

```python
import requests
import json
from datetime import datetime

# Databricks notebook cell
def send_to_warroom(event_id, title, amount, metadata):
    payload = {
        "id": event_id,
        "lane": "marketplace",
        "title": title,
        "subtitle": f"Databricks • Notebook: {dbutils.notebook.entry_point.getDbutils().notebook().getContext().notebookPath().get()}",
        "amount": amount,
        "confidence": 0.90,
        "timeSensitivity": 0.60,
        "state": "IDENTIFIED",
        "owner": "data-eng@kiq.com",
        "sourceSystem": "databricks",
        "sourceRef": dbutils.notebook.entry_point.getDbutils().notebook().getContext().notebookPath().get(),
        "receipts": [
            {
                "id": f"rcpt-dbx-{event_id}",
                "title": "Databricks job output",
                "hash": f"sha256:{hash(json.dumps(metadata))}",
                "freshness": "PT2M",
                "url": None,
                "meta": metadata
            }
        ]
    }
    
    response = requests.post(
        "https://your-domain.vercel.app/api/war-room/ingest",
        headers={
            "Content-Type": "application/json",
            "x-kiq-ingest-token": dbutils.secrets.get("kiq", "ingest-token")
        },
        json=payload
    )
    
    return response.json()

# Example usage in notebook
result = send_to_warroom(
    event_id="EVT-DBX-001",
    title="ML model training complete",
    amount=0,
    metadata={
        "model": "fraud_detection_v3",
        "accuracy": 0.94,
        "training_time_sec": 3847,
        "dataset_rows": 12_450_000
    }
)

print(result)
# { "ok": True, "count": 1 }
```

---

## Error Responses

### 401 Unauthorized

```json
{
  "ok": false,
  "error": "Unauthorized ingest: invalid or missing x-kiq-ingest-token header"
}
```

**Fix:** Add correct token to `x-kiq-ingest-token` header

---

### 400 Bad Request

```json
{
  "ok": false,
  "error": "Missing required fields (id/lane/title): {...}"
}
```

**Fix:** Ensure all events have `id`, `lane`, and `title` fields

---

### 405 Method Not Allowed

```json
{
  "ok": false,
  "error": "Method not allowed"
}
```

**Fix:** Use POST method, not GET/PUT/DELETE

---

### 500 Internal Server Error

```json
{
  "ok": false,
  "error": "Failed to connect to Redis"
}
```

**Fix:** Check Redis connection (Upstash credentials in .env.local)

---

## Field Reference

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique event identifier (e.g., `EVT-PBM-001`) |
| `lane` | string | Lane: `value`, `controls`, `agentic`, `marketplace` |
| `title` | string | Event title (50-100 chars recommended) |

### Optional Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `subtitle` | string | `""` | Context (client, product, period) |
| `amount` | number | `0` | Dollar amount (positive = savings/revenue) |
| `confidence` | number | `0` | Confidence score (0-1) |
| `timeSensitivity` | number | `0` | Urgency score (0-1) |
| `state` | string | `"IDENTIFIED"` | State: `IDENTIFIED`, `APPROVED`, `REALIZED`, `AT_RISK` |
| `owner` | string | `"Unassigned"` | Email or name of owner |
| `packetStatus` | string | `"DRAFT"` | Packet status: `DRAFT`, `SUBMITTED`, `APPROVED`, `CLOSED` |
| `receipts` | array | `[]` | Evidence receipts (see Receipt schema) |
| `sourceSystem` | string | `null` | Source system name (snowflake, servicenow, etc.) |
| `sourceRef` | string | `null` | Source reference (query_id, ticket_id, etc.) |
| `notes` | string | `null` | Additional notes |
| `tags` | array | `[]` | Tags for filtering |

### Receipt Schema

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique receipt ID |
| `title` | string | Receipt title |
| `hash` | string | Content hash (for freshness tracking) |
| `freshness` | string | ISO 8601 duration (e.g., `PT5M` = 5 minutes) |
| `url` | string\|null | Link to source system |
| `meta` | object | Custom metadata |

---

## Rate Limits

**Development:**
- No rate limits

**Production:**
- 1000 events/minute per token
- 10MB max payload size
- 100 events max per batch

**To increase limits:** Contact SiriusB iQ support

---

## Testing

### Local Development

```bash
# Start local server
npm run dev

# Test ingest
curl -X POST http://localhost:3000/api/war-room/ingest \
  -H "Content-Type: application/json" \
  -H "x-kiq-ingest-token: dev-token-12345" \
  -d '{"id":"EVT-TEST-001","lane":"value","title":"Test event"}'
```

### Vercel Preview

```bash
# Deploy to preview
vercel

# Get preview URL
PREVIEW_URL=$(vercel inspect --json | jq -r '.url')

# Test against preview
curl -X POST "https://$PREVIEW_URL/api/war-room/ingest" \
  -H "Content-Type: application/json" \
  -H "x-kiq-ingest-token: $KIQ_INGEST_TOKEN" \
  -d '{"id":"EVT-PREVIEW-001","lane":"value","title":"Preview test"}'
```

---

## Best Practices

1. **Use descriptive event IDs:**
   ```
   ✅ EVT-PBM-REBATE-Q4-2026-001
   ❌ event123
   ```

2. **Include context in subtitle:**
   ```
   ✅ "Client ABC • Pharmacy • Q4 true-up"
   ❌ "Q4"
   ```

3. **Attach evidence receipts:**
   - Always include at least 1 receipt for audit trails
   - Link back to source system (Snowflake, ServiceNow, etc.)
   - Include freshness indicator (how old is the data?)

4. **Set realistic confidence scores:**
   ```
   0.90-1.00 → Verified data, high certainty
   0.70-0.89 → Strong indicators, medium certainty
   0.50-0.69 → Weak signals, low certainty
   ```

5. **Use batch mode for bulk imports:**
   ```javascript
   // ✅ Efficient: 1 HTTP call for 50 events
   await fetch("/api/war-room/ingest", {
     method: "POST",
     body: JSON.stringify(events),  // array of 50 events
   });
   
   // ❌ Inefficient: 50 HTTP calls
   for (const event of events) {
     await fetch("/api/war-room/ingest", {
       method: "POST",
       body: JSON.stringify(event),  // single event
     });
   }
   ```

---

## Support

- **Integration issues:** Check Vercel logs (`vercel logs`)
- **Authentication errors:** Verify token in `.env.local` and request headers match
- **Schema questions:** See Field Reference above
- **Performance tuning:** Use batch mode, adjust MAX_BATCH_ROWS in Snowflake

**Status: Production-Ready** ✅