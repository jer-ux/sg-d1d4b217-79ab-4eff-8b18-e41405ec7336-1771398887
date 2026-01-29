import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  runtime: "nodejs",
  maxDuration: 30,
};

async function querySnowflake(_sql: string): Promise<any[]> {
  // TODO: replace with your Snowflake connector
  // Mock data for now
  return [];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { event_id } = req.query;

    if (!event_id || typeof event_id !== "string") {
      return res.status(400).json({ error: "event_id is required" });
    }

    const sql = `
      SELECT
        event_id,
        severity,
        quarter,
        cik,
        sponsor_ein,
        company_name,
        prev_coverage,
        coverage_rate,
        drop_rate,
        root_cause_class,
        fix_next,
        suggested_owner,
        missing_tag_count,
        missing_tags
      FROM GOV.SEC_BENEFITS_COVERAGE_RC rc
      LEFT JOIN GOV.SEC_COVERAGE_OWNER_ROUTING own
        ON own.event_id = rc.event_id
      WHERE rc.event_id = '${event_id}'
      LIMIT 1;
    `;

    const rows = await querySnowflake(sql);
    const rc = rows?.[0];

    if (!rc) {
      // Return mock data for demo
      const mockRc = {
        event_id,
        severity: "HIGH",
        quarter: "2024-Q3",
        cik: "0001234567",
        sponsor_ein: "12-3456789",
        company_name: "Acme Corporation",
        prev_coverage: 0.98,
        coverage_rate: 0.87,
        drop_rate: 0.11,
        root_cause_class: "Taxonomy Mapping Gap",
        fix_next: "Update XBRL taxonomy mapping for new disclosure requirements",
        suggested_owner: "SEC Reporting Team",
        missing_tag_count: 3,
        missing_tags: [
          "us-gaap:DefinedBenefitPlanFairValueOfPlanAssets",
          "us-gaap:DefinedBenefitPlanBenefitObligation",
          "us-gaap:DefinedBenefitPlanNetPeriodicBenefitCost"
        ],
      };

      return res.status(200).json({ rc: mockRc });
    }

    // Normalize missing_tags (Snowflake arrays can come back as strings/variants depending on driver)
    const missing_tags = Array.isArray(rc.missing_tags)
      ? rc.missing_tags
      : rc.missing_tags
      ? [rc.missing_tags]
      : [];

    return res.status(200).json({
      rc: { ...rc, missing_tags },
    });
  } catch (error) {
    console.error("Error fetching root cause:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}