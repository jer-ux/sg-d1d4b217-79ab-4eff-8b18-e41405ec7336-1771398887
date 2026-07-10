import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  TrendingDown, 
  DollarSign, 
  Target, 
  BarChart3, 
  AlertTriangle, 
  ArrowRight, 
  CheckCircle2, 
  Shield, 
  FileText, 
  Brain, 
  ChevronDown, 
  LineChart, 
  Lock, 
  Zap, 
  Users, 
  Calculator, 
  RefreshCw, 
  Sparkles, 
  AlertCircle,
  HelpCircle,
  TrendingUp,
  ArrowUpRight
} from "lucide-react";
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
    title: "The Hidden Premium Markups",
    impact: "Lose $150K - $250K per million spent",
    analogy: "Like buying coffee where the barista secretly charges you $1 extra for the cup, 50¢ for the sleeve, and 25¢ for the napkin without writing it on the receipt.",
    description: "PBMs promise 'low admin fees' but mark up individual medication prices (spread pricing) by up to 400% before they reach your bill.",
    reality: "Your PBM's 'discounts' are calculated off an artificially high price (AWP). They pocket the massive difference between what they pay the pharmacy and what they charge you.",
    solution: "Contract X-Ray automatically checks your claims against actual government drug costs (NADAC) to show you the exact cash markup on every pill."
  },
  {
    title: "The 'Keep-the-Change' Rebate Game",
    impact: "Lose 30% - 50% of your drug rebates",
    analogy: "Like sending a friend to cash a $100 manufacturer rebate check for your TV, and they only hand you $60 back, claiming the other $40 was a 'retention handling fee'.",
    description: "Drug manufacturers pay massive cash incentives (rebates) for specialty medications. PBMs hide these under custom labels like 'administrative fees' so they don't have to pass them back to you.",
    reality: "If your contract doesn't explicitly guarantee '100% pass-through of all manufacturer revenue streams', your PBM is legally pocketing your rebates.",
    solution: "Kincaid Health forces full rebate transparency, tracking every manufacturer dollar down to the exact National Drug Code (NDC)."
  },
  {
    title: "Personal Liability (The Yale/MIT Wakeup Call)",
    impact: "Class-action lawsuits & personal liability",
    analogy: "Like being the treasurer of a HOA and letting a contractor overcharge homeowners by double for 5 years without ever getting a second quote.",
    description: "New ERISA laws hold corporate executives personally liable for failing to audit and control healthcare plan costs.",
    reality: "Recent federal court rulings are actively targeting CFOs and HR leaders. Relying on your broker's 'clean opinion' without independent audits is no longer a legal defense.",
    solution: "We provide automated, court-ready 'Prudent Fiduciary Receipts' every quarter, proving you are active, independent, and compliant."
  },
  {
    title: "The Specialty Drug Spike",
    impact: "A single claim can cost $100K - $1M+",
    analogy: "Like having a flat-rate corporate travel policy, but one employee books a private helicopter ride that blows your entire annual budget in a single afternoon.",
    description: "Specialty medications make up less than 2% of your prescriptions but represent over 50% of your entire pharmacy budget.",
    reality: "Brokers often recommend buying expensive 'stop-loss' policies to cover this, rather than blocking unapproved or overpriced specialty claims before they get paid.",
    solution: "Our real-time Predictive Pipeline simulates upcoming high-cost specialty claims so you can implement clinical protocols before they hit your balance sheet."
  }
];

const financialTools = [
  {
    icon: <Calculator className="w-6 h-6" />,
    title: "EBITDA Leakage Tracker",
    simpleTitle: "The 'Where is my Money Going' Auditor",
    description: "Instantly flags every overcharged medication and tells you exactly how much cash you can reclaim this month.",
    outcome: "Recovers $450K - $750K on average"
  },
  {
    icon: <LineChart className="w-6 h-6" />,
    title: "Predictive Cost Forecaster",
    simpleTitle: "The 12-Month Budget Shield",
    description: "Scans your current claims to forecast high-cost specialty drug spend 6-12 months ahead with ±5% accuracy.",
    outcome: "No more surprise $200K medication bills"
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Fiduciary Receipt Cabinet",
    simpleTitle: "The Personal Lawsuit Protector",
    description: "Generates quarterly court-ready reports proving you regularly audited and benchmarked your benefit costs.",
    outcome: "100% compliance with ERISA §404 rules"
  }
];

const fiduciaryChecklist = [
  { id: 1, text: "We have direct, unredacted, line-item audit rights written in our contract (we don't need PBM permission to look at our data)." },
  { id: 2, text: "Our contract guarantees that 100% of manufacturer rebates and admin fees go directly back to our bank account." },
  { id: 3, text: "We verify our drug costs against independent, objective public benchmarks (like NADAC) instead of PBM-selected indices." },
  { id: 4, text: "Our benefits broker is completely independent and does not receive any direct or indirect commissions from our PBM." },
  { id: 5, text: "We formally document our plan monitoring decisions every single quarter to maintain an active audit trail." }
];

export default function CFOPage() {
  const [expandedRisk, setExpandedRisk] = useState<number | null>(null);
  const [expandedTool, setExpandedTool] = useState<number | null>(null);

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
        <title>For CFOs: Plain-English EBITDA Defense & Cost Optimization | Kincaid Health</title>
        <meta
          name="description"
          content="Identify 15-25% in recoverable pharmacy spend with simple, automated contract forensics. Protect your company from fiduciary liability."
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
              <span className="text-sm font-bold text-emerald-200 uppercase tracking-wider">CFO Plain-English Intelligence</span>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
              <div>
                <h1 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white via-emerald-200 to-green-300 bg-clip-text text-transparent leading-tight font-serif">
                  Is Your PBM Contract <br />
                  <span className="text-emerald-400">Silently Bleeding</span> EBITDA?
                </h1>
                
                <p className="text-xl text-emerald-100/90 mb-6 leading-relaxed">
                  Most mid-market companies waste <span className="text-emerald-300 font-black decoration-emerald-400 underline decoration-2">15% to 25% of their pharmacy budget</span> on hidden markups, retained rebates, and clever legal jargon.
                </p>

                {/* Real-World Analogy Block */}
                <div className="p-5 rounded-2xl bg-black/40 border border-emerald-500/20 mb-8">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 uppercase tracking-widest mb-2">
                    <HelpCircle className="w-4 h-4" /> Why is this happening?
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    It's like paying a restaurant for a meal, but the waiter secretly adds a 30% markup on your drinks, keeps the manufacturer's coupons for themselves, and legally forbids you from reading the itemized receipt. We fix this.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="#ebitda-leakage-simulator">
                    <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold text-base px-8 py-6 shadow-2xl shadow-emerald-500/40">
                      Calculate Your Hidden Waste
                      <ArrowRight className="w-5 h-5 ml-2 animate-bounce-horizontal" />
                    </Button>
                  </Link>
                  <Link href="/request-demo">
                    <Button size="lg" variant="outline" className="border-emerald-400/50 text-emerald-200 hover:bg-emerald-500/10 text-base px-8 py-6">
                      Get a Free Health Check
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
                    alt="Your PBM Met Every Guarantee. You Still Lost the Money"
                    width={800}
                    height={800}
                    className="rounded-xl w-full h-auto border border-emerald-400/30 shadow-inner"
                    priority
                  />
                  <div className="mt-4 text-center">
                    <p className="text-sm text-emerald-200 font-bold">Why Guaranteed Savings Can Still Lose You Money</p>
                    <p className="text-xs text-emerald-400/80 italic mt-1">Written by Jeremiah Franklin • Founder</p>
                  </div>
                </Card>
              </motion.div>
            </div>

            <motion.div className="grid md:grid-cols-4 gap-6 mt-16" variants={staggerChildren} initial="initial" animate="animate">
              {[
                { value: "23%", label: "Average Hidden Waste", detail: "Opaque margins found in active plans" },
                { value: "$517K", label: "Typical Year-1 Savings", detail: "Based on $3M in total annual spend" },
                { value: "10:1", label: "Guaranteed ROI", detail: "If we don't save you money, you pay $0" },
                { value: "48hrs", label: "Analysis Turnaround", detail: "Upload your contract for quick answers" }
              ].map((stat, i) => (
                <motion.div key={i} variants={fadeInUp}>
                  <Card className="bg-gradient-to-br from-emerald-950/20 to-slate-950/40 border-2 border-emerald-500/25 backdrop-blur-xl p-6 hover:scale-105 transition-transform">
                    <div className="text-4xl font-black text-emerald-300 mb-2">{stat.value}</div>
                    <div className="text-sm font-bold text-emerald-100">{stat.label}</div>
                    <div className="text-xs text-emerald-400/80 mt-2">{stat.detail}</div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* War Room Preview - Las Vegas Style */}
        <section className="relative py-32 overflow-hidden">
          {/* Vegas Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/20 to-black" />
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
            <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "2s" }} />
          </div>
          
          {/* Neon Grid Overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px"
            }} />
          </div>

          {/* Scanning Lines Effect */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-purple-400/50 to-transparent animate-scan" />
            <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent animate-scan" style={{ animationDelay: "2s" }} />
          </div>

          <div className="relative max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              {/* Vegas-style neon header */}
              <div className="inline-block relative mb-6">
                <div className="absolute inset-0 bg-purple-500/20 blur-2xl" />
                <h2 className="relative text-5xl md:text-6xl font-black tracking-tight">
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
                    Executive Command Center
                  </span>
                </h2>
                {/* Neon glow effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 blur-xl opacity-50 animate-pulse" />
              </div>
              
              <p className="text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
                Real-time financial intelligence with{" "}
                <span className="text-purple-400 font-semibold">Vegas-grade visualization</span>
              </p>
            </motion.div>

            {/* Interactive War Room Display */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Holographic border effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-2xl blur-xl opacity-30 animate-pulse" />
              
              <div className="relative bg-black/80 backdrop-blur-xl border border-purple-500/30 rounded-2xl overflow-hidden shadow-2xl">
                {/* Neon top bar */}
                <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 animate-gradient" />
                
                {/* Content with Vegas styling */}
                <div className="p-8">
                  <div className="grid grid-cols-3 gap-6 mb-8">
                    {[
                      { label: "EBITDA Impact", value: "$4.2M", change: "+12.8%", color: "from-green-400 to-emerald-500" },
                      { label: "Risk Score", value: "23", change: "-45%", color: "from-blue-400 to-cyan-500" },
                      { label: "Savings Locked", value: "$1.8M", change: "+22%", color: "from-purple-400 to-pink-500" }
                    ].map((kpi, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                        className="relative group"
                      >
                        {/* Vegas card glow */}
                        <div className={`absolute -inset-0.5 bg-gradient-to-r ${kpi.color} rounded-lg blur opacity-0 group-hover:opacity-50 transition-opacity`} />
                        
                        <div className="relative bg-black/60 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                          <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                            {kpi.label}
                          </div>
                          <div className={`text-3xl font-black bg-gradient-to-r ${kpi.color} bg-clip-text text-transparent mb-1`}>
                            {kpi.value}
                          </div>
                          <div className="text-sm text-green-400 font-semibold">
                            {kpi.change}
                          </div>
                          {/* Sparkle effect */}
                          <div className="absolute top-2 right-2 w-2 h-2 bg-white/80 rounded-full animate-ping" />
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Live data stream visualization */}
                  <div className="space-y-4">
                    {[
                      { event: "Contract Leakage Detected", value: "$142K", severity: "high" },
                      { event: "Vendor Compliance Issue", value: "$89K", severity: "medium" },
                      { event: "Claims Anomaly Pattern", value: "$67K", severity: "high" }
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + i * 0.1 }}
                        className="relative group cursor-pointer"
                      >
                        {/* Scanning line effect on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        
                        <div className="relative flex items-center gap-4 p-4 bg-black/40 backdrop-blur-sm border border-white/5 rounded-lg hover:border-purple-500/30 transition-all">
                          <div className={`w-2 h-2 rounded-full ${item.severity === "high" ? "bg-red-400" : "bg-amber-400"} animate-pulse shadow-lg ${item.severity === "high" ? "shadow-red-400/50" : "shadow-amber-400/50"}`} />
                          <div className="flex-1">
                            <div className="text-sm font-semibold text-white/90">{item.event}</div>
                            <div className="text-xs text-neutral-500">Just now</div>
                          </div>
                          <div className="text-lg font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                            {item.value}
                          </div>
                          {/* Holographic arrow */}
                          <div className="text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
                            →
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Bottom neon accent */}
                <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient" style={{ animationDirection: "reverse" }} />
              </div>
            </motion.div>

            {/* CTA with Vegas styling */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-center mt-12"
            >
              <Link href="/request-demo">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group px-8 py-4 rounded-lg overflow-hidden"
                >
                  {/* Animated Vegas border */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 animate-gradient" />
                  <div className="absolute inset-[2px] bg-black rounded-lg" />
                  
                  <span className="relative text-lg font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                    Experience the Command Center
                  </span>
                  
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
              </Link>
            </motion.div>
          </div>

          <style jsx>{`
            @keyframes scan {
              0% { top: 0; }
              100% { top: 100%; }
            }
            @keyframes gradient {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            .animate-scan {
              animation: scan 3s linear infinite;
            }
            .animate-gradient {
              background-size: 200% auto;
              animation: gradient 3s linear infinite;
            }
          `}</style>
        </section>

        {/* Live Interactive EBITDA Leakage Simulator Sandbox */}
        <section id="ebitda-leakage-simulator" className="py-24 px-4 bg-gradient-to-b from-slate-950 to-emerald-950/40 border-t border-emerald-500/20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-400/20 rounded-full mb-4 text-xs font-black text-emerald-300 uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" /> 1-Minute Forensic Sandbox
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-emerald-200 to-green-200 bg-clip-text text-transparent font-serif">
                How Much Is Your Company Leaking?
              </h2>
              <p className="text-xl text-emerald-300/80 max-w-3xl mx-auto">
                Adjust the sliders below to reveal estimated annual plan waste and see what that recovered cash translates into for your company's value.
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* Controls Column */}
              <Card className="lg:col-span-5 bg-black/40 border-emerald-500/30 p-8 backdrop-blur-xl">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-emerald-400" /> Plan Profile
                </h3>

                <div className="space-y-6">
                  {/* Spend Input */}
                  <div>
                    <div className="flex justify-between text-sm font-semibold mb-2">
                      <span className="text-emerald-200">Your Annual Pharmacy Spend</span>
                      <span className="text-emerald-300 font-bold">${(spend / 1000000).toFixed(1)}M</span>
                    </div>
                    <input
                      type="range"
                      min={500000}
                      max={15000000}
                      step={250000}
                      value={spend}
                      onChange={(e) => setSpend(Number(e.target.value))}
                      className="w-full accent-emerald-500 h-1.5 bg-emerald-950 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-emerald-500/70 mt-1">
                      <span>$500K</span>
                      <span>$15M</span>
                    </div>
                  </div>

                  {/* Current Contract Structure */}
                  <div>
                    <span className="block text-sm font-semibold text-emerald-200 mb-2">Current PBM Deal Type</span>
                    <select
                      value={pbmType}
                      onChange={(e) => setPbmType(e.target.value)}
                      className="w-full px-4 py-3 bg-black/60 border border-emerald-500/30 rounded-xl text-emerald-200 focus:outline-none focus:border-emerald-400"
                    >
                      <option value="traditional">Traditional (Broker recommended, high margin)</option>
                      <option value="transparent">Transparent (Pass-through rebate program)</option>
                      <option value="passthrough">Pure Acquisition / Cost-Plus (Optimal design)</option>
                    </select>
                  </div>

                  {/* Audit Frequency */}
                  <div>
                    <span className="block text-sm font-semibold text-emerald-200 mb-2">Audit Frequency</span>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { val: "none", label: "Never" },
                        { val: "annual", label: "Annual Spot Check" },
                        { val: "realtime", label: "Continuous AI" }
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
                    className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white py-6 text-base font-bold shadow-lg"
                  >
                    {calculating ? (
                      <span className="flex items-center gap-2 justify-center">
                        <RefreshCw className="w-5 h-5 animate-spin" /> auditing contract clauses...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 justify-center">
                        <DollarSign className="w-5 h-5 animate-pulse" /> Calculate Cost Recoveries
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
                    <LineChart className="w-5 h-5 text-green-400" /> Estimated Recoveries & Business Value
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
                            <span className="block text-[11px] text-red-400/80 mt-1">EBITDA lost inside complex pricing tables</span>
                          </div>
                          <div className="bg-emerald-900/30 p-5 rounded-xl border border-emerald-400/30">
                            <span className="block text-xs font-semibold text-emerald-300 uppercase tracking-wider mb-1">Recoverable Year 1 Cash</span>
                            <span className="text-3xl font-black text-emerald-300">${(savingsResults.recoverable).toLocaleString()}</span>
                            <span className="block text-[11px] text-emerald-300 mt-1 flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-emerald-400" /> Pure bottom-line margin recovery
                            </span>
                          </div>
                        </div>

                        {/* Relatable Business Multiple translation */}
                        <div className="bg-black/40 p-6 rounded-xl border border-emerald-500/20 space-y-4">
                          <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <ArrowUpRight className="w-4 h-4 text-emerald-400" /> What this means for your company's value:
                          </h4>
                          <div className="space-y-3">
                            <p className="text-sm text-slate-300 leading-relaxed">
                              At a standard <span className="text-emerald-300 font-bold">10x valuation multiple</span>, saving ${(savingsResults.recoverable).toLocaleString()} in cash expenses adds approximately:
                            </p>
                            <div className="flex justify-between items-center bg-emerald-500/10 border border-emerald-400/20 p-4 rounded-xl">
                              <span className="text-xs text-emerald-200">Added Enterprise Value:</span>
                              <span className="text-2xl font-black text-white">${(savingsResults.recoverable * 10).toLocaleString()}</span>
                            </div>
                          </div>
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

        {/* Financial Risks Section */}
        <section className="py-24 px-4 bg-gradient-to-b from-black to-emerald-950/20">
          <div className="max-w-6xl mx-auto">
            <motion.div className="text-center mb-16" {...fadeInUp}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-400/30 rounded-full mb-6">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <span className="text-sm font-bold text-red-300 uppercase tracking-wider">Plan Pitfalls Explained Simply</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-emerald-200 to-green-200 bg-clip-text text-transparent font-serif">
                Four Ways Your Benefits Budget is Being Exploited
              </h2>
              <p className="text-xl text-emerald-300/80 max-w-3xl mx-auto">
                No complex pharmacy jargon. Here is how your company loses cash in plain English:
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {financialRisks.map((risk, index) => (
                <motion.div key={index} {...fadeInUp} transition={{ delay: index * 0.1 }}>
                  <Card className="bg-gradient-to-br from-emerald-900/40 to-green-900/40 border-emerald-500/30 p-8 hover:border-emerald-400/60 transition-all cursor-pointer backdrop-blur-xl h-full flex flex-col justify-between"
                    onClick={() => setExpandedRisk(expandedRisk === index ? null : index)}>
                    <div>
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-emerald-100 mb-2">{risk.title}</h3>
                          <div className="text-red-400 font-bold text-xs">{risk.impact}</div>
                        </div>
                        <ChevronDown className={`w-6 h-6 text-emerald-400 transition-transform ${expandedRisk === index ? "rotate-180" : ""}`} />
                      </div>

                      {/* Plain Analogy Spotlight */}
                      <div className="mb-4 bg-black/40 border border-emerald-500/10 p-4 rounded-xl text-xs text-slate-300 italic">
                        <strong className="text-emerald-400 block mb-1">Plain English Analogy:</strong>
                        {risk.analogy}
                      </div>

                      <p className="text-sm text-emerald-200/80 mb-4">{risk.description}</p>
                    </div>
                    
                    {expandedRisk === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-4 pt-4 border-t border-emerald-500/30">
                        <div>
                          <div className="text-xs font-semibold text-red-400 uppercase tracking-wide mb-1">The Reality</div>
                          <p className="text-xs text-slate-300">{risk.reality}</p>
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-green-400 uppercase tracking-wide mb-1">How We Fix It</div>
                          <p className="text-xs text-emerald-100">{risk.solution}</p>
                        </div>
                      </motion.div>
                    )}
                  </Card>
                </motion.div>
              ))}
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
                    <h3 className="text-2xl font-black text-white">ERISA Executive Risk Assessment</h3>
                    <p className="text-sm text-emerald-300 font-semibold">Test your actual contract rights. Are you fully compliant with new federal guidelines?</p>
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
                    <span className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">Fiduciary Confidence Rating</span>
                    <span className="text-4xl font-black text-white">{fiduciaryScore}%</span>
                    <span className="block text-xs text-emerald-300/60 mt-1">Audit status based on DOL monitoring templates</span>
                  </div>

                  <div className="text-right">
                    {fiduciaryScore === 100 ? (
                      <span className="text-emerald-400 font-bold flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Fully Secure Status</span>
                    ) : fiduciaryScore >= 60 ? (
                      <span className="text-yellow-400 font-bold flex items-center gap-1.5"><AlertCircle className="w-4 h-4" /> Compliance Gaps Detected</span>
                    ) : (
                      <span className="text-red-400 font-bold flex items-center gap-1.5"><AlertTriangle className="w-4 h-4" /> Direct Litigation Risk</span>
                    )}
                    <span className="block text-[11px] text-emerald-300/50 mt-1">Court rulings require executive oversight.</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Relatable Financial Tools Arsenal */}
        <section className="py-24 px-4 bg-gradient-to-b from-emerald-950/20 to-black">
          <div className="max-w-6xl mx-auto">
            <motion.div className="text-center mb-16" {...fadeInUp}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-400/30 rounded-full mb-6">
                <Calculator className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">The Fiduciary Arsenal</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-emerald-200 to-green-200 bg-clip-text text-transparent font-serif">
                Three Simple Solutions We Build For You
              </h2>
              <p className="text-xl text-emerald-300/80 max-w-3xl mx-auto">
                No new software systems or complex spreadsheets. We provide clear, executive-grade answers.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {financialTools.map((tool, index) => (
                <motion.div key={index} {...fadeInUp} transition={{ delay: index * 0.1 }}>
                  <Card className="bg-gradient-to-br from-emerald-900/40 to-green-900/40 border-emerald-500/30 p-8 hover:border-emerald-400/60 transition-all cursor-pointer backdrop-blur-xl h-full flex flex-col justify-between"
                    onClick={() => setExpandedTool(expandedTool === index ? null : index)}>
                    <div>
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 flex items-center justify-center text-emerald-300 border border-emerald-500/30">
                          {tool.icon}
                        </div>
                      </div>
                      
                      <div className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-1">{tool.simpleTitle}</div>
                      <h3 className="text-xl font-bold text-white mb-3">{tool.title}</h3>
                      <p className="text-sm text-slate-300 leading-relaxed mb-6">{tool.description}</p>
                    </div>
                    
                    <div className="text-xs font-semibold text-green-400 bg-green-500/10 px-3 py-2.5 rounded-lg border border-green-500/30 text-center">
                      {tool.outcome}
                    </div>
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
                    <span className="text-sm font-black text-white uppercase tracking-wider">📊 Free EBITDA Recovery Assessment 📊</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-emerald-200 via-white to-green-200 bg-clip-text text-transparent font-serif">
                    Map Your Plan's True Savings
                  </h2>
                  <p className="text-xl text-emerald-100">
                    Get an itemized contract health check and estimated year-1 savings in 48 hours.
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
                        placeholder="e.g. John Smith"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-emerald-100 mb-2 uppercase tracking-wide">Work Email</label>
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
                      <label className="block text-sm font-bold text-emerald-100 mb-2 uppercase tracking-wide">Company Name</label>
                      <input
                        type="text"
                        required
                        className="w-full px-5 py-4 bg-black/60 border-2 border-emerald-400/40 rounded-xl text-white placeholder-emerald-300/50 focus:outline-none focus:border-emerald-300 focus:shadow-[0_0_20px_rgba(16,185,129,0.5)] transition-all"
                        placeholder="Acme Corporation"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-emerald-100 mb-2 uppercase tracking-wide">Annual Pharmacy Spend</label>
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
                      className="w-full bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 hover:from-emerald-400 hover:via-green-400 hover:to-teal-400 text-white text-xl font-bold py-8 shadow-[0_0_40px_rgba(16,185,129,0.9)] hover:shadow-[0_0_60px_rgba(16,185,129,1)] uppercase tracking-wider border-2 border-white/50"
                    >
                      Analyze My Plan
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  
                  <p className="text-xs text-center text-emerald-200">
                    By submitting, you agree to receive communications about Kincaid Health cost optimization solutions. Unsubscribe anytime.
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
              <h2 className="text-4xl md:text-5xl font-black mb-8 bg-gradient-to-r from-emerald-200 to-green-200 bg-clip-text text-transparent font-serif">
                Stop Guessing. Start Saving.
              </h2>
              <p className="text-xl text-emerald-200 mb-12">
                Schedule a brief 30-minute introductory call to explore our 10:1 ROI guarantee.
              </p>
              <Link href="/request-demo">
                <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white text-lg px-12 py-8 shadow-2xl shadow-emerald-500/50">
                  Book 30-Min Call
                  <DollarSign className="w-5 h-5 ml-3" />
                </Button>
              </Link>
              <p className="text-xs text-emerald-400 mt-6">
                No technical jargon • Completely ROI-focused • Free valuation projection report
              </p>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}