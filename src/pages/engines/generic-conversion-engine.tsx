import Head from "next/head";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Activity, RefreshCw, TrendingUp, Shield } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function GenericConversionEngine() {
  return (
    <>
      <Head>
        <title>Generic Conversion Engine | SiriusB iQ</title>
        <meta name="description" content="Model generic substitution opportunities and forecast savings from patent expiration pipeline." />
      </Head>

      <Nav />

      <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950/20 to-slate-950">
        <main className="container mx-auto px-4 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <Link href="/engines">
              <Button variant="ghost" className="gap-2 text-emerald-400 hover:text-emerald-300">
                <ArrowLeft className="h-4 w-4" />
                Back to Engines
              </Button>
            </Link>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <RefreshCw className="h-8 w-8 text-emerald-400" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white">Generic Conversion Engine</h1>
                  <p className="text-emerald-300">Pharmacy Analytics • Engine #40</p>
                </div>
              </div>

              <p className="text-xl text-slate-300">
                Model generic substitution opportunities and forecast savings from patent expiration pipeline.
              </p>
            </div>

            <Card className="p-8 bg-slate-900/50 border-emerald-500/20">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Activity className="h-6 w-6 text-emerald-400" />
                Key Capabilities
              </h2>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>Patent expiration calendar with LOE dates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>Generic availability and pricing forecasts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>Member conversion rate modeling</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>Multi-year savings projection</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 bg-slate-900/50 border-emerald-500/20">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-emerald-400" />
                Business Value
              </h2>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>Anticipate major cost reduction opportunities</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>Plan formulary changes around LOE events</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>Maximize generic dispense rates</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 bg-slate-900/50 border-emerald-500/20">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Shield className="h-6 w-6 text-emerald-400" />
                Technical Approach
              </h2>
              <p className="text-slate-300 leading-relaxed">
                Tracks patent expiration dates and first-generic-approval milestones. Models member switching behavior based on historical conversion rates by therapeutic class. Estimates generic pricing using supply-side competition curves and historical launch pricing data. Projects multi-year savings accounting for formulary lag and member resistance.
              </p>
            </Card>
          </motion.div>
        </main>
      </div>

      <Footer />
    </>
  );
}