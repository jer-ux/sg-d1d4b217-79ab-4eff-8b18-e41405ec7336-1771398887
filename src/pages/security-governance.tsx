import { SEO } from "@/components/SEO";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Shield, Lock, FileCheck, Activity, CheckCircle2, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SecurityGovernance() {
  return (
    <>
      <SEO
        title="Security & Governance — Kincaid IQ"
        description="Controls-first analytics. Evidence chains, access discipline, and audit trails that keep decision systems safe at scale."
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
            {/* Hero Section */}
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-xl px-4 py-2 mb-6">
                <Shield className="h-4 w-4 text-emerald-400" />
                <span className="text-sm font-semibold text-emerald-300">Enterprise-Grade Security</span>
              </div>
              <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-white via-emerald-200 to-emerald-400 bg-clip-text text-transparent">
                Security & Governance
              </h1>
              <p className="text-xl text-purple-200/70 max-w-3xl mx-auto leading-relaxed">
                Controls-first analytics. Evidence chains, access discipline, and audit trails that keep decision systems safe at scale.
              </p>
            </div>

            {/* Security Metrics with Premium Design */}
            <div className="grid md:grid-cols-4 gap-6 mb-20">
              {[
                { value: "100%", label: "Audit trail coverage", color: "emerald", icon: FileCheck },
                { value: "SOC 2", label: "Type II certified", color: "violet", icon: Shield },
                { value: "Zero", label: "Governance incidents", color: "cyan", icon: CheckCircle2 },
                { value: "Real-time", label: "Exception monitoring", color: "amber", icon: Activity }
              ].map((stat, i) => (
                <div 
                  key={i}
                  className="group relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-white/[0.03] to-transparent backdrop-blur-xl p-8 hover:scale-[1.02] transition-all duration-500 hover:shadow-2xl"
                >
                  <div className={`absolute -inset-0.5 bg-gradient-to-r from-${stat.color}-500/0 to-${stat.color}-500/0 rounded-3xl blur opacity-0 group-hover:opacity-30 group-hover:from-${stat.color}-500/50 group-hover:to-${stat.color}-500/50 transition-all duration-500`} />
                  <div className="relative">
                    <stat.icon className={`h-8 w-8 text-${stat.color}-400 mb-4`} />
                    <div className={`text-5xl font-bold bg-gradient-to-r from-${stat.color}-400 to-${stat.color}-200 bg-clip-text text-transparent mb-3`}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-white/60">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Core Security Features */}
            <div className="grid md:grid-cols-3 gap-8 mb-20">
              {[
                {
                  icon: FileCheck,
                  title: "Evidence Receipts Standard",
                  body: "Every claim is linked to sources, lineage, tests, and versioning—designed to be replayable and reviewable.",
                  highlight: "Cryptographic signatures",
                  color: "purple"
                },
                {
                  icon: Lock,
                  title: "Access + Segregation",
                  body: "Role-based access and separation of duties patterns aligned to finance-grade controls.",
                  highlight: "Zero trust architecture",
                  color: "blue"
                },
                {
                  icon: Activity,
                  title: "Audit Trail and Monitoring",
                  body: "Append-only event journals, exception queues, and control checks to reduce governance risk.",
                  highlight: "Immutable logs",
                  color: "emerald"
                }
              ].map((feature, i) => (
                <div 
                  key={i}
                  className="group relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-white/[0.03] to-transparent backdrop-blur-xl p-8 hover:scale-[1.01] transition-all duration-500 hover:shadow-2xl"
                >
                  <div className={`absolute -inset-0.5 bg-gradient-to-r from-${feature.color}-500/0 to-${feature.color}-500/0 rounded-3xl blur opacity-0 group-hover:opacity-30 group-hover:from-${feature.color}-500/50 group-hover:to-${feature.color}-500/50 transition-all duration-500`} />
                  <div className="relative">
                    <feature.icon className={`h-10 w-10 text-${feature.color}-400 mb-4`} />
                    <h3 className="text-2xl font-semibold mb-4 text-white">{feature.title}</h3>
                    <p className="text-purple-200/70 mb-4 leading-relaxed">{feature.body}</p>
                    <div className={`inline-flex items-center gap-2 rounded-full border border-${feature.color}-500/30 bg-${feature.color}-500/10 px-3 py-1.5 text-xs font-semibold text-${feature.color}-300`}>
                      <Sparkles className="h-3 w-3" />
                      {feature.highlight}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Governance & Security Principles */}
            <div className="grid md:grid-cols-2 gap-8 mb-20">
              <div className="group relative rounded-3xl border border-white/10 bg-gradient-to-br from-purple-500/10 via-white/[0.03] to-transparent backdrop-blur-xl p-10 hover:scale-[1.01] transition-all duration-500 hover:shadow-2xl">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/0 to-violet-500/0 rounded-3xl blur opacity-0 group-hover:opacity-30 group-hover:from-purple-500/50 group-hover:to-violet-500/50 transition-all duration-500" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <Shield className="h-8 w-8 text-purple-400" />
                    <h3 className="text-2xl font-semibold text-white">Governance Principle</h3>
                  </div>
                  <p className="text-purple-200/70 mb-6 text-lg leading-relaxed">
                    If it can't be explained, replayed, and reconciled, it's not decision-grade.
                  </p>
                  <ul className="space-y-4">
                    {[
                      "Complete data lineage from source to decision",
                      "Version control for all logic and rules",
                      "Reconciliation workflows with variance tracking",
                      "Board-ready evidence packs on demand"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                        <span className="text-purple-100/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="group relative rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-500/10 via-white/[0.03] to-transparent backdrop-blur-xl p-10 hover:scale-[1.01] transition-all duration-500 hover:shadow-2xl">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/0 to-teal-500/0 rounded-3xl blur opacity-0 group-hover:opacity-30 group-hover:from-emerald-500/50 group-hover:to-teal-500/50 transition-all duration-500" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <Lock className="h-8 w-8 text-emerald-400" />
                    <h3 className="text-2xl font-semibold text-white">Security Posture</h3>
                  </div>
                  <p className="text-emerald-200/70 mb-6 text-lg leading-relaxed">
                    Access controls, data lineage, and exception monitoring built into every workflow—not bolted on after.
                  </p>
                  <ul className="space-y-4">
                    {[
                      "Encryption at rest and in transit (AES-256)",
                      "Multi-factor authentication mandatory",
                      "API keys with granular scope control",
                      "SOC 2 Type II + HIPAA compliance"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="text-emerald-100/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Why It Matters for Boards */}
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-white/[0.03] to-transparent backdrop-blur-xl p-10 mb-20 shadow-2xl">
              <div className="flex items-center gap-3 mb-8">
                <Activity className="h-10 w-10 text-cyan-400" />
                <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                  Why it matters for boards
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    icon: "✓",
                    color: "emerald",
                    title: "Regulatory audit readiness",
                    desc: "without scrambling — all evidence and controls already documented"
                  },
                  {
                    icon: "✓",
                    color: "cyan",
                    title: "Clear accountability chains",
                    desc: "for high-impact decisions with owner assignments and approval gates"
                  },
                  {
                    icon: "✓",
                    color: "violet",
                    title: "Risk reduction",
                    desc: "through controlled, measurable workflows with exception monitoring"
                  },
                  {
                    icon: "✓",
                    color: "amber",
                    title: "No black-box AI",
                    desc: "or opaque analytics — full transparency into logic, data, and decisions"
                  }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-500">
                    <div className={`text-${item.color}-400 text-2xl font-bold`}>{item.icon}</div>
                    <div>
                      <div className="text-white font-semibold mb-2">{item.title}</div>
                      <div className="text-white/60 text-sm leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/20 via-emerald-500/10 to-transparent backdrop-blur-xl p-12 text-center shadow-2xl">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
                Ready to secure your data operations?
              </h2>
              <p className="text-emerald-200/70 mb-8 max-w-2xl mx-auto">
                See how enterprise security and governance controls are built into every layer of the platform.
              </p>
              <Link
                href="/request-demo"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-4 text-lg font-semibold text-white hover:from-emerald-600 hover:to-teal-600 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/50"
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