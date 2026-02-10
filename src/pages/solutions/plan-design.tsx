import { motion } from "framer-motion";
import Link from "next/link";
import { PenTool, Layers, Users, ArrowRight, CheckCircle2, Target, Sliders, Brain, FileText, PieChart, Layout } from "lucide-react";
import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function PlanDesign() {
  const [activeTab, setActiveTab] = useState("strategies");

  const planStrategies = {
    strategies: [
      {
        name: "Value-Based Design",
        description: "Aligning member cost-sharing with high-value clinical services",
        benefit: "Improved health outcomes",
        features: ["Free preventive drugs", "Reduced copays for chronic care", "High-value provider steering", "Wellness incentives"],
        impact: "15% increase in medication adherence",
      },
      {
        name: "Consumer-Driven Health Plans",
        description: "High-deductible structures paired with tax-advantaged accounts",
        benefit: "Lower premiums & tax savings",
        features: ["HSA/HRA integration", "Price transparency tools", "Decision support", "Preventive safe harbor"],
        impact: "12% reduction in total spend",
      },
      {
        name: "Level-Funded Solutions",
        description: "Hybrid funding for mid-sized employers seeking stability and savings",
        benefit: "Cash flow predictability",
        features: ["Stop-loss protection", "Surplus refund potential", "Detailed reporting", "Exemption from some mandates"],
        impact: "18% savings vs fully insured",
      },
      {
        name: "Custom Network Design",
        description: "Tailored provider access based on quality and efficiency metrics",
        benefit: "Cost efficiency & quality",
        features: ["Direct contracting", "Centers of Excellence", "Tiered networks", "Accountable Care Organizations"],
        impact: "22% lower unit costs",
      },
    ],
    modeling: [
      {
        capability: "Actuarial Value Analysis",
        description: "Precise calculation of plan metal levels and coverage value",
        details: ["AV Calculator certification", "Minimum value testing", "Plan relativity analysis"],
      },
      {
        capability: "Contribution Strategy",
        description: "Optimization of employer/employee cost sharing",
        details: ["Defined contribution modeling", "Salary-banded premiums", "Spousal surcharge analysis"],
      },
      {
        capability: "Disruption Analysis",
        description: "Evaluating member impact of network or formulary changes",
        details: ["Provider continuity matching", "Geo-access mapping", "Formulary impact reports"],
      },
      {
        capability: "Demographic Adjustment",
        description: "Tailoring benefits to workforce characteristics",
        details: ["Age/Gender utilization norms", "Risk score adjustment", "Industry benchmarking"],
      },
    ],
  };

  const designMetrics = [
    { label: "Client Retention", value: "98.2%", icon: Users },
    { label: "Plan Options", value: "Unlimited", icon: Layers },
    { label: "Compliance", value: "100%", icon: CheckCircle2 },
    { label: "Design ROI", value: "3.8:1", icon: Target },
  ];

  return (
    <>
      <SEO
        title="Benefit Plan Design & Strategy | SiriusB iQ"
        description="Innovative benefit plan design strategies including value-based design, consumer-driven plans, and level-funded solutions tailored to your workforce."
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
                <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-3xl blur-3xl" />
                <div className="relative">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-red-500/30">
                      <PenTool className="w-12 h-12 text-red-400" />
                    </div>
                    <div>
                      <p className="text-red-400 font-semibold mb-1">Strategic Architecture</p>
                      <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                        Benefit Plan Design
                      </h1>
                    </div>
                  </div>
                  <p className="text-xl md:text-2xl text-gray-300 max-w-4xl">
                    Architecting sustainable benefit programs that balance cost control with competitive talent attraction, using advanced modeling and behavioral economics.
                  </p>
                </div>
              </motion.div>

              <div className="grid md:grid-cols-4 gap-6 mt-12">
                {designMetrics.map((metric, index) => {
                  const Icon = metric.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-6 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-red-500/50 transition-colors"
                    >
                      <Icon className="w-8 h-8 text-red-400 mb-3" />
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
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Design Strategies</h2>
              
              <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
                {["strategies", "modeling"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
                      activeTab === tab
                        ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                        : "bg-gray-800 text-gray-400 hover:text-white"
                    }`}
                  >
                    {tab === "strategies" ? "Strategic Frameworks" : "Actuarial Modeling"}
                  </button>
                ))}
              </div>

              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {activeTab === "strategies" && planStrategies.strategies.map((strategy, index) => (
                  <div key={index} className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-red-500/50 transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">{strategy.name}</h3>
                        <p className="text-gray-400 mb-4">{strategy.description}</p>
                      </div>
                      <div className="text-right hidden md:block">
                        <span className="text-red-400 font-bold text-lg">{strategy.benefit}</span>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        {strategy.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                            <CheckCircle2 className="w-4 h-4 text-red-400" />
                            {feature}
                          </div>
                        ))}
                      </div>
                      <div className="p-4 rounded-xl bg-black/50 border border-gray-800 flex items-center justify-between">
                        <span className="text-gray-400">Proven Impact</span>
                        <span className="text-lg font-bold text-red-400">{strategy.impact}</span>
                      </div>
                    </div>
                  </div>
                ))}

                {activeTab === "modeling" && (
                  <div className="grid md:grid-cols-2 gap-6">
                    {planStrategies.modeling.map((item, index) => (
                      <div key={index} className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800">
                        <h3 className="text-xl font-bold mb-2">{item.capability}</h3>
                        <p className="text-gray-400 mb-4 text-sm">{item.description}</p>
                        <div className="space-y-2">
                          {item.details.map((detail, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                              <Layout className="w-3 h-3 text-orange-400" />
                              {detail}
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
              <div className="p-12 rounded-3xl bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-red-500/30">
                <Layers className="w-16 h-16 text-red-400 mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Design a Better Benefit Plan
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Get a comprehensive review of your current plan design and identify improvement opportunities
                </p>
                <Link href="/request-demo">
                  <button className="px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 rounded-full text-white font-semibold text-lg flex items-center gap-2 mx-auto hover:scale-105 transition-transform">
                    Start Plan Review
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