import { useState, useEffect, useMemo } from "react";
import Head from "next/head";
import Link from "next/link";
import { 
  FileText, TrendingUp, Shield, ChevronRight, Download, ExternalLink, 
  BarChart3, AlertCircle, Users, Award, Clock, DollarSign, Activity, 
  Microscope, Target, Zap, Database, AlertTriangle, Check, Info, RefreshCw, Filter, ListCollapse, Briefcase
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

export default function KincaidIQIntelligenceSeries() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTier, setSelectedTier] = useState<"individual" | "enterprise" | "all">("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState<PriceRange>("all");
  const [activeTab, setActiveTab] = useState<"reports" | "live-stream">("reports");
  const [mounted, setMounted] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<IndividualReport | null>(null);

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
    
    // Filter by tier
    if (selectedTier !== "all") {
      reports = reports.filter(r => r.tier === selectedTier);
    }
    
    // Filter by category
    if (selectedCategory !== "all") {
      reports = reports.filter(r => r.category === selectedCategory);
    }

    // Filter by price range
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

      <main className="min-h-screen bg-[#0F1419]">
        {/* Hero Section */}
        <section className="relative py-12 flex items-center justify-center overflow-hidden bg-gradient-to-b from-black via-[#0A0E27] to-black z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-[#1A3A52]/20 border border-[#1A3A52] rounded px-4 py-2 text-xs font-mono text-[#B8860B] uppercase tracking-wider mb-4">
                <FileText className="w-4 h-4 text-[#B8860B]" />
                Forensic Intelligence Center
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-br from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
                Intelligence Products
              </h1>
              
              <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
                24 forensic reports from $2,000 to $1.2M — individual studies to Fortune 100 transformations.
              </p>
            </div>
          </div>
        </section>

        {/* Impact Metrics Panel */}
        <section className="py-8 border-b border-[#1F2937]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl font-serif font-bold text-white mb-1">24</div>
                <div className="text-sm text-neutral-400">Total Report Products</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-serif font-bold text-white mb-1">$2K-$1.2M</div>
                <div className="text-sm text-neutral-400">Price Range</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-serif font-bold text-white mb-1">16-8,500</div>
                <div className="text-sm text-neutral-400">Labor Hours Range</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-serif font-bold text-white mb-1">247</div>
                <div className="text-sm text-neutral-400">Organizations Served</div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured: Mark Cuban Cost Plus Drugs Intelligence */}
        <section className="py-16 bg-gradient-to-b from-[#0A0E27] to-black border-b border-[#1F2937]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-8">
              <Badge className="bg-amber-500/10 text-amber-400 border border-amber-500/30 mb-3 uppercase tracking-wider text-xs">
                Featured Intelligence Series
              </Badge>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-3">
                Mark Cuban Cost Plus Drugs Intelligence
              </h2>
              <p className="text-lg text-neutral-400 max-w-3xl mx-auto">
                Transparent pricing analysis and strategic integration reports for Cost Plus Drugs — quantify savings, optimize formularies, and maximize member value.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {INDIVIDUAL_REPORTS.filter(r => r.id.startsWith("cost-plus")).map((report) => (
                <div 
                  key={report.id}
                  className="bg-gradient-to-br from-[#151B23] to-[#0F1419] border-2 border-amber-500/30 hover:border-amber-500/60 rounded-xl overflow-hidden transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-amber-500/10"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <Badge className="bg-amber-500/20 text-amber-400 border border-amber-500/40 text-xs uppercase tracking-wider">
                        Cost Plus Intelligence
                      </Badge>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-white">{formatCurrency(report.price)}</div>
                        <div className="text-xs text-neutral-500">{report.turnaroundDays} days</div>
                      </div>
                    </div>

                    <h3 className="text-xl font-serif font-bold text-white mb-3 leading-tight">
                      {report.name}
                    </h3>

                    <p className="text-sm text-neutral-300 mb-4 leading-relaxed">
                      {report.description}
                    </p>

                    <div className="bg-[#0F1419]/60 border border-[#2A3F54]/60 rounded-lg p-3 mb-4">
                      <div className="text-[10px] font-mono uppercase tracking-widest text-amber-400 mb-2">
                        Key Deliverables
                      </div>
                      <div className="space-y-1.5">
                        {report.deliverables.slice(0, 4).map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                            <Check className="w-3.5 h-3.5 mt-0.5 text-amber-400 flex-shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        onClick={() => handleOrderClick(report)}
                        className="flex-1 bg-amber-500 hover:bg-amber-600 text-black font-bold text-xs py-2"
                      >
                        Order Report
                      </Button>
                      <Link href="/contact">
                        <Button variant="outline" className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10 text-xs px-4">
                          <Info className="w-3.5 h-3.5" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link href="/solutions/mark-cuban-cost-drugs">
                <Button variant="outline" className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10">
                  View Cost Plus Drugs Solution Page
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* 8 Pillars of Fiduciary Responsibility - Board Member Focus */}
        <section className="py-16 bg-gradient-to-b from-black via-[#0A0E27] to-black border-b border-[#1F2937]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <Badge className="bg-[#B8860B]/10 text-[#B8860B] border border-[#B8860B]/30 mb-3 uppercase tracking-wider text-xs">
                Fiduciary Framework
              </Badge>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-3">
                8 Pillars of Fiduciary Responsibility
              </h2>
              <p className="text-lg text-neutral-400 max-w-3xl mx-auto">
                Comprehensive governance framework for board members and plan fiduciaries — defense-ready documentation and continuous oversight infrastructure.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-4 mb-8">
              {[
                { 
                  num: "1", 
                  title: "Verified Savings Documentation", 
                  desc: "Timestamped audit trail with complete chain of custody",
                  href: "/pillars/verified-savings-documentation",
                  color: "emerald"
                },
                { 
                  num: "2", 
                  title: "Financial Impact Analysis", 
                  desc: "EBITDA quantification and board-ready financial models",
                  href: "/pillars/financial-impact-analysis",
                  color: "blue"
                },
                { 
                  num: "3", 
                  title: "Multi-Source Data Reconciliation", 
                  desc: "Cross-system verification and data integrity validation",
                  href: "/pillars/multi-source-data-reconciliation",
                  color: "amber"
                },
                { 
                  num: "4", 
                  title: "Contract Intelligence & Compliance", 
                  desc: "Automated clause extraction and guarantee enforcement",
                  href: "/pillars/contract-intelligence-compliance",
                  color: "purple"
                },
                { 
                  num: "5", 
                  title: "Actuarial Risk Modeling", 
                  desc: "Monte Carlo simulations and credibility-weighted forecasts",
                  href: "/pillars/actuarial-risk-modeling",
                  color: "rose"
                },
                { 
                  num: "6", 
                  title: "Real-Time Claims Surveillance", 
                  desc: "Transaction-level anomaly detection and forensic alerts",
                  href: "/pillars/realtime-claims-surveillance",
                  color: "orange"
                },
                { 
                  num: "7", 
                  title: "Regulatory & Legal Framework", 
                  desc: "ERISA compliance monitoring and DOL audit readiness",
                  href: "/pillars/regulatory-legal-framework",
                  color: "indigo"
                },
                { 
                  num: "8", 
                  title: "Predictive Cost Analytics", 
                  desc: "AI-powered trend forecasting and intervention modeling",
                  href: "/pillars/predictive-cost-analytics",
                  color: "cyan"
                }
              ].map((pillar) => (
                <Link key={pillar.num} href={pillar.href}>
                  <div className={`group bg-[#151B23] border-2 border-[#2A3F54] hover:border-${pillar.color}-500/60 rounded-xl p-5 transition-all duration-300 hover:shadow-xl hover:shadow-${pillar.color}-500/10 cursor-pointer h-full`}>
                    <div className={`w-10 h-10 rounded-full bg-${pillar.color}-500/10 flex items-center justify-center mb-3 border border-${pillar.color}-500/30`}>
                      <span className={`text-lg font-bold text-${pillar.color}-400`}>{pillar.num}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-white mb-2 group-hover:text-[#B8860B] transition-colors leading-tight">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="bg-gradient-to-br from-[#151B23] to-[#0F1419] border-2 border-[#1A3A52] rounded-xl p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="w-5 h-5 text-[#B8860B]" />
                    <h3 className="text-xl font-serif font-bold text-white">Board Fiduciary Defense Package</h3>
                  </div>
                  <p className="text-neutral-300 leading-relaxed">
                    Complete documentation framework demonstrating compliance with ERISA duty of prudence. Defense-ready audit trail for DOL inquiries, litigation response, and board reporting.
                  </p>
                  <div className="flex flex-wrap gap-3 mt-4">
                    <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs">
                      DOL Audit Ready
                    </Badge>
                    <Badge className="bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs">
                      Litigation Defense
                    </Badge>
                    <Badge className="bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs">
                      404(c) Compliance
                    </Badge>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <Link href="/personas/board-members">
                    <Button className="bg-[#B8860B] hover:bg-[#D4AF37] text-black font-bold whitespace-nowrap">
                      Board Member Portal
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/board-of-directors">
                    <Button variant="outline" className="border-[#2A3F54] text-neutral-300 hover:bg-[#0C1117] whitespace-nowrap">
                      View Executive Dashboard
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Secondary Navigation: Reports & Live Stream Tabs */}
        <section className="border-b border-[#1F2937] bg-[#151B23] sticky top-16 z-10">
          <div className="max-w-7xl mx-auto px-6 py-3">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveTab("reports")}
                className={`px-5 py-2.5 text-sm font-semibold border-b-2 transition-all ${
                  activeTab === "reports" 
                    ? "border-[#B8860B] text-[#B8860B] bg-[#151B23]/40" 
                    : "border-transparent text-neutral-400 hover:text-white"
                }`}
              >
                <ListCollapse className="w-4 h-4 inline-block mr-2" />
                Intelligence Reports
              </button>
              <button
                onClick={() => setActiveTab("live-stream")}
                className={`px-5 py-2.5 text-sm font-semibold border-b-2 transition-all ${
                  activeTab === "live-stream" 
                    ? "border-[#B8860B] text-[#B8860B] bg-[#151B23]/40" 
                    : "border-transparent text-neutral-400 hover:text-white"
                }`}
              >
                <Activity className="w-4 h-4 inline-block mr-2 text-rose-500 animate-pulse" />
                Live Forensic Audit Stream
              </button>
            </div>
          </div>
        </section>

        {/* Live Forensic Audit Stream View */}
        {activeTab === "live-stream" && mounted && (
          <section className="py-12 bg-[#11161C] border-b border-[#1F2937]">
            <div className="max-w-7xl mx-auto px-6">
              <div className="max-w-3xl mb-8 flex justify-between items-end">
                <div>
                  <Badge className="bg-rose-500/10 text-rose-400 border border-rose-500/30 mb-3 animate-pulse">LIVE FORENSIC RADAR</Badge>
                  <h2 className="text-3xl font-serif font-bold text-white mb-3">Live Forensic Audit Stream</h2>
                  <p className="text-neutral-400">
                    Real-time transaction-level anomalies automatically flagged by Kincaid Health's analytical engine.
                  </p>
                </div>
                <div>
                  <Button 
                    onClick={triggerMockAlertRefresh}
                    disabled={isRefreshing}
                    className="bg-[#1A3A52] hover:bg-[#234766] border border-[#2A3F54] text-xs font-mono text-neutral-200"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
                    Refresh Radar Feed
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                {auditEvents.map((event) => (
                  <div 
                    key={event.id}
                    className="bg-[#151B23] border border-[#2A3F54]/80 hover:border-[#B8860B]/50 transition-all rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        event.severity === "critical" 
                          ? "bg-rose-500/10 border border-rose-500/30 text-rose-500" 
                          : event.severity === "high" 
                            ? "bg-amber-500/10 border border-amber-500/30 text-amber-500" 
                            : "bg-blue-500/10 border border-blue-500/30 text-blue-500"
                      }`}>
                        <AlertTriangle className="w-5 h-5" />
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-xs font-mono text-neutral-400">{event.time}</span>
                          <span className="text-xs font-semibold text-white">{event.plan}</span>
                          <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-[#0F1419] text-neutral-400 border border-[#2A3F54]/60">
                            {event.type}
                          </span>
                        </div>
                        <p className="text-sm text-neutral-300">{event.desc}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 border-[#2A3F54]/60 pt-3 md:pt-0">
                      <div className="text-right">
                        <div className="text-[10px] font-mono text-neutral-500 uppercase">Impact Variance</div>
                        <div className="text-lg font-bold text-white">{event.loss}</div>
                      </div>
                      <Link href="/request-demo">
                        <Button variant="outline" className="border-[#2A3F54] hover:bg-[#0F1419] text-xs h-8 px-3">
                          Verify Leakage
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-[#1A3A52]/10 border border-[#1A3A52] rounded-lg p-5 mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-white">Continuous Transaction Monitoring Integration</h4>
                  <p className="text-xs text-neutral-400 max-w-2xl">
                    Kincaid Health links securely into Snowflake, Databricks, or standard claim formats via 1-click cloud sync to execute forensic pattern matching daily on active health plan bills.
                  </p>
                </div>
                <Link href="/contact">
                  <Button className="bg-[#B8860B] hover:bg-[#9A7209] text-[#0F1419] font-bold text-xs">
                    Deploy Live Monitor
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Reports Tab and Filter System */}
        {activeTab === "reports" && (
          <section className="py-6 bg-black">
            {/* Tier and Category Filters */}
            <section className="border-b border-[#1F2937] bg-[#151B23] sticky top-16 z-10">
              <div className="max-w-7xl mx-auto px-6 py-3 space-y-3">
                {/* Tier Filter */}
                <div className="flex items-center gap-3 overflow-x-auto">
                  <span className="text-sm font-medium text-neutral-400 whitespace-nowrap flex items-center gap-1">
                    <Briefcase className="w-4 h-4" />
                    Tier:
                  </span>
                  {(["all", "individual", "enterprise"] as const).map((tier) => (
                    <button
                      key={tier}
                      onClick={() => setSelectedTier(tier)}
                      className={`px-4 py-2 rounded border text-sm font-medium whitespace-nowrap transition-colors ${
                        selectedTier === tier
                          ? "bg-[#1A3A52] text-white border-[#1A3A52]"
                          : "bg-[#0F1419] text-neutral-300 border-[#2A3F54] hover:border-[#3A4F64] hover:bg-[#151B23]"
                      }`}
                    >
                      {tier === "all" ? "All Reports" : tier === "individual" ? "Individual ($2K-$3K)" : "Enterprise ($50K-$1.2M)"}
                    </button>
                  ))}
                </div>
                
                {/* Category Filter */}
                <div className="flex items-center gap-3 overflow-x-auto">
                  <span className="text-sm font-medium text-neutral-400 whitespace-nowrap flex items-center gap-1">
                    <Filter className="w-4 h-4" />
                    Category:
                  </span>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded border text-sm font-medium whitespace-nowrap transition-colors ${
                        selectedCategory === category
                          ? "bg-[#1A3A52] text-white border-[#1A3A52]"
                          : "bg-[#0F1419] text-neutral-300 border-[#2A3F54] hover:border-[#3A4F64] hover:bg-[#151B23]"
                      }`}
                    >
                      {category === "all" ? "All Categories" : category}
                    </button>
                  ))}
                </div>

                {/* Price Range Filter */}
                <div className="flex items-center gap-3 overflow-x-auto">
                  <span className="text-sm font-medium text-neutral-400 whitespace-nowrap flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    Price:
                  </span>
                  {(["all", "0-5k", "5k-20k", "20k-50k", "50k+"] as const).map((range) => (
                    <button
                      key={range}
                      onClick={() => setSelectedPriceRange(range)}
                      className={`px-4 py-2 rounded border text-sm font-medium whitespace-nowrap transition-colors ${
                        selectedPriceRange === range
                          ? "bg-[#1A3A52] text-white border-[#1A3A52]"
                          : "bg-[#0F1419] text-neutral-300 border-[#2A3F54] hover:border-[#3A4F64] hover:bg-[#151B23]"
                      }`}
                    >
                      {range === "all" ? "All Prices" : range === "0-5k" ? "$0 - $5K" : range === "5k-20k" ? "$5K - $20K" : range === "20k-50k" ? "$20K - $50K" : "$50K+"}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* Reports Grid */}
            <section className="py-12">
              <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#2A3F54]/40">
                  <div>
                    <h2 className="text-3xl font-serif font-bold text-white">
                      Intelligence Reports
                    </h2>
                    <p className="text-sm text-neutral-400 mt-1">
                      Comprehensive forensic audit frameworks and research publications.
                    </p>
                  </div>
                  <Badge variant="outline" className="border-[#B8860B]/30 bg-[#B8860B]/10 text-[#B8860B] font-mono text-xs px-3 py-1 uppercase tracking-wider">
                    {filteredReports.length} Reports
                  </Badge>
                </div>
                
                <div className="grid gap-6">
                  {filteredReports.map((report) => (
                    <div 
                      key={report.id} 
                      className="border border-[#2A3F54] bg-[#151B23] hover:border-[#B8860B]/50 hover:bg-[#1C232B] rounded-xl transition-all duration-300 overflow-hidden"
                    >
                      <div className="p-6">
                        <div className="grid lg:grid-cols-12 gap-6 items-start">
                          
                          {/* Left Column: Metadata and Content */}
                          <div className="lg:col-span-8 space-y-3">
                            <div className="flex flex-wrap items-center gap-3">
                              <Badge className="bg-[#1A3A52] text-white border border-[#2A3F54] text-xs uppercase tracking-wider px-2.5 py-1">
                                {report.category}
                              </Badge>
                              <Badge className={`text-xs uppercase tracking-wider px-2.5 py-1 ${
                                report.tier === "individual" 
                                  ? "bg-blue-500/10 text-blue-400 border border-blue-500/30" 
                                  : "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                              }`}>
                                {report.tier === "individual" ? "Individual Report" : "Enterprise Engagement"}
                              </Badge>
                              {report.tier === "individual" && (
                                <span className="flex items-center gap-1.5 text-xs text-neutral-400">
                                  <Clock className="w-3.5 h-3.5" />
                                  {report.turnaroundDays} days
                                </span>
                              )}
                            </div>

                            <div>
                              <h3 className="text-3xl font-serif font-bold text-white leading-tight">
                                {report.name}
                              </h3>
                            </div>

                            <p className="text-neutral-300 leading-relaxed text-base">
                              {report.description}
                            </p>

                            {/* Deliverables */}
                            {report.deliverables && (
                              <div className="bg-[#0F1419]/60 border border-[#2A3F54]/60 rounded-xl p-4">
                                <h4 className="text-xs font-mono uppercase tracking-widest text-[#B8860B] mb-2">
                                  Scope of Deliverables
                                </h4>
                                <div className="grid md:grid-cols-2 gap-2">
                                  {report.deliverables.slice(0, 6).map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-2 text-sm text-neutral-300">
                                      <ChevronRight className="w-4 h-4 mt-0.5 text-[#B8860B] flex-shrink-0" />
                                      <span>{item}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Labor Hours Breakdown */}
                            <div className="bg-[#1A3A52]/10 border border-[#1A3A52]/40 rounded-xl p-4">
                              <div className="flex items-center justify-between mb-3">
                                <h4 className="text-xs font-mono uppercase tracking-widest text-[#B8860B]">
                                  Labor Estimates
                                </h4>
                                <div className="flex items-center gap-4">
                                  <div className="text-right">
                                    <div className="text-[10px] text-neutral-500">Total Hours</div>
                                    <div className="text-lg font-bold text-white">{report.laborHours.total}</div>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-[10px] text-neutral-500">Effective Rate</div>
                                    <div className="text-lg font-bold text-white">${report.laborHours.effectiveHourlyRate}/hr</div>
                                  </div>
                                  {"teamSize" in report.laborHours && (
                                    <>
                                      <div className="text-right">
                                        <div className="text-[10px] text-neutral-500">Team Size</div>
                                        <div className="text-lg font-bold text-white">{report.laborHours.teamSize}</div>
                                      </div>
                                      <div className="text-right">
                                        <div className="text-[10px] text-neutral-500">Duration</div>
                                        <div className="text-lg font-bold text-white">{report.laborHours.calendarWeeks}w</div>
                                      </div>
                                    </>
                                  )}
                                </div>
                              </div>
                              <div className="space-y-1.5">
                                {report.laborHours.breakdown.map((role, idx) => (
                                  <div key={idx} className="flex items-center justify-between text-sm">
                                    <span className="text-neutral-300">{role.role}</span>
                                    <div className="flex items-center gap-4">
                                      <span className="text-neutral-400 text-xs">{role.hours}h</span>
                                      <span className="text-neutral-400 text-xs">@${role.rate}/hr</span>
                                      <span className="text-white font-semibold min-w-[80px] text-right">
                                        {formatCurrency(role.hours * role.rate)}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Right Column: Pricing & CTA */}
                          <div className="lg:col-span-4 flex flex-col justify-between h-full bg-[#0F1419]/80 border border-[#2A3F54]/40 rounded-xl p-5 space-y-5">
                            <div className="space-y-1">
                              <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
                                {report.tier === "individual" ? "Report Price" : "Engagement Fee"}
                              </span>
                              <div className="text-4xl font-extrabold tracking-tight text-white flex items-baseline gap-1">
                                {formatCurrency(report.price)}
                              </div>
                              <p className="text-[11px] text-neutral-500 leading-relaxed pt-1">
                                {report.tier === "individual" 
                                  ? `${report.turnaroundDays}-day turnaround with complete methodology guide.` 
                                  : `${("engagementDuration" in report) ? report.engagementDuration : "Custom timeline"} with dedicated team.`
                                }
                              </p>
                            </div>

                            <div className="space-y-2.5 pt-3 border-t border-[#2A3F54]/40">
                              <Link href="/request-demo" className="w-full block">
                                <Button className="w-full bg-amber-500/10 hover:bg-amber-500 border border-amber-500/20 hover:text-black text-amber-400 font-bold uppercase tracking-wider text-xs py-4">
                                  Request Report
                                  <ChevronRight className="w-4 h-4 ml-1.5" />
                                </Button>
                              </Link>
                              
                              <Link href="/contact" className="w-full block">
                                <Button variant="outline" className="w-full border-[#2A3F54] text-neutral-300 text-xs uppercase tracking-wider hover:bg-[#0C1117]">
                                  Schedule Consultation
                                </Button>
                              </Link>
                            </div>

                            <div className="pt-1 text-[10px] text-neutral-500 flex items-center gap-1.5 justify-center">
                              <Shield className="w-3.5 h-3.5 text-[#B8860B]/70" />
                              <span>ASOP Compliance Certified</span>
                            </div>
                          </div>
                          
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </section>
        )}

        {/* Methodology Section */}
        <section className="py-12 border-t border-[#1F2937]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-serif font-bold text-white mb-4">
                Research Methodology & Analytical Rigor
              </h2>
              
              <div className="space-y-5">
                <p className="text-neutral-300 leading-relaxed text-lg">
                  Each intelligence report in the Kincaid Health series undergoes rigorous forensic analysis employing proprietary actuarial modeling frameworks, contract intelligence algorithms, and evidence-based validation protocols.
                </p>
                
                <h3 className="text-xl font-serif font-semibold text-white pt-3">Core Analytical Frameworks</h3>
                
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="bg-[#151B23] border border-[#2A3F54] rounded-lg p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <Microscope className="w-6 h-6 text-[#B8860B]" />
                      <h4 className="font-semibold text-white">Actuarial Science</h4>
                    </div>
                    <ul className="space-y-1.5 text-sm text-neutral-300">
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-0.5 text-[#B8860B] flex-shrink-0" />
                        <span>Monte Carlo simulation with 10,000+ scenario iterations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-0.5 text-[#B8860B] flex-shrink-0" />
                        <span>Credibility theory and Bayesian updating</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-0.5 text-[#B8860B] flex-shrink-0" />
                        <span>Time-series decomposition (trend, seasonal, irregular)</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-[#151B23] border border-[#2A3F54] rounded-lg p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <Shield className="w-6 h-6 text-[#B8860B]" />
                      <h4 className="font-semibold text-white">Contract Intelligence</h4>
                    </div>
                    <ul className="space-y-1.5 text-sm text-neutral-300">
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-0.5 text-[#B8860B] flex-shrink-0" />
                        <span>Semantic NLP clause extraction and classification</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-0.5 text-[#B8860B] flex-shrink-0" />
                        <span>Financial obligation mapping and quantification</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-0.5 text-[#B8860B] flex-shrink-0" />
                        <span>Regulatory compliance validation (ERISA, HIPAA, ACA)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 border-t border-[#1F2937]">
          <div className="relative z-10 max-w-6xl mx-auto px-6 py-6 text-center">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-serif font-bold text-white mb-5">
                Request Custom Intelligence Brief
              </h2>
              
              <p className="text-lg text-neutral-300 mb-6 leading-relaxed">
                Our forensic analysis team produces customized intelligence reports tailored to your organization's PBM contracts, claims experience, and risk profile.
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/request-demo">
                  <Button className="bg-[#1A3A52] hover:bg-[#234766] text-white font-semibold">
                    Schedule Consultation
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="border-[#2A3F54] bg-transparent text-neutral-200 hover:bg-[#151B23] hover:text-white">
                    Contact Intelligence Team
                  </Button>
                </Link>
              </div>
            </div>
          </div>
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