import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const demos = [
  {
    id: "01",
    title: "Executive Command Center",
    description: "Real-time executive dashboard with AI-powered insights, KPI tracking, and strategic decision support for CFOs and benefits leaders.",
    image: "/01_executive_command_center.png",
    tags: ["Executive Intelligence", "Real-Time Analytics", "Strategic Command"]
  },
  {
    id: "02",
    title: "PBM Transparency Dashboard",
    description: "Complete pharmacy benefit manager transparency with spread pricing detection, rebate tracking, and formulary optimization insights.",
    image: "/02_pbm_transparency_dashboard.png",
    tags: ["PBM Analytics", "Cost Transparency", "Rebate Intelligence"]
  },
  {
    id: "03",
    title: "Drug Cost Intelligence",
    description: "Advanced pharmaceutical cost analysis with predictive modeling, alternative therapy recommendations, and specialty drug optimization.",
    image: "/03_drug_cost_intelligence.png",
    tags: ["Drug Analytics", "Cost Optimization", "Predictive Insights"]
  },
  {
    id: "04",
    title: "Actuarial Risk Simulation",
    description: "Monte Carlo simulations, loss ratio predictions, and sophisticated actuarial modeling for self-funded plan risk management.",
    image: "/04_actuarial_risk_simulation.png",
    tags: ["Risk Modeling", "Actuarial Science", "Predictive Analytics"]
  },
  {
    id: "05",
    title: "Stop Loss Optimization",
    description: "Intelligent stop loss recommendations with attachment point analysis, carrier comparison, and risk transfer optimization.",
    image: "/05_stop_loss_optimization.png",
    tags: ["Risk Management", "Insurance Optimization", "Financial Protection"]
  },
  {
    id: "06",
    title: "Evidence Lineage Explorer",
    description: "Complete audit trail and evidence chain-of-custody with cryptographic verification and regulatory compliance tracking.",
    image: "/06_evidence_lineage_explorer.png",
    tags: ["Audit Trail", "Compliance", "Evidence Management"]
  },
  {
    id: "07",
    title: "Governance Ledger",
    description: "Immutable verified savings ledger with fiduciary governance, ERISA compliance, and stakeholder accountability tracking.",
    image: "/07_governance_ledger.png",
    tags: ["Fiduciary Governance", "ERISA Compliance", "Financial Integrity"]
  },
  {
    id: "08",
    title: "Copilot Strategy",
    description: "AI-powered strategic advisor with McKinsey and Bain frameworks, automated recommendations, and decision intelligence.",
    image: "/08_copilot_strategy.png",
    tags: ["AI Strategy", "Decision Support", "Executive Guidance"]
  },
  {
    id: "09",
    title: "Contract Leakage Detection",
    description: "Automated contract compliance monitoring with leakage detection, vendor performance scoring, and savings recovery.",
    image: "/09_contract_leakage.png",
    tags: ["Contract Intelligence", "Leakage Detection", "Vendor Management"]
  }
];

export default function PlatformDemo() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const currentDemo = demos[currentIndex];

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? demos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === demos.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <>
      <SEO
        title="Platform Demo - SiriusB iQ"
        description="Explore the complete SiriusB iQ platform with interactive demos of our executive command center, analytics dashboards, and AI-powered insights."
        image="/01_executive_command_center.png"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-purple-950/20 to-zinc-950">
        <Nav />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
                Platform Demo
              </h1>
              <p className="text-xl md:text-2xl text-zinc-300 max-w-3xl mx-auto mb-4">
                Experience the complete SiriusB iQ platform
              </p>
              <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                Navigate through our suite of AI-powered tools designed for CFOs, benefits leaders, and executive teams
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Demo Viewer */}
        <section className="pb-32 px-4">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.4 }}
                className="relative"
              >
                {/* Demo Card */}
                <div className="bg-zinc-900/50 backdrop-blur-md border border-purple-500/20 rounded-2xl overflow-hidden shadow-2xl">
                  {/* Demo Header */}
                  <div className="p-6 md:p-8 border-b border-purple-500/20">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="text-sm text-purple-400 font-mono mb-2">
                          {currentDemo.id} / {demos.length.toString().padStart(2, "0")}
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                          {currentDemo.title}
                        </h2>
                        <p className="text-lg text-zinc-300 max-w-3xl">
                          {currentDemo.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {currentDemo.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-sm bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Demo Image */}
                  <div className="relative group cursor-pointer" onClick={() => setLightboxOpen(true)}>
                    <img
                      src={currentDemo.image}
                      alt={currentDemo.title}
                      className="w-full h-auto"
                    />
                    {/* Expand Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <motion.div
                        initial={{ scale: 0.8 }}
                        whileHover={{ scale: 1 }}
                        className="p-4 bg-purple-500/20 backdrop-blur-sm rounded-full border border-purple-500/30"
                      >
                        <Maximize2 className="w-8 h-8 text-white" />
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Navigation Controls */}
                <div className="flex items-center justify-between mt-8">
                  {/* Previous Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePrevious}
                    className="flex items-center gap-2 px-6 py-3 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 rounded-lg text-white transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    <span className="hidden md:inline">Previous</span>
                  </motion.button>

                  {/* Dot Navigation */}
                  <div className="flex items-center gap-2">
                    {demos.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => handleDotClick(index)}
                        className={`transition-all duration-300 ${
                          index === currentIndex
                            ? "w-8 h-3 bg-purple-500"
                            : "w-3 h-3 bg-zinc-600 hover:bg-zinc-500"
                        } rounded-full`}
                        aria-label={`Go to demo ${index + 1}`}
                      />
                    ))}
                  </div>

                  {/* Next Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNext}
                    className="flex items-center gap-2 px-6 py-3 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 rounded-lg text-white transition-colors"
                  >
                    <span className="hidden md:inline">Next</span>
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Keyboard Hint */}
                <div className="text-center mt-6 text-sm text-zinc-500">
                  Use arrow keys to navigate • Click image to expand
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* CTA Section */}
        <section className="pb-32 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-purple-500/10 to-fuchsia-500/10 border border-purple-500/20 rounded-2xl p-8 md:p-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to See It in Action?
              </h2>
              <p className="text-lg text-zinc-300 mb-8">
                Schedule a personalized demo with our team to explore how SiriusB iQ can transform your benefits operations
              </p>
              <motion.a
                href="/request-demo"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-purple-600 hover:to-fuchsia-600 text-white font-semibold rounded-lg transition-all"
              >
                Request Your Demo
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxOpen(false)}
              className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            >
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => setLightboxOpen(false)}
                className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </motion.button>
              
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="max-w-7xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={currentDemo.image}
                  alt={currentDemo.title}
                  className="w-full h-auto rounded-lg shadow-2xl"
                />
                <div className="mt-4 text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {currentDemo.title}
                  </h3>
                  <p className="text-zinc-300">
                    {currentDemo.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <Footer />
      </div>
    </>
  );
}