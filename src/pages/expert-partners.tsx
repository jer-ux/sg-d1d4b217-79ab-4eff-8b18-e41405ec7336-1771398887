import { useState, useEffect } from "react";
import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Award, TrendingUp, Shield, Users, CheckCircle, Briefcase, BookOpen, Target, Brain, BarChart3, FileCheck, Scale, Sparkles, Zap, Crown } from "lucide-react";
import { InteractivePartnershipMap } from "@/components/InteractivePartnershipMap";
import { ParticleField3D, FloatingCard } from "@/components/premium/ParticleField3D";

export default function ExpertPartnersPage() {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <SEO
        title="Expert Actuaries & Consultants | Kincaid IQ Intelligence Series"
        description="Partner with the industry's most qualified actuaries and consultants. FSA, MAAA, ASA credentials. Deep expertise in health benefits, risk modeling, and fiduciary compliance."
        image="/og-image.png"
      />
      <Nav />

      <main className="min-h-screen bg-[#0A0F1E] text-white overflow-hidden">
        {mounted && <ParticleField3D />}
        
        {/* Animated Background Gradients */}
        <motion.div 
          className="fixed inset-0 opacity-20 pointer-events-none"
          style={{ y }}
        >
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-500/20 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
        </motion.div>

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4 overflow-hidden">
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-cyan-900/20"
            style={{ opacity }}
          />
          
          <div className="relative max-w-6xl mx-auto text-center z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 mb-8 backdrop-blur-sm"
            >
              <Crown className="w-5 h-5 text-purple-400" />
              <span className="text-sm font-semibold text-purple-300 uppercase tracking-wider">Elite Partnership Network</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-8xl font-bold mb-8 leading-tight"
            >
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Expert Actuaries
              </span>
              <br />
              <span className="text-white">& Consultants</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-neutral-300 max-w-4xl mx-auto mb-12 leading-relaxed"
            >
              Partner with the most qualified actuaries and consultants in the industry—bringing decades of specialized expertise, rigorous credentials, and proven results to every engagement.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <Link href="/contact">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg shadow-xl shadow-purple-500/30">
                    Partner With Our Experts
                    <Sparkles className="ml-2 w-5 h-5" />
                  </Button>
                </motion.div>
              </Link>
              <Link href="/solutions/actuarial-benefits">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" variant="outline" className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10 px-8 py-6 text-lg backdrop-blur-sm">
                    View Solutions
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </div>

          {/* Floating Stats */}
          <div className="relative max-w-6xl mx-auto mt-20 grid md:grid-cols-4 gap-6 px-4">
            {[
              { value: "25+", label: "Years Average Experience", icon: Award, delay: 0.2 },
              { value: "500+", label: "Client Engagements", icon: Target, delay: 0.3 },
              { value: "$2.3B", label: "Savings Identified", icon: TrendingUp, delay: 0.4 },
              { value: "98%", label: "Satisfaction Rate", icon: Shield, delay: 0.5 }
            ].map((stat, idx) => (
              <FloatingCard key={idx} delay={stat.delay}>
                <Card className="bg-gradient-to-br from-purple-900/20 to-cyan-900/20 border-purple-500/30 p-6 backdrop-blur-sm relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <stat.icon className="w-8 h-8 text-purple-400 mb-3" />
                  <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-sm text-neutral-400">{stat.label}</div>
                </Card>
              </FloatingCard>
            ))}
          </div>
        </section>

        {/* Credentials Section with 3D Cards */}
        <section className="py-20 px-4 relative">
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Unmatched Credentials
              </h2>
              <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
                Our partner network holds the highest professional designations and certifications in actuarial science and employee benefits consulting.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Award, title: "FSA / MAAA", desc: "Fellow of the Society of Actuaries and Member of the American Academy of Actuaries—the gold standard in actuarial credentials.", color: "purple", delay: 0.2 },
                { icon: Shield, title: "ASA / FCA", desc: "Associate of the Society of Actuaries and Fellow of the Conference of Consulting Actuaries—specialized health and pension expertise.", color: "cyan", delay: 0.3 },
                { icon: Scale, title: "CEBS / RHU", desc: "Certified Employee Benefit Specialist and Registered Health Underwriter—deep benefits design and compliance knowledge.", color: "pink", delay: 0.4 }
              ].map((credential, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 50, rotateX: -15 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: credential.delay }}
                  whileHover={{ 
                    y: -10,
                    rotateY: 5,
                    rotateX: 5,
                    scale: 1.03,
                    transition: { duration: 0.3 }
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <Card className={`bg-gradient-to-br from-${credential.color}-900/30 to-transparent border-${credential.color}-500/30 p-8 relative overflow-hidden group backdrop-blur-sm h-full`}>
                    <div className={`absolute inset-0 bg-gradient-to-br from-${credential.color}-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.6 }}
                      className="relative z-10"
                    >
                      <credential.icon className={`w-14 h-14 text-${credential.color}-400 mb-4`} />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-3 text-white relative z-10">{credential.title}</h3>
                    <p className="text-neutral-300 relative z-10">{credential.desc}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Expertise Areas with Hover Effects */}
        <section className="py-20 px-4 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Core Expertise Areas
              </h2>
              <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
                Specialized knowledge spanning every dimension of health benefits, risk management, and fiduciary compliance.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: TrendingUp, title: "Actuarial Valuation", items: ["Premium rate development", "Reserve adequacy analysis", "Financial forecasting models"], color: "purple" },
                { icon: BarChart3, title: "Risk Management", items: ["Stop-loss optimization", "Catastrophic claim modeling", "Volatility analysis & hedging"], color: "cyan" },
                { icon: Brain, title: "Plan Design Strategy", items: ["Benefit optimization modeling", "Cost-sharing structures", "Network steerage analytics"], color: "pink" },
                { icon: FileCheck, title: "Regulatory Compliance", items: ["ERISA fiduciary standards", "ACA & HIPAA compliance", "DOL audit preparation"], color: "emerald" },
                { icon: Target, title: "PBM Analytics", items: ["Contract forensic analysis", "Drug pricing benchmarking", "Rebate verification audits"], color: "amber" },
                { icon: Briefcase, title: "Executive Consulting", items: ["Board-level strategic guidance", "M&A benefits due diligence", "CFO cost optimization roadmaps"], color: "rose" }
              ].map((area, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <Card className={`bg-gradient-to-br from-gray-900/80 to-gray-950/80 border-${area.color}-500/30 p-6 hover:border-${area.color}-500/60 transition-all duration-300 backdrop-blur-sm h-full relative overflow-hidden group`}>
                    <div className={`absolute inset-0 bg-gradient-to-br from-${area.color}-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    <area.icon className={`w-10 h-10 text-${area.color}-400 mb-4 relative z-10`} />
                    <h3 className="text-xl font-bold mb-3 text-white relative z-10">{area.title}</h3>
                    <ul className="space-y-2 relative z-10">
                      {area.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-neutral-300 text-sm">
                          <CheckCircle className={`w-4 h-4 text-${area.color}-400 mt-1 flex-shrink-0`} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Partnership Map */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Our Partner Network
              </h2>
              <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
                Explore our nationwide network of credentialed actuaries and consultants across multiple regions and specialties.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <InteractivePartnershipMap />
            </motion.div>
          </div>
        </section>

        {/* Why Partners Section with Animated Icons */}
        <section className="py-20 px-4 bg-gradient-to-b from-transparent via-cyan-950/10 to-transparent">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Why Our Partners Stand Apart
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                { icon: Users, title: "Decades of Experience", desc: "Our partner network averages 20+ years of specialized experience in health benefits consulting, with deep relationships across payers, TPAs, and regulatory agencies. They've guided Fortune 500 clients through every market cycle and regulatory shift.", gradient: "from-purple-900/20 to-pink-900/20", color: "purple" },
                { icon: BookOpen, title: "Thought Leadership", desc: "Published authors, industry speakers, and peer-reviewed contributors. Our partners shape best practices through active involvement in professional societies, regulatory comment periods, and academic research.", gradient: "from-cyan-900/20 to-blue-900/20", color: "cyan" },
                { icon: Target, title: "Precision & Rigor", desc: "Every analysis undergoes peer review by credentialed actuaries. We maintain the highest professional standards—ASOP compliance, documented methodologies, and transparent assumptions in every deliverable.", gradient: "from-pink-900/20 to-rose-900/20", color: "pink" },
                { icon: Shield, title: "Fiduciary Accountability", desc: "Our partners operate under fiduciary duty, putting client interests first. Independent, conflict-free advice backed by professional liability coverage and adherence to the strictest ethical standards.", gradient: "from-emerald-900/20 to-teal-900/20", color: "emerald" }
              ].map((reason, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  whileHover={{ scale: 1.03, y: -5 }}
                >
                  <Card className={`bg-gradient-to-br ${reason.gradient} border-${reason.color}-500/30 p-8 backdrop-blur-sm relative overflow-hidden group h-full`}>
                    <div className={`absolute inset-0 bg-gradient-to-br from-${reason.color}-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.2 }}
                      transition={{ duration: 0.5 }}
                    >
                      <reason.icon className={`w-12 h-12 text-${reason.color}-400 mb-4 relative z-10`} />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-4 text-white relative z-10">{reason.title}</h3>
                    <p className="text-neutral-300 leading-relaxed relative z-10">{reason.desc}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Results with Animated Counters */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl font-bold mb-12 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
            >
              Proven Results
            </motion.h2>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { value: "$2.3B+", label: "Savings Identified", color: "purple" },
                { value: "500+", label: "Client Engagements", color: "cyan" },
                { value: "98%", label: "Client Satisfaction", color: "pink" },
                { value: "Zero", label: "Audit Failures", color: "emerald" }
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.6, 
                    delay: idx * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                >
                  <Card className={`bg-gradient-to-br from-gray-900/80 to-gray-950/80 border-${stat.color}-500/30 p-8 backdrop-blur-sm relative overflow-hidden group`}>
                    <div className={`absolute inset-0 bg-gradient-to-br from-${stat.color}-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    <div className={`text-5xl font-bold text-${stat.color}-400 mb-2 relative z-10`}>{stat.value}</div>
                    <div className="text-neutral-300 relative z-10">{stat.label}</div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA with Glow Effect */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-cyan-500/30 rounded-3xl blur-3xl" />
              <Card className="relative bg-gradient-to-br from-purple-900/30 via-pink-900/30 to-cyan-900/30 border-purple-500/40 p-12 backdrop-blur-sm overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 opacity-50" />
                <div className="relative z-10 text-center">
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    Ready to Work With the Best?
                  </h2>
                  <p className="text-xl text-neutral-300 mb-8 leading-relaxed">
                    Connect with our expert partners to unlock strategic insights, mitigate risk, and drive measurable financial impact for your organization.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <Link href="/contact">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg shadow-2xl shadow-purple-500/40">
                          Schedule Consultation
                          <Zap className="ml-2 w-5 h-5" />
                        </Button>
                      </motion.div>
                    </Link>
                    <Link href="/kincaid-iq-intelligence-series">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button size="lg" variant="outline" className="border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/10 px-8 py-6 text-lg backdrop-blur-sm">
                          Explore Intelligence Series
                        </Button>
                      </motion.div>
                    </Link>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}