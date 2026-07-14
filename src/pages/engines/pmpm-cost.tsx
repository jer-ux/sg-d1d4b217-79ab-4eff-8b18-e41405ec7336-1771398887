import Head from "next/head";
import { motion } from "framer-motion";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ParticleField3D } from "@/components/premium/ParticleField3D";

export default function PMPMCostEnginePage() {
  return (
    <>
      <Head>
        <title>PMPM Cost Engine | Kincaid Health</title>
        <meta
          name="description"
          content="Per member per month cost calculation and benchmarking. Normalizes claims spend across varying population sizes for apples-to-apples comparisons."
        />
      </Head>

      <Nav />

      <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black relative overflow-hidden">
        <ParticleField3D />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/10 via-transparent to-transparent" />
        
        <main className="container mx-auto px-4 py-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto mb-12"
          >
            <Link href="/engines" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-6 transition-colors">
              ← Back to Engines
            </Link>
            
            <Badge className="mb-4 bg-cyan-500/10 text-cyan-400 border-cyan-500/20">
              Medical Claims Analytics
            </Badge>
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-sky-400 bg-clip-text text-transparent"
            >
              PMPM Cost Engine
            </motion.h1>
            <p className="text-xl text-gray-300 mb-8 max-w-4xl">
              Per member per month cost calculation and benchmarking. Normalizes claims spend across varying population sizes for apples-to-apples comparisons.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {[
                { value: "$425", label: "National PMPM Avg", color: "cyan" },
                { value: "±25%", label: "Regional Variation", color: "blue" },
                { value: "Monthly", label: "Calculation Period", color: "sky" },
                { value: "Risk-Adjusted", label: "Methodology", color: "teal" }
              ].map((metric, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  className="perspective-1000"
                >
                  <Card className="border-slate-700 bg-slate-900/50 backdrop-blur-sm transform-gpu transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/20">
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
                      <h3 className="text-lg font-semibold text-cyan-400 mb-2">Member Month Calculation</h3>
                      <p>Accurately calculates eligible member months accounting for mid-month enrollments, terminations, and coverage tier changes, ensuring precise PMPM denominators for cost normalization.</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-blue-400 mb-2">Risk-Adjusted PMPM Benchmarking</h3>
                      <p>Applies HCC-based risk adjustment to normalize PMPM costs for population health differences, enabling fair comparisons across employer groups with varying age, gender, and morbidity profiles.</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-sky-400 mb-2">Service Category Attribution</h3>
                      <p>Segments total PMPM into inpatient, outpatient, professional, emergency, and ancillary service categories, identifying the specific cost drivers contributing to above-benchmark performance.</p>
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