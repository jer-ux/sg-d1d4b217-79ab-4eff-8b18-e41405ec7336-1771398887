"use client";

import { SEO } from "@/components/SEO";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import {
  Shield,
  TrendingUp,
  Users,
  Sparkles,
  ArrowRight,
  Check,
  DollarSign,
  FileCheck,
  BarChart3,
  Lock,
  Zap,
  Target,
  Brain,
  Activity,
  AlertTriangle,
  Clock,
  Database,
  Eye,
  FileText,
  Lightbulb,
  LineChart,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

const features = [
  {
    icon: Shield,
    title: "War Room",
    description: "Real-time monitoring and detection of financial anomalies",
    gradient: "from-blue-500/20 via-cyan-500/20 to-blue-600/20",
    color: "blue",
  },
  {
    icon: FileCheck,
    title: "Evidence Receipts",
    description: "Cryptographic proof and immutable audit trails",
    gradient: "from-purple-500/20 via-violet-500/20 to-purple-600/20",
    color: "purple",
  },
  {
    icon: DollarSign,
    title: "Savings Ledger",
    description: "Verified financial impact tracking and ROI analytics",
    gradient: "from-amber-500/20 via-orange-500/20 to-amber-600/20",
    color: "amber",
  },
  {
    icon: BarChart3,
    title: "Analytics Engine",
    description: "AI-powered insights and predictive modeling",
    gradient: "from-green-500/20 via-emerald-500/20 to-green-600/20",
    color: "green",
  },
];

const solutions = [
  {
    icon: TrendingUp,
    title: "PBM Analytics",
    description: "Pharmacy benefit optimization",
    link: "/solutions/claims-analytics",
  },
  {
    icon: Shield,
    title: "Risk Assessment",
    description: "Predictive risk modeling",
    link: "/solutions/risk-assessment",
  },
  {
    icon: FileCheck,
    title: "Compliance",
    description: "ERISA & regulatory tracking",
    link: "/solutions/erisa-compliance",
  },
  {
    icon: Users,
    title: "Member Management",
    description: "Population health analytics",
    link: "/solutions/member-management",
  },
];

const benefits = [
  "20-35% average savings on PBM contracts",
  "Real-time anomaly detection",
  "Automated compliance tracking",
  "Cryptographic audit trails",
  "AI-powered predictions",
  "Transparent reporting",
];

const trustMetrics = [
  { value: "$2.4M", label: "Avg Annual Savings" },
  { value: "99.9%", label: "Detection Accuracy" },
  { value: "100%", label: "Audit Compliance" },
  { value: "<1s", label: "Response Time" },
];

export default function HomePage() {
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
        title="SiriusB iQ | AI-Powered Health Economics Intelligence Platform"
        description="Transform health benefits management with algorithmic fiduciary intelligence. Real-time anomaly detection, cryptographic proof, and verified savings tracking."
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
                background: "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
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
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black" />
            
            {/* Floating Orbs */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full blur-3xl"
                style={{
                  width: Math.random() * 500 + 200,
                  height: Math.random() * 500 + 200,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: `radial-gradient(circle, ${
                    ["rgba(59, 130, 246, 0.3)", "rgba(147, 51, 234, 0.3)", "rgba(251, 191, 36, 0.3)"][i % 3]
                  } 0%, transparent 70%)`,
                }}
                animate={{
                  x: [0, Math.random() * 200 - 100, 0],
                  y: [0, Math.random() * 200 - 100, 0],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: Math.random() * 20 + 15,
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
                  linear-gradient(to right, rgba(59, 130, 246, 0.15) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(59, 130, 246, 0.15) 1px, transparent 1px)
                `,
                backgroundSize: "80px 80px",
                perspective: "1200px",
                transformStyle: "preserve-3d",
              }}
              animate={{
                rotateX: [0, 5, 0],
                rotateY: [0, 5, 0],
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
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 mb-8"
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
                <Sparkles className="h-6 w-6 text-blue-400" />
                <span className="text-blue-300 font-semibold">Next-Gen Health Economics Intelligence</span>
                <Shield className="h-6 w-6 text-purple-400" />
              </motion.div>

              <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-300 via-purple-300 to-amber-300 bg-clip-text text-transparent">
                SiriusB iQ
              </h1>
              <p className="text-2xl md:text-3xl font-semibold text-gray-300 mb-4">
                Algorithmic Fiduciary Intelligence Platform
              </p>
              <p className="text-xl text-gray-400 max-w-4xl mx-auto mb-12">
                Transform health benefits management with AI-powered anomaly detection,
                cryptographic proof systems, and verified savings tracking
              </p>

              {/* 3D CTA Buttons */}
              <div className="flex flex-wrap justify-center gap-6 mb-16">
                <motion.a
                  href="/platform-overview"
                  className="group relative px-10 py-5 rounded-xl font-semibold text-lg overflow-hidden"
                  whileHover={{ scale: 1.05, z: 50 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    perspective: "1000px",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl" />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                  <span className="relative z-10 flex items-center gap-2">
                    Explore Platform
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.a>

                <motion.a
                  href="/war-room"
                  className="group relative px-10 py-5 rounded-xl font-semibold text-lg border-2 border-blue-400/30 hover:border-blue-400/60 transition-colors"
                  whileHover={{ scale: 1.05, z: 50 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    perspective: "1000px",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <span className="flex items-center gap-2">
                    View War Room Demo
                    <Eye className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  </span>
                </motion.a>
              </div>

              {/* 3D Trust Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {trustMetrics.map((metric, i) => (
                  <motion.div
                    key={i}
                    className="relative group"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
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
                    <div className="relative p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-400/20 group-hover:border-blue-400/40 transition-all duration-500">
                      <div className="text-3xl font-bold text-blue-100 mb-1">{metric.value}</div>
                      <div className="text-sm text-gray-400">{metric.label}</div>
                      
                      {/* 3D Glow Effect */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-xl opacity-0 group-hover:opacity-100"
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
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Premium 3D Core Features Section */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/5 to-black" />
          
          <div className="relative max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl font-bold text-blue-100 mb-6">
                Core Platform Capabilities
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Integrated intelligence systems for comprehensive health economics management
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
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
                  <div className="relative p-8 rounded-2xl bg-gradient-to-br from-zinc-900/80 to-black/80 border border-blue-400/20 group-hover:border-blue-400/40 transition-all duration-500 overflow-hidden">
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

                    <h3 className="text-2xl font-bold text-blue-100 mb-4">
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

        {/* Premium 3D Benefits Section */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/5 to-black" />
          
          <div className="relative max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl font-bold text-purple-100 mb-6">
                Why Choose SiriusB iQ
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Proven results through algorithmic precision and cryptographic verification
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative"
                  whileHover={{
                    scale: 1.03,
                    z: 30,
                  }}
                  style={{
                    perspective: "1000px",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div className="relative flex items-center gap-4 p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-400/20 group-hover:border-purple-400/40 transition-all duration-500">
                    {/* 3D Check Icon */}
                    <motion.div
                      className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center"
                      whileHover={{
                        rotateY: 360,
                      }}
                      transition={{
                        duration: 0.6,
                      }}
                      style={{
                        transformStyle: "preserve-3d",
                      }}
                    >
                      <Check className="h-5 w-5 text-white" />
                    </motion.div>
                    
                    <span className="text-gray-300 font-medium">{benefit}</span>

                    {/* Glow Effect */}
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 blur-xl opacity-0 group-hover:opacity-100"
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

        {/* Premium 3D Solutions Grid */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-amber-950/5 to-black" />
          
          <div className="relative max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl font-bold text-amber-100 mb-6">
                Industry Solutions
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Specialized analytics for every aspect of health economics
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {solutions.map((solution, index) => (
                <motion.a
                  key={index}
                  href={solution.link}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative block"
                  whileHover={{
                    scale: 1.05,
                    rotateY: 5,
                    z: 50,
                  }}
                  style={{
                    perspective: "1200px",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div className="relative p-8 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-400/20 group-hover:border-amber-400/40 transition-all duration-500 h-full">
                    {/* 3D Rotating Icon */}
                    <motion.div
                      className="mb-6"
                      whileHover={{
                        rotateZ: 360,
                      }}
                      transition={{
                        duration: 0.6,
                      }}
                      style={{
                        transformStyle: "preserve-3d",
                      }}
                    >
                      <solution.icon className="h-12 w-12 text-amber-400" />
                    </motion.div>

                    <h3 className="text-xl font-bold text-amber-100 mb-2">
                      {solution.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">
                      {solution.description}
                    </p>

                    <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold">
                      <span>Learn More</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>

                    {/* Glow Effect */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 blur-xl opacity-0 group-hover:opacity-100"
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* Premium 3D CTA Section */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full blur-3xl"
                style={{
                  width: Math.random() * 600 + 300,
                  height: Math.random() * 600 + 300,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: `radial-gradient(circle, ${
                    ["rgba(59, 130, 246, 0.2)", "rgba(147, 51, 234, 0.2)", "rgba(16, 185, 129, 0.2)"][i % 3]
                  } 0%, transparent 70%)`,
                }}
                animate={{
                  x: [0, Math.random() * 80 - 40, 0],
                  y: [0, Math.random() * 80 - 40, 0],
                  scale: [1, 1.4, 1],
                }}
                transition={{
                  duration: Math.random() * 15 + 10,
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
              <div className="relative p-12 rounded-3xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-amber-500/20 border border-blue-400/30 group-hover:border-blue-400/50 transition-all duration-500">
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
                  <Target className="h-16 w-16 text-blue-400 mx-auto" />
                </motion.div>

                <h2 className="text-4xl font-bold text-blue-100 mb-6">
                  Ready to Transform Your Health Economics?
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Join leading organizations using algorithmic intelligence to optimize benefits and maximize savings
                </p>

                <div className="flex flex-wrap justify-center gap-6">
                  <motion.a
                    href="/request-demo"
                    className="group/button inline-flex items-center gap-3 px-10 py-5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-lg relative overflow-hidden"
                    whileHover={{ scale: 1.05, z: 30 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      perspective: "1000px",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                    <span className="relative z-10 flex items-center gap-2">
                      Schedule Demo
                      <Zap className="h-6 w-6 group-hover/button:scale-110 transition-transform" />
                    </span>
                  </motion.a>

                  <motion.a
                    href="/platform-overview"
                    className="inline-flex items-center gap-3 px-10 py-5 rounded-xl border-2 border-blue-400/30 hover:border-blue-400/60 text-white font-semibold text-lg transition-colors"
                    whileHover={{ scale: 1.05, z: 30 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Explore Platform
                    <ArrowRight className="h-6 w-6" />
                  </motion.a>
                </div>

                {/* Animated Background Glow */}
                <motion.div
                  className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/30 to-purple-500/30 blur-3xl"
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