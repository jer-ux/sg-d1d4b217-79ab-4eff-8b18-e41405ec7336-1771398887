/**
 * KINCAID HEALTH™
 * Intelligence Hub — Central Access Point for All Tools
 */

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Shield,
  Code,
  Upload,
  Database,
  Brain,
  LineChart,
  FileText,
  Activity,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  Zap,
  Globe,
} from "lucide-react";
import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { ProtectedToolsRoute } from "@/components/ProtectedToolsRoute";
import { motion } from "framer-motion";
import { useState } from "react";

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const tools = [
  {
    name: "Evidence Spine",
    description: "Universal activity tracking and audit logs with advanced filtering by date, impact, confidence, and risk level",
    href: "/evidence-spine",
    icon: Shield,
    color: "blue",
    features: ["Search & Filter", "Audit Logs", "Provenance Chain", "Export Data"],
    status: "operational",
    metric: "99.9%",
    metricLabel: "Uptime",
  },
  {
    name: "API Documentation",
    description: "Interactive documentation for all FastAPI endpoints with live examples and health monitoring",
    href: "/api-documentation",
    icon: Code,
    color: "purple",
    features: ["Endpoint Catalog", "Request Examples", "Response Schemas", "Health Status"],
    status: "operational",
    metric: "47",
    metricLabel: "Endpoints",
  },
  {
    name: "File Upload Zone",
    description: "Drag-and-drop data ingestion with quality validation and real-time processing status",
    href: "/databank-manager",
    icon: Upload,
    color: "green",
    features: ["CSV/Excel Upload", "Quality Scoring", "Progress Tracking", "Multi-file Support"],
    status: "operational",
    metric: "2.4s",
    metricLabel: "Avg Process",
  },
  {
    name: "Executive War Room",
    description: "Real-time intelligence feed for C-suite with KPI tracking and strategic decision support",
    href: "/executive-war-room",
    icon: Activity,
    color: "red",
    features: ["Live KPI Feed", "Event Stream", "Strategic Analytics", "Board Reporting"],
    status: "operational",
    metric: "Live",
    metricLabel: "Status",
  },
  {
    name: "Verified Savings Ledger",
    description: "Complete financial audit trail with evidence-backed savings validation and reconciliation",
    href: "/verified-savings-ledger",
    icon: Database,
    color: "yellow",
    features: ["Receipt Tracking", "Evidence Chain", "Reconciliation", "Snowflake Export"],
    status: "operational",
    metric: "$4.2M",
    metricLabel: "Tracked",
  },
  {
    name: "Contract Intelligence",
    description: "AI-powered contract analysis with clause extraction and risk assessment",
    href: "/contract-intelligence",
    icon: FileText,
    color: "orange",
    features: ["Clause Extraction", "Risk Scoring", "Benchmark Analysis", "Copilot Chat"],
    status: "operational",
    metric: "94%",
    metricLabel: "Accuracy",
  },
  {
    name: "Actuarial Analytics",
    description: "Monte Carlo simulations, trend analysis, and predictive modeling for risk assessment",
    href: "/solutions/actuarial-benefits",
    icon: TrendingUp,
    color: "cyan",
    features: ["Monte Carlo", "Trend Projection", "Risk Modeling", "Scenario Analysis"],
    status: "operational",
    metric: "10K",
    metricLabel: "Simulations",
  },
  {
    name: "AI Agent Orchestra",
    description: "Multi-agent system with 9 specialized analysts for consensus-driven intelligence",
    href: "/agentic-workflow",
    icon: Brain,
    color: "pink",
    features: ["9 Specialist Agents", "Debate Protocol", "Consensus Building", "Evidence Synthesis"],
    status: "operational",
    metric: "9",
    metricLabel: "Active Agents",
  },
];

const backendEndpoints = [
  { method: "POST", path: "/upload/", description: "Upload CSV/Excel files", color: "emerald" },
  { method: "GET", path: "/upload/datasets", description: "List all datasets", color: "blue" },
  { method: "POST", path: "/analytics/summary", description: "Summary statistics", color: "emerald" },
  { method: "POST", path: "/analytics/trend", description: "Trend analysis", color: "emerald" },
  { method: "POST", path: "/api/v1/agents/orchestrate", description: "Multi-agent orchestration", color: "emerald" },
  { method: "POST", path: "/api/v1/evidence", description: "Create evidence object", color: "emerald" },
  { method: "GET", path: "/api/v1/evidence", description: "List evidence objects", color: "blue" },
  { method: "GET", path: "/api/v1/audit", description: "Query audit logs", color: "blue" },
];

const colorMap = {
  blue: {
    gradient: "from-blue-950 via-slate-900 to-blue-900",
    border: "border-blue-500/50 hover:border-blue-400",
    glow: "hover:shadow-blue-500/40",
    icon: "text-blue-300",
    bg: "bg-blue-500/20",
    text: "text-blue-100",
    accent: "text-blue-300",
    chart: "#3b82f6",
  },
  purple: {
    gradient: "from-purple-950 via-slate-900 to-purple-900",
    border: "border-purple-500/50 hover:border-purple-400",
    glow: "hover:shadow-purple-500/40",
    icon: "text-purple-300",
    bg: "bg-purple-500/20",
    text: "text-purple-100",
    accent: "text-purple-300",
    chart: "#a855f7",
  },
  green: {
    gradient: "from-green-950 via-slate-900 to-green-900",
    border: "border-green-500/50 hover:border-green-400",
    glow: "hover:shadow-green-500/40",
    icon: "text-green-300",
    bg: "bg-green-500/20",
    text: "text-green-100",
    accent: "text-green-300",
    chart: "#22c55e",
  },
  red: {
    gradient: "from-red-950 via-slate-900 to-red-900",
    border: "border-red-500/50 hover:border-red-400",
    glow: "hover:shadow-red-500/40",
    icon: "text-red-300",
    bg: "bg-red-500/20",
    text: "text-red-100",
    accent: "text-red-300",
    chart: "#ef4444",
  },
  yellow: {
    gradient: "from-yellow-950 via-slate-900 to-yellow-900",
    border: "border-yellow-500/50 hover:border-yellow-400",
    glow: "hover:shadow-yellow-500/40",
    icon: "text-yellow-300",
    bg: "bg-yellow-500/20",
    text: "text-yellow-100",
    accent: "text-yellow-300",
    chart: "#eab308",
  },
  orange: {
    gradient: "from-orange-950 via-slate-900 to-orange-900",
    border: "border-orange-500/50 hover:border-orange-400",
    glow: "hover:shadow-orange-500/40",
    icon: "text-orange-300",
    bg: "bg-orange-500/20",
    text: "text-orange-100",
    accent: "text-orange-300",
    chart: "#f97316",
  },
  cyan: {
    gradient: "from-cyan-950 via-slate-900 to-cyan-900",
    border: "border-cyan-500/50 hover:border-cyan-400",
    glow: "hover:shadow-cyan-500/40",
    icon: "text-cyan-300",
    bg: "bg-cyan-500/20",
    text: "text-cyan-100",
    accent: "text-cyan-300",
    chart: "#06b6d4",
  },
  pink: {
    gradient: "from-pink-950 via-slate-900 to-pink-900",
    border: "border-pink-500/50 hover:border-pink-400",
    glow: "hover:shadow-pink-500/40",
    icon: "text-pink-300",
    bg: "bg-pink-500/20",
    text: "text-pink-100",
    accent: "text-pink-300",
    chart: "#ec4899",
  },
};

export default function IntelligenceHub() {
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);

  return (
    <ProtectedToolsRoute>
      <SEO
        title="Intelligence Hub - Kincaid Health"
        description="Central access to all intelligence tools and AI agents"
      />
      <div className="min-h-screen bg-slate-950">
        <Nav />
        
        {/* Hero Section with Animated Background */}
        <section className="relative py-20 overflow-hidden border-b border-slate-800">
          {/* Animated particle grid */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0">
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-blue-500 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    opacity: [0.2, 0.8, 0.2],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Gradient orbs */}
          <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />

          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-6"
            >
              <motion.div
                className="inline-flex items-center gap-3 mb-4"
                animate={{ 
                  scale: [1, 1.05, 1],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                <Sparkles className="w-12 h-12 text-blue-400" />
                <Globe className="w-12 h-12 text-purple-400" />
                <Zap className="w-12 h-12 text-cyan-400" />
              </motion.div>

              <h1 className="text-6xl md:text-7xl font-serif font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Intelligence Hub
              </h1>

              <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
                Central command center for Kincaid Health™ intelligence platform. 
                Complete end-to-end workflow from data ingestion to executive insights.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/50 rounded-full px-6 py-3 backdrop-blur-sm"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span className="text-green-300 font-semibold">All Systems Operational</span>
                </motion.div>

                <Badge variant="outline" className="text-base px-6 py-3 border-blue-500/50 text-blue-300">
                  8 Intelligence Tools
                </Badge>

                <Badge variant="outline" className="text-base px-6 py-3 border-purple-500/50 text-purple-300">
                  9 AI Agents Active
                </Badge>

                <Badge variant="outline" className="text-base px-6 py-3 border-cyan-500/50 text-cyan-300">
                  47 API Endpoints
                </Badge>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="py-16 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12 space-y-4"
            >
              <span className="text-xs font-mono text-blue-400 uppercase tracking-widest">Platform Tools</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold">Intelligence Arsenal</h2>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                Eight specialized tools orchestrating the complete fiduciary intelligence pipeline
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {tools.map((tool) => {
                const Icon = tool.icon;
                const colors = colorMap[tool.color as keyof typeof colorMap];
                
                return (
                  <motion.div
                    key={tool.name}
                    variants={fadeInUpVariants}
                    whileHover={{ y: -8, scale: 1.03 }}
                    onHoverStart={() => setHoveredTool(tool.name)}
                    onHoverEnd={() => setHoveredTool(null)}
                    className={`group relative rounded-2xl border-2 bg-gradient-to-br ${colors.gradient} ${colors.border} ${colors.glow} p-6 hover:shadow-2xl cursor-pointer transition-all duration-500 overflow-hidden`}
                  >
                    <Link href={tool.href} className="absolute inset-0 z-20" />

                    {/* Animated background pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <svg className="w-full h-full" viewBox="0 0 200 200" preserveAspectRatio="none">
                        <motion.circle
                          cx="100"
                          cy="100"
                          r="80"
                          fill="none"
                          stroke={colors.chart}
                          strokeWidth="2"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={hoveredTool === tool.name ? { pathLength: 1, opacity: 0.3 } : { pathLength: 0, opacity: 0 }}
                          transition={{ duration: 0.8 }}
                        />
                        <motion.circle
                          cx="100"
                          cy="100"
                          r="60"
                          fill="none"
                          stroke={colors.chart}
                          strokeWidth="2"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={hoveredTool === tool.name ? { pathLength: 1, opacity: 0.2 } : { pathLength: 0, opacity: 0 }}
                          transition={{ duration: 0.8, delay: 0.1 }}
                        />
                      </svg>
                    </div>

                    {/* Status indicator */}
                    <motion.div
                      className="absolute top-6 right-6 flex items-center gap-2"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <div className="w-2 h-2 bg-green-400 rounded-full shadow-lg shadow-green-500/50" />
                    </motion.div>

                    <div className={`mb-4 inline-flex rounded-xl ${colors.bg} p-3 relative z-10 backdrop-blur-sm border ${colors.border.split(' ')[0].replace('hover:', '')}/30`}>
                      <Icon className={`h-6 w-6 ${colors.icon}`} />
                    </div>

                    <h3 className={`mb-3 text-lg font-serif font-bold ${colors.text} relative z-10`}>
                      {tool.name}
                    </h3>

                    <p className={`text-sm ${colors.text}/80 leading-relaxed relative z-10 mb-4 min-h-[4rem]`}>
                      {tool.description}
                    </p>

                    {/* Metric display */}
                    <div className="mb-4 relative z-10">
                      <div className={`text-3xl font-bold ${colors.accent}`}>{tool.metric}</div>
                      <div className={`text-xs ${colors.accent}/70 uppercase tracking-wide`}>{tool.metricLabel}</div>
                    </div>

                    {/* Features tags */}
                    <div className="flex flex-wrap gap-2 mb-4 relative z-10">
                      {tool.features.slice(0, 2).map((feature) => (
                        <Badge key={feature} variant="secondary" className={`text-xs ${colors.bg} ${colors.text} border-0`}>
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    <div className={`flex items-center gap-2 text-xs font-semibold ${colors.accent} group-hover:${colors.text} relative z-10`}>
                      Launch tool <ChevronRight className="h-3.5 w-3.5" />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Workflow Animation */}
        <section className="py-16 border-t border-slate-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent" />
          
          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12 space-y-4"
            >
              <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">End-to-End Pipeline</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold">Intelligence Workflow</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              {/* Connection lines */}
              <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500 via-blue-500 via-purple-500 to-red-500 opacity-30" />

              {[
                { icon: Upload, color: "green", title: "Data Ingestion", desc: "CSV/Excel upload with validation", step: "01" },
                { icon: Brain, color: "blue", title: "AI Analysis", desc: "9 specialist agents process", step: "02" },
                { icon: Shield, color: "purple", title: "Evidence Chain", desc: "Complete audit provenance", step: "03" },
                { icon: Activity, color: "red", title: "Executive Action", desc: "Real-time war room dashboard", step: "04" },
              ].map((stage, idx) => {
                const Icon = stage.icon;
                const colors = colorMap[stage.color as keyof typeof colorMap];

                return (
                  <motion.div
                    key={stage.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.2 }}
                    whileHover={{ y: -8 }}
                    className="relative"
                  >
                    <div className={`bg-gradient-to-br ${colors.gradient} border-2 ${colors.border} rounded-2xl p-6 ${colors.glow} hover:shadow-2xl transition-all duration-500`}>
                      {/* Step number */}
                      <div className={`absolute -top-4 -left-4 w-12 h-12 rounded-full ${colors.bg} border-2 ${colors.border.split(' ')[0].replace('hover:', '')} flex items-center justify-center backdrop-blur-sm`}>
                        <span className={`font-bold ${colors.accent}`}>{stage.step}</span>
                      </div>

                      {/* Icon with pulse */}
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                        className={`${colors.bg} p-4 rounded-xl inline-flex mb-4`}
                      >
                        <Icon className={`w-8 h-8 ${colors.icon}`} />
                      </motion.div>

                      <h3 className={`font-bold text-lg mb-2 ${colors.text}`}>{stage.title}</h3>
                      <p className={`text-sm ${colors.text}/80`}>{stage.desc}</p>

                      {/* Animated progress bar */}
                      <div className="mt-4 h-1 bg-slate-800/50 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${colors.chart === '#22c55e' ? 'from-green-600 to-green-400' : colors.chart === '#3b82f6' ? 'from-blue-600 to-blue-400' : colors.chart === '#a855f7' ? 'from-purple-600 to-purple-400' : 'from-red-600 to-red-400'}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: "100%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, delay: idx * 0.2 + 0.5 }}
                        />
                      </div>
                    </div>

                    {/* Arrow connector */}
                    {idx < 3 && (
                      <motion.div
                        className="hidden md:block absolute top-1/2 -right-4 text-slate-600"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.2 + 0.3 }}
                      >
                        <ChevronRight className="w-8 h-8" />
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* API Endpoints Section */}
        <section className="py-16 border-t border-slate-800 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgb(59, 130, 246) 2px, rgb(59, 130, 246) 4px)' }} />
          </div>

          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12 space-y-4"
            >
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">FastAPI Backend</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold">API Endpoints</h2>
              <code className="text-lg text-slate-400 bg-slate-900 px-4 py-2 rounded-lg inline-block">
                http://localhost:8000
              </code>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {backendEndpoints.map((endpoint, idx) => (
                <motion.div
                  key={`${endpoint.method}-${endpoint.path}`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ x: 8, scale: 1.02 }}
                  className="bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 rounded-xl p-4 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20"
                >
                  <div className="flex items-start gap-4">
                    <Badge 
                      variant={endpoint.method === "GET" ? "default" : "secondary"}
                      className={`font-mono ${endpoint.method === "GET" ? "bg-blue-500/20 text-blue-300 border-blue-500/50" : "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"} shrink-0`}
                    >
                      {endpoint.method}
                    </Badge>
                    
                    <div className="flex-1 min-w-0">
                      <code className="text-sm font-mono text-slate-200 block mb-1">
                        {endpoint.path}
                      </code>
                      <p className="text-xs text-slate-400">{endpoint.description}</p>
                    </div>

                    <motion.div
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity, delay: idx * 0.1 }}
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8 flex flex-wrap gap-4 justify-center"
            >
              <a href="http://localhost:8000/docs" target="_blank" rel="noopener noreferrer">
                <Button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400">
                  <Code className="w-4 h-4 mr-2" />
                  Interactive API Docs
                </Button>
              </a>
              <Link href="/api-documentation">
                <Button variant="outline" className="border-slate-600 hover:border-blue-500">
                  <FileText className="w-4 h-4 mr-2" />
                  Full Documentation
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </ProtectedToolsRoute>
  );
}