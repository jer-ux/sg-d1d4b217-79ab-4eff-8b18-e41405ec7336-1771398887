"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Target, Users, Zap, Shield, TrendingUp, Award, Globe, Lightbulb, ChevronRight, Sparkles, Rocket, Brain } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Hero3D } from "@/components/Hero3D";
import { ImageLightbox } from "@/components/ImageLightbox";

export default function AboutPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState({
    src: "",
    alt: "",
    title: "",
    subtitle: ""
  });

  const openLightbox = (src: string, alt: string, title: string, subtitle: string) => {
    setLightboxImage({ src, alt, title, subtitle });
    setLightboxOpen(true);
  };

  return (
    <>
      <SEO 
        title="About SiriusB iQ - Algorithmic Fiduciary Intelligence Platform"
        description="Learn about SiriusB iQ's mission to transform enterprise governance through algorithmic fiduciary intelligence, data orchestration, and agentic workflows."
      />
      <Nav />
      
      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        imageSrc={lightboxImage.src}
        imageAlt={lightboxImage.alt}
        title={lightboxImage.title}
        subtitle={lightboxImage.subtitle}
      />
      
      <main className="min-h-screen bg-black text-white">
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
          <Hero3D />
          
          <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-500/30 rounded-full mb-6"
              >
                <Shield className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                  Algorithmic Fiduciary Intelligence
                </span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
                  Transforming Enterprise
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Governance & Intelligence
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
                SiriusB iQ is the world's first algorithmic fiduciary intelligence platform, 
                empowering enterprises with real-time data orchestration, compliance automation, 
                and agentic workflows that drive measurable value.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/request-demo"
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold rounded-full overflow-hidden transition-all hover:scale-105"
                >
                  <span className="relative z-10">Schedule a Demo</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Link>
                <Link
                  href="/board-of-directors"
                  className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 text-white font-medium rounded-full hover:bg-white/10 transition-all hover:scale-105"
                >
                  Meet Our Board
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-24 bg-gradient-to-b from-gray-900/50 to-black">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="group relative bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-pink-900/20 rounded-2xl border border-blue-500/30 p-8 hover:border-blue-400/50 transition-all duration-500 hover:scale-[1.02]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 rounded-2xl transition-all duration-500" />
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center mb-6 border border-blue-500/30 group-hover:scale-110 transition-transform duration-500">
                    <Target className="w-8 h-8 text-blue-400" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
                    Our Mission
                  </h2>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    To democratize enterprise-grade intelligence by creating the world's first algorithmic 
                    fiduciary platform that transforms raw data into actionable governance, compliance, and 
                    financial optimization insights—making sophisticated analysis accessible to organizations 
                    of all sizes.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="group relative bg-gradient-to-br from-purple-900/20 via-pink-900/10 to-blue-900/20 rounded-2xl border border-purple-500/30 p-8 hover:border-purple-400/50 transition-all duration-500 hover:scale-[1.02]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-pink-500/0 to-blue-500/0 group-hover:from-purple-500/10 group-hover:via-pink-500/10 group-hover:to-blue-500/10 rounded-2xl transition-all duration-500" />
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-600/20 flex items-center justify-center mb-6 border border-purple-500/30 group-hover:scale-110 transition-transform duration-500">
                    <Lightbulb className="w-8 h-8 text-purple-400" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
                    Our Vision
                  </h2>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    A future where every enterprise decision is powered by real-time, AI-driven intelligence—
                    where compliance is automated, risks are predicted before they materialize, and fiduciary 
                    duties are fulfilled with mathematical precision rather than manual effort.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Our Core Values
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                The principles that guide everything we build and every decision we make
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Shield,
                  title: "Fiduciary First",
                  description: "Every feature we build prioritizes the fiduciary duty to act in our clients' best interest",
                  gradient: "from-blue-500/20 to-blue-600/20",
                  border: "border-blue-500/30",
                  iconColor: "text-blue-400"
                },
                {
                  icon: Zap,
                  title: "Speed to Value",
                  description: "Deliver measurable ROI in weeks, not months—real-time intelligence, immediate impact",
                  gradient: "from-purple-500/20 to-purple-600/20",
                  border: "border-purple-500/30",
                  iconColor: "text-purple-400"
                },
                {
                  icon: Globe,
                  title: "Radical Transparency",
                  description: "Immutable audit trails, verifiable evidence, and complete visibility into every decision",
                  gradient: "from-pink-500/20 to-pink-600/20",
                  border: "border-pink-500/30",
                  iconColor: "text-pink-400"
                },
                {
                  icon: Users,
                  title: "Democratic Intelligence",
                  description: "Enterprise-grade analytics accessible to organizations of all sizes, not just Fortune 500s",
                  gradient: "from-blue-500/20 to-purple-600/20",
                  border: "border-blue-500/30",
                  iconColor: "text-blue-400"
                },
                {
                  icon: TrendingUp,
                  title: "Continuous Innovation",
                  description: "Relentless improvement through AI, automation, and cutting-edge technology",
                  gradient: "from-purple-500/20 to-pink-600/20",
                  border: "border-purple-500/30",
                  iconColor: "text-purple-400"
                },
                {
                  icon: Award,
                  title: "Excellence Obsessed",
                  description: "World-class platform, exceptional support, uncompromising quality standards",
                  gradient: "from-pink-500/20 to-blue-600/20",
                  border: "border-pink-500/30",
                  iconColor: "text-pink-400"
                },
                {
                  icon: Target,
                  title: "Outcome Driven",
                  description: "Measured by real savings, risk reduction, and compliance achievement—not features",
                  gradient: "from-blue-500/20 to-pink-600/20",
                  border: "border-blue-500/30",
                  iconColor: "text-blue-400"
                },
                {
                  icon: Lightbulb,
                  title: "Thought Leadership",
                  description: "Pioneering new approaches to governance, compliance, and enterprise intelligence",
                  gradient: "from-purple-500/20 to-blue-600/20",
                  border: "border-purple-500/30",
                  iconColor: "text-purple-400"
                }
              ].map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`group relative p-6 bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-xl border ${value.border} hover:border-opacity-60 transition-all duration-500 hover:scale-105`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 rounded-xl transition-all duration-500" />
                    <div className="relative z-10">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${value.gradient} flex items-center justify-center mb-4 border ${value.border} group-hover:scale-110 transition-transform duration-500`}>
                        <Icon className={`w-6 h-6 ${value.iconColor}`} />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                      <p className="text-sm text-gray-400">{value.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* The Platform Story */}
        <section className="py-24 bg-gradient-to-b from-gray-900/50 to-black">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
                The Platform Story
              </h2>
            </motion.div>

            <div className="max-w-4xl mx-auto space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="group relative bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-pink-900/20 rounded-xl border border-blue-500/30 p-8 hover:border-blue-400/50 transition-all duration-500 hover:scale-[1.02]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 rounded-xl transition-all duration-500" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center border border-blue-500/30">
                      <Sparkles className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
                      The Problem We Saw
                    </h3>
                  </div>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    Enterprises spend billions on healthcare, benefits, and vendor contracts—yet lack real-time 
                    visibility into where money goes, whether vendors deliver value, or if fiduciary duties are 
                    being met. Traditional audit approaches are manual, slow, and reactive. By the time problems 
                    are discovered, millions are already lost.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="group relative bg-gradient-to-br from-purple-900/20 via-pink-900/10 to-blue-900/20 rounded-xl border border-purple-500/30 p-8 hover:border-purple-400/50 transition-all duration-500 hover:scale-[1.02]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-pink-500/0 to-blue-500/0 group-hover:from-purple-500/10 group-hover:via-pink-500/10 group-hover:to-blue-500/10 rounded-xl transition-all duration-500" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-600/20 flex items-center justify-center border border-purple-500/30">
                      <Rocket className="w-6 h-6 text-purple-400" />
                    </div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
                      The SiriusB iQ Solution
                    </h3>
                  </div>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    We built the world's first algorithmic fiduciary intelligence platform—a system that 
                    continuously ingests data from all enterprise sources, applies sophisticated AI analysis 
                    in real-time, and surfaces actionable insights through our Executive War Room. Every 
                    transaction is scored, every anomaly is flagged, and every opportunity is quantified—
                    automatically, 24/7/365.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="group relative bg-gradient-to-br from-pink-900/20 via-blue-900/10 to-purple-900/20 rounded-xl border border-pink-500/30 p-8 hover:border-pink-400/50 transition-all duration-500 hover:scale-[1.02]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-pink-500/10 group-hover:via-blue-500/10 group-hover:to-purple-500/10 rounded-xl transition-all duration-500" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-500/20 to-blue-600/20 flex items-center justify-center border border-pink-500/30">
                      <Brain className="w-6 h-6 text-pink-400" />
                    </div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-200 to-blue-200 bg-clip-text text-transparent">
                      Why It Matters
                    </h3>
                  </div>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    Our clients recover an average of $2.4M in the first year through our platform. More 
                    importantly, they gain permanent visibility into their operations—transforming from 
                    reactive crisis management to proactive optimization. Compliance becomes automated, 
                    risks are predicted before they materialize, and fiduciary duties are fulfilled with 
                    mathematical precision.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Leadership Team
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Visionary leaders driving innovation in algorithmic fiduciary intelligence
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Jeremiah Shrack */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-950/40 via-purple-900/40 to-pink-950/40 border border-blue-500/30 p-8 hover:border-blue-400/50 transition-all duration-500 hover:scale-[1.02]">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500" />
                  <div className="relative z-10">
                    <button
                      onClick={() => openLightbox(
                        "/jeremiah-shrack-professional.png",
                        "Jeremiah Shrack",
                        "Jeremiah Shrack",
                        "Founder & CEO"
                      )}
                      className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-blue-500/30 group-hover:border-blue-400/60 transition-all duration-500 cursor-pointer hover:scale-110"
                    >
                      <img
                        src="/jeremiah-shrack-professional.png"
                        alt="Jeremiah Shrack"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                        <span className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                          Click to enlarge
                        </span>
                      </div>
                    </button>
                    <div className="text-center">
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent mb-2">
                        Jeremiah Shrack
                      </h3>
                      <p className="text-blue-400 font-semibold mb-4">
                        Founder & CEO
                      </p>
                      <p className="text-gray-400 text-sm leading-relaxed mb-4">
                        Humanitarian and business leader with over two decades of experience engineering intelligent operating systems and scaling organizations. Achieved #2 in North America for Canon while working 60 hours/week and attending IWU full-time. Currently earning his '27 EMBA in AI Change Leadership at the DeVos School of Business at IWU. Drives enterprise-wide revenue growth through actuarial precision and ethical AI deployment.
                      </p>
                      <Link
                        href="/board-of-directors"
                        className="inline-flex items-center gap-2 text-blue-400 text-sm font-semibold hover:text-blue-300 transition-colors"
                      >
                        <span>View Full Profile</span>
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Dr. Michael Ochieng' */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="group relative"
              >
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-950/40 via-pink-900/40 to-blue-950/40 border border-purple-500/30 p-8 hover:border-purple-400/50 transition-all duration-500 hover:scale-[1.02]">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-pink-500/0 to-blue-500/0 group-hover:from-purple-500/10 group-hover:via-pink-500/10 group-hover:to-blue-500/10 transition-all duration-500" />
                  <div className="relative z-10">
                    <button
                      onClick={() => openLightbox(
                        "/1766487748644_1_.jpeg",
                        "Dr. Michael Ochieng'",
                        "Dr. Michael Ochieng'",
                        "Distinguished Chief Technology Officer"
                      )}
                      className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-purple-500/30 group-hover:border-purple-400/60 transition-all duration-500 cursor-pointer hover:scale-110"
                    >
                      <img
                        src="/1766487748644_1_.jpeg"
                        alt="Dr. Michael Ochieng'"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                        <span className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                          Click to enlarge
                        </span>
                      </div>
                    </button>
                    <div className="text-center">
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent mb-2">
                        Dr. Michael Ochieng'
                      </h3>
                      <p className="text-purple-400 font-semibold mb-4">
                        Distinguished Chief Technology Officer
                      </p>
                      <p className="text-gray-400 text-sm leading-relaxed mb-4">
                        Career forged in deploying large-scale LTE and 5G infrastructure for global operators like Verizon, T-Mobile, Sprint, Safaricom, and Huawei. Creator of DILLO (Decision Intelligence & Logic Layer Orchestrator) - the deterministic decision layer that governs AI systems before probabilistic outputs touch the real world. Treats AI as a liability engine that must be constrained before it can be deemed useful.
                      </p>
                      <Link
                        href="/board-of-directors"
                        className="inline-flex items-center gap-2 text-purple-400 text-sm font-semibold hover:text-purple-300 transition-colors"
                      >
                        <span>View Full Profile</span>
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Nicole Burns */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="group relative"
              >
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-pink-950/40 via-blue-900/40 to-purple-950/40 border border-pink-500/30 p-8 hover:border-pink-400/50 transition-all duration-500 hover:scale-[1.02]">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-pink-500/10 group-hover:via-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500" />
                  <div className="relative z-10">
                    <button
                      onClick={() => openLightbox(
                        "/1709575941859.jpeg",
                        "Nicole Burns",
                        "Nicole Burns",
                        "Go-To-Market (GTM) Expert"
                      )}
                      className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-pink-500/30 group-hover:border-pink-400/60 transition-all duration-500 cursor-pointer hover:scale-110"
                    >
                      <img
                        src="/1709575941859.jpeg"
                        alt="Nicole Burns"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                        <span className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                          Click to enlarge
                        </span>
                      </div>
                    </button>
                    <div className="text-center">
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-200 to-blue-200 bg-clip-text text-transparent mb-2">
                        Nicole Burns
                      </h3>
                      <p className="text-pink-400 font-semibold mb-4">
                        Go-To-Market (GTM) Expert
                      </p>
                      <p className="text-gray-400 text-sm leading-relaxed mb-4">
                        Recognized Go-To-Market strategy expert with extensive experience driving growth, strategic partnerships, and market expansion. She leads the commercialization strategy, translating complex actuarial and AI capabilities into compelling enterprise value propositions.
                      </p>
                      <Link
                        href="/company"
                        className="inline-flex items-center gap-2 text-pink-400 text-sm font-semibold hover:text-pink-300 transition-colors"
                      >
                        <span>View Full Profile</span>
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center mt-12"
            >
              <Link
                href="/company"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 text-white font-medium rounded-full hover:bg-white/10 transition-all hover:scale-105"
              >
                <span>Meet Our Full Board of Directors</span>
                <ChevronRight className="h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 bg-gradient-to-b from-gray-900/50 to-black">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Impact by the Numbers
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { 
                  value: "$2.4M", 
                  label: "Average First Year Savings",
                  gradient: "from-blue-900/20 via-blue-800/10 to-blue-900/20",
                  border: "border-blue-500/30",
                  textGradient: "from-blue-200 to-purple-200"
                },
                { 
                  value: "47%", 
                  label: "Reduction in Compliance Costs",
                  gradient: "from-purple-900/20 via-purple-800/10 to-purple-900/20",
                  border: "border-purple-500/30",
                  textGradient: "from-purple-200 to-pink-200"
                },
                { 
                  value: "99.8%", 
                  label: "Audit Trail Accuracy",
                  gradient: "from-pink-900/20 via-pink-800/10 to-pink-900/20",
                  border: "border-pink-500/30",
                  textGradient: "from-pink-200 to-blue-200"
                },
                { 
                  value: "24/7", 
                  label: "Real-Time Monitoring",
                  gradient: "from-blue-900/20 via-purple-800/10 to-pink-900/20",
                  border: "border-blue-500/30",
                  textGradient: "from-blue-200 via-purple-200 to-pink-200"
                }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`group relative text-center p-8 bg-gradient-to-br ${stat.gradient} rounded-xl border ${stat.border} hover:border-opacity-60 transition-all duration-500 hover:scale-105`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 rounded-xl transition-all duration-500" />
                  <div className="relative z-10">
                    <div className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${stat.textGradient} bg-clip-text text-transparent mb-2`}>
                      {stat.value}
                    </div>
                    <div className="text-gray-400">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-pink-900/20 rounded-2xl border border-blue-500/30 p-12 hover:border-blue-400/50 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 rounded-2xl transition-all duration-500" />
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
                  Ready to Transform Your Enterprise?
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Join the leading organizations using SiriusB iQ to drive measurable value through algorithmic intelligence.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/request-demo"
                    className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold rounded-full overflow-hidden transition-all hover:scale-105"
                  >
                    <span className="relative z-10">Schedule a Demo</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </Link>
                  <Link
                    href="/board-of-directors"
                    className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 text-white font-medium rounded-full hover:bg-white/10 transition-all hover:scale-105"
                  >
                    Meet Our Leadership
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}