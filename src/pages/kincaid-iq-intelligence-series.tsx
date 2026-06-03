import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
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
  BarChart3,
  Activity,
  Users,
  Building2,
  Briefcase,
  Download,
  Upload,
  Clock,
  Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type IntelligenceModule = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  turnaround: string;
  price: string;
  icon: React.ReactNode;
  color: string;
  borderColor: string;
  bgGradient: string;
};

const intelligenceModules: IntelligenceModule[] = [
  {
    id: "drap",
    title: "DRAP Analysis",
    subtitle: "Drug Rebate Analysis Panel",
    description: "Forensic decomposition of pharmacy spread and rebate economics. Uncovers hidden margin layers between AWP, WAC, MAC, and NADAC benchmarks.",
    deliverables: [
      "Spread decomposition by drug class (Brand, Generic, Specialty)",
      "MAC list arbitrage quantification",
      "Rebate guarantee validation vs. actual performance",
      "Benchmark comparison against NADAC floor pricing"
    ],
    turnaround: "3-5 business days",
    price: "$4,500",
    icon: <Activity className="w-6 h-6" />,
    color: "text-cyan-400",
    borderColor: "border-cyan-500/30",
    bgGradient: "from-cyan-950/40 to-blue-950/40"
  },
  {
    id: "trend",
    title: "Trend Projection Report",
    subtitle: "Multi-Year Cost Modeling",
    description: "Actuarial-grade trend forecasting using credibility-weighted analysis. Models medical and pharmacy cost trajectories with Monte Carlo uncertainty bands.",
    deliverables: [
      "5-year trend projections with P50/P90 confidence intervals",
      "Credibility weighting based on group size and loss history",
      "Intervention scenario modeling (utilization management, formulary changes)",
      "Budget impact analysis for CFO planning"
    ],
    turnaround: "5-7 business days",
    price: "$6,500",
    icon: <TrendingUp className="w-6 h-6" />,
    color: "text-violet-400",
    borderColor: "border-violet-500/30",
    bgGradient: "from-violet-950/40 to-purple-950/40"
  },
  {
    id: "volatility",
    title: "Volatility Dashboard",
    subtitle: "Risk Quantification & Stop-Loss Optimization",
    description: "Stochastic modeling of claims volatility. Identifies catastrophic risk exposure and optimal stop-loss attachment points using actuarial loss distributions.",
    deliverables: [
      "Monte Carlo simulation (5,000+ iterations) of annual cost variance",
      "Catastrophic claim probability modeling",
      "Stop-loss attachment point recommendations",
      "Risk transfer vs. self-insurance financial analysis"
    ],
    turnaround: "5-7 business days",
    price: "$7,500",
    icon: <Shield className="w-6 h-6" />,
    color: "text-emerald-400",
    borderColor: "border-emerald-500/30",
    bgGradient: "from-emerald-950/40 to-teal-950/40"
  },
  {
    id: "intervention",
    title: "Intervention Simulator",
    subtitle: "Cost Compression Strategy Modeling",
    description: "Quantifies financial impact of 12+ cost containment strategies. Models savings durability and ROI across 3-year implementation horizon.",
    deliverables: [
      "Savings projections for PBM formulary optimization, network steerage, UM programs",
      "Durability analysis (Year 1/2/3 savings persistence)",
      "Implementation cost vs. net savings ROI modeling",
      "Prioritized intervention roadmap based on impact and feasibility"
    ],
    turnaround: "7-10 business days",
    price: "$8,500",
    icon: <Target className="w-6 h-6" />,
    color: "text-orange-400",
    borderColor: "border-orange-500/30",
    bgGradient: "from-orange-950/40 to-red-950/40"
  },
  {
    id: "ebitda",
    title: "EBITDA Impact Report",
    subtitle: "P&L Translation for PE/Board",
    description: "Translates healthcare savings into earnings impact. Models margin expansion scenarios for private equity operators and Board presentations.",
    deliverables: [
      "3-year cumulative savings projection with present value calculation",
      "EBITDA margin expansion modeling",
      "Enterprise value impact (savings × industry EBITDA multiple)",
      "Board-ready executive summary and presentation deck"
    ],
    turnaround: "5-7 business days",
    price: "$9,500",
    icon: <DollarSign className="w-6 h-6" />,
    color: "text-amber-400",
    borderColor: "border-amber-500/30",
    bgGradient: "from-amber-950/40 to-yellow-950/40"
  },
  {
    id: "broker-comp",
    title: "Broker Compensation Study",
    subtitle: "Conflict-of-Interest Mapping",
    description: "Forensic analysis of broker compensation structures. Maps PBM-to-broker payment flows including hidden overrides, volume bonuses, and undisclosed administrative fees.",
    deliverables: [
      "Complete compensation mapping across all contract documents",
      "Benchmark vs. fiduciary best practices",
      "Conflict-of-interest exposure assessment",
      "Plain-English summary for Board fiduciary review"
    ],
    turnaround: "3-5 business days",
    price: "$3,500",
    icon: <Users className="w-6 h-6" />,
    color: "text-rose-400",
    borderColor: "border-rose-500/30",
    bgGradient: "from-rose-950/40 to-pink-950/40"
  }
];

type Persona = {
  id: string;
  title: string;
  icon: React.ReactNode;
  painPoints: string[];
  recommendedModules: string[];
  color: string;
};

const personas: Persona[] = [
  {
    id: "cfo",
    title: "CFO / Finance",
    icon: <Building2 className="w-5 h-5" />,
    painPoints: [
      "Healthcare costs growing 8-12% annually, destroying margin",
      "Board asking if we're getting ripped off by our PBM",
      "Need hard numbers for budget planning, not consultant hand-waving"
    ],
    recommendedModules: ["broker-comp", "trend", "ebitda"],
    color: "text-blue-400"
  },
  {
    id: "pe",
    title: "PE Operators",
    icon: <Briefcase className="w-5 h-5" />,
    painPoints: [
      "Platform company EBITDA eroding from unmanaged healthcare spend",
      "Need quantified savings to justify add-on acquisitions",
      "Portfolio company CFOs don't have actuarial sophistication"
    ],
    recommendedModules: ["ebitda", "intervention", "volatility"],
    color: "text-violet-400"
  },
  {
    id: "board",
    title: "Board Members",
    icon: <Users className="w-5 h-5" />,
    painPoints: [
      "Fiduciary duty to ensure healthcare costs are reasonable",
      "No visibility into whether PBM pricing is competitive",
      "Risk of DOL audit finding breach of prudence"
    ],
    recommendedModules: ["broker-comp", "drap", "ebitda"],
    color: "text-emerald-400"
  },
  {
    id: "hr",
    title: "CHRO / Benefits",
    icon: <Users className="w-5 h-5" />,
    painPoints: [
      "Renewal shock forcing plan design cuts that hurt employee morale",
      "Broker says 'market conditions,' but is that actually true?",
      "Need evidence-based intervention strategies, not vendor sales pitches"
    ],
    recommendedModules: ["trend", "intervention", "drap"],
    color: "text-amber-400"
  }
];

export default function KincaidIQIntelligenceSeries() {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [selectedPersona, setSelectedPersona] = useState<string>("cfo");

  const currentPersona = personas.find(p => p.id === selectedPersona);

  return (
    <>
      <Head>
        <title>Kincaid IQ Intelligence Series | SiriusB iQ</title>
        <meta name="description" content="Modular actuarial intelligence reports for CFOs, PE operators, and Board members. DRAP analysis, trend projections, volatility modeling, and EBITDA impact studies delivered in 3-10 days." />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#111] to-[#0a0a0a]">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-white/5 py-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_50%)]" />
          
          <div className="container relative z-10 mx-auto px-6">
            <div className="mx-auto max-w-4xl text-center">
              <Badge className="mb-6 border-violet-500/30 bg-violet-500/10 text-violet-400">
                <Brain className="mr-2 h-3 w-3" />
                Modular Actuarial Intelligence
              </Badge>
              
              <h1 className="mb-6 text-5xl font-black leading-tight text-white lg:text-7xl">
                Kincaid IQ<br />
                <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Intelligence Series
                </span>
              </h1>
              
              <p className="mb-8 text-xl text-slate-300 lg:text-2xl">
                Forensic actuarial reports that quantify hidden healthcare costs, model savings scenarios, and translate findings into EBITDA impact for Board presentations.
              </p>

              <div className="bg-gradient-to-r from-violet-950/40 to-purple-950/40 border border-violet-500/30 rounded-xl p-6 mb-8">
                <p className="text-lg text-slate-200 leading-relaxed">
                  We partner with leading actuaries and consultants to deliver SOA/AAA-compliant analysis without the 6-month engagement. 
                  Pick the modules you need. Get results in 3-10 days. Pay per report, not per seat.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href="/upload-pbm-contract">
                  <Button size="lg" className="bg-violet-600 hover:bg-violet-700 text-white">
                    <Upload className="mr-2 h-5 w-5" />
                    Upload Contract to Start
                  </Button>
                </Link>
                <Link href="#modules">
                  <Button size="lg" variant="outline" className="border-violet-500/30 bg-violet-950/20 text-violet-400 hover:bg-violet-950/40">
                    Browse Modules
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="border-b border-white/5 py-16">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <h2 className="mb-4 text-3xl font-bold text-white">How It Works</h2>
              <p className="text-slate-400">Simple, fast, and modular — not a 6-month consulting engagement</p>
            </div>

            <div className="mx-auto max-w-5xl">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                <Card className="border-violet-500/20 bg-gradient-to-br from-slate-900 to-violet-950/20 p-6">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
                    <Upload className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 font-bold text-white">1. Upload</h3>
                  <p className="text-sm text-slate-400">
                    Send us your PBM contract, census file, and claims data via secure portal
                  </p>
                </Card>

                <Card className="border-violet-500/20 bg-gradient-to-br from-slate-900 to-violet-950/20 p-6">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
                    <Target className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 font-bold text-white">2. Select Modules</h3>
                  <p className="text-sm text-slate-400">
                    Pick 1-6 intelligence reports based on your immediate priorities
                  </p>
                </Card>

                <Card className="border-violet-500/20 bg-gradient-to-br from-slate-900 to-violet-950/20 p-6">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
                    <Brain className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 font-bold text-white">3. We Analyze</h3>
                  <p className="text-sm text-slate-400">
                    Our actuarial team runs the models and validates findings with consultants
                  </p>
                </Card>

                <Card className="border-violet-500/20 bg-gradient-to-br from-slate-900 to-violet-950/20 p-6">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
                    <FileText className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 font-bold text-white">4. Get Results</h3>
                  <p className="text-sm text-slate-400">
                    Receive Board-ready reports with executive summaries in 3-10 days
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Persona Selector */}
        <section className="border-b border-white/5 py-16">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <h2 className="mb-4 text-3xl font-bold text-white">Choose Your Path</h2>
              <p className="text-slate-400">Different roles need different intelligence — we've mapped the recommended modules for your situation</p>
            </div>

            <Tabs value={selectedPersona} onValueChange={setSelectedPersona} className="mx-auto max-w-6xl">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 bg-slate-900/50 border border-white/5">
                {personas.map(persona => (
                  <TabsTrigger 
                    key={persona.id} 
                    value={persona.id}
                    className="data-[state=active]:bg-violet-600 data-[state=active]:text-white"
                  >
                    <span className="mr-2">{persona.icon}</span>
                    {persona.title}
                  </TabsTrigger>
                ))}
              </TabsList>

              {personas.map(persona => (
                <TabsContent key={persona.id} value={persona.id} className="mt-8">
                  <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {/* Pain Points */}
                    <Card className="border-red-500/20 bg-gradient-to-br from-slate-900 to-red-950/10 p-6">
                      <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-white">
                        <span className={persona.color}>{persona.icon}</span>
                        Your Challenges
                      </h3>
                      <ul className="space-y-3">
                        {persona.painPoints.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                            <span className="text-red-400 shrink-0">•</span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </Card>

                    {/* Recommended Modules */}
                    <Card className="border-emerald-500/20 bg-gradient-to-br from-slate-900 to-emerald-950/10 p-6">
                      <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-white">
                        <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                        Recommended Modules
                      </h3>
                      <div className="space-y-3">
                        {persona.recommendedModules.map(moduleId => {
                          const intelligenceModule = intelligenceModules.find(m => m.id === moduleId);
                          if (!intelligenceModule) return null;
                          return (
                            <div 
                              key={moduleId} 
                              className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-800/30 p-3 cursor-pointer hover:border-emerald-500/30 transition-colors"
                              onClick={() => {
                                setSelectedModule(moduleId);
                                document.getElementById('modules')?.scrollIntoView({ behavior: 'smooth' });
                              }}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`${intelligenceModule.color}`}>
                                  {intelligenceModule.icon}
                                </div>
                                <div>
                                  <p className="font-semibold text-white">{intelligenceModule.title}</p>
                                  <p className="text-xs text-slate-400">{intelligenceModule.turnaround}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className={`font-bold ${intelligenceModule.color}`}>{intelligenceModule.price}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="mt-6 pt-6 border-t border-slate-700">
                        <p className="text-sm text-slate-400 mb-3">Total Investment:</p>
                        <p className="text-2xl font-bold text-emerald-400">
                          ${persona.recommendedModules.reduce((total, id) => {
                            const intelligenceModule = intelligenceModules.find(m => m.id === id);
                            return total + (intelligenceModule ? parseInt(intelligenceModule.price.replace(/[$,]/g, '')) : 0);
                          }, 0).toLocaleString()}
                        </p>
                      </div>
                    </Card>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Intelligence Modules */}
        <section id="modules" className="border-b border-white/5 py-16">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <h2 className="mb-4 text-3xl font-bold text-white">Intelligence Modules</h2>
              <p className="text-slate-400">Each module is a standalone forensic report. Order individually or bundle for comprehensive analysis.</p>
            </div>

            <div className="mx-auto max-w-6xl">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                {intelligenceModules.map((module) => (
                  <motion.div
                    key={module.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className={`border ${module.borderColor} bg-gradient-to-br ${module.bgGradient} p-6 h-full flex flex-col ${selectedModule === module.id ? 'ring-2 ring-violet-500' : ''}`}>
                      <div className="mb-4 flex items-start justify-between">
                        <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg bg-slate-900/50 ${module.color}`}>
                          {module.icon}
                        </div>
                        <div className="text-right">
                          <Badge className="border-current text-current" variant="outline">
                            {module.turnaround}
                          </Badge>
                        </div>
                      </div>

                      <h3 className="mb-2 text-xl font-bold text-white">{module.title}</h3>
                      <p className={`mb-4 text-sm font-medium ${module.color}`}>{module.subtitle}</p>
                      <p className="mb-6 text-sm text-slate-300 flex-1">{module.description}</p>

                      <div className="mb-6 rounded-lg border border-slate-700 bg-slate-900/50 p-4">
                        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-400">Deliverables</p>
                        <ul className="space-y-2">
                          {module.deliverables.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                              <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-emerald-500" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-slate-400">Price</p>
                          <p className={`text-2xl font-bold ${module.color}`}>{module.price}</p>
                        </div>
                        <Button className={`bg-violet-600 hover:bg-violet-700 text-white`}>
                          Order Module
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Bundle Pricing */}
        <section className="border-b border-white/5 py-16">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <h2 className="mb-4 text-3xl font-bold text-white">Bundle & Save</h2>
              <p className="text-slate-400">Order multiple modules together for comprehensive intelligence at a discounted rate</p>
            </div>

            <div className="mx-auto max-w-5xl">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Starter Bundle */}
                <Card className="border-cyan-500/30 bg-gradient-to-br from-slate-900 to-cyan-950/20 p-6">
                  <Badge className="mb-4 border-cyan-500/30 bg-cyan-500/10 text-cyan-400">Starter</Badge>
                  <h3 className="mb-2 text-2xl font-bold text-white">CFO Quick-Start</h3>
                  <p className="mb-6 text-sm text-slate-400">Answer the Board's top 3 questions</p>
                  
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-4xl font-black text-cyan-400">$12,500</span>
                      <span className="text-slate-500 line-through">$14,500</span>
                    </div>
                    <p className="text-xs text-emerald-400">Save $2,000</p>
                  </div>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <CheckCircle2 className="h-4 w-4 text-cyan-500" />
                      Broker Compensation Study
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <CheckCircle2 className="h-4 w-4 text-cyan-500" />
                      DRAP Analysis
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <CheckCircle2 className="h-4 w-4 text-cyan-500" />
                      Trend Projection Report
                    </div>
                  </div>

                  <Button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white">
                    Order Bundle
                  </Button>
                </Card>

                {/* Professional Bundle */}
                <Card className="border-violet-500/30 bg-gradient-to-br from-slate-900 to-violet-950/20 p-6 ring-2 ring-violet-500/50">
                  <Badge className="mb-4 border-violet-500/30 bg-violet-500/10 text-violet-400">Most Popular</Badge>
                  <h3 className="mb-2 text-2xl font-bold text-white">Executive Suite</h3>
                  <p className="mb-6 text-sm text-slate-400">Full actuarial intelligence + Board presentation</p>
                  
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-4xl font-black text-violet-400">$24,500</span>
                      <span className="text-slate-500 line-through">$30,500</span>
                    </div>
                    <p className="text-xs text-emerald-400">Save $6,000</p>
                  </div>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <CheckCircle2 className="h-4 w-4 text-violet-500" />
                      All Starter modules
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <CheckCircle2 className="h-4 w-4 text-violet-500" />
                      Volatility Dashboard
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <CheckCircle2 className="h-4 w-4 text-violet-500" />
                      Intervention Simulator
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <CheckCircle2 className="h-4 w-4 text-violet-500" />
                      EBITDA Impact Report
                    </div>
                  </div>

                  <Button className="w-full bg-violet-600 hover:bg-violet-700 text-white">
                    Order Bundle
                  </Button>
                </Card>

                {/* Enterprise Bundle */}
                <Card className="border-amber-500/30 bg-gradient-to-br from-slate-900 to-amber-950/20 p-6">
                  <Badge className="mb-4 border-amber-500/30 bg-amber-500/10 text-amber-400">Enterprise</Badge>
                  <h3 className="mb-2 text-2xl font-bold text-white">Complete Intelligence</h3>
                  <p className="mb-6 text-sm text-slate-400">All 6 modules + quarterly updates</p>
                  
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-4xl font-black text-amber-400">$35,000</span>
                      <span className="text-slate-500 line-through">$40,000</span>
                    </div>
                    <p className="text-xs text-emerald-400">Save $5,000</p>
                  </div>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <CheckCircle2 className="h-4 w-4 text-amber-500" />
                      All 6 intelligence modules
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <CheckCircle2 className="h-4 w-4 text-amber-500" />
                      Quarterly trend updates (Year 1)
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <CheckCircle2 className="h-4 w-4 text-amber-500" />
                      Priority turnaround (3-5 days)
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <CheckCircle2 className="h-4 w-4 text-amber-500" />
                      Board presentation support
                    </div>
                  </div>

                  <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                    Order Bundle
                  </Button>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Security & Compliance */}
        <section className="border-b border-white/5 py-16">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-4xl">
              <Card className="border-slate-700 bg-slate-900/50 p-8">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-emerald-500/10 p-3">
                    <Lock className="h-6 w-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-bold text-white">Enterprise-Grade Security</h3>
                    <p className="mb-4 text-sm text-slate-400">
                      All data transfers use 256-bit encryption. Files are processed in isolated environments and deleted after report delivery. 
                      We're HIPAA-compliant and SOC 2 Type II certified.
                    </p>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                      <div className="rounded-lg border border-slate-700 bg-slate-800/30 p-3 text-center">
                        <Shield className="mx-auto mb-1 h-5 w-5 text-emerald-400" />
                        <p className="text-xs text-slate-300">HIPAA Compliant</p>
                      </div>
                      <div className="rounded-lg border border-slate-700 bg-slate-800/30 p-3 text-center">
                        <Lock className="mx-auto mb-1 h-5 w-5 text-emerald-400" />
                        <p className="text-xs text-slate-300">SOC 2 Type II</p>
                      </div>
                      <div className="rounded-lg border border-slate-700 bg-slate-800/30 p-3 text-center">
                        <Shield className="mx-auto mb-1 h-5 w-5 text-emerald-400" />
                        <p className="text-xs text-slate-300">256-bit Encryption</p>
                      </div>
                      <div className="rounded-lg border border-slate-700 bg-slate-800/30 p-3 text-center">
                        <Clock className="mx-auto mb-1 h-5 w-5 text-emerald-400" />
                        <p className="text-xs text-slate-300">Auto-Delete After 30 Days</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="mb-6 text-4xl font-black text-white lg:text-5xl">
                Stop Guessing.<br />
                <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                  Start Quantifying.
                </span>
              </h2>
              <p className="mb-8 text-xl text-slate-300">
                Upload your contract and census data. Pick your modules. Get actuarial-grade intelligence in 3-10 days.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href="/upload-pbm-contract">
                  <Button size="lg" className="bg-violet-600 hover:bg-violet-700 text-white">
                    <Upload className="mr-2 h-5 w-5" />
                    Upload Contract to Start
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="border-violet-500/30 bg-violet-950/20 text-violet-400 hover:bg-violet-950/40">
                    Talk to an Actuary
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}