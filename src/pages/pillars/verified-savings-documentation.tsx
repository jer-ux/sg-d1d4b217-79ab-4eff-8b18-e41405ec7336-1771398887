import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { FileText, CheckCircle, Clock, Shield, Database, ArrowRight, Download } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function VerifiedSavingsDocumentation() {
  return (
    <>
      <SEO
        title="Verified Savings Documentation | Kincaid Health"
        description="Timestamped audit trail documenting contract compliance events, overcharge recoveries, and third-party verification records with complete chain of custody."
      />
      <div className="min-h-screen bg-[#0A0F1E]">
        <Nav />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1A3A52]/20 via-transparent to-[#B8860B]/10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#B8860B]/10 via-transparent to-transparent" />
          
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#B8860B]/30 bg-[#B8860B]/10 px-4 py-2 text-sm text-[#B8860B] mb-6">
                <FileText className="h-4 w-4" />
                Pillar 1 of 8
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
                Verified Savings<br />Documentation
              </h1>
              
              <p className="text-xl md:text-2xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
                Timestamped audit trail documenting contract compliance events, overcharge recoveries, and third-party verification records with complete chain of custody.
              </p>
            </motion.div>

            {/* Hero Graphic */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative rounded-xl border border-[#2A3F54] bg-gradient-to-br from-[#151B23] to-[#0F1419] p-8 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-[#B8860B]/5 via-transparent to-transparent rounded-xl" />
              
              <div className="grid md:grid-cols-3 gap-6 relative z-10">
                <div className="bg-[#0A0F1E] rounded-lg border border-[#2A3F54] p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div className="text-2xl font-bold text-white">847</div>
                  </div>
                  <div className="text-sm text-neutral-400">Documented Savings Events</div>
                  <div className="mt-2 text-xs text-emerald-400">+12% this month</div>
                </div>

                <div className="bg-[#0A0F1E] rounded-lg border border-[#2A3F54] p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#B8860B]/10 flex items-center justify-center">
                      <Shield className="h-5 w-5 text-[#B8860B]" />
                    </div>
                    <div className="text-2xl font-bold text-white">$12.4M</div>
                  </div>
                  <div className="text-sm text-neutral-400">Verified Recoveries</div>
                  <div className="mt-2 text-xs text-[#B8860B]">Fully audited</div>
                </div>

                <div className="bg-[#0A0F1E] rounded-lg border border-[#2A3F54] p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <Database className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="text-2xl font-bold text-white">100%</div>
                  </div>
                  <div className="text-sm text-neutral-400">Chain of Custody</div>
                  <div className="mt-2 text-xs text-blue-400">Complete trail</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-20 border-t border-[#1F2937]">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-12 text-center">
              Audit-Ready Documentation Standards
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-[#151B23] rounded-lg border border-[#2A3F54] p-8">
                <div className="w-12 h-12 rounded-full bg-[#B8860B]/10 flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-[#B8860B]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Timestamped Evidence</h3>
                <p className="text-neutral-400 leading-relaxed">
                  Every claim event, contract violation, and recovery action is captured with cryptographic timestamps. Immutable audit trail survives DOL inquiries and legal discovery.
                </p>
              </div>

              <div className="bg-[#151B23] rounded-lg border border-[#2A3F54] p-8">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Third-Party Verification</h3>
                <p className="text-neutral-400 leading-relaxed">
                  Independent actuarial validation of all savings calculations. SSAE-18 SOC 2 Type II controls ensure forensic-grade accuracy and defensibility under audit.
                </p>
              </div>

              <div className="bg-[#151B23] rounded-lg border border-[#2A3F54] p-8">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Complete Chain of Custody</h3>
                <p className="text-neutral-400 leading-relaxed">
                  Full lineage tracking from initial claim event through recovery and reconciliation. Every data transformation logged with before/after states and calculation methodology.
                </p>
              </div>

              <div className="bg-[#151B23] rounded-lg border border-[#2A3F54] p-8">
                <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mb-4">
                  <Download className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Board-Ready Exports</h3>
                <p className="text-neutral-400 leading-relaxed">
                  One-click export of fiduciary documentation packages for board meetings, compliance reviews, and external audits. Pre-formatted for ERISA 404(c) safe harbor requirements.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-20 border-t border-[#1F2937] bg-[#0A0F1E]">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-12 text-center">
              Built for Fiduciary Defense
            </h2>

            <div className="space-y-6">
              <div className="bg-[#151B23] rounded-lg border border-[#2A3F54] p-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#B8860B]/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-[#B8860B] font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">DOL Audit Response</h3>
                    <p className="text-neutral-400">
                      When the Department of Labor requests proof of fiduciary process, deliver complete documentation package showing continuous monitoring, timely action, and proper oversight of plan assets.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#151B23] rounded-lg border border-[#2A3F54] p-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-emerald-400 font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Board Fiduciary Reporting</h3>
                    <p className="text-neutral-400">
                      Present quantified evidence of plan stewardship to audit committees and boards of directors. Demonstrate compliance with fiduciary duty of prudence through documented cost control actions.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#151B23] rounded-lg border border-[#2A3F54] p-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-400 font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Litigation Defense</h3>
                    <p className="text-neutral-400">
                      In excessive fee or breach of fiduciary duty claims, produce irrefutable evidence of monitoring activities, vendor oversight, and cost containment efforts with complete audit trail.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 border-t border-[#1F2937]">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
              Start Building Your Fiduciary Record Today
            </h2>
            <p className="text-xl text-neutral-400 mb-8">
              Every day without documentation is a day of undefended fiduciary exposure.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/request-demo">
                <Button size="lg" className="bg-[#B8860B] hover:bg-[#D4AF37] text-[#0A0F1E]">
                  Schedule Demo
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