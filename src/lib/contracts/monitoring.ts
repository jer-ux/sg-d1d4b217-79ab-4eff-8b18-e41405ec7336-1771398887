/**
 * Automated Contract Monitoring with Claude AI
 * Tracks renewal dates, clause changes, and compliance
 */

import Anthropic from "@anthropic-ai/sdk";
import { supabase } from "@/integrations/supabase/client";
import { notifySlackRenewalDue, notifySlackClauseChange } from "@/lib/notifications/slack";
import { differenceInDays, addDays } from "date-fns";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

export interface MonitoringAlert {
  id: string;
  contractId: string;
  type: "renewal" | "clause_change" | "compliance" | "performance";
  severity: "info" | "warning" | "critical";
  title: string;
  description: string;
  createdAt: Date;
  resolvedAt?: Date;
}

/**
 * Check all contracts for upcoming renewals
 */
export async function checkRenewalDates() {
  const { data } = await supabase
    .from("contract_uploads")
    .select("id, file_name, metadata")
    .not("metadata->renewal_date", "is", null);

  const alerts: MonitoringAlert[] = [];
  const today = new Date();

  const contracts = data as any[];

  contracts?.forEach((contract) => {
    const metadata = contract.metadata as any;
    if (!metadata?.renewal_date) return;
    
    const renewalDate = new Date(metadata.renewal_date);
    const daysUntilRenewal = differenceInDays(renewalDate, today);

    // Alert at 90, 60, 30, and 7 days
    if ([90, 60, 30, 7].includes(daysUntilRenewal)) {
      const severity = daysUntilRenewal <= 30 ? "critical" : "warning";
      
      alerts.push({
        id: `renewal-${contract.id}-${daysUntilRenewal}`,
        contractId: contract.id,
        type: "renewal",
        severity,
        title: `Contract Renewal Due in ${daysUntilRenewal} Days`,
        description: `${contract.file_name} is up for renewal on ${renewalDate.toLocaleDateString()}`,
        createdAt: today
      });

      // Send Slack notification
      notifySlackRenewalDue({
        contractId: contract.id,
        contractName: contract.file_name,
        daysUntilRenewal
      });
    }
  });

  return alerts;
}

/**
 * Monitor contract for clause changes using Claude AI
 */
export async function detectClauseChanges(
  originalText: string,
  newText: string,
  contractId: string
): Promise<MonitoringAlert[]> {
  try {
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 2048,
      system: `You are an expert contract analyst. Compare two versions of a contract and identify material changes to clauses.

Focus on:
1. Pricing changes (fees, rebates, penalties)
2. Liability changes (indemnification, caps, exclusions)
3. Termination changes (notice periods, penalties)
4. Scope changes (services added/removed)
5. Compliance changes (audit rights, reporting requirements)

Return a JSON array of changes in this format:
[{
  "clause": "Rebate Pass-Through",
  "changeType": "modified",
  "severity": "critical",
  "originalText": "90% pass-through",
  "newText": "85% pass-through",
  "impact": "Reduces annual rebates by $60K",
  "recommendation": "Reject this change"
}]`,
      messages: [{
        role: "user",
        content: `ORIGINAL CONTRACT:\n${originalText.substring(0, 4000)}\n\nNEW VERSION:\n${newText.substring(0, 4000)}\n\nIdentify all material changes.`
      }]
    });

    const content = response.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response type");
    }

    const changes = JSON.parse(content.text);
    
    const alerts: MonitoringAlert[] = changes.map((change: any) => ({
      id: `clause-change-${contractId}-${Date.now()}`,
      contractId,
      type: "clause_change" as const,
      severity: change.severity,
      title: `Clause Changed: ${change.clause}`,
      description: `${change.changeType}: ${change.impact}\n\nOriginal: "${change.originalText}"\nNew: "${change.newText}"\n\nRecommendation: ${change.recommendation}`,
      createdAt: new Date()
    }));

    // Notify critical changes via Slack
    alerts
      .filter(a => a.severity === "critical")
      .forEach(alert => {
        notifySlackClauseChange({
          contractId,
          clause: alert.title,
          change: alert.description
        });
      });

    return alerts;
  } catch (error) {
    console.error("Failed to detect clause changes:", error);
    return [];
  }
}

/**
 * Monitor contract compliance using Claude AI
 */
export async function checkCompliance(
  contractText: string,
  contractId: string,
  requirements: string[]
): Promise<MonitoringAlert[]> {
  try {
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 2048,
      system: `You are a compliance expert. Review this contract against the provided requirements and identify any violations or gaps.

Return a JSON array of compliance issues:
[{
  "requirement": "HIPAA BAA Required",
  "status": "missing",
  "severity": "critical",
  "finding": "No Business Associate Agreement found",
  "remediation": "Add HIPAA BAA before contract execution"
}]`,
      messages: [{
        role: "user",
        content: `CONTRACT:\n${contractText.substring(0, 4000)}\n\nREQUIREMENTS:\n${requirements.join("\n")}\n\nCheck compliance.`
      }]
    });

    const content = response.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response type");
    }

    const issues = JSON.parse(content.text);
    
    return issues.map((issue: any) => ({
      id: `compliance-${contractId}-${Date.now()}`,
      contractId,
      type: "compliance" as const,
      severity: issue.severity,
      title: `Compliance Issue: ${issue.requirement}`,
      description: `Status: ${issue.status}\n\nFinding: ${issue.finding}\n\nRemediation: ${issue.remediation}`,
      createdAt: new Date()
    }));
  } catch (error) {
    console.error("Failed to check compliance:", error);
    return [];
  }
}

/**
 * Schedule automated monitoring
 */
export async function scheduleMonitoring() {
  // Run daily at 9 AM
  const runDailyCheck = async () => {
    console.log("Running daily contract monitoring...");
    
    // Check renewals
    const renewalAlerts = await checkRenewalDates();
    console.log(`Found ${renewalAlerts.length} renewal alerts`);
    
    // Save alerts to database
    if (renewalAlerts.length > 0) {
      await supabase.from("contract_alerts").insert(
        renewalAlerts.map(alert => ({
          id: alert.id,
          contract_id: alert.contractId,
          type: alert.type,
          severity: alert.severity,
          title: alert.title,
          description: alert.description,
          created_at: alert.createdAt.toISOString()
        }))
      );
    }
  };

  // Calculate time until next 9 AM
  const now = new Date();
  const next9AM = new Date(now);
  next9AM.setHours(9, 0, 0, 0);
  if (next9AM <= now) {
    next9AM.setDate(next9AM.getDate() + 1);
  }
  
  const msUntil9AM = next9AM.getTime() - now.getTime();
  
  // Schedule first run
  setTimeout(() => {
    runDailyCheck();
    // Then run daily
    setInterval(runDailyCheck, 24 * 60 * 60 * 1000);
  }, msUntil9AM);
  
  console.log(`Contract monitoring scheduled. Next run at ${next9AM.toLocaleString()}`);
}