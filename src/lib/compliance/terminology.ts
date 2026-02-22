/**
 * Compliance Terminology Management
 * Maps platform features to enterprise compliance language
 */

export type UserRole = "cfo" | "compliance" | "benefits" | "operations" | "audit" | "legal";

export type TerminologyContext = "ui" | "report" | "api" | "documentation" | "compliance";

export type ComplianceTerm = {
  operational: string;
  compliance: string;
  definition: string;
  context?: string;
};

/**
 * Core terminology mappings for enterprise compliance
 */
export const COMPLIANCE_TERMINOLOGY: Record<string, ComplianceTerm> = {
  warRoom: {
    operational: "War Room",
    compliance: "Controls Dashboard",
    definition: "Real-time monitoring and governance interface for financial and operational controls",
    context: "Primary navigation and page headers"
  },
  event: {
    operational: "Event",
    compliance: "Control Finding",
    definition: "Identified exception, variance, or opportunity requiring review and action",
    context: "Individual items in ledger or dashboard"
  },
  receipt: {
    operational: "Receipt",
    compliance: "Evidence Artifact",
    definition: "Cryptographically verified documentation supporting audit trail and attestation",
    context: "Evidence library and audit documentation"
  },
  valueLedger: {
    operational: "Verified Savings Ledger",
    compliance: "Value Reconciliation Ledger",
    definition: "Auditable record of identified, approved, and realized financial impacts with full chain of custody",
    context: "Financial reporting and CFO dashboards"
  },
  identified: {
    operational: "Identified",
    compliance: "Under Review",
    definition: "Item discovered and documented, pending approval for action",
    context: "Ledger state labels"
  },
  approved: {
    operational: "Approved",
    compliance: "Action Authorized",
    definition: "Item reviewed, validated, and approved for execution by authorized personnel",
    context: "Ledger state labels"
  },
  realized: {
    operational: "Realized",
    compliance: "Value Confirmed",
    definition: "Financial impact verified and reconciled to general ledger",
    context: "Ledger state labels"
  },
  atRisk: {
    operational: "At-Risk",
    compliance: "Exception Queue",
    definition: "Items requiring immediate attention due to control gaps, aging, or compliance concerns",
    context: "Alert states and priority queues"
  },
  owner: {
    operational: "Owner",
    compliance: "Control Owner",
    definition: "Individual or role accountable for item resolution and attestation",
    context: "Assignment and responsibility tracking"
  },
  confidence: {
    operational: "Confidence",
    compliance: "Evidence Strength",
    definition: "Statistical measure of data quality, completeness, and verification level",
    context: "Data quality scoring"
  },
  timeSensitivity: {
    operational: "Time Sensitivity",
    compliance: "Remediation Priority",
    definition: "Urgency level based on regulatory deadlines, contract terms, or risk exposure",
    context: "Priority scoring and SLA tracking"
  },
  evidence: {
    operational: "Evidence",
    compliance: "Supporting Documentation",
    definition: "Source data, analysis, and verification artifacts required for audit and attestation",
    context: "Audit trails and documentation"
  },
  packet: {
    operational: "Packet",
    compliance: "Control Package",
    definition: "Bundled evidence, approvals, and documentation for audit or regulatory submission",
    context: "Audit preparation and regulatory filings"
  },
  signature: {
    operational: "Signature",
    compliance: "Attestation",
    definition: "Formal approval and accountability acknowledgment by authorized personnel",
    context: "Approval workflows and audit trails"
  },
  arbitrage: {
    operational: "Arbitrage",
    compliance: "Pricing Variance",
    definition: "Identified discrepancy between contracted and actual pricing requiring reconciliation",
    context: "Vendor invoice audits and contract compliance"
  },
  lane: {
    operational: "Lane",
    compliance: "Control Domain",
    definition: "Operational area with distinct control objectives and governance requirements",
    context: "Dashboard organization and reporting"
  },
  ticker: {
    operational: "Ticker",
    compliance: "Activity Stream",
    definition: "Real-time log of control events and system actions for audit visibility",
    context: "Live monitoring and audit logs"
  }
};

/**
 * Role-based terminology preferences
 */
export const ROLE_PREFERENCES: Record<UserRole, TerminologyContext[]> = {
  cfo: ["ui", "report"],
  compliance: ["compliance", "report", "documentation"],
  benefits: ["ui", "report"],
  operations: ["ui"],
  audit: ["compliance", "documentation", "report"],
  legal: ["compliance", "documentation"]
};

/**
 * Get appropriate terminology based on user role and context
 */
export function getTerm(
  key: keyof typeof COMPLIANCE_TERMINOLOGY,
  role?: UserRole,
  context: TerminologyContext = "ui"
): string {
  const term = COMPLIANCE_TERMINOLOGY[key];
  if (!term) return key;

  // Compliance officers, auditors, and legal always get compliance terminology
  if (role && ["compliance", "audit", "legal"].includes(role)) {
    return term.compliance;
  }

  // CFOs get compliance terminology in reports
  if (role === "cfo" && context === "report") {
    return term.compliance;
  }

  // Default to operational terminology for general users
  return term.operational;
}

/**
 * Get term definition for tooltips and help text
 */
export function getTermDefinition(key: keyof typeof COMPLIANCE_TERMINOLOGY): string {
  return COMPLIANCE_TERMINOLOGY[key]?.definition || "";
}

/**
 * Convert operational term to compliance term
 */
export function toComplianceTerm(operationalTerm: string): string {
  const entry = Object.values(COMPLIANCE_TERMINOLOGY).find(
    t => t.operational.toLowerCase() === operationalTerm.toLowerCase()
  );
  return entry?.compliance || operationalTerm;
}

/**
 * Ledger state terminology mapping
 */
export const LEDGER_STATE_LABELS = {
  operational: {
    IDENTIFIED: "Identified",
    APPROVED: "Approved",
    REALIZED: "Realized",
    AT_RISK: "At-Risk"
  },
  compliance: {
    IDENTIFIED: "Under Review",
    APPROVED: "Action Authorized",
    REALIZED: "Value Confirmed",
    AT_RISK: "Exception Queue"
  }
};

/**
 * Get ledger state label based on role
 */
export function getLedgerStateLabel(
  state: keyof typeof LEDGER_STATE_LABELS.operational,
  role?: UserRole
): string {
  if (role && ["compliance", "audit", "legal"].includes(role)) {
    return LEDGER_STATE_LABELS.compliance[state];
  }
  return LEDGER_STATE_LABELS.operational[state];
}

/**
 * Format monetary values for compliance reporting
 */
export function formatComplianceAmount(amount: number): string {
  const abs = Math.abs(amount);
  const sign = amount < 0 ? "-" : "";
  
  if (abs >= 1_000_000_000) {
    return `${sign}$${(abs / 1_000_000_000).toFixed(2)}B`;
  }
  if (abs >= 1_000_000) {
    return `${sign}$${(abs / 1_000_000).toFixed(2)}M`;
  }
  if (abs >= 1_000) {
    return `${sign}$${(abs / 1_000).toFixed(1)}K`;
  }
  return `${sign}$${abs.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/**
 * Compliance report section headers
 */
export const COMPLIANCE_SECTIONS = {
  overview: "Executive Summary",
  findings: "Control Findings and Exceptions",
  evidence: "Supporting Documentation",
  reconciliation: "Value Reconciliation",
  attestations: "Management Attestations",
  recommendations: "Remediation Recommendations",
  timeline: "Action Timeline and SLAs"
};

/**
 * Audit retention periods by document type
 */
export const RETENTION_PERIODS = {
  financial: "7 years (ERISA requirement)",
  claims: "6 years (HIPAA requirement)",
  contracts: "7 years post-termination",
  audit: "7 years (SOX requirement)",
  personnel: "Duration + 1 year (ERISA requirement)",
  default: "7 years (best practice)"
};

/**
 * Get retention period for document type
 */
export function getRetentionPeriod(docType: keyof typeof RETENTION_PERIODS): string {
  return RETENTION_PERIODS[docType] || RETENTION_PERIODS.default;
}