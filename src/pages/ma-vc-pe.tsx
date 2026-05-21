"use client";

import { useRef } from "react";
import { SEO } from "@/components/SEO";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Target, Shield, FileCheck, Briefcase, Activity, CheckCircle2, ArrowRight, Sparkles, Zap, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { PremiumBackground } from "@/components/premium/PremiumBackground";
import { Interactive3DCard } from "@/components/premium/Interactive3DCard";

function StatsCard({ title, value, description, gradient, icon: Icon, delay = 0 }: { title: string; value: string; description: string; gradient: string; icon: any; delay?: number }) {
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
      <Card className="relative overflow-hidden bg-slate-900/50 border-slate-700/50 backdrop-blur-xl h-full">
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: gradient }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        
        <div className="absolute inset-0 opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-500" 
             style={{ background: gradient }} 
        />

        <CardHeader className="relative">
          <div className="flex items-center gap-3 mb-2">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.2 }}
              transition={{ duration: 0.6 }}
              className="p-2 rounded-lg bg-slate-800/50 ring-1 ring-white/10"
            >
              <Icon className="h-6 w-6" style={{ color: gradient.match(/#[0-9a-fA-F]{6}/)?.[0] }} />
            </motion.div>
            <CardTitle className="text-sm font-medium text-slate-400">{title}</CardTitle>
          </div>
          <div className="text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            {value}
          </div>
        </CardHeader>
        <CardContent className="relative">
          <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
            {description}
          </p>
        </CardContent>

        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>
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
        title="M&A / VC / PE Diligence - SiriusB iQ Ai Data Sciences Lab"
        description="Evidence-based M&A diligence and value realization tracking. Turn synergy claims into proven outcomes with cryptographic evidence receipts and autonomous realization tracking."
      />
      <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
        <Nav />
        
        <main className="flex-1">
          {/* Hero Section */}
          <section ref={heroRef} className="relative border-b border-white/10 overflow-hidden">
            <div className="absolute inset-0">
              <PremiumBackground />
            </div>

            <div className="absolute inset-0 bg-gradient-to-b from-purple-950/70 via-slate-950/80 to-slate-950" />

            <motion.div 
              style={{ opacity, scale }}
              className="relative px-6 py-32"
            >
              <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      <Badge className="mb-6 bg-rose-500/20 text-rose-300 border-rose-500/30 backdrop-blur-sm">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        M&A / VC / PE Diligence
                      </Badge>
                    </motion.div>

                    <motion.h1 
                      className="text-6xl font-bold tracking-tight mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      <span className="bg-gradient-to-r from-white via-rose-200 to-orange-200 bg-clip-text text-transparent">
                        Find Leakage. Prove It.
                      </span>
                      <br />
                      <span className="bg-gradient-to-r from-orange-200 via-amber-300 to-rose-300 bg-clip-text text-transparent">
                        Underwrite It. Track Realization.
                      </span>
                    </motion.h1>

                    <motion.p 
                      className="text-xl text-slate-300 mb-8 leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      Evidence-based diligence that survives integration reality. Transform <span className="text-rose-400 font-bold">claimed synergies</span> into <span className="text-emerald-400 font-bold">proven outcomes</span> with cryptographic evidence receipts and autonomous realization tracking.
                    </motion.p>

                    <motion.div 
                      className="flex gap-4 flex-wrap"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                    >
                      <Link href="/request-demo">
                        <Button size="lg" className="group relative overflow-hidden bg-rose-600 hover:bg-rose-700 border-0">
                          <span className="relative z-10 flex items-center gap-2">
                            Schedule Diligence Review
                            <Zap className="w-4 h-4" />
                          </span>
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-rose-400 to-orange-400"
                            initial={{ x: "-100%" }}
                            whileHover={{ x: 0 }}
                            transition={{ duration: 0.3 }}
                          />
                        </Button>
                      </Link>
                      <Link href="/capital-library">
                        <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 backdrop-blur-sm">
                          View Case Studies
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </motion.div>
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
                      value="$18M"
                      description="Pre-close management promises"
                      gradient="linear-gradient(135deg, #f97316, #ea580c)"
                      delay={0.1}
                    />
                    <StatsCard
                      icon={CheckCircle2}
                      title="Proven & Realized"
                      value="$7.4M"
                      description="Evidence-backed outcomes"
                      gradient="linear-gradient(135deg, #10b981, #059669)"
                      delay={0.2}
                    />
                    <StatsCard
                      icon={Activity}
                      title="In-Flight"
                      value="$4.1M"
                      description="With owners & timelines"
                      gradient="linear-gradient(135deg, #3b82f6, #2563eb)"
                      delay={0.3}
                    />
                    <StatsCard
                      icon={Target}
                      title="Realization Rate"
                      value="87%"
                      description="With evidence framework"
                      gradient="linear-gradient(135deg, #8b5cf6, #7c3aed)"
                      delay={0.4}
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* The Problem Section */}
          <section className="relative px-6 py-12 border-b border-white/10 overflow-hidden">
            <motion.div
              className="absolute inset-0 opacity-20"
              animate={{
                background: [
                  "radial-gradient(circle at 0% 0%, #f97316 0%, transparent 50%)",
                  "radial-gradient(circle at 100% 100%, #ea580c 0%, transparent 50%)",
                  "radial-gradient(circle at 0% 100%, #f97316 0%, transparent 50%)",
                  "radial-gradient(circle at 100% 0%, #ea580c 0%, transparent 50%)",
                ],
              }}
              transition={{ duration: 10, repeat: Infinity }}
            />

            <div className="relative mx-auto max-w-7xl">
              <motion.div 
                className="text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-5xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-white via-rose-200 to-orange-200 bg-clip-text text-transparent">
                    Why Most Synergies Evaporate
                  </span>
                </h2>
                <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                  The gap between pre-close promises and post-close reality destroys value. Here's what actually happens.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Interactive3DCard
                  icon={AlertTriangle}
                  title="Pre-Close Promises"
                  description="Management claims '$15M in cost synergies' with PowerPoint decks and high-level categories. No owners, no timelines, no evidence receipts. Deal model assumes 80% realization based on 'confidence'. Board approves without proof framework."
                  gradient="linear-gradient(135deg, #f97316, #ea580c)"
                  href="/capital-library"
                  delay={0.1}
                />
                <Interactive3DCard
                  icon={Target}
                  title="Post-Close Reality"
                  description="18 months later, CFO can't prove any realization. No ledger, no reconciliation, no accountability. Integration team disbanded, knowledge lost. Exit valuation drops $60M due to unproven synergies. LP confidence shattered."
                  gradient="linear-gradient(135deg, #ef4444, #dc2626)"
                  href="/capital-library"
                  delay={0.2}
                />
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="relative px-6 py-12 border-b border-white/10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/20 to-transparent" />

            <div className="relative mx-auto max-w-7xl">
              <motion.div 
                className="text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-5xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                    Core Services
                  </span>
                </h2>
                <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                  Evidence-based diligence and value realization tracking that survives integration reality.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Interactive3DCard
                  icon={FileCheck}
                  title="Diligence Proof Packs"
                  description="Evidence receipts, methodology disclosure, and reconciliation outputs that reduce 'trust gaps'. 2-4 week sprint delivers validated synergy claims with probability weighting."
                  href="/capital-library"
                  gradient="linear-gradient(135deg, #3b82f6, #2563eb)"
                  delay={0.1}
                />
                <Interactive3DCard
                  icon={Briefcase}
                  title="Integration-Ready Workflows"
                  description="Owner assignment, approvals, and closure loops—built for post-close execution, not slideware. Day 1 ready with baseline reconciliation and weekly tracking cadence."
                  href="/verified-savings-ledger"
                  gradient="linear-gradient(135deg, #8b5cf6, #7c3aed)"
                  delay={0.2}
                />
                <Interactive3DCard
                  icon={TrendingUp}
                  title="Realization Governance"
                  description="At-risk decay logic, exception queues, and weekly/monthly reconciliation routines. 87% average realization rate with evidence framework vs 23% industry average."
                  href="/war-room-showcase"
                  gradient="linear-gradient(135deg, #10b981, #059669)"
                  delay={0.3}
                />
              </div>
            </div>
          </section>

          {/* Engagement Phases Section */}
          <section className="relative px-6 py-12 border-b border-white/10 overflow-hidden">
            <div className="relative mx-auto max-w-7xl">
              <motion.div 
                className="text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-5xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent">
                    Engagement Phases
                  </span>
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Interactive3DCard
                  icon={Target}
                  title="Diligence Sprint (Pre-Close)"
                  description="Rapid signal extraction with proof standards: what's real, what's recoverable, what's speculation. Evidence pack build (claims → receipts), value leakage identification with cost breakdown, at-risk assessment with probability weighting. Typical: 2-4 weeks, $50K-$150K."
                  gradient="linear-gradient(135deg, #06b6d4, #0891b2)"
                  href="/request-demo"
                  delay={0.1}
                />
                <Interactive3DCard
                  icon={Activity}
                  title="Post-Close Value Office (Integration)"
                  description="Convert identified value into realized value, with owners, dates, and evidence-backed accountability. Value ledger setup, owner assignment + approval workflows, weekly realization tracking, quarterly board reporting with evidence packs. Typical: 90-180 days, retained or success-fee."
                  gradient="linear-gradient(135deg, #10b981, #059669)"
                  href="/request-demo"
                  delay={0.2}
                />
              </div>
            </div>
          </section>

          {/* Real Case Study Section */}
          <section className="relative px-6 py-12 border-b border-white/10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-950/20 to-transparent" />

            <div className="relative mx-auto max-w-5xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-xl overflow-hidden">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-4">
                      <Badge className="bg-violet-500/20 text-violet-300 border-violet-500/30">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Real PE Case Study
                      </Badge>
                    </div>
                    <CardTitle className="text-3xl font-bold">
                      <span className="bg-gradient-to-r from-violet-200 to-fuchsia-200 bg-clip-text text-transparent">
                        $18M Synergies Claimed → $7.4M Proven
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center p-6 rounded-xl border border-orange-500/30 bg-orange-500/5">
                        <div className="text-4xl font-bold text-orange-300 mb-2">$18M</div>
                        <div className="text-sm text-slate-400">Claimed in diligence</div>
                      </div>
                      <div className="text-center p-6 rounded-xl border border-emerald-500/30 bg-emerald-500/5">
                        <div className="text-4xl font-bold text-emerald-300 mb-2">$7.4M</div>
                        <div className="text-sm text-slate-400">Proven & realized</div>
                      </div>
                      <div className="text-center p-6 rounded-xl border border-cyan-500/30 bg-cyan-500/5">
                        <div className="text-4xl font-bold text-cyan-300 mb-2">$4.1M</div>
                        <div className="text-sm text-slate-400">In-flight with timelines</div>
                      </div>
                    </div>

                    <div className="space-y-4 text-slate-300">
                      <div>
                        <span className="text-white font-semibold">The Situation:</span> Mid-market PE firm acquired B2B SaaS company with $18M in 'cost synergies' identified. Buyer's diligence team demanded proof before close. Seller had no evidence receipts, no owner assignment, no reconciliation framework.
                      </div>
                      <div>
                        <span className="text-white font-semibold">Kincaid IQ Intervention:</span> 90-day value office sprint. Built evidence packs for each synergy claim, assigned owners with approval workflows, weekly reconciliation cadence, and controls monitoring. Separated proven ($7.4M), in-flight with timelines ($4.1M), and speculation ($6.5M written off).
                      </div>
                      <div>
                        <span className="text-white font-semibold">The Outcome:</span> Exit closed at premium valuation because buyer had confidence in realization discipline. Buyer adopted Kincaid IQ framework for their portfolio. Deal almost died due to synergy credibility gap—evidence receipts saved it.
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="relative px-6 py-32 overflow-hidden">
            <motion.div
              className="absolute inset-0 opacity-30"
              animate={{
                background: [
                  "radial-gradient(circle at 20% 20%, #8b5cf6 0%, transparent 50%)",
                  "radial-gradient(circle at 80% 80%, #3b82f6 0%, transparent 50%)",
                  "radial-gradient(circle at 20% 80%, #ec4899 0%, transparent 50%)",
                  "radial-gradient(circle at 80% 20%, #8b5cf6 0%, transparent 50%)",
                ],
              }}
              transition={{ duration: 12, repeat: Infinity }}
            />

            <div className="relative mx-auto max-w-4xl text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <h2 className="text-6xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-white via-rose-200 to-orange-200 bg-clip-text text-transparent">
                    Schedule a Diligence Review
                  </span>
                </h2>
                <p className="text-xl text-slate-300 mb-10 leading-relaxed">
                  Transform synergy claims into proven outcomes. Evidence-based diligence and value realization tracking that survives integration reality.
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <Link href="/request-demo">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button size="lg" className="group relative overflow-hidden bg-rose-600 hover:bg-rose-700 border-0 text-lg px-8 py-6">
                        <span className="relative z-10 flex items-center gap-2">
                          Schedule Consultation
                          <Sparkles className="w-5 h-5" />
                        </span>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-rose-400 via-orange-400 to-rose-400"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.6 }}
                        />
                      </Button>
                    </motion.div>
                  </Link>
                  <Link href="/capital-library">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 backdrop-blur-sm text-lg px-8 py-6">
                        View Case Studies
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </motion.div>
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