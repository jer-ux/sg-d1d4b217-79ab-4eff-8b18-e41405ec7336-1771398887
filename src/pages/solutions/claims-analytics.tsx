import { motion } from "framer-motion";
import Link from "next/link";
import { Activity, TrendingDown, AlertTriangle, Target, ArrowRight, CheckCircle2, BarChart3, Clock, DollarSign, Users, Shield, Zap, Brain, FileText, Bell } from "lucide-react";
import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function ClaimsAnalytics() {
  const [activeTab, setActiveTab] = useState("patterns");

  const claimsMetrics = {
    patterns: [
      {
        pattern: "High-Cost Claimants (>$100K)",
        prevalence: "1.2% of members",
        costImpact: "47.3% of total spend",
        trends: ["Oncology dominates (34%)", "Rare diseases growing 18% YoY", "Transplants stable at 8%"],
        intervention: "Case management reduces costs by $47K per member annually",
      },
      {
        pattern: "Chronic Condition Management",
        prevalence: "23.7% of members",
        costImpact: "61.8% of total spend",
        trends: ["Diabetes: $8,400 PMPY", "Hypertension: $6,200 PMPY", "Asthma: $4,800 PMPY"],
        intervention: "Disease management programs show 22% cost reduction",
      },
      {
        pattern: "Preventable ER Utilization",
        prevalence: "8.4 visits per 1000 members",
        costImpact: "$2,847 per visit average",
        trends: ["67% occur after-hours", "Peak: Friday evenings", "52% could use urgent care"],
        intervention: "Telehealth access reduces ER visits by 31%",
      },
      {
        pattern: "Readmission Patterns",
        prevalence: "14.2% within 30 days",
        costImpact: "$15,600 per readmission",
        trends: ["CHF highest rate (28%)", "Sepsis second (24%)", "COPD third (19%)"],
        intervention: "Transitional care programs cut readmissions by 34%",
      },
    ],
    efficiency: [
      {
        metric: "Claims Processing Speed",
        current: "4.2 days average",
        benchmark: "Industry: 7.8 days",
        improvement: "Auto-adjudication at 87.3%",
        impact: "$1.2M annual savings in processing costs",
      },
      {
        metric: "Payment Accuracy",
        current: "99.4% first-time accuracy",
        benchmark: "Industry: 96.8%",
        improvement: "AI-powered validation",
        impact: "94% reduction in payment disputes",
      },
      {
        metric: "Fraud Detection Rate",
        current: "0.8% of claims flagged",
        benchmark: "Industry: 0.3% detected",
        improvement: "Predictive analytics + network analysis",
        impact: "$8.4M in fraud prevented annually",
      },
      {
        metric: "Member Satisfaction",
        current: "94.7% satisfaction",
        benchmark: "Industry: 82.1%",
        improvement: "Real-time status + proactive communication",
        impact: "67% reduction in service calls",
      },
    ],
    optimization: [
      {
        opportunity: "Pharmacy Cost Management",
        annual_impact: "$4.2M savings",
        strategies: ["Generic substitution (91.4% rate)", "Step therapy protocols", "Prior authorization optimization", "Mail order incentives"],
        implementation: "6-month rollout with clinical review",
      },
      {
        opportunity: "Network Steerage",
        annual_impact: "$3.8M savings",
        strategies: ["Center of Excellence program", "Tiered network design", "Quality-based referrals", "Price transparency tools"],
        implementation: "12-month phased approach",
      },
      {
        opportunity: "Utilization Management",
        annual_impact: "$2.9M savings",
        strategies: ["Pre-authorization automation", "Concurrent review", "Discharge planning", "Alternative site of care"],
        implementation: "Ongoing optimization",
      },
      {
        opportunity: "Vendor Performance",
        annual_impact: "$1.7M savings",
        strategies: ["Fee schedule negotiations", "Penalty clauses for SLA misses", "Rebate optimization", "Contract consolidation"],
        implementation: "Annual renewal cycle",
      },
    ],
  };

  const analyticsCapabilities = [
    {
      capability: "Predictive Modeling",
      description: "Machine learning algorithms forecast claim trends, cost drivers, and member risk profiles",
      features: ["12-month cost projections", "High-risk member identification", "Utilization forecasting", "Trend analysis"],
      accuracy: "92.7% prediction accuracy",
      icon: Brain,
    },
    {
      capability: "Real-Time Dashboards",
      description: "Executive dashboards with drill-down capabilities for immediate insights and action",
      features: ["Live claim processing metrics", "Cost trend visualization", "Member utilization patterns", "Vendor performance tracking"],
      accuracy: "<5 minute data latency",
      icon: BarChart3,
    },
    {
      capability: "Anomaly Detection",
      description: "AI-powered identification of unusual patterns, potential fraud, and billing errors",
      features: ["Automated fraud alerts", "Duplicate claim detection", "Billing error identification", "Provider outlier analysis"],
      accuracy: "99.2% fraud detection rate",
      icon: AlertTriangle,
    },
    {
      capability: "Benchmarking Engine",
      description: "Compare performance against industry standards, peer groups, and historical baselines",
      features: ["Industry comparisons", "Peer group analysis", "Historical trending", "Regional variations"],
      accuracy: "500K+ employer database",
      icon: Target,
    },
  ];

  const claimsCaseStudy = {
    client: "Healthcare System - 12,000 Employees",
    challenge: "Rising claims costs ($87M annually, +14% YoY), high ER utilization (12.4 per 1000), and 89% generic dispensing rate below industry standards",
    solution: "Comprehensive claims analytics platform with predictive modeling, utilization management, and pharmacy optimization",
    timeline: "18-month implementation with quarterly optimizations",
    results: [
      { metric: "Total Claims Costs", value: "$72.3M", change: "-16.9% reduction" },
      { metric: "ER Utilization", value: "7.1 per 1000", change: "-42.7% reduction" },
      { metric: "Generic Dispensing", value: "94.2%", change: "+5.2 percentage points" },
      { metric: "Claims Processing Time", value: "3.4 days", change: "-4.8 days improvement" },
      { metric: "Member Satisfaction", value: "96.3%", change: "+12.7 points increase" },
      { metric: "ROI", value: "427%", change: "$14.7M net savings" },
    ],
  };

  const dataPoints = [
    { label: "Claims Processed", value: "2.4M", period: "annually" },
    { label: "Average Processing Time", value: "4.2 days", period: "vs 7.8 industry" },
    { label: "Payment Accuracy", value: "99.4%", period: "first-time accuracy" },
    { label: "Fraud Prevention", value: "$8.4M", period: "prevented annually" },
  ];

  return (
    <>
      <SEO
        title="Claims Analytics & Cost Management | SiriusB iQ"
        description="Advanced claims analytics platform with 99.4% payment accuracy, $8.4M fraud prevention, and 16.9% cost reduction through predictive modeling and utilization management."
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
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl" />
                <div className="relative">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-purple-500/30">
                      <Activity className="w-12 h-12 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-purple-400 font-semibold mb-1">Advanced Analytics</p>
                      <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                        Claims Analytics & Cost Management
                      </h1>
                    </div>
                  </div>
                  <p className="text-xl md:text-2xl text-gray-300 max-w-4xl">
                    Transform claims data into actionable insights with AI-powered analytics, predictive modeling, and real-time cost optimization—delivering measurable savings while improving member experiences.
                  </p>
                </div>
              </motion.div>

              {/* Key Metrics */}
              <div className="grid md:grid-cols-4 gap-6 mt-12">
                {dataPoints.map((metric, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-purple-500/50 transition-colors"
                  >
                    <Activity className="w-8 h-8 text-purple-400 mb-3" />
                    <div className="text-3xl font-bold mb-1">{metric.value}</div>
                    <div className="text-sm text-gray-400">{metric.label}</div>
                    <div className="text-xs text-purple-400 mt-1">{metric.period}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Claims Intelligence Tabs */}
          <section className="px-4 mb-20">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Claims Intelligence</h2>
              
              <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
                {["patterns", "efficiency", "optimization"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
                      activeTab === tab
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                        : "bg-gray-800 text-gray-400 hover:text-white"
                    }`}
                  >
                    {tab === "patterns" ? "Claims Patterns" : tab === "efficiency" ? "Processing Efficiency" : "Cost Optimization"}
                  </button>
                ))}
              </div>

              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {activeTab === "patterns" && claimsMetrics.patterns.map((pattern, index) => (
                  <div key={index} className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-purple-500/50 transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-grow">
                        <h3 className="text-2xl font-bold mb-2">{pattern.pattern}</h3>
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center gap-3">
                            <Users className="w-5 h-5 text-blue-400" />
                            <span className="text-gray-400">{pattern.prevalence}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <DollarSign className="w-5 h-5 text-green-400" />
                            <span className="text-gray-400">{pattern.costImpact}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-4 rounded-xl bg-black/50 border border-gray-800">
                        <p className="text-sm text-gray-500 mb-3 font-semibold">Key Trends</p>
                        <div className="space-y-2">
                          {pattern.trends.map((trend, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                              <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                              {trend}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="p-4 rounded-xl bg-black/50 border border-gray-800">
                        <p className="text-sm text-gray-500 mb-2 font-semibold">Intervention Strategy</p>
                        <p className="text-green-400 font-semibold">{pattern.intervention}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {activeTab === "efficiency" && claimsMetrics.efficiency.map((metric, index) => (
                  <div key={index} className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-purple-500/50 transition-all">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-2xl font-bold mb-4">{metric.metric}</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 rounded-lg bg-black/50">
                            <span className="text-gray-400">Current Performance</span>
                            <span className="text-2xl font-bold text-green-400">{metric.current}</span>
                          </div>
                          <div className="flex items-center justify-between p-3 rounded-lg bg-black/50">
                            <span className="text-gray-400">Industry Benchmark</span>
                            <span className="text-lg text-gray-500">{metric.benchmark}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-3">Improvement Strategy</p>
                        <p className="text-purple-400 font-semibold mb-4">{metric.improvement}</p>
                        <div className="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/30">
                          <p className="text-sm text-gray-400 mb-1">Measurable Impact</p>
                          <p className="text-xl font-bold text-green-400">{metric.impact}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {activeTab === "optimization" && claimsMetrics.optimization.map((opp, index) => (
                  <div key={index} className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-purple-500/50 transition-all">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">{opp.opportunity}</h3>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-5 h-5 text-green-400" />
                          <span className="text-2xl font-bold text-green-400">{opp.annual_impact}</span>
                          <span className="text-gray-400">potential annual savings</span>
                        </div>
                      </div>
                      <span className="px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-400 font-semibold text-sm whitespace-nowrap">
                        {opp.implementation}
                      </span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm text-gray-500 mb-3 font-semibold">Optimization Strategies</p>
                        <div className="space-y-2">
                          {opp.strategies.map((strategy, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                              <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                              {strategy}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="p-4 rounded-xl bg-black/50 border border-gray-800">
                        <div className="flex items-center gap-2 mb-3">
                          <Clock className="w-5 h-5 text-blue-400" />
                          <p className="text-sm text-gray-500 font-semibold">Implementation Timeline</p>
                        </div>
                        <p className="text-gray-300">{opp.implementation}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Analytics Capabilities */}
          <section className="px-4 mb-20">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12">Advanced Analytics Capabilities</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {analyticsCapabilities.map((capability, index) => {
                  const Icon = capability.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-purple-500/50 transition-all"
                    >
                      <Icon className="w-10 h-10 text-purple-400 mb-4" />
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-2xl font-bold">{capability.capability}</h3>
                        <span className="px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-sm font-semibold whitespace-nowrap ml-3">
                          {capability.accuracy}
                        </span>
                      </div>
                      <p className="text-gray-400 mb-6">{capability.description}</p>
                      <div className="space-y-2">
                        {capability.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                            <Zap className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                            {feature}
                          </div>
                        ))}
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
              <h2 className="text-3xl md:text-4xl font-bold mb-12">Success Story</h2>
              <div className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-gray-700">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-purple-500/20">
                    <Target className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-bold">{claimsCaseStudy.client}</h3>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-8">
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Challenge</p>
                    <p className="text-gray-300">{claimsCaseStudy.challenge}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Solution</p>
                    <p className="text-gray-300">{claimsCaseStudy.solution}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Timeline</p>
                    <p className="text-gray-300">{claimsCaseStudy.timeline}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-4">Measurable Results</p>
                  <div className="grid md:grid-cols-3 gap-6">
                    {claimsCaseStudy.results.map((result, index) => (
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
                className="p-12 rounded-3xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-purple-500/30"
              >
                <Activity className="w-16 h-16 text-purple-400 mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Transform Claims Data into Strategic Insights
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Leverage AI-powered analytics to reduce costs, prevent fraud, and improve member satisfaction
                </p>
                <Link href="/request-demo">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-semibold text-lg flex items-center gap-2 mx-auto"
                  >
                    Schedule Analytics Demo
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