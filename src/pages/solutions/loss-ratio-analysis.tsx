import { motion } from "framer-motion";
import Link from "next/link";
import { TrendingDown, BarChart3, AlertTriangle, ArrowRight, CheckCircle2, Target, PieChart, Activity, DollarSign, Calendar, FileText, Zap } from "lucide-react";
import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function LossRatioAnalysis() {
  const [activeTab, setActiveTab] = useState("monitoring");

  const lossRatioFramework = {
    monitoring: [
      {
        metric: "Medical Loss Ratio (MLR)",
        definition: "Incurred claims + quality improvement expenses / Earned premium",
        target: "80-85% (Large Group), 80% (Small Group)",
        significance: "Primary measure of plan efficiency and ACA rebate trigger",
        components: [
          "Incurred but not reported (IBNR) claims",
          "Paid claims through reporting period",
          "Quality improvement activities",
          "Premium revenue recognition",
          "Risk adjustment transfers",
        ],
        monitoring: "Monthly trending with 3-month rolling averages",
      },
      {
        metric: "Administrative Loss Ratio (ALR)",
        definition: "Administrative expenses / Earned premium",
        target: "12-18% depending on plan size",
        significance: "Overhead efficiency and operational cost control",
        components: [
          "Broker commissions and fees",
          "TPA administrative fees",
          "Stop-loss premiums",
          "Consulting and actuarial services",
          "Technology and systems costs",
        ],
        monitoring: "Quarterly budget variance analysis",
      },
      {
        metric: "Combined Loss Ratio",
        definition: "MLR + ALR",
        target: "< 100% for sustainable operations",
        significance: "Total plan efficiency and financial viability",
        components: [
          "Medical and pharmacy claims",
          "All administrative costs",
          "Margin for contingency reserves",
          "Profit or surplus allocation",
        ],
        monitoring: "Monthly executive dashboard reporting",
      },
    ],
    drivers: [
      {
        category: "Utilization Factors",
        impact: "45-60% of cost variance",
        metrics: [
          "Admission rates per 1,000",
          "Average length of stay (ALOS)",
          "Emergency room visit frequency",
          "Specialist referral patterns",
          "High-cost imaging utilization",
          "Pharmacy days supply and refills",
        ],
        benchmarks: "National and regional peer comparison",
      },
      {
        category: "Unit Cost Factors",
        impact: "30-40% of cost variance",
        metrics: [
          "DRG payment rates vs Medicare",
          "Professional fee schedules",
          "Pharmacy ingredient cost trends",
          "Facility per diem or case rates",
          "Out-of-network balance billing",
        ],
        benchmarks: "Fair Health and FAIR Health database",
      },
      {
        category: "Mix and Acuity",
        impact: "15-25% of cost variance",
        metrics: [
          "Case mix index (CMI)",
          "Risk adjustment factor (RAF)",
          "Chronic condition prevalence",
          "High-cost claimant concentration",
          "Dependent ratio and demographics",
        ],
        benchmarks: "Industry risk score norms",
      },
      {
        category: "Seasonal Patterns",
        impact: "5-15% monthly variance",
        metrics: [
          "Q4 deductible acceleration",
          "Flu season hospitalization spikes",
          "Elective procedure timing",
          "Benefit year transition impacts",
        ],
        benchmarks: "Historical seasonal indices",
      },
    ],
    interventions: [
      {
        strategy: "Network Steerage",
        description: "Directing members to high-efficiency providers",
        tactics: [
          "Tiered network design with differential cost-sharing",
          "Center of Excellence (COE) programs for high-cost procedures",
          "Primary care attribution and gatekeeping",
          "Narrow network options with premium discounts",
          "Reference-based pricing with fiduciary guarantees",
        ],
        impact: "8-15% reduction in allowed costs",
        timeline: "6-12 months to full adoption",
      },
      {
        strategy: "Utilization Management",
        description: "Evidence-based controls on unnecessary or low-value care",
        tactics: [
          "Pre-authorization for high-cost services",
          "Concurrent review and length of stay management",
          "Retrospective review and claims audits",
          "Step therapy and prior authorization for Rx",
          "Imaging and radiology appropriateness criteria",
        ],
        impact: "5-10% reduction in medical costs",
        timeline: "3-6 months implementation",
      },
      {
        strategy: "Care Management",
        description: "Proactive interventions for high-risk populations",
        tactics: [
          "Catastrophic case management",
          "Chronic disease management programs",
          "Maternity and prenatal care coordination",
          "Behavioral health integration",
          "Transition of care and discharge planning",
        ],
        impact: "3.5:1 to 5:1 ROI on program spend",
        timeline: "12-18 months for full ROI",
      },
      {
        strategy: "Plan Design Changes",
        description: "Benefit structure modifications to influence behavior",
        tactics: [
          "Value-based insurance design (VBID)",
          "High-deductible health plans with HSA/HRA",
          "Spousal surcharges and tobacco penalties",
          "Telemedicine and virtual care incentives",
          "Preventive care first-dollar coverage",
        ],
        impact: "10-18% premium equivalent savings",
        timeline: "Annual renewal cycle implementation",
      },
    ],
  };

  const analysisTools = [
    {
      tool: "Real-Time Loss Ratio Dashboard",
      description: "Executive visibility into current period performance",
      features: [
        "Daily claims data ingestion and processing",
        "Automated IBNR calculations with confidence intervals",
        "Premium allocation and revenue recognition",
        "Drill-down by plan, location, and demographic segment",
        "Alert notifications for adverse trend detection",
      ],
      output: "Interactive Tableau/Power BI dashboards",
      icon: Activity,
    },
    {
      tool: "Predictive Loss Ratio Modeling",
      description: "Forecasting future performance based on leading indicators",
      features: [
        "Machine learning algorithms on historical patterns",
        "Seasonality adjustment and trend extrapolation",
        "Scenario modeling for benefit design changes",
        "Monte Carlo simulation for range of outcomes",
        "Integration with budget and financial planning",
      ],
      output: "Rolling 12-month forecast with 80% confidence bands",
      icon: TrendingDown,
    },
    {
      tool: "Cost Driver Decomposition",
      description: "Root cause analysis of loss ratio variance",
      features: [
        "Utilization vs unit cost attribution",
        "Service category contribution analysis",
        "Provider and facility cost concentration",
        "Member cohort performance comparison",
        "Year-over-year variance bridge reports",
      ],
      output: "Waterfall charts showing cost change components",
      icon: BarChart3,
    },
    {
      tool: "Benchmark Comparison Engine",
      description: "Performance measurement against industry standards",
      features: [
        "National and regional peer group selection",
        "Industry-specific norm development",
        "Adjustment for demographics and plan design",
        "Percentile ranking and gap analysis",
        "Best practice identification",
      ],
      output: "Scorecard with improvement opportunity prioritization",
      icon: Target,
    },
  ];

  const caseStudy = {
    client: "Multi-Location Manufacturer - 8,500 Employees",
    challenge: "Loss ratio deteriorated from 82% to 94% over 2 years, threatening plan sustainability. Key drivers: unmanaged specialty drug spend (+35%), high facility costs (155% of Medicare), and rising ER utilization (142 per 1,000).",
    solution: "Comprehensive loss ratio optimization program combining data analytics, benefit redesign, and vendor management",
    timeline: "18-month phased implementation",
    phases: [
      {
        phase: "Phase 1: Assessment (Months 1-3)",
        actions: [
          "Complete claims data analysis and cost driver identification",
          "Benchmark study against peer manufacturers",
          "Provider network cost efficiency review",
          "Member survey on benefit utilization and satisfaction",
        ],
      },
      {
        phase: "Phase 2: Design (Months 4-6)",
        actions: [
          "Specialty pharmacy benefit manager (PBM) RFP",
          "Reference-based pricing (RBP) feasibility study",
          "Center of Excellence (COE) program design for joint replacements",
          "High-deductible health plan (HDHP) modeling",
        ],
      },
      {
        phase: "Phase 3: Implementation (Months 7-12)",
        actions: [
          "Specialty PBM transition with prior authorization",
          "RBP implementation with Medicare + 140% benchmark",
          "COE contracting and member communication",
          "HDHP option launch with employer HSA contribution",
        ],
      },
      {
        phase: "Phase 4: Optimization (Months 13-18)",
        actions: [
          "Monthly loss ratio monitoring and intervention",
          "Care management program for top 50 claimants",
          "Telemedicine expansion and incentives",
          "Wellness program with biometric screening incentives",
        ],
      },
    ],
    results: [
      { metric: "Loss Ratio", value: "81.5%", change: "-12.5 points from baseline" },
      { metric: "Specialty Drug Trend", value: "+4.2%", change: "Down from +35% annually" },
      { metric: "Facility Costs", value: "128% of Medicare", change: "From 155% of Medicare" },
      { metric: "ER Utilization", value: "98 per 1,000", change: "-31% reduction" },
      { metric: "Member Satisfaction", value: "4.3/5.0", change: "+0.4 improvement" },
      { metric: "Total Savings", value: "$4.2M", change: "Annual run-rate savings" },
    ],
  };

  const metrics = [
    { label: "Avg Client MLR", value: "82.3%", icon: TrendingDown },
    { label: "Plans Monitored", value: "250+", icon: BarChart3 },
    { label: "Cost Accuracy", value: "±2.5%", icon: Target },
    { label: "ROI Delivered", value: "4.8:1", icon: DollarSign },
  ];

  return (
    <>
      <SEO
        title="Loss Ratio Analysis & Management | SiriusB iQ"
        description="Advanced loss ratio monitoring and optimization with 82.3% average MLR, predictive modeling, and cost driver analytics for sustainable benefit programs."
      />
      <div className="min-h-screen bg-black text-white">
        <Nav />

        <main className="pt-24 pb-20">
          {/* Hero Section */}
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
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl" />
                <div className="relative">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-pink-500/30">
                      <TrendingDown className="w-12 h-12 text-pink-400" />
                    </div>
                    <div>
                      <p className="text-pink-400 font-semibold mb-1">Financial Performance</p>
                      <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                        Loss Ratio Analysis
                      </h1>
                    </div>
                  </div>
                  <p className="text-xl md:text-2xl text-gray-300 max-w-4xl">
                    Real-time monitoring, predictive modeling, and strategic interventions to optimize medical loss ratios and ensure sustainable benefit program performance.
                  </p>
                </div>
              </motion.div>

              {/* Key Metrics */}
              <div className="grid md:grid-cols-4 gap-6 mt-12">
                {metrics.map((metric, index) => {
                  const Icon = metric.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-6 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-pink-500/50 transition-colors"
                    >
                      <Icon className="w-8 h-8 text-pink-400 mb-3" />
                      <div className="text-3xl font-bold mb-1">{metric.value}</div>
                      <div className="text-sm text-gray-400">{metric.label}</div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Loss Ratio Framework */}
          <section className="px-4 mb-20">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Loss Ratio Framework</h2>
              
              <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
                {["monitoring", "drivers", "interventions"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
                      activeTab === tab
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                        : "bg-gray-800 text-gray-400 hover:text-white"
                    }`}
                  >
                    {tab === "monitoring" ? "Key Metrics" : tab === "drivers" ? "Cost Drivers" : "Interventions"}
                  </button>
                ))}
              </div>

              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {activeTab === "monitoring" && lossRatioFramework.monitoring.map((item, index) => (
                  <div key={index} className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-pink-500/50 transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">{item.metric}</h3>
                        <p className="text-gray-400 mb-2">{item.definition}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-gray-500">Target Range:</span>
                          <span className="px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 font-semibold">
                            {item.target}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6 p-4 rounded-xl bg-blue-900/20 border border-blue-900/50">
                      <p className="text-sm text-gray-400 mb-2">Significance</p>
                      <p className="text-blue-300">{item.significance}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm font-semibold text-gray-500 mb-3">Key Components</p>
                        <div className="space-y-2">
                          {item.components.map((component, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-sm text-gray-300 p-3 rounded-lg bg-black/30">
                              <CheckCircle2 className="w-4 h-4 text-pink-400 flex-shrink-0 mt-0.5" />
                              {component}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="p-4 rounded-xl bg-black/50 border border-gray-800">
                        <p className="text-sm text-gray-500 mb-2">Monitoring Frequency</p>
                        <p className="text-pink-400 font-semibold">{item.monitoring}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {activeTab === "drivers" && lossRatioFramework.drivers.map((driver, index) => (
                  <div key={index} className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-pink-500/50 transition-all">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">{driver.category}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">Typical Impact:</span>
                          <span className="px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-sm font-semibold">
                            {driver.impact}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm font-semibold text-gray-500 mb-3">Measurement Metrics</p>
                        <div className="space-y-2">
                          {driver.metrics.map((metric, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                              <div className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                              {metric}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="p-4 rounded-xl bg-black/50 border border-gray-800">
                        <p className="text-sm text-gray-500 mb-2">Benchmark Source</p>
                        <p className="text-pink-400 font-semibold">{driver.benchmarks}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {activeTab === "interventions" && lossRatioFramework.interventions.map((intervention, index) => (
                  <div key={index} className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-pink-500/50 transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">{intervention.strategy}</h3>
                        <p className="text-gray-400">{intervention.description}</p>
                      </div>
                      <div className="text-right ml-4">
                        <p className="text-2xl font-bold text-green-400">{intervention.impact}</p>
                        <p className="text-xs text-gray-500">Expected Impact</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <p className="text-sm font-semibold text-gray-500 mb-3">Implementation Tactics</p>
                      <div className="space-y-2">
                        {intervention.tactics.map((tactic, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-sm text-gray-300 p-3 rounded-lg bg-black/30">
                            <Zap className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                            {tactic}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 rounded-xl bg-black/50 border border-gray-800">
                      <Calendar className="w-5 h-5 text-pink-400" />
                      <div>
                        <p className="text-sm text-gray-500">Implementation Timeline</p>
                        <p className="text-pink-400 font-semibold">{intervention.timeline}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Analysis Tools */}
          <section className="px-4 mb-20">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12">Analysis & Monitoring Tools</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {analysisTools.map((tool, index) => {
                  const Icon = tool.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-pink-500/50 transition-all"
                    >
                      <Icon className="w-10 h-10 text-pink-400 mb-4" />
                      <h3 className="text-2xl font-bold mb-3">{tool.tool}</h3>
                      <p className="text-gray-400 mb-6">{tool.description}</p>
                      <div className="space-y-2 mb-6">
                        {tool.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                            <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                            {feature}
                          </div>
                        ))}
                      </div>
                      <div className="p-4 rounded-xl bg-black/50 border border-pink-900/50">
                        <p className="text-sm text-gray-500 mb-1">Output Format</p>
                        <p className="text-pink-400 font-semibold text-sm">{tool.output}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Case Study */}
          <section className="px-4 mb-20">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12">Loss Ratio Transformation Case Study</h2>
              <div className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-gray-700">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-pink-500/20">
                    <Target className="w-6 h-6 text-pink-400" />
                  </div>
                  <h3 className="text-2xl font-bold">{caseStudy.client}</h3>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-8">
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Challenge</p>
                    <p className="text-gray-300">{caseStudy.challenge}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Solution</p>
                    <p className="text-gray-300">{caseStudy.solution}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Timeline</p>
                    <p className="text-gray-300">{caseStudy.timeline}</p>
                  </div>
                </div>

                <div className="mb-8">
                  <p className="text-sm text-gray-500 mb-4">Implementation Phases</p>
                  <div className="space-y-4">
                    {caseStudy.phases.map((phase, index) => (
                      <div key={index} className="p-6 rounded-xl bg-black/50 border border-gray-800">
                        <h4 className="font-bold mb-3">{phase.phase}</h4>
                        <div className="grid md:grid-cols-2 gap-3">
                          {phase.actions.map((action, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                              <CheckCircle2 className="w-4 h-4 text-pink-400 flex-shrink-0 mt-0.5" />
                              {action}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-4">Measurable Results</p>
                  <div className="grid md:grid-cols-3 gap-6">
                    {caseStudy.results.map((result, index) => (
                      <div key={index} className="text-center p-6 rounded-xl bg-black/50 border border-gray-800">
                        <div className="text-3xl font-bold text-green-400 mb-1">{result.value}</div>
                        <div className="text-sm text-gray-400 mb-2">{result.metric}</div>
                        <div className="text-xs text-green-400">{result.change}</div>
                      </div>
                    ))}
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
                className="p-12 rounded-3xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-pink-500/30"
              >
                <TrendingDown className="w-16 h-16 text-pink-400 mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Optimize Your Loss Ratio Performance
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Get a comprehensive loss ratio analysis with actionable recommendations
                </p>
                <Link href="/request-demo">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold text-lg flex items-center gap-2 mx-auto"
                  >
                    Request Loss Ratio Assessment
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