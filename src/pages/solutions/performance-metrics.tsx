import { motion } from "framer-motion";
import Link from "next/link";
import { BarChart3, Target, TrendingUp, ArrowRight, CheckCircle2, Activity, Zap, PieChart, LineChart, Calendar, Users, DollarSign } from "lucide-react";
import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function PerformanceMetrics() {
  const [activeTab, setActiveTab] = useState("kpis");

  const performanceFramework = {
    kpis: [
      {
        category: "Financial Performance",
        metrics: [
          { name: "Medical Loss Ratio (MLR)", definition: "Claims / Premium", target: "80-85%", benchmark: "Industry: 83.2%" },
          { name: "Per Member Per Month (PMPM) Cost", definition: "Total Claims / Member Months", target: "Trend < 8%", benchmark: "National: $542" },
          { name: "Per Employee Per Year (PEPY)", definition: "Total Cost / Covered Lives", target: "Budget variance < 5%", benchmark: "Varies by industry" },
          { name: "Large Claim Pooling Point", definition: "Individual claim threshold", target: "$250K-$350K", benchmark: "Median: $275K" },
          { name: "Stop-Loss Attachment", definition: "Aggregate or specific limit", target: "125% of expected", benchmark: "Industry: 120-130%" },
        ],
      },
      {
        category: "Utilization Metrics",
        metrics: [
          { name: "Hospital Admits per 1,000", definition: "Inpatient admissions", target: "< 60 per 1,000", benchmark: "Commercial: 52.3" },
          { name: "Average Length of Stay (ALOS)", definition: "Days per admission", target: "< 4.5 days", benchmark: "National: 4.2 days" },
          { name: "Emergency Room Visits", definition: "ER utilization rate", target: "< 300 per 1,000", benchmark: "Commercial: 287" },
          { name: "Specialty Drug Utilization", definition: "% of Rx spend on specialty", target: "< 45%", benchmark: "Industry: 48%" },
          { name: "Generic Dispensing Rate", definition: "Generic fill %", target: "> 85%", benchmark: "National: 84.5%" },
        ],
      },
      {
        category: "Quality & Outcomes",
        metrics: [
          { name: "HEDIS Composite Score", definition: "Quality measure performance", target: "> 75th percentile", benchmark: "NCQA benchmarks" },
          { name: "Preventive Care Completion", definition: "Annual wellness participation", target: "> 65%", benchmark: "Industry: 58%" },
          { name: "Chronic Disease Management", definition: "Program engagement rate", target: "> 40%", benchmark: "Best practice: 45%" },
          { name: "Readmission Rate", definition: "30-day hospital readmits", target: "< 12%", benchmark: "Medicare: 14.6%" },
          { name: "Patient Satisfaction (CAHPS)", definition: "Member experience score", target: "> 4.2/5.0", benchmark: "Commercial: 4.0" },
        ],
      },
      {
        category: "Administrative Efficiency",
        metrics: [
          { name: "Claims Processing Time", definition: "Days to adjudicate", target: "< 10 days", benchmark: "Industry: 12 days" },
          { name: "Clean Claim Rate", definition: "% without errors", target: "> 95%", benchmark: "Best practice: 96%" },
          { name: "Appeals Rate", definition: "% of claims appealed", target: "< 2%", benchmark: "Industry: 2.3%" },
          { name: "Member Services Call Abandon", definition: "% calls not answered", target: "< 5%", benchmark: "Industry: 6.8%" },
          { name: "Administrative Cost Ratio", definition: "Admin expense / Premium", target: "< 15%", benchmark: "Self-funded: 12-18%" },
        ],
      },
    ],
    dashboards: [
      {
        name: "Executive Scorecard",
        description: "High-level KPIs for C-suite and board reporting",
        components: [
          "Year-to-date financial summary with budget variance",
          "Loss ratio trending with 12-month rolling average",
          "Top 10 cost drivers and intervention status",
          "Quality metrics vs industry benchmarks",
          "Risk-adjusted outcome measures",
          "Vendor performance scorecards",
        ],
        frequency: "Monthly with quarterly deep dives",
        stakeholders: "CFO, CHRO, Benefits Committee",
      },
      {
        name: "Operational Dashboard",
        description: "Day-to-day management metrics for benefits team",
        components: [
          "Daily claims volume and processing metrics",
          "Real-time eligibility and enrollment status",
          "Member inquiry volume and resolution time",
          "Vendor SLA compliance tracking",
          "Urgent issues and escalations queue",
          "Cost accumulation vs forecast",
        ],
        frequency: "Daily/Weekly monitoring",
        stakeholders: "Benefits Manager, HR Operations",
      },
      {
        name: "Clinical Analytics",
        description: "Deep-dive utilization and quality reporting",
        components: [
          "Service category drill-down (inpatient, outpatient, Rx)",
          "Provider cost and quality performance",
          "Disease prevalence and management outcomes",
          "High-cost claimant analysis",
          "Pharmacy utilization by therapeutic class",
          "Preventive care gaps and opportunities",
        ],
        frequency: "Monthly with ad-hoc analysis",
        stakeholders: "Clinical Team, Care Management",
      },
      {
        name: "Predictive Analytics",
        description: "Forward-looking risk and trend forecasting",
        components: [
          "12-month claims projection with confidence intervals",
          "Risk score trending and high-risk identification",
          "Emerging condition surveillance",
          "Cost trend drivers and mitigation scenarios",
          "ROI modeling for proposed interventions",
          "Renewal projection and strategy development",
        ],
        frequency: "Quarterly with annual planning",
        stakeholders: "Actuarial, Strategic Planning",
      },
    ],
    reporting: [
      {
        report: "Monthly Financial Package",
        contents: [
          "Executive summary (1-page)",
          "Claims vs budget variance analysis",
          "Large claim report (> $50K)",
          "PMPM trending by line of coverage",
          "Reserve adequacy assessment",
          "Year-end projection",
        ],
        distribution: "CFO, CHRO, Finance Team",
        timing: "15th of following month",
      },
      {
        report: "Quarterly Business Review (QBR)",
        contents: [
          "Performance against strategic objectives",
          "Benchmark comparison to peer employers",
          "Vendor accountability scorecards",
          "Program ROI measurement",
          "Quality and outcomes trending",
          "Upcoming initiatives and timeline",
        ],
        distribution: "Executive Leadership, Board",
        timing: "30 days after quarter close",
      },
      {
        report: "Annual Renewal Analysis",
        contents: [
          "12-month experience summary",
          "Actuarial certification of rates",
          "Trend analysis and projection methodology",
          "Plan design alternatives and cost impact",
          "Vendor performance evaluation",
          "Strategic recommendations",
        ],
        distribution: "Full Benefits Committee",
        timing: "90 days pre-renewal",
      },
    ],
  };

  const metricsTools = [
    {
      tool: "Real-Time Analytics Platform",
      description: "Live performance monitoring with drill-down capabilities",
      features: [
        "Automated data ingestion from all sources (TPA, PBM, stop-loss)",
        "Interactive visualizations with export functionality",
        "Customizable alert thresholds and notifications",
        "Mobile access for on-the-go decision making",
        "Role-based permissions and data security",
      ],
      technology: "Power BI, Tableau, or custom web application",
      icon: Activity,
    },
    {
      tool: "Benchmark Intelligence",
      description: "Comparative performance against industry peers",
      features: [
        "Regional and national normative databases",
        "Industry-specific peer group selection",
        "Demographic and risk adjustment",
        "Best practice identification and case studies",
        "Gap analysis with improvement priorities",
      ],
      sources: "Mercer, Willis Towers Watson, IFEBP surveys",
      icon: Target,
    },
    {
      tool: "Predictive Modeling Engine",
      description: "AI-driven forecasting and scenario planning",
      features: [
        "Machine learning algorithms on historical data",
        "Monte Carlo simulation for range of outcomes",
        "Sensitivity analysis for key assumptions",
        "What-if modeling for benefit design changes",
        "Renewal projection with confidence bands",
      ],
      accuracy: "±3-5% at 80% confidence level",
      icon: TrendingUp,
    },
    {
      tool: "Vendor Performance Tracking",
      description: "SLA compliance and accountability measurement",
      features: [
        "Automated SLA monitoring from vendor data feeds",
        "Balanced scorecard approach (finance, operations, service, quality)",
        "Financial performance guarantees tracking",
        "Member satisfaction survey integration",
        "Quarterly vendor scorecards",
      ],
      enforcement: "Financial penalties for non-compliance",
      icon: CheckCircle2,
    },
  ];

  const caseStudy = {
    client: "Healthcare System - 12,000 Employees",
    challenge: "Lacked comprehensive performance visibility, reactive decision-making, inconsistent vendor accountability, and difficulty demonstrating benefits ROI to leadership. Historical trend: 11.2% annually.",
    solution: "Implemented enterprise performance metrics platform with real-time dashboards, predictive analytics, and automated vendor scorecards",
    timeline: "9-month implementation with phased rollout",
    implementation: [
      {
        phase: "Phase 1: Foundation (Months 1-3)",
        deliverables: [
          "Data architecture design and ETL development",
          "KPI definition and target setting workshop",
          "Executive scorecard prototype and feedback",
          "Vendor data integration (TPA, PBM, stop-loss)",
        ],
      },
      {
        phase: "Phase 2: Build (Months 4-6)",
        deliverables: [
          "Full dashboard suite development",
          "Predictive modeling implementation",
          "Benchmark database integration",
          "User training and documentation",
        ],
      },
      {
        phase: "Phase 3: Launch (Months 7-9)",
        deliverables: [
          "Production deployment and go-live",
          "Monthly reporting cadence established",
          "Vendor performance reviews initiated",
          "Continuous improvement process",
        ],
      },
    ],
    results: [
      { metric: "Decision Cycle Time", value: "-68%", change: "From weeks to days" },
      { metric: "Data Accuracy", value: "99.3%", change: "From manual reconciliation" },
      { metric: "Vendor SLA Compliance", value: "96.8%", change: "+14.2 points" },
      { metric: "Executive Satisfaction", value: "4.7/5.0", change: "vs 2.9/5.0 baseline" },
      { metric: "Cost Trend Reduction", value: "7.4%", change: "From 11.2% annually" },
      { metric: "ROI on Analytics", value: "6.2:1", change: "$2.4M value delivered" },
    ],
  };

  const metrics = [
    { label: "Dashboards Deployed", value: "150+", icon: BarChart3 },
    { label: "Metrics Tracked", value: "500+", icon: Target },
    { label: "Data Accuracy", value: "99.5%", icon: CheckCircle2 },
    { label: "Avg Client ROI", value: "5.8:1", icon: DollarSign },
  ];

  return (
    <>
      <SEO
        title="Performance Metrics & Analytics | SiriusB iQ"
        description="Comprehensive performance monitoring with 500+ tracked metrics, 99.5% data accuracy, and 5.8:1 ROI through real-time dashboards and predictive analytics."
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
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-3xl blur-3xl" />
                <div className="relative">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-blue-500/30">
                      <BarChart3 className="w-12 h-12 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-blue-400 font-semibold mb-1">Data Intelligence</p>
                      <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                        Performance Metrics & Analytics
                      </h1>
                    </div>
                  </div>
                  <p className="text-xl md:text-2xl text-gray-300 max-w-4xl">
                    Transform data into actionable insights with comprehensive performance tracking, real-time dashboards, and predictive analytics that drive better benefit program decisions.
                  </p>
                </div>
              </motion.div>

              <div className="grid md:grid-cols-4 gap-6 mt-12">
                {metrics.map((metric, index) => {
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

          <section className="px-4 mb-20">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Performance Framework</h2>
              
              <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
                {["kpis", "dashboards", "reporting"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
                      activeTab === tab
                        ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                        : "bg-gray-800 text-gray-400 hover:text-white"
                    }`}
                  >
                    {tab === "kpis" ? "Key Metrics" : tab === "dashboards" ? "Dashboards" : "Standard Reports"}
                  </button>
                ))}
              </div>

              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {activeTab === "kpis" && performanceFramework.kpis.map((category, index) => (
                  <div key={index} className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-blue-500/50 transition-all">
                    <h3 className="text-2xl font-bold mb-6">{category.category}</h3>
                    <div className="space-y-4">
                      {category.metrics.map((metric, idx) => (
                        <div key={idx} className="grid md:grid-cols-4 gap-4 p-4 rounded-xl bg-black/30 border border-gray-800">
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Metric</p>
                            <p className="font-semibold text-blue-400">{metric.name}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Definition</p>
                            <p className="text-sm text-gray-300">{metric.definition}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Target</p>
                            <p className="text-sm font-semibold text-green-400">{metric.target}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Benchmark</p>
                            <p className="text-sm text-gray-300">{metric.benchmark}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {activeTab === "dashboards" && performanceFramework.dashboards.map((dashboard, index) => (
                  <div key={index} className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-blue-500/50 transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">{dashboard.name}</h3>
                        <p className="text-gray-400">{dashboard.description}</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <p className="text-sm font-semibold text-gray-500 mb-3">Dashboard Components</p>
                      <div className="grid md:grid-cols-2 gap-3">
                        {dashboard.components.map((component, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-sm text-gray-300 p-3 rounded-lg bg-black/30">
                            <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                            {component}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-black/50 border border-gray-800">
                        <p className="text-sm text-gray-500 mb-1">Update Frequency</p>
                        <p className="text-blue-400 font-semibold">{dashboard.frequency}</p>
                      </div>
                      <div className="p-4 rounded-xl bg-black/50 border border-gray-800">
                        <p className="text-sm text-gray-500 mb-1">Key Stakeholders</p>
                        <p className="text-blue-400 font-semibold">{dashboard.stakeholders}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {activeTab === "reporting" && performanceFramework.reporting.map((report, index) => (
                  <div key={index} className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-blue-500/50 transition-all">
                    <h3 className="text-2xl font-bold mb-6">{report.report}</h3>
                    
                    <div className="mb-6">
                      <p className="text-sm font-semibold text-gray-500 mb-3">Report Contents</p>
                      <div className="space-y-2">
                        {report.contents.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-black/50 border border-gray-800">
                        <p className="text-sm text-gray-500 mb-1">Distribution List</p>
                        <p className="text-blue-400 font-semibold">{report.distribution}</p>
                      </div>
                      <div className="p-4 rounded-xl bg-black/50 border border-gray-800">
                        <p className="text-sm text-gray-500 mb-1">Delivery Timing</p>
                        <p className="text-blue-400 font-semibold">{report.timing}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </section>

          <section className="px-4 mb-20">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12">Analytics Platform</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {metricsTools.map((tool, index) => {
                  const Icon = tool.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-blue-500/50 transition-all"
                    >
                      <Icon className="w-10 h-10 text-blue-400 mb-4" />
                      <h3 className="text-2xl font-bold mb-3">{tool.tool}</h3>
                      <p className="text-gray-400 mb-6">{tool.description}</p>
                      <div className="space-y-2 mb-6">
                        {tool.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                            <Zap className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                            {feature}
                          </div>
                        ))}
                      </div>
                      <div className="p-4 rounded-xl bg-black/50 border border-blue-900/50">
                        <p className="text-sm text-gray-500 mb-1">{tool.technology ? "Technology Stack" : tool.sources ? "Data Sources" : tool.accuracy ? "Forecast Accuracy" : "Enforcement"}</p>
                        <p className="text-blue-400 font-semibold text-sm">{tool.technology || tool.sources || tool.accuracy || tool.enforcement}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="px-4 mb-20">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12">Analytics Transformation Case Study</h2>
              <div className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-gray-700">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-blue-500/20">
                    <Target className="w-6 h-6 text-blue-400" />
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
                  <p className="text-sm text-gray-500 mb-4">Implementation Roadmap</p>
                  <div className="space-y-4">
                    {caseStudy.implementation.map((phase, index) => (
                      <div key={index} className="p-6 rounded-xl bg-black/50 border border-gray-800">
                        <h4 className="font-bold mb-3">{phase.phase}</h4>
                        <div className="grid md:grid-cols-2 gap-3">
                          {phase.deliverables.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                              <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-4">Business Impact</p>
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

          <section className="px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="p-12 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-blue-500/30"
              >
                <BarChart3 className="w-16 h-16 text-blue-400 mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Transform Your Benefits Data into Strategic Insights
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Get a complimentary analytics assessment and dashboard prototype
                </p>
                <Link href="/request-demo">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full text-white font-semibold text-lg flex items-center gap-2 mx-auto"
                  >
                    Request Analytics Assessment
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