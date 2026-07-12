import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { ShieldAlert, TrendingDown, Target, ArrowLeft, AlertTriangle, DollarSign } from "lucide-react";

export default function FraudPredictionEngine() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <>
      <Head>
        <title>Fraud Prediction Engine | Kincaid IQ</title>
        <meta name="description" content="Detect provider billing fraud, member abuse, and payment integrity issues before claims pay out." />
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
                <ShieldAlert className="w-8 h-8 text-red-400" />
              </div>
              <div>
                <h1 className="text-4xl font-display font-bold">Fraud Prediction Engine</h1>
                <p className="text-neutral-400 mt-2">Stop improper payments before they leave your account</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-6">
                <ShieldAlert className="w-10 h-10 text-red-400 mb-3" />
                <h3 className="text-xl font-semibold mb-2">Pre-Payment Detection</h3>
                <p className="text-neutral-400 text-sm">Flag suspicious claims before adjudication</p>
              </div>
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-6">
                <Target className="w-10 h-10 text-emerald-400 mb-3" />
                <h3 className="text-xl font-semibold mb-2">Pattern Recognition</h3>
                <p className="text-neutral-400 text-sm">ML models trained on known fraud schemes</p>
              </div>
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-6">
                <TrendingDown className="w-10 h-10 text-blue-400 mb-3" />
                <h3 className="text-xl font-semibold mb-2">Recovery Actions</h3>
                <p className="text-neutral-400 text-sm">Automated investigation workflows and recovery protocols</p>
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
                <h2 className="text-2xl font-display font-bold mb-4">Healthcare Fraud Costs $68B Annually</h2>
                <p className="text-neutral-300 mb-4">
                  FBI estimates 3-10% of total healthcare spending is fraudulent—billing for services never rendered, 
                  upcoding, unbundling, phantom patients, kickback schemes. Traditional claims review catches obvious errors 
                  (wrong codes, duplicate claims) but sophisticated fraud slips through. Our engine uses ML trained on 
                  known fraud patterns to flag suspicious claims before they pay.
                </p>
                <div className="bg-neutral-900/50 rounded-lg p-6 mt-6">
                  <h3 className="font-semibold mb-4">The $3.2M Recovery Case</h3>
                  <div className="grid md:grid-cols-2 gap-6 text-sm">
                    <div>
                      <div className="text-red-400 font-semibold mb-2">Without Fraud Detection</div>
                      <ul className="space-y-2 text-neutral-400 text-xs">
                        <li>• Urology clinic bills 480 prostate biopsies/year (40/month)</li>
                        <li>• All claims pass traditional edits (valid codes, prior auth on file)</li>
                        <li>• Avg reimbursement: $2,800 per procedure</li>
                        <li>• Annual payments: $1.34M to this one provider</li>
                        <li>• Post-payment audit 18 months later finds fraud</li>
                      </ul>
                    </div>
                    <div>
                      <div className="text-emerald-400 font-semibold mb-2">With Fraud Prediction</div>
                      <ul className="space-y-2 text-neutral-400 text-xs">
                        <li>• Engine flags provider at month 3: biopsy rate 8x peer norm</li>
                        <li>• Auto-flags next 10 claims for manual review</li>
                        <li>• SIU investigation finds 90% of biopsies never performed</li>
                        <li>• Claims denied prospectively, provider terminated</li>
                        <li>• Recovered $240K already paid + prevented $3.2M over 2 years</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-8">
                <h2 className="text-2xl font-display font-bold mb-6">Common Fraud Schemes Detected</h2>
                <div className="space-y-6">
                  <div className="border-l-4 border-red-400 pl-6">
                    <h3 className="font-semibold text-lg mb-2">Phantom Billing</h3>
                    <p className="text-neutral-400 text-sm mb-3">
                      Provider bills for services never rendered. Detection: claims submitted for dates patient wasn't 
                      seen, services incompatible with diagnosis, billing volume inconsistent with office hours/staffing.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-red-400">Red Flags:</strong> Provider bills 12 office visits/day but only 
                      has 4-hour clinic schedule; claims for deceased members; services billed outside provider specialty
                    </div>
                  </div>

                  <div className="border-l-4 border-amber-400 pl-6">
                    <h3 className="font-semibold text-lg mb-2">Upcoding</h3>
                    <p className="text-neutral-400 text-sm mb-3">
                      Billing higher-level service than actually performed to increase payment. Detection: 99215 (complex 
                      visit) rate 95%+ when peer norm is 15%; E&M level doesn't match diagnosis severity.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-amber-400">Red Flags:</strong> Provider bills highest E&M codes exclusively; 
                      diagnosis doesn't support complexity level; outlier vs. specialty peer group
                    </div>
                  </div>

                  <div className="border-l-4 border-blue-400 pl-6">
                    <h3 className="font-semibold text-lg mb-2">Unbundling</h3>
                    <p className="text-neutral-400 text-sm mb-3">
                      Billing component codes separately instead of comprehensive code to inflate payment. Detection: 
                      billing individual tests when CPT bundle exists; same-day codes that should never appear together.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-blue-400">Red Flags:</strong> Lab bills 8 individual chemistry tests when 
                      panel code exists (and pays less); colonoscopy + biopsy billed separately every time
                    </div>
                  </div>

                  <div className="border-l-4 border-purple-400 pl-6">
                    <h3 className="font-semibold text-lg mb-2">Member Collusion</h3>
                    <p className="text-neutral-400 text-sm mb-3">
                      Member loans insurance card to uninsured friend/family. Detection: utilization spikes inconsistent 
                      with age/gender, claims from geographically distant providers same-day, diagnosis progression illogical.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-purple-400">Red Flags:</strong> Male employee has pregnancy claims; adult 
                      member suddenly has pediatric well-child visits; claims in two states same day
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "detection" && (
            <div className="space-y-6">
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-8">
                <h2 className="text-2xl font-display font-bold mb-6">ML Detection Models</h2>
                <p className="text-neutral-400 text-sm mb-6">
                  Ensemble model combining supervised learning (known fraud patterns) with unsupervised anomaly detection. 
                  Scores every claim 0-100 for fraud risk; scores above 80 auto-pend for SIU review.
                </p>
                <div className="space-y-6">
                  <div className="bg-neutral-800/50 rounded-lg p-6">
                    <h3 className="font-semibold mb-4 text-red-400">Provider-Level Risk Signals</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start justify-between">
                        <span className="text-neutral-400">Billing volume outlier (3+ standard deviations vs. peers)</span>
                        <span className="text-red-400 font-mono">High</span>
                      </div>
                      <div className="flex items-start justify-between">
                        <span className="text-neutral-400">Modifier usage rate anomalous (e.g., -25 on 95% of claims)</span>
                        <span className="text-red-400 font-mono">High</span>
                      </div>
                      <div className="flex items-start justify-between">
                        <span className="text-neutral-400">Same diagnosis code on every claim for 30+ days</span>
                        <span className="text-amber-400 font-mono">Medium</span>
                      </div>
                      <div className="flex items-start justify-between">
                        <span className="text-neutral-400">Claims submitted exactly at fee schedule maximums</span>
                        <span className="text-amber-400 font-mono">Medium</span>
                      </div>
                      <div className="flex items-start justify-between">
                        <span className="text-neutral-400">Rapid increase in billing complexity (avg E&M level)</span>
                        <span className="text-blue-400 font-mono">Low</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-neutral-800/50 rounded-lg p-6">
                    <h3 className="font-semibold mb-4 text-amber-400">Claim-Level Anomalies</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start justify-between">
                        <span className="text-neutral-400">Service date/time conflicts (same member, two providers, same hour)</span>
                        <span className="text-red-400 font-mono">High</span>
                      </div>
                      <div className="flex items-start justify-between">
                        <span className="text-neutral-400">Diagnosis-procedure mismatch (colonoscopy for sprained ankle)</span>
                        <span className="text-red-400 font-mono">High</span>
                      </div>
                      <div className="flex items-start justify-between">
                        <span className="text-neutral-400">Unbundling pattern (multiple codes when bundle exists)</span>
                        <span className="text-amber-400 font-mono">Medium</span>
                      </div>
                      <div className="flex items-start justify-between">
                        <span className="text-neutral-400">Excessive units (physical therapy: 8 units/visit, 5 days/week)</span>
                        <span className="text-amber-400 font-mono">Medium</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-neutral-800/50 rounded-lg p-6">
                    <h3 className="font-semibold mb-4 text-emerald-400">Model Performance</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-neutral-400">Precision (confirmed fraud):</span>
                          <span className="text-emerald-400 font-mono">72%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-400">Recall (catches known fraud):</span>
                          <span className="text-emerald-400 font-mono">86%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-400">False positive rate:</span>
                          <span className="text-amber-400 font-mono">8%</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-neutral-400">Avg detection time:</span>
                          <span className="text-blue-400 font-mono">45 days</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-400">Claims flagged per 10K:</span>
                          <span className="text-purple-400 font-mono">120</span>
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
                <h2 className="text-2xl font-display font-bold mb-6">Deployment Models</h2>
                <div className="space-y-6">
                  <div className="border-l-4 border-emerald-400 pl-6">
                    <h3 className="font-semibold text-lg mb-2">Pre-Payment Screening</h3>
                    <p className="text-neutral-400 text-sm mb-3">
                      Every claim scored before adjudication. High-risk claims auto-pended for SIU review; medium-risk 
                      flagged for post-payment audit; low-risk pay normally. Prevents fraud rather than chasing recovery.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-emerald-400">Manufacturing Client:</strong> Prevented $840K in fraudulent 
                      payments over 18 months by auto-pending high-risk claims—85% of flagged claims denied after review
                    </div>
                  </div>

                  <div className="border-l-4 border-blue-400 pl-6">
                    <h3 className="font-semibold text-lg mb-2">Provider Profiling</h3>
                    <p className="text-neutral-400 text-sm mb-3">
                      Continuous monitoring of provider billing patterns. When provider crosses risk threshold, all future 
                      claims auto-flagged for 90 days. Identifies bad actors before they accumulate large overpayments.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-blue-400">Health System:</strong> Terminated 8 providers in first year based 
                      on fraud score patterns—recovered $1.4M + prevented estimated $6M over contract lifetime
                    </div>
                  </div>

                  <div className="border-l-4 border-purple-400 pl-6">
                    <h3 className="font-semibold text-lg mb-2">Member Abuse Detection</h3>
                    <p className="text-neutral-400 text-sm mb-3">
                      Detects members loaning cards, selling prescriptions, or colluding with providers. Alerts trigger 
                      member interviews and ID verification protocols. Protects plan from internal abuse.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-purple-400">Self-Funded Plan:</strong> Identified 14 members with card-sharing 
                      patterns—terminated coverage per SPD terms, avoided $380K in fraudulent claims
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