import Head from "next/head";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Activity, AlertTriangle, TrendingUp, Shield } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CostLeakageDetection() {
  return (
    <>
      <Head>
        <title>Cost Leakage Detection Engine | SiriusB iQ</title>
        <meta name="description" content="Identify billing errors, duplicate payments, upcoding, and waste across medical claims." />
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
                  <AlertTriangle className="h-8 w-8 text-purple-400" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white">Cost Leakage Detection Engine</h1>
                  <p className="text-purple-300">Medical Claims Analytics • Engine #30</p>
                </div>
              </div>

              <p className="text-xl text-slate-300">
                Identify billing errors, duplicate payments, upcoding, and waste across medical claims.
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
                  <span>Duplicate claim detection</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Upcoding and unbundling pattern recognition</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Contract compliance validation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Balance billing exposure identification</span>
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
                  <span>Recover overpayments and prevent future leakage</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Improve payment integrity processes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Typical recovery: 1-3% of paid claims</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 bg-slate-900/50 border-purple-500/20">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Shield className="h-6 w-6 text-purple-400" />
                Technical Approach
              </h2>
              <p className="text-slate-300 leading-relaxed">
                Uses rule-based logic and machine learning to detect anomalies across paid claims history. Cross-references paid amounts against contract terms, fee schedules, and coding edits. Flags statistical outliers in billing patterns by provider, facility, and procedure code.
              </p>
            </Card>
          </motion.div>
        </main>
      </div>

      <Footer />
    </>
  );
}