import { AlertTriangle, DollarSign, Eye, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function ProblemStatement() {
  return (
    <section className="py-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-red-500/10 text-red-400 border border-red-500/30 mb-4">
              THE PROBLEM
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              The $6.4 Billion Arbitrage
            </h2>
            <p className="text-xl text-slate-400">
              Pharmacy benefit management contracts contain sophisticated pricing mechanisms that systematically extract value from employer health plans through spread pricing, rebate retention, and contractual complexity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Spread Pricing</h3>
                  <p className="text-sm text-slate-400">
                    PBMs charge employers one price while paying pharmacies a lower rate, pocketing the difference—often exceeding 300% of acquisition cost.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Rebate Retention</h3>
                  <p className="text-sm text-slate-400">
                    Manufacturer rebates that should flow to employers are retained by PBMs through vague contract language and delayed disclosure timelines.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Eye className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Contractual Opacity</h3>
                  <p className="text-sm text-slate-400">
                    Complex contract language, defined terms buried in appendices, and performance guarantees with undisclosed calculation methodologies obscure true costs.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Audit Limitations</h3>
                  <p className="text-sm text-slate-400">
                    Restricted audit rights, limited data access, and narrow audit windows prevent comprehensive verification of PBM financial reporting.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-gradient-to-r from-amber-900/20 to-red-900/20 border border-amber-500/30 rounded-xl p-8">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-8 h-8 text-amber-400 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-white mb-3">The Fiduciary Risk</h3>
                <p className="text-slate-300 leading-relaxed">
                  Under ERISA, plan fiduciaries have a legal obligation to ensure that PBM contracts serve the exclusive benefit of plan participants. The Consolidated Appropriations Act (CAA) requires disclosure of "all direct and indirect compensation" received by service providers. Failure to forensically validate PBM financial reporting creates personal liability for trustees and executives.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}