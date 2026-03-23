/**
 * Incident Response Playbook Generator with Claude AI
 * Automates crisis management and response coordination
 */

import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

export interface Incident {
  type: "data_breach" | "system_outage" | "compliance_violation" | "fraud_detection" | "vendor_failure";
  severity: "low" | "medium" | "high" | "critical";
  description: string;
  affectedSystems: string[];
  detectedAt: string;
  estimatedImpact: string;
}

export interface IncidentPlaybook {
  incidentId: string;
  severity: string;
  responsePhases: Array<{
    phase: string;
    duration: string;
    tasks: Array<{
      task: string;
      priority: "critical" | "high" | "medium" | "low";
      assignedTo: string;
      completed: boolean;
    }>;
  }>;
  communications: {
    internal: string;
    external: string;
    regulatory: string;
    member: string;
  };
  legalRequirements: Array<{
    requirement: string;
    deadline: string;
    responsible: string;
  }>;
  estimatedCost: {
    min: number;
    max: number;
    breakdown: Array<{
      category: string;
      cost: number;
    }>;
  };
  timeline: string;
}

/**
 * Generate incident response playbook
 */
export async function generateIncidentPlaybook(
  incident: Incident
): Promise<IncidentPlaybook> {
  try {
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 8192,
      system: `You are an incident response expert specializing in healthcare and data security. Generate comprehensive response playbooks for incidents.

For each incident, provide:
1. CONTAINMENT: Immediate actions (0-2 hours)
2. INVESTIGATION: Root cause analysis (2-24 hours)
3. NOTIFICATION: Legal/regulatory requirements (24-72 hours)
4. REMEDIATION: Fix and prevent recurrence (1-4 weeks)
5. POST-INCIDENT: Documentation and lessons learned (2-4 weeks)

Include specific tasks, timelines, communication templates, legal requirements, and cost estimates.

Follow frameworks:
- HIPAA Breach Notification (45 CFR § 164.404)
- HITECH Act requirements
- State breach notification laws
- Industry best practices (NIST, SANS)`,
      messages: [{
        role: "user",
        content: `Generate incident response playbook:

INCIDENT TYPE: ${incident.type}
SEVERITY: ${incident.severity}
DESCRIPTION: ${incident.description}
AFFECTED SYSTEMS: ${incident.affectedSystems.join(", ")}
DETECTED: ${incident.detectedAt}
ESTIMATED IMPACT: ${incident.estimatedImpact}

Provide comprehensive response plan with all phases, tasks, communications, legal requirements, and cost estimates.`
      }]
    });

    const content = response.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response type");
    }

    const playbook = JSON.parse(content.text);
    
    return {
      incidentId: `INC-${Date.now()}`,
      ...playbook
    } as IncidentPlaybook;
  } catch (error) {
    console.error("Failed to generate incident playbook:", error);
    throw error;
  }
}

/**
 * Draft incident notification letter
 */
export async function draftIncidentNotification(
  incident: Incident,
  audienceType: "member" | "regulatory" | "media" | "internal"
): Promise<string> {
  try {
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 2048,
      system: `You are a crisis communications expert. Draft incident notifications that are:
1. Clear and factual (no speculation)
2. Compliant with legal requirements
3. Empathetic to affected parties
4. Action-oriented (what recipients should do)
5. Professionally written

Tone varies by audience:
- Members: Empathetic, reassuring, actionable
- Regulatory: Formal, comprehensive, compliant
- Media: Factual, confident, transparent
- Internal: Direct, honest, solution-focused`,
      messages: [{
        role: "user",
        content: `Draft ${audienceType} notification for this incident:

TYPE: ${incident.type}
SEVERITY: ${incident.severity}
DESCRIPTION: ${incident.description}
IMPACT: ${incident.estimatedImpact}

Create professional, compliant notification appropriate for ${audienceType} audience.`
      }]
    });

    const content = response.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response type");
    }

    return content.text;
  } catch (error) {
    console.error("Failed to draft notification:", error);
    throw error;
  }
}

/**
 * Generate post-incident report
 */
export async function generatePostIncidentReport(
  incident: Incident,
  playbook: IncidentPlaybook,
  actualTimeline: Array<{
    timestamp: string;
    event: string;
    responsible: string;
  }>
): Promise<string> {
  try {
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 4096,
      system: `You are an incident analysis expert. Create comprehensive post-incident reports that include:

1. EXECUTIVE SUMMARY: What happened, impact, resolution
2. TIMELINE: Detailed event sequence
3. ROOT CAUSE: Why it happened (5 Whys analysis)
4. RESPONSE EFFECTIVENESS: What went well, what didn't
5. LESSONS LEARNED: Key takeaways
6. RECOMMENDATIONS: Preventive measures
7. ACTION ITEMS: Specific next steps with owners

Format for executive consumption - clear, actionable, forward-looking.`,
      messages: [{
        role: "user",
        content: `Generate post-incident report:

INCIDENT: ${JSON.stringify(incident, null, 2)}

PLANNED RESPONSE: ${JSON.stringify(playbook, null, 2)}

ACTUAL TIMELINE: ${JSON.stringify(actualTimeline, null, 2)}

Create comprehensive report with root cause analysis, lessons learned, and recommendations.`
      }]
    });

    const content = response.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response type");
    }

    return content.text;
  } catch (error) {
    console.error("Failed to generate post-incident report:", error);
    throw error;
  }
}