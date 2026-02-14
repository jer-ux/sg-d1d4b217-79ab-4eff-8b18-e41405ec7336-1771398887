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
  | "force_majeure";

export type RiskLevel = "critical" | "high" | "medium" | "low" | "none";

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
  risk_details?: RiskFlag[];
  economic_impact?: EconomicImpact;
  extracted_at: string;
  confidence_score: number;
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
  current_clause?: ContractClause;
  template_clause?: ContractClause;
  alignment_score: number; // 0-100
  semantic_differences: SemanticDifference[];
  economic_delta: EconomicImpact;
  risk_escalation: RiskFlag[];
  recommendation: string;
}

export interface SemanticDifference {
  field: string;
  current_value: string;
  template_value: string;
  impact_level: RiskLevel;
  explanation: string;
}

export interface RedlineAnalysis {
  contract_id: string;
  template_id: string;
  generated_at: string;
  overall_alignment_score: number;
  total_economic_delta: number;
  critical_risks: number;
  high_risks: number;
  clause_comparisons: ClauseComparison[];
  executive_summary: string;
  recommended_actions: string[];
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