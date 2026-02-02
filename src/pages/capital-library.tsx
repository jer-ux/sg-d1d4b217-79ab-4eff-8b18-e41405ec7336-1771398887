import { SEO } from "@/components/SEO";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, TrendingUp, Building2, LineChart, FileText, Download, ExternalLink, Search, Filter } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface Resource {
  id: string;
  title: string;
  category: string;
  type: "whitepaper" | "case-study" | "research" | "guide" | "webinar";
  description: string;
  publishedDate: string;
  readTime: string;
  tags: string[];
  featured?: boolean;
}

const resources: Resource[] = [
  {
    id: "cap-001",
    title: "Private Equity Due Diligence: Data-Driven Operational Value Creation",
    category: "Private Equity",
    type: "whitepaper",
    description: "Comprehensive framework for PE firms to identify operational arbitrage opportunities during due diligence. Includes 47-point assessment checklist covering healthcare cost structures, technology debt, and process inefficiency quantification.",
    publishedDate: "2026-01-15",
    readTime: "28 min",
    tags: ["Due Diligence", "Value Creation", "Healthcare", "Operational Excellence"],
    featured: true,
  },
  {
    id: "cap-002",
    title: "Family Office Investment Thesis: Healthcare Cost Arbitrage as an Asset Class",
    category: "Family Offices",
    type: "research",
    description: "Quantitative analysis of healthcare cost arbitrage returns vs traditional alternative investments. 5-year backtest shows 23% IRR with <0.4 correlation to public markets. Includes portfolio construction guidelines and risk framework.",
    publishedDate: "2026-01-10",
    readTime: "35 min",
    tags: ["Asset Allocation", "Alternative Investments", "Portfolio Strategy", "Risk Management"],
    featured: true,
  },
  {
    id: "cap-003",
    title: "Venture Capital: Embedded AI in Healthcare Finance Infrastructure",
    category: "Venture Capital",
    type: "case-study",
    description: "Case study on embedding autonomous agents into healthcare finance workflows. Analysis of 12 portfolio companies implementing agentic transformation with average 18-month ROI cycle and 340% EBITDA improvement.",
    publishedDate: "2026-01-08",
    readTime: "22 min",
    tags: ["AI/ML", "Healthcare Tech", "Embedded Finance", "Platform Strategy"],
    featured: true,
  },
  {
    id: "cap-004",
    title: "M&A Valuation Framework: Monetizing Hidden Cost Structures",
    category: "M&A",
    type: "guide",
    description: "Step-by-step methodology for identifying and valuing embedded cost arbitrage opportunities in acquisition targets. Includes EBITDA adjustment models, working capital optimization strategies, and integration playbooks.",
    publishedDate: "2025-12-20",
    readTime: "42 min",
    tags: ["M&A", "Valuation", "Financial Modeling", "Integration"],
  },
  {
    id: "cap-005",
    title: "Stop-Loss Carrier Selection: Quantitative Risk Transfer Analysis",
    category: "Risk Management",
    type: "whitepaper",
    description: "Data-driven framework for evaluating stop-loss carriers beyond price. Analyzes claim payment velocity, dispute resolution patterns, and contract enforceability across 18 major carriers using 4-year claims dataset.",
    publishedDate: "2025-12-15",
    readTime: "31 min",
    tags: ["Insurance", "Risk Transfer", "Vendor Selection", "Contract Analytics"],
  },
  {
    id: "cap-006",
    title: "PBM Contract Negotiation: Evidence-Based Leverage Points",
    category: "Healthcare Economics",
    type: "guide",
    description: "Tactical playbook for PBM contract renegotiation using real-time data evidence. Covers rebate guarantee enforcement, AWP pricing tolerance bands, and specialty drug carve-out strategies with sample contract language.",
    publishedDate: "2025-12-10",
    readTime: "38 min",
    tags: ["PBM", "Contract Negotiation", "Pharmacy Economics", "Vendor Management"],
  },
  {
    id: "cap-007",
    title: "Network Adequacy Arbitrage: Geographic Cost Variance Exploitation",
    category: "Healthcare Economics",
    type: "research",
    description: "Geospatial analysis of provider network cost differentials. Identifies 42 MSAs where direct contracting or narrow network design produces >25% cost reduction vs broad network PPO. Includes member steerage economics.",
    publishedDate: "2025-11-28",
    readTime: "29 min",
    tags: ["Provider Networks", "Geographic Analysis", "Direct Contracting", "Cost Reduction"],
  },
  {
    id: "cap-008",
    title: "Regulatory Compliance as Competitive Moat: SOC 2, HIPAA, SOX Integration",
    category: "Compliance",
    type: "whitepaper",
    description: "Framework for converting compliance overhead into product differentiation. Demonstrates how integrated SOC 2 Type II + HIPAA + SOX 404 controls create defensible barriers to entry in regulated healthcare finance markets.",
    publishedDate: "2025-11-20",
    readTime: "26 min",
    tags: ["Compliance", "Security", "Competitive Strategy", "Regulatory"],
  },
  {
    id: "cap-009",
    title: "Data Quality Economics: ROI of Verified Evidence Receipts",
    category: "Data Strategy",
    type: "case-study",
    description: "Financial impact analysis of moving from 'trust me' analytics to cryptographically verified evidence receipts. Quantifies negotiation leverage improvement, dispute resolution velocity, and audit cost reduction across 200+ employer clients.",
    publishedDate: "2025-11-15",
    readTime: "24 min",
    tags: ["Data Quality", "Evidence Management", "Audit", "Trust Infrastructure"],
  },
  {
    id: "cap-010",
    title: "Telemedicine ROI: Behavioral Economics of Zero-Copay Design",
    category: "Healthcare Innovation",
    type: "research",
    description: "Experimental study of telemedicine adoption drivers. A/B testing across 14,000 members shows that use-case messaging (vs generic awareness) drives 3.2x higher utilization. Includes member communication templates and NPS impact analysis.",
    publishedDate: "2025-11-08",
    readTime: "19 min",
    tags: ["Telemedicine", "Behavioral Economics", "Member Experience", "Cost Avoidance"],
  },
  {
    id: "cap-011",
    title: "Wellness Program Economics: Adverse Selection and Participation Design",
    category: "Population Health",
    type: "guide",
    description: "Econometric analysis of wellness program participation patterns. Identifies adverse selection risks (healthy members opt in, sick members opt out) and designs incentive structures that achieve 65%+ participation with positive ROI.",
    publishedDate: "2025-10-25",
    readTime: "33 min",
    tags: ["Wellness", "Incentive Design", "Population Health", "Behavioral Finance"],
  },
  {
    id: "cap-012",
    title: "Claims Bundling: Episode-Based Payment Model Implementation",
    category: "Payment Innovation",
    type: "case-study",
    description: "Implementation playbook for CMS BPCI-A style bundled payments in self-insured employer context. Documents 18.4% cost reduction for total joint replacements with provider selection criteria, contract templates, and quality monitoring frameworks.",
    publishedDate: "2025-10-18",
    readTime: "37 min",
    tags: ["Bundled Payments", "Value-Based Care", "Provider Contracts", "Quality Metrics"],
  },
];

export default function CapitalLibraryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");

  const categories = ["all", ...Array.from(new Set(resources.map(r => r.category)))];
  const types = ["all", "whitepaper", "case-study", "research", "guide", "webinar"];

  const filteredResources = resources.filter(resource => {
    const categoryMatch = selectedCategory === "all" || resource.category === selectedCategory;
    const typeMatch = selectedType === "all" || resource.type === selectedType;
    return categoryMatch && typeMatch;
  });

  const featuredResources = resources.filter(r => r.featured);

  return (
    <>
      <SEO
        title="Capital Library - SiriusB iQ Ai Data Sciences Lab"
        description="Curated research, whitepapers, and case studies on healthcare cost arbitrage, private equity value creation, family office investment strategies, and data-driven operational excellence."
      />
      <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
        <SiteHeader />
        
        <main className="flex-1">
          {/* Hero Section */}
          <section className="border-b border-white/10 bg-gradient-to-b from-blue-950/50 to-transparent px-6 py-24">
            <div className="mx-auto max-w-7xl">
              <div className="flex items-start gap-4 mb-6">
                <div className="rounded-lg bg-blue-500/10 p-3 ring-1 ring-blue-500/20">
                  <BookOpen className="h-8 w-8 text-blue-400" />
                </div>
                <div>
                  <h1 className="text-5xl font-bold tracking-tight text-white mb-4">
                    Capital Library
                  </h1>
                  <p className="text-xl text-slate-300 max-w-3xl">
                    Curated research, frameworks, and case studies for capital allocators. Data-driven insights on healthcare cost arbitrage, operational value creation, and alternative investment strategies.
                  </p>
                </div>
              </div>

              <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="bg-slate-900/50 border-slate-700/50">
                  <CardHeader>
                    <TrendingUp className="h-8 w-8 text-green-400 mb-2" />
                    <CardTitle className="text-white">12 Resources</CardTitle>
                    <CardDescription>Whitepapers, case studies, research</CardDescription>
                  </CardHeader>
                </Card>
                <Card className="bg-slate-900/50 border-slate-700/50">
                  <CardHeader>
                    <Building2 className="h-8 w-8 text-blue-400 mb-2" />
                    <CardTitle className="text-white">5 Categories</CardTitle>
                    <CardDescription>PE, VC, Family Offices, M&A, Healthcare</CardDescription>
                  </CardHeader>
                </Card>
                <Card className="bg-slate-900/50 border-slate-700/50">
                  <CardHeader>
                    <LineChart className="h-8 w-8 text-purple-400 mb-2" />
                    <CardTitle className="text-white">23% Avg IRR</CardTitle>
                    <CardDescription>Healthcare arbitrage 5-year backtest</CardDescription>
                  </CardHeader>
                </Card>
                <Card className="bg-slate-900/50 border-slate-700/50">
                  <CardHeader>
                    <FileText className="h-8 w-8 text-orange-400 mb-2" />
                    <CardTitle className="text-white">340+ Pages</CardTitle>
                    <CardDescription>Deep research and frameworks</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </section>

          {/* Featured Resources */}
          <section className="px-6 py-16 border-b border-white/10">
            <div className="mx-auto max-w-7xl">
              <h2 className="text-3xl font-bold text-white mb-8">Featured Research</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredResources.map((resource) => (
                  <Card key={resource.id} className="bg-slate-900/50 border-blue-500/30 ring-1 ring-blue-500/20 hover:ring-blue-500/40 transition-all">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-4">
                        <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                          {resource.type.toUpperCase()}
                        </Badge>
                        <Badge variant="outline" className="text-slate-400">
                          {resource.readTime}
                        </Badge>
                      </div>
                      <CardTitle className="text-white text-lg leading-tight mb-2">
                        {resource.title}
                      </CardTitle>
                      <CardDescription className="text-slate-400 text-sm">
                        {resource.category}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-300 text-sm mb-4 line-clamp-3">
                        {resource.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {resource.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs text-slate-400 border-slate-600">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* All Resources with Filters */}
          <section className="px-6 py-16">
            <div className="mx-auto max-w-7xl">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-white">All Resources</h2>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-slate-400" />
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm text-white"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat === "all" ? "All Categories" : cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-slate-400" />
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm text-white"
                    >
                      {types.map((type) => (
                        <option key={type} value={type}>
                          {type === "all" ? "All Types" : type.charAt(0).toUpperCase() + type.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map((resource) => (
                  <Card key={resource.id} className="bg-slate-900/50 border-slate-700/50 hover:border-slate-600 transition-all">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-4">
                        <Badge variant="secondary" className="bg-slate-800 text-slate-300">
                          {resource.type.toUpperCase()}
                        </Badge>
                        <Badge variant="outline" className="text-slate-400">
                          {resource.readTime}
                        </Badge>
                      </div>
                      <CardTitle className="text-white text-base leading-tight mb-2">
                        {resource.title}
                      </CardTitle>
                      <CardDescription className="text-slate-400 text-sm">
                        {resource.category} • {new Date(resource.publishedDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-300 text-sm mb-4 line-clamp-3">
                        {resource.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {resource.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs text-slate-400 border-slate-600">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-800">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="px-6 py-24 border-t border-white/10">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-4xl font-bold text-white mb-6">
                Request Custom Research
              </h2>
              <p className="text-xl text-slate-300 mb-8">
                Need deeper analysis on a specific topic? Our research team can develop custom frameworks, models, and case studies tailored to your investment thesis.
              </p>
              <div className="flex gap-4 justify-center">
                <Link href="/request-demo">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Schedule Research Consultation
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                    Contact Research Team
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </main>

        <SiteFooter />
      </div>
    </>
  );
}