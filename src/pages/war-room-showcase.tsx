import { useState } from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { 
  BarChart3, 
  Shield, 
  Sparkles, 
  TrendingUp, 
  FileText, 
  Activity,
  Brain,
  DollarSign,
  Scale
} from "lucide-react";

const showcaseItems = [
  {
    id: "executive-command",
    title: "Executive Command Center",
    subtitle: "Real-Time Strategic Intelligence",
    description: "Unified dashboard providing C-suite visibility into all critical health benefits operations. Monitor KPIs, track savings opportunities, and make data-driven decisions in real-time.",
    image: "/01_executive_command_center.png",
    icon: BarChart3,
    category: "Executive",
    features: [
      "Real-time operational metrics",
      "Multi-lane event tracking",
      "Executive KPI dashboards",
      "Strategic decision support"
    ]
  },
  {
    id: "pbm-transparency",
    title: "PBM Transparency Dashboard",
    subtitle: "Pharmacy Benefits Intelligence",
    description: "Deep visibility into pharmacy benefit manager performance, drug pricing trends, and rebate optimization opportunities. Identify cost leakage and negotiate better terms.",
    image: "/02_pbm_transparency_dashboard.png",
    icon: Shield,
    category: "Cost Control",
    features: [
      "Rebate performance tracking",
      "Drug pricing analytics",
      "Formulary optimization",
      "PBM contract compliance"
    ]
  },
  {
    id: "drug-cost",
    title: "Drug Cost Intelligence",
    subtitle: "Pharmaceutical Spend Optimization",
    description: "Advanced analytics for pharmaceutical spend management. Identify high-cost medications, therapeutic alternatives, and opportunities for biosimilar adoption.",
    image: "/03_drug_cost_intelligence.png",
    icon: DollarSign,
    category: "Cost Control",
    features: [
      "High-cost medication tracking",
      "Therapeutic alternatives analysis",
      "Biosimilar opportunities",
      "Cost trend forecasting"
    ]
  },
  {
    id: "actuarial-risk",
    title: "Actuarial Risk Simulation",
    subtitle: "Predictive Risk Modeling",
    description: "Monte Carlo simulations and actuarial modeling for stop-loss optimization, premium forecasting, and risk assessment. Make confident decisions backed by statistical rigor.",
    image: "/04_actuarial_risk_simulation.png",
    icon: TrendingUp,
    category: "Risk Management",
    features: [
      "Monte Carlo simulations",
      "Stop-loss optimization",
      "Premium forecasting",
      "Risk scenario analysis"
    ]
  },
  {
    id: "stop-loss",
    title: "Stop-Loss Optimization",
    subtitle: "Attachment Point Analysis",
    description: "Sophisticated modeling to determine optimal stop-loss attachment points, evaluate corridor options, and maximize ROI on reinsurance investments.",
    image: "/05_stop_loss_optimization.png",
    icon: Activity,
    category: "Risk Management",
    features: [
      "Attachment point optimization",
      "Corridor analysis",
      "Claims distribution modeling",
      "Reinsurance ROI tracking"
    ]
  },
  {
    id: "evidence-lineage",
    title: "Evidence Lineage Explorer",
    subtitle: "Audit Trail & Proof Management",
    description: "Complete audit trail for every financial decision and savings claim. Track evidence lineage, maintain compliance, and provide bulletproof documentation for audits.",
    image: "/06_evidence_lineage_explorer.png",
    icon: FileText,
    category: "Governance",
    features: [
      "Complete audit trails",
      "Evidence relationship mapping",
      "Compliance documentation",
      "Chain-of-custody tracking"
    ]
  },
  {
    id: "governance-ledger",
    title: "Governance Ledger",
    subtitle: "Fiduciary Accountability System",
    description: "Immutable ledger of all fiduciary decisions, approvals, and governance actions. Demonstrate ERISA compliance and fiduciary duty fulfillment.",
    image: "/07_governance_ledger.png",
    icon: Scale,
    category: "Governance",
    features: [
      "Fiduciary decision log",
      "ERISA compliance tracking",
      "Approval workflows",
      "Governance audit reports"
    ]
  },
  {
    id: "copilot-strategy",
    title: "AI Copilot Strategy",
    subtitle: "Intelligent Decision Support",
    description: "Gen AI-powered strategic advisor providing real-time recommendations, risk assessments, and action plans based on your operational data and industry best practices.",
    image: "/08_copilot_strategy.png",
    icon: Brain,
    category: "AI Intelligence",
    features: [
      "AI-powered recommendations",
      "Strategic scenario modeling",
      "Risk mitigation strategies",
      "Best practice guidance"
    ]
  },
  {
    id: "contract-leakage",
    title: "Contract Leakage Detection",
    subtitle: "Vendor Performance & Compliance",
    description: "Automated detection of contract non-compliance, pricing discrepancies, and vendor performance issues. Recover lost value and ensure contractual obligations are met.",
    image: "/09_contract_leakage.png",
    icon: Sparkles,
    category: "Cost Control",
    features: [
      "Contract compliance monitoring",
      "Pricing discrepancy detection",
      "Vendor performance scoring",
      "Automatic recovery workflows"
    ]
  }
];

const categories = ["All", "Executive", "Cost Control", "Risk Management", "Governance", "AI Intelligence"];

export default function WarRoomShowcase() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const filteredItems = selectedCategory === "All" 
    ? showcaseItems 
    : showcaseItems.filter(item => item.category === selectedCategory);

  const selectedShowcase = showcaseItems.find(item => item.id === selectedItem);

  return (
    <>
      <Head>
        <title>War Room Showcase - SiriusB iQ Platform Capabilities</title>
        <meta name="description" content="Explore the full capabilities of SiriusB iQ's War Room platform through detailed screenshots and feature breakdowns." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
        <SiteHeader />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-6 bg-purple-500/20 text-purple-300 border-purple-500/30 px-4 py-2">
                Platform Showcase
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                War Room
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  Visual Tour
                </span>
              </h1>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Explore the complete SiriusB iQ platform through detailed screenshots of our most powerful features. 
                From executive dashboards to AI-powered insights, see how we transform health benefits management.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="px-6 pb-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category 
                    ? "bg-purple-600 hover:bg-purple-700" 
                    : "border-slate-700 text-slate-300 hover:bg-slate-800"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Screenshot Gallery */}
        <section className="px-6 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card 
                      className="bg-slate-900/50 border-slate-800 hover:border-purple-500/50 transition-all duration-300 cursor-pointer overflow-hidden group"
                      onClick={() => setSelectedItem(item.id)}
                    >
                      {/* Screenshot */}
                      <div className="relative aspect-video bg-slate-950 overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
                        
                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-purple-600/90 text-white border-0">
                            {item.category}
                          </Badge>
                        </div>

                        {/* Icon */}
                        <div className="absolute bottom-4 right-4 bg-purple-600 p-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-sm text-purple-400 mb-3 font-medium">
                          {item.subtitle}
                        </p>
                        <p className="text-slate-400 text-sm leading-relaxed mb-4">
                          {item.description}
                        </p>

                        {/* Feature Pills */}
                        <div className="flex flex-wrap gap-2">
                          {item.features.slice(0, 2).map((feature, idx) => (
                            <span
                              key={idx}
                              className="text-xs px-2 py-1 bg-slate-800 text-slate-300 rounded-full"
                            >
                              {feature}
                            </span>
                          ))}
                          {item.features.length > 2 && (
                            <span className="text-xs px-2 py-1 bg-slate-800 text-purple-400 rounded-full">
                              +{item.features.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Detail Modal */}
        {selectedShowcase && (
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Full Screenshot */}
              <div className="relative aspect-video bg-slate-950">
                <Image
                  src={selectedShowcase.image}
                  alt={selectedShowcase.title}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Details */}
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <Badge className="mb-3 bg-purple-600 text-white">
                      {selectedShowcase.category}
                    </Badge>
                    <h2 className="text-3xl font-bold text-white mb-2">
                      {selectedShowcase.title}
                    </h2>
                    <p className="text-purple-400 text-lg font-medium">
                      {selectedShowcase.subtitle}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => setSelectedItem(null)}
                    className="text-slate-400 hover:text-white"
                  >
                    Close
                  </Button>
                </div>

                <p className="text-slate-300 text-lg leading-relaxed mb-6">
                  {selectedShowcase.description}
                </p>

                <div className="bg-slate-950/50 rounded-xl p-6 border border-slate-800">
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                    Key Features
                  </h3>
                  <ul className="space-y-3">
                    {selectedShowcase.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-slate-300">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* CTA Section */}
        <section className="px-6 py-20 border-t border-slate-800">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              See the War Room in Action
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Schedule a personalized demo to explore these capabilities with your own data
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-purple-600 hover:bg-purple-700 text-white px-8"
              >
                Request Demo
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                View Documentation
              </Button>
            </div>
          </div>
        </section>

        <SiteFooter />
      </div>
    </>
  );
}