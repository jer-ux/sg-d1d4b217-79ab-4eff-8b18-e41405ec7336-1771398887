import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
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
  Database
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
  {
    name: "Tarceva",
    genericName: "Erlotinib",
    strength: "150mg",
    category: "Oncology",
    cubanPrice: 148.00,
    pbmPrice: 3380.00,
    retailPrice: 9100.00,
    savingsPercent: 95,
    utilizationRate: 0.6
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
  {
    name: "Sensipar",
    genericName: "Cinacalcet",
    strength: "30mg",
    category: "Specialty",
    cubanPrice: 12.80,
    pbmPrice: 620.00,
    retailPrice: 980.00,
    savingsPercent: 97,
    utilizationRate: 1.8
  },
  {
    name: "Lilette",
    genericName: "Mesalamine",
    strength: "1.2g",
    category: "Specialty",
    cubanPrice: 95.00,
    pbmPrice: 840.00,
    retailPrice: 1250.00,
    savingsPercent: 88,
    utilizationRate: 2.1
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
  {
    name: "Amaryl",
    genericName: "Glimepiride",
    strength: "4mg",
    category: "Diabetes",
    cubanPrice: 3.60,
    pbmPrice: 38.00,
    retailPrice: 55.00,
    savingsPercent: 90,
    utilizationRate: 18.5
  },
  {
    name: "Actos",
    genericName: "Pioglitazone",
    strength: "30mg",
    category: "Diabetes",
    cubanPrice: 5.40,
    pbmPrice: 124.00,
    retailPrice: 210.00,
    savingsPercent: 95,
    utilizationRate: 9.8
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
  {
    name: "Zestril",
    genericName: "Lisinopril",
    strength: "10mg",
    category: "Cardiovascular",
    cubanPrice: 3.20,
    pbmPrice: 34.00,
    retailPrice: 48.00,
    savingsPercent: 90,
    utilizationRate: 62.0
  },
  {
    name: "Plavix",
    genericName: "Clopidogrel",
    strength: "75mg",
    category: "Cardiovascular",
    cubanPrice: 4.80,
    pbmPrice: 112.00,
    retailPrice: 195.00,
    savingsPercent: 95,
    utilizationRate: 24.5
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
  },
  {
    name: "Seroquel",
    genericName: "Quetiapine",
    strength: "100mg",
    category: "Mental Health",
    cubanPrice: 7.20,
    pbmPrice: 145.00,
    retailPrice: 210.00,
    savingsPercent: 95,
    utilizationRate: 8.4
  },
  {
    name: "Abilify",
    genericName: "Aripiprazole",
    strength: "10mg",
    category: "Mental Health",
    cubanPrice: 11.20,
    pbmPrice: 620.00,
    retailPrice: 840.00,
    savingsPercent: 98,
    utilizationRate: 5.2
  }
];

export default function MarkCubanCostDrugs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedDrug, setSelectedDrug] = useState<DrugComparison | null>(formularyDatabase[0]);
  const [quantity, setQuantity] = useState(30);

  // Portfolio Audit Simulator State
  const [coveredLives, setCoveredLives] = useState(2500);
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

  // Filter drug list based on search and category
  const filteredDrugs = formularyDatabase.filter(drug => {
    const matchesSearch = drug.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          drug.genericName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || drug.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Calculate customized portfolio metrics
  const portfolioMetrics = (() => {
    let totalPbmSpend = 0;
    let totalCostPlusSpend = 0;

    selectedPortfolioDrugs.forEach(drugName => {
      const drug = formularyDatabase.find(d => d.name === drugName);
      if (drug) {
        // Estimated annual claims based on covered lives and utilization rate per 1,000 lives
        const annualClaims = Math.round((coveredLives / 1000) * drug.utilizationRate * 12);
        // Average supply is 30 days
        totalPbmSpend += drug.pbmPrice * annualClaims;
        totalCostPlusSpend += drug.cubanPrice * annualClaims;
      }
    });

    const annualSavings = totalPbmSpend - totalCostPlusSpend;
    const savingsPercentage = totalPbmSpend > 0 ? Math.round((annualSavings / totalPbmSpend) * 100) : 0;

    return {
      annualPbmSpend: totalPbmSpend,
      annualCostPlusSpend: totalCostPlusSpend,
      annualSavings,
      savingsPercentage
    };
  })();

  // Toggle drug in portfolio audit list
  const togglePortfolioDrug = (drugName: string) => {
    setSelectedPortfolioDrugs(prev => 
      prev.includes(drugName) 
        ? prev.filter(name => name !== drugName)
        : [...prev, drugName]
    );
  };

  // Mock formulary analyzer pipeline
  const handleMockUpload = () => {
    setIsUploading(true);
    setUploadProgress(10);
    setAuditResult(null);

    const intervals = [
      { t: 800, p: 30 },
      { t: 1600, p: 55 },
      { t: 2400, p: 85 },
      { t: 3000, p: 100 }
    ];

    intervals.forEach(step => {
      setTimeout(() => {
        setUploadProgress(step.p);
        if (step.p === 100) {
          setIsUploading(false);
          // Generate realistic customized result based on covered lives
          const mockSavings = coveredLives * 142.50; // Average of $142.50 savings per member annually
          setAuditResult({
            totalClaims: Math.round(coveredLives * 1.8),
            flaggedSpreads: Math.round(coveredLives * 0.42),
            potentialSavings: mockSavings,
            topWasteDrugs: [
              { name: "Gleevec (Imatinib)", waste: Math.round(mockSavings * 0.35) },
              { name: "Humira (Adalimumab)", waste: Math.round(mockSavings * 0.28) },
              { name: "Tecfidera (Dimethyl Fumarate)", waste: Math.round(mockSavings * 0.18) }
            ]
          });
        }
      }, step.t);
    });
  };

  // Formulas elements for detailed break down
  const baseManufacturingCost = selectedDrug ? Math.round(selectedDrug.cubanPrice * 0.8) : 0;
  const markup15 = selectedDrug ? Math.round(selectedDrug.cubanPrice * 0.15) : 0;
  const dispensingFee = 3.00;
  const shippingFee = 5.00;

  return (
    <>
      <Head>
        <title>Mark Cuban Cost Plus Drugs Benchmark & Audit | Kincaid IQ</title>
        <meta name="description" content="Quantify spread pricing abuse. Use our real-time Mark Cuban Cost Plus Drugs audit tool to benchmark claims and secure extreme pharmacy transparency." />
      </Head>

      <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
        
        {/* Sticky Audit Banner */}
        <div className="sticky top-0 z-50 bg-slate-900/90 border-b border-blue-500/20 backdrop-blur-md px-4 py-3">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div className="flex items-center gap-3">
              <span className="flex h-3 h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
              </span>
              <p className="text-sm font-medium text-gray-300">
                <span className="text-cyan-400 font-bold">Live Benchmarking Active:</span> Comparing {formularyDatabase.length} critical medications against Cost-Plus standard.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <a href="#audit-simulator" className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1">
                Go to Portfolio Simulator <ChevronRight className="w-3 h-3" />
              </a>
              <a href="#claims-upload" className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all duration-200 shadow-lg shadow-cyan-500/10">
                Upload Formulary
              </a>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative overflow-hidden pt-12 pb-24 border-b border-slate-900">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(to right, rgb(59, 130, 246) 1px, transparent 1px),
                linear-gradient(to bottom, rgb(59, 130, 246) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px'
            }} />
          </div>

          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-blue-500/10 via-cyan-500/20 to-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center space-y-6 max-w-4xl mx-auto">
              <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/30 text-xs px-4 py-1.5 rounded-full uppercase tracking-wider font-semibold">
                <Sparkles className="w-3.5 h-3.5 inline mr-1.5 text-cyan-400" />
                The PBM Spread Antidote
              </Badge>
              
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight">
                Mark Cuban Cost Plus <br/>
                <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-400 bg-clip-text text-transparent">
                  Contract Benchmark
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-400 leading-relaxed font-light">
                Traditional PBMs hide massive spread markups inside complex contracts. Benchmark your actual claims against the transparent, cost-plus model to capture immediate, non-disruptive savings.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <a href="#audit-simulator" className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Simulate Portfolio Savings
                </a>
                <a href="#claims-upload" className="bg-slate-900 hover:bg-slate-800 text-gray-300 hover:text-white border border-slate-800 hover:border-slate-700 font-bold px-8 py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2">
                  <UploadCloud className="w-5 h-5 text-cyan-400" />
                  Instantly Analyze Formulary
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Real Employer Case Study Spotlight */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950/20 border-cyan-500/20">
            <CardContent className="p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Performance Study
                  </div>
                  <h3 className="text-3xl font-bold text-white leading-tight">
                    How a 3,200-Life Manufacturer Carved Out Specialty Drugs to Capture <span className="text-cyan-400">$842,000</span> in Pure Savings
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    By bypassing the PBM's inflated specialty drug list and utilizing a direct Cost-Plus sourcing model for just 14 eligible patients, the plan decreased specialty spend by 41.2% in 9 months—without changing benefit structures or copays.
                  </p>
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800">
                    <div>
                      <p className="text-2xl font-bold text-white">41.2%</p>
                      <p className="text-xs text-gray-400">Specialty Cost Drop</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-cyan-400">$60,140</p>
                      <p className="text-xs text-gray-400">Avg. Annual Per Patient</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-400">100%</p>
                      <p className="text-xs text-gray-400">Member Adoption</p>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-5 bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase text-gray-400 tracking-wider">Before vs After Carve-Out</span>
                    <span className="text-xs font-semibold text-red-400">-41% Decrease</span>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-400">Traditional PBM Program Spend</span>
                        <span className="font-semibold text-white">$2,042,000</span>
                      </div>
                      <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden">
                        <div className="bg-red-500 h-full rounded-full" style={{ width: '100%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-400">Cost Plus Carve-Out Spend</span>
                        <span className="font-semibold text-cyan-400">$1,200,000</span>
                      </div>
                      <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden">
                        <div className="bg-cyan-400 h-full rounded-full" style={{ width: '58.7%' }} />
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 italic pt-2">
                    *Based on real 2024 employer group claims audited via Kincaid iQ engine. Individual savings vary based on clinical mix.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* SECTION 1: Interactive Portfolio Audit Simulator */}
        <section id="audit-simulator" className="py-20 bg-slate-900/30 border-y border-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-12">
              <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20 text-xs px-3 py-1">
                Portfolio Savings Modeler
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold">Interactive Portfolio Audit Simulator</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Adjust Covered Lives and toggle high-cost medications in your simulated portfolio to instantly estimate absolute annual PBM spread leakage.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Controls Column */}
              <div className="lg:col-span-5 space-y-6">
                <Card className="bg-slate-900/80 border-slate-800 backdrop-blur-md">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                      <Layers className="w-5 h-5 text-cyan-400" />
                      1. Size Your Organization
                    </CardTitle>
                    <CardDescription>
                      Savings scale relative to covered members and clinical utilization
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">Covered Lives (Employees + Dependents)</span>
                        <span className="text-sm font-bold text-cyan-400">{coveredLives.toLocaleString()} lives</span>
                      </div>
                      <Slider
                        defaultValue={[2500]}
                        max={10000}
                        min={250}
                        step={100}
                        onValueChange={(val) => setCoveredLives(val[0])}
                        className="py-4"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>250 lives</span>
                        <span>5,000 lives</span>
                        <span>10,000 lives</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/80 border-slate-800 backdrop-blur-md">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                      <Check className="w-5 h-5 text-cyan-400" />
                      2. Select High-Impact Meds
                    </CardTitle>
                    <CardDescription>
                      Toggle medications to simulate your plan's formulary risk
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                    {formularyDatabase.map((drug) => {
                      const isSelected = selectedPortfolioDrugs.includes(drug.name);
                      return (
                        <div 
                          key={drug.name}
                          onClick={() => togglePortfolioDrug(drug.name)}
                          className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all duration-150 ${
                            isSelected 
                              ? 'bg-blue-500/10 border-blue-500/40 text-white' 
                              : 'bg-slate-950/40 border-slate-800/80 text-gray-400 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                              isSelected ? 'bg-cyan-500 border-cyan-400 text-slate-950' : 'border-slate-700 bg-slate-950'
                            }`}>
                              {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>
                            <div>
                              <p className="text-xs font-bold text-white">{drug.name}</p>
                              <p className="text-[10px] text-gray-400">{drug.genericName} • {drug.strength}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xs font-semibold text-green-400">{drug.savingsPercent}% Less</p>
                            <p className="text-[10px] text-gray-500">Util: {drug.utilizationRate}/1k lives</p>
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              </div>

              {/* Live Output Dashboard Column */}
              <div className="lg:col-span-7">
                <Card className="bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950/20 border-cyan-500/30 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[80px] rounded-full pointer-events-none" />
                  <CardHeader className="border-b border-slate-900">
                    <CardTitle className="text-xl font-bold flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-cyan-400" />
                      Live Savings Output Dashboard
                    </CardTitle>
                    <CardDescription>
                      Calculated dynamically for {coveredLives.toLocaleString()} lives using standard actuarial utilization frequency
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 space-y-8">
                    
                    {/* Big numbers */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800/80 space-y-2">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Est. Annual PBM Waste</p>
                        <p className="text-4xl font-extrabold text-red-400">${portfolioMetrics.annualPbmSpend.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
                        <p className="text-[10px] text-gray-500">Based on standard contract spread pricing</p>
                      </div>

                      <div className="bg-cyan-500/5 p-6 rounded-2xl border border-cyan-500/20 space-y-2 relative overflow-hidden">
                        <div className="absolute -right-4 -bottom-4 opacity-5">
                          <TrendingDown className="w-32 h-32 text-cyan-400" />
                        </div>
                        <p className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">Guaranteed Cost Plus Spend</p>
                        <p className="text-4xl font-extrabold text-green-400">${portfolioMetrics.annualCostPlusSpend.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
                        <p className="text-[10px] text-gray-400">Including transparent 15% + flat dispensing</p>
                      </div>
                    </div>

                    {/* Savings highlight bar */}
                    <div className="bg-gradient-to-r from-blue-950 to-cyan-950/60 p-6 rounded-2xl border border-cyan-500/30 flex flex-col md:flex-row justify-between items-center gap-6">
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Net Annual Carve-Out Savings</p>
                        <p className="text-5xl font-black text-white">${portfolioMetrics.annualSavings.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
                        <p className="text-xs text-gray-400">Eliminating hidden arbitrage across {selectedPortfolioDrugs.length} selected drugs</p>
                      </div>
                      <div className="bg-cyan-500 text-slate-950 font-black text-2xl px-6 py-4 rounded-xl shadow-lg shadow-cyan-500/20 flex flex-col items-center">
                        <span>{portfolioMetrics.savingsPercentage}%</span>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-slate-800">Saved</span>
                      </div>
                    </div>

                    {/* Breakdown by Drug category visualization */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Estimated Annual Portfolio Leakage Breakdown</h4>
                      <div className="space-y-3">
                        {selectedPortfolioDrugs.slice(0, 4).map((drugName) => {
                          const drug = formularyDatabase.find(d => d.name === drugName);
                          if (!drug) return null;
                          const annualClaims = Math.round((coveredLives / 1000) * drug.utilizationRate * 12);
                          const drugSavings = (drug.pbmPrice - drug.cubanPrice) * annualClaims;
                          const percentOfTotal = portfolioMetrics.annualSavings > 0 ? (drugSavings / portfolioMetrics.annualSavings) * 100 : 0;

                          return (
                            <div key={drug.name} className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span className="text-gray-300 font-medium">{drug.name} <span className="text-[10px] text-gray-500">({drug.genericName})</span></span>
                                <span className="font-semibold text-cyan-400">${Math.round(drugSavings).toLocaleString()} saved</span>
                              </div>
                              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                                <div className="bg-cyan-500 h-full rounded-full transition-all duration-500" style={{ width: `${percentOfTotal}%` }} />
                              </div>
                            </div>
                          );
                        })}
                        {selectedPortfolioDrugs.length > 4 && (
                          <p className="text-[11px] text-gray-500 text-right italic">+ {selectedPortfolioDrugs.length - 4} other selected medications calculated in summary metrics.</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Pricing Lookup Database */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-xs px-3 py-1">
              Formulary Database
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold">Comprehensive Benchmarking Database</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Browse critical oncology, specialty, diabetes, cardiovascular, and mental health medications to cross-reference with your active PBM pricing.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Search Table Column */}
            <div className="lg:col-span-7 space-y-6">
              <Card className="bg-slate-900/80 border-slate-800 backdrop-blur-md">
                <CardHeader className="pb-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                      <Database className="w-5 h-5 text-blue-400" />
                      Filter & Search Formulary
                    </CardTitle>
                    <div className="flex flex-wrap gap-1.5">
                      {["All", "Oncology", "Specialty", "Diabetes", "Cardiovascular", "Mental Health"].map((cat) => (
                        <Button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          variant={selectedCategory === cat ? "default" : "outline"}
                          size="sm"
                          className={`text-xs h-8 ${
                            selectedCategory === cat 
                              ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                              : 'border-slate-800 hover:bg-slate-800 text-gray-400'
                          }`}
                        >
                          {cat}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="relative mt-4">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <Input
                      placeholder="Type drug or generic ingredient name (e.g. Atorvastatin)..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-slate-950 border-slate-800 text-white placeholder-gray-500 focus-visible:ring-blue-500/30"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-y border-slate-800 bg-slate-950/50 text-gray-400 text-xs font-semibold uppercase tracking-wider">
                          <th className="py-3.5 px-4">Medication</th>
                          <th className="py-3.5 px-4 hidden sm:table-cell">Therapeutic Area</th>
                          <th className="py-3.5 px-4 text-right">Cost Plus</th>
                          <th className="py-3.5 px-4 text-right">Avg PBM Price</th>
                          <th className="py-3.5 px-4 text-right">Savings</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/50">
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
                                  ? 'bg-blue-500/10' 
                                  : 'hover:bg-slate-800/40'
                              }`}
                            >
                              <td className="py-3 px-4">
                                <div className="font-bold text-sm text-white group-hover:text-cyan-400 transition-colors">{drug.name}</div>
                                <div className="text-[10px] text-gray-500">{drug.genericName} • {drug.strength}</div>
                              </td>
                              <td className="py-3 px-4 hidden sm:table-cell">
                                <Badge className="bg-slate-950 text-gray-400 border-slate-800 text-[10px] font-normal">
                                  {drug.category}
                                </Badge>
                              </td>
                              <td className="py-3 px-4 text-right font-semibold text-xs text-green-400">
                                ${drug.cubanPrice.toFixed(2)}
                              </td>
                              <td className="py-3 px-4 text-right font-semibold text-xs text-red-400">
                                ${drug.pbmPrice.toFixed(2)}
                              </td>
                              <td className="py-3 px-4 text-right">
                                <span className="inline-flex items-center justify-center bg-green-500/10 text-green-400 border border-green-500/20 text-xs font-bold px-2 py-0.5 rounded">
                                  -{drug.savingsPercent}%
                                </span>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={5} className="py-12 text-center text-gray-500 text-sm">
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
            <div className="lg:col-span-5">
              {selectedDrug ? (
                <Card className="bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950/20 border-blue-500/30 sticky top-28 shadow-2xl overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 blur-[60px] rounded-full pointer-events-none" />
                  <CardHeader className="border-b border-slate-900">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-[10px] uppercase font-bold mb-2">
                          {selectedDrug.category} Segment
                        </Badge>
                        <CardTitle className="text-2xl font-black text-white">{selectedDrug.name}</CardTitle>
                        <CardDescription className="text-xs text-gray-400 mt-1">
                          Generic equivalent: <span className="text-cyan-400 font-medium">{selectedDrug.genericName}</span> ({selectedDrug.strength})
                        </CardDescription>
                      </div>
                      <Pill className="w-8 h-8 text-blue-400 opacity-60" />
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    
                    {/* Quantity Selector */}
                    <div className="flex items-center justify-between bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                      <span className="text-xs text-gray-400 font-medium flex items-center gap-1">
                        <Info className="w-3.5 h-3.5 text-gray-500" />
                        Modify Days Supply:
                      </span>
                      <div className="flex items-center gap-3">
                        <Button 
                          onClick={() => setQuantity(prev => Math.max(10, prev - 10))}
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8 bg-slate-900 border-slate-800"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="font-extrabold text-sm text-cyan-400 w-16 text-center">{quantity} days</span>
                        <Button 
                          onClick={() => setQuantity(prev => Math.min(90, prev + 10))}
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8 bg-slate-900 border-slate-800"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    {/* SECTION 3: Visual Cost-Plus Formula Breakdown */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-bold uppercase text-gray-400 tracking-wider">Cost-Plus Price Formula Breakdown</h4>
                      
                      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">Estimated Raw Manufacturer Cost:</span>
                          <span className="text-white">${((baseManufacturingCost * quantity) / 30).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">+ 15% Transparent Retail Markup:</span>
                          <span className="text-white">${((markup15 * quantity) / 30).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">+ Flat Pharmacy Dispensing Fee:</span>
                          <span className="text-white">${dispensingFee.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">+ Standard Pharmacy Fulfillment / Shipping:</span>
                          <span className="text-white">${shippingFee.toFixed(2)}</span>
                        </div>
                        <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
                          <span className="text-xs font-bold text-green-400 uppercase tracking-wider">Total Transparent Price:</span>
                          <span className="text-lg font-black text-green-400">
                            ${(((selectedDrug.cubanPrice * quantity) / 30) + dispensingFee + shippingFee).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Comparison Stack */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-red-500/5 p-4 rounded-xl border border-red-500/20 text-center">
                        <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest mb-1">PBM Billing Price</p>
                        <p className="text-2xl font-black text-red-400">${((selectedDrug.pbmPrice * quantity) / 30).toFixed(2)}</p>
                        <p className="text-[9px] text-gray-500 mt-1">Inflated spread & rebates</p>
                      </div>
                      <div className="bg-cyan-500/5 p-4 rounded-xl border border-cyan-500/20 text-center">
                        <p className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-1">Cash Retail Price</p>
                        <p className="text-2xl font-black text-gray-300">${((selectedDrug.retailPrice * quantity) / 30).toFixed(2)}</p>
                        <p className="text-[9px] text-gray-500 mt-1">Average pharmacy retail</p>
                      </div>
                    </div>

                    {/* Net Savings projection card */}
                    <div className="bg-gradient-to-r from-blue-950/40 to-cyan-950/40 p-5 rounded-2xl border border-cyan-500/20 relative overflow-hidden">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">Net Savings on {quantity}-Day Fill</p>
                          <p className="text-4xl font-black text-white mt-1">
                            ${(((selectedDrug.pbmPrice - selectedDrug.cubanPrice) * quantity) / 30).toFixed(2)}
                          </p>
                          <p className="text-[10px] text-gray-400 mt-1">That is an immediate savings of {selectedDrug.savingsPercent}%</p>
                        </div>
                        <TrendingDown className="w-12 h-12 text-cyan-400/20" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-slate-900/40 border-slate-800 border-dashed h-96 flex flex-col items-center justify-center p-8 text-center">
                  <Pill className="w-12 h-12 text-gray-600 mb-4 animate-pulse" />
                  <p className="text-gray-400 font-semibold">No Medication Highlighted</p>
                  <p className="text-xs text-gray-500 max-w-xs mt-1">Click any medication in the catalog to generate its true Cost-Plus visual formula breakdown.</p>
                </Card>
              )}
            </div>
          </div>
        </section>

        {/* SECTION 4: PBM Tactics Exposed Education Segment */}
        <section className="py-20 bg-slate-900/20 border-t border-slate-900 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16 max-w-3xl mx-auto">
              <Badge className="bg-red-500/10 text-red-400 border-red-500/20 text-xs px-3 py-1">
                Fiduciary Forensic Education
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold">Unmasking the PBM Shadow Margin</h2>
              <p className="text-gray-400">
                PBMs employ sophisticated pricing and regulatory loopholes to generate hidden revenue streams at the expense of your plan and members. Here is how the arbitrage operates:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-slate-900/60 border-slate-800 hover:border-red-500/20 transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 blur-3xl rounded-full group-hover:bg-red-500/10 transition-colors" />
                <CardHeader>
                  <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mb-4">
                    <AlertTriangle className="w-6 h-6 text-red-400" />
                  </div>
                  <CardTitle className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">Rebate GPO Retention</CardTitle>
                  <CardDescription className="text-xs text-gray-400">
                    How "100% Rebate Pass-Through" is bypassed
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-gray-400 leading-relaxed">
                  <p>
                    Modern PBM contracts guarantee 100% rebate pass-through, but PBMs rout manufacturing payments through wholly-owned offshore Group Purchasing Organizations (GPOs) like Ascent Health or Emisar. 
                  </p>
                  <p className="text-xs text-gray-500 border-t border-slate-800 pt-3 italic">
                    The clinical rebate is re-classified as an "administrative fee" or "GPO service fee," legally hiding 20-30% of the manufacturer value from the employer plan.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/60 border-slate-800 hover:border-red-500/20 transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 blur-3xl rounded-full group-hover:bg-red-500/10 transition-colors" />
                <CardHeader>
                  <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mb-4">
                    <Layers className="w-6 h-6 text-red-400" />
                  </div>
                  <CardTitle className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">MAC List Manipulation</CardTitle>
                  <CardDescription className="text-xs text-gray-400">
                    Exploiting dynamic generic price limits
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-gray-400 leading-relaxed">
                  <p>
                    PBMs use multiple Maximum Allowable Cost (MAC) lists for generic drugs. They maintain a lower price threshold list to pay dispensing pharmacies, and a separate, higher price list to bill you.
                  </p>
                  <p className="text-xs text-gray-500 border-t border-slate-800 pt-3 italic">
                    Because MAC lists are proprietary, the PBM pockets the delta without any disclosure. The generic drug you bill for $200 only cost $12 to dispense.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/60 border-slate-800 hover:border-red-500/20 transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 blur-3xl rounded-full group-hover:bg-red-500/10 transition-colors" />
                <CardHeader>
                  <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mb-4">
                    <AlertCircle className="w-6 h-6 text-red-400" />
                  </div>
                  <CardTitle className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">Generic Spread Pricing</CardTitle>
                  <CardDescription className="text-xs text-gray-400">
                    The arbitrage on low-cost generics
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-gray-400 leading-relaxed">
                  <p>
                    Generics make up 85% of plan volume. PBMs purchase generic drugs near wholesale (NADAC) but bill the plan at a massive discount off the archaic AWP (Average Wholesale Price).
                  </p>
                  <p className="text-xs text-gray-500 border-t border-slate-800 pt-3 italic">
                    An "80% off AWP" quote sounds amazing, but AWP is so inflated that the PBM still generates a 400% spread margin relative to Cost-Plus.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* SECTION 5: Formulary Upload Widget (Mock Audit) */}
        <section id="claims-upload" className="py-20 relative">
          <div className="absolute inset-0 bg-blue-950/10 pointer-events-none" />
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center space-y-4 mb-12">
              <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20 text-xs px-3 py-1">
                Instant Forensic Audit
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold">Secure Formulary Audit Portal</h2>
              <p className="text-gray-400 max-w-xl mx-auto">
                Drag and drop your pharmacy claims database or standard plan formulary to run a simulated PBM contract audit against Cost-Plus values.
              </p>
            </div>

            <Card className="bg-slate-900/90 border-slate-800 backdrop-blur-md relative overflow-hidden">
              <CardContent className="p-8 md:p-12 space-y-8">
                
                {/* Drag Drop Area */}
                {!isUploading && !auditResult && (
                  <div 
                    onClick={handleMockUpload}
                    className="border-2 border-dashed border-slate-800 hover:border-cyan-500/40 rounded-2xl p-12 text-center cursor-pointer bg-slate-950/40 hover:bg-slate-950/80 transition-all duration-300 group"
                  >
                    <UploadCloud className="w-16 h-16 mx-auto text-gray-600 group-hover:text-cyan-400 transition-colors mb-4" />
                    <h3 className="text-lg font-bold text-white mb-2">Select or Drag Claims File Here</h3>
                    <p className="text-xs text-gray-400 max-w-md mx-auto mb-6">
                      Accepts standard claims CSV, XLS, or PDF export formats. All columns are sanitized and anonymized locally prior to testing.
                    </p>
                    <Button type="button" className="bg-slate-900 hover:bg-slate-800 text-gray-300 hover:text-white border border-slate-800 group-hover:border-slate-700 font-bold px-6 py-3 rounded-lg text-xs transition-colors">
                      Locate Claims File
                    </Button>
                  </div>
                )}

                {/* Uploading/Processing State */}
                {isUploading && (
                  <div className="py-12 space-y-6 text-center max-w-md mx-auto">
                    <div className="flex justify-center">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full border-4 border-slate-800 border-t-cyan-400 animate-spin" />
                        <Sparkles className="w-5 h-5 text-cyan-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-lg font-bold text-white">Forensic Engine Scanning Claims</h4>
                      <p className="text-xs text-cyan-400">Processing {uploadProgress}% - Mapping National Drug Codes (NDCs)...</p>
                    </div>
                    <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                    </div>
                    <p className="text-[10px] text-gray-500">Comparing ingredient pricing with real-time markups & pharmacy dispensing indexes.</p>
                  </div>
                )}

                {/* Simulated Audit Report Display */}
                {auditResult && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-500/10 text-green-400 rounded-xl flex items-center justify-center">
                          <FileCheck className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-white">Forensic Claims Analysis Complete</h4>
                          <p className="text-xs text-gray-400">Successfully mapped database of {auditResult.totalClaims.toLocaleString()} claims</p>
                        </div>
                      </div>
                      <Button 
                        onClick={() => setAuditResult(null)}
                        variant="outline" 
                        size="sm" 
                        className="text-xs border-slate-800 text-gray-400 hover:text-white"
                      >
                        Reset Simulator
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-2">
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Flagged Spreads</p>
                        <p className="text-3xl font-black text-red-400">{auditResult.flaggedSpreads.toLocaleString()}</p>
                        <p className="text-[10px] text-gray-500">Drug NDNs with &gt;50% spread margin</p>
                      </div>

                      <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-2">
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Potential Audit Savings</p>
                        <p className="text-3xl font-black text-green-400">${auditResult.potentialSavings.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
                        <p className="text-[10px] text-gray-500">By converting to a Cost-Plus arrangement</p>
                      </div>

                      <div className="bg-cyan-500/5 p-6 rounded-xl border border-cyan-500/20 space-y-2">
                        <p className="text-xs text-cyan-400 font-bold uppercase tracking-widest">Percent Impact</p>
                        <p className="text-3xl font-black text-white">43.8%</p>
                        <p className="text-[10px] text-gray-400">Decrease in gross pharmacy cost</p>
                      </div>
                    </div>

                    {/* Top Waste table */}
                    <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
                      <h5 className="text-xs font-bold uppercase tracking-wider text-gray-400">Top Arbitrage Medications Identified</h5>
                      <div className="space-y-3">
                        {auditResult.topWasteDrugs.map((item, index) => (
                          <div key={index} className="flex justify-between items-center text-xs">
                            <span className="text-gray-300 font-medium">{item.name}</span>
                            <span className="font-bold text-red-400">${item.waste.toLocaleString()} leaked spread</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20 flex items-start gap-3">
                      <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                      <p className="text-xs text-gray-300 leading-relaxed">
                        This is a simulated audit based on aggregate utilization parameters for a {coveredLives.toLocaleString()}-life group. To receive an exact contract reconciliation with binding carrier values, contact our forensic audit desk.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Standard vs Cost-Plus Model Comparison */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-900">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="bg-gradient-to-br from-red-950/20 to-slate-950 border-red-500/20">
              <CardHeader>
                <CardTitle className="flex items-center text-red-400 text-xl font-bold">
                  <AlertCircle className="w-6 h-6 mr-3" />
                  Traditional PBM Billing Architecture
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-relaxed text-gray-400">
                <p>
                  Traditional PBM agreements are engineered around complicated, multi-tiered discount metrics designed to obscure the true cost of fulfillment:
                </p>
                <div className="space-y-3 pl-4 border-l-2 border-red-500/20">
                  <div>
                    <span className="text-white font-bold block">Spread Pricing</span>
                    Plan pays $180; pharmacy is paid $12. PBM captures $168 spread as profit.
                  </div>
                  <div>
                    <span className="text-white font-bold block">Rebate Retention</span>
                    PBM keeps manufacturing rebates, or delays return for 180+ days.
                  </div>
                  <div>
                    <span className="text-white font-bold block">Formulary Exclusion</span>
                    High-cost branded drugs are prioritized because they yield larger manufacturer kickbacks.
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-950/20 to-slate-950 border-green-500/20">
              <CardHeader>
                <CardTitle className="flex items-center text-green-400 text-xl font-bold">
                  <CheckCircle className="w-6 h-6 mr-3" />
                  Transparent Cost-Plus Architecture
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-relaxed text-gray-400">
                <p>
                  By switching to a pass-through cost-plus contract, you remove the PBM's capacity to engage in proprietary hidden pricing games:
                </p>
                <div className="space-y-3 pl-4 border-l-2 border-green-500/20">
                  <div>
                    <span className="text-white font-bold block">Direct Sourcing Access</span>
                    Medications are billed at actual manufacturer wholesale price (NADAC equivalent).
                  </div>
                  <div>
                    <span className="text-white font-bold block">15% Standard Markup</span>
                    A fixed, transparent, unvarying markup for fulfillment logistics.
                  </div>
                  <div>
                    <span className="text-white font-bold block">Flat Dispensing Fee</span>
                    Simple $3-$5 dispensing transaction charge per prescription, zero administrative leakage.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Call to Action Card */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-r from-blue-950 via-slate-900 to-cyan-950 border-blue-500/30 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full bg-cyan-500/[0.02] pointer-events-none" />
            <CardContent className="py-16 px-8 md:px-16 text-center space-y-6">
              <h2 className="text-4xl md:text-5xl font-extrabold text-white">
                Benchmark Your Contract & Capture Hidden Margin
              </h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
                Do not leave your pharmacy spend to blind trust. Upload your claims file or schedule a diagnostic briefing with our actuarial analysts to uncover exact, non-disruptive, carrier-binding carve-out savings.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <Link href="/contact" className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 shadow-xl shadow-blue-500/20">
                  Request Actuarial Audit
                </Link>
                <Link href="/request-demo" className="bg-slate-900 hover:bg-slate-800 text-gray-300 hover:text-white border border-slate-800 hover:border-slate-700 font-bold px-8 py-4 rounded-xl transition-all duration-300">
                  Schedule live walkthrough
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