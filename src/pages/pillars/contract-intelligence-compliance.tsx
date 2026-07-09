import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { FileText, Scale, AlertTriangle, CheckCircle2, ArrowRight, Search } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ContractIntelligenceCompliance() {
  return (
    <>
      <SEO
        title="Contract Intelligence & Compliance | Kincaid Health"
        description="Automated PBM contract clause extraction, fiduciary scoring, and continuous monitoring of contractual guarantee fulfillment against actual performance metrics."
      />
      <div className="min-h-screen bg-[#0A0F1E]">
        <Nav />

        <section className="relative pt-32 pb-20 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1A3A52]/20 via-transparent to-purple-500/10" />
          
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12">
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-400 mb-6">
                <FileText className="h-4 w-4" />
                Pillar 4 of 8
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
                Contract Intelligence<br />& Compliance
              </h1>
              
              <p className="text-xl md:text-2xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
                Automated PBM contract clause extraction, fiduciary scoring, and continuous monitoring of contractual guarantee fulfillment against actual performance metrics.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative rounded-xl border border-[#2A3F54] bg-gradient-to-br from-[#151B23] to-[#0F1419] p-8 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent rounded-xl" />
              
              <div className="space-y-6 relative z-10">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-[#0A0F1E] rounded-lg border border-[#2A3F54] p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                        <AlertTriangle className="h-5 w-5 text-red-400" />
                      </div>
                      <div className="text-2xl font-bold text-white">34</div>
                    </div>
                    <div className="text-sm text-neutral-400">Active Violations</div>
                    <div className="mt-2 text-xs text-red-400">Requires action</div>
                  </div>

                  <div className="bg-[#0A0F1E] rounded-lg border border-[#2A3F54] p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-[#B8860B]/10 flex items-center justify-center">
                        <Scale className="h-5 w-5 text-[#B8860B]" />
                      </div>
                      <div className="text-2xl font-bold text-white">127</div>
                    </div>
                    <div className="text-sm text-neutral-400">Monitored Clauses</div>
                    <div className="mt-2 text-xs text-[#B8860B]">Per contract</div>
                  </div>

                  <div className="bg-[#0A0F1E] rounded-lg border border-[#2A3F54] p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                        <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                      </div>
                      <div className="text-2xl font-bold text-white">91%</div>
                    </div>
                    <div className="text-sm text-neutral-400">Compliance Score</div>
                    <div className="mt-2 text-xs text-emerald-400">This quarter</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-20 border-t border-[#1F2937]">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-12 text-center">
              Continuous Contract Enforcement
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-[#151B23] rounded-lg border border-[#2A3F54] p-8">
                <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Automated Clause Extraction</h3>
                <p className="text-neutral-400 leading-relaxed">
                  NLP-powered parsing of PBM, TPA, and carrier contracts. Extracts pricing guarantees, rebate terms, audit rights, MAC definitions, and fiduciary obligations into structured fields.
                </p>
              </div>

              <div className="bg-[#151B23] rounded-lg border border-[#2A3F54] p-8">
                <div className="w-12 h-12 rounded-full bg-[#B8860B]/10 flex items-center justify-center mb-4">
                  <Scale className="h-6 w-6 text-[#B8860B]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Fiduciary Risk Scoring</h3>
                <p className="text-neutral-400 leading-relaxed">
                  Every clause rated for ERISA compliance risk. Red-flag provisions like discretionary AWP benchmarks, undisclosed rebate retention, or limited audit windows surface immediately.
                </p>
              </div>

              <div className="bg-[#151B23] rounded-lg border border-[#2A3F54] p-8">
                <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
                  <AlertTriangle className="h-6 w-6 text-red-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Real-Time Violation Detection</h3>
                <p className="text-neutral-400 leading-relaxed">
                  Claims data continuously tested against contractual obligations. Spread pricing exceeding agreed caps, rebate pass-through failures, or MAC overages flagged within 24 hours of occurrence.
                </p>
              </div>

              <div className="bg-[#151B23] rounded-lg border border-[#2A3F54] p-8">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Negotiation Intelligence</h3>
                <p className="text-neutral-400 leading-relaxed">
                  Compare your contract terms against peer benchmarks and industry standards. Identify weak audit rights, excessive discretionary pricing, or missing fiduciary protections before renewal.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 border-t border-[#1F2937] bg-[#0A0F1E]">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-12 text-center">
              Contract Red Flags
            </h2>

            <div className="space-y-6">
              <div className="bg-[#151B23] rounded-lg border border-red-900/30 p-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Discretionary AWP Benchmarks</h3>
                    <p className="text-neutral-400">
                      "PBM may use AWP as published by a nationally recognized source" gives PBM power to pick highest AWP. Require specific source (First Databank, Medi-Span) with quarterly snapshot dates.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#151B23] rounded-lg border border-red-900/30 p-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Limited Audit Rights</h3>
                    <p className="text-neutral-400">
                      "Annual audit, 30-day notice, limited to financial records" prevents continuous monitoring. Demand unlimited audit rights covering MAC lists, rebate calculations, and spread pricing methodologies.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#151B23] rounded-lg border border-red-900/30 p-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Undisclosed Rebate Retention</h3>
                    <p className="text-neutral-400">
                      "PBM shall share manufacturer rebates subject to GPO agreements" hides retained rebates. Require 100% pass-through disclosure with manufacturer names, rebate amounts, and retention justifications.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 border-t border-[#1F2937]">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
              Know What You Signed
            </h2>
            <p className="text-xl text-neutral-400 mb-8">
              Most plans don't know their own contract terms. We make them enforceable.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/request-demo">
                <Button size="lg" className="bg-purple-500 hover:bg-purple-600 text-white">
                  Analyze Your Contract
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