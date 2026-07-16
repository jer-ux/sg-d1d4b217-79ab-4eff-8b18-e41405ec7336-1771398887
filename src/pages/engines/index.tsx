import Head from "next/head";
import { motion } from "framer-motion";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ParticleField3D } from "@/components/premium/ParticleField3D";
import { NeonGlow } from "@/components/premium/NeonGlow";
import { SEO } from "@/components/SEO";
import {
  TrendingUp,
  Database,
  Shield,
  Zap,
  Pill,
  FileCheck,
  Activity,
  Users,
  DollarSign,
  BarChart3,
  Brain,
  Target,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";

const engineCategories = [
  {
    id: "forecasting",
    label: "Forecasting & Trend",
    icon: TrendingUp,
    color: "blue",
    gradient: "from-blue-600 to-cyan-500",
    glow: "blue",
    engines: [
      {
        id: "medical-trend-forecasting",
        name: "Medical Trend Forecasting",
        href: "/engines/medical-trend-forecasting",
        description: "Time-series forecasting for medical cost trends",
      },
      {
        id: "rx-trend-forecasting",
        name: "Rx Trend Forecasting",
        href: "/engines/rx-trend-forecasting",
        description: "Pharmacy trend forecasting with drug pipeline analysis",
      },
      {
        id: "monte-carlo-forecasting",
        name: "Monte Carlo Forecasting",
        href: "/engines/monte-carlo-forecasting",
        description: "Probabilistic forecasting with uncertainty quantification",
      },
      {
        id: "catastrophic-claims-forecasting",
        name: "Catastrophic Claims Forecasting",
        href: "/engines/catastrophic-claims-forecasting",
        description: "Tail risk modeling for extreme healthcare events",
      },
      {
        id: "dental-trend-analysis",
        name: "Dental Trend Analysis",
        href: "/engines/dental-trend-analysis",
        description: "Dental claims forecasting and cost trend analysis",
      },
      {
        id: "vision-trend-analysis",
        name: "Vision Trend Analysis",
        href: "/engines/vision-trend-analysis",
        description: "Vision benefits trend forecasting and utilization modeling",
      },
      {
        id: "inflation-decomposition",
        name: "Inflation Decomposition",
        href: "/engines/inflation-decomposition",
        description: "Medical inflation attribution by component drivers",
      },
      {
        id: "provider-unit-cost-trend",
        name: "Provider Unit Cost Trend",
        href: "/engines/provider-unit-cost-trend",
        description: "Provider contract rate inflation and unit cost forecasting",
      },
      {
        id: "utilization-trend-engine",
        name: "Utilization Trend Engine",
        href: "/engines/utilization-trend-engine",
        description: "Service utilization forecasting across categories",
      },
      {
        id: "drug-pipeline-forecasting",
        name: "Drug Pipeline Forecasting",
        href: "/engines/drug-pipeline-forecasting",
        description: "FDA pipeline impact modeling for specialty drugs",
      },
      {
        id: "healthcare-inflation-attribution",
        name: "Healthcare Inflation Attribution",
        href: "/engines/healthcare-inflation-attribution",
        description: "Root cause analysis of medical trend drivers",
      },
      {
        id: "cost-elasticity",
        name: "Cost Elasticity",
        href: "/engines/cost-elasticity",
        description: "Member cost-sharing impact on utilization",
      },
    ],
  },
  {
    id: "normalization",
    label: "Data Normalization",
    icon: Database,
    color: "purple",
    gradient: "from-purple-600 to-violet-500",
    glow: "purple",
    engines: [
      {
        id: "geographic-normalization",
        name: "Geographic Normalization",
        href: "/engines/geographic-normalization",
        description: "Cost adjustments for geographic variation",
      },
      {
        id: "age-gender-risk-adjustment",
        name: "Age/Gender Risk Adjustment",
        href: "/engines/age-gender-risk-adjustment",
        description: "Demographic risk normalization",
      },
      {
        id: "case-mix-adjustment",
        name: "Case Mix Adjustment",
        href: "/engines/case-mix-adjustment",
        description: "Severity and acuity normalization",
      },
      {
        id: "pmpm-normalization",
        name: "PMPM Normalization",
        href: "/engines/pmpm-normalization",
        description: "Per-member cost standardization",
      },
      {
        id: "seasonality-adjustment",
        name: "Seasonality Adjustment",
        href: "/engines/seasonality-adjustment",
        description: "Temporal pattern normalization",
      },
      {
        id: "credibility-weighting",
        name: "Credibility Weighting",
        href: "/engines/credibility-weighting",
        description: "Statistical credibility for small populations",
      },
      {
        id: "pepy-normalization",
        name: "PEPY Normalization",
        href: "/engines/pepy-normalization",
        description: "Per-employee-per-year cost standardization",
      },
      {
        id: "benefit-richness-scoring",
        name: "Benefit Richness Scoring",
        href: "/engines/benefit-richness-scoring",
        description: "Plan design normalization for benchmarking",
      },
    ],
  },
  {
    id: "risk",
    label: "Risk Analytics",
    icon: Shield,
    color: "red",
    gradient: "from-red-600 to-rose-500",
    glow: "red",
    engines: [
      {
        id: "high-cost-claimant-prediction",
        name: "High-Cost Claimant Prediction",
        href: "/engines/high-cost-claimant-prediction",
        description: "Predictive modeling for catastrophic claim probability",
      },
      {
        id: "large-claimant-prediction",
        name: "Large Claimant Prediction",
        href: "/engines/large-claimant-prediction",
        description: "Machine learning for high-cost member identification",
      },
      {
        id: "stop-loss-laser-prediction",
        name: "Stop-Loss Laser Prediction",
        href: "/engines/stop-loss-laser-prediction",
        description: "Individual member laser prediction modeling",
      },
      {
        id: "chronic-disease-progression",
        name: "Chronic Disease Progression",
        href: "/engines/chronic-disease-progression",
        description: "Disease trajectory forecasting and intervention timing",
      },
      {
        id: "hospital-admission-prediction",
        name: "Hospital Admission Prediction",
        href: "/engines/hospital-admission-prediction",
        description: "Inpatient admission probability modeling",
      },
      {
        id: "readmission-prediction",
        name: "Readmission Prediction",
        href: "/engines/readmission-prediction",
        description: "30-day readmission risk scoring",
      },
      {
        id: "fraud-prediction",
        name: "Fraud Prediction",
        href: "/engines/fraud-prediction",
        description: "Anomaly detection for fraudulent claims",
      },
      {
        id: "waste-fraud-abuse-detection",
        name: "Waste, Fraud & Abuse Detection",
        href: "/engines/waste-fraud-abuse-detection",
        description: "Payment integrity and improper billing detection",
      },
      {
        id: "litigation-probability",
        name: "Litigation Probability",
        href: "/engines/litigation-probability",
        description: "Legal risk scoring for plan operations",
      },
      {
        id: "regulatory-exposure",
        name: "Regulatory Exposure",
        href: "/engines/regulatory-exposure",
        description: "Compliance risk quantification",
      },
    ],
  },
  {
    id: "interventions",
    label: "Interventions",
    icon: Zap,
    color: "green",
    gradient: "from-emerald-600 to-green-500",
    glow: "emerald",
    engines: [
      {
        id: "glp1-financial-impact",
        name: "GLP-1 Financial Impact",
        href: "/engines/glp1-financial-impact",
        description: "Obesity drug cost modeling and PMPM impact",
      },
      {
        id: "gene-therapy-exposure",
        name: "Gene Therapy Exposure",
        href: "/engines/gene-therapy-exposure",
        description: "Ultra-high-cost therapy financial modeling",
      },
      {
        id: "oncology-cost-projection",
        name: "Oncology Cost Projection",
        href: "/engines/oncology-cost-projection",
        description: "Cancer treatment cost forecasting",
      },
      {
        id: "site-of-care-migration",
        name: "Site of Care Migration",
        href: "/engines/site-of-care-migration",
        description: "Cost optimization through care setting shifts",
      },
      {
        id: "network-disruption-modeling",
        name: "Network Disruption Modeling",
        href: "/engines/network-disruption-modeling",
        description: "Provider network change impact analysis",
      },
      {
        id: "reference-based-pricing-savings",
        name: "Reference-Based Pricing Savings",
        href: "/engines/reference-based-pricing-savings",
        description: "Medicare-based payment strategy modeling",
      },
      {
        id: "direct-contracting-valuation",
        name: "Direct Contracting Valuation",
        href: "/engines/direct-contracting-valuation",
        description: "Direct provider contract financial modeling",
      },
      {
        id: "centers-of-excellence-roi",
        name: "Centers of Excellence ROI",
        href: "/engines/centers-of-excellence-roi",
        description: "Bundled payment program value quantification",
      },
      {
        id: "bundled-payment-modeling",
        name: "Bundled Payment Modeling",
        href: "/engines/bundled-payment-modeling",
        description: "Episode-based payment strategy analysis",
      },
      {
        id: "plan-migration-simulation",
        name: "Plan Migration Simulation",
        href: "/engines/plan-migration-simulation",
        description: "Plan design change financial modeling",
      },
      {
        id: "wellness-roi",
        name: "Wellness ROI",
        href: "/engines/wellness-roi",
        description: "Prevention program value measurement",
      },
      {
        id: "employer-cost-shifting",
        name: "Employer Cost Shifting",
        href: "/engines/employer-cost-shifting",
        description: "Member cost-share impact modeling",
      },
    ],
  },
  {
    id: "pharmacy",
    label: "Pharmacy Intelligence",
    icon: Pill,
    color: "indigo",
    gradient: "from-indigo-600 to-blue-500",
    glow: "indigo",
    engines: [
      {
        id: "specialty-pharmacy-economics",
        name: "Specialty Pharmacy Economics",
        href: "/engines/specialty-pharmacy-economics",
        description: "High-cost drug financial modeling",
      },
      {
        id: "biosimilar-adoption-modeling",
        name: "Biosimilar Adoption Modeling",
        href: "/engines/biosimilar-adoption-modeling",
        description: "Biologic to biosimilar conversion forecasting",
      },
      {
        id: "rebate-optimization",
        name: "Rebate Optimization",
        href: "/engines/rebate-optimization",
        description: "PBM rebate strategy financial modeling",
      },
      {
        id: "pbm-spread-pricing-detection",
        name: "PBM Spread Pricing Detection",
        href: "/engines/pbm-spread-pricing-detection",
        description: "Hidden pharmacy margin identification",
      },
      {
        id: "formulary-analytics",
        name: "Formulary Analytics",
        href: "/engines/formulary-analytics",
        description: "Drug tier optimization modeling",
      },
      {
        id: "rx-adherence-prediction",
        name: "Rx Adherence Prediction",
        href: "/engines/rx-adherence-prediction",
        description: "Medication compliance forecasting",
      },
      {
        id: "member-churn-prediction",
        name: "Member Churn Prediction",
        href: "/engines/member-churn-prediction",
        description: "Pharmacy benefit attrition modeling",
      },
      {
        id: "payment-integrity-analysis",
        name: "Payment Integrity Analysis",
        href: "/engines/payment-integrity-analysis",
        description: "Pharmacy claims audit and recovery",
      },
      {
        id: "episode-of-care-valuation",
        name: "Episode of Care Valuation",
        href: "/engines/episode-of-care-valuation",
        description: "Treatment pathway cost modeling",
      },
    ],
  },
  {
    id: "governance",
    label: "Governance & Compliance",
    icon: FileCheck,
    color: "yellow",
    gradient: "from-amber-600 to-yellow-500",
    glow: "amber",
    engines: [
      {
        id: "erisa-fiduciary-risk-scoring",
        name: "ERISA Fiduciary Risk Scoring",
        href: "/engines/erisa-fiduciary-risk-scoring",
        description: "Plan sponsor legal exposure quantification",
      },
      {
        id: "pbm-contract-scoring",
        name: "PBM Contract Scoring",
        href: "/engines/pbm-contract-scoring",
        description: "Pharmacy benefit agreement risk assessment",
      },
      {
        id: "stop-loss-contract-scoring",
        name: "Stop-Loss Contract Scoring",
        href: "/engines/stop-loss-contract-scoring",
        description: "Reinsurance contract evaluation",
      },
      {
        id: "hidden-revenue-detection",
        name: "Hidden Revenue Detection",
        href: "/engines/hidden-revenue-detection",
        description: "Vendor compensation transparency analysis",
      },
      {
        id: "audit-readiness-scoring",
        name: "Audit Readiness Scoring",
        href: "/engines/audit-readiness-scoring",
        description: "Plan documentation completeness assessment",
      },
      {
        id: "conflict-of-interest-analysis",
        name: "Conflict of Interest Analysis",
        href: "/engines/conflict-of-interest-analysis",
        description: "Vendor relationship risk scoring",
      },
      {
        id: "governance-maturity-assessment",
        name: "Governance Maturity Assessment",
        href: "/engines/governance-maturity-assessment",
        description: "Fiduciary practice evaluation",
      },
      {
        id: "board-oversight-scoring",
        name: "Board Oversight Scoring",
        href: "/engines/board-oversight-scoring",
        description: "Director engagement measurement",
      },
      {
        id: "ai-governance",
        name: "AI Governance",
        href: "/engines/ai-governance",
        description: "AI decision transparency and audit trail",
      },
      {
        id: "compliance-monitoring",
        name: "Compliance Monitoring",
        href: "/engines/compliance-monitoring",
        description: "Regulatory adherence tracking",
      },
    ],
  },
  {
    id: "clinical",
    label: "Clinical Intelligence",
    icon: Activity,
    color: "teal",
    gradient: "from-teal-600 to-cyan-500",
    glow: "teal",
    engines: [
      {
        id: "ibnr-reserve-modeling",
        name: "IBNR Reserve Modeling",
        href: "/engines/ibnr-reserve-modeling",
        description: "Incurred-but-not-reported claims estimation",
      },
      {
        id: "board-reporting-engine",
        name: "Board Reporting Engine",
        href: "/engines/board-reporting-engine",
        description: "Executive-level healthcare analytics",
      },
      {
        id: "behavioral-health-utilization",
        name: "Behavioral Health Utilization",
        href: "/engines/behavioral-health-utilization",
        description: "Mental health service forecasting",
      },
      {
        id: "disability-forecasting",
        name: "Disability Forecasting",
        href: "/engines/disability-forecasting",
        description: "STD/LTD claim probability modeling",
      },
      {
        id: "dependent-eligibility",
        name: "Dependent Eligibility",
        href: "/engines/dependent-eligibility",
        description: "Coverage fraud detection and auditing",
      },
      {
        id: "documentation-completeness",
        name: "Documentation Completeness",
        href: "/engines/documentation-completeness",
        description: "Plan document audit scoring",
      },
      {
        id: "decision-traceability",
        name: "Decision Traceability",
        href: "/engines/decision-traceability",
        description: "Fiduciary decision documentation",
      },
      {
        id: "procurement-integrity",
        name: "Procurement Integrity",
        href: "/engines/procurement-integrity",
        description: "Vendor selection process evaluation",
      },
    ],
  },
  {
    id: "workforce",
    label: "Workforce Analytics",
    icon: Users,
    color: "pink",
    gradient: "from-pink-600 to-rose-500",
    glow: "pink",
    engines: [
      {
        id: "workforce-health-risk",
        name: "Workforce Health Risk",
        href: "/engines/workforce-health-risk",
        description: "Employee population health risk stratification",
      },
      {
        id: "absenteeism-forecasting",
        name: "Absenteeism Forecasting",
        href: "/engines/absenteeism-forecasting",
        description: "Medical absence trend prediction",
      },
      {
        id: "presenteeism-impact",
        name: "Presenteeism Impact",
        href: "/engines/presenteeism-impact",
        description: "On-the-job productivity loss measurement",
      },
      {
        id: "productivity-loss-valuation",
        name: "Productivity Loss Valuation",
        href: "/engines/productivity-loss-valuation",
        description: "Health-related work output impact",
      },
      {
        id: "workforce-demographics",
        name: "Workforce Demographics",
        href: "/engines/workforce-demographics",
        description: "Population aging and retirement modeling",
      },
      {
        id: "talent-retention-risk",
        name: "Talent Retention Risk",
        href: "/engines/talent-retention-risk",
        description: "Benefits competitiveness assessment",
      },
      {
        id: "benefit-plan-design",
        name: "Benefit Plan Design",
        href: "/engines/benefit-plan-design",
        description: "Coverage optimization modeling",
      },
    ],
  },
  {
    id: "enterprise",
    label: "Enterprise Value",
    icon: DollarSign,
    color: "orange",
    gradient: "from-orange-600 to-amber-500",
    glow: "orange",
    engines: [
      {
        id: "ebitda-enhancement",
        name: "EBITDA Enhancement",
        href: "/engines/ebitda-enhancement",
        description: "Enterprise value creation through healthcare cost reduction",
      },
      {
        id: "enterprise-value-creation",
        name: "Enterprise Value Creation",
        href: "/engines/enterprise-value-creation",
        description: "M&A healthcare cost synergy modeling",
      },
      {
        id: "benefit-harmonization",
        name: "Benefit Harmonization",
        href: "/engines/benefit-harmonization",
        description: "Post-merger benefit integration",
      },
      {
        id: "vendor-compensation-transparency",
        name: "Vendor Compensation Transparency",
        href: "/engines/vendor-compensation-transparency",
        description: "Hidden fee and revenue stream detection",
      },
      {
        id: "tpa-governance-scoring",
        name: "TPA Governance Scoring",
        href: "/engines/tpa-governance-scoring",
        description: "Third-party administrator oversight",
      },
      {
        id: "member-cost-burden",
        name: "Member Cost Burden",
        href: "/engines/member-cost-burden",
        description: "Employee out-of-pocket expense modeling",
      },
    ],
  },
];

export default function EnginesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredEngines = selectedCategory
    ? engineCategories.filter((cat) => cat.id === selectedCategory)
    : engineCategories;

  const totalEngines = engineCategories.reduce(
    (acc, cat) => acc + cat.engines.length,
    0
  );

  return (
    <>
      <Head>
        <title>Intelligence Engines | Kincaid Health Data Sciences Lab</title>
        <meta
          name="description"
          content="82+ specialized actuarial engines for healthcare analytics, forecasting, and decision intelligence. Modular, composable AI for health benefits optimization."
        />
      </Head>
      <SEO
        title="Intelligence Engines | Kincaid Health Data Sciences Lab"
        description="82+ specialized actuarial engines for healthcare analytics, forecasting, and decision intelligence."
      />

      <Nav />

      <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black relative overflow-hidden">
        <ParticleField3D />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-fuchsia-900/10 via-transparent to-transparent" />

        <main className="relative z-10">
          <div className="container mx-auto px-4 py-16 lg:py-24">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-6xl mx-auto text-center mb-16"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative inline-block mb-6"
              >
                <Badge className="relative z-10 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 text-violet-300 border-violet-500/30 text-sm px-6 py-2 backdrop-blur-sm">
                  <Sparkles className="w-4 h-4 mr-2 inline" />
                  Universal Intelligence Platform
                </Badge>
                <div className="absolute inset-0 bg-violet-500/20 blur-xl rounded-full" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight"
              >
                <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent inline-block">
                  Intelligence Engines
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-xl md:text-2xl text-gray-300 mb-4 max-w-4xl mx-auto font-medium"
              >
                {totalEngines} Specialized Actuarial Engines for Healthcare
                Analytics
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto"
              >
                Modular, composable intelligence for forecasting, risk modeling,
                and decision automation
              </motion.p>

              {/* Key Stats with Premium Effects */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                {[
                  {
                    value: `${totalEngines}+`,
                    label: "Specialized Engines",
                    gradient: "from-violet-500 to-purple-500",
                    icon: Brain,
                  },
                  {
                    value: `${engineCategories.length}`,
                    label: "Engine Categories",
                    gradient: "from-purple-500 to-fuchsia-500",
                    icon: Target,
                  },
                  {
                    value: "API",
                    label: "First Architecture",
                    gradient: "from-fuchsia-500 to-pink-500",
                    icon: Zap,
                  },
                  {
                    value: "Real-time",
                    label: "Orchestration",
                    gradient: "from-pink-500 to-rose-500",
                    icon: Activity,
                  },
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + idx * 0.1 }}
                    whileHover={{ 
                      scale: 1.05, 
                      rotateY: 5,
                      transition: { duration: 0.2 }
                    }}
                    className="perspective-1000 group"
                  >
                    <div className="relative">
                      <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 rounded-2xl`} />
                      <Card className="relative border-slate-700/50 bg-slate-900/80 backdrop-blur-xl transform-gpu transition-all duration-300 group-hover:border-slate-600 group-hover:shadow-2xl overflow-hidden">
                        <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-5`} />
                        <CardContent className="relative pt-6 pb-6 text-center">
                          <stat.icon className={`w-8 h-8 mx-auto mb-3 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`} />
                          <div className={`text-3xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}>
                            {stat.value}
                          </div>
                          <div className="text-xs text-slate-400 font-medium">
                            {stat.label}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Category Filter with Premium Styling */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap gap-3 justify-center mb-20"
            >
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                onClick={() => setSelectedCategory(null)}
                className="rounded-full px-6 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 border-0 shadow-lg shadow-violet-500/20"
              >
                All Engines
              </Button>
              {engineCategories.map((category) => (
                <Button
                  key={category.id}
                  variant={
                    selectedCategory === category.id ? "default" : "outline"
                  }
                  onClick={() => setSelectedCategory(category.id)}
                  className={`rounded-full px-5 transition-all duration-300 ${
                    selectedCategory === category.id
                      ? `bg-gradient-to-r ${category.gradient} border-0 shadow-lg`
                      : "border-slate-700 hover:border-slate-600 hover:bg-slate-800"
                  }`}
                >
                  <category.icon className="w-4 h-4 mr-2" />
                  {category.label}
                </Button>
              ))}
            </motion.div>

            {/* Engine Categories with Enhanced Visual Design */}
            <div className="space-y-24 max-w-7xl mx-auto">
              {filteredEngines.map((category, categoryIdx) => {
                const CategoryIcon = category.icon;
                return (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: categoryIdx * 0.1 }}
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    {/* Premium Category Header */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      viewport={{ once: true }}
                      className="relative flex items-center gap-6 mb-12"
                    >
                      <div className="relative group">
                        <div className={`absolute inset-0 bg-gradient-to-r ${category.gradient} blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300 rounded-2xl`} />
                        <div className={`relative w-16 h-16 bg-gradient-to-br ${category.gradient} rounded-2xl flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform duration-300`}>
                          <CategoryIcon className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h2 className={`text-3xl md:text-4xl font-black bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent mb-1`}>
                          {category.label}
                        </h2>
                        <p className="text-sm text-slate-400 font-medium">
                          {category.engines.length} specialized engines
                        </p>
                      </div>
                      <div className={`hidden md:block flex-1 h-px bg-gradient-to-r ${category.gradient} opacity-20`} />
                    </motion.div>

                    {/* Premium Engines Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {category.engines.map((engine, idx) => (
                        <motion.div
                          key={engine.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.5,
                            delay: idx * 0.05,
                          }}
                          viewport={{ once: true, margin: "-50px" }}
                          whileHover={{ 
                            scale: 1.03, 
                            rotateY: 2,
                            z: 50,
                            transition: { duration: 0.2 }
                          }}
                          className="perspective-1000"
                        >
                          <Link href={engine.href}>
                            <div className="relative group h-full">
                              <div className={`absolute inset-0 bg-gradient-to-r ${category.gradient} opacity-0 group-hover:opacity-10 blur-2xl transition-all duration-500 rounded-2xl`} />
                              
                              <Card className={`relative h-full border-slate-700/50 bg-slate-900/80 backdrop-blur-xl hover:border-slate-600 transition-all duration-300 transform-gpu group-hover:shadow-2xl cursor-pointer overflow-hidden`}>
                                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
                                
                                <CardHeader className="relative pb-3">
                                  <div className="flex items-start justify-between mb-4">
                                    <div className={`w-12 h-12 bg-gradient-to-br ${category.gradient} opacity-10 group-hover:opacity-20 rounded-xl flex items-center justify-center transition-all duration-300`}>
                                      <CategoryIcon className={`w-6 h-6 bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`} />
                                    </div>
                                    <ArrowRight className={`w-5 h-5 text-slate-600 group-hover:text-slate-400 transform group-hover:translate-x-1 transition-all duration-300`} />
                                  </div>
                                  <CardTitle className={`text-lg text-white group-hover:bg-gradient-to-r group-hover:${category.gradient} group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300`}>
                                    {engine.name}
                                  </CardTitle>
                                </CardHeader>

                                <CardContent className="relative">
                                  <p className="text-sm text-slate-400 leading-relaxed mb-4">
                                    {engine.description}
                                  </p>
                                  
                                  <div className="flex items-center gap-2 text-xs">
                                    <Badge variant="outline" className="border-slate-700 text-slate-400 bg-slate-800/50">
                                      API Ready
                                    </Badge>
                                    <Badge variant="outline" className="border-slate-700 text-slate-400 bg-slate-800/50">
                                      Real-time
                                    </Badge>
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mt-32 text-center"
            >
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 blur-3xl opacity-30 rounded-full" />
                <Card className="relative border-slate-700/50 bg-slate-900/80 backdrop-blur-xl p-12 max-w-3xl mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5 rounded-lg" />
                  <div className="relative">
                    <Brain className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent" />
                    <h3 className="text-3xl font-bold text-white mb-4">
                      Build Your Intelligence Stack
                    </h3>
                    <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
                      Compose any combination of engines to create custom analytics workflows
                    </p>
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white border-0 shadow-xl shadow-violet-500/30 px-8"
                    >
                      View Documentation
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </Card>
              </div>
            </motion.div>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}