"use client";

import type React from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useMemo, useEffect, useRef } from "react";
import { 
  Shield, 
  Users, 
  TrendingUp, 
  Award, 
  X, 
  ChevronRight, 
  Sparkles, 
  Linkedin, 
  Mail, 
  Send,
  AlertTriangle,
  CheckCircle,
  Percent,
  DollarSign,
  Activity,
  FileText,
  Settings,
  Target,
  Lock,
  Zap,
  BarChart3,
  Eye,
  ArrowUpRight
} from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { ImageLightbox } from "@/components/ImageLightbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Head from "next/head";
import Link from "next/link";

const boardMembers = [
  {
    name: "Jeremiah Shrack",
    title: "Founder & Chief Executive Officer",
    image: "/jeremiah-shrack-board.jpg",
    linkedin: "https://www.linkedin.com/in/shrack",
    bio: "Humanitarian and business leader with over two decades of experience engineering intelligent operating systems and scaling organizations.",
    fullBio: {
      introduction: "Over two decades, he has built a reputation for engineering intelligent operating systems, scaling organizations, and redefining how advanced analytics intersect with human judgment. As a senior executive, Jeremiah drives enterprise-wide revenue growth, operational excellence, and high-impact PBM/Rx consulting engagements.",
      platform: "SiriusB iQ is a next-generation intelligent consulting operating system that integrates six purpose-built subsystems extending the reasoning frameworks of VortexAI, LogicAI, and JimShrackExpressAI.",
      philosophy: "Jeremiah approaches AI and analytics through an ethical lens — ensuring that systems enhance, not replace, human decision-making.",
      expertise: [
        "Enterprise Executive Sales and Leadership",
        "Benefits Actuarial Consulting (Jumbo and Large-Market)",
        "AI System Architecture (LogicAI + VertexAI)",
        "PBM/Rx Contract Analytics",
        "Ethical AI Deployment & Governance",
        "Organizational Transformation at Scale"
      ],
      vision: "Grounded in business discipline, faith in God, and respect for humanity, Jeremiah is dedicated to helping employers outperform in the rapidly evolving health, benefits, and AI transformation landscape."
    }
  },
  {
    name: "Dr. Jacqueline El-Sayed",
    title: "Board Director and Distinguished Chief Scientist Officer",
    image: "/dr-jacqueline-el-sayed.png",
    linkedin: "https://www.linkedin.com/in/jacquelineelsayed/",
    bio: "CEO for Intentional Design Group LLC and Intentional Design Institute. Global speaker with leadership across industry, education, and government.",
    fullBio: {
      introduction: "Dr. Jacqueline El-Sayed is the Chief Executive Officer (CEO) for Intentional Design Group LLC and Intentional Design Institute 501c3. She is a builder and global speaker with leadership experience across industry, education, and government.",
      platform: "Dr. El-Sayed began her career as an engineer for General Motors Truck Group and has been nationally recognized as an ACE Fellow, NLA Fellow, and ASEE Fellow & Hall of Famer.",
      philosophy: "Dr. El-Sayed's extensive government service demonstrates a commitment to public safety and policy innovation that translates technical expertise into legislative action.",
      expertise: [
        "CEO Leadership Across Multiple Organizations",
        "Engineering Education & Workforce Development",
        "Research Leadership ($60+ MM in Funded Projects)",
        "Government Policy & Public Safety Commission",
        "Academic Administration & Faculty Development",
        "Manufacturing & Automotive Engineering"
      ],
      vision: "Dr. El-Sayed currently serves on MIT TechAMP Adv Council, NASEM Roundtable for Systemic Change in Undergrad STEM Education, and chairs the Engineering Societies Roundtable."
    }
  },
  {
    name: "Catherine Farley",
    title: "Executive Chair, Committee on Algorithmic Governance",
    image: "/catherine-farley.jpg",
    linkedin: "https://www.linkedin.com/in/catherine-farley-233b28/",
    bio: "Seasoned financial services executive with deep expertise in operational excellence, wealth management, and strategic transformation.",
    fullBio: {
      introduction: "Catherine Farley brings over two decades of financial services leadership to SiriusB iQ's board, with a proven track record of driving operational excellence and strategic transformation at major institutions.",
      platform: "Throughout her career, Catherine has led initiatives that balance innovation with rigorous risk management, ensuring that technological advancement serves fiduciary duty rather than compromising it.",
      philosophy: "Catherine believes that the intersection of AI and fiduciary duty requires a new governance framework—one that treats algorithmic decision-making with the same rigor as human fiduciary responsibility.",
      expertise: [
        "Operational Excellence & Process Optimization",
        "Wealth Management & Fiduciary Governance",
        "Strategic Transformation & Change Management",
        "Risk Management & Compliance Frameworks",
        "Financial Services Leadership",
        "Board Governance & Oversight"
      ],
      vision: "As Executive Chair of the Committee on Algorithmic Governance & Fiduciary Risk, Catherine's vision is to establish SiriusB iQ as the gold standard for ethical AI deployment in benefits management."
    }
  },
  {
    name: "Mike Hamann",
    title: "Board Director & Chair of Public Sector Governance",
    image: "/1517039361817_1_.jpeg",
    linkedin: "https://www.linkedin.com/in/mike-hamann-33274023/",
    bio: "Two-term St. Joseph County Auditor with comprehensive experience across executive policy, legislative intent, and fiscal reality.",
    fullBio: {
      introduction: "Mike Hamann's career in public service is defined by a deep commitment to the residents of St. Joseph County, serving two terms as County Auditor and acting as the county's chief financial officer.",
      platform: "His political insight is rooted in a rare 'triple-threat' of local governance experience, having served on the Board of Commissioners, County Council, and as County Auditor.",
      philosophy: "What sets Mike apart is his commitment to the classroom, balancing public office with teaching U.S. History and Government at Saint Joseph's High School and Marian High School.",
      expertise: [
        "County-Level Fiscal Management",
        "Legislative & Executive Policy Implementation",
        "Property Assessment & Tax Base Protection",
        "Federal Relief Fund Allocation",
        "Government Education & Civic Leadership",
        "U.S. History & Government Instruction"
      ],
      vision: "A proud University of Notre Dame graduate, Mike continues to bridge the gap between the town hall and the classroom, ensuring the next generation understands that Government is a tool for community transformation."
    }
  },
  {
    name: "Kyle Riddle",
    title: "Board Director and Chief of Insurance",
    image: "/1759522317489.png",
    linkedin: "https://www.linkedin.com/in/kyle-riddle-47581946/",
    bio: "Certified Employee Benefits Manager (UPenn) and CFP who brings MIT engineering rigor and Stanford MBA strategic thinking to insurance.",
    fullBio: {
      introduction: "Kyle Riddle is a distinguished insurance executive whose career exemplifies the convergence of academic excellence and practical wisdom in the employee benefits landscape.",
      platform: "Kyle's approach to insurance and benefits consulting is rooted in the belief that technical complexity should never obscure human outcomes.",
      philosophy: "Kyle's guiding philosophy: 'People deserve to live lives better than they could have ever dreamed of.' This conviction drives every actuarial model and risk assessment he produces.",
      expertise: [
        "Regulatory Compliance & Fiduciary Governance",
        "Insurance Risk Management & Actuarial Analysis",
        "Employee Benefits Strategy & Plan Design",
        "Certified Financial Planning",
        "MIT Engineering Rigor Applied to Benefits",
        "Stanford MBA Strategic Frameworks"
      ],
      vision: "At SiriusB iQ, Kyle's vision is to establish a new standard for insurance and benefits intelligence—one where actuarial precision, regulatory mastery, and human-centered design converge."
    }
  },
  {
    name: "Nicole Burns",
    title: "Board Director and Silicon Valley GTM",
    image: "/nicole-burns.jpg",
    linkedin: "https://www.linkedin.com/in/nicburns/",
    bio: "Go-To-Market strategy expert driving enterprise growth, strategic partnerships, and market expansion for technology platforms.",
    fullBio: {
      introduction: "Nicole Burns is a recognized Go-To-Market strategy expert with extensive experience driving growth, strategic partnerships, and market expansion across enterprise landscapes.",
      platform: "Her strategic platform focuses on translating complex actuarial and AI capabilities into compelling enterprise value propositions.",
      philosophy: "Nicole's philosophy centers on the belief that effective go-to-market strategies require deep alignment between market needs and product capabilities.",
      expertise: [
        "Go-To-Market (GTM) Strategy",
        "Enterprise Sales Leadership",
        "Strategic Partnerships & Alliances",
        "Market Expansion & Scaling",
        "Revenue Operations",
        "Commercialization Strategy"
      ],
      vision: "Nicole's vision is to accelerate the adoption of algorithmic fiduciary intelligence across the enterprise landscape, establishing SiriusB iQ as the undeniable standard."
    }
  },
  {
    name: "Eric Dreyfus",
    title: "Board Director and Distinguished Actuarial Science Officer",
    image: "/eric.jpeg",
    linkedin: "https://www.linkedin.com/in/eric-dreyfus-ab47915/",
    bio: "Actuarial science professional with Fortune 500 health and welfare consulting experience across major insurance carriers.",
    fullBio: {
      introduction: "Eric Dreyfus brings decades of actuarial and underwriting expertise to SiriusB iQ's board, with a distinguished career spanning MetLife, Aetna, Towers Perrin, and Mercer.",
      platform: "Eric's consulting platform is built on a foundation of actuarial precision applied to real-world benefit design challenges.",
      philosophy: "Eric's guiding philosophy centers on disrupting the 'status quo' in employee benefits through rigorous financial analysis and transparent cost structures.",
      expertise: [
        "Actuarial Science & Life/Health Underwriting",
        "Fortune 500 Health & Welfare Consulting",
        "Employee Benefit Financial Modeling",
        "COBRA/Premium Calculations",
        "IBNR Reserve & Claim Projection Modeling",
        "Middle to Large Group Risk Assessment"
      ],
      vision: "Eric's vision is to ensure that SiriusB iQ's actuarial intelligence meets the rigorous standards required by sophisticated employers and their fiduciaries."
    }
  }
];

// Live intelligence metrics
const liveMetrics = [
  { label: "Fiduciary Risk Score", value: "9.4", trend: "+12%", icon: Shield, color: "emerald" },
  { label: "Governance Maturity", value: "94%", trend: "+8%", icon: Target, color: "amber" },
  { label: "AI Ethics Compliance", value: "100%", trend: "Stable", icon: Lock, color: "blue" },
  { label: "Board Oversight Index", value: "8.7", trend: "+15%", icon: Eye, color: "violet" }
];

export default function BoardOfDirectorsPage() {
  const [selectedMember, setSelectedMember] = useState<typeof boardMembers[0] | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  // Animated metrics
  const [metricsValues, setMetricsValues] = useState(liveMetrics.map(() => 0));
  
  useEffect(() => {
    const intervals = liveMetrics.map((metric, index) => {
      return setInterval(() => {
        setMetricsValues(prev => {
          const newValues = [...prev];
          const target = parseFloat(metric.value);
          const current = newValues[index];
          newValues[index] = Math.min(current + (target / 50), target);
          return newValues;
        });
      }, 30);
    });
    
    return () => intervals.forEach(clearInterval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    if (hoveredCard !== index) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x, y });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, recipient: selectedMember?.name })
      });
      if (response.ok) {
        toast({ title: "Message Sent", description: `Your message to ${selectedMember?.name} has been delivered.` });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      toast({ title: "Failed", description: "Unable to send your message.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Board of Directors Portal - SiriusB iQ AI Data Sciences Lab</title>
      </Head>
      <SEO
        title="Board of Directors | SiriusB iQ AI Data Sciences Lab"
        description="Meet the board guiding SiriusB iQ's mission to revolutionize health economics through algorithmic fiduciary platforms."
      />
      <Nav />

      <div className="min-h-screen bg-black text-white">
        {/* Premium Hero with Live Dashboard */}
        <motion.section 
          ref={heroRef}
          className="relative pt-24 pb-16 overflow-hidden"
          style={{ opacity, scale }}
        >
          {/* Animated Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-amber-950/30 via-black to-black" />
            <motion.div
              className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-amber-500/20 rounded-full blur-[120px]"
              animate={{ x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-20 right-1/4 w-[500px] h-[500px] bg-emerald-500/15 rounded-full blur-[100px]"
              animate={{ x: [0, -40, 0], y: [0, -20, 0], scale: [1, 1.15, 1] }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
          </div>

          <div className="relative max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center mb-16"
            >
              <div className="flex items-center justify-center gap-4 mb-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Shield className="h-16 w-16 text-amber-400" />
                </motion.div>
                <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-amber-300 via-amber-100 to-white bg-clip-text text-transparent">
                  Board of Directors
                </h1>
              </div>
              <p className="text-2xl md:text-3xl text-gray-300 max-w-4xl mx-auto mb-6 font-light">
                Executive leadership protecting your fiduciary interests
              </p>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                Real-time governance intelligence • Algorithmic oversight • Zero tolerance for waste
              </p>
            </motion.div>

            {/* Live Intelligence Dashboard */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
            >
              {liveMetrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-emerald-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative p-6 rounded-2xl bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 border border-amber-500/30 backdrop-blur-xl">
                      <div className="flex items-center justify-between mb-4">
                        <Icon className={`h-8 w-8 text-${metric.color}-400`} />
                        <motion.div
                          className="text-xs font-semibold text-emerald-400 flex items-center gap-1"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <ArrowUpRight className="h-3 w-3" />
                          {metric.trend}
                        </motion.div>
                      </div>
                      <div className="text-4xl font-bold text-white mb-1">
                        {metricsValues[index].toFixed(metric.label.includes("Score") ? 1 : 0)}
                        {metric.label.includes("%") && "%"}
                      </div>
                      <div className="text-sm text-gray-400">{metric.label}</div>
                      
                      {/* Live pulse indicator */}
                      <div className="absolute top-4 right-4">
                        <motion.div
                          className="w-2 h-2 bg-emerald-400 rounded-full"
                          animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.section>

        {/* Board Members - Premium Grid */}
        <section className="py-16 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950/50 to-black pointer-events-none" />
          
          <div className="relative max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-amber-100 mb-4">Executive Leadership</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Decades of combined expertise in fiduciary governance, actuarial science, and AI ethics
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {boardMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative cursor-pointer"
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => { setHoveredCard(null); setMousePosition({ x: 0.5, y: 0.5 }); }}
                  onMouseMove={(e) => handleMouseMove(e, index)}
                  onClick={() => setSelectedMember(member)}
                >
                  <motion.div
                    className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900/80 via-zinc-900/60 to-zinc-950/80 border border-amber-500/20 p-10 backdrop-blur-xl"
                    animate={{
                      rotateX: hoveredCard === index ? (mousePosition.y - 0.5) * 8 : 0,
                      rotateY: hoveredCard === index ? (mousePosition.x - 0.5) * 8 : 0,
                      scale: hoveredCard === index ? 1.03 : 1,
                      borderColor: hoveredCard === index ? "rgba(251, 191, 36, 0.6)" : "rgba(251, 191, 36, 0.2)",
                      boxShadow: hoveredCard === index 
                        ? "0 30px 60px -15px rgba(251, 191, 36, 0.5)" 
                        : "0 10px 30px -10px rgba(0, 0, 0, 0.3)",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Dynamic glow */}
                    {hoveredCard === index && (
                      <motion.div
                        className="absolute w-96 h-96 bg-gradient-radial from-amber-400/30 via-amber-500/10 to-transparent blur-3xl pointer-events-none"
                        animate={{
                          left: `${mousePosition.x * 100}%`,
                          top: `${mousePosition.y * 100}%`,
                          x: "-50%",
                          y: "-50%",
                        }}
                        transition={{ duration: 0.2 }}
                      />
                    )}

                    {/* Profile Image */}
                    <motion.div
                      className="relative w-40 h-40 mx-auto mb-8 rounded-2xl overflow-hidden border-4 border-amber-500/40"
                      animate={{
                        borderColor: hoveredCard === index ? "rgba(251, 191, 36, 0.9)" : "rgba(251, 191, 36, 0.4)",
                        scale: hoveredCard === index ? 1.1 : 1,
                        y: hoveredCard === index ? -10 : 0,
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      style={{ transform: hoveredCard === index ? "translateZ(40px)" : "translateZ(0px)" }}
                    >
                      <motion.img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                        animate={{ scale: hoveredCard === index ? 1.15 : 1 }}
                        transition={{ duration: 0.6 }}
                      />
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-amber-500/40 to-transparent"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredCard === index ? 1 : 0 }}
                      />
                    </motion.div>

                    {/* Member Info */}
                    <div className="text-center" style={{ transformStyle: "preserve-3d" }}>
                      <motion.h3
                        className="text-3xl font-bold text-amber-100 mb-3"
                        animate={{
                          y: hoveredCard === index ? -5 : 0,
                          scale: hoveredCard === index ? 1.05 : 1,
                        }}
                        style={{ transform: hoveredCard === index ? "translateZ(25px)" : "translateZ(0px)" }}
                      >
                        {member.name}
                      </motion.h3>
                      <motion.p
                        className="text-amber-400 font-semibold mb-6 text-base"
                        animate={{ y: hoveredCard === index ? -4 : 0 }}
                        style={{ transform: hoveredCard === index ? "translateZ(20px)" : "translateZ(0px)" }}
                      >
                        {member.title}
                      </motion.p>
                      <motion.p
                        className="text-gray-400 leading-relaxed mb-8"
                        animate={{
                          color: hoveredCard === index ? "rgb(209, 213, 219)" : "rgb(156, 163, 175)",
                          y: hoveredCard === index ? -3 : 0,
                        }}
                        style={{ transform: hoveredCard === index ? "translateZ(15px)" : "translateZ(0px)" }}
                      >
                        {member.bio}
                      </motion.p>

                      {/* Action Buttons */}
                      <div className="flex gap-4 justify-center">
                        <motion.a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 font-semibold transition-all"
                          onClick={(e) => e.stopPropagation()}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Linkedin className="h-5 w-5" />
                          LinkedIn
                        </motion.a>
                        <motion.button
                          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 text-white font-semibold shadow-lg shadow-amber-500/30"
                          whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -10px rgba(251, 191, 36, 0.5)" }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Sparkles className="h-5 w-5" />
                          Full Profile
                        </motion.button>
                      </div>
                    </div>

                    {/* Decorative corners */}
                    {hoveredCard === index && (
                      <>
                        <motion.div
                          className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-amber-500/40 to-transparent rounded-bl-3xl"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1.1, rotate: 5 }}
                        />
                        <motion.div
                          className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-amber-500/40 to-transparent rounded-tr-3xl"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1.1, rotate: -5 }}
                        />
                      </>
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Profile Modal */}
            <Dialog open={!!selectedMember} onOpenChange={(open) => !open && setSelectedMember(null)}>
              <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border border-amber-500/30">
                {selectedMember && selectedMember.fullBio && (
                  <>
                    <DialogHeader className="border-b border-amber-500/20 pb-6">
                      <div className="flex flex-col md:flex-row gap-6 items-start">
                        <motion.div
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          className="w-40 h-40 rounded-2xl overflow-hidden border-4 border-amber-500/50 cursor-pointer"
                          onClick={(e) => { e.stopPropagation(); setLightboxImage(selectedMember.image); }}
                        >
                          <img src={selectedMember.image} alt={selectedMember.name} className="w-full h-full object-cover" />
                        </motion.div>
                        <div className="flex-1 space-y-4">
                          <DialogTitle className="text-4xl font-bold text-amber-100">{selectedMember.name}</DialogTitle>
                          <p className="text-xl text-amber-400 font-semibold">{selectedMember.title}</p>
                          <a
                            href={selectedMember.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 font-semibold"
                          >
                            <Linkedin className="h-5 w-5" />
                            LinkedIn Profile
                          </a>
                        </div>
                      </div>
                    </DialogHeader>

                    <div className="space-y-8 pt-6">
                      {Object.entries(selectedMember.fullBio).map(([key, value], idx) => {
                        if (key === "expertise") {
                          return (
                            <div key={key}>
                              <h3 className="text-2xl font-bold text-amber-100 mb-4 flex items-center gap-3">
                                <Award className="h-6 w-6 text-amber-400" />
                                Areas of Expertise
                              </h3>
                              <div className="grid md:grid-cols-2 gap-3">
                                {(value as string[]).map((area, i) => (
                                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-amber-500/5 border border-amber-500/10">
                                    <ChevronRight className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                                    <span className="text-gray-300 text-sm">{area}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        }
                        
                        const icons = {
                          introduction: Shield,
                          platform: TrendingUp,
                          philosophy: Users,
                          vision: Sparkles
                        };
                        const Icon = icons[key as keyof typeof icons];
                        
                        return (
                          <div key={key}>
                            <h3 className="text-2xl font-bold text-amber-100 mb-4 flex items-center gap-3">
                              <Icon className="h-6 w-6 text-amber-400" />
                              {key.charAt(0).toUpperCase() + key.slice(1)}
                            </h3>
                            <p className="text-gray-300 leading-relaxed">{value as string}</p>
                          </div>
                        );
                      })}

                      {/* Contact Form */}
                      <div className="p-6 rounded-xl bg-gradient-to-br from-amber-950/20 to-zinc-900/30 border border-amber-500/30">
                        <h3 className="text-2xl font-bold text-amber-100 mb-6 flex items-center gap-2">
                          <Mail className="h-6 w-6 text-amber-400" />
                          Contact {selectedMember.name.split(" ")[0]}
                        </h3>
                        <form onSubmit={handleFormSubmit} className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            <Input name="name" value={formData.name} onChange={handleInputChange} placeholder="Your Name" required className="bg-zinc-900/50 border-amber-500/30 text-gray-200" />
                            <Input name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="Your Email" required className="bg-zinc-900/50 border-amber-500/30 text-gray-200" />
                          </div>
                          <Input name="subject" value={formData.subject} onChange={handleInputChange} placeholder="Subject" required className="bg-zinc-900/50 border-amber-500/30 text-gray-200" />
                          <Textarea name="message" value={formData.message} onChange={handleInputChange} placeholder="Message" required rows={5} className="bg-zinc-900/50 border-amber-500/30 text-gray-200" />
                          <Button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-semibold py-3">
                            {isSubmitting ? "Sending..." : <><Send className="h-4 w-4 mr-2" />Send Message</>}
                          </Button>
                        </form>
                      </div>
                    </div>
                  </>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </section>

        {/* Governance Principles */}
        <section className="py-20 bg-gradient-to-b from-black via-zinc-950/30 to-black">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-bold text-amber-100 mb-6">Governance Principles</h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                The framework guiding every decision we make for your organization
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Zap, title: "Innovation", description: "AI-driven solutions that detect waste and optimize spend" },
                { icon: Shield, title: "Integrity", description: "Transparent governance with full audit trails" },
                { icon: BarChart3, title: "Results", description: "Measurable outcomes backed by actuarial precision" },
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="group relative p-10 rounded-3xl bg-gradient-to-br from-zinc-900/60 to-black/60 border border-amber-500/20 hover:border-amber-500/50 transition-all"
                >
                  <value.icon className="h-16 w-16 text-amber-400 mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-2xl font-bold text-amber-100 mb-4">{value.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-lg">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>

      {lightboxImage && <ImageLightbox isOpen imageSrc={lightboxImage} imageAlt="Board member" onClose={() => setLightboxImage(null)} />}
    </>
  );
}