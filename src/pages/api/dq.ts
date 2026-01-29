import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  runtime: "nodejs",
};

async function querySnowflake(_sql: string): Promise<any[]> {
  // TODO: replace with your Snowflake connector
  // For now, return mock DQ results
  return [
    {
      test_id: "DQ_TEST_001",
      test_name: "Coverage Rate Threshold Check",
      severity: "HIGH",
      status: "FAIL",
      object_name: "GOV.SEC_BENEFITS_COVERAGE",
      metric_value: 0.78,
      threshold_value: 0.85,
      fail_count: 147,
      executed_ts: "2026-01-28T15:30:00Z",
      notes: "Coverage dropped below 85% threshold for Q4 2025 data",
      sample_json: {
        failing_companies: ["CIK_0001234567", "CIK_0001234568"],
        total_tested: 500,
        failed: 147,
      },
    },
    {
      test_id: "DQ_TEST_002",
      test_name: "Taxonomy Version Consistency",
      severity: "CRITICAL",
      status: "FAIL",
      object_name: "GOV.TAG_MAPPING",
      metric_value: 0.92,
      threshold_value: 0.99,
      fail_count: 23,
      executed_ts: "2026-01-28T15:30:00Z",
      notes: "Tag mapping version mismatch detected across filing periods",
      sample_json: {
        mismatched_tags: ["us-gaap:PlanAssets", "us-gaap:DefinedBenefitPlanContributions"],
        affected_periods: ["2025-Q3", "2025-Q4"],
      },
    },
    {
      test_id: "DQ_TEST_003",
      test_name: "Null Value Check - Critical Fields",
      severity: "MED",
      status: "PASS",
      object_name: "GOV.SEC_BENEFITS_COVERAGE",
      metric_value: 0.0,
      threshold_value: 0.01,
      fail_count: 0,
      executed_ts: "2026-01-28T15:30:00Z",
      notes: "All critical fields populated correctly",
      sample_json: null,
    },
  ];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const dq_run_id = req.query.dq_run_id as string;
    if (!dq_run_id) {
      return res.status(400).json({ error: "dq_run_id is required" });
    }

    const only_fail = req.query.only_fail === "1";
    const min_severity = (req.query.min_severity as string || "").toUpperCase();

    const sevOrder = `CASE severity WHEN 'CRITICAL' THEN 4 WHEN 'HIGH' THEN 3 WHEN 'MED' THEN 2 ELSE 1 END`;
    const minSevClause =
      min_severity && ["LOW", "MED", "HIGH", "CRITICAL"].includes(min_severity)
        ? `AND ${sevOrder} >= (CASE '${min_severity}' WHEN 'CRITICAL' THEN 4 WHEN 'HIGH' THEN 3 WHEN 'MED' THEN 2 ELSE 1 END)`
        : "";

    const failClause = only_fail ? `AND status = 'FAIL'` : "";

    const sql = `
      SELECT *
      FROM GOV.DQ_RESULTS
      WHERE dq_run_id = '${dq_run_id}'
        ${failClause}
        ${minSevClause}
      ORDER BY ${sevOrder} DESC, executed_ts DESC;
    `;

    const rows = await querySnowflake(sql);

    // Filter mock data if only_fail is true
    const filteredRows = only_fail ? rows.filter((r) => r.status === "FAIL") : rows;

    return res.status(200).json({ rows: filteredRows });
  } catch (error) {
    console.error("Error fetching DQ results:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}