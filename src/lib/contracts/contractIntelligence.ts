/**
 * Contract Intelligence Orchestration Service
 * Central engine for extracting, scoring, and generating reports from PBM contracts.
 */

import { extractClauses } from "./clauseExtractor";
import { scoreClause } from "./riskScoring";
import { generateReport } from "./reportGenerator";
import type { 
  Contract, 
  ClauseAnalysis, 
  ContractReport,
  RiskExplanation,
  NegotiationLanguage
} from "./types";

export interface IntelligenceResult {
  contract: Contract;
  analyses: ClauseAnalysis[];
  report: ContractReport;
}

export class ContractIntelligenceEngine {
  /**
   * Main analysis pipeline
   */
  static async analyze(
    fileId: string,
    fileName: string,
    text: string
  ): Promise<IntelligenceResult> {
    // 1. Initialize contract data
    const contract: Contract = {
      id: fileId,
      fileName,
      uploadDate: new Date(),
      organization: "Acme Corp",
      extractedText: text,
      version: "1.0",
      status: "analyzed",
      pageCount: Math.max(1, Math.ceil(text.length / 3000))
    };

    // 2. Extract and classify clauses
    const clauses = extractClauses(fileId, text);

    // 3. Score clauses and generate rich metadata
    const analyses: ClauseAnalysis[] = clauses.map(clause => {
      const score = scoreClause(clause);
      
      const riskExplanation: RiskExplanation = {
        clauseId: clause.id,
        whatItSays: `The contract specifies terms related to ${clause.category.replace(/_/g, " ")}.`,
        whyItMatters: "Directly impacts employer cost control and fiduciary oversight.",
        riskIfUnchanged: score.riskLevel === "red" 
          ? "High probability of hidden fee leakage or loss of data control." 
          : "Potential misalignment with best-in-class transparent models.",
        economicConcern: score.riskLevel === "red" ? "Severe" : score.riskLevel === "yellow" ? "Moderate" : "Low",
        suggestedPosition: "Mandate complete transparency and strict pass-through."
      };

      const negotiationLanguage: NegotiationLanguage = {
        category: clause.category,
        modelLanguage: `PBM shall pass through 100% of all revenue derived from ${clause.category.replace(/_/g, " ")}, fully transparent to the Plan Sponsor.`,
        fallbackLanguage: `PBM shall report on all revenue derived from ${clause.category.replace(/_/g, " ")} with limited retention.`,
        brokerTalkingPoints: [
          "This is a standard requirement for ERIS/fiduciary compliance.",
          "Ensures economic alignment between PBM and Plan Sponsor."
        ],
        executiveExplanation: "Mitigates hidden margin extraction by the vendor."
      };

      return {
        clause,
        score,
        riskExplanation,
        negotiationLanguage
      };
    });

    // 4. Generate multi-audience deliverables
    const report = generateReport(fileId, analyses);

    return {
      contract,
      analyses,
      report
    };
  }
}