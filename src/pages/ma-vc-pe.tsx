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

function StatsCard({ title, value, description, icon: Icon, delay = 0, color = "emerald", particles = 10 }: { title: string; value: string; description: string; icon: any; delay?: number; color?: string; particles?: number }) {
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
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: particles }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 bg-${color}-400/60 rounded-full`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <Card className="relative overflow-hidden bg-slate-900/60 border border-slate-800 backdrop-blur-xl h-full">
        <div className={`absolute inset-0 bg-gradient-to-br from-${color}-500/5 to-${color}-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
        
        <CardHeader className="relative">
          <div className="flex items-center gap-3 mb-2">
            <motion.div 
              className={`p-2 rounded-lg bg-${color}-950/40 border border-${color}-500/20 group-hover:shadow-lg group-hover:shadow-${color}-500/50 transition-all`}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Icon className={`h-6 w-6 text-${color}-400`} />
            </motion.div>
            <CardTitle className="text-sm font-medium text-slate-400 group-hover:text-slate-300 transition-colors">{title}</CardTitle>
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

        {/* Shimmer effect on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
          initial={false}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
          />
        </motion.div>

        {/* Corner accents */}
        <div className={`absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-${color}-500/0 group-hover:border-${color}-500/60 rounded-tr-2xl transition-all duration-500`} />
        <div className={`absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-${color}-500/0 group-hover:border-${color}-500/60 rounded-bl-2xl transition-all duration-500`} />
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
            {/* Animated background orbs */}
            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                className="absolute top-1/4 left-1/3 w-[700px] h-[700px] bg-gradient-radial from-emerald-500/20 via-emerald-500/5 to-transparent rounded-full blur-3xl"
                animate={{ 
                  x: [0, 100, 0],
                  y: [0, -60, 0],
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute bottom-1/4 right-1/3 w-[600px] h-[600px] bg-gradient-radial from-amber-500/15 via-amber-500/5 to-transparent rounded-full blur-3xl"
                animate={{ 
                  x: [0, -80, 0],
                  y: [0, 50, 0],
                  scale: [1, 1.15, 1],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 3 }}
              />
            </div>
            
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
                    color="orange"
                    particles={12}
                  />
                  <StatsCard
                    icon={CheckCircle2}
                    title="Proven & Realized"
                    value="$7.4M"
                    description="Evidence-backed cash flow"
                    delay={0.2}
                    color="emerald"
                    particles={14}
                  />
                  <StatsCard
                    icon={Activity}
                    title="In-Flight Wins"
                    value="$4.3M"
                    description="Assigned owners & timelines"
                    delay={0.3}
                    color="blue"
                    particles={11}
                  />
                  <StatsCard
                    icon={Target}
                    title="Realization Rate"
                    value="87%"
                    description="With fiduciary audit framework"
                    delay={0.4}
                    color="violet"
                    particles={13}
                  />
                </motion.div>
              </div>
            </div>
          </section>

          {/* The Problem Section */}
          <section className="relative px-6 py-20 bg-slate-950 border-b border-slate-900 overflow-hidden">
            {/* Background orbs */}
            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-gradient-radial from-red-500/15 via-red-500/5 to-transparent rounded-full blur-3xl"
                animate={{ 
                  x: [0, -70, 0],
                  y: [0, 40, 0],
                  scale: [1, 1.1, 1],
                  opacity: [0.25, 0.4, 0.25]
                }}
                transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            <div className="relative mx-auto max-w-7xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-950/50 px-3 py-1 rounded-full">
                  Deal Execution Challenges
                </span>
                <h2 className="text-4xl font-bold text-white mt-4 font-serif">
                  Why Most Synergies Evaporate Post-Close
                </h2>
                <p className="text-sm text-slate-400 mt-2 max-w-2xl mx-auto">
                  The gap between pre-close Excel projections and post-acquisition integration destroys enterprise value. Let's translate what actually happens.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Promise Card */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="group"
                >
                  <motion.div 
                    className="p-8 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between h-full"
                    whileHover={{ scale: 1.02, borderColor: "rgba(239, 68, 68, 0.3)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="px-2.5 py-1 text-[11px] font-bold bg-rose-500/10 text-rose-400 rounded-full uppercase">Pre-Close Projections</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-rose-100 transition-colors">
                        "Management claims $15M in operational synergies"
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed mb-6 group-hover:text-slate-300 transition-colors">
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

                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                      initial={false}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                      />
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* Reality Card */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="group"
                >
                  <motion.div 
                    className="p-8 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between h-full"
                    whileHover={{ scale: 1.02, borderColor: "rgba(251, 191, 36, 0.3)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="px-2.5 py-1 text-[11px] font-bold bg-rose-500/10 text-rose-400 rounded-full uppercase">Post-Close Integration</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-100 transition-colors">
                        "18 months later, CFO cannot trace where savings went"
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed mb-6 group-hover:text-slate-300 transition-colors">
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

                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                      initial={false}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                      />
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Core Services Section */}
          <section className="relative px-6 py-20 bg-slate-900 border-b border-slate-800 overflow-hidden">
            {/* Background orbs */}
            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                className="absolute top-1/2 left-1/2 w-[700px] h-[700px] bg-gradient-radial from-amber-500/15 via-amber-500/5 to-transparent rounded-full blur-3xl"
                animate={{ 
                  x: [0, 90, 0],
                  y: [0, -50, 0],
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 21, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            <div className="relative mx-auto max-w-7xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <span className="text-xs font-bold text-[#B8860B] uppercase tracking-widest bg-[#B8860B]/10 px-3 py-1 rounded-full">
                  Diligence Infrastructure
                </span>
                <h2 className="text-4xl font-bold text-white mt-4 font-serif">
                  Forensic Services for PE & Deal Teams
                </h2>
                <p className="text-sm text-slate-400 mt-2 max-w-2xl mx-auto">
                  Deploy elite, evidence-based systems that protect deal models and construct hard post-close exit valuation additions.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    icon: FileCheck,
                    title: "Diligence Proof Packs",
                    description: "Quantify actual baseline pharmacy transaction trends within a 2-4 week sprint. Receive comprehensive, cryptographically verified reports revealing the true spread structure of the target portco.",
                    color: "emerald",
                    particles: 12
                  },
                  {
                    icon: Briefcase,
                    title: "Integration Workflows",
                    description: "Establish clear milestone dates, specific portco executive owners, and pre-authorized contract amendments to capture identified leakage within the critical first 90 days post-acquisition.",
                    color: "amber",
                    particles: 10
                  },
                  {
                    icon: TrendingUp,
                    title: "Realization Governance",
                    description: "Protect portfolio companies with ongoing algorithmic transaction monitoring that catches contract-creep, unauthorized specialty claims, and hidden margins immediately.",
                    color: "emerald",
                    particles: 14
                  }
                ].map((service, index) => {
                  const Icon = service.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.15, type: "spring" }}
                      className="group relative"
                    >
                      {/* Floating particles */}
                      <div className="absolute inset-0 pointer-events-none">
                        {Array.from({ length: service.particles }).map((_, i) => (
                          <motion.div
                            key={i}
                            className={`absolute w-1 h-1 bg-${service.color}-400/60 rounded-full`}
                            style={{
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                              y: [0, -25, 0],
                              x: [0, Math.random() * 15 - 7.5, 0],
                              opacity: [0, 1, 0],
                              scale: [0, 1.3, 0],
                            }}
                            transition={{
                              duration: 2.5 + Math.random() * 1.5,
                              repeat: Infinity,
                              delay: Math.random() * 2,
                              ease: "easeInOut"
                            }}
                          />
                        ))}
                      </div>

                      <motion.div 
                        className={`bg-slate-950 border border-slate-800 rounded-2xl p-8 h-full`}
                        whileHover={{ 
                          scale: 1.03,
                          borderColor: service.color === "emerald" ? "rgba(16, 185, 129, 0.3)" : "rgba(251, 191, 36, 0.3)",
                          boxShadow: service.color === "emerald" ? "0 25px 50px -12px rgba(16, 185, 129, 0.3)" : "0 25px 50px -12px rgba(251, 191, 36, 0.3)"
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <motion.div 
                          className={`p-3 bg-${service.color === "emerald" ? "emerald" : "amber"}-950/45 border border-${service.color === "emerald" ? "emerald" : "amber"}-500/20 rounded-xl inline-block mb-6 group-hover:shadow-xl group-hover:shadow-${service.color === "emerald" ? "emerald" : "amber"}-500/50 transition-all`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          <Icon className={`w-6 h-6 text-${service.color === "emerald" ? "emerald" : "amber"}-400`} />
                        </motion.div>
                        <h3 className="text-lg font-bold text-white mb-3 group-hover:text-white/90 transition-colors">{service.title}</h3>
                        <p className="text-xs text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                          {service.description}
                        </p>

                        {/* Shimmer effect */}
                        <motion.div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                          initial={false}
                        >
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                            animate={{ x: ["-100%", "200%"] }}
                            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                          />
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Real Case Study Section */}
          <section className="relative px-6 py-20 bg-slate-950 overflow-hidden">
            {/* Background orbs */}
            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-radial from-emerald-500/15 via-emerald-500/5 to-transparent rounded-full blur-3xl"
                animate={{ 
                  x: [0, 60, 0],
                  y: [0, -30, 0],
                  scale: [1, 1.15, 1],
                  opacity: [0.2, 0.35, 0.2]
                }}
                transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            <div className="relative mx-auto max-w-5xl">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, type: "spring" }}
                className="group"
              >
                <Card className="bg-slate-900 border border-slate-800 overflow-hidden rounded-2xl group-hover:border-emerald-500/30 transition-all">
                  <div className="p-8 md:p-12">
                    <div className="flex items-center gap-3 mb-6">
                      <Badge className="bg-emerald-950/50 text-emerald-300 border border-emerald-500/20">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Featured Value Creation Study
                      </Badge>
                    </div>
                    
                    <h3 className="text-3xl font-bold text-white mb-6 font-serif group-hover:text-emerald-50 transition-colors">
                      $18.2M Synergies Underwritten → $7.4M Audited & Realized
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      {[
                        { value: "$18.2M", label: "Claimed in Diligence", color: "slate" },
                        { value: "$7.4M", label: "Fiducially Realized", color: "emerald" },
                        { value: "$4.3M", label: "Milestoned In-Flight", color: "amber" }
                      ].map((stat, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1, type: "spring" }}
                          whileHover={{ scale: 1.05 }}
                          className={`p-5 rounded-xl border ${
                            stat.color === "emerald" ? "border-emerald-500/25 bg-emerald-950/20" :
                            stat.color === "amber" ? "border-amber-500/30 bg-amber-950/10" :
                            "border-slate-800 bg-slate-950/60"
                          } text-center`}
                        >
                          <div className={`text-3xl font-bold ${
                            stat.color === "emerald" ? "text-emerald-400" :
                            stat.color === "amber" ? "text-amber-400" :
                            "text-slate-400"
                          }`}>{stat.value}</div>
                          <p className={`text-[11px] uppercase font-semibold mt-1 ${
                            stat.color === "emerald" ? "text-emerald-500" :
                            stat.color === "amber" ? "text-amber-500" :
                            "text-slate-500"
                          }`}>{stat.label}</p>
                        </motion.div>
                      ))}
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
              </motion.div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="relative px-6 py-24 bg-gradient-to-b from-slate-950 to-emerald-950/20 border-t border-slate-900 text-center overflow-hidden">
            {/* Background orbs */}
            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                className="absolute top-1/2 right-1/3 w-[500px] h-[500px] bg-gradient-radial from-emerald-500/20 via-emerald-500/5 to-transparent rounded-full blur-3xl"
                animate={{ 
                  x: [0, -60, 0],
                  y: [0, 40, 0],
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            <div className="relative mx-auto max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold mb-6 font-serif">
                  Secure Your Portco EBITDA Growth
                </h2>
                <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
                  Connect with our advisory deal team for a private, 30-minute diligence briefing. Review custom spreadsheets, compliance trackers, and baseline evaluation templates.
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <Link href="/request-demo">
                    <motion.button
                      className="inline-flex items-center gap-3 px-10 py-5 rounded-lg bg-[#B8860B] hover:bg-[#a67c0a] text-white text-base font-bold shadow-xl shadow-[#B8860B]/10"
                      whileHover={{ scale: 1.05, boxShadow: "0 30px 60px -15px rgba(184, 134, 11, 0.4)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Schedule Operator Consultation
                      <Zap className="w-4 h-4" />
                    </motion.button>
                  </Link>
                  <Link href="/broker-compensation">
                    <motion.button
                      className="inline-flex items-center gap-3 px-10 py-5 rounded-lg border border-slate-800 text-slate-300 hover:bg-slate-900 text-base"
                      whileHover={{ scale: 1.05, backgroundColor: "rgb(15, 23, 42)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Launch Broker Compensation Auditor
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
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