import Head from "next/head";
import { motion } from "framer-motion";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, AlertTriangle, TrendingUp, DollarSign, CheckCircle, FileText, Clock, Target } from "lucide-react";
import { Nav } from "@/components/Nav";
import { ParticleField3D } from "@/components/premium/ParticleField3D";

export default function ClaimsRecoveryIQPage() {
  return (
    <>
      <Head>
        <title>Claims Recovery IQ | Kincaid Health Data Sciences Lab</title>
        <meta 
          name="description" 
          content="Forensic claims recovery engine. AI-powered overpayment detection, contract validation, and ERISA compliance auditing delivering 1.22% of spend recovered." 
        />
      </Head>

      <Nav />

      <main className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black relative overflow-hidden">
        <ParticleField3D />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/10 via-transparent to-transparent" />
        
        {/* Hero Section */}
        <section className="relative pt-24 pb-12 px-4">
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8"
            >
              <Badge className="mb-6 bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                Forensic Recovery Intelligence
              </Badge>
              <motion.h1 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-5xl md:text-7xl font-bold mb-6"
              >
                <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                  Claims Recovery IQ
                </span>
              </motion.h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-4xl mx-auto">
                AI-Powered Overpayment Detection & Contract Validation
              </p>
              <p className="text-lg text-gray-400 mb-8 max-w-3xl mx-auto">
                Forensic claims recovery delivering 1.22% of spend recovered through automated auditing
              </p>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                {[
                  { value: "1.22%", label: "Avg Recovery Rate", color: "emerald" },
                  { value: "$847K", label: "Avg Annual Recovery", color: "teal" },
                  { value: "14-Day", label: "Recovery Timeline", color: "cyan" },
                  { value: "99.2%", label: "Accuracy Rate", color: "green" }
                ].map((metric, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                    whileHover={{ scale: 1.05, rotateY: 5 }}
                    className="perspective-1000"
                  >
                    <Card className="border-slate-700 bg-slate-900/50 backdrop-blur-sm transform-gpu transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/20">
                      <CardContent className="pt-6 text-center">
                        <div className={`text-3xl font-bold text-${metric.color}-400 mb-1`}>{metric.value}</div>
                        <div className="text-xs text-slate-400">{metric.label}</div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Recovery Framework Section */}
        <section className="py-20 border-t border-slate-800 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-900/5 to-transparent" />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 mb-4">
                THE FRAMEWORK
              </Badge>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold text-white mb-6"
              >
                The Claims Recovery Framework
              </motion.h2>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                A systematic forensic approach to identifying, validating, and recovering overpayments across medical and pharmacy claims.
              </p>
            </div>

            {/* Four Pillars */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {[
                { icon: Shield, title: "Overpayment Detection", description: "Machine learning models identify statistical anomalies, duplicate payments, and pricing discrepancies across claims data.", color: "emerald" },
                { icon: FileText, title: "Contract Validation", description: "Automated reconciliation verifies claims against contractual terms, identifying breaches and unauthorized charges.", color: "teal" },
                { icon: AlertTriangle, title: "ERISA Compliance", description: "Regulatory audit frameworks ensure fiduciary obligations and document recovery actions for litigation defense.", color: "cyan" },
                { icon: DollarSign, title: "Recovery Execution", description: "Structured demand letters, vendor negotiation protocols, and payment tracking deliver measurable recoveries.", color: "green" }
              ].map((pillar, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, rotateY: 5, z: 50 }}
                  className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-emerald-500/50 transition-all backdrop-blur-sm transform-gpu hover:shadow-2xl hover:shadow-emerald-500/20"
                >
                  <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-4">
                    <pillar.icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-slate-400">
                    {pillar.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}