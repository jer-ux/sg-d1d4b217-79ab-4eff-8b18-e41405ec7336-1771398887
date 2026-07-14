import Head from "next/head";
import { motion } from "framer-motion";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ParticleField3D } from "@/components/premium/ParticleField3D";

export default function FamilyStatusRiskEnginePage() {
  return (
    <>
      <Head>
        <title>Family Status Risk Engine | Kincaid Health</title>
        <meta
          name="description"
          content="Family structure risk modeling for healthcare cost forecasting. Analyzes single vs. family coverage, dependent counts, and lifecycle transitions."
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
              Population & Demographics
            </Badge>
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-400 bg-clip-text text-transparent"
            >
              Family Status Risk Engine
            </motion.h1>
            <p className="text-xl text-gray-300 mb-8 max-w-4xl">
              Family structure risk modeling for healthcare cost forecasting. Analyzes single vs. family coverage, dependent counts, and lifecycle transitions.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {[
                { value: "2.4x", label: "Family Cost Multiple", color: "blue" },
                { value: "1.8", label: "Avg Dependents", color: "cyan" },
                { value: "12-15%", label: "Annual Change Rate", color: "sky" },
                { value: "Lifecycle", label: "Event Tracking", color: "indigo" }
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
                      <h3 className="text-lg font-semibold text-blue-400 mb-2">Coverage Tier Analysis</h3>
                      <p>Models cost differentials between employee-only, employee+spouse, employee+children, and family coverage, quantifying the financial impact of family structure on plan costs.</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-cyan-400 mb-2">Lifecycle Transition Tracking</h3>
                      <p>Identifies marriage, birth, adoption, divorce, and aging-out events that trigger coverage changes, forecasting enrollment volatility and cost shifts from family status transitions.</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-sky-400 mb-2">Dependent Risk Profiling</h3>
                      <p>Analyzes healthcare utilization patterns by dependent type (spouse, children, adult dependents), calculating risk-adjusted costs for multi-member family units.</p>
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