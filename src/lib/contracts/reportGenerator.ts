/**
 * Report Generation
 * Creates downloadable contract analysis reports with visualizations
 */

import type { ContractAnalysisResult } from "./types";
import type { RiskScore } from "./riskScoring";

export interface ReportSection {
  title: string;
  content: string;
  pageBreak?: boolean;
}

/**
 * Generate comprehensive 5-page report with visualizations
 */
export function generateExecutiveSummary(
  contractName: string,
  pbmName: string,
  analysis: ContractAnalysisResult,
  riskScore: RiskScore,
  overallScore: number,
  estimatedSavings: number,
  annualCost: number
): string {
  const reportDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Contract Intelligence Report - ${contractName}</title>
  <style>
    @page {
      size: A4;
      margin: 0;
    }
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      line-height: 1.6;
      color: #1f2937;
      background: white;
    }
    
    .page {
      width: 210mm;
      height: 297mm;
      padding: 20mm;
      page-break-after: always;
      position: relative;
      background: white;
    }
    
    .page:last-child {
      page-break-after: auto;
    }
    
    /* Cover Page */
    .cover-page {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
      color: white;
      padding: 40mm 20mm;
    }
    
    .cover-header {
      text-align: center;
    }
    
    .cover-title {
      font-size: 48px;
      font-weight: 700;
      margin-bottom: 20px;
      letter-spacing: -1px;
    }
    
    .cover-subtitle {
      font-size: 24px;
      font-weight: 300;
      opacity: 0.9;
      margin-bottom: 40px;
    }
    
    .cover-contract-name {
      font-size: 32px;
      font-weight: 600;
      background: rgba(255, 255, 255, 0.1);
      padding: 20px;
      border-radius: 8px;
      margin: 40px 0;
      border-left: 4px solid #fbbf24;
    }
    
    .cover-meta {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-top: 40px;
    }
    
    .cover-meta-item {
      background: rgba(255, 255, 255, 0.1);
      padding: 15px;
      border-radius: 6px;
    }
    
    .cover-meta-label {
      font-size: 12px;
      opacity: 0.7;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    
    .cover-meta-value {
      font-size: 18px;
      font-weight: 600;
      margin-top: 5px;
    }
    
    .cover-footer {
      text-align: center;
      opacity: 0.8;
      font-size: 14px;
    }
    
    /* Page Header */
    .page-header {
      border-bottom: 3px solid #3b82f6;
      padding-bottom: 15px;
      margin-bottom: 30px;
    }
    
    .page-title {
      font-size: 28px;
      font-weight: 700;
      color: #1e40af;
      margin-bottom: 5px;
    }
    
    .page-number {
      position: absolute;
      bottom: 15mm;
      right: 20mm;
      font-size: 12px;
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
      background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
      border-radius: 12px;
      padding: 25px;
      border-left: 5px solid #3b82f6;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    
    .score-card.excellent {
      border-left-color: #10b981;
      background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
    }
    
    .score-card.good {
      border-left-color: #3b82f6;
      background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
    }
    
    .score-card.fair {
      border-left-color: #f59e0b;
      background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
    }
    
    .score-card.poor {
      border-left-color: #ef4444;
      background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
    }
    
    .score-label {
      font-size: 14px;
      color: #6b7280;
      margin-bottom: 8px;
      font-weight: 500;
    }
    
    .score-value {
      font-size: 42px;
      font-weight: 700;
      margin-bottom: 5px;
    }
    
    .score-card.excellent .score-value { color: #10b981; }
    .score-card.good .score-value { color: #3b82f6; }
    .score-card.fair .score-value { color: #f59e0b; }
    .score-card.poor .score-value { color: #ef4444; }
    
    /* Bar Charts */
    .chart-container {
      margin: 30px 0;
    }
    
    .chart-title {
      font-size: 18px;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 20px;
    }
    
    .bar-chart {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
    
    .bar-item {
      display: flex;
      align-items: center;
      gap: 15px;
    }
    
    .bar-label {
      width: 140px;
      font-size: 14px;
      font-weight: 500;
      color: #374151;
    }
    
    .bar-track {
      flex: 1;
      height: 32px;
      background: #f3f4f6;
      border-radius: 6px;
      position: relative;
      overflow: hidden;
    }
    
    .bar-fill {
      height: 100%;
      background: linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%);
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 10px;
      transition: width 0.3s ease;
    }
    
    .bar-fill.excellent { background: linear-gradient(90deg, #10b981 0%, #34d399 100%); }
    .bar-fill.good { background: linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%); }
    .bar-fill.fair { background: linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%); }
    .bar-fill.poor { background: linear-gradient(90deg, #ef4444 0%, #f87171 100%); }
    
    .bar-value {
      color: white;
      font-weight: 600;
      font-size: 13px;
    }
    
    /* Red Flags */
    .red-flag {
      background: white;
      border-left: 4px solid #ef4444;
      border-radius: 6px;
      padding: 20px;
      margin-bottom: 15px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    
    .red-flag.critical {
      border-left-color: #dc2626;
      background: #fef2f2;
    }
    
    .red-flag.high {
      border-left-color: #f59e0b;
      background: #fffbeb;
    }
    
    .red-flag-header {
      display: flex;
      justify-content: space-between;
      align-items: start;
      margin-bottom: 10px;
    }
    
    .red-flag-title {
      font-size: 16px;
      font-weight: 600;
      color: #1f2937;
      flex: 1;
    }
    
    .red-flag-badge {
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .red-flag-badge.critical {
      background: #dc2626;
      color: white;
    }
    
    .red-flag-badge.high {
      background: #f59e0b;
      color: white;
    }
    
    .red-flag-badge.medium {
      background: #fbbf24;
      color: #92400e;
    }
    
    .red-flag-description {
      font-size: 14px;
      color: #4b5563;
      margin-bottom: 10px;
      line-height: 1.6;
    }
    
    .red-flag-cost {
      font-size: 14px;
      font-weight: 600;
      color: #dc2626;
      margin-top: 8px;
    }
    
    /* Provisions List */
    .provision-item {
      background: white;
      border-radius: 8px;
      padding: 18px;
      margin-bottom: 12px;
      border: 1px solid #e5e7eb;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    }
    
    .provision-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }
    
    .provision-name {
      font-size: 15px;
      font-weight: 600;
      color: #1f2937;
    }
    
    .provision-score {
      font-size: 18px;
      font-weight: 700;
    }
    
    .provision-description {
      font-size: 13px;
      color: #6b7280;
      margin-bottom: 8px;
    }
    
    .provision-recommendation {
      font-size: 13px;
      color: #374151;
      background: #f9fafb;
      padding: 8px 12px;
      border-radius: 4px;
      border-left: 3px solid #3b82f6;
    }
    
    /* Savings Section */
    .savings-highlight {
      background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
      border: 2px solid #10b981;
      border-radius: 12px;
      padding: 30px;
      margin: 30px 0;
      text-align: center;
    }
    
    .savings-amount {
      font-size: 56px;
      font-weight: 700;
      color: #10b981;
      margin-bottom: 10px;
    }
    
    .savings-label {
      font-size: 18px;
      color: #065f46;
      font-weight: 500;
    }
    
    .savings-breakdown {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 15px;
      margin-top: 25px;
      text-align: left;
    }
    
    .savings-item {
      background: white;
      padding: 15px;
      border-radius: 8px;
    }
    
    .savings-item-label {
      font-size: 12px;
      color: #6b7280;
      margin-bottom: 5px;
    }
    
    .savings-item-value {
      font-size: 20px;
      font-weight: 700;
      color: #1f2937;
    }
    
    /* Lists */
    ul {
      list-style: none;
      padding: 0;
    }
    
    li {
      padding: 8px 0 8px 25px;
      position: relative;
      font-size: 14px;
      line-height: 1.6;
    }
    
    li::before {
      content: "→";
      position: absolute;
      left: 0;
      color: #3b82f6;
      font-weight: 700;
    }
    
    .recommendations li::before {
      content: "✓";
      color: #10b981;
    }
    
    /* Section Divider */
    .section-divider {
      height: 2px;
      background: linear-gradient(90deg, #3b82f6 0%, transparent 100%);
      margin: 25px 0;
    }
    
    @media print {
      body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
      .page { page-break-after: always; }
      .page:last-child { page-break-after: auto; }
    }
  </style>
</head>
<body>
  ${generateCoverPage(contractName, pbmName, reportDate, overallScore, estimatedSavings)}
  ${generateExecutiveSummaryPage(overallScore, riskScore, analysis, estimatedSavings, annualCost)}
  ${generateRiskAnalysisPage(analysis, riskScore)}
  ${generateProvisionAnalysisPage(analysis)}
  ${generateSavingsRecommendationsPage(analysis, estimatedSavings, annualCost)}
</body>
</html>
  `.trim();
}

function generateCoverPage(
  contractName: string,
  pbmName: string,
  reportDate: string,
  overallScore: number,
  estimatedSavings: number
): string {
  return `
  <!-- PAGE 1: COVER -->
  <div class="page cover-page">
    <div class="cover-header">
      <div class="cover-title">Contract Intelligence</div>
      <div class="cover-subtitle">AI-Powered Analysis Report</div>
      
      <div class="cover-contract-name">
        ${contractName}
      </div>
      
      <div style="text-align: center; margin: 20px 0;">
        <span style="font-size: 18px; opacity: 0.9;">for</span>
        <div style="font-size: 24px; font-weight: 600; margin-top: 10px;">${pbmName}</div>
      </div>
    </div>
    
    <div class="cover-meta">
      <div class="cover-meta-item">
        <div class="cover-meta-label">Report Date</div>
        <div class="cover-meta-value">${reportDate}</div>
      </div>
      <div class="cover-meta-item">
        <div class="cover-meta-label">Overall Score</div>
        <div class="cover-meta-value">${overallScore}/100</div>
      </div>
      <div class="cover-meta-item">
        <div class="cover-meta-label">Analysis Model</div>
        <div class="cover-meta-value">Claude 3.5 Sonnet</div>
      </div>
      <div class="cover-meta-item">
        <div class="cover-meta-label">Potential Savings</div>
        <div class="cover-meta-value">$${(estimatedSavings / 1000000).toFixed(2)}M</div>
      </div>
    </div>
    
    <div class="cover-footer">
      <p>Generated by Contract X-Ray Intelligence Platform</p>
      <p style="margin-top: 10px; font-size: 12px;">SiriusB iQ AI Data Sciences Lab</p>
    </div>
  </div>
  `;
}

function generateExecutiveSummaryPage(
  overallScore: number,
  riskScore: RiskScore,
  analysis: ContractAnalysisResult,
  estimatedSavings: number,
  annualCost: number
): string {
  const scoreClass = getScoreClass(overallScore);
  const riskLevel = getRiskLevel(overallScore);
  
  return `
  <!-- PAGE 2: EXECUTIVE SUMMARY -->
  <div class="page">
    <div class="page-header">
      <div class="page-title">Executive Summary</div>
    </div>
    
    <div class="score-grid">
      <div class="score-card ${scoreClass}">
        <div class="score-label">Overall Score</div>
        <div class="score-value">${overallScore}</div>
        <div style="font-size: 13px; color: #6b7280;">${riskLevel}</div>
      </div>
      
      <div class="score-card ${getScoreClass(riskScore.financial)}">
        <div class="score-label">Financial Risk</div>
        <div class="score-value">${riskScore.financial}</div>
        <div style="font-size: 13px; color: #6b7280;">${getRiskLevel(riskScore.financial)}</div>
      </div>
      
      <div class="score-card ${getScoreClass(riskScore.legal)}">
        <div class="score-label">Legal Risk</div>
        <div class="score-value">${riskScore.legal}</div>
        <div style="font-size: 13px; color: #6b7280;">${getRiskLevel(riskScore.legal)}</div>
      </div>
      
      <div class="score-card ${getScoreClass(riskScore.operational)}">
        <div class="score-label">Operational Risk</div>
        <div class="score-value">${riskScore.operational}</div>
        <div style="font-size: 13px; color: #6b7280;">${getRiskLevel(riskScore.operational)}</div>
      </div>
    </div>
    
    <div class="section-divider"></div>
    
    <div class="chart-container">
      <div class="chart-title">Risk Breakdown Analysis</div>
      <div class="bar-chart">
        <div class="bar-item">
          <div class="bar-label">Financial</div>
          <div class="bar-track">
            <div class="bar-fill ${getScoreClass(riskScore.financial)}" style="width: ${riskScore.financial}%">
              <span class="bar-value">${riskScore.financial}/100</span>
            </div>
          </div>
        </div>
        
        <div class="bar-item">
          <div class="bar-label">Legal</div>
          <div class="bar-track">
            <div class="bar-fill ${getScoreClass(riskScore.legal)}" style="width: ${riskScore.legal}%">
              <span class="bar-value">${riskScore.legal}/100</span>
            </div>
          </div>
        </div>
        
        <div class="bar-item">
          <div class="bar-label">Operational</div>
          <div class="bar-track">
            <div class="bar-fill ${getScoreClass(riskScore.operational)}" style="width: ${riskScore.operational}%">
              <span class="bar-value">${riskScore.operational}/100</span>
            </div>
          </div>
        </div>
        
        <div class="bar-item">
          <div class="bar-label">Compliance</div>
          <div class="bar-track">
            <div class="bar-fill ${getScoreClass(riskScore.compliance)}" style="width: ${riskScore.compliance}%">
              <span class="bar-value">${riskScore.compliance}/100</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="section-divider"></div>
    
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 25px; margin-top: 25px;">
      <div>
        <h3 style="font-size: 16px; font-weight: 600; color: #10b981; margin-bottom: 15px;">✓ Key Strengths</h3>
        <ul>
          ${analysis.provisions
            .filter(p => p.score >= 80)
            .slice(0, 3)
            .map(p => `<li>${p.name} (${p.score}/100)</li>`)
            .join("")}
        </ul>
      </div>
      
      <div>
        <h3 style="font-size: 16px; font-weight: 600; color: #ef4444; margin-bottom: 15px;">⚠ Areas of Concern</h3>
        <ul>
          ${analysis.provisions
            .filter(p => p.score < 70)
            .slice(0, 3)
            .map(p => `<li>${p.name} (${p.score}/100)</li>`)
            .join("")}
        </ul>
      </div>
    </div>
    
    <div class="page-number">Page 2 of 5</div>
  </div>
  `;
}

function generateRiskAnalysisPage(
  analysis: ContractAnalysisResult,
  riskScore: RiskScore
): string {
  const redFlags = analysis.redFlags || [];
  const criticalFlags = redFlags.filter(f => f.severity === "Critical").slice(0, 3);
  const highFlags = redFlags.filter(f => f.severity === "High").slice(0, 2);
  const displayFlags = [...criticalFlags, ...highFlags].slice(0, 5);
  
  return `
  <!-- PAGE 3: RISK ANALYSIS -->
  <div class="page">
    <div class="page-header">
      <div class="page-title">Critical Red Flags & Risk Analysis</div>
    </div>
    
    <div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 15px; border-radius: 6px; margin-bottom: 25px;">
      <div style="font-size: 14px; color: #991b1b; font-weight: 600;">
        ${redFlags.length} Total Red Flags Identified
      </div>
      <div style="font-size: 12px; color: #7f1d1d; margin-top: 5px;">
        ${criticalFlags.length} Critical | ${redFlags.filter(f => f.severity === "High").length} High | ${redFlags.filter(f => f.severity === "Medium").length} Medium
      </div>
    </div>
    
    ${displayFlags.map((flag, index) => `
      <div class="red-flag ${flag.severity.toLowerCase()}">
        <div class="red-flag-header">
          <div class="red-flag-title">${index + 1}. ${flag.title}</div>
          <div class="red-flag-badge ${flag.severity.toLowerCase()}">${flag.severity}</div>
        </div>
        <div class="red-flag-description">${flag.description}</div>
        ${flag.estimatedCost ? `<div class="red-flag-cost">💰 Estimated Annual Cost: $${(flag.estimatedCost / 1000).toFixed(0)}K</div>` : ""}
        ${flag.recommendation ? `
          <div style="margin-top: 10px; padding: 10px; background: white; border-radius: 4px; font-size: 13px;">
            <strong>Recommendation:</strong> ${flag.recommendation}
          </div>
        ` : ""}
      </div>
    `).join("")}
    
    ${displayFlags.length === 0 ? `
      <div style="text-align: center; padding: 40px; color: #6b7280;">
        <div style="font-size: 48px; margin-bottom: 15px;">✓</div>
        <div style="font-size: 18px; font-weight: 600; color: #10b981;">No Critical Red Flags Identified</div>
        <div style="font-size: 14px; margin-top: 10px;">This contract shows no immediate critical concerns.</div>
      </div>
    ` : ""}
    
    <div class="page-number">Page 3 of 5</div>
  </div>
  `;
}

function generateProvisionAnalysisPage(
  analysis: ContractAnalysisResult
): string {
  const provisions = analysis.provisions || [];
  const topProvisions = provisions.slice(0, 8);
  
  return `
  <!-- PAGE 4: PROVISION ANALYSIS -->
  <div class="page">
    <div class="page-header">
      <div class="page-title">Detailed Provision Analysis</div>
    </div>
    
    <div class="chart-container">
      <div class="chart-title">Provision Scores Overview</div>
      <div class="bar-chart">
        ${topProvisions.map(provision => `
          <div class="bar-item">
            <div class="bar-label" style="width: 180px;">${provision.name}</div>
            <div class="bar-track">
              <div class="bar-fill ${getScoreClass(provision.score)}" style="width: ${provision.score}%">
                <span class="bar-value">${provision.score}</span>
              </div>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
    
    <div class="section-divider"></div>
    
    <div style="margin-top: 25px;">
      ${topProvisions.slice(0, 5).map((provision, index) => `
        <div class="provision-item">
          <div class="provision-header">
            <div class="provision-name">${index + 1}. ${provision.name}</div>
            <div class="provision-score" style="color: ${getScoreColor(provision.score)}">${provision.score}/100</div>
          </div>
          <div class="provision-description">${provision.description}</div>
          ${provision.recommendation ? `
            <div class="provision-recommendation">
              <strong>💡 Recommendation:</strong> ${provision.recommendation}
            </div>
          ` : ""}
        </div>
      `).join("")}
    </div>
    
    <div class="page-number">Page 4 of 5</div>
  </div>
  `;
}

function generateSavingsRecommendationsPage(
  analysis: ContractAnalysisResult,
  estimatedSavings: number,
  annualCost: number
): string {
  const optimizedCost = annualCost - estimatedSavings;
  const savingsPercent = Math.round((estimatedSavings / annualCost) * 100);
  
  return `
  <!-- PAGE 5: SAVINGS & RECOMMENDATIONS -->
  <div class="page">
    <div class="page-header">
      <div class="page-title">Savings Opportunities & Next Steps</div>
    </div>
    
    <div class="savings-highlight">
      <div class="savings-amount">$${(estimatedSavings / 1000000).toFixed(2)}M</div>
      <div class="savings-label">Total Potential Annual Savings</div>
      
      <div class="savings-breakdown">
        <div class="savings-item">
          <div class="savings-item-label">Current Annual Cost</div>
          <div class="savings-item-value">$${(annualCost / 1000000).toFixed(2)}M</div>
        </div>
        <div class="savings-item">
          <div class="savings-item-label">Optimized Cost</div>
          <div class="savings-item-value" style="color: #10b981;">$${(optimizedCost / 1000000).toFixed(2)}M</div>
        </div>
        <div class="savings-item">
          <div class="savings-item-label">Cost Reduction</div>
          <div class="savings-item-value" style="color: #10b981;">${savingsPercent}%</div>
        </div>
      </div>
    </div>
    
    <div class="section-divider"></div>
    
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 25px; margin-top: 25px;">
      <div>
        <h3 style="font-size: 16px; font-weight: 600; color: #1f2937; margin-bottom: 15px;">🎯 Immediate Actions (This Week)</h3>
        <ul class="recommendations">
          <li>Review and address ${analysis.redFlags.filter(f => f.severity === "Critical").length} critical red flags</li>
          <li>Share analysis with legal counsel for review</li>
          <li>Prepare questions for vendor clarification</li>
          <li>Document areas requiring renegotiation</li>
        </ul>
      </div>
      
      <div>
        <h3 style="font-size: 16px; font-weight: 600; color: #1f2937; margin-bottom: 15px;">📅 Short-term Actions (30 Days)</h3>
        <ul class="recommendations">
          <li>Negotiate top ${analysis.provisions.filter(p => p.score < 70).length} priority provisions</li>
          <li>Benchmark pricing against industry standards</li>
          <li>Establish performance metrics and KPIs</li>
          <li>Set up contract compliance monitoring</li>
        </ul>
      </div>
    </div>
    
    <div style="margin-top: 25px;">
      <h3 style="font-size: 16px; font-weight: 600; color: #1f2937; margin-bottom: 15px;">🚀 Long-term Strategy (90 Days)</h3>
      <ul class="recommendations">
        <li>Use findings to improve future contract templates</li>
        <li>Implement vendor governance framework</li>
        <li>Schedule comprehensive annual contract audit</li>
        <li>Develop data-driven vendor selection criteria</li>
        <li>Train procurement team on identified risk patterns</li>
      </ul>
    </div>
    
    <div class="section-divider"></div>
    
    <div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); padding: 20px; border-radius: 8px; text-align: center; margin-top: 25px;">
      <div style="font-size: 14px; color: #1e40af; font-weight: 600; margin-bottom: 8px;">
        Need Help Implementing These Recommendations?
      </div>
      <div style="font-size: 13px; color: #1e3a8a;">
        Our Contract Intelligence team can guide you through negotiations and implementation.
      </div>
      <div style="margin-top: 15px; font-size: 12px; color: #3b82f6;">
        Contact: support@siriusb.ai | www.siriusb.ai
      </div>
    </div>
    
    <div class="page-number">Page 5 of 5</div>
  </div>
  `;
}

function getScoreClass(score: number): string {
  if (score >= 80) return "excellent";
  if (score >= 70) return "good";
  if (score >= 60) return "fair";
  return "poor";
}

function getRiskLevel(score: number): string {
  if (score >= 80) return "Low Risk";
  if (score >= 70) return "Moderate Risk";
  if (score >= 60) return "Medium Risk";
  if (score >= 40) return "High Risk";
  return "Critical Risk";
}

function getScoreColor(score: number): string {
  if (score >= 80) return "#10b981";
  if (score >= 70) return "#3b82f6";
  if (score >= 60) return "#f59e0b";
  return "#ef4444";
}

/**
 * Convert report to Markdown format (legacy support)
 */
export function reportToMarkdown(sections: ReportSection[]): string {
  return sections
    .map(section => section.content)
    .join("\n\n");
}

/**
 * Download HTML report as file
 */
export function downloadReport(html: string, filename: string = "contract-analysis-report.html") {
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