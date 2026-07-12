import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Scale, Shield, FileCheck, AlertTriangle, ArrowRight, Gavel } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiduciaryPillarsSection } from "@/components/FiduciaryPillarsSection";

export default function RegulatoryLegalFramework() {
  return (
    <>
      <SEO
        title="Regulatory & Legal Framework | Kincaid Health"
        description="ERISA compliance monitoring, DOL audit readiness, and automated fiduciary documentation tracking to defend against litigation and regulatory penalties."
      />
      <div className="min-h-screen bg-[#0A0F1E]">
        <Nav />

        {/* Hero Section with Premium Effects */}
        <section className="relative pt-32 pb-20 px-6 overflow-hidden">
          {/* Animated background orbs */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-radial from-indigo-500/20 via-indigo-500/5 to-transparent rounded-full blur-3xl"
              animate={{ 
                x: [0, 75, 0],
                y: [0, -38, 0],
                scale: [1, 1.18, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-radial from-purple-500/20 via-purple-500/5 to-transparent rounded-full blur-3xl"
              animate={{ 
                x: [0, -58, 0],
                y: [0, 48, 0],
                scale: [1, 1.12, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ duration: 19, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
          </div>
          
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
                className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-400 mb-6"
              >
                <Scale className="h-4 w-4" />
                Pillar 7 of 8
              </motion.div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
                Regulatory & Legal<br />Framework
              </h1>
              
              <p className="text-xl md:text-2xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
                ERISA compliance monitoring, DOL audit readiness, and automated fiduciary documentation tracking to defend against litigation and regulatory penalties.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="relative rounded-xl border border-indigo-500/30 bg-gradient-to-br from-[#151B23] to-[#0F1419] p-8 shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent rounded-xl" />
              
              <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Shield className="h-6 w-6 text-indigo-400" />
                    <span className="text-sm font-semibold text-indigo-400">COMPLIANCE STATUS</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-sm text-emerald-400">Audit Ready</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-4 gap-4">
                  {[
                    { label: "Documents Tracked", value: "1,847", icon: FileCheck, color: "indigo" },
                    { label: "Compliance Rate", value: "98.7%", icon: Shield, color: "emerald" },
                    { label: "Violations Flagged", value: "3", icon: AlertTriangle, color: "yellow" },
                    { label: "Days to Audit Ready", value: "0", icon: Gavel, color: "cyan" }
                  ].map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        whileHover={{ scale: 1.05, borderColor: `rgba(99, 102, 241, 0.5)` }}
                        className="bg-[#0A0F1E] rounded-lg border border-[#2A3F54] p-4 relative overflow-hidden group"
                      >
                        {/* Hover glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-indigo-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{ background: `radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.1), transparent 70%)` }}
                        />

                        <div className="flex items-center gap-2 mb-3 relative z-10">
                          <Icon className={`h-5 w-5 text-${stat.color}-400`} />
                          <div className="text-xs text-neutral-500">{stat.label}</div>
                        </div>
                        <div className={`text-2xl font-bold text-${stat.color}-400 relative z-10`}>{stat.value}</div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section with Floating Particles */}
        <section className="py-20 border-t border-[#1F2937] relative overflow-hidden">
          {/* Background particles */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 18 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-indigo-400/40 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -42, 0],
                  x: [0, Math.random() * 22 - 11, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1.6, 0],
                }}
                transition={{
                  duration: 4.2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-serif font-bold text-white mb-12 text-center"
            >
              Automated Compliance Shield
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: Scale,
                  title: "ERISA 404(c) Documentation",
                  description: "Automated tracking of quarterly participant notifications, annual fee disclosures, and plan document amendments. Generates audit-ready evidence packages on demand.",
                  color: "indigo"
                },
                {
                  icon: Shield,
                  title: "Fiduciary Duty Verification",
                  description: "Monitor vendor selection, fee reasonableness reviews, and conflict-of-interest disclosures. Flag missing prudent process documentation before DOL requests it.",
                  color: "purple"
                },
                {
                  icon: FileCheck,
                  title: "Regulatory Change Monitoring",
                  description: "Receive alerts for new DOL guidance, IRS notices, and court decisions affecting health plan compliance. Automated impact analysis identifies required action items.",
                  color: "cyan"
                },
                {
                  icon: Gavel,
                  title: "Litigation Defense Prep",
                  description: "Continuous audit trail of all fiduciary decisions, benchmark comparisons, and corrective actions. Export timestamped evidence packages formatted for legal discovery.",
                  color: "emerald"
                }
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group"
                  >
                    <motion.div
                      className="bg-[#151B23] rounded-lg border border-[#2A3F54] p-8 h-full relative overflow-hidden"
                      whileHover={{ 
                        scale: 1.02,
                        borderColor: "rgba(99, 102, 241, 0.5)",
                        boxShadow: "0 20px 40px -10px rgba(99, 102, 241, 0.3)"
                      }}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {/* Hover gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-indigo-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: `radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.1), transparent 70%)` }}
                      />

                      <motion.div
                        className={`w-12 h-12 rounded-full bg-${feature.color}-500/10 flex items-center justify-center mb-4 relative z-10`}
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <Icon className={`h-6 w-6 text-${feature.color}-400`} />
                        <motion.div
                          className={`absolute inset-0 rounded-full border-2 border-${feature.color}-400/40`}
                          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </motion.div>
                      
                      <h3 className="text-xl font-semibold text-white mb-3 relative z-10">{feature.title}</h3>
                      <p className="text-neutral-400 leading-relaxed relative z-10">
                        {feature.description}
                      </p>

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
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 border-t border-[#1F2937] bg-[#0A0F1E]">
          <div className="max-w-6xl mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-serif font-bold text-white mb-12 text-center"
            >
              Regulatory Checkpoints
            </motion.h2>

            <div className="space-y-6">
              {[
                {
                  title: "Annual Form 5500 Validation",
                  description: "Pre-filing verification that Schedule A vendor fees match contract terms, participant counts reconcile to census, and plan characteristics align with SPD language.",
                  color: "indigo"
                },
                {
                  title: "Quarterly Fee Disclosure Review",
                  description: "408(b)(2) disclosure monitoring—flag missing service categories, unreasonable markup percentages, or undisclosed revenue-sharing arrangements before participant notices go out.",
                  color: "purple"
                },
                {
                  title: "Broker Compensation Transparency",
                  description: "Track disclosed vs. actual broker payments. Detect override commissions, contingent bonuses, or undisclosed soft-dollar arrangements that create ERISA conflicts.",
                  color: "cyan"
                }
              ].map((checkpoint, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 10, borderColor: "rgba(99, 102, 241, 0.5)" }}
                  className={`bg-[#151B23] rounded-lg border border-${checkpoint.color}-900/30 p-6`}
                >
                  <div className="flex items-start gap-4">
                    <motion.div
                      className={`w-8 h-8 rounded-full bg-${checkpoint.color}-500/10 flex items-center justify-center flex-shrink-0 mt-1`}
                      whileHover={{ scale: 1.2, rotate: 15 }}
                    >
                      <FileCheck className={`h-5 w-5 text-${checkpoint.color}-400`} />
                    </motion.div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">{checkpoint.title}</h3>
                      <p className="text-neutral-400">{checkpoint.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 8 Pillars Navigation */}
        <FiduciaryPillarsSection />

        <section className="py-20 border-t border-[#1F2937]">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
              Sleep Through the Next DOL Audit
            </h2>
            <p className="text-xl text-neutral-400 mb-8">
              Automated compliance means you're always audit-ready—no scrambling for documents when regulators call.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/request-demo">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-indigo-500 hover:bg-indigo-600 text-white">
                    See Compliance Dashboard
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </Link>
              <Link href="/">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" variant="outline" className="border-[#2A3F54] text-white hover:bg-[#151B23]">
                    View All Pillars
                  </Button>
                </motion.div>
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}