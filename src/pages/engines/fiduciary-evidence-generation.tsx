import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { FileCheck, CheckCircle2, ArrowRight, Shield, Database, Clock } from "lucide-react";
import { SEO } from "@/components/SEO";
import Footer from "@/components/Footer";

export default function FiduciaryEvidenceGenerationEngine() {
  return (
    <>
      <SEO
        title="Fiduciary Evidence Generation | Kincaid IQ"
        description="Automated compilation of prudent process documentation, meeting minutes, decision rationale, and audit-ready evidence packages."
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <Link href="/engines" className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 mb-8 group">
              <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
              Back to Engines
            </Link>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-2 mb-6">
                <FileCheck className="w-4 h-4 text-amber-400" />
                <span className="text-amber-300 text-sm font-medium">Fiduciary & Governance</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-400 to-yellow-400 text-transparent bg-clip-text">
                Fiduciary Evidence Generation
              </h1>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                AI-powered compilation of audit-ready evidence packages documenting prudent process, committee oversight, reasonable reliance on experts, and fiduciary decision rationale.
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2">
                  <div className="text-sm text-gray-400">Category</div>
                  <div className="text-white font-semibold">Documentation</div>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2">
                  <div className="text-sm text-gray-400">Use Case</div>
                  <div className="text-white font-semibold">Audit Defense</div>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2">
                  <div className="text-sm text-gray-400">Output</div>
                  <div className="text-white font-semibold">Evidence Packages</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12">Evidence Components</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { icon: Shield, title: "Process Documentation", desc: "Meeting agendas, minutes, attendance records, voting results, and dissenting opinions" },
                { icon: Database, title: "Data Lineage", desc: "Source data provenance, transformation logs, validation results, and quality certifications" },
                { icon: FileCheck, title: "Expert Certifications", desc: "Actuary certifications, consultant opinions, legal reviews, and third-party validations" },
                { icon: Clock, title: "Timeline Reconstruction", desc: "Chronological sequence of events, information flow, and decision points with timestamps" }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-6"
                >
                  <item.icon className="w-8 h-8 text-amber-400 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12">Key Applications</h2>
            
            <div className="space-y-6">
              {[
                { title: "DOL Audit Response", desc: "24-hour turnaround on comprehensive evidence packages for regulatory examination" },
                { title: "Litigation Defense", desc: "Pre-assembled discovery responses with complete decision documentation and supporting data" },
                { title: "Board Assurance", desc: "Quarterly governance reports with evidence completeness metrics and gap identification" },
                { title: "Annual Certification", desc: "Automated fiduciary certification packages for insurance underwriting and board sign-off" }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-amber-500/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Generate Evidence Packages</h2>
            <p className="text-gray-300 mb-8">Build audit-ready fiduciary documentation</p>
            <Link href="/request-demo" className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-white px-8 py-4 rounded-xl font-bold shadow-2xl shadow-amber-500/50 transform hover:scale-105 transition-all duration-300">
              Request Demo
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}