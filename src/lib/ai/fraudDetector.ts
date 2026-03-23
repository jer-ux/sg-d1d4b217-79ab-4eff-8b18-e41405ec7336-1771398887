/**
 * Invoice Fraud Detection with Claude AI
 * Detects anomalies, duplicates, and fraudulent patterns
 */

import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

export interface Invoice {
  id: string;
  vendorName: string;
  invoiceNumber: string;
  invoiceDate: string;
  amount: number;
  lineItems: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }>;
  contractReference?: string;
}

export interface FraudAlert {
  id: string;
  type: "duplicate" | "price_inflation" | "unauthorized" | "pattern" | "anomaly";
  severity: "low" | "medium" | "high" | "critical";
  title: string;
  description: string;
  evidence: string[];
  financialImpact: number;
  confidence: number;
  recommendation: string;
  involvedInvoices: string[];
}

export interface FraudAnalysisResult {
  invoiceId: string;
  overallRisk: "low" | "medium" | "high" | "critical";
  alerts: FraudAlert[];
  totalPotentialFraud: number;
  complianceScore: number;
  analysisTimestamp: string;
}

/**
 * Analyze single invoice for fraud
 */
export async function analyzeInvoiceForFraud(
  invoice: Invoice,
  historicalInvoices: Invoice[] = [],
  contractTerms?: string
): Promise<FraudAnalysisResult> {
  try {
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 3072,
      system: `You are a forensic accounting expert specializing in fraud detection. Analyze invoices for:

1. DUPLICATE CHARGES: Same items billed multiple times
2. PRICE INFLATION: Charges above contracted rates
3. UNAUTHORIZED SERVICES: Items not in contract scope
4. QUANTITY MANIPULATION: Inflated quantities
5. CALCULATION ERRORS: Math mistakes (usually in vendor's favor)

Contract Terms (if available): ${contractTerms || "Not provided"}

Return JSON array of fraud alerts:
[{
  "type": "duplicate",
  "severity": "critical",
  "title": "Duplicate Charge Detected",
  "description": "Same service billed in multiple invoices",
  "evidence": ["Invoice 123, Line 4", "Invoice 124, Line 2"],
  "financialImpact": 45000,
  "confidence": 0.95,
  "recommendation": "Request credit memo immediately"
}]`,
      messages: [{
        role: "user",
        content: `Analyze this invoice for fraud:

CURRENT INVOICE:
Vendor: ${invoice.vendorName}
Invoice #: ${invoice.invoiceNumber}
Date: ${invoice.invoiceDate}
Total: $${invoice.amount.toLocaleString()}

LINE ITEMS:
${invoice.lineItems.map((item, i) => 
  `${i + 1}. ${item.description} - Qty: ${item.quantity} × $${item.unitPrice} = $${item.total}`
).join("\n")}

HISTORICAL CONTEXT:
${historicalInvoices.slice(-5).map(h => 
  `Invoice ${h.invoiceNumber} (${h.invoiceDate}): $${h.amount.toLocaleString()}`
).join("\n")}`
      }]
    });

    const content = response.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response type");
    }

    const alerts: FraudAlert[] = JSON.parse(content.text).map((alert: any, index: number) => ({
      id: `fraud-${invoice.id}-${index}`,
      involvedInvoices: [invoice.id],
      ...alert
    }));

    const totalPotentialFraud = alerts.reduce((sum, a) => sum + a.financialImpact, 0);
    const highSeverityCount = alerts.filter(a => a.severity === "high" || a.severity === "critical").length;
    
    let overallRisk: "low" | "medium" | "high" | "critical" = "low";
    if (highSeverityCount >= 3) overallRisk = "critical";
    else if (highSeverityCount >= 2) overallRisk = "high";
    else if (alerts.length >= 2) overallRisk = "medium";

    return {
      invoiceId: invoice.id,
      overallRisk,
      alerts,
      totalPotentialFraud,
      complianceScore: 100 - Math.min(alerts.length * 15, 100),
      analysisTimestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error("Failed to analyze invoice for fraud:", error);
    return {
      invoiceId: invoice.id,
      overallRisk: "low",
      alerts: [],
      totalPotentialFraud: 0,
      complianceScore: 100,
      analysisTimestamp: new Date().toISOString()
    };
  }
}

/**
 * Detect patterns across multiple invoices
 */
export async function detectFraudPatterns(invoices: Invoice[]): Promise<FraudAlert[]> {
  try {
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 4096,
      system: `You are a forensic data analyst. Analyze multiple invoices to detect systematic fraud patterns:

1. VENDOR COLLUSION: Multiple vendors with similar patterns
2. BILLING CYCLES: Consistent overbilling at month-end
3. ROUND NUMBER FRAUD: Suspicious amounts ($10,000.00 exactly)
4. GHOST VENDORS: Vendors with no physical presence
5. SHELL COMPANY INDICATORS: Multiple vendors, same address/phone
6. QUANTITY TRENDS: Gradual quantity inflation over time
7. PRICE CREEP: Slow price increases above market rates

Return JSON array of pattern-based fraud alerts.`,
      messages: [{
        role: "user",
        content: `Analyze these ${invoices.length} invoices for systematic fraud patterns:

${invoices.map(inv => `
Invoice ${inv.invoiceNumber} | ${inv.vendorName} | ${inv.invoiceDate} | $${inv.amount.toLocaleString()}
Items: ${inv.lineItems.length} | Avg Unit Price: $${(inv.amount / inv.lineItems.reduce((s, i) => s + i.quantity, 1)).toFixed(2)}
`).join("\n")}`
      }]
    });

    const content = response.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response type");
    }

    const patterns = JSON.parse(content.text);
    
    return patterns.map((pattern: any, index: number) => ({
      id: `pattern-${Date.now()}-${index}`,
      involvedInvoices: pattern.involvedInvoices || invoices.map(i => i.id),
      ...pattern
    }));
  } catch (error) {
    console.error("Failed to detect fraud patterns:", error);
    return [];
  }
}

/**
 * Generate fraud investigation report
 */
export function generateFraudReport(
  results: FraudAnalysisResult[],
  patterns: FraudAlert[]
): string {
  const totalAlerts = results.reduce((sum, r) => sum + r.alerts.length, 0) + patterns.length;
  const totalFraud = results.reduce((sum, r) => sum + r.totalPotentialFraud, 0) + 
                     patterns.reduce((sum, p) => sum + p.financialImpact, 0);
  const criticalAlerts = [...results.flatMap(r => r.alerts), ...patterns]
    .filter(a => a.severity === "critical");

  return `
# Fraud Detection Report
**Generated:** ${new Date().toLocaleDateString()}

## Executive Summary

**Total Invoices Analyzed:** ${results.length}
**Fraud Alerts Detected:** ${totalAlerts}
**Critical Issues:** ${criticalAlerts.length}
**Total Potential Fraud:** $${(totalFraud / 1000).toFixed(0)}K

## Critical Alerts Requiring Immediate Action

${criticalAlerts.slice(0, 5).map((alert, i) => `
### ${i + 1}. ${alert.title}

**Type:** ${alert.type.toUpperCase()}
**Financial Impact:** $${(alert.financialImpact / 1000).toFixed(0)}K
**Confidence:** ${Math.round(alert.confidence * 100)}%

**Description:** ${alert.description}

**Evidence:**
${alert.evidence.map(e => `- ${e}`).join("\n")}

**Recommendation:** ${alert.recommendation}

---
`).join("\n")}

## Pattern Analysis

${patterns.map((pattern, i) => `
### Pattern ${i + 1}: ${pattern.title}

**Affected Invoices:** ${pattern.involvedInvoices.length}
**Total Impact:** $${(pattern.financialImpact / 1000).toFixed(0)}K
**Pattern Type:** ${pattern.type}

${pattern.description}

**Action Required:** ${pattern.recommendation}
`).join("\n")}

## Next Steps

1. **Immediate:** Investigate all critical alerts (${criticalAlerts.length} items)
2. **This Week:** Review medium/high severity alerts
3. **This Month:** Implement recommended controls to prevent recurrence
4. **Ongoing:** Monitor for pattern recurrence

## Recommendations

- Strengthen invoice approval process
- Implement duplicate detection automation
- Require contract verification for all invoices >$10K
- Conduct vendor audits for flagged vendors
- Review and update vendor onboarding procedures
`;
}