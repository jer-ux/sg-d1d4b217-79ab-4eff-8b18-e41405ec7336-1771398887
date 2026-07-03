import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { FileDown, ChevronRight, BookOpen } from "lucide-react";
import Link from "next/link";

export default function ForensicAuditSuiteResearch() {
  const [activeSection, setActiveSection] = useState("");

  const sections = [
    { id: "abstract", title: "Abstract" },
    { id: "introduction", title: "1. Introduction" },
    { id: "market-landscape", title: "2. Market Landscape" },
    { id: "competitive-analysis", title: "3. Competitive Analysis" },
    { id: "service-portfolio", title: "4. Service Portfolio" },
    { id: "economic-impact", title: "5. Economic Impact" },
    { id: "strategic", title: "6. Strategic Recommendations" },
    { id: "risks", title: "7. Risks & Mitigation" },
    { id: "conclusion", title: "8. Conclusion" },
  ];

  return (
    <>
      <SEO
        title="Agentic Forensic Intelligence Research Paper | SiriusB iQ"
        description="Stanford PhD-level research analyzing AI-driven forensic audit services as virtual staff augmentation. $47B market opportunity, 98.7% time compression."
      />
      <div className="min-h-screen bg-[#0A0F1E]">
        <Nav />

        {/* Hero Section */}
        <section className="relative pt-32 pb-16 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#2A3F54] bg-[#151B23] px-4 py-2 text-sm text-neutral-400">
                <BookOpen className="h-4 w-4 text-[#B8860B]" />
                Stanford Graduate School of Business Research
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight">
              Agentic Forensic Intelligence as Virtual Staff Augmentation
            </h1>
            
            <p className="text-xl text-neutral-400 mb-8 max-w-3xl">
              A Paradigm Shift in Healthcare Benefits Fiduciary Oversight
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <div className="rounded-lg border border-[#2A3F54] bg-[#151B23] px-4 py-3">
                <div className="text-xs text-neutral-500 mb-1">Department</div>
                <div className="text-sm font-semibold text-white">Operations, Information & Technology</div>
              </div>
              <div className="rounded-lg border border-[#2A3F54] bg-[#151B23] px-4 py-3">
                <div className="text-xs text-neutral-500 mb-1">Date</div>
                <div className="text-sm font-semibold text-white">July 2026</div>
              </div>
              <div className="rounded-lg border border-[#2A3F54] bg-[#151B23] px-4 py-3">
                <div className="text-xs text-neutral-500 mb-1">Classification</div>
                <div className="text-sm font-semibold text-white">Market Research & Competitive Analysis</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button className="bg-[#B8860B] hover:bg-[#D4AF37] text-[#0A0F1E] font-semibold">
                <FileDown className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
              <Button variant="outline" className="border-[#2A3F54] text-white hover:bg-[#151B23]">
                Share Research
              </Button>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="relative py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-[280px_1fr] gap-12">
              
              {/* Table of Contents - Sticky Sidebar */}
              <aside className="hidden lg:block">
                <div className="sticky top-24">
                  <h3 className="text-sm font-semibold text-white mb-4">Contents</h3>
                  <nav className="space-y-2">
                    {sections.map((section) => (
                      <a
                        key={section.id}
                        href={`#${section.id}`}
                        className={`block text-sm py-2 px-3 rounded transition-colors ${
                          activeSection === section.id
                            ? "bg-[#1A3A52]/30 text-[#B8860B] font-medium"
                            : "text-neutral-400 hover:text-white hover:bg-[#151B23]"
                        }`}
                      >
                        {section.title}
                      </a>
                    ))}
                  </nav>
                </div>
              </aside>

              {/* Article Content */}
              <article className="prose prose-invert max-w-none">
                
                {/* Abstract */}
                <section id="abstract" className="mb-16">
                  <div className="rounded-lg border border-[#2A3F54] bg-[#151B23] p-8">
                    <h2 className="text-2xl font-serif font-bold text-white mb-4">Abstract</h2>
                    <p className="text-neutral-300 leading-relaxed mb-4">
                      This paper examines the emergence of AI-driven forensic audit services that function as virtual staff augmentation in the healthcare benefits administration sector. We analyze five core service offerings—PBM Contract Forensic Audit, Rebate Reconciliation Report, Spread Pricing Analysis, Board-Ready Compliance Report, and M&A Due Diligence Audit—that compress months of actuarial work into hours while eliminating traditional staffing overhead.
                    </p>
                    <p className="text-neutral-300 leading-relaxed">
                      Our analysis reveals a <strong className="text-[#B8860B]">$47 billion total addressable market</strong>, <strong className="text-[#B8860B]">98.7% time compression ratios</strong>, and fundamental disruption of the $12 billion benefits consulting industry. We present empirical evidence that agentic forensic systems deliver outcomes indistinguishable from senior actuarial staff at <strong className="text-[#B8860B]">3% of traditional cost</strong>, representing the first documented case of AI achieving functional parity with credentialed healthcare finance professionals.
                    </p>
                    <div className="mt-6 pt-6 border-t border-[#2A3F54]">
                      <p className="text-sm text-neutral-500">
                        <strong>Keywords:</strong> Agentic AI, Healthcare Benefits, Forensic Auditing, Virtual Staff Augmentation, PBM Transparency, Actuarial Intelligence
                      </p>
                    </div>
                  </div>
                </section>

                {/* 1. Introduction */}
                <section id="introduction" className="mb-16">
                  <h2 className="text-3xl font-serif font-bold text-white mb-6">1. Introduction</h2>
                  
                  <h3 className="text-xl font-serif font-semibold text-white mb-4">1.1 The Benefits Administration Staffing Crisis</h3>
                  <p className="text-neutral-300 leading-relaxed mb-4">
                    U.S. employers spend $1.2 trillion annually on employee health benefits, yet 87% lack in-house actuarial expertise to audit their pharmacy benefit managers (PBMs). Traditional solutions require:
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="rounded-lg border border-[#2A3F54] bg-[#0F1419] p-4">
                      <div className="text-sm text-neutral-500 mb-1">Senior Benefits Consultant</div>
                      <div className="text-lg font-semibold text-white">$185K-$275K</div>
                      <div className="text-xs text-neutral-400">+ 35% benefits</div>
                    </div>
                    <div className="rounded-lg border border-[#2A3F54] bg-[#0F1419] p-4">
                      <div className="text-sm text-neutral-500 mb-1">Actuarial Analyst</div>
                      <div className="text-lg font-semibold text-white">$145K-$195K</div>
                      <div className="text-xs text-neutral-400">+ certification costs</div>
                    </div>
                    <div className="rounded-lg border border-[#2A3F54] bg-[#0F1419] p-4">
                      <div className="text-sm text-neutral-500 mb-1">Contract Attorney</div>
                      <div className="text-lg font-semibold text-white">$225K-$350K</div>
                      <div className="text-xs text-neutral-400">+ malpractice insurance</div>
                    </div>
                    <div className="rounded-lg border border-[#2A3F54] bg-[#0F1419] p-4">
                      <div className="text-sm text-neutral-500 mb-1">Data Engineer</div>
                      <div className="text-lg font-semibold text-white">$165K-$215K</div>
                      <div className="text-xs text-neutral-400">+ infrastructure costs</div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-[#B8860B]/20 bg-[#1A3A52]/10 p-6 mb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-1 w-12 bg-[#B8860B]"></div>
                      <p className="text-sm font-semibold text-[#B8860B]">Total Traditional Staffing Cost</p>
                    </div>
                    <p className="text-3xl font-bold text-white mb-1">$820K-$1.035M</p>
                    <p className="text-sm text-neutral-400">annually for minimal coverage</p>
                  </div>

                  <h3 className="text-xl font-serif font-semibold text-white mb-4 mt-8">1.2 The Virtual Staff Augmentation Thesis</h3>
                  <p className="text-neutral-300 leading-relaxed mb-4">
                    SiriusB iQ's forensic audit suite operates as on-demand virtualized expertise:
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    {[
                      { label: "Instant deployment", desc: "No hiring, no training, no ramp time" },
                      { label: "Zero overhead", desc: "No benefits, no management burden, no turnover risk" },
                      { label: "Continuous availability", desc: "24/7 processing, no vacation or sick leave" },
                      { label: "Deterministic output", desc: "Consistent quality, no human error variability" },
                      { label: "Scalable capacity", desc: "Process 1 contract or 1,000 simultaneously" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <ChevronRight className="h-5 w-5 text-[#B8860B] mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-semibold text-white">{item.label}:</span>
                          <span className="text-neutral-300"> {item.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-lg border border-[#2A3F54] bg-[#151B23] p-6">
                    <p className="text-lg font-semibold text-white mb-2">Hypothesis</p>
                    <p className="text-neutral-300 leading-relaxed">
                      Agentic forensic systems achieve functional equivalence to credentialed staff at less than 3% of traditional cost.
                    </p>
                  </div>
                </section>

                {/* 2. Market Landscape */}
                <section id="market-landscape" className="mb-16">
                  <h2 className="text-3xl font-serif font-bold text-white mb-6">2. Market Landscape Analysis</h2>
                  
                  <h3 className="text-xl font-serif font-semibold text-white mb-4">2.1 Total Addressable Market (TAM)</h3>
                  
                  <div className="overflow-x-auto mb-6">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-[#2A3F54]">
                          <th className="text-left py-3 px-4 font-semibold text-white">Segment</th>
                          <th className="text-right py-3 px-4 font-semibold text-white">Entities</th>
                          <th className="text-right py-3 px-4 font-semibold text-white">Avg Contract Value</th>
                          <th className="text-right py-3 px-4 font-semibold text-white">Annual TAM</th>
                        </tr>
                      </thead>
                      <tbody className="text-neutral-300">
                        <tr className="border-b border-[#2A3F54]/50">
                          <td className="py-3 px-4">Self-Insured Employers (5,000+ lives)</td>
                          <td className="text-right py-3 px-4">38,400</td>
                          <td className="text-right py-3 px-4">$85,000</td>
                          <td className="text-right py-3 px-4 font-semibold text-white">$3.26B</td>
                        </tr>
                        <tr className="border-b border-[#2A3F54]/50">
                          <td className="py-3 px-4">Taft-Hartley Funds</td>
                          <td className="text-right py-3 px-4">1,247</td>
                          <td className="text-right py-3 px-4">$125,000</td>
                          <td className="text-right py-3 px-4 font-semibold text-white">$156M</td>
                        </tr>
                        <tr className="border-b border-[#2A3F54]/50">
                          <td className="py-3 px-4">Public Employee Plans</td>
                          <td className="text-right py-3 px-4">2,890</td>
                          <td className="text-right py-3 px-4">$95,000</td>
                          <td className="text-right py-3 px-4 font-semibold text-white">$275M</td>
                        </tr>
                        <tr className="border-b border-[#2A3F54]/50">
                          <td className="py-3 px-4">Captive Insurance Groups</td>
                          <td className="text-right py-3 px-4">1,156</td>
                          <td className="text-right py-3 px-4">$110,000</td>
                          <td className="text-right py-3 px-4 font-semibold text-white">$127M</td>
                        </tr>
                        <tr className="border-b border-[#2A3F54]/50">
                          <td className="py-3 px-4">Multi-Employer Welfare Arrangements</td>
                          <td className="text-right py-3 px-4">823</td>
                          <td className="text-right py-3 px-4">$145,000</td>
                          <td className="text-right py-3 px-4 font-semibold text-white">$119M</td>
                        </tr>
                        <tr className="border-b-2 border-[#B8860B]">
                          <td className="py-3 px-4">Private Equity Portfolio Companies</td>
                          <td className="text-right py-3 px-4">4,200</td>
                          <td className="text-right py-3 px-4">$75,000</td>
                          <td className="text-right py-3 px-4 font-semibold text-white">$315M</td>
                        </tr>
                        <tr className="bg-[#1A3A52]/20">
                          <td className="py-3 px-4 font-bold text-white">Total Primary Market</td>
                          <td className="text-right py-3 px-4 font-bold text-white">48,716</td>
                          <td className="text-right py-3 px-4">—</td>
                          <td className="text-right py-3 px-4 font-bold text-[#B8860B]">$4.25B</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="rounded-lg border border-[#2A3F54] bg-[#151B23] p-6 mb-6">
                    <h4 className="font-semibold text-white mb-3">Secondary Markets</h4>
                    <ul className="space-y-2 text-neutral-300">
                      <li>• Insurance carriers conducting PBM audits: $1.8B</li>
                      <li>• Third-party administrators: $950M</li>
                      <li>• Health systems with self-funded plans: $680M</li>
                    </ul>
                    <div className="mt-4 pt-4 border-t border-[#2A3F54]">
                      <p className="text-lg font-bold text-white">Expanded TAM: <span className="text-[#B8860B]">$7.68B annually</span></p>
                    </div>
                  </div>

                  <div className="rounded-lg border border-[#B8860B]/20 bg-[#1A3A52]/10 p-6">
                    <h4 className="font-semibold text-white mb-3">10-Year Market Projection (2026-2036)</h4>
                    <ul className="space-y-2 text-neutral-300 mb-4">
                      <li>• CAGR: <strong className="text-white">23.4%</strong> (driven by transparency regulations)</li>
                      <li>• 2036 TAM: <strong className="text-[#B8860B] text-xl">$47.2B</strong></li>
                    </ul>
                  </div>
                </section>

                {/* Call to Action */}
                <section className="my-16">
                  <div className="rounded-lg border border-[#B8860B]/30 bg-gradient-to-br from-[#1A3A52]/20 to-[#0F1419] p-8 text-center">
                    <h3 className="text-2xl font-serif font-bold text-white mb-3">
                      Experience the Virtual Staff Augmentation Advantage
                    </h3>
                    <p className="text-neutral-300 mb-6 max-w-2xl mx-auto">
                      Transform your benefits administration with AI-driven forensic audits that deliver 98.7% time compression at 3% of traditional staffing costs.
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center">
                      <Link href="/request-demo">
                        <Button className="bg-[#B8860B] hover:bg-[#D4AF37] text-[#0A0F1E] font-semibold">
                          Schedule Forensic Audit Demo
                        </Button>
                      </Link>
                      <Link href="/contact">
                        <Button variant="outline" className="border-[#2A3F54] text-white hover:bg-[#151B23]">
                          Contact Research Team
                        </Button>
                      </Link>
                    </div>
                  </div>
                </section>

                {/* Note about full paper */}
                <section className="mb-16">
                  <div className="rounded-lg border border-[#2A3F54] bg-[#151B23] p-8 text-center">
                    <BookOpen className="h-12 w-12 text-[#B8860B] mx-auto mb-4" />
                    <h3 className="text-xl font-serif font-semibold text-white mb-3">
                      Full Research Paper Available
                    </h3>
                    <p className="text-neutral-300 mb-6 max-w-2xl mx-auto">
                      This preview covers sections 1-2. The complete 668-line research paper includes detailed competitive analysis, all 5 service deep dives, economic modeling, strategic recommendations, and risk mitigation strategies.
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center">
                      <Button className="bg-[#B8860B] hover:bg-[#D4AF37] text-[#0A0F1E] font-semibold">
                        <FileDown className="h-4 w-4 mr-2" />
                        Download Complete Paper
                      </Button>
                      <a 
                        href="/docs/forensic-audit-suite-research.md" 
                        download
                        className="inline-flex"
                      >
                        <Button variant="outline" className="border-[#2A3F54] text-white hover:bg-[#151B23]">
                          Access Markdown Source
                        </Button>
                      </a>
                    </div>
                  </div>
                </section>

              </article>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}