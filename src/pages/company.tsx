"use client";

import { SEO } from "@/components/SEO";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";
import {
  Building2,
  Users,
  Target,
  TrendingUp,
  Shield,
  Sparkles,
  Award,
  Globe,
  Zap,
  Heart,
  X,
  ChevronRight,
  Linkedin,
} from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { leadershipTeam } from "@/lib/server/static-data";

const companyValues = [
  {
    icon: Sparkles,
    title: "Innovation",
    tagline: "Pioneering AI-driven solutions for health economics",
    description: "We push the boundaries of what's possible in health economics through cutting-edge AI and machine learning technologies. Our platform represents a new paradigm in how organizations understand and optimize their benefits spend.",
    principles: [
      "Embrace emerging technologies to solve complex problems",
      "Challenge industry assumptions with data-driven insights",
      "Invest continuously in research and development",
      "Foster a culture of experimentation and learning"
    ],
    gradient: "from-purple-500 via-violet-500 to-purple-600",
    glowColor: "purple"
  },
  {
    icon: Shield,
    title: "Integrity",
    tagline: "Transparent governance and ethical data practices",
    description: "We operate with unwavering ethical standards, ensuring complete transparency in our algorithms, data handling, and client relationships. Trust is the foundation of everything we do.",
    principles: [
      "Maintain complete transparency in all operations",
      "Protect client data with enterprise-grade security",
      "Build systems that are auditable and explainable",
      "Hold ourselves accountable to the highest standards"
    ],
    gradient: "from-blue-500 via-cyan-500 to-blue-600",
    glowColor: "blue"
  },
  {
    icon: Users,
    title: "Collaboration",
    tagline: "Building partnerships that drive industry transformation",
    description: "We believe the best solutions emerge from diverse perspectives. Our collaborative approach brings together actuaries, data scientists, and industry experts to create transformative outcomes.",
    principles: [
      "Foster meaningful relationships with clients and partners",
      "Listen actively to understand unique challenges",
      "Co-create solutions that deliver mutual value",
      "Share knowledge to elevate the entire industry"
    ],
    gradient: "from-green-500 via-emerald-500 to-green-600",
    glowColor: "green"
  },
  {
    icon: Target,
    title: "Impact",
    tagline: "Creating measurable value for organizations and members",
    description: "Every feature we build, every analysis we perform, and every recommendation we make is designed to create tangible, measurable impact on our clients' bottom line and their members' wellbeing.",
    principles: [
      "Focus relentlessly on outcomes that matter",
      "Measure success through client results",
      "Optimize for long-term sustainable value",
      "Balance financial impact with human benefit"
    ],
    gradient: "from-amber-500 via-orange-500 to-amber-600",
    glowColor: "amber"
  },
];

const stats = [
  { label: "Years Combined Experience", value: "50+", icon: Award },
  { label: "Enterprise Clients", value: "100+", icon: Building2 },
  { label: "Average Client Savings", value: "25%", icon: TrendingUp },
  { label: "Platform Uptime", value: "99.9%", icon: Zap },
];

export default function CompanyPage() {
  const [selectedValue, setSelectedValue] = useState<typeof companyValues[0] | null>(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <>
      <SEO
        title="Company | SiriusB iQ AI Data Sciences Lab"
        description="Learn about SiriusB iQ's mission to revolutionize health economics through algorithmic fiduciary platforms and AI-driven benefits intelligence."
      />
      <SiteHeader />

      <div className="min-h-screen bg-black text-white overflow-hidden">
        {/* 3D Hero Section with Parallax */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Animated 3D Background Grid */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-amber-950/20 via-black to-black" />
            <motion.div
              style={{ y: heroY, opacity: heroOpacity }}
              className="absolute inset-0"
            >
              <div className="absolute inset-0" style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(245, 158, 11, 0.1) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(245, 158, 11, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '100px 100px',
                transform: 'perspective(1000px) rotateX(60deg)',
                transformOrigin: 'center top',
              }} />
            </motion.div>
            
            {/* Floating 3D Orbs */}
            <motion.div
              animate={{
                y: [0, -30, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-20 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                y: [0, 30, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
            />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <motion.div
                animate={{
                  rotateY: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="inline-block mb-8"
              >
                <Building2 className="h-20 w-20 text-amber-400" />
              </motion.div>
              
              <h1 className="text-6xl md:text-8xl font-bold mb-6">
                <span className="bg-gradient-to-r from-amber-300 via-amber-100 to-white bg-clip-text text-transparent">
                  Building the Future
                </span>
              </h1>
              
              <p className="text-2xl md:text-3xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                Where <span className="text-amber-400 font-semibold">algorithmic precision</span> meets{" "}
                <span className="text-purple-400 font-semibold">human expertise</span> to revolutionize health economics
              </p>

              {/* 3D Stats Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-5xl mx-auto"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ 
                      scale: 1.05,
                      rotateY: 5,
                      z: 50,
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="relative group"
                    style={{ perspective: "1000px" }}
                  >
                    <div className="relative p-6 rounded-2xl bg-gradient-to-br from-zinc-900/80 to-black/80 border border-amber-500/30 backdrop-blur-xl">
                      <stat.icon className="h-8 w-8 text-amber-400 mb-3 mx-auto group-hover:scale-110 transition-transform duration-300" />
                      <div className="text-4xl font-bold text-amber-100 mb-2">{stat.value}</div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                      
                      {/* 3D Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 via-amber-500/0 to-amber-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Premium 3D Values Section */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/10 to-black" />
          
          <div className="relative max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="inline-block mb-6"
              >
                <Heart className="h-16 w-16 text-amber-400" />
              </motion.div>
              <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-300 via-purple-300 to-blue-300 bg-clip-text text-transparent">
                Our Core Values
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                The principles that guide every decision, every innovation, and every client relationship
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {companyValues.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, rotateX: -15 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{
                    scale: 1.02,
                    rotateY: 2,
                    z: 50,
                  }}
                  className="group relative cursor-pointer"
                  style={{ perspective: "1000px" }}
                  onClick={() => setSelectedValue(value)}
                >
                  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900/80 via-black/60 to-zinc-900/80 border border-white/10 backdrop-blur-xl p-8 hover:border-white/20 transition-all duration-500">
                    {/* 3D Icon Container */}
                    <motion.div
                      whileHover={{ rotateY: 180 }}
                      transition={{ duration: 0.6 }}
                      className="relative w-20 h-20 mb-6"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${value.gradient} opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500`} />
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center`}>
                        <value.icon className="h-10 w-10 text-white" />
                      </div>
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-3xl font-bold text-white mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-400 font-medium mb-4">
                      {value.tagline}
                    </p>
                    
                    {/* Learn More CTA */}
                    <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold group-hover:text-amber-300 transition-colors">
                      <span>Learn More</span>
                      <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>

                    {/* 3D Corner Accents */}
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-20 rounded-bl-[100px] transition-opacity duration-500`} />
                    <div className={`absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr ${value.gradient} opacity-0 group-hover:opacity-20 rounded-tr-[100px] transition-opacity duration-500`} />
                    
                    {/* Animated Glow */}
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.2, 0.1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-10 blur-2xl rounded-3xl`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Value Detail Modal */}
            {selectedValue && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
                onClick={() => setSelectedValue(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0, rotateX: -15 }}
                  animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                  exit={{ scale: 0.9, opacity: 0, rotateX: 15 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                  style={{ perspective: "1000px" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className={`relative bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border border-white/20 rounded-3xl p-10 shadow-2xl`}>
                    {/* Close Button */}
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelectedValue(null)}
                      className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-xl"
                    >
                      <X className="h-6 w-6 text-white" />
                    </motion.button>

                    {/* Icon Header */}
                    <motion.div
                      animate={{ rotateY: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className={`inline-flex p-6 rounded-3xl bg-gradient-to-br ${selectedValue.gradient} mb-8`}
                    >
                      <selectedValue.icon className="h-12 w-12 text-white" />
                    </motion.div>

                    {/* Title & Tagline */}
                    <h2 className="text-5xl font-bold text-white mb-4">
                      {selectedValue.title}
                    </h2>
                    <p className="text-xl text-gray-400 mb-8">
                      {selectedValue.tagline}
                    </p>

                    {/* Description */}
                    <div className="mb-10 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
                      <p className="text-gray-300 text-lg leading-relaxed">
                        {selectedValue.description}
                      </p>
                    </div>

                    {/* Key Principles */}
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <Award className="h-6 w-6 text-amber-400" />
                        Key Principles
                      </h3>
                      <div className="grid gap-4">
                        {selectedValue.principles.map((principle, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ x: 10, scale: 1.02 }}
                            className="flex items-start gap-4 p-5 rounded-xl bg-gradient-to-r from-white/5 to-transparent border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all duration-300"
                          >
                            <div className={`flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br ${selectedValue.gradient} flex items-center justify-center text-white font-bold`}>
                              {idx + 1}
                            </div>
                            <span className="text-gray-300 leading-relaxed">{principle}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Decorative Gradient Orbs */}
                    <div className={`absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br ${selectedValue.gradient} opacity-20 rounded-full blur-3xl`} />
                    <div className={`absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-to-tr ${selectedValue.gradient} opacity-20 rounded-full blur-3xl`} />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </div>
        </section>

        {/* Premium 3D Leadership Section */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-amber-950/10 to-black" />
          
          <div className="relative max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="inline-block mb-6"
              >
                <Users className="h-16 w-16 text-amber-400" />
              </motion.div>
              <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-300 via-white to-amber-300 bg-clip-text text-transparent">
                Leadership Team
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Visionary leaders driving innovation in health economics and AI-powered benefits intelligence
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-10">
              {leadershipTeam.map((leader, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, rotateX: -15 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{
                    scale: 1.02,
                    rotateY: 3,
                    z: 50,
                  }}
                  className="group relative"
                  style={{ perspective: "1500px" }}
                >
                  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900/90 via-black/70 to-zinc-900/90 border border-amber-500/30 backdrop-blur-xl p-8 hover:border-amber-400/50 transition-all duration-500">
                    {/* 3D Profile Image Container */}
                    <motion.div
                      whileHover={{ rotateY: 5, scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="relative w-40 h-40 mx-auto mb-8"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {/* Glow Ring */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 opacity-30 blur-xl group-hover:opacity-50 transition-opacity duration-500" />
                      
                      {/* Image */}
                      <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-amber-400/40 group-hover:border-amber-400/70 transition-all duration-500 shadow-2xl">
                        <img
                          src={leader.image}
                          alt={leader.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>

                      {/* Floating Badge */}
                      <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -top-2 -right-2 w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg"
                      >
                        <Award className="h-6 w-6 text-white" />
                      </motion.div>
                    </motion.div>

                    {/* Content */}
                    <div className="text-center">
                      <h3 className="text-3xl font-bold text-white mb-2">
                        {leader.name}
                      </h3>
                      <p className="text-amber-400 font-semibold text-lg mb-6">
                        {leader.role}
                      </p>
                      <p className="text-gray-400 leading-relaxed mb-8">
                        {leader.bio}
                      </p>

                      {/* LinkedIn Button */}
                      <motion.a
                        href={leader.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 transition-all duration-300"
                      >
                        <Linkedin className="h-5 w-5" />
                        <span>Connect on LinkedIn</span>
                      </motion.a>
                    </div>

                    {/* 3D Corner Accents */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/30 to-transparent rounded-bl-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-amber-500/30 to-transparent rounded-tr-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Animated Background Glow */}
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.3, 0.1],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-transparent to-amber-600/20 opacity-0 group-hover:opacity-100 blur-3xl rounded-3xl"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision Section with 3D Cards */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/10 to-black" />
          
          <div className="relative max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-10">
              {/* Mission Card */}
              <motion.div
                initial={{ opacity: 0, x: -30, rotateY: -15 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                whileHover={{ scale: 1.02, rotateY: 3, z: 50 }}
                className="group relative"
                style={{ perspective: "1500px" }}
              >
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900/40 via-black/60 to-blue-900/40 border border-blue-500/30 backdrop-blur-xl p-10 hover:border-blue-400/50 transition-all duration-500">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="inline-flex p-5 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 mb-6 shadow-lg shadow-blue-500/30"
                  >
                    <Target className="h-10 w-10 text-white" />
                  </motion.div>
                  
                  <h3 className="text-4xl font-bold text-white mb-6">
                    Our Mission
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    To revolutionize health economics by combining actuarial precision with AI-driven insights, 
                    empowering organizations to make data-informed decisions that optimize costs while improving 
                    member outcomes and experience.
                  </p>

                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-transparent rounded-bl-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <motion.div
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 blur-3xl rounded-3xl"
                  />
                </div>
              </motion.div>

              {/* Vision Card */}
              <motion.div
                initial={{ opacity: 0, x: 30, rotateY: 15 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                whileHover={{ scale: 1.02, rotateY: -3, z: 50 }}
                className="group relative"
                style={{ perspective: "1500px" }}
              >
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-900/40 via-black/60 to-purple-900/40 border border-purple-500/30 backdrop-blur-xl p-10 hover:border-purple-400/50 transition-all duration-500">
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="inline-flex p-5 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 mb-6 shadow-lg shadow-purple-500/30"
                  >
                    <Globe className="h-10 w-10 text-white" />
                  </motion.div>
                  
                  <h3 className="text-4xl font-bold text-white mb-6">
                    Our Vision
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    To become the trusted algorithmic fiduciary partner for organizations worldwide, setting the 
                    standard for transparent, ethical, and effective health benefits optimization through advanced 
                    AI and human-centered design.
                  </p>

                  {/* Decorative Elements */}
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-tr-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <motion.div
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 2,
                    }}
                    className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 blur-3xl rounded-3xl"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <SiteFooter />
      </div>
    </>
  );
}