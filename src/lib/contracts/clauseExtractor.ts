/**
 * Contract Clause Extraction Engine
 * Parses contracts and extracts structured clause data
 */

import { ClauseType, ContractClause, ConfidenceWeightedExtraction, RiskLevel } from "./types";

/**
 * Clause pattern definitions for extraction
 */
const CLAUSE_PATTERNS: Record<ClauseType, RegExp[]> = {
  rebates: [
    /rebate\s+guarantee/i,
    /\d+%\s+rebate/i,
    /minimum\s+rebate/i,
    /rebate\s+pass[\s-]through/i,
  ],
  audit: [
    /audit\s+right/i,
    /independent\s+audit/i,
    /audit\s+frequency/i,
    /audit\s+cost/i,
  ],
  data_ownership: [
    /data\s+ownership/i,
    /proprietary\s+data/i,
    /data\s+rights/i,
    /member\s+data/i,
  ],
  termination: [
    /termination\s+for\s+convenience/i,
    /termination\s+without\s+cause/i,
    /notice\s+period/i,
    /termination\s+fee/i,
  ],
  specialty: [
    /specialty\s+drug/i,
    /high[\s-]cost\s+medication/i,
    /specialty\s+tier/i,
  ],
  mac: [
    /maximum\s+allowable\s+cost/i,
    /\bMAC\b/,
    /generic\s+pricing/i,
  ],
  pricing: [
    /pricing\s+methodology/i,
    /ingredient\s+cost/i,
    /dispensing\s+fee/i,
  ],
  formulary: [
    /formulary\s+design/i,
    /preferred\s+drug\s+list/i,
    /tier\s+structure/i,
  ],
  network: [
    /pharmacy\s+network/i,
    /network\s+access/i,
    /preferred\s+pharmacy/i,
  ],
  reporting: [
    /reporting\s+requirement/i,
    /quarterly\s+report/i,
    /data\s+submission/i,
  ],
  liability: [
    /limitation\s+of\s+liability/i,
    /damages\s+cap/i,
    /consequential\s+damages/i,
  ],
  indemnification: [
    /indemnif/i,
    /hold\s+harmless/i,
    /defend\s+and\s+indemnify/i,
  ],
  confidentiality: [
    /confidential\s+information/i,
    /non[\s-]disclosure/i,
    /trade\s+secret/i,
  ],
  force_majeure: [
    /force\s+majeure/i,
    /act\s+of\s+god/i,
    /unforeseeable\s+circumstances/i,
  ],
};

/**
 * Economic risk indicators
 */
const ECONOMIC_KEYWORDS = [
  "guarantee",
  "minimum",
  "penalty",
  "rebate",
  "discount",
  "fee",
  "payment",
  "pricing",
  "cost",
  "compensation",
];

/**
 * Fiduciary risk indicators
 */
const FIDUCIARY_KEYWORDS = [
  "conflict of interest",
  "undisclosed",
  "affiliate",
  "related party",
  "fiduciary",
  "loyalty",
  "prudent",
];

export class ClauseExtractor {
  /**
   * Extract clauses from contract text
   */
  static extractClauses(
    contractId: string,
    contractText: string,
    contractType: "current" | "template"
  ): ContractClause[] {
    const clauses: ContractClause[] = [];
    const sections = this.splitIntoSections(contractText);

    sections.forEach((section, index) => {
      const detectedTypes = this.detectClauseTypes(section.text);

      detectedTypes.forEach(clauseType => {
        const clause: ContractClause = {
          id: `${contractId}_${clauseType}_${index}`,
          contract_id: contractId,
          clause_type: clauseType,
          clause_text: section.text,
          section_number: section.number,
          page_number: section.page,
          economic_flag: this.hasEconomicImpact(section.text),
          risk_flag: this.assessRiskLevel(section.text, clauseType),
          extracted_at: new Date().toISOString(),
          confidence_score: this.calculateConfidence(section.text, clauseType),
        };

        clauses.push(clause);
      });
    });

    return clauses;
  }

  /**
   * Split contract into logical sections
   */
  private static splitIntoSections(text: string): Array<{
    number?: string;
    text: string;
    page?: number;
  }> {
    // Split by section headers (e.g., "Section 1.1", "Article 3", etc.)
    const sectionRegex = /(?:Section|Article|Clause)\s+(\d+(?:\.\d+)?)[:\s]/gi;
    const sections: Array<{ number?: string; text: string; page?: number }> = [];
    
    let lastIndex = 0;
    let match;
    
    while ((match = sectionRegex.exec(text)) !== null) {
      if (lastIndex > 0) {
        sections.push({
          text: text.substring(lastIndex, match.index).trim(),
        });
      }
      lastIndex = match.index;
    }
    
    // Add final section
    if (lastIndex < text.length) {
      sections.push({
        text: text.substring(lastIndex).trim(),
      });
    }

    return sections;
  }

  /**
   * Detect clause types based on content patterns
   */
  private static detectClauseTypes(text: string): ClauseType[] {
    const detected: ClauseType[] = [];

    for (const [clauseType, patterns] of Object.entries(CLAUSE_PATTERNS)) {
      for (const pattern of patterns) {
        if (pattern.test(text)) {
          detected.push(clauseType as ClauseType);
          break;
        }
      }
    }

    return detected;
  }

  /**
   * Check if clause has economic impact
   */
  private static hasEconomicImpact(text: string): boolean {
    const lowerText = text.toLowerCase();
    return ECONOMIC_KEYWORDS.some(keyword => lowerText.includes(keyword));
  }

  /**
   * Assess risk level of clause
   */
  private static assessRiskLevel(text: string, clauseType: ClauseType): RiskLevel {
    const lowerText = text.toLowerCase();

    // Check for fiduciary risk indicators
    const hasFiduciaryRisk = FIDUCIARY_KEYWORDS.some(keyword => 
      lowerText.includes(keyword)
    );

    // High-risk clause types
    const highRiskTypes: ClauseType[] = [
      "liability",
      "indemnification",
      "termination",
      "audit",
    ];

    // Critical clause types
    const criticalTypes: ClauseType[] = ["rebates", "data_ownership"];

    if (hasFiduciaryRisk) return "critical";
    if (criticalTypes.includes(clauseType)) return "high";
    if (highRiskTypes.includes(clauseType)) return "medium";

    return "low";
  }

  /**
   * Calculate extraction confidence score
   */
  private static calculateConfidence(text: string, clauseType: ClauseType): number {
    const patterns = CLAUSE_PATTERNS[clauseType];
    let matchCount = 0;

    for (const pattern of patterns) {
      if (pattern.test(text)) {
        matchCount++;
      }
    }

    // Base confidence on pattern matches and text length
    const patternConfidence = Math.min(matchCount / patterns.length, 1);
    const lengthConfidence = Math.min(text.length / 500, 1); // Optimal around 500 chars
    
    return (patternConfidence * 0.7 + lengthConfidence * 0.3);
  }

  /**
   * Extract specific field with confidence weighting
   */
  static extractField(
    text: string,
    fieldName: string,
    pattern: RegExp,
    page: number
  ): ConfidenceWeightedExtraction | null {
    const match = text.match(pattern);
    
    if (!match) return null;

    return {
      field_name: fieldName,
      extracted_value: match[1] || match[0],
      confidence_score: this.calculateFieldConfidence(match, pattern),
      extraction_method: "pattern_match",
      validation_status: "needs_review",
      source_location: { page },
    };
  }

  /**
   * Calculate confidence for field extraction
   */
  private static calculateFieldConfidence(match: RegExpMatchArray, pattern: RegExp): number {
    // Higher confidence for capturing groups and specific patterns
    const hasCapturingGroup = match.length > 1 && match[1] !== undefined;
    const matchLength = match[0].length;
    
    let confidence = 0.5; // Base confidence

    if (hasCapturingGroup) confidence += 0.3;
    if (matchLength > 10) confidence += 0.1;
    if (matchLength < 100) confidence += 0.1; // Prefer concise matches

    return Math.min(confidence, 1);
  }
}