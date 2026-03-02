import { Suspense } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { Play, Target, Clock, CheckCircle2, Shield, TrendingUp, Award, Zap } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import dynamic from "next/dynamic";

// Lazy load 3D components with loading fallbacks
// logic: dynamic() handles the code bundle loading
// logic: Suspense in JSX handles the 3D asset/model loading
const Hero3DInvestor = dynamic(() => import("@/components/investor/Hero3DInvestor"), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] flex items-center justify-center bg-gradient-to-b from-black to-zinc-950">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-blue-400 text-sm">Loading 3D Experience...</p>
      </div>
    </div>
  )
});

const MetricsCloud3D = dynamic(() => import("@/components/investor/MetricsCloud3D"), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] bg-zinc-900/50 rounded-2xl flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-cyan-400 text-sm">Loading Metrics Cloud...</p>
      </div>
    </div>
  )
});

const Timeline3D = dynamic(() => import("@/components/investor/Timeline3D"), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] bg-zinc-900/50 rounded-2xl flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-violet-400 text-sm">Loading Timeline...</p>
      </div>
    </div>
  )
});

const ROIVisualization3D = dynamic(() => import("@/components/investor/ROIVisualization3D"), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] bg-zinc-900/50 rounded-2xl flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-emerald-400 text-sm">Loading ROI Visualization...</p>
      </div>
    </div>
  )
});

// Animation variants with standard easing to prevent TS errors
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: "easeOut" as const }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.7, ease: "easeOut" as const }
};

const slideInLeft = {
  initial: { opacity: 0, x: -60 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: "easeOut" as const }
};

const slideInRight = {
  initial: { opacity: 0, x: 60 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: "easeOut" as const }
};

const staggerContainer = {
  initial: {},
  whileInView: {},
  viewport: { once: true, margin: "-100px" },
  transition: { staggerChildren: 0.15 }
};

export default function CapitalMarketsPage() {
  return (
    <>
      <Head>
        <title>Capital Markets & Investors | SiriusB iQ</title>
        <meta name="description" content="Reduce uncertainty. Underwrite value with evidence receipts, controlled ledgers, and repeatable realization discipline." />
      </Head>

      <div className="min-h-screen bg-black text-white">
        <Nav />

        {/* Hero Section with 3D Background */}
        <div className="pt-20">
          <Suspense fallback={
            <div className="w-full h-[600px] flex items-center justify-center bg-gradient-to-b from-black to-zinc-950">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-blue-400 text-sm">Loading 3D Experience...</p>
              </div>
            </div>
          }>
            <Hero3DInvestor />
          </Suspense>
        </div>

        {/* Market Opportunity Section */}
        <section className="py-20 px-6 bg-gradient-to-b from-black to-zinc-950">
          <div className="max-w-7xl mx-auto">
            <motion.div {...slideInLeft} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-blue-100 mb-6">
                The Capital Markets Opportunity
              </h2>
              <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
                $4.2T in dry powder seeks repeatable value creation discipline. 
                Traditional diligence can't keep pace with deal flow complexity.
              </p>
            </motion.div>

            <motion.div {...scaleIn} className="mb-16">
              <Suspense fallback={
                <div className="w-full h-[400px] bg-zinc-900/50 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                    <p className="text-cyan-400 text-sm">Loading Metrics Cloud...</p>
                  </div>
                </div>
              }>
                <MetricsCloud3D />
              </Suspense>
            </motion.div>

            <motion.div {...staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Clock,
                  title: "60% Faster Diligence",
                  description: "Evidence packs reduce time-to-truth by eliminating debate and accelerating deal cycles",
                  color: "from-cyan-600 to-cyan-500"
                },
                {
                  icon: Target,
                  title: "$24M Avg Leakage Found",
                  description: "Pre-built reconciliation artifacts surface hidden value erosion before you close",
                  color: "from-violet-600 to-violet-500"
                },
                {
                  icon: CheckCircle2,
                  title: "87% Realization Rate",
                  description: "Owner-driven workflows and approval gates ensure post-close value capture",
                  color: "from-emerald-600 to-emerald-500"
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  {...fadeInUp}
                  className="p-8 rounded-2xl bg-gradient-to-br from-zinc-900 to-black border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300"
                >
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${item.color} mb-6`}>
                    <item.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-blue-100 mb-4">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Value Creation Section */}
        <section className="py-20 px-6 bg-gradient-to-b from-zinc-950 to-black">
          <div className="max-w-7xl mx-auto">
            <motion.div {...slideInRight} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-blue-100 mb-6">
                Exponential Value Creation
              </h2>
              <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
                SiriusB iQ compounds returns through evidence-backed diligence, 
                controlled value realization, and portfolio-wide governance discipline.
              </p>
            </motion.div>

            <motion.div {...scaleIn} className="mb-16">
              <Suspense fallback={
                <div className="w-full h-[400px] bg-zinc-900/50 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                    <p className="text-emerald-400 text-sm">Loading ROI Visualization...</p>
                  </div>
                </div>
              }>
                <ROIVisualization3D />
              </Suspense>
            </motion.div>

            <motion.div {...staggerContainer} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                {...fadeInUp}
                className="p-8 rounded-2xl bg-gradient-to-br from-rose-950/20 to-transparent border border-rose-500/30"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-rose-500/20 flex items-center justify-center text-3xl">
                    ❌
                  </div>
                  <h3 className="text-2xl font-semibold text-rose-300">Traditional Approach</h3>
                </div>
                <div className="space-y-4 text-gray-400">
                  <p className="leading-relaxed">
                    PE firm acquires SaaS company with "$8M in cost synergies" promised during diligence.
                  </p>
                  <p className="leading-relaxed">
                    18 months later, CFO can't prove any realization. Value evaporated during integration chaos.
                  </p>
                  <p className="leading-relaxed">
                    Exit valuation drops $40M. LP confidence shattered. Fund returns impacted.
                  </p>
                </div>
              </motion.div>

              <motion.div
                {...fadeInUp}
                className="p-8 rounded-2xl bg-gradient-to-br from-emerald-950/20 to-transparent border border-emerald-500/30"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-emerald-500/20 flex items-center justify-center text-3xl">
                    ✓
                  </div>
                  <h3 className="text-2xl font-semibold text-emerald-300">With SiriusB iQ</h3>
                </div>
                <div className="space-y-4 text-gray-400">
                  <p className="leading-relaxed">
                    Same scenario, but SiriusB iQ Value Office deployed on Day 1 post-close.
                  </p>
                  <p className="leading-relaxed">
                    Every synergy has an owner, evidence receipt, and weekly reconciliation workflow.
                  </p>
                  <p className="leading-relaxed">
                    $5.2M realized and proven. $1.8M at-risk flagged early with recovery plans. Exit closes at premium with buyer adopting the framework.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Engagement Models Section */}
        <section className="py-20 px-6 bg-gradient-to-b from-black to-zinc-950">
          <div className="max-w-7xl mx-auto">
            <motion.div {...slideInLeft} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-blue-100 mb-6">
                Engagement Models
              </h2>
              <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
                Flexible frameworks that scale from diligence sprints to portfolio-wide governance
              </p>
            </motion.div>

            <motion.div {...scaleIn} className="mb-16">
              <Suspense fallback={
                <div className="w-full h-[400px] bg-zinc-900/50 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                    <p className="text-violet-400 text-sm">Loading Timeline...</p>
                  </div>
                </div>
              }>
                <Timeline3D />
              </Suspense>
            </motion.div>

            <motion.div {...staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  phase: "Diligence Sprint",
                  duration: "2-4 weeks",
                  description: "Build evidence packs, validate claims, and surface leakage before you close the deal",
                  deliverables: [
                    "Evidence pack library",
                    "Data lineage maps",
                    "Exception queues",
                    "Risk heat maps"
                  ],
                  color: "cyan"
                },
                {
                  phase: "Post-Close Value Office",
                  duration: "90-180 days",
                  description: "Integration support with owner assignment, reconciliation workflows, and realization tracking",
                  deliverables: [
                    "Value office setup",
                    "Owner assignments",
                    "Weekly reconciliation",
                    "At-risk monitoring"
                  ],
                  color: "violet"
                },
                {
                  phase: "Portfolio Governance",
                  duration: "Ongoing",
                  description: "Controls monitoring, quarterly evidence reviews, and audit-ready reporting across holdings",
                  deliverables: [
                    "Portfolio dashboard",
                    "Quarterly reviews",
                    "Board-ready reports",
                    "Exit preparation"
                  ],
                  color: "emerald"
                }
              ].map((engagement, i) => (
                <motion.div
                  key={i}
                  {...fadeInUp}
                  className="p-8 rounded-2xl bg-gradient-to-br from-zinc-900 to-black border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300"
                >
                  <div className={`inline-block px-4 py-2 rounded-xl bg-${engagement.color}-500/20 text-${engagement.color}-400 text-sm font-semibold mb-4`}>
                    {engagement.duration}
                  </div>
                  <h3 className="text-2xl font-bold text-blue-100 mb-3">{engagement.phase}</h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">{engagement.description}</p>
                  <div className="space-y-2">
                    {engagement.deliverables.map((item, j) => (
                      <div key={j} className="flex items-center gap-2 text-sm text-gray-500">
                        <CheckCircle2 className={`h-4 w-4 text-${engagement.color}-400`} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 px-6 bg-gradient-to-b from-zinc-950 to-black">
          <div className="max-w-7xl mx-auto">
            <motion.div {...slideInRight} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-blue-100 mb-6">
                Why Capital Markets Choose SiriusB iQ
              </h2>
              <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
                Evidence-backed discipline that transforms how you underwrite, realize, and govern value
              </p>
            </motion.div>

            <motion.div {...staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: TrendingUp,
                  title: "Higher Returns",
                  description: "3.2x average realization vs. traditional methods",
                  color: "from-blue-600 to-blue-500"
                },
                {
                  icon: Shield,
                  title: "Lower Risk",
                  description: "Evidence-backed claims reduce post-close surprises",
                  color: "from-violet-600 to-violet-500"
                },
                {
                  icon: Zap,
                  title: "Faster Cycles",
                  description: "60% reduction in diligence time-to-close",
                  color: "from-cyan-600 to-cyan-500"
                },
                {
                  icon: Award,
                  title: "LP Confidence",
                  description: "Audit-ready governance framework from Day 1",
                  color: "from-emerald-600 to-emerald-500"
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  {...fadeInUp}
                  className="p-6 rounded-2xl bg-gradient-to-br from-zinc-900 to-black border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 text-center"
                >
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${item.color} mb-4`}>
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-blue-100 mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 bg-gradient-to-b from-black to-zinc-950">
          <div className="max-w-4xl mx-auto">
            <motion.div {...fadeInUp} className="text-center">
              <div className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-blue-950/20 to-transparent border border-blue-500/20">
                <h3 className="text-3xl md:text-4xl font-bold text-blue-100 mb-4">
                  Ready to De-Risk Your Next Deal?
                </h3>
                <p className="text-gray-400 text-lg md:text-xl mb-6 max-w-2xl mx-auto">
                  Get access to our investor evidence pack template, diligence playbook, 
                  and post-close value office framework.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/request-demo"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white text-lg font-semibold hover:from-blue-500 hover:to-blue-400 transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-105"
                  >
                    <Play className="h-5 w-5" />
                    <span>Request Investor Meeting</span>
                  </Link>
                  <Link
                    href="/case-studies"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl border border-blue-500/30 bg-blue-500/5 hover:bg-blue-500/10 text-blue-100 text-lg font-semibold transition-all duration-300 hover:scale-105"
                  >
                    <Shield className="h-5 w-5" />
                    <span>View Case Studies</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}