// Core type definitions for PBM Contract Intelligence Engine

export type PBMClauseCategory =
  | "rebate_ownership"
  | "rebate_definition"
  | "rebate_timing"
  | "spread_pricing"
  | "admin_fees"
  | "audit_rights"
  | "data_ownership"
  | "data_access"
  | "guaranteed_discounts"
  | "guaranteed_rebates"
  | "specialty_drug"
  | "formulary_control"
  | "pharmacy_network"
  | "mail_order_steering"
  | "manufacturer_revenue"
  | "lowest_net_cost"
  | "fiduciary_commitment"
  | "termination_rights"
  | "transition_assistance"
  | "carve_out_rights"
  | "unclassified";

export const CLAUSE_CATEGORIES: Record<PBMClauseCategory, string> = {
  rebate_ownership: "Rebate Ownership",
  rebate_definition: "Rebate Definition",
  rebate_timing: "Rebate Timing and Reconciliation",
  spread_pricing: "Spread Pricing Allowance",
  admin_fees: "Administrative Fee Structure",
  audit_rights: "Audit Rights",
  data_ownership: "Data Ownership",
  data_access: "Data Access and Reporting",
  guaranteed_discounts: "Guaranteed Discounts",
  guaranteed_rebates: "Guaranteed Rebates",
  specialty_drug: "Specialty Drug Treatment",
  formulary_control: "Formulary Control",
  pharmacy_network: "Pharmacy Network Control",
  mail_order_steering: "Mail-Order and Specialty Steering",
  manufacturer_revenue: "Manufacturer Revenue Beyond Rebates",
  lowest_net_cost: "Lowest Net Cost or Clinical Integrity",
  fiduciary_commitment: "Fiduciary or Loyalty Commitment",
  termination_rights: "Termination Rights",
  transition_assistance: "Transition Assistance and Clean Exit",
  carve_out_rights: "Carve-out and Vendor Access Rights",
  unclassified: "Unclassified / Other"
};

export interface Contract {
  id: string;
  fileName: string;
  uploadDate: Date;
  organization: string;
  extractedText: string;
  version: string;
  status: "processing" | "analyzed" | "error";
  pageCount?: number;
}

export interface Clause {
  id: string;
  contractId: string;
  pageNumber: number;
  heading: string;
  textSnippet: string;
  category: PBMClauseCategory;
  classificationConfidence: number; // 0-1
  sequenceNumber: number;
}

export interface ClauseScore {
  clauseId: string;
  transparencyScore: number; // 1-10
  employerProtectionScore: number; // 1-10
  economicAlignmentScore: number; // 1-10
  auditabilityScore: number; // 1-10
  exitFlexibilityScore: number; // 1-10
  overallScore: number; // computed average
  riskLevel: "red" | "yellow" | "green";
}

export interface RiskExplanation {
  clauseId: string;
  whatItSays: string;
  whyItMatters: string;
  riskIfUnchanged: string;
  economicConcern: string;
  suggestedPosition: string;
}

export interface NegotiationLanguage {
  category: PBMClauseCategory;
  modelLanguage: string;
  fallbackLanguage: string;
  brokerTalkingPoints: string[];
  executiveExplanation: string;
}

export interface ContractReport {
  contractId: string;
  quickLook: QuickLookSummary;
  executiveScorecard: ExecutiveScorecard;
  negotiationGuide: NegotiationGuide;
  boardSummary: BoardSummary;
  generatedAt: Date;
}

export interface QuickLookSummary {
  topRisks: Array<{ category: string; severity: string; brief: string }>;
  topStrengths: Array<{ category: string; brief: string }>;
  overallRating: "red" | "yellow" | "green";
  contractScore: number;
}

export interface ExecutiveScorecard {
  totalContractScore: number;
  categoryScores: Array<{
    category: PBMClauseCategory;
    score: number;
    riskLevel: "red" | "yellow" | "green";
  }>;
  majorFindings: string[];
  negotiationPriorities: string[];
}

export interface NegotiationGuide {
  riskyClause: Array<{
    clauseId: string;
    category: string;
    currentLanguage: string;
    recommendedLanguage: string;
    talkingPoints: string[];
  }>;
  priorityOrder: string[];
}

export interface BoardSummary {
  overallGovernanceScore: number;
  topEconomicExposures: Array<{ exposure: string; impact: string }>;
  topTransparencyFailures: Array<{ failure: string; consequence: string }>;
  terminationExitRisk: string;
  recommendation: "renegotiate" | "escalate" | "approve" | "reject";
  confidenceLevel: "high" | "medium" | "low";
  executiveBrief: string;
}

export interface ComparisonReport {
  originalContractId: string;
  revisedContractId: string;
  improvements: Array<{
    category: string;
    description: string;
    impact: "major" | "moderate" | "minor";
  }>;
  regressions: Array<{
    category: string;
    description: string;
    impact: "major" | "moderate" | "minor";
  }>;
  unresolvedGaps: Array<{
    category: string;
    description: string;
    priority: "high" | "medium" | "low";
  }>;
  netScoreChange: number;
  summary: string;
}

export interface ClauseAnalysis {
  clause: Clause;
  score: ClauseScore;
  riskExplanation: RiskExplanation;
  negotiationLanguage?: NegotiationLanguage;
}