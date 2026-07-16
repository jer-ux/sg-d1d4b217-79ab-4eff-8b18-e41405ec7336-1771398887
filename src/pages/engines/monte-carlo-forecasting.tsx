import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ParticleField3D } from "@/components/premium/ParticleField3D";
import { 
  ArrowLeft, 
  Brain, 
  Database, 
  Settings,
  CheckCircle2,
  BarChart3,
  Play,
  TrendingUp,
  Activity
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from "recharts";

// Generate Bayesian simulation data
const generateBayesianData = (scenarios: number = 5) => {
  const years = [2024, 2025, 2026, 2027, 2028];
  const colors = [
    { stroke: "#10b981", fill: "rgba(16, 185, 129, 0.1)", name: "Scenario 1" },
    { stroke: "#3b82f6", fill: "rgba(59, 130, 246, 0.1)", name: "Scenario 2" },
    { stroke: "#8b5cf6", fill: "rgba(139, 92, 246, 0.1)", name: "Scenario 3" },
    { stroke: "#f59e0b", fill: "rgba(245, 158, 11, 0.1)", name: "Scenario 4" },
    { stroke: "#ef4444", fill: "rgba(239, 68, 68, 0.1)", name: "Scenario 5" },
    { stroke: "#06b6d4", fill: "rgba(6, 182, 212, 0.1)", name: "Scenario 6" },
    { stroke: "#ec4899", fill: "rgba(236, 72, 153, 0.1)", name: "Scenario 7" },
  ];

  return years.map((year, idx) => {
    const base = 1000000 + (idx * 120000);
    const dataPoint: any = { year };
    
    for (let i = 0; i < Math.min(scenarios, colors.length); i++) {
      const variance = Math.random() * 200000 - 100000;
      const trend = i * 50000;
      dataPoint[`scenario${i + 1}`] = base + variance + trend;
    }
    
    return dataPoint;
  });
};

const costData = generateBayesianData(7);
const utilizationData = generateBayesianData(5);
const riskData = generateBayesianData(6);

const engine = {
  slug: "monte-carlo-forecasting",
  number: 5,
  name: "Monte Carlo Forecasting Engine",
  description: "Probabilistic forecasting with uncertainty quantification",
  category: "Forecasting",
  overview: "Advanced Monte Carlo simulation engine that generates thousands of possible future scenarios to quantify uncertainty in healthcare cost projections. Uses Bayesian updating and stochastic modeling to provide probability distributions rather than point estimates.",
  capabilities: [
    "10,000+ scenario simulation runs",
    "Bayesian prior updating with new data",
    "Correlated variable modeling",
    "Tail risk quantification (95th, 99th percentiles)",
    "Confidence interval generation",
    "Sensitivity analysis across input parameters",
    "Value-at-Risk (VaR) calculations"
  ],
  inputs: [
    "Historical claims distributions",
    "Trend assumptions and ranges",
    "Utilization probability distributions",
    "Cost driver correlations",
    "External factor uncertainties",
    "Prior probability distributions"
  ],
  outputs: [
    "Probability density functions for costs",
    "Confidence intervals (80%, 90%, 95%)",
    "Expected value with standard deviation",
    "Tail risk metrics (VaR, CVaR)",
    "Scenario probability weightings",
    "Risk-adjusted forecasts"
  ],
  methodology: "Implements Latin Hypercube Sampling for efficient scenario generation. Uses Cholesky decomposition for correlated variable simulation. Applies Bayesian inference to update priors as new claims data emerges. Generates convergence diagnostics to ensure simulation stability.",
  useCases: [
    "Risk-based budgeting and planning",
    "Stop-loss attachment optimization",
    "Reserve adequacy testing",
    "Worst-case scenario planning",
    "Board risk reporting",
    "Capital allocation decisions"
  ],
  technicalSpecs: {
    accuracy: "Convergence within 0.1% after 10K runs",
    processingTime: "2-5 minutes per simulation",
    dataRequirements: "36+ months claims history",
    updateFrequency: "Quarterly with monthly refreshes"
  }
};

export default function MonteCarloForecastingPage() {
  const colors = [
    { stroke: "#10b981", name: "Scenario 1" },
    { stroke: "#3b82f6", name: "Scenario 2" },
    { stroke: "#8b5cf6", name: "Scenario 3" },
    { stroke: "#f59e0b", name: "Scenario 4" },
    { stroke: "#ef4444", name: "Scenario 5" },
    { stroke: "#06b6d4", name: "Scenario 6" },
    { stroke: "#ec4899", name: "Scenario 7" },
  ];

  return (
    <>
      <Head>
        <title>{engine.name} | Kincaid Health Data Sciences Lab</title>
        <meta name="description" content={engine.description} />
      </Head>
      <SEO
        title={`${engine.name} | Kincaid Health Data Sciences Lab`}
        description={engine.description}
      />

      <Nav />

      <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black relative overflow-hidden">
        <ParticleField3D />
        
        {/* Animated background orbs */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute top-1/3 left-1/4 w-[700px] h-[700px] bg-gradient-radial from-violet-500/15 via-violet-500/5 to-transparent rounded-full blur-3xl"
            animate={{ 
              x: [0, 60, 0],
              y: [0, -40, 0],
              scale: [1, 1.15, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/3 w-[600px] h-[600px] bg-gradient-radial from-blue-500/10 via-blue-500/3 to-transparent rounded-full blur-3xl"
            animate={{ 
              x: [0, -50, 0],
              y: [0, 30, 0],
              scale: [1, 1.2, 1],
              opacity: [0.25, 0.45, 0.25]
            }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          />
        </div>

        <main className="container mx-auto px-4 py-12 lg:py-16 max-w-5xl relative z-10">
          {/* Back Button */}
          <Link href="/engines">
            <Button variant="ghost" size="sm" className="mb-8 text-slate-400 hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Engines
            </Button>
          </Link>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-blue-500/10 blur-3xl -z-10 rounded-3xl" />
            
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="outline" className="bg-violet-500/10 border-violet-500/30 text-violet-300">
                {engine.category}
              </Badge>
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="text-sm text-slate-400 font-mono bg-slate-800/50 px-3 py-1 rounded-full"
              >
                #{engine.number}
              </motion.span>
            </div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400 bg-clip-text text-transparent"
            >
              {engine.name}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-slate-400"
            >
              {engine.description}
            </motion.p>
          </motion.div>

          {/* Bayesian Simulation Graphs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Card className="bg-slate-900/50 border-slate-800 hover:border-violet-500/50 transition-all backdrop-blur-sm group relative overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                />
              </div>
              
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <TrendingUp className="w-5 h-5 text-violet-400" />
                  Bayesian Cost Trajectories - 7 Scenarios
                </CardTitle>
                <p className="text-sm text-slate-400 mt-2">
                  Probabilistic cost forecasts with Bayesian updating across multiple scenarios
                </p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={costData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="year" stroke="#94a3b8" tick={{ fill: "#94a3b8" }} />
                    <YAxis stroke="#94a3b8" tick={{ fill: "#94a3b8" }} tickFormatter={(v) => `$${(v/1000000).toFixed(1)}M`} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px" }}
                      labelStyle={{ color: "#f1f5f9" }}
                      formatter={(value: number) => `$${(value/1000000).toFixed(2)}M`}
                    />
                    <Legend />
                    {colors.map((color, idx) => (
                      <Line
                        key={idx}
                        type="monotone"
                        dataKey={`scenario${idx + 1}`}
                        stroke={color.stroke}
                        strokeWidth={2}
                        name={color.name}
                        dot={{ fill: color.stroke, r: 3 }}
                        activeDot={{ r: 5 }}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Utilization Scenarios */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <Card className="bg-slate-900/50 border-slate-800 hover:border-blue-500/50 transition-all backdrop-blur-sm group relative overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                />
              </div>
              
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Activity className="w-5 h-5 text-blue-400" />
                  Utilization Monte Carlo Paths - 5 Scenarios
                </CardTitle>
                <p className="text-sm text-slate-400 mt-2">
                  Stochastic utilization projections with confidence bands
                </p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={utilizationData}>
                    <defs>
                      {colors.slice(0, 5).map((color, idx) => (
                        <linearGradient key={idx} id={`gradient${idx}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={color.stroke} stopOpacity={0.3}/>
                          <stop offset="95%" stopColor={color.stroke} stopOpacity={0}/>
                        </linearGradient>
                      ))}
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="year" stroke="#94a3b8" tick={{ fill: "#94a3b8" }} />
                    <YAxis stroke="#94a3b8" tick={{ fill: "#94a3b8" }} tickFormatter={(v) => `$${(v/1000000).toFixed(1)}M`} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px" }}
                      labelStyle={{ color: "#f1f5f9" }}
                      formatter={(value: number) => `$${(value/1000000).toFixed(2)}M`}
                    />
                    <Legend />
                    {colors.slice(0, 5).map((color, idx) => (
                      <Area
                        key={idx}
                        type="monotone"
                        dataKey={`scenario${idx + 1}`}
                        stroke={color.stroke}
                        strokeWidth={2}
                        fill={`url(#gradient${idx})`}
                        name={color.name}
                      />
                    ))}
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Risk Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8"
          >
            <Card className="bg-slate-900/50 border-slate-800 hover:border-cyan-500/50 transition-all backdrop-blur-sm group relative overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                />
              </div>
              
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <BarChart3 className="w-5 h-5 text-cyan-400" />
                  Risk-Adjusted Distributions - 6 Scenarios
                </CardTitle>
                <p className="text-sm text-slate-400 mt-2">
                  Tail risk modeling with Value-at-Risk calculations
                </p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={riskData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="year" stroke="#94a3b8" tick={{ fill: "#94a3b8" }} />
                    <YAxis stroke="#94a3b8" tick={{ fill: "#94a3b8" }} tickFormatter={(v) => `$${(v/1000000).toFixed(1)}M`} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px" }}
                      labelStyle={{ color: "#f1f5f9" }}
                      formatter={(value: number) => `$${(value/1000000).toFixed(2)}M`}
                    />
                    <Legend />
                    {colors.slice(0, 6).map((color, idx) => (
                      <Line
                        key={idx}
                        type="monotone"
                        dataKey={`scenario${idx + 1}`}
                        stroke={color.stroke}
                        strokeWidth={idx === 5 ? 3 : 2}
                        strokeDasharray={idx === 5 ? "5 5" : "0"}
                        name={color.name}
                        dot={{ fill: color.stroke, r: 3 }}
                        activeDot={{ r: 5 }}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -5 }}
          >
            <Card className="mb-8 bg-slate-900/50 border-slate-800 hover:border-violet-500/50 transition-all backdrop-blur-sm group relative overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                />
              </div>
              
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Brain className="w-5 h-5 text-violet-400" />
                  Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 leading-relaxed">
                  {engine.overview}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Key Capabilities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -5 }}
          >
            <Card className="mb-8 bg-slate-900/50 border-slate-800 hover:border-violet-500/50 transition-all backdrop-blur-sm group relative overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                />
              </div>
              
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Settings className="w-5 h-5 text-purple-400" />
                  Key Capabilities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {engine.capabilities.map((capability, index) => (
                    <motion.li 
                      key={index} 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                      className="flex items-start gap-3 group/item"
                    >
                      <CheckCircle2 className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                      <span className="text-slate-300">{capability}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Inputs & Outputs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid md:grid-cols-2 gap-8 mb-8"
          >
            <motion.div whileHover={{ y: -5 }}>
              <Card className="h-full bg-slate-900/50 border-slate-800 hover:border-blue-500/50 transition-all backdrop-blur-sm group relative overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                  />
                </div>
                
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Database className="w-5 h-5 text-blue-400" />
                    Required Inputs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {engine.inputs.map((input, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 + index * 0.05 }}
                        className="text-sm text-slate-300 flex items-start gap-2"
                      >
                        <span className="text-blue-400">•</span>
                        {input}
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ y: -5 }}>
              <Card className="h-full bg-slate-900/50 border-slate-800 hover:border-cyan-500/50 transition-all backdrop-blur-sm group relative overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                  />
                </div>
                
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <BarChart3 className="w-5 h-5 text-cyan-400" />
                    Generated Outputs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {engine.outputs.map((output, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 + index * 0.05 }}
                        className="text-sm text-slate-300 flex items-start gap-2"
                      >
                        <span className="text-cyan-400">•</span>
                        {output}
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card className="bg-gradient-to-br from-violet-500/20 via-purple-500/20 to-blue-500/20 border-violet-500/30 backdrop-blur-sm relative overflow-hidden group">
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: "linear-gradient(45deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1))"
                }}
              />
              
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                />
              </div>
              
              <CardContent className="p-8 text-center relative z-10">
                <motion.h3 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="text-2xl font-bold mb-2 text-white"
                >
                  Ready to Get Started?
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="text-slate-300 mb-6"
                >
                  Request access to this engine or schedule a demo to see it in action.
                </motion.p>
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <Link href="/request-demo">
                    <Button size="lg" className="gap-2 bg-violet-600 hover:bg-violet-700">
                      <Play className="w-4 h-4" />
                      Schedule a Demo
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button size="lg" variant="outline" className="gap-2 border-slate-600 hover:border-violet-500/50">
                      Request Access
                    </Button>
                  </Link>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </div>

      <Footer />
    </>
  );
}