"use client";

import { SEO } from "@/components/SEO";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Building2,
  Users,
  Target,
  Award,
  TrendingUp,
  Shield,
  Lightbulb,
  Heart,
  Linkedin,
  X,
  ChevronRight,
} from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { leadershipTeam } from "@/lib/server/static-data";

const companyValues = [
  {
    icon: Lightbulb,
    title: "Innovation",
    shortDesc: "Pioneering AI-driven solutions for health economics",
    fullDescription: "We push the boundaries of what's possible in health economics through cutting-edge AI and machine learning. Our innovation isn't just about technology—it's about transforming how organizations understand, analyze, and optimize their health benefits investments. We continuously challenge conventional approaches and develop breakthrough solutions that deliver measurable value.",
    keyPrinciples: [
      "Embrace emerging technologies to solve complex problems",
      "Challenge industry assumptions with data-driven insights",
      "Iterate rapidly based on client feedback and outcomes",
      "Invest in R&D to stay ahead of market needs"
    ]
  },
  {
    icon: Shield,
    title: "Integrity",
    shortDesc: "Transparent governance and ethical data practices",
    fullDescription: "Trust is the foundation of everything we do. We maintain the highest standards of transparency in our operations, data handling, and client relationships. Our commitment to integrity means we never compromise on ethical practices, even when faced with difficult decisions. Every recommendation we make is backed by verifiable data and aligned with our clients' best interests.",
    keyPrinciples: [
      "Maintain complete transparency in our methodologies",
      "Protect client data with enterprise-grade security",
      "Provide unbiased recommendations free from conflicts of interest",
      "Hold ourselves accountable to measurable outcomes"
    ]
  },
  {
    icon: Users,
    title: "Collaboration",
    shortDesc: "Building partnerships that drive industry transformation",
    fullDescription: "We believe the most powerful solutions emerge from collaborative partnerships. By working closely with clients, industry experts, and technology partners, we create ecosystems of innovation that benefit everyone. Our approach is never one-size-fits-all—we listen, learn, and co-create solutions tailored to each organization's unique challenges and opportunities.",
    keyPrinciples: [
      "Foster deep partnerships with clients and industry leaders",
      "Share knowledge openly to elevate the entire industry",
      "Co-create solutions through active client engagement",
      "Build lasting relationships based on mutual success"
    ]
  },
  {
    icon: Heart,
    title: "Impact",
    shortDesc: "Creating measurable value for organizations and members",
    fullDescription: "Every solution we deliver must create real, measurable impact. We're not satisfied with incremental improvements—we aim for transformational results that fundamentally improve how organizations manage health benefits. Our success is measured by the tangible savings we generate, the insights we uncover, and the positive outcomes we create for both employers and their members.",
    keyPrinciples: [
      "Focus on outcomes that matter: savings, quality, and member satisfaction",
      "Quantify impact with rigorous analytics and reporting",
      "Optimize for long-term sustainability, not short-term gains",
      "Ensure our solutions benefit both organizations and their members"
    ]
  }
];

export default function CompanyPage() {
  const [selectedValue, setSelectedValue] = useState<typeof companyValues[0] | null>(null);

  return (
    <>
      <SEO
        title="Company | SiriusB iQ"
        description="Learn about SiriusB iQ's mission to revolutionize health economics and benefits intelligence through algorithmic fiduciary platforms."
      />
      <SiteHeader />

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
                <Building2 className="h-12 w-12 text-amber-400" />
                <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-amber-300 via-amber-100 to-white bg-clip-text text-transparent">
                  About SiriusB iQ
                </h1>
              </div>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Revolutionizing health economics through algorithmic fiduciary platforms
              </p>
            </motion.div>
          </div>
        </section>

        {/* Our Values Section - NOW ON TOP */}
        <section className="py-20 bg-gradient-to-b from-black via-amber-950/5 to-black">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-amber-100 mb-4">
                Our Core Values
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                The principles that guide our mission and decision-making
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {companyValues.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative cursor-pointer"
                  onClick={() => setSelectedValue(value)}
                >
                  <div className="relative p-8 rounded-2xl bg-gradient-to-br from-zinc-900/40 to-black/40 border border-amber-500/20 hover:border-amber-500/40 transition-all duration-500 hover:shadow-xl hover:shadow-amber-500/10 h-full">
                    <value.icon className="h-12 w-12 text-amber-400 mb-6 group-hover:scale-110 transition-transform duration-500" />
                    <h3 className="text-xl font-bold text-amber-100 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed text-sm mb-4">
                      {value.shortDesc}
                    </p>
                    <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold group-hover:text-amber-300 transition-colors">
                      <span>Learn More</span>
                      <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
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
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                onClick={() => setSelectedValue(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="relative max-w-3xl w-full max-h-[90vh] overflow-y-auto bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border border-amber-500/30 rounded-2xl p-8"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close Button */}
                  <button
                    onClick={() => setSelectedValue(null)}
                    className="absolute top-6 right-6 p-2 rounded-full bg-amber-500/10 hover:bg-amber-500/20 transition-colors"
                  >
                    <X className="h-6 w-6 text-amber-400" />
                  </button>

                  {/* Value Header */}
                  <div className="mb-8 pb-8 border-b border-amber-500/20">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                        <selectedValue.icon className="h-8 w-8 text-amber-400" />
                      </div>
                      <h2 className="text-4xl font-bold text-amber-100">
                        {selectedValue.title}
                      </h2>
                    </div>
                    <p className="text-xl text-amber-400 font-semibold">
                      {selectedValue.shortDesc}
                    </p>
                  </div>

                  {/* Full Description */}
                  <div className="mb-8">
                    <p className="text-gray-300 leading-relaxed text-lg">
                      {selectedValue.fullDescription}
                    </p>
                  </div>

                  {/* Key Principles */}
                  <div>
                    <h3 className="text-2xl font-bold text-amber-100 mb-6">
                      Key Principles
                    </h3>
                    <div className="space-y-4">
                      {selectedValue.keyPrinciples.map((principle, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-4 rounded-lg bg-amber-500/5 border border-amber-500/10"
                        >
                          <ChevronRight className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">{principle}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <Target className="h-10 w-10 text-amber-400" />
                  <h2 className="text-4xl font-bold text-amber-100">Our Mission</h2>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  SiriusB iQ is transforming health economics through algorithmic fiduciary
                  platforms that combine AI-driven analytics with transparent governance.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  We empower organizations to make data-driven decisions about their health
                  benefits investments, delivering measurable savings and improved outcomes
                  through our innovative platform.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="relative p-8 rounded-2xl bg-gradient-to-br from-amber-950/30 to-transparent border border-amber-500/20">
                  <Award className="h-16 w-16 text-amber-400 mb-6" />
                  <h3 className="text-2xl font-bold text-amber-100 mb-4">
                    Industry Recognition
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    Leading the next generation of health benefits intelligence with
                    cutting-edge AI technology and proven actuarial methodologies.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Leadership Team Section */}
        <section className="py-20 bg-gradient-to-b from-black via-amber-950/5 to-black">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-amber-100 mb-4">
                Leadership Team
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Experienced leaders driving innovation in health economics
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {leadershipTeam.map((leader, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-950/40 via-zinc-900/40 to-black/40 border border-amber-500/20 p-8 hover:border-amber-500/40 transition-all duration-500 hover:shadow-xl hover:shadow-amber-500/10">
                    {/* Leader Image */}
                    <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-amber-500/30 group-hover:border-amber-400/60 transition-all duration-500">
                      <img
                        src={leader.image}
                        alt={leader.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Leader Info */}
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-amber-100 mb-2">
                        {leader.name}
                      </h3>
                      <p className="text-amber-400 font-semibold mb-4">
                        {leader.role}
                      </p>
                      <p className="text-gray-400 text-sm leading-relaxed mb-6">
                        {leader.bio}
                      </p>
                      
                      {/* LinkedIn Button */}
                      <a
                        href={leader.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 hover:bg-amber-500/20 hover:border-amber-500/40 transition-all duration-300"
                      >
                        <Linkedin className="h-5 w-5" />
                        <span>Connect on LinkedIn</span>
                      </a>
                    </div>

                    {/* Decorative corner accent */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-500/20 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <SiteFooter />
      </div>
    </>
  );
}