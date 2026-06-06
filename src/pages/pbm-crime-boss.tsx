"use client";

import React, { useState } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { SiteFooter } from "@/components/site/SiteFooter";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import Link from "next/link";
import {
  AlertTriangle,
  DollarSign,
  TrendingDown,
  Shield,
  Eye,
  FileText,
  Users,
  Target,
  BarChart3,
  Zap,
  ExternalLink,
  Linkedin,
  X,
  ChevronLeft,
  ChevronRight,
  Calculator,
  TrendingUp
} from "lucide-react";

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
  // Lightbox state
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);
  
  // All images for lightbox navigation
  const allImages = [
    "/Firefly_Gemini_Flash_Your_PBM_Met_Every_Guarantee._You_Still_Lost_the_Money._Written_by_Jeremiah_Franklin_465075.png",
    "/Gemini_Generated_Image_9vb8yz9vb8yz9vb8_1_.png",
    "/Firefly_Gemini_Flash_A_Fortune_100_CIO_Made_A_Confession_To_Me_Last_Month._Written_by_Jeremiah_Franklin_Sh_28516.png",
    "/Firefly_Gemini_Flash_The_7.3_Billion_Question-_What_the_Big_Three_PBMs_Have_Cost_Your_Plan_Your_People_981473.png",
    "/Firefly_Gemini_Flash_Introducing_Rx_Defense_PBM_Contract_x-Ray-_The_Forensic_Infrastructure_That_Turns_Pha_743383.png",
    "/Gemini_Generated_Image_rzwmsjrzwmsjrzwm.png",
    "/Gemini_Generated_Image_6m5eog6m5eog6m5e.png",
    "/Gemini_Generated_Image_h7g1smh7g1smh7g1.png",
    "/IMG_0078.jpeg",
    "/Gemini_Generated_Image_gj2y6vgj2y6vgj2y.png",
    "/Gemini_Generated_Image_o22qego22qego22q.png",
    "/Gemini_Generated_Image_qm0m5kqm0m5kqm0m.png"
  ];

  const openLightbox = (imageSrc: string) => {
    const index = allImages.indexOf(imageSrc);
    setLightboxIndex(index >= 0 ? index : 0);
    setLightboxImage(imageSrc);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const nextImage = () => {
    const newIndex = (lightboxIndex + 1) % allImages.length;
    setLightboxIndex(newIndex);
    setLightboxImage(allImages[newIndex]);
  };

  const prevImage = () => {
    const newIndex = (lightboxIndex - 1 + allImages.length) % allImages.length;
    setLightboxIndex(newIndex);
    setLightboxImage(allImages[newIndex]);
  };

  return (
    <>
      <Head>
        <title>PBM Crime Boss - The $7.3 Billion Question | SiriusB iQ</title>
      </Head>
      <SEO
        title="PBM Crime Boss - LinkedIn Publication Series | SiriusB iQ"
        description="An investigative series exposing systematic exploitation in pharmacy benefit management. Follow the evidence trail on LinkedIn."
      />
      <Nav />

      <div className="min-h-screen bg-black text-white">
        {/* Lightbox */}
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white hover:text-rose-400 transition-colors z-10"
            >
              <X className="w-8 h-8" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-6 top-1/2 -translate-y-1/2 text-white hover:text-rose-400 transition-colors bg-black/50 rounded-full p-3 z-10"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-white hover:text-rose-400 transition-colors bg-black/50 rounded-full p-3 z-10"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              src={lightboxImage}
              alt="Expanded view"
              className="max-w-[90vw] max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm">
              {lightboxIndex + 1} / {allImages.length}
            </div>
          </motion.div>
        )}

        {/* Hero Banner with Image */}
        <section className="relative h-[70vh] min-h-[600px] overflow-hidden">
          {/* Background Image */}
          <div 
            className="absolute inset-0 cursor-pointer group"
            onClick={() => openLightbox("/Gemini_Generated_Image_9vb8yz9vb8yz9vb8_1_.png")}
          >
            <img 
              src="/Gemini_Generated_Image_9vb8yz9vb8yz9vb8_1_.png" 
              alt="PBM Crime Boss Investigation" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
              <Eye className="w-12 h-12 text-white" />
            </div>
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#050505]" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 h-full flex items-center justify-center px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-block mb-6"
              >
                <span className="inline-flex items-center gap-2 bg-rose-500/20 text-rose-400 px-4 py-2 rounded-full border border-rose-500/30 text-sm font-bold tracking-wider uppercase">
                  <AlertTriangle className="w-4 h-4" />
                  LinkedIn Investigation Series
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight"
              >
                Stop overpaying on your PBM contract
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-xl md:text-2xl text-slate-300 mb-10 leading-relaxed"
              >
                Exposing the hidden tactics that cost employer health plans millions in preventable prescription drug spend
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <a
                  href="https://www.linkedin.com/newsletters/former-pbm-crime-boss-speaks-7447883910010535936/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-rose-500/30 transition-all hover:scale-105"
                >
                  <ExternalLink className="w-5 h-5" />
                  Read on LinkedIn
                </a>
                <Link
                  href="/solutions/rx-defense"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg border border-white/20 transition-all hover:scale-105"
                >
                  <Shield className="w-5 h-5" />
                  Get Protected
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Secondary Hero Banner - New Image */}
        <section className="relative h-[500px] overflow-hidden my-20">
          <div 
            className="absolute inset-0 cursor-pointer group"
            onClick={() => openLightbox("/Firefly_Gemini_Flash_The_7.3_Billion_Question-_What_the_Big_Three_PBMs_Have_Cost_Your_Plan_Your_People_981473.png")}
          >
            <img 
              src="/Firefly_Gemini_Flash_The_7.3_Billion_Question-_What_the_Big_Three_PBMs_Have_Cost_Your_Plan_Your_People_981473.png" 
              alt="The $7.3 Billion Question" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
              <Eye className="w-12 h-12 text-white" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
          </div>

          <div className="relative z-10 h-full flex items-center px-6 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                The $7.3 Billion Question
              </h2>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                What the Big Three PBMs have cost your plan, your people, and your fiduciary duty of prudence. A forensic breakdown of systematic exploitation.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-rose-500/20 border border-rose-500/30 rounded-xl px-6 py-3">
                  <div className="text-3xl font-black text-rose-400">$7.3B</div>
                  <div className="text-sm text-slate-300">Big 3 PBM annual spread</div>
                </div>
                <div className="bg-orange-500/20 border border-orange-500/30 rounded-xl px-6 py-3">
                  <div className="text-3xl font-black text-orange-400">65%</div>
                  <div className="text-sm text-slate-300">Market concentration</div>
                </div>
                <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-xl px-6 py-3">
                  <div className="text-3xl font-black text-yellow-400">$4.8K</div>
                  <div className="text-sm text-slate-300">Per employee annual loss</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* RX Defense Introduction Banner */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl overflow-hidden border border-cyan-500/30 shadow-2xl"
            >
              <div 
                className="absolute inset-0 cursor-pointer group"
                onClick={() => openLightbox("/Firefly_Gemini_Flash_Introducing_Rx_Defense_PBM_Contract_x-Ray-_The_Forensic_Infrastructure_That_Turns_Pha_743383.png")}
              >
                <img
                  src="/Firefly_Gemini_Flash_Introducing_Rx_Defense_PBM_Contract_x-Ray-_The_Forensic_Infrastructure_That_Turns_Pha_743383.png"
                  alt="Introducing RX Defense"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                  <Eye className="w-12 h-12 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/85" />
              </div>

              <div className="relative p-12 md:p-16">
                <div className="max-w-4xl mx-auto text-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="inline-flex items-center gap-2 bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-6">
                      <Shield className="w-4 h-4" />
                      Introducing RX Defense
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
                      PBM Contract X-Ray
                    </h2>
                    <p className="text-2xl text-slate-300 mb-8 leading-relaxed">
                      The forensic infrastructure that turns pharmacy contracts into evidence. Every hidden fee. Every exploitative clause. Every fiduciary breach—documented and quantified.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link
                        href="/solutions/rx-defense"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-cyan-500/30 transition-all hover:scale-105"
                      >
                        <Shield className="w-5 h-5" />
                        Launch RX Defense
                      </Link>
                      <a
                        href="https://www.linkedin.com/newsletters/former-pbm-crime-boss-speaks-7447883910010535936/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg border border-white/20 transition-all hover:scale-105"
                      >
                        <ExternalLink className="w-5 h-5" />
                        Read Full Story
                      </a>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CIO Confession Featured Banner */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl overflow-hidden border-2 border-purple-500/40 shadow-2xl shadow-purple-500/20 hover:shadow-purple-500/40 transition-shadow duration-500 group"
            >
              <div 
                className="absolute inset-0 cursor-pointer"
                onClick={() => openLightbox("/Firefly_Gemini_Flash_A_Fortune_100_CIO_Made_A_Confession_To_Me_Last_Month._Written_by_Jeremiah_Franklin_Sh_28516.png")}
              >
                <img
                  src="/Firefly_Gemini_Flash_A_Fortune_100_CIO_Made_A_Confession_To_Me_Last_Month._Written_by_Jeremiah_Franklin_Sh_28516.png"
                  alt="Fortune 100 CIO Confession"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                  <Eye className="w-12 h-12 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-transparent" />
              </div>

              <div className="relative p-12 md:p-16 flex items-center min-h-[500px]">
                <div className="max-w-2xl">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-400/40 rounded-full text-purple-300 text-sm font-bold mb-6">
                      <Users className="h-4 w-4" />
                      EXECUTIVE TESTIMONY
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
                      A Fortune 100 CIO<br />Made A Confession
                    </h2>
                    <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                      "We knew our PBM was overcharging us. We just didn't know how to prove it." A candid conversation revealing why even the most sophisticated organizations struggle to defend against PBM exploitation.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <motion.a
                        href="https://www.linkedin.com/newsletters/former-pbm-crime-boss-speaks-7447883910010535936/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-xl text-white font-bold text-lg transition-all shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FileText className="h-5 w-5" />
                        Read the Confession
                        <ExternalLink className="h-4 w-4" />
                      </motion.a>
                      <motion.a
                        href="/solutions/rx-defense"
                        className="inline-flex items-center gap-3 px-8 py-4 border-2 border-purple-500/50 hover:border-purple-400 rounded-xl text-purple-300 hover:text-white font-bold text-lg transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Shield className="h-5 w-5" />
                        Get the Proof You Need
                      </motion.a>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Crime Boss Investigation Banner */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl overflow-hidden border-2 border-amber-500/40 shadow-2xl shadow-amber-500/20 hover:shadow-amber-500/40 transition-shadow duration-500 group cursor-pointer"
              onClick={() => openLightbox("/Gemini_Generated_Image_qm0m5kqm0m5kqm0m.png")}
            >
              <div className="absolute inset-0">
                <img
                  src="/Gemini_Generated_Image_qm0m5kqm0m5kqm0m.png"
                  alt="PBM Crime Boss Investigation"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                  <Eye className="w-12 h-12 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-transparent" />
              </div>

              <div className="relative p-12 md:p-16 flex items-center min-h-[500px]">
                <div className="max-w-2xl">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-400/40 rounded-full text-amber-300 text-sm font-bold mb-6">
                      <AlertTriangle className="h-4 w-4" />
                      INSIDER EXPOSÉ
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
                      Former PBM Crime Boss<br />Speaks Out
                    </h2>
                    <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                      An unprecedented insider account of the systematic exploitation tactics used to extract billions from employer health plans. From pricing manipulation to contractual deception—the complete playbook exposed.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <motion.a
                        href="https://www.linkedin.com/newsletters/former-pbm-crime-boss-speaks-7447883910010535936/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 rounded-xl text-white font-bold text-lg transition-all shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FileText className="h-5 w-5" />
                        Read the Exposé
                        <ExternalLink className="h-4 w-4" />
                      </motion.a>
                      <motion.a
                        href="/solutions/rx-defense"
                        className="inline-flex items-center gap-3 px-8 py-4 border-2 border-amber-500/50 hover:border-amber-400 rounded-xl text-amber-300 hover:text-white font-bold text-lg transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Shield className="h-5 w-5" />
                        Protect Your Plan
                      </motion.a>
                    </div>
                  </motion.div>
                </div>
              </div>
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
                  src="/Gemini_Generated_Image_9vb8yz9vb8yz9vb8_1_.png"
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

        {/* Featured Article: Your PBM Met Every Guarantee */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl overflow-hidden border-2 border-amber-500/40 shadow-2xl shadow-amber-500/20 hover:shadow-amber-500/40 transition-shadow duration-500 group"
            >
              <div 
                className="absolute inset-0 cursor-pointer"
                onClick={() => openLightbox("/Firefly_Gemini_Flash_Your_PBM_Met_Every_Guarantee._You_Still_Lost_the_Money._Written_by_Jeremiah_Franklin_465075.png")}
              >
                <img
                  src="/Firefly_Gemini_Flash_Your_PBM_Met_Every_Guarantee._You_Still_Lost_the_Money._Written_by_Jeremiah_Franklin_465075.png"
                  alt="Your PBM Met Every Guarantee. You Still Lost the Money."
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                  <Eye className="w-12 h-12 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-transparent" />
              </div>

              <div className="relative p-12 md:p-20 flex items-center min-h-[600px]">
                <div className="max-w-3xl">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-400/40 rounded-full text-amber-300 text-sm font-bold mb-6">
                      <FileText className="h-4 w-4" />
                      FEATURED INVESTIGATION
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
                      Your PBM Met<br />Every Guarantee.<br />
                      <span className="text-amber-400">You Still Lost the Money.</span>
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
                      A forensic breakdown of how pharmacy benefit managers meet every contractual performance guarantee while systematically extracting millions through loopholes your legal team never saw coming.
                    </p>
                    <div className="bg-black/60 backdrop-blur-sm border border-amber-500/30 rounded-xl p-6 mb-8">
                      <div className="grid grid-cols-3 gap-6">
                        <div>
                          <div className="text-3xl font-black text-amber-400 mb-1">100%</div>
                          <div className="text-sm text-gray-400">Guarantees met</div>
                        </div>
                        <div>
                          <div className="text-3xl font-black text-rose-400 mb-1">$2.8M</div>
                          <div className="text-sm text-gray-400">Still lost</div>
                        </div>
                        <div>
                          <div className="text-3xl font-black text-orange-400 mb-1">14</div>
                          <div className="text-sm text-gray-400">Hidden leakage points</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <motion.a
                        href="https://www.linkedin.com/newsletters/former-pbm-crime-boss-speaks-7447883910010535936/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 rounded-xl text-white font-bold text-lg transition-all shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FileText className="h-5 w-5" />
                        Read the Investigation
                        <ExternalLink className="h-4 w-4" />
                      </motion.a>
                      <motion.a
                        href="/solutions/rx-defense"
                        className="inline-flex items-center gap-3 px-8 py-4 border-2 border-amber-500/50 hover:border-amber-400 rounded-xl text-amber-300 hover:text-white font-bold text-lg transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Shield className="h-5 w-5" />
                        Audit My Contract
                      </motion.a>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Episode Cards */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Investigation Episodes</h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Deep dives into the most egregious PBM contract provisions that systematically overcharge employer plans
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[
              {
                episode: 1,
                title: "The Spread Pricing Scam",
                description: "How PBMs pocket the difference between what they charge you and what they pay pharmacies",
                impact: "$1.2M average annual impact",
                readTime: "8 min read",
                image: "/Gemini_Generated_Image_6m5eog6m5eog6m5e.png"
              },
              {
                episode: 2,
                title: "Rebate Retention Schemes",
                description: "The manufacturer payments that never make it to your bottom line",
                impact: "$840K average annual impact",
                readTime: "10 min read",
                image: "/Gemini_Generated_Image_h7g1smh7g1smh7g1.png"
              },
              {
                episode: 3,
                title: "Data Monetization",
                description: "Your prescription data sold without permission or profit sharing",
                impact: "$320K average annual impact",
                readTime: "7 min read",
                image: "/IMG_0078.jpeg"
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 hover:border-rose-500/50 transition-all duration-300 hover:scale-105 cursor-pointer"
                onClick={() => openLightbox(item.image)}
              >
                {/* Background Image */}
                <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
                  <img 
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye className="w-8 h-8 text-white" />
                  </div>
                </div>

                <div className="relative p-8">
                  <div className="inline-flex items-center gap-2 bg-rose-500/20 text-rose-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                    Episode {item.episode}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-rose-400 transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-slate-400 mb-6 leading-relaxed">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="text-rose-400 font-bold">{item.impact}</span>
                    <span className="text-slate-500 text-sm">{item.readTime}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Investigation Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <h3 className="text-3xl font-bold text-white mb-8 text-center">Latest Investigations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "The MAC List Manipulation",
                  subtitle: "Inside the pricing methodology that costs plans millions",
                  image: "/Gemini_Generated_Image_gj2y6vgj2y6vgj2y.png",
                  impact: "$960K",
                  category: "Pricing Fraud"
                },
                {
                  title: "Specialty Drug Steering",
                  subtitle: "How PBMs force high-cost channels for profit",
                  image: "/Gemini_Generated_Image_rzwmsjrzwmsjrzwm.png",
                  impact: "$580K",
                  category: "Network Abuse"
                }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: idx === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 hover:border-orange-500/50 transition-all duration-300 cursor-pointer"
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="absolute inset-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
                  </div>

                  <div className="relative p-8 min-h-[350px] flex flex-col justify-end">
                    <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 w-fit">
                      {item.category}
                    </div>
                    <h4 className="text-3xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-slate-300 mb-4">
                      {item.subtitle}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <span className="text-orange-400 font-bold text-lg">{item.impact} Annual Impact</span>
                      <ExternalLink className="w-5 h-5 text-slate-500 group-hover:text-orange-400 transition-colors" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Full Width Feature Banner with Second Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl mb-20"
          >
            <div className="absolute inset-0">
              <img 
                src="/Gemini_Generated_Image_9vb8yz9vb8yz9vb8_1_.png" 
                alt="Contract Analysis" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
            </div>

            <div className="relative z-10 p-12 md:p-16 text-center">
              <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-400 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-6">
                <TrendingUp className="w-4 h-4" />
                Featured Analysis
              </div>
              
              <h3 className="text-4xl md:text-5xl font-black text-white mb-6 max-w-4xl mx-auto leading-tight">
                Is Your PBM Contract a Fiduciary Time Bomb?
              </h3>
              
              <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                New DOL guidance puts plan sponsors on the hook for PBM oversight failures. Learn how to protect yourself from personal liability.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://www.linkedin.com/newsletters/former-pbm-crime-boss-speaks-7447883910010535936/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-amber-500/30 transition-all hover:scale-105"
                >
                  <FileText className="w-5 h-5" />
                  Read Full Article
                </a>
                <Link
                  href="/solutions/rx-defense"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg border border-white/20 transition-all hover:scale-105"
                >
                  <Shield className="w-5 h-5" />
                  Audit My Contract
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Three Column Image Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <h3 className="text-3xl font-bold text-white mb-8 text-center">Key Evidence</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  image: "/Gemini_Generated_Image_6m5eog6m5eog6m5e.png",
                  title: "Contract Forensics",
                  description: "Line-by-line analysis exposing hidden provisions"
                },
                {
                  image: "/Gemini_Generated_Image_h7g1smh7g1smh7g1.png",
                  title: "Financial Impact",
                  description: "Quantified loss calculations by provision"
                },
                {
                  image: "/IMG_0078.jpeg",
                  title: "Benchmark Comparison",
                  description: "Your contract vs. best-in-class protections"
                }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  className="group relative overflow-hidden rounded-xl border border-white/10 hover:border-cyan-500/50 transition-all cursor-pointer"
                  whileHover={{ y: -5 }}
                  onClick={() => openLightbox(item.image)}
                >
                  <div className="aspect-video overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                      <Eye className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <div className="p-6 bg-zinc-900">
                    <h4 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-slate-400 text-sm">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Split Banner Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">

            {/* New Featured Investigation Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl overflow-hidden border-2 border-cyan-500/40 shadow-2xl shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-shadow duration-500 mb-6 group cursor-pointer"
              onClick={() => openLightbox("/Gemini_Generated_Image_o22qego22qego22q.png")}
            >
              <div className="absolute inset-0">
                <img
                  src="/Gemini_Generated_Image_o22qego22qego22q.png"
                  alt="PBM Contract Deep Dive"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                  <Eye className="w-12 h-12 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-transparent" />
              </div>

              <div className="relative p-12 md:p-16 flex items-center min-h-[500px]">
                <div className="max-w-2xl">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/20 border border-cyan-400/40 rounded-full text-cyan-300 text-sm font-bold mb-6">
                      <BarChart3 className="h-4 w-4" />
                      DEEP ANALYSIS
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
                      The Hidden Cost Structure
                    </h2>
                    <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                      A visual breakdown of the systematic cost inflation embedded in standard PBM contracts. Every layer of markup, every hidden fee, every contractual loophole—exposed and quantified.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <motion.a
                        href="https://www.linkedin.com/newsletters/former-pbm-crime-boss-speaks-7447883910010535936/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 rounded-xl text-white font-bold text-lg transition-all shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FileText className="h-5 w-5" />
                        Read Analysis
                        <ExternalLink className="h-4 w-4" />
                      </motion.a>
                      <motion.a
                        href="/solutions/rx-defense"
                        className="inline-flex items-center gap-3 px-8 py-4 border-2 border-cyan-500/50 hover:border-cyan-400 rounded-xl text-cyan-300 hover:text-white font-bold text-lg transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Calculator className="h-5 w-5" />
                        Calculate Your Loss
                      </motion.a>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

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
                    src="/Firefly_Gemini_Flash_Introducing_Rx_Defense_PBM_Contract_x-Ray-_The_Forensic_Infrastructure_That_Turns_Pha_743383.png"
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
                    src="/Firefly_Gemini_Flash_The_7.3_Billion_Question-_What_the_Big_Three_PBMs_Have_Cost_Your_Plan_Your_People_981473.png"
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
                    href="https://www.linkedin.com/newsletters/former-pbm-crime-boss-speaks-7447883910010535936/"
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