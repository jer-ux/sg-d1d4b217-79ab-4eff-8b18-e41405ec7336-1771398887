import { Suspense } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { Play, TrendingUp, Target, Zap } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import dynamic from "next/dynamic";

// Dynamic imports for 3D components
const Hero3DInvestor = dynamic(() => import("@/components/investor/Hero3DInvestor"), { ssr: false });
const MetricsCloud3D = dynamic(() => import("@/components/investor/MetricsCloud3D"), { ssr: false });
const Timeline3D = dynamic(() => import("@/components/investor/Timeline3D"), { ssr: false });
const ROIVisualization3D = dynamic(() => import("@/components/investor/ROIVisualization3D"), { ssr: false });

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 1 }
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }
};

const slideInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }
};

const slideInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }
};

export default function InvestorPage() {
  return (
    <>
      <Head>
        <title>Investor Deck | SiriusB iQ</title>
        <meta name="description" content="SiriusB iQ investor presentation - Algorithmic Fiduciary Intelligence Platform" />
      </Head>

      <div className="min-h-screen bg-black text-white">
        <Nav />

        {/* 3D Hero Section */}
        <motion.div 
          className="pt-20"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <Suspense fallback={
            <div className="w-full h-[600px] flex items-center justify-center">
              <div className="text-blue-400">Loading 3D visualization...</div>
            </div>
          }>
            <Hero3DInvestor />
          </Suspense>
        </motion.div>

        {/* Key Metrics Section with 3D */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-blue-100 mb-4">
                Market Opportunity
              </h2>
              <p className="text-xl text-gray-400">
                Massive, underserved market with clear path to value
              </p>
            </motion.div>

            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={scaleIn}
            >
              <Suspense fallback={<div className="w-full h-[500px] bg-zinc-900/50 rounded-2xl animate-pulse" />}>
                <MetricsCloud3D />
              </Suspense>
            </motion.div>

            {/* Stats Grid */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              {[
                { icon: TrendingUp, label: "Market Growth", value: "23% CAGR", color: "from-blue-600 to-blue-500" },
                { icon: Target, label: "Addressable Market", value: "$120B TAM", color: "from-blue-500 to-blue-400" },
                { icon: Zap, label: "Time to Value", value: "< 90 Days", color: "from-blue-600 to-blue-500" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="relative group"
                >
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-zinc-900 to-black border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} mb-4`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-blue-100 mb-2">{stat.value}</h3>
                    <p className="text-gray-400">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ROI Visualization Section */}
        <section className="py-16 px-6 bg-gradient-to-b from-black to-zinc-950">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={slideInLeft}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-blue-100 mb-4">
                Return on Investment
              </h2>
              <p className="text-xl text-gray-400">
                Exponential value creation over 5 years
              </p>
            </motion.div>

            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={scaleIn}
            >
              <Suspense fallback={<div className="w-full h-[500px] bg-zinc-900/50 rounded-2xl animate-pulse" />}>
                <ROIVisualization3D />
              </Suspense>
            </motion.div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={slideInRight}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-blue-100 mb-4">
                Execution Roadmap
              </h2>
              <p className="text-xl text-gray-400">
                Clear milestones to market leadership
              </p>
            </motion.div>

            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={scaleIn}
            >
              <Suspense fallback={<div className="w-full h-[400px] bg-zinc-900/50 rounded-2xl animate-pulse" />}>
                <Timeline3D />
              </Suspense>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-6 bg-gradient-to-b from-zinc-950 to-black">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="text-center"
            >
              <motion.div 
                className="inline-flex flex-col items-center gap-6 p-12 rounded-2xl bg-gradient-to-br from-blue-950/20 to-transparent border border-blue-500/20"
                whileHover={{ scale: 1.02, borderColor: "rgba(59, 130, 246, 0.4)" }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-3xl font-bold text-blue-100">
                  Ready to Learn More?
                </h3>
                <p className="text-gray-400 max-w-2xl text-lg">
                  Join us in revolutionizing enterprise benefits intelligence. Schedule a deep-dive session with our team.
                </p>
                <Link
                  href="/request-demo"
                  className="inline-flex items-center gap-3 px-10 py-5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white text-lg font-semibold hover:from-blue-500 hover:to-blue-400 transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-105"
                >
                  <Play className="h-6 w-6" />
                  <span>Request Investor Meeting</span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}