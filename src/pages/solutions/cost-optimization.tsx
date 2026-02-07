import { motion } from "framer-motion";
import Link from "next/link";
import { DollarSign, ArrowLeft, TrendingDown, CheckCircle2, FileText, BarChart3, Sparkles, Target } from "lucide-react";
import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function CostOptimizationSolution() {
  const kpis = [
    { label: "Cost Reduction", value: "$12.4M", trend: "+42%" },
    { label: "ROI", value: "487%", trend: "+89%" },
    { label: "Efficiency Gain", value: "64%", trend: "+31%" },
    { label: "Savings Rate", value: "23.7%", trend: "+8.4%" }
  ];

  const complianceFrameworks = [
    { name: "ERISA §404(a)(1)(B)", description: "Prudent expert standard for plan expenses" },
    { name: "DOL Field Assistance Bulletin 2003-03", description: "Service provider fee disclosure guidance" },
    { name: "IRC §162", description: "Trade or business expense deductibility" },
    { name: "29 CFR 2550.408b-2", description: "Service provider compensation disclosure" }
  ];

  const techStack = [
    { component: "Cost Analytics", tech: "Apache Spark + ML", purpose: "Real-time cost pattern analysis" },
    { component: "Optimization Engine", tech: "Python + Operations Research", purpose: "Mathematical optimization models" },
    { component: "Benchmarking Suite", tech: "Snowflake + Tableau", purpose: "Industry cost comparisons" },
    { component: "Forecasting AI", tech: "Prophet + LSTM", purpose: "Predictive cost modeling" }
  ];

  const optimizationAreas = [
    { area: "Administrative Fees", potential: "$3.2M", impact: "High" },
    { area: "Claims Processing", potential: "$2.8M", impact: "High" },
    { area: "Network Contracts", potential: "$4.1M", impact: "Very High" },
    { area: "Pharmacy Benefits", potential: "$1.9M", impact: "Medium" },
    { area: "Stop-Loss Coverage", potential: "$2.4M", impact: "High" },
    { area: "Wellness Programs", potential: "$1.2M", impact: "Medium" }
  ];

  return (
    <>
      <SEO 
        title="Cost Optimization Solution | SiriusB iQ"
        description="AI-powered cost optimization delivering $12.4M+ in savings with 487% ROI"
      />
      
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-900/20 via-black to-cyan-900/20" />
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(20, 184, 166, 0.15) 1px, transparent 0)`,
              backgroundSize: "40px 40px"
            }}
            animate={{ backgroundPosition: ["0px 0px", "40px 40px"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <Nav />

        <main className="relative z-10 pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            <Link href="/">
              <Button variant="ghost" className="mb-8 text-teal-400 hover:text-teal-300">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Solutions
              </Button>
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-20"
            >
              <motion.div
                className="inline-block p-4 rounded-2xl mb-6"
                style={{
                  background: "linear-gradient(135deg, rgba(20, 184, 166, 0.2), rgba(6, 182, 212, 0.2))",
                  boxShadow: "0 0 60px rgba(20, 184, 166, 0.4)"
                }}
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                <DollarSign className="w-16 h-16 text-teal-400" />
              </motion.div>
              
              <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Cost Optimization
              </h1>
              
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                AI-powered cost optimization delivering $12.4M+ in annual savings with 487% ROI
              </p>
            </motion.div>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-20"
            >
              <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
                <BarChart3 className="w-8 h-8 text-teal-400" />
                Financial Impact
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpis.map((kpi, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="relative p-6 rounded-2xl overflow-hidden group cursor-pointer"
                    style={{
                      background: "linear-gradient(135deg, rgba(20, 184, 166, 0.1), rgba(6, 182, 212, 0.1))",
                      boxShadow: "0 0 40px rgba(20, 184, 166, 0.3)"
                    }}
                  >
                    <div className="relative z-10">
                      <p className="text-sm text-gray-400 mb-2">{kpi.label}</p>
                      <p className="text-3xl font-bold text-white mb-2">{kpi.value}</p>
                      <p className="text-sm text-green-400 flex items-center gap-1">
                        <TrendingDown className="w-4 h-4" />
                        {kpi.trend}
                      </p>
                    </div>
                    
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-teal-500/0 via-teal-500/20 to-teal-500/0"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-20"
            >
              <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
                <Target className="w-8 h-8 text-cyan-400" />
                Optimization Opportunities
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {optimizationAreas.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    className="p-6 rounded-2xl"
                    style={{
                      background: "linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(20, 184, 166, 0.1))",
                      boxShadow: "0 0 40px rgba(6, 182, 212, 0.3)"
                    }}
                  >
                    <h3 className="text-xl font-bold text-white mb-4">{item.area}</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Savings Potential:</span>
                        <span className="text-cyan-400 font-bold">{item.potential}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Impact Level:</span>
                        <span className={`font-bold ${
                          item.impact === "Very High" ? "text-green-400" :
                          item.impact === "High" ? "text-teal-400" : "text-blue-400"
                        }`}>
                          {item.impact}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-20"
            >
              <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
                <FileText className="w-8 h-8 text-teal-400" />
                Regulatory Compliance
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {complianceFrameworks.map((framework, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + idx * 0.1 }}
                    whileHover={{ scale: 1.02, x: 10 }}
                    className="p-6 rounded-2xl"
                    style={{
                      background: "linear-gradient(135deg, rgba(20, 184, 166, 0.1), rgba(6, 182, 212, 0.1))",
                      boxShadow: "0 0 40px rgba(20, 184, 166, 0.3)"
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{framework.name}</h3>
                        <p className="text-gray-400">{framework.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mb-20"
            >
              <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-cyan-400" />
                Technology Stack
              </h2>
              
              <div className="space-y-4">
                {techStack.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + idx * 0.1 }}
                    whileHover={{ scale: 1.02, x: -10 }}
                    className="p-6 rounded-2xl"
                    style={{
                      background: "linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(20, 184, 166, 0.1))",
                      boxShadow: "0 0 40px rgba(6, 182, 212, 0.3)"
                    }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Component</p>
                        <p className="text-lg font-bold text-white">{item.component}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Technology</p>
                        <p className="text-lg font-bold text-cyan-400">{item.tech}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Purpose</p>
                        <p className="text-lg text-gray-300">{item.purpose}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.0 }}
              className="text-center"
            >
              <Link href="/request-demo">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block"
                >
                  <Button 
                    size="lg"
                    className="text-2xl px-12 py-8 rounded-2xl relative overflow-hidden"
                    style={{
                      background: "linear-gradient(135deg, rgba(20, 184, 166, 0.3), rgba(6, 182, 212, 0.3))",
                      boxShadow: "0 0 60px rgba(20, 184, 166, 0.6)"
                    }}
                  >
                    <Sparkles className="w-6 h-6 mr-3" />
                    Request ROI Analysis
                    <Sparkles className="w-6 h-6 ml-3" />
                    
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: "-100%" }}
                      animate={{ x: "200%" }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}