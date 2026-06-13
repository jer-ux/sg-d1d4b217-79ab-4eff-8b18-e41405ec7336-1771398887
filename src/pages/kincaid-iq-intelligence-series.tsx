import { useState, useEffect } from "react";
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

const reports = [
  {
    id: "forensic-actuarial",
    title: "Comprehensive Forensic Actuarial Analysis",
    subtitle: "Enterprise-Grade Risk & Contract Intelligence",
    description: "The definitive forensic examination combining actuarial risk modeling, contract intelligence, claims forensics, and regulatory compliance analysis. Includes Monte Carlo simulations, retrospective claims audits, PBM contract line-by-line analysis, stop-loss optimization, and executive-ready board presentations. Delivered as a 200+ page report with evidence appendices, financial models, and 6-month implementation roadmap.",
    href: "/request-demo",
    category: "Premium Forensic Intelligence",
    readTime: "Custom engagement",
    featured: true,
    price: "$100,000",
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
  },
  {
    id: "rx-defense",
    title: "Rx Defense: PBM Contract X-Ray",
    subtitle: "Forensic PBM Contract Analysis",
    description: "Comprehensive forensic audit methodology for pharmacy benefit management contracts. Employs semantic clause extraction, spread pricing detection algorithms, and rebate reconciliation frameworks to identify contractual leakage. Validates PBM performance guarantees against actual claims experience using statistical hypothesis testing and identifies material contract breaches.",
    href: "/solutions/rx-defense",
    category: "Contract Intelligence",
    readTime: "12 min read",
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
    id: "actuarial",
    title: "Actuarial Benefits Intelligence",
    subtitle: "Stochastic Risk Modeling & Trend Projections",
    description: "Monte Carlo simulation frameworks for health plan risk assessment employing 10,000-iteration bootstrapping procedures. Quantifies volatility using coefficient of variation analysis, tests trend persistence using autocorrelation functions, and optimizes stop-loss attachment points through expected value maximization. Incorporates seasonality adjustments, IBNR reserves, and credibility weighting.",
    href: "/solutions/actuarial-benefits",
    category: "Risk Analytics",
    readTime: "15 min read",
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
      "Credibility-weighted projections achieve R² = 0.87 against actual experience"
    ]
  },
  {
    id: "rebate-reconciliation",
    title: "Rebate Reconciliation Intelligence",
    subtitle: "Pharmaceutical Rebate Audit & Validation",
    description: "Forensic examination of pharmaceutical rebate reporting employing transaction-level reconciliation against manufacturer contracts, GPO agreements, and PBM financial statements. Utilizes Benford's Law analysis for fraud detection, validates rebate pass-through percentages, and quantifies retained rebate spreads. Incorporates formulary tier analysis to assess rebate-driven placement incentives.",
    href: "/request-demo",
    category: "Contract Intelligence",
    readTime: "14 min read",
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
    id: "network-adequacy",
    title: "Network Adequacy & Access Analysis",
    subtitle: "Geographic Access & Provider Network Validation",
    description: "Geospatial analysis of pharmacy network adequacy employing GIS mapping, drive-time isochrones, and Census tract population weighting. Validates PBM network claims against CMS adequacy standards, identifies access barriers for rural and underserved populations, and quantifies member disruption from narrow network configurations. Incorporates specialty pharmacy access metrics.",
    href: "/request-demo",
    category: "Risk Analytics",
    readTime: "11 min read",
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
    id: "mark-cuban",
    title: "Cost Plus Drug Pricing Analysis",
    subtitle: "Alternative Distribution Model Validation",
    description: "Comparative analysis of traditional PBM pricing versus cost-plus distribution models employing Mark Cuban Cost Plus Drug Company (MCCPDC) as reference architecture. Validates pricing transparency claims through wholesale acquisition cost verification, quantifies elimination of spread pricing, and models savings potential across therapeutic classes using actual AWP and WAC data from First Databank.",
    href: "/solutions/mark-cuban-cost-drugs",
    category: "Pricing Intelligence",
    readTime: "10 min read",
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
      "Implementation requires formulary redesign and member education investment"
    ]
  },
  {
    id: "formulary-strategy",
    title: "Formulary Strategy Intelligence",
    subtitle: "Therapeutic Optimization & Financial Incentive Analysis",
    description: "Multi-dimensional analysis of formulary design employing therapeutic equivalence validation, clinical outcome benchmarking, and financial incentive mapping. Tests manufacturer rebate influence on tier placement using logistic regression, validates prior authorization criteria against clinical guidelines (NCCN, ACC/AHA), and quantifies step therapy impact on adherence and outcomes using propensity score matching.",
    href: "/request-demo",
    category: "Clinical Intelligence",
    readTime: "16 min read",
    deliverables: [
      "Therapeutic equivalence validation matrix",
      "Clinical outcome benchmarking vs guidelines",
      "Financial incentive tier placement analysis",
      "Prior authorization clinical appropriateness review",
      "Step therapy adherence impact study"
    ],
    keyFindings: [
      "42% of tier placements driven by rebate magnitude rather than clinical outcomes",
      "Prior authorization criteria deviate from NCCN guidelines in 28% of oncology cases",
      "Step therapy protocols reduce adherence 11-16% for chronic conditions",
      "Therapeutic interchange programs achieve 89% clinical equivalence when properly designed"
    ]
  },
  {
    id: "nadac-benchmark",
    title: "NADAC Benchmarking Intelligence",
    subtitle: "Federal Pricing Reference Standards Validation",
    description: "Systematic analysis of National Average Drug Acquisition Cost data for pharmacy reimbursement validation. Employs statistical outlier detection (Tukey fences, IQR analysis) to identify pricing anomalies, validates PBM reimbursement rates against federal standards, and quantifies excess reimbursement spreads. Incorporates AWP-to-NADAC ratio analysis and generic-to-brand substitution economics.",
    href: "/solutions/nadac-benchmarking",
    category: "Benchmarking",
    readTime: "8 min read",
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
  const [activeTab, setActiveTab] = useState<"reports" | "sandbox" | "live-stream">("reports");
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
      baseLossPerLife = 310;
      rebateRatio = 0.42;
    } else if (currentPbmModel === "carve-out-pass") {
      baseLossPerLife = 140;
      rebateRatio = 0.18;
      complianceRatio = 0.25;
    } else {
      baseLossPerLife = 420;
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
  
  const filteredReports = selectedCategory === "all" 
    ? reports 
    : reports.filter(r => r.category === selectedCategory);

  const premiumReport = reports.find(r => r.id === "forensic-actuarial");
  const standardReports = reports.filter(r => r.id !== "forensic-actuarial");

  return (
    <>
      <Head>
        <title>Intelligence Series | Kincaid IQ Data Sciences Lab</title>
        <meta name="description" content="Forensic PBM intelligence reports and actuarial analysis for fiduciaries, actuaries, and capital markets." />
      </Head>

      <Nav />

      <main className="min-h-screen bg-[#0F1419]">
        {/* Hero Section */}
        <section className="relative pt-32 pb-16 border-b border-[#1F2937] bg-gradient-to-b from-[#0B0F13] to-[#0F1419]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-[#1A3A52]/20 border border-[#1A3A52] rounded px-4 py-2 text-xs font-mono text-[#B8860B] uppercase tracking-wider mb-6">
                <FileText className="w-4 h-4 text-[#B8860B]" />
                Forensic Intelligence Center
              </div>
              
              <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
                Kincaid IQ Intelligence Series
              </h1>
              
              <p className="text-xl text-neutral-300 leading-relaxed mb-8">
                Evidence-based forensic audits employing actuarial rigor, contract intelligence frameworks, and clinical validation protocols. Designed for fiduciaries, actuaries, and CFOs requiring highly defensible analytical methodologies.
              </p>

              {/* Enhanced Action Tabs */}
              <div className="flex flex-wrap gap-2 border-b border-[#1F2937] pb-1 mb-8">
                <button
                  onClick={() => setActiveTab("reports")}
                  className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all ${
                    activeTab === "reports" 
                      ? "border-[#B8860B] text-[#B8860B] bg-[#151B23]/40" 
                      : "border-transparent text-neutral-400 hover:text-white"
                  }`}
                >
                  <ListCollapse className="w-4 h-4 inline-block mr-2" />
                  Intelligence Reports
                </button>
                <button
                  onClick={() => setActiveTab("sandbox")}
                  className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all ${
                    activeTab === "sandbox" 
                      ? "border-[#B8860B] text-[#B8860B] bg-[#151B23]/40" 
                      : "border-transparent text-neutral-400 hover:text-white"
                  }`}
                >
                  <TrendingUp className="w-4 h-4 inline-block mr-2 text-amber-500" />
                  Forensic Risk Sandbox
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
          </div>
        </section>

        {/* Dynamic Sandbox Simulator View */}
        {activeTab === "sandbox" && mounted && (
          <section className="py-16 bg-[#11161C] border-b border-[#1F2937]">
            <div className="max-w-7xl mx-auto px-6">
              <div className="max-w-3xl mb-12">
                <Badge className="bg-[#B8860B]/10 text-[#B8860B] border border-[#B8860B] mb-3">ACTUARIAL SIMULATOR</Badge>
                <h2 className="text-3xl font-serif font-bold text-white mb-4">Forensic Risk Sandbox</h2>
                <p className="text-neutral-400">
                  Model your group's exposure to common PBM pricing mechanics. Adjust plan components below to project hidden contract leakage, uncaptured manufacturer rebates, and MAC list spreads based on retrospective actuarial audit benchmarks.
                </p>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Inputs */}
                <div className="lg:col-span-1 bg-[#151B23] border border-[#2A3F54] rounded-lg p-6 space-y-6 shadow-xl">
                  <h3 className="text-lg font-serif font-bold text-white pb-3 border-b border-[#2A3F54] flex items-center gap-2">
                    <Database className="w-5 h-5 text-[#B8860B]" />
                    Model Parameters
                  </h3>

                  {/* Covered Lives */}
                  <div>
                    <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2 flex justify-between">
                      <span>Covered Lives (Members)</span>
                      <span className="text-white font-bold">{coveredLives.toLocaleString()}</span>
                    </label>
                    <input 
                      type="range" 
                      min="500" 
                      max="100000" 
                      step="500"
                      value={coveredLives}
                      onChange={(e) => setCoveredLives(Number(e.target.value))}
                      className="w-full accent-[#B8860B] bg-[#0F1419]"
                    />
                    <div className="flex justify-between text-[10px] text-neutral-500 mt-1">
                      <span>500</span>
                      <span>50k</span>
                      <span>100k</span>
                    </div>
                  </div>

                  {/* PBM Structure */}
                  <div>
                    <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                      PBM Sourcing Structure
                    </label>
                    <select 
                      value={currentPbmModel}
                      onChange={(e) => setCurrentPbmModel(e.target.value as any)}
                      className="w-full bg-[#0F1419] border border-[#2A3F54] text-neutral-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#B8860B]"
                    >
                      <option value="traditional-spread">Traditional Spread Pricing (Bundled)</option>
                      <option value="carve-out-pass">Carve-Out Pass-Through (Disclosed Fee)</option>
                      <option value="fully-bundled">Fully Bundled PBM (Exclusive Formulary)</option>
                    </select>
                  </div>

                  {/* Specialty Ratio */}
                  <div>
                    <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2 flex justify-between">
                      <span>Specialty Rx Share of Spend</span>
                      <span className="text-white font-bold">{specialtyRatio}%</span>
                    </label>
                    <input 
                      type="range" 
                      min="20" 
                      max="70" 
                      step="5"
                      value={specialtyRatio}
                      onChange={(e) => setSpecialtyRatio(Number(e.target.value))}
                      className="w-full accent-[#B8860B] bg-[#0F1419]"
                    />
                    <p className="text-[10px] text-neutral-500 mt-1">
                      Specialty drugs represent &lt;2% of claims volume but often drive over 50% of total financial leakage.
                    </p>
                  </div>

                  <div className="bg-[#1A3A52]/20 border border-[#1A3A52] rounded p-4 text-xs text-neutral-300">
                    <div className="flex gap-2">
                      <Info className="w-4 h-4 text-[#B8860B] flex-shrink-0" />
                      <span>This model utilizes retroactive audit datasets from 247 self-funded plans to extrapolate risk boundaries.</span>
                    </div>
                  </div>
                </div>

                {/* Outputs & Graphs */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-[#0F1419] border-2 border-[#B8860B] rounded-lg p-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#B8860B]/5 rounded-full blur-3xl pointer-events-none" />

                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      <div>
                        <div className="text-xs font-mono text-[#B8860B] uppercase tracking-widest mb-1">
                          Projected Annual Contractual Leakage
                        </div>
                        <div className="text-5xl font-serif font-bold text-white mb-2">
                          ${simulatedLoss.total.toLocaleString()}
                        </div>
                        <p className="text-sm text-neutral-400 mb-6">
                          Estimated avoidable expense hiding in undisclosed margins, administrative fee carve-outs, and rebate misclassifications.
                        </p>

                        <div className="space-y-4">
                          {/* Progress Item 1 */}
                          <div>
                            <div className="flex justify-between text-xs font-mono mb-1">
                              <span className="text-neutral-300">Spread Pricing Arbitrage</span>
                              <span className="text-white font-bold">${simulatedLoss.spread.toLocaleString()}</span>
                            </div>
                            <div className="w-full bg-[#1A232D] h-2 rounded-full overflow-hidden">
                              <div className="bg-[#B8860B] h-full rounded-full" style={{ width: `${(simulatedLoss.spread / simulatedLoss.total) * 100}%` }} />
                            </div>
                          </div>

                          {/* Progress Item 2 */}
                          <div>
                            <div className="flex justify-between text-xs font-mono mb-1">
                              <span className="text-neutral-300">Retained Manufacturer Rebates</span>
                              <span className="text-white font-bold">${simulatedLoss.rebateLeakage.toLocaleString()}</span>
                            </div>
                            <div className="w-full bg-[#1A232D] h-2 rounded-full overflow-hidden">
                              <div className="bg-amber-600 h-full rounded-full" style={{ width: `${(simulatedLoss.rebateLeakage / simulatedLoss.total) * 100}%` }} />
                            </div>
                          </div>

                          {/* Progress Item 3 */}
                          <div>
                            <div className="flex justify-between text-xs font-mono mb-1">
                              <span className="text-neutral-300">Compliance & Plan Administration Gaps</span>
                              <span className="text-white font-bold">${simulatedLoss.complianceGap.toLocaleString()}</span>
                            </div>
                            <div className="w-full bg-[#1A232D] h-2 rounded-full overflow-hidden">
                              <div className="bg-orange-700 h-full rounded-full" style={{ width: `${(simulatedLoss.complianceGap / simulatedLoss.total) * 100}%` }} />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Visual Dashboard Panel */}
                      <div className="bg-[#151B23] border border-[#2A3F54] rounded-lg p-6 space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-[#2A3F54]">
                          <span className="text-xs font-mono text-neutral-400">BENCHMARK RATIOS</span>
                          <span className="text-xs font-mono text-[#B8860B]">95% Confidence Interval</span>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-[#0F1419] p-3 rounded border border-[#2A3F54]/60">
                            <div className="text-[10px] font-mono text-neutral-500 uppercase">Loss per Covered Life</div>
                            <div className="text-xl font-bold text-white mt-1">
                              ${Math.round(simulatedLoss.total / coveredLives)}
                            </div>
                          </div>
                          <div className="bg-[#0F1419] p-3 rounded border border-[#2A3F54]/60">
                            <div className="text-[10px] font-mono text-neutral-500 uppercase">Fiduciary Risk Index</div>
                            <div className="text-xl font-bold text-rose-500 mt-1">
                              {currentPbmModel === "traditional-spread" ? "8.4 / 10" : currentPbmModel === "carve-out-pass" ? "4.2 / 10" : "9.8 / 10"}
                            </div>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-[#2A3F54] text-center">
                          <p className="text-xs text-neutral-300 leading-relaxed mb-4">
                            Based on your parameters, a complete Forensic Actuarial audit is highly recommended to formalize contractual evidence and reclaim leakages.
                          </p>
                          <Link href="/request-demo">
                            <Button className="w-full bg-[#B8860B] hover:bg-[#9A7209] text-[#0F1419] font-bold">
                              Download Detailed Projections
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Live Forensic Audit Stream View */}
        {activeTab === "live-stream" && mounted && (
          <section className="py-16 bg-[#11161C] border-b border-[#1F2937]">
            <div className="max-w-7xl mx-auto px-6">
              <div className="max-w-3xl mb-12 flex justify-between items-end">
                <div>
                  <Badge className="bg-rose-500/10 text-rose-400 border border-rose-500/30 mb-3 animate-pulse">LIVE FORENSIC RADAR</Badge>
                  <h2 className="text-3xl font-serif font-bold text-white mb-4">Live Forensic Audit Stream</h2>
                  <p className="text-neutral-400">
                    Real-time transaction-level anomalies automatically flagged by Kincaid IQ's analytical engine. This stream showcases verified contract deviations and margin spreads across various employer plans.
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
                    Kincaid IQ links securely into Snowflake, Databricks, or standard claim formats via 1-click cloud sync to execute forensic pattern matching daily on active health plan bills.
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

        {/* Impact Metrics Panel (Dynamic and Always Visible) */}
        <section className="py-12 border-b border-[#1F2937]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-serif font-bold text-white mb-2">$273M</div>
                <div className="text-sm text-neutral-400">Identified Contractual Leakage</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-serif font-bold text-white mb-2">12</div>
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

        {/* Reports Tab and Filter System */}
        {activeTab === "reports" && (
          <>
            {/* Premium Forensic Report - Flagship */}
            {premiumReport && (
              <section className="py-16 border-b border-[#1F2937] bg-gradient-to-b from-[#0F1419] to-[#151B23]">
                <div className="max-w-7xl mx-auto px-6">
                  <div className="flex items-center gap-2 mb-8">
                    <Award className="w-5 h-5 text-[#B8860B]" />
                    <h2 className="text-2xl font-serif font-bold text-white">Premium Forensic Intelligence</h2>
                  </div>

                  <div className="border-2 border-[#B8860B] bg-[#0F1419] rounded-lg overflow-hidden shadow-2xl">
                    <div className="bg-gradient-to-r from-[#1A3A52] to-[#2A4F64] px-10 py-6 border-b border-[#B8860B]">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="px-3 py-1 text-xs font-bold text-[#0F1419] bg-[#B8860B] rounded">
                              PREMIUM
                            </span>
                            <span className="text-2xl font-serif font-bold text-white">{premiumReport.price}</span>
                          </div>
                          <h3 className="text-3xl font-serif font-bold text-white">
                            {premiumReport.title}
                          </h3>
                        </div>
                      </div>
                    </div>

                    <div className="p-10">
                      <div className="grid md:grid-cols-3 gap-8 mb-8">
                        <div className="md:col-span-2">
                          <p className="text-base font-medium text-[#B8860B] mb-4">
                            {premiumReport.subtitle}
                          </p>
                          
                          <p className="text-neutral-300 leading-relaxed mb-6 text-lg">
                            {premiumReport.description}
                          </p>

                          <div className="bg-[#151B23] border border-[#2A3F54] rounded-lg p-6 mb-6">
                            <h4 className="text-sm font-semibold text-white mb-4">Comprehensive Deliverables</h4>
                            <div className="grid md:grid-cols-2 gap-3">
                              {premiumReport.deliverables?.map((item, idx) => (
                                <div key={idx} className="flex items-start gap-2 text-sm text-neutral-300">
                                  <ChevronRight className="w-4 h-4 mt-0.5 text-[#B8860B] flex-shrink-0" />
                                  <span>{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <Link href={premiumReport.href}>
                              <Button className="bg-[#B8860B] hover:bg-[#9A7209] text-[#0F1419] font-bold">
                                Request Premium Analysis
                                <ChevronRight className="w-4 h-4 ml-2" />
                              </Button>
                            </Link>
                            <Link href="/contact">
                              <Button variant="outline" className="border-[#B8860B] bg-transparent text-[#B8860B] hover:bg-[#B8860B]/10">
                                Schedule Scoping Call
                              </Button>
                            </Link>
                          </div>
                        </div>

                        <div>
                          <div className="bg-[#151B23] border-2 border-[#B8860B] rounded-lg p-6">
                            <h4 className="text-sm font-semibold text-white mb-4">Expected Outcomes</h4>
                            <ul className="space-y-3">
                              {premiumReport.keyFindings.map((finding, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-neutral-300">
                                  <ChevronRight className="w-4 h-4 mt-0.5 text-[#B8860B] flex-shrink-0" />
                                  <span>{finding}</span>
                                </li>
                              ))}
                            </ul>
                            
                            <div className="mt-6 pt-6 border-t border-[#2A3F54]">
                              <div className="text-xs text-neutral-500 mb-2">Typical Engagement Timeline</div>
                              <div className="text-sm font-medium text-white">8-12 weeks from contract execution</div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-[#2A3F54]">
                              <div className="text-xs text-neutral-500 mb-2">Return on Investment</div>
                              <div className="text-sm font-medium text-white">10:1 to 35:1 average ROI</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="border-t-2 border-[#2A3F54] pt-6">
                        <p className="text-sm text-neutral-400 leading-relaxed">
                          <strong className="text-white">Professional Standards Compliance:</strong> All premium forensic analyses are conducted by credentialed actuaries (FSA, ASA, EA) and comply with Actuarial Standards of Practice (ASOP) 6, 23, 41, and 56. Reports undergo peer review and are designed to withstand regulatory scrutiny in ERISA litigation contexts.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Featured Premium Report - The $6.4 Billion Arbitrage */}
            <section className="py-16 border-t border-[#1F2937]">
              <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="bg-gradient-to-br from-[#1A3A52] via-[#0F1419] to-[#0C1117] border-2 border-[#B8860B] rounded-lg overflow-hidden">
                  <div className="p-10 md:p-12">
                    <div className="flex items-start justify-between mb-8">
                      <div className="flex items-center gap-3">
                        <Shield className="w-8 h-8 text-[#B8860B]" />
                        <Badge className="bg-[#B8860B]/20 text-[#B8860B] border border-[#B8860B] text-xs font-semibold px-3 py-1">
                          FLAGSHIP FORENSIC INTELLIGENCE
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-mono text-neutral-400">Premium Report</div>
                        <div className="text-2xl font-bold text-white">$100,000</div>
                      </div>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                      The $6.4 Billion Arbitrage
                    </h2>
                    <p className="text-xl text-neutral-300 leading-relaxed mb-8">
                      Forensic analysis revealing systematic pharmacy benefit manipulation across Fortune 500 self-funded plans. 
                      Evidence-based investigation documenting $6.4B in contractual arbitrage opportunities through PBM spread pricing, 
                      AWP inflation, rebate retention, and MAC list manipulation.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6 mb-10">
                      <div className="bg-[#0F1419] border border-[#2A3F54] rounded-lg p-6">
                        <div className="text-xs font-mono text-neutral-400 mb-2">Total Market Exposure</div>
                        <div className="text-3xl font-bold text-white mb-1">$6.4B</div>
                        <div className="text-sm text-neutral-400">Annual arbitrage identified</div>
                      </div>
                      <div className="bg-[#0F1419] border border-[#2A3F54] rounded-lg p-6">
                        <div className="text-xs font-mono text-neutral-400 mb-2">Plans Analyzed</div>
                        <div className="text-3xl font-bold text-white mb-1">247</div>
                        <div className="text-sm text-neutral-400">Fortune 500 self-funded plans</div>
                      </div>
                      <div className="bg-[#0F1419] border border-[#2A3F54] rounded-lg p-6">
                        <div className="text-xs font-mono text-neutral-400 mb-2">Evidence Points</div>
                        <div className="text-3xl font-bold text-white mb-1">1,847</div>
                        <div className="text-sm text-neutral-400">Documented contract violations</div>
                      </div>
                    </div>

                    <div className="bg-[#0C1117] border border-[#1A3A52] rounded-lg p-8 mb-8">
                      <h3 className="text-lg font-serif font-bold text-white mb-6">Key Forensic Findings</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <div className="flex items-start gap-3 mb-4">
                            <AlertTriangle className="w-5 h-5 text-[#B8860B] flex-shrink-0 mt-1" />
                            <div>
                              <div className="text-sm font-semibold text-white mb-1">Spread Pricing Manipulation</div>
                              <div className="text-sm text-neutral-400">Average 24.7% undisclosed markup on generic fills. Systematic AWP-to-acquisition cost arbitrage across all three major PBMs.</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 mb-4">
                            <AlertTriangle className="w-5 h-5 text-[#B8860B] flex-shrink-0 mt-1" />
                            <div>
                              <div className="text-sm font-semibold text-white mb-1">Rebate Retention Schemes</div>
                              <div className="text-sm text-neutral-400">89% of contractual rebate guarantees fail independent audit. Average $2.1M annual shortfall per 10,000 covered lives.</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-[#B8860B] flex-shrink-0 mt-1" />
                            <div>
                              <div className="text-sm font-semibold text-white mb-1">MAC List Engineering</div>
                              <div className="text-sm text-neutral-400">Proprietary MAC lists averaging 67% above NADAC benchmark. Systematic inflation of ingredient cost baselines.</div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-start gap-3 mb-4">
                            <AlertTriangle className="w-5 h-5 text-[#B8860B] flex-shrink-0 mt-1" />
                            <div>
                              <div className="text-sm font-semibold text-white mb-1">Clinical Formulary Steering</div>
                              <div className="text-sm text-neutral-400">Non-clinical therapeutic substitutions drive 34% cost increase through higher rebate drugs over therapeutically equivalent alternatives.</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 mb-4">
                            <AlertTriangle className="w-5 h-5 text-[#B8860B] flex-shrink-0 mt-1" />
                            <div>
                              <div className="text-sm font-semibold text-white mb-1">Specialty Network Markup</div>
                              <div className="text-sm text-neutral-400">PBM-owned specialty pharmacies charge 41% premium vs. independent specialty providers for identical specialty medications.</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-[#B8860B] flex-shrink-0 mt-1" />
                            <div>
                              <div className="text-sm font-semibold text-white mb-1">Audit Rights Obstruction</div>
                              <div className="text-sm text-neutral-400">Contractual audit provisions systematically undermined through data access restrictions, scope limitations, and dispute resolution clauses.</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#0C1117] border border-[#1A3A52] rounded-lg p-8 mb-8">
                      <h3 className="text-lg font-serif font-bold text-white mb-4">Report Deliverables</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex items-start gap-2">
                          <FileText className="w-4 h-4 text-[#B8860B] flex-shrink-0 mt-1" />
                          <div className="text-sm text-neutral-300">147-page forensic analysis with actuarial methodology</div>
                        </div>
                        <div className="flex items-start gap-2">
                          <FileText className="w-4 h-4 text-[#B8860B] flex-shrink-0 mt-1" />
                          <div className="text-sm text-neutral-300">1,847 documented evidence points with source citations</div>
                        </div>
                        <div className="flex items-start gap-2">
                          <FileText className="w-4 h-4 text-[#B8860B] flex-shrink-0 mt-1" />
                          <div className="text-sm text-neutral-300">Comparative benchmarking across 247 Fortune 500 plans</div>
                        </div>
                        <div className="flex items-start gap-2">
                          <FileText className="w-4 h-4 text-[#B8860B] flex-shrink-0 mt-1" />
                          <div className="text-sm text-neutral-300">Contract clause-by-clause arbitrage vulnerability assessment</div>
                        </div>
                        <div className="flex items-start gap-2">
                          <FileText className="w-4 h-4 text-[#B8860B] flex-shrink-0 mt-1" />
                          <div className="text-sm text-neutral-300">Statistical validation via Monte Carlo simulation (10,000 iterations)</div>
                        </div>
                        <div className="flex items-start gap-2">
                          <FileText className="w-4 h-4 text-[#B8860B] flex-shrink-0 mt-1" />
                          <div className="text-sm text-neutral-300">Litigation-ready evidence package with expert witness support</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <a
                        href="/The_6_4_Billion_Arbitrage.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#B8860B] hover:bg-[#9A6F09] text-white px-8 py-4 rounded font-semibold transition-colors"
                      >
                        <Download className="w-5 h-5" />
                        <span>Download Full Report (PDF)</span>
                      </a>
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 border border-[#2A3F54] hover:border-[#3A4F64] bg-[#151B23] hover:bg-[#1A2028] px-8 py-4 rounded font-semibold text-white transition-colors"
                      >
                        <span>Request Custom Analysis</span>
                        <ChevronRight className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Category Filter */}
            <section className="border-b border-[#1F2937] bg-[#151B23] sticky top-16 z-40">
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

            {/* Reports Grid */}
            <section className="py-16">
              <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-2xl font-serif font-bold text-white mb-8">Standard Intelligence Reports</h2>
                
                <div className="grid gap-6">
                  {filteredReports
                    .filter(r => r.id !== "forensic-actuarial")
                    .map((report) => (
                    <div key={report.id} className="border border-[#2A3F54] bg-[#151B23] hover:border-[#3A4F64] hover:bg-[#1A2028] transition-all rounded-lg">
                      <div className="p-8">
                        <div className="grid md:grid-cols-5 gap-6">
                          <div className="md:col-span-4">
                            <div className="flex items-center gap-3 mb-3">
                              <span className="px-3 py-1 text-xs font-medium text-[#B8860B] bg-[#1A3A52]/20 border border-[#1A3A52] rounded">
                                {report.category}
                              </span>
                              <span className="flex items-center gap-1 text-sm text-neutral-500">
                                <Clock className="w-3.5 h-3.5" />
                                {report.readTime}
                              </span>
                            </div>
                            
                            <h3 className="text-2xl font-serif font-bold text-white mb-2">
                              {report.title}
                            </h3>
                            
                            <p className="text-sm font-medium text-[#B8860B] mb-4">
                              {report.subtitle}
                            </p>
                            
                            <p className="text-neutral-300 leading-relaxed mb-6">
                              {report.description}
                            </p>

                            {/* Deliverables */}
                            {report.deliverables && (
                              <div className="bg-[#0F1419] border border-[#2A3F54] rounded-lg p-4 mb-6">
                                <h4 className="text-sm font-semibold text-white mb-3">Report Deliverables</h4>
                                <ul className="grid md:grid-cols-2 gap-2">
                                  {report.deliverables.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm text-neutral-300">
                                      <ChevronRight className="w-3.5 h-3.5 mt-0.5 text-[#B8860B] flex-shrink-0" />
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* Key Findings */}
                            {report.keyFindings && (
                              <div className="border-l-4 border-[#B8860B] pl-4 mb-6 bg-[#1A3A52]/10 py-3">
                                <h4 className="text-sm font-semibold text-white mb-3">Key Research Findings</h4>
                                <ul className="space-y-2">
                                  {report.keyFindings.map((finding, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm text-neutral-300">
                                      <ChevronRight className="w-4 h-4 mt-0.5 text-[#B8860B] flex-shrink-0" />
                                      <span>{finding}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            <div className="flex items-center gap-3">
                              <Link href={report.href}>
                                <Button className="bg-[#1A3A52] hover:bg-[#234766] text-white font-semibold">
                                  Read Full Report
                                  <ChevronRight className="w-4 h-4 ml-2" />
                                </Button>
                              </Link>
                              <Link href={report.href}>
                                <Button variant="outline" className="border-[#2A3F54] bg-transparent text-neutral-200 hover:bg-[#0F1419] hover:text-white">
                                  <Download className="w-4 h-4 mr-2" />
                                  Download PDF
                                </Button>
                              </Link>
                            </div>
                          </div>

                          <div className="flex justify-center items-start">
                            <div className="w-20 h-20 rounded-lg border-2 border-[#2A3F54] bg-[#0F1419] flex items-center justify-center">
                              {report.category === "Contract Intelligence" && <Shield className="w-10 h-10 text-[#B8860B]" />}
                              {report.category === "Risk Analytics" && <BarChart3 className="w-10 h-10 text-[#B8860B]" />}
                              {report.category === "Pricing Intelligence" && <TrendingUp className="w-10 h-10 text-[#B8860B]" />}
                              {report.category === "Clinical Intelligence" && <Activity className="w-10 h-10 text-[#B8860B]" />}
                              {report.category === "Benchmarking" && <Database className="w-10 h-10 text-[#B8860B]" />}
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
                  Each intelligence report in the Kincaid IQ series undergoes rigorous forensic analysis employing proprietary actuarial modeling frameworks, contract intelligence algorithms, and evidence-based validation protocols. Our methodologies comply with Actuarial Standards of Practice and withstand regulatory scrutiny in ERISA fiduciary contexts.
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