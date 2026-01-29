import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  runtime: "nodejs",
  maxDuration: 30,
};

async function querySnowflake(_sql: string): Promise<any[]> {
  // TODO: replace with your Snowflake connector
  return [];
}

type PatchBody = {
  status: "OPEN" | "ASSIGNED" | "IN_PROGRESS" | "CLOSED";
  changed_by?: string;
  notes?: string;
  resolution_note?: string;
  closing_receipt_ids?: string[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { packet_id } = req.query;

    if (!packet_id || typeof packet_id !== "string") {
      return res.status(400).json({ error: "packet_id is required" });
    }

    const body = req.body as PatchBody;
    const status = body.status;
    const changed_by = (body.changed_by ?? "war-room").trim();
    const notes = (body.notes ?? "").trim();
    const resolution_note = (body.resolution_note ?? "").trim();
    const closing_receipt_ids = Array.isArray(body.closing_receipt_ids) ? body.closing_receipt_ids : [];

    if (!status) {
      return res.status(400).json({ error: "status is required" });
    }

    // Read current packet
    const curSql = `
      SELECT packet_id, event_id, status, receipt_ids, dq_run_ids
      FROM GOV.ACTION_PACKETS
      WHERE packet_id = '${packet_id}'
      ORDER BY created_ts DESC
      LIMIT 1;
    `;

    const curRows = await querySnowflake(curSql);
    const cur = curRows?.[0];

    if (!cur) {
      // Mock fallback for demo
      return res.status(200).json({
        packet_id,
        event_id: "mock-event-id",
        old_status: "OPEN",
        new_status: status,
        receipt_ids: closing_receipt_ids,
        closed: status === "CLOSED",
        message: "Demo mode: Status update simulated (no Snowflake connection)",
      });
    }

    const old_status = cur.status ?? "OPEN";
    const event_id = cur.event_id;

    // Merge receipt_ids with closing receipt IDs (dedupe)
    const mergedReceiptIds = Array.from(
      new Set([...(cur.receipt_ids ?? []), ...closing_receipt_ids].filter(Boolean))
    );

    // Update main packet row
    const closeFields =
      status === "CLOSED"
        ? `,
          resolution_note = ${resolution_note ? `'${resolution_note.replace(/'/g, "''")}'` : "NULL"},
          closed_ts = CURRENT_TIMESTAMP(),
          closed_by = '${changed_by.replace(/'/g, "''")}'
        `
        : "";

    const updSql = `
      UPDATE GOV.ACTION_PACKETS
      SET
        status = '${status}',
        updated_ts = CURRENT_TIMESTAMP(),
        receipt_ids = PARSE_JSON('${JSON.stringify(mergedReceiptIds).replace(/'/g, "''")}')
        ${closeFields}
      WHERE packet_id = '${packet_id}';
    `;

    await querySnowflake(updSql);

    // Audit log
    const logSql = `
      INSERT INTO GOV.ACTION_PACKET_STATUS_LOG (packet_id, event_id, old_status, new_status, changed_by, notes)
      SELECT
        '${packet_id}',
        '${event_id}',
        '${old_status}',
        '${status}',
        '${changed_by.replace(/'/g, "''")}',
        ${notes ? `'${notes.replace(/'/g, "''")}'` : "NULL"};
    `;

    await querySnowflake(logSql);

    return res.status(200).json({
      packet_id,
      event_id,
      old_status,
      new_status: status,
      receipt_ids: mergedReceiptIds,
      closed: status === "CLOSED",
    });
  } catch (error) {
    console.error("Error updating action packet:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}