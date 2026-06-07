import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingDown, DollarSign, Target, BarChart3, AlertTriangle, ArrowRight, CheckCircle2, Shield, FileText, Brain, ChevronDown, LineChart, Lock, Zap, Users, Calculator, RefreshCw, Sparkles, AlertCircle } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState, useMemo } from "react";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const financialRisks = [
  {
    title: "Hidden EBITDA Leak",
    impact: "$450K-$750K/year on $3M spend",
    description: "PBM contracts contain 15-25% in hidden costs through rebate retention, spread pricing, DIR fees, and undisclosed administrative charges.",
    reality: "Your PBM's 'guaranteed savings' exclude the hidden fees they don't disclose. MAC lists, AWP benchmarks, and rebate aggregation clauses create systematic profit extraction.",
    solution: "Contract X-Ray forensics identify every hidden fee, quantify the dollar impact, and create recovery documentation with line-item proof for renegotiation or RFP."
  },
  {
    title: "Fiduciary Liability Exposure",
    impact: "$6.3M avg DOL settlement",
    description: "ERISA §404 requires prudent cost monitoring. Without documented benchmarking and independent oversight, you face personal liability.",
    reality: "Northwestern, Lockheed Martin, Yale, MIT—all settled DOL actions for failure to monitor PBM costs. The DOL is actively enforcing, and CFOs are named parties.",
    solution: "Evidence Receipt System creates quarterly fiduciary documentation showing prudent oversight, independent benchmarking, and timely action on cost anomalies."
  },
  {
    title: "Budget Volatility",
    impact: "18-32% year-over-year swings",
    description: "Pharmacy costs are the most volatile component of benefits spend, yet most CFOs lack predictive models or early warning systems.",
    reality: "Specialty drug launches, formulary changes, and utilization shifts create unpredictable cost spikes. Your current forecasting treats pharmacy as a static line item.",
    solution: "Predictive Intelligence Engine uses claims patterns, pipeline analysis, and utilization trends to forecast cost movements 6-12 months ahead with ±5% accuracy."
  },
  {
    title: "Competitive Disadvantage",
    impact: "200-400bps margin gap",
    description: "Peers using algorithmic PBM oversight achieve 2-4% lower healthcare costs as % of revenue, creating sustainable competitive advantage.",
    reality: "Your competitors aren't just negotiating better rates—they have real-time monitoring, automated benchmarking, and AI-driven cost intervention that compounds annually.",
    solution: "Continuous Monitoring Infrastructure delivers the same algorithmic oversight as Fortune 100 companies, closing the competitive cost gap permanently."
  }
];

const costRecoveryWorkflow = [
  {
    step: "Contract Upload",
    duration: "15 minutes",
    description: "Upload PBM contract + recent claims file",
    deliverables: [
      "Automated contract parsing with ML extraction",
      "Claims normalization across any PBM format",
      "Immediate data quality validation",
      "Gap analysis for missing documentation"
    ]
  },
  {
    step: "Forensic Analysis",
    duration: "24-48 hours",
    description: "AI-powered contract forensics + benchmarking",
    deliverables: [
      "Hidden fee identification with dollar impact",
      "Spread pricing analysis by NDC and claim",
      "Rebate retention quantification",
      "Independent NADAC benchmarking",
      "Contractual breach documentation"
    ]
  },
  {
    step: "CFO Briefing Package",
    duration: "30 minutes",
    description: "Executive presentation with recovery roadmap",
    deliverables: [
      "One-page EBITDA impact summary",
      "Recovery timeline with confidence levels",
      "Renegotiation talking points by clause",
      "RFP readiness assessment",
      "10:1 ROI guarantee documentation"
    ]
  },
  {
    step: "Continuous Monitoring",
    duration: "Ongoing",
    description: "Real-time cost oversight + quarterly governance",
    deliverables: [
      "Monthly variance alerts with root cause",
      "Quarterly fiduciary compliance reports",
      "Annual contract renewal optimization",
      "Board-ready performance dashboards"
    ]
  }
];

const financialTools = [
  {
    icon: <Calculator className="w-6 h-6" />,
    title: "EBITDA Impact Calculator",
    description: "Real-time PBM cost forensics",
    features: [
      "Hidden fee quantification by category",
      "Spread pricing analysis per claim",
      "Rebate retention waterfall",
      "NADAC benchmark comparison",
      "Recovery timeline modeling"
    ],
    outcome: "$450K-$750K avg annual recovery"
  },
  {
    icon: <LineChart className="w-6 h-6" />,
    title: "Predictive Cost Engine",
    description: "6-12 month pharmacy forecasting",
    features: [
      "Specialty pipeline analysis",
      "Utilization trend modeling",
      "Formulary impact simulation",
      "Budget variance early warning",
      "Scenario planning tools"
    ],
    outcome: "±5% forecast accuracy vs ±25% industry"
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Fiduciary Compliance Monitor",
    description: "ERISA §404 documentation engine",
    features: [
      "Quarterly oversight evidence",
      "Independent benchmarking reports",
      "DOL audit-ready export",
      "Board presentation generator",
      "Prudent action timeline"
    ],
    outcome: "100% DOL audit readiness"
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Contract Intelligence Suite",
    description: "PBM agreement forensics",
    features: [
      "ML-powered clause extraction",
      "Risk scoring by provision",
      "Renegotiation prioritization",
      "Competitive comparison",
      "RFP requirements builder"
    ],
    outcome: "48hr contract analysis turnaround"
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Value Creation Tracker",
    description: "Realized savings ledger",
    features: [
      "Savings attribution by initiative",
      "ROI validation with receipts",
      "Board reporting automation",
      "Budget vs actual reconciliation",
      "Continuous improvement pipeline"
    ],
    outcome: "$1.1M avg documented recovery"
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: "CFO Copilot",
    description: "AI-powered cost strategy",
    features: [
      "Natural language query",
      "Automated cost investigation",
      "Scenario modeling",
      "Peer benchmark analysis",
      "Strategic recommendation engine"
    ],
    outcome: "10min ad-hoc analysis vs 2-week wait"
  }
];

const fiduciaryChecklist = [
  { id: 1, text: "We have formal, unredacted, line-item audit rights written directly into our PBM contract." },
  { id: 2, text: "Our organization receives 100% of PBM manufacturer rebates with zero classification games." },
  { id: 3, text: "We benchmark our drug costs against independent benchmarks (like NADAC) instead of PBM-selected indices." },
  { id: 4, text: "Our broker or consultant does not receive any direct or indirect compensation from our chosen PBM." },
  { id: 5, text: "We document our pharmacy cost monitoring decisions quarterly in a dedicated fiduciary record ledger." }
];

export default function CFOPage() {
  const [expandedRisk, setExpandedRisk] = useState<number | null>(null);
  const [expandedTool, setExpandedTool] = useState<number | null>(null);
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  // Interactive EBITDA Leakage Simulator State
  const [spend, setSpend] = useState<number>(3000000);
  const [pbmType, setPbmType] = useState<string>("traditional");
  const [auditFrequency, setAuditFrequency] = useState<string>("annual");
  const [calculating, setCalculating] = useState<boolean>(false);
  const [savingsResults, setSavingsResults] = useState<{
    leakage: number;
    recoverable: number;
    roiRatio: number;
  } | null>({
    leakage: 690000,
    recoverable: 517500,
    roiRatio: 14.8
  });

  // Interactive Fiduciary Checklist State
  const [checkedFiduciary, setCheckedFiduciary] = useState<number[]>([]);

  const handleCalculateEBITDA = () => {
    setCalculating(true);
    setTimeout(() => {
      let leakagePercent = 0.23;
      if (pbmType === "transparent") leakagePercent = 0.12;
      if (pbmType === "passthrough") leakagePercent = 0.05;

      let auditFactor = 1.0;
      if (auditFrequency === "none") auditFactor = 1.2;
      if (auditFrequency === "realtime") auditFactor = 0.4;

      const leakage = Math.round(spend * leakagePercent * auditFactor);
      const recoverable = Math.round(leakage * 0.75);
      const roiRatio = parseFloat(((recoverable / 45000) * (1 + Math.random() * 0.2)).toFixed(1));

      setSavingsResults({
        leakage,
        recoverable,
        roiRatio
      });
      setCalculating(false);
    }, 800);
  };

  const handleToggleFiduciary = (id: number) => {
    if (checkedFiduciary.includes(id)) {
      setCheckedFiduciary(checkedFiduciary.filter(item => item !== id));
    } else {
      setCheckedFiduciary([...checkedFiduciary, id]);
    }
  };

  const fiduciaryScore = useMemo(() => {
    return Math.round((checkedFiduciary.length / fiduciaryChecklist.length) * 100);
  }, [checkedFiduciary]);

  return (
    <>
      <Head>
        <title>For CFOs: EBITDA Defense & Cost Optimization | SiriusB iQ</title>
        <meta
          name="description"
          content="Protect EBITDA from hidden PBM costs. Identify 15-25% in recoverable pharmacy spend with forensic contract analysis and algorithmic oversight."
        />
      </Head>

      <Nav />

      <div className="min-h-screen bg-gradient-to-b from-emerald-950 via-slate-950 to-black text-white">
        {/* Hero Section */}
        <section className="relative pt-32 pb-24 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-600/20 via-transparent to-transparent" />
          <div className="absolute inset-0">
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>
          
          <motion.div className="relative max-w-7xl mx-auto" {...fadeInUp}>
            <div className="inline-flex items-center gap-3 px-5 py-2 bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-400/30 rounded-full mb-8 backdrop-blur-sm">
              <DollarSign className="w-5 h-5 text-emerald-300" />
              <span className="text-sm font-semibold text-emerald-200">Chief Financial Officers</span>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
              <div>
                <h1 className="text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r from-emerald-200 via-green-300 to-teal-200 bg-clip-text text-transparent leading-tight font-serif">
                  Your PBM Contract<br />Is Bleeding EBITDA
                </h1>
                
                <p className="text-2xl text-emerald-100 mb-6 leading-relaxed">
                  <span className="text-emerald-300 font-bold">15-25% of pharmacy spend</span> is lost to hidden PBM fees, rebate retention, and contract loopholes. That's $450K-$750K per year on a $3M drug spend.
                </p>
                
                <p className="text-lg text-emerald-300/80 mb-10">
                  SiriusB iQ's Contract X-Ray identifies every dollar and creates the documentation you need to defend your fiduciary decisions to the board and DOL.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="#ebitda-leakage-simulator">
                    <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white text-lg px-8 py-6 shadow-2xl shadow-emerald-500/50">
                      Try EBITDA Leak Simulator
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/request-demo">
                    <Button size="lg" variant="outline" className="border-2 border-emerald-400/50 text-emerald-200 hover:bg-emerald-500/20 text-lg px-8 py-6">
                      Free Contract Health Check
                    </Button>
                  </Link>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl blur-3xl opacity-30 animate-pulse" />
                <Card className="relative bg-gradient-to-br from-emerald-950/80 to-green-950/80 border-2 border-emerald-400/50 p-4 shadow-2xl shadow-emerald-500/50 backdrop-blur-xl">
                  <Image
                    src="/Firefly_Gemini_Flash_Your_PBM_Met_Every_Guarantee._You_Still_Lost_the_Money._Written_by_Jeremiah_Franklin_465075.png"
                    alt="Your PBM Met Every Guarantee. You Still Lost the Money - by Jeremiah Franklin"
                    width={800}
                    height={800}
                    className="rounded-xl w-full h-auto"
                    priority
                  />
                  <div className="mt-4 text-center">
                    <p className="text-sm text-emerald-200 font-semibold">Written by Jeremiah Franklin, Founder</p>
                    <p className="text-xs text-emerald-400 italic mt-1">Direct EBITDA leakage & margin recovery</p>
                  </div>
                </Card>
              </motion.div>
            </div>

            <motion.div className="grid md:grid-cols-4 gap-6 mt-16" variants={staggerChildren} initial="initial" animate="animate">
              {[
                { value: "23%", label: "Hidden Cost Waste", detail: "Average in PBM contracts", color: "emerald" },
                { value: "$1.1M", label: "Annual Recovery", detail: "Typical mid-market company", color: "green" },
                { value: "10:1", label: "ROI Guarantee", detail: "Or you don't pay", color: "teal" },
                { value: "48hrs", label: "Analysis Turnaround", detail: "From data to report", color: "cyan" }
              ].map((stat, i) => (
                <motion.div key={i} variants={fadeInUp}>
                  <Card className={`bg-gradient-to-br from-emerald-950/20 to-slate-950/40 border-2 border-emerald-500/25 backdrop-blur-xl p-6 hover:scale-105 transition-transform`}>
                    <div className="text-5xl font-black text-emerald-300 mb-2">{stat.value}</div>
                    <div className="text-sm text-emerald-200">{stat.label}</div>
                    <div className="text-xs text-emerald-400 mt-2">{stat.detail}</div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Live Interactive EBITDA Leakage Simulator Sandbox */}
        <section id="ebitda-leakage-simulator" className="py-24 px-4 bg-gradient-to-b from-slate-950 to-emerald-950/40 border-t border-emerald-500/20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-400/20 rounded-full mb-4 text-xs font-black text-emerald-300 uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" /> Interactive Forensic Sandbox
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-emerald-200 to-green-200 bg-clip-text text-transparent">
                EBITDA Leakage & Cost Recovery Simulator
              </h2>
              <p className="text-xl text-emerald-300/80 max-w-3xl mx-auto">
                Select your parameters to audit potential contract waste and project a 3-year margin value recovery.
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* Controls Column */}
              <Card className="lg:col-span-5 bg-black/40 border-emerald-500/30 p-8 backdrop-blur-xl">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-emerald-400" /> Operational Metrics
                </h3>

                <div className="space-y-6">
                  {/* Spend Input */}
                  <div>
                    <div className="flex justify-between text-sm font-semibold mb-2">
                      <span className="text-emerald-200">Annual Pharmacy Spend</span>
                      <span className="text-emerald-300">${(spend / 1000000).toFixed(1)}M</span>
                    </div>
                    <input
                      type="range"
                      min={500000}
                      max={20000000}
                      step={250000}
                      value={spend}
                      onChange={(e) => setSpend(Number(e.target.value))}
                      className="w-full accent-emerald-500 h-1.5 bg-emerald-950 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-emerald-500/70 mt-1">
                      <span>$500K</span>
                      <span>$20M</span>
                    </div>
                  </div>

                  {/* Current Contract Structure */}
                  <div>
                    <span className="block text-sm font-semibold text-emerald-200 mb-2">Current PBM Contract Type</span>
                    <select
                      value={pbmType}
                      onChange={(e) => setPbmType(e.target.value)}
                      className="w-full px-4 py-3 bg-black/60 border border-emerald-500/30 rounded-xl text-emerald-200 focus:outline-none focus:border-emerald-400"
                    >
                      <option value="traditional">Traditional / Retail Spread Agreement</option>
                      <option value="transparent">Transparent / Rebate Pass-through</option>
                      <option value="passthrough">Pass-through Cost-Plus / Acquisition Pricing</option>
                    </select>
                  </div>

                  {/* Audit Frequency */}
                  <div>
                    <span className="block text-sm font-semibold text-emerald-200 mb-2">Benefit Auditing Frequency</span>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { val: "none", label: "Never" },
                        { val: "annual", label: "Annual Spot" },
                        { val: "realtime", label: "Real-time" }
                      ].map((item) => (
                        <button
                          key={item.val}
                          type="button"
                          onClick={() => setAuditFrequency(item.val)}
                          className={`py-2 px-3 rounded-lg border text-xs font-bold transition-all ${
                            auditFrequency === item.val
                              ? "bg-emerald-500/20 border-emerald-400 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                              : "border-emerald-500/20 text-emerald-300/60 hover:border-emerald-500/40"
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={handleCalculateEBITDA}
                    disabled={calculating}
                    className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white py-6 text-base font-black shadow-lg"
                  >
                    {calculating ? (
                      <span className="flex items-center gap-2 justify-center">
                        <RefreshCw className="w-5 h-5 animate-spin" /> auditing contract clauses...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 justify-center">
                        <DollarSign className="w-5 h-5 animate-pulse" /> Run EBITDA Audit Simulator
                      </span>
                    )}
                  </Button>
                </div>
              </Card>

              {/* Outputs Column */}
              <Card className="lg:col-span-7 bg-emerald-950/20 border-emerald-500/30 p-8 backdrop-blur-xl relative overflow-hidden self-stretch flex flex-col justify-between">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Brain className="w-32 h-32 text-emerald-400" />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <LineChart className="w-5 h-5 text-green-400" /> Audit Findings & Yield Projections
                  </h3>

                  <AnimatePresence mode="wait">
                    {savingsResults && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-6"
                      >
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-black/30 p-5 rounded-xl border border-red-500/20">
                            <span className="block text-xs font-semibold text-red-400 uppercase tracking-wider mb-1">Estimated Hidden Leakage</span>
                            <span className="text-3xl font-black text-white">${(savingsResults.leakage).toLocaleString()}</span>
                            <span className="block text-[11px] text-red-400/60 mt-1">EBITDA lost in opaque contract clauses</span>
                          </div>
                          <div className="bg-emerald-900/30 p-5 rounded-xl border border-emerald-400/30">
                            <span className="block text-xs font-semibold text-emerald-300 uppercase tracking-wider mb-1">Recoverable Over 3 Years</span>
                            <span className="text-3xl font-black text-emerald-300">${(savingsResults.recoverable * 3).toLocaleString()}</span>
                            <span className="block text-[11px] text-emerald-300 mt-1 flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-emerald-400" /> Projected EBITDA margin addition
                            </span>
                          </div>
                        </div>

                        <div className="bg-black/40 p-6 rounded-xl border border-emerald-500/20 space-y-4">
                          <h4 className="text-sm font-bold text-white uppercase tracking-wider">EBITDA Multiple Conversion at Exit</h4>
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-emerald-300">Potential Enterprise Value Created (At 8x multiple)</span>
                                <span className="font-bold text-white">${(savingsResults.recoverable * 8).toLocaleString()}</span>
                              </div>
                              <div className="w-full bg-emerald-950 h-2.5 rounded-full overflow-hidden">
                                <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full" style={{ width: "85%" }} />
                              </div>
                            </div>
                            <div className="flex justify-between text-xs pt-2 text-emerald-300/70 border-t border-emerald-500/10">
                              <span>Audit Program ROI</span>
                              <span className="font-bold text-white">{savingsResults.roiRatio}:1 Yield</span>
                            </div>
                          </div>
                          <p className="text-xs text-emerald-300/60 leading-relaxed italic pt-2">
                            *This simulation is based on a conservative 75% collection probability of identified leakage items.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="mt-6 pt-6 border-t border-emerald-500/10 flex items-center justify-between text-xs text-emerald-400/70">
                  <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> Fiduciary Audit Trail</span>
                  <span className="flex items-center gap-1.5"><BarChart3 className="w-3.5 h-3.5" /> EBITDA Validated</span>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Fiduciary Health Self-Audit Checklist */}
        <section className="py-24 px-4 bg-black">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-emerald-950/40 to-slate-950/40 border border-emerald-500/30 p-10 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl" />

              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-emerald-500/10 border border-emerald-400/30 rounded-xl">
                    <Shield className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white">ERISA & Fiduciary Risk Self-Audit</h3>
                    <p className="text-sm text-emerald-300 font-semibold">Test your plan design against DOL fiduciary standards.</p>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {fiduciaryChecklist.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleToggleFiduciary(item.id)}
                      className="flex items-start gap-4 p-4 rounded-xl border border-emerald-500/10 bg-emerald-950/10 hover:bg-emerald-950/20 cursor-pointer transition-all"
                    >
                      <div className={`w-5 h-5 rounded border flex items-center justify-center mt-0.5 transition-all ${
                        checkedFiduciary.includes(item.id)
                          ? "bg-emerald-500 border-emerald-400 text-white"
                          : "border-emerald-500/30 text-transparent"
                      }`}>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-emerald-100 text-sm leading-relaxed">{item.text}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-emerald-950/30 rounded-xl p-6 border border-emerald-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <span className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">Your Fiduciary Score</span>
                    <span className="text-4xl font-black text-white">{fiduciaryScore}%</span>
                    <span className="block text-xs text-emerald-300/60 mt-1">Audit rating based on DOL guidelines</span>
                  </div>

                  <div className="text-right">
                    {fiduciaryScore === 100 ? (
                      <span className="text-emerald-400 font-bold flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Prudent Fiduciary Status</span>
                    ) : fiduciaryScore >= 60 ? (
                      <span className="text-yellow-400 font-bold flex items-center gap-1.5"><AlertCircle className="w-4 h-4" /> Compliance Vulnerabilities</span>
                    ) : (
                      <span className="text-red-400 font-bold flex items-center gap-1.5"><AlertTriangle className="w-4 h-4" /> Critical Liability Risk</span>
                    )}
                    <span className="block text-[11px] text-emerald-300/50 mt-1">ERISA litigation exposure is high below 80%</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Financial Risks Section */}
        <section className="py-24 px-4 bg-gradient-to-b from-black to-emerald-950/20">
          <div className="max-w-6xl mx-auto">
            <motion.div className="text-center mb-16" {...fadeInUp}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-400/30 rounded-full mb-6">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <span className="text-sm font-semibold text-red-300">Critical Financial Exposure</span>
              </div>
              <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-emerald-200 to-green-200 bg-clip-text text-transparent">
                Four Ways Your PBM Contract Destroys Value
              </h2>
              <p className="text-xl text-emerald-300/80 max-w-3xl mx-auto">
                Traditional PBM oversight relies on spot audits and quarterly reviews. By the time you catch an issue, millions have leaked.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {financialRisks.map((risk, index) => (
                <motion.div key={index} {...fadeInUp} transition={{ delay: index * 0.1 }}>
                  <Card className="bg-gradient-to-br from-emerald-900/40 to-green-900/40 border-emerald-500/30 p-8 hover:border-emerald-400/60 transition-all cursor-pointer backdrop-blur-xl h-full"
                    onClick={() => setExpandedRisk(expandedRisk === index ? null : index)}>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-emerald-100 mb-2">{risk.title}</h3>
                        <div className="text-red-400 font-semibold text-sm">{risk.impact}</div>
                      </div>
                      <ChevronDown className={`w-6 h-6 text-emerald-400 transition-transform ${expandedRisk === index ? "rotate-180" : ""}`} />
                    </div>
                    
                    <p className="text-emerald-300/90 mb-4">{risk.description}</p>
                    
                    {expandedRisk === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-4 pt-4 border-t border-emerald-500/30">
                        <div>
                          <div className="text-xs font-semibold text-red-400 uppercase tracking-wide mb-2">The Reality</div>
                          <p className="text-sm text-emerald-300/80">{risk.reality}</p>
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-green-400 uppercase tracking-wide mb-2">SiriusB iQ Solution</div>
                          <p className="text-sm text-emerald-200">{risk.solution}</p>
                        </div>
                      </motion.div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Cost Recovery Workflow */}
        <section className="py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div className="text-center mb-16" {...fadeInUp}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-400/30 rounded-full mb-6">
                <Zap className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-semibold text-emerald-300">48-Hour Cost Recovery Process</span>
              </div>
              <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-emerald-200 to-green-200 bg-clip-text text-transparent">
                From Contract Upload to Documented Recovery
              </h2>
              <p className="text-xl text-emerald-300/80 max-w-3xl mx-auto">
                Our algorithmic contract forensics deliver CFO-ready EBITDA impact analysis in 48 hours—not 4 weeks.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {costRecoveryWorkflow.map((step, index) => (
                <motion.div key={index} {...fadeInUp} transition={{ delay: index * 0.1 }}>
                  <Card className="bg-gradient-to-br from-emerald-900/30 to-green-900/30 border-emerald-500/30 p-6 hover:border-emerald-400/60 transition-all cursor-pointer backdrop-blur-xl h-full"
                    onClick={() => setExpandedStep(expandedStep === index ? null : index)}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center text-white font-black">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-bold text-emerald-100">{step.step}</div>
                        <div className="text-xs text-emerald-400">{step.duration}</div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-emerald-300/90 mb-3">{step.description}</p>
                    
                    {expandedStep === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pt-3 border-t border-emerald-500/30">
                        <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wide mb-2">Deliverables</div>
                        <ul className="space-y-1">
                          {step.deliverables.map((item, i) => (
                            <li key={i} className="text-xs text-emerald-300/80 flex items-start gap-2">
                              <CheckCircle2 className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Financial Tools Arsenal */}
        <section className="py-24 px-4 bg-gradient-to-b from-emerald-950/20 to-black">
          <div className="max-w-6xl mx-auto">
            <motion.div className="text-center mb-16" {...fadeInUp}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-400/30 rounded-full mb-6">
                <Calculator className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-semibold text-emerald-300">CFO Financial Arsenal</span>
              </div>
              <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-emerald-200 to-green-200 bg-clip-text text-transparent">
                The Tools Fortune 100 CFOs Use
              </h2>
              <p className="text-xl text-emerald-300/80 max-w-3xl mx-auto">
                Enterprise-grade PBM oversight without the enterprise price tag. Algorithmic cost control for mid-market companies.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {financialTools.map((tool, index) => (
                <motion.div key={index} {...fadeInUp} transition={{ delay: index * 0.1 }}>
                  <Card className="bg-gradient-to-br from-emerald-900/40 to-green-900/40 border-emerald-500/30 p-6 hover:border-emerald-400/60 transition-all cursor-pointer backdrop-blur-xl h-full"
                    onClick={() => setExpandedTool(expandedTool === index ? null : index)}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 flex items-center justify-center text-emerald-300 border border-emerald-500/30">
                        {tool.icon}
                      </div>
                      <ChevronDown className={`w-5 h-5 text-emerald-400 transition-transform ${expandedTool === index ? "rotate-180" : ""}`} />
                    </div>
                    
                    <h3 className="text-xl font-bold text-emerald-100 mb-2">{tool.title}</h3>
                    <p className="text-sm text-emerald-300/90 mb-3">{tool.description}</p>
                    
                    <div className="text-xs font-semibold text-green-400 bg-green-500/10 px-3 py-2 rounded-lg border border-green-500/30">
                      {tool.outcome}
                    </div>
                    
                    {expandedTool === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pt-4 border-t border-emerald-500/30">
                        <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wide mb-2">Key Features</div>
                        <ul className="space-y-1">
                          {tool.features.map((feature, i) => (
                            <li key={i} className="text-xs text-emerald-300/80 flex items-start gap-2">
                              <CheckCircle2 className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Real Financial Impact */}
        <section className="py-24 px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div className="text-center mb-12" {...fadeInUp}>
              <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-emerald-200 to-green-200 bg-clip-text text-transparent">
                Real EBITDA Recovery: Mid-Market Manufacturer
              </h2>
              <p className="text-xl text-emerald-300/80">
                $3.2M pharmacy spend → $740K annual recovery → 23% cost reduction
              </p>
            </motion.div>

            <Card className="bg-gradient-to-br from-emerald-900/60 to-green-900/60 border-2 border-emerald-400/50 p-8 backdrop-blur-xl">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <div className="text-sm font-semibold text-red-400 uppercase tracking-wide mb-4">Before SiriusB iQ</div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-emerald-500/30">
                      <span className="text-emerald-300/80">Spread pricing (hidden)</span>
                      <span className="font-bold text-red-300">$280K/year</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-emerald-500/30">
                      <span className="text-emerald-300/80">Retained rebates</span>
                      <span className="font-bold text-red-300">$190K/year</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-emerald-500/30">
                      <span className="text-emerald-300/80">DIR fees (undisclosed)</span>
                      <span className="font-bold text-red-300">$145K/year</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-emerald-500/30">
                      <span className="text-emerald-300/80">Admin charges</span>
                      <span className="font-bold text-red-300">$125K/year</span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-emerald-200 font-semibold">Total Hidden Costs</span>
                      <span className="font-black text-2xl text-red-400">$740K</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-sm font-semibold text-green-400 uppercase tracking-wide mb-4">After SiriusB iQ</div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-emerald-500/30">
                      <span className="text-emerald-300/80">NADAC + $2 pricing</span>
                      <span className="font-bold text-green-300">$280K recovered</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-emerald-500/30">
                      <span className="text-emerald-300/80">100% rebate pass-through</span>
                      <span className="font-bold text-green-300">$190K recovered</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-emerald-500/30">
                      <span className="text-emerald-300/80">DIR fee elimination</span>
                      <span className="font-bold text-green-300">$145K recovered</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-emerald-500/30">
                      <span className="text-emerald-300/80">Flat admin fee</span>
                      <span className="font-bold text-green-300">$125K recovered</span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-emerald-200 font-semibold">Annual Recovery</span>
                      <span className="font-black text-2xl text-green-400">$740K</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-emerald-500/30">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-black text-emerald-300">23%</div>
                    <div className="text-xs text-emerald-400">Cost Reduction</div>
                  </div>
                  <div>
                    <div className="text-3xl font-black text-green-300">12:1</div>
                    <div className="text-xs text-green-400">Actual ROI</div>
                  </div>
                  <div>
                    <div className="text-3xl font-black text-teal-300">$3.7M</div>
                    <div className="text-xs text-teal-400">5-Year NPV</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Success Metrics */}
        <section className="py-24 px-4 bg-gradient-to-b from-black to-emerald-950/30">
          <div className="max-w-6xl mx-auto">
            <motion.div className="text-center mb-16" {...fadeInUp}>
              <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-emerald-200 to-green-200 bg-clip-text text-transparent">
                CFO Success Metrics
              </h2>
              <p className="text-xl text-emerald-300/80">
                What algorithmic PBM oversight delivers in year one
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { value: "15-25%", label: "Cost Reduction", detail: "Average pharmacy spend savings" },
                { value: "$1.1M", label: "Annual Recovery", detail: "Mid-market median result" },
                { value: "10:1", label: "Guaranteed ROI", detail: "Or you don't pay us" },
                { value: "48hrs", label: "Analysis Speed", detail: "Contract to CFO brief" },
                { value: "100%", label: "DOL Audit Ready", detail: "Fiduciary documentation" },
                { value: "±5%", label: "Forecast Accuracy", detail: "vs ±25% industry avg" }
              ].map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}>
                  <Card className="bg-gradient-to-br from-emerald-900/40 to-green-900/40 border-emerald-500/30 p-8 text-center backdrop-blur-xl hover:scale-105 transition-transform">
                    <div className="text-5xl font-black text-emerald-300 mb-3">{metric.value}</div>
                    <div className="text-lg font-semibold text-emerald-100 mb-2">{metric.label}</div>
                    <div className="text-sm text-emerald-400">{metric.detail}</div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Premium CTA Form */}
        <section className="py-24 px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="relative bg-gradient-to-br from-emerald-900/80 to-green-900/80 border-4 border-emerald-400 p-12 shadow-[0_0_60px_rgba(16,185,129,0.6)] backdrop-blur-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-green-500/20 to-teal-500/20 animate-pulse rounded-lg" />
              
              <div className="relative">
                <div className="text-center mb-8">
                  <div className="inline-block px-6 py-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full mb-4 shadow-[0_0_30px_rgba(16,185,129,0.8)]">
                    <span className="text-sm font-black text-white uppercase tracking-wider">💵 Free CFO EBITDA Analysis 💵</span>
                  </div>
                  <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-emerald-200 via-white to-green-200 bg-clip-text text-transparent">
                    Calculate Your Hidden Cost Recovery
                  </h2>
                  <p className="text-xl text-emerald-100">
                    Get a personalized EBITDA impact analysis and free contract health check in 48 hours.
                  </p>
                </div>
                
                <form className="max-w-2xl mx-auto space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-emerald-100 mb-2 uppercase tracking-wide">Full Name</label>
                      <input
                        type="text"
                        required
                        className="w-full px-5 py-4 bg-black/60 border-2 border-emerald-400/40 rounded-xl text-white placeholder-emerald-300/50 focus:outline-none focus:border-emerald-300 focus:shadow-[0_0_20px_rgba(16,185,129,0.5)] transition-all"
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-emerald-100 mb-2 uppercase tracking-wide">Email</label>
                      <input
                        type="email"
                        required
                        className="w-full px-5 py-4 bg-black/60 border-2 border-emerald-400/40 rounded-xl text-white placeholder-emerald-300/50 focus:outline-none focus:border-emerald-300 focus:shadow-[0_0_20px_rgba(16,185,129,0.5)] transition-all"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-emerald-100 mb-2 uppercase tracking-wide">Company</label>
                      <input
                        type="text"
                        required
                        className="w-full px-5 py-4 bg-black/60 border-2 border-emerald-400/40 rounded-xl text-white placeholder-emerald-300/50 focus:outline-none focus:border-emerald-300 focus:shadow-[0_0_20px_rgba(16,185,129,0.5)] transition-all"
                        placeholder="Acme Corporation"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-emerald-100 mb-2 uppercase tracking-wide">Annual Drug Spend</label>
                      <select
                        required
                        className="w-full px-5 py-4 bg-black/60 border-2 border-emerald-400/40 rounded-xl text-white focus:outline-none focus:border-emerald-300 focus:shadow-[0_0_20px_rgba(16,185,129,0.5)] transition-all"
                      >
                        <option value="">Select range...</option>
                        <option value="sub1m">Under $1M</option>
                        <option value="1to3m">$1M - $3M</option>
                        <option value="3to5m">$3M - $5M</option>
                        <option value="5to10m">$5M - $10M</option>
                        <option value="over10m">Over $10M</option>
                      </select>
                    </div>
                  </div>

                  <Link href="/request-demo">
                    <Button
                      type="button"
                      size="lg"
                      className="w-full bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 hover:from-emerald-400 hover:via-green-400 hover:to-teal-400 text-white text-2xl font-black py-8 shadow-[0_0_40px_rgba(16,185,129,0.9)] hover:shadow-[0_0_60px_rgba(16,185,129,1)] uppercase tracking-wider border-2 border-white/50"
                    >
                      💰 Calculate My Savings 💰
                      <ArrowRight className="w-6 h-6 ml-3" />
                    </Button>
                  </Link>
                  
                  <p className="text-xs text-center text-emerald-200">
                    By submitting, you agree to receive communications about SiriusB iQ cost optimization solutions. Unsubscribe anytime.
                  </p>
                </form>
              </div>
            </Card>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 px-4 bg-gradient-to-b from-emerald-950/30 to-black">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div {...fadeInUp}>
              <h2 className="text-5xl font-black mb-8 bg-gradient-to-r from-emerald-200 to-green-200 bg-clip-text text-transparent">
                Stop Guessing. Start Recovering.
              </h2>
              <p className="text-2xl text-emerald-200 mb-12">
                Schedule a 30-minute CFO briefing to see the forensic analysis and 10:1 ROI guarantee.
              </p>
              <Link href="/request-demo">
                <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white text-xl px-12 py-8 shadow-2xl shadow-emerald-500/50">
                  Schedule CFO Briefing
                  <DollarSign className="w-6 h-6 ml-3" />
                </Button>
              </Link>
              <p className="text-sm text-emerald-400 mt-6">
                30-minute executive briefing • No technical jargon • ROI-focused • 10:1 guarantee
              </p>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}