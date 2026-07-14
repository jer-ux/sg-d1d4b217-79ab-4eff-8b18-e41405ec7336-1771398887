import Head from "next/head";
import { motion } from "framer-motion";
import Link from "next/link";
import Nav from "@/components/Nav";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ParticleField3D } from "@/components/premium/ParticleField3D";
import { TrendingUp, Database, BarChart3, Activity, AlertCircle, CheckCircle2, Cpu, GitBranch, Target, Zap } from "lucide-react";
import { EngineDetailLayout, VegasSection, VegasMetricCard, VegasCodeBlock, VegasFeatureGrid, VegasFeatureCard } from "@/components/engines/EngineDetailLayout";

export default function MedicalTrendForecastingPage() {
  return (
    <>
      <Head>
        <title>Medical Trend Forecasting Engine | Kincaid Health</title>
        <meta
          name="description"
          content="Time-series forecasting engine for medical cost trends. Combines historical claims with inflation indices, utilization shifts, and provider contract changes."
        />
      </Head>

      <Nav />

      <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black relative overflow-hidden">
        <ParticleField3D />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent" />
        
        <main className="container mx-auto px-4 py-8 relative z-10">
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto mb-12"
          >
            <Link href="/engines" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6 transition-colors">
              ← Back to Engines
            </Link>
            
            <Badge className="mb-4 bg-blue-500/10 text-blue-400 border-blue-500/20">
              Forecasting Engine
            </Badge>
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent"
            >
              Medical Trend Forecasting
            </motion.h1>
            <p className="text-xl text-gray-300 mb-8 max-w-4xl">
              Time-series forecasting for medical cost trends combining historical claims, inflation indices, utilization shifts, and provider contract changes.
            </p>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: "±1.2%", label: "Forecast Accuracy", color: "blue" },
                { value: "12-18mo", label: "Projection Window", color: "cyan" },
                { value: "95%", label: "Confidence Interval", color: "teal" },
                { value: "Real-time", label: "Data Updates", color: "sky" }
              ].map((metric, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  className="perspective-1000"
                >
                  <Card className="border-slate-700 bg-slate-900/50 backdrop-blur-sm transform-gpu transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20">
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