/**
 * Contract Intelligence System - Core Type Definitions
 */

export type ClauseType = 
  | "rebates"
  | "audit"
  | "data_ownership"
  | "termination"
  | "specialty"
  | "mac"
  | "pricing"
  | "formulary"
  | "network"
  | "reporting"
  | "liability"
  | "indemnification"
  | "confidentiality"
  | "force_majeure"
  | "spread"
  | "transparency"
  | "mail_order";

export type RiskLevel = "low" | "medium" | "high" | "critical";

export type EconomicImpact = {
  annual_cost_delta: number; // Positive = cost increase
  risk_adjusted_value: number;
  confidence: number; // 0-1
  basis: string;
};

export type RiskFlag = {
  category: "fiduciary" | "litigation" | "economic" | "operational" | "regulatory";
  severity: RiskLevel;
  description: string;
  mitigation?: string;
  precedent_cases?: string[];
};

export interface ContractClause {
  id: string;
  contract_id: string;
  clause_type: ClauseType;
  clause_text: string;
  section_number?: string;
  page_number?: number;
  economic_flag: boolean;
  risk_flag: RiskLevel;
  risk_score?: number; // Added for risk scoring
  extracted_at: string;
  confidence_score: number;
  location?: { page: number; start_idx?: number; end_idx?: number }; // Standardized location
}

export interface Contract {
  id: string;
  name: string;
  pbm_name: string;
  effective_date: string;
  term_months: number;
  client_lives: number;
  annual_spend: number;
  contract_type: "current" | "template" | "proposed";
  uploaded_at: string;
  status: "uploaded" | "processing" | "analyzed" | "archived";
  clauses?: ContractClause[];
}

export interface ClauseComparison {
  clause_type: ClauseType;
  current_text: string;
  model_text: string;
  deviation_score: number;
  similarity_score: number;
  economic_alignment: number;
  key_differences: string[];
  estimated_annual_exposure: number;
  confidence: number;
  calculation_basis: string;
  priority_rank: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  priority_score: number;
  negotiation_rationale: string;
  page_number?: number;
  severity: "critical" | "high" | "medium" | "low";
}

export interface SemanticDifference {
  field: string;
  current_value: string;
  template_value: string;
  impact_level: RiskLevel;
  explanation: string;
}

export interface RedlineAnalysis {
  overall_alignment_score: number;
  total_estimated_exposure: number;
  critical_issues: number;
  high_priority_issues: number;
  clause_comparisons: ClauseComparison[];
  executive_summary: string;
  generated_at: string;
}

export interface IndianaRebateBenchmark {
  drug_category: "brand" | "generic" | "specialty" | "biosimilar";
  min_rebate_pct: number;
  median_rebate_pct: number;
  max_rebate_pct: number;
  sample_size: number;
  effective_date: string;
  source: string;
}

export interface FiduciaryRiskAssessment {
  clause_id: string;
  breach_probability: number;
  potential_damages: number;
  defense_cost_estimate: number;
  precedent_strength: RiskLevel;
  recommendation: string;
}

export interface ConfidenceWeightedExtraction {
  field_name: string;
  extracted_value: any;
  confidence_score: number;
  extraction_method: "ocr" | "pattern_match" | "ai_inference" | "manual";
  validation_status: "verified" | "needs_review" | "rejected";
  source_location: {
    page: number;
    coordinates?: { x: number; y: number; width: number; height: number };
  };
}