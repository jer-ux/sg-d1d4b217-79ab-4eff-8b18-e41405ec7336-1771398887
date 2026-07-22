import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Download, CheckCircle2, Clock, TrendingUp, AlertTriangle, DollarSign, Shield, Target, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ReportSection {
  title: string;
  content: string[];
  metrics?: { label: string; value: string; change?: string }[];
}

export function BoardReportGenerator() {
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [reportGenerated, setReportGenerated] = useState(false);

  const demoReport = {
    title: "Q4 2026 Executive Board Report",
    subtitle: "Healthcare Benefits Intelligence Summary",
    generatedDate: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    sections: [
      {
        title: "Executive Summary",
        content: [
          "Analysis of healthcare benefits program across 3,247 covered lives reveals significant opportunities for cost optimization and risk mitigation.",
          "Identified $2.4M in annualized savings through contract compliance enforcement and vendor performance optimization.",
          "Current compliance score of 87% represents a 5% improvement QoQ, with 14 active contract violations requiring immediate attention.",
          "Proactive intervention on high-cost claimant cohort projected to prevent $890K in adverse development over next 12 months."
        ],
        metrics: [
          { label: "Total Program Spend", value: "$18.7M", change: "+3.2% YoY" },
          { label: "PMPM Cost", value: "$479.52", change: "-1.8% vs Budget" },
          { label: "Medical Loss Ratio", value: "84.3%", change: "+2.1 pts" },
          { label: "Rx Trend", value: "+8.4%", change: "Above Industry" }
        ]
      },
      {
        title: "Financial Impact Analysis",
        content: [
          "PBM contract violations totaling $1.2M identified through spread pricing analysis and rebate reconciliation discrepancies.",
          "Stop-loss attachment optimization opportunity: reducing from $150K to $125K projects $340K annual premium savings with acceptable risk profile.",
          "Network steerage initiatives show 23% reduction in high-cost facility utilization, yielding $620K in episode-of-care savings.",
          "Specialty pharmacy channel mix optimization presents $280K opportunity through biosimilar conversion and manufacturer assistance programs."
        ],
        metrics: [
          { label: "Identified Leakage", value: "$2.4M", change: "14% of spend" },
          { label: "Stop-Loss Premium", value: "$1.8M", change: "Optimization: -$340K" },
          { label: "Network Performance", value: "87% efficiency", change: "+5 pts QoQ" },
          { label: "Rx Wastage", value: "$480K", change: "Recoverable" }
        ]
      },
      {
        title: "Risk & Compliance Assessment",
        content: [
          "14 active contract violations identified across PBM, TPA, and stop-loss agreements requiring immediate remediation.",
          "ERISA fiduciary compliance score of 87% indicates strong governance framework with defined improvement pathway to 95%.",
          "High-cost claimant analysis reveals 8 members exceeding $100K annual costs, representing 12.4% of total medical spend.",
          "Predictive modeling identifies 23 members at elevated risk for catastrophic claims in next 6 months, enabling proactive case management."
        ],
        metrics: [
          { label: "Contract Violations", value: "14 Active", change: "-3 from Q3" },
          { label: "Fiduciary Score", value: "87/100", change: "+5 pts QoQ" },
          { label: "High-Cost Members", value: "8 >$100K", change: "12.4% of spend" },
          { label: "Audit Readiness", value: "92%", change: "Board ready" }
        ]
      },
      {
        title: "Strategic Recommendations",
        content: [
          "Immediate: Initiate formal dispute process with PBM for $1.2M in identified spread pricing and rebate pass-through discrepancies.",
          "Q1 2027: Execute stop-loss attachment optimization to $125K level, leveraging predictive analytics for risk-adjusted pricing negotiation.",
          "Q1-Q2 2027: Implement reference-based pricing strategy for top 50 high-cost procedures, projected $840K annual savings at 80% success rate.",
          "Ongoing: Enhance vendor governance framework with monthly reconciliation protocols and real-time claims surveillance integration."
        ]
      },
      {
        title: "Action Items & Timeline",
        content: [
          "Week 1-2: CFO to authorize legal counsel engagement for PBM contract dispute resolution (estimated recovery: $1.2M)",
          "Week 3-4: Benefits committee to review and approve stop-loss strategy modification (projected savings: $340K annually)",
          "Month 2: HR to communicate reference-based pricing implementation to employee population with member advocacy support",
          "Month 3: Board to review updated vendor governance charter with enhanced oversight and reconciliation requirements"
        ]
      }
    ]
  };

  const handleGenerate = async () => {
    setGenerating(true);
    setProgress(0);
    setReportGenerated(false);

    const steps = [
      { label: "Analyzing contract violations", value: 20 },
      { label: "Calculating financial impact", value: 40 },
      { label: "Assessing risk exposure", value: 60 },
      { label: "Generating recommendations", value: 80 },
      { label: "Finalizing executive summary", value: 100 }
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 600));
      setProgress(step.value);
    }

    setTimeout(() => {
      setGenerating(false);
      setReportGenerated(true);
      setProgress(0);
    }, 500);
  };

  const handleDownloadPDF = () => {
    const reportContent = generateReportHTML();
    
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${demoReport.title}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #1e293b;
              padding: 40px;
              background: white;
            }
            .header {
              border-bottom: 3px solid #3b82f6;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .header h1 {
              font-size: 28px;
              color: #0f172a;
              margin-bottom: 8px;
            }
            .header .subtitle {
              font-size: 16px;
              color: #64748b;
              margin-bottom: 4px;
            }
            .header .date {
              font-size: 14px;
              color: #94a3b8;
              font-style: italic;
            }
            .section {
              margin-bottom: 35px;
              page-break-inside: avoid;
            }
            .section-title {
              font-size: 20px;
              color: #0f172a;
              margin-bottom: 15px;
              padding-bottom: 8px;
              border-bottom: 2px solid #e2e8f0;
            }
            .section-content p {
              margin-bottom: 12px;
              text-align: justify;
              color: #334155;
            }
            .metrics-grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 15px;
              margin: 20px 0;
            }
            .metric-card {
              border: 1px solid #e2e8f0;
              border-radius: 8px;
              padding: 15px;
              background: #f8fafc;
            }
            .metric-label {
              font-size: 12px;
              color: #64748b;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              margin-bottom: 5px;
            }
            .metric-value {
              font-size: 24px;
              font-weight: bold;
              color: #0f172a;
              margin-bottom: 3px;
            }
            .metric-change {
              font-size: 13px;
              color: #3b82f6;
              font-weight: 500;
            }
            .footer {
              margin-top: 50px;
              padding-top: 20px;
              border-top: 1px solid #e2e8f0;
              text-align: center;
              font-size: 12px;
              color: #94a3b8;
            }
            @media print {
              body { padding: 20px; }
              .section { page-break-inside: avoid; }
            }
          </style>
        </head>
        <body>
          ${reportContent}
          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() { window.close(); }, 100);
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const generateReportHTML = () => {
    return `
      <div class="header">
        <h1>${demoReport.title}</h1>
        <div class="subtitle">${demoReport.subtitle}</div>
        <div class="date">Generated: ${demoReport.generatedDate}</div>
      </div>
      
      ${demoReport.sections.map(section => `
        <div class="section">
          <h2 class="section-title">${section.title}</h2>
          <div class="section-content">
            ${section.content.map(paragraph => `<p>${paragraph}</p>`).join("")}
          </div>
          ${section.metrics ? `
            <div class="metrics-grid">
              ${section.metrics.map(metric => `
                <div class="metric-card">
                  <div class="metric-label">${metric.label}</div>
                  <div class="metric-value">${metric.value}</div>
                  ${metric.change ? `<div class="metric-change">${metric.change}</div>` : ""}
                </div>
              `).join("")}
            </div>
          ` : ""}
        </div>
      `).join("")}
      
      <div class="footer">
        <p><strong>Confidential Board Material</strong></p>
        <p>Generated by SiriusB iQ Ai Data Sciences Lab • ${demoReport.generatedDate}</p>
        <p>This report contains proprietary analytics and should be treated as confidential.</p>
      </div>
    `;
  };

  const quickMetrics = [
    { label: "Identified Savings", value: "$2.4M", trend: "+18%", icon: TrendingUp, color: "emerald" },
    { label: "Contract Issues", value: "14", trend: "-3 QoQ", icon: AlertTriangle, color: "orange" },
    { label: "Compliance Score", value: "87%", trend: "+5 pts", icon: CheckCircle2, color: "blue" },
    { label: "Risk Exposure", value: "$890K", trend: "Mitigated", icon: Shield, color: "purple" }
  ];

  return (
    <Card className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-slate-700">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Board Report Generator</h3>
            <p className="text-sm text-slate-400">Comprehensive executive intelligence report</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
            <FileText className="w-6 h-6 text-blue-400" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {quickMetrics.map((metric, idx) => {
            const Icon = metric.icon;
            const colorMap = {
              emerald: "from-emerald-500/20 to-emerald-600/20 border-emerald-500/30 text-emerald-400",
              orange: "from-orange-500/20 to-orange-600/20 border-orange-500/30 text-orange-400",
              blue: "from-blue-500/20 to-blue-600/20 border-blue-500/30 text-blue-400",
              purple: "from-purple-500/20 to-purple-600/20 border-purple-500/30 text-purple-400"
            };
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`bg-gradient-to-br ${colorMap[metric.color as keyof typeof colorMap]} border rounded-lg p-3`}
              >
                <div className="flex items-start justify-between mb-2">
                  <Icon className="w-4 h-4 opacity-70" />
                  <span className="text-xs font-mono opacity-70">{metric.trend}</span>
                </div>
                <div className="text-2xl font-bold mb-0.5">{metric.value}</div>
                <div className="text-xs opacity-70">{metric.label}</div>
              </motion.div>
            );
          })}
        </div>

        {generating && (
          <div className="mb-6">
            <div className="flex items-center justify-between text-sm text-slate-400 mb-2">
              <span>Generating comprehensive report...</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        )}

        {reportGenerated && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg"
          >
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="font-semibold text-emerald-300 mb-1">Report Generated Successfully</div>
                <div className="text-sm text-emerald-300/80 mb-3">
                  {demoReport.title} • {demoReport.sections.length} sections • Ready for board presentation
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-emerald-300/70">
                  <span className="px-2 py-1 bg-emerald-500/20 rounded">Executive Summary</span>
                  <span className="px-2 py-1 bg-emerald-500/20 rounded">Financial Analysis</span>
                  <span className="px-2 py-1 bg-emerald-500/20 rounded">Risk Assessment</span>
                  <span className="px-2 py-1 bg-emerald-500/20 rounded">Recommendations</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div className="flex gap-3">
          <Button
            onClick={handleGenerate}
            disabled={generating}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold"
          >
            {generating ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Clock className="w-4 h-4 mr-2" />
                </motion.div>
                Generating...
              </>
            ) : (
              <>
                <FileText className="w-4 h-4 mr-2" />
                Generate Report
              </>
            )}
          </Button>
          <Button
            onClick={handleDownloadPDF}
            disabled={!reportGenerated}
            variant="outline"
            className="border-slate-600 hover:bg-slate-800 text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed"
            title={!reportGenerated ? "Generate report first" : "Download as PDF"}
          >
            <Download className="w-4 h-4" />
          </Button>
        </div>

        <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <div className="flex items-start gap-2 text-xs text-blue-300">
            <Target className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold mb-1">Report includes:</div>
              <div className="text-blue-300/80">
                Executive summary • $2.4M savings analysis • 14 contract violations • 
                Risk mitigation strategies • Board-ready action items • PDF export
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}