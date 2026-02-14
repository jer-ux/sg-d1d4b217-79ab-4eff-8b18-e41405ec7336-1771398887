// Mock data for Kincaid IQ development and demos

import type { Organization, ClaimsUpload, CensusUpload, Intervention } from "./types";

export const mockOrganization: Organization = {
  id: "org_001",
  name: "Acme Manufacturing",
  industry: "Manufacturing",
  total_lives: 1250,
  current_pepm: 845,
  baseline_trend: 0.08, // 8% annual trend
};

export const mockCensus: CensusUpload = {
  id: "census_001",
  org_id: "org_001",
  employee_count_start: 1200,
  employee_count_end: 1300,
  avg_salary: 75000,
  timestamp: new Date().toISOString(),
};

export const mockClaims: ClaimsUpload[] = [
  {
    id: "claims_2024",
    org_id: "org_001",
    medical_total: 9_500_000,
    rx_total: 3_200_000,
    stop_loss_premium: 450_000,
    admin_fees: 125_000,
    period_start: "2024-01-01",
    period_end: "2024-12-31",
  },
  {
    id: "claims_2023",
    org_id: "org_001",
    medical_total: 8_800_000,
    rx_total: 2_950_000,
    stop_loss_premium: 420_000,
    admin_fees: 115_000,
    period_start: "2023-01-01",
    period_end: "2023-12-31",
  },
  {
    id: "claims_2022",
    org_id: "org_001",
    medical_total: 8_200_000,
    rx_total: 2_700_000,
    stop_loss_premium: 390_000,
    admin_fees: 105_000,
    period_start: "2022-01-01",
    period_end: "2022-12-31",
  },
];

export const mockInterventions: Intervention[] = [
  {
    type: "pbm_optimization",
    name: "Pharmacy Benefit Manager Switch",
    expected_savings_percent: 12,
    confidence: "high",
    implementation_months: 6,
  },
  {
    type: "benefit_redesign",
    name: "High Deductible Health Plan Migration",
    expected_savings_percent: 8,
    confidence: "medium",
    implementation_months: 12,
  },
  {
    type: "wellness_program",
    name: "Diabetes Management Program",
    expected_savings_percent: 3,
    confidence: "medium",
    implementation_months: 18,
  },
  {
    type: "network_steering",
    name: "Center of Excellence Network",
    expected_savings_percent: 5,
    confidence: "high",
    implementation_months: 9,
  },
];

export function generateMockScenarios() {
  return [
    {
      id: "scenario_conservative",
      name: "Conservative Approach",
      interventions: [mockInterventions[0]],
      expected_trend_reduction: 0.02,
    },
    {
      id: "scenario_moderate",
      name: "Moderate Transformation",
      interventions: [mockInterventions[0], mockInterventions[1]],
      expected_trend_reduction: 0.035,
    },
    {
      id: "scenario_aggressive",
      name: "Aggressive Cost Compression",
      interventions: mockInterventions,
      expected_trend_reduction: 0.05,
    },
  ];
}