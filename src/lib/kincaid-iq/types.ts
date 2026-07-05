// Core Kincaid Health Types - Advanced Actuarial Benefits Platform

export type User = {
  id: string;
  email: string;
  org_name: string;
  role: "admin" | "analyst" | "viewer";
  created_at: string;
};

export type Organization = {
  id: string;
  name: string;
  industry: string;
  total_lives: number;
  current_pepm: number;
  baseline_trend: number;
  revenue?: number;
};

export type CensusUpload = {
  id: string;
  org_id: string;
  employee_count_start: number;
  employee_count_end: number;
  avg_salary: number;
  timestamp: string;
};

export type ClaimsUpload = {
  id: string;
  org_id: string;
  medical_total: number;
  rx_total: number;
  stop_loss_premium: number;
  admin_fees: number;
  period_start: string;
  period_end: string;
  // Advanced decomposition fields
  large_claims_over_100k?: number;
  specialty_rx_total?: number;
  inpatient_total?: number;
  outpatient_total?: number;
  professional_total?: number;
};

export type TrendComponents = {
  medical_core: number;
  rx_core: number;
  catastrophic_load: number;
  total_trend: number;
};

export type Scenario = {
  id: string;
  org_id: string;
  baseline_trend: number;
  modeled_trend: number;
  vendor_shift_savings: number;
  intervention_savings: number;
  net_savings: number;
  ebitda_impact: number;
  created_at: string;
  // Advanced credibility fields
  credibility_factor?: number;
  medical_trend_component?: number;
  rx_trend_component?: number;
  catastrophic_load?: number;
  three_year_savings_total?: number;
  savings_durability_score?: number;
};

export type InterventionType = 
  | "vendor_switch"
  | "benefit_redesign"
  | "wellness_program"
  | "pbm_optimization"
  | "stop_loss_adjustment"
  | "network_steering"
  | "pharmacy_carveout"
  | "reference_based_pricing"
  | "direct_contracting";

export type Intervention = {
  type: InterventionType;
  name: string;
  expected_savings_percent: number;
  confidence: "low" | "medium" | "high";
  implementation_months: number;
  durability_years?: number; // How long savings persist
  ramp_up_curve?: "immediate" | "linear" | "sigmoid";
};

export type TrendProjection = {
  year: number;
  baseline_cost: number;
  modeled_cost: number;
  savings: number;
  cumulative_savings: number;
  // Advanced projection fields
  medical_component?: number;
  rx_component?: number;
  catastrophic_component?: number;
  credibility_adjusted?: boolean;
};

export type AssumptionLineage = {
  id: string;
  scenario_id: string;
  field_name: string;
  formula_used: string;
  source_reference: string;
  timestamp: string;
  computed_value: number;
};

export type SavingsDurability = {
  year_1: number;
  year_2: number;
  year_3: number;
  decay_rate: number;
  confidence_score: number;
};

export type CredibilityWeights = {
  z_factor: number;
  group_specific_weight: number;
  industry_benchmark_weight: number;
  blended_trend: number;
  methodology: string;
};

// === RX CLAIMS INTELLIGENCE TYPES ===

export type RxClaim = {
  id: string;
  ndc: string; // National Drug Code
  drug_name?: string;
  pharmacy_npi?: string;
  pharmacy_name?: string;
  fill_date: string;
  days_supply: number;
  quantity: number;
  paid_amount: number; // Total plan paid
  member_copay?: number;
  awp?: number; // Average Wholesale Price
  rebate_amount?: number; // Manufacturer rebate (if observable)
  is_generic?: boolean;
  is_specialty?: boolean;
};

export type DRAPAnalysis = {
  total_paid: number;
  total_allowable: number;
  total_drap: number; // Delta Realized vs Allowable Pricing
  drap_percent: number;
  claims_analyzed: number;
  claims_with_spread: number;
  spread_prevalence: number;
  claim_breakdown: Array<{
    claim_id: string;
    ndc: string;
    paid: number;
    allowable: number;
    spread: number;
    spread_percent: number;
  }>;
};

export type SpreadAnalysis = {
  top_pharmacies: Array<{
    pharmacy: string;
    total_spread: number;
    claim_count: number;
    avg_spread_per_claim: number;
    spread_percent: number;
  }>;
  top_ndcs: Array<{
    ndc: string;
    drug_name: string;
    total_spread: number;
    claim_count: number;
    avg_spread_per_claim: number;
  }>;
  systematic_spread_detected: boolean;
};

export type RebateReconstruction = {
  total_rebate_estimate: number;
  total_observed_rebate: number;
  rebate_coverage: number; // % of rebates directly observable vs inferred
  claim_rebates: Array<{
    claim_id: string;
    rebate_amount: number;
    estimation_method: "observed" | "class_inference";
    confidence: "low" | "medium" | "high";
    drug_class?: string;
  }>;
  methodology: string;
};

export type ContractTerms = {
  pricing_model: "nadac_plus" | "awp_minus" | "mac" | "ingredient_cost";
  markup_percent?: number; // For NADAC+ models
  discount_percent?: number; // For AWP- models
  max_spread_percent?: number; // Maximum allowable spread
  min_rebate_passthrough_percent?: number; // Minimum % of rebates to pass through
  min_generic_fill_rate?: number; // Minimum generic utilization %
  performance_guarantees?: string[];
};

export type ContractCompliance = {
  overall_score: number; // 0-100
  guarantees_met: number;
  guarantees_total: number;
  guarantees: Array<{
    name: string;
    target: number;
    actual: number;
    met: boolean;
    variance_dollars: number;
  }>;
  total_recoverable_dollars: number;
  fiduciary_risk_flags: Array<{
    flag: string;
    severity: "low" | "medium" | "high" | "critical";
    exposure_dollars: number;
  }>;
};

export type LeakageDriver = {
  category: "ndc" | "pharmacy" | "temporal" | "contract_clause";
  identifier: string;
  description: string;
  total_leakage: number;
  claim_count: number;
  priority: "low" | "medium" | "high" | "critical";
};

export type ExecutiveReport = {
  executive_summary: {
    total_spend: number;
    total_drap: number;
    drap_percent: number;
    compliance_score: number;
    ebitda_impact_bps: number; // basis points
    top_drivers: Array<{
      description: string;
      impact_dollars: number;
      impact_ebitda_bps: number;
    }>;
  };
  financial_reconstruction: {
    total_paid: number;
    total_allowable: number;
    total_spread: number;
    spread_prevalence: number;
    estimated_rebates: number;
    observed_rebates: number;
    net_plan_cost: number;
  };
  leakage_analysis: {
    top_ndcs: Array<{
      ndc: string;
      drug_name: string;
      total_spread: number;
      claim_count: number;
      avg_spread_per_claim: number;
    }>;
    top_pharmacies: Array<{
      pharmacy: string;
      total_spread: number;
      claim_count: number;
      avg_spread_per_claim: number;
      spread_percent: number;
    }>;
    systematic_spread: boolean;
    temporal_drivers: LeakageDriver[];
  };
  contract_performance: {
    overall_score: number;
    guarantees_met: number;
    guarantees_total: number;
    guarantees: Array<{
      name: string;
      target: number;
      actual: number;
      met: boolean;
      variance_dollars: number;
    }>;
    total_recoverable: number;
    fiduciary_risk_flags: Array<{
      flag: string;
      severity: "low" | "medium" | "high" | "critical";
      exposure_dollars: number;
    }>;
  };
  actionable_strategy: {
    immediate_recovery: Array<{
      action: string;
      estimated_recovery: number;
      timeline: string;
      difficulty: "low" | "medium" | "high";
    }>;
    contract_leverage: string[];
    structural_recommendations: string[];
  };
  metadata: {
    analysis_date: string;
    claims_analyzed: number;
    date_range: {
      start: string | null;
      end: string | null;
    };
    confidence_level: "low" | "medium" | "high";
  };
};