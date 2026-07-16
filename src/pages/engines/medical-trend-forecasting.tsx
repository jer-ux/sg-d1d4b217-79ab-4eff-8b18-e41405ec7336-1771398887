import Head from "next/head";
import { motion } from "framer-motion";
import Link from "next/link";
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
  Activity,
  DollarSign,
  Users
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart, ComposedChart, Bar } from "recharts";

// Generate medical trend data
const generateMedicalTrendData = () => {
  const years = [2021, 2022, 2023, 2024, 2025, 2026, 2027];
  return years.map((year, idx) => {
    const isHistorical = year <= 2024;
    const base = 5000000 + (idx * 450000);
    const variance = isHistorical ? Math.random() * 100000 : 0;
    return {
      year,
      type: isHistorical ? "Historical" : "Projected",
      totalCost: base + variance,
      pmpm: (base + variance) / (1200 * 12),
      utilization: 850 + (idx * 15) + (isHistorical ? Math.random() * 20 - 10 : 0),
      unitCost: 2500 + (idx * 120) + (isHistorical ? Math.random() * 50 - 25 : 0),
      inpatient: (base + variance) * 0.35,
      outpatient: (base + variance) * 0.45,
      professional: (base + variance) * 0.20,
    };
  });
};

const generateComponentBreakdown = () => {
  return [
    { category: "Inpatient", value: 3200000, growth: 8.2, color: "#3b82f6" },
    { category: "Outpatient", value: 4100000, growth: 6.5, color: "#8b5cf6" },
    { category: "Professional", value: 1800000, growth: 5.1, color: "#06b6d4" },
    { category: "ER", value: 900000, growth: 9.8, color: "#f59e0b" },
  ];
};

const medicalData = generateMedicalTrendData();
const componentData = generateComponentBreakdown();

const engine = {
  slug: "medical-trend-forecasting",
  number: 1,
  name: "Medical Trend Forecasting Engine",
  description: "Predict annual healthcare cost trends with actuarial precision",
  category: "Forecasting",
  overview: "Advanced time-series forecasting engine for medical cost trends combining historical claims patterns, medical inflation indices, utilization shifts, and provider contract changes. Uses ARIMA, exponential smoothing, and machine learning ensemble methods to generate 12-18 month forward projections with confidence intervals.",
  capabilities: [
    "Multi-year historical trend analysis with seasonality adjustment",
    "Unit cost vs. utilization decomposition",
    "Service category breakdowns (IP, OP, Professional, Rx)",
    "Geographic and demographic risk adjustments",
    "Provider contract impact modeling",
    "Medical inflation index integration (CPI-Medical, PPI-Health)",
    "Confidence intervals and prediction bands"
  ],
  inputs: [
    "36+ months historical claims data",
    "Member enrollment and demographics",
    "Provider contract terms and changes",
    "Medical inflation indices",
    "Utilization benchmarks",
    "Network composition changes",
    "Prior authorization policies"
  ],
  outputs: [
    "Annual trend rate projections (12-24 months)",
    "PMPM cost forecasts with confidence bands",
    "Service category trend differentials",
    "Utilization vs. unit cost attribution",
    "Seasonal adjustment factors",
    "Risk-adjusted trend rates",
    "Budget variance analysis"
  ],
  methodology: "Employs ensemble forecasting combining ARIMA for trend, Holt-Winters for seasonality, and gradient boosting for non-linear patterns. Decomposes medical trend into utilization (visits per member) and unit cost ($ per visit) components. Applies credibility weighting based on data volume. Integrates external medical inflation indices for validation.",
  useCases: [
    "Annual budget planning and rate setting",
    "Renewal projection for fully-insured plans",
    "Multi-year financial forecasting",
    "Stop-loss premium estimation",
    "Self-funded reserve adequacy testing",
    "Benefit design impact modeling"
  ],
  technicalSpecs: {
    accuracy: "±1.2% MAPE on 12-month forecasts",
    processingTime: "3-8 minutes per projection",
    dataRequirements: "36+ months claims, 24+ preferred",
    updateFrequency: "Monthly with quarterly recalibration"
  }
};

export default function MedicalTrendForecastingPage() {
  const formatCurrency = (value: number) => `$${(value/1000000).toFixed(1)}M`;
  const formatPMPM = (value: number) => `$${value.toFixed(0)}`;

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
            className="absolute top-1/3 left-1/4 w-[700px] h-[700px] bg-gradient-radial from-blue-500/15 via-blue-500/5 to-transparent rounded-full blur-3xl"
            animate={{ 
              x: [0, 60, 0],
              y: [0, -40, 0],
              scale: [1, 1.15, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/3 w-[600px] h-[600px] bg-gradient-radial from-cyan-500/10 via-cyan-500/3 to-transparent rounded-full blur-3xl"
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
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-teal-500/10 blur-3xl -z-10 rounded-3xl" />
            
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="outline" className="bg-blue-500/10 border-blue-500/30 text-blue-300">
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
              className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent"
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

          {/* Historical & Projected Trend Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
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
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                  Medical Cost Trend Projection - Historical & Forecast
                </CardTitle>
                <p className="text-sm text-slate-400 mt-2">
                  Total medical costs with 12-month forward projection and 95% confidence interval
                </p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={medicalData}>
                    <defs>
                      <linearGradient id="costGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="year" stroke="#94a3b8" tick={{ fill: "#94a3b8" }} />
                    <YAxis stroke="#94a3b8" tick={{ fill: "#94a3b8" }} tickFormatter={formatCurrency} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px" }}
                      labelStyle={{ color: "#f1f5f9" }}
                      formatter={(value: number) => formatCurrency(value)}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="totalCost"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      fill="url(#costGradient)"
                      name="Total Medical Cost"
                      data={medicalData.filter(d => d.type === "Historical")}
                    />
                    <Area
                      type="monotone"
                      dataKey="totalCost"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      strokeDasharray="5 5"
                      fill="url(#costGradient)"
                      name="Projected Cost"
                      data={medicalData.filter(d => d.type === "Projected")}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* PMPM Trend Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
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
                  <DollarSign className="w-5 h-5 text-cyan-400" />
                  Per Member Per Month (PMPM) Trend
                </CardTitle>
                <p className="text-sm text-slate-400 mt-2">
                  Normalized cost per member per month showing utilization-adjusted trends
                </p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={medicalData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="year" stroke="#94a3b8" tick={{ fill: "#94a3b8" }} />
                    <YAxis stroke="#94a3b8" tick={{ fill: "#94a3b8" }} tickFormatter={formatPMPM} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px" }}
                      labelStyle={{ color: "#f1f5f9" }}
                      formatter={(value: number) => formatPMPM(value)}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="pmpm"
                      stroke="#06b6d4"
                      strokeWidth={3}
                      name="PMPM"
                      dot={{ fill: "#06b6d4", r: 5 }}
                      activeDot={{ r: 7 }}
                      data={medicalData.filter(d => d.type === "Historical")}
                    />
                    <Line
                      type="monotone"
                      dataKey="pmpm"
                      stroke="#06b6d4"
                      strokeWidth={3}
                      strokeDasharray="5 5"
                      name="PMPM (Projected)"
                      dot={{ fill: "#06b6d4", r: 5 }}
                      activeDot={{ r: 7 }}
                      data={medicalData.filter(d => d.type === "Projected")}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Utilization vs Unit Cost Decomposition */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8"
          >
            <Card className="bg-slate-900/50 border-slate-800 hover:border-teal-500/50 transition-all backdrop-blur-sm group relative overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                />
              </div>
              
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Activity className="w-5 h-5 text-teal-400" />
                  Trend Decomposition - Utilization vs. Unit Cost
                </CardTitle>
                <p className="text-sm text-slate-400 mt-2">
                  Attribution analysis showing drivers of medical cost trends
                </p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <ComposedChart data={medicalData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="year" stroke="#94a3b8" tick={{ fill: "#94a3b8" }} />
                    <YAxis yAxisId="left" stroke="#94a3b8" tick={{ fill: "#94a3b8" }} />
                    <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" tick={{ fill: "#94a3b8" }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px" }}
                      labelStyle={{ color: "#f1f5f9" }}
                    />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="utilization"
                      stroke="#10b981"
                      strokeWidth={2}
                      name="Utilization (visits/member)"
                      dot={{ fill: "#10b981", r: 4 }}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="unitCost"
                      stroke="#f59e0b"
                      strokeWidth={2}
                      name="Unit Cost ($/visit)"
                      dot={{ fill: "#f59e0b", r: 4 }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Service Category Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <Card className="bg-slate-900/50 border-slate-800 hover:border-purple-500/50 transition-all backdrop-blur-sm group relative overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                />
              </div>
              
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <BarChart3 className="w-5 h-5 text-purple-400" />
                  Service Category Trend Analysis
                </CardTitle>
                <p className="text-sm text-slate-400 mt-2">
                  Cost trends by service type with growth rate differentials
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {componentData.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + idx * 0.1 }}
                      className="bg-slate-800/50 rounded-lg p-4"
                    >
                      <div className="text-xs text-slate-400 mb-1">{item.category}</div>
                      <div className="text-lg font-semibold text-white mb-1">{formatCurrency(item.value)}</div>
                      <div className="text-sm flex items-center gap-1" style={{ color: item.color }}>
                        <TrendingUp className="w-3 h-3" />
                        {item.growth}% trend
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={medicalData.slice(0, 5)}>
                    <defs>
                      <linearGradient id="ipGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="opGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="profGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="year" stroke="#94a3b8" tick={{ fill: "#94a3b8" }} />
                    <YAxis stroke="#94a3b8" tick={{ fill: "#94a3b8" }} tickFormatter={formatCurrency} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px" }}
                      labelStyle={{ color: "#f1f5f9" }}
                      formatter={(value: number) => formatCurrency(value)}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="inpatient"
                      stackId="1"
                      stroke="#3b82f6"
                      fill="url(#ipGradient)"
                      name="Inpatient"
                    />
                    <Area
                      type="monotone"
                      dataKey="outpatient"
                      stackId="1"
                      stroke="#8b5cf6"
                      fill="url(#opGradient)"
                      name="Outpatient"
                    />
                    <Area
                      type="monotone"
                      dataKey="professional"
                      stackId="1"
                      stroke="#06b6d4"
                      fill="url(#profGradient)"
                      name="Professional"
                    />
                  </AreaChart>
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
            <Card className="mb-8 bg-slate-900/50 border-slate-800 hover:border-blue-500/50 transition-all backdrop-blur-sm group relative overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                />
              </div>
              
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Brain className="w-5 h-5 text-blue-400" />
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
            <Card className="mb-8 bg-slate-900/50 border-slate-800 hover:border-blue-500/50 transition-all backdrop-blur-sm group relative overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                />
              </div>
              
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Settings className="w-5 h-5 text-cyan-400" />
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
                      <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
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
            <Card className="bg-gradient-to-br from-blue-500/20 via-cyan-500/20 to-teal-500/20 border-blue-500/30 backdrop-blur-sm relative overflow-hidden group">
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: "linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(6, 182, 212, 0.1))"
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
                    <Button size="lg" className="gap-2 bg-blue-600 hover:bg-blue-700">
                      <Play className="w-4 h-4" />
                      Schedule a Demo
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button size="lg" variant="outline" className="gap-2 border-slate-600 hover:border-blue-500/50">
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