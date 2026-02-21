import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Shield, TrendingUp, AlertTriangle, BarChart3, Users, FileText, CheckCircle2, ArrowRight, Target, Zap, Brain, Database, Activity, PieChart, X, ChevronRight } from "lucide-react";
import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function RiskAssessment() {
  const [activeTab, setActiveTab] = useState("modeling");
  const [selectedCapability, setSelectedCapability] = useState<number | null>(null);

  const capabilities = [
    {
      icon: Brain,
      title: "Predictive Risk Modeling",
      description: "Advanced machine learning algorithms analyze historical claims data, demographic trends, and external risk factors to predict future loss patterns with 99.2% accuracy.",
      metrics: ["99.2% Accuracy", "15+ Risk Factors", "Real-time Updates"],
      detailedContent: {
        overview: "Our predictive risk modeling platform combines cutting-edge machine learning with decades of actuarial expertise to deliver the most accurate loss forecasts in the industry. We analyze over 15 distinct risk factors across your entire portfolio, updating predictions in real-time as new data becomes available.",
        keyFeatures: [
          {
            title: "Multi-Algorithm Ensemble",
            description: "Combines GLM, GBM, and neural networks to capture linear trends, non-linear interactions, and complex patterns simultaneously"
          },
          {
            title: "Adaptive Learning",
            description: "Models automatically retrain as new claims data arrives, ensuring predictions stay current with emerging trends"
          },
          {
            title: "Explainable AI",
            description: "Every prediction comes with detailed explanations of the key drivers, allowing you to understand and validate the results"
          },
          {
            title: "Scenario Analysis",
            description: "Test how different interventions or market conditions would impact your risk profile before implementing changes"
          }
        ],
        technicalDetails: [
          "Gradient Boosting Machines with 500+ trees for capturing complex interactions",
          "LSTM neural networks for time-series patterns and seasonality",
          "Credibility-weighted blending of predictive and traditional actuarial methods",
          "Cross-validation with 10-fold methodology ensuring model stability",
          "SHAP values for feature importance and prediction explainability"
        ],
        businessImpact: [
          "Reduce reserve requirements by up to 34% through more accurate loss predictions",
          "Identify high-risk segments 6-12 months before claims emerge",
          "Optimize pricing by understanding true risk at granular segments",
          "Support strategic decisions with data-driven risk intelligence"
        ],
        dataRequirements: [
          "Minimum 24 months of detailed claims history (36+ months preferred)",
          "Member demographics: age, gender, geography, industry, salary bands",
          "Plan design details for all coverage tiers",
          "Provider network composition and utilization patterns",
          "Historical trend factors and external market benchmarks"
        ]
      }
    },
    {
      icon: Database,
      title: "Portfolio Risk Analysis",
      description: "Comprehensive portfolio-level risk assessment evaluating concentration risk, correlation effects, and aggregate exposure across all benefit lines.",
      metrics: ["$487M Portfolio", "23 Risk Categories", "Daily Monitoring"],
      detailedContent: {
        overview: "Portfolio risk analysis provides a holistic view of your entire benefits portfolio, revealing hidden concentrations, correlations, and systemic risks that aren't visible when analyzing individual plans in isolation. Our platform monitors $487M in benefit liabilities across 23 distinct risk categories with daily updates.",
        keyFeatures: [
          {
            title: "Concentration Risk Mapping",
            description: "Identify geographic, demographic, or provider concentrations that could amplify losses during adverse events"
          },
          {
            title: "Correlation Analysis",
            description: "Understand how risks across different benefit lines move together, preventing surprises from correlated losses"
          },
          {
            title: "Aggregate Exposure Tracking",
            description: "Monitor total risk exposure in real-time, with alerts when concentrations exceed pre-defined thresholds"
          },
          {
            title: "Diversification Scoring",
            description: "Quantify the diversification benefit across your portfolio and identify opportunities to improve risk distribution"
          }
        ],
        technicalDetails: [
          "Copula-based dependency modeling for capturing tail correlations",
          "Value-at-Risk (VaR) and Conditional VaR calculations at 95%, 99%, and 99.5% confidence levels",
          "Monte Carlo simulation with 10,000+ scenarios for aggregate loss distributions",
          "Network analysis algorithms for identifying systemic risk propagation paths",
          "Real-time aggregation using distributed computing infrastructure"
        ],
        businessImpact: [
          "Optimize capital allocation by understanding true portfolio-level risk",
          "Prevent catastrophic losses from correlated events across multiple lines",
          "Make informed decisions about reinsurance and risk transfer strategies",
          "Meet regulatory capital requirements with confidence in your risk metrics"
        ],
        dataRequirements: [
          "Complete inventory of all benefit plans and coverage levels",
          "Claims history across all lines of coverage",
          "Member overlap analysis across different benefit programs",
          "Geographic distribution of covered lives",
          "Network and provider sharing across different plans"
        ]
      }
    },
    {
      icon: Activity,
      title: "Dynamic Risk Scoring",
      description: "Continuously updated risk scores based on real-time claims activity, utilization patterns, and emerging risk indicators.",
      metrics: ["24/7 Monitoring", "47ms Latency", "Automated Alerts"],
      detailedContent: {
        overview: "Dynamic risk scoring transforms static annual risk assessments into a living, breathing risk management system. Our platform monitors your claims activity 24/7, updating risk scores with 47ms latency and automatically alerting you when emerging patterns signal increased risk.",
        keyFeatures: [
          {
            title: "Real-Time Risk Computation",
            description: "Risk scores update continuously as new claims are processed, giving you up-to-the-minute visibility into your risk profile"
          },
          {
            title: "Intelligent Alert System",
            description: "Machine learning algorithms distinguish between normal variation and genuine risk signals, reducing false alarms by 94%"
          },
          {
            title: "Trend Detection",
            description: "Automatically identify emerging risk trends before they become significant problems, enabling proactive intervention"
          },
          {
            title: "Risk Score Attribution",
            description: "Understand exactly which factors are driving changes in your risk scores with detailed attribution analysis"
          }
        ],
        technicalDetails: [
          "Streaming analytics platform processing 10,000+ events per second",
          "Change-point detection algorithms for identifying trend shifts",
          "Bayesian updating for incorporating new information into risk estimates",
          "Multi-variate control charts for monitoring multiple risk dimensions simultaneously",
          "Event-driven architecture ensuring sub-50ms response times"
        ],
        businessImpact: [
          "Respond to emerging risks within hours instead of waiting for quarterly reviews",
          "Reduce losses by 22% through early detection and intervention",
          "Improve stakeholder confidence with transparent, real-time risk reporting",
          "Enable dynamic pricing and plan design adjustments based on current risk levels"
        ],
        dataRequirements: [
          "Real-time claims feed with sub-hour latency",
          "Utilization data by service category and provider",
          "Member roster updates reflecting enrollment changes",
          "External risk indicators: market trends, economic conditions, regulatory changes",
          "Historical baseline for establishing normal variation patterns"
        ]
      }
    },
    {
      icon: PieChart,
      title: "Scenario Testing",
      description: "Monte Carlo simulations and stress testing across multiple economic scenarios to quantify tail risk and capital requirements.",
      metrics: ["10K Scenarios", "99.5% Confidence", "5-Year Projections"],
      detailedContent: {
        overview: "Scenario testing enables you to understand your risk profile under extreme conditions and prepare for the unexpected. We run 10,000+ Monte Carlo simulations across diverse economic scenarios, providing 99.5% confidence intervals on your 5-year loss projections and capital requirements.",
        keyFeatures: [
          {
            title: "Monte Carlo Simulation Engine",
            description: "Run thousands of stochastic scenarios incorporating uncertainty in claims frequency, severity, trends, and economic conditions"
          },
          {
            title: "Stress Testing Framework",
            description: "Test your portfolio against historical crisis scenarios (2008 financial crisis, pandemic, etc.) and hypothetical adverse conditions"
          },
          {
            title: "Tail Risk Quantification",
            description: "Precisely measure the probability and magnitude of extreme loss events, including correlation breakdowns and cascading failures"
          },
          {
            title: "Capital Adequacy Analysis",
            description: "Determine optimal capital levels to withstand 1-in-100 and 1-in-200 year events while maintaining target solvency ratios"
          }
        ],
        technicalDetails: [
          "Latin Hypercube Sampling for efficient coverage of the scenario space",
          "Importance sampling to focus computational resources on tail events",
          "Jump-diffusion models for capturing sudden market shocks",
          "Hierarchical risk aggregation from individual plans to portfolio level",
          "GPU-accelerated computation enabling 10K scenarios in under 2 minutes"
        ],
        businessImpact: [
          "Set capital reserves with confidence, avoiding both under-funding and over-capitalization",
          "Meet regulatory stress testing requirements with robust, auditable methodologies",
          "Identify vulnerabilities in your portfolio before they manifest as actual losses",
          "Support strategic planning with quantified risk-return tradeoffs across different strategies"
        ],
        dataRequirements: [
          "Multi-year claims history for estimating parameter distributions",
          "Correlation matrices between different risk factors",
          "Plan design and contract terms for modeling coverage limits",
          "Economic scenario assumptions (GDP growth, inflation, healthcare trends)",
          "Target risk metrics and capital adequacy thresholds"
        ]
      }
    },
  ];

  const methodology = [
    {
      phase: "Data Collection",
      description: "Aggregate comprehensive claims history, member demographics, plan designs, and external risk factors",
      duration: "2-3 weeks",
      deliverables: ["Data Quality Report", "Risk Factor Catalog", "Baseline Metrics"],
    },
    {
      phase: "Model Development",
      description: "Build custom predictive models using GLM, machine learning, and actuarial techniques",
      duration: "4-6 weeks",
      deliverables: ["Risk Models", "Validation Report", "Sensitivity Analysis"],
    },
    {
      phase: "Risk Quantification",
      description: "Calculate risk metrics including expected loss, loss volatility, and tail risk measures",
      duration: "2-3 weeks",
      deliverables: ["Risk Dashboard", "Risk Rankings", "Capital Requirements"],
    },
    {
      phase: "Mitigation Strategy",
      description: "Develop actionable risk mitigation recommendations and implementation roadmap",
      duration: "1-2 weeks",
      deliverables: ["Mitigation Plan", "Cost-Benefit Analysis", "Implementation Guide"],
    },
  ];

  const caseStudy = {
    client: "Fortune 500 Healthcare Company",
    challenge: "Rising medical claims volatility threatening reserve adequacy",
    solution: "Implemented comprehensive risk assessment framework with predictive modeling",
    results: [
      { metric: "Loss Volatility Reduction", value: "34%", icon: TrendingUp },
      { metric: "Prediction Accuracy", value: "99.2%", icon: Target },
      { metric: "Reserve Optimization", value: "$8.4M", icon: CheckCircle2 },
      { metric: "Implementation Time", value: "8 weeks", icon: Zap },
    ],
  };

  const technicalSpecs = {
    modeling: [
      "Generalized Linear Models (GLM) for claims frequency and severity",
      "Gradient Boosting Machines (GBM) for risk factor identification",
      "Neural networks for pattern recognition in complex risk interactions",
      "Time series analysis for trend identification and forecasting",
      "Credibility theory for balancing historical data with emerging trends",
    ],
    dataRequirements: [
      "Minimum 3 years of detailed claims history by member and service type",
      "Complete member demographics including age, gender, geography, industry",
      "Plan design details including deductibles, copays, out-of-pocket limits",
      "Utilization metrics by service category and provider network",
      "External risk factors: economic indicators, healthcare cost trends, regulatory changes",
    ],
    outputs: [
      "Expected claims cost by plan, demographics, and risk segment",
      "Loss distribution curves with confidence intervals",
      "Value-at-Risk (VaR) and Conditional Value-at-Risk (CVaR) metrics",
      "Sensitivity analysis showing impact of key risk drivers",
      "Capital adequacy recommendations based on risk tolerance",
    ],
  };

  return (
    <>
      <SEO
        title="Risk Assessment Solutions | Advanced Predictive Modeling | SiriusB iQ"
        description="Comprehensive risk assessment with 99.2% accuracy using advanced predictive modeling, portfolio analysis, and real-time monitoring for employee benefits."
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
                <div className="absolute -inset-4 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-3xl blur-3xl" />
                <div className="relative">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-purple-500/30">
                      <Shield className="w-12 h-12 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-purple-400 font-semibold mb-1">Premium Solution</p>
                      <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                        Risk Assessment & Predictive Modeling
                      </h1>
                    </div>
                  </div>
                  <p className="text-xl md:text-2xl text-gray-300 max-w-4xl">
                    Advanced actuarial risk assessment combining predictive analytics, machine learning, and decades of expertise to deliver 99.2% accuracy in loss forecasting and risk quantification.
                  </p>
                </div>
              </motion.div>

              {/* Key Metrics */}
              <div className="grid md:grid-cols-4 gap-6 mt-12">
                {[
                  { label: "Prediction Accuracy", value: "99.2%", icon: Target },
                  { label: "Loss Prevention", value: "$8.4M", icon: Shield },
                  { label: "Response Time", value: "47ms", icon: Zap },
                  { label: "Risk Factors Analyzed", value: "15+", icon: BarChart3 },
                ].map((metric, index) => {
                  const Icon = metric.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-6 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-purple-500/50 transition-colors"
                    >
                      <Icon className="w-8 h-8 text-purple-400 mb-3" />
                      <div className="text-3xl font-bold mb-1">{metric.value}</div>
                      <div className="text-sm text-gray-400">{metric.label}</div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Core Capabilities */}
          <section className="px-4 mb-20">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Core Capabilities</h2>
              <p className="text-gray-400 mb-12">Click any capability to learn more about our advanced risk assessment solutions</p>
              <div className="grid md:grid-cols-2 gap-8">
                {capabilities.map((capability, index) => {
                  const Icon = capability.icon;
                  return (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      onClick={() => setSelectedCapability(index)}
                      className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-purple-500/50 transition-all group text-left cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <Icon className="w-10 h-10 text-purple-400 group-hover:scale-110 transition-transform" />
                        <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-purple-400 transition-colors" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3">{capability.title}</h3>
                      <p className="text-gray-400 mb-6">{capability.description}</p>
                      <div className="flex flex-wrap gap-3">
                        {capability.metrics.map((metric, idx) => (
                          <span key={idx} className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-400 text-sm">
                            {metric}
                          </span>
                        ))}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Detailed Capability Modal */}
          <AnimatePresence>
            {selectedCapability !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
                onClick={() => setSelectedCapability(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-800 my-8"
                >
                  {(() => {
                    const capability = capabilities[selectedCapability];
                    const Icon = capability.icon;
                    return (
                      <div>
                        {/* Header */}
                        <div className="sticky top-0 bg-gray-900 border-b border-gray-800 p-6 flex items-start justify-between">
                          <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-purple-500/30">
                              <Icon className="w-8 h-8 text-purple-400" />
                            </div>
                            <div>
                              <h2 className="text-3xl font-bold">{capability.title}</h2>
                              <div className="flex gap-2 mt-2">
                                {capability.metrics.map((metric, idx) => (
                                  <span key={idx} className="px-2 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-400 text-xs">
                                    {metric}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => setSelectedCapability(null)}
                            className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
                          >
                            <X className="w-6 h-6" />
                          </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-8">
                          {/* Overview */}
                          <div>
                            <h3 className="text-xl font-bold mb-3 text-purple-400">Overview</h3>
                            <p className="text-gray-300 leading-relaxed">{capability.detailedContent.overview}</p>
                          </div>

                          {/* Key Features */}
                          <div>
                            <h3 className="text-xl font-bold mb-4 text-purple-400">Key Features</h3>
                            <div className="grid gap-4">
                              {capability.detailedContent.keyFeatures.map((feature, idx) => (
                                <div key={idx} className="p-4 rounded-lg bg-gray-800/50 border border-gray-700">
                                  <h4 className="font-bold mb-2 flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                                    {feature.title}
                                  </h4>
                                  <p className="text-gray-400 text-sm">{feature.description}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Technical Details */}
                          <div>
                            <h3 className="text-xl font-bold mb-4 text-purple-400">Technical Details</h3>
                            <ul className="space-y-3">
                              {capability.detailedContent.technicalDetails.map((detail, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                  <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                                  <span className="text-gray-300">{detail}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Business Impact */}
                          <div>
                            <h3 className="text-xl font-bold mb-4 text-purple-400">Business Impact</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                              {capability.detailedContent.businessImpact.map((impact, idx) => (
                                <div key={idx} className="p-4 rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30">
                                  <div className="flex items-start gap-3">
                                    <Target className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                    <p className="text-gray-300 text-sm">{impact}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Data Requirements */}
                          <div>
                            <h3 className="text-xl font-bold mb-4 text-purple-400">Data Requirements</h3>
                            <div className="p-4 rounded-lg bg-gray-800/50 border border-gray-700">
                              <ul className="space-y-2">
                                {capability.detailedContent.dataRequirements.map((req, idx) => (
                                  <li key={idx} className="flex items-start gap-3">
                                    <Database className="w-4 h-4 text-blue-400 flex-shrink-0 mt-1" />
                                    <span className="text-gray-300 text-sm">{req}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* CTA */}
                          <div className="pt-6 border-t border-gray-800">
                            <div className="text-center">
                              <h3 className="text-2xl font-bold mb-3">Ready to Get Started?</h3>
                              <p className="text-gray-400 mb-6">
                                Schedule a consultation to discuss how {capability.title.toLowerCase()} can transform your risk management
                              </p>
                              <Link href="/request-demo">
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  className="px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full text-white font-semibold text-lg flex items-center gap-2 mx-auto"
                                  onClick={() => setSelectedCapability(null)}
                                >
                                  Start Now
                                  <ArrowRight className="w-5 h-5" />
                                </motion.button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Methodology */}
          <section className="px-4 mb-20">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12">Our Methodology</h2>
              <div className="space-y-6">
                {methodology.map((phase, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-xl font-bold">
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-grow p-6 rounded-xl bg-gray-900/50 border border-gray-800">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-2xl font-bold">{phase.phase}</h3>
                          <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-400 text-sm">
                            {phase.duration}
                          </span>
                        </div>
                        <p className="text-gray-400 mb-4">{phase.description}</p>
                        <div>
                          <p className="text-sm text-gray-500 mb-2">Key Deliverables:</p>
                          <div className="flex flex-wrap gap-2">
                            {phase.deliverables.map((deliverable, idx) => (
                              <span key={idx} className="px-3 py-1 rounded-full bg-gray-800 text-gray-300 text-sm flex items-center gap-2">
                                <CheckCircle2 className="w-3 h-3 text-green-400" />
                                {deliverable}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    {index < methodology.length - 1 && (
                      <div className="ml-6 h-8 w-0.5 bg-gradient-to-b from-purple-500 to-transparent" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Technical Specifications */}
          <section className="px-4 mb-20">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Technical Specifications</h2>
              
              <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
                {["modeling", "dataRequirements", "outputs"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
                      activeTab === tab
                        ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
                        : "bg-gray-800 text-gray-400 hover:text-white"
                    }`}
                  >
                    {tab === "modeling" ? "Modeling Techniques" : tab === "dataRequirements" ? "Data Requirements" : "Outputs & Deliverables"}
                  </button>
                ))}
              </div>

              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800"
              >
                <ul className="space-y-4">
                  {technicalSpecs[activeTab as keyof typeof technicalSpecs].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </section>

          {/* Case Study */}
          <section className="px-4 mb-20">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12">Case Study</h2>
              <div className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-gray-700">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-purple-500/20">
                    <Users className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-bold">{caseStudy.client}</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Challenge</p>
                    <p className="text-gray-300">{caseStudy.challenge}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Solution</p>
                    <p className="text-gray-300">{caseStudy.solution}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-4">Results</p>
                  <div className="grid md:grid-cols-4 gap-6">
                    {caseStudy.results.map((result, index) => {
                      const Icon = result.icon;
                      return (
                        <div key={index} className="text-center">
                          <Icon className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                          <div className="text-3xl font-bold text-green-400 mb-1">{result.value}</div>
                          <div className="text-sm text-gray-400">{result.metric}</div>
                        </div>
                      );
                    })}
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
                className="p-12 rounded-3xl bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-purple-500/30"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to Transform Your Risk Management?
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Schedule a consultation with our actuarial experts to discuss your risk assessment needs
                </p>
                <Link href="/request-demo">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full text-white font-semibold text-lg flex items-center gap-2 mx-auto"
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