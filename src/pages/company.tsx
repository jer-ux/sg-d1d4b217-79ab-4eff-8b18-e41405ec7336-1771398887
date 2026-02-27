"use client";

import { SEO } from "@/components/SEO";
import dynamic from "next/dynamic";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Shield, 
  Brain, 
  Zap, 
  Users, 
  Award,
  TrendingUp,
  Building2,
  Heart,
  Target,
  Lightbulb
} from "lucide-react";

// Import centralized static data
import { foundingPrinciples, leadershipTeam, milestones, companyValues } from "@/lib/server/static-data";

const PremiumBackground = dynamic(() => import("@/components/premium/PremiumBackground").then(mod => ({ default: mod.PremiumBackground })), { ssr: false });

export default function CompanyPage() {
  return (
    <>
      <SEO 
        title="Company - SiriusB IQ | Algorithmic Fiduciary for Healthcare"
        description="Learn about SiriusB IQ's mission to eliminate wasteful healthcare spending through AI-powered transparency and evidence-based decision making."
        image="/og-image.png"
      />
      
      <div className="min-h-screen bg-[#0a0118] text-white relative overflow-hidden">
        <PremiumBackground />
        
        {/* Hero Section */}
        <section className="relative border-b border-white/10 py-24">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-transparent" />
          
          <div className="container mx-auto px-6 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm backdrop-blur-sm">
                <Building2 className="h-4 w-4 text-purple-400" />
                <span>Built for Transparency, Powered by AI</span>
              </div>
              
              <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                Algorithmic Fiduciary
                <span className="block bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                  for Healthcare
                </span>
              </h1>
              
              <p className="mb-8 text-xl text-white/70">
                We believe every dollar spent on healthcare should be justified by evidence, 
                auditable by design, and optimized by AI. No exceptions.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/request-demo">
                  <Button size="lg" className="bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white hover:from-purple-700 hover:to-fuchsia-700 shadow-lg shadow-purple-500/25">
                    Request Demo
                  </Button>
                </Link>
                <Link href="/platform">
                  <Button size="lg" variant="outline" className="border-purple-500/30 bg-white/5 text-white hover:bg-white/10 backdrop-blur-sm">
                    Explore Platform
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Founding Principles */}
        <section className="border-b border-white/10 py-24 relative">
          <div className="container mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16 max-w-3xl mx-auto text-center"
            >
              <h2 className="mb-4 text-4xl font-bold">Our Founding Principles</h2>
              <p className="text-xl text-white/70">
                The core beliefs that guide every decision we make
              </p>
            </motion.div>
            
            <div className="grid gap-8 md:grid-cols-3">
              {foundingPrinciples.map((principle, idx) => {
                const IconComponent = principle.icon === "Shield" ? Shield : principle.icon === "Brain" ? Brain : Zap;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                  >
                    <Card className="border-purple-500/20 bg-white/5 backdrop-blur-sm p-8 hover:bg-white/10 transition-all duration-300 group">
                      <IconComponent className="mb-4 h-12 w-12 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
                      <h3 className="mb-3 text-xl font-semibold text-white">{principle.title}</h3>
                      <p className="text-white/70">{principle.description}</p>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Leadership Section */}
        <section className="border-b border-white/10 py-24 relative">
          <div className="container mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16 max-w-3xl mx-auto text-center"
            >
              <h2 className="mb-4 text-4xl font-bold">Leadership Team</h2>
              <p className="text-xl text-white/70">
                Built by operators who've lived the pain of healthcare waste
              </p>
            </motion.div>
            
            <div className="grid gap-12 md:grid-cols-2 max-w-5xl mx-auto">
              {leadershipTeam.map((member, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col items-center text-center md:flex-row md:text-left md:items-start gap-8 p-8 rounded-2xl border border-purple-500/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                >
                  <div className="relative h-48 w-48 shrink-0 overflow-hidden rounded-2xl border border-purple-500/30 shadow-lg shadow-purple-500/20">
                    <Image 
                      src={member.image} 
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="mb-2 text-2xl font-bold text-white">{member.name}</h3>
                    <p className="mb-4 text-lg text-purple-400">{member.role}</p>
                    <p className="mb-6 text-white/70">{member.bio}</p>
                    <Link href={member.linkedin}>
                      <Button variant="outline" size="sm" className="border-purple-500/30 bg-white/5 text-white hover:bg-white/10 backdrop-blur-sm">
                        Connect on LinkedIn
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Company Timeline with Premium Graphic */}
        <section className="border-b border-white/10 py-24 relative">
          <div className="container mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16 max-w-3xl mx-auto text-center"
            >
              <h2 className="mb-4 text-4xl font-bold">Our Journey</h2>
              <p className="text-xl text-white/70">
                Building the future of healthcare accountability
              </p>
            </motion.div>

            {/* Strategic Timeline Graphic */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative mb-16 rounded-3xl overflow-hidden border border-purple-500/30 shadow-2xl shadow-purple-500/20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-fuchsia-900/20" />
              <Image 
                src="/slide_timeline.png" 
                alt="Company Timeline & Milestones"
                width={1920}
                height={1080}
                className="w-full h-auto"
              />
            </motion.div>
            
            {/* Interactive Timeline Details */}
            <div className="relative max-w-4xl mx-auto">
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 via-fuchsia-500/50 to-purple-500/50 -translate-x-1/2" />
              
              <div className="space-y-12">
                {milestones.map((milestone, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className={`relative flex items-center ${idx % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                  >
                    <Card className={`w-full md:w-[calc(50%-2rem)] border-purple-500/20 bg-white/5 backdrop-blur-sm p-6 hover:bg-white/10 transition-all duration-300 ${idx % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                      <div className="mb-2 text-sm font-semibold text-purple-400">{milestone.year}</div>
                      <h3 className="mb-2 text-xl font-bold text-white">{milestone.event}</h3>
                      <p className="text-white/70">{milestone.description}</p>
                    </Card>
                    
                    <div className="absolute left-1/2 -translate-x-1/2 h-4 w-4 rounded-full border-2 border-purple-400 bg-[#0a0118] shadow-lg shadow-purple-400/50" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Partnership Model with Premium Graphic */}
        <section className="border-b border-white/10 py-24 relative">
          <div className="container mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16 max-w-3xl mx-auto text-center"
            >
              <h2 className="mb-4 text-4xl font-bold">Partnership Model</h2>
              <p className="text-xl text-white/70">
                How we work with enterprises to drive measurable impact
              </p>
            </motion.div>

            {/* Strategic Partnership Graphic */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative rounded-3xl overflow-hidden border border-purple-500/30 shadow-2xl shadow-purple-500/20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-fuchsia-900/20" />
              <Image 
                src="/slide_partnership.png" 
                alt="Partnership & Go-to-Market Strategy"
                width={1920}
                height={1080}
                className="w-full h-auto"
              />
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 relative">
          <div className="container mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16 max-w-3xl mx-auto text-center"
            >
              <h2 className="mb-4 text-4xl font-bold">Our Values</h2>
              <p className="text-xl text-white/70">
                The principles that guide our work every day
              </p>
            </motion.div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {companyValues.map((value, idx) => {
                const IconComponent = value.icon === "Target" ? Target : value.icon === "Heart" ? Heart : value.icon === "Lightbulb" ? Lightbulb : Award;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                  >
                    <Card className="border-purple-500/20 bg-white/5 backdrop-blur-sm p-6 text-center hover:bg-white/10 transition-all duration-300 group h-full">
                      <IconComponent className="mx-auto mb-4 h-10 w-10 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
                      <h3 className="mb-2 text-lg font-semibold text-white">{value.title}</h3>
                      <p className="text-sm text-white/70">{value.description}</p>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t border-white/10 bg-gradient-to-b from-transparent to-purple-900/20 py-24 relative">
          <div className="container mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="mb-6 text-4xl font-bold">Join Us in Transforming Healthcare</h2>
              <p className="mb-8 text-xl text-white/70">
                Whether you're a self-funded employer, family office, or healthcare innovator, 
                we'd love to show you what's possible.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/request-demo">
                  <Button size="lg" className="bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white hover:from-purple-700 hover:to-fuchsia-700 shadow-lg shadow-purple-500/25">
                    Schedule a Demo
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="border-purple-500/30 bg-white/5 text-white hover:bg-white/10 backdrop-blur-sm">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <SiteFooter />
      </div>
    </>
  );
}