import { SEO } from "@/components/SEO";
import { Container, ProofBar, CTA, CardGrid, PageHero } from "@/components/Blocks";
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
                <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent animate-gradient">
                  Decision-grade
                </span>{" "}
                value systems for capital, operators, and advisors.
              </div>
              <div className="mt-5 text-white/70 text-lg">
                <span className="text-blue-300 animate-fade-in-1">Evidence receipts</span>,{" "}
                <span className="text-cyan-300 animate-fade-in-2">CFO-grade value accounting</span>, and{" "}
                <span className="text-blue-200 animate-fade-in-3">marketplace-native delivery</span> across Snowflake, Databricks, and ServiceNow.
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
              <div className="text-sm uppercase tracking-wider text-cyan-400 mb-3">The Problem</div>
              <h2 className="text-4xl font-semibold tracking-tight">
                Cost and operational opacity is{" "}
                <span className="text-blue-300">killing enterprise value</span>
              </h2>
              <p className="mt-5 text-white/70 text-lg">
                CFOs, CIOs, and CEOs face the same recurring nightmare: vendors claim savings, consultants promise transformation, 
                but <span className="text-cyan-300 font-medium">no one can prove it</span>. Millions are spent on initiatives with no auditable ledger, 
                no evidence trail, and no way to verify actual value delivered.
              </p>
            </div>

            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <div className="k-panel p-6">
                <div className="text-red-400 text-3xl mb-3">💸</div>
                <div className="font-semibold text-lg">Unverifiable Savings Claims</div>
                <div className="text-sm text-white/65 mt-2">
                  PBM rebates, software "optimizations," and AI tools promise millions in savings—but provide zero evidence receipts. 
                  Finance teams can't audit, boards can't verify, and value evaporates.
                </div>
              </div>

              <div className="k-panel p-6">
                <div className="text-yellow-400 text-3xl mb-3">🚨</div>
                <div className="font-semibold text-lg">No Controls, No Accountability</div>
                <div className="text-sm text-white/65 mt-2">
                  Transformation initiatives lack monitoring frameworks. When things go wrong, there's no audit trail, no rollback capability, 
                  and no way to prove fiduciary duty was maintained.
                </div>
              </div>

              <div className="k-panel p-6">
                <div className="text-orange-400 text-3xl mb-3">📊</div>
                <div className="font-semibold text-lg">Opacity Kills Valuation</div>
                <div className="text-sm text-white/65 mt-2">
                  Private equity, family offices, and capital markets demand proof of value creation. Without a ledger-based system, 
                  enterprises can't demonstrate margin improvement or operational efficiency gains.
                </div>
              </div>
            </div>
          </div>

          {/* Real-World Impact: Industry Examples */}
          <div className="mt-20 mb-16 k-panel p-8 border-purple-500/20">
            <div className="text-center mb-8">
              <div className="text-sm uppercase tracking-wider text-purple-400 mb-3">Real-World Impact</div>
              <h2 className="text-3xl font-semibold tracking-tight">
                The <span className="text-purple-300">$47 billion problem</span> executives face every quarter
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="border-l-2 border-red-400 pl-4">
                  <div className="text-red-300 font-semibold mb-1">Healthcare CFO</div>
                  <div className="text-sm text-white/70">
                    "Our PBM claimed <span className="text-red-200 font-medium">$8.2M in rebate savings</span>. When we demanded receipts, 
                    they provided a 47-page PDF with aggregated numbers. No transaction IDs, no member-level data, no way to reconcile 
                    to our claims system. We suspected <span className="text-red-300">$2.4M was phantom savings</span>, but couldn't prove it."
                  </div>
                </div>

                <div className="border-l-2 border-orange-400 pl-4">
                  <div className="text-orange-300 font-semibold mb-1">Manufacturing CIO</div>
                  <div className="text-sm text-white/70">
                    "We deployed an AI-driven supply chain optimization tool that promised <span className="text-orange-200 font-medium">18% cost reduction</span>. 
                    Six months in, our CFO asked for proof. The vendor showed us a dashboard with green arrows and percentages—but 
                    <span className="text-orange-300"> zero transaction-level evidence</span>. Board wanted receipts. We had none."
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="border-l-2 border-yellow-400 pl-4">
                  <div className="text-yellow-300 font-semibold mb-1">Financial Services CEO</div>
                  <div className="text-sm text-white/70">
                    "PE firm conducting diligence asked: 'Can you prove your operational efficiency gains?' We had <span className="text-yellow-200 font-medium">$12M in claimed savings</span> 
                    from three consulting engagements. Zero audit trail. Zero evidence receipts. 
                    <span className="text-yellow-300"> They discounted our EBITDA by $9M</span> due to unverifiable improvements."
                  </div>
                </div>

                <div className="border-l-2 border-purple-400 pl-4">
                  <div className="text-purple-300 font-semibold mb-1">Retail CIO</div>
                  <div className="text-sm text-white/70">
                    "Cloud migration partner promised <span className="text-purple-200 font-medium">$4.7M annual savings</span>. Post-migration, our AWS bill went UP by $1.2M. 
                    When confronted, they said 'savings are projected over 3 years.' No baseline, no variance tracking, 
                    <span className="text-purple-300"> no accountability</span>. CFO demanded we prove ROI to the board—we couldn't."
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-2 k-panel px-6 py-3 border-purple-400/30">
                <span className="text-purple-300 text-2xl">⚠️</span>
                <span className="text-white/80">
                  <span className="text-purple-200 font-semibold">$47B in enterprise spend annually</span> lacks verifiable evidence receipts
                </span>
              </div>
            </div>
          </div>

          {/* The Solution: Why Kincaid IQ is Different */}
          <div className="mt-20 mb-16">
            <div className="text-center max-w-4xl mx-auto">
              <div className="text-sm uppercase tracking-wider text-blue-400 mb-3">The Kincaid IQ Difference</div>
              <h2 className="text-4xl font-semibold tracking-tight">
                Make every dollar of value{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  provable and auditable
                </span>
              </h2>
              <p className="mt-5 text-white/70 text-lg">
                Kincaid IQ transforms cost and operational opacity into a <span className="text-cyan-300 font-medium">decision-grade value ledger</span>. 
                Every savings claim gets an evidence receipt. Every transformation gets controls monitoring. 
                Every board report becomes audit-ready with one click.
              </p>
            </div>

            <div className="mt-12 k-panel k-glow p-8 border-green-500/20">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="text-cyan-400 font-semibold mb-3">Traditional Approach</div>
                  <ul className="space-y-3 text-sm text-white/60">
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>Vendor provides savings estimate in PowerPoint deck</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>Finance team manually reconciles invoices months later</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>No audit trail, no evidence receipts, no accountability</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>Board asks "where's the value?" — no clear answer</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <div className="text-green-400 font-semibold mb-3">Kincaid IQ Approach</div>
                  <ul className="space-y-3 text-sm text-white/90">
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Every transaction generates an <span className="text-green-300">evidence receipt</span> with source data</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Real-time value ledger updates automatically in CFO dashboard</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Controls monitoring tracks variance, alerts on anomalies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Board-ready reports: auditable, explainable, defensible</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Core Pillars */}
          <div className="mt-20 mb-16">
            <div className="text-center mb-12">
              <div className="text-sm uppercase tracking-wider text-cyan-400 mb-3">Core System Pillars</div>
              <h2 className="text-3xl font-semibold tracking-tight">
                Built for <span className="text-blue-300">CFO rigor</span>, delivered through <span className="text-cyan-300">marketplace scale</span>
              </h2>
            </div>

            <CardGrid
              items={[
                {
                  title: "Evidence Receipts",
                  body: "Every cost reduction, optimization, or transformation action generates a cryptographically-signed evidence receipt with source data, calculation methodology, and audit trail.",
                  highlight: "cryptographically-signed evidence receipt",
                  color: "blue",
                },
                {
                  title: "CFO-Grade Value Ledger",
                  body: "A real-time, auditable ledger that tracks verified savings, cost avoidance, and margin improvements with full reconciliation to source systems and general ledger.",
                  highlight: "auditable ledger",
                  color: "cyan",
                },
                {
                  title: "Controls Monitoring",
                  body: "Continuous surveillance of transformation initiatives with variance detection, anomaly alerts, and automated rollback capabilities to maintain fiduciary duty.",
                  highlight: "variance detection, anomaly alerts",
                  color: "blue",
                },
                {
                  title: "Marketplace-Native Delivery",
                  body: "Built-in distribution through Snowflake, Databricks, and ServiceNow marketplaces. Low delivery friction, high trust, instant provisioning for enterprise buyers.",
                  highlight: "Snowflake, Databricks, and ServiceNow",
                  color: "cyan",
                },
              ]}
            />
          </div>

          {/* Use Cases by Role */}
          <div className="mt-20 mb-16">
            <div className="text-center mb-12">
              <div className="text-sm uppercase tracking-wider text-blue-400 mb-3">Decision-Maker Scenarios</div>
              <h2 className="text-3xl font-semibold tracking-tight">
                Purpose-built for <span className="text-cyan-300">C-suite accountability</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="k-panel p-6 hover:border-blue-400/30 transition border-blue-500/20">
                <div className="text-blue-400 font-bold text-sm mb-2">CFO</div>
                <div className="font-semibold text-lg mb-3">Prove Value to the Board</div>
                <div className="text-sm text-white/65">
                  "Our PBM claims $4.2M in rebate savings. Kincaid IQ's evidence receipts proved only $2.8M was real. 
                  We renegotiated the contract with audit-ready data. Board confidence restored."
                </div>
                <div className="mt-4">
                  <Link href="/actuarial-benefits" className="text-cyan-400 text-sm hover:underline">
                    Actuarial Benefits Practice →
                  </Link>
                </div>
              </div>

              <div className="k-panel p-6 hover:border-purple-400/30 transition border-purple-500/20">
                <div className="text-purple-400 font-bold text-sm mb-2">CIO</div>
                <div className="font-semibold text-lg mb-3">Control AI Transformation Risk</div>
                <div className="text-sm text-white/65">
                  "We're deploying 47 AI agents across ops and sales. Kincaid IQ's 12-month policy gives us a governance framework, 
                  variance monitoring, and kill switches if anything goes sideways."
                </div>
                <div className="mt-4">
                  <Link href="/agentic-transformation" className="text-purple-400 text-sm hover:underline">
                    Agentic Transformation →
                  </Link>
                </div>
              </div>

              <div className="k-panel p-6 hover:border-green-400/30 transition border-green-500/20">
                <div className="text-green-400 font-bold text-sm mb-2">CEO</div>
                <div className="font-semibold text-lg mb-3">Increase Enterprise Valuation</div>
                <div className="text-sm text-white/65">
                  "PE and family office investors demand proof of margin improvement. Kincaid IQ's value ledger shows verified savings, 
                  operational efficiency gains, and controls—all audit-ready for diligence."
                </div>
                <div className="mt-4">
                  <Link href="/capital-markets" className="text-green-400 text-sm hover:underline">
                    Capital Markets →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-20 mb-16 k-panel p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold">Enterprise-Grade Security and Governance</h3>
              <p className="text-white/60 mt-2">Built for regulated industries with fiduciary duty requirements</p>
            </div>

            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl mb-2">🔒</div>
                <div className="font-semibold text-sm">SOC 2 Type II</div>
                <div className="text-xs text-white/50 mt-1">Audited controls</div>
              </div>
              <div>
                <div className="text-3xl mb-2">🛡️</div>
                <div className="font-semibold text-sm">HIPAA Compliant</div>
                <div className="text-xs text-white/50 mt-1">Healthcare-ready</div>
              </div>
              <div>
                <div className="text-3xl mb-2">📋</div>
                <div className="font-semibold text-sm">Audit-Ready Trails</div>
                <div className="text-xs text-white/50 mt-1">Full provenance</div>
              </div>
              <div>
                <div className="text-3xl mb-2">⚡</div>
                <div className="font-semibold text-sm">Real-Time Monitoring</div>
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