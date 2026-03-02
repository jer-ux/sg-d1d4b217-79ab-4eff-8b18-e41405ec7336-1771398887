import { useState, Suspense } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, TrendingUp, Target, Zap } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import dynamic from "next/dynamic";

// Dynamic imports for 3D components
const Hero3DInvestor = dynamic(() => import("@/components/investor/Hero3DInvestor"), { ssr: false });
const Slide3D = dynamic(() => import("@/components/investor/Slide3D"), { ssr: false });
const MetricsCloud3D = dynamic(() => import("@/components/investor/MetricsCloud3D"), { ssr: false });
const Timeline3D = dynamic(() => import("@/components/investor/Timeline3D"), { ssr: false });
const ROIVisualization3D = dynamic(() => import("@/components/investor/ROIVisualization3D"), { ssr: false });

interface Slide {
  id: string;
  image: string;
  title: string;
  description: string;
}

export default function InvestorPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const slides: Slide[] = [
    {
      id: "title",
      image: "/slide01_title.png",
      title: "SiriusB iQ - Algorithmic Fiduciary Intelligence Platform",
      description: "Transforming enterprise benefits into verifiable alpha"
    },
    {
      id: "problem",
      image: "/slide02_problem.png",
      title: "The Problem",
      description: "Enterprise benefits opacity creates $850B in annual waste"
    },
    {
      id: "thesis",
      image: "/slide03_thesis.png",
      title: "Investment Thesis",
      description: "AI-native infrastructure for benefits intelligence"
    },
    {
      id: "architecture",
      image: "/slide04_architecture.png",
      title: "Technical Architecture",
      description: "Algorithmic fiduciary system with real-time evidence"
    },
    {
      id: "moat",
      image: "/slide05_moat.png",
      title: "Competitive Moat",
      description: "Proprietary evidence network with compounding data effects"
    },
    {
      id: "warroom",
      image: "/slide06_warroom.png",
      title: "War Room Intelligence",
      description: "Real-time anomaly detection and intervention orchestration"
    },
    {
      id: "ledger",
      image: "/slide07_ledger.png",
      title: "Verified Savings Ledger",
      description: "Blockchain-grade proof of economic impact"
    },
    {
      id: "trust",
      image: "/slide08_trust.png",
      title: "Trust Architecture",
      description: "Cryptographic evidence chain with regulatory compliance"
    },
    {
      id: "platform",
      image: "/slide09_platform.png",
      title: "Platform Economics",
      description: "Network effects driving 10x margin expansion"
    },
    {
      id: "cta",
      image: "/slide10_cta.png",
      title: "Investment Opportunity",
      description: "Join us in redefining enterprise benefits intelligence"
    },
    {
      id: "whynow",
      image: "/slide_whynow.png",
      title: "Why Now",
      description: "AI maturity meets regulatory demand for transparency"
    },
    {
      id: "dataquality",
      image: "/slide_dataquality.png",
      title: "Data Quality Advantage",
      description: "99.7% accuracy through multi-source validation"
    },
    {
      id: "roi",
      image: "/slide_roi.png",
      title: "ROI Framework",
      description: "Measurable value creation across enterprise stakeholders"
    },
    {
      id: "timeline",
      image: "/slide_timeline.png",
      title: "Go-to-Market Timeline",
      description: "18-month path to market leadership"
    },
    {
      id: "partnership",
      image: "/slide_partnership.png",
      title: "Strategic Partnerships",
      description: "Building the future with industry leaders"
    }
  ];

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  return (
    <>
      <Head>
        <title>Investor Deck | SiriusB iQ</title>
        <meta name="description" content="SiriusB iQ investor presentation - Algorithmic Fiduciary Intelligence Platform" />
      </Head>

      <div className="min-h-screen bg-black text-white">
        <Nav />

        {/* 3D Hero Section */}
        <div className="pt-20">
          <Suspense fallback={
            <div className="w-full h-[600px] flex items-center justify-center">
              <div className="text-amber-400">Loading 3D visualization...</div>
            </div>
          }>
            <Hero3DInvestor />
          </Suspense>
        </div>

        {/* Key Metrics Section with 3D */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-blue-100 mb-4">
                Market Opportunity
              </h2>
              <p className="text-xl text-gray-400">
                Massive, underserved market with clear path to value
              </p>
            </motion.div>

            <Suspense fallback={<div className="w-full h-[500px] bg-zinc-900/50 rounded-2xl animate-pulse" />}>
              <MetricsCloud3D />
            </Suspense>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {[
                { icon: TrendingUp, label: "Market Growth", value: "23% CAGR", color: "from-blue-600 to-blue-500" },
                { icon: Target, label: "Addressable Market", value: "$120B TAM", color: "from-blue-500 to-blue-400" },
                { icon: Zap, label: "Time to Value", value: "< 90 Days", color: "from-blue-600 to-blue-500" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true }}
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
            </div>
          </div>
        </section>

        {/* Main Presentation Area */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-blue-100 mb-8 text-center"
            >
              Investment Deck
            </motion.h2>

            {/* Slide Container with 3D Effects */}
            <div className="relative aspect-[16/9]">
              <AnimatePresence mode="wait">
                <Suspense
                  key={currentSlide}
                  fallback={
                    <div className="absolute inset-0 bg-zinc-900/50 rounded-2xl animate-pulse" />
                  }
                >
                  <Slide3D
                    image={slides[currentSlide].image}
                    title={slides[currentSlide].title}
                    description={slides[currentSlide].description}
                    isActive={true}
                  />
                </Suspense>
              </AnimatePresence>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-blue-500/20 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 group z-10"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-6 w-6 text-blue-400 group-hover:text-blue-300" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-blue-500/20 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 group z-10"
                aria-label="Next slide"
              >
                <ChevronRight className="h-6 w-6 text-blue-400 group-hover:text-blue-300" />
              </button>
            </div>

            {/* Slide Counter */}
            <div className="mt-6 text-center">
              <span className="text-gray-400">
                Slide {currentSlide + 1} of {slides.length}
              </span>
            </div>

            {/* Thumbnail Navigation */}
            <div className="mt-8 grid grid-cols-5 md:grid-cols-10 lg:grid-cols-15 gap-3">
              {slides.map((slide, index) => (
                <motion.button
                  key={slide.id}
                  onClick={() => goToSlide(index)}
                  className={`relative aspect-[16/9] rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    currentSlide === index
                      ? "border-blue-400 shadow-lg shadow-blue-500/30"
                      : "border-blue-500/20 hover:border-blue-500/40 opacity-60 hover:opacity-100"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <img
                    src={slide.image}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {currentSlide === index && (
                    <div className="absolute inset-0 bg-blue-500/10" />
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* ROI Visualization Section */}
        <section className="py-16 px-6 bg-gradient-to-b from-black to-zinc-950">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-blue-100 mb-4">
                Return on Investment
              </h2>
              <p className="text-xl text-gray-400">
                Exponential value creation over 5 years
              </p>
            </motion.div>

            <Suspense fallback={<div className="w-full h-[500px] bg-zinc-900/50 rounded-2xl animate-pulse" />}>
              <ROIVisualization3D />
            </Suspense>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-blue-100 mb-4">
                Execution Roadmap
              </h2>
              <p className="text-xl text-gray-400">
                Clear milestones to market leadership
              </p>
            </motion.div>

            <Suspense fallback={<div className="w-full h-[400px] bg-zinc-900/50 rounded-2xl animate-pulse" />}>
              <Timeline3D />
            </Suspense>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-6 bg-gradient-to-b from-zinc-950 to-black">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="inline-flex flex-col items-center gap-6 p-12 rounded-2xl bg-gradient-to-br from-blue-950/20 to-transparent border border-blue-500/20">
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
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}