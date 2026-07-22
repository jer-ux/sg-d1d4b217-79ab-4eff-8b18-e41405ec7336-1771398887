import { useState } from "react";
import Link from "next/link";
import { FileText, Shield, AlertTriangle, Download, Calendar, CheckCircle2, Lock } from "lucide-react";
import Nav from "@/components/Nav";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendlyPopupButton } from "@/components/calendly/CalendlyPopupButton";

export default function ContractClarity360() {
  const [hasBooked, setHasBooked] = useState(false);

  const handleDownload = () => {
    if (hasBooked) {
      window.open("/Kincaid-IQ-Rx-Defense-IQ-2026-07-21_1_.pdf", "_blank");
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
                        Schedule to Unlock
                      </h4>
                      <p className="text-sm text-white/70 mb-4">
                        Book a 30-minute walkthrough to receive immediate access to the full PBM Contract Clarity 360° report
                      </p>
                      <CalendlyPopupButton 
                        url="https://calendly.com/jer-kincaidrmc/contract-clarity-360"
                        className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold"
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Schedule Walkthrough
                      </CalendlyPopupButton>
                    </div>

                    <button
                      onClick={() => setHasBooked(true)}
                      className="text-sm text-white/50 hover:text-white/70 underline"
                    >
                      Already booked? Click here
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 text-center">
                      <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                      <h4 className="text-lg font-semibold text-white mb-2">
                        You're all set!
                      </h4>
                      <p className="text-sm text-white/70 mb-4">
                        Download your PBM Contract Clarity 360° report below
                      </p>
                    </div>

                    <Button
                      onClick={handleDownload}
                      className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-semibold"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Report (PDF)
                    </Button>

                    <p className="text-xs text-white/50 text-center">
                      13 pages • 2.4 MB • Updated July 2026
                    </p>
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
            Get your personalized PBM Contract Clarity 360° analysis in our next walkthrough
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <CalendlyPopupButton 
              url="https://calendly.com/jer-kincaidrmc/contract-clarity-360"
              className="bg-amber-500 hover:bg-amber-600 text-black font-semibold"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Analysis
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