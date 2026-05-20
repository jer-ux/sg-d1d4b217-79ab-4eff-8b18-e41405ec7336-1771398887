"use client";

import { SEO } from "@/components/SEO";
import { motion } from "framer-motion";
import { useState } from "react";
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
import Nav from "@/components/Nav";

const platformFeatures = [
  {
    icon: Brain,
    title: "AI-Powered Analytics",
    description: "Advanced machine learning models that analyze millions of data points in real-time",
    gradient: "from-blue-500 via-cyan-500 to-blue-600",
    color: "blue",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-grade encryption and compliance with SOC 2, HIPAA, and ERISA standards",
    gradient: "from-purple-500 via-violet-500 to-purple-600",
    color: "purple",
  },
  {
    icon: Zap,
    title: "Real-Time Processing",
    description: "Process and analyze data streams with sub-second latency for instant insights",
    gradient: "from-amber-500 via-yellow-500 to-amber-600",
    color: "amber",
  },
  {
    icon: Database,
    title: "Unified Data Layer",
    description: "Integrate all your data sources into a single, coherent intelligence platform",
    gradient: "from-green-500 via-emerald-500 to-green-600",
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

const stats = [
  { label: "Data Points", value: "10B+", icon: Database, gradient: "from-blue-500 to-cyan-500" },
  { label: "Processing Speed", value: "<1s", icon: Zap, gradient: "from-yellow-500 to-orange-500" },
  { label: "Uptime", value: "99.9%", icon: Shield, gradient: "from-green-500 to-emerald-500" },
  { label: "Integrations", value: "50+", icon: Layers, gradient: "from-purple-500 to-pink-500" },
];

export default function PlatformOverviewPage() {
  const [selectedCapability, setSelectedCapability] = useState<typeof capabilities[0] | null>(null);

  return (
    <>
      <SEO
        title="Platform Overview | SiriusB iQ"
        description="Discover the AI-powered platform transforming health economics and benefits intelligence with real-time analytics and enterprise security."
      />
      <SiteHeader />
      <Nav />

      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-gray-900/50 to-black" />
            
            {/* Floating Gradient Orbs */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full blur-3xl opacity-30"
                style={{
                  width: Math.random() * 400 + 200,
                  height: Math.random() * 400 + 200,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: `radial-gradient(circle, ${
                    ["rgba(59, 130, 246, 0.4)", "rgba(147, 51, 234, 0.4)", "rgba(34, 211, 238, 0.4)"][i % 3]
                  } 0%, transparent 70%)`,
                }}
                animate={{
                  x: [0, Math.random() * 100 - 50, 0],
                  y: [0, Math.random() * 100 - 50, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: Math.random() * 10 + 15,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Badge */}
              <motion.div
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 mb-8 backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
              >
                <Sparkles className="h-5 w-5 text-blue-400" />
                <span className="text-blue-300 font-semibold">Next-Generation Intelligence Platform</span>
                <Cpu className="h-5 w-5 text-purple-400" />
              </motion.div>

              <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Platform Overview
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12">
                The AI-powered intelligence platform transforming health economics and benefits management
                through real-time analytics, enterprise security, and seamless integration
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap justify-center gap-6">
                <motion.a
                  href="/request-demo"
                  className="group relative px-8 py-4 rounded-xl font-semibold text-lg overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Request Demo
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.a>

                <motion.a
                  href="/contact"
                  className="group px-8 py-4 rounded-xl font-semibold text-lg border-2 border-blue-400/30 hover:border-blue-400/60 hover:bg-blue-500/10 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flex items-center gap-2">
                    Contact Sales
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.a>
              </div>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  className="group relative"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative p-6 rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 group-hover:border-gray-600 transition-all duration-500">
                    {/* Gradient Border on Hover */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                    
                    <stat.icon className={`h-8 w-8 mb-3 bg-gradient-to-br ${stat.gradient} bg-clip-text text-transparent`} />
                    <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Platform Features */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-blue-950/10 to-black/50" />
          
          <div className="relative max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl font-bold text-white mb-6">
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
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="relative p-8 rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 group-hover:border-gray-600 transition-all duration-500 overflow-hidden h-full">
                    {/* Gradient Border on Hover */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                    
                    {/* Animated Gradient Background */}
                    <div className={`absolute top-0 right-0 w-64 h-64 rounded-full bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-500`} />

                    <feature.icon className={`relative h-12 w-12 mb-6 bg-gradient-to-br ${feature.gradient} bg-clip-text text-transparent`} />

                    <h3 className="relative text-2xl font-bold text-white mb-4">
                      {feature.title}
                    </h3>
                    <p className="relative text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Capabilities Grid */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-purple-950/10 to-black/50" />
          
          <div className="relative max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl font-bold text-white mb-6">
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
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative cursor-pointer"
                  onClick={() => setSelectedCapability(capability)}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="relative p-8 rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 group-hover:border-gray-600 transition-all duration-500 h-full">
                    {/* Gradient Border on Hover */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                    
                    {/* Animated Background Glow */}
                    <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-gradient-to-br from-purple-500/30 to-blue-500/30 opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-500" />

                    <capability.icon className="relative h-12 w-12 text-purple-400 mb-6" />

                    <h3 className="relative text-2xl font-bold text-white mb-3">
                      {capability.title}
                    </h3>
                    <p className="relative text-gray-400 mb-6">
                      {capability.description}
                    </p>

                    <div className="relative space-y-2">
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
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Integration Partners */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-cyan-950/10 to-black/50" />
          
          <div className="relative max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl font-bold text-white mb-6">
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
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="group relative"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="relative p-8 rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 group-hover:border-gray-600 transition-all duration-500 text-center">
                    {/* Gradient Border on Hover */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                    
                    <div className="relative text-2xl font-bold text-white mb-2">
                      {partner.name}
                    </div>
                    <div className="relative text-sm text-gray-400">
                      {partner.category}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full blur-3xl opacity-20"
                style={{
                  width: Math.random() * 400 + 200,
                  height: Math.random() * 400 + 200,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: `radial-gradient(circle, ${
                    ["rgba(59, 130, 246, 0.3)", "rgba(147, 51, 234, 0.3)"][i % 2]
                  } 0%, transparent 70%)`,
                }}
                animate={{
                  x: [0, Math.random() * 50 - 25, 0],
                  y: [0, Math.random() * 50 - 25, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: Math.random() * 8 + 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          <div className="relative max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="group relative"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative p-12 rounded-3xl bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 group-hover:border-gray-600 transition-all duration-500">
                {/* Gradient Border on Hover */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                
                {/* Animated Background Glow */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <Target className="relative h-16 w-16 text-blue-400 mx-auto mb-8" />

                <h2 className="relative text-4xl font-bold text-white mb-6">
                  Ready to Transform Your Operations?
                </h2>
                <p className="relative text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Join leading organizations leveraging AI-powered intelligence
                  to drive measurable business outcomes
                </p>

                <motion.a
                  href="/request-demo"
                  className="group/button relative inline-flex items-center gap-3 px-10 py-5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-lg transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Schedule Your Demo
                    <ArrowRight className="h-6 w-6 group-hover/button:translate-x-2 transition-transform" />
                  </span>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>

        <SiteFooter />
      </div>
    </>
  );
}