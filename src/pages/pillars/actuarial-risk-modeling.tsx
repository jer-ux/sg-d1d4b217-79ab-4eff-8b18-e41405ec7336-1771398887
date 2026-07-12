import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { TrendingUp, BarChart3, Target, Zap, ArrowRight, Activity, Shield } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiduciaryPillarsSection } from "@/components/FiduciaryPillarsSection";

export default function ActuarialRiskModeling() {
  return (
    <>
      <SEO
        title="Actuarial Risk Modeling | Kincaid Health"
        description="Monte Carlo simulation engines for benefit cost forecasting, stop-loss optimization, and multi-year trend projection with confidence intervals and scenario planning."
      />
      <div className="min-h-screen bg-[#0A0F1E]">
        <Nav />

        {/* Hero Section with Premium Effects */}
        <section className="relative pt-32 pb-20 px-6 overflow-hidden">
          {/* Animated background orbs */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-radial from-cyan-500/20 via-cyan-500/5 to-transparent rounded-full blur-3xl"
              animate={{ 
                x: [0, 80, 0],
                y: [0, -40, 0],
                scale: [1, 1.15, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-radial from-purple-500/20 via-purple-500/5 to-transparent rounded-full blur-3xl"
              animate={{ 
                x: [0, -60, 0],
                y: [0, 50, 0],
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
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
                className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-400 mb-6"
              >
                <TrendingUp className="h-4 w-4" />
                Pillar 5 of 8
              </motion.div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
                Actuarial Risk<br />Modeling
              </h1>
              
              <p className="text-xl md:text-2xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
                Monte Carlo simulation engines for benefit cost forecasting, stop-loss optimization, and multi-year trend projection with confidence intervals and scenario planning.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="relative rounded-xl border border-cyan-500/30 bg-gradient-to-br from-[#151B23] to-[#0F1419] p-8 shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent rounded-xl" />
              
              <div className="space-y-6 relative z-10">
                <div className="text-center">
                  <div className="text-sm text-neutral-500 mb-2">3-Year Cost Projection Range (95% Confidence)</div>
                  <div className="flex items-baseline justify-center gap-4 mb-4">
                    <motion.div 
                      className="text-3xl font-bold text-cyan-400"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      $14.2M
                    </motion.div>
                    <div className="text-neutral-600">→</div>
                    <motion.div 
                      className="text-3xl font-bold text-orange-400"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      $18.7M
                    </motion.div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { icon: BarChart3, label: "Simulations Run", value: "10,000", color: "cyan" },
                    { icon: Target, label: "Expected Value", value: "$16.1M", color: "yellow" },
                    { icon: Activity, label: "Optimal SL Attach", value: "$185K", color: "emerald" }
                  ].map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + i * 0.1 }}
                        whileHover={{ scale: 1.05, borderColor: `rgba(34, 211, 238, 0.5)` }}
                        className="bg-[#0A0F1E] rounded-lg border border-[#2A3F54] p-6 relative overflow-hidden group"
                      >
                        {/* Hover glow */}
                        <div className={`absolute inset-0 bg-gradient-to-br from-${stat.color}-500/0 to-${stat.color}-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} 
                          style={{ background: `radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.1), transparent 70%)` }}
                        />
                        
                        <div className="flex items-center gap-2 mb-3 relative z-10">
                          <Icon className={`h-5 w-5 text-${stat.color}-400`} />
                          <div className="text-sm text-neutral-400">{stat.label}</div>
                        </div>
                        <div className="text-2xl font-bold text-white relative z-10">{stat.value}</div>
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
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400/40 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -40, 0],
                  x: [0, Math.random() * 20 - 10, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
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
              Credentialed Actuarial Science
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: Zap,
                  title: "Monte Carlo Cost Simulation",
                  description: "10,000-run simulations model future benefit costs under varying claim frequency, severity, and trend scenarios. Produces confidence intervals, percentile ranges, and tail risk quantification.",
                  color: "cyan"
                },
                {
                  icon: Target,
                  title: "Stop-Loss Optimization",
                  description: "Calculate optimal specific and aggregate attachment points that balance premium costs against expected reimbursements. Models laser placements for known high-cost claimants.",
                  color: "yellow"
                },
                {
                  icon: TrendingUp,
                  title: "Credibility-Weighted Trends",
                  description: "Apply actuarial credibility theory to blend plan-specific experience with industry benchmarks. Small populations get more industry weighting, large populations trust their own data.",
                  color: "emerald"
                },
                {
                  icon: BarChart3,
                  title: "Multi-Year Forecasting",
                  description: "Project costs 3-5 years forward incorporating demographic shifts, utilization trends, drug pipeline launches, and contract renewal scenarios. Supports long-term budgeting and M&A modeling.",
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
                        borderColor: "rgba(34, 211, 238, 0.5)",
                        boxShadow: "0 20px 40px -10px rgba(34, 211, 238, 0.3)"
                      }}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {/* Hover gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: `radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.1), transparent 70%)` }}
                      />

                      <motion.div
                        className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center mb-4 relative z-10"
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <Icon className="h-6 w-6 text-cyan-400" />
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-cyan-400/40"
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
              Scenario Planning
            </motion.h2>

            <div className="space-y-6">
              {[
                {
                  title: "Specialty Drug Impact Modeling",
                  description: "Model cost impact of adding/removing specialty medications from formulary. Simulate shift from brand to biosimilar, or adoption of new GLP-1 therapies across eligible population."
                },
                {
                  title: "Plan Design Changes",
                  description: "Test deductible increases, copay tier shifts, or coinsurance adjustments. Predict member out-of-pocket costs, plan savings, and utilization changes before renewal implementation."
                },
                {
                  title: "Carrier Bid Analysis",
                  description: "Validate carrier renewal quotes against your own actuarial projections. Identify inflated trend assumptions, excessive margin loads, or understated rebate pass-through."
                }
              ].map((scenario, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 10, borderColor: "rgba(34, 211, 238, 0.5)" }}
                  className="bg-[#151B23] rounded-lg border border-[#2A3F54] p-6"
                >
                  <h3 className="text-lg font-semibold text-white mb-2">{scenario.title}</h3>
                  <p className="text-neutral-400">{scenario.description}</p>
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
              Stop Guessing, Start Modeling
            </h2>
            <p className="text-xl text-neutral-400 mb-8">
              Actuarial precision replaces broker estimates and carrier sales pitches.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/request-demo">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white">
                    See Simulation Demo
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