import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { TrendingUp, DollarSign, Target, ArrowLeft, Briefcase, Building2, Calendar, CheckCircle2, ArrowUpRight } from "lucide-react";

export default function EnterpriseValueCreationEngine() {
  const [selectedLever, setSelectedLever] = useState("benefits");

  const valueLeavers = {
    benefits: {
      name: "Benefits Cost Optimization",
      impact: "$8.4M",
      timeline: "12-18 months",
      evMultiple: "0.8x",
      initiatives: ["PBM contract renegotiation", "Stop-loss optimization", "Network steerage", "Specialty drug management"]
    },
    workforce: {
      name: "Workforce Productivity",
      impact: "$3.2M",
      timeline: "6-12 months",
      evMultiple: "1.2x",
      initiatives: ["Absence management", "Disability optimization", "Wellness programs", "Presenteeism reduction"]
    },
    operations: {
      name: "Operational Efficiency",
      impact: "$2.1M",
      timeline: "9-15 months",
      evMultiple: "0.6x",
      initiatives: ["Vendor consolidation", "Process automation", "Shared services", "Technology integration"]
    }
  };

  const currentLever = valueLeavers[selectedLever as keyof typeof valueLeavers];

  return (
    <>
      <Head>
        <title>Enterprise Value Creation Engine | Kincaid iQ</title>
        <meta name="description" content="Model healthcare cost impact on enterprise value for private equity portfolio optimization." />
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
              <Briefcase className="h-4 w-4 text-blue-400" />
              <span className="text-xs font-mono text-blue-400 uppercase tracking-wide">Private Equity Engine</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Enterprise Value Creation
            </h1>
            <p className="text-lg text-neutral-400 max-w-3xl">
              Quantify healthcare cost optimization impact on EBITDA and enterprise value for portfolio companies with precision modeling and value-driver analytics.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-xl p-6">
              <DollarSign className="h-8 w-8 text-emerald-400 mb-3" />
              <div className="text-3xl font-bold text-white mb-1">$13.7M</div>
              <div className="text-sm text-neutral-400">Total value creation opportunity</div>
              <div className="mt-3 text-xs text-emerald-400">Across all value levers</div>
            </div>

            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-6">
              <TrendingUp className="h-8 w-8 text-blue-400 mb-3" />
              <div className="text-3xl font-bold text-white mb-1">2.6x</div>
              <div className="text-sm text-neutral-400">EV multiple impact</div>
              <div className="mt-3 text-xs text-blue-400">Healthcare optimization contribution</div>
            </div>

            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-6">
              <Target className="h-8 w-8 text-purple-400 mb-3" />
              <div className="text-3xl font-bold text-white mb-1">18%</div>
              <div className="text-sm text-neutral-400">EBITDA margin expansion</div>
              <div className="mt-3 text-xs text-purple-400">Post-optimization forecast</div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Building2 className="h-5 w-5 text-blue-400" />
                Value Creation Levers
              </h3>
              
              <div className="flex flex-col gap-2 mb-6">
                {Object.keys(valueLeavers).map((key) => (
                  <button
                    key={key}
                    onClick={() => setSelectedLever(key)}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-all text-left ${
                      selectedLever === key
                        ? "bg-blue-500 text-white"
                        : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700"
                    }`}
                  >
                    {valueLeavers[key as keyof typeof valueLeavers].name}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                <div className="bg-neutral-800/50 rounded-lg p-4">
                  <div className="text-xs text-neutral-500 mb-1">Annual EBITDA Impact</div>
                  <div className="text-2xl font-bold text-white">{currentLever.impact}</div>
                </div>

                <div className="bg-neutral-800/50 rounded-lg p-4">
                  <div className="text-xs text-neutral-500 mb-1">Implementation Timeline</div>
                  <div className="text-2xl font-bold text-white">{currentLever.timeline}</div>
                </div>

                <div className="bg-neutral-800/50 rounded-lg p-4">
                  <div className="text-xs text-neutral-500 mb-1">EV Multiple Contribution</div>
                  <div className="text-2xl font-bold text-white">{currentLever.evMultiple}</div>
                </div>

                <div className="bg-neutral-800/50 rounded-lg p-4">
                  <div className="text-xs text-neutral-500 mb-2">Key Initiatives</div>
                  <div className="space-y-2">
                    {currentLever.initiatives.map((initiative, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-neutral-300">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
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
                Value Creation Timeline
              </h3>

              <div className="space-y-6">
                <div className="relative pl-8 border-l-2 border-neutral-700">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-500 rounded-full border-2 border-neutral-950"></div>
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-xs font-mono text-neutral-500">Months 0-6</span>
                    <span className="px-2 py-0.5 bg-blue-500/10 border border-blue-500/30 rounded text-xs text-blue-400">Due Diligence</span>
                  </div>
                  <div className="text-sm text-white font-medium mb-2">Assessment & Strategy</div>
                  <div className="text-xs text-neutral-400 mb-3">
                    Comprehensive healthcare cost audit, benchmark analysis, and value creation roadmap development.
                  </div>
                  <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                    <strong className="text-blue-400">Deliverable:</strong> 100-day value creation plan with quantified opportunities
                  </div>
                </div>

                <div className="relative pl-8 border-l-2 border-neutral-700">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-emerald-500 rounded-full border-2 border-neutral-950"></div>
                  <div className="mb-1">
                    <span className="text-xs font-mono text-neutral-500">Months 6-18</span>
                  </div>
                  <div className="text-sm text-white font-medium mb-2">Implementation Phase</div>
                  <div className="text-xs text-neutral-400 mb-3">
                    Execute quick wins, renegotiate vendor contracts, deploy cost management programs.
                  </div>
                  <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                    <strong className="text-emerald-400">Impact:</strong> $8.4M annualized EBITDA improvement
                  </div>
                </div>

                <div className="relative pl-8 border-l-2 border-neutral-700">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-purple-500 rounded-full border-2 border-neutral-950"></div>
                  <div className="mb-1">
                    <span className="text-xs font-mono text-neutral-500">Months 18-36</span>
                  </div>
                  <div className="text-sm text-white font-medium mb-2">Value Realization</div>
                  <div className="text-xs text-neutral-400 mb-3">
                    Sustained performance, continuous optimization, exit multiple expansion preparation.
                  </div>
                  <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                    <strong className="text-purple-400">Value:</strong> 2.6x EV multiple contribution from healthcare optimization
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 mb-12">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <ArrowUpRight className="h-5 w-5 text-emerald-400" />
              Portfolio Company Impact
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div>
                <div className="text-2xl font-bold text-white mb-1">$13.7M</div>
                <div className="text-sm text-neutral-400 mb-2">Annual EBITDA Add</div>
                <div className="text-xs text-neutral-500">Healthcare cost optimization</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white mb-1">$96M</div>
                <div className="text-sm text-neutral-400 mb-2">Enterprise Value Creation</div>
                <div className="text-xs text-neutral-500">At 7x exit multiple</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white mb-1">18%</div>
                <div className="text-sm text-neutral-400 mb-2">Margin Expansion</div>
                <div className="text-xs text-neutral-500">EBITDA margin improvement</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white mb-1">3.2x</div>
                <div className="text-sm text-neutral-400 mb-2">IRR Contribution</div>
                <div className="text-xs text-neutral-500">Healthcare-driven returns</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border border-blue-500/20 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">Unlock Portfolio Value</h3>
            <p className="text-neutral-400 mb-6 max-w-2xl mx-auto">
              Model healthcare cost impact on enterprise value and build data-driven value creation plans for your portfolio.
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