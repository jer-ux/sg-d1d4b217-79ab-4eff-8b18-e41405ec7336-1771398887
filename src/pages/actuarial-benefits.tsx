import { motion, useMotionValue, useTransform } from "framer-motion";
import Link from "next/link";
import { Shield, TrendingUp, Heart, BarChart3, Users, FileText, DollarSign, Layers, PieChart, Activity, CheckCircle2, Sparkles, ArrowRight, Zap, Target, Briefcase, Award, Crown } from "lucide-react";
import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useState } from "react";
import dynamic from "next/dynamic";

// Dynamic imports for 3D components
const Interactive3DCard = dynamic(() => import("@/components/premium/Interactive3DCard").then(mod => mod.Interactive3DCard), { ssr: false });
const VegasParticles = dynamic(() => import("@/components/premium/VegasParticles").then(mod => mod.VegasParticles), { ssr: false });
const NeonGlow = dynamic(() => import("@/components/premium/NeonGlow").then(mod => mod.NeonGlow), { ssr: false });
const DataFlowVisualization = dynamic(() => import("@/components/platform/PremiumGraphics").then(mod => mod.DataFlowVisualization), { ssr: false });
const KPIDashboardPreview = dynamic(() => import("@/components/platform/PremiumGraphics").then(mod => mod.KPIDashboardPreview), { ssr: false });
const NetworkGraphAnimation = dynamic(() => import("@/components/platform/PremiumGraphics").then(mod => mod.NetworkGraphAnimation), { ssr: false });

// 3D Solution Card Component with Vegas aesthetic
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
          {/* Vegas glow border - amber/gold */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500/30 to-yellow-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
          
          {/* Card background */}
          <div className="relative h-full bg-black/90 backdrop-blur-xl rounded-2xl border border-amber-900/30 group-hover:border-amber-500/50 transition-all duration-500 overflow-hidden">
            {/* Animated gradient background */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-20"
              animate={{
                background: [
                  "radial-gradient(circle at 0% 0%, #f59e0b 0%, transparent 50%)",
                  "radial-gradient(circle at 100% 100%, #d97706 0%, transparent 50%)",
                  "radial-gradient(circle at 0% 100%, #f59e0b 0%, transparent 50%)",
                  "radial-gradient(circle at 100% 0%, #d97706 0%, transparent 50%)",
                  "radial-gradient(circle at 0% 0%, #f59e0b 0%, transparent 50%)",
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
                  <div className="absolute inset-0 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-amber-500/50 to-yellow-600/50" />
                  <div className="relative p-4 rounded-2xl bg-amber-950/50 backdrop-blur-sm border border-amber-800/30">
                    <Icon className="w-8 h-8 text-amber-500" style={{
                      filter: "drop-shadow(0 0 8px #f59e0b)",
                    }} />
                  </div>
                </div>
              </motion.div>

              {/* Title */}
              <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-amber-100 transition-all duration-300">
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
                    <div className="w-2 h-2 rounded-full bg-amber-500" style={{
                      boxShadow: "0 0 10px #f59e0b",
                    }} />
                    <span className="text-gray-300">{metric}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <motion.div
                className="flex items-center gap-2 text-sm font-semibold text-amber-500 group-hover:gap-4 transition-all"
              >
                Explore Solution
                <ArrowRight className="w-4 h-4" />
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
      href: "/solutions/risk-assessment",
    },
    {
      icon: TrendingUp,
      title: "Premium Calculation",
      description: "Intelligent pricing algorithms that optimize revenue while maintaining competitive rates and regulatory compliance.",
      metrics: ["98.7% Pricing Accuracy", "$6.2M Revenue Optimization", "Dynamic Rate Adjustments"],
      href: "/solutions/premium-calculation",
    },
    {
      icon: Heart,
      title: "Health Benefits",
      description: "Comprehensive benefits administration platform with integrated wellness programs and member engagement tools.",
      metrics: ["96.8% Member Satisfaction", "$15.3M Cost Savings", "50+ Plan Options"],
      href: "/solutions/health-benefits",
    },
    {
      icon: BarChart3,
      title: "Claims Analytics",
      description: "Real-time claims processing with AI-powered fraud detection and automated adjudication workflows.",
      metrics: ["97.4% Accuracy", "24hr Processing Time", "$4.2M Fraud Prevention"],
      href: "/solutions/claims-analytics",
    },
    {
      icon: Users,
      title: "Member Management",
      description: "Unified member portal with self-service capabilities, digital ID cards, and personalized benefit recommendations.",
      metrics: ["98.3% Data Accuracy", "94.7% Portal Adoption", "500K+ Active Members"],
      href: "/solutions/member-management",
    },
    {
      icon: FileText,
      title: "Policy Compliance",
      description: "Automated compliance monitoring across ERISA, ACA, HIPAA, and state regulations with audit trail management.",
      metrics: ["100% Compliance Rate", "99.8% Audit Score", "Zero Penalties"],
      href: "/solutions/policy-compliance",
    },
    {
      icon: DollarSign,
      title: "Cost Optimization",
      description: "Strategic cost reduction through utilization management, network optimization, and care coordination programs.",
      metrics: ["$12.4M Cost Reduction", "487% ROI", "23% Utilization Improvement"],
      href: "/solutions/cost-optimization",
    },
    {
      icon: Layers,
      title: "Plan Design",
      description: "Data-driven plan design tools with benefit modeling, competitive analysis, and financial projections.",
      metrics: ["94.6% Efficiency", "91.4% Member Adoption", "35+ Custom Plans"],
      href: "/solutions/plan-design",
    },
    {
      icon: PieChart,
      title: "Loss Ratio Analysis",
      description: "Comprehensive loss ratio tracking with predictive analytics for trend identification and corrective action planning.",
      metrics: ["73.2% Loss Ratio", "98.9% Accuracy", "$7.8M Reserve Optimization"],
      href: "/solutions/loss-ratio-analysis",
    },
    {
      icon: Activity,
      title: "Performance Metrics",
      description: "Real-time KPI dashboards with customizable reporting, benchmarking, and performance scorecards.",
      metrics: ["99.97% Uptime", "47ms Data Latency", "150+ Metrics Tracked"],
      href: "/solutions/performance-metrics",
    },
    {
      icon: CheckCircle2,
      title: "Quality Assurance",
      description: "Comprehensive QA framework with automated testing, error detection, and continuous improvement protocols.",
      metrics: ["99.4% Data Quality", "99.7% Error Detection", "Zero Critical Defects"],
      href: "/solutions/quality-assurance",
    },
    {
      icon: Sparkles,
      title: "AI Automation",
      description: "End-to-end process automation using machine learning, natural language processing, and intelligent workflows.",
      metrics: ["87.3% Automation Rate", "$18.7M Cost Savings", "15min Avg Response"],
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
      />
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* Animated Vegas Background - amber/gold theme */}
        <div className="fixed inset-0 pointer-events-none">
          {/* Amber/gold neon grid */}
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(245, 158, 11, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(245, 158, 11, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
            }}
          />
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
                {/* Crown Icon */}
                <motion.div
                  className="inline-block mb-6"
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Crown className="w-16 h-16 text-amber-500 mx-auto" style={{
                    filter: "drop-shadow(0 0 20px #f59e0b)",
                  }} />
                </motion.div>

                <motion.h1
                  className="text-6xl md:text-8xl font-bold mb-6"
                  style={{
                    background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                  animate={{
                    textShadow: [
                      "0 0 20px #f59e0b, 0 0 40px #f59e0b",
                      "0 0 30px #d97706, 0 0 60px #d97706",
                      "0 0 20px #f59e0b, 0 0 40px #f59e0b",
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
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
                      <button className="relative px-8 py-4 bg-gradient-to-r from-amber-600 to-yellow-600 rounded-full text-white font-semibold text-lg flex items-center gap-2 shadow-xl">
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
                      className="px-8 py-4 bg-black/50 backdrop-blur-sm border border-amber-900/50 rounded-full text-white font-semibold text-lg hover:border-amber-500 transition-colors flex items-center gap-2"
                    >
                      Explore Solutions
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* 3D Data Visualization Section */}
          <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
                  Real-Time Intelligence at Your Fingertips
                </h2>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                  Experience the power of live data flows and predictive analytics
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-yellow-600/20 rounded-2xl blur-3xl" />
                  <div className="relative bg-black/50 backdrop-blur-xl rounded-2xl border border-amber-900/30 p-8">
                    <h3 className="text-2xl font-bold mb-4 text-amber-500">Live Data Pipeline</h3>
                    <p className="text-gray-400 mb-6">
                      Watch as claims, member data, and actuarial calculations flow through our AI-powered processing engine in real-time
                    </p>
                    <DataFlowVisualization />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-amber-600/20 rounded-2xl blur-3xl" />
                  <div className="relative bg-black/50 backdrop-blur-xl rounded-2xl border border-amber-900/30 p-8">
                    <h3 className="text-2xl font-bold mb-4 text-yellow-500">Executive KPI Dashboard</h3>
                    <p className="text-gray-400 mb-6">
                      Monitor critical metrics with instant updates and predictive trend analysis
                    </p>
                    <KPIDashboardPreview />
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-yellow-500/20 rounded-2xl blur-3xl" />
                <div className="relative bg-black/50 backdrop-blur-xl rounded-2xl border border-amber-900/30 p-8">
                  <h3 className="text-2xl font-bold mb-4 text-center text-amber-500">Integrated System Architecture</h3>
                  <p className="text-gray-400 mb-6 text-center max-w-2xl mx-auto">
                    See how all components of your benefits ecosystem connect and communicate seamlessly
                  </p>
                  <NetworkGraphAnimation />
                </div>
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
                className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent"
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
                        className="relative p-8 rounded-2xl bg-black/50 backdrop-blur-xl border border-amber-900/30 group-hover:border-amber-500/50 transition-all duration-500"
                      >
                        {/* Glow effect */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500/20 to-yellow-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

                        <div className="relative" style={{ transform: "translateZ(50px)" }}>
                          <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                            className="inline-block mb-6"
                          >
                            <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/20 to-yellow-600/20 border border-amber-500/30">
                              <Icon className="w-8 h-8 text-amber-500" style={{
                                filter: "drop-shadow(0 0 8px #f59e0b)",
                              }} />
                            </div>
                          </motion.div>

                          <h3 className="text-2xl font-bold mb-3 group-hover:text-amber-400 transition-colors">
                            {feature.title}
                          </h3>

                          <p className="text-gray-400 mb-4 group-hover:text-gray-300 transition-colors">
                            {feature.description}
                          </p>

                          <div className="inline-block px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/30">
                            <span className="text-amber-400 font-semibold">{feature.stats}</span>
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
                  className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent"
                >
                  Comprehensive Solutions Suite
                </motion.h2>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                  12 integrated solutions designed to transform every aspect of your employee benefits operations
                </p>
              </motion.div>

              {/* Featured 3D Solution Cards */}
              <div className="grid md:grid-cols-3 gap-8 mb-16">
                <Interactive3DCard
                  title="Risk Assessment Engine"
                  description="AI-powered predictive modeling with 99.2% accuracy for comprehensive risk evaluation"
                  icon={Shield}
                  gradient="from-amber-500 to-yellow-600"
                  href="/solutions/risk-assessment"
                />
                <Interactive3DCard
                  title="Claims Analytics Platform"
                  description="Real-time processing with automated fraud detection and 24hr turnaround time"
                  icon={BarChart3}
                  gradient="from-yellow-500 to-amber-600"
                  href="/solutions/claims-analytics"
                />
                <Interactive3DCard
                  title="Premium Calculation AI"
                  description="Intelligent pricing algorithms achieving 98.7% accuracy and $6.2M revenue optimization"
                  icon={TrendingUp}
                  gradient="from-amber-600 to-yellow-500"
                  href="/solutions/premium-calculation"
                />
              </div>

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
                      "linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #eab308 100%)",
                      "linear-gradient(135deg, #eab308 0%, #f59e0b 50%, #d97706 100%)",
                      "linear-gradient(135deg, #d97706 0%, #eab308 50%, #f59e0b 100%)",
                      "linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #eab308 100%)",
                    ],
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                />

                <div className="relative bg-black/90 backdrop-blur-xl rounded-3xl p-12 border border-amber-900/30">
                  <Award className="w-16 h-16 mx-auto mb-6 text-amber-500" style={{
                    filter: "drop-shadow(0 0 20px #f59e0b)",
                  }} />

                  <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
                    Ready to Transform Your Benefits Operations?
                  </h2>

                  <p className="text-xl text-gray-300 mb-8">
                    Join 500+ leading organizations leveraging our premium actuarial solutions
                  </p>

                  <Link href="/request-demo">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-12 py-5 bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-600 rounded-full text-white font-bold text-2xl flex items-center gap-3 mx-auto shadow-2xl relative"
                      style={{
                        boxShadow: "0 0 40px rgba(245, 158, 11, 0.5)",
                      }}
                    >
                      <div className="absolute inset-0 bg-amber-500/30 blur-xl rounded-full" />
                      <Sparkles className="w-6 h-6 relative z-10" />
                      <span className="relative z-10">Schedule Premium Consultation</span>
                      <Sparkles className="w-6 h-6 relative z-10" />
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