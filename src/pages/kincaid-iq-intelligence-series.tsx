import { useState, useEffect, useMemo } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  FileText, TrendingUp, Shield, ChevronRight, Download, ExternalLink, 
  BarChart3, AlertCircle, Users, Award, Clock, DollarSign, Activity, 
  Microscope, Target, Zap, Database, AlertTriangle, Check, Info, RefreshCw, Filter, ListCollapse, Briefcase, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { INDIVIDUAL_REPORTS, ENTERPRISE_REPORTS, type IndividualReport, type EnterpriseReport } from "@/lib/pricing/individual-reports";
import { IntelligenceCheckoutModal } from "@/components/IntelligenceCheckoutModal";

// Mock Live Stream Data
const initialAuditEvents = [
  { id: 1, time: "Just now", plan: "Midwest Logistics Group", type: "MAC Spread Spike", desc: "Generic ImIPRAMINE markup detected at 410% above NADAC", loss: "$12,450", severity: "critical" },
  { id: 2, time: "3 mins ago", plan: "Coastal Health System", type: "Rebate Misclassification", desc: "Specialty biosimilar categorized as generic to retain GPO fee share", loss: "$48,200", severity: "high" },
  { id: 3, time: "12 mins ago", plan: "Apex Industrial Corp", type: "AWP Inflation", desc: "AWP baseline of brand-name asthma drug inflated by 14.8% vs Medi-Span reference", loss: "$84,100", severity: "critical" },
  { id: 4, time: "25 mins ago", plan: "Great Lakes Schools Trust", type: "Prior Auth Bypass Failure", desc: "Automatic formulary steer to higher-rebate tier despite pre-auth approval", loss: "$6,900", severity: "medium" },
  { id: 5, time: "40 mins ago", plan: "Texan Energy Partners", type: "Specialty Pharmacy Spread", desc: "Buy-and-bill drug billed via PBM-owned specialty portal at 28% markup", loss: "$31,700", severity: "high" },
];

type PriceRange = "all" | "0-5k" | "5k-20k" | "20k-50k" | "50k+";

// Animated Counter Component
function AnimatedCounter({ value, duration = 2000 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      setCount(Math.floor(progress * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration]);

  return <span>{count}</span>;
}

export default function KincaidIQIntelligenceSeries() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTier, setSelectedTier] = useState<"individual" | "enterprise" | "all">("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState<PriceRange>("all");
  const [activeTab, setActiveTab] = useState<"reports" | "live-stream">("reports");
  const [mounted, setMounted] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<IndividualReport | null>(null);
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // Live Stream state
  const [auditEvents, setAuditEvents] = useState(initialAuditEvents);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOrderClick = (report: IndividualReport) => {
    setSelectedReport(report);
    setCheckoutModalOpen(true);
  };

  const triggerMockAlertRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      const plans = ["Rocky Mountain Foods", "Pacific Dev Tech", "Southern Union Rail", "Northeast Retailers", "Desert Medical Gp"];
      const types = ["MAC Spread Spike", "Specialty Pharmacy Spread", "Rebate Misclassification", "AWP Inflation"];
      const desc = ["Generic Adalimumab margin discrepancy on auto-sub", "Billed specialty copay cards absorbed by plan accumulator", "Generic MAC pricing deviated 4.1x from benchmark", "Undisclosed GPO admin fee mismatch on high-cost brand"];
      const losses = ["$18,400", "$52,900", "$11,200", "$94,300"];
      const severities = ["high", "critical", "medium", "critical"];

      const randomIdx = Math.floor(Math.random() * plans.length);
      const newAlert = {
        id: Date.now(),
        time: "Just now",
        plan: plans[randomIdx],
        type: types[Math.floor(Math.random() * types.length)],
        desc: desc[Math.floor(Math.random() * desc.length)],
        loss: losses[Math.floor(Math.random() * losses.length)],
        severity: severities[Math.floor(Math.random() * severities.length)]
      };

      setAuditEvents(prev => [newAlert, ...prev.slice(0, 4)].map((alert, idx) => ({
        ...alert,
        time: idx === 0 ? "Just now" : `${idx * 4} mins ago`
      })));
      setIsRefreshing(false);
    }, 800);
  };

  // Combine all reports with tier info
  const allReports = useMemo(() => {
    const individual = INDIVIDUAL_REPORTS.map(r => ({ ...r, tier: "individual" as const }));
    const enterprise = ENTERPRISE_REPORTS.map(r => ({ ...r, tier: "enterprise" as const }));
    return [...individual, ...enterprise];
  }, []);

  // Get unique categories from all reports
  const categories = useMemo(() => {
    const cats = new Set<string>();
    INDIVIDUAL_REPORTS.forEach(r => cats.add(r.category));
    ENTERPRISE_REPORTS.forEach(r => cats.add(r.category));
    return ["all", ...Array.from(cats).sort()];
  }, []);

  // Price range filter helper
  const filterByPriceRange = (price: number, range: PriceRange): boolean => {
    if (range === "all") return true;
    if (range === "0-5k") return price <= 5000;
    if (range === "5k-20k") return price > 5000 && price <= 20000;
    if (range === "20k-50k") return price > 20000 && price <= 50000;
    if (range === "50k+") return price > 50000;
    return true;
  };

  // Filter reports
  const filteredReports = useMemo(() => {
    let reports = allReports;
    
    if (selectedTier !== "all") {
      reports = reports.filter(r => r.tier === selectedTier);
    }
    
    if (selectedCategory !== "all") {
      reports = reports.filter(r => r.category === selectedCategory);
    }

    if (selectedPriceRange !== "all") {
      reports = reports.filter(r => filterByPriceRange(r.price, selectedPriceRange));
    }
    
    return reports;
  }, [allReports, selectedCategory, selectedTier, selectedPriceRange]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <>
      <Head>
        <title>Intelligence Products | Kincaid Health Data Sciences Lab</title>
        <meta name="description" content="Forensic PBM intelligence reports and actuarial analysis for fiduciaries, actuaries, and capital markets." />
      </Head>
      <SEO 
        title="Intelligence Products — Kincaid Health"
        description="Real-world case studies demonstrating how Kincaid Health uncovers hidden waste and protects bottom lines."
      />

      <Nav />

      <main className="min-h-screen bg-[#0F1419] relative overflow-hidden">
        {/* Animated Gradient Background Mesh */}
        <motion.div 
          className="fixed inset-0 opacity-30 pointer-events-none"
          style={{ y: backgroundY }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/10 via-transparent to-[#D4AF37]/10" />
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#FFD700]/5 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
        </motion.div>

        {/* Hero Section */}
        <section className="relative py-20 flex items-center justify-center overflow-hidden z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-7xl mx-auto px-6"
          >
            <div className="max-w-3xl relative">
              {/* Floating Particles */}
              {mounted && [1, 2, 3, 4, 5].map((i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-[#FFD700] rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.4,
                  }}
                />
              ))}

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FFD700]/20 to-[#D4AF37]/10 border border-[#FFD700]/30 rounded-full px-5 py-2.5 text-xs font-mono text-[#FFD700] uppercase tracking-wider mb-6 backdrop-blur-sm"
              >
                <Sparkles className="w-4 h-4 text-[#FFD700] animate-pulse" />
                Forensic Intelligence Center
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-br from-white via-[#FFD700] to-[#D4AF37] bg-clip-text text-transparent leading-tight"
              >
                Intelligence Products
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xl text-neutral-300 max-w-3xl"
              >
                24 forensic reports from $2,000 to $1.2M — individual studies to Fortune 100 transformations.
              </motion.p>
            </div>
          </motion.div>
        </section>

        {/* Impact Metrics Panel with Animated Counters */}
        <section className="py-12 border-y border-[#FFD700]/20 bg-gradient-to-r from-[#0A0E27] to-[#0F1419] backdrop-blur-sm relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { value: 24, label: "Total Report Products", suffix: "" },
                { value: 2, label: "Starting Price", prefix: "$", suffix: "K-$1.2M" },
                { value: 16, label: "Min Labor Hours", suffix: "-8,500" },
                { value: 247, label: "Organizations Served", suffix: "" }
              ].map((metric, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-center group"
                >
                  <div className="text-5xl font-serif font-bold bg-gradient-to-br from-[#FFD700] to-[#D4AF37] bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                    {mounted ? (
                      <>
                        {metric.prefix}
                        <AnimatedCounter value={metric.value} />
                        {metric.suffix}
                      </>
                    ) : (
                      `${metric.prefix || ""}${metric.value}${metric.suffix}`
                    )}
                  </div>
                  <div className="text-sm text-neutral-400">{metric.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured: Mark Cuban Cost Plus with 3D Card Effects */}
        <section className="py-20 bg-gradient-to-b from-[#0A0E27] to-black border-b border-[#FFD700]/20 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Badge className="bg-amber-500/20 text-amber-400 border-2 border-amber-500/40 mb-4 uppercase tracking-wider text-xs px-4 py-2 animate-pulse">
                Featured Intelligence Series
              </Badge>
              <h2 className="text-5xl md:text-6xl font-serif font-bold bg-gradient-to-br from-white via-amber-200 to-amber-400 bg-clip-text text-transparent mb-4 leading-tight">
                Mark Cuban Cost Plus Drugs Intelligence
              </h2>
              <p className="text-lg text-neutral-300 max-w-3xl mx-auto leading-relaxed">
                Transparent pricing analysis and strategic integration reports for Cost Plus Drugs — quantify savings, optimize formularies, and maximize member value.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {INDIVIDUAL_REPORTS.filter(r => r.id.startsWith("cost-plus")).map((report, idx) => (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  whileHover={{ 
                    y: -8,
                    rotateX: 2,
                    rotateY: -2,
                    scale: 1.02
                  }}
                  className="group relative bg-gradient-to-br from-[#1A1F2E] to-[#0F1419] border-2 border-amber-500/40 hover:border-amber-400 rounded-2xl overflow-hidden transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-amber-500/30"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Glassmorphism Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Animated Border Gradient */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    animate={{
                      background: [
                        "linear-gradient(0deg, transparent, #FFD700)",
                        "linear-gradient(360deg, transparent, #FFD700)",
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    style={{ 
                      maskImage: "linear-gradient(black, black) content-box, linear-gradient(black, black)",
                      maskComposite: "exclude",
                      padding: "2px",
                    }}
                  />

                  <div className="p-8 relative z-10">
                    <div className="flex items-start justify-between mb-5">
                      <Badge className="bg-amber-500/30 text-amber-300 border border-amber-400/50 text-xs uppercase tracking-wider px-3 py-1.5 backdrop-blur-sm">
                        Cost Plus Intelligence
                      </Badge>
                      <div className="text-right">
                        <div className="text-3xl font-bold bg-gradient-to-br from-white to-amber-200 bg-clip-text text-transparent">
                          {formatCurrency(report.price)}
                        </div>
                        <div className="text-xs text-neutral-400 mt-1">{report.turnaroundDays} days</div>
                      </div>
                    </div>

                    <h3 className="text-2xl font-serif font-bold text-white mb-4 leading-tight group-hover:text-amber-100 transition-colors">
                      {report.name}
                    </h3>

                    <p className="text-sm text-neutral-300 mb-6 leading-relaxed">
                      {report.description}
                    </p>

                    <div className="bg-black/40 border border-amber-500/20 rounded-xl p-4 mb-6 backdrop-blur-sm">
                      <div className="text-[10px] font-mono uppercase tracking-widest text-amber-400 mb-3 flex items-center gap-2">
                        <Sparkles className="w-3 h-3" />
                        Key Deliverables
                      </div>
                      <div className="space-y-2">
                        {report.deliverables.slice(0, 4).map((item, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-start gap-2 text-xs text-neutral-200"
                          >
                            <Check className="w-4 h-4 mt-0.5 text-amber-400 flex-shrink-0" />
                            <span>{item}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button 
                        onClick={() => handleOrderClick(report)}
                        className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold text-sm py-3 shadow-lg shadow-amber-500/50 hover:shadow-xl hover:shadow-amber-500/70 transition-all"
                      >
                        Order Report
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                      <Link href="/contact">
                        <Button variant="outline" className="border-amber-500/40 text-amber-300 hover:bg-amber-500/10 px-4">
                          <Info className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-10 text-center"
            >
              <Link href="/solutions/mark-cuban-cost-drugs">
                <Button variant="outline" className="border-amber-500/40 text-amber-300 hover:bg-amber-500/10 group">
                  View Cost Plus Drugs Solution Page
                  <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* 8 Pillars Section */}
        <section className="py-20 bg-gradient-to-b from-black via-[#0A0E27] to-black border-b border-[#FFD700]/20 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="bg-[#FFD700]/20 text-[#FFD700] border-2 border-[#FFD700]/40 mb-4 uppercase tracking-wider text-xs px-4 py-2">
                Fiduciary Framework
              </Badge>
              <h2 className="text-5xl md:text-6xl font-serif font-bold bg-gradient-to-br from-white via-[#FFD700] to-[#D4AF37] bg-clip-text text-transparent mb-4 leading-tight">
                8 Pillars of Fiduciary Responsibility
              </h2>
              <p className="text-lg text-neutral-300 max-w-3xl mx-auto leading-relaxed">
                Comprehensive governance framework for board members and plan fiduciaries — defense-ready documentation and continuous oversight infrastructure.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-6 mb-12">
              {[
                { num: "1", title: "Verified Savings Documentation", desc: "Timestamped audit trail with complete chain of custody", href: "/pillars/verified-savings-documentation", color: "emerald" },
                { num: "2", title: "Financial Impact Analysis", desc: "EBITDA quantification and board-ready financial models", href: "/pillars/financial-impact-analysis", color: "blue" },
                { num: "3", title: "Multi-Source Data Reconciliation", desc: "Cross-system verification and data integrity validation", href: "/pillars/multi-source-data-reconciliation", color: "amber" },
                { num: "4", title: "Contract Intelligence & Compliance", desc: "Automated clause extraction and guarantee enforcement", href: "/pillars/contract-intelligence-compliance", color: "purple" },
                { num: "5", title: "Actuarial Risk Modeling", desc: "Monte Carlo simulations and credibility-weighted forecasts", href: "/pillars/actuarial-risk-modeling", color: "rose" },
                { num: "6", title: "Real-Time Claims Surveillance", desc: "Transaction-level anomaly detection and forensic alerts", href: "/pillars/realtime-claims-surveillance", color: "orange" },
                { num: "7", title: "Regulatory & Legal Framework", desc: "ERISA compliance monitoring and DOL audit readiness", href: "/pillars/regulatory-legal-framework", color: "indigo" },
                { num: "8", title: "Predictive Cost Analytics", desc: "AI-powered trend forecasting and intervention modeling", href: "/pillars/predictive-cost-analytics", color: "cyan" }
              ].map((pillar, idx) => (
                <Link key={pillar.num} href={pillar.href}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ y: -6, scale: 1.03 }}
                    className="group bg-gradient-to-br from-[#1A1F2E] to-[#0F1419] border-2 border-[#2A3F54] hover:border-[#FFD700] rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-[#FFD700]/20 cursor-pointer h-full relative overflow-hidden"
                  >
                    {/* Shimmer effect on hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "200%" }}
                      transition={{ duration: 0.6 }}
                    />

                    <div className="w-12 h-12 rounded-full bg-[#FFD700]/20 flex items-center justify-center mb-4 border-2 border-[#FFD700]/40 group-hover:border-[#FFD700] group-hover:bg-[#FFD700]/30 transition-all">
                      <span className="text-xl font-bold text-[#FFD700]">{pillar.num}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-white mb-2 group-hover:text-[#FFD700] transition-colors leading-tight">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </motion.div>
                </Link>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#1A1F2E] to-[#0F1419] border-2 border-[#FFD700]/40 rounded-2xl p-10 backdrop-blur-sm relative overflow-hidden"
            >
              {/* Animated glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700]/0 via-[#FFD700]/5 to-[#FFD700]/0 animate-pulse" />
              
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative z-10">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="w-6 h-6 text-[#FFD700]" />
                    <h3 className="text-2xl font-serif font-bold text-white">Board Fiduciary Defense Package</h3>
                  </div>
                  <p className="text-neutral-300 leading-relaxed mb-5">
                    Complete documentation framework demonstrating compliance with ERISA duty of prudence. Defense-ready audit trail for DOL inquiries, litigation response, and board reporting.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Badge className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-xs backdrop-blur-sm">
                      DOL Audit Ready
                    </Badge>
                    <Badge className="bg-blue-500/20 text-blue-300 border border-blue-400/40 text-xs backdrop-blur-sm">
                      Litigation Defense
                    </Badge>
                    <Badge className="bg-amber-500/20 text-amber-300 border border-amber-400/40 text-xs backdrop-blur-sm">
                      404(c) Compliance
                    </Badge>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <Link href="/personas/board-members">
                    <Button className="bg-gradient-to-r from-[#FFD700] to-[#D4AF37] hover:from-[#D4AF37] hover:to-[#FFD700] text-black font-bold whitespace-nowrap shadow-lg shadow-[#FFD700]/30">
                      Board Member Portal
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/board-of-directors">
                    <Button variant="outline" className="border-[#FFD700]/40 text-neutral-200 hover:bg-[#FFD700]/10 whitespace-nowrap">
                      View Executive Dashboard
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Tab Navigation with smooth transitions */}
        <section className="border-b border-[#FFD700]/20 bg-[#151B23]/80 backdrop-blur-md sticky top-16 z-20">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab("reports")}
                className={`px-6 py-3 text-sm font-semibold rounded-lg transition-all ${
                  activeTab === "reports" 
                    ? "bg-[#FFD700] text-black shadow-lg shadow-[#FFD700]/50" 
                    : "bg-[#1A1F2E] text-neutral-300 hover:bg-[#2A3F54] border border-[#2A3F54]"
                }`}
              >
                <ListCollapse className="w-4 h-4 inline-block mr-2" />
                Intelligence Reports
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab("live-stream")}
                className={`px-6 py-3 text-sm font-semibold rounded-lg transition-all ${
                  activeTab === "live-stream" 
                    ? "bg-[#FFD700] text-black shadow-lg shadow-[#FFD700]/50" 
                    : "bg-[#1A1F2E] text-neutral-300 hover:bg-[#2A3F54] border border-[#2A3F54]"
                }`}
              >
                <Activity className="w-4 h-4 inline-block mr-2 text-rose-500 animate-pulse" />
                Live Forensic Audit Stream
              </motion.button>
            </div>
          </div>
        </section>

        {/* Live Stream View */}
        <AnimatePresence mode="wait">
          {activeTab === "live-stream" && mounted && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="py-16 bg-[#11161C] border-b border-[#FFD700]/20 relative z-10"
            >
              <div className="max-w-7xl mx-auto px-6">
                <div className="max-w-3xl mb-10 flex justify-between items-end">
                  <div>
                    <Badge className="bg-rose-500/20 text-rose-300 border-2 border-rose-400/40 mb-4 animate-pulse">
                      LIVE FORENSIC RADAR
                    </Badge>
                    <h2 className="text-4xl font-serif font-bold text-white mb-3">Live Forensic Audit Stream</h2>
                    <p className="text-neutral-300">
                      Real-time transaction-level anomalies automatically flagged by Kincaid Health's analytical engine.
                    </p>
                  </div>
                  <div>
                    <Button 
                      onClick={triggerMockAlertRefresh}
                      disabled={isRefreshing}
                      className="bg-[#1A3A52] hover:bg-[#234766] border border-[#FFD700]/20 text-xs font-mono text-neutral-200"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
                      Refresh Radar Feed
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  {auditEvents.map((event, idx) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ x: 4, scale: 1.01 }}
                      className="bg-gradient-to-r from-[#1A1F2E] to-[#151B23] border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 backdrop-blur-sm"
                    >
                      <div className="flex items-start gap-5">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          event.severity === "critical" 
                            ? "bg-rose-500/20 border-2 border-rose-400/50 text-rose-400" 
                            : event.severity === "high" 
                              ? "bg-amber-500/20 border-2 border-amber-400/50 text-amber-400" 
                              : "bg-blue-500/20 border-2 border-blue-400/50 text-blue-400"
                        }`}>
                          <AlertTriangle className="w-6 h-6" />
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-xs font-mono text-neutral-400">{event.time}</span>
                            <span className="text-sm font-semibold text-white">{event.plan}</span>
                            <span className="px-3 py-1 text-[10px] font-mono rounded-full bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/30">
                              {event.type}
                            </span>
                          </div>
                          <p className="text-sm text-neutral-200 leading-relaxed">{event.desc}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 border-[#2A3F54] pt-4 md:pt-0">
                        <div className="text-right">
                          <div className="text-[10px] font-mono text-neutral-400 uppercase mb-1">Impact Variance</div>
                          <div className="text-2xl font-bold text-white">{event.loss}</div>
                        </div>
                        <Link href="/request-demo">
                          <Button variant="outline" className="border-[#FFD700]/40 hover:bg-[#FFD700]/10 text-xs h-10 px-4 text-[#FFD700]">
                            Verify Leakage
                          </Button>
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-[#1A3A52]/20 to-transparent border border-[#FFD700]/30 rounded-xl p-6 mt-8 flex flex-col md:flex-row justify-between items-center gap-6 backdrop-blur-sm"
                >
                  <div className="space-y-2">
                    <h4 className="text-base font-semibold text-white">Continuous Transaction Monitoring Integration</h4>
                    <p className="text-xs text-neutral-300 max-w-2xl leading-relaxed">
                      Kincaid Health links securely into Snowflake, Databricks, or standard claim formats via 1-click cloud sync to execute forensic pattern matching daily on active health plan bills.
                    </p>
                  </div>
                  <Link href="/contact">
                    <Button className="bg-gradient-to-r from-[#FFD700] to-[#D4AF37] hover:from-[#D4AF37] hover:to-[#FFD700] text-black font-bold text-sm whitespace-nowrap shadow-lg">
                      Deploy Live Monitor
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Reports Tab */}
        <AnimatePresence mode="wait">
          {activeTab === "reports" && (
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="py-8 bg-black relative z-10"
            >
              {/* Filters */}
              <section className="border-b border-[#FFD700]/20 bg-[#151B23]/80 backdrop-blur-md sticky top-32 z-10">
                <div className="max-w-7xl mx-auto px-6 py-4 space-y-4">
                  <div className="flex items-center gap-3 overflow-x-auto">
                    <span className="text-sm font-medium text-neutral-400 whitespace-nowrap flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      Tier:
                    </span>
                    {(["all", "individual", "enterprise"] as const).map((tier) => (
                      <motion.button
                        key={tier}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedTier(tier)}
                        className={`px-5 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                          selectedTier === tier
                            ? "bg-[#FFD700] text-black shadow-lg shadow-[#FFD700]/30"
                            : "bg-[#1A1F2E] text-neutral-300 border border-[#2A3F54] hover:border-[#FFD700]/40"
                        }`}
                      >
                        {tier === "all" ? "All Reports" : tier === "individual" ? "Individual ($2K-$3K)" : "Enterprise ($50K-$1.2M)"}
                      </motion.button>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-3 overflow-x-auto">
                    <span className="text-sm font-medium text-neutral-400 whitespace-nowrap flex items-center gap-2">
                      <Filter className="w-4 h-4" />
                      Category:
                    </span>
                    {categories.map((category) => (
                      <motion.button
                        key={category}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-5 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                          selectedCategory === category
                            ? "bg-[#FFD700] text-black shadow-lg shadow-[#FFD700]/30"
                            : "bg-[#1A1F2E] text-neutral-300 border border-[#2A3F54] hover:border-[#FFD700]/40"
                        }`}
                      >
                        {category === "all" ? "All Categories" : category}
                      </motion.button>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 overflow-x-auto">
                    <span className="text-sm font-medium text-neutral-400 whitespace-nowrap flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      Price:
                    </span>
                    {(["all", "0-5k", "5k-20k", "20k-50k", "50k+"] as const).map((range) => (
                      <motion.button
                        key={range}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedPriceRange(range)}
                        className={`px-5 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                          selectedPriceRange === range
                            ? "bg-[#FFD700] text-black shadow-lg shadow-[#FFD700]/30"
                            : "bg-[#1A1F2E] text-neutral-300 border border-[#2A3F54] hover:border-[#FFD700]/40"
                        }`}
                      >
                        {range === "all" ? "All Prices" : range === "0-5k" ? "$0 - $5K" : range === "5k-20k" ? "$5K - $20K" : range === "20k-50k" ? "$20K - $50K" : "$50K+"}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </section>

              {/* Reports Grid */}
              <section className="py-16">
                <div className="max-w-7xl mx-auto px-6">
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#FFD700]/20">
                    <div>
                      <h2 className="text-4xl font-serif font-bold bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
                        Intelligence Reports
                      </h2>
                      <p className="text-sm text-neutral-400 mt-2">
                        Comprehensive forensic audit frameworks and research publications.
                      </p>
                    </div>
                    <Badge variant="outline" className="border-[#FFD700]/40 bg-[#FFD700]/10 text-[#FFD700] font-mono text-sm px-4 py-2 uppercase tracking-wider">
                      {filteredReports.length} Reports
                    </Badge>
                  </div>
                  
                  <div className="grid gap-8">
                    {filteredReports.map((report, idx) => (
                      <motion.div
                        key={report.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ y: -4, scale: 1.01 }}
                        className="border-2 border-[#FFD700]/30 bg-gradient-to-br from-[#1A1F2E] to-[#151B23] hover:border-[#FFD700]/60 hover:shadow-2xl hover:shadow-[#FFD700]/20 rounded-2xl transition-all duration-500 overflow-hidden group"
                      >
                        <div className="p-8">
                          <div className="grid lg:grid-cols-12 gap-8 items-start">
                            
                            <div className="lg:col-span-8 space-y-4">
                              <div className="flex flex-wrap items-center gap-3">
                                <Badge className="bg-[#1A3A52] text-white border border-[#FFD700]/30 text-xs uppercase tracking-wider px-3 py-1.5">
                                  {report.category}
                                </Badge>
                                <Badge className={`text-xs uppercase tracking-wider px-3 py-1.5 ${
                                  report.tier === "individual" 
                                    ? "bg-blue-500/20 text-blue-300 border border-blue-400/40" 
                                    : "bg-amber-500/20 text-amber-300 border border-amber-400/40"
                                }`}>
                                  {report.tier === "individual" ? "Individual Report" : "Enterprise Engagement"}
                                </Badge>
                                {report.tier === "individual" && (
                                  <span className="flex items-center gap-2 text-xs text-neutral-400">
                                    <Clock className="w-4 h-4" />
                                    {report.turnaroundDays} days
                                  </span>
                                )}
                              </div>

                              <div>
                                <h3 className="text-3xl font-serif font-bold text-white leading-tight group-hover:text-[#FFD700] transition-colors">
                                  {report.name}
                                </h3>
                              </div>

                              <p className="text-neutral-300 leading-relaxed text-base">
                                {report.description}
                              </p>

                              {report.deliverables && (
                                <div className="bg-black/40 border border-[#FFD700]/20 rounded-xl p-5 backdrop-blur-sm">
                                  <h4 className="text-xs font-mono uppercase tracking-widest text-[#FFD700] mb-3">
                                    Scope of Deliverables
                                  </h4>
                                  <div className="grid md:grid-cols-2 gap-3">
                                    {report.deliverables.slice(0, 6).map((item, idx) => (
                                      <div key={idx} className="flex items-start gap-2 text-sm text-neutral-200">
                                        <ChevronRight className="w-4 h-4 mt-0.5 text-[#FFD700] flex-shrink-0" />
                                        <span>{item}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              <div className="bg-gradient-to-br from-[#1A3A52]/20 to-transparent border border-[#FFD700]/20 rounded-xl p-5 backdrop-blur-sm">
                                <div className="flex items-center justify-between mb-4">
                                  <h4 className="text-xs font-mono uppercase tracking-widest text-[#FFD700]">
                                    Labor Estimates
                                  </h4>
                                  <div className="flex items-center gap-6">
                                    <div className="text-right">
                                      <div className="text-[10px] text-neutral-400">Total Hours</div>
                                      <div className="text-xl font-bold text-white">{report.laborHours.total}</div>
                                    </div>
                                    <div className="text-right">
                                      <div className="text-[10px] text-neutral-400">Effective Rate</div>
                                      <div className="text-xl font-bold text-white">${report.laborHours.effectiveHourlyRate}/hr</div>
                                    </div>
                                    {"teamSize" in report.laborHours && (
                                      <>
                                        <div className="text-right">
                                          <div className="text-[10px] text-neutral-400">Team Size</div>
                                          <div className="text-xl font-bold text-white">{report.laborHours.teamSize}</div>
                                        </div>
                                        <div className="text-right">
                                          <div className="text-[10px] text-neutral-400">Duration</div>
                                          <div className="text-xl font-bold text-white">{report.laborHours.calendarWeeks}w</div>
                                        </div>
                                      </>
                                    )}
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  {report.laborHours.breakdown.map((role, idx) => (
                                    <div key={idx} className="flex items-center justify-between text-sm">
                                      <span className="text-neutral-200">{role.role}</span>
                                      <div className="flex items-center gap-4">
                                        <span className="text-neutral-400 text-xs">{role.hours}h</span>
                                        <span className="text-neutral-400 text-xs">@${role.rate}/hr</span>
                                        <span className="text-white font-semibold min-w-[100px] text-right">
                                          {formatCurrency(role.hours * role.rate)}
                                        </span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <div className="lg:col-span-4 flex flex-col justify-between h-full bg-gradient-to-br from-[#0F1419]/90 to-black/80 border border-[#FFD700]/30 rounded-xl p-6 space-y-6 backdrop-blur-sm">
                              <div className="space-y-2">
                                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
                                  {report.tier === "individual" ? "Report Price" : "Engagement Fee"}
                                </span>
                                <div className="text-5xl font-extrabold tracking-tight bg-gradient-to-br from-[#FFD700] to-[#D4AF37] bg-clip-text text-transparent flex items-baseline gap-1">
                                  {formatCurrency(report.price)}
                                </div>
                                <p className="text-[11px] text-neutral-400 leading-relaxed pt-2">
                                  {report.tier === "individual" 
                                    ? `${report.turnaroundDays}-day turnaround with complete methodology guide.` 
                                    : `${("engagementDuration" in report) ? report.engagementDuration : "Custom timeline"} with dedicated team.`
                                  }
                                </p>
                              </div>

                              <div className="space-y-3 pt-4 border-t border-[#FFD700]/20">
                                <Link href="/request-demo" className="w-full block">
                                  <Button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold uppercase tracking-wider text-sm py-4 shadow-lg shadow-amber-500/50 hover:shadow-xl hover:shadow-amber-500/70 transition-all">
                                    Request Report
                                    <ChevronRight className="w-4 h-4 ml-2" />
                                  </Button>
                                </Link>
                                
                                <Link href="/contact" className="w-full block">
                                  <Button variant="outline" className="w-full border-[#FFD700]/40 text-[#FFD700] text-sm uppercase tracking-wider hover:bg-[#FFD700]/10">
                                    Schedule Consultation
                                  </Button>
                                </Link>
                              </div>

                              <div className="pt-2 text-[10px] text-neutral-400 flex items-center gap-2 justify-center">
                                <Shield className="w-4 h-4 text-[#FFD700]" />
                                <span>ASOP Compliance Certified</span>
                              </div>
                            </div>
                            
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Methodology Section */}
        <section className="py-16 border-t border-[#FFD700]/20 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl font-serif font-bold bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent mb-6"
              >
                Research Methodology & Analytical Rigor
              </motion.h2>
              
              <div className="space-y-6">
                <p className="text-neutral-300 leading-relaxed text-lg">
                  Each intelligence report in the Kincaid Health series undergoes rigorous forensic analysis employing proprietary actuarial modeling frameworks, contract intelligence algorithms, and evidence-based validation protocols.
                </p>
                
                <h3 className="text-2xl font-serif font-semibold text-white pt-4">Core Analytical Frameworks</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      icon: Microscope,
                      title: "Actuarial Science",
                      items: [
                        "Monte Carlo simulation with 10,000+ scenario iterations",
                        "Credibility theory and Bayesian updating",
                        "Time-series decomposition (trend, seasonal, irregular)"
                      ]
                    },
                    {
                      icon: Shield,
                      title: "Contract Intelligence",
                      items: [
                        "Semantic NLP clause extraction and classification",
                        "Financial obligation mapping and quantification",
                        "Regulatory compliance validation (ERISA, HIPAA, ACA)"
                      ]
                    }
                  ].map((framework, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.2 }}
                      whileHover={{ y: -4 }}
                      className="bg-gradient-to-br from-[#1A1F2E] to-[#151B23] border border-[#FFD700]/30 hover:border-[#FFD700]/60 rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-[#FFD700]/10"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <framework.icon className="w-7 h-7 text-[#FFD700]" />
                        <h4 className="font-semibold text-white text-lg">{framework.title}</h4>
                      </div>
                      <ul className="space-y-2.5 text-sm text-neutral-300">
                        {framework.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 mt-0.5 text-[#FFD700] flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 border-t border-[#FFD700]/20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative z-10 max-w-6xl mx-auto px-6 text-center"
          >
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl font-serif font-bold bg-gradient-to-br from-white via-[#FFD700] to-[#D4AF37] bg-clip-text text-transparent mb-6 leading-tight">
                Request Custom Intelligence Brief
              </h2>
              
              <p className="text-lg text-neutral-300 mb-8 leading-relaxed">
                Our forensic analysis team produces customized intelligence reports tailored to your organization's PBM contracts, claims experience, and risk profile.
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/request-demo">
                  <Button className="bg-gradient-to-r from-[#FFD700] to-[#D4AF37] hover:from-[#D4AF37] hover:to-[#FFD700] text-black font-bold text-base px-8 py-6 shadow-xl shadow-[#FFD700]/30 hover:shadow-2xl hover:shadow-[#FFD700]/50 transition-all">
                    Schedule Consultation
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="border-[#FFD700]/40 bg-transparent text-neutral-200 hover:bg-[#FFD700]/10 hover:border-[#FFD700] text-base px-8 py-6">
                    Contact Intelligence Team
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Checkout Modal */}
        {selectedReport && (
          <IntelligenceCheckoutModal
            report={selectedReport}
            isOpen={checkoutModalOpen}
            onClose={() => {
              setCheckoutModalOpen(false);
              setSelectedReport(null);
            }}
          />
        )}
      </main>

      <Footer />
    </>
  );
}