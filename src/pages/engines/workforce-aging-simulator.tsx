import Head from "next/head";
import { motion } from "framer-motion";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ParticleField3D } from "@/components/premium/ParticleField3D";

export default function WorkforceAgingSimulatorPage() {
  return (
    <>
      <Head>
        <title>Workforce Aging Simulator | Kincaid Health</title>
        <meta
          name="description"
          content="Multi-year workforce aging simulation and healthcare cost trajectory modeling. Projects demographic shifts, Medicare transitions, and age-related cost inflation."
        />
      </Head>

      <Nav />

      <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black relative overflow-hidden">
        <ParticleField3D />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/10 via-transparent to-transparent" />
        
        <main className="container mx-auto px-4 py-8 relative z-10">
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
              Population & Demographics
            </Badge>
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent"
            >
              Workforce Aging Simulator
            </motion.h1>
            <p className="text-xl text-gray-300 mb-8 max-w-4xl">
              Multi-year workforce aging simulation and healthcare cost trajectory modeling. Projects demographic shifts, Medicare transitions, and age-related cost inflation.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {[
                { value: "5-10yr", label: "Projection Window", color: "emerald" },
                { value: "3-5%", label: "Annual Age Shift", color: "green" },
                { value: "$1,200", label: "Per-Year Age Cost", color: "teal" },
                { value: "Monte Carlo", label: "Simulation Method", color: "lime" }
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
                      <h3 className="text-lg font-semibold text-emerald-400 mb-2">Multi-Year Aging Projection</h3>
                      <p>Simulates workforce age distribution changes over 5-10 year horizons, modeling hiring patterns, turnover by age cohort, and retirement transitions to forecast demographic composition shifts.</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-green-400 mb-2">Age-Related Cost Inflation</h3>
                      <p>Quantifies the incremental healthcare cost increase as employees age, calculating the compound effect of an aging workforce on medical and pharmacy trend beyond baseline inflation.</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-teal-400 mb-2">Scenario Planning & Sensitivity Analysis</h3>
                      <p>Runs Monte Carlo simulations across hiring, retention, and retirement scenarios to quantify the range of possible aging impacts, supporting strategic workforce planning and benefit design decisions.</p>
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