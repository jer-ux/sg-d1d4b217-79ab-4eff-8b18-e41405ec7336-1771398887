import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  runtime: "nodejs",
  maxDuration: 30,
};

async function querySnowflake(_sql: string): Promise<any[]> {
  // TODO: replace with your Snowflake connector
  return [];
}

function packetId() {
  const t = new Date().toISOString().replace(/[^0-9]/g, "");
  return `AP-${t}-${Math.random().toString(16).slice(2, 10).toUpperCase()}`;
}

type ReqBody = {
  event_id: string;
  created_by?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = req.body as ReqBody;
    const event_id = body?.event_id?.trim();
    const created_by = (body?.created_by ?? "war-room").trim();

    if (!event_id) {
      return res.status(400).json({ error: "event_id is required" });
    }

    // Pull the event from a unified union (eventually make GOV.ARBITRAGE_EVENTS_ALL)
    const eventSql = `
      WITH all_events AS (
        SELECT * FROM GOV.ARBITRAGE_EVENTS_SEC_BENEFITS_COVERAGE_ENRICHED
        UNION ALL
        SELECT * FROM GOV.ARBITRAGE_EVENTS_SEC_5500
        UNION ALL
        SELECT * FROM GOV.ARBITRAGE_EVENTS_DOL_SCH_C_FEES_2021
      )
      SELECT *
      FROM all_events
      WHERE event_id = '${event_id}'
      LIMIT 1;
    `;

    const evRows = await querySnowflake(eventSql);
    let ev = evRows?.[0];

    // Mock fallback for demo
    if (!ev) {
      const mockArbitrageEvents = await import("@/lib/arbitrage/mockArbitrageEvents");
      const mockEvent = mockArbitrageEvents.mockArbitrageEvents.find(
        (e) => e.event_id === event_id
      );

      if (!mockEvent) {
        return res.status(404).json({ error: "Event not found" });
      }

      ev = mockEvent;
    }

    // HARD GATE: must be VERIFIED
    if ((ev.verification_status ?? "") !== "VERIFIED") {
      return res.status(409).json({
        error: "NOT_VERIFIED",
        message:
          "Action packet generation is blocked until upstream receipts are VERIFIED. (Downstream inherits weakest upstream receipt.)",
        event_id,
        verification_status: ev.verification_status,
        ingest_receipt_id: ev.ingest_receipt_id ?? ev.receipt_id ?? null,
        ingest_dq_run_id: ev.ingest_dq_run_id ?? ev.dq_run_id ?? null,
      });
    }

    // Pull DQ failures (optional but very useful)
    const dq_run_id = ev.ingest_dq_run_id ?? ev.dq_run_id ?? null;
    const dqRows = dq_run_id
      ? await querySnowflake(`
          SELECT *
          FROM GOV.DQ_RESULTS
          WHERE dq_run_id = '${dq_run_id}'
            AND status = 'FAIL'
          ORDER BY CASE severity
              WHEN 'CRITICAL' THEN 4
              WHEN 'HIGH' THEN 3
              WHEN 'MED' THEN 2
              ELSE 1
            END DESC, executed_ts DESC
          LIMIT 50;
        `)
      : [];

    const receipt_ids = [ev.ingest_receipt_id ?? null, ev.receipt_id ?? null].filter(Boolean);

    const dq_run_ids = [dq_run_id].filter(Boolean);

    // Build the packet narrative
    const period_key =
      ev.quarter ?? ev.period_key ?? ev.plan_year_end ?? ev.fiscal_period_end ?? null;
    const root_cause_class = ev.root_cause_class ?? ev.details_json?.root_cause ?? null;
    const suggested_owner = ev.suggested_owner ?? ev.details_json?.suggested_owner ?? null;

    const findings_json = {
      event_id: ev.event_id,
      event_type: ev.event_type,
      severity: ev.severity,
      metric_key: ev.metric_key ?? null,
      sponsor_ein: ev.sponsor_ein ?? null,
      cik: ev.cik ?? null,
      plan_key: ev.plan_key ?? null,
      plan_number: ev.plan_number ?? null,
      drop_rate: ev.drop_rate ?? null,
      variance_pct: ev.variance_pct ?? null,
      variance_value: ev.variance_value ?? null,
      missing_tag_count: ev.details_json?.missing_tag_count ?? ev.missing_tag_count ?? null,
      missing_tags: ev.details_json?.missing_tags ?? ev.missing_tags ?? null,
      dq_failures: dqRows,
      receipts: receipt_ids,
      dq_run_ids,
    };

    const remediation_json = {
      owner: ev.owner ?? suggested_owner ?? "Financial Governance",
      suggested_owner,
      status: "OPEN",
      fix_next: ev.fix_next ?? ev.details_json?.fix_next ?? null,
      workflow: [
        "Confirm upstream receipt VERIFIED (already satisfied).",
        "Validate root cause bucket; attach supporting evidence receipt.",
        "Apply remediation (mapping/parsing/disclosure classification).",
        "Re-run compute; ensure VERIFIED status persists.",
        "Close packet with resolution note + audit snapshot.",
      ],
    };

    const audit_json = {
      policy: "Evidence Receipts + Lineage as hard gate (VERIFIED or it's not real).",
      receipt_inheritance: "Downstream inherits weakest upstream receipt.",
      generated_from: "War Room Action Packet Generator",
      generated_ts: new Date().toISOString(),
      created_by,
    };

    const summary = [
      `${ev.event_type} (${ev.severity}).`,
      root_cause_class ? `Root cause: ${root_cause_class}.` : null,
      ev.fix_next ? `Fix Next: ${ev.fix_next}` : null,
    ]
      .filter(Boolean)
      .join(" ");

    const packet_id = packetId();

    // In production, insert to Snowflake GOV.ACTION_PACKETS
    // For demo, just return the packet
    const insertSql = `
      INSERT INTO GOV.ACTION_PACKETS (
        packet_id, event_id, event_type, period_key,
        severity, verification_status,
        owner, suggested_owner, status,
        root_cause_class, variance_bucket,
        receipt_ids, dq_run_ids,
        summary, findings_json, remediation_json, audit_json,
        created_by
      )
      SELECT
        '${packet_id}',
        '${ev.event_id}',
        '${(ev.event_type ?? "Arbitrage Event").replace(/'/g, "''")}',
        ${period_key ? `'${String(period_key).replace(/'/g, "''")}'` : "NULL"},
        '${(ev.severity ?? "HIGH").replace(/'/g, "''")}',
        '${(ev.verification_status ?? "VERIFIED").replace(/'/g, "''")}',
        '${(ev.owner ?? suggested_owner ?? "Financial Governance").replace(/'/g, "''")}',
        ${suggested_owner ? `'${String(suggested_owner).replace(/'/g, "''")}'` : "NULL"},
        'OPEN',
        ${root_cause_class ? `'${String(root_cause_class).replace(/'/g, "''")}'` : "NULL"},
        ${ev.variance_bucket ? `'${String(ev.variance_bucket).replace(/'/g, "''")}'` : "NULL"},
        PARSE_JSON('${JSON.stringify(receipt_ids).replace(/'/g, "''")}'),
        PARSE_JSON('${JSON.stringify(dq_run_ids).replace(/'/g, "''")}'),
        '${summary.replace(/'/g, "''")}',
        PARSE_JSON('${JSON.stringify(findings_json).replace(/'/g, "''")}'),
        PARSE_JSON('${JSON.stringify(remediation_json).replace(/'/g, "''")}'),
        PARSE_JSON('${JSON.stringify(audit_json).replace(/'/g, "''")}'),
        '${created_by.replace(/'/g, "''")}'
    `;

    // await querySnowflake(insertSql);
    console.log("Would insert action packet:", insertSql);

    return res.status(200).json({
      packet_id,
      event_id,
      status: "OPEN",
      owner: remediation_json.owner,
      summary,
      findings_json,
      remediation_json,
      audit_json,
    });
  } catch (error) {
    console.error("Error generating action packet:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}