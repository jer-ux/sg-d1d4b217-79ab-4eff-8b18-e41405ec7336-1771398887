import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { MapPin, TrendingDown, DollarSign, ArrowLeft, Building2, Target } from "lucide-react";

export default function SiteOfCareMigrationEngine() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <>
      <Head>
        <title>Site of Care Migration Engine | Kincaid IQ</title>
        <meta name="description" content="Shift procedures from hospital outpatient to ASC/office settings for 40-60% cost reduction." />
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
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <MapPin className="w-8 h-8 text-blue-400" />
              </div>
              <div>
                <h1 className="text-4xl font-display font-bold">Site of Care Migration Engine</h1>
                <p className="text-neutral-400 mt-2">Same procedure, lower-cost setting, massive savings</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-6">
                <Building2 className="w-10 h-10 text-blue-400 mb-3" />
                <h3 className="text-xl font-semibold mb-2">ASC Opportunity</h3>
                <p className="text-neutral-400 text-sm">Identify procedures that can safely move to ambulatory surgery centers</p>
              </div>
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-6">
                <DollarSign className="w-10 h-10 text-emerald-400 mb-3" />
                <h3 className="text-xl font-semibold mb-2">Cost Differential</h3>
                <p className="text-neutral-400 text-sm">Quantify savings per procedure at each site of care</p>
              </div>
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-6">
                <Target className="w-10 h-10 text-purple-400 mb-3" />
                <h3 className="text-xl font-semibold mb-2">Member Steering</h3>
                <p className="text-neutral-400 text-sm">Design incentives to drive members to lower-cost settings</p>
              </div>
            </div>
          </div>

          <div className="border-b border-neutral-800 mb-8">
            <div className="flex gap-8">
              {["overview", "analysis", "use-cases"].map((tab) => (
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
              <div className="bg-gradient-to-br from-blue-500/10 to-emerald-500/10 border border-blue-500/20 rounded-lg p-8">
                <h2 className="text-2xl font-display font-bold mb-4">The $2.4M Site-of-Care Opportunity</h2>
                <p className="text-neutral-300 mb-4">
                  Medicare pays 40-60% less for the same procedure when performed in an ASC vs. hospital outpatient department (HOPD). 
                  Commercial plans inherit this cost structure but rarely enforce it. Colonoscopy at HOPD: $3,200. Same scope at ASC: 
                  $1,400. Multiply by your volume and the waste is staggering. Our engine identifies every procedure currently performed 
                  at high-cost sites that could safely migrate to ASCs, physician offices, or imaging centers.
                </p>
                <div className="bg-neutral-900/50 rounded-lg p-6 mt-6">
                  <h3 className="font-semibold mb-4">Real World: Manufacturing Client (2,800 lives)</h3>
                  <div className="grid md:grid-cols-2 gap-6 text-sm">
                    <div>
                      <div className="text-blue-400 font-semibold mb-2">Current State (HOPD Heavy)</div>
                      <ul className="space-y-2 text-neutral-400 text-xs">
                        <li>• 420 colonoscopies/year: 88% at HOPD, 12% at ASC</li>
                        <li>• Avg HOPD cost: $3,180 (facility + physician)</li>
                        <li>• Avg ASC cost: $1,380</li>
                        <li>• <strong>Annual colonoscopy spend: $1.18M</strong></li>
                        <li>• Similar patterns: upper GI, knee arthroscopy, cataract, pain procedures</li>
                        <li>• Total site-of-care spend: $4.8M across all procedures</li>
                      </ul>
                    </div>
                    <div>
                      <div className="text-emerald-400 font-semibold mb-2">Optimized State (60% ASC Migration)</div>
                      <ul className="space-y-2 text-neutral-400 text-xs">
                        <li>• Colonoscopy: 60% migrated to ASC (252 procedures)</li>
                        <li>• Savings per migrated procedure: $1,800</li>
                        <li>• <strong>Colonoscopy savings alone: $454K/year</strong></li>
                        <li>• Full optimization across all procedures: $2.4M annual savings</li>
                        <li>• Implementation: differential copay ($50 ASC vs $250 HOPD)</li>
                        <li>• Member satisfaction: higher (shorter wait, better experience)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-8">
                <h2 className="text-2xl font-display font-bold mb-6">High-Opportunity Procedures</h2>
                <div className="space-y-6">
                  <div className="border-l-4 border-emerald-400 pl-6">
                    <h3 className="font-semibold text-lg mb-2">Colonoscopy / Upper GI</h3>
                    <p className="text-neutral-400 text-sm mb-3">
                      HOPD facility fee: $2,400-$3,600. ASC: $800-$1,200. Same scope, same physician, 70% lower facility cost. 
                      No clinical reason for HOPD unless high-risk patient (ASA 4+).
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-emerald-400">Savings per procedure:</strong> $1,800-$2,400 · Typical volume: 
                      300-500 annually per 2,000 lives
                    </div>
                  </div>

                  <div className="border-l-4 border-blue-400 pl-6">
                    <h3 className="font-semibold text-lg mb-2">Orthopedic Procedures</h3>
                    <p className="text-neutral-400 text-sm mb-3">
                      Knee arthroscopy, shoulder arthroscopy, carpal tunnel release. HOPD: $8K-$12K. ASC: $3K-$5K. Medicare 
                      removed total knee/hip from inpatient-only list in 2018—even major joints can be ASC.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-blue-400">Savings per procedure:</strong> $5,000-$7,000 · Volume varies widely 
                      by industry (manufacturing higher)
                    </div>
                  </div>

                  <div className="border-l-4 border-purple-400 pl-6">
                    <h3 className="font-semibold text-lg mb-2">Imaging: MRI / CT</h3>
                    <p className="text-neutral-400 text-sm mb-3">
                      Hospital-based MRI: $2,200. Free-standing imaging center: $600. Literally the same magnet. Commercial 
                      plans don't enforce site-of-service edits; members default to hospital because it's convenient.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-purple-400">Savings per scan:</strong> $1,200-$1,800 · High volume (200-400/year 
                      per 2,000 lives)
                    </div>
                  </div>

                  <div className="border-l-4 border-amber-400 pl-6">
                    <h3 className="font-semibold text-lg mb-2">Pain Management Procedures</h3>
                    <p className="text-neutral-400 text-sm mb-3">
                      Epidural injections, facet blocks, nerve ablations. HOPD: $4K-$6K. ASC: $1.5K-$2.5K. Low complexity, 
                      perfect ASC candidates. Many plans still pay HOPD rates.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-amber-400">Savings per procedure:</strong> $2,500-$3,500 · Growing volume 
                      (aging workforce)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "analysis" && (
            <div className="space-y-6">
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-8">
                <h2 className="text-2xl font-display font-bold mb-6">Migration Opportunity Analysis</h2>
                <p className="text-neutral-400 text-sm mb-6">
                  Engine analyzes historical claims, identifies procedures by CPT code, tags current site of service, compares 
                  allowed amounts across sites, and calculates theoretical savings if X% migrate to lower-cost settings.
                </p>
                <div className="space-y-6">
                  <div className="bg-neutral-800/50 rounded-lg p-6">
                    <h3 className="font-semibold mb-4 text-blue-400">Sample Analysis Output</h3>
                    <div className="space-y-3 text-sm">
                      <div className="grid grid-cols-5 gap-4 text-xs font-semibold text-neutral-500 border-b border-neutral-700 pb-2">
                        <span>Procedure</span>
                        <span>Current Site</span>
                        <span>Volume</span>
                        <span>Cost Delta</span>
                        <span>Annual Savings</span>
                      </div>
                      <div className="grid grid-cols-5 gap-4 text-xs">
                        <span className="text-neutral-300">Colonoscopy</span>
                        <span className="text-red-400">88% HOPD</span>
                        <span className="text-neutral-400 font-mono">420</span>
                        <span className="text-neutral-400 font-mono">$1,800</span>
                        <span className="text-emerald-400 font-mono">$454K</span>
                      </div>
                      <div className="grid grid-cols-5 gap-4 text-xs">
                        <span className="text-neutral-300">MRI Brain</span>
                        <span className="text-red-400">92% Hospital</span>
                        <span className="text-neutral-400 font-mono">180</span>
                        <span className="text-neutral-400 font-mono">$1,600</span>
                        <span className="text-emerald-400 font-mono">$265K</span>
                      </div>
                      <div className="grid grid-cols-5 gap-4 text-xs">
                        <span className="text-neutral-300">Knee Arthroscopy</span>
                        <span className="text-red-400">78% HOPD</span>
                        <span className="text-neutral-400 font-mono">85</span>
                        <span className="text-neutral-400 font-mono">$6,200</span>
                        <span className="text-emerald-400 font-mono">$411K</span>
                      </div>
                      <div className="grid grid-cols-5 gap-4 text-xs">
                        <span className="text-neutral-300">Cataract Surgery</span>
                        <span className="text-amber-400">42% HOPD</span>
                        <span className="text-neutral-400 font-mono">95</span>
                        <span className="text-neutral-400 font-mono">$2,400</span>
                        <span className="text-emerald-400 font-mono">$96K</span>
                      </div>
                      <div className="grid grid-cols-5 gap-4 text-xs">
                        <span className="text-neutral-300">Pain Injections</span>
                        <span className="text-red-400">85% HOPD</span>
                        <span className="text-neutral-400 font-mono">320</span>
                        <span className="text-neutral-400 font-mono">$3,100</span>
                        <span className="text-emerald-400 font-mono">$843K</span>
                      </div>
                      <div className="col-span-5 border-t border-neutral-700 pt-2 mt-2">
                        <div className="flex justify-between font-semibold">
                          <span className="text-neutral-300">Total 5-Procedure Opportunity (60% migration rate)</span>
                          <span className="text-emerald-400">$2.07M/year</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-neutral-800/50 rounded-lg p-6">
                    <h3 className="font-semibold mb-4 text-emerald-400">Implementation Tactics</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2" />
                        <div>
                          <div className="font-semibold text-neutral-200">Differential Copay</div>
                          <div className="text-neutral-400 text-xs">$50 ASC vs $250 HOPD for procedures on migration list—drives 70%+ compliance</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2" />
                        <div>
                          <div className="font-semibold text-neutral-200">Pre-Authorization Steering</div>
                          <div className="text-neutral-400 text-xs">Require pre-auth for HOPD; ASC auto-approved—administrative friction drives behavior</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2" />
                        <div>
                          <div className="font-semibold text-neutral-200">Provider Network Tier</div>
                          <div className="text-neutral-400 text-xs">ASC in Tier 1, HOPD in Tier 2—lower member cost share at preferred sites</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2" />
                        <div>
                          <div className="font-semibold text-neutral-200">Member Education Campaign</div>
                          <div className="text-neutral-400 text-xs">Proactive outreach when procedure scheduled—highlight cost/quality parity at ASC</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "use-cases" && (
            <div className="space-y-6">
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-8">
                <h2 className="text-2xl font-display font-bold mb-6">Deployment Strategies</h2>
                <div className="space-y-6">
                  <div className="border-l-4 border-emerald-400 pl-6">
                    <h3 className="font-semibold text-lg mb-2">Plan Design Optimization</h3>
                    <p className="text-neutral-400 text-sm mb-3">
                      Redesign benefit to incentivize ASC for 50+ high-volume procedures. Differential copay is simplest; 
                      tiered network is strongest. Show ROI to justify design change at renewal.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-emerald-400">Manufacturing Client:</strong> Implemented differential copay 
                      Jan 1—by Dec 31, ASC utilization up from 12% to 68%, saved $1.9M vs. prior year
                    </div>
                  </div>

                  <div className="border-l-4 border-blue-400 pl-6">
                    <h3 className="font-semibold text-lg mb-2">Provider Contracting</h3>
                    <p className="text-neutral-400 text-sm mb-3">
                      Negotiate ASC rates as % of Medicare (110-130%) instead of % of hospital charges. Build ASC network 
                      with guaranteed volume in exchange for competitive pricing.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-blue-400">Self-Funded Plan:</strong> Contracted directly with 6 ASCs at 
                      125% Medicare—avoided TPA markup, saved additional $380K beyond site-of-care shift
                    </div>
                  </div>

                  <div className="border-l-4 border-purple-400 pl-6">
                    <h3 className="font-semibold text-lg mb-2">Member Engagement</h3>
                    <p className="text-neutral-400 text-sm mb-3">
                      Proactive outreach when high-opportunity procedure is scheduled. Explain cost difference, quality 
                      equivalence, faster recovery. Most members unaware of cost delta—they just go where provider schedules.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-purple-400">Healthcare System:</strong> Launched "Smart Site" campaign with 
                      pre-procedure calls—74% of contacted members chose ASC when presented with cost/quality data
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