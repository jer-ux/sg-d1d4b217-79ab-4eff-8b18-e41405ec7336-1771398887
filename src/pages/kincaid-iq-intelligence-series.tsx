import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { FileText, TrendingUp, Shield, ChevronRight, Download, ExternalLink, BarChart3, AlertCircle, Users, Award, Clock } from "lucide-react";
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
    featured: true,
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

  const featuredReport = reports.find(r => r.featured);

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

        {/* Impact Metrics */}
        <section className="py-12 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-serif font-bold text-navy-900 mb-2">$127M</div>
                <div className="text-sm text-slate-600">Identified Contractual Leakage</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-serif font-bold text-navy-900 mb-2">4</div>
                <div className="text-sm text-slate-600">Published Intelligence Reports</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-serif font-bold text-navy-900 mb-2">23%</div>
                <div className="text-sm text-slate-600">Average Cost Reduction</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-serif font-bold text-navy-900 mb-2">89</div>
                <div className="text-sm text-slate-600">Organizations Served</div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Report */}
        {featuredReport && (
          <section className="py-16 bg-slate-50 border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex items-center gap-2 mb-8">
                <Award className="w-5 h-5 text-gold-600" />
                <h2 className="text-2xl font-serif font-bold text-navy-900">Featured Intelligence Report</h2>
              </div>

              <Card className="border-2 border-burgundy-200 bg-white overflow-hidden">
                <div className="p-10">
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 text-xs font-medium text-burgundy-900 bg-burgundy-50 border border-burgundy-200 rounded">
                          {featuredReport.category}
                        </span>
                        <span className="text-sm text-slate-500">{featuredReport.readTime}</span>
                      </div>
                      
                      <h3 className="text-3xl font-serif font-bold text-navy-900 mb-3">
                        {featuredReport.title}
                      </h3>
                      
                      <p className="text-base font-medium text-burgundy-700 mb-6">
                        {featuredReport.subtitle}
                      </p>
                      
                      <p className="text-slate-600 leading-relaxed mb-8 text-lg">
                        {featuredReport.description}
                      </p>

                      <div className="flex items-center gap-4">
                        <Link href={featuredReport.href}>
                          <Button className="bg-burgundy-700 hover:bg-burgundy-800 text-white">
                            Read Full Report
                            <ChevronRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                        <Link href={featuredReport.href}>
                          <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50">
                            <Download className="w-4 h-4 mr-2" />
                            Download PDF
                          </Button>
                        </Link>
                      </div>
                    </div>

                    <div>
                      <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
                        <h4 className="text-sm font-semibold text-slate-900 mb-4">Key Findings</h4>
                        <ul className="space-y-3">
                          {featuredReport.keyFindings.map((finding, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                              <ChevronRight className="w-4 h-4 mt-0.5 text-burgundy-600 flex-shrink-0" />
                              <span>{finding}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </section>
        )}

        {/* Category Filter */}
        <section className="border-b border-slate-200 bg-white sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center gap-3 overflow-x-auto">
              <span className="text-sm font-medium text-slate-600 whitespace-nowrap">Filter by Category:</span>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded border text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? "bg-navy-700 text-white border-navy-700"
                      : "bg-white text-slate-700 border-slate-300 hover:border-slate-400 hover:bg-slate-50"
                  }`}
                >
                  {category === "all" ? "All Reports" : category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Reports Grid */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-serif font-bold text-navy-900 mb-8">All Intelligence Reports</h2>
            
            <div className="grid gap-6">
              {filteredReports.filter(r => !r.featured).map((report) => (
                <Card key={report.id} className="border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all">
                  <div className="p-8">
                    <div className="grid md:grid-cols-5 gap-6">
                      <div className="md:col-span-4">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="px-3 py-1 text-xs font-medium text-burgundy-900 bg-burgundy-50 border border-burgundy-200 rounded">
                            {report.category}
                          </span>
                          <span className="flex items-center gap-1 text-sm text-slate-500">
                            <Clock className="w-3.5 h-3.5" />
                            {report.readTime}
                          </span>
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
                        <div className="border-l-4 border-gold-500 pl-4 mb-6 bg-gold-50/30 py-3">
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

                        <div className="flex items-center gap-3">
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

                      <div className="flex justify-center items-start">
                        <div className="w-20 h-20 rounded-lg border-2 border-slate-200 bg-slate-50 flex items-center justify-center">
                          {report.category === "Contract Intelligence" && <Shield className="w-10 h-10 text-burgundy-600" />}
                          {report.category === "Risk Analytics" && <BarChart3 className="w-10 h-10 text-navy-600" />}
                          {report.category === "Pricing Intelligence" && <TrendingUp className="w-10 h-10 text-gold-600" />}
                          {report.category === "Benchmarking" && <AlertCircle className="w-10 h-10 text-slate-600" />}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-12 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-burgundy-100 border border-burgundy-200 flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-burgundy-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy-900 mb-2">Actuarial Reviewed</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    All reports undergo peer review by credentialed actuaries and comply with Actuarial Standards of Practice.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-navy-100 border border-navy-200 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-navy-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy-900 mb-2">ERISA Compliant</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Analysis frameworks align with ERISA fiduciary standards and DOL guidance on prudent benefit administration.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gold-100 border border-gold-200 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-gold-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy-900 mb-2">Evidence-Based</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Every claim is substantiated with primary source documentation, regulatory citations, or quantitative analysis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Methodology Section */}
        <section className="py-16 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-serif font-bold text-navy-900 mb-6">
                Analytical Methodology
              </h2>
              
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-600 leading-relaxed mb-6">
                  Each intelligence report in the Kincaid IQ series undergoes rigorous forensic analysis using proprietary actuarial modeling, contract intelligence frameworks, and evidence-based validation protocols.
                </p>
                
                <h3 className="text-xl font-serif font-semibold text-navy-900 mb-4">Core Analytical Components</h3>
                
                <ul className="space-y-3 text-slate-600 mb-8">
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 mt-0.5 text-burgundy-600 flex-shrink-0" />
                    <span><strong>Monte Carlo Simulation Frameworks:</strong> Stochastic modeling for risk quantification and trend volatility analysis</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 mt-0.5 text-burgundy-600 flex-shrink-0" />
                    <span><strong>Contract Clause Extraction:</strong> Semantic analysis of PBM agreements to identify material terms and financial obligations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 mt-0.5 text-burgundy-600 flex-shrink-0" />
                    <span><strong>Federal Pricing Benchmarks:</strong> Validation against NADAC, WAC, and AWP reference standards</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 mt-0.5 text-burgundy-600 flex-shrink-0" />
                    <span><strong>Actuarial Trend Decomposition:</strong> Time-series analysis of cost drivers and persistence modeling</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 mt-0.5 text-burgundy-600 flex-shrink-0" />
                    <span><strong>Retrospective Claims Analysis:</strong> Pattern recognition and anomaly detection across historical utilization data</span>
                  </li>
                </ul>

                <div className="border-l-4 border-navy-700 pl-6 py-4 bg-slate-50 rounded-r-lg">
                  <p className="text-slate-600 leading-relaxed">
                    All findings are validated against industry benchmarks, regulatory guidance, and peer-reviewed actuarial standards to ensure analytical rigor and professional defensibility in fiduciary contexts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-serif font-bold text-navy-900 mb-6">
                Request Custom Intelligence Brief
              </h2>
              
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Our forensic analysis team can produce customized intelligence reports tailored to your organization's specific PBM contracts, claims data, and risk profile. Each brief undergoes the same rigorous methodology as our published series.
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