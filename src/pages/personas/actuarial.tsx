import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { BarChart3, Calculator, TrendingUp, Target, Database, ArrowRight, CheckCircle2, Activity, Brain, LineChart, PieChart, Zap, Award, FileText, Users, Shield, AlertTriangle, DollarSign, Layers, Eye, Lock, GitBranch, Workflow } from "lucide-react";
import { motion } from "framer-motion";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";

const actuarialTools = [
  {
    icon: Database,
    title: "Raw Claims Data Access",
    description: "Claim-level data with NDC codes, fill dates, pharmacy IDs, days supply, and actual ingredient cost. Build your own trend models.",
    features: [
      "NDC-11 codes with therapeutic class mapping",
      "AWP, NADAC, ingredient cost, and spread calculations",
      "Utilization metrics: days supply, quantity dispensed",
      "Channel segmentation: retail, mail order, specialty",
      "Member demographics and risk adjustment factors"
    ],
    metrics: ["15M+ Claims", "240+ Attributes", "Daily Updates"]
  },
  {
    icon: Activity,
    title: "Trend Decomposition Engine",
    description: "Separate utilization, unit cost, and mix effects. Quantify impact of formulary changes, contract amendments, and population shifts.",
    features: [
      "Utilization effect analysis (Rx per member per month)",
      "Unit cost effect modeling ($ per prescription)",
      "Mix effect calculations (generic vs. brand shift)",
      "Interaction terms with confidence intervals",
      "Time series analysis with ARIMA and exponential smoothing"
    ],
    metrics: ["±0.3% Accuracy", "Quarterly Updates", "5-Year History"]
  },
  {
    icon: BarChart3,
    title: "Monte Carlo Simulation Suite",
    description: "10,000-trial simulations for pharmacy spend projections with specialty drug pipeline risk and rebate sensitivity analysis.",
    features: [
      "Specialty drug pipeline probability modeling",
      "Generic conversion timing with uncertainty bands",
      "Rebate pass-through sensitivity scenarios",
      "95% and 99% confidence interval calculations",
      "Value-at-Risk (VaR) and expected shortfall metrics"
    ],
    metrics: ["10K Trials", "95% CI", "Real-time"]
  },
  {
    icon: Target,
    title: "NADAC Benchmarking Platform",
    description: "Weekly-updated CMS NADAC pricing comparison to quantify spread and identify cost-reduction opportunities.",
    features: [
      "Weekly NADAC file integration from CMS",
      "NDC-level spread analysis and trending",
      "Generic vs. brand benchmark comparisons",
      "Cost-Plus model scenario planning",
      "Mark Cuban Cost Plus Drug comparison"
    ],
    metrics: ["Weekly Updates", "60K+ NDCs", "Real-time Spread"]
  },
  {
    icon: Brain,
    title: "Predictive Risk Modeling",
    description: "Machine learning models achieving 99.2% accuracy in predicting high-cost claimants 6-9 months in advance.",
    features: [
      "Gradient boosting and neural network ensembles",
      "240+ risk factors including pharmacy utilization patterns",
      "Explainable AI with feature importance rankings",
      "Real-time risk scoring with streaming data pipelines",
      "Cohort analysis and risk stratification"
    ],
    metrics: ["99.2% Accuracy", "6-9 Mo Forecast", "Real-time Scoring"]
  },
  {
    icon: LineChart,
    title: "Credibility-Weighted Analysis",
    description: "SOA-compliant credibility formulas for groups with limited claims experience, blending group and industry data.",
    features: [
      "Bühlmann credibility theory implementation",
      "Limited fluctuation credibility calculations",
      "Industry benchmark pooling by size and sector",
      "Partial credibility adjustments for small groups",
      "Confidence interval widening for low-credibility data"
    ],
    metrics: ["SOA Standards", "Industry Pooled", "Multi-Year"]
  }
];

const methodologyPillars = [
  {
    icon: Shield,
    title: "Professional Standards Compliance",
    description: "All analyses meet Society of Actuaries (SOA) and American Academy of Actuaries (AAA) professional standards.",
    details: [
      "Actuarial Standards of Practice (ASOPs) adherence",
      "Qualified actuaries (FSA, MAAA) validate all assumptions",
      "Documented methodology with assumption rationale",
      "Peer review process for all client deliverables"
    ]
  },
  {
    icon: Lock,
    title: "Data Security & Governance",
    description: "HIPAA-compliant infrastructure with SOC 2 Type II certification and role-based access controls.",
    details: [
      "End-to-end encryption for data in transit and at rest",
      "Granular access controls and audit logging",
      "Anonymization and de-identification workflows",
      "Annual third-party security audits and penetration testing"
    ]
  },
  {
    icon: GitBranch,
    title: "Version Control & Reproducibility",
    description: "Complete version history of all models, assumptions, and results for audit trail and reproducibility.",
    details: [
      "Git-based versioning for all analytical code",
      "Assumption registers with change tracking",
      "Deterministic random number generation for simulations",
      "Containerized execution environments for consistency"
    ]
  },
  {
    icon: Workflow,
    title: "API-First Architecture",
    description: "RESTful APIs and Python/R clients enable integration with your existing actuarial modeling workflows.",
    details: [
      "Comprehensive API documentation with OpenAPI spec",
      "Native Python and R client libraries",
      "Webhook support for event-driven integrations",
      "Batch processing endpoints for large data sets"
    ]
  }
];

const useCases = [
  {
    icon: TrendingUp,
    title: "Annual Rate Filing Preparation",
    scenario: "Actuarial team needs to file health insurance rates with state DOI, requiring trend analysis, risk adjustment, and assumption documentation.",
    solution: "Our platform provides trend decomposition, credibility-weighted experience rating, and automated SERFF filing preparation meeting all regulatory requirements.",
    outcomes: ["8 weeks → 3 days prep time", "Zero regulatory findings (4+ years)", "Automated compliance validation"]
  },
  {
    icon: PieChart,
    title: "Stop-Loss Premium Calculation",
    scenario: "Self-insured employer evaluating stop-loss coverage options needs accurate expected claim distributions and specific vs. aggregate premium quotes.",
    solution: "Monte Carlo simulations model claim distributions accounting for member demographics, historical experience, and industry benchmarks.",
    outcomes: ["95% confidence intervals", "Specific & aggregate pricing", "Scenario sensitivity analysis"]
  },
  {
    icon: AlertTriangle,
    title: "Pharmacy Trend Investigation",
    scenario: "CFO questions why pharmacy costs increased 18% YoY when PBM reported only 9% trend, needs independent validation.",
    solution: "Trend decomposition separates utilization, unit cost, and mix effects, with NADAC benchmarking revealing contract-driven inflation vs. medical trend.",
    outcomes: ["Identified $4.2M contract leakage", "Validated true 17.8% trend", "Quantified rebate shortfall"]
  },
  {
    icon: DollarSign,
    title: "Risk Pool Reserve Analysis",
    scenario: "Health plan needs to determine IBNR reserves and risk margin for annual financial statements, with actuarial certification required.",
    solution: "Claims development triangles, Bornhuetter-Ferguson method, and bootstrapping provide reserve point estimates with uncertainty quantification.",
    outcomes: ["ASC 944 compliant reserves", "Actuarial opinion letter", "95% confidence interval"]
  },
  {
    icon: Users,
    title: "Benefit Plan Design Modeling",
    scenario: "HR team evaluating plan design changes (e.g., increasing deductible from $1,500 to $2,500) needs cost and utilization impact projections.",
    solution: "Elasticity models calibrated to similar employer groups project member cost-sharing response and net employer cost impact.",
    outcomes: ["Projected $2.4M savings", "Utilization impact: -12%", "Member affordability analysis"]
  },
  {
    icon: Layers,
    title: "Medicare Advantage Bid Preparation",
    scenario: "Health plan preparing CMS MA bid needs accurate cost projections, risk adjustment, and margin analysis for competitive pricing.",
    solution: "Risk adjustment modeling (HCC/RxHCC), trend analysis, and competitive benchmarking support bid strategy and pricing decisions.",
    outcomes: ["Star Rating impact analysis", "Competitive position mapping", "Revenue optimization: $8.4M"]
  }
];

const comparisonTable = [
  {
    category: "Data Access",
    traditional: "Aggregated reports from PBM/carrier, 90-day lag",
    siriusb: "Claim-level data with daily updates and API access",
    advantage: "Real-time insights, build custom models"
  },
  {
    category: "Trend Analysis",
    traditional: "Single blended trend number, no decomposition",
    siriusb: "Utilization, unit cost, mix effects separated with CI",
    advantage: "Understand drivers, validate vendor claims"
  },
  {
    category: "Risk Modeling",
    traditional: "Static assumptions, limited scenario testing",
    siriusb: "Monte Carlo simulation with 10K+ trials, full distributions",
    advantage: "Quantify uncertainty, stress test reserves"
  },
  {
    category: "Benchmarking",
    traditional: "Proprietary vendor databases, limited transparency",
    siriusb: "CMS NADAC + industry pooling with methodology disclosure",
    advantage: "Independent validation, defensible assumptions"
  },
  {
    category: "Compliance",
    traditional: "Manual documentation and assumption tracking",
    siriusb: "Automated ASOP compliance, version control, audit trail",
    advantage: "Reduce regulatory risk, streamline filings"
  },
  {
    category: "Integration",
    traditional: "Static Excel exports, manual data reconciliation",
    siriusb: "RESTful API, Python/R clients, webhook support",
    advantage: "Seamless workflow integration, automation"
  }
];

export default function ActuariesPage() {
  const [selectedTool, setSelectedTool] = useState<number | null>(null);
  const [selectedUseCase, setSelectedUseCase] = useState<number | null>(null);

  return (
    <>
      <Head>
        <title>For Actuaries: Advanced Analytics & Risk Modeling | SiriusB iQ</title>
        <meta
          name="description"
          content="Actuarial-grade pharmacy benefit modeling, trend decomposition, Monte Carlo simulation, and risk assessment tools meeting SOA/AAA professional standards."
        />
      </Head>

      <Nav />

      <div className="min-h-screen bg-gradient-to-b from-cyan-950 via-slate-950 to-black text-white">
        {/* Hero Section */}
        <section className="relative pt-32 pb-24 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-600/20 via-transparent to-transparent" />
          <div className="absolute inset-0">
            <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>
          
          <div className="relative max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-3 px-5 py-2 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 border border-cyan-400/30 rounded-full mb-8 backdrop-blur-sm">
                <Calculator className="w-5 h-5 text-cyan-300" />
                <span className="text-sm font-semibold text-cyan-200">Actuaries & Risk Analysts</span>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
                <div>
                  <h1 className="text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r from-cyan-200 via-teal-300 to-blue-200 bg-clip-text text-transparent leading-tight font-serif">
                    Build Models<br />That Hold Up<br />Under Scrutiny
                  </h1>
                  
                  <p className="text-2xl text-cyan-100 mb-6 leading-relaxed">
                    PBM trend reports are <span className="text-cyan-300 font-bold">marketing documents, not actuarial work</span>. They smooth over claim-level volatility, mix utilization with unit cost, and hide contract-driven inflation.
                  </p>
                  
                  <p className="text-lg text-cyan-300/80 mb-10">
                    SiriusB iQ delivers actuarial-grade pharmacy benefit analytics: raw claims data, trend decomposition, Monte Carlo simulations, and NADAC benchmarking — built for risk assessment, not sales pitches.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/request-demo">
                      <Button size="lg" className="bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white text-lg px-8 py-6 shadow-2xl shadow-cyan-500/50">
                        See Actuarial Toolkit
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                    <Link href="/solutions/actuarial-benefits">
                      <Button size="lg" variant="outline" className="border-2 border-cyan-400/50 text-cyan-200 hover:bg-cyan-500/20 text-lg px-8 py-6">
                        View Solutions & Case Studies
                      </Button>
                    </Link>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-2xl blur-3xl opacity-30 animate-pulse" />
                  <Card className="relative bg-gradient-to-br from-cyan-950/80 to-teal-950/80 border-2 border-cyan-400/50 p-4 shadow-2xl shadow-cyan-500/50 backdrop-blur-xl">
                    <Image
                      src="/Firefly_Gemini_Flash_The_7.3_Billion_Question-_What_the_Big_Three_PBMs_Have_Cost_Your_Plan_Your_People_981473.png"
                      alt="The 7.3 Billion Dollar Question - What PBMs Have Cost Your Plan - by Jeremiah Franklin"
                      width={800}
                      height={800}
                      className="rounded-xl w-full h-auto"
                      priority
                    />
                    <div className="mt-4 text-center">
                      <p className="text-sm text-cyan-200 font-semibold">Written by Jeremiah Franklin, Founder</p>
                      <p className="text-xs text-cyan-400 italic mt-1">Actuarial truth in benefits auditing</p>
                    </div>
                  </Card>
                </motion.div>
              </div>

              <div className="grid md:grid-cols-4 gap-6">
                <Card className="bg-cyan-900/30 border-cyan-500/40 backdrop-blur-xl p-6 hover:scale-105 transition-transform">
                  <div className="text-5xl font-black text-cyan-300 mb-2">15M+</div>
                  <div className="text-sm text-cyan-200">Claims Analyzed</div>
                  <div className="text-xs text-cyan-400 mt-2">Rx + medical integrated</div>
                </Card>
                <Card className="bg-teal-900/30 border-teal-500/40 backdrop-blur-xl p-6 hover:scale-105 transition-transform">
                  <div className="text-5xl font-black text-teal-300 mb-2">99.2%</div>
                  <div className="text-sm text-teal-200">Prediction Accuracy</div>
                  <div className="text-xs text-teal-400 mt-2">6-9 months ahead</div>
                </Card>
                <Card className="bg-blue-900/30 border-blue-500/40 backdrop-blur-xl p-6 hover:scale-105 transition-transform">
                  <div className="text-5xl font-black text-blue-300 mb-2">SOA</div>
                  <div className="text-sm text-blue-200">Standards Compliant</div>
                  <div className="text-xs text-blue-400 mt-2">FSA validated</div>
                </Card>
                <Card className="bg-indigo-900/30 border-indigo-500/40 backdrop-blur-xl p-6 hover:scale-105 transition-transform">
                  <div className="text-5xl font-black text-indigo-300 mb-2">API</div>
                  <div className="text-sm text-indigo-200">Data Access</div>
                  <div className="text-xs text-indigo-400 mt-2">Python/R clients</div>
                </Card>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Actuarial Toolkit Section */}
        <section className="py-24 px-4 bg-gradient-to-b from-black to-cyan-950/30">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-cyan-200 to-teal-200 bg-clip-text text-transparent">
                Production-Grade Actuarial Toolkit
              </h2>
              <p className="text-xl text-cyan-300 max-w-3xl mx-auto">
                Professional tools meeting SOA/AAA standards for healthcare cost modeling and risk assessment
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {actuarialTools.map((tool, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card 
                    className="bg-gradient-to-br from-cyan-950/40 to-teal-950/40 border-cyan-500/30 p-8 h-full group hover:scale-105 transition-all cursor-pointer"
                    onClick={() => setSelectedTool(selectedTool === index ? null : index)}
                  >
                    <tool.icon className="w-12 h-12 text-cyan-400 mb-6 group-hover:scale-110 transition-transform" />
                    <h3 className="text-2xl font-bold text-white mb-4">{tool.title}</h3>
                    <p className="text-cyan-100 mb-6">{tool.description}</p>
                    
                    <div className="flex gap-2 mb-6">
                      {tool.metrics.map((metric, idx) => (
                        <div key={idx} className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/40 rounded-full text-xs text-cyan-300">
                          {metric}
                        </div>
                      ))}
                    </div>

                    {selectedTool === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="bg-cyan-950/50 rounded-lg p-4 border border-cyan-500/30"
                      >
                        <div className="text-sm text-cyan-200 font-semibold mb-3">Key Features:</div>
                        <ul className="text-xs text-cyan-300 space-y-2">
                          {tool.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Methodology & Standards Section */}
        <section className="py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-cyan-200 to-teal-200 bg-clip-text text-transparent">
                Professional Standards & Methodology
              </h2>
              <p className="text-xl text-cyan-300 max-w-3xl mx-auto">
                Built by actuaries, for actuaries — meeting the highest professional standards
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {methodologyPillars.map((pillar, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-gradient-to-br from-teal-950/40 to-blue-950/40 border-teal-500/30 p-8 h-full">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="bg-gradient-to-br from-teal-500 to-blue-600 rounded-2xl p-4 shadow-xl shadow-teal-500/50">
                        <pillar.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-3">{pillar.title}</h3>
                        <p className="text-teal-200 mb-6">{pillar.description}</p>
                      </div>
                    </div>
                    
                    <div className="bg-black/30 rounded-lg p-4 border border-teal-500/20">
                      <ul className="text-sm text-teal-300 space-y-3">
                        {pillar.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-24 px-4 bg-gradient-to-b from-cyan-950/30 to-black">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-cyan-200 to-teal-200 bg-clip-text text-transparent">
                Real-World Actuarial Applications
              </h2>
              <p className="text-xl text-cyan-300 max-w-3xl mx-auto">
                How actuaries use SiriusB iQ for rate filings, reserve analysis, and benefit design
              </p>
            </motion.div>

            <div className="space-y-6">
              {useCases.map((useCase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card 
                    className="bg-gradient-to-r from-cyan-950/50 to-teal-950/50 border-cyan-500/40 p-8 cursor-pointer hover:border-cyan-400/60 transition-all"
                    onClick={() => setSelectedUseCase(selectedUseCase === index ? null : index)}
                  >
                    <div className="flex items-start gap-6">
                      <div className="bg-gradient-to-br from-cyan-500 to-teal-600 rounded-2xl p-4 shadow-xl shadow-cyan-500/50 flex-shrink-0">
                        <useCase.icon className="w-10 h-10 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-3">{useCase.title}</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <div className="text-sm font-semibold text-cyan-400 mb-2">Scenario:</div>
                            <p className="text-cyan-200">{useCase.scenario}</p>
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-teal-400 mb-2">Solution:</div>
                            <p className="text-teal-200">{useCase.solution}</p>
                          </div>
                        </div>

                        {selectedUseCase === index && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="mt-6 pt-6 border-t border-cyan-500/30"
                          >
                            <div className="text-sm font-semibold text-emerald-400 mb-3">Key Outcomes:</div>
                            <div className="grid md:grid-cols-3 gap-4">
                              {useCase.outcomes.map((outcome, idx) => (
                                <div key={idx} className="bg-black/30 rounded-lg p-4 border border-emerald-500/20">
                                  <div className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                    <span className="text-emerald-300 text-sm">{outcome}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-cyan-200 to-teal-200 bg-clip-text text-transparent">
                SiriusB iQ vs. Traditional Approaches
              </h2>
              <p className="text-xl text-cyan-300 max-w-3xl mx-auto">
                Why leading actuaries choose our platform for critical analyses
              </p>
            </motion.div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-cyan-500/30">
                    <th className="text-left p-4 text-cyan-300 font-bold">Dimension</th>
                    <th className="text-left p-4 text-gray-400 font-bold">Traditional Approach</th>
                    <th className="text-left p-4 text-cyan-400 font-bold">SiriusB iQ</th>
                    <th className="text-left p-4 text-emerald-400 font-bold">Your Advantage</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonTable.map((row, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-cyan-500/10 hover:bg-cyan-950/20 transition-colors"
                    >
                      <td className="p-4 text-cyan-300 font-semibold">{row.category}</td>
                      <td className="p-4 text-gray-400">{row.traditional}</td>
                      <td className="p-4 text-cyan-200">{row.siriusb}</td>
                      <td className="p-4 text-emerald-300">{row.advantage}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="relative bg-gradient-to-br from-cyan-900/80 to-teal-900/80 border-4 border-cyan-400 p-12 shadow-[0_0_60px_rgba(6,182,212,0.6),0_0_100px_rgba(6,182,212,0.4),0_0_140px_rgba(6,182,212,0.2)]">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-teal-500/20 to-blue-500/20 rounded-lg" />
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 via-teal-600 to-blue-600 rounded-lg blur-xl opacity-75" />
              
              <div className="relative">
                <div className="text-center mb-8">
                  <div className="inline-block px-6 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full mb-4 shadow-[0_0_30px_rgba(6,182,212,0.8)]">
                    <span className="text-sm font-black text-white uppercase tracking-wider">🔬 Actuarial Sandbox Access 🔬</span>
                  </div>
                  <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-cyan-200 via-white to-teal-200 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(6,182,212,0.8)]">
                    Request Demo Access
                  </h2>
                  <p className="text-xl text-cyan-100 drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]">
                    Get hands-on with live claims data modeling, Monte Carlo tools, and API sandbox — plus a 30-minute actuarial briefing with our FSA team.
                  </p>
                </div>
                
                <form className="max-w-2xl mx-auto space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-black text-cyan-100 mb-2 uppercase tracking-wide drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]">Full Name</label>
                      <input
                        type="text"
                        required
                        className="w-full px-5 py-4 bg-black/60 border-3 border-cyan-400 rounded-xl text-white placeholder-cyan-300/70 focus:outline-none focus:border-cyan-300 focus:shadow-[0_0_30px_rgba(6,182,212,0.8)] transition-all font-semibold"
                        placeholder="John Smith, FSA"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-black text-cyan-100 mb-2 uppercase tracking-wide drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]">Email</label>
                      <input
                        type="email"
                        required
                        className="w-full px-5 py-4 bg-black/60 border-3 border-cyan-400 rounded-xl text-white placeholder-cyan-300/70 focus:outline-none focus:border-cyan-300 focus:shadow-[0_0_30px_rgba(6,182,212,0.8)] transition-all font-semibold"
                        placeholder="john@actuarialfirm.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-black text-cyan-100 mb-2 uppercase tracking-wide drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]">Organization</label>
                      <input
                        type="text"
                        required
                        className="w-full px-5 py-4 bg-black/60 border-3 border-cyan-400 rounded-xl text-white placeholder-cyan-300/70 focus:outline-none focus:border-cyan-300 focus:shadow-[0_0_30px_rgba(6,182,212,0.8)] transition-all font-semibold"
                        placeholder="Actuarial Consulting Firm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-black text-cyan-100 mb-2 uppercase tracking-wide drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]">Credential / Role</label>
                      <select
                        required
                        className="w-full px-5 py-4 bg-black/60 border-3 border-cyan-400 rounded-xl text-white focus:outline-none focus:border-cyan-300 focus:shadow-[0_0_30px_rgba(6,182,212,0.8)] transition-all font-semibold"
                      >
                        <option value="">Select credential...</option>
                        <option value="fsa">FSA - Fellow, Society of Actuaries</option>
                        <option value="asa">ASA - Associate, Society of Actuaries</option>
                        <option value="maaa">MAAA - Member, American Academy</option>
                        <option value="analyst">Healthcare Actuary / Analyst</option>
                        <option value="consultant">Actuarial Consultant</option>
                        <option value="student">Actuarial Student</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-black text-cyan-100 mb-2 uppercase tracking-wide drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]">Primary Use Case</label>
                    <select
                      required
                      className="w-full px-5 py-4 bg-black/60 border-3 border-cyan-400 rounded-xl text-white focus:outline-none focus:border-cyan-300 focus:shadow-[0_0_30px_rgba(6,182,212,0.8)] transition-all font-semibold"
                    >
                      <option value="">Select primary interest...</option>
                      <option value="rate-filing">Rate Filing & Regulatory Compliance</option>
                      <option value="trend-analysis">Pharmacy Trend Analysis & Decomposition</option>
                      <option value="risk-modeling">Risk Modeling & Monte Carlo Simulation</option>
                      <option value="reserve-analysis">Reserve Analysis & IBNR Estimation</option>
                      <option value="benefit-design">Benefit Design & Cost Modeling</option>
                      <option value="nadac">NADAC Benchmarking & Pricing Validation</option>
                      <option value="api">API Integration & Data Access</option>
                    </select>
                  </div>

                  <Link href="/request-demo">
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-500 hover:from-cyan-400 hover:via-teal-400 hover:to-blue-400 text-white text-2xl font-black py-8 shadow-[0_0_40px_rgba(6,182,212,0.9),0_0_60px_rgba(6,182,212,0.6),0_0_80px_rgba(6,182,212,0.4)] hover:shadow-[0_0_50px_rgba(6,182,212,1),0_0_80px_rgba(6,182,212,0.8),0_0_120px_rgba(6,182,212,0.6)] uppercase tracking-wider border-2 border-white/50"
                    >
                      🧪 Request Actuarial Sandbox Access 🧪
                      <ArrowRight className="w-6 h-6 ml-3" />
                    </Button>
                  </Link>
                  
                  <p className="text-xs text-center text-cyan-200 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]">
                    Includes: Live data demo • API documentation • 30-min FSA briefing • Methodology white papers
                  </p>
                </form>
              </div>
            </Card>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 px-4 bg-gradient-to-b from-cyan-950/30 to-black">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Award className="w-16 h-16 mx-auto mb-6 text-cyan-400" />
              <h2 className="text-5xl font-black mb-8 bg-gradient-to-r from-cyan-200 to-teal-200 bg-clip-text text-transparent">
                Join Leading Actuarial Teams
              </h2>
              <p className="text-2xl text-cyan-200 mb-12">
                FSAs at Fortune 500 companies, health plans, and actuarial consulting firms trust SiriusB iQ for mission-critical analyses.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/request-demo">
                  <Button size="lg" className="bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white text-xl px-12 py-8 shadow-2xl shadow-cyan-500/50">
                    Schedule Actuarial Briefing
                    <Calculator className="w-6 h-6 ml-3" />
                  </Button>
                </Link>
                <Link href="/solutions/actuarial-benefits">
                  <Button size="lg" variant="outline" className="border-2 border-cyan-400/50 text-cyan-200 hover:bg-cyan-500/20 text-xl px-12 py-8">
                    View Case Studies
                    <FileText className="w-6 h-6 ml-3" />
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-cyan-400 mt-8">
                Live demo • Methodology documentation • API sandbox • FSA validation
              </p>
            </motion.div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}