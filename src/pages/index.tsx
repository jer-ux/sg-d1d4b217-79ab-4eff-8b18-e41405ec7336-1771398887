import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Shield, Zap, Users, TrendingUp, Award, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Hero3D } from "@/components/Hero3D";
import { TechBackdrop } from "@/components/TechBackdrop";

export default function Home() {
  return (
    <>
      <SEO
        title="Kincaid IQ - AI Data Sciences Lab"
        description="Enterprise AI-powered data intelligence platform for real-time incident management, cost optimization, and governance"
      />
      
      <Nav />

      <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/20">
        
        {/* Hero Section */}
        <section className="relative pt-20 pb-0 px-4 flex items-center justify-center">
          <TechBackdrop />
          <div className="relative z-10 max-w-5xl mx-auto text-center space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                Kincaid IQ Data Sciences Gen AI Labs
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                Enterprise-grade AI platform for autonomous operations, governance, and verified cost optimization
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <Link href="/war-room">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Launch War Room <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/request-demo">
                <Button size="lg" variant="outline">
                  Request Demo
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* 3D Hero Showcase - No gap */}
        <section className="py-0 px-4">
          <Hero3D />
        </section>

        {/* Platform Features - Compact */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Platform Capabilities</h2>
              <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">Enterprise-grade intelligence infrastructure</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Shield,
                  title: "War Room",
                  description: "Real-time incident management with AI-powered event ranking and governance automation",
                  href: "/war-room"
                },
                {
                  icon: TrendingUp,
                  title: "Verified Savings Ledger",
                  description: "Blockchain-backed cost optimization tracking with immutable audit trails",
                  href: "/ledger"
                },
                {
                  icon: Zap,
                  title: "Evidence Receipts",
                  description: "Cryptographically signed proof of business outcomes and operational metrics",
                  href: "/evidence-receipts"
                }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link href={feature.href}>
                    <div className="h-full p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all hover:shadow-lg cursor-pointer">
                      <feature.icon className="h-10 w-10 text-blue-600 dark:text-blue-400 mb-3" />
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.description}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases - Compact */}
        <section className="py-12 px-4 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Industry Solutions</h2>
              <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">Trusted by leaders across sectors</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: "Capital Markets", href: "/capital-markets" },
                { title: "Family Offices", href: "/family-offices" },
                { title: "M&A / VC / PE", href: "/ma-vc-pe" },
                { title: "Actuarial Benefits", href: "/actuarial-benefits" }
              ].map((useCase, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link href={useCase.href}>
                    <div className="p-5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all hover:shadow-lg cursor-pointer">
                      <h3 className="text-lg font-semibold">{useCase.title}</h3>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose - Compact */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Why Kincaid IQ</h2>
              <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">Enterprise-grade platform built for mission-critical operations</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: Award,
                  title: "Verifiable Evidence",
                  description: "Blockchain-backed proof of outcomes with cryptographic signatures and immutable audit trails"
                },
                {
                  icon: Zap,
                  title: "Real-time Intelligence",
                  description: "Live event streaming, AI-powered ranking, and instant governance automation"
                },
                {
                  icon: Shield,
                  title: "Enterprise Security",
                  description: "SOC 2 compliant infrastructure with end-to-end encryption and role-based access control"
                },
                {
                  icon: Users,
                  title: "Seamless Integration",
                  description: "Native connectors for Snowflake, Databricks, ServiceNow, and leading enterprise platforms"
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700"
                >
                  <item.icon className="h-10 w-10 text-blue-600 dark:text-blue-400 mb-3" />
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats - Compact */}
        <section className="py-12 px-4 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {[
                { value: "99.9%", label: "Uptime SLA" },
                { value: "<100ms", label: "Event Latency" },
                { value: "10M+", label: "Events/Day" },
                { value: "Enterprise", label: "Grade Security" }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="text-4xl font-bold mb-1">{stat.value}</div>
                  <div className="text-blue-100">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Trusted By - Compact */}
        <section className="py-12 px-4 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-950/20">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">Trusted by Industry Leaders</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Leading enterprises using Kincaid IQ for mission-critical intelligence
              </p>
            </motion.div>
          </div>
        </section>

        {/* CTA - Compact */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Ready to Transform Your Operations?</h2>
              <p className="mt-3 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Join industry leaders using Kincaid IQ for real-time intelligence and verified outcomes
              </p>
              <div className="flex flex-wrap gap-3 justify-center pt-4">
                <Link href="/request-demo">
                  <Button size="lg" className="group">
                    Schedule Demo
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/platform">
                  <Button size="lg" variant="outline">
                    Explore Platform
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}