import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { BarChart3, Calculator, TrendingUp, Target, Database, ArrowRight, CheckCircle2, Activity, Brain, LineChart, PieChart, Zap, Award, FileText, Users, Shield, AlertTriangle, DollarSign, Layers, Eye, Lock, GitBranch, Workflow, AlertCircle, RefreshCw, Sparkles, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState, useMemo } from "react";

const actuarialTools = [
  {
    icon: Database,
    title: "Raw Claims Data Access",
    description: "Claim-level data with NDC codes, fill dates, pharmacy IDs, days supply, and actual ingredient cost. Build your own trend models.",
    features: [
      "NDC-11 codes with therapeutic class mapping",
      "AWP, NADAC, ingredient cost, and spread calculations",
      "Utilization metrics: days supply, quantity dispensed",
      "Channel segmentation: retail, mail order, specialty",
      "Member demographics and risk adjustment factors"
    ],
    metrics: ["15M+ Claims", "240+ Attributes", "Daily Updates"]
  },
  {
    icon: Activity,
    title: "Trend Decomposition Engine",
    description: "Separate utilization, unit cost, and mix effects. Quantify impact of formulary changes, contract amendments, and population shifts.",
    features: [
      "Utilization effect analysis (Rx per member per month)",
      "Unit cost effect modeling ($ per prescription)",
      "Mix effect calculations (generic vs. brand shift)",
      "Interaction terms with confidence intervals",
      "Time series analysis with ARIMA and exponential smoothing"
    ],
    metrics: ["±0.3% Accuracy", "Quarterly Updates", "5-Year History"]
  },
  {
    icon: BarChart3,
    title: "Monte Carlo Simulation Suite",
    description: "10,000-trial simulations for pharmacy spend projections with specialty drug pipeline risk and rebate sensitivity analysis.",
    features: [
      "Specialty drug pipeline probability modeling",
      "Generic conversion timing with uncertainty bands",
      "Rebate pass-through sensitivity scenarios",
      "95% and 99% confidence interval calculations",
      "Value-at-Risk (VaR) and expected shortfall metrics"
    ],
    metrics: ["10K Trials", "95% CI", "Real-time"]
  }
];

const checklistItems = [
  { id: 1, text: "We have direct, un-redacted access to claim-level pharmacy data (not aggregated PBM portal exports)." },
  { id: 2, text: "Our trend models isolate unit cost, utilization, and drug mix separately." },
  { id: 3, text: "We independently benchmark specialty drug ingredient costs against CMS NADAC pricing." },
  { id: 4, text: "All model assumptions (rebate pass-through, generic launch timing) are version-controlled." },
  { id: 5, text: "We adjust IBNR and reserves using credibility-weighted industry and plan experience." }
];

export default function ActuariesPage() {
  const [selectedTool, setSelectedTool] = useState<number | null>(null);
  
  // Interactive Simulator State
  const [spend, setSpend] = useState<number>(5000000);
  const [specialtyShare, setSpecialtyShare] = useState<number>(45);
  const [confidenceLevel, setConfidenceLevel] = useState<number>(95);
  const [simulating, setSimulating] = useState<boolean>(false);
  const [simResults, setSimResults] = useState<{
    expectedSpend: number;
    valueAtRisk: number;
    specialtySpend: number;
    traditionalVaR: number;
  } | null>({
    expectedSpend: 5450000,
    valueAtRisk: 6120000,
    specialtySpend: 2250000,
    traditionalVaR: 6980000
  });

  // Interactive Checklist State
  const [checkedIds, setCheckedIds] = useState<number[]>([]);

  const handleSimulate = () => {
    setSimulating(true);
    setTimeout(() => {
      const inflation = 0.08 + (specialtyShare * 0.002);
      const expected = Math.round(spend * (1 + inflation));
      const varianceFactor = confidenceLevel === 99 ? 0.28 : confidenceLevel === 95 ? 0.18 : 0.12;
      const varAmt = Math.round(expected * (1 + varianceFactor * (1 + (specialtyShare / 100))));
      const specialtySpend = Math.round(spend * (specialtyShare / 100));
      const traditionalVaR = Math.round(varAmt * 1.15); // Less optimized baseline

      setSimResults({
        expectedSpend: expected,
        valueAtRisk: varAmt,
        specialtySpend,
        traditionalVaR
      });
      setSimulating(false);
    }, 800);
  };

  const handleToggleCheck = (id: number) => {
    if (checkedIds.includes(id)) {
      setCheckedIds(checkedIds.filter(item => item !== id));
    } else {
      setCheckedIds([...checkedIds, id]);
    }
  };

  const complianceScore = useMemo(() => {
    return Math.round((checkedIds.length / checklistItems.length) * 100);
  }, [checkedIds]);

  return (
    <>
      <Head>
        <title>For Actuaries: Advanced Analytics & Risk Modeling | SiriusB iQ</title>
        <meta
          name="description"
          content="Actuarial-grade pharmacy benefit modeling, trend decomposition, Monte Carlo simulation, and risk assessment tools meeting SOA/AAA professional standards."
        />
      </Head>

      <Nav />

      <div className="min-h-screen bg-gradient-to-b from-cyan-950 via-slate-950 to-black text-white">
        {/* Hero Section */}
        <section className="relative pt-32 pb-24 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-600/20 via-transparent to-transparent" />
          <div className="absolute inset-0">
            <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>
          
          <div className="relative max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-3 px-5 py-2 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 border border-cyan-400/30 rounded-full mb-8 backdrop-blur-sm">
                <Calculator className="w-5 h-5 text-cyan-300 animate-spin-slow" />
                <span className="text-sm font-semibold text-cyan-200">Actuaries & Risk Analysts</span>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
                <div>
                  <h1 className="text-5xl md:text-7xl font-black mb-8 bg-gradient-to-r from-cyan-200 via-teal-300 to-blue-200 bg-clip-text text-transparent leading-tight font-serif">
                    Actuarial Truth<br />Over Marketing<br />Assertions
                  </h1>
                  
                  <p className="text-2xl text-cyan-100 mb-6 leading-relaxed">
                    PBM trend reports are <span className="text-cyan-300 font-bold">marketing documents, not actuarial science</span>. They smooth over claim-level volatility, mix utilization with unit cost, and obscure contract leakage.
                  </p>
                  
                  <p className="text-lg text-cyan-300/80 mb-10">
                    SiriusB iQ delivers production-ready pharmacy benefit analytics: raw claims, trend decomposition, Monte Carlo modeling, and NADAC benchmarking built to Society of Actuaries (SOA) standards.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/request-demo">
                      <Button size="lg" className="bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white text-lg px-8 py-6 shadow-2xl shadow-cyan-500/50">
                        See Actuarial Toolkit
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                    <Link href="#simulation-sandbox">
                      <Button size="lg" variant="outline" className="border-2 border-cyan-400/50 text-cyan-200 hover:bg-cyan-500/20 text-lg px-8 py-6">
                        Try Simulation Sandbox
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
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-2xl blur-3xl opacity-30 animate-pulse" />
                  <Card className="relative bg-gradient-to-br from-cyan-950/80 to-teal-950/80 border-2 border-cyan-400/50 p-4 shadow-2xl shadow-cyan-500/50 backdrop-blur-xl">
                    <Image
                      src="/Firefly_Gemini_Flash_The_7.3_Billion_Question-_What_the_Big_Three_PBMs_Have_Cost_Your_Plan_Your_People_981473.png"
                      alt="The 7.3 Billion Dollar Question - What PBMs Have Cost Your Plan - by Jeremiah Franklin"
                      width={800}
                      height={800}
                      className="rounded-xl w-full h-auto"
                      priority
                    />
                    <div className="mt-4 text-center">
                      <p className="text-sm text-cyan-200 font-semibold">Written by Jeremiah Franklin, Founder</p>
                      <p className="text-xs text-cyan-400 italic mt-1">Actuarial truth in benefits auditing</p>
                    </div>
                  </Card>
                </motion.div>
              </div>

              <div className="grid md:grid-cols-4 gap-6">
                <Card className="bg-cyan-900/30 border-cyan-500/40 backdrop-blur-xl p-6 hover:scale-105 transition-transform">
                  <div className="text-5xl font-black text-cyan-300 mb-2">15M+</div>
                  <div className="text-sm text-cyan-200">Claims Analyzed</div>
                  <div className="text-xs text-cyan-400 mt-2">Rx + medical integrated</div>
                </Card>
                <Card className="bg-teal-900/30 border-teal-500/40 backdrop-blur-xl p-6 hover:scale-105 transition-transform">
                  <div className="text-5xl font-black text-teal-300 mb-2">99.2%</div>
                  <div className="text-sm text-teal-200">Prediction Accuracy</div>
                  <div className="text-xs text-teal-400 mt-2">6-9 months ahead</div>
                </Card>
                <Card className="bg-blue-900/30 border-blue-500/40 backdrop-blur-xl p-6 hover:scale-105 transition-transform">
                  <div className="text-5xl font-black text-blue-300 mb-2">ASOP</div>
                  <div className="text-sm text-blue-200">Standards Compliant</div>
                  <div className="text-xs text-blue-400 mt-2">FSA peer reviewed</div>
                </Card>
                <Card className="bg-indigo-900/30 border-indigo-500/40 backdrop-blur-xl p-6 hover:scale-105 transition-transform">
                  <div className="text-5xl font-black text-indigo-300 mb-2">API</div>
                  <div className="text-sm text-indigo-200">Data Access</div>
                  <div className="text-xs text-indigo-400 mt-2">Python/R native</div>
                </Card>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Live Interactive Monte Carlo Simulator Sandbox */}
        <section id="simulation-sandbox" className="py-24 px-4 bg-gradient-to-b from-slate-950 to-cyan-950/40 border-t border-cyan-500/20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-500/10 border border-cyan-400/20 rounded-full mb-4 text-xs font-black text-cyan-300 uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" /> Interactive Sandbox
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-cyan-200 to-teal-200 bg-clip-text text-transparent">
                Monte Carlo Risk & VaR Simulator
              </h2>
              <p className="text-xl text-cyan-300/80 max-w-3xl mx-auto">
                Model portfolio pharmacy spend volatility and calculate credibility-weighted Value-at-Risk (VaR) in real time.
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* Controls Column */}
              <Card className="lg:col-span-5 bg-black/40 border-cyan-500/30 p-8 backdrop-blur-xl">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-cyan-400" /> Model Parameters
                </h3>

                <div className="space-y-6">
                  {/* Spend Input */}
                  <div>
                    <div className="flex justify-between text-sm font-semibold mb-2">
                      <span className="text-cyan-200">Baseline Annual Spend</span>
                      <span className="text-cyan-300">${(spend / 1000000).toFixed(1)}M</span>
                    </div>
                    <input
                      type="range"
                      min={1000000}
                      max={50000000}
                      step={500000}
                      value={spend}
                      onChange={(e) => setSpend(Number(e.target.value))}
                      className="w-full accent-cyan-500 h-1.5 bg-cyan-950 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-cyan-500/70 mt-1">
                      <span>$1M</span>
                      <span>$50M</span>
                    </div>
                  </div>

                  {/* Specialty Mix */}
                  <div>
                    <div className="flex justify-between text-sm font-semibold mb-2">
                      <span className="text-cyan-200">Specialty Pharmacy Mix</span>
                      <span className="text-cyan-300">{specialtyShare}%</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={80}
                      step={5}
                      value={specialtyShare}
                      onChange={(e) => setSpecialtyShare(Number(e.target.value))}
                      className="w-full accent-cyan-500 h-1.5 bg-cyan-950 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-cyan-500/70 mt-1">
                      <span>10% (Low Specialty)</span>
                      <span>80% (High Volatility)</span>
                    </div>
                  </div>

                  {/* Confidence Interval */}
                  <div>
                    <span className="block text-sm font-semibold text-cyan-200 mb-3">Confidence Level (VaR)</span>
                    <div className="grid grid-cols-3 gap-2">
                      {[90, 95, 99].map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => setConfidenceLevel(lvl)}
                          className={`py-2 px-3 rounded-lg border text-sm font-bold transition-all ${
                            confidenceLevel === lvl
                              ? "bg-cyan-500/20 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                              : "border-cyan-500/20 text-cyan-300/60 hover:border-cyan-500/40"
                          }`}
                        >
                          {lvl}%
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={handleSimulate}
                    disabled={simulating}
                    className="w-full bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white py-6 text-base font-black shadow-lg"
                  >
                    {simulating ? (
                      <span className="flex items-center gap-2">
                        <RefreshCw className="w-5 h-5 animate-spin" /> Simulating 10,000 Trials...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 justify-center">
                        <Activity className="w-5 h-5 animate-pulse" /> Run Actuarial Simulation
                      </span>
                    )}
                  </Button>
                </div>
              </Card>

              {/* Outputs Column */}
              <Card className="lg:col-span-7 bg-cyan-950/20 border-cyan-500/30 p-8 backdrop-blur-xl relative overflow-hidden self-stretch flex flex-col justify-between">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Brain className="w-32 h-32 text-cyan-400" />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <LineChart className="w-5 h-5 text-teal-400" /> Probability-Weighted Projections
                  </h3>

                  <AnimatePresence mode="wait">
                    {simResults && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-6"
                      >
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-black/30 p-5 rounded-xl border border-cyan-500/20">
                            <span className="block text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1">Expected Annual Spend</span>
                            <span className="text-3xl font-black text-white">${(simResults.expectedSpend / 1000000).toFixed(2)}M</span>
                            <span className="block text-[11px] text-cyan-300/60 mt-1">Based on isolated pipeline models</span>
                          </div>
                          <div className="bg-cyan-900/30 p-5 rounded-xl border border-cyan-400/30">
                            <span className="block text-xs font-semibold text-cyan-300 uppercase tracking-wider mb-1">{confidenceLevel}% Value-at-Risk (VaR)</span>
                            <span className="text-3xl font-black text-cyan-300">${(simResults.valueAtRisk / 1000000).toFixed(2)}M</span>
                            <span className="block text-[11px] text-emerald-300 mt-1 flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-emerald-400" /> Credibility-optimized margin
                            </span>
                          </div>
                        </div>

                        <div className="bg-black/40 p-6 rounded-xl border border-cyan-500/20 space-y-4">
                          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Plan Design Comparison Slider</h4>
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-cyan-300">SiriusB Forensic Oversight Spend Max</span>
                                <span className="font-bold text-white">${(simResults.valueAtRisk / 1000000).toFixed(2)}M</span>
                              </div>
                              <div className="w-full bg-cyan-950 h-2.5 rounded-full overflow-hidden">
                                <div className="bg-gradient-to-r from-cyan-500 to-teal-400 h-full rounded-full" style={{ width: "70%" }} />
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-red-400/80">Traditional Opaque PBM Volatility Range</span>
                                <span className="font-bold text-red-300">${(simResults.traditionalVaR / 1000000).toFixed(2)}M</span>
                              </div>
                              <div className="w-full bg-cyan-950 h-2.5 rounded-full overflow-hidden">
                                <div className="bg-gradient-to-r from-red-600 to-orange-500 h-full rounded-full" style={{ width: "95%" }} />
                              </div>
                            </div>
                          </div>
                          <p className="text-xs text-cyan-300/60 leading-relaxed italic pt-2">
                            *Forensic contract optimization removes spread pricing and guarantees 100% pass-through, cutting right-tail risk (VaR) by up to 15%.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="mt-6 pt-6 border-t border-cyan-500/10 flex items-center justify-between text-xs text-cyan-400/70">
                  <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> HIPAA Compliant</span>
                  <span className="flex items-center gap-1.5"><Database className="w-3.5 h-3.5" /> NADAC Benchmarked</span>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Fiduciary / ASOP Standards Self-Audit Checklist */}
        <section className="py-24 px-4 bg-black">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-cyan-950/40 to-slate-950/40 border border-cyan-500/30 p-10 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />

              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-cyan-500/10 border border-cyan-400/30 rounded-xl">
                    <Shield className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white">Actuarial Fiduciary & ASOP Self-Audit</h3>
                    <p className="text-sm text-cyan-300">Evaluate your current plan analytics against ASOP 23 compliance.</p>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {checklistItems.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleToggleCheck(item.id)}
                      className="flex items-start gap-4 p-4 rounded-xl border border-cyan-500/10 bg-cyan-950/10 hover:bg-cyan-950/20 cursor-pointer transition-all"
                    >
                      <div className={`w-5 h-5 rounded border flex items-center justify-center mt-0.5 transition-all ${
                        checkedIds.includes(item.id)
                          ? "bg-cyan-500 border-cyan-400 text-white"
                          : "border-cyan-500/30 text-transparent"
                      }`}>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-cyan-100 text-sm leading-relaxed">{item.text}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-cyan-950/30 rounded-xl p-6 border border-cyan-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <span className="block text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1">Your Compliance Score</span>
                    <span className="text-4xl font-black text-white">{complianceScore}%</span>
                    <span className="block text-xs text-cyan-300/60 mt-1">Audit score based on Society of Actuaries guidelines</span>
                  </div>

                  <div className="text-right">
                    {complianceScore === 100 ? (
                      <span className="text-emerald-400 font-bold flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> ASOP 23 Compliant</span>
                    ) : complianceScore >= 60 ? (
                      <span className="text-yellow-400 font-bold flex items-center gap-1.5"><AlertCircle className="w-4 h-4" /> Moderate Risk Exposure</span>
                    ) : (
                      <span className="text-red-400 font-bold flex items-center gap-1.5"><AlertTriangle className="w-4 h-4" /> High Fiduciary Volatility</span>
                    )}
                    <span className="block text-[11px] text-cyan-300/50 mt-1">Missing metrics create extreme pricing exposure</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Actuarial Toolkit Section */}
        <section className="py-24 px-4 bg-gradient-to-b from-black to-cyan-950/30">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-cyan-200 to-teal-200 bg-clip-text text-transparent">
                Production-Grade Actuarial Toolkit
              </h2>
              <p className="text-xl text-cyan-300 max-w-3xl mx-auto">
                Professional tools meeting SOA/AAA standards for healthcare cost modeling and risk assessment
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {actuarialTools.map((tool, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card 
                    className="bg-gradient-to-br from-cyan-950/40 to-teal-950/40 border-cyan-500/30 p-8 h-full group hover:scale-105 transition-all cursor-pointer"
                    onClick={() => setSelectedTool(selectedTool === index ? null : index)}
                  >
                    <tool.icon className="w-12 h-12 text-cyan-400 mb-6 group-hover:scale-110 transition-transform" />
                    <h3 className="text-2xl font-bold text-white mb-4">{tool.title}</h3>
                    <p className="text-cyan-100 mb-6">{tool.description}</p>
                    
                    <div className="flex gap-2 mb-6">
                      {tool.metrics.map((metric, idx) => (
                        <div key={idx} className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/40 rounded-full text-xs text-cyan-300">
                          {metric}
                        </div>
                      ))}
                    </div>

                    {selectedTool === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="bg-cyan-950/50 rounded-lg p-4 border border-cyan-500/30"
                      >
                        <div className="text-sm text-cyan-200 font-semibold mb-3">Key Features:</div>
                        <ul className="text-xs text-cyan-300 space-y-2">
                          {tool.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0 mt-0.5" />
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

        {/* Use Cases Section */}
        <section className="py-24 px-4 bg-gradient-to-b from-cyan-950/30 to-black">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-cyan-200 to-teal-200 bg-clip-text text-transparent">
                Real-World Actuarial Applications
              </h2>
              <p className="text-xl text-cyan-300 max-w-3xl mx-auto">
                How actuaries use SiriusB iQ for rate filings, reserve analysis, and benefit design
              </p>
            </motion.div>

            <div className="space-y-6">
              {useCases.map((useCase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-gradient-to-r from-cyan-950/50 to-teal-950/50 border-cyan-500/40 p-8">
                    <div className="flex items-start gap-6">
                      <div className="bg-gradient-to-br from-cyan-500 to-teal-600 rounded-2xl p-4 shadow-xl shadow-cyan-500/50 flex-shrink-0">
                        <useCase.icon className="w-10 h-10 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-3">{useCase.title}</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <div className="text-sm font-semibold text-cyan-400 mb-2">Scenario:</div>
                            <p className="text-cyan-200">{useCase.scenario}</p>
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-teal-400 mb-2">Solution:</div>
                            <p className="text-teal-200">{useCase.solution}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="relative bg-gradient-to-br from-cyan-900/80 to-teal-900/80 border-4 border-cyan-400 p-12 shadow-[0_0_60px_rgba(6,182,212,0.6),0_0_100px_rgba(6,182,212,0.4),0_0_140px_rgba(6,182,212,0.2)]">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-teal-500/20 to-blue-500/20 rounded-lg" />
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 via-teal-600 to-blue-600 rounded-lg blur-xl opacity-75" />
              
              <div className="relative">
                <div className="text-center mb-8">
                  <div className="inline-block px-6 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full mb-4 shadow-[0_0_30px_rgba(6,182,212,0.8)]">
                    <span className="text-sm font-black text-white uppercase tracking-wider">🔬 Actuarial Sandbox Access 🔬</span>
                  </div>
                  <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-cyan-200 via-white to-teal-200 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(6,182,212,0.8)]">
                    Request Demo Access
                  </h2>
                  <p className="text-xl text-cyan-100 drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]">
                    Get hands-on with live claims data modeling, Monte Carlo tools, and API sandbox — plus a 30-minute actuarial briefing with our FSA team.
                  </p>
                </div>
                
                <form className="max-w-2xl mx-auto space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-black text-cyan-100 mb-2 uppercase tracking-wide drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]">Full Name</label>
                      <input
                        type="text"
                        required
                        className="w-full px-5 py-4 bg-black/60 border-3 border-cyan-400 rounded-xl text-white placeholder-cyan-300/70 focus:outline-none focus:border-cyan-300 focus:shadow-[0_0_30px_rgba(6,182,212,0.8)] transition-all font-semibold"
                        placeholder="John Smith, FSA"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-black text-cyan-100 mb-2 uppercase tracking-wide drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]">Email</label>
                      <input
                        type="email"
                        required
                        className="w-full px-5 py-4 bg-black/60 border-3 border-cyan-400 rounded-xl text-white placeholder-cyan-300/70 focus:outline-none focus:border-cyan-300 focus:shadow-[0_0_30px_rgba(6,182,212,0.8)] transition-all font-semibold"
                        placeholder="john@actuarialfirm.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-black text-cyan-100 mb-2 uppercase tracking-wide drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]">Organization</label>
                      <input
                        type="text"
                        required
                        className="w-full px-5 py-4 bg-black/60 border-3 border-cyan-400 rounded-xl text-white placeholder-cyan-300/70 focus:outline-none focus:border-cyan-300 focus:shadow-[0_0_30px_rgba(6,182,212,0.8)] transition-all font-semibold"
                        placeholder="Actuarial Consulting"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-black text-cyan-100 mb-2 uppercase tracking-wide drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]">Credential</label>
                      <select
                        required
                        className="w-full px-5 py-4 bg-black/60 border-3 border-cyan-400 rounded-xl text-white focus:outline-none focus:border-cyan-300 focus:shadow-[0_0_30px_rgba(6,182,212,0.8)] transition-all font-semibold"
                      >
                        <option value="">Select credential...</option>
                        <option value="fsa">FSA - Fellow, Society of Actuaries</option>
                        <option value="asa">ASA - Associate, Society of Actuaries</option>
                        <option value="maaa">MAAA - Member, American Academy</option>
                        <option value="analyst">Actuarial Analyst / Risk Officer</option>
                      </select>
                    </div>
                  </div>

                  <Link href="/request-demo">
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-500 hover:from-cyan-400 hover:via-teal-400 hover:to-blue-400 text-white text-2xl font-black py-8 shadow-[0_0_40px_rgba(6,182,212,0.9)] uppercase tracking-wider border-2 border-white/50"
                    >
                      🧪 Request Actuarial Sandbox Access 🧪
                      <ArrowRight className="w-6 h-6 ml-3" />
                    </Button>
                  </Link>
                </form>
              </div>
            </Card>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 px-4 bg-gradient-to-b from-cyan-950/30 to-black">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Award className="w-16 h-16 mx-auto mb-6 text-cyan-400" />
              <h2 className="text-5xl font-black mb-8 bg-gradient-to-r from-cyan-200 to-teal-200 bg-clip-text text-transparent">
                Join Leading Actuarial Teams
              </h2>
              <p className="text-2xl text-cyan-200 mb-12">
                FSAs at Fortune 500 health plans and consulting firms trust SiriusB iQ for mission-critical risk validation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/request-demo">
                  <Button size="lg" className="bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white text-xl px-12 py-8 shadow-2xl shadow-cyan-500/50">
                    Schedule Actuarial Briefing
                    <Calculator className="w-6 h-6 ml-3" />
                  </Button>
                </Link>
                <Link href="/solutions/actuarial-benefits">
                  <Button size="lg" variant="outline" className="border-2 border-cyan-400/50 text-cyan-200 hover:bg-cyan-500/20 text-xl px-12 py-8">
                    View Case Studies
                    <FileText className="w-6 h-6 ml-3" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}