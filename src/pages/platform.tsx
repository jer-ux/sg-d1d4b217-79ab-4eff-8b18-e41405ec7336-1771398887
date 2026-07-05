import Head from "next/head";
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
  X,
  Sparkles,
  CheckCircle2,
  Crown,
  Lock,
  Coins,
  Brain,
  Clock,
  Activity,
  Globe,
  Cpu
} from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { motion, AnimatePresence } from "framer-motion";
import { PremiumGraphics } from "@/components/platform/PremiumGraphics";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import dynamic from "next/dynamic";
import Image from "next/image";

const PremiumBackground = dynamic(() => import("@/components/premium/PremiumBackground").then(mod => ({ default: mod.PremiumBackground })), { ssr: false });

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

type BadgeInfo = {
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  colorClass: string;
  glowClass: string;
  features: string[];
  benefits: string[];
};

const badgeExplanations: Record<string, BadgeInfo> = {
  Live: {
    name: "Live",
    description: "Production-ready features with real-time data streaming and active monitoring",
    icon: Sparkles,
    colorClass: "from-emerald-500/20 to-emerald-600/20 border-emerald-400/40",
    glowClass: "shadow-[0_0_30px_rgba(16,185,129,0.4)]",
    features: [
      "Real-time data streaming and event processing",
      "Active monitoring and alerting systems",
      "Production-grade reliability (99.9% uptime)",
      "24/7 support and incident response",
      "Fully documented APIs and integrations"
    ],
    benefits: [
      "Immediate insights without delays",
      "Instant alerts on critical events",
      "Battle-tested in production environments",
      "Enterprise-ready security and compliance"
    ]
  },
  Executive: {
    name: "Executive",
    description: "C-suite optimized dashboards with fiduciary-grade insights and decision support",
    icon: Crown,
    colorClass: "from-blue-500/20 to-purple-600/20 border-blue-400/40",
    glowClass: "shadow-[0_0_30px_rgba(59,130,246,0.4)]",
    features: [
      "High-level KPI dashboards with drill-down capability",
      "Executive summaries with actionable insights",
      "Board-ready reporting and presentations",
      "Strategic decision support systems",
      "Fiduciary-grade verification and audit trails"
    ],
    benefits: [
      "Make informed decisions with verified data",
      "Present to boards with confidence",
      "Track business impact at the highest level",
      "Defend decisions with cryptographic evidence"
    ]
  },
  Beta: {
    name: "Beta",
    description: "Preview features available for early access and testing with production quality",
    icon: Zap,
    colorClass: "from-purple-500/20 to-pink-600/20 border-purple-400/40",
    glowClass: "shadow-[0_0_30px_rgba(168,85,247,0.4)]",
    features: [
      "Early access to cutting-edge capabilities",
      "Production-quality code with active development",
      "Frequent updates and feature enhancements",
      "Direct feedback channel to product team",
      "Gradual rollout with stability monitoring"
    ],
    benefits: [
      "Get ahead with next-generation features",
      "Influence product direction with feedback",
      "Prepare for upcoming capabilities",
      "Competitive advantage through early adoption"
    ]
  },
  Verified: {
    name: "Verified",
    description: "Cryptographically signed evidence with immutable audit trails and compliance",
    icon: CheckCircle2,
    colorClass: "from-cyan-500/20 to-blue-600/20 border-cyan-400/40",
    glowClass: "shadow-[0_0_30px_rgba(6,182,212,0.4)]",
    features: [
      "Cryptographic signatures on all evidence",
      "Immutable blockchain-backed audit trails",
      "Tamper-proof verification protocols",
      "SOC 2 Type II compliant infrastructure",
      "Legal-grade evidence receipts"
    ],
    benefits: [
      "Defend decisions with cryptographic proof",
      "Meet regulatory compliance requirements",
      "Build stakeholder trust with transparency",
      "Eliminate disputes with verified evidence"
    ]
  },
  Ledger: {
    name: "Ledger",
    description: "Financial ledger integration with reconciliation and accountability tracking",
    icon: Coins,
    colorClass: "from-blue-500/20 to-purple-600/20 border-blue-400/40",
    glowClass: "shadow-[0_0_30px_rgba(59,130,246,0.4)]",
    features: [
      "Double-entry accounting system integration",
      "Automated reconciliation workflows",
      "Approval chains and audit trails",
      "External source integration (banks, ERPs)",
      "Cost optimization tracking"
    ],
    benefits: [
      "Track every dollar with precision",
      "Automate tedious reconciliation tasks",
      "Prove ROI with verified savings",
      "Ensure financial accountability"
    ]
  },
  AI: {
    name: "AI",
    description: "Autonomous AI agents for intelligent automation and decision support",
    icon: Brain,
    colorClass: "from-violet-500/20 to-purple-600/20 border-violet-400/40",
    glowClass: "shadow-[0_0_30px_rgba(139,92,246,0.4)]",
    features: [
      "Generative AI for policy creation and analysis",
      "Autonomous agents for workflow automation",
      "Natural language processing and understanding",
      "Predictive analytics and forecasting",
      "Intelligent decision support systems"
    ],
    benefits: [
      "Automate complex decision-making",
      "Scale expertise across the organization",
      "Reduce manual work with intelligent agents",
      "Uncover insights hidden in data"
    ]
  }
};

function BadgeExplanationModal({ badge, isOpen, onClose }: { badge: string | null; isOpen: boolean; onClose: () => void }) {
  if (!badge || !badgeExplanations[badge]) return null;
  
  const info = badgeExplanations[badge];
  const Icon = info.icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto bg-gradient-to-br from-slate-900 via-blue-900/50 to-purple-900/50 border border-blue-500/20 backdrop-blur-3xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={`absolute -top-20 -right-20 h-64 w-64 rounded-full bg-gradient-to-br ${info.colorClass} blur-3xl opacity-30`} />
          
          <DialogHeader>
            <div className="flex items-start gap-4 mb-4">
              <motion.div 
                className={`p-4 rounded-2xl bg-gradient-to-br ${info.colorClass} ${info.glowClass}`}
                animate={{
                  boxShadow: [
                    info.glowClass,
                    info.glowClass.replace('0.4', '0.6'),
                    info.glowClass,
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Icon className="h-8 w-8 text-blue-300" />
              </motion.div>
              
              <div className="flex-1">
                <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  {info.name} Features
                </DialogTitle>
                <p className="text-white/70 text-base leading-relaxed">
                  {info.description}
                </p>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-8 mt-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-blue-400" />
                Key Features
              </h3>
              <div className="space-y-3">
                {info.features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-blue-500/20 hover:bg-white/10 hover:border-blue-500/40 transition-all group"
                  >
                    <CheckCircle2 className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5 group-hover:text-blue-300 transition-colors" />
                    <p className="text-white/80 text-sm leading-relaxed group-hover:text-white transition-colors">{feature}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-400" />
                Business Benefits
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {info.benefits.map((benefit, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 hover:border-blue-500/40 transition-all group"
                  >
                    <p className="text-white/80 text-sm leading-relaxed group-hover:text-white transition-colors">
                      {benefit}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20"
            >
              <h4 className="text-lg font-semibold text-white mb-2">
                Ready to explore {info.name} features?
              </h4>
              <p className="text-white/70 text-sm mb-4">
                Discover how these capabilities can transform your operations with verified intelligence.
              </p>
              <Link
                href="/request-demo"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-6 py-3 text-sm font-medium hover:shadow-lg hover:shadow-blue-500/50 transition-all hover:scale-105"
              >
                Request Demo
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}

function NavigationCard({ card, onTagClick }: { card: NavCard; onTagClick?: (tag: string) => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={card.href}>
        <div className="group relative h-full rounded-2xl border border-blue-500/20 bg-gradient-to-br from-slate-900/40 via-blue-900/20 to-purple-900/20 backdrop-blur-xl p-6 transition-all duration-500 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/20 cursor-pointer overflow-hidden hover:scale-[1.02]">
          <motion.div
            className="absolute -top-6 -right-6 h-32 w-32 rounded-full bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-pink-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
          
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />

          <div className="relative z-10 flex items-start justify-between gap-3 mb-3">
            <motion.div 
              className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-400/30 shadow-lg shadow-blue-500/20"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <card.icon className="h-5 w-5 text-blue-300" />
            </motion.div>
            
            {card.tag && (
              <motion.button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (onTagClick) {
                    onTagClick(card.tag!);
                  }
                }}
                className={`text-[10px] px-3 py-1.5 rounded-full uppercase tracking-wider font-semibold transition-all duration-300 hover:scale-110 cursor-pointer ${
                  card.tag === "Live" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 shadow-lg shadow-emerald-500/30 hover:bg-emerald-500/30 hover:shadow-emerald-500/50" :
                  card.tag === "Executive" ? "bg-blue-500/20 text-blue-300 border border-blue-400/40 shadow-lg shadow-blue-500/30 hover:bg-blue-500/30 hover:shadow-blue-500/50" :
                  card.tag === "Beta" ? "bg-purple-500/20 text-purple-300 border border-purple-400/40 shadow-lg shadow-purple-500/30 hover:bg-purple-500/30 hover:shadow-purple-500/50" :
                  card.tag === "Verified" ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-lg shadow-cyan-500/30 hover:bg-cyan-500/30 hover:shadow-cyan-500/50" :
                  card.tag === "Ledger" ? "bg-blue-500/20 text-blue-300 border border-blue-400/40 shadow-lg shadow-blue-500/30 hover:bg-blue-500/30 hover:shadow-blue-500/50" :
                  card.tag === "AI" ? "bg-violet-500/20 text-violet-300 border border-violet-400/40 shadow-lg shadow-violet-500/30 hover:bg-violet-500/30 hover:shadow-violet-500/50" :
                  "bg-white/10 text-white/70 hover:bg-white/20"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {card.tag}
              </motion.button>
            )}
          </div>
          
          <div className="relative z-10">
            <h3 className="text-base font-semibold mb-2 text-white group-hover:text-blue-100 transition-colors">
              {card.title}
            </h3>
            
            <p className="text-sm leading-relaxed text-white/70 group-hover:text-white/90 transition-colors">
              {card.description}
            </p>

            <div className="mt-4 flex items-center gap-2 text-sm text-blue-300 group-hover:text-blue-200 transition-colors">
              <span>Explore</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>

          <motion.div
            className="absolute inset-0 rounded-2xl border border-blue-400/0 group-hover:border-blue-400/40 transition-all duration-500"
          />
        </div>
      </Link>
    </motion.div>
  );
}

function NavigationSection({ section, filteredCards, onTagClick }: { section: NavSection; filteredCards: NavCard[]; onTagClick?: (tag: string) => void }) {
  const sectionCards = filteredCards.filter(card => card.category === section.title);
  
  if (sectionCards.length === 0) return null;

  return (
    <motion.div 
      layout
      className="mb-12"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
          {section.title}
        </h2>
        <p className="text-sm text-white/60">{section.description}</p>
      </div>
      
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {sectionCards.map((card) => (
            <NavigationCard key={card.href} card={card} onTagClick={onTagClick} />
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export default function PlatformPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [badgeModalOpen, setBadgeModalOpen] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<string | null>(null);

  const handleTagClick = (tag: string) => {
    setSelectedBadge(tag);
    setBadgeModalOpen(true);
  };

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
          title: "Kincaid Health Product",
          description: "Comprehensive product overview with feature roadmap and release notes",
          href: "/kincaid-iq",
          icon: Zap,
          category: "Resources & Documentation"
        },
      ]
    },
  ];

  const allCards = useMemo(() => {
    return sections.flatMap(section => section.cards);
  }, []);

  const categories = useMemo(() => {
    return ["All", ...sections.map(s => s.title)];
  }, []);

  const tags = useMemo(() => {
    const uniqueTags = new Set(allCards.filter(card => card.tag).map(card => card.tag!));
    return Array.from(uniqueTags);
  }, [allCards]);

  const filteredCards = useMemo(() => {
    let filtered = allCards;

    if (selectedCategory !== "All") {
      filtered = filtered.filter(card => card.category === selectedCategory);
    }

    if (selectedTag) {
      filtered = filtered.filter(card => card.tag === selectedTag);
    }

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
      <Head>
        <title>Platform Overview - SiriusB iQ AI Data Sciences Lab</title>
      </Head>
      <SEO 
        title="Platform Overview — Kincaid Health"
        description="Kincaid Health transforms healthcare benefits management with AI-powered analytics, contract intelligence, and real-time monitoring."
      />
      
      <Nav />

      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white relative overflow-hidden">
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-purple-900/20 pointer-events-none" />
        
        <div className="fixed inset-0 pointer-events-none">
          <motion.div
            className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px]"
            animate={{
              y: [0, -50, 0],
              x: [0, 30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/15 rounded-full blur-[100px]"
            animate={{
              y: [0, 40, 0],
              x: [0, -20, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-[80px]"
            animate={{
              y: [0, -30, 0],
              x: [0, 25, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="fixed inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="fixed inset-0 pointer-events-none opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
          }} />
        </div>

        <section className="relative mx-auto max-w-7xl px-6 pt-24 pb-12 z-10">
          <motion.div 
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-xs tracking-[0.2em] text-blue-400/70 uppercase mb-4">Platform</div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6 leading-tight">
              Kincaid Health Platform
            </h1>
            <p className="text-lg text-white/70 max-w-3xl leading-relaxed mb-8">
              The Kincaid Health Platform is the enterprise healthcare intelligence system
            </p>

            <div className="flex flex-wrap gap-3 mb-12">
              <Link
                href="/request-demo"
                className="rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-6 py-3 text-sm font-medium text-white hover:shadow-lg hover:shadow-blue-500/50 transition-all hover:scale-105"
              >
                Request demo →
              </Link>
              <Link
                href="/war-room"
                className="rounded-2xl border border-blue-500/20 bg-white/5 backdrop-blur-xl px-6 py-3 text-sm text-white/80 hover:bg-white/10 hover:border-blue-500/40 transition-all"
              >
                Launch War Room →
              </Link>
            </div>
          </motion.div>

          <div className="relative -mx-6 mt-8">
            <PremiumGraphics />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-8 sticky top-16 z-40 bg-gradient-to-br from-slate-950/95 via-blue-950/95 to-slate-950/95 backdrop-blur-xl border-b border-blue-500/20">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-400/60" />
              <input
                type="text"
                placeholder="Search platform features, solutions, and resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-2xl border border-blue-500/20 bg-white/5 backdrop-blur-xl pl-12 pr-12 py-4 text-white placeholder:text-white/40 focus:border-blue-500/40 focus:bg-white/10 focus:outline-none transition-all"
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

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-4 py-2 text-sm transition-all ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-400/40 shadow-lg shadow-blue-500/30"
                      : "bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white/80 hover:border-blue-500/20"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-xs text-blue-400/70 uppercase tracking-wider">Tags:</span>
                {tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                    className={`rounded-full px-3 py-1 text-xs transition-all uppercase tracking-wider ${
                      selectedTag === tag
                        ? "bg-gradient-to-r from-blue-500/30 to-purple-500/30 text-blue-200 border border-blue-400/40 shadow-lg shadow-blue-500/30"
                        : "bg-white/5 text-white/50 border border-white/10 hover:bg-white/10 hover:text-white/70 hover:border-blue-500/20"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}

            {hasActiveFilters && (
              <div className="flex items-center justify-between gap-4 pt-2 border-t border-blue-500/20">
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <span>Showing {filteredCards.length} of {allCards.length} results</span>
                </div>
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-400/70 hover:text-blue-400 transition-colors flex items-center gap-1"
                >
                  <X className="h-3 w-3" />
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-12 relative z-10">
          {filteredCards.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <Search className="h-12 w-12 text-blue-400/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white/70 mb-2">No results found</h3>
              <p className="text-white/50 mb-6">
                Try adjusting your search or filters to find what you're looking for
              </p>
              <button
                onClick={clearFilters}
                className="rounded-2xl border border-blue-500/20 bg-white/5 backdrop-blur-xl px-6 py-3 text-sm text-white hover:bg-white/10 hover:border-blue-500/40 transition-all"
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
                onTagClick={handleTagClick}
              />
            ))
          )}
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-20 relative z-10">
          <motion.div 
            className="rounded-3xl border border-blue-500/20 bg-gradient-to-br from-slate-900/40 via-blue-900/20 to-purple-900/20 backdrop-blur-xl p-8 md:p-12 relative overflow-hidden group hover:border-blue-500/40 transition-all"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="absolute -top-10 -right-10 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
            
            <div className="max-w-2xl relative z-10">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                Ready to see it in action?
              </h2>
              <p className="text-white/70 mb-6 leading-relaxed">
                Schedule a personalized demo to see how Kincaid Health can transform your operations 
                with verifiable intelligence and automated governance.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/request-demo"
                  className="rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-6 py-3 text-sm font-medium text-white hover:shadow-lg hover:shadow-blue-500/50 transition-all hover:scale-105"
                >
                  Request demo →
                </Link>
                <Link
                  href="/company"
                  className="rounded-2xl border border-blue-500/20 bg-white/5 backdrop-blur-xl px-6 py-3 text-sm text-white/80 hover:bg-white/10 hover:border-blue-500/40 transition-all"
                >
                  About us →
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />

      <BadgeExplanationModal 
        badge={selectedBadge}
        isOpen={badgeModalOpen}
        onClose={() => {
          setBadgeModalOpen(false);
          setSelectedBadge(null);
        }}
      />
    </>
  );
}