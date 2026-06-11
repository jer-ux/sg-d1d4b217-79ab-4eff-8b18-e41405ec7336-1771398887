import Head from "next/head";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SEO } from "@/components/SEO";
import {
  FileText, Shield, TrendingUp, CheckCircle2, Activity, ArrowRight,
  Building2, Database, BarChart3, Award, AlertTriangle, Clock,
  DollarSign, Percent, ChevronRight, Check, X, Layers, Eye, Info
} from "lucide-react";
import { ExecutiveWarRoom } from "@/components/warroom/ExecutiveWarRoom";
import { BadgeDetailSystem } from "@/components/home/BadgeDetailSystem";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";

const mockAudits = [
  { company: "Midwest Logistics", lives: 420, issue: "Generic Spread Markup", savings: "$142,500", severity: "high" },
  { company: "Apparel Retailer", lives: 1250, issue: "Rebate GPO Retained", savings: "$684,000", severity: "critical" },
  { company: "Tech Solutions", lives: 310, issue: "Specialty Coupon Exclusion", savings: "$94,200", severity: "medium" },
  { company: "Northeast Manufacturing", lives: 2800, issue: "MAC List Overcharges", savings: "$1,120,400", severity: "critical" },
  { company: "Southwest Healthcare", lives: 850, issue: "Non-Fid Commission Skimming", savings: "$322,000", severity: "high" }
];

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [auditIndex, setAuditIndex] = useState(0);
  const [activePlaygroundTab, setActivePlaygroundTab] = useState<"calculator" | "costplus" | "risk">("calculator");
  
  const [calcLives, setCalcLives] = useState(500);
  const [calcSpend, setCalcSpend] = useState(3000000);
  const [calcSpread, setCalcSpread] = useState(25);

  const [selectedSpecialtyDrug, setSelectedSpecialtyDrug] = useState("Imatinib");
  const specialtyDrugs: Record<string, { brand: string; pbm: number; costplus: number; indication: string }> = {
    "Imatinib": { brand: "Gleevec (Cancer)", pbm: 8200, costplus: 140, indication: "Oncology" },
    "Abiraterone": { brand: "Zytiga (Prostate)", pbm: 6400, costplus: 185, indication: "Oncology" },
    "Emtricitabine": { brand: "Truvada (HIV)", pbm: 1800, costplus: 45, indication: "Specialty" },
    "Teriflunomide": { brand: "Aubagio (MS)", pbm: 7100, costplus: 90, indication: "Neurology" }
  };

  const [riskLives, setRiskRiskLives] = useState(1200);
  const [riskTrend, setRiskTrend] = useState(14);

  const [hoveredLeakage, setHoveredLeakage] = useState<string | null>(null);

  const [selectedBadge, setSelectedBadge] = useState<"receipts" | "ebitda" | "verification" | "trust" | "immutable" | null>(null);
  const [badgeLevel, setBadgeLevel] = useState(1);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setAuditIndex((prev) => (prev + 1) % mockAudits.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const estimatedSpreadLeakage = (calcSpend * (calcSpread / 100));
  const estimatedPbmSavings = estimatedSpreadLeakage * 0.85;
  const pmpmSavings = (estimatedPbmSavings / calcLives) / 12;

  const currentDrugData = specialtyDrugs[selectedSpecialtyDrug];
  const drugSavings = currentDrugData.pbm - currentDrugData.costplus;
  const drugSavingsPercent = ((drugSavings / currentDrugData.pbm) * 100).toFixed(0);

  const totalCost = riskLives * 11500;
  const rawTrendCost = totalCost * (riskTrend / 100);
  const optimizedTrendCost = totalCost * 0.035;
  const actuarialSavings = rawTrendCost - optimizedTrendCost;

  const handleBadgeClick = (badgeType: "receipts" | "ebitda" | "verification" | "trust" | "immutable") => {
    setSelectedBadge(badgeType);
    setBadgeLevel(1);
  };

  const handleNextLevel = () => {
    setBadgeLevel((prev) => prev + 1);
  };

  const handleBadgeClose = () => {
    setSelectedBadge(null);
    setBadgeLevel(1);
  };

  return (
    <>
      <SEO 
        title="Kincaid IQ - Fiduciary Healthcare Intelligence & PBM Overcharge Forensics"
        description="Eliminate PBM spread pricing, hidden commissions, and rebate leakage. Recover 20-35% of your annual prescription benefit spend with certified fiduciary proof."
      />
      
      <Nav />
      
      <div className="min-h-screen bg-[#0F1419] text-neutral-100 selection:bg-[#B8860B]/20 overflow-x-hidden font-sans">

        <section className="relative min-h-screen pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto flex items-center">
          <div className="grid lg:grid-cols-12 gap-16 items-center w-full">
            
            <div className="lg:col-span-7 space-y-8">
              
              <div className="inline-flex items-center gap-2 bg-[#1A3A52]/20 border border-[#1A3A52] rounded px-4 py-2 text-xs font-mono text-[#B8860B] uppercase tracking-wider">
                <Shield className="h-4 w-4" />
                ERISA Fiduciary Standard Governed
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight leading-[1.1] text-white">
                Is your PBM expert serving your best interest, or theirs?
              </h1>

              <p className="text-xl text-neutral-300 max-w-2xl leading-relaxed font-normal">
                You are legally required to have a strict fiduciary for your 401(k) retirement plan. Why should your multi-million dollar pharmacy benefit plan be any different? We forensic audit PBM contracts, uncover hidden spreads, and guarantee results.
              </p>

              <div className="border border-[#2A3F54] bg-[#151B23] rounded-lg p-5 flex items-center justify-between gap-4 max-w-2xl">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-40"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono tracking-wider text-neutral-500 uppercase mb-1">Live Audit Detection</div>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={auditIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="text-sm font-medium text-neutral-200"
                      >
                        {mockAudits[auditIndex].company} ({mockAudits[auditIndex].lives} lives): {mockAudits[auditIndex].issue}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={auditIndex}
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="bg-red-950/30 border border-red-900/40 rounded px-3 py-2 text-right font-mono"
                  >
                    <div className="text-[9px] text-red-400 font-semibold uppercase tracking-wide">Estimated Waste</div>
                    <div className="text-sm font-bold text-red-300">{mockAudits[auditIndex].savings}</div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a
                  href="https://calendly.com/jer-kincaidrmc/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#1A3A52] hover:bg-[#234766] text-white font-semibold text-base px-8 py-4 rounded transition-colors duration-200 w-full sm:w-auto"
                >
                  <Clock className="h-5 w-5" />
                  Book PBM Contract Audit
                  <ArrowRight className="h-5 w-5" />
                </a>

                <Link
                  href="/solutions/pbm-vs-cost-plus"
                  className="flex items-center justify-center gap-2 border border-[#2A3F54] bg-transparent hover:bg-[#151B23] text-neutral-200 hover:text-white font-semibold text-base px-8 py-4 rounded transition-colors duration-200 w-full sm:w-auto"
                >
                  <Eye className="h-5 w-5" />
                  Compare PBM vs Cost Plus
                </Link>
              </div>

              <div className="text-sm text-neutral-500 font-mono flex items-center gap-4 flex-wrap">
                <span>✓ SSAE-18 SOC 2 certified</span>
                <span>✓ HIPAA-compliant</span>
                <span>✓ Credentialed Actuarial team</span>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="border border-[#2A3F54] bg-[#0C1117] rounded-lg p-1 shadow-xl">
                <div className="bg-[#151B23] px-4 py-2 border-b border-[#2A3F54] flex items-center justify-between text-xs font-mono text-neutral-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    <span className="w-2 h-2 rounded-full bg-yellow-500" />
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="ml-2">kincaid-audit-engine-v4.2</span>
                  </div>
                  <Badge className="bg-red-900/20 text-red-400 border border-red-900/40 px-2 py-0.5 text-[10px]">RISK DETECTED</Badge>
                </div>
                <div className="p-6 space-y-6">
                  <div className="space-y-1.5">
                    <div className="text-xs font-mono text-neutral-400">Active Audit Focus</div>
                    <div className="text-lg font-semibold text-white">Prescription Formulary Analysis</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#0F1419] border border-[#2A3F54] rounded p-3">
                      <div className="text-[10px] font-mono text-neutral-400">Claims Analyzed</div>
                      <div className="text-base font-bold text-white mt-1">42,854</div>
                    </div>
                    <div className="bg-[#0F1419] border border-[#2A3F54] rounded p-3">
                      <div className="text-[10px] font-mono text-neutral-400">Flagged Non-Compliance</div>
                      <div className="text-base font-bold text-red-400 mt-1">1,489</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-neutral-400">Traditional PBM Profit Margin</span>
                      <span className="text-red-400 font-semibold">34.8%</span>
                    </div>
                    <div className="h-2 bg-[#151B23] rounded-sm overflow-hidden">
                      <div className="h-full bg-red-500" style={{ width: "34.8%" }} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-neutral-400">Kincaid Fiduciary Target Fee</span>
                      <span className="text-emerald-400 font-semibold">2.5%</span>
                    </div>
                    <div className="h-2 bg-[#151B23] rounded-sm overflow-hidden">
                      <div className="h-full bg-emerald-500" style={{ width: "2.5%" }} />
                    </div>
                  </div>

                  <div className="bg-[#1A3A52]/10 border border-[#1A3A52] rounded p-4">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#B8860B] font-semibold mb-1 uppercase tracking-wide">
                      <Shield className="h-4 w-4" />
                      Fiduciary Contract Fix Recommended
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      Carve out specialty pharmacy benefits from your main carrier contract immediately to halt undisclosed drug coupon markup harvesting.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        <section className="py-24 border-t border-[#1F2937]">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            
            <div className="mb-12 text-center max-w-3xl mx-auto space-y-4">
              <span className="text-xs font-mono text-[#B8860B] uppercase tracking-widest">Interactive Audit Playground</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold">The Fiduciary Lab Hub</h2>
              <p className="text-neutral-400 text-lg leading-relaxed">
                Instantly simulate contract pricing leakage, transparent specialty drug margins, and risk-optimized trend profiles using real actuarial data.
              </p>
            </div>

            <div className="flex justify-center mb-8">
              <div className="inline-flex gap-1 bg-[#151B23] rounded p-1 border border-[#2A3F54]">
                <button
                  onClick={() => setActivePlaygroundTab("calculator")}
                  className={`px-6 py-3 rounded text-sm font-semibold transition-colors ${
                    activePlaygroundTab === "calculator"
                      ? "bg-[#1A3A52] text-white"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  PBM Cost Modeler
                </button>
                <button
                  onClick={() => setActivePlaygroundTab("costplus")}
                  className={`px-6 py-3 rounded text-sm font-semibold transition-colors ${
                    activePlaygroundTab === "costplus"
                      ? "bg-[#1A3A52] text-white"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  Cost-Plus Specialty
                </button>
                <button
                  onClick={() => setActivePlaygroundTab("risk")}
                  className={`px-6 py-3 rounded text-sm font-semibold transition-colors ${
                    activePlaygroundTab === "risk"
                      ? "bg-[#1A3A52] text-white"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  Actuarial Risk Simulator
                </button>
              </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-center bg-[#151B23] border border-[#2A3F54] rounded-lg p-10">
              
              <div className="lg:col-span-5 space-y-6">
                
                {activePlaygroundTab === "calculator" && (
                  <>
                    <div className="space-y-2">
                      <div className="text-xs font-mono text-[#B8860B] uppercase font-semibold tracking-wide">Interactive Tool 1</div>
                      <h3 className="text-2xl font-serif font-bold text-white">Traditional PBM Cost Modeler</h3>
                      <p className="text-neutral-400 text-sm leading-relaxed">
                        Traditional PBM pricing models capture significant margin inside spread pricing, retained rebates, and specialized fees. Adjust the parameters to calculate your leakage.
                      </p>
                    </div>

                    <div className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-mono text-neutral-300">
                          <span>Covered Employee Lives</span>
                          <span className="text-white font-semibold">{calcLives} lives</span>
                        </div>
                        <input
                          type="range"
                          min="100"
                          max="5000"
                          step="50"
                          value={calcLives}
                          onChange={(e) => setCalcLives(Number(e.target.value))}
                          className="w-full h-1.5 bg-[#0F1419] rounded appearance-none cursor-pointer accent-[#1A3A52]"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-mono text-neutral-300">
                          <span>Annual Rx Spend</span>
                          <span className="text-white font-semibold">${(calcSpend / 1000000).toFixed(1)}M</span>
                        </div>
                        <input
                          type="range"
                          min="500000"
                          max="20000000"
                          step="500000"
                          value={calcSpend}
                          onChange={(e) => setCalcSpend(Number(e.target.value))}
                          className="w-full h-1.5 bg-[#0F1419] rounded appearance-none cursor-pointer accent-[#1A3A52]"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-mono text-neutral-300">
                          <span>Estimated PBM Overcharge/Spread %</span>
                          <span className="text-white font-semibold">{calcSpread}%</span>
                        </div>
                        <input
                          type="range"
                          min="10"
                          max="45"
                          step="5"
                          value={calcSpread}
                          onChange={(e) => setCalcSpread(Number(e.target.value))}
                          className="w-full h-1.5 bg-[#0F1419] rounded appearance-none cursor-pointer accent-[#1A3A52]"
                        />
                      </div>
                    </div>
                  </>
                )}

                {activePlaygroundTab === "costplus" && (
                  <>
                    <div className="space-y-2">
                      <div className="text-xs font-mono text-[#B8860B] uppercase font-semibold tracking-wide">Interactive Tool 2</div>
                      <h3 className="text-2xl font-serif font-bold text-white">Specialty Cost-Plus Dissector</h3>
                      <p className="text-neutral-400 text-sm leading-relaxed">
                        Specialty drug margins are the most opaque category in employer healthcare plans. Under a true cost-plus framework, you only pay raw drug ingredient cost plus a flat 15% transparent markup and fulfillment fee.
                      </p>
                    </div>

                    <div className="space-y-4 pt-4">
                      <div className="text-xs font-mono text-neutral-400">Select Specialty Drug to Dissect</div>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.keys(specialtyDrugs).map((drugName) => (
                          <button
                            key={drugName}
                            onClick={() => setSelectedSpecialtyDrug(drugName)}
                            className={`px-3 py-2.5 rounded border text-left text-xs font-semibold transition-colors ${
                              selectedSpecialtyDrug === drugName
                                ? "bg-[#1A3A52]/20 border-[#1A3A52] text-white"
                                : "bg-[#0F1419] border-[#2A3F54] text-neutral-400 hover:border-[#3A4F64]"
                            }`}
                          >
                            <div className="font-semibold">{drugName}</div>
                            <div className="text-[10px] opacity-60 mt-0.5">{specialtyDrugs[drugName].indication}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {activePlaygroundTab === "risk" && (
                  <>
                    <div className="space-y-2">
                      <div className="text-xs font-mono text-[#B8860B] uppercase font-semibold tracking-wide">Interactive Tool 3</div>
                      <h3 className="text-2xl font-serif font-bold text-white">Actuarial Risk Simulator</h3>
                      <p className="text-neutral-400 text-sm leading-relaxed">
                        Traditional carriers accept high-risk, compound double-digit YoY increases by defaulting to basic reinsurance pools. Kincaid iQ stabilizes drug cost trends to less than 4% through advanced predictive stratification.
                      </p>
                    </div>

                    <div className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-mono text-neutral-300">
                          <span>Portfolio size (Covered Lives)</span>
                          <span className="text-white font-semibold">{riskLives} lives</span>
                        </div>
                        <input
                          type="range"
                          min="100"
                          max="10000"
                          step="100"
                          value={riskLives}
                          onChange={(e) => setRiskRiskLives(Number(e.target.value))}
                          className="w-full h-1.5 bg-[#0F1419] rounded appearance-none cursor-pointer accent-[#1A3A52]"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-mono text-neutral-300">
                          <span>Current Pharmacy Cost Trend (YoY %)</span>
                          <span className="text-white font-semibold">{riskTrend}% increase</span>
                        </div>
                        <input
                          type="range"
                          min="6"
                          max="25"
                          step="1"
                          value={riskTrend}
                          onChange={(e) => setRiskTrend(Number(e.target.value))}
                          className="w-full h-1.5 bg-[#0F1419] rounded appearance-none cursor-pointer accent-[#1A3A52]"
                        />
                      </div>
                    </div>
                  </>
                )}

              </div>

              <div className="lg:col-span-7 bg-[#0C1117] border border-[#2A3F54] rounded p-8 space-y-6">
                
                {activePlaygroundTab === "calculator" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-[#1F2937] pb-4">
                      <div className="text-sm font-semibold text-neutral-300">Audited Projection</div>
                      <Badge className="bg-[#1A3A52]/20 text-[#B8860B] border border-[#1A3A52]">PBM Optimization</Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-[#0F1419] border border-[#2A3F54] rounded p-4">
                        <div className="text-xs font-mono text-neutral-400 mb-1">Identified Annual Leakage</div>
                        <div className="text-2xl font-bold text-red-400">${estimatedSpreadLeakage.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                      </div>
                      <div className="bg-[#0F1419] border border-[#2A3F54] rounded p-4">
                        <div className="text-xs font-mono text-neutral-400 mb-1">Projected Annual Savings</div>
                        <div className="text-2xl font-bold text-emerald-400">${estimatedPbmSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                      </div>
                    </div>

                    <div className="bg-[#1A3A52]/10 border border-[#1A3A52] rounded p-4 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-mono text-[#B8860B] font-semibold uppercase tracking-wide">Est. Cost Reduction PMPM</div>
                        <p className="text-neutral-400 text-xs mt-1">Direct savings reflected on pharmacy invoices.</p>
                      </div>
                      <div className="text-xl font-bold text-[#B8860B] text-right">
                        -${pmpmSavings.toFixed(2)} <span className="text-xs font-normal">PMPM</span>
                      </div>
                    </div>

                    <div className="text-center pt-2">
                      <Link
                        href="/solutions/pbm-vs-cost-plus"
                        className="inline-flex items-center text-xs font-semibold text-[#B8860B] hover:text-[#D4AF37] gap-1"
                      >
                        Detailed comparative calculations <ChevronRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                )}

                {activePlaygroundTab === "costplus" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-[#1F2937] pb-4">
                      <div className="text-sm font-semibold text-neutral-300">Markup & Fulfillment Breakdown</div>
                      <span className="text-xs font-mono text-[#B8860B] font-semibold">{currentDrugData.brand}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-[#0F1419] border border-[#2A3F54] rounded p-3 text-center">
                        <div className="text-[10px] font-mono text-neutral-400">PBM Contract cost</div>
                        <div className="text-lg font-bold text-red-400 mt-1">${currentDrugData.pbm}</div>
                      </div>
                      <div className="bg-[#0F1419] border border-[#2A3F54] rounded p-3 text-center">
                        <div className="text-[10px] font-mono text-neutral-400">Cost Plus cost</div>
                        <div className="text-lg font-bold text-emerald-400 mt-1">${currentDrugData.costplus}</div>
                      </div>
                      <div className="bg-[#0F1419] border border-[#2A3F54] rounded p-3 text-center">
                        <div className="text-[10px] font-mono text-neutral-400">Instant Savings</div>
                        <div className="text-lg font-bold text-[#B8860B] mt-1">-{drugSavingsPercent}%</div>
                      </div>
                    </div>

                    <div className="space-y-3 pt-2">
                      <div className="text-xs font-mono text-neutral-300">Cost-Plus Transparent Breakdown:</div>
                      <div className="flex items-center h-4 bg-[#0F1419] rounded overflow-hidden text-[9px] font-mono text-white font-semibold">
                        <div className="bg-emerald-600 h-full flex items-center justify-center px-2" style={{ width: "70%" }}>Active Ingredient 85%</div>
                        <div className="bg-[#B8860B] h-full flex items-center justify-center px-2" style={{ width: "15%" }}>15% Markup</div>
                        <div className="bg-blue-600 h-full flex items-center justify-center px-2" style={{ width: "15%" }}>Flat Fee</div>
                      </div>
                      <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
                        <span>✓ Raw ingredient cost fixed with manufacturer</span>
                        <span>✓ No hidden rebates, no spread</span>
                      </div>
                    </div>
                  </div>
                )}

                {activePlaygroundTab === "risk" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-[#1F2937] pb-4">
                      <div className="text-sm font-semibold text-neutral-300">Actuarial Risk Reduction Profile</div>
                      <Badge className="bg-emerald-900/20 text-emerald-400 border border-emerald-900/40">Stable Trend Projections</Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-[#0F1419] border border-[#2A3F54] rounded p-4">
                        <div className="text-xs font-mono text-neutral-400 mb-1">Estimated Raw Trend (YoY)</div>
                        <div className="text-2xl font-bold text-red-400">${rawTrendCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                      </div>
                      <div className="bg-[#0F1419] border border-[#2A3F54] rounded p-4">
                        <div className="text-xs font-mono text-neutral-400 mb-1">Optimized Fiduciary Trend</div>
                        <div className="text-2xl font-bold text-emerald-400">${optimizedTrendCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                      </div>
                    </div>

                    <div className="bg-emerald-900/10 border border-emerald-900/40 rounded p-4 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wide">Cumulative Annual Loss Prevention</div>
                        <p className="text-neutral-400 text-xs mt-1">Achieved via predictive stratification & clinical programs.</p>
                      </div>
                      <div className="text-xl font-bold text-emerald-400 text-right">
                        +${actuarialSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </div>
                    </div>
                  </div>
                )}

              </div>

            </div>

          </div>
        </section>

        <section className="py-24 max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-mono text-red-400 uppercase tracking-widest">Plan Vulnerability Diagnosis</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold">Plan Cost Leakage Heatmap</h2>
              <p className="text-neutral-300 text-lg leading-relaxed">
                Pharmacy benefit costs are heavily inflated inside traditional PBM frameworks. Hover over each sector to inspect exactly how PBMs extract margins and see Kincaid IQ's contract solution.
              </p>
              
              <div className="bg-[#151B23] border border-[#2A3F54] rounded p-6 min-h-[160px] flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  {hoveredLeakage ? (
                    <motion.div
                      key={hoveredLeakage}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-3"
                    >
                      <div className="text-sm font-semibold text-[#B8860B] uppercase font-mono tracking-wider">{hoveredLeakage} Analysis:</div>
                      <p className="text-sm text-neutral-200 leading-relaxed">
                        {hoveredLeakage === "Formulary" && "PBMs frequently manipulate formularies, favoring high-rebate specialty drugs even when cheaper, therapeutically equivalent generics are available."}
                        {hoveredLeakage === "Specialty" && "Specialty medications represent only 2% of prescriptions but over 50% of total spend. Opaque billing spreads can add thousands of dollars to single scripts."}
                        {hoveredLeakage === "Rebates" && "GPOs (Group Purchasing Organizations) are created by PBMs to harvest and retain pharmaceutical manufacturer rebates away from plan sponsors."}
                        {hoveredLeakage === "Spread Pricing" && "PBMs bill the employer far more than they actually pay the dispensing pharmacy, harvesting the silent spread pricing margin."}
                      </p>
                      <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5 mt-2">
                        <Check className="h-4 w-4" />
                        Kincaid Solution: Complete contract carve-out & direct transparent pricing models.
                      </div>
                    </motion.div>
                  ) : (
                    <div className="flex items-center justify-center h-28 text-neutral-500 text-sm font-mono italic">
                      Hover over different sectors on the heatmap to diagnose cost vulnerabilities...
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 gap-4">
              
              <button
                onMouseEnter={() => setHoveredLeakage("Formulary")}
                onMouseLeave={() => setHoveredLeakage(null)}
                className={`relative rounded-lg p-6 text-left border transition-all duration-200 ${
                  hoveredLeakage === "Formulary"
                    ? "bg-red-950/20 border-red-900/50 scale-[1.02]"
                    : "bg-[#151B23] border-[#2A3F54] hover:border-[#3A4F64]"
                }`}
              >
                <div className="absolute top-4 right-4 h-2.5 w-2.5 rounded-full bg-red-400" />
                <Layers className="h-8 w-8 text-neutral-400 mb-4" />
                <h4 className="text-lg font-semibold text-white">Formulary Manipulation</h4>
                <p className="text-neutral-400 text-xs mt-2 leading-relaxed">Therapeutic substitutions favoring higher rebated brands over generic alternatives.</p>
                <div className="mt-4 text-xs font-semibold text-red-300">Severe Waste: ~12%</div>
              </button>

              <button
                onMouseEnter={() => setHoveredLeakage("Specialty")}
                onMouseLeave={() => setHoveredLeakage(null)}
                className={`relative rounded-lg p-6 text-left border transition-all duration-200 ${
                  hoveredLeakage === "Specialty"
                    ? "bg-red-950/20 border-red-900/50 scale-[1.02]"
                    : "bg-[#151B23] border-[#2A3F54] hover:border-[#3A4F64]"
                }`}
              >
                <div className="absolute top-4 right-4 h-2.5 w-2.5 rounded-full bg-red-500" />
                <Activity className="h-8 w-8 text-neutral-400 mb-4" />
                <h4 className="text-lg font-semibold text-white">Specialty Markups</h4>
                <p className="text-neutral-400 text-xs mt-2 leading-relaxed">Aggressive compound markups on oncology and specialty medications.</p>
                <div className="mt-4 text-xs font-semibold text-red-500">Critical Waste: ~32%</div>
              </button>

              <button
                onMouseEnter={() => setHoveredLeakage("Rebates")}
                onMouseLeave={() => setHoveredLeakage(null)}
                className={`relative rounded-lg p-6 text-left border transition-all duration-200 ${
                  hoveredLeakage === "Rebates"
                    ? "bg-red-950/20 border-red-900/50 scale-[1.02]"
                    : "bg-[#151B23] border-[#2A3F54] hover:border-[#3A4F64]"
                }`}
              >
                <div className="absolute top-4 right-4 h-2.5 w-2.5 rounded-full bg-red-400" />
                <DollarSign className="h-8 w-8 text-neutral-400 mb-4" />
                <h4 className="text-lg font-semibold text-white">Rebate Retaining</h4>
                <p className="text-neutral-400 text-xs mt-2 leading-relaxed">Hidden Group Purchasing Organizations collecting and retaining manufacturer rebates.</p>
                <div className="mt-4 text-xs font-semibold text-red-300">Moderate Waste: ~15%</div>
              </button>

              <button
                onMouseEnter={() => setHoveredLeakage("Spread Pricing")}
                onMouseLeave={() => setHoveredLeakage(null)}
                className={`relative rounded-lg p-6 text-left border transition-all duration-200 ${
                  hoveredLeakage === "Spread Pricing"
                    ? "bg-red-950/20 border-red-900/50 scale-[1.02]"
                    : "bg-[#151B23] border-[#2A3F54] hover:border-[#3A4F64]"
                }`}
              >
                <div className="absolute top-4 right-4 h-2.5 w-2.5 rounded-full bg-red-400" />
                <Percent className="h-8 w-8 text-neutral-400 mb-4" />
                <h4 className="text-lg font-semibold text-white">Spread Pricing</h4>
                <p className="text-neutral-400 text-xs mt-2 leading-relaxed">Over-billing the employer compared to direct pharmacy acquisition cost.</p>
                <div className="mt-4 text-xs font-semibold text-red-300">Severe Waste: ~18%</div>
              </button>

            </div>

          </div>
        </section>

        <section className="py-24 border-t border-[#1F2937]">
          <div className="max-w-5xl mx-auto px-4 md:px-8">
            
            <div className="mb-12 text-center space-y-4">
              <span className="text-xs font-mono text-[#B8860B] uppercase tracking-widest font-semibold">Absolute Transparency</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold">Traditional Broker vs. Fiduciary Standard</h2>
              <p className="text-neutral-400 text-lg max-w-2xl mx-auto leading-relaxed">
                Compare the legal obligations, audit capabilities, and aligned incentives under our strict fiduciary healthcare model.
              </p>
            </div>

            <div className="border border-[#2A3F54] bg-[#151B23] rounded-lg overflow-hidden">
              <div className="grid grid-cols-12 bg-[#0F1419] p-4 font-mono text-xs font-semibold text-neutral-400 tracking-wider uppercase border-b border-[#2A3F54]">
                <div className="col-span-6 md:col-span-5">Audit & Contract Parameter</div>
                <div className="col-span-3 text-center text-red-400">Traditional Broker</div>
                <div className="col-span-3 text-center text-emerald-400 md:col-span-4">Fiduciary Standard</div>
              </div>

              <div className="divide-y divide-[#1F2937]">
                
                <div className="grid grid-cols-12 p-5 items-center">
                  <div className="col-span-6 md:col-span-5 space-y-1">
                    <div className="font-semibold text-sm text-white">Legal Fiduciary Liability</div>
                    <p className="text-xs text-neutral-400 leading-normal hidden md:block">Who bears legal responsibility for plan asset management under ERISA?</p>
                  </div>
                  <div className="col-span-3 flex justify-center text-red-500 font-semibold text-xs gap-1.5 items-center">
                    <X className="h-4 w-4 shrink-0" />
                    <span>None (Disclaimed)</span>
                  </div>
                  <div className="col-span-3 flex justify-center text-emerald-400 font-semibold text-xs gap-1.5 items-center md:col-span-4">
                    <Check className="h-4 w-4 shrink-0" />
                    <span>Contractually Assumed</span>
                  </div>
                </div>

                <div className="grid grid-cols-12 p-5 items-center">
                  <div className="col-span-6 md:col-span-5 space-y-1">
                    <div className="font-semibold text-sm text-white">Full Contract & MAC Audit Rights</div>
                    <p className="text-xs text-neutral-400 leading-normal hidden md:block">Do you have unlimited legal rights to audit invoice line items and MAC pricing lists?</p>
                  </div>
                  <div className="col-span-3 flex justify-center text-red-500 font-semibold text-xs gap-1.5 items-center">
                    <X className="h-4 w-4 shrink-0" />
                    <span>Heavily Restricted</span>
                  </div>
                  <div className="col-span-3 flex justify-center text-emerald-400 font-semibold text-xs gap-1.5 items-center md:col-span-4">
                    <Check className="h-4 w-4 shrink-0" />
                    <span>Unlimited / 100% Uncapped</span>
                  </div>
                </div>

                <div className="grid grid-cols-12 p-5 items-center">
                  <div className="col-span-6 md:col-span-5 space-y-1">
                    <div className="font-semibold text-sm text-white">Compensation Alignment</div>
                    <p className="text-xs text-neutral-400 leading-normal hidden md:block">How are compensation fees and commissions collected and structured?</p>
                  </div>
                  <div className="col-span-3 flex justify-center text-red-500 font-semibold text-xs gap-1.5 items-center">
                    <X className="h-4 w-4 shrink-0" />
                    <span>Opaque Commission/Bonus</span>
                  </div>
                  <div className="col-span-3 flex justify-center text-emerald-400 font-semibold text-xs gap-1.5 items-center md:col-span-4">
                    <Check className="h-4 w-4 shrink-0" />
                    <span>Flat Retainer (Aligned Fee)</span>
                  </div>
                </div>

                <div className="grid grid-cols-12 p-5 items-center">
                  <div className="col-span-6 md:col-span-5 space-y-1">
                    <div className="font-semibold text-sm text-white">Rebate Optimization Flow</div>
                    <p className="text-xs text-neutral-400 leading-normal hidden md:block">Are pharmaceutical manufacturer rebates shared fully with the plan sponsor?</p>
                  </div>
                  <div className="col-span-3 flex justify-center text-red-500 font-semibold text-xs gap-1.5 items-center">
                    <X className="h-4 w-4 shrink-0" />
                    <span>Retained by PBM / GPO</span>
                  </div>
                  <div className="col-span-3 flex justify-center text-emerald-400 font-semibold text-xs gap-1.5 items-center md:col-span-4">
                    <Check className="h-4 w-4 shrink-0" />
                    <span>100% Shared / Pass-Through</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        <section className="py-24 max-w-7xl mx-auto px-4 md:px-8">
          <div className="mb-12 text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-mono text-[#B8860B] uppercase tracking-widest">Platform Core Architecture</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold">Platform Capabilities</h2>
            <p className="text-neutral-400 text-lg leading-relaxed">
              Explore the core analytical modules driving the Fiduciary command center.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            
            <div
              onClick={() => handleBadgeClick("receipts")}
              className="group relative rounded-lg border border-[#2A3F54] bg-[#151B23] p-8 hover:border-[#3A4F64] cursor-pointer transition-all duration-200"
            >
              <div className="mb-4 inline-flex rounded bg-[#1A3A52]/20 p-3">
                <FileText className="h-6 w-6 text-[#B8860B]" />
              </div>
              <h3 className="mb-2 text-xl font-serif font-bold text-white">Immutable Evidence Ledger</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Cryptographic timestamped tracking of healthcare contract compliance, overcharge recovery events, and verification receipts.
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#B8860B] group-hover:text-[#D4AF37]">
                Explore ledger forensics <ChevronRight className="h-4 w-4" />
              </div>
            </div>

            <div
              onClick={() => handleBadgeClick("ebitda")}
              className="group relative rounded-lg border border-[#2A3F54] bg-[#151B23] p-8 hover:border-[#3A4F64] cursor-pointer transition-all duration-200"
            >
              <div className="mb-4 inline-flex rounded bg-[#1A3A52]/20 p-3">
                <Shield className="h-6 w-6 text-[#B8860B]" />
              </div>
              <h3 className="mb-2 text-xl font-serif font-bold text-white">EBITDA Defense Engine</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Unlock direct enterprise margin defenses. Re-route prescription benefit waste into verified, audited corporate profitability gains.
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#B8860B] group-hover:text-[#D4AF37]">
                Evaluate financial models <ChevronRight className="h-4 w-4" />
              </div>
            </div>

            <div
              onClick={() => handleBadgeClick("verification")}
              className="group relative rounded-lg border border-[#2A3F54] bg-[#151B23] p-8 hover:border-[#3A4F64] cursor-pointer transition-all duration-200"
            >
              <div className="mb-4 inline-flex rounded bg-[#1A3A52]/20 p-3">
                <Database className="h-6 w-6 text-[#B8860B]" />
              </div>
              <h3 className="mb-2 text-xl font-serif font-bold text-white">Forensic Database Audit</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Connect and sync multi-source claims and healthcare contract formularies across massive transparent actuarial databases.
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#B8860B] group-hover:text-[#D4AF37]">
                Inspect compliance pipelines <ChevronRight className="h-4 w-4" />
              </div>
            </div>

          </div>
        </section>

        <section className="py-24 border-t border-[#1F2937]">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
              <div className="space-y-2">
                <span className="text-xs font-mono text-[#B8860B] uppercase tracking-widest">Unified Enterprise Command</span>
                <h2 className="text-4xl md:text-5xl font-serif font-bold">Live Fiduciary Intelligence Portal</h2>
                <p className="text-neutral-400 text-lg leading-relaxed">
                  Real-time overcharge tracking feeds and analytical dashboards optimized for corporate benefits management.
                </p>
              </div>
              <Link
                href="/solutions"
                className="inline-flex items-center gap-2 border border-[#2A3F54] hover:border-[#3A4F64] bg-[#151B23] px-6 py-3 rounded text-sm font-semibold text-neutral-200 hover:text-white transition-colors"
              >
                <span>View Full Command Center</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="rounded-lg border border-[#2A3F54] bg-[#0C1117] p-10 relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#1A3A52] via-[#B8860B] to-[#1A3A52]" />
              <ExecutiveWarRoom />
            </div>
          </div>
        </section>

        <section className="py-12 border-t border-b border-[#1F2937]">
          <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left space-y-1">
              <div className="text-xs font-mono text-neutral-500 uppercase tracking-wide">Fiduciary Assurance Standards</div>
              <div className="text-sm font-semibold text-neutral-300">Adhering to strict national operational healthcare and cybersecurity frameworks.</div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono font-semibold text-neutral-400">
              <span className="border border-[#2A3F54] bg-[#151B23] px-3 py-1.5 rounded">SSAE-18 SOC 2 TYPE II</span>
              <span className="border border-[#2A3F54] bg-[#151B23] px-3 py-1.5 rounded">HIPAA ENCRYPTED</span>
              <span className="border border-[#2A3F54] bg-[#151B23] px-3 py-1.5 rounded">ERISA FIDUCIARY</span>
              <span className="border border-[#2A3F54] bg-[#151B23] px-3 py-1.5 rounded">AAA STANDARDS</span>
            </div>
          </div>
        </section>

        <Footer />
      </div>

      <BadgeDetailSystem
        badgeType={selectedBadge}
        level={badgeLevel}
        onClose={handleBadgeClose}
        onNextLevel={handleNextLevel}
      />
    </>
  );
}