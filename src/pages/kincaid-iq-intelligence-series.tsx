import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Brain, 
  TrendingUp, 
  Shield, 
  Target, 
  Zap, 
  FileText,
  ChevronRight,
  CheckCircle2,
  ArrowRight,
  DollarSign,
  Activity,
  Users,
  Building2,
  Briefcase,
  Upload,
  Clock,
  Lock,
  Eye,
  AlertTriangle,
  Search,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

// Data Models
const intelligenceModules = [
  {
    id: "drap",
    title: "DRAP Analysis",
    subtitle: "Drug Rebate Analysis Panel",
    description: "Forensic decomposition of pharmacy spread and rebate economics. Uncovers hidden margin layers between AWP, WAC, MAC, and NADAC benchmarks.",
    deliverables: [
      "Spread decomposition by drug class",
      "MAC list arbitrage quantification",
      "Rebate guarantee validation",
      "Benchmark comparison against NADAC"
    ],
    turnaround: "3-5 days",
    price: "$4,500",
    icon: <Activity className="w-6 h-6" />,
    color: "text-cyan-400",
    borderColor: "border-cyan-500/30",
    bgGradient: "from-cyan-950/40 to-blue-950/40"
  },
  {
    id: "trend",
    title: "Trend Projection",
    subtitle: "Multi-Year Cost Modeling",
    description: "Actuarial-grade trend forecasting using credibility-weighted analysis. Models medical and pharmacy cost trajectories with Monte Carlo bands.",
    deliverables: [
      "5-year trend projections with P50/P90",
      "Credibility weighting analysis",
      "Intervention scenario modeling",
      "Budget impact analysis"
    ],
    turnaround: "5-7 days",
    price: "$6,500",
    icon: <TrendingUp className="w-6 h-6" />,
    color: "text-violet-400",
    borderColor: "border-violet-500/30",
    bgGradient: "from-violet-950/40 to-purple-950/40"
  },
  {
    id: "volatility",
    title: "Volatility Dashboard",
    subtitle: "Risk Quantification",
    description: "Stochastic modeling of claims volatility. Identifies catastrophic risk exposure and optimal stop-loss attachment points.",
    deliverables: [
      "Monte Carlo simulation (5,000+ iterations)",
      "Catastrophic claim probability",
      "Stop-loss attachment recommendations",
      "Risk transfer financial analysis"
    ],
    turnaround: "5-7 days",
    price: "$7,500",
    icon: <Shield className="w-6 h-6" />,
    color: "text-emerald-400",
    borderColor: "border-emerald-500/30",
    bgGradient: "from-emerald-950/40 to-teal-950/40"
  },
  {
    id: "intervention",
    title: "Intervention Simulator",
    subtitle: "Cost Compression Modeling",
    description: "Quantifies financial impact of 12+ cost containment strategies. Models savings durability and ROI across 3-year horizon.",
    deliverables: [
      "Savings projections for PBM optimization",
      "Durability analysis (Year 1-3)",
      "Implementation cost vs. net ROI",
      "Prioritized intervention roadmap"
    ],
    turnaround: "7-10 days",
    price: "$8,500",
    icon: <Target className="w-6 h-6" />,
    color: "text-orange-400",
    borderColor: "border-orange-500/30",
    bgGradient: "from-orange-950/40 to-red-950/40"
  },
  {
    id: "ebitda",
    title: "EBITDA Impact",
    subtitle: "P&L Translation for Board",
    description: "Translates healthcare savings into earnings impact. Models margin expansion scenarios for private equity and Board presentations.",
    deliverables: [
      "3-year cumulative savings projection",
      "EBITDA margin expansion modeling",
      "Enterprise value impact",
      "Board-ready executive summary"
    ],
    turnaround: "5-7 days",
    price: "$9,500",
    icon: <DollarSign className="w-6 h-6" />,
    color: "text-amber-400",
    borderColor: "border-amber-500/30",
    bgGradient: "from-amber-950/40 to-yellow-950/40"
  },
  {
    id: "broker-comp",
    title: "Broker Comp Study",
    subtitle: "Conflict Mapping",
    description: "Forensic analysis of broker compensation structures. Maps PBM-to-broker payment flows including hidden overrides.",
    deliverables: [
      "Complete compensation mapping",
      "Benchmark vs. fiduciary best practices",
      "Conflict-of-interest assessment",
      "Plain-English fiduciary summary"
    ],
    turnaround: "3-5 days",
    price: "$3,500",
    icon: <Search className="w-6 h-6" />,
    color: "text-rose-400",
    borderColor: "border-rose-500/30",
    bgGradient: "from-rose-950/40 to-pink-950/40"
  }
];

const intelligenceChallenges = [
  {
    icon: AlertTriangle,
    title: "The CFO's Dilemma",
    reality: "Healthcare costs are rising 8-12%, destroying EBITDA. Consultants say 'it's just the market'.",
    impact: "You're forced to cut benefits or absorb margin compression without knowing if you're actually overpaying.",
    solution: "DRAP Analysis + Trend Projection quantifies exact leakage and models recovery."
  },
  {
    icon: Shield,
    title: "The Fiduciary Risk",
    reality: "Board asks if PBM pricing is defensible. You only have vendor-provided reporting to show them.",
    impact: "Regulatory exposure under CAA, potential class action risk for imprudent plan management.",
    solution: "Broker Comp Study + Contract X-Ray provides independent, auditable oversight."
  },
  {
    icon: Target,
    title: "The Implementation Trap",
    reality: "You're pitched 20 different point solutions, each promising 3:1 ROI.",
    impact: "Vendor fatigue, overlapping fees, and promised savings never hit the bottom line.",
    solution: "Intervention Simulator models realistic net ROI before you buy any solution."
  },
  {
    icon: Zap,
    title: "The Time Constraint",
    reality: "Traditional actuarial studies take 3-6 months and cost $150K+.",
    impact: "By the time you get the data, the renewal window is closed and leverage is gone.",
    solution: "Modular intelligence delivered in 3-10 days for $3K-$9K per report."
  }
];

const implementationFramework = [
  {
    phase: "Data Ingestion (Days 1-2)",
    objective: "Secure transfer and normalization",
    deliverables: [
      "Upload PBM contract and amendments via secure portal",
      "Submit de-identified claims data & census",
      "Automated NDA/BAA execution",
      "Data quality validation"
    ]
  },
  {
    phase: "Actuarial Modeling (Days 3-7)",
    objective: "Forensic analysis and scenario testing",
    deliverables: [
      "NADAC benchmark comparison executed",
      "Spread and rebate economics decomposed",
      "Monte Carlo simulations run (if ordered)",
      "Intervention ROI modeled"
    ]
  },
  {
    phase: "Executive Synthesis (Days 8-10)",
    objective: "Translation to Board-ready formats",
    deliverables: [
      "Actuary peer review of findings",
      "EBITDA translation applied",
      "Executive summary drafted",
      "Final reports delivered via secure vault"
    ]
  }
];

export default function KincaidIQIntelligenceSeries() {
  const [selectedChallenge, setSelectedChallenge] = useState<number | null>(null);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  return (
    <>
      <Head>
        <title>Kincaid IQ Intelligence Series | SiriusB iQ</title>
        <meta name="description" content="Modular actuarial intelligence reports for CFOs, PE operators, and Board members. Delivered in 3-10 days." />
      </Head>

      <Nav />

      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-violet-950/20 to-black text-white pt-24">
        
        {/* Dramatic Hero Section */}
        <section className="relative pt-20 pb-32 px-4 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2832&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay" />
          </div>
          
          <div className="relative max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-3 px-5 py-2 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 border border-violet-400/30 rounded-full mb-8 backdrop-blur-sm">
                  <Brain className="w-5 h-5 text-violet-300" />
                  <span className="text-sm font-semibold text-violet-200">Modular Actuarial Intelligence</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
                  Stop Guessing.<br />
                  <span className="bg-gradient-to-r from-violet-400 via-fuchsia-300 to-pink-400 bg-clip-text text-transparent">
                    Start Quantifying.
                  </span>
                </h1>
                
                <p className="text-2xl text-slate-300 mb-8 leading-relaxed">
                  Forensic actuarial reports that uncover hidden healthcare costs, model intervention scenarios, and translate findings into EBITDA impact.
                </p>
                
                <p className="text-lg text-violet-200/80 mb-10 border-l-4 border-violet-500 pl-4 py-2">
                  No 6-month consulting engagements. Pick the modules you need. Get Board-ready results in 3-10 days.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="#modules">
                    <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white text-lg px-8 py-6 shadow-2xl shadow-violet-500/30">
                      Explore Modules
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/upload-pbm-contract">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-violet-500/50 text-violet-200 hover:bg-violet-500/20 text-lg px-8 py-6">
                      Upload Contract Securely
                      <Upload className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="relative hidden lg:block"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-2xl blur-3xl opacity-20 animate-pulse" />
                <Card className="relative bg-black/40 border-2 border-violet-500/30 p-2 shadow-2xl shadow-violet-500/20 backdrop-blur-xl overflow-hidden rounded-2xl max-w-md mx-auto">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500" />
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl">
                    <Image
                      src="/jeremiah-shrack-corporate.png"
                      alt="Jeremiah Shrack"
                      fill
                      className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 bg-slate-900/95 backdrop-blur-md border border-violet-500/30 rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-white">Jeremiah Shrack</p>
                      <p className="text-xs text-violet-400 font-mono">Chief Actuary & Founder</p>
                    </div>
                    <Badge className="bg-violet-500/20 text-violet-300 border-violet-500/30">Fiduciary Lead</Badge>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Interactive Challenges Section */}
        <section className="py-24 px-4 bg-slate-950 border-y border-white/5 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,0.05),transparent_70%)]" />
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                The Executive Intelligence Gap
              </h2>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                Why traditional consulting fails the modern C-Suite
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {intelligenceChallenges.map((challenge, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    className="bg-slate-900/50 border-slate-700/50 p-8 h-full cursor-pointer hover:border-violet-500/50 hover:bg-slate-800/50 transition-all group"
                    onClick={() => setSelectedChallenge(selectedChallenge === index ? null : index)}
                  >
                    <div className="flex items-start gap-4 mb-6">
                      <div className="bg-slate-800 rounded-xl p-4 group-hover:bg-violet-900/50 transition-colors flex-shrink-0">
                        <challenge.icon className="w-8 h-8 text-violet-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-3">{challenge.title}</h3>
                        <div className="space-y-4">
                          <div>
                            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">The Reality</div>
                            <p className="text-slate-300 text-sm">{challenge.reality}</p>
                          </div>
                          <div>
                            <div className="text-xs font-bold uppercase tracking-wider text-rose-500 mb-1">The Impact</div>
                            <p className="text-rose-200/80 text-sm">{challenge.impact}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {selectedChallenge === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="bg-gradient-to-r from-violet-900/30 to-fuchsia-900/30 rounded-xl p-5 border border-violet-500/30 mt-6"
                      >
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="text-sm font-bold text-violet-300 mb-1">The Intelligence Module Fix:</div>
                            <p className="text-violet-100/90 text-sm leading-relaxed">{challenge.solution}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Intelligence Modules Grid */}
        <section id="modules" className="py-24 px-4 relative">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="bg-violet-500/10 text-violet-400 border-violet-500/30 mb-6">À La Carte Intelligence</Badge>
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
                The Intelligence Modules
              </h2>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                Order individually or bundle. No retainers. No scope creep.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {intelligenceModules.map((module, index) => (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex flex-col"
                >
                  <Card className={`relative flex flex-col h-full bg-slate-900 border ${module.borderColor} hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] transition-all overflow-hidden group`}>
                    {/* Header Accent */}
                    <div className={`h-2 w-full bg-gradient-to-r ${module.bgGradient} opacity-50`} />
                    
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-6">
                        <div className={`p-3 rounded-xl bg-slate-800 ${module.color}`}>
                          {module.icon}
                        </div>
                        <Badge variant="outline" className="border-slate-700 text-slate-400 bg-slate-900">
                          <Clock className="w-3 h-3 mr-1" />
                          {module.turnaround}
                        </Badge>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-1">{module.title}</h3>
                      <p className={`text-sm font-medium ${module.color} mb-4`}>{module.subtitle}</p>
                      
                      <p className="text-slate-400 text-sm mb-6 flex-1">
                        {module.description}
                      </p>

                      <div className="space-y-2 border-t border-slate-800 pt-6 mt-auto">
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Included Deliverables:</div>
                        {module.deliverables.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                            <span className="text-xs text-slate-300">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-6 bg-slate-950/50 border-t border-slate-800 flex items-center justify-between mt-auto">
                      <div className={`text-2xl font-black ${module.color}`}>{module.price}</div>
                      <Button variant="ghost" className={`hover:bg-slate-800 ${module.color}`}>
                        Details <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Implementation Framework */}
        <section className="py-24 px-4 bg-slate-950 border-y border-white/5">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
                How It Actually Works
              </h2>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                No 6-month discovery phases. We move from data ingestion to Board presentation in days.
              </p>
            </motion.div>

            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-8 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
              {implementationFramework.map((phase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                >
                  <div className="flex items-center justify-center w-16 h-16 rounded-full border-4 border-slate-950 bg-slate-800 text-violet-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10">
                    <span className="font-bold text-xl">{index + 1}</span>
                  </div>
                  
                  <div className="w-[calc(100%-5rem)] md:w-[calc(50%-3rem)] p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-violet-500/30 transition-colors">
                    <h3 className="font-bold text-xl text-white mb-1">{phase.phase}</h3>
                    <p className="text-violet-400 text-sm font-medium mb-4">{phase.objective}</p>
                    <ul className="space-y-2">
                      {phase.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* High-Impact Success Stories */}
        <section className="py-24 px-4 bg-black">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-emerald-200 to-teal-200 bg-clip-text text-transparent">
                Verifiable Results
              </h2>
              <p className="text-xl text-emerald-100/70 max-w-3xl mx-auto">
                What happens when you deploy forensic intelligence against PBM contracts
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Detailed Case Study 1 */}
              <Card className="bg-gradient-to-br from-slate-900 to-emerald-950/20 border-emerald-500/30 p-8">
                <div className="flex justify-between items-start mb-6">
                  <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30">PE Portfolio Company</Badge>
                  <div className="text-right">
                    <div className="text-sm text-slate-400">Time to Insights</div>
                    <div className="text-lg font-bold text-emerald-400">7 Days</div>
                  </div>
                </div>
                
                <h3 className="text-3xl font-black text-white mb-2">$2.1M Annual Savings Identified</h3>
                <p className="text-slate-400 mb-6">Manufacturing | 850 lives | $12M spend</p>
                
                <div className="bg-slate-950/50 rounded-xl p-5 border border-slate-800 mb-6">
                  <div className="text-sm font-bold text-slate-300 mb-2">The Catalyst:</div>
                  <p className="text-slate-400 text-sm">CFO ordered DRAP Analysis + Intervention Simulator after Board questioned PBM pricing. Found 34% spread on 8 specialty drugs.</p>
                </div>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-slate-200 font-medium">Renegotiated PBM contract with 6% lower net cost</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-slate-200 font-medium">$800K in recoverable rebate under-remittance identified</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-slate-200 font-medium">$2.1M recognized as EBITDA improvement in Q2</span>
                  </div>
                </div>
                
                <div className="border-l-4 border-emerald-500 pl-4 py-2">
                  <p className="text-slate-300 italic">"The EBITDA Impact Report gave us the exact P&L line items to present to our sponsor. We closed the renegotiation in 45 days."</p>
                  <p className="text-emerald-400 text-sm font-bold mt-2">— CFO, Midwest Manufacturing</p>
                </div>
              </Card>

              {/* Detailed Case Study 2 */}
              <Card className="bg-gradient-to-br from-slate-900 to-violet-950/20 border-violet-500/30 p-8">
                <div className="flex justify-between items-start mb-6">
                  <Badge className="bg-violet-500/10 text-violet-400 border-violet-500/30">Health System</Badge>
                  <div className="text-right">
                    <div className="text-sm text-slate-400">Time to Insights</div>
                    <div className="text-lg font-bold text-violet-400">5 Days</div>
                  </div>
                </div>
                
                <h3 className="text-3xl font-black text-white mb-2">Prevented $4.8M Overpayment</h3>
                <p className="text-slate-400 mb-6">Regional Hospital | 3,200 lives | $38M spend</p>
                
                <div className="bg-slate-950/50 rounded-xl p-5 border border-slate-800 mb-6">
                  <div className="text-sm font-bold text-slate-300 mb-2">The Catalyst:</div>
                  <p className="text-slate-400 text-sm">Ordered Volatility Dashboard + Trend Projection before renewing stop-loss policy. Monte Carlo simulation showed carrier pricing 18% above fair value.</p>
                </div>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-violet-500 flex-shrink-0" />
                    <span className="text-slate-200 font-medium">Presented credibility-weighted trend analysis to carrier</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-violet-500 flex-shrink-0" />
                    <span className="text-slate-200 font-medium">Negotiated 12% premium reduction with hard evidence</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-violet-500 flex-shrink-0" />
                    <span className="text-slate-200 font-medium">$4.8M three-year savings vs. initial quote</span>
                  </div>
                </div>
                
                <div className="border-l-4 border-violet-500 pl-4 py-2">
                  <p className="text-slate-300 italic">"The P90/P95 downside metrics gave us the exact language to push back on the carrier's pricing. They couldn't refute our actuarial model."</p>
                  <p className="text-violet-400 text-sm font-bold mt-2">— VP Benefits, Regional Health System</p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Lead Capture / Toolkit CTA */}
        <section className="py-24 px-4 border-t border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-violet-950/30 to-black" />
          <div className="max-w-4xl mx-auto relative z-10">
            <Card className="bg-black/60 border-2 border-violet-500/50 p-8 md:p-12 shadow-[0_0_50px_rgba(139,92,246,0.3)] backdrop-blur-xl">
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-violet-500/20 mb-6">
                  <Lock className="w-8 h-8 text-violet-400" />
                </div>
                <h2 className="text-4xl font-black mb-4 text-white">
                  Get the Sample Report Vault
                </h2>
                <p className="text-xl text-slate-300">
                  Download redacted examples of actual DRAP, Trend, and EBITDA impact reports delivered to clients.
                </p>
              </div>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">Work Email</label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
                      placeholder="name@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">Company Name</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
                      placeholder="Acme Corp"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-violet-600 hover:bg-violet-700 text-white text-xl py-6 shadow-lg shadow-violet-600/25"
                  >
                    Access Sample Reports Now
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
                <p className="text-center text-xs text-slate-500 flex items-center justify-center gap-2 mt-4">
                  <Shield className="w-3 h-3" /> Secure process. We never share your information.
                </p>
              </form>
            </Card>
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
}