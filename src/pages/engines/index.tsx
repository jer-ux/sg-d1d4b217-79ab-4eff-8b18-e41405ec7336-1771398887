import { useState } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import Link from "next/link";
import Nav from "@/components/Nav";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ParticleField3D } from "@/components/premium/ParticleField3D";
import {
  TrendingUp, AlertTriangle, Target, Activity,
  DollarSign, Settings, Users, Database, BarChart3,
  Shield, FileText, Code, Brain, Lock, LineChart, Building2, CheckCircle2,
  Zap, Award, Pill, Dna, MapPin, Calendar, Briefcase, Heart, TrendingDown,
  Globe, Microscope, Factory, Truck, Home, School, Cpu, GitBranch, Scale,
  FileCheck, Eye, Search, Calculator, PieChart, Workflow, Package
} from "lucide-react";
import { SEO } from "@/components/SEO";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

// AnimatedSection component for scroll-triggered animations
function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const engineCategories = [
  {
    id: "financial-trend",
    name: "Financial & Trend Engines",
    count: 20,
    color: "from-blue-600 to-cyan-600",
    icon: TrendingUp,
    description: "Actuarial-grade forecasting, normalization, and credibility-weighted trend analysis",
    engines: [
      { id: "medical-trend-forecasting", name: "Medical Trend Forecasting", icon: TrendingUp },
      { id: "rx-trend-forecasting", name: "Rx Trend Forecasting", icon: Pill },
      { id: "dental-trend-analysis", name: "Dental Trend Analysis", icon: Activity },
      { id: "vision-trend-analysis", name: "Vision Trend Analysis", icon: Eye },
      { id: "catastrophic-claims-forecasting", name: "Catastrophic Claims Forecasting", icon: AlertTriangle },
      { id: "high-cost-claimant-prediction", name: "High-Cost Claimant Prediction", icon: Target },
      { id: "glp1-financial-impact", name: "GLP-1 Financial Impact", icon: Activity },
      { id: "gene-therapy-exposure", name: "Gene Therapy Exposure", icon: Dna },
      { id: "oncology-cost-projection", name: "Oncology Cost Projection", icon: Microscope },
      { id: "inflation-decomposition", name: "Inflation Decomposition", icon: TrendingUp },
      { id: "provider-unit-cost-trend", name: "Provider Unit Cost Trend", icon: DollarSign },
      { id: "utilization-trend-engine", name: "Utilization Trend Engine", icon: Activity },
      { id: "geographic-normalization", name: "Geographic Normalization", icon: MapPin },
      { id: "age-gender-risk-adjustment", name: "Age/Gender Risk Adjustment", icon: Users },
      { id: "case-mix-adjustment", name: "Case Mix Adjustment", icon: Activity },
      { id: "pmpm-normalization", name: "PMPM Normalization", icon: Calculator },
      { id: "seasonality-adjustment", name: "Seasonality Adjustment", icon: Calendar },
      { id: "credibility-weighting", name: "Credibility Weighting", icon: Target },
      { id: "monte-carlo-forecasting", name: "Monte Carlo Forecasting", icon: BarChart3 },
    ],
  },
  {
    id: "healthcare-economics",
    name: "Healthcare Economics Engines",
    count: 20,
    color: "from-emerald-600 to-teal-600",
    icon: DollarSign,
    description: "Economic modeling, payment integrity, and strategic cost optimization",
    engines: [
      { id: "site-of-care-migration", name: "Site-of-Care Migration", icon: MapPin },
      { id: "network-disruption-modeling", name: "Network Disruption Modeling", icon: AlertTriangle },
      { id: "reference-based-pricing", name: "Reference-Based Pricing Savings", icon: DollarSign },
      { id: "direct-contracting-valuation", name: "Direct Contracting Valuation", icon: FileCheck },
      { id: "centers-of-excellence-roi", name: "Centers of Excellence ROI", icon: Award },
      { id: "bundled-payment-modeling", name: "Bundled Payment Modeling", icon: Package },
      { id: "payment-integrity-analysis", name: "Payment Integrity Analysis", icon: Shield },
      { id: "fraud-detection", name: "Waste, Fraud, and Abuse Detection", icon: Search },
      { id: "episode-of-care-valuation", name: "Episode-of-Care Valuation", icon: FileText },
      { id: "specialty-pharmacy-economics", name: "Specialty Pharmacy Economics", icon: Pill },
      { id: "biosimilar-adoption", name: "Biosimilar Adoption Modeling", icon: Dna },
      { id: "drug-pipeline-forecasting", name: "Drug Pipeline Forecasting", icon: TrendingUp },
      { id: "rebate-optimization", name: "Rebate Optimization", icon: DollarSign },
      { id: "pbm-spread-detection", name: "PBM Spread Pricing Detection", icon: Search },
      { id: "employer-cost-shifting", name: "Employer Cost Shifting", icon: TrendingDown },
      { id: "member-cost-burden", name: "Member Cost Burden", icon: Users },
      { id: "benefit-richness-scoring", name: "Benefit Richness Scoring", icon: Award },
      { id: "cost-elasticity", name: "Cost Elasticity", icon: Activity },
      { id: "plan-migration-simulation", name: "Plan Migration Simulation", icon: Workflow },
      { id: "healthcare-inflation-attribution", name: "Healthcare Inflation Attribution", icon: TrendingUp },
    ],
  },
  {
    id: "fiduciary-governance",
    name: "Fiduciary & Governance Engines",
    count: 25,
    color: "from-purple-600 to-pink-600",
    icon: Shield,
    description: "ERISA compliance, vendor transparency, and board-level governance scoring",
    engines: [
      { id: "erisa-risk-scoring", name: "ERISA Fiduciary Risk Scoring", icon: Shield },
      { id: "pbm-contract-scoring", name: "PBM Contract Scoring", icon: FileCheck },
      { id: "stop-loss-contract-scoring", name: "Stop-Loss Contract Scoring", icon: Shield },
      { id: "tpa-governance-scoring", name: "TPA Governance Scoring", icon: Award },
      { id: "vendor-compensation-transparency", name: "Vendor Compensation Transparency", icon: Eye },
      { id: "hidden-revenue-detection", name: "Hidden Revenue Detection", icon: Search },
      { id: "conflict-of-interest", name: "Conflict-of-Interest Analysis", icon: AlertTriangle },
      { id: "audit-readiness-scoring", name: "Audit Readiness Scoring", icon: FileCheck },
      { id: "governance-maturity", name: "Governance Maturity Assessment", icon: Award },
      { id: "board-oversight-scoring", name: "Board Oversight Scoring", icon: Shield },
      { id: "ai-governance", name: "AI Governance Assessment", icon: Brain },
      { id: "compliance-monitoring", name: "Compliance Monitoring", icon: Eye },
      { id: "regulatory-exposure", name: "Regulatory Exposure", icon: AlertTriangle },
      { id: "litigation-probability", name: "Litigation Probability", icon: Scale },
      { id: "documentation-completeness", name: "Documentation Completeness", icon: FileText },
      { id: "decision-traceability", name: "Decision Traceability", icon: GitBranch },
      { id: "procurement-integrity", name: "Procurement Integrity", icon: Shield },
      { id: "contract-language-risk", name: "Contract Language Risk", icon: FileCheck },
      { id: "benchmark-deviation", name: "Benchmark Deviation Analysis", icon: BarChart3 },
      { id: "fiduciary-evidence-generation", name: "Fiduciary Evidence Generation", icon: FileText },
      { id: "board-reporting-engine", name: "Board Reporting Engine", icon: PieChart },
      { id: "internal-controls", name: "Internal Controls Assessment", icon: Lock },
      { id: "third-party-oversight", name: "Third-Party Oversight Scoring", icon: Eye },
      { id: "procurement-fairness", name: "Procurement Fairness Analysis", icon: Scale },
      { id: "policy-compliance", name: "Policy Compliance Engine", icon: FileCheck },
    ],
  },
  {
    id: "workforce-human-capital",
    name: "Workforce & Human Capital Engines",
    count: 20,
    color: "from-amber-600 to-orange-600",
    icon: Users,
    description: "Population health, productivity analytics, and workforce risk modeling",
    engines: [
      { id: "workforce-health-risk", name: "Workforce Health Risk", icon: Heart },
      { id: "absenteeism-forecasting", name: "Absenteeism Forecasting", icon: Calendar },
      { id: "presenteeism-impact", name: "Presenteeism Impact", icon: Activity },
      { id: "productivity-loss-valuation", name: "Productivity Loss Valuation", icon: DollarSign },
      { id: "workforce-demographics", name: "Workforce Demographic Projections", icon: Users },
      { id: "retirement-forecasting", name: "Retirement Forecasting", icon: Calendar },
      { id: "disability-incidence", name: "Disability Incidence", icon: Heart },
      { id: "behavioral-health-utilization", name: "Behavioral Health Utilization", icon: Brain },
      { id: "population-health-segmentation", name: "Population Health Segmentation", icon: Users },
      { id: "benefit-engagement", name: "Benefit Engagement", icon: Award },
      { id: "employee-lifetime-value", name: "Employee Lifetime Value", icon: DollarSign },
      { id: "health-equity-analysis", name: "Health Equity Analysis", icon: Scale },
      { id: "workforce-resilience", name: "Workforce Resilience", icon: Shield },
      { id: "burnout-prediction", name: "Burnout Prediction", icon: AlertTriangle },
      { id: "claims-risk-segmentation", name: "Claims Risk Segmentation", icon: Target },
      { id: "disease-burden-forecasting", name: "Disease Burden Forecasting", icon: TrendingUp },
      { id: "preventive-care-optimization", name: "Preventive Care Optimization", icon: Heart },
      { id: "wellness-roi", name: "Wellness ROI", icon: Award },
      { id: "benefit-strategy-optimization", name: "Benefit Strategy Optimization", icon: Target },
      { id: "workforce-financial-stress", name: "Workforce Financial Stress", icon: DollarSign },
    ],
  },
  {
    id: "predictive-ai",
    name: "Predictive AI Engines",
    count: 20,
    color: "from-indigo-600 to-violet-600",
    icon: Brain,
    description: "Machine learning models, digital twins, and Bayesian forecasting",
    engines: [
      { id: "large-claimant-prediction", name: "Large Claimant Prediction", icon: Target },
      { id: "hospital-admission-prediction", name: "Hospital Admission Prediction", icon: Activity },
      { id: "readmission-prediction", name: "Readmission Prediction", icon: AlertTriangle },
      { id: "chronic-disease-progression", name: "Chronic Disease Progression", icon: TrendingUp },
      { id: "rx-adherence-prediction", name: "Rx Adherence Prediction", icon: Pill },
      { id: "member-churn", name: "Member Churn", icon: TrendingDown },
      { id: "employer-renewal-prediction", name: "Employer Renewal Prediction", icon: Calendar },
      { id: "broker-opportunity-scoring", name: "Broker Opportunity Scoring", icon: Target },
      { id: "fraud-prediction", name: "Fraud Prediction", icon: Search },
      { id: "recovery-opportunity-prediction", name: "Recovery Opportunity Prediction", icon: DollarSign },
      { id: "stop-loss-laser-prediction", name: "Stop-Loss Laser Prediction", icon: Target },
      { id: "reserve-adequacy", name: "Reserve Adequacy", icon: Shield },
      { id: "premium-forecasting", name: "Premium Forecasting", icon: TrendingUp },
      { id: "cash-flow-projection", name: "Cash Flow Projection", icon: DollarSign },
      { id: "capital-allocation", name: "Capital Allocation Optimization", icon: PieChart },
      { id: "scenario-generation", name: "Scenario Generation", icon: Workflow },
      { id: "digital-twin-simulation", name: "Digital Twin Simulation", icon: Cpu },
      { id: "causal-inference", name: "Causal Inference Engine", icon: GitBranch },
      { id: "bayesian-forecasting", name: "Bayesian Forecasting", icon: Brain },
      { id: "reinforcement-learning", name: "Reinforcement Learning Optimization", icon: Zap },
    ],
  },
  {
    id: "pe-cfo",
    name: "Private Equity & CFO Engines",
    count: 20,
    color: "from-rose-600 to-red-600",
    icon: Briefcase,
    description: "Enterprise value creation, M&A due diligence, and portfolio optimization",
    engines: [
      { id: "ebitda-enhancement", name: "EBITDA Enhancement", icon: TrendingUp },
      { id: "working-capital-impact", name: "Working Capital Impact", icon: DollarSign },
      { id: "cash-flow-forecasting", name: "Cash Flow Forecasting", icon: Activity },
      { id: "enterprise-value-creation", name: "Enterprise Value Creation", icon: Award },
      { id: "acquisition-due-diligence", name: "Acquisition Due Diligence", icon: Search },
      { id: "portfolio-benchmarking", name: "Portfolio Benchmarking", icon: BarChart3 },
      { id: "synergy-valuation", name: "Synergy Valuation", icon: DollarSign },
      { id: "benefit-harmonization", name: "Benefit Harmonization", icon: Users },
      { id: "integration-cost-modeling", name: "Integration Cost Modeling", icon: Calculator },
      { id: "capital-efficiency", name: "Capital Efficiency", icon: Target },
      { id: "margin-improvement", name: "Margin Improvement", icon: TrendingUp },
      { id: "operating-leverage", name: "Operating Leverage", icon: Activity },
      { id: "return-on-invested-capital", name: "Return on Invested Capital", icon: Award },
      { id: "total-rewards-optimization", name: "Total Rewards Optimization", icon: DollarSign },
      { id: "compensation-benchmarking", name: "Compensation Benchmarking", icon: BarChart3 },
      { id: "shared-services-valuation", name: "Shared Services Valuation", icon: Building2 },
      { id: "healthcare-cost-leakage", name: "Healthcare Cost Leakage", icon: Search },
      { id: "vendor-consolidation", name: "Vendor Consolidation", icon: Building2 },
      { id: "procurement-optimization", name: "Procurement Optimization", icon: Target },
      { id: "portfolio-risk-scoring", name: "Portfolio Risk Scoring", icon: Shield },
    ],
  },
];

export default function EnginesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <>
      <Head>
        <title>Universal Intelligence Engines | Kincaid Health Data Sciences Lab</title>
        <meta
          name="description"
          content="50+ specialized actuarial engines for healthcare analytics, forecasting, and decision intelligence."
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
              50+ Specialized Actuarial Engines for Healthcare Analytics
            </p>
            <p className="text-lg text-gray-400 mb-8 max-w-3xl mx-auto">
              Modular, composable intelligence for forecasting, risk modeling, and decision automation
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                { value: "50+", label: "Specialized Engines", color: "violet" },
                { value: "12", label: "Engine Categories", color: "purple" },
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
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
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