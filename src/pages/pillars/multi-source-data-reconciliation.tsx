import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Database, GitMerge, CheckCircle2, AlertCircle, ArrowRight, Layers } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiduciaryPillarsSection } from "@/components/FiduciaryPillarsSection";

export default function MultiSourceDataReconciliation() {
  return (
    <>
      <SEO
        title="Multi-Source Data Reconciliation | Kincaid Health"
        description="Integration and normalization of claims data, contract formularies, and pricing benchmarks across disparate healthcare data sources for actuarial analysis."
      />
      <div className="min-h-screen bg-[#0A0F1E]">
        <Nav />

        {/* Hero Section with Premium Effects */}
        <section className="relative pt-32 pb-20 px-6 overflow-hidden">
          {/* Animated background orbs */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute top-1/3 left-1/4 w-[750px] h-[750px] bg-gradient-radial from-blue-500/20 via-blue-500/5 to-transparent rounded-full blur-3xl"
              animate={{ 
                x: [0, 80, 0],
                y: [0, -55, 0],
                scale: [1, 1.3, 1],
                opacity: [0.25, 0.45, 0.25]
              }}
              transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/3 w-[600px] h-[600px] bg-gradient-radial from-cyan-500/20 via-cyan-500/5 to-transparent rounded-full blur-3xl"
              animate={{ 
                x: [0, -60, 0],
                y: [0, 50, 0],
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-br from-[#1A3A52]/20 via-transparent to-blue-500/10" />
          
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 1, bounce: 0.4 }}
                className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-400 mb-6 backdrop-blur-sm"
              >
                <Database className="h-4 w-4" />
                Pillar 3 of 8
              </motion.div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
                Multi-Source Data<br />Reconciliation
              </h1>
              
              <p className="text-xl md:text-2xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
                Integration and normalization of claims data, contract formularies, and pricing benchmarks across disparate healthcare data sources for actuarial analysis.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative rounded-xl border border-[#2A3F54] bg-gradient-to-br from-[#151B23]/80 to-[#0F1419]/80 p-8 shadow-2xl backdrop-blur-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent rounded-xl" />
              
              <div className="space-y-6 relative z-10">
                <div className="grid md:grid-cols-4 gap-4">
                  {[
                    { label: "Data Sources", value: "14", subtext: "Systems integrated", color: "blue", particles: 10 },
                    { label: "Records Processed", value: "2.4M", subtext: "Per month", color: "emerald", particles: 12 },
                    { label: "Match Rate", value: "99.7%", subtext: "Automated", color: "amber", particles: 8 },
                    { label: "Processing Time", value: "4.2s", subtext: "Average", color: "purple", particles: 9 }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1, type: "spring" }}
                      className="group relative"
                    >
                      {/* Floating particles */}
                      <div className="absolute inset-0 pointer-events-none">
                        {Array.from({ length: stat.particles }).map((_, i) => (
                          <motion.div
                            key={i}
                            className={`absolute w-1 h-1 bg-${stat.color}-400/60 rounded-full`}
                            style={{
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                              y: [0, -18, 0],
                              x: [0, Math.random() * 10 - 5, 0],
                              opacity: [0, 1, 0],
                              scale: [0, 1.2, 0],
                            }}
                            transition={{
                              duration: 2.5 + Math.random() * 1,
                              repeat: Infinity,
                              delay: Math.random() * 2,
                              ease: "easeInOut"
                            }}
                          />
                        ))}
                      </div>

                      <motion.div 
                        className="bg-[#0A0F1E] rounded-lg border border-[#2A3F54] p-4 relative overflow-hidden"
                        whileHover={{ 
                          scale: 1.05,
                          borderColor: `rgba(59, 130, 246, 0.4)`,
                          boxShadow: "0 15px 35px -8px rgba(59, 130, 246, 0.25)"
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {/* Shimmer */}
                        <motion.div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                          initial={false}
                        >
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                            animate={{ x: ["-100%", "200%"] }}
                            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                          />
                        </motion.div>

                        <div className="text-xs text-neutral-500 mb-2 relative z-10">{stat.label}</div>
                        <motion.div 
                          className={`text-2xl font-bold text-${stat.color}-400 relative z-10`}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", delay: 0.6 + index * 0.1, duration: 1, bounce: 0.5 }}
                        >
                          {stat.value}
                        </motion.div>
                        <div className="text-xs text-neutral-400 mt-1 relative z-10">{stat.subtext}</div>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Key Features with Premium Cards */}
        <section className="py-20 border-t border-[#1F2937] relative overflow-hidden">
          {/* Background orb */}
          <motion.div
            className="absolute top-1/2 left-1/3 w-[850px] h-[850px] bg-gradient-radial from-blue-500/10 via-transparent to-transparent rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.35, 0.2]
            }}
            transition={{ duration: 21, repeat: Infinity }}
          />

          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-serif font-bold text-white mb-12 text-center"
            >
              Universal Healthcare Data Integration
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                { icon: GitMerge, title: "Automated Schema Mapping", description: "AI-powered field mapping across 837, 835, flat files, and custom PBM formats. No manual configuration—system learns structure from headers and validates against healthcare standards.", color: "blue", particles: 11 },
                { icon: CheckCircle2, title: "Real-Time Validation", description: "Every ingested record validated against NDC directories, ICD-10 codes, provider NPIs, and contract formularies. Errors flagged with specific remediation steps before processing continues.", color: "emerald", particles: 9 },
                { icon: Layers, title: "Cross-System Deduplication", description: "Fuzzy matching algorithms identify duplicate claims across PBM, TPA, and carrier systems. Resolves conflicts using hierarchical trust scoring—actual adjudicated claim data wins.", color: "amber", particles: 13 },
                { icon: Database, title: "Universal Data Model", description: "All data normalized into actuarial-grade common format. Compatible with industry simulation tools, fiduciary reporting standards, and regulatory submission requirements.", color: "purple", particles: 10 }
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15, type: "spring" }}
                    className="group relative"
                  >
                    {/* Floating particles */}
                    <div className="absolute inset-0 pointer-events-none">
                      {Array.from({ length: feature.particles }).map((_, i) => (
                        <motion.div
                          key={i}
                          className={`absolute w-1 h-1 bg-${feature.color}-400/60 rounded-full`}
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                          }}
                          animate={{
                            y: [0, -22, 0],
                            x: [0, Math.random() * 12 - 6, 0],
                            opacity: [0, 1, 0],
                            scale: [0, 1.3, 0],
                          }}
                          transition={{
                            duration: 2.8 + Math.random() * 1.2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                            ease: "easeInOut"
                          }}
                        />
                      ))}
                    </div>

                    <motion.div 
                      className="bg-[#151B23]/80 rounded-lg border border-[#2A3F54] p-8 backdrop-blur-sm relative overflow-hidden h-full"
                      whileHover={{ 
                        scale: 1.03,
                        rotateY: 3,
                        rotateX: -3,
                        borderColor: "rgba(59, 130, 246, 0.5)",
                        boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.35)"
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {/* Gradient glow */}
                      <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                        style={{
                          background: `radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15), transparent 70%)`
                        }}
                      />

                      {/* Shimmer */}
                      <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                        initial={false}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                          animate={{ x: ["-100%", "200%"] }}
                          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                        />
                      </motion.div>

                      <motion.div 
                        className={`w-12 h-12 rounded-full bg-${feature.color}-500/10 flex items-center justify-center mb-4 relative`}
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <Icon className={`h-6 w-6 text-${feature.color}-400`} />
                        <motion.div
                          className={`absolute inset-0 rounded-full border-2 border-${feature.color}-400/40`}
                          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                          transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
                        />
                      </motion.div>
                      <h3 className="text-xl font-semibold text-white mb-3 relative z-10">{feature.title}</h3>
                      <p className="text-neutral-400 leading-relaxed relative z-10">
                        {feature.description}
                      </p>

                      {/* Corner accents */}
                      <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-blue-500/0 group-hover:border-blue-500/60 rounded-tr-lg transition-all duration-500" />
                      <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-blue-500/0 group-hover:border-blue-500/60 rounded-bl-lg transition-all duration-500" />
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Data Quality Engineering */}
        <section className="py-20 border-t border-[#1F2937] bg-[#0A0F1E]">
          <div className="max-w-6xl mx-auto px-6">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-serif font-bold text-white mb-12 text-center"
            >
              Data Quality Engineering
            </motion.h2>

            <div className="space-y-6">
              {[
                { num: "1", title: "Completeness Enforcement", description: "Reject incomplete records upstream before they corrupt analysis. Required fields enforced per claim type—Rx claims need NDC, medical claims need procedure codes, all need member IDs.", color: "blue" },
                { num: "2", title: "Pricing Benchmark Integration", description: "Enrich claims with AWP, WAC, NADAC, and MAC pricing from First Databank and Medi-Span. Historical pricing tracked—catch retroactive spread adjustments and AWP inflation schemes.", color: "emerald" },
                { num: "3", title: "Contract Terms Matching", description: "Map every claim to its governing contract provision. Automated lookup tables link NDCs to formulary tiers, providers to network rates, and specialty drugs to carve-out terms.", color: "amber" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, type: "spring" }}
                  className="group"
                >
                  <motion.div 
                    className="bg-[#151B23] rounded-lg border border-[#2A3F54] p-6 backdrop-blur-sm"
                    whileHover={{ 
                      scale: 1.02,
                      borderColor: "rgba(59, 130, 246, 0.4)",
                      boxShadow: "0 10px 30px -5px rgba(59, 130, 246, 0.2)"
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <motion.div 
                        className={`w-8 h-8 rounded-full bg-${item.color}-500/10 flex items-center justify-center flex-shrink-0 mt-1 relative`}
                        whileHover={{ scale: 1.2 }}
                      >
                        <span className={`text-${item.color}-400 font-bold`}>{item.num}</span>
                        <motion.div
                          className={`absolute inset-0 rounded-full border-2 border-${item.color}-400/40`}
                          animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                        />
                      </motion.div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                        <p className="text-neutral-400">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 8 Pillars Navigation */}
        <FiduciaryPillarsSection />

        {/* CTA Section */}
        <section className="py-20 border-t border-[#1F2937]">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
                Turn Data Chaos Into Actuarial Truth
              </h2>
              <p className="text-xl text-neutral-400 mb-8">
                Manual reconciliation takes weeks and introduces errors. Automation delivers perfection in hours.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/request-demo">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white">
                      See Integration Demo
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </motion.div>
                </Link>
                <Link href="/">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button size="lg" variant="outline" className="border-[#2A3F54] text-white hover:bg-[#151B23]">
                      View All Pillars
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}