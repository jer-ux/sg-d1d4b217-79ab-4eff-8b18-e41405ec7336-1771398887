import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { TrendingUp, DollarSign, PieChart, ArrowLeft, Target, Activity, CheckCircle2 } from "lucide-react";

export default function HealthcareInflationAttributionEngine() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <>
      <Head>
        <title>Healthcare Inflation Attribution Engine | Kincaid IQ</title>
        <meta name="description" content="Decompose healthcare cost increases into unit cost, utilization, mix, and population drivers for precise strategic intervention." />
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
                <PieChart className="w-8 h-8 text-emerald-400" />
              </div>
              <div>
                <h1 className="text-4xl font-display font-bold">Healthcare Inflation Attribution Engine</h1>
                <p className="text-neutral-400 mt-2">Decompose cost increases into actionable root causes</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-6">
                <Target className="w-10 h-10 text-emerald-400 mb-3" />
                <h3 className="text-xl font-semibold mb-2">Precision Diagnosis</h3>
                <p className="text-neutral-400 text-sm">Separate unit cost inflation from utilization changes and population shifts</p>
              </div>
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-6">
                <DollarSign className="w-10 h-10 text-blue-400 mb-3" />
                <h3 className="text-xl font-semibold mb-2">Actionable Intel</h3>
                <p className="text-neutral-400 text-sm">Know which levers to pull—network negotiations, utilization management, or plan design</p>
              </div>
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-6">
                <Activity className="w-10 h-10 text-purple-400 mb-3" />
                <h3 className="text-xl font-semibold mb-2">Strategic Planning</h3>
                <p className="text-neutral-400 text-sm">Build multi-year forecasts from proven component-level drivers</p>
              </div>
            </div>
          </div>

          <div className="border-b border-neutral-800 mb-8">
            <div className="flex gap-8">
              {["overview", "attribution", "use-cases"].map((tab) => (
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
                <h2 className="text-2xl font-display font-bold mb-4">Why "12% Trend" Is Not a Strategy</h2>
                <p className="text-neutral-300 mb-4">
                  Brokers and consultants deliver trend projections—"expect 12% medical, 8% pharmacy"—with zero attribution. 
                  Is the 12% from provider rate increases you can negotiate? Utilization surges you can manage? Population 
                  aging you must accept? Without decomposition, you're flying blind. Our engine separates trend into its 
                  controllable vs. structural components so you invest effort where it matters.
                </p>
                <div className="bg-neutral-900/50 rounded-lg p-6 mt-6">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    The Four Inflation Drivers
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-emerald-400 font-semibold mb-2">Unit Cost Inflation</div>
                      <ul className="space-y-1 text-neutral-400 text-xs">
                        <li>• Provider contract rate increases</li>
                        <li>• Drug price escalation (brand, specialty)</li>
                        <li>• Facility fee increases</li>
                        <li>• <em>Controllable via network renegotiation</em></li>
                      </ul>
                    </div>
                    <div>
                      <div className="text-blue-400 font-semibold mb-2">Utilization Changes</div>
                      <ul className="space-y-1 text-neutral-400 text-xs">
                        <li>• Service frequency per member (Rx fills, office visits)</li>
                        <li>• New utilization (GLP-1, gene therapy adoption)</li>
                        <li>• Pent-up demand releases</li>
                        <li>• <em>Controllable via UM and plan design</em></li>
                      </ul>
                    </div>
                    <div>
                      <div className="text-purple-400 font-semibold mb-2">Mix/Intensity Shifts</div>
                      <ul className="space-y-1 text-neutral-400 text-xs">
                        <li>• Site-of-care migration (outpatient → inpatient)</li>
                        <li>• Service complexity increases</li>
                        <li>• Technology adoption (robotic surgery premiums)</li>
                        <li>• <em>Partially controllable via steerage programs</em></li>
                      </ul>
                    </div>
                    <div>
                      <div className="text-amber-400 font-semibold mb-2">Population/Demographics</div>
                      <ul className="space-y-1 text-neutral-400 text-xs">
                        <li>• Workforce aging (higher risk scores)</li>
                        <li>• Chronic disease prevalence changes</li>
                        <li>• New hire vs. retiree mix shifts</li>
                        <li>• <em>Structural—forecast and plan around it</em></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-8">
                <h2 className="text-2xl font-display font-bold mb-6">Real-World Impact</h2>
                <div className="space-y-6">
                  <div className="border-l-4 border-emerald-400 pl-6 py-2">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg">Healthcare System (8,500 employees)</h3>
                      <span className="text-emerald-400 font-mono text-sm">$4.7M Redirect</span>
                    </div>
                    <p className="text-neutral-400 text-sm mb-3">
                      Broker blamed "14% medical trend" on general healthcare inflation. Attribution revealed 9.2% was unit cost 
                      (hospital contract auto-escalators), 3.1% utilization (musculoskeletal surge), 1.7% demographics. Renegotiated 
                      hospital rates (saved $3.2M), added PT network steerage (saved $1.5M). Ignored demographics (structural).
                    </p>
                    <div className="grid grid-cols-4 gap-3 text-center bg-neutral-800/50 rounded p-3 text-xs">
                      <div>
                        <div className="text-neutral-500 mb-1">Unit Cost</div>
                        <div className="text-emerald-400 font-mono">9.2%</div>
                        <div className="text-emerald-400 mt-1">Negotiated</div>
                      </div>
                      <div>
                        <div className="text-neutral-500 mb-1">Utilization</div>
                        <div className="text-blue-400 font-mono">3.1%</div>
                        <div className="text-blue-400 mt-1">Managed</div>
                      </div>
                      <div>
                        <div className="text-neutral-500 mb-1">Mix Shift</div>
                        <div className="text-neutral-400 font-mono">0.0%</div>
                        <div className="text-neutral-500 mt-1">Minimal</div>
                      </div>
                      <div>
                        <div className="text-neutral-500 mb-1">Demographics</div>
                        <div className="text-amber-400 font-mono">1.7%</div>
                        <div className="text-neutral-500 mt-1">Accept</div>
                      </div>
                    </div>
                  </div>

                  <div className="border-l-4 border-blue-400 pl-6 py-2">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg">Manufacturing (6,200 employees)</h3>
                      <span className="text-blue-400 font-mono text-sm">Avoided Waste</span>
                    </div>
                    <p className="text-neutral-400 text-sm mb-3">
                      Consultant recommended aggressive utilization management to fight "11% trend." Attribution showed only 
                      1.8% was utilization—rest was unit cost (7.4%) and aging workforce (1.8%). Avoided $600K in UM vendor 
                      fees that would have targeted the wrong driver. Focused on network renegotiation instead.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-blue-400">Precision Saves Money:</strong> Avoided misdirected spend on 
                      utilization controls when the real problem was provider pricing power
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "attribution" && (
            <div className="space-y-6">
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-8">
                <h2 className="text-2xl font-display font-bold mb-6">Attribution Methodology</h2>
                <div className="space-y-6">
                  <div className="bg-neutral-800/50 rounded-lg p-6">
                    <h3 className="font-semibold mb-3">Step 1: Unit Cost Isolation</h3>
                    <p className="text-neutral-400 text-sm mb-4">
                      Hold utilization, mix, and population constant. Calculate cost change if only unit prices (provider rates, 
                      drug AWPs) changed. This is your pure pricing inflation—the component you can negotiate.
                    </p>
                    <div className="bg-neutral-900/50 rounded p-3 text-xs font-mono">
                      Unit Cost % = [(Current Year Avg Price) / (Prior Year Avg Price) - 1] × 100
                    </div>
                  </div>

                  <div className="bg-neutral-800/50 rounded-lg p-6">
                    <h3 className="font-semibold mb-3">Step 2: Utilization Effect</h3>
                    <p className="text-neutral-400 text-sm mb-4">
                      Hold unit costs, mix, and population constant. Calculate cost change from pure frequency increases 
                      (more visits, more Rx fills per member). This is your utilization management opportunity.
                    </p>
                    <div className="bg-neutral-900/50 rounded p-3 text-xs font-mono">
                      Utilization % = [(Current Year Services PMPY) / (Prior Year Services PMPY) - 1] × 100
                    </div>
                  </div>

                  <div className="bg-neutral-800/50 rounded-lg p-6">
                    <h3 className="font-semibold mb-3">Step 3: Mix/Intensity Impact</h3>
                    <p className="text-neutral-400 text-sm mb-4">
                      Hold unit costs and population constant. Isolate changes in service type distribution (more inpatient 
                      vs. outpatient, more complex procedures). Reveals site-of-care and technology adoption effects.
                    </p>
                    <div className="bg-neutral-900/50 rounded p-3 text-xs">
                      <div className="text-neutral-400 mb-2">Example: Knee replacement migration</div>
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-500">Hospital-based → ASC</span>
                        <span className="text-emerald-400">-$8,200/case savings</span>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-neutral-500">Traditional → Robotic</span>
                        <span className="text-red-400">+$4,100/case premium</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-neutral-800/50 rounded-lg p-6">
                    <h3 className="font-semibold mb-3">Step 4: Demographics & Population</h3>
                    <p className="text-neutral-400 text-sm mb-4">
                      Measure risk score changes, age distribution shifts, chronic disease prevalence. These are largely 
                      structural—you can't reverse aging, but you can forecast it accurately and plan reserves.
                    </p>
                    <div className="grid md:grid-cols-2 gap-3 text-xs">
                      <div className="bg-neutral-900/50 rounded p-3">
                        <div className="text-amber-400 font-semibold mb-2">Age Mix Impact</div>
                        <div className="text-neutral-400">Workforce 55+ increased from 18% to 24% = +2.1% cost trend (structural)</div>
                      </div>
                      <div className="bg-neutral-900/50 rounded p-3">
                        <div className="text-purple-400 font-semibold mb-2">Chronic Disease</div>
                        <div className="text-neutral-400">Diabetes prevalence 9.2% → 11.4% = +1.3% cost trend (partially controllable via prevention)</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-8">
                <h2 className="text-2xl font-display font-bold mb-4">Sample Attribution Output</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-neutral-900/50 rounded p-3">
                    <div>
                      <div className="font-semibold text-sm">Total Medical Trend</div>
                      <div className="text-xs text-neutral-500">Year-over-year cost increase</div>
                    </div>
                    <div className="text-2xl font-bold text-neutral-300">13.2%</div>
                  </div>
                  <div className="flex items-center justify-between bg-emerald-900/20 border-l-4 border-emerald-400 rounded p-3">
                    <div>
                      <div className="font-semibold text-sm text-emerald-400">Unit Cost Component</div>
                      <div className="text-xs text-neutral-500">Provider rate increases</div>
                    </div>
                    <div className="text-xl font-bold text-emerald-400">8.4%</div>
                  </div>
                  <div className="flex items-center justify-between bg-blue-900/20 border-l-4 border-blue-400 rounded p-3">
                    <div>
                      <div className="font-semibold text-sm text-blue-400">Utilization Component</div>
                      <div className="text-xs text-neutral-500">Service frequency increases</div>
                    </div>
                    <div className="text-xl font-bold text-blue-400">2.7%</div>
                  </div>
                  <div className="flex items-center justify-between bg-purple-900/20 border-l-4 border-purple-400 rounded p-3">
                    <div>
                      <div className="font-semibold text-sm text-purple-400">Mix/Intensity Component</div>
                      <div className="text-xs text-neutral-500">Service complexity changes</div>
                    </div>
                    <div className="text-xl font-bold text-purple-400">0.6%</div>
                  </div>
                  <div className="flex items-center justify-between bg-amber-900/20 border-l-4 border-amber-400 rounded p-3">
                    <div>
                      <div className="font-semibold text-sm text-amber-400">Demographics Component</div>
                      <div className="text-xs text-neutral-500">Population risk changes</div>
                    </div>
                    <div className="text-xl font-bold text-amber-400">1.5%</div>
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
                    <h3 className="font-semibold text-lg mb-2">Network Negotiation Prep</h3>
                    <p className="text-neutral-400 text-sm mb-3">
                      Enter provider negotiations with data. If unit cost drove 70% of your trend, you have leverage to 
                      demand rate caps. If utilization drove it, hospitals can't blame their pricing—focus on UM instead.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-emerald-400">Negotiation Win:</strong> Showed hospital their rates grew 8.7% 
                      while utilization only 1.2%—forced 3-year rate cap at CPI+1% vs. their ask of CPI+3.5%
                    </div>
                  </div>

                  <div className="border-l-4 border-blue-400 pl-6">
                    <h3 className="font-semibold text-lg mb-2">Vendor ROI Justification</h3>
                    <p className="text-neutral-400 text-sm mb-3">
                      If utilization is 4%+ of trend, a disease management or utilization review vendor earns its fees. 
                      If utilization is minimal, skip the vendor and focus on unit cost negotiations.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-blue-400">Smart Spend:</strong> Rejected $800K prior auth vendor when 
                      attribution showed only 1.3% trend from utilization—ROI wouldn't cover fees
                    </div>
                  </div>

                  <div className="border-l-4 border-purple-400 pl-6">
                    <h3 className="font-semibold text-lg mb-2">Multi-Year Strategic Planning</h3>
                    <p className="text-neutral-400 text-sm mb-3">
                      Use attribution to forecast controllable vs. structural trend. Budget for demographics (you can't fix), 
                      plan interventions for unit cost and utilization (you can influence).
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-purple-400">3-Year Plan:</strong> Demographic trend 1.8%/year (baked in), 
                      unit cost 6-8% (target network deals), utilization 2-3% (target UM programs)—realistic budget set
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