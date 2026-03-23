/**
 * Risk Scoring Engine
 * Calculates contract risk scores based on multiple factors
 */

import type { ContractAnalysisResult, ProvisionAnalysis, RedFlag } from "./types";

export interface RiskScore {
  overall: number;
  financial: number;
  legal: number;
  operational: number;
  compliance: number;
}

export interface RiskFactor {
  category: keyof Omit<RiskScore, "overall">;
  weight: number;
  score: number;
  description: string;
}

/**
 * Calculate comprehensive risk score
 */
export function calculateRiskScore(analysis: ContractAnalysisResult): RiskScore {
  const factors = extractRiskFactors(analysis);

  // Calculate category scores
  const financial = calculateCategoryScore(factors, "financial");
  const legal = calculateCategoryScore(factors, "legal");
  const operational = calculateCategoryScore(factors, "operational");
  const compliance = calculateCategoryScore(factors, "compliance");

  // Weighted overall score
  const overall = Math.round(
    financial * 0.4 + legal * 0.25 + operational * 0.2 + compliance * 0.15
  );

  return {
    overall,
    financial,
    legal,
    operational,
    compliance,
  };
}

/**
 * Extract risk factors from analysis
 */
function extractRiskFactors(analysis: ContractAnalysisResult): RiskFactor[] {
  const factors: RiskFactor[] = [];

  // Analyze provisions
  analysis.provisions.forEach((prov) => {
    if (prov.score < 70) {
      factors.push({
        category: categorizeProvision(prov),
        weight: prov.impact === "high" ? 3 : prov.impact === "medium" ? 2 : 1,
        score: prov.score,
        description: prov.name,
      });
    }
  });

  // Analyze red flags
  analysis.redFlags.forEach((flag) => {
    factors.push({
      category: categorizeRedFlag(flag),
      weight: flag.severity === "Critical" ? 5 : flag.severity === "High" ? 3 : 2,
      score: severityToScore(flag.severity),
      description: flag.title,
    });
  });

  return factors;
}

/**
 * Calculate score for a specific category
 */
function calculateCategoryScore(
  factors: RiskFactor[],
  category: keyof Omit<RiskScore, "overall">
): number {
  const categoryFactors = factors.filter((f) => f.category === category);

  if (categoryFactors.length === 0) return 100;

  const totalWeight = categoryFactors.reduce((sum, f) => sum + f.weight, 0);
  const weightedScore = categoryFactors.reduce(
    (sum, f) => sum + f.score * f.weight,
    0
  );

  return Math.round(weightedScore / totalWeight);
}

/**
 * Categorize provision by type
 */
function categorizeProvision(
  prov: ProvisionAnalysis
): keyof Omit<RiskScore, "overall"> {
  const name = prov.name.toLowerCase();

  if (name.includes("price") || name.includes("fee") || name.includes("rebate")) {
    return "financial";
  }
  if (name.includes("liability") || name.includes("indemnif") || name.includes("termination")) {
    return "legal";
  }
  if (name.includes("audit") || name.includes("reporting") || name.includes("compliance")) {
    return "compliance";
  }
  return "operational";
}

/**
 * Categorize red flag by type
 */
function categorizeRedFlag(flag: RedFlag): keyof Omit<RiskScore, "overall"> {
  const desc = (flag.title + " " + flag.description).toLowerCase();

  if (desc.includes("spread") || desc.includes("mac") || desc.includes("rebate")) {
    return "financial";
  }
  if (desc.includes("liability") || desc.includes("indemnif") || desc.includes("termination")) {
    return "legal";
  }
  if (desc.includes("audit") || desc.includes("reporting") || desc.includes("sla")) {
    return "compliance";
  }
  return "operational";
}

/**
 * Convert severity to numeric score
 */
function severityToScore(severity: string): number {
  switch (severity) {
    case "Critical":
      return 20;
    case "High":
      return 40;
    case "Medium":
      return 60;
    case "Low":
      return 80;
    default:
      return 50;
  }
}

/**
 * Get risk level label
 */
export function getRiskLevel(score: number): {
  label: string;
  color: string;
  bgColor: string;
} {
  if (score >= 80) {
    return { label: "Low Risk", color: "text-emerald-400", bgColor: "bg-emerald-500/20" };
  }
  if (score >= 60) {
    return { label: "Medium Risk", color: "text-yellow-400", bgColor: "bg-yellow-500/20" };
  }
  if (score >= 40) {
    return { label: "High Risk", color: "text-orange-400", bgColor: "bg-orange-500/20" };
  }
  return { label: "Critical Risk", color: "text-red-400", bgColor: "bg-red-500/20" };
}

/**
 * Compare risk scores between contracts
 */
export function compareRiskScores(score1: RiskScore, score2: RiskScore): {
  overall: number;
  financial: number;
  legal: number;
  operational: number;
  compliance: number;
} {
  return {
    overall: score1.overall - score2.overall,
    financial: score1.financial - score2.financial,
    legal: score1.legal - score2.legal,
    operational: score1.operational - score2.operational,
    compliance: score1.compliance - score2.compliance,
  };
}