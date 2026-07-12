import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Shield, TrendingUp, DollarSign, BarChart3, ArrowRight, Target } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiduciaryPillarsSection } from "@/components/FiduciaryPillarsSection";

export default function FinancialImpactAnalysis() {
  return (
    <>
      <SEO
        title="Financial Impact Analysis | Kincaid Health"
        description="Quantitative assessment of pharmacy benefit optimization on enterprise profitability. Direct measurement of prescription cost containment effects on operating margins."
      />
      <div className="min-h-screen bg-[#0A0F1E]">
        <Nav />

        {/* Hero Section with Premium Effects */}
        <section className="relative pt-32 pb-20 px-6 overflow-hidden">
          {/* Animated background orbs */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute top-1/4 right-1/4 w-[700px] h-[700px] bg-gradient-radial from-emerald-500/20 via-emerald-500/5 to-transparent rounded-full blur-3xl"
              animate={{ 
                x: [0, -70, 0],
                y: [0, 60, 0],
                scale: [1, 1.25, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-1/3 left-1/3 w-[550px] h-[550px] bg-gradient-radial from-blue-500/20 via-blue-500/5 to-transparent rounded-full blur-3xl"
              animate={{ 
                x: [0, 50, 0],
                y: [0, -45, 0],
                scale: [1, 1.18, 1],
                opacity: [0.25, 0.45, 0.25]
              }}
              transition={{ duration: 19, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-br from-[#1A3A52]/20 via-transparent to-emerald-500/10" />
          
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
                className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400 mb-6 backdrop-blur-sm"
              >
                <Shield className="h-4 w-4" />
                Pillar 2 of 8
              </motion.div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
                Financial Impact<br />Analysis
              </h1>
              
              <p className="text-xl md:text-2xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
                Quantitative assessment of pharmacy benefit optimization on enterprise profitability. Direct measurement of prescription cost containment effects on operating margins.
              </p>
            </motion.div>

            {/* Hero Graphic - EBITDA Impact with Premium Effects */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative rounded-xl border border-[#2A3F54] bg-gradient-to-br from-[#151B23]/80 to-[#0F1419]/80 p-8 shadow-2xl backdrop-blur-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent rounded-xl" />
              
              <div className="space-y-6 relative z-10">
                <motion.div 
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="text-sm text-neutral-500 mb-2">Annual EBITDA Impact</div>
                  <motion.div 
                    className="text-5xl font-bold text-emerald-400 mb-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.6, duration: 1, bounce: 0.5 }}
                  >
                    +$4.8M
                  </motion.div>
                  <div className="text-xs text-neutral-400">From PBM cost containment alone</div>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { icon: TrendingUp, label: "Margin Lift", value: "+3.2%", color: "emerald", particles: 10 },
                    { icon: DollarSign, label: "Cost Avoidance", value: "$6.1M", color: "blue", particles: 8 },
                    { icon: Target, label: "ROI Multiple", value: "17.2x", color: "amber", particles: 12 }
                  ].map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
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
                                x: [0, Math.random() * 12 - 6, 0],
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
                            borderColor: `rgba(16, 185, 129, 0.4)`,
                            boxShadow: "0 20px 40px -10px rgba(16, 185, 129, 0.3)"
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

                          <div className="flex items-center gap-2 mb-3 relative z-10">
                            <motion.div 
                              className={`w-8 h-8 rounded-full bg-${stat.color}-500/10 flex items-center justify-center relative`}
                              whileHover={{ scale: 1.2, rotate: 10 }}
                              transition={{ type: "spring", stiffness: 400 }}
                            >
                              <Icon className={`h-4 w-4 text-${stat.color}-400`} />
                              <motion.div
                                className={`absolute inset-0 rounded-full border-2 border-${stat.color}-400/40`}
                                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                              />
                            </motion.div>
                            <div className="text-sm text-neutral-400">{stat.label}</div>
                          </div>
                          <div className="text-2xl font-bold text-white relative z-10">{stat.value}</div>
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
            className="absolute top-1/2 left-1/2 w-[900px] h-[900px] bg-gradient-radial from-emerald-500/10 via-transparent to-transparent rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.35, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 22, repeat: Infinity }}
          />

          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-serif font-bold text-white mb-12 text-center"
            >
              Direct Line to Operating Performance
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                { icon: BarChart3, title: "EBITDA Waterfall Analysis", description: "Decompose pharmacy benefit costs into their EBITDA components. Show CFOs exactly how PBM optimization flows through to operating margins and free cash flow generation.", color: "emerald", particles: 11 },
                { icon: DollarSign, title: "Cost per PMPM Attribution", description: "Break down total per-member-per-month costs by leakage source. Identify which contract failures are draining the most capital per covered employee.", color: "blue", particles: 9 },
                { icon: TrendingUp, title: "Multi-Year Margin Projections", description: "Model the compounding impact of cost containment strategies over 3-5 year planning horizons. Show boards the cumulative EBITDA protection from continuous monitoring.", color: "amber", particles: 13 },
                { icon: Shield, title: "Earnings Risk Quantification", description: "Calculate the dollar amount of EBITDA at risk from unmonitored PBM contracts. Translate fiduciary exposure into financial statement impact executives understand.", color: "purple", particles: 10 }
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
                        borderColor: "rgba(16, 185, 129, 0.5)",
                        boxShadow: "0 25px 50px -12px rgba(16, 185, 129, 0.35)"
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {/* Gradient glow on hover */}
                      <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                        style={{
                          background: `radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.15), transparent 70%)`
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
                      <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-emerald-500/0 group-hover:border-emerald-500/60 rounded-tr-lg transition-all duration-500" />
                      <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-emerald-500/0 group-hover:border-emerald-500/60 rounded-bl-lg transition-all duration-500" />
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CFO Use Cases */}
        <section className="py-20 border-t border-[#1F2937] bg-[#0A0F1E]">
          <div className="max-w-6xl mx-auto px-6">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-serif font-bold text-white mb-12 text-center"
            >
              Built for CFO Decision-Making
            </motion.h2>

            <div className="space-y-6">
              {[
                { num: "1", title: "Board Earnings Presentations", description: "Present pharmacy benefit cost containment as a tangible earnings protection strategy. Show audit committees how continuous monitoring defends EBITDA against healthcare inflation.", color: "emerald" },
                { num: "2", title: "Investor Relations Narratives", description: "Quantify healthcare cost management initiatives in earnings calls. Demonstrate margin stability through proactive benefit cost controls backed by forensic intelligence.", color: "blue" },
                { num: "3", title: "M&A Due Diligence Defense", description: "In acquisition targets, prove clean EBITDA quality by showing healthcare costs are properly controlled. In buyers, identify EBITDA upside from fixing target's PBM leakage.", color: "amber" }
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
                      borderColor: "rgba(16, 185, 129, 0.4)",
                      boxShadow: "0 10px 30px -5px rgba(16, 185, 129, 0.2)"
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
                Protect Your Operating Margins
              </h2>
              <p className="text-xl text-neutral-400 mb-8">
                Unmonitored PBM contracts leak 15-30% of healthcare spend directly from EBITDA.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/request-demo">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white">
                      See EBITDA Impact Demo
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