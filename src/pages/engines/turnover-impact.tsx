import Head from "next/head";
import { motion } from "framer-motion";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ParticleField3D } from "@/components/premium/ParticleField3D";

export default function TurnoverImpactEnginePage() {
  return (
    <>
      <Head>
        <title>Turnover Impact Engine | Kincaid Health</title>
        <meta
          name="description"
          content="Employee turnover cost modeling for benefit plan financial forecasting. Quantifies enrollment volatility, coverage gaps, and administrative burden."
        />
      </Head>

      <Nav />

      <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black relative overflow-hidden">
        <ParticleField3D />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent" />
        
        <main className="container mx-auto px-4 py-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto mb-12"
          >
            <Link href="/engines" className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-6 transition-colors">
              ← Back to Engines
            </Link>
            
            <Badge className="mb-4 bg-purple-500/10 text-purple-400 border-purple-500/20">
              Population & Demographics
            </Badge>
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-purple-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent"
            >
              Turnover Impact Engine
            </motion.h1>
            <p className="text-xl text-gray-300 mb-8 max-w-4xl">
              Employee turnover cost modeling for benefit plan financial forecasting. Quantifies enrollment volatility, coverage gaps, and administrative burden.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {[
                { value: "15-25%", label: "Annual Turnover", color: "purple" },
                { value: "$2,400", label: "Per-Leaver Cost", color: "violet" },
                { value: "3-6mo", label: "Coverage Gap", color: "fuchsia" },
                { value: "Real-time", label: "Tracking", color: "pink" }
              ].map((metric, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  className="perspective-1000"
                >
                  <Card className="border-slate-700 bg-slate-900/50 backdrop-blur-sm transform-gpu transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20">
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
                      <h3 className="text-lg font-semibold text-purple-400 mb-2">Turnover Cost Modeling</h3>
                      <p>Models direct and indirect costs of employee turnover including COBRA continuation, enrollment gaps, administrative overhead, and lost productivity impact on healthcare utilization patterns.</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-violet-400 mb-2">Coverage Gap Analysis</h3>
                      <p>Quantifies the period between employee departure and replacement coverage, tracking uninsured exposure, risk accumulation, and financial volatility during transition periods.</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-fuchsia-400 mb-2">Administrative Burden Calculation</h3>
                      <p>Calculates the operational cost of processing terminations, COBRA elections, eligibility changes, and new hire enrollments, including HR time allocation and system processing costs.</p>
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