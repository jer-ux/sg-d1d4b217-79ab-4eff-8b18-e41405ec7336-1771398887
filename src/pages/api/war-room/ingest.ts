import type { NextApiRequest, NextApiResponse } from "next";
import { upsertEvent, publish } from "@/lib/warroom/redisStore";
import type { WarEvent } from "@/lib/warroom/types";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb", // Allow larger payloads for bulk ingestion
    },
  },
};

/**
 * Authentication for external data ingestion.
 * 
 * Production options:
 * - HMAC signatures (Snowflake External Functions support this)
 * - mTLS (mutual TLS certificate validation)
 * - Service account tokens (rotate regularly)
 * - IP allowlisting (Snowflake egress IPs)
 * 
 * For development: Simple bearer token from .env
 */
function assertIngestAuth(req: NextApiRequest) {
  const token = req.headers["x-kiq-ingest-token"] as string | undefined;
  
  if (!process.env.KIQ_INGEST_TOKEN) {
    throw Object.assign(
      new Error("KIQ_INGEST_TOKEN not configured on server"),
      { status: 500 }
    );
  }
  
  if (!token || token !== process.env.KIQ_INGEST_TOKEN) {
    throw Object.assign(
      new Error("Unauthorized ingest: invalid or missing x-kiq-ingest-token header"),
      { status: 401 }
    );
  }
}

/**
 * War Room Ingest API
 * 
 * Accepts event payloads from external systems (Snowflake, ServiceNow, etc.)
 * and upserts them into Redis, triggering real-time SSE updates.
 * 
 * Expected payload:
 * {
 *   "id": "EVT-123",
 *   "lane": "value",
 *   "title": "PBM rebate guarantee shortfall",
 *   "subtitle": "Client ABC • Rx • Q4 true-up variance",
 *   "amount": 340000,
 *   "confidence": 0.86,
 *   "timeSensitivity": 0.72,
 *   "state": "IDENTIFIED",
 *   "owner": "Unassigned",
 *   "receipts": [...]
 * }
 * 
 * Or batch mode: [event1, event2, ...]
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    // 1. Authenticate ingest request
    assertIngestAuth(req);

    // 2. Parse payload (single event or batch)
    const body = req.body;
    const events = Array.isArray(body) ? body : [body];

    // 3. Validate and upsert each event
    const written: WarEvent[] = [];
    const errors: Array<{ index: number; error: string }> = [];

    for (let i = 0; i < events.length; i++) {
      const e = events[i];

      // Minimal validation
      if (!e?.id || !e?.lane || !e?.title) {
        errors.push({
          index: i,
          error: `Missing required fields (id/lane/title): ${JSON.stringify(e)}`,
        });
        continue;
      }

      // Build complete event with defaults
      const event: WarEvent = {
        id: e.id,
        lane: e.lane,
        title: e.title,
        subtitle: e.subtitle ?? "",
        amount: e.amount ?? 0,
        confidence: e.confidence ?? 0,
        timeSensitivity: e.timeSensitivity ?? 0,
        state: e.state ?? "IDENTIFIED",
        owner: e.owner ?? "Unassigned",
        updatedAt: e.updatedAt ?? new Date().toISOString(),
        
        // Packet workflow defaults
        packetStatus: e.packetStatus ?? "DRAFT",
        packetSignatures: e.packetSignatures ?? [],
        
        // Evidence receipts
        receipts: e.receipts ?? [],
        
        // Optional fields
        notes: e.notes,
        tags: e.tags,
        sourceSystem: e.sourceSystem,
        sourceRef: e.sourceRef,
      };

      try {
        // Write to Redis
        await upsertEvent(event);
        
        // Publish SSE update
        await publish({ type: "event_upsert", event });
        
        written.push(event);
      } catch (err: any) {
        errors.push({
          index: i,
          error: err?.message ?? "Failed to upsert event",
        });
      }
    }

    // 4. Return results
    if (errors.length > 0) {
      return res.status(207).json({
        ok: true,
        count: written.length,
        errors: errors.length,
        details: errors,
      });
    }

    return res.status(200).json({
      ok: true,
      count: written.length,
    });
  } catch (e: any) {
    const status = e?.status ?? 500;
    return res.status(status).json({
      ok: false,
      error: e?.message ?? "Unknown error",
    });
  }
}