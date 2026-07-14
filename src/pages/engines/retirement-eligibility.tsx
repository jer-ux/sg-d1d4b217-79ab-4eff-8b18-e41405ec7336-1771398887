import Head from "next/head";
import { motion } from "framer-motion";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ParticleField3D } from "@/components/premium/ParticleField3D";

export default function RetirementEligibilityEnginePage() {
  return (
    <>
      <Head>
        <title>Retirement Eligibility Engine | Kincaid Health</title>
        <meta
          name="description"
          content="Workforce retirement transition modeling and retiree healthcare cost forecasting. Projects Medicare eligibility, retiree coverage, and demographic shifts."
        />
      </Head>

      <Nav />

      <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black relative overflow-hidden">
        <ParticleField3D />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/10 via-transparent to-transparent" />
        
        <main className="container mx-auto px-4 py-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto mb-12"
          >
            <Link href="/engines" className="inline-flex items-center text-slate-400 hover:text-slate-300 mb-6 transition-colors">
              ← Back to Engines
            </Link>
            
            <Badge className="mb-4 bg-slate-500/10 text-slate-400 border-slate-500/20">
              Population & Demographics
            </Badge>
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-slate-400 via-gray-400 to-zinc-400 bg-clip-text text-transparent"
            >
              Retirement Eligibility Engine
            </motion.h1>
            <p className="text-xl text-gray-300 mb-8 max-w-4xl">
              Workforce retirement transition modeling and retiree healthcare cost forecasting. Projects Medicare eligibility, retiree coverage, and demographic shifts.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {[
                { value: "8-12%", label: "Near-Retirement", color: "slate" },
                { value: "65+", label: "Medicare Age", color: "gray" },
                { value: "$18K", label: "Pre-Medicare Cost", color: "zinc" },
                { value: "3-5yr", label: "Forecast Window", color: "neutral" }
              ].map((metric, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  className="perspective-1000"
                >
                  <Card className="border-slate-700 bg-slate-900/50 backdrop-blur-sm transform-gpu transition-all duration-300 hover:shadow-xl hover:shadow-slate-500/20">
                    <CardContent className="pt-6 text-center">
                      <div className={`text-2xl font-bold text-${metric.color}-400 mb-1`}>{metric.value}</div>
                      <div className="text-xs text-slate-400">{metric.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Card className="border-slate-700 bg-slate-900/30 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold text-white mb-4">Engine Capabilities</h2>
                  <div className="space-y-6 text-gray-300">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-400 mb-2">Medicare Eligibility Forecasting</h3>
                      <p>Projects the timing and volume of employees transitioning to Medicare coverage, modeling the financial impact of reduced active employee populations and retiree healthcare obligations.</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-400 mb-2">Pre-Medicare Retiree Cost Modeling</h3>
                      <p>Calculates the high-cost exposure from early retirees (ages 55-64) who are not yet Medicare-eligible, quantifying the financial burden of covering older, higher-utilizing populations.</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-zinc-400 mb-2">Workforce Demographic Shifts</h3>
                      <p>Analyzes the impact of retirement waves on workforce age composition, benefit costs, and plan design strategy, supporting multi-year financial planning for aging populations.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </main>
      </div>

      <Footer />
    </>
  );
}