import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, CheckCircle2, Shield, TrendingUp, AlertTriangle, Users, DollarSign, Scale, Eye, Clock } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const reportSections = [
  {
    icon: AlertTriangle,
    title: "Executive Summary",
    description: "The three highest-impact findings, quantified in dollars and ranked by recoverability. CFO-ready."
  },
  {
    icon: Scale,
    title: "Forensic Compensation Analysis",
    description: "Line-by-line Schedule A breakdown with benchmarking against industry medians and disclosure quality assessment."
  },
  {
    icon: Eye,
    title: "Conflict Mapping",
    description: "Visual network diagram of undisclosed relationships, affiliate transactions, and revenue-sharing arrangements."
  },
  {
    icon: TrendingUp,
    title: "Cost Trajectory Modeling",
    description: "Three-year projection showing the compounding cost of current broker compensation structure."
  },
  {
    icon: Shield,
    title: "Fiduciary Risk Assessment",
    description: "DOL compliance analysis with specific citations to regulatory standards and exposure quantification."
  },
  {
    icon: DollarSign,
    title: "Recovery Roadmap",
    description: "Actionable steps to renegotiate terms, recover overpayments, and establish transparency frameworks."
  }
];

const samplePages = [
  {
    title: "Page 1: Executive Summary",
    description: "Three red flags, quantified impact, immediate actions",
    image: "/sample-report-page-1.png"
  },
  {
    title: "Page 8: Conflict Network",
    description: "Visual map of undisclosed affiliate relationships",
    image: "/sample-report-page-8.png"
  },
  {
    title: "Page 15: Recovery Roadmap",
    description: "Step-by-step plan with expected outcomes",
    image: "/sample-report-page-15.png"
  }
];

const outcomes = [
  { metric: "$380K", label: "Average recovery identified", icon: DollarSign, color: "text-emerald-400" },
  { metric: "23%", label: "Average cost reduction", icon: TrendingUp, color: "text-blue-400" },
  { metric: "48hr", label: "Turnaround time", icon: Clock, color: "text-purple-400" },
  { metric: "10:1", label: "Average ROI", icon: Scale, color: "text-amber-400" }
];

export default function ShadyBrokerReport() {
  return (
    <>
      <Head>
        <title>The Forensic Report | $4,500 | The Shady Broker Index</title>
        <meta name="description" content="A 40-page forensic analysis of your broker's compensation structure, conflict network, and recovery roadmap. DOL-filing backed. CFO-ready. $4,500." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
        {/* Hero */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6">
              <Badge className="bg-rose-500/10 text-rose-400 border-rose-500/30 mb-4">
                40-Page Forensic Analysis
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                The Forensic Report
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 mb-8">
                A complete forensic breakdown of your broker's compensation structure, conflict network, and recovery roadmap. Anchored to public DOL filings. CFO-ready.
              </p>
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="text-5xl font-bold text-rose-400">$4,500</div>
                <div className="text-left">
                  <div className="text-sm text-gray-500">One-time fee</div>
                  <div className="text-sm text-gray-500">48-hour delivery</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shady-broker-index">
                <Button size="lg" className="bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600 text-lg px-8">
                  Get My Report
                </Button>
              </Link>
              <Link href="#sample">
                <Button size="lg" variant="outline" className="border-gray-700 text-white hover:bg-white/5 text-lg px-8">
                  See Sample Pages
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Outcomes */}
        <section className="py-16 px-6 border-y border-gray-800">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {outcomes.map((outcome, idx) => {
                const Icon = outcome.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="text-center">
                    <Icon className={`w-8 h-8 ${outcome.color} mx-auto mb-3`} />
                    <div className={`text-4xl font-bold ${outcome.color} mb-2`}>{outcome.metric}</div>
                    <div className="text-sm text-gray-400">{outcome.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">What's Inside</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Six sections, 40 pages, every claim anchored to a specific public filing. This is not a template report. This is forensic accounting.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {reportSections.map((section, idx) => {
                const Icon = section.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-rose-500/30 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="bg-rose-500/10 p-3 rounded-lg">
                        <Icon className="w-6 h-6 text-rose-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white mb-2">{section.title}</h3>
                        <p className="text-sm text-gray-400">{section.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Sample Pages */}
        <section id="sample" className="py-20 px-6 bg-gray-950/50">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Sample Pages</h2>
              <p className="text-gray-400">Three pages from an actual report, redacted for client privacy.</p>
            </motion.div>

            <div className="space-y-8">
              {samplePages.map((page, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <FileText className="w-5 h-5 text-rose-400" />
                    <div>
                      <h3 className="text-lg font-medium text-white">{page.title}</h3>
                      <p className="text-sm text-gray-400">{page.description}</p>
                    </div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-8 text-center">
                    <div className="text-gray-500">Sample page placeholder</div>
                    <div className="text-sm text-gray-600 mt-2">Upload actual report samples to {page.image}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* The Humanitarian Close */}
        <section className="py-20 px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-rose-500/10 to-purple-500/10 border border-rose-500/30 rounded-2xl p-12 text-center">
              <h2 className="text-3xl font-bold text-white mb-6">
                Your employees are paying for this twice.
              </h2>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Once through forgone wages as benefit costs climb. And once through deductibles and co-pays when they actually get sick. Hidden broker compensation isn't a vendor issue. It's a people issue.
              </p>
              <p className="text-gray-300 mb-8 leading-relaxed">
                The $4,500 you spend on this report will recover, on average, $380,000 in year one. But the real value isn't the money. It's the signal to your team that someone finally looked.
              </p>
              <Link href="/shady-broker-index">
                <Button size="lg" className="bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600 text-lg px-12">
                  Get Started
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-6 border-t border-gray-800">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-medium text-white mb-2">How long does it take?</h3>
                <p className="text-gray-400">48 hours from intake to delivery. Most reports are completed within 24 hours.</p>
              </div>
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-medium text-white mb-2">What if my broker isn't in your database?</h3>
                <p className="text-gray-400">We can still produce the report if you provide your Form 5500 Schedule A filings or give us your EIN so we can pull them directly from DOL.</p>
              </div>
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-medium text-white mb-2">Is this legal?</h3>
                <p className="text-gray-400">Yes. All data is derived from public DOL filings. We are not making allegations of illegality; we are analyzing disclosed compensation patterns against industry benchmarks.</p>
              </div>
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-medium text-white mb-2">What if the findings are wrong?</h3>
                <p className="text-gray-400">Every claim in the report is anchored to a specific, cited public filing. If a finding is incorrect, we issue a corrected report within 24 hours at no charge.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-6 bg-gray-950/50">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}>
              <h2 className="text-4xl font-bold text-white mb-6">
                You Already Know Something's Wrong
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                You've seen the bills. You've sat through the renewal meetings. You've asked for transparency and gotten charts. <br/>
                <span className="text-white font-medium">Now get the forensic breakdown.</span>
              </p>
              <Link href="/shady-broker-index">
                <Button size="lg" className="bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600 text-lg px-12">
                  Score My Broker Now
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}