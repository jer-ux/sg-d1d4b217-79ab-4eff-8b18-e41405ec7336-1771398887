import Head from "next/head";
import { motion } from "framer-motion";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Target, TrendingUp, Users, Zap, Database, BarChart3, DollarSign } from "lucide-react";
import { Nav } from "@/components/Nav";
import { ParticleField3D } from "@/components/premium/ParticleField3D";

export default function SalesIQPage() {
  return (
    <>
      <Head>
        <title>Sales IQ | Kincaid Health Data Sciences Lab</title>
        <meta 
          name="description" 
          content="Sales intelligence platform for self-funded benefits market. Real-time lead scoring, pipeline forecasting, and competitive positioning analytics." 
        />
      </Head>

      <Nav />

      <main className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black relative overflow-hidden">
        <ParticleField3D />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent" />
        
        {/* Hero Section */}
        <section className="relative pt-24 pb-12 px-4">
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8"
            >
              <Badge className="mb-6 bg-blue-500/20 text-blue-300 border-blue-500/30">
                Sales Intelligence Platform
              </Badge>
              <motion.h1 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-5xl md:text-7xl font-bold mb-6"
              >
                <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                  Sales IQ
                </span>
              </motion.h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-4xl mx-auto">
                Real-Time Lead Scoring & Pipeline Forecasting
              </p>
              <p className="text-lg text-gray-400 mb-8 max-w-3xl mx-auto">
                Intelligence platform for self-funded benefits market with predictive analytics
              </p>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                {[
                  { value: "3.2x", label: "Pipeline Velocity", color: "blue" },
                  { value: "87%", label: "Lead Accuracy", color: "cyan" },
                  { value: "42%", label: "Win Rate Lift", color: "indigo" },
                  { value: "24hrs", label: "Market Intel Refresh", color: "sky" }
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
                        <div className={`text-3xl font-bold text-${metric.color}-400 mb-1`}>{metric.value}</div>
                        <div className="text-xs text-slate-400">{metric.label}</div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Sales Intelligence Framework */}
        <section className="py-20 border-t border-slate-800 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/5 to-transparent" />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <Badge className="bg-blue-500/10 text-blue-400 border border-blue-500/30 mb-4">
                THE FRAMEWORK
              </Badge>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold text-white mb-6"
              >
                The Sales Intelligence Framework
              </motion.h2>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                A comprehensive platform for self-funded market intelligence, lead qualification, and competitive positioning analytics.
              </p>
            </div>

            {/* Four Pillars */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {[
                { icon: Search, title: "Lead Intelligence", description: "Real-time market data enrichment identifies high-value prospects based on plan size, broker relationships, and renewal cycles.", color: "blue" },
                { icon: Target, title: "Predictive Scoring", description: "Machine learning models score opportunities using historical win rates, competitive dynamics, and buying signals.", color: "cyan" },
                { icon: TrendingUp, title: "Pipeline Forecasting", description: "Time-series models project quarterly bookings with confidence intervals for board-level revenue planning.", color: "indigo" },
                { icon: Users, title: "Competitive Positioning", description: "Real-time tracking of competitor moves, pricing strategies, and market share shifts across geographies.", color: "sky" }
              ].map((pillar, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, rotateY: 5, z: 50 }}
                  className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-blue-500/50 transition-all backdrop-blur-sm transform-gpu hover:shadow-2xl hover:shadow-blue-500/20"
                >
                  <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                    <pillar.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-slate-400">
                    {pillar.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}