import Head from "next/head";
import { motion } from "framer-motion";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ParticleField3D } from "@/components/premium/ParticleField3D";

export default function ParticipationRateForecastEnginePage() {
  return (
    <>
      <Head>
        <title>Participation Rate Forecast Engine | Kincaid Health</title>
        <meta
          name="description"
          content="Enrollment trend prediction and participation rate modeling. Forecasts benefit election rates by demographics, plan design, and contribution strategy."
        />
      </Head>

      <Nav />

      <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black relative overflow-hidden">
        <ParticleField3D />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-900/10 via-transparent to-transparent" />
        
        <main className="container mx-auto px-4 py-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto mb-12"
          >
            <Link href="/engines" className="inline-flex items-center text-teal-400 hover:text-teal-300 mb-6 transition-colors">
              ← Back to Engines
            </Link>
            
            <Badge className="mb-4 bg-teal-500/10 text-teal-400 border-teal-500/20">
              Population & Demographics
            </Badge>
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent"
            >
              Participation Rate Forecast Engine
            </motion.h1>
            <p className="text-xl text-gray-300 mb-8 max-w-4xl">
              Enrollment trend prediction and participation rate modeling. Forecasts benefit election rates by demographics, plan design, and contribution strategy.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {[
                { value: "72-85%", label: "Medical Takeup", color: "teal" },
                { value: "40-60%", label: "Dental Takeup", color: "cyan" },
                { value: "±3%", label: "Forecast Accuracy", color: "emerald" },
                { value: "Multi-year", label: "Projection", color: "green" }
              ].map((metric, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  className="perspective-1000"
                >
                  <Card className="border-slate-700 bg-slate-900/50 backdrop-blur-sm transform-gpu transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/20">
                    <CardContent className="pt-6 text-center">
                      <div className={`text-2xl font-bold text-${metric.color}-400 mb-1`}>{metric.value}</div>
                      <div className="text-xs text-slate-400">{metric.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Card className="border-slate-700 bg-slate-900/30 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold text-white mb-4">Engine Capabilities</h2>
                  <div className="space-y-6 text-gray-300">
                    <div>
                      <h3 className="text-lg font-semibold text-teal-400 mb-2">Enrollment Trend Analysis</h3>
                      <p>Historical participation rate tracking across medical, dental, vision, and voluntary benefits, segmented by employee demographics, compensation level, and family status to identify enrollment patterns.</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-cyan-400 mb-2">Plan Design Sensitivity</h3>
                      <p>Models participation elasticity based on employee contributions, deductible levels, network breadth, and plan richness, quantifying enrollment shifts from benefit design changes.</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-emerald-400 mb-2">Multi-Year Forecasting</h3>
                      <p>Projects future participation rates considering workforce changes, contribution strategy, competitive market dynamics, and economic conditions to support multi-year budget planning.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </main>
      </div>

      <Footer />
    </>
  );
}