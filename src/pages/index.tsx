import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Shield, Zap, Users, TrendingUp, Award, CheckCircle, Sparkles, Database, Lock, Cpu, FileCheck, Receipt, FileText, BarChart3, Calculator, Heart, Briefcase, Target, CheckCircle2, Activity, DollarSign, Layers, PieChart, Eye, Brain, Lightbulb, Clock, Globe, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { WarRoomPreview } from "@/components/kincaid-iq/WarRoomPreview";
import { useState } from "react";

const THEME = {
  blue: {
    bar: "bg-gradient-to-b from-sky-400 via-blue-500 to-indigo-500",
    g1: "rgba(59,130,246,0.50)",
    g2: "rgba(14,165,233,0.40)",
    g3: "rgba(99,102,241,0.35)",
    title: "text-sky-200",
    subtitle: "text-sky-100/70",
    iconBg: "bg-sky-500/15",
    iconRing: "ring-sky-400/40",
    iconGlow: "shadow-[0_0_0_1px_rgba(56,189,248,0.25),0_0_24px_rgba(59,130,246,0.22)]",
    hoverRing: "group-hover:shadow-[0_0_0_1px_rgba(56,189,248,0.35),0_0_48px_rgba(99,102,241,0.18)]",
  },
  emerald: {
    bar: "bg-gradient-to-b from-emerald-300 via-emerald-500 to-teal-500",
    g1: "rgba(16,185,129,0.55)",
    g2: "rgba(20,184,166,0.40)",
    g3: "rgba(34,197,94,0.30)",
    title: "text-emerald-200",
    subtitle: "text-emerald-100/70",
    iconBg: "bg-emerald-500/15",
    iconRing: "ring-emerald-400/40",
    iconGlow: "shadow-[0_0_0_1px_rgba(52,211,153,0.25),0_0_24px_rgba(16,185,129,0.22)]",
    hoverRing: "group-hover:shadow-[0_0_0_1px_rgba(52,211,153,0.35),0_0_48px_rgba(20,184,166,0.18)]",
  },
  violet: {
    bar: "bg-gradient-to-b from-violet-400 via-purple-500 to-fuchsia-500",
    g1: "rgba(139,92,246,0.55)",
    g2: "rgba(168,85,247,0.45)",
    g3: "rgba(217,70,239,0.30)",
    title: "text-violet-200",
    subtitle: "text-violet-100/70",
    iconBg: "bg-violet-500/15",
    iconRing: "ring-violet-400/40",
    iconGlow: "shadow-[0_0_0_1px_rgba(167,139,250,0.25),0_0_24px_rgba(168,85,247,0.22)]",
    hoverRing: "group-hover:shadow-[0_0_0_1px_rgba(167,139,250,0.35),0_0_48px_rgba(217,70,239,0.18)]",
  },
  cyan: {
    bar: "bg-gradient-to-b from-cyan-300 via-cyan-500 to-blue-500",
    g1: "rgba(6,182,212,0.55)",
    g2: "rgba(34,211,238,0.40)",
    g3: "rgba(59,130,246,0.30)",
    title: "text-cyan-200",
    subtitle: "text-cyan-100/70",
    iconBg: "bg-cyan-500/15",
    iconRing: "ring-cyan-400/40",
    iconGlow: "shadow-[0_0_0_1px_rgba(34,211,238,0.25),0_0_24px_rgba(6,182,212,0.22)]",
    hoverRing: "group-hover:shadow-[0_0_0_1px_rgba(34,211,238,0.35),0_0_48px_rgba(59,130,246,0.16)]",
  },
};

type ThemeKey = keyof typeof THEME;

function AnimatedGradientOverlay({ theme }: { theme: typeof THEME[ThemeKey] }) {
  return (
    <motion.div
      aria-hidden
      className="absolute inset-0 opacity-25 transition-opacity duration-300 group-hover:opacity-50"
      style={{
        backgroundImage: `linear-gradient(135deg, ${theme.g1}, ${theme.g2}, ${theme.g3})`,
        backgroundSize: "200% 200%",
      }}
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

type FeatureCardProps = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  href: string;
  themeKey: ThemeKey;
  delay?: number;
};

function FeatureCard({ icon: Icon, title, description, href, themeKey, delay = 0 }: FeatureCardProps) {
  const t = THEME[themeKey];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
    >
      <Link href={href}>
        <div
          className={[
            "group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60 p-6",
            "backdrop-blur-xl transition-transform duration-200 hover:-translate-y-0.5 cursor-pointer",
            t.hoverRing,
          ].join(" ")}
        >
          <div className={`absolute left-0 top-0 h-full w-2 ${t.bar}`} />
          <AnimatedGradientOverlay theme={t} />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_55%_at_50%_15%,rgba(255,255,255,0.10),transparent_60%)] opacity-60" />

          <div className="relative">
            <div
              className={[
                "grid h-12 w-12 place-items-center rounded-2xl ring-1 mb-4",
                t.iconBg,
                t.iconRing,
                t.iconGlow,
              ].join(" ")}
            >
              <Icon className={`h-6 w-6 ${t.title}`} />
            </div>

            <h3 className={`text-xl font-semibold mb-2 ${t.title}`}>{title}</h3>
            <p className="text-sm text-white/75 leading-relaxed">{description}</p>
          </div>

          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="absolute -inset-24 bg-[conic-gradient(from_180deg,rgba(255,255,255,0.0),rgba(255,255,255,0.14),rgba(255,255,255,0.0))] blur-2xl" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function StatCard({ value, label, delay = 0 }: { value: string; label: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60 backdrop-blur-xl p-6 text-center"
    >
      <AnimatedGradientOverlay theme={THEME.violet} />
      <div className="relative">
        <div className="text-4xl font-bold text-white mb-1">{value}</div>
        <div className="text-sm text-white/70">{label}</div>
      </div>
    </motion.div>
  );
}

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
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
            background: `linear-gradient(135deg, ${solution.color1}, ${solution.color2})`,
            filter: "blur(20px)",
          }} />
          
          <div className="relative h-full bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-gray-800 group-hover:border-transparent transition-all duration-500 overflow-hidden">
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

            <div className="relative h-full p-8 flex flex-col" style={{ transform: "translateZ(50px)" }}>
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

              <h3 className="text-2xl font-bold mb-3 group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                {solution.title}
              </h3>

              <p className="text-gray-400 mb-6 flex-grow group-hover:text-gray-300 transition-colors">
                {solution.description}
              </p>

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

export default function Home() {
  const [selectedPreviewMetric, setSelectedPreviewMetric] = useState<string | null>(null);

  const actuarialSolutions = [
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

  return (
    <>
      <SEO
        title="Kincaid IQ AI - Fiduciary Grade Transparency Engine"
        description="Enterprise AI platform that shows EBITDA drag with receipts. Real-time incident management, verified cost optimization, and cryptographic evidence trails."
      />
      
      <Nav />

      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        
        {/* Enhanced Hero Section */}
        <section className="relative pt-32 pb-20 px-4 overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.15),transparent_50%)]" />
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
              className="absolute top-1/3 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.5, 0.3, 0.5],
              }}
              transition={{ duration: 10, repeat: Infinity, delay: 2 }}
            />
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto">
            {/* Top Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center mb-8"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 backdrop-blur-xl">
                <Receipt className="h-4 w-4 text-violet-300" />
                <span className="text-sm text-violet-200">Fiduciary Grade Transparency Engine</span>
              </div>
            </motion.div>

            {/* Main Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center mb-6"
            >
              <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent mb-4">
                Kincaid iQ AI
              </h1>
              <div className="text-2xl md:text-4xl font-semibold text-white/90 mb-6">
                Shows EBITDA Drag With Receipts
              </div>
            </motion.div>

            {/* What It Is - Detailed Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-5xl mx-auto mb-12"
            >
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/60 backdrop-blur-xl p-8 md:p-12">
                <AnimatedGradientOverlay theme={THEME.violet} />
                
                <div className="relative space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center">
                      <Eye className="w-6 h-6 text-violet-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">What Kincaid iQ Is</h3>
                      <p className="text-white/80 leading-relaxed">
                        Kincaid iQ is an enterprise transparency engine that transforms how organizations understand and prove their financial performance. 
                        It's not just another analytics platform—it's a fiduciary-grade accountability system that turns every cost optimization claim, 
                        every efficiency gain, and every business decision into cryptographically verified, audit-ready evidence.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                      <Brain className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Kincaid iQ Does This For You</h3>
                      <p className="text-white/80 leading-relaxed">
                        Using Kincaid iQ feels like having X-ray vision into your business operations. The moment you log in, you see real-time 
                        incidents, ranked by financial impact, with full evidence chains showing exactly where money is leaking. It's the difference 
                        between "we think we're saving money" and "here's the cryptographic proof of $2.4M in verified savings with complete 
                        attribution to source transactions."
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                      <Lightbulb className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">The Experience</h3>
                      <p className="text-white/80 leading-relaxed">
                        Every number tells a story. Click any metric and watch it decompose into constituent evidence—contracts, claims, 
                        invoices, policies. The War Room shows you what's happening <span className="text-emerald-400 font-semibold">right now</span>: 
                        duplicate payments being flagged, policy violations being caught, vendor overcharges being stopped. It's control 
                        tower visibility with blockchain-level proof, giving CFOs the confidence to defend every dollar in earnings calls.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-fuchsia-500/20 flex items-center justify-center">
                      <Globe className="w-6 h-6 text-fuchsia-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Built for Accountability</h3>
                      <p className="text-white/80 leading-relaxed">
                        This is infrastructure for fiduciary accountability in the AI age. When autonomous agents are making million-dollar 
                        decisions, when algorithms are optimizing supply chains, when AI is negotiating contracts—Kincaid iQ ensures every 
                        action is traceable, every claim is provable, and every outcome is defensible to boards, auditors, and regulators.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Primary CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 justify-center mb-8"
            >
              <Link href="/war-room">
                <motion.div
                  className="relative group cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-violet-600 rounded-xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                  <div className="absolute inset-0 translate-y-1 bg-gradient-to-br from-blue-700 to-violet-700 rounded-xl" />
                  <motion.div
                    className="relative px-8 py-4 bg-gradient-to-br from-blue-600 to-violet-600 rounded-xl overflow-hidden"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{
                        x: ["-100%", "200%"],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div className="relative flex items-center gap-2 text-white font-semibold text-lg">
                      <span>Launch War Room</span>
                      <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="h-5 w-5" />
                      </motion.div>
                    </div>
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    >
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-white rounded-full"
                          style={{
                            left: `${20 + i * 15}%`,
                            top: "50%",
                          }}
                          animate={{
                            y: [-20, -40],
                            opacity: [0, 1, 0],
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.1,
                          }}
                        />
                      ))}
                    </motion.div>
                  </motion.div>
                  <motion.div
                    className="absolute inset-0 rounded-xl border-2 border-violet-400/50"
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                </motion.div>
              </Link>

              <Link href="/request-demo">
                <motion.div
                  className="relative group cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute inset-0 bg-white/10 rounded-xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
                  <div className="absolute inset-0 translate-y-1 bg-white/5 rounded-xl border border-white/10" />
                  <motion.div
                    className="relative px-8 py-4 bg-slate-900/80 backdrop-blur-xl rounded-xl border border-white/20 overflow-hidden"
                    whileHover={{ y: -2, borderColor: "rgba(255,255,255,0.4)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/20 to-transparent opacity-0 group-hover:opacity-100"
                      animate={{
                        x: ["-100%", "200%"],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 0.5,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative flex items-center gap-2 text-white font-semibold text-lg">
                      <span>Request Demo</span>
                    </div>
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100"
                    >
                      <motion.div
                        className="absolute inset-0 border-2 border-white/30 rounded-xl"
                        animate={{
                          scale: [1, 1.5],
                          opacity: [0.5, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                        }}
                      />
                    </motion.div>
                  </motion.div>
                  <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/40 rounded-tl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/40 rounded-br-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-8 text-sm text-white/60"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>SOC 2 Type II Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>150M+ Transactions/Month</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>47ms Average Latency</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>100% Audit Traceability</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Value Proposition */}
        <section className="py-16 px-4 border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-[2.64rem] md:text-[3.3rem] font-bold text-white mb-4">Fiduciary Grade Intelligence</h2>
              <p className="text-lg text-white/70 max-w-3xl mx-auto mb-6">
                Every metric backed by cryptographic evidence trails. No black boxes, no trust-me numbers.
              </p>
              <p className="text-base text-white/60 max-w-4xl mx-auto">
                Built for boards, auditors, and regulators who demand defensible methodologies, traceable inputs, and immutable proof of business outcomes.
              </p>
            </motion.div>

            {/* Core Pillars */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              <FeatureCard
                icon={Receipt}
                title="Evidence Receipts"
                description="Every cost optimization claim backed by cryptographically signed proof and immutable audit trails"
                href="/evidence-receipts"
                themeKey="violet"
                delay={0}
              />
              <FeatureCard
                icon={TrendingUp}
                title="EBITDA Impact"
                description="Real-time visibility into financial leakage, cost drag, and verified savings with defensible attribution"
                href="/verified-savings-ledger"
                themeKey="emerald"
                delay={0.1}
              />
              <FeatureCard
                icon={FileCheck}
                title="Fiduciary Grade"
                description="Audit-ready documentation, regulatory compliance, and board-level reporting with traceable inputs"
                href="/security-governance"
                themeKey="cyan"
                delay={0.2}
              />
            </div>

            {/* Technical Foundation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h3 className="text-2xl font-bold text-white mb-8 text-center">Technical Foundation</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60 backdrop-blur-xl p-6">
                  <AnimatedGradientOverlay theme={THEME.blue} />
                  <div className="relative">
                    <Database className="h-8 w-8 text-blue-400 mb-4" />
                    <h4 className="text-lg font-semibold text-white mb-2">Cryptographic Signatures</h4>
                    <p className="text-sm text-white/70 mb-4">
                      Every evidence receipt includes SHA-256 hash, timestamp, and digital signature creating an immutable chain of custody
                    </p>
                    <ul className="space-y-2 text-sm text-white/60">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                        <span>HMAC-based verification with rotating keys</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                        <span>Merkle tree aggregation for batch validation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                        <span>Time-locked hashes prevent backdating</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60 backdrop-blur-xl p-6">
                  <AnimatedGradientOverlay theme={THEME.emerald} />
                  <div className="relative">
                    <Lock className="h-8 w-8 text-emerald-400 mb-4" />
                    <h4 className="text-lg font-semibold text-white mb-2">Audit Trail Architecture</h4>
                    <p className="text-sm text-white/70 mb-4">
                      Event-sourced ledger captures every state transition with complete lineage from raw data to reported metrics
                    </p>
                    <ul className="space-y-2 text-sm text-white/60">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span>Append-only log with zero data deletion</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span>Point-in-time reconstruction for any date</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span>Actor attribution for every modification</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60 backdrop-blur-xl p-6">
                  <AnimatedGradientOverlay theme={THEME.violet} />
                  <div className="relative">
                    <FileText className="h-8 w-8 text-violet-400 mb-4" />
                    <h4 className="text-lg font-semibold text-white mb-2">Methodology Documentation</h4>
                    <p className="text-sm text-white/70 mb-4">
                      Every calculation includes versioned methodology, assumptions, and confidence intervals with statistical validation
                    </p>
                    <ul className="space-y-2 text-sm text-white/60">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-violet-400 mt-0.5 flex-shrink-0" />
                        <span>Peer-reviewed algorithms with academic citations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-violet-400 mt-0.5 flex-shrink-0" />
                        <span>Monte Carlo simulation for uncertainty bounds</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-violet-400 mt-0.5 flex-shrink-0" />
                        <span>Version control for methodology evolution</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60 backdrop-blur-xl p-6">
                  <AnimatedGradientOverlay theme={THEME.cyan} />
                  <div className="relative">
                    <Shield className="h-8 w-8 text-cyan-400 mb-4" />
                    <h4 className="text-lg font-semibold text-white mb-2">Compliance Framework</h4>
                    <p className="text-sm text-white/70 mb-4">
                      SOC 2 Type II certified infrastructure with role-based access control and regulatory reporting automation
                    </p>
                    <ul className="space-y-2 text-sm text-white/60">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                        <span>GDPR, SOX, and HIPAA compliance modules</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                        <span>Automated evidence collection for audits</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                        <span>Continuous monitoring with alert escalation</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Verification Process */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h3 className="text-2xl font-bold text-white mb-8 text-center">Five-Layer Verification</h3>
              <div className="grid md:grid-cols-5 gap-4">
                {[
                  { num: "1", label: "Data Ingestion", desc: "Source validation & schema enforcement" },
                  { num: "2", label: "Calculation", desc: "Versioned algorithms with test coverage" },
                  { num: "3", label: "Attribution", desc: "Causal analysis with confidence scoring" },
                  { num: "4", label: "Signature", desc: "Cryptographic hash & timestamp lock" },
                  { num: "5", label: "Audit Export", desc: "Proof pack generation for third parties" },
                ].map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60 backdrop-blur-xl p-6 text-center"
                  >
                    <AnimatedGradientOverlay theme={THEME.blue} />
                    <div className="relative">
                      <div className="text-3xl font-bold text-blue-400 mb-2">{step.num}</div>
                      <div className="text-sm font-semibold text-white mb-2">{step.label}</div>
                      <div className="text-xs text-white/60">{step.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Stakeholder Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-white mb-8 text-center">Built for Stakeholder Confidence</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60 backdrop-blur-xl p-6">
                  <AnimatedGradientOverlay theme={THEME.violet} />
                  <div className="relative">
                    <Users className="h-8 w-8 text-violet-400 mb-4" />
                    <h4 className="text-lg font-semibold text-white mb-3">Board & Executives</h4>
                    <ul className="space-y-2 text-sm text-white/60">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-violet-400 mt-0.5 flex-shrink-0" />
                        <span>Defensible numbers for earnings calls</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-violet-400 mt-0.5 flex-shrink-0" />
                        <span>Risk-adjusted EBITDA impact reporting</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-violet-400 mt-0.5 flex-shrink-0" />
                        <span>One-click proof packs for due diligence</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60 backdrop-blur-xl p-6">
                  <AnimatedGradientOverlay theme={THEME.emerald} />
                  <div className="relative">
                    <Award className="h-8 w-8 text-emerald-400 mb-4" />
                    <h4 className="text-lg font-semibold text-white mb-3">Auditors & Regulators</h4>
                    <ul className="space-y-2 text-sm text-white/60">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span>Complete audit trail with zero data gaps</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span>Automated compliance reporting exports</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span>Independent verification of calculations</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60 backdrop-blur-xl p-6">
                  <AnimatedGradientOverlay theme={THEME.cyan} />
                  <div className="relative">
                    <Briefcase className="h-8 w-8 text-cyan-400 mb-4" />
                    <h4 className="text-lg font-semibold text-white mb-3">Investors & Capital</h4>
                    <ul className="space-y-2 text-sm text-white/60">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                        <span>Pre-close validation of synergy claims</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                        <span>Post-close value tracking with receipts</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                        <span>Portfolio-wide benchmarking standards</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* See it In Action */}
        <section className="py-16 px-4 border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <div className="flex items-end justify-between gap-6">
                <div>
                  <div className="text-xs text-white/60 mb-3">Live Platform</div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">See it In Action</h2>
                  <p className="text-white/70 max-w-3xl">
                    Real-time KPIs that expose financial leakage, incentive misalignment, and structural blind spots.
                    Every metric traceable to underlying evidence—claims, contracts, and verifiable inputs.
                  </p>
                </div>

                <div className="hidden md:block">
                  <Link href="/war-room">
                    <Button className="rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700">
                      Launch Full War Room <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              onClick={() => setSelectedPreviewMetric("interactive")}
              className="cursor-pointer"
            >
              <WarRoomPreview />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-sm text-white/60"
            >
              Click any metric to explore drill-downs, evidence trails, and exportable proof packs.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-6 md:hidden"
            >
              <Link href="/war-room">
                <Button className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600">
                  Launch Full War Room <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Platform Features */}
        <section className="py-16 px-4 border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Platform Capabilities</h2>
              <p className="text-lg text-white/70">Enterprise-grade intelligence infrastructure</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              <FeatureCard
                icon={Shield}
                title="War Room"
                description="Real-time incident management with AI-powered event ranking and governance automation"
                href="/war-room"
                themeKey="blue"
                delay={0}
              />
              <FeatureCard
                icon={TrendingUp}
                title="Verified Savings Ledger"
                description="Blockchain-backed cost optimization tracking with immutable audit trails and EBITDA attribution"
                href="/verified-savings-ledger"
                themeKey="emerald"
                delay={0.1}
              />
              <FeatureCard
                icon={Database}
                title="Evidence Receipts"
                description="Cryptographically signed proof of business outcomes with defensible methodologies"
                href="/evidence-receipts"
                themeKey="violet"
                delay={0.2}
              />
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="py-16 px-4 bg-slate-950/40">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Why Kincaid iQ</h2>
              <p className="text-lg text-white/70">Transparency engine built for fiduciary accountability</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              <FeatureCard
                icon={Award}
                title="Verifiable Evidence"
                description="Blockchain-backed proof with cryptographic signatures. Every claim traceable to source data, contracts, and defined methodologies."
                href="/evidence-receipts"
                themeKey="cyan"
                delay={0}
              />
              <FeatureCard
                icon={Zap}
                title="Real-time Intelligence"
                description="Live event streaming, AI-powered ranking, and instant governance automation with sub-100ms latency"
                href="/war-room"
                themeKey="violet"
                delay={0.1}
              />
              <FeatureCard
                icon={Lock}
                title="Fiduciary Security"
                description="SOC 2 Type II compliant with end-to-end encryption, audit trails, and role-based access control"
                href="/security-governance"
                themeKey="blue"
                delay={0.2}
              />
              <FeatureCard
                icon={Cpu}
                title="Enterprise Integration"
                description="Native connectors for Snowflake, Databricks, ServiceNow with pre-built adapters for major platforms"
                href="/marketplace"
                themeKey="emerald"
                delay={0.3}
              />
            </div>
          </div>
        </section>

        {/* Actuarial Employee Benefits Solutions Section */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950" />
          <motion.div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: "radial-gradient(circle at 2px 2px, rgba(168, 85, 247, 0.4) 1px, transparent 0)",
              backgroundSize: "48px 48px",
            }}
            animate={{
              backgroundPosition: ["0px 0px", "48px 48px"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <motion.h2
                className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
                animate={{
                  textShadow: [
                    "0 0 20px rgba(168, 85, 247, 0.5)",
                    "0 0 40px rgba(236, 72, 153, 0.5)",
                    "0 0 20px rgba(59, 130, 246, 0.5)",
                    "0 0 20px rgba(168, 85, 247, 0.5)",
                  ],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                Actuarial Employee Benefits Solutions
              </motion.h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Comprehensive AI-powered solutions for modern employee benefits management
              </p>
            </motion.div>

            {/* 12 Interactive Solution Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
              {actuarialSolutions.map((solution, index) => (
                <SolutionCard3D key={index} solution={solution} index={index} />
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Link href="/actuarial-benefits">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative px-12 py-6 text-xl font-bold text-white rounded-2xl overflow-hidden group"
                >
                  <div className="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 animate-pulse">
                    <div className="h-full w-full rounded-2xl bg-slate-900" />
                  </div>
                  
                  <span className="relative z-10 flex items-center gap-3">
                    <Sparkles className="w-6 h-6" />
                    Explore All Solutions
                    <Sparkles className="w-6 h-6" />
                  </span>

                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-6">
              <StatCard value="99.9%" label="Uptime SLA" delay={0} />
              <StatCard value="<100ms" label="Event Latency" delay={0.1} />
              <StatCard value="10M+" label="Events/Day" delay={0.2} />
              <StatCard value="100%" label="Traceable Metrics" delay={0.3} />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/60 backdrop-blur-xl p-12 text-center"
            >
              <AnimatedGradientOverlay theme={THEME.violet} />
              
              <div className="relative">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Ready to Show EBITDA Impact With Receipts?
                </h2>
                <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
                  Join enterprises using Kincaid iQ for fiduciary-grade transparency and verified outcomes
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link href="/request-demo">
                    <Button size="lg" className="group bg-white text-black hover:bg-white/90">
                      Schedule Demo
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link href="/platform">
                    <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10">
                      Explore Platform
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}