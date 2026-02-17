/**
 * Redline Comparison Engine - Surgical Contract Intelligence
 * Semantic similarity scoring with economic leakage quantification
 */

import type { 
  ContractClause, 
  ClauseComparison, 
  RedlineAnalysis,
  ClauseType 
} from "./types";

/**
 * Transparent Model Contract - Best Practice Clauses
 */
const TRANSPARENT_MODEL_CLAUSES: Record<ClauseType, string> = {
  rebates: "One hundred percent (100%) of all rebates, discounts, formulary management fees, and other pharmaceutical manufacturer payments shall be passed through to the Plan Sponsor within thirty (30) days of receipt. PBM shall provide detailed rebate reporting by NDC, including manufacturer name, rebate amount, and payment date.",
  
  audit: "Plan Sponsor shall have the right to audit PBM records at any time with fourteen (14) days' notice. Audit shall be conducted by an independent third-party auditor at Plan Sponsor's expense. PBM shall fully cooperate and provide all requested records within five (5) business days. No limitation on audit scope or frequency.",
  
  data_ownership: "All claims data, utilization data, formulary data, and analytics are the exclusive property of the Plan Sponsor. PBM shall not use, sell, or share Plan data with any third party without explicit written consent. Upon contract termination, all data shall be transferred to Plan Sponsor in standard EDI format within fifteen (15) days.",
  
  termination: "Either party may terminate this agreement with ninety (90) days' written notice without cause. No termination fees or penalties shall apply. PBM shall continue service through transition period and provide full cooperation to successor PBM.",
  
  specialty: "Specialty drugs shall be dispensed through Plan Sponsor's choice of specialty pharmacy. PBM shall not require use of PBM-affiliated specialty pharmacy. Specialty rebates shall be passed through at 100% with no administrative fees.",
  
  mac: "Maximum Allowable Cost (MAC) pricing shall be based on publicly available benchmark sources (e.g., NADAC, AAC). MAC list shall be provided to Plan Sponsor monthly in electronic format. Plan Sponsor may challenge any MAC price and PBM shall provide documentation of benchmark source within three (3) business days.",
  
  spread: "PBM shall not retain any spread between ingredient cost paid to pharmacy and amount charged to Plan Sponsor. All pricing shall be pass-through with disclosed administrative fee only. Monthly reconciliation reports shall detail ingredient cost, dispensing fee, and administrative fee separately.",
  
  formulary: "Formulary decisions shall be made by independent P&T committee with no PBM financial interest. Plan Sponsor retains final approval authority. All formulary placement fees and rebates shall be disclosed and passed through to Plan Sponsor.",
  
  transparency: "PBM shall provide complete transparency into all revenue sources including but not limited to: manufacturer rebates, admin fees, data sales, formulary fees, network spreads, specialty margins, and technology fees. Quarterly certification of revenue disclosure by PBM CFO required.",
  
  mail_order: "Plan Sponsor may direct members to any mail order pharmacy including retail pharmacy mail programs. PBM shall not require use of PBM-affiliated mail order pharmacy. Mail order rebates and discounts shall be passed through at 100%.",
  
  network: "PBM shall provide access to broad retail pharmacy network. Plan Sponsor may include additional pharmacies at its discretion. Network reimbursement terms shall be disclosed to Plan Sponsor. No steering to PBM-affiliated pharmacies.",
  
  reporting: "PBM shall provide comprehensive monthly reporting including: claims detail by NDC, rebate detail by manufacturer, MAC pricing updates, specialty drug utilization, prior authorization outcomes, and trend analysis. All reports in machine-readable format (CSV/JSON).",
  
  indemnification: "PBM shall indemnify and hold harmless Plan Sponsor from any claims arising from PBM's breach of contract, negligence, or violation of law. PBM shall maintain errors and omissions insurance of at least $10M per occurrence.",
  
  liability: "PBM liability shall not be limited or capped. PBM shall be fully liable for all actual, consequential, and punitive damages arising from breach or negligence. No limitation of liability clauses shall apply to Plan Sponsor claims.",
  
  pricing: "Pricing shall be based on actual acquisition cost plus a fixed professional dispensing fee. No average wholesale price (AWP) discounts shall be used as they are subject to manipulation.",
  
  confidentiality: "Plan Sponsor data is confidential and proprietary. PBM shall not use Plan Sponsor data for any purpose other than administering the plan. No data aggregation or sale permitted.",
  
  force_majeure: "Force majeure events shall not excuse PBM's obligation to process claims and provide essential services. Business continuity plans must be in place and tested annually."
};

/**
 * Semantic Similarity Scoring
 * Uses multiple algorithms for robust comparison
 */
class SemanticSimilarityEngine {
  /**
   * Calculate Jaccard similarity (token overlap)
   */
  private jaccardSimilarity(text1: string, text2: string): number {
    const tokens1 = new Set(this.tokenize(text1));
    const tokens2 = new Set(this.tokenize(text2));
    
    const intersection = new Set([...tokens1].filter(x => tokens2.has(x)));
    const union = new Set([...tokens1, ...tokens2]);
    
    return intersection.size / union.size;
  }

  /**
   * Calculate Levenshtein distance ratio
   */
  private levenshteinRatio(text1: string, text2: string): number {
    const distance = this.levenshteinDistance(text1, text2);
    const maxLen = Math.max(text1.length, text2.length);
    return 1 - (distance / maxLen);
  }

  /**
   * Extract key phrases for semantic comparison
   */
  private extractKeyPhrases(text: string): string[] {
    const keyPatterns = [
      /(\d+%|one hundred percent|100%)/gi,
      /(pass[- ]?through|retain|withhold)/gi,
      /(disclose|report|transparent)/gi,
      /(audit|review|inspect)/gi,
      /(terminate|cancel|exit)/gi,
      /(fee|cost|charge|rebate)/gi,
      /(must|shall|may|at discretion)/gi,
    ];

    const phrases: string[] = [];
    for (const pattern of keyPatterns) {
      const matches = text.match(pattern);
      if (matches) phrases.push(...matches);
    }
    return phrases.map(p => p.toLowerCase());
  }

  /**
   * Calculate semantic similarity with economic weighting
   */
  public calculateSimilarity(currentClause: string, modelClause: string): {
    similarity_score: number;
    deviation_score: number;
    key_differences: string[];
    economic_alignment: number;
  } {
    // Normalize text
    const current = currentClause.toLowerCase().trim();
    const model = modelClause.toLowerCase().trim();

    // Multiple similarity metrics
    const jaccard = this.jaccardSimilarity(current, model);
    const levenshtein = this.levenshteinRatio(current, model);
    
    // Key phrase matching (most important for economic terms)
    const currentPhrases = this.extractKeyPhrases(current);
    const modelPhrases = this.extractKeyPhrases(model);
    const phraseOverlap = this.jaccardSimilarity(
      currentPhrases.join(" "),
      modelPhrases.join(" ")
    );

    // Weighted composite similarity
    const similarity_score = (
      jaccard * 0.3 +
      levenshtein * 0.3 +
      phraseOverlap * 0.4  // Economic terms weighted highest
    );

    // Economic alignment scoring
    const economic_alignment = this.scoreEconomicAlignment(current, model);

    // Identify key differences
    const key_differences = this.identifyKeyDifferences(current, model);

    return {
      similarity_score,
      deviation_score: 1 - similarity_score,
      key_differences,
      economic_alignment
    };
  }

  /**
   * Score economic alignment specifically
   */
  private scoreEconomicAlignment(current: string, model: string): number {
    let score = 1.0;

    // Pass-through language
    if (model.includes("100%") || model.includes("one hundred percent")) {
      if (!current.includes("100%") && !current.includes("one hundred percent")) {
        score -= 0.3;
      }
    }

    // Retention/withholding language (bad)
    if (current.includes("retain") || current.includes("withhold") || current.includes("portion")) {
      score -= 0.3;
    }

    // Disclosure requirements
    if (model.includes("disclose") || model.includes("report")) {
      if (!current.includes("disclose") && !current.includes("report")) {
        score -= 0.2;
      }
    }

    // Audit rights
    if (model.includes("audit")) {
      if (!current.includes("audit")) {
        score -= 0.2;
      }
    }

    return Math.max(score, 0);
  }

  /**
   * Identify specific differences for reporting
   */
  private identifyKeyDifferences(current: string, model: string): string[] {
    const differences: string[] = [];

    // Pass-through differences
    const modelHasFullPassthrough = model.includes("100%") || model.includes("one hundred percent");
    const currentHasFullPassthrough = current.includes("100%") || current.includes("one hundred percent");
    if (modelHasFullPassthrough && !currentHasFullPassthrough) {
      differences.push("Missing 100% pass-through commitment");
    }

    // Retention language
    if (current.includes("retain") || current.includes("withhold")) {
      differences.push("Contains retention/withholding language");
    }

    // Disclosure gaps
    if ((model.includes("disclose") || model.includes("report")) && 
        !current.includes("disclose") && !current.includes("report")) {
      differences.push("Lacks disclosure/reporting requirements");
    }

    // Audit limitations
    if (current.includes("limit") && current.includes("audit")) {
      differences.push("Contains audit limitations");
    }

    // Timing differences
    const modelDays = this.extractDays(model);
    const currentDays = this.extractDays(current);
    if (modelDays && currentDays && currentDays > modelDays) {
      differences.push(`Longer timeframe: ${currentDays} days vs ${modelDays} days`);
    }

    // Fee language
    if (current.includes("fee") && !model.includes("fee")) {
      differences.push("Contains additional fee provisions");
    }

    return differences;
  }

  /**
   * Helper: Tokenize text
   */
  private tokenize(text: string): string[] {
    return text.toLowerCase()
      .replace(/[^\w\s]/g, " ")
      .split(/\s+/)
      .filter(t => t.length > 2);
  }

  /**
   * Helper: Levenshtein distance
   */
  private levenshteinDistance(str1: string, str2: string): number {
    const matrix: number[][] = [];

    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }

    return matrix[str2.length][str1.length];
  }

  /**
   * Helper: Extract day values from text
   */
  private extractDays(text: string): number | null {
    const match = text.match(/(\d+)\s*days?/i);
    return match ? parseInt(match[1]) : null;
  }
}

/**
 * Economic Impact Quantification
 */
class EconomicImpactCalculator {
  /**
   * Estimate annual economic exposure from clause deviation
   */
  public estimateExposure(
    clauseType: ClauseType,
    deviationScore: number,
    economicAlignment: number,
    annualRxSpend: number = 10_000_000 // Default $10M annual Rx spend
  ): {
    estimated_leakage: number;
    confidence: number;
    calculation_basis: string;
  } {
    const leakageRates: Record<ClauseType, { min: number; max: number; basis: string }> = {
      rebates: { 
        min: 0.08, 
        max: 0.18, 
        basis: "Industry studies show 8-18% of Rx spend typically lost to rebate retention" 
      },
      spread: { 
        min: 0.03, 
        max: 0.08, 
        basis: "PBM spread typically ranges 3-8% of ingredient cost" 
      },
      specialty: { 
        min: 0.15, 
        max: 0.30, 
        basis: "Specialty drug margins can reach 15-30% without pass-through" 
      },
      mac: { 
        min: 0.02, 
        max: 0.05, 
        basis: "Opaque MAC pricing creates 2-5% cost inflation" 
      },
      audit: { 
        min: 0.01, 
        max: 0.03, 
        basis: "Audit limitations enable 1-3% undetected leakage" 
      },
      data_ownership: { 
        min: 0.005, 
        max: 0.015, 
        basis: "Data monetization value estimated at 0.5-1.5% of spend" 
      },
      termination: { 
        min: 0.01, 
        max: 0.02, 
        basis: "Restrictive termination clauses limit negotiation leverage" 
      },
      formulary: { 
        min: 0.05, 
        max: 0.12, 
        basis: "Non-transparent formulary decisions cost 5-12% in sub-optimal choices" 
      },
      transparency: { 
        min: 0.02, 
        max: 0.05, 
        basis: "Lack of transparency enables hidden fees and charges" 
      },
      mail_order: { 
        min: 0.02, 
        max: 0.04, 
        basis: "Mandatory affiliated mail order adds 2-4% costs" 
      },
      network: { 
        min: 0.01, 
        max: 0.03, 
        basis: "Network steering to affiliated pharmacies increases costs 1-3%" 
      },
      reporting: { 
        min: 0.005, 
        max: 0.01, 
        basis: "Poor reporting limits cost management effectiveness" 
      },
      indemnification: { 
        min: 0.002, 
        max: 0.005, 
        basis: "Weak indemnification increases legal exposure risk" 
      },
      liability: { 
        min: 0.002, 
        max: 0.005, 
        basis: "Liability caps limit recovery for PBM errors" 
      },
      pricing: {
        min: 0.05,
        max: 0.15,
        basis: "AWP-based pricing typically hides 5-15% spread vs acquisition cost"
      },
      confidentiality: {
        min: 0.001,
        max: 0.003,
        basis: "Data leakage risks monetization without compensation"
      },
      force_majeure: {
        min: 0.001,
        max: 0.002,
        basis: "Service interruptions cause operational costs"
      }
    };

    const rates = leakageRates[clauseType];
    
    // Calculate expected leakage based on deviation and economic alignment
    const leakageRate = rates.min + (rates.max - rates.min) * deviationScore * (1 - economicAlignment);
    const estimated_leakage = annualRxSpend * leakageRate;

    // Confidence based on deviation score (higher deviation = higher confidence in estimate)
    const confidence = 0.6 + (deviationScore * 0.3) + ((1 - economicAlignment) * 0.1);

    return {
      estimated_leakage,
      confidence: Math.min(confidence, 0.95),
      calculation_basis: rates.basis
    };
  }

  /**
   * Calculate negotiation priority ranking
   */
  public calculatePriority(
    clauseType: ClauseType,
    estimatedLeakage: number,
    deviationScore: number,
    fiduciaryRisk: number
  ): {
    priority_score: number;
    rank: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
    rationale: string;
  } {
    // Weighted priority scoring
    const economicWeight = 0.5;
    const deviationWeight = 0.3;
    const fiduciaryWeight = 0.2;

    const priority_score = (
      (estimatedLeakage / 100000) * economicWeight +
      deviationScore * 100 * deviationWeight +
      fiduciaryRisk * fiduciaryWeight
    );

    let rank: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
    let rationale: string;

    if (priority_score >= 80) {
      rank = "CRITICAL";
      rationale = `Severe economic exposure (${Math.round(estimatedLeakage).toLocaleString()}) with high deviation. Immediate negotiation required.`;
    } else if (priority_score >= 60) {
      rank = "HIGH";
      rationale = `Significant cost impact with material deviation from best practice. Priority negotiation target.`;
    } else if (priority_score >= 40) {
      rank = "MEDIUM";
      rationale = `Moderate exposure with improvement opportunity. Include in comprehensive renegotiation.`;
    } else {
      rank = "LOW";
      rationale = `Minor deviation with limited economic impact. Address during routine contract review.`;
    }

    return { priority_score, rank, rationale };
  }
}

/**
 * Main Redline Comparison Engine
 */
export class RedlineComparisonEngine {
  private similarityEngine = new SemanticSimilarityEngine();
  private impactCalculator = new EconomicImpactCalculator();

  /**
   * Compare current contract clauses against transparent model
   */
  public compareContracts(
    currentClauses: ContractClause[],
    annualRxSpend: number = 10_000_000
  ): RedlineAnalysis {
    const comparisons: ClauseComparison[] = [];
    let totalExposure = 0;
    let totalDeviationPoints = 0;

    for (const currentClause of currentClauses) {
      const modelClause = TRANSPARENT_MODEL_CLAUSES[currentClause.clause_type];
      
      if (!modelClause) continue;

      // Semantic similarity analysis
      const similarity = this.similarityEngine.calculateSimilarity(
        currentClause.clause_text,
        modelClause
      );

      // Economic impact quantification
      const economicImpact = this.impactCalculator.estimateExposure(
        currentClause.clause_type,
        similarity.deviation_score,
        similarity.economic_alignment,
        annualRxSpend
      );

      // Negotiation priority
      const priority = this.impactCalculator.calculatePriority(
        currentClause.clause_type,
        economicImpact.estimated_leakage,
        similarity.deviation_score,
        currentClause.risk_score || 0
      );

      const comparison: ClauseComparison = {
        clause_type: currentClause.clause_type,
        current_text: currentClause.clause_text,
        model_text: modelClause,
        deviation_score: similarity.deviation_score,
        similarity_score: similarity.similarity_score,
        economic_alignment: similarity.economic_alignment,
        key_differences: similarity.key_differences,
        estimated_annual_exposure: economicImpact.estimated_leakage,
        confidence: economicImpact.confidence,
        calculation_basis: economicImpact.calculation_basis,
        priority_rank: priority.rank,
        priority_score: priority.priority_score,
        negotiation_rationale: priority.rationale,
        page_number: currentClause.page_number || currentClause.location?.page,
        severity: this.determineSeverity(similarity.deviation_score, economicImpact.estimated_leakage)
      };

      comparisons.push(comparison);
      totalExposure += economicImpact.estimated_leakage;
      totalDeviationPoints += similarity.deviation_score;
    }

    // Calculate overall metrics
    const avgDeviation = totalDeviationPoints / comparisons.length;
    const alignmentScore = Math.round((1 - avgDeviation) * 100);

    const criticalIssues = comparisons.filter(c => c.priority_rank === "CRITICAL").length;
    const highIssues = comparisons.filter(c => c.priority_rank === "HIGH").length;

    return {
      overall_alignment_score: alignmentScore,
      total_estimated_exposure: totalExposure,
      critical_issues: criticalIssues,
      high_priority_issues: highIssues,
      clause_comparisons: comparisons.sort((a, b) => b.priority_score - a.priority_score),
      executive_summary: this.generateExecutiveSummary(
        alignmentScore,
        totalExposure,
        criticalIssues,
        highIssues
      ),
      generated_at: new Date().toISOString()
    };
  }

  /**
   * Determine severity level
   */
  private determineSeverity(deviationScore: number, exposure: number): "critical" | "high" | "medium" | "low" {
    if (deviationScore > 0.7 || exposure > 500000) return "critical";
    if (deviationScore > 0.5 || exposure > 200000) return "high";
    if (deviationScore > 0.3 || exposure > 50000) return "medium";
    return "low";
  }

  /**
   * Generate executive summary
   */
  private generateExecutiveSummary(
    alignmentScore: number,
    totalExposure: number,
    criticalIssues: number,
    highIssues: number
  ): string {
    const formattedExposure = `$${Math.round(totalExposure).toLocaleString()}`;
    
    if (alignmentScore < 50) {
      return `CRITICAL: Contract has ${alignmentScore}% alignment with best practices. Estimated ${formattedExposure} annual exposure with ${criticalIssues + highIssues} high-priority issues. Immediate renegotiation strongly recommended.`;
    } else if (alignmentScore < 70) {
      return `SIGNIFICANT GAPS: Contract shows ${alignmentScore}% alignment. Estimated ${formattedExposure} annual leakage with ${criticalIssues + highIssues} priority issues. Comprehensive renegotiation warranted.`;
    } else if (alignmentScore < 85) {
      return `MODERATE DEVIATION: ${alignmentScore}% alignment with ${formattedExposure} estimated exposure. ${criticalIssues + highIssues} issues merit negotiation attention.`;
    } else {
      return `STRONG ALIGNMENT: Contract achieves ${alignmentScore}% alignment with transparent best practices. Limited exposure of ${formattedExposure}. Minor optimization opportunities exist.`;
    }
  }

  /**
   * Get transparent model clause for reference
   */
  public getModelClause(clauseType: ClauseType): string {
    return TRANSPARENT_MODEL_CLAUSES[clauseType] || "";
  }

  /**
   * Batch comparison for multiple contracts
   */
  public compareMultipleContracts(
    contracts: Array<{ id: string; clauses: ContractClause[]; annualSpend: number }>
  ): Array<{ contract_id: string; analysis: RedlineAnalysis }> {
    return contracts.map(contract => ({
      contract_id: contract.id,
      analysis: this.compareContracts(contract.clauses, contract.annualSpend)
    }));
  }
}