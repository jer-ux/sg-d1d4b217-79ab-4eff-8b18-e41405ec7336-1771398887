import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Award, Scale, FileCheck, Shield, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiduciaryPillarsSection } from "@/components/FiduciaryPillarsSection";

export default function RegulatoryLegalFramework() {
  return (
    <>
      <SEO
        title="Regulatory & Legal Framework | Kincaid Health"
        description="ERISA fiduciary compliance validation, DOL audit readiness, and CAA transparency requirements enforcement with automated legal documentation and evidence preservation."
      />
      <div className="min-h-screen bg-[#0A0F1E]">
        <Nav />

        <section className="relative pt-32 pb-20 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1A3A52]/20 via-transparent to-indigo-500/10" />
          
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-400 mb-6">
                <Award className="h-4 w-4" />
                Pillar 7 of 8
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
                Regulatory & Legal<br />Framework
              </h1>
              
              <p className="text-xl md:text-2xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
                ERISA fiduciary compliance validation, DOL audit readiness, and CAA transparency requirements enforcement with automated legal documentation and evidence preservation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative rounded-xl border border-[#2A3F54] bg-gradient-to-br from-[#151B23] to-[#0F1419] p-8 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent rounded-xl" />
              
              <div className="space-y-6 relative z-10">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-[#0A0F1E] rounded-lg border border-[#2A3F54] p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                        <FileCheck className="h-5 w-5 text-emerald-400" />
                      </div>
                      <div className="text-2xl font-bold text-white">100%</div>
                    </div>
                    <div className="text-sm text-neutral-400">DOL Audit Ready</div>
                    <div className="mt-2 text-xs text-emerald-400">Complete trail</div>
                  </div>

                  <div className="bg-[#0A0F1E] rounded-lg border border-[#2A3F54] p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-[#B8860B]/10 flex items-center justify-center">
                        <Scale className="h-5 w-5 text-[#B8860B]" />
                      </div>
                      <div className="text-2xl font-bold text-white">47</div>
                    </div>
                    <div className="text-sm text-neutral-400">ERISA Obligations</div>
                    <div className="mt-2 text-xs text-[#B8860B]">Validated</div>
                  </div>

                  <div className="bg-[#0A0F1E] rounded-lg border border-[#2A3F54] p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                        <Shield className="h-5 w-5 text-blue-400" />
                      </div>
                      <div className="text-2xl font-bold text-white">CAA</div>
                    </div>
                    <div className="text-sm text-neutral-400">Compliant</div>
                    <div className="mt-2 text-xs text-blue-400">Full transparency</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-20 border-t border-[#1F2937]">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-12 text-center">
              Built for Regulatory Defense
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-[#151B23] rounded-lg border border-[#2A3F54] p-8">
                <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center mb-4">
                  <Scale className="h-6 w-6 text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">ERISA 404(c) Safe Harbor</h3>
                <p className="text-neutral-400 leading-relaxed">
                  Document continuous monitoring, prudent vendor selection, and reasonable fee benchmarking. Automated evidence collection proves fiduciary duty of care under ERISA Section 404.
                </p>
              </div>

              <div className="bg-[#151B23] rounded-lg border border-[#2A3F54] p-8">
                <div className="w-12 h-12 rounded-full bg-[#B8860B]/10 flex items-center justify-center mb-4">
                  <FileCheck className="h-6 w-6 text-[#B8860B]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">DOL Audit Response Package</h3>
                <p className="text-neutral-400 leading-relaxed">
                  One-click export of complete fiduciary documentation for Department of Labor investigations. Includes monitoring logs, vendor oversight records, and fee benchmarking analysis.
                </p>
              </div>

              <div className="bg-[#151B23] rounded-lg border border-[#2A3F54] p-8">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">CAA Transparency Compliance</h3>
                <p className="text-neutral-400 leading-relaxed">
                  Automated reporting meets Consolidated Appropriations Act requirements for prescription drug reporting, broker compensation disclosure, and PBM rebate pass-through documentation.
                </p>
              </div>

              <div className="bg-[#151B23] rounded-lg border border-[#2A3F54] p-8">
                <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Legal Discovery Preparation</h3>
                <p className="text-neutral-400 leading-relaxed">
                  In excessive fee or breach of fiduciary duty litigation, produce complete audit trail with timestamps, methodology documentation, and independent actuarial validation certificates.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 border-t border-[#1F2937] bg-[#0A0F1E]">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-12 text-center">
              Fiduciary Obligations Covered
            </h2>

            <div className="space-y-6">
              <div className="bg-[#151B23] rounded-lg border border-[#2A3F54] p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Duty of Prudence (ERISA §404(a)(1)(B))</h3>
                <p className="text-neutral-400">
                  Document regular review of service provider fees, continuous monitoring of contract performance, and periodic benchmarking against industry standards. Prove care, skill, and diligence.
                </p>
              </div>

              <div className="bg-[#151B23] rounded-lg border border-[#2A3F54] p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Duty of Loyalty (ERISA §404(a)(1)(A))</h3>
                <p className="text-neutral-400">
                  Demonstrate exclusive benefit to plan participants through documented cost containment actions, recovery of overcharges, and elimination of conflicts of interest in vendor relationships.
                </p>
              </div>

              <div className="bg-[#151B23] rounded-lg border border-[#2A3F54] p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Prohibited Transactions (ERISA §406)</h3>
                <p className="text-neutral-400">
                  Identify and flag potential self-dealing arrangements, undisclosed compensation, and improper benefit sharing between service providers that could trigger prohibited transaction penalties.
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
              Survive Any Audit
            </h2>
            <p className="text-xl text-neutral-400 mb-8">
              DOL, participant litigation, or board inquiry—automated compliance beats reactive scrambling.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/request-demo">
                <Button size="lg" className="bg-indigo-500 hover:bg-indigo-600 text-white">
                  See Compliance Demo
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