import Head from "next/head";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Activity, Layers, TrendingUp, Shield } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function EpisodeOfCareEngine() {
  return (
    <>
      <Head>
        <title>Episode of Care Engine | SiriusB iQ</title>
        <meta name="description" content="Bundle related claims into clinical episodes for value-based payment analysis and cost benchmarking." />
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
                  <Layers className="h-8 w-8 text-purple-400" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white">Episode of Care Engine</h1>
                  <p className="text-purple-300">Medical Claims Analytics • Engine #22</p>
                </div>
              </div>

              <p className="text-xl text-slate-300">
                Bundle related claims into clinical episodes for value-based payment analysis and cost benchmarking.
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
                  <span>Clinical episode grouping using ETG/MEG logic</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Episode cost attribution across providers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Risk-adjusted episode benchmarking</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Complication and readmission tracking</span>
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
                  <span>Bundled payment program design and evaluation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Provider efficiency benchmarking</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Value-based contracting opportunities</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 bg-slate-900/50 border-purple-500/20">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Shield className="h-6 w-6 text-purple-400" />
                Technical Approach
              </h2>
              <p className="text-slate-300 leading-relaxed">
                Uses episode grouping algorithms (ETG/MEG methodology) to bundle related claims within defined time windows. Applies severity adjustment, complication detection, and risk standardization to enable fair provider comparison and bundled payment design.
              </p>
            </Card>
          </motion.div>
        </main>
      </div>

      <Footer />
    </>
  );
}