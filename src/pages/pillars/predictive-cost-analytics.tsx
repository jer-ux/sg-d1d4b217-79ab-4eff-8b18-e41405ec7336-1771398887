import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { TrendingUp, Brain, Target, Zap, ArrowRight, LineChart } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiduciaryPillarsSection } from "@/components/FiduciaryPillarsSection";

export default function PredictiveCostAnalytics() {
  return (
    <>
      <SEO
        title="Predictive Cost Analytics | Kincaid Health"
        description="Machine learning forecasts for future claim trends, high-cost member identification, and intervention ROI modeling to proactively manage healthcare spend."
      />
      <div className="min-h-screen bg-[#0A0F1E]">
        <Nav />

        {/* Hero Section with Premium Effects */}
        <section className="relative pt-32 pb-20 px-6 overflow-hidden">
          {/* Animated background orbs */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-radial from-violet-500/20 via-violet-500/5 to-transparent rounded-full blur-3xl"
              animate={{ 
                x: [0, 85, 0],
                y: [0, -42, 0],
                scale: [1, 1.22, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-radial from-pink-500/20 via-pink-500/5 to-transparent rounded-full blur-3xl"
              animate={{ 
                x: [0, -65, 0],
                y: [0, 52, 0],
                scale: [1, 1.16, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
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
                className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-400 mb-6"
              >
                <Brain className="h-4 w-4" />
                Pillar 8 of 8
              </motion.div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
                Predictive Cost<br />Analytics
              </h1>
              
              <p className="text-xl md:text-2xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
                Machine learning forecasts for future claim trends, high-cost member identification, and intervention ROI modeling to proactively manage healthcare spend.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="relative rounded-xl border border-violet-500/30 bg-gradient-to-br from-[#151B23] to-[#0F1419] p-8 shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-transparent rounded-xl" />
              
              <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Brain className="h-6 w-6 text-violet-400" />
                    <span className="text-sm font-semibold text-violet-400">AI FORECAST CONFIDENCE</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-2xl font-bold text-emerald-400">94.3%</div>
                    <span className="text-sm text-neutral-500">Accuracy</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-4 gap-4">
                  {[
                    { label: "Next Quarter Forecast", value: "+8.2%", trend: "↑", color: "red" },
                    { label: "High-Risk Members", value: "147", trend: "→", color: "yellow" },
                    { label: "Intervention ROI", value: "4.3x", trend: "↑", color: "emerald" },
                    { label: "Prediction Horizon", value: "18mo", trend: "→", color: "violet" }
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      whileHover={{ scale: 1.05, borderColor: `rgba(139, 92, 246, 0.5)` }}
                      className="bg-[#0A0F1E] rounded-lg border border-[#2A3F54] p-4 relative overflow-hidden group"
                    >
                      {/* Hover glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 to-violet-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: `radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.1), transparent 70%)` }}
                      />

                      <div className="flex items-center justify-between mb-2 relative z-10">
                        <div className="text-xs text-neutral-500">{stat.label}</div>
                        <div className={`text-sm font-bold text-${stat.color}-400`}>{stat.trend}</div>
                      </div>
                      <div className={`text-2xl font-bold text-${stat.color}-400 relative z-10`}>{stat.value}</div>
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
            {Array.from({ length: 22 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-violet-400/40 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -48, 0],
                  x: [0, Math.random() * 26 - 13, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1.7, 0],
                }}
                transition={{
                  duration: 3.8 + Math.random() * 2,
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
              AI-Powered Intelligence
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: TrendingUp,
                  title: "Trend Forecasting Models",
                  description: "LSTM neural networks analyze 5+ years of claims history to predict future cost trajectories. Separate models for medical, pharmacy, dental, and vision trends with confidence intervals.",
                  color: "violet"
                },
                {
                  icon: Target,
                  title: "High-Risk Member Scoring",
                  description: "Identify members likely to exceed $100K in annual costs 6–12 months before it happens. Gradient boosting models analyze 200+ features including diagnosis codes, utilization patterns, and demographics.",
                  color: "pink"
                },
                {
                  icon: LineChart,
                  title: "Intervention ROI Modeling",
                  description: "Calculate expected savings from care management programs, specialty pharmacy switches, or high-performance network steering. Models account for member compliance rates and natural regression.",
                  color: "cyan"
                },
                {
                  icon: Zap,
                  title: "Real-Time Model Updates",
                  description: "Retrain models weekly as new claims data arrives. Adaptive learning algorithms adjust predictions based on actual outcomes, continuously improving forecast accuracy.",
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
                        borderColor: "rgba(139, 92, 246, 0.5)",
                        boxShadow: "0 20px 40px -10px rgba(139, 92, 246, 0.3)"
                      }}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {/* Hover gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 to-violet-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: `radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.1), transparent 70%)` }}
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
              Prediction Use Cases
            </motion.h2>

            <div className="space-y-6">
              {[
                {
                  title: "Renewal Budget Accuracy",
                  description: "Replace broker estimates with statistical forecasts. Board gets 95% confidence intervals for next year's costs, not single-point guesses from vendors with incentive to lowball.",
                  color: "violet"
                },
                {
                  title: "Stop-Loss Laser Avoidance",
                  description: "Predict which members will breach specific deductible 6 months early. Proactive care management reduces laser placements that permanently increase premiums.",
                  color: "pink"
                },
                {
                  title: "M&A Due Diligence",
                  description: "Acquiring company? Predict target's benefit costs under your plan design before deal closes. Model integration scenarios, identify hidden liabilities, validate seller's actuarial assumptions.",
                  color: "cyan"
                }
              ].map((useCase, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 10, borderColor: "rgba(139, 92, 246, 0.5)" }}
                  className={`bg-[#151B23] rounded-lg border border-${useCase.color}-900/30 p-6`}
                >
                  <div className="flex items-start gap-4">
                    <motion.div
                      className={`w-8 h-8 rounded-full bg-${useCase.color}-500/10 flex items-center justify-center flex-shrink-0 mt-1`}
                      whileHover={{ scale: 1.2, rotate: 15 }}
                    >
                      <Brain className={`h-5 w-5 text-${useCase.color}-400`} />
                    </motion.div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">{useCase.title}</h3>
                      <p className="text-neutral-400">{useCase.description}</p>
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
              Stop Reacting, Start Predicting
            </h2>
            <p className="text-xl text-neutral-400 mb-8">
              Machine learning turns historical claims data into actionable future intelligence.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/request-demo">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-violet-500 hover:bg-violet-600 text-white">
                    See Prediction Models
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