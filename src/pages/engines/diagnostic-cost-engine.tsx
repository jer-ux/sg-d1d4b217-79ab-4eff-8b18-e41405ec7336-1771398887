import Head from "next/head";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Activity, Microscope, TrendingUp, Shield } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DiagnosticCostEngine() {
  return (
    <>
      <Head>
        <title>Diagnostic Cost Engine | SiriusB iQ</title>
        <meta name="description" content="Analyze lab, imaging, and diagnostic procedure costs to identify pricing outliers and optimization opportunities." />
      </Head>

      <Nav />

      <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950">
        <main className="container mx-auto px-4 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <Link href="/engines">
              <Button variant="ghost" className="gap-2 text-purple-400 hover:text-purple-300">
                <ArrowLeft className="h-4 w-4" />
                Back to Engines
              </Button>
            </Link>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <Microscope className="h-8 w-8 text-purple-400" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white">Diagnostic Cost Engine</h1>
                  <p className="text-purple-300">Medical Claims Analytics • Engine #28</p>
                </div>
              </div>

              <p className="text-xl text-slate-300">
                Analyze lab, imaging, and diagnostic procedure costs to identify pricing outliers and optimization opportunities.
              </p>
            </div>

            <Card className="p-8 bg-slate-900/50 border-purple-500/20">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Activity className="h-6 w-6 text-purple-400" />
                Key Capabilities
              </h2>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>CPT-level pricing benchmarking</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Lab and imaging utilization tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>High-cost diagnostic outlier detection</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Duplicate test identification</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 bg-slate-900/50 border-purple-500/20">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-purple-400" />
                Business Value
              </h2>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Negotiate better lab and imaging contracts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Reduce unnecessary duplicate testing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Identify steerage opportunities to lower-cost settings</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 bg-slate-900/50 border-purple-500/20">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Shield className="h-6 w-6 text-purple-400" />
                Technical Approach
              </h2>
              <p className="text-slate-300 leading-relaxed">
                Normalizes diagnostic costs by CPT code, modality, and place of service. Compares pricing against Medicare fee schedules, commercial benchmarks, and facility-specific rates. Identifies repeat tests within clinically inappropriate timeframes and quantifies potential savings.
              </p>
            </Card>
          </motion.div>
        </main>
      </div>

      <Footer />
    </>
  );
}