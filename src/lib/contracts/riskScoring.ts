import type { ProvisionAnalysis, RiskAssessment, RiskFactor } from "./types";

/**
 * Advanced risk scoring algorithms for contract analysis
 */

export function calculateRiskScore(provisions: ProvisionAnalysis[]): number {
  // Weighted scoring based on provision importance
  const weights: Record<string, number> = {
    "Rebate Pass-Through": 0.20,
    "Specialty Drug Management": 0.18,
    "Pricing Transparency": 0.15,
    "MAC Pricing": 0.12,
    "Audit Rights": 0.10,
    "Data Access Rights": 0.08,
    "Termination Clauses": 0.07,
    "Network Adequacy": 0.05,
    "Performance Guarantees": 0.03,
    "Dispute Resolution": 0.02
  };

  let totalScore = 0;
  let totalWeight = 0;

  provisions.forEach(provision => {
    const weight = weights[provision.name] || 0.05;
    totalScore += provision.score * weight;
    totalWeight += weight;
  });

  return Math.round(totalScore / totalWeight);
}

export function generateRiskAssessment(provisions: ProvisionAnalysis[]): RiskAssessment {
  const riskFactors = provisions
    .filter(p => p.score < 75)
    .map(p => ({
      category: p.name,
      severity: p.riskLevel,
      description: p.description,
      likelihood: 100 - p.score,
      impact: calculateImpactScore(p.estimatedImpact)
    }));

  const overallRiskScore = calculateRiskScore(provisions);
  const overallRisk = determineOverallRisk(overallRiskScore, riskFactors.length);

  return {
    overallRisk,
    riskScore: overallRiskScore,
    riskFactors,
    mitigationStrategies: generateMitigationStrategies(riskFactors)
  };
}

function calculateImpactScore(dollarImpact: number): number {
  // Convert dollar impact to 0-100 scale
  // $0-$250K = 0-25
  // $250K-$750K = 25-50
  // $750K-$1.5M = 50-75
  // $1.5M+ = 75-100
  
  if (dollarImpact <= 250000) return (dollarImpact / 250000) * 25;
  if (dollarImpact <= 750000) return 25 + ((dollarImpact - 250000) / 500000) * 25;
  if (dollarImpact <= 1500000) return 50 + ((dollarImpact - 750000) / 750000) * 25;
  return Math.min(100, 75 + ((dollarImpact - 1500000) / 1500000) * 25);
}

function determineOverallRisk(
  score: number,
  criticalFactorCount: number
): 'Low' | 'Medium' | 'High' | 'Critical' {
  if (score >= 85 && criticalFactorCount <= 1) return 'Low';
  if (score >= 70 && criticalFactorCount <= 3) return 'Medium';
  if (score >= 55 || criticalFactorCount <= 5) return 'High';
  return 'Critical';
}

function generateMitigationStrategies(riskFactors: RiskFactor[]): string[] {
  const strategies: string[] = [
    "Engage experienced PBM contract negotiation counsel immediately",
    "Request detailed cost and rebate data for the past 12 months",
    "Conduct competitive RFP with at least 3 alternative PBMs",
    "Implement quarterly contract compliance audits"
  ];

  // Add specific strategies based on risk factors
  riskFactors.forEach(factor => {
    if (factor.category === "Rebate Pass-Through" && factor.severity !== 'Low') {
      strategies.push("Demand 100% rebate pass-through with detailed quarterly reconciliation");
    }
    if (factor.category === "Specialty Drug Management" && factor.severity !== 'Low') {
      strategies.push("Negotiate cost-plus pricing for specialty drugs with network choice provisions");
    }
    if (factor.category === "Audit Rights" && factor.severity !== 'Low') {
      strategies.push("Secure unrestricted audit rights including data extraction capabilities");
    }
    if (factor.category === "MAC Pricing" && factor.severity !== 'Low') {
      strategies.push("Require monthly MAC list updates with independent pricing benchmarks");
    }
  });

  // Remove duplicates and limit to top 8
  return Array.from(new Set(strategies)).slice(0, 8);
}

/**
 * Calculate financial risk exposure
 */
export function calculateFinancialExposure(provisions: ProvisionAnalysis[]): {
  minExposure: number;
  maxExposure: number;
  expectedExposure: number;
  confidenceInterval: [number, number];
} {
  const impacts = provisions.map(p => p.estimatedImpact);
  const totalImpact = impacts.reduce((sum, i) => sum + i, 0);
  
  // Conservative estimate: 40-80% of identified impact may materialize
  const minExposure = Math.round(totalImpact * 0.40);
  const maxExposure = Math.round(totalImpact * 0.80);
  const expectedExposure = Math.round(totalImpact * 0.60);
  
  // 95% confidence interval
  const stdDev = (maxExposure - minExposure) / 4; // Rough estimate
  const confidenceInterval: [number, number] = [
    Math.max(0, expectedExposure - 1.96 * stdDev),
    expectedExposure + 1.96 * stdDev
  ];

  return {
    minExposure,
    maxExposure,
    expectedExposure,
    confidenceInterval
  };
}

/**
 * Benchmark contract against industry standards
 */
export function benchmarkContract(provisions: ProvisionAnalysis[]): {
  percentileRank: number;
  comparison: 'Below Average' | 'Average' | 'Above Average' | 'Excellent';
  industryMedian: number;
  yourScore: number;
} {
  const yourScore = calculateRiskScore(provisions);
  
  // Industry benchmarks (based on analyzed contracts)
  const industryMedian = 72;
  const percentile25 = 64;
  const percentile75 = 81;
  const percentile90 = 88;

  let percentileRank: number;
  let comparison: 'Below Average' | 'Average' | 'Above Average' | 'Excellent';

  if (yourScore >= percentile90) {
    percentileRank = 90;
    comparison = 'Excellent';
  } else if (yourScore >= percentile75) {
    percentileRank = 75;
    comparison = 'Above Average';
  } else if (yourScore >= percentile25) {
    percentileRank = 50;
    comparison = 'Average';
  } else {
    percentileRank = 25;
    comparison = 'Below Average';
  }

  return {
    percentileRank,
    comparison,
    industryMedian,
    yourScore
  };
}