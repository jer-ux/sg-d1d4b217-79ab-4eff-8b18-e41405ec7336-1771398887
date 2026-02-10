import { motion } from "framer-motion";
import Link from "next/link";
import { Award, CheckCircle2, FileCheck, ArrowRight, Target, TrendingUp, Users, Heart, Shield, Star, BarChart3, Activity } from "lucide-react";
import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function QualityAssurance() {
  const qualityMetrics = [
    { label: "HEDIS Scores", value: "92.4%", icon: Award },
    { label: "Star Rating", value: "4.8/5.0", icon: Star },
    { label: "NCQA Accredited", value: "100%", icon: Shield },
    { label: "Quality ROI", value: "3.2:1", icon: TrendingUp },
  ];

  return (
    <>
      <SEO
        title="Quality Assurance & HEDIS | SiriusB iQ"
        description="Achieve 92.4% HEDIS scores and 4.8/5.0 star ratings through comprehensive quality assurance programs and NCQA accreditation support."
      />
      <div className="min-h-screen bg-black text-white">
        <Nav />

        <main className="pt-24 pb-20">
          <section className="px-4 mb-20">
            <div className="max-w-7xl mx-auto">
              <Link href="/actuarial-benefits" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 transition-colors">
                <ArrowRight className="w-4 h-4 rotate-180" />
                Back to Solutions
              </Link>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded-3xl blur-3xl" />
                <div className="relative">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/20 to-yellow-500/20 border border-yellow-500/30">
                      <Award className="w-12 h-12 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-yellow-400 font-semibold mb-1">Clinical Excellence</p>
                      <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent">
                        Quality Assurance
                      </h1>
                    </div>
                  </div>
                  <p className="text-xl md:text-2xl text-gray-300 max-w-4xl">
                    Comprehensive quality management programs delivering measurable improvements in clinical outcomes, member satisfaction, and regulatory compliance.
                  </p>
                </div>
              </motion.div>

              <div className="grid md:grid-cols-4 gap-6 mt-12">
                {qualityMetrics.map((metric, index) => {
                  const Icon = metric.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-6 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-yellow-500/50 transition-colors"
                    >
                      <Icon className="w-8 h-8 text-yellow-400 mb-3" />
                      <div className="text-3xl font-bold mb-1">{metric.value}</div>
                      <div className="text-sm text-gray-400">{metric.label}</div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="p-12 rounded-3xl bg-gradient-to-br from-amber-500/10 to-yellow-500/10 border border-yellow-500/30">
                <Award className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Elevate Your Quality Performance
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Schedule a quality gap analysis and improvement roadmap session
                </p>
                <Link href="/request-demo">
                  <button className="px-8 py-4 bg-gradient-to-r from-amber-600 to-yellow-600 rounded-full text-white font-semibold text-lg flex items-center gap-2 mx-auto hover:scale-105 transition-transform">
                    Request Quality Assessment
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}