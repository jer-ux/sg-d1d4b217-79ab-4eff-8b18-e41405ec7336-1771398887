import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  runtime: "nodejs",
};

async function querySnowflake(_sql: string): Promise<any[]> {
  // TODO: replace with your Snowflake connector
  return [];
}

// Mock receipt data generator
function generateMockReceipt(receiptId: string) {
  return {
    receipt_id: receiptId,
    receipt_type: "INGEST",
    verified: true,
    confidence: "HIGH",
    source_system: "SEC_EDGAR",
    source_artifact_name: "0001234567-26-000012.xml",
    source_artifact_hash: "sha256:a3f5b8c9d2e1f4a7b6c5d8e9f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0",
    transform_name: "sec_benefits_coverage_parser_v3.2.1",
    transform_hash: "sha256:1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    period_key: "2025-Q4",
    dq_run_id: "DQ_RUN_20260128_153000",
    ingested_at: "2026-01-28T15:30:00Z",
    lineage_json: {
      source: {
        system: "SEC_EDGAR",
        filing_date: "2025-12-31",
        cik: "0001234567",
        company_name: "Acme Corporation",
        form_type: "10-K",
      },
      extraction: {
        parser_version: "3.2.1",
        tags_extracted: 147,
        tables_parsed: 12,
        text_blocks_processed: 8,
      },
      validation: {
        schema_version: "2025.1",
        taxonomy_version: "us-gaap-2025",
        validation_passed: true,
      },
      quality: {
        completeness: 0.95,
        accuracy: 0.98,
        timeliness_hours: 2.3,
      },
    },
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const receiptId = req.query.id as string;

    if (!receiptId) {
      return res.status(400).json({ error: "Receipt ID is required" });
    }

    // In production, query Snowflake:
    // const sql = `SELECT * FROM GOV.EVIDENCE_RECEIPTS WHERE receipt_id = '${receiptId}' LIMIT 1;`;
    // const rows = await querySnowflake(sql);
    // const receipt = rows?.[0];

    // For now, return mock data
    const receipt = generateMockReceipt(receiptId);

    if (!receipt) {
      return res.status(404).json({ error: "Receipt not found" });
    }

    return res.status(200).json({ receipt });
  } catch (error) {
    console.error("Error fetching receipt:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}