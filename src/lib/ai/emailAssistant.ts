/**
 * Smart Email Assistant with Claude AI
 * Reads emails, drafts responses, extracts action items
 */

import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

export interface EmailAnalysis {
  from: string;
  subject: string;
  body: string;
  tone: "professional" | "concerned" | "urgent" | "casual" | "formal";
  sentiment: "positive" | "neutral" | "negative";
  urgency: "low" | "medium" | "high" | "critical";
  actionItems: Array<{
    task: string;
    deadline?: string;
    priority: "low" | "medium" | "high";
  }>;
  keyIssues: string[];
  suggestedResponse: string;
  responseMetadata: {
    tone: string;
    strategy: string;
    expectedOutcome: string;
  };
}

/**
 * Analyze email and generate response
 */
export async function analyzeEmail(
  email: {
    from: string;
    subject: string;
    body: string;
  },
  context?: {
    senderRelationship?: string;
    previousConversations?: string;
    organizationPolicy?: string;
  }
): Promise<EmailAnalysis> {
  try {
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 3072,
      system: `You are an expert email analyst and communication specialist. Analyze emails for:
1. Tone and sentiment
2. Urgency and priority
3. Action items and deadlines
4. Key issues requiring response
5. Optimal response strategy

Generate professional, context-aware responses that:
- Address all concerns directly
- Provide data/evidence when relevant
- Maintain appropriate tone
- Include clear next steps
- Build/maintain relationships

Return JSON format with analysis and suggested response.`,
      messages: [{
        role: "user",
        content: `Analyze this email:

FROM: ${email.from}
SUBJECT: ${email.subject}

BODY:
${email.body}

${context ? `
CONTEXT:
- Relationship: ${context.senderRelationship || "Unknown"}
- Previous Conversations: ${context.previousConversations || "None"}
- Organization Policy: ${context.organizationPolicy || "Standard"}
` : ""}

Provide comprehensive analysis and draft response.`
      }]
    });

    const content = response.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response type");
    }

    const analysis = JSON.parse(content.text);
    return {
      from: email.from,
      subject: email.subject,
      body: email.body,
      ...analysis
    };
  } catch (error) {
    console.error("Failed to analyze email:", error);
    throw error;
  }
}

/**
 * Batch process emails
 */
export async function batchProcessEmails(
  emails: Array<{
    id: string;
    from: string;
    subject: string;
    body: string;
    receivedAt: string;
  }>
): Promise<Array<{
  id: string;
  priority: number; // 1-10
  requiresResponse: boolean;
  suggestedAction: string;
  summary: string;
}>> {
  try {
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 4096,
      system: `You are an email triage specialist. Analyze multiple emails and:
1. Prioritize by urgency and importance
2. Identify which need responses
3. Suggest actions
4. Provide brief summaries

Return JSON array sorted by priority (highest first).`,
      messages: [{
        role: "user",
        content: `Triage these ${emails.length} emails:

${emails.map((email, i) => `
EMAIL ${i + 1}:
From: ${email.from}
Subject: ${email.subject}
Received: ${email.receivedAt}
Body: ${email.body.substring(0, 500)}...
`).join("\n---\n")}`
      }]
    });

    const content = response.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response type");
    }

    return JSON.parse(content.text);
  } catch (error) {
    console.error("Failed to batch process emails:", error);
    return [];
  }
}

/**
 * Generate meeting follow-up email
 */
export async function generateMeetingFollowUp(
  meetingDetails: {
    attendees: string[];
    date: string;
    topic: string;
    notes: string;
    decisions: string[];
    actionItems: Array<{
      task: string;
      owner: string;
      deadline: string;
    }>;
  }
): Promise<string> {
  try {
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 2048,
      system: `You are a professional meeting coordinator. Create clear, well-organized follow-up emails that:
1. Summarize key discussion points
2. Document decisions made
3. List action items with owners and deadlines
4. Include next steps
5. Thank participants`,
      messages: [{
        role: "user",
        content: `Generate meeting follow-up email:

MEETING: ${meetingDetails.topic}
DATE: ${meetingDetails.date}
ATTENDEES: ${meetingDetails.attendees.join(", ")}

NOTES:
${meetingDetails.notes}

DECISIONS:
${meetingDetails.decisions.map(d => `- ${d}`).join("\n")}

ACTION ITEMS:
${meetingDetails.actionItems.map(item => 
  `- ${item.task} (Owner: ${item.owner}, Due: ${item.deadline})`
).join("\n")}`
      }]
    });

    const content = response.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response type");
    }

    return content.text;
  } catch (error) {
    console.error("Failed to generate follow-up:", error);
    throw error;
  }
}