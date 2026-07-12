import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { Shield, TrendingUp, Target, ArrowLeft, CheckCircle2, AlertTriangle } from "lucide-react";

export default function GovernanceMaturityEngine() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <>
      <Head>
        <title>Governance Maturity Assessment Engine | Kincaid IQ</title>
        <meta name="description" content="Benchmark your benefits governance against ERISA best practices and institutional-grade fiduciary standards." />
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
                <Shield className="w-8 h-8 text-blue-400" />
              </div>
              <div>
                <h1 className="text-4xl font-display font-bold">Governance Maturity Assessment Engine</h1>
                <p className="text-neutral-400 mt-2">Score your fiduciary processes against institutional best practices</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-6">
                <Target className="w-10 h-10 text-blue-400 mb-3" />
                <h3 className="text-xl font-semibold mb-2">Objective Scoring</h3>
                <p className="text-neutral-400 text-sm">120-point assessment across 6 ERISA fiduciary domains</p>
              </div>
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-6">
                <TrendingUp className="w-10 h-10 text-emerald-400 mb-3" />
                <h3 className="text-xl font-semibold mb-2">Peer Benchmarking</h3>
                <p className="text-neutral-400 text-sm">Compare against Fortune 500, private equity, and industry standards</p>
              </div>
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-6">
                <CheckCircle2 className="w-10 h-10 text-purple-400 mb-3" />
                <h3 className="text-xl font-semibold mb-2">Roadmap</h3>
                <p className="text-neutral-400 text-sm">Prioritized action plan to close governance gaps</p>
              </div>
            </div>
          </div>

          <div className="border-b border-neutral-800 mb-8">
            <div className="flex gap-8">
              {["overview", "framework", "use-cases"].map((tab) => (
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
              <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-8">
                <h2 className="text-2xl font-display font-bold mb-4">From Ad Hoc to Institutional</h2>
                <p className="text-neutral-300 mb-4">
                  Most employers run benefits like a procurement exercise—annual broker meeting, sign renewals, move on. 
                  Institutional fiduciaries (pension funds, endowments) operate under continuous governance: documented 
                  processes, independent oversight, evidence-based decisions, annual audits. Our engine scores your current 
                  state across 6 fiduciary pillars and shows you the path to institutional-grade governance.
                </p>
                <div className="bg-neutral-900/50 rounded-lg p-6 mt-6">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    The Six Governance Pillars (20 points each, 120 total)
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-blue-400 font-semibold mb-2">1. Committee Structure</div>
                      <ul className="space-y-1 text-neutral-400 text-xs">
                        <li>• Formal benefits committee with charter</li>
                        <li>• Named fiduciaries with clear roles</li>
                        <li>• Meeting cadence (quarterly minimum)</li>
                        <li>• Minutes documenting all decisions</li>
                      </ul>
                    </div>
                    <div>
                      <div className="text-emerald-400 font-semibold mb-2">2. Decision Documentation</div>
                      <ul className="space-y-1 text-neutral-400 text-xs">
                        <li>• Written investment policy statement</li>
                        <li>• Vendor selection RFP process</li>
                        <li>• Fee benchmarking reports</li>
                        <li>• Decisions traceable to evidence</li>
                      </ul>
                    </div>
                    <div>
                      <div className="text-purple-400 font-semibold mb-2">3. Independent Oversight</div>
                      <ul className="space-y-1 text-neutral-400 text-xs">
                        <li>• Independent fiduciary advisor (fee-only)</li>
                        <li>• Annual external audit or review</li>
                        <li>• Board-level reporting on fiduciary risk</li>
                        <li>• Conflicts of interest policy</li>
                      </ul>
                    </div>
                    <div>
                      <div className="text-amber-400 font-semibold mb-2">4. Vendor Management</div>
                      <ul className="space-y-1 text-neutral-400 text-xs">
                        <li>• Competitive RFP every 3-5 years</li>
                        <li>• Fee transparency requirements</li>
                        <li>• Service level agreements (SLAs)</li>
                        <li>• Performance monitoring dashboards</li>
                      </ul>
                    </div>
                    <div>
                      <div className="text-red-400 font-semibold mb-2">5. Risk Management</div>
                      <ul className="space-y-1 text-neutral-400 text-xs">
                        <li>• Fiduciary liability insurance</li>
                        <li>• Fraud/error controls</li>
                        <li>• Regulatory compliance monitoring</li>
                        <li>• Whistleblower hotline</li>
                      </ul>
                    </div>
                    <div>
                      <div className="text-cyan-400 font-semibold mb-2">6. Education & Training</div>
                      <ul className="space-y-1 text-neutral-400 text-xs">
                        <li>• Fiduciary training for committee members</li>
                        <li>• Employee benefit literacy programs</li>
                        <li>• Annual compliance calendar</li>
                        <li>• Succession planning for key roles</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-8">
                <h2 className="text-2xl font-display font-bold mb-6">Maturity Benchmarks</h2>
                <div className="space-y-4">
                  <div className="border-l-4 border-red-400 pl-6 py-2">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg">Ad Hoc (0-40 points)</h3>
                      <span className="text-red-400 font-mono text-sm">High Risk</span>
                    </div>
                    <p className="text-neutral-400 text-sm mb-2">
                      No formal committee, broker-driven decisions, verbal approvals, no documentation. Decisions made 
                      reactively at renewal. High litigation and DOL audit risk.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-red-400">Typical Profile:</strong> Small employer (under 500 lives), 
                      HR generalist managing benefits part-time, relying entirely on broker recommendations
                    </div>
                  </div>

                  <div className="border-l-4 border-amber-400 pl-6 py-2">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg">Developing (41-70 points)</h3>
                      <span className="text-amber-400 font-mono text-sm">Moderate Risk</span>
                    </div>
                    <p className="text-neutral-400 text-sm mb-2">
                      Informal committee exists, some processes documented, decisions mostly broker-driven but with 
                      internal review. Some competitive bidding but inconsistent.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-amber-400">Typical Profile:</strong> Mid-market employer (500-2,000 lives), 
                      dedicated benefits manager, annual renewals follow process but limited independent validation
                    </div>
                  </div>

                  <div className="border-l-4 border-blue-400 pl-6 py-2">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg">Managed (71-95 points)</h3>
                      <span className="text-blue-400 font-mono text-sm">Lower Risk</span>
                    </div>
                    <p className="text-neutral-400 text-sm mb-2">
                      Formal committee with charter, documented processes, regular RFPs, some independent oversight. 
                      Evidence-based decision making most of the time. Board receives periodic updates.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-blue-400">Typical Profile:</strong> Large employer or PE-backed company 
                      (2,000+ lives), benefits committee meets quarterly, uses third-party advisors for major decisions
                    </div>
                  </div>

                  <div className="border-l-4 border-emerald-400 pl-6 py-2">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg">Institutional (96-120 points)</h3>
                      <span className="text-emerald-400 font-mono text-sm">Best Practice</span>
                    </div>
                    <p className="text-neutral-400 text-sm mb-2">
                      Full fiduciary infrastructure matching pension fund standards. Independent oversight, annual audits, 
                      all decisions evidence-based and documented, continuous monitoring, board-level accountability.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-emerald-400">Typical Profile:</strong> Fortune 500, sophisticated PE operators, 
                      self-insured health systems—treating health benefits with same rigor as pension governance
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "framework" && (
            <div className="space-y-6">
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-8">
                <h2 className="text-2xl font-display font-bold mb-6">Assessment Framework</h2>
                <p className="text-neutral-400 text-sm mb-6">
                  Each pillar scored 0-20 points based on presence and quality of specific practices. Scoring is binary 
                  (practice exists and is documented) to avoid subjective judgment.
                </p>
                <div className="space-y-6">
                  <div className="bg-neutral-800/50 rounded-lg p-6">
                    <h3 className="font-semibold mb-4 text-blue-400">Pillar 1: Committee Structure (20 points)</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start justify-between">
                        <span className="text-neutral-400">Formal benefits committee with written charter</span>
                        <span className="text-emerald-400 font-mono">5 pts</span>
                      </div>
                      <div className="flex items-start justify-between">
                        <span className="text-neutral-400">Named fiduciaries with documented roles/responsibilities</span>
                        <span className="text-emerald-400 font-mono">5 pts</span>
                      </div>
                      <div className="flex items-start justify-between">
                        <span className="text-neutral-400">Quarterly meetings minimum (with published schedule)</span>
                        <span className="text-emerald-400 font-mono">5 pts</span>
                      </div>
                      <div className="flex items-start justify-between">
                        <span className="text-neutral-400">Meeting minutes documenting all major decisions</span>
                        <span className="text-emerald-400 font-mono">5 pts</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-neutral-800/50 rounded-lg p-6">
                    <h3 className="font-semibold mb-4 text-emerald-400">Pillar 2: Decision Documentation (20 points)</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start justify-between">
                        <span className="text-neutral-400">Written investment policy statement (IPS) for plan assets</span>
                        <span className="text-emerald-400 font-mono">5 pts</span>
                      </div>
                      <div className="flex items-start justify-between">
                        <span className="text-neutral-400">Formal RFP process for vendor selection (documented)</span>
                        <span className="text-emerald-400 font-mono">5 pts</span>
                      </div>
                      <div className="flex items-start justify-between">
                        <span className="text-neutral-400">Annual fee benchmarking reports vs. market</span>
                        <span className="text-emerald-400 font-mono">5 pts</span>
                      </div>
                      <div className="flex items-start justify-between">
                        <span className="text-neutral-400">Decision memos linking choices to supporting evidence</span>
                        <span className="text-emerald-400 font-mono">5 pts</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-neutral-800/50 rounded-lg p-6">
                    <h3 className="font-semibold mb-4 text-purple-400">Pillar 3: Independent Oversight (20 points)</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start justify-between">
                        <span className="text-neutral-400">Fee-only fiduciary advisor (no commissions from vendors)</span>
                        <span className="text-emerald-400 font-mono">7 pts</span>
                      </div>
                      <div className="flex items-start justify-between">
                        <span className="text-neutral-400">Annual external audit or fiduciary review</span>
                        <span className="text-emerald-400 font-mono">7 pts</span>
                      </div>
                      <div className="flex items-start justify-between">
                        <span className="text-neutral-400">Quarterly board/audit committee fiduciary risk reporting</span>
                        <span className="text-emerald-400 font-mono">3 pts</span>
                      </div>
                      <div className="flex items-start justify-between">
                        <span className="text-neutral-400">Written conflicts of interest policy for committee members</span>
                        <span className="text-emerald-400 font-mono">3 pts</span>
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
                    <h3 className="font-semibold text-lg mb-2">Pre-M&A Due Diligence</h3>
                    <p className="text-neutral-400 text-sm mb-3">
                      Score target company governance before acquisition. Low scores = integration risk and potential 
                      DOL exposure that could derail deal or require price adjustment.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-emerald-400">PE Use Case:</strong> Target scored 28/120 (ad hoc governance), 
                      no committee, no RFPs in 8 years. Post-close spent $2M unwinding conflicts and establishing clean governance—
                      factored into purchase price negotiation
                    </div>
                  </div>

                  <div className="border-l-4 border-blue-400 pl-6">
                    <h3 className="font-semibold text-lg mb-2">Board Reporting</h3>
                    <p className="text-neutral-400 text-sm mb-3">
                      Annual governance score gives audit committee objective metric on fiduciary posture. Shows year-over-year 
                      improvement and gap vs. industry benchmark.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-blue-400">Risk Committee:</strong> Presented 3-year roadmap from 52 points 
                      (developing) to 85+ (managed)—board approved budget for independent advisor + annual audits
                    </div>
                  </div>

                  <div className="border-l-4 border-purple-400 pl-6">
                    <h3 className="font-semibold text-lg mb-2">DOL Audit Defense</h3>
                    <p className="text-neutral-400 text-sm mb-3">
                      If DOL opens investigation, governance score + improvement roadmap demonstrates good-faith effort 
                      to comply with ERISA standards. Mitigates penalties.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-purple-400">Litigation Avoidance:</strong> DOL cited governance deficiencies, 
                      company showed 2-year improvement from 41 to 78 points + corrective action plan—DOL closed case with warning letter, no fine
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