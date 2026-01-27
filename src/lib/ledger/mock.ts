import type { LedgerEntry, LedgerSummary, ReconciliationReport } from "./types";

/**
 * Mock data for Verified Savings Ledger
 */

export const mockLedgerEntries: LedgerEntry[] = [
  {
    id: "LED-001",
    title: "Snowflake compute optimization",
    description: "Migrate high-frequency queries to materialized views, reducing compute by 40%",
    category: "cost-reduction",
    state: "realized",
    estimatedValue: 480000,
    realizedValue: 510000,
    currency: "USD",
    owner: "sarah.chen@company.com",
    approver: "cfo@company.com",
    dueDate: "2026-03-31",
    recognitionDate: "2026-01-15",
    receipts: [
      {
        id: "RCP-001-1",
        type: "source-artifact",
        url: "/receipts/snowflake-query-analysis.pdf",
        description: "Query performance analysis showing 40% reduction",
        uploadedBy: "sarah.chen@company.com",
        uploadedAt: "2025-12-10T10:00:00Z",
        confidence: 0.95,
        lineage: ["snowflake.INFORMATION_SCHEMA.QUERY_HISTORY"]
      },
      {
        id: "RCP-001-2",
        type: "realization-proof",
        url: "/receipts/jan-billing-comparison.xlsx",
        description: "January billing showing $42.5K monthly savings",
        uploadedBy: "finance@company.com",
        uploadedAt: "2026-01-16T09:30:00Z",
        confidence: 1.0
      }
    ],
    dqTests: [
      {
        name: "Query execution completeness",
        status: "PASS",
        description: "All queries migrated successfully",
        lastRun: "2026-01-15T08:00:00Z"
      },
      {
        name: "Performance baseline validation",
        status: "PASS",
        description: "40% reduction confirmed across 30-day window",
        lastRun: "2026-01-15T08:05:00Z"
      },
      {
        name: "Cost calculation accuracy",
        status: "PASS",
        description: "Billing data reconciled with estimates",
        lastRun: "2026-01-16T09:00:00Z"
      }
    ],
    reconciliation: [
      {
        name: "Estimated vs Actual Savings",
        status: "PASS",
        expected: 480000,
        actual: 510000,
        delta: 30000,
        unit: "USD",
        description: "Actual savings exceeded estimate by 6.25%"
      },
      {
        name: "Query Migration Count",
        status: "PASS",
        expected: 847,
        actual: 847,
        delta: 0,
        unit: "queries",
        description: "All planned queries successfully migrated"
      }
    ],
    auditTrail: [
      {
        timestamp: "2025-12-01T14:00:00Z",
        actor: "sarah.chen@company.com",
        action: "created",
        newState: "identified",
        note: "Initial opportunity identified from query performance analysis"
      },
      {
        timestamp: "2025-12-10T10:30:00Z",
        actor: "sarah.chen@company.com",
        action: "receipt-attached",
        note: "Attached query performance analysis report"
      },
      {
        timestamp: "2025-12-15T10:00:00Z",
        actor: "cfo@company.com",
        action: "approved",
        previousState: "identified",
        newState: "approved",
        reason: "Strong evidence and clear ROI"
      },
      {
        timestamp: "2026-01-15T08:00:00Z",
        actor: "system",
        action: "dq-test-run",
        note: "All DQ tests passed successfully"
      },
      {
        timestamp: "2026-01-15T16:00:00Z",
        actor: "finance@company.com",
        action: "realized",
        previousState: "approved",
        newState: "realized",
        previousValue: 480000,
        newValue: 510000,
        reason: "Actual savings exceeded estimate",
        note: "January billing confirmed $42.5K monthly savings"
      },
      {
        timestamp: "2026-01-16T09:00:00Z",
        actor: "system",
        action: "reconciliation-check",
        note: "Reconciliation passed: actual vs estimated within acceptable variance"
      }
    ],
    confidence: 0.95,
    createdAt: "2025-12-01T14:00:00Z",
    updatedAt: "2026-01-15T16:00:00Z",
    createdBy: "sarah.chen@company.com",
    counterparty: "Snowflake Inc.",
    tags: ["cloud-cost", "data-platform", "quick-win"],
    daysInState: 11
  },
  {
    id: "LED-002",
    title: "Vendor consolidation - Analytics tools",
    description: "Consolidate Tableau, Looker, and Mode into unified Databricks platform",
    category: "cost-reduction",
    state: "approved",
    estimatedValue: 320000,
    realizedValue: 0,
    currency: "USD",
    owner: "mike.rivera@company.com",
    approver: "cfo@company.com",
    dueDate: "2026-06-30",
    receipts: [
      {
        id: "RCP-002-1",
        type: "source-artifact",
        url: "/receipts/vendor-contract-analysis.pdf",
        description: "Current contract values and renewal dates",
        uploadedBy: "procurement@company.com",
        uploadedAt: "2025-11-20T11:00:00Z",
        confidence: 1.0
      },
      {
        id: "RCP-002-2",
        type: "approval-doc",
        url: "/receipts/cfo-approval-analytics-consolidation.pdf",
        description: "CFO approval with migration timeline",
        uploadedBy: "cfo@company.com",
        uploadedAt: "2025-12-05T14:30:00Z",
        confidence: 1.0
      }
    ],
    dqTests: [
      {
        name: "Contract value verification",
        status: "PASS",
        description: "All vendor contracts validated",
        lastRun: "2025-11-20T12:00:00Z"
      },
      {
        name: "User migration readiness",
        status: "WARN",
        description: "15% of users need additional training",
        lastRun: "2026-01-10T14:00:00Z",
        details: "Training program scheduled for Q1 2026"
      }
    ],
    reconciliation: [
      {
        name: "License Count Validation",
        status: "PASS",
        expected: 450,
        actual: 447,
        delta: -3,
        unit: "licenses",
        description: "3 users retired, adjustment within tolerance"
      }
    ],
    auditTrail: [
      {
        timestamp: "2025-11-15T09:00:00Z",
        actor: "mike.rivera@company.com",
        action: "created",
        newState: "identified",
        note: "Opportunity identified during annual vendor review"
      },
      {
        timestamp: "2025-11-20T11:30:00Z",
        actor: "procurement@company.com",
        action: "receipt-attached",
        note: "Contract analysis attached"
      },
      {
        timestamp: "2025-12-05T14:30:00Z",
        actor: "cfo@company.com",
        action: "approved",
        previousState: "identified",
        newState: "approved",
        reason: "Strategic alignment with Databricks investment"
      },
      {
        timestamp: "2026-01-10T14:00:00Z",
        actor: "system",
        action: "dq-test-run",
        note: "User readiness check shows training gap"
      }
    ],
    confidence: 0.85,
    createdAt: "2025-11-15T09:00:00Z",
    updatedAt: "2025-12-05T14:30:00Z",
    createdBy: "mike.rivera@company.com",
    tags: ["vendor-consolidation", "analytics", "strategic"],
    daysInState: 52
  },
  {
    id: "LED-003",
    title: "API response time improvement",
    description: "Redis caching layer reduces database load and improves customer experience",
    category: "productivity-gain",
    state: "at-risk",
    estimatedValue: 150000,
    realizedValue: 0,
    currency: "USD",
    owner: "alex.kim@company.com",
    dueDate: "2026-02-28",
    receipts: [
      {
        id: "RCP-003-1",
        type: "test-result",
        url: "/receipts/load-test-results.pdf",
        description: "Load testing showing 60% response time improvement",
        uploadedBy: "alex.kim@company.com",
        uploadedAt: "2025-12-20T15:00:00Z",
        confidence: 0.80
      }
    ],
    dqTests: [
      {
        name: "Response time baseline",
        status: "PASS",
        description: "Baseline metrics captured",
        lastRun: "2025-12-19T10:00:00Z"
      },
      {
        name: "Load test validation",
        status: "PASS",
        description: "60% improvement confirmed under load",
        lastRun: "2025-12-20T14:00:00Z"
      },
      {
        name: "Business impact quantification",
        status: "FAIL",
        description: "Customer satisfaction metrics not available",
        lastRun: "2026-01-20T10:00:00Z",
        details: "Need to establish methodology for productivity gain calculation"
      }
    ],
    reconciliation: [
      {
        name: "Value Calculation Methodology",
        status: "FAIL",
        expected: 150000,
        actual: 0,
        delta: -150000,
        unit: "USD",
        description: "Disputed methodology for productivity gain valuation"
      }
    ],
    auditTrail: [
      {
        timestamp: "2025-12-15T10:00:00Z",
        actor: "alex.kim@company.com",
        action: "created",
        newState: "identified",
        note: "Performance improvement from Redis implementation"
      },
      {
        timestamp: "2025-12-20T15:30:00Z",
        actor: "alex.kim@company.com",
        action: "receipt-attached",
        note: "Load test results attached"
      },
      {
        timestamp: "2026-01-20T11:00:00Z",
        actor: "finance@company.com",
        action: "disputed",
        previousState: "identified",
        newState: "at-risk",
        reason: "Missing customer satisfaction metrics and business impact quantification",
        note: "Need methodology review before approval"
      }
    ],
    confidence: 0.60,
    createdAt: "2025-12-15T10:00:00Z",
    updatedAt: "2026-01-20T11:00:00Z",
    createdBy: "alex.kim@company.com",
    tags: ["performance", "customer-experience"],
    daysInState: 6,
    blockers: ["Needs customer satisfaction impact study", "Value calculation methodology disputed"]
  },
  {
    id: "LED-004",
    title: "Data quality automation",
    description: "Automated data quality checks prevent downstream errors and rework",
    category: "risk-avoidance",
    state: "identified",
    estimatedValue: 280000,
    realizedValue: 0,
    currency: "USD",
    owner: "priya.sharma@company.com",
    dueDate: "2026-04-30",
    receipts: [
      {
        id: "RCP-004-1",
        type: "source-artifact",
        url: "/receipts/incident-analysis-2025.xlsx",
        description: "Analysis of 2025 data quality incidents and remediation costs",
        uploadedBy: "priya.sharma@company.com",
        uploadedAt: "2026-01-10T13:00:00Z",
        confidence: 0.85,
        lineage: ["jira.INCIDENTS", "time_tracking.HOURS"]
      }
    ],
    dqTests: [
      {
        name: "Incident data completeness",
        status: "PASS",
        description: "All 2025 incidents captured",
        lastRun: "2026-01-10T12:00:00Z"
      },
      {
        name: "Cost calculation validation",
        status: "WARN",
        description: "Some indirect costs estimated",
        lastRun: "2026-01-10T12:30:00Z",
        details: "15% of costs based on time estimates rather than actuals"
      }
    ],
    reconciliation: [
      {
        name: "Incident Count Verification",
        status: "PASS",
        expected: 247,
        actual: 247,
        delta: 0,
        unit: "incidents",
        description: "All data quality incidents accounted for"
      }
    ],
    auditTrail: [
      {
        timestamp: "2026-01-10T13:00:00Z",
        actor: "priya.sharma@company.com",
        action: "created",
        newState: "identified",
        note: "Risk avoidance opportunity from automated DQ checks"
      },
      {
        timestamp: "2026-01-10T13:15:00Z",
        actor: "system",
        action: "dq-test-run",
        note: "Initial DQ validation completed"
      }
    ],
    confidence: 0.70,
    createdAt: "2026-01-10T13:00:00Z",
    updatedAt: "2026-01-10T13:00:00Z",
    createdBy: "priya.sharma@company.com",
    tags: ["data-quality", "automation", "risk-reduction"],
    daysInState: 16
  },
  {
    id: "LED-005",
    title: "Legacy ETL decommission",
    description: "Migrate Informatica workloads to Databricks, eliminate license costs",
    category: "cost-reduction",
    state: "approved",
    estimatedValue: 420000,
    realizedValue: 0,
    currency: "USD",
    owner: "james.martinez@company.com",
    approver: "cto@company.com",
    dueDate: "2026-09-30",
    receipts: [
      {
        id: "RCP-005-1",
        type: "source-artifact",
        url: "/receipts/informatica-contract.pdf",
        description: "Current Informatica license agreement",
        uploadedBy: "legal@company.com",
        uploadedAt: "2025-10-15T10:00:00Z",
        confidence: 1.0
      },
      {
        id: "RCP-005-2",
        type: "transform-version",
        url: "/receipts/migration-plan-v2.pdf",
        description: "Detailed migration plan with timeline and resource requirements",
        uploadedBy: "james.martinez@company.com",
        uploadedAt: "2025-11-30T16:00:00Z",
        confidence: 0.90
      }
    ],
    dqTests: [
      {
        name: "Contract value verification",
        status: "PASS",
        description: "License costs validated against contract",
        lastRun: "2025-10-15T11:00:00Z"
      },
      {
        name: "Workload inventory completeness",
        status: "PASS",
        description: "All ETL jobs catalogued",
        lastRun: "2025-11-25T14:00:00Z"
      },
      {
        name: "Migration risk assessment",
        status: "WARN",
        description: "12 critical jobs require manual review",
        lastRun: "2025-11-30T15:00:00Z",
        details: "Complex transformations need architecture review"
      }
    ],
    reconciliation: [
      {
        name: "ETL Job Migration",
        status: "WARN",
        expected: 342,
        actual: 330,
        delta: -12,
        unit: "jobs",
        description: "12 jobs flagged for manual review"
      }
    ],
    auditTrail: [
      {
        timestamp: "2025-10-10T09:00:00Z",
        actor: "james.martinez@company.com",
        action: "created",
        newState: "identified",
        note: "Legacy decommission opportunity identified"
      },
      {
        timestamp: "2025-10-15T10:30:00Z",
        actor: "legal@company.com",
        action: "receipt-attached",
        note: "Contract documentation attached"
      },
      {
        timestamp: "2025-11-30T16:00:00Z",
        actor: "james.martinez@company.com",
        action: "receipt-attached",
        note: "Migration plan v2 completed"
      },
      {
        timestamp: "2025-12-01T10:00:00Z",
        actor: "cto@company.com",
        action: "approved",
        previousState: "identified",
        newState: "approved",
        reason: "Strategic priority for platform modernization",
        note: "Proceed with phased migration approach"
      }
    ],
    confidence: 0.88,
    createdAt: "2025-10-10T09:00:00Z",
    updatedAt: "2025-12-01T10:00:00Z",
    createdBy: "james.martinez@company.com",
    counterparty: "Informatica",
    tags: ["legacy-migration", "platform-modernization", "high-value"],
    daysInState: 56
  }
];

export const mockLedgerSummary: LedgerSummary = {
  totalIdentified: 280000,
  totalApproved: 740000,
  totalRealized: 510000,
  totalAtRisk: 150000,
  
  byCategory: {
    "cost-reduction": {
      count: 3,
      estimatedValue: 1220000,
      realizedValue: 510000
    },
    "productivity-gain": {
      count: 1,
      estimatedValue: 150000,
      realizedValue: 0
    },
    "risk-avoidance": {
      count: 1,
      estimatedValue: 280000,
      realizedValue: 0
    },
    "revenue-enhancement": {
      count: 0,
      estimatedValue: 0,
      realizedValue: 0
    },
    "working-capital": {
      count: 0,
      estimatedValue: 0,
      realizedValue: 0
    },
    "capex-avoidance": {
      count: 0,
      estimatedValue: 0,
      realizedValue: 0
    }
  },
  
  aging: {
    staleEntries: 2,
    avgDaysInState: 28,
    overdueApprovals: 1
  },
  
  recentActivity: mockLedgerEntries[0].auditTrail.slice(-5)
};

export const mockReconciliationReport: ReconciliationReport = {
  period: "Q4 2025",
  openingBalance: 1200000,
  additions: 680000,
  realizations: 510000,
  adjustments: 30000,
  closingBalance: 1680000,
  
  byCategory: {
    "cost-reduction": {
      opening: 800000,
      realized: 510000,
      closing: 1220000
    },
    "productivity-gain": {
      opening: 100000,
      realized: 0,
      closing: 150000
    },
    "risk-avoidance": {
      opening: 200000,
      realized: 0,
      closing: 280000
    },
    "revenue-enhancement": {
      opening: 100000,
      realized: 0,
      closing: 0
    },
    "working-capital": {
      opening: 0,
      realized: 0,
      closing: 0
    },
    "capex-avoidance": {
      opening: 0,
      realized: 0,
      closing: 30000
    }
  },
  
  exceptions: {
    missingReceipts: [],
    blockedApprovals: [mockLedgerEntries[3]],
    staleDisputes: [mockLedgerEntries[2]],
    overdueRealizations: []
  }
};