import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { Users, TrendingUp, FileText, ArrowLeft, CheckCircle2, AlertTriangle } from "lucide-react";

export default function BoardOversightEngine() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <>
      <Head>
        <title>Board Oversight Scoring Engine | Kincaid IQ</title>
        <meta name="description" content="Evaluate board-level benefits oversight and fiduciary duty execution for directors and executives." />
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
              <div className="p-3 bg-purple-500/10 rounded-lg">
                <Users className="w-8 h-8 text-purple-400" />
              </div>
              <div>
                <h1 className="text-4xl font-display font-bold">Board Oversight Scoring Engine</h1>
                <p className="text-neutral-400 mt-2">Measure director fulfillment of benefits oversight duties</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-6">
                <FileText className="w-10 h-10 text-purple-400 mb-3" />
                <h3 className="text-xl font-semibold mb-2">Director Duties</h3>
                <p className="text-neutral-400 text-sm">Score fulfillment of ERISA duty of care and duty of loyalty</p>
              </div>
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-6">
                <TrendingUp className="w-10 h-10 text-emerald-400 mb-3" />
                <h3 className="text-xl font-semibold mb-2">Peer Benchmarks</h3>
                <p className="text-neutral-400 text-sm">Compare against Fortune 500 and institutional investor standards</p>
              </div>
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-6">
                <CheckCircle2 className="w-10 h-10 text-blue-400 mb-3" />
                <h3 className="text-xl font-semibold mb-2">Liability Shield</h3>
                <p className="text-neutral-400 text-sm">Document oversight for D&O protection and shareholder defense</p>
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
              <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-lg p-8">
                <h2 className="text-2xl font-display font-bold mb-4">Directors Are Named Fiduciaries</h2>
                <p className="text-neutral-300 mb-4">
                  Under ERISA, board members of self-funded plans are named fiduciaries with personal liability for benefits 
                  oversight. Yet most boards receive one annual benefits update—no metrics, no independent validation, no 
                  oversight documentation. When DOL audits or participants sue, directors discover they're personally liable 
                  for decisions they never reviewed. Our engine scores actual board engagement vs. fiduciary duty requirements.
                </p>
                <div className="bg-neutral-900/50 rounded-lg p-6 mt-6">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    Board Fiduciary Responsibilities
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-purple-400 font-semibold mb-2">Duty of Care</div>
                      <ul className="space-y-1 text-neutral-400 text-xs">
                        <li>• Understand plan costs and operations</li>
                        <li>• Review vendor contracts and fees</li>
                        <li>• Monitor plan performance vs. benchmarks</li>
                        <li>• Investigate conflicts of interest</li>
                        <li>• Act with same care as in own financial matters</li>
                      </ul>
                    </div>
                    <div>
                      <div className="text-blue-400 font-semibold mb-2">Duty of Loyalty</div>
                      <ul className="space-y-1 text-neutral-400 text-xs">
                        <li>• Act solely in participants' interests</li>
                        <li>• No self-dealing or conflicts</li>
                        <li>• Prevent plan assets from enriching vendors</li>
                        <li>• Challenge broker/consultant recommendations</li>
                        <li>• Put member welfare above company convenience</li>
                      </ul>
                    </div>
                    <div>
                      <div className="text-emerald-400 font-semibold mb-2">Duty to Monitor</div>
                      <ul className="space-y-1 text-neutral-400 text-xs">
                        <li>• Receive regular fiduciary reports</li>
                        <li>• Review external audits/benchmarks</li>
                        <li>• Track vendor SLA compliance</li>
                        <li>• Investigate member complaints</li>
                        <li>• Ensure committee has resources</li>
                      </ul>
                    </div>
                    <div>
                      <div className="text-amber-400 font-semibold mb-2">Documentation Standard</div>
                      <ul className="space-y-1 text-neutral-400 text-xs">
                        <li>• Board minutes reflect benefits oversight</li>
                        <li>• Questions asked and answers documented</li>
                        <li>• Major decisions supported by evidence</li>
                        <li>• Independent expert opinions on file</li>
                        <li>• Conflicts disclosed and managed</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-8">
                <h2 className="text-2xl font-display font-bold mb-6">What Directors Don't Know Hurts Them</h2>
                <div className="space-y-6">
                  <div className="border-l-4 border-red-400 pl-6 py-2">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg">Manufacturing Company Board</h3>
                      <span className="text-red-400 font-mono text-sm">$8.4M Judgment</span>
                    </div>
                    <p className="text-neutral-400 text-sm mb-3">
                      Participant lawsuit alleged PBM overcharges. Directors claimed they relied on broker assurances. 
                      Plaintiffs showed board received zero PBM performance reports in 5 years, never asked about spreads, 
                      approved renewals in under 10 minutes. Court ruled directors breached duty of care—personal liability 
                      because D&O policy excluded fiduciary claims.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-red-400">Board Oversight Score:</strong> 12/100 (deficient). No benefits 
                      committee minutes, no vendor benchmarks, no independent audits, no documented oversight
                    </div>
                  </div>

                  <div className="border-l-4 border-amber-400 pl-6 py-2">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg">Healthcare System Board</h3>
                      <span className="text-amber-400 font-mono text-sm">DOL Investigation</span>
                    </div>
                    <p className="text-neutral-400 text-sm mb-3">
                      DOL audit revealed broker received $2.7M in undisclosed override commissions. Board defended that 
                      "benefits are HR's job." DOL cited board minutes showing benefits received 8 minutes/year total. 
                      Assessed penalties for failure to monitor—directors personally liable but settled via company indemnity.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-amber-400">Board Oversight Score:</strong> 24/100 (inadequate). Quarterly 
                      benefits update existed but no metrics, no questions documented, no follow-up on vendor fees
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "framework" && (
            <div className="space-y-6">
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-8">
                <h2 className="text-2xl font-display font-bold mb-6">100-Point Scoring Framework</h2>
                <p className="text-neutral-400 text-sm mb-6">
                  Score based on documented evidence in board materials, minutes, and reports. We review 12 months of 
                  board activity and score against institutional investor standards.
                </p>
                <div className="space-y-6">
                  <div className="bg-neutral-800/50 rounded-lg p-6">
                    <h3 className="font-semibold mb-4 text-purple-400">Information Quality (25 points)</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start justify-between">
                        <span className="text-neutral-400">Quarterly benefits dashboard with KPIs to board</span>
                        <span className="text-emerald-400 font-mono">10 pts</span>
                      </div>
                      <div className="flex items-start justify-between">
                        <span className="text-neutral-400">Annual independent benchmarking report</span>
                        <span className="text-emerald-400 font-mono">8 pts</span>
                      </div>
                      <div className="flex items-start justify-between">
                        <span className="text-neutral-400">Vendor performance scorecards presented</span>
                        <span className="text-emerald-400 font-mono">4 pts</span>
                      </div>
                      <div className="flex items-start justify-between">
                        <span className="text-neutral-400">Fiduciary risk assessment annually</span>
                        <span className="text-emerald-400 font-mono">3 pts</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-neutral-800/50 rounded-lg p-6">
                    <h3 className="font-semibold mb-4 text-blue-400">Engagement Quality (25 points)</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start justify-between">
                        <span className="text-neutral-400">Board minutes show substantive Q&A on benefits</span>
                        <span className="text-emerald-400 font-mono">10 pts</span>
                      </div>
                      <div className="flex items-start justify-between">
                        <span className="text-neutral-400">Directors challenged vendor/broker recommendations</span>
                        <span className="text-emerald-400 font-mono">8 pts</span>
                      </div>
                      <div className="flex items-start justify-between">
                        <span className="text-neutral-400">Board requested independent validation of major decisions</span>
                        <span className="text-emerald-400 font-mono">5 pts</span>
                      </div>
                      <div className="flex items-start justify-between">
                        <span className="text-neutral-400">Directors attended fiduciary training</span>
                        <span className="text-emerald-400 font-mono">2 pts</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-neutral-800/50 rounded-lg p-6">
                    <h3 className="font-semibold mb-4 text-emerald-400">Oversight Structure (25 points)</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start justify-between">
                        <span className="text-neutral-400">Benefits committee reports to board/audit committee</span>
                        <span className="text-emerald-400 font-mono">10 pts</span>
                      </div>
                      <div className="flex items-start justify-between">
                        <span className="text-neutral-400">Board delegated authority with clear limits in charter</span>
                        <span className="text-emerald-400 font-mono">8 pts</span>
                      </div>
                      <div className="flex items-start justify-between">
                        <span className="text-neutral-400">Board receives escalation of fiduciary issues</span>
                        <span className="text-emerald-400 font-mono">5 pts</span>
                      </div>
                      <div className="flex items-start justify-between">
                        <span className="text-neutral-400">Independent director chairs benefits committee</span>
                        <span className="text-emerald-400 font-mono">2 pts</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-neutral-800/50 rounded-lg p-6">
                    <h3 className="font-semibold mb-4 text-amber-400">Decision Documentation (25 points)</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start justify-between">
                        <span className="text-neutral-400">Major decisions documented with supporting rationale</span>
                        <span className="text-emerald-400 font-mono">10 pts</span>
                      </div>
                      <div className="flex items-start justify-between">
                        <span className="text-neutral-400">Board approved formal investment policy for plan assets</span>
                        <span className="text-emerald-400 font-mono">8 pts</span>
                      </div>
                      <div className="flex items-start justify-between">
                        <span className="text-neutral-400">Conflict of interest disclosures on file</span>
                        <span className="text-emerald-400 font-mono">5 pts</span>
                      </div>
                      <div className="flex items-start justify-between">
                        <span className="text-neutral-400">Board reviewed and approved RFP process/results</span>
                        <span className="text-emerald-400 font-mono">2 pts</span>
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
                    <h3 className="font-semibold text-lg mb-2">D&O Insurance Pricing</h3>
                    <p className="text-neutral-400 text-sm mb-3">
                      Insurers ask about benefits oversight when pricing D&O policies. High board oversight score = 
                      documented fiduciary processes = lower litigation risk = better pricing.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-emerald-400">Insurance Win:</strong> Improved oversight score from 38 to 76 
                      over 18 months—D&O carrier reduced fiduciary sublimit premium by 22%
                    </div>
                  </div>

                  <div className="border-l-4 border-blue-400 pl-6">
                    <h3 className="font-semibold text-lg mb-2">Shareholder Derivative Defense</h3>
                    <p className="text-neutral-400 text-sm mb-3">
                      In derivative suits alleging breach of fiduciary duty, board oversight documentation is key defense. 
                      High score = proof directors exercised care, asked questions, demanded evidence.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-blue-400">Litigation Defense:</strong> Participant lawsuit claimed board 
                      ignored PBM spreads. Board produced 3 years of quarterly oversight reports showing questions asked, 
                      independent audits reviewed—case dismissed at summary judgment
                    </div>
                  </div>

                  <div className="border-l-4 border-purple-400 pl-6">
                    <h3 className="font-semibold text-lg mb-2">ESG/Governance Ratings</h3>
                    <p className="text-neutral-400 text-sm mb-3">
                      ESG rating agencies increasingly include benefits governance in "Social" metrics. Board oversight 
                      score demonstrates employee welfare commitment and fiduciary compliance.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-purple-400">Investor Relations:</strong> Included board oversight score in 
                      ESG report—MSCI upgraded Social pillar rating, institutional investors noted improved governance posture
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