import { SEO } from "@/components/SEO";
import { Container, ProofBar, CTA, CardGrid } from "@/components/Blocks";
import { Hero3D } from "@/components/Hero3D";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <SEO
        title="Kincaid IQ — Decision-Grade Value Systems"
        description="Evidence receipts, CFO-grade value ledger, and marketplace-native delivery across Snowflake, Databricks, and ServiceNow."
      />

      <div className="relative overflow-hidden">
        <div className="absolute inset-0 k-grid pointer-events-none" />

        <Container>
          {/* Hero Section */}
          <div className="pt-14 pb-10 grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="text-5xl font-semibold tracking-tight">
                <span className="text-orange-500">
                  Decision-grade
                </span>{" "}
                value systems for capital, operators, and advisors.
              </div>
              <div className="mt-5 text-white/70 text-lg">
                <span className="text-blue-300 animate-fade-in-1">Evidence receipts</span>,{" "}
                <span className="text-violet-300 animate-fade-in-2">CFO-grade value accounting</span>, and{" "}
                <span className="text-cyan-300 animate-fade-in-3">marketplace-native delivery</span> across Snowflake, Databricks, and ServiceNow.
              </div>
              <div className="mt-6">
                <ProofBar />
              </div>
            </div>
            <Hero3D />
          </div>

          {/* The Problem: Why Kincaid IQ Exists */}
          <div className="mt-20 mb-16">
            <div className="text-center max-w-4xl mx-auto">
              <div className="text-sm uppercase tracking-wider text-amber-400 mb-3 animate-fade-in">The Problem</div>
              <h2 className="text-4xl font-semibold tracking-tight animate-fade-in">
                Cost and operational opacity is{" "}
                <span className="gradient-amber-rose">killing enterprise value</span>
              </h2>
              <p className="mt-5 text-white/70 text-lg animate-fade-in">
                CFOs, CIOs, and CEOs face the same recurring nightmare: vendors claim savings, consultants promise transformation, 
                but <span className="text-rose-300 font-medium">no one can prove it</span>. Millions are spent on initiatives with no auditable ledger, 
                no evidence trail, and no way to verify actual value delivered.
              </p>
            </div>

            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <div className="k-panel p-6 hover-lift border-rose-500/20">
                <div className="text-rose-400 text-3xl mb-3 animate-fade-in">💸</div>
                <div className="font-semibold text-lg gradient-amber-rose">Unverifiable Savings Claims</div>
                <div className="text-sm text-white/65 mt-2">
                  PBM rebates, software "optimizations," and AI tools promise millions in savings—but provide zero evidence receipts. 
                  Finance teams can't audit, boards can't verify, and value evaporates.
                </div>
              </div>

              <div className="k-panel p-6 hover-lift border-amber-500/20">
                <div className="text-amber-400 text-3xl mb-3 animate-fade-in">🚨</div>
                <div className="font-semibold text-lg text-amber-300">No Controls, No Accountability</div>
                <div className="text-sm text-white/65 mt-2">
                  Transformation initiatives lack monitoring frameworks. When things go wrong, there's no audit trail, no rollback capability, 
                  and no way to prove fiduciary duty was maintained.
                </div>
              </div>

              <div className="k-panel p-6 hover-lift border-orange-500/20">
                <div className="text-orange-400 text-3xl mb-3 animate-fade-in">📊</div>
                <div className="font-semibold text-lg text-orange-300">Opacity Kills Valuation</div>
                <div className="text-sm text-white/65 mt-2">
                  Private equity, family offices, and capital markets demand proof of value creation. Without a ledger-based system, 
                  enterprises can't demonstrate margin improvement or operational efficiency gains.
                </div>
              </div>
            </div>
          </div>

          {/* Real-World Impact: Industry Examples */}
          <div className="mt-20 mb-16 k-panel p-8 border-purple-500/20 hover-lift">
            <div className="text-center mb-8">
              <div className="text-sm uppercase tracking-wider text-violet-400 mb-3">Real-World Impact</div>
              <h2 className="text-3xl font-semibold tracking-tight">
                The <span className="gradient-violet-fuchsia">$47 billion problem</span> executives face every quarter
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="border-l-2 border-rose-400 pl-4 hover-lift">
                  <div className="text-rose-300 font-semibold mb-1">Healthcare CFO, $250M Revenue</div>
                  <div className="text-sm text-white/70">
                    "Our PBM claimed <span className="text-rose-200 font-medium">$8.2M in rebate savings</span>. When we demanded receipts, 
                    they provided a 47-page PDF with aggregated numbers. No transaction IDs, no member-level data, no way to reconcile 
                    to our claims system. We suspected <span className="text-rose-300">$2.4M was phantom savings</span>, but couldn't prove it."
                  </div>
                </div>

                <div className="border-l-2 border-orange-400 pl-4 hover-lift">
                  <div className="text-orange-300 font-semibold mb-1">Manufacturing CIO, $180M Revenue</div>
                  <div className="text-sm text-white/70">
                    "We deployed an AI-driven supply chain optimization tool that promised <span className="text-orange-200 font-medium">18% cost reduction</span>. 
                    Six months in, our CFO asked for proof. The vendor showed us a dashboard with green arrows and percentages—but 
                    <span className="text-orange-300"> zero transaction-level evidence</span>. Board wanted receipts. We had none."
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="border-l-2 border-amber-400 pl-4 hover-lift">
                  <div className="text-amber-300 font-semibold mb-1">Financial Services CEO, $320M Revenue</div>
                  <div className="text-sm text-white/70">
                    "PE firm conducting diligence asked: 'Can you prove your operational efficiency gains?' We had <span className="text-amber-200 font-medium">$12M in claimed savings</span> 
                    from three consulting engagements. Zero audit trail. Zero evidence receipts. 
                    <span className="text-amber-300"> They discounted our EBITDA by $9M</span> due to unverifiable improvements."
                  </div>
                </div>

                <div className="border-l-2 border-violet-400 pl-4 hover-lift">
                  <div className="text-violet-300 font-semibold mb-1">Retail CIO, $140M Revenue</div>
                  <div className="text-sm text-white/70">
                    "Cloud migration partner promised <span className="text-violet-200 font-medium">$4.7M annual savings</span>. Post-migration, our AWS bill went UP by $1.2M. 
                    When confronted, they said 'savings are projected over 3 years.' No baseline, no variance tracking, 
                    <span className="text-violet-300"> no accountability</span>. CFO demanded we prove ROI to the board—we couldn't."
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-2 k-panel px-6 py-3 border-fuchsia-400/30 animate-pulse-glow">
                <span className="text-fuchsia-300 text-2xl">⚠️</span>
                <span className="text-white/80">
                  <span className="gradient-violet-fuchsia font-semibold">$47B in enterprise spend annually</span> lacks verifiable evidence receipts
                </span>
              </div>
            </div>
          </div>

          {/* The Cost of Opacity: Real Examples with Animated Stats */}
          <div className="mt-20 mb-16">
            <div className="text-center mb-12">
              <div className="text-sm uppercase tracking-wider text-rose-400 mb-3">The Cost of Opacity</div>
              <h2 className="text-3xl font-semibold tracking-tight">
                Real examples: <span className="gradient-amber-rose">Where millions evaporate</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="k-panel p-6 hover-lift border-rose-500/20">
                <div className="text-center mb-4">
                  <div className="text-5xl font-bold gradient-amber-rose animate-count-up">$47M</div>
                  <div className="text-xs text-white/50 mt-2">Regional Healthcare System PBM Claim</div>
                </div>
                <div className="text-sm text-white/70 mb-3">
                  $380M revenue healthcare system with <span className="text-rose-300">$47M in "rebate savings"</span> promised by PBM over 3 years.
                </div>
                <div className="border-t border-white/10 pt-3 mt-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-white/50">Proven & Realized</span>
                    <span className="text-emerald-300 font-semibold">$11M</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-white/50">Evaporated Value</span>
                    <span className="text-rose-300 font-semibold">$36M (76%)</span>
                  </div>
                </div>
              </div>

              <div className="k-panel p-6 hover-lift border-violet-500/20">
                <div className="text-center mb-4">
                  <div className="text-5xl font-bold gradient-violet-fuchsia animate-count-up">200+</div>
                  <div className="text-xs text-white/50 mt-2">AI "Opportunities" Identified</div>
                </div>
                <div className="text-sm text-white/70 mb-3">
                  $420M revenue financial services firm committed to "AI transformation" with <span className="text-violet-300">200+ use cases</span>.
                </div>
                <div className="border-t border-white/10 pt-3 mt-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-white/50">Controlled Deployments</span>
                    <span className="text-emerald-300 font-semibold">12 agents</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-white/50">Measured ROI</span>
                    <span className="text-violet-300 font-semibold">$3.2M verified</span>
                  </div>
                </div>
              </div>

              <div className="k-panel p-6 hover-lift border-amber-500/20">
                <div className="text-center mb-4">
                  <div className="text-5xl font-bold text-amber-300 animate-count-up">$18M</div>
                  <div className="text-xs text-white/50 mt-2">PE Portfolio "Cost Synergies"</div>
                </div>
                <div className="text-sm text-white/70 mb-3">
                  Mid-market PE portfolio company with <span className="text-amber-300">$18M in claimed synergies</span>. Buyer demanded proof.
                </div>
                <div className="border-t border-white/10 pt-3 mt-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-white/50">Proven Realized</span>
                    <span className="text-emerald-300 font-semibold">$7.4M</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-white/50">In-Flight (Tracked)</span>
                    <span className="text-cyan-300 font-semibold">$4.1M</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* The Solution: Why Kincaid IQ is Different */}
          <div className="mt-20 mb-16">
            <div className="text-center max-w-4xl mx-auto">
              <div className="text-sm uppercase tracking-wider text-emerald-400 mb-3">The Kincaid IQ Difference</div>
              <h2 className="text-4xl font-semibold tracking-tight">
                Make every dollar of value{" "}
                <span className="gradient-emerald-teal">
                  provable and auditable
                </span>
              </h2>
              <p className="mt-5 text-white/70 text-lg">
                Kincaid IQ transforms cost and operational opacity into a <span className="text-emerald-300 font-medium">decision-grade value ledger</span>. 
                Every savings claim gets an evidence receipt. Every transformation gets controls monitoring. 
                Every board report becomes audit-ready with one click.
              </p>
            </div>

            <div className="mt-12 k-panel k-glow p-8 border-emerald-500/20">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="text-rose-400 font-semibold mb-3 flex items-center gap-2">
                    <span className="text-xl">✗</span> Traditional Approach
                  </div>
                  <ul className="space-y-3 text-sm text-white/60">
                    <li className="flex items-start gap-2">
                      <span className="text-rose-400 mt-1">✗</span>
                      <span>Vendor provides savings estimate in PowerPoint deck</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-400 mt-1">✗</span>
                      <span>Finance team manually reconciles invoices months later</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-400 mt-1">✗</span>
                      <span>No audit trail, no evidence receipts, no accountability</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-400 mt-1">✗</span>
                      <span>Board asks "where's the value?" — no clear answer</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <div className="text-emerald-400 font-semibold mb-3 flex items-center gap-2">
                    <span className="text-xl">✓</span> Kincaid IQ Approach
                  </div>
                  <ul className="space-y-3 text-sm text-white/90">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-1">✓</span>
                      <span>Every transaction generates an <span className="text-emerald-300">evidence receipt</span> with source data</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-1">✓</span>
                      <span>Real-time value ledger updates automatically in CFO dashboard</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-1">✓</span>
                      <span>Controls monitoring tracks variance, alerts on anomalies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-1">✓</span>
                      <span>Board-ready reports: auditable, explainable, defensible</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Core Pillars with Interactive Cards */}
          <div className="mt-20 mb-16">
            <div className="text-center mb-12">
              <div className="text-sm uppercase tracking-wider text-cyan-400 mb-3">Core System Pillars</div>
              <h2 className="text-3xl font-semibold tracking-tight">
                Built for <span className="gradient-blue-cyan">CFO rigor</span>, delivered through <span className="gradient-emerald-teal">marketplace scale</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="k-panel p-6 hover-lift border-blue-500/20">
                <div className="text-3xl mb-3">📋</div>
                <div className="font-semibold text-lg gradient-blue-cyan mb-2">Evidence Receipts</div>
                <div className="text-sm text-white/65">
                  Every cost reduction, optimization, or transformation action generates a <span className="text-blue-300">cryptographically-signed evidence receipt</span> with source data, calculation methodology, and audit trail.
                </div>
              </div>

              <div className="k-panel p-6 hover-lift border-cyan-500/20">
                <div className="text-3xl mb-3">💎</div>
                <div className="font-semibold text-lg text-cyan-300 mb-2">CFO-Grade Value Ledger</div>
                <div className="text-sm text-white/65">
                  A real-time, <span className="text-cyan-300">auditable ledger</span> that tracks verified savings, cost avoidance, and margin improvements with full reconciliation to source systems and general ledger.
                </div>
              </div>

              <div className="k-panel p-6 hover-lift border-violet-500/20">
                <div className="text-3xl mb-3">🛡️</div>
                <div className="font-semibold text-lg gradient-violet-fuchsia mb-2">Controls Monitoring</div>
                <div className="text-sm text-white/65">
                  Continuous surveillance of transformation initiatives with <span className="text-violet-300">variance detection, anomaly alerts</span>, and automated rollback capabilities to maintain fiduciary duty.
                </div>
              </div>

              <div className="k-panel p-6 hover-lift border-emerald-500/20">
                <div className="text-3xl mb-3">🌐</div>
                <div className="font-semibold text-lg gradient-emerald-teal mb-2">Marketplace-Native Delivery</div>
                <div className="text-sm text-white/65">
                  Built-in distribution through <span className="text-emerald-300">Snowflake, Databricks, and ServiceNow</span> marketplaces. Low delivery friction, high trust, instant provisioning for enterprise buyers.
                </div>
              </div>
            </div>
          </div>

          {/* Use Cases by Role */}
          <div className="mt-20 mb-16">
            <div className="text-center mb-12">
              <div className="text-sm uppercase tracking-wider text-violet-400 mb-3">Decision-Maker Scenarios</div>
              <h2 className="text-3xl font-semibold tracking-tight">
                Purpose-built for <span className="gradient-violet-fuchsia">C-suite accountability</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="k-panel p-6 hover-lift border-emerald-500/20">
                <div className="text-emerald-400 font-bold text-sm mb-2">CFO</div>
                <div className="font-semibold text-lg mb-3 gradient-emerald-teal">Prove Value to the Board</div>
                <div className="text-sm text-white/65">
                  "Our PBM claims $4.2M in rebate savings. Kincaid IQ's evidence receipts proved only $2.8M was real. 
                  We renegotiated the contract with audit-ready data. Board confidence restored."
                </div>
                <div className="mt-4 space-y-2">
                  <Link href="/ledger" className="text-emerald-400 text-sm hover:underline flex items-center gap-1">
                    Verified Savings Ledger <span>→</span>
                  </Link>
                  <Link href="/actuarial-benefits" className="text-emerald-400 text-sm hover:underline flex items-center gap-1">
                    Actuarial Benefits Practice <span>→</span>
                  </Link>
                </div>
              </div>

              <div className="k-panel p-6 hover-lift border-violet-500/20">
                <div className="text-violet-400 font-bold text-sm mb-2">CIO</div>
                <div className="font-semibold text-lg mb-3 gradient-violet-fuchsia">Control AI Transformation Risk</div>
                <div className="text-sm text-white/65">
                  "We're deploying 47 AI agents across ops and sales. Kincaid IQ's 12-month policy gives us a governance framework, 
                  variance monitoring, and kill switches if anything goes sideways."
                </div>
                <div className="mt-4">
                  <Link href="/agentic-transformation" className="text-violet-400 text-sm hover:underline flex items-center gap-1">
                    Agentic Transformation <span>→</span>
                  </Link>
                </div>
              </div>

              <div className="k-panel p-6 hover-lift border-cyan-500/20">
                <div className="text-cyan-400 font-bold text-sm mb-2">CEO</div>
                <div className="font-semibold text-lg mb-3 gradient-blue-cyan">Increase Enterprise Valuation</div>
                <div className="text-sm text-white/65">
                  "PE and family office investors demand proof of margin improvement. Kincaid IQ's value ledger shows verified savings, 
                  operational efficiency gains, and controls—all audit-ready for diligence."
                </div>
                <div className="mt-4">
                  <Link href="/capital-markets" className="text-cyan-400 text-sm hover:underline flex items-center gap-1">
                    Capital Markets <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Indicators with Animated Elements */}
          <div className="mt-20 mb-16 k-panel p-8 border-violet-500/20">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold gradient-violet-fuchsia">Enterprise-Grade Security and Governance</h3>
              <p className="text-white/60 mt-2">Built for regulated industries with fiduciary duty requirements</p>
            </div>

            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div className="hover-lift">
                <div className="text-3xl mb-2">🔒</div>
                <div className="font-semibold text-sm text-violet-300">SOC 2 Type II</div>
                <div className="text-xs text-white/50 mt-1">Audited controls</div>
              </div>
              <div className="hover-lift">
                <div className="text-3xl mb-2">🛡️</div>
                <div className="font-semibold text-sm text-emerald-300">HIPAA Compliant</div>
                <div className="text-xs text-white/50 mt-1">Healthcare-ready</div>
              </div>
              <div className="hover-lift">
                <div className="text-3xl mb-2">📋</div>
                <div className="font-semibold text-sm text-cyan-300">Audit-Ready Trails</div>
                <div className="text-xs text-white/50 mt-1">Full provenance</div>
              </div>
              <div className="hover-lift">
                <div className="text-3xl mb-2">⚡</div>
                <div className="font-semibold text-sm text-amber-300">Real-Time Monitoring</div>
                <div className="text-xs text-white/50 mt-1">Continuous controls</div>
              </div>
            </div>
          </div>

          <CTA />
        </Container>
      </div>
    </>
  );
}