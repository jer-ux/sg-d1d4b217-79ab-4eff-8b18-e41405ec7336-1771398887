import { useState } from "react";
import Head from "next/head";
import { Activity, TrendingDown, Shield, Target, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RxClaimsUploader } from "@/components/kincaid-iq/RxClaimsUploader";
import { DRAPAnalysisPanel } from "@/components/kincaid-iq/DRAPAnalysisPanel";
import { SpreadDistributionChart } from "@/components/kincaid-iq/SpreadDistributionChart";
import { ContractComplianceScorecard } from "@/components/kincaid-iq/ContractComplianceScorecard";
import { ActionableStrategies } from "@/components/kincaid-iq/ActionableStrategies";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { analyzeRxClaims } from "@/lib/kincaid-iq/rxAnalysis";
import { generateMockRxClaims, getNADACPriceMap, MOCK_CONTRACT_TERMS } from "@/lib/kincaid-iq/nadacBenchmark";
import type { RxClaim, ExecutiveReport } from "@/lib/kincaid-iq/types";

export default function KincaidIQPage() {
  const [claims, setClaims] = useState<RxClaim[]>([]);
  const [report, setReport] = useState<ExecutiveReport | null>(null);
  const [analysisMode, setAnalysisMode] = useState<"upload" | "demo" | "complete">("upload");

  const handleClaimsProcessed = (processedClaims: RxClaim[]) => {
    setClaims(processedClaims);
    runAnalysis(processedClaims);
  };

  const handleUseMockData = () => {
    const mockClaims = generateMockRxClaims(500);
    setClaims(mockClaims);
    setAnalysisMode("demo");
    runAnalysis(mockClaims);
  };

  const runAnalysis = (claimsData: RxClaim[]) => {
    const nadacPrices = getNADACPriceMap();
    const revenue = 50000000; // $50M revenue for demo
    
    const executiveReport = analyzeRxClaims(
      claimsData,
      nadacPrices,
      MOCK_CONTRACT_TERMS,
      revenue
    );

    setReport(executiveReport);
    setAnalysisMode("complete");
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <>
      <Head>
        <title>Kincaid IQ - Fiduciary-Grade Rx Claims Intelligence | SiriusB iQ</title>
        <meta
          name="description"
          content="PE-grade pharmacy benefit analysis. DRAP reconstruction, spread detection, contract compliance scoring, and EBITDA impact quantification."
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <SiteHeader />

        <main className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-12">
            <Badge className="mb-4 bg-blue-500/10 text-blue-400 border-blue-500/20">
              Fiduciary-Grade Rx Intelligence
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Kincaid IQ
            </h1>
            <p className="text-xl text-slate-300 mb-2">
              PE War Room: DRAP Reconstruction & PBM Forensics
            </p>
            <p className="text-sm text-slate-500 max-w-2xl mx-auto">
              Transform pharmacy claims into investment-grade intelligence. Quantify EBITDA leakage,
              expose spread pricing, reconstruct hidden rebates, and score contract compliance.
            </p>
          </div>

          {/* Analysis Flow */}
          {analysisMode === "upload" && (
            <div className="max-w-3xl mx-auto">
              <RxClaimsUploader
                onClaimsProcessed={handleClaimsProcessed}
                onUseMockData={handleUseMockData}
              />

              {/* Methodology Card */}
              <Card className="mt-8 border-slate-700 bg-slate-900/50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Activity className="h-5 w-5 text-blue-400" />
                    Analysis Methodology
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                      <div className="font-medium text-slate-300 mb-1">1. DRAP Calculation</div>
                      <div className="text-xs text-slate-400">
                        Delta Realized vs Allowable Pricing = Σ(Paid - NADAC Benchmark)
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                      <div className="font-medium text-slate-300 mb-1">2. Spread Detection</div>
                      <div className="text-xs text-slate-400">
                        Identify systematic excess markup by pharmacy and NDC
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                      <div className="font-medium text-slate-300 mb-1">3. Rebate Reconstruction</div>
                      <div className="text-xs text-slate-400">
                        Estimate manufacturer rebates using class-level inference
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                      <div className="font-medium text-slate-300 mb-1">4. Compliance Scoring</div>
                      <div className="text-xs text-slate-400">
                        Test PBM performance against contractual guarantees
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-blue-950/20 border border-blue-500/30 mt-4">
                    <div className="text-xs text-blue-300">
                      <span className="font-medium">Fiduciary Perspective:</span> All analysis
                      defaults to plan sponsor best interest. Missing data is treated as a signal,
                      not a limitation. Every finding is quantified in dollars and EBITDA impact.
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {analysisMode === "demo" && (
            <div className="max-w-3xl mx-auto">
              <Alert className="border-yellow-500/30 bg-yellow-950/20">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                <AlertDescription className="text-yellow-400">
                  Running analysis on {claims.length} demo claims with intentional spread patterns.
                  Processing DRAP calculation, rebate reconstruction, and compliance scoring...
                </AlertDescription>
              </Alert>
            </div>
          )}

          {analysisMode === "complete" && report && (
            <div className="space-y-8">
              {/* Executive Summary */}
              <div className="max-w-7xl mx-auto">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-200">
                        War Room Executive Briefing
                      </h2>
                      <p className="text-sm text-slate-400 mt-1">
                        Investment Committee Analysis · {claims.length} Claims · {" "}
                        {report.metadata.date_range.start} to {report.metadata.date_range.end}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        report.executive_summary.compliance_score >= 80
                          ? "bg-green-500/10 text-green-400 border-green-500/20"
                          : report.executive_summary.compliance_score >= 60
                          ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                          : "bg-red-500/10 text-red-400 border-red-500/20"
                      }
                    >
                      Compliance: {report.executive_summary.compliance_score.toFixed(0)}%
                    </Badge>
                  </div>

                  {/* Top 3 Drivers */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {report.executive_summary.top_drivers.map((driver, idx) => (
                      <Card key={idx} className="border-red-500/20 bg-gradient-to-br from-red-950/10 to-slate-900">
                        <CardHeader className="pb-3">
                          <CardDescription className="text-xs text-slate-400">
                            Driver #{idx + 1}
                          </CardDescription>
                          <CardTitle className="text-sm text-slate-300">
                            {driver.description}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-red-400">
                            {formatCurrency(driver.impact_dollars)}
                          </div>
                          <div className="text-xs text-slate-500 mt-1">
                            {driver.impact_ebitda_bps.toFixed(0)} bps EBITDA impact
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              {/* DRAP Analysis */}
              <div className="max-w-7xl mx-auto">
                <DRAPAnalysisPanel report={report} />
              </div>

              {/* Two Column Layout */}
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column: Spread Distribution */}
                <SpreadDistributionChart report={report} />

                {/* Right Column: Contract Compliance */}
                <ContractComplianceScorecard report={report} />
              </div>

              {/* Actionable Strategies */}
              <div className="max-w-7xl mx-auto">
                <ActionableStrategies report={report} />
              </div>

              {/* Reset Analysis */}
              <div className="max-w-7xl mx-auto flex justify-center pt-8">
                <Button
                  onClick={() => {
                    setClaims([]);
                    setReport(null);
                    setAnalysisMode("upload");
                  }}
                  variant="outline"
                  className="border-blue-500/30 hover:border-blue-500 hover:bg-blue-950/20"
                >
                  Analyze New Claims
                </Button>
              </div>

              {/* Analysis Metadata */}
              <div className="max-w-7xl mx-auto">
                <Card className="border-slate-700 bg-slate-900/30">
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-slate-400">
                      <div>
                        <div className="font-medium text-slate-300 mb-1">Analysis Date</div>
                        <div>{new Date(report.metadata.analysis_date).toLocaleDateString()}</div>
                      </div>
                      <div>
                        <div className="font-medium text-slate-300 mb-1">Claims Analyzed</div>
                        <div>{report.metadata.claims_analyzed.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="font-medium text-slate-300 mb-1">Date Range</div>
                        <div>
                          {report.metadata.date_range.start} - {report.metadata.date_range.end}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium text-slate-300 mb-1">Confidence Level</div>
                        <div className="capitalize">{report.metadata.confidence_level}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Explainer Section (always visible at bottom) */}
          <div className="max-w-4xl mx-auto mt-16 pt-8 border-t border-slate-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-slate-700 bg-slate-900/50">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <TrendingDown className="h-4 w-4 text-red-400" />
                    What is DRAP?
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-slate-400 space-y-2">
                  <p>
                    <span className="font-medium text-slate-300">Delta Realized vs Allowable Pricing</span>{" "}
                    = Total plan spend minus fiduciary-compliant benchmark price (NADAC + reasonable markup).
                  </p>
                  <p>
                    This is the EBITDA leakage caused by PBM spread pricing, hidden margins, and contract violations.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-slate-700 bg-slate-900/50">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Shield className="h-4 w-4 text-blue-400" />
                    Why Fiduciary-Grade?
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-slate-400 space-y-2">
                  <p>
                    <span className="font-medium text-slate-300">ERISA fiduciary duty</span> requires
                    plan sponsors to act in participants' best interest and monitor service provider costs.
                  </p>
                  <p>
                    This analysis reconstructs true net cost and flags contractual violations that create legal exposure.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-slate-700 bg-slate-900/50">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Activity className="h-4 w-4 text-purple-400" />
                    Rebate Reconstruction
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-slate-400 space-y-2">
                  <p>
                    Manufacturer rebates are rarely fully disclosed. We use <span className="font-medium text-slate-300">
                    class-level inference</span> to estimate hidden rebates.
                  </p>
                  <p>
                    Diabetes: 45%, Specialty: 25%, Brand: 35% (industry benchmarks).
                  </p>
                </CardContent>
              </Card>

              <Card className="border-slate-700 bg-slate-900/50">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Target className="h-4 w-4 text-green-400" />
                    Actionable Output
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-slate-400 space-y-2">
                  <p>
                    Every finding is quantified in <span className="font-medium text-slate-300">
                    recoverable dollars and EBITDA impact</span> (basis points).
                  </p>
                  <p>
                    Immediate recovery opportunities, contract leverage points, and structural recommendations.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        <SiteFooter />
      </div>
    </>
  );
}