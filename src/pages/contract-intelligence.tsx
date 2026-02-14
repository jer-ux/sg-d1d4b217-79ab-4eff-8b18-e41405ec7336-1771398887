/**
 * Contract Intelligence + Negotiation Weapon System
 * Enterprise-grade contract analysis, redline comparison, and risk scoring
 */

import { useState } from "react";
import { SEO } from "@/components/SEO";
import { SiriusBNav } from "@/components/siriusb/SiriusBNav";
import { SiriusBFooter } from "@/components/siriusb/SiriusBFooter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Shield,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Scale,
  DollarSign,
  Target,
  Zap,
  Upload,
  Eye,
  Download,
  ArrowRight,
  BarChart3,
  Briefcase,
  FileSearch,
} from "lucide-react";
import { ContractIntelligenceService } from "@/lib/contracts/contractIntelligence";
import { IndianaBenchmarkOracle } from "@/lib/contracts/indianaBenchmark";

export default function ContractIntelligencePage() {
  const [analyzing, setAnalyzing] = useState(false);
  const [demoResults, setDemoResults] = useState<any>(null);

  const runDemoAnalysis = async () => {
    setAnalyzing(true);

    // Sample current contract (typical PBM contract with issues)
    const currentContract = `
PHARMACY BENEFIT MANAGEMENT AGREEMENT

Section 1: Rebate Provisions
The PBM shall provide rebates on brand medications at a rate of 12% of WAC.
Generic rebates will be 60% of AWP. Specialty drug rebates are not guaranteed.
Rebates will be paid quarterly, subject to PBM's internal reconciliation process.

Section 2: Audit Rights
Client may conduct an audit with 90 days prior written notice. Audit costs
shall be borne by the Client. The PBM reserves the right to limit audit scope.

Section 3: Data Ownership
All claims data, utilization patterns, and formulary information constitute
proprietary information of the PBM. Client shall have limited access for
reporting purposes only.

Section 4: Termination
Either party may terminate with 180 days written notice. Early termination
fees equal to 6 months of average monthly fees shall apply.

Section 5: Specialty Medications
Specialty drug pricing shall be determined by PBM at their sole discretion.
Client acknowledges that specialty drug costs are highly variable.

Section 6: MAC Pricing
Maximum Allowable Cost for generic drugs shall be set by PBM based on
their proprietary pricing algorithms. MAC lists updated quarterly.
    `.trim();

    // Sample transparent model contract
    const templateContract = `
TRANSPARENT PHARMACY BENEFIT MANAGEMENT AGREEMENT

Section 1: Rebate Guarantee
The PBM guarantees minimum rebates as follows:
- Brand medications: 25% of WAC with 100% pass-through to client
- Generic medications: 75% of AWP with 100% pass-through to client
- Specialty medications: 15% of WAC with 100% pass-through to client
- Biosimilar medications: 20% of WAC with 100% pass-through to client

All rebates paid within 30 days of quarter end with full documentation.

Section 2: Independent Audit Rights
Client has unlimited independent audit rights with 30 days notice.
PBM bears all audit costs if discrepancies exceed 2% of total spend.
No restrictions on audit scope or auditor selection.

Section 3: Data Ownership
Client owns 100% of all claims data, member information, and utilization data.
PBM acts as data processor only. Client may export data at any time.
No restrictions on data usage or third-party analysis.

Section 4: Termination for Convenience
Either party may terminate with 90 days notice. No early termination fees.
Full data transfer and transition support included at no additional cost.

Section 5: Specialty Drug Transparency
Specialty drug pricing fully disclosed with ingredient cost + fixed dispensing fee.
Client has right to approve all specialty pharmacy network selections.
Quarterly reporting on specialty drug trend and clinical outcomes.

Section 6: MAC Pricing Transparency
MAC pricing based on publicly available NADAC pricing + disclosed markup.
Full MAC list disclosure updated monthly. Client can challenge any MAC price.
    `.trim();

    const metadata = {
      id: "demo_current_001",
      name: "Acme Corp PBM Contract",
      pbm_name: "MegaPBM Holdings LLC",
      effective_date: "2024-01-01",
      term_months: 36,
      client_lives: 2500,
      annual_spend: 12500000,
    };

    const templateMetadata = {
      id: "template_kincaid_001",
      name: "Kincaid Transparent Model Contract",
    };

    try {
      const results = await ContractIntelligenceService.analyzeContract(
        currentContract,
        metadata,
        templateContract,
        templateMetadata
      );

      setDemoResults(results);
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <>
      <SEO
        title="Contract Intelligence System - Kincaid IQ"
        description="Enterprise-grade PBM contract analysis, redline comparison, and fiduciary risk scoring"
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
        <SiriusBNav />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-6">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
          
          <div className="relative max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-blue-500/20 text-blue-300 border-blue-500/30">
                <Zap className="w-3 h-3 mr-1" />
                Contract Intelligence System
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Contract Intelligence +<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  Negotiation Weapon
                </span>
              </h1>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
                Enterprise-grade contract analysis that transforms opaque PBM agreements
                into quantified negotiation leverage. Redline comparison, litigation risk
                scoring, and Indiana benchmark validation—all in seconds.
              </p>

              <div className="flex items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500"
                  onClick={runDemoAnalysis}
                  disabled={analyzing}
                >
                  {analyzing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Analyzing Contract...
                    </>
                  ) : (
                    <>
                      <FileSearch className="w-5 h-5 mr-2" />
                      Run Demo Analysis
                    </>
                  )}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-600 text-slate-300 hover:bg-slate-800"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Upload Your Contract
                </Button>
              </div>
            </div>

            {/* Capability Cards */}
            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  icon: FileText,
                  title: "Redline Engine",
                  desc: "Clause-by-clause comparison against transparent model",
                  color: "blue",
                },
                {
                  icon: Scale,
                  title: "Risk Scoring",
                  desc: "Litigation probability & fiduciary breach assessment",
                  color: "red",
                },
                {
                  icon: TrendingUp,
                  title: "Indiana Benchmark",
                  desc: "Rebate performance vs regulatory standards",
                  color: "green",
                },
                {
                  icon: Target,
                  title: "Leverage Points",
                  desc: "Quantified negotiation ammunition",
                  color: "purple",
                },
              ].map((item, i) => (
                <Card
                  key={i}
                  className="bg-slate-900/50 border-slate-700 p-6 hover:border-slate-600 transition-colors"
                >
                  <div className={`w-12 h-12 rounded-lg bg-${item.color}-500/20 flex items-center justify-center mb-4`}>
                    <item.icon className={`w-6 h-6 text-${item.color}-400`} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-400">{item.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Demo Results Section */}
        {demoResults && (
          <section className="py-20 px-6">
            <div className="max-w-7xl mx-auto">
              <Tabs defaultValue="executive" className="w-full">
                <TabsList className="grid w-full grid-cols-5 bg-slate-900 border border-slate-700">
                  <TabsTrigger value="executive">Executive Brief</TabsTrigger>
                  <TabsTrigger value="redline">Redline Analysis</TabsTrigger>
                  <TabsTrigger value="risk">Risk Scoring</TabsTrigger>
                  <TabsTrigger value="benchmarks">Benchmarks</TabsTrigger>
                  <TabsTrigger value="leverage">Leverage Points</TabsTrigger>
                </TabsList>

                {/* Executive Briefing */}
                <TabsContent value="executive" className="mt-6">
                  <Card className="bg-slate-900/50 border-slate-700 p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h2 className="text-2xl font-bold text-white mb-2">
                          Executive Contract Intelligence Brief
                        </h2>
                        <p className="text-slate-400">
                          Comprehensive analysis of contract risk and economic exposure
                        </p>
                      </div>
                      <Button variant="outline" className="border-slate-600">
                        <Download className="w-4 h-4 mr-2" />
                        Export PDF
                      </Button>
                    </div>

                    <pre className="bg-slate-950 text-green-400 p-6 rounded-lg font-mono text-sm overflow-x-auto border border-slate-800">
                      {demoResults.executive_briefing}
                    </pre>

                    <div className="grid md:grid-cols-3 gap-6 mt-6">
                      <Card className="bg-slate-800/50 border-slate-700 p-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-slate-400">Contract Score</span>
                          <Shield className="w-5 h-5 text-blue-400" />
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">
                          {Math.round(demoResults.redline_analysis.overall_alignment_score)}%
                        </div>
                        <div className="text-xs text-slate-500">Alignment vs Best Practice</div>
                      </Card>

                      <Card className="bg-slate-800/50 border-slate-700 p-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-slate-400">Annual Exposure</span>
                          <DollarSign className="w-5 h-5 text-red-400" />
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">
                          ${(demoResults.redline_analysis.total_economic_delta / 1000000).toFixed(1)}M
                        </div>
                        <div className="text-xs text-slate-500">Cost + Risk Exposure</div>
                      </Card>

                      <Card className="bg-slate-800/50 border-slate-700 p-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-slate-400">Critical Issues</span>
                          <AlertTriangle className="w-5 h-5 text-yellow-400" />
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">
                          {demoResults.redline_analysis.critical_risks}
                        </div>
                        <div className="text-xs text-slate-500">Require Immediate Action</div>
                      </Card>
                    </div>
                  </Card>
                </TabsContent>

                {/* Redline Analysis */}
                <TabsContent value="redline" className="mt-6">
                  <Card className="bg-slate-900/50 border-slate-700 p-8">
                    <h2 className="text-2xl font-bold text-white mb-6">
                      Clause-by-Clause Redline Comparison
                    </h2>

                    <div className="space-y-4">
                      {demoResults.redline_analysis.clause_comparisons.map((comparison: any, i: number) => (
                        <Card
                          key={i}
                          className={`bg-slate-800/50 border p-6 ${
                            comparison.alignment_score < 50
                              ? "border-red-500/50"
                              : comparison.alignment_score < 70
                              ? "border-yellow-500/50"
                              : "border-green-500/50"
                          }`}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                  comparison.alignment_score < 50
                                    ? "bg-red-500/20"
                                    : comparison.alignment_score < 70
                                    ? "bg-yellow-500/20"
                                    : "bg-green-500/20"
                                }`}
                              >
                                {comparison.alignment_score < 50 ? (
                                  <XCircle className="w-5 h-5 text-red-400" />
                                ) : comparison.alignment_score < 70 ? (
                                  <AlertTriangle className="w-5 h-5 text-yellow-400" />
                                ) : (
                                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                                )}
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold text-white capitalize">
                                  {comparison.clause_type.replace(/_/g, " ")}
                                </h3>
                                <p className="text-sm text-slate-400">
                                  Alignment Score: {Math.round(comparison.alignment_score)}%
                                </p>
                              </div>
                            </div>
                            <Badge
                              className={
                                comparison.alignment_score < 50
                                  ? "bg-red-500/20 text-red-300 border-red-500/30"
                                  : comparison.alignment_score < 70
                                  ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                                  : "bg-green-500/20 text-green-300 border-green-500/30"
                              }
                            >
                              {comparison.economic_delta.annual_cost_delta > 0
                                ? `+$${comparison.economic_delta.annual_cost_delta.toLocaleString()}/yr`
                                : "No Cost Impact"}
                            </Badge>
                          </div>

                          {comparison.semantic_differences.length > 0 && (
                            <div className="mb-4 space-y-2">
                              {comparison.semantic_differences.map((diff: any, j: number) => (
                                <div key={j} className="bg-slate-950 rounded p-3 text-sm">
                                  <div className="flex items-start gap-2 mb-2">
                                    <Badge variant="outline" className="text-xs">
                                      {diff.impact_level}
                                    </Badge>
                                    <span className="text-slate-300 font-medium">{diff.field}</span>
                                  </div>
                                  <div className="grid md:grid-cols-2 gap-3 mb-2">
                                    <div>
                                      <div className="text-xs text-slate-500 mb-1">Current:</div>
                                      <div className="text-red-400">{diff.current_value}</div>
                                    </div>
                                    <div>
                                      <div className="text-xs text-slate-500 mb-1">Best Practice:</div>
                                      <div className="text-green-400">{diff.template_value}</div>
                                    </div>
                                  </div>
                                  <p className="text-slate-400 text-xs italic">{diff.explanation}</p>
                                </div>
                              ))}
                            </div>
                          )}

                          <div className="bg-slate-950 rounded p-4">
                            <div className="text-sm font-medium text-white mb-2">Recommendation:</div>
                            <p className="text-slate-300 text-sm">{comparison.recommendation}</p>
                          </div>

                          {comparison.risk_escalation.length > 0 && (
                            <div className="mt-4 space-y-2">
                              {comparison.risk_escalation.map((risk: any, k: number) => (
                                <div
                                  key={k}
                                  className="flex items-start gap-2 bg-red-950/30 border border-red-800/50 rounded p-3"
                                >
                                  <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5" />
                                  <div className="flex-1">
                                    <div className="text-sm font-medium text-red-300 mb-1">
                                      {risk.category.toUpperCase()} RISK - {risk.severity}
                                    </div>
                                    <p className="text-xs text-slate-300">{risk.description}</p>
                                    {risk.mitigation && (
                                      <p className="text-xs text-green-400 mt-1">
                                        → {risk.mitigation}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </Card>
                      ))}
                    </div>
                  </Card>
                </TabsContent>

                {/* Risk Scoring */}
                <TabsContent value="risk" className="mt-6">
                  <Card className="bg-slate-900/50 border-slate-700 p-8">
                    <h2 className="text-2xl font-bold text-white mb-6">
                      Litigation & Fiduciary Risk Assessment
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <Card className="bg-red-950/30 border-red-800/50 p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center">
                            <Scale className="w-6 h-6 text-red-400" />
                          </div>
                          <div>
                            <div className="text-sm text-slate-400">Total Risk Score</div>
                            <div className="text-2xl font-bold text-white">
                              ${(demoResults.fiduciary_risk_summary.total_risk_score / 1000000).toFixed(1)}M
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-slate-400">
                          Aggregate fiduciary breach and litigation exposure
                        </p>
                      </Card>

                      <Card className="bg-yellow-950/30 border-yellow-800/50 p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                            <Briefcase className="w-6 h-6 text-yellow-400" />
                          </div>
                          <div>
                            <div className="text-sm text-slate-400">Expected Litigation Cost</div>
                            <div className="text-2xl font-bold text-white">
                              ${(demoResults.fiduciary_risk_summary.expected_litigation_cost / 1000000).toFixed(1)}M
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-slate-400">
                          Defense costs + settlement exposure
                        </p>
                      </Card>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white">High-Value Risk Assessments</h3>
                      {demoResults.fiduciary_risk_summary.high_value_assessments.map((assessment: any, i: number) => (
                        <Card key={i} className="bg-slate-800/50 border-slate-700 p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge className="bg-red-500/20 text-red-300 border-red-500/30">
                                  {Math.round(assessment.breach_probability * 100)}% Breach Probability
                                </Badge>
                                <Badge className={`bg-${assessment.precedent_strength === "high" ? "red" : "yellow"}-500/20`}>
                                  {assessment.precedent_strength} Precedent Strength
                                </Badge>
                              </div>
                              <div className="text-sm text-slate-300 mb-3">{assessment.recommendation}</div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 bg-slate-950 rounded p-4">
                            <div>
                              <div className="text-xs text-slate-500 mb-1">Potential Damages</div>
                              <div className="text-lg font-semibold text-white">
                                ${(assessment.potential_damages / 1000).toFixed(0)}K
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-slate-500 mb-1">Defense Costs</div>
                              <div className="text-lg font-semibold text-white">
                                ${(assessment.defense_cost_estimate / 1000).toFixed(0)}K
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </Card>
                </TabsContent>

                {/* Indiana Benchmarks */}
                <TabsContent value="benchmarks" className="mt-6">
                  <Card className="bg-slate-900/50 border-slate-700 p-8">
                    <h2 className="text-2xl font-bold text-white mb-6">
                      Indiana Benchmark Rebate Analysis
                    </h2>

                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                      <Card className="bg-slate-800/50 border-slate-700 p-6">
                        <div className="text-sm text-slate-400 mb-2">Overall Score</div>
                        <div className="text-3xl font-bold text-white mb-1">
                          {Math.round(demoResults.indiana_benchmark_analysis.overall_score)}
                        </div>
                        <div className="text-xs text-slate-500">Percentile Rank</div>
                      </Card>

                      <Card className="bg-slate-800/50 border-slate-700 p-6">
                        <div className="text-sm text-slate-400 mb-2">Annual Impact</div>
                        <div className={`text-3xl font-bold mb-1 ${
                          demoResults.indiana_benchmark_analysis.total_annual_impact < 0 ? "text-red-400" : "text-green-400"
                        }`}>
                          {demoResults.indiana_benchmark_analysis.total_annual_impact < 0 ? "-" : "+"}$
                          {Math.abs(demoResults.indiana_benchmark_analysis.total_annual_impact / 1000).toFixed(0)}K
                        </div>
                        <div className="text-xs text-slate-500">vs Benchmark</div>
                      </Card>

                      <Card className="bg-slate-800/50 border-slate-700 p-6">
                        <div className="text-sm text-slate-400 mb-2">Below Benchmark</div>
                        <div className="text-3xl font-bold text-white mb-1">
                          {demoResults.indiana_benchmark_analysis.category_scores.filter((c: any) => c.gap < 0).length}
                        </div>
                        <div className="text-xs text-slate-500">Categories</div>
                      </Card>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white">Category Performance</h3>
                      {demoResults.indiana_benchmark_analysis.category_scores.map((cat: any, i: number) => (
                        <Card key={i} className="bg-slate-800/50 border-slate-700 p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h4 className="text-lg font-semibold text-white capitalize mb-1">
                                {cat.category} Medications
                              </h4>
                              <div className="flex items-center gap-2">
                                <Badge className={cat.gap >= 0 ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"}>
                                  {cat.gap >= 0 ? "✓" : "⚠"} {cat.gap.toFixed(1)}% Gap
                                </Badge>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-white">{cat.actual}%</div>
                              <div className="text-sm text-slate-400">vs {cat.benchmark}% benchmark</div>
                            </div>
                          </div>

                          <div className="bg-slate-950 rounded p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-slate-400">Annual Economic Impact</span>
                              <span className={`text-lg font-semibold ${cat.annual_impact < 0 ? "text-red-400" : "text-green-400"}`}>
                                {cat.annual_impact < 0 ? "-" : "+"}${Math.abs(cat.annual_impact / 1000).toFixed(0)}K/yr
                              </span>
                            </div>
                            <div className="w-full bg-slate-800 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${cat.gap >= 0 ? "bg-green-500" : "bg-red-500"}`}
                                style={{ width: `${Math.min(Math.abs(cat.gap) * 10, 100)}%` }}
                              />
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>

                    {demoResults.indiana_benchmark_analysis.recommendations.length > 0 && (
                      <div className="mt-8">
                        <h3 className="text-lg font-semibold text-white mb-4">Benchmark Recommendations</h3>
                        <div className="space-y-2">
                          {demoResults.indiana_benchmark_analysis.recommendations.map((rec: string, i: number) => (
                            <div
                              key={i}
                              className="flex items-start gap-3 bg-slate-800/50 border border-slate-700 rounded p-4"
                            >
                              <ArrowRight className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                              <p className="text-slate-300">{rec}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </Card>
                </TabsContent>

                {/* Negotiation Leverage */}
                <TabsContent value="leverage" className="mt-6">
                  <Card className="bg-slate-900/50 border-slate-700 p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h2 className="text-2xl font-bold text-white mb-2">
                          Negotiation Leverage Points
                        </h2>
                        <p className="text-slate-400">
                          Quantified ammunition for contract renegotiation
                        </p>
                      </div>
                      <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
                        <Target className="w-4 h-4 mr-2" />
                        Generate Negotiation Brief
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {demoResults.negotiation_leverage_points.map((point: string, i: number) => (
                        <Card
                          key={i}
                          className="bg-gradient-to-r from-purple-950/50 to-pink-950/50 border-purple-700/50 p-6"
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                              <span className="text-lg font-bold text-purple-400">{i + 1}</span>
                            </div>
                            <div className="flex-1">
                              <p className="text-white font-medium">{point}</p>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-purple-500/50 text-purple-300 hover:bg-purple-950/50"
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              Details
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>

                    <div className="mt-8 bg-gradient-to-r from-green-950/30 to-blue-950/30 border border-green-700/50 rounded-lg p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                          <DollarSign className="w-6 h-6 text-green-400" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-2">Total Recoverable Value</h3>
                          <div className="text-4xl font-bold text-green-400 mb-2">
                            $
                            {(
                              (demoResults.redline_analysis.total_economic_delta +
                                Math.abs(
                                  demoResults.indiana_benchmark_analysis.total_annual_impact < 0
                                    ? demoResults.indiana_benchmark_analysis.total_annual_impact
                                    : 0
                                )) /
                              1000000
                            ).toFixed(2)}
                            M
                          </div>
                          <p className="text-slate-300">Annual potential savings through contract renegotiation</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </section>
        )}

        {/* Features Section */}
        <section className="py-20 px-6 bg-slate-900/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">
                Enterprise-Grade Contract Intelligence
              </h2>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                Four integrated systems working together to transform contract analysis
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Redline Comparison Engine",
                  icon: FileText,
                  features: [
                    "Clause-by-clause semantic analysis",
                    "Economic impact quantification",
                    "Alignment scoring vs transparent models",
                    "Gap analysis with recommendations",
                  ],
                },
                {
                  title: "Litigation Risk Scoring",
                  icon: Scale,
                  features: [
                    "Fiduciary breach probability",
                    "Defense cost estimation",
                    "Precedent case analysis",
                    "Expected value calculations",
                  ],
                },
                {
                  title: "Indiana Benchmark Oracle",
                  icon: BarChart3,
                  features: [
                    "Regulatory rebate standards",
                    "Percentile ranking by category",
                    "Gap-to-benchmark analysis",
                    "Compliance validation",
                  ],
                },
                {
                  title: "Confidence-Weighted Extraction",
                  icon: Target,
                  features: [
                    "Multi-method extraction",
                    "Confidence scoring",
                    "Validation workflows",
                    "Source attribution",
                  ],
                },
              ].map((section, i) => (
                <Card key={i} className="bg-slate-900 border-slate-700 p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <section.icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{section.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {section.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <SiriusBFooter />
      </div>
    </>
  );
}