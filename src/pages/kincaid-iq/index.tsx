import Head from "next/head";
import { useState } from "react";
import { SiriusBNav } from "@/components/siriusb/SiriusBNav";
import { SiriusBFooter } from "@/components/siriusb/SiriusBFooter";
import { CensusUploader } from "@/components/kincaid-iq/CensusUploader";
import { ClaimsUploader } from "@/components/kincaid-iq/ClaimsUploader";
import { TrendProjectionChart } from "@/components/kincaid-iq/TrendProjectionChart";
import { InterventionSimulator } from "@/components/kincaid-iq/InterventionSimulator";
import { EBITDACalculator } from "@/components/kincaid-iq/EBITDACalculator";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  ArrowRight, 
  Activity, 
  TrendingDown, 
  Shield, 
  Download,
  Check
} from "lucide-react";
import { 
  calculatePEPM, 
  calculateAverageLives, 
  generateTrendProjection 
} from "@/lib/kincaid-iq/actuarial";
import type { TrendProjection, Intervention } from "@/lib/kincaid-iq/types";

type CensusData = {
  employee_count_start: number;
  employee_count_end: number;
  avg_salary: number;
};

type ClaimsData = {
  medical_total: number;
  rx_total: number;
  stop_loss_premium: number;
  admin_fees: number;
  period_start: string;
  period_end: string;
};

type WorkflowStep = "census" | "claims" | "model" | "export";

export default function KincaidIQPage() {
  const [currentStep, setCurrentStep] = useState<WorkflowStep>("census");
  const [censusData, setCensusData] = useState<CensusData | null>(null);
  const [claimsData, setClaimsData] = useState<ClaimsData | null>(null);
  const [projections, setProjections] = useState<TrendProjection[]>([]);
  const [interventions, setInterventions] = useState<Intervention[]>([]);
  const [totalSavings, setTotalSavings] = useState(0);

  const handleCensusComplete = (data: CensusData) => {
    setCensusData(data);
    setCurrentStep("claims");
  };

  const handleClaimsComplete = (data: ClaimsData) => {
    setClaimsData(data);
    if (censusData) {
      runInitialProjection(censusData, data);
    }
    setCurrentStep("model");
  };

  const runInitialProjection = (census: CensusData, claims: ClaimsData) => {
    const avgLives = calculateAverageLives({
      id: "temp",
      org_id: "temp",
      ...census,
      timestamp: new Date().toISOString(),
    });

    const pepm = calculatePEPM(
      {
        id: "temp",
        org_id: "temp",
        ...claims,
      },
      avgLives
    );

    const baselineTrend = 0.08; // 8% default industry trend
    const modeledTrend = 0.08; // Start with baseline

    const projection = generateTrendProjection(
      pepm,
      avgLives,
      baselineTrend,
      modeledTrend,
      5
    );

    setProjections(projection);
  };

  const handleInterventionsChange = (newInterventions: Intervention[], savings: number) => {
    setInterventions(newInterventions);
    setTotalSavings(savings);

    if (censusData && claimsData && newInterventions.length > 0) {
      recalculateProjections(newInterventions, savings);
    }
  };

  const recalculateProjections = (activeInterventions: Intervention[], savings: number) => {
    if (!censusData || !claimsData) return;

    const avgLives = calculateAverageLives({
      id: "temp",
      org_id: "temp",
      ...censusData,
      timestamp: new Date().toISOString(),
    });

    const pepm = calculatePEPM(
      {
        id: "temp",
        org_id: "temp",
        ...claimsData,
      },
      avgLives
    );

    const baselineTrend = 0.08;
    const annualCost = pepm * avgLives * 12;
    const savingsPercent = savings / annualCost;
    const modeledTrend = baselineTrend * (1 - savingsPercent);

    const projection = generateTrendProjection(
      pepm,
      avgLives,
      baselineTrend,
      modeledTrend,
      5
    );

    setProjections(projection);
  };

  const calculateNetSavings = () => {
    if (projections.length === 0) return 0;
    return projections[projections.length - 1]?.cumulative_savings || 0;
  };

  const steps = [
    { id: "census", label: "Census Data", icon: Shield, completed: !!censusData },
    { id: "claims", label: "Claims Data", icon: Activity, completed: !!claimsData },
    { id: "model", label: "Model Scenarios", icon: TrendingDown, completed: interventions.length > 0 },
    { id: "export", label: "Export Analysis", icon: Download, completed: false },
  ];

  return (
    <>
      <Head>
        <title>Kincaid IQ – Live Trend & Cost Compression Engine | SiriusB</title>
        <meta name="description" content="Actuarial-grade healthcare cost modeling and EBITDA impact analysis" />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <SiriusBNav />

        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-slate-800 px-6 py-20">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-950/20 via-transparent to-blue-950/20" />
          <div className="relative mx-auto max-w-7xl">
            <div className="text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-950/30 px-4 py-2">
                <div className="h-2 w-2 animate-pulse rounded-full bg-violet-400" />
                <span className="text-sm font-medium text-violet-300">Actuarial-Grade Analytics</span>
              </div>
              <h1 className="mb-6 text-5xl font-bold tracking-tight text-white md:text-6xl">
                Kincaid IQ
              </h1>
              <p className="mb-4 text-xl text-violet-300">
                Live Trend & Cost Compression Engine
              </p>
              <p className="mx-auto max-w-2xl text-slate-400">
                Upload census + claims data → Model interventions → Project 5-year savings → 
                Calculate EBITDA impact. Built for CFOs, actuaries, and PE operators.
              </p>
            </div>
          </div>
        </section>

        {/* Progress Steps */}
        <section className="border-b border-slate-800 px-6 py-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = step.completed;

                return (
                  <div key={step.id} className="flex flex-1 items-center">
                    <div className="flex flex-col items-center">
                      <div
                        className={`
                          mb-2 flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all
                          ${isCompleted 
                            ? "border-emerald-500 bg-emerald-950/50" 
                            : isActive 
                            ? "border-violet-500 bg-violet-950/50" 
                            : "border-slate-700 bg-slate-900"
                          }
                        `}
                      >
                        {isCompleted ? (
                          <Check className="h-5 w-5 text-emerald-400" />
                        ) : (
                          <Icon className={`h-5 w-5 ${isActive ? "text-violet-400" : "text-slate-500"}`} />
                        )}
                      </div>
                      <p className={`text-sm font-medium ${isActive ? "text-white" : "text-slate-400"}`}>
                        {step.label}
                      </p>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`mx-4 h-0.5 flex-1 ${isCompleted ? "bg-emerald-500" : "bg-slate-700"}`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="px-6 py-12">
          <div className="mx-auto max-w-7xl space-y-8">
            {/* Step 1: Census Upload */}
            {currentStep === "census" && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="mb-2 text-2xl font-bold text-white">Step 1: Upload Census Data</h2>
                  <p className="text-slate-400">
                    Provide employee headcount and salary information
                  </p>
                </div>
                <CensusUploader onUploadComplete={handleCensusComplete} />
              </div>
            )}

            {/* Step 2: Claims Upload */}
            {currentStep === "claims" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="mb-2 text-2xl font-bold text-white">Step 2: Upload Claims Data</h2>
                    <p className="text-slate-400">
                      Medical, Rx, Admin, and Stop Loss costs
                    </p>
                  </div>
                  <Button
                    onClick={() => setCurrentStep("census")}
                    variant="outline"
                    className="border-slate-700 text-slate-300"
                  >
                    ← Back to Census
                  </Button>
                </div>
                <ClaimsUploader onUploadComplete={handleClaimsComplete} />
              </div>
            )}

            {/* Step 3: Modeling & Analysis */}
            {currentStep === "model" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="mb-2 text-2xl font-bold text-white">Step 3: Model Cost Compression</h2>
                    <p className="text-slate-400">
                      Add interventions and project savings scenarios
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      onClick={() => setCurrentStep("claims")}
                      variant="outline"
                      className="border-slate-700 text-slate-300"
                    >
                      ← Back to Claims
                    </Button>
                    <Button
                      onClick={() => setCurrentStep("export")}
                      disabled={interventions.length === 0}
                      className="bg-violet-500 hover:bg-violet-600"
                    >
                      Continue to Export <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Summary Cards */}
                {censusData && claimsData && (
                  <div className="grid gap-4 sm:grid-cols-4">
                    <Card className="border-slate-700 bg-slate-900 p-4">
                      <p className="text-sm text-slate-400">Average Lives</p>
                      <p className="mt-1 text-2xl font-bold text-white">
                        {calculateAverageLives({
                          id: "temp",
                          org_id: "temp",
                          ...censusData,
                          timestamp: new Date().toISOString(),
                        }).toLocaleString()}
                      </p>
                    </Card>
                    <Card className="border-slate-700 bg-slate-900 p-4">
                      <p className="text-sm text-slate-400">Current PEPM</p>
                      <p className="mt-1 text-2xl font-bold text-white">
                        ${calculatePEPM(
                          {
                            id: "temp",
                            org_id: "temp",
                            ...claimsData,
                          },
                          calculateAverageLives({
                            id: "temp",
                            org_id: "temp",
                            ...censusData,
                            timestamp: new Date().toISOString(),
                          })
                        ).toFixed(0)}
                      </p>
                    </Card>
                    <Card className="border-slate-700 bg-slate-900 p-4">
                      <p className="text-sm text-slate-400">Baseline Trend</p>
                      <p className="mt-1 text-2xl font-bold text-red-400">
                        +8.0%
                      </p>
                    </Card>
                    <Card className="border-slate-700 bg-slate-900 p-4">
                      <p className="text-sm text-slate-400">Annual Cost</p>
                      <p className="mt-1 text-2xl font-bold text-white">
                        ${((claimsData.medical_total + claimsData.rx_total + claimsData.admin_fees + claimsData.stop_loss_premium) / 1000000).toFixed(1)}M
                      </p>
                    </Card>
                  </div>
                )}

                {/* Intervention Simulator */}
                <InterventionSimulator
                  currentAnnualCost={
                    claimsData 
                      ? claimsData.medical_total + claimsData.rx_total + claimsData.admin_fees + claimsData.stop_loss_premium
                      : 0
                  }
                  onInterventionsChange={handleInterventionsChange}
                />

                {/* Trend Projection Chart */}
                {projections.length > 0 && (
                  <TrendProjectionChart data={projections} />
                )}

                {/* EBITDA Calculator */}
                {interventions.length > 0 && (
                  <EBITDACalculator netSavings={calculateNetSavings()} years={5} />
                )}
              </div>
            )}

            {/* Step 4: Export */}
            {currentStep === "export" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="mb-2 text-2xl font-bold text-white">Step 4: Export Analysis</h2>
                    <p className="text-slate-400">
                      Download board-ready reports and data packages
                    </p>
                  </div>
                  <Button
                    onClick={() => setCurrentStep("model")}
                    variant="outline"
                    className="border-slate-700 text-slate-300"
                  >
                    ← Back to Modeling
                  </Button>
                </div>

                <Card className="border-violet-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-violet-950/30 p-8">
                  <div className="mb-6 text-center">
                    <h3 className="mb-2 text-xl font-semibold text-white">Analysis Complete</h3>
                    <p className="text-slate-400">
                      Your 5-year cost compression model is ready to export
                    </p>
                  </div>

                  <div className="mb-8 grid gap-6 sm:grid-cols-3">
                    <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/20 p-6 text-center">
                      <p className="mb-2 text-sm text-slate-400">Total Interventions</p>
                      <p className="text-4xl font-bold text-emerald-400">{interventions.length}</p>
                    </div>
                    <div className="rounded-lg border border-violet-500/30 bg-violet-950/20 p-6 text-center">
                      <p className="mb-2 text-sm text-slate-400">5-Year Savings</p>
                      <p className="text-4xl font-bold text-violet-400">
                        ${(calculateNetSavings() / 1000000).toFixed(1)}M
                      </p>
                    </div>
                    <div className="rounded-lg border border-blue-500/30 bg-blue-950/20 p-6 text-center">
                      <p className="mb-2 text-sm text-slate-400">EBITDA Impact</p>
                      <p className="text-4xl font-bold text-blue-400">
                        {((calculateNetSavings() / 50000000) * 100).toFixed(2)}%
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Button className="bg-violet-500 hover:bg-violet-600">
                      <Download className="mr-2 h-4 w-4" />
                      Download PDF Report
                    </Button>
                    <Button variant="outline" className="border-slate-700 text-slate-300">
                      <Download className="mr-2 h-4 w-4" />
                      Export Raw Data (CSV)
                    </Button>
                  </div>

                  <div className="mt-6 rounded-lg border border-blue-500/30 bg-blue-950/20 p-4">
                    <p className="text-sm text-blue-300">
                      <strong>Next Steps:</strong> Share this analysis with your board, CFO, or PE sponsor. 
                      Schedule a follow-up call to discuss implementation roadmap and vendor RFPs.
                    </p>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </section>

        <SiriusBFooter />
      </div>
    </>
  );
}