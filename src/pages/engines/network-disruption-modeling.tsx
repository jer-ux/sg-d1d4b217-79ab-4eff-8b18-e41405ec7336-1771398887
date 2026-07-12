import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { AlertCircle, TrendingUp, Users, ArrowLeft, Shield, DollarSign } from "lucide-react";

export default function NetworkDisruptionEngine() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <>
      <Head>
        <title>Network Disruption Modeling Engine | Kincaid IQ</title>
        <meta name="description" content="Model cost impact when key providers leave network or facility closes." />
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
                <AlertCircle className="w-8 h-8 text-red-400" />
              </div>
              <div>
                <h1 className="text-4xl font-display font-bold">Network Disruption Modeling Engine</h1>
                <p className="text-neutral-400 mt-2">Know your exposure before the network changes</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-6">
                <Users className="w-10 h-10 text-red-400 mb-3" />
                <h3 className="text-xl font-semibold mb-2">Provider Impact</h3>
                <p className="text-neutral-400 text-sm">Model cost if high-volume provider leaves network</p>
              </div>
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-6">
                <Shield className="w-10 h-10 text-blue-400 mb-3" />
                <h3 className="text-xl font-semibold mb-2">Facility Closure</h3>
                <p className="text-neutral-400 text-sm">Forecast utilization shift when hospital/ASC closes</p>
              </div>
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-6">
                <DollarSign className="w-10 h-10 text-emerald-400 mb-3" />
                <h3 className="text-xl font-semibold mb-2">Cost Exposure</h3>
                <p className="text-neutral-400 text-sm">Quantify PMPM impact of network disruption scenarios</p>
              </div>
            </div>
          </div>

          <div className="border-b border-neutral-800 mb-8">
            <div className="flex gap-8">
              {["overview", "modeling", "use-cases"].map((tab) => (
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
                <h2 className="text-2xl font-display font-bold mb-4">The $840K Network Surprise</h2>
                <p className="text-neutral-300 mb-4">
                  Your local health system gives 90-day notice: key orthopedic group is leaving network. Or ASA announces 
                  facility closure. Or your TPA loses contract with regional hospital. Network disruptions happen constantly—
                  hospital mergers, physician retirements, contract disputes. Most employers learn about impact AFTER the 
                  disruption when Q2 claims spike 18%. Our engine models exposure proactively so you can negotiate, prepare, 
                  or switch networks before renewal.
                </p>
                <div className="bg-neutral-900/50 rounded-lg p-6 mt-6">
                  <h3 className="font-semibold mb-4">Real Case: Orthopedic Group Exit</h3>
                  <div className="grid md:grid-cols-2 gap-6 text-sm">
                    <div>
                      <div className="text-red-400 font-semibold mb-2">Discovered At Renewal (Reactive)</div>
                      <ul className="space-y-2 text-neutral-400 text-xs">
                        <li>• Ortho group represents 240 employees + dependents (8.5% of population)</li>
                        <li>• Historical: $680K annual spend at in-network rates</li>
                        <li>• Out-of-network: members pay 40% coinsurance, plan still pays 60%</li>
                        <li>• OON facility charges 280% of prior allowed amount</li>
                        <li>• Plan cost increases to $1.14M (68% jump)</li>
                        <li>• <strong>Unbudgeted cost increase: $460K discovered at Q3 financials</strong></li>
                      </ul>
                    </div>
                    <div>
                      <div className="text-emerald-400 font-semibold mb-2">Modeled Proactively (120 Days Before Exit)</div>
                      <ul className="space-y-2 text-neutral-400 text-xs">
                        <li>• Engine flagged provider as 12% of total medical spend</li>
                        <li>• Modeled 3 scenarios: stay with network, switch carriers, carve-out contract</li>
                        <li>• Negotiated direct contract with ortho group: 140% Medicare</li>
                        <li>• Alternative: switched to carrier with this group in-network</li>
                        <li>• Actual cost impact: $720K (direct contract) vs $680K baseline</li>
                        <li>• <strong>Avoided $420K surprise via proactive modeling + contract</strong></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-8">
                <h2 className="text-2xl font-display font-bold mb-6">Common Disruption Scenarios</h2>
                <div className="space-y-6">
                  <div className="border-l-4 border-red-400 pl-6">
                    <h3 className="font-semibold text-lg mb-2">High-Volume Provider Exit</h3>
                    <p className="text-neutral-400 text-sm mb-3">
                      Single provider or group represents 5-15% of your medical spend. When they leave network, members either 
                      pay OON cost-share (plan still liable for 60-70%) or disrupt to new in-network provider (unknown cost).
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-red-400">Risk Factors:</strong> Specialty groups (ortho, cardiology, GI), 
                      single-specialty ASCs, high-cost infusion centers
                    </div>
                  </div>

                  <div className="border-l-4 border-amber-400 pl-6">
                    <h3 className="font-semibold text-lg mb-2">Hospital System Merger</h3>
                    <p className="text-neutral-400 text-sm mb-3">
                      Two systems merge, one was in-network, other wasn't. Post-merger they want single contract at higher 
                      rates. Or merged entity terminates contract to gain negotiating leverage.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-amber-400">Cost Impact:</strong> Typical demand: 12-20% rate increase or 
                      termination; affects ER, admissions, outpatient surgery
                    </div>
                  </div>

                  <div className="border-l-4 border-blue-400 pl-6">
                    <h3 className="font-semibold text-lg mb-2">Facility Closure</h3>
                    <p className="text-neutral-400 text-sm mb-3">
                      Local ASC closes or hospital converts to urgent care only. Historical utilization redistributes to 
                      remaining facilities—often at higher cost if nearest alternative is more expensive.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-blue-400">Example:</strong> Low-cost ASC closes; procedures shift to hospital 
                      HOPD (facility fee 2.5x higher)
                    </div>
                  </div>

                  <div className="border-l-4 border-purple-400 pl-6">
                    <h3 className="font-semibold text-lg mb-2">Geographic Network Gap</h3>
                    <p className="text-neutral-400 text-sm mb-3">
                      You have 80 employees in satellite office; nearest in-network hospital is 45 miles. Local hospital not 
                      contracted. Employees use local facility, all OON claims.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-purple-400">Solution:</strong> Model cost of status quo vs. direct contract 
                      with local facility vs. moving to broader network carrier
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "modeling" && (
            <div className="space-y-6">
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-8">
                <h2 className="text-2xl font-display font-bold mb-6">Disruption Impact Model</h2>
                <p className="text-neutral-400 text-sm mb-6">
                  Engine identifies high-concentration providers/facilities, models utilization redistribution under exit 
                  scenarios, and forecasts cost impact at new reimbursement levels (OON rates or alternative in-network).
                </p>
                <div className="space-y-6">
                  <div className="bg-neutral-800/50 rounded-lg p-6">
                    <h3 className="font-semibold mb-4 text-red-400">Provider Concentration Analysis</h3>
                    <div className="space-y-3 text-sm">
                      <div className="grid grid-cols-4 gap-4 text-xs font-semibold text-neutral-500 border-b border-neutral-700 pb-2">
                        <span>Provider/Facility</span>
                        <span>Annual Spend</span>
                        <span>% of Total</span>
                        <span>Risk Level</span>
                      </div>
                      <div className="grid grid-cols-4 gap-4 text-xs">
                        <span className="text-neutral-300">ABC Orthopedics</span>
                        <span className="text-neutral-400 font-mono">$1.2M</span>
                        <span className="text-neutral-400 font-mono">14.2%</span>
                        <span className="text-red-400 font-semibold">Critical</span>
                      </div>
                      <div className="grid grid-cols-4 gap-4 text-xs">
                        <span className="text-neutral-300">Regional Medical Center</span>
                        <span className="text-neutral-400 font-mono">$2.8M</span>
                        <span className="text-neutral-400 font-mono">33.1%</span>
                        <span className="text-red-400 font-semibold">Critical</span>
                      </div>
                      <div className="grid grid-cols-4 gap-4 text-xs">
                        <span className="text-neutral-300">Valley ASC Network</span>
                        <span className="text-neutral-400 font-mono">$840K</span>
                        <span className="text-neutral-400 font-mono">9.9%</span>
                        <span className="text-amber-400 font-semibold">High</span>
                      </div>
                      <div className="grid grid-cols-4 gap-4 text-xs">
                        <span className="text-neutral-300">City Imaging Centers</span>
                        <span className="text-neutral-400 font-mono">$420K</span>
                        <span className="text-neutral-400 font-mono">5.0%</span>
                        <span className="text-blue-400 font-semibold">Medium</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-neutral-800/50 rounded-lg p-6">
                    <h3 className="font-semibold mb-4 text-emerald-400">Scenario Modeling Output</h3>
                    <div className="space-y-4 text-sm">
                      <div className="border border-neutral-700 rounded p-4">
                        <div className="font-semibold mb-2 text-neutral-200">Scenario: ABC Orthopedics Exits Network</div>
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between">
                            <span className="text-neutral-400">Current annual spend (in-network):</span>
                            <span className="text-neutral-300 font-mono">$1.2M</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-400">Projected OON spend (280% of allowed):</span>
                            <span className="text-red-400 font-mono">$2.02M</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-400">Alternative: Switch to Network B (group in-network):</span>
                            <span className="text-blue-400 font-mono">$1.38M</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-400">Alternative: Direct contract at 140% Medicare:</span>
                            <span className="text-emerald-400 font-mono">$1.26M</span>
                          </div>
                          <div className="flex justify-between font-semibold pt-2 border-t border-neutral-700">
                            <span className="text-neutral-200">Recommended: Direct Contract</span>
                            <span className="text-emerald-400">Saves $760K vs OON</span>
                          </div>
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
                <h2 className="text-2xl font-display font-bold mb-6">Strategic Applications</h2>
                <div className="space-y-6">
                  <div className="border-l-4 border-emerald-400 pl-6">
                    <h3 className="font-semibold text-lg mb-2">Proactive Contract Negotiation</h3>
                    <p className="text-neutral-400 text-sm mb-3">
                      When disruption is announced, you have leverage window (60-120 days). Model cost, present scenarios 
                      to CFO, decide whether to negotiate direct contract, switch networks, or accept cost increase.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-emerald-400">PE Portfolio Co:</strong> Hospital merger announced—modeled 
                      $1.2M cost increase; negotiated direct carve-out contract before effective date, saved $840K
                    </div>
                  </div>

                  <div className="border-l-4 border-blue-400 pl-6">
                    <h3 className="font-semibold text-lg mb-2">Network RFP Decision</h3>
                    <p className="text-neutral-400 text-sm mb-3">
                      Renewal time: carrier proposes 8% increase but key provider leaving network. Model true cost vs. 
                      switching to competitor with broader network. Disruption modeling reveals hidden cost in renewal proposal.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-blue-400">Manufacturing Client:</strong> Incumbent proposed 6.5% increase; 
                      modeling revealed network gap = +$680K hidden cost; switched carriers, saved $420K net
                    </div>
                  </div>

                  <div className="border-l-4 border-purple-400 pl-6">
                    <h3 className="font-semibold text-lg mb-2">Multi-Year Financial Planning</h3>
                    <p className="text-neutral-400 text-sm mb-3">
                      CFO building 3-year budget: model likely disruptions based on market intelligence (hospital mergers, 
                      ACO formations). Build contingency reserves for network risk.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-purple-400">Healthcare System:</strong> Modeled 4 likely consolidation scenarios; 
                      accrued $1.8M reserve for network disruption over 3 years
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