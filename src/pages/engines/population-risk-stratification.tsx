import Head from "next/head";
import { motion } from "framer-motion";
import Link from "next/link";
import Nav from "@/components/Nav";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ParticleField3D } from "@/components/premium/ParticleField3D";
import Footer from "@/components/Footer";
import { Users, TrendingUp, Shield, AlertTriangle } from "lucide-react";

export default function PopulationRiskStratificationPage() {
  return (
    <>
      <Head>
        <title>Population Risk Stratification Engine | Kincaid Health</title>
        <meta
          name="description"
          content="AI-powered population segmentation by risk level. Predictive modeling for high-risk cohort identification and resource allocation optimization."
        />
      </Head>

      <Nav />

      <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black relative overflow-hidden">
        <ParticleField3D />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent" />
        
        <main className="container mx-auto px-4 py-8 relative z-10 mb-16">
          {/* Hero Section */}
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
              Population Analytics
            </Badge>
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent"
            >
              Population Risk Stratification
            </motion.h1>
            <p className="text-xl text-gray-300 mb-8 max-w-4xl">
              AI-powered population segmentation by risk level with predictive modeling for high-risk cohort identification and resource allocation optimization.
            </p>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: "92%", label: "Prediction Accuracy", color: "blue" },
                { value: "5 Tiers", label: "Risk Levels", color: "cyan" },
                { value: "12mo", label: "Forecast Window", color: "teal" },
                { value: "Real-time", label: "Risk Scoring", color: "sky" }
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
                  title: "Multi-Factor Risk Scoring",
                  description: "Combines clinical, demographic, claims, pharmacy, and behavioral data into composite risk scores with transparent weighting methodology."
                },
                {
                  icon: TrendingUp,
                  title: "Predictive Cost Modeling",
                  description: "Machine learning models forecast 12-month healthcare costs by individual with confidence intervals and scenario analysis."
                },
                {
                  icon: Shield,
                  title: "High-Risk Cohort Identification",
                  description: "Automated flagging of members likely to exceed cost thresholds with intervention recommendations and care management prioritization."
                },
                {
                  icon: AlertTriangle,
                  title: "Risk Migration Tracking",
                  description: "Longitudinal monitoring of population movement across risk tiers with root cause analysis and trend attribution."
                }
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1 + idx * 0.1 }}
                  whileHover={{ scale: 1.02, x: 10 }}
                >
                  <Card className="border-slate-700 bg-slate-900/50 backdrop-blur-sm h-full transform-gpu transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
                    <CardContent className="pt-6">
                      <feature.icon className="w-8 h-8 text-blue-400 mb-4" />
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
                    <span className="font-semibold text-blue-400">Risk Stratification Model:</span>
                    <p className="ml-4">Gradient boosting ensemble with XGBoost, CatBoost, and LightGBM algorithms. Features include 200+ clinical indicators, pharmacy utilization patterns, comorbidity indices, and social determinants of health proxies.</p>
                  </div>
                  <div>
                    <span className="font-semibold text-blue-400">Risk Tiers:</span>
                    <p className="ml-4">5-level stratification (Low, Moderate, High, Very High, Catastrophic) based on predicted annual healthcare cost quantiles with dynamic thresholds adjusted for plan population characteristics.</p>
                  </div>
                  <div>
                    <span className="font-semibold text-blue-400">Output Formats:</span>
                    <p className="ml-4">Member-level risk scores, cohort summaries, population heat maps, intervention priority lists, care management rosters, and predictive cost distributions with confidence intervals.</p>
                  </div>
                  <div>
                    <span className="font-semibold text-blue-400">Validation Methodology:</span>
                    <p className="ml-4">Backtesting against historical cohorts, prospective validation on hold-out populations, calibration analysis, discrimination metrics (AUC-ROC, C-statistic), and clinical face validity reviews.</p>
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
                "Care management program enrollment prioritization",
                "Disease management outreach targeting",
                "Wellness program participant selection",
                "Stop-loss laser risk identification",
                "Provider network adequacy planning",
                "Health plan renewal forecasting"
              ].map((useCase, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.8 + idx * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="border-slate-700 bg-slate-900/50 backdrop-blur-sm transform-gpu transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
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