"use client";

import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { AlertTriangle, Shield, TrendingUp, ExternalLink, Linkedin, FileText, Target, Eye } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";

const publications = [
  {
    title: "Episode 1: The Hidden Spread - AWP Gaming Exposed",
    excerpt: "How PBMs exploit Average Wholesale Price to capture billions in undisclosed spreads from unsuspecting plan sponsors.",
    publishDate: "March 2026",
    impactAmount: "$1.2M",
    readTime: "12 min"
  },
  {
    title: "Episode 2: Rebate Retention Schemes",
    excerpt: "The systematic capture and retention of manufacturer rebates that should be returned to plan sponsors.",
    publishDate: "March 2026",
    impactAmount: "$840K",
    readTime: "10 min"
  },
  {
    title: "Episode 3: MAC List Manipulation",
    excerpt: "Inside the Maximum Allowable Cost list gaming that costs employers millions annually.",
    publishDate: "April 2026",
    impactAmount: "$960K",
    readTime: "15 min"
  }
];

export default function PBMCrimeBossPage() {
  return (
    <>
      <SEO
        title="PBM Crime Boss - LinkedIn Publication Series | SiriusB iQ"
        description="An investigative series exposing systematic exploitation in pharmacy benefit management. Follow the evidence trail on LinkedIn."
      />
      <Nav />

      <div className="min-h-screen bg-black text-white">
        {/* Hero Banner with Image Overlay */}
        <section className="relative pt-32 pb-0 overflow-hidden h-[600px]">
          <div className="absolute inset-0">
            <motion.img
              src="/Gemini_Generated_Image_rzwmsjrzwmsjrzwm.png"
              alt="PBM Crime Boss Investigation"
              className="w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5 }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black" />
            <div className="absolute inset-0 bg-gradient-to-r from-rose-950/40 via-transparent to-red-950/40" />
          </div>

          <div className="relative h-full flex items-center justify-center max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-4 mb-6">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <AlertTriangle className="h-16 w-16 text-rose-400 drop-shadow-[0_0_20px_rgba(251,113,133,0.6)]" />
                </motion.div>
                <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-rose-200 via-red-100 to-white bg-clip-text text-transparent drop-shadow-2xl">
                  PBM Crime Boss
                </h1>
              </div>
              <p className="text-2xl md:text-3xl text-gray-200 font-bold max-w-4xl mx-auto mb-4 drop-shadow-lg">
                An Investigative LinkedIn Publication Series
              </p>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10 drop-shadow-md">
                Exposing systematic exploitation in pharmacy benefit management through forensic evidence
              </p>

              <motion.a
                href="https://www.linkedin.com/in/shrack"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 rounded-2xl text-white font-bold text-xl transition-all shadow-2xl hover:shadow-rose-500/50 border border-rose-400/30"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin className="h-7 w-7" />
                Follow the Investigation
                <ExternalLink className="h-6 w-6" />
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* Impact Banner */}
        <section className="py-20 bg-gradient-to-b from-black via-rose-950/10 to-black">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl overflow-hidden"
            >
              <div className="absolute inset-0">
                <img
                  src="/Gemini_Generated_Image_rzwmsjrzwmsjrzwm.png"
                  alt="Investigation Impact"
                  className="w-full h-full object-cover opacity-20 blur-sm"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-rose-950/90 via-black/95 to-red-950/90" />
              </div>
              
              <div className="relative p-12 md:p-16">
                <div className="grid md:grid-cols-3 gap-8 text-center">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="group"
                  >
                    <div className="text-6xl font-black text-rose-400 mb-3 drop-shadow-[0_0_10px_rgba(251,113,133,0.5)]">$3.6M</div>
                    <div className="text-xl text-gray-300 font-semibold mb-2">Average Annual Impact</div>
                    <div className="text-sm text-gray-500">Per typical employer (1500 lives)</div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="group"
                  >
                    <div className="text-6xl font-black text-red-400 mb-3 drop-shadow-[0_0_10px_rgba(248,113,113,0.5)]">38/100</div>
                    <div className="text-xl text-gray-300 font-semibold mb-2">Average Contract Score</div>
                    <div className="text-sm text-gray-500">Bottom 12th percentile nationally</div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="group"
                  >
                    <div className="text-6xl font-black text-orange-400 mb-3 drop-shadow-[0_0_10px_rgba(251,146,60,0.5)]">10+</div>
                    <div className="text-xl text-gray-300 font-semibold mb-2">Exploitation Tactics</div>
                    <div className="text-sm text-gray-500">Documented and proven</div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Article Banner */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl overflow-hidden border-2 border-rose-500/40 shadow-2xl shadow-rose-500/20 hover:shadow-rose-500/40 transition-shadow duration-500 group"
            >
              <div className="absolute inset-0">
                <img
                  src="/Gemini_Generated_Image_rzwmsjrzwmsjrzwm.png"
                  alt="Featured Investigation"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-transparent" />
              </div>

              <div className="relative p-12 md:p-16 flex items-center min-h-[500px]">
                <div className="max-w-2xl">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-500/20 border border-rose-400/40 rounded-full text-rose-300 text-sm font-bold mb-6">
                      <Target className="h-4 w-4" />
                      FEATURED INVESTIGATION
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
                      The $20 Billion<br />PBM Spread Scandal
                    </h2>
                    <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                      A forensic analysis revealing how pharmacy benefit managers systematically extract billions through hidden spreads, undisclosed rebates, and contract manipulation—costing American employers an estimated $20B annually.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <motion.a
                        href="https://www.linkedin.com/in/shrack"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 rounded-xl text-white font-bold text-lg transition-all shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FileText className="h-5 w-5" />
                        Read Full Series
                        <ExternalLink className="h-4 w-4" />
                      </motion.a>
                      <motion.a
                        href="/solutions/rx-defense"
                        className="inline-flex items-center gap-3 px-8 py-4 border-2 border-rose-500/50 hover:border-rose-400 rounded-xl text-rose-300 hover:text-white font-bold text-lg transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Eye className="h-5 w-5" />
                        Analyze Your Contract
                      </motion.a>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Episode Cards with Banner Backgrounds */}
        <section className="py-20 bg-gradient-to-b from-black via-rose-950/5 to-black">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-black text-rose-100 mb-4">
                The Investigation Episodes
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Follow the forensic evidence trail exposing systematic exploitation
              </p>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-3">
              {publications.map((article, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="group relative rounded-2xl overflow-hidden border border-rose-500/30 hover:border-rose-400/60 transition-all duration-500 hover:shadow-2xl hover:shadow-rose-500/20"
                  whileHover={{ y: -8 }}
                >
                  <div className="absolute inset-0">
                    <img
                      src="/Gemini_Generated_Image_rzwmsjrzwmsjrzwm.png"
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/95 to-black/60" />
                  </div>

                  <div className="relative p-8 flex flex-col h-full min-h-[450px]">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2 px-3 py-1 bg-rose-500/30 border border-rose-400/50 rounded-full">
                        <span className="text-rose-300 font-bold text-sm">Episode {idx + 1}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-black text-rose-400">{article.impactAmount}</div>
                        <div className="text-xs text-gray-500">Avg Impact</div>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-rose-100 mb-4 group-hover:text-white transition-colors leading-tight">
                      {article.title}
                    </h3>

                    <p className="text-gray-400 leading-relaxed mb-6 flex-1">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-rose-500/20">
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-rose-400 font-semibold">{article.publishDate}</span>
                        <span className="text-gray-600">•</span>
                        <span className="text-gray-500">{article.readTime}</span>
                      </div>
                      <motion.a
                        href="https://www.linkedin.com/in/shrack"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-rose-400 hover:text-rose-300 font-semibold text-sm transition-colors"
                        whileHover={{ x: 3 }}
                      >
                        Read
                        <ExternalLink className="h-4 w-4" />
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Split Banner Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative rounded-2xl overflow-hidden border border-rose-500/30 group hover:border-rose-400/60 transition-all"
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute inset-0">
                  <img
                    src="/Gemini_Generated_Image_rzwmsjrzwmsjrzwm.png"
                    alt="Contract Analysis"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-950/90 via-black/80 to-transparent" />
                </div>
                <div className="relative p-10 min-h-[400px] flex flex-col justify-end">
                  <Shield className="h-12 w-12 text-rose-400 mb-4" />
                  <h3 className="text-3xl font-bold text-white mb-3">Get Protected</h3>
                  <p className="text-gray-300 mb-6">Free forensic analysis of your PBM contract. Identify every exploitative provision.</p>
                  <motion.a
                    href="/solutions/rx-defense"
                    className="inline-flex items-center gap-2 text-rose-300 hover:text-white font-bold transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    Request Analysis
                    <ExternalLink className="h-4 w-4" />
                  </motion.a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative rounded-2xl overflow-hidden border border-rose-500/30 group hover:border-rose-400/60 transition-all"
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute inset-0">
                  <img
                    src="/Gemini_Generated_Image_rzwmsjrzwmsjrzwm.png"
                    alt="LinkedIn Follow"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-bl from-red-950/90 via-black/80 to-transparent" />
                </div>
                <div className="relative p-10 min-h-[400px] flex flex-col justify-end">
                  <Linkedin className="h-12 w-12 text-rose-400 mb-4" />
                  <h3 className="text-3xl font-bold text-white mb-3">Follow Updates</h3>
                  <p className="text-gray-300 mb-6">New episodes published weekly. Join 10,000+ industry professionals exposing PBM exploitation.</p>
                  <motion.a
                    href="https://www.linkedin.com/in/shrack"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-rose-300 hover:text-white font-bold transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    Follow on LinkedIn
                    <ExternalLink className="h-4 w-4" />
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Call to Action Banner */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl overflow-hidden border-2 border-rose-500/40"
            >
              <div className="absolute inset-0">
                <img
                  src="/Gemini_Generated_Image_rzwmsjrzwmsjrzwm.png"
                  alt="Take Action"
                  className="w-full h-full object-cover opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-rose-950/95 via-black/90 to-red-950/95" />
              </div>

              <div className="relative p-12 md:p-16 text-center">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                >
                  <AlertTriangle className="h-20 w-20 text-rose-400 mx-auto mb-8 drop-shadow-[0_0_20px_rgba(251,113,133,0.6)]" />
                </motion.div>
                <h2 className="text-5xl font-black text-white mb-6">
                  Is Your PBM Contract Clean?
                </h2>
                <p className="text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                  Get a forensic analysis of your PBM contract. We'll identify every overcharge, hidden fee, and exploitative provision.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <motion.a
                    href="/solutions/rx-defense"
                    className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 rounded-xl text-white font-bold text-xl transition-all shadow-2xl hover:shadow-rose-500/50"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Shield className="h-6 w-6" />
                    Request Contract Analysis
                  </motion.a>
                  <motion.a
                    href="/request-demo"
                    className="inline-flex items-center gap-3 px-10 py-5 border-2 border-rose-500/50 hover:border-rose-400 rounded-xl text-rose-300 hover:text-white font-bold text-xl transition-all"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <TrendingUp className="h-6 w-6" />
                    Schedule Demo
                  </motion.a>
                </div>
                <p className="text-base text-gray-500 mt-8 font-semibold">
                  Free Analysis • Results in 14 Days • No Commitment Required
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}