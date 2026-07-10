import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { BarChart3, TrendingUp, Zap, Target, ArrowRight, Brain } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiduciaryPillarsSection } from "@/components/FiduciaryPillarsSection";

export default function PredictiveCostAnalytics() {
  return (
    <>
      <SEO
        title="Predictive Cost Analytics | Kincaid Health"
        description="Machine learning models for future spend forecasting, therapeutic substitution impact analysis, and proactive intervention opportunity identification to prevent cost escalation."
      />
      <div className="min-h-screen bg-[#0A0F1E]">
        <Nav />

        <section className="relative pt-32 pb-20 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1A3A52]/20 via-transparent to-violet-500/10" />
          
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12">
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-400 mb-6">
                <BarChart3 className="h-4 w-4" />
                Pillar 8 of 8
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
                Predictive Cost<br />Analytics
              </h1>
              
              <p className="text-xl md:text-2xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
                Machine learning models for future spend forecasting, therapeutic substitution impact analysis, and proactive intervention opportunity identification to prevent cost escalation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative rounded-xl border border-[#2A3F54] bg-gradient-to-br from-[#151B23] to-[#0F1419] p-8 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-transparent rounded-xl" />
              
              <div className="space-y-6 relative z-10">
                <div className="text-center">
                  <div className="text-sm text-neutral-500 mb-2">Predicted Cost Escalation (Next 90 Days)</div>
                  <div className="text-5xl font-bold text-violet-400 mb-4">$847K</div>
                  <div className="text-xs text-neutral-400">87% confidence interval</div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-[#0A0F1E] rounded-lg border border-[#2A3F54] p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Brain className="h-5 w-5 text-violet-400" />
                      <div className="text-sm text-neutral-400">ML Accuracy</div>
                    </div>
                    <div className="text-2xl font-bold text-white">94.3%</div>
                  </div>

                  <div className="bg-[#0A0F1E] rounded-lg border border-[#2A3F54] p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Target className="h-5 w-5 text-emerald-400" />
                      <div className="text-sm text-neutral-400">Prevented</div>
                    </div>
                    <div className="text-2xl font-bold text-white">$2.1M</div>
                  </div>

                  <div className="bg-[#0A0F1E] rounded-lg border border-[#2A3F54] p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Zap className="h-5 w-5 text-[#B8860B]" />
                      <div className="text-sm text-neutral-400">Active Alerts</div>
                    </div>
                    <div className="text-2xl font-bold text-white">23</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-20 border-t border-[#1F2937]">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-12 text-center">
              AI-Powered Cost Intelligence
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-[#151B23] rounded-lg border border-[#2A3F54] p-8">
                <div className="w-12 h-12 rounded-full bg-violet-500/10 flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-violet-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Future Spend Forecasting</h3>
                <p className="text-neutral-400 leading-relaxed">
                  Neural networks trained on 5+ years of claim patterns predict next quarter's costs with 90%+ accuracy. Identifies emerging cost drivers before they appear in financials—catches trend inflections early.
                </p>
              </div>

              <div className="bg-[#151B23] rounded-lg border border-[#2A3F54] p-8">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Intervention Opportunity Scoring</h3>
                <p className="text-neutral-400 leading-relaxed">
                  AI ranks members by intervention potential—highest savings from therapeutic substitution, GLP-1 discontinuation, or formulary tier optimization. Prioritizes outreach to maximize ROI.
                </p>
              </div>

              <div className="bg-[#151B23] rounded-lg border border-[#2A3F54] p-8">
                <div className="w-12 h-12 rounded-full bg-[#B8860B]/10 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-[#B8860B]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Therapeutic Substitution Impact</h3>
                <p className="text-neutral-400 leading-relaxed">
                  Model exact dollar savings from switching brand to generic, biosimilar adoption, or therapeutic class changes. Shows per-member cost impact, member disruption risk, and net savings timeline.
                </p>
              </div>

              <div className="bg-[#151B23] rounded-lg border border-[#2A3F54] p-8">
                <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Early Warning System</h3>
                <p className="text-neutral-400 leading-relaxed">
                  Detect cost acceleration signals weeks before they become trends. Flag sudden utilization spikes, new high-cost drugs entering population, or formulary drift that compounds over time.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 border-t border-[#1F2937] bg-[#0A0F1E]">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-12 text-center">
              Proactive Cost Prevention
            </h2>

            <div className="space-y-6">
              <div className="bg-[#151B23] rounded-lg border border-[#2A3F54] p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Member Stratification</h3>
                <p className="text-neutral-400">
                  Segment population by cost risk, intervention readiness, and savings potential. Target high-cost chronic members for care management, identify generic switchers, flag therapy adherence gaps.
                </p>
              </div>

              <div className="bg-[#151B23] rounded-lg border border-[#2A3F54] p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Drug Pipeline Intelligence</h3>
                <p className="text-neutral-400">
                  Track FDA approvals, biosimilar launches, and loss of exclusivity timelines. Predict when new therapies will enter your population and model financial impact before first claim hits.
                </p>
              </div>

              <div className="bg-[#151B23] rounded-lg border border-[#2A3F54] p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Utilization Trend Detection</h3>
                <p className="text-neutral-400">
                  Identify statistically significant shifts in prescription patterns—new diagnosis codes appearing, specialty utilization increasing, or formulary compliance declining. Alert before variance becomes material.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 8 Pillars Navigation */}
        <FiduciaryPillarsSection />

        <section className="py-20 border-t border-[#1F2937]">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
              Prevent Tomorrow's Waste Today
            </h2>
            <p className="text-xl text-neutral-400 mb-8">
              Reactive management waits for problems. Predictive intelligence prevents them.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/request-demo">
                <Button size="lg" className="bg-violet-500 hover:bg-violet-600 text-white">
                  See Prediction Demo
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