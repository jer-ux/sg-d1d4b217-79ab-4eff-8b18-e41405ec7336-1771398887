import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Shield, TrendingUp, DollarSign, BarChart3, ArrowRight, Target } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function FinancialImpactAnalysis() {
  return (
    <>
      <SEO
        title="Financial Impact Analysis | Kincaid Health"
        description="Quantitative assessment of pharmacy benefit optimization on enterprise profitability. Direct measurement of prescription cost containment effects on operating margins."
      />
      <div className="min-h-screen bg-[#0A0F1E]">
        <Nav />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1A3A52]/20 via-transparent to-emerald-500/10" />
          
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400 mb-6">
                <Shield className="h-4 w-4" />
                Pillar 2 of 8
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
                Financial Impact<br />Analysis
              </h1>
              
              <p className="text-xl md:text-2xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
                Quantitative assessment of pharmacy benefit optimization on enterprise profitability. Direct measurement of prescription cost containment effects on operating margins.
              </p>
            </motion.div>

            {/* Hero Graphic - EBITDA Impact */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative rounded-xl border border-[#2A3F54] bg-gradient-to-br from-[#151B23] to-[#0F1419] p-8 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent rounded-xl" />
              
              <div className="space-y-6 relative z-10">
                <div className="text-center">
                  <div className="text-sm text-neutral-500 mb-2">Annual EBITDA Impact</div>
                  <div className="text-5xl font-bold text-emerald-400 mb-4">+$4.8M</div>
                  <div className="text-xs text-neutral-400">From PBM cost containment alone</div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-[#0A0F1E] rounded-lg border border-[#2A3F54] p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp className="h-5 w-5 text-emerald-400" />
                      <div className="text-sm text-neutral-400">Margin Lift</div>
                    </div>
                    <div className="text-2xl font-bold text-white">+3.2%</div>
                  </div>

                  <div className="bg-[#0A0F1E] rounded-lg border border-[#2A3F54] p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <DollarSign className="h-5 w-5 text-blue-400" />
                      <div className="text-sm text-neutral-400">Cost Avoidance</div>
                    </div>
                    <div className="text-2xl font-bold text-white">$6.1M</div>
                  </div>

                  <div className="bg-[#0A0F1E] rounded-lg border border-[#2A3F54] p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Target className="h-5 w-5 text-[#B8860B]" />
                      <div className="text-sm text-neutral-400">ROI Multiple</div>
                    </div>
                    <div className="text-2xl font-bold text-white">17.2x</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-20 border-t border-[#1F2937]">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-12 text-center">
              Direct Line to Operating Performance
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-[#151B23] rounded-lg border border-[#2A3F54] p-8">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">EBITDA Waterfall Analysis</h3>
                <p className="text-neutral-400 leading-relaxed">
                  Decompose pharmacy benefit costs into their EBITDA components. Show CFOs exactly how PBM optimization flows through to operating margins and free cash flow generation.
                </p>
              </div>

              <div className="bg-[#151B23] rounded-lg border border-[#2A3F54] p-8">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                  <DollarSign className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Cost per PMPM Attribution</h3>
                <p className="text-neutral-400 leading-relaxed">
                  Break down total per-member-per-month costs by leakage source. Identify which contract failures are draining the most capital per covered employee.
                </p>
              </div>

              <div className="bg-[#151B23] rounded-lg border border-[#2A3F54] p-8">
                <div className="w-12 h-12 rounded-full bg-[#B8860B]/10 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-[#B8860B]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Multi-Year Margin Projections</h3>
                <p className="text-neutral-400 leading-relaxed">
                  Model the compounding impact of cost containment strategies over 3-5 year planning horizons. Show boards the cumulative EBITDA protection from continuous monitoring.
                </p>
              </div>

              <div className="bg-[#151B23] rounded-lg border border-[#2A3F54] p-8">
                <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Earnings Risk Quantification</h3>
                <p className="text-neutral-400 leading-relaxed">
                  Calculate the dollar amount of EBITDA at risk from unmonitored PBM contracts. Translate fiduciary exposure into financial statement impact executives understand.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CFO Use Cases */}
        <section className="py-20 border-t border-[#1F2937] bg-[#0A0F1E]">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-12 text-center">
              Built for CFO Decision-Making
            </h2>

            <div className="space-y-6">
              <div className="bg-[#151B23] rounded-lg border border-[#2A3F54] p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Board Earnings Presentations</h3>
                <p className="text-neutral-400">
                  Present pharmacy benefit cost containment as a tangible earnings protection strategy. Show audit committees how continuous monitoring defends EBITDA against healthcare inflation.
                </p>
              </div>

              <div className="bg-[#151B23] rounded-lg border border-[#2A3F54] p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Investor Relations Narratives</h3>
                <p className="text-neutral-400">
                  Quantify healthcare cost management initiatives in earnings calls. Demonstrate margin stability through proactive benefit cost controls backed by forensic intelligence.
                </p>
              </div>

              <div className="bg-[#151B23] rounded-lg border border-[#2A3F54] p-6">
                <h3 className="text-lg font-semibold text-white mb-2">M&A Due Diligence Defense</h3>
                <p className="text-neutral-400">
                  In acquisition targets, prove clean EBITDA quality by showing healthcare costs are properly controlled. In buyers, identify EBITDA upside from fixing target's PBM leakage.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 border-t border-[#1F2937]">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
              Protect Your Operating Margins
            </h2>
            <p className="text-xl text-neutral-400 mb-8">
              Unmonitored PBM contracts leak 15-30% of healthcare spend directly from EBITDA.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/request-demo">
                <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white">
                  See EBITDA Impact Demo
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