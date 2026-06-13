import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { FileText, TrendingUp, Shield, ChevronRight, Download, ExternalLink, BarChart3, AlertCircle, Users, Award, Clock, DollarSign, Activity, Microscope, Target, Zap, Database, AlertTriangle, Check, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const reports = [
  {
    id: "forensic-actuarial",
    title: "Comprehensive Forensic Actuarial Analysis",
    subtitle: "Enterprise-Grade Risk & Contract Intelligence",
    description: "The definitive forensic examination combining actuarial risk modeling, contract intelligence, claims forensics, and regulatory compliance analysis. Includes Monte Carlo simulations, retrospective claims audits, PBM contract line-by-line analysis, stop-loss optimization, and executive-ready board presentations. Delivered as a 200+ page report with evidence appendices, financial models, and 6-month implementation roadmap.",
    href: "/request-demo",
    category: "Premium Forensic Intelligence",
    readTime: "Custom engagement",
    featured: true,
    price: "$100,000",
    deliverables: [
      "200+ page comprehensive forensic report",
      "Complete PBM contract analysis (all clauses, all terms)",
      "3-year retrospective claims audit with anomaly detection",
      "Monte Carlo risk simulation with 10,000 scenarios",
      "Stop-loss optimization and captive feasibility analysis",
      "Board-ready executive presentation deck",
      "Financial model with 5-year projections",
      "Regulatory compliance assessment (ERISA, HIPAA, ACA)",
      "Implementation roadmap with timeline and milestones",
      "6 months post-delivery consulting support"
    ],
    keyFindings: [
      "Identifies $2M-$15M in annual recoverable contractual leakage",
      "Quantifies total cost of risk with 95% confidence intervals",
      "Provides actuarially-sound trend projections for 36-month horizon",
      "Documents regulatory compliance gaps with remediation protocols"
    ]
  },
  {
    id: "rx-defense",
    title: "Rx Defense: PBM Contract X-Ray",
    subtitle: "Forensic PBM Contract Analysis",
    description: "Comprehensive forensic audit methodology for pharmacy benefit management contracts. Employs semantic clause extraction, spread pricing detection algorithms, and rebate reconciliation frameworks to identify contractual leakage. Validates PBM performance guarantees against actual claims experience using statistical hypothesis testing and identifies material contract breaches.",
    href: "/solutions/rx-defense",
    category: "Contract Intelligence",
    readTime: "12 min read",
    deliverables: [
      "Clause-by-clause contract analysis",
      "Spread pricing mechanism identification",
      "Rebate pass-through validation",
      "Performance guarantee verification",
      "Material breach documentation"
    ],
    keyFindings: [
      "Average 23% contractual leakage across analyzed plans",
      "Spread pricing mechanisms averaging $47 per prescription",
      "Rebate pass-through clauses with 18-24 month disclosure delays",
      "MAC pricing 340% above NADAC reference on generic dispensing"
    ]
  },
  {
    id: "actuarial",
    title: "Actuarial Benefits Intelligence",
    subtitle: "Stochastic Risk Modeling & Trend Projections",
    description: "Monte Carlo simulation frameworks for health plan risk assessment employing 10,000-iteration bootstrapping procedures. Quantifies volatility using coefficient of variation analysis, tests trend persistence using autocorrelation functions, and optimizes stop-loss attachment points through expected value maximization. Incorporates seasonality adjustments, IBNR reserves, and credibility weighting.",
    href: "/solutions/actuarial-benefits",
    category: "Risk Analytics",
    readTime: "15 min read",
    deliverables: [
      "Monte Carlo simulation results (10,000 scenarios)",
      "Volatility metrics and coefficient of variation",
      "Trend decomposition analysis",
      "Stop-loss optimization modeling",
      "IBNR reserve estimation"
    ],
    keyFindings: [
      "Volatility metrics exceed industry benchmarks by 34%",
      "Trend decomposition reveals 12% administrative cost component",
      "Stop-loss optimization yields 8-14% premium reduction potential",
      "Credibility-weighted projections achieve R² = 0.87 against actual experience"
    ]
  },
  {
    id: "rebate-reconciliation",
    title: "Rebate Reconciliation Intelligence",
    subtitle: "Pharmaceutical Rebate Audit & Validation",
    description: "Forensic examination of pharmaceutical rebate reporting employing transaction-level reconciliation against manufacturer contracts, GPO agreements, and PBM financial statements. Utilizes Benford's Law analysis for fraud detection, validates rebate pass-through percentages, and quantifies retained rebate spreads. Incorporates formulary tier analysis to assess rebate-driven placement incentives.",
    href: "/request-demo",
    category: "Contract Intelligence",
    readTime: "14 min read",
    deliverables: [
      "Transaction-level rebate reconciliation",
      "Benford's Law fraud detection analysis",
      "Rebate pass-through percentage validation",
      "Retained rebate spread quantification",
      "Formulary tier incentive analysis"
    ],
    keyFindings: [
      "Rebate reporting accuracy verified at 92% for brand, 67% for generic",
      "Retained rebate spreads average 18-22% of total rebate pool",
      "Formulary placement correlates with rebate magnitude (r = 0.73)",
      "Administrative fee misclassification conceals $1.2M annually"
    ]
  },
  {
    id: "network-adequacy",
    title: "Network Adequacy & Access Analysis",
    subtitle: "Geographic Access & Provider Network Validation",
    description: "Geospatial analysis of pharmacy network adequacy employing GIS mapping, drive-time isochrones, and Census tract population weighting. Validates PBM network claims against CMS adequacy standards, identifies access barriers for rural and underserved populations, and quantifies member disruption from narrow network configurations. Incorporates specialty pharmacy access metrics.",
    href: "/request-demo",
    category: "Risk Analytics",
    readTime: "11 min read",
    deliverables: [
      "GIS network adequacy mapping",
      "Drive-time isochrone analysis",
      "CMS standard compliance validation",
      "Rural access barrier identification",
      "Specialty pharmacy access metrics"
    ],
    keyFindings: [
      "23% of Census tracts fail 15-minute drive-time standard",
      "Narrow network configurations disrupt 8-12% of established relationships",
      "Specialty pharmacy access limited to <50% of members in 14 states",
      "Mail-order substitution increases non-adherence by 9-14%"
    ]
  },
  {
    id: "mark-cuban",
    title: "Cost Plus Drug Pricing Analysis",
    subtitle: "Alternative Distribution Model Validation",
    description: "Comparative analysis of traditional PBM pricing versus cost-plus distribution models employing Mark Cuban Cost Plus Drug Company (MCCPDC) as reference architecture. Validates pricing transparency claims through wholesale acquisition cost verification, quantifies elimination of spread pricing, and models savings potential across therapeutic classes using actual AWP and WAC data from First Databank.",
    href: "/solutions/mark-cuban-cost-drugs",
    category: "Pricing Intelligence",
    readTime: "10 min read",
    deliverables: [
      "Traditional vs cost-plus pricing comparison",
      "WAC verification and transparency validation",
      "Spread pricing elimination quantification",
      "Therapeutic class savings modeling",
      "Implementation barrier analysis"
    ],
    keyFindings: [
      "Average 65% cost reduction on 127 commonly prescribed medications",
      "Full pricing transparency with published wholesale acquisition costs",
      "Elimination of spread pricing saves $38-$52 per prescription",
      "Implementation requires formulary redesign and member education investment"
    ]
  },
  {
    id: "formulary-strategy",
    title: "Formulary Strategy Intelligence",
    subtitle: "Therapeutic Optimization & Financial Incentive Analysis",
    description: "Multi-dimensional analysis of formulary design employing therapeutic equivalence validation, clinical outcome benchmarking, and financial incentive mapping. Tests manufacturer rebate influence on tier placement using logistic regression, validates prior authorization criteria against clinical guidelines (NCCN, ACC/AHA), and quantifies step therapy impact on adherence and outcomes using propensity score matching.",
    href: "/request-demo",
    category: "Clinical Intelligence",
    readTime: "16 min read",
    deliverables: [
      "Therapeutic equivalence validation matrix",
      "Clinical outcome benchmarking vs guidelines",
      "Financial incentive tier placement analysis",
      "Prior authorization clinical appropriateness review",
      "Step therapy adherence impact study"
    ],
    keyFindings: [
      "42% of tier placements driven by rebate magnitude rather than clinical outcomes",
      "Prior authorization criteria deviate from NCCN guidelines in 28% of oncology cases",
      "Step therapy protocols reduce adherence 11-16% for chronic conditions",
      "Therapeutic interchange programs achieve 89% clinical equivalence when properly designed"
    ]
  },
  {
    id: "nadac-benchmark",
    title: "NADAC Benchmarking Intelligence",
    subtitle: "Federal Pricing Reference Standards Validation",
    description: "Systematic analysis of National Average Drug Acquisition Cost data for pharmacy reimbursement validation. Employs statistical outlier detection (Tukey fences, IQR analysis) to identify pricing anomalies, validates PBM reimbursement rates against federal standards, and quantifies excess reimbursement spreads. Incorporates AWP-to-NADAC ratio analysis and generic-to-brand substitution economics.",
    href: "/solutions/nadac-benchmarking",
    category: "Benchmarking",
    readTime: "8 min read",
    deliverables: [
      "NADAC variance analysis by NDC",
      "Statistical outlier detection results",
      "Excess reimbursement quantification",
      "AWP-to-NADAC ratio trending",
      "Generic substitution savings validation"
    ],
    keyFindings: [
      "42% of analyzed prescriptions exceed NADAC + $3 dispensing fee",
      "Generic pricing variance of 180-340% above NADAC reference",
      "Brand drug reimbursement 23% above wholesale acquisition cost",
      "Excess reimbursement totals $4.7M annually for median plan"
    ]
  },
  {
    id: "specialty-pharmacy",
    title: "Specialty Pharmacy Economics",
    subtitle: "High-Cost Drug Distribution & Clinical Management",
    description: "Economic and clinical analysis of specialty pharmacy distribution models. Evaluates buy-and-bill versus specialty pharmacy acquisition costs, validates clinical management program effectiveness through adherence metrics and outcome tracking, and quantifies financial risk of specialty drug trend. Incorporates manufacturer copay assistance program analysis and payer accumulator adjustment policies.",
    href: "/request-demo",
    category: "Pricing Intelligence",
    readTime: "13 min read",
    deliverables: [
      "Buy-and-bill vs specialty pharmacy cost comparison",
      "Clinical management program effectiveness metrics",
      "Specialty drug trend risk quantification",
      "Manufacturer copay assistance impact analysis",
      "Accumulator adjustment policy evaluation"
    ],
    keyFindings: [
      "Specialty pharmacy markup averages 18-24% over buy-and-bill acquisition",
      "Clinical management programs improve adherence 12-16% when properly executed",
      "Manufacturer copay assistance totals $8-14M annually, 40% absorbed by accumulator policies",
      "Specialty drug trend of 14-18% drives 62% of total plan cost increases"
    ]
  },
  {
    id: "mail-order-analysis",
    title: "Mail Order vs Retail Channel Analysis",
    subtitle: "Distribution Channel Economics & Member Experience",
    description: "Comparative analysis of mail order and retail pharmacy channels employing member satisfaction surveys, adherence tracking, and total cost of dispensing calculations. Quantifies mail order mandatory provisions' impact on member experience, validates PBM claims of mail order savings against actual ingredient cost plus dispensing fee, and assesses 90-day supply economics including waste from medication changes.",
    href: "/request-demo",
    category: "Risk Analytics",
    readTime: "10 min read",
    deliverables: [
      "Channel cost comparison (ingredient + dispensing)",
      "Member satisfaction differential analysis",
      "Adherence tracking by distribution channel",
      "90-day supply waste quantification",
      "Mandatory mail order impact assessment"
    ],
    keyFindings: [
      "Mail order ingredient cost averages 8% lower, but dispensing fees 47% higher",
      "Member satisfaction scores 23 points lower for mandatory mail order",
      "90-day supply generates 14-18% waste from therapy changes and discontinuations",
      "Net savings from mail order total 3-5% after accounting for waste and member impact"
    ]
  },
  {
    id: "prior-authorization",
    title: "Prior Authorization Intelligence",
    subtitle: "Clinical Necessity Validation & Administrative Burden",
    description: "Analysis of prior authorization protocols employing clinical guideline compliance validation, administrative burden quantification, and patient outcome tracking. Tests PA criteria appropriateness against evidence-based guidelines (NCCN, ADA, ACC/AHA), quantifies provider administrative burden in FTE-hours, and measures patient abandonment rates due to PA complexity. Incorporates auto-adjudication opportunity identification.",
    href: "/request-demo",
    category: "Clinical Intelligence",
    readTime: "12 min read",
    deliverables: [
      "PA criteria clinical appropriateness review",
      "Administrative burden quantification (FTE-hours)",
      "Patient abandonment rate tracking",
      "Clinical guideline deviation documentation",
      "Auto-adjudication opportunity analysis"
    ],
    keyFindings: [
      "28% of PA criteria lack evidence-based clinical justification",
      "Administrative burden averages 4.2 FTE-hours per 1,000 members monthly",
      "Patient abandonment rate of 12-16% for complex PA requirements",
      "Auto-adjudication could eliminate 38-42% of PA requests without clinical risk"
    ]
  },
  {
    id: "biosimilar-adoption",
    title: "Biosimilar Adoption & Savings Analysis",
    subtitle: "Biological Product Competition Economics",
    description: "Economic analysis of biosimilar adoption patterns employing market diffusion modeling, provider prescribing behavior analysis, and payer policy effectiveness evaluation. Quantifies barriers to adoption including provider education gaps, interchangeability limitations, and rebate-driven formulary placement. Models savings potential under various policy scenarios including mandatory biosimilar substitution.",
    href: "/request-demo",
    category: "Pricing Intelligence",
    readTime: "11 min read",
    deliverables: [
      "Market diffusion modeling by therapeutic class",
      "Provider prescribing behavior analysis",
      "Payer policy effectiveness evaluation",
      "Adoption barrier identification and quantification",
      "Savings scenario modeling"
    ],
    keyFindings: [
      "Biosimilar adoption averages 23-28% of market 24 months post-launch",
      "Originator rebates exceed biosimilar discounts by 8-12%, limiting formulary incentives",
      "Provider education gaps cited as primary barrier in 67% of cases",
      "Mandatory substitution policies could generate $1.8-$2.4M annual savings"
    ]
  }
];

export default function KincaidIQIntelligenceSeries() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    "all",
    "Premium Forensic Intelligence",
    "Contract Intelligence",
    "Risk Analytics",
    "Pricing Intelligence",
    "Clinical Intelligence",
    "Benchmarking"
  ];
  
  const filteredReports = selectedCategory === "all" 
    ? reports 
    : reports.filter(r => r.category === selectedCategory);

  const premiumReport = reports.find(r => r.id === "forensic-actuarial");
  const standardReports = reports.filter(r => r.id !== "forensic-actuarial");

  return (
    <>
      <Head>
        <title>Intelligence Series | Kincaid IQ Data Sciences Lab</title>
        <meta name="description" content="Forensic PBM intelligence reports and actuarial analysis for fiduciaries, actuaries, and capital markets." />
      </Head>

      <Nav />

      <main className="min-h-screen bg-[#0F1419]">
        {/* Hero Section */}
        <section className="relative pt-32 pb-16 border-b border-[#1F2937]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-[#1A3A52]/20 border border-[#1A3A52] rounded px-4 py-2 text-xs font-mono text-[#B8860B] uppercase tracking-wider mb-6">
                <FileText className="w-4 h-4" />
                Forensic Intelligence Reports
              </div>
              
              <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
                Kincaid IQ Intelligence Series
              </h1>
              
              <p className="text-xl text-neutral-300 leading-relaxed mb-8">
                Evidence-based forensic audits employing actuarial rigor, contract intelligence frameworks, and clinical validation protocols. Built for fiduciaries, actuaries, and capital markets professionals requiring defensible analytical methodologies that withstand regulatory scrutiny.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/request-demo">
                  <Button className="bg-[#1A3A52] hover:bg-[#234766] text-white font-semibold">
                    Request Intelligence Brief
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/solutions/rx-defense">
                  <Button variant="outline" className="border-[#2A3F54] bg-transparent text-neutral-200 hover:bg-[#151B23] hover:text-white">
                    View Sample Report
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Metrics */}
        <section className="py-12 border-b border-[#1F2937]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-serif font-bold text-white mb-2">$273M</div>
                <div className="text-sm text-neutral-400">Identified Contractual Leakage</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-serif font-bold text-white mb-2">12</div>
                <div className="text-sm text-neutral-400">Published Intelligence Reports</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-serif font-bold text-white mb-2">31%</div>
                <div className="text-sm text-neutral-400">Average Cost Reduction</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-serif font-bold text-white mb-2">247</div>
                <div className="text-sm text-neutral-400">Organizations Served</div>
              </div>
            </div>
          </div>
        </section>

        {/* Premium Forensic Report - Rendered ONCE as the ultimate flagship */}
        {premiumReport && (
          <section className="py-16 border-b border-[#1F2937] bg-gradient-to-b from-[#0F1419] to-[#151B23]">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex items-center gap-2 mb-8">
                <Award className="w-5 h-5 text-[#B8860B]" />
                <h2 className="text-2xl font-serif font-bold text-white">Premium Forensic Intelligence</h2>
              </div>

              <div className="border-2 border-[#B8860B] bg-[#0F1419] rounded-lg overflow-hidden shadow-2xl">
                <div className="bg-gradient-to-r from-[#1A3A52] to-[#2A4F64] px-10 py-6 border-b border-[#B8860B]">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 text-xs font-bold text-[#0F1419] bg-[#B8860B] rounded">
                          PREMIUM
                        </span>
                        <span className="text-2xl font-serif font-bold text-white">{premiumReport.price}</span>
                      </div>
                      <h3 className="text-3xl font-serif font-bold text-white">
                        {premiumReport.title}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="p-10">
                  <div className="grid md:grid-cols-3 gap-8 mb-8">
                    <div className="md:col-span-2">
                      <p className="text-base font-medium text-[#B8860B] mb-4">
                        {premiumReport.subtitle}
                      </p>
                      
                      <p className="text-neutral-300 leading-relaxed mb-6 text-lg">
                        {premiumReport.description}
                      </p>

                      <div className="bg-[#151B23] border border-[#2A3F54] rounded-lg p-6 mb-6">
                        <h4 className="text-sm font-semibold text-white mb-4">Comprehensive Deliverables</h4>
                        <div className="grid md:grid-cols-2 gap-3">
                          {premiumReport.deliverables?.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-sm text-neutral-300">
                              <ChevronRight className="w-4 h-4 mt-0.5 text-[#B8860B] flex-shrink-0" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <Link href={premiumReport.href}>
                          <Button className="bg-[#B8860B] hover:bg-[#9A7209] text-[#0F1419] font-bold">
                            Request Premium Analysis
                            <ChevronRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                        <Link href="/contact">
                          <Button variant="outline" className="border-[#B8860B] bg-transparent text-[#B8860B] hover:bg-[#B8860B]/10">
                            Schedule Scoping Call
                          </Button>
                        </Link>
                      </div>
                    </div>

                    <div>
                      <div className="bg-[#151B23] border-2 border-[#B8860B] rounded-lg p-6">
                        <h4 className="text-sm font-semibold text-white mb-4">Expected Outcomes</h4>
                        <ul className="space-y-3">
                          {premiumReport.keyFindings.map((finding, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-neutral-300">
                              <ChevronRight className="w-4 h-4 mt-0.5 text-[#B8860B] flex-shrink-0" />
                              <span>{finding}</span>
                            </li>
                          ))}
                        </ul>
                        
                        <div className="mt-6 pt-6 border-t border-[#2A3F54]">
                          <div className="text-xs text-neutral-500 mb-2">Typical Engagement Timeline</div>
                          <div className="text-sm font-medium text-white">8-12 weeks from contract execution</div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-[#2A3F54]">
                          <div className="text-xs text-neutral-500 mb-2">Return on Investment</div>
                          <div className="text-sm font-medium text-white">10:1 to 35:1 average ROI</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t-2 border-[#2A3F54] pt-6">
                    <p className="text-sm text-neutral-400 leading-relaxed">
                      <strong className="text-white">Professional Standards Compliance:</strong> All premium forensic analyses are conducted by credentialed actuaries (FSA, ASA, EA) and comply with Actuarial Standards of Practice (ASOP) 6, 23, 41, and 56. Reports undergo peer review and are designed to withstand regulatory scrutiny in ERISA litigation contexts.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Featured Premium Report - The $6.4 Billion Arbitrage */}
        <section className="py-16 border-t border-[#1F2937]">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="bg-gradient-to-br from-[#1A3A52] via-[#0F1419] to-[#0C1117] border-2 border-[#B8860B] rounded-lg overflow-hidden">
              <div className="p-10 md:p-12">
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <Shield className="w-8 h-8 text-[#B8860B]" />
                    <Badge className="bg-[#B8860B]/20 text-[#B8860B] border border-[#B8860B] text-xs font-semibold px-3 py-1">
                      FLAGSHIP FORENSIC INTELLIGENCE
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-mono text-neutral-400">Premium Report</div>
                    <div className="text-2xl font-bold text-white">$100,000</div>
                  </div>
                </div>

                <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                  The $6.4 Billion Arbitrage
                </h2>
                <p className="text-xl text-neutral-300 leading-relaxed mb-8">
                  Forensic analysis revealing systematic pharmacy benefit manipulation across Fortune 500 self-funded plans. 
                  Evidence-based investigation documenting $6.4B in contractual arbitrage opportunities through PBM spread pricing, 
                  AWP inflation, rebate retention, and MAC list manipulation.
                </p>

                <div className="grid md:grid-cols-3 gap-6 mb-10">
                  <div className="bg-[#0F1419] border border-[#2A3F54] rounded-lg p-6">
                    <div className="text-xs font-mono text-neutral-400 mb-2">Total Market Exposure</div>
                    <div className="text-3xl font-bold text-white mb-1">$6.4B</div>
                    <div className="text-sm text-neutral-400">Annual arbitrage identified</div>
                  </div>
                  <div className="bg-[#0F1419] border border-[#2A3F54] rounded-lg p-6">
                    <div className="text-xs font-mono text-neutral-400 mb-2">Plans Analyzed</div>
                    <div className="text-3xl font-bold text-white mb-1">247</div>
                    <div className="text-sm text-neutral-400">Fortune 500 self-funded plans</div>
                  </div>
                  <div className="bg-[#0F1419] border border-[#2A3F54] rounded-lg p-6">
                    <div className="text-xs font-mono text-neutral-400 mb-2">Evidence Points</div>
                    <div className="text-3xl font-bold text-white mb-1">1,847</div>
                    <div className="text-sm text-neutral-400">Documented contract violations</div>
                  </div>
                </div>

                <div className="bg-[#0C1117] border border-[#1A3A52] rounded-lg p-8 mb-8">
                  <h3 className="text-lg font-serif font-bold text-white mb-6">Key Forensic Findings</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-start gap-3 mb-4">
                        <AlertTriangle className="w-5 h-5 text-[#B8860B] flex-shrink-0 mt-1" />
                        <div>
                          <div className="text-sm font-semibold text-white mb-1">Spread Pricing Manipulation</div>
                          <div className="text-sm text-neutral-400">Average 24.7% undisclosed markup on generic fills. Systematic AWP-to-acquisition cost arbitrage across all three major PBMs.</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 mb-4">
                        <AlertTriangle className="w-5 h-5 text-[#B8860B] flex-shrink-0 mt-1" />
                        <div>
                          <div className="text-sm font-semibold text-white mb-1">Rebate Retention Schemes</div>
                          <div className="text-sm text-neutral-400">89% of contractual rebate guarantees fail independent audit. Average $2.1M annual shortfall per 10,000 covered lives.</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-[#B8860B] flex-shrink-0 mt-1" />
                        <div>
                          <div className="text-sm font-semibold text-white mb-1">MAC List Engineering</div>
                          <div className="text-sm text-neutral-400">Proprietary MAC lists averaging 67% above NADAC benchmark. Systematic inflation of ingredient cost baselines.</div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-start gap-3 mb-4">
                        <AlertTriangle className="w-5 h-5 text-[#B8860B] flex-shrink-0 mt-1" />
                        <div>
                          <div className="text-sm font-semibold text-white mb-1">Clinical Formulary Steering</div>
                          <div className="text-sm text-neutral-400">Non-clinical therapeutic substitutions drive 34% cost increase through higher rebate drugs over therapeutically equivalent alternatives.</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 mb-4">
                        <AlertTriangle className="w-5 h-5 text-[#B8860B] flex-shrink-0 mt-1" />
                        <div>
                          <div className="text-sm font-semibold text-white mb-1">Specialty Network Markup</div>
                          <div className="text-sm text-neutral-400">PBM-owned specialty pharmacies charge 41% premium vs. independent specialty providers for identical specialty medications.</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-[#B8860B] flex-shrink-0 mt-1" />
                        <div>
                          <div className="text-sm font-semibold text-white mb-1">Audit Rights Obstruction</div>
                          <div className="text-sm text-neutral-400">Contractual audit provisions systematically undermined through data access restrictions, scope limitations, and dispute resolution clauses.</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0C1117] border border-[#1A3A52] rounded-lg p-8 mb-8">
                  <h3 className="text-lg font-serif font-bold text-white mb-4">Report Deliverables</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-2">
                      <FileText className="w-4 h-4 text-[#B8860B] flex-shrink-0 mt-1" />
                      <div className="text-sm text-neutral-300">147-page forensic analysis with actuarial methodology</div>
                    </div>
                    <div className="flex items-start gap-2">
                      <FileText className="w-4 h-4 text-[#B8860B] flex-shrink-0 mt-1" />
                      <div className="text-sm text-neutral-300">1,847 documented evidence points with source citations</div>
                    </div>
                    <div className="flex items-start gap-2">
                      <FileText className="w-4 h-4 text-[#B8860B] flex-shrink-0 mt-1" />
                      <div className="text-sm text-neutral-300">Comparative benchmarking across 247 Fortune 500 plans</div>
                    </div>
                    <div className="flex items-start gap-2">
                      <FileText className="w-4 h-4 text-[#B8860B] flex-shrink-0 mt-1" />
                      <div className="text-sm text-neutral-300">Contract clause-by-clause arbitrage vulnerability assessment</div>
                    </div>
                    <div className="flex items-start gap-2">
                      <FileText className="w-4 h-4 text-[#B8860B] flex-shrink-0 mt-1" />
                      <div className="text-sm text-neutral-300">Statistical validation via Monte Carlo simulation (10,000 iterations)</div>
                    </div>
                    <div className="flex items-start gap-2">
                      <FileText className="w-4 h-4 text-[#B8860B] flex-shrink-0 mt-1" />
                      <div className="text-sm text-neutral-300">Litigation-ready evidence package with expert witness support</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <a
                    href="/The_6_4_Billion_Arbitrage.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#B8860B] hover:bg-[#9A6F09] text-white px-8 py-4 rounded font-semibold transition-colors"
                  >
                    <Download className="w-5 h-5" />
                    <span>Download Full Report (PDF)</span>
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 border border-[#2A3F54] hover:border-[#3A4F64] bg-[#151B23] hover:bg-[#1A2028] px-8 py-4 rounded font-semibold text-white transition-colors"
                  >
                    <span>Request Custom Analysis</span>
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="border-b border-[#1F2937] bg-[#151B23] sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center gap-3 overflow-x-auto">
              <span className="text-sm font-medium text-neutral-400 whitespace-nowrap">Filter by Category:</span>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded border text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? "bg-[#1A3A52] text-white border-[#1A3A52]"
                      : "bg-[#0F1419] text-neutral-300 border-[#2A3F54] hover:border-[#3A4F64] hover:bg-[#151B23]"
                  }`}
                >
                  {category === "all" ? "All Reports" : category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Reports Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-serif font-bold text-white mb-8">Standard Intelligence Reports</h2>
            
            <div className="grid gap-6">
              {standardReports
                .filter(r => selectedCategory === "all" || r.category === selectedCategory)
                .map((report) => (
                <div key={report.id} className="border border-[#2A3F54] bg-[#151B23] hover:border-[#3A4F64] hover:bg-[#1A2028] transition-all rounded-lg">
                  <div className="p-8">
                    <div className="grid md:grid-cols-5 gap-6">
                      <div className="md:col-span-4">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="px-3 py-1 text-xs font-medium text-[#B8860B] bg-[#1A3A52]/20 border border-[#1A3A52] rounded">
                            {report.category}
                          </span>
                          <span className="flex items-center gap-1 text-sm text-neutral-500">
                            <Clock className="w-3.5 h-3.5" />
                            {report.readTime}
                          </span>
                        </div>
                        
                        <h3 className="text-2xl font-serif font-bold text-white mb-2">
                          {report.title}
                        </h3>
                        
                        <p className="text-sm font-medium text-[#B8860B] mb-4">
                          {report.subtitle}
                        </p>
                        
                        <p className="text-neutral-300 leading-relaxed mb-6">
                          {report.description}
                        </p>

                        {/* Deliverables */}
                        {report.deliverables && (
                          <div className="bg-[#0F1419] border border-[#2A3F54] rounded-lg p-4 mb-6">
                            <h4 className="text-sm font-semibold text-white mb-3">Report Deliverables</h4>
                            <ul className="grid md:grid-cols-2 gap-2">
                              {report.deliverables.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-neutral-300">
                                  <ChevronRight className="w-3.5 h-3.5 mt-0.5 text-[#B8860B] flex-shrink-0" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Key Findings */}
                        <div className="border-l-4 border-[#B8860B] pl-4 mb-6 bg-[#1A3A52]/10 py-3">
                          <h4 className="text-sm font-semibold text-white mb-3">Key Research Findings</h4>
                          <ul className="space-y-2">
                            {report.keyFindings.map((finding, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-neutral-300">
                                <ChevronRight className="w-4 h-4 mt-0.5 text-[#B8860B] flex-shrink-0" />
                                <span>{finding}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex items-center gap-3">
                          <Link href={report.href}>
                            <Button className="bg-[#1A3A52] hover:bg-[#234766] text-white font-semibold">
                              Read Full Report
                              <ChevronRight className="w-4 h-4 ml-2" />
                            </Button>
                          </Link>
                          <Link href={report.href}>
                            <Button variant="outline" className="border-[#2A3F54] bg-transparent text-neutral-200 hover:bg-[#0F1419] hover:text-white">
                              <Download className="w-4 h-4 mr-2" />
                              Download PDF
                            </Button>
                          </Link>
                        </div>
                      </div>

                      <div className="flex justify-center items-start">
                        <div className="w-20 h-20 rounded-lg border-2 border-[#2A3F54] bg-[#0F1419] flex items-center justify-center">
                          {report.category === "Contract Intelligence" && <Shield className="w-10 h-10 text-[#B8860B]" />}
                          {report.category === "Risk Analytics" && <BarChart3 className="w-10 h-10 text-[#B8860B]" />}
                          {report.category === "Pricing Intelligence" && <TrendingUp className="w-10 h-10 text-[#B8860B]" />}
                          {report.category === "Clinical Intelligence" && <Activity className="w-10 h-10 text-[#B8860B]" />}
                          {report.category === "Benchmarking" && <Database className="w-10 h-10 text-[#B8860B]" />}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Methodology Section */}
        <section className="py-16 border-t border-[#1F2937]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-serif font-bold text-white mb-6">
                Research Methodology & Analytical Rigor
              </h2>
              
              <div className="space-y-6">
                <p className="text-neutral-300 leading-relaxed text-lg">
                  Each intelligence report in the Kincaid IQ series undergoes rigorous forensic analysis employing proprietary actuarial modeling frameworks, contract intelligence algorithms, and evidence-based validation protocols. Our methodologies comply with Actuarial Standards of Practice and withstand regulatory scrutiny in ERISA fiduciary contexts.
                </p>
                
                <h3 className="text-xl font-serif font-semibold text-white pt-4">Core Analytical Frameworks</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-[#151B23] border border-[#2A3F54] rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Microscope className="w-6 h-6 text-[#B8860B]" />
                      <h4 className="font-semibold text-white">Actuarial Science</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-neutral-300">
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-0.5 text-[#B8860B] flex-shrink-0" />
                        <span>Monte Carlo simulation with 10,000+ scenario iterations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-0.5 text-[#B8860B] flex-shrink-0" />
                        <span>Credibility theory and Bayesian updating</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-0.5 text-[#B8860B] flex-shrink-0" />
                        <span>Time-series decomposition (trend, seasonal, irregular)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-0.5 text-[#B8860B] flex-shrink-0" />
                        <span>IBNR reserve estimation via chain-ladder methods</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-[#151B23] border border-[#2A3F54] rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Shield className="w-6 h-6 text-[#B8860B]" />
                      <h4 className="font-semibold text-white">Contract Intelligence</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-neutral-300">
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-0.5 text-[#B8860B] flex-shrink-0" />
                        <span>Semantic NLP clause extraction and classification</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-0.5 text-[#B8860B] flex-shrink-0" />
                        <span>Financial obligation mapping and quantification</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-0.5 text-[#B8860B] flex-shrink-0" />
                        <span>Regulatory compliance validation (ERISA, HIPAA, ACA)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-0.5 text-[#B8860B] flex-shrink-0" />
                        <span>Material breach identification and evidence assembly</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-[#151B23] border border-[#2A3F54] rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <BarChart3 className="w-6 h-6 text-[#B8860B]" />
                      <h4 className="font-semibold text-white">Statistical Analysis</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-neutral-300">
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-0.5 text-[#B8860B] flex-shrink-0" />
                        <span>Hypothesis testing (t-tests, ANOVA, chi-square)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-0.5 text-[#B8860B] flex-shrink-0" />
                        <span>Regression modeling (OLS, GLM, mixed effects)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-0.5 text-[#B8860B] flex-shrink-0" />
                        <span>Outlier detection (Tukey, IQR, Mahalanobis distance)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-0.5 text-[#B8860B] flex-shrink-0" />
                        <span>Propensity score matching for causal inference</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-[#151B23] border border-[#2A3F54] rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Target className="w-6 h-6 text-[#B8860B]" />
                      <h4 className="font-semibold text-white">Benchmarking Standards</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-neutral-300">
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-0.5 text-[#B8860B] flex-shrink-0" />
                        <span>NADAC federal pricing references (CMS)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-0.5 text-[#B8860B] flex-shrink-0" />
                        <span>Industry percentile rankings (Truven, IQVIA)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-0.5 text-[#B8860B] flex-shrink-0" />
                        <span>Clinical guideline validation (NCCN, ADA, ACC/AHA)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-0.5 text-[#B8860B] flex-shrink-0" />
                        <span>Actuarial Standards of Practice (ASOP) compliance</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="border-l-4 border-[#1A3A52] pl-6 py-4 bg-[#151B23] rounded-r-lg mt-8">
                  <h4 className="text-sm font-semibold text-white mb-3">Professional Standards & Peer Review</h4>
                  <p className="text-neutral-300 leading-relaxed text-sm">
                    All published intelligence reports undergo peer review by credentialed actuaries (FSA, ASA, EA) and comply with relevant Actuarial Standards of Practice. Findings are validated against industry benchmarks, regulatory guidance, and peer-reviewed actuarial literature to ensure analytical rigor and professional defensibility in fiduciary contexts. Each report includes complete methodology disclosure, sensitivity analyses, and limitations statements per professional standards.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-12 border-t border-[#1F2937]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#1A3A52]/20 border border-[#1A3A52] flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-[#B8860B]" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Actuarial Credentialed</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    All reports authored by FSA, ASA, or EA credentialed actuaries. Peer review by independent actuaries with relevant specialty certification (health, pension, enterprise risk).
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#1A3A52]/20 border border-[#1A3A52] flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-[#B8860B]" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">ERISA Compliant</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    Analysis frameworks align with ERISA fiduciary standards, DOL guidance on prudent benefit administration, and litigation-tested documentation requirements.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#1A3A52]/20 border border-[#1A3A52] flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-[#B8860B]" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Evidence-Based</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    Every finding substantiated with primary source documentation, regulatory citations, peer-reviewed literature, or quantitative analysis with disclosed methodology.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 border-t border-[#1F2937]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-serif font-bold text-white mb-6">
                Request Custom Intelligence Brief
              </h2>
              
              <p className="text-lg text-neutral-300 mb-8 leading-relaxed">
                Our forensic analysis team produces customized intelligence reports tailored to your organization's PBM contracts, claims experience, and risk profile. Each engagement employs the same rigorous methodology as our published series, with deliverables designed for board presentation and regulatory defense.
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/request-demo">
                  <Button className="bg-[#1A3A52] hover:bg-[#234766] text-white font-semibold">
                    Schedule Consultation
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="border-[#2A3F54] bg-transparent text-neutral-200 hover:bg-[#151B23] hover:text-white">
                    Contact Intelligence Team
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}