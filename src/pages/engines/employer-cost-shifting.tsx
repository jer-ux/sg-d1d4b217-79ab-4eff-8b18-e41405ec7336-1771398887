import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { TrendingDown, DollarSign, Users, ArrowLeft, AlertTriangle, Target, Calendar, CheckCircle2, ArrowUpRight } from "lucide-react";

export default function EmployerCostShiftingEngine() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <>
      <Head>
        <title>Employer Cost Shifting Engine | Kincaid IQ</title>
        <meta name="description" content="Quantify and optimize employee cost-sharing strategies while maintaining benefit competitiveness and workforce satisfaction." />
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
              <div className="p-3 bg-emerald-500/10 rounded-lg">
                <TrendingDown className="w-8 h-8 text-emerald-400" />
              </div>
              <div>
                <h1 className="text-4xl font-display font-bold">Employer Cost Shifting Engine</h1>
                <p className="text-neutral-400 mt-2">Strategic cost-sharing that balances budgets and talent retention</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-6">
                <DollarSign className="w-10 h-10 text-emerald-400 mb-3" />
                <h3 className="text-xl font-semibold mb-2">Optimal Balance</h3>
                <p className="text-neutral-400 text-sm">Find the equilibrium between employer savings and employee satisfaction</p>
              </div>
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-6">
                <Users className="w-10 h-10 text-blue-400 mb-3" />
                <h3 className="text-xl font-semibold mb-2">Member Impact</h3>
                <p className="text-neutral-400 text-sm">Model out-of-pocket burden across income tiers and family types</p>
              </div>
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-6">
                <Target className="w-10 h-10 text-purple-400 mb-3" />
                <h3 className="text-xl font-semibold mb-2">Strategic Design</h3>
                <p className="text-neutral-400 text-sm">Shift costs where it matters least to members, maximum to employer</p>
              </div>
            </div>
          </div>

          <div className="border-b border-neutral-800 mb-8">
            <div className="flex gap-8">
              {["overview", "strategies", "use-cases"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 px-2 font-medium transition-colors relative ${
                    activeTab === tab
                      ? "text-emerald-400"
                      : "text-neutral-400 hover:text-neutral-300"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1).replace("-", " ")}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {activeTab === "overview" && (
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 rounded-lg p-8">
                <h2 className="text-2xl font-display font-bold mb-4">The Cost-Shifting Paradox</h2>
                <p className="text-neutral-300 mb-4">
                  Most employers shift costs blindly through across-the-board deductible increases or contribution hikes—maximizing 
                  employee pain while delivering minimal employer savings. Our engine identifies surgical shifts that achieve 3-5x 
                  better cost ratios: high employer savings with low member friction.
                </p>
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="bg-neutral-900/50 rounded-lg p-6">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-amber-400" />
                      Blunt Cost Shifting
                    </h3>
                    <ul className="space-y-2 text-sm text-neutral-400">
                      <li>• Across-the-board deductible increases</li>
                      <li>• Uniform premium contribution hikes</li>
                      <li>• Disproportionate impact on low earners</li>
                      <li>• Delayed care, worse health outcomes</li>
                      <li>• Talent retention damage</li>
                    </ul>
                  </div>
                  <div className="bg-neutral-900/50 rounded-lg p-6">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      Strategic Cost Shifting
                    </h3>
                    <ul className="space-y-2 text-sm text-neutral-400">
                      <li>• Income-tiered contribution structures</li>
                      <li>• Value-based plan design incentives</li>
                      <li>• Strategic pharmacy tier shifts</li>
                      <li>• Protected preventive/chronic care access</li>
                      <li>• Minimal morale impact</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-8">
                <h2 className="text-2xl font-display font-bold mb-6">Real-World Impact</h2>
                <div className="space-y-6">
                  <div className="border-l-4 border-emerald-400 pl-6 py-2">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg">Technology Company (8,500 employees)</h3>
                      <span className="text-emerald-400 font-mono text-sm">$4.2M Saved</span>
                    </div>
                    <p className="text-neutral-400 text-sm mb-3">
                      Instead of raising deductibles $500 across the board, implemented income-tiered contributions (0-3% of salary) 
                      plus pharmacy tier realignment. Delivered $4.2M employer savings with 89% employee approval—vs. projected 
                      52% approval for deductible increase.
                    </p>
                    <div className="grid grid-cols-3 gap-4 text-center bg-neutral-800/50 rounded p-3">
                      <div>
                        <div className="text-xs text-neutral-500">Employer Savings</div>
                        <div className="text-sm text-emerald-400 font-mono">$4.2M/year</div>
                      </div>
                      <div>
                        <div className="text-xs text-neutral-500">Employee Satisfaction</div>
                        <div className="text-sm text-emerald-400 font-mono">89% Approve</div>
                      </div>
                      <div>
                        <div className="text-xs text-neutral-500">Turnover Impact</div>
                        <div className="text-sm text-emerald-400 font-mono">No Change</div>
                      </div>
                    </div>
                  </div>

                  <div className="border-l-4 border-blue-400 pl-6 py-2">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg">Manufacturing Client (3,200 employees)</h3>
                      <span className="text-blue-400 font-mono text-sm">$1.8M Saved</span>
                    </div>
                    <p className="text-neutral-400 text-sm mb-3">
                      Eliminated spousal surcharge (was penalizing 40% of workforce) and replaced with value-based incentives 
                      for preventive care completion. Same employer savings, improved primary care access, reduced ER utilization 18%.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-blue-400">Health Outcome:</strong> A1C control improved 14% in diabetic population—
                      cost-shifting strategy that actually improved health
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "strategies" && (
            <div className="space-y-6">
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-8">
                <h2 className="text-2xl font-display font-bold mb-6">Strategic Shift Mechanisms</h2>
                <div className="space-y-6">
                  <div className="bg-neutral-800/50 rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-emerald-500/10 rounded">
                        <DollarSign className="w-6 h-6 text-emerald-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">Income-Tiered Contributions</h3>
                        <p className="text-neutral-400 text-sm mb-3">
                          Progressive premium structures: 0% for &lt;$50K earners, 1-2% for mid-tier, 3-4% for executives. 
                          Shifts burden to high earners who can absorb it without reducing take-home meaningfully.
                        </p>
                        <div className="bg-neutral-900/50 rounded p-3 text-xs">
                          <div className="grid grid-cols-3 gap-3">
                            <div>
                              <div className="text-neutral-500">Low Earners</div>
                              <div className="text-emerald-400 font-mono">0% Contribution</div>
                            </div>
                            <div>
                              <div className="text-neutral-500">Mid Tier</div>
                              <div className="text-blue-400 font-mono">1.5% Avg</div>
                            </div>
                            <div>
                              <div className="text-neutral-500">Executives</div>
                              <div className="text-purple-400 font-mono">3.5% Avg</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-neutral-800/50 rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-blue-500/10 rounded">
                        <Target className="w-6 h-6 text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">Value-Based Plan Design</h3>
                        <p className="text-neutral-400 text-sm mb-3">
                          Zero cost-sharing for high-value services (preventive care, primary visits, generics for chronic conditions). 
                          Higher cost-sharing for low-value services (brand drugs with generic alternatives, unnecessary imaging).
                        </p>
                        <div className="grid md:grid-cols-2 gap-3 text-xs">
                          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded p-3">
                            <div className="text-emerald-400 font-semibold mb-2">Zero Cost-Share</div>
                            <ul className="space-y-1 text-neutral-400">
                              <li>• Annual physicals</li>
                              <li>• Chronic disease management</li>
                              <li>• Generic medications</li>
                              <li>• Preventive screenings</li>
                            </ul>
                          </div>
                          <div className="bg-amber-500/10 border border-amber-500/20 rounded p-3">
                            <div className="text-amber-400 font-semibold mb-2">Higher Cost-Share</div>
                            <ul className="space-y-1 text-neutral-400">
                              <li>• Brand drugs (generic available)</li>
                              <li>• Out-of-network care</li>
                              <li>• High-cost imaging without pre-auth</li>
                              <li>• ER for non-urgent</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-neutral-800/50 rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-purple-500/10 rounded">
                        <ArrowUpRight className="w-6 h-6 text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">Pharmacy Tier Realignment</h3>
                        <p className="text-neutral-400 text-sm mb-3">
                          Shift select brands from Tier 2 to Tier 3 where generics/biosimilars exist. Typically delivers 
                          $200-400 PEPY savings with minimal member impact if therapeutic alternatives are protected.
                        </p>
                        <div className="bg-neutral-900/50 rounded p-3 text-xs text-neutral-400">
                          <strong className="text-purple-400">Example Shift:</strong> Moving 15 brand insulins to Tier 3 
                          while keeping biosimilar insulins on Tier 2 saved $1.2M annually for 5,000-employee group
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
                <h2 className="text-2xl font-display font-bold mb-6">Executive Decision Points</h2>
                <div className="space-y-6">
                  <div className="border-l-4 border-emerald-400 pl-6">
                    <h3 className="font-semibold text-lg mb-2">Budget Deficit Response</h3>
                    <p className="text-neutral-400 text-sm mb-3">
                      Need to close $5M healthcare cost gap? Our engine ranks 20+ shift mechanisms by employer 
                      savings per unit of member pain. Select top-scoring options to hit target with minimal workforce impact.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-emerald-400">CFO Outcome:</strong> Closed $5.2M gap using top 3 ranked strategies—
                      employee survey showed 71% understood rationale and 68% approved approach
                    </div>
                  </div>

                  <div className="border-l-4 border-blue-400 pl-6">
                    <h3 className="font-semibold text-lg mb-2">Competitive Positioning</h3>
                    <p className="text-neutral-400 text-sm mb-3">
                      Benchmark your cost-sharing levels vs. industry peers and identify high-impact areas where you're an outlier. 
                      Model talent acquisition impact of proposed shifts before implementing.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-blue-400">CHRO Value:</strong> Identified company was 90th percentile generous 
                      on specialist copays—realigned to 60th percentile, saved $900K with zero turnover impact
                    </div>
                  </div>

                  <div className="border-l-4 border-purple-400 pl-6">
                    <h3 className="font-semibold text-lg mb-2">Union Negotiation</h3>
                    <p className="text-neutral-400 text-sm mb-3">
                      Model cost-sharing proposals objectively during collective bargaining. Show union reps exact 
                      member-by-member impact by income quartile and family type.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-purple-400">Labor Relations:</strong> Transparent modeling built union trust—
                      accepted 3-year agreement with progressive cost-sharing vs. flat deductible increase
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