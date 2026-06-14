import React, { useState, useMemo } from "react";
import { SEO } from "@/components/SEO";
import { ImageLightbox } from "@/components/ImageLightbox";
import Nav from "@/components/Nav";
import { SiriusBNav } from "@/components/siriusb/SiriusBNav";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Download, FileText, Image as ImageIcon, ExternalLink, Library, ShieldAlert, Award, FileSpreadsheet, Eye } from "lucide-react";

interface UploadedAsset {
  title: string;
  filename: string;
  category: "Litigation & Forensic Audits" | "Platform Blueprints & Briefings" | "Actuarial Science & Math" | "Visual Evidence & Graphics";
  type: "PDF Document" | "Interactive Map" | "Image Asset" | "LinkedIn Carousel";
  description: string;
  size?: string;
  date: string;
  isImage?: boolean;
}

const ALL_ASSETS: UploadedAsset[] = [
  // 1. Litigation & Forensic Audits
  {
    title: "TrueScripts LLC Rx Defense Forensic Audit",
    filename: "Rx_Defense_IQ_TrueScripts_Management_Services_LLC.pdf",
    category: "Litigation & Forensic Audits",
    type: "PDF Document",
    description: "Detailed pharmacy benefit forensic audit examining guarantee enforcement and contract leakages under TrueScripts LLC.",
    size: "4.4 MB",
    date: "2026-06"
  },
  {
    title: "The $6.4 Billion Arbitrage",
    filename: "The_6_4_Billion_Arbitrage.pdf",
    category: "Litigation & Forensic Audits",
    type: "PDF Document",
    description: "Monograph exposing hidden arbitrage margins, multi-layered spreads, and spread-pricing models used by Big Three PBMs.",
    size: "7.8 MB",
    date: "2026-05"
  },
  {
    title: "Metal Sales Manufacturing $44.8M Defense Case Study",
    filename: "Kincaid_iQ_Metal_Sales_Manufacturing_44_8M_Defense.pdf",
    category: "Litigation & Forensic Audits",
    type: "PDF Document",
    description: "EBITDA protection audit and financial risk mitigation playbook for Metal Sales Manufacturing corporate plans.",
    size: "79.6 MB",
    date: "2026-06"
  },
  {
    title: "Schwarz Partners MEWA $14.2M Defense Brief",
    filename: "Kincaid_iQ_Schwarz_Partners_MEWA_14_2M_Defense.pdf",
    category: "Litigation & Forensic Audits",
    type: "PDF Document",
    description: "Forensic claims assessment defending the Schwarz Partners MEWA plan from excessive contract fees and billing spreads.",
    size: "61.5 MB",
    date: "2026-06"
  },
  {
    title: "Hopebridge 501 Forensic Audit (44 Pages)",
    filename: "Kincaid_IQ_Hopebridge_501_44pg.pdf",
    category: "Litigation & Forensic Audits",
    type: "PDF Document",
    description: "The complete, unabridged 44-page forensic investigation of Hopebridge plan audits, co-pay maximizers, and drug spreads.",
    size: "11.7 MB",
    date: "2026-06"
  },
  {
    title: "Inotiv 501 Forensic Audit Report (44 Pages)",
    filename: "Kincaid_IQ_Inotiv_501_44pg_1_.pdf",
    category: "Litigation & Forensic Audits",
    type: "PDF Document",
    description: "Forensic audit for Inotiv plans uncovering drug billing spread structures and contract guarantees.",
    size: "11.8 MB",
    date: "2026-06"
  },
  {
    title: "Hopebridge Forensic Brief (4 Pages)",
    filename: "Kincaid_IQ_Hopebridge_4pg_Brief.pdf",
    category: "Litigation & Forensic Audits",
    type: "PDF Document",
    description: "Executive brief summarizing key findings of the Hopebridge forensic audit including actionable recovery recommendations.",
    size: "2.2 MB",
    date: "2026-06"
  },
  {
    title: "Roche Pension Forensic Assessment",
    filename: "Kincaid_iQ_Roche_Roche_Pension_Forensic_Assessment.pdf",
    category: "Litigation & Forensic Audits",
    type: "PDF Document",
    description: "Pension fund advisory report analyzing employer-sponsored health coverage compliance under fiduciary law.",
    size: "27.4 MB",
    date: "2026-05"
  },
  {
    title: "Refill Rationing & Patient Clinical Interference Assessment",
    filename: "Kincaid_IQ_Refill_Was_Rationed.pdf",
    category: "Litigation & Forensic Audits",
    type: "PDF Document",
    description: "Forensic review showing how generic and specialized refill rationing practices artificially inflate drug margin profits.",
    size: "2.2 MB",
    date: "2026-06"
  },
  {
    title: "Kimball v. Stanford University Precedent Brief",
    filename: "Kimball_v11_Stanford_1_1_.pdf",
    category: "Litigation & Forensic Audits",
    type: "PDF Document",
    description: "Litigation brief studying ERISA fiduciary duty precedents under the Stanford Kimball v11 healthcare plan dispute.",
    size: "27.4 MB",
    date: "2026-04"
  },
  {
    title: "Global Claims Compliance Audit (gcc_report)",
    filename: "gcc_report.pdf",
    category: "Litigation & Forensic Audits",
    type: "PDF Document",
    description: "Comprehensive industry benchmark auditing PBM claims compliance, billing practices, and financial leakage paths.",
    size: "45.1 MB",
    date: "2026-05"
  },
  {
    title: "National Health Claims Leakage Forensic Report",
    filename: "nhs_leakage_report.pdf",
    category: "Litigation & Forensic Audits",
    type: "PDF Document",
    description: "Clinical and operational assessment tracking plan assets leakage across major national self-insured plans.",
    size: "86.6 MB",
    date: "2026-06"
  },

  // 2. Platform Blueprints & Briefings
  {
    title: "SiriusB iQ Fiduciary Grade AI Blueprint",
    filename: "SiriusB_IQ_Fiduciary_Grade_AI.pdf",
    category: "Platform Blueprints & Briefings",
    type: "PDF Document",
    description: "Official technical architecture specification of the SiriusB iQ algorithmic engine and real-time ledger auditing.",
    size: "9.8 MB",
    date: "2026-06"
  },
  {
    title: "SiriusB iQ Fiduciary Grade AI - Glass Edition",
    filename: "SiriusB_IQ_Fiduciary_Grade_AI_Glass.pdf",
    category: "Platform Blueprints & Briefings",
    type: "PDF Document",
    description: "Highly interactive glassmorphic blueprint deck tracking deep clinical algorithms and real-time execution layers.",
    size: "13.7 MB",
    date: "2026-06"
  },
  {
    title: "SiriusB iQ Chairman & Board Briefing Document",
    filename: "SiriusB_iQ_Chairman_Board_Briefing_1_.pdf",
    category: "Platform Blueprints & Briefings",
    type: "PDF Document",
    description: "High-level board advisory paper detailing corporate litigation risk exposure and algorithmic solutions.",
    size: "6.6 MB",
    date: "2026-06"
  },
  {
    title: "Kincaid iQ Ultimate Fiduciary Platform Guide",
    filename: "Kincaid_IQ_The_Ultimate_Fiduciary_Platform.pdf",
    category: "Platform Blueprints & Briefings",
    type: "PDF Document",
    description: "Complete capabilities brief detailing Kincaid iQ platform modules, data integrations, and audit pipelines.",
    size: "15.4 MB",
    date: "2026-06"
  },
  {
    title: "AccessIQ MVP Monograph - 88 Pages",
    filename: "AccessIQ_MVP_Monograph_88pp.pdf",
    category: "Platform Blueprints & Briefings",
    type: "PDF Document",
    description: "Unabridged technical monograph analyzing real-time cloud data connectivity, database schemas, and data pipelines.",
    size: "8.0 MB",
    date: "2026-06"
  },
  {
    title: "Designed to Replace Consultants Whitepaper",
    filename: "Kincaid_iQ_Designed_to_Replace_Consultants.pdf",
    category: "Platform Blueprints & Briefings",
    type: "PDF Document",
    description: "Exposes the conflict of interest in corporate healthcare consulting and presents automated software auditing alternatives.",
    size: "13.3 MB",
    date: "2026-05"
  },
  {
    title: "Frame - Executive Outline Briefing Doc",
    filename: "Frame_-_Google_Docs.pdf",
    category: "Platform Blueprints & Briefings",
    type: "PDF Document",
    description: "Google Docs framework brief outlining integration protocols, API keys, and deployment requirements.",
    size: "30.4 MB",
    date: "2026-05"
  },
  {
    title: "Metal Sales Manufacturing LinkedIn Carousel",
    filename: "Kincaid_iQ_Metal_Sales_LinkedIn_Carousel.pdf",
    category: "Platform Blueprints & Briefings",
    type: "LinkedIn Carousel",
    description: "Visual slide deck highlighting fiduciary defense frameworks, spread-risk structures, and EBITDA protection.",
    size: "10.7 MB",
    date: "2026-06"
  },
  {
    title: "Nautilus Contract X-Ray Executive Overview v1.02",
    filename: "Nautilus_Contract_X-Ray_Executive_Overview_v1_02-24-26_2_.pdf",
    category: "Platform Blueprints & Briefings",
    type: "PDF Document",
    description: "Executive contract audit report detailing real-time modeling, discount guarantees, and contract optimization metrics.",
    size: "4.0 MB",
    date: "2026-02"
  },

  // 3. Actuarial Science & Math
  {
    title: "Sovereign by Math: Actuarial Certainty Guide",
    filename: "Kincaid_iQ_Sovereign_by_Math.pdf",
    category: "Actuarial Science & Math",
    type: "PDF Document",
    description: "Technical mathematical treatise showcasing how algorithmic auditing delivers absolute financial sovereignty to sponsors.",
    size: "11.3 MB",
    date: "2026-06"
  },
  {
    title: "The Mirror Ledger Research Paper (WP05)",
    filename: "Kincaid_CEI_WP05_The_Mirror_Ledger_Research_Paper_1_.pdf",
    category: "Actuarial Science & Math",
    type: "PDF Document",
    description: "Whitepaper modeling the mirror-ledger pipeline to expose and correct pharmacy claim billing spreads.",
    size: "39.5 MB",
    date: "2026-06"
  },
  {
    title: "Evidence-First Transformation Whitepaper",
    filename: "Kincaid_IQ_WP_2026_06_Evidence_First_Transformation.pdf",
    category: "Actuarial Science & Math",
    type: "PDF Document",
    description: "Explores the transition of corporate plans from 'trust-based relationship' audits to raw 'evidence-first' database pipelines.",
    size: "39.6 MB",
    date: "2026-06"
  },
  {
    title: "Medical Claims Spread Research Paper",
    filename: "Kincaid_iQ_Medical_Claims_Spread_Research_Paper.pdf",
    category: "Actuarial Science & Math",
    type: "PDF Document",
    description: "Scholarly research paper describing spread mathematics, drug rebate pass-through models, and leakage risks.",
    size: "13.1 MB",
    date: "2026-05"
  },
  {
    title: "Predictive Intelligence Report",
    filename: "kincaid-iq-predictive-intelligence-report_3_.pdf",
    category: "Actuarial Science & Math",
    type: "PDF Document",
    description: "Predictive modeling dossier charting Monte Carlo risk spreads across claims histories.",
    size: "6.5 MB",
    date: "2026-06"
  },

  // 4. Visual Evidence & Graphics
  {
    title: "Kincaid Rx Defense Full Dashboard Report",
    filename: "kincaid-rx-defense-full-report-1781294040203.png",
    category: "Visual Evidence & Graphics",
    type: "Image Asset",
    description: "Comprehensive screenshot of Kincaid Rx Defense interface displaying real-time financial savings, leakage alerts, and audited margins.",
    date: "2026-06",
    isImage: true
  },
  {
    title: "Fiduciary Grade Intelligence Visualizer",
    filename: "Gemini_Generated_Image_39vvue39vvue39vv.png",
    category: "Visual Evidence & Graphics",
    type: "Image Asset",
    description: "Interactive visual matrix showing clean mathematical auditing pathways and real-time database query integrations.",
    date: "2026-06",
    isImage: true
  },
  {
    title: "PBM Loss Analysis Infographic",
    filename: "Firefly_Gemini_Flash_Your_PBM_Met_Every_Guarantee._You_Still_Lost_the_Money._Written_By_Jeremiah_Franklin_849606.png",
    category: "Visual Evidence & Graphics",
    type: "Image Asset",
    description: "High-impact analytical graphic tracing how PBMs meet legal contract guarantees while still losing client plan assets.",
    date: "2026-06",
    isImage: true
  },
  {
    title: "The $7.3 Billion Corporate Question Graphic",
    filename: "Firefly_Gemini_Flash_The_7.3_Billion_Question-_What_the_Big_Three_PBMs_Have_Cost_Your_Plan_Your_People_981473.png",
    category: "Visual Evidence & Graphics",
    type: "Image Asset",
    description: "Visual infographic detailing excessive pharmacy spend across major self-insured employer health plans.",
    date: "2026-06",
    isImage: true
  },
  {
    title: "Clean Opinion Fallacy Illustration",
    filename: "Firefly_Your_auditor_issued_a_clean_opinion_on_the_financials._547556.png",
    category: "Visual Evidence & Graphics",
    type: "Image Asset",
    description: "Editorial graphic exploring how audits can receive a clean opinion while suffering massive structural financial leakage.",
    date: "2026-05",
    isImage: true
  },
  {
    title: "Rx Defense Forensic Infrastructure Blueprint",
    filename: "Firefly_Gemini_Flash_Introducing_Rx_Defense_PBM_Contract_x-Ray-_The_Forensic_Infrastructure_That_Turns_Pha_743383.png",
    category: "Visual Evidence & Graphics",
    type: "Image Asset",
    description: "Technical illustration showcasing the automated forensic analysis engine that decomposes complex contract guarantees.",
    date: "2026-06",
    isImage: true
  }
];

export default function AllUploads() {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Litigation & Forensic Audits", "Platform Blueprints & Briefings", "Actuarial Science & Math", "Visual Evidence & Graphics"];

  const filteredAssets = useMemo(() => {
    return ALL_ASSETS.filter((asset) => {
      const matchesSearch =
        asset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.filename.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = activeCategory === "All" || asset.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <>
      <SEO 
        title="Fiduciary Assets & Uploads Library" 
        description="Access and download our comprehensive repository of forensic audits, litigation briefs, whitepapers, carousels, and visual evidence." 
      />

      <main className="min-h-screen bg-[#07070F] text-white pt-24 pb-20 relative overflow-hidden font-sans">
        {/* Neon Background Accents */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-20 right-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[180px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3 py-1 mb-4 rounded-full text-xs uppercase tracking-wider font-semibold">
              Sovereign Asset Vault
            </Badge>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-300 bg-clip-text text-transparent mb-6">
              Complete Uploads Showcase
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed">
              Explore the entire repository of fiduciary-grade legal precedents, forensic claims audits, computational frameworks, and visual evidence dockets.
            </p>
          </div>

          {/* Filters & Search */}
          <div className="bg-slate-900/40 border border-white/5 backdrop-blur-md rounded-2xl p-6 mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <Input
                type="text"
                placeholder="Search dossiers, briefs, carousels, layouts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-6 bg-slate-950/80 border-white/10 rounded-xl focus:border-indigo-500 text-white placeholder-slate-500"
              />
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={activeCategory === cat ? "default" : "outline"}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-xl px-4 py-5 font-medium transition-all text-xs md:text-sm ${
                    activeCategory === cat
                      ? "bg-indigo-600 hover:bg-indigo-500 text-white border-none shadow-lg shadow-indigo-600/20"
                      : "bg-slate-950/50 hover:bg-slate-900 text-slate-300 border-white/5"
                  }`}
                >
                  {cat}
                </Button>
              ))}
            </div>

          </div>

          {/* Asset Counter */}
          <div className="flex justify-between items-center mb-8 px-2">
            <p className="text-sm text-slate-400">
              Showing <span className="text-indigo-400 font-bold">{filteredAssets.length}</span> of {ALL_ASSETS.length} available fiduciary assets
            </p>
          </div>

          {/* Assets Grid */}
          {filteredAssets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAssets.map((asset, idx) => (
                <Card 
                  key={idx} 
                  className="bg-slate-950/40 border border-white/5 rounded-2xl overflow-hidden hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all group flex flex-col justify-between"
                >
                  <div>
                    {/* Visual Preview for Images */}
                    {asset.isImage ? (
                      <div className="relative aspect-video w-full overflow-hidden bg-slate-900 border-b border-white/5">
                        <img 
                          src={`/${asset.filename}`}
                          alt={asset.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                          <Button size="sm" className="bg-indigo-600/90 pointer-events-auto rounded-xl">
                            <Eye className="w-4 h-4 mr-2" /> Click to Expand
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="p-6 pb-0 flex justify-between items-start">
                        <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20 group-hover:bg-indigo-500/20 transition-all">
                          {asset.type === "LinkedIn Carousel" ? (
                            <Library className="w-5 h-5 text-indigo-400" />
                          ) : (
                            <FileText className="w-5 h-5 text-indigo-400" />
                          )}
                        </div>
                        <Badge className="bg-slate-900 text-slate-400 border border-white/5 rounded-lg text-[10px]">
                          {asset.size || "Image"}
                        </Badge>
                      </div>
                    )}

                    <CardHeader className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
                          {asset.category}
                        </span>
                        <span className="text-white/20 text-[10px]">•</span>
                        <span className="text-slate-500 text-[10px]">
                          {asset.type}
                        </span>
                      </div>
                      <CardTitle className="text-lg font-bold text-white leading-snug group-hover:text-indigo-300 transition-colors">
                        {asset.title}
                      </CardTitle>
                      <CardDescription className="text-slate-400 text-sm mt-3 line-clamp-3 leading-relaxed">
                        {asset.description}
                      </CardDescription>
                    </CardHeader>
                  </div>

                  <CardContent className="p-6 pt-0 border-t border-white/5 mt-auto flex items-center justify-between gap-4">
                    <span className="text-xs text-slate-500 font-medium">
                      Vault ID: #{idx + 101}
                    </span>
                    <div className="flex gap-2">
                      {asset.isImage ? (
                        <Button 
                          onClick={() => setActiveImage(`/${asset.filename}`)}
                          size="sm" 
                          variant="outline" 
                          className="bg-slate-950 hover:bg-slate-900 border-white/10 rounded-xl text-xs h-9"
                        >
                          <Eye className="w-3.5 h-3.5 mr-1.5" /> Preview
                        </Button>
                      ) : (
                        <Button 
                          asChild
                          size="sm" 
                          variant="outline" 
                          className="bg-slate-950 hover:bg-slate-900 border-white/10 rounded-xl text-xs h-9"
                        >
                          <a href={`/${asset.filename}`} target="_blank" rel="noopener noreferrer">
                            <Eye className="w-3.5 h-3.5 mr-1.5" /> Preview
                          </a>
                        </Button>
                      )}

                      <Button 
                        asChild
                        size="sm" 
                        className="bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs h-9 shadow-lg shadow-indigo-600/10"
                      >
                        <a href={`/${asset.filename}`} download={asset.filename}>
                          <Download className="w-3.5 h-3.5" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>

                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-slate-950/20 border border-white/5 rounded-3xl backdrop-blur-md">
              <Search className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No uploaded assets found</h3>
              <p className="text-slate-500 max-w-md mx-auto">
                No dossiers, litigation briefs, diagrams, or carousels matched "{searchQuery}" under the selected category.
              </p>
            </div>
          )}

        </div>
      </main>

      {/* Lightbox */}
      {activeImage && (
        <ImageLightbox 
          src={activeImage} 
          alt="Visual Evidence Preview"
          onClose={() => setActiveImage(null)}
        />
      )}

      <Footer />
    </>
  );
}