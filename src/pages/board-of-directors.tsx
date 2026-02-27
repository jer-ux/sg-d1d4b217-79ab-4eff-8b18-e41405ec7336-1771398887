"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { SEO } from "@/components/SEO";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { X, Linkedin, Mail } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface BoardMember {
  name: string;
  title: string;
  image: string;
  bio: {
    leadership?: string;
    platform?: string;
    philosophy?: string;
    expertise?: string[];
    vision?: string;
  };
  linkedin?: string;
  email?: string;
}

const boardMembers: BoardMember[] = [
  {
    name: "Jeremiah Shrack",
    title: "Founder & Chief Executive Officer",
    image: "/jeremiah-shrack-board.jpg",
    bio: {
      leadership: "Over two decades, Jeremiah has built a reputation for engineering intelligent operating systems, scaling organizations, and redefining how advanced analytics intersect with human judgment. As President and Chief Executive Officer of Kincaid Risk Management Consultants (KRMC), he drives enterprise-wide revenue growth, operational excellence, and high-impact PBM/Rx consulting engagements.",
      platform: "Kincaid IQ is a next-generation intelligent consulting operating system that integrates six purpose-built subsystems extending the reasoning frameworks of VortexAI, LogicAI, and JimShrackExpressAI. Each operating system is strategically designed to accelerate AI transformation in industries Jeremiah identifies as early adopters of intelligent automation.",
      philosophy: "Jeremiah approaches AI and analytics through an ethical lens — ensuring that Kincaid's systems enhance, not replace, human decision-making. His leadership philosophy emphasizes clarity, accountability, and innovation, translating strategic objectives into scalable processes and measurable outcomes across the enterprise.",
      expertise: [
        "Enterprise Executive Sales and Leadership",
        "Benefits Actuarial Consulting",
        "AI System Architecture (LogicAI + VertexAI)",
        "PBM/Rx Contract Analytics",
        "Ethical AI Deployment & Governance",
        "Organizational Transformation at Scale"
      ],
      vision: "Grounded in business discipline, faith in God, and respect for humanity, Jeremiah is dedicated to helping employers outperform in the rapidly evolving health, benefits, and AI transformation landscape. He leverages a combined 20 years of consulting experience to deliver significant savings on self-funded contracts through transparent, data-driven actuarial insights."
    },
    linkedin: "https://www.linkedin.com/in/jeremiah-shrack",
    email: "jeremiah@siriusbiq.com"
  },
  {
    name: "Mike Hamann",
    title: "Board Member - Public Service & Fiscal Leadership",
    image: "/Hamann_Michael.jpg",
    bio: {
      leadership: "Mike Hamann brings decades of distinguished public service and fiscal leadership to SiriusB iQ's Board of Directors. As former Indiana State Representative and Chair of the House Ways and Means Committee, Mike shaped state fiscal policy and championed transparency in government spending. His expertise in public finance, regulatory compliance, and institutional governance provides invaluable strategic guidance to SiriusB iQ's mission.",
      platform: "Mike's platform emphasizes accountability, transparency, and fiduciary responsibility—principles that align perfectly with SiriusB iQ's algorithmic fiduciary approach. His deep understanding of public sector benefits administration and regulatory frameworks helps ensure SiriusB iQ's solutions meet the highest standards of compliance and governance.",
      philosophy: "Mike believes that technology and data science can transform how organizations manage fiduciary responsibilities, particularly in healthcare benefits. He advocates for solutions that eliminate conflicts of interest, provide real-time visibility, and ensure every dollar serves its intended purpose. His public service ethos drives his commitment to solutions that benefit all stakeholders.",
      expertise: [
        "State & Municipal Government Finance",
        "Legislative Policy & Regulatory Compliance",
        "Public Sector Benefits Administration",
        "Fiduciary Governance & Oversight",
        "Institutional Risk Management",
        "Strategic Planning & Executive Leadership"
      ],
      vision: "Mike envisions SiriusB iQ becoming the trusted standard for benefits intelligence across public and private sectors—a platform that brings government-grade transparency and accountability to enterprise benefits management. He sees the company's technology as essential infrastructure for responsible stewardship of employee benefit funds."
    },
    linkedin: "https://www.linkedin.com/in/mike-hamann"
  },
  {
    name: "Dr. Michael Ochieng'",
    title: "Distinguished Chief Research & Technology Officer",
    image: "/1766487748644.jpeg",
    bio: {
      leadership: "Dr. Michael Ochieng' serves as Distinguished Chief Research & Technology Officer at SiriusB iQ, where he leads groundbreaking research in AI-driven healthcare analytics and algorithmic fiduciary systems. With a distinguished career spanning academia, industry research, and technology innovation, Dr. Ochieng' brings world-class expertise in machine learning, data science, and healthcare informatics to drive SiriusB iQ's technological leadership.",
      platform: "Dr. Ochieng's research platform focuses on advancing the state-of-the-art in healthcare AI, predictive modeling, and real-time decision support systems. His work encompasses natural language processing for clinical documentation, computer vision for medical imaging, and reinforcement learning for optimal treatment pathways. At SiriusB iQ, he architects the advanced analytics engines that power the War Room™ and Verified Savings Ledger™.",
      philosophy: "Dr. Ochieng' believes that rigorous research methodology combined with practical engineering excellence can solve healthcare's most complex challenges. He advocates for transparent, explainable AI systems that augment human expertise rather than replace it. His philosophy emphasizes ethical AI development, algorithmic fairness, and the responsible application of machine learning in high-stakes healthcare decisions.",
      expertise: [
        "Machine Learning & Deep Learning Architectures",
        "Healthcare AI & Clinical Decision Support",
        "Natural Language Processing & Computer Vision",
        "Predictive Analytics & Time Series Forecasting",
        "Real-Time Streaming Data Systems",
        "Distributed Computing & Cloud Architecture",
        "Research Methodology & Scientific Computing"
      ],
      vision: "Dr. Ochieng' envisions SiriusB iQ establishing new paradigms in healthcare intelligence—systems that combine cutting-edge AI research with practical, deployable solutions that transform how organizations manage healthcare benefits. His vision includes publishing breakthrough research, advancing academic-industry collaboration, and positioning SiriusB iQ as a thought leader in healthcare AI and algorithmic fiduciary science."
    },
    linkedin: "https://www.linkedin.com/in/dr-michael-ochieng",
    email: "michael.ochieng@siriusbiq.com"
  },
  {
    name: "Dr. Jacqueline El-Sayed",
    title: "Distinguished Chief Scientist Officer",
    image: "/1517661622997_1_.jpeg",
    bio: {
      leadership: "Dr. Jacqueline El-Sayed serves as Distinguished Chief Scientist Officer at SiriusB iQ, leading the development of advanced mathematical models, actuarial frameworks, and scientific methodologies that underpin the platform's algorithmic fiduciary capabilities. With extensive expertise in applied mathematics, statistical modeling, and computational science, Dr. El-Sayed ensures SiriusB iQ's solutions are grounded in rigorous scientific principles and mathematical precision.",
      platform: "Dr. El-Sayed's scientific platform encompasses stochastic modeling, Bayesian inference, optimization theory, and computational statistics applied to healthcare benefits. She architects the mathematical foundations of SiriusB iQ's risk assessment models, trend analysis algorithms, and predictive actuarial frameworks. Her work bridges pure mathematical theory with practical applications in enterprise benefits management.",
      philosophy: "Dr. El-Sayed believes that complex healthcare challenges require elegant mathematical solutions. She advocates for transparent, reproducible scientific methods and emphasizes the importance of uncertainty quantification in predictive models. Her philosophy combines theoretical rigor with practical utility—ensuring every model serves a clear business purpose while maintaining scientific integrity.",
      expertise: [
        "Applied Mathematics & Computational Science",
        "Actuarial Science & Risk Modeling",
        "Bayesian Statistics & Probabilistic Modeling",
        "Stochastic Processes & Time Series Analysis",
        "Optimization Theory & Numerical Methods",
        "Monte Carlo Simulation & Sensitivity Analysis",
        "Scientific Computing & Algorithm Design"
      ],
      vision: "Dr. El-Sayed envisions SiriusB iQ pioneering the field of computational actuarial science—establishing new standards for mathematical rigor in benefits analytics. Her vision includes developing proprietary algorithms that become industry benchmarks, publishing peer-reviewed research, and building a scientific foundation that competitors cannot replicate. She sees SiriusB iQ as the quantitative engine that transforms healthcare benefits from an art to a science."
    },
    linkedin: "https://www.linkedin.com/in/dr-jacqueline-el-sayed",
    email: "jacqueline.elsayed@siriusbiq.com"
  },
  {
    name: "Catherine Farley",
    title: "Board Member - Operational Excellence & Wealth Management",
    image: "/catherine-farley.jpg",
    bio: {
      leadership: "Catherine Farley is a President/COO operator with exceptional depth across Client Operations, Finance, Technology, HR, and Compliance. She specializes in building Registered Investment Advisors (RIAs) that scale profitably while maintaining the personalized, bespoke client experience that defines boutique wealth management. Her approach transforms strategy into a scalable operating system through segmented client service models, pricing discipline, workflow optimization, and management routines that simultaneously lift margins, strengthen client loyalty, and protect the enterprise franchise.",
      platform: "Catherine's operational framework is built on four integrated pillars: Operating Design (workflows, handoffs, dashboards/metrics, and operating cadence that align cross-functional teams), Financial Rigor (client/segment profitability modeling, pricing guardrails, budgeting discipline, and capital planning), People & Culture (role clarity and decision rights that accelerate execution and improve accountability, supported by managers who coach rather than command), and Governance (practical control frameworks that strengthen risk posture and audit readiness without bureaucratic overhead). This integrated approach has consistently delivered measurable business impact: 0% turnover in a 40-person Client Service organization (reduced from 50%+), revenue uplift via legacy-book pricing resets and tighter offer architecture, turnaround to profitability in under 2 years through expense governance and clearer decision rights, post-deal integration delivering approximately 35% bottom-line impact through streamlined processes and role clarity, and the establishment of first-time risk & compliance programs that reduce enterprise risk while supporting growth.",
      philosophy: "Catherine's leadership philosophy centers on cultivating cultures that perform through disciplined execution, transparent communication, and developing leaders who multiply the impact of advisors and client teams. She believes that sustainable scale in wealth management requires operational excellence that preserves—not sacrifices—the client experience. Her approach rejects the false choice between growth and quality, instead engineering systems where both reinforce each other. She is known for her ability to diagnose operational friction points, design practical solutions that teams can execute, and install management routines that ensure new capabilities become embedded habits rather than temporary initiatives.",
      expertise: [
        "RIA Operational Excellence & Scalability",
        "Client Service Model Design & Segmentation",
        "Financial Operations & Profitability Management",
        "Post-Merger Integration & Organizational Transformation",
        "Risk & Compliance Framework Development",
        "Talent Retention & Organizational Culture",
        "Pricing Strategy & Revenue Optimization",
        "Workflow Design & Process Automation"
      ],
      vision: "Catherine brings to SiriusB iQ's board a rare combination: deep operational expertise in wealth management combined with a proven track record of building systems that scale. Her experience transforming RIAs from founder-led practices into institutional-grade operating platforms provides strategic insight into how intelligent automation can enhance—rather than replace—high-touch client relationships. She understands the delicate balance between operational efficiency and relationship preservation, making her perspective invaluable as SiriusB iQ develops AI-driven platforms for industries where trust, transparency, and personalized service remain competitive differentiators. Her focus on measurable outcomes, cultural transformation, and governance frameworks aligns perfectly with SiriusB iQ's commitment to building algorithmic fiduciary systems that augment human judgment rather than attempting to automate it away."
    }
  }
];

export default function BoardOfDirectors() {
  const [selectedMember, setSelectedMember] = useState<BoardMember | null>(null);

  return (
    <>
      <SEO
        title="Board of Directors - SiriusB iQ"
        description="Meet the visionary leaders driving SiriusB iQ's mission to transform enterprise benefits management through advanced AI and algorithmic fiduciary governance."
        image="/og-image.png"
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <SiteHeader />

        {/* Hero Section */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-transparent to-transparent" />
          
          <div className="relative max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent">
                Board of Directors
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Visionary leaders combining deep expertise in healthcare, technology, public service, and scientific research to revolutionize enterprise benefits management
              </p>
            </motion.div>
          </div>
        </section>

        {/* Board Members Grid */}
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {boardMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div
                    onClick={() => setSelectedMember(member)}
                    className="group relative bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-amber-900/20 hover:border-amber-500/40 transition-all duration-300 cursor-pointer hover:shadow-2xl hover:shadow-amber-500/10"
                  >
                    {/* Image Container */}
                    <div className="relative h-80 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent z-10" />
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      
                      {/* Floating Badge */}
                      <div className="absolute top-4 right-4 z-20 bg-amber-500/90 backdrop-blur-sm px-4 py-2 rounded-full">
                        <span className="text-sm font-semibold text-slate-950">Board Member</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative p-6 space-y-4">
                      <div>
                        <h3 className="text-2xl font-bold text-amber-400 mb-2 group-hover:text-amber-300 transition-colors">
                          {member.name}
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                          {member.title}
                        </p>
                      </div>

                      {/* Contact Icons */}
                      {(member.linkedin || member.email) && (
                        <div className="flex gap-3 pt-2">
                          {member.linkedin && (
                            <a
                              href={member.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="p-2 rounded-lg bg-slate-800/50 hover:bg-amber-500/20 border border-slate-700/50 hover:border-amber-500/50 transition-all group/icon"
                            >
                              <Linkedin className="w-4 h-4 text-slate-400 group-hover/icon:text-amber-400" />
                            </a>
                          )}
                          {member.email && (
                            <a
                              href={`mailto:${member.email}`}
                              onClick={(e) => e.stopPropagation()}
                              className="p-2 rounded-lg bg-slate-800/50 hover:bg-amber-500/20 border border-slate-700/50 hover:border-amber-500/50 transition-all group/icon"
                            >
                              <Mail className="w-4 h-4 text-slate-400 group-hover/icon:text-amber-400" />
                            </a>
                          )}
                        </div>
                      )}

                      {/* Click indicator */}
                      <div className="pt-4 border-t border-slate-800">
                        <span className="text-sm text-amber-500/70 group-hover:text-amber-400 transition-colors">
                          Click to view full profile →
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Member Detail Modal */}
        <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-900 to-slate-950 border-amber-900/30">
            {selectedMember && (
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-start gap-6 pb-6 border-b border-slate-800">
                  <img
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    className="w-32 h-32 rounded-xl object-cover border-2 border-amber-500/30"
                  />
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-amber-400 mb-2">
                      {selectedMember.name}
                    </h2>
                    <p className="text-slate-300 text-lg mb-4">
                      {selectedMember.title}
                    </p>
                    {(selectedMember.linkedin || selectedMember.email) && (
                      <div className="flex gap-3">
                        {selectedMember.linkedin && (
                          <a
                            href={selectedMember.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-slate-800/50 hover:bg-amber-500/20 border border-slate-700/50 hover:border-amber-500/50 transition-all"
                          >
                            <Linkedin className="w-5 h-5 text-amber-400" />
                          </a>
                        )}
                        {selectedMember.email && (
                          <a
                            href={`mailto:${selectedMember.email}`}
                            className="p-2 rounded-lg bg-slate-800/50 hover:bg-amber-500/20 border border-slate-700/50 hover:border-amber-500/50 transition-all"
                          >
                            <Mail className="w-5 h-5 text-amber-400" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Bio Sections */}
                <div className="space-y-6">
                  {selectedMember.bio.leadership && (
                    <div>
                      <h3 className="text-xl font-semibold text-amber-400 mb-3">Leadership & Experience</h3>
                      <p className="text-slate-300 leading-relaxed">{selectedMember.bio.leadership}</p>
                    </div>
                  )}

                  {selectedMember.bio.platform && (
                    <div>
                      <h3 className="text-xl font-semibold text-amber-400 mb-3">Platform & Approach</h3>
                      <p className="text-slate-300 leading-relaxed">{selectedMember.bio.platform}</p>
                    </div>
                  )}

                  {selectedMember.bio.philosophy && (
                    <div>
                      <h3 className="text-xl font-semibold text-amber-400 mb-3">Philosophy & Values</h3>
                      <p className="text-slate-300 leading-relaxed">{selectedMember.bio.philosophy}</p>
                    </div>
                  )}

                  {selectedMember.bio.expertise && selectedMember.bio.expertise.length > 0 && (
                    <div>
                      <h3 className="text-xl font-semibold text-amber-400 mb-3">Areas of Expertise</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {selectedMember.bio.expertise.map((skill, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 text-slate-300 bg-slate-800/30 rounded-lg px-4 py-2 border border-slate-700/50"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            <span>{skill}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedMember.bio.vision && (
                    <div>
                      <h3 className="text-xl font-semibold text-amber-400 mb-3">Vision & Ethos</h3>
                      <p className="text-slate-300 leading-relaxed">{selectedMember.bio.vision}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <SiteFooter />
      </div>
    </>
  );
}