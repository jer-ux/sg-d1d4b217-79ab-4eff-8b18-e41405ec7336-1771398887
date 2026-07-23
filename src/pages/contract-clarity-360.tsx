import { useState } from "react";
import Link from "next/link";
import { FileText, Shield, AlertTriangle, Download, Calendar, CheckCircle2, Lock } from "lucide-react";
import Nav from "@/components/Nav";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendlyPopupButton } from "@/components/calendly/CalendlyPopupButton";

export default function ContractClarity360() {
  const [hasBooked, setHasBooked] = useState(false);
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  const reports = [
    { name: "PBM Contract Clarity 360°", file: "/Kincaid_Health_PBM_Contract_Clarity_360_Report.pdf", size: "2.4 MB" },
    { name: "Stop-Loss Study", file: "/Stop-Loss_Study.pdf", size: "1.2 MB" },
    { name: "Stop-Loss Replacement Study", file: "/Stop-Loss_Replacement_Study.pdf", size: "1.8 MB" },
    { name: "Broker Compensation Study", file: "/Broker_Compensation_Study.pdf", size: "1.5 MB" },
    { name: "Stop-Loss IQ", file: "/Stop-Loss_IQ.pdf", size: "2.1 MB" },
    { name: "Stewardship Report IQ", file: "/Stewardship_Report_IQ.pdf", size: "1.9 MB" },
    { name: "Employer Health Score", file: "/Employer_Health_Score.pdf", size: "1.7 MB" },
    { name: "Network IQ", file: "/Network_IQ.pdf", size: "1.6 MB" },
    { name: "Claims Recovery IQ", file: "/Claims_Recovery_IQ.pdf", size: "1.8 MB" },
    { name: "ERISA Fiduciary IQ", file: "/ERISA_Fiduciary_IQ.pdf", size: "2.0 MB" },
    { name: "Network Leakage Report", file: "/Network_Leakage_Report.pdf", size: "1.4 MB" },
    { name: "PBM Contract Clarity 360°", file: "/PBM_Contract_Clarity_360.pdf", size: "1.6 MB" },
  ];

  const handleSelectReport = (fileUrl: string) => {
    setSelectedReport(fileUrl);
  };

  const handleDownload = () => {
    if (selectedReport) {
      window.open(selectedReport, "_blank");
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <Nav />

      {/* Hero Section */}
      <section className="relative py-24 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-slate-950 to-blue-900/20" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="bg-amber-500/10 text-amber-400 border border-amber-500/30 mb-6 text-sm px-4 py-2">
              FORENSIC CONTRACT INTELLIGENCE
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              PBM Contract Clarity 360°
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed">
              Comprehensive PBM contract forensic analysis revealing spread pricing, rebate retention mechanics, and hidden leakage patterns with clause-level validation
            </p>

            <div className="flex flex-wrap justify-center gap-8 mt-12">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-amber-400" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-white">$8.4M</div>
                  <div className="text-sm text-slate-400">Avg Annual Leakage</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-amber-400" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-white">127</div>
                  <div className="text-sm text-slate-400">Clauses Analyzed</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-amber-400" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-white">23%</div>
                  <div className="text-sm text-slate-400">Spread Detection Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download Gate Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                Get Your PBM Contract Clarity 360° Report
              </h2>
              <p className="text-lg text-white/70">
                Schedule a 30-minute session to walk through your specific contract forensics
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Left: What's Inside */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">What's Inside</h3>
                <ul className="space-y-3">
                  {[
                    "Spread pricing detection methodology",
                    "MAC vs NADAC benchmark analysis",
                    "Rebate retention clause mapping",
                    "Hidden fee identification matrix",
                    "Contractual leakage quantification",
                    "Fiduciary compliance scorecard",
                    "Clause-by-clause risk scoring",
                    "Executive summary + action items"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                      <span className="text-white/70">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: Download Gate */}
              <div className="flex flex-col justify-center">
                {!hasBooked ? (
                  <div className="space-y-6">
                    <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6">
                      <Lock className="w-8 h-8 text-amber-400 mb-3" />
                      <h4 className="text-lg font-semibold text-white mb-2">
                        Book an Appointment with Jeremiah
                      </h4>
                      <p className="text-sm text-white/70 mb-4">
                        Schedule a 30-minute session to pick one of 12 intelligence reports to download
                      </p>
                      <CalendlyPopupButton 
                        url="https://siriusb.ai/board-of-directors"
                        className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold"
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Book with Jeremiah
                      </CalendlyPopupButton>
                    </div>

                    <button
                      onClick={() => setHasBooked(true)}
                      className="text-sm text-white/50 hover:text-white/70 underline"
                    >
                      Already booked? Click here
                    </button>
                  </div>
                ) : !selectedReport ? (
                  <div className="space-y-4">
                    <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 text-center">
                      <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                      <h4 className="text-lg font-semibold text-white mb-2">
                        Select Your Report
                      </h4>
                      <p className="text-sm text-white/70 mb-4">
                        Choose one of {reports.length} intelligence reports to download
                      </p>
                    </div>

                    <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                      {reports.map((report, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSelectReport(report.file)}
                          className="w-full flex items-center justify-between p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-amber-500/20 hover:border-amber-500/30 transition-colors group"
                        >
                          <div className="flex items-center gap-3 text-left">
                            <FileText className="w-5 h-5 text-amber-400 flex-shrink-0" />
                            <div>
                              <div className="text-sm font-medium text-white group-hover:text-amber-400 transition-colors">
                                {report.name}
                              </div>
                              <div className="text-xs text-white/50">{report.size}</div>
                            </div>
                          </div>
                          <div className="text-xs text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">
                            Select →
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
                      <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                      <h4 className="text-lg font-semibold text-white mb-2 text-center">
                        Ready to Download
                      </h4>
                      <p className="text-sm text-white/70 mb-4 text-center">
                        Your selected report is ready
                      </p>
                      
                      <div className="mb-4 p-3 rounded-lg border border-white/10 bg-white/5">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-amber-400 flex-shrink-0" />
                          <div className="flex-1">
                            <div className="text-sm font-medium text-white">
                              {reports.find(r => r.file === selectedReport)?.name}
                            </div>
                            <div className="text-xs text-white/50">
                              {reports.find(r => r.file === selectedReport)?.size}
                            </div>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={handleDownload}
                        className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        Download Report
                      </button>

                      <button
                        onClick={() => setSelectedReport(null)}
                        className="w-full text-sm text-white/50 hover:text-white/70 underline mt-3"
                      >
                        Choose a different report
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Report Preview */}
      <section className="py-16 px-6 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Report Highlights
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-white/10 bg-black/40 p-6">
              <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Spread Pricing Detection
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Forensic analysis of MAC pricing vs NADAC benchmarks revealing average spreads of $47 per prescription and identifying high-spread drug classes
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/40 p-6">
              <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Rebate Retention Analysis
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Clause-level mapping of rebate flow mechanics, identifying retention patterns and quantifying pass-through obligations vs actual remittance
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/40 p-6">
              <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Fiduciary Risk Scoring
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                ERISA compliance assessment with clause-by-clause risk ratings, identifying conflicts of interest and hidden compensation structures
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Audit Your PBM Contract?
          </h2>
          <p className="text-lg text-white/70 mb-8">
            Book an appointment with Jeremiah to access your intelligence report
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <CalendlyPopupButton 
              url="https://siriusb.ai/board-of-directors"
              className="bg-amber-500 hover:bg-amber-600 text-black font-semibold"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Book with Jeremiah
            </CalendlyPopupButton>
            <Link href="/solutions/rx-defense">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                Learn More About Rx Defense
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}