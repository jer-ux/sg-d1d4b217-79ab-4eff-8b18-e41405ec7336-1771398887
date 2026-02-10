import { motion } from "framer-motion";
import Link from "next/link";
import { TrendingUp, DollarSign, Calculator, BarChart3, Target, ArrowRight, Zap, Shield, Brain, PieChart, CheckCircle2, Activity } from "lucide-react";
import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function PremiumCalculation() {
  const pricingFactors = [
    {
      category: "Claims Experience",
      factors: ["Historical claims frequency", "Claims severity distribution", "Trend analysis (medical inflation)", "Catastrophic claims history", "Stop-loss coverage"],
      weight: "40%",
      icon: BarChart3,
    },
    {
      category: "Demographics",
      factors: ["Age and gender distribution", "Geographic location", "Industry and occupation", "Family composition", "Health risk indicators"],
      weight: "25%",
      icon: Target,
    },
    {
      category: "Plan Design",
      factors: ["Deductible levels", "Coinsurance rates", "Out-of-pocket maximums", "Network configuration", "Covered services"],
      weight: "20%",
      icon: Shield,
    },
    {
      category: "Market Factors",
      factors: ["Competitive landscape", "Regulatory environment", "Provider contract rates", "Pharmaceutical costs", "Technology adoption"],
      weight: "15%",
      icon: Activity,
    },
  ];

  const pricingModels = [
    {
      model: "Manual Rating",
      description: "Traditional community or experience rating for groups under 100 lives",
      advantages: ["Simple and transparent", "Quick implementation", "Minimal data requirements"],
      bestFor: "Small groups (1-100 employees)",
      accuracy: "85-90%",
    },
    {
      model: "Credibility-Weighted",
      description: "Blend of experience and manual rating based on group size and claims stability",
      advantages: ["Balances experience and predictability", "Smooths volatility", "Reflects group characteristics"],
      bestFor: "Mid-size groups (100-1,000 employees)",
      accuracy: "92-95%",
    },
    {
      model: "Fully Experience-Rated",
      description: "Pricing based entirely on group's own claims experience with trend adjustments",
      advantages: ["Highly accurate for large groups", "Reflects true group risk", "Encourages risk management"],
      bestFor: "Large groups (1,000+ employees)",
      accuracy: "96-99%",
    },
    {
      model: "Predictive Analytics",
      description: "Machine learning models incorporating hundreds of risk factors and external data",
      advantages: ["Highest accuracy", "Identifies emerging risks", "Dynamic pricing adjustments"],
      bestFor: "All group sizes with sufficient data",
      accuracy: "98-99.5%",
    },
  ];

  const competitiveAdvantages = [
    {
      feature: "Dynamic Rate Adjustments",
      description: "Real-time premium updates based on actual claims experience and emerging trends, ensuring competitive pricing while maintaining profitability.",
      impact: "$6.2M Revenue Optimization",
      icon: Zap,
    },
    {
      feature: "Multi-Scenario Modeling",
      description: "Simultaneous evaluation of multiple pricing scenarios with sensitivity analysis to optimize the balance between competitiveness and risk.",
      impact: "15+ Scenarios Analyzed",
      icon: Brain,
    },
    {
      feature: "Regulatory Compliance",
      description: "Automated compliance checks ensuring all premium rates meet federal and state regulations, including ACA medical loss ratio requirements.",
      impact: "100% Compliance Rate",
      icon: Shield,
    },
    {
      feature: "Profitability Optimization",
      description: "Advanced algorithms that maximize contribution margin while maintaining market competitiveness and member retention.",
      impact: "487% ROI",
      icon: DollarSign,
    },
  ];

  return (
    <>
      <SEO
        title="Premium Calculation & Pricing Optimization | SiriusB iQ"
        description="Intelligent premium calculation with 98.7% pricing accuracy using advanced actuarial techniques, predictive analytics, and dynamic rate optimization."
      />
      <div className="min-h-screen bg-black text-white">
        <Nav />

        <main className="pt-24 pb-20">
          {/* Hero Section */}
          <section className="px-4 mb-20">
            <div className="max-w-7xl mx-auto">
              <Link href="/actuarial-benefits" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8 transition-colors">
                <ArrowRight className="w-4 h-4 rotate-180" />
                Back to Solutions
              </Link>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-3xl blur-3xl" />
                <div className="relative">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-blue-500/30">
                      <TrendingUp className="w-12 h-12 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-blue-400 font-semibold mb-1">Premium Solution</p>
                      <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                        Premium Calculation & Pricing Optimization
                      </h1>
                    </div>
                  </div>
                  <p className="text-xl md:text-2xl text-gray-300 max-w-4xl">
                    Sophisticated premium pricing algorithms that balance competitiveness, profitability, and risk with 98.7% accuracy, powered by actuarial science and machine learning.
                  </p>
                </div>
              </motion.div>

              {/* Key Metrics */}
              <div className="grid md:grid-cols-4 gap-6 mt-12">
                {[
                  { label: "Pricing Accuracy", value: "98.7%", icon: Target },
                  { label: "Revenue Optimization", value: "$6.2M", icon: DollarSign },
                  { label: "Rate Adjustments", value: "Dynamic", icon: Zap },
                  { label: "Compliance Rate", value: "100%", icon: Shield },
                ].map((metric, index) => {
                  const Icon = metric.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-6 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-blue-500/50 transition-colors"
                    >
                      <Icon className="w-8 h-8 text-blue-400 mb-3" />
                      <div className="text-3xl font-bold mb-1">{metric.value}</div>
                      <div className="text-sm text-gray-400">{metric.label}</div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Pricing Factors */}
          <section className="px-4 mb-20">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12">Comprehensive Pricing Factors</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {pricingFactors.map((factor, index) => {
                  const Icon = factor.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-blue-500/50 transition-all"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Icon className="w-8 h-8 text-blue-400" />
                          <h3 className="text-2xl font-bold">{factor.category}</h3>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 text-sm font-semibold">
                          {factor.weight}
                        </span>
                      </div>
                      <ul className="space-y-2">
                        {factor.factors.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-gray-400">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Pricing Models */}
          <section className="px-4 mb-20">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12">Pricing Models & Methodologies</h2>
              <div className="space-y-6">
                {pricingModels.map((model, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-blue-500/50 transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">{model.model}</h3>
                        <p className="text-gray-400">{model.description}</p>
                      </div>
                      <span className="px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 font-semibold text-sm whitespace-nowrap ml-4">
                        {model.accuracy}
                      </span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                      <div>
                        <p className="text-sm text-gray-500 mb-3">Key Advantages</p>
                        <ul className="space-y-2">
                          {model.advantages.map((advantage, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-gray-300">
                              <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                              {advantage}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-3">Best For</p>
                        <p className="text-gray-300">{model.bestFor}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Competitive Advantages */}
          <section className="px-4 mb-20">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12">Competitive Advantages</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {competitiveAdvantages.map((advantage, index) => {
                  const Icon = advantage.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="p-8 rounded-2xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-gray-700 hover:border-blue-500/50 transition-all"
                    >
                      <Icon className="w-10 h-10 text-blue-400 mb-4" />
                      <h3 className="text-2xl font-bold mb-3">{advantage.feature}</h3>
                      <p className="text-gray-400 mb-4">{advantage.description}</p>
                      <div className="inline-block px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30">
                        <span className="text-blue-400 font-semibold">{advantage.impact}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Formula Breakdown */}
          <section className="px-4 mb-20">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Premium Calculation Formula</h2>
              <div className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-gray-700">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-blue-400">Base Premium Rate</h3>
                    <div className="p-6 rounded-xl bg-black/50 border border-gray-800 font-mono text-sm">
                      <p className="mb-2">Base Premium = (Expected Claims × Trend Factor) + Admin Costs + Profit Margin</p>
                      <p className="text-gray-500">Where Expected Claims = (Claim Frequency × Avg Severity) × Credibility Weight</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-4 text-blue-400">Risk Adjustments</h3>
                    <div className="p-6 rounded-xl bg-black/50 border border-gray-800">
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <Calculator className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-semibold mb-1">Age & Gender Adjustment</p>
                            <p className="text-sm text-gray-400">Demographic factors typically account for 15-30% premium variance</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <Calculator className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-semibold mb-1">Geographic Rating</p>
                            <p className="text-sm text-gray-400">Regional cost variations adjusted by area factor (0.8 to 1.5)</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <Calculator className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-semibold mb-1">Plan Design Factor</p>
                            <p className="text-sm text-gray-400">Benefit richness adjustment based on actuarial value (60% to 90%)</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-4 text-blue-400">Final Rate Calculation</h3>
                    <div className="p-6 rounded-xl bg-black/50 border border-gray-800 font-mono text-sm">
                      <p>Final Premium = Base Premium × Age Factor × Geographic Factor × Plan Design Factor × (1 + Contingency Margin)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="p-12 rounded-3xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-blue-500/30"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Optimize Your Premium Pricing Strategy
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Discover how our premium calculation solutions can improve your competitiveness and profitability
                </p>
                <Link href="/request-demo">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white font-semibold text-lg flex items-center gap-2 mx-auto"
                  >
                    Schedule Consultation
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}