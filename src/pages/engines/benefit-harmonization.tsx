import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { Users, DollarSign, Building2, ArrowLeft, Target, TrendingUp, Calendar, CheckCircle2, AlertTriangle } from "lucide-react";

export default function BenefitHarmonizationEngine() {
  const [selectedScenario, setSelectedScenario] = useState("aggressive");

  const scenarios = {
    aggressive: {
      name: "Aggressive Harmonization",
      timeline: "6 months",
      savings: "$4.8M",
      morale: "Medium Risk",
      initiatives: ["Immediate plan consolidation", "Carrier standardization", "Benefit tier reduction", "Rapid vendor alignment"]
    },
    moderate: {
      name: "Moderate Harmonization",
      timeline: "12 months",
      savings: "$3.2M",
      morale: "Low Risk",
      initiatives: ["Phased plan migration", "Benefit equalization", "Gradual tier reduction", "Vendor optimization"]
    },
    conservative: {
      name: "Conservative Harmonization",
      timeline: "18 months",
      savings: "$2.1M",
      morale: "Minimal Risk",
      initiatives: ["Voluntary migration", "Grandfathered options", "Enhanced communications", "Retention focus"]
    }
  };

  const currentScenario = scenarios[selectedScenario as keyof typeof scenarios];

  return (
    <>
      <Head>
        <title>Benefit Harmonization Engine | Kincaid iQ</title>
        <meta name="description" content="Model post-merger benefit plan integration scenarios with cost, timeline, and employee impact analysis." />
      </Head>

      <Nav />

      <div className="min-h-screen bg-neutral-950 pt-20">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <Link 
            href="/engines" 
            className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-emerald-400 transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to All Engines
          </Link>

          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full mb-4">
              <Building2 className="h-4 w-4 text-blue-400" />
              <span className="text-xs font-mono text-blue-400 uppercase tracking-wide">Private Equity Engine</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Benefit Harmonization
            </h1>
            <p className="text-lg text-neutral-400 max-w-3xl">
              Model post-merger benefit plan integration scenarios, optimize timeline vs. savings trade-offs, and minimize employee disruption during portfolio company consolidation.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-xl p-6">
              <DollarSign className="h-8 w-8 text-emerald-400 mb-3" />
              <div className="text-3xl font-bold text-white mb-1">$4.8M</div>
              <div className="text-sm text-neutral-400">Maximum savings opportunity</div>
              <div className="mt-3 text-xs text-emerald-400">Aggressive harmonization</div>
            </div>

            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-6">
              <Users className="h-8 w-8 text-blue-400 mb-3" />
              <div className="text-3xl font-bold text-white mb-1">2,840</div>
              <div className="text-sm text-neutral-400">Employees affected</div>
              <div className="mt-3 text-xs text-blue-400">Across 3 acquired entities</div>
            </div>

            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-6">
              <Target className="h-8 w-8 text-purple-400 mb-3" />
              <div className="text-3xl font-bold text-white mb-1">12 months</div>
              <div className="text-sm text-neutral-400">Recommended timeline</div>
              <div className="mt-3 text-xs text-purple-400">Balanced approach</div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-400" />
                Harmonization Scenarios
              </h3>
              
              <div className="flex flex-col gap-2 mb-6">
                {Object.keys(scenarios).map((key) => (
                  <button
                    key={key}
                    onClick={() => setSelectedScenario(key)}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-all text-left ${
                      selectedScenario === key
                        ? "bg-blue-500 text-white"
                        : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700"
                    }`}
                  >
                    {scenarios[key as keyof typeof scenarios].name}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                <div className="bg-neutral-800/50 rounded-lg p-4">
                  <div className="text-xs text-neutral-500 mb-1">Implementation Timeline</div>
                  <div className="text-2xl font-bold text-white">{currentScenario.timeline}</div>
                </div>

                <div className="bg-neutral-800/50 rounded-lg p-4">
                  <div className="text-xs text-neutral-500 mb-1">Annual Savings</div>
                  <div className="text-2xl font-bold text-white">{currentScenario.savings}</div>
                </div>

                <div className="bg-neutral-800/50 rounded-lg p-4">
                  <div className="text-xs text-neutral-500 mb-1">Employee Morale Impact</div>
                  <div className="flex items-center gap-2">
                    <div className="text-2xl font-bold text-white">{currentScenario.morale}</div>
                    {currentScenario.morale === "Medium Risk" && <AlertTriangle className="h-5 w-5 text-amber-400" />}
                    {currentScenario.morale === "Low Risk" && <CheckCircle2 className="h-5 w-5 text-emerald-400" />}
                    {currentScenario.morale === "Minimal Risk" && <CheckCircle2 className="h-5 w-5 text-emerald-400" />}
                  </div>
                </div>

                <div className="bg-neutral-800/50 rounded-lg p-4">
                  <div className="text-xs text-neutral-500 mb-2">Key Initiatives</div>
                  <div className="space-y-2">
                    {currentScenario.initiatives.map((initiative, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-neutral-300">
                        <CheckCircle2 className="h-4 w-4 text-blue-400" />
                        {initiative}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-emerald-400" />
                Integration Roadmap
              </h3>

              <div className="space-y-6">
                <div className="relative pl-8 border-l-2 border-neutral-700">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-500 rounded-full border-2 border-neutral-950"></div>
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-xs font-mono text-neutral-500">Phase 1</span>
                    <span className="px-2 py-0.5 bg-blue-500/10 border border-blue-500/30 rounded text-xs text-blue-400">Assessment</span>
                  </div>
                  <div className="text-sm text-white font-medium mb-2">Current State Analysis</div>
                  <div className="text-xs text-neutral-400 mb-3">
                    Audit existing benefit plans across all entities, benchmark costs, and identify harmonization opportunities.
                  </div>
                  <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                    <strong className="text-blue-400">Deliverable:</strong> Comprehensive benefit comparison matrix
                  </div>
                </div>

                <div className="relative pl-8 border-l-2 border-neutral-700">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-emerald-500 rounded-full border-2 border-neutral-950"></div>
                  <div className="mb-1">
                    <span className="text-xs font-mono text-neutral-500">Phase 2</span>
                  </div>
                  <div className="text-sm text-white font-medium mb-2">Plan Design & Communication</div>
                  <div className="text-xs text-neutral-400 mb-3">
                    Design unified benefit structure, develop communication strategy, and prepare employee materials.
                  </div>
                  <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                    <strong className="text-emerald-400">Action:</strong> Launch 90-day employee communication campaign
                  </div>
                </div>

                <div className="relative pl-8 border-l-2 border-neutral-700">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-purple-500 rounded-full border-2 border-neutral-950"></div>
                  <div className="mb-1">
                    <span className="text-xs font-mono text-neutral-500">Phase 3</span>
                  </div>
                  <div className="text-sm text-white font-medium mb-2">Execution & Monitoring</div>
                  <div className="text-xs text-neutral-400 mb-3">
                    Migrate employees to harmonized plans, track satisfaction metrics, and optimize ongoing costs.
                  </div>
                  <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                    <strong className="text-purple-400">Outcome:</strong> {currentScenario.savings} annual savings realized
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 mb-12">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Building2 className="h-5 w-5 text-blue-400" />
              Financial Impact Summary
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div>
                <div className="text-2xl font-bold text-white mb-1">$4.8M</div>
                <div className="text-sm text-neutral-400 mb-2">Annual Cost Savings</div>
                <div className="text-xs text-neutral-500">Post-harmonization run rate</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white mb-1">$1.2M</div>
                <div className="text-sm text-neutral-400 mb-2">Implementation Cost</div>
                <div className="text-xs text-neutral-500">One-time transition expenses</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white mb-1">4 months</div>
                <div className="text-sm text-neutral-400 mb-2">Payback Period</div>
                <div className="text-xs text-neutral-500">Time to recover investment</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white mb-1">18%</div>
                <div className="text-sm text-neutral-400 mb-2">Cost Reduction</div>
                <div className="text-xs text-neutral-500">Total benefit spend decrease</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border border-blue-500/20 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">Optimize Post-Merger Integration</h3>
            <p className="text-neutral-400 mb-6 max-w-2xl mx-auto">
              Model benefit harmonization scenarios and execute seamless integration with minimal employee disruption.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/request-demo"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
              >
                <Calendar className="h-5 w-5" />
                Schedule Demo
              </Link>
              <Link
                href="/engines"
                className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg font-medium transition-colors"
              >
                Explore More Engines
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}