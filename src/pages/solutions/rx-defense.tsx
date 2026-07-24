import { useEffect } from "react";
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
  Eye,
  CheckCircle2
} from "lucide-react";

export default function RxDefensePage() {
  useEffect(() => {
    // Auto-open PDF in new tab on page load
    const timer = setTimeout(() => {
      window.open("/Kincaid_Health_PBM_Contract_Clarity_360_Report.pdf", "_blank");
    }, 500);

    return () => clearTimeout(timer);
  }, []);

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
        <section className="relative pt-24 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Link 
              href="/solutions" 
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Solutions
            </Link>
            
            <Badge className="mb-6 bg-amber-500/20 text-amber-300 border-amber-500/30">
              Full Report Available
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-400 bg-clip-text text-transparent mb-6">
              PBM Contract Clarity 360°
            </h1>
            <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto">
              Comprehensive forensic analysis report with clause-by-clause validation, spread pricing detection, and contractual leakage quantification
            </p>
          </div>
        </section>

        {/* PDF Viewer Card */}
        <section className="px-4 pb-20">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-800 border border-amber-500/20 rounded-2xl p-12 text-center shadow-2xl">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-500/20 border-2 border-amber-500/50 mb-6">
                <FileText className="w-10 h-10 text-amber-400" />
              </div>
              
              <h2 className="text-3xl font-bold text-white mb-4">
                Report Ready to View
              </h2>
              <p className="text-lg text-slate-400 mb-8 max-w-xl mx-auto">
                The PBM Contract Clarity 360° report has been prepared for viewing. Choose how you'd like to access it below.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <a
                  href="/Kincaid_Health_PBM_Contract_Clarity_360_Report.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-amber-500 hover:bg-amber-600 text-black rounded-xl transition-all font-semibold text-lg shadow-lg hover:shadow-amber-500/50 hover:scale-105"
                >
                  <Eye className="w-5 h-5" />
                  View Report
                </a>
                <a
                  href="/Kincaid_Health_PBM_Contract_Clarity_360_Report.pdf"
                  download
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-amber-500/50 text-white hover:bg-amber-500/10 rounded-xl transition-all font-semibold text-lg hover:scale-105"
                >
                  <Download className="w-5 h-5" />
                  Download PDF
                </a>
              </div>

              <div className="inline-flex items-center gap-2 text-sm text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Report automatically opened in new tab</span>
              </div>
            </div>

            {/* Report Details */}
            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-amber-400 mb-2">127</div>
                <div className="text-sm text-slate-400">Contract Clauses Analyzed</div>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-amber-400 mb-2">$8.4M</div>
                <div className="text-sm text-slate-400">Average Leakage Detected</div>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-amber-400 mb-2">23%</div>
                <div className="text-sm text-slate-400">Spread Pricing Detection</div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Resources */}
        <section className="py-20 px-4 border-t border-slate-800">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Related Intelligence Reports</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link 
                href="/contract-clarity-360"
                className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-amber-500/50 transition-all hover:scale-105"
              >
                <FileText className="w-8 h-8 text-amber-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">
                  Access More Reports
                </h3>
                <p className="text-sm text-slate-400 mb-4">
                  Schedule an appointment with Jeremiah to unlock 12 intelligence reports
                </p>
                <span className="text-sm text-amber-400 font-semibold">
                  View All Reports →
                </span>
              </Link>

              <Link 
                href="/solutions/nadac-benchmarking"
                className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-blue-500/50 transition-all hover:scale-105"
              >
                <FileText className="w-8 h-8 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">
                  NADAC Benchmarking
                </h3>
                <p className="text-sm text-slate-400 mb-4">
                  Compare your PBM pricing against federal benchmarks
                </p>
                <span className="text-sm text-blue-400 font-semibold">
                  Learn More →
                </span>
              </Link>

              <Link 
                href="/request-demo"
                className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-emerald-500/50 transition-all hover:scale-105"
              >
                <FileText className="w-8 h-8 text-emerald-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">
                  Request Custom Analysis
                </h3>
                <p className="text-sm text-slate-400 mb-4">
                  Get a forensic analysis of your specific contracts
                </p>
                <span className="text-sm text-emerald-400 font-semibold">
                  Contact Us →
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-transparent to-slate-900/50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Need Help Understanding Your Report?
            </h2>
            <p className="text-lg text-slate-400 mb-8">
              Schedule a consultation with Jeremiah to walk through your PBM contract analysis
            </p>
            <Link href="/request-demo">
              <Button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold text-lg px-8 py-6">
                Schedule Consultation
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}