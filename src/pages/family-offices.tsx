"use client";

import { useRef } from "react";
import { SEO } from "@/components/SEO";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, TrendingUp, Shield, LineChart, Users, Target, Briefcase, PieChart, Activity, FileCheck, ArrowRight, CheckCircle2, Sparkles, Zap, Globe, Award, BarChart3 } from "lucide-react";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { PremiumBackground } from "@/components/premium/PremiumBackground";
import { Interactive3DCard } from "@/components/premium/Interactive3DCard";
import Nav from "@/components/Nav";

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

function StatsCard({ title, value, description, gradient, icon: Icon, delay = 0, color = "purple", particles = 12 }: { title: string; value: string; description: string; gradient: string; icon: any; delay?: number; color?: string; particles?: number }) {
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

      <Card className="relative overflow-hidden bg-slate-900/60 border border-slate-700/50 backdrop-blur-xl h-full">
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
              className="p-2 rounded-lg bg-slate-800/50 ring-1 ring-white/10 group-hover:shadow-xl transition-shadow"
              style={{ boxShadow: `0 0 20px ${gradient.match(/#[0-9a-fA-F]{6}/)?.[0]}40` }}
            >
              <Icon className="h-6 w-6" style={{ color: gradient.match(/#[0-9a-fA-F]{6}/)?.[0] }} />
            </motion.div>
            <CardTitle className="text-sm font-medium text-slate-400 group-hover:text-slate-300 transition-colors">{title}</CardTitle>
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

        {/* Pulsing ring */}
        <motion.div
          className={`absolute inset-0 rounded-lg border-2 border-${color}-400/40 opacity-0 group-hover:opacity-100`}
          animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        />

        {/* Corner accents */}
        <div className={`absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-${color}-500/0 group-hover:border-${color}-500/60 rounded-tr-lg transition-all duration-500`} />
        <div className={`absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-${color}-500/0 group-hover:border-${color}-500/60 rounded-bl-lg transition-all duration-500`} />
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
        <Nav />
        
        <main className="flex-1">
          {/* Hero Section with Premium Background */}
          <section ref={heroRef} className="relative border-b border-white/10 overflow-hidden pt-32 pb-24">
            {/* Animated background orbs */}
            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                className="absolute top-1/4 left-1/3 w-[800px] h-[800px] bg-gradient-radial from-purple-500/20 via-purple-500/5 to-transparent rounded-full blur-3xl"
                animate={{ 
                  x: [0, 100, 0],
                  y: [0, -60, 0],
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute bottom-1/4 right-1/3 w-[700px] h-[700px] bg-gradient-radial from-cyan-500/15 via-cyan-500/5 to-transparent rounded-full blur-3xl"
                animate={{ 
                  x: [0, -80, 0],
                  y: [0, 50, 0],
                  scale: [1, 1.15, 1],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3 }}
              />
              <motion.div
                className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-gradient-radial from-blue-500/10 via-blue-500/3 to-transparent rounded-full blur-3xl"
                animate={{ 
                  x: [0, 60, 0],
                  y: [0, -40, 0],
                  scale: [1, 1.1, 1],
                  opacity: [0.25, 0.45, 0.25]
                }}
                transition={{ duration: 24, repeat: Infinity, ease: "easeInOut", delay: 6 }}
              />
            </div>

            <motion.div 
              style={{ opacity, scale }}
              className="relative px-6"
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
                        <motion.button
                          className="group relative overflow-hidden bg-purple-600 hover:bg-purple-700 border-0 px-8 py-4 rounded-lg text-white font-bold shadow-xl shadow-purple-500/30"
                          whileHover={{ scale: 1.05, boxShadow: "0 30px 60px -15px rgba(147, 51, 234, 0.5)" }}
                          whileTap={{ scale: 0.95 }}
                        >
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
                        </motion.button>
                      </Link>
                      <Link href="/capital-library">
                        <motion.button
                          className="border border-slate-600 text-slate-300 hover:bg-slate-800 backdrop-blur-sm px-8 py-4 rounded-lg inline-flex items-center gap-2"
                          whileHover={{ scale: 1.05, backgroundColor: "rgb(30, 41, 59)" }}
                          whileTap={{ scale: 0.95 }}
                        >
                          View Research Library
                          <ArrowRight className="w-4 h-4" />
                        </motion.button>
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
                      color="emerald"
                      particles={14}
                    />
                    <StatsCard
                      icon={LineChart}
                      title="Market Correlation"
                      value="<0.4"
                      description="To public equity markets"
                      gradient="linear-gradient(135deg, #3b82f6, #2563eb)"
                      delay={0.2}
                      color="blue"
                      particles={12}
                    />
                    <StatsCard
                      icon={Shield}
                      title="Risk Profile"
                      value="Recession Resistant"
                      description="Non-discretionary spending"
                      gradient="linear-gradient(135deg, #8b5cf6, #7c3aed)"
                      delay={0.3}
                      color="violet"
                      particles={13}
                    />
                    <StatsCard
                      icon={PieChart}
                      title="Liquidity"
                      value="8-18 Mo"
                      description="Recovery cycle timeline"
                      gradient="linear-gradient(135deg, #f97316, #ea580c)"
                      delay={0.4}
                      color="orange"
                      particles={11}
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Investment Thesis Section */}
          <section className="relative px-6 py-24 border-b border-white/10 overflow-hidden">
            {/* Background orbs */}
            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                className="absolute top-1/3 right-1/4 w-[700px] h-[700px] bg-gradient-radial from-purple-500/15 via-purple-500/5 to-transparent rounded-full blur-3xl"
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
                {[
                  {
                    icon: Target,
                    title: "Market Inefficiency",
                    description: "$1.2T in annual healthcare waste. PBM contract gaps, stop-loss failures, and network cost variance create persistent arbitrage opportunities.",
                    color: "violet",
                    particles: 14
                  },
                  {
                    icon: Activity,
                    title: "Data Moat",
                    description: "Cryptographically verified evidence receipts with 95.2% DQ pass rate. Network effects compound: more data → better models → faster recovery.",
                    color: "blue",
                    particles: 12
                  },
                  {
                    icon: Briefcase,
                    title: "Capital Efficiency",
                    description: "8-18 month recovery cycles with 62-85% average recovery rate. Autonomous agents reduce admin costs by 73%.",
                    color: "emerald",
                    particles: 15
                  }
                ].map((thesis, index) => {
                  const Icon = thesis.icon;
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
                        {Array.from({ length: thesis.particles }).map((_, i) => (
                          <motion.div
                            key={i}
                            className={`absolute w-1 h-1 bg-${thesis.color}-400/60 rounded-full`}
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
                        className="relative h-full p-8 rounded-2xl bg-gradient-to-br from-slate-900/80 via-slate-900/50 to-black/80 border border-slate-700/50 backdrop-blur-xl overflow-hidden"
                        whileHover={{ 
                          scale: 1.05,
                          borderColor: `rgba(147, 51, 234, 0.5)`,
                          boxShadow: `0 30px 60px -15px rgba(147, 51, 234, 0.4)`
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <motion.div
                          className="relative mb-6"
                          whileHover={{ scale: 1.2, rotate: 10 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br from-${thesis.color}-500/20 to-${thesis.color}-600/10 border border-${thesis.color}-500/30 flex items-center justify-center group-hover:shadow-xl group-hover:shadow-${thesis.color}-500/50 transition-all duration-500`}>
                            <Icon className={`h-10 w-10 text-${thesis.color}-400 group-hover:text-${thesis.color}-300 transition-colors`} />
                          </div>
                          
                          <motion.div
                            className={`absolute inset-0 rounded-2xl border-2 border-${thesis.color}-400/40`}
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                          />
                        </motion.div>

                        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-100 transition-colors">
                          {thesis.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                          {thesis.description}
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

                        {/* Corner accents */}
                        <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-purple-500/0 group-hover:border-purple-500/60 rounded-tr-2xl transition-all duration-500" />
                        <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-purple-500/0 group-hover:border-purple-500/60 rounded-bl-2xl transition-all duration-500" />
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Service Lines Section */}
          <section className="relative px-6 py-24 border-b border-white/10 overflow-hidden bg-gradient-to-b from-transparent via-purple-950/20 to-transparent">
            {/* Background orbs */}
            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-gradient-radial from-cyan-500/15 via-cyan-500/5 to-transparent rounded-full blur-3xl"
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

          {/* Performance Metrics Section */}
          <section className="relative px-6 py-24 border-b border-white/10 overflow-hidden">
            {/* Background orbs */}
            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                className="absolute bottom-1/4 left-1/4 w-[700px] h-[700px] bg-gradient-radial from-blue-500/15 via-blue-500/5 to-transparent rounded-full blur-3xl"
                animate={{ 
                  x: [0, 60, 0],
                  y: [0, -30, 0],
                  scale: [1, 1.15, 1],
                  opacity: [0.2, 0.35, 0.2]
                }}
                transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

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
                  color="emerald"
                  particles={15}
                />
                <StatsCard
                  icon={LineChart}
                  title="S&P 500 Correlation"
                  value="<0.4"
                  description="True portfolio diversification. Healthcare spend is non-discretionary and recession-resistant."
                  gradient="linear-gradient(135deg, #3b82f6, #2563eb)"
                  delay={0.2}
                  color="blue"
                  particles={13}
                />
                <StatsCard
                  icon={Shield}
                  title="Validated Opportunities"
                  value="$8.2B"
                  description="Cryptographically verified evidence receipts across 200+ employers. 95.2% DQ pass rate."
                  gradient="linear-gradient(135deg, #8b5cf6, #7c3aed)"
                  delay={0.3}
                  color="violet"
                  particles={14}
                />
                <StatsCard
                  icon={PieChart}
                  title="Recovery Cycle"
                  value="12-18 Mo"
                  description="Faster liquidity than traditional alternatives. 62-85% average recovery rate with evidence."
                  gradient="linear-gradient(135deg, #f97316, #ea580c)"
                  delay={0.4}
                  color="orange"
                  particles={12}
                />
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="relative py-24 bg-gradient-to-b from-transparent to-purple-950/20 overflow-hidden">
            {/* Background orbs */}
            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                className="absolute top-1/2 right-1/3 w-[600px] h-[600px] bg-gradient-radial from-purple-500/20 via-purple-500/5 to-transparent rounded-full blur-3xl"
                animate={{ 
                  x: [0, -60, 0],
                  y: [0, 40, 0],
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            <div className="relative max-w-4xl mx-auto px-6 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mb-8"
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
                    <motion.button
                      className="group relative overflow-hidden bg-purple-600 hover:bg-purple-700 border-0 text-lg px-10 py-6 rounded-lg text-white font-bold shadow-2xl shadow-purple-500/40"
                      whileHover={{ scale: 1.05, boxShadow: "0 30px 60px -10px rgba(147, 51, 234, 0.6)" }}
                      whileTap={{ scale: 0.95 }}
                    >
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
                    </motion.button>
                  </Link>
                  <Link href="/capital-library">
                    <motion.button
                      className="border border-slate-600 text-slate-300 hover:bg-slate-800 backdrop-blur-sm text-lg px-10 py-6 rounded-lg inline-flex items-center gap-2"
                      whileHover={{ scale: 1.05, backgroundColor: "rgb(30, 41, 59)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Research Library
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </Link>
                  <Link href="/contact">
                    <motion.button
                      className="text-slate-300 hover:bg-slate-800 text-lg px-10 py-6 rounded-lg"
                      whileHover={{ scale: 1.05, backgroundColor: "rgb(30, 41, 59)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Contact Investment Team
                    </motion.button>
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