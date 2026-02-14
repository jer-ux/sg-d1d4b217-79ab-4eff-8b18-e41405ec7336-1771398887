// Kincaid IQ Advanced Actuarial Calculation Engine
// Credibility-Weighted Multi-Year Forecasting with Trend Decomposition

import type { 
  ClaimsUpload, 
  CensusUpload, 
  TrendProjection, 
  Intervention,
  TrendComponents,
  CredibilityWeights,
  SavingsDurability 
} from "./types";

/**
 * CREDIBILITY THEORY - Limited Fluctuation Method
 * Z = min(1, sqrt(n / N))
 * Where n = actual lives, N = full credibility threshold (default 1000)
 */
export function calculateCredibilityFactor(
  actualLives: number,
  fullCredibilityThreshold: number = 1000
): number {
  return Math.min(1, Math.sqrt(actualLives / fullCredibilityThreshold));
}

/**
 * Apply credibility weighting to blend group-specific and benchmark trends
 * Blended = (Z × group_trend) + ((1 - Z) × benchmark_trend)
 */
export function applyCredibilityWeighting(
  groupTrend: number,
  benchmarkTrend: number,
  lives: number,
  fullCredibilityThreshold: number = 1000
): CredibilityWeights {
  const zFactor = calculateCredibilityFactor(lives, fullCredibilityThreshold);
  const groupWeight = zFactor;
  const benchmarkWeight = 1 - zFactor;
  const blendedTrend = (groupWeight * groupTrend) + (benchmarkWeight * benchmarkTrend);

  return {
    z_factor: zFactor,
    group_specific_weight: groupWeight,
    industry_benchmark_weight: benchmarkWeight,
    blended_trend: blendedTrend,
    methodology: `Limited Fluctuation Credibility (${lives} lives, ${fullCredibilityThreshold} threshold)`,
  };
}

/**
 * TREND DECOMPOSITION - Separate medical, Rx, and catastrophic components
 * Total Trend = Medical Core + Rx Core + Catastrophic Load
 */
export function decomposeTrend(
  claims: ClaimsUpload,
  industryMedicalTrend: number = 0.065, // 6.5% default
  industryRxTrend: number = 0.09, // 9% default
  catastrophicLoadFactor: number = 0.02 // 2% default
): TrendComponents {
  const totalCost = claims.medical_total + claims.rx_total + claims.admin_fees + claims.stop_loss_premium;
  const medicalWeight = claims.medical_total / totalCost;
  const rxWeight = claims.rx_total / totalCost;

  // Weight trends by actual cost distribution
  const medicalCore = industryMedicalTrend * medicalWeight;
  const rxCore = industryRxTrend * rxWeight;
  
  // Add catastrophic load (usually 1-3%)
  const catastrophicLoad = catastrophicLoadFactor;

  return {
    medical_core: medicalCore,
    rx_core: rxCore,
    catastrophic_load: catastrophicLoad,
    total_trend: medicalCore + rxCore + catastrophicLoad,
  };
}

/**
 * Project costs with decomposed trends
 * Allows independent manipulation of medical, Rx, and catastrophic components
 */
export function projectCostWithDecomposition(
  baseCost: number,
  medicalTrend: number,
  rxTrend: number,
  catastrophicLoad: number,
  years: number
): number {
  const compositeTrend = medicalTrend + rxTrend + catastrophicLoad;
  return baseCost * Math.pow(1 + compositeTrend, years);
}

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
 * Project future healthcare costs with simple trend
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
 * ADVANCED: Generate multi-year credibility-weighted trend projection
 * Incorporates trend decomposition and credibility factors
 */
export function generateAdvancedTrendProjection(
  baselinePEPM: number,
  avgLives: number,
  trendComponents: TrendComponents,
  modeledMedicalTrend: number,
  modeledRxTrend: number,
  catastrophicLoad: number,
  credibilityFactor: number,
  years: number = 3
): TrendProjection[] {
  const projections: TrendProjection[] = [];
  let cumulativeSavings = 0;
  const annualBaseCost = baselinePEPM * avgLives * 12;

  for (let year = 0; year <= years; year++) {
    // Baseline projection with full trend components
    const baselineCost = projectCostWithDecomposition(
      annualBaseCost,
      trendComponents.medical_core,
      trendComponents.rx_core,
      trendComponents.catastrophic_load,
      year
    );

    // Modeled projection with intervention-adjusted trends
    const modeledCost = projectCostWithDecomposition(
      annualBaseCost,
      modeledMedicalTrend,
      modeledRxTrend,
      catastrophicLoad,
      year
    );

    const yearSavings = baselineCost - modeledCost;
    cumulativeSavings += yearSavings;

    projections.push({
      year: new Date().getFullYear() + year,
      baseline_cost: Math.round(baselineCost),
      modeled_cost: Math.round(modeledCost),
      savings: Math.round(yearSavings),
      cumulative_savings: Math.round(cumulativeSavings),
      medical_component: trendComponents.medical_core,
      rx_component: trendComponents.rx_core,
      catastrophic_component: trendComponents.catastrophic_load,
      credibility_adjusted: true,
    });
  }

  return projections;
}

/**
 * Generate simple multi-year trend projection (backward compatible)
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
 * Calculate savings durability over multi-year period
 * Models decay of intervention effectiveness over time
 */
export function calculateSavingsDurability(
  interventions: Intervention[],
  baseSavings: number
): SavingsDurability {
  // Average durability across interventions
  const avgDurability = interventions.reduce((sum, i) => 
    sum + (i.durability_years || 3), 0) / interventions.length;
  
  // Decay rate (savings erode over time)
  const decayRate = 1 / avgDurability * 0.15; // 15% erosion per durability year
  
  // Confidence based on intervention mix
  const highConfInterventions = interventions.filter(i => i.confidence === "high").length;
  const confidenceScore = highConfInterventions / interventions.length;

  return {
    year_1: baseSavings,
    year_2: baseSavings * (1 - decayRate),
    year_3: baseSavings * Math.pow(1 - decayRate, 2),
    decay_rate: decayRate,
    confidence_score: confidenceScore,
  };
}

/**
 * Calculate total savings from multiple interventions with ramp-up curves
 */
export function calculateInterventionSavings(
  currentAnnualCost: number,
  interventions: Intervention[],
  year: number = 1
): number {
  let totalSavingsPercent = 0;

  interventions.forEach(intervention => {
    let savingsPercent = intervention.expected_savings_percent / 100;
    
    // Apply ramp-up curve
    if (year === 1 && intervention.ramp_up_curve === "linear") {
      savingsPercent *= 0.5; // 50% in year 1
    } else if (year === 1 && intervention.ramp_up_curve === "sigmoid") {
      savingsPercent *= 0.3; // 30% in year 1
    }
    
    // Interventions compound (not additive)
    const remainingCost = 1 - totalSavingsPercent;
    totalSavingsPercent += remainingCost * savingsPercent;
  });

  return currentAnnualCost * totalSavingsPercent;
}

/**
 * Normalize claims data to standard PEPM format with decomposition
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
  medical_weight: number;
  rx_weight: number;
} {
  const months = 12;
  const totalMembers = lives * months;
  const totalCost = medical + rx + admin + stopLoss;

  return {
    pepm: totalCost / totalMembers,
    medical_pepm: medical / totalMembers,
    rx_pepm: rx / totalMembers,
    admin_pepm: admin / totalMembers,
    stop_loss_pepm: stopLoss / totalMembers,
    medical_weight: medical / totalCost,
    rx_weight: rx / totalCost,
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
  const targetMultiplier = 1 - (targetSavingsPercent / 100);
  const baselineMultiplier = Math.pow(1 + baselineTrend, years);
  const requiredMultiplier = targetMultiplier * baselineMultiplier;
  const modeledTrend = Math.pow(requiredMultiplier, 1 / years) - 1;
  
  return baselineTrend - modeledTrend;
}

/**
 * Calculate Large Claims Impact (claims > $100k)
 * These require separate modeling as they distort trend
 */
export function calculateLargeClaimsImpact(
  largeClaimsTotal: number,
  totalClaims: number
): {
  large_claims_percent: number;
  trend_distortion: number;
  adjustment_factor: number;
} {
  const largeClaimsPercent = largeClaimsTotal / totalClaims;
  
  // Large claims create 2-4% trend distortion
  const trendDistortion = largeClaimsPercent * 0.04;
  
  // Adjustment factor to normalize trend
  const adjustmentFactor = 1 - trendDistortion;

  return {
    large_claims_percent: largeClaimsPercent,
    trend_distortion: trendDistortion,
    adjustment_factor: adjustmentFactor,
  };
}

/**
 * FastAPI Integration Helper
 * Formats data for backend scenario modeling endpoint
 */
export function formatScenarioInput(
  claims: ClaimsUpload,
  census: CensusUpload,
  baselineTrend: number,
  modeledTrend: number,
  revenue: number
) {
  const avgLives = calculateAverageLives(census);
  
  return {
    medical: claims.medical_total,
    rx: claims.rx_total,
    admin: claims.admin_fees,
    stop_loss: claims.stop_loss_premium,
    start_lives: census.employee_count_start,
    end_lives: census.employee_count_end,
    trend: baselineTrend,
    modeled_trend: modeledTrend,
    revenue: revenue,
    // Advanced fields
    large_claims_over_100k: claims.large_claims_over_100k || 0,
    specialty_rx_total: claims.specialty_rx_total || 0,
    avg_lives: avgLives,
  };
}