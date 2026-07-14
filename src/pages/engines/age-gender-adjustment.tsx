import Head from "next/head";
import { motion } from "framer-motion";
import Link from "next/link";
import Nav from "@/components/Nav";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ParticleField3D } from "@/components/premium/ParticleField3D";
import Footer from "@/components/Footer";
import { Users, BarChart3, TrendingUp, Calculator } from "lucide-react";

export default function AgeGenderAdjustmentPage() {
  return (
    <>
      <Head>
        <title>Age/Gender Adjustment Engine | Kincaid Health</title>
        <meta
          name="description"
          content="Actuarial age and gender cost relativities for precise population adjustments. Standard actuarial methodology with industry-validated curves."
        />
      </Head>

      <Nav />

      <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black relative overflow-hidden">
        <ParticleField3D />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/10 via-transparent to-transparent" />
        
        <main className="container mx-auto px-4 py-8 relative z-10 mb-16">
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
              Actuarial Adjustment
            </Badge>
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent"
            >
              Age/Gender Adjustment
            </motion.h1>
            <p className="text-xl text-gray-300 mb-8 max-w-4xl">
              Actuarial age and gender cost relativities for precise population adjustments using standard actuarial methodology with industry-validated curves.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: "5-year", label: "Age Bands", color: "cyan" },
                { value: "±3%", label: "Accuracy", color: "blue" },
                { value: "SOA", label: "Standard Curves", color: "indigo" },
                { value: "Annual", label: "Updates", color: "sky" }
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
                  title: "Age Band Relativities",
                  description: "Standard 5-year age band factors (0-4, 5-9, ..., 60-64, 65+) calibrated to large multi-employer claim databases with separate curves for medical and pharmacy."
                },
                {
                  icon: BarChart3,
                  title: "Gender Cost Factors",
                  description: "Male and female cost relativities by age band accounting for maternity, preventive care utilization patterns, and chronic disease prevalence differences."
                },
                {
                  icon: TrendingUp,
                  title: "Aging Projection",
                  description: "Forecast population aging effects on future costs using actuarial cohort flow models and retirement eligibility transitions."
                },
                {
                  icon: Calculator,
                  title: "Credibility Weighting",
                  description: "Blends plan-specific experience with industry norms using Buhlmann credibility methodology based on claim volume and population size."
                }
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1 + idx * 0.1 }}
                  whileHover={{ scale: 1.02, x: 10 }}
                >
                  <Card className="border-slate-700 bg-slate-900/50 backdrop-blur-sm h-full transform-gpu transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10">
                    <CardContent className="pt-6">
                      <feature.icon className="w-8 h-8 text-cyan-400 mb-4" />
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
                    <span className="font-semibold text-cyan-400">Actuarial Standards:</span>
                    <p className="ml-4">Complies with Society of Actuaries (SOA) and American Academy of Actuaries (AAA) practice notes for healthcare cost modeling. Age/gender factors based on CMS PMPM data and commercial claim databases.</p>
                  </div>
                  <div>
                    <span className="font-semibold text-cyan-400">Adjustment Formula:</span>
                    <p className="ml-4">Cost_adjusted = Cost_observed × (Target_age_gender_mix / Actual_age_gender_mix) using multiplicative factors. Includes confidence intervals and sensitivity to factor selection.</p>
                  </div>
                  <div>
                    <span className="font-semibold text-cyan-400">Output Formats:</span>
                    <p className="ml-4">Adjusted PMPM by category (medical, Rx, total), age/gender pyramid charts, factor tables, adjustment magnitude metrics, and reconciliation to totals.</p>
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