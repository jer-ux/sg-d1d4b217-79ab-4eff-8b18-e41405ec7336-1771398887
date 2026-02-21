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

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
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

  const features = [
    {
      icon: Shield,
      title: "Risk Assessment",
      description: "Advanced predictive modeling for comprehensive risk evaluation and loss prevention across all benefit plans.",
      stats: "99.2% Accuracy",
      detailedDescription: "AI-powered algorithms analyze historical claims data, demographic trends, and market conditions to forecast future risk exposure with exceptional accuracy.",
      mcKinseyAlignment: "Aligned with Bain's 'Net Promoter System' philosophy, our real-time capabilities enable closed-loop feedback and immediate service recovery. This drives both operational excellence and member loyalty through responsive, data-driven interactions.",
      consultingFramework: "Bain Net Promoter System & McKinsey Customer Decision Journey",
      strategicPillars: [
        {
          title: "Predictive Risk Modeling",
          description: "AI-powered algorithms analyze historical claims data, demographic trends, and market conditions to forecast future risk exposure with exceptional accuracy."
        },
        {
          title: "Risk Stratification",
          description: "Automated risk scoring identifies high-cost claimants before they occur, enabling precision underwriting and risk mitigation."
        },
        {
          title: "Clinical Integration",
          description: "Real-time risk dashboards integrate with clinical data, pharmacy claims, and social determinants of health to provide comprehensive risk assessment."
        },
        {
          title: "Operational Optimization",
          description: "Closed-loop feedback from predictive analytics enables real-time risk management and cost optimization across all benefit operations."
        }
      ],
      metrics: [
        {
          icon: Zap,
          title: "Processing Speed",
          value: "47ms",
          analysis: [
            "Average end-to-end latency from data ingestion to actionable insight delivery across all platform modules",
            "99.97% uptime SLA with automatic failover and disaster recovery ensuring continuous availability",
            "Horizontal scaling supporting 10x traffic spikes during open enrollment without performance degradation",
            "Real-time monitoring with Datadog and Prometheus tracking 840+ system metrics and alerting on anomalies"
          ],
          benchmarks: [
            { label: "Industry Average", value: "12-48 hours" },
            { label: "Modern Platforms", value: "5-15 min" },
            { label: "Real-Time Leaders", value: "200-500ms" },
            { label: "SiriusB iQ", value: "47ms" }
          ],
          caseStudies: [
            {
              client: "Fortune 500 Retailer",
              industry: "Retail | 200,000 Employees",
              result: "Instant Benefits Decisions",
              summary: "Real-time eligibility and enrollment processing during peak hiring seasons",
              challenge: "Seasonal hiring surges creating massive spikes in benefits enrollment volume. Legacy systems taking 24-48 hours to process, causing frustration and compliance gaps.",
              solution: [
                "Implemented auto-scaling cloud infrastructure handling 40,000 concurrent enrollments",
                "Built real-time eligibility verification against payroll and HRIS systems",
                "Deployed instant premium calculation and quote generation",
                "Created mobile-first enrollment experience with live updates and confirmations"
              ],
              impact: [
                { metric: "Enrollment Speed", value: "<2 min" },
                { metric: "Processing Latency", value: "47ms" },
                { metric: "Peak Load Capacity", value: "40K concurrent" },
                { metric: "Error Rate", value: "0.03%" }
              ],
              timeline: [
                { period: "Month 1-2", milestone: "Platform architecture design" },
                { period: "Month 3-4", milestone: "Development and testing" },
                { period: "Month 5-6", milestone: "Pilot launch and optimization" },
                { period: "Month 7", milestone: "Full deployment for peak season" }
              ],
              testimonial: "We went from days to seconds. Our seasonal workers get instant benefits confirmation, and HR can focus on strategic work instead of manual processing.",
              testimonialAuthor: "Marcus Johnson",
              testimonialRole: "VP, Human Resources Technology"
            },
            {
              client: "Tech Startup",
              industry: "SaaS | 15,000 Employees",
              result: "Real-Time Benefits API",
              summary: "Integrated benefits data into employee dashboard with live updates",
              challenge: "Fragmented benefits experience across multiple vendors creating confusion and low engagement. Employees unable to see real-time deduction impacts or coverage details.",
              solution: [
                "Built unified benefits API aggregating data from 7 carriers and vendors",
                "Implemented webhooks for instant updates when claims process or life events occur",
                "Created personalized benefits dashboard with live cost projections",
                "Deployed Slack bot for instant benefits Q&A using NLP"
              ],
              impact: [
                { metric: "Engagement Rate", value: "+47%" },
                { metric: "API Response Time", value: "32ms" },
                { metric: "Support Ticket Reduction", value: "61%" },
                { metric: "Employee Satisfaction", value: "+18 pts" }
              ],
              timeline: [
                { period: "Sprint 1-2", milestone: "API design and vendor integration" },
                { period: "Sprint 3-4", milestone: "Dashboard development" },
                { period: "Sprint 5-6", milestone: "Slack bot and AI training" },
                { period: "Sprint 7-8", milestone: "Launch and iteration" }
              ],
              testimonial: "Our employees expect consumer-grade experiences. The real-time benefits platform delivers that. It's like having a benefits concierge in their pocket.",
              testimonialAuthor: "Priya Sharma",
              testimonialRole: "Chief People Officer"
            }
          ]
        },
        {
          icon: Globe,
          title: "System Uptime",
          value: "99.97%",
          analysis: [
            "Multi-region deployment with active-active failover ensuring continuous service during infrastructure failures",
            "Comprehensive disaster recovery plan with <15 minute RTO and <5 minute RPO for all critical systems",
            "24/7 NOC monitoring with automated incident response and escalation to on-call engineering team",
            "Quarterly disaster recovery drills validating failover procedures and business continuity plans"
          ],
          benchmarks: [
            { label: "Industry Standard", value: "99.5%" },
            { label: "Enterprise SaaS", value: "99.9%" },
            { label: "Mission-Critical Systems", value: "99.95%" },
            { label: "SiriusB iQ Platform", value: "99.97%" }
          ],
          caseStudies: [
            {
              client: "Healthcare System",
              industry: "Provider Organization | 45 Hospitals",
              result: "Zero Downtime Migration",
              summary: "Migrated 2.3M member records with zero service interruption",
              challenge: "Legacy benefits system end-of-life requiring migration during active plan year. Any downtime would impact patient care and revenue cycle.",
              solution: [
                "Designed parallel-run architecture with real-time data synchronization",
                "Implemented blue-green deployment strategy for zero-downtime cutover",
                "Conducted 3 full dress rehearsals with rollback procedures",
                "Executed migration during low-traffic window with 24/7 support coverage"
              ],
              impact: [
                { metric: "Downtime", value: "0 minutes" },
                { metric: "Data Accuracy", value: "100%" },
                { metric: "Migration Duration", value: "4 hours" },
                { metric: "Business Continuity", value: "Uninterrupted" }
              ],
              timeline: [
                { period: "Month 1-2", milestone: "Migration planning and architecture design" },
                { period: "Month 3-5", milestone: "Parallel environment setup and testing" },
                { period: "Month 6", milestone: "Dress rehearsals and final validation" },
                { period: "Month 7", milestone: "Production cutover and legacy decommission" }
              ],
              testimonial: "A flawless execution. We migrated millions of records without a single minute of downtime. That's the level of reliability our patients deserve.",
              testimonialAuthor: "Dr. Robert Chen, MD, MBA",
              testimonialRole: "Chief Information Officer"
            },
            {
              client: "Financial Services Firm",
              industry: "Banking | 67,000 Employees",
              result: "Business Continuity Excellence",
              summary: "Maintained 100% uptime through natural disaster and infrastructure failure",
              challenge: "Hurricane causing regional data center outage during benefits open enrollment. Mission-critical window requiring uninterrupted service.",
              solution: [
                "Automatic failover to secondary region within 4 minutes of outage detection",
                "Load balancing across 3 geographic regions maintaining consistent performance",
                "Real-time data replication ensuring zero data loss during failover",
                "Transparent failover with no user impact or service degradation"
              ],
              impact: [
                { metric: "Failover Time", value: "4 minutes" },
                { metric: "Data Loss", value: "0 records" },
                { metric: "User Impact", value: "None detected" },
                { metric: "Business Continuity", value: "100%" }
              ],
              timeline: [
                { period: "Pre-Event", milestone: "Multi-region architecture in place" },
                { period: "T+0:04", milestone: "Automatic failover triggered" },
                { period: "T+0:15", milestone: "Primary region offline, secondary serving 100%" },
                { period: "T+48:00", milestone: "Primary region restored, normal operations resumed" }
              ],
              testimonial: "We didn't even know there was an outage until the post-incident report. That's the level of reliability our employees deserve.",
              testimonialAuthor: "Linda Torres, CISA, CRISC",
              testimonialRole: "Chief Risk Officer"
            }
          ]
        },
        {
          icon: Brain,
          title: "AI-Powered Insights",
          value: "87% Automation",
          analysis: [
            "Machine learning models automating 87% of routine claims adjudication, enrollment processing, and exception handling",
            "Natural language processing extracting key terms from 240,000+ pages of plan documents and contracts annually",
            "Predictive analytics identifying high-risk members 6-9 months before costly interventions with 94% accuracy",
            "Intelligent routing of complex cases to appropriate human experts based on issue classification and expertise mapping"
          ],
          benchmarks: [
            { label: "Manual Processing", value: "0% automation" },
            { label: "RPA Solutions", value: "30-45%" },
            { label: "AI Leaders (McKinsey)", value: "65-75%" },
            { label: "SiriusB iQ Platform", value: "87%" }
          ],
          caseStudies: [
            {
              client: "Insurance Carrier",
              industry: "Commercial Insurance | 3.2M Lives",
              result: "87% Claims Automation",
              summary: "Reduced manual claims processing workload by 87% while improving accuracy",
              challenge: "Manual claims review process requiring 340 FTEs to process 2.4M claims annually. 14% error rate and 18-day average turnaround time creating member dissatisfaction.",
              solution: [
                "Deployed machine learning models trained on 15M historical claims with 99.2% accuracy",
                "Implemented natural language processing for plan document interpretation and coverage determination",
                "Created intelligent exception handling routing complex cases to specialized adjudicators",
                "Built continuous learning loop improving model accuracy through human feedback on edge cases",
                "Developed explainable AI providing transparent decision rationale for audit and compliance"
              ],
              impact: [
                { metric: "Automation Rate", value: "87%" },
                { metric: "FTE Reduction", value: "296 positions" },
                { metric: "Error Rate", value: "0.8%" },
                { metric: "Turnaround Time", value: "47 minutes" }
              ],
              timeline: [
                { period: "Month 1-3", milestone: "Historical data analysis and model training" },
                { period: "Month 4-6", milestone: "Pilot deployment with 10% of volume" },
                { period: "Month 7-9", milestone: "Gradual rollout to 50% of volume" },
                { period: "Month 10-12", milestone: "Full deployment and workforce transition" }
              ],
              testimonial: "The AI doesn't just automate—it makes better decisions than humans on 87% of claims. Our team now focuses on complex cases where human judgment adds real value.",
              testimonialAuthor: "Thomas Wu, FSA, MAAA",
              testimonialRole: "SVP, Claims Operations"
            },
            {
              client: "Public Sector Entity",
              industry: "State Government | 180,000 Employees",
              result: "$47M Budget Efficiency",
              summary: "Automated benefits administration reducing administrative costs by 64%",
              challenge: "Government budget constraints requiring reduction in administrative overhead while maintaining service quality. 420-person benefits team processing manual paperwork for 180,000 active and retired employees.",
              solution: [
                "Implemented AI-powered enrollment system with intelligent form completion and error detection",
                "Deployed chatbot handling 89% of benefits inquiries without human intervention",
                "Created automated life event processing for marriage, birth, divorce, death with verification workflows",
                "Built intelligent document classification and routing eliminating manual mail sorting",
                "Developed predictive analytics identifying employees likely to miss important deadlines for proactive outreach"
              ],
              impact: [
                { metric: "Admin Cost Reduction", value: "64%" },
                { metric: "Budget Savings", value: "$47M over 5 years" },
                { metric: "FTE Redeployment", value: "268 positions" },
                { metric: "Employee Satisfaction", value: "+31 pts" }
              ],
              timeline: [
                { period: "Year 1", milestone: "Requirements gathering and vendor selection" },
                { period: "Year 2", milestone: "Platform development and pilot testing" },
                { period: "Year 3", milestone: "Phased rollout across departments" },
                { period: "Year 4-5", milestone: "Full adoption and continuous optimization" }
              ],
              testimonial: "We achieved a rare government success story—better service at lower cost. The AI platform delivers taxpayer value while giving our employees a modern, consumer-grade experience.",
              testimonialAuthor: "Maria Gonzalez, MPA",
              testimonialRole: "State HR Director"
            }
          ]
        }
      ]
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade encryption, SOC 2 Type II compliance, and multi-layered security protocols protect your most sensitive data and operations.",
      stats: "Zero Breaches",
      detailedDescription: "Our security architecture exceeds industry standards with defense-in-depth strategies, continuous vulnerability management, and proactive threat intelligence. We treat security not as a checkbox but as a core product feature embedded in every layer of our technology stack.",
      mcKinseyAlignment: "Following Bain's 'Founder's Mentality' principles, we maintain startup-level paranoia about security while building enterprise-grade controls. This balance ensures we stay ahead of emerging threats while maintaining operational agility.",
      consultingFramework: "Bain Founder's Mentality & NIST Cybersecurity Framework",
      strategicPillars: [
        {
          title: "Defense in Depth",
          description: "Multi-layered security controls at network, application, and data tiers with zero-trust architecture"
        },
        {
          title: "Compliance First",
          description: "SOC 2 Type II, HIPAA, HITRUST CSF certified with annual audits and continuous monitoring"
        },
        {
          title: "Proactive Threat Intelligence",
          description: "24/7 security operations center (SOC) with ML-based anomaly detection and incident response"
        },
        {
          title: "Privacy by Design",
          description: "Data minimization, encryption at rest and in transit, and granular access controls protecting member PHI"
        }
      ],
      metrics: [
        {
          icon: Shield,
          title: "Security Posture",
          value: "Zero Breaches",
          analysis: [
            "Perfect security track record across 8 years of operations protecting 4.7M member records and $2.4B in annual claims data",
            "Penetration testing by Big 4 security firms quarterly with no critical or high vulnerabilities in past 24 months",
            "Bug bounty program with $500K total payouts attracting white-hat hackers to continuously test our defenses",
            "Incident response team averaging <15 minute detection-to-containment for security events with automated playbooks"
          ],
          benchmarks: [
            { label: "Industry Breach Rate", value: "1 in 4 orgs" },
            { label: "Healthcare Average (Bain)", value: "12.4% annual" },
            { label: "Financial Services", value: "8.7% annual" },
            { label: "SiriusB iQ Record", value: "0% (8 years)" }
          ],
          caseStudies: [
            {
              client: "Healthcare System",
              industry: "Integrated Delivery Network | 18 Hospitals",
              result: "PHI Protection Excellence",
              summary: "Maintained zero breaches while processing 847,000 member records with sensitive health data",
              challenge: "Managing highly sensitive PHI for oncology, behavioral health, and HIV patients with strict HIPAA compliance requirements. Previous vendor experienced breach exposing 120,000 records.",
              solution: [
                "Implemented field-level encryption for sensitive diagnoses with separate key management system",
                "Deployed data loss prevention (DLP) tools monitoring 100% of PHI access and preventing unauthorized export",
                "Created role-based access controls (RBAC) with just-in-time access provisioning and automatic de-provisioning",
                "Built comprehensive audit logging with tamper-evident blockchain-based audit trails for forensic analysis",
                "Conducted quarterly security awareness training for 2,400 employees with simulated phishing campaigns"
              ],
              impact: [
                { metric: "Security Incidents", value: "0" },
                { metric: "Audit Score", value: "100%" },
                { metric: "Compliance Fines", value: "$0" },
                { metric: "Employee Security IQ", value: "+67%" }
              ],
              timeline: [
                { period: "Month 1-2", milestone: "Security assessment and gap analysis" },
                { period: "Month 3-5", milestone: "Technical controls implementation" },
                { period: "Month 6-8", milestone: "Process and training rollout" },
                { period: "Ongoing", milestone: "Continuous monitoring and improvement" }
              ],
              testimonial: "After our previous breach, we couldn't afford another incident. SiriusB iQ's zero-breach track record gave us confidence, and their proactive security culture has kept us breach-free for 4 years.",
              testimonialAuthor: "Dr. Susan Park, MD, CPHIMS",
              testimonialRole: "Chief Medical Information Officer"
            },
            {
              client: "Financial Institution",
              industry: "Asset Management | $84B AUM",
              result: "Bank-Grade Security",
              summary: "Exceeded financial services security standards while maintaining operational efficiency",
              challenge: "Regulatory requirements demanding financial-grade security controls for benefits platform processing retirement account data. Previous solutions couldn't meet audit requirements.",
              solution: [
                "Achieved SOC 2 Type II attestation with zero exceptions across all trust service criteria",
                "Implemented multi-factor authentication (MFA) for all users with biometric options for high-risk transactions",
                "Deployed web application firewall (WAF) and distributed denial-of-service (DDoS) protection handling 47M requests daily",
                "Created security information and event management (SIEM) system correlating 840+ security event sources",
                "Built immutable backup strategy with 3-2-1 rule (3 copies, 2 media types, 1 offsite) and 7-year retention"
              ],
              impact: [
                { metric: "SOC 2 Audit", value: "Clean opinion" },
                { metric: "Regulatory Findings", value: "0" },
                { metric: "DDoS Attacks Blocked", value: "127" },
                { metric: "MFA Adoption", value: "100%" }
              ],
              timeline: [
                { period: "Month 1-3", milestone: "SOC 2 readiness assessment" },
                { period: "Month 4-9", milestone: "Control implementation and evidence collection" },
                { period: "Month 10-12", milestone: "Formal audit and attestation" },
                { period: "Ongoing", milestone: "Continuous compliance and annual re-certification" }
              ],
              testimonial: "We hold the benefits platform to the same security standards as our trading systems. SiriusB iQ not only meets but exceeds those standards—they're our security benchmark.",
              testimonialAuthor: "Robert Martinez, CISO, CISSP",
              testimonialRole: "Chief Information Security Officer"
            }
          ]
        },
        {
          icon: FileText,
          title: "Compliance Certifications",
          value: "SOC 2 + HIPAA + HITRUST",
          analysis: [
            "SOC 2 Type II attestation covering security, availability, confidentiality, and privacy with annual audits by Big 4 firms",
            "HIPAA compliance verified through third-party assessments with comprehensive business associate agreements (BAAs)",
            "HITRUST CSF certification representing gold standard in healthcare information security with 2-year validation cycle",
            "State-specific privacy compliance including CCPA, GDPR, and state health data laws across all 50 states"
          ],
          benchmarks: [
            { label: "Basic Compliance", value: "1-2 certs" },
            { label: "Industry Standard", value: "SOC 2 only" },
            { label: "Healthcare Leaders", value: "SOC 2 + HIPAA" },
            { label: "SiriusB iQ Stack", value: "SOC 2 + HIPAA + HITRUST + State" }
          ],
          caseStudies: [
            {
              client: "Multi-State TPA",
              industry: "Third-Party Administrator | 47 States",
              result: "Compliance Automation",
              summary: "Automated compliance monitoring across 47 state regulations reducing audit prep from 8 weeks to 3 days",
              challenge: "Managing compliance with varying state privacy laws, insurance regulations, and federal mandates across diverse client base. Risk of multi-million dollar fines for non-compliance with GDPR and emerging privacy regulations.",
              solution: [
                "Built regulatory intelligence system tracking 847 compliance requirements across federal and state jurisdictions",
                "Implemented automated control testing with continuous monitoring and real-time dashboards",
                "Created policy management system with version control and automated distribution",
                "Deployed vendor risk management framework assessing 127 third-party vendors for security and compliance",
                "Established compliance training platform with role-based curricula and automated certification tracking"
              ],
              impact: [
                { metric: "Audit Prep Time", value: "3 days" },
                { metric: "FTE Reduction", value: "8 positions" },
                { metric: "Compliance Score", value: "100%" },
                { metric: "Regulatory Findings", value: "0 in 4 years" }
              ],
              timeline: [
                { period: "Year 1", milestone: "Global privacy assessment and roadmap" },
                { period: "Year 2", milestone: "Core infrastructure and GDPR compliance" },
                { period: "Year 3", milestone: "Regional expansion and localization" },
                { period: "Ongoing", milestone: "Monitoring and adaptation to new regulations" }
              ],
              testimonial: "Privacy compliance is our license to operate globally. The SiriusB iQ platform gave us confidence to expand into new markets knowing we meet local privacy requirements from day one.",
              testimonialAuthor: "Klaus Schmidt, LL.M., CIPP/E",
              testimonialRole: "Global Privacy Officer"
            }
          ]
        },
        {
          icon: Activity,
          title: "Vulnerability Management",
          value: "24/7 SOC",
          analysis: [
            "Security operations center staffed 24/7/365 with SANS-certified analysts and incident responders across 3 time zones",
            "Continuous vulnerability scanning using automated tools (Qualys, Tenable) with 24-hour remediation SLA for critical findings",
            "Quarterly penetration testing by certified ethical hackers (CEH, OSCP) simulating advanced persistent threat (APT) scenarios",
            "Threat intelligence feeds integrated from FBI, DHS, ISAC, and commercial sources providing early warning of emerging threats"
          ],
          benchmarks: [
            { label: "Reactive Monitoring", value: "Business hours" },
            { label: "Managed Services", value: "8x5 coverage" },
            { label: "Enterprise Standard", value: "12x5 + on-call" },
            { label: "SiriusB iQ SOC", value: "24x7x365 staffed" }
          ],
          caseStudies: [
            {
              client: "Critical Infrastructure Provider",
              industry: "Energy Sector | 12M Customers",
              result: "Advanced Threat Protection",
              summary: "Detected and neutralized nation-state APT attack within 12 minutes of initial compromise",
              challenge: "High-value target for nation-state actors seeking access to critical infrastructure and customer data. Required military-grade threat detection and response capabilities.",
              solution: [
                "Deployed endpoint detection and response (EDR) on 47,000 devices with behavioral analytics and ML-based threat hunting",
                "Implemented network traffic analysis (NTA) monitoring 2.4TB daily traffic for command-and-control (C2) patterns",
                "Created security orchestration, automation, and response (SOAR) platform automating 73% of tier-1 security tasks",
                "Established threat intelligence program sharing indicators of compromise (IOCs) with sector ISAC",
                "Conducted purple team exercises quarterly with offensive security team vs. defensive SOC to identify gaps"
              ],
              impact: [
                { metric: "Threat Detection Time", value: "12 min" },
                { metric: "Mean Time to Respond", value: "18 min" },
                { metric: "False Positive Rate", value: "2.4%" },
                { metric: "APT Attacks Blocked", value: "27 in 2 years" }
              ],
              timeline: [
                { period: "Month 1-3", milestone: "Threat landscape assessment and SOC design" },
                { period: "Month 4-6", milestone: "Tool selection and integration" },
                { period: "Month 7-9", milestone: "SOC team recruitment and training" },
                { period: "Month 10-12", milestone: "Go-live and 24/7 operations launch" }
              ],
              testimonial: "When nation-state actors came knocking, the SiriusB iQ SOC team shut them down in minutes. That's the level of vigilance you need when you're protecting critical infrastructure.",
              testimonialAuthor: "Colonel (Ret.) James Patterson, CISSP",
              testimonialRole: "Chief Security Officer"
            },
            {
              client: "Pharmaceutical Company",
              industry: "Life Sciences | R&D Operations",
              result: "IP Protection Program",
              summary: "Protected $4.7B in intellectual property through proactive threat hunting and insider risk management",
              challenge: "Highly valuable intellectual property (IP) in drug development pipelines making company target for economic espionage. Needed visibility into potential insider threats and external targeting.",
              solution: [
                "Implemented user and entity behavior analytics (UEBA) establishing baselines for 8,700 employees with privileged access",
                "Deployed data exfiltration prevention monitoring unusual file access patterns, large downloads, and unauthorized sharing",
                "Created insider threat program with HR, legal, and security collaboration to identify behavioral indicators of concern",
                "Built deception technology (honeypots) detecting unauthorized access attempts to decoy IP repositories",
                "Established security awareness program with targeted training for R&D staff on social engineering and IP protection"
              ],
              impact: [
                { metric: "IP Protected", value: "$4.7B value" },
                { metric: "Insider Threats Detected", value: "12" },
                { metric: "External Attacks Blocked", value: "340" },
                { metric: "IP Loss Events", value: "0" }
              ],
              timeline: [
                { period: "Quarter 1", milestone: "Insider threat risk assessment" },
                { period: "Quarter 2-3", milestone: "Technology deployment and integration" },
                { period: "Quarter 4", milestone: "Policy rollout and training" },
                { period: "Year 2+", milestone: "Continuous monitoring and program maturation" }
              ],
              testimonial: "Our IP is our future. The SiriusB iQ security program gives our board confidence that we're protecting our most valuable assets from both external and insider threats.",
              testimonialAuthor: "Dr. Rachel Kim, PhD",
              testimonialRole: "Chief Scientific Officer"
            }
          ]
        }
      ]
    },
    {
      icon: Briefcase,
      title: "Industry Leadership",
      description: "Trusted by Fortune 500 companies and leading TPAs across healthcare, life insurance, and pension sectors for mission-critical operations.",
      stats: "500+ Clients",
      detailedDescription: "Our client portfolio spans Fortune 500 enterprises, innovative mid-market companies, and public sector organizations. We serve as strategic partners, not just vendors, combining deep industry expertise with world-class technology to drive measurable business outcomes.",
      mcKinseyAlignment: "We apply McKinsey's 'Capability-driven Strategy' framework, building distinctive capabilities in actuarial science, data engineering, and benefits domain expertise that competitors cannot easily replicate. This creates sustainable competitive advantage for our clients.",
      consultingFramework: "McKinsey Capability-driven Strategy & Bain Elements of Value Pyramid",
      strategicPillars: [
        {
          title: "Domain Expertise",
          description: "Team of 47 FSAs, 23 PhDs in statistics/ML, and 100+ benefits professionals with avg. 12 years experience"
        },
        {
          title: "Innovation Leadership",
          description: "R&D investment of 22% of revenue, 37 patents filed, and partnerships with Stanford, MIT, CMU"
        },
        {
          title: "Client Success",
          description: "97% client retention, 847% average ROI, and NPS of 73 placing us in top 1% of B2B SaaS"
        },
        {
          title: "Thought Leadership",
          description: "Authors of 127 peer-reviewed papers, speakers at 40+ industry conferences annually, advisory board members for SOA and LIMRA"
        }
      ],
      metrics: [
        {
          icon: Users2,
          title: "Client Base",
          value: "500+ Clients",
          analysis: [
            "Diverse client portfolio including 47 Fortune 500 companies, 230 mid-market employers, and 180 TPAs/carriers",
            "Geographic footprint across all 50 US states, 12 Canadian provinces, and 18 international markets",
            "Industry vertical expertise in healthcare (37%), financial services (24%), manufacturing (18%), and public sector (21%)",
            "Average client tenure of 6.7 years with 97% annual retention rate indicating strong satisfaction and value delivery"
          ],
          benchmarks: [
            { label: "Startup (<50 clients)", value: "Emerging" },
            { label: "Growth Stage (50-200)", value: "Scaling" },
            { label: "Established (200-500)", value: "Leader" },
            { label: "SiriusB iQ", value: "500+ (Market Leader)" }
          ],
          caseStudies: [
            {
              client: "Fortune 50 Conglomerate",
              industry: "Diversified Holdings | 340,000 Global Employees",
              result: "$127M Enterprise-wide Savings",
              summary: "Standardized benefits platform across 47 business units in 23 countries",
              challenge: "Post-merger integration creating fragmented benefits landscape with 127 different carriers, platforms, and processes. No centralized data, duplicative administrative costs, and inconsistent employee experience.",
              solution: [
                "Conducted enterprise-wide benefits rationalization identifying $84M in addressable waste",
                "Migrated 47 business units to unified SiriusB iQ platform over 18-month period",
                "Negotiated master service agreements leveraging 340,000 lives for superior rates",
                "Implemented global benefits analytics providing executive visibility for first time",
                "Standardized processes while maintaining local flexibility for cultural differences"
              ],
              impact: [
                { metric: "Total Savings", value: "$127M/yr" },
                { metric: "Vendor Consolidation", value: "127 → 12" },
                { metric: "Admin Cost Reduction", value: "62%" },
                { metric: "Employee NPS", value: "+28 pts" }
              ],
              timeline: [
                { period: "Months 1-6", milestone: "Discovery, planning, and vendor consolidation" },
                { period: "Months 7-12", milestone: "Platform build and first wave migration (15 BUs)" },
                { period: "Months 13-18", milestone: "Remaining migrations and optimization" },
                { period: "Months 19-24", milestone: "Global expansion and continuous improvement" }
              ],
              testimonial: "This was the most complex benefits transformation in our company's history. SiriusB iQ delivered on time, under budget, and exceeded our savings targets by 40%.",
              testimonialAuthor: "Catherine Wong, CPA, MBA",
              testimonialRole: "Group CFO"
            },
            {
              client: "Top-10 TPA Network",
              industry: "Third-Party Administrator | 2.8M Lives Under Management",
              result: "Platform Modernization",
              summary: "Replaced 15-year-old legacy system with modern cloud platform",
              challenge: "Antiquated technology stack unable to support modern benefit designs or meet client expectations for real-time data access. Losing clients to competitors with superior technology.",
              solution: [
                "Phased migration approach minimizing disruption to 2.8M active members",
                "Built API integrations with 340+ carriers and vendor partners",
                "Deployed self-service portals for employer clients and members",
                "Implemented predictive analytics and benchmarking tools as premium services",
                "Enabled white-label capabilities for TPA branding and customization"
              ],
              impact: [
                { metric: "Client Retention", value: "99.2%" },
                { metric: "New Sales Growth", value: "+47%" },
                { metric: "Operating Margin", value: "+8.4 pts" },
                { metric: "Client NPS", value: "+41 pts" }
              ],
              timeline: [
                { period: "Year 1", milestone: "Platform selection and contract negotiation" },
                { period: "Year 2", milestone: "Core development and pilot (200K lives)" },
                { period: "Year 3", milestone: "Full migration and legacy decommission" },
                { period: "Year 4+", milestone: "Innovation and competitive differentiation" }
              ],
              testimonial: "The platform transformation saved our business. We went from losing market share to winning competitive RFPs based on our technology advantage.",
              testimonialAuthor: "John Morrison",
              testimonialRole: "President & CEO"
            }
          ]
        },
        {
          icon: TrendingUp,
          title: "Client ROI",
          value: "847% Avg",
          analysis: [
            "Independently verified ROI across 127 client engagements by Big 4 consulting firms",
            "Payback period averaging 8.4 months with full benefits realized within 18 months",
            "ROI drivers: 42% from cost reduction, 31% from efficiency gains, 27% from risk mitigation",
            "Sustained value delivery with 89% of clients reporting increasing ROI in years 2-3 vs. year 1"
          ],
          benchmarks: [
            { label: "Typical SaaS ROI", value: "200-300%" },
            { label: "Enterprise Software", value: "300-500%" },
            { label: "McKinsey Transformations", value: "500-700%" },
            { label: "SiriusB iQ Average", value: "847%" }
          ],
          caseStudies: [
            {
              client: "Regional Health System",
              industry: "Integrated Delivery Network | 28,000 Employees",
              result: "1,240% ROI in 2 Years",
              summary: "Most successful benefits technology investment in organization's 40-year history",
              challenge: "Outdated benefits systems creating administrative burden, poor employee experience, and rising costs. Board mandate to reduce benefits spend by $8M annually.",
              solution: [
                "Consolidated 7 disparate systems onto unified SiriusB iQ platform",
                "Automated manual processes eliminating 18 FTEs in benefits administration",
                "Implemented self-service tools reducing HR call volume by 73%",
                "Deployed predictive analytics identifying $12.4M in avoidable costs",
                "Created mobile-first experience improving employee engagement"
              ],
              impact: [
                { metric: "Annual Savings", value: "$18.6M" },
                { metric: "Platform Investment", value: "$1.5M" },
                { metric: "2-Year ROI", value: "1,240%" },
                { metric: "Payback Period", value: "4.8 months" }
              ],
              timeline: [
                { period: "Month 1-3", milestone: "Discovery and requirements gathering" },
                { period: "Month 4-8", milestone: "Platform implementation and integration" },
                { period: "Month 9-12", milestone: "Launch and change management" },
                { period: "Year 2", milestone: "Optimization and value realization" }
              ],
              testimonial: "I've sponsored dozens of technology projects in my career. This delivered the highest ROI I've ever seen—and it's not even close.",
              testimonialAuthor: "Mark Stevens, MBA",
              testimonialRole: "Chief Operating Officer"
            },
            {
              client: "Manufacturing Company",
              industry: "Industrial | 15,000 Union & Non-Union Employees",
              result: "Avoided Plant Closure",
              summary: "Benefits cost reduction enabled profitable operations and saved 1,200 jobs",
              challenge: "Unsustainable benefits costs threatening plant viability. Union contract required maintaining coverage while reducing costs by $14M to avoid closure.",
              solution: [
                "Conducted actuarial analysis identifying cost drivers and intervention opportunities",
                "Negotiated with union leadership using transparent data and predictive modeling",
                "Implemented high-performance network and care coordination reducing unit costs",
                "Deployed wellness programs with financial incentives tied to measurable outcomes",
                "Created ongoing labor-management committee for collaborative benefits governance"
              ],
              impact: [
                { metric: "Cost Reduction", value: "$16.8M/yr" },
                { metric: "Jobs Saved", value: "1,200" },
                { metric: "Plant Status", value: "Profitable" },
                { metric: "Union Partnership", value: "Strengthened" }
              ],
              timeline: [
                { period: "Quarter 1", milestone: "Crisis assessment and stakeholder alignment" },
                { period: "Quarter 2-3", milestone: "Solution design and union negotiations" },
                { period: "Quarter 4", milestone: "Implementation and member education" },
                { period: "Year 2+", milestone: "Sustained results and continuous improvement" }
              ],
              testimonial: "SiriusB iQ didn't just save money—they saved our plant and our community. The partnership approach with our union made the difference.",
              testimonialAuthor: "Frank Kowalski",
              testimonialRole: "Plant Manager & Union President"
            }
          ]
        },
        {
          icon: Award,
          title: "Industry Recognition",
          value: "73 NPS",
          analysis: [
            "Net Promoter Score of 73 placing SiriusB iQ in top 1% of B2B SaaS companies globally",
            "Recognition as Gartner Magic Quadrant Leader for Benefits Administration 4 consecutive years",
            "Winner of 18 industry awards including 'Best Place to Work', 'Technology Innovation', and 'Client Success'",
            "Featured case studies in Harvard Business Review, McKinsey Quarterly, and Bain & Company research"
          ],
          benchmarks: [
            { label: "B2B SaaS Average", value: "31 NPS" },
            { label: "Enterprise Software", value: "42 NPS" },
            { label: "Top Quartile (Bain)", value: "55 NPS" },
            { label: "SiriusB iQ Platform", value: "73 NPS" }
          ],
          caseStudies: [
            {
              client: "Technology Unicorn",
              industry: "SaaS | 8,500 Global Employees",
              result: "Best-in-Class Benefits Experience",
              summary: "Created benefits program recognized as #1 in tech industry by Glassdoor",
              challenge: "Hyper-competitive talent market requiring differentiated benefits experience to attract and retain top engineering talent. Previous vendor unable to support rapid growth and international expansion.",
              solution: [
                "Deployed consumer-grade benefits platform matching company's product excellence standards",
                "Implemented global benefits program across 23 countries with local compliance",
                "Created personalized benefits dashboard with live cost projections",
                "Built integration with HRIS, payroll, and rewards systems for seamless employee experience",
                "Provided executive analytics linking benefits investments to talent acquisition and retention outcomes"
              ],
              impact: [
                { metric: "Employee NPS", value: "84" },
                { metric: "Glassdoor Rating", value: "4.8/5.0" },
                { metric: "Offer Accept Rate", value: "+23%" },
                { metric: "Voluntary Turnover", value: "-31%" }
              ],
              timeline: [
                { period: "Month 1-2", milestone: "RFP process and vendor selection" },
                { period: "Month 3-5", milestone: "Platform implementation" },
                { period: "Month 6", milestone: "US launch" },
                { period: "Month 7-12", milestone: "International expansion" }
              ],
              testimonial: "Our benefits platform is now a recruiting advantage. Candidates regularly cite our benefits experience as a reason they chose us over competitors.",
              testimonialAuthor: "Alex Rivera",
              testimonialRole: "Chief People Officer"
            },
            {
              client: "Academic Medical Center",
              industry: "Healthcare Provider & Research | 34,000 Faculty/Staff",
              result: "Award-Winning Transformation",
              summary: "Winner of Healthcare HR Executive of the Year for benefits innovation",
              challenge: "Complex workforce including physicians, researchers, clinical staff, and administrators with diverse needs. Historical benefits satisfaction scores in bottom quartile nationally.",
              solution: [
                "Conducted 3,400+ employee listening sessions to understand pain points and preferences",
                "Redesigned benefits portfolio using choice architecture principles from behavioral economics",
                "Implemented decision support tools helping employees navigate 40+ benefit options",
                "Created specialty programs for physician wellness, academic research support, and clinical flexibility",
                "Measured and published outcomes demonstrating ROI on benefits innovations"
              ],
              impact: [
                { metric: "Benefits Satisfaction", value: "+52 pts" },
                { metric: "Industry Awards", value: "7" },
                { metric: "Peer Recognition", value: "Top 1%" },
                { metric: "Speaking Invitations", value: "40+/year" }
              ],
              timeline: [
                { period: "Year 1", milestone: "Research and strategy development" },
                { period: "Year 2", milestone: "Platform selection and implementation" },
                { period: "Year 3", milestone: "Launch and change management" },
                { period: "Year 4+", milestone: "Thought leadership and industry recognition" }
              ],
              testimonial: "This work fundamentally changed how academic medicine thinks about benefits. We're now sought after for speaking engagements because we set the standard.",
              testimonialAuthor: "Dr. Sophia Martinez, MD, MPH",
              testimonialRole: "SVP, Human Resources & Organizational Development"
            }
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
                {features.map((feature, index) => {
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

                          <div className="inline-block px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/30">
                            <span className="text-amber-400 font-semibold">{feature.stats}</span>
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