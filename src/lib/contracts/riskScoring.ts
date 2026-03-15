// Risk scoring and evaluation engine

import type { Clause, ClauseScore, PBMClauseCategory, RiskExplanation } from "./types";

/**
 * Score a clause across 5 dimensions
 */
export function scoreClause(clause: Clause): ClauseScore {
  const text = clause.textSnippet.toLowerCase();
  const category = clause.category;
  
  // Base scores (would use AI analysis in production)
  let transparencyScore = 5;
  let employerProtectionScore = 5;
  let economicAlignmentScore = 5;
  let auditabilityScore = 5;
  let exitFlexibilityScore = 5;
  
  // Category-specific scoring logic
  switch (category) {
    case "rebate_ownership":
      if (text.includes("100%") && text.includes("employer")) {
        transparencyScore = 9;
        employerProtectionScore = 10;
        economicAlignmentScore = 10;
      } else if (text.includes("pbm retains") || text.includes("shared")) {
        transparencyScore = 3;
        employerProtectionScore = 2;
        economicAlignmentScore = 2;
      }
      break;
      
    case "audit_rights":
      if (text.includes("unlimited") || text.includes("unrestricted")) {
        auditabilityScore = 10;
        transparencyScore = 9;
      } else if (text.includes("once per year") || text.includes("limited")) {
        auditabilityScore = 4;
        transparencyScore = 5;
      }
      break;
      
    case "spread_pricing":
      if (text.includes("prohibited") || text.includes("not permitted")) {
        transparencyScore = 10;
        economicAlignmentScore = 10;
      } else if (text.includes("allowed") || text.includes("permitted")) {
        transparencyScore = 2;
        economicAlignmentScore = 2;
      }
      break;
      
    case "termination_rights":
      if (text.includes("for cause") && text.includes("30 day")) {
        exitFlexibilityScore = 9;
        employerProtectionScore = 8;
      } else if (text.includes("180 day") || text.includes("no cause")) {
        exitFlexibilityScore = 3;
      }
      break;
      
    case "data_ownership":
      if (text.includes("employer owns")) {
        transparencyScore = 10;
        auditabilityScore = 9;
      } else if (text.includes("pbm owns") || text.includes("proprietary")) {
        transparencyScore = 3;
        auditabilityScore = 3;
      }
      break;
      
    default:
      // Default scoring - look for red flag keywords
      if (text.includes("proprietary") || text.includes("confidential")) {
        transparencyScore -= 2;
        auditabilityScore -= 2;
      }
      if (text.includes("unlimited") || text.includes("unrestricted")) {
        employerProtectionScore += 2;
      }
  }
  
  // Calculate overall score
  const overallScore = Math.round(
    (transparencyScore + employerProtectionScore + economicAlignmentScore + 
     auditabilityScore + exitFlexibilityScore) / 5
  );
  
  // Determine risk level
  let riskLevel: "red" | "yellow" | "green" = "green";
  if (overallScore < 5) riskLevel = "red";
  else if (overallScore < 7) riskLevel = "yellow";
  
  return {
    clauseId: clause.id,
    transparencyScore,
    employerProtectionScore,
    economicAlignmentScore,
    auditabilityScore,
    exitFlexibilityScore,
    overallScore,
    riskLevel
  };
}

/**
 * Generate risk explanation for a clause
 */
export function generateRiskExplanation(
  clause: Clause,
  score: ClauseScore
): RiskExplanation {
  const category = clause.category;
  const riskLevel = score.riskLevel;
  
  // Template-based explanations (would use AI in production)
  const explanations: Record<PBMClauseCategory, RiskExplanation> = {
    rebate_ownership: {
      clauseId: clause.id,
      whatItSays: "This clause defines who owns pharmaceutical rebates generated from your plan.",
      whyItMatters: "Rebates can represent 20-40% of drug costs. Ownership determines whether savings flow to your plan or the PBM.",
      riskIfUnchanged: riskLevel === "red" 
        ? "PBM retains rebates, costing you $500K-$2M annually in hidden revenue."
        : "Rebate ownership is unclear, creating audit and recovery challenges.",
      economicConcern: "Annual hidden cost of $1.2M-$3.5M for typical mid-market employer.",
      suggestedPosition: "Demand 100% rebate pass-through with quarterly reconciliation."
    },
    
    audit_rights: {
      clauseId: clause.id,
      whatItSays: "This clause defines your rights to audit PBM performance and billing.",
      whyItMatters: "Without audit rights, you cannot verify discounts, rebates, or fee calculations.",
      riskIfUnchanged: riskLevel === "red"
        ? "No meaningful audit rights means zero accountability and likely overcharges."
        : "Limited audit rights restrict your ability to verify PBM performance.",
      economicConcern: "Unaudited PBMs typically overbill 8-15% annually.",
      suggestedPosition: "Require unlimited audit rights with full data access."
    },
    
    spread_pricing: {
      clauseId: clause.id,
      whatItSays: "This clause addresses whether the PBM can charge you more than they pay pharmacies.",
      whyItMatters: "Spread pricing creates hidden markups on every claim, typically $2-$15 per prescription.",
      riskIfUnchanged: riskLevel === "red"
        ? "PBM can charge unlimited spreads, costing $300K-$1M annually."
        : "Spread pricing exists but may be capped or disclosed.",
      economicConcern: "Typical spread costs: $8-$12 per Rx × 50,000 Rx = $400K-$600K annually.",
      suggestedPosition: "Prohibit spread pricing or require full AWP-minus pass-through."
    },
    
    data_ownership: {
      clauseId: clause.id,
      whatItSays: "This clause defines who owns your pharmacy claims data.",
      whyItMatters: "Data ownership determines your ability to analyze costs, switch vendors, and negotiate.",
      riskIfUnchanged: riskLevel === "red"
        ? "PBM owns your data, blocking analytics, audits, and clean exits."
        : "Data ownership is shared or unclear, limiting your control.",
      economicConcern: "Loss of data control blocks $500K+ in optimization opportunities.",
      suggestedPosition: "Demand full data ownership with unrestricted access and portability."
    },
    
    termination_rights: {
      clauseId: clause.id,
      whatItSays: "This clause defines how and when you can terminate the PBM relationship.",
      whyItMatters: "Termination rights determine whether you're locked in or can exit if performance fails.",
      riskIfUnchanged: riskLevel === "red"
        ? "Extended lock-in period prevents exit even if PBM underperforms or overbills."
        : "Limited termination rights make exits difficult and costly.",
      economicConcern: "Inability to exit costs $2M+ if PBM fails to perform.",
      suggestedPosition: "Require for-cause termination with 30-60 day notice."
    },
    
    specialty_drug: {
      clauseId: clause.id,
      whatItSays: "This clause governs how specialty medications are managed and priced.",
      whyItMatters: "Specialty drugs represent 2% of prescriptions but 50%+ of costs.",
      riskIfUnchanged: riskLevel === "red"
        ? "PBM controls specialty pricing with no transparency or guarantees."
        : "Specialty terms may allow markups or steering to high-cost channels.",
      economicConcern: "Hidden specialty markups cost $500K-$2M annually.",
      suggestedPosition: "Demand specialty carve-out or guaranteed net pricing with full transparency."
    },
    
    fiduciary_commitment: {
      clauseId: clause.id,
      whatItSays: "This clause addresses whether the PBM has a fiduciary duty to act in your best interest.",
      whyItMatters: "Fiduciary status means legal obligation to prioritize your interests over their profits.",
      riskIfUnchanged: riskLevel === "red"
        ? "No fiduciary duty means PBM can prioritize their revenue over your savings."
        : "Limited fiduciary language provides weak legal protections.",
      economicConcern: "Non-fiduciary PBMs cost 15-25% more than fiduciary arrangements.",
      suggestedPosition: "Require explicit ERISA fiduciary acknowledgment."
    },
    
    transition_assistance: {
      clauseId: clause.id,
      whatItSays: "This clause covers PBM obligations when you switch vendors.",
      whyItMatters: "Poor transition assistance can cause member disruption and data loss.",
      riskIfUnchanged: riskLevel === "red"
        ? "No transition support means difficult exits and potential data loss."
        : "Limited transition assistance creates switching friction.",
      economicConcern: "Poor exits cost $200K-$500K in consulting and member issues.",
      suggestedPosition: "Require 90-day transition support with full data transfer."
    },
    
    // Simplified explanations for remaining categories
    rebate_definition: createGenericExplanation(clause.id, "rebate definitions and calculations"),
    rebate_timing: createGenericExplanation(clause.id, "rebate reconciliation timing"),
    admin_fees: createGenericExplanation(clause.id, "administrative fee structure"),
    data_access: createGenericExplanation(clause.id, "data access and reporting rights"),
    guaranteed_discounts: createGenericExplanation(clause.id, "discount guarantees"),
    guaranteed_rebates: createGenericExplanation(clause.id, "rebate guarantees"),
    formulary_control: createGenericExplanation(clause.id, "formulary management"),
    pharmacy_network: createGenericExplanation(clause.id, "pharmacy network terms"),
    mail_order_steering: createGenericExplanation(clause.id, "mail-order requirements"),
    manufacturer_revenue: createGenericExplanation(clause.id, "manufacturer revenue streams"),
    lowest_net_cost: createGenericExplanation(clause.id, "pricing methodology"),
    carve_out_rights: createGenericExplanation(clause.id, "vendor carve-out options"),
    unclassified: createGenericExplanation(clause.id, "contract terms")
  };
  
  return explanations[category] || explanations.unclassified;
}

function createGenericExplanation(clauseId: string, topic: string): RiskExplanation {
  return {
    clauseId,
    whatItSays: `This clause addresses ${topic}.`,
    whyItMatters: `Understanding ${topic} is critical for contract governance.`,
    riskIfUnchanged: `This clause requires review to ensure employer protection.`,
    economicConcern: `Unclear ${topic} may create economic exposure.`,
    suggestedPosition: `Negotiate clearer language around ${topic}.`
  };
}

/**
 * Calculate overall contract score
 */
export function calculateContractScore(scores: ClauseScore[]): number {
  if (scores.length === 0) return 0;
  
  const sum = scores.reduce((acc, score) => acc + score.overallScore, 0);
  return Math.round(sum / scores.length);
}

/**
 * Count risk levels across contract
 */
export function countRiskLevels(scores: ClauseScore[]): {
  red: number;
  yellow: number;
  green: number;
} {
  return scores.reduce(
    (acc, score) => {
      acc[score.riskLevel]++;
      return acc;
    },
    { red: 0, yellow: 0, green: 0 }
  );
}