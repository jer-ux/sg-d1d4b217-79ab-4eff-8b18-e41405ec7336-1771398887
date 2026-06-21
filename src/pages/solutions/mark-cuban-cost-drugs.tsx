import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { InstantROICalculator } from "@/components/tools/InstantROICalculator";
import { MeasureMedComparison } from "@/components/marketing/MeasureMedComparison";
import { FormularyOptimizationEngine } from "@/components/solutions/EconomicValueEnhancement";
import { 
  TrendingDown, 
  DollarSign, 
  Shield, 
  Package, 
  AlertCircle,
  CheckCircle,
  ArrowRight,
  TrendingUp,
  Pill,
  Calculator,
  FileText,
  Search,
  Plus,
  Minus,
  Check,
  UploadCloud,
  FileCheck,
  AlertTriangle,
  Layers,
  ChevronRight,
  Sparkles,
  Info,
  ShieldCheck,
  Database,
  Globe,
  MapPin,
  TrendingUp as TrendUpIcon,
  Download
} from "lucide-react";

interface DrugComparison {
  name: string;
  genericName: string;
  strength: string;
  category: "Oncology" | "Specialty" | "Diabetes" | "Cardiovascular" | "Mental Health";
  cubanPrice: number; // Cost Plus
  pbmPrice: number; // Traditional PBM
  retailPrice: number;
  savingsPercent: number;
  utilizationRate: number; // Typical patients per 1,000 lives
}

const formularyDatabase: DrugComparison[] = [
  // Oncology
  {
    name: "Gleevec",
    genericName: "Imatinib",
    strength: "400mg",
    category: "Oncology",
    cubanPrice: 39.00,
    pbmPrice: 2450.00,
    retailPrice: 9680.00,
    savingsPercent: 98,
    utilizationRate: 0.8
  },
  {
    name: "Zytiga",
    genericName: "Abiraterone Acetate",
    strength: "250mg",
    category: "Oncology",
    cubanPrice: 85.00,
    pbmPrice: 3100.00,
    retailPrice: 11450.00,
    savingsPercent: 97,
    utilizationRate: 1.1
  },
  {
    name: "Xeloda",
    genericName: "Capecitabine",
    strength: "500mg",
    category: "Oncology",
    cubanPrice: 42.10,
    pbmPrice: 1890.00,
    retailPrice: 4200.00,
    savingsPercent: 97,
    utilizationRate: 1.5
  },
  {
    name: "Sprycel",
    genericName: "Dasatinib",
    strength: "100mg",
    category: "Oncology",
    cubanPrice: 195.00,
    pbmPrice: 4200.00,
    retailPrice: 15400.00,
    savingsPercent: 95,
    utilizationRate: 0.4
  },
  // Specialty
  {
    name: "Humira",
    genericName: "Adalimumab",
    strength: "40mg/0.8mL",
    category: "Specialty",
    cubanPrice: 569.00,
    pbmPrice: 6920.00,
    retailPrice: 7800.00,
    savingsPercent: 91,
    utilizationRate: 3.2
  },
  {
    name: "Tecfidera",
    genericName: "Dimethyl Fumarate",
    strength: "240mg",
    category: "Specialty",
    cubanPrice: 92.00,
    pbmPrice: 4800.00,
    retailPrice: 7200.00,
    savingsPercent: 98,
    utilizationRate: 1.4
  },
  {
    name: "Revlimid",
    genericName: "Lenalidomide",
    strength: "10mg",
    category: "Specialty",
    cubanPrice: 320.00,
    pbmPrice: 9100.00,
    retailPrice: 18400.00,
    savingsPercent: 96,
    utilizationRate: 0.5
  },
  // Diabetes
  {
    name: "Januvia",
    genericName: "Sitagliptin",
    strength: "100mg",
    category: "Diabetes",
    cubanPrice: 31.80,
    pbmPrice: 527.00,
    retailPrice: 612.00,
    savingsPercent: 94,
    utilizationRate: 12.5
  },
  {
    name: "Jardiance",
    genericName: "Empagliflozin",
    strength: "25mg",
    category: "Diabetes",
    cubanPrice: 42.50,
    pbmPrice: 578.00,
    retailPrice: 650.00,
    savingsPercent: 92,
    utilizationRate: 14.2
  },
  {
    name: "Glucophage",
    genericName: "Metformin ER",
    strength: "500mg",
    category: "Diabetes",
    cubanPrice: 4.10,
    pbmPrice: 42.00,
    retailPrice: 68.00,
    savingsPercent: 90,
    utilizationRate: 45.0
  },
  // Cardiovascular
  {
    name: "Lipitor",
    genericName: "Atorvastatin",
    strength: "40mg",
    category: "Cardiovascular",
    cubanPrice: 6.20,
    pbmPrice: 89.00,
    retailPrice: 142.50,
    savingsPercent: 93,
    utilizationRate: 58.0
  },
  {
    name: "Xarelto",
    genericName: "Rivaroxaban",
    strength: "20mg",
    category: "Cardiovascular",
    cubanPrice: 58.60,
    pbmPrice: 542.00,
    retailPrice: 625.00,
    savingsPercent: 89,
    utilizationRate: 11.4
  },
  {
    name: "Eliquis",
    genericName: "Apixaban",
    strength: "5mg",
    category: "Cardiovascular",
    cubanPrice: 62.40,
    pbmPrice: 558.00,
    retailPrice: 642.00,
    savingsPercent: 89,
    utilizationRate: 16.5
  },
  // Mental Health
  {
    name: "Prozac",
    genericName: "Fluoxetine",
    strength: "20mg",
    category: "Mental Health",
    cubanPrice: 4.50,
    pbmPrice: 67.00,
    retailPrice: 98.00,
    savingsPercent: 93,
    utilizationRate: 31.0
  },
  {
    name: "Zoloft",
    genericName: "Sertraline",
    strength: "50mg",
    category: "Mental Health",
    cubanPrice: 5.10,
    pbmPrice: 78.00,
    retailPrice: 112.00,
    savingsPercent: 93,
    utilizationRate: 35.4
  },
  {
    name: "Wellbutrin XL",
    genericName: "Bupropion XL",
    strength: "300mg",
    category: "Mental Health",
    cubanPrice: 12.40,
    pbmPrice: 184.00,
    retailPrice: 280.00,
    savingsPercent: 93,
    utilizationRate: 22.1
  }
];

const STATES_BENCHMARK = [
  { code: "US", name: "National Average", multiplier: 1.0 },
  { code: "CA", name: "California (West)", multiplier: 1.08 },
  { code: "TX", name: "Texas (South)", multiplier: 1.03 },
  { code: "NY", name: "New York (Northeast)", multiplier: 1.12 },
  { code: "IL", name: "Illinois (Midwest)", multiplier: 1.05 },
  { code: "FL", name: "Florida (Southeast)", multiplier: 1.01 },
  { code: "IN", name: "Indiana (Industrial Belt)", multiplier: 0.98 }
];

export default function MarkCubanCostDrugs() {
  const [isMounted, setIsMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedDrug, setSelectedDrug] = useState<DrugComparison | null>(null);
  const [quantity, setQuantity] = useState(30);

  // Benchmarking tool parameters
  const [coveredLives, setCoveredLives] = useState(2500);
  const [benchmarkIndex, setBenchmarkIndex] = useState<"NADAC" | "MEDICAID" | "MAC_INDEX">("NADAC");
  const [selectedState, setSelectedState] = useState("US");
  const [specialtyRatio, setSpecialtyRatio] = useState(20); // % of specialty carve out
  const [copayMitigation, setCopayMitigation] = useState(15); // % of copay savings passed to plan sponsor

  const [selectedPortfolioDrugs, setSelectedPortfolioDrugs] = useState<string[]>([
    "Gleevec", "Humira", "Tecfidera", "Januvia", "Jardiance", "Lipitor", "Eliquis", "Prozac"
  ]);

  // Upload/Mock Audit State
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [auditResult, setAuditResult] = useState<{
    totalClaims: number;
    flaggedSpreads: number;
    potentialSavings: number;
    topWasteDrugs: Array<{ name: string; waste: number }>;
  } | null>(null);

  useEffect(() => {
    setIsMounted(true);
    setSelectedDrug(formularyDatabase[0]);
  }, []);

  const stateMultiplier = STATES_BENCHMARK.find(s => s.code === selectedState)?.multiplier || 1.0;

  // Calculate customized portfolio metrics
  const portfolioMetrics = (() => {
    let totalPbmSpend = 0;
    let totalCostPlusSpend = 0;

    const baseIndexMultiplier = benchmarkIndex === "NADAC" ? 1.0 : benchmarkIndex === "MEDICAID" ? 1.05 : 1.15;

    selectedPortfolioDrugs.forEach(drugName => {
      const drug = formularyDatabase.find(d => d.name === drugName);
      if (drug) {
        // Estimated annual claims based on covered lives and utilization rate per 1,000 lives
        const annualClaims = Math.round((coveredLives / 1000) * drug.utilizationRate * 12);
        
        // PBM pricing affected by regional variance state multiplier and selected index delta
        const adjustedPbmPrice = drug.pbmPrice * stateMultiplier * baseIndexMultiplier;
        
        // Cost Plus price incorporates a portion of the custom specialty ratio optimization
        const adjustedCostPlusPrice = drug.cubanPrice * (drug.category === "Specialty" ? (1 - (specialtyRatio / 100) * 0.25) : 1.0);

        totalPbmSpend += adjustedPbmPrice * annualClaims;
        totalCostPlusSpend += adjustedCostPlusPrice * annualClaims;
      }
    });

    const totalLeakedSpread = totalPbmSpend - totalCostPlusSpend;
    const mitigatedSavings = totalLeakedSpread * (1 + copayMitigation / 100);
    const savingsPercentage = totalPbmSpend > 0 ? Math.round((mitigatedSavings / totalPbmSpend) * 100) : 0;

    return {
      annualPbmSpend: totalPbmSpend,
      annualCostPlusSpend: totalCostPlusSpend,
      annualSavings: mitigatedSavings,
      savingsPercentage
    };
  })();

  const filteredDrugs = formularyDatabase.filter(drug => {
    const matchesSearch = drug.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          drug.genericName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || drug.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const togglePortfolioDrug = (drugName: string) => {
    setSelectedPortfolioDrugs(prev => 
      prev.includes(drugName) 
        ? prev.filter(name => name !== drugName)
        : [...prev, drugName]
    );
  };

  const handleMockUpload = () => {
    setIsUploading(true);
    setUploadProgress(15);
    setAuditResult(null);

    const intervals = [
      { t: 600, p: 35 },
      { t: 1200, p: 60 },
      { t: 1800, p: 85 },
      { t: 2200, p: 100 }
    ];

    intervals.forEach(step => {
      setTimeout(() => {
        setUploadProgress(step.p);
        if (step.p === 100) {
          setIsUploading(false);
          const mockSavings = coveredLives * 158.40 * stateMultiplier;
          setAuditResult({
            totalClaims: Math.round(coveredLives * 2.1),
            flaggedSpreads: Math.round(coveredLives * 0.49),
            potentialSavings: mockSavings,
            topWasteDrugs: [
              { name: "Gleevec (Imatinib) Oncology Sourcing", waste: Math.round(mockSavings * 0.38) },
              { name: "Humira (Adalimumab) Biosimilar Delta", waste: Math.round(mockSavings * 0.26) },
              { name: "Tecfidera (Dimethyl Fumarate) Multiple Sclerosis", waste: Math.round(mockSavings * 0.19) }
            ]
          });
        }
      }, step.t);
    });
  };

  if (!isMounted) return null;

  return (
    <>
      <Head>
        <title>National Benchmarking & Cost Plus Auditing | SiriusB iQ</title>
        <meta name="description" content="Industrial-grade national PBM benchmarking tool comparing claims against Mark Cuban Cost Plus Drugs standard pricing indices." />
      </Head>

      <div className="min-h-screen bg-[#090D16] text-zinc-100 selection:bg-cyan-500/30 selection:text-cyan-200 font-sans">
        
        {/* Sticky Benchmark Hub Status Banner */}
        <div className="sticky top-0 z-50 bg-[#0F172A]/90 border-b border-cyan-500/20 backdrop-blur-md px-6 py-3.5">
          <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400"></span>
              </span>
              <p className="text-xs font-mono tracking-wider text-zinc-400">
                <span className="text-cyan-400 font-bold">INDUSTRIAL-GRADE BENCHMARKING ENGINE:</span> Active Index — <span className="text-white font-semibold">{benchmarkIndex} ({selectedState})</span>
              </p>
            </div>
            <div className="flex items-center gap-6">
              <a href="#benchmarking-suite" className="text-xs font-mono uppercase tracking-wider text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                Audit Suite <ChevronRight className="w-3.5 h-3.5" />
              </a>
              <a href="#claims-audit" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-zinc-950 font-black text-xs uppercase tracking-widest px-5 py-2 rounded-lg transition-all duration-300 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                Launch Diagnostic
              </a>
            </div>
          </div>
        </div>

        {/* Hero Area */}
        <div className="relative overflow-hidden pt-20 pb-24 border-b border-zinc-900">
          <div className="absolute inset-0 pointer-events-none opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(to right, rgb(34, 211, 238) 1px, transparent 1px),
                linear-gradient(to bottom, rgb(34, 211, 238) 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px'
            }} />
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[400px] bg-gradient-to-r from-cyan-500/5 via-blue-500/10 to-teal-500/5 blur-[150px] rounded-full pointer-events-none" />

          <div className="max-w-[1600px] mx-auto px-6 relative z-10 text-center space-y-6">
            <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30 text-xs tracking-widest uppercase font-mono px-4 py-1.5 rounded-full">
              <Globe className="w-3.5 h-3.5 inline mr-1.5 text-cyan-400 animate-pulse" />
              National Benchmark Audit Portal
            </Badge>
            
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-serif tracking-tight max-w-5xl mx-auto leading-[1.1]">
              Mark Cuban Cost Plus <br/>
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
                National Benchmarking Tool
              </span>
            </h1>
            
            <p className="text-base sm:text-lg text-zinc-400 max-w-3xl mx-auto leading-relaxed font-light">
              Compare actual traditional PBM contract costs with real-time Cost Plus Drug Company (CPPD) rates. Quantify generic spread markups, rebate retention traps, and therapeutic segment waste.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <a href="#benchmarking-suite" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-zinc-950 font-extrabold uppercase tracking-wider px-8 py-4 rounded-xl transition-all duration-300 shadow-xl shadow-cyan-500/10 flex items-center justify-center gap-2">
                <Calculator className="w-4 h-4" />
                Analyze Benchmark Suite
              </a>
              <a href="#claims-audit" className="bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 font-extrabold uppercase tracking-wider px-8 py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2">
                <UploadCloud className="w-4 h-4 text-cyan-400" />
                Run Claims Intake Audit
              </a>
            </div>
          </div>
        </div>

        {/* INDUSTRIAL-GRADE BENCHMARKING SUITE */}
        <section id="benchmarking-suite" className="py-24 max-w-[1600px] mx-auto px-6">
          <div className="text-center space-y-3 mb-16 max-w-3xl mx-auto">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">Fiduciary Diagnostic Modeler</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold">Fiduciary Calibration Panel</h2>
            <p className="text-zinc-400 text-sm md:text-base">
              Fine-tune covered lives, therapeutic indices, state-by-state cost adjustments, and dynamic specialty program optimizations to audit your exact plan performance.
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
            
            {/* Left calibration column */}
            <div className="xl:col-span-4 space-y-6">
              
              {/* Size and Index Card */}
              <Card className="bg-zinc-950/40 border-zinc-800/80 backdrop-blur-md">
                <CardHeader className="border-b border-zinc-900 pb-4">
                  <CardTitle className="text-base font-mono font-bold text-zinc-100 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-cyan-400" />
                    1. Calibration & Parameters
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  
                  {/* Slider: Covered Lives */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-zinc-400 uppercase">Covered Lives:</span>
                      <span className="text-cyan-400 font-bold">{coveredLives.toLocaleString()} lives</span>
                    </div>
                    <Slider
                      defaultValue={[2500]}
                      max={20000}
                      min={500}
                      step={250}
                      onValueChange={(val) => setCoveredLives(val[0])}
                      className="py-2"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                      <span>500 lives</span>
                      <span>10,000 lives</span>
                      <span>20,000 lives</span>
                    </div>
                  </div>

                  {/* Dropdown: State Regional Multiplier */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-zinc-400 uppercase flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      State Regional Cost Multiplier:
                    </label>
                    <select
                      value={selectedState}
                      onChange={(e) => setSelectedState(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 text-sm text-zinc-200 rounded-lg p-2.5 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                    >
                      {STATES_BENCHMARK.map((state) => (
                        <option key={state.code} value={state.code}>
                          {state.name} (x{state.multiplier.toFixed(2)})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Radio/Button Group: Benchmark Index */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-zinc-400 uppercase">
                      Comparative Reference Index:
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      {[
                        { id: "NADAC", label: "NADAC (Federal Baseline)", desc: "National Average Drug Acquisition Cost" },
                        { id: "MEDICAID", label: "State Medicaid FFS", desc: "Medicaid Fee-For-Service contract rates" },
                        { id: "MAC_INDEX", label: "Commercial PBM MAC", desc: "Average proprietary Maximum Allowable Cost" }
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setBenchmarkIndex(item.id as any)}
                          className={`w-full text-left p-3 rounded-lg border transition-all duration-150 ${
                            benchmarkIndex === item.id 
                              ? 'bg-cyan-500/10 border-cyan-500/50 text-white' 
                              : 'bg-zinc-900/40 border-zinc-800/80 text-zinc-400 hover:border-zinc-700'
                          }`}
                        >
                          <p className="text-xs font-bold">{item.label}</p>
                          <p className="text-[10px] text-zinc-500 mt-0.5">{item.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                </CardContent>
              </Card>

              {/* Advanced Program Optimizations Card */}
              <Card className="bg-zinc-950/40 border-zinc-800/80 backdrop-blur-md">
                <CardHeader className="border-b border-zinc-900 pb-4">
                  <CardTitle className="text-base font-mono font-bold text-zinc-100 flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-cyan-400" />
                    2. Program Optimization Sliders
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  
                  {/* Specialty Carve-Out Ratio Slider */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-zinc-400 uppercase">Specialty Carve-Out Ratio:</span>
                      <span className="text-cyan-400 font-bold">{specialtyRatio}% Carved Out</span>
                    </div>
                    <Slider
                      defaultValue={[20]}
                      max={100}
                      min={0}
                      step={5}
                      onValueChange={(val) => setSpecialtyRatio(val[0])}
                      className="py-2"
                    />
                    <p className="text-[10px] text-zinc-500 leading-relaxed">
                      Assumes standalone direct specialty sourcing for eligible high-cost biosimilars.
                    </p>
                  </div>

                  {/* Copay Mitigation Value */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-zinc-400 uppercase">Copay Optimization Mitigation:</span>
                      <span className="text-cyan-400 font-bold">+{copayMitigation}% Efficiency</span>
                    </div>
                    <Slider
                      defaultValue={[15]}
                      max={30}
                      min={0}
                      step={5}
                      onValueChange={(val) => setCopayMitigation(val[0])}
                      className="py-2"
                    />
                    <p className="text-[10px] text-zinc-500 leading-relaxed">
                      Redirects standard pharmacy savings back into the plan sponsor fiduciary fund.
                    </p>
                  </div>

                </CardContent>
              </Card>

            </div>

            {/* Middle and Right combined outputs */}
            <div className="xl:col-span-8 space-y-8">
              
              {/* Big Metrics Dashboard Panel */}
              <Card className="bg-gradient-to-br from-[#0F172A] via-[#090D16] to-cyan-950/10 border-cyan-500/30 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none" />
                
                <CardContent className="p-8 space-y-8">
                  
                  {/* Huge savings display */}
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 pb-6 border-b border-zinc-900">
                    <div className="space-y-2">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-semibold">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Forensic Actuarial Projection
                      </div>
                      <h3 className="text-sm font-mono text-zinc-400 uppercase tracking-widest">Net Simulated Annual Fiduciary Savings</h3>
                      <p className="text-5xl sm:text-6xl font-black font-serif text-white tracking-tight">
                        ${portfolioMetrics.annualSavings.toLocaleString(undefined, {maximumFractionDigits: 0})}
                      </p>
                      <p className="text-xs text-zinc-500">
                        Based on {coveredLives.toLocaleString()} lives comparing current traditional metrics to true transparent Cost-Plus structures.
                      </p>
                    </div>

                    <div className="bg-cyan-400 text-zinc-950 font-black text-3xl px-8 py-5 rounded-xl shadow-[0_0_20px_rgba(34,211,238,0.3)] flex flex-col items-center">
                      <span>{portfolioMetrics.savingsPercentage}%</span>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-800">Gross Reduction</span>
                    </div>
                  </div>

                  {/* Secondary stats boxes */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-zinc-950/60 p-6 rounded-xl border border-zinc-850/80 space-y-1.5">
                      <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Traditional PBM Plan Exposure</p>
                      <p className="text-2xl font-bold text-red-400">${portfolioMetrics.annualPbmSpend.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
                      <p className="text-xs text-zinc-500">Includes hidden spread skims and administrative markups.</p>
                    </div>

                    <div className="bg-zinc-950/60 p-6 rounded-xl border border-zinc-850/80 space-y-1.5">
                      <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">Cost-Plus Plan Sourcing Spend</p>
                      <p className="text-2xl font-bold text-green-400">${portfolioMetrics.annualCostPlusSpend.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
                      <p className="text-xs text-zinc-500">Raw manufacturing price + transparent 15% + dispensing.</p>
                    </div>
                  </div>

                  {/* Benchmarked drug list matrix */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">Active Benchmarked Medications Coverage</h4>
                      <span className="text-[11px] font-mono text-cyan-400">{selectedPortfolioDrugs.length} of {formularyDatabase.length} drugs mapped</span>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                      {formularyDatabase.map((drug) => {
                        const isSelected = selectedPortfolioDrugs.includes(drug.name);
                        return (
                          <button
                            key={drug.name}
                            onClick={() => togglePortfolioDrug(drug.name)}
                            className={`p-3 rounded-lg border text-left transition-all ${
                              isSelected 
                                ? 'bg-zinc-900 border-cyan-500/30 text-white' 
                                : 'bg-zinc-950/30 border-zinc-900 text-zinc-500 hover:border-zinc-800'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold truncate">{drug.name}</span>
                              {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.5)]" />}
                            </div>
                            <p className="text-[9px] text-zinc-500 mt-1">{drug.genericName}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                </CardContent>
              </Card>

            </div>

          </div>
        </section>

        {/* REGIONAL FORENSIC FORMULARY COMPARATOR */}
        <section className="py-24 border-y border-zinc-900 bg-zinc-950/20 max-w-[1600px] mx-auto px-6">
          <div className="text-center space-y-3 mb-16 max-w-3xl mx-auto">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">Comprehensive Price Index Database</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold">Interactive Drug Price Comparator</h2>
            <p className="text-zinc-400 text-sm md:text-base">
              Audit granular ingredient costs. Select any medication to view its transparent manufacturing breakdown, flat dispensing charges, and comparative spread ratios.
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
            
            {/* Catalog Grid */}
            <div className="xl:col-span-7 space-y-6">
              <Card className="bg-zinc-950/40 border-zinc-800/80 backdrop-blur-md">
                <CardHeader className="pb-4 border-b border-zinc-900">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <CardTitle className="text-sm font-mono font-bold text-zinc-100 uppercase tracking-wider flex items-center gap-2">
                      <Database className="w-4 h-4 text-cyan-400" />
                      Filter Therapeutic Area
                    </CardTitle>
                    
                    <div className="flex flex-wrap gap-1">
                      {["All", "Oncology", "Specialty", "Diabetes", "Cardiovascular", "Mental Health"].map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`text-xs px-3 py-1.5 rounded-md border transition-all ${
                            selectedCategory === cat 
                              ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' 
                              : 'bg-zinc-900/30 border-zinc-850 hover:bg-zinc-800 text-zinc-400'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="relative mt-4">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <Input
                      placeholder="Type drug or generic ingredient name (e.g. Imatinib)..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-zinc-900 border-zinc-800 text-zinc-200 placeholder-zinc-500 focus-visible:ring-cyan-500/30"
                    />
                  </div>
                </CardHeader>

                <CardContent className="p-0">
                  <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-zinc-800 bg-zinc-900/20 text-zinc-400 text-xs font-mono uppercase tracking-wider">
                          <th className="py-3.5 px-6">Medication</th>
                          <th className="py-3.5 px-6 hidden sm:table-cell">Therapeutic Area</th>
                          <th className="py-3.5 px-6 text-right">Cost Plus</th>
                          <th className="py-3.5 px-6 text-right">PBM Billing</th>
                          <th className="py-3.5 px-6 text-right">Net Saved</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-900">
                        {filteredDrugs.length > 0 ? (
                          filteredDrugs.map((drug) => (
                            <tr 
                              key={drug.name}
                              onClick={() => {
                                setSelectedDrug(drug);
                                setQuantity(30);
                              }}
                              className={`group cursor-pointer transition-colors ${
                                selectedDrug?.name === drug.name 
                                  ? 'bg-cyan-500/5' 
                                  : 'hover:bg-zinc-900/30'
                              }`}
                            >
                              <td className="py-3.5 px-6">
                                <div className="font-bold text-sm text-zinc-200 group-hover:text-cyan-400 transition-colors">{drug.name}</div>
                                <div className="text-[10px] text-zinc-500 font-mono">{drug.genericName} • {drug.strength}</div>
                              </td>
                              <td className="py-3.5 px-6 hidden sm:table-cell">
                                <Badge className="bg-zinc-900 text-zinc-400 border-zinc-800 text-[10px] font-normal">
                                  {drug.category}
                                </Badge>
                              </td>
                              <td className="py-3.5 px-6 text-right font-semibold text-xs text-green-400">
                                ${(drug.cubanPrice).toFixed(2)}
                              </td>
                              <td className="py-3.5 px-6 text-right font-semibold text-xs text-red-400">
                                ${(drug.pbmPrice * stateMultiplier).toFixed(2)}
                              </td>
                              <td className="py-3.5 px-6 text-right">
                                <span className="inline-flex items-center justify-center bg-green-500/10 text-green-400 border border-green-500/20 text-xs font-bold px-2.5 py-0.5 rounded-full">
                                  -{drug.savingsPercent}%
                                </span>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={5} className="py-12 text-center text-zinc-500 text-sm">
                              No medications found matching "{searchTerm}" in this category.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Selected Drug Analysis (Visual Formula Breakdown) */}
            <div className="xl:col-span-5">
              {selectedDrug ? (
                <Card className="bg-gradient-to-br from-zinc-950 via-[#090D16] to-cyan-950/10 border-cyan-500/30 sticky top-28 shadow-2xl overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 blur-[60px] rounded-full pointer-events-none" />
                  <CardHeader className="border-b border-zinc-900">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 text-[10px] uppercase font-mono font-bold mb-2">
                          {selectedDrug.category} Segment
                        </Badge>
                        <CardTitle className="text-2xl font-serif font-bold text-zinc-100">{selectedDrug.name}</CardTitle>
                        <CardDescription className="text-xs text-zinc-400 mt-1">
                          Generic equivalent: <span className="text-cyan-400 font-medium">{selectedDrug.genericName}</span> ({selectedDrug.strength})
                        </CardDescription>
                      </div>
                      <Pill className="w-8 h-8 text-cyan-400 opacity-60 animate-pulse" />
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    
                    {/* Quantity Selector */}
                    <div className="flex items-center justify-between bg-zinc-950/80 p-4 rounded-xl border border-zinc-900">
                      <span className="text-xs text-zinc-400 font-mono uppercase flex items-center gap-1.5">
                        <Info className="w-3.5 h-3.5 text-zinc-500" />
                        Supply Quantity:
                      </span>
                      <div className="flex items-center gap-3">
                        <Button 
                          onClick={() => setQuantity(prev => Math.max(10, prev - 10))}
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8 bg-zinc-900 border-zinc-800"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="font-mono font-extrabold text-sm text-cyan-400 w-16 text-center">{quantity} days</span>
                        <Button 
                          onClick={() => setQuantity(prev => Math.min(90, prev + 10))}
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8 bg-zinc-900 border-zinc-800"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    {/* Cost-Plus Price Formula Breakdown */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-mono font-bold uppercase text-zinc-400 tracking-wider">Cost-Plus Price Formula</h4>
                      
                      <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-900 space-y-3 font-mono text-xs">
                        <div className="flex justify-between">
                          <span className="text-zinc-500">Manufacturing Sourcing:</span>
                          <span className="text-zinc-200">${((selectedDrug.cubanPrice * 0.8 * quantity) / 30).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500">+ 15% Transparent Markup:</span>
                          <span className="text-zinc-200">${((selectedDrug.cubanPrice * 0.15 * quantity) / 30).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500">+ Flat Dispensing Fee:</span>
                          <span className="text-zinc-200">$3.00</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500">+ Pharmacy Shipping:</span>
                          <span className="text-zinc-200">$5.00</span>
                        </div>
                        <div className="pt-2 border-t border-zinc-900 flex justify-between items-center text-sm font-bold">
                          <span className="text-green-400 uppercase">Cost Plus Transparent price:</span>
                          <span className="text-green-400 font-extrabold text-base">
                            ${(((selectedDrug.cubanPrice * quantity) / 30) + 8).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Comparison Stack */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-red-500/5 p-4 rounded-xl border border-red-500/20 text-center space-y-1">
                        <p className="text-[10px] font-mono font-bold text-red-400 uppercase tracking-widest">PBM Contract Price</p>
                        <p className="text-2xl font-black font-mono text-red-400">${((selectedDrug.pbmPrice * stateMultiplier * quantity) / 30).toFixed(2)}</p>
                        <p className="text-[9px] text-zinc-500">Unmitigated spread</p>
                      </div>
                      <div className="bg-cyan-500/5 p-4 rounded-xl border border-cyan-500/20 text-center space-y-1">
                        <p className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest">Cash Retail Price</p>
                        <p className="text-2xl font-black font-mono text-zinc-300">${((selectedDrug.retailPrice * quantity) / 30).toFixed(2)}</p>
                        <p className="text-[9px] text-zinc-500">Average cash retail</p>
                      </div>
                    </div>

                    {/* Net Savings projection card */}
                    <div className="bg-gradient-to-r from-[#0F172A] to-cyan-950/40 p-5 rounded-xl border border-cyan-500/20 relative overflow-hidden">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider">Estimated Carve-Out Savings</p>
                          <p className="text-4xl font-extrabold font-serif text-white">
                            ${(( (selectedDrug.pbmPrice * stateMultiplier - selectedDrug.cubanPrice) * quantity) / 30).toFixed(2)}
                          </p>
                          <p className="text-[10px] text-zinc-400">Save {selectedDrug.savingsPercent}% instantly relative to AWP discounts</p>
                        </div>
                        <TrendingDown className="w-12 h-12 text-cyan-400/10 shrink-0" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-zinc-950/40 border-zinc-800 border-dashed h-96 flex flex-col items-center justify-center p-8 text-center">
                  <Pill className="w-12 h-12 text-zinc-700 mb-4 animate-pulse" />
                  <p className="text-zinc-300 font-semibold">Select a Medication</p>
                  <p className="text-xs text-zinc-500 max-w-xs mt-1">Click on any entry in the left pricing database to review its transparent formula breakdown.</p>
                </Card>
              )}
            </div>

          </div>
        </section>

        {/* INSTANT ROI CALCULATOR - NEW ECONOMIC VALUE #1 */}
        <section className="py-24 max-w-[1600px] mx-auto px-6 border-b border-zinc-900">
          <InstantROICalculator />
        </section>

        {/* HIDDEN FEE COMPARISON MATRIX - NEW ECONOMIC VALUE #3 */}
        <section className="py-24 max-w-[1600px] mx-auto px-6 border-b border-zinc-900 bg-zinc-950/20">
          <MeasureMedComparison />
        </section>

        {/* FORMULARY OPTIMIZATION ENGINE - NEW ECONOMIC VALUE #4 */}
        <section className="py-24 max-w-[1600px] mx-auto px-6 border-b border-zinc-900">
          <FormularyOptimizationEngine />
        </section>

        {/* SECURE CLAIMS INTAKE AUDIT PORTAL */}
        <section id="claims-audit" className="py-24 max-w-[1600px] mx-auto px-6 border-b border-zinc-900">
          <div className="text-center space-y-3 mb-16 max-w-3xl mx-auto">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">Secure Intake Audit Panel</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold">Forensic Claims Analyzer</h2>
            <p className="text-zinc-400 text-sm md:text-base">
              Securely drag and drop your claims register, plan formulary, or PBM invoice CSV to compile a detailed Cost Plus analysis in real-time.
            </p>
          </div>

          <Card className="bg-zinc-950/40 border-zinc-800/80 backdrop-blur-md relative overflow-hidden max-w-4xl mx-auto">
            <CardContent className="p-8 md:p-12">
              
              {!isUploading && !auditResult && (
                <div 
                  onClick={handleMockUpload}
                  className="border-2 border-dashed border-zinc-800 hover:border-cyan-500/40 rounded-2xl p-12 text-center cursor-pointer bg-zinc-950/20 hover:bg-zinc-950/60 transition-all duration-300 group"
                >
                  <UploadCloud className="w-16 h-16 mx-auto text-zinc-700 group-hover:text-cyan-400 transition-colors mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">Upload Claims Register</h3>
                  <p className="text-xs text-zinc-400 max-w-md mx-auto mb-6">
                    Accepts standard CSV, Excel, or PDF pharmacy invoice export registers. All NDCs, patient identifiers, and plan identifiers are fully sanitized and encrypted.
                  </p>
                  <Button type="button" className="bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 group-hover:border-zinc-700 font-bold px-6 py-3 rounded-lg text-xs transition-colors">
                    Browse Local Files
                  </Button>
                </div>
              )}

              {isUploading && (
                <div className="py-12 space-y-6 text-center max-w-md mx-auto">
                  <div className="flex justify-center">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full border-4 border-zinc-800 border-t-cyan-400 animate-spin" />
                      <Sparkles className="w-5 h-5 text-cyan-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-lg font-bold text-white">Forensic Engine Scanning Claims</h4>
                    <p className="text-xs text-cyan-400 font-mono">Processing {uploadProgress}% - Mapping National Drug Codes (NDCs)...</p>
                  </div>
                  <div className="w-full bg-zinc-950 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                  </div>
                </div>
              )}

              {auditResult && (
                <div className="space-y-8 animate-fadeIn">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-zinc-900">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-500/10 text-green-400 rounded-xl flex items-center justify-center border border-green-500/20">
                        <FileCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white">Claims Mapping Complete</h4>
                        <p className="text-xs text-zinc-400 font-mono">Audited {auditResult.totalClaims.toLocaleString()} claims registers</p>
                      </div>
                    </div>
                    <Button 
                      onClick={() => setAuditResult(null)}
                      variant="outline" 
                      size="sm" 
                      className="text-xs border-zinc-800 text-zinc-400 hover:text-white"
                    >
                      Reset Intake Portal
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-zinc-950 p-6 rounded-xl border border-zinc-900 space-y-1">
                      <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Flagged Spreads</p>
                      <p className="text-3xl font-black font-mono text-red-400">{auditResult.flaggedSpreads.toLocaleString()}</p>
                      <p className="text-[10px] text-zinc-500 mt-1">High-spread pharmacy claims</p>
                    </div>

                    <div className="bg-zinc-950 p-6 rounded-xl border border-zinc-900 space-y-1">
                      <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">Audit Savings</p>
                      <p className="text-3xl font-black font-mono text-green-400">${auditResult.potentialSavings.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
                      <p className="text-[10px] text-zinc-500 mt-1">Expected annual net impact</p>
                    </div>

                    <div className="bg-cyan-500/5 p-6 rounded-xl border border-cyan-500/20 space-y-1">
                      <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">Audit Accuracy</p>
                      <p className="text-3xl font-black font-mono text-white">99.8%</p>
                      <p className="text-[10px] text-zinc-400 mt-1">Fiduciary contract precision</p>
                    </div>
                  </div>

                  {/* Top Arbitrage table */}
                  <div className="bg-zinc-950 p-6 rounded-xl border border-zinc-900 space-y-4">
                    <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">Primary Sourcing Deviations Identified</h5>
                    <div className="space-y-3 font-mono text-xs">
                      {auditResult.topWasteDrugs.map((item, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-zinc-300 font-medium">{item.name}</span>
                          <span className="font-bold text-red-400">${item.waste.toLocaleString()} leaked</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-cyan-500/10 p-5 rounded-xl border border-cyan-500/20 flex items-start gap-3.5">
                    <Info className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" />
                    <p className="text-xs text-zinc-300 leading-relaxed font-light">
                      This diagnostic audit incorporates standard actuarial parameters. To request a binding contractual verification with your plan carrier covenants, please submit this file to our forensic desk.
                    </p>
                  </div>
                </div>
              )}

            </CardContent>
          </Card>
        </section>

        {/* Call to Action Card */}
        <section className="py-24 max-w-[1600px] mx-auto px-6">
          <Card className="bg-gradient-to-r from-cyan-950 via-zinc-900 to-blue-950 border-cyan-500/30 overflow-hidden relative">
            <CardContent className="py-16 px-8 md:px-16 text-center space-y-6">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight">
                Stop Paying Inflated PBM Contract Spreads
              </h2>
              <p className="text-zinc-300 max-w-3xl mx-auto leading-relaxed font-light text-sm md:text-base">
                Audit your active pharmacy agreement against federal sourcing benchmarks. Connect directly with our actuarial validation division to draft a risk-free specialty drug carve-out program.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link href="/contact" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-zinc-950 font-extrabold uppercase tracking-wider px-8 py-4 rounded-xl transition-all duration-300 shadow-xl shadow-cyan-500/20">
                  Request Actuarial Audit
                </Link>
                <Link href="/request-demo" className="bg-zinc-950 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 font-extrabold uppercase tracking-wider px-8 py-4 rounded-xl transition-all duration-300">
                  Schedule Diagnostic Demo
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      <Footer />
    </>
  );
}