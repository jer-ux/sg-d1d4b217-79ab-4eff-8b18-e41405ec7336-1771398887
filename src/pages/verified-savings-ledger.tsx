"use client";

import Head from "next/head";
import { useMemo, useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
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
  Layers,
  Fingerprint,
  Activity,
} from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import Nav from "@/components/Nav";

const ledgerFeatures = [
  {
    icon: DollarSign,
    title: "Automated Value Tracking",
    description: "Real-time tracking of savings, cost avoidance, and financial impact with cryptographic proof",
    gradient: "from-green-500/20 via-emerald-500/20 to-green-600/20",
    color: "green",
    metric: "$2.4M",
    label: "Avg Tracked",
  },
  {
    icon: Lock,
    title: "Immutable Audit Trail",
    description: "Blockchain-grade security ensuring every transaction is permanently recorded and verifiable",
    gradient: "from-purple-500/20 via-violet-500/20 to-purple-600/20",
    color: "purple",
    metric: "100%",
    label: "Tamper Proof",
  },
  {
    icon: FileCheck,
    title: "Evidence-Based Validation",
    description: "Every entry backed by cryptographic receipts and supporting documentation",
    gradient: "from-blue-500/20 via-cyan-500/20 to-blue-600/20",
    color: "blue",
    metric: "99.9%",
    label: "Accuracy",
  },
  {
    icon: TrendingUp,
    title: "Impact Analytics",
    description: "Comprehensive reporting and analytics on financial performance and ROI",
    gradient: "from-amber-500/20 via-orange-500/20 to-amber-600/20",
    color: "amber",
    metric: "142%",
    label: "Avg ROI",
  },
];

const workflowSteps = [
  {
    icon: AlertCircle,
    title: "Issue Detected",
    description: "War Room identifies opportunity or issue with financial impact",
    color: "red",
    depth: 0,
  },
  {
    icon: FileCheck,
    title: "Evidence Collected",
    description: "Automated collection of supporting documentation and proof",
    color: "blue",
    depth: 20,
  },
  {
    icon: DollarSign,
    title: "Value Calculated",
    description: "AI-powered quantification of financial impact",
    color: "green",
    depth: 40,
  },
  {
    icon: Lock,
    title: "Ledger Entry Created",
    description: "Immutable record created with cryptographic verification",
    color: "purple",
    depth: 60,
  },
];

const useCases = [
  {
    icon: TrendingUp,
    title: "PBM Contract Savings",
    description: "Track and verify savings from pharmacy benefit manager negotiations",
    impact: "$2.4M avg annual savings",
    stat: "20-35%",
    color: "emerald",
  },
  {
    icon: AlertCircle,
    title: "Claims Accuracy",
    description: "Document overpayments and billing errors with full evidence chain",
    impact: "85% error detection rate",
    stat: "99.7%",
    color: "blue",
  },
  {
    icon: Shield,
    title: "Compliance Tracking",
    description: "Maintain regulatory compliance with complete audit documentation",
    impact: "100% audit ready",
    stat: "24/7",
    color: "purple",
  },
  {
    icon: Users,
    title: "Vendor Performance",
    description: "Evidence-based vendor scorecards and contract compliance",
    impact: "40% improvement tracking",
    stat: "Real-time",
    color: "amber",
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
      <Head>
        <title>Verified Savings Ledger - SiriusB iQ AI Data Sciences Lab</title>
      </Head>
      <Nav />

      <div className="min-h-screen bg-black text-white pb-20">
        {/* Premium 3D Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Advanced 3D Background */}
          <div className="absolute inset-0" style={{ perspective: "2000px", transformStyle: "preserve-3d" }}>
            {/* Rotating Ring System */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: "radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.2) 0%, transparent 60%)",
                transformStyle: "preserve-3d",
              }}
              animate={{
                rotateX: [0, 10, 0],
                rotateY: [0, 360],
              }}
              transition={{
                duration: 40,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 border-2 border-emerald-500/20 rounded-full"
                  style={{
                    transform: `rotateX(${i * 30}deg) translateZ(${i * 100}px)`,
                    transformStyle: "preserve-3d",
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 5 + i * 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>

            {/* 3D Particle Field */}
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: `radial-gradient(circle, ${
                    ["#10b981", "#059669", "#22c55e"][i % 3]
                  }, transparent)`,
                  transformStyle: "preserve-3d",
                }}
                animate={{
                  z: [0, Math.random() * 200 - 100, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}

            {/* 3D Grid with Depth */}
            <motion.div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(16, 185, 129, 0.1) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(16, 185, 129, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: "60px 60px",
                transformStyle: "preserve-3d",
              }}
              animate={{
                rotateX: [0, 15, 0],
                translateZ: [0, -100, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Volumetric Light Beams */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-0 w-1 h-full"
                style={{
                  left: `${20 + i * 15}%`,
                  background: `linear-gradient(to bottom, rgba(16, 185, 129, 0.3), transparent)`,
                  filter: "blur(20px)",
                  transformStyle: "preserve-3d",
                }}
                animate={{
                  opacity: [0.2, 0.6, 0.2],
                  scaleY: [1, 1.2, 1],
                  rotateZ: [-5, 5, -5],
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Hero Content with 3D Depth */}
          <motion.div
            style={{ y, opacity }}
            className="relative z-10 max-w-7xl mx-auto px-6 text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateX: -30 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              style={{
                perspective: "2000px",
                transformStyle: "preserve-3d",
              }}
            >
              {/* 3D Floating Badge with Layers */}
              <motion.div
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full mb-8 relative"
                style={{
                  transformStyle: "preserve-3d",
                  background: "linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.3))",
                  border: "1px solid rgba(16, 185, 129, 0.4)",
                  boxShadow: "0 20px 60px rgba(16, 185, 129, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                }}
                animate={{
                  rotateY: [0, 360],
                  z: [0, 50, 0],
                }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <motion.div
                  animate={{ rotateZ: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <Shield className="h-6 w-6 text-emerald-400" style={{ filter: "drop-shadow(0 0 8px rgba(16, 185, 129, 0.8))" }} />
                </motion.div>
                <span className="text-emerald-300 font-semibold tracking-wide">Immutable Financial Tracking</span>
                <motion.div
                  animate={{ rotateZ: [360, 0] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <Lock className="h-6 w-6 text-green-400" style={{ filter: "drop-shadow(0 0 8px rgba(34, 197, 94, 0.8))" }} />
                </motion.div>
                
                {/* Rim Light */}
                <div className="absolute inset-0 rounded-full opacity-50" style={{
                  background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.2), transparent)",
                  transform: "translateZ(-10px)",
                }} />
              </motion.div>

              {/* 3D Title with Depth Layers */}
              <div className="relative mb-6" style={{ transformStyle: "preserve-3d" }}>
                <motion.h1
                  className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-emerald-300 via-green-300 to-teal-300 bg-clip-text text-transparent"
                  animate={{
                    textShadow: [
                      "0 0 20px rgba(16, 185, 129, 0.5)",
                      "0 0 40px rgba(16, 185, 129, 0.8)",
                      "0 0 20px rgba(16, 185, 129, 0.5)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Verified Savings Ledger
                </motion.h1>
                {/* Shadow Layer */}
                <motion.div
                  className="absolute inset-0 text-6xl md:text-8xl font-bold text-emerald-900/30 blur-sm"
                  style={{ transform: "translateZ(-20px)" }}
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Verified Savings Ledger
                </motion.div>
              </div>

              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
                Blockchain-grade financial impact tracking with cryptographic proof,
                automated evidence collection, and immutable audit trails
              </p>

              {/* 3D CTA Buttons with Glass Morphism */}
              <div className="flex flex-wrap justify-center gap-6 mb-16">
                <motion.a
                  href="/ledger"
                  className="group relative px-10 py-5 rounded-2xl font-semibold text-lg overflow-hidden"
                  whileHover={{ scale: 1.05, z: 80 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    perspective: "1000px",
                    transformStyle: "preserve-3d",
                    background: "linear-gradient(135deg, #10b981, #059669)",
                    boxShadow: "0 20px 60px rgba(16, 185, 129, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-400 opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10 flex items-center gap-2">
                    View Live Ledger
                    <Eye className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  </span>
                  {/* Rim Light */}
                  <div className="absolute inset-0 rounded-2xl opacity-50" style={{
                    background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.3), transparent)",
                    transform: "translateZ(10px)",
                  }} />
                </motion.a>

                <motion.a
                  href="/request-demo"
                  className="group relative px-10 py-5 rounded-2xl font-semibold text-lg overflow-hidden"
                  whileHover={{ scale: 1.05, z: 80 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    perspective: "1000px",
                    transformStyle: "preserve-3d",
                    background: "rgba(0, 0, 0, 0.5)",
                    border: "2px solid rgba(16, 185, 129, 0.4)",
                    backdropFilter: "blur(20px)",
                    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <span className="flex items-center gap-2 relative z-10">
                    Schedule Demo
                    <ArrowRight className="h-5 w-6 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.a>
              </div>

              {/* 3D Stats Cards in Stacked Layers */}
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6"
                style={{ perspective: "2000px", transformStyle: "preserve-3d" }}
              >
                {[
                  { label: "Avg Savings Tracked", value: "$2.4M", icon: DollarSign, color: "emerald" },
                  { label: "Validation Accuracy", value: "99.9%", icon: Sparkles, color: "cyan" },
                  { label: "Audit Compliance", value: "100%", icon: CheckCircle2, color: "green" },
                  { label: "Response Time", value: "<1s", icon: Zap, color: "yellow" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    className="relative group"
                    whileHover={{
                      scale: 1.08,
                      rotateY: 8,
                      z: 100,
                    }}
                    style={{
                      perspective: "1500px",
                      transformStyle: "preserve-3d",
                      transform: `translateZ(${i * 10}px)`,
                    }}
                  >
                    <div className="relative p-8 rounded-2xl overflow-hidden" style={{
                      background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.15))",
                      border: "1px solid rgba(16, 185, 129, 0.3)",
                      backdropFilter: "blur(20px)",
                      boxShadow: "0 20px 60px rgba(16, 185, 129, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                    }}>
                      <motion.div
                        animate={{
                          rotateZ: [0, 360],
                        }}
                        transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear" }}
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        <stat.icon className={`h-10 w-10 text-${stat.color}-400 mb-4`} style={{
                          filter: `drop-shadow(0 0 12px rgba(16, 185, 129, 0.6))`,
                        }} />
                      </motion.div>
                      <div className="text-4xl font-bold text-emerald-100 mb-2">{stat.value}</div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                      
                      {/* 3D Glow with Depth */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100"
                        style={{
                          background: "radial-gradient(circle, rgba(16, 185, 129, 0.4), transparent)",
                          transform: "translateZ(-20px)",
                        }}
                        animate={{
                          scale: [1, 1.3, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      />

                      {/* Rim Light */}
                      <div className="absolute inset-0 rounded-2xl opacity-40 pointer-events-none" style={{
                        background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.2), transparent)",
                        transform: "translateZ(5px)",
                      }} />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Depth Fog */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "radial-gradient(circle at 50% 50%, transparent 0%, rgba(0, 0, 0, 0.5) 100%)",
          }} />
        </section>

        {/* Premium 3D Features Section with Card Stack */}
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
              <motion.div
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-400/30 mb-6"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(16, 185, 129, 0.3)",
                    "0 0 40px rgba(16, 185, 129, 0.5)",
                    "0 0 20px rgba(16, 185, 129, 0.3)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Layers className="h-5 w-5 text-emerald-400" />
                <span className="text-emerald-300 font-semibold">Core Capabilities</span>
              </motion.div>
              <h2 className="text-5xl md:text-6xl font-bold text-emerald-100 mb-6">
                Enterprise-Grade Ledger
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Cryptographic verification meets financial accountability
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8" style={{ perspective: "2000px", transformStyle: "preserve-3d" }}>
              {ledgerFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 60, rotateX: -20 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.15 }}
                  className="group relative"
                  whileHover={{
                    scale: 1.03,
                    rotateY: 5,
                    z: 100,
                  }}
                  style={{
                    perspective: "2000px",
                    transformStyle: "preserve-3d",
                    transform: `translateZ(${index * 15}px)`,
                  }}
                >
                  <div className="relative p-10 rounded-3xl overflow-hidden" style={{
                    background: "linear-gradient(135deg, rgba(24, 24, 27, 0.9), rgba(0, 0, 0, 0.9))",
                    border: "1px solid rgba(16, 185, 129, 0.3)",
                    backdropFilter: "blur(20px)",
                    boxShadow: "0 30px 80px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                  }}>
                    {/* 3D Floating Icon */}
                    <motion.div
                      className="relative mb-8"
                      animate={{
                        rotateY: [0, 360],
                        z: [0, 30, 0],
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      style={{
                        transformStyle: "preserve-3d",
                      }}
                    >
                      <motion.div
                        className="inline-flex items-center justify-center w-20 h-20 rounded-2xl"
                        style={{
                          background: `linear-gradient(135deg, ${feature.gradient})`,
                          border: "1px solid rgba(16, 185, 129, 0.4)",
                          boxShadow: "0 20px 40px rgba(16, 185, 129, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                        }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <feature.icon className={`h-10 w-10 text-${feature.color}-400`} style={{
                          filter: `drop-shadow(0 0 10px rgba(16, 185, 129, 0.8))`,
                        }} />
                      </motion.div>
                      {/* Icon Shadow */}
                      <div className="absolute inset-0 blur-xl opacity-50" style={{
                        background: `radial-gradient(circle, ${feature.gradient})`,
                        transform: "translateZ(-30px) scale(1.5)",
                      }} />
                    </motion.div>

                    {/* Metric Badge */}
                    <motion.div
                      className="absolute top-8 right-8 px-4 py-2 rounded-xl"
                      style={{
                        background: "linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.3))",
                        border: "1px solid rgba(16, 185, 129, 0.4)",
                        backdropFilter: "blur(10px)",
                        boxShadow: "0 10px 30px rgba(16, 185, 129, 0.2)",
                      }}
                      animate={{
                        rotateY: [0, 15, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                      }}
                    >
                      <div className="text-2xl font-bold text-emerald-300">{feature.metric}</div>
                      <div className="text-xs text-emerald-400/70">{feature.label}</div>
                    </motion.div>

                    <h3 className="text-3xl font-bold text-emerald-100 mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-lg leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Volumetric Glow */}
                    <motion.div
                      className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl`}
                      style={{
                        background: `radial-gradient(circle, ${feature.gradient})`,
                        transform: "translateZ(-50px)",
                      }}
                      animate={{
                        scale: [1, 1.4, 1],
                        opacity: [0.2, 0.4, 0.2],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />

                    {/* Rim Light Top */}
                    <div className="absolute inset-x-0 top-0 h-px" style={{
                      background: "linear-gradient(to right, transparent, rgba(255, 255, 255, 0.3), transparent)",
                    }} />

                    {/* 3D Corner Accent */}
                    <motion.div
                      className="absolute bottom-0 left-0 w-40 h-40 rounded-tr-3xl opacity-0 group-hover:opacity-100"
                      style={{
                        background: `linear-gradient(to top right, ${feature.gradient})`,
                        transform: "translateZ(20px)",
                      }}
                      initial={{ scale: 0, rotate: -45 }}
                      whileHover={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>

                  {/* Card Shadow Layer */}
                  <div className="absolute inset-0 rounded-3xl blur-2xl opacity-30" style={{
                    background: "linear-gradient(135deg, rgba(16, 185, 129, 0.3), rgba(5, 150, 105, 0.2))",
                    transform: "translateZ(-30px) scale(0.95)",
                  }} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 3D Workflow Pipeline */}
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
              <motion.div
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 mb-6"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(34, 197, 94, 0.3)",
                    "0 0 40px rgba(34, 197, 94, 0.5)",
                    "0 0 20px rgba(34, 197, 94, 0.3)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Activity className="h-5 w-5 text-green-400" />
                <span className="text-green-300 font-semibold">Automated Workflow</span>
              </motion.div>
              <h2 className="text-5xl md:text-6xl font-bold text-green-100 mb-6">
                Detection to Verification
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Millisecond processing with cryptographic proof
              </p>
            </motion.div>

            {/* 3D Pipeline with Depth */}
            <div className="relative" style={{ perspective: "3000px", transformStyle: "preserve-3d" }}>
              {/* Connection Lines in 3D Space */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ transform: "translateZ(-50px)" }}>
                {workflowSteps.slice(0, -1).map((_, i) => (
                  <motion.line
                    key={i}
                    x1={`${(i + 1) * 25}%`}
                    y1="50%"
                    x2={`${(i + 2) * 25}%`}
                    y2="50%"
                    stroke="url(#gradient)"
                    strokeWidth="2"
                    strokeDasharray="10,5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.5 }}
                    transition={{ duration: 1.5, delay: i * 0.3 }}
                  />
                ))}
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(16, 185, 129, 0.5)" />
                    <stop offset="100%" stopColor="rgba(34, 197, 94, 0.5)" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="grid md:grid-cols-4 gap-8">
                {workflowSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 60, rotateX: -30 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    className="group relative"
                    whileHover={{
                      scale: 1.08,
                      z: 150,
                      rotateY: 10,
                    }}
                    style={{
                      perspective: "2000px",
                      transformStyle: "preserve-3d",
                      transform: `translateZ(${step.depth}px)`,
                    }}
                  >
                    <div className="relative p-8 rounded-3xl overflow-hidden" style={{
                      background: "linear-gradient(135deg, rgba(24, 24, 27, 0.8), rgba(0, 0, 0, 0.8))",
                      border: "1px solid rgba(16, 185, 129, 0.3)",
                      backdropFilter: "blur(20px)",
                      boxShadow: `0 ${30 + step.depth}px ${80 + step.depth}px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
                    }}>
                      {/* 3D Step Number */}
                      <motion.div
                        className="absolute -top-6 -left-6 w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-2xl"
                        style={{
                          background: "linear-gradient(135deg, #10b981, #059669)",
                          border: "2px solid rgba(16, 185, 129, 0.5)",
                          boxShadow: "0 15px 40px rgba(16, 185, 129, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
                          transform: "translateZ(40px)",
                        }}
                        animate={{
                          rotateY: [0, 360],
                        }}
                        transition={{
                          duration: 15 + index * 3,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        {index + 1}
                      </motion.div>

                      {/* 3D Rotating Icon */}
                      <motion.div
                        className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 mt-6"
                        style={{
                          background: `linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.3))`,
                          border: "1px solid rgba(16, 185, 129, 0.4)",
                          boxShadow: "0 15px 30px rgba(16, 185, 129, 0.3)",
                        }}
                        animate={{
                          rotateZ: [0, 360],
                          z: [0, 20, 0],
                        }}
                        transition={{
                          duration: 25 + index * 5,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <step.icon className={`h-8 w-8 text-${step.color}-400`} style={{
                          filter: `drop-shadow(0 0 10px rgba(16, 185, 129, 0.8))`,
                        }} />
                      </motion.div>

                      <h3 className="text-xl font-bold text-emerald-100 mb-3">
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        {step.description}
                      </p>

                      {/* Volumetric Glow */}
                      <motion.div
                        className="absolute inset-0 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100"
                        style={{
                          background: "radial-gradient(circle, rgba(16, 185, 129, 0.3), transparent)",
                          transform: "translateZ(-40px)",
                        }}
                        animate={{
                          scale: [1, 1.3, 1],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                        }}
                      />

                      {/* Rim Light */}
                      <div className="absolute inset-x-0 top-0 h-px" style={{
                        background: "linear-gradient(to right, transparent, rgba(255, 255, 255, 0.3), transparent)",
                      }} />
                    </div>

                    {/* Card Shadow */}
                    <div className="absolute inset-0 rounded-3xl blur-xl opacity-40" style={{
                      background: "linear-gradient(135deg, rgba(16, 185, 129, 0.3), rgba(5, 150, 105, 0.2))",
                      transform: `translateZ(${-step.depth - 20}px) scale(0.9)`,
                    }} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3D Use Cases Grid with Isometric Cards */}
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
              <motion.div
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-400/30 mb-6"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(16, 185, 129, 0.3)",
                    "0 0 40px rgba(16, 185, 129, 0.5)",
                    "0 0 20px rgba(16, 185, 129, 0.3)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Target className="h-5 w-5 text-emerald-400" />
                <span className="text-emerald-300 font-semibold">Real-World Impact</span>
              </motion.div>
              <h2 className="text-5xl md:text-6xl font-bold text-emerald-100 mb-6">
                Proven Applications
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Measurable results across healthcare operations
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-10" style={{ perspective: "3000px", transformStyle: "preserve-3d" }}>
              {useCases.map((useCase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 60, rotateX: -25 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.15 }}
                  className="group relative"
                  whileHover={{
                    scale: 1.04,
                    rotateY: -8,
                    z: 120,
                  }}
                  style={{
                    perspective: "2500px",
                    transformStyle: "preserve-3d",
                    transform: `translateZ(${index * 20}px) rotateY(${index % 2 === 0 ? -3 : 3}deg)`,
                  }}
                >
                  <div className="relative p-10 rounded-3xl overflow-hidden" style={{
                    background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.15))",
                    border: "1px solid rgba(16, 185, 129, 0.3)",
                    backdropFilter: "blur(20px)",
                    boxShadow: "0 30px 80px rgba(16, 185, 129, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                  }}>
                    {/* 3D Floating Icon */}
                    <motion.div
                      className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-8"
                      style={{
                        background: `linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.3))`,
                        border: "1px solid rgba(16, 185, 129, 0.4)",
                        boxShadow: "0 20px 40px rgba(16, 185, 129, 0.3)",
                      }}
                      animate={{
                        rotateY: [0, 360],
                        z: [0, 40, 0],
                      }}
                      transition={{
                        duration: 20 + index * 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <useCase.icon className={`h-10 w-10 text-${useCase.color}-400`} style={{
                        filter: `drop-shadow(0 0 12px rgba(16, 185, 129, 0.8))`,
                      }} />
                    </motion.div>

                    {/* 3D Stat Badge */}
                    <motion.div
                      className="absolute top-8 right-8 px-6 py-3 rounded-2xl"
                      style={{
                        background: "linear-gradient(135deg, rgba(34, 197, 94, 0.3), rgba(16, 185, 129, 0.4))",
                        border: "1px solid rgba(34, 197, 94, 0.5)",
                        backdropFilter: "blur(10px)",
                        boxShadow: "0 15px 40px rgba(34, 197, 94, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                      }}
                      animate={{
                        rotateY: [0, 20, 0],
                        z: [0, 20, 0],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                      }}
                    >
                      <span className="text-green-300 font-bold text-2xl">{useCase.stat}</span>
                    </motion.div>

                    <h3 className="text-3xl font-bold text-emerald-100 mb-4">
                      {useCase.title}
                    </h3>
                    <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                      {useCase.description}
                    </p>

                    {/* Impact Metric with Icon */}
                    <div className="flex items-center gap-3">
                      <motion.div
                        className="flex items-center justify-center w-10 h-10 rounded-xl"
                        style={{
                          background: "linear-gradient(135deg, rgba(34, 197, 94, 0.3), rgba(16, 185, 129, 0.4))",
                          border: "1px solid rgba(34, 197, 94, 0.4)",
                        }}
                        animate={{
                          rotateZ: [0, 360],
                        }}
                        transition={{
                          duration: 15,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <TrendingUp className="h-5 w-5 text-green-400" />
                      </motion.div>
                      <span className="text-green-300 font-semibold text-lg">{useCase.impact}</span>
                    </div>

                    {/* Volumetric Glow */}
                    <motion.div
                      className="absolute inset-0 rounded-3xl blur-3xl opacity-0 group-hover:opacity-100"
                      style={{
                        background: "radial-gradient(circle, rgba(16, 185, 129, 0.4), transparent)",
                        transform: "translateZ(-50px)",
                      }}
                      animate={{
                        scale: [1, 1.4, 1],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                      }}
                    />

                    {/* Rim Light */}
                    <div className="absolute inset-x-0 top-0 h-px" style={{
                      background: "linear-gradient(to right, transparent, rgba(255, 255, 255, 0.3), transparent)",
                    }} />
                  </div>

                  {/* Card Shadow with Depth */}
                  <div className="absolute inset-0 rounded-3xl blur-2xl opacity-40" style={{
                    background: "linear-gradient(135deg, rgba(16, 185, 129, 0.3), rgba(5, 150, 105, 0.2))",
                    transform: "translateZ(-40px) scale(0.95)",
                  }} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Premium 3D CTA Section */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0" style={{ perspective: "2000px", transformStyle: "preserve-3d" }}>
            {/* 3D Particle Burst */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: Math.random() * 600 + 300,
                  height: Math.random() * 600 + 300,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: `radial-gradient(circle, ${
                    ["rgba(16, 185, 129, 0.25)", "rgba(5, 150, 105, 0.2)", "rgba(34, 197, 94, 0.15)"][i % 3]
                  } 0%, transparent 70%)`,
                  filter: "blur(60px)",
                }}
                animate={{
                  x: [0, Math.random() * 100 - 50, 0],
                  y: [0, Math.random() * 100 - 50, 0],
                  z: [0, Math.random() * 200 - 100, 0],
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: Math.random() * 15 + 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          <div className="relative max-w-5xl mx-auto px-6 text-center" style={{ perspective: "2000px", transformStyle: "preserve-3d" }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateX: -20 }}
              whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="group relative"
              whileHover={{
                scale: 1.02,
                z: 100,
              }}
              style={{
                perspective: "2000px",
                transformStyle: "preserve-3d",
              }}
            >
              <div className="relative p-16 rounded-[3rem] overflow-hidden" style={{
                background: "linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.25), rgba(34, 197, 94, 0.2))",
                border: "1px solid rgba(16, 185, 129, 0.4)",
                backdropFilter: "blur(30px)",
                boxShadow: "0 40px 100px rgba(16, 185, 129, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.2)",
              }}>
                {/* 3D Floating Icon */}
                <motion.div
                  className="inline-flex items-center justify-center w-24 h-24 rounded-3xl mb-10"
                  style={{
                    background: "linear-gradient(135deg, rgba(16, 185, 129, 0.3), rgba(5, 150, 105, 0.4))",
                    border: "1px solid rgba(16, 185, 129, 0.5)",
                    boxShadow: "0 25px 60px rgba(16, 185, 129, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
                  }}
                  animate={{
                    rotateY: [0, 360],
                    z: [0, 60, 0],
                  }}
                  transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Fingerprint className="h-14 w-14 text-emerald-400" style={{
                    filter: "drop-shadow(0 0 15px rgba(16, 185, 129, 1))",
                  }} />
                </motion.div>

                <h2 className="text-5xl md:text-6xl font-bold text-emerald-100 mb-6">
                  Start Tracking Verified Savings
                </h2>
                <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                  Experience blockchain-grade financial accountability with cryptographic proof
                </p>

                <div className="flex flex-wrap justify-center gap-6">
                  <motion.a
                    href="/ledger"
                    className="group/btn relative px-12 py-6 rounded-2xl font-semibold text-xl overflow-hidden"
                    whileHover={{ scale: 1.05, z: 80 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      perspective: "1000px",
                      transformStyle: "preserve-3d",
                      background: "linear-gradient(135deg, #10b981, #059669)",
                      boxShadow: "0 25px 60px rgba(16, 185, 129, 0.5), inset 0 2px 0 rgba(255, 255, 255, 0.3)",
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-400"
                      initial={{ x: "-100%", opacity: 0 }}
                      whileHover={{ x: "100%", opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                    <span className="relative z-10 flex items-center gap-3">
                      View Live Ledger
                      <Database className="h-6 w-6 group-hover/btn:scale-110 transition-transform" />
                    </span>
                    {/* Rim Light */}
                    <div className="absolute inset-0 rounded-2xl opacity-60" style={{
                      background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.4), transparent)",
                      transform: "translateZ(10px)",
                    }} />
                  </motion.a>

                  <motion.a
                    href="/request-demo"
                    className="relative px-12 py-6 rounded-2xl font-semibold text-xl overflow-hidden"
                    whileHover={{ scale: 1.05, z: 80 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      perspective: "1000px",
                      transformStyle: "preserve-3d",
                      background: "rgba(0, 0, 0, 0.6)",
                      border: "2px solid rgba(16, 185, 129, 0.5)",
                      backdropFilter: "blur(20px)",
                      boxShadow: "0 25px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    <span className="flex items-center gap-3">
                      Schedule Demo
                      <ArrowRight className="h-6 w-6" />
                    </span>
                  </motion.a>
                </div>

                {/* Volumetric Background Glow */}
                <motion.div
                  className="absolute inset-0 rounded-[3rem] blur-3xl"
                  style={{
                    background: "radial-gradient(circle, rgba(16, 185, 129, 0.4), transparent)",
                    transform: "translateZ(-80px)",
                  }}
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                  }}
                />

                {/* Rim Light Top */}
                <div className="absolute inset-x-0 top-0 h-1" style={{
                  background: "linear-gradient(to right, transparent, rgba(255, 255, 255, 0.5), transparent)",
                }} />
              </div>

              {/* Card Shadow with Depth */}
              <div className="absolute inset-0 rounded-[3rem] blur-3xl opacity-50" style={{
                background: "linear-gradient(135deg, rgba(16, 185, 129, 0.4), rgba(5, 150, 105, 0.3))",
                transform: "translateZ(-60px) scale(0.95)",
              }} />
            </motion.div>
          </div>
        </section>

        <SiteFooter />
      </div>
    </>
  );
}