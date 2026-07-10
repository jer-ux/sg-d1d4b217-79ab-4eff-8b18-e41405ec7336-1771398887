import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Activity, Zap, AlertTriangle, Eye, ArrowRight, Radio } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiduciaryPillarsSection } from "@/components/FiduciaryPillarsSection";

export default function RealtimeClaimsSurveillance() {
  return (
    <>
      <SEO
        title="Real-Time Claims Surveillance | Kincaid Health"
        description="Live streaming anomaly detection for prescription claims processing, flagging formulary violations, spread pricing irregularities, and specialty drug overcharges as they occur."
      />
      <div className="min-h-screen bg-[#0A0F1E]">
        <Nav />

        <section className="relative pt-32 pb-20 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1A3A52]/20 via-transparent to-red-500/10" />
          
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12">
              <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-400 mb-6">
                <Activity className="h-4 w-4" />
                Pillar 6 of 8
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
                Real-Time Claims<br />Surveillance
              </h1>
              
              <p className="text-xl md:text-2xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
                Live streaming anomaly detection for prescription claims processing, flagging formulary violations, spread pricing irregularities, and specialty drug overcharges as they occur.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative rounded-xl border border-[#2A3F54] bg-gradient-to-br from-[#151B23] to-[#0F1419] p-8 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-transparent rounded-xl" />
              
              <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-40"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </div>
                    <span className="text-sm font-mono text-red-400">LIVE MONITORING</span>
                  </div>
                  <div className="text-sm text-neutral-500">Updated 2 seconds ago</div>
                </div>

                <div className="grid md:grid-cols-4 gap-4">
                  <div className="bg-[#0A0F1E] rounded-lg border border-[#2A3F54] p-4">
                    <div className="text-xs text-neutral-500 mb-2">Claims Today</div>
                    <div className="text-2xl font-bold text-white">8,247</div>
                    <div className="text-xs text-emerald-400 mt-1">+3.2% vs avg</div>
                  </div>

                  <div className="bg-[#0A0F1E] rounded-lg border border-red-900/30 p-4">
                    <div className="text-xs text-neutral-500 mb-2">Flagged</div>
                    <div className="text-2xl font-bold text-red-400">142</div>
                    <div className="text-xs text-red-400 mt-1">Requires review</div>
                  </div>

                  <div className="bg-[#0A0F1E] rounded-lg border border-[#2A3F54] p-4">
                    <div className="text-xs text-neutral-500 mb-2">Avg Response</div>
                    <div className="text-2xl font-bold text-cyan-400">38s</div>
                    <div className="text-xs text-cyan-400 mt-1">Detection speed</div>
                  </div>

                  <div className="bg-[#0A0F1E] rounded-lg border border-[#2A3F54] p-4">
                    <div className="text-xs text-neutral-500 mb-2">Prevented</div>
                    <div className="text-2xl font-bold text-emerald-400">$47K</div>
                    <div className="text-xs text-emerald-400 mt-1">Today alone</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-20 border-t border-[#1F2937]">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-12 text-center">
              24/7 Forensic Intelligence
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-[#151B23] rounded-lg border border-[#2A3F54] p-8">
                <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-red-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Instant Anomaly Detection</h3>
                <p className="text-neutral-400 leading-relaxed">
                  Every claim tested against 200+ fraud patterns, pricing benchmarks, and contract rules within seconds of adjudication. Machine learning flags statistical outliers and known leakage schemes.
                </p>
              </div>

              <div className="bg-[#151B23] rounded-lg border border-[#2A3F54] p-8">
                <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center mb-4">
                  <AlertTriangle className="h-6 w-6 text-orange-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Priority Alert Routing</h3>
                <p className="text-neutral-400 leading-relaxed">
                  High-value violations ({'>'}$10K) trigger immediate Slack/Teams notifications to plan administrators. Medium alerts queue for weekly review. Low-priority patterns tracked for trend analysis.
                </p>
              </div>

              <div className="bg-[#151B23] rounded-lg border border-[#2A3F54] p-8">
                <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center mb-4">
                  <Eye className="h-6 w-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Pattern Recognition</h3>
                <p className="text-neutral-400 leading-relaxed">
                  AI learns normal claim patterns for your population. Detects subtle shifts—gradual spread increases, new specialty drugs appearing without prior auth, or MAC pricing drift—before they compound.
                </p>
              </div>

              <div className="bg-[#151B23] rounded-lg border border-[#2A3F54] p-8">
                <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mb-4">
                  <Radio className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Live Dashboard Streaming</h3>
                <p className="text-neutral-400 leading-relaxed">
                  Watch claims flow through the system in real-time. See exactly when a high-cost specialty claim hits, what price was paid, and whether it violated contract terms—no waiting for monthly reports.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 border-t border-[#1F2937] bg-[#0A0F1E]">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-12 text-center">
              Detection Rules
            </h2>

            <div className="space-y-6">
              <div className="bg-[#151B23] rounded-lg border border-red-900/30 p-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Spread Pricing Violations</h3>
                    <p className="text-neutral-400">
                      Flag claims where ingredient cost plus dispensing fee exceeds contracted max. Catches AWP inflation, MAC overcharges, and undisclosed admin fees in real-time.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#151B23] rounded-lg border border-orange-900/30 p-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <AlertTriangle className="h-5 w-5 text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Formulary Non-Compliance</h3>
                    <p className="text-neutral-400">
                      Alert when brand drug dispenses but generic equivalent exists on formulary. Detects DAW code abuse and verifies medical exceptions have proper prior authorization.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#151B23] rounded-lg border border-yellow-900/30 p-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <AlertTriangle className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Specialty Drug Overpricing</h3>
                    <p className="text-neutral-400">
                      Compare specialty drug prices to manufacturer WAC, 340B ceiling prices, and Mark Cuban Cost Plus benchmarks. Flag claims exceeding reasonable markup thresholds.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8 Pillars Navigation */}
        <FiduciaryPillarsSection />

        <section className="py-20 border-t border-[#1F2937]">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
              Don't Wait for Monthly Reports
            </h2>
            <p className="text-xl text-neutral-400 mb-8">
              Catch overcharges within hours, not quarters. Real-time detection prevents waste before it compounds.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/request-demo">
                <Button size="lg" className="bg-red-500 hover:bg-red-600 text-white">
                  See Live Monitoring
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