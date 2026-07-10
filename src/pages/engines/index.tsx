import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  TrendingUp, AlertTriangle, Target, Activity,
  DollarSign, Settings, Users, Database, BarChart3,
  Shield, FileText, Code, Brain, Lock, LineChart, Building2, CheckCircle2,
  Zap, Award, Pill, Dna, MapPin, Calendar, Briefcase, Heart, TrendingDown,
  Globe, Microscope, Factory, Truck, Home, School, Cpu, GitBranch, Scale,
  FileCheck, Eye, Search, Calculator, PieChart, Workflow
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
  const totalEngines = engineCategories.reduce((sum, cat) => sum + cat.count, 0);

  return (
    <>
      <SEO
        title="Actuarial Intelligence Engines | Kincaid IQ"
        description="125+ specialized actuarial, economic, governance, and AI decision engines. Universal data feed, modular architecture."
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
        {/* Animated background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "2s" }} />
        </div>

        {/* Hero section */}
        <div className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-sm border border-cyan-500/20 rounded-full px-6 py-2 mb-6 animate-pulse">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-cyan-300 text-sm font-medium">Live: {totalEngines}+ Engines Running</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 text-transparent bg-clip-text animate-gradient">
              Actuarial Intelligence
            </h1>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Operating System
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
              125+ specialized engines. One universal data feed. Modular architecture.
            </p>

            <div className="flex flex-wrap gap-4 justify-center items-center mb-12">
              <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl px-6 py-3 border border-cyan-400/30 shadow-lg shadow-cyan-500/20">
                <div className="text-3xl font-bold text-white">{totalEngines}+</div>
                <div className="text-sm text-cyan-100">Engines</div>
              </div>
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl px-6 py-3 border border-purple-400/30 shadow-lg shadow-purple-500/20">
                <div className="text-3xl font-bold text-white">6</div>
                <div className="text-sm text-purple-100">Domains</div>
              </div>
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl px-6 py-3 border border-emerald-400/30 shadow-lg shadow-emerald-500/20">
                <div className="text-3xl font-bold text-white">1</div>
                <div className="text-sm text-emerald-100">Data Feed</div>
              </div>
            </div>

            <Link
              href="/request-demo"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-2xl shadow-purple-500/50 transform hover:scale-105 transition-all duration-300 animate-pulse">
              <LineChart className="w-6 h-6" />
              Request Platform Demo
            </Link>
          </div>
        </div>

        {/* Engine categories */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 relative z-10">
          <div className="space-y-8">
            {engineCategories.map((category, idx) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.id}
                  className="group relative"
                  style={{ animationDelay: `${idx * 0.1}s` }}>
                  {/* Vegas-style glow border */}
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${category.color} rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 animate-pulse`} />
                  
                  <div className="relative bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-slate-600 transition-all duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 bg-gradient-to-br ${category.color} rounded-xl shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-cyan-400 group-hover:to-purple-400 transition-all duration-300">
                            {category.name}
                          </h3>
                          <p className="text-gray-400 text-sm">{category.description}</p>
                        </div>
                      </div>
                      
                      {/* Vegas-style count badge */}
                      <div className={`relative px-6 py-2 bg-gradient-to-r ${category.color} rounded-full shadow-lg transform group-hover:scale-110 transition-transform duration-300 overflow-hidden`}>
                        <div className="absolute inset-0 bg-white/20 animate-pulse" />
                        <div className="relative font-bold text-white text-2xl tracking-wider">
                          {category.count}+
                        </div>
                      </div>
                    </div>

                    {/* Engine cards grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
                      {category.engines.map((engine) => {
                        const EngineIcon = engine.icon;
                        return (
                          <Link
                            key={engine.id}
                            href={`/engines/${engine.id}`}
                            className="group/card relative">
                            {/* Neon glow on hover */}
                            <div className={`absolute -inset-0.5 bg-gradient-to-r ${category.color} rounded-lg opacity-0 group-hover/card:opacity-75 blur transition-all duration-300`} />
                            
                            <div className="relative bg-slate-800/50 border border-slate-700/50 rounded-lg p-4 hover:bg-slate-800 transition-all duration-300">
                              <div className="flex items-start gap-3">
                                <div className={`p-2 bg-gradient-to-br ${category.color} rounded-lg transform group-hover/card:scale-110 transition-transform duration-300`}>
                                  <EngineIcon className="w-4 h-4 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-semibold text-white text-sm group-hover/card:text-cyan-400 transition-colors duration-300 leading-tight">
                                    {engine.name}
                                  </h4>
                                </div>
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Universal data feed section */}
          <div className="mt-16 relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl opacity-50 blur-xl animate-pulse" />
            <div className="relative bg-slate-900/90 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm border border-cyan-500/30 rounded-full px-6 py-2 mb-4">
                  <Database className="w-5 h-5 text-cyan-400" />
                  <span className="text-cyan-300 font-medium">Universal SDK</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-3">
                  One Data Feed. 125+ Engines.
                </h3>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  Upload once. Medical claims, Rx claims, member census, contracts, financials → normalized to universal schema → routed to all applicable engines automatically.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-white mb-2">Normalized Schema</h4>
                  <p className="text-gray-400 text-sm">
                    Automatic normalization from any source format (carrier, TPA, ASO) to standard interface
                  </p>
                </div>

                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mb-4">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-white mb-2">Smart Routing</h4>
                  <p className="text-gray-400 text-sm">
                    Auto-detect which engines can run based on data availability and completeness
                  </p>
                </div>

                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50 hover:border-emerald-500/50 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center mb-4">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-white mb-2">Parallel Execution</h4>
                  <p className="text-gray-400 text-sm">
                    Run 50+ engines simultaneously on the same dataset in minutes, not days
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA section */}
          <div className="mt-16 text-center">
            <div className="relative inline-block">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-75 animate-pulse" />
              <div className="relative bg-slate-900 rounded-2xl p-8 border border-slate-700/50">
                <h3 className="text-2xl font-bold text-white mb-4">
                  See The Engines In Action
                </h3>
                <p className="text-gray-300 mb-6 max-w-xl">
                  Live demo with real healthcare data. See 20+ engines process claims, identify arbitrage, forecast trends, score contracts — all from one upload.
                </p>
                <Link
                  href="/request-demo"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white px-8 py-4 rounded-xl font-bold shadow-2xl shadow-purple-500/50 transform hover:scale-105 transition-all duration-300">
                  Request Platform Demo
                  <LineChart className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comprehensive Engine Catalog */}
      <section className="py-24 border-t border-neutral-800">
        <div className="container mx-auto px-4 max-w-7xl">
          <AnimatedSection className="mb-16 text-center space-y-4">
            <span className="text-xs font-mono text-[#B8860B] uppercase tracking-widest font-semibold">
              125+ Specialized Engines
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold bg-gradient-to-r from-white via-neutral-100 to-neutral-300 bg-clip-text text-transparent">
              The Actuarial Intelligence Operating System
            </h2>
            <p className="text-neutral-400 text-lg leading-relaxed max-w-3xl mx-auto">
              Rather than one monolithic engine, Kincaid IQ is architected as a modular intelligence platform composed of specialized computational engines—each purpose-built for specific healthcare, financial, and governance domains.
            </p>
          </AnimatedSection>

          <div className="grid gap-8">
            {/* Financial & Trend Engines */}
            <AnimatedSection>
              <div className="bg-gradient-to-br from-[#0F1419] to-[#151B23] border border-[#2A3F54] rounded-2xl p-8 shadow-2xl">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-gradient-to-br from-[#1A3A52] to-[#234766] rounded-xl">
                    <TrendingUp className="h-6 w-6 text-[#B8860B]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-white mb-2">
                      Financial & Trend Engines (20+)
                    </h3>
                    <p className="text-neutral-400 text-sm">
                      Actuarial-grade forecasting, normalization, and credibility-weighted trend analysis
                    </p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    "Medical trend forecasting",
                    "Rx trend forecasting",
                    "Dental trend analysis",
                    "Vision trend analysis",
                    "Catastrophic claims forecasting",
                    "High-cost claimant prediction",
                    "GLP-1 financial impact modeling",
                    "Gene therapy exposure modeling",
                    "Oncology cost projection",
                    "Inflation decomposition",
                    "Provider unit cost trend",
                    "Utilization trend engine",
                    "Geographic normalization",
                    "Age/gender risk adjustment",
                    "Case mix adjustment",
                    "PMPM normalization",
                    "PEPY normalization",
                    "Seasonality adjustment",
                    "Credibility weighting",
                    "Monte Carlo forecasting"
                  ].map((engine, i) => (
                    <div key={i} className="flex items-center gap-2 text-neutral-300 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                      <span>{engine}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Healthcare Economics Engines */}
            <AnimatedSection>
              <div className="bg-gradient-to-br from-[#0F1419] to-[#151B23] border border-[#2A3F54] rounded-2xl p-8 shadow-2xl">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-gradient-to-br from-[#1A3A52] to-[#234766] rounded-xl">
                    <DollarSign className="h-6 w-6 text-[#B8860B]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-white mb-2">
                      Healthcare Economics Engines (20+)
                    </h3>
                    <p className="text-neutral-400 text-sm">
                      Economic modeling, payment integrity, and strategic cost optimization
                    </p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    "Site-of-care migration",
                    "Network disruption modeling",
                    "Reference-based pricing savings",
                    "Direct contracting valuation",
                    "Centers of Excellence ROI",
                    "Bundled payment modeling",
                    "Payment integrity analysis",
                    "Waste, fraud, and abuse detection",
                    "Episode-of-care valuation",
                    "Specialty pharmacy economics",
                    "Biosimilar adoption modeling",
                    "Drug pipeline forecasting",
                    "Rebate optimization",
                    "PBM spread pricing detection",
                    "Employer cost shifting",
                    "Member cost burden",
                    "Benefit richness scoring",
                    "Cost elasticity",
                    "Plan migration simulation",
                    "Healthcare inflation attribution"
                  ].map((engine, i) => (
                    <div key={i} className="flex items-center gap-2 text-neutral-300 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                      <span>{engine}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Fiduciary & Governance Engines */}
            <AnimatedSection>
              <div className="bg-gradient-to-br from-[#0F1419] to-[#151B23] border border-[#2A3F54] rounded-2xl p-8 shadow-2xl">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-gradient-to-br from-[#1A3A52] to-[#234766] rounded-xl">
                    <Shield className="h-6 w-6 text-[#B8860B]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-white mb-2">
                      Fiduciary & Governance Engines (25+)
                    </h3>
                    <p className="text-neutral-400 text-sm">
                      ERISA compliance, vendor transparency, and board-level governance scoring
                    </p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    "ERISA fiduciary risk scoring",
                    "PBM contract scoring",
                    "Stop-loss contract scoring",
                    "TPA governance scoring",
                    "Vendor compensation transparency",
                    "Hidden revenue detection",
                    "Conflict-of-interest analysis",
                    "Audit readiness scoring",
                    "Governance maturity assessment",
                    "Board oversight scoring",
                    "AI governance assessment",
                    "Compliance monitoring",
                    "Regulatory exposure",
                    "Litigation probability",
                    "Documentation completeness",
                    "Decision traceability",
                    "Procurement integrity",
                    "Contract language risk",
                    "Benchmark deviation analysis",
                    "Fiduciary evidence generation",
                    "Board reporting engine",
                    "Internal controls assessment",
                    "Third-party oversight scoring",
                    "Procurement fairness analysis",
                    "Policy compliance engine"
                  ].map((engine, i) => (
                    <div key={i} className="flex items-center gap-2 text-neutral-300 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                      <span>{engine}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Workforce & Human Capital Engines */}
            <AnimatedSection>
              <div className="bg-gradient-to-br from-[#0F1419] to-[#151B23] border border-[#2A3F54] rounded-2xl p-8 shadow-2xl">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-gradient-to-br from-[#1A3A52] to-[#234766] rounded-xl">
                    <Users className="h-6 w-6 text-[#B8860B]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-white mb-2">
                      Workforce & Human Capital Engines (20+)
                    </h3>
                    <p className="text-neutral-400 text-sm">
                      Population health, productivity analytics, and workforce risk modeling
                    </p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    "Workforce health risk",
                    "Absenteeism forecasting",
                    "Presenteeism impact",
                    "Productivity loss valuation",
                    "Workforce demographic projections",
                    "Retirement forecasting",
                    "Disability incidence",
                    "Behavioral health utilization",
                    "Population health segmentation",
                    "Benefit engagement",
                    "Employee lifetime value",
                    "Health equity analysis",
                    "Workforce resilience",
                    "Burnout prediction",
                    "Claims risk segmentation",
                    "Disease burden forecasting",
                    "Preventive care optimization",
                    "Wellness ROI",
                    "Benefit strategy optimization",
                    "Workforce financial stress"
                  ].map((engine, i) => (
                    <div key={i} className="flex items-center gap-2 text-neutral-300 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                      <span>{engine}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Predictive AI Engines */}
            <AnimatedSection>
              <div className="bg-gradient-to-br from-[#0F1419] to-[#151B23] border border-[#2A3F54] rounded-2xl p-8 shadow-2xl">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-gradient-to-br from-[#1A3A52] to-[#234766] rounded-xl">
                    <Brain className="h-6 w-6 text-[#B8860B]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-white mb-2">
                      Predictive AI Engines (20+)
                    </h3>
                    <p className="text-neutral-400 text-sm">
                      Machine learning models, digital twins, and Bayesian forecasting
                    </p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    "Large claimant prediction",
                    "Hospital admission prediction",
                    "Readmission prediction",
                    "Chronic disease progression",
                    "Rx adherence prediction",
                    "Member churn",
                    "Employer renewal prediction",
                    "Broker opportunity scoring",
                    "Fraud prediction",
                    "Recovery opportunity prediction",
                    "Stop-loss laser prediction",
                    "Reserve adequacy",
                    "Premium forecasting",
                    "Cash flow projection",
                    "Capital allocation optimization",
                    "Scenario generation",
                    "Digital twin simulation",
                    "Causal inference engine",
                    "Bayesian forecasting",
                    "Reinforcement learning optimization"
                  ].map((engine, i) => (
                    <div key={i} className="flex items-center gap-2 text-neutral-300 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                      <span>{engine}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Private Equity & CFO Engines */}
            <AnimatedSection>
              <div className="bg-gradient-to-br from-[#0F1419] to-[#151B23] border border-[#2A3F54] rounded-2xl p-8 shadow-2xl">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-gradient-to-br from-[#1A3A52] to-[#234766] rounded-xl">
                    <Building2 className="h-6 w-6 text-[#B8860B]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-white mb-2">
                      Private Equity & CFO Engines (20+)
                    </h3>
                    <p className="text-neutral-400 text-sm">
                      Enterprise value creation, M&A due diligence, and portfolio optimization
                    </p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    "EBITDA enhancement",
                    "Working capital impact",
                    "Cash flow forecasting",
                    "Enterprise value creation",
                    "Acquisition due diligence",
                    "Portfolio benchmarking",
                    "Synergy valuation",
                    "Benefit harmonization",
                    "Integration cost modeling",
                    "Capital efficiency",
                    "Margin improvement",
                    "Operating leverage",
                    "Return on invested capital",
                    "Total rewards optimization",
                    "Compensation benchmarking",
                    "Shared services valuation",
                    "Healthcare cost leakage",
                    "Vendor consolidation",
                    "Procurement optimization",
                    "Portfolio risk scoring"
                  ].map((engine, i) => (
                    <div key={i} className="flex items-center gap-2 text-neutral-300 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                      <span>{engine}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Vision Statement */}
          <AnimatedSection className="mt-16">
            <div className="bg-gradient-to-br from-[#1A3A52]/20 to-[#234766]/20 border border-[#B8860B]/30 rounded-2xl p-12 text-center">
              <h3 className="text-3xl font-serif font-bold text-white mb-4">
                An Actuarial Intelligence Operating System
              </h3>
              <p className="text-neutral-300 text-lg leading-relaxed max-w-4xl mx-auto mb-8">
                Rather than thinking of Kincaid IQ as "one actuarial engine," we've architected it as a composable intelligence platform. Each specialized engine can operate independently or be orchestrated together to solve complex enterprise challenges—from ERISA fiduciary compliance to private equity value creation to CFO-level financial forecasting.
              </p>
              <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#B8860B] mb-2">125+</div>
                  <div className="text-sm text-neutral-400">Specialized Engines</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#B8860B] mb-2">6</div>
                  <div className="text-sm text-neutral-400">Major Domains</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#B8860B] mb-2">100%</div>
                  <div className="text-sm text-neutral-400">Modular Architecture</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#B8860B] mb-2">∞</div>
                  <div className="text-sm text-neutral-400">Composable Workflows</div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </>
  );
}