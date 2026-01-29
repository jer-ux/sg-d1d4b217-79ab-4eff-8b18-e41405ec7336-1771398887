import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  runtime: "nodejs",
  maxDuration: 30,
};

async function querySnowflake(_sql: string): Promise<any[]> {
  // TODO: replace with your Snowflake connector
  return [];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const event_id = (req.query.event_id as string ?? "").trim();
    if (!event_id) {
      return res.status(400).json({ error: "event_id is required" });
    }

    const sql = `
      SELECT
        packet_id, event_id, status, owner, suggested_owner,
        summary, findings_json, remediation_json, audit_json,
        created_by, created_ts, updated_ts,
        resolution_note, closed_ts, closed_by, receipt_ids, dq_run_ids
      FROM GOV.ACTION_PACKETS
      WHERE event_id = '${event_id}'
      ORDER BY created_ts DESC
      LIMIT 1;
    `;

    const rows = await querySnowflake(sql);
    const pkt = rows?.[0] ?? null;

    // Mock fallback for demo
    if (!pkt) {
      // Return null packet (no packet exists yet)
      return res.status(200).json({ packet: null });
    }

    return res.status(200).json({ packet: pkt });
  } catch (error) {
    console.error("Error fetching latest action packet:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}