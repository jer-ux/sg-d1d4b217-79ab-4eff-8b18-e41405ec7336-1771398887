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
  AlertTriangle,
  TrendingUp,
  Target,
  Activity
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart, ScatterChart, Scatter, ZAxis } from "recharts";

// Generate catastrophic claims data
const generateCatastrophicData = () => {
  const years = [2021, 2022, 2023, 2024, 2025, 2026, 2027];
  return years.map((year, idx) => {
    const isHistorical = year <= 2024;
    const base = 2500000 + (idx * 380000);
    const variance = isHistorical ? Math.random() * 200000 : 0;
    return {
      year,
      type: isHistorical ? "Historical" : "Projected",
      shockClaims: base + variance,
      p95: base * 1.15,
      p99: base * 1.45,
      expectedValue: base,
      claimCount: 4 + Math.floor(idx * 0.5) + (isHistorical ? Math.floor(Math.random() * 2) : 0),
    };
  });
};

const tailRiskData = [
  { percentile: "P50", value: 2800000, description: "Median Scenario" },
  { percentile: "P75", value: 3900000, description: "75th Percentile" },
  { percentile: "P90", value: 5200000, description: "90th Percentile" },
  { percentile: "P95", value: 6800000, description: "95th Percentile" },
  { percentile: "P99", value: 9500000, description: "99th Percentile" },
  { percentile: "P99.9", value: 14200000, description: "Extreme Tail" },
];

const historicalShocks = [
  { claim: "Premature Birth + NICU", cost: 3800000, year: 2023, duration: 180 },
  { claim: "Organ Transplant", cost: 2900000, year: 2022, duration: 90 },
  { claim: "Cancer + Complications", cost: 4200000, year: 2024, duration: 365 },
  { claim: "Trauma + Rehab", cost: 2400000, year: 2021, duration: 120 },
  { claim: "Rare Disease Treatment", cost: 5100000, year: 2023, duration: 270 },
];

const catastrophicData = generateCatastrophicData();

const engine = {
  slug: "catastrophic-claims-forecasting",
  number: 3,
  name: "Catastrophic Claims Forecasting Engine",
  description: "Tail risk modeling for extreme healthcare cost events",
  category: "Forecasting",
  overview: "Specialized tail risk forecasting engine for catastrophic healthcare events using extreme value theory, Pareto distribution modeling, and Monte Carlo simulation. Predicts frequency and severity of shock claims ($250K+) to inform stop-loss attachment point selection and reserve adequacy. Integrates clinical acuity scoring and population health risk factors.",
  capabilities: [
    "Pareto tail distribution modeling for shock claims",
    "Frequency-severity analysis using Poisson-GPD",
    "Stop-loss attachment optimization scenarios",
    "Large claim ($100K-$1M+) predictive scoring",
    "Aggregate excess modeling for multiple shocks",
    "Clinical pathway cost volatility assessment",
    "Value-at-Risk (VaR) and Conditional VaR (CVaR) metrics"
  ],
  inputs: [
    "Historical large claim data ($100K+ threshold)",
    "Member demographics and chronic conditions",
    "Clinical acuity and risk scores (HCC, CDPS)",
    "Specialty drug utilization patterns",
    "Transplant and oncology treatment prevalence",
    "NICU and trauma care capacity",
    "Stop-loss insurance contract terms"
  ],
  outputs: [
    "Catastrophic claim probability distributions",
    "Expected annual shock claim costs",
    "Percentile-based risk scenarios (P95, P99, P99.9)",
    "Stop-loss attachment recommendations",
    "Aggregate excess exposure estimates",
    "Reserve adequacy stress tests",
    "Reinsurance premium benchmarks"
  ],
  methodology: "Applies Peaks-Over-Threshold (POT) approach using Generalized Pareto Distribution (GPD) for tail modeling. Combines frequency analysis (Poisson for claim counts) with severity analysis (GPD for claim sizes exceeding threshold). Uses Block Maxima for annual maximum claim estimation. Integrates clinical risk scoring to condition tail parameters on population health status.",
  useCases: [
    "Stop-loss insurance attachment optimization",
    "Self-funded reserve adequacy testing",
    "Aggregate excess reinsurance pricing",
    "Multi-year shock claim budgeting",
    "Clinical pathway financial risk assessment",
    "Population health tail risk monitoring"
  ],
  technicalSpecs: {
    accuracy: "Within ±15% on P95 annual max estimates",
    processingTime: "8-15 minutes per simulation run",
    dataRequirements: "36+ months large claim history",
    updateFrequency: "Quarterly with monthly monitoring"
  }
};

export default function CatastrophicClaimsForecastingPage() {
  const formatCurrency = (value: number) => `$${(value/1000000).toFixed(1)}M`;

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
            className="absolute top-1/3 left-1/4 w-[700px] h-[700px] bg-gradient-radial from-orange-500/15 via-orange-500/5 to-transparent rounded-full blur-3xl"
            animate={{ 
              x: [0, 60, 0],
              y: [0, -40, 0],
              scale: [1, 1.15, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/3 w-[600px] h-[600px] bg-gradient-radial from-red-500/10 via-red-500/3 to-transparent rounded-full blur-3xl"
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
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-red-500/10 to-rose-500/10 blur-3xl -z-10 rounded-3xl" />
            
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="outline" className="bg-orange-500/10 border-orange-500/30 text-orange-300">
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
              className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 via-red-400 to-rose-400 bg-clip-text text-transparent"
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

          {/* Shock Claims Projection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Card className="bg-slate-900/50 border-slate-800 hover:border-orange-500/50 transition-all backdrop-blur-sm group relative overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                />
              </div>
              
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <AlertTriangle className="w-5 h-5 text-orange-400" />
                  Catastrophic Claims Projection with Confidence Bands
                </CardTitle>
                <p className="text-sm text-slate-400 mt-2">
                  Historical shock claims and forward projections with P95/P99 tail risk estimates
                </p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={catastrophicData}>
                    <defs>
                      <linearGradient id="shockGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
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
                      dataKey="p99"
                      stroke="#dc2626"
                      strokeWidth={1}
                      strokeDasharray="3 3"
                      fill="rgba(220, 38, 38, 0.05)"
                      name="P99 (Worst Case)"
                    />
                    <Area
                      type="monotone"
                      dataKey="p95"
                      stroke="#f97316"
                      strokeWidth={1}
                      strokeDasharray="3 3"
                      fill="rgba(249, 115, 22, 0.05)"
                      name="P95 (High Risk)"
                    />
                    <Area
                      type="monotone"
                      dataKey="shockClaims"
                      stroke="#f97316"
                      strokeWidth={3}
                      fill="url(#shockGradient)"
                      name="Expected Shock Claims"
                      data={catastrophicData.filter(d => d.type === "Historical")}
                    />
                    <Area
                      type="monotone"
                      dataKey="shockClaims"
                      stroke="#f97316"
                      strokeWidth={3}
                      strokeDasharray="5 5"
                      fill="url(#shockGradient)"
                      name="Projected Shock Claims"
                      data={catastrophicData.filter(d => d.type === "Projected")}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tail Risk Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <Card className="bg-slate-900/50 border-slate-800 hover:border-red-500/50 transition-all backdrop-blur-sm group relative overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                />
              </div>
              
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Target className="w-5 h-5 text-red-400" />
                  Tail Risk Distribution - Annual Maximum Claims
                </CardTitle>
                <p className="text-sm text-slate-400 mt-2">
                  Percentile-based estimates for worst-case shock claim scenarios
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  {tailRiskData.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + idx * 0.05 }}
                      className="bg-slate-800/50 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="text-lg font-bold text-orange-400">{item.percentile}</div>
                          <div className="text-sm text-slate-400">{item.description}</div>
                        </div>
                        <div className="text-xl font-bold text-white">{formatCurrency(item.value)}</div>
                      </div>
                      <div className="mt-2 w-full bg-slate-700 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full transition-all duration-1000"
                          style={{ 
                            width: `${(item.value / tailRiskData[tailRiskData.length - 1].value) * 100}%`,
                            backgroundColor: idx < 2 ? '#10b981' : idx < 4 ? '#f59e0b' : '#dc2626'
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Historical Shock Claims Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8"
          >
            <Card className="bg-slate-900/50 border-slate-800 hover:border-rose-500/50 transition-all backdrop-blur-sm group relative overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                />
              </div>
              
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Activity className="w-5 h-5 text-rose-400" />
                  Historical Shock Claims Pattern Analysis
                </CardTitle>
                <p className="text-sm text-slate-400 mt-2">
                  Major catastrophic claims from recent years with cost and duration
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {historicalShocks.map((shock, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + idx * 0.1 }}
                      className="bg-slate-800/50 rounded-lg p-4 hover:bg-slate-800/70 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <div className="font-medium text-white">{shock.claim}</div>
                          <div className="text-xs text-slate-400">
                            Year: {shock.year} • Duration: {shock.duration} days
                          </div>
                        </div>
                        <div className="text-lg font-bold text-red-400">{formatCurrency(shock.cost)}</div>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-1000"
                          style={{ width: `${(shock.cost / 5100000) * 100}%` }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
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
            <Card className="mb-8 bg-slate-900/50 border-slate-800 hover:border-orange-500/50 transition-all backdrop-blur-sm group relative overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                />
              </div>
              
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Brain className="w-5 h-5 text-orange-400" />
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
            <Card className="mb-8 bg-slate-900/50 border-slate-800 hover:border-orange-500/50 transition-all backdrop-blur-sm group relative overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                />
              </div>
              
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Settings className="w-5 h-5 text-red-400" />
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
                      <CheckCircle2 className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
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
              <Card className="h-full bg-slate-900/50 border-slate-800 hover:border-orange-500/50 transition-all backdrop-blur-sm group relative overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                  />
                </div>
                
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Database className="w-5 h-5 text-orange-400" />
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
                        <span className="text-orange-400">•</span>
                        {input}
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ y: -5 }}>
              <Card className="h-full bg-slate-900/50 border-slate-800 hover:border-red-500/50 transition-all backdrop-blur-sm group relative overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                  />
                </div>
                
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <BarChart3 className="w-5 h-5 text-red-400" />
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
                        <span className="text-red-400">•</span>
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
            <Card className="bg-gradient-to-br from-orange-500/20 via-red-500/20 to-rose-500/20 border-orange-500/30 backdrop-blur-sm relative overflow-hidden group">
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: "linear-gradient(45deg, rgba(249, 115, 22, 0.1), rgba(220, 38, 38, 0.1))"
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
                    <Button size="lg" className="gap-2 bg-orange-600 hover:bg-orange-700">
                      <Play className="w-4 h-4" />
                      Schedule a Demo
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button size="lg" variant="outline" className="gap-2 border-slate-600 hover:border-orange-500/50">
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