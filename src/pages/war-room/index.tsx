import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Activity, TrendingUp, Shield, Zap, BarChart3, FileText, 
  Target, Layers, ChevronRight, ArrowRight, DollarSign,
  Brain, Lock, Sparkles, Eye, Users, AlertCircle, CheckCircle
} from "lucide-react";
import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { EventDetailDrawer } from "@/components/warroom/EventDetailDrawer";
import { mockWarRoomData } from "@/lib/mocks/mockWarRoom";
import type { WarEvent } from "@/lib/warroom/types";

type TileConfig = {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  color: {
    from: string;
    to: string;
    glow: string;
    text: string;
  };
  metric?: {
    value: string;
    label: string;
    trend?: "up" | "down";
    change?: string;
  };
  link: string;
  badge?: string;
};

const tiles: TileConfig[] = [
  {
    id: "executive",
    title: "Executive Dashboard",
    subtitle: "CFO-ready KPIs with McKinsey and Bain frameworks",
    icon: Target,
    color: {
      from: "from-violet-500",
      to: "to-fuchsia-500",
      glow: "shadow-violet-500/20",
      text: "text-violet-400"
    },
    metric: {
      value: "$3.2M",
      label: "Total Identified Value",
      trend: "up",
      change: "+12.3%"
    },
    link: "/executive-war-room",
    badge: "C-Suite"
  },
  {
    id: "intelligence",
    title: "Real-Time Intelligence",
    subtitle: "Live event stream with AI-powered governance",
    icon: Activity,
    color: {
      from: "from-blue-500",
      to: "to-cyan-500",
      glow: "shadow-blue-500/20",
      text: "text-blue-400"
    },
    metric: {
      value: "10M+",
      label: "Events Processed",
      trend: "up",
      change: "99.2%"
    },
    link: "/war-room-v2",
    badge: "Live"
  },
  {
    id: "value",
    title: "Value Creation",
    subtitle: "Arbitrage opportunities and contract optimization",
    icon: TrendingUp,
    color: {
      from: "from-emerald-500",
      to: "to-teal-500",
      glow: "shadow-emerald-500/20",
      text: "text-emerald-400"
    },
    metric: {
      value: "$3.03M",
      label: "Arbitrage Identified",
      trend: "up",
      change: "+8.7%"
    },
    link: "#four-lane",
    badge: "High Impact"
  },
  {
    id: "controls",
    title: "Controls & Compliance",
    subtitle: "Policy violations and governance automation",
    icon: Shield,
    color: {
      from: "from-amber-500",
      to: "to-orange-500",
      glow: "shadow-amber-500/20",
      text: "text-amber-400"
    },
    metric: {
      value: "94.2%",
      label: "Data Quality Score",
      trend: "up",
      change: "+2.1%"
    },
    link: "#four-lane",
    badge: "Critical"
  },
  {
    id: "agentic",
    title: "Agentic Automation",
    subtitle: "AI agents handling routine tasks autonomously",
    icon: Zap,
    color: {
      from: "from-purple-500",
      to: "to-pink-500",
      glow: "shadow-purple-500/20",
      text: "text-purple-400"
    },
    metric: {
      value: "847",
      label: "Tasks Automated",
      trend: "up",
      change: "+156%"
    },
    link: "#four-lane",
    badge: "AI Powered"
  },
  {
    id: "marketplace",
    title: "Marketplace Intel",
    subtitle: "Vendor performance and rebate optimization",
    icon: BarChart3,
    color: {
      from: "from-rose-500",
      to: "to-red-500",
      glow: "shadow-rose-500/20",
      text: "text-rose-400"
    },
    metric: {
      value: "$410K",
      label: "Rebate Recovery",
      trend: "up",
      change: "+5.2%"
    },
    link: "#four-lane",
    badge: "Vendor"
  },
  {
    id: "evidence",
    title: "Evidence Library",
    subtitle: "Cryptographically signed audit trails",
    icon: FileText,
    color: {
      from: "from-indigo-500",
      to: "to-blue-500",
      glow: "shadow-indigo-500/20",
      text: "text-indigo-400"
    },
    metric: {
      value: "2,847",
      label: "Verified Receipts",
      trend: "up",
      change: "100%"
    },
    link: "/evidence-receipts",
    badge: "Verified"
  },
  {
    id: "ranked",
    title: "Ranked Events",
    subtitle: "Prioritized by impact, confidence, and urgency",
    icon: Layers,
    color: {
      from: "from-cyan-500",
      to: "to-blue-500",
      glow: "shadow-cyan-500/20",
      text: "text-cyan-400"
    },
    metric: {
      value: "127",
      label: "Active Events",
      trend: "up",
      change: "+23"
    },
    link: "#ranked-events",
    badge: "Prioritized"
  }
];

export default function WarRoomPage() {
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const handleTileClick = (tile: TileConfig) => {
    if (tile.link.startsWith("#")) {
      const section = tile.link.substring(1);
      setActiveSection(section);
      setTimeout(() => {
        document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <>
      <SEO 
        title="War Room - Real-Time Intelligence Platform | SiriusB iQ"
        description="AI-powered operational command center with real-time KPIs, evidence-backed insights, and autonomous governance"
      />
      <Nav />

      <div className="min-h-screen bg-black text-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-32 pb-20">
          {/* Ambient Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 via-transparent to-transparent" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-[120px]" />
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              {/* Premium Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20 backdrop-blur-xl mb-6"
              >
                <Sparkles className="h-4 w-4 text-violet-400" />
                <span className="text-sm font-medium text-violet-300">Operational Command Center</span>
              </motion.div>

              {/* Main Headline */}
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[1.1]">
                <span className="bg-gradient-to-r from-white via-violet-200 to-fuchsia-200 bg-clip-text text-transparent">
                  War Room
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-xl md:text-2xl text-white/60 mb-4 font-light">
                Real-time intelligence platform with AI-powered governance
              </p>

              <p className="text-base md:text-lg text-white/40 max-w-2xl mx-auto mb-12">
                Live operational dashboard exposing arbitrage opportunities, compliance gaps, 
                and financial leakage—backed by cryptographically verified evidence trails
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button 
                  size="lg" 
                  className="h-14 px-8 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white shadow-lg shadow-violet-500/25 transition-all hover:shadow-xl hover:shadow-violet-500/40 hover:scale-105"
                  onClick={() => document.getElementById('tiles')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Explore War Room
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="h-14 px-8 rounded-full border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-xl transition-all hover:scale-105"
                  asChild
                >
                  <Link href="/contact">
                    Request Demo
                  </Link>
                </Button>
              </div>

              {/* Stats Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto"
              >
                {[
                  { label: "Events Processed", value: "10M+", icon: Activity },
                  { label: "Response Time", value: "<100ms", icon: Zap },
                  { label: "Accuracy Rate", value: "99.2%", icon: Target },
                  { label: "Active Lanes", value: "4", icon: Layers }
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + idx * 0.1, duration: 0.5 }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all">
                      <div className="flex items-center gap-2 mb-2">
                        <stat.icon className="h-4 w-4 text-violet-400" />
                        <p className="text-xs text-white/60">{stat.label}</p>
                      </div>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 8 Premium Tiles Section */}
        <section id="tiles" className="relative py-20">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                  Unified Command Center
                </span>
              </h2>
              <p className="text-lg text-white/60 max-w-2xl mx-auto">
                Eight integrated intelligence modules delivering real-time operational insights
              </p>
            </motion.div>

            {/* Tiles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tiles.map((tile, idx) => (
                <motion.div
                  key={tile.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                >
                  <PremiumTile
                    tile={tile}
                    onClick={() => {
                      if (tile.link.startsWith("http") || tile.link.startsWith("/")) {
                        window.location.href = tile.link;
                      } else {
                        handleTileClick(tile);
                      }
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Four Lane Ledger Section */}
        <AnimatePresence>
          {activeSection === "four-lane" && (
            <motion.section
              id="four-lane"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="relative py-20 border-t border-white/10"
            >
              <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between mb-12">
                  <div>
                    <h2 className="text-4xl font-bold mb-2">Four Lane Ledger</h2>
                    <p className="text-white/60">Comprehensive value tracking across all operational lanes</p>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => setActiveSection(null)}
                    className="text-white/60 hover:text-white"
                  >
                    Close
                  </Button>
                </div>
                <FourLaneLedger onEventClick={(event) => setSelectedEventId(event.id)} />
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Ranked Events Section */}
        <AnimatePresence>
          {activeSection === "ranked-events" && (
            <motion.section
              id="ranked-events"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="relative py-20 border-t border-white/10"
            >
              <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between mb-12">
                  <div>
                    <h2 className="text-4xl font-bold mb-2">Ranked Events</h2>
                    <p className="text-white/60">Prioritized by financial impact, confidence, and time sensitivity</p>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => setActiveSection(null)}
                    className="text-white/60 hover:text-white"
                  >
                    Close
                  </Button>
                </div>
                <RankedEventsView onEventClick={(event) => setSelectedEventId(event.id)} />
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Why War Room Section */}
        <section className="relative py-20 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                  Why War Room?
                </span>
              </h2>
              <p className="text-lg text-white/60 max-w-2xl mx-auto">
                Real-time operational intelligence that transforms how you manage health benefits
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Eye,
                  title: "Complete Visibility",
                  description: "Real-time dashboards showing actual plan performance, spend patterns, and outlier detection across pharmacy and medical",
                  features: ["Live KPI monitoring", "Anomaly detection", "Trend forecasting", "Executive reporting"]
                },
                {
                  icon: Lock,
                  title: "Evidence-Backed",
                  description: "Every alert tied to verifiable claims data, contract terms, and defined methodologies. No black boxes.",
                  features: ["Cryptographic signing", "Audit trails", "Source attribution", "Compliance ready"]
                },
                {
                  icon: Brain,
                  title: "Action-Ready",
                  description: "Ranked decision levers with quantified impact, exportable evidence packs, and governance automation",
                  features: ["Prioritized insights", "Impact scoring", "Automated workflows", "Board-ready reports"]
                }
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                >
                  <Card className="relative group h-full bg-white/5 backdrop-blur-xl border-white/10 hover:border-white/20 transition-all overflow-hidden">
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-fuchsia-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="relative p-8">
                      <div className="mb-6">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border border-violet-500/30 mb-4">
                          <feature.icon className="h-7 w-7 text-violet-400" />
                        </div>
                        <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                        <p className="text-white/60 leading-relaxed">{feature.description}</p>
                      </div>
                      
                      <ul className="space-y-2">
                        {feature.features.map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-white/50">
                            <CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="relative py-20">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 via-fuchsia-500/20 to-purple-500/20 rounded-3xl blur-3xl" />
              
              <Card className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-white/20 overflow-hidden">
                <div className="p-12 text-center">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Ready to Transform Your Operations?
                  </h2>
                  <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">
                    Experience the power of real-time intelligence with AI-powered governance and evidence-backed insights
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button 
                      size="lg" 
                      className="h-14 px-8 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white shadow-lg shadow-violet-500/25 transition-all hover:shadow-xl hover:shadow-violet-500/40"
                      asChild
                    >
                      <Link href="/contact">
                        Request Demo
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="h-14 px-8 rounded-full border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-xl"
                      asChild
                    >
                      <Link href="/executive-war-room">
                        View Executive Dashboard
                      </Link>
                    </Button>
                  </div>

                  <p className="mt-8 text-sm text-white/40">
                    Trusted by CFOs, benefits leaders, and risk managers at leading organizations
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Event Detail Drawer */}
      <EventDetailDrawer
        eventId={selectedEventId}
        open={!!selectedEventId}
        onClose={() => setSelectedEventId(null)}
      />

      <Footer />
    </>
  );
}

// Premium Tile Component with Apple-caliber design
function PremiumTile({ tile, onClick }: { tile: TileConfig; onClick: () => void }) {
  const Icon = tile.icon;
  
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={onClick}
      className="group relative cursor-pointer h-full"
    >
      {/* Glow Effect on Hover */}
      <div className={`absolute -inset-1 bg-gradient-to-r ${tile.color.from} ${tile.color.to} rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500`} />
      
      <Card className="relative h-full bg-white/5 backdrop-blur-xl border-white/10 group-hover:border-white/20 overflow-hidden transition-all duration-300">
        {/* Ambient Gradient Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${tile.color.from}/5 ${tile.color.to}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
        
        {/* Shimmer Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>

        <div className="relative p-8 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${tile.color.from}/20 ${tile.color.to}/20 border border-white/10 group-hover:scale-110 transition-transform duration-300`}>
              <Icon className={`h-7 w-7 ${tile.color.text}`} />
            </div>
            
            {tile.badge && (
              <Badge className={`bg-gradient-to-r ${tile.color.from}/20 ${tile.color.to}/20 border-white/10 text-white/90 text-xs px-3 py-1`}>
                {tile.badge}
              </Badge>
            )}
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2 text-white group-hover:text-white/90 transition-colors">
              {tile.title}
            </h3>
            <p className="text-sm text-white/50 group-hover:text-white/60 transition-colors leading-relaxed">
              {tile.subtitle}
            </p>
          </div>

          {/* Metric */}
          {tile.metric && (
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold mb-1 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                    {tile.metric.value}
                  </p>
                  <p className="text-xs text-white/40">{tile.metric.label}</p>
                </div>
                {tile.metric.change && (
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
                    tile.metric.trend === "up" 
                      ? "bg-emerald-500/10 text-emerald-400" 
                      : "bg-red-500/10 text-red-400"
                  }`}>
                    {tile.metric.trend === "up" ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingUp className="h-3 w-3 rotate-180" />
                    )}
                    <span className="text-xs font-medium">{tile.metric.change}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Arrow Indicator */}
          <div className="mt-4 flex items-center justify-end">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full bg-white/5 group-hover:bg-gradient-to-r ${tile.color.from}/20 ${tile.color.to}/20 border border-white/10 transition-all duration-300 group-hover:translate-x-1`}>
              <ChevronRight className={`h-4 w-4 ${tile.color.text}`} />
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

// Four Lane Ledger Component
function FourLaneLedger({ onEventClick }: { onEventClick: (event: WarEvent) => void }) {
  const lanes = [
    { key: "value" as const, label: "Value Creation", icon: TrendingUp, color: "blue" },
    { key: "controls" as const, label: "Controls & Compliance", icon: Shield, color: "amber" },
    { key: "agentic" as const, label: "Agentic Automation", icon: Zap, color: "purple" },
    { key: "marketplace" as const, label: "Marketplace Intel", icon: BarChart3, color: "rose" }
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {lanes.map((lane) => {
        const laneEvents = mockWarRoomData.events.filter(e => e.lane === lane.key);
        const Icon = lane.icon;
        
        return (
          <Card key={lane.key} className="bg-white/5 backdrop-blur-xl border-white/10 hover:border-white/20 transition-all">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 rounded-xl bg-gradient-to-br from-${lane.color}-500/20 to-${lane.color}-600/20 border border-${lane.color}-500/30`}>
                  <Icon className={`h-6 w-6 text-${lane.color}-400`} />
                </div>
                <div>
                  <h3 className="text-lg font-bold">{lane.label}</h3>
                  <p className="text-sm text-white/50">{laneEvents.length} active events</p>
                </div>
              </div>

              <div className="space-y-3">
                {laneEvents.slice(0, 3).map((event) => (
                  <Card 
                    key={event.id}
                    className="p-4 bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 cursor-pointer transition-all group"
                    onClick={() => onEventClick(event)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm mb-1 group-hover:text-white/90 transition-colors">
                          {event.title}
                        </h4>
                        <p className="text-xs text-white/40">{event.subtitle}</p>
                      </div>
                      <Badge variant={
                        event.state === "REALIZED" ? "default" :
                        event.state === "APPROVED" ? "secondary" :
                        "outline"
                      } className="text-xs">
                        {event.state}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-white/50">
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3 text-emerald-400" />
                        ${(event.amount / 1000).toFixed(0)}K
                      </span>
                      <span className="flex items-center gap-1">
                        <Activity className="h-3 w-3 text-blue-400" />
                        {(event.confidence * 100).toFixed(0)}%
                      </span>
                      {event.owner && (
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3 text-purple-400" />
                          {event.owner}
                        </span>
                      )}
                    </div>
                  </Card>
                ))}
              </div>

              {laneEvents.length > 3 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full mt-3 text-white/60 hover:text-white hover:bg-white/5"
                >
                  View all {laneEvents.length} events
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
}

// Ranked Events View Component
function RankedEventsView({ onEventClick }: { onEventClick: (event: WarEvent) => void }) {
  const sortedEvents = [...mockWarRoomData.events]
    .sort((a, b) => {
      const scoreA = (a.amount / 1000000) * a.confidence * (a.timeSensitivity || 1);
      const scoreB = (b.amount / 1000000) * b.confidence * (b.timeSensitivity || 1);
      return scoreB - scoreA;
    })
    .slice(0, 10);

  return (
    <div className="space-y-4">
      {sortedEvents.map((event, idx) => {
        const score = ((event.amount / 1000000) * event.confidence * (event.timeSensitivity || 1) * 100).toFixed(1);
        
        return (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05, duration: 0.3 }}
          >
            <Card 
              className="p-6 bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 hover:border-white/20 cursor-pointer transition-all group"
              onClick={() => onEventClick(event)}
            >
              <div className="flex items-start gap-6">
                {/* Rank Badge */}
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border border-violet-500/30 flex items-center justify-center">
                  <span className="text-lg font-bold text-violet-400">#{idx + 1}</span>
                </div>
                
                <div className="flex-1">
                  {/* Event Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-bold mb-1 group-hover:text-white/90 transition-colors">
                        {event.title}
                      </h4>
                      <p className="text-sm text-white/50">{event.subtitle}</p>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-xs text-white/40 mb-1">Impact Score</p>
                      <p className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                        {score}
                      </p>
                    </div>
                  </div>

                  {/* Event Metrics */}
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-emerald-400" />
                      <span className="font-semibold text-white/80">
                        ${(event.amount / 1000).toFixed(0)}K
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-blue-400" />
                      <span className="text-white/60">
                        {(event.confidence * 100).toFixed(0)}% confidence
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-orange-400" />
                      <span className="text-white/60">
                        {((event.timeSensitivity || 0) * 100).toFixed(0)}% urgency
                      </span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {event.type}
                    </Badge>
                    <Badge variant={
                      event.state === "REALIZED" ? "default" :
                      event.state === "APPROVED" ? "secondary" :
                      "outline"
                    } className="text-xs">
                      {event.state}
                    </Badge>
                  </div>
                </div>

                {/* Arrow Indicator */}
                <div className="flex-shrink-0 mt-2">
                  <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all group-hover:translate-x-1">
                    <ChevronRight className="h-4 w-4 text-white/40 group-hover:text-white/60" />
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}