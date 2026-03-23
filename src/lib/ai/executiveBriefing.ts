/**
 * Executive Briefing Generator with Claude AI
 * Creates automated weekly executive summaries
 */

import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

export interface ExecutiveMetrics {
  period: string;
  newEvents: number;
  criticalEvents: number;
  totalSavings: number;
  clientSatisfaction: number;
  avgResolutionTime: number;
  trendVsPrevious: {
    events: number;
    savings: number;
    satisfaction: number;
    resolutionTime: number;
  };
}

export interface TopIssue {
  category: string;
  eventCount: number;
  financialImpact: number;
  trend: "up" | "down" | "stable";
  examples: string[];
}

export interface ClientHighlight {
  name: string;
  achievement: string;
  savingsIdentified: number;
  status: string;
}

export interface UpcomingRisk {
  description: string;
  impact: "low" | "medium" | "high" | "critical";
  affectedClients: number;
  deadline?: string;
}

export interface BriefingData {
  metrics: ExecutiveMetrics;
  topIssues: TopIssue[];
  clientHighlights: ClientHighlight[];
  upcomingRisks: UpcomingRisk[];
  rawEvents?: Array<{
    title: string;
    category: string;
    severity: string;
    impact: number;
    client: string;
    status: string;
  }>;
}

/**
 * Generate executive briefing from data
 */
export async function generateExecutiveBriefing(data: BriefingData): Promise<{
  summary: string;
  keyInsights: string[];
  recommendations: string[];
  fullReport: string;
}> {
  try {
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 4096,
      system: `You are an executive communications specialist. Create concise, actionable briefings for C-level executives.

Guidelines:
1. Lead with most important insights (inverted pyramid)
2. Use data and metrics (be specific)
3. Identify trends and patterns
4. Provide clear recommendations
5. Flag risks and opportunities
6. Keep language clear and professional
7. Use bullet points for scannability

Format your response as JSON:
{
  "summary": "One paragraph executive summary",
  "keyInsights": ["Insight 1", "Insight 2", "Insight 3"],
  "recommendations": ["Action 1", "Action 2", "Action 3"],
  "fullReport": "Complete markdown report"
}`,
      messages: [{
        role: "user",
        content: `Generate executive briefing from this data:

PERIOD: ${data.metrics.period}

KEY METRICS:
- New Events: ${data.metrics.newEvents} (${data.metrics.trendVsPrevious.events > 0 ? '+' : ''}${data.metrics.trendVsPrevious.events}%)
- Critical Events: ${data.metrics.criticalEvents}
- Total Savings: $${(data.metrics.totalSavings / 1000000).toFixed(1)}M
- Client Satisfaction: ${data.metrics.clientSatisfaction}/5.0
- Avg Resolution Time: ${data.metrics.avgResolutionTime} days

TOP ISSUES:
${data.topIssues.map(issue => `
- ${issue.category}: ${issue.eventCount} events, $${(issue.financialImpact / 1000).toFixed(0)}K impact, trend: ${issue.trend}
`).join("")}

CLIENT HIGHLIGHTS:
${data.clientHighlights.map(client => `
- ${client.name}: ${client.achievement} ($${(client.savingsIdentified / 1000).toFixed(0)}K savings)
`).join("")}

UPCOMING RISKS:
${data.upcomingRisks.map(risk => `
- ${risk.description} (${risk.impact} impact, ${risk.affectedClients} clients)
`).join("")}

Generate a comprehensive executive briefing.`
      }]
    });

    const content = response.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response type");
    }

    return JSON.parse(content.text);
  } catch (error) {
    console.error("Failed to generate executive briefing:", error);
    return {
      summary: "Error generating briefing. Please review data manually.",
      keyInsights: [],
      recommendations: [],
      fullReport: ""
    };
  }
}

/**
 * Generate PowerPoint slide content
 */
export async function generateBriefingSlides(data: BriefingData): Promise<Array<{
  title: string;
  content: string[];
  chartData?: any;
}>> {
  try {
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 3072,
      system: `You are a presentation designer. Create slide content for executive briefings.

Guidelines:
1. One key message per slide
2. Use bullet points (max 5 per slide)
3. Include data visualizations where helpful
4. Follow pyramid structure (most important first)
5. Make slides actionable

Return JSON array of slides:
[{
  "title": "Slide Title",
  "content": ["Bullet 1", "Bullet 2"],
  "chartData": {type: "bar", data: [...]}
}]`,
      messages: [{
        role: "user",
        content: `Create 5-7 PowerPoint slides for this executive briefing:

${JSON.stringify(data, null, 2)}`
      }]
    });

    const content = response.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response type");
    }

    return JSON.parse(content.text);
  } catch (error) {
    console.error("Failed to generate briefing slides:", error);
    return [];
  }
}

/**
 * Schedule automated briefing generation
 */
export function scheduleWeeklyBriefing(
  dataFetcher: () => Promise<BriefingData>,
  deliveryMethod: (briefing: any) => Promise<void>
) {
  const runBriefing = async () => {
    console.log("Generating weekly executive briefing...");
    
    try {
      const data = await dataFetcher();
      const briefing = await generateExecutiveBriefing(data);
      await deliveryMethod(briefing);
      
      console.log("Weekly briefing generated and delivered successfully");
    } catch (error) {
      console.error("Failed to generate weekly briefing:", error);
    }
  };

  // Calculate time until next Monday 9 AM
  const now = new Date();
  const nextMonday = new Date(now);
  nextMonday.setDate(now.getDate() + ((8 - now.getDay()) % 7));
  nextMonday.setHours(9, 0, 0, 0);
  
  const msUntilMonday = nextMonday.getTime() - now.getTime();
  
  // Schedule first run
  setTimeout(() => {
    runBriefing();
    // Then run weekly
    setInterval(runBriefing, 7 * 24 * 60 * 60 * 1000);
  }, msUntilMonday);
  
  console.log(`Weekly briefing scheduled. Next run: ${nextMonday.toLocaleString()}`);
}