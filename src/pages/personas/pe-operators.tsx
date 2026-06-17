import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { 
  Building2, 
  Rocket, 
  DollarSign, 
  Target, 
  TrendingUp, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  Shield, 
  FileText, 
  ChevronDown, 
  RefreshCw, 
  Sparkles, 
  AlertTriangle, 
  HelpCircle 
} from "lucide-react";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const portfolioChecklist = [
  { id: 1, text: "Deal teams verify actual pre-acquisition pharmacy claims line-items, not just summary broker spreadsheets." },
  { id: 2, text: "Our operations group audits PBM contract margins (retained rebates, spread pricing) across all portcos annually." },
  { id: 3, text: "Portfolio companies employ independent, daily algorithmic auditing to catch ongoing drug price-creep." },
  { id: 4, text: "All contract guarantees (AWP discounts, specialty drug caps) are validated by a fiduciary third party." },
  { id: 5, text: "Co-pay optimization and international sourcing strategies are fully integrated to defend operating margins." }
];

export default function PEOperatorsPage() {
  // Interactive EBITDA Calculator State
  const [employees, setEmployees] = useState<number>(1200);
  const [multiple, setMultiple] = useState<number>(10.0);
  const [customContract, setCustomContract] = useState<boolean>(true);
  const [calculating, setCalculating] = useState<boolean>(false);
  const [calcResults, setCalcResults] = useState<{
    annualSavings: number;
    ebitdaIncrease: number;
    exitValueAdded: number;
  } | null>({
    annualSavings: 936000,
    ebitdaIncrease: 936000,
    exitValueAdded: 9360000
  });

  // Checklist state
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  const handleSimulateEBITDA = () => {
    setCalculating(true);
    setTimeout(() => {
      const baselineWaste = 780;
      const optimizationFactor = customContract ? 0.40 : 0.15;

      const annualSavings = Math.round(employees * baselineWaste * optimizationFactor);
      const exitValueAdded = Math.round(annualSavings * multiple);

      setCalcResults({
        annualSavings,
        ebitdaIncrease: annualSavings,
        exitValueAdded
      });
      setCalculating(false);
    }, 600);
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
        <title>For PE Operating Partners: Portfolio EBITDA Creation | SiriusB iQ</title>
        <meta
          name="description"
          content="Healthcare cost optimization engineered for private equity. Turn hidden portfolio company benefits waste into enterprise valuation growth."
        />
      </Head>

      <Nav />

      <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-emerald-500/30">
        {/* Hero Section */}
        <section className="relative pt-32 pb-24 px-4 overflow-hidden border-b border-emerald-500/10 bg-slate-950">
          <div className="absolute inset-0 bg-slate-950" />
          <div className="absolute top-1/4 left-10 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl" />
          
          <div className="relative max-w-7xl mx-auto">
            {/* Pure Single-Color Glassmorphic Flat Badge (No icons, no gradients, no patterns) */}
            <div className="inline-flex items-center justify-center px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-8 backdrop-blur-xl">
              <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase">PE OPERATING PARTNERS</span>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
              <div>
                <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight text-white leading-tight font-serif">
                  Turn Benefits Leakage <br />
                  Into <span className="text-emerald-400">Portfolio EBITDA</span>
                </h1>
                
                <p className="text-lg md:text-xl text-slate-300 mb-6 leading-relaxed">
                  Healthcare benefits are the <span className="text-emerald-400 font-bold">largest unmanaged operational expense</span> in mid-market portcos. Most businesses waste $500K to $2M annually on legacy, non-transparent pharmacy contracts.
                </p>
                
                <p className="text-sm text-slate-400 mb-8 leading-relaxed">
                  SiriusB iQ delivers institutional, forensic-grade contract restructuring and automated claims monitoring. Install our defensive infrastructure within 30 days, realize hard cash flow in 90 days, and document audited valuation additions for future buyers.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/request-demo">
                    <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white text-base px-8 py-5 rounded-lg shadow-xl font-bold border border-emerald-500/20">
                      Schedule Operator Briefing
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Link href="#value-simulator">
                    <Button size="lg" variant="outline" className="border-emerald-500/15 text-slate-200 hover:bg-emerald-950/20 text-base px-8 py-5 rounded-lg backdrop-blur-xl">
                      Explore EBITDA Simulator
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-emerald-500/5 rounded-2xl blur-3xl" />
                <Card className="relative bg-slate-900/25 border border-emerald-500/15 p-5 shadow-2xl backdrop-blur-2xl rounded-2xl">
                  <Image
                    src="/Firefly_Gemini_Flash_Your_PBM_Met_Every_Guarantee._You_Still_Lost_the_Money._Written_by_Jeremiah_Franklin_465075.png"
                    alt="Your PBM Met Every Guarantee. You Still Lost the Money - value creation handbook"
                    width={800}
                    height={800}
                    className="rounded-xl w-full h-auto border border-emerald-500/10 shadow-lg"
                    priority
                  />
                  <div className="mt-4 flex justify-between items-center px-1">
                    <div>
                      {/* Pure Single-Color Glassmorphic Flat Badge */}
                      <div className="inline-flex px-2.5 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">OPERATIONAL PLAYBOOK</span>
                      </div>
                      <p className="text-sm text-slate-200 font-bold">Fiduciary Risk & EBITDA Defense</p>
                    </div>
                    <span className="text-xs text-slate-500 font-medium">90-Day Execution Plan</span>
                  </div>
                </Card>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mt-16">
              <div className="bg-slate-900/20 backdrop-blur-2xl border border-emerald-500/10 rounded-xl p-6 transition-all hover:border-emerald-500/25">
                <div className="text-4xl font-extrabold text-white mb-1">90 Days</div>
                {/* Pure Single-Color Glassmorphic Flat Badge */}
                <div className="inline-flex px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">TIME-TO-SAVINGS</span>
                </div>
                <p className="text-xs text-slate-400">Immediate cash flow impact from PBM contract amendments.</p>
              </div>
              <div className="bg-slate-900/20 backdrop-blur-2xl border border-emerald-500/10 rounded-xl p-6 transition-all hover:border-emerald-500/25">
                <div className="text-4xl font-extrabold text-emerald-400 mb-1">$780/yr</div>
                {/* Pure Single-Color Glassmorphic Flat Badge */}
                <div className="inline-flex px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">AVERAGE PORTCO WASTE</span>
                </div>
                <p className="text-xs text-slate-400">Hidden pharmacy arbitrage leakage per enrolled employee.</p>
              </div>
              <div className="bg-slate-900/20 backdrop-blur-2xl border border-emerald-500/10 rounded-xl p-6 transition-all hover:border-emerald-500/25">
                <div className="text-4xl font-extrabold text-white mb-1">10x+</div>
                {/* Pure Single-Color Glassmorphic Flat Badge */}
                <div className="inline-flex px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">VALUATION LEVERAGE</span>
                </div>
                <p className="text-xs text-slate-400">Directly multiplies exit enterprise value based on portfolio exit multiples.</p>
              </div>
              <div className="bg-slate-900/20 backdrop-blur-2xl border border-emerald-500/10 rounded-xl p-6 transition-all hover:border-emerald-500/25">
                <div className="text-4xl font-extrabold text-emerald-400 mb-1">100% Audit</div>
                {/* Pure Single-Color Glassmorphic Flat Badge */}
                <div className="inline-flex px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">DILIGENCE READY</span>
                </div>
                <p className="text-xs text-slate-400">Complete forensic lineage with cryptographic transaction receipts.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Translation Section: Relatable Plain English Layer for Deal Teams */}
        <section className="py-20 px-4 bg-slate-950 border-b border-emerald-500/5">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              {/* Pure Single-Color Glassmorphic Flat Badge */}
              <div className="inline-flex items-center justify-center px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-4 backdrop-blur-xl">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">INVESTMENT PLAIN ENGLISH TRANSLATION</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 font-serif">
                Why Standard Diligence Misses Pharmacy Leakage
              </h2>
              <p className="text-sm text-slate-400 mt-2 max-w-2xl mx-auto">
                Brokers routinely present polished reports stating everything is optimized. Let's translate what is actually occurring.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Card 1 */}
              <div className="p-8 rounded-2xl bg-slate-900/20 backdrop-blur-2xl border border-emerald-500/10 flex flex-col justify-between hover:border-emerald-500/25 transition-all">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    {/* Pure Single-Color Glassmorphic Flat Badge */}
                    <div className="px-2.5 py-1 text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full uppercase tracking-wider backdrop-blur-xl">
                      THE STANDARD PITCH
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 font-serif">
                    "Your Portco met 100% of PBM AWP discounts and guarantees."
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-6">
                    Brokers provide a colorful report confirming that the PBM hit their guaranteed average discounts. They declare victory and advise moving on.
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/10 backdrop-blur-xl">
                  <div className="flex items-center gap-2 mb-2 text-emerald-400 font-bold text-xs">
                    <HelpCircle className="w-3.5 h-3.5 text-emerald-400" /> Plain English Reality Check:
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    It's like buying a fleet of company vehicles where the dealer hits their discount quote, but quietly charges you $200 for oil filters, $500 for floor mats, and lists premium gasoline on the invoice when regular was pumped. Meeting the guarantee does not prevent massive unit price-creep.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="p-8 rounded-2xl bg-slate-900/20 backdrop-blur-2xl border border-emerald-500/10 flex flex-col justify-between hover:border-emerald-500/25 transition-all">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    {/* Pure Single-Color Glassmorphic Flat Badge */}
                    <div className="px-2.5 py-1 text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full uppercase tracking-wider backdrop-blur-xl">
                      THE BROKER SHIELD
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 font-serif">
                    "We run a transparent RFP to get the best carrier rate."
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-6">
                    Brokers run standard excel sheet RFPs to pit carriers against each other. They present the lowest bid and suggest your EBITDA is fully optimized.
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/10 backdrop-blur-xl">
                  <div className="flex items-center gap-2 mb-2 text-emerald-400 font-bold text-xs">
                    <HelpCircle className="w-3.5 h-3.5 text-emerald-400" /> Plain English Reality Check:
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    The RFP only compares "disclosed" administrative fees, while completely ignoring soft-dollar spreads and hidden formulary exclusions. The real profit centers (hidden carrier overrides and PBM margins) are baked into the drug prices themselves and never appear in the RFP.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Live Interactive EBITDA & Multiple Expansion Simulator */}
        <section id="value-simulator" className="py-24 px-4 bg-slate-950 border-y border-emerald-500/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              {/* Pure Single-Color Glassmorphic Flat Badge */}
              <div className="inline-flex items-center justify-center px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-4 text-xs font-bold text-emerald-400 uppercase tracking-widest backdrop-blur-xl">
                VALUE CREATION CALCULATOR
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 font-serif">
                EBITDA & Exit Value Simulator
              </h2>
              <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto">
                Estimate the exact operational savings and valuation multiplier leverage by adjusting your portco employee metrics.
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* Controls Column */}
              <Card className="lg:col-span-5 bg-slate-900/20 backdrop-blur-2xl border border-emerald-500/10 p-8 rounded-2xl">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2 font-serif">
                  <Building2 className="w-4 h-4 text-emerald-400" /> Portco Profile
                </h3>

                <div className="space-y-6">
                  {/* Employees */}
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-2">
                      <span className="text-slate-300">Enrolled Employee Lives</span>
                      <span className="text-emerald-400 font-bold">{employees.toLocaleString()} lives</span>
                    </div>
                    <input
                      type="range"
                      min={100}
                      max={5000}
                      step={50}
                      value={employees}
                      onChange={(e) => setEmployees(Number(e.target.value))}
                      className="w-full accent-emerald-500 h-1.5 bg-slate-950 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Multiple */}
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-2">
                      <span className="text-slate-300">Expected Exit Valuation Multiple</span>
                      <span className="text-emerald-400 font-bold">{multiple}x EBITDA</span>
                    </div>
                    <input
                      type="range"
                      min={4}
                      max={20}
                      step={0.5}
                      value={multiple}
                      onChange={(e) => setMultiple(Number(e.target.value))}
                      className="w-full accent-emerald-500 h-1.5 bg-slate-950 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Custom Contract Options */}
                  <div className="flex items-center justify-between p-4 bg-slate-950/40 backdrop-blur-xl rounded-xl border border-emerald-500/10">
                    <div>
                      <span className="block text-xs font-semibold text-slate-200">Enforce Fiduciary PBM Contract</span>
                      <span className="text-[10px] text-slate-500">NADAC unit benchmarking & pass-through rates</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCustomContract(!customContract)}
                      className={`w-12 h-6 rounded-full transition-colors relative focus:outline-none ${
                        customContract ? "bg-emerald-600" : "bg-slate-800"
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
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-5 rounded-lg text-sm font-bold shadow-lg border border-emerald-500/20"
                  >
                    {calculating ? (
                      <span className="flex items-center gap-2 justify-center">
                        <RefreshCw className="w-4 h-4 animate-spin" /> recalculating enterprise math...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 justify-center">
                        <TrendingUp className="w-4 h-4" /> Calculate Enterprise Value Added
                      </span>
                    )}
                  </Button>
                </div>
              </Card>

              {/* Outputs Column */}
              <Card className="lg:col-span-7 bg-slate-900/20 backdrop-blur-2xl border border-emerald-500/10 p-8 rounded-2xl relative overflow-hidden self-stretch flex flex-col justify-between">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                  <Building2 className="w-32 h-32 text-emerald-400" />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2 font-serif">
                    <Target className="w-4 h-4 text-emerald-400" /> Valuation & Capital Creation
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
                          <div className="bg-slate-950/40 p-4 rounded-xl border border-emerald-500/5">
                            {/* Pure Single-Color Glassmorphic Flat Badge */}
                            <div className="inline-flex px-1.5 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-1">
                              <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider">ANNUAL SAVINGS</span>
                            </div>
                            <span className="block text-xl font-bold text-white">${calcResults.annualSavings.toLocaleString()}</span>
                            <span className="block text-[9px] text-slate-500 mt-1">100% recovered margin</span>
                          </div>
                          <div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20">
                            {/* Pure Single-Color Glassmorphic Flat Badge */}
                            <div className="inline-flex px-1.5 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-1">
                              <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider">PORTCO EBITDA LIFT</span>
                            </div>
                            <span className="block text-xl font-bold text-emerald-400">+${calcResults.ebitdaIncrease.toLocaleString()}</span>
                            <span className="block text-[9px] text-emerald-500 mt-1">Added operating margin</span>
                          </div>
                          <div className="bg-emerald-500/5 p-4 rounded-xl border border-emerald-500/25">
                            {/* Pure Single-Color Glassmorphic Flat Badge */}
                            <div className="inline-flex px-1.5 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-1">
                              <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider">ADDED EXIT VALUE</span>
                            </div>
                            <span className="block text-xl font-bold text-white">${calcResults.exitValueAdded.toLocaleString()}</span>
                            <span className="block text-[9px] text-slate-500 mt-1">At exit multiple</span>
                          </div>
                        </div>

                        <div className="bg-slate-950/40 p-6 rounded-xl border border-emerald-500/10 space-y-4">
                          {/* Pure Single-Color Glassmorphic Flat Badge */}
                          <div className="inline-flex px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">ESTIMATED VALUATION EXPANSION</span>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-slate-400">Portco Value Realization Likelihood</span>
                                <span className="font-bold text-emerald-400">95% (90-Day Execution)</span>
                              </div>
                              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                                <div className="bg-emerald-500 h-full rounded-full" style={{ width: "95%" }} />
                              </div>
                            </div>
                            <div className="flex justify-between text-[11px] pt-2 text-slate-500 border-t border-emerald-500/5">
                              <span>Applied Valuation leverage</span>
                              <span className="font-bold text-white">{multiple}x Multiple Applied</span>
                            </div>
                          </div>
                          <p className="text-[10px] text-slate-500 leading-relaxed italic pt-1">
                            *Exit additions are calculated directly on audited pharmacy contract recovery rates. Realized portfolio averages from our database demonstrate an 18% cost-reduction average on self-funded portcos.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="mt-6 pt-6 border-t border-emerald-500/5 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-emerald-500" /> Diligence-ready report</span>
                  <span className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5 text-emerald-500" /> Audit verification</span>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Portfolio ERISA & EBITDA Leakage Self-Audit Checklist */}
        <section className="py-24 px-4 bg-slate-950">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-slate-900/25 backdrop-blur-2xl border border-emerald-500/10 p-10 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl" />

              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-emerald-500/5 border border-emerald-500/15 rounded-xl">
                    <Shield className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white font-serif">Portfolio EBITDA & Diligence Checklist</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Validate your portco cost containment policies against real ERISA transparency requirements.</p>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {portfolioChecklist.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleToggleChecklist(item.id)}
                      className="flex items-start gap-4 p-4 rounded-xl border border-emerald-500/10 bg-slate-950/20 hover:bg-slate-950/60 cursor-pointer transition-all"
                    >
                      <div className={`w-5 h-5 rounded border flex items-center justify-center mt-0.5 transition-all ${
                        checkedItems.includes(item.id)
                          ? "bg-emerald-600 border-emerald-500 text-white"
                          : "border-emerald-500/20 text-transparent"
                      }`}>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-slate-300 text-xs md:text-sm leading-relaxed">{item.text}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-slate-950/60 rounded-xl p-6 border border-emerald-500/10 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    {/* Pure Single-Color Glassmorphic Flat Badge */}
                    <div className="inline-flex px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-1">
                      <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">PORTFOLIO COMPLIANCE</span>
                    </div>
                    <span className="block text-3xl font-extrabold text-white mt-1">{auditScore}%</span>
                    <span className="block text-xs text-slate-500 mt-1">Score calculated on fiduciary deal compliance standards</span>
                  </div>

                  <div className="text-right">
                    {auditScore === 100 ? (
                      <span className="text-emerald-400 font-bold text-sm flex items-center justify-end gap-1.5"><CheckCircle2 className="w-4 h-4" /> Optimally Secured</span>
                    ) : auditScore >= 60 ? (
                      <span className="text-emerald-400/80 font-bold text-sm flex items-center justify-end gap-1.5"><AlertTriangle className="w-4 h-4 text-emerald-400" /> Margin Leakage Suspected</span>
                    ) : (
                      <span className="text-emerald-500/60 font-bold text-sm flex items-center justify-end gap-1.5"><AlertTriangle className="w-4 h-4 text-emerald-500" /> Heavy Fiduciary Risk</span>
                    )}
                    <span className="block text-[10px] text-slate-500 mt-1">Diligence omissions yield $1.4M in average annual leakage</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Value Creation Playbook Timeline */}
        <section className="py-24 px-4 bg-slate-950 border-t border-emerald-500/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              {/* Pure Single-Color Glassmorphic Flat Badge */}
              <div className="inline-flex items-center justify-center px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-4 backdrop-blur-xl">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">VALUE CREATION PLAYBOOK</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mt-4 font-serif">
                90-Day Implementation Timeline
              </h2>
            </div>
            
            <div className="space-y-8">
              <Card className="bg-slate-900/20 backdrop-blur-2xl border border-emerald-500/10 p-8 transition-all hover:border-emerald-500/25 rounded-2xl">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-4 flex-shrink-0">
                    <Target className="w-8 h-8 text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      {/* Pure Single-Color Glassmorphic Flat Badge */}
                      <div className="px-3 py-1 text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full uppercase tracking-widest backdrop-blur-xl">
                        DAY 1 - 30
                      </div>
                      <h3 className="text-2xl font-bold text-white font-serif">Contract X-Ray & Baseline Analysis</h3>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed mb-4">
                      We perform a complete forensic audit of existing PBM contract agreements and ingest 12 months of core claims data. Delivery includes a detailed analysis quantifying hidden spreads, routing flaws, and direct EBITDA leaks.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-slate-950/40 rounded-lg p-4 border border-emerald-500/5">
                        <div className="text-xl font-bold text-white mb-1">$627K</div>
                        <div className="text-xs text-slate-500">Average Discovered Waste</div>
                      </div>
                      <div className="bg-slate-950/40 rounded-lg p-4 border border-emerald-500/5">
                        <div className="text-xl font-bold text-white mb-1">$410K</div>
                        <div className="text-xs text-slate-500">Hidden Rebate Retention</div>
                      </div>
                      <div className="bg-slate-950/40 rounded-lg p-4 border border-emerald-500/5">
                        <div className="text-xl font-bold text-white mb-1">$380K</div>
                        <div className="text-xs text-slate-500">Formulary Pricing Arbitrage</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="bg-slate-900/20 backdrop-blur-2xl border border-emerald-500/10 p-8 transition-all hover:border-emerald-500/25 rounded-2xl">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-4 flex-shrink-0">
                    <Rocket className="w-8 h-8 text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      {/* Pure Single-Color Glassmorphic Flat Badge */}
                      <div className="px-3 py-1 text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full uppercase tracking-widest backdrop-blur-xl">
                        DAY 31 - 90
                      </div>
                      <h3 className="text-2xl font-bold text-white font-serif">Contract Amendments & Live Execution</h3>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed mb-4">
                      Deploy structured contract revisions directly to the carrier/PBM. Introduce automatic pass-through pricing, specialty medication routing, and daily automated checks to stop overcharges in real-time.
                    </p>
                    <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-4 backdrop-blur-xl">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          {/* Pure Single-Color Glassmorphic Flat Badge */}
                          <div className="inline-flex px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-2">
                            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">90-DAY QUICK WINS</span>
                          </div>
                          <div className="space-y-2 text-xs text-slate-300">
                            <div className="flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                              <span>100% Rebate Pass-Through guarantees</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Custom ERISA Right-to-Audit provisions</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Elimination of hidden co-pay accumulator sweeps</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col justify-center">
                          <div className="text-3xl font-extrabold text-emerald-400 mb-1">$650K+</div>
                          <div className="text-[11px] text-slate-400">First-Year Realized Operating Savings</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="bg-slate-900/20 backdrop-blur-2xl border border-emerald-500/10 p-8 transition-all hover:border-emerald-500/25 rounded-2xl">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-4 flex-shrink-0">
                    <Zap className="w-8 h-8 text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      {/* Pure Single-Color Glassmorphic Flat Badge */}
                      <div className="px-3 py-1 text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full uppercase tracking-widest backdrop-blur-xl">
                        DAY 91+
                      </div>
                      <h3 className="text-2xl font-bold text-white font-serif">Fiduciary Tracking & Exit Readiness</h3>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed mb-4">
                      Deploy daily automated oversight. Every pharmaceutical transaction is automatically logged as a secure cryptographic receipt. Present direct, audited cash-savings evidence to prospective buyers to prove enterprise multiple additions.
                    </p>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="bg-slate-950/40 rounded-lg p-3 border border-emerald-500/5 text-center">
                        <div className="text-lg font-bold text-white mb-0.5">$2.1M</div>
                        <div className="text-[10px] text-slate-500">Average 3-Yr Portco Savings</div>
                      </div>
                      <div className="bg-slate-950/40 rounded-lg p-3 border border-emerald-500/5 text-center">
                        <div className="text-lg font-bold text-white mb-0.5">18%</div>
                        <p className="text-[10px] text-slate-500">Benefits Budget Reduction</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Lead Capture Form */}
        <section className="py-20 px-4 bg-slate-950">
          <div className="max-w-4xl mx-auto">
            <Card className="relative bg-slate-900/25 backdrop-blur-2xl border border-emerald-500/15 p-10 shadow-2xl rounded-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl" />
              
              <div className="relative">
                <div className="text-center mb-8">
                  {/* Pure Single-Color Glassmorphic Flat Badge */}
                  <div className="inline-flex px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full uppercase tracking-widest mb-3 backdrop-blur-xl">
                    VALUE CREATION LIBRARY
                  </div>
                  <h2 className="text-3xl font-bold mb-2 font-serif text-white">
                    Download The PE Operating Playbook
                  </h2>
                  <p className="text-sm text-slate-400 max-w-lg mx-auto">
                    Get the complete 90-day deployment roadmap, exit templates, and contract evaluation spreadsheets.
                  </p>
                </div>
                
                <form className="max-w-xl mx-auto space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">Full Name</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 bg-slate-950/60 border border-emerald-500/10 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 text-sm transition-all"
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">Email Address</label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-3 bg-slate-950/60 border border-emerald-500/10 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 text-sm transition-all"
                        placeholder="john@pefirm.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">PE Firm Name</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 bg-slate-950/60 border border-emerald-500/10 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 text-sm transition-all"
                        placeholder="Equity Capital"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">Role / Title</label>
                      <select
                        required
                        className="w-full px-4 py-3 bg-slate-950/60 border border-emerald-500/10 rounded-lg text-white focus:outline-none focus:border-emerald-500 text-sm transition-all"
                      >
                        <option value="">Select role...</option>
                        <option value="operating-partner">Operating Partner</option>
                        <option value="portfolio-ops">Portfolio Operations</option>
                        <option value="deal-team">Deal Team</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <Link href="/request-demo" className="block mt-4">
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-base font-bold py-4 rounded-lg shadow-lg border border-emerald-500/20"
                    >
                      Download Operational Playbook
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  
                  <p className="text-[10px] text-center text-slate-500">
                    By submitting, you agree to receive strategic communications from SiriusB iQ. Unsubscribe anytime.
                  </p>
                </form>
              </div>
            </Card>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-24 px-4 bg-gradient-to-b from-slate-950 to-emerald-950/20 border-t border-emerald-500/5 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 font-serif">
              Add $2M-$10M in Portfolio Exit Value
            </h2>
            <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
              Schedule a private 30-minute operator briefing to review the playbook, baseline templates, and live monitoring platform integration.
            </p>
            <Link href="/request-demo">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white text-base font-bold px-10 py-5 rounded-lg shadow-xl border border-emerald-500/20">
                Book Portfolio Audit Briefing
                <Rocket className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}