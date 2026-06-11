import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { FileText, TrendingUp, Shield, ChevronRight, Download, ExternalLink, BarChart3, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const reports = [
  {
    id: "rx-defense",
    title: "Rx Defense: PBM Contract X-Ray",
    subtitle: "Forensic PBM Contract Analysis",
    description: "Comprehensive forensic audit methodology for pharmacy benefit management contracts. Identifies contractual leakage, spread pricing mechanisms, and rebate optimization opportunities through evidence-based analysis.",
    href: "/solutions/rx-defense",
    category: "Contract Intelligence",
    readTime: "12 min read",
    keyFindings: [
      "Average 23% contractual leakage across analyzed plans",
      "Spread pricing mechanisms averaging $47 per prescription",
      "Rebate pass-through clauses with 18-24 month disclosure delays"
    ]
  },
  {
    id: "actuarial",
    title: "Actuarial Benefits Intelligence",
    subtitle: "Risk Modeling & Trend Projections",
    description: "Monte Carlo simulation frameworks for health plan risk assessment. Quantifies volatility, trend persistence, and stop-loss optimization strategies using historical claims data and actuarial modeling.",
    href: "/solutions/actuarial-benefits",
    category: "Risk Analytics",
    readTime: "15 min read",
    keyFindings: [
      "Volatility metrics exceed industry benchmarks by 34%",
      "Trend decomposition reveals 12% administrative cost component",
      "Stop-loss optimization yields 8-14% premium reduction potential"
    ]
  },
  {
    id: "mark-cuban",
    title: "Cost Plus Drug Pricing Analysis",
    subtitle: "Alternative Distribution Models",
    description: "Comparative analysis of traditional PBM pricing versus cost-plus distribution models. Examines Mark Cuban Cost Plus Drug Company pricing transparency and potential cost savings for common therapeutic classes.",
    href: "/solutions/mark-cuban-cost-drugs",
    category: "Pricing Intelligence",
    readTime: "10 min read",
    keyFindings: [
      "Average 65% cost reduction on 127 commonly prescribed medications",
      "Full pricing transparency with published wholesale acquisition costs",
      "Elimination of spread pricing and rebate complexity"
    ]
  },
  {
    id: "nadac-benchmark",
    title: "NADAC Benchmarking Intelligence",
    subtitle: "National Drug Cost Reference Pricing",
    description: "Analysis of National Average Drug Acquisition Cost data for pharmacy reimbursement benchmarking. Identifies pricing anomalies and validates PBM reimbursement rate appropriateness against federal pricing standards.",
    href: "/solutions/nadac-benchmarking",
    category: "Benchmarking",
    readTime: "8 min read",
    keyFindings: [
      "42% of analyzed prescriptions exceed NADAC + $3 dispensing fee",
      "Generic pricing variance of 180-340% above NADAC reference",
      "Brand drug reimbursement 23% above wholesale acquisition cost"
    ]
  }
];

export default function KincaidIQIntelligenceSeries() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = ["all", ...Array.from(new Set(reports.map(r => r.category)))];
  
  const filteredReports = selectedCategory === "all" 
    ? reports 
    : reports.filter(r => r.category === selectedCategory);

  return (
    <>
      <Head>
        <title>Intelligence Series | Kincaid IQ Data Sciences Lab</title>
        <meta name="description" content="Forensic PBM intelligence reports and actuarial analysis for fiduciaries, actuaries, and capital markets." />
      </Head>

      <Nav />

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative pt-32 pb-16 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-burgundy-50 border border-burgundy-200 rounded mb-6">
                <FileText className="w-4 h-4 text-burgundy-700" />
                <span className="text-sm font-medium text-burgundy-900">Forensic Intelligence Reports</span>
              </div>
              
              <h1 className="text-5xl font-serif font-bold text-navy-900 mb-6 leading-tight">
                Kincaid IQ Intelligence Series
              </h1>
              
              <p className="text-xl text-slate-600 leading-relaxed mb-8">
                Evidence-based forensic audits that transform PBM contract opacity into actionable intelligence. Built for fiduciaries, actuaries, and capital markets professionals requiring rigorous analytical frameworks.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/request-demo">
                  <Button className="bg-burgundy-700 hover:bg-burgundy-800 text-white">
                    Request Intelligence Brief
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/solutions/rx-defense">
                  <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50">
                    View Sample Report
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="border-b border-slate-200 bg-white sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center gap-3 overflow-x-auto">
              <span className="text-sm font-medium text-slate-600 whitespace-nowrap">Filter by:</span>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded border text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? "bg-navy-700 text-white border-navy-700"
                      : "bg-white text-slate-700 border-slate-300 hover:border-slate-400"
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
            <div className="grid gap-8">
              {filteredReports.map((report) => (
                <Card key={report.id} className="border border-slate-200 hover:border-slate-300 transition-colors">
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="px-3 py-1 text-xs font-medium text-burgundy-900 bg-burgundy-50 border border-burgundy-200 rounded">
                            {report.category}
                          </span>
                          <span className="text-sm text-slate-500">{report.readTime}</span>
                        </div>
                        
                        <h3 className="text-2xl font-serif font-bold text-navy-900 mb-2">
                          {report.title}
                        </h3>
                        
                        <p className="text-sm font-medium text-burgundy-700 mb-4">
                          {report.subtitle}
                        </p>
                        
                        <p className="text-slate-600 leading-relaxed mb-6">
                          {report.description}
                        </p>

                        {/* Key Findings */}
                        <div className="border-l-4 border-gold-500 pl-4 mb-6">
                          <h4 className="text-sm font-semibold text-slate-900 mb-3">Key Findings</h4>
                          <ul className="space-y-2">
                            {report.keyFindings.map((finding, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                                <ChevronRight className="w-4 h-4 mt-0.5 text-gold-600 flex-shrink-0" />
                                <span>{finding}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex items-center gap-4">
                          <Link href={report.href}>
                            <Button className="bg-navy-700 hover:bg-navy-800 text-white">
                              Read Full Report
                              <ChevronRight className="w-4 h-4 ml-2" />
                            </Button>
                          </Link>
                          <Link href={report.href}>
                            <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50">
                              <Download className="w-4 h-4 mr-2" />
                              Download PDF
                            </Button>
                          </Link>
                        </div>
                      </div>

                      <div className="ml-6 flex-shrink-0">
                        <div className="w-16 h-16 rounded-lg border-2 border-slate-200 bg-slate-50 flex items-center justify-center">
                          {report.category === "Contract Intelligence" && <Shield className="w-8 h-8 text-burgundy-600" />}
                          {report.category === "Risk Analytics" && <BarChart3 className="w-8 h-8 text-navy-600" />}
                          {report.category === "Pricing Intelligence" && <TrendingUp className="w-8 h-8 text-gold-600" />}
                          {report.category === "Benchmarking" && <AlertCircle className="w-8 h-8 text-slate-600" />}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Methodology Section */}
        <section className="py-16 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-serif font-bold text-navy-900 mb-6">
                Analytical Methodology
              </h2>
              
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-600 leading-relaxed mb-4">
                  Each intelligence report in the Kincaid IQ series undergoes rigorous forensic analysis using proprietary actuarial modeling, contract intelligence frameworks, and evidence-based validation protocols.
                </p>
                
                <p className="text-slate-600 leading-relaxed mb-4">
                  Our methodology integrates:
                </p>
                
                <ul className="space-y-2 text-slate-600 mb-6">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-5 h-5 mt-0.5 text-burgundy-600 flex-shrink-0" />
                    <span>Monte Carlo simulation frameworks for risk quantification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-5 h-5 mt-0.5 text-burgundy-600 flex-shrink-0" />
                    <span>Contract clause extraction and semantic analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-5 h-5 mt-0.5 text-burgundy-600 flex-shrink-0" />
                    <span>Federal pricing benchmark validation (NADAC, WAC, AWP)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-5 h-5 mt-0.5 text-burgundy-600 flex-shrink-0" />
                    <span>Actuarial trend decomposition and persistence modeling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-5 h-5 mt-0.5 text-burgundy-600 flex-shrink-0" />
                    <span>Retrospective claims data analysis and pattern recognition</span>
                  </li>
                </ul>

                <p className="text-slate-600 leading-relaxed">
                  All findings are validated against industry benchmarks, regulatory guidance, and peer-reviewed actuarial standards to ensure analytical rigor and professional defensibility.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-serif font-bold text-navy-900 mb-6">
                Request Custom Intelligence Brief
              </h2>
              
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Our forensic analysis team can produce customized intelligence reports tailored to your organization's specific PBM contracts, claims data, and risk profile.
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/request-demo">
                  <Button className="bg-burgundy-700 hover:bg-burgundy-800 text-white">
                    Schedule Consultation
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50">
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