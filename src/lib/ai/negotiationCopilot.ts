/**
 * Vendor Negotiation Copilot with Claude AI
 * Analyzes proposals, generates counter-offers, predicts outcomes
 */

import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

export interface VendorProposal {
  vendorName: string;
  proposalDate: string;
  term: number; // years
  adminFee: number; // PEPM
  rebatePassThrough: number; // percentage
  hasSpreadPricing: boolean;
  auditFrequency: string;
  terminationNotice: number; // days
  performanceGuarantees: boolean;
  proposalText: string;
}

export interface NegotiationAnalysis {
  leverage: "low" | "medium" | "high" | "critical";
  vendorConcessionLikelihood: number; // 0-100
  marketPosition: {
    adminFeeVsMarket: number; // percentage difference
    rebateVsMarket: number;
    overallPositioning: string;
  };
  strengths: string[];
  weaknesses: string[];
  counterOffer: {
    adminFee: number;
    rebatePassThrough: number;
    eliminateSpreadPricing: boolean;
    term: number;
    auditFrequency: string;
    justification: string;
  };
  negotiationTactics: {
    opening: string;
    resistance: string;
    compromise: string;
    walkAway: string;
  };
  predictedOutcome: {
    adminFee: number;
    rebatePassThrough: number;
    confidence: number;
    estimatedSavings: number;
  };
}

/**
 * Analyze vendor proposal and generate negotiation strategy
 */
export async function analyzeProposal(
  proposal: VendorProposal,
  currentContract?: {
    adminFee: number;
    rebatePassThrough: number;
    annualCost: number;
  },
  competitiveBids?: Array<{
    vendor: string;
    adminFee: number;
    rebatePassThrough: number;
  }>
): Promise<NegotiationAnalysis> {
  try {
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 4096,
      system: `You are an expert procurement negotiator specializing in PBM and healthcare vendor contracts. Analyze vendor proposals and provide strategic negotiation guidance.

Market Benchmarks (2026):
- Admin Fee: $3.25-$3.75 PEPM (average $3.50)
- Rebate Pass-Through: 95-98% (average 96%)
- Spread Pricing: 85% of contracts prohibit it
- Audit Frequency: Semi-annual or quarterly (industry standard)
- Term Length: 1-3 years (2 years most common)

Provide actionable negotiation strategy with specific tactics, counter-offers, and predicted outcomes.

Return JSON format:
{
  "leverage": "high",
  "vendorConcessionLikelihood": 85,
  "marketPosition": {...},
  "strengths": [...],
  "weaknesses": [...],
  "counterOffer": {...},
  "negotiationTactics": {...},
  "predictedOutcome": {...}
}`,
      messages: [{
        role: "user",
        content: `Analyze this vendor proposal:

VENDOR: ${proposal.vendorName}
DATE: ${proposal.proposalDate}

PROPOSED TERMS:
- Contract Term: ${proposal.term} years
- Admin Fee: $${proposal.adminFee} PEPM
- Rebate Pass-Through: ${proposal.rebatePassThrough}%
- Spread Pricing: ${proposal.hasSpreadPricing ? "ALLOWED" : "Prohibited"}
- Audit Frequency: ${proposal.auditFrequency}
- Termination Notice: ${proposal.terminationNotice} days
- Performance Guarantees: ${proposal.performanceGuarantees ? "Yes" : "No"}

${currentContract ? `
CURRENT CONTRACT (Baseline):
- Admin Fee: $${currentContract.adminFee} PEPM
- Rebate Pass-Through: ${currentContract.rebatePassThrough}%
- Annual Cost: $${(currentContract.annualCost / 1000000).toFixed(2)}M
` : ""}

${competitiveBids && competitiveBids.length > 0 ? `
COMPETITIVE BIDS:
${competitiveBids.map(bid => `
- ${bid.vendor}: $${bid.adminFee} PEPM, ${bid.rebatePassThrough}% rebate
`).join("")}
` : ""}

Provide comprehensive negotiation strategy.`
      }]
    });

    const content = response.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response type");
    }

    const analysis = JSON.parse(content.text);
    return analysis as NegotiationAnalysis;
  } catch (error) {
    console.error("Failed to analyze proposal:", error);
    throw error;
  }
}

/**
 * Generate counter-offer letter
 */
export async function generateCounterOffer(
  proposal: VendorProposal,
  analysis: NegotiationAnalysis
): Promise<string> {
  try {
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 2048,
      system: `You are a professional procurement negotiator. Draft clear, data-driven counter-offer letters that:
1. Thank vendor for proposal
2. Acknowledge positive aspects
3. Present counter-offer with market data justification
4. Remain collaborative and professional
5. Include specific next steps`,
      messages: [{
        role: "user",
        content: `Draft a counter-offer letter for:

VENDOR: ${proposal.vendorName}
THEIR OFFER: $${proposal.adminFee} PEPM, ${proposal.rebatePassThrough}% rebate
OUR COUNTER: $${analysis.counterOffer.adminFee} PEPM, ${analysis.counterOffer.rebatePassThrough}% rebate

KEY POINTS:
${analysis.strengths.map(s => `✅ ${s}`).join("\n")}
${analysis.weaknesses.map(w => `⚠️ ${w}`).join("\n")}

JUSTIFICATION: ${analysis.counterOffer.justification}`
      }]
    });

    const content = response.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response type");
    }

    return content.text;
  } catch (error) {
    console.error("Failed to generate counter-offer:", error);
    throw error;
  }
}

/**
 * War game negotiation scenarios
 */
export async function warGameScenarios(
  proposal: VendorProposal,
  analysis: NegotiationAnalysis
): Promise<Array<{
  scenario: string;
  vendorResponse: string;
  yourResponse: string;
  outcome: string;
}>> {
  try {
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 3072,
      system: `You are a negotiation expert. Create realistic negotiation scenarios with vendor responses and recommended counter-responses.

Return JSON array:
[{
  "scenario": "Vendor refuses admin fee reduction",
  "vendorResponse": "What they might say...",
  "yourResponse": "How you should respond...",
  "outcome": "Likely result..."
}]`,
      messages: [{
        role: "user",
        content: `Create 5 negotiation scenarios for:
VENDOR: ${proposal.vendorName}
YOUR LEVERAGE: ${analysis.leverage}
CONCESSION LIKELIHOOD: ${analysis.vendorConcessionLikelihood}%

Include scenarios for:
1. Vendor refuses key term
2. Vendor offers partial concession
3. Vendor requests longer term
4. You threaten to walk away
5. Reaching compromise`
      }]
    });

    const content = response.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response type");
    }

    return JSON.parse(content.text);
  } catch (error) {
    console.error("Failed to war game scenarios:", error);
    return [];
  }
}