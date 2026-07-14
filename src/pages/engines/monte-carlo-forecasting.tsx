import Head from "next/head";
import { motion } from "framer-motion";
import Link from "next/link";
import Nav from "@/components/Nav";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ParticleField3D } from "@/components/premium/ParticleField3D";
import { Dices, Database, Target, TrendingUp, AlertTriangle, CheckCircle2, BarChart3, Activity, Cpu, LineChart, Shield } from "lucide-react";
import { EngineDetailLayout, VegasSection, VegasMetricCard, VegasCodeBlock, VegasFeatureGrid, VegasFeatureCard } from "@/components/engines/EngineDetailLayout";

export default function MonteCarloForecastingPage() {
  return (
    <>
      <Head>
        <title>Monte Carlo Forecasting Engine | Kincaid Health</title>
        <meta
          name="description"
          content="Probabilistic forecasting engine using Monte Carlo simulation for healthcare cost modeling with uncertainty quantification."
        />
      </Head>

      <Nav />

      <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black relative overflow-hidden">
        <ParticleField3D />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/10 via-transparent to-transparent" />
        
        <main className="container mx-auto px-4 py-8 relative z-10">
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto mb-12"
          >
            <Link href="/engines" className="inline-flex items-center text-emerald-400 hover:text-emerald-300 mb-6 transition-colors">
              ← Back to Engines
            </Link>
            
            <Badge className="mb-4 bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
              Probabilistic Modeling
            </Badge>
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent"
            >
              Monte Carlo Forecasting
            </motion.h1>
            <p className="text-xl text-gray-300 mb-8 max-w-4xl">
              Probabilistic forecasting using Monte Carlo simulation for healthcare cost modeling with comprehensive uncertainty quantification.
            </p>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: "10K", label: "Simulations/Run", color: "emerald" },
                { value: "P50/P90", label: "Percentile Outputs", color: "teal" },
                { value: "99%", label: "Coverage Accuracy", color: "cyan" },
                { value: "<2min", label: "Compute Time", color: "green" }
              ].map((metric, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  className="perspective-1000"
                >
                  <Card className="border-slate-700 bg-slate-900/50 backdrop-blur-sm transform-gpu transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/20">
                    <CardContent className="pt-6 text-center">
                      <div className={`text-2xl font-bold text-${metric.color}-400 mb-1`}>{metric.value}</div>
                      <div className="text-xs text-slate-400">{metric.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </main>
      </div>
    </>
  );
}