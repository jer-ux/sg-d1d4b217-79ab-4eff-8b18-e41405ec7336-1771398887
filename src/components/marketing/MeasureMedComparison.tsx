"use client";

import { Check, X, ArrowRight, Shield, Scale, FileSearch, Brain } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ComparisonRow {
  category: string;
  feature: string;
  siriusb: boolean | string;
  measuremed: boolean | string;
  insight?: string;
}

const comparisonData: ComparisonRow[] = [
  {
    category: "Approach",
    feature: "Forensic Evidence Collection",
    siriusb: "Chain-of-custody audit trails",
    measuremed: false,
    insight: "We investigate what happened; they predict what might happen"
  },
  {
    category: "Approach",
    feature: "Clinical Outcome Modeling",
    siriusb: "Historical claims forensics",
    measuremed: "Predictive QALY/hospitalization",
    insight: "Both provide clinical insight, different methodologies"
  },
  {
    category: "Scope",
    feature: "PBM Contract Forensics",
    siriusb: true,
    measuremed: false,
    insight: "We audit the contract itself for leakage"
  },
  {
    category: "Scope",
    feature: "Formulary Optimization",
    siriusb: "Evidence-based analysis",
    measuremed: "Primary focus",
    insight: "Their core product; our component"
  },
  {
    category: "Scope",
    feature: "Broker Commission Tracking",
    siriusb: true,
    measuremed: false
  },
  {
    category: "Scope",
    feature: "Stop-Loss Analysis",
    siriusb: true,
    measuremed: false
  },
  {
    category: "Scope",
    feature: "Multi-Vendor Compliance",
    siriusb: true,
    measuremed: "PBM-focused only"
  },
  {
    category: "Evidence",
    feature: "Form 5500 Integration",
    siriusb: true,
    measuremed: false,
    insight: "We connect DOL filings to claims reality"
  },
  {
    category: "Evidence",
    feature: "Receipt-Level Lineage",
    siriusb: "Every assertion traced to source",
    measuremed: false
  },
  {
    category: "Evidence",
    feature: "Third-Party Validation",
    siriusb: "Actuarial + Legal",
    measuremed: "Clinical consultants",
    insight: "Different validation standards for different missions"
  },
  {
    category: "Platform",
    feature: "Executive War Room",
    siriusb: true,
    measuremed: false,
    insight: "Real-time investigative dashboard for C-suite"
  },
  {
    category: "Platform",
    feature: "Verified Savings Ledger",
    siriusb: "Double-entry accounting for all interventions",
    measuremed: false
  },
  {
    category: "Platform",
    feature: "Agentic Automation",
    siriusb: "Multi-agent orchestration",
    measuremed: "Clinical automation pipeline"
  },
  {
    category: "Platform",
    feature: "Arbitrage Event Detection",
    siriusb: true,
    measuremed: false,
    insight: "We identify contractual arbitrage opportunities in real-time"
  },
  {
    category: "Integration",
    feature: "Snowflake Native",
    siriusb: true,
    measuremed: "Unknown",
    insight: "We operate in your data warehouse"
  },
  {
    category: "Integration",
    feature: "Claims Data Ingestion",
    siriusb: true,
    measuremed: true
  },
  {
    category: "Use Case",
    feature: "ERISA Fiduciary Defense",
    siriusb: true,
    measuremed: false,
    insight: "Legal-grade evidence for DOL audits"
  },
  {
    category: "Use Case",
    feature: "M&A Due Diligence",
    siriusb: true,
    measuremed: false,
    insight: "Forensic analysis for PE/VC transactions"
  },
  {
    category: "Use Case",
    feature: "Clinical Cost Optimization",
    siriusb: true,
    measuremed: true
  },
  {
    category: "Use Case",
    feature: "Board-Level Reporting",
    siriusb: "Automated executive briefs",
    measuremed: false
  }
];

const categories = Array.from(new Set(comparisonData.map(row => row.category)));

export function MeasureMedComparison() {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <Badge variant="outline" className="mb-2">
          Competitive Intelligence
        </Badge>
        <h2 className="text-4xl font-bold tracking-tight">
          Forensic Intelligence vs. Clinical Optimization
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          MeasureMed optimizes formularies for clinical outcomes. We investigate the entire benefits supply chain for fraud, waste, and contractual abuse.
        </p>
      </div>

      {/* Positioning Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 bg-gradient-to-br from-blue-950 to-slate-900 border-blue-800">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-900/50 rounded-lg">
              <FileSearch className="w-6 h-6 text-blue-400" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">SiriusB iQ</h3>
              <p className="text-sm text-blue-200">Forensic Intelligence Platform</p>
              <p className="text-muted-foreground text-sm">
                <strong>Mission:</strong> Investigate what actually happened. Build legal-grade evidence trails. Detect arbitrage. Defend fiduciary duty.
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge variant="secondary" className="text-xs">Chain-of-Custody</Badge>
                <Badge variant="secondary" className="text-xs">Multi-Vendor</Badge>
                <Badge variant="secondary" className="text-xs">ERISA Defense</Badge>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-slate-800/50 rounded-lg">
              <Brain className="w-6 h-6 text-slate-400" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">MeasureMed</h3>
              <p className="text-sm text-slate-400">Clinical-Financial Operating System</p>
              <p className="text-muted-foreground text-sm">
                <strong>Mission:</strong> Predict clinical outcomes. Optimize formularies. Model QALY and hospitalization risk.
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge variant="outline" className="text-xs">Formulary Focus</Badge>
                <Badge variant="outline" className="text-xs">Predictive</Badge>
                <Badge variant="outline" className="text-xs">Clinical ROI</Badge>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Comparison Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 font-semibold">Capability</th>
                <th className="text-center p-4 font-semibold w-1/3">
                  <div className="flex items-center justify-center gap-2">
                    <Shield className="w-4 h-4 text-blue-400" />
                    SiriusB iQ
                  </div>
                </th>
                <th className="text-center p-4 font-semibold w-1/3">
                  <div className="flex items-center justify-center gap-2">
                    <Brain className="w-4 h-4 text-slate-400" />
                    MeasureMed
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <>
                  <tr key={category} className="bg-muted/20">
                    <td colSpan={3} className="p-3 font-semibold text-sm uppercase tracking-wide">
                      {category}
                    </td>
                  </tr>
                  {comparisonData
                    .filter(row => row.category === category)
                    .map((row, idx) => (
                      <tr key={`${category}-${idx}`} className="border-t border-border/50 hover:bg-muted/10">
                        <td className="p-4">
                          <div>
                            <div className="font-medium">{row.feature}</div>
                            {row.insight && (
                              <div className="text-xs text-muted-foreground mt-1 italic">
                                {row.insight}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="p-4 text-center">
                          {typeof row.siriusb === "boolean" ? (
                            row.siriusb ? (
                              <Check className="w-5 h-5 text-green-400 mx-auto" />
                            ) : (
                              <X className="w-5 h-5 text-red-400/50 mx-auto" />
                            )
                          ) : (
                            <div className="text-sm text-blue-300">{row.siriusb}</div>
                          )}
                        </td>
                        <td className="p-4 text-center">
                          {typeof row.measuremed === "boolean" ? (
                            row.measuremed ? (
                              <Check className="w-5 h-5 text-green-400 mx-auto" />
                            ) : (
                              <X className="w-5 h-5 text-red-400/50 mx-auto" />
                            )
                          ) : (
                            <div className="text-sm text-slate-400">{row.measuremed}</div>
                          )}
                        </td>
                      </tr>
                    ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Bottom Insight */}
      <Card className="p-6 bg-gradient-to-r from-slate-900 to-blue-950 border-blue-800/50">
        <div className="flex items-start gap-4">
          <Scale className="w-8 h-8 text-blue-400 flex-shrink-0 mt-1" />
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Different Problems, Different Solutions</h3>
            <p className="text-muted-foreground">
              <strong>MeasureMed</strong> solves clinical optimization — aligning formularies with patient outcomes. Valuable for HR/benefits teams focused on employee health.
            </p>
            <p className="text-muted-foreground">
              <strong>SiriusB iQ</strong> solves forensic investigation — detecting PBM contract leakage, broker kickbacks, and vendor arbitrage. Essential for CFOs, general counsel, and boards defending fiduciary duty.
            </p>
            <p className="text-sm text-blue-300 font-medium mt-4">
              <ArrowRight className="w-4 h-4 inline mr-2" />
              Use both: MeasureMed for clinical strategy, SiriusB iQ for financial defense and legal compliance.
            </p>
          </div>
        </div>
      </Card>

      {/* CTA */}
      <div className="text-center space-y-4 pt-8">
        <h3 className="text-2xl font-bold">
          Need Forensic Intelligence for Your Benefits Program?
        </h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          If you're facing ERISA audits, M&A due diligence, or suspect contractual abuse in your PBM/TPA relationships, we provide the evidence infrastructure you need.
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="/request-demo"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Request Forensic Audit
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="/contract-intelligence"
            className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors border border-slate-700"
          >
            See Platform Demo
          </a>
        </div>
      </div>
    </div>
  );
}