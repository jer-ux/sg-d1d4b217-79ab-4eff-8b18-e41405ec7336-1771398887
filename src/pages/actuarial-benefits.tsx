import { motion, useMotionValue, useTransform } from "framer-motion";
import Link from "next/link";
import { Shield, TrendingUp, Heart, BarChart3, Users, FileText, DollarSign, Layers, PieChart, Activity, CheckCircle2, Sparkles, ArrowRight, Zap, Target, Briefcase, Award } from "lucide-react";
import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useState } from "react";

// Floating particle component
function FloatingParticle({ delay, color }: { delay: number; color: string }) {
  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full"
      style={{
        background: color,
        boxShadow: `0 0 20px ${color}, 0 0 40px ${color}`,
      }}
      animate={{
        x: [0, Math.random() * 200 - 100, 0],
        y: [0, Math.random() * 200 - 100, 0],
        scale: [1, 1.5, 1],
        opacity: [0.3, 0.8, 0.3],
      }}
      transition={{
        duration: 8 + Math.random() * 4,
        repeat: Infinity,
        delay,
      }}
    />
  );
}

// 3D Solution Card Component
function SolutionCard3D({ solution, index }: { solution: any; index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-100, 100], [10, -10]);
  const rotateY = useTransform(mouseX, [-100, 100], [-10, 10]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  const Icon = solution.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      style={{ perspective: 1000 }}
      className="h-full"
    >
      <Link href={solution.href}>
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          whileHover={{ scale: 1.05 }}
          className="relative h-full p-8 rounded-2xl cursor-pointer group"
        >
          {/* Vegas glow border */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
            background: `linear-gradient(135deg, ${solution.color1}, ${solution.color2})`,
            filter: "blur(20px)",
          }} />
          
          {/* Card background */}
          <div className="relative h-full bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-gray-800 group-hover:border-transparent transition-all duration-500 overflow-hidden">
            {/* Animated gradient background */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-20"
              animate={{
                background: [
                  `radial-gradient(circle at 0% 0%, ${solution.color1} 0%, transparent 50%)`,
                  `radial-gradient(circle at 100% 100%, ${solution.color2} 0%, transparent 50%)`,
                  `radial-gradient(circle at 0% 100%, ${solution.color1} 0%, transparent 50%)`,
                  `radial-gradient(circle at 100% 0%, ${solution.color2} 0%, transparent 50%)`,
                  `radial-gradient(circle at 0% 0%, ${solution.color1} 0%, transparent 50%)`,
                ],
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />

            {/* Content */}
            <div className="relative h-full p-8 flex flex-col" style={{ transform: "translateZ(50px)" }}>
              {/* Icon */}
              <motion.div
                className="mb-6"
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative inline-block">
                  <div className="absolute inset-0 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity" style={{
                    background: `linear-gradient(135deg, ${solution.color1}, ${solution.color2})`,
                  }} />
                  <div className="relative p-4 rounded-2xl bg-gray-800/50 backdrop-blur-sm">
                    <Icon className="w-8 h-8" style={{
                      color: solution.color1,
                      filter: `drop-shadow(0 0 8px ${solution.color1})`,
                    }} />
                  </div>
                </div>
              </motion.div>

              {/* Title */}
              <h3 className="text-2xl font-bold mb-3 group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                {solution.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 mb-6 flex-grow group-hover:text-gray-300 transition-colors">
                {solution.description}
              </p>

              {/* Metrics */}
              <div className="space-y-3 mb-6">
                {solution.metrics.map((metric: any, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    className="flex items-center gap-3 text-sm"
                  >
                    <div className="w-2 h-2 rounded-full" style={{
                      background: idx === 0 ? solution.color1 : solution.color2,
                      boxShadow: `0 0 10px ${idx === 0 ? solution.color1 : solution.color2}`,
                    }} />
                    <span className="text-gray-300">{metric}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <motion.div
                className="flex items-center gap-2 text-sm font-semibold group-hover:gap-4 transition-all"
                style={{
                  background: `linear-gradient(135deg, ${solution.color1}, ${solution.color2})`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Explore Solution
                <ArrowRight className="w-4 h-4" style={{ color: solution.color1 }} />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

export default function ActuarialBenefits() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const solutions = [
    {
      icon: Shield,
      title: "Risk Assessment",
      description: "Advanced predictive modeling for comprehensive risk evaluation and loss prevention across all benefit plans.",
      metrics: ["99.2% Accuracy", "$8.4M Loss Prevention", "Real-time Monitoring"],
      color1: "#ec4899",
      color2: "#8b5cf6",
      href: "/solutions/risk-assessment",
    },
    {
      icon: TrendingUp,
      title: "Premium Calculation",
      description: "Intelligent pricing algorithms that optimize revenue while maintaining competitive rates and regulatory compliance.",
      metrics: ["98.7% Pricing Accuracy", "$6.2M Revenue Optimization", "Dynamic Rate Adjustments"],
      color1: "#8b5cf6",
      color2: "#3b82f6",
      href: "/solutions/premium-calculation",
    },
    {
      icon: Heart,
      title: "Health Benefits",
      description: "Comprehensive benefits administration platform with integrated wellness programs and member engagement tools.",
      metrics: ["96.8% Member Satisfaction", "$15.3M Cost Savings", "50+ Plan Options"],
      color1: "#3b82f6",
      color2: "#06b6d4",
      href: "/solutions/health-benefits",
    },
    {
      icon: BarChart3,
      title: "Claims Analytics",
      description: "Real-time claims processing with AI-powered fraud detection and automated adjudication workflows.",
      metrics: ["97.4% Accuracy", "24hr Processing Time", "$4.2M Fraud Prevention"],
      color1: "#06b6d4",
      color2: "#10b981",
      href: "/solutions/claims-analytics",
    },
    {
      icon: Users,
      title: "Member Management",
      description: "Unified member portal with self-service capabilities, digital ID cards, and personalized benefit recommendations.",
      metrics: ["98.3% Data Accuracy", "94.7% Portal Adoption", "500K+ Active Members"],
      color1: "#10b981",
      color2: "#84cc16",
      href: "/solutions/member-management",
    },
    {
      icon: FileText,
      title: "Policy Compliance",
      description: "Automated compliance monitoring across ERISA, ACA, HIPAA, and state regulations with audit trail management.",
      metrics: ["100% Compliance Rate", "99.8% Audit Score", "Zero Penalties"],
      color1: "#84cc16",
      color2: "#eab308",
      href: "/solutions/policy-compliance",
    },
    {
      icon: DollarSign,
      title: "Cost Optimization",
      description: "Strategic cost reduction through utilization management, network optimization, and care coordination programs.",
      metrics: ["$12.4M Cost Reduction", "487% ROI", "23% Utilization Improvement"],
      color1: "#eab308",
      color2: "#f97316",
      href: "/solutions/cost-optimization",
    },
    {
      icon: Layers,
      title: "Plan Design",
      description: "Data-driven plan design tools with benefit modeling, competitive analysis, and financial projections.",
      metrics: ["94.6% Efficiency", "91.4% Member Adoption", "35+ Custom Plans"],
      color1: "#f97316",
      color2: "#ef4444",
      href: "/solutions/plan-design",
    },
    {
      icon: PieChart,
      title: "Loss Ratio Analysis",
      description: "Comprehensive loss ratio tracking with predictive analytics for trend identification and corrective action planning.",
      metrics: ["73.2% Loss Ratio", "98.9% Accuracy", "$7.8M Reserve Optimization"],
      color1: "#ef4444",
      color2: "#ec4899",
      href: "/solutions/loss-ratio-analysis",
    },
    {
      icon: Activity,
      title: "Performance Metrics",
      description: "Real-time KPI dashboards with customizable reporting, benchmarking, and performance scorecards.",
      metrics: ["99.97% Uptime", "47ms Data Latency", "150+ Metrics Tracked"],
      color1: "#ec4899",
      color2: "#8b5cf6",
      href: "/solutions/performance-metrics",
    },
    {
      icon: CheckCircle2,
      title: "Quality Assurance",
      description: "Comprehensive QA framework with automated testing, error detection, and continuous improvement protocols.",
      metrics: ["99.4% Data Quality", "99.7% Error Detection", "Zero Critical Defects"],
      color1: "#8b5cf6",
      color2: "#3b82f6",
      href: "/solutions/quality-assurance",
    },
    {
      icon: Sparkles,
      title: "AI Automation",
      description: "End-to-end process automation using machine learning, natural language processing, and intelligent workflows.",
      metrics: ["87.3% Automation Rate", "$18.7M Cost Savings", "15min Avg Response"],
      color1: "#3b82f6",
      color2: "#ec4899",
      href: "/solutions/ai-automation",
    },
  ];

  const features = [
    {
      icon: Target,
      title: "Precision Actuarial Science",
      description: "Our team of certified actuaries brings decades of experience in risk modeling, pricing strategy, and financial forecasting to deliver unparalleled accuracy.",
      stats: "99.2% Accuracy",
    },
    {
      icon: Zap,
      title: "Real-Time Intelligence",
      description: "Lightning-fast data processing and analytics deliver insights in milliseconds, enabling proactive decision-making and immediate risk response.",
      stats: "47ms Latency",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade encryption, SOC 2 Type II compliance, and multi-layered security protocols protect your most sensitive data and operations.",
      stats: "Zero Breaches",
    },
    {
      icon: Briefcase,
      title: "Industry Leadership",
      description: "Trusted by Fortune 500 companies and leading TPAs across healthcare, life insurance, and pension sectors for mission-critical operations.",
      stats: "500+ Clients",
    },
  ];

  return (
    <>
      <SEO
        title="Actuarial Employee Benefits Consulting | SiriusB iQ"
        description="Premium actuarial consulting services for employee benefits with AI-powered analytics, risk assessment, and compliance solutions."
        image="/og-image.png"
      />
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* Animated Vegas Background */}
        <div className="fixed inset-0 pointer-events-none">
          {/* Neon grid */}
          <div className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(236, 72, 153, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(236, 72, 153, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
            }}
          />
          
          {/* Moving spotlights */}
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full opacity-30"
            style={{
              background: "radial-gradient(circle, #ec4899 0%, transparent 70%)",
              filter: "blur(80px)",
            }}
            animate={{
              x: [0, 300, 0],
              y: [0, 200, 0],
            }}
            transition={{ duration: 20, repeat: Infinity }}
          />
          <motion.div
            className="absolute right-0 w-[500px] h-[500px] rounded-full opacity-30"
            style={{
              background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)",
              filter: "blur(80px)",
            }}
            animate={{
              x: [0, -200, 0],
              y: [0, 300, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, delay: 2 }}
          />
          <motion.div
            className="absolute bottom-0 left-1/2 w-[700px] h-[700px] rounded-full opacity-30"
            style={{
              background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)",
              filter: "blur(80px)",
            }}
            animate={{
              x: [-100, 100, -100],
              y: [0, -200, 0],
            }}
            transition={{ duration: 18, repeat: Infinity, delay: 5 }}
          />

          {/* Floating particles */}
          {[...Array(40)].map((_, i) => (
            <FloatingParticle
              key={i}
              delay={i * 0.2}
              color={["#ec4899", "#3b82f6", "#8b5cf6"][i % 3]}
            />
          ))}
        </div>

        <Nav />

        <main className="relative z-10">
          {/* Hero Section */}
          <section className="pt-32 pb-20 px-4">
            <div className="max-w-7xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.h1
                  className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent"
                  animate={{
                    textShadow: [
                      "0 0 20px #ec4899, 0 0 40px #ec4899",
                      "0 0 20px #3b82f6, 0 0 40px #3b82f6",
                      "0 0 20px #8b5cf6, 0 0 40px #8b5cf6",
                      "0 0 20px #ec4899, 0 0 40px #ec4899",
                    ],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  Actuarial Excellence
                  <br />
                  Meets AI Innovation
                </motion.h1>

                <motion.p
                  className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Transform your employee benefits operations with cutting-edge actuarial science,
                  powered by artificial intelligence and real-time analytics
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap gap-6 justify-center"
                >
                  <Link href="/request-demo">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
                      <button className="relative px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full text-white font-semibold text-lg flex items-center gap-2 shadow-xl">
                        <Sparkles className="w-5 h-5" />
                        Request Premium Demo
                        <Sparkles className="w-5 h-5" />
                      </button>
                    </motion.div>
                  </Link>

                  <Link href="#solutions">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-full text-white font-semibold text-lg hover:border-purple-500 transition-colors flex items-center gap-2"
                    >
                      Explore Solutions
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
              >
                Why Leading Organizations Choose Us
              </motion.h2>

              <div className="grid md:grid-cols-2 gap-8">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      onMouseEnter={() => setHoveredFeature(index)}
                      onMouseLeave={() => setHoveredFeature(null)}
                      className="relative group"
                      style={{ perspective: 1000 }}
                    >
                      <motion.div
                        animate={{
                          rotateY: hoveredFeature === index ? 5 : 0,
                          rotateX: hoveredFeature === index ? -5 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                        style={{ transformStyle: "preserve-3d" }}
                        className="relative p-8 rounded-2xl bg-gray-900/50 backdrop-blur-xl border border-gray-800 group-hover:border-purple-500/50 transition-all duration-500"
                      >
                        {/* Glow effect */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

                        <div className="relative" style={{ transform: "translateZ(50px)" }}>
                          <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                            className="inline-block mb-6"
                          >
                            <div className="p-4 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-purple-500/30">
                              <Icon className="w-8 h-8 text-purple-400" style={{
                                filter: "drop-shadow(0 0 8px #a855f7)",
                              }} />
                            </div>
                          </motion.div>

                          <h3 className="text-2xl font-bold mb-3 group-hover:text-purple-400 transition-colors">
                            {feature.title}
                          </h3>

                          <p className="text-gray-400 mb-4 group-hover:text-gray-300 transition-colors">
                            {feature.description}
                          </p>

                          <div className="inline-block px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30">
                            <span className="text-purple-400 font-semibold">{feature.stats}</span>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Solutions Grid */}
          <section id="solutions" className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <motion.h2
                  className="text-5xl md:text-6xl font-bold mb-6"
                  animate={{
                    backgroundImage: [
                      "linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #3b82f6 100%)",
                      "linear-gradient(135deg, #3b82f6 0%, #ec4899 50%, #8b5cf6 100%)",
                      "linear-gradient(135deg, #8b5cf6 0%, #3b82f6 50%, #ec4899 100%)",
                      "linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #3b82f6 100%)",
                    ],
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                >
                  Comprehensive Solutions Suite
                </motion.h2>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                  12 integrated solutions designed to transform every aspect of your employee benefits operations
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {solutions.map((solution, index) => (
                  <SolutionCard3D key={index} solution={solution} index={index} />
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-32 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                {/* Animated border */}
                <motion.div
                  className="absolute -inset-1 rounded-3xl opacity-75 group-hover:opacity-100 blur-xl"
                  animate={{
                    background: [
                      "linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #3b82f6 100%)",
                      "linear-gradient(135deg, #3b82f6 0%, #ec4899 50%, #8b5cf6 100%)",
                      "linear-gradient(135deg, #8b5cf6 0%, #3b82f6 50%, #ec4899 100%)",
                      "linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #3b82f6 100%)",
                    ],
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                />

                <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-3xl p-12 border border-gray-800">
                  <Award className="w-16 h-16 mx-auto mb-6 text-purple-400" style={{
                    filter: "drop-shadow(0 0 20px #a855f7)",
                  }} />

                  <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                    Ready to Transform Your Benefits Operations?
                  </h2>

                  <p className="text-xl text-gray-300 mb-8">
                    Join 500+ leading organizations leveraging our premium actuarial solutions
                  </p>

                  <Link href="/request-demo">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-12 py-5 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 rounded-full text-white font-bold text-2xl flex items-center gap-3 mx-auto shadow-2xl"
                      style={{
                        boxShadow: "0 0 40px rgba(236, 72, 153, 0.5)",
                      }}
                    >
                      <Sparkles className="w-6 h-6" />
                      Schedule Premium Consultation
                      <Sparkles className="w-6 h-6" />
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}