import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { Award, DollarSign, Users, ArrowLeft, Target, TrendingUp, BarChart3, CheckCircle2 } from "lucide-react";

export default function BenefitRichnessEngine() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <>
      <Head>
        <title>Benefit Richness Scoring Engine | Kincaid IQ</title>
        <meta name="description" content="Quantify plan generosity across medical, pharmacy, and ancillary benefits to optimize competitive positioning and cost management." />
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
                <Award className="w-8 h-8 text-emerald-400" />
              </div>
              <div>
                <h1 className="text-4xl font-display font-bold">Benefit Richness Scoring Engine</h1>
                <p className="text-neutral-400 mt-2">Quantify plan generosity for strategic talent and cost decisions</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-6">
                <Target className="w-10 h-10 text-emerald-400 mb-3" />
                <h3 className="text-xl font-semibold mb-2">Competitive Intel</h3>
                <p className="text-neutral-400 text-sm">Know exactly where you stand vs. peers on plan generosity</p>
              </div>
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-6">
                <DollarSign className="w-10 h-10 text-blue-400 mb-3" />
                <h3 className="text-xl font-semibold mb-2">Cost-Value Trade-offs</h3>
                <p className="text-neutral-400 text-sm">Identify where richness delivers talent ROI vs. wasted spend</p>
              </div>
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-6">
                <BarChart3 className="w-10 h-10 text-purple-400 mb-3" />
                <h3 className="text-xl font-semibold mb-2">Strategic Design</h3>
                <p className="text-neutral-400 text-sm">Optimize benefit mix to win talent wars at controlled cost</p>
              </div>
            </div>
          </div>

          <div className="border-b border-neutral-800 mb-8">
            <div className="flex gap-8">
              {["overview", "scoring", "use-cases"].map((tab) => (
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
              <div className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 rounded-lg p-8">
                <h2 className="text-2xl font-display font-bold mb-4">The Richness Blind Spot</h2>
                <p className="text-neutral-300 mb-4">
                  Most CFOs know their total benefit spend but can't quantify actual plan generosity. A $15K PEPY plan 
                  can be stingy (high spend, low richness) or generous (rich benefits, efficient delivery). Our scoring 
                  engine separates cost from value—revealing whether you're overpaying for mediocre coverage or 
                  delivering premium benefits efficiently.
                </p>
                <div className="bg-neutral-900/50 rounded-lg p-6 mt-6">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    What Richness Scoring Reveals
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-neutral-400">
                    <ul className="space-y-2">
                      <li>• Your competitive position vs. peer deciles</li>
                      <li>• Which benefit categories drive perceived value</li>
                      <li>• Cost-inefficient richness (waste zones)</li>
                      <li>• Strategic under-investment (talent gaps)</li>
                    </ul>
                    <ul className="space-y-2">
                      <li>• Plan design ROI by workforce segment</li>
                      <li>• Recruitment/retention impact by richness tier</li>
                      <li>• Broker/consultant performance validation</li>
                      <li>• Union negotiation leverage points</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-8">
                <h2 className="text-2xl font-display font-bold mb-6">Real-World Impact</h2>
                <div className="space-y-6">
                  <div className="border-l-4 border-emerald-400 pl-6 py-2">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg">Tech Unicorn (2,800 employees)</h3>
                      <span className="text-emerald-400 font-mono text-sm">$3.1M Redirected</span>
                    </div>
                    <p className="text-neutral-400 text-sm mb-3">
                      Richness scoring revealed they were 95th percentile on specialist copays (unused by 22-34 year old workforce) 
                      but 40th percentile on mental health coverage (high demand segment). Reallocated spend: mental health to 
                      90th percentile, specialists to 65th. Employee satisfaction jumped 18 points.
                    </p>
                    <div className="grid grid-cols-3 gap-4 text-center bg-neutral-800/50 rounded p-3">
                      <div>
                        <div className="text-xs text-neutral-500">Specialist Copay</div>
                        <div className="text-sm text-neutral-300 font-mono">95th → 65th</div>
                      </div>
                      <div>
                        <div className="text-xs text-neutral-500">Mental Health</div>
                        <div className="text-sm text-emerald-400 font-mono">40th → 90th</div>
                      </div>
                      <div>
                        <div className="text-xs text-neutral-500">Cost Impact</div>
                        <div className="text-sm text-emerald-400 font-mono">-$450K/yr</div>
                      </div>
                    </div>
                  </div>

                  <div className="border-l-4 border-blue-400 pl-6 py-2">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg">Manufacturing (12,000 employees)</h3>
                      <span className="text-blue-400 font-mono text-sm">Union Win</span>
                    </div>
                    <p className="text-neutral-400 text-sm mb-3">
                      Scored at 82nd percentile overall richness vs. regional competitors—data defeated union's "poverty benefits" 
                      narrative. Avoided $8M in concessions by showing objective generosity positioning. Preserved 3-year labor peace.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-blue-400">Strategic Value:</strong> Union accepted 2.5% wage increase vs. 
                      demanded 4.5% after seeing richness data validated by third-party actuarial review
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "scoring" && (
            <div className="space-y-6">
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-8">
                <h2 className="text-2xl font-display font-bold mb-6">Scoring Methodology</h2>
                <div className="space-y-6">
                  <div className="bg-neutral-800/50 rounded-lg p-6">
                    <h3 className="font-semibold mb-3">Medical Plan Richness (40% weight)</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-emerald-400 font-semibold mb-2">Cost-Sharing Components</div>
                        <ul className="space-y-1 text-neutral-400">
                          <li>• Deductible levels (individual/family)</li>
                          <li>• Out-of-pocket maximums</li>
                          <li>• Coinsurance rates by service type</li>
                          <li>• Copay structures (PCP, specialist, ER)</li>
                        </ul>
                      </div>
                      <div>
                        <div className="text-blue-400 font-semibold mb-2">Network Components</div>
                        <ul className="space-y-1 text-neutral-400">
                          <li>• Provider network breadth/quality</li>
                          <li>• Out-of-network benefit availability</li>
                          <li>• Geographic coverage adequacy</li>
                          <li>• Center of Excellence access</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-neutral-800/50 rounded-lg p-6">
                    <h3 className="font-semibold mb-3">Pharmacy Richness (30% weight)</h3>
                    <div className="grid md:grid-cols-3 gap-3 text-xs">
                      <div className="bg-neutral-900/50 rounded p-3">
                        <div className="text-purple-400 font-semibold mb-2">Formulary Design</div>
                        <ul className="space-y-1 text-neutral-400">
                          <li>• Tier structure (3, 4, or 5 tier)</li>
                          <li>• Specialty tier existence/cost</li>
                          <li>• Generic substitution requirements</li>
                        </ul>
                      </div>
                      <div className="bg-neutral-900/50 rounded p-3">
                        <div className="text-amber-400 font-semibold mb-2">Cost Sharing</div>
                        <ul className="space-y-1 text-neutral-400">
                          <li>• Retail copay levels by tier</li>
                          <li>• Mail order incentives/savings</li>
                          <li>• Specialty pharmacy copays</li>
                        </ul>
                      </div>
                      <div className="bg-neutral-900/50 rounded p-3">
                        <div className="text-emerald-400 font-semibold mb-2">Access Barriers</div>
                        <ul className="space-y-1 text-neutral-400">
                          <li>• Prior authorization prevalence</li>
                          <li>• Step therapy requirements</li>
                          <li>• Quantity limit strictness</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-neutral-800/50 rounded-lg p-6">
                    <h3 className="font-semibold mb-3">Ancillary & Voluntary (30% weight)</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <ul className="space-y-2 text-neutral-400">
                        <li>• Dental plan richness (preventive, basic, major coverage)</li>
                        <li>• Vision plan generosity (exams, frames, contacts)</li>
                        <li>• Mental health parity and access</li>
                        <li>• Fertility/maternity benefits</li>
                      </ul>
                      <ul className="space-y-2 text-neutral-400">
                        <li>• Disability income replacement rates</li>
                        <li>• Life insurance multiples</li>
                        <li>• HSA/FSA employer contributions</li>
                        <li>• Wellness program incentive value</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-8">
                <h2 className="text-2xl font-display font-bold mb-4">Composite Scoring Output</h2>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="bg-neutral-900/50 rounded p-4 text-center">
                    <div className="text-3xl font-bold text-emerald-400 mb-1">78</div>
                    <div className="text-xs text-neutral-500">Overall Richness Score</div>
                    <div className="text-xs text-neutral-400 mt-2">(0-100 scale)</div>
                  </div>
                  <div className="bg-neutral-900/50 rounded p-4 text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-1">72nd</div>
                    <div className="text-xs text-neutral-500">Peer Percentile</div>
                    <div className="text-xs text-neutral-400 mt-2">(Industry cohort)</div>
                  </div>
                  <div className="bg-neutral-900/50 rounded p-4 text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-1">$14,200</div>
                    <div className="text-xs text-neutral-500">Actuarial Value</div>
                    <div className="text-xs text-neutral-400 mt-2">(Member perspective)</div>
                  </div>
                  <div className="bg-neutral-900/50 rounded p-4 text-center">
                    <div className="text-3xl font-bold text-amber-400 mb-1">1.18</div>
                    <div className="text-xs text-neutral-500">Efficiency Ratio</div>
                    <div className="text-xs text-neutral-400 mt-2">(Value per dollar)</div>
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
                    <h3 className="font-semibold text-lg mb-2">Talent Acquisition ROI</h3>
                    <p className="text-neutral-400 text-sm mb-3">
                      Model offer acceptance rates vs. benefit richness percentile. Quantify how much moving from 50th 
                      to 75th percentile improves recruiting outcomes—then decide if talent ROI justifies cost.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-emerald-400">CFO Decision:</strong> $2.8M richness increase to 80th percentile 
                      reduced time-to-fill 32% and cut recruiting agency fees $1.9M—net positive first year
                    </div>
                  </div>

                  <div className="border-l-4 border-blue-400 pl-6">
                    <h3 className="font-semibold text-lg mb-2">Strategic Benefit Cuts</h3>
                    <p className="text-neutral-400 text-sm mb-3">
                      Need to reduce benefits cost? Our engine ranks components by visibility-to-employees vs. actuarial value. 
                      Cut low-visibility, high-cost items first to minimize morale damage per dollar saved.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-blue-400">Surgical Cut Example:</strong> Removed out-of-network coverage 
                      (95% network adequacy, 3% utilization) saved $1.4M with zero employee complaints
                    </div>
                  </div>

                  <div className="border-l-4 border-purple-400 pl-6">
                    <h3 className="font-semibold text-lg mb-2">M&A Integration</h3>
                    <p className="text-neutral-400 text-sm mb-3">
                      Score both acquirer and target benefit programs. Harmonize to target richness tier that balances 
                      retention (don't downgrade target) and cost control (don't upgrade acquirer unnecessarily).
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-purple-400">Integration Win:</strong> Maintained target's 85th percentile 
                      dental (high value signal) while moving medical to acquirer's 70th percentile (minimal friction)
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