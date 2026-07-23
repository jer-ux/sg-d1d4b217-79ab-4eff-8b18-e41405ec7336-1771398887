import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  ExternalLink,
  FileText,
  ChevronLeft,
  Maximize2
} from "lucide-react";

export default function RxDefensePage() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <>
      <Head>
        <title>PBM Contract Clarity 360° Report | Kincaid Health</title>
        <meta 
          name="description" 
          content="Full PBM Contract Clarity 360° forensic analysis report with comprehensive contract intelligence and leakage detection." 
        />
      </Head>
      <SEO
        title="PBM Contract Clarity 360° Report | Kincaid Health"
        description="Comprehensive PBM contract forensic analysis report with clause-by-clause validation, spread pricing detection, and contractual leakage quantification."
      />

      <Nav />

      <main className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black">
        {/* Header */}
        <section className="relative pt-24 pb-8 px-4 border-b border-slate-800">
          <div className="max-w-7xl mx-auto">
            <Link 
              href="/solutions" 
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Solutions
            </Link>
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <Badge className="mb-4 bg-amber-500/20 text-amber-300 border-amber-500/30">
                  Full Report
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-400 bg-clip-text text-transparent mb-3">
                  PBM Contract Clarity 360°
                </h1>
                <p className="text-lg text-slate-400 max-w-2xl">
                  Comprehensive forensic analysis report with clause-by-clause validation, spread pricing detection, and contractual leakage quantification
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  onClick={toggleFullscreen}
                  className="bg-amber-500 hover:bg-amber-600 text-black font-semibold"
                >
                  <Maximize2 className="w-4 h-4 mr-2" />
                  {isFullscreen ? "Exit Fullscreen" : "Fullscreen View"}
                </Button>
                <a
                  href="/Kincaid_Health_PBM_Contract_Clarity_360_Report.pdf"
                  download
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-slate-700 text-white hover:bg-slate-900 rounded-lg transition-colors font-medium"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </a>
                <a
                  href="/Kincaid_Health_PBM_Contract_Clarity_360_Report.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-slate-700 text-white hover:bg-slate-900 rounded-lg transition-colors font-medium"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open in New Tab
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* PDF Viewer */}
        <section className={`${isFullscreen ? 'fixed inset-0 z-50 bg-black' : 'relative'} px-4 py-8`}>
          <div className={`${isFullscreen ? 'w-full h-full' : 'max-w-7xl mx-auto'}`}>
            <div className={`bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden ${isFullscreen ? 'h-full' : 'h-[calc(100vh-280px)] min-h-[800px]'}`}>
              <iframe
                src="/Kincaid_Health_PBM_Contract_Clarity_360_Report.pdf#toolbar=1&navpanes=1&scrollbar=1"
                className="w-full h-full"
                title="PBM Contract Clarity 360° Report"
              />
            </div>
          </div>
        </section>

        {/* Additional Resources */}
        {!isFullscreen && (
          <section className="py-12 px-4 border-t border-slate-800">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-6">Related Reports</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Link 
                  href="/contract-clarity-360"
                  className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-amber-500/50 transition-all"
                >
                  <FileText className="w-8 h-8 text-amber-400 mb-3" />
                  <h3 className="text-lg font-bold text-white mb-2">
                    Access More Reports
                  </h3>
                  <p className="text-sm text-slate-400 mb-4">
                    Schedule an appointment to unlock 12 intelligence reports
                  </p>
                  <span className="text-sm text-amber-400 font-medium">
                    View All Reports →
                  </span>
                </Link>

                <Link 
                  href="/solutions/nadac-benchmarking"
                  className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-amber-500/50 transition-all"
                >
                  <FileText className="w-8 h-8 text-blue-400 mb-3" />
                  <h3 className="text-lg font-bold text-white mb-2">
                    NADAC Benchmarking
                  </h3>
                  <p className="text-sm text-slate-400 mb-4">
                    Compare your PBM pricing against federal benchmarks
                  </p>
                  <span className="text-sm text-blue-400 font-medium">
                    Learn More →
                  </span>
                </Link>

                <Link 
                  href="/request-demo"
                  className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-amber-500/50 transition-all"
                >
                  <FileText className="w-8 h-8 text-emerald-400 mb-3" />
                  <h3 className="text-lg font-bold text-white mb-2">
                    Request Analysis
                  </h3>
                  <p className="text-sm text-slate-400 mb-4">
                    Get a custom forensic analysis of your contracts
                  </p>
                  <span className="text-sm text-emerald-400 font-medium">
                    Contact Us →
                  </span>
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}