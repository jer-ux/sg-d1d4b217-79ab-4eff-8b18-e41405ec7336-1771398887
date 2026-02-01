import Head from "next/head";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, ShieldCheck, Database, Cpu, Users, BadgeCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Exec3DDemo = dynamic(() => import("@/components/siriusb/Exec3DDemo"), { ssr: false });

type Step = {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  bullets: string[];
  camera: { position: [number, number, number]; lookAt: [number, number, number] };
  accent: "governance" | "data" | "ai" | "people" | "value";
};

const fade: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.22, ease: "easeIn" } },
};

export default function ExecWalkthroughPage() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps: Step[] = useMemo(
    () => [
      {
        id: "data-certainty",
        title: "Data Certainty",
        subtitle: "Institutions buy certainty, not speed.",
        icon: <Database className="h-4 w-4" />,
        bullets: [
          "Provenance + lineage: every metric ties to a source.",
          "Quality gates: completeness, freshness, drift detection.",
          "Outputs that survive audit and diligence.",
        ],
        camera: { position: [3.2, 1.6, 5.4], lookAt: [0, 0.2, 0] },
        accent: "data",
      },
      {
        id: "governance",
        title: "Governance Engine",
        subtitle: "Control rights, evidence receipts, and truth at scale.",
        icon: <ShieldCheck className="h-4 w-4" />,
        bullets: [
          "Decision logs + policy constraints baked into workflows.",
          "Evidence receipts: VERIFIED / UNVERIFIED gates.",
          "Procurement-ready artifacts: faster approvals, lower friction.",
        ],
        camera: { position: [-4.6, 1.2, 3.4], lookAt: [0, 0.3, 0] },
        accent: "governance",
      },
      {
        id: "applied-ai",
        title: "Applied AI That Ships",
        subtitle: "Models don't matter if they don't change operations.",
        icon: <Cpu className="h-4 w-4" />,
        bullets: [
          "GenAI + ML embedded into business workflows.",
          "Human-in-the-loop controls where it matters.",
          "Monitoring: reliability, cost, and outcome instrumentation.",
        ],
        camera: { position: [5.2, 0.9, -2.8], lookAt: [0, 0.1, 0] },
        accent: "ai",
      },
      {
        id: "adoption",
        title: "Adoption by Design",
        subtitle: "Exec-ready clarity → analyst empowerment → operational change.",
        icon: <Users className="h-4 w-4" />,
        bullets: [
          "War Rooms: live incident dashboards for C-suite visibility.",
          "Self-service portals: analysts drill down without IT tickets.",
          "Observability: who used what, when, and why.",
        ],
        camera: { position: [-3.8, 2.2, 4.6], lookAt: [0, 0.4, 0] },
        accent: "people",
      },
      {
        id: "value-delivery",
        title: "Value Delivery",
        subtitle: "Track ROI from hypothesis to realized savings.",
        icon: <BadgeCheck className="h-4 w-4" />,
        bullets: [
          "Value Ledger: tie every dollar saved to a verified data event.",
          "Executive dashboards: real-time P&L impact.",
          "Investor-grade reporting: transparent metrics for boards and LPs.",
        ],
        camera: { position: [4.4, 1.8, -3.2], lookAt: [0, 0.2, 0] },
        accent: "value",
      },
    ],
    []
  );

  const currentStepData = steps[currentStep];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <>
      <Head>
        <title>Executive Walkthrough - SiriusB iQ AI Data Sciences Lab</title>
        <meta
          name="description"
          content="Discover how SiriusB iQ delivers data certainty, governance, applied AI, adoption, and measurable value for enterprise decision-making."
        />
      </Head>

      <main className="min-h-screen bg-background pt-16">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-background pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Enterprise AI That
                <span className="block mt-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Actually Ships Value
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Five pillars that turn data science into institutional-grade decision infrastructure.
              </p>
            </motion.div>

            {/* Interactive 3D + Content Grid */}
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* 3D Visualization */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="overflow-hidden border-2">
                  <CardContent className="p-0 aspect-square bg-black/5 dark:bg-black/20">
                    <Exec3DDemo
                      cameraPosition={currentStepData.camera.position}
                      cameraLookAt={currentStepData.camera.lookAt}
                      accent={currentStepData.accent}
                    />
                  </CardContent>
                </Card>
              </motion.div>

              {/* Step Content */}
              <div className="space-y-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStepData.id}
                    variants={fade}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                  >
                    <Card className="border-2">
                      <CardContent className="p-8">
                        {/* Step Header */}
                        <div className="flex items-start gap-4 mb-6">
                          <div className="p-3 rounded-lg bg-primary/10 text-primary">
                            {currentStepData.icon}
                          </div>
                          <div className="flex-1">
                            <h2 className="text-2xl md:text-3xl font-bold mb-2">
                              {currentStepData.title}
                            </h2>
                            <p className="text-muted-foreground text-lg">
                              {currentStepData.subtitle}
                            </p>
                          </div>
                        </div>

                        {/* Bullets */}
                        <ul className="space-y-4">
                          {currentStepData.bullets.map((bullet, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: 0.1 + idx * 0.1 }}
                              className="flex items-start gap-3 text-foreground"
                            >
                              <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <span>{bullet}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Controls */}
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className="gap-2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>

                  {/* Step Indicators */}
                  <div className="flex gap-2">
                    {steps.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentStep(idx)}
                        className={`h-2 rounded-full transition-all ${
                          idx === currentStep
                            ? "w-8 bg-primary"
                            : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                        }`}
                        aria-label={`Go to step ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="lg"
                    onClick={nextStep}
                    disabled={currentStep === steps.length - 1}
                    className="gap-2"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Build Institutional-Grade AI?
              </h2>
              <p className="text-lg mb-8 text-white/90">
                See how SiriusB iQ transforms data science into decision infrastructure.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" variant="secondary" className="gap-2">
                    Schedule a Demo
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/platform">
                  <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                    Explore Platform
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}