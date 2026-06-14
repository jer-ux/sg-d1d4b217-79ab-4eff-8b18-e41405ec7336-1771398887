import React, { useState } from "react";
import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { 
  FileText, 
  Download, 
  ExternalLink, 
  TrendingUp, 
  Shield, 
  DollarSign, 
  Building2, 
  AlertTriangle, 
  Eye, 
  Layers, 
  Presentation,
  BookOpen,
  Image as ImageIcon,
  Scale,
  Sparkles,
  Search
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ImageLightbox from "@/components/ImageLightbox";
import Link from "next/link";

const tab1Categories = [
  {
    category: "Fiduciary Litigation & Clinical Rationing",
    icon: Scale,
    color: "amber",
    reports: [
      {
        title: "Kimball v. Stanford (Fiduciary Duty Precedent)",
        description: "Seminal fiduciary lawsuit filing detailing excessive fee tolerance, lack of oversight, and plan sponsor personal liability triggers.",
        file: "/Kimball_v11_Stanford_1_1_.pdf",
        size: "Legal Case",
        type: "ERISA Precedent",
        isImage: false,
      },
      {
        title: "Refill Was Rationed: PBM Barriers Exposed",
        description: "Explosive diagnostic brief proving PBM clinical rationing models, prior-authorization blocks, and deliberate refill delays.",
        file: "/Kincaid_IQ_Refill_Was_Rationed.pdf",
        size: "Critical Paper",
        type: "Clinical Audit",
        isImage: false,
      },
      {
        title: "Hopebridge 501 44-Page Forensic Audit",
        description: "Comprehensive 44-page forensic health benefits audit uncovering hidden billing spreads and claims overcharges.",
        file: "/Kincaid_IQ_Hopebridge_501_44pg.pdf",
        size: "44 Pages",
        type: "Forensic Audit",
        isImage: false,
      },
      {
        title: "Kincaid IQ Predictive Intelligence Report",
        description: "High-level risk analytics projection, utilizing machine learning algorithms to model future cost-mitigation curves.",
        file: "/kincaid-iq-predictive-intelligence-report_3_.pdf",
        size: "Intelligence",
        type: "Predictive Analytics",
        isImage: false,
      },
    ],
  },
  {
    category: "Forensic Case Studies & Arbitrage Papers",
    icon: AlertTriangle,
    color: "rose",
    reports: [
      {
        title: "TrueScripts LLC Rx Defense IQ",
        description: "Forensic contract performance analysis, detailing hidden margins and PBM spread manipulation within TrueScripts LLC.",
        file: "/Rx_Defense_IQ_TrueScripts_Management_Services_LLC.pdf",
        size: "Forensic Audit",
        type: "Contract Discrepancy",
        isImage: false,
      },
      {
        title: "The $6.4 Billion Arbitrage",
        description: "Actuarial whitepaper exposing the hidden transactional spread arbitrage mechanisms within major PBM networks.",
        file: "/The_6_4_Billion_Arbitrage.pdf",
        size: "Strategic Brief",
        type: "Arbitrage Analysis",
        isImage: false,
      },
      {
        title: "Metal Sales Manufacturing $44.8M Defense",
        description: "The complete case study detailing a multi-million-dollar EBITDA defense and plan design optimization for Metal Sales Manufacturing.",
        file: "/Kincaid_iQ_Metal_Sales_Manufacturing_44_8M_Defense.pdf",
        size: "Case Study",
        type: "EBITDA Shield",
        isImage: false,
      },
      {
        title: "The Engine & The Instrument (Kincaid IQ vs Rebel IQ)",
        description: "Comparative operational analysis detailing Kincaid IQ's mathematical optimization superiority over Rebel IQ.",
        file: "/The-Engine-and-the-Instrument-Kincaid-IQ-vs-Rebel-IQ.pdf",
        size: "Platform Comparison",
        type: "Strategy Whitepaper",
        isImage: false,
      },
      {
        title: "Schwarz Partners MEWA $14.2M Defense",
        description: "A complete $14.2M defense and contract shielding blueprint engineered for Multiple Employer Welfare Arrangements.",
        file: "/Kincaid_iQ_Schwarz_Partners_MEWA_14_2M_Defense.pdf",
        size: "Full Report",
        type: "MEWA Fiduciary",
        isImage: false,
      },
      {
        title: "Roche Pension Forensic Assessment",
        description: "Fiduciary-grade forensic pension audit, assessing plan governance, cost models, and leakage defense.",
        file: "/Kincaid_iQ_Roche_Pension_Forensic_Assessment.pdf",
        size: "Forensic Audit",
        type: "Pension Forensic",
        isImage: false,
      },
    ],
  },
  {
    category: "Actuarial Science & Math Frameworks",
    icon: TrendingUp,
    color: "emerald",
    reports: [
      {
        title: "Sovereign by Math",
        description: "Our definitive treatise on using rigorous actuarial math, probability bounds, and algorithmics to assert absolute plan control.",
        file: "/Kincaid_iQ_Sovereign_by_Math.pdf",
        size: "Technical Treatise",
        type: "Actuarial Math",
        isImage: false,
      },
      {
        title: "The Mirror Ledger (Research Paper WP05)",
        description: "Academic-grade research paper outlining the distributed ledger architecture that logs real-time claims and balances.",
        file: "/Kincaid_CEI_WP05_The_Mirror_Ledger_Research_Paper_1_.pdf",
        size: "Research Paper",
        type: "Ledger Technology",
        isImage: false,
      },
      {
        title: "Medical Claims Spread Research Paper",
        description: "Academic and actuarial-grade research paper exposing pharmacy benefit manager claims spreads.",
        file: "/Kincaid_iQ_Medical_Claims_Spread_Research_Paper.pdf",
        size: "Research Paper",
        type: "Actuarial Science",
        isImage: false,
      },
      {
        title: "Evidence-First Transformation",
        description: "Strategic white paper on data-driven benefits management",
        file: "/Kincaid_IQ_WP_2026_06_Evidence_First_Transformation.pdf",
        size: "White Paper",
        type: "Research",
        isImage: false,
      },
    ],
  },
];

const tab2Categories = [
  {
    category: "Fiduciary Platforms & Monographs",
    icon: BookOpen,
    color: "cyan",
    reports: [
      {
        title: "AccessIQ MVP Monograph (88pp)",
        description: "An intensive 88-page deep-dive monograph outlining the core AccessIQ MVP design, operational structures, and technical blueprints.",
        file: "/AccessIQ_MVP_Monograph_88pp.pdf",
        size: "88 Pages",
        type: "Monograph",
        isImage: false,
      },
      {
        title: "Kincaid IQ: The Ultimate Fiduciary Platform",
        description: "The premier handbook on our algorithmic fiduciary ecosystem, defining how autonomous intelligence shields employers from CAA liability.",
        file: "/Kincaid_IQ_The_Ultimate_Fiduciary_Platform.pdf",
        size: "Platform Manual",
        type: "Fiduciary Tech",
        isImage: false,
      },
      {
        title: "SiriusB iQ Chairman Board Briefing",
        description: "Official strategic briefing document for corporate Board of Directors and executive leadership committees.",
        file: "/SiriusB_iQ_Chairman_Board_Briefing_1_.pdf",
        size: "Executive Briefing",
        type: "Board Governance",
        isImage: false,
      },
      {
        title: "SiriusB IQ Fiduciary Grade AI (Glass Edition)",
        description: "Elite advisory briefing on glassmorphic AI-driven benefits governance and decision engines.",
        file: "/SiriusB_IQ_Fiduciary_Grade_AI_Glass.pdf",
        size: "Premium Guide",
        type: "Fiduciary AI",
        isImage: false,
      },
    ],
  },
  {
    category: "Strategic Briefings & Carousels",
    icon: Presentation,
    color: "purple",
    reports: [
      {
        title: "Designed to Replace Consultants",
        description: "Our philosophical playbook detailing how automated algorithms render manual human consultancy obsolete.",
        file: "/Kincaid_iQ_Designed_to_Replace_Consultants.pdf",
        size: "Strategic Deck",
        type: "Consulting Disruption",
        isImage: false,
      },
      {
        title: "Frame - Google Docs Executive Briefing",
        description: "Fiduciary framework and contract intelligence executive briefing document.",
        file: "/Frame_-_Google_Docs.pdf",
        size: "Executive Brief",
        type: "Fiduciary Framework",
        isImage: false,
      },
      {
        title: "Metal Sales Manufacturing LinkedIn Carousel",
        description: "High-impact visual slide deck detailing the Metal Sales optimization journey for public LinkedIn dissemination.",
        file: "/Kincaid_iQ_Metal_Sales_LinkedIn_Carousel.pdf",
        size: "LinkedIn Deck",
        type: "Visual Carousel",
        isImage: false,
      },
      {
        title: "Kincaid IQ Executive Deployment",
        description: "Platform overview and implementation guide",
        file: "/SiriusB_iQ_Glassmorphic_v1_Kincaid_IQ_Executive_Deployment_1_.pdf",
        size: "Guide",
        type: "Platform",
        isImage: false,
      },
    ],
  },
  {
    category: "Visual Evidence & Graphics Gallery",
    icon: ImageIcon,
    color: "cyan",
    reports: [
      {
        title: "Kincaid Rx Defense Full Dashboard Report",
        description: "High-resolution forensic dashboard screenshot showing claims leakage, PBM spreads, and savings ledger overlays.",
        file: "/kincaid-rx-defense-full-report-1781294040203.png",
        size: "Infographic",
        type: "Forensic UI",
        isImage: true,
      },
      {
        title: "Fiduciary Grade Intelligence Visualizer",
        description: "Gemini-generated high-fidelity system graphic showcasing the algorithmic decision engine layers.",
        file: "/Gemini_Generated_Image_39vvue39vvue39vv.png",
        size: "Schematic",
        type: "System Layout",
        isImage: true,
      },
      {
        title: "EBITDA Defense Audit Metric Snapshot",
        description: "Actuarial chart detailing specific stop-loss corridors, aggregate claims limits, and reinsurance thresholds.",
        file: "/be9ff172-1ce2-48b6-80e7-8cb824b75316.jpeg",
        size: "Actuarial Chart",
        type: "Risk Graphic",
        isImage: true,
      },
    ],
  },
];

const categoryColors = {
  emerald: "border-emerald-500/30 bg-emerald-500/5",
  purple: "border-purple-500/30 bg-purple-500/5",
  cyan: "border-cyan-500/30 bg-cyan-500/5",
  rose: "border-rose-500/30 bg-rose-500/5",
  amber: "border-amber-500/30 bg-amber-500/5",
};

const badgeColors = {
  emerald: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  purple: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  cyan: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  rose: "bg-rose-500/20 text-rose-300 border-rose-500/30",
  amber: "bg-amber-500/20 text-amber-300 border-amber-500/30",
};

export default function ReportsLibrary() {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filterReports = (categories: typeof tab1Categories) => {
    if (!searchQuery) return categories;
    return categories.map(cat => ({
      ...category,
      category: cat.category,
      icon: cat.icon,
      color: cat.color,
      reports: cat.reports.filter(rep => 
        rep.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        rep.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rep.type.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(cat => cat.reports.length > 0);
  };

  const filteredTab1 = filterReports(tab1Categories);
  const filteredTab2 = filterReports(tab2Categories);

  return (
    <>
      <SEO
        title="Reports & Research Library | Kincaid IQ Intelligence Series"
        description="Access comprehensive case studies, white papers, Form 5500 analyses, and platform documentation from SiriusB iQ's Kincaid IQ Intelligence Series."
      />
      <Nav />
      
      <main className="min-h-screen bg-gradient-to-br from-gray-950 via-amber-950/10 to-gray-950 pt-24 pb-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 mb-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-2">
              <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
              <span className="text-sm text-amber-300 font-semibold">Kincaid IQ Intelligence Series</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-amber-400 via-amber-100 to-amber-500 bg-clip-text text-transparent leading-tight">
              Reports & Research Library
            </h1>
            
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Access case studies, forensic actuarial analyses, white papers, and corporate defense frameworks.
            </p>

            {/* Premium Search Filter */}
            <div className="max-w-md mx-auto relative mt-4">
              <Search className="absolute left-3 top-3.5 h-4 w-4 text-amber-500/60" />
              <input 
                type="text"
                placeholder="Search dossiers, audits, or legal files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-zinc-950/60 border border-amber-500/20 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
              />
            </div>
          </div>
        </section>

        {/* Tabbed Reports Showcase */}
        <section className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <Tabs defaultValue="forensic" className="w-full space-y-8">
              <div className="flex justify-center">
                <TabsList className="bg-zinc-950 border border-amber-500/20 p-1.5 rounded-xl h-auto">
                  <TabsTrigger 
                    value="forensic" 
                    className="data-[state=active]:bg-amber-500 data-[state=active]:text-black text-gray-400 px-6 py-2.5 rounded-lg text-sm font-bold tracking-wide transition-all uppercase"
                  >
                    ⚖️ Litigation & Forensic Audits
                  </TabsTrigger>
                  <TabsTrigger 
                    value="platform" 
                    className="data-[state=active]:bg-amber-500 data-[state=active]:text-black text-gray-400 px-6 py-2.5 rounded-lg text-sm font-bold tracking-wide transition-all uppercase"
                  >
                    🛠️ Blueprints, Briefings & Media
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Tab 1 Content: Forensic & Litigation */}
              <TabsContent value="forensic" className="space-y-12 outline-none">
                {filteredTab1.length === 0 ? (
                  <div className="text-center py-20 text-gray-400">No forensic reports match your search query.</div>
                ) : (
                  filteredTab1.map((category, categoryIndex) => {
                    const Icon = category.icon;
                    const colorClass = categoryColors[category.color as keyof typeof categoryColors];
                    const badgeClass = badgeColors[category.color as keyof typeof badgeColors];
                    
                    return (
                      <div key={categoryIndex} className="space-y-6">
                        <div className="flex items-center gap-4 pb-4 border-b border-zinc-800/80">
                          <div className={`p-2.5 rounded-lg ${colorClass} border`}>
                            <Icon className="w-5.5 h-5.5 text-white" />
                          </div>
                          <div>
                            <h2 className="text-xl font-bold text-white tracking-wide">{category.category}</h2>
                            <p className="text-xs text-gray-500">{category.reports.length} critical assets</p>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          {category.reports.map((report, reportIndex) => (
                            <Card key={reportIndex} className="bg-zinc-950/40 border-zinc-900 hover:border-amber-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/5 group flex flex-col justify-between rounded-xl">
                              <CardHeader>
                                <div className="flex items-start justify-between gap-4 mb-2">
                                  <CardTitle className="text-md font-bold text-gray-100 group-hover:text-amber-400 transition-colors leading-snug">
                                    {report.title}
                                  </CardTitle>
                                  <Badge variant="outline" className={`${badgeClass} shrink-0 text-[10px] font-bold uppercase`}>
                                    {report.size}
                                  </Badge>
                                </div>
                                <CardDescription className="text-xs text-gray-400 leading-relaxed">
                                  {report.description}
                                </CardDescription>
                              </CardHeader>
                              <CardContent>
                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-900/60">
                                  <span className="text-[10px] uppercase tracking-wider font-semibold text-gray-500">{report.type}</span>
                                  <a
                                    href={report.file}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-500/10 hover:bg-amber-500 hover:text-black border border-amber-500/20 hover:border-amber-400 text-amber-300 rounded-lg transition-all text-xs font-bold uppercase tracking-wider"
                                  >
                                    <Download className="w-3.5 h-3.5" />
                                    View PDF
                                    <ExternalLink className="w-3 h-3" />
                                  </a>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    );
                  })
                )}
              </TabsContent>

              {/* Tab 2 Content: Platform Manuals & Visuals */}
              <TabsContent value="platform" className="space-y-12 outline-none">
                {filteredTab2.length === 0 ? (
                  <div className="text-center py-20 text-gray-400">No blueprints or media files match your search query.</div>
                ) : (
                  filteredTab2.map((category, categoryIndex) => {
                    const Icon = category.icon;
                    const colorClass = categoryColors[category.color as keyof typeof categoryColors];
                    const badgeClass = badgeColors[category.color as keyof typeof badgeColors];
                    
                    return (
                      <div key={categoryIndex} className="space-y-6">
                        <div className="flex items-center gap-4 pb-4 border-b border-zinc-800/80">
                          <div className={`p-2.5 rounded-lg ${colorClass} border`}>
                            <Icon className="w-5.5 h-5.5 text-white" />
                          </div>
                          <div>
                            <h2 className="text-xl font-bold text-white tracking-wide">{category.category}</h2>
                            <p className="text-xs text-gray-500">{category.reports.length} premium blueprints</p>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          {category.reports.map((report, reportIndex) => (
                            <Card key={reportIndex} className="bg-zinc-950/40 border-zinc-900 hover:border-amber-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/5 group flex flex-col justify-between rounded-xl">
                              <CardHeader>
                                <div className="flex items-start justify-between gap-4 mb-2">
                                  <CardTitle className="text-md font-bold text-gray-100 group-hover:text-amber-400 transition-colors leading-snug">
                                    {report.title}
                                  </CardTitle>
                                  <Badge variant="outline" className={`${badgeClass} shrink-0 text-[10px] font-bold uppercase`}>
                                    {report.size}
                                  </Badge>
                                </div>
                                <CardDescription className="text-xs text-gray-400 leading-relaxed">
                                  {report.description}
                                </CardDescription>
                              </CardHeader>
                              <CardContent>
                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-900/60">
                                  <span className="text-[10px] uppercase tracking-wider font-semibold text-gray-500">{report.type}</span>
                                  {report.isImage ? (
                                    <button
                                      onClick={() => setActiveImage(report.file)}
                                      className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-500/10 hover:bg-amber-500 hover:text-black border border-amber-500/20 hover:border-amber-400 text-amber-300 rounded-lg transition-all text-xs font-bold uppercase tracking-wider cursor-pointer"
                                    >
                                      <Eye className="w-3.5 h-3.5" />
                                      View Image
                                    </button>
                                  ) : (
                                    <a
                                      href={report.file}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-500/10 hover:bg-amber-500 hover:text-black border border-amber-500/20 hover:border-amber-400 text-amber-300 rounded-lg transition-all text-xs font-bold uppercase tracking-wider"
                                    >
                                      <Download className="w-3.5 h-3.5" />
                                      View PDF
                                      <ExternalLink className="w-3 h-3" />
                                    </a>
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    );
                  })
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 mt-20">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-amber-900/20 to-neutral-900/20 border-amber-500/30">
              <CardContent className="p-8 text-center space-y-6">
                <h2 className="text-3xl font-bold text-white">
                  Request Custom Analysis
                </h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  Need a tailored report for your organization? Our team of actuaries and consultants 
                  can deliver customized intelligence and actionable insights.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-black rounded-lg transition-colors font-semibold"
                  >
                    Contact Our Team
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                  <Link 
                    href="/kincaid-iq-intelligence-series"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors font-medium border border-white/20"
                  >
                    Explore Intelligence Series
                    <TrendingUp className="w-4 h-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />

      {activeImage && (
        <ImageLightbox
          isOpen={true}
          imageSrc={activeImage}
          imageAlt="Visual Evidence Preview"
          onClose={() => setActiveImage(null)}
        />
      )}
    </>
  );
}