/**
 * Microsoft Teams Integration
 * Send notifications to Teams channels
 */

interface TeamsNotification {
  webhookUrl: string;
  title: string;
  message: string;
  contractId?: string;
  severity?: "info" | "warning" | "critical";
  actions?: Array<{
    type: string;
    title: string;
    url: string;
  }>;
}

/**
 * Send Teams notification using Adaptive Cards
 */
export async function sendTeamsNotification(notification: TeamsNotification) {
  const color = 
    notification.severity === "critical" ? "attention" :
    notification.severity === "warning" ? "warning" :
    "good";

  const card = {
    type: "message",
    attachments: [{
      contentType: "application/vnd.microsoft.card.adaptive",
      content: {
        $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
        type: "AdaptiveCard",
        version: "1.4",
        body: [
          {
            type: "Container",
            style: color,
            items: [
              {
                type: "TextBlock",
                text: notification.title,
                weight: "bolder",
                size: "large",
                wrap: true
              }
            ]
          },
          {
            type: "TextBlock",
            text: notification.message,
            wrap: true,
            spacing: "medium"
          },
          ...(notification.contractId ? [{
            type: "FactSet",
            facts: [
              {
                title: "Contract ID:",
                value: notification.contractId
              },
              {
                title: "Timestamp:",
                value: new Date().toLocaleString()
              }
            ]
          }] : [])
        ],
        actions: notification.actions?.map(action => ({
          type: "Action.OpenUrl",
          title: action.title,
          url: action.url
        })) || []
      }
    }]
  };

  try {
    const response = await fetch(notification.webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(card)
    });

    if (!response.ok) {
      throw new Error(`Teams API error: ${response.statusText}`);
    }

    return { success: true };
  } catch (error: any) {
    console.error("Failed to send Teams notification:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Notify about contract analysis completion
 */
export async function notifyTeamsAnalysisComplete(data: {
  webhookUrl: string;
  contractId: string;
  fileName: string;
  overallScore: number;
  redFlags: number;
  potentialSavings: number;
}) {
  const severity = data.overallScore < 50 ? "critical" : data.overallScore < 70 ? "warning" : "info";
  
  return sendTeamsNotification({
    webhookUrl: data.webhookUrl,
    title: `📄 Contract Analysis Complete: ${data.fileName}`,
    message: `**Overall Score:** ${data.overallScore}/100\n\n` +
      `**Red Flags:** ${data.redFlags}\n\n` +
      `**Potential Savings:** $${(data.potentialSavings / 1000).toFixed(0)}K annually`,
    contractId: data.contractId,
    severity,
    actions: [{
      type: "Action.OpenUrl",
      title: "View Full Report",
      url: `https://siriusb.ai/contract-analysis/${data.contractId}`
    }]
  });
}

/**
 * Notify about renewal due date
 */
export async function notifyTeamsRenewalDue(data: {
  webhookUrl: string;
  contractId: string;
  contractName: string;
  daysUntilRenewal: number;
}) {
  const severity = data.daysUntilRenewal <= 30 ? "critical" : data.daysUntilRenewal <= 60 ? "warning" : "info";
  
  return sendTeamsNotification({
    webhookUrl: data.webhookUrl,
    title: `⏰ Contract Renewal Alert: ${data.contractName}`,
    message: `This contract is due for renewal in **${data.daysUntilRenewal} days**.\n\n` +
      `Review the contract and prepare negotiation strategy.`,
    contractId: data.contractId,
    severity,
    actions: [
      {
        type: "Action.OpenUrl",
        title: "Review Contract",
        url: `https://siriusb.ai/contract-analysis/${data.contractId}`
      },
      {
        type: "Action.OpenUrl",
        title: "Start Negotiation",
        url: `https://siriusb.ai/contract-analysis/${data.contractId}?tab=savings`
      }
    ]
  });
}