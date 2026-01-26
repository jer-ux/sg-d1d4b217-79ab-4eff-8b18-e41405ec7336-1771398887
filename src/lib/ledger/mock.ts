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
    auditTrail: [
      {
        timestamp: "2025-12-01T14:00:00Z",
        actor: "sarah.chen@company.com",
        action: "created",
        newState: "identified"
      },
      {
        timestamp: "2025-12-15T10:00:00Z",
        actor: "cfo@company.com",
        action: "approved",
        previousState: "identified",
        newState: "approved"
      },
      {
        timestamp: "2026-01-15T16:00:00Z",
        actor: "finance@company.com",
        action: "realized",
        previousState: "approved",
        newState: "realized",
        previousValue: 480000,
        newValue: 510000,
        reason: "Actual savings exceeded estimate"
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
    auditTrail: [
      {
        timestamp: "2025-11-15T09:00:00Z",
        actor: "mike.rivera@company.com",
        action: "created",
        newState: "identified"
      },
      {
        timestamp: "2025-12-05T14:30:00Z",
        actor: "cfo@company.com",
        action: "approved",
        previousState: "identified",
        newState: "approved",
        reason: "Strategic alignment with Databricks investment"
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
    auditTrail: [
      {
        timestamp: "2025-12-15T10:00:00Z",
        actor: "alex.kim@company.com",
        action: "created",
        newState: "identified"
      },
      {
        timestamp: "2026-01-20T11:00:00Z",
        actor: "alex.kim@company.com",
        action: "disputed",
        previousState: "identified",
        newState: "at-risk",
        reason: "Missing customer satisfaction metrics and business impact quantification"
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
    auditTrail: [
      {
        timestamp: "2026-01-10T13:00:00Z",
        actor: "priya.sharma@company.com",
        action: "created",
        newState: "identified"
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
    auditTrail: [
      {
        timestamp: "2025-10-10T09:00:00Z",
        actor: "james.martinez@company.com",
        action: "created",
        newState: "identified"
      },
      {
        timestamp: "2025-12-01T10:00:00Z",
        actor: "cto@company.com",
        action: "approved",
        previousState: "identified",
        newState: "approved",
        reason: "Strategic priority for platform modernization"
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