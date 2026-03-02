"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SEO } from "@/components/SEO";
import { ImageLightbox } from "@/components/ImageLightbox";
import { 
  Award, 
  TrendingUp, 
  Users, 
  Target, 
  Sparkles, 
  Heart,
  BookOpen,
  Briefcase,
  GraduationCap,
  Medal
} from "lucide-react";

const teamMembers = [
  {
    name: "Jeremiah Shrack",
    role: "Founder & Chief Executive Officer",
    image: "/jeremiah-shrack-professional.png",
    bio: "Jeremiah Shrack is the Founder and Chief Executive Officer of SiriusB iQ AI Data Sciences, where he serves as the Chief Actuarial AI Architect of Kincaid IQ. A humanitarian and business leader with over two decades of experience engineering intelligent operating systems and scaling organizations.",
    education: [
      {
        school: "Indiana Wesleyan University",
        degree: "'27 EMBA AI Change Leadership",
        focus: "Business Administration, Management and Operations",
        years: "Jan 2026 – Dec 2027",
        details: "Pursuing advanced expertise in AI change leadership and strategic transformation"
      },
      {
        school: "Indiana Wesleyan University",
        degree: "Bachelor of Science, Business Marketing",
        years: "2005 – 2007",
        gpa: "3.22",
        details: "Earned degree while working full-time selling copiers and achieving a sales ranking of #2 out of 1,000 software sales reps nationally"
      }
    ],
    certifications: [
      {
        title: "Reiki II Master Practitioner",
        issuer: "James Charles Institute of Kabbalah Reiki",
        issued: "Jan 2025",
        expires: "Mar 2034",
        credentialId: "814855"
      }
    ],
    volunteering: [
      {
        role: "Facilitator",
        organization: "IRONMAN",
        duration: "Jul 2016 - Present · 9+ years",
        focus: "Health"
      }
    ],
    experience: [
      {
        company: "SiriusB iQ AI Data Sciences Company",
        title: "Founder & Chief Executive Officer",
        period: "Apr 2023 - Present",
        description: "Founder and Chief Actuarial AI Architect of Kincaid IQ, an AI-enabled enterprise intelligence platform engineered for advanced middle and large-market executives. Built on blue-giant computational architecture, consolidating fragmented data into real-time intelligence models powered by 1,000+ validated KPI algorithms.",
        highlights: [
          "Designed AI reasoning layer and modeling frameworks",
          "Integrated Vertex AI and governed model deployment",
          "Aligned Harvard-level decision science with MIT-grade systems engineering",
          "Executive-grade intelligence engine operating as strategic co-pilot",
          "AI profit-generator implementing strategic AR & AP accounting methodologies",
          "Platform produces financial, health & benefits, accounting, Board, and C-Suite deliverables"
        ]
      },
      {
        company: "James Charles Institute of Kabbalah Reiki",
        title: "Reiki Master II",
        period: "Feb 2025 - Present",
        description: "Practicing Turtle Mountain Chippewa healing traditions combined with Kabbalah Reiki. Acting as a channel for the Holy Spirit to heal others physically, emotionally, and psychologically. Continuing family legacy of intuition and spirituality from Charismatic Catholic upbringing.",
        highlights: [
          "Physical, emotional, and psychological healing practice",
          "Integration of indigenous and spiritual healing modalities",
          "Connectivity to humanity through healing work"
        ]
      },
      {
        company: "Universal Life Church",
        title: "Archcardinal",
        period: "Jan 2022 - Present",
        description: "Providing home clearings and land blessings as a Turtle Mountain Chippewa Indian with shamanistic abilities. Removing negative energy on the photonic, astral level, resulting in flow of new energy and hope. All services provided with help of the Holy Spirit, Yahweh, and Yeshua.",
        highlights: [
          "Home clearings and land blessings",
          "Removal of negative energy on astral level",
          "Integration of indigenous spiritual practices"
        ]
      },
      {
        company: "Retro Redesign & Fine Arts Lab",
        title: "Chief Executive Officer / Co-Founder",
        period: "Mar 2020 - Oct 2025",
        description: "Opened first showroom in downtown Noblesville competing directly with HGTV's Good Bones' District & Co. Store. Built strong local reputation for antique furniture and custom commissions.",
        highlights: [
          "Became profitable within 30 days of opening",
          "Consistently outpaced projected revenues month-over-month",
          "Completed 80+ custom projects",
          "Generated $1M in revenue",
          "Hired former Google MBA marketing expert for data analytics"
        ]
      },
      {
        company: "Huntington National Bank",
        title: "Vice President, Client Strategy & Benefit Innovation",
        period: "Feb 2018 - Feb 2020",
        description: "Recruited to shift servicing capabilities and sales leadership towards middle and large markets. Cold-called middle and large market accounts, closing largest account in office in 2019.",
        highlights: [
          "Won Huntington Service Heart Award presented by CEO",
          "Closed largest account in office in 2019",
          "Nominated for Service Heart Award for sales innovations",
          "Addressed cultural issues between Commercial Banking and Consulting teams"
        ]
      },
      {
        company: "Aon",
        title: "Vice President of Business Development",
        period: "Feb 2016 - Feb 2018",
        description: "Created Health & Benefits and Property/Casualty opportunities through middle and large market cold calling. Led Indiana Food, Ag, and Bev Practice despite no prior P/C experience.",
        highlights: [
          "Recognized for selling largest account in all of Aon USA in Q3 2016",
          "Qualified for producer bonus despite 6 surgeries in 2017",
          "Collaborated with National Middle Market Practice leader",
          "Presented HR Effectiveness solution to 12,000-employee Berkshire Hathaway subsidiary"
        ]
      },
      {
        company: "Brown & Brown Insurance",
        title: "Vice President of Health & Wellness",
        period: "Jan 2012 - Dec 2014",
        description: "Led health and wellness strategy for one of Brown & Brown's 50 largest books of business. Published thought leadership on on-site primary care clinics and consulted with publicly traded firms on EBITDA impact.",
        highlights: [
          "Ranked #4 nationally for new sales in 2013 & 2014",
          "Published article 'Save Health Care Costs By Offering An On-Site Primary Care Clinic' in Advisor journal",
          "Managed one of firm's top-50 books of business",
          "Consulted publicly traded firms on Expense P/L impact to EBITDA & stock valuation",
          "Trained sales team on cold-calling, problem discovery, and closing large accounts"
        ]
      },
      {
        company: "National Insurance Services",
        title: "Market Development",
        period: "Dec 2009 - Dec 2012",
        description: "Revitalized declining Michigan territory through refocused public sector go-to-market approach. Sold directly to local government decision makers and expanded into private sector.",
        highlights: [
          "Ranked #1 nationally in sales revenue for 2011",
          "Ranked #2 nationally in sales revenue for 2010",
          "Increased profitability on direct accounts by 100%",
          "Added 50 public sector accounts in Michigan/Ohio territory",
          "Subject matter expert for 2 national consulting houses on on-site medical clinics",
          "Received 2 weeks of extensive Boardroom/Finalist Presentation training"
        ]
      },
      {
        company: "Océ - A Canon Company",
        title: "Account Executive",
        period: "2005 - 2009",
        description: "Grew market share dramatically while achieving national recognition for software sales excellence. Opened national accounts and field trained new executives.",
        highlights: [
          "Grew market share by 400% and opened 2 national accounts",
          "Ranked #2 in North America out of 500+ Account Executives by mid-year 2006",
          "Nationally recognized for graphic art software sales",
          "Exhibited expertise in large, complex accounts involving software solutions",
          "Field trained new Account Executives in prospecting and conversion",
          "Exceeded expectations during 3 weeks of formal SPIN sales training"
        ]
      }
    ],
    expertise: [
      "AI & Machine Learning Architecture",
      "Actuarial Science & Risk Management",
      "Enterprise Intelligence Platforms",
      "Health & Benefits Analytics",
      "Strategic Business Development",
      "Executive Sales Leadership",
      "Spiritual Healing & Energy Work",
      "Indigenous Healing Traditions",
      "Complex Account Management",
      "EBITDA Impact Analysis",
      "Public Sector Sales Strategy",
      "Boardroom Presentations"
    ],
    philosophy: "Founded on the belief that meaningful value is created when technology and strategy are developed with deep understanding of context. Rather than leading with tools or trends, we lead with how clients operate, what they prioritize, and where long-term advantage is actually created. My healing practice represents an important connectivity to humanity, honoring my Turtle Mountain Chippewa heritage and family's spiritual traditions.",
    vision: "To be a trusted partner to organizations and family offices that require tailored, context-aware solutions—built for longevity, not hype; precision, not scale for scale's sake. Our vision is to combine cutting-edge AI capabilities with actuarial rigor and spiritual wisdom to create sustainable value and healing for both organizations and individuals."
  },
  {
    name: "Mike Hamann",
    role: "Board Member - Public Service & Fiscal Leadership",
    image: "/Hamann_Michael.jpg",
    bio: "Mike Hamann brings decades of distinguished public service and fiscal leadership to SiriusB iQ. As former Indiana State Representative and Budget Director, he has proven expertise in legislative strategy, government operations, and financial stewardship at the highest levels of state government.",
    experience: [
      {
        company: "State of Indiana",
        title: "State Representative & Budget Director",
        period: "Multiple Terms",
        description: "Served with distinction in the Indiana House of Representatives, specializing in budget appropriations and fiscal policy. As Budget Director, oversaw state financial planning and resource allocation.",
        highlights: [
          "Led critical budget appropriations committees",
          "Championed fiscal responsibility and government efficiency",
          "Authored landmark legislation on financial transparency",
          "Built bipartisan coalitions for major policy initiatives"
        ]
      }
    ],
    expertise: [
      "Government Operations & Policy",
      "Budget Planning & Appropriations",
      "Legislative Strategy",
      "Public-Private Partnerships",
      "Fiscal Oversight & Accountability",
      "Regulatory Compliance",
      "Stakeholder Relations",
      "Policy Development"
    ],
    philosophy: "Effective governance requires both fiscal discipline and innovative thinking. My experience in state government taught me that the best solutions emerge when public sector accountability meets private sector innovation.",
    vision: "To ensure SiriusB iQ maintains the highest standards of fiscal responsibility, regulatory compliance, and ethical governance while driving innovation in the public and private sectors. Government and business leaders deserve tools that respect both their fiduciary duties and their need for actionable intelligence."
  },
  {
    name: "Dr. Michael Ochieng'",
    role: "Distinguished Chief Research & Technology Officer",
    image: "/dr-michael-ochieng-company.png",
    bio: "Dr. Michael Ochieng' serves as Distinguished Chief Research & Technology Officer, bringing world-class expertise in AI research, machine learning systems, and computational science. His academic credentials and research contributions position SiriusB iQ at the forefront of AI innovation.",
    experience: [
      {
        company: "SiriusB iQ AI Data Sciences",
        title: "Distinguished Chief Research & Technology Officer",
        period: "Present",
        description: "Leading advanced research initiatives in AI, machine learning, and computational intelligence. Architecting the scientific foundation of Kincaid IQ's analytical engine.",
        highlights: [
          "Oversees AI research and development strategy",
          "Leads machine learning model innovation",
          "Ensures scientific rigor in all platform capabilities",
          "Drives academic and industry research partnerships"
        ]
      }
    ],
    expertise: [
      "Artificial Intelligence & Machine Learning",
      "Computational Science",
      "Statistical Modeling",
      "Algorithm Development",
      "Research Methodology",
      "Academic Leadership",
      "Technology Innovation",
      "Scientific Computing"
    ],
    philosophy: "The most powerful AI systems are those built on rigorous scientific principles, validated through empirical research, and designed with deep respect for the complexity of real-world problems. Technology must serve humanity with precision, transparency, and accountability.",
    vision: "To establish SiriusB iQ as the gold standard in research-driven AI solutions, where every algorithm is validated, every model is explainable, and every insight is grounded in sound scientific methodology. Our platform will set new benchmarks for academic rigor in commercial AI applications."
  },
  {
    name: "Dr. Jacqueline El-Sayed",
    role: "Distinguished Chief Scientist Officer",
    image: "/dr-jacqueline-el-sayed-company.png",
    bio: "Dr. Jacqueline El-Sayed serves as Distinguished Chief Scientist Officer, bringing exceptional expertise in data science, statistical analysis, and scientific methodology. Her leadership ensures SiriusB iQ maintains the highest standards of scientific excellence and analytical rigor.",
    experience: [
      {
        company: "SiriusB iQ AI Data Sciences",
        title: "Distinguished Chief Scientist Officer",
        period: "Present",
        description: "Oversees scientific methodology, data integrity, and analytical frameworks across all SiriusB iQ platforms. Ensures every model, algorithm, and insight meets rigorous scientific standards.",
        highlights: [
          "Directs scientific methodology and standards",
          "Validates analytical frameworks and models",
          "Ensures data quality and integrity",
          "Leads interdisciplinary research initiatives"
        ]
      }
    ],
    expertise: [
      "Data Science & Analytics",
      "Statistical Methodology",
      "Scientific Research Design",
      "Quality Assurance",
      "Predictive Modeling",
      "Experimental Design",
      "Scientific Leadership",
      "Cross-functional Collaboration"
    ],
    philosophy: "Science without rigor is merely speculation. Every data point matters, every assumption must be tested, and every conclusion must be defensible. The pursuit of truth requires both intellectual humility and methodological discipline.",
    vision: "To build a scientific culture at SiriusB iQ where curiosity drives innovation, evidence guides decisions, and methodological excellence is non-negotiable. Our commitment to scientific integrity will differentiate us in an industry often driven by hype over substance."
  },
  {
    name: "Catherine Farley",
    role: "Executive Chair, Committee on Algorithmic Governance & Fiduciary Risk",
    image: "/catherine-farley.jpg",
    bio: "Catherine Farley is a seasoned financial services executive with deep expertise in operational excellence, wealth management, and strategic transformation. Her career spans leadership roles at major financial institutions where she drove innovation and operational efficiency at scale.",
    experience: [
      {
        company: "Major Financial Institutions",
        title: "Senior Executive Leadership",
        period: "20+ Years",
        description: "Led transformative initiatives across wealth management, operations, and strategic planning at leading financial institutions.",
        highlights: [
          "Operational excellence and process optimization",
          "Wealth management and fiduciary governance",
          "Strategic transformation and change management",
          "Risk management and compliance frameworks"
        ]
      }
    ],
    expertise: [
      "Operational Excellence & Process Optimization",
      "Wealth Management & Fiduciary Governance",
      "Strategic Transformation & Change Management",
      "Risk Management & Compliance Frameworks",
      "Financial Services Leadership",
      "Board Governance & Oversight",
      "Algorithmic Governance",
      "Fiduciary Risk Management"
    ],
    philosophy: "The intersection of AI and fiduciary duty requires a new governance framework—one that treats algorithmic decision-making with the same rigor as human fiduciary responsibility. I advocate for transparent AI systems that can be audited, explained, and held accountable to the same standards as human decision-makers in positions of trust.",
    vision: "As Executive Chair of the Committee on Algorithmic Governance & Fiduciary Risk, my vision is to establish SiriusB iQ as the gold standard for ethical AI deployment in benefits management. Every algorithmic decision made by the platform must withstand the scrutiny of fiduciary duty, regulatory review, and client trust."
  }
];

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  education?: Array<{
    school: string;
    degree: string;
    focus?: string;
    years: string;
    gpa?: string;
    details?: string;
  }>;
  certifications?: Array<{
    title: string;
    issuer: string;
    issued: string;
    expires?: string;
    credentialId?: string;
  }>;
  volunteering?: Array<{
    role: string;
    organization: string;
    duration: string;
    focus: string;
  }>;
  experience: Array<{
    company: string;
    title: string;
    period: string;
    description: string;
    highlights: string[];
  }>;
  expertise: string[];
  philosophy: string;
  vision: string;
}

function TeamMemberModal({ member, onClose }: { member: TeamMember; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-amber-500/20 shadow-2xl shadow-amber-500/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 bg-gradient-to-b from-slate-900 to-slate-900/95 backdrop-blur-sm border-b border-amber-500/20 p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 rounded-full overflow-hidden ring-2 ring-amber-500/30">
                <ImageLightbox
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-amber-400">{member.name}</h3>
                <p className="text-amber-200/70">{member.role}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-amber-400/60 hover:text-amber-400 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-8">
          <div>
            <h4 className="text-lg font-semibold text-amber-400 mb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Professional Summary
            </h4>
            <p className="text-slate-300 leading-relaxed">{member.bio}</p>
          </div>

          {member.education && member.education.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold text-amber-400 mb-4 flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                Education
              </h4>
              <div className="space-y-4">
                {member.education.map((edu, idx) => (
                  <div key={idx} className="bg-slate-800/50 rounded-lg p-4 border border-amber-500/10">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h5 className="font-semibold text-amber-300">{edu.degree}</h5>
                        <p className="text-slate-400 text-sm">{edu.school}</p>
                        {edu.focus && <p className="text-slate-500 text-sm">{edu.focus}</p>}
                      </div>
                      <span className="text-amber-400/60 text-sm">{edu.years}</span>
                    </div>
                    {edu.gpa && (
                      <p className="text-slate-400 text-sm mb-1">GPA: {edu.gpa}</p>
                    )}
                    {edu.details && (
                      <p className="text-slate-300 text-sm mt-2">{edu.details}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {member.certifications && member.certifications.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold text-amber-400 mb-4 flex items-center gap-2">
                <Medal className="w-5 h-5" />
                Certifications
              </h4>
              <div className="space-y-3">
                {member.certifications.map((cert, idx) => (
                  <div key={idx} className="bg-slate-800/50 rounded-lg p-4 border border-amber-500/10">
                    <div className="flex items-start justify-between">
                      <div>
                        <h5 className="font-semibold text-amber-300">{cert.title}</h5>
                        <p className="text-slate-400 text-sm">{cert.issuer}</p>
                        {cert.credentialId && (
                          <p className="text-slate-500 text-xs mt-1">Credential ID: {cert.credentialId}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-amber-400/60 text-sm">Issued: {cert.issued}</p>
                        {cert.expires && (
                          <p className="text-slate-500 text-xs">Expires: {cert.expires}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {member.volunteering && member.volunteering.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold text-amber-400 mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Volunteering
              </h4>
              <div className="space-y-3">
                {member.volunteering.map((vol, idx) => (
                  <div key={idx} className="bg-slate-800/50 rounded-lg p-4 border border-amber-500/10">
                    <div className="flex items-start justify-between">
                      <div>
                        <h5 className="font-semibold text-amber-300">{vol.role}</h5>
                        <p className="text-slate-400 text-sm">{vol.organization}</p>
                        <p className="text-slate-500 text-xs mt-1">{vol.focus}</p>
                      </div>
                      <span className="text-amber-400/60 text-sm">{vol.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h4 className="text-lg font-semibold text-amber-400 mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              Leadership & Experience
            </h4>
            <div className="space-y-6">
              {member.experience.map((exp, idx) => (
                <div key={idx} className="bg-slate-800/50 rounded-lg p-4 border border-amber-500/10">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h5 className="font-semibold text-amber-300">{exp.title}</h5>
                      <p className="text-slate-400 text-sm">{exp.company}</p>
                    </div>
                    <span className="text-amber-400/60 text-sm">{exp.period}</span>
                  </div>
                  <p className="text-slate-300 text-sm mb-3 leading-relaxed">{exp.description}</p>
                  {exp.highlights.length > 0 && (
                    <ul className="space-y-1">
                      {exp.highlights.map((highlight, hidx) => (
                        <li key={hidx} className="text-slate-400 text-sm flex items-start gap-2">
                          <span className="text-amber-400 mt-1">•</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-amber-400 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5" />
              Areas of Expertise
            </h4>
            <div className="flex flex-wrap gap-2">
              {member.expertise.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-amber-500/10 text-amber-300 rounded-full text-sm border border-amber-500/20"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-amber-400 mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Philosophy & Approach
            </h4>
            <p className="text-slate-300 leading-relaxed">{member.philosophy}</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-amber-400 mb-3 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Vision & Ethos
            </h4>
            <p className="text-slate-300 leading-relaxed">{member.vision}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function CompanyPage() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <>
      <SEO
        title="Leadership Team - SiriusB iQ"
        description="Meet the exceptional leadership team behind SiriusB iQ's AI-driven platform. Combined expertise in AI, actuarial science, public policy, and scientific research."
      />
      
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <SiteHeader />
        
        <div className="container mx-auto px-4 pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full mb-6">
              <Users className="w-4 h-4 text-amber-400" />
              <span className="text-amber-400 text-sm font-medium">Leadership Team</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent">
              World-Class Leadership
            </h1>
            
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Meet the exceptional team driving innovation in AI-powered enterprise intelligence, 
              actuarial science, and strategic decision-making.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, idx) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl overflow-hidden border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300 cursor-pointer hover:shadow-2xl hover:shadow-amber-500/20"
                onClick={() => setSelectedMember(member)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative p-8">
                  <div className="flex items-start gap-6 mb-6">
                    <div className="relative w-32 h-32 rounded-2xl overflow-hidden ring-2 ring-amber-500/30 group-hover:ring-amber-500/60 transition-all duration-300 flex-shrink-0">
                      <ImageLightbox
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-2xl font-bold text-amber-400 mb-2 group-hover:text-amber-300 transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-amber-200/70 text-sm mb-4 leading-relaxed">
                        {member.role}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {member.expertise.slice(0, 3).map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-amber-500/10 text-amber-300 rounded text-xs border border-amber-500/20"
                          >
                            {skill}
                          </span>
                        ))}
                        {member.expertise.length > 3 && (
                          <span className="px-2 py-1 bg-amber-500/10 text-amber-400 rounded text-xs border border-amber-500/20">
                            +{member.expertise.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-slate-300 text-sm leading-relaxed line-clamp-3 mb-4">
                    {member.bio}
                  </p>
                  
                  <div className="flex items-center gap-2 text-amber-400 text-sm font-medium group-hover:gap-3 transition-all">
                    <span>View Full Profile</span>
                    <Award className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <SiteFooter />

        {selectedMember && (
          <TeamMemberModal member={selectedMember} onClose={() => setSelectedMember(null)} />
        )}
      </div>
    </>
  );
}