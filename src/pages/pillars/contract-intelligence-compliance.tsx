import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { FileText, Scale, AlertTriangle, CheckCircle2, ArrowRight, Search } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiduciaryPillarsSection } from "@/components/FiduciaryPillarsSection";

export default function ContractIntelligenceCompliance() {
  return (
    <>
      <SEO
        title="Contract Intelligence & Compliance | Kincaid Health"
        description="Automated PBM contract clause extraction, fiduciary scoring, and continuous monitoring of contractual guarantee fulfillment against actual performance metrics."
      />
      <div className="min-h-screen bg-[#0A0F1E]">
        <Nav />

        {/* Hero Section with Premium Effects */}
        <section className="relative pt-32 pb-20 px-6 overflow-hidden">
          {/* Animated background orbs */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute top-1/4 right-1/4 w-[700px] h-[700px] bg-gradient-radial from-purple-500/20 via-purple-500/5 to-transparent rounded-full blur-3xl"
              animate={{ 
                x: [0, -65, 0],
                y: [0, 50, 0],
                scale: [1, 1.25, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-1/3 left-1/4 w-[550px] h-[550px] bg-gradient-radial from-fuchsia-500/20 via-fuchsia-500/5 to-transparent rounded-full blur-3xl"
              animate={{ 
                x: [0, 55, 0],
                y: [0, -45, 0],
                scale: [1, 1.2, 1],
                opacity: [0.25, 0.45, 0.25]
              }}
              transition={{ duration: 21, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-br from-[#1A3A52]/20 via-transparent to-purple-500/10" />
          
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
                className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-400 mb-6 backdrop-blur-sm"
              >
                <FileText className="h-4 w-4" />
                Pillar 4 of 8
              </motion.div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
                Contract Intelligence<br />& Compliance
              </h1>
              
              <p className="text-xl md:text-2xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
                Automated PBM contract clause extraction, fiduciary scoring, and continuous monitoring of contractual guarantee fulfillment against actual performance metrics.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative rounded-xl border border-[#2A3F54] bg-gradient-to-br from-[#151B23]/80 to-[#0F1419]/80 p-8 shadow-2xl backdrop-blur-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent rounded-xl" />
              
              <div className="space-y-6 relative z-10">
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { icon: AlertTriangle, label: "Active Violations", value: "34", subtext: "Requires action", color: "red", particles: 11 },
                    { icon: Scale, label: "Monitored Clauses", value: "127", subtext: "Per contract", color: "amber", particles: 9 },
                    { icon: CheckCircle2, label: "Compliance Score", value: "91%", subtext: "This quarter", color: "emerald", particles: 13 }
                  ].map((stat, index) => {
                    const Icon = stat.icon;
                    return (
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
                                y: [0, -20, 0],
                                x: [0, Math.random() * 10 - 5, 0],
                                opacity: [0, 1, 0],
                                scale: [0, 1.2, 0],
                              }}
                              transition={{
                                duration: 2.6 + Math.random() * 1.2,
                                repeat: Infinity,
                                delay: Math.random() * 2,
                                ease: "easeInOut"
                              }}
                            />
                          ))}
                        </div>

                        <motion.div 
                          className="bg-[#0A0F1E] rounded-lg border border-[#2A3F54] p-6 relative overflow-hidden"
                          whileHover={{ 
                            scale: 1.05,
                            borderColor: `rgba(168, 85, 247, 0.4)`,
                            boxShadow: "0 18px 38px -9px rgba(168, 85, 247, 0.28)"
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

                          <div className="flex items-center gap-3 mb-4 relative z-10">
                            <motion.div 
                              className={`w-10 h-10 rounded-full bg-${stat.color}-500/10 flex items-center justify-center relative`}
                              whileHover={{ scale: 1.2, rotate: 10 }}
                              transition={{ type: "spring", stiffness: 400 }}
                            >
                              <Icon className={`h-5 w-5 text-${stat.color}-400`} />
                              <motion.div
                                className={`absolute inset-0 rounded-full border-2 border-${stat.color}-400/40`}
                                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                                transition={{ duration: 2.3, repeat: Infinity, ease: "easeOut" }}
                              />
                            </motion.div>
                            <motion.div 
                              className="text-2xl font-bold text-white"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", delay: 0.6 + index * 0.1, duration: 1, bounce: 0.5 }}
                            >
                              {stat.value}
                            </motion.div>
                          </div>
                          <div className="text-sm text-neutral-400 relative z-10">{stat.label}</div>
                          <div className={`mt-2 text-xs text-${stat.color}-400 relative z-10`}>{stat.subtext}</div>
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Key Features with Premium Cards */}
        <section className="py-20 border-t border-[#1F2937] relative overflow-hidden">
          {/* Background orb */}
          <motion.div
            className="absolute top-1/2 right-1/4 w-[900px] h-[900px] bg-gradient-radial from-purple-500/10 via-transparent to-transparent rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.32, 1],
              opacity: [0.2, 0.38, 0.2]
            }}
            transition={{ duration: 23, repeat: Infinity }}
          />

          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-serif font-bold text-white mb-12 text-center"
            >
              Continuous Contract Enforcement
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                { icon: Search, title: "Automated Clause Extraction", description: "NLP-powered parsing of PBM, TPA, and carrier contracts. Extracts pricing guarantees, rebate terms, audit rights, MAC definitions, and fiduciary obligations into structured fields.", color: "purple", particles: 10 },
                { icon: Scale, title: "Fiduciary Risk Scoring", description: "Every clause rated for ERISA compliance risk. Red-flag provisions like discretionary AWP benchmarks, undisclosed rebate retention, or limited audit windows surface immediately.", color: "amber", particles: 12 },
                { icon: AlertTriangle, title: "Real-Time Violation Detection", description: "Claims data continuously tested against contractual obligations. Spread pricing exceeding agreed caps, rebate pass-through failures, or MAC overages flagged within 24 hours of occurrence.", color: "red", particles: 9 },
                { icon: FileText, title: "Negotiation Intelligence", description: "Compare your contract terms against peer benchmarks and industry standards. Identify weak audit rights, excessive discretionary pricing, or missing fiduciary protections before renewal.", color: "blue", particles: 11 }
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
                            y: [0, -24, 0],
                            x: [0, Math.random() * 13 - 6.5, 0],
                            opacity: [0, 1, 0],
                            scale: [0, 1.3, 0],
                          }}
                          transition={{
                            duration: 2.9 + Math.random() * 1.3,
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
                        borderColor: "rgba(168, 85, 247, 0.5)",
                        boxShadow: "0 25px 50px -12px rgba(168, 85, 247, 0.35)"
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {/* Gradient glow */}
                      <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                        style={{
                          background: `radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.15), transparent 70%)`
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
                      <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-purple-500/0 group-hover:border-purple-500/60 rounded-tr-lg transition-all duration-500" />
                      <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-purple-500/0 group-hover:border-purple-500/60 rounded-bl-lg transition-all duration-500" />
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contract Red Flags */}
        <section className="py-20 border-t border-[#1F2937] bg-[#0A0F1E]">
          <div className="max-w-6xl mx-auto px-6">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-serif font-bold text-white mb-12 text-center"
            >
              Contract Red Flags
            </motion.h2>

            <div className="space-y-6">
              {[
                { title: "Discretionary AWP Benchmarks", description: "\"PBM may use AWP as published by a nationally recognized source\" gives PBM power to pick highest AWP. Require specific source (First Databank, Medi-Span) with quarterly snapshot dates." },
                { title: "Limited Audit Rights", description: "\"Annual audit, 30-day notice, limited to financial records\" prevents continuous monitoring. Demand unlimited audit rights covering MAC lists, rebate calculations, and spread pricing methodologies." },
                { title: "Undisclosed Rebate Retention", description: "\"PBM shall share manufacturer rebates subject to GPO agreements\" hides retained rebates. Require 100% pass-through disclosure with manufacturer names, rebate amounts, and retention justifications." }
              ].map((flag, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, type: "spring" }}
                  className="group"
                >
                  <motion.div 
                    className="bg-[#151B23] rounded-lg border border-red-900/30 p-6"
                    whileHover={{ 
                      scale: 1.02,
                      borderColor: "rgba(239, 68, 68, 0.4)",
                      boxShadow: "0 10px 30px -5px rgba(239, 68, 68, 0.2)"
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <motion.div 
                        className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0 mt-1 relative"
                        whileHover={{ scale: 1.2 }}
                      >
                        <AlertTriangle className="h-5 w-5 text-red-400" />
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-red-400/40"
                          animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                        />
                      </motion.div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">{flag.title}</h3>
                        <p className="text-neutral-400">
                          {flag.description}
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
                Know What You Signed
              </h2>
              <p className="text-xl text-neutral-400 mb-8">
                Most plans don't know their own contract terms. We make them enforceable.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/request-demo">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button size="lg" className="bg-purple-500 hover:bg-purple-600 text-white">
                      Analyze Your Contract
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