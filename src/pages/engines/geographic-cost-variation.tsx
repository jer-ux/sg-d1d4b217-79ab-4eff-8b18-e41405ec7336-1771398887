import Head from "next/head";
import { motion } from "framer-motion";
import Link from "next/link";
import Nav from "@/components/Nav";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ParticleField3D } from "@/components/premium/ParticleField3D";
import Footer from "@/components/Footer";
import { MapPin, DollarSign, TrendingUp, Map } from "lucide-react";

export default function GeographicCostVariationPage() {
  return (
    <>
      <Head>
        <title>Geographic Cost Variation Engine | Kincaid Health</title>
        <meta
          name="description"
          content="Regional healthcare price indexing and geographic cost adjustments. ZIP-level cost indices for accurate multi-location benchmarking."
        />
      </Head>

      <Nav />

      <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black relative overflow-hidden">
        <ParticleField3D />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-900/10 via-transparent to-transparent" />
        
        <main className="container mx-auto px-4 py-8 relative z-10 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto mb-12"
          >
            <Link href="/engines" className="inline-flex items-center text-teal-400 hover:text-teal-300 mb-6 transition-colors">
              ← Back to Engines
            </Link>
            
            <Badge className="mb-4 bg-teal-500/10 text-teal-400 border-teal-500/20">
              Geographic Analytics
            </Badge>
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent"
            >
              Geographic Cost Variation
            </motion.h1>
            <p className="text-xl text-gray-300 mb-8 max-w-4xl">
              Regional healthcare price indexing and geographic cost adjustments with ZIP-level cost indices for accurate multi-location benchmarking.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: "42K+", label: "ZIP Codes", color: "teal" },
                { value: "3.2x", label: "Max Variation", color: "cyan" },
                { value: "MSA", label: "Market Granularity", color: "blue" },
                { value: "Quarterly", label: "Index Updates", color: "sky" }
              ].map((metric, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  className="perspective-1000"
                >
                  <Card className="border-slate-700 bg-slate-900/50 backdrop-blur-sm transform-gpu transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/20">
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
                  icon: MapPin,
                  title: "ZIP-Level Cost Indices",
                  description: "Granular healthcare cost indices by ZIP code based on allowed amounts from millions of commercial claims covering hospital, physician, and outpatient facility pricing."
                },
                {
                  icon: DollarSign,
                  title: "Provider Price Variation",
                  description: "Quantifies local market dynamics including hospital concentration, physician supply, cost of living adjustments, and Medicare wage index correlation."
                },
                {
                  icon: TrendingUp,
                  title: "Multi-Location Normalization",
                  description: "Adjusts costs for employers with workers in multiple states or MSAs to enable valid cross-location comparisons and resource allocation decisions."
                },
                {
                  icon: Map,
                  title: "Network Adequacy Mapping",
                  description: "Overlays employee residence ZIP codes with provider network coverage and cost indices to identify coverage gaps and high-cost service areas."
                }
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1 + idx * 0.1 }}
                  whileHover={{ scale: 1.02, x: 10 }}
                >
                  <Card className="border-slate-700 bg-slate-900/50 backdrop-blur-sm h-full transform-gpu transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/10">
                    <CardContent className="pt-6">
                      <feature.icon className="w-8 h-8 text-teal-400 mb-4" />
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
                    <span className="font-semibold text-teal-400">Data Sources:</span>
                    <p className="ml-4">Fair Health, HCCI, CMS Geographic Adjustment Factors, Medicare Wage Index, and proprietary commercial claim databases with annual refreshes and quarterly trending.</p>
                  </div>
                  <div>
                    <span className="font-semibold text-teal-400">Index Methodology:</span>
                    <p className="ml-4">Relative cost indices normalized to national average = 1.00. Separate indices for inpatient, outpatient, professional services, and pharmacy with service-mix weighting.</p>
                  </div>
                  <div>
                    <span className="font-semibold text-teal-400">Output Formats:</span>
                    <p className="ml-4">Interactive heat maps, cost by ZIP tables, location-adjusted PMPM, migration cost impact models, and multi-site benchmark reports.</p>
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