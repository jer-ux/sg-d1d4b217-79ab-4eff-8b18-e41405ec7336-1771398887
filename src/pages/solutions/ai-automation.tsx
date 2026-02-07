import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, ArrowLeft, TrendingUp, CheckCircle2, FileText, BarChart3, Zap, Brain } from "lucide-react";
import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function AIAutomationSolution() {
  const kpis = [
    { label: "Automation Rate", value: "87.3%", trend: "+24%" },
    { label: "Processing Speed", value: "3.2s", trend: "-89%" },
    { label: "Accuracy", value: "99.6%", trend: "+8.1%" },
    { label: "Cost Savings", value: "$18.7M", trend: "+156%" }
  ];

  const complianceFrameworks = [
    { name: "EU AI Act", description: "Risk-based regulatory framework for artificial intelligence" },
    { name: "NIST AI Risk Management Framework", description: "Managing risks from artificial intelligence" },
    { name: "ISO/IEC 42001", description: "AI management system requirements" },
    { name: "IEEE 7010", description: "Well-being metrics for autonomous and intelligent systems" }
  ];

  const techStack = [
    { component: "ML Platform", tech: "TensorFlow + PyTorch", purpose: "Deep learning model training" },
    { component: "NLP Engine", tech: "GPT-4 + BERT + Claude", purpose: "Document understanding & generation" },
    { component: "Automation Framework", tech: "Apache Airflow + Prefect", purpose: "Workflow orchestration" },
    { component: "MLOps Pipeline", tech: "MLflow + Kubeflow", purpose: "Model deployment & monitoring" }
  ];

  const automationCapabilities = [
    { capability: "Claims Processing", automation: "94%", time_saved: "23 hrs/day", impact: "Extreme" },
    { capability: "Policy Review", automation: "91%", time_saved: "18 hrs/day", impact: "Very High" },
    { capability: "Risk Analysis", automation: "88%", time_saved: "15 hrs/day", impact: "Very High" },
    { capability: "Document Classification", automation: "97%", time_saved: "28 hrs/day", impact: "Extreme" },
    { capability: "Fraud Detection", automation: "93%", time_saved: "20 hrs/day", impact: "Very High" },
    { capability: "Customer Support", automation: "85%", time_saved: "32 hrs/day", impact: "Extreme" }
  ];

  return (
    <>
      <SEO 
        title="AI Automation Solution | SiriusB iQ"
        description="Advanced AI automation with 87.3% automation rate and $18.7M+ cost savings"
      />
      
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-900/20 via-black to-purple-900/20" />
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(236, 72, 153, 0.15) 1px, transparent 0)`,
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
              <Button variant="ghost" className="mb-8 text-pink-400 hover:text-pink-300">
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
                  background: "linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(168, 85, 247, 0.2))",
                  boxShadow: "0 0 60px rgba(236, 72, 153, 0.4)"
                }}
                whileHover={{ scale: 1.05, rotate: -5 }}
              >
                <Brain className="w-16 h-16 text-pink-400" />
              </motion.div>
              
              <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                AI Automation
              </h1>
              
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Advanced AI automation with 87.3% automation rate delivering $18.7M+ in cost savings
              </p>
            </motion.div>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-20"
            >
              <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
                <BarChart3 className="w-8 h-8 text-pink-400" />
                Performance Metrics
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
                      background: "linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(168, 85, 247, 0.1))",
                      boxShadow: "0 0 40px rgba(236, 72, 153, 0.3)"
                    }}
                  >
                    <div className="relative z-10">
                      <p className="text-sm text-gray-400 mb-2">{kpi.label}</p>
                      <p className="text-3xl font-bold text-white mb-2">{kpi.value}</p>
                      <p className="text-sm text-green-400 flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        {kpi.trend}
                      </p>
                    </div>
                    
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-pink-500/0 via-pink-500/20 to-pink-500/0"
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
                <Zap className="w-8 h-8 text-purple-400" />
                Automation Capabilities
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {automationCapabilities.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    className="p-6 rounded-2xl"
                    style={{
                      background: "linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.1))",
                      boxShadow: "0 0 40px rgba(168, 85, 247, 0.3)"
                    }}
                  >
                    <h3 className="text-xl font-bold text-white mb-4">{item.capability}</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Automation:</span>
                        <span className="text-purple-400 font-bold">{item.automation}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Time Saved:</span>
                        <span className="text-pink-400 font-bold">{item.time_saved}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Impact:</span>
                        <span className={`font-bold ${
                          item.impact === "Extreme" ? "text-green-400" :
                          item.impact === "Very High" ? "text-teal-400" : "text-blue-400"
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
                <FileText className="w-8 h-8 text-pink-400" />
                AI Governance & Compliance
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
                      background: "linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(168, 85, 247, 0.1))",
                      boxShadow: "0 0 40px rgba(236, 72, 153, 0.3)"
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
                <Sparkles className="w-8 h-8 text-purple-400" />
                AI Technology Stack
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
                      background: "linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.1))",
                      boxShadow: "0 0 40px rgba(168, 85, 247, 0.3)"
                    }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Component</p>
                        <p className="text-lg font-bold text-white">{item.component}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Technology</p>
                        <p className="text-lg font-bold text-purple-400">{item.tech}</p>
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
                      background: "linear-gradient(135deg, rgba(236, 72, 153, 0.3), rgba(168, 85, 247, 0.3))",
                      boxShadow: "0 0 60px rgba(236, 72, 153, 0.6)"
                    }}
                  >
                    <Sparkles className="w-6 h-6 mr-3" />
                    Request AI Demo
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