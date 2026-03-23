/**
 * Report Generation
 * Creates downloadable contract analysis reports
 */

import type { ContractAnalysisResult } from "./types";
import type { RiskScore } from "./riskScoring";

export interface ReportSection {
  title: string;
  content: string;
  pageBreak?: boolean;
}

/**
 * Generate executive summary report
 */
export function generateExecutiveSummary(
  contractName: string,
  analysis: ContractAnalysisResult,
  riskScore: RiskScore
): ReportSection[] {
  const sections: ReportSection[] = [];

  // Cover Page
  sections.push({
    title: "Contract Intelligence Report",
    content: `
# ${contractName}
## AI-Powered Contract Analysis

**Generated:** ${new Date().toLocaleDateString()}
**Analysis Model:** Claude 3.5 Sonnet
**Confidence Level:** ${(analysis.confidence * 100).toFixed(0)}%

---

### Overall Assessment

**Contract Score:** ${analysis.overallScore}/100

**Risk Level:** ${getRiskLevelText(analysis.overallScore)}

**Key Findings:**
- ${analysis.redFlags.length} critical red flags identified
- ${analysis.provisions.length} provisions analyzed
- Potential savings: $${(analysis.estimatedSavings / 1000000).toFixed(2)}M annually

---
`,
    pageBreak: true
  });

  // Executive Summary
  sections.push({
    title: "Executive Summary",
    content: `
## Executive Summary

This contract has been comprehensively analyzed using advanced AI to identify risks, opportunities, and areas for negotiation.

### Overall Score: ${analysis.overallScore}/100

${getScoreInterpretation(analysis.overallScore)}

### Risk Breakdown

- **Financial Risk:** ${riskScore.financial}/100
- **Legal Risk:** ${riskScore.legal}/100
- **Operational Risk:** ${riskScore.operational}/100
- **Compliance Risk:** ${riskScore.compliance}/100

### Top 3 Strengths

${analysis.provisions
  .filter(p => p.score >= 80)
  .slice(0, 3)
  .map((p, i) => `${i + 1}. **${p.name}** (${p.score}/100)\n   ${p.description}`)
  .join("\n\n")}

### Top 3 Concerns

${analysis.provisions
  .filter(p => p.score < 70)
  .slice(0, 3)
  .map((p, i) => `${i + 1}. **${p.name}** (${p.score}/100)\n   ${p.description}\n   *Recommendation:* ${p.recommendation}`)
  .join("\n\n")}

---
`,
    pageBreak: true
  });

  // Red Flags
  if (analysis.redFlags.length > 0) {
    sections.push({
      title: "Critical Red Flags",
      content: `
## Critical Red Flags

${analysis.redFlags.map((flag, i) => `
### ${i + 1}. ${flag.title}

**Severity:** ${flag.severity}

**Description:** ${flag.description}

**Location:** ${flag.location || "Multiple sections"}

**Estimated Annual Cost:** $${((flag.estimatedCost || 0) / 1000).toFixed(0)}K

**Recommendation:** ${flag.recommendation || "Review with legal counsel"}

---
`).join("\n")}
`,
      pageBreak: true
    });
  }

  // Provision Analysis
  sections.push({
    title: "Detailed Provision Analysis",
    content: `
## Detailed Provision Analysis

${analysis.provisions.map((p, i) => `
### ${i + 1}. ${p.name}

**Score:** ${p.score}/100 ${getScoreBadge(p.score)}

**Impact Level:** ${p.impact}

**Description:** ${p.description}

**Benchmark:** ${p.benchmark || "Market standard"}

**Recommendation:** ${p.recommendation}

${p.pageReference ? `**Location:** Page ${p.pageReference}` : ""}

---
`).join("\n")}
`,
      pageBreak: true
    });

  // Savings Opportunities
  if (analysis.estimatedSavings > 0) {
    sections.push({
      title: "Savings Opportunities",
      content: `
## Savings Opportunities

**Total Potential Savings:** $${(analysis.estimatedSavings / 1000000).toFixed(2)}M annually

### Quick Wins (0-30 days)

${analysis.provisions
  .filter(p => p.score < 70 && p.impact === "high")
  .slice(0, 3)
  .map((p, i) => `${i + 1}. **${p.name}**\n   Current state: ${p.description}\n   Improvement: ${p.recommendation}`)
  .join("\n\n")}

### Strategic Initiatives (3-6 months)

${analysis.redFlags
  .filter(f => f.estimatedCost && f.estimatedCost > 100000)
  .slice(0, 3)
  .map((f, i) => `${i + 1}. **${f.title}**\n   Impact: $${((f.estimatedCost || 0) / 1000).toFixed(0)}K\n   Action: ${f.recommendation}`)
  .join("\n\n")}

---
`,
      pageBreak: true
    });
  }

  // Recommendations
  sections.push({
    title: "Next Steps & Recommendations",
    content: `
## Next Steps & Recommendations

### Immediate Actions (This Week)

1. **Review Critical Red Flags** - Address the ${analysis.redFlags.filter(f => f.severity === "Critical").length} critical issues identified
2. **Share with Legal** - Have counsel review flagged provisions
3. **Prepare Questions** - Document clarifications needed from vendor

### Short-term Actions (30 Days)

1. **Negotiate Key Terms** - Focus on top 3 savings opportunities
2. **Benchmark Pricing** - Compare against ${analysis.provisions.filter(p => p.benchmark).length} industry standards
3. **Set Up Monitoring** - Track compliance with audit rights

### Long-term Strategy (90 Days)

1. **Contract Redesign** - Use findings to improve template
2. **Vendor Governance** - Establish performance metrics
3. **Annual Review** - Schedule comprehensive contract audit

---

**Report generated by Contract X-Ray Intelligence Platform**
*Powered by Claude 3.5 Sonnet AI*
`
  });

  return sections;
}

function getRiskLevelText(score: number): string {
  if (score >= 80) return "🟢 Low Risk - Contract is favorable";
  if (score >= 60) return "🟡 Medium Risk - Several areas need attention";
  if (score >= 40) return "🟠 High Risk - Significant concerns identified";
  return "🔴 Critical Risk - Immediate action required";
}

function getScoreInterpretation(score: number): string {
  if (score >= 80) {
    return "This contract represents a favorable agreement with strong protections and competitive terms. While no contract is perfect, this agreement aligns well with industry best practices.";
  }
  if (score >= 60) {
    return "This contract has a mix of favorable and concerning provisions. While it includes some competitive terms, there are several areas where negotiation could yield significant improvements.";
  }
  if (score >= 40) {
    return "This contract contains numerous provisions that are unfavorable to your organization. The identified risks and cost implications warrant serious consideration before execution.";
  }
  return "This contract presents critical risks that could significantly impact your organization. We strongly recommend comprehensive renegotiation or consideration of alternative vendors.";
}

function getScoreBadge(score: number): string {
  if (score >= 80) return "✅ Excellent";
  if (score >= 70) return "🟢 Good";
  if (score >= 60) return "🟡 Fair";
  if (score >= 50) return "🟠 Poor";
  return "🔴 Critical";
}

/**
 * Convert report to Markdown format
 */
export function reportToMarkdown(sections: ReportSection[]): string {
  return sections
    .map(section => section.content)
    .join("\n\n");
}

/**
 * Convert report to HTML format
 */
export function reportToHTML(sections: ReportSection[]): string {
  const html = sections.map(section => {
    const content = section.content
      .replace(/^# (.+)$/gm, '<h1>$1</h1>')
      .replace(/^## (.+)$/gm, '<h2>$1</h2>')
      .replace(/^### (.+)$/gm, '<h3>$1</h3>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/^- (.+)$/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/^(?!<[h|u|l])/gm, '<p>')
      .replace(/$/gm, '</p>');

    const pageBreak = section.pageBreak ? '<div style="page-break-after: always;"></div>' : '';
    
    return `<section>${content}${pageBreak}</section>`;
  }).join('\n');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Contract Analysis Report</title>
  <style>
    body { font-family: -apple-system, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; }
    h1 { color: #1e40af; border-bottom: 2px solid #3b82f6; padding-bottom: 10px; }
    h2 { color: #1e3a8a; margin-top: 30px; }
    h3 { color: #1e40af; }
    .badge { display: inline-block; padding: 4px 8px; border-radius: 4px; font-size: 0.85em; font-weight: 600; }
    @media print { .page-break { page-break-after: always; } }
  </style>
</head>
<body>
  ${html}
</body>
</html>
  `.trim();
}