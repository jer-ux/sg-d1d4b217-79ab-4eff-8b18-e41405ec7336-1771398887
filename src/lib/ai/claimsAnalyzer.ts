/**
 * Claims Pattern Analyzer with Claude AI
 * Detects fraud, identifies cost drivers, generates insights
 */

import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

export interface ClaimRecord {
  claimId: string;
  memberId: string;
  providerId: string;
  serviceDate: string;
  drugName?: string;
  ndcCode?: string;
  quantity: number;
  daysSupply?: number;
  amountBilled: number;
  amountPaid: number;
  copay: number;
  claimType: "pharmacy" | "medical";
}

export interface FraudPattern {
  patternType: "upcoding" | "duplicate" | "splitting" | "phantom" | "network_gaming";
  severity: "low" | "medium" | "high" | "critical";
  affectedClaims: string[];
  financialImpact: number;
  confidence: number;
  description: string;
  evidence: string[];
  recommendation: string;
}

export interface CostDriver {
  category: string;
  totalCost: number;
  claimCount: number;
  trendVsPrevious: number; // percentage
  topDrugs?: Array<{
    name: string;
    cost: number;
    utilization: number;
  }>;
  optimizationOpportunity?: {
    description: string;
    potentialSavings: number;
    implementation: string;
  };
}

/**
 * Analyze claims for fraud patterns
 */
export async function detectFraudPatterns(
  claims: ClaimRecord[]
): Promise<FraudPattern[]> {
  try {
    // Group claims for pattern analysis
    const claimsSummary = claims.slice(0, 1000).map(c => ({
      id: c.claimId,
      member: c.memberId,
      provider: c.providerId,
      date: c.serviceDate,
      drug: c.drugName,
      ndc: c.ndcCode,
      qty: c.quantity,
      billed: c.amountBilled,
      paid: c.amountPaid
    }));

    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 4096,
      system: `You are a healthcare fraud detection expert. Analyze claims data for suspicious patterns:

FRAUD PATTERNS TO DETECT:
1. UPCODING: Brand drugs billed but generics dispensed
2. DUPLICATE BILLING: Same service billed multiple times
3. PRESCRIPTION SPLITTING: 90-day supplies split into 3×30-day
4. PHANTOM BILLING: Services billed but never rendered
5. NETWORK GAMING: Out-of-network claims disguised as in-network

For each pattern found, provide:
- Pattern type
- Severity (based on financial impact)
- Affected claim IDs
- Financial impact estimate
- Confidence level (0-100)
- Clear description
- Evidence supporting detection
- Recommended action

Return JSON array of fraud patterns.`,
      messages: [{
        role: "user",
        content: `Analyze these ${claims.length} claims for fraud patterns:

${JSON.stringify(claimsSummary, null, 2)}

Focus on high-impact patterns first.`
      }]
    });

    const content = response.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response type");
    }

    return JSON.parse(content.text);
  } catch (error) {
    console.error("Failed to detect fraud patterns:", error);
    return [];
  }
}

/**
 * Identify cost drivers and optimization opportunities
 */
export async function analyzeCostDrivers(
  claims: ClaimRecord[],
  previousPeriodClaims?: ClaimRecord[]
): Promise<{
  drivers: CostDriver[];
  insights: string[];
  recommendations: Array<{
    title: string;
    description: string;
    savings: number;
    implementation: string;
    priority: "low" | "medium" | "high";
  }>;
}> {
  try {
    const totalCost = claims.reduce((sum, c) => sum + c.amountPaid, 0);
    const previousCost = previousPeriodClaims?.reduce((sum, c) => sum + c.amountPaid, 0) || 0;

    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 4096,
      system: `You are a healthcare cost management expert. Analyze claims to identify:
1. Major cost drivers (drug classes, conditions, providers)
2. Trends vs previous period
3. Optimization opportunities
4. Specific, actionable recommendations

Provide data-driven insights with financial impact estimates.`,
      messages: [{
        role: "user",
        content: `Analyze cost drivers for ${claims.length} claims:

CURRENT PERIOD:
- Total Claims: ${claims.length}
- Total Cost: $${(totalCost / 1000000).toFixed(2)}M

${previousPeriodClaims ? `
PREVIOUS PERIOD:
- Total Claims: ${previousPeriodClaims.length}
- Total Cost: $${(previousCost / 1000000).toFixed(2)}M
- Trend: ${((totalCost - previousCost) / previousCost * 100).toFixed(1)}%
` : ""}

TOP DRUGS BY COST:
${claims
  .filter(c => c.drugName)
  .reduce((acc, c) => {
    const existing = acc.find(d => d.name === c.drugName);
    if (existing) {
      existing.cost += c.amountPaid;
      existing.count += 1;
    } else {
      acc.push({ name: c.drugName!, cost: c.amountPaid, count: 1 });
    }
    return acc;
  }, [] as Array<{ name: string; cost: number; count: number }>)
  .sort((a, b) => b.cost - a.cost)
  .slice(0, 10)
  .map(d => `${d.name}: $${(d.cost / 1000).toFixed(0)}K (${d.count} claims)`)
  .join("\n")}

Identify cost drivers and optimization opportunities.`
      }]
    });

    const content = response.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response type");
    }

    return JSON.parse(content.text);
  } catch (error) {
    console.error("Failed to analyze cost drivers:", error);
    return { drivers: [], insights: [], recommendations: [] };
  }
}

/**
 * Generate fraud investigation report
 */
export function generateFraudReport(
  patterns: FraudPattern[],
  claims: ClaimRecord[]
): string {
  const totalImpact = patterns.reduce((sum, p) => sum + p.financialImpact, 0);
  const criticalPatterns = patterns.filter(p => p.severity === "critical");

  return `
# Claims Fraud Detection Report
**Generated:** ${new Date().toLocaleDateString()}
**Claims Analyzed:** ${claims.length.toLocaleString()}

## Executive Summary

**Fraud Patterns Detected:** ${patterns.length}
**Critical Issues:** ${criticalPatterns.length}
**Total Financial Impact:** $${(totalImpact / 1000).toFixed(0)}K

${criticalPatterns.length > 0 ? `
## Critical Patterns Requiring Immediate Action

${criticalPatterns.map((pattern, i) => `
### ${i + 1}. ${pattern.patternType.toUpperCase()}

**Financial Impact:** $${(pattern.financialImpact / 1000).toFixed(0)}K
**Confidence:** ${Math.round(pattern.confidence * 100)}%
**Affected Claims:** ${pattern.affectedClaims.length}

**Description:** ${pattern.description}

**Evidence:**
${pattern.evidence.map(e => `- ${e}`).join("\n")}

**Recommendation:** ${pattern.recommendation}

---
`).join("\n")}
` : ""}

## All Detected Patterns

${patterns.map((pattern, i) => `
### Pattern ${i + 1}: ${pattern.patternType}

- **Severity:** ${pattern.severity}
- **Impact:** $${(pattern.financialImpact / 1000).toFixed(0)}K
- **Claims:** ${pattern.affectedClaims.length}
- **Action:** ${pattern.recommendation}
`).join("\n")}

## Recommended Actions

1. **Immediate:** Investigate all critical patterns (${criticalPatterns.length} items)
2. **This Week:** Review medium/high severity patterns
3. **This Month:** Implement fraud prevention controls
4. **Ongoing:** Monitor for pattern recurrence

## Next Steps

- Refer critical patterns to Special Investigation Unit (SIU)
- Request refunds for duplicate/improper payments
- Update claims processing edits to prevent recurrence
- Conduct provider audits for flagged entities
- Implement automated fraud detection alerts
`;
}