import Head from "next/head";
import { motion } from "framer-motion";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ParticleField3D } from "@/components/premium/ParticleField3D";

export default function MedicalClaimsTrendEnginePage() {
  return (
    <>
      <Head>
        <title>Medical Claims Trend Engine | Kincaid Health</title>
        <meta
          name="description"
          content="Historical medical trend analysis and projection modeling. Multi-year claims cost forecasting with inflation decomposition and seasonality adjustment."
        />
      </Head>

      <Nav />

      <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black relative overflow-hidden">
        <ParticleField3D />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent" />
        
        <main className="container mx-auto px-4 py-8 relative z-10">
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
              Medical Claims Analytics
            </Badge>
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent"
            >
              Medical Claims Trend Engine
            </motion.h1>
            <p className="text-xl text-gray-300 mb-8 max-w-4xl">
              Historical medical trend analysis and projection modeling with multi-year claims cost forecasting, inflation decomposition, and seasonality adjustment.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {[
                { value: "6-8%", label: "Annual Trend Rate", color: "blue" },
                { value: "36mo", label: "Forecast Window", color: "indigo" },
                { value: "95%", label: "Prediction Accuracy", color: "violet" },
                { value: "Monthly", label: "Update Frequency", color: "purple" }
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
                      <h3 className="text-lg font-semibold text-blue-400 mb-2">Trend Decomposition Analysis</h3>
                      <p>Separates medical trend into unit cost inflation and utilization components, isolating price increases from changes in service volume and intensity to identify the true drivers of cost growth.</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-indigo-400 mb-2">Seasonality & Completion Factor Modeling</h3>
                      <p>Adjusts for seasonal patterns in claims submission and run-out periods, applying completion factors to stabilize trend calculations and improve forecast accuracy for incomplete months.</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-violet-400 mb-2">Multi-Year Projection with Confidence Intervals</h3>
                      <p>Forecasts medical costs across 12-36 month horizons with probabilistic confidence bands, quantifying uncertainty ranges to support conservative reserve setting and budgeting decisions.</p>
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