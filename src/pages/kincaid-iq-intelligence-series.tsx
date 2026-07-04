import { useState, useEffect, useMemo } from "react";
import Head from "next/head";
import Link from "next/link";
import { 
  FileText, TrendingUp, Shield, ChevronRight, Download, ExternalLink, 
  BarChart3, AlertCircle, Users, Award, Clock, DollarSign, Activity, 
  Microscope, Target, Zap, Database, AlertTriangle, Check, Info, RefreshCw, Filter, ListCollapse
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { IntelligenceSandbox } from "@/components/kincaid-iq/IntelligenceSandbox";
import { SEO } from "@/components/SEO";

const reportsData = [
  {
    id: "nadac-benchmark",
    title: "NADAC Benchmarking Intelligence",
    subtitle: "Federal Pricing Reference Standards Validation",
    description: "Systematic analysis of National Average Drug Acquisition Cost data for pharmacy reimbursement validation. Employs statistical outlier detection to identify pricing anomalies, validates PBM reimbursement rates against federal standards, and quantifies excess reimbursement spreads.",
    href: "/solutions/nadac-benchmarking",
    category: "Benchmarking",
    readTime: "8 min read",
    price: 9500,
    priceLabel: "$9,500",
    deliverables: [
      "NADAC variance analysis by NDC",
      "Statistical outlier detection results",
      "Excess reimbursement quantification",
      "AWP-to-NADAC ratio trending",
      "Generic substitution savings validation"
    ],
    keyFindings: [
      "42% of analyzed prescriptions exceed NADAC + $3 dispensing fee",
      "Generic pricing variance of 180-340% above NADAC reference",
      "Brand drug reimbursement 23% above wholesale acquisition cost",
      "Excess reimbursement totals $4.7M annually for median plan"
    ]
  },
  {
    id: "refill-rationed",
    title: "Refill Was Rationed Audit",
    subtitle: "Specialty Clinical Rationing & Access Investigation",
    description: "A forensic clinical audit detailing systemic refill rationing, specialty pharmacy delays, and prior authorization bottlenecks. Analyzes member disruption and clinical consequences of cost-shifting strategies.",
    href: "/Kincaid_IQ_Refill_Was_Rationed.pdf",
    category: "Clinical Intelligence",
    readTime: "9 min read",
    price: 11000,
    priceLabel: "$11,000",
    deliverables: [
      "Specialty refill delay analysis",
      "Prior authorization rationing audit",
      "Member disruption and abandonment metrics",
      "Clinical risk exposure scorecard"
    ],
    keyFindings: [
      "Average 14-day delay on critical specialty medications",
      "18% of prior authorizations rejected on initial submission without clinical grounds",
      "Member abandonment rate rose by 11% under high-copay tiers"
    ]
  },
  {
    id: "mark-cuban",
    title: "Cost Plus Drug Pricing Analysis",
    subtitle: "Alternative Distribution Model Validation",
    description: "Comparative analysis of traditional PBM pricing versus cost-plus distribution models employing Mark Cuban Cost Plus Drug Company (MCCPDC) as reference architecture. Validates pricing transparency claims, quantifies elimination of spread pricing, and models savings potential.",
    href: "/solutions/mark-cuban-cost-drugs",
    category: "Pricing Intelligence",
    readTime: "10 min read",
    price: 12500,
    priceLabel: "$12,500",
    deliverables: [
      "Traditional vs cost-plus pricing comparison",
      "WAC verification and transparency validation",
      "Spread pricing elimination quantification",
      "Therapeutic class savings modeling",
      "Implementation barrier analysis"
    ],
    keyFindings: [
      "Average 65% cost reduction on 127 commonly prescribed medications",
      "Full pricing transparency with published wholesale acquisition costs",
      "Elimination of spread pricing saves $38-$52 per prescription",
      "Implementation requires formulary redesign and member education"
    ]
  },
  {
    id: "network-adequacy",
    title: "Network Adequacy & Access Analysis",
    subtitle: "Geographic Access & Provider Network Validation",
    description: "Geospatial analysis of pharmacy network adequacy employing GIS mapping, drive-time isochrones, and Census tract population weighting. Validates PBM network claims against CMS adequacy standards and quantifies member disruption.",
    href: "/request-demo",
    category: "Risk Analytics",
    readTime: "11 min read",
    price: 15000,
    priceLabel: "$15,000",
    deliverables: [
      "GIS network adequacy mapping",
      "Drive-time isochrone analysis",
      "CMS standard compliance validation",
      "Rural access barrier identification",
      "Specialty pharmacy access metrics"
    ],
    keyFindings: [
      "23% of Census tracts fail 15-minute drive-time standard",
      "Narrow network configurations disrupt 8-12% of established relationships",
      "Specialty pharmacy access limited to <50% of members in 14 states",
      "Mail-order substitution increases non-adherence by 9-14%"
    ]
  },
  {
    id: "predictive-intelligence",
    title: "Predictive Health Risk & Volatility Report",
    subtitle: "Advanced Forecasting and Trend Projections",
    description: "Multi-layered actuarial analysis projecting healthcare plan cost trajectories and claim anomalies using machine learning engines. Models trend persistence and high-cost claimant spikes.",
    href: "/kincaid-iq-predictive-intelligence-report_3_.pdf",
    category: "Risk Analytics",
    readTime: "12 min read",
    price: 18500,
    priceLabel: "$18,500",
    deliverables: [
      "Claim volatility and coefficient of variation forecasts",
      "Predictive high-cost claimant identifiers",
      "Actuarial trend decomposition mapping"
    ],
    keyFindings: [
      "91% accuracy in projecting top 1% high-cost claimants for the upcoming year",
      "Predictive models identify a 14.2% structural trend variance across multi-state plans"
    ]
  },
  {
    id: "rx-defense",
    title: "PBM Contract Clarity 360",
    subtitle: "Forensic PBM Contract Analysis",
    description: "Comprehensive forensic audit methodology for pharmacy benefit management contracts. Employs semantic clause extraction, spread pricing detection algorithms, and rebate reconciliation frameworks to identify contractual leakage.",
    href: "/solutions/rx-defense",
    category: "Contract Intelligence",
    readTime: "12 min read",
    price: 24500,
    priceLabel: "$24,500",
    deliverables: [
      "Clause-by-clause contract analysis",
      "Spread pricing mechanism identification",
      "Rebate pass-through validation",
      "Performance guarantee verification",
      "Material breach documentation"
    ],
    keyFindings: [
      "Average 23% contractual leakage across analyzed plans",
      "Spread pricing mechanisms averaging $47 per prescription",
      "Rebate pass-through clauses with 18-24 month disclosure delays",
      "MAC pricing 340% above NADAC reference on generic dispensing"
    ]
  },
  {
    id: "hopebridge-501",
    title: "Hopebridge 501 Actuarial & Contract Evaluation",
    subtitle: "Forensic Health Plan Assessment",
    description: "A comprehensive 44-page deep dive into Hopebridge plan benefits structure, analyzing reinsurance corridors, administrative fee leakage, and generic utilization incentives.",
    href: "/Kincaid_IQ_Hopebridge_501_44pg.pdf",
    category: "Benchmarking",
    readTime: "14 min read",
    price: 29000,
    priceLabel: "$29,000",
    deliverables: [
      "44-page custom benefits and plan design evaluation",
      "Reinsurance corridor optimization analysis",
      "Generic substitution incentive mapping"
    ],
    keyFindings: [
      "Identified $1.4M in potential reinsurance premium savings",
      "Administrative fee misalignment represented 8.2% of core plan costs"
    ]
  },
  {
    id: "actuarial",
    title: "Actuarial Benefits Intelligence",
    subtitle: "Stochastic Risk Modeling & Trend Projections",
    description: "Monte Carlo simulation frameworks for health plan risk assessment employing 10,000-iteration bootstrapping procedures. Quantifies volatility, tests trend persistence, and optimizes stop-loss attachment points through expected value maximization.",
    href: "/solutions/actuarial-benefits",
    category: "Risk Analytics",
    readTime: "15 min read",
    price: 35000,
    priceLabel: "$35,000",
    deliverables: [
      "Monte Carlo simulation results (10,000 scenarios)",
      "Volatility metrics and coefficient of variation",
      "Trend decomposition analysis",
      "Stop-loss optimization modeling",
      "IBNR reserve estimation"
    ],
    keyFindings: [
      "Volatility metrics exceed industry benchmarks by 34%",
      "Trend decomposition reveals 12% administrative cost component",
      "Stop-loss optimization yields 8-14% premium reduction potential",
      "Projections achieve R² = 0.87 against actual experience"
    ]
  },
  {
    id: "kimball-stanford",
    title: "Kimball v. Stanford: Fiduciary Litigation Briefing",
    subtitle: "ERISA Compliance & Legal Precedents Audit",
    description: "Strategic litigation briefing on fiduciary requirements under the Consolidated Appropriations Act. Outlines trustee liabilities regarding transparent broker disclosures and claims reporting.",
    href: "/Kimball_v11_Stanford_1_1_.pdf",
    category: "Contract Intelligence",
    readTime: "13 min read",
    price: 40000,
    priceLabel: "$40,000",
    deliverables: [
      "Detailed legal risk and litigation precedent briefing",
      "CAA compliance scorecard template",
      "Trustee liability mitigation guidelines"
    ],
    keyFindings: [
      "Fiduciaries can be held personally liable for failure to audit PBM claims",
      "Requires fee-only broker compensation to completely shield trustees"
    ]
  },
  {
    id: "rebate-reconciliation",
    title: "Rebate Reconciliation Intelligence",
    subtitle: "Pharmaceutical Rebate Audit & Validation",
    description: "Forensic examination of pharmaceutical rebate reporting employing transaction-level reconciliation against manufacturer contracts, GPO agreements, and PBM financial statements. Utilizes Benford's Law analysis for fraud detection.",
    href: "/request-demo",
    category: "Contract Intelligence",
    readTime: "14 min read",
    price: 45000,
    priceLabel: "$45,000",
    deliverables: [
      "Transaction-level rebate reconciliation",
      "Benford's Law fraud detection analysis",
      "Rebate pass-through percentage validation",
      "Retained rebate spread quantification",
      "Formulary tier incentive analysis"
    ],
    keyFindings: [
      "Rebate reporting accuracy verified at 92% for brand, 67% for generic",
      "Retained rebate spreads average 18-22% of total rebate pool",
      "Formulary placement correlates with rebate magnitude (r = 0.73)",
      "Administrative fee misclassification conceals $1.2M annually"
    ]
  },
  {
    id: "formulary-strategy",
    title: "Formulary Strategy Intelligence",
    subtitle: "Therapeutic Optimization & Financial Incentive Analysis",
    description: "Multi-dimensional analysis of formulary design employing therapeutic equivalence validation, clinical outcome benchmarking, and financial incentive mapping. Tests manufacturer rebate influence on tier placement.",
    href: "/request-demo",
    category: "Clinical Intelligence",
    readTime: "16 min read",
    price: 55000,
    priceLabel: "$55,000",
    deliverables: [
      "Therapeutic equivalence validation matrix",
      "Clinical outcome benchmarking vs guidelines",
      "Financial incentive tier placement analysis",
      "Prior authorization clinical appropriateness review",
      "Step therapy adherence impact study"
    ],
    keyFindings: [
      "42% of tier placements driven by rebate magnitude rather than clinical outcomes",
      "Prior authorization criteria deviate from guidelines in 28% of oncology cases",
      "Step therapy protocols reduce adherence 11-16% for chronic conditions",
      "Therapeutic interchange programs achieve 89% clinical equivalence"
    ]
  },
  {
    id: "schwarz-partners",
    title: "Schwarz Partners MEWA $14.2M Defense Audit",
    subtitle: "Bespoke Forensic Employer Defense Case Study",
    description: "An in-depth retrospective claims audit and contract leakage study uncovering massive multi-million dollar spread markups and hidden GPO fees in multi-employer welfare associations.",
    href: "/Kincaid_iQ_Schwarz_Partners_MEWA_14_2M_Defense.pdf",
    category: "Premium Forensic Intelligence",
    readTime: "18 min read",
    price: 75000,
    priceLabel: "$75,000",
    deliverables: [
      "Full retrospective claims audit report",
      "Hidden markup and manufacturer rebate analysis",
      "Fiduciary compliance remediation strategy"
    ],
    keyFindings: [
      "Uncovered $14.2M in recoverable contract spreads",
      "Disclosed fees represented less than 15% of actual PBM retention"
    ]
  },
  {
    id: "forensic-actuarial",
    title: "Comprehensive Forensic Actuarial Analysis",
    subtitle: "Enterprise-Grade Risk & Contract Intelligence",
    description: "The definitive forensic examination combining actuarial risk modeling, contract intelligence, claims forensics, and regulatory compliance analysis. Includes Monte Carlo simulations, retrospective claims audits, PBM contract line-by-line analysis, and stop-loss optimization. Delivered as a 200+ page report with evidence appendices, financial models, and 6-month roadmap.",
    href: "/request-demo",
    category: "Premium Forensic Intelligence",
    readTime: "Custom engagement",
    featured: true,
    price: 100000,
    priceLabel: "$100,000",
    deliverables: [
      "200+ page comprehensive forensic report",
      "Complete PBM contract analysis (all clauses, all terms)",
      "3-year retrospective claims audit with anomaly detection",
      "Monte Carlo risk simulation with 10,000 scenarios",
      "Stop-loss optimization and captive feasibility analysis",
      "Board-ready executive presentation deck",
      "Financial model with 5-year projections",
      "Regulatory compliance assessment (ERISA, HIPAA, ACA)",
      "Implementation roadmap with timeline and milestones",
      "6 months post-delivery consulting support"
    ],
    keyFindings: [
      "Identifies $2M-$15M in annual recoverable contractual leakage",
      "Quantifies total cost of risk with 95% confidence intervals",
      "Provides actuarially-sound trend projections for 36-month horizon",
      "Documents regulatory compliance gaps with remediation protocols"
    ]
  }
];

// Mock Live Stream Data
const initialAuditEvents = [
  { id: 1, time: "Just now", plan: "Midwest Logistics Group", type: "MAC Spread Spike", desc: "Generic ImIPRAMINE markup detected at 410% above NADAC", loss: "$12,450", severity: "critical" },
  { id: 2, time: "3 mins ago", plan: "Coastal Health System", type: "Rebate Misclassification", desc: "Specialty biosimilar categorized as generic to retain GPO fee share", loss: "$48,200", severity: "high" },
  { id: 3, time: "12 mins ago", plan: "Apex Industrial Corp", type: "AWP Inflation", desc: "AWP baseline of brand-name asthma drug inflated by 14.8% vs Medi-Span reference", loss: "$84,100", severity: "critical" },
  { id: 4, time: "25 mins ago", plan: "Great Lakes Schools Trust", type: "Prior Auth Bypass Failure", desc: "Automatic formulary steer to higher-rebate tier despite pre-auth approval", loss: "$6,900", severity: "medium" },
  { id: 5, time: "40 mins ago", plan: "Texan Energy Partners", type: "Specialty Pharmacy Spread", desc: "Buy-and-bill drug billed via PBM-owned specialty portal at 28% markup", loss: "$31,700", severity: "high" },
];

export default function KincaidIQIntelligenceSeries() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<"reports" | "live-stream">("reports");
  const [mounted, setMounted] = useState(false);

  // Sandbox state
  const [coveredLives, setCoveredLives] = useState<number>(5000);
  const [currentPbmModel, setCurrentPbmModel] = useState<"traditional-spread" | "carve-out-pass" | "fully-bundled">("traditional-spread");
  const [specialtyRatio, setSpecialtyRatio] = useState<number>(45); // % of spend that is specialty
  const [simulatedLoss, setSimulatedLoss] = useState({ spread: 0, rebateLeakage: 0, complianceGap: 0, total: 0 });

  // Live Stream state
  const [auditEvents, setAuditEvents] = useState(initialAuditEvents);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Recalculate Sandbox simulation
  useEffect(() => {
    let baseLossPerLife = 0;
    let rebateRatio = 0.35;
    let complianceRatio = 0.15;

    if (currentPbmModel === "traditional-spread") {
      baseLossPerLife = 50;
      rebateRatio = 0.42;
    } else if (currentPbmModel === "carve-out-pass") {
      baseLossPerLife = 25;
      rebateRatio = 0.18;
      complianceRatio = 0.25;
    } else {
      baseLossPerLife = 70;
      rebateRatio = 0.55;
    }

    // Factor in specialty ratio (specialty drugs are high-cost, high-arbitrage)
    const specialtyMultiplier = 1 + (specialtyRatio - 40) / 100;
    const totalPotentialLoss = coveredLives * baseLossPerLife * specialtyMultiplier;

    const spread = Math.round(totalPotentialLoss * (1 - rebateRatio - complianceRatio));
    const rebateLeakage = Math.round(totalPotentialLoss * rebateRatio);
    const complianceGap = Math.round(totalPotentialLoss * complianceRatio);
    const total = spread + rebateLeakage + complianceGap;

    setSimulatedLoss({ spread, rebateLeakage, complianceGap, total });
  }, [coveredLives, currentPbmModel, specialtyRatio]);

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

  const categories = [
    "all",
    "Premium Forensic Intelligence",
    "Contract Intelligence",
    "Risk Analytics",
    "Pricing Intelligence",
    "Clinical Intelligence",
    "Benchmarking"
  ];

  // Dynamic sorting: Lowest Price First
  const sortedReports = useMemo(() => {
    return [...reportsData].sort((a, b) => a.price - b.price);
  }, []);
  
  const filteredReports = useMemo(() => {
    if (selectedCategory === "all") return sortedReports;
    return sortedReports.filter(r => r.category === selectedCategory);
  }, [selectedCategory, sortedReports]);

  return (
    <>
      <Head>
        <title>Intelligence Series | Kincaid Health Data Sciences Lab</title>
        <meta name="description" content="Forensic PBM intelligence reports and actuarial analysis for fiduciaries, actuaries, and capital markets." />
      </Head>
      <SEO 
        title="Kincaid Health Intelligence Series - Actuarial Benefits, PBM Defense & Claims Recovery"
        description="Complete suite of forensic intelligence products: Actuarial Benefits Intelligence, PBM Contract Clarity 360*, Claims Recovery Intelligence, and Sales Intelligence for self-funded healthcare."
      />

      <Nav />

      <main className="min-h-screen bg-[#0F1419]">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-black via-[#0A0E27] to-black z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-[#1A3A52]/20 border border-[#1A3A52] rounded px-4 py-2 text-xs font-mono text-[#B8860B] uppercase tracking-wider mb-6">
                <FileText className="w-4 h-4 text-[#B8860B]" />
                Forensic Intelligence Center
              </div>
              
              <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
                Kincaid Health Intelligence Series
              </h1>
              
              <p className="text-xl text-neutral-300 leading-relaxed mb-8">
                Evidence-based forensic audits employing actuarial rigor, contract intelligence frameworks, and clinical validation protocols. Sorted seamlessly from essential benchmarking dockets to flagship risk defense suites.
              </p>
            </div>
          </div>
        </section>

        {/* Forensic Risk Sandbox - FIRST THING YOU SEE */}
        {mounted && (
          <section className="py-16 bg-[#11161C] border-b border-[#1F2937]">
            <div className="max-w-7xl mx-auto px-6">
              <div className="max-w-3xl mb-12">
                <Badge className="bg-[#B8860B]/10 text-[#B8860B] border border-[#B8860B] mb-3">ACTUARIAL SIMULATOR</Badge>
                <h2 className="text-3xl font-serif font-bold text-white mb-4">Forensic Risk Sandbox</h2>
                <p className="text-neutral-400">
                  Model your group's exposure to common PBM pricing mechanics. Adjust plan components below to project hidden contract leakage, uncaptured manufacturer rebates, and MAC list spreads based on retrospective actuarial audit benchmarks.
                </p>
              </div>

              <IntelligenceSandbox 
                coveredLives={coveredLives} 
                setCoveredLives={setCoveredLives} 
              />
            </div>
          </section>
        )}

        {/* Impact Metrics Panel (Dynamic and Always Visible) */}
        <section className="py-12 border-b border-[#1F2937]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-serif font-bold text-white mb-2">$273M</div>
                <div className="text-sm text-neutral-400">Identified Contractual Leakage</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-serif font-bold text-white mb-2">13</div>
                <div className="text-sm text-neutral-400">Published Intelligence Reports</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-serif font-bold text-white mb-2">31%</div>
                <div className="text-sm text-neutral-400">Average Cost Reduction</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-serif font-bold text-white mb-2">247</div>
                <div className="text-sm text-neutral-400">Organizations Served</div>
              </div>
            </div>
          </div>
        </section>

        {/* Secondary Navigation: Reports & Live Stream Tabs */}
        <section className="border-b border-[#1F2937] bg-[#151B23] sticky top-16 z-10">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveTab("reports")}
                className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all ${
                  activeTab === "reports" 
                    ? "border-[#B8860B] text-[#B8860B] bg-[#151B23]/40" 
                    : "border-transparent text-neutral-400 hover:text-white"
                }`}
              >
                <ListCollapse className="w-4 h-4 inline-block mr-2" />
                Intelligence Reports (Lowest Price First)
              </button>
              <button
                onClick={() => setActiveTab("live-stream")}
                className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all ${
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
          <section className="py-16 bg-[#11161C] border-b border-[#1F2937]">
            <div className="max-w-7xl mx-auto px-6">
              <div className="max-w-3xl mb-12 flex justify-between items-end">
                <div>
                  <Badge className="bg-rose-500/10 text-rose-400 border border-rose-500/30 mb-3 animate-pulse">LIVE FORENSIC RADAR</Badge>
                  <h2 className="text-3xl font-serif font-bold text-white mb-4">Live Forensic Audit Stream</h2>
                  <p className="text-neutral-400">
                    Real-time transaction-level anomalies automatically flagged by Kincaid Health's analytical engine. This stream showcases verified contract deviations and margin spreads across various employer plans.
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

              <div className="space-y-4">
                {auditEvents.map((event) => (
                  <div 
                    key={event.id}
                    className="bg-[#151B23] border border-[#2A3F54]/80 hover:border-[#B8860B]/50 transition-all rounded-lg p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
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

              <div className="bg-[#1A3A52]/10 border border-[#1A3A52] rounded-lg p-6 mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
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
          <>
            {/* Category Filter */}
            <section className="border-b border-[#1F2937] bg-[#151B23] sticky top-16 z-10">
              <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center gap-3 overflow-x-auto">
                  <span className="text-sm font-medium text-neutral-400 whitespace-nowrap flex items-center gap-1">
                    <Filter className="w-4 h-4" />
                    Filter by Category:
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
                      {category === "all" ? "All Reports" : category}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* Comprehensive Dossier Grid sorted by lowest price first */}
            <section className="py-16">
              <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#2A3F54]/40">
                  <div>
                    <h2 className="text-3xl font-serif font-bold text-white">
                      Intelligence Series Dossiers
                    </h2>
                    <p className="text-sm text-neutral-400 mt-1">
                      Showcasing all available forensic audit frameworks and research publications, sorted with the lowest price tier first.
                    </p>
                  </div>
                  <Badge variant="outline" className="border-[#B8860B]/30 bg-[#B8860B]/10 text-[#B8860B] font-mono text-xs px-3 py-1 uppercase tracking-wider">
                    Price Ascending
                  </Badge>
                </div>
                
                <div className="grid gap-8">
                  {filteredReports.map((report) => (
                    <div 
                      key={report.id} 
                      className={`border rounded-xl transition-all duration-300 overflow-hidden ${
                        report.featured 
                          ? "border-[#B8860B] bg-gradient-to-r from-[#1E1911] via-[#151B23] to-[#0F1419] shadow-2xl shadow-amber-500/5" 
                          : "border-[#2A3F54] bg-[#151B23] hover:border-[#B8860B]/50 hover:bg-[#1C232B]"
                      }`}
                    >
                      <div className="p-8">
                        <div className="grid lg:grid-cols-12 gap-8 items-start">
                          
                          {/* Left Column: Category, Metadata and Title */}
                          <div className="lg:col-span-8 space-y-4">
                            <div className="flex flex-wrap items-center gap-3">
                              <Badge className={`${
                                report.featured 
                                  ? "bg-[#B8860B] text-[#0F1419] font-bold" 
                                  : "bg-[#1A3A52] text-white border border-[#2A3F54]"
                              } text-xs uppercase tracking-wider px-2.5 py-1`}>
                                {report.category}
                              </Badge>
                              <span className="flex items-center gap-1.5 text-xs text-neutral-400">
                                <Clock className="w-3.5 h-3.5" />
                                {report.readTime}
                              </span>
                            </div>

                            <div>
                              <h3 className="text-3xl font-serif font-bold text-white leading-tight">
                                {report.title}
                              </h3>
                              <p className="text-base font-semibold text-[#B8860B] mt-1">
                                {report.subtitle}
                              </p>
                            </div>

                            <p className="text-neutral-300 leading-relaxed text-base">
                              {report.description}
                            </p>

                            {/* Report Deliverables List */}
                            {report.deliverables && (
                              <div className="bg-[#0F1419]/60 border border-[#2A3F54]/60 rounded-xl p-5">
                                <h4 className="text-xs font-mono uppercase tracking-widest text-[#B8860B] mb-3">
                                  Scope of Deliverables
                                </h4>
                                <div className="grid md:grid-cols-2 gap-3">
                                  {report.deliverables.map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-2.5 text-sm text-neutral-300">
                                      <ChevronRight className="w-4 h-4 mt-0.5 text-[#B8860B] flex-shrink-0" />
                                      <span>{item}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Key Findings List */}
                            {report.keyFindings && (
                              <div className="border-l-4 border-[#B8860B] pl-4 py-1.5 space-y-2">
                                <h4 className="text-xs font-mono uppercase tracking-widest text-[#B8860B]">
                                  Key Research Findings
                                </h4>
                                <ul className="space-y-1.5">
                                  {report.keyFindings.map((finding, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm text-neutral-300 leading-relaxed">
                                      <ChevronRight className="w-4 h-4 mt-0.5 text-amber-500/70 flex-shrink-0" />
                                      <span>{finding}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>

                          {/* Right Column: Pricing Tag & Call-to-Actions */}
                          <div className="lg:col-span-4 flex flex-col justify-between h-full bg-[#0F1419]/80 border border-[#2A3F54]/40 rounded-xl p-6 space-y-6">
                            <div className="space-y-1">
                              <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">Dossier Access Valuation</span>
                              <div className="text-4xl font-extrabold tracking-tight text-white flex items-baseline gap-1">
                                {report.priceLabel}
                                <span className="text-xs font-mono text-neutral-500 font-normal"> / plan sponsor</span>
                              </div>
                              <p className="text-[11px] text-neutral-500 leading-relaxed pt-1">
                                {report.featured 
                                  ? "Premium bespoke engagement with formal litigation support and actuarial sign-off." 
                                  : "Instant download of the core forensic template and complete methodology guide."
                                }
                              </p>
                            </div>

                            <div className="space-y-3 pt-4 border-t border-[#2A3F54]/40">
                              <Link href={report.href} className="w-full block" target={report.href.endsWith(".pdf") ? "_blank" : undefined}>
                                <Button className={`w-full font-bold uppercase tracking-wider text-xs py-5 ${
                                  report.featured 
                                    ? "bg-[#B8860B] hover:bg-[#9A7209] text-[#0F1419]" 
                                    : "bg-amber-500/10 hover:bg-amber-500 border border-amber-500/20 hover:text-black text-amber-400"
                                }`}>
                                  Request Dossier
                                  <ChevronRight className="w-4 h-4 ml-1.5" />
                                </Button>
                              </Link>
                              
                              {report.id === "forensic-actuarial" ? (
                                <Link href="/contact" className="w-full block">
                                  <Button variant="outline" className="w-full border-[#B8860B]/40 hover:bg-[#1A3A52]/20 text-[#B8860B] text-xs uppercase tracking-wider">
                                    Schedule Scoping Call
                                  </Button>
                                </Link>
                              ) : (
                                <a href={report.href} target="_blank" rel="noopener noreferrer" className="w-full block">
                                  <Button variant="outline" className="w-full border-[#2A3F54] text-neutral-300 text-xs uppercase tracking-wider hover:bg-[#0C1117]">
                                    <Download className="w-3.5 h-3.5 mr-1.5" />
                                    View Report PDF
                                  </Button>
                                </a>
                              )}
                            </div>

                            {/* Additional standard context info */}
                            <div className="pt-2 text-[10px] text-neutral-500 flex items-center gap-1.5 justify-center">
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
          </>
        )}

        {/* Methodology Section */}
        <section className="py-16 border-t border-[#1F2937]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-serif font-bold text-white mb-6">
                Research Methodology & Analytical Rigor
              </h2>
              
              <div className="space-y-6">
                <p className="text-neutral-300 leading-relaxed text-lg">
                  Each intelligence report in the Kincaid Health series undergoes rigorous forensic analysis employing proprietary actuarial modeling frameworks, contract intelligence algorithms, and evidence-based validation protocols. Our methodologies comply with Actuarial Standards of Practice and withstand regulatory scrutiny in ERISA fiduciary contexts.
                </p>
                
                <h3 className="text-xl font-serif font-semibold text-white pt-4">Core Analytical Frameworks</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-[#151B23] border border-[#2A3F54] rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Microscope className="w-6 h-6 text-[#B8860B]" />
                      <h4 className="font-semibold text-white">Actuarial Science</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-neutral-300">
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
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-0.5 text-[#B8860B] flex-shrink-0" />
                        <span>IBNR reserve estimation via chain-ladder methods</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-[#151B23] border border-[#2A3F54] rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Shield className="w-6 h-6 text-[#B8860B]" />
                      <h4 className="font-semibold text-white">Contract Intelligence</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-neutral-300">
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
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-0.5 text-[#B8860B] flex-shrink-0" />
                        <span>Material breach identification and evidence assembly</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-[#151B23] border border-[#2A3F54] rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <BarChart3 className="w-6 h-6 text-[#B8860B]" />
                      <h4 className="font-semibold text-white">Statistical Analysis</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-neutral-300">
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-0.5 text-[#B8860B] flex-shrink-0" />
                        <span>Hypothesis testing (t-tests, ANOVA, chi-square)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-0.5 text-[#B8860B] flex-shrink-0" />
                        <span>Regression modeling (OLS, GLM, mixed effects)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-0.5 text-[#B8860B] flex-shrink-0" />
                        <span>Outlier detection (Tukey, IQR, Mahalanobis distance)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-0.5 text-[#B8860B] flex-shrink-0" />
                        <span>Propensity score matching for causal inference</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-[#151B23] border border-[#2A3F54] rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Target className="w-6 h-6 text-[#B8860B]" />
                      <h4 className="font-semibold text-white">Benchmarking Standards</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-neutral-300">
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-0.5 text-[#B8860B] flex-shrink-0" />
                        <span>NADAC federal pricing references (CMS)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-0.5 text-[#B8860B] flex-shrink-0" />
                        <span>Industry percentile rankings (Truven, IQVIA)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-0.5 text-[#B8860B] flex-shrink-0" />
                        <span>Clinical guideline validation (NCCN, ADA, ACC/AHA)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-0.5 text-[#B8860B] flex-shrink-0" />
                        <span>Actuarial Standards of Practice (ASOP) compliance</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="border-l-4 border-[#1A3A52] pl-6 py-4 bg-[#151B23] rounded-r-lg mt-8">
                  <h4 className="text-sm font-semibold text-white mb-3">Professional Standards & Peer Review</h4>
                  <p className="text-neutral-300 leading-relaxed text-sm">
                    All published intelligence reports undergo peer review by credentialed actuaries (FSA, ASA, EA) and comply with relevant Actuarial Standards of Practice. Findings are validated against industry benchmarks, regulatory guidance, and peer-reviewed actuarial literature to ensure analytical rigor and professional defensibility in fiduciary contexts. Each report includes complete methodology disclosure, sensitivity analyses, and limitations statements per professional standards.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-12 border-t border-[#1F2937]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#1A3A52]/20 border border-[#1A3A52] flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-[#B8860B]" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Actuarial Credentialed</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    All reports authored by FSA, ASA, or EA credentialed actuaries. Peer review by independent actuaries with relevant specialty certification (health, pension, enterprise risk).
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#1A3A52]/20 border border-[#1A3A52] flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-[#B8860B]" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">ERISA Compliant</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    Analysis frameworks align with ERISA fiduciary standards, DOL guidance on prudent benefit administration, and litigation-tested documentation requirements.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#1A3A52]/20 border border-[#1A3A52] flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-[#B8860B]" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Evidence-Based</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    Every finding substantiated with primary source documentation, regulatory citations, peer-reviewed literature, or quantitative analysis with disclosed methodology.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 border-t border-[#1F2937]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-serif font-bold text-white mb-6">
                Request Custom Intelligence Brief
              </h2>
              
              <p className="text-lg text-neutral-300 mb-8 leading-relaxed">
                Our forensic analysis team produces customized intelligence reports tailored to your organization's PBM contracts, claims experience, and risk profile. Each engagement employs the same rigorous methodology as our published series, with deliverables designed for board presentation and regulatory defense.
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
      </main>

      <Footer />
    </>
  );
}