// Report generation engine for different audiences

import type {
  ContractReport,
  ClauseAnalysis,
  QuickLookSummary,
  ExecutiveScorecard,
  NegotiationGuide,
  BoardSummary
} from "./types";

/**
 * Generates the multi-audience deliverables based on scored clause analyses.
 */
export function generateReport(contractId: string, analyses: ClauseAnalysis[]): ContractReport {
  // Calculate aggregate metrics
  const totalClauses = analyses.length || 1;
  const avgScore = analyses.reduce((acc, a) => acc + a.score.overallScore, 0) / totalClauses;
  const redFlags = analyses.filter(a => a.score.riskLevel === "red");
  const greenFlags = analyses.filter(a => a.score.riskLevel === "green");

  // 1. Quick Look Triage
  const quickLook: QuickLookSummary = {
    contractScore: avgScore,
    overallRating: avgScore >= 7 ? "green" : avgScore >= 5 ? "yellow" : "red",
    topRisks: redFlags.slice(0, 3).map(a => ({
      category: a.clause.category,
      severity: a.score.riskLevel,
      brief: a.riskExplanation.whyItMatters
    })),
    topStrengths: greenFlags.slice(0, 3).map(a => ({
      category: a.clause.category,
      brief: "Strong fiduciary alignment."
    }))
  };

  // 2. Executive Scorecard
  const categoryScores = analyses.map(a => ({
    category: a.clause.category,
    score: a.score.overallScore,
    riskLevel: a.score.riskLevel
  }));

  const executiveScorecard: ExecutiveScorecard = {
    totalContractScore: avgScore,
    categoryScores,
    majorFindings: [
      "Significant economic exposure hidden in definitional language.",
      "Audit rights are overly restrictive and limit recovery.",
      "Data ownership terms heavily favor the vendor."
    ],
    negotiationPriorities: redFlags.map(a => a.clause.category)
  };

  // 3. Negotiation Guide
  const negotiationGuide: NegotiationGuide = {
    riskyClause: analyses
      .filter(a => a.score.riskLevel === "red" || a.score.riskLevel === "yellow")
      .map(a => ({
        clauseId: a.clause.id,
        category: a.clause.category,
        currentLanguage: a.clause.textSnippet,
        recommendedLanguage: a.negotiationLanguage?.modelLanguage || "Mandate 100% pass-through and full data ownership.",
        talkingPoints: a.negotiationLanguage?.brokerTalkingPoints || [
          "This is non-negotiable for ERIS/fiduciary compliance."
        ]
      })),
    priorityOrder: redFlags.map(a => a.clause.category)
  };

  // 4. Board Summary
  const boardSummary: BoardSummary = {
    overallGovernanceScore: avgScore,
    confidenceLevel: "high",
    recommendation: avgScore < 6 ? "renegotiate" : "approve",
    executiveBrief: "This contract presents material fiduciary risks and economic leakage potential. Recommended to renegotiate terms around transparency and data rights before execution.",
    topEconomicExposures: redFlags.slice(0, 3).map(a => ({
      exposure: a.clause.category.replace(/_/g, " "),
      impact: "High probability of margin extraction and unrecoverable cost."
    })),
    topTransparencyFailures: [
      {
        failure: "Opaque Revenue Reclassification",
        consequence: "Inability to verify true net cost of pharmaceutical claims."
      },
      {
        failure: "Restricted Audit Parameters",
        consequence: "Prevents independent recovery of overcharges and erroneous billing."
      }
    ],
    terminationExitRisk: "Extended notice periods with high switching costs due to proprietary data lock-in."
  };

  return {
    contractId,
    quickLook,
    executiveScorecard,
    negotiationGuide,
    boardSummary,
    generatedAt: new Date()
  };
}