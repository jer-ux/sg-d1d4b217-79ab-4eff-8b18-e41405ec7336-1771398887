import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Check, 
  X, 
  Info, 
  Calculator, 
  ShieldCheck, 
  RefreshCw, 
  TrendingDown, 
  DollarSign, 
  ChevronRight, 
  Download, 
  FileText, 
  AlertCircle, 
  Percent, 
  Users, 
  Layers 
} from "lucide-react";

// Standard drug database for comparison
interface CompareDrug {
  name: string;
  category: string;
  condition: string;
  traditionalCost: number;
  costPlusCost: number;
  transparentMarkup: number;
  dispensingFee: number;
}

const compareDrugs: CompareDrug[] = [
  {
    name: "Imatinib (100mg)",
    category: "Oncology (Cancer)",
    condition: "Leukemia",
    traditionalCost: 2450.00,
    costPlusCost: 120.00,
    transparentMarkup: 18.00,
    dispensingFee: 5.00
  },
  {
    name: "Abiraterone Acetate (250mg)",
    category: "Oncology (Cancer)",
    condition: "Prostate Cancer",
    traditionalCost: 3100.00,
    costPlusCost: 210.00,
    transparentMarkup: 31.50,
    dispensingFee: 5.00
  },
  {
    name: "Atorvastatin (20mg)",
    category: "Cardiovascular",
    condition: "High Cholesterol",
    traditionalCost: 45.00,
    costPlusCost: 9.80,
    transparentMarkup: 1.47,
    dispensingFee: 5.00
  },
  {
    name: "Sildenafil (20mg)",
    category: "Cardiovascular",
    condition: "Pulmonary Hypertension",
    traditionalCost: 120.00,
    costPlusCost: 12.50,
    transparentMarkup: 1.88,
    dispensingFee: 5.00
  },
  {
    name: "Duloxetine (60mg)",
    category: "Mental Health",
    condition: "Depression/Anxiety",
    traditionalCost: 85.00,
    costPlusCost: 14.20,
    transparentMarkup: 2.13,
    dispensingFee: 5.00
  },
  {
    name: "Mesalamine ER (0.375g)",
    category: "Gastroenterology",
    condition: "Ulcerative Colitis",
    traditionalCost: 480.00,
    costPlusCost: 98.00,
    transparentMarkup: 14.70,
    dispensingFee: 5.00
  }
];

export default function PbmVsCostPlusComparison() {
  // Input parameters
  const [coveredLives, setCoveredLives] = useState<number>(1200);
  const [annualRxSpend, setAnnualRxSpend] = useState<number>(1850000);
  const [specialtyPercentage, setSpecialtyPercentage] = useState<number>(45);
  const [estimatedSpreadMarkup, setEstimatedSpreadMarkup] = useState<number>(35); // Estimated PBM hidden spread/markup %
  const [selectedDrugIndex, setSelectedDrugIndex] = useState<number>(0);

  // Calculated state variables
  const [calculatedSavings, setCalculatedSavings] = useState({
    traditionalTotal: 0,
    costPlusTotal: 0,
    totalSavings: 0,
    savingsPercentage: 0,
    pmpmReduction: 0,
    traditionalPmpm: 0,
    costPlusPmpm: 0,
    genericSavings: 0,
    specialtySavings: 0,
    transparentMarkupFee: 0,
    dispensingFeeTotal: 0
  });

  const [activeTab, setActiveTab] = useState<"financial" | "contractual" | "operational">("financial");
  const [auditSubmitted, setAuditSubmitted] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);

  useEffect(() => {
    // Perform dynamic math calculations
    const traditionalTotal = annualRxSpend;
    
    // Estimate cost plus total based on clean calculations:
    // Traditional PBM incorporates a high hidden spread and margin.
    // Cost Plus eliminates generic spread pricing entirely (typically 50-70% savings on generics)
    // and eliminates specialty drug clawbacks (typically 20-30% savings on specialty).
    const specialtySpend = traditionalTotal * (specialtyPercentage / 100);
    const nonSpecialtySpend = traditionalTotal - specialtySpend;

    // Reductions under pure Cost Plus model:
    // Non-Specialty (mainly generics/brand): savings around 45% due to eliminating spread pricing
    const costPlusNonSpecialty = nonSpecialtySpend * (1 - (estimatedSpreadMarkup / 100) * 1.1);
    // Specialty: savings around 22% due to clean markup, transparent rebates, and clinical carve-outs
    const costPlusSpecialty = specialtySpend * 0.78;

    const costPlusTotal = costPlusNonSpecialty + costPlusSpecialty;
    const totalSavings = traditionalTotal - costPlusTotal;
    const savingsPercentage = (totalSavings / traditionalTotal) * 100;

    // PMPM calculation (Per Member Per Month)
    const traditionalPmpm = traditionalTotal / (coveredLives * 12);
    const costPlusPmpm = costPlusTotal / (coveredLives * 12);
    const pmpmReduction = traditionalPmpm - costPlusPmpm;

    const genericSavings = nonSpecialtySpend - costPlusNonSpecialty;
    const specialtySavings = specialtySpend - costPlusSpecialty;

    // Standard Cost Plus transparent overhead components
    const transparentMarkupFee = costPlusTotal * 0.15; // 15% transparent markup
    const dispensingFeeTotal = coveredLives * 1.8 * 12 * 5.00; // Average 1.8 scripts/member/month * $5.00 fee

    setCalculatedSavings({
      traditionalTotal,
      costPlusTotal,
      totalSavings,
      savingsPercentage,
      pmpmReduction,
      traditionalPmpm,
      costPlusPmpm,
      genericSavings,
      specialtySavings,
      transparentMarkupFee,
      dispensingFeeTotal
    });
  }, [coveredLives, annualRxSpend, specialtyPercentage, estimatedSpreadMarkup]);

  const handleMockUpload = () => {
    setUploading(true);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          setAuditSubmitted(true);
          return 100;
        }
        return prev + 20;
      });
    }, 400);
  };

  const selectedDrug = compareDrugs[selectedDrugIndex];
  const traditionalDrugPrice = selectedDrug.traditionalCost;
  const costPlusDrugBase = selectedDrug.costPlusCost;
  const costPlusMarkup = selectedDrug.costPlusCost * 0.15;
  const costPlusDispensing = 5.00;
  const costPlusShipping = 5.00;
  const costPlusDrugTotal = costPlusDrugBase + costPlusMarkup + costPlusDispensing + costPlusShipping;
  const drugSavings = traditionalDrugPrice - costPlusDrugTotal;
  const drugSavingsPercent = (drugSavings / traditionalDrugPrice) * 100;

  return (
    <>
      <Head>
        <title>Traditional PBM vs. Cost Plus Comparison Tool | SiriusB iQ</title>
        <meta name="description" content="Side-by-side comparison tool of your traditional PBM contract and a transparent Cost Plus plan." />
      </Head>

      <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-indigo-500/30 selection:text-indigo-200 antialiased overflow-x-hidden">
        {/* Glowing backdrop elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-[800px] right-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Global Navigation Header Placeholder */}
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
                SiriusB iQ
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 bg-indigo-900/40 text-indigo-400 border border-indigo-500/20 rounded-md uppercase tracking-wider">
                Sciences Lab
              </span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link href="/solutions/mark-cuban-cost-drugs" className="text-sm text-gray-300 hover:text-white transition-colors">
                Cost Plus Benchmark
              </Link>
              <Link href="/solutions/actuarial-benefits" className="text-sm text-gray-300 hover:text-white transition-colors">
                Actuarial Benefits
              </Link>
              <Link href="/solutions/rx-defense" className="text-sm text-gray-300 hover:text-white transition-colors">
                Rx Defense
              </Link>
            </div>
            <Link href="/request-demo">
              <Button size="sm" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white border-0 shadow-lg shadow-indigo-900/30">
                Book Live Audit
              </Button>
            </Link>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb & Intro */}
          <div className="flex items-center gap-2 mb-4">
            <Link href="/solutions/mark-cuban-cost-drugs" className="text-xs text-indigo-400 hover:underline">
              Cost Plus Drugs Series
            </Link>
            <ChevronRight className="w-3 h-3 text-gray-600" />
            <span className="text-xs text-gray-400 font-mono">PBM Comparison Workspace</span>
          </div>

          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-indigo-200 to-emerald-200 bg-clip-text text-transparent mb-4">
              Traditional PBM vs. Cost Plus Comparison Tool
            </h1>
            <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">
              Model your traditional plan parameters below. Contrast the multi-million dollar spreads, opaque clawbacks, and drug markups of hidden-pricing contracts side-by-side with a strict fiduciary Cost-Plus design.
            </p>
          </div>

          {/* Interactive Financial Modeler Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
            {/* Input Controls Panel */}
            <div className="lg:col-span-5 space-y-6">
              <Card className="bg-slate-900/40 border-white/10 backdrop-blur-sm shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-500" />
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2 text-indigo-400 mb-1">
                    <Calculator className="w-5 h-5 animate-pulse" />
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider">Parameters</span>
                  </div>
                  <CardTitle className="text-white text-xl">1. Model Your Current Plan</CardTitle>
                  <CardDescription className="text-gray-400">
                    Input your existing plan parameters to calculate cost differences.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Slider 1: Covered Lives */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-300 font-medium flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-indigo-400" /> Covered Lives
                      </span>
                      <span className="text-indigo-300 font-mono font-semibold bg-indigo-950/50 border border-indigo-500/20 px-2 py-0.5 rounded">
                        {coveredLives.toLocaleString()} members
                      </span>
                    </div>
                    <input
                      type="range"
                      min="100"
                      max="15000"
                      step="100"
                      value={coveredLives}
                      onChange={(e) => {
                        const lives = parseInt(e.target.value);
                        setCoveredLives(lives);
                        // Standard rule of thumb: ~$1,540 annual spend per employee member
                        setAnnualRxSpend(lives * 1540);
                      }}
                      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                    <p className="text-[11px] text-gray-500">
                      Total enrolled employee and dependent lives covered under the benefit program.
                    </p>
                  </div>

                  {/* Slider 2: Annual Rx Spend */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-300 font-medium flex items-center gap-1.5">
                        <DollarSign className="w-4 h-4 text-emerald-400" /> Annual Rx Spend
                      </span>
                      <span className="text-emerald-300 font-mono font-semibold bg-emerald-950/50 border border-emerald-500/20 px-2 py-0.5 rounded">
                        ${annualRxSpend.toLocaleString()}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="50000"
                      max="30000000"
                      step="50000"
                      value={annualRxSpend}
                      onChange={(e) => setAnnualRxSpend(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                    <p className="text-[11px] text-gray-500">
                      Your historical gross annual drug spend under the current PBM before rebates.
                    </p>
                  </div>

                  {/* Slider 3: Specialty Drug Mix */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-300 font-medium flex items-center gap-1.5">
                        <Layers className="w-4 h-4 text-purple-400" /> Specialty Drug Mix
                      </span>
                      <span className="text-purple-300 font-mono font-semibold bg-purple-950/50 border border-purple-500/20 px-2 py-0.5 rounded">
                        {specialtyPercentage}% of spend
                      </span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="75"
                      step="1"
                      value={specialtyPercentage}
                      onChange={(e) => setSpecialtyPercentage(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                    />
                    <p className="text-[11px] text-gray-500">
                      Percentage of budget absorbed by high-cost specialty drugs (typically 1-2% of claims, but 40-50% of cost).
                    </p>
                  </div>

                  {/* Slider 4: Estimated PBM Hidden Spread/Markups */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-300 font-medium flex items-center gap-1.5">
                        <Percent className="w-4 h-4 text-amber-400" /> Hidden Markups & Spread
                      </span>
                      <span className="text-amber-300 font-mono font-semibold bg-amber-950/50 border border-amber-500/20 px-2 py-0.5 rounded">
                        {estimatedSpreadMarkup}% average
                      </span>
                    </div>
                    <input
                      type="range"
                      min="15"
                      max="60"
                      step="5"
                      value={estimatedSpreadMarkup}
                      onChange={(e) => setEstimatedSpreadMarkup(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                    />
                    <p className="text-[11px] text-gray-500">
                      Industry estimates of non-transparent generic spreads, administrative clawbacks, and retained rebates.
                    </p>
                  </div>

                  {/* Default benchmark warning */}
                  <div className="flex items-start gap-2 p-3 bg-indigo-950/30 border border-indigo-500/10 rounded-lg text-xs text-indigo-200">
                    <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>SiriusB Benchmark:</strong> Based on historical forensic audits of standard commercial PBM contracts, companies of your size average <strong>32.8% overpayment</strong> due to non-disclosed generic spreads.
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results Dashboard Panel */}
            <div className="lg:col-span-7 space-y-6">
              {/* Main Savings Card */}
              <Card className="bg-gradient-to-br from-slate-900 to-indigo-950/40 border-indigo-500/25 shadow-2xl relative overflow-hidden">
                <div className="absolute -right-20 -top-20 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                
                <CardContent className="p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div>
                      <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 bg-emerald-950/60 border border-emerald-500/20 px-3 py-1 rounded-full uppercase">
                        Projected Fiduciary Savings
                      </span>
                      <h2 className="text-white text-2xl font-bold mt-2">Dynamic Model Analysis</h2>
                    </div>
                    <div className="text-left sm:text-right">
                      <span className="text-xs text-gray-400 block font-mono">PMPM Cost Reduction</span>
                      <span className="text-emerald-400 text-3xl font-extrabold font-mono tracking-tight">
                        -${calculatedSavings.pmpmReduction.toFixed(2)}
                        <span className="text-xs text-gray-500 font-normal"> / member</span>
                      </span>
                    </div>
                  </div>

                  {/* Big Savings Metric */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950/50 border border-white/5 rounded-xl p-6 mb-8">
                    <div>
                      <span className="text-xs text-gray-400 block font-mono uppercase tracking-wider">Est. Annual Net Savings</span>
                      <span className="text-white text-4xl sm:text-5xl font-extrabold font-mono tracking-tight bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                        ${Math.round(calculatedSavings.totalSavings).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xl">
                        <TrendingDown className="w-5 h-5 animate-bounce" />
                        <span>{calculatedSavings.savingsPercentage.toFixed(1)}% Saving</span>
                      </div>
                      <span className="text-xs text-gray-400 mt-1">
                        Reduction in overall annual drug program expenditure.
                      </span>
                    </div>
                  </div>

                  {/* Side-by-Side Horizontal Bar Chart */}
                  <div className="space-y-4 mb-8">
                    {/* Traditional Bar */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-gray-300">Traditional Opaque PBM Model</span>
                        <span className="text-white font-mono">${Math.round(calculatedSavings.traditionalTotal).toLocaleString()}</span>
                      </div>
                      <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full" style={{ width: "100%" }} />
                      </div>
                    </div>

                    {/* Cost Plus Bar */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-emerald-400 flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5" /> Fiduciary Cost-Plus Model
                        </span>
                        <span className="text-emerald-400 font-mono">${Math.round(calculatedSavings.costPlusTotal).toLocaleString()}</span>
                      </div>
                      <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full transition-all duration-500" 
                          style={{ width: `${100 - calculatedSavings.savingsPercentage}%` }} 
                        />
                      </div>
                    </div>
                  </div>

                  {/* Breakdown breakdown list */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
                    <div className="bg-slate-900/60 p-3 rounded-lg border border-white/5">
                      <span className="text-gray-400 block mb-1">Traditional PMPM</span>
                      <span className="text-white font-bold">${calculatedSavings.traditionalPmpm.toFixed(2)}</span>
                    </div>
                    <div className="bg-slate-900/60 p-3 rounded-lg border border-white/5">
                      <span className="text-gray-400 block mb-1">Cost Plus PMPM</span>
                      <span className="text-emerald-400 font-bold">${calculatedSavings.costPlusPmpm.toFixed(2)}</span>
                    </div>
                    <div className="bg-slate-900/60 p-3 rounded-lg border border-white/5">
                      <span className="text-gray-400 block mb-1">Generic Savings</span>
                      <span className="text-white font-bold">${Math.round(calculatedSavings.genericSavings).toLocaleString()}</span>
                    </div>
                    <div className="bg-slate-900/60 p-3 rounded-lg border border-white/5">
                      <span className="text-gray-400 block mb-1">Specialty Savings</span>
                      <span className="text-purple-400 font-bold">${Math.round(calculatedSavings.specialtySavings).toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Interactive Drug Cost Deep-Dive */}
          <div className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
              Contrast Specific Medications Under Each Contract
            </h2>
            <p className="text-gray-400 mb-8 max-w-3xl">
              Traditional PBM pricing features massive, hidden markups, and spread on individual drugs. Click the medications below to see the transparent cost structure dissected side-by-side with Cost Plus.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Drug Selection Column */}
              <div className="lg:col-span-4 space-y-2">
                <span className="text-xs font-mono font-semibold text-gray-500 block mb-1 uppercase tracking-wider">Select Medication</span>
                {compareDrugs.map((drug, index) => (
                  <button
                    key={drug.name}
                    onClick={() => setSelectedDrugIndex(index)}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      selectedDrugIndex === index
                        ? "bg-indigo-950/40 border-indigo-500/45 text-white"
                        : "bg-slate-900/30 border-white/5 text-gray-400 hover:border-white/10 hover:text-white"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold">{drug.name}</span>
                      <Badge variant="outline" className="text-[10px] bg-slate-950 font-mono text-indigo-300 border-indigo-500/20">
                        {drug.category}
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-500 flex justify-between items-center">
                      <span>Condition: {drug.condition}</span>
                      <span className="text-emerald-400 font-bold font-mono">
                        Save {Math.round(((drug.traditionalCost - (drug.costPlusCost * 1.15 + 10)) / drug.traditionalCost) * 100)}%
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Side-by-Side Drug Dissection Card */}
              <div className="lg:col-span-8">
                <Card className="bg-slate-900/40 border-white/10 backdrop-blur-sm h-full flex flex-col justify-between">
                  <CardHeader className="border-b border-white/5 pb-4">
                    <div className="flex justify-between items-start flex-wrap gap-4">
                      <div>
                        <CardTitle className="text-white text-2xl font-bold flex items-center gap-2">
                          {selectedDrug.name}
                          <Badge className="bg-indigo-900/50 border border-indigo-500/20 text-indigo-300 text-xs">
                            30-Day Supply Cost Breakdown
                          </Badge>
                        </CardTitle>
                        <CardDescription className="text-gray-400 mt-1">
                          Analyzing {selectedDrug.category} prescription therapy for {selectedDrug.condition}.
                        </CardDescription>
                      </div>
                      <div className="bg-emerald-950/60 border border-emerald-500/25 px-4 py-2 rounded-xl text-right">
                        <span className="text-[10px] font-mono text-gray-400 block uppercase">Net Savings per Prescription</span>
                        <span className="text-emerald-400 text-2xl font-extrabold font-mono">
                          -${Math.round(drugSavings).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 md:p-8 space-y-8 flex-grow">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Left: Traditional Opaque Pricing */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-red-400 border-b border-white/5 pb-2">
                          <X className="w-5 h-5 shrink-0" />
                          <span className="font-bold text-sm tracking-wide uppercase">Traditional PBM Model</span>
                        </div>
                        <div className="bg-slate-950/60 p-4 rounded-xl border border-red-500/10 space-y-3">
                          <div className="flex justify-between text-xs text-gray-400">
                            <span>Billed Client Price</span>
                            <span className="font-mono font-semibold text-white">${traditionalDrugPrice.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-xs text-red-400/80 bg-red-950/20 p-2 rounded border border-red-900/30">
                            <span className="flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" /> Hidden Generic Spread</span>
                            <span className="font-mono font-bold">${(traditionalDrugPrice - selectedDrug.costPlusCost * 1.15).toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-xs text-gray-400">
                            <span>Pharmacy Dispensing Fee</span>
                            <span className="font-mono text-gray-300">Varies (often hidden)</span>
                          </div>
                          <div className="border-t border-white/5 pt-3 flex justify-between text-sm font-bold text-white">
                            <span>Traditional Billed Cost</span>
                            <span className="font-mono text-red-400">${traditionalDrugPrice.toFixed(2)}</span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 italic">
                          * Traditional PBMs mark up generic and specialty medications behind a non-disclosed MAC list, pocketing the difference between what they bill you and what they pay the retail pharmacy.
                        </p>
                      </div>

                      {/* Right: Cost Plus Fiduciary Pricing */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-emerald-400 border-b border-white/5 pb-2">
                          <Check className="w-5 h-5 shrink-0" />
                          <span className="font-bold text-sm tracking-wide uppercase">Fiduciary Cost-Plus Model</span>
                        </div>
                        <div className="bg-slate-950/60 p-4 rounded-xl border border-emerald-500/10 space-y-3">
                          <div className="flex justify-between text-xs text-gray-400">
                            <span>Direct Ingredient Cost</span>
                            <span className="font-mono font-semibold text-white">${costPlusDrugBase.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-xs text-gray-400">
                            <span>15% Transparent Markup</span>
                            <span className="font-mono font-semibold text-indigo-300">${costPlusMarkup.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-xs text-gray-400">
                            <span>Dispensing / Pharmacy Fee</span>
                            <span className="font-mono font-semibold text-white">${costPlusDispensing.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-xs text-gray-400">
                            <span>Standard Shipping & Fulfillment</span>
                            <span className="font-mono font-semibold text-white">${costPlusShipping.toFixed(2)}</span>
                          </div>
                          <div className="border-t border-white/5 pt-3 flex justify-between text-sm font-bold text-white">
                            <span>Total Fiduciary Billed Cost</span>
                            <span className="font-mono text-emerald-400">${costPlusDrugTotal.toFixed(2)}</span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 italic">
                          * Pure transparency: No spreads, no hidden kickbacks. You pay the exact wholesale manufacturer price + a flat 15% transparent fee + flat dispensing and shipping.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Detailed Structural Matrix Tab Panel */}
          <div className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
              Beyond Financials: Contrast Fiduciary Standards
            </h2>
            <p className="text-gray-400 mb-8 max-w-3xl">
              Saving money is only half the benefit. Contrast how the core rules of engagement change when you move from an opaque commercial PBM to a pure fiduciary Cost-Plus model.
            </p>

            {/* Navigation Tabs */}
            <div className="flex gap-2 border-b border-white/10 mb-8 overflow-x-auto pb-1">
              <button
                onClick={() => setActiveTab("financial")}
                className={`py-3 px-4 font-mono text-xs uppercase tracking-wider border-b-2 font-bold transition-all ${
                  activeTab === "financial"
                    ? "border-indigo-500 text-white"
                    : "border-transparent text-gray-500 hover:text-gray-300"
                }`}
              >
                Financial & Pricing Definitions
              </button>
              <button
                onClick={() => setActiveTab("contractual")}
                className={`py-3 px-4 font-mono text-xs uppercase tracking-wider border-b-2 font-bold transition-all ${
                  activeTab === "contractual"
                    ? "border-indigo-500 text-white"
                    : "border-transparent text-gray-500 hover:text-gray-300"
                }`}
              >
                Contractual & Audit Rights
              </button>
              <button
                onClick={() => setActiveTab("operational")}
                className={`py-3 px-4 font-mono text-xs uppercase tracking-wider border-b-2 font-bold transition-all ${
                  activeTab === "operational"
                    ? "border-indigo-500 text-white"
                    : "border-transparent text-gray-500 hover:text-gray-300"
                }`}
              >
                Operational & Clinical Freedom
              </button>
            </div>

            {/* Tab Contents */}
            <Card className="bg-slate-900/40 border-white/10 backdrop-blur-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/5 bg-slate-950/60 font-mono text-xs text-gray-400 uppercase">
                      <th className="py-4 px-6 text-left w-1/4">Provision Dimension</th>
                      <th className="py-4 px-6 text-left w-3/8 text-red-400 border-l border-white/5">Traditional Traditional PBM Contract</th>
                      <th className="py-4 px-6 text-left w-3/8 text-emerald-400 border-l border-white/5">Fiduciary Cost-Plus Framework</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {activeTab === "financial" && (
                      <>
                        <tr>
                          <td className="py-4 px-6 font-bold text-white">Medication Markups</td>
                          <td className="py-4 px-6 text-gray-300 border-l border-white/5">
                            Opaque AWP (Average Wholesale Price) discounts with massive hidden margins and retail markups.
                          </td>
                          <td className="py-4 px-6 text-gray-300 border-l border-white/5 bg-emerald-950/10">
                            <span className="text-emerald-400 font-semibold block mb-1">True Wholesale Cost + 15% Markup</span>
                            Wholesale acquisition pricing with no middle-man spread or clawback.
                          </td>
                        </tr>
                        <tr>
                          <td className="py-4 px-6 font-bold text-white">Rebate Transparency</td>
                          <td className="py-4 px-6 text-gray-300 border-l border-white/5">
                            PBM pockets standard rebates through shell offshore Group Purchasing Organizations (GPOs), returning only a fraction as "guaranteed".
                          </td>
                          <td className="py-4 px-6 text-gray-300 border-l border-white/5 bg-emerald-950/10">
                            <span className="text-emerald-400 font-semibold block mb-1">100% Direct Pass-Through</span>
                            All rebates and manufacturer discounts are remitted directly to the employer plan weekly with zero retention.
                          </td>
                        </tr>
                        <tr>
                          <td className="py-4 px-6 font-bold text-white">Dispensing Fees</td>
                          <td className="py-4 px-6 text-gray-300 border-l border-white/5">
                            Artificially bloated dispensing charges and mail-order administration fees ranging from $15 to $150 per script.
                          </td>
                          <td className="py-4 px-6 text-gray-300 border-l border-white/5 bg-emerald-950/10">
                            <span className="text-emerald-400 font-semibold block mb-1">Flat $5.00 Administrative Fee</span>
                            A flat, uniform dispensing fee per line-item claim with absolutely no hidden additions.
                          </td>
                        </tr>
                      </>
                    )}

                    {activeTab === "contractual" && (
                      <>
                        <tr>
                          <td className="py-4 px-6 font-bold text-white">Auditing Freedoms</td>
                          <td className="py-4 px-6 text-gray-300 border-l border-white/5">
                            Extremely restrictive auditing clauses (e.g. audit limited to once a year, limited sample size, and only using a pre-approved Big-3 auditing firm).
                          </td>
                          <td className="py-4 px-6 text-gray-300 border-l border-white/5 bg-emerald-950/10">
                            <span className="text-emerald-400 font-semibold block mb-1">Unrestricted Real-Time Access</span>
                            Plan holds full audit rights at any time of the year. Unlimited claims access down to the exact NDCs with zero restrictive black-outs.
                          </td>
                        </tr>
                        <tr>
                          <td className="py-4 px-6 font-bold text-white">MAC List Disclosure</td>
                          <td className="py-4 px-6 text-gray-300 border-l border-white/5">
                            Maximum Allowable Cost (MAC) lists are kept entirely proprietary and confidential, enabling the PBM to manipulate reimbursement pricing weekly.
                          </td>
                          <td className="py-4 px-6 text-gray-300 border-l border-white/5 bg-emerald-950/10">
                            <span className="text-emerald-400 font-semibold block mb-1">100% Open Book MAC / NADAC</span>
                            Pricing strictly linked to federal benchmarks like NADAC (National Average Drug Acquisition Cost). Open access to exact acquisition lists.
                          </td>
                        </tr>
                        <tr>
                          <td className="py-4 px-6 font-bold text-white">Fiduciary Duty</td>
                          <td className="py-4 px-6 text-gray-300 border-l border-white/5">
                            Explicit disclaimers in contracts stating that the PBM is NOT a fiduciary to the plan, leaving the employer fully exposed to ERISA compliance liabilities.
                          </td>
                          <td className="py-4 px-6 text-gray-300 border-l border-white/5 bg-emerald-950/10">
                            <span className="text-emerald-400 font-semibold block mb-1">Co-Fiduciary Status</span>
                            Signed, legally binding co-fiduciary commitment ensuring clinical and operational decisions prioritize the employer and members above all.
                          </td>
                        </tr>
                      </>
                    )}

                    {activeTab === "operational" && (
                      <>
                        <tr>
                          <td className="py-4 px-6 font-bold text-white">Formulary Restrictions</td>
                          <td className="py-4 px-6 text-gray-300 border-l border-white/5">
                            Forced alignment to high-rebated formularies, often blocking low-cost generics to prioritize high-rebated, expensive brand medications.
                          </td>
                          <td className="py-4 px-6 text-gray-300 border-l border-white/5 bg-emerald-950/10">
                            <span className="text-emerald-400 font-semibold block mb-1">Fiduciary Open Formulary</span>
                            Complete clinical independence. The plan is free to cover and incentivize any medication based entirely on efficacy and transparent net price.
                          </td>
                        </tr>
                        <tr>
                          <td className="py-4 px-6 font-bold text-white">Mail-Order Requirements</td>
                          <td className="py-4 px-6 text-gray-300 border-l border-white/5">
                            Members are forced to use the PBM-owned, high-priced captive mail order facility for maintenance medications.
                          </td>
                          <td className="py-4 px-6 text-gray-300 border-l border-white/5 bg-emerald-950/10">
                            <span className="text-emerald-400 font-semibold block mb-1">Transparent Multi-Pharmacy Integration</span>
                            Freedom to source mail-order medications from transparent, low-cost fulfillment partners like Mark Plus Drugs with zero forced locks.
                          </td>
                        </tr>
                        <tr>
                          <td className="py-4 px-6 font-bold text-white">Clinical Programs</td>
                          <td className="py-4 px-6 text-gray-300 border-l border-white/5">
                            Default "prior authorization" and clinical management programs designed to maximize administrative volume and high-cost specialty drug approvals.
                          </td>
                          <td className="py-4 px-6 text-gray-300 border-l border-white/5 bg-emerald-950/10">
                            <span className="text-emerald-400 font-semibold block mb-1">Independent Fiduciary Review</span>
                            Clinical criteria managed by unbiased, independent pharmacists whose only mandate is maximum efficacy and minimizing wastage.
                          </td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Upload Intake Card */}
          <section className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900/30 border border-white/10 rounded-2xl p-8 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="lg:col-span-7 space-y-4">
                <Badge className="bg-indigo-900/50 border border-indigo-500/20 text-indigo-300 text-xs">
                  Upload Contract For Forensic Verification
                </Badge>
                <h3 className="text-3xl font-extrabold text-white tracking-tight">
                  Get a Certified Side-by-Side Savings Audit
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  Model estimates can vary based on exact NDC definitions. Upload your current PBM contract or recent pharmacy claims file (de-identified claims census), and our actuarial team will run a precise, certified line-item comparison against Cost Plus.
                </p>
                <div className="flex flex-wrap gap-4 text-xs font-mono text-gray-400 pt-2">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>100% HIPAA & SOC 2 Safe</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-indigo-400" />
                    <span>Free Forensic Audit</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-indigo-400" />
                    <span>Delivered in 48 Hours</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <Card className="bg-slate-950/70 border border-white/10 p-6 relative overflow-hidden">
                  {!auditSubmitted ? (
                    <div className="space-y-4">
                      <div className="border-2 border-dashed border-white/15 hover:border-indigo-500/50 rounded-xl p-8 text-center transition-all bg-slate-900/10 cursor-pointer">
                        <FileText className="w-10 h-10 text-indigo-400/80 mx-auto mb-3" />
                        <span className="text-xs text-gray-300 block font-medium mb-1">
                          Drag and drop your claims census or PBM contract here
                        </span>
                        <span className="text-[10px] text-gray-500 block">
                          PDF, XLSX, or CSV (De-identified). Max 25MB.
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <input
                          type="email"
                          placeholder="Enter work email for audit report"
                          className="w-full bg-slate-900/60 border border-white/10 rounded-lg px-3.5 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
                        />
                      </div>

                      <Button 
                        onClick={handleMockUpload} 
                        disabled={uploading}
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium border-0"
                      >
                        {uploading ? (
                          <span className="flex items-center gap-2">
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            Ingesting and Encrypting ({uploadProgress}%)
                          </span>
                        ) : (
                          "Initiate Forensic Analysis"
                        )}
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-8 space-y-4">
                      <div className="w-12 h-12 bg-emerald-900/50 border border-emerald-500/25 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                        <Check className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-lg">Census Ingested Successfully</h4>
                        <p className="text-xs text-gray-400 mt-2 max-w-sm mx-auto leading-relaxed">
                          Your de-identified data has been securely routed to our actuarial analysis engine. A verified comparative cost audit will be delivered to your email within 48 hours.
                        </p>
                      </div>
                      <Button 
                        variant="outline" 
                        onClick={() => setAuditSubmitted(false)}
                        className="text-xs border-white/10 hover:bg-white/5 text-gray-400 hover:text-white"
                      >
                        Upload Another File
                      </Button>
                    </div>
                  )}
                </Card>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}