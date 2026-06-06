import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, TrendingUp, AlertTriangle, Search, Star, Award, ExternalLink, ChevronRight, Building2, Users, DollarSign, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";

interface ShadyEntity {
  name: string;
  type: string;
  score: number;
  grade: string;
  finding: string;
}

export default function ShadyBrokerIndex() {
  const [shadyEntities, setShadyEntities] = useState<ShadyEntity[]>([
    { name: "Apex Benefits Group", type: "Broker", score: 87, grade: "F", finding: "$2.1M in undisclosed override compensation from CVS Caremark" },
    { name: "National Health Advisors", type: "Consultant", score: 73, grade: "D", finding: "Blank Schedule A filings across 14 client plans" },
    { name: "Premier PBM Solutions", type: "PBM", score: 91, grade: "F", finding: "$4.7M in hidden spread pricing not disclosed to plan sponsors" },
    { name: "Executive Benefits Alliance", type: "Broker", score: 68, grade: "D", finding: "Formulaic compensation disclosure without actual amounts" },
    { name: "Strategic Health Partners", type: "Consultant", score: 82, grade: "F", finding: "$1.8M in contingent commissions from multiple carriers" }
  ]);

  return (
    <>
      <Head>
        <title>The Shady Broker Index | Broker Transparency Scoring | Kincaid Risk Management</title>
        <meta name="description" content="The first public leaderboard scoring brokers, consultants, and PBM intermediaries on transparency using DOL Form 5500 Schedule A compensation disclosures. Get your broker's Shady Score." />
        <meta property="og:title" content="The Shady Broker Index | Broker Transparency Scoring" />
        <meta property="og:description" content="The first public leaderboard scoring brokers on transparency using public DOL filings. Get your broker's Shady Score." />
        <meta property="og:image" content="/og-shady-broker-index.png" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
        {/* Hero */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          {/* Glass effect background */}
          <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 via-transparent to-amber-500/5" />
          <div className="absolute inset-0 backdrop-blur-3xl" />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8">
              <div className="text-sm font-medium text-rose-400 mb-4 tracking-wider">THE SHADY BROKER INDEX</div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Every basis point<br/>has a name.
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                The transparency score for the brokers, consultants, and PBMs running America's self-insured health plans. Built on public DOL filings. Scored by honest math.
              </p>
            </motion.div>

            {/* Live "Shadiest Entities" Strip */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="max-w-6xl mx-auto">
              <div className="bg-black/40 backdrop-blur-xl border border-rose-500/20 rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <AlertTriangle className="w-6 h-6 text-rose-400" />
                  <h3 className="text-xl font-bold text-white">The Shadiest Right Now</h3>
                  <span className="ml-auto px-3 py-1 bg-rose-500/10 border border-rose-500/20 rounded-full text-rose-300 text-sm">
                    Live Index
                  </span>
                </div>

                <div className="space-y-3">
                  {shadyEntities.map((entity, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                      className="flex items-start gap-4 p-4 bg-gradient-to-r from-rose-500/5 to-transparent border border-rose-500/10 rounded-xl hover:border-rose-500/30 transition-all group cursor-pointer">
                      {/* Grade Badge */}
                      <div className={`flex-shrink-0 w-16 h-16 rounded-xl flex flex-col items-center justify-center ${
                        entity.grade === 'F' ? 'bg-rose-500/20 border-2 border-rose-500' :
                        entity.grade === 'D' ? 'bg-orange-500/20 border-2 border-orange-500' :
                        'bg-amber-500/20 border-2 border-amber-500'
                      }`}>
                        <div className={`text-2xl font-bold ${
                          entity.grade === 'F' ? 'text-rose-300' :
                          entity.grade === 'D' ? 'text-orange-300' :
                          'text-amber-300'
                        }`}>{entity.grade}</div>
                        <div className="text-xs text-gray-400">{entity.score}</div>
                      </div>

                      {/* Entity Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-white group-hover:text-rose-300 transition-colors">{entity.name}</h4>
                          <span className="px-2 py-0.5 bg-gray-800 border border-gray-700 rounded text-xs text-gray-400">
                            {entity.type}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 line-clamp-1">{entity.finding}</p>
                      </div>

                      {/* Arrow */}
                      <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-rose-400 transition-colors flex-shrink-0" />
                    </motion.div>
                  ))}
                </div>

                <Link href="#index">
                  <Button variant="outline" className="w-full mt-6 border-rose-500/20 text-rose-300 hover:bg-rose-500/10">
                    View Full Index
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Live Strip - Shadiest Entities */}
        <section className="border-y border-rose-500/20 bg-gray-950/50 backdrop-blur-xl py-8">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-sm text-gray-400 mb-4 text-center">
              Live from the Index: Current F-grade entities
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: "Acme Benefits Group", grade: "F", score: 94, finding: "87% indirect compensation undisclosed in 2023 filings" },
                { name: "Premier Healthcare Advisors", grade: "F", score: 89, finding: "Schedule A fields incomplete across 14 client plans" },
                { name: "National Benefit Consultants", grade: "F", score: 86, finding: "Affiliate override arrangements not disclosed to plan sponsors" }
              ].map((entity, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  className="bg-gray-900/50 border border-rose-500/30 rounded-xl p-4 hover:border-rose-500/50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="font-medium text-white text-sm">{entity.name}</div>
                    <Badge className="bg-rose-500/10 text-rose-400 border-rose-500/30 font-mono">
                      {entity.grade}
                    </Badge>
                  </div>
                  <div className="text-3xl font-bold text-rose-400 mb-2">{entity.score}</div>
                  <p className="text-xs text-gray-400 leading-relaxed">{entity.finding}</p>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-6">
              <Link href="/shady-broker-index/index-table">
                <Button variant="outline" className="border-rose-500/30 text-rose-400 hover:bg-rose-500/10">
                  View Full Index
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">How The Shady Score Works</h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                A single composite metric derived from public DOL filings, on a 0-100 scale where higher means shadier
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-green-500/5 to-transparent border border-green-500/20 rounded-2xl p-8">
                <div className="w-16 h-16 bg-green-500/20 border-2 border-green-500 rounded-xl flex items-center justify-center mb-6">
                  <Award className="w-8 h-8 text-green-300" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">0-20: Grade A</h3>
                <p className="text-lg text-green-300 mb-2 font-semibold">Transparent</p>
                <p className="text-gray-400">Full compensation disclosure with Schedule A amounts cited</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-gradient-to-br from-amber-500/5 to-transparent border border-amber-500/20 rounded-2xl p-8">
                <div className="w-16 h-16 bg-amber-500/20 border-2 border-amber-500 rounded-xl flex items-center justify-center mb-6">
                  <AlertTriangle className="w-8 h-8 text-amber-300" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">41-60: Grade C</h3>
                <p className="text-lg text-amber-300 mb-2 font-semibold">Murky</p>
                <p className="text-gray-400">Formulaic disclosure or partial evidence of hidden comp</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gradient-to-br from-rose-500/5 to-transparent border border-rose-500/20 rounded-2xl p-8">
                <div className="w-16 h-16 bg-rose-500/20 border-2 border-rose-500 rounded-xl flex items-center justify-center mb-6">
                  <Shield className="w-8 h-8 text-rose-300" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">81-100: Grade F</h3>
                <p className="text-lg text-rose-300 mb-2 font-semibold">Egregious</p>
                <p className="text-gray-400">Blank filings or documented undisclosed override compensation</p>
              </motion.div>
            </div>

            <div className="bg-black/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-white">The Five Scoring Components</h3>
              <div className="space-y-4">
                {[
                  { name: "Schedule A Completeness", weight: "25%", desc: "How thoroughly compensation is disclosed in public filings" },
                  { name: "Hidden Override Detection", weight: "30%", desc: "Evidence of undisclosed compensation from carriers/PBMs" },
                  { name: "Conflict-of-Interest Markers", weight: "20%", desc: "Contingent commissions, dual roles, or steering incentives" },
                  { name: "Disclosure Consistency", weight: "15%", desc: "Year-over-year filing pattern and completeness trends" },
                  { name: "Source Document Quality", weight: "10%", desc: "Number of cited filings and epistemic confidence" }
                ].map((component, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 bg-gradient-to-r from-purple-500/5 to-transparent border border-purple-500/10 rounded-xl">
                    <div className="flex-shrink-0 w-12 h-12 bg-purple-500/20 border border-purple-500/30 rounded-lg flex items-center justify-center">
                      <span className="text-purple-300 font-bold">{component.weight}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">{component.name}</h4>
                      <p className="text-sm text-gray-400">{component.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Score My Broker Section */}
        <section id="score-my-broker" className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 via-transparent to-amber-500/5" />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Score My Broker</h2>
              <p className="text-xl text-gray-400">
                Get a free preliminary grade plus the top three red flags. Full forensic report available for $4,500.
              </p>
            </div>

            <div className="bg-black/60 backdrop-blur-xl border border-rose-500/20 rounded-2xl p-8 shadow-2xl">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Company Name *</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-rose-500/50 transition-colors"
                      placeholder="Your Company Inc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Plan EIN (Optional)</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-rose-500/50 transition-colors"
                      placeholder="12-3456789"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Plan Name (Optional)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-rose-500/50 transition-colors"
                    placeholder="Employee Health & Welfare Plan"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Broker/Consultant Name *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-rose-500/50 transition-colors"
                    placeholder="Benefits Advisor Group"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Your Email (Required for free grade) *</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-rose-500/50 transition-colors"
                    placeholder="you@company.com"
                  />
                </div>

                <Button className="w-full bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white text-lg py-6 shadow-xl shadow-rose-500/20">
                  Get Free Preliminary Grade
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  Your email is required to reveal the preliminary grade. Full forensic report ($4,500) available after free preview.
                </p>
              </form>
            </div>
          </div>
        </section>

        {/* The Index Preview */}
        <section id="index" className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">The Public Index</h2>
              <p className="text-xl text-gray-400">
                Every named broker, consultant, and PBM intermediary scored on transparency
              </p>
            </div>

            <div className="bg-black/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gradient-to-r from-gray-800/50 to-gray-900/50 border-b border-gray-700/50">
                <div className="col-span-4 text-sm font-semibold text-gray-300">Entity Name</div>
                <div className="col-span-2 text-sm font-semibold text-gray-300">Type</div>
                <div className="col-span-2 text-sm font-semibold text-gray-300">Score</div>
                <div className="col-span-1 text-sm font-semibold text-gray-300">Grade</div>
                <div className="col-span-3 text-sm font-semibold text-gray-300">Finding</div>
              </div>

              {/* Table Rows */}
              <div className="divide-y divide-gray-800/50">
                {shadyEntities.map((entity, i) => (
                  <div key={i} className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-white/5 transition-colors cursor-pointer group">
                    <div className="col-span-4">
                      <p className="font-semibold text-white group-hover:text-rose-300 transition-colors">{entity.name}</p>
                    </div>
                    <div className="col-span-2">
                      <span className="px-2 py-1 bg-gray-800 border border-gray-700 rounded text-xs text-gray-400">
                        {entity.type}
                      </span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-white font-mono">{entity.score}</span>
                    </div>
                    <div className="col-span-1">
                      <div className={`inline-block px-3 py-1 rounded-lg font-bold ${
                        entity.grade === 'F' ? 'bg-rose-500/20 border border-rose-500 text-rose-300' :
                        entity.grade === 'D' ? 'bg-orange-500/20 border border-orange-500 text-orange-300' :
                        'bg-amber-500/20 border border-amber-500 text-amber-300'
                      }`}>{entity.grade}</div>
                    </div>
                    <div className="col-span-3">
                      <p className="text-sm text-gray-400 line-clamp-2">{entity.finding}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center mt-8">
              <Link href="/shady-broker-index/full-index">
                <Button size="lg" variant="outline" className="border-gray-700 text-gray-300 hover:bg-white/5">
                  View Full Index (Coming Soon)
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* The Report Section */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-rose-500/5" />
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">The $4,500 Forensic Report</h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Everything your General Counsel, CFO, and Board need to act on hidden broker compensation
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {[
                { icon: FileText, title: "Complete Evidence Package", desc: "Every Schedule A filing, cross-referenced and annotated" },
                { icon: DollarSign, title: "Quantified Impact", desc: "Dollar-precise estimate of undisclosed compensation" },
                { icon: Shield, title: "Legal Framework", desc: "DOL guidance, ERISA fiduciary standards, case law" },
                { icon: Users, title: "Recommended Actions", desc: "Board-ready recommendations and vendor RFP language" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="flex items-start gap-4 p-6 bg-gradient-to-br from-amber-500/5 to-transparent border border-amber-500/20 rounded-xl">
                  <div className="flex-shrink-0 w-12 h-12 bg-amber-500/20 border border-amber-500/30 rounded-lg flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-amber-300" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="bg-black/60 backdrop-blur-xl border border-amber-500/20 rounded-2xl p-8 text-center">
              <p className="text-2xl font-bold text-white mb-4">$4,500 One-Time Fee</p>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                Delivered within 48 hours. The evidence your fiduciary committee needs to protect the plan and its participants.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="#score-my-broker">
                  <Button size="lg" className="bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white px-8 py-6">
                    Get Your Report
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-gray-700 text-gray-300 hover:bg-white/5">
                  Book a Consult Instead
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Methodology Link */}
        <section className="py-12 border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-gray-400 mb-4">
                All scores derived from public DOL Form 5500 Schedule A filings and modeling.
              </p>
              <div className="flex gap-6 justify-center text-sm">
                <Link href="/shady-broker-index/methodology" className="text-rose-300 hover:text-rose-200 transition-colors">
                  Scoring Methodology
                </Link>
                <Link href="/shady-broker-index/about" className="text-rose-300 hover:text-rose-200 transition-colors">
                  About This Index
                </Link>
                <Link href="/shady-broker-index/corrections" className="text-rose-300 hover:text-rose-200 transition-colors">
                  Request Correction
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}