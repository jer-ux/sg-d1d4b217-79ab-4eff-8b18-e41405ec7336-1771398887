import Head from "next/head";
import Link from "next/link";
import Nav from "@/components/Nav";
import {
  Activity,
  TrendingUp,
  BarChart3,
  Brain,
  Shield,
  Zap,
  Target,
  Users,
  DollarSign,
} from "lucide-react";
import { SEO } from "@/components/SEO";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

const engineCategories = [
  { id: "forecasting", label: "Forecasting & Trend", icon: TrendingUp },
  { id: "normalization", label: "Data Normalization", icon: BarChart3 },
  { id: "risk", label: "Risk Analytics", icon: Shield },
  { id: "interventions", label: "Interventions & Savings", icon: Target },
  { id: "pharmacy", label: "Pharmacy Intelligence", icon: Activity },
  { id: "governance", label: "Governance & Compliance", icon: Shield },
  { id: "clinical", label: "Clinical Intelligence", icon: Brain },
  { id: "workforce", label: "Workforce Analytics", icon: Users },
  { id: "enterprise", label: "Enterprise Value", icon: DollarSign },
];

const engines = [
  // Forecasting & Trend (12)
  { id: "medical-trend", name: "Medical Trend Forecasting", href: "/engines/medical-trend-forecasting", category: "forecasting", description: "Time-series forecasting for medical cost trends", complexity: "Core" },
  { id: "rx-trend", name: "Rx Trend Forecasting", href: "/engines/rx-trend-forecasting", category: "forecasting", description: "Pharmacy trend forecasting with drug pipeline analysis", complexity: "Core" },
  { id: "catastrophic-claims", name: "Catastrophic Claims Forecasting", href: "/engines/catastrophic-claims-forecasting", category: "forecasting", description: "Tail risk modeling for extreme healthcare events", complexity: "Advanced" },
  { id: "high-cost-claimant", name: "High Cost Claimant Prediction", href: "/engines/high-cost-claimant-prediction", category: "forecasting", description: "Predictive modeling for catastrophic claim probability", complexity: "Advanced" },
  { id: "monte-carlo", name: "Monte Carlo Forecasting", href: "/engines/monte-carlo-forecasting", category: "forecasting", description: "Probabilistic forecasting with uncertainty quantification", complexity: "Advanced" },
  { id: "dental-trend", name: "Dental Trend Analysis", href: "/engines/dental-trend-analysis", category: "forecasting", description: "Dental cost trend forecasting and utilization modeling", complexity: "Standard" },
  { id: "vision-trend", name: "Vision Trend Analysis", href: "/engines/vision-trend-analysis", category: "forecasting", description: "Vision benefit cost forecasting and trend analysis", complexity: "Standard" },
  { id: "inflation-decomp", name: "Inflation Decomposition", href: "/engines/inflation-decomposition", category: "forecasting", description: "Healthcare inflation attribution and component analysis", complexity: "Advanced" },
  { id: "provider-unit-cost", name: "Provider Unit Cost Trend", href: "/engines/provider-unit-cost-trend", category: "forecasting", description: "Provider unit cost trend analysis and forecasting", complexity: "Standard" },
  { id: "utilization-trend", name: "Utilization Trend Engine", href: "/engines/utilization-trend-engine", category: "forecasting", description: "Healthcare utilization trend modeling and forecasting", complexity: "Standard" },
  { id: "chronic-disease", name: "Chronic Disease Progression", href: "/engines/chronic-disease-progression", category: "forecasting", description: "Multi-year chronic disease cost progression modeling", complexity: "Advanced" },
  { id: "ibnr-reserve", name: "IBNR Reserve Modeling", href: "/engines/ibnr-reserve-modeling", category: "forecasting", description: "Incurred But Not Reported reserve estimation", complexity: "Advanced" },

  // Data Normalization (8)
  { id: "geographic-norm", name: "Geographic Normalization", href: "/engines/geographic-normalization", category: "normalization", description: "Geographic cost adjustment and market normalization", complexity: "Core" },
  { id: "age-gender-risk", name: "Age/Gender Risk Adjustment", href: "/engines/age-gender-risk-adjustment", category: "normalization", description: "Demographic risk adjustment and normalization", complexity: "Core" },
  { id: "case-mix", name: "Case Mix Adjustment", href: "/engines/case-mix-adjustment", category: "normalization", description: "Clinical complexity and case mix normalization", complexity: "Advanced" },
  { id: "pmpm-norm", name: "PMPM Normalization", href: "/engines/pmpm-normalization", category: "normalization", description: "Per member per month cost standardization", complexity: "Core" },
  { id: "seasonality", name: "Seasonality Adjustment", href: "/engines/seasonality-adjustment", category: "normalization", description: "Seasonal pattern removal and trend isolation", complexity: "Standard" },
  { id: "credibility", name: "Credibility Weighting", href: "/engines/credibility-weighting", category: "normalization", description: "Statistical credibility and volume weighting", complexity: "Advanced" },
  { id: "pepy-norm", name: "PEPY Normalization", href: "/engines/pepy-normalization", category: "normalization", description: "Per employee per year cost standardization", complexity: "Standard" },
  { id: "benefit-richness", name: "Benefit Richness Scoring", href: "/engines/benefit-richness-scoring", category: "normalization", description: "Plan design richness quantification and adjustment", complexity: "Standard" },

  // Risk Analytics (10)
  { id: "glp1-impact", name: "GLP-1 Financial Impact", href: "/engines/glp1-financial-impact", category: "risk", description: "Obesity drug cost modeling and multi-year forecasting", complexity: "Advanced" },
  { id: "gene-therapy", name: "Gene Therapy Exposure", href: "/engines/gene-therapy-exposure", category: "risk", description: "Ultra-high cost gene therapy financial modeling", complexity: "Advanced" },
  { id: "oncology-cost", name: "Oncology Cost Projection", href: "/engines/oncology-cost-projection", category: "risk", description: "Cancer treatment cost forecasting and trend analysis", complexity: "Advanced" },
  { id: "stop-loss-laser", name: "Stop Loss Laser Prediction", href: "/engines/stop-loss-laser-prediction", category: "risk", description: "Specific deductible laser prediction and pricing", complexity: "Advanced" },
  { id: "hospital-admission", name: "Hospital Admission Prediction", href: "/engines/hospital-admission-prediction", category: "risk", description: "Inpatient admission probability and cost modeling", complexity: "Advanced" },
  { id: "readmission", name: "Readmission Prediction", href: "/engines/readmission-prediction", category: "risk", description: "30-day hospital readmission prediction and cost", complexity: "Advanced" },
  { id: "workforce-health", name: "Workforce Health Risk", href: "/engines/workforce-health-risk", category: "risk", description: "Employee population health risk scoring and segmentation", complexity: "Standard" },
  { id: "fraud-prediction", name: "Fraud Prediction", href: "/engines/fraud-prediction", category: "risk", description: "Healthcare fraud and abuse detection algorithms", complexity: "Advanced" },
  { id: "network-disruption", name: "Network Disruption Modeling", href: "/engines/network-disruption-modeling", category: "risk", description: "Provider network change impact and cost modeling", complexity: "Advanced" },
  { id: "cost-elasticity", name: "Cost Elasticity", href: "/engines/cost-elasticity", category: "risk", description: "Member cost-sharing elasticity and utilization impact", complexity: "Advanced" },

  // Interventions & Savings (12)
  { id: "site-of-care", name: "Site of Care Migration", href: "/engines/site-of-care-migration", category: "interventions", description: "Cost optimization through care setting migration", complexity: "Standard" },
  { id: "reference-pricing", name: "Reference Based Pricing Savings", href: "/engines/reference-based-pricing-savings", category: "interventions", description: "Reference-based pricing savings modeling", complexity: "Standard" },
  { id: "direct-contracting", name: "Direct Contracting Valuation", href: "/engines/direct-contracting-valuation", category: "interventions", description: "Direct provider contract savings estimation", complexity: "Standard" },
  { id: "coe-roi", name: "Centers of Excellence ROI", href: "/engines/centers-of-excellence-roi", category: "interventions", description: "Center of excellence program return on investment", complexity: "Standard" },
  { id: "bundled-payment", name: "Bundled Payment Modeling", href: "/engines/bundled-payment-modeling", category: "interventions", description: "Episode-based bundled payment savings estimation", complexity: "Standard" },
  { id: "payment-integrity", name: "Payment Integrity Analysis", href: "/engines/payment-integrity-analysis", category: "interventions", description: "Claims payment accuracy and recovery modeling", complexity: "Standard" },
  { id: "waste-fraud-abuse", name: "Waste Fraud Abuse Detection", href: "/engines/waste-fraud-abuse-detection", category: "interventions", description: "Healthcare waste, fraud, and abuse identification", complexity: "Advanced" },
  { id: "episode-valuation", name: "Episode of Care Valuation", href: "/engines/episode-of-care-valuation", category: "interventions", description: "Episode-based cost and quality performance measurement", complexity: "Standard" },
  { id: "wellness-roi", name: "Wellness ROI", href: "/engines/wellness-roi", category: "interventions", description: "Workplace wellness program return on investment", complexity: "Standard" },
  { id: "plan-migration", name: "Plan Migration Simulation", href: "/engines/plan-migration-simulation", category: "interventions", description: "Plan design change impact and member migration modeling", complexity: "Advanced" },
  { id: "employer-cost-shifting", name: "Employer Cost Shifting", href: "/engines/employer-cost-shifting", category: "interventions", description: "Member cost-sharing strategy impact modeling", complexity: "Standard" },
  { id: "benefit-harmonization", name: "Benefit Harmonization", href: "/engines/benefit-harmonization", category: "interventions", description: "Multi-site benefit standardization and savings modeling", complexity: "Standard" },

  // Pharmacy Intelligence (9)
  { id: "specialty-pharma", name: "Specialty Pharmacy Economics", href: "/engines/specialty-pharmacy-economics", category: "pharmacy", description: "High-cost specialty drug utilization and cost modeling", complexity: "Advanced" },
  { id: "biosimilar-adoption", name: "Biosimilar Adoption Modeling", href: "/engines/biosimilar-adoption-modeling", category: "pharmacy", description: "Biosimilar market penetration and savings forecasting", complexity: "Advanced" },
  { id: "drug-pipeline", name: "Drug Pipeline Forecasting", href: "/engines/drug-pipeline-forecasting", category: "pharmacy", description: "New drug approval and market impact modeling", complexity: "Advanced" },
  { id: "rebate-optimization", name: "Rebate Optimization", href: "/engines/rebate-optimization", category: "pharmacy", description: "Pharmacy rebate and formulary optimization modeling", complexity: "Advanced" },
  { id: "pbm-spread", name: "PBM Spread Pricing Detection", href: "/engines/pbm-spread-pricing-detection", category: "pharmacy", description: "PBM spread pricing identification and quantification", complexity: "Advanced" },
  { id: "rx-adherence", name: "Rx Adherence Prediction", href: "/engines/rx-adherence-prediction", category: "pharmacy", description: "Medication adherence prediction and intervention targeting", complexity: "Standard" },
  { id: "formulary-analytics", name: "Formulary Analytics", href: "/engines/demo", category: "pharmacy", description: "Formulary optimization and tier strategy analysis", complexity: "Standard" },
  { id: "rebate-economics", name: "Rebate Economics", href: "/engines/demo", category: "pharmacy", description: "PBM rebate economics and pass-through modeling", complexity: "Advanced" },
  { id: "drug-utilization", name: "Drug Utilization Management", href: "/engines/demo", category: "pharmacy", description: "Prior authorization and step therapy impact modeling", complexity: "Standard" },

  // Governance & Compliance (10)
  { id: "erisa-risk", name: "ERISA Fiduciary Risk Scoring", href: "/engines/erisa-fiduciary-risk-scoring", category: "governance", description: "ERISA fiduciary compliance and risk assessment", complexity: "Advanced" },
  { id: "pbm-contract", name: "PBM Contract Scoring", href: "/engines/pbm-contract-scoring", category: "governance", description: "PBM contract language and performance scoring", complexity: "Advanced" },
  { id: "stop-loss-contract", name: "Stop Loss Contract Scoring", href: "/engines/stop-loss-contract-scoring", category: "governance", description: "Stop loss insurance contract risk assessment", complexity: "Advanced" },
  { id: "hidden-revenue", name: "Hidden Revenue Detection", href: "/engines/hidden-revenue-detection", category: "governance", description: "Vendor hidden revenue stream identification", complexity: "Advanced" },
  { id: "audit-readiness", name: "Audit Readiness Scoring", href: "/engines/audit-readiness-scoring", category: "governance", description: "Plan audit preparedness and compliance assessment", complexity: "Standard" },
  { id: "board-reporting", name: "Board Reporting Engine", href: "/engines/board-reporting-engine", category: "governance", description: "Executive and board-level reporting automation", complexity: "Standard" },
  { id: "governance-maturity", name: "Governance Maturity Assessment", href: "/engines/governance-maturity-assessment", category: "governance", description: "Healthcare governance maturity scoring and benchmarking", complexity: "Standard" },
  { id: "board-oversight", name: "Board Oversight Scoring", href: "/engines/board-oversight-scoring", category: "governance", description: "Board of directors oversight effectiveness assessment", complexity: "Standard" },
  { id: "conflict-interest", name: "Conflict of Interest Analysis", href: "/engines/conflict-of-interest-analysis", category: "governance", description: "Vendor and advisor conflict of interest detection", complexity: "Advanced" },
  { id: "vendor-transparency", name: "Vendor Compensation Transparency", href: "/engines/vendor-compensation-transparency", category: "governance", description: "Healthcare vendor compensation disclosure analysis", complexity: "Advanced" },

  // Clinical Intelligence (8)
  { id: "absenteeism", name: "Absenteeism Forecasting", href: "/engines/absenteeism-forecasting", category: "clinical", description: "Employee absence prediction and cost modeling", complexity: "Standard" },
  { id: "presenteeism", name: "Presenteeism Impact", href: "/engines/presenteeism-impact", category: "clinical", description: "On-the-job productivity loss measurement and valuation", complexity: "Standard" },
  { id: "productivity-loss", name: "Productivity Loss Valuation", href: "/engines/productivity-loss-valuation", category: "clinical", description: "Health-related productivity loss economic modeling", complexity: "Standard" },
  { id: "workforce-demographics", name: "Workforce Demographics", href: "/engines/workforce-demographics", category: "clinical", description: "Employee population demographic risk profiling", complexity: "Standard" },
  { id: "disability-forecasting", name: "Disability Forecasting", href: "/engines/disability-forecasting", category: "clinical", description: "Short and long-term disability cost forecasting", complexity: "Standard" },
  { id: "behavioral-health", name: "Behavioral Health Utilization", href: "/engines/behavioral-health-utilization", category: "clinical", description: "Mental health and substance abuse utilization modeling", complexity: "Standard" },
  { id: "talent-retention", name: "Talent Retention Risk", href: "/engines/talent-retention-risk", category: "clinical", description: "Health-related employee turnover prediction", complexity: "Standard" },
  { id: "member-churn", name: "Member Churn Prediction", href: "/engines/member-churn-prediction", category: "clinical", description: "Health plan member attrition forecasting", complexity: "Standard" },

  // Workforce Analytics (7)
  { id: "tpa-governance", name: "TPA Governance Scoring", href: "/engines/tpa-governance-scoring", category: "workforce", description: "Third-party administrator performance and governance assessment", complexity: "Standard" },
  { id: "member-cost-burden", name: "Member Cost Burden", href: "/engines/member-cost-burden", category: "workforce", description: "Employee out-of-pocket cost burden analysis", complexity: "Standard" },
  { id: "benefit-plan-design", name: "Benefit Plan Design", href: "/engines/benefit-plan-design", category: "workforce", description: "Optimal benefit design modeling and simulation", complexity: "Standard" },
  { id: "dependent-eligibility", name: "Dependent Eligibility", href: "/engines/dependent-eligibility", category: "workforce", description: "Dependent eligibility audit and compliance modeling", complexity: "Standard" },
  { id: "ai-governance", name: "AI Governance", href: "/engines/ai-governance", category: "workforce", description: "AI system governance and risk management framework", complexity: "Advanced" },
  { id: "compliance-monitoring", name: "Compliance Monitoring", href: "/engines/compliance-monitoring", category: "workforce", description: "Regulatory compliance monitoring and alerting", complexity: "Standard" },
  { id: "regulatory-exposure", name: "Regulatory Exposure", href: "/engines/regulatory-exposure", category: "workforce", description: "Healthcare regulatory risk and exposure assessment", complexity: "Advanced" },

  // Enterprise Value (6)
  { id: "ebitda-enhancement", name: "EBITDA Enhancement", href: "/engines/ebitda-enhancement", category: "enterprise", description: "Enterprise value optimization through healthcare cost reduction", complexity: "Advanced" },
  { id: "enterprise-value-creation", name: "Enterprise Value Creation", href: "/engines/enterprise-value-creation", category: "enterprise", description: "M&A healthcare cost due diligence and value creation modeling", complexity: "Advanced" },
  { id: "large-claimant", name: "Large Claimant Prediction", href: "/engines/large-claimant-prediction", category: "enterprise", description: "Predictive modeling for catastrophic claim probability", complexity: "Advanced" },
  { id: "litigation-probability", name: "Litigation Probability", href: "/engines/litigation-probability", category: "enterprise", description: "Healthcare litigation risk assessment and prediction", complexity: "Advanced" },
  { id: "documentation-completeness", name: "Documentation Completeness", href: "/engines/documentation-completeness", category: "enterprise", description: "Healthcare plan documentation audit and completeness scoring", complexity: "Standard" },
  { id: "decision-traceability", name: "Decision Traceability", href: "/engines/decision-traceability", category: "enterprise", description: "Fiduciary decision audit trail and documentation", complexity: "Standard" },
];

export default function EnginesPage() {
  return (
    <>
      <SEO
        title="Universal Intelligence Engines | Kincaid Health Data Sciences Lab"
        description="50+ specialized actuarial engines for healthcare analytics, forecasting, and decision intelligence. Modular, composable intelligence for self-insured employers and health plans."
      />

      <Nav />

      <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4">
                Universal Intelligence Platform
              </Badge>
              <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Intelligence Engines
              </h1>
              <p className="text-xl text-slate-300 mb-4">
                82 Specialized Actuarial Engines for Healthcare Analytics
              </p>
              <p className="text-lg text-slate-400 max-w-3xl mx-auto">
                Modular, composable intelligence for forecasting, risk modeling, and decision automation
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">82</div>
                <div className="text-sm text-slate-400">Specialized Engines</div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">9</div>
                <div className="text-sm text-slate-400">Engine Categories</div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-pink-400 mb-2">API</div>
                <div className="text-sm text-slate-400">First Architecture</div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">Real-time</div>
                <div className="text-sm text-slate-400">Orchestration</div>
              </div>
            </div>

            {/* Engine Categories */}
            {engineCategories.map((category) => {
              const categoryEngines = engines.filter(
                (engine) => engine.category === category.id
              );
              const CategoryIcon = category.icon;

              return (
                <div key={category.id} className="mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <CategoryIcon className="w-6 h-6 text-blue-400" />
                    <h2 className="text-2xl font-bold text-white">
                      {category.label}
                    </h2>
                    <Badge variant="secondary" className="ml-auto">
                      {categoryEngines.length} Engines
                    </Badge>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categoryEngines.map((engine) => (
                      <Link
                        key={engine.id}
                        href={engine.href}
                        className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6 hover:border-blue-500/50 transition-all"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                            {engine.name}
                          </h3>
                          <Badge variant="outline" className="text-xs">
                            {engine.complexity}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-400 mb-4">
                          {engine.description}
                        </p>
                        <div className="text-sm text-blue-400 group-hover:text-blue-300">
                          Learn more →
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* CTA Section */}
            <div className="mt-16 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-500/20 rounded-lg p-12 text-center">
              <h2 className="text-3xl font-bold mb-4 text-white">
                Ready to Deploy Intelligence?
              </h2>
              <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
                Access the full Universal Intelligence Platform with API-first architecture and real-time orchestration
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/request-demo">Request Demo</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/api-documentation">View API Docs</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}