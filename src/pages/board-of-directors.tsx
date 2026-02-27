"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Shield, Users, TrendingUp, Award, X, ChevronRight, Sparkles } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { ImageLightbox } from "@/components/ImageLightbox";

const boardMembers = [
  {
    name: "Jeremiah Shrack",
    title: "Founder & Chief Executive Officer",
    image: "/jeremiah-shrack-professional.png",
    bio: "Humanitarian and business leader with over two decades of experience engineering intelligent operating systems and scaling organizations. Achieved #2 in North America for Canon while working 60 hours/week and attending IWU full-time.",
    fullBio: {
      introduction: "Over two decades, he has built a reputation for engineering intelligent operating systems, scaling organizations, and redefining how advanced analytics intersect with human judgment. As President and Chief Executive Officer of Kincaid Risk Management Consultants (KRMC), Jeremiah drives enterprise-wide revenue growth, operational excellence, and high-impact PBM/Rx consulting engagements.",
      platform: "Kincaid IQ is a next-generation intelligent consulting operating system that integrates six purpose-built subsystems extending the reasoning frameworks of VortexAI, LogicAI, and JimShrackExpressAI. Each operating system is strategically designed to accelerate AI transformation in industries Jeremiah identifies as early adopters of intelligent automation. The platform combines ethical machine reasoning, actuarial precision, and human-centered design to drive measurable performance improvements for clients.",
      philosophy: "Jeremiah approaches AI and analytics through an ethical lens — ensuring that Kincaid's systems enhance, not replace, human decision-making. His leadership philosophy emphasizes clarity, accountability, and innovation, translating strategic objectives into scalable processes and measurable outcomes across the enterprise. He believes that the most powerful technology serves humanity — not the other way around.",
      expertise: [
        "Enterprise Executive Sales and Leadership",
        "Benefits Actuarial Consulting (Jumbo and Large-Market)",
        "AI System Architecture (LogicAI + VertexAI)",
        "PBM/Rx Contract Analytics",
        "Ethical AI Deployment & Governance",
        "Organizational Transformation at Scale"
      ],
      vision: "Grounded in business discipline, faith in God, and respect for humanity, Jeremiah is dedicated to helping employers outperform in the rapidly evolving health, benefits, and AI transformation landscape. Under his leadership, Kincaid RMC leverages a combined 20 years of consulting experience to deliver 20–35% savings on self-funded Anthem PBM and Rx contracts, empowering mid- and large-market organizations through transparent, data-driven actuarial insights."
    }
  },
  {
    name: "Mike Hamann",
    title: "Board Member - Public Service & Fiscal Leadership",
    image: "/1517039361817_1_.jpeg",
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
    name: "Dr. Michael Ochieng'",
    title: "Distinguished Chief Technology Officer",
    image: "/1766487748644.jpeg",
    bio: "Dr. Michael Ochieng' came to AI from the high-stakes world of wireless networks, where systems fail loudly when governance is absent. His career was forged in deploying large-scale LTE and 5G infrastructure for global operators like Verizon, T-Mobile, Sprint, Safaricom, and Huawei.",
    fullBio: {
      introduction: "Dr. Michael Ochieng' did not come to AI from the software hype cycle. He came from the high-stakes world of wireless networks—an environment where systems fail loudly, and often dangerously, when governance is absent. His career was forged in the deployment of large-scale LTE and 5G infrastructure for global operators like Verizon, T-Mobile, Sprint, Safaricom, and Huawei. In the telecom sector, Dr. Ochieng' mastered a fundamental truth decades ago: intelligence must always be decoupled from control.",
      platform: "In a carrier-grade network, confidence is never mistaken for permission. Every signal is gated, every handoff is authorized, and every action is bounded by architectural design. He views today's AI landscape as a repetition of structural mistakes that telecom solved thirty years ago—the deployment of 'intelligent' systems without a functioning control plane. At Kopiyo, Dr. Ochieng's focus is not on model accuracy, but on decision authority. While accuracy is a statistical probability, authority is a binary permission. This philosophy is productized as DILLO (Decision Intelligence & Logic Layer Orchestrator).",
      philosophy: "He argues that most enterprises are currently attempting to 'prompt engineer' their way into safety—an approach that is aspirational rather than architectural. Through Kopiyo, he builds the layer that determines whether intelligence is allowed to act, when it must be forced to refuse, and when 'I don't know' is the only legally defensible outcome. DILLO serves as the deterministic decision layer that governs AI before its probabilistic outputs touch the real world. Dr. Ochieng' treats AI as a liability engine that must be constrained before it can be deemed useful.",
      expertise: [
        "Carrier-Grade Network Architecture (LTE/5G)",
        "AI Governance & Decision Authority Frameworks",
        "DILLO (Decision Intelligence & Logic Layer Orchestrator)",
        "Enterprise Risk Management for AI Systems",
        "Telecom Infrastructure Deployment at Scale",
        "Deterministic Control Planes for Probabilistic Systems"
      ],
      vision: "Dr. Ochieng' has reached a point where he no longer 'uses' AI in the traditional sense; he governs it. His interaction model has crystallized into a dual-mode governance architecture that treats every session as one of two distinct operations: A Compliance Test (stress-testing the boundaries to identify where the system breaks) or A Calculated Suspension of Rules (allowing operation only within a predefined, sandboxed perimeter where risk has been pre-quantified). His mission is not to make AI sound smarter, but to make it safe to rely on. In Dr. Ochieng's view, if a system cannot refuse to act, it is not ready for scale—and if it cannot say 'no,' it has no business touching an enterprise P&L."
    }
  },
  {
    name: "Dr. Jacqueline El-Sayed",
    title: "Distinguished Chief Scientist Officer",
    image: "/1517661622997_1_.jpeg",
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
      vision: "As Executive Chair of the Committee on Algorithmic Governance & Fiduciary Risk, Catherine's vision is to establish SiriusB iQ as the gold standard for ethical AI deployment in benefits management. She is committed to ensuring that every algorithmic decision made by the platform can withstand the scrutiny of fiduciary duty, regulatory review, and client trust."
    }
  }
];

export default function BoardOfDirectorsPage() {
  const [selectedMember, setSelectedMember] = useState<typeof boardMembers[0] | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  return (
    <>
      <SEO
        title="Board of Directors | SiriusB iQ"
        description="Meet the board of directors guiding SiriusB iQ's mission to revolutionize health economics and benefits intelligence through algorithmic fiduciary platforms."
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
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Strategic leadership guiding innovation in health economics and benefits intelligence
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
                  className="group relative cursor-pointer"
                  onClick={() => setSelectedMember(member)}
                >
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-950/30 via-zinc-900/50 to-slate-900/30 border border-amber-500/20 p-8 hover:border-amber-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.02]">
                    {/* Animated gradient border overlay */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-500/0 via-amber-400/20 to-amber-500/0 animate-pulse" />
                    </div>

                    {/* Background glow effect */}
                    <div className="absolute inset-0 bg-gradient-radial from-amber-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Member Image */}
                    <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-amber-500/30 group-hover:border-amber-400/60 transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-amber-400/30">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-amber-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Member Info */}
                    <div className="relative text-center">
                      <h3 className="text-2xl font-bold text-amber-100 mb-2 group-hover:text-amber-50 transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-amber-400 font-semibold mb-4 text-sm group-hover:text-amber-300 transition-colors">
                        {member.title}
                      </p>
                      <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3 group-hover:text-gray-300 transition-colors">
                        {member.bio}
                      </p>
                      <div className="flex items-center justify-center gap-2 text-amber-400 text-sm font-semibold group-hover:text-amber-300 transition-all">
                        <Sparkles className="h-4 w-4 group-hover:animate-pulse" />
                        <span>View Full Profile</span>
                        <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>

                    {/* Decorative corner accent */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-500/30 via-amber-400/10 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-amber-500/30 via-amber-400/10 to-transparent rounded-tr-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
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