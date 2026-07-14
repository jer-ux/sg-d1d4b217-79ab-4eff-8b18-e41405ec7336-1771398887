import Head from "next/head";
import { motion } from "framer-motion";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ParticleField3D } from "@/components/premium/ParticleField3D";

export default function HighCostClaimPredictionEnginePage() {
  return (
    <>
      <Head>
        <title>High-Cost Claim Prediction Engine | Kincaid Health</title>
        <meta
          name="description"
          content="Machine learning for identifying members at risk of exceeding cost thresholds. Predictive modeling for $100K+ claimants with intervention targeting."
        />
      </Head>

      <Nav />

      <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black relative overflow-hidden">
        <ParticleField3D />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/10 via-transparent to-transparent" />
        
        <main className="container mx-auto px-4 py-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto mb-12"
          >
            <Link href="/engines" className="inline-flex items-center text-red-400 hover:text-red-300 mb-6 transition-colors">
              ← Back to Engines
            </Link>
            
            <Badge className="mb-4 bg-red-500/10 text-red-400 border-red-500/20">
              Medical Claims Analytics
            </Badge>
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-red-400 via-orange-400 to-amber-400 bg-clip-text text-transparent"
            >
              High-Cost Claim Prediction Engine
            </motion.h1>
            <p className="text-xl text-gray-300 mb-8 max-w-4xl">
              Machine learning for identifying members at risk of exceeding cost thresholds with predictive modeling for $100K+ claimants and intervention targeting.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {[
                { value: "89%", label: "Prediction Accuracy", color: "red" },
                { value: "$100K+", label: "Cost Threshold", color: "orange" },
                { value: "6-12mo", label: "Prediction Window", color: "amber" },
                { value: "Real-time", label: "Risk Scoring", color: "yellow" }
              ].map((metric, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  className="perspective-1000"
                >
                  <Card className="border-slate-700 bg-slate-900/50 backdrop-blur-sm transform-gpu transition-all duration-300 hover:shadow-xl hover:shadow-red-500/20">
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
                      <h3 className="text-lg font-semibold text-red-400 mb-2">Machine Learning Risk Stratification</h3>
                      <p>Trains gradient boosting models on historical claims patterns, pharmacy fills, lab results, and demographic features to predict which members will exceed high-cost thresholds in the next 6-12 months.</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-orange-400 mb-2">Intervention Prioritization</h3>
                      <p>Ranks predicted high-cost members by modifiable risk factors and case management ROI potential, enabling care teams to focus resources on members most likely to benefit from clinical interventions.</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-amber-400 mb-2">Explainable AI Insights</h3>
                      <p>Provides SHAP-based feature attribution explaining why each member was flagged as high-risk, supporting clinical decision-making with transparent, auditable predictions backed by specific evidence.</p>
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