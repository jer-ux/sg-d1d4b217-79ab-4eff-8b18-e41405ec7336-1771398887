import Head from "next/head";
import { motion } from "framer-motion";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ParticleField3D } from "@/components/premium/ParticleField3D";

export default function PEPYCostEnginePage() {
  return (
    <>
      <Head>
        <title>PEPY Cost Engine | Kincaid Health</title>
        <meta
          name="description"
          content="Per employee per year cost modeling for workforce-level benefit analysis. Annualized cost projections including dependents and coverage tiers."
        />
      </Head>

      <Nav />

      <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black relative overflow-hidden">
        <ParticleField3D />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-900/10 via-transparent to-transparent" />
        
        <main className="container mx-auto px-4 py-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto mb-12"
          >
            <Link href="/engines" className="inline-flex items-center text-green-400 hover:text-green-300 mb-6 transition-colors">
              ← Back to Engines
            </Link>
            
            <Badge className="mb-4 bg-green-500/10 text-green-400 border-green-500/20">
              Medical Claims Analytics
            </Badge>
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent"
            >
              PEPY Cost Engine
            </motion.h1>
            <p className="text-xl text-gray-300 mb-8 max-w-4xl">
              Per employee per year cost modeling for workforce-level benefit analysis with annualized cost projections including dependents and coverage tiers.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {[
                { value: "$12,200", label: "National PEPY Avg", color: "green" },
                { value: "2.1", label: "Avg Covered Lives", color: "emerald" },
                { value: "Annual", label: "Reporting Period", color: "teal" },
                { value: "Employer + EE", label: "Total Cost Basis", color: "lime" }
              ].map((metric, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  className="perspective-1000"
                >
                  <Card className="border-slate-700 bg-slate-900/50 backdrop-blur-sm transform-gpu transition-all duration-300 hover:shadow-xl hover:shadow-green-500/20">
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
                      <h3 className="text-lg font-semibold text-green-400 mb-2">Workforce-Level Cost Aggregation</h3>
                      <p>Calculates total annual healthcare costs per employee including all covered dependents, providing an all-in cost metric for HR budgeting and total rewards benchmarking.</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-emerald-400 mb-2">Coverage Tier Weighting</h3>
                      <p>Weights PEPY calculations by actual coverage tier distribution (single, family, employee+spouse, employee+children), accounting for the financial impact of family structure on per-employee costs.</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-teal-400 mb-2">Employer vs. Employee Cost Attribution</h3>
                      <p>Segments PEPY into employer-paid premiums/contributions and employee cost-sharing (premiums, deductibles, copays, coinsurance), supporting total compensation and affordability analyses.</p>
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