"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SEO } from "@/components/SEO";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import {
  Shield,
  TrendingUp,
  Users,
  Award,
  Target,
  Zap,
  Brain,
  Lock,
  ChevronRight,
  X,
  Briefcase,
  GraduationCap,
  BookOpen,
  Lightbulb,
} from "lucide-react";

// Interfaces for type safety
interface CareerHighlight {
  title: string;
  role: string;
  period: string;
  achievements: string[];
}

interface Education {
  institution: string;
  degree: string;
  note?: string;
}

interface Platform {
  name: string;
  description: string;
  subsystems?: string[];
  components?: string[];
  architecture?: string[];
  majorProjects?: string[];
  funding?: string;
  impact?: string;
  philosophy?: string;
}

interface Philosophy {
  title: string;
  approach?: string;
  principles: string[];
}

interface GovernmentService {
  title: string;
  role: string;
  organization?: string;
  achievements: string[];
}

interface Insights {
  title: string;
  points: string[];
}

interface DetailedProfile {
  introduction: string;
  careerHighlights: CareerHighlight[];
  platform?: Platform;
  philosophy?: Philosophy;
  expertise: string[];
  education?: Education[];
  governmentService?: GovernmentService[];
  recognition?: string[];
  currentBoardService?: string[];
  pastBoardService?: string[];
  insights?: Insights;
  personalValues?: string[];
  impact?: string[];
  vision?: string;
}

interface TeamMember {
  name: string;
  title: string;
  image: string;
  bio: string;
  detailedProfile: DetailedProfile;
}

const teamMembers: TeamMember[] = [
  {
    name: "Jeremiah Shrack",
    title: "Founder & Chief Executive Officer",
    image: "/jeremiah-shrack-professional.png",
    bio: "Humanitarian and business leader with over two decades of experience engineering intelligent operating systems and scaling organizations.",
    detailedProfile: {
      introduction: "Over two decades, Jeremiah Shrack has built a reputation for engineering intelligent operating systems, scaling organizations, and redefining how advanced analytics intersect with human judgment. As President and Chief Executive Officer of Kincaid Risk Management Consultants (KRMC), Jeremiah drives enterprise-wide revenue growth, operational excellence, and high-impact PBM/Rx consulting engagements.",
      careerHighlights: [
        {
          title: "Kincaid Risk Management Consultants",
          role: "President & Chief Executive Officer",
          period: "Present",
          achievements: [
            "Built Kincaid IQ - next-generation intelligent consulting operating system",
            "Achieved 20-35% savings on self-funded Anthem PBM and Rx contracts",
            "Scaled enterprise-wide revenue growth and operational excellence",
            "Led high-impact PBM/Rx consulting engagements for mid- and large-market organizations",
          ],
        },
        {
          title: "Canon North America",
          role: "Sales Executive",
          period: "Early Career",
          achievements: [
            "Achieved #2 ranking in North America",
            "Maintained 60 hours/week work schedule while attending IWU full-time",
            "Demonstrated exceptional work ethic and time management",
            "Mastered enterprise sales and relationship building",
          ],
        },
      ],
      platform: {
        name: "Kincaid IQ",
        description: "A next-generation intelligent consulting operating system that integrates six purpose-built subsystems extending the reasoning frameworks of VortexAI, LogicAI, and JimShrackExpressAI.",
        subsystems: [
          "VortexAI - Advanced pattern recognition and trend analysis",
          "LogicAI - Deterministic reasoning and rule-based decision making",
          "JimShrackExpressAI - Rapid insight generation and executive summaries",
          "Contract Intelligence - Automated contract analysis and risk identification",
          "Cost Compression - AI-driven cost optimization and waste elimination",
          "Performance Analytics - Real-time metrics and predictive modeling",
        ],
        impact: "Each operating system is strategically designed to accelerate AI transformation in industries identified as early adopters of intelligent automation. The platform combines ethical machine reasoning, actuarial precision, and human-centered design to drive measurable performance improvements for clients.",
      },
      philosophy: {
        title: "Leadership Philosophy",
        principles: [
          "Clarity: Establish clear objectives and transparent communication channels",
          "Accountability: Own outcomes and maintain high standards of responsibility",
          "Innovation: Continuously evolve systems and processes for maximum efficiency",
          "Ethics: Ensure AI enhances rather than replaces human decision-making",
          "Service: Technology must serve humanity, not the other way around",
        ],
        approach: "Jeremiah approaches AI and analytics through an ethical lens—ensuring that Kincaid's systems enhance, not replace, human decision-making. His leadership philosophy emphasizes clarity, accountability, and innovation, translating strategic objectives into scalable processes and measurable outcomes across the enterprise.",
      },
      expertise: [
        "Enterprise Executive Sales and Leadership",
        "Benefits Actuarial Consulting (Jumbo and Large-Market)",
        "AI System Architecture (LogicAI + VertexAI)",
        "PBM/Rx Contract Analytics and Negotiation",
        "Ethical AI Deployment & Governance Frameworks",
        "Organizational Transformation at Scale",
        "Revenue Growth and Operational Excellence",
        "Strategic Partnership Development",
      ],
      education: [
        {
          institution: "Indiana Wesleyan University",
          degree: "Undergraduate Studies",
          note: "Completed while working full-time at Canon",
        },
      ],
      vision: "Grounded in business discipline, faith in God, and respect for humanity, Jeremiah is dedicated to helping employers outperform in the rapidly evolving health, benefits, and AI transformation landscape. Under his leadership, Kincaid RMC leverages a combined 20 years of consulting experience to deliver 20–35% savings on self-funded Anthem PBM and Rx contracts, empowering mid- and large-market organizations through transparent, data-driven actuarial insights.",
      personalValues: [
        "Faith: Deeply grounded in Christian values and service",
        "Family: Committed to work-life integration and leading by example",
        "Integrity: Unwavering commitment to ethical business practices",
        "Excellence: Pursuit of the highest standards in all endeavors",
        "Humanity: Technology and business must serve human flourishing",
      ],
    },
  },
  {
    name: "Catherine Farley",
    title: "Chief Operating Officer & Strategic Partnerships",
    image: "/catherine-farley.jpg",
    bio: "Strategic operations leader and partnership architect with deep expertise in scaling technology platforms and building high-performance teams.",
    detailedProfile: {
      introduction: "Catherine Farley brings a unique blend of operational excellence and strategic vision to SiriusB iQ. As Chief Operating Officer, she orchestrates the daily execution of the company's ambitious vision while simultaneously architecting strategic partnerships that expand market reach and accelerate product adoption. Her leadership style combines data-driven decision-making with a deep understanding of human dynamics, making her instrumental in both internal operations and external relationship building.",
      careerHighlights: [
        {
          title: "SiriusB iQ / Kincaid RMC",
          role: "Chief Operating Officer",
          period: "Present",
          achievements: [
            "Orchestrates daily execution of company vision",
            "Architects strategic partnerships for market expansion",
            "Manages intersection of product development and client success",
            "Ensures rapid innovation without compromising reliability",
          ]
        },
        {
          title: "Operations Leadership",
          role: "Executive Leader",
          period: "Previous Experience",
          achievements: [
            "Scaled operations from startup phase to enterprise readiness",
            "Built and managed high-performance cross-functional teams",
            "Implemented operational frameworks improving efficiency by 40%+",
            "Led successful market expansion initiatives across multiple verticals",
          ]
        }
      ],
      platform: {
        name: "Operational Excellence Engine",
        description: "Catherine oversees the operational infrastructure that makes Kincaid IQ's intelligent systems scalable and reliable.",
        components: [
          "Strategic Partnership Architecture",
          "Cross-Functional Team Orchestration",
          "Client Success Frameworks",
          "Scalable Process Design",
          "Performance Metric Systems"
        ],
        impact: "Her focus on operational discipline ensures that rapid innovation doesn't compromise system reliability or client satisfaction."
      },
      philosophy: {
        title: "Operational Philosophy",
        principles: [
          "Execution Excellence: Strategy is meaningless without flawless execution",
          "People First: High-performing teams drive superior outcomes",
          "Partnership Mindset: Collaboration multiplies impact",
          "Data-Informed Decisions: Combine metrics with intuition",
          "Continuous Improvement: Operational excellence is a journey, not a destination",
        ],
        approach: "Catherine believes that the best technology platforms succeed not just because of their capabilities, but because of the operational discipline that ensures consistent delivery, satisfied clients, and sustainable growth."
      },
      expertise: [
        "Operations Management & Process Optimization",
        "Strategic Partnership Development",
        "Cross-Functional Team Leadership",
        "Market Expansion & Go-to-Market Strategy",
        "Client Success & Retention Programs",
        "Technology Platform Scaling",
        "Performance Metrics & KPI Development",
        "Change Management & Organizational Development",
      ],
      education: [
        {
          institution: "University",
          degree: "Advanced Degree in Business Administration",
          note: "Focus on Operations Management and Strategic Leadership",
        }
      ],
      vision: "Catherine envisions an organization where operational excellence enables innovation at scale. Her mission is to build the operational foundation that allows SiriusB iQ to transform entire industries while maintaining the agility and client focus of a startup.",
      personalValues: [
        "Integrity: Transparent operations and honest communication",
        "Excellence: Commitment to the highest standards in everything we do",
        "Collaboration: Success is a team sport",
        "Accountability: Own outcomes and drive results",
        "Innovation: Embrace change and continuous improvement",
      ],
    },
  },
  {
    name: "Mike Hamann",
    title: "Board Member - Public Service & Fiscal Leadership",
    image: "/1517039361817_1_.jpeg",
    bio: "Distinguished public servant with two terms as St. Joseph County Auditor, bringing deep expertise in fiscal stewardship and government operations.",
    detailedProfile: {
      introduction: "Mike Hamann's career in public service is defined by a deep commitment to the residents of St. Joseph County. Most notably, Mike served two terms as the St. Joseph County Auditor, acting as the county's chief financial officer and fiduciary steward until the end of 2022. His leadership was marked by a 'boots-on-the-ground' philosophy, whether he was challenging property assessment loopholes to protect the local tax base or advocating for federal relief funds to support high-impact community initiatives like Motels4Now.",
      careerHighlights: [
        {
          title: "St. Joseph County Auditor",
          role: "Chief Financial Officer",
          period: "2014-2022 (Two Terms)",
          achievements: [
            "Served as county's chief financial officer and fiduciary steward",
            "Challenged property assessment loopholes to protect local tax base",
            "Advocated for federal relief funds for community initiatives",
            "Implemented 'boots-on-the-ground' leadership philosophy",
            "Maintained fiscal discipline and transparency",
          ],
        },
        {
          title: "St. Joseph County Council",
          role: "Council Member",
          period: "2008-2014",
          achievements: [
            "Elected to County Council in 2008",
            "Shaped local legislation and budget priorities",
            "Bridged executive policy and fiscal reality",
            "Built consensus across political divides",
          ],
        },
        {
          title: "Board of Commissioners",
          role: "Commissioner",
          period: "1999-2002",
          achievements: [
            "Served on executive leadership team",
            "Developed policy implementation expertise",
            "Gained comprehensive governance experience",
          ],
        },
        {
          title: "Marian High School & Saint Joseph's High School",
          role: "U.S. History & Government Teacher",
          period: "Concurrent with Public Service",
          achievements: [
            "Taught while serving in public office",
            "Transformed government studies into living case studies",
            "Bridged theory and practice for students",
            "Currently teaching full-time at Marian High School (retired from government)",
          ],
        },
      ],
      platform: {
        name: "Triple-Threat Governance Experience",
        description: "Mike's unique combination of roles across all three branches of local government provides unparalleled insight into how policy, legislation, and fiscal management intersect.",
        components: [
          "Executive Experience: Board of Commissioners (policy implementation)",
          "Legislative Experience: County Council (lawmaking and budgeting)",
          "Fiscal Management: County Auditor (financial stewardship)",
        ],
        impact: "This comprehensive background gave him a masterclass view of the intersection between executive policy, legislative intent, and fiscal reality—experience that few public servants can claim.",
      },
      philosophy: {
        title: "Public Service Philosophy",
        principles: [
          "Boots-on-the-Ground Leadership: Active engagement with community needs",
          "Fiscal Responsibility: Protect taxpayer dollars and local tax base",
          "Community Impact: Support initiatives that create real change",
          "Education as Service: Teaching is a concurrent calling, not a second act",
          "Living Government: Make civics real through active participation",
        ],
        approach: "What sets Mike apart is that his commitment to the classroom was never a 'second act'—it was a concurrent calling. For years, Mike balanced the heavy responsibilities of public office with the rigorous demands of teaching. By serving as a public servant and a teacher simultaneously, Mike transformed the study of U.S. History and Government from a textbook exercise into a living, breathing case study.",
      },
      expertise: [
        "County-Level Fiscal Management & Fiduciary Stewardship",
        "Legislative & Executive Policy Implementation",
        "Property Assessment & Tax Base Protection",
        "Federal Relief Fund Allocation & Community Impact",
        "Government Education & Civic Leadership",
        "U.S. History & Government Instruction",
        "Budget Management and Financial Oversight",
        "Cross-Branch Government Collaboration",
      ],
      education: [
        {
          institution: "University of Notre Dame",
          degree: "Undergraduate Degree",
          note: "Foundation for public service career",
        },
        {
          institution: "Marian High School",
          degree: "High School (Alumnus)",
          note: "Returned to teach at alma mater",
        },
      ],
      vision: "A proud Marian High School alum and a graduate of the University of Notre Dame, Mike's career has come full circle. Now retired from government and teaching full-time at Marian, he continues to bridge the gap between the town hall and the classroom, ensuring the next generation of leaders understands that 'Government' isn't just a textbook chapter—it's a tool for community transformation.",
      personalValues: [
        "Service: Dedicated to improving lives in St. Joseph County",
        "Education: Committed to teaching the next generation",
        "Integrity: Honest stewardship of public resources",
        "Community: Deep roots in South Bend and surrounding areas",
        "Accessibility: Boots-on-the-ground approach to leadership",
      ],
      impact: [
        "Protected local tax base through property assessment advocacy",
        "Secured federal relief funds for critical community programs",
        "Mentored hundreds of students in government and civics",
        "Brought real-world governance experience into the classroom",
        "Served constituents with distinction across three government roles",
      ],
    },
  },
  {
    name: "Dr. Michael Ochieng'",
    title: "Distinguished Chief Research & Technology Officer",
    image: "/1766487748644.jpeg",
    bio: "Telecommunications infrastructure architect turned AI governance expert, bringing carrier-grade discipline to enterprise AI systems.",
    detailedProfile: {
      introduction: "Dr. Michael Ochieng' did not come to AI from the software hype cycle. He came from the high-stakes world of wireless networks—an environment where systems fail loudly, and often dangerously, when governance is absent. His career was forged in the deployment of large-scale LTE and 5G infrastructure for global operators like Verizon, T-Mobile, Sprint, Safaricom, and Huawei. In the telecom sector, Dr. Ochieng' mastered a fundamental truth decades ago: intelligence must always be decoupled from control.",
      careerHighlights: [
        {
          title: "Global Telecom Infrastructure",
          role: "Network Architect & Deployment Lead",
          period: "20+ Years",
          achievements: [
            "Deployed large-scale LTE and 5G infrastructure for Verizon",
            "Led network architecture for T-Mobile and Sprint",
            "Managed international deployments with Safaricom (Kenya)",
            "Collaborated with Huawei on carrier-grade systems",
            "Mastered separation of intelligence from control in networks",
          ],
        },
        {
          title: "Kopiyo (AI Governance Company)",
          role: "Founder & Chief Architect",
          period: "Present",
          achievements: [
            "Developed DILLO (Decision Intelligence & Logic Layer Orchestrator)",
            "Created deterministic control planes for probabilistic AI systems",
            "Established AI governance frameworks for enterprise deployment",
            "Built decision authority systems for AI safety",
          ],
        },
      ],
      platform: {
        name: "DILLO - Decision Intelligence & Logic Layer Orchestrator",
        description: "A deterministic decision layer that governs AI before its probabilistic outputs touch the real world. DILLO treats AI as a liability engine that must be constrained before it can be deemed useful.",
        architecture: [
          "Control Plane: Determines whether AI is allowed to act",
          "Permission Layer: Enforces when AI must refuse to act",
          "Uncertainty Handler: Ensures 'I don't know' is a valid output",
          "Audit Trail: Complete decision provenance and accountability",
          "Risk Quantification: Pre-quantified operational perimeters",
        ],
        philosophy: "In a carrier-grade network, confidence is never mistaken for permission. Every signal is gated, every handoff is authorized, and every action is bounded by architectural design. DILLO applies this same discipline to AI systems.",
      },
      philosophy: {
        title: "AI Governance Philosophy",
        principles: [
          "Decouple Intelligence from Control: AI can be smart; only humans decide if it acts",
          "Authority Over Accuracy: Accuracy is probabilistic; authority is binary permission",
          "Deterministic Boundaries: Systems must know when to refuse",
          "Liability-First Design: Treat AI as risk until proven safe",
          "Architectural Safety: Don't prompt-engineer safety; build it into the system",
        ],
        approach: "Dr. Ochieng' views today's AI landscape as a repetition of structural mistakes that telecom solved thirty years ago—the deployment of 'intelligent' systems without a functioning control plane. At Kopiyo, his focus is not on model accuracy, but on decision authority. While accuracy is a statistical probability, authority is a binary permission.",
      },
      expertise: [
        "Carrier-Grade Network Architecture (LTE/5G)",
        "AI Governance & Decision Authority Frameworks",
        "DILLO (Decision Intelligence & Logic Layer Orchestrator)",
        "Enterprise Risk Management for AI Systems",
        "Telecom Infrastructure Deployment at Scale",
        "Deterministic Control Planes for Probabilistic Systems",
        "Global Network Operations and Management",
        "AI Safety and Reliability Engineering",
      ],
      education: [
        {
          institution: "PhD in Telecommunications/Network Engineering",
          degree: "Doctor of Philosophy",
          note: "Advanced study in carrier-grade network systems",
        },
      ],
      vision: "Dr. Ochieng' has reached a point where he no longer 'uses' AI in the traditional sense; he governs it. His interaction model has crystallized into a dual-mode governance architecture that treats every session as one of two distinct operations: (1) A Compliance Test - stress-testing the boundaries to identify where the system breaks, or (2) A Calculated Suspension of Rules - allowing operation only within a predefined, sandboxed perimeter where risk has been pre-quantified. His mission is not to make AI sound smarter, but to make it safe to rely on.",
      personalValues: [
        "Safety First: Systems must be safe before they can be useful",
        "Architectural Discipline: Build safety into the foundation",
        "Refusal as Feature: 'No' is a valid and necessary response",
        "Risk Awareness: Understand failure modes before deployment",
        "Human Authority: Technology serves human decision-making",
      ],
      impact: [
        "Pioneered AI governance frameworks based on telecom principles",
        "Created DILLO platform for enterprise AI safety",
        "Established decision authority as core AI design principle",
        "Brought carrier-grade reliability thinking to AI systems",
        "Challenged industry to build control planes, not just models",
      ],
      insights: {
        title: "Key Insights",
        points: [
          "Most enterprises are attempting to 'prompt engineer' their way into safety—an approach that is aspirational rather than architectural.",
          "If a system cannot refuse to act, it is not ready for scale—and if it cannot say 'no,' it has no business touching an enterprise P&L.",
          "Confidence is never mistaken for permission in well-designed systems.",
          "AI without governance is a liability engine waiting to detonate.",
        ],
      },
    },
  },
  {
    name: "Dr. Jacqueline El-Sayed",
    title: "Distinguished Chief Scientist Officer",
    image: "/1517661622997_1_.jpeg",
    bio: "Accomplished CEO, engineering educator, and research leader with $60M+ in funded projects and extensive government service.",
    detailedProfile: {
      introduction: "Dr. Jacqueline El-Sayed is the Chief Executive Officer (CEO) for Intentional Design Group LLC and Intentional Design Institute 501c3. She is a builder and global speaker with leadership experience across industry, education, and government. She recently served as CEO for the group: SAE International (SAE), Performance Review Institute (PRI), Industry Technologies Consortia (ITC) & Fullsight Shared Services. Her previous role was CEO for the American Society for Engineering Education (ASEE).",
      careerHighlights: [
        {
          title: "SAE International, PRI, ITC & Fullsight",
          role: "Chief Executive Officer",
          period: "Recent",
          achievements: [
            "Led group of major engineering and technology organizations",
            "Oversaw SAE International (global engineering society)",
            "Managed Performance Review Institute (aerospace quality)",
            "Directed Industry Technologies Consortia",
            "Integrated Fullsight Shared Services operations",
          ],
        },
        {
          title: "American Society for Engineering Education (ASEE)",
          role: "Chief Executive Officer",
          period: "Previous",
          achievements: [
            "Led nation's premier engineering education organization",
            "Initially joined as Chief Academic Officer",
            "Drove growth and alignment across all professional services",
            "Led new business innovation initiatives",
            "Named ASEE Fellow & inducted into Hall of Fame",
          ],
        },
        {
          title: "Marygrove College",
          role: "Chief Academic Officer & VP for Academic Affairs",
          period: "Prior",
          achievements: [
            "Led academic operations and strategic planning",
            "Oversaw faculty development and curriculum",
            "Drove institutional transformation",
          ],
        },
        {
          title: "Kettering University",
          role: "Faculty & Associate Provost/Vice President",
          period: "18 Years",
          achievements: [
            "Professor of Mechanical Engineering (now Professor Emerita)",
            "Rose to Associate Provost/Vice President",
            "Led academic and research initiatives",
            "Mentored countless engineering students",
          ],
        },
        {
          title: "General Motors Truck Group",
          role: "Engineer",
          period: "Early Career",
          achievements: [
            "Started career in automotive engineering",
            "Gained industry experience before academia",
            "Foundation for teaching and research work",
          ],
        },
      ],
      platform: {
        name: "Engineering Workforce Development & Research Leadership",
        description: "Dr. El-Sayed has led transformative initiatives in engineering education, workforce development, and research funding.",
        majorProjects: [
          "NSF FREE (Defining and Building the Engineering Workforce of the Future) - Founding PI",
          "NSF eFellows (Engineering Postdoctoral Fellowship Program) - Founding PI",
          "NSF CISE Research Expansion Series - Founding PI or Co-PI",
          "NSF IPERF (Innovative Postdoctoral Entrepreneurial Research Fellowship) - Co-PI",
          "Engineering Mindset Blueprint - Co-PI",
          "Vertical/Horizontal Manufacturing Integration Series - Co-PI",
        ],
        funding: "Over $60 million in externally funded projects as PI or Co-PI",
      },
      philosophy: {
        title: "Leadership & Education Philosophy",
        principles: [
          "Intentional Design: Purposeful planning and execution in all endeavors",
          "Workforce Development: Building the engineering talent pipeline",
          "Research Excellence: Advancing knowledge through rigorous inquiry",
          "Cross-Sector Impact: Bridging industry, education, and government",
          "Public Safety: Commitment to using technical expertise for societal benefit",
        ],
        approach: "Dr. El-Sayed's career demonstrates a commitment to improving engineering education, advancing research, and serving the public good through both academic leadership and government service.",
      },
      expertise: [
        "CEO Leadership Across Multiple Organizations (SAE, ASEE, PRI, ITC)",
        "Engineering Education & Workforce Development",
        "Research Leadership ($60M+ in Funded Projects)",
        "Government Policy & Public Safety Commission Leadership",
        "Academic Administration & Faculty Development",
        "Manufacturing & Automotive Engineering",
        "STEM Education Innovation",
        "Strategic Organizational Transformation",
      ],
      education: [
        {
          institution: "Doctoral Studies",
          degree: "PhD",
          note: "Advanced engineering degree",
        },
      ],
      governmentService: [
        {
          title: "Michigan Truck Safety Commission",
          role: "Commissioner (4 Gubernatorial Appointments)",
          achievements: [
            "Served as Chair for two terms",
            "Four-time gubernatorial appointee",
            "Advanced truck safety policy in Michigan",
          ],
        },
        {
          title: "Driver's Education Advisory Committee",
          role: "Chair",
          organization: "Michigan Department of State",
          achievements: [
            "Shaped driver education policy",
            "Resulted in new Michigan legislation",
          ],
        },
        {
          title: "Motorcycle Safety Advisory Committee",
          role: "Chair",
          organization: "Michigan Department of State",
          achievements: [
            "Improved motorcycle safety standards",
            "Contributed to legislative reforms",
          ],
        },
      ],
      recognition: [
        "ACE Fellow (American Council on Education)",
        "NLA Fellow (National Leadership Academy)",
        "ASEE Fellow (American Society for Engineering Education)",
        "ASEE Hall of Famer",
        "Professor Emerita of Mechanical Engineering",
      ],
      currentBoardService: [
        "MIT TechAMP Advisory Council",
        "NASEM Roundtable for Systemic Change in Undergrad STEM Education",
        "Engineering Research Visioning Alliance (ERVA)",
        "Women in Engineering Proactive Network (WEPAN) Board - Chair",
        "Engineering Societies Roundtable - Chair",
      ],
      pastBoardService: [
        "Society of Manufacturing Engineers (SME) - Board Member",
        "American Council on Education (ACE) Council of Fellows",
        "Society of College and University Planners (SCUP)",
        "Bloomfield Hills Board of Education - Trustee (10 years)",
      ],
      vision: "Dr. El-Sayed's extensive government service demonstrates a commitment to public safety and policy innovation that translates technical expertise into legislative action. Her work bridges academia, industry, and government to create lasting impact on engineering education, workforce development, and public safety.",
      personalValues: [
        "Excellence: Pursuit of highest standards in all work",
        "Service: Dedication to improving society through engineering",
        "Education: Commitment to developing future engineers",
        "Leadership: Building and leading high-performing organizations",
        "Family: Married with three adult children",
      ],
      impact: [
        "Led multiple major engineering organizations as CEO",
        "Secured $60+ million in research funding",
        "Shaped engineering education policy nationally",
        "Influenced Michigan public safety legislation",
        "Mentored generations of engineering students",
        "Advanced diversity in engineering through WEPAN leadership",
      ],
    },
  },
];

const Modal = ({ member, onClose }: { member: TeamMember; onClose: () => void }) => {
  const profile = member.detailedProfile;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, rotateY: -10 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        exit={{ scale: 0.9, opacity: 0, rotateY: 10 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative max-w-6xl w-full max-h-[90vh] overflow-y-auto bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border border-amber-500/30 rounded-3xl shadow-2xl shadow-amber-500/20"
        onClick={(e) => e.stopPropagation()}
        style={{ perspective: "1500px", transformStyle: "preserve-3d" }}
      >
        {/* Close Button */}
        <motion.button
          onClick={onClose}
          className="sticky top-6 right-6 z-10 ml-auto mr-6 p-3 rounded-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 transition-all duration-300"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="h-6 w-6 text-amber-400" />
        </motion.button>

        <div className="p-8 md:p-12">
          {/* Header Section */}
          <motion.div
            className="flex flex-col md:flex-row gap-8 mb-12 pb-8 border-b border-amber-500/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <motion.div
              className="relative w-48 h-48 rounded-2xl overflow-hidden border-4 border-amber-500/40 flex-shrink-0 shadow-xl shadow-amber-500/20"
              whileHover={{ scale: 1.05, rotateY: 5 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </motion.div>
            <div className="flex-1">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-amber-300 via-amber-100 to-white bg-clip-text text-transparent mb-3">
                {member.name}
              </h2>
              <p className="text-2xl text-amber-400 font-semibold mb-6">
                {member.title}
              </p>
              <p className="text-gray-300 leading-relaxed text-lg">
                {profile.introduction}
              </p>
            </div>
          </motion.div>

          {/* Career Highlights */}
          <motion.section
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                className="p-3 rounded-xl bg-gradient-to-br from-amber-500/30 to-amber-600/20 shadow-lg shadow-amber-500/30"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Briefcase className="h-6 w-6 text-amber-400" />
              </motion.div>
              <h3 className="text-3xl font-bold text-amber-100">Career Highlights</h3>
            </div>
            <div className="space-y-6">
              {profile.careerHighlights.map((career, idx) => (
                <motion.div
                  key={idx}
                  className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-zinc-900/80 to-black/80 p-6 backdrop-blur-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  whileHover={{ scale: 1.02, x: 10, borderColor: "rgba(251, 191, 36, 0.5)" }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-amber-100">{career.title}</h4>
                      <p className="text-amber-400 font-semibold">{career.role}</p>
                    </div>
                    <span className="text-sm text-gray-400 font-medium px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
                      {career.period}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {career.achievements.map((achievement, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start gap-3 text-gray-300"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + idx * 0.1 + i * 0.05 }}
                      >
                        <ChevronRight className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                        <span>{achievement}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Platform/System (if exists) */}
          {profile.platform && (
            <motion.section
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  className="p-3 rounded-xl bg-gradient-to-br from-blue-500/30 to-purple-600/20 shadow-lg shadow-blue-500/30"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Brain className="h-6 w-6 text-blue-400" />
                </motion.div>
                <h3 className="text-3xl font-bold text-amber-100">
                  {profile.platform.name}
                </h3>
              </div>
              <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-950/40 to-purple-950/40 p-6 backdrop-blur-sm">
                <p className="text-gray-300 leading-relaxed mb-6">
                  {profile.platform.description}
                </p>
                {profile.platform.subsystems && (
                  <div className="grid md:grid-cols-2 gap-3">
                    {profile.platform.subsystems.map((system, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-start gap-3 p-3 rounded-lg bg-black/40 border border-blue-500/20"
                        whileHover={{ scale: 1.02, backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                      >
                        <Zap className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300 text-sm">{system}</span>
                      </motion.div>
                    ))}
                  </div>
                )}
                {profile.platform.components && (
                  <div className="space-y-3">
                    {profile.platform.components.map((component, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-start gap-3 p-3 rounded-lg bg-black/40 border border-blue-500/20"
                        whileHover={{ scale: 1.02, backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                      >
                        <ChevronRight className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">{component}</span>
                      </motion.div>
                    ))}
                  </div>
                )}
                {profile.platform.architecture && (
                  <div className="mt-6 space-y-3">
                    {profile.platform.architecture.map((item, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-start gap-3 p-3 rounded-lg bg-black/40 border border-blue-500/20"
                        whileHover={{ scale: 1.02, backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                      >
                        <Lock className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                )}
                {profile.platform.majorProjects && (
                  <div className="mt-6 space-y-3">
                    <h4 className="text-lg font-bold text-blue-300 mb-3">Major Projects</h4>
                    {profile.platform.majorProjects.map((project, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-start gap-3 p-3 rounded-lg bg-black/40 border border-blue-500/20"
                        whileHover={{ scale: 1.02, backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                      >
                        <Target className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">{project}</span>
                      </motion.div>
                    ))}
                    {profile.platform.funding && (
                      <div className="mt-4 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                        <p className="text-blue-300 font-bold">{profile.platform.funding}</p>
                      </div>
                    )}
                  </div>
                )}
                {profile.platform.impact && (
                  <p className="mt-4 text-gray-400 italic border-l-4 border-blue-500/50 pl-4">
                    {profile.platform.impact}
                  </p>
                )}
                {profile.platform.philosophy && (
                  <p className="mt-4 text-gray-400 italic border-l-4 border-blue-500/50 pl-4">
                    {profile.platform.philosophy}
                  </p>
                )}
              </div>
            </motion.section>
          )}

          {/* Philosophy */}
          {profile.philosophy && (
            <motion.section
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  className="p-3 rounded-xl bg-gradient-to-br from-purple-500/30 to-pink-600/20 shadow-lg shadow-purple-500/30"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Lightbulb className="h-6 w-6 text-purple-400" />
                </motion.div>
                <h3 className="text-3xl font-bold text-amber-100">{profile.philosophy.title}</h3>
              </div>
              <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-950/40 to-pink-950/40 p-6 backdrop-blur-sm">
                {profile.philosophy.approach && (
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {profile.philosophy.approach}
                  </p>
                )}
                <div className="space-y-3">
                  {profile.philosophy.principles.map((principle, idx) => (
                    <motion.div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-lg bg-black/40 border border-purple-500/20"
                      whileHover={{ scale: 1.02, backgroundColor: "rgba(168, 85, 247, 0.1)" }}
                    >
                      <ChevronRight className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{principle}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>
          )}

          {/* Areas of Expertise */}
          <motion.section
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                className="p-3 rounded-xl bg-gradient-to-br from-green-500/30 to-emerald-600/20 shadow-lg shadow-green-500/30"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Award className="h-6 w-6 text-green-400" />
              </motion.div>
              <h3 className="text-3xl font-bold text-amber-100">Areas of Expertise</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {profile.expertise.map((area, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-green-950/40 to-emerald-950/40 border border-green-500/20"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + idx * 0.05 }}
                  whileHover={{ scale: 1.05, borderColor: "rgba(34, 197, 94, 0.4)" }}
                >
                  <ChevronRight className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">{area}</span>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Education */}
          {profile.education && (
            <motion.section
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  className="p-3 rounded-xl bg-gradient-to-br from-indigo-500/30 to-blue-600/20 shadow-lg shadow-indigo-500/30"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <GraduationCap className="h-6 w-6 text-indigo-400" />
                </motion.div>
                <h3 className="text-3xl font-bold text-amber-100">Education</h3>
              </div>
              <div className="space-y-3">
                {profile.education.map((edu, idx) => (
                  <motion.div
                    key={idx}
                    className="p-4 rounded-xl bg-gradient-to-br from-indigo-950/40 to-blue-950/40 border border-indigo-500/20"
                    whileHover={{ scale: 1.02, borderColor: "rgba(99, 102, 241, 0.4)" }}
                  >
                    <h4 className="text-lg font-bold text-indigo-300">{edu.institution}</h4>
                    <p className="text-indigo-400">{edu.degree}</p>
                    {edu.note && <p className="text-gray-400 text-sm mt-1">{edu.note}</p>}
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Government Service (Dr. El-Sayed) */}
          {profile.governmentService && (
            <motion.section
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  className="p-3 rounded-xl bg-gradient-to-br from-red-500/30 to-orange-600/20 shadow-lg shadow-red-500/30"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Shield className="h-6 w-6 text-red-400" />
                </motion.div>
                <h3 className="text-3xl font-bold text-amber-100">Government Service</h3>
              </div>
              <div className="space-y-4">
                {profile.governmentService.map((service, idx) => (
                  <motion.div
                    key={idx}
                    className="p-4 rounded-xl bg-gradient-to-br from-red-950/40 to-orange-950/40 border border-red-500/20"
                    whileHover={{ scale: 1.02, borderColor: "rgba(239, 68, 68, 0.4)" }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-lg font-bold text-red-300">{service.title}</h4>
                        <p className="text-red-400">{service.role}</p>
                        {service.organization && (
                          <p className="text-sm text-gray-400">{service.organization}</p>
                        )}
                      </div>
                    </div>
                    <ul className="space-y-2 mt-3">
                      {service.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                          <ChevronRight className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Recognition */}
          {profile.recognition && (
            <motion.section
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  className="p-3 rounded-xl bg-gradient-to-br from-yellow-500/30 to-amber-600/20 shadow-lg shadow-yellow-500/30"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Award className="h-6 w-6 text-yellow-400" />
                </motion.div>
                <h3 className="text-3xl font-bold text-amber-100">Recognition & Honors</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {profile.recognition.map((honor, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-yellow-950/40 to-amber-950/40 border border-yellow-500/20"
                    whileHover={{ scale: 1.05, borderColor: "rgba(234, 179, 8, 0.4)" }}
                  >
                    <Award className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                    <span className="text-gray-300">{honor}</span>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Board Service */}
          {(profile.currentBoardService || profile.pastBoardService) && (
            <motion.section
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/30 to-blue-600/20 shadow-lg shadow-cyan-500/30"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Users className="h-6 w-6 text-cyan-400" />
                </motion.div>
                <h3 className="text-3xl font-bold text-amber-100">Board Service</h3>
              </div>
              {profile.currentBoardService && (
                <div className="mb-6">
                  <h4 className="text-xl font-bold text-cyan-300 mb-3">Current Boards</h4>
                  <div className="space-y-2">
                    {profile.currentBoardService.map((board, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-start gap-3 p-3 rounded-lg bg-cyan-950/40 border border-cyan-500/20"
                        whileHover={{ scale: 1.02, backgroundColor: "rgba(6, 182, 212, 0.1)" }}
                      >
                        <ChevronRight className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">{board}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
              {profile.pastBoardService && (
                <div>
                  <h4 className="text-xl font-bold text-cyan-300/70 mb-3">Past Boards</h4>
                  <div className="space-y-2">
                    {profile.pastBoardService.map((board, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-start gap-3 p-3 rounded-lg bg-cyan-950/20 border border-cyan-500/10"
                        whileHover={{ scale: 1.02, backgroundColor: "rgba(6, 182, 212, 0.05)" }}
                      >
                        <ChevronRight className="h-5 w-5 text-cyan-400/50 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-400">{board}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.section>
          )}

          {/* Insights (Dr. Ochieng') */}
          {profile.insights && (
            <motion.section
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  className="p-3 rounded-xl bg-gradient-to-br from-orange-500/30 to-red-600/20 shadow-lg shadow-orange-500/30"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <BookOpen className="h-6 w-6 text-orange-400" />
                </motion.div>
                <h3 className="text-3xl font-bold text-amber-100">{profile.insights.title}</h3>
              </div>
              <div className="space-y-4">
                {profile.insights.points.map((point, idx) => (
                  <motion.div
                    key={idx}
                    className="p-4 rounded-xl bg-gradient-to-br from-orange-950/40 to-red-950/40 border border-orange-500/20 border-l-4 border-l-orange-500/50"
                    whileHover={{ scale: 1.02, borderLeftColor: "rgba(249, 115, 22, 0.8)" }}
                  >
                    <p className="text-gray-300 italic leading-relaxed">"{point}"</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Personal Values */}
          {profile.personalValues && (
            <motion.section
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  className="p-3 rounded-xl bg-gradient-to-br from-rose-500/30 to-pink-600/20 shadow-lg shadow-rose-500/30"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Shield className="h-6 w-6 text-rose-400" />
                </motion.div>
                <h3 className="text-3xl font-bold text-amber-100">Personal Values</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {profile.personalValues.map((value, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-rose-950/40 to-pink-950/40 border border-rose-500/20"
                    whileHover={{ scale: 1.05, borderColor: "rgba(244, 63, 94, 0.4)" }}
                  >
                    <ChevronRight className="h-5 w-5 text-rose-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{value}</span>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Impact */}
          {profile.impact && (
            <motion.section
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  className="p-3 rounded-xl bg-gradient-to-br from-emerald-500/30 to-green-600/20 shadow-lg shadow-emerald-500/30"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <TrendingUp className="h-6 w-6 text-emerald-400" />
                </motion.div>
                <h3 className="text-3xl font-bold text-amber-100">Impact & Legacy</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {profile.impact.map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-emerald-950/40 to-green-950/40 border border-emerald-500/20"
                    whileHover={{ scale: 1.05, borderColor: "rgba(16, 185, 129, 0.4)" }}
                  >
                    <ChevronRight className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Vision Statement */}
          {profile.vision && (
            <motion.section
              className="p-8 rounded-3xl bg-gradient-to-br from-amber-950/50 via-amber-900/30 to-amber-950/50 border border-amber-500/30 shadow-2xl shadow-amber-500/10"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1 }}
              whileHover={{ scale: 1.01 }}
            >
              <h3 className="text-3xl font-bold text-amber-100 mb-4 flex items-center gap-3">
                <Target className="h-8 w-8 text-amber-400" />
                Vision & Mission
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                {profile.vision}
              </p>
            </motion.section>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function CompanyPage() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <>
      <SEO
        title="Company - Our Team | SiriusB iQ"
        description="Meet the leadership team behind SiriusB iQ's algorithmic fiduciary intelligence platform."
      />
      <div className="min-h-screen bg-black text-white">
        <SiteHeader />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-950/20 via-black to-black" />
          <div className="absolute inset-0">
            <div className="absolute top-20 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <Shield className="h-12 w-12 text-amber-400" />
                <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-amber-300 via-amber-100 to-white bg-clip-text text-transparent">
                  Our Team
                </h1>
              </div>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Visionary leaders combining decades of expertise in technology, governance, and enterprise transformation
              </p>
            </motion.div>
          </div>
        </section>

        {/* Team Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative cursor-pointer"
                  onClick={() => setSelectedMember(member)}
                  whileHover={{ scale: 1.02, y: -5 }}
                  style={{ perspective: "1500px", transformStyle: "preserve-3d" }}
                >
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-950/40 via-zinc-900/40 to-black/40 border border-amber-500/20 p-8 hover:border-amber-500/40 transition-all duration-500 hover:shadow-xl hover:shadow-amber-500/10 h-full flex flex-col items-center">
                    {/* Hover Glow Effect */}
                    <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-amber-600/0 via-amber-500/30 to-amber-600/0 opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />

                    {/* Member Image */}
                    <motion.div
                      className="relative w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-amber-500/30 group-hover:border-amber-400/60 transition-all duration-500"
                      whileHover={{ scale: 1.1, rotateY: 5 }}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>

                    {/* Member Info */}
                    <div className="relative text-center z-10" style={{ transform: "translateZ(20px)" }}>
                      <h3 className="text-2xl font-bold text-amber-100 mb-2">
                        {member.name}
                      </h3>
                      <p className="text-amber-400 font-semibold mb-4 text-lg">
                        {member.title}
                      </p>
                      <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm mx-auto">
                        {member.bio}
                      </p>
                      <div className="flex items-center justify-center gap-2 text-amber-400 text-sm font-semibold group-hover:text-amber-300 transition-colors bg-amber-500/10 py-2 px-4 rounded-full w-fit mx-auto border border-amber-500/20 group-hover:bg-amber-500/20">
                        <span>View Full Profile</span>
                        <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="py-20 bg-gradient-to-b from-black via-amber-950/5 to-black">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-amber-100 mb-4">
                Our Guiding Principles
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                The values that drive our mission and decision-making
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: TrendingUp,
                  title: "Innovation",
                  description: "Pioneering AI-driven solutions for algorithmic fiduciary governance",
                },
                {
                  icon: Shield,
                  title: "Integrity",
                  description: "Transparent governance and ethical AI deployment practices",
                },
                {
                  icon: Users,
                  title: "Collaboration",
                  description: "Building partnerships that drive industry transformation",
                },
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative p-8 rounded-2xl bg-gradient-to-br from-zinc-900/40 to-black/40 border border-amber-500/20 hover:border-amber-500/40 transition-all duration-500"
                  whileHover={{ scale: 1.05, y: -5 }}
                  style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <value.icon className="h-12 w-12 text-amber-400 mb-6" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-amber-100 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <SiteFooter />

        {/* Profile Modal */}
        {selectedMember && (
          <Modal member={selectedMember} onClose={() => setSelectedMember(null)} />
        )}
      </div>
    </>
  );
}