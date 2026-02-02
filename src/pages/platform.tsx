import { useState, useMemo } from "react";
import Link from "next/link";
import { 
  FileText, 
  Shield, 
  Zap, 
  Database,
  BarChart3,
  Settings,
  AlertTriangle,
  Plug,
  Users,
  TrendingUp,
  BookOpen,
  Award,
  Building2,
  Bot,
  Calculator,
  GitBranch,
  FileCheck,
  Eye,
  Search,
  X
} from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { motion, AnimatePresence } from "framer-motion";
import { PremiumGraphics } from "@/components/platform/PremiumGraphics";

type NavCard = {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  tag?: string;
  category: string;
};

type NavSection = {
  title: string;
  description: string;
  cards: NavCard[];
};

function NavigationCard({ card }: { card: NavCard }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={card.href}>
        <div className="group relative h-full rounded-2xl border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:bg-white/10 hover:border-white/20 cursor-pointer">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="p-2 rounded-xl bg-white/10 group-hover:bg-white/15 transition-colors">
              <card.icon className="h-5 w-5 text-white/80" />
            </div>
            {card.tag && (
              <span className="text-[10px] px-2 py-1 rounded-full bg-white/10 text-white/70 uppercase tracking-wider">
                {card.tag}
              </span>
            )}
          </div>
          
          <h3 className="text-base font-semibold text-white/90 mb-2 group-hover:text-white transition-colors">
            {card.title}
          </h3>
          
          <p className="text-sm text-white/60 leading-relaxed group-hover:text-white/70 transition-colors">
            {card.description}
          </p>

          <div className="mt-4 flex items-center gap-2 text-sm text-white/50 group-hover:text-white/70 transition-colors">
            <span>Explore</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function NavigationSection({ section, filteredCards }: { section: NavSection; filteredCards: NavCard[] }) {
  const sectionCards = filteredCards.filter(card => card.category === section.title);
  
  if (sectionCards.length === 0) return null;

  return (
    <motion.div 
      layout
      className="mb-12"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white/95 mb-2">{section.title}</h2>
        <p className="text-sm text-white/60">{section.description}</p>
      </div>
      
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {sectionCards.map((card) => (
            <NavigationCard key={card.href} card={card} />
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export default function Platform() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const sections: NavSection[] = [
    {
      title: "Core Platform",
      description: "Mission-critical operational intelligence and governance",
      cards: [
        {
          title: "War Room",
          description: "Real-time incident management with AI-powered event ranking, severity scoring, and automated governance workflows",
          href: "/war-room",
          icon: Zap,
          tag: "Live",
          category: "Core Platform"
        },
        {
          title: "Executive War Room",
          description: "C-suite dashboard with 4-tile KPI view, ranked events by impact, and drill-down to evidence receipts",
          href: "/executive-war-room",
          icon: BarChart3,
          tag: "Executive",
          category: "Core Platform"
        },
        {
          title: "War Room V2",
          description: "Next-generation war room with enhanced streaming, real-time audit trails, and attachment management",
          href: "/war-room-v2",
          icon: Zap,
          tag: "Beta",
          category: "Core Platform"
        },
        {
          title: "Evidence Receipts",
          description: "Cryptographically signed proof of business outcomes with immutable audit trails and verification",
          href: "/evidence-receipts",
          icon: FileCheck,
          tag: "Verified",
          category: "Core Platform"
        },
        {
          title: "Verified Savings Ledger",
          description: "Blockchain-backed cost optimization tracking with immutable records and stakeholder accountability",
          href: "/verified-savings-ledger",
          icon: TrendingUp,
          tag: "Ledger",
          category: "Core Platform"
        },
        {
          title: "General Ledger",
          description: "Complete financial ledger with reconciliation, approvals, and external source integration",
          href: "/ledger",
          icon: Database,
          category: "Core Platform"
        },
        {
          title: "Ledger Reconciliation",
          description: "Automated reconciliation dashboard with discrepancy detection and resolution workflows",
          href: "/ledger/reconciliation",
          icon: GitBranch,
          category: "Core Platform"
        },
        {
          title: "Arbitrage Events",
          description: "Cross-system discrepancy detection with root cause analysis and resolution tracking",
          href: "/arbitrage-events",
          icon: AlertTriangle,
          category: "Core Platform"
        },
        {
          title: "Proof Library",
          description: "Centralized repository of verified proofs, evidence packages, and audit artifacts",
          href: "/proof-library",
          icon: BookOpen,
          category: "Core Platform"
        },
      ]
    },
    {
      title: "Platform Features",
      description: "Advanced capabilities and administrative tools",
      cards: [
        {
          title: "Evidence Management",
          description: "Comprehensive evidence artifact storage, versioning, and chain-of-custody tracking",
          href: "/platform/evidence",
          icon: FileText,
          category: "Platform Features"
        },
        {
          title: "Data Quality",
          description: "Automated data quality checks, anomaly detection, and remediation workflows",
          href: "/platform/dq",
          icon: Shield,
          category: "Platform Features"
        },
        {
          title: "Incident Management",
          description: "Structured incident response with automated escalation and resolution tracking",
          href: "/platform/incidents",
          icon: AlertTriangle,
          category: "Platform Features"
        },
        {
          title: "Connectors",
          description: "Pre-built integrations for Snowflake, Databricks, ServiceNow, and enterprise systems",
          href: "/platform/connectors",
          icon: Plug,
          category: "Platform Features"
        },
        {
          title: "KPI Management",
          description: "Configure, track, and visualize custom KPIs with automated threshold alerts",
          href: "/platform/kpis",
          icon: BarChart3,
          category: "Platform Features"
        },
        {
          title: "Platform Admin",
          description: "User management, role-based access control, and system configuration",
          href: "/platform/admin",
          icon: Settings,
          category: "Platform Features"
        },
      ]
    },
    {
      title: "Solutions & Use Cases",
      description: "Industry-specific solutions and transformational capabilities",
      cards: [
        {
          title: "Gen AI Agents",
          description: "Autonomous AI agents for workflow automation, policy enforcement, and intelligent decision support",
          href: "/gen-ai-agents",
          icon: Bot,
          tag: "AI",
          category: "Solutions & Use Cases"
        },
        {
          title: "Agentic Policy",
          description: "AI-driven policy generation, compliance monitoring, and automated governance",
          href: "/agentic-policy",
          icon: Shield,
          category: "Solutions & Use Cases"
        },
        {
          title: "Agentic Transformation",
          description: "End-to-end business transformation powered by autonomous AI agents",
          href: "/agentic-transformation",
          icon: GitBranch,
          category: "Solutions & Use Cases"
        },
        {
          title: "Family Offices",
          description: "Comprehensive wealth management platform with portfolio tracking and family governance",
          href: "/family-offices",
          icon: Building2,
          category: "Solutions & Use Cases"
        },
        {
          title: "Venture Capital Support",
          description: "Portfolio monitoring, due diligence automation, and LP reporting for VC firms",
          href: "/family-offices/venture-capital",
          icon: TrendingUp,
          category: "Solutions & Use Cases"
        },
        {
          title: "M&A Support",
          description: "Deal pipeline management, due diligence tracking, and post-merger integration",
          href: "/family-offices/ma",
          icon: GitBranch,
          category: "Solutions & Use Cases"
        },
        {
          title: "M&A / VC / PE",
          description: "Unified platform for private equity, venture capital, and M&A operations",
          href: "/ma-vc-pe",
          icon: Building2,
          category: "Solutions & Use Cases"
        },
        {
          title: "Capital Markets",
          description: "Investor relations, capital raise tracking, and verified performance reporting",
          href: "/capital-markets",
          icon: TrendingUp,
          category: "Solutions & Use Cases"
        },
        {
          title: "Capital Library",
          description: "Curated investment insights, market intelligence, and LP communication templates",
          href: "/capital-library",
          icon: BookOpen,
          category: "Solutions & Use Cases"
        },
        {
          title: "Actuarial Benefits",
          description: "Benefits administration with actuarial modeling and compliance tracking",
          href: "/actuarial-benefits",
          icon: Calculator,
          category: "Solutions & Use Cases"
        },
      ]
    },
    {
      title: "Marketplace & Integrations",
      description: "Pre-built connectors and enterprise integrations",
      cards: [
        {
          title: "Marketplace Hub",
          description: "Browse and deploy pre-built integrations, agents, and solution accelerators",
          href: "/marketplace",
          icon: Plug,
          category: "Marketplace & Integrations"
        },
        {
          title: "Snowflake Integration",
          description: "Native Snowflake connector with zero-copy data sharing and secure views",
          href: "/marketplace/snowflake",
          icon: Database,
          category: "Marketplace & Integrations"
        },
        {
          title: "Databricks Integration",
          description: "Databricks Delta Lake integration with real-time data pipelines",
          href: "/marketplace/databricks",
          icon: Database,
          category: "Marketplace & Integrations"
        },
        {
          title: "ServiceNow Practice",
          description: "ServiceNow ITSM integration with automated ticket creation and resolution",
          href: "/marketplace/servicenow",
          icon: Settings,
          category: "Marketplace & Integrations"
        },
      ]
    },
    {
      title: "Resources & Documentation",
      description: "Learn, explore, and understand the platform",
      cards: [
        {
          title: "Documentation",
          description: "Complete platform documentation, API references, and integration guides",
          href: "/docs",
          icon: BookOpen,
          category: "Resources & Documentation"
        },
        {
          title: "Case Studies",
          description: "Real-world success stories, implementation patterns, and ROI analysis",
          href: "/case-studies",
          icon: Award,
          category: "Resources & Documentation"
        },
        {
          title: "Platform Overview",
          description: "Deep dive into platform architecture, governance model, and verification protocols",
          href: "/platform-why",
          icon: Eye,
          category: "Resources & Documentation"
        },
        {
          title: "Executive Walkthrough",
          description: "Guided tour of executive features, KPIs, and decision support capabilities",
          href: "/exec-walkthrough",
          icon: Users,
          category: "Resources & Documentation"
        },
        {
          title: "Security & Governance",
          description: "SOC 2 compliance, encryption standards, and security architecture",
          href: "/security-governance",
          icon: Shield,
          category: "Resources & Documentation"
        },
        {
          title: "Kincaid IQ Product",
          description: "Comprehensive product overview with feature roadmap and release notes",
          href: "/kincaid-iq",
          icon: Zap,
          category: "Resources & Documentation"
        },
      ]
    },
  ];

  // Flatten all cards for filtering
  const allCards = useMemo(() => {
    return sections.flatMap(section => section.cards);
  }, []);

  // Extract unique categories and tags
  const categories = useMemo(() => {
    return ["All", ...sections.map(s => s.title)];
  }, []);

  const tags = useMemo(() => {
    const uniqueTags = new Set(allCards.filter(card => card.tag).map(card => card.tag!));
    return Array.from(uniqueTags);
  }, [allCards]);

  // Filter cards based on search and filters
  const filteredCards = useMemo(() => {
    let filtered = allCards;

    // Apply category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter(card => card.category === selectedCategory);
    }

    // Apply tag filter
    if (selectedTag) {
      filtered = filtered.filter(card => card.tag === selectedTag);
    }

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(card => 
        card.title.toLowerCase().includes(query) ||
        card.description.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [allCards, selectedCategory, selectedTag, searchQuery]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedTag(null);
  };

  const hasActiveFilters = searchQuery.trim() !== "" || selectedCategory !== "All" || selectedTag !== null;

  return (
    <>
      <SEO
        title="Platform - Kincaid IQ"
        description="Comprehensive platform navigation for AI-powered data intelligence, governance, and verified outcomes"
      />
      
      <Nav />

      <main className="min-h-screen bg-black text-white">
        {/* Hero with 3D Graphics */}
        <section className="relative mx-auto max-w-7xl px-6 pt-24 pb-12">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.15),transparent_50%)]" />
          
          <div className="relative">
            <div className="text-xs tracking-[0.2em] text-white/50 uppercase mb-4">Platform</div>
            <h1 className="text-5xl md:text-6xl font-bold text-white/95 mb-6 leading-tight">
              Explore the Platform
            </h1>
            <p className="text-lg text-white/70 max-w-3xl leading-relaxed mb-8">
              A comprehensive operating system for fiduciary-grade decisions. Navigate through our core platform capabilities, 
              industry solutions, integrations, and resources to find exactly what you need.
            </p>

            <div className="flex flex-wrap gap-3 mb-12">
              <Link
                href="/request-demo"
                className="rounded-2xl border border-white/10 bg-white/10 px-6 py-3 text-sm text-white hover:bg-white/15 transition-colors"
              >
                Request demo →
              </Link>
              <Link
                href="/war-room"
                className="rounded-2xl border border-white/10 bg-black/40 px-6 py-3 text-sm text-white/80 hover:bg-white/5 transition-colors"
              >
                Launch War Room →
              </Link>
            </div>
          </div>

          {/* Premium 3D Graphics */}
          <div className="relative -mx-6 mt-8">
            <PremiumGraphics />
          </div>
        </section>

        {/* Search and Filter Bar */}
        <section className="mx-auto max-w-7xl px-6 py-8 sticky top-16 z-40 bg-black/80 backdrop-blur-xl border-b border-white/10">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
              <input
                type="text"
                placeholder="Search platform features, solutions, and resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 pl-12 pr-12 py-4 text-white placeholder:text-white/40 focus:border-white/20 focus:bg-white/10 focus:outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="h-4 w-4 text-white/60" />
                </button>
              )}
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-4 py-2 text-sm transition-all ${
                    selectedCategory === category
                      ? "bg-white/20 text-white border border-white/30"
                      : "bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white/80"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Tag Filters */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-xs text-white/50 uppercase tracking-wider">Tags:</span>
                {tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                    className={`rounded-full px-3 py-1 text-xs transition-all uppercase tracking-wider ${
                      selectedTag === tag
                        ? "bg-violet-500/30 text-violet-200 border border-violet-400/40"
                        : "bg-white/5 text-white/50 border border-white/10 hover:bg-white/10 hover:text-white/70"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}

            {/* Active Filters Summary */}
            {hasActiveFilters && (
              <div className="flex items-center justify-between gap-4 pt-2 border-t border-white/10">
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <span>Showing {filteredCards.length} of {allCards.length} results</span>
                </div>
                <button
                  onClick={clearFilters}
                  className="text-sm text-white/50 hover:text-white/80 transition-colors flex items-center gap-1"
                >
                  <X className="h-3 w-3" />
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Navigation Sections */}
        <section className="mx-auto max-w-7xl px-6 py-12">
          {filteredCards.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <Search className="h-12 w-12 text-white/20 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white/70 mb-2">No results found</h3>
              <p className="text-white/50 mb-6">
                Try adjusting your search or filters to find what you're looking for
              </p>
              <button
                onClick={clearFilters}
                className="rounded-2xl border border-white/10 bg-white/10 px-6 py-3 text-sm text-white hover:bg-white/15 transition-colors"
              >
                Clear all filters
              </button>
            </motion.div>
          ) : (
            sections.map((section) => (
              <NavigationSection 
                key={section.title} 
                section={section} 
                filteredCards={filteredCards}
              />
            ))
          )}
        </section>

        {/* Footer CTA */}
        <section className="mx-auto max-w-7xl px-6 pb-20">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold text-white/95 mb-4">
                Ready to see it in action?
              </h2>
              <p className="text-white/70 mb-6 leading-relaxed">
                Schedule a personalized demo to see how Kincaid IQ can transform your operations 
                with verifiable intelligence and automated governance.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/request-demo"
                  className="rounded-2xl border border-white/10 bg-white text-black px-6 py-3 text-sm font-medium hover:bg-white/90 transition-colors"
                >
                  Request demo →
                </Link>
                <Link
                  href="/company"
                  className="rounded-2xl border border-white/10 bg-black/40 px-6 py-3 text-sm text-white/80 hover:bg-white/5 transition-colors"
                >
                  About us →
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