import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { SEO } from "@/components/SEO";
import { Hero3D } from "@/components/Hero3D";
import { TechBackdrop } from "@/components/TechBackdrop";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Zap, Shield, Eye, TrendingUp, Database, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const opacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(smoothProgress, [0, 0.2], [1, 0.95]);
  const y = useTransform(smoothProgress, [0, 0.2], [0, -50]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <SEO
        title="SiriusB iQ - AI Data Sciences Lab"
        description="Next-generation AI-powered data intelligence platform for enterprises"
        image="/og-image.png"
      />

      <div ref={containerRef} className="relative bg-black">
        {/* Hero Section - Apple-style full viewport */}
        <section className="relative h-[100vh] flex items-center justify-center overflow-hidden">
          <TechBackdrop />
          
          <motion.div
            style={{ opacity, scale, y }}
            className="relative z-10 text-center px-6 max-w-5xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="text-[56px] md:text-[80px] lg:text-[96px] font-semibold tracking-tight text-white leading-[1.05] mb-6">
                Intelligence at scale.
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
                  Verified in real-time.
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-xl md:text-2xl text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed"
            >
              SiriusB iQ transforms enterprise data into actionable intelligence with AI-powered verification, 
              real-time monitoring, and cryptographic proof.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link href="/request-demo">
                <Button 
                  size="lg" 
                  className="h-14 px-8 text-lg bg-white text-black hover:bg-gray-100 rounded-full transition-all duration-300 hover:scale-105"
                >
                  Request Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/platform">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="h-14 px-8 text-lg border-2 border-white/20 text-white hover:bg-white/10 rounded-full transition-all duration-300 hover:scale-105"
                >
                  Explore Platform
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isLoaded ? 1 : 0 }}
              transition={{ duration: 1.2, delay: 0.8 }}
              className="mt-16"
            >
              <div className="inline-flex items-center gap-3 text-sm text-gray-500">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Trusted by Fortune 500 enterprises
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* 3D Hero Showcase - Apple-style product display */}
        <section className="relative min-h-screen flex items-center justify-center py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black" />
          
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.5 }}
            >
              <div className="h-[600px] relative">
                <Hero3D />
              </div>
              
              <div className="text-center mt-12">
                <h2 className="text-4xl md:text-5xl font-semibold text-white mb-4">
                  Global intelligence network
                </h2>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                  Monitor, verify, and act on data across your entire enterprise ecosystem
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Grid - Apple-style cards */}
        <section className="relative py-32 bg-gradient-to-b from-black to-gray-950">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl md:text-6xl font-semibold text-white mb-6">
                Built for enterprise scale
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Everything you need to transform data chaos into verified intelligence
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard
                icon={<Zap className="h-8 w-8" />}
                title="Real-time Monitoring"
                description="Track every data event across your enterprise with millisecond precision"
                delay={0}
              />
              <FeatureCard
                icon={<Shield className="h-8 w-8" />}
                title="Cryptographic Proof"
                description="Every action timestamped and cryptographically signed for audit trails"
                delay={0.1}
              />
              <FeatureCard
                icon={<Eye className="h-8 w-8" />}
                title="War Room Intelligence"
                description="Command center for incident response with AI-powered triage"
                delay={0.2}
              />
              <FeatureCard
                icon={<TrendingUp className="h-8 w-8" />}
                title="Arbitrage Detection"
                description="Identify cross-system discrepancies and financial anomalies instantly"
                delay={0.3}
              />
              <FeatureCard
                icon={<Database className="h-8 w-8" />}
                title="Evidence Receipts"
                description="Immutable proof of every transaction, approval, and data movement"
                delay={0.4}
              />
              <FeatureCard
                icon={<Sparkles className="h-8 w-8" />}
                title="AI-Powered Insights"
                description="Machine learning models that learn your business and predict issues"
                delay={0.5}
              />
            </div>
          </div>
        </section>

        {/* Stats Section - Apple-style metrics */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-black to-gray-950" />
          
          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-12"
            >
              <StatCard number="99.9%" label="Uptime SLA" />
              <StatCard number="<100ms" label="Response Time" />
              <StatCard number="10B+" label="Events Processed" />
              <StatCard number="256-bit" label="Encryption" />
            </motion.div>
          </div>
        </section>

        {/* CTA Section - Apple-style finale */}
        <section className="relative py-40 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_50%)]" />
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 text-center px-6 max-w-4xl mx-auto"
          >
            <h2 className="text-5xl md:text-7xl font-semibold text-white mb-8 leading-tight">
              Ready to transform
              <br />
              your data operations?
            </h2>
            <p className="text-2xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Join leading enterprises using SiriusB iQ for mission-critical intelligence
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/request-demo">
                <Button 
                  size="lg"
                  className="h-16 px-10 text-xl bg-white text-black hover:bg-gray-100 rounded-full transition-all duration-300 hover:scale-105"
                >
                  Get Started
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button 
                  size="lg"
                  variant="ghost"
                  className="h-16 px-10 text-xl text-white hover:bg-white/10 rounded-full transition-all duration-300"
                >
                  Talk to Sales
                </Button>
              </Link>
            </div>

            <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>SOC 2 Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>GDPR Ready</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Enterprise Support</span>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
}

function FeatureCard({ 
  icon, 
  title, 
  description, 
  delay 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.02 }}
      className="group relative p-8 rounded-3xl bg-gradient-to-b from-gray-900/50 to-gray-950/50 border border-gray-800/50 backdrop-blur-xl hover:border-gray-700/50 transition-all duration-500"
    >
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative">
        <div className="mb-6 text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
          {icon}
        </div>
        <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-blue-50 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-400 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-5xl md:text-6xl font-semibold text-white mb-3 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
        {number}
      </div>
      <div className="text-lg text-gray-400">
        {label}
      </div>
    </div>
  );
}