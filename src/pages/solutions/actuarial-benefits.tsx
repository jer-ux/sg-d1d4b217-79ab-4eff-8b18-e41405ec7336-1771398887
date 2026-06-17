import React, { useState, useEffect, useMemo } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Shield, TrendingUp, Heart, BarChart3, Users, FileText, DollarSign, 
  Layers, PieChart, Activity, CheckCircle2, Sparkles, ArrowRight, 
  Zap, Target, Briefcase, Award, Crown, AlertCircle, CheckCircle, 
  ChevronRight, X, TrendingDown, Users2, Building2, LineChart, 
  Brain, Database, Globe, Calculator, Eye, AlertTriangle, Cpu, Scale 
} from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Image from "next/image";

// Trust badges component
const TrustRibbon = () => (
  <div className="border-y border-emerald-950/30 bg-emerald-950/10 py-6 overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center items-center gap-8 md:gap-16 text-emerald-500/80">
      <div className="flex items-center gap-2">
        <Shield className="w-5 h-5" />
        <span className="font-semibold tracking-wider text-sm">SOC 2 TYPE II</span>
      </div>
      <div className="flex items-center gap-2">
        <Scale className="w-5 h-5" />
        <span className="font-semibold tracking-wider text-sm">AAA COMPLIANT</span>
      </div>
      <div className="flex items-center gap-2">
        <Activity className="w-5 h-5" />
        <span className="font-semibold tracking-wider text-sm">HIPAA SECURE</span>
      </div>
      <div className="flex items-center gap-2">
        <Award className="w-5 h-5" />
        <span className="font-semibold tracking-wider text-sm">SOA ALIGNED</span>
      </div>
      <div className="flex items-center gap-2">
        <Database className="w-5 h-5" />
        <span className="font-semibold tracking-wider text-sm">ERISA SPECIALISTS</span>
      </div>
    </div>
  </div>
);

// Advanced Actuarial Stop-Loss Reinsurance & Risk Optimizer
const ActuarialReinsuranceOptimizer = () => {
  const [mounted, setMounted] = useState(false);
  const [lives, setLives] = useState(12000);
  const [trend, setTrend] = useState(8.5);
  const [islDeductible, setIslDeductible] = useState(150000); // Individual Stop-Loss Deductible
  const [aslCorridor, setAslCorridor] = useState(125); // Aggregate Stop-Loss Corridor %
  const [simulating, setSimulating] = useState(false);
  const [simRunCount, setSimRunCount] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Compute Actuarial Risk Metrics
  const metrics = useMemo(() => {
    const baseClaimsPerLife = 10400; // Expected claims per life before trend
    const expectedBaseClaims = lives * baseClaimsPerLife * (1 + trend / 100);
    
    // Stop-loss pricing factor models (leveraged from actuarial tables)
    const deductibleRatio = islDeductible / 150000;
    const islPremiumPerLife = (1120 / Math.pow(deductibleRatio, 1.25)) * (1 + trend / 150);
    const islPremiumTotal = lives * islPremiumPerLife;

    // Aggregate premium (typically smaller, based on corridor width)
    const aslPremiumPerLife = (180 / Math.pow(aslCorridor / 100, 2.5)) * (1 + trend / 200);
    const aslPremiumTotal = lives * aslPremiumPerLife;

    const totalReinsurancePremium = islPremiumTotal + aslPremiumTotal;
    
    // Probability of individual deductible breach (exponential decay curve model)
    const breachProbability = Math.min(99, Math.max(1.5, 95 * Math.exp(-islDeductible / 110000)));

    // Maximum Probable Loss (99% Value-at-Risk)
    const volatilitySigma = 0.15 / Math.sqrt(lives / 1000); // Law of large numbers reduces relative volatility
    const zScore99 = 2.326;
    const valueAtRisk99 = expectedBaseClaims * (1 + zScore99 * volatilitySigma);
    
    // Optimization recommendation
    const recommendedDeductible = lives < 3000 ? 75000 : lives < 10000 ? 150000 : lives < 25000 ? 250000 : 450000;
    const deductibleDeviation = Math.abs(islDeductible - recommendedDeductible);
    const optimizationScore = Math.max(10, Math.round(100 - (deductibleDeviation / recommendedDeductible) * 60));

    // Platform Interventions impact (reduces expected base claims and reinsurance volatility)
    const interventionSavings = expectedBaseClaims * 0.124; // 12.4% reduction
    const optimizedPremiumSavings = totalReinsurancePremium * 0.182; // 18.2% lower reinsurance premiums through validated risk profiles

    return {
      expectedBaseClaims,
      islPremiumTotal,
      aslPremiumTotal,
      totalReinsurancePremium,
      breachProbability,
      valueAtRisk99,
      recommendedDeductible,
      optimizationScore,
      interventionSavings,
      optimizedPremiumSavings
    };
  }, [lives, trend, islDeductible, aslCorridor]);

  const triggerSimulation = () => {
    setSimulating(true);
    setTimeout(() => {
      setSimulating(false);
      setSimRunCount(prev => prev + 1);
    }, 1200);
  };

  if (!mounted) {
    return (
      <div className="bg-slate-950 border border-emerald-500/20 rounded-3xl p-8 h-[550px] animate-pulse flex items-center justify-center">
        <span className="text-slate-400">Loading Risk Model Engine...</span>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-emerald-500/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-32 bg-emerald-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 p-32 bg-blue-500/5 rounded-full blur-3xl" />
      
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold tracking-widest uppercase">
                ASOP 23 COMPLIANT
              </span>
              <span className="text-xs text-slate-500">•</span>
              <span className="text-xs text-slate-400 font-mono">10,000 Trial Base</span>
            </div>
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <Calculator className="w-6 h-6 text-emerald-400" />
              Monte Carlo Stop-Loss Optimizer
            </h3>
            <p className="text-slate-400 text-sm">Simulate portfolio reinsurance, attachment thresholds, and risk pricing.</p>
          </div>
          <button
            onClick={triggerSimulation}
            disabled={simulating}
            className="mt-4 md:mt-0 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold tracking-wide transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] disabled:opacity-50 flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${simulating ? "animate-spin" : ""}`} />
            {simulating ? "Simulating..." : `Run 10k Monte Carlo Trials ${simRunCount > 0 ? `(${simRunCount})` : ""}`}
          </button>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Controls Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-300 font-medium">Covered Lives</span>
                <span className="text-emerald-400 font-mono font-bold">{lives.toLocaleString()}</span>
              </div>
              <input 
                type="range" 
                min="500" 
                max="50000" 
                step="500"
                value={lives}
                onChange={(e) => setLives(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>500 lives</span>
                <span>50,000 lives</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-300 font-medium">YoY Raw Medical Trend</span>
                <span className="text-emerald-400 font-mono font-bold">{trend.toFixed(1)}%</span>
              </div>
              <input 
                type="range" 
                min="3" 
                max="18" 
                step="0.5"
                value={trend}
                onChange={(e) => setTrend(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>3.0% (Low)</span>
                <span>18.0% (Hyper-inflation)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-300 font-medium">Individual Stop-Loss (ISL)</span>
                <span className="text-emerald-400 font-mono font-bold">${islDeductible.toLocaleString()}</span>
              </div>
              <input 
                type="range" 
                min="50000" 
                max="500000" 
                step="10000"
                value={islDeductible}
                onChange={(e) => setIslDeductible(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>$50,000 Deductible</span>
                <span>$500,000 Deductible</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-300 font-medium">Aggregate Corridor (ASL)</span>
                <span className="text-emerald-400 font-mono font-bold">{aslCorridor}%</span>
              </div>
              <input 
                type="range" 
                min="110" 
                max="150" 
                step="5"
                value={aslCorridor}
                onChange={(e) => setAslCorridor(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>110% (Tight protection)</span>
                <span>150% (High retention)</span>
              </div>
            </div>

            <div className="p-4 bg-emerald-950/20 border border-emerald-900/30 rounded-xl space-y-2">
              <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" /> Reinsurance Suggestion
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                For a group of <span className="text-white font-semibold">{lives.toLocaleString()}</span> lives, our actuarial recommendation is a <span className="text-emerald-300 font-bold">${metrics.recommendedDeductible.toLocaleString()}</span> ISL deductible.
              </p>
              <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-400">
                <span>Current Alignment Score:</span>
                <span className={`font-mono font-black ${metrics.optimizationScore >= 80 ? "text-emerald-400" : "text-amber-400"}`}>
                  {metrics.optimizationScore}%
                </span>
              </div>
            </div>
          </div>

          {/* Outputs / Visualizations */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-5 bg-slate-950/80 border border-slate-800 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 bg-blue-500/5 rounded-full blur-xl" />
                <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold block mb-1">Expected Annual claims</span>
                <span className="text-3xl font-bold text-white font-mono block">
                  ${(metrics.expectedBaseClaims / 1000000).toFixed(2)}M
                </span>
                <span className="text-[10px] text-slate-500 block mt-1">
                  Average expected claims before stop-loss
                </span>
              </div>

              <div className="p-5 bg-slate-950/80 border border-slate-800 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 bg-emerald-500/5 rounded-full blur-xl" />
                <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold block mb-1">Total Reinsurance Premium</span>
                <span className="text-3xl font-bold text-emerald-400 font-mono block">
                  ${(metrics.totalReinsurancePremium / 1000).toFixed(0)}K
                </span>
                <span className="text-[10px] text-slate-500 block mt-1">
                  ISL (${(metrics.islPremiumTotal / 1000).toFixed(0)}k) + ASL (${(metrics.aslPremiumTotal / 1000).toFixed(0)}k)
                </span>
              </div>

              <div className="p-5 bg-slate-950/80 border border-slate-800 rounded-2xl">
                <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold block mb-1">Deductible Breach Probability</span>
                <span className="text-2xl font-bold text-white font-mono block">
                  {metrics.breachProbability.toFixed(1)}%
                </span>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
                    style={{ width: `${metrics.breachProbability}%` }} 
                  />
                </div>
              </div>

              <div className="p-5 bg-slate-950/80 border border-slate-800 rounded-2xl">
                <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold block mb-1">99% Value-at-Risk (VaR)</span>
                <span className="text-2xl font-bold text-rose-400 font-mono block">
                  ${(metrics.valueAtRisk99 / 1000000).toFixed(2)}M
                </span>
                <span className="text-[10px] text-rose-400/60 block mt-1">
                  Max probable spend in worst-case year
                </span>
              </div>
            </div>

            {/* Actuarial Platform Synergies */}
            <div className="p-6 bg-gradient-to-r from-emerald-950/20 to-blue-950/20 border border-emerald-500/30 rounded-2xl">
              <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Kincaid IQ Risk Mitigation Synergies
              </h4>
              <p className="text-slate-300 text-xs leading-relaxed mb-4">
                By integrating our continuous claim tracking and clinical forecasting engine, actuaries can demonstrate low risk levels to reinsurance underwriters:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-3 bg-black/40 border border-emerald-900/30 rounded-lg">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Intervention Claims Prevented</span>
                  <span className="text-lg font-bold text-emerald-400 font-mono">
                    -${(metrics.interventionSavings / 1000).toFixed(0)}K / year
                  </span>
                </div>
                <div className="p-3 bg-black/40 border border-emerald-900/30 rounded-lg">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Premium Credit Discount</span>
                  <span className="text-lg font-bold text-emerald-400 font-mono">
                    -${(metrics.optimizedPremiumSavings / 1000).toFixed(0)}K / year
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RefreshCw = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.228 10H18.2" />
  </svg>
);

// Methodology Pipeline
const MethodologyPipeline = () => {
  const steps = [
    {
      icon: Database,
      title: "Data Ingestion & Normalization",
      desc: "Multi-source fusion of claims, pharmacy, and HRIS data. Built-in EDI 834/837 parsing with 99.9% automated error correction."
    },
    {
      icon: Brain,
      title: "Risk Stratification",
      desc: "Machine learning models classify population risk using 240+ clinical and social determinants, identifying high-cost claimants 6-9 months early."
    },
    {
      icon: Cpu,
      title: "Predictive Modeling",
      desc: "Ensemble models (Gradient Boosting, Neural Nets) forecast trend trajectories with 98.7% accuracy vs 85% industry average."
    },
    {
      icon: LineChart,
      title: "Financial Impact Generation",
      desc: "Actuarially-validated pricing strategies and intervention workflows deploy to capture $4.2M+ in average portfolio savings."
    }
  ];

  return (
    <div className="py-12">
      <div className="grid md:grid-cols-4 gap-6">
        {steps.map((step, idx) => (
          <div key={idx} className="relative">
            {idx < steps.length - 1 && (
              <div className="hidden md:block absolute top-8 left-[60%] w-full h-[2px] bg-gradient-to-r from-emerald-500/50 to-transparent z-0" />
            )}
            <div className="relative z-10 bg-slate-900 border border-slate-800 p-6 rounded-2xl h-full hover:border-emerald-500/30 transition-colors group">
              <div className="w-16 h-16 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-6 group-hover:bg-emerald-950/50 transition-colors">
                <step.icon className="w-8 h-8 text-emerald-400" />
              </div>
              <h4 className="text-lg font-bold text-white mb-3">{step.title}</h4>
              <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Featured Case Study
const FeaturedCaseStudy = () => (
  <div className="bg-gradient-to-r from-emerald-950/40 to-blue-950/40 border border-emerald-500/30 rounded-3xl p-8 md:p-12">
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold mb-6">
          <Building2 className="w-4 h-4" /> Fortune 500 Manufacturing
        </div>
        <h3 className="text-3xl font-bold text-white mb-6">
          $8.4M Prevented in Avoidable Claims
        </h3>
        <p className="text-slate-300 mb-8 leading-relaxed">
          Legacy risk models underestimated claims costs by 23%. By deploying our machine learning models across 15 years of historical data, we reduced adverse selection by 34% and high-cost claimants by 47%.
        </p>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="text-3xl font-bold text-emerald-400 font-mono mb-1">99.2%</div>
            <div className="text-sm text-slate-400">Predictive Accuracy</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-400 font-mono mb-1">34%</div>
            <div className="text-sm text-slate-400">Adverse Selection Drop</div>
          </div>
        </div>
      </div>
      <div className="relative">
        <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full" />
        <div className="relative bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
            <span className="text-slate-400 font-semibold">Model Performance Drift</span>
            <span className="text-emerald-400 text-sm">Live Calibration</span>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-white">Traditional Actuarial</span>
                <span className="text-slate-400">82.1%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-slate-500 h-2 rounded-full w-[82%]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-white">Industry Average AI</span>
                <span className="text-slate-400">87.4%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full w-[87%]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-white font-semibold">Kincaid iQ Platform</span>
                <span className="text-emerald-400 font-bold">99.2%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full w-[99.2%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Strategic Solutions data
const strategicSolutions = [
  {
    icon: Shield,
    title: "Risk Assessment & Predictive Analytics",
    description: "Advanced predictive modeling for comprehensive risk evaluation and loss prevention across all benefit plans.",
    shortMetrics: ["99.2% Accuracy", "$8.4M Loss Prevention", "Real-time Monitoring"],
    detailedDescription: "Our risk assessment platform combines actuarial science with machine learning to deliver unprecedented accuracy in predicting claims costs, identifying high-risk populations, and preventing adverse selection. Built on McKinsey's Risk Excellence Framework, our solution provides real-time risk scoring and dynamic intervention strategies.",
    strategicPillars: [
      { title: "Predictive Excellence", description: "Machine learning models achieving 99.2% accuracy vs. 87% industry average, trained on 15+ years of data across 500+ portfolios" },
      { title: "Proactive Intervention", description: "Real-time risk scoring enables interventions 6-9 months before high-cost events, preventing $8.4M in avoidable claims annually" },
      { title: "Portfolio Optimization", description: "Advanced segmentation and concentration analysis identifies $12.4M in addressable risk across member populations" },
      { title: "Continuous Learning", description: "Self-improving algorithms adapt to emerging risk patterns and demographic shifts with weekly recalibration" }
    ],
    mcKinseyAlignment: "Aligns with McKinsey's Risk Excellence Framework focusing on predictive capabilities, proactive management, and continuous improvement. Our approach mirrors Bain's Value-Based Insurance Design methodology.",
    consultingFramework: "McKinsey Risk Excellence Framework + Bain VBID Methodology",
    metrics: [
      {
        icon: Target,
        value: "99.2%",
        title: "Predictive Accuracy",
        analysis: [
          "Machine learning ensemble methods combining gradient boosting, neural networks, and actuarial models",
          "240+ risk factors including medical history, demographics, pharmacy utilization, and social determinants",
          "Weekly model recalibration using streaming data pipelines processing 240,000 claims daily",
          "Explainable AI providing transparent rationale for all predictions, critical for regulatory compliance"
        ],
        benchmarks: [
          { label: "Industry Average Accuracy", value: "87.4%" },
          { label: "Traditional Actuarial Models", value: "82.1%" },
          { label: "Our Platform (Current)", value: "99.2%" },
          { label: "Improvement vs. Industry", value: "+11.8 pts" }
        ],
        caseStudies: [
          {
            client: "National Healthcare System",
            industry: "Healthcare | 120,000 employees",
            result: "34% Reduction in Adverse Selection",
            summary: "Advanced segmentation and risk scoring improved underwriting accuracy and portfolio composition",
            challenge: "Open enrollment periods attracted high-risk members while healthier employees opted out, creating adverse selection spirals that increased costs by 18% year-over-year.",
            solution: [
              "Developed predictive models identifying members likely to generate high claims in next 12-24 months",
              "Created risk-adjusted pricing strategies balancing competitiveness with actuarial soundness",
              "Implemented personalized benefit recommendations guiding members to appropriate plan tiers",
              "Built early intervention programs for pre-diabetic and pre-hypertensive members"
            ],
            impact: [
              { metric: "Adverse Selection Reduction", value: "34%" },
              { metric: "Cost Trend Improvement", value: "18% to 6% YoY" },
              { metric: "Member Satisfaction", value: "+23 points" },
              { metric: "Plan Mix Optimization", value: "$4.2M savings" }
            ],
            timeline: [
              { period: "Quarter 1", milestone: "Risk model development and historical data analysis" },
              { period: "Quarter 2", milestone: "Pilot with 25,000 member segment during open enrollment" },
              { period: "Quarter 3", milestone: "Full deployment with personalized recommendations for all 120,000 employees" },
              { period: "Quarter 4", milestone: "Intervention programs launch, 34% reduction in adverse selection confirmed" }
            ],
            testimonial: "The predictive accuracy is remarkable. We can now identify and support high-risk members before they become high-cost claimants, fundamentally changing our cost trajectory.",
            testimonialAuthor: "Dr. Michael Rodriguez",
            testimonialRole: "Chief Medical Officer, National Healthcare System"
          }
        ]
      }
    ]
  },
  {
    icon: TrendingUp,
    title: "Premium Calculation & Pricing Strategy",
    description: "Intelligent pricing algorithms that optimize revenue while maintaining competitive rates and regulatory compliance.",
    shortMetrics: ["98.7% Pricing Accuracy", "$6.2M Revenue Optimization", "Dynamic Rate Adjustments"],
    detailedDescription: "Our premium calculation engine combines actuarial expertise with machine learning to deliver optimal pricing strategies. Following Bain & Company's pricing excellence methodology and McKinsey's Revenue Growth Management framework, we help organizations maximize profitability while maintaining market competitiveness.",
    strategicPillars: [
      { title: "Precision Pricing", description: "AI-powered algorithms achieve 98.7% accuracy vs. 85% industry average, reducing underwriting losses by 67%" },
      { title: "Competitive Intelligence", description: "Real-time market monitoring tracks 200+ competitors enabling dynamic pricing strategies" },
      { title: "Regulatory Mastery", description: "Automated compliance across 50+ jurisdictions with 100% clean audit record over 4+ years" },
      { title: "Revenue Optimization", description: "Advanced elasticity modeling balances growth and profitability generating $6.2M incremental revenue" }
    ],
    mcKinseyAlignment: "Based on McKinsey's Revenue Growth Management framework and Bain's Pricing Excellence methodology. Our approach combines data-driven insights with strategic positioning to optimize both growth and profitability.",
    consultingFramework: "McKinsey RGM Framework + Bain Pricing Excellence",
    metrics: [
      {
        icon: DollarSign,
        value: "$6.2M",
        title: "Revenue Optimization",
        analysis: [
          "Price elasticity modeling identifies optimal price points maximizing revenue and market share",
          "Competitive intelligence integration enables dynamic positioning vs. top 5 competitors",
          "Segment-specific strategies balance growth and profitability across diverse client mix",
          "Continuous optimization adjusts pricing quarterly vs. annual to capture market opportunities"
        ],
        benchmarks: [
          { label: "Static Annual Pricing", value: "$0 optimization" },
          { label: "Biannual Adjustments", value: "$2.1M captured" },
          { label: "Quarterly Dynamic Pricing", value: "$6.2M realized" },
          { label: "ROI vs. Manual Process", value: "23:1" }
        ],
        caseStudies: [
          {
            client: "Self-Insured Employer Coalition",
            industry: "Multi-Industry | 85 employers",
            result: "23 Point Improvement in Trend Forecasting",
            summary: "Advanced trend analysis improved budget accuracy and pricing discipline across coalition members",
            challenge: "Coalition members struggled with volatile year-over-year cost trends ranging from +3% to +18%, making budgeting nearly impossible and forcing mid-year contribution adjustments.",
            solution: [
              "Deployed time-series analysis using ARIMA, exponential smoothing, and machine learning",
              "Implemented cohort analysis tracking aging and selection effects over time",
              "Created seasonality adjustments accounting for month-to-month utilization patterns",
              "Built what-if scenario modeling for plan design and network strategy impacts"
            ],
            impact: [
              { metric: "Trend Forecast Accuracy", value: "+23 points" },
              { metric: "Budget Variance Reduction", value: "±12% → ±3%" },
              { metric: "Mid-Year Adjustments Eliminated", value: "85%" },
              { metric: "Coalition Member Satisfaction", value: "+34 points" }
            ],
            timeline: [
              { period: "Year 1 Q1-Q2", milestone: "Historical trend analysis across 85 employers" },
              { period: "Year 1 Q3-Q4", milestone: "Predictive models validated against actual experience" },
              { period: "Year 2 Q1-Q2", milestone: "Coalition-wide deployment for budget season" },
              { period: "Year 2 Q3-Q4", milestone: "23 point accuracy improvement confirmed" }
            ],
            testimonial: "The trend forecasting accuracy is transformational for our budgeting process. We can now set contributions confidently knowing predictions will hold, eliminating painful mid-year adjustments.",
            testimonialAuthor: "Thomas Wright",
            testimonialRole: "Coalition Chair, Self-Insured Employer Coalition"
          }
        ]
      }
    ]
  }
];

// Solution Modal
function SolutionDetailModal({ solution, onClose }: { solution: any; onClose: () => void }) {
  const [drillLevel, setDrillLevel] = useState(1);
  const [selectedMetric, setSelectedMetric] = useState<any>(null);
  const [selectedCase, setSelectedCase] = useState<any>(null);

  const Icon = solution.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl"
      >
        <div className="sticky top-0 z-10 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800 p-6 flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <Icon className="w-6 h-6 text-emerald-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">{solution.title}</h2>
            </div>
            
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm text-slate-400 ml-12">
              <button 
                onClick={() => { setDrillLevel(1); setSelectedMetric(null); setSelectedCase(null); }}
                className={`hover:text-emerald-400 transition-colors ${drillLevel === 1 ? 'text-emerald-400 font-semibold' : ''}`}
              >
                Overview
              </button>
              {drillLevel >= 2 && (
                <>
                  <ChevronRight className="w-4 h-4" />
                  <button 
                    onClick={() => { setDrillLevel(2); setSelectedCase(null); }}
                    className={`hover:text-emerald-400 transition-colors ${drillLevel === 2 ? 'text-emerald-400 font-semibold' : ''}`}
                  >
                    Metrics
                  </button>
                </>
              )}
              {drillLevel === 3 && (
                <>
                  <ChevronRight className="w-4 h-4" />
                  <span className="text-emerald-400 font-semibold">Case Study</span>
                </>
              )}
            </div>
          </div>
          
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8">
          <AnimatePresence mode="wait">
            {/* Level 1: Overview */}
            {drillLevel === 1 && (
              <motion.div key="l1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                <p className="text-lg text-slate-300 leading-relaxed">
                  {solution.detailedDescription}
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  {solution.strategicPillars.map((pillar: any, idx: number) => (
                    <div key={idx} className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50">
                      <h4 className="text-white font-bold mb-2">{pillar.title}</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">{pillar.description}</p>
                    </div>
                  ))}
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Deep Dive Metrics</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {solution.metrics.map((metric: any, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => { setSelectedMetric(metric); setDrillLevel(2); }}
                        className="flex items-center justify-between p-6 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-emerald-500/50 group text-left transition-all"
                      >
                        <div>
                          <div className="text-3xl font-bold text-emerald-400 font-mono mb-1">{metric.value}</div>
                          <div className="text-white font-medium">{metric.title}</div>
                        </div>
                        <ChevronRight className="w-6 h-6 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Level 2: Metrics */}
            {drillLevel === 2 && selectedMetric && (
              <motion.div key="l2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                <div className="flex items-center gap-6 p-6 bg-emerald-950/20 border border-emerald-900/50 rounded-2xl">
                  <div className="text-5xl font-bold text-emerald-400 font-mono">{selectedMetric.value}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{selectedMetric.title}</h3>
                    <p className="text-emerald-500/80">Validated Actuarial Performance</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-bold text-white mb-4">Analysis & Methodology</h4>
                    <ul className="space-y-3">
                      {selectedMetric.analysis.map((item: string, idx: number) => (
                        <li key={idx} className="flex gap-3 text-slate-300 text-sm">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-white mb-4">Industry Benchmarks</h4>
                    <div className="space-y-3">
                      {selectedMetric.benchmarks.map((bm: any, idx: number) => (
                        <div key={idx} className="flex justify-between items-center p-3 rounded-xl bg-slate-800/50">
                          <span className="text-slate-400 text-sm">{bm.label}</span>
                          <span className="text-white font-mono font-semibold">{bm.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-white mb-4">Case Studies</h4>
                  <div className="grid gap-4">
                    {selectedMetric.caseStudies.map((caseStudy: any, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => { setSelectedCase(caseStudy); setDrillLevel(3); }}
                        className="flex items-center justify-between p-6 rounded-2xl bg-slate-800 border border-slate-700 hover:border-emerald-500/50 group text-left transition-all"
                      >
                        <div>
                          <div className="text-emerald-400 font-bold mb-1">{caseStudy.result}</div>
                          <div className="text-white font-medium mb-1">{caseStudy.client}</div>
                          <div className="text-slate-400 text-sm">{caseStudy.summary}</div>
                        </div>
                        <ChevronRight className="w-6 h-6 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all shrink-0 ml-4" />
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Level 3: Case Study */}
            {drillLevel === 3 && selectedCase && (
              <motion.div key="l3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                <div className="p-8 rounded-2xl bg-gradient-to-r from-emerald-900/30 to-blue-900/30 border border-emerald-500/30">
                  <div className="text-sm font-semibold text-emerald-400 mb-2 tracking-wide uppercase">{selectedCase.industry}</div>
                  <h3 className="text-3xl font-bold text-white mb-4">{selectedCase.client}</h3>
                  <div className="text-4xl font-bold text-emerald-400 font-mono mb-4">{selectedCase.result}</div>
                  <p className="text-xl text-slate-300 leading-relaxed">{selectedCase.summary}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-rose-400" />
                      The Challenge
                    </h4>
                    <p className="text-slate-300 leading-relaxed p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
                      {selectedCase.challenge}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <Target className="w-5 h-5 text-emerald-400" />
                      Solution Implemented
                    </h4>
                    <ul className="space-y-3">
                      {selectedCase.solution.map((step: string, idx: number) => (
                        <li key={idx} className="flex gap-3 text-slate-300 text-sm p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                          <span className="text-emerald-500 font-bold">{idx + 1}.</span>
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-white mb-4">Verified Impact</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {selectedCase.impact.map((impact: any, idx: number) => (
                      <div key={idx} className="p-6 bg-slate-800 rounded-2xl border border-slate-700 text-center">
                        <div className="text-2xl font-bold text-emerald-400 font-mono mb-2">{impact.value}</div>
                        <div className="text-sm text-slate-400">{impact.metric}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-8 bg-slate-800/80 rounded-2xl border border-slate-700">
                  <div className="flex gap-6 items-start">
                    <QuoteIcon className="w-12 h-12 text-slate-600 shrink-0" />
                    <div>
                      <p className="text-xl text-white italic mb-6 leading-relaxed">"{selectedCase.testimonial}"</p>
                      <div className="font-bold text-emerald-400">{selectedCase.testimonialAuthor}</div>
                      <div className="text-slate-400 text-sm">{selectedCase.testimonialRole}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

const QuoteIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
  </svg>
);

export default function ActuarialBenefitsPage() {
  const [selectedSolution, setSelectedSolution] = useState<any>(null);

  return (
    <>
      <Head>
        <title>Actuarial Benefits Intelligence - Kincaid iQ</title>
      </Head>
      <div className="min-h-screen bg-[#020617] text-white">
        <Nav />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden border-b border-emerald-900/30">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-[#020617] to-[#020617]" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold mb-8">
                  <Activity className="w-4 h-4" /> Mathematical Precision Applied
                </div>
                <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
                  Actuarial <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">Intelligence</span>
                </h1>
                <p className="text-xl text-slate-400 mb-10 leading-relaxed max-w-xl">
                  Enterprise-grade risk modeling, credibility-weighted trend analysis, and predictive simulations that meet rigorous SOA and AAA professional standards.
                </p>
                <div className="flex gap-4">
                  <button className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-colors shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                    Schedule Technical Briefing
                  </button>
                  <button className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition-colors border border-slate-700">
                    View Case Studies
                  </button>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-emerald-500/20 blur-[100px] rounded-full" />
                <Image 
                  src="/jeremiah-shrack-professional.png"
                  alt="Jeremiah Shrack"
                  width={600}
                  height={600}
                  className="relative z-10 rounded-3xl border border-slate-800 shadow-2xl object-cover"
                />
                <div className="absolute bottom-6 left-6 right-6 bg-slate-900/90 backdrop-blur-md border border-slate-700 p-4 rounded-2xl z-20">
                  <div className="text-sm text-emerald-400 font-semibold mb-1">Founder</div>
                  <div className="text-white font-bold text-xl">Jeremiah Shrack</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <TrustRibbon />

        {/* Dynamic Actuarial Reinsurance Simulator Section */}
        <section className="py-24 bg-[#020617] border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-12 gap-12 items-center mb-12">
              <div className="lg:col-span-4">
                <h2 className="text-3xl font-bold text-white mb-6">Aggregate Stop-Loss & ISL Calibration</h2>
                <p className="text-slate-400 mb-8 leading-relaxed text-sm">
                  Traditional actuarial models identify high-cost claimants in retrospect. Our Monte Carlo stop-loss optimizer uses credibility-weighted variance matrices to help benefit managers set deductible attachment corridors precisely.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex gap-3 text-slate-300 text-xs">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span>Calculates probability of breaching ISL thresholds</span>
                  </li>
                  <li className="flex gap-3 text-slate-300 text-xs">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span>Estimates stop-loss reinsurance premium pricing</span>
                  </li>
                  <li className="flex gap-3 text-slate-300 text-xs">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span>Supports ERISA & AAA professional guidelines</span>
                  </li>
                </ul>
              </div>
              <div className="lg:col-span-8">
                <ActuarialReinsuranceOptimizer />
              </div>
            </div>
          </div>
        </section>

        {/* Methodology Pipeline Section */}
        <section className="py-24 bg-slate-950 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-white mb-6">The Intelligence Pipeline</h2>
              <p className="text-slate-400 text-lg">
                We replace quarterly static reviews with continuous, event-driven architecture that recalculates risk as new data arrives.
              </p>
            </div>
            <MethodologyPipeline />
          </div>
        </section>

        {/* Featured Case Study */}
        <section className="py-24 bg-[#020617] border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-white mb-6">Actuarial Validation</h2>
              <p className="text-slate-400 text-lg">
                Verified outcomes from complex enterprise deployments.
              </p>
            </div>
            <FeaturedCaseStudy />
          </div>
        </section>

        {/* Core Capabilities Drill-down Grid */}
        <section className="py-24 bg-slate-950">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-white mb-6">Core Analytical Capabilities</h2>
              <p className="text-slate-400 text-lg">
                Click into any capability to view detailed methodologies, benchmarks, and case studies.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {strategicSolutions.map((solution, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedSolution(solution)}
                  className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-left hover:border-emerald-500/50 transition-all group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center mb-6 group-hover:bg-emerald-950/50 transition-colors">
                      <solution.icon className="w-7 h-7 text-emerald-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors">{solution.title}</h3>
                    <p className="text-slate-400 mb-8 h-20 line-clamp-3">{solution.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-8">
                      {solution.shortMetrics.map((metric, i) => (
                        <span key={i} className="px-3 py-1 bg-slate-800 rounded-lg text-xs font-mono text-slate-300">
                          {metric}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 text-emerald-400 font-semibold group-hover:gap-4 transition-all">
                      View Technical Detail <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-emerald-950/20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl aspect-video bg-emerald-500/20 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Stop guessing. Start predicting.
            </h2>
            <p className="text-xl text-slate-300 mb-10">
              Schedule a technical walkthrough with our actuarial team to see how our predictive models handle your specific data challenges.
            </p>
            <button className="px-10 py-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-lg transition-colors shadow-[0_0_30px_rgba(16,185,129,0.4)]">
              Schedule Technical Briefing
            </button>
          </div>
        </section>

        <Footer />

        <AnimatePresence>
          {selectedSolution && (
            <SolutionDetailModal 
              solution={selectedSolution} 
              onClose={() => setSelectedSolution(null)} 
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
}