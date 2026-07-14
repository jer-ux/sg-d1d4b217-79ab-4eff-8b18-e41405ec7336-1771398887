import Head from "next/head";
import { motion } from "framer-motion";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ParticleField3D } from "@/components/premium/ParticleField3D";

export default function DisabilityIncidenceEnginePage() {
  return (
    <>
      <Head>
        <title>Disability Incidence Engine | Kincaid Health</title>
        <meta
          name="description"
          content="Disability claim prediction and cost modeling for short-term and long-term disability programs. Forecasts incidence rates by occupation and demographics."
        />
      </Head>

      <Nav />

      <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black relative overflow-hidden">
        <ParticleField3D />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-900/10 via-transparent to-transparent" />
        
        <main className="container mx-auto px-4 py-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto mb-12"
          >
            <Link href="/engines" className="inline-flex items-center text-orange-400 hover:text-orange-300 mb-6 transition-colors">
              ← Back to Engines
            </Link>
            
            <Badge className="mb-4 bg-orange-500/10 text-orange-400 border-orange-500/20">
              Population & Demographics
            </Badge>
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent"
            >
              Disability Incidence Engine
            </motion.h1>
            <p className="text-xl text-gray-300 mb-8 max-w-4xl">
              Disability claim prediction and cost modeling for short-term and long-term disability programs. Forecasts incidence rates by occupation and demographics.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {[
                { value: "2-3%", label: "STD Incidence", color: "orange" },
                { value: "0.8-1.2%", label: "LTD Incidence", color: "amber" },
                { value: "$850/mo", label: "Avg Claim Cost", color: "yellow" },
                { value: "Occupation", label: "Risk Segmentation", color: "lime" }
              ].map((metric, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  className="perspective-1000"
                >
                  <Card className="border-slate-700 bg-slate-900/50 backdrop-blur-sm transform-gpu transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/20">
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
                      <h3 className="text-lg font-semibold text-orange-400 mb-2">Occupational Risk Segmentation</h3>
                      <p>Models disability incidence rates by occupation category (sedentary, light, medium, heavy), industry sector, and job function to quantify injury and illness risk by workforce segment.</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-amber-400 mb-2">Claim Duration Forecasting</h3>
                      <p>Predicts short-term disability duration and long-term disability conversion rates, calculating expected claim costs based on historical recovery patterns and return-to-work success rates.</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-yellow-400 mb-2">Demographic Risk Adjustment</h3>
                      <p>Adjusts disability incidence rates for age, gender, salary level, and tenure, incorporating comorbidity risk factors from health plan data to improve prediction accuracy.</p>
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