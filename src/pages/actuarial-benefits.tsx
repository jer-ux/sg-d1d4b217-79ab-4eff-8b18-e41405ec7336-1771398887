import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Shield, TrendingUp, Heart, BarChart3, Users, FileText, DollarSign, Layers, PieChart, Activity, CheckCircle2, Sparkles, ArrowRight, Zap, Target, Briefcase, Award, Crown, AlertCircle, CheckCircle, ChevronRight, X, TrendingDown, Users2, Building2, LineChart, DollarSign as DollarSignIcon, Brain, Database, Globe } from "lucide-react";
import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useState } from "react";
import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

// Dynamic imports for 3D components
const Interactive3DCard = dynamic(() => import("@/components/premium/Interactive3DCard").then(mod => mod.Interactive3DCard), { ssr: false });
const VegasParticles = dynamic(() => import("@/components/premium/VegasParticles").then(mod => mod.VegasParticles), { ssr: false });
const NeonGlow = dynamic(() => import("@/components/premium/NeonGlow").then(mod => mod.NeonGlow), { ssr: false });
const DataFlowVisualization = dynamic(() => import("@/components/platform/PremiumGraphics").then(mod => mod.DataFlowVisualization), { ssr: false });
const KPIDashboardPreview = dynamic(() => import("@/components/platform/PremiumGraphics").then(mod => mod.KPIDashboardPreview), { ssr: false });
const NetworkGraphAnimation = dynamic(() => import("@/components/platform/PremiumGraphics").then(mod => mod.NetworkGraphAnimation), { ssr: false });

// 3D Solution Card Component with Vegas aesthetic
function SolutionCard3D({ solution, index }: { solution: any; index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-100, 100], [10, -10]);
  const rotateY = useTransform(mouseX, [-100, 100], [-10, 10]);

  function handleMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  const Icon = solution.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      style={{ perspective: 1000 }}
      className="h-full"
    >
      <motion.button
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.05 }}
        onClick={() => {
          const event = new CustomEvent('openSolutionModal', { detail: solution });
          window.dispatchEvent(event);
        }}
        className="relative h-full p-8 rounded-2xl cursor-pointer group w-full text-left"
      >
        {/* Vegas glow border - amber/gold */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500/30 to-yellow-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
        
        {/* Card background */}
        <div className="relative h-full bg-black/90 backdrop-blur-xl rounded-2xl border border-amber-900/30 group-hover:border-amber-500/50 transition-all duration-500 overflow-hidden">
          {/* Animated gradient background */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-20"
            animate={{
              background: [
                "radial-gradient(circle at 0% 0%, #f59e0b 0%, transparent 50%)",
                "radial-gradient(circle at 100% 100%, #d97706 0%, transparent 50%)",
                "radial-gradient(circle at 0% 100%, #f59e0b 0%, transparent 50%)",
                "radial-gradient(circle at 100% 0%, #d97706 0%, transparent 50%)",
                "radial-gradient(circle at 0% 0%, #f59e0b 0%, transparent 50%)",
              ],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />

          {/* Content */}
          <div className="relative h-full p-8 flex flex-col" style={{ transform: "translateZ(50px)" }}>
            {/* Icon */}
            <motion.div
              className="mb-6"
              whileHover={{ rotate: 360, scale: 1.2 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative inline-block">
                <div className="absolute inset-0 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-amber-500/50 to-yellow-600/50" />
                <div className="relative p-4 rounded-2xl bg-amber-950/50 backdrop-blur-sm border border-amber-800/30">
                  <Icon className="w-8 h-8 text-amber-500" style={{
                    filter: "drop-shadow(0 0 8px #f59e0b)",
                  }} />
                </div>
              </div>
            </motion.div>

            {/* Title */}
            <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-amber-100 transition-all duration-300">
              {solution.title}
            </h3>

            {/* Description */}
            <p className="text-gray-400 mb-6 flex-grow group-hover:text-gray-300 transition-colors">
              {solution.description}
            </p>

            {/* Metrics */}
            <div className="space-y-3 mb-6">
              {solution.metrics.map((metric: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="flex items-center gap-3 text-sm"
                >
                  <div className="w-2 h-2 rounded-full bg-amber-500" style={{
                    boxShadow: "0 0 10px #f59e0b",
                  }} />
                  <span className="text-gray-300">{metric}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              className="flex items-center gap-2 text-sm font-semibold text-amber-500 group-hover:gap-4 transition-all"
            >
              Explore Solution
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </div>
        </div>
      </motion.button>
    </motion.div>
  );
}

// Feature Detail Modal with 3-level drill-down
function FeatureDetailModal({ feature, onClose }: { feature: any; onClose: () => void }) {
  const [drillLevel, setDrillLevel] = useState(1);
  const [selectedMetric, setSelectedMetric] = useState<any>(null);
  const [selectedCase, setSelectedCase] = useState<any>(null);

  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-zinc-950 via-amber-950/20 to-zinc-900 rounded-3xl border border-amber-500/30 shadow-2xl"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-zinc-950 to-amber-950/30 border-b border-amber-500/20 p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-500/30">
                <Icon className="w-8 h-8 text-amber-400" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">{feature.title}</h2>
                <p className="text-amber-400/70 text-sm mt-1">McKinsey-grade strategic analysis</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-white/10 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mt-4 text-sm text-amber-400/70">
            <button
              onClick={() => { setDrillLevel(1); setSelectedMetric(null); setSelectedCase(null); }}
              className={`hover:text-amber-400 transition-colors ${drillLevel === 1 ? "text-amber-400 font-semibold" : ""}`}
            >
              Strategic Overview
            </button>
            {drillLevel >= 2 && (
              <>
                <ChevronRight className="w-4 h-4" />
                <button
                  onClick={() => { setDrillLevel(2); setSelectedCase(null); }}
                  className={`hover:text-amber-400 transition-colors ${drillLevel === 2 ? "text-amber-400 font-semibold" : ""}`}
                >
                  {selectedMetric?.title || "Performance Metrics"}
                </button>
              </>
            )}
            {drillLevel >= 3 && (
              <>
                <ChevronRight className="w-4 h-4" />
                <span className="text-amber-400 font-semibold">Case Study Details</span>
              </>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <AnimatePresence mode="wait">
            {drillLevel === 1 && (
              <motion.div
                key="level1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                {/* Strategic Overview */}
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">Strategic Framework</h3>
                    <p className="text-gray-300 leading-relaxed mb-6">{feature.detailedDescription}</p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      {feature.strategicPillars.map((pillar: any, idx: number) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="p-6 rounded-xl bg-black/50 border border-amber-500/20"
                        >
                          <h4 className="text-lg font-bold text-amber-400 mb-2">{pillar.title}</h4>
                          <p className="text-gray-400 text-sm">{pillar.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Bain/McKinsey Framework Reference */}
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-950/30 to-purple-950/30 border border-blue-500/30">
                    <div className="flex items-start gap-4">
                      <Brain className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="text-lg font-bold text-blue-300 mb-2">Methodology Alignment</h4>
                        <p className="text-gray-300 text-sm mb-3">{feature.mcKinseyAlignment}</p>
                        <div className="inline-block px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs">
                          Based on {feature.consultingFramework}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Performance Metrics - Clickable */}
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">Key Performance Metrics</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      {feature.metrics.map((metric: any, idx: number) => (
                        <motion.button
                          key={idx}
                          onClick={() => { setSelectedMetric(metric); setDrillLevel(2); }}
                          whileHover={{ scale: 1.05, y: -5 }}
                          className="p-6 rounded-xl bg-gradient-to-br from-amber-950/40 to-zinc-900/60 border border-amber-500/30 hover:border-amber-400/60 transition-all text-left group"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <metric.icon className="w-8 h-8 text-amber-400" />
                            <ChevronRight className="w-5 h-5 text-amber-400/50 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                          </div>
                          <div className="text-3xl font-bold text-white mb-2">{metric.value}</div>
                          <div className="text-sm text-gray-400">{metric.title}</div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {drillLevel === 2 && selectedMetric && (
              <motion.div
                key="level2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                {/* Metric Deep Dive */}
                <div className="space-y-8">
                  <div className="flex items-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-amber-950/40 to-zinc-900/60 border border-amber-500/30">
                    <selectedMetric.icon className="w-12 h-12 text-amber-400" />
                    <div className="flex-1">
                      <div className="text-4xl font-bold text-white mb-1">{selectedMetric.value}</div>
                      <div className="text-lg text-amber-400">{selectedMetric.title}</div>
                    </div>
                  </div>

                  {/* Detailed Analysis */}
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">Detailed Analysis</h3>
                    <div className="space-y-4">
                      {selectedMetric.analysis.map((item: string, idx: number) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-start gap-3 p-4 rounded-xl bg-black/50 border border-amber-500/20"
                        >
                          <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <p className="text-gray-300">{item}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Industry Benchmarks */}
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-950/30 to-blue-950/30 border border-purple-500/30">
                    <h4 className="text-xl font-bold text-purple-300 mb-4 flex items-center gap-2">
                      <LineChart className="w-5 h-5" />
                      Industry Benchmarks (Bain & Company Research)
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {selectedMetric.benchmarks.map((benchmark: any, idx: number) => (
                        <div key={idx} className="flex justify-between items-center p-3 rounded-lg bg-black/30">
                          <span className="text-gray-400 text-sm">{benchmark.label}</span>
                          <span className="text-purple-300 font-semibold">{benchmark.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Case Studies - Clickable */}
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">Client Success Stories</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {selectedMetric.caseStudies.map((caseStudy: any, idx: number) => (
                        <motion.button
                          key={idx}
                          onClick={() => { setSelectedCase(caseStudy); setDrillLevel(3); }}
                          whileHover={{ scale: 1.03, y: -3 }}
                          className="p-6 rounded-xl bg-gradient-to-br from-zinc-900/80 to-amber-950/40 border border-amber-500/30 hover:border-amber-400/60 transition-all text-left group"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="text-lg font-bold text-white mb-1">{caseStudy.client}</div>
                              <div className="text-sm text-amber-400/70">{caseStudy.industry}</div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-amber-400/50 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                          </div>
                          <div className="text-2xl font-bold text-emerald-400 mb-2">{caseStudy.result}</div>
                          <p className="text-gray-400 text-sm">{caseStudy.summary}</p>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {drillLevel === 3 && selectedCase && (
              <motion.div
                key="level3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                {/* Case Study Deep Dive */}
                <div className="space-y-8">
                  <div className="p-8 rounded-2xl bg-gradient-to-br from-zinc-900/80 to-amber-950/40 border border-amber-500/40">
                    <div className="flex items-center gap-4 mb-6">
                      <Building2 className="w-10 h-10 text-amber-400" />
                      <div>
                        <h3 className="text-3xl font-bold text-white">{selectedCase.client}</h3>
                        <p className="text-amber-400/70">{selectedCase.industry}</p>
                      </div>
                    </div>
                    <div className="text-4xl font-bold text-emerald-400 mb-4">{selectedCase.result}</div>
                    <p className="text-gray-300 text-lg">{selectedCase.summary}</p>
                  </div>

                  {/* Challenge */}
                  <div>
                    <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-red-400" />
                      The Challenge
                    </h4>
                    <div className="p-6 rounded-xl bg-red-950/20 border border-red-500/30">
                      <p className="text-gray-300 leading-relaxed">{selectedCase.challenge}</p>
                    </div>
                  </div>

                  {/* Solution */}
                  <div>
                    <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-blue-400" />
                      Our Approach (McKinsey 7-S Framework Adapted)
                    </h4>
                    <div className="space-y-3">
                      {selectedCase.solution.map((step: string, idx: number) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-start gap-3 p-4 rounded-xl bg-blue-950/20 border border-blue-500/30"
                        >
                          <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center flex-shrink-0">
                            <span className="text-blue-300 font-bold text-sm">{idx + 1}</span>
                          </div>
                          <p className="text-gray-300 pt-1">{step}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Results */}
                  <div>
                    <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-emerald-400" />
                      Quantified Impact
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {selectedCase.impact.map((impact: any, idx: number) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="p-6 rounded-xl bg-emerald-950/20 border border-emerald-500/30"
                        >
                          <div className="text-3xl font-bold text-emerald-400 mb-2">{impact.value}</div>
                          <div className="text-gray-300">{impact.metric}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-950/30 to-blue-950/30 border border-purple-500/30">
                    <h4 className="text-xl font-bold text-purple-300 mb-4">Implementation Timeline</h4>
                    <div className="space-y-3">
                      {selectedCase.timeline.map((phase: any, idx: number) => (
                        <div key={idx} className="flex items-center gap-4">
                          <div className="w-24 text-purple-300 font-semibold text-sm">{phase.period}</div>
                          <div className="flex-1 p-3 rounded-lg bg-black/30">
                            <p className="text-gray-300 text-sm">{phase.milestone}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Testimonial */}
                  <div className="p-8 rounded-2xl bg-gradient-to-br from-amber-950/40 to-zinc-900/60 border border-amber-500/30">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
                        <Users2 className="w-8 h-8 text-amber-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-300 italic text-lg mb-4">"{selectedCase.testimonial}"</p>
                        <div className="text-amber-400 font-semibold">{selectedCase.testimonialAuthor}</div>
                        <div className="text-amber-400/60 text-sm">{selectedCase.testimonialRole}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* CTA at bottom of each level */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-amber-600/20 via-yellow-600/20 to-amber-600/20 border border-amber-500/40"
          >
            <div className="text-center">
              <h4 className="text-2xl font-bold text-white mb-3">Ready to Achieve Similar Results?</h4>
              <p className="text-gray-300 mb-6">Schedule a consultation with our actuarial experts</p>
              <Link href="/request-demo">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-amber-600 to-yellow-600 rounded-xl text-white font-bold text-lg flex items-center gap-3 mx-auto shadow-xl"
                >
                  <Sparkles className="w-5 h-5" />
                  Get Your Free Strategic Assessment
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Solution Detail Modal Component
function SolutionDetailModal({ solution, onClose }: { solution: any; onClose: () => void }) {
  const [selectedCapability, setSelectedCapability] = useState<any>(null);
  const Icon = solution.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-zinc-950 via-amber-950/20 to-zinc-900 rounded-3xl border border-amber-500/30 shadow-2xl"
      >
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-zinc-950 to-amber-950/30 border-b border-amber-500/20 p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-500/30">
                <Icon className="w-8 h-8 text-amber-400" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">{solution.title}</h2>
                <p className="text-amber-400/70 text-sm mt-1">{solution.description}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-white/10 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Breadcrumb */}
          {selectedCapability && (
            <div className="flex items-center gap-2 mt-4 text-sm text-amber-400/70">
              <button
                onClick={() => setSelectedCapability(null)}
                className="hover:text-amber-400 transition-colors"
              >
                Core Capabilities
              </button>
              <ChevronRight className="w-4 h-4" />
              <span className="text-amber-400 font-semibold">{selectedCapability.title}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-8">
          <AnimatePresence mode="wait">
            {!selectedCapability ? (
              <motion.div
                key="capabilities-grid"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                {/* Metrics Overview */}
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  {solution.metrics.map((metric: string, idx: number) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-gradient-to-br from-amber-950/40 to-zinc-900/60 border border-amber-500/30 text-center"
                    >
                      <div className="text-2xl font-bold text-amber-400">{metric}</div>
                    </div>
                  ))}
                </div>

                {/* Core Capabilities - Clickable */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">Core Capabilities</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {solution.capabilities.map((capability: any, idx: number) => (
                      <motion.button
                        key={idx}
                        onClick={() => setSelectedCapability(capability)}
                        whileHover={{ scale: 1.03, y: -5 }}
                        className="p-6 rounded-xl bg-gradient-to-br from-zinc-900/80 to-amber-950/40 border border-amber-500/30 hover:border-amber-400/60 transition-all text-left group"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <h4 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                            {capability.title}
                          </h4>
                          <ChevronRight className="w-6 h-6 text-amber-400/50 group-hover:text-amber-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          {capability.description}
                        </p>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="capability-detail"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                {/* Capability Details */}
                <div className="space-y-8">
                  {/* Overview */}
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">{selectedCapability.title}</h3>
                    <p className="text-gray-300 text-lg leading-relaxed">{selectedCapability.description}</p>
                  </div>

                  {/* Key Features */}
                  <div>
                    <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                      Key Features
                    </h4>
                    <div className="space-y-3">
                      {selectedCapability.features.map((feature: string, idx: number) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-start gap-3 p-4 rounded-xl bg-black/50 border border-amber-500/20"
                        >
                          <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <p className="text-gray-300">{feature}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Technical Details */}
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-950/30 to-purple-950/30 border border-blue-500/30">
                    <h4 className="text-xl font-bold text-blue-300 mb-4 flex items-center gap-2">
                      <Database className="w-5 h-5" />
                      Technical Implementation
                    </h4>
                    <ul className="space-y-2">
                      {selectedCapability.technicalDetails.map((detail: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3 text-gray-300">
                          <span className="text-blue-400 mt-1">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Business Impact */}
                  <div>
                    <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <Target className="w-5 h-5 text-amber-400" />
                      Business Impact
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {selectedCapability.businessImpact.map((impact: string, idx: number) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="p-4 rounded-xl bg-gradient-to-br from-emerald-950/20 to-green-950/20 border border-emerald-500/30"
                        >
                          <div className="flex items-start gap-3">
                            <Target className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                            <p className="text-gray-300 text-sm">{impact}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Start Now CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-amber-600/20 via-yellow-600/20 to-amber-600/20 border border-amber-500/40"
                  >
                    <div className="text-center">
                      <h4 className="text-2xl font-bold text-white mb-3">Ready to Get Started?</h4>
                      <p className="text-gray-300 mb-6">Schedule a personalized demo of {selectedCapability.title}</p>
                      <Link href="/request-demo">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-8 py-4 bg-gradient-to-r from-amber-600 to-yellow-600 rounded-xl text-white font-bold text-lg flex items-center gap-3 mx-auto shadow-xl"
                        >
                          <Sparkles className="w-5 h-5" />
                          Start Now - Request Demo
                          <ArrowRight className="w-5 h-5" />
                        </motion.button>
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ActuarialBenefits() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [selectedFeature, setSelectedFeature] = useState<any>(null);
  const [selectedSolution, setSelectedSolution] = useState<any>(null);

  // Add event listener for solution modal
  React.useEffect(() => {
    const handleOpenSolutionModal = (e: any) => {
      setSelectedSolution(e.detail);
    };
    window.addEventListener('openSolutionModal', handleOpenSolutionModal);
    return () => window.removeEventListener('openSolutionModal', handleOpenSolutionModal);
  }, []);

  const solutions = [
    {
      icon: Shield,
      title: "Risk Assessment",
      description: "Advanced predictive modeling for comprehensive risk evaluation and loss prevention across all benefit plans.",
      metrics: ["99.2% Accuracy", "$8.4M Loss Prevention", "Real-time Monitoring"],
      href: "/solutions/risk-assessment",
      capabilities: [
        {
          title: "Predictive Risk Modeling",
          description: "AI-powered algorithms analyze historical claims data, demographic trends, and market conditions to forecast future risk exposure with exceptional accuracy.",
          features: [
            "Machine learning models trained on 15+ years of claims data across 500+ portfolios",
            "Real-time risk scoring for individual members and cohorts",
            "Automated risk stratification identifying high-cost claimants before they occur",
            "Integration with clinical data, pharmacy claims, and social determinants of health"
          ],
          technicalDetails: [
            "Gradient boosting and neural network ensemble methods",
            "240+ risk factors including medical history, demographics, and behavioral indicators",
            "Weekly model recalibration using streaming data pipelines",
            "Explainable AI providing transparent rationale for all risk predictions"
          ],
          businessImpact: [
            "Reduce adverse selection by 34% through precision underwriting",
            "Lower reserve requirements by $4.2M through accurate loss forecasting",
            "Improve care coordination effectiveness by 47% via targeted interventions",
            "Achieve 99.2% predictive accuracy vs. industry average of 87.4%"
          ]
        },
        {
          title: "Portfolio Risk Analysis",
          description: "Comprehensive evaluation of risk distribution across your entire member population, identifying concentration areas and opportunities for mitigation.",
          features: [
            "Multi-dimensional risk segmentation by age, geography, industry, and plan design",
            "Concentration risk heat maps showing exposure to catastrophic claims",
            "Comparative risk benchmarking against industry peers and similar portfolios",
            "Scenario analysis modeling impact of different risk mitigation strategies"
          ],
          technicalDetails: [
            "Monte Carlo simulation with 10,000+ iterations for stress testing",
            "Value-at-Risk (VaR) and Conditional Value-at-Risk (CVaR) calculations",
            "Correlation analysis identifying interdependent risk factors",
            "Dynamic risk dashboards with drill-down to individual member level"
          ],
          businessImpact: [
            "Identify $12.4M in avoidable concentration risk through portfolio rebalancing",
            "Optimize reinsurance strategy saving $3.8M in premium costs",
            "Improve risk-adjusted pricing accuracy by 23 percentage points",
            "Enable proactive intervention for 2,400 high-risk members (1.9% of population)"
          ]
        },
        {
          title: "Dynamic Risk Scoring",
          description: "Continuous risk assessment that updates in real-time as new claims data, life events, and health information become available.",
          features: [
            "Event-driven architecture processing 240,000 claims daily with <50ms latency",
            "Automated risk score updates triggered by claims, lab results, and pharmacy fills",
            "Predictive alerts for members trending toward high-risk status",
            "Integration with care management platforms for immediate intervention"
          ],
          technicalDetails: [
            "Streaming analytics using Apache Kafka and Flink for real-time processing",
            "Time-series analysis tracking risk trajectory over 6-24 month windows",
            "Natural language processing extracting risk indicators from clinical notes",
            "API-first design enabling integration with EHR, HIE, and care coordination systems"
          ],
          businessImpact: [
            "Reduce time-to-intervention from 90 days to <7 days for emerging high-risk cases",
            "Prevent $8.4M in avoidable ER visits and inpatient admissions through early outreach",
            "Improve care coordinator productivity by 63% through automated case identification",
            "Achieve 94% accuracy in predicting high-cost claimants 6-9 months in advance"
          ]
        },
        {
          title: "Scenario Testing & Stress Analysis",
          description: "Sophisticated modeling tools to evaluate how your portfolio would perform under various adverse scenarios and economic conditions.",
          features: [
            "What-if analysis for plan design changes, network modifications, and pricing strategies",
            "Pandemic/catastrophic event modeling using historical data and epidemiological projections",
            "Economic downturn scenarios assessing impact on utilization and premium revenue",
            "Regulatory change simulations (e.g., ACA modifications, state mandate expansions)"
          ],
          technicalDetails: [
            "Stochastic modeling with customizable probability distributions and correlation structures",
            "Sensitivity analysis identifying key drivers of financial outcomes",
            "Tail risk analysis focusing on 95th-99th percentile scenarios",
            "Backtesting framework validating model accuracy against historical events"
          ],
          businessImpact: [
            "Quantify financial impact of 40+ different adverse scenarios before they occur",
            "Optimize reserve levels saving $7.8M while maintaining 99.7% confidence level",
            "Improve board-level risk reporting with clear, quantified scenario outcomes",
            "Enable data-driven decision making for plan design and pricing strategy"
          ]
        }
      ]
    },
    {
      icon: TrendingUp,
      title: "Premium Calculation",
      description: "Intelligent pricing algorithms that optimize revenue while maintaining competitive rates and regulatory compliance.",
      metrics: ["98.7% Pricing Accuracy", "$6.2M Revenue Optimization", "Dynamic Rate Adjustments"],
      href: "/solutions/premium-calculation",
      capabilities: [
        {
          title: "AI-Powered Pricing Engine",
          description: "Machine learning algorithms that analyze market dynamics, risk profiles, and competitive positioning to determine optimal premium rates.",
          features: [
            "Automated rate calculations incorporating claims experience, trend factors, and risk adjustments",
            "Competitive intelligence integration tracking competitor pricing in real-time",
            "Price elasticity modeling to maximize revenue while maintaining competitive position",
            "Multi-tiered rating structures for employer groups, individuals, and family coverage"
          ],
          technicalDetails: [
            "Regression analysis and gradient boosting for pricing optimization",
            "Integration with actuarial valuation systems and claims data warehouses",
            "Dynamic repricing capabilities with monthly or quarterly rate adjustments",
            "Compliance validation ensuring adherence to ACA, state rating rules, and MLR requirements"
          ],
          businessImpact: [
            "Achieve 98.7% pricing accuracy reducing underwriting losses by 67%",
            "Optimize revenue by $6.2M through precision pricing of 340+ employer groups",
            "Improve quote turnaround time from 3 weeks to 48 hours",
            "Reduce combined ratio from 107.3% to 93.8% through better pricing discipline"
          ]
        },
        {
          title: "Rate Development & Trend Analysis",
          description: "Sophisticated trend forecasting combining historical experience with predictive analytics to project future costs accurately.",
          features: [
            "Medical trend analysis separating utilization, unit cost, and mix effects",
            "Pharmacy trend modeling accounting for specialty drug pipeline and biosimilar adoption",
            "Credibility-weighted experience rating for groups with limited claims history",
            "Manual rate adjustments for large claims, demographic shifts, and plan design changes"
          ],
          technicalDetails: [
            "Time-series analysis using ARIMA, exponential smoothing, and machine learning",
            "Cohort analysis tracking aging and selection effects over time",
            "Seasonality adjustments accounting for month-to-month utilization patterns",
            "Projection methodologies validated by credentialed actuaries (FSA, MAAA)"
          ],
          businessImpact: [
            "Improve trend forecasting accuracy by 23 percentage points vs. traditional methods",
            "Reduce reserve volatility saving $3.4M in redundant capital requirements",
            "Enable quarterly rate adjustments vs. annual, improving responsiveness by 4x",
            "Support rate filings in 47 states with centralized actuarial team of 12 FSAs"
          ]
        },
        {
          title: "Competitive Market Analysis",
          description: "Real-time monitoring of competitor pricing, benefit designs, and market positioning to inform strategic pricing decisions.",
          features: [
            "Automated web scraping and API integration collecting competitor rate filings",
            "Benefit design comparison identifying value gaps and opportunities",
            "Market share analysis by geography, industry vertical, and group size",
            "Win/loss tracking correlating pricing competitiveness with sales outcomes"
          ],
          technicalDetails: [
            "Data aggregation from state DOI rate filings, carrier websites, and broker feeds",
            "Natural language processing extracting key terms from benefit summaries",
            "Competitive positioning algorithms recommending optimal price points",
            "Integration with CRM and quoting systems for real-time sales support"
          ],
          businessImpact: [
            "Increase quote win rate from 23% to 34% through competitive pricing intelligence",
            "Identify $4.7M in revenue opportunities from underpriced competitor segments",
            "Reduce quote rework by 58% through upfront competitive validation",
            "Enable dynamic pricing strategies responding to competitor moves in <24 hours"
          ]
        },
        {
          title: "Regulatory Compliance & Filing",
          description: "Automated compliance validation and rate filing preparation ensuring adherence to federal and state regulations.",
          features: [
            "ACA compliance validation including age curves, geographic rating, and tobacco factors",
            "State-specific rule engines covering 50+ jurisdictions with unique requirements",
            "Medical Loss Ratio (MLR) tracking and rebate calculations",
            "Actuarial memorandum generation with supporting documentation for rate filings"
          ],
          technicalDetails: [
            "Rules engine with 840+ regulatory requirements across federal and state laws",
            "Automated filing preparation in SERFF format for state submissions",
            "Version control and audit trails for all rate changes and assumptions",
            "Integration with state DOI portals for electronic filing submission"
          ],
          businessImpact: [
            "Achieve 100% compliance rate with zero regulatory findings in 4+ years",
            "Reduce filing preparation time from 8 weeks to 3 days through automation",
            "Avoid $2.8M in potential penalties through proactive compliance monitoring",
            "Support rate filings in 47 states with centralized actuarial team of 12 FSAs"
          ]
        }
      ]
    },
    {
      icon: Heart,
      title: "Health Benefits",
      description: "Comprehensive benefits administration platform with integrated wellness programs and member engagement tools.",
      metrics: ["96.8% Member Satisfaction", "$15.3M Cost Savings", "50+ Plan Options"],
      href: "/solutions/health-benefits",
      capabilities: [
        {
          title: "Benefits Administration Platform",
          description: "Unified platform managing enrollment, eligibility, premium billing, and member communications across medical, dental, vision, and ancillary benefits.",
          features: [
            "Self-service enrollment with decision support tools and plan comparison calculators",
            "Life event processing for qualifying changes (marriage, birth, adoption, divorce)",
            "COBRA administration including federal and state continuation coverage",
            "Digital ID card generation and mobile wallet integration"
          ],
          technicalDetails: [
            "API integrations with 340+ carriers and TPAs for real-time eligibility updates",
            "EDI 834 enrollment files with validation and error handling",
            "Premium reconciliation matching carrier invoices to enrollment records",
            "Document management for SPDs, benefit summaries, and member communications"
          ],
          businessImpact: [
            "Reduce enrollment errors by 94% through automated validation and reconciliation",
            "Save $2.4M annually in administrative costs vs. manual enrollment processes",
            "Improve open enrollment completion rate from 78% to 96%",
            "Enable 24/7 self-service access reducing HR call volume by 73%"
          ]
        },
        {
          title: "Wellness & Population Health",
          description: "Integrated wellness programs combining biometric screenings, health coaching, and incentive management to improve member health outcomes.",
          features: [
            "Biometric screening coordination with onsite, clinic, and home-based options",
            "Health risk assessment (HRA) with personalized action plans and goal setting",
            "Condition management programs for diabetes, hypertension, asthma, and obesity",
            "Incentive management tracking wellness participation and rewarding healthy behaviors"
          ],
          technicalDetails: [
            "Integration with wearables and health apps (Fitbit, Apple Health, MyFitnessPal)",
            "HIPAA-compliant data collection and storage with member consent management",
            "Predictive analytics identifying members most likely to benefit from interventions",
            "Reporting dashboards tracking engagement rates, biometric trends, and ROI"
          ],
          businessImpact: [
            "Achieve 68% wellness program participation vs. industry average of 34%",
            "Reduce diabetes-related medical costs by $4,200 per participant annually",
            "Improve employee productivity by 12% through reduced absenteeism and presenteeism",
            "Generate $3.80 in medical cost savings for every $1 invested in wellness programs"
          ]
        },
        {
          title: "Member Engagement & Communication",
          description: "Multi-channel communication platform delivering personalized benefits information, reminders, and educational content.",
          features: [
            "Mobile app with benefits information, claim status, provider search, and virtual ID cards",
            "Email and SMS campaigns for open enrollment, preventive care reminders, and wellness challenges",
            "Chatbot with natural language understanding answering 89% of benefits questions",
            "Personalized benefits recommendations based on life stage, health status, and utilization"
          ],
          technicalDetails: [
            "Omnichannel communication orchestration with preference management",
            "A/B testing framework optimizing message content, timing, and delivery channel",
            "Integration with CRM and marketing automation platforms (Salesforce, Marketo)",
            "Analytics tracking engagement metrics, conversion rates, and member satisfaction"
          ],
          businessImpact: [
            "Increase member engagement scores by 47 percentage points",
            "Reduce benefits-related inquiries to HR by 61% through self-service tools",
            "Improve preventive care compliance (flu shots, mammograms, colonoscopies) by 34%",
            "Achieve 94.7% mobile app adoption vs. industry average of 42%"
          ]
        },
        {
          title: "Plan Design & Modeling",
          description: "Data-driven tools to design, model, and optimize benefit plans balancing cost, coverage, and member satisfaction.",
          features: [
            "Plan comparison modeling showing cost impact of different deductibles, copays, and coinsurance",
            "Consumer-directed health account (CDHA) integration for HSAs, FSAs, and HRAs",
            "Value-based insurance design (VBID) identifying high-value services for $0 copay",
            "Benefit benchmarking comparing plan richness to industry peers and competitors"
          ],
          technicalDetails: [
            "Actuarial modeling using claims data to project costs under various plan designs",
            "Sensitivity analysis identifying cost drivers and optimization opportunities",
            "Tax advantage calculations showing savings from pre-tax premium and account contributions",
            "Compliance validation ensuring plans meet ACA minimum value and affordability standards"
          ],
          businessImpact: [
            "Reduce total health benefit costs by 14.2% through optimized plan design",
            "Increase HDHP/HSA adoption from 23% to 58% saving $6.8M in employer contributions",
            "Improve member satisfaction by 18 percentage points despite higher cost-sharing",
            "Design 35+ custom plan options tailored to diverse workforce needs"
          ]
        }
      ]
    },
    {
      icon: BarChart3,
      title: "Claims Analytics",
      description: "Real-time claims processing with AI-powered fraud detection and automated adjudication workflows.",
      metrics: ["97.4% Accuracy", "24hr Processing Time", "$4.2M Fraud Prevention"],
      href: "/solutions/claims-analytics",
      capabilities: [
        {
          title: "Real-Time Claims Processing",
          description: "Lightning-fast claims adjudication with automated decision-making for clean claims and intelligent routing of exceptions.",
          features: [
            "EDI 837 claim ingestion with real-time validation and auto-adjudication",
            "Eligibility verification against current enrollment and coverage effective dates",
            "Benefit determination applying plan rules, copays, deductibles, and out-of-pocket maximums",
            "Provider network validation and fee schedule application for in-network vs. out-of-network"
          ],
          technicalDetails: [
            "Event-driven architecture processing 240,000 claims daily with 47ms average latency",
            "Machine learning auto-adjudication handling 73% of claims with zero human intervention",
            "Exception routing to specialized adjudicators based on claim type and complexity",
            "Real-time EOB generation and member/provider notifications"
          ],
          businessImpact: [
            "Reduce claims processing time from 18 days to <24 hours (97% faster)",
            "Achieve 97.4% adjudication accuracy vs. industry average of 89.3%",
            "Lower administrative costs by $4.80 per claim through automation",
            "Improve member satisfaction by 23 percentage points through faster turnaround"
          ]
        },
        {
          title: "Fraud, Waste & Abuse Detection",
          description: "AI-powered anomaly detection identifying fraudulent, wasteful, and abusive claims patterns before payment.",
          features: [
            "Predictive models trained on 15M historical claims identifying suspicious patterns",
            "Provider profiling comparing practice patterns to peer benchmarks",
            "Member utilization analysis flagging unusual service frequency or provider shopping",
            "Coordination of benefits (COB) validation preventing duplicate payments"
          ],
          technicalDetails: [
            "Unsupervised learning algorithms detecting novel fraud schemes without labeled data",
            "Network analysis identifying collusion rings and billing schemes",
            "Real-time scoring of all claims with automated holds for high-risk transactions",
            "Integration with SIU (Special Investigations Unit) case management systems"
          ],
          businessImpact: [
            "Prevent $4.2M in fraudulent, wasteful, and abusive claims annually",
            "Achieve 89% fraud detection accuracy with only 2.4% false positive rate",
            "Recover $1.8M in overpayments through post-payment audits and subrogation",
            "Reduce claims leakage from 3.7% to 0.8% of total paid claims"
          ]
        },
        {
          title: "Utilization Management",
          description: "Comprehensive prior authorization, concurrent review, and retrospective review ensuring appropriate and cost-effective care.",
          features: [
            "Prior authorization automation for high-cost services (surgery, imaging, specialty drugs)",
            "Clinical guidelines engine applying evidence-based medical necessity criteria",
            "Concurrent review for inpatient stays with discharge planning and care coordination",
            "Retrospective review identifying overutilization and opportunities for provider education"
          ],
          technicalDetails: [
            "Integration with InterQual, MCG, and custom clinical guidelines",
            "HL7 and FHIR integration with provider EHR systems for seamless data exchange",
            "Nurse and physician review workflows with escalation and appeal processes",
            "Analytics identifying high-variation providers and opportunities for intervention"
          ],
          businessImpact: [
            "Reduce unnecessary utilization by 23% saving $8.7M annually",
            "Improve prior authorization turnaround from 72 hours to <4 hours (95% faster)",
            "Decrease inpatient length of stay by 1.4 days through concurrent review",
            "Achieve 94% provider satisfaction with streamlined UM processes"
          ]
        },
        {
          title: "Claims Analytics & Reporting",
          description: "Powerful analytics tools providing deep insights into claims patterns, cost drivers, and opportunities for intervention.",
          features: [
            "Interactive dashboards with drill-down from summary to individual claim detail",
            "Trend analysis identifying emerging cost drivers and utilization changes",
            "Provider profiling comparing quality, cost, and efficiency metrics",
            "Cohort analysis tracking specific populations (diabetics, oncology, maternity)"
          ],
          technicalDetails: [
            "OLAP cubes enabling sub-second query performance on 15M+ claim records",
            "Predictive analytics forecasting future claims costs and utilization trends",
            "Natural language query interface allowing non-technical users to explore data",
            "Automated reporting distribution with customizable schedules and recipients"
          ],
          businessImpact: [
            "Identify $12.4M in addressable cost opportunities through advanced analytics",
            "Reduce time spent on ad-hoc reporting from 40 hours/week to 4 hours/week",
            "Enable data-driven decision making for clinical programs and network strategy",
            "Improve executive visibility into claims performance with real-time KPIs"
          ]
        }
      ]
    },
    {
      icon: Users,
      title: "Member Management",
      description: "Unified member portal with self-service capabilities, digital ID cards, and personalized benefit recommendations.",
      metrics: ["98.3% Data Accuracy", "94.7% Portal Adoption", "500K+ Active Members"],
      href: "/solutions/member-management",
      capabilities: [
        {
          title: "Member Portal & Self-Service",
          description: "Comprehensive online portal providing 24/7 access to benefits information, claims status, and account management.",
          features: [
            "Digital ID cards with Apple Wallet and Google Pay integration",
            "Claims history with detailed EOBs and status tracking",
            "Provider search with quality ratings, cost estimates, and directions",
            "Account management for premium payments, address changes, and beneficiary updates"
          ],
          technicalDetails: [
            "Responsive web design and native iOS/Android mobile apps",
            "Single sign-on (SSO) integration with employer HRIS and identity providers",
            "Biometric authentication (Face ID, Touch ID) for enhanced security",
            "Offline mode allowing access to ID cards and key information without connectivity"
          ],
          businessImpact: [
            "Achieve 94.7% portal adoption vs. industry average of 42%",
            "Reduce call center volume by 73% through self-service transactions",
            "Save $2.40 per interaction vs. phone or email support",
            "Improve member satisfaction scores by 31 percentage points"
          ]
        },
        {
          title: "Personalized Member Experience",
          description: "AI-powered personalization delivering relevant benefits information, recommendations, and guidance based on individual circumstances.",
          features: [
            "Smart benefits recommendations based on life stage, health status, and utilization patterns",
            "Predictive care gap alerts for missed preventive screenings and chronic disease management",
            "Cost estimator showing out-of-pocket expenses before seeking care",
            "Personalized wellness programs with goals, challenges, and rewards tailored to individual needs"
          ],
          technicalDetails: [
            "Machine learning models analyzing 240+ member attributes to deliver relevant content",
            "Real-time personalization engine updating recommendations as new data becomes available",
            "A/B testing framework optimizing content, messaging, and user experience",
            "Privacy-first design with granular consent management and data access controls"
          ],
          businessImpact: [
            "Increase preventive care compliance by 34% through predictive outreach",
            "Reduce inappropriate ER utilization by 42% via cost transparency and alternatives",
            "Improve medication adherence by 28% through personalized reminders and education",
            "Generate $4.70 in medical cost savings for every $1 invested in personalized engagement"
          ]
        },
        {
          title: "Care Navigation & Advocacy",
          description: "Human-centered support helping members navigate complex healthcare system and resolve billing or coverage issues.",
          features: [
            "24/7 nurse line staffed by RNs providing clinical guidance and triage",
            "Care coordinators assisting with specialist referrals, second opinions, and treatment planning",
            "Billing advocates resolving claims disputes, balance billing, and payment plans",
            "Concierge services for high-touch members (executives, complex cases, maternity)"
          ],
          technicalDetails: [
            "Omnichannel support via phone, chat, email, and video conferencing",
            "CRM integration providing care advocates with complete member history and context",
            "Quality assurance monitoring with call recording, coaching, and performance metrics",
            "Escalation workflows ensuring complex cases receive appropriate expertise and follow-up"
          ],
          businessImpact: [
            "Achieve 96% member satisfaction with care navigation services",
            "Reduce cost of care by $8,400 per complex case through coordinated care management",
            "Resolve 89% of billing disputes on first contact without member escalation",
            "Generate $6.20 in value for every $1 spent on care navigation programs"
          ]
        },
        {
          title: "Member Data Management",
          description: "Single source of truth for member demographics, coverage, and interaction history enabling personalized service.",
          features: [
            "Master data management (MDM) reconciling data from multiple source systems",
            "Golden record creation with data quality validation and duplicate resolution",
            "Historical tracking of all coverage changes, life events, and service interactions",
            "Data governance ensuring accuracy, completeness, and regulatory compliance"
          ],
          technicalDetails: [
            "ETL pipelines integrating data from HRIS, payroll, carriers, and member portal",
            "Data quality rules validating 98.3% accuracy across 40+ critical data elements",
            "Change data capture (CDC) providing real-time updates as enrollment changes occur",
            "GDPR and CCPA compliance with member consent management and right-to-deletion"
          ],
          businessImpact: [
            "Achieve 98.3% data accuracy vs. industry average of 84.7%",
            "Reduce enrollment discrepancies by 94% through automated reconciliation",
            "Save $1.2M annually in avoided premium adjustments and retro terminations",
            "Enable 360-degree member view supporting 500K+ active members across 127 employer groups"
          ]
        }
      ]
    },
    {
      icon: FileText,
      title: "Policy Compliance",
      description: "Automated compliance monitoring across ERISA, ACA, HIPAA, and state regulations with audit trail management.",
      metrics: ["100% Compliance Rate", "99.8% Audit Score", "Zero Penalties"],
      href: "/solutions/policy-compliance",
      capabilities: [
        {
          title: "Regulatory Compliance Monitoring",
          description: "Continuous monitoring of federal and state regulations with automated compliance validation and alerting.",
          features: [
            "ERISA compliance for plan documents, SPDs, SMMs, and required disclosures",
            "ACA compliance including affordability, minimum value, and reporting (1094/1095)",
            "HIPAA privacy and security rules with risk assessments and breach notification",
            "State-specific mandates covering 50 jurisdictions with unique requirements"
          ],
          technicalDetails: [
            "Rules engine with 847 compliance requirements across federal and state laws",
            "Automated control testing with continuous monitoring and real-time dashboards",
            "Policy management system with version control and automated distribution",
            "Integration with legal research services (Westlaw, LexisNexis) for regulatory updates"
          ],
          businessImpact: [
            "Achieve 100% compliance rate with zero regulatory findings in 4+ years",
            "Reduce compliance team headcount by 67% through automation",
            "Avoid $2.8M in potential DOL, IRS, and HHS penalties",
            "Score 99.8% on external compliance audits vs. industry average of 87.3%"
          ]
        },
        {
          title: "Audit Trail & Documentation",
          description: "Comprehensive audit logging of all system actions, decisions, and data changes with tamper-evident storage.",
          features: [
            "Immutable audit logs with blockchain-based integrity verification",
            "User activity monitoring tracking all data access and modifications",
            "Decision rationale capture for automated processes (claims, underwriting, pricing)",
            "Document retention management ensuring compliance with 7-year ERISA requirements"
          ],
          technicalDetails: [
            "Write-once storage preventing audit log tampering or deletion",
            "Detailed logging of who, what, when, where for all transactions",
            "Advanced search and filtering for rapid audit response and investigation",
            "Integration with SIEM systems for security incident detection and response"
          ],
          businessImpact: [
            "Reduce audit preparation time from 8 weeks to 3 days",
            "Achieve 100% audit traceability for 15M+ transactions annually",
            "Support litigation and regulatory inquiries with complete documentation",
            "Pass all SOC 2, HIPAA, and state compliance audits with zero exceptions"
          ]
        },
        {
          title: "Plan Document Management",
          description: "Centralized repository for all plan documents with version control, electronic signatures, and distribution tracking.",
          features: [
            "Automated SPD generation from plan design parameters and carrier contracts",
            "Electronic signature workflows for enrollment forms, beneficiary designations, and consents",
            "Distribution tracking ensuring required notices reach members within mandated timeframes",
            "Multi-language support for Spanish, Mandarin, and other languages as required"
          ],
          technicalDetails: [
            "Template-based document generation with merge fields and conditional logic",
            "Integration with DocuSign, Adobe Sign for electronic signature workflows",
            "Delivery confirmation via email receipts, certified mail tracking, and portal acknowledgment",
            "Accessibility compliance ensuring ADA and Section 508 requirements are met"
          ],
          businessImpact: [
            "Reduce document preparation costs by $240,000 annually vs. manual processes",
            "Achieve 99.2% on-time delivery of required notices vs. 78% industry average",
            "Eliminate $840,000 in potential ERISA penalties for late or missing disclosures",
            "Improve member comprehension through simplified language and multi-format delivery"
          ]
        },
        {
          title: "Compliance Training & Certification",
          description: "Ongoing education programs ensuring staff understand regulatory requirements and maintain required certifications.",
          features: [
            "Role-based training curricula for benefits administration, privacy, and security",
            "Annual certification requirements with testing and performance tracking",
            "Just-in-time training modules triggered by regulatory changes or policy updates",
            "Vendor training ensuring TPAs, carriers, and brokers meet compliance standards"
          ],
          technicalDetails: [
            "Learning management system (LMS) with SCORM-compliant content",
            "Automated assignment, reminder, and escalation workflows",
            "Reporting dashboards tracking completion rates, test scores, and certification status",
            "Integration with HR systems for new hire onboarding and role changes"
          ],
          businessImpact: [
            "Achieve 100% compliance training completion vs. 67% industry average",
            "Reduce compliance-related errors by 84% through improved staff knowledge",
            "Support 2,400 employees across HR, benefits, and finance functions",
            "Demonstrate commitment to compliance culture during audits and examinations"
          ]
        }
      ]
    }
  ];

  return (
    <>
      <SEO
        title="Actuarial Employee Benefits Consulting | SiriusB iQ"
        description="Premium actuarial consulting services for employee benefits with AI-powered analytics, risk assessment, and compliance solutions."
      />
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* Animated Vegas Background - amber/gold theme */}
        <div className="fixed inset-0 pointer-events-none">
          {/* Amber/gold neon grid */}
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(245, 158, 11, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(245, 158, 11, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <Nav />

        <main className="relative z-10">
          {/* Hero Section */}
          <section className="relative py-20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-amber-900/20 to-indigo-900/20" />
            <div className="container relative z-10 mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-block px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6">
                    <span className="text-purple-300 font-semibold">Actuarial Intelligence Platform</span>
                  </div>
                  <h1 className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                    Transform Actuarial Benefits Management
                  </h1>
                  <p className="text-xl text-gray-300 mb-8">
                    Leverage AI-powered analytics to optimize plan design, manage risk, and ensure regulatory compliance across your entire benefits portfolio.
                  </p>
                </div>
                <div className="relative">
                  <div className="relative rounded-2xl overflow-hidden border border-purple-500/20 shadow-2xl">
                    <Image
                      src="/jeremiah-shrack-professional.png"
                      alt="Jeremiah Shrack - Founder & Chief Actuary"
                      width={600}
                      height={600}
                      className="w-full h-auto"
                      priority
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                      <h3 className="text-white text-xl font-bold">Jeremiah Shrack</h3>
                      <p className="text-gray-300">Founder</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 3D Data Visualization Section */}
          <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
                  Real-Time Intelligence at Your Fingertips
                </h2>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                  Experience the power of live data flows and predictive analytics
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-yellow-600/20 rounded-2xl blur-3xl" />
                  <div className="relative bg-black/50 backdrop-blur-xl rounded-2xl border border-amber-900/30 p-8">
                    <h3 className="text-2xl font-bold mb-4 text-amber-500">Live Data Pipeline</h3>
                    <p className="text-gray-300 mb-6">
                      Watch as claims, member data, and actuarial calculations flow through our AI-powered processing engine in real-time
                    </p>
                    <DataFlowVisualization />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-amber-600/20 rounded-2xl blur-3xl" />
                  <div className="relative bg-black/50 backdrop-blur-xl rounded-2xl border border-amber-900/30 p-8">
                    <h3 className="text-2xl font-bold mb-4 text-yellow-500">Executive KPI Dashboard</h3>
                    <p className="text-gray-400 mb-6">
                      Monitor critical metrics with instant updates and predictive trend analysis
                    </p>
                    <KPIDashboardPreview />
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-yellow-500/20 rounded-2xl blur-3xl" />
                <div className="relative bg-black/50 backdrop-blur-xl rounded-2xl border border-amber-900/30 p-8">
                  <h3 className="text-2xl font-bold mb-4 text-center text-amber-500">Integrated System Architecture</h3>
                  <p className="text-gray-400 mb-6 text-center max-w-2xl mx-auto">
                    See how all components of your benefits ecosystem connect and communicate seamlessly
                  </p>
                  <NetworkGraphAnimation />
                </div>
              </motion.div>
            </div>
          </section>

          {/* Features Section - Now Clickable */}
          <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent"
              >
                Why Leading Organizations Choose Us
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-center text-gray-400 mb-16 max-w-3xl mx-auto"
              >
                Click each capability to explore Bain/McKinsey-grade strategic analysis with detailed case studies
              </motion.p>

              <div className="grid md:grid-cols-2 gap-8">
                {solutions.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      onMouseEnter={() => setHoveredFeature(index)}
                      onMouseLeave={() => setHoveredFeature(null)}
                      onClick={() => setSelectedFeature(feature)}
                      className="relative group text-left w-full"
                      style={{ perspective: 1000 }}
                      whileHover={{ scale: 1.02, y: -5 }}
                    >
                      <motion.div
                        animate={{
                          rotateY: hoveredFeature === index ? 5 : 0,
                          rotateX: hoveredFeature === index ? -5 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                        style={{ transformStyle: "preserve-3d" }}
                        className="relative p-8 rounded-2xl bg-black/50 backdrop-blur-xl border border-amber-900/30 group-hover:border-amber-500/50 transition-all duration-500"
                      >
                        {/* Glow effect */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500/20 to-yellow-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

                        <div className="relative" style={{ transform: "translateZ(50px)" }}>
                          <div className="flex items-start justify-between mb-6">
                            <motion.div
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.6 }}
                              className="inline-block"
                            >
                              <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/20 to-yellow-600/20 border border-amber-500/30">
                                <Icon className="w-8 h-8 text-amber-500" style={{
                                  filter: "drop-shadow(0 0 8px #f59e0b)",
                                }} />
                              </div>
                            </motion.div>
                            <ChevronRight className="w-6 h-6 text-amber-400/50 group-hover:text-amber-400 group-hover:translate-x-2 transition-all" />
                          </div>

                          <h3 className="text-2xl font-bold mb-3 group-hover:text-amber-400 transition-colors">
                            {feature.title}
                          </h3>

                          <p className="text-gray-400 mb-4 group-hover:text-gray-300 transition-colors">
                            {feature.description}
                          </p>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {feature.metrics.slice(0, 2).map((metric: string, i: number) => (
                              <div key={i} className="inline-block px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30">
                                <span className="text-amber-400 font-semibold text-sm">{metric}</span>
                              </div>
                            ))}
                          </div>

                          <div className="mt-4 text-sm text-amber-400/70 flex items-center gap-2">
                            <span>Click to explore detailed analysis</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </motion.div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Solutions Grid */}
          <section id="solutions" className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <motion.h2
                  className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent"
                >
                  Comprehensive Solutions Suite
                </motion.h2>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                  12 integrated solutions designed to transform every aspect of your employee benefits operations
                </p>
              </motion.div>

              {/* Featured 3D Solution Cards */}
              <div className="grid md:grid-cols-3 gap-8 mb-16">
                <Interactive3DCard
                  title="Risk Assessment Engine"
                  description="AI-powered predictive modeling with 99.2% accuracy for comprehensive risk evaluation"
                  icon={Shield}
                  gradient="from-amber-500 to-yellow-600"
                  href="/solutions/risk-assessment"
                />
                <Interactive3DCard
                  title="Claims Analytics Platform"
                  description="Real-time processing with automated fraud detection and 24hr turnaround time"
                  icon={BarChart3}
                  gradient="from-yellow-500 to-amber-600"
                  href="/solutions/claims-analytics"
                />
                <Interactive3DCard
                  title="Premium Calculation AI"
                  description="Intelligent pricing algorithms achieving 98.7% accuracy and $6.2M revenue optimization"
                  icon={TrendingUp}
                  gradient="from-amber-600 to-yellow-500"
                  href="/solutions/premium-calculation"
                />
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {solutions.map((solution, index) => (
                  <SolutionCard3D key={index} solution={solution} index={index} />
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-32 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                {/* Animated border */}
                <motion.div
                  className="absolute -inset-1 rounded-3xl opacity-75 group-hover:opacity-100 blur-xl"
                  animate={{
                    background: [
                      "linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #eab308 100%)",
                      "linear-gradient(135deg, #eab308 0%, #f59e0b 50%, #d97706 100%)",
                      "linear-gradient(135deg, #d97706 0%, #eab308 50%, #f59e0b 100%)",
                      "linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #eab308 100%)",
                    ],
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                />

                <div className="relative bg-black/90 backdrop-blur-xl rounded-3xl p-12 border border-amber-900/30">
                  <Award className="w-16 h-16 mx-auto mb-6 text-amber-500" style={{
                    filter: "drop-shadow(0 0 20px #f59e0b)",
                  }} />

                  <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
                    Ready to Transform Your Benefits Operations?
                  </h2>

                  <p className="text-xl text-gray-300 mb-8">
                    Join 500+ leading organizations leveraging our premium actuarial solutions
                  </p>

                  <Link href="/request-demo">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-12 py-5 bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-600 rounded-full text-white font-bold text-2xl flex items-center gap-3 mx-auto shadow-2xl relative"
                      style={{
                        boxShadow: "0 0 40px rgba(245, 158, 11, 0.5)",
                      }}
                    >
                      <div className="absolute inset-0 bg-amber-500/30 blur-xl rounded-full" />
                      <Sparkles className="w-6 h-6 relative z-10" />
                      <span className="relative z-10">Schedule Premium Consultation</span>
                      <Sparkles className="w-6 h-6 relative z-10" />
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />

        {/* Feature Detail Modal */}
        <AnimatePresence>
          {selectedFeature && (
            <FeatureDetailModal
              feature={selectedFeature}
              onClose={() => setSelectedFeature(null)}
            />
          )}
        </AnimatePresence>

        {/* Solution Detail Modal */}
        <AnimatePresence>
          {selectedSolution && (
            <SolutionDetailModal
              solution={selectedSolution}
              onClose={() => setSelectedSolution(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
}