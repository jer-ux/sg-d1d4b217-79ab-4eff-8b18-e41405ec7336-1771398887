/**
 * Report Generation with PDF Export
 * Creates downloadable contract analysis reports with visualizations and PDF export
 */

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import type { ContractAnalysisResult, ProvisionAnalysis, RedFlag } from "./types";

interface ScoreBreakdown {
  financial: number;
  legal: number;
  operational: number;
  compliance: number;
  overall: number;
}

interface EnterpriseReportOptions {
  companyName?: string;
  companyLogo?: string;
  watermark?: string;
  includeCoverPage?: boolean;
  includeExecutiveSummary?: boolean;
  includeDetailedAnalysis?: boolean;
  includeRecommendations?: boolean;
  theme?: "professional" | "modern" | "classic";
  confidentialityLevel?: "Public" | "Internal" | "Confidential" | "Highly Confidential";
}

/**
 * Generate PDF from HTML content
 */
export async function generatePDFReport(
  htmlContent: string,
  filename: string = "Contract_Analysis_Report.pdf",
  options: EnterpriseReportOptions = {}
): Promise<void> {
  try {
    // Create a temporary container for the HTML
    const container = document.createElement("div");
    container.innerHTML = htmlContent;
    container.style.position = "absolute";
    container.style.left = "-9999px";
    container.style.width = "210mm"; // A4 width
    document.body.appendChild(container);

    // Generate PDF
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // Get all page elements
    const pages = container.querySelectorAll(".report-page");
    
    for (let i = 0; i < pages.length; i++) {
      if (i > 0) {
        pdf.addPage();
      }

      const page = pages[i] as HTMLElement;
      const canvas = await html2canvas(page, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Add watermark if specified
      if (options.watermark) {
        pdf.setFontSize(60);
        pdf.setTextColor(200, 200, 200);
        pdf.text(options.watermark, 105, 148, {
          align: "center",
          angle: 45,
        });
      }

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

      // Add confidentiality footer
      if (options.confidentialityLevel) {
        pdf.setFontSize(8);
        pdf.setTextColor(150, 150, 150);
        pdf.text(
          `${options.confidentialityLevel} - Page ${i + 1} of ${pages.length}`,
          105,
          290,
          { align: "center" }
        );
      }
    }

    // Cleanup
    document.body.removeChild(container);

    // Download PDF
    pdf.save(filename);
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw new Error("Failed to generate PDF report");
  }
}

/**
 * Generate HTML report content
 */
export function generateExecutiveSummary(
  contractName: string,
  pbmName: string,
  analysis: ContractAnalysisResult,
  scoreBreakdown: ScoreBreakdown,
  overallScore: number,
  potentialSavings: number,
  annualCost: number,
  options: EnterpriseReportOptions = {}
): string {
  const theme = options.theme || "professional";
  const companyName = options.companyName || "SiriusB iQ";
  const confidentiality = options.confidentialityLevel || "Confidential";

  // Validate input data
  if (!contractName || !pbmName) {
    console.warn("Missing contract name or PBM name");
  }

  if (!analysis.provisions || analysis.provisions.length === 0) {
    console.warn("No provisions found in analysis");
  }

  if (!analysis.redFlags || analysis.redFlags.length === 0) {
    console.warn("No red flags found in analysis");
  }

  const getScoreColor = (score: number): string => {
    if (score >= 80) return "#10b981";
    if (score >= 70) return "#3b82f6";
    if (score >= 60) return "#f59e0b";
    return "#ef4444";
  };

  const getRiskColor = (level: string): string => {
    const colors: Record<string, string> = {
      Low: "#10b981",
      Medium: "#f59e0b",
      High: "#ef4444",
      Critical: "#991b1b",
    };
    return colors[level] || "#6b7280";
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const generateDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Generate risk breakdown data with safe filtering
  const riskCategories = [
    { name: "Critical", count: (analysis.redFlags || []).filter(f => f.severity === "Critical").length },
    { name: "High", count: (analysis.redFlags || []).filter(f => f.severity === "High").length },
    { name: "Medium", count: (analysis.redFlags || []).filter(f => f.severity === "Medium").length },
    { name: "Low", count: (analysis.redFlags || []).filter(f => f.severity === "Low").length },
  ];

  const maxRiskCount = Math.max(...riskCategories.map(r => r.count), 1);

  // Log report data for debugging
  console.log("Generating report with data:", {
    contractName,
    pbmName,
    provisionsCount: analysis.provisions?.length || 0,
    redFlagsCount: analysis.redFlags?.length || 0,
    overallScore,
    potentialSavings,
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${contractName} - Analysis Report</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #1f2937;
      background: #ffffff;
    }

    .report-page {
      width: 210mm;
      min-height: 297mm;
      padding: 20mm;
      margin: 0 auto;
      background: white;
      page-break-after: always;
      position: relative;
    }

    .report-page:last-child {
      page-break-after: auto;
    }

    /* Cover Page */
    .cover-page {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .cover-logo {
      font-size: 48px;
      font-weight: 800;
      margin-bottom: 20px;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }

    .cover-title {
      font-size: 36px;
      font-weight: 700;
      margin-bottom: 10px;
      text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
    }

    .cover-subtitle {
      font-size: 24px;
      margin-bottom: 40px;
      opacity: 0.9;
    }

    .cover-metadata {
      background: rgba(255,255,255,0.1);
      padding: 30px;
      border-radius: 12px;
      backdrop-filter: blur(10px);
      margin-top: 40px;
    }

    .cover-metadata-item {
      font-size: 18px;
      margin: 10px 0;
    }

    .confidentiality-badge {
      position: absolute;
      top: 20px;
      right: 20px;
      background: rgba(239, 68, 68, 0.9);
      color: white;
      padding: 8px 16px;
      border-radius: 6px;
      font-weight: 600;
      font-size: 14px;
    }

    /* Page Header */
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 15px;
      border-bottom: 3px solid #667eea;
      margin-bottom: 30px;
    }

    .page-title {
      font-size: 28px;
      font-weight: 700;
      color: #1f2937;
    }

    .page-number {
      font-size: 14px;
      color: #6b7280;
    }

    /* Score Cards */
    .score-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
      margin: 30px 0;
    }

    .score-card {
      background: white;
      border: 2px solid #e5e7eb;
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    }

    .score-card-header {
      font-size: 14px;
      color: #6b7280;
      margin-bottom: 10px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .score-card-value {
      font-size: 42px;
      font-weight: 700;
      margin-bottom: 10px;
    }

    .score-card-label {
      font-size: 12px;
      color: #9ca3af;
    }

    /* Bar Charts */
    .chart-container {
      margin: 30px 0;
    }

    .chart-title {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 20px;
      color: #1f2937;
    }

    .chart-bar {
      margin-bottom: 15px;
    }

    .chart-bar-label {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      margin-bottom: 5px;
      color: #4b5563;
    }

    .chart-bar-track {
      height: 24px;
      background: #f3f4f6;
      border-radius: 12px;
      overflow: hidden;
      position: relative;
    }

    .chart-bar-fill {
      height: 100%;
      border-radius: 12px;
      display: flex;
      align-items: center;
      padding: 0 10px;
      color: white;
      font-size: 12px;
      font-weight: 600;
      transition: width 0.3s ease;
    }

    /* Risk Flags */
    .risk-flag {
      background: #fef2f2;
      border-left: 4px solid #ef4444;
      padding: 15px;
      margin-bottom: 15px;
      border-radius: 6px;
    }

    .risk-flag-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }

    .risk-flag-title {
      font-weight: 600;
      color: #991b1b;
    }

    .risk-badge {
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;
      color: white;
    }

    .risk-flag-description {
      font-size: 14px;
      color: #4b5563;
      line-height: 1.5;
    }

    /* Provisions */
    .provision-item {
      margin-bottom: 20px;
    }

    .provision-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }

    .provision-title {
      font-weight: 600;
      color: #1f2937;
    }

    .provision-score {
      font-weight: 700;
      font-size: 18px;
    }

    /* Savings Section */
    .savings-highlight {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
      padding: 30px;
      border-radius: 12px;
      text-align: center;
      margin: 30px 0;
    }

    .savings-label {
      font-size: 16px;
      opacity: 0.9;
      margin-bottom: 10px;
    }

    .savings-amount {
      font-size: 48px;
      font-weight: 700;
      margin-bottom: 10px;
    }

    .savings-description {
      font-size: 14px;
      opacity: 0.8;
    }

    /* Recommendations */
    .recommendation-section {
      margin: 30px 0;
    }

    .recommendation-category {
      margin-bottom: 25px;
    }

    .recommendation-category-title {
      font-size: 18px;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 15px;
      padding-bottom: 8px;
      border-bottom: 2px solid #e5e7eb;
    }

    .recommendation-item {
      display: flex;
      align-items: start;
      margin-bottom: 12px;
      padding: 12px;
      background: #f9fafb;
      border-radius: 6px;
    }

    .recommendation-icon {
      width: 24px;
      height: 24px;
      background: #667eea;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 700;
      margin-right: 12px;
      flex-shrink: 0;
    }

    .recommendation-text {
      font-size: 14px;
      color: #4b5563;
      line-height: 1.5;
    }

    /* Footer */
    .page-footer {
      position: absolute;
      bottom: 15mm;
      left: 20mm;
      right: 20mm;
      padding-top: 15px;
      border-top: 1px solid #e5e7eb;
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: #9ca3af;
    }

    @media print {
      .report-page {
        page-break-after: always;
      }
    }
  </style>
</head>
<body>
  <!-- Page 1: Cover Page -->
  <div class="report-page cover-page">
    <div class="confidentiality-badge">${confidentiality}</div>
    <div class="cover-logo">${companyName}</div>
    <div class="cover-title">Contract Analysis Report</div>
    <div class="cover-subtitle">${contractName}</div>
    
    <div class="cover-metadata">
      <div class="cover-metadata-item"><strong>PBM:</strong> ${pbmName}</div>
      <div class="cover-metadata-item"><strong>Analysis Date:</strong> ${generateDate}</div>
      <div class="cover-metadata-item"><strong>Overall Score:</strong> ${overallScore}/100</div>
      <div class="cover-metadata-item"><strong>Risk Level:</strong> ${analysis.riskLevel}</div>
    </div>
  </div>

  <!-- Page 2: Executive Summary -->
  <div class="report-page">
    <div class="page-header">
      <div class="page-title">Executive Summary</div>
      <div class="page-number">Page 2 of 5</div>
    </div>

    <div class="score-grid">
      <div class="score-card">
        <div class="score-card-header">Overall Score</div>
        <div class="score-card-value" style="color: ${getScoreColor(scoreBreakdown.overall)}">
          ${scoreBreakdown.overall}
        </div>
        <div class="score-card-label">Out of 100</div>
      </div>

      <div class="score-card">
        <div class="score-card-header">Financial Risk</div>
        <div class="score-card-value" style="color: ${getScoreColor(scoreBreakdown.financial)}">
          ${scoreBreakdown.financial}
        </div>
        <div class="score-card-label">Financial Performance</div>
      </div>

      <div class="score-card">
        <div class="score-card-header">Legal Compliance</div>
        <div class="score-card-value" style="color: ${getScoreColor(scoreBreakdown.legal)}">
          ${scoreBreakdown.legal}
        </div>
        <div class="score-card-label">Legal Risk Score</div>
      </div>

      <div class="score-card">
        <div class="score-card-header">Operational Risk</div>
        <div class="score-card-value" style="color: ${getScoreColor(scoreBreakdown.operational)}">
          ${scoreBreakdown.operational}
        </div>
        <div class="score-card-label">Operational Performance</div>
      </div>
    </div>

    <div class="chart-container">
      <div class="chart-title">Risk Breakdown Analysis</div>
      ${riskCategories
        .map(
          (risk) => `
        <div class="chart-bar">
          <div class="chart-bar-label">
            <span>${risk.name} Risk</span>
            <span>${risk.count} issue${risk.count !== 1 ? "s" : ""}</span>
          </div>
          <div class="chart-bar-track">
            <div 
              class="chart-bar-fill" 
              style="width: ${(risk.count / maxRiskCount) * 100}%; background-color: ${getRiskColor(risk.name)}"
            >
              ${risk.count > 0 ? `${risk.count} issues` : ""}
            </div>
          </div>
        </div>
      `
        )
        .join("")}
    </div>

    <div class="page-footer">
      <span>${companyName} - ${confidentiality}</span>
      <span>Generated: ${generateDate}</span>
    </div>
  </div>

  <!-- Page 3: Risk Analysis -->
  <div class="report-page">
    <div class="page-header">
      <div class="page-title">Critical Risk Analysis</div>
      <div class="page-number">Page 3 of 5</div>
    </div>

    ${analysis.redFlags && analysis.redFlags.length > 0
      ? analysis.redFlags
          .slice(0, 8)
          .map(
            (flag: RedFlag) => `
          <div class="risk-flag">
            <div class="risk-flag-header">
              <div class="risk-flag-title">${flag.title || "Untitled Risk"}</div>
              <div class="risk-badge" style="background-color: ${getRiskColor(flag.severity)}">
                ${flag.severity || "Medium"}
              </div>
            </div>
            <div class="risk-flag-description">${flag.description || "No description available"}</div>
          </div>
        `
          )
          .join("")
      : `
        <div style="text-align: center; padding: 40px; color: #6b7280;">
          <p>No critical risks identified in this analysis.</p>
        </div>
      `}

    <div class="page-footer">
      <span>${companyName} - ${confidentiality}</span>
      <span>Generated: ${generateDate}</span>
    </div>
  </div>

  <!-- Page 4: Provision Analysis -->
  <div class="report-page">
    <div class="page-header">
      <div class="page-title">Detailed Provision Analysis</div>
      <div class="page-number">Page 4 of 5</div>
    </div>

    ${analysis.provisions && analysis.provisions.length > 0
      ? analysis.provisions
          .slice(0, 10)
          .map(
            (provision: ProvisionAnalysis) => `
          <div class="provision-item">
            <div class="provision-header">
              <div class="provision-title">${provision.name || "Untitled Provision"}</div>
              <div class="provision-score" style="color: ${getScoreColor(provision.score)}">
                ${provision.score || 0}/100
              </div>
            </div>
            <div class="chart-bar-track">
              <div 
                class="chart-bar-fill" 
                style="width: ${provision.score || 0}%; background-color: ${getScoreColor(provision.score)}"
              >
                ${provision.score || 0}%
              </div>
            </div>
          </div>
        `
          )
          .join("")
      : `
        <div style="text-align: center; padding: 40px; color: #6b7280;">
          <p>No provisions analyzed in this contract.</p>
        </div>
      `}

    <div class="page-footer">
      <span>${companyName} - ${confidentiality}</span>
      <span>Generated: ${generateDate}</span>
    </div>
  </div>

  <!-- Page 5: Savings & Recommendations -->
  <div class="report-page">
    <div class="page-header">
      <div class="page-title">Financial Impact & Recommendations</div>
      <div class="page-number">Page 5 of 5</div>
    </div>

    <div class="savings-highlight">
      <div class="savings-label">Estimated Annual Savings Opportunity</div>
      <div class="savings-amount">${formatCurrency(potentialSavings)}</div>
      <div class="savings-description">Based on identified optimization opportunities and risk mitigation</div>
    </div>

    <div class="recommendation-section">
      <div class="recommendation-category">
        <div class="recommendation-category-title">Immediate Actions (0-30 Days)</div>
        <div class="recommendation-item">
          <div class="recommendation-icon">1</div>
          <div class="recommendation-text">Review and renegotiate high-risk provisions identified in the critical risk section</div>
        </div>
        <div class="recommendation-item">
          <div class="recommendation-icon">2</div>
          <div class="recommendation-text">Implement monitoring systems for identified financial leakage points</div>
        </div>
        <div class="recommendation-item">
          <div class="recommendation-icon">3</div>
          <div class="recommendation-text">Schedule stakeholder review meeting to discuss critical findings</div>
        </div>
      </div>

      <div class="recommendation-category">
        <div class="recommendation-category-title">Short-term Actions (30-90 Days)</div>
        <div class="recommendation-item">
          <div class="recommendation-icon">4</div>
          <div class="recommendation-text">Develop corrective action plans for medium-risk provisions</div>
        </div>
        <div class="recommendation-item">
          <div class="recommendation-icon">5</div>
          <div class="recommendation-text">Establish quarterly contract performance review process</div>
        </div>
        <div class="recommendation-item">
          <div class="recommendation-icon">6</div>
          <div class="recommendation-text">Create data quality improvement initiatives</div>
        </div>
      </div>

      <div class="recommendation-category">
        <div class="recommendation-category-title">Long-term Strategy (90+ Days)</div>
        <div class="recommendation-item">
          <div class="recommendation-icon">7</div>
          <div class="recommendation-text">Implement continuous contract monitoring and optimization platform</div>
        </div>
        <div class="recommendation-item">
          <div class="recommendation-icon">8</div>
          <div class="recommendation-text">Develop vendor relationship management strategy</div>
        </div>
      </div>
    </div>

    <div class="page-footer">
      <span>${companyName} - ${confidentiality}</span>
      <span>Generated: ${generateDate}</span>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Download HTML report
 */
export function downloadHTMLReport(html: string, filename: string): void {
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}