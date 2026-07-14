import Head from "next/head";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Activity, Syringe, TrendingUp, Shield } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SpecialtyDrugForecast() {
  return (
    <>
      <Head>
        <title>Specialty Drug Forecast Engine | SiriusB iQ</title>
        <meta name="description" content="Model future specialty pharmacy spend including oncology, biologics, gene therapy, and orphan drugs." />
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
                  <Syringe className="h-8 w-8 text-emerald-400" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white">Specialty Drug Forecast Engine</h1>
                  <p className="text-emerald-300">Pharmacy Analytics • Engine #32</p>
                </div>
              </div>

              <p className="text-xl text-slate-300">
                Model future specialty pharmacy spend including oncology, biologics, gene therapy, and orphan drugs.
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
                  <span>Therapy class-specific projections</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>Pipeline drug launch impact modeling</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>Biosimilar conversion opportunity analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>Member-level specialty risk stratification</span>
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
                  <span>Anticipate catastrophic drug spend</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>Inform stop-loss purchasing decisions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>Build specialty drug reserves</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 bg-slate-900/50 border-emerald-500/20">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Shield className="h-6 w-6 text-emerald-400" />
                Technical Approach
              </h2>
              <p className="text-slate-300 leading-relaxed">
                Combines historical specialty utilization rates with FDA pipeline analysis and prevalence data. Models therapy adoption curves for newly approved drugs. Incorporates manufacturer assistance programs and rebate structures. Projects member-specific high-cost claimant trajectories.
              </p>
            </Card>
          </motion.div>
        </main>
      </div>

      <Footer />
    </>
  );
}