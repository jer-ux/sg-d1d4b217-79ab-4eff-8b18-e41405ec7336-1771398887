"use client";

import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { AlertTriangle, Shield, TrendingUp, ExternalLink, Linkedin } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";

const publications = [
  {
    title: "The PBM Crime Boss Series",
    description: "Exposing the hidden mechanisms of pharmacy benefit management exploitation",
    image: "/Gemini_Generated_Image_rzwmsjrzwmsjrzwm.png",
    linkedinUrl: "https://www.linkedin.com/in/shrack",
    articles: [
      {
        title: "Episode 1: The Hidden Spread - AWP Gaming Exposed",
        excerpt: "How PBMs exploit Average Wholesale Price to capture billions in undisclosed spreads from unsuspecting plan sponsors.",
        publishDate: "March 2026"
      },
      {
        title: "Episode 2: Rebate Retention Schemes",
        excerpt: "The systematic capture and retention of manufacturer rebates that should be returned to plan sponsors.",
        publishDate: "March 2026"
      },
      {
        title: "Episode 3: MAC List Manipulation",
        excerpt: "Inside the Maximum Allowable Cost list gaming that costs employers millions annually.",
        publishDate: "April 2026"
      }
    ]
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
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-rose-950/20 via-black to-black" />
          <div className="absolute inset-0">
            <div className="absolute top-20 left-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <AlertTriangle className="h-12 w-12 text-rose-400" />
                <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-rose-300 via-red-100 to-white bg-clip-text text-transparent">
                  PBM Crime Boss
                </h1>
              </div>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-4">
                An investigative LinkedIn publication series
              </p>
              <p className="text-base text-gray-400 max-w-2xl mx-auto mb-8">
                Exposing the systematic exploitation in pharmacy benefit management through evidence-backed forensic analysis
              </p>

              <motion.a
                href="https://www.linkedin.com/in/shrack"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 rounded-xl text-white font-bold text-lg transition-all shadow-lg hover:shadow-rose-500/25"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin className="h-6 w-6" />
                Follow on LinkedIn
                <ExternalLink className="h-5 w-5" />
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* Featured Banner */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl overflow-hidden border border-rose-500/30 bg-gradient-to-br from-zinc-900/50 to-black/50 p-2"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 via-transparent to-red-500/10" />
              <motion.img
                src="/Gemini_Generated_Image_rzwmsjrzwmsjrzwm.png"
                alt="PBM Crime Boss Series Banner"
                className="w-full h-auto rounded-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </div>
        </section>

        {/* Publication Series */}
        <section className="py-20 bg-gradient-to-b from-black via-rose-950/5 to-black">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-rose-100 mb-4">
                The Investigation Series
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Follow the forensic evidence trail exposing systematic exploitation in the PBM industry
              </p>
            </motion.div>

            {publications.map((pub, index) => (
              <div key={index} className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="bg-gradient-to-br from-zinc-900/40 to-black/40 border border-rose-500/20 rounded-2xl p-8"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-3xl font-bold text-rose-100 mb-2">{pub.title}</h3>
                      <p className="text-gray-400 text-lg">{pub.description}</p>
                    </div>
                    <motion.a
                      href={pub.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 hover:border-rose-400/60 rounded-lg text-rose-400 hover:text-rose-300 font-semibold transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Linkedin className="h-5 w-5" />
                      Read Series
                      <ExternalLink className="h-4 w-4" />
                    </motion.a>
                  </div>

                  <div className="grid gap-6 md:grid-cols-3">
                    {pub.articles.map((article, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: idx * 0.1 }}
                        className="group p-6 rounded-xl bg-black/40 border border-rose-500/10 hover:border-rose-500/30 transition-all duration-300"
                        whileHover={{ scale: 1.02, y: -4 }}
                      >
                        <div className="flex items-start gap-3 mb-4">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center border border-rose-500/30">
                            <span className="text-rose-400 font-bold text-sm">{idx + 1}</span>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-xl font-bold text-rose-100 mb-2 group-hover:text-rose-300 transition-colors">
                              {article.title}
                            </h4>
                            <p className="text-sm text-gray-400 leading-relaxed mb-3">
                              {article.excerpt}
                            </p>
                            <div className="text-xs text-rose-400 font-semibold">
                              {article.publishDate}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-rose-950/40 to-black/40 border border-rose-500/30 rounded-3xl p-12 text-center"
            >
              <AlertTriangle className="h-16 w-16 text-rose-400 mx-auto mb-6" />
              <h2 className="text-4xl font-bold text-white mb-4">
                Is Your PBM Contract Clean?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Get a forensic analysis of your PBM contract. We'll identify every overcharge, hidden fee, and exploitative provision.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/solutions/rx-defense"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 rounded-xl text-white font-bold text-lg transition-all shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Shield className="h-5 w-5" />
                  Request Contract Analysis
                </motion.a>
                <motion.a
                  href="/request-demo"
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-rose-500/50 hover:border-rose-400 rounded-xl text-rose-300 hover:text-white font-bold text-lg transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <TrendingUp className="h-5 w-5" />
                  Schedule Demo
                </motion.a>
              </div>
              <p className="text-sm text-gray-500 mt-6">
                Free analysis • Results in 14 days • No commitment required
              </p>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}