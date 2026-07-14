import Head from "next/head";
import { motion } from "framer-motion";
import Link from "next/link";
import Nav from "@/components/Nav";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ParticleField3D } from "@/components/premium/ParticleField3D";
import Footer from "@/components/Footer";
import { TrendingUp, Users, Calendar, BarChart3 } from "lucide-react";

export default function PopulationGrowthForecastPage() {
  return (
    <>
      <Head>
        <title>Population Growth Forecast Engine | Kincaid Health</title>
        <meta
          name="description"
          content="Predict workforce size changes and healthcare cost impact. Hiring, attrition, and headcount planning with benefits cost modeling."
        />
      </Head>

      <Nav />

      <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black relative overflow-hidden">
        <ParticleField3D />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-900/10 via-transparent to-transparent" />
        
        <main className="container mx-auto px-4 py-8 relative z-10 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto mb-12"
          >
            <Link href="/engines" className="inline-flex items-center text-violet-400 hover:text-violet-300 mb-6 transition-colors">
              ← Back to Engines
            </Link>
            
            <Badge className="mb-4 bg-violet-500/10 text-violet-400 border-violet-500/20">
              Workforce Planning
            </Badge>
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent"
            >
              Population Growth Forecast
            </motion.h1>
            <p className="text-xl text-gray-300 mb-8 max-w-4xl">
              Predict workforce size changes and healthcare cost impact with hiring, attrition, and headcount planning integrated with benefits cost modeling.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: "24mo", label: "Forecast Horizon", color: "violet" },
                { value: "±4%", label: "Accuracy", color: "purple" },
                { value: "Monthly", label: "Updates", color: "fuchsia" },
                { value: "Scenario", label: "Planning Mode", color: "pink" }
              ].map((metric, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  className="perspective-1000"
                >
                  <Card className="border-slate-700 bg-slate-900/50 backdrop-blur-sm transform-gpu transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/20">
                    <CardContent className="pt-6 text-center">
                      <div className={`text-2xl font-bold text-${metric.color}-400 mb-1`}>{metric.value}</div>
                      <div className="text-xs text-slate-400">{metric.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Core Capabilities</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: TrendingUp,
                  title: "Headcount Projection",
                  description: "Time-series forecasting of employee population using historical growth patterns, hiring plans, seasonal fluctuations, and attrition rates by cohort."
                },
                {
                  icon: Users,
                  title: "New Hire Profiling",
                  description: "Models demographic mix of future hires based on job requisitions, location, and historical hiring patterns to estimate incremental healthcare costs."
                },
                {
                  icon: Calendar,
                  title: "Seasonality Adjustment",
                  description: "Accounts for predictable enrollment fluctuations including annual open enrollment, new hire onboarding cycles, and summer intern programs."
                },
                {
                  icon: BarChart3,
                  title: "Cost Impact Modeling",
                  description: "Translates headcount forecasts into healthcare cost projections using PMPM assumptions, plan participation rates, and dependent coverage ratios."
                }
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1 + idx * 0.1 }}
                  whileHover={{ scale: 1.02, x: 10 }}
                >
                  <Card className="border-slate-700 bg-slate-900/50 backdrop-blur-sm h-full transform-gpu transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/10">
                    <CardContent className="pt-6">
                      <feature.icon className="w-8 h-8 text-violet-400 mb-4" />
                      <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                      <p className="text-gray-400 text-sm">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="max-w-6xl mx-auto mt-12"
          >
            <Card className="border-slate-700 bg-slate-900/50 backdrop-blur-sm">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold text-white mb-6">Technical Specifications</h2>
                <div className="space-y-4 text-gray-300">
                  <div>
                    <span className="font-semibold text-violet-400">Forecasting Methodology:</span>
                    <p className="ml-4">ARIMA time-series models combined with business-driven adjustments for planned expansions, restructuring, or market conditions. Includes confidence intervals and scenario planning.</p>
                  </div>
                  <div>
                    <span className="font-semibold text-violet-400">Integration Points:</span>
                    <p className="ml-4">Links to HR headcount plans, applicant tracking systems, workforce planning tools, and financial budgeting systems for synchronized projections.</p>
                  </div>
                  <div>
                    <span className="font-semibold text-violet-400">Output Formats:</span>
                    <p className="ml-4">Monthly enrollment forecasts, benefits cost budgets, variance analysis, what-if scenario comparisons, and CFO-ready executive summaries.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </div>

      <Footer />
    </>
  );
}