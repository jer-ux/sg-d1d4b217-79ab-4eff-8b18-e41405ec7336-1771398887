import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Activity, 
  AlertTriangle, 
  ArrowRight, 
  BarChart3, 
  CheckCircle2, 
  ChevronRight, 
  Database, 
  Download, 
  DollarSign,
  FileText, 
  Filter, 
  Info, 
  Pill,
  Search, 
  Shield,
  ShieldAlert, 
  TrendingDown, 
  TrendingUp, 
  Zap 
} from "lucide-react";
import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CalendlyPopupButton } from "@/components/calendly/CalendlyPopupButton";

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const benchmarkStats = [
  { label: "Average Spread Detected", value: "36%", icon: TrendingUp, color: "red" },
  { label: "Claims Analyzed Monthly", value: "1.2M+", icon: Activity, color: "emerald" },
  { label: "Potential Recovery", value: "$5.1M", icon: DollarSign, color: "amber" },
  { label: "Detection Accuracy", value: "99.7%", icon: Shield, color: "blue" }
];

const keyCapabilities = [
  {
    icon: Database,
    title: "Real-Time NADAC Reconciliation",
    description: "Continuous comparison of every pharmacy claim against federally-published National Average Drug Acquisition Cost benchmarks. Instant detection of MAC list manipulation and spread pricing schemes."
  },
  {
    icon: ShieldAlert,
    title: "Anomaly Detection Engine",
    description: "Machine learning algorithms identify pricing patterns that deviate from NADAC by 50%+. Flags generic drug overcharges, PBM-owned pharmacy steering, and specialty drug margin inflation."
  },
  {
    icon: BarChart3,
    title: "Spread Distribution Analytics",
    description: "Visual breakdown showing where PBM margin is hidden — maintenance generics, mail-order steering, specialty tier manipulation. Quantifies the true cost of spread pricing across your formulary."
  },
  {
    icon: FileText,
    title: "Automated Audit Package Generation",
    description: "One-click creation of legally-binding audit request letters citing specific contract violations. Includes NDC-level evidence, variance calculations, and CAA 2026 §3101 compliance language."
  }
];

const pricingTiers = [
  {
    name: "One-Time Analysis",
    price: "$2,995",
    description: "Single-period NADAC benchmarking report",
    features: [
      "12-month claims analysis",
      "NADAC variance detection",
      "Top 50 anomaly report",
      "Spread quantification",
      "Executive summary PDF",
      "Basic audit letter template"
    ],
    cta: "Purchase Report",
    highlight: false
  },
  {
    name: "Annual Intelligence",
    price: "$9,995",
    period: "/year",
    description: "Quarterly NADAC monitoring + audit automation",
    features: [
      "Quarterly claims benchmarking",
      "Real-time anomaly alerts",
      "Unlimited audit packages",
      "Trend analysis & forecasting",
      "PBM contract scoring",
      "Expert consultation (4 hrs/qtr)",
      "Custom reporting dashboard"
    ],
    cta: "Start Annual Plan",
    highlight: true
  },
  {
    name: "Enterprise Platform",
    price: "Custom",
    description: "Multi-entity monitoring + API access",
    features: [
      "Unlimited entities & claims",
      "Live NADAC feed integration",
      "API access for ERP systems",
      "White-label reporting",
      "Dedicated account manager",
      "Legal support for audits",
      "Priority expert consultation"
    ],
    cta: "Contact Sales",
    highlight: false
  }
];

const sampleAnomalies = [
  { drug: "Atorvastatin 40mg", ndc: "00093-3147-01", nadac: "$3.15", billed: "$45.20", spread: "$42.05", variance: "1,335%" },
  { drug: "Lisinopril 20mg", ndc: "00093-7152-56", nadac: "$1.50", billed: "$22.00", spread: "$20.50", variance: "1,366%" },
  { drug: "Rosuvastatin 20mg", ndc: "68180-0720-01", nadac: "$2.80", billed: "$38.50", spread: "$35.70", variance: "1,275%" },
];

export default function NADACBenchmarkingPage() {
  const [selectedTier, setSelectedTier] = useState(1);

  return (
    <>
      <SEO 
        title="NADAC Benchmarking Intelligence | Pharmacy Spread Pricing Detection"
        description="Fiduciary-grade claims benchmarking against National Average Drug Acquisition Cost. Detect PBM spread pricing, MAC list manipulation, and pharmacy steering in real-time."
      />

      <Nav />

      <div className="min-h-screen bg-[#0A0F1E] text-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-white/5 bg-gradient-to-b from-[#0A0F1E] via-[#0d1424] to-[#0A0F1E]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.05),transparent_50%)]" />
          
          <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="mx-auto max-w-4xl text-center"
            >
              <motion.div variants={fadeInUpVariants} className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-400">
                <Pill className="h-4 w-4" />
                NADAC Benchmarking Intelligence
              </motion.div>

              <motion.h1 variants={fadeInUpVariants} className="mb-6 text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
                Your PBM Is Hiding{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-red-600">
                  36% Margin
                </span>{" "}
                In Spread Pricing
              </motion.h1>

              <motion.p variants={fadeInUpVariants} className="mb-10 text-xl text-neutral-400 leading-relaxed max-w-3xl mx-auto">
                Every pharmacy claim benchmarked against the National Average Drug Acquisition Cost (NADAC). 
                Detect MAC list manipulation, PBM-owned pharmacy steering, and generic drug overcharges in real-time. 
                Generate audit-ready evidence packages automatically.
              </motion.p>

              <motion.div variants={fadeInUpVariants} className="flex flex-wrap items-center justify-center gap-4">
                <CalendlyPopupButton
                  url="https://calendly.com/jeremiah-kincaid-iq/kincaid-iq-intelligence-demo"
                  text="Schedule Intelligence Demo"
                  className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3.5 text-base font-semibold text-white hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-500/20"
                />
                <Link href="#pricing">
                  <Button variant="outline" className="border-neutral-700 text-white hover:bg-neutral-800">
                    View Pricing <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Stats Bar */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {benchmarkStats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInUpVariants}
                  className="rounded-2xl border border-white/5 bg-black/40 backdrop-blur-sm p-6 text-center"
                >
                  <stat.icon className={`mx-auto mb-3 h-8 w-8 text-${stat.color}-400`} />
                  <div className={`text-3xl font-black text-${stat.color}-400 mb-2`}>{stat.value}</div>
                  <div className="text-sm text-neutral-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 px-6 border-b border-white/5">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="text-center mb-16"
            >
              <motion.h2 variants={fadeInUpVariants} className="text-4xl font-black text-white mb-4">
                Algorithmic Spread Pricing Detection
              </motion.h2>
              <motion.p variants={fadeInUpVariants} className="text-xl text-neutral-400 max-w-3xl mx-auto">
                Every prescription claim automatically cross-referenced against federal NADAC benchmarks. 
                Variance detection, pattern analysis, and audit automation in a single platform.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
            >
              {keyCapabilities.map((capability, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInUpVariants}
                  className="group relative rounded-2xl border border-white/5 bg-black/40 backdrop-blur-sm p-8 hover:border-emerald-500/30 transition-all duration-300"
                >
                  <div className="mb-4 inline-flex rounded-xl bg-emerald-500/10 p-3">
                    <capability.icon className="h-6 w-6 text-emerald-400" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-white">{capability.title}</h3>
                  <p className="text-neutral-400 leading-relaxed">{capability.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Sample Data Preview */}
        <section className="py-24 px-6 border-b border-white/5 bg-gradient-to-b from-[#0A0F1E] to-[#0d1424]">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="mb-12"
            >
              <motion.h2 variants={fadeInUpVariants} className="text-4xl font-black text-white mb-4">
                Sample NADAC Variance Detection
              </motion.h2>
              <motion.p variants={fadeInUpVariants} className="text-xl text-neutral-400 max-w-3xl">
                Real anomalies from a recent audit. These generic maintenance drugs show 1,000%+ variance between 
                NADAC acquisition cost and PBM billed amounts — classic MAC list manipulation.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUpVariants}
              className="overflow-hidden rounded-2xl border border-white/5 bg-black/60 backdrop-blur-sm"
            >
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="border-b border-white/5 bg-black/40">
                    <tr>
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-neutral-400">Drug / NDC</th>
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-neutral-400 text-right">NADAC Cost</th>
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-neutral-400 text-right">PBM Billed</th>
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-neutral-400 text-right">Spread</th>
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-neutral-400 text-right">Variance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {sampleAnomalies.map((anomaly, idx) => (
                      <tr key={idx} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-semibold text-white">{anomaly.drug}</div>
                          <div className="text-xs text-neutral-500 font-mono mt-1">{anomaly.ndc}</div>
                        </td>
                        <td className="px-6 py-4 text-right font-mono text-emerald-400">{anomaly.nadac}</td>
                        <td className="px-6 py-4 text-right font-mono text-white">{anomaly.billed}</td>
                        <td className="px-6 py-4 text-right font-mono font-bold text-red-400">{anomaly.spread}</td>
                        <td className="px-6 py-4 text-right">
                          <span className="inline-flex items-center gap-1 rounded-full bg-red-500/10 px-3 py-1 text-xs font-bold text-red-400">
                            <TrendingUp className="h-3 w-3" />
                            {anomaly.variance}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="border-t border-white/5 bg-black/40 px-6 py-4 text-center">
                <p className="text-sm text-neutral-400">
                  This represents <span className="font-semibold text-white">3 of 4,218</span> flagged anomalies from a single quarter. 
                  <Link href="#pricing" className="ml-2 text-emerald-400 hover:text-emerald-300 font-semibold">
                    Get your full analysis →
                  </Link>
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24 px-6 border-b border-white/5">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-16"
            >
              <motion.h2 variants={fadeInUpVariants} className="text-4xl font-black text-white mb-4">
                Choose Your Intelligence Level
              </motion.h2>
              <motion.p variants={fadeInUpVariants} className="text-xl text-neutral-400 max-w-3xl mx-auto">
                From one-time analysis to continuous monitoring with audit automation. 
                All plans include NADAC benchmarking, spread detection, and evidence generation.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid gap-8 md:grid-cols-3"
            >
              {pricingTiers.map((tier, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInUpVariants}
                  className={`relative rounded-2xl border p-8 ${
                    tier.highlight
                      ? "border-emerald-500/50 bg-gradient-to-b from-emerald-950/30 to-black shadow-2xl shadow-emerald-500/20"
                      : "border-white/5 bg-black/40"
                  }`}
                >
                  {tier.highlight && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500 px-4 py-1 text-xs font-bold text-black">
                      MOST POPULAR
                    </div>
                  )}

                  <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-black text-white">{tier.price}</span>
                    {tier.period && <span className="text-neutral-400">{tier.period}</span>}
                  </div>
                  <p className="text-neutral-400 mb-6">{tier.description}</p>

                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, featureIdx) => (
                      <li key={featureIdx} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-neutral-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <CalendlyPopupButton
                    url="https://calendly.com/jeremiah-kincaid-iq/nadac-intelligence-consultation"
                    text={tier.cta}
                    className={`w-full inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold transition-all ${
                      tier.highlight
                        ? "bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg shadow-emerald-500/20"
                        : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                    }`}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 bg-gradient-to-b from-[#0d1424] to-[#0A0F1E]">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.h2 variants={fadeInUpVariants} className="text-4xl font-black text-white mb-6">
                Stop Paying 36% Hidden PBM Margin
              </motion.h2>
              <motion.p variants={fadeInUpVariants} className="text-xl text-neutral-400 mb-10 max-w-2xl mx-auto">
                Get your first NADAC benchmarking analysis. See exactly where your PBM is hiding spread pricing, 
                and receive audit-ready evidence to claw back overcharges.
              </motion.p>
              <motion.div variants={fadeInUpVariants} className="flex flex-wrap items-center justify-center gap-4">
                <CalendlyPopupButton
                  url="https://calendly.com/jeremiah-kincaid-iq/nadac-intelligence-consultation"
                  text="Schedule Consultation"
                  className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-8 py-4 text-lg font-semibold text-white hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-500/20"
                />
                <Link href="/solutions/rx-defense">
                  <Button variant="outline" size="lg" className="border-neutral-700 text-white hover:bg-neutral-800">
                    Explore PBM Contract Clarity 360* <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
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