import { SEO } from "@/components/SEO";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Shield, Lock, FileCheck, Activity, CheckCircle2, Sparkles, Database, Globe, Briefcase, Award, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SecurityGovernance() {
  return (
    <>
      <SEO
        title="Security & Governance — Kincaid IQ"
        description="Controls-first analytics with MITRE ATT&CK compliance. Evidence chains, access discipline, and audit trails that keep decision systems safe at scale."
      />
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white">
        <SiteHeader />
        
        {/* Premium 3D Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/30 via-transparent to-transparent" />
          {/* Animated background elements */}
          <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-emerald-500/5 to-transparent blur-3xl" />
        </div>

        <main className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            {/* Hero Section */}
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-xl px-4 py-2 mb-6">
                <Shield className="h-4 w-4 text-emerald-400" />
                <span className="text-sm font-semibold text-emerald-300">Enterprise-Grade Security + MITRE ATT&CK Aligned</span>
              </div>
              <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-white via-emerald-200 to-emerald-400 bg-clip-text text-transparent">
                Security & Governance
              </h1>
              <p className="text-xl text-purple-200/70 max-w-3xl mx-auto leading-relaxed">
                Controls-first analytics with MITRE ATT&CK framework compliance. Evidence chains, access discipline, and audit trails that keep decision systems safe at scale.
              </p>
            </div>

            {/* Security Metrics with Premium Design */}
            <div className="grid md:grid-cols-4 gap-6 mb-20">
              {[
                { value: "100%", label: "Audit trail coverage", color: "emerald", icon: FileCheck },
                { value: "SOC 2", label: "Type II certified", color: "violet", icon: Shield },
                { value: "MITRE", label: "ATT&CK aligned", color: "cyan", icon: Shield },
                { value: "Real-time", label: "Exception monitoring", color: "amber", icon: Activity }
              ].map((stat, i) => (
                <div 
                  key={i}
                  className={`group relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-white/[0.03] to-transparent backdrop-blur-xl p-8 hover:scale-[1.02] transition-all duration-500 hover:shadow-2xl overflow-hidden`}
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

            {/* MITRE ATT&CK Compliance Section */}
            <div className="mb-20">
              <div className="rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 via-white/[0.03] to-transparent backdrop-blur-xl p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.1),transparent_50%)]" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8">
                    <Shield className="h-10 w-10 text-cyan-400" />
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                      MITRE ATT&CK Framework Alignment
                    </h2>
                  </div>
                  <p className="text-cyan-200/70 mb-8 text-lg leading-relaxed max-w-4xl">
                    Our security architecture is aligned with the MITRE ATT&CK framework, providing comprehensive threat detection, 
                    defense strategies, and incident response capabilities across all attack surfaces.
                  </p>
                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      {
                        title: "Threat Detection",
                        description: "Real-time monitoring aligned with MITRE ATT&CK tactics and techniques",
                        metrics: ["Initial Access", "Execution", "Persistence", "Privilege Escalation"]
                      },
                      {
                        title: "Defense Strategies",
                        description: "Multi-layered security controls mapped to ATT&CK mitigations",
                        metrics: ["Data Protection", "Access Control", "Network Security", "Endpoint Defense"]
                      },
                      {
                        title: "Incident Response",
                        description: "Automated playbooks based on ATT&CK threat intelligence",
                        metrics: ["Detection", "Containment", "Eradication", "Recovery"]
                      }
                    ].map((item, i) => (
                      <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-all duration-500">
                        <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                        <p className="text-cyan-200/70 mb-4 text-sm leading-relaxed">{item.description}</p>
                        <ul className="space-y-2">
                          {item.metrics.map((metric, j) => (
                            <li key={j} className="flex items-center gap-2 text-sm text-cyan-100/80">
                              <CheckCircle2 className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                              {metric}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Core Security Features */}
            <div className="grid md:grid-cols-3 gap-8 mb-20">
              {[
                {
                  icon: FileCheck,
                  title: "Evidence Receipts Standard",
                  body: "Every claim is linked to sources, lineage, tests, and versioning—designed to be replayable and reviewable with MITRE-aligned validation.",
                  highlight: "Cryptographic signatures",
                  color: "purple"
                },
                {
                  icon: Lock,
                  title: "Access + Segregation",
                  body: "Role-based access and separation of duties patterns aligned to finance-grade controls with ATT&CK threat modeling.",
                  highlight: "Zero trust architecture",
                  color: "blue"
                },
                {
                  icon: Activity,
                  title: "Audit Trail and Monitoring",
                  body: "Append-only event journals, exception queues, and control checks with MITRE-aligned threat detection to reduce governance risk.",
                  highlight: "Immutable logs",
                  color: "emerald"
                }
              ].map((feature, i) => (
                <div 
                  key={i}
                  className={`group relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-white/[0.03] to-transparent backdrop-blur-xl p-8 hover:scale-[1.01] transition-all duration-500 hover:shadow-2xl overflow-hidden`}
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
                    desc: "without scrambling — all evidence and controls already documented with MITRE ATT&CK alignment"
                  },
                  {
                    icon: "✓",
                    color: "cyan",
                    title: "Clear accountability chains",
                    desc: "for high-impact decisions with owner assignments and approval gates mapped to threat models"
                  },
                  {
                    icon: "✓",
                    color: "violet",
                    title: "Risk reduction",
                    desc: "through controlled, measurable workflows with exception monitoring and ATT&CK-based threat detection"
                  },
                  {
                    icon: "✓",
                    color: "amber",
                    title: "No black-box AI",
                    desc: "or opaque analytics — full transparency into logic, data, and decisions with security validation"
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

            {/* Bottom CTA */}
            <div className="text-center pb-12">
              <h2 className="text-3xl font-bold text-white mb-6">Ready to secure your decision systems?</h2>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/request-demo" className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-emerald-600 hover:scale-105 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                  Schedule Security Briefing
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link href="/contact" className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:border-white/30">
                  Contact Compliance Team
                </Link>
              </div>
            </div>
          </div>
        </main>

        <SiteFooter />
      </div>
    </>
  );
}