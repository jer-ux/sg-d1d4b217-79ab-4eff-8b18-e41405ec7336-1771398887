import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Activity, TrendingUp, Shield, Zap, BarChart3, FileText, 
  Target, Layers, ChevronRight, ArrowRight, DollarSign,
  Brain, Lock, Sparkles, Eye, Users, AlertCircle, CheckCircle, Database
} from "lucide-react";
import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { EventDetailDrawer } from "@/components/warroom/EventDetailDrawer";
import { WarRoomHero3D } from "@/components/kincaid-iq/WarRoomHero3D";
import { mockWarRoomData } from "@/lib/mocks/mockWarRoom";
import type { WarEvent } from "@/lib/warroom/types";
import { getTerm, COMPLIANCE_SECTIONS } from "@/lib/compliance/terminology";

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

export default function WarRoomPage() {
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  
  // CFO-focused compliance terminology
  const userRole = "cfo";

  const tiles: TileConfig[] = [
    {
      id: "executive",
      title: "Executive Dashboard",
      subtitle: "CFO-ready KPIs with McKinsey and Bain frameworks",
      icon: Target,
      color: {
        from: "from-amber-500",
        to: "to-yellow-500",
        glow: "shadow-amber-500/30",
        text: "text-amber-400"
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
      title: getTerm("warRoom", userRole),
      subtitle: "Live event stream with AI-powered governance",
      icon: Activity,
      color: {
        from: "from-amber-400",
        to: "to-orange-500",
        glow: "shadow-amber-500/30",
        text: "text-amber-400"
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
      subtitle: `${getTerm("arbitrage", userRole)} opportunities and contract optimization`,
      icon: TrendingUp,
      color: {
        from: "from-yellow-500",
        to: "to-amber-500",
        glow: "shadow-yellow-500/30",
        text: "text-yellow-400"
      },
      metric: {
        value: "$3.03M",
        label: `${getTerm("arbitrage", userRole)} Identified`,
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
        to: "to-orange-600",
        glow: "shadow-amber-500/30",
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
        from: "from-yellow-400",
        to: "to-amber-500",
        glow: "shadow-yellow-500/30",
        text: "text-yellow-400"
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
        from: "from-orange-500",
        to: "to-amber-600",
        glow: "shadow-orange-500/30",
        text: "text-orange-400"
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
      title: getTerm("evidence", userRole) + " Library",
      subtitle: "Cryptographically signed audit trails",
      icon: FileText,
      color: {
        from: "from-amber-500",
        to: "to-yellow-500",
        glow: "shadow-amber-500/30",
        text: "text-amber-400"
      },
      metric: {
        value: "2,847",
        label: `Verified ${getTerm("receipt", userRole)}s`,
        trend: "up",
        change: "100%"
      },
      link: "/evidence-receipts",
      badge: "Verified"
    },
    {
      id: "ranked",
      title: `Ranked ${getTerm("event", userRole)}s`,
      subtitle: "Prioritized by impact, confidence, and urgency",
      icon: Layers,
      color: {
        from: "from-yellow-500",
        to: "to-amber-600",
        glow: "shadow-yellow-500/30",
        text: "text-yellow-400"
      },
      metric: {
        value: "127",
        label: `Active ${getTerm("event", userRole)}s`,
        trend: "up",
        change: "+23"
      },
      link: "#ranked-events",
      badge: "Prioritized"
    }
  ];

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
        title={`${getTerm("warRoom", userRole)} - Real-Time Intelligence Platform | SiriusB iQ`}
        description="AI-powered operational command center with real-time KPIs, evidence-backed insights, and autonomous governance"
      />
      <Nav />

      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* Animated Background Effects - keeping existing code */}
        <div className="fixed inset-0 pointer-events-none">
          <motion.div
            className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-1/4 right-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
              x: [0, -30, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div
            className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.2, 0.3, 0.2],
              x: [0, 40, 0],
              y: [0, -40, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />

          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-amber-400/40 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}

          <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
        </div>

        {/* Hero Section */}
        <section className="relative">
          <WarRoomHero3D />
        </section>

        {/* 8 Premium Tiles Section */}
        <section id="tiles" className="relative py-32">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="inline-block mb-6"
              >
                <Badge className="px-6 py-2 text-sm bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border-amber-500/30 text-amber-300">
                  <Sparkles className="w-4 h-4 mr-2" />
                  CFO-Ready Intelligence Platform
                </Badge>
              </motion.div>
              
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white via-amber-200 to-yellow-300 bg-clip-text text-transparent">
                  Executive Healthcare Dashboard
                </span>
              </h2>
              <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
                Real-time operational intelligence delivering evidence-backed insights with McKinsey and Bain frameworks
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

            {/* Executive Insights Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-amber-950/40 to-zinc-900/60 border border-amber-500/30"
            >
              <div className="flex items-center gap-3 mb-6">
                <Brain className="w-6 h-6 text-amber-400" />
                <h3 className="text-2xl font-bold text-white">Strategic Framework Alignment</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Built on proven consulting methodologies from McKinsey 7-S Framework and Bain's Results Delivery® model
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { label: "Data Quality Score", value: "99.2%", icon: Database },
                  { label: "Decision Velocity", value: "4.7x faster", icon: Zap },
                  { label: "ROI Realized", value: "$12.4M", icon: DollarSign }
                ].map((metric, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-black/30 border border-amber-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <metric.icon className="w-4 h-4 text-amber-400" />
                      <span className="text-xs text-gray-400">{metric.label}</span>
                    </div>
                    <div className="text-2xl font-bold text-amber-400">{metric.value}</div>
                  </div>
                ))}
              </div>
            </motion.div>
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
              className="relative py-20 border-t border-amber-500/10"
            >
              <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between mb-12">
                  <div>
                    <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent">
                      Four Lane Ledger
                    </h2>
                    <p className="text-white/60">Comprehensive value tracking across all operational lanes</p>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => setActiveSection(null)}
                    className="text-white/60 hover:text-amber-400 hover:bg-amber-500/10"
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
              className="relative py-20 border-t border-amber-500/10"
            >
              <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between mb-12">
                  <div>
                    <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent">
                      Ranked Events
                    </h2>
                    <p className="text-white/60">Prioritized by financial impact, confidence, and time sensitivity</p>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => setActiveSection(null)}
                    className="text-white/60 hover:text-amber-400 hover:bg-amber-500/10"
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
        <section className="relative py-32 border-t border-amber-500/10">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="inline-block mb-6"
              >
                <Badge className="px-6 py-2 text-sm bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border-amber-500/30 text-amber-300">
                  <Eye className="w-4 h-4 mr-2" />
                  Enterprise Intelligence
                </Badge>
              </motion.div>

              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white via-amber-200 to-yellow-300 bg-clip-text text-transparent">
                  Why War Room?
                </span>
              </h2>
              <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
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
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative"
                >
                  {/* Glow on Hover */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500" />
                  
                  <Card className="relative h-full bg-white/5 backdrop-blur-xl border-amber-500/20 group-hover:border-amber-500/40 overflow-hidden transition-all duration-300">
                    {/* Ambient Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </div>

                    <div className="relative p-8">
                      <div className="mb-6">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-yellow-500/20 border border-amber-500/30 mb-6 group-hover:scale-110 transition-transform duration-300">
                          <feature.icon className="h-8 w-8 text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                        </div>
                        <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent">
                          {feature.title}
                        </h3>
                        <p className="text-white/60 leading-relaxed">{feature.description}</p>
                      </div>
                      
                      <ul className="space-y-3">
                        {feature.features.map((item, i) => (
                          <li key={i} className="flex items-center gap-3 text-sm text-white/50 group-hover:text-white/70 transition-colors">
                            <CheckCircle className="h-4 w-4 text-amber-400 flex-shrink-0 drop-shadow-[0_0_4px_rgba(245,158,11,0.5)]" />
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

        {/* Final CTA Section - Updated with compliance terminology */}
        <section className="relative py-32">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Animated Border */}
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 rounded-3xl opacity-75 blur-lg animate-pulse" />
              
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/30 via-yellow-500/30 to-orange-500/30 rounded-3xl blur-3xl" />
              
              <Card className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-amber-500/30 overflow-hidden">
                <div className="p-16 text-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="inline-block mb-6"
                  >
                    <Badge className="px-6 py-3 text-base bg-gradient-to-r from-amber-500/30 to-yellow-500/30 border-amber-500/50 text-amber-200">
                      <Sparkles className="w-5 h-5 mr-2" />
                      Limited Beta Access
                    </Badge>
                  </motion.div>

                  <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    <span className="bg-gradient-to-r from-white via-amber-200 to-yellow-300 bg-clip-text text-transparent">
                      Ready to Transform Your Operations?
                    </span>
                  </h2>
                  <p className="text-xl text-white/60 mb-12 max-w-3xl mx-auto leading-relaxed">
                    Experience the power of real-time intelligence with AI-powered governance and evidence-backed insights
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Button 
                      size="lg" 
                      className="h-16 px-10 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-bold text-lg shadow-xl shadow-amber-500/30 transition-all hover:shadow-2xl hover:shadow-amber-500/50 hover:scale-105"
                      asChild
                    >
                      <Link href="/contact">
                        Request Demo
                        <ArrowRight className="ml-3 h-6 w-6" />
                      </Link>
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="h-16 px-10 rounded-full border-amber-500/30 bg-white/5 hover:bg-amber-500/10 backdrop-blur-xl text-white hover:text-amber-200 hover:border-amber-500/50 transition-all"
                      asChild
                    >
                      <Link href="/executive-war-room">
                        View Executive Dashboard
                      </Link>
                    </Button>
                  </div>

                  <p className="mt-12 text-sm text-white/40">
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

// Premium Tile Component - keeping existing implementation
function PremiumTile({ tile, onClick }: { tile: TileConfig; onClick: () => void }) {
  const Icon = tile.icon;
  
  return (
    <motion.div
      whileHover={{ y: -12, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={onClick}
      className="group relative cursor-pointer h-full"
    >
      <div className={`absolute -inset-1 bg-gradient-to-r ${tile.color.from} ${tile.color.to} rounded-3xl opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500`} />
      
      <Card className="relative h-full bg-white/5 backdrop-blur-xl border-amber-500/20 group-hover:border-amber-500/40 overflow-hidden transition-all duration-300">
        <div className={`absolute inset-0 bg-gradient-to-br ${tile.color.from}/5 ${tile.color.to}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
        
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>

        <div className="relative p-8 flex flex-col h-full">
          <div className="flex items-start justify-between mb-6">
            <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${tile.color.from}/20 ${tile.color.to}/20 border border-amber-500/30 group-hover:scale-110 transition-transform duration-300`}>
              <Icon className={`h-7 w-7 ${tile.color.text} drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]`} />
            </div>
            
            {tile.badge && (
              <Badge className={`bg-gradient-to-r ${tile.color.from}/20 ${tile.color.to}/20 border-amber-500/30 text-amber-300 text-xs px-3 py-1`}>
                {tile.badge}
              </Badge>
            )}
          </div>

          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2 text-white group-hover:text-amber-200 transition-colors">
              {tile.title}
            </h3>
            <p className="text-sm text-white/50 group-hover:text-white/70 transition-colors leading-relaxed">
              {tile.subtitle}
            </p>
          </div>

          {tile.metric && (
            <div className="mt-6 pt-6 border-t border-amber-500/20">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold mb-1 bg-gradient-to-r from-white via-amber-200 to-yellow-300 bg-clip-text text-transparent">
                    {tile.metric.value}
                  </p>
                  <p className="text-xs text-white/40">{tile.metric.label}</p>
                </div>
                {tile.metric.change && (
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
                    tile.metric.trend === "up" 
                      ? "bg-amber-500/10 text-amber-400" 
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

          <div className="mt-4 flex items-center justify-end">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full bg-white/5 group-hover:bg-gradient-to-r ${tile.color.from}/20 ${tile.color.to}/20 border border-amber-500/20 transition-all duration-300 group-hover:translate-x-1`}>
              <ChevronRight className={`h-4 w-4 ${tile.color.text}`} />
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

// Four Lane Ledger Component - keeping existing implementation
function FourLaneLedger({ onEventClick }: { onEventClick: (event: WarEvent) => void }) {
  const lanes = [
    { key: "value" as const, label: "Value Creation", icon: TrendingUp, color: "amber" },
    { key: "controls" as const, label: "Controls & Compliance", icon: Shield, color: "orange" },
    { key: "agentic" as const, label: "Agentic Automation", icon: Zap, color: "yellow" },
    { key: "marketplace" as const, label: "Marketplace Intel", icon: BarChart3, color: "amber" }
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {lanes.map((lane) => {
        const laneEvents = mockWarRoomData.events.filter(e => e.lane === lane.key);
        const Icon = lane.icon;
        
        return (
          <motion.div
            key={lane.key}
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Card className="bg-white/5 backdrop-blur-xl border-amber-500/20 hover:border-amber-500/40 transition-all group">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-3 rounded-xl bg-gradient-to-br from-${lane.color}-500/20 to-${lane.color}-600/20 border border-amber-500/30 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`h-6 w-6 text-${lane.color}-400 drop-shadow-[0_0_6px_rgba(245,158,11,0.5)]`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-200 transition-colors">
                      {lane.label}
                    </h3>
                    <p className="text-sm text-white/50">{laneEvents.length} active events</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {laneEvents.slice(0, 3).map((event) => (
                    <Card 
                      key={event.id}
                      className="p-4 bg-white/5 border-amber-500/20 hover:bg-amber-500/10 hover:border-amber-500/40 cursor-pointer transition-all group/event"
                      onClick={() => onEventClick(event)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm mb-1 group-hover/event:text-amber-200 transition-colors">
                            {event.title}
                          </h4>
                          <p className="text-xs text-white/40">{event.subtitle}</p>
                        </div>
                        <Badge variant={
                          event.state === "REALIZED" ? "default" :
                          event.state === "APPROVED" ? "secondary" :
                          "outline"
                        } className="text-xs bg-amber-500/10 border-amber-500/30 text-amber-300">
                          {event.state}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-white/50">
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3 text-amber-400" />
                          ${(event.amount / 1000).toFixed(0)}K
                        </span>
                        <span className="flex items-center gap-1">
                          <Activity className="h-3 w-3 text-yellow-400" />
                          {(event.confidence * 100).toFixed(0)}%
                        </span>
                        {event.owner && (
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3 text-orange-400" />
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
                    className="w-full mt-3 text-white/60 hover:text-amber-400 hover:bg-amber-500/10"
                  >
                    View all {laneEvents.length} events
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}

// Ranked Events View Component - keeping existing implementation
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
            whileHover={{ y: -4, scale: 1.01 }}
          >
            <Card 
              className="p-6 bg-white/5 backdrop-blur-xl border-amber-500/20 hover:bg-amber-500/5 hover:border-amber-500/40 cursor-pointer transition-all group"
              onClick={() => onEventClick(event)}
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-amber-500/20 to-yellow-500/20 border border-amber-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-lg font-bold text-amber-400">#{idx + 1}</span>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-bold mb-1 group-hover:text-amber-200 transition-colors">
                        {event.title}
                      </h4>
                      <p className="text-sm text-white/50">{event.subtitle}</p>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-xs text-white/40 mb-1">Impact Score</p>
                      <p className="text-2xl font-bold bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-300 bg-clip-text text-transparent">
                        {score}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-amber-400 drop-shadow-[0_0_4px_rgba(245,158,11,0.5)]" />
                      <span className="font-semibold text-white/80">
                        ${(event.amount / 1000).toFixed(0)}K
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-yellow-400 drop-shadow-[0_0_4px_rgba(234,179,8,0.5)]" />
                      <span className="text-white/60">
                        {(event.confidence * 100).toFixed(0)}% confidence
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-orange-400 drop-shadow-[0_0_4px_rgba(249,115,22,0.5)]" />
                      <span className="text-white/60">
                        {((event.timeSensitivity || 0) * 100).toFixed(0)}% urgency
                      </span>
                    </div>
                    <Badge variant="outline" className="text-xs bg-amber-500/10 border-amber-500/30 text-amber-300">
                      {event.type}
                    </Badge>
                    <Badge variant={
                      event.state === "REALIZED" ? "default" :
                      event.state === "APPROVED" ? "secondary" :
                      "outline"
                    } className="text-xs bg-amber-500/10 border-amber-500/30 text-amber-300">
                      {event.state}
                    </Badge>
                  </div>
                </div>

                <div className="flex-shrink-0 mt-2">
                  <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-amber-500/20 border border-amber-500/20 flex items-center justify-center transition-all group-hover:translate-x-1">
                    <ChevronRight className="h-4 w-4 text-white/40 group-hover:text-amber-400" />
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