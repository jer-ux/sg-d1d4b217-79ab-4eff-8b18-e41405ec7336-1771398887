import Head from "next/head";
import { motion } from "framer-motion";
import Link from "next/link";
import Nav from "@/components/Nav";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ParticleField3D } from "@/components/premium/ParticleField3D";
import Footer from "@/components/Footer";
import { BarChart3, Users, TrendingUp, Settings } from "lucide-react";

export default function DemographicNormalizationPage() {
  return (
    <>
      <Head>
        <title>Demographic Normalization Engine | Kincaid Health</title>
        <meta
          name="description"
          content="Population adjustment for apples-to-apples benchmarking. Age, gender, and dependent mix standardization for accurate cost comparisons."
        />
      </Head>

      <Nav />

      <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black relative overflow-hidden">
        <ParticleField3D />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent" />
        
        <main className="container mx-auto px-4 py-8 relative z-10 mb-16">
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto mb-12"
          >
            <Link href="/engines" className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-6 transition-colors">
              ← Back to Engines
            </Link>
            
            <Badge className="mb-4 bg-purple-500/10 text-purple-400 border-purple-500/20">
              Data Normalization
            </Badge>
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-purple-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent"
            >
              Demographic Normalization
            </motion.h1>
            <p className="text-xl text-gray-300 mb-8 max-w-4xl">
              Population adjustment for apples-to-apples benchmarking with age, gender, and dependent mix standardization for accurate cost comparisons.
            </p>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: "25+", label: "Adjustment Factors", color: "purple" },
                { value: "±5%", label: "Accuracy Range", color: "violet" },
                { value: "Industry", label: "Benchmark Standard", color: "fuchsia" },
                { value: "Real-time", label: "Processing", color: "pink" }
              ].map((metric, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  className="perspective-1000"
                >
                  <Card className="border-slate-700 bg-slate-900/50 backdrop-blur-sm transform-gpu transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20">
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
                  icon: BarChart3,
                  title: "Age-Gender Standardization",
                  description: "Applies actuarial age curves and gender relativities to normalize costs to a standard population distribution for peer group comparisons."
                },
                {
                  icon: Users,
                  title: "Dependent Mix Adjustment",
                  description: "Corrects for employee-only vs family coverage ratios and contract tier distributions to enable valid cross-employer benchmarking."
                },
                {
                  icon: TrendingUp,
                  title: "Geographic Cost Indexing",
                  description: "Adjusts for regional healthcare price variations using ZIP-level cost indices and local market dynamics."
                },
                {
                  icon: Settings,
                  title: "Custom Normalization Profiles",
                  description: "Configurable adjustment methodologies to match specific benchmarking standards, industry norms, or custom reference populations."
                }
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1 + idx * 0.1 }}
                  whileHover={{ scale: 1.02, x: 10 }}
                >
                  <Card className="border-slate-700 bg-slate-900/50 backdrop-blur-sm h-full transform-gpu transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
                    <CardContent className="pt-6">
                      <feature.icon className="w-8 h-8 text-purple-400 mb-4" />
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
                    <span className="font-semibold text-purple-400">Adjustment Methodology:</span>
                    <p className="ml-4">Indirect standardization using relative cost factors derived from large multi-employer databases. Age curves, gender relativities, and dependent tier adjustments applied multiplicatively with confidence intervals.</p>
                  </div>
                  <div>
                    <span className="font-semibold text-purple-400">Reference Population:</span>
                    <p className="ml-4">Industry-standard demographic distributions by sector (e.g., manufacturing, healthcare, retail) with annual updates. Custom reference populations supported for specialized benchmarking.</p>
                  </div>
                  <div>
                    <span className="font-semibold text-purple-400">Output Formats:</span>
                    <p className="ml-4">Normalized PMPM costs, adjustment factor breakdowns, population pyramid comparisons, benchmark deviation metrics, and sensitivity analyses showing impact of demographic differences.</p>
                  </div>
                  <div>
                    <span className="font-semibold text-purple-400">Quality Controls:</span>
                    <p className="ml-4">Validation checks for extreme adjustments, credibility weighting for small populations, outlier detection, and reconciliation to unadjusted totals.</p>
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
                "Employer-to-employer cost benchmarking",
                "Health plan renewal rate justification",
                "Merger & acquisition benefits due diligence",
                "Multi-location workforce cost comparison",
                "Vendor performance evaluation",
                "Board reporting and executive dashboards"
              ].map((useCase, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.8 + idx * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="border-slate-700 bg-slate-900/50 backdrop-blur-sm transform-gpu transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
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