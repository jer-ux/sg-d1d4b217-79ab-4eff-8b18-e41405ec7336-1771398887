/**
 * Policy Document Analyzer with Claude AI
 * Analyzes insurance policies, extracts terms, generates summaries
 */

import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

export interface PolicyAnalysis {
  planType: string;
  effectiveDate: string;
  renewalDate: string;
  network: string;
  coveredLives: number;
  financialTerms: {
    deductible: string;
    outOfPocketMax: string;
    coinsurance: string;
    copays: {
      primaryCare: number;
      specialist: number;
      emergency: number;
      prescriptions: string;
    };
  };
  coverageHighlights: Array<{
    category: string;
    coverage: string;
    rating: "excellent" | "good" | "average" | "poor";
  }>;
  redFlags: Array<{
    issue: string;
    location: string;
    impact: string;
    recommendation: string;
    severity: "low" | "medium" | "high" | "critical";
  }>;
  memberSummary: string;
  complianceCheck: {
    acaCompliant: boolean;
    mentalHealthParity: boolean;
    preventiveServices: boolean;
    missingElements: string[];
  };
}

/**
 * Analyze insurance policy document
 */
export async function analyzePolicyDocument(
  policyText: string,
  documentName: string
): Promise<PolicyAnalysis> {
  try {
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 8192,
      system: `You are an expert insurance policy analyst. Analyze health insurance policies and extract:

1. PLAN BASICS: Type, dates, network, covered lives
2. FINANCIAL TERMS: Deductibles, OOP max, coinsurance, copays
3. COVERAGE HIGHLIGHTS: Key benefits with ratings
4. RED FLAGS: Issues that could hurt members or increase costs
5. MEMBER SUMMARY: Plain language explanation (8th grade reading level)
6. COMPLIANCE: ACA, parity, preventive services

Rate coverage as: excellent, good, average, poor
Flag severity as: low, medium, high, critical

Return comprehensive JSON analysis.`,
      messages: [{
        role: "user",
        content: `Analyze this insurance policy document:

DOCUMENT: ${documentName}

POLICY TEXT (first 20,000 characters):
${policyText.substring(0, 20000)}

Provide complete analysis in JSON format.`
      }]
    });

    const content = response.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response type");
    }

    const analysis = JSON.parse(content.text);
    return analysis as PolicyAnalysis;
  } catch (error) {
    console.error("Failed to analyze policy document:", error);
    throw error;
  }
}

/**
 * Generate member-friendly policy summary
 */
export async function generateMemberSummary(
  policyAnalysis: PolicyAnalysis
): Promise<string> {
  try {
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 2048,
      system: `You are a benefits communication expert. Create clear, friendly summaries of health insurance policies for employees.

Guidelines:
1. Use plain language (8th grade reading level)
2. Highlight what matters most to members
3. Include practical tips to save money
4. Make it scannable (bullets, short paragraphs)
5. Positive tone (but honest about limitations)`,
      messages: [{
        role: "user",
        content: `Create a 1-page member-friendly summary of this policy:

PLAN TYPE: ${policyAnalysis.planType}
DEDUCTIBLE: ${policyAnalysis.financialTerms.deductible}
OOP MAX: ${policyAnalysis.financialTerms.outOfPocketMax}
COPAYS: Primary $${policyAnalysis.financialTerms.copays.primaryCare}, Specialist $${policyAnalysis.financialTerms.copays.specialist}

KEY BENEFITS:
${policyAnalysis.coverageHighlights.map(h => `- ${h.category}: ${h.coverage}`).join("\n")}

RED FLAGS:
${policyAnalysis.redFlags.map(f => `- ${f.issue}`).join("\n")}

Create an engaging, helpful summary for employees.`
      }]
    });

    const content = response.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response type");
    }

    return content.text;
  } catch (error) {
    console.error("Failed to generate member summary:", error);
    throw error;
  }
}

/**
 * Compare policy against best practices
 */
export async function compareToBestPractices(
  policyAnalysis: PolicyAnalysis
): Promise<{
  score: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: Array<{
    area: string;
    current: string;
    bestPractice: string;
    impact: string;
  }>;
}> {
  try {
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 3072,
      system: `You are a benefits benchmarking expert. Compare insurance policies against industry best practices.

Best Practices Benchmarks:
- Deductible: $1,500 or less (individual)
- OOP Max: $6,000 or less (individual)
- Preventive Care: 100% coverage, no deductible
- Mental Health: Full parity with medical
- Telemedicine: Included with low/no copay
- Prescription Tiers: 3-4 tiers standard
- Prior Authorization: Minimal (< 50 procedures)
- Out-of-Network: 70%+ coverage
- Fertility: $10K+ lifetime benefit

Return score (0-100) and detailed comparison.`,
      messages: [{
        role: "user",
        content: `Compare this policy to best practices:

${JSON.stringify(policyAnalysis, null, 2)}

Provide strengths, weaknesses, and specific recommendations.`
      }]
    });

    const content = response.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response type");
    }

    return JSON.parse(content.text);
  } catch (error) {
    console.error("Failed to compare to best practices:", error);
    throw error;
  }
}