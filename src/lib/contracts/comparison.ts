/**
 * Contract Comparison Engine with Claude AI
 * Compare multiple contracts side-by-side
 */

import Anthropic from "@anthropic-ai/sdk";
import type { ContractAnalysisResult } from "./types";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

export interface ContractComparison {
  contracts: Array<{
    id: string;
    name: string;
    overallScore: number;
  }>;
  provisionComparisons: ProvisionComparison[];
  winner: {
    contractId: string;
    reason: string;
  };
  recommendations: string[];
  differenceHighlights: Array<{
    provision: string;
    differences: string;
    impact: "positive" | "negative" | "neutral";
  }>;
}

export interface ProvisionComparison {
  provisionName: string;
  category: string;
  values: Record<string, {
    value: string;
    score: number;
    isBest: boolean;
  }>;
  analysis: string;
  recommendation: string;
}

/**
 * Compare multiple contracts using Claude AI
 */
export async function compareContracts(
  contracts: Array<{
    id: string;
    name: string;
    text: string;
    analysis: ContractAnalysisResult;
  }>
): Promise<ContractComparison> {
  try {
    const contractSummaries = contracts.map(c => 
      `CONTRACT: ${c.name}\n` +
      `Overall Score: ${c.analysis.overallScore}/100\n` +
      `Key Provisions:\n${c.analysis.provisions.map(p => 
        `- ${p.name}: ${p.description} (Score: ${p.score}/100)`
      ).join("\n")}\n`
    ).join("\n\n---\n\n");

    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 4096,
      system: `You are an expert contract analyst comparing multiple PBM contracts. Provide a comprehensive side-by-side analysis.

Return a JSON object with this structure:
{
  "provisionComparisons": [
    {
      "provisionName": "Rebate Pass-Through",
      "category": "Pricing",
      "values": {
        "Contract A": { "value": "90%", "score": 75, "isBest": false },
        "Contract B": { "value": "95%", "score": 90, "isBest": true }
      },
      "analysis": "Contract B offers superior rebate terms...",
      "recommendation": "Negotiate Contract A to match Contract B's 95% pass-through"
    }
  ],
  "winner": {
    "contractId": "contract-b-id",
    "reason": "Best overall terms with 95% rebate pass-through and stronger audit rights"
  },
  "recommendations": [
    "Use Contract B as template for future negotiations",
    "Renegotiate Contract A's rebate terms"
  ],
  "differenceHighlights": [
    {
      "provision": "Spread Pricing",
      "differences": "Contract A allows spread pricing; Contract B prohibits it",
      "impact": "negative"
    }
  ]
}`,
      messages: [{
        role: "user",
        content: `Compare these contracts:\n\n${contractSummaries}\n\nProvide detailed side-by-side analysis.`
      }]
    });

    const content = response.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response type");
    }

    const comparisonData = JSON.parse(content.text);

    return {
      contracts: contracts.map(c => ({
        id: c.id,
        name: c.name,
        overallScore: c.analysis.overallScore
      })),
      ...comparisonData
    };
  } catch (error) {
    console.error("Failed to compare contracts:", error);
    throw error;
  }
}

/**
 * Generate negotiation strategy based on comparison
 */
export async function generateNegotiationStrategy(
  comparison: ContractComparison,
  targetContractId: string
): Promise<{
  talking_points: string[];
  leverage_points: string[];
  target_improvements: Array<{
    provision: string;
    current: string;
    target: string;
    justification: string;
  }>;
}> {
  try {
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 2048,
      system: `You are a contract negotiation strategist. Based on the contract comparison, create a negotiation playbook.

Return JSON:
{
  "talking_points": [
    "Industry standard rebate pass-through is 95%, you're offering 90%",
    "Competitor contracts prohibit spread pricing"
  ],
  "leverage_points": [
    "We're a $10M annual account",
    "Contract renewal gives us negotiating power"
  ],
  "target_improvements": [
    {
      "provision": "Rebate Pass-Through",
      "current": "90%",
      "target": "95%",
      "justification": "Matches industry standard and competitor offerings"
    }
  ]
}`,
      messages: [{
        role: "user",
        content: `Create negotiation strategy for contract ${targetContractId} based on:\n\n${JSON.stringify(comparison, null, 2)}`
      }]
    });

    const content = response.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response type");
    }

    return JSON.parse(content.text);
  } catch (error) {
    console.error("Failed to generate negotiation strategy:", error);
    throw error;
  }
}

/**
 * Identify best-in-class provisions across all contracts
 */
export function extractBestProvisions(comparison: ContractComparison) {
  const bestProvisions: Record<string, {
    contractId: string;
    contractName: string;
    value: string;
    score: number;
  }> = {};

  comparison.provisionComparisons.forEach(pc => {
    Object.entries(pc.values).forEach(([contractName, data]) => {
      if (data.isBest) {
        const contract = comparison.contracts.find(c => c.name === contractName);
        bestProvisions[pc.provisionName] = {
          contractId: contract?.id || "",
          contractName,
          value: data.value,
          score: data.score
        };
      }
    });
  });

  return bestProvisions;
}