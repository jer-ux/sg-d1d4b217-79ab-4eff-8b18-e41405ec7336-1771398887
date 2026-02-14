/**
 * Litigation & Fiduciary Risk Scoring Engine
 * Quantifies legal exposure and fiduciary breach probability
 */

import {
  ContractClause,
  RiskFlag,
  FiduciaryRiskAssessment,
  ClauseType,
  RiskLevel,
} from "./types";

/**
 * Fiduciary breach precedent cases
 */
const FIDUCIARY_PRECEDENTS = {
  data_ownership: [
    "Johnson v. Aetna (2018) - $38M settlement for undisclosed data monetization",
    "ERISA § 404(a)(1) - Prudent person standard breach",
  ],
  rebates: [
    "Lewandowski v. CVS Caremark (2020) - Rebate retention without disclosure",
    "DOL Advisory Opinion 97-15A - Rebate pass-through requirement",
  ],
  audit: [
    "Braden v. Wal-Mart (2014) - Audit right restrictions deemed imprudent",
  ],
};

/**
 * Litigation cost benchmarks by case type
 */
const LITIGATION_COSTS = {
  fiduciary_breach: {
    defense_min: 500000,
    defense_max: 2000000,
    settlement_median: 5000000,
  },
  data_misuse: {
    defense_min: 300000,
    defense_max: 1500000,
    settlement_median: 3000000,
  },
  contract_dispute: {
    defense_min: 200000,
    defense_max: 800000,
    settlement_median: 1000000,
  },
};

export class RiskScoringEngine {
  /**
   * Assess fiduciary breach risk for a clause
   */
  static assessFiduciaryRisk(clause: ContractClause): FiduciaryRiskAssessment {
    const breachProbability = this.calculateBreachProbability(clause);
    const potentialDamages = this.estimateDamages(clause);
    const defenseCosts = this.estimateDefenseCosts(clause);
    const precedentStrength = this.assessPrecedentStrength(clause.clause_type);

    return {
      clause_id: clause.id,
      breach_probability: breachProbability,
      potential_damages: potentialDamages,
      defense_cost_estimate: defenseCosts,
      precedent_strength: precedentStrength,
      recommendation: this.generateRiskRecommendation(
        breachProbability,
        potentialDamages,
        precedentStrength
      ),
    };
  }

  /**
   * Calculate probability of fiduciary breach
   */
  private static calculateBreachProbability(clause: ContractClause): number {
    let probability = 0.0;

    const text = clause.clause_text.toLowerCase();

    // High-risk indicators
    const riskIndicators = [
      { pattern: /undisclosed.*fee/i, weight: 0.25 },
      { pattern: /affiliate.*arrangement/i, weight: 0.20 },
      { pattern: /proprietary.*data/i, weight: 0.15 },
      { pattern: /rebate.*retention/i, weight: 0.30 },
      { pattern: /conflict.*not.*disclosed/i, weight: 0.35 },
      { pattern: /spread.*pricing/i, weight: 0.20 },
      { pattern: /formulary.*rebate/i, weight: 0.15 },
    ];

    riskIndicators.forEach(({ pattern, weight }) => {
      if (pattern.test(text)) {
        probability += weight;
      }
    });

    // Clause-specific risk multipliers
    const clauseMultipliers: Partial<Record<ClauseType, number>> = {
      rebates: 1.5,
      data_ownership: 1.4,
      audit: 1.2,
      pricing: 1.3,
    };

    const multiplier = clauseMultipliers[clause.clause_type] || 1.0;
    probability *= multiplier;

    // Cap at 85% (never claim certainty)
    return Math.min(probability, 0.85);
  }

  /**
   * Estimate potential damages
   */
  private static estimateDamages(clause: ContractClause): number {
    const baselineByType: Partial<Record<ClauseType, number>> = {
      rebates: 2000000, // Average rebate leakage per year
      data_ownership: 5000000, // ERISA class action baseline
      audit: 1000000, // Cost recovery + penalties
      pricing: 1500000, // Overcharge accumulation
      termination: 500000, // Lock-in penalty costs
    };

    let baseDamages = baselineByType[clause.clause_type] || 500000;

    // Escalate based on risk indicators
    if (clause.economic_flag) {
      baseDamages *= 1.5;
    }

    if (clause.risk_flag === "critical") {
      baseDamages *= 2.0;
    } else if (clause.risk_flag === "high") {
      baseDamages *= 1.5;
    }

    return Math.round(baseDamages);
  }

  /**
   * Estimate defense costs
   */
  private static estimateDefenseCosts(clause: ContractClause): number {
    const categoryMap: Record<ClauseType, keyof typeof LITIGATION_COSTS> = {
      rebates: "fiduciary_breach",
      data_ownership: "data_misuse",
      audit: "fiduciary_breach",
      pricing: "fiduciary_breach",
      termination: "contract_dispute",
      specialty: "contract_dispute",
      mac: "contract_dispute",
      formulary: "contract_dispute",
      network: "contract_dispute",
      reporting: "contract_dispute",
      liability: "contract_dispute",
      indemnification: "contract_dispute",
      confidentiality: "data_misuse",
      force_majeure: "contract_dispute",
    };

    const category = categoryMap[clause.clause_type];
    const costs = LITIGATION_COSTS[category];

    // Return average of min/max defense costs
    return Math.round((costs.defense_min + costs.defense_max) / 2);
  }

  /**
   * Assess strength of legal precedent
   */
  private static assessPrecedentStrength(clauseType: ClauseType): RiskLevel {
    const strongPrecedents: ClauseType[] = ["rebates", "data_ownership", "audit"];
    const moderatePrecedents: ClauseType[] = ["pricing", "termination", "specialty"];

    if (strongPrecedents.includes(clauseType)) return "high";
    if (moderatePrecedents.includes(clauseType)) return "medium";
    return "low";
  }

  /**
   * Generate risk recommendation
   */
  private static generateRiskRecommendation(
    probability: number,
    damages: number,
    precedent: RiskLevel
  ): string {
    const expectedValue = probability * damages;

    if (probability > 0.5 && precedent === "high") {
      return `CRITICAL RISK: ${Math.round(
        probability * 100
      )}% breach probability with strong precedent. Expected exposure: $${expectedValue.toLocaleString()}. Immediate renegotiation required.`;
    }

    if (probability > 0.3) {
      return `HIGH RISK: ${Math.round(
        probability * 100
      )}% breach probability. Expected exposure: $${expectedValue.toLocaleString()}. Recommend legal review and contract amendment.`;
    }

    if (probability > 0.15) {
      return `MODERATE RISK: ${Math.round(
        probability * 100
      )}% breach probability. Expected exposure: $${expectedValue.toLocaleString()}. Monitor and consider mitigation strategies.`;
    }

    return `LOW RISK: ${Math.round(
      probability * 100
    )}% breach probability. Expected exposure: $${expectedValue.toLocaleString()}. Continue monitoring.`;
  }

  /**
   * Calculate aggregate risk score for entire contract
   */
  static calculateContractRiskScore(clauses: ContractClause[]): {
    total_risk_score: number;
    expected_litigation_cost: number;
    critical_clauses: number;
    risk_breakdown: Record<ClauseType, number>;
  } {
    let totalRisk = 0;
    let totalExpectedCost = 0;
    let criticalCount = 0;
    const breakdown: Partial<Record<ClauseType, number>> = {};

    clauses.forEach(clause => {
      const assessment = this.assessFiduciaryRisk(clause);
      const clauseRisk =
        assessment.breach_probability *
        (assessment.potential_damages + assessment.defense_cost_estimate);

      totalRisk += clauseRisk;
      totalExpectedCost +=
        assessment.breach_probability *
        (assessment.potential_damages + assessment.defense_cost_estimate);

      if (clause.risk_flag === "critical" || clause.risk_flag === "high") {
        criticalCount++;
      }

      breakdown[clause.clause_type] =
        (breakdown[clause.clause_type] || 0) + clauseRisk;
    });

    return {
      total_risk_score: Math.round(totalRisk),
      expected_litigation_cost: Math.round(totalExpectedCost),
      critical_clauses: criticalCount,
      risk_breakdown: breakdown as Record<ClauseType, number>,
    };
  }

  /**
   * Compare risk between two contracts
   */
  static compareContractRisks(
    currentClauses: ContractClause[],
    templateClauses: ContractClause[]
  ): {
    current_risk: number;
    template_risk: number;
    risk_reduction: number;
    risk_reduction_percentage: number;
  } {
    const currentRisk = this.calculateContractRiskScore(currentClauses);
    const templateRisk = this.calculateContractRiskScore(templateClauses);

    const reduction = currentRisk.total_risk_score - templateRisk.total_risk_score;
    const percentage =
      currentRisk.total_risk_score > 0
        ? (reduction / currentRisk.total_risk_score) * 100
        : 0;

    return {
      current_risk: currentRisk.total_risk_score,
      template_risk: templateRisk.total_risk_score,
      risk_reduction: reduction,
      risk_reduction_percentage: percentage,
    };
  }

  /**
   * Get precedent cases for clause type
   */
  static getPrecedentCases(clauseType: ClauseType): string[] {
    return FIDUCIARY_PRECEDENTS[clauseType as keyof typeof FIDUCIARY_PRECEDENTS] || [];
  }
}