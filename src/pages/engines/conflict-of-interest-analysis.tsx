import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { AlertTriangle, Shield, Search, ArrowLeft, Target, FileText, CheckCircle2 } from "lucide-react";

export default function ConflictOfInterestEngine() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <>
      <Head>
        <title>Conflict of Interest Analysis Engine | Kincaid IQ</title>
        <meta name="description" content="Detect undisclosed financial relationships between vendors, brokers, and service providers that compromise fiduciary duty." />
      </Head>

      <Nav />

      <div className="min-h-screen bg-neutral-950 text-neutral-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <Link href="/engines" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Engines
          </Link>

          <div className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-red-500/10 rounded-lg">
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>
              <div>
                <h1 className="text-4xl font-display font-bold">Conflict of Interest Analysis Engine</h1>
                <p className="text-neutral-400 mt-2">Expose hidden financial relationships that undermine fiduciary duty</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-6">
                <Search className="w-10 h-10 text-red-400 mb-3" />
                <h3 className="text-xl font-semibold mb-2">Deep Discovery</h3>
                <p className="text-neutral-400 text-sm">Map ownership, affiliates, and payment flows between all vendors</p>
              </div>
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-6">
                <Shield className="w-10 h-10 text-blue-400 mb-3" />
                <h3 className="text-xl font-semibold mb-2">ERISA Protection</h3>
                <p className="text-neutral-400 text-sm">Document conflicts before they become DOL violations or lawsuits</p>
              </div>
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-6">
                <Target className="w-10 h-10 text-purple-400 mb-3" />
                <h3 className="text-xl font-semibold mb-2">Board Confidence</h3>
                <p className="text-neutral-400 text-sm">Give directors fiduciary assurance that vendor selections are clean</p>
              </div>
            </div>
          </div>

          <div className="border-b border-neutral-800 mb-8">
            <div className="flex gap-8">
              {["overview", "detection", "use-cases"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 px-2 font-medium transition-colors relative ${
                    activeTab === tab
                      ? "text-emerald-400"
                      : "text-neutral-400 hover:text-neutral-300"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {activeTab === "overview" && (
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-lg p-8">
                <h2 className="text-2xl font-display font-bold mb-4">The Hidden Revenue Web</h2>
                <p className="text-neutral-300 mb-4">
                  Your broker recommends a PBM. The PBM owns the specialty pharmacy. The specialty pharmacy contracts with the 
                  home infusion company your broker also recommended. The broker gets override commissions from all three. Nobody 
                  disclosed the connections. This is a fiduciary breach—and it's epidemic. Our engine maps these webs automatically 
                  from public records, ownership filings, and contract analysis.
                </p>
                <div className="bg-neutral-900/50 rounded-lg p-6 mt-6">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    Common Conflict Patterns
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-red-400 font-semibold mb-2">Broker-Vendor Ties</div>
                      <ul className="space-y-1 text-neutral-400 text-xs">
                        <li>• Broker owns equity in PBM or TPA</li>
                        <li>• Override commissions from preferred vendors</li>
                        <li>• Revenue-sharing on specialty pharmacy</li>
                        <li>• Referral fees for stop-loss placement</li>
                      </ul>
                    </div>
                    <div>
                      <div className="text-orange-400 font-semibold mb-2">Vendor-Vendor Ties</div>
                      <ul className="space-y-1 text-neutral-400 text-xs">
                        <li>• PBM owns specialty pharmacy + mail order</li>
                        <li>• TPA owns disease management vendor</li>
                        <li>• Lab company owns wellness vendor</li>
                        <li>• Data warehouse owned by PBM parent</li>
                      </ul>
                    </div>
                    <div>
                      <div className="text-amber-400 font-semibold mb-2">Cross-Subsidies</div>
                      <ul className="space-y-1 text-neutral-400 text-xs">
                        <li>• "Free" services subsidized by hidden spreads</li>
                        <li>• Rebate retention offsetting admin fee discounts</li>
                        <li>• Specialty Rx margins funding broker bonuses</li>
                        <li>• Data monetization (selling plan info to pharma)</li>
                      </ul>
                    </div>
                    <div>
                      <div className="text-purple-400 font-semibold mb-2">Consulting Conflicts</div>
                      <ul className="space-y-1 text-neutral-400 text-xs">
                        <li>• Consultant earns fees from vendors they recommend</li>
                        <li>• "Independent" auditor co-owned by PBM</li>
                        <li>• Actuarial firm with vendor equity stakes</li>
                        <li>• Legal counsel representing both sides</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-8">
                <h2 className="text-2xl font-display font-bold mb-6">Real-World Discoveries</h2>
                <div className="space-y-6">
                  <div className="border-l-4 border-red-400 pl-6 py-2">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg">Fortune 500 Retailer</h3>
                      <span className="text-red-400 font-mono text-sm">$18M Hidden Revenue</span>
                    </div>
                    <p className="text-neutral-400 text-sm mb-3">
                      Broker recommended specific PBM and specialty pharmacy. Conflict scan revealed broker's parent company owned 
                      22% of the PBM and received 40% revenue share on specialty. Total undisclosed annual payments: $18M. Broker 
                      relationship terminated, new RFP conducted, saved $12M annually with transparent vendor.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-red-400">Legal Outcome:</strong> DOL filed prohibited transaction case, broker 
                      paid $4.2M settlement for undisclosed compensation
                    </div>
                  </div>

                  <div className="border-l-4 border-orange-400 pl-6 py-2">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg">Healthcare System (Self-Funded)</h3>
                      <span className="text-orange-400 font-mono text-sm">Circular Vendor Stack</span>
                    </div>
                    <p className="text-neutral-400 text-sm mb-3">
                      TPA, PBM, and specialty pharmacy all recommended by the same consultant. Conflict analysis revealed all three 
                      vendors were subsidiaries of the same private equity firm—and the consultant's firm received equity warrants 
                      in the PE fund. Complete capture of the decision process.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-orange-400">Board Action:</strong> Unwound all contracts, conducted independent 
                      RFP, terminated consultant relationship, filed ethics complaint with state insurance department
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "detection" && (
            <div className="space-y-6">
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-8">
                <h2 className="text-2xl font-display font-bold mb-6">Detection Methods</h2>
                <div className="space-y-6">
                  <div className="bg-neutral-800/50 rounded-lg p-6">
                    <h3 className="font-semibold mb-3">Corporate Ownership Mapping</h3>
                    <p className="text-neutral-400 text-sm mb-4">
                      We trace ownership through SEC filings, state business registrations, and private company databases. 
                      Parent-subsidiary relationships, PE ownership, cross-shareholding, and joint ventures all surface.
                    </p>
                    <div className="grid md:grid-cols-2 gap-3 text-xs">
                      <div className="bg-neutral-900/50 rounded p-3">
                        <div className="text-emerald-400 font-semibold mb-2">Public Data Sources</div>
                        <ul className="space-y-1 text-neutral-400">
                          <li>• SEC Edgar filings (10-K, DEF 14A, Schedule 13D)</li>
                          <li>• State Secretary of State business registries</li>
                          <li>• FINRA BrokerCheck for broker affiliations</li>
                          <li>• DOL Form 5500 service provider schedules</li>
                        </ul>
                      </div>
                      <div className="bg-neutral-900/50 rounded p-3">
                        <div className="text-blue-400 font-semibold mb-2">Private Intelligence</div>
                        <ul className="space-y-1 text-neutral-400">
                          <li>• Pitchbook / Crunchbase for PE/VC ownership</li>
                          <li>• Contract parsing for cross-vendor references</li>
                          <li>• Leadership overlap analysis (shared executives)</li>
                          <li>• Patent/trademark co-ownership patterns</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-neutral-800/50 rounded-lg p-6">
                    <h3 className="font-semibold mb-3">Payment Flow Analysis</h3>
                    <p className="text-neutral-400 text-sm mb-4">
                      We reconstruct money movement between entities using contract terms, payment schedules, and known 
                      compensation structures. Reveals indirect compensation that brokers often fail to disclose.
                    </p>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between bg-neutral-900/50 rounded p-2">
                        <span className="text-neutral-400">Direct broker commissions</span>
                        <span className="text-emerald-400">Usually disclosed</span>
                      </div>
                      <div className="flex items-center justify-between bg-neutral-900/50 rounded p-2">
                        <span className="text-neutral-400">Override commissions from preferred vendors</span>
                        <span className="text-amber-400">Often undisclosed</span>
                      </div>
                      <div className="flex items-center justify-between bg-neutral-900/50 rounded p-2">
                        <span className="text-neutral-400">Revenue-sharing on specialty Rx</span>
                        <span className="text-red-400">Rarely disclosed</span>
                      </div>
                      <div className="flex items-center justify-between bg-neutral-900/50 rounded p-2">
                        <span className="text-neutral-400">Equity stakes in recommended vendors</span>
                        <span className="text-red-400">Almost never disclosed</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-neutral-800/50 rounded-lg p-6">
                    <h3 className="font-semibold mb-3">Red Flag Indicators</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <ul className="space-y-2 text-neutral-400">
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></div>
                          <span>Broker refuses to disclose all compensation sources</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></div>
                          <span>Vendor selection limited to 2-3 "preferred partners"</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></div>
                          <span>Same vendors recommended across multiple clients</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></div>
                          <span>"Free" services bundled without clear pricing</span>
                        </li>
                      </ul>
                      <ul className="space-y-2 text-neutral-400">
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></div>
                          <span>Vendor won't provide separate service pricing</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></div>
                          <span>Broker discourages competitive RFP process</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></div>
                          <span>Shared personnel between broker and vendor firms</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></div>
                          <span>Consultant earns revenue from data analytics vendor</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "use-cases" && (
            <div className="space-y-6">
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-8">
                <h2 className="text-2xl font-display font-bold mb-6">Strategic Applications</h2>
                <div className="space-y-6">
                  <div className="border-l-4 border-emerald-400 pl-6">
                    <h3 className="font-semibold text-lg mb-2">Pre-RFP Due Diligence</h3>
                    <p className="text-neutral-400 text-sm mb-3">
                      Run conflict scan on all RFP bidders before awarding contracts. Surface hidden relationships that 
                      could compromise the selection process or create future litigation risk.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-emerald-400">Prevention:</strong> Caught PBM bidder owned by same PE firm 
                      as incumbent TPA—disqualified to avoid appearance of bias, avoided future challenge to fiduciary process
                    </div>
                  </div>

                  <div className="border-l-4 border-blue-400 pl-6">
                    <h3 className="font-semibold text-lg mb-2">Annual Vendor Reviews</h3>
                    <p className="text-neutral-400 text-sm mb-3">
                      Ownership structures change—PE exits, acquisitions, new partnerships. Re-scan annually to detect 
                      new conflicts that emerged since contract award.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-blue-400">Discovery:</strong> Broker firm was acquired by insurance carrier 
                      18 months into contract—created conflict with plan's stop-loss placement, triggered renegotiation
                    </div>
                  </div>

                  <div className="border-l-4 border-purple-400 pl-6">
                    <h3 className="font-semibold text-lg mb-2">Board Reporting</h3>
                    <p className="text-neutral-400 text-sm mb-3">
                      Give directors annual attestation that all benefit vendors have been screened for conflicts and 
                      material relationships disclosed. This is fiduciary documentation in case of future audit or lawsuit.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-purple-400">Compliance Record:</strong> Quarterly conflict reports to audit 
                      committee created clean paper trail—DOL investigation found no prohibited transactions, case closed
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}