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
import { RxForecastChart } from "@/components/engines/RxForecastChart";
import { 
  ArrowLeft, 
  Brain, 
  Database, 
  Settings,
  CheckCircle2,
  BarChart3,
  Play,
  Pill,
  TrendingUp,
  DollarSign
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// Generate pharmacy data
const rxHistoricalData = [
  { year: 2021, members: 1250, gross_cost: 3800000, rebate: 520000, specialty_percent: 28, generic_dispensing_rate: 84 },
  { year: 2022, members: 1280, gross_cost: 4150000, rebate: 580000, specialty_percent: 32, generic_dispensing_rate: 83 },
  { year: 2023, members: 1310, gross_cost: 4620000, rebate: 640000, specialty_percent: 36, generic_dispensing_rate: 82 },
  { year: 2024, members: 1340, gross_cost: 5180000, rebate: 710000, specialty_percent: 40, generic_dispensing_rate: 81 },
];

const rxForecastData = [
  { year: 2025, gross_cost: 5820000, rebates: 790000, net_cost: 5030000, pmpm: 313 },
  { year: 2026, gross_cost: 6540000, rebates: 880000, net_cost: 5660000, pmpm: 351 },
  { year: 2027, gross_cost: 7350000, rebates: 980000, net_cost: 6370000, pmpm: 395 },
];

const drugMixData = [
  { name: "Generic", value: 45, color: "#10b981" },
  { name: "Brand", value: 30, color: "#3b82f6" },
  { name: "Specialty", value: 25, color: "#8b5cf6" },
];

const pipelineImpact = [
  { category: "GLP-1s", impact: 850000, probability: 0.85 },
  { category: "Biosimilars", impact: -420000, probability: 0.75 },
  { category: "Gene Therapy", impact: 320000, probability: 0.45 },
  { category: "Oncology", impact: 680000, probability: 0.70 },
];

const engine = {
  slug: "rx-trend-forecasting",
  number: 2,
  name: "Pharmacy Trend Forecast Engine",
  description: "Forecast prescription drug inflation with pipeline intelligence",
  category: "Forecasting",
  overview: "Pharmaceutical cost forecasting engine that integrates FDA drug pipeline data, biosimilar adoption curves, patent expiration schedules, manufacturer rebate agreements, and formulary management strategies to project pharmacy trends 12-24 months forward with scenario modeling.",
  capabilities: [
    "Drug pipeline impact modeling (GLP-1, oncology, gene therapy)",
    "Biosimilar adoption and displacement curves",
    "Specialty vs. traditional cost attribution",
    "Rebate erosion and contract change impact",
    "Generic dispensing rate optimization",
    "Manufacturer assistance program integration",
    "Utilization management effectiveness modeling"
  ],
  inputs: [
    "Historical pharmacy claims (NDC-level detail)",
    "Current formulary and tier structure",
    "PBM contract terms and rebate guarantees",
    "FDA drug pipeline (approvals, LOE dates)",
    "Member demographics and diagnosis codes",
    "Specialty pharmacy enrollment",
    "Prior authorization and step therapy rules"
  ],
  outputs: [
    "Gross and net pharmacy cost projections",
    "PMPM and PEPY trend rates by drug class",
    "Specialty pharmacy cost forecasts",
    "Rebate value projections and contract ROI",
    "Generic conversion opportunity quantification",
    "Pipeline drug financial impact scenarios",
    "Formulary optimization recommendations"
  ],
  methodology: "Combines time-series regression for baseline trends with discrete event simulation for pipeline drugs. Uses adoption diffusion models for new drug launches and biosimilar substitution. Integrates manufacturer rebate contracts and formulary management strategies. Applies scenario weighting based on FDA approval probabilities and market entry timing.",
  useCases: [
    "Annual pharmacy budget planning",
    "PBM contract negotiation and RFP prep",
    "Formulary redesign impact assessment",
    "Specialty pharmacy carve-out valuation",
    "Drug pipeline financial risk assessment",
    "Biosimilar adoption strategy planning"
  ],
  technicalSpecs: {
    accuracy: "±2.3% MAPE on 12-month net cost forecasts",
    processingTime: "4-10 minutes per projection",
    dataRequirements: "24+ months NDC-level claims data",
    updateFrequency: "Monthly with quarterly pipeline updates"
  }
};

export default function RxTrendForecastingPage() {
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
            className="absolute top-1/3 left-1/4 w-[700px] h-[700px] bg-gradient-radial from-purple-500/15 via-purple-500/5 to-transparent rounded-full blur-3xl"
            animate={{ 
              x: [0, 60, 0],
              y: [0, -40, 0],
              scale: [1, 1.15, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/3 w-[600px] h-[600px] bg-gradient-radial from-fuchsia-500/10 via-fuchsia-500/3 to-transparent rounded-full blur-3xl"
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
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-fuchsia-500/10 to-pink-500/10 blur-3xl -z-10 rounded-3xl" />
            
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="outline" className="bg-purple-500/10 border-purple-500/30 text-purple-300">
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
              className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent"
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

          {/* Rx Forecast Chart Component */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <RxForecastChart
              historical={rxHistoricalData}
              forecast={rxForecastData}
              title="Pharmacy Cost Trend Analysis"
              showGrossCost={true}
              showRebates={true}
            />
          </motion.div>

          {/* Drug Mix Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
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
                  <Pill className="w-5 h-5 text-purple-400" />
                  Drug Mix Distribution
                </CardTitle>
                <p className="text-sm text-slate-400 mt-2">
                  Cost allocation across generic, brand, and specialty medications
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={drugMixData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(entry) => `${entry.name}: ${entry.value}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {drugMixData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  
                  <div className="space-y-4">
                    {drugMixData.map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + idx * 0.1 }}
                        className="bg-slate-800/50 rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-white">{item.name}</span>
                          <span className="text-lg font-bold" style={{ color: item.color }}>{item.value}%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${item.value}%`, backgroundColor: item.color }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Pipeline Impact Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8"
          >
            <Card className="bg-slate-900/50 border-slate-800 hover:border-fuchsia-500/50 transition-all backdrop-blur-sm group relative overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                />
              </div>
              
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <TrendingUp className="w-5 h-5 text-fuchsia-400" />
                  Drug Pipeline Financial Impact
                </CardTitle>
                <p className="text-sm text-slate-400 mt-2">
                  Expected cost impact from FDA pipeline drugs entering the market
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pipelineImpact.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + idx * 0.1 }}
                      className="bg-slate-800/50 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <div className="font-medium text-white">{item.category}</div>
                          <div className="text-xs text-slate-400">Probability: {(item.probability * 100).toFixed(0)}%</div>
                        </div>
                        <div className={`text-lg font-bold ${item.impact > 0 ? 'text-red-400' : 'text-green-400'}`}>
                          {item.impact > 0 ? '+' : ''}{formatCurrency(Math.abs(item.impact))}
                        </div>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full transition-all duration-1000"
                          style={{ 
                            width: `${item.probability * 100}%`,
                            backgroundColor: item.impact > 0 ? '#f87171' : '#34d399'
                          }}
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
            <Card className="mb-8 bg-slate-900/50 border-slate-800 hover:border-purple-500/50 transition-all backdrop-blur-sm group relative overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                />
              </div>
              
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Brain className="w-5 h-5 text-purple-400" />
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
            <Card className="mb-8 bg-slate-900/50 border-slate-800 hover:border-purple-500/50 transition-all backdrop-blur-sm group relative overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                />
              </div>
              
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Settings className="w-5 h-5 text-fuchsia-400" />
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
                      <CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
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
              <Card className="h-full bg-slate-900/50 border-slate-800 hover:border-purple-500/50 transition-all backdrop-blur-sm group relative overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                  />
                </div>
                
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Database className="w-5 h-5 text-purple-400" />
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
                        <span className="text-purple-400">•</span>
                        {input}
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ y: -5 }}>
              <Card className="h-full bg-slate-900/50 border-slate-800 hover:border-fuchsia-500/50 transition-all backdrop-blur-sm group relative overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                  />
                </div>
                
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <BarChart3 className="w-5 h-5 text-fuchsia-400" />
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
                        <span className="text-fuchsia-400">•</span>
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
            <Card className="bg-gradient-to-br from-purple-500/20 via-fuchsia-500/20 to-pink-500/20 border-purple-500/30 backdrop-blur-sm relative overflow-hidden group">
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: "linear-gradient(45deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1))"
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
                    <Button size="lg" className="gap-2 bg-purple-600 hover:bg-purple-700">
                      <Play className="w-4 h-4" />
                      Schedule a Demo
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button size="lg" variant="outline" className="gap-2 border-slate-600 hover:border-purple-500/50">
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