import { useRef } from "react";
import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Target, Shield, FileCheck, Briefcase, Activity, CheckCircle2, ArrowRight, Sparkles, Zap, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

function StatsCard({ title, value, description, icon: Icon, delay = 0 }: { title: string; value: string; description: string; icon: any; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.05, y: -10 }}
      className="relative group"
    >
      <Card className="relative overflow-hidden bg-slate-900/60 border border-slate-800 backdrop-blur-xl h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-[#B8860B]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <CardHeader className="relative">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/20">
              <Icon className="h-6 w-6 text-emerald-400" />
            </div>
            <CardTitle className="text-sm font-medium text-slate-400">{title}</CardTitle>
          </div>
          <div className="text-4xl font-bold text-white">
            {value}
          </div>
        </CardHeader>
        <CardContent className="relative">
          <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
            {description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function MaVcPePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <>
      <SEO
        title="M&A / VC / PE Diligence & Value Realization - SiriusB iQ"
        description="Forensic, evidence-based M&A diligence and value realization tracking. Turn hidden portfolio company benefits waste into enterprise valuation growth."
      />
      <div className="flex min-h-screen flex-col bg-slate-950 text-white">
        <Nav />
        
        <main className="flex-1">
          {/* Hero Section */}
          <section ref={heroRef} className="relative pt-32 pb-24 px-6 overflow-hidden border-b border-emerald-950/40 bg-gradient-to-b from-emerald-950/20 via-slate-950 to-slate-950">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/10 via-transparent to-transparent" />
            
            <div className="relative mx-auto max-w-7xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  style={{ opacity, scale }}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-emerald-950/45 border border-emerald-500/20 rounded-full mb-8 backdrop-blur-sm">
                    <Shield className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-semibold tracking-wider text-emerald-200 uppercase">M&A / VC / PE Diligence</span>
                  </div>

                  <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight text-white leading-tight font-serif">
                    Find Leakage. Prove It. <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-200 to-[#B8860B]">
                      Track Realization.
                    </span>
                  </h1>

                  <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed">
                    Evidence-based diligence that survives integration reality. Transform <span className="text-emerald-400 font-bold">claimed synergies</span> into <span className="text-[#B8860B] font-bold">proven outcomes</span> with cryptographic evidence receipts and autonomous realization tracking.
                  </p>

                  <div className="flex gap-4 flex-wrap">
                    <Link href="/request-demo">
                      <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white text-base px-8 py-5 rounded-lg shadow-xl shadow-emerald-950/50 font-bold">
                        Schedule Diligence Review
                        <Zap className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                    <Link href="/all-uploads">
                      <Button size="lg" variant="outline" className="border-slate-800 text-slate-200 hover:bg-slate-900 text-base px-8 py-5 rounded-lg">
                        View Briefs Library
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>

                <motion.div 
                  className="grid grid-cols-2 gap-4"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <StatsCard
                    icon={AlertTriangle}
                    title="Claimed Synergies"
                    value="$18.2M"
                    description="Pre-close management estimates"
                    delay={0.1}
                  />
                  <StatsCard
                    icon={CheckCircle2}
                    title="Proven & Realized"
                    value="$7.4M"
                    description="Evidence-backed cash flow"
                    delay={0.2}
                  />
                  <StatsCard
                    icon={Activity}
                    title="In-Flight Wins"
                    value="$4.3M"
                    description="Assigned owners & timelines"
                    delay={0.3}
                  />
                  <StatsCard
                    icon={Target}
                    title="Realization Rate"
                    value="87%"
                    description="With fiduciary audit framework"
                    delay={0.4}
                  />
                </motion.div>
              </div>
            </div>
          </section>

          {/* The Problem Section */}
          <section className="relative px-6 py-20 bg-slate-950 border-b border-slate-900">
            <div className="relative mx-auto max-w-7xl">
              <div className="text-center mb-16">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-950/50 px-3 py-1 rounded-full">
                  Deal Execution Challenges
                </span>
                <h2 className="text-4xl font-bold text-white mt-4 font-serif">
                  Why Most Synergies Evaporate Post-Close
                </h2>
                <p className="text-sm text-slate-400 mt-2 max-w-2xl mx-auto">
                  The gap between pre-close Excel projections and post-acquisition integration destroys enterprise value. Let's translate what actually happens.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Promise Card */}
                <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-2.5 py-1 text-[11px] font-bold bg-rose-500/10 text-rose-400 rounded-full uppercase">Pre-Close Projections</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      "Management claims $15M in operational synergies"
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed mb-6">
                      Deal teams rely on high-level PowerPoint decks from sellers' brokers. No individual owners, no target milestone dates, and zero verifiable evidence receipts.
                    </p>
                  </div>
                  <div className="p-5 rounded-xl bg-emerald-950/20 border border-emerald-500/15">
                    <div className="flex items-center gap-2 mb-2 text-emerald-400 font-bold text-xs">
                      <HelpCircleIcon className="w-3.5 h-3.5" /> Plain English Reality Check:
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      It is like buying a car where the dealer promises you will save 40% on fuel costs, but doesn't mention that you have to drive strictly downhill, with the engine off, and with a tailwind. When integration begins, these paper savings disappear instantly.
                    </p>
                  </div>
                </div>

                {/* Reality Card */}
                <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-2.5 py-1 text-[11px] font-bold bg-rose-500/10 text-rose-400 rounded-full uppercase">Post-Close Integration</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      "18 months later, CFO cannot trace where savings went"
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed mb-6">
                      Without an audit ledger, reconciliation reports, or an ongoing monitoring engine, the integration group dissolves, and potential EBITDA leakage continues unchecked.
                    </p>
                  </div>
                  <div className="p-5 rounded-xl bg-[#B8860B]/10 border border-[#B8860B]/20">
                    <div className="flex items-center gap-2 mb-2 text-[#B8860B] font-bold text-xs">
                      <HelpCircleIcon className="w-3.5 h-3.5" /> Plain English Reality Check:
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Your portco pays premium pharmacy invoices that hide massive administrative spread markups and secret broker kickbacks inside complex, un-auditable line items. Value is destroyed silently every time an employee fills a prescription.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Core Services Section */}
          <section className="relative px-6 py-20 bg-slate-900 border-b border-slate-800">
            <div className="mx-auto max-w-7xl">
              <div className="text-center mb-16">
                <span className="text-xs font-bold text-[#B8860B] uppercase tracking-widest bg-[#B8860B]/10 px-3 py-1 rounded-full">
                  Diligence Infrastructure
                </span>
                <h2 className="text-4xl font-bold text-white mt-4 font-serif">
                  Forensic Services for PE & Deal Teams
                </h2>
                <p className="text-sm text-slate-400 mt-2 max-w-2xl mx-auto">
                  Deploy elite, evidence-based systems that protect deal models and construct hard post-close exit valuation additions.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Serv 1 */}
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8 hover:border-emerald-500/20 transition-all">
                  <div className="p-3 bg-emerald-950/45 border border-emerald-500/20 rounded-xl inline-block mb-6">
                    <FileCheck className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">Diligence Proof Packs</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Quantify actual baseline pharmacy transaction trends within a 2-4 week sprint. Receive comprehensive, cryptographically verified reports revealing the true spread structure of the target portco.
                  </p>
                </div>

                {/* Serv 2 */}
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8 hover:border-[#B8860B]/20 transition-all">
                  <div className="p-3 bg-[#B8860B]/10 border border-[#B8860B]/20 rounded-xl inline-block mb-6">
                    <Briefcase className="w-6 h-6 text-[#B8860B]" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">Integration Workflows</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Establish clear milestone dates, specific portco executive owners, and pre-authorized contract amendments to capture identified leakage within the critical first 90 days post-acquisition.
                  </p>
                </div>

                {/* Serv 3 */}
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8 hover:border-emerald-500/20 transition-all">
                  <div className="p-3 bg-emerald-950/45 border border-emerald-500/20 rounded-xl inline-block mb-6">
                    <TrendingUp className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">Realization Governance</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Protect portfolio companies with ongoing algorithmic transaction monitoring that catches contract-creep, unauthorized specialty claims, and hidden margins immediately.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Real Case Study Section */}
          <section className="relative px-6 py-20 bg-slate-950">
            <div className="relative mx-auto max-w-5xl">
              <Card className="bg-slate-900 border border-slate-800 overflow-hidden rounded-2xl">
                <div className="p-8 md:p-12">
                  <div className="flex items-center gap-3 mb-6">
                    <Badge className="bg-emerald-950/50 text-emerald-300 border border-emerald-500/20">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Featured Value Creation Study
                    </Badge>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-white mb-6 font-serif">
                    $18.2M Synergies Underwritten → $7.4M Audited & Realized
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="p-5 rounded-xl border border-slate-800 bg-slate-950/60 text-center">
                      <div className="text-3xl font-bold text-slate-400">$18.2M</div>
                      <p className="text-[11px] text-slate-500 uppercase font-semibold mt-1">Claimed in Diligence</p>
                    </div>
                    <div className="p-5 rounded-xl border border-emerald-500/25 bg-emerald-950/20 text-center">
                      <div className="text-3xl font-bold text-emerald-400">$7.4M</div>
                      <p className="text-[11px] text-emerald-500 uppercase font-semibold mt-1">Fiducially Realized</p>
                    </div>
                    <div className="p-5 rounded-xl border border-[#B8860B]/30 bg-[#B8860B]/5 text-center">
                      <div className="text-3xl font-bold text-[#B8860B]">$4.3M</div>
                      <p className="text-[11px] text-[#B8860B] uppercase font-semibold mt-1">Milestoned In-Flight</p>
                    </div>
                  </div>

                  <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
                    <p>
                      <strong className="text-white">The Challenge:</strong> A premier middle-market private equity operator acquired a logistics business with an estimated $18.2M in annual operational healthcare synergies. To secure Board approval, the deal team required immediate, verifiable contract data.
                    </p>
                    <p>
                      <strong className="text-white">Our Action:</strong> Implemented the SiriusB iQ Value Office inside 30 days. Logged every single medical claim into our secure ledger, restructured the broker contract with clear fiduciary audit terms, and assigned key performance milestones directly to the integration director.
                    </p>
                    <p>
                      <strong className="text-white">The Outcome:</strong> Successfully separated verified cash savings ($7.4M) and milestoned projects ($4.3M) from non-verifiable paper savings ($6.5M), creating an auditable ledger that proved exit enterprise value to subsequent institutional buyers.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* CTA Section */}
          <section className="relative px-6 py-24 bg-gradient-to-b from-slate-950 to-emerald-950/20 border-t border-slate-900 text-center">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-4xl font-bold mb-6 font-serif">
                Secure Your Portco EBITDA Growth
              </h2>
              <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
                Connect with our advisory deal team for a private, 30-minute diligence briefing. Review custom spreadsheets, compliance trackers, and baseline evaluation templates.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link href="/request-demo">
                  <Button size="lg" className="bg-[#B8860B] hover:bg-[#a67c0a] text-white text-base font-bold px-10 py-5 rounded-lg shadow-xl shadow-[#B8860B]/10">
                    Schedule Operator Consultation
                    <Zap className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/broker-compensation">
                  <Button size="lg" variant="outline" className="border-slate-800 text-slate-300 hover:bg-slate-900 text-base px-10 py-5 rounded-lg">
                    Launch Broker Compensation Auditor
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

function HelpCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  );
}