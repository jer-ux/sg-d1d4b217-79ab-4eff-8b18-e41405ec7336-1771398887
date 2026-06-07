import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Building2, Rocket, DollarSign, Target, TrendingUp, Zap, ArrowRight, CheckCircle2, Shield, FileText, ChevronDown, RefreshCw, Sparkles, AlertTriangle, Play } from "lucide-react";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const portfolioChecklist = [
  { id: 1, text: "Our deal team reviews pharmacy spend line-items as standard diligence during pre-acquisition." },
  { id: 2, text: "We actively audit PBM contract margins (spread, rebate retention) across all portfolio companies." },
  { id: 3, text: "Portfolio companies have independent, daily monitoring on Rx claims to catch hidden price creeping." },
  { id: 4, text: "All contract guarantees (AWP discounts, rebate minimums) are validated by a third party, not the PBM itself." },
  { id: 5, text: "We require active co-pay assistance maximization programs to return savings directly to the employer plan." }
];

export default function PEOperatorsPage() {
  // Interactive EBITDA Calculator State
  const [revenue, setRevenue] = useState<number>(45); // in millions
  const [employees, setEmployees] = useState<number>(1200);
  const [multiple, setMultiple] = useState<number>(8.5);
  const [customContract, setCustomContract] = useState<boolean>(true);
  const [calculating, setCalculating] = useState<boolean>(false);
  const [calcResults, setCalcResults] = useState<{
    annualSavings: number;
    ebitdaIncrease: number;
    exitValueAdded: number;
  } | null>({
    annualSavings: 936000,
    ebitdaIncrease: 936000,
    exitValueAdded: 7956000
  });

  // Checklist state
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  const handleSimulateEBITDA = () => {
    setCalculating(true);
    setTimeout(() => {
      // baseline pharmaceutical waste is ~ $780 per employee per year
      const baselineWaste = 780;
      const optimizationFactor = customContract ? 0.38 : 0.15; // custom contract yields much higher savings

      const annualSavings = Math.round(employees * baselineWaste * optimizationFactor);
      const exitValueAdded = Math.round(annualSavings * multiple);

      setCalcResults({
        annualSavings,
        ebitdaIncrease: annualSavings,
        exitValueAdded
      });
      setCalculating(false);
    }, 800);
  };

  const handleToggleChecklist = (id: number) => {
    if (checkedItems.includes(id)) {
      setCheckedItems(checkedItems.filter(item => item !== id));
    } else {
      setCheckedItems([...checkedItems, id]);
    }
  };

  const auditScore = useMemo(() => {
    return Math.round((checkedItems.length / portfolioChecklist.length) * 100);
  }, [checkedItems]);

  return (
    <>
      <Head>
        <title>For PE Operators: Portfolio Company Value Creation | SiriusB iQ</title>
        <meta
          name="description"
          content="Healthcare cost optimization for portfolio companies. Turn benefits spend into EBITDA growth and exit value creation."
        />
      </Head>

      <Nav />

      <div className="min-h-screen bg-gradient-to-b from-violet-950 via-slate-950 to-black text-white">
        {/* Hero Section */}
        <section className="relative pt-32 pb-24 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-600/20 via-transparent to-transparent" />
          <div className="absolute inset-0">
            <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>
          
          <div className="relative max-w-7xl mx-auto">
            <div className="inline-flex items-center gap-3 px-5 py-2 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 border border-violet-400/30 rounded-full mb-8 backdrop-blur-sm">
              <Building2 className="w-5 h-5 text-violet-300" />
              <span className="text-sm font-semibold text-violet-200">PE Operating Partners</span>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
              <div>
                <h1 className="text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r from-violet-200 via-fuchsia-300 to-pink-200 bg-clip-text text-transparent leading-tight font-serif">
                  Value Creation<br />In 90 Days
                </h1>
                
                <p className="text-2xl text-violet-100 mb-6 leading-relaxed">
                  Healthcare benefits are <span className="text-violet-300 font-bold">the fastest EBITDA improvement lever</span> you're not pulling. Most portcos are bleeding $500K-$2M annually to PBM contract gaps.
                </p>
                
                <p className="text-lg text-violet-300/80 mb-10">
                  SiriusB iQ delivers forensic PBM contract analysis and claims optimization. Install the monitoring infrastructure in 30 days, realize savings in 90, and show documented value creation at exit.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/request-demo">
                    <Button size="lg" className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white text-lg px-8 py-6 shadow-2xl shadow-violet-500/50">
                      Schedule Operator Briefing
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <Link href="#value-simulator">
                    <Button size="lg" variant="outline" className="border-2 border-violet-400/50 text-violet-200 hover:bg-violet-500/20 text-lg px-8 py-6">
                      EBITDA Simulator
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
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-2xl blur-3xl opacity-30 animate-pulse" />
                <Card className="relative bg-gradient-to-br from-violet-950/80 to-fuchsia-950/80 border-2 border-violet-400/50 p-4 shadow-2xl shadow-violet-500/50 backdrop-blur-xl">
                  <Image
                    src="/Firefly_Gemini_Flash_Your_PBM_Met_Every_Guarantee._You_Still_Lost_the_Money._Written_by_Jeremiah_Franklin_465075.png"
                    alt="Your PBM Met Every Guarantee. You Still Lost the Money - by Jeremiah Franklin"
                    width={800}
                    height={800}
                    className="rounded-xl w-full h-auto"
                    priority
                  />
                  <div className="mt-4 text-center">
                    <p className="text-sm text-violet-200 font-semibold">Written by Jeremiah Franklin, Founder</p>
                    <p className="text-xs text-violet-400 italic mt-1">EBITDA recovery and portfolio cost control</p>
                  </div>
                </Card>
              </motion.div>
            </div>

            <div className="grid md:grid-cols-4 gap-6 mt-16">
              <Card className="bg-violet-900/30 border-violet-500/40 backdrop-blur-xl p-6 hover:scale-105 transition-transform">
                <div className="text-5xl font-black text-violet-300 mb-2">90</div>
                <div className="text-sm text-violet-200">Days to First Savings</div>
                <div className="text-xs text-violet-400 mt-2">From contract signature</div>
              </Card>
              <Card className="bg-fuchsia-900/30 border-fuchsia-500/40 backdrop-blur-xl p-6 hover:scale-105 transition-transform">
                <div className="text-5xl font-black text-fuchsia-300 mb-2">$1.8M</div>
                <div className="text-sm text-fuchsia-200">Average Annual Savings</div>
                <div className="text-xs text-fuchsia-400 mt-2">Per portfolio company</div>
              </Card>
              <Card className="bg-pink-900/30 border-pink-500/40 backdrop-blur-xl p-6 hover:scale-105 transition-transform">
                <div className="text-5xl font-black text-pink-300 mb-2">5-7x</div>
                <div className="text-sm text-pink-200">EBITDA Multiple Impact</div>
                <div className="text-xs text-pink-400 mt-2">On documented savings</div>
              </Card>
              <Card className="bg-purple-900/30 border-purple-500/40 backdrop-blur-xl p-6 hover:scale-105 transition-transform">
                <div className="text-5xl font-black text-purple-300 mb-2">100%</div>
                <div className="text-sm text-purple-200">Exit Documentation</div>
                <div className="text-xs text-purple-400 mt-2">Evidence receipts included</div>
              </Card>
            </div>
          </div>
        </section>

        {/* Live Interactive EBITDA & Multiple Expansion Simulator */}
        <section id="value-simulator" className="py-24 px-4 bg-gradient-to-b from-slate-950 to-violet-950/40 border-t border-violet-500/20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-violet-500/10 border border-violet-400/20 rounded-full mb-4 text-xs font-black text-violet-300 uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" /> Value Creation Simulator
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-violet-200 to-fuchsia-200 bg-clip-text text-transparent">
                EBITDA & Exit Multiple Expansion Calculator
              </h2>
              <p className="text-xl text-violet-300/80 max-w-3xl mx-auto">
                Select your target company profile and expected deal multiples to calculate pre-exit enterprise value additions.
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* Controls Column */}
              <Card className="lg:col-span-5 bg-black/40 border-violet-500/30 p-8 backdrop-blur-xl">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-violet-400" /> Portco Deal Profile
                </h3>

                <div className="space-y-6">
                  {/* Revenue */}
                  <div>
                    <div className="flex justify-between text-sm font-semibold mb-2">
                      <span className="text-violet-200">Annual Portco Revenue</span>
                      <span className="text-violet-300">${revenue}M</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={250}
                      step={5}
                      value={revenue}
                      onChange={(e) => setRevenue(Number(e.target.value))}
                      className="w-full accent-violet-500 h-1.5 bg-violet-950 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Employees */}
                  <div>
                    <div className="flex justify-between text-sm font-semibold mb-2">
                      <span className="text-violet-200">Enrolled Employee Lives</span>
                      <span className="text-violet-300">{employees.toLocaleString()} lives</span>
                    </div>
                    <input
                      type="range"
                      min={100}
                      max={5000}
                      step={50}
                      value={employees}
                      onChange={(e) => setEmployees(Number(e.target.value))}
                      className="w-full accent-violet-500 h-1.5 bg-violet-950 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Multiple */}
                  <div>
                    <div className="flex justify-between text-sm font-semibold mb-2">
                      <span className="text-violet-200">Expected Exit Multiple</span>
                      <span className="text-violet-300">{multiple}x EBITDA</span>
                    </div>
                    <input
                      type="range"
                      min={4}
                      max={20}
                      step={0.5}
                      value={multiple}
                      onChange={(e) => setMultiple(Number(e.target.value))}
                      className="w-full accent-violet-500 h-1.5 bg-violet-950 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Custom Contract Options */}
                  <div className="flex items-center justify-between p-4 bg-violet-950/20 rounded-xl border border-violet-500/20">
                    <div>
                      <span className="block text-sm font-semibold text-violet-200">Apply Custom PBM Contract</span>
                      <span className="text-xs text-violet-400">Force pass-through & NADAC benchmarking</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCustomContract(!customContract)}
                      className={`w-12 h-6 rounded-full transition-colors relative focus:outline-none ${
                        customContract ? "bg-violet-500" : "bg-violet-950"
                      }`}
                    >
                      <span className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                        customContract ? "left-7" : "left-1"
                      }`} />
                    </button>
                  </div>

                  <Button
                    onClick={handleSimulateEBITDA}
                    disabled={calculating}
                    className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white py-6 text-base font-black shadow-lg"
                  >
                    {calculating ? (
                      <span className="flex items-center gap-2 justify-center">
                        <RefreshCw className="w-5 h-5 animate-spin" /> auditing portco spend...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 justify-center">
                        <TrendingUp className="w-5 h-5 animate-pulse" /> Calculate Enterprise Value Added
                      </span>
                    )}
                  </Button>
                </div>
              </Card>

              {/* Outputs Column */}
              <Card className="lg:col-span-7 bg-violet-950/20 border-violet-500/30 p-8 backdrop-blur-xl relative overflow-hidden self-stretch flex flex-col justify-between">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Building2 className="w-32 h-32 text-violet-400" />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Target className="w-5 h-5 text-fuchsia-400" /> Projected EBITDA Improvement
                  </h3>

                  <AnimatePresence mode="wait">
                    {calcResults && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-6"
                      >
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="bg-black/30 p-4 rounded-xl border border-violet-500/20">
                            <span className="block text-xs font-semibold text-violet-400 uppercase tracking-wider mb-1">Annual Savings</span>
                            <span className="text-2xl font-black text-white">${calcResults.annualSavings.toLocaleString()}</span>
                            <span className="block text-[10px] text-violet-400/60 mt-1">100% margin optimization</span>
                          </div>
                          <div className="bg-fuchsia-950/40 p-4 rounded-xl border border-fuchsia-400/30">
                            <span className="block text-xs font-semibold text-fuchsia-300 uppercase tracking-wider mb-1">EBITDA Lift</span>
                            <span className="text-2xl font-black text-fuchsia-300">+${calcResults.ebitdaIncrease.toLocaleString()}</span>
                            <span className="block text-[10px] text-fuchsia-300/60 mt-1">Reflected instantly in financials</span>
                          </div>
                          <div className="bg-purple-950/40 p-4 rounded-xl border border-purple-400/30">
                            <span className="block text-xs font-semibold text-purple-300 uppercase tracking-wider mb-1">EV Expansion (multiple)</span>
                            <span className="text-2xl font-black text-purple-300">${calcResults.exitValueAdded.toLocaleString()}</span>
                            <span className="block text-[10px] text-purple-300/60 mt-1">Valuation addition at exit</span>
                          </div>
                        </div>

                        <div className="bg-black/40 p-6 rounded-xl border border-violet-500/20 space-y-4">
                          <h4 className="text-sm font-bold text-white uppercase tracking-wider">EBITDA Creation Progress</h4>
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-violet-300">Portco Savings Realization Probability</span>
                                <span className="font-bold text-white">95% (90-Day Execution)</span>
                              </div>
                              <div className="w-full bg-violet-950 h-2.5 rounded-full overflow-hidden">
                                <div className="bg-gradient-to-r from-violet-500 to-fuchsia-400 h-full rounded-full animate-pulse" style={{ width: "95%" }} />
                              </div>
                            </div>
                            <div className="flex justify-between text-xs pt-2 text-violet-300/70 border-t border-violet-500/10">
                              <span>Value Multiplier</span>
                              <span className="font-bold text-white">{multiple}x Multiple Applied</span>
                            </div>
                          </div>
                          <p className="text-xs text-violet-300/60 leading-relaxed italic pt-2">
                            *Exit value additions are calculated directly on annualized pharmacy optimization results. Standard PE portfolio benchmarks indicate an 18% cost-reduction average on self-funded portcos.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="mt-6 pt-6 border-t border-violet-500/10 flex items-center justify-between text-xs text-violet-400/70">
                  <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> Diligence-ready package</span>
                  <span className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" /> Audit documentation</span>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Portfolio ERISA & EBITDA Leakage Self-Audit Checklist */}
        <section className="py-24 px-4 bg-black">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-violet-950/40 to-slate-950/40 border border-violet-500/30 p-10 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/5 rounded-full blur-3xl" />

              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-violet-500/10 border border-violet-400/30 rounded-xl">
                    <Shield className="w-6 h-6 text-violet-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white">Portfolio EBITDA & Diligence Self-Audit</h3>
                    <p className="text-sm text-violet-300">Validate your pre-acquisition and operations-level cost containment policies.</p>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {portfolioChecklist.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleToggleChecklist(item.id)}
                      className="flex items-start gap-4 p-4 rounded-xl border border-violet-500/10 bg-violet-950/10 hover:bg-violet-950/20 cursor-pointer transition-all"
                    >
                      <div className={`w-5 h-5 rounded border flex items-center justify-center mt-0.5 transition-all ${
                        checkedItems.includes(item.id)
                          ? "bg-violet-500 border-violet-400 text-white"
                          : "border-violet-500/30 text-transparent"
                      }`}>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-violet-100 text-sm leading-relaxed">{item.text}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-violet-950/30 rounded-xl p-6 border border-violet-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <span className="block text-xs font-semibold text-violet-400 uppercase tracking-wider mb-1">Portfolio Compliance Score</span>
                    <span className="text-4xl font-black text-white">{auditScore}%</span>
                    <span className="block text-xs text-violet-300/60 mt-1">Audit rating based on PE operations best practices</span>
                  </div>

                  <div className="text-right">
                    {auditScore === 100 ? (
                      <span className="text-emerald-400 font-bold flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Optimally Defended</span>
                    ) : auditScore >= 60 ? (
                      <span className="text-yellow-400 font-bold flex items-center gap-1.5"><AlertTriangle className="w-4 h-4" /> Leakage Suspected</span>
                    ) : (
                      <span className="text-red-400 font-bold flex items-center gap-1.5"><AlertTriangle className="w-4 h-4" /> High Diligence Risks</span>
                    )}
                    <span className="block text-[11px] text-violet-300/50 mt-1">Diligence leaks average $1.4M annually on unoptimized portcos</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Value Creation Playbook Timeline */}
        <section className="py-24 px-4 bg-gradient-to-b from-black to-violet-950/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-black text-center mb-16 bg-gradient-to-r from-violet-200 to-fuchsia-200 bg-clip-text text-transparent">
              The Value Creation Playbook
            </h2>
            
            <div className="space-y-8">
              <Card className="bg-gradient-to-r from-violet-950/50 to-fuchsia-950/50 border-violet-500/40 p-8 hover:scale-[1.02] transition-all">
                <div className="flex items-start gap-6">
                  <div className="bg-gradient-to-br from-violet-500 to-fuchsia-600 rounded-2xl p-4 shadow-xl shadow-violet-500/50 flex-shrink-0">
                    <Target className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-sm font-black text-violet-400 bg-violet-500/20 px-3 py-1 rounded-full">DAY 1-30</div>
                      <h3 className="text-3xl font-bold text-white">Contract X-Ray & Baseline</h3>
                    </div>
                    <p className="text-violet-200 text-lg mb-4">
                      We audit the PBM contract (15 critical provisions) and analyze 12 months of claims data. Deliver a 40-page forensic report quantifying hidden costs, contract gaps, and recovery roadmap.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-black/30 rounded-lg p-4 border border-violet-500/20">
                        <div className="text-2xl font-bold text-violet-300 mb-1">$627K</div>
                        <div className="text-xs text-violet-400">Rebate Revenue Lost</div>
                      </div>
                      <div className="bg-black/30 rounded-lg p-4 border border-violet-500/20">
                        <div className="text-2xl font-bold text-violet-300 mb-1">$410K</div>
                        <div className="text-xs text-violet-400">DIR Fee Exposure</div>
                      </div>
                      <div className="bg-black/30 rounded-lg p-4 border border-violet-500/20">
                        <div className="text-2xl font-bold text-violet-300 mb-1">$380K</div>
                        <div className="text-xs text-violet-400">Pharmacy Routing</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-to-r from-fuchsia-950/50 to-pink-950/50 border-fuchsia-500/40 p-8 hover:scale-[1.02] transition-all">
                <div className="flex items-start gap-6">
                  <div className="bg-gradient-to-br from-fuchsia-500 to-pink-600 rounded-2xl p-4 shadow-xl shadow-fuchsia-500/50 flex-shrink-0">
                    <Rocket className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-sm font-black text-fuchsia-400 bg-fuchsia-500/20 px-3 py-1 rounded-full">DAY 31-90</div>
                      <h3 className="text-3xl font-bold text-white">Contract Amendment & Quick Wins</h3>
                    </div>
                    <p className="text-fuchsia-200 text-lg mb-4">
                      Armed with forensic evidence, we negotiate contract amendments with the PBM. Simultaneously deploy formulary optimization, specialty pharmacy routing, and claims review automation for immediate savings.
                    </p>
                    <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/30 rounded-lg p-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-emerald-400 font-semibold mb-2">Typical 90-Day Wins:</div>
                          <div className="space-y-2 text-sm text-emerald-200">
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                              <span>100% rebate pass-through clause added</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                              <span>Audit rights expanded (quarterly)</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                              <span>Specialty pharmacy savings: $240K/year</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="text-4xl font-black text-emerald-400 mb-2">$650K</div>
                          <div className="text-sm text-emerald-300">First-Year Realized Savings</div>
                          <div className="text-xs text-emerald-400 mt-2">From contract amendments alone</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-to-r from-pink-950/50 to-purple-950/50 border-pink-500/40 p-8 hover:scale-[1.02] transition-all">
                <div className="flex items-start gap-6">
                  <div className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl p-4 shadow-xl shadow-pink-500/50 flex-shrink-0">
                    <Zap className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-sm font-black text-pink-400 bg-pink-500/20 px-3 py-1 rounded-full">DAY 91+</div>
                      <h3 className="text-3xl font-bold text-white">Continuous Optimization & Exit Prep</h3>
                    </div>
                    <p className="text-pink-200 text-lg mb-4">
                      Install real-time monitoring infrastructure. Every contract action, formulary change, and vendor interaction generates an evidence receipt. Build the documented savings story for exit.
                    </p>
                    <div className="bg-gradient-to-r from-purple-500/10 to-violet-500/10 border border-purple-500/30 rounded-lg p-4">
                      <div className="text-sm text-purple-200 mb-3 font-semibold">Exit Documentation Package:</div>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div className="bg-black/30 rounded-lg p-3 border border-purple-500/20">
                          <div className="text-lg font-bold text-purple-300 mb-1">$2.1M</div>
                          <div className="text-xs text-purple-400">3-Year Documented Savings</div>
                        </div>
                        <div className="bg-black/30 rounded-lg p-3 border border-purple-500/20">
                          <div className="text-lg font-bold text-purple-300 mb-1">285</div>
                          <div className="text-xs text-purple-400">Evidence Receipts Filed</div>
                        </div>
                        <div className="bg-black/30 rounded-lg p-3 border border-purple-500/20">
                          <div className="text-lg font-bold text-purple-300 mb-1">18%</div>
                          <div className="text-xs text-purple-400">Healthcare Cost Reduction</div>
                        </div>
                        <div className="bg-black/30 rounded-lg p-3 border border-purple-500/20">
                          <div className="text-lg font-bold text-purple-300 mb-1">100%</div>
                          <div className="text-xs text-purple-400">Transferable to Buyer</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Portfolio Company Results Study */}
        <section className="py-24 px-4 bg-gradient-to-b from-slate-950 to-black">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-5xl font-black text-center mb-8 bg-gradient-to-r from-violet-200 to-fuchsia-200 bg-clip-text text-transparent">
              Real Portfolio Company Results
            </h2>
            <p className="text-center text-violet-300 text-lg mb-16">Mid-Market Manufacturing • 900 Employees • $4.2M Annual Drug Spend</p>

            <Card className="bg-gradient-to-r from-violet-950/50 to-fuchsia-950/50 border-violet-500/40 p-10">
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="bg-red-950/50 border border-red-500/30 rounded-xl p-6 mb-4">
                    <div className="text-4xl font-black text-red-400 mb-2">$4.2M</div>
                    <div className="text-sm text-red-200">Pre-X-Ray Spend</div>
                  </div>
                  <div className="text-xs text-red-400">Baseline (Year 1)</div>
                </div>
                <div className="text-center">
                  <div className="bg-orange-950/50 border border-orange-500/30 rounded-xl p-6 mb-4">
                    <div className="text-4xl font-black text-orange-400 mb-2">$3.6M</div>
                    <div className="text-sm text-orange-200">Post-Amendment</div>
                  </div>
                  <div className="text-xs text-orange-400">Year 2 (-14%)</div>
                </div>
                <div className="text-center">
                  <div className="bg-emerald-950/50 border border-emerald-500/30 rounded-xl p-6 mb-4">
                    <div className="text-4xl font-black text-emerald-400 mb-2">$3.3M</div>
                    <div className="text-sm text-emerald-200">Continuous Optimization</div>
                  </div>
                  <div className="text-xs text-emerald-400">Year 3 (-21%)</div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/30 rounded-xl p-6 mb-6">
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-black text-emerald-400 mb-1">$2.7M</div>
                    <div className="text-xs text-violet-300">3-Year Total Savings</div>
                  </div>
                  <div>
                    <div className="text-3xl font-black text-blue-400 mb-1">6.2x</div>
                    <div className="text-xs text-violet-300">EBITDA Multiple</div>
                  </div>
                  <div>
                    <div className="text-3xl font-black text-violet-400 mb-1">$16.7M</div>
                    <div className="text-xs text-violet-300">Enterprise Value Add</div>
                  </div>
                </div>
              </div>

              <div className="bg-black/30 rounded-lg p-5 border border-violet-500/20">
                <div className="text-sm text-violet-200 italic mb-3">
                  "We installed SiriusB iQ 6 months after close. By month 4, we had documented $650K in annual savings. At exit, the buyer paid a 6.2x multiple on that incremental EBITDA — $4M in enterprise value from healthcare alone."
                </div>
                <div className="text-xs text-violet-500">— Operating Partner, Anonymous PE Firm</div>
              </div>
            </Card>
          </div>
        </section>

        {/* Lead Capture Form */}
        <section className="py-24 px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="relative bg-gradient-to-br from-violet-900/80 to-fuchsia-900/80 border-4 border-violet-400 p-12 shadow-[0_0_60px_rgba(139,92,246,0.6),0_0_100px_rgba(139,92,246,0.4),0_0_140px_rgba(139,92,246,0.2)]">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 via-fuchsia-500/20 to-pink-500/20 rounded-lg" />
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 rounded-lg blur-xl opacity-75" />
              
              <div className="relative">
                <div className="text-center mb-8">
                  <div className="inline-block px-6 py-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full mb-4 shadow-[0_0_30px_rgba(139,92,246,0.8)]">
                    <span className="text-sm font-black text-white uppercase tracking-wider">🚀 Value Creation Playbook 🚀</span>
                  </div>
                  <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-violet-200 via-white to-fuchsia-200 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(139,92,246,0.8)]">
                    Get the Value Creation Playbook
                  </h2>
                  <p className="text-xl text-violet-100 drop-shadow-[0_0_15px_rgba(139,92,246,0.6)]">
                    90-day deployment roadmap, exit documentation templates, and portfolio monitoring dashboard guide.
                  </p>
                </div>
                
                <form className="max-w-2xl mx-auto space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-black text-violet-100 mb-2 uppercase tracking-wide drop-shadow-[0_0_10px_rgba(139,92,246,0.8)]">Full Name</label>
                      <input
                        type="text"
                        required
                        className="w-full px-5 py-4 bg-black/60 border-3 border-violet-400 rounded-xl text-white placeholder-violet-300/70 focus:outline-none focus:border-violet-300 focus:shadow-[0_0_30px_rgba(139,92,246,0.8)] transition-all font-semibold"
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-black text-violet-100 mb-2 uppercase tracking-wide drop-shadow-[0_0_10px_rgba(139,92,246,0.8)]">Email</label>
                      <input
                        type="email"
                        required
                        className="w-full px-5 py-4 bg-black/60 border-3 border-violet-400 rounded-xl text-white placeholder-violet-300/70 focus:outline-none focus:border-violet-300 focus:shadow-[0_0_30px_rgba(139,92,246,0.8)] transition-all font-semibold"
                        placeholder="john@pefirm.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-black text-violet-100 mb-2 uppercase tracking-wide drop-shadow-[0_0_10px_rgba(139,92,246,0.8)]">PE Firm</label>
                      <input
                        type="text"
                        required
                        className="w-full px-5 py-4 bg-black/60 border-3 border-violet-400 rounded-xl text-white placeholder-violet-300/70 focus:outline-none focus:border-violet-300 focus:shadow-[0_0_30px_rgba(139,92,246,0.8)] transition-all font-semibold"
                        placeholder="Equity Partners"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-black text-violet-100 mb-2 uppercase tracking-wide drop-shadow-[0_0_10px_rgba(139,92,246,0.8)]">Role</label>
                      <select
                        required
                        className="w-full px-5 py-4 bg-black/60 border-3 border-violet-400 rounded-xl text-white focus:outline-none focus:border-violet-300 focus:shadow-[0_0_30px_rgba(139,92,246,0.8)] transition-all font-semibold"
                      >
                        <option value="">Select role...</option>
                        <option value="operating-partner">Operating Partner</option>
                        <option value="portfolio-ops">Portfolio Operations</option>
                        <option value="value-creation">Value Creation</option>
                        <option value="deal-team">Deal Team</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <Link href="/request-demo">
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 hover:from-violet-400 hover:via-fuchsia-400 hover:to-pink-400 text-white text-2xl font-black py-8 shadow-[0_0_40px_rgba(139,92,246,0.9),0_0_60px_rgba(139,92,246,0.6),0_0_80px_rgba(139,92,246,0.4)] hover:shadow-[0_0_50px_rgba(139,92,246,1),0_0_80px_rgba(139,92,246,0.8),0_0_120px_rgba(139,92,246,0.6)] uppercase tracking-wider border-2 border-white/50"
                    >
                      📈 Download Playbook 📈
                      <ArrowRight className="w-6 h-6 ml-3" />
                    </Button>
                  </Link>
                  
                  <p className="text-xs text-center text-violet-200 drop-shadow-[0_0_8px_rgba(139,92,246,0.6)]">
                    By submitting, you agree to receive communications about SiriusB iQ value creation solutions. Unsubscribe anytime.
                  </p>
                </form>
              </div>
            </Card>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-24 px-4 bg-gradient-to-b from-violet-950/30 to-black">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-black mb-8 bg-gradient-to-r from-violet-200 to-fuchsia-200 bg-clip-text text-transparent">
              Add $2M-$10M Per Portco
            </h2>
            <p className="text-2xl text-violet-200 mb-12">
              Schedule a 30-minute operator briefing to see the value creation playbook and 90-day deployment timeline.
            </p>
            <Link href="/request-demo">
              <Button size="lg" className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white text-xl px-12 py-8 shadow-2xl shadow-violet-500/50">
                Schedule Operator Briefing
                <Rocket className="w-6 h-6 ml-3" />
              </Button>
            </Link>
            <p className="text-sm text-violet-400 mt-6">
              PE-specific demo • 90-day deployment roadmap • Exit documentation included
            </p>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}