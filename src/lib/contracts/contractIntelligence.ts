/**
 * Contract Intelligence Orchestration Service
 * Main entry point for contract analysis, comparison, and risk assessment
 */

import { ClauseExtractor } from "./clauseExtractor";
import { RedlineComparisonEngine } from "./redlineComparison";
import { RiskScoringEngine } from "./riskScoring";
import { IndianaBenchmarkOracle } from "./indianaBenchmark";
import {
  Contract,
  ContractClause,
  RedlineAnalysis,
  FiduciaryRiskAssessment,
} from "./types";

export interface ContractIntelligenceReport {
  redline_analysis: RedlineAnalysis;
  fiduciary_risk_summary: {
    total_risk_score: number;
    expected_litigation_cost: number;
    critical_clauses: number;
    high_value_assessments: FiduciaryRiskAssessment[];
  };
  indiana_benchmark_analysis: {
    overall_score: number;
    total_annual_impact: number;
    category_scores: Array<{
      category: string;
      actual: number;
      benchmark: number;
      gap: number;
      annual_impact: number;
    }>;
    recommendations: string[];
  };
  negotiation_leverage_points: string[];
  executive_briefing: string;
}

export class ContractIntelligenceService {
  /**
   * Full contract analysis pipeline
   */
  static async analyzeContract(
    currentContractText: string,
    currentContractMetadata: {
      id: string;
      name: string;
      pbm_name: string;
      effective_date: string;
      term_months: number;
      client_lives: number;
      annual_spend: number;
    },
    templateContractText: string,
    templateContractMetadata: {
      id: string;
      name: string;
    }
  ): Promise<ContractIntelligenceReport> {
    // Step 1: Extract clauses from both contracts
    const currentClauses = ClauseExtractor.extractClauses(
      currentContractMetadata.id,
      currentContractText,
      "current"
    );

    const templateClauses = ClauseExtractor.extractClauses(
      templateContractMetadata.id,
      templateContractText,
      "template"
    );

    // Step 2: Build full contract objects
    const currentContract: Contract = {
      ...currentContractMetadata,
      contract_type: "current",
      uploaded_at: new Date().toISOString(),
      status: "analyzed",
      clauses: currentClauses,
    };

    const templateContract: Contract = {
      id: templateContractMetadata.id,
      name: templateContractMetadata.name,
      pbm_name: "Kincaid Transparent Model",
      effective_date: new Date().toISOString(),
      term_months: 36,
      client_lives: 0,
      annual_spend: 0,
      contract_type: "template",
      uploaded_at: new Date().toISOString(),
      status: "analyzed",
      clauses: templateClauses,
    };

    // Step 3: Redline comparison
    const redlineAnalysis = await RedlineComparisonEngine.compareContracts(
      currentContract,
      templateContract
    );

    // Step 4: Fiduciary risk assessment
    const riskAssessments = currentClauses
      .filter(c => c.risk_flag === "critical" || c.risk_flag === "high")
      .map(clause => RiskScoringEngine.assessFiduciaryRisk(clause));

    const riskSummary = RiskScoringEngine.calculateContractRiskScore(currentClauses);

    // Step 5: Indiana benchmark analysis (extract rebates from clauses)
    const rebateData = this.extractRebateData(currentClauses);
    const benchmarkAnalysis = IndianaBenchmarkOracle.analyzeRebateStructure(rebateData);

    // Step 6: Generate negotiation leverage points
    const leveragePoints = this.generateLeveragePoints(
      redlineAnalysis,
      riskAssessments,
      benchmarkAnalysis
    );

    // Step 7: Executive briefing
    const executiveBriefing = this.generateExecutiveBriefing(
      currentContractMetadata,
      redlineAnalysis,
      riskSummary,
      benchmarkAnalysis
    );

    return {
      redline_analysis: redlineAnalysis,
      fiduciary_risk_summary: {
        ...riskSummary,
        high_value_assessments: riskAssessments,
      },
      indiana_benchmark_analysis: benchmarkAnalysis,
      negotiation_leverage_points: leveragePoints,
      executive_briefing: executiveBriefing,
    };
  }

  /**
   * Extract rebate percentages from clauses
   */
  private static extractRebateData(clauses: ContractClause[]): {
    brand?: number;
    generic?: number;
    specialty?: number;
    biosimilar?: number;
  } {
    const rebateData: {
      brand?: number;
      generic?: number;
      specialty?: number;
      biosimilar?: number;
    } = {};

    const rebateClauses = clauses.filter(c => c.clause_type === "rebates");

    rebateClauses.forEach(clause => {
      const text = clause.clause_text.toLowerCase();

      // Extract brand rebate
      const brandMatch = text.match(/brand.*?(\d+(?:\.\d+)?)\s*%/i);
      if (brandMatch) {
        rebateData.brand = parseFloat(brandMatch[1]);
      }

      // Extract generic rebate
      const genericMatch = text.match(/generic.*?(\d+(?:\.\d+)?)\s*%/i);
      if (genericMatch) {
        rebateData.generic = parseFloat(genericMatch[1]);
      }

      // Extract specialty rebate
      const specialtyMatch = text.match(/specialty.*?(\d+(?:\.\d+)?)\s*%/i);
      if (specialtyMatch) {
        rebateData.specialty = parseFloat(specialtyMatch[1]);
      }

      // Extract biosimilar rebate
      const biosimilarMatch = text.match(/biosimilar.*?(\d+(?:\.\d+)?)\s*%/i);
      if (biosimilarMatch) {
        rebateData.biosimilar = parseFloat(biosimilarMatch[1]);
      }
    });

    return rebateData;
  }

  /**
   * Generate negotiation leverage points
   */
  private static generateLeveragePoints(
    redline: RedlineAnalysis,
    risks: FiduciaryRiskAssessment[],
    benchmarks: any
  ): string[] {
    const points: string[] = [];

    // High-value redline issues
    const criticalComparisons = redline.clause_comparisons
      .filter(c => c.alignment_score < 60)
      .sort((a, b) => b.economic_delta.annual_cost_delta - a.economic_delta.annual_cost_delta);

    criticalComparisons.slice(0, 3).forEach(comparison => {
      points.push(
        `${comparison.clause_type.toUpperCase()}: $${comparison.economic_delta.annual_cost_delta.toLocaleString()} annual exposure - ${comparison.recommendation}`
      );
    });

    // High litigation risk
    const topRisks = risks
      .sort((a, b) => b.breach_probability * b.potential_damages - a.breach_probability * a.potential_damages)
      .slice(0, 2);

    topRisks.forEach(risk => {
      points.push(
        `LEGAL RISK: ${Math.round(risk.breach_probability * 100)}% breach probability with $${risk.potential_damages.toLocaleString()} exposure`
      );
    });

    // Benchmark gaps
    if (benchmarks.overall_score < 50) {
      points.push(
        `REBATE PERFORMANCE: Below median in ${benchmarks.category_scores.filter((c: any) => c.gap < 0).length} categories - potential $${Math.abs(benchmarks.total_annual_impact).toLocaleString()} recovery`
      );
    }

    return points;
  }

  /**
   * Generate executive briefing
   */
  private static generateExecutiveBriefing(
    metadata: any,
    redline: RedlineAnalysis,
    risk: any,
    benchmarks: any
  ): string {
    return `
EXECUTIVE CONTRACT INTELLIGENCE BRIEF
${metadata.pbm_name} | ${metadata.name}
Annual Spend: $${metadata.annual_spend.toLocaleString()} | Lives: ${metadata.client_lives.toLocaleString()}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RISK ASSESSMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Contract Alignment Score: ${Math.round(redline.overall_alignment_score)}%
Critical Issues: ${redline.critical_risks}
High-Risk Clauses: ${redline.high_risks}
Expected Annual Cost Exposure: $${redline.total_economic_delta.toLocaleString()}

Litigation Risk Score: ${(risk.total_risk_score / 1000000).toFixed(1)}M
Expected Defense + Settlement: $${risk.expected_litigation_cost.toLocaleString()}
Fiduciary Breach Probability: ${risk.critical_clauses > 0 ? "HIGH" : "MODERATE"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
REBATE PERFORMANCE vs INDIANA BENCHMARK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Overall Benchmark Score: ${Math.round(benchmarks.overall_score)}th percentile
Annual Economic Impact: ${benchmarks.total_annual_impact >= 0 ? "+" : ""}$${benchmarks.total_annual_impact.toLocaleString()}

${benchmarks.category_scores
  .map(
    (cat: any) =>
      `${cat.category.toUpperCase()}: ${cat.actual}% (benchmark: ${cat.benchmark}%) - ${cat.gap >= 0 ? "✓" : "⚠"} ${cat.gap.toFixed(1)}% gap`
  )
  .join("\n")}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RECOMMENDATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${redline.recommended_actions.slice(0, 5).map((action, i) => `${i + 1}. ${action}`).join("\n")}

${
  benchmarks.recommendations.length > 0
    ? "\nREBATE NEGOTIATIONS:\n" +
      benchmarks.recommendations.slice(0, 3).map((rec: string, i: number) => `${i + 1}. ${rec}`).join("\n")
    : ""
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TOTAL RECOVERABLE VALUE: $${(redline.total_economic_delta + Math.abs(benchmarks.total_annual_impact < 0 ? benchmarks.total_annual_impact : 0)).toLocaleString()}/year
    `.trim();
  }

  /**
   * Quick contract health check
   */
  static async quickHealthCheck(
    contractText: string,
    annualSpend: number
  ): Promise<{
    health_score: number;
    red_flags: string[];
    green_flags: string[];
    estimated_risk: number;
  }> {
    const clauses = ClauseExtractor.extractClauses("quick_check", contractText, "current");

    const redFlags: string[] = [];
    const greenFlags: string[] = [];
    let healthScore = 100;

    // Check for critical clauses
    const criticalTypes = ["rebates", "audit", "data_ownership"];
    criticalTypes.forEach(type => {
      const hasClause = clauses.some(c => c.clause_type === type);
      if (!hasClause) {
        redFlags.push(`Missing ${type} clause`);
        healthScore -= 20;
      } else {
        greenFlags.push(`${type} clause present`);
      }
    });

    // Check risk levels
    const highRiskCount = clauses.filter(c => c.risk_flag === "high" || c.risk_flag === "critical").length;
    if (highRiskCount > 3) {
      redFlags.push(`${highRiskCount} high-risk clauses detected`);
      healthScore -= highRiskCount * 5;
    }

    // Check economic flags
    const economicClauses = clauses.filter(c => c.economic_flag);
    if (economicClauses.length > 0) {
      greenFlags.push(`${economicClauses.length} economic clauses identified`);
    }

    const riskScore = RiskScoringEngine.calculateContractRiskScore(clauses);

    return {
      health_score: Math.max(healthScore, 0),
      red_flags: redFlags,
      green_flags: greenFlags,
      estimated_risk: riskScore.expected_litigation_cost,
    };
  }
}