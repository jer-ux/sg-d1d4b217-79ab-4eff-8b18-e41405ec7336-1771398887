import { motion } from "framer-motion";
import Link from "next/link";
import { DollarSign, TrendingDown, PieChart, ArrowRight, CheckCircle2, Target, BarChart3, Zap, Brain, Activity, Shield, Users } from "lucide-react";
import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function CostOptimization() {
  const [activeTab, setActiveTab] = useState("strategies");

  const optimizationStrategies = {
    strategies: [
      {
        name: "Network Optimization",
        description: "Strategic provider alignment and high-performance network design",
        impact: "12-18% savings",
        features: ["Center of Excellence (COE) steering", "Direct contracting", "Narrow network options", "Value-based care arrangements"],
        metric: "$2,400 PMPY savings",
      },
      {
        name: "Pharmacy Management",
        description: "Comprehensive Rx cost control through formulary and utilization management",
        impact: "15-25% savings",
        features: ["Specialty drug controls", "Rebate transparency", "Mail order optimization", "Biosimilar strategies"],
        metric: "$180 PMPM reduction",
      },
      {
        name: "Clinical Management",
        description: "Proactive care management for high-cost and chronic conditions",
        impact: "8-12% savings",
        features: ["Case management", "Disease management", "Utilization review", "Pre-authorization"],
        metric: "3.5:1 ROI",
      },
      {
        name: "Reference-Based Pricing",
        description: "Medicare-benchmarked reimbursement strategies",
        impact: "20-30% savings",
        features: ["Medicare + % pricing", "Balance billing support", "Provider direct payments", "Fiduciary protection"],
        metric: "45% reduction in facility costs",
      },
    ],
    analytics: [
      {
        tool: "Cost Driver Analysis",
        description: "Deep dive into underlying factors driving plan spend",
        capabilities: ["Service category breakdown", "Provider cost variance", "Member risk stratification", "Trend forecasting"],
      },
      {
        tool: "Benchmark Comparison",
        description: "Performance measurement against industry peers",
        capabilities: ["Regional cost benchmarks", "Utilization norms", "Plan design competitiveness", "Quality scoring"],
      },
      {
        tool: "Predictive Modeling",
        description: "AI-driven forecasting of future liability",
        capabilities: ["Risk score projection", "High-cost claimant prediction", "Trend simulation", "Intervention modeling"],
      },
      {
        tool: "ROI Calculator",
        description: "Impact measurement of implemented programs",
        capabilities: ["Program savings tracking", "Engagement correlation", "Outcome verification", "Net financial impact"],
      },
    ],
    implementation: [
      {
        phase: "Phase 1: Analysis",
        timeline: "Weeks 1-4",
        actions: ["Data ingestion", "Baseline establishment", "Opportunity identification", "Strategy selection"],
      },
      {
        phase: "Phase 2: Design",
        timeline: "Weeks 5-8",
        actions: ["Vendor RFP/Selection", "Plan modeling", "Impact projection", "Stakeholder approval"],
      },
      {
        phase: "Phase 3: Execution",
        timeline: "Weeks 9-12",
        actions: ["Contract negotiation", "System configuration", "Communication rollout", "Go-live"],
      },
      {
        phase: "Phase 4: Monitoring",
        timeline: "Ongoing",
        actions: ["Performance tracking", "Vendor accountability", "Regular reporting", "Continuous adjustment"],
      },
    ],
  };

  const costMetrics = [
    { label: "Average Savings", value: "18.4%", icon: TrendingDown },
    { label: "ROI Delivered", value: "4.2:1", icon: Target },
    { label: "PMPM Reduction", value: "$142", icon: DollarSign },
    { label: "Trend Mitigation", value: "-6.5%", icon: BarChart3 },
  ];

  return (
    <>
      <SEO
        title="Healthcare Cost Optimization & Savings | SiriusB iQ"
        description="Data-driven cost optimization strategies delivering 18.4% average savings through network design, pharmacy management, and clinical interventions."
      />
      <div className="min-h-screen bg-black text-white">
        <Nav />

        <main className="pt-24 pb-20">
          <section className="px-4 mb-20">
            <div className="max-w-7xl mx-auto">
              <Link href="/actuarial-benefits" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 transition-colors">
                <ArrowRight className="w-4 h-4 rotate-180" />
                Back to Solutions
              </Link>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-3xl blur-3xl" />
                <div className="relative">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-emerald-500/30">
                      <DollarSign className="w-12 h-12 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-emerald-400 font-semibold mb-1">Financial Performance</p>
                      <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                        Cost Optimization
                      </h1>
                    </div>
                  </div>
                  <p className="text-xl md:text-2xl text-gray-300 max-w-4xl">
                    Strategic cost containment solutions that reduce healthcare spend without compromising quality of care, utilizing advanced analytics and proven intervention strategies.
                  </p>
                </div>
              </motion.div>

              <div className="grid md:grid-cols-4 gap-6 mt-12">
                {costMetrics.map((metric, index) => {
                  const Icon = metric.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-6 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-emerald-500/50 transition-colors"
                    >
                      <Icon className="w-8 h-8 text-emerald-400 mb-3" />
                      <div className="text-3xl font-bold mb-1">{metric.value}</div>
                      <div className="text-sm text-gray-400">{metric.label}</div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="px-4 mb-20">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Optimization Framework</h2>
              
              <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
                {["strategies", "analytics", "implementation"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
                      activeTab === tab
                        ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                        : "bg-gray-800 text-gray-400 hover:text-white"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {activeTab === "strategies" && optimizationStrategies.strategies.map((strategy, index) => (
                  <div key={index} className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-emerald-500/50 transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">{strategy.name}</h3>
                        <p className="text-gray-400 mb-4">{strategy.description}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-emerald-400 font-bold text-xl">{strategy.impact}</span>
                        <p className="text-xs text-gray-500">Projected Impact</p>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        {strategy.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            {feature}
                          </div>
                        ))}
                      </div>
                      <div className="p-4 rounded-xl bg-black/50 border border-gray-800 flex items-center justify-between">
                        <span className="text-gray-400">Key Metric</span>
                        <span className="text-xl font-bold text-emerald-400">{strategy.metric}</span>
                      </div>
                    </div>
                  </div>
                ))}

                {activeTab === "analytics" && (
                  <div className="grid md:grid-cols-2 gap-6">
                    {optimizationStrategies.analytics.map((item, index) => (
                      <div key={index} className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800">
                        <h3 className="text-xl font-bold mb-2">{item.tool}</h3>
                        <p className="text-gray-400 mb-4 text-sm">{item.description}</p>
                        <div className="space-y-2">
                          {item.capabilities.map((cap, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                              <Zap className="w-3 h-3 text-yellow-400" />
                              {cap}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "implementation" && (
                  <div className="relative border-l-2 border-gray-800 ml-4 space-y-8 py-4">
                    {optimizationStrategies.implementation.map((phase, index) => (
                      <div key={index} className="relative pl-8">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-900 border-2 border-emerald-500" />
                        <div className="mb-2">
                          <span className="text-sm text-emerald-400 font-semibold">{phase.timeline}</span>
                          <h3 className="text-xl font-bold">{phase.phase}</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          {phase.actions.map((action, idx) => (
                            <div key={idx} className="bg-gray-900/50 p-3 rounded-lg border border-gray-800 text-sm text-gray-300">
                              {action}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </section>

          <section className="px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="p-12 rounded-3xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-emerald-500/30">
                <DollarSign className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Identify Your Savings Opportunities
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Get a complimentary savings analysis based on your plan data
                </p>
                <Link href="/request-demo">
                  <button className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full text-white font-semibold text-lg flex items-center gap-2 mx-auto hover:scale-105 transition-transform">
                    Start Savings Analysis
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}