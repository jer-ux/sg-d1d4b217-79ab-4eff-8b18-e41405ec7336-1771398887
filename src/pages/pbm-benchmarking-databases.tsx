import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Database, TrendingUp, Shield, DollarSign, Pill, Users, BarChart3, AlertTriangle, CheckCircle2, Activity, FileText, Target, Award, Globe, Lock, Brain } from "lucide-react";
import { ExpertConsultationScheduler } from "@/components/ExpertConsultationScheduler";

export default function PBMBenchmarkingDatabases() {
  const databases = [
    {
      category: "Drug Pricing Benchmarks",
      icon: DollarSign,
      color: "from-green-500 to-emerald-600",
      databases: [
        {
          name: "NADAC (National Average Drug Acquisition Cost)",
          provider: "CMS",
          updateFrequency: "Weekly",
          coverage: "45,000+ NDCs",
          description: "Federal survey-based retail pharmacy acquisition costs",
          use_cases: ["Contract pricing validation", "MAC list verification", "Spread pricing detection"],
        },
        {
          name: "AWP (Average Wholesale Price)",
          provider: "First Databank / Medispan",
          updateFrequency: "Monthly",
          coverage: "200,000+ products",
          description: "Industry-standard wholesale pricing benchmark",
          use_cases: ["Traditional reimbursement", "Historical comparisons", "AWP-to-cost spreads"],
        },
        {
          name: "WAC (Wholesale Acquisition Cost)",
          provider: "First Databank / Medispan",
          updateFrequency: "Real-time",
          coverage: "All FDA-approved drugs",
          description: "Manufacturer list price to wholesalers",
          use_cases: ["Direct purchasing", "340B pricing", "Manufacturer negotiations"],
        },
        {
          name: "ASP (Average Sales Price)",
          provider: "CMS",
          updateFrequency: "Quarterly",
          coverage: "Medicare Part B drugs",
          description: "Volume-weighted manufacturer sales prices",
          use_cases: ["Medicare reimbursement", "Buy-and-bill pricing", "Medical benefit drugs"],
        },
        {
          name: "MAC (Maximum Allowable Cost)",
          provider: "Various PBMs",
          updateFrequency: "Variable",
          coverage: "Generic drugs",
          description: "PBM-specific maximum reimbursement rates",
          use_cases: ["Generic pricing", "Pharmacy reimbursement", "Contract negotiations"],
        },
        {
          name: "FUL (Federal Upper Limit)",
          provider: "CMS",
          updateFrequency: "Quarterly",
          coverage: "Multi-source generics",
          description: "Medicaid maximum reimbursement limits",
          use_cases: ["Medicaid pricing", "Public sector contracts", "Cost containment"],
        },
      ],
    },
    {
      category: "Rebate & Manufacturer Benchmarks",
      icon: TrendingUp,
      color: "from-purple-500 to-violet-600",
      databases: [
        {
          name: "SSR Health Rebate Database",
          provider: "SSR Health",
          updateFrequency: "Quarterly",
          coverage: "1,000+ drug products",
          description: "Market-based manufacturer rebate estimates",
          use_cases: ["Rebate negotiations", "Formulary positioning", "Market intelligence"],
        },
        {
          name: "46brooklyn Drug Price Dashboard",
          provider: "46brooklyn Research",
          updateFrequency: "Monthly",
          coverage: "All Medicaid drugs",
          description: "Public Medicaid rebate and pricing data",
          use_cases: ["Market transparency", "Pricing trends", "Public sector benchmarks"],
        },
        {
          name: "Medicare Part D Pricing",
          provider: "CMS",
          updateFrequency: "Annual",
          coverage: "All Part D drugs",
          description: "Medicare negotiated pricing and rebates",
          use_cases: ["Part D benchmarking", "Senior benefit design", "Federal contracting"],
        },
        {
          name: "Manufacturer Gross-to-Net",
          provider: "IQVIA / Symphony",
          updateFrequency: "Quarterly",
          coverage: "Top 500 brands",
          description: "Aggregate manufacturer rebate analytics",
          use_cases: ["Rebate forecasting", "Market positioning", "Financial modeling"],
        },
      ],
    },
    {
      category: "Clinical Utilization Benchmarks",
      icon: Activity,
      color: "from-blue-500 to-cyan-600",
      databases: [
        {
          name: "IQVIA Prescription Data",
          provider: "IQVIA",
          updateFrequency: "Weekly",
          coverage: "92% of US prescriptions",
          description: "Comprehensive prescription claims and trends",
          use_cases: ["Utilization management", "Trend analysis", "Therapeutic substitution"],
        },
        {
          name: "Symphony Health PlanIQ",
          provider: "Symphony Health",
          updateFrequency: "Monthly",
          coverage: "300M+ patients",
          description: "Longitudinal patient claims and utilization",
          use_cases: ["Member profiling", "Disease management", "Cost modeling"],
        },
        {
          name: "CMS Chronic Conditions Data",
          provider: "CMS",
          updateFrequency: "Annual",
          coverage: "Medicare & Medicaid",
          description: "Chronic disease prevalence and utilization",
          use_cases: ["Population health", "Risk adjustment", "Disease burden analysis"],
        },
        {
          name: "HEDIS Pharmacy Measures",
          provider: "NCQA",
          updateFrequency: "Annual",
          coverage: "Quality metrics",
          description: "Medication adherence and quality benchmarks",
          use_cases: ["Quality reporting", "Star ratings", "Performance improvement"],
        },
      ],
    },
    {
      category: "Specialty Pharmacy Benchmarks",
      icon: Pill,
      color: "from-rose-500 to-pink-600",
      databases: [
        {
          name: "Magellan Rx Specialty Trend",
          provider: "Magellan Rx",
          updateFrequency: "Quarterly",
          coverage: "Specialty drugs",
          description: "Specialty drug trend and forecasting",
          use_cases: ["Specialty management", "Budget planning", "Utilization control"],
        },
        {
          name: "Specialty Pharmacy Network Data",
          provider: "Various",
          updateFrequency: "Monthly",
          coverage: "SP providers",
          description: "Specialty pharmacy performance metrics",
          use_cases: ["Network optimization", "Provider selection", "Cost comparison"],
        },
        {
          name: "Biosimilar Adoption Rates",
          provider: "IQVIA / Cardinal",
          updateFrequency: "Monthly",
          coverage: "Biosimilar products",
          description: "Market penetration and switching patterns",
          use_cases: ["Formulary strategy", "Cost savings", "Market dynamics"],
        },
        {
          name: "Rare Disease Drug Database",
          provider: "GlobalData / Evaluate",
          updateFrequency: "Quarterly",
          coverage: "Orphan drugs",
          description: "Rare disease treatment patterns and costs",
          use_cases: ["Stop-loss management", "Outlier analysis", "Budget reserves"],
        },
      ],
    },
    {
      category: "Network & Pharmacy Benchmarks",
      icon: Globe,
      color: "from-orange-500 to-amber-600",
      databases: [
        {
          name: "PSAO Network Performance",
          provider: "Various PSAOs",
          updateFrequency: "Monthly",
          coverage: "Independent pharmacies",
          description: "PSAO network reimbursement and performance",
          use_cases: ["Network design", "Pharmacy selection", "Cost management"],
        },
        {
          name: "Chain Pharmacy Performance",
          provider: "Chain HQ data",
          updateFrequency: "Real-time",
          coverage: "Major chains",
          description: "National chain pharmacy metrics",
          use_cases: ["Preferred network", "Contract negotiations", "Quality scores"],
        },
        {
          name: "Mail Order Performance",
          provider: "PBM vendors",
          updateFrequency: "Monthly",
          coverage: "Mail service",
          description: "Mail order utilization and savings",
          use_cases: ["Channel optimization", "Member engagement", "Cost comparison"],
        },
        {
          name: "340B Covered Entity Database",
          provider: "HRSA",
          updateFrequency: "Quarterly",
          coverage: "340B entities",
          description: "340B-eligible facilities and pricing",
          use_cases: ["Contract pharmacy", "Duplicate discounts", "Compliance"],
        },
      ],
    },
    {
      category: "Plan Design Benchmarks",
      icon: FileText,
      color: "from-indigo-500 to-purple-600",
      databases: [
        {
          name: "KFF Employer Health Benefits Survey",
          provider: "Kaiser Family Foundation",
          updateFrequency: "Annual",
          coverage: "Employer plans",
          description: "National employer benefit design trends",
          use_cases: ["Plan design", "Market positioning", "Cost-sharing strategies"],
        },
        {
          name: "Formulary Intelligence Database",
          provider: "MMIT / Managed Markets Insight",
          updateFrequency: "Monthly",
          coverage: "2,000+ payers",
          description: "Payer formulary positions and restrictions",
          use_cases: ["Formulary design", "Tier placement", "Competitive analysis"],
        },
        {
          name: "Prior Authorization Benchmark",
          provider: "CoverMyMeds / Surescripts",
          updateFrequency: "Quarterly",
          coverage: "PA requirements",
          description: "Prior authorization requirements and approval rates",
          use_cases: ["UM program design", "Administrative burden", "Workflow optimization"],
        },
        {
          name: "Step Therapy Effectiveness",
          provider: "Academy of Managed Care Pharmacy",
          updateFrequency: "Annual",
          coverage: "Clinical programs",
          description: "Step therapy protocol outcomes",
          use_cases: ["Clinical policy", "Cost-effectiveness", "Quality of care"],
        },
      ],
    },
    {
      category: "Fraud, Waste & Abuse Benchmarks",
      icon: Shield,
      color: "from-red-500 to-rose-600",
      databases: [
        {
          name: "OIG Exclusion Database",
          provider: "HHS Office of Inspector General",
          updateFrequency: "Monthly",
          coverage: "Excluded providers",
          description: "Federal healthcare exclusion list",
          use_cases: ["Provider screening", "Compliance", "Risk management"],
        },
        {
          name: "DEA Controlled Substance Registry",
          provider: "Drug Enforcement Administration",
          updateFrequency: "Real-time",
          coverage: "Prescribers & dispensers",
          description: "DEA registrations and violations",
          use_cases: ["Prescriber validation", "Controlled substance monitoring", "Fraud detection"],
        },
        {
          name: "PDMP (Prescription Drug Monitoring)",
          provider: "State Boards of Pharmacy",
          updateFrequency: "Real-time",
          coverage: "State-level",
          description: "Controlled substance dispensing history",
          use_cases: ["Opioid management", "Doctor shopping", "Diversion prevention"],
        },
        {
          name: "False Claims Database",
          provider: "DOJ / CMS",
          updateFrequency: "Quarterly",
          coverage: "Settled cases",
          description: "Historical fraud patterns and settlements",
          use_cases: ["Risk modeling", "Audit focus", "Pattern detection"],
        },
      ],
    },
    {
      category: "Quality & Outcomes Benchmarks",
      icon: Award,
      color: "from-teal-500 to-cyan-600",
      databases: [
        {
          name: "Medicare Star Ratings",
          provider: "CMS",
          updateFrequency: "Annual",
          coverage: "Medicare Advantage & Part D",
          description: "Quality and performance star ratings",
          use_cases: ["Quality improvement", "Bonus payments", "Member retention"],
        },
        {
          name: "PDC (Proportion of Days Covered)",
          provider: "PQA / NCQA",
          updateFrequency: "Continuous",
          coverage: "Adherence measures",
          description: "Medication adherence benchmarks",
          use_cases: ["Quality reporting", "MTM programs", "Member engagement"],
        },
        {
          name: "Real-World Evidence Databases",
          provider: "Flatiron / Optum Labs",
          updateFrequency: "Continuous",
          coverage: "EHR + claims",
          description: "Clinical outcomes and effectiveness",
          use_cases: ["Value-based contracts", "Comparative effectiveness", "Outcomes research"],
        },
        {
          name: "Member Satisfaction (CAHPS)",
          provider: "NCQA / AHRQ",
          updateFrequency: "Annual",
          coverage: "Health plans",
          description: "Consumer assessment of healthcare surveys",
          use_cases: ["Member experience", "Quality ratings", "Service improvement"],
        },
      ],
    },
    {
      category: "Financial & Actuarial Benchmarks",
      icon: BarChart3,
      color: "from-emerald-500 to-green-600",
      databases: [
        {
          name: "Milliman Medical Index",
          provider: "Milliman",
          updateFrequency: "Annual",
          coverage: "Commercial insurance",
          description: "Typical family healthcare costs",
          use_cases: ["Cost projections", "Budget planning", "Trend analysis"],
        },
        {
          name: "SOA Health Plan Cost Trends",
          provider: "Society of Actuaries",
          updateFrequency: "Annual",
          coverage: "Actuarial data",
          description: "Healthcare cost trend factors",
          use_cases: ["Rate development", "Reserving", "Financial forecasting"],
        },
        {
          name: "OptumRx Pharmacy Trend Report",
          provider: "OptumRx",
          updateFrequency: "Annual",
          coverage: "Pharmacy trends",
          description: "Comprehensive pharmacy trend analysis",
          use_cases: ["Budgeting", "Strategic planning", "Cost management"],
        },
        {
          name: "Express Scripts Drug Trend Report",
          provider: "Express Scripts (Evernorth)",
          updateFrequency: "Annual",
          coverage: "Commercial & Medicare",
          description: "Pharmacy benefit trend drivers",
          use_cases: ["Financial planning", "Trend forecasting", "Cost containment"],
        },
      ],
    },
    {
      category: "AI & Predictive Analytics",
      icon: Brain,
      color: "from-violet-500 to-fuchsia-600",
      databases: [
        {
          name: "Kincaid IQ Predictive Models",
          provider: "SiriusB iQ (Proprietary)",
          updateFrequency: "Real-time",
          coverage: "All data sources",
          description: "AI-powered predictive pharmacy analytics",
          use_cases: ["Trend forecasting", "Risk stratification", "Cost optimization"],
        },
        {
          name: "Machine Learning Drug Utilization",
          provider: "Various vendors",
          updateFrequency: "Continuous",
          coverage: "Claims + clinical",
          description: "ML-driven utilization predictions",
          use_cases: ["Intervention targeting", "Budget accuracy", "Member profiling"],
        },
        {
          name: "NLP Clinical Guidelines Database",
          provider: "AI vendors",
          updateFrequency: "Continuous",
          coverage: "Clinical literature",
          description: "Natural language processing of guidelines",
          use_cases: ["Formulary decisions", "Clinical policy", "Evidence review"],
        },
      ],
    },
  ];

  const stats = [
    { label: "Benchmark Databases", value: "75+", icon: Database },
    { label: "Data Points", value: "500M+", icon: BarChart3 },
    { label: "Update Frequency", value: "Real-time", icon: Activity },
    { label: "Coverage", value: "100%", icon: Globe },
  ];

  return (
    <>
      <SEO
        title="PBM Intelligence Benchmarking Databases | Comprehensive Pharmacy Data"
        description="Access 75+ pharmacy benefit management benchmarking databases covering drug pricing, rebates, utilization, quality, and financial metrics for evidence-based decision making."
      />

      <Nav />

      <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 mb-6">
              <Database className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-semibold text-purple-400">Complete Intelligence Platform</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              PBM Intelligence
              <br />
              Benchmarking Databases
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
              Comprehensive access to 75+ industry-leading benchmarking databases covering drug pricing, 
              clinical utilization, rebates, quality metrics, and financial analytics for evidence-based pharmacy benefit management.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/request-demo">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-8 py-6">
                  Request Database Access
                </Button>
              </Link>
              <Link href="/solutions/rx-defense">
                <Button variant="outline" className="border-gray-700 hover:border-purple-500 text-lg px-8 py-6">
                  Explore Rx Defense
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 px-4 border-y border-gray-800 bg-black/50">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} className="text-center">
                    <Icon className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                    <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-gray-400">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Database Categories */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto space-y-16">
            {databases.map((category, catIdx) => {
              const CategoryIcon = category.icon;
              return (
                <div key={catIdx}>
                  <div className="flex items-center gap-4 mb-8">
                    <div className={`p-4 rounded-2xl bg-gradient-to-r ${category.color}`}>
                      <CategoryIcon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold">{category.category}</h2>
                      <p className="text-gray-400">{category.databases.length} databases available</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {category.databases.map((db, dbIdx) => (
                      <Card key={dbIdx} className="p-6 bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-all">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-grow">
                            <h3 className="text-xl font-bold mb-1">{db.name}</h3>
                            <p className="text-sm text-gray-400">{db.provider}</p>
                          </div>
                          <div className="flex gap-2">
                            <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-400 text-xs font-semibold whitespace-nowrap">
                              {db.updateFrequency}
                            </span>
                          </div>
                        </div>

                        <p className="text-gray-300 mb-4">{db.description}</p>

                        <div className="mb-4">
                          <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                            <Database className="w-4 h-4" />
                            Coverage: {db.coverage}
                          </div>
                        </div>

                        <div>
                          <p className="text-xs font-semibold text-gray-500 mb-2">Use Cases:</p>
                          <div className="space-y-1">
                            {db.use_cases.map((useCase, ucIdx) => (
                              <div key={ucIdx} className="flex items-start gap-2 text-sm text-gray-400">
                                <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                {useCase}
                              </div>
                            ))}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Integration Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-5xl mx-auto text-center">
            <Lock className="w-16 h-16 text-purple-400 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-6">Enterprise-Grade Data Integration</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Our platform seamlessly integrates all 75+ benchmarking databases into a unified intelligence layer, 
              providing real-time analytics, AI-powered insights, and automated reporting for your pharmacy benefit program.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="p-6 bg-gray-900/50 border-gray-800">
                <Target className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Unified Dashboard</h3>
                <p className="text-gray-400">Single pane of glass for all benchmarking data</p>
              </Card>
              <Card className="p-6 bg-gray-900/50 border-gray-800">
                <Activity className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Real-Time Updates</h3>
                <p className="text-gray-400">Automatic data refresh and anomaly detection</p>
              </Card>
              <Card className="p-6 bg-gray-900/50 border-gray-800">
                <Brain className="w-12 h-12 text-pink-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">AI-Powered Insights</h3>
                <p className="text-gray-400">Predictive analytics and trend forecasting</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Expert Consultation */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <ExpertConsultationScheduler solutionArea="PBM Benchmarking Databases" variant="full" />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Access the Most Comprehensive PBM Intelligence?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join leading health plans, TPAs, and employers leveraging our unified benchmarking platform
            </p>
            <Link href="/request-demo">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-12 py-6">
                Request Demo & Pricing
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}