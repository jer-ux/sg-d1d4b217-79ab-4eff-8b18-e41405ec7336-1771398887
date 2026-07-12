import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Activity, Zap, AlertTriangle, Eye, ArrowRight, Radio } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiduciaryPillarsSection } from "@/components/FiduciaryPillarsSection";

export default function RealtimeClaimsSurveillance() {
  return (
    <>
      <SEO
        title="Real-Time Claims Surveillance | Kincaid Health"
        description="Live streaming anomaly detection for prescription claims processing, flagging formulary violations, spread pricing irregularities, and specialty drug overcharges as they occur."
      />
      <div className="min-h-screen bg-[#0A0F1E]">
        <Nav />

        {/* Hero Section with Premium Effects */}
        <section className="relative pt-32 pb-20 px-6 overflow-hidden">
          {/* Animated background orbs */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-radial from-red-500/20 via-red-500/5 to-transparent rounded-full blur-3xl"
              animate={{ 
                x: [0, 70, 0],
                y: [0, -35, 0],
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-radial from-orange-500/20 via-orange-500/5 to-transparent rounded-full blur-3xl"
              animate={{ 
                x: [0, -55, 0],
                y: [0, 45, 0],
                scale: [1, 1.15, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ duration: 17, repeat: Infinity, ease: "easeInOut", delay: 2 }}
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
                className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-400 mb-6"
              >
                <Activity className="h-4 w-4" />
                Pillar 6 of 8
              </motion.div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
                Real-Time Claims<br />Surveillance
              </h1>
              
              <p className="text-xl md:text-2xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
                Live streaming anomaly detection for prescription claims processing, flagging formulary violations, spread pricing irregularities, and specialty drug overcharges as they occur.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="relative rounded-xl border border-red-500/30 bg-gradient-to-br from-[#151B23] to-[#0F1419] p-8 shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-transparent rounded-xl" />
              
              <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-40"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </div>
                    <span className="text-sm font-mono text-red-400">LIVE MONITORING</span>
                  </div>
                  <motion.div 
                    className="text-sm text-neutral-500"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Updated 2 seconds ago
                  </motion.div>
                </div>

                <div className="grid md:grid-cols-4 gap-4">
                  {[
                    { label: "Claims Today", value: "8,247", change: "+3.2% vs avg", color: "white", changeColor: "emerald" },
                    { label: "Flagged", value: "142", change: "Requires review", color: "red", changeColor: "red" },
                    { label: "Avg Response", value: "38s", change: "Detection speed", color: "cyan", changeColor: "cyan" },
                    { label: "Prevented", value: "$47K", change: "Today alone", color: "emerald", changeColor: "emerald" }
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      whileHover={{ scale: 1.05, borderColor: `rgba(239, 68, 68, 0.5)` }}
                      className={`bg-[#0A0F1E] rounded-lg border ${stat.color === 'red' ? 'border-red-900/30' : 'border-[#2A3F54]'} p-4 relative overflow-hidden group`}
                    >
                      {/* Hover glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: `radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0.1), transparent 70%)` }}
                      />

                      <div className="text-xs text-neutral-500 mb-2 relative z-10">{stat.label}</div>
                      <div className={`text-2xl font-bold text-${stat.color}-400 relative z-10`}>{stat.value}</div>
                      <div className={`text-xs text-${stat.changeColor}-400 mt-1 relative z-10`}>{stat.change}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section with Floating Particles */}
        <section className="py-20 border-t border-[#1F2937] relative overflow-hidden">
          {/* Background particles */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 25 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-red-400/40 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -45, 0],
                  x: [0, Math.random() * 25 - 12, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1.8, 0],
                }}
                transition={{
                  duration: 3.5 + Math.random() * 2,
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
              24/7 Forensic Intelligence
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: Zap,
                  title: "Instant Anomaly Detection",
                  description: "Every claim tested against 200+ fraud patterns, pricing benchmarks, and contract rules within seconds of adjudication. Machine learning flags statistical outliers and known leakage schemes.",
                  color: "red"
                },
                {
                  icon: AlertTriangle,
                  title: "Priority Alert Routing",
                  description: "High-value violations (>$10K) trigger immediate Slack/Teams notifications to plan administrators. Medium alerts queue for weekly review. Low-priority patterns tracked for trend analysis.",
                  color: "orange"
                },
                {
                  icon: Eye,
                  title: "Pattern Recognition",
                  description: "AI learns normal claim patterns for your population. Detects subtle shifts—gradual spread increases, new specialty drugs appearing without prior auth, or MAC pricing drift—before they compound.",
                  color: "cyan"
                },
                {
                  icon: Radio,
                  title: "Live Dashboard Streaming",
                  description: "Watch claims flow through the system in real-time. See exactly when a high-cost specialty claim hits, what price was paid, and whether it violated contract terms—no waiting for monthly reports.",
                  color: "purple"
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
                        borderColor: "rgba(239, 68, 68, 0.5)",
                        boxShadow: "0 20px 40px -10px rgba(239, 68, 68, 0.3)"
                      }}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {/* Hover gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: `radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0.1), transparent 70%)` }}
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
              Detection Rules
            </motion.h2>

            <div className="space-y-6">
              {[
                {
                  title: "Spread Pricing Violations",
                  description: "Flag claims where ingredient cost plus dispensing fee exceeds contracted max. Catches AWP inflation, MAC overcharges, and undisclosed admin fees in real-time.",
                  color: "red"
                },
                {
                  title: "Formulary Non-Compliance",
                  description: "Alert when brand drug dispenses but generic equivalent exists on formulary. Detects DAW code abuse and verifies medical exceptions have proper prior authorization.",
                  color: "orange"
                },
                {
                  title: "Specialty Drug Overpricing",
                  description: "Compare specialty drug prices to manufacturer WAC, 340B ceiling prices, and Mark Cuban Cost Plus benchmarks. Flag claims exceeding reasonable markup thresholds.",
                  color: "yellow"
                }
              ].map((rule, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 10, borderColor: `rgba(239, 68, 68, 0.5)` }}
                  className={`bg-[#151B23] rounded-lg border border-${rule.color}-900/30 p-6`}
                >
                  <div className="flex items-start gap-4">
                    <motion.div
                      className={`w-8 h-8 rounded-full bg-${rule.color}-500/10 flex items-center justify-center flex-shrink-0 mt-1`}
                      whileHover={{ scale: 1.2, rotate: 15 }}
                    >
                      <AlertTriangle className={`h-5 w-5 text-${rule.color}-400`} />
                    </motion.div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">{rule.title}</h3>
                      <p className="text-neutral-400">{rule.description}</p>
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
              Don't Wait for Monthly Reports
            </h2>
            <p className="text-xl text-neutral-400 mb-8">
              Catch overcharges within hours, not quarters. Real-time detection prevents waste before it compounds.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/request-demo">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-red-500 hover:bg-red-600 text-white">
                    See Live Monitoring
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