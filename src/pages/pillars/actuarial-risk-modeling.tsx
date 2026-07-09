import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { TrendingUp, BarChart3, Target, Zap, ArrowRight, Activity } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ActuarialRiskModeling() {
  return (
    <>
      <SEO
        title="Actuarial Risk Modeling | Kincaid Health"
        description="Monte Carlo simulation engines for benefit cost forecasting, stop-loss optimization, and multi-year trend projection with confidence intervals and scenario planning."
      />
      <div className="min-h-screen bg-[#0A0F1E]">
        <Nav />

        <section className="relative pt-32 pb-20 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1A3A52]/20 via-transparent to-cyan-500/10" />
          
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-400 mb-6">
                <TrendingUp className="h-4 w-4" />
                Pillar 5 of 8
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
                Actuarial Risk<br />Modeling
              </h1>
              
              <p className="text-xl md:text-2xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
                Monte Carlo simulation engines for benefit cost forecasting, stop-loss optimization, and multi-year trend projection with confidence intervals and scenario planning.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative rounded-xl border border-[#2A3F54] bg-gradient-to-br from-[#151B23] to-[#0F1419] p-8 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent rounded-xl" />
              
              <div className="space-y-6 relative z-10">
                <div className="text-center">
                  <div className="text-sm text-neutral-500 mb-2">3-Year Cost Projection Range (95% Confidence)</div>
                  <div className="flex items-baseline justify-center gap-4 mb-4">
                    <div className="text-3xl font-bold text-cyan-400">$14.2M</div>
                    <div className="text-neutral-600">→</div>
                    <div className="text-3xl font-bold text-orange-400">$18.7M</div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-[#0A0F1E] rounded-lg border border-[#2A3F54] p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <BarChart3 className="h-5 w-5 text-cyan-400" />
                      <div className="text-sm text-neutral-400">Simulations Run</div>
                    </div>
                    <div className="text-2xl font-bold text-white">10,000</div>
                  </div>

                  <div className="bg-[#0A0F1E] rounded-lg border border-[#2A3F54] p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Target className="h-5 w-5 text-[#B8860B]" />
                      <div className="text-sm text-neutral-400">Expected Value</div>
                    </div>
                    <div className="text-2xl font-bold text-white">$16.1M</div>
                  </div>

                  <div className="bg-[#0A0F1E] rounded-lg border border-[#2A3F54] p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Activity className="h-5 w-5 text-emerald-400" />
                      <div className="text-sm text-neutral-400">Optimal SL Attach</div>
                    </div>
                    <div className="text-2xl font-bold text-white">$185K</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-20 border-t border-[#1F2937]">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-12 text-center">
              Credentialed Actuarial Science
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-[#151B23] rounded-lg border border-[#2A3F54] p-8">
                <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Monte Carlo Cost Simulation</h3>
                <p className="text-neutral-400 leading-relaxed">
                  10,000-run simulations model future benefit costs under varying claim frequency, severity, and trend scenarios. Produces confidence intervals, percentile ranges, and tail risk quantification.
                </p>
              </div>

              <div className="bg-[#151B23] rounded-lg border border-[#2A3F54] p-8">
                <div className="w-12 h-12 rounded-full bg-[#B8860B]/10 flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-[#B8860B]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Stop-Loss Optimization</h3>
                <p className="text-neutral-400 leading-relaxed">
                  Calculate optimal specific and aggregate attachment points that balance premium costs against expected reimbursements. Models laser placements for known high-cost claimants.
                </p>
              </div>

              <div className="bg-[#151B23] rounded-lg border border-[#2A3F54] p-8">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Credibility-Weighted Trends</h3>
                <p className="text-neutral-400 leading-relaxed">
                  Apply actuarial credibility theory to blend plan-specific experience with industry benchmarks. Small populations get more industry weighting, large populations trust their own data.
                </p>
              </div>

              <div className="bg-[#151B23] rounded-lg border border-[#2A3F54] p-8">
                <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Multi-Year Forecasting</h3>
                <p className="text-neutral-400 leading-relaxed">
                  Project costs 3-5 years forward incorporating demographic shifts, utilization trends, drug pipeline launches, and contract renewal scenarios. Supports long-term budgeting and M&A modeling.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 border-t border-[#1F2937] bg-[#0A0F1E]">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-12 text-center">
              Scenario Planning
            </h2>

            <div className="space-y-6">
              <div className="bg-[#151B23] rounded-lg border border-[#2A3F54] p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Specialty Drug Impact Modeling</h3>
                <p className="text-neutral-400">
                  Model cost impact of adding/removing specialty medications from formulary. Simulate shift from brand to biosimilar, or adoption of new GLP-1 therapies across eligible population.
                </p>
              </div>

              <div className="bg-[#151B23] rounded-lg border border-[#2A3F54] p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Plan Design Changes</h3>
                <p className="text-neutral-400">
                  Test deductible increases, copay tier shifts, or coinsurance adjustments. Predict member out-of-pocket costs, plan savings, and utilization changes before renewal implementation.
                </p>
              </div>

              <div className="bg-[#151B23] rounded-lg border border-[#2A3F54] p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Carrier Bid Analysis</h3>
                <p className="text-neutral-400">
                  Validate carrier renewal quotes against your own actuarial projections. Identify inflated trend assumptions, excessive margin loads, or understated rebate pass-through.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 border-t border-[#1F2937]">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
              Stop Guessing, Start Modeling
            </h2>
            <p className="text-xl text-neutral-400 mb-8">
              Actuarial precision replaces broker estimates and carrier sales pitches.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/request-demo">
                <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white">
                  See Simulation Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/">
                <Button size="lg" variant="outline" className="border-[#2A3F54] text-white hover:bg-[#151B23]">
                  View All Pillars
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}