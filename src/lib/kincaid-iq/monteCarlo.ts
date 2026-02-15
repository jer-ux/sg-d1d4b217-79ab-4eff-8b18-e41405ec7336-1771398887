/**
 * Monte Carlo Volatility Engine
 * Stochastic modeling for healthcare cost projections
 */

export type MonteCarloResult = {
  mean: number;
  median: number;
  p75: number;
  p90: number;
  p95: number;
  p99: number;
  std_deviation: number;
  coefficient_of_variation: number;
  distribution_sample: number[];
};

export type VolatilityProfile = {
  base_volatility: number;
  catastrophic_load_variance: number;
  trend_uncertainty: number;
  lives_fluctuation: number;
};

export type FanChartDataPoint = {
  year: number;
  baseline: number;
  p50: number;
  p75: number;
  p90: number;
  p95: number;
};

/**
 * Generate random samples from log-normal distribution
 * Standard for healthcare claims modeling
 */
function generateLogNormalSample(
  mean: number,
  volatility: number,
  iterations: number
): number[] {
  const samples: number[] = [];
  
  for (let i = 0; i < iterations; i++) {
    // Box-Muller transform for normal distribution
    const u1 = Math.random();
    const u2 = Math.random();
    const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    
    // Convert to log-normal
    const logMean = Math.log(mean) - (volatility * volatility) / 2;
    const sample = Math.exp(logMean + volatility * z);
    
    samples.push(sample);
  }
  
  return samples;
}

/**
 * Calculate percentiles from distribution
 */
function calculatePercentile(values: number[], percentile: number): number {
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.ceil((percentile / 100) * sorted.length) - 1;
  return sorted[Math.max(0, index)];
}

/**
 * Run Monte Carlo simulation for single year projection
 */
export function runMonteCarloSimulation(
  baseCost: number,
  trendRate: number,
  volatility: number,
  iterations: number = 5000
): MonteCarloResult {
  const projections: number[] = [];
  
  for (let i = 0; i < iterations; i++) {
    // Generate random trend shock
    const u1 = Math.random();
    const u2 = Math.random();
    const trendShock = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    
    // Apply shock to trend
    const adjustedTrend = trendRate + (trendShock * volatility);
    
    // Project cost with adjusted trend
    const projectedCost = baseCost * (1 + adjustedTrend);
    
    projections.push(projectedCost);
  }
  
  // Calculate statistics
  const mean = projections.reduce((sum, val) => sum + val, 0) / projections.length;
  const median = calculatePercentile(projections, 50);
  const p75 = calculatePercentile(projections, 75);
  const p90 = calculatePercentile(projections, 90);
  const p95 = calculatePercentile(projections, 95);
  const p99 = calculatePercentile(projections, 99);
  
  // Standard deviation
  const variance = projections.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / projections.length;
  const stdDev = Math.sqrt(variance);
  
  // Coefficient of variation (volatility measure)
  const cv = stdDev / mean;
  
  return {
    mean,
    median,
    p75,
    p90,
    p95,
    p99,
    std_deviation: stdDev,
    coefficient_of_variation: cv,
    distribution_sample: projections.slice(0, 500), // First 500 for charting
  };
}

/**
 * Multi-year Monte Carlo projection with compounding
 */
export function runMultiYearMonteCarlo(
  baseCost: number,
  trendRate: number,
  volatilityProfile: VolatilityProfile,
  years: number = 5,
  iterations: number = 5000
): FanChartDataPoint[] {
  const results: FanChartDataPoint[] = [];
  
  // Year 0 (current)
  results.push({
    year: 0,
    baseline: baseCost,
    p50: baseCost,
    p75: baseCost,
    p90: baseCost,
    p95: baseCost,
  });
  
  // Project each year
  for (let year = 1; year <= years; year++) {
    const yearProjections: number[] = [];
    
    for (let i = 0; i < iterations; i++) {
      let projectedCost = baseCost;
      
      // Compound each year with random shocks
      for (let y = 1; y <= year; y++) {
        // Generate correlated shocks
        const trendShock = (Math.random() - 0.5) * 2 * volatilityProfile.trend_uncertainty;
        const catShock = (Math.random() - 0.5) * 2 * volatilityProfile.catastrophic_load_variance;
        const livesShock = (Math.random() - 0.5) * 2 * volatilityProfile.lives_fluctuation;
        
        const totalShock = trendShock + catShock + livesShock;
        const adjustedTrend = trendRate + totalShock;
        
        projectedCost *= (1 + adjustedTrend);
      }
      
      yearProjections.push(projectedCost);
    }
    
    // Calculate percentiles for this year
    const p50 = calculatePercentile(yearProjections, 50);
    const p75 = calculatePercentile(yearProjections, 75);
    const p90 = calculatePercentile(yearProjections, 90);
    const p95 = calculatePercentile(yearProjections, 95);
    
    // Baseline (deterministic)
    const baseline = baseCost * Math.pow(1 + trendRate, year);
    
    results.push({
      year,
      baseline,
      p50,
      p75,
      p90,
      p95,
    });
  }
  
  return results;
}

/**
 * Estimate volatility profile from historical data
 */
export function estimateVolatilityProfile(
  historicalCosts: number[],
  historicalLives: number[]
): VolatilityProfile {
  if (historicalCosts.length < 2) {
    // Default conservative profile
    return {
      base_volatility: 0.12,
      catastrophic_load_variance: 0.05,
      trend_uncertainty: 0.03,
      lives_fluctuation: 0.02,
    };
  }
  
  // Calculate year-over-year growth rates
  const growthRates: number[] = [];
  for (let i = 1; i < historicalCosts.length; i++) {
    const rate = (historicalCosts[i] - historicalCosts[i - 1]) / historicalCosts[i - 1];
    growthRates.push(rate);
  }
  
  // Standard deviation of growth rates
  const meanRate = growthRates.reduce((sum, r) => sum + r, 0) / growthRates.length;
  const variance = growthRates.reduce((sum, r) => sum + Math.pow(r - meanRate, 2), 0) / growthRates.length;
  const trendUncertainty = Math.sqrt(variance);
  
  // Lives fluctuation
  const livesFluctuation = historicalLives.length > 1
    ? Math.abs((historicalLives[historicalLives.length - 1] - historicalLives[0]) / historicalLives[0])
    : 0.02;
  
  return {
    base_volatility: trendUncertainty * 1.5,
    catastrophic_load_variance: 0.05, // Industry standard
    trend_uncertainty: trendUncertainty,
    lives_fluctuation: Math.min(livesFluctuation, 0.1),
  };
}

/**
 * Calculate Value at Risk (VaR) and Conditional VaR (CVaR)
 */
export function calculateRiskMetrics(
  distribution: number[],
  confidenceLevel: number = 0.95
): {
  var: number;
  cvar: number;
  expected_shortfall: number;
} {
  const sorted = [...distribution].sort((a, b) => a - b);
  const varIndex = Math.floor(confidenceLevel * sorted.length);
  const varValue = sorted[varIndex];
  
  // CVaR (average of tail beyond VaR)
  const tailValues = sorted.slice(varIndex);
  const cvar = tailValues.reduce((sum, val) => sum + val, 0) / tailValues.length;
  
  // Expected shortfall (difference from median)
  const median = calculatePercentile(sorted, 50);
  const expectedShortfall = cvar - median;
  
  return {
    var: varValue,
    cvar,
    expected_shortfall: expectedShortfall,
  };
}

/**
 * Probability of exceeding threshold
 */
export function calculateExceedanceProbability(
  distribution: number[],
  threshold: number
): number {
  const exceedances = distribution.filter(val => val > threshold).length;
  return exceedances / distribution.length;
}

/**
 * Generate confidence intervals for intervention scenarios
 */
export function compareScenarioUncertainty(
  baselineResult: MonteCarloResult,
  modeledResult: MonteCarloResult
): {
  savings_p50: number;
  savings_p90: number;
  probability_of_savings: number;
  risk_reduction_score: number;
} {
  const savingsP50 = baselineResult.median - modeledResult.median;
  const savingsP90 = baselineResult.p90 - modeledResult.p90;
  
  // Probability that modeled < baseline (i.e., savings achieved)
  const baselineSample = baselineResult.distribution_sample;
  const modeledSample = modeledResult.distribution_sample;
  
  let savingsCount = 0;
  const iterations = Math.min(baselineSample.length, modeledSample.length);
  
  for (let i = 0; i < iterations; i++) {
    if (modeledSample[i] < baselineSample[i]) {
      savingsCount++;
    }
  }
  
  const probabilityOfSavings = savingsCount / iterations;
  
  // Risk reduction (volatility decrease)
  const volatilityReduction = 
    (baselineResult.coefficient_of_variation - modeledResult.coefficient_of_variation) /
    baselineResult.coefficient_of_variation;
  
  const riskReductionScore = Math.max(0, Math.min(100, volatilityReduction * 100));
  
  return {
    savings_p50: savingsP50,
    savings_p90: savingsP90,
    probability_of_savings: probabilityOfSavings,
    risk_reduction_score: riskReductionScore,
  };
}