import Head from "next/head";
import Link from "next/link";
import { 
  TrendingUp, Pill, AlertTriangle, Target, Activity, Dna, 
  DollarSign, MapPin, Users, Calendar, Database, BarChart3,
  Shield, FileText, Award, Brain, Briefcase, LineChart
} from "lucide-react";
import Footer from "@/components/Footer";

const engineCategories = [
  {
    id: "financial-trend",
    name: "Financial & Trend Engines",
    count: 20,
    color: "from-blue-600 to-cyan-600",
    icon: TrendingUp,
    description: "Forecasting, normalization, and trend decomposition",
    engines: [
      { id: "medical-trend-forecasting", name: "Medical Trend Forecasting", icon: TrendingUp },
      { id: "rx-trend-forecasting", name: "Rx Trend Forecasting", icon: Pill },
      { id: "catastrophic-claims-forecasting", name: "Catastrophic Claims Forecasting", icon: AlertTriangle },
      { id: "high-cost-claimant-prediction", name: "High-Cost Claimant Prediction", icon: Target },
      { id: "glp1-financial-impact", name: "GLP-1 Financial Impact", icon: Activity },
      { id: "gene-therapy-exposure", name: "Gene Therapy Exposure", icon: Dna },
      { id: "oncology-cost-projection", name: "Oncology Cost Projection", icon: Activity },
      { id: "inflation-decomposition", name: "Inflation Decomposition", icon: TrendingUp },
      { id: "provider-unit-cost-trend", name: "Provider Unit Cost Trend", icon: DollarSign },
      { id: "utilization-trend-engine", name: "Utilization Trend Engine", icon: Activity },
      { id: "geographic-normalization", name: "Geographic Normalization", icon: MapPin },
      { id: "age-gender-risk-adjustment", name: "Age/Gender Risk Adjustment", icon: Users },
      { id: "case-mix-adjustment", name: "Case Mix Adjustment", icon: Activity },
      { id: "pmpm-normalization", name: "PMPM Normalization", icon: Users },
      { id: "seasonality-adjustment", name: "Seasonality Adjustment", icon: Calendar },
      { id: "credibility-weighting", name: "Credibility Weighting", icon: Target },
    ],
  },
  {
    id: "healthcare-economics",
    name: "Healthcare Economics Engines",
    count: 20,
    color: "from-emerald-600 to-teal-600",
    icon: DollarSign,
    description: "Site-of-care, payment integrity, specialty pharmacy, PBM intelligence",
    engines: [],
  },
  {
    id: "fiduciary-governance",
    name: "Fiduciary & Governance Engines",
    count: 25,
    color: "from-purple-600 to-pink-600",
    icon: Shield,
    description: "ERISA scoring, contract analysis, compliance monitoring, audit readiness",
    engines: [],
  },
  {
    id: "workforce-human-capital",
    name: "Workforce & Human Capital Engines",
    count: 20,
    color: "from-amber-600 to-orange-600",
    icon: Users,
    description: "Absenteeism, productivity, demographics, health equity, wellness ROI",
    engines: [],
  },
  {
    id: "predictive-ai",
    name: "Predictive AI Engines",
    count: 20,
    color: "from-indigo-600 to-violet-600",
    icon: Brain,
    description: "Hospital admission prediction, fraud detection, digital twin simulation",
    engines: [],
  },
  {
    id: "pe-cfo",
    name: "Private Equity & CFO Engines",
    count: 20,
    color: "from-rose-600 to-red-600",
    icon: Briefcase,
    description: "EBITDA enhancement, M&A due diligence, synergy valuation, portfolio benchmarking",
    engines: [],
  },
];

export default function EnginesIndex() {
  const totalEngines = engineCategories.reduce((sum, cat) => sum + cat.count, 0);

  return (
    <>
      <Head>
        <title>Actuarial Intelligence Engines | Kincaid IQ</title>
        <meta name="description" content="150+ specialized actuarial, economic, governance, and AI decision engines. Universal data feed, modular architecture." />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
        {/* Animated background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        {/* Hero section */}
        <div className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-sm border border-cyan-500/20 rounded-full px-6 py-2 mb-6 animate-pulse">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-cyan-300 text-sm font-medium">Live: {totalEngines}+ Engines Running</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 text-transparent bg-clip-text animate-gradient">
              Actuarial Intelligence
            </h1>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Operating System
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
              150+ specialized engines. One universal data feed. Modular architecture.
            </p>

            <div className="flex flex-wrap gap-4 justify-center items-center mb-12">
              <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl px-6 py-3 border border-cyan-400/30 shadow-lg shadow-cyan-500/20">
                <div className="text-3xl font-bold text-white">{totalEngines}+</div>
                <div className="text-sm text-cyan-100">Engines</div>
              </div>
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl px-6 py-3 border border-purple-400/30 shadow-lg shadow-purple-500/20">
                <div className="text-3xl font-bold text-white">6</div>
                <div className="text-sm text-purple-100">Domains</div>
              </div>
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl px-6 py-3 border border-emerald-400/30 shadow-lg shadow-emerald-500/20">
                <div className="text-3xl font-bold text-white">1</div>
                <div className="text-sm text-emerald-100">Data Feed</div>
              </div>
            </div>

            <Link
              href="/request-demo"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-2xl shadow-purple-500/50 transform hover:scale-105 transition-all duration-300 animate-pulse">
              <LineChart className="w-6 h-6" />
              Request Platform Demo
            </Link>
          </div>
        </div>

        {/* Engine categories */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 relative z-10">
          <div className="space-y-8">
            {engineCategories.map((category, idx) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.id}
                  className="group relative"
                  style={{ animationDelay: `${idx * 0.1}s` }}>
                  {/* Vegas-style glow border */}
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${category.color} rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 animate-pulse`} />
                  
                  <div className="relative bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-slate-600 transition-all duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 bg-gradient-to-br ${category.color} rounded-xl shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-cyan-400 group-hover:to-purple-400 transition-all duration-300">
                            {category.name}
                          </h3>
                          <p className="text-gray-400 text-sm">{category.description}</p>
                        </div>
                      </div>
                      
                      {/* Vegas-style count badge */}
                      <div className={`relative px-6 py-2 bg-gradient-to-r ${category.color} rounded-full shadow-lg transform group-hover:scale-110 transition-transform duration-300 overflow-hidden`}>
                        <div className="absolute inset-0 bg-white/20 animate-pulse" />
                        <div className="relative font-bold text-white text-2xl tracking-wider">
                          {category.count}+
                        </div>
                      </div>
                    </div>

                    {/* Engine cards grid */}
                    {category.engines.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
                        {category.engines.map((engine) => {
                          const EngineIcon = engine.icon;
                          return (
                            <Link
                              key={engine.id}
                              href={`/engines/${engine.id}`}
                              className="group/card relative">
                              {/* Neon glow on hover */}
                              <div className={`absolute -inset-0.5 bg-gradient-to-r ${category.color} rounded-lg opacity-0 group-hover/card:opacity-75 blur transition-all duration-300`} />
                              
                              <div className="relative bg-slate-800/50 border border-slate-700/50 rounded-lg p-4 hover:bg-slate-800 transition-all duration-300">
                                <div className="flex items-start gap-3">
                                  <div className={`p-2 bg-gradient-to-br ${category.color} rounded-lg transform group-hover/card:scale-110 transition-transform duration-300`}>
                                    <EngineIcon className="w-4 h-4 text-white" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-white text-sm group-hover/card:text-cyan-400 transition-colors duration-300 leading-tight">
                                      {engine.name}
                                    </h4>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    )}

                    {category.engines.length === 0 && (
                      <div className="mt-6 text-center py-8 bg-slate-800/30 rounded-xl border border-slate-700/30">
                        <p className="text-gray-400 mb-2">Coming Soon</p>
                        <p className="text-sm text-gray-500">Building {category.count}+ engines in this domain</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Universal data feed section */}
          <div className="mt-16 relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl opacity-50 blur-xl animate-pulse" />
            <div className="relative bg-slate-900/90 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm border border-cyan-500/30 rounded-full px-6 py-2 mb-4">
                  <Database className="w-5 h-5 text-cyan-400" />
                  <span className="text-cyan-300 font-medium">Universal SDK</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-3">
                  One Data Feed. 150+ Engines.
                </h3>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  Upload once. Medical claims, Rx claims, member census, contracts, financials → normalized to universal schema → routed to all applicable engines automatically.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-white mb-2">Normalized Schema</h4>
                  <p className="text-gray-400 text-sm">
                    Automatic normalization from any source format (carrier, TPA, ASO) to standard interface
                  </p>
                </div>

                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mb-4">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-white mb-2">Smart Routing</h4>
                  <p className="text-gray-400 text-sm">
                    Auto-detect which engines can run based on data availability and completeness
                  </p>
                </div>

                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50 hover:border-emerald-500/50 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center mb-4">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-white mb-2">Parallel Execution</h4>
                  <p className="text-gray-400 text-sm">
                    Run 50+ engines simultaneously on the same dataset in minutes, not days
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA section */}
          <div className="mt-16 text-center">
            <div className="relative inline-block">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-75 animate-pulse" />
              <div className="relative bg-slate-900 rounded-2xl p-8 border border-slate-700/50">
                <h3 className="text-2xl font-bold text-white mb-4">
                  See The Engines In Action
                </h3>
                <p className="text-gray-300 mb-6 max-w-xl">
                  Live demo with real healthcare data. See 20+ engines process claims, identify arbitrage, forecast trends, score contracts — all from one upload.
                </p>
                <Link
                  href="/request-demo"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white px-8 py-4 rounded-xl font-bold shadow-2xl shadow-purple-500/50 transform hover:scale-105 transition-all duration-300">
                  Request Platform Demo
                  <LineChart className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <style jsx>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </>
  );
}