import Head from "next/head";
import { motion } from "framer-motion";
import Link from "next/link";
import Nav from "@/components/Nav";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ParticleField3D } from "@/components/premium/ParticleField3D";
import Footer from "@/components/Footer";
import { Users, TrendingUp, ArrowRight, MapPin } from "lucide-react";

export default function EmployeeMigrationPage() {
  return (
    <>
      <Head>
        <title>Employee Migration Engine | Kincaid Health</title>
        <meta
          name="description"
          content="Track workforce movement between locations and cost implications. Relocation cost modeling and remote work impact analysis."
        />
      </Head>

      <Nav />

      <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black relative overflow-hidden">
        <ParticleField3D />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-900/10 via-transparent to-transparent" />
        
        <main className="container mx-auto px-4 py-8 relative z-10 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto mb-12"
          >
            <Link href="/engines" className="inline-flex items-center text-orange-400 hover:text-orange-300 mb-6 transition-colors">
              ← Back to Engines
            </Link>
            
            <Badge className="mb-4 bg-orange-500/10 text-orange-400 border-orange-500/20">
              Workforce Dynamics
            </Badge>
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent"
            >
              Employee Migration
            </motion.h1>
            <p className="text-xl text-gray-300 mb-8 max-w-4xl">
              Track workforce movement between locations and cost implications with relocation cost modeling and remote work impact analysis.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: "Real-time", label: "Movement Tracking", color: "orange" },
                { value: "±$250", label: "PMPM Impact", color: "amber" },
                { value: "50+", label: "Migration Patterns", color: "yellow" },
                { value: "12mo", label: "Forecast Window", color: "red" }
              ].map((metric, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  className="perspective-1000"
                >
                  <Card className="border-slate-700 bg-slate-900/50 backdrop-blur-sm transform-gpu transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/20">
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
                  icon: Users,
                  title: "Migration Pattern Analysis",
                  description: "Tracks employee movement between high-cost and low-cost markets with cohort-based cost impact quantification and trend detection."
                },
                {
                  icon: TrendingUp,
                  title: "Cost Differential Modeling",
                  description: "Calculates expected cost changes when employees relocate using geographic cost indices, provider network adequacy, and utilization pattern shifts."
                },
                {
                  icon: ArrowRight,
                  title: "Remote Work Impact",
                  description: "Models healthcare cost implications of permanent remote work arrangements including network access changes and utilization behavior modifications."
                },
                {
                  icon: MapPin,
                  title: "Relocation Forecasting",
                  description: "Predicts future migration flows based on business unit expansions, office closures, and remote work policy changes with cost projections."
                }
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1 + idx * 0.1 }}
                  whileHover={{ scale: 1.02, x: 10 }}
                >
                  <Card className="border-slate-700 bg-slate-900/50 backdrop-blur-sm h-full transform-gpu transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/10">
                    <CardContent className="pt-6">
                      <feature.icon className="w-8 h-8 text-orange-400 mb-4" />
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
                    <span className="font-semibold text-orange-400">Data Integration:</span>
                    <p className="ml-4">Combines HRIS location changes, eligibility feed address updates, claims ZIP codes, and network participation files to track employee movement in real-time.</p>
                  </div>
                  <div>
                    <span className="font-semibold text-orange-400">Cost Impact Calculation:</span>
                    <p className="ml-4">Delta = (New_location_index - Old_location_index) × Baseline_PMPM × Employee_count with adjustment for network disruption, provider switching, and care continuity factors.</p>
                  </div>
                  <div>
                    <span className="font-semibold text-orange-400">Output Formats:</span>
                    <p className="ml-4">Migration flow maps, cost impact summaries, origin-destination matrices, remote work scenario models, and workforce planning integration reports.</p>
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