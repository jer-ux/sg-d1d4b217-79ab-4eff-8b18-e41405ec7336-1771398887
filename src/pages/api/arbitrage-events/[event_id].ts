import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  runtime: "nodejs",
};

async function querySnowflake(_sql: string): Promise<any[]> {
  // TODO: replace with your Snowflake connector.
  // For now, return mock data
  return [];
}

function buildNarrative(ev: any) {
  const verified = ev.verification_status === "VERIFIED";
  const sev = ev.severity ?? "HIGH";

  // Coverage regression narrative
  if (ev.event_type?.toLowerCase().includes("coverage")) {
    const prev = typeof ev.prev_coverage === "number" ? ev.prev_coverage : null;
    const cur = typeof ev.coverage_rate === "number" ? ev.coverage_rate : null;
    const drop = typeof ev.drop_rate === "number" ? ev.drop_rate : null;

    return {
      headline: "Benefits disclosure coverage regressed quarter-over-quarter.",
      executive_summary: [
        `Severity: ${sev}. Verification: ${ev.verification_status}.`,
        prev !== null && cur !== null
          ? `Coverage moved from ${(prev * 100).toFixed(1)}% to ${(cur * 100).toFixed(1)}%.`
          : "Coverage rate available in event payload.",
        drop !== null ? `Net regression: ${(drop * 100).toFixed(1)} percentage points.` : "Regression computed via prior quarter comparison.",
      ],
      why_it_matters:
        "Coverage regressions typically signal taxonomy drift, parsing breaks, or disclosure movement into text blocks—each can invalidate downstream KPIs and erode audit trust.",
      what_to_do_next: ev.fix_next ?? "Fix Next: Validate ingestion receipts and tag mapping fidelity; compare missing tags to taxonomy version.",
      gating_note: verified
        ? "This event is VERIFIED: action packets and exports are enabled."
        : "This event is NOT VERIFIED: actions are disabled until upstream receipts and DQ gates pass.",
    };
  }

  // SEC×5500 variance narrative
  if (ev.event_type?.toLowerCase().includes("sec × 5500") || ev.event_type?.toLowerCase().includes("sec x 5500")) {
    const pct = typeof ev.variance_pct === "number" ? ev.variance_pct : null;
    return {
      headline: "SEC-to-Form 5500 reconciliation variance exceeded governance thresholds.",
      executive_summary: [
        `Severity: ${sev}. Verification: ${ev.verification_status}.`,
        ev.metric_key ? `Metric: ${ev.metric_key}.` : "Metric: reconciliation target.",
        pct !== null ? `Variance: ${(pct * 100).toFixed(1)}%.` : "Variance available in event payload.",
      ],
      why_it_matters:
        "Unexplained variances create audit friction and fiduciary risk. Kincaid IQ forces classification into exactly one bucket with receipts (Timing, Scope, Accounting, DQ, Leakage).",
      what_to_do_next: ev.fix_next ?? "Fix Next: Confirm crosswalk determinism (EIN/Plan Number/Year), then classify variance bucket with evidence.",
      gating_note: verified
        ? "VERIFIED: you can generate an action packet and route ownership."
        : "NOT VERIFIED: reconcile ingestion/DQ gates first; then re-run classification.",
    };
  }

  // Default narrative
  return {
    headline: "Arbitrage event detected.",
    executive_summary: [
      `Severity: ${sev}. Verification: ${ev.verification_status}.`,
      ev.metric_key ? `Metric: ${ev.metric_key}.` : "Metric: not specified.",
    ],
    why_it_matters:
      "Arbitrage events exist to convert detected variance into a quantified, evidence-backed remediation action.",
    what_to_do_next: ev.fix_next ?? "Fix Next: Inspect details_json and upstream receipts; assign owner and track remediation.",
    gating_note: verified
      ? "VERIFIED: actions enabled."
      : "NOT VERIFIED: actions disabled until gating passes.",
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Invalid event ID" });
  }

  try {
    // In production, query Snowflake with proper SQL injection protection
    // For now, use mock data from the arbitrage events library
    const { mockArbitrageEvents } = await import("@/lib/arbitrage/mockArbitrageEvents");
    
    const ev = mockArbitrageEvents.find((e) => e.event_id === id);

    if (!ev) {
      return res.status(404).json({ error: "Event not found" });
    }

    const narrative = buildNarrative(ev);

    return res.status(200).json({
      event: ev,
      narrative,
    });
  } catch (error) {
    console.error("Error fetching arbitrage event:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}