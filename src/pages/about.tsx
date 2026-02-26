"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Target, Users, Zap, Shield, TrendingUp, Award, Globe, Lightbulb } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Hero3D } from "@/components/Hero3D";

export default function AboutPage() {
  return (
    <>
      <SEO 
        title="About SiriusB iQ - Algorithmic Fiduciary Intelligence Platform"
        description="Learn about SiriusB iQ's mission to transform enterprise governance through algorithmic fiduciary intelligence, data orchestration, and agentic workflows."
      />
      <Nav />
      
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
                className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full mb-6"
              >
                <Shield className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-medium text-amber-300">Algorithmic Fiduciary Intelligence</span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-200 via-amber-100 to-white bg-clip-text text-transparent">
                Transforming Enterprise
                <br />
                <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-200 bg-clip-text text-transparent">
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
                  className="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-bold rounded-full hover:shadow-lg hover:shadow-amber-500/50 transition-all hover:scale-105"
                >
                  Schedule a Demo
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
                className="bg-gradient-to-br from-amber-900/20 via-amber-800/10 to-amber-900/20 rounded-2xl border border-amber-500/30 p-8"
              >
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center mb-6 border border-amber-500/30">
                  <Target className="w-8 h-8 text-amber-400" />
                </div>
                <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-amber-200 to-white bg-clip-text text-transparent">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-300 leading-relaxed">
                  To democratize enterprise-grade intelligence by creating the world's first algorithmic 
                  fiduciary platform that transforms raw data into actionable governance, compliance, and 
                  financial optimization insights—making sophisticated analysis accessible to organizations 
                  of all sizes.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-blue-900/20 via-blue-800/10 to-blue-900/20 rounded-2xl border border-blue-500/30 p-8"
              >
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center mb-6 border border-blue-500/30">
                  <Lightbulb className="w-8 h-8 text-blue-400" />
                </div>
                <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
                  Our Vision
                </h2>
                <p className="text-lg text-gray-300 leading-relaxed">
                  A future where every enterprise decision is powered by real-time, AI-driven intelligence—
                  where compliance is automated, risks are predicted before they materialize, and fiduciary 
                  duties are fulfilled with mathematical precision rather than manual effort.
                </p>
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
              <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-200 to-white bg-clip-text text-transparent">
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
                  description: "Every feature we build prioritizes the fiduciary duty to act in our clients' best interest"
                },
                {
                  icon: Zap,
                  title: "Speed to Value",
                  description: "Deliver measurable ROI in weeks, not months—real-time intelligence, immediate impact"
                },
                {
                  icon: Globe,
                  title: "Radical Transparency",
                  description: "Immutable audit trails, verifiable evidence, and complete visibility into every decision"
                },
                {
                  icon: Users,
                  title: "Democratic Intelligence",
                  description: "Enterprise-grade analytics accessible to organizations of all sizes, not just Fortune 500s"
                },
                {
                  icon: TrendingUp,
                  title: "Continuous Innovation",
                  description: "Relentless improvement through AI, automation, and cutting-edge technology"
                },
                {
                  icon: Award,
                  title: "Excellence Obsessed",
                  description: "World-class platform, exceptional support, uncompromising quality standards"
                },
                {
                  icon: Target,
                  title: "Outcome Driven",
                  description: "Measured by real savings, risk reduction, and compliance achievement—not features"
                },
                {
                  icon: Lightbulb,
                  title: "Thought Leadership",
                  description: "Pioneering new approaches to governance, compliance, and enterprise intelligence"
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
                    className="p-6 bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-xl border border-gray-700/50 hover:border-amber-500/50 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center mb-4 border border-amber-500/30 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-amber-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                    <p className="text-sm text-gray-400">{value.description}</p>
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
              <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-200 to-white bg-clip-text text-transparent">
                The Platform Story
              </h2>
            </motion.div>

            <div className="max-w-4xl mx-auto space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-800/60 to-gray-900/40 rounded-xl border border-gray-700/50 p-8"
              >
                <h3 className="text-2xl font-bold text-white mb-4">The Problem We Saw</h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Enterprises spend billions on healthcare, benefits, and vendor contracts—yet lack real-time 
                  visibility into where money goes, whether vendors deliver value, or if fiduciary duties are 
                  being met. Traditional audit approaches are manual, slow, and reactive. By the time problems 
                  are discovered, millions are already lost.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-800/60 to-gray-900/40 rounded-xl border border-gray-700/50 p-8"
              >
                <h3 className="text-2xl font-bold text-white mb-4">The SiriusB iQ Solution</h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  We built the world's first algorithmic fiduciary intelligence platform—a system that 
                  continuously ingests data from all enterprise sources, applies sophisticated AI analysis 
                  in real-time, and surfaces actionable insights through our Executive War Room. Every 
                  transaction is scored, every anomaly is flagged, and every opportunity is quantified—
                  automatically, 24/7/365.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-800/60 to-gray-900/40 rounded-xl border border-gray-700/50 p-8"
              >
                <h3 className="text-2xl font-bold text-white mb-4">Why It Matters</h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Our clients recover an average of $2.4M in the first year through our platform. More 
                  importantly, they gain permanent visibility into their operations—transforming from 
                  reactive crisis management to proactive optimization. Compliance becomes automated, 
                  risks are predicted before they materialize, and fiduciary duties are fulfilled with 
                  mathematical precision.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-200 to-white bg-clip-text text-transparent">
                Impact by the Numbers
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { value: "$2.4M", label: "Average First Year Savings" },
                { value: "47%", label: "Reduction in Compliance Costs" },
                { value: "99.8%", label: "Audit Trail Accuracy" },
                { value: "24/7", label: "Real-Time Monitoring" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center p-8 bg-gradient-to-br from-amber-900/20 via-amber-800/10 to-amber-900/20 rounded-xl border border-amber-500/30"
                >
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-200 to-white bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-b from-gray-900/50 to-black">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-amber-900/20 via-amber-800/10 to-amber-900/20 rounded-2xl border border-amber-500/30 p-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-amber-200 to-white bg-clip-text text-transparent">
                Ready to Transform Your Enterprise?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Join the leading organizations using SiriusB iQ to drive measurable value through algorithmic intelligence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/request-demo"
                  className="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-bold rounded-full hover:shadow-lg hover:shadow-amber-500/50 transition-all hover:scale-105"
                >
                  Schedule a Demo
                </Link>
                <Link
                  href="/board-of-directors"
                  className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 text-white font-medium rounded-full hover:bg-white/10 transition-all hover:scale-105"
                >
                  Meet Our Leadership
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}