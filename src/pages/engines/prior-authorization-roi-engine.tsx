import Head from "next/head";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Activity, CheckSquare, TrendingUp, Shield } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PriorAuthorizationROIEngine() {
  return (
    <>
      <Head>
        <title>Prior Authorization ROI Engine | SiriusB iQ</title>
        <meta name="description" content="Quantify savings vs. administrative burden and member disruption for PA programs." />
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
                  <CheckSquare className="h-8 w-8 text-emerald-400" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white">Prior Authorization ROI Engine</h1>
                  <p className="text-emerald-300">Pharmacy Analytics • Engine #41</p>
                </div>
              </div>

              <p className="text-xl text-slate-300">
                Quantify savings vs. administrative burden and member disruption for PA programs.
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
                  <span>Approval/denial rate tracking by drug and indication</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>Cost avoidance calculation (denials + dose reductions)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>Administrative cost quantification</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>Member disruption and abandonment impact</span>
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
                  <span>Optimize PA criteria for maximum net ROI</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>Identify low-value PA programs to eliminate</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>Balance cost control with member experience</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 bg-slate-900/50 border-emerald-500/20">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Shield className="h-6 w-6 text-emerald-400" />
                Technical Approach
              </h2>
              <p className="text-slate-300 leading-relaxed">
                Tracks PA requests, approvals, denials, and member abandonment rates. Calculates gross savings from avoided claims and compares against administrative costs (staff time, technology, appeals). Models member disruption impact on adherence, satisfaction, and downstream medical costs. Produces net ROI by drug class and PA type.
              </p>
            </Card>
          </motion.div>
        </main>
      </div>

      <Footer />
    </>
  );
}