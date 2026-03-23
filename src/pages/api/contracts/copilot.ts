import type { NextApiRequest, NextApiResponse } from "next";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { question, contractText, analysisData, conversationHistory } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    // Build context from contract data
    const context = buildContext(contractText, analysisData);

    // Format conversation history for Claude
    const messages = [
      ...(conversationHistory || []).slice(-10).map((msg: any) => ({
        role: msg.role,
        content: msg.content,
      })),
      {
        role: "user" as const,
        content: question,
      },
    ];

    // Call Claude API
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      system: `You are an expert PBM contract analyst with 20+ years of experience. You're analyzing a pharmaceutical benefit management contract.

CONTRACT CONTEXT:
${context}

Your role is to:
1. Answer questions about specific contract provisions
2. Identify risks and opportunities
3. Provide actionable recommendations
4. Reference specific sections and page numbers when possible
5. Compare against industry standards

Be direct, concise, and specific. Use bullet points when listing multiple items.`,
      messages,
    });

    const answer = response.content[0].type === "text" ? response.content[0].text : "";

    // Generate suggested follow-up questions
    const suggested = generateSuggestedQuestions(question, answer);

    return res.status(200).json({
      answer,
      suggested,
      usage: response.usage,
    });
  } catch (error: any) {
    console.error("Copilot error:", error);
    return res.status(500).json({
      error: error.message || "Failed to process question",
    });
  }
}

/**
 * Build context string from contract data
 */
function buildContext(contractText?: string, analysisData?: any): string {
  const parts: string[] = [];

  if (analysisData) {
    parts.push(`OVERALL SCORE: ${analysisData.overallScore}/100`);

    if (analysisData.redFlags?.length > 0) {
      parts.push("\nCRITICAL RED FLAGS:");
      analysisData.redFlags.forEach((flag: any, idx: number) => {
        parts.push(
          `${idx + 1}. ${flag.title} (${flag.severity}): ${flag.description}`
        );
      });
    }

    if (analysisData.provisions?.length > 0) {
      parts.push("\nKEY PROVISIONS:");
      analysisData.provisions.slice(0, 10).forEach((prov: any) => {
        parts.push(`- ${prov.name} (Score: ${prov.score}/100): ${prov.description}`);
      });
    }
  }

  if (contractText) {
    parts.push("\nCONTRACT EXCERPT:");
    parts.push(contractText.substring(0, 2000) + "...");
  }

  return parts.join("\n");
}

/**
 * Generate suggested follow-up questions
 */
function generateSuggestedQuestions(question: string, answer: string): string[] {
  const lowerQuestion = question.toLowerCase();

  if (lowerQuestion.includes("risk")) {
    return [
      "How can we mitigate these risks?",
      "What's the financial impact?",
      "Compare to industry standards",
    ];
  }

  if (lowerQuestion.includes("price") || lowerQuestion.includes("cost")) {
    return [
      "What negotiation leverage do we have?",
      "Show me the rebate structure",
      "Identify hidden fees",
    ];
  }

  if (lowerQuestion.includes("negotiate")) {
    return [
      "What's our BATNA?",
      "Show me comparable contracts",
      "Draft negotiation talking points",
    ];
  }

  // Default suggestions
  return [
    "What else should I know?",
    "Show me the key risks",
    "How does this compare to market?",
  ];
}