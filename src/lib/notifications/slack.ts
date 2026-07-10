/**
 * Slack Integration
 * Send notifications to Slack channels
 */

interface SlackNotification {
  channel: string;
  message: string;
  contractId?: string;
  severity?: "info" | "warning" | "critical";
  userId?: string;
}

/**
 * Send Slack notification
 */
export async function sendSlackNotification(notification: SlackNotification) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  
  if (!webhookUrl) {
    console.warn("Slack webhook URL not configured");
    return { success: false, error: "Webhook not configured" };
  }

  const color = 
    notification.severity === "critical" ? "#dc2626" :
    notification.severity === "warning" ? "#f59e0b" :
    "#3b82f6";

  const payload = {
    channel: notification.channel,
    attachments: [{
      color,
      title: getNotificationTitle(notification.severity),
      text: notification.message,
      fields: [
        ...(notification.contractId ? [{
          title: "Contract ID",
          value: notification.contractId,
          short: true
        }] : []),
        {
          title: "Timestamp",
          value: new Date().toLocaleString(),
          short: true
        }
      ],
      footer: "Contract X-Ray Intelligence",
      footer_icon: "https://kincaidhealth.ai/favicon.ico"
    }]
  };

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Slack API error: ${response.statusText}`);
    }

    return { success: true };
  } catch (error: any) {
    console.error("Failed to send Slack notification:", error);
    return { success: false, error: error.message };
  }
}

function getNotificationTitle(severity?: string): string {
  switch (severity) {
    case "critical":
      return "🚨 Critical Contract Alert";
    case "warning":
      return "⚠️ Contract Warning";
    default:
      return "📄 Contract Update";
  }
}

/**
 * Notify about new contract upload
 */
export async function notifyContractUploaded(data: {
  contractId: string;
  fileName: string;
  uploadedBy: string;
}) {
  return sendSlackNotification({
    channel: "#contract-alerts",
    message: `*New Contract Uploaded*\n\nFile: ${data.fileName}\nUploaded by: ${data.uploadedBy}\n\nAnalysis in progress...`,
    contractId: data.contractId,
    severity: "info"
  });
}

/**
 * Notify about analysis completion
 */
export async function notifyAnalysisComplete(data: {
  contractId: string;
  fileName: string;
  overallScore: number;
  redFlags: number;
  potentialSavings: number;
}) {
  const severity = data.overallScore < 50 ? "critical" : data.overallScore < 70 ? "warning" : "info";
  
  return sendSlackNotification({
    channel: "#contract-alerts",
    message: `*Analysis Complete: ${data.fileName}*\n\n` +
      `📊 Overall Score: ${data.overallScore}/100\n` +
      `⚠️ Red Flags: ${data.redFlags}\n` +
      `💰 Potential Savings: $${(data.potentialSavings / 1000).toFixed(0)}K\n\n` +
      `<https://kincaidhealth.ai/contract-analysis/${data.contractId}|View Full Report>`,
    contractId: data.contractId,
    severity
  });
}

/**
 * Notify about critical red flags
 */
export async function notifyCriticalRedFlags(data: {
  contractId: string;
  fileName: string;
  redFlags: Array<{ title: string; estimatedCost: number }>;
}) {
  const flagsList = data.redFlags
    .map(f => `• ${f.title} ($${(f.estimatedCost / 1000).toFixed(0)}K impact)`)
    .join("\n");

  return sendSlackNotification({
    channel: "#contract-alerts",
    message: `*🚨 Critical Issues Found: ${data.fileName}*\n\n${flagsList}\n\n` +
      `<https://kincaidhealth.ai/contract-analysis/${data.contractId}|Review Immediately>`,
    contractId: data.contractId,
    severity: "critical"
  });
}

/**
 * Notify team member mentions
 */
export async function notifyMention(data: {
  contractId: string;
  mentionedUser: string;
  comment: string;
  commentedBy: string;
}) {
  return sendSlackNotification({
    channel: `@${data.mentionedUser}`,
    message: `*You were mentioned in a contract comment*\n\n` +
      `By: ${data.commentedBy}\n` +
      `Comment: "${data.comment}"\n\n` +
      `<https://kincaidhealth.ai/contract-analysis/${data.contractId}|View Comment>`,
    contractId: data.contractId,
    severity: "info"
  });
}

/**
 * Notify about renewal due date
 */
export async function notifySlackRenewalDue(data: {
  contractId: string;
  contractName: string;
  daysUntilRenewal: number;
}) {
  const severity = data.daysUntilRenewal <= 30 ? "critical" : data.daysUntilRenewal <= 60 ? "warning" : "info";
  
  return sendSlackNotification({
    channel: "#contract-alerts",
    message: `*⏰ Contract Renewal Alert: ${data.contractName}*\n\nThis contract is due for renewal in *${data.daysUntilRenewal} days*.\n\n<https://kincaidhealth.ai/contract-analysis/${data.contractId}|Review Contract>`,
    contractId: data.contractId,
    severity
  });
}

/**
 * Notify about clause change
 */
export async function notifySlackClauseChange(data: {
  contractId: string;
  clause: string;
  change: string;
}) {
  return sendSlackNotification({
    channel: "#contract-alerts",
    message: `*⚠️ Clause Change Detected*\n\n*Clause:* ${data.clause}\n\n*Details:*\n${data.change}\n\n<https://kincaidhealth.ai/contract-analysis/${data.contractId}|Review Changes>`,
    contractId: data.contractId,
    severity: "warning"
  });
}