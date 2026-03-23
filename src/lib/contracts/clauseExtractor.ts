/**
 * Advanced Clause Extraction
 * Identifies and categorizes contract clauses using pattern matching
 */

export interface ExtractedClause {
  id: string;
  type: string;
  title: string;
  text: string;
  page: number;
  section: string;
  importance: "critical" | "high" | "medium" | "low";
  tags: string[];
}

export interface ClauseCategory {
  name: string;
  patterns: RegExp[];
  importance: "critical" | "high" | "medium" | "low";
  tags: string[];
}

// Clause detection patterns
const CLAUSE_CATEGORIES: ClauseCategory[] = [
  {
    name: "Termination",
    patterns: [
      /termination/i,
      /cancellation/i,
      /early termination/i,
      /notice period/i,
    ],
    importance: "critical",
    tags: ["contract-terms", "exit"],
  },
  {
    name: "Pricing",
    patterns: [
      /pricing/i,
      /fees/i,
      /administrative fee/i,
      /dispensing fee/i,
      /cost/i,
    ],
    importance: "critical",
    tags: ["financial", "pricing"],
  },
  {
    name: "Rebates",
    patterns: [
      /rebate/i,
      /pass[\s-]through/i,
      /manufacturer rebate/i,
      /rebate sharing/i,
    ],
    importance: "critical",
    tags: ["financial", "rebates"],
  },
  {
    name: "Liability",
    patterns: [
      /liability/i,
      /indemnification/i,
      /hold harmless/i,
      /damages/i,
    ],
    importance: "high",
    tags: ["legal", "risk"],
  },
  {
    name: "Audit Rights",
    patterns: [
      /audit/i,
      /inspection/i,
      /right to audit/i,
      /examination of records/i,
    ],
    importance: "high",
    tags: ["oversight", "compliance"],
  },
  {
    name: "Confidentiality",
    patterns: [
      /confidential/i,
      /proprietary/i,
      /non[\s-]disclosure/i,
      /trade secret/i,
    ],
    importance: "medium",
    tags: ["legal", "data"],
  },
  {
    name: "Performance Guarantees",
    patterns: [
      /guarantee/i,
      /service level/i,
      /performance standard/i,
      /sla/i,
    ],
    importance: "high",
    tags: ["service", "quality"],
  },
];

/**
 * Extract clauses from contract text
 */
export function extractClauses(
  text: string,
  metadata?: { pageCount?: number }
): ExtractedClause[] {
  const clauses: ExtractedClause[] = [];
  const sections = text.split(/\n\n+/);

  sections.forEach((section, index) => {
    // Try to identify clause type
    for (const category of CLAUSE_CATEGORIES) {
      const matches = category.patterns.some((pattern) => pattern.test(section));

      if (matches) {
        clauses.push({
          id: `clause-${index}`,
          type: category.name,
          title: extractTitle(section),
          text: section.trim(),
          page: estimatePage(index, sections.length, metadata?.pageCount || 1),
          section: `Section ${Math.floor(index / 5) + 1}`,
          importance: category.importance,
          tags: category.tags,
        });
        break;
      }
    }
  });

  return clauses;
}

/**
 * Extract title from section text
 */
function extractTitle(text: string): string {
  const lines = text.split("\n");
  const firstLine = lines[0].trim();

  // If first line is short and uppercase-heavy, use as title
  if (firstLine.length < 100 && /[A-Z]/.test(firstLine)) {
    return firstLine;
  }

  // Otherwise, take first 80 chars
  return text.substring(0, 80) + (text.length > 80 ? "..." : "");
}

/**
 * Estimate page number based on section position
 */
function estimatePage(
  sectionIndex: number,
  totalSections: number,
  totalPages: number
): number {
  const ratio = sectionIndex / totalSections;
  return Math.max(1, Math.ceil(ratio * totalPages));
}

/**
 * Group clauses by category
 */
export function groupClausesByType(
  clauses: ExtractedClause[]
): Record<string, ExtractedClause[]> {
  const grouped: Record<string, ExtractedClause[]> = {};

  clauses.forEach((clause) => {
    if (!grouped[clause.type]) {
      grouped[clause.type] = [];
    }
    grouped[clause.type].push(clause);
  });

  return grouped;
}

/**
 * Find critical clauses that need review
 */
export function findCriticalClauses(clauses: ExtractedClause[]): ExtractedClause[] {
  return clauses.filter((c) => c.importance === "critical");
}