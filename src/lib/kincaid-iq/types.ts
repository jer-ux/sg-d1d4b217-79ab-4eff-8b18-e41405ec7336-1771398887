// Core Kincaid IQ Types - Advanced Actuarial Benefits Platform

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