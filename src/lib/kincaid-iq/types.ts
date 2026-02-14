// Core Kincaid IQ Types - Actuarial Benefits Platform

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
};

export type InterventionType = 
  | "vendor_switch"
  | "benefit_redesign"
  | "wellness_program"
  | "pbm_optimization"
  | "stop_loss_adjustment"
  | "network_steering";

export type Intervention = {
  type: InterventionType;
  name: string;
  expected_savings_percent: number;
  confidence: "low" | "medium" | "high";
  implementation_months: number;
};

export type TrendProjection = {
  year: number;
  baseline_cost: number;
  modeled_cost: number;
  savings: number;
  cumulative_savings: number;
};