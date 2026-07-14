import { useState } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import Link from "next/link";
import Nav from "@/components/Nav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ParticleField3D } from "@/components/premium/ParticleField3D";
import {
  TrendingUp,
  Activity,
  Shield,
  BarChart3,
  Calculator,
  Users,
  FileText,
  AlertTriangle,
  Zap,
  Database,
  Target,
  Pill,
  HeartPulse,
  Building2,
  Briefcase,
  DollarSign
} from "lucide-react";

const engineCategories = [
  { id: "forecasting", label: "Forecasting & Trend", icon: TrendingUp },
  { id: "normalization", label: "Data Normalization", icon: Activity },
  { id: "risk", label: "Risk Analytics", icon: Shield },
  { id: "interventions", label: "Interventions", icon: Target },
  { id: "pharmacy", label: "Pharmacy Intelligence", icon: Pill },
  { id: "governance", label: "Governance & Compliance", icon: FileText },
  { id: "clinical", label: "Clinical Intelligence", icon: HeartPulse },
  { id: "workforce", label: "Workforce Analytics", icon: Users },
  { id: "enterprise", label: "Enterprise Value", icon: Building2 }
];

const allEngines = [
  // Forecasting & Trend (12)
  { id: "medical-trend", name: "Medical Trend Forecasting", category: "forecasting", description: "Time-series forecasting for medical cost trends", href: "/engines/medical-trend-forecasting", complexity: "Standard" },
  { id: "rx-trend", name: "Rx Trend Forecasting", category: "forecasting", description: "Pharmacy trend forecasting with drug pipeline analysis", href: "/engines/rx-trend-forecasting", complexity: "Advanced" },
  { id: "monte-carlo", name: "Monte Carlo Forecasting", category: "forecasting", description: "Probabilistic forecasting with uncertainty quantification", href: "/engines/monte-carlo-forecasting", complexity: "Expert" },
  { id: "catastrophic-claims", name: "Catastrophic Claims Forecasting", category: "forecasting", description: "Tail risk modeling for extreme healthcare events", href: "/engines/catastrophic-claims-forecasting", complexity: "Advanced" },
  { id: "dental-trend", name: "Dental Trend Analysis", category: "forecasting", description: "Dental cost trend forecasting and utilization modeling", href: "/engines/dental-trend-analysis", complexity: "Standard" },
  { id: "vision-trend", name: "Vision Trend Analysis", category: "forecasting", description: "Vision benefit cost forecasting and trend analysis", href: "/engines/vision-trend-analysis", complexity: "Standard" },
  { id: "inflation-decomposition", name: "Inflation Decomposition", category: "forecasting", description: "Healthcare inflation attribution and driver analysis", href: "/engines/inflation-decomposition", complexity: "Advanced" },
  { id: "provider-unit-cost", name: "Provider Unit Cost Trend", category: "forecasting", description: "Provider reimbursement rate trend forecasting", href: "/engines/provider-unit-cost-trend", complexity: "Standard" },
  { id: "utilization-trend", name: "Utilization Trend Engine", category: "forecasting", description: "Service utilization forecasting and pattern detection", href: "/engines/utilization-trend-engine", complexity: "Standard" },
  { id: "healthcare-inflation", name: "Healthcare Inflation Attribution", category: "forecasting", description: "Multi-factor healthcare inflation modeling", href: "/engines/healthcare-inflation-attribution", complexity: "Advanced" },
  { id: "cost-elasticity", name: "Cost Elasticity", category: "forecasting", description: "Price sensitivity and demand response modeling", href: "/engines/cost-elasticity", complexity: "Expert" },
  { id: "ibnr-reserve", name: "IBNR Reserve Modeling", category: "forecasting", description: "Incurred but not reported claims reserve estimation", href: "/engines/ibnr-reserve-modeling", complexity: "Expert" },
  
  // Data Normalization (8)
  { id: "geographic-norm", name: "Geographic Normalization", category: "normalization", description: "Regional cost adjustment and standardization", href: "/engines/geographic-normalization", complexity: "Standard" },
  { id: "age-gender-risk", name: "Age-Gender Risk Adjustment", category: "normalization", description: "Demographic risk standardization", href: "/engines/age-gender-risk-adjustment", complexity: "Standard" },
  { id: "case-mix", name: "Case Mix Adjustment", category: "normalization", description: "Acuity-based cost normalization", href: "/engines/case-mix-adjustment", complexity: "Advanced" },
  { id: "pmpm-norm", name: "PMPM Normalization", category: "normalization", description: "Per-member-per-month standardization", href: "/engines/pmpm-normalization", complexity: "Standard" },
  { id: "seasonality", name: "Seasonality Adjustment", category: "normalization", description: "Temporal pattern removal and smoothing", href: "/engines/seasonality-adjustment", complexity: "Standard" },
  { id: "credibility", name: "Credibility Weighting", category: "normalization", description: "Statistical credibility-weighted estimation", href: "/engines/credibility-weighting", complexity: "Advanced" },
  { id: "pepy-norm", name: "PEPY Normalization", category: "normalization", description: "Per-employee-per-year standardization", href: "/engines/pepy-normalization", complexity: "Standard" },
  { id: "benefit-richness", name: "Benefit Richness Scoring", category: "normalization", description: "Plan design generosity quantification", href: "/engines/benefit-richness-scoring", complexity: "Advanced" },
  
  // Risk Analytics (10)
  { id: "large-claimant", name: "Large Claimant Prediction", category: "risk", description: "Catastrophic claim probability modeling", href: "/engines/large-claimant-prediction", complexity: "Advanced" },
  { id: "high-cost-claimant", name: "High-Cost Claimant Prediction", category: "risk", description: "Machine learning for high-cost member identification", href: "/engines/high-cost-claimant-prediction", complexity: "Advanced" },
  { id: "stop-loss-laser", name: "Stop-Loss Laser Prediction", category: "risk", description: "Specific deductible laser risk forecasting", href: "/engines/stop-loss-laser-prediction", complexity: "Expert" },
  { id: "fraud-prediction", name: "Fraud Prediction", category: "risk", description: "Claims fraud detection and probability scoring", href: "/engines/fraud-prediction", complexity: "Advanced" },
  { id: "chronic-disease", name: "Chronic Disease Progression", category: "risk", description: "Disease progression modeling and cost forecasting", href: "/engines/chronic-disease-progression", complexity: "Advanced" },
  { id: "network-disruption", name: "Network Disruption Modeling", category: "risk", description: "Provider network change impact assessment", href: "/engines/network-disruption-modeling", complexity: "Advanced" },
  { id: "regulatory-exposure", name: "Regulatory Exposure", category: "risk", description: "Compliance and regulatory risk scoring", href: "/engines/regulatory-exposure", complexity: "Advanced" },
  { id: "litigation-probability", name: "Litigation Probability", category: "risk", description: "Fiduciary litigation risk assessment", href: "/engines/litigation-probability", complexity: "Expert" },
  { id: "member-churn", name: "Member Churn Prediction", category: "risk", description: "Employee turnover and retention forecasting", href: "/engines/member-churn-prediction", complexity: "Standard" },
  { id: "benchmark-deviation", name: "Benchmark Deviation", category: "risk", description: "Performance variance from industry benchmarks", href: "/engines/benchmark-deviation", complexity: "Standard" },
  
  // Interventions (12)
  { id: "ebitda", name: "EBITDA Enhancement", category: "interventions", description: "Enterprise value optimization through cost reduction", href: "/engines/ebitda-enhancement", complexity: "Advanced" },
  { id: "site-of-care", name: "Site of Care Migration", category: "interventions", description: "Care setting optimization and cost reduction", href: "/engines/site-of-care-migration", complexity: "Advanced" },
  { id: "reference-pricing", name: "Reference-Based Pricing Savings", category: "interventions", description: "Reference pricing strategy financial modeling", href: "/engines/reference-based-pricing-savings", complexity: "Advanced" },
  { id: "direct-contracting", name: "Direct Contracting Valuation", category: "interventions", description: "Direct provider contract ROI analysis", href: "/engines/direct-contracting-valuation", complexity: "Advanced" },
  { id: "coe-roi", name: "Centers of Excellence ROI", category: "interventions", description: "COE program financial impact modeling", href: "/engines/centers-of-excellence-roi", complexity: "Advanced" },
  { id: "bundled-payment", name: "Bundled Payment Modeling", category: "interventions", description: "Episode-based payment strategy analysis", href: "/engines/bundled-payment-modeling", complexity: "Advanced" },
  { id: "payment-integrity", name: "Payment Integrity Analysis", category: "interventions", description: "Claims overpayment detection and recovery", href: "/engines/payment-integrity-analysis", complexity: "Standard" },
  { id: "waste-fraud", name: "Waste, Fraud & Abuse Detection", category: "interventions", description: "Systematic cost leakage identification", href: "/engines/waste-fraud-abuse-detection", complexity: "Advanced" },
  { id: "wellness-roi", name: "Wellness ROI", category: "interventions", description: "Wellness program financial impact quantification", href: "/engines/wellness-roi", complexity: "Standard" },
  { id: "plan-migration", name: "Plan Migration Simulation", category: "interventions", description: "Plan design change impact forecasting", href: "/engines/plan-migration-simulation", complexity: "Advanced" },
  { id: "employer-cost-shift", name: "Employer Cost Shifting", category: "interventions", description: "Member cost-sharing strategy optimization", href: "/engines/employer-cost-shifting", complexity: "Standard" },
  { id: "benefit-harmonization", name: "Benefit Harmonization", category: "interventions", description: "Multi-entity benefit alignment and optimization", href: "/engines/benefit-harmonization", complexity: "Advanced" },
  
  // Pharmacy Intelligence (9)
  { id: "glp1-impact", name: "GLP-1 Financial Impact", category: "pharmacy", description: "Obesity drug cost modeling and forecasting", href: "/engines/glp1-financial-impact", complexity: "Advanced" },
  { id: "gene-therapy", name: "Gene Therapy Exposure", category: "pharmacy", description: "Ultra-high-cost gene therapy risk assessment", href: "/engines/gene-therapy-exposure", complexity: "Expert" },
  { id: "oncology-cost", name: "Oncology Cost Projection", category: "pharmacy", description: "Cancer drug pipeline and cost forecasting", href: "/engines/oncology-cost-projection", complexity: "Advanced" },
  { id: "specialty-pharmacy", name: "Specialty Pharmacy Economics", category: "pharmacy", description: "Specialty drug cost modeling and optimization", href: "/engines/specialty-pharmacy-economics", complexity: "Advanced" },
  { id: "biosimilar-adoption", name: "Biosimilar Adoption Modeling", category: "pharmacy", description: "Biosimilar uptake and savings forecasting", href: "/engines/biosimilar-adoption-modeling", complexity: "Advanced" },
  { id: "drug-pipeline", name: "Drug Pipeline Forecasting", category: "pharmacy", description: "FDA approval pipeline impact modeling", href: "/engines/drug-pipeline-forecasting", complexity: "Expert" },
  { id: "rebate-optimization", name: "Rebate Optimization", category: "pharmacy", description: "Formulary design and rebate maximization", href: "/engines/rebate-optimization", complexity: "Advanced" },
  { id: "pbm-spread", name: "PBM Spread Pricing Detection", category: "pharmacy", description: "Hidden pharmacy benefit manager markup identification", href: "/engines/pbm-spread-pricing-detection", complexity: "Advanced" },
  { id: "rx-adherence", name: "Rx Adherence Prediction", category: "pharmacy", description: "Medication compliance forecasting", href: "/engines/rx-adherence-prediction", complexity: "Standard" },
  
  // Governance & Compliance (10)
  { id: "erisa-risk", name: "ERISA Fiduciary Risk Scoring", category: "governance", description: "Fiduciary obligation compliance assessment", href: "/engines/erisa-fiduciary-risk-scoring", complexity: "Expert" },
  { id: "pbm-contract", name: "PBM Contract Scoring", category: "governance", description: "Pharmacy contract fiduciary analysis", href: "/engines/pbm-contract-scoring", complexity: "Advanced" },
  { id: "stop-loss-contract", name: "Stop-Loss Contract Scoring", category: "governance", description: "Stop-loss insurance contract evaluation", href: "/engines/stop-loss-contract-scoring", complexity: "Advanced" },
  { id: "hidden-revenue", name: "Hidden Revenue Detection", category: "governance", description: "Undisclosed vendor compensation identification", href: "/engines/hidden-revenue-detection", complexity: "Advanced" },
  { id: "audit-readiness", name: "Audit Readiness Scoring", category: "governance", description: "Fiduciary audit preparedness assessment", href: "/engines/audit-readiness-scoring", complexity: "Standard" },
  { id: "vendor-compensation", name: "Vendor Compensation Transparency", category: "governance", description: "Vendor payment flow analysis and disclosure", href: "/engines/vendor-compensation-transparency", complexity: "Advanced" },
  { id: "tpa-governance", name: "TPA Governance Scoring", category: "governance", description: "Third-party administrator oversight assessment", href: "/engines/tpa-governance-scoring", complexity: "Advanced" },
  { id: "conflict-interest", name: "Conflict of Interest Analysis", category: "governance", description: "Vendor relationship conflict detection", href: "/engines/conflict-of-interest-analysis", complexity: "Advanced" },
  { id: "governance-maturity", name: "Governance Maturity Assessment", category: "governance", description: "Fiduciary program maturity scoring", href: "/engines/governance-maturity-assessment", complexity: "Standard" },
  { id: "board-oversight", name: "Board Oversight Scoring", category: "governance", description: "Board fiduciary oversight effectiveness", href: "/engines/board-oversight-scoring", complexity: "Advanced" },
  
  // Clinical Intelligence (8)
  { id: "hospital-admission", name: "Hospital Admission Prediction", category: "clinical", description: "Inpatient admission probability forecasting", href: "/engines/hospital-admission-prediction", complexity: "Advanced" },
  { id: "readmission", name: "Readmission Prediction", category: "clinical", description: "30-day readmission risk modeling", href: "/engines/readmission-prediction", complexity: "Advanced" },
  { id: "behavioral-health", name: "Behavioral Health Utilization", category: "clinical", description: "Mental health service utilization forecasting", href: "/engines/behavioral-health-utilization", complexity: "Standard" },
  { id: "disability-forecast", name: "Disability Forecasting", category: "clinical", description: "Short and long-term disability prediction", href: "/engines/disability-forecasting", complexity: "Standard" },
  { id: "episode-valuation", name: "Episode of Care Valuation", category: "clinical", description: "Clinical episode cost benchmarking", href: "/engines/episode-of-care-valuation", complexity: "Advanced" },
  { id: "benefit-plan-design", name: "Benefit Plan Design", category: "clinical", description: "Clinical benefit optimization modeling", href: "/engines/benefit-plan-design", complexity: "Advanced" },
  { id: "dependent-eligibility", name: "Dependent Eligibility", category: "clinical", description: "Dependent coverage validation and auditing", href: "/engines/dependent-eligibility", complexity: "Standard" },
  { id: "member-cost-burden", name: "Member Cost Burden", category: "clinical", description: "Out-of-pocket cost impact assessment", href: "/engines/member-cost-burden", complexity: "Standard" },
  
  // Workforce Analytics (7)
  { id: "workforce-health", name: "Workforce Health Risk", category: "workforce", description: "Employee population health risk assessment", href: "/engines/workforce-health-risk", complexity: "Standard" },
  { id: "absenteeism", name: "Absenteeism Forecasting", category: "workforce", description: "Employee absence prediction and cost modeling", href: "/engines/absenteeism-forecasting", complexity: "Standard" },
  { id: "presenteeism", name: "Presenteeism Impact", category: "workforce", description: "Reduced productivity cost quantification", href: "/engines/presenteeism-impact", complexity: "Advanced" },
  { id: "productivity-loss", name: "Productivity Loss Valuation", category: "workforce", description: "Health-related productivity impact modeling", href: "/engines/productivity-loss-valuation", complexity: "Advanced" },
  { id: "workforce-demo", name: "Workforce Demographics", category: "workforce", description: "Employee population composition analysis", href: "/engines/workforce-demographics", complexity: "Standard" },
  { id: "talent-retention", name: "Talent Retention Risk", category: "workforce", description: "Employee turnover risk prediction", href: "/engines/talent-retention-risk", complexity: "Standard" },
  { id: "board-reporting", name: "Board Reporting Engine", category: "workforce", description: "Executive-level workforce health dashboards", href: "/engines/board-reporting-engine", complexity: "Standard" },
  
  // Enterprise Value (6)
  { id: "enterprise-value", name: "Enterprise Value Creation", category: "enterprise", description: "M&A and exit value optimization through benefits", href: "/engines/enterprise-value-creation", complexity: "Expert" },
  { id: "ai-governance", name: "AI Governance", category: "enterprise", description: "AI/ML model risk management and oversight", href: "/engines/ai-governance", complexity: "Advanced" },
  { id: "compliance-monitoring", name: "Compliance Monitoring", category: "enterprise", description: "Real-time regulatory compliance tracking", href: "/engines/compliance-monitoring", complexity: "Standard" },
  { id: "documentation-complete", name: "Documentation Completeness", category: "enterprise", description: "Fiduciary documentation audit scoring", href: "/engines/documentation-completeness", complexity: "Standard" },
  { id: "decision-traceability", name: "Decision Traceability", category: "enterprise", description: "Fiduciary decision audit trail verification", href: "/engines/decision-traceability", complexity: "Advanced" },
  { id: "procurement-integrity", name: "Procurement Integrity", category: "enterprise", description: "Vendor selection process fiduciary validation", href: "/engines/procurement-integrity", complexity: "Advanced" }
];

export default function EnginesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredEngines = selectedCategory
    ? allEngines.filter(engine => engine.category === selectedCategory)
    : allEngines;

  return (
    <>
      <Head>
        <title>Universal Intelligence Engines | Kincaid Health Data Sciences Lab</title>
        <meta
          name="description"
          content="90+ specialized actuarial engines for healthcare analytics, forecasting, and decision intelligence."
        />
      </Head>

      <Nav />

      <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black relative overflow-hidden">
        <ParticleField3D />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/20 via-transparent to-transparent" />
        
        <main className="container mx-auto px-4 py-8 relative z-10">
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto text-center mb-12"
          >
            <Badge className="mb-4 bg-violet-500/10 text-violet-400 border-violet-500/20 text-sm">
              Universal Intelligence Platform
            </Badge>
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent"
            >
              Intelligence Engines
            </motion.h1>
            <p className="text-xl text-gray-300 mb-4 max-w-4xl mx-auto">
              90+ Specialized Actuarial Engines for Healthcare Analytics
            </p>
            <p className="text-lg text-gray-400 mb-8 max-w-3xl mx-auto">
              Modular, composable intelligence for forecasting, risk modeling, and decision automation
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                { value: "90+", label: "Specialized Engines", color: "violet" },
                { value: "9", label: "Engine Categories", color: "purple" },
                { value: "API", label: "First Architecture", color: "fuchsia" },
                { value: "Real-time", label: "Orchestration", color: "pink" }
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  className="perspective-1000"
                >
                  <Card className="border-slate-700 bg-slate-900/50 backdrop-blur-sm transform-gpu transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/20">
                    <CardContent className="pt-6 text-center">
                      <div className={`text-3xl font-bold text-${stat.color}-400 mb-1`}>{stat.value}</div>
                      <div className="text-xs text-slate-400">{stat.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Category Filter */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-3 justify-center mb-12"
          >
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => setSelectedCategory(null)}
              className="rounded-full"
            >
              All Engines
            </Button>
            {engineCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="rounded-full"
              >
                <category.icon className="w-4 h-4 mr-2" />
                {category.label}
              </Button>
            ))}
          </motion.div>

          {/* Engines Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {filteredEngines.map((engine, idx) => {
              const categoryInfo = engineCategories.find(c => c.id === engine.category);
              const CategoryIcon = categoryInfo?.icon || Activity;
              
              return (
                <motion.div
                  key={engine.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: (idx % 12) * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.03, rotateY: 3, z: 50 }}
                  className="perspective-1000"
                >
                  <Link href={engine.href}>
                    <Card className="border-slate-700 bg-slate-900/50 backdrop-blur-sm hover:border-violet-500/50 transition-all h-full transform-gpu hover:shadow-2xl hover:shadow-violet-500/20 cursor-pointer">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-3">
                          <div className="w-12 h-12 bg-violet-500/10 rounded-lg flex items-center justify-center">
                            <CategoryIcon className="w-6 h-6 text-violet-400" />
                          </div>
                          <Badge variant="outline" className="text-xs border-slate-600">
                            {categoryInfo?.label}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg text-white group-hover:text-violet-300 transition-colors">
                          {engine.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-slate-400 mb-4">{engine.description}</p>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-500">Learn more →</span>
                          <Badge variant="secondary" className="bg-slate-800/50">
                            {engine.complexity}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </main>
      </div>
    </>
  );
}