import { useState } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";

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
      image: "/e36f3ab62edc9c2fba9186685bb06e694fd8e78149112009407488c8477129df.png",
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

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <>
      <Head>
        <title>Investor Deck | SiriusB iQ</title>
        <meta name="description" content="SiriusB iQ investor presentation - Algorithmic Fiduciary Intelligence Platform" />
      </Head>

      <div className="min-h-screen bg-black text-white">
        <Nav />

        {/* Main Presentation Area */}
        <div className="pt-20 pb-12">
          <div className="max-w-7xl mx-auto px-6">
            {/* Slide Container */}
            <div className="relative aspect-[16/9] bg-gradient-to-br from-zinc-900 to-black rounded-2xl overflow-hidden border border-amber-500/20 shadow-2xl shadow-amber-500/10">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentSlide}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="relative w-full h-full">
                    {/* Slide Image */}
                    <div className="absolute inset-0">
                      <img
                        src={slides[currentSlide].image}
                        alt={slides[currentSlide].title}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Slide Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-8">
                      <h2 className="text-3xl font-bold text-amber-100 mb-2">
                        {slides[currentSlide].title}
                      </h2>
                      <p className="text-gray-300">
                        {slides[currentSlide].description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-amber-500/20 border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300 group"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-6 w-6 text-amber-400 group-hover:text-amber-300" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-amber-500/20 border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300 group"
                aria-label="Next slide"
              >
                <ChevronRight className="h-6 w-6 text-amber-400 group-hover:text-amber-300" />
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
                <button
                  key={slide.id}
                  onClick={() => goToSlide(index)}
                  className={`relative aspect-[16/9] rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    currentSlide === index
                      ? "border-amber-400 shadow-lg shadow-amber-500/30"
                      : "border-amber-500/20 hover:border-amber-500/40 opacity-60 hover:opacity-100"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <img
                    src={slide.image}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {currentSlide === index && (
                    <div className="absolute inset-0 bg-amber-500/10" />
                  )}
                </button>
              ))}
            </div>

            {/* CTA Section */}
            <div className="mt-12 text-center">
              <div className="inline-flex flex-col items-center gap-4 p-8 rounded-2xl bg-gradient-to-br from-amber-950/20 to-transparent border border-amber-500/20">
                <h3 className="text-2xl font-bold text-amber-100">
                  Ready to Learn More?
                </h3>
                <p className="text-gray-400 max-w-2xl">
                  Join us in revolutionizing enterprise benefits intelligence. Schedule a deep-dive session with our team.
                </p>
                <Link
                  href="/request-demo"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 text-white font-semibold hover:from-amber-500 hover:to-amber-400 transition-all duration-300 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 hover:scale-105"
                >
                  <Play className="h-5 w-5" />
                  <span>Request Investor Meeting</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}