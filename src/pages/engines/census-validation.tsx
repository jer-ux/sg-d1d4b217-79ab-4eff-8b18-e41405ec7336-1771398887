import Head from "next/head";
import { motion } from "framer-motion";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ParticleField3D } from "@/components/premium/ParticleField3D";

export default function CensusValidationEnginePage() {
  return (
    <>
      <Head>
        <title>Census Validation Engine | Kincaid Health</title>
        <meta
          name="description"
          content="Employee census data quality validation. Identifies data anomalies, duplicate records, and enrollment errors impacting rate accuracy."
        />
      </Head>

      <Nav />

      <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black relative overflow-hidden">
        <ParticleField3D />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-900/10 via-transparent to-transparent" />
        
        <main className="container mx-auto px-4 py-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto mb-12"
          >
            <Link href="/engines" className="inline-flex items-center text-rose-400 hover:text-rose-300 mb-6 transition-colors">
              ← Back to Engines
            </Link>
            
            <Badge className="mb-4 bg-rose-500/10 text-rose-400 border-rose-500/20">
              Population & Demographics
            </Badge>
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-rose-400 via-pink-400 to-fuchsia-400 bg-clip-text text-transparent"
            >
              Census Validation Engine
            </motion.h1>
            <p className="text-xl text-gray-300 mb-8 max-w-4xl">
              Employee census data quality validation. Identifies data anomalies, duplicate records, and enrollment errors impacting rate accuracy.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {[
                { value: "2-5%", label: "Error Rate", color: "rose" },
                { value: "15-20", label: "Validation Rules", color: "pink" },
                { value: "Real-time", label: "Checking", color: "fuchsia" },
                { value: "99.8%", label: "Accuracy Target", color: "red" }
              ].map((metric, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  className="perspective-1000"
                >
                  <Card className="border-slate-700 bg-slate-900/50 backdrop-blur-sm transform-gpu transition-all duration-300 hover:shadow-xl hover:shadow-rose-500/20">
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
                      <h3 className="text-lg font-semibold text-rose-400 mb-2">Data Anomaly Detection</h3>
                      <p>Identifies age/date inconsistencies, invalid dependent relationships, duplicate SSNs, missing required fields, and enrollment conflicts using machine learning pattern recognition.</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-pink-400 mb-2">Duplicate Record Resolution</h3>
                      <p>Detects duplicate enrollments across systems using fuzzy matching on name, DOB, and SSN, quantifying the cost impact of duplicate coverage and administrative errors.</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-fuchsia-400 mb-2">Rate Accuracy Impact</h3>
                      <p>Quantifies how census errors affect premium rates, stop-loss pricing, and actuarial projections, calculating the financial exposure from data quality issues.</p>
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