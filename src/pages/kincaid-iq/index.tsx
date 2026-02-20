import Head from "next/head";
import { useState } from "react";
import { SiriusBNav } from "@/components/siriusb/SiriusBNav";
import { SiriusBFooter } from "@/components/siriusb/SiriusBFooter";
import { 
  Calculator, 
  TrendingDown, 
  Sparkles, 
  FileSpreadsheet, 
  DollarSign, 
  Target, 
  Activity, 
  Shield, 
  TrendingUp,
  Zap,
  BarChart3,
  LineChart,
  PieChart,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Users,
  Building2,
  ArrowUpRight,
  ArrowDownRight,
  Settings,
  Download,
  Share2,
  PlayCircle
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CensusUploader } from "@/components/kincaid-iq/CensusUploader";
import { ClaimsUploader } from "@/components/kincaid-iq/ClaimsUploader";
import { TrendProjectionChart } from "@/components/kincaid-iq/TrendProjectionChart";
import { InterventionSimulator } from "@/components/kincaid-iq/InterventionSimulator";
import { EBITDACalculator } from "@/components/kincaid-iq/EBITDACalculator";
import { CredibilityDashboard } from "@/components/kincaid-iq/CredibilityDashboard";
import { TrendDecompositionPanel } from "@/components/kincaid-iq/TrendDecompositionPanel";
import { DurabilityAnalyzer } from "@/components/kincaid-iq/DurabilityAnalyzer";
import { BrokerCompAnalysis } from "@/components/kincaid-iq/BrokerCompAnalysis";
import { FAQ } from "@/components/kincaid-iq/FAQ";
import { WarRoomPreview } from "@/components/kincaid-iq/WarRoomPreview";
import { MonteCarloFanChart } from "@/components/kincaid-iq/MonteCarloFanChart";
import { VolatilityDashboard } from "@/components/kincaid-iq/VolatilityDashboard";
import {
  calculatePEPM,
  calculateAverageLives,
  projectTrend,
  calculateEBITDAImpact,
  calculateSavingsDurability,
  applyCredibilityWeighting,
  decomposeTrend,
  generateAdvancedTrendProjection,
} from "@/lib/kincaid-iq/actuarial";
import {
  estimateVolatilityProfile,
  runMonteCarloSimulation,
  runMultiYearMonteCarlo,
  compareScenarioUncertainty,
} from "@/lib/kincaid-iq/monteCarlo";
import type { CensusUpload, ClaimsUpload, Intervention, TrendProjection } from "@/lib/kincaid-iq/types";

export default function KincaidIQPage() {
  const [step, setStep] = useState(1);
  const [census, setCensus] = useState<CensusUpload | null>(null);
  const [claims, setClaims] = useState<ClaimsUpload | null>(null);
  const [interventions, setInterventions] = useState<Intervention[]>([]);
  const [totalSavings, setTotalSavings] = useState(0);
  const [revenue, setRevenue] = useState<number>(50000000);
  const [activeScenario, setActiveScenario] = useState<"baseline" | "modeled" | "aggressive">("baseline");

  // Demo data for immediate showcase
  const demoMode = !census || !claims;
  const demoCensus: CensusUpload = {
    id: "demo-1",
    org_id: "demo",
    employee_count_start: 450,
    employee_count_end: 480,
    avg_salary: 75000,
    timestamp: new Date().toISOString(),
  };

  const demoClaims: ClaimsUpload = {
    id: "demo-1",
    org_id: "demo",
    medical_total: 3200000,
    rx_total: 1100000,
    stop_loss_premium: 180000,
    admin_fees: 95000,
    period_start: "2024-01-01",
    period_end: "2024-12-31",
    large_claims_over_100k: 450000,
    specialty_rx_total: 320000,
  };

  const activeCensus = census || demoCensus;
  const activeClaims = claims || demoClaims;

  // Calculate core metrics
  const avgLives = calculateAverageLives(activeCensus);
  const currentPEPM = calculatePEPM(activeClaims, avgLives);
  const baselineTrend = 0.082;
  const modeledTrend = interventions.length > 0 ? 0.045 : baselineTrend;
  const aggressiveTrend = 0.028;

  // Credibility analysis
  const industryBenchmark = 0.085;
  const groupTrend = 0.079;
  const credibilityWeights = applyCredibilityWeighting(groupTrend, industryBenchmark, avgLives);

  // Trend decomposition
  const trendComponents = decomposeTrend(activeClaims);

  // Multi-year projections
  const baseCost = currentPEPM * avgLives * 12;
  
  const baselineProjections = generateAdvancedTrendProjection(
    currentPEPM,
    avgLives,
    trendComponents,
    0,
    0,
    0,
    credibilityWeights.z_factor,
    3
  );

  const modeledProjections = generateAdvancedTrendProjection(
    currentPEPM,
    avgLives,
    trendComponents,
    modeledTrend * 0.35,
    modeledTrend * 0.45,
    0.015,
    credibilityWeights.z_factor,
    3
  );

  const aggressiveProjections = generateAdvancedTrendProjection(
    currentPEPM,
    avgLives,
    trendComponents,
    aggressiveTrend * 0.40,
    aggressiveTrend * 0.50,
    0.025,
    credibilityWeights.z_factor,
    3
  );

  // Savings durability
  const durability = interventions.length > 0 
    ? calculateSavingsDurability(interventions, modeledProjections[1]?.savings || 0)
    : null;

  // Mock broker compensation data
  const brokerCompData = [
    { year: 2022, commission: 425000, premium_total: 4950000, lives: 485, total_commission: 425000, indirect_comp: 0 },
    { year: 2023, commission: 445000, premium_total: 5150000, lives: 488, total_commission: 445000, indirect_comp: 0 },
    { year: 2024, commission: 475000, premium_total: 5350000, lives: 490, total_commission: 475000, indirect_comp: 0 },
  ];

  // Monte Carlo Volatility Analysis
  const volatilityProfile = estimateVolatilityProfile(
    [activeCensus.employee_count_start, activeCensus.employee_count_end],
    [activeCensus.employee_count_start, activeCensus.employee_count_end]
  );

  const baselineMC = runMonteCarloSimulation(
    baseCost,
    baselineTrend,
    volatilityProfile.base_volatility,
    5000
  );

  const modeledMC = runMonteCarloSimulation(
    baseCost,
    modeledTrend,
    volatilityProfile.base_volatility * 0.7,
    5000
  );

  const fanChartData = runMultiYearMonteCarlo(
    baseCost,
    baselineTrend,
    volatilityProfile,
    5,
    5000
  );

  const scenarioComparison = compareScenarioUncertainty(baselineMC, modeledMC);

  const handleCensusUpload = (data: CensusUpload) => {
    setCensus(data);
    setStep(2);
  };

  const handleClaimsUpload = (data: ClaimsUpload) => {
    setClaims(data);
    setStep(3);
  };

  const handleInterventionsChange = (newInterventions: Intervention[], savings: number) => {
    setInterventions(newInterventions);
    setTotalSavings(savings);
  };

  // Calculate scenario comparison metrics
  const year3BaselineCost = baselineProjections[2]?.baseline_cost || 0;
  const year3ModeledCost = modeledProjections[2]?.modeled_cost || 0;
  const year3AggressiveCost = aggressiveProjections[2]?.modeled_cost || 0;
  const cumulativeModeledSavings = modeledProjections[2]?.cumulative_savings || 0;
  const cumulativeAggressiveSavings = aggressiveProjections[2]?.cumulative_savings || 0;

  return (
    <>
      <Head>
        <title>Kincaid IQ – Live Trend & Cost Compression Engine | SiriusB iQ</title>
        <meta name="description" content="Real-time actuarial modeling platform for healthcare cost forecasting and trend compression" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <SiriusBNav />

        {/* Enhanced Hero Section */}
        <section className="relative overflow-hidden border-b border-slate-800 px-4 py-24">
          {/* Animated Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-amber-950/20 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-900/10 via-transparent to-transparent" />
            <div className="absolute right-0 top-0 h-96 w-96 animate-pulse rounded-full bg-amber-500/5 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-96 w-96 animate-pulse rounded-full bg-blue-500/5 blur-3xl" style={{ animationDelay: "1s" }} />
          </div>
          
          <div className="relative mx-auto max-w-7xl">
            {/* Header with Status Indicators */}
            <div className="mb-8 flex flex-wrap items-center gap-4">
              <div className="rounded-lg bg-amber-500/10 p-3 shadow-lg shadow-amber-500/10">
                <Calculator className="h-8 w-8 text-amber-400" />
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge className="border-amber-500/50 bg-amber-950/30 text-amber-400">
                  <Zap className="mr-1 h-3 w-3" />
                  Live Analysis
                </Badge>
                <Badge className="border-blue-500/50 bg-blue-950/30 text-blue-400">
                  <Activity className="mr-1 h-3 w-3" />
                  Real-time Modeling
                </Badge>
                <Badge className="border-emerald-500/50 bg-emerald-950/30 text-emerald-400">
                  <CheckCircle2 className="mr-1 h-3 w-3" />
                  Actuarial-Grade
                </Badge>
              </div>
            </div>

            {/* Main Headline */}
            <div className="mb-6">
              <h1 className="mb-3 text-6xl font-bold text-white lg:text-7xl">
                Kincaid <span className="text-amber-400">IQ</span>
              </h1>
              <div className="flex items-center gap-3">
                <div className="h-1 w-12 rounded-full bg-gradient-to-r from-amber-400 to-amber-600" />
                <p className="text-3xl font-semibold text-amber-400">
                  Live Trend & Cost Compression Engine
                </p>
              </div>
            </div>

            {/* Value Proposition */}
            <p className="mb-8 max-w-4xl text-xl leading-relaxed text-slate-300">
              Real-time credibility-weighted actuarial forecasting platform. Model healthcare trend 
              compression scenarios with decomposed medical, Rx, and catastrophic components. 
              Purpose-built for mid-market to large employers (500-10,000 lives) demanding 
              board-grade precision.
            </p>

            {/* Key Metrics Dashboard */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="border-slate-700 bg-gradient-to-br from-slate-900 to-slate-800 p-6 shadow-xl">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-400">Current PEPM</p>
                  <DollarSign className="h-5 w-5 text-amber-400" />
                </div>
                <p className="text-3xl font-bold text-white">
                  ${currentPEPM.toFixed(2)}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <Badge variant="outline" className="border-amber-500/50 text-amber-400">
                    Live
                  </Badge>
                  <span className="text-xs text-slate-500">Per Employee Per Month</span>
                </div>
              </Card>

              <Card className="border-slate-700 bg-gradient-to-br from-slate-900 to-slate-800 p-6 shadow-xl">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-400">Credibility Factor</p>
                  <Target className="h-5 w-5 text-blue-400" />
                </div>
                <p className="text-3xl font-bold text-blue-400">
                  {(credibilityWeights.z_factor * 100).toFixed(0)}%
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <Badge variant="outline" className="border-blue-500/50 text-blue-400">
                    Z-Factor
                  </Badge>
                  <span className="text-xs text-slate-500">Statistical Confidence</span>
                </div>
              </Card>

              <Card className="border-slate-700 bg-gradient-to-br from-slate-900 to-slate-800 p-6 shadow-xl">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-400">Covered Lives</p>
                  <Users className="h-5 w-5 text-emerald-400" />
                </div>
                <p className="text-3xl font-bold text-emerald-400">
                  {Math.round(avgLives).toLocaleString()}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <Badge variant="outline" className="border-emerald-500/50 text-emerald-400">
                    Active
                  </Badge>
                  <span className="text-xs text-slate-500">Average Population</span>
                </div>
              </Card>

              <Card className="border-slate-700 bg-gradient-to-br from-slate-900 to-slate-800 p-6 shadow-xl">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-400">Annual Cost</p>
                  <Building2 className="h-5 w-5 text-purple-400" />
                </div>
                <p className="text-3xl font-bold text-purple-400">
                  ${(baseCost / 1000000).toFixed(2)}M
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <Badge variant="outline" className="border-purple-500/50 text-purple-400">
                    Total
                  </Badge>
                  <span className="text-xs text-slate-500">Current Run Rate</span>
                </div>
              </Card>
            </div>

            {/* Demo Mode Alert */}
            {demoMode && (
              <div className="mt-6 rounded-lg border border-blue-500/30 bg-gradient-to-r from-blue-950/30 to-blue-900/20 p-5 shadow-lg">
                <div className="flex items-start gap-3">
                  <PlayCircle className="mt-1 h-5 w-5 text-blue-400" />
                  <div>
                    <p className="font-semibold text-blue-300">Interactive Demo Mode</p>
                    <p className="mt-1 text-sm text-blue-400">
                      Viewing live calculations with sample data. Upload your census and claims files to model your specific scenario with real-time actuarial precision.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Action CTAs */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30 hover:from-amber-600 hover:to-amber-700"
                onClick={() => setStep(1)}
              >
                <Calculator className="mr-2 h-5 w-5" />
                Start Live Analysis
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-slate-600 bg-slate-900/50 text-white hover:bg-slate-800"
              >
                <LineChart className="mr-2 h-5 w-5" />
                View Sample Report
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-slate-600 bg-slate-900/50 text-white hover:bg-slate-800"
              >
                <FileSpreadsheet className="mr-2 h-5 w-5" />
                Download Template
              </Button>
            </div>
          </div>
        </section>

        {/* WHY KINCAID IQ - Problem/Solution Section */}
        <section className="border-b border-slate-800 bg-gradient-to-br from-slate-900 via-red-950/10 to-slate-900 px-4 py-20">
          <div className="mx-auto max-w-7xl">
            {/* Section Header */}
            <div className="mb-12 text-center">
              <Badge className="mb-4 border-red-500/50 bg-red-950/30 text-red-400">
                <AlertTriangle className="mr-2 h-4 w-4" />
                The Hidden Crisis
              </Badge>
              <h2 className="mb-4 text-4xl font-bold text-white lg:text-5xl">
                Your Healthcare Costs Are <span className="text-red-400">Spiraling Out of Control</span>
              </h2>
              <p className="mx-auto max-w-3xl text-xl text-slate-300">
                Without real-time actuarial intelligence, you're flying blind while healthcare trend 
                erodes 5-8% of your EBITDA annually. Here's what's actually happening:
              </p>
            </div>

            {/* Pain Points Grid */}
            <div className="mb-12 grid gap-6 lg:grid-cols-3">
              <Card className="border-red-500/30 bg-gradient-to-br from-red-950/20 to-slate-900 p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div className="rounded-lg bg-red-500/10 p-3">
                    <TrendingUp className="h-8 w-8 text-red-400" />
                  </div>
                  <Badge variant="outline" className="border-red-500/50 text-red-400">
                    8.2% Trend
                  </Badge>
                </div>
                <h3 className="mb-3 text-xl font-bold text-white">
                  Uncontrolled Medical Inflation
                </h3>
                <p className="mb-4 text-slate-300">
                  Industry baseline medical trend is 8.2%. For a $5M annual spend, that's <strong className="text-red-400">$410K in year one</strong>, 
                  compounding to <strong className="text-red-400">$1.3M over 3 years</strong>.
                </p>
                <div className="rounded-lg border border-red-500/20 bg-red-950/20 p-3">
                  <p className="text-sm text-red-300">
                    <strong>Without intervention:</strong> 3-year cost increase of $1.3M
                  </p>
                </div>
              </Card>

              <Card className="border-amber-500/30 bg-gradient-to-br from-amber-950/20 to-slate-900 p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div className="rounded-lg bg-amber-500/10 p-3">
                    <AlertTriangle className="h-8 w-8 text-amber-400" />
                  </div>
                  <Badge variant="outline" className="border-amber-500/50 text-amber-400">
                    Hidden
                  </Badge>
                </div>
                <h3 className="mb-3 text-xl font-bold text-white">
                  Broker-Driven Cost Blindness
                </h3>
                <p className="mb-4 text-slate-300">
                  Traditional brokers profit from premium increases. Their "trend projections" use 
                  <strong className="text-amber-400"> opaque industry benchmarks</strong> without 
                  validating against YOUR actual claims data.
                </p>
                <div className="rounded-lg border border-amber-500/20 bg-amber-950/20 p-3">
                  <p className="text-sm text-amber-300">
                    <strong>Result:</strong> Overpaying 15-25% on premiums and missing compression opportunities
                  </p>
                </div>
              </Card>

              <Card className="border-blue-500/30 bg-gradient-to-br from-blue-950/20 to-slate-900 p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div className="rounded-lg bg-blue-500/10 p-3">
                    <Clock className="h-8 w-8 text-blue-400" />
                  </div>
                  <Badge variant="outline" className="border-blue-500/50 text-blue-400">
                    Delayed
                  </Badge>
                </div>
                <h3 className="mb-3 text-xl font-bold text-white">
                  Reactive Decision-Making
                </h3>
                <p className="mb-4 text-slate-300">
                  You only see actuarial analysis <strong className="text-blue-400">once per year during renewal</strong>. 
                  By then, you've lost 12 months of intervention opportunities and negotiating leverage.
                </p>
                <div className="rounded-lg border border-blue-500/20 bg-blue-950/20 p-3">
                  <p className="text-sm text-blue-300">
                    <strong>Impact:</strong> Miss 90% of cost compression windows
                  </p>
                </div>
              </Card>
            </div>

            {/* ROI Calculator */}
            <Card className="border-emerald-500/30 bg-gradient-to-br from-emerald-950/30 to-slate-900 p-8">
              <div className="mb-6 text-center">
                <div className="mx-auto mb-4 inline-flex items-center gap-3 rounded-full bg-emerald-500/10 px-6 py-3">
                  <DollarSign className="h-6 w-6 text-emerald-400" />
                  <span className="text-2xl font-bold text-white">Kincaid IQ ROI Calculator</span>
                </div>
                <p className="text-slate-300">
                  See your actual savings potential in 60 seconds
                </p>
              </div>

              <div className="grid gap-8 lg:grid-cols-2">
                {/* Left: Inputs */}
                <div className="space-y-6">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-300">
                      Current Annual Healthcare Spend
                    </label>
                    <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
                      <p className="text-3xl font-bold text-white">
                        ${(baseCost / 1000000).toFixed(1)}M
                      </p>
                      <p className="mt-1 text-sm text-slate-400">
                        Based on your {Math.round(avgLives)} covered lives at ${currentPEPM.toFixed(2)} PEPM
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-300">
                      Baseline Scenario (No Action)
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between rounded-lg border border-red-500/20 bg-red-950/20 p-3">
                        <span className="text-slate-300">Year 1 Cost:</span>
                        <span className="font-bold text-white">${(year3BaselineCost * 0.92 / 1000000).toFixed(2)}M</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border border-red-500/20 bg-red-950/20 p-3">
                        <span className="text-slate-300">Year 2 Cost:</span>
                        <span className="font-bold text-white">${(year3BaselineCost * 0.96 / 1000000).toFixed(2)}M</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border border-red-500/30 bg-red-950/30 p-3">
                        <span className="text-slate-300">Year 3 Cost:</span>
                        <span className="font-bold text-red-400">${(year3BaselineCost / 1000000).toFixed(2)}M</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Results */}
                <div className="flex flex-col justify-center space-y-6">
                  <div className="rounded-xl border-2 border-emerald-500/50 bg-gradient-to-br from-emerald-950/40 to-slate-900 p-6">
                    <p className="mb-2 text-sm font-semibold text-emerald-300">
                      With Kincaid IQ Trend Compression
                    </p>
                    <p className="mb-4 text-5xl font-bold text-emerald-400">
                      ${(cumulativeModeledSavings / 1000000).toFixed(2)}M
                    </p>
                    <p className="text-slate-300">3-Year Cumulative Savings</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
                      <p className="mb-1 text-sm text-slate-400">EBITDA Impact</p>
                      <p className="text-2xl font-bold text-blue-400">
                        +{((cumulativeModeledSavings / revenue) * 100).toFixed(1)}%
                      </p>
                    </div>
                    <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
                      <p className="mb-1 text-sm text-slate-400">Trend Reduction</p>
                      <p className="text-2xl font-bold text-purple-400">
                        {((baselineTrend - modeledTrend) * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg border border-amber-500/30 bg-amber-950/20 p-4">
                    <div className="flex items-start gap-3">
                      <Sparkles className="mt-1 h-5 w-5 text-amber-400" />
                      <div>
                        <p className="font-semibold text-amber-300">Conservative Estimate</p>
                        <p className="mt-1 text-sm text-slate-300">
                          This uses 90th percentile confidence (P90) for CFO-grade budgeting. 
                          Actual savings could be <strong className="text-amber-400">15-25% higher</strong>.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-lg border border-emerald-500/30 bg-emerald-950/20 p-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-emerald-500/20 p-3">
                    <Target className="h-8 w-8 text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="mb-2 text-lg font-bold text-white">
                      Your Personalized ROI Breakdown
                    </h4>
                    <div className="grid gap-3 sm:grid-cols-3">
                      <div>
                        <p className="text-sm text-slate-400">Monthly Savings</p>
                        <p className="text-xl font-bold text-white">
                          ${((cumulativeModeledSavings / 36) / 1000).toFixed(0)}K
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-400">Per Employee</p>
                        <p className="text-xl font-bold text-white">
                          ${(cumulativeModeledSavings / avgLives / 36).toFixed(0)}/mo
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-400">ROI Timeline</p>
                        <p className="text-xl font-bold text-emerald-400">
                          3-6 months
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* VALUE DRIVERS - Why This Matters */}
        <section className="border-b border-slate-800 px-4 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <Badge className="mb-4 border-blue-500/50 bg-blue-950/30 text-blue-400">
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Strategic Advantages
              </Badge>
              <h2 className="mb-4 text-4xl font-bold text-white lg:text-5xl">
                What Makes Kincaid IQ Different
              </h2>
              <p className="mx-auto max-w-3xl text-xl text-slate-300">
                Real-time actuarial intelligence that shifts power from brokers and carriers back to YOU
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              {/* Before/After Comparison */}
              <Card className="border-slate-700 bg-slate-900/50 p-6">
                <div className="mb-6">
                  <Badge className="mb-3 border-red-500/50 bg-red-950/30 text-red-400">
                    <Clock className="mr-1 h-3 w-3" />
                    Without Kincaid IQ
                  </Badge>
                  <h3 className="text-2xl font-bold text-white">The Old Way</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3 rounded-lg border border-red-500/20 bg-red-950/10 p-4">
                    <div className="rounded-full bg-red-500/20 p-1">
                      <span className="text-red-400">✕</span>
                    </div>
                    <div>
                      <p className="font-semibold text-white">Annual Actuarial Review</p>
                      <p className="text-sm text-slate-400">
                        One snapshot per year during renewal. You're reactive, not proactive.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-lg border border-red-500/20 bg-red-950/10 p-4">
                    <div className="rounded-full bg-red-500/20 p-1">
                      <span className="text-red-400">✕</span>
                    </div>
                    <div>
                      <p className="font-semibold text-white">Black Box Projections</p>
                      <p className="text-sm text-slate-400">
                        Brokers give you "industry trends" with no transparency into assumptions or methodology.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-lg border border-red-500/20 bg-red-950/10 p-4">
                    <div className="rounded-full bg-red-500/20 p-1">
                      <span className="text-red-400">✕</span>
                    </div>
                    <div>
                      <p className="font-semibold text-white">No Credibility Weighting</p>
                      <p className="text-sm text-slate-400">
                        Your specific claims data is ignored in favor of generic benchmarks.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-lg border border-red-500/20 bg-red-950/10 p-4">
                    <div className="rounded-full bg-red-500/20 p-1">
                      <span className="text-red-400">✕</span>
                    </div>
                    <div>
                      <p className="font-semibold text-white">Limited Scenario Modeling</p>
                      <p className="text-sm text-slate-400">
                        Can't test "what if" scenarios or model intervention impacts before committing.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-lg border border-red-500/20 bg-red-950/10 p-4">
                    <div className="rounded-full bg-red-500/20 p-1">
                      <span className="text-red-400">✕</span>
                    </div>
                    <div>
                      <p className="font-semibold text-white">Broker Conflicts of Interest</p>
                      <p className="text-sm text-slate-400">
                        Higher premiums = higher commissions. Trend compression hurts their economics.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="border-emerald-500/30 bg-gradient-to-br from-emerald-950/20 to-slate-900 p-6">
                <div className="mb-6">
                  <Badge className="mb-3 border-emerald-500/50 bg-emerald-950/30 text-emerald-400">
                    <Zap className="mr-1 h-3 w-3" />
                    With Kincaid IQ
                  </Badge>
                  <h3 className="text-2xl font-bold text-white">The Kincaid Way</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3 rounded-lg border border-emerald-500/20 bg-emerald-950/10 p-4">
                    <div className="rounded-full bg-emerald-500/20 p-1">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">Live, Real-Time Analysis</p>
                      <p className="text-sm text-slate-400">
                        Upload new data anytime. Recalculate scenarios instantly. Always current.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-lg border border-emerald-500/20 bg-emerald-950/10 p-4">
                    <div className="rounded-full bg-emerald-500/20 p-1">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">Full Transparency</p>
                      <p className="text-sm text-slate-400">
                        See every assumption, formula, and calculation step. Complete actuarial audit trail.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-lg border border-emerald-500/20 bg-emerald-950/10 p-4">
                    <div className="rounded-full bg-emerald-500/20 p-1">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">Credibility-Weighted Models</p>
                      <p className="text-sm text-slate-400">
                        Statistical blending of YOUR claims with benchmarks based on population size (Z-factor).
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-lg border border-emerald-500/20 bg-emerald-950/10 p-4">
                    <div className="rounded-full bg-emerald-500/20 p-1">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">Unlimited Scenario Testing</p>
                      <p className="text-sm text-slate-400">
                        Model interventions, test compression strategies, run Monte Carlo simulations - all in seconds.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-lg border border-emerald-500/20 bg-emerald-950/10 p-4">
                    <div className="rounded-full bg-emerald-500/20 p-1">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">Zero Conflicts</p>
                      <p className="text-sm text-slate-400">
                        Pure software. No commissions, no carrier relationships. Aligned 100% with YOUR cost reduction.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Key Differentiators */}
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="border-blue-500/30 bg-gradient-to-br from-blue-950/20 to-slate-900 p-6 text-center">
                <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/10">
                  <Activity className="h-8 w-8 text-blue-400" />
                </div>
                <h4 className="mb-2 text-lg font-bold text-white">Actuarial-Grade</h4>
                <p className="text-sm text-slate-400">
                  ASOP-compliant methodology. Board-ready documentation. Full audit trails.
                </p>
              </Card>

              <Card className="border-purple-500/30 bg-gradient-to-br from-purple-950/20 to-slate-900 p-6 text-center">
                <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/10">
                  <BarChart3 className="h-8 w-8 text-purple-400" />
                </div>
                <h4 className="mb-2 text-lg font-bold text-white">Monte Carlo</h4>
                <p className="text-sm text-slate-400">
                  5,000 simulations quantify uncertainty. P50/P90 confidence for CFO budgeting.
                </p>
              </Card>

              <Card className="border-amber-500/30 bg-gradient-to-br from-amber-950/20 to-slate-900 p-6 text-center">
                <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/10">
                  <Shield className="h-8 w-8 text-amber-400" />
                </div>
                <h4 className="mb-2 text-lg font-bold text-white">Durability Scoring</h4>
                <p className="text-sm text-slate-400">
                  Multi-year savings persistence analysis. Know which interventions stick.
                </p>
              </Card>

              <Card className="border-emerald-500/30 bg-gradient-to-br from-emerald-950/20 to-slate-900 p-6 text-center">
                <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
                  <Zap className="h-8 w-8 text-emerald-400" />
                </div>
                <h4 className="mb-2 text-lg font-bold text-white">Instant Insights</h4>
                <p className="text-sm text-slate-400">
                  Upload data, get results in seconds. No waiting for actuarial consultants.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* COST OF INACTION */}
        <section className="border-b border-slate-800 bg-gradient-to-br from-slate-900 via-red-950/20 to-slate-900 px-4 py-20">
          <div className="mx-auto max-w-5xl text-center">
            <div className="mb-8">
              <Badge className="mb-4 border-red-500/50 bg-red-950/30 text-red-400">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Critical Decision Point
              </Badge>
              <h2 className="mb-4 text-4xl font-bold text-white lg:text-5xl">
                What Happens If You <span className="text-red-400">Don't</span> Act?
              </h2>
              <p className="mx-auto max-w-2xl text-xl text-slate-300">
                Every month without Kincaid IQ, you're leaving money on the table. Here's the real cost:
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              <Card className="border-red-500/30 bg-gradient-to-br from-red-950/30 to-slate-900 p-6">
                <div className="mb-4 text-6xl font-bold text-red-400">
                  ${((cumulativeModeledSavings / 36) / 1000).toFixed(0)}K
                </div>
                <p className="mb-2 font-semibold text-white">Lost Per Month</p>
                <p className="text-sm text-slate-400">
                  Missed savings opportunities while using outdated annual actuarial reviews
                </p>
              </Card>

              <Card className="border-amber-500/30 bg-gradient-to-br from-amber-950/30 to-slate-900 p-6">
                <div className="mb-4 text-6xl font-bold text-amber-400">
                  {((baselineTrend - modeledTrend) * 100).toFixed(1)}%
                </div>
                <p className="mb-2 font-semibold text-white">Trend Compression Gap</p>
                <p className="text-sm text-slate-400">
                  The difference between what you're paying and what you could be paying
                </p>
              </Card>

              <Card className="border-blue-500/30 bg-gradient-to-br from-blue-950/30 to-slate-900 p-6">
                <div className="mb-4 text-6xl font-bold text-blue-400">
                  90%
                </div>
                <p className="mb-2 font-semibold text-white">Intervention Windows Missed</p>
                <p className="text-sm text-slate-400">
                  The choice is clear
                </p>
              </Card>
            </div>

            <div className="mt-12 rounded-xl border-2 border-emerald-500/50 bg-gradient-to-br from-emerald-950/40 to-slate-900 p-8">
              <h3 className="mb-4 text-2xl font-bold text-white">
                The Choice Is Clear
              </h3>
              <div className="mb-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-red-500/30 bg-red-950/20 p-4">
                  <p className="mb-2 font-semibold text-red-300">Continue Current Path</p>
                  <ul className="space-y-2 text-left text-sm text-slate-300">
                    <li className="flex items-center gap-2">
                      <span className="text-red-400">→</span>
                      Trend compounds at 8.2% annually
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-red-400">→</span>
                      Broker commissions rise with premiums
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-red-400">→</span>
                      No visibility into cost drivers
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-red-400">→</span>
                      Lose ${(cumulativeModeledSavings / 1000000).toFixed(2)}M over 3 years
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/20 p-4">
                  <p className="mb-2 font-semibold text-emerald-300">Activate Kincaid IQ</p>
                  <ul className="space-y-2 text-left text-sm text-slate-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      Compress trend to {(modeledTrend * 100).toFixed(1)}%
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      Real-time intervention modeling
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      Full cost transparency and control
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      Save ${(cumulativeModeledSavings / 1000000).toFixed(2)}M over 3 years
                    </li>
                  </ul>
                </div>
              </div>

              <Button 
                size="lg" 
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30 hover:from-emerald-600 hover:to-emerald-700"
              >
                <Target className="mr-2 h-5 w-5" />
                Calculate Your Savings Potential
              </Button>
            </div>
          </div>
        </section>

        {/* Scenario Comparison Overview */}
        <section className="border-b border-slate-800 px-4 py-12">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 text-center">
              <h2 className="mb-3 text-3xl font-bold text-white">
                Scenario Modeling Dashboard
              </h2>
              <p className="text-slate-400">
                Compare baseline, modeled, and aggressive compression scenarios side-by-side
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {/* Baseline Scenario */}
              <Card className={`border-2 p-6 transition-all ${
                activeScenario === "baseline" 
                  ? "border-red-500/50 bg-gradient-to-br from-red-950/30 to-slate-900 shadow-lg shadow-red-500/20" 
                  : "border-slate-700 bg-slate-900 hover:border-slate-600"
              }`}>
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Baseline</h3>
                    <p className="text-sm text-slate-400">Current trajectory</p>
                  </div>
                  <div className="rounded-lg bg-red-500/10 p-3">
                    <TrendingUp className="h-6 w-6 text-red-400" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-slate-400">Year 3 Annual Cost</p>
                    <p className="text-2xl font-bold text-white">
                      ${(year3BaselineCost / 1000000).toFixed(2)}M
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-400">Annual Trend Rate</p>
                    <div className="flex items-center gap-2">
                      <p className="text-xl font-semibold text-red-400">
                        {(baselineTrend * 100).toFixed(1)}%
                      </p>
                      <ArrowUpRight className="h-4 w-4 text-red-400" />
                    </div>
                  </div>

                  <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-3">
                    <p className="text-xs text-slate-400">No interventions applied</p>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className="mt-4 w-full border-red-500/30 text-red-400 hover:bg-red-950/30"
                  onClick={() => setActiveScenario("baseline")}
                >
                  View Details
                </Button>
              </Card>

              {/* Modeled Scenario */}
              <Card className={`border-2 p-6 transition-all ${
                activeScenario === "modeled" 
                  ? "border-blue-500/50 bg-gradient-to-br from-blue-950/30 to-slate-900 shadow-lg shadow-blue-500/20" 
                  : "border-slate-700 bg-slate-900 hover:border-slate-600"
              }`}>
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Modeled</h3>
                    <p className="text-sm text-slate-400">With interventions</p>
                  </div>
                  <div className="rounded-lg bg-blue-500/10 p-3">
                    <TrendingDown className="h-6 w-6 text-blue-400" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-slate-400">Year 3 Annual Cost</p>
                    <p className="text-2xl font-bold text-white">
                      ${(year3ModeledCost / 1000000).toFixed(2)}M
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-400">Compressed Trend Rate</p>
                    <div className="flex items-center gap-2">
                      <p className="text-xl font-semibold text-blue-400">
                        {(modeledTrend * 100).toFixed(1)}%
                      </p>
                      <ArrowDownRight className="h-4 w-4 text-blue-400" />
                    </div>
                  </div>

                  <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/20 p-3">
                    <p className="text-xs font-semibold text-emerald-400">
                      ${(cumulativeModeledSavings / 1000000).toFixed(2)}M Cumulative Savings
                    </p>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className="mt-4 w-full border-blue-500/30 text-blue-400 hover:bg-blue-950/30"
                  onClick={() => setActiveScenario("modeled")}
                >
                  View Details
                </Button>
              </Card>

              {/* Aggressive Scenario */}
              <Card className={`border-2 p-6 transition-all ${
                activeScenario === "aggressive" 
                  ? "border-emerald-500/50 bg-gradient-to-br from-emerald-950/30 to-slate-900 shadow-lg shadow-emerald-500/20" 
                  : "border-slate-700 bg-slate-900 hover:border-slate-600"
              }`}>
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Aggressive</h3>
                    <p className="text-sm text-slate-400">Maximum compression</p>
                  </div>
                  <div className="rounded-lg bg-emerald-500/10 p-3">
                    <Zap className="h-6 w-6 text-emerald-400" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-slate-400">Year 3 Annual Cost</p>
                    <p className="text-2xl font-bold text-white">
                      ${(year3AggressiveCost / 1000000).toFixed(2)}M
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-400">Optimized Trend Rate</p>
                    <div className="flex items-center gap-2">
                      <p className="text-xl font-semibold text-emerald-400">
                        {(aggressiveTrend * 100).toFixed(1)}%
                      </p>
                      <ArrowDownRight className="h-4 w-4 text-emerald-400" />
                    </div>
                  </div>

                  <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/20 p-3">
                    <p className="text-xs font-semibold text-emerald-400">
                      ${(cumulativeAggressiveSavings / 1000000).toFixed(2)}M Cumulative Savings
                    </p>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className="mt-4 w-full border-emerald-500/30 text-emerald-400 hover:bg-emerald-950/30"
                  onClick={() => setActiveScenario("aggressive")}
                >
                  View Details
                </Button>
              </Card>
            </div>

            {/* Comparison Summary */}
            <div className="mt-8 rounded-lg border border-slate-700 bg-slate-900/50 p-6">
              <div className="grid gap-6 lg:grid-cols-3">
                <div>
                  <p className="mb-2 text-sm font-semibold text-slate-400">Trend Compression Impact</p>
                  <p className="text-3xl font-bold text-blue-400">
                    {((baselineTrend - modeledTrend) * 100).toFixed(1)}%
                  </p>
                  <p className="mt-1 text-xs text-slate-500">Reduction vs baseline</p>
                </div>
                <div>
                  <p className="mb-2 text-sm font-semibold text-slate-400">3-Year Savings Potential</p>
                  <p className="text-3xl font-bold text-emerald-400">
                    ${(cumulativeModeledSavings / 1000000).toFixed(2)}M
                  </p>
                  <p className="mt-1 text-xs text-slate-500">Cumulative impact</p>
                </div>
                <div>
                  <p className="mb-2 text-sm font-semibold text-slate-400">EBITDA Enhancement</p>
                  <p className="text-3xl font-bold text-amber-400">
                    {((cumulativeModeledSavings / revenue) * 100).toFixed(2)}%
                  </p>
                  <p className="mt-1 text-xs text-slate-500">Of annual revenue</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Analysis Tabs */}
        <section className="px-4 py-16">
          <div className="mx-auto max-w-7xl">
            <Tabs defaultValue="overview" className="space-y-8">
              <TabsList className="grid w-full grid-cols-2 bg-slate-900 lg:grid-cols-5">
                <TabsTrigger value="overview" className="data-[state=active]:bg-amber-500/20">
                  <Target className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Overview</span>
                </TabsTrigger>
                <TabsTrigger value="decomposition" className="data-[state=active]:bg-blue-500/20">
                  <Activity className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Trend Detail</span>
                </TabsTrigger>
                <TabsTrigger value="volatility" className="data-[state=active]:bg-purple-500/20">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Volatility</span>
                </TabsTrigger>
                <TabsTrigger value="durability" className="data-[state=active]:bg-emerald-500/20">
                  <Shield className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Durability</span>
                </TabsTrigger>
                <TabsTrigger value="export" className="data-[state=active]:bg-slate-500/20">
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Export</span>
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-8">
                {/* Data Input Cards */}
                <div className="grid gap-6 lg:grid-cols-2">
                  <Card className="border-slate-700 bg-slate-900/50 p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-white">Census Data</h3>
                      <Badge variant={census ? "default" : "outline"} className={census ? "bg-emerald-500" : ""}>
                        {census ? "Uploaded" : "Demo Data"}
                      </Badge>
                    </div>
                    <CensusUploader onUpload={handleCensusUpload} />
                  </Card>

                  <Card className="border-slate-700 bg-slate-900/50 p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-white">Claims Data</h3>
                      <Badge variant={claims ? "default" : "outline"} className={claims ? "bg-emerald-500" : ""}>
                        {claims ? "Uploaded" : "Demo Data"}
                      </Badge>
                    </div>
                    <ClaimsUploader onUpload={handleClaimsUpload} />
                  </Card>
                </div>

                {/* Advanced Analytics Grid */}
                <div className="grid gap-6 lg:grid-cols-2">
                  <CredibilityDashboard
                    actualLives={avgLives}
                    groupSpecificTrend={groupTrend}
                    industryBenchmark={industryBenchmark}
                  />

                  <TrendDecompositionPanel
                    components={trendComponents}
                    showFormulas={true}
                  />
                </div>

                {/* Intervention Simulator */}
                <Card className="border-slate-700 bg-slate-900/50 p-6">
                  <h3 className="mb-4 text-xl font-semibold text-white">
                    Intervention Strategy Builder
                  </h3>
                  <InterventionSimulator
                    currentAnnualCost={baseCost}
                    onInterventionsChange={handleInterventionsChange}
                  />
                </Card>

                {/* Multi-Year Projection */}
                <TrendProjectionChart
                  data={modeledProjections}
                  title="Credibility-Weighted Multi-Year Forecast"
                  baselineTrend={baselineTrend}
                  modeledTrend={modeledTrend}
                />

                {/* Durability & EBITDA */}
                <div className="grid gap-6 lg:grid-cols-2">
                  {durability && (
                    <DurabilityAnalyzer durability={durability} />
                  )}

                  <EBITDACalculator
                    netSavings={modeledProjections[2]?.cumulative_savings || 0}
                    revenue={revenue}
                    onRevenueChange={setRevenue}
                  />
                </div>

                {/* Broker Compensation Analysis */}
                <BrokerCompAnalysis data={brokerCompData} />

                {/* War Room Integration */}
                <WarRoomPreview
                  totalHiddenFees={850000}
                  pbmArbitrage={1200000}
                  brokerOverpayment={650000}
                  conflictsDetected={3}
                />
              </TabsContent>

              {/* Trend Decomposition Tab */}
              <TabsContent value="decomposition" className="space-y-6">
                <TrendDecompositionPanel
                  components={trendComponents}
                  showFormulas={true}
                />

                <Card className="border-slate-700 bg-slate-900/50 p-6">
                  <h3 className="mb-3 text-lg font-semibold text-white">
                    Component Analysis Methodology
                  </h3>
                  <div className="space-y-3 text-sm text-slate-400">
                    <div>
                      <strong className="text-white">Medical Core Trend:</strong> Base healthcare 
                      utilization and unit cost inflation, excluding high-cost outliers and specialty pharmacy.
                    </div>
                    <div>
                      <strong className="text-white">Pharmacy Trend:</strong> Prescription drug cost 
                      trends including specialty medications, biosimilar adoption, and formulary management impact.
                    </div>
                    <div>
                      <strong className="text-white">Catastrophic Load:</strong> Large claims impact 
                      (typically defined as claims exceeding $100K) distributed across the population.
                    </div>
                    <div>
                      <strong className="text-white">Credibility Weighting:</strong> Statistical blend 
                      of group-specific experience and industry benchmarks based on population size.
                    </div>
                  </div>
                </Card>

                {/* Component Breakdown Chart */}
                <Card className="border-slate-700 bg-slate-900/50 p-6">
                  <h3 className="mb-4 text-lg font-semibold text-white">
                    Trend Component Breakdown
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="rounded-lg border border-blue-500/20 bg-blue-950/10 p-4">
                      <p className="text-sm text-slate-400">Medical Core</p>
                      <p className="mt-2 text-3xl font-bold text-blue-400">
                        {(trendComponents.medical_core * 100).toFixed(1)}%
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {((trendComponents.medical_core / baselineTrend) * 100).toFixed(0)}% of total
                      </p>
                    </div>
                    <div className="rounded-lg border border-purple-500/20 bg-purple-950/10 p-4">
                      <p className="text-sm text-slate-400">Pharmacy</p>
                      <p className="mt-2 text-3xl font-bold text-purple-400">
                        {(trendComponents.rx_core * 100).toFixed(1)}%
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {((trendComponents.rx_core / baselineTrend) * 100).toFixed(0)}% of total
                      </p>
                    </div>
                    <div className="rounded-lg border border-amber-500/20 bg-amber-950/10 p-4">
                      <p className="text-sm text-slate-400">Catastrophic</p>
                      <p className="mt-2 text-3xl font-bold text-amber-400">
                        {(trendComponents.catastrophic_load * 100).toFixed(1)}%
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {((trendComponents.catastrophic_load / baselineTrend) * 100).toFixed(0)}% of total
                      </p>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* Volatility Analysis Tab */}
              <TabsContent value="volatility" className="space-y-6">
                <div className="rounded-lg border border-purple-500/20 bg-purple-950/10 p-6">
                  <h3 className="mb-2 flex items-center gap-2 font-semibold text-purple-300">
                    <BarChart3 className="h-5 w-5" />
                    Stochastic Cost Modeling
                  </h3>
                  <p className="text-sm text-slate-300">
                    Monte Carlo simulation (5,000 iterations) quantifies uncertainty and downside risk.
                    CFOs can model reserve adequacy and budget worst-case scenarios with statistical confidence.
                  </p>
                </div>

                {/* Fan Chart */}
                <MonteCarloFanChart
                  data={fanChartData}
                  title="Multi-Year Probabilistic Projection"
                />

                {/* Volatility Metrics */}
                <VolatilityDashboard
                  result={baselineMC}
                  volatilityProfile={volatilityProfile}
                  baseCost={baseCost}
                />

                {/* Scenario Comparison */}
                <Card className="border-purple-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-purple-950/30 p-6">
                  <h3 className="mb-4 text-xl font-bold text-white">
                    Intervention Impact on Volatility
                  </h3>
                  
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
                      <div className="text-sm font-semibold text-slate-300">
                        Savings Probability
                      </div>
                      <p className="mt-2 text-3xl font-bold text-green-400">
                        {(scenarioComparison.probability_of_savings * 100).toFixed(1)}%
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        Likelihood modeled costs are lower than baseline
                      </p>
                    </div>

                    <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
                      <div className="text-sm font-semibold text-slate-300">
                        Risk Reduction Score
                      </div>
                      <p className="mt-2 text-3xl font-bold text-blue-400">
                        {scenarioComparison.risk_reduction_score.toFixed(1)}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        Volatility decrease from interventions
                      </p>
                    </div>

                    <div className="rounded-lg border border-amber-500/20 bg-amber-950/20 p-4">
                      <div className="text-sm font-semibold text-amber-300">
                        Median Savings (P50)
                      </div>
                      <p className="mt-2 text-3xl font-bold text-white">
                        ${scenarioComparison.savings_p50.toLocaleString()}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        50% confidence level
                      </p>
                    </div>

                    <div className="rounded-lg border border-red-500/20 bg-red-950/20 p-4">
                      <div className="text-sm font-semibold text-red-300">
                        Conservative Savings (P90)
                      </div>
                      <p className="mt-2 text-3xl font-bold text-white">
                        ${scenarioComparison.savings_p90.toLocaleString()}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        90% confidence level (use for budgeting)
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 rounded-lg border border-blue-500/20 bg-blue-950/10 p-4">
                    <p className="text-sm text-slate-300">
                      <strong className="text-blue-400">CFO Guidance:</strong> Budget savings at
                      P90 level (${scenarioComparison.savings_p90.toLocaleString()}) for conservative
                      planning. There's a {((1 - scenarioComparison.probability_of_savings) * 100).toFixed(1)}%
                      chance baseline scenario performs better, but interventions reduce cost
                      volatility by {scenarioComparison.risk_reduction_score.toFixed(1)} points.
                    </p>
                  </div>
                </Card>

                {/* Volatility Methodology */}
                <Card className="border-slate-700 bg-slate-900/50 p-6">
                  <h4 className="mb-3 font-semibold text-white">Monte Carlo Methodology</h4>
                  <div className="space-y-3 text-sm text-slate-300">
                    <div>
                      <strong className="text-purple-400">Distribution Model:</strong> Log-normal
                      (industry standard for healthcare claims)
                    </div>
                    <div>
                      <strong className="text-purple-400">Iterations:</strong> 5,000 simulations
                      per scenario
                    </div>
                    <div>
                      <strong className="text-purple-400">Volatility Components:</strong>
                      <ul className="ml-4 mt-1 list-disc space-y-1">
                        <li>
                          Trend Uncertainty: {(volatilityProfile.trend_uncertainty * 100).toFixed(1)}%
                        </li>
                        <li>
                          Catastrophic Load Variance:{" "}
                          {(volatilityProfile.catastrophic_load_variance * 100).toFixed(1)}%
                        </li>
                        <li>
                          Lives Fluctuation: {(volatilityProfile.lives_fluctuation * 100).toFixed(1)}%
                        </li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* Durability Tab */}
              <TabsContent value="durability" className="space-y-6">
                {durability ? (
                  <>
                    <DurabilityAnalyzer durability={durability} />
                    
                    <Card className="border-slate-700 bg-slate-900/50 p-6">
                      <h3 className="mb-3 text-lg font-semibold text-white">
                        Savings Persistence Framework
                      </h3>
                      <div className="space-y-3 text-sm text-slate-400">
                        <div>
                          <strong className="text-white">High Durability (≥1.5):</strong> Structural 
                          improvements like PBM optimization, plan design changes, or vendor consolidation. 
                          Savings persist with minimal degradation.
                        </div>
                        <div>
                          <strong className="text-white">Medium Durability (1.0-1.5):</strong> Wellness 
                          programs, utilization management, or provider network optimization. Requires 
                          ongoing engagement to maintain impact.
                        </div>
                        <div>
                          <strong className="text-white">Low Durability (&lt;1.0):</strong> One-time 
                          benefit reductions or temporary cost shifts. Savings erode quickly as members 
                          adjust behavior or market conditions normalize.
                        </div>
                      </div>
                    </Card>
                  </>
                ) : (
                  <Card className="border-blue-500/20 bg-blue-950/10 p-8 text-center">
                    <AlertTriangle className="mx-auto mb-4 h-12 w-12 text-blue-400" />
                    <p className="mb-2 text-lg font-semibold text-white">
                      Add Interventions to Analyze Durability
                    </p>
                    <p className="text-slate-400">
                      Navigate to the Overview tab and use the Intervention Strategy Builder to model 
                      cost compression scenarios and analyze their multi-year persistence.
                    </p>
                    <Button 
                      className="mt-6 bg-blue-500 hover:bg-blue-600"
                      onClick={() => {
                        const overviewTab = document.querySelector('[value="overview"]') as HTMLElement;
                        overviewTab?.click();
                      }}
                    >
                      Build Intervention Strategy
                    </Button>
                  </Card>
                )}
              </TabsContent>

              {/* Export Tab */}
              <TabsContent value="export" className="space-y-6">
                {/* Export Options */}
                <Card className="border-emerald-500/20 bg-gradient-to-br from-slate-900 to-emerald-950/30 p-6">
                  <h3 className="mb-4 text-xl font-semibold text-white">
                    Board-Grade Documentation
                  </h3>
                  <p className="mb-6 text-slate-400">
                    Generate comprehensive actuarial analysis packets with assumption lineage, 
                    credibility weighting methodology, and multi-year savings projections.
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <Button className="bg-emerald-500 hover:bg-emerald-600">
                      <Download className="mr-2 h-4 w-4" />
                      PDF Report
                    </Button>
                    <Button variant="outline" className="border-slate-700">
                      <FileSpreadsheet className="mr-2 h-4 w-4" />
                      CSV Data
                    </Button>
                    <Button variant="outline" className="border-slate-700">
                      <Share2 className="mr-2 h-4 w-4" />
                      API Payload
                    </Button>
                    <Button variant="outline" className="border-slate-700">
                      <Settings className="mr-2 h-4 w-4" />
                      Custom Export
                    </Button>
                  </div>
                </Card>

                {/* Export Preview */}
                <Card className="border-slate-700 bg-slate-900/50 p-6">
                  <h3 className="mb-4 text-lg font-semibold text-white">
                    Report Includes
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 h-5 w-5 text-emerald-400" />
                      <div>
                        <p className="font-semibold text-white">Executive Summary</p>
                        <p className="text-sm text-slate-400">
                          One-page overview with key metrics and recommendations
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 h-5 w-5 text-emerald-400" />
                      <div>
                        <p className="font-semibold text-white">Credibility Analysis</p>
                        <p className="text-sm text-slate-400">
                          Statistical confidence calculations and Z-factor methodology
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 h-5 w-5 text-emerald-400" />
                      <div>
                        <p className="font-semibold text-white">Trend Decomposition</p>
                        <p className="text-sm text-slate-400">
                          Medical, Rx, and catastrophic component breakdown
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 h-5 w-5 text-emerald-400" />
                      <div>
                        <p className="font-semibold text-white">Multi-Year Projections</p>
                        <p className="text-sm text-slate-400">
                          3-5 year forecasts with scenario comparisons
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 h-5 w-5 text-emerald-400" />
                      <div>
                        <p className="font-semibold text-white">Monte Carlo Results</p>
                        <p className="text-sm text-slate-400">
                          Volatility analysis and confidence intervals
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 h-5 w-5 text-emerald-400" />
                      <div>
                        <p className="font-semibold text-white">Durability Scoring</p>
                        <p className="text-sm text-slate-400">
                          Savings persistence analysis over time
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 h-5 w-5 text-emerald-400" />
                      <div>
                        <p className="font-semibold text-white">EBITDA Impact</p>
                        <p className="text-sm text-slate-400">
                          Financial statement implications
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 h-5 w-5 text-emerald-400" />
                      <div>
                        <p className="font-semibold text-white">Assumption Lineage</p>
                        <p className="text-sm text-slate-400">
                          Complete audit trail for regulatory compliance
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Methodology Documentation */}
                <Card className="border-slate-700 bg-slate-900/50 p-6">
                  <h3 className="mb-3 text-lg font-semibold text-white">
                    Actuarial Methodology
                  </h3>
                  <div className="space-y-3 text-sm text-slate-400">
                    <div>
                      <strong className="text-white">Credibility Weighting:</strong> Limited Fluctuation 
                      Method (Z = √(n/N)) blends group experience with industry benchmarks to protect 
                      against statistical noise in smaller populations. Full credibility achieved at 
                      1,082 lives for medical claims.
                    </div>
                    <div>
                      <strong className="text-white">Trend Decomposition:</strong> Separates medical core, 
                      pharmacy, and catastrophic load components using industry-standard allocation methods. 
                      Enables targeted intervention modeling without distorting total trend.
                    </div>
                    <div>
                      <strong className="text-white">Monte Carlo Simulation:</strong> Log-normal distribution 
                      with 5,000 iterations models cost uncertainty. Incorporates trend volatility, catastrophic 
                      variance, and population fluctuation to quantify downside risk.
                    </div>
                    <div>
                      <strong className="text-white">Durability Scoring:</strong> Multi-factor model assesses 
                      savings persistence over 3-year horizon. Considers intervention type, implementation quality, 
                      member engagement, and market dynamics with confidence adjustments.
                    </div>
                    <div>
                      <strong className="text-white">Compliance Standards:</strong> All calculations follow 
                      Actuarial Standards of Practice (ASOP) guidelines. Assumption lineage documented for 
                      ERISA fiduciary requirements and regulatory audits.
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="border-t border-slate-800 px-4 py-16">
          <div className="mx-auto max-w-7xl">
            <FAQ />
          </div>
        </section>

        <SiriusBFooter />
      </div>
    </>
  );
}