import Head from "next/head";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { SEO } from "@/components/SEO";
import {
  FileText, Shield, TrendingUp, CheckCircle2, Activity, ArrowRight,
  Building2, Database, BarChart3, Award, AlertTriangle, Clock,
  DollarSign, Percent, ChevronRight, Check, X, Layers, Eye, Info, BookOpen, Sparkles, Zap, Brain } from
"lucide-react";
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
import { TimeSavingsComparison } from "@/components/marketing/TimeSavingsComparison";
import { SecurityBadges } from "@/components/marketing/SecurityBadges";
import { LiveDemoCTA } from "@/components/marketing/LiveDemoCTA";
import { ObjectionsFAQ } from "@/components/marketing/ObjectionsFAQ";
import { QuantifiedTestimonials } from "@/components/marketing/QuantifiedTestimonials";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const mockAudits = [
{ company: "Midwest Logistics", lives: 420, issue: "Generic Spread Markup", savings: "$142,500", severity: "high" },
{ company: "Apparel Retailer", lives: 1250, issue: "Rebate GPO Retained", savings: "$684,000", severity: "critical" },
{ company: "Tech Solutions", lives: 310, issue: "Specialty Coupon Exclusion", savings: "$94,200", severity: "medium" },
{ company: "Northeast Manufacturing", lives: 2800, issue: "MAC List Overcharges", savings: "$1,120,400", severity: "critical" },
{ company: "Southwest Healthcare", lives: 850, issue: "Non-Fid Commission Skimming", savings: "$322,000", severity: "high" }];


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

const AnimatedSection = ({ children, className = "" }: {children: React.ReactNode;className?: string;}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUpVariants}
      className={className}>
      
      {children}
    </motion.div>);

};

const FloatingParticle = ({ delay = 0, duration = 20 }: { delay?: number; duration?: number }) => {
  return (
    <motion.div
      className="absolute w-1 h-1 bg-[#B8860B] rounded-full"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
      animate={{
        y: [-20, -40, -20],
        x: [-10, 10, -10],
        opacity: [0, 1, 0],
        scale: [0, 1.5, 0]
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "easeInOut"
      }}
    />
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
  const specialtyDrugs: Record<string, {brand: string;pbm: number;costplus: number;indication: string;}> = {
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

  const estimatedSpreadLeakage = calcSpend * (calcSpread / 100);
  const estimatedPbmSavings = estimatedSpreadLeakage * 0.85;
  const pmpmSavings = estimatedPbmSavings / calcLives / 12;

  const currentDrugData = specialtyDrugs[selectedSpecialtyDrug];
  const drugSavings = currentDrugData.pbm - currentDrugData.costplus;
  const drugSavingsPercent = (drugSavings / currentDrugData.pbm * 100).toFixed(0);

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
        title="Kincaid Health | Healthcare Intelligence & PBM Transparency Platform"
        description="Enterprise-grade PBM transparency, claims analytics, and fiduciary governance platform. Real-time cost intelligence and automated contract enforcement for self-insured employers."
        image="/og-image.png"
      />
      <Head>
        <title>Kincaid Health | Healthcare Intelligence Platform</title>
      </Head>
      
      
      <Nav />
      
      <div className="min-h-screen bg-[#0F1419] text-neutral-100 selection:bg-[#B8860B]/20 overflow-x-hidden font-sans">

        {/* Hero Section - Enhanced with 3D Parallax & Particles */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Multi-layer Animated Background */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Base gradient layer */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-[#0C1117] via-[#1A2A3A] to-[#0C1117]"
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
              style={{ backgroundSize: "200% 200%" }}
            />
            
            {/* Animated grid overlay */}
            <motion.div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `linear-gradient(to right, #2A3F54 1px, transparent 1px),
                                 linear-gradient(to bottom, #2A3F54 1px, transparent 1px)`,
                backgroundSize: "80px 80px"
              }}
              animate={{
                backgroundPosition: ["0px 0px", "80px 80px"],
              }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Floating orbs with glow */}
            <motion.div 
              className="absolute top-20 left-20 w-96 h-96 bg-[#1A3A52] rounded-full blur-3xl opacity-30"
              animate={{
                x: [0, 50, 0],
                y: [0, 30, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute bottom-20 right-20 w-96 h-96 bg-[#B8860B] rounded-full blur-3xl opacity-20"
              animate={{
                x: [0, -30, 0],
                y: [0, -50, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Radial glow from center */}
            <motion.div 
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1A3A52]/20 via-transparent to-transparent"
              animate={{
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 relative z-10">
            <motion.div 
              className="max-w-4xl mx-auto text-center space-y-8"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Animated badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Badge className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1A3A52] to-[#234766] text-[#B8860B] border border-[#B8860B]/30 px-4 py-2 text-sm font-bold shadow-2xl">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <Shield className="h-4 w-4" />
                  </motion.div>
                  Evidence-First™ Fiduciary Intelligence
                </Badge>
              </motion.div>

              {/* Main headline with text gradient animation */}
              <motion.h1 
                className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <motion.span 
                  className="block bg-gradient-to-r from-white via-neutral-100 to-white bg-clip-text text-transparent bg-[length:200%_auto]"
                  animate={{
                    backgroundPosition: ["0%", "200%"],
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                >
                  Sovereign by Math,
                </motion.span>
                <motion.span 
                  className="block mt-2 bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#B8860B] bg-clip-text text-transparent bg-[length:200%_auto]"
                  animate={{
                    backgroundPosition: ["200%", "0%"],
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                >
                  Not by Trust
                </motion.span>
              </motion.h1>

              {/* Subtitle with stagger animation */}
              <motion.p 
                className="text-xl md:text-2xl text-neutral-300 leading-relaxed max-w-3xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Enterprise healthcare intelligence platform that{" "}
                <span className="text-[#B8860B] font-semibold">cryptographically verifies</span>{" "}
                every contract term, claims transaction, and fiduciary decision with{" "}
                <span className="text-white font-semibold">actuarial-grade evidence receipts</span>.
              </motion.p>

              {/* Enhanced CTA buttons with magnetic hover */}
              <motion.div 
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <CalendlyWidget 
                    url="https://calendly.com/jer-kincaidrmc/new-meeting"
                    buttonText="Book Your Free Fiduciary Audit"
                    className="relative group bg-gradient-to-r from-[#1A3A52] to-[#234766] hover:from-[#234766] hover:to-[#2A5A82] text-white font-bold text-base px-8 py-4 rounded-xl transition-all duration-300 shadow-2xl shadow-[#1A3A52]/50 hover:shadow-[#1A3A52]/80 w-full sm:w-auto overflow-hidden"
                  />
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href="#roi-calculator"
                    className="relative group flex items-center justify-center gap-2 border-2 border-[#2A3F54] hover:border-[#B8860B] bg-transparent hover:bg-[#151B23] text-neutral-200 hover:text-white font-bold text-base px-8 py-4 rounded-xl transition-all duration-300 w-full sm:w-auto overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#B8860B]/0 via-[#B8860B]/10 to-[#B8860B]/0 opacity-0 group-hover:opacity-100"
                      animate={{
                        x: ["-100%", "100%"],
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <DollarSign className="h-5 w-5 relative z-10" />
                    <span className="relative z-10">Calculate Your Savings</span>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Trust indicators with fade-in */}
              <motion.div 
                className="flex flex-wrap items-center justify-center gap-6 md:gap-8 pt-8 text-sm text-neutral-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.8 }}
              >
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  </motion.div>
                  <span>SOC 2 Type II Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                  >
                    <Shield className="h-5 w-5 text-emerald-400" />
                  </motion.div>
                  <span>HIPAA Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                  >
                    <Award className="h-5 w-5 text-emerald-400" />
                  </motion.div>
                  <span>ERISA Section 404 Validated</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Animated scroll indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ 
              opacity: { delay: 1.2 },
              y: { duration: 2, repeat: Infinity }
            }}
          >
            <div className="flex flex-col items-center gap-2 text-neutral-400">
              <span className="text-xs font-mono uppercase tracking-widest">Scroll to Explore</span>
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ChevronRight className="h-6 w-6 rotate-90" />
              </motion.div>
            </div>
          </motion.div>
        </section>

        <section className="py-12 border-t border-neutral-800 bg-neutral-900/30">
          <div className="container mx-auto px-4 max-w-6xl">
            <AnimatedSection>
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-6">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  The Fundamental Difference
                </div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                  Continuous Intelligence vs.<br />
                  <span className="text-neutral-500">Point-in-Time Audits</span>
                </h2>
                <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
                  Traditional consultants show you what happened last quarter. Kincaid Health shows you what's happening right now—and what to do about it.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <motion.div 
                  className="bg-neutral-900/70 border border-red-900/30 rounded-xl p-8"
                  whileHover={{ scale: 1.01, borderColor: "rgba(220, 38, 38, 0.5)" }}
                >
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
                    "Single snapshot in time"].
                    map((item, idx) =>
                    <li key={idx} className="flex items-start gap-3">
                        <span className="text-red-500 mt-1">✗</span>
                        <span className="text-neutral-400">{item}</span>
                      </li>
                    )}
                  </ul>
                  <div className="mt-6 pt-6 border-t border-neutral-800">
                    <div className="text-sm text-neutral-500">Result:</div>
                    <div className="text-lg font-semibold text-red-400">You're always reacting, never preventing.</div>
                  </div>
                </motion.div>

                <motion.div 
                  className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-xl p-8"
                  whileHover={{ scale: 1.01, boxShadow: "0 0 40px rgba(16, 185, 129, 0.3)" }}
                >
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
                    "Continuous baseline comparison"].
                    map((item, idx) =>
                    <li key={idx} className="flex items-start gap-3">
                        <ChevronRight className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="text-neutral-300">{item}</span>
                      </li>
                    )}
                  </ul>
                  <div className="mt-6 pt-6 border-t border-emerald-500/20">
                    <div className="text-sm text-emerald-300/70">Result:</div>
                    <div className="text-lg font-semibold text-emerald-400">You catch problems before they become losses.</div>
                  </div>
                </motion.div>
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

        <section className="relative py-16 border-t border-[#1F2937] overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 opacity-10 bg-gradient-to-b from-transparent via-[#B8860B]/5 to-transparent" />
          </div>
          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
            
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
            <AnimatedSection className="mb-8 text-center max-w-3xl mx-auto space-y-4">
              <span className="text-xs font-mono text-[#B8860B] uppercase tracking-widest font-semibold">Operational Blueprint</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold">The 30-Day Forensic Audit Journey</h2>
              <p className="text-neutral-400 text-lg leading-relaxed">
                Our standardized 30-day fiduciary audit pipeline processes raw claim lines securely under ERISA protection with zero operational friction.
              </p>
            </AnimatedSection>
          </div>
        </section>

        <section className="relative py-12 max-w-7xl mx-auto px-4 md:px-8 overflow-hidden border-t border-[#1F2937]">
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <TechBackdrop intensity={0.3} density={0.6} />
          </div>

          <AnimatedSection className="mb-8 text-center max-w-3xl mx-auto space-y-4">
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
            viewport={{ once: true, margin: "-100px" }}>
            
            
            <motion.div
              variants={fadeInUpVariants}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group relative rounded-lg border-2 border-[#D4AF37]/50 bg-gradient-to-br from-amber-100 via-yellow-50 to-amber-200 p-5 hover:border-[#FFD700] hover:shadow-2xl hover:shadow-[#FFD700]/60 cursor-pointer transition-all duration-300 overflow-hidden">
              <Link href="/pillars/verified-savings-documentation" className="absolute inset-0 z-20" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-amber-100/30 to-yellow-200/40 pointer-events-none" />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute top-2 right-2 w-1 h-1 bg-white rounded-full"
                animate={{
                  scale: [0, 1.5, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              />
              <motion.div
                className="absolute top-4 right-6 w-1 h-1 bg-[#FFD700] rounded-full"
                animate={{
                  scale: [0, 1.2, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.5,
                  repeatDelay: 1
                }}
              />
              
              <div className="mb-3 inline-flex rounded bg-amber-900/20 p-2.5 relative z-10">
                <FileText className="h-5 w-5 text-amber-900" />
              </div>
              <h3 className="mb-2 text-base font-serif font-bold text-amber-900 relative z-10">Verified Savings Documentation</h3>
              <p className="text-xs text-amber-800 leading-relaxed relative z-10">
                Timestamped audit trail documenting contract compliance events, overcharge recoveries, and third-party verification records with complete chain of custody.
              </p>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-amber-900 group-hover:text-amber-950 relative z-10">
                Review documentation standards <ChevronRight className="h-3.5 w-3.5" />
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUpVariants}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group relative rounded-lg border-2 border-[#D4AF37]/50 bg-gradient-to-br from-amber-100 via-yellow-50 to-amber-200 p-5 hover:border-[#FFD700] hover:shadow-2xl hover:shadow-[#FFD700]/60 cursor-pointer transition-all duration-300 overflow-hidden">
              <Link href="/pillars/financial-impact-analysis" className="absolute inset-0 z-20" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-amber-100/30 to-yellow-200/40 pointer-events-none" />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut",
                  delay: 0.3
                }}
              />
              <motion.div
                className="absolute top-3 right-3 w-1 h-1 bg-white rounded-full"
                animate={{
                  scale: [0, 1.5, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.2,
                  repeatDelay: 1
                }}
              />
              <motion.div
                className="absolute top-5 right-7 w-1 h-1 bg-[#FFD700] rounded-full"
                animate={{
                  scale: [0, 1.2, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.7,
                  repeatDelay: 1
                }}
              />
              
              <div className="mb-3 inline-flex rounded bg-amber-900/20 p-2.5 relative z-10">
                <Shield className="h-5 w-5 text-amber-900" />
              </div>
              <h3 className="mb-2 text-base font-serif font-bold text-amber-900 relative z-10">Financial Impact Analysis</h3>
              <p className="text-xs text-amber-800 leading-relaxed relative z-10">
                Quantitative assessment of pharmacy benefit optimization on enterprise profitability. Direct measurement of prescription cost containment effects on operating margins.
              </p>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-amber-900 group-hover:text-amber-950 relative z-10">
                Review financial methodology <ChevronRight className="h-3.5 w-3.5" />
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUpVariants}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group relative rounded-lg border-2 border-[#D4AF37]/50 bg-gradient-to-br from-amber-100 via-yellow-50 to-amber-200 p-5 hover:border-[#FFD700] hover:shadow-2xl hover:shadow-[#FFD700]/60 cursor-pointer transition-all duration-300 overflow-hidden">
              <Link href="/pillars/multi-source-data-reconciliation" className="absolute inset-0 z-20" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-amber-100/30 to-yellow-200/40 pointer-events-none" />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut",
                  delay: 0.6
                }}
              />
              <motion.div
                className="absolute top-2 right-4 w-1 h-1 bg-white rounded-full"
                animate={{
                  scale: [0, 1.5, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.4,
                  repeatDelay: 1
                }}
              />
              <motion.div
                className="absolute top-6 right-2 w-1 h-1 bg-[#FFD700] rounded-full"
                animate={{
                  scale: [0, 1.2, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.9,
                  repeatDelay: 1
                }}
              />
              
              <div className="mb-3 inline-flex rounded bg-amber-900/20 p-2.5 relative z-10">
                <Database className="h-5 w-5 text-amber-900" />
              </div>
              <h3 className="mb-2 text-base font-serif font-bold text-amber-900 relative z-10">Multi-Source Data Reconciliation</h3>
              <p className="text-xs text-amber-800 leading-relaxed relative z-10">
                Integration and normalization of claims data, contract formularies, and pricing benchmarks across disparate healthcare data sources for actuarial analysis.
              </p>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-amber-900 group-hover:text-amber-950 relative z-10">
                Review integration protocols <ChevronRight className="h-3.5 w-3.5" />
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUpVariants}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group relative rounded-lg border-2 border-[#D4AF37]/50 bg-gradient-to-br from-amber-100 via-yellow-50 to-amber-200 p-5 hover:border-[#FFD700] hover:shadow-2xl hover:shadow-[#FFD700]/60 cursor-pointer transition-all duration-300 overflow-hidden">
              <Link href="/pillars/contract-intelligence-compliance" className="absolute inset-0 z-20" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-amber-100/30 to-yellow-200/40 pointer-events-none" />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut",
                  delay: 0.9
                }}
              />
              <motion.div
                className="absolute top-4 right-5 w-1 h-1 bg-white rounded-full"
                animate={{
                  scale: [0, 1.5, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.6,
                  repeatDelay: 1
                }}
              />
              <motion.div
                className="absolute top-2 right-8 w-1 h-1 bg-[#FFD700] rounded-full"
                animate={{
                  scale: [0, 1.2, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 1.1,
                  repeatDelay: 1
                }}
              />
              
              <div className="mb-3 inline-flex rounded bg-amber-900/20 p-2.5 relative z-10">
                <FileText className="h-5 w-5 text-amber-900" />
              </div>
              <h3 className="mb-2 text-base font-serif font-bold text-amber-900 relative z-10">Contract Intelligence & Compliance</h3>
              <p className="text-xs text-amber-800 leading-relaxed relative z-10">
                Automated PBM contract clause extraction, fiduciary scoring, and continuous monitoring of contractual guarantee fulfillment against actual performance metrics.
              </p>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-amber-900 group-hover:text-amber-950 relative z-10">
                Review contract monitoring <ChevronRight className="h-3.5 w-3.5" />
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUpVariants}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group relative rounded-lg border-2 border-[#D4AF37]/50 bg-gradient-to-br from-amber-100 via-yellow-50 to-amber-200 p-5 hover:border-[#FFD700] hover:shadow-2xl hover:shadow-[#FFD700]/60 cursor-pointer transition-all duration-300 overflow-hidden">
              <Link href="/pillars/actuarial-risk-modeling" className="absolute inset-0 z-20" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-amber-100/30 to-yellow-200/40 pointer-events-none" />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut",
                  delay: 1.2
                }}
              />
              <motion.div
                className="absolute top-3 right-6 w-1 h-1 bg-white rounded-full"
                animate={{
                  scale: [0, 1.5, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.8,
                  repeatDelay: 1
                }}
              />
              <motion.div
                className="absolute top-5 right-3 w-1 h-1 bg-[#FFD700] rounded-full"
                animate={{
                  scale: [0, 1.2, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 1.3,
                  repeatDelay: 1
                }}
              />
              
              <div className="mb-3 inline-flex rounded bg-amber-900/20 p-2.5 relative z-10">
                <TrendingUp className="h-5 w-5 text-amber-900" />
              </div>
              <h3 className="mb-2 text-base font-serif font-bold text-amber-900 relative z-10">Actuarial Risk Modeling</h3>
              <p className="text-xs text-amber-800 leading-relaxed relative z-10">
                Monte Carlo simulation engines for benefit cost forecasting, stop-loss optimization, and multi-year trend projection with confidence intervals and scenario planning.
              </p>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-amber-900 group-hover:text-amber-950 relative z-10">
                Review risk methodology <ChevronRight className="h-3.5 w-3.5" />
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUpVariants}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group relative rounded-lg border-2 border-[#D4AF37]/50 bg-gradient-to-br from-amber-100 via-yellow-50 to-amber-200 p-5 hover:border-[#FFD700] hover:shadow-2xl hover:shadow-[#FFD700]/60 cursor-pointer transition-all duration-300 overflow-hidden">
              <Link href="/pillars/realtime-claims-surveillance" className="absolute inset-0 z-20" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-amber-100/30 to-yellow-200/40 pointer-events-none" />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut",
                  delay: 1.5
                }}
              />
              <motion.div
                className="absolute top-2 right-7 w-1 h-1 bg-white rounded-full"
                animate={{
                  scale: [0, 1.5, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 1.0,
                  repeatDelay: 1
                }}
              />
              <motion.div
                className="absolute top-6 right-4 w-1 h-1 bg-[#FFD700] rounded-full"
                animate={{
                  scale: [0, 1.2, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 1.5,
                  repeatDelay: 1
                }}
              />
              
              <div className="mb-3 inline-flex rounded bg-amber-900/20 p-2.5 relative z-10">
                <Activity className="h-5 w-5 text-amber-900" />
              </div>
              <h3 className="mb-2 text-base font-serif font-bold text-amber-900 relative z-10">Real-Time Claims Surveillance</h3>
              <p className="text-xs text-amber-800 leading-relaxed relative z-10">
                Live streaming anomaly detection for prescription claims processing, flagging formulary violations, spread pricing irregularities, and specialty drug overcharges as they occur.
              </p>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-amber-900 group-hover:text-amber-950 relative z-10">
                Review surveillance protocols <ChevronRight className="h-3.5 w-3.5" />
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUpVariants}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group relative rounded-lg border-2 border-[#D4AF37]/50 bg-gradient-to-br from-amber-100 via-yellow-50 to-amber-200 p-5 hover:border-[#FFD700] hover:shadow-2xl hover:shadow-[#FFD700]/60 cursor-pointer transition-all duration-300 overflow-hidden">
              <Link href="/pillars/regulatory-legal-framework" className="absolute inset-0 z-20" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-amber-100/30 to-yellow-200/40 pointer-events-none" />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut",
                  delay: 1.8
                }}
              />
              <motion.div
                className="absolute top-4 right-2 w-1 h-1 bg-white rounded-full"
                animate={{
                  scale: [0, 1.5, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 1.2,
                  repeatDelay: 1
                }}
              />
              <motion.div
                className="absolute top-2 right-5 w-1 h-1 bg-[#FFD700] rounded-full"
                animate={{
                  scale: [0, 1.2, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 1.7,
                  repeatDelay: 1
                }}
              />
              
              <div className="mb-3 inline-flex rounded bg-amber-900/20 p-2.5 relative z-10">
                <Award className="h-5 w-5 text-amber-900" />
              </div>
              <h3 className="mb-2 text-base font-serif font-bold text-amber-900 relative z-10">Regulatory & Legal Framework</h3>
              <p className="text-xs text-amber-800 leading-relaxed relative z-10">
                ERISA fiduciary compliance validation, DOL audit readiness, and CAA transparency requirements enforcement with automated legal documentation and evidence preservation.
              </p>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-amber-900 group-hover:text-amber-950 relative z-10">
                Review compliance standards <ChevronRight className="h-3.5 w-3.5" />
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUpVariants}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group relative rounded-lg border-2 border-[#D4AF37]/50 bg-gradient-to-br from-amber-100 via-yellow-50 to-amber-200 p-5 hover:border-[#FFD700] hover:shadow-2xl hover:shadow-[#FFD700]/60 cursor-pointer transition-all duration-300 overflow-hidden">
              <Link href="/pillars/predictive-cost-analytics" className="absolute inset-0 z-20" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-amber-100/30 to-yellow-200/40 pointer-events-none" />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut",
                  delay: 2.1
                }}
              />
              <motion.div
                className="absolute top-3 right-4 w-1 h-1 bg-white rounded-full"
                animate={{
                  scale: [0, 1.5, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 1.4,
                  repeatDelay: 1
                }}
              />
              <motion.div
                className="absolute top-5 right-8 w-1 h-1 bg-[#FFD700] rounded-full"
                animate={{
                  scale: [0, 1.2, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 1.9,
                  repeatDelay: 1
                }}
              />
              
              <div className="mb-3 inline-flex rounded bg-amber-900/20 p-2.5 relative z-10">
                <BarChart3 className="h-5 w-5 text-amber-900" />
              </div>
              <h3 className="mb-2 text-base font-serif font-bold text-amber-900 relative z-10">Predictive Cost Analytics</h3>
              <p className="text-xs text-amber-800 leading-relaxed relative z-10">
                Machine learning models for future spend forecasting, therapeutic substitution impact analysis, and proactive intervention opportunity identification to prevent cost escalation.
              </p>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-amber-900 group-hover:text-amber-950 relative z-10">
                Review predictive models <ChevronRight className="h-3.5 w-3.5" />
              </div>
            </motion.div>

          </motion.div>
        </section>

        <section id="dashboard" className="relative py-12 border-t border-[#1F2937] overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 opacity-40">
              <TechBackdrop intensity={0.8} density={1.0} />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1A3A52]/10 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#B8860B]/5 via-transparent to-transparent" />
          </div>

          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
            <AnimatedSection className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <div className="space-y-3">
                <motion.span
                  className="inline-block text-xs font-mono text-[#B8860B] uppercase tracking-widest font-semibold"
                  animate={{
                    textShadow: [
                    "0 0 10px rgba(184, 134, 11, 0.3)",
                    "0 0 20px rgba(184, 134, 11, 0.5)",
                    "0 0 10px rgba(184, 134, 11, 0.3)"]

                  }}
                  transition={{ duration: 2, repeat: Infinity }}>
                  
                  Kincaid Health
                </motion.span>
                <h2 className="text-4xl md:text-5xl font-serif font-bold bg-gradient-to-r from-white via-neutral-100 to-neutral-300 bg-clip-text text-transparent">
                  Kincaid Health™
                </h2>
                <p className="text-neutral-400 text-lg leading-relaxed">
                  Real-time overcharge tracking feeds and analytical dashboards optimized for each executive role.
                </p>
              </div>
              <Link
                href="/solutions"
                className="group inline-flex items-center gap-2 border border-[#2A3F54] hover:border-[#B8860B] bg-gradient-to-br from-[#151B23] to-[#0F1419] px-6 py-3 rounded text-sm font-semibold text-neutral-200 hover:text-white transition-all duration-300 shadow-lg hover:shadow-[#B8860B]/20">
                
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
                { key: "pe", label: "PE Operator View" }].
                map((role) =>
                <button
                  key={role.key}
                  onClick={() => setActiveWarRoomRole(role.key as any)}
                  className={`relative px-6 py-3 rounded-md text-sm font-semibold transition-all duration-300 ${
                  activeWarRoomRole === role.key ?
                  "bg-gradient-to-br from-[#1A3A52] to-[#234766] text-white shadow-lg shadow-[#1A3A52]/50" :
                  "text-neutral-400 hover:text-white hover:bg-[#151B23]/50"}`
                  }>
                  
                    {activeWarRoomRole === role.key &&
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-br from-[#1A3A52] to-[#234766] rounded-md"
                    style={{ zIndex: -1 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />

                  }
                    <span className="relative z-10">{role.label}</span>
                  </button>
                )}
              </div>
            </AnimatedSection>

            <AnimatedSection className="rounded-xl border border-[#2A3F54] bg-gradient-to-br from-[#0C1117] via-[#0F1419] to-[#0C1117] p-10 relative overflow-hidden shadow-2xl">
              <motion.div
                className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#B8860B] to-transparent"
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scaleX: [0.8, 1, 0.8]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
              
              
              <div className="absolute top-0 left-0 w-32 h-32 bg-[#1A3A52] opacity-20 blur-3xl" />
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#B8860B] opacity-10 blur-3xl" />
              
              {activeWarRoomRole === "cfo" &&
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
                      "0 0 20px rgba(184, 134, 11, 0.2)"]

                    }}
                    transition={{ duration: 2, repeat: Infinity }}>
                    
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
              }

              {activeWarRoomRole === "chro" &&
              <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#1A3A52]/20 via-transparent to-[#B8860B]/20 rounded-xl blur-xl" />
                  <CHROWarRoom />
                </div>
              }

              {activeWarRoomRole === "board" &&
              <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#1A3A52]/20 via-transparent to-[#B8860B]/20 rounded-xl blur-xl" />
                  <BoardWarRoom />
                </div>
              }

              {activeWarRoomRole === "pe" &&
              <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#1A3A52]/20 via-transparent to-[#B8860B]/20 rounded-xl blur-xl" />
                  <PEOperatorWarRoom />
                </div>
              }
              
            </AnimatedSection>
          </div>
        </section>

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
          }]
          } />
        

        <QuantifiedTestimonials />

        {/* Platform Preview */}
        <section className="py-24 bg-gradient-to-b from-background to-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary mb-4">
                See Kincaid IQ in Action
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Experience the platform that transforms healthcare benefits from a cost center into a strategic advantage
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <Card className="bg-slate-900/50 border-slate-800 hover:border-primary/50 transition-all duration-300">
                <CardContent className="p-6">
                  <TrendingUp className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold text-white mb-3">Live Analytics</h3>
                  <p className="text-slate-300 leading-relaxed">
                    Real-time claims intelligence with predictive trend modeling and anomaly detection
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-800 hover:border-accent/50 transition-all duration-300">
                <CardContent className="p-6">
                  <Shield className="w-12 h-12 text-accent mb-4" />
                  <h3 className="text-xl font-bold text-white mb-3">Fiduciary Defense</h3>
                  <p className="text-slate-300 leading-relaxed">
                    Automated compliance monitoring with full audit trails and ERISA documentation
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-800 hover:border-secondary/50 transition-all duration-300">
                <CardContent className="p-6">
                  <Brain className="w-12 h-12 text-secondary mb-4" />
                  <h3 className="text-xl font-bold text-white mb-3">AI Copilot</h3>
                  <p className="text-slate-300 leading-relaxed">
                    Natural language queries with instant actuarial-grade analysis and reporting
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Link
                href="/platform"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300 group">
                Explore Platform Features
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        <section className="relative py-12 border-t border-[#1F2937]">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <LiveDemoCTA variant="hero" />
          </div>
        </section>

        <ObjectionsFAQ />

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
              viewport={{ once: true }}>
              
              <motion.span variants={fadeInUpVariants} className="border border-[#2A3F54] bg-[#151B23] px-3 py-1.5 rounded">SSAE-18 SOC 2 TYPE II</motion.span>
              <motion.span variants={fadeInUpVariants} className="border border-[#2A3F54] bg-[#151B23] px-3 py-1.5 rounded">HIPAA ENCRYPTED</motion.span>
              <motion.span variants={fadeInUpVariants} className="border border-[#2A3F54] bg-[#151B23] px-3 py-1.5 rounded">ERISA FIDUCIARY</motion.span>
              <motion.span variants={fadeInUpVariants} className="border border-[#2A3F54] bg-[#151B23] px-3 py-1.5 rounded">AAA STANDARDS</motion.span>
            </motion.div>
          </div>
        </section>

        <Footer />

        <SecurityBadges variant="full" showTrustCenter={true} />
      </div>

      <BadgeDetailSystem
        badgeType={selectedBadge}
        level={badgeLevel}
        onClose={handleBadgeClose}
        onNextLevel={handleNextLevel} />
      

      <ExitIntentPopup />
    </>);

}