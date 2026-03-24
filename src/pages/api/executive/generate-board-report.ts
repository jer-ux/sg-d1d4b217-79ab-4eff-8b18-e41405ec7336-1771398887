import type { NextApiRequest, NextApiResponse } from "next";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

interface ReportRequest {
  sections: string[];
  timeframe?: string;
  format?: "pptx" | "pdf" | "google-slides";
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { sections, timeframe = "Q4 2025", format = "pptx" }: ReportRequest = req.body;

    if (!sections || sections.length === 0) {
      return res.status(400).json({ error: "Sections are required" });
    }

    // Generate board report content using Claude
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 8192,
      system: `You are an executive communication specialist who creates compelling board presentations.

REPORT REQUIREMENTS:
- Executive-level language (no jargon unless essential)
- Data-driven insights with clear visualizations
- Action-oriented recommendations
- Professional, confident tone
- Focus on strategic impact

SLIDE STRUCTURE:
- Title slide: Company name, report title, date
- Executive summary: Key takeaways (3-5 bullets)
- Content slides: One key message per slide
- Conclusion: Next steps and recommendations

OUTPUT FORMAT:
Return a JSON structure with slides array:
{
  "slides": [
    {
      "slideNumber": 1,
      "title": "Slide Title",
      "content": "Main message",
      "bullets": ["Point 1", "Point 2"],
      "visualization": "chart-type",
      "speakerNotes": "Talking points"
    }
  ]
}`,
      messages: [
        {
          role: "user",
          content: `Generate executive board report for ${timeframe}.

Include these sections: ${sections.join(", ")}

Use the following data:
- Total identified savings: $12.4M
- Active opportunities: 47
- Portfolio health: 87%
- Risk exposure: $2.1M
- Top issue: PBM spread pricing (34% of events)
- Key wins: Acme Corp ($840K savings identified)
- Upcoming risks: 12 contracts renewing in 30 days

Create professional, actionable slides with clear recommendations.`,
        },
      ],
    });

    const content = response.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response type");
    }

    const reportData = JSON.parse(content.text);

    // In production, generate actual PowerPoint/PDF file here
    // For now, return the structured data
    return res.status(200).json({
      success: true,
      report: reportData,
      format,
      generatedAt: new Date().toISOString(),
      downloadUrl: `/api/executive/download-report?id=${Date.now()}`, // Mock URL
    });
  } catch (error) {
    console.error("Board Report Generation Error:", error);
    return res.status(500).json({
      error: "Failed to generate board report",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}