import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, ArrowLeft, Activity, CheckCircle2, FileText, BarChart3, Sparkles, Stethoscope } from "lucide-react";
import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function HealthBenefitsSolution() {
  const kpis = [
    { label: "Member Satisfaction", value: "96.8%", trend: "+3.2%" },
    { label: "Claims Processing", value: "1.8 days", trend: "-28%" },
    { label: "Cost Savings", value: "$5.2M", trend: "+31%" },
    { label: "Network Coverage", value: "99.7%", trend: "+0.8%" }
  ];

  const complianceFrameworks = [
    { name: "ERISA §502(a)", description: "Civil enforcement of fiduciary responsibilities" },
    { name: "COBRA §4980B", description: "Continuation coverage requirements" },
    { name: "HIPAA §264", description: "Security standards for health information" },
    { name: "ACA §1557", description: "Non-discrimination in health programs" }
  ];

  const techStack = [
    { component: "Benefits Platform", tech: "React + Next.js", purpose: "Member portal & enrollment" },
    { component: "Claims Engine", tech: "Node.js + PostgreSQL", purpose: "Real-time claims adjudication" },
    { component: "Network Database", tech: "MongoDB + Redis", purpose: "Provider network management" },
    { component: "Analytics Suite", tech: "Tableau + Python", purpose: "Utilization & trend analysis" }
  ];

  const benefitCategories = [
    { category: "Medical Plans", plans: 12, members: "45,000+" },
    { category: "Dental Coverage", plans: 8, members: "38,000+" },
    { category: "Vision Plans", plans: 6, members: "32,000+" },
    { category: "Prescription Drug", plans: 10, members: "43,000+" },
    { category: "Mental Health", plans: 5, members: "28,000+" },
    { category: "Wellness Programs", plans: 15, members: "52,000+" }
  ];

  return (
    <>
      <SEO 
        title="Health Benefits Solution | SiriusB iQ"
        description="Comprehensive health benefits management with 96.8% member satisfaction"
      />
      
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-orange-900/20" />
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(239, 68, 68, 0.15) 1px, transparent 0)`,
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
              <Button variant="ghost" className="mb-8 text-red-400 hover:text-red-300">
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
                  background: "linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(251, 146, 60, 0.2))",
                  boxShadow: "0 0 60px rgba(239, 68, 68, 0.4)"
                }}
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                <Heart className="w-16 h-16 text-red-400" />
              </motion.div>
              
              <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-red-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                Health Benefits
              </h1>
              
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Comprehensive health benefits management delivering 96.8% member satisfaction
              </p>
            </motion.div>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-20"
            >
              <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
                <BarChart3 className="w-8 h-8 text-red-400" />
                Performance Dashboard
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
                      background: "linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(251, 146, 60, 0.1))",
                      boxShadow: "0 0 40px rgba(239, 68, 68, 0.3)"
                    }}
                  >
                    <div className="relative z-10">
                      <p className="text-sm text-gray-400 mb-2">{kpi.label}</p>
                      <p className="text-3xl font-bold text-white mb-2">{kpi.value}</p>
                      <p className="text-sm text-green-400 flex items-center gap-1">
                        <Activity className="w-4 h-4" />
                        {kpi.trend}
                      </p>
                    </div>
                    
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/20 to-red-500/0"
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
                <Stethoscope className="w-8 h-8 text-orange-400" />
                Benefit Categories
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {benefitCategories.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    className="p-6 rounded-2xl"
                    style={{
                      background: "linear-gradient(135deg, rgba(251, 146, 60, 0.1), rgba(239, 68, 68, 0.1))",
                      boxShadow: "0 0 40px rgba(251, 146, 60, 0.3)"
                    }}
                  >
                    <h3 className="text-xl font-bold text-white mb-4">{item.category}</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Available Plans:</span>
                        <span className="text-orange-400 font-bold">{item.plans}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Active Members:</span>
                        <span className="text-red-400 font-bold">{item.members}</span>
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
                <FileText className="w-8 h-8 text-red-400" />
                Compliance & Regulations
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
                      background: "linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(251, 146, 60, 0.1))",
                      boxShadow: "0 0 40px rgba(239, 68, 68, 0.3)"
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
                <Sparkles className="w-8 h-8 text-orange-400" />
                Technology Platform
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
                      background: "linear-gradient(135deg, rgba(251, 146, 60, 0.1), rgba(239, 68, 68, 0.1))",
                      boxShadow: "0 0 40px rgba(251, 146, 60, 0.3)"
                    }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Component</p>
                        <p className="text-lg font-bold text-white">{item.component}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Technology</p>
                        <p className="text-lg font-bold text-orange-400">{item.tech}</p>
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
                      background: "linear-gradient(135deg, rgba(239, 68, 68, 0.3), rgba(251, 146, 60, 0.3))",
                      boxShadow: "0 0 60px rgba(239, 68, 68, 0.6)"
                    }}
                  >
                    <Sparkles className="w-6 h-6 mr-3" />
                    Request Health Benefits Demo
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