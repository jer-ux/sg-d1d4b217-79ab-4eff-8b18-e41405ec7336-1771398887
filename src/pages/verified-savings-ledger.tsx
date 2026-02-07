import { SEO } from "@/components/SEO";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { CheckCircle2, FileText, TrendingUp, Shield, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function VerifiedSavingsLedger() {
  return (
    <>
      <SEO
        title="Verified Savings Ledger — Kincaid IQ"
        description="Stop arguing about 'opportunities.' Start reconciling an auditable value ledger with receipts, owners, and board-ready reporting."
      />
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white">
        <SiteHeader />
        
        {/* Premium 3D Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/30 via-transparent to-transparent" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-emerald-500/20 rounded-full blur-[90px] animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <main className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            {/* Hero Section with Premium Design */}
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-xl px-4 py-2 mb-6">
                <Sparkles className="h-4 w-4 text-purple-400" />
                <span className="text-sm font-semibold text-purple-300">Audit-Grade Value Tracking</span>
              </div>
              <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
                Verified Savings Ledger
              </h1>
              <p className="text-xl text-purple-200/70 max-w-3xl mx-auto leading-relaxed">
                Stop arguing about "opportunities." Start reconciling an auditable value ledger with receipts, owners, and board-ready reporting.
              </p>
            </div>

            {/* Premium Stats Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-20">
              {[
                { label: "Ledger States", value: "4", desc: "Identified → Approved → Realized → At-risk" },
                { label: "Evidence Receipts", value: "100%", desc: "Full lineage, tests, and confidence scores" },
                { label: "Audit Ready", value: "Real-time", desc: "Journal-entry thinking for finance teams" }
              ].map((stat, i) => (
                <div 
                  key={i}
                  className="group relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-white/[0.03] to-transparent backdrop-blur-xl p-8 hover:scale-[1.02] transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/0 to-blue-500/0 rounded-3xl blur opacity-0 group-hover:opacity-30 group-hover:from-purple-500/50 group-hover:to-blue-500/50 transition-all duration-500" />
                  <div className="relative">
                    <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-purple-200 bg-clip-text text-transparent mb-3">
                      {stat.value}
                    </div>
                    <div className="text-sm font-semibold text-white mb-2">{stat.label}</div>
                    <div className="text-sm text-purple-200/60">{stat.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Ledger States Flow */}
            <div className="mb-20 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-white/[0.03] to-transparent backdrop-blur-xl p-8 shadow-2xl">
              <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Ledger State Flow
              </h2>
              <div className="grid md:grid-cols-4 gap-4">
                {[
                  { state: "Identified", color: "blue", icon: FileText },
                  { state: "Approved", color: "purple", icon: CheckCircle2 },
                  { state: "Realized", color: "emerald", icon: TrendingUp },
                  { state: "At-risk", color: "amber", icon: Shield }
                ].map((item, i) => (
                  <div key={i} className="relative">
                    <div className={`rounded-2xl border border-${item.color}-500/30 bg-${item.color}-500/10 backdrop-blur-xl p-6 hover:scale-105 transition-all duration-500 hover:shadow-lg hover:shadow-${item.color}-500/20`}>
                      <item.icon className={`h-8 w-8 text-${item.color}-400 mb-3`} />
                      <div className={`text-lg font-semibold text-${item.color}-300`}>{item.state}</div>
                      <div className="text-xs text-white/60 mt-2">
                        State change logged & attributable
                      </div>
                    </div>
                    {i < 3 && (
                      <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2">
                        <ArrowRight className="h-5 w-5 text-purple-400/50" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Feature Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-20">
              <div className="group rounded-3xl border border-white/10 bg-gradient-to-br from-purple-500/10 via-white/[0.03] to-transparent backdrop-blur-xl p-8 hover:scale-[1.01] transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/0 to-blue-500/0 rounded-3xl blur opacity-0 group-hover:opacity-30 group-hover:from-purple-500/50 group-hover:to-blue-500/50 transition-all duration-500" />
                <div className="relative">
                  <div className="text-2xl font-bold mb-4 text-white">What a CFO sees</div>
                  <div className="text-purple-200/70 mb-6 leading-relaxed">
                    A controlled register of economic claims: owners, due dates, receipts, aging/decay, and realized outcomes tied to action.
                  </div>
                  <ul className="space-y-3">
                    {[
                      "Reconciliation report by category and counterparty",
                      "Exceptions queue (blocked approvals, missing receipts)",
                      "Audit trail of every change (append-only events)"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="text-purple-100/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="group rounded-3xl border border-white/10 bg-gradient-to-br from-blue-500/10 via-white/[0.03] to-transparent backdrop-blur-xl p-8 hover:scale-[1.01] transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/0 to-purple-500/0 rounded-3xl blur opacity-0 group-hover:opacity-30 group-hover:from-blue-500/50 group-hover:to-purple-500/50 transition-all duration-500" />
                <div className="relative">
                  <div className="text-2xl font-bold mb-4 text-white">What capital sees</div>
                  <div className="text-blue-200/70 mb-6 leading-relaxed">
                    Reduced uncertainty: evidence packs for diligence, underwriteable value, and repeatable realization discipline post-close.
                  </div>
                  <ul className="space-y-3">
                    {[
                      "Diligence-ready 'Proof Packs'",
                      "Repeatable post-close value realization",
                      "Governance posture that survives scrutiny"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="text-blue-100/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="rounded-3xl border border-purple-500/30 bg-gradient-to-br from-purple-500/20 via-purple-500/10 to-transparent backdrop-blur-xl p-12 text-center shadow-2xl">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Ready to build your value ledger?
              </h2>
              <p className="text-purple-200/70 mb-8 max-w-2xl mx-auto">
                See how leading enterprises track, verify, and realize business value with audit-grade precision.
              </p>
              <Link
                href="/request-demo"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 px-8 py-4 text-lg font-semibold text-white hover:from-purple-600 hover:to-blue-600 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
              >
                Request Demo
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </main>

        <SiteFooter />
      </div>
    </>
  );
}