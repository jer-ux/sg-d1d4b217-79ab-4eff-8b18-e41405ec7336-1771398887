import type { NextApiRequest, NextApiResponse } from "next";
import type { StreamMessage, ExecutiveEvent } from "@/components/warroom/executiveTypes";
import { buildStreamTick, buildStreamTiles } from "@/lib/warroom/demo";

const categories = ["cost_trend", "contract", "pharmacy", "compliance", "nps", "plan_design"] as const;
const severities = ["critical", "high", "medium", "low"] as const;
const frameworks = ["McKinsey", "Bain"] as const;

function generateExecutiveEvent(org: string, period: string): ExecutiveEvent {
  const templates = [
    {
      category: "cost_trend",
      severity: "critical",
      title: "YoY PMPM Trend Exceeds McKinsey Baseline",
      description: "Net PMPM trend reached 11.8%, 280bps above McKinsey commercial baseline (9-10%).",
      impact: "$4.8M annualized EBITDA at risk",
      kpi: "Cost Trend Stress Index",
      framework: "McKinsey",
    },
    {
      category: "contract",
      severity: "high",
      title: "Contract Value Leakage Detected",
      description: "Off-contract spend + pricing misses identified in Q4 vendor reconciliation.",
      impact: "$2.1M recoverable EBITDA",
      kpi: "Contract Value Leakage Rate",
      framework: "McKinsey",
    },
    {
      category: "pharmacy",
      severity: "high",
      title: "Pharmacy Rebate Discrepancy Alert",
      description: "Opaque reimbursement terms flagged in specialty pharmacy contracts.",
      impact: "$1.3M annual exposure",
      kpi: "Pharmacy Reimbursement Exposure",
      framework: "McKinsey",
    },
    {
      category: "compliance",
      severity: "medium",
      title: "Contract Compliance Rate Improvement",
      description: "Automated enforcement increased compliant adjudications by 3.2pp QoQ.",
      impact: "$890K non-compliance spend reduced",
      kpi: "Contract Compliance Rate",
      framework: "McKinsey",
    },
    {
      category: "nps",
      severity: "low",
      title: "Benefits NPS Trending Positive",
      description: "Employee benefits experience NPS reached +38, up 7 points QoQ.",
      impact: "Correlation with plan adoption increase",
      kpi: "Benefits NPS",
      framework: "Bain",
    },
    {
      category: "plan_design",
      severity: "medium",
      title: "HDHP/HSA Adoption Accelerating",
      description: "Innovative plan design enrollment reached 47%, up 12pp QoQ.",
      impact: "McKinsey risk hedge strategy on track",
      kpi: "Plan Design Innovation Adoption",
      framework: "McKinsey",
    },
    {
      category: "contract",
      severity: "critical",
      title: "Contract Ambiguity Risk Identified",
      description: "High-spend contract missing audit rights and pricing term clarity.",
      impact: "Dispute risk mitigation required",
      kpi: "Contract Ambiguity Risk Score",
      framework: "McKinsey",
    },
    {
      category: "nps",
      severity: "low",
      title: "Vendor Partner eNPS Improving",
      description: "Internal benefits ops + vendor service teams eNPS reached +42.",
      impact: "Execution quality leading indicator",
      kpi: "Employee NPS (eNPS)",
      framework: "Bain",
    },
  ];

  const template = templates[Math.floor(Math.random() * templates.length)];

  return {
    id: `EVT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString(),
    category: template.category as any,
    severity: template.severity as any,
    title: template.title,
    description: template.description,
    impact: template.impact,
    kpi: template.kpi,
    framework: template.framework as any,
  };
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const org = (req.query.org as string) ?? "Portfolio";
  const period = (req.query.period as "MTD" | "QTD" | "YTD") ?? "MTD";
  const currency = (req.query.currency as "USD" | "GBP" | "EUR") ?? "USD";
  const businessUnit = (req.query.businessUnit as string) ?? "All";

  // Set SSE headers
  res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");

  const send = (obj: StreamMessage | { type: "event"; event: ExecutiveEvent }) => {
    res.write(`data: ${JSON.stringify(obj)}\n\n`);
  };

  // Immediately send a ping so UI flips to "live"
  send({ type: "ping" });

  // Send initial event burst
  setTimeout(() => {
    for (let i = 0; i < 3; i++) {
      send({ type: "event", event: generateExecutiveEvent(org, period) });
    }
  }, 500);

  // Ticker cadence - every 2.5 seconds
  const tickerInterval = setInterval(() => {
    send({ type: "ticker", item: buildStreamTick({ org, period, currency, businessUnit }) });
  }, 2500);

  // Tile refresh cadence - every 10 seconds
  const tilesInterval = setInterval(() => {
    send({ type: "tiles", tiles: buildStreamTiles({ org, period, currency, businessUnit }) });
  }, 10000);

  // Live event generation - every 4-8 seconds
  const eventInterval = setInterval(() => {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const severity = severities[Math.floor(Math.random() * severities.length)];
    const framework = Math.random() > 0.3 ? "McKinsey" : "Bain";

    const titles: Record<typeof category, string[]> = {
      cost_trend: [
        "YoY PMPM trend exceeds McKinsey baseline",
        "Medical cost inflation spike detected",
        "Specialty pharmacy trend acceleration",
      ],
      contract: [
        "Contract value leakage identified",
        "Pricing term violation detected",
        "Rebate recovery opportunity found",
      ],
      pharmacy: [
        "Pharmacy rebate discrepancy detected",
        "PBM reimbursement model exposure increased",
        "Specialty drug cost anomaly",
      ],
      compliance: [
        "Contract compliance rate declined",
        "Off-contract spend detected",
        "Audit rights enforcement opportunity",
      ],
      nps: [
        "Benefits NPS declined below target",
        "Employee NPS improvement detected",
        "Navigation satisfaction increased",
      ],
      plan_design: [
        "HDHP/HSA adoption acceleration",
        "COE utilization increased",
        "Plan design migration on track",
      ],
    };

    const impacts: Record<typeof severity, string[]> = {
      critical: ["$2.4M annual EBITDA at risk", "$1.8M immediate recovery opportunity", "$3.1M compliance exposure"],
      high: ["$890K quarterly impact", "$1.2M annual savings potential", "$650K leakage identified"],
      medium: ["$320K exposure identified", "$450K optimization opportunity", "$280K trend variance"],
      low: ["$120K monitoring threshold", "$95K informational alert", "$150K quarterly variance"],
    };

    const kpis = [
      "Cost Trend Stress Index",
      "Contract Value Leakage Rate",
      "Pharmacy Exposure Index",
      "Contract Compliance Rate",
      "Benefits NPS",
      "Plan Design Adoption Rate",
    ];

    const details: ExecutiveEvent["details"] = {
      root_cause: [
        "Increased specialty pharmacy utilization",
        "Contract pricing term ambiguity",
        "PBM pass-through calculation error",
        "Off-contract spend pattern identified",
        "Claims adjudication variance",
      ][Math.floor(Math.random() * 5)],
      affected_contracts: ["CTR-2024-001", "CTR-2024-007", "CTR-2025-003"].slice(0, Math.floor(Math.random() * 3) + 1),
      recommended_actions: [
        "Escalate to procurement for contract review",
        "Initiate rebate recovery process",
        "Schedule vendor performance review",
        "Update pricing terms in next renewal",
        "Implement enhanced monitoring controls",
      ].slice(0, Math.floor(Math.random() * 3) + 2),
    };

    const event: ExecutiveEvent = {
      id: `EVT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      category,
      severity,
      framework,
      title: titles[category][Math.floor(Math.random() * titles[category].length)],
      description: `Real-time ${framework} ${category} event detected requiring ${severity} priority attention`,
      impact: impacts[severity][Math.floor(Math.random() * impacts[severity].length)],
      kpi: kpis[Math.floor(Math.random() * kpis.length)],
      details,
    };

    send({ type: "event", event });
  }, 4000 + Math.random() * 4000);

  // Keep-alive ping - every 15 seconds
  const pingInterval = setInterval(() => {
    send({ type: "ping" });
  }, 15000);

  // Cleanup on client disconnect
  req.on("close", () => {
    clearInterval(tickerInterval);
    clearInterval(tilesInterval);
    clearInterval(eventInterval);
    clearInterval(pingInterval);
    res.end();
  });
}