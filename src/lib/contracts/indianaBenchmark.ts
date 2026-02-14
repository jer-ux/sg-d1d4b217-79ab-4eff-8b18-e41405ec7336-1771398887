/**
 * Indiana Benchmark Rebate Oracle
 * Industry-standard rebate benchmarks for contract comparison
 */

import { IndianaRebateBenchmark, ClauseType } from "./types";

/**
 * Indiana rebate benchmarks by drug category
 * Based on industry research and regulatory guidance
 */
export const INDIANA_BENCHMARKS: IndianaRebateBenchmark[] = [
  {
    drug_category: "brand",
    min_rebate_pct: 15.0,
    median_rebate_pct: 22.5,
    max_rebate_pct: 28.0,
    sample_size: 147,
    effective_date: "2024-01-01",
    source: "Indiana HHS Transparency Report 2024",
  },
  {
    drug_category: "generic",
    min_rebate_pct: 65.0,
    median_rebate_pct: 75.0,
    max_rebate_pct: 85.0,
    sample_size: 203,
    effective_date: "2024-01-01",
    source: "Indiana HHS Transparency Report 2024",
  },
  {
    drug_category: "specialty",
    min_rebate_pct: 8.0,
    median_rebate_pct: 15.0,
    max_rebate_pct: 25.0,
    sample_size: 89,
    effective_date: "2024-01-01",
    source: "Indiana HHS Transparency Report 2024",
  },
  {
    drug_category: "biosimilar",
    min_rebate_pct: 10.0,
    median_rebate_pct: 18.0,
    max_rebate_pct: 30.0,
    sample_size: 42,
    effective_date: "2024-01-01",
    source: "Indiana HHS Transparency Report 2024",
  },
];

export class IndianaBenchmarkOracle {
  /**
   * Get benchmark for drug category
   */
  static getBenchmark(
    category: IndianaRebateBenchmark["drug_category"]
  ): IndianaRebateBenchmark | null {
    return INDIANA_BENCHMARKS.find(b => b.drug_category === category) || null;
  }

  /**
   * Compare actual rebate against Indiana benchmark
   */
  static compareRebate(
    category: IndianaRebateBenchmark["drug_category"],
    actualRebatePct: number
  ): {
    benchmark: IndianaRebateBenchmark;
    deviation_from_median: number;
    percentile_rank: number;
    meets_minimum: boolean;
    economic_impact_annual: number;
    recommendation: string;
  } {
    const benchmark = this.getBenchmark(category);
    
    if (!benchmark) {
      throw new Error(`No benchmark found for category: ${category}`);
    }

    const deviation = actualRebatePct - benchmark.median_rebate_pct;
    const meetsMinimum = actualRebatePct >= benchmark.min_rebate_pct;

    // Calculate approximate percentile rank
    const range = benchmark.max_rebate_pct - benchmark.min_rebate_pct;
    const position = actualRebatePct - benchmark.min_rebate_pct;
    const percentileRank = range > 0 ? Math.max(0, Math.min(100, (position / range) * 100)) : 50;

    // Estimate economic impact (assuming $1M annual spend in category)
    const economicImpact = deviation * 10000; // $1M * deviation%

    const recommendation = this.generateRebateRecommendation(
      actualRebatePct,
      benchmark,
      meetsMinimum,
      percentileRank
    );

    return {
      benchmark,
      deviation_from_median: deviation,
      percentile_rank: percentileRank,
      meets_minimum: meetsMinimum,
      economic_impact_annual: economicImpact,
      recommendation,
    };
  }

  /**
   * Analyze contract rebate structure against all benchmarks
   */
  static analyzeRebateStructure(rebates: {
    brand?: number;
    generic?: number;
    specialty?: number;
    biosimilar?: number;
  }): {
    overall_score: number;
    category_scores: Array<{
      category: IndianaRebateBenchmark["drug_category"];
      actual: number;
      benchmark: number;
      gap: number;
      annual_impact: number;
    }>;
    total_annual_impact: number;
    recommendations: string[];
  } {
    const categoryScores: Array<{
      category: IndianaRebateBenchmark["drug_category"];
      actual: number;
      benchmark: number;
      gap: number;
      annual_impact: number;
    }> = [];

    let totalScore = 0;
    let totalImpact = 0;
    const recommendations: string[] = [];

    // Analyze each category
    Object.entries(rebates).forEach(([category, actual]) => {
      if (actual === undefined) return;

      const comparison = this.compareRebate(
        category as IndianaRebateBenchmark["drug_category"],
        actual
      );

      const gap = comparison.deviation_from_median;
      const impact = comparison.economic_impact_annual;

      categoryScores.push({
        category: category as IndianaRebateBenchmark["drug_category"],
        actual,
        benchmark: comparison.benchmark.median_rebate_pct,
        gap,
        annual_impact: impact,
      });

      totalScore += comparison.percentile_rank;
      totalImpact += impact;

      if (!comparison.meets_minimum) {
        recommendations.push(
          `CRITICAL: ${category} rebate (${actual}%) below Indiana minimum (${comparison.benchmark.min_rebate_pct}%)`
        );
      } else if (comparison.percentile_rank < 50) {
        recommendations.push(
          `${category} rebate (${actual}%) below median (${comparison.benchmark.median_rebate_pct}%). Consider renegotiation.`
        );
      }
    });

    const overallScore = categoryScores.length > 0 ? totalScore / categoryScores.length : 0;

    return {
      overall_score: overallScore,
      category_scores: categoryScores,
      total_annual_impact: totalImpact,
      recommendations,
    };
  }

  /**
   * Generate rebate recommendation
   */
  private static generateRebateRecommendation(
    actual: number,
    benchmark: IndianaRebateBenchmark,
    meetsMinimum: boolean,
    percentile: number
  ): string {
    if (!meetsMinimum) {
      return `CRITICAL: Rebate (${actual}%) fails to meet Indiana minimum standard (${benchmark.min_rebate_pct}%). This represents a ${benchmark.min_rebate_pct - actual}% shortfall and potential fiduciary breach. Immediate renegotiation required.`;
    }

    if (percentile < 25) {
      return `BELOW MARKET: Rebate (${actual}%) is in the bottom quartile. Median is ${benchmark.median_rebate_pct}%. Strong negotiating position for improvement.`;
    }

    if (percentile < 50) {
      return `BELOW MEDIAN: Rebate (${actual}%) is below industry median (${benchmark.median_rebate_pct}%). Consider renegotiation at contract renewal.`;
    }

    if (percentile >= 75) {
      return `STRONG PERFORMANCE: Rebate (${actual}%) exceeds median and approaches top quartile. Contract terms are competitive.`;
    }

    return `MARKET RATE: Rebate (${actual}%) is near industry median (${benchmark.median_rebate_pct}%). Terms are reasonable but improvement possible.`;
  }

  /**
   * Calculate weighted rebate score
   */
  static calculateWeightedRebateScore(
    rebates: {
      brand?: number;
      generic?: number;
      specialty?: number;
      biosimilar?: number;
    },
    spending: {
      brand?: number;
      generic?: number;
      specialty?: number;
      biosimilar?: number;
    }
  ): {
    weighted_score: number;
    weighted_gap: number;
    potential_savings: number;
  } {
    let totalSpend = 0;
    let weightedScore = 0;
    let weightedGap = 0;
    let potentialSavings = 0;

    Object.entries(rebates).forEach(([category, actual]) => {
      if (actual === undefined) return;

      const spend = spending[category as keyof typeof spending] || 0;
      totalSpend += spend;

      const comparison = this.compareRebate(
        category as IndianaRebateBenchmark["drug_category"],
        actual
      );

      const weight = spend / (totalSpend || 1);
      weightedScore += comparison.percentile_rank * weight;
      weightedGap += comparison.deviation_from_median * weight;

      // Calculate potential savings if moved to median
      if (comparison.deviation_from_median < 0) {
        potentialSavings += Math.abs(comparison.deviation_from_median) * spend * 0.01;
      }
    });

    return {
      weighted_score: weightedScore,
      weighted_gap: weightedGap,
      potential_savings: potentialSavings,
    };
  }

  /**
   * Get all benchmarks
   */
  static getAllBenchmarks(): IndianaRebateBenchmark[] {
    return [...INDIANA_BENCHMARKS];
  }

  /**
   * Validate rebate guarantee clause against benchmarks
   */
  static validateRebateClause(
    clauseText: string,
    annualSpend: number
  ): {
    has_explicit_guarantee: boolean;
    has_pass_through: boolean;
    extracted_percentages: Record<string, number>;
    compliance_issues: string[];
    estimated_risk: number;
  } {
    const complianceIssues: string[] = [];
    const extractedPercentages: Record<string, number> = {};

    // Check for explicit guarantee
    const hasGuarantee = /guarantee/i.test(clauseText) || /minimum/i.test(clauseText);

    // Check for pass-through language
    const hasPassThrough = /100%\s*pass[\s-]through/i.test(clauseText) ||
                          /full\s*pass[\s-]through/i.test(clauseText);

    // Extract rebate percentages
    const percentageMatches = clauseText.matchAll(/(\d+(?:\.\d+)?)\s*%.*?(brand|generic|specialty|biosimilar)/gi);
    for (const match of percentageMatches) {
      const pct = parseFloat(match[1]);
      const category = match[2].toLowerCase();
      extractedPercentages[category] = pct;
    }

    // Validate against benchmarks
    Object.entries(extractedPercentages).forEach(([category, pct]) => {
      const benchmark = this.getBenchmark(category as IndianaRebateBenchmark["drug_category"]);
      if (benchmark && pct < benchmark.min_rebate_pct) {
        complianceIssues.push(
          `${category} rebate (${pct}%) below Indiana minimum (${benchmark.min_rebate_pct}%)`
        );
      }
    });

    if (!hasGuarantee) {
      complianceIssues.push("No explicit rebate guarantee found in clause");
    }

    if (!hasPassThrough) {
      complianceIssues.push("Missing 100% pass-through guarantee");
    }

    // Estimate annual risk
    let estimatedRisk = 0;
    if (complianceIssues.length > 0) {
      estimatedRisk = annualSpend * 0.02 * complianceIssues.length; // 2% per issue
    }

    return {
      has_explicit_guarantee: hasGuarantee,
      has_pass_through: hasPassThrough,
      extracted_percentages: extractedPercentages,
      compliance_issues: complianceIssues,
      estimated_risk: estimatedRisk,
    };
  }
}