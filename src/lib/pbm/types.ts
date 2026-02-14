/**
 * PBM Contract Arbitrage Detection Types
 * Structured economic term extraction and financial modeling
 */

export interface ContractUpload {
  file_id: string;
  org_id: string;
  sha256: string;
  upload_timestamp: Date;
  processing_status: "pending" | "parsing" | "extracted" | "modeling" | "complete" | "error";
  file_name: string;
  file_size: number;
  encryption_key_id?: string;
}

export interface RebateTerms {
  retained_percentage: number;
  passthrough_percentage: number;
  guaranteed_rebate_brand?: number;
  guaranteed_rebate_generic?: number;
  guaranteed_rebate_specialty?: number;
  rebate_timing: "quarterly" | "annual" | "realtime";
  rebate_basis: "AWP" | "WAC" | "MAC" | "other";
  conditions?: string[];
}

export interface SpreadPricingClause {
  mac_definition: string;
  awp_discount_percentage: number;
  dispensing_fee_per_script: number;
  ingredient_cost_basis: "MAC" | "AWP" | "WAC";
  spread_disclosed: boolean;
  transparency_level: "full" | "partial" | "opaque";
}

export interface AdminFeeStructure {
  pepm_admin_fee: number;
  per_script_fee: number;
  performance_guarantee_amount?: number;
  performance_metrics?: string[];
  fee_escalation_clause?: string;
}

export interface SpecialtyDefinition {
  specialty_threshold_amount: number;
  carveout_limitations: string[];
  white_bagging_allowed: boolean;
  brown_bagging_allowed: boolean;
  mandatory_mail_percentage?: number;
  specialty_networks: string[];
  prior_auth_required: boolean;
}

export interface ParsedContract {
  contract_id: string;
  file_id: string;
  org_id: string;
  pbm_name: string;
  contract_effective_date: Date;
  contract_end_date: Date;
  parsing_timestamp: Date;
  
  rebate_terms: RebateTerms;
  spread_pricing: SpreadPricingClause;
  admin_fees: AdminFeeStructure;
  specialty_definition: SpecialtyDefinition;
  
  total_covered_lives?: number;
  estimated_annual_spend?: number;
  
  extraction_confidence: number;
  parsing_notes: string[];
  manual_review_required: boolean;
}

export interface RevenueStream {
  stream_id: string;
  contract_id: string;
  stream_type: "rebate_retention" | "spread_markup" | "admin_fees" | "specialty_carveout" | "mail_mandate";
  revenue_category: "visible" | "hidden" | "semi-transparent";
  
  annual_amount_min: number;
  annual_amount_max: number;
  annual_amount_likely: number;
  
  basis_calculation: string;
  assumptions: string[];
  sensitivity_factors: string[];
}

export interface ArbitrageOpportunity {
  opportunity_id: string;
  contract_id: string;
  severity: "critical" | "high" | "medium" | "low";
  
  opportunity_type: 
    | "excessive_spread"
    | "rebate_retention"
    | "specialty_markup"
    | "mail_mandate_cost"
    | "admin_fee_excess"
    | "lack_transparency";
  
  current_cost: number;
  market_benchmark: number;
  potential_savings: number;
  confidence_level: number;
  
  evidence_items: string[];
  recommended_actions: string[];
  implementation_complexity: "low" | "medium" | "high";
  
  detected_timestamp: Date;
}

export interface FinancialModel {
  model_id: string;
  contract_id: string;
  model_timestamp: Date;
  
  total_annual_pharmacy_spend: number;
  
  visible_costs: {
    ingredient_cost: number;
    dispensing_fees: number;
    admin_fees: number;
  };
  
  hidden_costs: {
    spread_markup: number;
    retained_rebates: number;
    specialty_markups: number;
    mail_mandate_premium: number;
  };
  
  revenue_streams: RevenueStream[];
  arbitrage_opportunities: ArbitrageOpportunity[];
  
  total_identified_arbitrage: number;
  confidence_weighted_savings: number;
  
  assumptions: FinancialAssumption[];
  sensitivity_analysis: SensitivityScenario[];
}

export interface FinancialAssumption {
  assumption_id: string;
  category: string;
  description: string;
  value: number | string;
  source: "contract" | "market_data" | "industry_benchmark" | "estimated";
  confidence: number;
}

export interface SensitivityScenario {
  scenario_name: string;
  variable_changed: string;
  change_percentage: number;
  impact_on_savings: number;
  likelihood: "high" | "medium" | "low";
}

export interface ActuarialReport {
  report_id: string;
  contract_id: string;
  generated_timestamp: Date;
  
  executive_summary: {
    total_annual_spend: number;
    identified_arbitrage: number;
    arbitrage_as_percentage: number;
    high_priority_opportunities: number;
    estimated_implementation_timeline: string;
  };
  
  detailed_findings: ArbitrageOpportunity[];
  financial_model: FinancialModel;
  
  board_recommendations: string[];
  implementation_roadmap: ImplementationPhase[];
  
  audit_trail: AuditEntry[];
}

export interface ImplementationPhase {
  phase_number: number;
  phase_name: string;
  opportunities_addressed: string[];
  estimated_savings: number;
  implementation_months: number;
  prerequisites: string[];
  risk_factors: string[];
}

export interface AuditEntry {
  timestamp: Date;
  action: string;
  actor: string;
  details: Record<string, any>;
}

export interface ContractProcessingPipeline {
  upload: ContractUpload;
  parsed_contract?: ParsedContract;
  financial_model?: FinancialModel;
  actuarial_report?: ActuarialReport;
  current_stage: "upload" | "parsing" | "modeling" | "reporting" | "complete";
  errors?: string[];
}