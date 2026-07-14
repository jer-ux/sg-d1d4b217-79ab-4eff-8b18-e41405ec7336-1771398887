import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Shield,
  AlertTriangle,
  DollarSign,
  FileText,
  TrendingUp,
  CheckCircle,
  BarChart3,
  Users,
  ChevronRight,
  Download,
  Eye,
  Scale,
  Lock,
  Target,
  Zap,
  BookOpen
} from "lucide-react";
import { RxDefenseHero } from "@/components/rx-defense/RxDefenseHero";
import { ProblemStatement } from "@/components/rx-defense/ProblemStatement";
import { ProvisionCard } from "@/components/rx-defense/ProvisionCard";
import { ROICalculator } from "@/components/rx-defense/ROICalculator";
import { FAQSection } from "@/components/rx-defense/FAQSection";
import { ParticleField3D } from "@/components/premium/ParticleField3D";
import { motion } from "framer-motion";

export default function RxDefensePage() {
  const [activeProvision, setActiveProvision] = useState<string | null>(null);

  return (
    <>
      <Head>
        <title>PBM Contract Clarity | Kincaid Health Data Sciences Lab</title>
        <meta 
          name="description" 
          content="Forensic PBM contract analysis and clause-by-clause validation to identify spread pricing, rebate retention, and contractual leakage." 
        />
      </Head>
      <SEO
        title="PBM Contract Clarity: PBM Contract Forensics | Kincaid Health"
        description="Automated PBM contract monitoring, guarantee enforcement, and pharmacy claims auditing. Defend your EBITDA from hidden PBM fees and spread pricing."
      />

      <Nav />

      <main className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black relative overflow-hidden">
        <ParticleField3D />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/10 via-transparent to-transparent" />
        
        {/* Hero Section */}
        <section className="relative pt-24 pb-12 px-4">
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8"
            >
              <Badge className="mb-6 bg-amber-500/20 text-amber-300 border-amber-500/30">
                Forensic Contract Intelligence
              </Badge>
              <motion.h1 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-5xl md:text-7xl font-bold mb-6"
              >
                <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-400 bg-clip-text text-transparent">
                  PBM Contract Clarity
                </span>
              </motion.h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-4xl mx-auto">
                Forensic PBM Contract Analysis & Clause-by-Clause Validation
              </p>
              <p className="text-lg text-gray-400 mb-8 max-w-3xl mx-auto">
                Identify spread pricing, rebate retention, and contractual leakage with forensic precision
              </p>
            </motion.div>
          </div>
        </section>

        {/* Problem Statement */}
        <ProblemStatement />

        {/* The PBM Contract Clarity Framework */}
        <section className="py-20 border-t border-slate-800 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-900/5 to-transparent" />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <Badge className="bg-amber-500/10 text-amber-400 border border-amber-500/30 mb-4">
                THE FRAMEWORK
              </Badge>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold text-white mb-6"
              >
                The PBM Contract Clarity Framework
              </motion.h2>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                A comprehensive forensic methodology for analyzing pharmacy benefit management contracts, detecting hidden costs, and quantifying contractual leakage.
              </p>
            </div>

            {/* Four Pillars */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {[
                { icon: FileText, title: "Clause Extraction", description: "Semantic NLP analysis identifies and classifies every contractual obligation, pricing term, and financial provision.", color: "amber" },
                { icon: BarChart3, title: "Spread Detection", description: "Statistical algorithms quantify pricing spreads between acquisition costs and reimbursement rates across all dispensing channels.", color: "amber" },
                { icon: Scale, title: "Rebate Validation", description: "Reconciliation frameworks verify pass-through percentages, disclosure timelines, and retained rebate calculations.", color: "amber" },
                { icon: AlertTriangle, title: "Risk Scoring", description: "Multi-factor risk assessment quantifies contract exposure, identifies material breaches, and prioritizes audit findings.", color: "amber" }
              ].map((pillar, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, rotateY: 5, z: 50 }}
                  className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-amber-500/50 transition-all backdrop-blur-sm transform-gpu hover:shadow-2xl hover:shadow-amber-500/20"
                >
                  <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center mb-4">
                    <pillar.icon className="w-6 h-6 text-amber-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-slate-400">
                    {pillar.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Detailed Framework Sections */}
            <div className="space-y-8">
              <ProvisionCard
                icon={FileText}
                title="Clause-by-Clause Analysis"
                description="Forensic examination of every contract provision"
                isActive={activeProvision === "clause"}
                onToggle={() => setActiveProvision(activeProvision === "clause" ? null : "clause")}
                details={[
                  "Pricing formulas and MAC definitions",
                  "Rebate pass-through mechanisms",
                  "Performance guarantee language",
                  "Audit rights and disclosure obligations",
                  "Administrative fee structures",
                  "Data ownership and reporting requirements"
                ]}
              />

              <ProvisionCard
                icon={DollarSign}
                title="Spread Pricing Detection"
                description="Quantifying hidden margins and undisclosed retention"
                isActive={activeProvision === "spread"}
                onToggle={() => setActiveProvision(activeProvision === "spread" ? null : "spread")}
                details={[
                  "Acquisition cost validation against NADAC/WAC benchmarks",
                  "Reimbursement rate analysis by dispensing channel",
                  "Specialty pharmacy markup identification",
                  "Mail-order vs retail pricing disparities",
                  "Brand vs generic spread quantification",
                  "Therapeutic class-specific margin analysis"
                ]}
              />

              <ProvisionCard
                icon={Scale}
                title="Rebate Reconciliation"
                description="Validating manufacturer rebate reporting and pass-through"
                isActive={activeProvision === "rebate"}
                onToggle={() => setActiveProvision(activeProvision === "rebate" ? null : "rebate")}
                details={[
                  "Manufacturer contract comparison",
                  "GPO agreement validation",
                  "Pass-through percentage verification",
                  "Retained rebate calculation",
                  "Disclosure timeline compliance",
                  "Administrative fee misclassification detection"
                ]}
              />

              <ProvisionCard
                icon={AlertTriangle}
                title="Performance Guarantee Verification"
                description="Testing claimed savings against contractual commitments"
                isActive={activeProvision === "guarantee"}
                onToggle={() => setActiveProvision(activeProvision === "guarantee" ? null : "guarantee")}
                details={[
                  "Discount percentage validation",
                  "Generic dispensing rate verification",
                  "Network adequacy compliance testing",
                  "Specialty pharmacy utilization review",
                  "Prior authorization approval rate analysis",
                  "Member disruption and abandonment metrics"
                ]}
              />
            </div>
          </div>
        </section>

        {/* ROI Calculator */}
        <section className="py-20 border-t border-slate-800 bg-gradient-to-b from-slate-950 to-black">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 mb-4">
                CALCULATE YOUR IMPACT
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                PBM Contract Clarity ROI Calculator
              </h2>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                Estimate the potential contractual leakage in your pharmacy benefit program based on industry benchmarks and forensic audit findings.
              </p>
            </div>

            <ROICalculator />
          </div>
        </section>

        {/* Case Studies */}
        <section className="py-20 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <Badge className="bg-blue-500/10 text-blue-400 border border-blue-500/30 mb-4">
                PROVEN RESULTS
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Real-World Contract Intelligence
              </h2>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                Case studies demonstrating PBM Contract Clarity methodology applied to actual employer health plans.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  amount: "$14.2M",
                  label: "Contractual Leakage Identified",
                  title: "Multi-Employer Welfare Association",
                  description: "Comprehensive forensic audit uncovered spread pricing, undisclosed GPO fees, and rebate retention totaling $14.2M annually.",
                  link: "/Kincaid_iQ_Schwarz_Partners_MEWA_14_2M_Defense.pdf",
                  linkText: "Download Full Report",
                  icon: Shield
                },
                {
                  amount: "340%",
                  label: "Above NADAC Reference",
                  title: "Generic MAC Pricing Analysis",
                  description: "Statistical analysis revealed generic drug reimbursement rates 180-340% above federal NADAC benchmarks.",
                  link: "/solutions/nadac-benchmarking",
                  linkText: "View Analysis",
                  icon: BarChart3
                },
                {
                  amount: "23%",
                  label: "Average Leakage Rate",
                  title: "Cross-Plan Benchmarking Study",
                  description: "Analysis of 47 employer plans identified average contractual leakage of 23% relative to cost-plus pricing models.",
                  link: "/solutions/mark-cuban-cost-drugs",
                  linkText: "Compare Models",
                  icon: TrendingUp
                }
              ].map((caseStudy, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-slate-900/50 border-slate-800 p-6 h-full hover:border-amber-500/50 transition-all">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center">
                        <caseStudy.icon className="w-6 h-6 text-amber-400" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-white">{caseStudy.amount}</div>
                        <div className="text-xs text-slate-400">{caseStudy.label}</div>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {caseStudy.title}
                    </h3>
                    <p className="text-sm text-slate-400 mb-4">
                      {caseStudy.description}
                    </p>
                    <Link href={caseStudy.link} target={caseStudy.link.endsWith('.pdf') ? "_blank" : undefined}>
                      <Button variant="outline" size="sm" className="w-full border-slate-700 text-slate-300">
                        {caseStudy.link.endsWith('.pdf') ? <Download className="w-4 h-4 mr-2" /> : caseStudy.icon === BarChart3 ? <Eye className="w-4 h-4 mr-2" /> : <Target className="w-4 h-4 mr-2" />}
                        {caseStudy.linkText}
                      </Button>
                    </Link>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Methodology */}
        <section className="py-20 border-t border-slate-800 bg-gradient-to-b from-black to-slate-950">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <Badge className="bg-purple-500/10 text-purple-400 border border-purple-500/30 mb-4">
                  METHODOLOGY
                </Badge>
                <h2 className="text-4xl font-bold text-white mb-6">
                  Forensic Analysis Methodology
                </h2>
                <p className="text-lg text-slate-400">
                  PBM Contract Clarity employs rigorous actuarial and analytical frameworks validated against industry standards and peer-reviewed research.
                </p>
              </div>

              <div className="space-y-8">
                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">Semantic Clause Extraction</h3>
                      <p className="text-slate-400 mb-4">
                        Natural language processing algorithms classify contract provisions into standardized taxonomies (pricing terms, rebate mechanisms, performance guarantees, audit rights, disclosure obligations).
                      </p>
                      <ul className="space-y-2 text-sm text-slate-400">
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 mt-0.5 text-amber-500 flex-shrink-0" />
                          <span>Named entity recognition for financial terms and obligations</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 mt-0.5 text-amber-500 flex-shrink-0" />
                          <span>Dependency parsing for contractual relationships and contingencies</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 mt-0.5 text-amber-500 flex-shrink-0" />
                          <span>Clause classification using supervised machine learning models</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BarChart3 className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">Statistical Spread Detection</h3>
                      <p className="text-slate-400 mb-4">
                        Transaction-level pricing analysis compares reimbursement rates to acquisition cost benchmarks (NADAC, WAC, ASP) across all NDCs and dispensing channels.
                      </p>
                      <ul className="space-y-2 text-sm text-slate-400">
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 mt-0.5 text-amber-500 flex-shrink-0" />
                          <span>Outlier detection using Tukey fences and z-score analysis</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 mt-0.5 text-amber-500 flex-shrink-0" />
                          <span>Distribution fitting to identify systematic vs random pricing deviations</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 mt-0.5 text-amber-500 flex-shrink-0" />
                          <span>Time-series analysis to detect trend changes and pricing inflection points</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Scale className="w-6 h-6 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">Rebate Reconciliation Framework</h3>
                      <p className="text-slate-400 mb-4">
                        Multi-source validation reconciles PBM-reported rebates against manufacturer contracts, GPO agreements, and industry benchmarks.
                      </p>
                      <ul className="space-y-2 text-sm text-slate-400">
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 mt-0.5 text-amber-500 flex-shrink-0" />
                          <span>Benford's Law analysis to detect fabricated or manipulated rebate data</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 mt-0.5 text-amber-500 flex-shrink-0" />
                          <span>Regression modeling to predict expected rebates by therapeutic class</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 mt-0.5 text-amber-500 flex-shrink-0" />
                          <span>Variance analysis to quantify retained rebate spreads and disclosure gaps</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-rose-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="w-6 h-6 text-rose-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">Risk Scoring & Prioritization</h3>
                      <p className="text-slate-400 mb-4">
                        Multi-factor risk assessment quantifies contract exposure based on leakage magnitude, verification difficulty, and regulatory compliance implications.
                      </p>
                      <ul className="space-y-2 text-sm text-slate-400">
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 mt-0.5 text-amber-500 flex-shrink-0" />
                          <span>Financial impact scoring weighted by annualized cost and recovery probability</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 mt-0.5 text-amber-500 flex-shrink-0" />
                          <span>Regulatory risk rating based on ERISA compliance gaps and fiduciary exposure</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 mt-0.5 text-amber-500 flex-shrink-0" />
                          <span>Audit complexity assessment to estimate investigation timeline and resource requirements</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQSection />

        {/* CTA Section */}
        <section className="py-20 border-t border-slate-800">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <Badge className="bg-amber-500/10 text-amber-400 border border-amber-500/30 mb-6">
              GET STARTED
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Deploy PBM Contract Clarity
            </h2>
            <p className="text-xl text-slate-400 mb-10">
              Request a comprehensive forensic analysis of your PBM contracts. Delivered in 30-45 days with full methodology disclosure and actionable remediation protocols.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/request-demo">
                <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-black font-bold">
                  <Shield className="w-5 h-5 mr-2" />
                  Request Contract Analysis
                </Button>
              </Link>
              <Link href="/Kincaid-IQ-Rx-Defense-IQ-2026-06-03_1_.pdf" target="_blank">
                <Button size="lg" variant="outline" className="border-slate-700 text-white hover:bg-slate-900">
                  <Download className="w-5 h-5 mr-2" />
                  Download Methodology Guide
                </Button>
              </Link>
            </div>

            <div className="mt-12 grid md:grid-cols-3 gap-6 text-left">
              <div className="bg-slate-900/30 border border-slate-800 rounded-lg p-6">
                <Zap className="w-8 h-8 text-amber-400 mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">
                  30-45 Day Turnaround
                </h3>
                <p className="text-sm text-slate-400">
                  Comprehensive forensic analysis delivered with full documentation and board-ready executive summary.
                </p>
              </div>

              <div className="bg-slate-900/30 border border-slate-800 rounded-lg p-6">
                <Lock className="w-8 h-8 text-amber-400 mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">
                  Confidential & Secure
                </h3>
                <p className="text-sm text-slate-400">
                  SOC 2 Type II certified infrastructure with attorney-client privilege protection available.
                </p>
              </div>

              <div className="bg-slate-900/30 border border-slate-800 rounded-lg p-6">
                <BookOpen className="w-8 h-8 text-amber-400 mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">
                  Full Methodology Disclosure
                </h3>
                <p className="text-sm text-slate-400">
                  Complete analytical framework documentation including data sources, algorithms, and validation procedures.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}