"use client";

import { SEO } from "@/components/SEO";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import {
  Cpu,
  Shield,
  TrendingUp,
  Zap,
  Database,
  Lock,
  BarChart3,
  Users,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Brain,
  Target,
  Layers,
} from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

const platformFeatures = [
  {
    icon: Brain,
    title: "AI-Powered Analytics",
    description: "Advanced machine learning models that analyze millions of data points in real-time",
    gradient: "from-blue-500/20 via-cyan-500/20 to-blue-600/20",
    color: "blue",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-grade encryption and compliance with SOC 2, HIPAA, and ERISA standards",
    gradient: "from-purple-500/20 via-violet-500/20 to-purple-600/20",
    color: "purple",
  },
  {
    icon: Zap,
    title: "Real-Time Processing",
    description: "Process and analyze data streams with sub-second latency for instant insights",
    gradient: "from-amber-500/20 via-yellow-500/20 to-amber-600/20",
    color: "amber",
  },
  {
    icon: Database,
    title: "Unified Data Layer",
    description: "Integrate all your data sources into a single, coherent intelligence platform",
    gradient: "from-green-500/20 via-emerald-500/20 to-green-600/20",
    color: "green",
  },
];

const integrationPartners = [
  { name: "Snowflake", category: "Data Warehouse" },
  { name: "Databricks", category: "Analytics" },
  { name: "ServiceNow", category: "Workflow" },
  { name: "Salesforce", category: "CRM" },
  { name: "SAP", category: "ERP" },
  { name: "Oracle", category: "Database" },
];

const capabilities = [
  {
    icon: Target,
    title: "Predictive Intelligence",
    description: "Forecast trends and identify opportunities before they emerge",
    items: [
      "Machine learning forecasting",
      "Anomaly detection",
      "Risk scoring",
      "Trend analysis",
    ],
  },
  {
    icon: Layers,
    title: "Data Integration",
    description: "Connect and harmonize data from any source",
    items: [
      "API connectors",
      "ETL pipelines",
      "Real-time sync",
      "Data validation",
    ],
  },
  {
    icon: BarChart3,
    title: "Advanced Reporting",
    description: "Custom dashboards and automated reporting",
    items: [
      "Interactive visualizations",
      "Scheduled reports",
      "Export capabilities",
      "White-label options",
    ],
  },
  {
    icon: Users,
    title: "Collaboration Tools",
    description: "Enable team-wide visibility and coordination",
    items: [
      "Shared workspaces",
      "Role-based access",
      "Audit trails",
      "Team notifications",
    ],
  },
];

export default function PlatformOverviewPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [selectedCapability, setSelectedCapability] = useState<typeof capabilities[0] | null>(null);

  return (
    <>
      <SEO
        title="Platform Overview | SiriusB iQ"
        description="Discover the AI-powered platform transforming health economics and benefits intelligence with real-time analytics and enterprise security."
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
                background: "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
              }}
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black" />
            
            {/* Floating Orbs */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full blur-3xl"
                style={{
                  width: Math.random() * 300 + 200,
                  height: Math.random() * 300 + 200,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: `radial-gradient(circle, ${
                    ["rgba(59, 130, 246, 0.3)", "rgba(147, 51, 234, 0.3)", "rgba(34, 211, 238, 0.3)"][i % 3]
                  } 0%, transparent 70%)`,
                }}
                animate={{
                  x: [0, Math.random() * 100 - 50, 0],
                  y: [0, Math.random() * 100 - 50, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
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
                  linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: "50px 50px",
                perspective: "1000px",
                transformStyle: "preserve-3d",
              }}
              animate={{
                rotateX: [0, 5, 0],
                rotateY: [0, 5, 0],
              }}
              transition={{
                duration: 20,
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
              initial={{ opacity: 0, scale: 0.8, rotateX: -20 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{
                perspective: "1000px",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Rotating Badge */}
              <motion.div
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 mb-8"
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
                <Sparkles className="h-5 w-5 text-blue-400" />
                <span className="text-blue-300 font-semibold">Next-Generation Intelligence Platform</span>
                <Cpu className="h-5 w-5 text-purple-400" />
              </motion.div>

              <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
                Platform Overview
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12">
                The AI-powered intelligence platform transforming health economics and benefits management
                through real-time analytics, enterprise security, and seamless integration
              </p>

              {/* 3D CTA Buttons */}
              <div className="flex flex-wrap justify-center gap-6">
                <motion.a
                  href="/request-demo"
                  className="group relative px-8 py-4 rounded-xl font-semibold text-lg overflow-hidden"
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
                    Request Demo
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.a>

                <motion.a
                  href="/contact"
                  className="group relative px-8 py-4 rounded-xl font-semibold text-lg border-2 border-blue-400/30 hover:border-blue-400/60 transition-colors"
                  whileHover={{ scale: 1.05, z: 50 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    perspective: "1000px",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <span className="flex items-center gap-2">
                    Contact Sales
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
                { label: "Data Points", value: "10B+", icon: Database },
                { label: "Processing Speed", value: "<1s", icon: Zap },
                { label: "Uptime", value: "99.9%", icon: Shield },
                { label: "Integrations", value: "50+", icon: Layers },
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
                  <div className="relative p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-400/20 group-hover:border-blue-400/40 transition-all duration-500">
                    <stat.icon className="h-8 w-8 text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
                    <div className="text-3xl font-bold text-blue-100 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                    
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
            </motion.div>
          </motion.div>
        </section>

        {/* Premium 3D Platform Features */}
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
                Core Platform Features
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Enterprise-grade capabilities designed for scale, security, and performance
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {platformFeatures.map((feature, index) => (
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

        {/* 3D Capabilities Grid */}
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
                Advanced Capabilities
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Comprehensive toolset for data-driven decision making
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {capabilities.map((capability, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative cursor-pointer"
                  onClick={() => setSelectedCapability(capability)}
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
                  <div className="relative p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-400/20 group-hover:border-purple-400/40 transition-all duration-500">
                    {/* 3D Icon */}
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
                      <capability.icon className="h-12 w-12 text-purple-400" />
                    </motion.div>

                    <h3 className="text-2xl font-bold text-purple-100 mb-3">
                      {capability.title}
                    </h3>
                    <p className="text-gray-400 mb-6">
                      {capability.description}
                    </p>

                    <div className="space-y-2">
                      {capability.items.map((item, i) => (
                        <motion.div
                          key={i}
                          className="flex items-center gap-2 text-gray-300"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <CheckCircle2 className="h-5 w-5 text-purple-400 flex-shrink-0" />
                          <span>{item}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Glow Effect */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 blur-2xl opacity-0 group-hover:opacity-100"
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

        {/* 3D Integration Partners */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-cyan-950/5 to-black" />
          
          <div className="relative max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl font-bold text-cyan-100 mb-6">
                Enterprise Integrations
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Seamlessly connect with your existing technology stack
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {integrationPartners.map((partner, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="group relative"
                  whileHover={{
                    scale: 1.05,
                    rotateY: 5,
                    z: 30,
                  }}
                  style={{
                    perspective: "1000px",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div className="relative p-8 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 group-hover:border-cyan-400/40 transition-all duration-500 text-center">
                    <div className="text-2xl font-bold text-cyan-100 mb-2">
                      {partner.name}
                    </div>
                    <div className="text-sm text-gray-400">
                      {partner.category}
                    </div>

                    {/* Hover Glow */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-cyan-500/10 blur-xl opacity-0 group-hover:opacity-100"
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
          </div>
        </section>

        {/* 3D CTA Section */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full blur-3xl"
                style={{
                  width: Math.random() * 400 + 200,
                  height: Math.random() * 400 + 200,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: `radial-gradient(circle, ${
                    ["rgba(59, 130, 246, 0.2)", "rgba(147, 51, 234, 0.2)"][i % 2]
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
              <div className="relative p-12 rounded-3xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-cyan-500/20 border border-blue-400/30 group-hover:border-blue-400/50 transition-all duration-500">
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
                  <Target className="h-16 w-16 text-blue-400 mx-auto" />
                </motion.div>

                <h2 className="text-4xl font-bold text-blue-100 mb-6">
                  Ready to Transform Your Operations?
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Join leading organizations leveraging AI-powered intelligence
                  to drive measurable business outcomes
                </p>

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
                    Schedule Your Demo
                    <ArrowRight className="h-6 w-6 group-hover/button:translate-x-2 transition-transform" />
                  </span>
                </motion.a>

                {/* Animated Background Glow */}
                <motion.div
                  className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/30 to-purple-500/30 blur-3xl"
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