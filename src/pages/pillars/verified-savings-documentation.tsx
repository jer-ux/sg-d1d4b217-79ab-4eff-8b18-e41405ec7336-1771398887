import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { FileText, CheckCircle, Clock, Shield, Database, ArrowRight, Download, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiduciaryPillarsSection } from "@/components/FiduciaryPillarsSection";

export default function VerifiedSavingsDocumentation() {
  return (
    <>
      <SEO
        title="Verified Savings Documentation | Kincaid Health"
        description="Timestamped audit trail documenting contract compliance events, overcharge recoveries, and third-party verification records with complete chain of custody."
      />
      <div className="min-h-screen bg-[#0A0F1E]">
        <Nav />

        {/* Hero Section with Premium Effects */}
        <section className="relative pt-32 pb-20 px-6 overflow-hidden">
          {/* Animated background orbs */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-radial from-[#B8860B]/20 via-[#B8860B]/5 to-transparent rounded-full blur-3xl"
              animate={{ 
                x: [0, 80, 0],
                y: [0, -40, 0],
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-radial from-emerald-500/20 via-emerald-500/5 to-transparent rounded-full blur-3xl"
              animate={{ 
                x: [0, -60, 0],
                y: [0, 50, 0],
                scale: [1, 1.15, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-br from-[#1A3A52]/20 via-transparent to-[#B8860B]/10" />
          
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
                className="inline-flex items-center gap-2 rounded-full border border-[#B8860B]/30 bg-[#B8860B]/10 px-4 py-2 text-sm text-[#B8860B] mb-6 backdrop-blur-sm"
              >
                <FileText className="h-4 w-4" />
                Pillar 1 of 8
              </motion.div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
                Verified Savings<br />Documentation
              </h1>
              
              <p className="text-xl md:text-2xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
                Timestamped audit trail documenting contract compliance events, overcharge recoveries, and third-party verification records with complete chain of custody.
              </p>
            </motion.div>

            {/* Hero Graphic with Premium Effects */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative rounded-xl border border-[#2A3F54] bg-gradient-to-br from-[#151B23]/80 to-[#0F1419]/80 p-8 shadow-2xl backdrop-blur-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-[#B8860B]/5 via-transparent to-transparent rounded-xl" />
              
              <div className="grid md:grid-cols-3 gap-6 relative z-10">
                {[
                  { icon: CheckCircle, label: "Documented Savings Events", value: "847", change: "+12% this month", color: "emerald" },
                  { icon: Shield, label: "Verified Recoveries", value: "$12.4M", change: "Fully audited", color: "amber" },
                  { icon: Database, label: "Chain of Custody", value: "100%", change: "Complete trail", color: "blue" }
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
                        {Array.from({ length: 8 }).map((_, i) => (
                          <motion.div
                            key={i}
                            className={`absolute w-1 h-1 bg-${stat.color}-400/60 rounded-full`}
                            style={{
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                              y: [0, -20, 0],
                              x: [0, Math.random() * 15 - 7.5, 0],
                              opacity: [0, 1, 0],
                              scale: [0, 1.2, 0],
                            }}
                            transition={{
                              duration: 2.5 + Math.random() * 1.5,
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
                          borderColor: "rgba(251, 191, 36, 0.4)",
                          boxShadow: "0 20px 40px -10px rgba(251, 191, 36, 0.3)"
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {/* Shimmer effect */}
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
                              animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                            />
                          </motion.div>
                          <motion.div 
                            className="text-2xl font-bold text-white"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 + index * 0.1 }}
                          >
                            {stat.value}
                          </motion.div>
                        </div>
                        <div className="text-sm text-neutral-400">{stat.label}</div>
                        <div className={`mt-2 text-xs text-${stat.color}-400`}>{stat.change}</div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Key Features with Premium Cards */}
        <section className="py-20 border-t border-[#1F2937] relative overflow-hidden">
          {/* Background orb */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-gradient-radial from-[#B8860B]/10 via-transparent to-transparent rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 20, repeat: Infinity }}
          />

          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-serif font-bold text-white mb-12 text-center"
            >
              Audit-Ready Documentation Standards
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                { icon: Clock, title: "Timestamped Evidence", description: "Every claim event, contract violation, and recovery action is captured with cryptographic timestamps. Immutable audit trail survives DOL inquiries and legal discovery.", color: "amber", particles: 10 },
                { icon: Shield, title: "Third-Party Verification", description: "Independent actuarial validation of all savings calculations. SSAE-18 SOC 2 Type II controls ensure forensic-grade accuracy and defensibility under audit.", color: "emerald", particles: 12 },
                { icon: FileText, title: "Complete Chain of Custody", description: "Full lineage tracking from initial claim event through recovery and reconciliation. Every data transformation logged with before/after states and calculation methodology.", color: "blue", particles: 8 },
                { icon: Download, title: "Board-Ready Exports", description: "One-click export of fiduciary documentation packages for board meetings, compliance reviews, and external audits. Pre-formatted for ERISA 404(c) safe harbor requirements.", color: "purple", particles: 11 }
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
                            y: [0, -25, 0],
                            x: [0, Math.random() * 15 - 7.5, 0],
                            opacity: [0, 1, 0],
                            scale: [0, 1.3, 0],
                          }}
                          transition={{
                            duration: 3 + Math.random() * 1.5,
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
                        borderColor: "rgba(251, 191, 36, 0.5)",
                        boxShadow: "0 25px 50px -12px rgba(251, 191, 36, 0.35)"
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {/* Gradient glow on hover */}
                      <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                        style={{
                          background: `radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.15), transparent 70%)`
                        }}
                      />

                      {/* Shimmer effect */}
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
                      <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#B8860B]/0 group-hover:border-[#B8860B]/60 rounded-tr-lg transition-all duration-500" />
                      <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[#B8860B]/0 group-hover:border-[#B8860B]/60 rounded-bl-lg transition-all duration-500" />
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-20 border-t border-[#1F2937] bg-[#0A0F1E]">
          <div className="max-w-6xl mx-auto px-6">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-serif font-bold text-white mb-12 text-center"
            >
              Built for Fiduciary Defense
            </motion.h2>

            <div className="space-y-6">
              {[
                { num: "1", title: "DOL Audit Response", description: "When the Department of Labor requests proof of fiduciary process, deliver complete documentation package showing continuous monitoring, timely action, and proper oversight of plan assets.", color: "amber" },
                { num: "2", title: "Board Fiduciary Reporting", description: "Present quantified evidence of plan stewardship to audit committees and boards of directors. Demonstrate compliance with fiduciary duty of prudence through documented cost control actions.", color: "emerald" },
                { num: "3", title: "Litigation Defense", description: "In excessive fee or breach of fiduciary duty claims, produce irrefutable evidence of monitoring activities, vendor oversight, and cost containment efforts with complete audit trail.", color: "blue" }
              ].map((useCase, index) => (
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
                      borderColor: "rgba(251, 191, 36, 0.4)",
                      boxShadow: "0 10px 30px -5px rgba(251, 191, 36, 0.2)"
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <motion.div 
                        className={`w-8 h-8 rounded-full bg-${useCase.color}-500/10 flex items-center justify-center flex-shrink-0 mt-1 relative`}
                        whileHover={{ scale: 1.2 }}
                      >
                        <span className={`text-${useCase.color}-400 font-bold`}>{useCase.num}</span>
                        <motion.div
                          className={`absolute inset-0 rounded-full border-2 border-${useCase.color}-400/40`}
                          animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                        />
                      </motion.div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">{useCase.title}</h3>
                        <p className="text-neutral-400">
                          {useCase.description}
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
                Start Building Your Fiduciary Record Today
              </h2>
              <p className="text-xl text-neutral-400 mb-8">
                Every day without documentation is a day of undefended fiduciary exposure.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/request-demo">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button size="lg" className="bg-[#B8860B] hover:bg-[#D4AF37] text-[#0A0F1E]">
                      Schedule Demo
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