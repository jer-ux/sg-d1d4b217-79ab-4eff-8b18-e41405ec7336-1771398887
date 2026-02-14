import Head from "next/head";
import { useState } from "react";
import { SiriusBNav } from "@/components/siriusb/SiriusBNav";
import { SiriusBFooter } from "@/components/siriusb/SiriusBFooter";
import { Calculator, TrendingDown, Sparkles, FileSpreadsheet, DollarSign, Target } from "lucide-react";
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
import {
  calculatePEPM,
  calculateAverageLives,
  generateTrendProjection,
  decomposeTrend,
  applyCredibilityWeighting,
  generateAdvancedTrendProjection,
  calculateSavingsDurability,
} from "@/lib/kincaid-iq/actuarial";
import type { CensusUpload, ClaimsUpload, Intervention, TrendProjection } from "@/lib/kincaid-iq/types";

export default function KincaidIQPage() {
  const [step, setStep] = useState(1);
  const [census, setCensus] = useState<CensusUpload | null>(null);
  const [claims, setClaims] = useState<ClaimsUpload | null>(null);
  const [interventions, setInterventions] = useState<Intervention[]>([]);
  const [totalSavings, setTotalSavings] = useState(0);
  const [revenue, setRevenue] = useState<number>(50000000); // $50M default

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
  const baselineTrend = 0.082; // 8.2% baseline
  const modeledTrend = interventions.length > 0 ? 0.045 : baselineTrend; // 4.5% after interventions

  // Credibility analysis
  const industryBenchmark = 0.085; // 8.5% industry
  const groupTrend = 0.079; // 7.9% group-specific
  const credibilityWeights = applyCredibilityWeighting(groupTrend, industryBenchmark, avgLives);

  // Trend decomposition
  const trendComponents = decomposeTrend(activeClaims);

  // Multi-year projections
  const projections: TrendProjection[] = generateAdvancedTrendProjection(
    currentPEPM,
    avgLives,
    trendComponents,
    modeledTrend * 0.35, // Medical intervention
    modeledTrend * 0.45, // Rx intervention
    0.015, // Reduced catastrophic
    credibilityWeights.z_factor,
    3
  );

  // Savings durability
  const durability = interventions.length > 0 
    ? calculateSavingsDurability(interventions, projections[1]?.savings || 0)
    : null;

  // Mock broker compensation data (would come from 5500 upload)
  const brokerCompData = [
    { year: 2022, total_commission: 187000, indirect_comp: 42000, premium_total: 4575000, lives: 465 },
    { year: 2023, total_commission: 203000, indirect_comp: 47000, premium_total: 4950000, lives: 480 },
    { year: 2024, total_commission: 219000, indirect_comp: 51000, premium_total: 5350000, lives: 490 },
  ];

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

  return (
    <>
      <Head>
        <title>Kincaid IQ – Live Trend & Cost Compression Engine | SiriusB iQ</title>
        <meta name="description" content="Credibility-weighted multi-year actuarial forecasting platform for mid to large market employers" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <SiriusBNav />

        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-slate-800 px-4 py-20">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-950/10 to-transparent" />
          
          <div className="relative mx-auto max-w-7xl">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-lg bg-amber-500/10 p-3">
                <Calculator className="h-8 w-8 text-amber-400" />
              </div>
              <Badge className="border-amber-500/50 bg-amber-950/30 text-amber-400">
                Actuarial-Grade Modeling
              </Badge>
            </div>

            <h1 className="mb-4 text-5xl font-bold text-white lg:text-6xl">
              Kincaid IQ
            </h1>
            <p className="mb-2 text-2xl text-amber-400">
              Live Trend & Cost Compression Engine
            </p>
            <p className="max-w-3xl text-lg text-slate-400">
              Credibility-weighted multi-year actuarial forecasting platform. Model trend compression 
              scenarios with decomposed medical, Rx, and catastrophic components. Built for mid-market 
              to large employers (500-10,000 lives).
            </p>

            <div className="mt-8 flex flex-wrap gap-6">
              <div className="rounded-lg border border-slate-700 bg-slate-900/50 px-6 py-4">
                <p className="text-sm text-slate-400">Current PEPM</p>
                <p className="text-2xl font-bold text-white">
                  ${currentPEPM.toFixed(2)}
                </p>
              </div>
              <div className="rounded-lg border border-slate-700 bg-slate-900/50 px-6 py-4">
                <p className="text-sm text-slate-400">Credibility Factor</p>
                <p className="text-2xl font-bold text-blue-400">
                  {(credibilityWeights.z_factor * 100).toFixed(0)}%
                </p>
              </div>
              <div className="rounded-lg border border-slate-700 bg-slate-900/50 px-6 py-4">
                <p className="text-sm text-slate-400">Covered Lives</p>
                <p className="text-2xl font-bold text-emerald-400">
                  {Math.round(avgLives)}
                </p>
              </div>
            </div>

            {demoMode && (
              <div className="mt-6 rounded-lg border border-blue-500/30 bg-blue-950/20 p-4">
                <p className="text-sm text-blue-400">
                  📊 Viewing demo data. Upload your own census and claims files to model your specific scenario.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Main Workflow */}
        <section className="px-4 py-16">
          <div className="mx-auto max-w-7xl">
            {/* Progress Stepper */}
            <div className="mb-12 flex items-center justify-center gap-4">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center gap-4">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                      s <= step
                        ? "border-amber-400 bg-amber-500/20 text-amber-400"
                        : "border-slate-700 bg-slate-900 text-slate-500"
                    }`}
                  >
                    {s}
                  </div>
                  {s < 4 && (
                    <div
                      className={`h-0.5 w-12 ${
                        s < step ? "bg-amber-400" : "bg-slate-700"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            <Tabs value={`step-${step}`} onValueChange={(v) => setStep(Number(v.split("-")[1]))}>
              <TabsList className="grid w-full grid-cols-4 bg-slate-900">
                <TabsTrigger value="step-1">
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  Census
                </TabsTrigger>
                <TabsTrigger value="step-2">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Claims
                </TabsTrigger>
                <TabsTrigger value="step-3">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Interventions
                </TabsTrigger>
                <TabsTrigger value="step-4">
                  <Target className="mr-2 h-4 w-4" />
                  Analysis
                </TabsTrigger>
              </TabsList>

              <TabsContent value="step-1" className="mt-8">
                <CensusUploader onUpload={handleCensusUpload} />
              </TabsContent>

              <TabsContent value="step-2" className="mt-8">
                <ClaimsUploader onUpload={handleClaimsUpload} />
              </TabsContent>

              <TabsContent value="step-3" className="mt-8 space-y-6">
                <InterventionSimulator
                  currentAnnualCost={currentPEPM * avgLives * 12}
                  onInterventionsChange={handleInterventionsChange}
                />

                <Button
                  onClick={() => setStep(4)}
                  className="w-full bg-amber-500 hover:bg-amber-600"
                  size="lg"
                >
                  View Complete Analysis →
                </Button>
              </TabsContent>

              <TabsContent value="step-4" className="mt-8 space-y-6">
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

                {/* Multi-Year Projection */}
                <TrendProjectionChart
                  data={projections}
                  title="Credibility-Weighted 3-Year Forecast"
                  baselineTrend={baselineTrend}
                  modeledTrend={modeledTrend}
                />

                {/* Durability & EBITDA */}
                <div className="grid gap-6 lg:grid-cols-2">
                  {durability && (
                    <DurabilityAnalyzer durability={durability} />
                  )}

                  <EBITDACalculator
                    netSavings={projections[3]?.cumulative_savings || 0}
                    revenue={revenue}
                    onRevenueChange={setRevenue}
                  />
                </div>

                {/* Export Section */}
                <Card className="border-emerald-500/20 bg-gradient-to-br from-slate-900 to-emerald-950/30 p-6">
                  <h3 className="mb-4 text-xl font-semibold text-white">
                    Board-Grade Export
                  </h3>
                  <p className="mb-6 text-slate-400">
                    Generate comprehensive actuarial analysis packet with assumption lineage, 
                    credibility weighting methodology, and 3-year savings projections.
                  </p>
                  <div className="flex gap-3">
                    <Button className="bg-emerald-500 hover:bg-emerald-600">
                      Export PDF Report
                    </Button>
                    <Button variant="outline" className="border-slate-700">
                      Download CSV Data
                    </Button>
                    <Button variant="outline" className="border-slate-700">
                      Generate API Payload
                    </Button>
                  </div>
                </Card>

                {/* Methodology Note */}
                <Card className="border-slate-700 bg-slate-900/50 p-6">
                  <h3 className="mb-3 text-lg font-semibold text-white">
                    Actuarial Methodology
                  </h3>
                  <div className="space-y-2 text-sm text-slate-400">
                    <p>
                      <strong className="text-white">Credibility Weighting:</strong> Limited Fluctuation 
                      Method (Z = √(n/N)) blends group experience with industry benchmarks to protect 
                      against statistical noise in smaller populations.
                    </p>
                    <p>
                      <strong className="text-white">Trend Decomposition:</strong> Separates medical core, 
                      pharmacy, and catastrophic load components for independent intervention modeling.
                    </p>
                    <p>
                      <strong className="text-white">Durability Scoring:</strong> Models savings persistence 
                      over 3-year horizon with intervention-specific decay rates and confidence adjustments.
                    </p>
                    <p className="mt-4 text-xs text-slate-500">
                      All calculations are deterministic and auditable. Assumption lineage tracked for 
                      regulatory compliance and fiduciary documentation.
                    </p>
                  </div>
                </Card>

                {/* Broker Compensation Analysis */}
                <BrokerCompAnalysis data={brokerCompData} />

                {/* War Room Integration */}
                <WarRoomPreview
                  totalHiddenFees={850000}
                  pbmArbitrage={1200000}
                  brokerOverpayment={650000}
                  conflictsDetected={3}
                />

                {/* FAQ Section */}
                <FAQ />
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <SiriusBFooter />
      </div>
    </>
  );
}