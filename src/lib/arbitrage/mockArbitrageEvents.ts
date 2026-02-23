export type ArbitrageEvent = {
  event_id: string;
  title: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low";
  status: "open" | "investigating" | "resolved" | "ignored" | "active";
  confidence_score: number;
  detected_at: string;
  financial_impact?: {
    amount: number;
    currency: string;
    direction: "positive" | "negative";
  };
  category: string;
  affected_claims: number;
  root_cause_analysis?: {
    primary_cause: string;
    contributing_factors: string[];
  };
  recommended_actions?: {
    action: string;
    priority: "high" | "medium" | "low";
    estimated_impact: string;
  }[];
};

export const mockArbitrageEvents: ArbitrageEvent[] = [
  {
    event_id: "ARB-2024-001",
    title: "Duplicate Specialty Drug Claims",
    description:
      "Multiple claims submitted for the same specialty drug administration across medical and pharmacy benefits within 48 hours.",
    detected_at: "2024-02-14T08:30:00Z",
    status: "active",
    severity: "critical",
    confidence_score: 0.98,
    financial_impact: {
      amount: 42500.0,
      currency: "USD",
      direction: "negative",
    },
    category: "Duplicate Claims",
    affected_claims: 12,
    root_cause_analysis: {
      primary_cause: "Cross-benefit coordination failure",
      contributing_factors: ["J-code vs NDC mapping overlap"]
    },
    recommended_actions: [
      {
        action: "Implement real-time cross-benefit edit",
        priority: "high",
        estimated_impact: "$42,500"
      },
      {
        action: "Recover overpayments from Pharmacy Benefit Manager",
        priority: "high",
        estimated_impact: "$42,500"
      }
    ],
  },
  {
    event_id: "ARB-2024-002",
    title: "Dialysis Bundling Leakage",
    description:
      "ESRD dialysis services unbundled from global rate at out-of-network facilities.",
    detected_at: "2024-02-13T14:15:00Z",
    status: "investigating",
    severity: "high",
    confidence_score: 0.92,
    financial_impact: {
      amount: 18750.0,
      currency: "USD",
      direction: "negative",
    },
    category: "Billing Discrepancy",
    affected_claims: 5,
    root_cause_analysis: {
      primary_cause: "Provider contract parsing error",
      contributing_factors: ["Facility type misclassification"]
    }
  },
  {
    event_id: "ARB-2024-003",
    title: "Retroactive Eligibility Termination",
    description:
      "Claims paid for members term-ed retroactively > 60 days.",
    detected_at: "2024-02-12T09:45:00Z",
    status: "active",
    severity: "medium",
    confidence_score: 1.0,
    financial_impact: {
      amount: 8400.0,
      currency: "USD",
      direction: "negative",
    },
    category: "Eligibility Issue",
    affected_claims: 28,
  },
  {
    event_id: "ARB-2024-004",
    title: "Assistant Surgeon Coding Error",
    description:
      "Modifier 80/81/82 usage inconsistent with procedure code guidelines.",
    detected_at: "2024-02-10T11:20:00Z",
    status: "resolved",
    severity: "low",
    confidence_score: 0.88,
    financial_impact: {
      amount: 3200.0,
      currency: "USD",
      direction: "negative",
    },
    category: "Coding Error",
    affected_claims: 15,
  },
  {
    event_id: "ARB-2024-005",
    title: "Site of Service Optimization",
    description:
      "Infusions performed in HOPD that could be shifted to home infusion or ambulatory center.",
    detected_at: "2024-02-15T10:00:00Z",
    status: "active",
    severity: "medium",
    confidence_score: 0.85,
    financial_impact: {
      amount: 125000.0,
      currency: "USD",
      direction: "positive", // Opportunity
    },
    category: "Network Issue",
    affected_claims: 45,
  },
];