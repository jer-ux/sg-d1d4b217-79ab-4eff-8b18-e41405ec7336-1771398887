import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { Database, Shield, Users, ChevronLeft, Award, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

export default function ShadyBrokerAbout() {
  return (
    <>
      <Head>
        <title>About The Shady Broker Index | Kincaid Risk Management</title>
        <meta name="description" content="Learn about The Shady Broker Index and Kincaid Risk Management's mission to bring transparency to the benefits broker industry through public DOL data." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
        <section className="relative pt-32 pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/shady-broker-index">
              <Button variant="ghost" className="mb-8 text-gray-400 hover:text-white">
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back to Index
              </Button>
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-12">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-rose-200 via-amber-200 to-rose-200 bg-clip-text text-transparent">
                About The Shady Broker Index
              </h1>
              <p className="text-xl text-gray-400">
                Bringing transparency to the benefits broker industry through public DOL data
              </p>
            </motion.div>

            {/* Mission */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
              <div className="bg-black/40 backdrop-blur-xl border border-rose-500/20 rounded-2xl p-8">
                <p className="text-lg text-gray-300 mb-4">
                  The Shady Broker Index exists to surface what brokers, consultants, and PBM intermediaries have already disclosed (or failed to disclose) in their mandatory DOL filings.
                </p>
                <p className="text-gray-300 mb-4">
                  We believe that self-insured health plan sponsors — employers who bear the direct financial risk of their employees' healthcare costs — deserve full transparency into who is being paid, how much, and by whom in the benefit supply chain.
                </p>
                <p className="text-gray-300">
                  The data is public. The DOL requires it. We make it searchable, scored, and actionable.
                </p>
              </div>
            </div>

            {/* The Data Asset */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">The Data Asset</h2>
              <div className="bg-gradient-to-r from-purple-500/5 to-transparent border border-purple-500/20 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Database className="w-8 h-8 text-purple-400" />
                  <h3 className="text-2xl font-bold text-white">The Kincaid EFAST2 National Benchmark Index</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-black/40 border border-gray-700/50 rounded-xl p-6 text-center">
                    <div className="text-4xl font-bold text-purple-300 mb-2">757,294</div>
                    <div className="text-sm text-gray-400">DOL Form 5500 Rows</div>
                  </div>
                  <div className="bg-black/40 border border-gray-700/50 rounded-xl p-6 text-center">
                    <div className="text-4xl font-bold text-purple-300 mb-2">SHA-256</div>
                    <div className="text-sm text-gray-400">Integrity Verified</div>
                  </div>
                  <div className="bg-black/40 border border-gray-700/50 rounded-xl p-6 text-center">
                    <div className="text-4xl font-bold text-purple-300 mb-2">Quarterly</div>
                    <div className="text-sm text-gray-400">Updated Filings</div>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">
                  This proprietary dataset is the foundation of every Shady Score. It includes Schedule A (insurance and service provider compensation), Schedule H (financial information), and Schedule C (service provider and trustee information) data for self-insured health plans nationwide.
                </p>
                <p className="text-gray-400">
                  Every row is traceable to a specific DOL filing, available for public download from the EFAST2 disclosure system. The dataset is maintained by Kincaid Risk Management Co. and updated quarterly as new filings become public.
                </p>
              </div>
            </div>

            {/* The Verify Engine */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">The Verify Multi-Agent Analytical Engine</h2>
              <div className="bg-gradient-to-r from-cyan-500/5 to-transparent border border-cyan-500/20 rounded-2xl p-8">
                <p className="text-gray-300 mb-4">
                  Shady Scores are computed by Verify, Kincaid's proprietary multi-agent analytical engine that cross-references public filings, applies actuarial modeling, and surfaces conflicts of interest that would otherwise remain hidden in the noise of 750,000+ rows of raw DOL data.
                </p>
                <p className="text-gray-300 mb-4">
                  Verify is not a black box. Every component score is tagged with an epistemic tier (CERTIFIED, MODELED, or INSUFFICIENT EVIDENCE) and anchored to specific source filings. The methodology is public, the data is public, and the scores are reproducible.
                </p>
                <p className="text-gray-400">
                  This is the same analytical engine used by Kincaid's institutional clients for PBM contract forensics, stop-loss optimization, and fiduciary governance.
                </p>
              </div>
            </div>

            {/* Who We Are */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">Who We Are</h2>
              <div className="bg-black/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-4">Kincaid Risk Management Co.</h3>
                <p className="text-gray-300 mb-6">
                  Kincaid Risk Management Co. (kincaidrmc.com) is a healthcare cost forensics firm serving self-insured employers, private equity sponsors, and family offices.
                </p>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-amber-500/20 border border-amber-500/30 rounded-lg flex items-center justify-center">
                      <Shield className="w-6 h-6 text-amber-300" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">Senior Actuarial & Benefits Leadership</h4>
                      <p className="text-gray-400">12 years actuarial experience, Aon SVP register, serving Fortune 500 clients and private equity sponsors</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-purple-500/20 border border-purple-500/30 rounded-lg flex items-center justify-center">
                      <Database className="w-6 h-6 text-purple-300" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">Proprietary Data Asset</h4>
                      <p className="text-gray-400">The Kincaid EFAST2 National Benchmark Index: 757,294 rows of public DOL filings, SHA-256 integrity-verified</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-cyan-500/20 border border-cyan-500/30 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-cyan-300" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">Institutional-Grade Methodology</h4>
                      <p className="text-gray-400">Verify multi-agent analytical engine used by PE sponsors and CFOs for PBM contract forensics and EBITDA defense</p>
                    </div>
                  </div>
                </div>

                <p className="text-gray-400">
                  Our credibility is built on the data and the method, not on stacked academic credentials. The trust signal is the Evidence Spine: no anchor, no claim.
                </p>
              </div>
            </div>

            {/* What We Do Not Do */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">What We Do Not Do</h2>
              <div className="bg-gradient-to-r from-rose-500/10 to-transparent border border-rose-500/20 rounded-xl p-8">
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-rose-400 font-bold mt-1">•</span>
                    <span><strong className="text-white">We do not allege illegality.</strong> Shady Scores reflect public disclosures and modeling, not claims of fraud or legal violations.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-rose-400 font-bold mt-1">•</span>
                    <span><strong className="text-white">We do not sell broker services.</strong> Kincaid does not compete with the brokers we score. We are a data and analytics firm, not a broker or consultant.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-rose-400 font-bold mt-1">•</span>
                    <span><strong className="text-white">We do not charge brokers for listing or scoring.</strong> The Index is a public good. Brokers cannot pay to improve their score or be removed from the Index.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-rose-400 font-bold mt-1">•</span>
                    <span><strong className="text-white">We do not hide our methodology.</strong> The scoring logic, data source, and epistemic tier system are fully disclosed.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-black/60 backdrop-blur-xl border border-amber-500/20 rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Questions or Corrections?</h2>
              <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                For methodology questions, correction requests, or institutional inquiries, contact Kincaid Risk Management Co.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/shady-broker-index/corrections">
                  <Button size="lg" variant="outline" className="border-amber-500/30 text-amber-300 hover:bg-amber-500/10">
                    Request Correction
                  </Button>
                </Link>
                <Link href="/request-demo">
                  <Button size="lg" className="bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600">
                    Contact Kincaid
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}