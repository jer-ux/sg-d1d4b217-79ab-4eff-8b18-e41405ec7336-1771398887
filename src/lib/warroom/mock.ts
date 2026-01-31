import type { LaneKey, WarEvent, LaneSummary } from "@/lib/warroom/types";

export const laneMeta: Record<LaneKey, { label: string; headline: string }> = {
  value: { label: "Verified Savings Ledger", headline: "Reconcile value with receipts and owners." },
  controls: { label: "Controls & Compliance", headline: "Continuous controls. Evidence-first posture." },
  agentic: { label: "Agentic Ops & Sales", headline: "Governed automation with telemetry and gates." },
  marketplace: { label: "Marketplace Execution", headline: "Ship once. Distribute with low delivery drag." },
};

export function seedSummaries(): LaneSummary[] {
  return (Object.keys(laneMeta) as LaneKey[]).map((lane) => {
    const baseIdentified = lane === "value" ? 7_800_000 : lane === "controls" ? 2_100_000 : lane === "agentic" ? 3_400_000 : 1_250_000;
    return {
      lane,
      label: laneMeta[lane].label,
      headline: laneMeta[lane].headline,
      identified: baseIdentified,
      approved: baseIdentified * 0.37,
      realized: baseIdentified * 0.21,
      atRisk: baseIdentified * 0.13,
      velocity: lane === "value" ? 285000 : lane === "controls" ? 95000 : lane === "agentic" ? 142000 : 68000,
      avgConfidence: lane === "value" ? 0.84 : lane === "controls" ? 0.79 : lane === "agentic" ? 0.76 : 0.81,
      criticalCount: lane === "value" ? 7 : lane === "controls" ? 12 : lane === "agentic" ? 5 : 3,
      trendData: generateTrendData(12),
    };
  });
}

function generateTrendData(points: number): number[] {
  const data: number[] = [];
  let current = Math.random() * 50 + 50;
  for (let i = 0; i < points; i++) {
    data.push(current);
    current = current + (Math.random() - 0.4) * 15;
    current = Math.max(20, Math.min(100, current));
  }
  return data;
}

export function seedEvents(): WarEvent[] {
  const now = new Date().toISOString();
  
  const valueEvents: WarEvent[] = [
    {
      id: "evt-001",
      lane: "value",
      title: "PBM guarantee variance detected (audit-grade receipts ready)",
      subtitle: "Potential reconciliation against contract guarantees",
      amount: 420_000,
      confidence: 0.86,
      timeSensitivity: 0.74,
      state: "IDENTIFIED",
      owner: "Finance Ops",
      category: "PBM Reconciliation",
      priority: "HIGH",
      trend: 12.5,
      daysInState: 3,
      receipts: [
        { id: "r-1", title: "Contract guarantee schedule", hash: "0xA13...", freshness: "2h ago" },
        { id: "r-2", title: "Claims reconciliation report", hash: "0xB24...", freshness: "4h ago" }
      ],
      updatedAt: now,
    },
    {
      id: "evt-005",
      lane: "value",
      title: "Cloud cost optimization: reserved instance arbitrage captured",
      subtitle: "AWS RI commitment vs on-demand spread",
      amount: 340_000,
      confidence: 0.91,
      timeSensitivity: 0.58,
      state: "APPROVED",
      owner: "FinOps",
      category: "Cloud Optimization",
      priority: "MEDIUM",
      trend: 8.3,
      daysInState: 12,
      receipts: [
        { id: "r-7", title: "AWS Cost Explorer export", hash: "0xG45...", freshness: "1h ago" }
      ],
      updatedAt: now,
    },
    {
      id: "evt-101",
      lane: "value",
      title: "Stop-loss reimbursement recovery identified",
      subtitle: "High-cost claimant threshold breach tracking",
      amount: 580_000,
      confidence: 0.88,
      timeSensitivity: 0.82,
      state: "APPROVED",
      owner: "Benefits Finance",
      category: "Stop-Loss",
      priority: "CRITICAL",
      trend: 15.2,
      daysInState: 6,
      receipts: [
        { id: "r-11", title: "Stop-loss carrier file", hash: "0xK91...", freshness: "3h ago" }
      ],
      updatedAt: now,
    },
    {
      id: "evt-102",
      lane: "value",
      title: "Duplicate claims pattern detected via ML model",
      subtitle: "Systematic duplicate billing across 3 providers",
      amount: 215_000,
      confidence: 0.79,
      timeSensitivity: 0.91,
      state: "IDENTIFIED",
      owner: "Claims Analytics",
      category: "Fraud Detection",
      priority: "HIGH",
      trend: -5.1,
      daysInState: 1,
      receipts: [
        { id: "r-12", title: "ML anomaly report", hash: "0xL47...", freshness: "6h ago" }
      ],
      updatedAt: now,
    },
    {
      id: "evt-103",
      lane: "value",
      title: "Network discount variance: actual vs contracted rates",
      subtitle: "Provider billing above contracted fee schedule",
      amount: 390_000,
      confidence: 0.83,
      timeSensitivity: 0.67,
      state: "REALIZED",
      owner: "Network Ops",
      category: "Network Pricing",
      priority: "MEDIUM",
      trend: 6.7,
      daysInState: 45,
      receipts: [
        { id: "r-13", title: "Fee schedule audit", hash: "0xM83...", freshness: "5h ago" }
      ],
      updatedAt: now,
    },
    {
      id: "evt-104",
      lane: "value",
      title: "Pharmacy rebate true-up Q4 variance",
      subtitle: "Rebate guarantee shortfall identified",
      amount: 725_000,
      confidence: 0.94,
      timeSensitivity: 0.88,
      state: "APPROVED",
      owner: "Pharmacy Finance",
      category: "PBM Reconciliation",
      priority: "CRITICAL",
      trend: 22.8,
      daysInState: 8,
      receipts: [
        { id: "r-14", title: "PBM rebate statement", hash: "0xN29...", freshness: "2h ago" }
      ],
      updatedAt: now,
    },
    {
      id: "evt-105",
      lane: "value",
      title: "Dependent eligibility audit findings",
      subtitle: "Ineligible dependents still on plan coverage",
      amount: 168_000,
      confidence: 0.76,
      timeSensitivity: 0.72,
      state: "AT_RISK",
      owner: "Benefits Ops",
      category: "Eligibility",
      priority: "HIGH",
      trend: -8.4,
      daysInState: 22,
      receipts: [
        { id: "r-15", title: "Eligibility audit results", hash: "0xO55...", freshness: "8h ago" }
      ],
      updatedAt: now,
    },
    {
      id: "evt-106",
      lane: "value",
      title: "SaaS license optimization: unused seats identified",
      subtitle: "Salesforce + ServiceNow license waste",
      amount: 142_000,
      confidence: 0.89,
      timeSensitivity: 0.45,
      state: "REALIZED",
      owner: "IT Finance",
      category: "SaaS Optimization",
      priority: "LOW",
      trend: 4.2,
      daysInState: 67,
      receipts: [
        { id: "r-16", title: "License usage report", hash: "0xP71...", freshness: "12h ago" }
      ],
      updatedAt: now,
    },
  ];

  const controlEvents: WarEvent[] = [
    {
      id: "evt-002",
      lane: "controls",
      title: "Eligibility-feed control drift: stale file freshness threshold breached",
      subtitle: "Control gate failed; requires owner acknowledgement",
      amount: -120_000,
      confidence: 0.78,
      timeSensitivity: 0.82,
      state: "AT_RISK",
      owner: "Data Governance",
      category: "Data Quality",
      priority: "CRITICAL",
      trend: -12.3,
      daysInState: 2,
      receipts: [
        { id: "r-3", title: "Freshness check report", hash: "0xC77...", freshness: "1h ago" }
      ],
      updatedAt: now,
    },
    {
      id: "evt-006",
      lane: "controls",
      title: "SOC 2 Type II prep: 3 control gaps closed with automation",
      subtitle: "Evidence collection now continuous",
      amount: 180_000,
      confidence: 0.82,
      timeSensitivity: 0.66,
      state: "REALIZED",
      owner: "InfoSec",
      category: "Compliance",
      priority: "HIGH",
      trend: 18.5,
      daysInState: 34,
      receipts: [
        { id: "r-8", title: "Control testing results", hash: "0xH23...", freshness: "5h ago" }
      ],
      updatedAt: now,
    },
    {
      id: "evt-201",
      lane: "controls",
      title: "Claims audit trail gaps detected in 847 transactions",
      subtitle: "Missing audit signatures in legacy system",
      amount: -85_000,
      confidence: 0.81,
      timeSensitivity: 0.89,
      state: "IDENTIFIED",
      owner: "Audit Team",
      category: "Audit Compliance",
      priority: "HIGH",
      trend: -6.7,
      daysInState: 5,
      receipts: [
        { id: "r-21", title: "Audit trail report", hash: "0xQ88...", freshness: "4h ago" }
      ],
      updatedAt: now,
    },
    {
      id: "evt-202",
      lane: "controls",
      title: "Access control review: 23 orphaned admin accounts",
      subtitle: "Terminated employees still have system access",
      amount: -145_000,
      confidence: 0.92,
      timeSensitivity: 0.95,
      state: "AT_RISK",
      owner: "IAM Team",
      category: "Access Control",
      priority: "CRITICAL",
      trend: -15.8,
      daysInState: 1,
      receipts: [
        { id: "r-22", title: "Access review findings", hash: "0xR33...", freshness: "2h ago" }
      ],
      updatedAt: now,
    },
    {
      id: "evt-203",
      lane: "controls",
      title: "HIPAA compliance: encryption at rest implemented",
      subtitle: "All PII/PHI now encrypted with KMS",
      amount: 210_000,
      confidence: 0.87,
      timeSensitivity: 0.71,
      state: "APPROVED",
      owner: "Security Eng",
      category: "Compliance",
      priority: "HIGH",
      trend: 11.4,
      daysInState: 18,
      receipts: [
        { id: "r-23", title: "Encryption audit", hash: "0xS66...", freshness: "6h ago" }
      ],
      updatedAt: now,
    },
    {
      id: "evt-204",
      lane: "controls",
      title: "Data lineage tracking: 98% coverage achieved",
      subtitle: "Critical fields now fully traceable",
      amount: 95_000,
      confidence: 0.79,
      timeSensitivity: 0.54,
      state: "REALIZED",
      owner: "Data Eng",
      category: "Data Governance",
      priority: "MEDIUM",
      trend: 7.9,
      daysInState: 56,
      receipts: [
        { id: "r-24", title: "Lineage coverage report", hash: "0xT91...", freshness: "9h ago" }
      ],
      updatedAt: now,
    },
  ];

  const agenticEvents: WarEvent[] = [
    {
      id: "evt-003",
      lane: "agentic",
      title: "Agent workflow: quote-to-cash cycle time reduced 12%",
      subtitle: "Telemetry confirms sustained improvement",
      amount: 210_000,
      confidence: 0.73,
      timeSensitivity: 0.40,
      state: "REALIZED",
      owner: "RevOps",
      category: "Sales Automation",
      priority: "MEDIUM",
      trend: 9.2,
      daysInState: 28,
      receipts: [
        { id: "r-4", title: "Agent telemetry snapshot", hash: "0xD09...", freshness: "30m ago" },
        { id: "r-5", title: "Cycle time baseline", hash: "0xE12...", freshness: "6h ago" }
      ],
      updatedAt: now,
    },
    {
      id: "evt-007",
      lane: "agentic",
      title: "Sales agent hallucination rate: 2.4% → 0.7% after guardrail update",
      subtitle: "Confidence layer prevents bad quotes",
      amount: 125_000,
      confidence: 0.76,
      timeSensitivity: 0.71,
      state: "IDENTIFIED",
      owner: "Sales Ops",
      category: "Agent Quality",
      priority: "HIGH",
      trend: 14.6,
      daysInState: 4,
      receipts: [
        { id: "r-9", title: "Hallucination audit log", hash: "0xI56...", freshness: "2h ago" }
      ],
      updatedAt: now,
    },
    {
      id: "evt-301",
      lane: "agentic",
      title: "Customer support agent: CSAT score up 18 points",
      subtitle: "AI-powered resolution quality improvement",
      amount: 285_000,
      confidence: 0.81,
      timeSensitivity: 0.63,
      state: "APPROVED",
      owner: "Support Ops",
      category: "Support Automation",
      priority: "HIGH",
      trend: 16.3,
      daysInState: 14,
      receipts: [
        { id: "r-31", title: "CSAT tracking data", hash: "0xU44...", freshness: "5h ago" }
      ],
      updatedAt: now,
    },
    {
      id: "evt-302",
      lane: "agentic",
      title: "Contract analysis agent: 4.2 days → 6 hours review time",
      subtitle: "Legal team bandwidth freed up 73%",
      amount: 340_000,
      confidence: 0.88,
      timeSensitivity: 0.55,
      state: "REALIZED",
      owner: "Legal Ops",
      category: "Legal Automation",
      priority: "MEDIUM",
      trend: 12.1,
      daysInState: 42,
      receipts: [
        { id: "r-32", title: "Contract processing metrics", hash: "0xV77...", freshness: "7h ago" }
      ],
      updatedAt: now,
    },
    {
      id: "evt-303",
      lane: "agentic",
      title: "Lead qualification agent: conversion rate +23%",
      subtitle: "Better lead scoring drives pipeline quality",
      amount: 475_000,
      confidence: 0.79,
      timeSensitivity: 0.68,
      state: "APPROVED",
      owner: "Marketing Ops",
      category: "Sales Automation",
      priority: "CRITICAL",
      trend: 19.7,
      daysInState: 9,
      receipts: [
        { id: "r-33", title: "Lead scoring analysis", hash: "0xW22...", freshness: "4h ago" }
      ],
      updatedAt: now,
    },
    {
      id: "evt-304",
      lane: "agentic",
      title: "Expense approval agent: policy compliance 94% → 99%",
      subtitle: "Automated policy enforcement reduces leakage",
      amount: 156_000,
      confidence: 0.84,
      timeSensitivity: 0.59,
      state: "IDENTIFIED",
      owner: "Finance Ops",
      category: "Finance Automation",
      priority: "MEDIUM",
      trend: 8.8,
      daysInState: 7,
      receipts: [
        { id: "r-34", title: "Expense policy audit", hash: "0xX55...", freshness: "8h ago" }
      ],
      updatedAt: now,
    },
  ];

  const marketplaceEvents: WarEvent[] = [
    {
      id: "evt-004",
      lane: "marketplace",
      title: "Marketplace onboarding: time-to-value down to 9 days",
      subtitle: "Standardized pack reduced services drag",
      amount: 95_000,
      confidence: 0.69,
      timeSensitivity: 0.35,
      state: "APPROVED",
      owner: "Delivery",
      category: "Onboarding",
      priority: "MEDIUM",
      trend: 6.4,
      daysInState: 11,
      receipts: [
        { id: "r-6", title: "Onboarding checklist + receipts", hash: "0xF11...", freshness: "3h ago" }
      ],
      updatedAt: now,
    },
    {
      id: "evt-008",
      lane: "marketplace",
      title: "Snowflake marketplace: 4 new customers via native listing",
      subtitle: "Zero sales motion, pure discovery",
      amount: 280_000,
      confidence: 0.88,
      timeSensitivity: 0.44,
      state: "REALIZED",
      owner: "Partnerships",
      category: "Marketplace Sales",
      priority: "HIGH",
      trend: 24.5,
      daysInState: 21,
      receipts: [
        { id: "r-10", title: "Snowflake transaction log", hash: "0xJ78...", freshness: "4h ago" }
      ],
      updatedAt: now,
    },
    {
      id: "evt-401",
      lane: "marketplace",
      title: "AWS Marketplace integration: 2 enterprise deals closed",
      subtitle: "Private offers via marketplace accelerate procurement",
      amount: 420_000,
      confidence: 0.91,
      timeSensitivity: 0.72,
      state: "APPROVED",
      owner: "Cloud Partnerships",
      category: "Marketplace Sales",
      priority: "CRITICAL",
      trend: 31.2,
      daysInState: 5,
      receipts: [
        { id: "r-41", title: "AWS marketplace report", hash: "0xY88...", freshness: "3h ago" }
      ],
      updatedAt: now,
    },
    {
      id: "evt-402",
      lane: "marketplace",
      title: "Partner enablement: certification time reduced 40%",
      subtitle: "Self-service training portal driving faster ramp",
      amount: 125_000,
      confidence: 0.77,
      timeSensitivity: 0.51,
      state: "REALIZED",
      owner: "Partner Success",
      category: "Partner Enablement",
      priority: "MEDIUM",
      trend: 11.8,
      daysInState: 38,
      receipts: [
        { id: "r-42", title: "Training completion metrics", hash: "0xZ33...", freshness: "6h ago" }
      ],
      updatedAt: now,
    },
    {
      id: "evt-403",
      lane: "marketplace",
      title: "API marketplace: 12 integrations published",
      subtitle: "Developer ecosystem expansion driving usage",
      amount: 195_000,
      confidence: 0.73,
      timeSensitivity: 0.48,
      state: "IDENTIFIED",
      owner: "Platform",
      category: "API Ecosystem",
      priority: "LOW",
      trend: 8.1,
      daysInState: 16,
      receipts: [
        { id: "r-43", title: "API usage analytics", hash: "0xA99...", freshness: "9h ago" }
      ],
      updatedAt: now,
    },
  ];

  return [...valueEvents, ...controlEvents, ...agenticEvents, ...marketplaceEvents];
}

export function formatMoney(n: number) {
  const abs = Math.abs(n);
  const sign = n < 0 ? "-" : "";
  if (abs >= 1_000_000_000) return `${sign}$${(abs / 1_000_000_000).toFixed(2)}B`;
  if (abs >= 1_000_000) return `${sign}$${(abs / 1_000_000).toFixed(2)}M`;
  if (abs >= 1_000) return `${sign}$${(abs / 1_000).toFixed(1)}K`;
  return `${sign}$${abs.toFixed(0)}`;
}