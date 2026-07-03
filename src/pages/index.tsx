import Head from "next/head";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { SEO } from "@/components/SEO";
import {
  FileText, Shield, TrendingUp, CheckCircle2, Activity, ArrowRight,
  Building2, Database, BarChart3, Award, AlertTriangle, Clock,
  DollarSign, Percent, ChevronRight, Check, X, Layers, Eye, Info, BookOpen
} from "lucide-react";
import { ExecutiveWarRoom } from "@/components/warroom/ExecutiveWarRoom";
import { CHROWarRoom } from "@/components/warroom/CHROWarRoom";
import { BoardWarRoom } from "@/components/warroom/BoardWarRoom";
import { PEOperatorWarRoom } from "@/components/warroom/PEOperatorWarRoom";
import { BadgeDetailSystem } from "@/components/home/BadgeDetailSystem";
import { Hero3D } from "@/components/Hero3D";
import { TechBackdrop } from "@/components/TechBackdrop";
import { LandingUploader } from "@/components/home/LandingUploader";
import { LandingBrokerLookup } from "@/components/home/LandingBrokerLookup";
import { LandingActuarialReport } from "@/components/home/LandingActuarialReport";
import { CalendlyWidget } from "@/components/CalendlyWidget";
import { ROICalculator } from "@/components/ROICalculator";
import { PBMSpreadCalculator } from "@/components/PBMSpreadCalculator";
import { ExitIntentPopup } from "@/components/ExitIntentPopup";
import { InteractiveHeroDashboard } from "@/components/home/InteractiveHeroDashboard";
import { DocumentCarousel } from "@/components/home/DocumentCarousel";
import { AuditJourneyTimeline } from "@/components/home/AuditJourneyTimeline";
import { TimeSavingsComparison } from "@/components/marketing/TimeSavingsComparison";
import { SecurityBadges } from "@/components/marketing/SecurityBadges";
import { LiveDemoCTA } from "@/components/marketing/LiveDemoCTA";
import { ObjectionsFAQ } from "@/components/marketing/ObjectionsFAQ";
import { QuantifiedTestimonials } from "@/components/marketing/QuantifiedTestimonials";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const mockAudits = [
  { company: "Midwest Logistics", lives: 420, issue: "Generic Spread Markup", savings: "$142,500", severity: "high" },
  { company: "Apparel Retailer", lives: 1250, issue: "Rebate GPO Retained", savings: "$684,000", severity: "critical" },
  { company: "Tech Solutions", lives: 310, issue: "Specialty Coupon Exclusion", savings: "$94,200", severity: "medium" },
  { company: "Northeast Manufacturing", lives: 2800, issue: "MAC List Overcharges", savings: "$1,120,400", severity: "critical" },
  { company: "Southwest Healthcare", lives: 850, issue: "Non-Fid Commission Skimming", savings: "$322,000", severity: "high" }
];

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12
    }
  }
};

const AnimatedSection = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUpVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [auditIndex, setAuditIndex] = useState(0);
  const [activePlaygroundTab, setActivePlaygroundTab] = useState<"calculator" | "costplus" | "risk">("calculator");
  const [activeWarRoomRole, setActiveWarRoomRole] = useState<"cfo" | "chro" | "board" | "pe">("cfo");
  
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
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 opacity-30">
              <Hero3D />
            </div>
            <div className="absolute inset-0 opacity-20">
              <TechBackdrop intensity={0.5} density={0.8} />
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-16 items-center w-full relative z-10">
            
            <motion.div 
              className="lg:col-span-7 space-y-8"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              
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
                <CalendlyWidget 
                  url="https://calendly.com/jer-kincaidrmc/30min"
                  buttonText="Book Your Free Fiduciary Audit"
                  className="bg-[#1A3A52] hover:bg-[#234766] text-white font-semibold text-base px-8 py-4 rounded transition-colors duration-200 w-full sm:w-auto"
                />

                <Link
                  href="#roi-calculator"
                  className="flex items-center justify-center gap-2 border border-[#2A3F54] bg-transparent hover:bg-[#151B23] text-neutral-200 hover:text-white font-semibold text-base px-8 py-4 rounded transition-colors duration-200 w-full sm:w-auto"
                >
                  <DollarSign className="h-5 w-5" />
                  Calculate Your Savings
                </Link>
              </div>

              <div className="text-sm text-neutral-500 font-mono flex items-center gap-4 flex-wrap">
                <span>✓ SSAE-18 SOC 2 certified</span>
                <span>✓ HIPAA-compliant</span>
                <span>✓ Credentialed Actuarial team</span>
              </div>
            </motion.div>

            <motion.div 
              className="lg:col-span-5 relative"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <InteractiveHeroDashboard />
            </motion.div>

          </div>
        </section>

        <section id="roi-calculator" className="relative py-16 border-t border-[#1F2937] overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 opacity-20">
              <TechBackdrop intensity={0.6} density={0.8} />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-950/5 to-transparent" />
          </div>

          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
            <AnimatedSection className="mb-10 text-center max-w-3xl mx-auto space-y-4">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">Immediate Value Calculators</span>
              <p className="text-neutral-400 text-lg leading-relaxed">
                Use our interactive calculators to quantify the hidden costs in your current PBM contract. Input your actual numbers and see immediate results.
              </p>
            </AnimatedSection>

            <div className="grid lg:grid-cols-2 gap-8">
              <AnimatedSection>
                <ROICalculator />
              </AnimatedSection>

              <AnimatedSection>
                <PBMSpreadCalculator />
              </AnimatedSection>
            </div>

            <AnimatedSection className="mt-10 text-center">
              <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-br from-[#1A3A52] to-[#234766] border border-[#B8860B]/30 rounded-2xl p-8">
                <div className="text-left space-y-2">
                  <h3 className="text-2xl font-serif font-bold text-white">Ready to recover these savings?</h3>
                  <p className="text-neutral-300 text-sm">Book a 30-minute audit call to validate your numbers with our actuarial team.</p>
                </div>
                <CalendlyWidget 
                  url="https://calendly.com/jer-kincaidrmc/30min"
                  buttonText="Schedule Audit Call"
                  className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-emerald-500/25 flex-shrink-0"
                />
              </div>
            </AnimatedSection>
          </div>
        </section>

        <section className="relative py-16 max-w-7xl mx-auto px-4 md:px-8 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <TechBackdrop intensity={0.3} density={0.6} />
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-center relative z-10">
            
            <AnimatedSection className="lg:col-span-5 space-y-6">
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
            </AnimatedSection>

            <motion.div 
              className="lg:col-span-7 grid grid-cols-2 gap-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              
              <motion.button
                variants={fadeInUpVariants}
                onMouseEnter={() => setHoveredLeakage("Formulary")}
                onMouseLeave={() => setHoveredLeakage(null)}
                whileHover={{ scale: 1.02 }}
                className={`relative rounded-lg p-6 text-left border transition-all duration-200 ${
                  hoveredLeakage === "Formulary"
                    ? "bg-red-950/20 border-red-900/50"
                    : "bg-[#151B23] border-[#2A3F54] hover:border-[#3A4F64]"
                }`}
              >
                <div className="absolute top-4 right-4 h-2.5 w-2.5 rounded-full bg-red-400" />
                <Layers className="h-8 w-8 text-neutral-400 mb-4" />
                <h4 className="text-lg font-semibold text-white">Formulary Manipulation</h4>
                <p className="text-neutral-400 text-xs mt-2 leading-relaxed">Therapeutic substitutions favoring higher rebated brands over generic alternatives.</p>
                <div className="mt-4 text-xs font-semibold text-red-300">Severe Waste: ~12%</div>
              </motion.button>

              <motion.button
                variants={fadeInUpVariants}
                onMouseEnter={() => setHoveredLeakage("Specialty")}
                onMouseLeave={() => setHoveredLeakage(null)}
                whileHover={{ scale: 1.02 }}
                className={`relative rounded-lg p-6 text-left border transition-all duration-200 ${
                  hoveredLeakage === "Specialty"
                    ? "bg-red-950/20 border-red-900/50"
                    : "bg-[#151B23] border-[#2A3F54] hover:border-[#3A4F64]"
                }`}
              >
                <div className="absolute top-4 right-4 h-2.5 w-2.5 rounded-full bg-red-500" />
                <Activity className="h-8 w-8 text-neutral-400 mb-4" />
                <h4 className="text-lg font-semibold text-white">Specialty Markups</h4>
                <p className="text-neutral-400 text-xs mt-2 leading-relaxed">Aggressive compound markups on oncology and specialty medications.</p>
                <div className="mt-4 text-xs font-semibold text-red-500">Critical Waste: ~32%</div>
              </motion.button>

              <motion.button
                variants={fadeInUpVariants}
                onMouseEnter={() => setHoveredLeakage("Rebates")}
                onMouseLeave={() => setHoveredLeakage(null)}
                whileHover={{ scale: 1.02 }}
                className={`relative rounded-lg p-6 text-left border transition-all duration-200 ${
                  hoveredLeakage === "Rebates"
                    ? "bg-red-950/20 border-red-900/50"
                    : "bg-[#151B23] border-[#2A3F54] hover:border-[#3A4F64]"
                }`}
              >
                <div className="absolute top-4 right-4 h-2.5 w-2.5 rounded-full bg-red-400" />
                <DollarSign className="h-8 w-8 text-neutral-400 mb-4" />
                <h4 className="text-lg font-semibold text-white">Rebate Retaining</h4>
                <p className="text-neutral-400 text-xs mt-2 leading-relaxed">Hidden Group Purchasing Organizations collecting and retaining manufacturer rebates.</p>
                <div className="mt-4 text-xs font-semibold text-red-300">Moderate Waste: ~15%</div>
              </motion.button>

              <motion.button
                variants={fadeInUpVariants}
                onMouseEnter={() => setHoveredLeakage("Spread Pricing")}
                onMouseLeave={() => setHoveredLeakage(null)}
                whileHover={{ scale: 1.02 }}
                className={`relative rounded-lg p-6 text-left border transition-all duration-200 ${
                  hoveredLeakage === "Spread Pricing"
                    ? "bg-red-950/20 border-red-900/50"
                    : "bg-[#151B23] border-[#2A3F54] hover:border-[#3A4F64]"
                }`}
              >
                <div className="absolute top-4 right-4 h-2.5 w-2.5 rounded-full bg-red-400" />
                <Percent className="h-8 w-8 text-neutral-400 mb-4" />
                <h4 className="text-lg font-semibold text-white">Spread Pricing</h4>
                <p className="text-neutral-400 text-xs mt-2 leading-relaxed">Over-billing the employer compared to direct pharmacy acquisition cost.</p>
                <div className="mt-4 text-xs font-semibold text-red-300">Severe Waste: ~18%</div>
              </motion.button>

            </motion.div>

          </div>
        </section>

        <section className="relative py-16 border-t border-[#1F2937] overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <TechBackdrop intensity={0.3} density={0.6} />
          </div>

          <div className="max-w-5xl mx-auto px-4 md:px-8 relative z-10">
            
            <AnimatedSection className="mb-10 text-center space-y-4">
              <span className="text-xs font-mono text-[#B8860B] uppercase tracking-widest font-semibold">Absolute Transparency</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold">Traditional Broker vs. Fiduciary Standard</h2>
              <p className="text-neutral-400 text-lg max-w-2xl mx-auto leading-relaxed">
                Compare the legal obligations, audit capabilities, and aligned incentives under our strict fiduciary healthcare model.
              </p>
            </AnimatedSection>

            <AnimatedSection className="border border-[#2A3F54] bg-[#151B23] rounded-lg overflow-hidden">
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
            </AnimatedSection>

          </div>
        </section>

        <section className="relative py-16 border-t border-[#1F2937] overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 opacity-10 bg-gradient-to-b from-transparent via-[#B8860B]/5 to-transparent" />
          </div>
          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
            <AnimatedSection className="mb-12 text-center max-w-3xl mx-auto space-y-4">
              <span className="text-xs font-mono text-[#B8860B] uppercase tracking-widest font-semibold">Operational Blueprint</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold">The 30-Day Forensic Audit Journey</h2>
              <p className="text-neutral-400 text-lg leading-relaxed">
                Our standardized 30-day fiduciary audit pipeline processes raw claim lines securely under ERISA protection with zero operational friction.
              </p>
            </AnimatedSection>

            <AuditJourneyTimeline />
          </div>
        </section>

        <section className="relative py-16 max-w-7xl mx-auto px-4 md:px-8 overflow-hidden border-t border-[#1F2937]">
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <TechBackdrop intensity={0.3} density={0.6} />
          </div>

          <AnimatedSection className="mb-10 text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-mono text-[#B8860B] uppercase tracking-widest">Platform Core Architecture</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold">8 Pillars of Fiduciary Intelligence</h2>
            <p className="text-neutral-400 text-lg leading-relaxed">
              Eight foundational analytical capabilities driving comprehensive fiduciary healthcare governance and PBM oversight.
            </p>
          </AnimatedSection>

          <motion.div 
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 relative z-10"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            
            <motion.div
              variants={fadeInUpVariants}
              onClick={() => handleBadgeClick("receipts")}
              whileHover={{ y: -4 }}
              className="group relative rounded-lg border border-[#2A3F54] bg-[#151B23] p-5 hover:border-[#3A4F64] cursor-pointer transition-all duration-200"
            >
              <div className="mb-3 inline-flex rounded bg-[#1A3A52]/20 p-2.5">
                <FileText className="h-5 w-5 text-[#B8860B]" />
              </div>
              <h3 className="mb-2 text-base font-serif font-bold text-white">Verified Savings Documentation</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Timestamped audit trail documenting contract compliance events, overcharge recoveries, and third-party verification records with complete chain of custody.
              </p>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#B8860B] group-hover:text-[#D4AF37]">
                Review documentation standards <ChevronRight className="h-3.5 w-3.5" />
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUpVariants}
              onClick={() => handleBadgeClick("ebitda")}
              whileHover={{ y: -4 }}
              className="group relative rounded-lg border border-[#2A3F54] bg-[#151B23] p-5 hover:border-[#3A4F64] cursor-pointer transition-all duration-200"
            >
              <div className="mb-3 inline-flex rounded bg-[#1A3A52]/20 p-2.5">
                <Shield className="h-5 w-5 text-[#B8860B]" />
              </div>
              <h3 className="mb-2 text-base font-serif font-bold text-white">Financial Impact Analysis</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Quantitative assessment of pharmacy benefit optimization on enterprise profitability. Direct measurement of prescription cost containment effects on operating margins.
              </p>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#B8860B] group-hover:text-[#D4AF37]">
                Review financial methodology <ChevronRight className="h-3.5 w-3.5" />
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUpVariants}
              onClick={() => handleBadgeClick("verification")}
              whileHover={{ y: -4 }}
              className="group relative rounded-lg border border-[#2A3F54] bg-[#151B23] p-5 hover:border-[#3A4F64] cursor-pointer transition-all duration-200"
            >
              <div className="mb-3 inline-flex rounded bg-[#1A3A52]/20 p-2.5">
                <Database className="h-5 w-5 text-[#B8860B]" />
              </div>
              <h3 className="mb-2 text-base font-serif font-bold text-white">Multi-Source Data Reconciliation</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Integration and normalization of claims data, contract formularies, and pricing benchmarks across disparate healthcare data sources for actuarial analysis.
              </p>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#B8860B] group-hover:text-[#D4AF37]">
                Review integration protocols <ChevronRight className="h-3.5 w-3.5" />
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUpVariants}
              whileHover={{ y: -4 }}
              className="group relative rounded-lg border border-[#2A3F54] bg-[#151B23] p-5 hover:border-[#3A4F64] cursor-pointer transition-all duration-200"
            >
              <div className="mb-3 inline-flex rounded bg-[#1A3A52]/20 p-2.5">
                <FileText className="h-5 w-5 text-[#B8860B]" />
              </div>
              <h3 className="mb-2 text-base font-serif font-bold text-white">Contract Intelligence & Compliance</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Automated PBM contract clause extraction, fiduciary scoring, and continuous monitoring of contractual guarantee fulfillment against actual performance metrics.
              </p>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#B8860B] group-hover:text-[#D4AF37]">
                Review contract monitoring <ChevronRight className="h-3.5 w-3.5" />
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUpVariants}
              whileHover={{ y: -4 }}
              className="group relative rounded-lg border border-[#2A3F54] bg-[#151B23] p-5 hover:border-[#3A4F64] cursor-pointer transition-all duration-200"
            >
              <div className="mb-3 inline-flex rounded bg-[#1A3A52]/20 p-2.5">
                <TrendingUp className="h-5 w-5 text-[#B8860B]" />
              </div>
              <h3 className="mb-2 text-base font-serif font-bold text-white">Actuarial Risk Modeling</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Monte Carlo simulation engines for benefit cost forecasting, stop-loss optimization, and multi-year trend projection with confidence intervals and scenario planning.
              </p>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#B8860B] group-hover:text-[#D4AF37]">
                Review risk methodology <ChevronRight className="h-3.5 w-3.5" />
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUpVariants}
              whileHover={{ y: -4 }}
              className="group relative rounded-lg border border-[#2A3F54] bg-[#151B23] p-5 hover:border-[#3A4F64] cursor-pointer transition-all duration-200"
            >
              <div className="mb-3 inline-flex rounded bg-[#1A3A52]/20 p-2.5">
                <Activity className="h-5 w-5 text-[#B8860B]" />
              </div>
              <h3 className="mb-2 text-base font-serif font-bold text-white">Real-Time Claims Surveillance</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Live streaming anomaly detection for prescription claims processing, flagging formulary violations, spread pricing irregularities, and specialty drug overcharges as they occur.
              </p>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#B8860B] group-hover:text-[#D4AF37]">
                Review surveillance protocols <ChevronRight className="h-3.5 w-3.5" />
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUpVariants}
              whileHover={{ y: -4 }}
              className="group relative rounded-lg border border-[#2A3F54] bg-[#151B23] p-5 hover:border-[#3A4F64] cursor-pointer transition-all duration-200"
            >
              <div className="mb-3 inline-flex rounded bg-[#1A3A52]/20 p-2.5">
                <Award className="h-5 w-5 text-[#B8860B]" />
              </div>
              <h3 className="mb-2 text-base font-serif font-bold text-white">Regulatory & Legal Framework</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                ERISA fiduciary compliance validation, DOL audit readiness, and CAA transparency requirements enforcement with automated legal documentation and evidence preservation.
              </p>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#B8860B] group-hover:text-[#D4AF37]">
                Review compliance standards <ChevronRight className="h-3.5 w-3.5" />
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUpVariants}
              whileHover={{ y: -4 }}
              className="group relative rounded-lg border border-[#2A3F54] bg-[#151B23] p-5 hover:border-[#3A4F64] cursor-pointer transition-all duration-200"
            >
              <div className="mb-3 inline-flex rounded bg-[#1A3A52]/20 p-2.5">
                <BarChart3 className="h-5 w-5 text-[#B8860B]" />
              </div>
              <h3 className="mb-2 text-base font-serif font-bold text-white">Predictive Cost Analytics</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Machine learning models for future spend forecasting, therapeutic substitution impact analysis, and proactive intervention opportunity identification to prevent cost escalation.
              </p>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#B8860B] group-hover:text-[#D4AF37]">
                Review predictive models <ChevronRight className="h-3.5 w-3.5" />
              </div>
            </motion.div>

          </motion.div>
        </section>

        <section id="dashboard" className="relative py-16 border-t border-[#1F2937] overflow-hidden">
          {/* Enhanced Multi-layer Background System */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 opacity-40">
              <TechBackdrop intensity={0.8} density={1.0} />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1A3A52]/10 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#B8860B]/5 via-transparent to-transparent" />
          </div>

          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
            <AnimatedSection className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
              <div className="space-y-3">
                <motion.span 
                  className="inline-block text-xs font-mono text-[#B8860B] uppercase tracking-widest font-semibold"
                  animate={{ 
                    textShadow: [
                      "0 0 10px rgba(184, 134, 11, 0.3)",
                      "0 0 20px rgba(184, 134, 11, 0.5)",
                      "0 0 10px rgba(184, 134, 11, 0.3)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Unified Enterprise Command
                </motion.span>
                <h2 className="text-4xl md:text-5xl font-serif font-bold bg-gradient-to-r from-white via-neutral-100 to-neutral-300 bg-clip-text text-transparent">
                  Kincaid IQ™
                </h2>
                <p className="text-neutral-400 text-lg leading-relaxed">
                  Real-time overcharge tracking feeds and analytical dashboards optimized for each executive role.
                </p>
              </div>
              <Link
                href="/solutions"
                className="group inline-flex items-center gap-2 border border-[#2A3F54] hover:border-[#B8860B] bg-gradient-to-br from-[#151B23] to-[#0F1419] px-6 py-3 rounded text-sm font-semibold text-neutral-200 hover:text-white transition-all duration-300 shadow-lg hover:shadow-[#B8860B]/20"
              >
                <span>View Full Command Center</span>
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </AnimatedSection>

            <AnimatedSection className="flex justify-center mb-8">
              <div className="inline-flex gap-1.5 bg-gradient-to-br from-[#151B23] via-[#1A2A3A] to-[#151B23] rounded-lg p-1.5 border border-[#2A3F54] shadow-2xl">
                {[
                  { key: "cfo", label: "CFO View" },
                  { key: "chro", label: "CHRO View" },
                  { key: "board", label: "Board View" },
                  { key: "pe", label: "PE Operator View" }
                ].map((role) => (
                  <button
                    key={role.key}
                    onClick={() => setActiveWarRoomRole(role.key as any)}
                    className={`relative px-6 py-3 rounded-md text-sm font-semibold transition-all duration-300 ${
                      activeWarRoomRole === role.key
                        ? "bg-gradient-to-br from-[#1A3A52] to-[#234766] text-white shadow-lg shadow-[#1A3A52]/50"
                        : "text-neutral-400 hover:text-white hover:bg-[#151B23]/50"
                    }`}
                  >
                    {activeWarRoomRole === role.key && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-br from-[#1A3A52] to-[#234766] rounded-md"
                        style={{ zIndex: -1 }}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10">{role.label}</span>
                  </button>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection className="rounded-xl border border-[#2A3F54] bg-gradient-to-br from-[#0C1117] via-[#0F1419] to-[#0C1117] p-10 relative overflow-hidden shadow-2xl">
              {/* Animated Top Border Glow */}
              <motion.div 
                className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#B8860B] to-transparent"
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scaleX: [0.8, 1, 0.8]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Corner Accent Glows */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-[#1A3A52] opacity-20 blur-3xl" />
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#B8860B] opacity-10 blur-3xl" />
              
              {activeWarRoomRole === "cfo" && (
                <div className="space-y-8 relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="text-3xl font-serif font-bold bg-gradient-to-r from-white to-neutral-300 bg-clip-text text-transparent">
                        CFO Command Center
                      </h3>
                      <p className="text-sm text-neutral-400 mt-2">Financial impact & EBITDA defense metrics</p>
                    </div>
                    <motion.div
                      animate={{
                        boxShadow: [
                          "0 0 20px rgba(184, 134, 11, 0.2)",
                          "0 0 30px rgba(184, 134, 11, 0.4)",
                          "0 0 20px rgba(184, 134, 11, 0.2)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Badge className="bg-gradient-to-r from-[#1A3A52] to-[#234766] text-[#B8860B] border border-[#B8860B]/30 px-4 py-1.5 text-xs font-bold shadow-lg">
                        LIVE FINANCIAL DATA
                      </Badge>
                    </motion.div>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1A3A52]/20 via-transparent to-[#B8860B]/20 rounded-xl blur-xl" />
                    <ExecutiveWarRoom />
                  </div>
                </div>
              )}

              {activeWarRoomRole === "chro" && (
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#1A3A52]/20 via-transparent to-[#B8860B]/20 rounded-xl blur-xl" />
                  <CHROWarRoom />
                </div>
              )}

              {activeWarRoomRole === "board" && (
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#1A3A52]/20 via-transparent to-[#B8860B]/20 rounded-xl blur-xl" />
                  <BoardWarRoom />
                </div>
              )}

              {activeWarRoomRole === "pe" && (
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#1A3A52]/20 via-transparent to-[#B8860B]/20 rounded-xl blur-xl" />
                  <PEOperatorWarRoom />
                </div>
              )}
              
            </AnimatedSection>
          </div>
        </section>

        {/* Time Savings Comparison */}
        <TimeSavingsComparison
          savings={[
            {
              task: "PBM Contract Forensic Audit",
              manual: "12 weeks",
              automated: "4 hours",
              savings: "11.98 weeks"
            },
            {
              task: "Rebate Reconciliation Report",
              manual: "6 weeks",
              automated: "2 hours",
              savings: "5.9 weeks"
            },
            {
              task: "Spread Pricing Analysis",
              manual: "8 weeks",
              automated: "4 hours",
              savings: "7.8 weeks"
            },
            {
              task: "Board-Ready Compliance Report",
              manual: "4 weeks",
              automated: "30 minutes",
              savings: "3.9 weeks"
            },
            {
              task: "M&A Due Diligence Audit",
              manual: "10 weeks",
              automated: "1 hour",
              savings: "9.99 weeks"
            }
          ]}
        />

        {/* Quantified Testimonials */}
        <QuantifiedTestimonials />

        {/* Live Demo CTA */}
        <section className="relative py-16 border-t border-[#1F2937]">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <LiveDemoCTA variant="hero" />
          </div>
        </section>

        {/* Objections FAQ */}
        <ObjectionsFAQ />

        {/* Fitness Call CTA */}
        <section className="relative py-16 border-t border-[#1F2937] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-purple-500/10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#B8860B]/10 via-transparent to-transparent" />
          
          <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10">
            <AnimatedSection className="text-center space-y-8">
              <div className="space-y-4">
                <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 px-4 py-2">
                  No-Obligation Discovery Session
                </Badge>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">
                  Book Your 20-Minute Fitness Call
                </h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                  Let's assess your current benefits structure and identify immediate optimization opportunities. Zero pressure, pure value.
                </p>
              </div>

              <CalendlyWidget 
                url="https://calendly.com/jer-kincaidrmc/30min"
                buttonText="Book Your 20-Minute Fitness Call"
                className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-lg px-12 py-5 rounded-xl shadow-2xl shadow-emerald-500/30 transition-all duration-300 hover:scale-105 inline-flex items-center gap-3"
              />

              <div className="flex items-center justify-center gap-6 text-sm text-gray-400 flex-wrap">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>Quick 20-minute assessment</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>Immediate actionable insights</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>No obligation required</span>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        <section className="py-12 border-t border-b border-[#1F2937]">
          <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left space-y-1">
              <div className="text-xs font-mono text-neutral-500 uppercase tracking-wide">Fiduciary Assurance Standards</div>
              <div className="text-sm font-semibold text-neutral-300">Adhering to strict national operational healthcare and cybersecurity frameworks.</div>
            </div>
            <motion.div 
              className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono font-semibold text-neutral-400"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.span variants={fadeInUpVariants} className="border border-[#2A3F54] bg-[#151B23] px-3 py-1.5 rounded">SSAE-18 SOC 2 TYPE II</motion.span>
              <motion.span variants={fadeInUpVariants} className="border border-[#2A3F54] bg-[#151B23] px-3 py-1.5 rounded">HIPAA ENCRYPTED</motion.span>
              <motion.span variants={fadeInUpVariants} className="border border-[#2A3F54] bg-[#151B23] px-3 py-1.5 rounded">ERISA FIDUCIARY</motion.span>
              <motion.span variants={fadeInUpVariants} className="border border-[#2A3F54] bg-[#151B23] px-3 py-1.5 rounded">AAA STANDARDS</motion.span>
            </motion.div>
          </div>
        </section>

        <Footer />

        {/* Security & Compliance */}
        <SecurityBadges variant="full" showTrustCenter={true} />
      </div>

      {/* Continuous vs Point-in-Time Intelligence */}
      <section className="py-20 border-t border-neutral-800 bg-neutral-900/30">
        <div className="container mx-auto px-4">
          <AnimatedSection className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                The Fundamental Difference
              </div>
              <h2 className="text-4xl md:text-5xl font-light mb-6">
                Continuous Intelligence vs.<br/>
                <span className="text-neutral-500">Point-in-Time Audits</span>
              </h2>
              <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
                Traditional consultants show you what happened last quarter. SiriusB iQ shows you what's happening right now—and what to do about it.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Traditional Approach */}
              <div className="bg-neutral-900/70 border border-red-900/30 rounded-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                    <span className="text-2xl">📄</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-red-400">Traditional Audit</h3>
                    <p className="text-sm text-neutral-500">Quarterly or Annual</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {[
                    "12-week turnaround for insights",
                    "Quarterly PDF reports (outdated on arrival)",
                    "Renewal-only negotiation leverage",
                    "Requires manual follow-up on every finding",
                    "No alerts when contract violations occur",
                    "Historical data only (backward-looking)",
                    "Single snapshot in time"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-red-500 mt-1">✗</span>
                      <span className="text-neutral-400">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-6 border-t border-neutral-800">
                  <div className="text-sm text-neutral-500">Result:</div>
                  <div className="text-lg font-semibold text-red-400">You're always reacting, never preventing.</div>
                </div>
              </div>

              {/* SiriusB iQ Approach */}
              <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <span className="text-2xl">📡</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-emerald-400">Continuous Intelligence</h3>
                    <p className="text-sm text-emerald-300/70">24/7 Monitoring</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {[
                    "4-hour initial audit, then real-time",
                    "Live dashboard + instant alerts",
                    "Negotiate anytime with fresh evidence",
                    "Automated action recommendations",
                    "Real-time violation detection & quantification",
                    "Predictive modeling (forward-looking)",
                    "Continuous baseline comparison"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <ChevronRight className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="text-neutral-300">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-6 border-t border-emerald-500/20">
                  <div className="text-sm text-emerald-300/70">Result:</div>
                  <div className="text-lg font-semibold text-emerald-400">You catch problems before they become losses.</div>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-8 px-8 py-4 rounded-full bg-neutral-900/70 border border-emerald-500/30">
                <div>
                  <div className="text-sm text-neutral-500">Traditional Audit</div>
                  <div className="text-2xl font-bold text-red-400">$85K-$250K</div>
                  <div className="text-xs text-neutral-600">12 weeks</div>
                </div>
                <ChevronRight className="w-6 h-6 text-emerald-400" />
                <div>
                  <div className="text-sm text-emerald-300/70">Continuous Intelligence</div>
                  <div className="text-2xl font-bold text-emerald-400">$12,500</div>
                  <div className="text-xs text-emerald-500">4 hours + 24/7</div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <BadgeDetailSystem
        badgeType={selectedBadge}
        level={badgeLevel}
        onClose={handleBadgeClose}
        onNextLevel={handleNextLevel}
      />

      <ExitIntentPopup />
    </>
  );
}