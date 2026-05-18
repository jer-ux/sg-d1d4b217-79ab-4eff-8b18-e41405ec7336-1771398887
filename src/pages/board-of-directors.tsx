"use client";

import type React from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Shield, Users, TrendingUp, Award, X, ChevronRight, Sparkles, Linkedin } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { ImageLightbox } from "@/components/ImageLightbox";

const boardMembers = [
  {
    name: "Jeremiah Shrack",
    title: "Founder & Chief Executive Officer",
    image: "/jeremiah-shrack-board.jpg",
    linkedin: "https://www.linkedin.com/in/shrack",
    bio: "Humanitarian and business leader with over two decades of experience engineering intelligent operating systems and scaling organizations. Achieved #2 in North America for Canon while working 60 hours/week and attending IWU full-time.",
    fullBio: {
      introduction: "Over two decades, he has built a reputation for engineering intelligent operating systems, scaling organizations, and redefining how advanced analytics intersect with human judgment. As a senior executive, Jeremiah drives enterprise-wide revenue growth, operational excellence, and high-impact PBM/Rx consulting engagements.",
      platform: "SiriusB iQ is a next-generation intelligent consulting operating system that integrates six purpose-built subsystems extending the reasoning frameworks of VortexAI, LogicAI, and JimShrackExpressAI. Each operating system is strategically designed to accelerate AI transformation in industries Jeremiah identifies as early adopters of intelligent automation. The platform combines ethical machine reasoning, actuarial precision, and human-centered design to drive measurable performance improvements for clients.",
      philosophy: "Jeremiah approaches AI and analytics through an ethical lens — ensuring that systems enhance, not replace, human decision-making. His leadership philosophy emphasizes clarity, accountability, and innovation, translating strategic objectives into scalable processes and measurable outcomes across the enterprise. He believes that the most powerful technology serves humanity — not the other way around.",
      expertise: [
        "Enterprise Executive Sales and Leadership",
        "Benefits Actuarial Consulting (Jumbo and Large-Market)",
        "AI System Architecture (LogicAI + VertexAI)",
        "PBM/Rx Contract Analytics",
        "Ethical AI Deployment & Governance",
        "Organizational Transformation at Scale"
      ],
      vision: "Grounded in business discipline, faith in God, and respect for humanity, Jeremiah is dedicated to helping employers outperform in the rapidly evolving health, benefits, and AI transformation landscape. Under his leadership, SiriusB iQ leverages decades of combined consulting experience to deliver 20–35% savings on self-funded PBM and Rx contracts, empowering mid- and large-market organizations through transparent, data-driven actuarial insights."
    }
  },
  {
    name: "Kyle Riddle",
    title: "Distinguished Chief of Insurance",
    image: "/1759522317489.png",
    linkedin: "https://www.linkedin.com/in/kyle-riddle-47581946/",
    bio: "Certified Employee Benefits Manager (University of Pennsylvania) and Certified Financial Planner who brings MIT engineering rigor and Stanford MBA strategic thinking to insurance and benefits management. Father of four, dedicated to ensuring people live lives better than they could have ever dreamed of.",
    fullBio: {
      introduction: "Kyle Riddle is a distinguished insurance executive whose career exemplifies the convergence of academic excellence and practical wisdom in the employee benefits landscape. As a Certified Employee Benefits Manager from the University of Pennsylvania and a Certified Financial Planner, Kyle has built a reputation for bringing uncompromising analytical rigor to complex insurance and risk management challenges. His unique educational foundation—combining MIT's engineering discipline with Stanford's MBA strategic frameworks—enables him to approach benefits design and insurance governance with a level of precision rarely seen in the industry.",
      platform: "Kyle's approach to insurance and benefits consulting is rooted in the belief that technical complexity should never obscure human outcomes. He systematically deconstructs insurance products, regulatory frameworks, and actuarial models to identify inefficiencies, hidden costs, and structural risks that erode employer value and member experience. By applying engineering-level rigor to financial planning, Kyle transforms insurance from an opaque compliance exercise into a strategic lever for organizational performance and employee wellbeing. His methodology emphasizes transparency, quantifiable results, and alignment between fiduciary duty and operational reality.",
      philosophy: "Kyle's guiding philosophy is profoundly simple yet radically ambitious: 'People deserve to live lives better than they could have ever dreamed of.' This conviction drives every actuarial model, every risk assessment, and every benefits recommendation he produces. As a father of four, Kyle approaches his work with the understanding that insurance and benefits are not abstract financial instruments—they are the safety nets that protect families, enable dreams, and provide dignity in moments of crisis. He believes that when fiduciary responsibility is executed with precision and empathy, employers can deliver benefits programs that don't just meet regulatory standards—they transform lives.",
      expertise: [
        "Regulatory Compliance & Fiduciary Governance",
        "Insurance Risk Management & Actuarial Analysis",
        "Employee Benefits Strategy & Plan Design",
        "Certified Financial Planning & Wealth Management",
        "MIT Engineering Rigor Applied to Benefits Architecture",
        "Stanford MBA Strategic Frameworks for Insurance Operations"
      ],
      vision: "At SiriusB iQ, Kyle's vision is to establish a new standard for insurance and benefits intelligence—one where actuarial precision, regulatory mastery, and human-centered design converge to deliver measurable improvements in both employer outcomes and member experiences. He is committed to leveraging algorithmic fiduciary platforms to expose inefficiencies, eliminate waste, and redirect savings toward benefits that genuinely enhance quality of life. Under his leadership, SiriusB iQ's insurance practice will serve as the bridge between technical excellence and the deeply human aspiration that every individual deserves access to benefits that enable them to live beyond their expectations."
    }
  },
  {
    name: "Mike Hamann",
    title: "Board Member - Public Service & Fiscal Leadership",
    image: "/1517039361817_1_.jpeg",
    linkedin: "https://www.linkedin.com/in/mike-hamann-33274023/",
    bio: "Mike Hamann's career in public service is defined by a deep commitment to the residents of St. Joseph County. He served two terms as County Auditor, acting as the county's chief financial officer and fiduciary steward until the end of 2022.",
    fullBio: {
      introduction: "Mike Hamann's career in public service is defined by a deep commitment to the residents of St. Joseph County. Most notably, Mike served two terms as the St. Joseph County Auditor, acting as the county's chief financial officer and fiduciary steward until the end of 2022. His leadership was marked by a 'boots-on-the-ground' philosophy, whether he was challenging property assessment loopholes to protect the local tax base or advocating for federal relief funds to support high-impact community initiatives like Motels4Now.",
      platform: "His political insight is rooted in a rare 'triple-threat' of local governance experience, having served on the Board of Commissioners (1999–2002), the County Council (elected 2008), and finally in the Auditor's office. This comprehensive background gave him a masterclass view of the intersection between executive policy, legislative intent, and fiscal reality.",
      philosophy: "What sets Mike apart is that his commitment to the classroom was never a 'second act'—it was a concurrent calling. For years, Mike balanced the heavy responsibilities of public office with the rigorous demands of teaching at Saint Joseph's High School and his alma mater, Marian High School. By serving as a public servant and a teacher simultaneously, Mike transformed the study of U.S. History and Government from a living, breathing case study. His students didn't just read about the separation of powers or local tax structures; they learned from the man who was actively managing them.",
      expertise: [
        "County-Level Fiscal Management & Fiduciary Stewardship",
        "Legislative & Executive Policy Implementation",
        "Property Assessment & Tax Base Protection",
        "Federal Relief Fund Allocation & Community Impact",
        "Government Education & Civic Leadership",
        "U.S. History & Government Instruction"
      ],
      vision: "A proud Marian High School alum and a graduate of the University of Notre Dame, Mike's career has come full circle. Now retired from government and teaching full-time at Marian, he continues to bridge the gap between the town hall and the classroom, ensuring the next generation of leaders understands that 'Government' isn't just a textbook chapter—it's a tool for community transformation."
    }
  },
  {
    name: "Dr. Jacqueline El-Sayed",
    title: "Board Member and Distinguished Chief Scientist Officer",
    image: "/dr-jacqueline-el-sayed.png",
    linkedin: "https://www.linkedin.com/in/jacquelineelsayed/",
    bio: "Dr. Jacqueline El-Sayed is the Chief Executive Officer for Intentional Design Group LLC and Intentional Design Institute 501c3. She is a builder and global speaker with leadership experience across industry, education, and government.",
    fullBio: {
      introduction: "Dr. Jacqueline El-Sayed is the Chief Executive Officer (CEO) for Intentional Design Group LLC and Intentional Design Institute 501c3. She is a builder and global speaker with leadership experience across industry, education, and government. She recently served as CEO for the group: SAE International (SAE), Performance Review Institute (PRI), Industry Technologies Consortia (ITC) & Fullsight Shared Services. Her previous role was CEO for the American Society for Engineering Education (ASEE). She joined ASEE as Chief Academic Officer driving growth and alignment across all professional services & leading new business innovation. Before this, she served as Chief Academic Officer & Vice President for Academic Affairs at Marygrove College.",
      platform: "Dr. El-Sayed began her career as an engineer for General Motors Truck Group and has been nationally recognized as an ACE Fellow, NLA Fellow, and ASEE Fellow & Hall of Famer. She is a professor emerita of mechanical engineering and served on the faculty at Kettering University for 18 years, earning the role Associate Provost/Vice President. Dr. El-Sayed has served as PI or co-PI for multiple externally funded projects totaling $60+ MM, including founding PI on the NSF Defining and Building the Engineering Workforce of the Future (FREE), the Engineering Postdoctoral Fellowship Program (eFellows) & the CISE Research Expansion series and Co-PI on the NSF Innovative Postdoctoral Entrepreneurial Research Fellowship (IPERF), Engineering Mindset Blueprint & the Vertical/Horizontal Manufacturing Integration series.",
      philosophy: "Dr. El-Sayed is a four-time gubernatorial appointee to the Michigan Truck Safety Commission and, as commissioner, served as chair for two terms. She also chaired the Driver's Education Advisory Committee and Motorcycle Safety Advisory Committee for the Michigan Department of State, work that resulted in new legislation for Michigan. Her extensive government service demonstrates a commitment to public safety and policy innovation that translates technical expertise into legislative action.",
      expertise: [
        "CEO Leadership Across Multiple Organizations (SAE, ASEE, PRI, ITC)",
        "Engineering Education & Workforce Development",
        "Research Leadership ($60+ MM in Funded Projects)",
        "Government Policy & Public Safety Commission Leadership",
        "Academic Administration & Faculty Development",
        "Manufacturing & Automotive Engineering"
      ],
      vision: "Dr. El-Sayed currently serves on MIT TechAMP Adv Council, National Academy of Science, Engineering, and Medicine (NASEM) Roundtable for Systemic Change in Undergrad STEM Education, Engineering Research Visioning Alliance (ERVA), Women in Engineering Proactive Network (WEPAN) Board and as Chair, Engineering Societies Roundtable. She recently completed board positions for Society of Manufacturing Engineers (SME), American Council on Education (ACE) Council of Fellows, Society of College and University Planners (SCUP) and a tenure of 10 years as Trustee on the Bloomfield Hills Board of Education. She is married and has three adult children."
    }
  },
  {
    name: "Catherine Farley",
    title: "Executive Chair, Committee on Algorithmic Governance & Fiduciary Risk",
    image: "/catherine-farley.jpg",
    linkedin: "https://www.linkedin.com/in/catherine-farley-233b28/",
    bio: "Catherine Farley is a seasoned financial services executive with deep expertise in operational excellence, wealth management, and strategic transformation. Her career spans leadership roles at major financial institutions where she drove innovation and operational efficiency at scale.",
    fullBio: {
      introduction: "Catherine Farley brings over two decades of financial services leadership to SiriusB iQ's board, with a proven track record of driving operational excellence and strategic transformation at major institutions. Her expertise spans wealth management, fiduciary governance, and large-scale operational optimization, making her uniquely qualified to guide algorithmic governance frameworks in the emerging AI-driven benefits landscape.",
      platform: "Throughout her career, Catherine has led initiatives that balance innovation with rigorous risk management, ensuring that technological advancement serves fiduciary duty rather than compromising it. Her approach to governance emphasizes transparency, accountability, and measurable outcomes—principles that align perfectly with SiriusB iQ's mission to bring algorithmic precision to benefits management.",
      philosophy: "Catherine believes that the intersection of AI and fiduciary duty requires a new governance framework—one that treats algorithmic decision-making with the same rigor as human fiduciary responsibility. She advocates for transparent AI systems that can be audited, explained, and held accountable to the same standards as human decision-makers in positions of trust.",
      expertise: [
        "Operational Excellence & Process Optimization",
        "Wealth Management & Fiduciary Governance",
        "Strategic Transformation & Change Management",
        "Risk Management & Compliance Frameworks",
        "Financial Services Leadership",
        "Board Governance & Oversight"
      ],
      vision: "As Executive Chair of the Committee on Algorithmic Governance & Fiduciary Risk, Catherine's vision is to establish SiriusB iQ AI Data Sciences Lab as the gold standard for ethical AI deployment in benefits management. She is committed to ensuring that every algorithmic decision made by the platform can withstand the scrutiny of fiduciary duty, regulatory review, and client trust."
    }
  },
  {
    name: "Nicole Burns",
    title: "Board Member - Go-To-Market & Commercial Strategy",
    image: "/nicole-burns.jpg",
    linkedin: "https://www.linkedin.com/in/nicburns/",
    bio: "Nicole Burns brings extensive expertise in Go-To-Market (GTM) strategy, driving enterprise growth, strategic partnerships, and market expansion. With a proven track record of scaling technology platforms and aligning complex value propositions with market needs, she leads the commercialization strategy for SiriusB iQ.",
    fullBio: {
      introduction: "Nicole Burns is a recognized Go-To-Market strategy expert with extensive experience driving growth, strategic partnerships, and market expansion across enterprise landscapes. Her leadership on the board ensures that SiriusB iQ's sophisticated algorithmic fiduciary platforms are effectively commercialized and scaled to meet urgent market demands.",
      platform: "Her strategic platform focuses on translating complex actuarial and AI capabilities into compelling enterprise value propositions. By designing and executing scalable GTM frameworks, Nicole aligns SiriusB iQ's core intelligence products with the specific financial and operational needs of large-market employers and fiduciaries.",
      philosophy: "Nicole's philosophy centers on the belief that effective go-to-market strategies require deep alignment between market needs and product capabilities. She advocates for commercialization strategies that build lasting client partnerships by demystifying complex technologies and focusing on measurable, deterministic outcomes.",
      expertise: [
        "Go-To-Market (GTM) Strategy",
        "Enterprise Sales Leadership",
        "Strategic Partnerships & Alliances",
        "Market Expansion & Scaling",
        "Revenue Operations",
        "Commercialization Strategy"
      ],
      vision: "As a member of the Board of Directors, Nicole's vision is to accelerate the adoption of algorithmic fiduciary intelligence across the enterprise landscape, establishing SiriusB iQ as the undeniable standard for healthcare financial governance and strategic decision-making."
    }
  },
  {
    name: "Eric Dreyfus",
    title: "Board Member and Distinguished Actuarial Science Officer",
    image: "/eric.jpeg",
    linkedin: "https://www.linkedin.com/in/eric-dreyfus-ab47915/",
    bio: "Actuarial science professional with extensive Fortune 500 health and welfare consulting experience. Led employee benefit financials for employers ranging from 100 to 50,000 employees, specializing in renewal negotiations, utilization analytics, and IBNR reserve calculations for self-insured organizations.",
    fullBio: {
      introduction: "Eric Dreyfus brings decades of actuarial and underwriting expertise to SiriusB iQ's board, with a distinguished career spanning major insurance carriers (MetLife, Aetna/US Healthcare) and premier consulting firms (Towers Perrin, now Willis Towers Watson, and Mercer). His deep technical proficiency in actuarial science, combined with hands-on experience managing complex employee benefit financials for Fortune 100 and Fortune 500 employers, positions him as a critical strategic adviser on healthcare cost modeling, risk assessment, and fiduciary governance. Eric's career trajectory—from underwriter to practice leader—demonstrates a rare combination of technical precision and strategic business development that directly aligns with SiriusB iQ's mission to bring algorithmic rigor to benefits intelligence.",
      platform: "Eric's consulting platform is built on a foundation of actuarial precision applied to real-world benefit design challenges. Throughout his career at Towers Perrin, Mercer, Hays, Apex Benefits Group, AssuredPartners, and currently Sympl Benefits, he has developed a methodology that transforms complex financial data—renewal negotiations, premium calculations, utilization analytics, IBNR reserves, and claim projections—into actionable strategic insights for employers. His approach emphasizes moving beyond the 'status quo' by leveraging innovative healthcare strategies that deliver sustainable, high-performing benefit programs. This philosophy of challenging conventional wisdom and building data-driven alternatives mirrors SiriusB iQ's core value proposition of replacing opaque traditional benefits management with transparent, algorithmic intelligence.",
      philosophy: "Eric's guiding philosophy centers on disrupting the 'status quo' in employee benefits—a principle that has driven his work across small, middle-market, and large employers. He believes that sustainable benefit programs must be built on rigorous financial analysis, transparent cost structures, and a commitment to measurable value rather than industry inertia. By working 'one employer at a time,' Eric focuses on creating bespoke solutions that balance financial performance with genuine value perception among employees. This commitment to individualized, data-driven strategy over one-size-fits-all approaches makes him an invaluable adviser as SiriusB iQ scales its algorithmic platforms to serve diverse employer segments—from middle-market organizations to jumbo accounts requiring actuarial-grade precision.",
      expertise: [
        "Actuarial Science & Life/Health Underwriting (MetLife, Aetna)",
        "Fortune 500 Health & Welfare Consulting (Towers Perrin/WTW)",
        "Employee Benefit Financial Modeling (Renewal/Marketing Negotiations)",
        "COBRA/Premium Calculations & Utilization Review Analytics",
        "IBNR Reserve & Claim Projection Modeling for Self-Insured Employers",
        "Middle to Large Group Risk Assessment (500-50,000 Employees)",
        "Practice Leadership & Consultant Team Management"
      ],
      vision: "As Senior Adviser to SiriusB iQ, Eric's vision is to ensure that the platform's actuarial intelligence and cost modeling capabilities meet the rigorous standards required by sophisticated employers and their fiduciaries. His experience across the full spectrum of employer sizes—from 100-employee organizations to Fortune 100 enterprises—enables him to guide SiriusB iQ's product roadmap to serve both middle-market and jumbo accounts with equal precision. Eric is committed to leveraging his decades of consulting expertise to validate that SiriusB iQ's algorithmic outputs deliver the same level of actuarial accuracy and strategic insight that he has personally provided to clients throughout his career, while scaling those capabilities through intelligent automation."
    }
  },
  {
    name: "Ann Lewandowski",
    title: "Board Director and Distinguished Chair of ERISA and Patient Advocacy",
    image: "/ann-lewandowski.jpg",
    linkedin: "https://www.linkedin.com/in/annlewandowski/",
    bio: "Healthcare compliance and patient advocacy expert with deep expertise in ERISA compliance, PBM transparency, and AI/ML applications in healthcare. Dedicated to ensuring algorithmic platforms serve both regulatory rigor and patient-centered outcomes.",
    fullBio: {
      introduction: "Ann Lewandowski brings critical expertise in healthcare compliance, ERISA fiduciary standards, and patient advocacy to SiriusB iQ's board. Her career has been dedicated to navigating the complex intersection of regulatory compliance, pharmacy benefit management transparency, and the responsible deployment of AI/ML technologies in healthcare. Ann's deep understanding of ERISA requirements, combined with her commitment to patient-centered care, positions her as a vital voice ensuring that SiriusB iQ's algorithmic platforms deliver both regulatory compliance and measurable patient outcomes. Her leadership bridges the technical precision of AI-driven benefits intelligence with the human imperative of protecting patient rights and ensuring equitable access to quality care.",
      platform: "Ann's professional platform is built on the conviction that healthcare technology must serve dual masters: regulatory compliance and patient welfare. Throughout her career, she has championed the use of AI/ML to expose opacity in PBM practices, identify pricing inefficiencies, and ensure that benefit designs align with both ERISA fiduciary standards and patient access needs. Her approach emphasizes transparency, accountability, and the ethical deployment of advanced analytics to detect conflicts of interest, pricing arbitrage, and formulary decisions that may compromise patient care. By applying rigorous compliance frameworks to emerging AI technologies, Ann ensures that innovation serves rather than circumvents the regulatory protections designed to safeguard plan participants and beneficiaries.",
      philosophy: "Ann's guiding philosophy centers on the principle that ERISA compliance and patient advocacy are not competing priorities—they are complementary imperatives. She believes that fiduciaries who fulfill their duty of prudence and loyalty to plan participants will inherently deliver better patient outcomes, and conversely, that patient-centered benefit designs will naturally align with fiduciary best practices. This philosophy challenges the industry's conventional separation of compliance and care quality, arguing instead that algorithmic platforms capable of detecting fiduciary breaches (undisclosed rebates, spread pricing, formulary manipulation) simultaneously protect patients from the downstream consequences of those breaches (higher costs, limited access, suboptimal therapies). Ann's vision for SiriusB iQ is that every algorithmic insight serves both the legal obligation to act in participants' best interests and the moral obligation to improve health outcomes.",
      expertise: [
        "ERISA Compliance & Fiduciary Governance",
        "PBM Transparency & Pricing Analytics",
        "AI/ML Applications in Healthcare",
        "Patient Advocacy & Access to Care",
        "Healthcare Policy & Regulatory Frameworks",
        "Ethical AI Deployment in Benefits Management",
        "Pharmacy Benefit Design & Formulary Optimization"
      ],
      vision: "As Board Director for ERISA and Patient Advocacy, Ann's vision is to ensure that SiriusB iQ's algorithmic platforms set the industry standard for compliance-first, patient-centered benefits intelligence. She is committed to validating that every AI-driven insight, every cost optimization recommendation, and every fiduciary risk alert aligns with both the letter and spirit of ERISA protections while simultaneously advancing patient access, affordability, and health equity. Ann will guide SiriusB iQ to build platforms that empower fiduciaries to confidently navigate complex regulatory landscapes while delivering measurable improvements in patient outcomes—proving that rigorous compliance and compassionate care are not opposing forces, but mutually reinforcing pillars of responsible benefits management."
    }
  }
];

export default function BoardOfDirectorsPage() {
  const [selectedMember, setSelectedMember] = useState<typeof boardMembers[0] | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    if (hoveredCard !== index) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x, y });
  };

  return (
    <>
      <SEO
        title="Board of Directors | SiriusB iQ AI Data Sciences Lab"
        description="Meet the board of directors guiding SiriusB iQ AI Data Sciences Lab's mission to revolutionize health economics and benefits intelligence through algorithmic fiduciary platforms."
      />
      <Nav />

      <div className="min-h-screen bg-black text-white">
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
                  Board of Directors
                </h1>
              </div>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-4">
                Leaders who protect your bottom line
              </p>
              <p className="text-base text-gray-400 max-w-2xl mx-auto">
                Expert guidance ensuring you pay fair prices, eliminate waste, and maintain compliance
              </p>
            </motion.div>
          </div>
        </section>

        {/* Board Members Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {boardMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative cursor-pointer perspective-1000"
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => {
                    setHoveredCard(null);
                    setMousePosition({ x: 0.5, y: 0.5 });
                  }}
                  onMouseMove={(e) => handleMouseMove(e, index)}
                  onClick={() => setSelectedMember(member)}
                >
                  <motion.div
                    className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-950/30 via-zinc-900/50 to-slate-900/30 border border-amber-500/20 p-8 transition-all duration-700"
                    animate={{
                      rotateX: hoveredCard === index ? (mousePosition.y - 0.5) * 10 : 0,
                      rotateY: hoveredCard === index ? (mousePosition.x - 0.5) * 10 : 0,
                      scale: hoveredCard === index ? 1.05 : 1,
                      borderColor: hoveredCard === index ? "rgba(251, 191, 36, 0.7)" : "rgba(251, 191, 36, 0.2)",
                      boxShadow: hoveredCard === index 
                        ? "0 25px 50px -12px rgba(251, 191, 36, 0.5)" 
                        : "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                    }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 20,
                      boxShadow: { duration: 0.5 },
                      borderColor: { duration: 0.5 }
                    }}
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {/* Animated gradient border overlay */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredCard === index ? 1 : 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-500/0 via-amber-400/30 to-amber-500/0 animate-pulse" />
                    </motion.div>

                    {/* Dynamic background glow that follows mouse */}
                    <motion.div
                      className="absolute w-64 h-64 bg-gradient-radial from-amber-500/30 via-amber-500/10 to-transparent pointer-events-none blur-2xl"
                      animate={{
                        opacity: hoveredCard === index ? 1 : 0,
                        left: hoveredCard === index ? `${mousePosition.x * 100}%` : "50%",
                        top: hoveredCard === index ? `${mousePosition.y * 100}%` : "50%",
                        x: "-50%",
                        y: "-50%",
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />

                    {/* Ripple effect on hover */}
                    {hoveredCard === index && (
                      <>
                        <motion.div
                          className="absolute rounded-full border-2 border-amber-400/50 pointer-events-none"
                          style={{
                            left: `${mousePosition.x * 100}%`,
                            top: `${mousePosition.y * 100}%`,
                            x: "-50%",
                            y: "-50%",
                          }}
                          initial={{ width: 0, height: 0, opacity: 0.8 }}
                          animate={{ 
                            width: 300, 
                            height: 300, 
                            opacity: 0 
                          }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                        />
                        <motion.div
                          className="absolute rounded-full border border-amber-400/30 pointer-events-none"
                          style={{
                            left: `${mousePosition.x * 100}%`,
                            top: `${mousePosition.y * 100}%`,
                            x: "-50%",
                            y: "-50%",
                          }}
                          initial={{ width: 0, height: 0, opacity: 0.6 }}
                          animate={{ 
                            width: 400, 
                            height: 400, 
                            opacity: 0 
                          }}
                          transition={{ duration: 1.5, ease: "easeOut", delay: 0.1 }}
                        />
                      </>
                    )}

                    {/* Enhanced particle effect */}
                    {hoveredCard === index && (
                      <motion.div
                        className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                      >
                        {[...Array(20)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1.5 h-1.5 bg-amber-400 rounded-full"
                            style={{
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                              y: [0, -30, 0],
                              x: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 40, (Math.random() - 0.5) * 20],
                              opacity: [0, 1, 0],
                              scale: [0.5, 1, 0.5],
                            }}
                            transition={{
                              duration: 2 + Math.random(),
                              repeat: Infinity,
                              delay: i * 0.08,
                              ease: "easeInOut",
                            }}
                          />
                        ))}
                      </motion.div>
                    )}

                    {/* Member Image */}
                    <motion.div
                      className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-amber-500/30 transition-all duration-700"
                      animate={{
                        borderColor: hoveredCard === index ? "rgba(251, 191, 36, 0.8)" : "rgba(251, 191, 36, 0.3)",
                        scale: hoveredCard === index ? 1.15 : 1,
                        y: hoveredCard === index ? -8 : 0,
                      }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 300, 
                        damping: 20 
                      }}
                      style={{
                        transformStyle: "preserve-3d",
                        transform: hoveredCard === index ? "translateZ(30px)" : "translateZ(0px)",
                      }}
                    >
                      <motion.img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                        animate={{
                          scale: hoveredCard === index ? 1.1 : 1,
                        }}
                        transition={{ duration: 0.7 }}
                      />
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-amber-500/30 to-transparent"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredCard === index ? 1 : 0 }}
                        transition={{ duration: 0.5 }}
                      />
                      
                      {/* Multiple pulsing ring effects */}
                      {hoveredCard === index && (
                        <>
                          <motion.div
                            className="absolute inset-0 rounded-full border-2 border-amber-400"
                            initial={{ scale: 1, opacity: 0.8 }}
                            animate={{ scale: 1.4, opacity: 0 }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                          <motion.div
                            className="absolute inset-0 rounded-full border-2 border-amber-300"
                            initial={{ scale: 1, opacity: 0.6 }}
                            animate={{ scale: 1.6, opacity: 0 }}
                            transition={{ duration: 1.8, repeat: Infinity, delay: 0.3 }}
                          />
                        </>
                      )}
                    </motion.div>

                    {/* Member Info with staggered animations */}
                    <div className="relative text-center" style={{ transformStyle: "preserve-3d" }}>
                      <motion.h3
                        className="text-2xl font-bold text-amber-100 mb-2 transition-colors duration-500"
                        animate={{
                          y: hoveredCard === index ? -4 : 0,
                          scale: hoveredCard === index ? 1.05 : 1,
                        }}
                        transition={{ 
                          duration: 0.4,
                          delay: hoveredCard === index ? 0.05 : 0,
                        }}
                        style={{
                          transform: hoveredCard === index ? "translateZ(20px)" : "translateZ(0px)",
                        }}
                      >
                        {member.name}
                      </motion.h3>
                      <motion.p
                        className="text-amber-400 font-semibold mb-4 text-sm transition-colors duration-500"
                        animate={{
                          y: hoveredCard === index ? -3 : 0,
                        }}
                        transition={{ 
                          duration: 0.4,
                          delay: hoveredCard === index ? 0.1 : 0,
                        }}
                        style={{
                          transform: hoveredCard === index ? "translateZ(15px)" : "translateZ(0px)",
                        }}
                      >
                        {member.title}
                      </motion.p>
                      <motion.p
                        className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3 transition-colors duration-500"
                        animate={{
                          color: hoveredCard === index ? "rgb(209, 213, 219)" : "rgb(156, 163, 175)",
                          y: hoveredCard === index ? -2 : 0,
                        }}
                        transition={{ 
                          duration: 0.4,
                          delay: hoveredCard === index ? 0.15 : 0,
                        }}
                        style={{
                          transform: hoveredCard === index ? "translateZ(10px)" : "translateZ(0px)",
                        }}
                      >
                        {member.bio}
                      </motion.p>

                      {/* LinkedIn Button */}
                      <motion.a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 hover:border-amber-400/60 text-amber-400 hover:text-amber-300 text-sm font-semibold transition-all duration-300"
                        onClick={(e) => e.stopPropagation()}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        animate={{
                          y: hoveredCard === index ? -1 : 0,
                        }}
                        transition={{ 
                          duration: 0.4,
                          delay: hoveredCard === index ? 0.2 : 0,
                        }}
                        style={{
                          transform: hoveredCard === index ? "translateZ(15px)" : "translateZ(0px)",
                        }}
                      >
                        <Linkedin className="h-4 w-4" />
                        <span>View LinkedIn Profile</span>
                      </motion.a>

                      <motion.div
                        className="flex items-center justify-center gap-2 text-amber-400 text-sm font-semibold transition-all duration-500"
                        animate={{
                          y: hoveredCard === index ? 0 : 0,
                        }}
                        transition={{ 
                          duration: 0.4,
                          delay: hoveredCard === index ? 0.25 : 0,
                        }}
                        style={{
                          transform: hoveredCard === index ? "translateZ(20px)" : "translateZ(0px)",
                        }}
                      >
                        <motion.div
                          animate={{
                            rotate: hoveredCard === index ? 360 : 0,
                          }}
                          transition={{
                            duration: 2,
                            repeat: hoveredCard === index ? Infinity : 0,
                            ease: "linear",
                          }}
                        >
                          <Sparkles className="h-4 w-4" />
                        </motion.div>
                        <span>View Full Profile</span>
                        <motion.div
                          animate={{
                            x: hoveredCard === index ? 6 : 0,
                          }}
                          transition={{ 
                            duration: 0.3,
                            repeat: hoveredCard === index ? Infinity : 0,
                            repeatType: "reverse",
                          }}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </motion.div>
                      </motion.div>
                    </div>

                    {/* Decorative corner accents with enhanced animation */}
                    <motion.div
                      className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/40 via-amber-400/15 to-transparent rounded-bl-3xl pointer-events-none"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        opacity: hoveredCard === index ? 1 : 0,
                        scale: hoveredCard === index ? 1.1 : 0.8,
                        rotate: hoveredCard === index ? 5 : 0,
                      }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-amber-500/40 via-amber-400/15 to-transparent rounded-tr-3xl pointer-events-none"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        opacity: hoveredCard === index ? 1 : 0,
                        scale: hoveredCard === index ? 1.1 : 0.8,
                        rotate: hoveredCard === index ? -5 : 0,
                      }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />

                    {/* Animated border shine effect */}
                    {hoveredCard === index && (
                      <motion.div
                        className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
                        style={{
                          background: "linear-gradient(90deg, transparent, rgba(251, 191, 36, 0.4), transparent)",
                        }}
                        animate={{
                          x: ["-100%", "200%"],
                        }}
                        transition={{
                          duration: 1.8,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                    )}

                    {/* Floating light orbs */}
                    {hoveredCard === index && (
                      <>
                        <motion.div
                          className="absolute w-3 h-3 bg-amber-400/60 rounded-full blur-sm pointer-events-none"
                          animate={{
                            x: [20, 80, 20],
                            y: [30, 60, 30],
                            opacity: [0.3, 0.8, 0.3],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                        <motion.div
                          className="absolute w-2 h-2 bg-amber-300/50 rounded-full blur-sm pointer-events-none"
                          style={{ right: 40, top: 40 }}
                          animate={{
                            x: [-10, 10, -10],
                            y: [0, -20, 0],
                            opacity: [0.2, 0.6, 0.2],
                          }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.5,
                          }}
                        />
                      </>
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Detailed Profile Modal */}
            {selectedMember && selectedMember.fullBio && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                onClick={() => setSelectedMember(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border border-amber-500/30 rounded-2xl p-8"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close Button */}
                  <button
                    onClick={() => setSelectedMember(null)}
                    className="absolute top-6 right-6 p-2 rounded-full bg-amber-500/10 hover:bg-amber-500/20 transition-colors"
                  >
                    <X className="h-6 w-6 text-amber-400" />
                  </button>

                  {/* Profile Header */}
                  <div className="flex flex-col md:flex-row gap-8 mb-8 pb-8 border-b border-amber-500/20">
                    <div
                      className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-amber-500/30 flex-shrink-0 cursor-pointer hover:border-amber-400/60 transition-all"
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxImage(selectedMember.image);
                      }}
                    >
                      <img
                        src={selectedMember.image}
                        alt={selectedMember.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-4xl font-bold text-amber-100 mb-2">
                        {selectedMember.name}
                      </h2>
                      <p className="text-xl text-amber-400 font-semibold mb-4">
                        {selectedMember.title}
                      </p>
                      <a
                        href={selectedMember.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 hover:border-amber-400/60 text-amber-400 hover:text-amber-300 text-sm font-semibold transition-all duration-300"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Linkedin className="h-4 w-4" />
                        <span>View LinkedIn Profile</span>
                      </a>
                      <p className="text-gray-300 leading-relaxed">
                        {selectedMember.bio}
                      </p>
                    </div>
                  </div>

                  {/* Full Biography Sections */}
                  <div className="space-y-8">
                    {/* Introduction */}
                    <div>
                      <h3 className="text-2xl font-bold text-amber-100 mb-4 flex items-center gap-3">
                        <Shield className="h-6 w-6 text-amber-400" />
                        Leadership & Experience
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {selectedMember.fullBio.introduction}
                      </p>
                    </div>

                    {/* Platform */}
                    <div>
                      <h3 className="text-2xl font-bold text-amber-100 mb-4 flex items-center gap-3">
                        <TrendingUp className="h-6 w-6 text-amber-400" />
                        Platform & Approach
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {selectedMember.fullBio.platform}
                      </p>
                    </div>

                    {/* Philosophy */}
                    <div>
                      <h3 className="text-2xl font-bold text-amber-100 mb-4 flex items-center gap-3">
                        <Users className="h-6 w-6 text-amber-400" />
                        Philosophy & Values
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {selectedMember.fullBio.philosophy}
                      </p>
                    </div>

                    {/* Areas of Expertise */}
                    <div>
                      <h3 className="text-2xl font-bold text-amber-100 mb-4 flex items-center gap-3">
                        <Award className="h-6 w-6 text-amber-400" />
                        Areas of Expertise
                      </h3>
                      <div className="grid md:grid-cols-2 gap-3">
                        {selectedMember.fullBio.expertise.map((area, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-3 p-3 rounded-lg bg-amber-500/5 border border-amber-500/10"
                          >
                            <ChevronRight className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">{area}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Vision & Ethos */}
                    <div className="p-6 rounded-xl bg-gradient-to-br from-amber-950/30 to-transparent border border-amber-500/20">
                      <h3 className="text-2xl font-bold text-amber-100 mb-4">
                        Vision & Ethos
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {selectedMember.fullBio.vision}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </div>
        </section>

        {/* Company Values Section */}
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
                  description: "Pioneering AI-driven solutions for health economics",
                },
                {
                  icon: Shield,
                  title: "Integrity",
                  description: "Transparent governance and ethical data practices",
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
                >
                  <value.icon className="h-12 w-12 text-amber-400 mb-6 group-hover:scale-110 transition-transform duration-500" />
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

        <Footer />
      </div>

      {lightboxImage && (
        <ImageLightbox
          isOpen
          imageSrc={lightboxImage}
          imageAlt="Board member profile"
          onClose={() => setLightboxImage(null)}
        />
      )}
    </>
  );
}