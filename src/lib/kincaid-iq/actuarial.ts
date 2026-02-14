// Kincaid IQ Actuarial Calculation Engine

import type { ClaimsUpload, CensusUpload, TrendProjection, Intervention } from "./types";

/**
 * Calculate Per Employee Per Month (PEPM) cost
 * Formula: (annual_medical + annual_rx + admin + stop_loss) / average_lives / 12
 */
export function calculatePEPM(claims: ClaimsUpload, avgLives: number): number {
  const totalAnnualCost = 
    claims.medical_total + 
    claims.rx_total + 
    claims.admin_fees + 
    claims.stop_loss_premium;
  
  return totalAnnualCost / avgLives / 12;
}

/**
 * Calculate average lives over a period
 * Formula: (start_lives + end_lives) / 2
 */
export function calculateAverageLives(census: CensusUpload): number {
  return (census.employee_count_start + census.employee_count_end) / 2;
}

/**
 * Project future healthcare costs with trend
 * Formula: future_cost = current_cost * (1 + trend_rate) ** years
 */
export function projectTrend(
  currentCost: number,
  trendRate: number,
  years: number
): number {
  return currentCost * Math.pow(1 + trendRate, years);
}

/**
 * Calculate EBITDA sensitivity from healthcare savings
 * Formula: ebitda_delta = net_savings / revenue
 */
export function calculateEBITDAImpact(
  netSavings: number,
  revenue: number
): number {
  if (revenue === 0) return 0;
  return (netSavings / revenue) * 100; // Return as percentage
}

/**
 * Generate multi-year trend projection with interventions
 */
export function generateTrendProjection(
  baselinePEPM: number,
  avgLives: number,
  baselineTrend: number,
  modeledTrend: number,
  years: number = 5
): TrendProjection[] {
  const projections: TrendProjection[] = [];
  let cumulativeSavings = 0;

  for (let year = 0; year <= years; year++) {
    const baselineCost = projectTrend(baselinePEPM * avgLives * 12, baselineTrend, year);
    const modeledCost = projectTrend(baselinePEPM * avgLives * 12, modeledTrend, year);
    const yearSavings = baselineCost - modeledCost;
    cumulativeSavings += yearSavings;

    projections.push({
      year: new Date().getFullYear() + year,
      baseline_cost: Math.round(baselineCost),
      modeled_cost: Math.round(modeledCost),
      savings: Math.round(yearSavings),
      cumulative_savings: Math.round(cumulativeSavings),
    });
  }

  return projections;
}

/**
 * Calculate total savings from multiple interventions
 */
export function calculateInterventionSavings(
  currentAnnualCost: number,
  interventions: Intervention[]
): number {
  let totalSavingsPercent = 0;

  // Interventions compound (not additive)
  interventions.forEach(intervention => {
    const remainingCost = 1 - totalSavingsPercent;
    totalSavingsPercent += remainingCost * (intervention.expected_savings_percent / 100);
  });

  return currentAnnualCost * totalSavingsPercent;
}

/**
 * Normalize claims data to standard PEPM format
 */
export function normalizeClaims(
  medical: number,
  rx: number,
  admin: number,
  stopLoss: number,
  lives: number
): {
  pepm: number;
  medical_pepm: number;
  rx_pepm: number;
  admin_pepm: number;
  stop_loss_pepm: number;
} {
  const months = 12;
  const totalMembers = lives * months;

  return {
    pepm: (medical + rx + admin + stopLoss) / totalMembers,
    medical_pepm: medical / totalMembers,
    rx_pepm: rx / totalMembers,
    admin_pepm: admin / totalMembers,
    stop_loss_pepm: stopLoss / totalMembers,
  };
}

/**
 * Calculate target PEPM to achieve desired savings
 */
export function calculateTargetPEPM(
  currentPEPM: number,
  targetSavingsPercent: number
): number {
  return currentPEPM * (1 - targetSavingsPercent / 100);
}

/**
 * Calculate required trend reduction to hit target
 */
export function calculateRequiredTrendReduction(
  baselineTrend: number,
  targetSavingsPercent: number,
  years: number
): number {
  // Solve for modeled_trend where savings_percent is achieved over years
  const targetMultiplier = 1 - (targetSavingsPercent / 100);
  const baselineMultiplier = Math.pow(1 + baselineTrend, years);
  const requiredMultiplier = targetMultiplier * baselineMultiplier;
  const modeledTrend = Math.pow(requiredMultiplier, 1 / years) - 1;
  
  return baselineTrend - modeledTrend;
}