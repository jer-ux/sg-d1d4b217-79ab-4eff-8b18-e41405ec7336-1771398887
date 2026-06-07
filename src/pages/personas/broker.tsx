import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Briefcase, Award, Target, TrendingUp, Users, ArrowRight, CheckCircle2, Star, Shield, AlertTriangle, DollarSign, FileText, Eye, Clock, Zap, BarChart3, Database, Lock, UserCheck, AlertCircle, ThumbsUp, TrendingDown, XCircle, RefreshCw, Sparkles } from "lucide-react";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const brokerChallenges = [
  {
    icon: AlertTriangle,
    title: "The RFP Theater Problem",
    reality: "Every bidder promises 10-15% savings. CFO can't differentiate real value from marketing.",
    impact: "You lose to whoever quotes lowest guaranteed discount — even if it's unrealistic.",
    solution: "Forensic contract preview reports showing exact dollar leakage with page references."
  },
  {
    icon: TrendingDown,
    title: "The Renewal Crisis",
    reality: "Client asks 'What did you save us?' You have consultant decks, not receipts.",
    impact: "CFO sees rising costs, questions your value, opens RFP to competitors.",
    solution: "Live dashboards + quarterly value reports with 285+ evidence receipts documenting savings."
  },
  {
    icon: XCircle,
    title: "The Fiduciary Gap",
    reality: "You recommend PBMs, but have no visibility into contract performance or compliance.",
    impact: "Client gets burned by hidden fees. You're liable as the recommending party.",
    solution: "Real-time contract monitoring, compliance alerts, documented fiduciary oversight."
  },
  {
    icon: Eye,
    title: "The Transparency Illusion",
    reality: "PBM provides quarterly reports. You can't validate their math or assumptions.",
    impact: "Client thinks they're getting transparency. They're getting marketing documents.",
    solution: "Independent claims data access, NADAC benchmarking, spread analysis you control."
  }
];

const brokerTools = [
  {
    icon: Database,
    title: "Contract X-Ray Engine",
    description: "Upload client's PBM contract, get forensic analysis highlighting every cost leak, missing protection, and negotiation opportunity.",
    features: [
      "Automated clause extraction with risk scoring",
      "NADAC spread exposure quantification",
      "Missing guarantees vs. industry standard",
      "Page-specific fix language for renegotiation",
      "Client-ready executive summary (10 pages)"
    ],
    metrics: ["90-sec analysis", "$847K avg findings", "Client-ready PDF"],
    demoOutput: "See exact page/clause references for every finding — no generalizations."
  },
  {
    icon: BarChart3,
    title: "Client Value Dashboard",
    description: "Give every client live access to their cost performance, trend analysis, and vendor accountability metrics.",
    features: [
      "Real-time pharmacy spend tracking",
      "Trend decomposition (utilization vs. unit cost)",
      "PBM guarantee compliance scoring",
      "Monthly savings summaries with evidence",
      "Exportable board-ready reports"
    ],
    metrics: ["24/7 client access", "Monthly updates", "Zero IT lift"],
    demoOutput: "Clients log in, see your value delivery in real-time — not just at renewal."
  },
  {
    icon: Shield,
    title: "Fiduciary Compliance Monitor",
    description: "Automated oversight of PBM contract compliance, regulatory requirements, and fiduciary duty fulfillment.",
    features: [
      "Guarantee tracking and variance alerts",
      "DOL/ERISA compliance documentation",
      "Audit trail for all recommendations",
      "Third-party validation reports",
      "Automatic alert escalation workflow"
    ],
    metrics: ["Real-time alerts", "Audit-ready logs", "Zero manual tracking"],
    demoOutput: "Sleep easy knowing you have documented oversight — every recommendation tracked."
  },
  {
    icon: FileText,
    title: "Quarterly Value Reports",
    description: "Automated generation of client value delivery reports with evidence receipts, savings quantification, and service highlights.",
    features: [
      "Savings summary with evidence lineage",
      "Issue resolution tracking and outcomes",
      "Benchmark comparisons (peer and industry)",
      "Service activity log with timestamps",
      "Board-ready format with executive summary"
    ],
    metrics: ["Auto-generated", "Evidence-backed", "Board-ready"],
    demoOutput: "Hand clients a comprehensive report every quarter — not just at renewal time."
  },
  {
    icon: Zap,
    title: "Quick Win Identifier",
    description: "AI-powered analysis of claims data to surface immediate cost-reduction opportunities requiring minimal client disruption.",
    features: [
      "90-day savings opportunities (no plan changes)",
      "Generic conversion timing analysis",
      "Specialty utilization management gaps",
      "Member cost-sharing optimization",
      "Implementation complexity scoring"
    ],
    metrics: ["<30 days to implement", "$250K+ avg impact", "Zero benefit changes"],
    demoOutput: "Show clients immediate wins while long-term strategies develop."
  },
  {
    icon: Target,
    title: "RFP Differentiation Package",
    description: "Stand out in competitive bids with forensic PBM analysis, independent validation, and documented methodology.",
    features: [
      "Pre-RFP contract preview analysis",
      "Independent trend validation",
      "Savings opportunity quantification",
      "Implementation timeline with milestones",
      "ROI modeling with conservative assumptions"
    ],
    metrics: ["3-day turnaround", "Client-ready", "Differentiated positioning"],
    demoOutput: "Win before the RFP with substantive analysis — not generic promises."
  }
];

const clientRetentionFramework = [
  {
    phase: "Onboarding (Days 1-30)",
    objective: "Establish value visibility infrastructure",
    deliverables: [
      "Contract X-Ray analysis delivered to CFO",
      "Client dashboard provisioned with baseline data",
      "Quick win opportunities identified and prioritized",
      "Quarterly reporting cadence established"
    ],
    clientExperience: "Client sees immediate forensic insights and clear value roadmap."
  },
  {
    phase: "Value Acceleration (Months 2-6)",
    objective: "Deliver documented savings and demonstrate ongoing oversight",
    deliverables: [
      "First quick wins implemented and documented",
      "Monthly savings receipts flowing to dashboard",
      "PBM compliance monitoring active with alerts",
      "First quarterly value report delivered"
    ],
    clientExperience: "CFO logs in monthly, sees savings accumulating with evidence."
  },
  {
    phase: "Renewal Defense (Months 7-12)",
    objective: "Pre-empt renewal questions with comprehensive value documentation",
    deliverables: [
      "Annual value summary: total savings + evidence count",
      "Compliance scorecard: PBM guarantee performance",
      "Benchmark report: client vs. peers and industry",
      "Strategic recommendations for next contract cycle"
    ],
    clientExperience: "No renewal crisis — CFO has 12 months of documented value and oversight."
  }
];

const competitiveComparison = [
  {
    dimension: "Proposal Differentiation",
    traditional: "Generic savings promises, industry benchmarks, carrier relationships",
    siriusb: "Forensic contract preview, client-specific leakage analysis, page-referenced fixes",
    advantage: "Win on substance before price discussion"
  },
  {
    dimension: "Ongoing Value Proof",
    traditional: "Annual renewal presentations, anecdotal service stories",
    siriusb: "Live client dashboards, monthly savings receipts, quarterly value reports",
    advantage: "Client sees value every login — not just renewal time"
  },
  {
    dimension: "Fiduciary Protection",
    traditional: "Recommendation memos, email trails, carrier attestations",
    siriusb: "Automated compliance monitoring, audit trails, independent validation",
    advantage: "Documented oversight reduces liability exposure"
  },
  {
    dimension: "PBM Accountability",
    traditional: "Trust PBM reporting, escalate client complaints reactively",
    siriusb: "Independent data access, real-time guarantee tracking, proactive variance alerts",
    advantage: "Validate vendor claims, catch issues before client does"
  },
  {
    dimension: "Client Retention",
    traditional: "Relationship, service quality, hope they don't open RFP",
    siriusb: "Documented ROI ($1.1M avg), evidence receipts (285+), continuous value visibility",
    advantage: "CFO has no reason to RFP — you prove value quarterly"
  }
];

const successMetrics = [
  {
    metric: "94%",
    label: "Client Retention Rate",
    context: "With documented value delivery vs. 68% industry average",
    icon: ThumbsUp
  },
  {
    metric: "$1.1M",
    label: "Avg Annual Savings",
    context: "Per client, verified with evidence receipts",
    icon: DollarSign
  },
  {
    metric: "3.2x",
    label: "Referral Growth",
    context: "Clients refer when they see proof, not promises",
    icon: Users
  },
  {
    metric: "Zero",
    label: "RFPs Lost to Price",
    context: "When you differentiate on value, not commission rate",
    icon: Target
  },
  {
    metric: "285",
    label: "Avg Evidence Receipts",
    context: "Per client per year — every dollar of savings documented",
    icon: FileText
  },
  {
    metric: "12min",
    label: "Avg CFO Dashboard Time",
    context: "Per month — they actively monitor, reinforcing your value",
    icon: Clock
  }
];

const brokerChecklist = [
  { id: 1, text: "We disclose all direct and indirect PBM commission overrides and rebates to our clients as required by CAA." },
  { id: 2, text: "We routinely analyze the actual claim-level spread margin (difference between billing rate and pharmacy reimbursement)." },
  { id: 3, text: "All specialty pharmacy copay accumulator programs have been vetted to prevent double-dipping." },
  { id: 4, text: "We independent benchmark generic contract rates using live CMS NADAC indexes, rather than standard PBM AWP discounts." },
  { id: 5, text: "We provide clients with auditable evidence receipts for all pharmacy cost containment recommendations." }
];

export default function BrokersPage() {
  const [selectedTool, setSelectedTool] = useState<number | null>(null);
  const [selectedChallenge, setSelectedChallenge] = useState<number | null>(null);

  // Interactive Broker Simulator State
  const [clientSpend, setClientSpend] = useState<number>(3.5); // millions
  const [brokerModel, setBrokerModel] = useState<string>("transparent");
  const [calculating, setCalculating] = useState<boolean>(false);
  const [oppResults, setOppResults] = useState<{
    leakageFound: number;
    rfpScoreBonus: number;
    clientRetentionLift: number;
  } | null>({
    leakageFound: 647000,
    rfpScoreBonus: 28,
    clientRetentionLift: 94
  });

  // Interactive Broker Checklist State
  const [checkedBroker, setCheckedBroker] = useState<number[]>([]);

  const handleSimulateBroker = () => {
    setCalculating(true);
    setTimeout(() => {
      let leakagePct = 0.12; // default leakage
      if (brokerModel === "spread") leakagePct = 0.22; // spread models hide far more leakage

      const leakageFound = Math.round(clientSpend * 1000000 * leakagePct);
      const rfpScoreBonus = brokerModel === "transparent" ? 35 : 15;
      const clientRetentionLift = brokerModel === "transparent" ? 96 : 74;

      setOppResults({
        leakageFound,
        rfpScoreBonus,
        clientRetentionLift
      });
      setCalculating(false);
    }, 800);
  };

  const handleToggleBroker = (id: number) => {
    if (checkedBroker.includes(id)) {
      setCheckedBroker(checkedBroker.filter(item => item !== id));
    } else {
      setCheckedBroker([...checkedBroker, id]);
    }
  };

  const brokerScore = useMemo(() => {
    return Math.round((checkedBroker.length / brokerChecklist.length) * 100);
  }, [checkedBroker]);

  return (
    <>
      <Head>
        <title>For Brokers: Win on Value, Not Commission | SiriusB iQ</title>
        <meta
          name="description"
          content="Differentiate your brokerage with forensic PBM analytics, client retention tools, fiduciary compliance monitoring, and documented value delivery — not RFP theater."
        />
      </Head>

      <Nav />

      <div className="min-h-screen bg-gradient-to-b from-amber-950 via-slate-950 to-black text-white">
        {/* Hero Section with Featured Image */}
        <section className="relative pt-32 pb-24 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-600/20 via-transparent to-transparent" />
          <div className="absolute inset-0">
            <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>
          
          <div className="relative max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-3 px-5 py-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/30 rounded-full mb-8 backdrop-blur-sm">
                <Briefcase className="w-5 h-5 text-amber-300" />
                <span className="text-sm font-semibold text-amber-200">Benefits Brokers & Consultants</span>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
                <div>
                  <h1 className="text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r from-amber-200 via-orange-300 to-yellow-200 bg-clip-text text-transparent leading-tight">
                    Your PBM Met Every Guarantee.<br />
                    <span className="text-red-400">You Still Lost<br />the Money.</span>
                  </h1>
                  
                  <p className="text-2xl text-amber-100 mb-6 leading-relaxed">
                    Every broker promises "savings" and "transparency". Then renewal comes and the CFO asks: <span className="text-amber-300 font-bold">"Where's the proof?"</span>
                  </p>
                  
                  <p className="text-lg text-amber-300/80 mb-10">
                    SiriusB iQ gives you forensic PBM analytics, real-time client dashboards, and evidence-backed value reports — so you win renewals with documented ROI, not RFP theater.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/request-demo">
                      <Button size="lg" className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white text-lg px-8 py-6 shadow-2xl shadow-amber-500/50">
                        See Broker Portal Demo
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                    <Link href="#client-opportunity-simulator">
                      <Button size="lg" variant="outline" className="border-2 border-amber-400/50 text-amber-200 hover:bg-amber-500/20 text-lg px-8 py-6">
                        Explore RFP Opportunity Simulator
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
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl blur-3xl opacity-30 animate-pulse" />
                  <Card className="relative bg-gradient-to-br from-amber-950/80 to-orange-950/80 border-2 border-amber-400/50 p-4 shadow-2xl shadow-amber-500/50 backdrop-blur-xl">
                    <Image
                      src="/Firefly_Gemini_Flash_Your_PBM_Met_Every_Guarantee._You_Still_Lost_the_Money._Written_By_Jeremiah_Franklin_849606.png"
                      alt="Your PBM Met Every Guarantee. You Still Lost the Money - by Jeremiah Franklin"
                      width={800}
                      height={800}
                      className="rounded-xl w-full h-auto"
                      priority
                    />
                    <div className="mt-4 text-center">
                      <p className="text-sm text-amber-200 font-semibold">Written by Jeremiah Franklin, Founder</p>
                      <p className="text-xs text-amber-400 italic mt-1">The truth brokers need to hear</p>
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
                    <Card className="bg-gradient-to-br from-amber-900/30 to-orange-900/30 border-amber-500/40 backdrop-blur-xl p-6 hover:scale-105 transition-transform">
                      <item.icon className="w-8 h-8 text-amber-400 mb-3" />
                      <div className="text-5xl font-black text-amber-300 mb-2">{item.metric}</div>
                      <div className="text-sm text-amber-200 mb-2">{item.label}</div>
                      <div className="text-xs text-amber-400">{item.context}</div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Live Interactive Client Opportunity & RFP Deal Scoring Sandbox */}
        <section id="client-opportunity-simulator" className="py-24 px-4 bg-gradient-to-b from-slate-950 to-amber-950/40 border-t border-amber-500/20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 border border-amber-400/20 rounded-full mb-4 text-xs font-black text-amber-300 uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" /> Interactive RFP Sandbox
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent">
                RFP Leakage & Deal Closing Simulator
              </h2>
              <p className="text-xl text-amber-300/80 max-w-3xl mx-auto">
                Select your target prospect's pharmacy spend and contract structure to simulate the forensic leakage findings and projected deal closing leverage.
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* Controls Column */}
              <Card className="lg:col-span-5 bg-black/40 border-amber-500/30 p-8 backdrop-blur-xl">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-amber-400" /> Prospect Profile & Contract structure
                </h3>

                <div className="space-y-6">
                  {/* Prospect Spend */}
                  <div>
                    <div className="flex justify-between text-sm font-semibold mb-2">
                      <span className="text-amber-200">Annual Client Pharmacy Spend</span>
                      <span className="text-amber-300">${clientSpend}M</span>
                    </div>
                    <input
                      type="range"
                      min={0.5}
                      max={20}
                      step={0.5}
                      value={clientSpend}
                      onChange={(e) => setClientSpend(Number(e.target.value))}
                      className="w-full accent-amber-500 h-1.5 bg-amber-950 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-amber-500/70 mt-1">
                      <span>$500K</span>
                      <span>$20M</span>
                    </div>
                  </div>

                  {/* Broker Current PBM Model */}
                  <div>
                    <span className="block text-sm font-semibold text-amber-200 mb-2">Current PBM Contract Structure</span>
                    <select
                      value={brokerModel}
                      onChange={(e) => setBrokerModel(e.target.value)}
                      className="w-full px-4 py-3 bg-black/60 border border-amber-500/30 rounded-xl text-amber-200 focus:outline-none focus:border-amber-400"
                    >
                      <option value="transparent">Transparent / Pass-Through (Typical leakage: ~12%)</option>
                      <option value="spread">Traditional Spread/Rebate-Retained (Typical leakage: ~22%)</option>
                    </select>
                  </div>

                  <Button
                    onClick={handleSimulateBroker}
                    disabled={calculating}
                    className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white py-6 text-base font-black shadow-lg"
                  >
                    {calculating ? (
                      <span className="flex items-center gap-2 justify-center">
                        <RefreshCw className="w-5 h-5 animate-spin" /> running forensic opportunity run...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 justify-center">
                        <Target className="w-5 h-5 animate-pulse" /> Simulate Prospect Deal Winning Power
                      </span>
                    )}
                  </Button>
                </div>
              </Card>

              {/* Outputs Column */}
              <Card className="lg:col-span-7 bg-amber-950/20 border-amber-500/30 p-8 backdrop-blur-xl relative overflow-hidden self-stretch flex flex-col justify-between">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Briefcase className="w-32 h-32 text-amber-400" />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-orange-400" /> Projected Opportunity Findings
                  </h3>

                  <AnimatePresence mode="wait">
                    {oppResults && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-6"
                      >
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="bg-black/30 p-4 rounded-xl border border-amber-500/20">
                            <span className="block text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">Contract Leakage Found</span>
                            <span className="text-2xl font-black text-white">${(oppResults.leakageFound).toLocaleString()}</span>
                            <span className="block text-[10px] text-amber-400/60 mt-1">Ready to present to prospect CFO</span>
                          </div>
                          <div className="bg-amber-900/30 p-4 rounded-xl border border-amber-400/30">
                            <span className="block text-xs font-semibold text-amber-300 uppercase tracking-wider mb-1">RFP Score Bonus</span>
                            <span className="text-2xl font-black text-amber-300">+{oppResults.rfpScoreBonus}%</span>
                            <span className="block text-[10px] text-amber-300/60 mt-1">Closing rate win probability lift</span>
                          </div>
                          <div className="bg-orange-950/40 p-4 rounded-xl border border-orange-400/30">
                            <span className="block text-xs font-semibold text-orange-300 uppercase tracking-wider mb-1">CFO Retention Rate</span>
                            <span className="text-2xl font-black text-orange-300">{oppResults.clientRetentionLift}%</span>
                            <span className="block text-[10px] text-orange-300/60 mt-1">Projected client loyalty score</span>
                          </div>
                        </div>

                        <div className="bg-black/40 p-6 rounded-xl border border-amber-500/20 space-y-4">
                          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Broker Client Acquisition Impact</h4>
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-amber-300">Projected Client Loyalty Score</span>
                                <span className="font-bold text-white">{oppResults.clientRetentionLift}% Retention</span>
                              </div>
                              <div className="w-full bg-amber-950 h-2.5 rounded-full overflow-hidden">
                                <div className="bg-gradient-to-r from-amber-500 to-orange-400 h-full rounded-full" style={{ width: `${oppResults.clientRetentionLift}%` }} />
                              </div>
                            </div>
                            <div className="flex justify-between text-xs pt-2 text-amber-300/70 border-t border-amber-500/10">
                              <span>Prospect Conversion Win Rate</span>
                              <span className="font-bold text-white">3.2x More Closed Deals</span>
                            </div>
                          </div>
                          <p className="text-xs text-amber-300/60 leading-relaxed italic pt-2">
                            *By showing prospects exact dollar leakage backed by forensic page and clause references, you bypass generic marketing and speak directly to their CFO's fiduciary obligations.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="mt-6 pt-6 border-t border-amber-500/10 flex items-center justify-between text-xs text-amber-400/70">
                  <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> Client-Specific Forensics</span>
                  <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> CFO-Ready Reports</span>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* ERISA & Broker Fiduciary Responsibility Self-Audit Checklist */}
        <section className="py-24 px-4 bg-black">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-amber-950/40 to-slate-950/40 border border-amber-500/30 p-10 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl" />

              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-amber-500/10 border border-amber-400/30 rounded-xl">
                    <Shield className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white">Broker Fiduciary & Compensation Audit</h3>
                    <p className="text-sm text-amber-300">Vet your broker and consultant compliance practices against Consolidated Appropriations Act (CAA) guidelines.</p>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {brokerChecklist.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleToggleBroker(item.id)}
                      className="flex items-start gap-4 p-4 rounded-xl border border-amber-500/10 bg-amber-950/10 hover:bg-amber-950/20 cursor-pointer transition-all"
                    >
                      <div className={`w-5 h-5 rounded border flex items-center justify-center mt-0.5 transition-all ${
                        checkedBroker.includes(item.id)
                          ? "bg-amber-500 border-amber-400 text-white"
                          : "border-amber-500/30 text-transparent"
                      }`}>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-amber-100 text-sm leading-relaxed">{item.text}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-amber-950/30 rounded-xl p-6 border border-amber-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <span className="block text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">Your Broker Alignment Score</span>
                    <span className="text-4xl font-black text-white">{brokerScore}%</span>
                    <span className="block text-xs text-amber-300/60 mt-1">Fiduciary score based on CAA ERISA benchmarks</span>
                  </div>

                  <div className="text-right">
                    {brokerScore === 100 ? (
                      <span className="text-emerald-400 font-bold flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Fully Aligned Broker</span>
                    ) : brokerScore >= 60 ? (
                      <span className="text-yellow-400 font-bold flex items-center gap-1.5"><AlertCircle className="w-4 h-4" /> Moderate Oversight Gaps</span>
                    ) : (
                      <span className="text-red-400 font-bold flex items-center gap-1.5"><AlertTriangle className="w-4 h-4" /> Commission & CAA Risk</span>
                    )}
                    <span className="block text-[11px] text-amber-300/50 mt-1">CFOs require written Form 5500 commission disclosures annually</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Broker Challenges Section */}
        <section className="py-24 px-4 bg-gradient-to-b from-black to-amber-950/30">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent">
                The Four Broker Challenges
              </h2>
              <p className="text-xl text-amber-300 max-w-3xl mx-auto">
                Why traditional approaches fail — and how to fix them
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {brokerChallenges.map((challenge, index) => (
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

        {/* Broker Tools Section */}
        <section className="py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent">
                Your Broker Value Toolkit
              </h2>
              <p className="text-xl text-amber-300 max-w-3xl mx-auto">
                Everything you need to differentiate, win, and retain clients with documented value
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {brokerTools.map((tool, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    className="bg-gradient-to-br from-amber-950/40 to-orange-950/40 border-amber-500/30 p-8 h-full group hover:scale-105 transition-all cursor-pointer"
                    onClick={() => setSelectedTool(selectedTool === index ? null : index)}
                  >
                    <tool.icon className="w-12 h-12 text-amber-400 mb-6 group-hover:scale-110 transition-transform" />
                    <h3 className="text-2xl font-bold text-white mb-4">{tool.title}</h3>
                    <p className="text-amber-100 mb-6">{tool.description}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {tool.metrics.map((metric, idx) => (
                        <div key={idx} className="px-3 py-1 bg-amber-500/20 border border-amber-500/40 rounded-full text-xs text-amber-300">
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
                        <div className="bg-amber-950/50 rounded-lg p-4 border border-amber-500/30">
                          <div className="text-sm text-amber-200 font-semibold mb-3">Key Features:</div>
                          <ul className="text-xs text-amber-300 space-y-2">
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

        {/* Client Retention Framework */}
        <section className="py-24 px-4 bg-gradient-to-b from-amber-950/30 to-black">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent">
                The 94% Retention Framework
              </h2>
              <p className="text-xl text-amber-300 max-w-3xl mx-auto">
                How leading brokers use SiriusB iQ to achieve industry-leading client retention
              </p>
            </motion.div>

            <div className="space-y-8">
              {clientRetentionFramework.map((phase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-gradient-to-r from-amber-950/50 to-orange-950/50 border-amber-500/40 p-8">
                    <div className="flex items-start gap-6">
                      <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl px-6 py-8 shadow-xl shadow-amber-500/50 flex-shrink-0 min-w-[200px] text-center">
                        <div className="text-white font-black text-3xl mb-2">{phase.phase}</div>
                        <div className="text-amber-100 text-sm">{phase.objective}</div>
                      </div>
                      <div className="flex-1">
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <div className="text-sm font-semibold text-amber-400 mb-3">Deliverables:</div>
                            <ul className="text-sm text-amber-200 space-y-2">
                              {phase.deliverables.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-orange-400 mb-3">Client Experience:</div>
                            <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/30 rounded-lg p-4">
                              <p className="text-emerald-200 text-sm italic">"{phase.clientExperience}"</p>
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

        {/* Competitive Comparison */}
        <section className="py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent">
                Traditional Broker vs. SiriusB iQ Broker
              </h2>
              <p className="text-xl text-amber-300 max-w-3xl mx-auto">
                Why leading brokerages adopt forensic analytics to win and retain clients
              </p>
            </motion.div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-amber-500/30">
                    <th className="text-left p-4 text-amber-300 font-bold">Dimension</th>
                    <th className="text-left p-4 text-gray-400 font-bold">Traditional Broker</th>
                    <th className="text-left p-4 text-amber-400 font-bold">SiriusB iQ Broker</th>
                    <th className="text-left p-4 text-emerald-400 font-bold">Your Advantage</th>
                  </tr>
                </thead>
                <tbody>
                  {competitiveComparison.map((row, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-amber-500/10 hover:bg-amber-950/20 transition-colors"
                    >
                      <td className="p-4 text-amber-300 font-semibold">{row.dimension}</td>
                      <td className="p-4 text-gray-400">{row.traditional}</td>
                      <td className="p-4 text-amber-200">{row.siriusb}</td>
                      <td className="p-4 text-emerald-300">{row.advantage}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Success Metrics Grid */}
        <section className="py-24 px-4 bg-gradient-to-b from-amber-950/30 to-black">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent">
                The Numbers Don't Lie
              </h2>
              <p className="text-xl text-amber-300 max-w-3xl mx-auto">
                What happens when you differentiate on value, not commission rate
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
                  <Card className="bg-gradient-to-br from-amber-900/40 to-orange-900/40 border-amber-500/30 p-8 text-center hover:scale-105 transition-transform">
                    <metric.icon className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                    <div className="text-6xl font-black text-amber-300 mb-3">{metric.metric}</div>
                    <div className="text-lg text-amber-200 font-semibold mb-2">{metric.label}</div>
                    <div className="text-sm text-amber-400">{metric.context}</div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Value Toolkit CTA */}
        <section id="value-toolkit" className="py-24 px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="relative bg-gradient-to-br from-amber-900/80 to-orange-900/80 border-4 border-amber-400 p-12 shadow-[0_0_60px_rgba(251,191,36,0.6),0_0_100px_rgba(251,191,36,0.4),0_0_140px_rgba(251,191,36,0.2)]">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-yellow-500/20 rounded-lg" />
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 rounded-lg blur-xl opacity-75" />
              
              <div className="relative">
                <div className="text-center mb-8">
                  <div className="inline-block px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mb-4 shadow-[0_0_30px_rgba(251,191,36,0.8)]">
                    <span className="text-sm font-black text-white uppercase tracking-wider">🏆 Broker Value Toolkit 🏆</span>
                  </div>
                  <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-amber-200 via-white to-orange-200 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(251,191,36,0.8)]">
                    Get the Complete Toolkit
                  </h2>
                  <p className="text-xl text-amber-100 drop-shadow-[0_0_15px_rgba(251,191,36,0.6)]">
                    Client RFP templates, contract X-ray samples, value delivery report examples, and broker differentiation guides.
                  </p>
                </div>
                
                <form className="max-w-2xl mx-auto space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-black text-amber-100 mb-2 uppercase tracking-wide drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]">Full Name</label>
                      <input
                        type="text"
                        required
                        className="w-full px-5 py-4 bg-black/60 border-3 border-amber-400 rounded-xl text-white placeholder-amber-300/70 focus:outline-none focus:border-amber-300 focus:shadow-[0_0_30px_rgba(251,191,36,0.8)] transition-all font-semibold"
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-black text-amber-100 mb-2 uppercase tracking-wide drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]">Email</label>
                      <input
                        type="email"
                        required
                        className="w-full px-5 py-4 bg-black/60 border-3 border-amber-400 rounded-xl text-white placeholder-amber-300/70 focus:outline-none focus:border-amber-300 focus:shadow-[0_0_30px_rgba(251,191,36,0.8)] transition-all font-semibold"
                        placeholder="john@brokeragefirm.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-black text-amber-100 mb-2 uppercase tracking-wide drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]">Brokerage Firm</label>
                      <input
                        type="text"
                        required
                        className="w-full px-5 py-4 bg-black/60 border-3 border-amber-400 rounded-xl text-white placeholder-amber-300/70 focus:outline-none focus:border-amber-300 focus:shadow-[0_0_30px_rgba(251,191,36,0.8)] transition-all font-semibold"
                        placeholder="Benefits Group LLC"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-black text-amber-100 mb-2 uppercase tracking-wide drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]">Role</label>
                      <select
                        required
                        className="w-full px-5 py-4 bg-black/60 border-3 border-amber-400 rounded-xl text-white focus:outline-none focus:border-amber-300 focus:shadow-[0_0_30px_rgba(251,191,36,0.8)] transition-all font-semibold"
                      >
                        <option value="">Select role...</option>
                        <option value="producer">Producer / Sales Agent</option>
                        <option value="account-manager">Account Manager</option>
                        <option value="consultant">Employee Benefits Consultant</option>
                        <option value="principal">Principal / Owner</option>
                        <option value="director">Director of Client Services</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-black text-amber-100 mb-2 uppercase tracking-wide drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]">Book Size (Annual Premium)</label>
                    <select
                      required
                      className="w-full px-5 py-4 bg-black/60 border-3 border-amber-400 rounded-xl text-white focus:outline-none focus:border-amber-300 focus:shadow-[0_0_30px_rgba(251,191,36,0.8)] transition-all font-semibold"
                    >
                      <option value="">Select book size...</option>
                      <option value="<10m">Under $10M</option>
                      <option value="10-25m">$10M - $25M</option>
                      <option value="25-50m">$25M - $50M</option>
                      <option value="50-100m">$50M - $100M</option>
                      <option value=">100m">Over $100M</option>
                    </select>
                  </div>

                  <Link href="/request-demo">
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 hover:from-amber-400 hover:via-orange-400 hover:to-yellow-400 text-white text-2xl font-black py-8 shadow-[0_0_40px_rgba(251,191,36,0.9),0_0_60px_rgba(251,191,36,0.6),0_0_80px_rgba(251,191,36,0.4)] hover:shadow-[0_0_50px_rgba(251,191,36,1),0_0_80px_rgba(251,191,36,0.8),0_0_120px_rgba(251,191,36,0.6)] uppercase tracking-wider border-2 border-white/50"
                    >
                      🌟 Download Broker Toolkit 🌟
                      <ArrowRight className="w-6 h-6 ml-3" />
                    </Button>
                  </Link>
                  
                  <p className="text-xs text-center text-amber-200 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]">
                    Includes: Contract X-ray samples • Client dashboard demo • Value report templates • RFP differentiation guide
                  </p>
                </form>
              </div>
            </Card>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 px-4 bg-gradient-to-b from-amber-950/30 to-black">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Award className="w-16 h-16 mx-auto mb-6 text-amber-400" />
              <h2 className="text-5xl font-black mb-8 bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent">
                Stop Competing. Start Dominating.
              </h2>
              <p className="text-2xl text-amber-200 mb-12">
                Schedule a 30-minute broker briefing to see the portal, client dashboards, and value delivery reporting in action.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/request-demo">
                  <Button size="lg" className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white text-xl px-12 py-8 shadow-2xl shadow-amber-500/50">
                    Schedule Broker Briefing
                    <Briefcase className="w-6 h-6 ml-3" />
                  </Button>
                </Link>
                <Link href="/contract-xray-offering">
                  <Button size="lg" variant="outline" className="border-2 border-amber-400/50 text-amber-200 hover:bg-amber-500/20 text-xl px-12 py-8">
                    See Contract X-Ray Demo
                    <Eye className="w-6 h-6 ml-3" />
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-amber-400 mt-8">
                Live broker portal demo • Client dashboard walkthrough • White-label options • Value delivery report samples
              </p>
            </motion.div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}