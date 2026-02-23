import { SEO } from "@/components/SEO";
import Navbar from "@/components/Navbar";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
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

export default function CompanyPage() {
  return (
    <>
      <SEO 
        title="Company - SiriusB IQ | Algorithmic Fiduciary for Healthcare"
        description="Learn about SiriusB IQ's mission to eliminate wasteful healthcare spending through AI-powered transparency and evidence-based decision making."
        image="/og-image.png"
      />
      
      <div className="min-h-screen bg-[#060812] text-white">
        <Navbar />
        
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-black/40 to-transparent py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">
                <Building2 className="h-4 w-4" />
                <span>Built for Transparency, Powered by AI</span>
              </div>
              
              <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                Algorithmic Fiduciary
                <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  for Healthcare
                </span>
              </h1>
              
              <p className="mb-8 text-xl text-white/70">
                We believe every dollar spent on healthcare should be justified by evidence, 
                auditable by design, and optimized by AI. No exceptions.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/request-demo">
                  <Button size="lg" className="bg-white text-black hover:bg-white/90">
                    Request Demo
                  </Button>
                </Link>
                <Link href="/platform">
                  <Button size="lg" variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10">
                    Explore Platform
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Founding Principles */}
        <section className="border-b border-white/10 py-24">
          <div className="container mx-auto px-6">
            <div className="mb-16 max-w-3xl mx-auto text-center">
              <h2 className="mb-4 text-4xl font-bold">Our Founding Principles</h2>
              <p className="text-xl text-white/70">
                The core beliefs that guide every decision we make
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3">
              {foundingPrinciples.map((principle, idx) => {
                const IconComponent = principle.icon === "Shield" ? Shield : principle.icon === "Brain" ? Brain : Zap;
                return (
                  <Card key={idx} className="border-white/10 bg-white/5 p-8">
                    <IconComponent className="mb-4 h-12 w-12 text-blue-400" />
                    <h3 className="mb-3 text-xl font-semibold text-white">{principle.title}</h3>
                    <p className="text-white/70">{principle.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Leadership Section */}
        <section className="border-b border-white/10 py-24">
          <div className="container mx-auto px-6">
            <div className="mb-16 max-w-3xl mx-auto text-center">
              <h2 className="mb-4 text-4xl font-bold">Leadership Team</h2>
              <p className="text-xl text-white/70">
                Built by operators who've lived the pain of healthcare waste
              </p>
            </div>
            
            <div className="grid gap-12 md:grid-cols-1 max-w-2xl mx-auto">
              {leadershipTeam.map((member, idx) => (
                <div key={idx} className="flex flex-col items-center text-center md:flex-row md:text-left md:items-start gap-8">
                  <div className="relative h-48 w-48 shrink-0 overflow-hidden rounded-2xl border border-white/10">
                    <Image 
                      src={member.image} 
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="mb-2 text-2xl font-bold text-white">{member.name}</h3>
                    <p className="mb-4 text-lg text-blue-400">{member.role}</p>
                    <p className="mb-6 text-white/70">{member.bio}</p>
                    <Link href={member.linkedin}>
                      <Button variant="outline" size="sm" className="border-white/20 bg-white/5 text-white hover:bg-white/10">
                        Connect on LinkedIn
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Company Timeline */}
        <section className="border-b border-white/10 py-24">
          <div className="container mx-auto px-6">
            <div className="mb-16 max-w-3xl mx-auto text-center">
              <h2 className="mb-4 text-4xl font-bold">Our Journey</h2>
              <p className="text-xl text-white/70">
                Building the future of healthcare accountability
              </p>
            </div>
            
            <div className="relative max-w-4xl mx-auto">
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />
              
              <div className="space-y-12">
                {milestones.map((milestone, idx) => (
                  <div key={idx} className={`relative flex items-center ${idx % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                    <Card className={`w-full md:w-[calc(50%-2rem)] border-white/10 bg-white/5 p-6 ${idx % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                      <div className="mb-2 text-sm font-semibold text-blue-400">{milestone.year}</div>
                      <h3 className="mb-2 text-xl font-bold text-white">{milestone.event}</h3>
                      <p className="text-white/70">{milestone.description}</p>
                    </Card>
                    
                    <div className="absolute left-1/2 -translate-x-1/2 h-4 w-4 rounded-full border-2 border-blue-400 bg-[#060812]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="mb-16 max-w-3xl mx-auto text-center">
              <h2 className="mb-4 text-4xl font-bold">Our Values</h2>
              <p className="text-xl text-white/70">
                The principles that guide our work every day
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {companyValues.map((value, idx) => {
                const IconComponent = value.icon === "Target" ? Target : value.icon === "Heart" ? Heart : value.icon === "Lightbulb" ? Lightbulb : Award;
                return (
                  <Card key={idx} className="border-white/10 bg-white/5 p-6 text-center">
                    <IconComponent className="mx-auto mb-4 h-10 w-10 text-blue-400" />
                    <h3 className="mb-2 text-lg font-semibold text-white">{value.title}</h3>
                    <p className="text-sm text-white/70">{value.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t border-white/10 bg-gradient-to-b from-transparent to-black/40 py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="mb-6 text-4xl font-bold">Join Us in Transforming Healthcare</h2>
              <p className="mb-8 text-xl text-white/70">
                Whether you're a self-funded employer, family office, or healthcare innovator, 
                we'd love to show you what's possible.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/request-demo">
                  <Button size="lg" className="bg-white text-black hover:bg-white/90">
                    Schedule a Demo
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <SiteFooter />
      </div>
    </>
  );
}