import Link from "next/link";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Linkedin, Sparkles, Target, Zap, TrendingUp, Shield, LucideIcon, Award, Users, Rocket, Brain } from "lucide-react";
import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useState, useEffect, MouseEvent } from "react";

// Types
interface BlockData {
  icon: LucideIcon;
  title: string;
  content: string;
  bullets: string[];
}

interface TimelineItem {
  year: string;
  company: string;
  role: string;
  highlights: string[];
}

// Separate component for 3D Blocks to handle hooks correctly
function CompanyBlock({ block, index }: { block: BlockData; index: number }) {
  const blockX = useMotionValue(0);
  const blockY = useMotionValue(0);
  const blockRotateX = useTransform(blockY, [-0.5, 0.5], [10, -10]);
  const blockRotateY = useTransform(blockX, [-0.5, 0.5], [-10, 10]);

  const handleBlockMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    blockX.set((e.clientX - centerX) / rect.width);
    blockY.set((e.clientY - centerY) / rect.height);
  };

  const handleBlockMouseLeave = () => {
    blockX.set(0);
    blockY.set(0);
  };

  const Icon = block.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9 + index * 0.1 }}
      className="perspective-[1500px]"
    >
      <motion.div
        style={{
          rotateX: blockRotateX,
          rotateY: blockRotateY,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleBlockMouseMove}
        onMouseLeave={handleBlockMouseLeave}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative h-full group"
      >
        {/* Vegas Multi-Layer Glow */}
        <motion.div
          className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(45deg, ${
              index % 3 === 0 ? '#ec4899, #3b82f6' : index % 3 === 1 ? '#3b82f6, #a855f7' : '#a855f7, #ec4899'
            })`,
            filter: "blur(15px)",
          }}
        />

        <div
          className="relative h-full bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-black/95 backdrop-blur-xl rounded-2xl p-8 border border-pink-500/30 overflow-hidden"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Vegas Animated Background */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${
                index % 3 === 0 ? 'rgba(236,72,153,0.1)' : index % 3 === 1 ? 'rgba(59,130,246,0.1)' : 'rgba(168,85,247,0.1)'
              } 0%, transparent 50%)`,
            }}
          />

          <div className="relative space-y-4" style={{ transform: "translateZ(20px)" }}>
            {/* Icon with Vegas Glow */}
            <motion.div
              className="inline-flex"
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <div className="relative">
                <div className={`absolute inset-0 rounded-full blur-xl opacity-75 ${
                  index % 3 === 0 ? 'bg-pink-500' : index % 3 === 1 ? 'bg-blue-500' : 'bg-purple-500'
                }`} />
                <Icon className={`relative w-12 h-12 ${
                  index % 3 === 0 ? 'text-pink-400' : index % 3 === 1 ? 'text-blue-400' : 'text-purple-400'
                }`} />
              </div>
            </motion.div>

            <h3 className={`text-2xl font-bold bg-gradient-to-r ${
              index % 3 === 0 ? 'from-pink-400 to-blue-400' : index % 3 === 1 ? 'from-blue-400 to-purple-400' : 'from-purple-400 to-pink-400'
            } bg-clip-text text-transparent`}>
              {block.title}
            </h3>

            <p className="text-gray-300 leading-relaxed">
              {block.content}
            </p>

            {/* Vegas-Style Bullet List */}
            <ul className="space-y-2 pt-4">
              {block.bullets.map((bullet, bulletIndex) => (
                <motion.li
                  key={bulletIndex}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: bulletIndex * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3 group/bullet"
                >
                  <motion.div
                    whileHover={{ scale: 1.3, rotate: 180 }}
                    className={`mt-1 w-1.5 h-1.5 rounded-full ${
                      index % 3 === 0 ? 'bg-pink-400' : index % 3 === 1 ? 'bg-blue-400' : 'bg-purple-400'
                    } shadow-lg ${
                      index % 3 === 0 ? 'shadow-pink-400/50' : index % 3 === 1 ? 'shadow-blue-400/50' : 'shadow-purple-400/50'
                    } group-hover/bullet:shadow-xl transition-all duration-300`}
                  />
                  <span className="text-gray-300 group-hover/bullet:text-white transition-colors duration-300">
                    {bullet}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function CompanyPage() {
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; duration: number; delay: number }>>([]);

  useEffect(() => {
    setMounted(true);
    const particleArray = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 15 + Math.random() * 15,
      delay: Math.random() * 5,
    }));
    setParticles(particleArray);
  }, []);

  const leadershipX = useMotionValue(0);
  const leadershipY = useMotionValue(0);
  const leadershipRotateX = useTransform(leadershipY, [-0.5, 0.5], [15, -15]);
  const leadershipRotateY = useTransform(leadershipX, [-0.5, 0.5], [-15, 15]);

  const handleLeadershipMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    leadershipX.set((e.clientX - centerX) / rect.width);
    leadershipY.set((e.clientY - centerY) / rect.height);
  };

  const handleLeadershipMouseLeave = () => {
    leadershipX.set(0);
    leadershipY.set(0);
  };

  const blocks: BlockData[] = [
    {
      icon: Target,
      title: "Mission",
      content: "To empower enterprises with autonomous AI agents that turn messy data into verified business intelligence, enabling confident decision-making at scale.",
      bullets: [
        "Transform data chaos into actionable insights",
        "Eliminate manual verification bottlenecks",
        "Scale intelligence across the enterprise",
        "Enable real-time decision confidence"
      ]
    },
    {
      icon: Sparkles,
      title: "Vision",
      content: "A world where every business decision is backed by verified, real-time intelligence—where AI agents autonomously validate data, detect opportunities, and prevent value leakage.",
      bullets: [
        "Universal data intelligence platform",
        "Self-healing data ecosystems",
        "Predictive opportunity detection",
        "Zero-latency decision support"
      ]
    },
    {
      icon: Zap,
      title: "Innovation",
      content: "We're pioneering the next generation of enterprise AI: autonomous agents that don't just analyze data—they validate it, cross-reference it, and prove their findings with cryptographic evidence.",
      bullets: [
        "Cryptographically signed evidence trails",
        "Multi-source data validation",
        "Autonomous arbitrage detection",
        "Real-time discrepancy resolution"
      ]
    },
    {
      icon: TrendingUp,
      title: "Impact",
      content: "Our platform has helped organizations recover millions in hidden value, prevent compliance violations, and accelerate decision-making from weeks to minutes.",
      bullets: [
        "Millions recovered in value leakage",
        "90% reduction in manual validation",
        "Real-time compliance monitoring",
        "10x faster executive decision-making"
      ]
    }
  ];

  const timeline: TimelineItem[] = [
    {
      year: "2024-Present",
      company: "SiriusB iQ AI Data Sciences Lab",
      role: "CEO & Chairman",
      highlights: [
        "Architecting Kincaid IQ flagship AI-enabled consulting platform",
        "Built AI-enabled pharmacy savings opportunity engine",
        "Implemented evidence-backed delivery workflows with audit-ready reporting",
        "Established ethical AI governance emphasizing human-centered decisioning"
      ]
    },
    {
      year: "2025-Present",
      company: "Kincaid Risk Management Consultants",
      role: "Chief Executive Officer",
      highlights: [
        "Leads enterprise operating cadence across strategy, delivery, and performance",
        "Drives PBM/Rx consulting with contract analytics and measurable impact",
        "Establishes governance mechanisms with closed-loop execution",
        "Positions KRMC as analytics-forward consultancy"
      ]
    },
    {
      year: "2020-2024",
      company: "Retro Redesign & Fine Arts",
      role: "CEO & Co-Founder",
      highlights: [
        "Achieved profitability within 30 days of launch",
        "Applied analytics-driven marketing with former Google expert",
        "Delivered 55+ end-to-end projects with quality excellence"
      ]
    },
    {
      year: "2018-2020",
      company: "Huntington National Bank",
      role: "SVP, Client Strategy & Benefit Innovation",
      highlights: [
        "Closed seven-figure non-banking sale",
        "Received Service Heart Award (presented by CEO)",
        "Built and led high-performance teams including MBA and doctoral-level talent",
        "Developed financial benchmarking interface for SVP-level decisioning"
      ]
    },
    {
      year: "2016-2018",
      company: "Aon Risk Solutions",
      role: "Senior Vice President, Business Development",
      highlights: [
        "Delivered $1.2M closed revenue within 12 months",
        "Recognized for selling largest account in Aon USA (Q3 2016)",
        "Built middle-market go-to-market motions with National Practice leadership"
      ]
    },
    {
      year: "2013-2015",
      company: "Brown & Brown Insurance",
      role: "Vice President, Health & Wellness",
      highlights: [
        "Sold $1.1M (2013) and $1.51M (2014) in new consulting services",
        "Managed Health & Benefits portfolio exceeding $1M",
        "Published industry article on on-site primary care clinics"
      ]
    },
    {
      year: "2009-2013",
      company: "National Insurance Services",
      role: "Market Development",
      highlights: [
        "Ranked #1 nationally in sales revenue (2011)",
        "Ranked #2 nationally in sales revenue (2010)",
        "Turned around declining territory with 100% profitability increase",
        "Added 50 public-sector accounts across MI/OH"
      ]
    },
    {
      year: "2005-2009",
      company: "Canon U.S.A.",
      role: "Senior Sales Executive",
      highlights: [
        "Top North America rankings: #1 (2006 & 2007)",
        "Sold enterprise imaging systems to Fortune 500 companies",
        "Trained and mentored new reps on enterprise selling"
      ]
    }
  ];

  return (
    <>
      <SEO
        title="Company - SiriusB iQ | AI Data Sciences Lab"
        description="Meet Jeremiah Shrack, founder of SiriusB iQ. From enterprise sales champion to AI visionary, learn how 20 years of experience shaped the future of autonomous intelligence."
      />
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white relative overflow-hidden">
        {/* Vegas-Style Animated Background */}
        <div className="fixed inset-0 pointer-events-none">
          {/* Neon Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(236,72,153,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(236,72,153,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000,transparent)]" />
          
          {/* Vegas Spotlights */}
          <motion.div
            className="absolute top-0 left-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              x: [-50, 50, -50],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.3, 0.5],
              x: [50, -50, 50],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.6, 0.4],
              y: [-30, 30, -30],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Floating Particles with Vegas Flair */}
          {mounted && particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                background: `radial-gradient(circle, ${
                  particle.id % 3 === 0 ? '#ec4899' : particle.id % 3 === 1 ? '#3b82f6' : '#a855f7'
                }, transparent)`,
                boxShadow: `0 0 20px ${
                  particle.id % 3 === 0 ? '#ec4899' : particle.id % 3 === 1 ? '#3b82f6' : '#a855f7'
                }`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 20 - 10, 0],
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <Nav />

        <main className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Hero Banner with Quote */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-16 relative overflow-hidden rounded-3xl"
            >
              <div className="relative h-[400px] sm:h-[500px]">
                {/* Vegas Neon Border */}
                <motion.div
                  className="absolute -inset-1 rounded-3xl opacity-75 blur-xl"
                  style={{
                    background: "linear-gradient(45deg, #ec4899, #3b82f6, #a855f7, #ec4899)",
                    backgroundSize: "300% 300%",
                  }}
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                />
                
                <div className="relative h-full rounded-3xl overflow-hidden border-2 border-pink-500/30">
                  <img
                    src="/jeremiah-shrack-hero-banner.png"
                    alt="Jeremiah Shrack - The first time I saw GenAI do something that mattered"
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Vegas Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
                </div>
              </div>
            </motion.div>

            {/* Hero Section with Vegas Neon */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <motion.div
                className="inline-block mb-6"
                animate={{
                  textShadow: [
                    "0 0 20px #ec4899, 0 0 40px #ec4899",
                    "0 0 30px #3b82f6, 0 0 60px #3b82f6",
                    "0 0 20px #a855f7, 0 0 40px #a855f7",
                    "0 0 20px #ec4899, 0 0 40px #ec4899",
                  ],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-pink-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                  About SiriusB iQ
                </h1>
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              >
                Pioneering the future of autonomous enterprise intelligence with AI-powered data validation and verification
              </motion.p>
            </motion.div>

            {/* Leadership Section - Vegas Edition */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-24 perspective-[2000px]"
            >
              <motion.div
                className="relative max-w-5xl mx-auto"
                style={{
                  rotateX: leadershipRotateX,
                  rotateY: leadershipRotateY,
                  transformStyle: "preserve-3d",
                }}
                onMouseMove={handleLeadershipMouseMove}
                onMouseLeave={handleLeadershipMouseLeave}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Vegas Neon Border */}
                <motion.div
                  className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: "linear-gradient(45deg, #ec4899, #3b82f6, #a855f7, #ec4899)",
                    backgroundSize: "300% 300%",
                    filter: "blur(20px)",
                  }}
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                />

                <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-black/90 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border border-pink-500/20 group overflow-hidden">
                  {/* Vegas Holographic Shine */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: "linear-gradient(45deg, transparent 30%, rgba(236,72,153,0.1) 50%, transparent 70%)",
                      backgroundSize: "200% 200%",
                    }}
                    animate={{
                      backgroundPosition: ["0% 0%", "200% 200%"],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />

                  {/* Content Grid */}
                  <div className="relative grid md:grid-cols-[300px_1fr] gap-8 items-start" style={{ transformStyle: "preserve-3d" }}>
                    {/* Photo with Vegas Glow */}
                    <motion.div
                      className="relative"
                      style={{ transform: "translateZ(50px)" }}
                      whileHover={{ scale: 1.05, rotateY: 5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <div className="relative overflow-hidden rounded-2xl group/photo">
                        {/* Multi-Layer Vegas Glow */}
                        <div className="absolute -inset-2 bg-gradient-to-r from-pink-500 via-blue-500 to-purple-500 rounded-2xl blur-2xl opacity-50 group-hover/photo:opacity-100 transition-opacity duration-500 animate-pulse" />
                        <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-blue-500 to-purple-500 rounded-2xl blur-xl opacity-75 group-hover/photo:opacity-100 transition-opacity duration-500" />
                        
                        <img
                          src="/jeremiah-shrack-professional.png"
                          alt="Jeremiah Shrack, Founder & CEO"
                          className="relative w-full h-auto rounded-2xl border-2 border-pink-500/50 shadow-2xl"
                        />
                        
                        {/* Vegas Overlay Effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 via-transparent to-purple-500/20 opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300"
                        />
                      </div>

                      {/* Floating Name Badge */}
                      <motion.div
                        className="mt-6 text-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-pink-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                          Jeremiah Shrack
                        </h2>
                        <p className="text-xl text-pink-400 font-semibold mb-3">Founder & CEO</p>
                        <Link
                          href="https://linkedin.com/in/shrack"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 rounded-full text-white font-medium transition-all duration-300 shadow-lg shadow-pink-500/50 hover:shadow-pink-500/70 hover:scale-105"
                        >
                          <Linkedin className="w-5 h-5" />
                          <span>Connect on LinkedIn</span>
                        </Link>
                      </motion.div>
                    </motion.div>

                    {/* Bio with Vegas Typography */}
                    <motion.div
                      className="space-y-6"
                      style={{ transform: "translateZ(30px)" }}
                    >
                      <motion.div
                        className="relative"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 }}
                      >
                        <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                          From Enterprise Sales Champion to AI Visionary
                        </h3>
                        
                        <div className="space-y-4 text-gray-300 leading-relaxed">
                          <p className="text-lg border-l-4 border-pink-500 pl-4 bg-pink-500/5 py-3 rounded-r-lg">
                            <strong className="text-pink-400">"The first time I saw GenAI do something that mattered, it wasn't writing a poem or making a logo."</strong> It was validating a $2M invoice discrepancy in seconds—something that would've taken auditors weeks.
                          </p>

                          <p>
                            That moment crystallized two decades of experience into a singular insight: <strong className="text-purple-400">GenAI's true value isn't in content creation—it's in autonomous data validation at enterprise scale</strong>.
                          </p>

                          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-6 space-y-3">
                            <h4 className="text-xl font-bold text-blue-400 flex items-center gap-2">
                              <Award className="w-5 h-5" />
                              Track Record of Excellence
                            </h4>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-start gap-2">
                                <TrendingUp className="w-4 h-4 text-pink-400 mt-0.5 flex-shrink-0" />
                                <span><strong>#1 National Sales Rankings</strong> at Canon USA (2006, 2007) and National Insurance Services (2011)</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <Award className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                                <span><strong>Huntington Service Heart Award</strong> - Presented by CEO for exceptional client service</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <Rocket className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                                <span><strong>$1.2M+ in closed revenue</strong> at Aon Risk Solutions within first 12 months</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <Users className="w-4 h-4 text-pink-400 mt-0.5 flex-shrink-0" />
                                <span><strong>Built and led high-performance teams</strong> including MBA and doctoral-level professionals</span>
                              </li>
                            </ul>
                          </div>

                          <p>
                            With a career spanning <strong className="text-pink-400">enterprise technology sales</strong>, <strong className="text-blue-400">healthcare benefits consulting</strong>, and <strong className="text-purple-400">management consulting</strong>, Jeremiah recognized that enterprises were drowning in data but starving for verified intelligence. Traditional BI tools required armies of analysts. Modern AI promised automation but lacked accountability.
                          </p>

                          <p className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 rounded-lg p-4">
                            <strong className="text-pink-400">The Genesis Moment:</strong> After 15+ years of watching organizations struggle with <strong className="text-blue-400">manual data validation</strong>, <strong className="text-purple-400">contract arbitrage</strong>, and <strong className="text-pink-400">verification bottlenecks</strong>, Jeremiah founded SiriusB iQ to build what the market desperately needed: <strong className="text-white">autonomous AI agents that prove their work</strong>.
                          </p>

                          <div className="space-y-3">
                            <h4 className="text-xl font-bold text-purple-400">The SiriusB iQ Philosophy</h4>
                            <p>
                              Unlike traditional AI tools that simply generate insights, SiriusB iQ's platform operates on three core principles:
                            </p>
                            <ul className="space-y-2 ml-6">
                              <li className="flex items-start gap-3">
                                <Shield className="w-5 h-5 text-pink-400 mt-1 flex-shrink-0" />
                                <span><strong className="text-pink-400">Verification-First:</strong> Every recommendation includes cryptographically signed evidence trails</span>
                              </li>
                              <li className="flex items-start gap-3">
                                <Brain className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                                <span><strong className="text-blue-400">Human-Centered Decisioning:</strong> AI strengthens leadership judgment, never replaces it</span>
                              </li>
                              <li className="flex items-start gap-3">
                                <Zap className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                                <span><strong className="text-purple-400">Autonomous Execution:</strong> AI agents that act independently with full auditability</span>
                              </li>
                            </ul>
                          </div>

                          <p>
                            Under Jeremiah's leadership, the platform has evolved from a novel concept to a <strong className="text-pink-400">mission-critical enterprise tool</strong> used by organizations to:
                          </p>

                          <ul className="space-y-2 ml-6">
                            <li className="flex items-start gap-3">
                              <TrendingUp className="w-5 h-5 text-pink-400 mt-1 flex-shrink-0" />
                              <span>Recover millions in hidden value leakage and contract arbitrage</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <Shield className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                              <span>Prevent compliance violations before they occur</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <Rocket className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                              <span>Accelerate executive decision-making from weeks to minutes</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <Zap className="w-5 h-5 text-pink-400 mt-1 flex-shrink-0" />
                              <span>Eliminate manual verification bottlenecks across operations</span>
                            </li>
                          </ul>

                          <p className="text-lg italic border-l-4 border-purple-500 pl-4 bg-purple-500/5 py-3 rounded-r-lg">
                            Jeremiah's vision extends beyond current capabilities. He's building toward a future where <strong className="text-purple-400">every business decision is backed by verified, real-time intelligence</strong>—where AI agents autonomously detect opportunities, validate findings, and present evidence-backed recommendations without human intervention.
                          </p>

                          <div className="bg-gradient-to-r from-pink-500/10 to-blue-500/10 border border-pink-500/20 rounded-lg p-6">
                            <h4 className="text-xl font-bold text-pink-400 mb-3">Dual Leadership Role</h4>
                            <p className="mb-3">
                              As <strong className="text-blue-400">CEO of SiriusB iQ</strong> and <strong className="text-purple-400">CEO of Kincaid Risk Management Consultants</strong>, Jeremiah uniquely bridges technology innovation with real-world consulting delivery:
                            </p>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-pink-400 mt-2 flex-shrink-0" />
                                <span><strong>At SiriusB iQ:</strong> Architecting Kincaid IQ, the flagship AI-enabled consulting platform</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                                <span><strong>At KRMC:</strong> Leading PBM/Rx consulting engagements with contract analytics and measurable impact</span>
                              </li>
                            </ul>
                          </div>

                          <p>
                            As a <strong className="text-pink-400">thought leader in enterprise AI</strong>, Jeremiah advocates for a shift from "AI-assisted" to "AI-autonomous" operations, emphasizing that the next competitive advantage belongs to organizations that can trust their AI to act independently—with full auditability.
                          </p>

                          <p className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-blue-400 to-purple-400">
                            His leadership philosophy: <strong>Build systems that don't just work—build systems you can prove work</strong>. Transparency, innovation, and relentless customer success drive every decision at SiriusB iQ.
                          </p>
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Career Timeline Section */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-24"
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-pink-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                20 Years of Enterprise Excellence
              </h2>

              <div className="space-y-6">
                {timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative group"
                  >
                    {/* Vegas Glow Border */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500/50 to-purple-500/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur" />
                    
                    <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 rounded-xl p-6 border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300">
                      <div className="grid md:grid-cols-[200px_1fr] gap-6">
                        {/* Year & Company */}
                        <div className="space-y-2">
                          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full border border-pink-500/30">
                            <span className="text-pink-400 font-bold">{item.year}</span>
                          </div>
                          <h3 className="text-xl font-bold text-blue-400">{item.company}</h3>
                          <p className="text-sm text-purple-400 font-semibold">{item.role}</p>
                        </div>

                        {/* Highlights */}
                        <ul className="space-y-2">
                          {item.highlights.map((highlight, hIndex) => (
                            <li key={hIndex} className="flex items-start gap-3 text-gray-300">
                              <div className="w-1.5 h-1.5 rounded-full bg-pink-400 mt-2 flex-shrink-0" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Vegas-Style Blocks Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="grid md:grid-cols-2 gap-8 mb-24"
            >
              {blocks.map((block, index) => (
                <CompanyBlock key={index} block={block} index={index} />
              ))}
            </motion.div>

            {/* Vegas CTA Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="relative inline-block">
                <motion.div
                  className="absolute -inset-4 rounded-3xl opacity-75 blur-2xl"
                  style={{
                    background: "linear-gradient(45deg, #ec4899, #3b82f6, #a855f7, #ec4899)",
                    backgroundSize: "300% 300%",
                  }}
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                />
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/platform"
                    className="relative inline-flex items-center gap-3 px-12 py-6 bg-gradient-to-r from-pink-600 via-blue-600 to-purple-600 rounded-2xl text-white text-xl font-bold shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 border-2 border-pink-400/50"
                  >
                    <Sparkles className="w-6 h-6" />
                    <span>See It In Action</span>
                    <Sparkles className="w-6 h-6" />
                  </Link>
                </motion.div>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mt-6 text-gray-400 text-lg"
              >
                Experience the future of autonomous enterprise intelligence
              </motion.p>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}