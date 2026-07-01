import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Users, Heart, Shield, TrendingUp, CheckCircle2, ArrowRight, Smile, AlertTriangle, DollarSign, FileText, Eye, Clock, Zap, BarChart3, Target, UserCheck, AlertCircle, ThumbsUp, TrendingDown, XCircle, Award, Calendar, MessageSquare, Bell, ChevronDown, RefreshCw, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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

const hrChallenges = [
  {
    icon: AlertTriangle,
    title: "The Rising Cost Crisis",
    reality: "Healthcare costs up 12% YoY. CFO asks 'what are we paying for?' You have consultant decks, not answers.",
    impact: "Budget cuts, benefit reductions, employee morale drops, retention suffers.",
    solution: "Real-time cost monitoring with automated alerts, vendor accountability tracking, and documented savings evidence."
  },
  {
    icon: TrendingDown,
    title: "The Employee Confusion Problem",
    reality: "Employees don't understand their Rx costs. They pay $250 retail when insurance negotiated rate is $18.",
    impact: "Complaints to HR, low benefits satisfaction scores, employees feel you're not helping.",
    solution: "Employee cost transparency portal showing real-time alternatives, generic options, and GoodRx comparisons."
  },
  {
    icon: XCircle,
    title: "The Vendor Opacity Wall",
    reality: "PBM sends quarterly reports. You can't validate claims, rebates, or spread. Just trust them.",
    impact: "Hidden fees accumulate, contract guarantees missed, you have no leverage at renewal.",
    solution: "Independent claims data access, automated compliance tracking, guarantee performance validation."
  },
  {
    icon: Eye,
    title: "The Leadership Credibility Gap",
    reality: "Annual benefits review: CFO asks 'what did we save?' You cite broker promises and PBM reports.",
    impact: "Benefits budget gets cut, you're seen as cost center not strategic partner.",
    solution: "Monthly executive dashboards with documented savings, evidence receipts, and ROI quantification."
  }
];

const hrTools = [
  {
    icon: Users,
    title: "Employee Benefits Portal",
    description: "Give every employee real-time visibility into their Rx costs, alternatives, and savings opportunities at point-of-care.",
    features: [
      "Drug cost comparison (insurance vs. cash vs. GoodRx)",
      "Generic alternative recommendations with savings",
      "Specialty pharmacy routing optimization",
      "Mail order vs. retail cost analysis",
      "Formulary tier explanations in plain language",
      "Cost estimator for common medications"
    ],
    metrics: ["24/7 employee access", "Mobile-optimized", "Zero IT setup"],
    demoOutput: "Employees see transparent costs before filling prescriptions — reducing surprises and complaints."
  },
  {
    icon: BarChart3,
    title: "HR Analytics Dashboard",
    description: "Live view of benefits performance, cost drivers, utilization trends, and vendor accountability metrics.",
    features: [
      "Real-time pharmacy spend tracking by category",
      "Trend decomposition (utilization vs. unit cost)",
      "High-cost claimant identification and alerts",
      "Generic dispensing rate vs. benchmark",
      "Specialty medication cost tracking",
      "Monthly savings summary with evidence"
    ],
    metrics: ["Daily updates", "Drill-down analysis", "Exportable reports"],
    demoOutput: "Know exactly where every dollar goes — no waiting for quarterly consultant reports."
  },
  {
    icon: Shield,
    title: "PBM Compliance Monitor",
    description: "Automated tracking of contract guarantees, rebate pass-through, and performance commitments with variance alerts.",
    features: [
      "Guarantee tracking (spread caps, rebate minimums, AWP discounts)",
      "Automatic variance detection and escalation",
      "Rebate reconciliation and validation",
      "Claims adjudication accuracy scoring",
      "Contract violation documentation",
      "Renewal leverage report generation"
    ],
    metrics: ["Real-time alerts", "100% audit trail", "Automated escalation"],
    demoOutput: "Catch PBM contract violations before renewal — documented leverage for negotiations."
  },
  {
    icon: FileText,
    title: "Executive Reporting Suite",
    description: "Board-ready reports showing benefits ROI, cost containment wins, and strategic recommendations with evidence.",
    features: [
      "Monthly CFO dashboard (savings, trend, benchmark)",
      "Quarterly board presentation deck",
      "Annual benefits review with 3-year trend",
      "Cost avoidance documentation and receipts",
      "Vendor performance scorecard",
      "Strategic recommendations prioritized by ROI"
    ],
    metrics: ["Auto-generated", "Board-ready format", "Evidence-backed"],
    demoOutput: "Walk into leadership meetings with proof, not promises — elevate HR to strategic partner."
  },
  {
    icon: Zap,
    title: "Quick Win Identifier",
    description: "AI-powered analysis surfacing immediate cost-reduction opportunities requiring minimal disruption.",
    features: [
      "90-day savings opportunities (no plan changes)",
      "Generic conversion timing and member outreach",
      "Specialty utilization management gaps",
      "Mail order adoption opportunity quantification",
      "Member cost-sharing optimization",
      "Implementation roadmap with timelines"
    ],
    metrics: ["<30 days to implement", "$180K+ avg impact", "Zero benefit cuts"],
    demoOutput: "Show CFO immediate wins while long-term strategies develop — prove value quarterly."
  },
  {
    icon: MessageSquare,
    title: "Employee Communication Engine",
    description: "Automated member outreach for cost-saving opportunities, plan changes, and benefits education.",
    features: [
      "Personalized savings alerts (generic available, cheaper pharmacy)",
      "Open enrollment education campaigns",
      "High-cost medication intervention outreach",
      "Wellness program promotion targeting",
      "Benefits utilization optimization tips",
      "Multi-channel delivery (email, SMS, portal)"
    ],
    metrics: ["Automated targeting", "Personalized content", "Engagement tracking"],
    demoOutput: "Proactive employee communication reduces complaints and improves satisfaction scores."
  }
];

const hrTransformationJourney = [
  {
    phase: "Discovery (Weeks 1-2)",
    objective: "Baseline current state and identify immediate opportunities",
    deliverables: [
      "Claims data analysis and cost driver identification",
      "PBM contract review with guarantee audit",
      "Employee portal provisioning and access setup",
      "Quick win opportunities identified and prioritized"
    ],
    hrExperience: "HR sees immediate transparency into what was previously a black box."
  },
  {
    phase: "Quick Wins (Months 1-3)",
    objective: "Deliver visible savings and improve employee experience",
    deliverables: [
      "First quick wins implemented (generic conversions, pharmacy routing)",
      "Employee portal adoption campaign and training",
      "Monthly savings dashboard operational",
      "First executive report delivered to CFO"
    ],
    hrExperience: "CFO sees documented savings, employees see transparent costs, HR gets credit."
  },
  {
    phase: "Strategic Optimization (Months 4-9)",
    objective: "Implement structural improvements and build renewal leverage",
    deliverables: [
      "Plan design optimization based on utilization data",
      "PBM contract compliance violations documented",
      "Cost containment strategies implemented and measured",
      "Renewal RFP preparation with documented performance gaps"
    ],
    hrExperience: "HR drives strategic cost optimization, not just reactive administration."
  },
  {
    phase: "Continuous Excellence (Ongoing)",
    objective: "Maintain cost discipline and employee satisfaction",
    deliverables: [
      "Monthly executive dashboards with trending and benchmarks",
      "Quarterly employee satisfaction surveys and action plans",
      "Annual benefits review with 3-year cost projections",
      "Ongoing vendor accountability and contract optimization"
    ],
    hrExperience: "HR becomes trusted strategic partner in enterprise cost management."
  }
];

const traditionalVsSiriusB = [
  {
    dimension: "Cost Visibility",
    traditional: "Quarterly consultant reports, 90 days stale, high-level summaries",
    siriusb: "Live dashboards updated daily, drill-down to claim level, real-time alerts",
    advantage: "Catch cost spikes immediately, not months later"
  },
  {
    dimension: "Employee Experience",
    traditional: "Generic benefits communications, reactive complaint handling",
    siriusb: "Personalized cost transparency portal, proactive savings alerts, plain-language education",
    advantage: "89% satisfaction vs. 62% industry average"
  },
  {
    dimension: "Vendor Accountability",
    traditional: "Trust PBM reporting, no independent validation capability",
    siriusb: "Automated compliance monitoring, guarantee tracking, variance alerts with documentation",
    advantage: "Documented leverage at renewal, caught $420K avg in missed guarantees"
  },
  {
    dimension: "Executive Credibility",
    traditional: "Annual benefits review, consultant promises, industry benchmarks",
    siriusb: "Monthly CFO dashboards, quarterly board reports, documented savings with evidence receipts",
    advantage: "Elevated from cost center to strategic partner"
  },
  {
    dimension: "Cost Containment",
    traditional: "React to budget overruns, negotiate cuts with employees",
    siriusb: "Proactive optimization, quick wins every quarter, strategic plan design",
    advantage: "-18% costs without cutting benefits or coverage"
  }
];

const successMetrics = [
  {
    metric: "89%",
    label: "Employee Satisfaction",
    context: "With benefits transparency vs. 62% industry average",
    icon: ThumbsUp
  },
  {
    metric: "-18%",
    label: "Healthcare Cost Reduction",
    context: "Without cutting benefits or employee contributions",
    icon: DollarSign
  },
  {
    metric: "75%",
    label: "Time Savings",
    context: "On benefits administration vs. manual tracking",
    icon: Clock
  },
  {
    metric: "$640K",
    label: "Avg Annual Savings",
    context: "Per employer (1,000+ lives), documented with receipts",
    icon: Target
  },
  {
    metric: "215",
    label: "Evidence Receipts",
    context: "Per year — every savings initiative documented",
    icon: FileText
  },
  {
    metric: "100%",
    label: "Audit Ready",
    context: "All vendor performance and cost actions tracked",
    icon: Shield
  }
];

const employeeImpactStory = {
  before: {
    satisfaction: "62%",
    complaints: "High",
    understanding: "Low",
    engagement: "Passive",
    experience: "Employees frustrated by surprise costs, unclear benefits, and feeling like HR doesn't help with rising Rx prices."
  },
  after: {
    satisfaction: "89%",
    complaints: "Low",
    understanding: "High",
    engagement: "Active",
    experience: "Employees proactively check portal before filling Rx, see alternatives, save money, and credit HR for transparency."
  },
  impact: "$285 avg annual savings per employee + 27pt satisfaction increase"
};

const erisaChecklist = [
  { id: 1, text: "Our benefits team documents all broker and PBM compensation disclosures (Form 5500 & CAA Section 202) annually." },
  { id: 2, text: "We verify that employees have an accessible, independent mechanism to compare prescription costs before purchasing." },
  { id: 3, text: "Our organization runs quarterly data validations on plan pharmacy claims to catch hidden copay-assistance maximization." },
  { id: 4, text: "We independent audit all PBM manufacturer rebates to ensure they are fully returned or credited to the plan." },
  { id: 5, text: "We hold formal benefits committee meetings with written records showing diligent cost containment efforts." }
];

export default function HRLeadersPage() {
  const [selectedTool, setSelectedTool] = useState<number | null>(null);
  const [selectedChallenge, setSelectedChallenge] = useState<number | null>(null);

  // Interactive HR Simulator State
  const [employees, setEmployees] = useState<number>(850);
  const [transparencyPortal, setTransparencyPortal] = useState<boolean>(true);
  const [copayMaximization, setCopayMaximizer] = useState<string>("yes");
  const [calculating, setCalculating] = useState<boolean>(false);
  const [hrResults, setHrResults] = useState<{
    employerSavings: number;
    employeeSavings: number;
    satisfactionScore: number;
  } | null>({
    employerSavings: 384000,
    employeeSavings: 112000,
    satisfactionScore: 89
  });

  // Interactive Fiduciary Compliance Checklist State
  const [checkedErisa, setCheckedErisa] = useState<number[]>([]);

  const handleSimulateHR = () => {
    setCalculating(true);
    setTimeout(() => {
      let baselineEmployerPerHead = 850; // avg pharmacy spend waste per employee
      if (copayMaximization === "yes") baselineEmployerPerHead += 350;

      let savingsMultiplier = 0.35;
      if (!transparencyPortal) savingsMultiplier = 0.12;

      const employerSavings = Math.round(employees * baselineEmployerPerHead * savingsMultiplier);
      const employeeSavings = Math.round(employees * 140 * (transparencyPortal ? 1.6 : 0.4));
      
      let baseSat = 65;
      if (transparencyPortal) baseSat += 18;
      if (copayMaximization === "no") baseSat += 6;

      setHrResults({
        employerSavings,
        employeeSavings,
        satisfactionScore: Math.min(baseSat, 98)
      });
      setCalculating(false);
    }, 800);
  };

  const handleToggleErisa = (id: number) => {
    if (checkedErisa.includes(id)) {
      setCheckedErisa(checkedErisa.filter(item => item !== id));
    } else {
      setCheckedErisa([...checkedErisa, id]);
    }
  };

  const erisaScore = useMemo(() => {
    return Math.round((checkedErisa.length / erisaChecklist.length) * 100);
  }, [checkedErisa]);

  return (
    <>
      <Head>
        <title>For HR Leaders: Employee Benefits Transparency & Cost Control | SiriusB iQ</title>
        <meta
          name="description"
          content="Transform benefits administration with real-time analytics, employee cost transparency, vendor accountability, and executive reporting — elevate HR to strategic partner."
        />
      </Head>

      <Nav />

      <div className="min-h-screen bg-gradient-to-b from-rose-950 via-slate-950 to-black text-white">
        {/* Hero Section */}
        <section className="relative pt-32 pb-24 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-600/20 via-transparent to-transparent" />
          <div className="absolute inset-0">
            <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>
          
          <div className="relative max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-3 px-5 py-2 bg-gradient-to-r from-rose-500/20 to-pink-500/20 border border-rose-400/30 rounded-full mb-8 backdrop-blur-sm">
                <Heart className="w-5 h-5 text-rose-300" />
                <span className="text-sm font-semibold text-rose-200">HR Directors & Benefits Leaders</span>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
                <div>
                  <h1 className="text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r from-rose-200 via-pink-300 to-fuchsia-200 bg-clip-text text-transparent leading-tight font-serif">
                    Your Employees<br />Are Confused.<br />
                    <span className="text-red-400">Your CFO Is Angry.</span>
                  </h1>
                  
                  <p className="text-2xl text-rose-100 mb-6 leading-relaxed">
                    Healthcare costs up 12%. Employee complaints up 23%. CFO asks <span className="text-rose-300 font-bold">"what are we paying for?"</span> — and you have consultant decks, not answers.
                  </p>
                  
                  <p className="text-lg text-rose-300/80 mb-10">
                    SiriusB iQ gives you real-time cost analytics, employee transparency portals, vendor accountability tracking, and executive-ready reporting — so you deliver documented savings while improving employee satisfaction.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/#dashboard">
                      <Button size="lg" className="bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white text-lg px-8 py-6 shadow-2xl shadow-rose-500/50">
                        See HR Dashboard Demo
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                    <Link href="#benefits-satisfaction-simulator">
                      <Button size="lg" variant="outline" className="border-2 border-rose-400/50 text-rose-200 hover:bg-rose-500/20 text-lg px-8 py-6">
                        Try Satisfaction Simulator
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
                  <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-pink-500 rounded-2xl blur-3xl opacity-30 animate-pulse" />
                  <Card className="relative bg-gradient-to-br from-rose-950/80 to-pink-950/80 border-2 border-rose-400/50 p-4 shadow-2xl shadow-rose-500/50 backdrop-blur-xl">
                    <Image
                      src="/Firefly_Gemini_Flash_Introducing_Rx_Defense_PBM_Contract_x-Ray-_The_Forensic_Infrastructure_That_Turns_Pha_743383.png"
                      alt="Introducing Rx Defense PBM Contract X-Ray - by Jeremiah Franklin"
                      width={800}
                      height={800}
                      className="rounded-xl w-full h-auto"
                      priority
                    />
                    <div className="mt-4 text-center">
                      <p className="text-sm text-rose-200 font-semibold">Written by Jeremiah Franklin, Founder</p>
                      <p className="text-xs text-rose-400 italic mt-1">Rx Defense & contract forensics for plan sponsors</p>
                    </div>
                  </Card>
                </motion.div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {successMetrics.slice(0, 4).map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <Card className="bg-gradient-to-br from-rose-900/30 to-pink-900/30 border-rose-500/40 backdrop-blur-xl p-6 hover:scale-105 transition-transform">
                      <item.icon className="w-8 h-8 text-rose-400 mb-3" />
                      <div className="text-5xl font-black text-rose-300 mb-2">{item.metric}</div>
                      <div className="text-sm text-rose-200 mb-2">{item.label}</div>
                      <div className="text-xs text-rose-400">{item.context}</div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Live Interactive Benefits & Satisfaction Simulator Sandbox */}
        <section id="benefits-satisfaction-simulator" className="py-24 px-4 bg-gradient-to-b from-slate-950 to-rose-950/40 border-t border-rose-500/20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-rose-500/10 border border-rose-400/20 rounded-full mb-4 text-xs font-black text-rose-300 uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" /> Interactive Sandbox
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-rose-200 to-pink-200 bg-clip-text text-transparent">
                Benefits & Employee Satisfaction Simulator
              </h2>
              <p className="text-xl text-rose-300/80 max-w-3xl mx-auto">
                Model employee count and program elements to calculate projected plan savings and member satisfaction lift.
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* Controls Column */}
              <Card className="lg:col-span-5 bg-black/40 border-rose-500/30 p-8 backdrop-blur-xl">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Users className="w-5 h-5 text-rose-400" /> Census & Program Inputs
                </h3>

                <div className="space-y-6">
                  {/* Employee Count */}
                  <div>
                    <div className="flex justify-between text-sm font-semibold mb-2">
                      <span className="text-rose-200">Enrolled Employee Lives</span>
                      <span className="text-rose-300">{employees.toLocaleString()} lives</span>
                    </div>
                    <input
                      type="range"
                      min={100}
                      max={10000}
                      step={100}
                      value={employees}
                      onChange={(e) => setEmployees(Number(e.target.value))}
                      className="w-full accent-rose-500 h-1.5 bg-rose-950 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-rose-500/70 mt-1">
                      <span>100</span>
                      <span>10,000</span>
                    </div>
                  </div>

                  {/* Transparency Portal Toggle */}
                  <div className="flex items-center justify-between p-4 bg-rose-950/20 rounded-xl border border-rose-500/20">
                    <div>
                      <span className="block text-sm font-semibold text-rose-200">Employee Cost Portal</span>
                      <span className="text-xs text-rose-400">Give members direct cost-saving insights</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setTransparencyPortal(!transparencyPortal)}
                      className={`w-12 h-6 rounded-full transition-colors relative focus:outline-none ${
                        transparencyPortal ? "bg-rose-500" : "bg-rose-950"
                      }`}
                    >
                      <span className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                        transparencyPortal ? "left-7" : "left-1"
                      }`} />
                    </button>
                  </div>

                  {/* Copay Maximization */}
                  <div>
                    <span className="block text-sm font-semibold text-rose-200 mb-2">Active Specialty Copay Maximization?</span>
                    <select
                      value={copayMaximization}
                      onChange={(e) => setCopayMaximizer(e.target.value)}
                      className="w-full px-4 py-3 bg-black/60 border border-rose-500/30 rounded-xl text-rose-200 focus:outline-none focus:border-rose-400"
                    >
                      <option value="yes">Yes - Specialty manufacturer copay helper program is active</option>
                      <option value="no">No - Standard direct PBM specialty pricing applies</option>
                    </select>
                  </div>

                  <Button
                    onClick={handleSimulateHR}
                    disabled={calculating}
                    className="w-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white py-6 text-base font-black shadow-lg"
                  >
                    {calculating ? (
                      <span className="flex items-center gap-2 justify-center">
                        <RefreshCw className="w-5 h-5 animate-spin" /> modeling census metrics...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 justify-center">
                        <Smile className="w-5 h-5 animate-pulse" /> Project Savings & Satisfaction
                      </span>
                    )}
                  </Button>
                </div>
              </Card>

              {/* Outputs Column */}
              <Card className="lg:col-span-7 bg-rose-950/20 border-rose-500/30 p-8 backdrop-blur-xl relative overflow-hidden self-stretch flex flex-col justify-between">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Heart className="w-32 h-32 text-rose-400" />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-pink-400" /> Projected Member & Plan Impact
                  </h3>

                  <AnimatePresence mode="wait">
                    {hrResults && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-6"
                      >
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="bg-black/30 p-4 rounded-xl border border-rose-500/20">
                            <span className="block text-xs font-semibold text-rose-400 uppercase tracking-wider mb-1">Employer Plan Savings</span>
                            <span className="text-2xl font-black text-white">${(hrResults.employerSavings).toLocaleString()}</span>
                            <span className="block text-[10px] text-rose-400/60 mt-1">Annual cost-containment yield</span>
                          </div>
                          <div className="bg-rose-900/30 p-4 rounded-xl border border-rose-400/30">
                            <span className="block text-xs font-semibold text-rose-300 uppercase tracking-wider mb-1">Member OOP Savings</span>
                            <span className="text-2xl font-black text-rose-300">${(hrResults.employeeSavings).toLocaleString()}</span>
                            <span className="block text-[10px] text-rose-300/60 mt-1">Cash/GoodRx transparency savings</span>
                          </div>
                          <div className="bg-pink-950/40 p-4 rounded-xl border border-pink-400/30">
                            <span className="block text-xs font-semibold text-pink-300 uppercase tracking-wider mb-1">Member Satisfaction</span>
                            <span className="text-2xl font-black text-pink-300">{hrResults.satisfactionScore}%</span>
                            <span className="block text-[10px] text-pink-300/60 mt-1">Projected benefits rating</span>
                          </div>
                        </div>

                        <div className="bg-black/40 p-6 rounded-xl border border-rose-500/20 space-y-4">
                          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Benefits Enrollment Experience Lift</h4>
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-rose-300">Projected Member Benefits Satisfaction</span>
                                <span className="font-bold text-white">{hrResults.satisfactionScore}% Rating</span>
                              </div>
                              <div className="w-full bg-rose-950 h-2.5 rounded-full overflow-hidden">
                                <div className="bg-gradient-to-r from-rose-500 to-pink-400 h-full rounded-full" style={{ width: `${hrResults.satisfactionScore}%` }} />
                              </div>
                            </div>
                            <div className="flex justify-between text-xs pt-2 text-rose-300/70 border-t border-rose-500/10">
                              <span>Plan Administration Efficiency</span>
                              <span className="font-bold text-white">75% Fewer Admin Queries</span>
                            </div>
                          </div>
                          <p className="text-xs text-rose-300/60 leading-relaxed italic pt-2">
                            *Giving employees cost-saving transparency at point-of-care drastically reduces surprise pricing friction and manual HR query handling.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="mt-6 pt-6 border-t border-rose-500/10 flex items-center justify-between text-xs text-rose-400/70">
                  <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> HIPAA Compliant</span>
                  <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> Member Empowered</span>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* ERISA & DOL Fiduciary Compliance Checklist */}
        <section className="py-24 px-4 bg-black">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-rose-950/40 to-slate-950/40 border border-rose-500/30 p-10 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl" />

              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-rose-500/10 border border-rose-400/30 rounded-xl">
                    <Shield className="w-6 h-6 text-rose-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white">ERISA & Fiduciary Risk Self-Audit</h3>
                    <p className="text-sm text-rose-300">Validate your plan administration policies against CAA/ERISA regulations.</p>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {erisaChecklist.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleToggleErisa(item.id)}
                      className="flex items-start gap-4 p-4 rounded-xl border border-rose-500/10 bg-rose-950/10 hover:bg-rose-950/20 cursor-pointer transition-all"
                    >
                      <div className={`w-5 h-5 rounded border flex items-center justify-center mt-0.5 transition-all ${
                        checkedErisa.includes(item.id)
                          ? "bg-rose-500 border-rose-400 text-white"
                          : "border-rose-500/30 text-transparent"
                      }`}>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-rose-100 text-sm leading-relaxed">{item.text}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-rose-950/30 rounded-xl p-6 border border-rose-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <span className="block text-xs font-semibold text-rose-400 uppercase tracking-wider mb-1">Your Fiduciary Score</span>
                    <span className="text-4xl font-black text-white">{erisaScore}%</span>
                    <span className="block text-xs text-rose-300/60 mt-1">Audit rating based on DOL guidelines</span>
                  </div>

                  <div className="text-right">
                    {erisaScore === 100 ? (
                      <span className="text-emerald-400 font-bold flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Compliant Fiduciary</span>
                    ) : erisaScore >= 60 ? (
                      <span className="text-yellow-400 font-bold flex items-center gap-1.5"><AlertCircle className="w-4 h-4" /> Moderately Exposed</span>
                    ) : (
                      <span className="text-red-400 font-bold flex items-center gap-1.5"><AlertTriangle className="w-4 h-4" /> Fiduciary Liability Risk</span>
                    )}
                    <span className="block text-[11px] text-rose-300/50 mt-1">DOL audits target organizations below 80%</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* HR Challenges Section */}
        <section className="py-24 px-4 bg-gradient-to-b from-black to-rose-950/30">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-rose-200 to-pink-200 bg-clip-text text-transparent">
                The Four HR Challenges
              </h2>
              <p className="text-xl text-rose-300 max-w-3xl mx-auto">
                Why traditional benefits administration fails — and how to fix it
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {hrChallenges.map((challenge, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    className="bg-gradient-to-br from-red-950/40 to-orange-950/40 border-red-500/30 p-8 h-full cursor-pointer hover:scale-[1.02] transition-all"
                    onClick={() => setSelectedChallenge(selectedChallenge === index ? null : index)}
                  >
                    <div className="flex items-start gap-4 mb-6">
                      <div className="bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl p-4 shadow-xl shadow-red-500/50 flex-shrink-0">
                        <challenge.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-3">{challenge.title}</h3>
                        <div className="space-y-4">
                          <div>
                            <div className="text-sm font-semibold text-red-400 mb-1">The Reality:</div>
                            <p className="text-red-200 text-sm">{challenge.reality}</p>
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-orange-400 mb-1">The Impact:</div>
                            <p className="text-orange-200 text-sm">{challenge.impact}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {selectedChallenge === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="bg-gradient-to-r from-emerald-950/50 to-green-950/50 rounded-lg p-4 border border-emerald-500/30 mt-4"
                      >
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="text-sm font-semibold text-emerald-400 mb-2">SiriusB iQ Solution:</div>
                            <p className="text-emerald-200 text-sm">{challenge.solution}</p>
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

        {/* HR Tools Section */}
        <section className="py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-rose-200 to-pink-200 bg-clip-text text-transparent">
                Your HR Benefits Arsenal
              </h2>
              <p className="text-xl text-rose-300 max-w-3xl mx-auto">
                Everything you need to control costs, improve satisfaction, and prove strategic value
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {hrTools.map((tool, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    className="bg-gradient-to-br from-rose-950/40 to-pink-950/40 border-rose-500/30 p-8 h-full group hover:scale-105 transition-all cursor-pointer"
                    onClick={() => setSelectedTool(selectedTool === index ? null : index)}
                  >
                    <tool.icon className="w-12 h-12 text-rose-400 mb-6 group-hover:scale-110 transition-transform" />
                    <h3 className="text-2xl font-bold text-white mb-4">{tool.title}</h3>
                    <p className="text-rose-100 mb-6">{tool.description}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {tool.metrics.map((metric, idx) => (
                        <div key={idx} className="px-3 py-1 bg-rose-500/20 border border-rose-500/40 rounded-full text-xs text-rose-300">
                          {metric}
                        </div>
                      ))}
                    </div>

                    {selectedTool === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="space-y-4"
                      >
                        <div className="bg-rose-950/50 rounded-lg p-4 border border-rose-500/30">
                          <div className="text-sm text-rose-200 font-semibold mb-3">Key Features:</div>
                          <ul className="text-xs text-rose-300 space-y-2">
                            {tool.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0 mt-0.5" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/30 rounded-lg p-3">
                          <div className="text-xs text-emerald-300 font-semibold mb-1">What This Means:</div>
                          <div className="text-xs text-emerald-200">{tool.demoOutput}</div>
                        </div>
                      </motion.div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* HR Transformation Journey */}
        <section className="py-24 px-4 bg-gradient-to-b from-rose-950/30 to-black">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-rose-200 to-pink-200 bg-clip-text text-transparent">
                The HR Transformation Journey
              </h2>
              <p className="text-xl text-rose-300 max-w-3xl mx-auto">
                From reactive cost center to strategic value partner in 90 days
              </p>
            </motion.div>

            <div className="space-y-8">
              {hrTransformationJourney.map((phase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-gradient-to-r from-rose-950/50 to-pink-950/50 border-rose-500/40 p-8">
                    <div className="flex items-start gap-6">
                      <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl px-6 py-8 shadow-xl shadow-rose-500/50 flex-shrink-0 min-w-[200px] text-center">
                        <div className="text-white font-black text-3xl mb-2">{phase.phase}</div>
                        <div className="text-rose-100 text-sm">{phase.objective}</div>
                      </div>
                      <div className="flex-1">
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <div className="text-sm font-semibold text-rose-400 mb-3">Deliverables:</div>
                            <ul className="text-sm text-rose-200 space-y-2">
                              {phase.deliverables.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-pink-400 mb-3">HR Experience:</div>
                            <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/30 rounded-lg p-4">
                              <p className="text-emerald-200 text-sm italic">"{phase.hrExperience}"</p>
                            </div>
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

        {/* Employee Impact Story */}
        <section className="py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-rose-200 to-pink-200 bg-clip-text text-transparent">
                The Employee Experience Transformation
              </h2>
              <p className="text-xl text-rose-300 max-w-3xl mx-auto">
                Real impact on the people you serve every day
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="bg-gradient-to-br from-red-950/50 to-orange-950/50 border-red-500/30 p-8">
                <div className="text-center mb-6">
                  <div className="inline-block px-4 py-2 bg-red-500/20 border border-red-500/40 rounded-full mb-4">
                    <span className="text-sm font-bold text-red-300">Before SiriusB iQ</span>
                  </div>
                </div>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-red-200">Satisfaction Score:</span>
                    <span className="text-4xl font-black text-red-400">{employeeImpactStory.before.satisfaction}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-red-200">Monthly Complaints:</span>
                    <span className="text-2xl font-bold text-red-400">{employeeImpactStory.before.complaints}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-red-200">Benefits Understanding:</span>
                    <span className="text-2xl font-bold text-red-400">{employeeImpactStory.before.understanding}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-red-200">Portal Engagement:</span>
                    <span className="text-2xl font-bold text-red-400">{employeeImpactStory.before.engagement}</span>
                  </div>
                </div>
                <div className="bg-red-950/50 border border-red-500/30 rounded-lg p-4">
                  <p className="text-sm text-red-200 italic">"{employeeImpactStory.before.experience}"</p>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-emerald-950/50 to-green-950/50 border-emerald-500/30 p-8">
                <div className="text-center mb-6">
                  <div className="inline-block px-4 py-2 bg-emerald-500/20 border border-emerald-500/40 rounded-full mb-4">
                    <span className="text-sm font-bold text-emerald-300">With Employee Portal</span>
                  </div>
                </div>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-200">Satisfaction Score:</span>
                    <span className="text-4xl font-black text-emerald-400">{employeeImpactStory.after.satisfaction}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-200">Monthly Complaints:</span>
                    <span className="text-2xl font-bold text-emerald-400">{employeeImpactStory.after.complaints}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-200">Benefits Understanding:</span>
                    <span className="text-2xl font-bold text-emerald-400">{employeeImpactStory.after.understanding}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-200">Portal Engagement:</span>
                    <span className="text-2xl font-bold text-emerald-400">{employeeImpactStory.after.engagement}</span>
                  </div>
                </div>
                <div className="bg-emerald-950/50 border border-emerald-500/30 rounded-lg p-4">
                  <p className="text-sm text-emerald-200 italic">"{employeeImpactStory.after.experience}"</p>
                </div>
              </Card>
            </div>

            <Card className="bg-gradient-to-r from-rose-500/10 to-pink-500/10 border-2 border-rose-400/50 p-8 text-center">
              <Award className="w-16 h-16 text-rose-400 mx-auto mb-4" />
              <div className="text-3xl font-black text-rose-300 mb-2">The Bottom Line</div>
              <p className="text-xl text-rose-200">{employeeImpactStory.impact}</p>
            </Card>
          </div>
        </section>

        {/* Competitive Comparison */}
        <section className="py-24 px-4 bg-gradient-to-b from-rose-950/30 to-black">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-rose-200 to-pink-200 bg-clip-text text-transparent">
                Traditional HR vs. Strategic HR
              </h2>
              <p className="text-xl text-rose-300 max-w-3xl mx-auto">
                The difference between managing benefits and driving enterprise value
              </p>
            </motion.div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-rose-500/30">
                    <th className="text-left p-4 text-rose-300 font-bold">Dimension</th>
                    <th className="text-left p-4 text-gray-400 font-bold">Traditional HR</th>
                    <th className="text-left p-4 text-rose-400 font-bold">SiriusB iQ HR</th>
                    <th className="text-left p-4 text-emerald-400 font-bold">Your Advantage</th>
                  </tr>
                </thead>
                <tbody>
                  {traditionalVsSiriusB.map((row, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-rose-500/10 hover:bg-rose-950/20 transition-colors"
                    >
                      <td className="p-4 text-rose-300 font-semibold">{row.dimension}</td>
                      <td className="p-4 text-gray-400">{row.traditional}</td>
                      <td className="p-4 text-rose-200">{row.siriusb}</td>
                      <td className="p-4 text-emerald-300">{row.advantage}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Success Metrics Grid */}
        <section className="py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-rose-200 to-pink-200 bg-clip-text text-transparent">
                The Numbers Tell the Story
              </h2>
              <p className="text-xl text-rose-300 max-w-3xl mx-auto">
                What happens when HR becomes a strategic value driver
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {successMetrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-gradient-to-br from-rose-900/40 to-pink-900/40 border-rose-500/30 p-8 text-center hover:scale-105 transition-transform">
                    <metric.icon className="w-12 h-12 text-rose-400 mx-auto mb-4" />
                    <div className="text-6xl font-black text-rose-300 mb-3">{metric.metric}</div>
                    <div className="text-lg text-rose-200 font-semibold mb-2">{metric.label}</div>
                    <div className="text-sm text-rose-400">{metric.context}</div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* HR Toolkit CTA */}
        <section id="hr-toolkit" className="py-24 px-4 bg-gradient-to-b from-rose-950/30 to-black">
          <div className="max-w-4xl mx-auto">
            <Card className="relative bg-gradient-to-br from-rose-900/80 to-pink-900/80 border-4 border-rose-400 p-12 shadow-[0_0_60px_rgba(251,113,133,0.6),0_0_100px_rgba(251,113,133,0.4),0_0_140px_rgba(251,113,133,0.2)]">
              <div className="absolute inset-0 bg-gradient-to-r from-rose-500/20 via-pink-500/20 to-fuchsia-500/20 rounded-lg" />
              <div className="absolute -inset-1 bg-gradient-to-r from-rose-600 via-pink-600 to-fuchsia-600 rounded-lg blur-xl opacity-75" />
              
              <div className="relative">
                <div className="text-center mb-8">
                  <div className="inline-block px-6 py-2 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full mb-4 shadow-[0_0_30px_rgba(251,113,133,0.8)]">
                    <span className="text-sm font-black text-white uppercase tracking-wider">🎁 HR Benefits Toolkit 🎁</span>
                  </div>
                  <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-rose-200 via-white to-pink-200 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(251,113,133,0.8)]">
                    Get the Complete HR Toolkit
                  </h2>
                  <p className="text-xl text-rose-100 drop-shadow-[0_0_15px_rgba(251,113,133,0.6)]">
                    Employee communication templates, benefits comparison guides, cost transparency frameworks, and executive reporting samples.
                  </p>
                </div>
                
                <form className="max-w-2xl mx-auto space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-black text-rose-100 mb-2 uppercase tracking-wide drop-shadow-[0_0_10px_rgba(251,113,133,0.8)]">Full Name</label>
                      <input
                        type="text"
                        required
                        className="w-full px-5 py-4 bg-black/60 border-3 border-rose-400 rounded-xl text-white placeholder-rose-300/70 focus:outline-none focus:border-rose-300 focus:shadow-[0_0_30px_rgba(251,113,133,0.8)] transition-all font-semibold"
                        placeholder="Jane Smith"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-black text-rose-100 mb-2 uppercase tracking-wide drop-shadow-[0_0_10px_rgba(251,113,133,0.8)]">Email</label>
                      <input
                        type="email"
                        required
                        className="w-full px-5 py-4 bg-black/60 border-3 border-rose-400 rounded-xl text-white placeholder-rose-300/70 focus:outline-none focus:border-rose-300 focus:shadow-[0_0_30px_rgba(251,113,133,0.8)] transition-all font-semibold"
                        placeholder="jane@company.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-black text-rose-100 mb-2 uppercase tracking-wide drop-shadow-[0_0_10px_rgba(251,113,133,0.8)]">Company</label>
                      <input
                        type="text"
                        required
                        className="w-full px-5 py-4 bg-black/60 border-3 border-rose-400 rounded-xl text-white placeholder-rose-300/70 focus:outline-none focus:border-rose-300 focus:shadow-[0_0_30px_rgba(251,113,133,0.8)] transition-all font-semibold"
                        placeholder="Enterprise Corp"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-black text-rose-100 mb-2 uppercase tracking-wide drop-shadow-[0_0_10px_rgba(251,113,133,0.8)]">Role</label>
                      <select
                        required
                        className="w-full px-5 py-4 bg-black/60 border-3 border-rose-400 rounded-xl text-white focus:outline-none focus:border-rose-300 focus:shadow-[0_0_30px_rgba(251,113,133,0.8)] transition-all font-semibold"
                      >
                        <option value="">Select role...</option>
                        <option value="chro">CHRO / VP HR</option>
                        <option value="benefits-director">Benefits Director</option>
                        <option value="hr-manager">HR Manager</option>
                        <option value="benefits-specialist">Benefits Specialist</option>
                        <option value="compensation">Compensation & Benefits Manager</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-black text-rose-100 mb-2 uppercase tracking-wide drop-shadow-[0_0_10px_rgba(251,113,133,0.8)]">Employee Count</label>
                    <select
                      required
                      className="w-full px-5 py-4 bg-black/60 border-3 border-rose-400 rounded-xl text-white focus:outline-none focus:border-rose-300 focus:shadow-[0_0_30px_rgba(251,113,133,0.8)] transition-all font-semibold"
                    >
                      <option value="">Select size...</option>
                      <option value="100-500">100 - 500 employees</option>
                      <option value="500-1000">500 - 1,000 employees</option>
                      <option value="1000-2500">1,000 - 2,500 employees</option>
                      <option value="2500-5000">2,500 - 5,000 employees</option>
                      <option value="5000+">5,000+ employees</option>
                    </select>
                  </div>

                  <Link href="/request-demo">
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500 hover:from-rose-400 hover:via-pink-400 hover:to-fuchsia-400 text-white text-2xl font-black py-8 shadow-[0_0_40px_rgba(251,113,133,0.9),0_0_60px_rgba(251,113,133,0.6),0_0_80px_rgba(251,113,133,0.4)] hover:shadow-[0_0_50px_rgba(251,113,133,1),0_0_80px_rgba(251,113,133,0.8),0_0_120px_rgba(251,113,133,0.6)] uppercase tracking-wider border-2 border-white/50"
                    >
                      💎 Download HR Toolkit 💎
                      <ArrowRight className="w-6 h-6 ml-3" />
                    </Button>
                  </Link>
                  
                  <p className="text-xs text-center text-rose-200 drop-shadow-[0_0_8px_rgba(251,113,133,0.6)]">
                    Includes: Employee portal demo • Cost transparency templates • Vendor monitoring guides • Executive reporting samples
                  </p>
                </form>
              </div>
            </Card>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Heart className="w-16 h-16 mx-auto mb-6 text-rose-400" />
              <h2 className="text-5xl font-black mb-8 bg-gradient-to-r from-rose-200 to-pink-200 bg-clip-text text-transparent">
                Transform From Cost Center to Value Partner
              </h2>
              <p className="text-2xl text-rose-200 mb-12">
                Schedule a 30-minute HR briefing to see the employee portal, analytics dashboard, and executive reporting in action.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/request-demo">
                  <Button size="lg" className="bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white text-xl px-12 py-8 shadow-2xl shadow-rose-500/50">
                    Schedule HR Briefing
                    <Users className="w-6 h-6 ml-3" />
                  </Button>
                </Link>
                <Link href="/platform">
                  <Button size="lg" variant="outline" className="border-2 border-rose-400/50 text-rose-200 hover:bg-rose-500/20 text-xl px-12 py-8">
                    Explore Platform
                    <Eye className="w-6 h-6 ml-3" />
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-rose-400 mt-8">
                Live dashboard demo • Employee portal walkthrough • CFO reporting samples • Benefits optimization roadmap
              </p>
            </motion.div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}