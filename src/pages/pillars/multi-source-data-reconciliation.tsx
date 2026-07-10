import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Database, GitMerge, CheckCircle2, AlertCircle, ArrowRight, Layers } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiduciaryPillarsSection } from "@/components/FiduciaryPillarsSection";

export default function MultiSourceDataReconciliation() {
  return (
    <>
      <SEO
        title="Multi-Source Data Reconciliation | Kincaid Health"
        description="Integration and normalization of claims data, contract formularies, and pricing benchmarks across disparate healthcare data sources for actuarial analysis."
      />
      <div className="min-h-screen bg-[#0A0F1E]">
        <Nav />

        <section className="relative pt-32 pb-20 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1A3A52]/20 via-transparent to-blue-500/10" />
          
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-400 mb-6">
                <Database className="h-4 w-4" />
                Pillar 3 of 8
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
                Multi-Source Data<br />Reconciliation
              </h1>
              
              <p className="text-xl md:text-2xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
                Integration and normalization of claims data, contract formularies, and pricing benchmarks across disparate healthcare data sources for actuarial analysis.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative rounded-xl border border-[#2A3F54] bg-gradient-to-br from-[#151B23] to-[#0F1419] p-8 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent rounded-xl" />
              
              <div className="space-y-6 relative z-10">
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="bg-[#0A0F1E] rounded-lg border border-[#2A3F54] p-4">
                    <div className="text-xs text-neutral-500 mb-2">Data Sources</div>
                    <div className="text-2xl font-bold text-blue-400">14</div>
                    <div className="text-xs text-neutral-400 mt-1">Systems integrated</div>
                  </div>

                  <div className="bg-[#0A0F1E] rounded-lg border border-[#2A3F54] p-4">
                    <div className="text-xs text-neutral-500 mb-2">Records Processed</div>
                    <div className="text-2xl font-bold text-emerald-400">2.4M</div>
                    <div className="text-xs text-neutral-400 mt-1">Per month</div>
                  </div>

                  <div className="bg-[#0A0F1E] rounded-lg border border-[#2A3F54] p-4">
                    <div className="text-xs text-neutral-500 mb-2">Match Rate</div>
                    <div className="text-2xl font-bold text-[#B8860B]">99.7%</div>
                    <div className="text-xs text-neutral-400 mt-1">Automated</div>
                  </div>

                  <div className="bg-[#0A0F1E] rounded-lg border border-[#2A3F54] p-4">
                    <div className="text-xs text-neutral-500 mb-2">Processing Time</div>
                    <div className="text-2xl font-bold text-purple-400">4.2s</div>
                    <div className="text-xs text-neutral-400 mt-1">Average</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-20 border-t border-[#1F2937]">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-12 text-center">
              Universal Healthcare Data Integration
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-[#151B23] rounded-lg border border-[#2A3F54] p-8">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                  <GitMerge className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Automated Schema Mapping</h3>
                <p className="text-neutral-400 leading-relaxed">
                  AI-powered field mapping across 837, 835, flat files, and custom PBM formats. No manual configuration—system learns structure from headers and validates against healthcare standards.
                </p>
              </div>

              <div className="bg-[#151B23] rounded-lg border border-[#2A3F54] p-8">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Real-Time Validation</h3>
                <p className="text-neutral-400 leading-relaxed">
                  Every ingested record validated against NDC directories, ICD-10 codes, provider NPIs, and contract formularies. Errors flagged with specific remediation steps before processing continues.
                </p>
              </div>

              <div className="bg-[#151B23] rounded-lg border border-[#2A3F54] p-8">
                <div className="w-12 h-12 rounded-full bg-[#B8860B]/10 flex items-center justify-center mb-4">
                  <Layers className="h-6 w-6 text-[#B8860B]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Cross-System Deduplication</h3>
                <p className="text-neutral-400 leading-relaxed">
                  Fuzzy matching algorithms identify duplicate claims across PBM, TPA, and carrier systems. Resolves conflicts using hierarchical trust scoring—actual adjudicated claim data wins.
                </p>
              </div>

              <div className="bg-[#151B23] rounded-lg border border-[#2A3F54] p-8">
                <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mb-4">
                  <Database className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Universal Data Model</h3>
                <p className="text-neutral-400 leading-relaxed">
                  All data normalized into actuarial-grade common format. Compatible with industry simulation tools, fiduciary reporting standards, and regulatory submission requirements.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 border-t border-[#1F2937] bg-[#0A0F1E]">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-12 text-center">
              Data Quality Engineering
            </h2>

            <div className="space-y-6">
              <div className="bg-[#151B23] rounded-lg border border-[#2A3F54] p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Completeness Enforcement</h3>
                <p className="text-neutral-400">
                  Reject incomplete records upstream before they corrupt analysis. Required fields enforced per claim type—Rx claims need NDC, medical claims need procedure codes, all need member IDs.
                </p>
              </div>

              <div className="bg-[#151B23] rounded-lg border border-[#2A3F54] p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Pricing Benchmark Integration</h3>
                <p className="text-neutral-400">
                  Enrich claims with AWP, WAC, NADAC, and MAC pricing from First Databank and Medi-Span. Historical pricing tracked—catch retroactive spread adjustments and AWP inflation schemes.
                </p>
              </div>

              <div className="bg-[#151B23] rounded-lg border border-[#2A3F54] p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Contract Terms Matching</h3>
                <p className="text-neutral-400">
                  Map every claim to its governing contract provision. Automated lookup tables link NDCs to formulary tiers, providers to network rates, and specialty drugs to carve-out terms.
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
              Turn Data Chaos Into Actuarial Truth
            </h2>
            <p className="text-xl text-neutral-400 mb-8">
              Manual reconciliation takes weeks and introduces errors. Automation delivers perfection in hours.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/request-demo">
                <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white">
                  See Integration Demo
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