"use client";

import { useRef } from "react";
import { SEO } from "@/components/SEO";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, TrendingUp, Shield, LineChart, Users, Target, Briefcase, PieChart, Activity, FileCheck, ArrowRight, CheckCircle2, Sparkles, Zap } from "lucide-react";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Hero3DBackground } from "@/components/premium/Hero3DBackground";
import { Interactive3DCard } from "@/components/premium/Interactive3DCard";

function AnimatedCounter({ value, suffix = "", prefix = "", duration = 2 }: { value: number | string; suffix?: string; prefix?: string; duration?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {prefix}{value}{suffix}
    </motion.span>
  );
}

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
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: gradient }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        
        {/* Glow effect */}
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

        {/* Sparkle effects */}
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

export default function FamilyOfficesPage() {
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
        title="Family Office Services - SiriusB iQ Ai Data Sciences Lab"
        description="Comprehensive family office services including alternative investment strategies, healthcare cost arbitrage as an asset class, portfolio diversification, and data-driven operational excellence for ultra-high-net-worth families."
      />
      <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
        <SiteHeader />
        
        <main className="flex-1">
          {/* Hero Section with 3D Background */}
          <section ref={heroRef} className="relative border-b border-white/10 overflow-hidden">
            {/* 3D Animated Background */}
            <div className="absolute inset-0">
              <Hero3DBackground />
            </div>

            {/* Gradient Overlay */}
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
                      <Badge className="mb-6 bg-purple-500/20 text-purple-300 border-purple-500/30 backdrop-blur-sm">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Family Office Services
                      </Badge>
                    </motion.div>

                    <motion.h1 
                      className="text-6xl font-bold tracking-tight mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                        Healthcare Cost Arbitrage
                      </span>
                      <br />
                      <span className="bg-gradient-to-r from-cyan-200 via-blue-300 to-purple-300 bg-clip-text text-transparent">
                        as an Alternative Asset Class
                      </span>
                    </motion.h1>

                    <motion.p 
                      className="text-xl text-slate-300 mb-8 leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      Institutional-grade investment strategy delivering <span className="text-green-400 font-bold">23% IRR</span> with low correlation to public markets. Purpose-built for family offices seeking uncorrelated alpha in recession-resistant healthcare infrastructure.
                    </motion.p>

                    <motion.div 
                      className="flex gap-4 flex-wrap"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                    >
                      <Link href="/request-demo">
                        <Button size="lg" className="group relative overflow-hidden bg-purple-600 hover:bg-purple-700 border-0">
                          <span className="relative z-10 flex items-center gap-2">
                            Schedule Investment Review
                            <Zap className="w-4 h-4" />
                          </span>
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400"
                            initial={{ x: "-100%" }}
                            whileHover={{ x: 0 }}
                            transition={{ duration: 0.3 }}
                          />
                        </Button>
                      </Link>
                      <Link href="/capital-library">
                        <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 backdrop-blur-sm">
                          View Research Library
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
                      icon={TrendingUp}
                      title="5-Year IRR"
                      value="23%"
                      description="Backtest average return"
                      gradient="linear-gradient(135deg, #10b981, #059669)"
                      delay={0.1}
                    />
                    <StatsCard
                      icon={LineChart}
                      title="Market Correlation"
                      value="<0.4"
                      description="To public equity markets"
                      gradient="linear-gradient(135deg, #3b82f6, #2563eb)"
                      delay={0.2}
                    />
                    <StatsCard
                      icon={Shield}
                      title="Risk Profile"
                      value="Recession Resistant"
                      description="Non-discretionary spending"
                      gradient="linear-gradient(135deg, #8b5cf6, #7c3aed)"
                      delay={0.3}
                    />
                    <StatsCard
                      icon={PieChart}
                      title="Liquidity"
                      value="8-18 Mo"
                      description="Recovery cycle timeline"
                      gradient="linear-gradient(135deg, #f97316, #ea580c)"
                      delay={0.4}
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Investment Thesis with 3D Cards */}
          <section className="relative px-6 py-24 border-b border-white/10 overflow-hidden">
            {/* Background gradient animation */}
            <motion.div
              className="absolute inset-0 opacity-20"
              animate={{
                background: [
                  "radial-gradient(circle at 0% 0%, #8b5cf6 0%, transparent 50%)",
                  "radial-gradient(circle at 100% 100%, #3b82f6 0%, transparent 50%)",
                  "radial-gradient(circle at 0% 100%, #ec4899 0%, transparent 50%)",
                  "radial-gradient(circle at 100% 0%, #8b5cf6 0%, transparent 50%)",
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
                  <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                    Investment Thesis
                  </span>
                </h2>
                <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                  Healthcare cost arbitrage represents a structural market inefficiency in the $4.5T U.S. healthcare economy. Our platform identifies, validates, and monetizes these opportunities with institutional rigor.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Interactive3DCard
                  icon={Target}
                  title="Market Inefficiency"
                  description="$1.2T in annual healthcare waste. PBM contract gaps, stop-loss failures, and network cost variance create persistent arbitrage opportunities."
                  href="/capital-library"
                  gradient="linear-gradient(135deg, #8b5cf6, #7c3aed)"
                  delay={0.1}
                />
                <Interactive3DCard
                  icon={Activity}
                  title="Data Moat"
                  description="Cryptographically verified evidence receipts with 95.2% DQ pass rate. Network effects compound: more data → better models → faster recovery."
                  href="/evidence-receipts"
                  gradient="linear-gradient(135deg, #3b82f6, #2563eb)"
                  delay={0.2}
                />
                <Interactive3DCard
                  icon={Briefcase}
                  title="Capital Efficiency"
                  description="8-18 month recovery cycles with 62-85% average recovery rate. Autonomous agents reduce admin costs by 73%."
                  href="/verified-savings-ledger"
                  gradient="linear-gradient(135deg, #10b981, #059669)"
                  delay={0.3}
                />
              </div>
            </div>
          </section>

          {/* Service Lines with Interactive Cards */}
          <section className="relative px-6 py-24 border-b border-white/10 overflow-hidden">
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
                    Service Lines
                  </span>
                </h2>
                <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                  Comprehensive support for family offices across investment evaluation, portfolio construction, and operational diligence.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Interactive3DCard
                  icon={PieChart}
                  title="Portfolio Strategy"
                  description="Custom portfolio construction integrating healthcare cost arbitrage. Asset allocation modeling, risk-return optimization, and liquidity management with Monte Carlo simulation."
                  href="/capital-library"
                  gradient="linear-gradient(135deg, #8b5cf6, #7c3aed)"
                  delay={0.1}
                />
                <Interactive3DCard
                  icon={FileCheck}
                  title="Investment Diligence"
                  description="Institutional-grade due diligence with 47-point assessment framework. Data quality validation, contract enforceability, and regulatory compliance audit."
                  href="/family-offices/ma"
                  gradient="linear-gradient(135deg, #3b82f6, #2563eb)"
                  delay={0.2}
                />
                <Interactive3DCard
                  icon={TrendingUp}
                  title="Venture Capital Support"
                  description="Strategic advisory for VC investments in healthcare infrastructure and AI-driven cost optimization. TAM analysis, GTM strategy, and unit economics validation."
                  href="/family-offices/venture-capital"
                  gradient="linear-gradient(135deg, #10b981, #059669)"
                  delay={0.3}
                />
                <Interactive3DCard
                  icon={Briefcase}
                  title="M&A Advisory"
                  description="End-to-end M&A support including target screening, EBITDA bridge modeling, and post-acquisition value creation playbooks. Hidden cost structure identification."
                  href="/family-offices/ma"
                  gradient="linear-gradient(135deg, #f97316, #ea580c)"
                  delay={0.4}
                />
              </div>
            </div>
          </section>

          {/* Performance Metrics with Animated Counters */}
          <section className="relative px-6 py-24 border-b border-white/10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-950/20 to-transparent" />

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
                    Track Record
                  </span>
                </h2>
                <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                  5-year historical performance across 200+ employer clients and $8.2B in validated EBITDA opportunities.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                  icon={TrendingUp}
                  title="Average IRR"
                  value="23.4%"
                  description="Outperforms private equity (18.2%), venture capital (21.1%), and real estate (11.3%) over same period."
                  gradient="linear-gradient(135deg, #10b981, #059669)"
                  delay={0.1}
                />
                <StatsCard
                  icon={LineChart}
                  title="S&P 500 Correlation"
                  value="<0.4"
                  description="True portfolio diversification. Healthcare spend is non-discretionary and recession-resistant."
                  gradient="linear-gradient(135deg, #3b82f6, #2563eb)"
                  delay={0.2}
                />
                <StatsCard
                  icon={Shield}
                  title="Validated Opportunities"
                  value="$8.2B"
                  description="Cryptographically verified evidence receipts across 200+ employers. 95.2% DQ pass rate."
                  gradient="linear-gradient(135deg, #8b5cf6, #7c3aed)"
                  delay={0.3}
                />
                <StatsCard
                  icon={PieChart}
                  title="Recovery Cycle"
                  value="12-18 Mo"
                  description="Faster liquidity than traditional alternatives. 62-85% average recovery rate with evidence."
                  gradient="linear-gradient(135deg, #f97316, #ea580c)"
                  delay={0.4}
                />
              </div>
            </div>
          </section>

          {/* CTA Section with Premium Effects */}
          <section className="relative px-6 py-32 overflow-hidden">
            {/* Animated background */}
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
                  <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                    Schedule an Investment Review
                  </span>
                </h2>
                <p className="text-xl text-slate-300 mb-10 leading-relaxed">
                  Discuss your family office's portfolio strategy with our investment team. Custom research, diligence frameworks, and co-investment opportunities available.
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <Link href="/request-demo">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button size="lg" className="group relative overflow-hidden bg-purple-600 hover:bg-purple-700 border-0 text-lg px-8 py-6">
                        <span className="relative z-10 flex items-center gap-2">
                          Schedule Consultation
                          <Sparkles className="w-5 h-5" />
                        </span>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400"
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
                        View Research Library
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </motion.div>
                  </Link>
                  <Link href="/contact">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button size="lg" variant="ghost" className="text-slate-300 hover:bg-slate-800 text-lg px-8 py-6">
                        Contact Investment Team
                      </Button>
                    </motion.div>
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>
        </main>

        <SiteFooter />
      </div>
    </>
  );
}