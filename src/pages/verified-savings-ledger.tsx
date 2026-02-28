"use client";

import { SEO } from "@/components/SEO";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Shield,
  DollarSign,
  Lock,
  TrendingUp,
  FileCheck,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Database,
  Clock,
  Users,
  BarChart3,
  Sparkles,
  Eye,
  Zap,
  Target,
} from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

const ledgerFeatures = [
  {
    icon: DollarSign,
    title: "Automated Value Tracking",
    description: "Real-time tracking of savings, cost avoidance, and financial impact with cryptographic proof",
    gradient: "from-green-500/20 via-emerald-500/20 to-green-600/20",
    color: "green",
  },
  {
    icon: Lock,
    title: "Immutable Audit Trail",
    description: "Blockchain-grade security ensuring every transaction is permanently recorded and verifiable",
    gradient: "from-purple-500/20 via-violet-500/20 to-purple-600/20",
    color: "purple",
  },
  {
    icon: FileCheck,
    title: "Evidence-Based Validation",
    description: "Every entry backed by cryptographic receipts and supporting documentation",
    gradient: "from-blue-500/20 via-cyan-500/20 to-blue-600/20",
    color: "blue",
  },
  {
    icon: TrendingUp,
    title: "Impact Analytics",
    description: "Comprehensive reporting and analytics on financial performance and ROI",
    gradient: "from-amber-500/20 via-orange-500/20 to-amber-600/20",
    color: "amber",
  },
];

const workflowSteps = [
  {
    icon: AlertCircle,
    title: "Issue Detected",
    description: "War Room identifies opportunity or issue with financial impact",
    color: "red",
  },
  {
    icon: FileCheck,
    title: "Evidence Collected",
    description: "Automated collection of supporting documentation and proof",
    color: "blue",
  },
  {
    icon: DollarSign,
    title: "Value Calculated",
    description: "AI-powered quantification of financial impact",
    color: "green",
  },
  {
    icon: Lock,
    title: "Ledger Entry Created",
    description: "Immutable record created with cryptographic verification",
    color: "purple",
  },
];

const useCases = [
  {
    icon: TrendingUp,
    title: "PBM Contract Savings",
    description: "Track and verify savings from pharmacy benefit manager negotiations",
    impact: "$2.4M avg annual savings",
    stat: "20-35%",
  },
  {
    icon: AlertCircle,
    title: "Claims Accuracy",
    description: "Document overpayments and billing errors with full evidence chain",
    impact: "85% error detection rate",
    stat: "99.7%",
  },
  {
    icon: Shield,
    title: "Compliance Tracking",
    description: "Maintain regulatory compliance with complete audit documentation",
    impact: "100% audit ready",
    stat: "24/7",
  },
  {
    icon: Users,
    title: "Vendor Performance",
    description: "Evidence-based vendor scorecards and contract compliance",
    impact: "40% improvement tracking",
    stat: "Real-time",
  },
];

export default function VerifiedSavingsLedgerPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <>
      <SEO
        title="Verified Savings Ledger | Immutable Financial Impact Tracking"
        description="Blockchain-grade ledger system for tracking and verifying financial savings with cryptographic proof and automated evidence collection."
      />
      <SiteHeader />

      <div ref={containerRef} className="min-h-screen bg-black text-white overflow-hidden">
        {/* Premium 3D Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Animated 3D Background */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute inset-0"
              style={{
                background: "radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.15) 0%, transparent 50%)",
              }}
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-black to-black" />
            
            {/* Floating Orbs */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full blur-3xl"
                style={{
                  width: Math.random() * 400 + 250,
                  height: Math.random() * 400 + 250,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: `radial-gradient(circle, ${
                    ["rgba(16, 185, 129, 0.3)", "rgba(5, 150, 105, 0.3)", "rgba(34, 197, 94, 0.3)"][i % 3]
                  } 0%, transparent 70%)`,
                }}
                animate={{
                  x: [0, Math.random() * 150 - 75, 0],
                  y: [0, Math.random() * 150 - 75, 0],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: Math.random() * 15 + 15,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}

            {/* 3D Grid */}
            <motion.div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(16, 185, 129, 0.15) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(16, 185, 129, 0.15) 1px, transparent 1px)
                `,
                backgroundSize: "70px 70px",
                perspective: "1200px",
                transformStyle: "preserve-3d",
              }}
              animate={{
                rotateX: [0, 10, 0],
                rotateY: [0, 10, 0],
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Hero Content */}
          <motion.div
            style={{ y, opacity }}
            className="relative z-10 max-w-7xl mx-auto px-6 text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateX: -30 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              style={{
                perspective: "1500px",
                transformStyle: "preserve-3d",
              }}
            >
              {/* 3D Rotating Badge */}
              <motion.div
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-400/30 mb-8"
                animate={{
                  rotateY: [0, 360],
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                <Shield className="h-6 w-6 text-emerald-400" />
                <span className="text-emerald-300 font-semibold">Immutable Financial Tracking</span>
                <Lock className="h-6 w-6 text-green-400" />
              </motion.div>

              <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-emerald-300 via-green-300 to-teal-300 bg-clip-text text-transparent">
                Verified Savings Ledger
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12">
                Blockchain-grade financial impact tracking with cryptographic proof,
                automated evidence collection, and immutable audit trails
              </p>

              {/* 3D CTA Buttons */}
              <div className="flex flex-wrap justify-center gap-6">
                <motion.a
                  href="/ledger"
                  className="group relative px-10 py-5 rounded-xl font-semibold text-lg overflow-hidden"
                  whileHover={{ scale: 1.05, z: 50 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    perspective: "1000px",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-600 rounded-xl" />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-400 rounded-xl"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                  <span className="relative z-10 flex items-center gap-2">
                    View Live Ledger
                    <Eye className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  </span>
                </motion.a>

                <motion.a
                  href="/request-demo"
                  className="group relative px-10 py-5 rounded-xl font-semibold text-lg border-2 border-emerald-400/30 hover:border-emerald-400/60 transition-colors"
                  whileHover={{ scale: 1.05, z: 50 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    perspective: "1000px",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <span className="flex items-center gap-2">
                    Schedule Demo
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.a>
              </div>
            </motion.div>

            {/* 3D Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
            >
              {[
                { label: "Avg Savings Tracked", value: "$2.4M", icon: DollarSign },
                { label: "Validation Accuracy", value: "99.9%", icon: Sparkles },
                { label: "Audit Compliance", value: "100%", icon: CheckCircle2 },
                { label: "Response Time", value: "<1s", icon: Zap },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="relative group"
                  whileHover={{
                    scale: 1.05,
                    rotateY: 5,
                    z: 50,
                  }}
                  style={{
                    perspective: "1000px",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div className="relative p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-green-500/10 border border-emerald-400/20 group-hover:border-emerald-400/40 transition-all duration-500">
                    <stat.icon className="h-8 w-8 text-emerald-400 mb-3 group-hover:scale-110 transition-transform" />
                    <div className="text-3xl font-bold text-emerald-100 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                    
                    {/* 3D Glow Effect */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 blur-xl opacity-0 group-hover:opacity-100"
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Premium 3D Features Section */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-emerald-950/5 to-black" />
          
          <div className="relative max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl font-bold text-emerald-100 mb-6">
                Core Ledger Capabilities
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Enterprise-grade financial tracking with cryptographic verification
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {ledgerFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative"
                  whileHover={{
                    scale: 1.02,
                    rotateY: 3,
                    z: 50,
                  }}
                  style={{
                    perspective: "1500px",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div className="relative p-8 rounded-2xl bg-gradient-to-br from-zinc-900/80 to-black/80 border border-emerald-400/20 group-hover:border-emerald-400/40 transition-all duration-500 overflow-hidden">
                    {/* 3D Rotating Icon */}
                    <motion.div
                      className="relative mb-6"
                      whileHover={{
                        rotateY: 180,
                      }}
                      transition={{
                        duration: 0.6,
                        ease: "easeOut",
                      }}
                      style={{
                        transformStyle: "preserve-3d",
                      }}
                    >
                      <feature.icon className={`h-12 w-12 text-${feature.color}-400`} />
                    </motion.div>

                    <h3 className="text-2xl font-bold text-emerald-100 mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Animated Glow */}
                    <motion.div
                      className={`absolute top-0 right-0 w-64 h-64 rounded-full bg-gradient-to-br ${feature.gradient} blur-3xl`}
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0.5, 0.3],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />

                    {/* 3D Corner Accent */}
                    <motion.div
                      className={`absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr ${feature.gradient} rounded-tr-3xl opacity-0 group-hover:opacity-100`}
                      initial={{ scale: 0, rotate: -45 }}
                      whileHover={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.5 }}
                      style={{
                        transformStyle: "preserve-3d",
                        transform: "translateZ(20px)",
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 3D Workflow Timeline */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-green-950/5 to-black" />
          
          <div className="relative max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl font-bold text-green-100 mb-6">
                Automated Workflow
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                From detection to verification in seconds
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-6">
              {workflowSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative"
                  whileHover={{
                    scale: 1.05,
                    z: 50,
                  }}
                  style={{
                    perspective: "1000px",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div className="relative p-6 rounded-2xl bg-gradient-to-br from-zinc-900/60 to-black/60 border border-emerald-400/20 group-hover:border-emerald-400/40 transition-all duration-500">
                    {/* Step Number Badge */}
                    <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center text-white font-bold text-lg border-4 border-black">
                      {index + 1}
                    </div>

                    {/* 3D Rotating Icon */}
                    <motion.div
                      animate={{
                        rotateZ: [0, 360],
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="inline-block mb-4 mt-4"
                    >
                      <step.icon className={`h-10 w-10 text-${step.color}-400`} />
                    </motion.div>

                    <h3 className="text-lg font-bold text-emerald-100 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {step.description}
                    </p>

                    {/* Connecting Line */}
                    {index < workflowSteps.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-emerald-400/50 to-transparent" />
                    )}

                    {/* Glow Effect */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-green-500/10 blur-xl opacity-0 group-hover:opacity-100"
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 3D Use Cases Grid */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-emerald-950/5 to-black" />
          
          <div className="relative max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl font-bold text-emerald-100 mb-6">
                Real-World Applications
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Proven impact across healthcare and benefits operations
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {useCases.map((useCase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative"
                  whileHover={{
                    scale: 1.02,
                    rotateY: -2,
                    z: 50,
                  }}
                  style={{
                    perspective: "1500px",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div className="relative p-8 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-green-500/10 border border-emerald-400/20 group-hover:border-emerald-400/40 transition-all duration-500">
                    {/* Icon with 3D rotation */}
                    <motion.div
                      whileHover={{
                        rotateY: 180,
                      }}
                      transition={{
                        duration: 0.6,
                      }}
                      style={{
                        transformStyle: "preserve-3d",
                      }}
                      className="inline-block mb-6"
                    >
                      <useCase.icon className="h-12 w-12 text-emerald-400" />
                    </motion.div>

                    {/* Stat Badge */}
                    <div className="absolute top-6 right-6">
                      <div className="px-4 py-2 rounded-full bg-gradient-to-r from-green-500/30 to-emerald-500/30 border border-green-400/40">
                        <span className="text-green-300 font-bold text-lg">{useCase.stat}</span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-emerald-100 mb-3">
                      {useCase.title}
                    </h3>
                    <p className="text-gray-400 mb-6">
                      {useCase.description}
                    </p>

                    {/* Impact Metric */}
                    <div className="flex items-center gap-2 text-green-400 font-semibold">
                      <TrendingUp className="h-5 w-5" />
                      <span>{useCase.impact}</span>
                    </div>

                    {/* Glow Effect */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 blur-2xl opacity-0 group-hover:opacity-100"
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 3D CTA Section */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full blur-3xl"
                style={{
                  width: Math.random() * 500 + 250,
                  height: Math.random() * 500 + 250,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: `radial-gradient(circle, ${
                    ["rgba(16, 185, 129, 0.2)", "rgba(5, 150, 105, 0.2)"][i % 2]
                  } 0%, transparent 70%)`,
                }}
                animate={{
                  x: [0, Math.random() * 60 - 30, 0],
                  y: [0, Math.random() * 60 - 30, 0],
                  scale: [1, 1.4, 1],
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          <div className="relative max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="group relative"
              whileHover={{
                scale: 1.02,
                z: 50,
              }}
              style={{
                perspective: "1500px",
                transformStyle: "preserve-3d",
              }}
            >
              <div className="relative p-12 rounded-3xl bg-gradient-to-br from-emerald-500/20 via-green-500/20 to-teal-500/20 border border-emerald-400/30 group-hover:border-emerald-400/50 transition-all duration-500">
                {/* 3D Rotating Icon */}
                <motion.div
                  className="inline-block mb-8"
                  animate={{
                    rotateY: [0, 360],
                  }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Target className="h-16 w-16 text-emerald-400 mx-auto" />
                </motion.div>

                <h2 className="text-4xl font-bold text-emerald-100 mb-6">
                  Start Tracking Verified Savings
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  See how blockchain-grade ledger technology transforms financial accountability
                </p>

                <div className="flex flex-wrap justify-center gap-6">
                  <motion.a
                    href="/ledger"
                    className="group/button inline-flex items-center gap-3 px-10 py-5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold text-lg relative overflow-hidden"
                    whileHover={{ scale: 1.05, z: 30 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      perspective: "1000px",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-400"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                    <span className="relative z-10 flex items-center gap-2">
                      View Live Ledger
                      <Database className="h-6 w-6 group-hover/button:scale-110 transition-transform" />
                    </span>
                  </motion.a>

                  <motion.a
                    href="/request-demo"
                    className="inline-flex items-center gap-3 px-10 py-5 rounded-xl border-2 border-emerald-400/30 hover:border-emerald-400/60 text-white font-semibold text-lg transition-colors"
                    whileHover={{ scale: 1.05, z: 30 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Schedule Demo
                    <ArrowRight className="h-6 w-6" />
                  </motion.a>
                </div>

                {/* Animated Background Glow */}
                <motion.div
                  className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500/30 to-green-500/30 blur-3xl"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                  }}
                />
              </div>
            </motion.div>
          </div>
        </section>

        <SiteFooter />
      </div>
    </>
  );
}