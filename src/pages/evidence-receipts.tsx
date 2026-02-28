"use client";

import { SEO } from "@/components/SEO";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import {
  Shield,
  FileCheck,
  Lock,
  Sparkles,
  Clock,
  CheckCircle2,
  ArrowRight,
  Eye,
  Database,
  TrendingUp,
  Zap,
  Target,
  AlertCircle,
  FileText,
  Users,
  BarChart3,
} from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

const keyFeatures = [
  {
    icon: FileCheck,
    title: "Automated Evidence Collection",
    description: "AI-powered extraction and validation of financial evidence from multiple sources",
    gradient: "from-blue-500/20 via-cyan-500/20 to-blue-600/20",
    color: "blue",
  },
  {
    icon: Lock,
    title: "Cryptographic Verification",
    description: "Blockchain-grade proof of authenticity with immutable audit trails",
    gradient: "from-purple-500/20 via-violet-500/20 to-purple-600/20",
    color: "purple",
  },
  {
    icon: Database,
    title: "Centralized Evidence Library",
    description: "Unified repository for all financial documentation and supporting evidence",
    gradient: "from-green-500/20 via-emerald-500/20 to-green-600/20",
    color: "green",
  },
  {
    icon: TrendingUp,
    title: "Impact Quantification",
    description: "Automated calculation of savings and financial impact with evidence backing",
    gradient: "from-amber-500/20 via-orange-500/20 to-amber-600/20",
    color: "amber",
  },
];

const receiptTypes = [
  {
    icon: FileText,
    title: "Savings Receipts",
    description: "Document cost reductions with full evidence chain and proof of value",
    impact: "$2.4M avg documented savings",
  },
  {
    icon: AlertCircle,
    title: "Issue Receipts",
    description: "Track identified problems with supporting documentation and resolution path",
    impact: "85% faster issue resolution",
  },
  {
    icon: BarChart3,
    title: "Performance Receipts",
    description: "Evidence-based vendor and program performance documentation",
    impact: "40% improvement tracking",
  },
  {
    icon: Users,
    title: "Compliance Receipts",
    description: "Maintain regulatory compliance with complete audit trails",
    impact: "100% audit readiness",
  },
];

const capabilities = [
  "Multi-source evidence extraction (PDFs, emails, databases)",
  "AI-powered data validation and verification",
  "Cryptographic receipt generation with blockchain proof",
  "Real-time evidence status tracking",
  "Automated impact calculation and reporting",
  "Integration with War Room and Ledger",
  "Role-based access and permissions",
  "Mobile and desktop receipt access",
];

export default function EvidenceReceiptsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [selectedType, setSelectedType] = useState<typeof receiptTypes[0] | null>(null);

  return (
    <>
      <SEO
        title="Evidence Receipts | Cryptographic Proof System"
        description="Automated evidence collection and cryptographic verification for financial impact documentation with blockchain-grade proof of authenticity."
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
                background: "radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)",
              }}
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black" />
            
            {/* Floating Orbs */}
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full blur-3xl"
                style={{
                  width: Math.random() * 350 + 200,
                  height: Math.random() * 350 + 200,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: `radial-gradient(circle, ${
                    ["rgba(139, 92, 246, 0.3)", "rgba(167, 139, 250, 0.3)", "rgba(124, 58, 237, 0.3)"][i % 3]
                  } 0%, transparent 70%)`,
                }}
                animate={{
                  x: [0, Math.random() * 120 - 60, 0],
                  y: [0, Math.random() * 120 - 60, 0],
                  scale: [1, 1.4, 1],
                }}
                transition={{
                  duration: Math.random() * 12 + 12,
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
                  linear-gradient(to right, rgba(139, 92, 246, 0.15) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(139, 92, 246, 0.15) 1px, transparent 1px)
                `,
                backgroundSize: "60px 60px",
                perspective: "1200px",
                transformStyle: "preserve-3d",
              }}
              animate={{
                rotateX: [0, 8, 0],
                rotateY: [0, 8, 0],
              }}
              transition={{
                duration: 25,
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
              initial={{ opacity: 0, scale: 0.8, rotateX: -25 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              style={{
                perspective: "1200px",
                transformStyle: "preserve-3d",
              }}
            >
              {/* 3D Rotating Badge */}
              <motion.div
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/20 to-violet-500/20 border border-purple-400/30 mb-8"
                animate={{
                  rotateY: [0, 360],
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
                <Shield className="h-5 w-5 text-purple-400" />
                <span className="text-purple-300 font-semibold">Cryptographic Proof System</span>
                <Lock className="h-5 w-5 text-violet-400" />
              </motion.div>

              <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
                Evidence Receipts
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12">
                Automated evidence collection with cryptographic verification, creating
                immutable proof of financial impact and regulatory compliance
              </p>

              {/* 3D CTA Buttons */}
              <div className="flex flex-wrap justify-center gap-6">
                <motion.a
                  href="/ledger"
                  className="group relative px-8 py-4 rounded-xl font-semibold text-lg overflow-hidden"
                  whileHover={{ scale: 1.05, z: 50 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    perspective: "1000px",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-violet-600 rounded-xl" />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-400 to-violet-400 rounded-xl"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                  <span className="relative z-10 flex items-center gap-2">
                    View Receipt Library
                    <Eye className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  </span>
                </motion.a>

                <motion.a
                  href="/request-demo"
                  className="group relative px-8 py-4 rounded-xl font-semibold text-lg border-2 border-purple-400/30 hover:border-purple-400/60 transition-colors"
                  whileHover={{ scale: 1.05, z: 50 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    perspective: "1000px",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <span className="flex items-center gap-2">
                    Request Demo
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
                { label: "Evidence Types", value: "12+", icon: FileCheck },
                { label: "Auto-Validation", value: "99.9%", icon: Sparkles },
                { label: "Avg Processing", value: "<2min", icon: Clock },
                { label: "Audit Ready", value: "100%", icon: CheckCircle2 },
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
                  <div className="relative p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-violet-500/10 border border-purple-400/20 group-hover:border-purple-400/40 transition-all duration-500">
                    <stat.icon className="h-8 w-8 text-purple-400 mb-3 group-hover:scale-110 transition-transform" />
                    <div className="text-3xl font-bold text-purple-100 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                    
                    {/* 3D Glow Effect */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/20 to-violet-500/20 blur-xl opacity-0 group-hover:opacity-100"
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

        {/* Premium 3D Key Features */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/5 to-black" />
          
          <div className="relative max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl font-bold text-purple-100 mb-6">
                Core Evidence Capabilities
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Automated collection, validation, and cryptographic proof of financial evidence
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {keyFeatures.map((feature, index) => (
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
                  <div className="relative p-8 rounded-2xl bg-gradient-to-br from-zinc-900/80 to-black/80 border border-purple-400/20 group-hover:border-purple-400/40 transition-all duration-500 overflow-hidden">
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

                    <h3 className="text-2xl font-bold text-purple-100 mb-4">
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

        {/* 3D Receipt Types Grid */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-violet-950/5 to-black" />
          
          <div className="relative max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl font-bold text-violet-100 mb-6">
                Receipt Types
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Comprehensive evidence documentation across all financial operations
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {receiptTypes.map((type, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative cursor-pointer"
                  onClick={() => setSelectedType(type)}
                  whileHover={{
                    scale: 1.02,
                    rotateY: -3,
                    z: 50,
                  }}
                  style={{
                    perspective: "1500px",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div className="relative p-8 rounded-2xl bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-400/20 group-hover:border-violet-400/40 transition-all duration-500">
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
                      className="inline-block mb-6"
                    >
                      <type.icon className="h-12 w-12 text-violet-400" />
                    </motion.div>

                    <h3 className="text-2xl font-bold text-violet-100 mb-3">
                      {type.title}
                    </h3>
                    <p className="text-gray-400 mb-6">
                      {type.description}
                    </p>

                    {/* Impact Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30">
                      <TrendingUp className="h-4 w-4 text-green-400" />
                      <span className="text-green-300 font-semibold text-sm">{type.impact}</span>
                    </div>

                    {/* Glow Effect */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 blur-2xl opacity-0 group-hover:opacity-100"
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

        {/* 3D Capabilities Checklist */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/5 to-black" />
          
          <div className="relative max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-bold text-purple-100 mb-6">
                Complete Evidence Platform
              </h2>
              <p className="text-xl text-gray-400">
                Everything you need for cryptographic proof and audit compliance
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative p-10 rounded-3xl bg-gradient-to-br from-purple-500/10 to-violet-500/10 border border-purple-400/20"
              whileHover={{
                scale: 1.01,
                z: 30,
              }}
              style={{
                perspective: "1200px",
                transformStyle: "preserve-3d",
              }}
            >
              <div className="grid md:grid-cols-2 gap-4">
                {capabilities.map((capability, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="flex items-start gap-3 p-4 rounded-lg bg-black/20 border border-purple-400/10 hover:border-purple-400/30 transition-colors"
                  >
                    <CheckCircle2 className="h-6 w-6 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{capability}</span>
                  </motion.div>
                ))}
              </div>

              {/* Animated Background Glow */}
              <motion.div
                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/20 to-violet-500/20 blur-3xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                }}
              />
            </motion.div>
          </div>
        </section>

        {/* 3D CTA Section */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full blur-3xl"
                style={{
                  width: Math.random() * 400 + 200,
                  height: Math.random() * 400 + 200,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: `radial-gradient(circle, ${
                    ["rgba(139, 92, 246, 0.2)", "rgba(167, 139, 250, 0.2)"][i % 2]
                  } 0%, transparent 70%)`,
                }}
                animate={{
                  x: [0, Math.random() * 50 - 25, 0],
                  y: [0, Math.random() * 50 - 25, 0],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: Math.random() * 8 + 8,
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
              <div className="relative p-12 rounded-3xl bg-gradient-to-br from-purple-500/20 via-violet-500/20 to-fuchsia-500/20 border border-purple-400/30 group-hover:border-purple-400/50 transition-all duration-500">
                {/* 3D Rotating Icon */}
                <motion.div
                  className="inline-block mb-8"
                  animate={{
                    rotateY: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Target className="h-16 w-16 text-purple-400 mx-auto" />
                </motion.div>

                <h2 className="text-4xl font-bold text-purple-100 mb-6">
                  Start Building Your Evidence Library
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  See how cryptographic receipts transform financial documentation
                </p>

                <div className="flex flex-wrap justify-center gap-6">
                  <motion.a
                    href="/ledger"
                    className="group/button inline-flex items-center gap-3 px-10 py-5 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold text-lg relative overflow-hidden"
                    whileHover={{ scale: 1.05, z: 30 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      perspective: "1000px",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-400 to-violet-400"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                    <span className="relative z-10 flex items-center gap-2">
                      View Receipt Library
                      <Eye className="h-6 w-6 group-hover/button:scale-110 transition-transform" />
                    </span>
                  </motion.a>

                  <motion.a
                    href="/request-demo"
                    className="inline-flex items-center gap-3 px-10 py-5 rounded-xl border-2 border-purple-400/30 hover:border-purple-400/60 text-white font-semibold text-lg transition-colors"
                    whileHover={{ scale: 1.05, z: 30 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Schedule Demo
                    <ArrowRight className="h-6 w-6" />
                  </motion.a>
                </div>

                {/* Animated Background Glow */}
                <motion.div
                  className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/30 to-violet-500/30 blur-3xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 4,
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