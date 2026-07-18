import Head from "next/head";
import { motion } from "framer-motion";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  ArrowRight,
  Sparkles,
  Brain,
  Target,
} from "lucide-react";
import { useState } from "react";

const engineCategories = [
  {
    id: "forecasting",
    label: "Forecasting & Trend",
    icon: TrendingUp,
    color: "blue",
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-950 via-slate-900 to-cyan-900",
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
    gradient: "from-purple-500 to-fuchsia-500",
    bgGradient: "from-purple-950 via-slate-900 to-fuchsia-900",
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
    gradient: "from-red-500 to-orange-500",
    bgGradient: "from-red-950 via-slate-900 to-orange-900",
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
    color: "emerald",
    gradient: "from-emerald-500 to-green-500",
    bgGradient: "from-emerald-950 via-slate-900 to-green-900",
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
    gradient: "from-indigo-500 to-violet-500",
    bgGradient: "from-indigo-950 via-slate-900 to-violet-900",
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
    color: "amber",
    gradient: "from-amber-500 to-yellow-500",
    bgGradient: "from-amber-950 via-slate-900 to-yellow-900",
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
    gradient: "from-teal-500 to-cyan-500",
    bgGradient: "from-teal-950 via-slate-900 to-cyan-900",
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
    gradient: "from-pink-500 to-rose-500",
    bgGradient: "from-pink-950 via-slate-900 to-rose-900",
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
    gradient: "from-orange-500 to-amber-500",
    bgGradient: "from-orange-950 via-slate-900 to-amber-900",
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

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

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

      <div className="min-h-screen bg-black relative overflow-hidden">
        {/* Animated particle field */}
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                x: [-10, 10, -10],
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.5, 1]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>

        {/* Premium gradient orbs */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-gradient-radial from-violet-500/20 via-violet-500/5 to-transparent rounded-full blur-3xl"
            animate={{ 
              x: [0, 100, 0],
              y: [0, -80, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{ duration: 20, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 right-1/4 w-[700px] h-[700px] bg-gradient-radial from-blue-500/20 via-blue-500/5 to-transparent rounded-full blur-3xl"
            animate={{ 
              x: [0, -80, 0],
              y: [0, 60, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 18, repeat: Infinity, delay: 5 }}
          />
          <motion.div
            className="absolute top-1/2 right-1/3 w-[600px] h-[600px] bg-gradient-radial from-fuchsia-500/15 via-fuchsia-500/3 to-transparent rounded-full blur-3xl"
            animate={{ 
              x: [0, 60, 0],
              y: [0, -40, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{ duration: 22, repeat: Infinity, delay: 10 }}
          />
        </div>

        <main className="container mx-auto px-4 py-16 lg:py-24 max-w-7xl relative z-10">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto text-center mb-16"
          >
            {/* Animated icons */}
            <div className="flex justify-center gap-4 mb-8">
              {[Brain, Sparkles, Target].map((Icon, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [-5, 5, -5],
                    rotate: [0, 10, 0, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.3
                  }}
                >
                  <Icon className="w-8 h-8 text-violet-400/60" />
                </motion.div>
              ))}
            </div>

            <Badge className="mb-6 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 text-violet-300 border-violet-500/30 text-sm px-6 py-2">
              <Sparkles className="w-3 h-3 mr-2 inline" />
              Universal Intelligence Platform
            </Badge>
            
            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-7xl font-black mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
                Intelligence Engines
              </span>
            </motion.h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-4xl mx-auto font-medium">
              {totalEngines} Specialized Actuarial Engines for Healthcare Analytics
            </p>
            <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
              Modular, composable intelligence for forecasting, risk modeling, and decision automation
            </p>

            {/* Animated stats grid */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {[
                { value: `${totalEngines}+`, label: "Active Engines", icon: Brain, gradient: "from-violet-500 to-purple-500" },
                { value: `${engineCategories.length}`, label: "Categories", icon: Target, gradient: "from-blue-500 to-cyan-500" },
                { value: "Real-time", label: "Orchestration", icon: Zap, gradient: "from-fuchsia-500 to-pink-500" },
                { value: "API-First", label: "Architecture", icon: Database, gradient: "from-emerald-500 to-teal-500" },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInUpVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                  <Card className="relative border-2 border-slate-800 bg-gradient-to-br from-slate-900/80 via-slate-900/50 to-slate-900/80 backdrop-blur-sm hover:border-violet-500/50 transition-all duration-300">
                    <CardContent className="pt-6 pb-6 text-center">
                      <motion.div
                        className={`w-12 h-12 bg-gradient-to-r ${stat.gradient} rounded-xl flex items-center justify-center mx-auto mb-3`}
                        animate={{
                          boxShadow: [
                            "0 0 20px rgba(139, 92, 246, 0.3)",
                            "0 0 40px rgba(139, 92, 246, 0.5)",
                            "0 0 20px rgba(139, 92, 246, 0.3)"
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <stat.icon className="w-6 h-6 text-white" />
                      </motion.div>
                      <div className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent mb-1">
                        {stat.value}
                      </div>
                      <div className="text-xs text-slate-400">{stat.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-3 justify-center mb-16"
          >
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => setSelectedCategory(null)}
              className={`rounded-full ${selectedCategory === null ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 border-0' : 'border-slate-700 hover:border-violet-500'}`}
            >
              All Engines ({totalEngines})
            </Button>
            {engineCategories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`rounded-full ${
                    selectedCategory === category.id 
                      ? `bg-gradient-to-r ${category.gradient} border-0` 
                      : 'border-slate-700 hover:border-violet-500'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {category.label}
                </Button>
              );
            })}
          </motion.div>

          {/* Engine Categories */}
          <div className="space-y-12 max-w-7xl mx-auto">
            {filteredEngines.map((category, categoryIdx) => {
              const CategoryIcon = category.icon;
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: categoryIdx * 0.05 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="relative"
                >
                  {/* Category card with premium styling */}
                  <div className={`relative rounded-3xl border-2 border-${category.color}-500/30 bg-gradient-to-br ${category.bgGradient} p-8 overflow-hidden`}>
                    {/* Animated background pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <svg className="w-full h-full" viewBox="0 0 400 400">
                        {[...Array(20)].map((_, i) => (
                          <motion.circle
                            key={i}
                            cx={100 + (i % 4) * 100}
                            cy={100 + Math.floor(i / 4) * 100}
                            r="30"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [0.3, 0.6, 0.3]
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              delay: i * 0.1
                            }}
                          />
                        ))}
                      </svg>
                    </div>

                    {/* Category Header */}
                    <div className="flex items-center gap-4 mb-8 relative z-10">
                      <motion.div
                        className={`w-16 h-16 bg-gradient-to-r ${category.gradient} rounded-2xl flex items-center justify-center shadow-xl`}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <CategoryIcon className="w-8 h-8 text-white" />
                      </motion.div>
                      <div>
                        <h2 className={`text-3xl font-bold bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}>
                          {category.label}
                        </h2>
                        <p className="text-sm text-slate-400 mt-1">
                          {category.engines.length} specialized engines
                        </p>
                      </div>
                    </div>

                    {/* Engines Grid */}
                    <div className="grid md:grid-cols-2 gap-3 relative z-10">
                      {category.engines.map((engine, index) => (
                        <motion.div
                          key={engine.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.03 }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.02, x: 5 }}
                        >
                          <Link href={engine.href}>
                            <Card className="group relative overflow-hidden bg-slate-900/70 border-slate-800 hover:border-violet-500/50 transition-all cursor-pointer backdrop-blur-sm h-full">
                              {/* Shimmer effect */}
                              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none">
                                <motion.div
                                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                                  animate={{ x: ["-100%", "200%"] }}
                                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
                                />
                              </div>

                              <CardContent className="p-4 relative z-10">
                                <div className="flex items-start gap-4">
                                  {/* Animated number badge */}
                                  <motion.div 
                                    className={`text-${category.color}-400/60 font-mono text-sm min-w-[2rem] pt-0.5 font-bold`}
                                    whileHover={{ scale: 1.2, rotate: 5 }}
                                  >
                                    {String(index + 1).padStart(2, '0')}
                                  </motion.div>
                                  
                                  <div className="flex-1 min-w-0">
                                    <h3 className={`font-semibold text-base mb-1 text-white group-hover:text-${category.color}-300 transition-colors`}>
                                      {engine.name}
                                    </h3>
                                    <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors line-clamp-2">
                                      {engine.description}
                                    </p>
                                  </div>
                                  
                                  <motion.div
                                    className={`text-slate-600 group-hover:text-${category.color}-400 transition-colors flex-shrink-0`}
                                    animate={{ x: 0 }}
                                    whileHover={{ x: 5 }}
                                  >
                                    <ArrowRight className="w-5 h-5" />
                                  </motion.div>
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-20 text-center"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-slate-900/80 to-slate-800/80 border border-slate-700 backdrop-blur-sm">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 text-violet-400" />
              </motion.div>
              <span className="text-sm text-slate-300">
                Showing <span className="font-bold text-violet-400">{totalEngines}</span> engines across <span className="font-bold text-violet-400">{engineCategories.length}</span> categories
              </span>
            </div>
          </motion.div>
        </main>
      </div>

      <Footer />
    </>
  );
}