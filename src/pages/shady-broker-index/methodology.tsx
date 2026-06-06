import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Database, Scale, CheckCircle2, AlertTriangle, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

export default function ShadyBrokerMethodology() {
  return (
    <>
      <Head>
        <title>Scoring Methodology | The Shady Broker Index</title>
        <meta name="description" content="How we score brokers on transparency using public DOL Form 5500 Schedule A filings and the Evidence Spine principle." />
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
                Scoring Methodology
              </h1>
              <p className="text-xl text-gray-400">
                How we score brokers, consultants, and PBM intermediaries on transparency using public DOL filings
              </p>
            </motion.div>

            {/* The Evidence Spine Principle */}
            <div className="bg-black/40 backdrop-blur-xl border border-rose-500/20 rounded-2xl p-8 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-8 h-8 text-rose-400" />
                <h2 className="text-2xl font-bold text-white">The Evidence Spine Principle</h2>
              </div>
              <p className="text-lg text-gray-300 mb-4">
                Every claim in the Shady Broker Index is anchored to a specific, cited public filing. No anchor, no claim.
              </p>
              <p className="text-gray-400 mb-4">
                We do not allege illegality. We surface what brokers themselves have disclosed (or failed to disclose) in their mandatory DOL Form 5500 Schedule A filings, which are public records.
              </p>
              <p className="text-gray-400">
                This principle protects both the scored entity and the index's credibility. If a score cannot be traced to a specific Schedule A line item in a specific filing for a specific plan year, it is not published.
              </p>
            </div>

            {/* The Shady Score */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">The Shady Score</h2>
              <p className="text-gray-300 mb-6">
                A single composite metric on a 0-100 scale, where higher scores indicate less transparency and more evidence of hidden compensation or conflicts of interest.
              </p>

              <div className="bg-gradient-to-r from-green-500/10 via-amber-500/10 to-rose-500/10 border border-gray-700/50 rounded-2xl p-8 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold text-green-300 mb-2">0-20</div>
                    <div className="text-sm text-gray-400">Grade A</div>
                    <div className="text-xs text-green-300 mt-1">Transparent</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-300 mb-2">21-40</div>
                    <div className="text-sm text-gray-400">Grade B</div>
                    <div className="text-xs text-blue-300 mt-1">Mostly Clear</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-amber-300 mb-2">41-60</div>
                    <div className="text-sm text-gray-400">Grade C</div>
                    <div className="text-xs text-amber-300 mt-1">Murky</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-orange-300 mb-2">61-80</div>
                    <div className="text-sm text-gray-400">Grade D</div>
                    <div className="text-xs text-orange-300 mt-1">Opaque</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-rose-300 mb-2">81-100</div>
                    <div className="text-sm text-gray-400">Grade F</div>
                    <div className="text-xs text-rose-300 mt-1">Egregious</div>
                  </div>
                </div>
              </div>

              <div className="bg-black/40 backdrop-blur-xl border border-amber-500/20 rounded-2xl p-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-white mb-2">INSUFFICIENT EVIDENCE Flag</h3>
                    <p className="text-gray-400">
                      Entities whose Schedule A filings are too incomplete to score receive this non-graded flag. This is itself a finding: a broker who files blank or formula-only Schedule A fields across multiple plan years gets surfaced for it, not hidden.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* The Five Scoring Components */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">The Five Scoring Components</h2>
              <p className="text-gray-300 mb-8">
                Each broker's Shady Score is calculated from five weighted components. Every component score (0-100) is derived from public Schedule A filings and modeling.
              </p>

              <div className="space-y-6">
                {[
                  {
                    name: "Schedule A Completeness",
                    weight: 25,
                    desc: "How thoroughly the broker discloses compensation in public filings. Measures whether Schedule A fields contain actual dollar amounts, formulaic descriptions, or blank entries. Scores worsen for pattern of blank or \"See Attachment\" filings across multiple plan years.",
                    scoring: "0-20: All fields complete with dollar amounts • 21-40: Minor gaps or formulaic entries • 41-60: Multiple blank fields • 61-80: Systematic blank filings • 81-100: Zero disclosure across all reviewed plans"
                  },
                  {
                    name: "Hidden Override Detection",
                    weight: 30,
                    desc: "Evidence of undisclosed compensation from carriers, PBMs, or other vendors. Detected through cross-referencing Schedule A filings with known carrier override programs, PBM spread pricing disclosures, and actuarial modeling of typical broker compensation arrangements.",
                    scoring: "0-20: No evidence of hidden compensation • 21-40: Minor inconsistencies • 41-60: Modeled override likely • 61-80: Documented override not disclosed • 81-100: Egregious undisclosed override with dollar evidence"
                  },
                  {
                    name: "Conflict-of-Interest Markers",
                    weight: 20,
                    desc: "Presence of contingent commissions, dual roles (broker/consultant), steering incentives, or ownership stakes in recommended vendors. Identified through Schedule A line items, corporate registration filings, and cross-referenced vendor relationships.",
                    scoring: "0-20: No conflicts identified • 21-40: Minor dual-role disclosure • 41-60: Undisclosed contingent commission • 61-80: Steering to affiliated vendor • 81-100: Multiple undisclosed conflicts"
                  },
                  {
                    name: "Disclosure Consistency",
                    weight: 15,
                    desc: "Year-over-year pattern of filing completeness and transparency. Measures whether disclosure improves, degrades, or remains consistent across multiple plan years. Sudden shift to blank filings after prior complete disclosure is a red flag.",
                    scoring: "0-20: Consistently complete filings • 21-40: Minor year-to-year variation • 41-60: Inconsistent disclosure • 61-80: Degrading disclosure pattern • 81-100: Shift from complete to blank filings"
                  },
                  {
                    name: "Source Document Quality",
                    weight: 10,
                    desc: "Number of cited filings, diversity of plan sponsors reviewed, and epistemic confidence level. Higher scores for entities with fewer filings or lower-quality source data, as they have less public evidence to anchor the score.",
                    scoring: "0-20: 10+ filings, high confidence • 21-40: 5-9 filings • 41-60: 3-4 filings • 61-80: 1-2 filings • 81-100: Modeled only, no direct filings"
                  }
                ].map((component, i) => (
                  <div key={i} className="bg-gradient-to-r from-purple-500/5 to-transparent border border-purple-500/10 rounded-xl p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0 w-16 h-16 bg-purple-500/20 border-2 border-purple-500/30 rounded-xl flex items-center justify-center">
                        <span className="text-purple-300 font-bold text-xl">{component.weight}%</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">{component.name}</h3>
                        <p className="text-gray-300 mb-3">{component.desc}</p>
                        <div className="bg-black/40 border border-gray-700/50 rounded-lg p-4">
                          <p className="text-sm font-medium text-gray-400 mb-2">Scoring Range:</p>
                          <p className="text-sm text-gray-400">{component.scoring}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Epistemic Tier System */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">Epistemic Tier System</h2>
              <p className="text-gray-300 mb-6">
                Every scoring component is tagged with one of three epistemic tiers, indicating the confidence level and source of the data:
              </p>

              <div className="space-y-4">
                <div className="bg-gradient-to-r from-green-500/10 to-transparent border border-green-500/20 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle2 className="w-6 h-6 text-green-400" />
                    <h3 className="text-xl font-bold text-white">CERTIFIED</h3>
                  </div>
                  <p className="text-gray-300">
                    Component score is directly derived from explicit Schedule A disclosure. The broker stated the compensation amount, and we are citing what they filed. Highest confidence.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/20 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Database className="w-6 h-6 text-amber-400" />
                    <h3 className="text-xl font-bold text-white">MODELED</h3>
                  </div>
                  <p className="text-gray-300">
                    Component score is inferred from incomplete filings, industry benchmarks, or cross-referenced evidence. Example: blank Schedule A field + known carrier override program = modeled hidden override. Medium confidence.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-gray-500/10 to-transparent border border-gray-500/20 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <AlertTriangle className="w-6 h-6 text-gray-400" />
                    <h3 className="text-xl font-bold text-white">INSUFFICIENT EVIDENCE</h3>
                  </div>
                  <p className="text-gray-300">
                    Not enough source data to assign a component score. Entity receives the INSUFFICIENT EVIDENCE flag overall when too many components fall into this tier.
                  </p>
                </div>
              </div>
            </div>

            {/* Data Source */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">Data Source</h2>
              <div className="bg-black/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-4">The Kincaid EFAST2 National Benchmark Index</h3>
                <p className="text-gray-300 mb-4">
                  All broker scores are derived from the Kincaid EFAST2 National Benchmark Index, a proprietary dataset containing 757,294 rows of public DOL Form 5500 filings with SHA-256 integrity verification.
                </p>
                <p className="text-gray-300 mb-4">
                  This dataset includes Schedule A (insurance and service provider compensation), Schedule H (financial information), and Schedule C (service provider and trustee information) data for self-insured health plans across the United States.
                </p>
                <p className="text-gray-400">
                  The Index is maintained by Kincaid Risk Management Co. and updated quarterly as new DOL filings become public. All source filings are directly downloadable from the DOL's EFAST2 public disclosure system.
                </p>
              </div>
            </div>

            {/* What This Is Not */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">What This Index Is Not</h2>
              <div className="bg-gradient-to-r from-rose-500/10 to-transparent border border-rose-500/20 rounded-xl p-8">
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-rose-400 font-bold mt-1">•</span>
                    <span><strong className="text-white">Not an allegation of illegality.</strong> We do not claim brokers are breaking the law. We surface what they have disclosed (or not disclosed) in public filings.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-rose-400 font-bold mt-1">•</span>
                    <span><strong className="text-white">Not a performance ranking.</strong> This is a transparency score, not a quality-of-service rating. A low Shady Score does not mean a broker provides poor advice.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-rose-400 font-bold mt-1">•</span>
                    <span><strong className="text-white">Not a substitute for legal advice.</strong> Plan fiduciaries should consult their own legal counsel before taking action based on Shady Score findings.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-rose-400 font-bold mt-1">•</span>
                    <span><strong className="text-white">Not final or immutable.</strong> Scores are updated as new filings become available. Brokers can request corrections if source data is misattributed.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Corrections Channel */}
            <div className="bg-black/60 backdrop-blur-xl border border-amber-500/20 rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Request a Correction</h2>
              <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                If you believe a Shady Score is based on misattributed or incorrect source data, submit a correction request with the specific filing EIN and plan year in question.
              </p>
              <Link href="/shady-broker-index/corrections">
                <Button size="lg" variant="outline" className="border-amber-500/30 text-amber-300 hover:bg-amber-500/10">
                  Submit Correction Request
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