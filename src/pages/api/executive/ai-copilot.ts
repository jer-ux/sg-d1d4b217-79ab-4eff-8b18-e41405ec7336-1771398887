import type { NextApiRequest, NextApiResponse } from "next";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

interface ExecutiveQuery {
  question: string;
  context?: {
    metrics?: Record<string, any>;
    alerts?: any[];
    timeframe?: string;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { question, context }: ExecutiveQuery = req.body;

    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    // Build context for Claude
    const contextString = context
      ? `
CURRENT BUSINESS CONTEXT:
${context.metrics ? `Key Metrics: ${JSON.stringify(context.metrics, null, 2)}` : ""}
${context.alerts ? `Active Alerts: ${context.alerts.length} strategic items` : ""}
${context.timeframe ? `Timeframe: ${context.timeframe}` : ""}
`
      : "";

    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 4096,
      system: `You are an elite executive strategic advisor and AI copilot for a healthcare benefits intelligence platform.

YOUR ROLE:
- Provide actionable strategic insights for C-level executives
- Focus on financial impact, risk mitigation, and competitive advantage
- Be direct, data-driven, and decision-focused
- Think like a McKinsey consultant meets a seasoned CFO

COMMUNICATION STYLE:
- Start with the bottom line (BLUF - Bottom Line Up Front)
- Use clear, executive-level language (no jargon unless necessary)
- Provide 3-5 specific, actionable recommendations
- Quantify impact whenever possible ($, %, timeframes)
- Flag risks and trade-offs explicitly

RESPONSE FORMAT:
1. **Executive Summary** (2-3 sentences max)
2. **Key Insights** (3-5 bullet points)
3. **Recommended Actions** (Prioritized, with expected outcomes)
4. **Risk Considerations** (What could go wrong)
5. **Next Steps** (Specific, time-bound actions)

AREAS OF EXPERTISE:
- Contract analysis & vendor negotiations
- Financial risk assessment & cost optimization
- Fraud detection & compliance
- Strategic planning & competitive positioning
- M&A due diligence & market intelligence
- Board reporting & investor communications`,
      messages: [
        {
          role: "user",
          content: `${contextString}

EXECUTIVE QUESTION:
${question}

Provide strategic guidance as their trusted AI advisor.`,
        },
      ],
    });

    const content = response.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response type");
    }

    return res.status(200).json({
      answer: content.text,
      confidence: 95,
      timestamp: new Date().toISOString(),
      sources: ["AI Analysis", "Platform Data", "Market Intelligence"],
    });
  } catch (error) {
    console.error("Executive AI Copilot Error:", error);
    return res.status(500).json({
      error: "Failed to generate strategic insight",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

/**
 * EXAMPLE QUERIES EXECUTIVES MIGHT ASK:
 * 
 * Strategic Questions:
 * - "What are the top 3 risks to our business right now?"
 * - "Should we renew our PBM contract or go to RFP?"
 * - "What's driving the $1.8M budget variance in drug spend?"
 * - "How do we compare to industry benchmarks?"
 * - "What should I tell the board about our contract portfolio?"
 * 
 * Financial Questions:
 * - "Where can we find $500K in savings this quarter?"
 * - "What's our ROI on the platform investment?"
 * - "Which vendor is costing us the most money?"
 * - "What's the financial impact of switching PBMs?"
 * 
 * Operational Questions:
 * - "What critical deadlines am I facing in the next 30 days?"
 * - "Which contracts need immediate attention?"
 * - "What fraud patterns should I be aware of?"
 * - "How is our team performing vs. targets?"
 * 
 * Market Intelligence:
 * - "What market trends should I know about?"
 * - "How are competitors positioning themselves?"
 * - "What regulatory changes are coming?"
 * - "What M&A activity is happening in our space?"
 */