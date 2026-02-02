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
  Eye
} from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";

type NavCard = {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  tag?: string;
};

type NavSection = {
  title: string;
  description: string;
  cards: NavCard[];
};

function NavigationCard({ card }: { card: NavCard }) {
  return (
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
  );
}

function NavigationSection({ section }: { section: NavSection }) {
  return (
    <div className="mb-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white/95 mb-2">{section.title}</h2>
        <p className="text-sm text-white/60">{section.description}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {section.cards.map((card) => (
          <NavigationCard key={card.href} card={card} />
        ))}
      </div>
    </div>
  );
}

export default function Platform() {
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
          tag: "Live"
        },
        {
          title: "Executive War Room",
          description: "C-suite dashboard with 4-tile KPI view, ranked events by impact, and drill-down to evidence receipts",
          href: "/executive-war-room",
          icon: BarChart3,
          tag: "Executive"
        },
        {
          title: "War Room V2",
          description: "Next-generation war room with enhanced streaming, real-time audit trails, and attachment management",
          href: "/war-room-v2",
          icon: Zap,
          tag: "Beta"
        },
        {
          title: "Evidence Receipts",
          description: "Cryptographically signed proof of business outcomes with immutable audit trails and verification",
          href: "/evidence-receipts",
          icon: FileCheck,
          tag: "Verified"
        },
        {
          title: "Verified Savings Ledger",
          description: "Blockchain-backed cost optimization tracking with immutable records and stakeholder accountability",
          href: "/verified-savings-ledger",
          icon: TrendingUp,
          tag: "Ledger"
        },
        {
          title: "General Ledger",
          description: "Complete financial ledger with reconciliation, approvals, and external source integration",
          href: "/ledger",
          icon: Database,
        },
        {
          title: "Ledger Reconciliation",
          description: "Automated reconciliation dashboard with discrepancy detection and resolution workflows",
          href: "/ledger/reconciliation",
          icon: GitBranch,
        },
        {
          title: "Arbitrage Events",
          description: "Cross-system discrepancy detection with root cause analysis and resolution tracking",
          href: "/arbitrage-events",
          icon: AlertTriangle,
        },
        {
          title: "Proof Library",
          description: "Centralized repository of verified proofs, evidence packages, and audit artifacts",
          href: "/proof-library",
          icon: BookOpen,
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
        },
        {
          title: "Data Quality",
          description: "Automated data quality checks, anomaly detection, and remediation workflows",
          href: "/platform/dq",
          icon: Shield,
        },
        {
          title: "Incident Management",
          description: "Structured incident response with automated escalation and resolution tracking",
          href: "/platform/incidents",
          icon: AlertTriangle,
        },
        {
          title: "Connectors",
          description: "Pre-built integrations for Snowflake, Databricks, ServiceNow, and enterprise systems",
          href: "/platform/connectors",
          icon: Plug,
        },
        {
          title: "KPI Management",
          description: "Configure, track, and visualize custom KPIs with automated threshold alerts",
          href: "/platform/kpis",
          icon: BarChart3,
        },
        {
          title: "Platform Admin",
          description: "User management, role-based access control, and system configuration",
          href: "/platform/admin",
          icon: Settings,
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
          tag: "AI"
        },
        {
          title: "Agentic Policy",
          description: "AI-driven policy generation, compliance monitoring, and automated governance",
          href: "/agentic-policy",
          icon: Shield,
        },
        {
          title: "Agentic Transformation",
          description: "End-to-end business transformation powered by autonomous AI agents",
          href: "/agentic-transformation",
          icon: GitBranch,
        },
        {
          title: "Family Offices",
          description: "Comprehensive wealth management platform with portfolio tracking and family governance",
          href: "/family-offices",
          icon: Building2,
        },
        {
          title: "Venture Capital Support",
          description: "Portfolio monitoring, due diligence automation, and LP reporting for VC firms",
          href: "/family-offices/venture-capital",
          icon: TrendingUp,
        },
        {
          title: "M&A Support",
          description: "Deal pipeline management, due diligence tracking, and post-merger integration",
          href: "/family-offices/ma",
          icon: GitBranch,
        },
        {
          title: "M&A / VC / PE",
          description: "Unified platform for private equity, venture capital, and M&A operations",
          href: "/ma-vc-pe",
          icon: Building2,
        },
        {
          title: "Capital Markets",
          description: "Investor relations, capital raise tracking, and verified performance reporting",
          href: "/capital-markets",
          icon: TrendingUp,
        },
        {
          title: "Capital Library",
          description: "Curated investment insights, market intelligence, and LP communication templates",
          href: "/capital-library",
          icon: BookOpen,
        },
        {
          title: "Actuarial Benefits",
          description: "Benefits administration with actuarial modeling and compliance tracking",
          href: "/actuarial-benefits",
          icon: Calculator,
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
        },
        {
          title: "Snowflake Integration",
          description: "Native Snowflake connector with zero-copy data sharing and secure views",
          href: "/marketplace/snowflake",
          icon: Database,
        },
        {
          title: "Databricks Integration",
          description: "Databricks Delta Lake integration with real-time data pipelines",
          href: "/marketplace/databricks",
          icon: Database,
        },
        {
          title: "ServiceNow Practice",
          description: "ServiceNow ITSM integration with automated ticket creation and resolution",
          href: "/marketplace/servicenow",
          icon: Settings,
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
        },
        {
          title: "Case Studies",
          description: "Real-world success stories, implementation patterns, and ROI analysis",
          href: "/case-studies",
          icon: Award,
        },
        {
          title: "Platform Overview",
          description: "Deep dive into platform architecture, governance model, and verification protocols",
          href: "/platform-why",
          icon: Eye,
        },
        {
          title: "Executive Walkthrough",
          description: "Guided tour of executive features, KPIs, and decision support capabilities",
          href: "/exec-walkthrough",
          icon: Users,
        },
        {
          title: "Security & Governance",
          description: "SOC 2 compliance, encryption standards, and security architecture",
          href: "/security-governance",
          icon: Shield,
        },
        {
          title: "Kincaid IQ Product",
          description: "Comprehensive product overview with feature roadmap and release notes",
          href: "/kincaid-iq",
          icon: Zap,
        },
      ]
    },
  ];

  return (
    <>
      <SEO
        title="Platform - Kincaid IQ"
        description="Comprehensive platform navigation for AI-powered data intelligence, governance, and verified outcomes"
      />
      
      <Nav />

      <main className="min-h-screen bg-black text-white">
        {/* Hero */}
        <section className="relative mx-auto max-w-7xl px-6 pt-24 pb-12">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.15),transparent_50%)]" />
          
          <div className="relative">
            <div className="text-xs tracking-[0.2em] text-white/50 uppercase mb-4">Platform</div>
            <h1 className="text-5xl md:text-6xl font-bold text-white/95 mb-6 leading-tight">
              Explore the Platform
            </h1>
            <p className="text-lg text-white/70 max-w-3xl leading-relaxed">
              A comprehensive operating system for fiduciary-grade decisions. Navigate through our core platform capabilities, 
              industry solutions, integrations, and resources to find exactly what you need.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
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
        </section>

        {/* Navigation Sections */}
        <section className="mx-auto max-w-7xl px-6 py-12">
          {sections.map((section) => (
            <NavigationSection key={section.title} section={section} />
          ))}
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