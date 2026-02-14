/**
 * Redline Comparison Engine
 * Compares current PBM contracts against transparent model contracts
 */

import {
  Contract,
  ContractClause,
  ClauseComparison,
  SemanticDifference,
  EconomicImpact,
  RiskFlag,
  RedlineAnalysis,
  ClauseType,
  RiskLevel,
} from "./types";

export class RedlineComparisonEngine {
  /**
   * Compare two contracts and generate comprehensive redline analysis
   */
  static async compareContracts(
    currentContract: Contract,
    templateContract: Contract
  ): Promise<RedlineAnalysis> {
    const clauseComparisons = await this.compareAllClauses(
      currentContract.clauses || [],
      templateContract.clauses || []
    );

    const overallAlignment = this.calculateOverallAlignment(clauseComparisons);
    const totalEconomicDelta = this.calculateTotalEconomicDelta(
      clauseComparisons,
      currentContract.annual_spend
    );
    const riskCounts = this.countRiskLevels(clauseComparisons);

    return {
      contract_id: currentContract.id,
      template_id: templateContract.id,
      generated_at: new Date().toISOString(),
      overall_alignment_score: overallAlignment,
      total_economic_delta: totalEconomicDelta,
      critical_risks: riskCounts.critical,
      high_risks: riskCounts.high,
      clause_comparisons: clauseComparisons,
      executive_summary: this.generateExecutiveSummary(
        clauseComparisons,
        overallAlignment,
        totalEconomicDelta
      ),
      recommended_actions: this.generateRecommendedActions(clauseComparisons),
    };
  }

  /**
   * Compare all clauses between contracts
   */
  private static async compareAllClauses(
    currentClauses: ContractClause[],
    templateClauses: ContractClause[]
  ): Promise<ClauseComparison[]> {
    const comparisons: ClauseComparison[] = [];
    const clauseTypeSet = new Set<ClauseType>();

    // Collect all clause types
    currentClauses.forEach(c => clauseTypeSet.add(c.clause_type));
    templateClauses.forEach(c => clauseTypeSet.add(c.clause_type));

    // Compare each clause type
    for (const clauseType of clauseTypeSet) {
      const currentClause = currentClauses.find(c => c.clause_type === clauseType);
      const templateClause = templateClauses.find(c => c.clause_type === clauseType);

      const comparison = this.compareClausePair(
        clauseType,
        currentClause,
        templateClause
      );

      comparisons.push(comparison);
    }

    return comparisons;
  }

  /**
   * Compare a pair of clauses
   */
  private static compareClausePair(
    clauseType: ClauseType,
    currentClause: ContractClause | undefined,
    templateClause: ContractClause | undefined
  ): ClauseComparison {
    const semanticDifferences = this.detectSemanticDifferences(
      currentClause,
      templateClause,
      clauseType
    );

    const alignmentScore = this.calculateAlignmentScore(
      currentClause,
      templateClause,
      semanticDifferences
    );

    const economicDelta = this.calculateEconomicDelta(
      currentClause,
      templateClause,
      clauseType
    );

    const riskEscalation = this.assessRiskEscalation(
      currentClause,
      templateClause,
      semanticDifferences
    );

    return {
      clause_type: clauseType,
      current_clause: currentClause,
      template_clause: templateClause,
      alignment_score: alignmentScore,
      semantic_differences: semanticDifferences,
      economic_delta: economicDelta,
      risk_escalation: riskEscalation,
      recommendation: this.generateClauseRecommendation(
        clauseType,
        alignmentScore,
        economicDelta,
        riskEscalation
      ),
    };
  }

  /**
   * Detect semantic differences between clauses
   */
  private static detectSemanticDifferences(
    current: ContractClause | undefined,
    template: ContractClause | undefined,
    clauseType: ClauseType
  ): SemanticDifference[] {
    const differences: SemanticDifference[] = [];

    // Missing clause is a critical difference
    if (!current && template) {
      differences.push({
        field: "clause_existence",
        current_value: "MISSING",
        template_value: "PRESENT",
        impact_level: "critical",
        explanation: `Critical ${clauseType} clause is missing from current contract`,
      });
      return differences;
    }

    if (!current || !template) return differences;

    // Clause-specific comparison logic
    switch (clauseType) {
      case "rebates":
        differences.push(...this.compareRebateClauses(current, template));
        break;
      case "audit":
        differences.push(...this.compareAuditClauses(current, template));
        break;
      case "data_ownership":
        differences.push(...this.compareDataOwnershipClauses(current, template));
        break;
      case "termination":
        differences.push(...this.compareTerminationClauses(current, template));
        break;
      default:
        differences.push(...this.compareGenericClauses(current, template));
    }

    return differences;
  }

  /**
   * Compare rebate clauses
   */
  private static compareRebateClauses(
    current: ContractClause,
    template: ContractClause
  ): SemanticDifference[] {
    const differences: SemanticDifference[] = [];

    // Extract rebate percentages
    const currentRebate = this.extractRebatePercentage(current.clause_text);
    const templateRebate = this.extractRebatePercentage(template.clause_text);

    if (currentRebate && templateRebate && currentRebate < templateRebate) {
      differences.push({
        field: "rebate_percentage",
        current_value: `${currentRebate}%`,
        template_value: `${templateRebate}%`,
        impact_level: "critical",
        explanation: `Current rebate guarantee is ${
          templateRebate - currentRebate
        }% lower than industry best practice`,
      });
    }

    // Check for pass-through language
    const hasPassThrough = /pass[\s-]through/i.test(current.clause_text);
    const templateHasPassThrough = /pass[\s-]through/i.test(template.clause_text);

    if (templateHasPassThrough && !hasPassThrough) {
      differences.push({
        field: "pass_through",
        current_value: "Not specified",
        template_value: "100% pass-through guaranteed",
        impact_level: "critical",
        explanation: "Missing explicit 100% rebate pass-through guarantee",
      });
    }

    return differences;
  }

  /**
   * Compare audit clauses
   */
  private static compareAuditClauses(
    current: ContractClause,
    template: ContractClause
  ): SemanticDifference[] {
    const differences: SemanticDifference[] = [];

    // Check for independent audit rights
    const hasIndependent = /independent\s+audit/i.test(current.clause_text);
    const templateHasIndependent = /independent\s+audit/i.test(template.clause_text);

    if (templateHasIndependent && !hasIndependent) {
      differences.push({
        field: "audit_independence",
        current_value: "Not specified",
        template_value: "Independent audit rights guaranteed",
        impact_level: "high",
        explanation: "Lack of independent audit rights limits transparency",
      });
    }

    // Check for audit cost limitations
    const hasClientCost = /client\s+cost/i.test(current.clause_text) || 
                          /employer\s+expense/i.test(current.clause_text);
    
    if (hasClientCost) {
      differences.push({
        field: "audit_cost",
        current_value: "Client bears audit costs",
        template_value: "PBM bears audit costs for discrepancies",
        impact_level: "medium",
        explanation: "Audit cost burden should shift to PBM if discrepancies found",
      });
    }

    return differences;
  }

  /**
   * Compare data ownership clauses
   */
  private static compareDataOwnershipClauses(
    current: ContractClause,
    template: ContractClause
  ): SemanticDifference[] {
    const differences: SemanticDifference[] = [];

    const currentOwnership = /client.*own/i.test(current.clause_text) ||
                            /employer.*own/i.test(current.clause_text);
    const pbmOwnership = /pbm.*own/i.test(current.clause_text) ||
                        /proprietary/i.test(current.clause_text);

    if (pbmOwnership || !currentOwnership) {
      differences.push({
        field: "data_ownership",
        current_value: "Unclear or PBM ownership claimed",
        template_value: "Client owns all claims and member data",
        impact_level: "critical",
        explanation: "Ambiguous data ownership creates fiduciary and litigation risks",
      });
    }

    return differences;
  }

  /**
   * Compare termination clauses
   */
  private static compareTerminationClauses(
    current: ContractClause,
    template: ContractClause
  ): SemanticDifference[] {
    const differences: SemanticDifference[] = [];

    // Extract notice period
    const currentNotice = this.extractNoticePeriod(current.clause_text);
    const templateNotice = this.extractNoticePeriod(template.clause_text);

    if (currentNotice && templateNotice && currentNotice > templateNotice) {
      differences.push({
        field: "notice_period",
        current_value: `${currentNotice} days`,
        template_value: `${templateNotice} days`,
        impact_level: "medium",
        explanation: `Extended notice period limits client flexibility by ${
          currentNotice - templateNotice
        } days`,
      });
    }

    // Check for termination fees
    const hasTermFee = /termination\s+fee/i.test(current.clause_text) ||
                       /early\s+termination/i.test(current.clause_text);

    if (hasTermFee) {
      differences.push({
        field: "termination_fee",
        current_value: "Termination fees apply",
        template_value: "No termination fees",
        impact_level: "high",
        explanation: "Termination fees create lock-in and reduce negotiating power",
      });
    }

    return differences;
  }

  /**
   * Generic clause comparison
   */
  private static compareGenericClauses(
    current: ContractClause,
    template: ContractClause
  ): SemanticDifference[] {
    // Simple text similarity comparison
    const similarity = this.calculateTextSimilarity(
      current.clause_text,
      template.clause_text
    );

    if (similarity < 0.7) {
      return [{
        field: "clause_content",
        current_value: "Differs significantly",
        template_value: "Industry best practice",
        impact_level: similarity < 0.4 ? "high" : "medium",
        explanation: `Clause content deviates from best practice (${Math.round(
          similarity * 100
        )}% similarity)`,
      }];
    }

    return [];
  }

  /**
   * Calculate alignment score
   */
  private static calculateAlignmentScore(
    current: ContractClause | undefined,
    template: ContractClause | undefined,
    differences: SemanticDifference[]
  ): number {
    if (!current && !template) return 100;
    if (!current || !template) return 0;

    let score = 100;

    differences.forEach(diff => {
      switch (diff.impact_level) {
        case "critical":
          score -= 30;
          break;
        case "high":
          score -= 20;
          break;
        case "medium":
          score -= 10;
          break;
        case "low":
          score -= 5;
          break;
      }
    });

    return Math.max(score, 0);
  }

  /**
   * Calculate economic delta
   */
  private static calculateEconomicDelta(
    current: ContractClause | undefined,
    template: ContractClause | undefined,
    clauseType: ClauseType
  ): EconomicImpact {
    // Simplified economic impact calculation
    // In production, this would use sophisticated models

    let annualCostDelta = 0;
    let confidence = 0.5;
    let basis = "Estimated based on clause comparison";

    if (!current) {
      annualCostDelta = 50000; // Missing clause risk estimate
      confidence = 0.3;
      basis = "Missing clause - estimated risk exposure";
    } else if (clauseType === "rebates") {
      const currentRebate = this.extractRebatePercentage(current.clause_text) || 0;
      const templateRebate = template ? 
        this.extractRebatePercentage(template.clause_text) || 0 : 0;
      
      if (templateRebate > currentRebate) {
        // Estimate 2% of annual spend per 1% rebate difference
        annualCostDelta = (templateRebate - currentRebate) * 20000;
        confidence = 0.7;
        basis = `${templateRebate - currentRebate}% rebate gap`;
      }
    }

    return {
      annual_cost_delta: annualCostDelta,
      risk_adjusted_value: annualCostDelta * confidence,
      confidence,
      basis,
    };
  }

  /**
   * Assess risk escalation
   */
  private static assessRiskEscalation(
    current: ContractClause | undefined,
    template: ContractClause | undefined,
    differences: SemanticDifference[]
  ): RiskFlag[] {
    const risks: RiskFlag[] = [];

    differences.forEach(diff => {
      if (diff.impact_level === "critical" || diff.impact_level === "high") {
        risks.push({
          category: this.categorizeRisk(diff.field),
          severity: diff.impact_level,
          description: diff.explanation,
          mitigation: this.suggestMitigation(diff.field, diff.impact_level),
        });
      }
    });

    return risks;
  }

  /**
   * Helper: Extract rebate percentage from text
   */
  private static extractRebatePercentage(text: string): number | null {
    const match = text.match(/(\d+(?:\.\d+)?)\s*%\s*rebate/i);
    return match ? parseFloat(match[1]) : null;
  }

  /**
   * Helper: Extract notice period in days
   */
  private static extractNoticePeriod(text: string): number | null {
    const match = text.match(/(\d+)\s*days?\s*notice/i);
    return match ? parseInt(match[1], 10) : null;
  }

  /**
   * Helper: Calculate text similarity
   */
  private static calculateTextSimilarity(text1: string, text2: string): number {
    const words1 = new Set(text1.toLowerCase().split(/\s+/));
    const words2 = new Set(text2.toLowerCase().split(/\s+/));
    
    const intersection = new Set([...words1].filter(w => words2.has(w)));
    const union = new Set([...words1, ...words2]);
    
    return intersection.size / union.size;
  }

  /**
   * Generate executive summary
   */
  private static generateExecutiveSummary(
    comparisons: ClauseComparison[],
    alignment: number,
    economicDelta: number
  ): string {
    const criticalIssues = comparisons.filter(
      c => c.risk_escalation.some(r => r.severity === "critical")
    );

    return `
Contract Alignment: ${Math.round(alignment)}%
Estimated Annual Cost Exposure: $${economicDelta.toLocaleString()}
Critical Issues Identified: ${criticalIssues.length}

${criticalIssues.length > 0 ? "KEY CONCERNS:\n" + criticalIssues
  .map(c => `• ${c.clause_type}: ${c.recommendation}`)
  .join("\n") : "No critical issues identified."}
    `.trim();
  }

  /**
   * Generate recommended actions
   */
  private static generateRecommendedActions(
    comparisons: ClauseComparison[]
  ): string[] {
    const actions: string[] = [];

    comparisons.forEach(comparison => {
      if (comparison.alignment_score < 70) {
        actions.push(
          `Renegotiate ${comparison.clause_type} clause to align with industry best practices (Current score: ${Math.round(comparison.alignment_score)}%)`
        );
      }

      comparison.risk_escalation.forEach(risk => {
        if (risk.mitigation) {
          actions.push(risk.mitigation);
        }
      });
    });

    return actions;
  }

  /**
   * Calculate overall alignment
   */
  private static calculateOverallAlignment(comparisons: ClauseComparison[]): number {
    if (comparisons.length === 0) return 0;
    const total = comparisons.reduce((sum, c) => sum + c.alignment_score, 0);
    return total / comparisons.length;
  }

  /**
   * Calculate total economic delta
   */
  private static calculateTotalEconomicDelta(
    comparisons: ClauseComparison[],
    annualSpend: number
  ): number {
    return comparisons.reduce(
      (sum, c) => sum + c.economic_delta.annual_cost_delta,
      0
    );
  }

  /**
   * Count risk levels
   */
  private static countRiskLevels(comparisons: ClauseComparison[]): {
    critical: number;
    high: number;
  } {
    let critical = 0;
    let high = 0;

    comparisons.forEach(c => {
      c.risk_escalation.forEach(risk => {
        if (risk.severity === "critical") critical++;
        else if (risk.severity === "high") high++;
      });
    });

    return { critical, high };
  }

  /**
   * Categorize risk type
   */
  private static categorizeRisk(field: string): RiskFlag["category"] {
    if (field.includes("rebate") || field.includes("pricing")) return "economic";
    if (field.includes("data") || field.includes("audit")) return "fiduciary";
    if (field.includes("termination") || field.includes("liability")) return "litigation";
    if (field.includes("compliance") || field.includes("regulatory")) return "regulatory";
    return "operational";
  }

  /**
   * Suggest mitigation strategy
   */
  private static suggestMitigation(field: string, severity: RiskLevel): string {
    const mitigations: Record<string, string> = {
      rebate_percentage: "Demand explicit minimum rebate guarantees tied to Indiana benchmark",
      pass_through: "Insert 100% pass-through clause with quarterly attestation",
      audit_independence: "Add independent audit rights with PBM cost-bearing for discrepancies",
      data_ownership: "Explicitly state client owns all claims and member data",
      termination_fee: "Remove early termination penalties or cap at 30 days of fees",
    };

    return mitigations[field] || `Address ${field} discrepancy in contract negotiation`;
  }

  /**
   * Generate clause recommendation
   */
  private static generateClauseRecommendation(
    clauseType: ClauseType,
    alignmentScore: number,
    economicDelta: EconomicImpact,
    risks: RiskFlag[]
  ): string {
    if (alignmentScore >= 90) {
      return "Clause aligns well with best practices. No immediate action required.";
    }

    if (alignmentScore < 50) {
      return `CRITICAL: This ${clauseType} clause requires complete renegotiation. Estimated risk: $${economicDelta.risk_adjusted_value.toLocaleString()}/year.`;
    }

    if (risks.length > 0) {
      return `Moderate concerns identified. ${risks[0].description} Consider renegotiation.`;
    }

    return `Some improvements possible. Alignment score: ${Math.round(alignmentScore)}%.`;
  }
}