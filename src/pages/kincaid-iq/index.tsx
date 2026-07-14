import { useState } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Activity, TrendingDown, Shield, Target, AlertTriangle, Upload, 
  Calculator, TrendingUp, BarChart3, FileText, Download, CheckCircle2
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { DRAPAnalysisPanel } from "@/components/kincaid-iq/DRAPAnalysisPanel";
import { SpreadDistributionChart } from "@/components/kincaid-iq/SpreadDistributionChart";
import { ContractComplianceScorecard } from "@/components/kincaid-iq/ContractComplianceScorecard";
import { ActionableStrategies } from "@/components/kincaid-iq/ActionableStrategies";
import { CensusUploader } from "@/components/kincaid-iq/CensusUploader";
import { ClaimsUploader } from "@/components/kincaid-iq/ClaimsUploader";
import { TrendProjectionChart } from "@/components/kincaid-iq/TrendProjectionChart";
import { InterventionSimulator } from "@/components/kincaid-iq/InterventionSimulator";
import { EBITDACalculator } from "@/components/kincaid-iq/EBITDACalculator";
import { VolatilityDashboard } from "@/components/kincaid-iq/VolatilityDashboard";
import { MonteCarloFanChart } from "@/components/kincaid-iq/MonteCarloFanChart";
import { DurabilityAnalyzer } from "@/components/kincaid-iq/DurabilityAnalyzer";
import { TrendDecompositionPanel } from "@/components/kincaid-iq/TrendDecompositionPanel";
import { CredibilityDashboard } from "@/components/kincaid-iq/CredibilityDashboard";
import { RxClaimsUploader } from "@/components/kincaid-iq/RxClaimsUploader";
import Nav from "@/components/Nav";
import { analyzeRxClaims } from "@/lib/kincaid-iq/rxAnalysis";
import { generateMockRxClaims, getNADACPriceMap, MOCK_CONTRACT_TERMS } from "@/lib/kincaid-iq/nadacBenchmark";
import type { RxClaim, ExecutiveReport, ClaimsUpload, CensusUpload, TrendProjection } from "@/lib/kincaid-iq/types";
import { 
  calculatePEPM, 
  calculateAverageLives, 
  generateAdvancedTrendProjection,
  decomposeTrend,
  applyCredibilityWeighting 
} from "@/lib/kincaid-iq/actuarial";

export default function KincaidIQPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [censusData, setCensusData] = useState<CensusUpload | null>(null);
  const [claimsData, setClaimsData] = useState<ClaimsUpload | null>(null);
  const [rxClaims, setRxClaims] = useState<RxClaim[]>([]);
  const [rxReport, setRxReport] = useState<ExecutiveReport | null>(null);
  const [trendProjections, setTrendProjections] = useState<TrendProjection[]>([]);

  const runRxAnalysis = (claimsData: RxClaim[]) => {
    const nadacPrices = getNADACPriceMap();
    const revenue = 50000000;
    
    const executiveReport = analyzeRxClaims(
      claimsData,
      nadacPrices,
      MOCK_CONTRACT_TERMS,
      revenue
    );

    setRxReport(executiveReport);
  };

  const handleRunDemoRx = () => {
    const mockClaims = generateMockRxClaims(500);
    setRxClaims(mockClaims);
    
    setTimeout(() => {
      runRxAnalysis(mockClaims);
      setActiveTab("rx-analysis");
    }, 1000);
  };

  const handleCensusUpload = (data: CensusUpload) => {
    setCensusData(data);
  };

  const handleClaimsUpload = (data: ClaimsUpload) => {
    setClaimsData(data);
    
    if (censusData) {
      const avgLives = calculateAverageLives(censusData);
      const pepm = calculatePEPM(data, avgLives);
      const trendComponents = decomposeTrend(data);
      const credibility = applyCredibilityWeighting(0.08, 0.065, avgLives);
      
      const projections = generateAdvancedTrendProjection(
        pepm,
        avgLives,
        trendComponents,
        0.05,
        0.07,
        0.015,
        credibility.z_factor,
        3
      );
      
      setTrendProjections(projections);
    }
  };

  const handleRxClaimsUpload = (claims: RxClaim[]) => {
    setRxClaims(claims);
    runRxAnalysis(claims);
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
        <title>Kincaid Health - Advanced Actuarial Intelligence Platform</title>
        <meta
          name="description"
          content="PE-grade pharmacy benefit analysis. DRAP reconstruction, spread detection, credibility-weighted forecasting, and EBITDA impact quantification."
        />
      </Head>

      <Nav />

      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
        
        <main className="container mx-auto px-4 py-8 relative z-10">
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto text-center mb-12"
          >
            <Badge className="mb-4 bg-blue-500/10 text-blue-400 border-blue-500/20 text-sm">
              Fiduciary-Grade Intelligence
            </Badge>
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent"
            >
              Kincaid Health
            </motion.h1>
            <p className="text-2xl text-slate-300 mb-4 font-semibold">
              The Actuarial Intelligence Platform for Private Equity
            </p>
            <p className="text-lg text-slate-400 max-w-3xl mx-auto mb-8">
              Transform raw healthcare data into investment-grade intelligence. DRAP reconstruction, 
              credibility-weighted forecasting, Monte Carlo risk modeling, and EBITDA impact quantification 
              in one unified platform.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Button 
                onClick={handleRunDemoRx}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8"
              >
                <Activity className="w-5 h-5 mr-2" />
                Run Demo Analysis
              </Button>
              <Button 
                onClick={() => setActiveTab("upload")}
                size="lg"
                variant="outline"
                className="border-blue-500/30 hover:border-blue-500 hover:bg-blue-950/20"
              >
                <Upload className="w-5 h-5 mr-2" />
                Upload Your Data
              </Button>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                { value: "$3.6M", label: "Avg Annual Savings", color: "blue" },
                { value: "15", label: "Contract Provisions", color: "cyan" },
                { value: "98%", label: "Predictive Accuracy", color: "teal" },
                { value: "24hrs", label: "Time to Insights", color: "emerald" }
              ].map((metric, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  className="perspective-1000"
                >
                  <Card className="border-slate-700 bg-slate-900/50 backdrop-blur-sm transform-gpu transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20">
                    <CardContent className="pt-6 text-center">
                      <div className={`text-3xl font-bold text-${metric.color}-400 mb-1`}>{metric.value}</div>
                      <div className="text-xs text-slate-400">{metric.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Main Dashboard Tabs */}
          <div className="max-w-7xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 bg-slate-900/50 p-2">
                <TabsTrigger value="overview" className="text-xs">
                  <Target className="w-4 h-4 mr-1" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="upload" className="text-xs">
                  <Upload className="w-4 h-4 mr-1" />
                  Upload
                </TabsTrigger>
                <TabsTrigger value="rx-analysis" className="text-xs">
                  <Activity className="w-4 h-4 mr-1" />
                  Rx Analysis
                </TabsTrigger>
                <TabsTrigger value="trends" className="text-xs">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  Trends
                </TabsTrigger>
                <TabsTrigger value="simulator" className="text-xs">
                  <Calculator className="w-4 h-4 mr-1" />
                  Simulator
                </TabsTrigger>
                <TabsTrigger value="ebitda" className="text-xs">
                  <BarChart3 className="w-4 h-4 mr-1" />
                  EBITDA
                </TabsTrigger>
                <TabsTrigger value="risk" className="text-xs">
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  Risk
                </TabsTrigger>
                <TabsTrigger value="reports" className="text-xs">
                  <FileText className="w-4 h-4 mr-1" />
                  Reports
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <Card className="border-slate-700 bg-gradient-to-br from-slate-900 to-slate-950">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Shield className="h-6 w-6 text-blue-400" />
                      Platform Capabilities
                    </CardTitle>
                    <CardDescription>
                      Comprehensive actuarial intelligence for private equity portfolio companies
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <Activity className="w-5 h-5 text-blue-400" />
                          </div>
                          <div className="font-semibold text-slate-200">DRAP Reconstruction</div>
                        </div>
                        <p className="text-sm text-slate-400">
                          Delta Realized vs Allowable Pricing analysis. Quantify PBM spread, hidden margins, 
                          and contract violations with NADAC benchmarking.
                        </p>
                      </div>

                      <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                            <TrendingUp className="w-5 h-5 text-cyan-400" />
                          </div>
                          <div className="font-semibold text-slate-200">Credibility Weighting</div>
                        </div>
                        <p className="text-sm text-slate-400">
                          Limited Fluctuation credibility theory. Blend group-specific experience with 
                          industry benchmarks based on statistical confidence.
                        </p>
                      </div>

                      <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 rounded-lg bg-teal-500/10 border border-teal-500/20">
                            <Calculator className="w-5 h-5 text-teal-400" />
                          </div>
                          <div className="font-semibold text-slate-200">Monte Carlo Simulation</div>
                        </div>
                        <p className="text-sm text-slate-400">
                          10,000-iteration risk modeling with volatility bands. Quantify downside exposure 
                          and upside opportunity ranges.
                        </p>
                      </div>

                      <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                            <BarChart3 className="w-5 h-5 text-emerald-400" />
                          </div>
                          <div className="font-semibold text-slate-200">EBITDA Impact</div>
                        </div>
                        <p className="text-sm text-slate-400">
                          Every finding quantified in basis points. Direct translation from healthcare 
                          savings to EBITDA improvement.
                        </p>
                      </div>

                      <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <TrendingDown className="w-5 h-5 text-purple-400" />
                          </div>
                          <div className="font-semibold text-slate-200">Trend Decomposition</div>
                        </div>
                        <p className="text-sm text-slate-400">
                          Separate medical, Rx, and catastrophic components. Model intervention 
                          impact on each independently.
                        </p>
                      </div>

                      <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/20">
                            <AlertTriangle className="w-5 h-5 text-orange-400" />
                          </div>
                          <div className="font-semibold text-slate-200">Durability Analysis</div>
                        </div>
                        <p className="text-sm text-slate-400">
                          Model savings persistence over 3-year horizon. Factor decay rates and 
                          intervention sustainability.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-slate-700 bg-slate-900/50">
                    <CardHeader>
                      <CardTitle className="text-lg">Methodology</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm text-slate-400">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                        <div>
                          <div className="font-medium text-slate-300">Credibility Theory</div>
                          <div className="text-xs">Z = min(1, √(n/N)) limited fluctuation method</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                        <div>
                          <div className="font-medium text-slate-300">NADAC Benchmarking</div>
                          <div className="text-xs">National Average Drug Acquisition Cost + reasonable markup</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                        <div>
                          <div className="font-medium text-slate-300">Rebate Reconstruction</div>
                          <div className="text-xs">Class-level inference for manufacturer rebate estimation</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                        <div>
                          <div className="font-medium text-slate-300">Contract Compliance</div>
                          <div className="text-xs">Performance guarantees tested against contractual terms</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-700 bg-slate-900/50">
                    <CardHeader>
                      <CardTitle className="text-lg">Typical Findings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm text-slate-400">
                      <div className="flex items-start gap-2">
                        <div className="w-20 shrink-0 text-right font-mono text-red-400">$1.2M</div>
                        <div>Spread pricing on generic fills (12-18% excess markup)</div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-20 shrink-0 text-right font-mono text-red-400">$890K</div>
                        <div>Hidden rebate retention (rebate passthrough violations)</div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-20 shrink-0 text-right font-mono text-red-400">$620K</div>
                        <div>Specialty drug channel steering (non-preferred pharmacy)</div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-20 shrink-0 text-right font-mono text-red-400">$540K</div>
                        <div>MAC pricing manipulation (above NADAC + contractual markup)</div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-20 shrink-0 text-right font-mono text-red-400">$380K</div>
                        <div>Generic substitution failures (brand dispensed when generic available)</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Upload Tab */}
              <TabsContent value="upload" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <CensusUploader onUploadComplete={handleCensusUpload} />
                  <ClaimsUploader onUploadComplete={handleClaimsUpload} />
                </div>
                <RxClaimsUploader onUploadComplete={handleRxClaimsUpload} />
              </TabsContent>

              {/* Rx Analysis Tab */}
              <TabsContent value="rx-analysis" className="space-y-6">
                {!rxReport ? (
                  <Card className="border-slate-700 bg-slate-900/50">
                    <CardContent className="pt-6 text-center space-y-4">
                      <Activity className="w-16 h-16 text-blue-400 mx-auto opacity-50" />
                      <div>
                        <p className="text-slate-300 mb-2">No Rx claims analysis available</p>
                        <p className="text-sm text-slate-500">
                          Upload Rx claims data or run the demo analysis to see results
                        </p>
                      </div>
                      <Button onClick={handleRunDemoRx} className="bg-blue-600 hover:bg-blue-700">
                        Run Demo Analysis
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-6">
                    <Alert className="border-blue-500/30 bg-blue-950/20">
                      <Activity className="h-4 w-4 text-blue-400" />
                      <AlertDescription className="text-blue-300">
                        Analysis complete on {rxClaims.length} claims. DRAP: {formatCurrency(rxReport.executive_summary.total_drap)} 
                        ({rxReport.executive_summary.drap_percent.toFixed(1)}% of spend). 
                        Compliance Score: {rxReport.executive_summary.compliance_score.toFixed(0)}%
                      </AlertDescription>
                    </Alert>

                    <DRAPAnalysisPanel report={rxReport} />
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <SpreadDistributionChart report={rxReport} />
                      <ContractComplianceScorecard report={rxReport} />
                    </div>

                    <ActionableStrategies report={rxReport} />
                  </div>
                )}
              </TabsContent>

              {/* Trends Tab */}
              <TabsContent value="trends" className="space-y-6">
                {censusData && claimsData ? (
                  <>
                    <TrendProjectionChart 
                      projections={trendProjections}
                      censusData={censusData}
                      claimsData={claimsData}
                    />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <TrendDecompositionPanel claimsData={claimsData} />
                      <CredibilityDashboard 
                        censusData={censusData}
                        baselineTrend={0.08}
                        benchmarkTrend={0.065}
                      />
                    </div>
                    <MonteCarloFanChart 
                      baselineTrend={0.08}
                      volatility={0.03}
                      years={3}
                    />
                  </>
                ) : (
                  <Card className="border-slate-700 bg-slate-900/50">
                    <CardContent className="pt-6 text-center space-y-4">
                      <TrendingUp className="w-16 h-16 text-cyan-400 mx-auto opacity-50" />
                      <div>
                        <p className="text-slate-300 mb-2">Upload data to view trend analysis</p>
                        <p className="text-sm text-slate-500">
                          Census and claims data required for credibility-weighted projections
                        </p>
                      </div>
                      <Button onClick={() => setActiveTab("upload")} variant="outline">
                        Go to Upload
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Simulator Tab */}
              <TabsContent value="simulator" className="space-y-6">
                {censusData && claimsData ? (
                  <>
                    <InterventionSimulator 
                      censusData={censusData}
                      claimsData={claimsData}
                    />
                    <DurabilityAnalyzer />
                  </>
                ) : (
                  <Card className="border-slate-700 bg-slate-900/50">
                    <CardContent className="pt-6 text-center space-y-4">
                      <Calculator className="w-16 h-16 text-teal-400 mx-auto opacity-50" />
                      <div>
                        <p className="text-slate-300 mb-2">Upload data to run intervention simulations</p>
                        <p className="text-sm text-slate-500">
                          Census and claims data required for scenario modeling
                        </p>
                      </div>
                      <Button onClick={() => setActiveTab("upload")} variant="outline">
                        Go to Upload
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* EBITDA Tab */}
              <TabsContent value="ebitda" className="space-y-6">
                {censusData && claimsData ? (
                  <EBITDACalculator 
                    censusData={censusData}
                    claimsData={claimsData}
                  />
                ) : (
                  <Card className="border-slate-700 bg-slate-900/50">
                    <CardContent className="pt-6 text-center space-y-4">
                      <BarChart3 className="w-16 h-16 text-emerald-400 mx-auto opacity-50" />
                      <div>
                        <p className="text-slate-300 mb-2">Upload data to calculate EBITDA impact</p>
                        <p className="text-sm text-slate-500">
                          Census and claims data required for financial modeling
                        </p>
                      </div>
                      <Button onClick={() => setActiveTab("upload")} variant="outline">
                        Go to Upload
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Risk Tab */}
              <TabsContent value="risk" className="space-y-6">
                {censusData && claimsData ? (
                  <VolatilityDashboard 
                    censusData={censusData}
                    claimsData={claimsData}
                  />
                ) : (
                  <Card className="border-slate-700 bg-slate-900/50">
                    <CardContent className="pt-6 text-center space-y-4">
                      <AlertTriangle className="w-16 h-16 text-orange-400 mx-auto opacity-50" />
                      <div>
                        <p className="text-slate-300 mb-2">Upload data to view risk analysis</p>
                        <p className="text-sm text-slate-500">
                          Census and claims data required for volatility modeling
                        </p>
                      </div>
                      <Button onClick={() => setActiveTab("upload")} variant="outline">
                        Go to Upload
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Reports Tab */}
              <TabsContent value="reports" className="space-y-6">
                <Card className="border-slate-700 bg-slate-900/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-400" />
                      Export Reports
                    </CardTitle>
                    <CardDescription>
                      Generate board-ready reports and presentations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button variant="outline" className="justify-start h-auto p-4">
                        <div className="flex items-center gap-3 w-full">
                          <Download className="w-5 h-5 text-blue-400" />
                          <div className="text-left">
                            <div className="font-semibold text-slate-200">Executive Summary</div>
                            <div className="text-xs text-slate-500">2-page investment committee brief</div>
                          </div>
                        </div>
                      </Button>

                      <Button variant="outline" className="justify-start h-auto p-4">
                        <div className="flex items-center gap-3 w-full">
                          <Download className="w-5 h-5 text-cyan-400" />
                          <div className="text-left">
                            <div className="font-semibold text-slate-200">Full Analysis</div>
                            <div className="text-xs text-slate-500">Complete technical report with appendices</div>
                          </div>
                        </div>
                      </Button>

                      <Button variant="outline" className="justify-start h-auto p-4">
                        <div className="flex items-center gap-3 w-full">
                          <Download className="w-5 h-5 text-teal-400" />
                          <div className="text-left">
                            <div className="font-semibold text-slate-200">Board Deck</div>
                            <div className="text-xs text-slate-500">PowerPoint presentation with key findings</div>
                          </div>
                        </div>
                      </Button>

                      <Button variant="outline" className="justify-start h-auto p-4">
                        <div className="flex items-center gap-3 w-full">
                          <Download className="w-5 h-5 text-emerald-400" />
                          <div className="text-left">
                            <div className="font-semibold text-slate-200">Data Export</div>
                            <div className="text-xs text-slate-500">Raw data and calculations (CSV/Excel)</div>
                          </div>
                        </div>
                      </Button>
                    </div>

                    <Alert className="border-blue-500/30 bg-blue-950/20">
                      <FileText className="h-4 w-4 text-blue-400" />
                      <AlertDescription className="text-blue-300 text-sm">
                        All reports include audit trail, methodology notes, and source references for 
                        fiduciary compliance documentation.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </>
  );
}