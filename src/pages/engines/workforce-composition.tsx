import Head from "next/head";
import { motion } from "framer-motion";
import Link from "next/link";
import Nav from "@/components/Nav";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ParticleField3D } from "@/components/premium/ParticleField3D";
import Footer from "@/components/Footer";
import { Users, PieChart, TrendingUp, Building2 } from "lucide-react";

export default function WorkforceCompositionPage() {
  return (
    <>
      <Head>
        <title>Workforce Composition Engine | Kincaid Health</title>
        <meta
          name="description"
          content="Analyze employee demographics, job roles, and organizational structure impact on healthcare costs. Workforce segmentation and cost driver attribution."
        />
      </Head>

      <Nav />

      <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black relative overflow-hidden">
        <ParticleField3D />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/10 via-transparent to-transparent" />
        
        <main className="container mx-auto px-4 py-8 relative z-10 mb-16">
          {/* Hero Section */}
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
              Workforce Analytics
            </Badge>
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent"
            >
              Workforce Composition
            </motion.h1>
            <p className="text-xl text-gray-300 mb-8 max-w-4xl">
              Analyze employee demographics, job roles, and organizational structure impact on healthcare costs with workforce segmentation and cost driver attribution.
            </p>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: "50+", label: "Segmentation Criteria", color: "emerald" },
                { value: "Real-time", label: "Analysis Updates", color: "green" },
                { value: "12mo", label: "Trend Window", color: "teal" },
                { value: "Multi-site", label: "Location Support", color: "lime" }
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
          </motion.div>

          {/* Features Grid */}
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
                  title: "Demographic Segmentation",
                  description: "Multi-dimensional workforce analysis by age bands, gender, tenure, job role, department, location, salary band, and employment status (full-time, part-time, union)."
                },
                {
                  icon: PieChart,
                  title: "Cost Driver Attribution",
                  description: "Statistical modeling to isolate workforce composition effects on healthcare costs from other factors like benefit design, network, and medical trend."
                },
                {
                  icon: TrendingUp,
                  title: "Cohort Trend Analysis",
                  description: "Longitudinal tracking of cost patterns by workforce segment with detection of emerging high-cost cohorts and intervention opportunities."
                },
                {
                  icon: Building2,
                  title: "Organizational Structure Impact",
                  description: "Analysis of how business unit composition, shift patterns, remote work arrangements, and organizational changes affect healthcare utilization and costs."
                }
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1 + idx * 0.1 }}
                  whileHover={{ scale: 1.02, x: 10 }}
                >
                  <Card className="border-slate-700 bg-slate-900/50 backdrop-blur-sm h-full transform-gpu transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10">
                    <CardContent className="pt-6">
                      <feature.icon className="w-8 h-8 text-emerald-400 mb-4" />
                      <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                      <p className="text-gray-400 text-sm">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Technical Specifications */}
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
                    <span className="font-semibold text-emerald-400">Data Integration:</span>
                    <p className="ml-4">Combines HRIS data (employee demographics, job codes, org structure), eligibility feeds, and claims/pharmacy data with automated reconciliation and data quality scoring.</p>
                  </div>
                  <div>
                    <span className="font-semibold text-emerald-400">Segmentation Methodology:</span>
                    <p className="ml-4">Hierarchical clustering with decision tree analysis to identify meaningful workforce segments. Includes custom segment definitions and what-if scenario modeling for workforce changes.</p>
                  </div>
                  <div>
                    <span className="font-semibold text-emerald-400">Output Formats:</span>
                    <p className="ml-4">Interactive dashboards by workforce segment, cost per segment reports, population pyramids, tenure-cost curves, hot spot heat maps, and executive summary scorecards.</p>
                  </div>
                  <div>
                    <span className="font-semibold text-emerald-400">Privacy Compliance:</span>
                    <p className="ml-4">Cell suppression for segments under minimum size thresholds, aggregated reporting only, HIPAA-compliant data handling, and role-based access controls.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Use Cases */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.6 }}
            className="max-w-6xl mx-auto mt-12"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Common Use Cases</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                "Merger integration benefits planning",
                "Targeted wellness program design",
                "High-cost segment intervention strategies",
                "Multi-site benefit design optimization",
                "Workforce planning with benefits cost impact",
                "Union vs non-union cost comparison"
              ].map((useCase, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.8 + idx * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="border-slate-700 bg-slate-900/50 backdrop-blur-sm transform-gpu transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10">
                    <CardContent className="pt-6">
                      <p className="text-gray-300">{useCase}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </main>
      </div>

      <Footer />
    </>
  );
}