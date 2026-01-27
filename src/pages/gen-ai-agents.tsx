import { SEO } from "@/components/SEO";
import { Container, CTA } from "@/components/Blocks";
import Link from "next/link";
import { Shield, Zap, Activity, AlertTriangle, CheckCircle2, Clock, TrendingUp, Lock } from "lucide-react";

export default function GenAIAgents() {
  return (
    <>
      <SEO
        title="Gen AI Agents — Governed Deployment at Scale | Kincaid IQ"
        description="Deploy AI agents with enterprise-grade controls, real-time monitoring, and evidence-based ROI tracking. Governance frameworks for CIOs and risk officers."
      />

      <div className="relative overflow-hidden">
        <div className="absolute inset-0 k-grid pointer-events-none" />

        <Container>
          {/* Hero Section */}
          <div className="pt-20 pb-16 max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 k-panel px-4 py-2 border-violet-400/30 mb-6">
              <Zap className="w-4 h-4 text-violet-400" />
              <span className="text-sm text-violet-300">Enterprise AI Governance</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-semibold tracking-tight mb-6">
              Deploy AI agents with{" "}
              <span className="gradient-violet-fuchsia">controls, not chaos</span>
            </h1>

            <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
              CIOs and risk officers need governance frameworks that enable AI agent deployment 
              while maintaining fiduciary duty. Kincaid IQ provides real-time monitoring, 
              variance detection, and automated rollback capabilities for enterprise AI transformation.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-6 py-3 rounded-xl bg-violet-500 text-white hover:bg-violet-600 transition font-medium"
              >
                Request Demo
              </Link>
              <Link
                href="/agentic-transformation"
                className="px-6 py-3 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition"
              >
                Agentic Transformation Framework
              </Link>
            </div>
          </div>

          {/* The Problem: AI Deployment Without Controls */}
          <div className="mt-20 mb-16">
            <div className="text-center max-w-4xl mx-auto mb-12">
              <div className="text-sm uppercase tracking-wider text-rose-400 mb-3">The Risk</div>
              <h2 className="text-4xl font-semibold tracking-tight">
                Unchecked AI agents create{" "}
                <span className="gradient-amber-rose">operational and fiduciary risk</span>
              </h2>
              <p className="mt-5 text-white/70 text-lg">
                Organizations rush to deploy dozens of AI agents across operations, sales, and support—but 
                lack governance frameworks. When agents make bad decisions, there's no audit trail, no variance 
                detection, and no accountability. Boards demand controls. CIOs need answers.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="k-panel p-6 hover-lift border-rose-500/20">
                <AlertTriangle className="w-10 h-10 text-rose-400 mb-4" />
                <div className="font-semibold text-lg gradient-amber-rose mb-2">No Monitoring Framework</div>
                <div className="text-sm text-white/65">
                  AI agents operate autonomously with no real-time oversight. When errors cascade through 
                  customer interactions or financial decisions, IT discovers it weeks later through incident reports.
                </div>
              </div>

              <div className="k-panel p-6 hover-lift border-amber-500/20">
                <Shield className="w-10 h-10 text-amber-400 mb-4" />
                <div className="font-semibold text-lg text-amber-300 mb-2">Zero Accountability Trail</div>
                <div className="text-sm text-white/65">
                  Legal and compliance teams ask: "Who approved this agent decision? What was the logic? 
                  Where's the audit log?" The answer: buried in LLM telemetry with no forensic capability.
                </div>
              </div>

              <div className="k-panel p-6 hover-lift border-orange-500/20">
                <TrendingUp className="w-10 h-10 text-orange-400 mb-4" />
                <div className="font-semibold text-lg text-orange-300 mb-2">Unverifiable ROI Claims</div>
                <div className="text-sm text-white/65">
                  Vendors promise "40% efficiency gains" and "3x productivity." CFO demands proof. 
                  No baseline metrics, no variance tracking, no evidence receipts—just dashboards with green arrows.
                </div>
              </div>
            </div>
          </div>

          {/* Real-World Incidents */}
          <div className="mt-20 mb-16 k-panel p-8 border-rose-500/20">
            <div className="text-center mb-8">
              <div className="text-sm uppercase tracking-wider text-rose-400 mb-3">Real Incidents</div>
              <h2 className="text-3xl font-semibold tracking-tight">
                What happens when AI agents run <span className="gradient-amber-rose">without governance</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="border-l-2 border-rose-400 pl-4">
                <div className="text-rose-300 font-semibold mb-2">Financial Services CIO, $420M Revenue</div>
                <div className="text-sm text-white/70">
                  "We deployed an AI agent to handle tier-1 customer support queries. Three weeks in, 
                  we discovered it was <span className="text-rose-300 font-medium">providing incorrect information about investment products</span>—potential 
                  regulatory violation. Legal demanded: 'How many customers received bad advice? What's the liability?' 
                  We had no audit trail, no variance detection, <span className="text-rose-400">no way to quantify exposure</span>."
                </div>
              </div>

              <div className="border-l-2 border-orange-400 pl-4">
                <div className="text-orange-300 font-semibold mb-2">Healthcare IT Director, $180M Revenue</div>
                <div className="text-sm text-white/70">
                  "Our prior authorization AI agent was supposed to reduce review time by 60%. Instead, 
                  it started <span className="text-orange-300 font-medium">auto-denying legitimate claims</span> due to model drift. Patient complaints spiked. 
                  CFO asked: 'What's the financial impact? How do we roll back?' We couldn't answer—<span className="text-orange-400">no kill switch, 
                  no baseline comparison</span>, no governance policy."
                </div>
              </div>

              <div className="border-l-2 border-amber-400 pl-4">
                <div className="text-amber-300 font-semibold mb-2">Retail Operations VP, $250M Revenue</div>
                <div className="text-sm text-white/70">
                  "We implemented AI-driven inventory optimization. The agent started <span className="text-amber-300 font-medium">ordering 3x normal quantities</span> 
                  for certain SKUs, thinking it detected demand patterns. Warehouse overflowed. 
                  Board demanded: 'Who approved this? What's the write-off exposure?' IT had <span className="text-amber-400">no variance alerts, 
                  no rollback capability</span>."
                </div>
              </div>

              <div className="border-l-2 border-violet-400 pl-4">
                <div className="text-violet-300 font-semibold mb-2">SaaS CFO, $95M Revenue</div>
                <div className="text-sm text-white/70">
                  "Our sales AI agent was supposed to qualify leads and schedule demos. After deployment, 
                  close rates <span className="text-violet-300 font-medium">dropped 22%</span>. Sales leadership said the agent was routing high-value prospects 
                  to junior reps. CTO asked: 'Where's the decision logic? How do we audit this?' 
                  The answer: <span className="text-violet-400">buried in LLM logs with no forensic trace</span>."
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-2 k-panel px-6 py-3 border-rose-400/30">
                <AlertTriangle className="w-5 h-5 text-rose-400" />
                <span className="text-white/80">
                  <span className="gradient-amber-rose font-semibold">73% of enterprises</span> deploy AI agents without continuous monitoring frameworks
                </span>
              </div>
            </div>
          </div>

          {/* The Kincaid IQ Solution */}
          <div className="mt-20 mb-16">
            <div className="text-center max-w-4xl mx-auto mb-12">
              <div className="text-sm uppercase tracking-wider text-emerald-400 mb-3">The Kincaid IQ Approach</div>
              <h2 className="text-4xl font-semibold tracking-tight">
                Deploy AI agents with{" "}
                <span className="gradient-emerald-teal">enterprise-grade governance</span>
              </h2>
              <p className="mt-5 text-white/70 text-lg">
                Kincaid IQ provides CIOs with a comprehensive governance framework for AI agent deployment: 
                real-time monitoring, variance detection, automated rollback, and evidence-based ROI tracking. 
                Maintain fiduciary duty while enabling transformation.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="k-panel p-8 hover-lift border-emerald-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <Activity className="w-8 h-8 text-emerald-400" />
                  <h3 className="text-xl font-semibold gradient-emerald-teal">Real-Time Agent Monitoring</h3>
                </div>
                <p className="text-white/70 mb-4">
                  Continuous surveillance of every AI agent decision, action, and output. Track performance 
                  metrics, error rates, and deviation from baseline behavior in real-time dashboards.
                </p>
                <ul className="space-y-2 text-sm text-white/65">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>Decision-level telemetry with full audit trail</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>Anomaly detection alerts when agent behavior drifts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>Baseline comparison against pre-deployment metrics</span>
                  </li>
                </ul>
              </div>

              <div className="k-panel p-8 hover-lift border-cyan-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-8 h-8 text-cyan-400" />
                  <h3 className="text-xl font-semibold gradient-blue-cyan">Automated Governance Controls</h3>
                </div>
                <p className="text-white/70 mb-4">
                  Pre-configured policies with automated enforcement. When an agent violates thresholds 
                  (error rate, cost overrun, decision variance), the system automatically triggers alerts or rollback.
                </p>
                <ul className="space-y-2 text-sm text-white/65">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>Kill switches for immediate agent suspension</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>Variance thresholds with escalation workflows</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>Approval gates for high-risk agent decisions</span>
                  </li>
                </ul>
              </div>

              <div className="k-panel p-8 hover-lift border-violet-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <Lock className="w-8 h-8 text-violet-400" />
                  <h3 className="text-xl font-semibold gradient-violet-fuchsia">Evidence-Based Audit Trails</h3>
                </div>
                <p className="text-white/70 mb-4">
                  Every agent action generates an evidence receipt with decision logic, input data, and outcome. 
                  Legal, compliance, and audit teams get forensic-grade records for regulatory inquiries.
                </p>
                <ul className="space-y-2 text-sm text-white/65">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-violet-400 mt-0.5 flex-shrink-0" />
                    <span>Cryptographically-signed decision logs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-violet-400 mt-0.5 flex-shrink-0" />
                    <span>Reproducible agent reasoning with input snapshots</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-violet-400 mt-0.5 flex-shrink-0" />
                    <span>Compliance-ready reports for regulators and auditors</span>
                  </li>
                </ul>
              </div>

              <div className="k-panel p-8 hover-lift border-amber-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-8 h-8 text-amber-400" />
                  <h3 className="text-xl font-semibold text-amber-300">ROI Verification & Value Tracking</h3>
                </div>
                <p className="text-white/70 mb-4">
                  Move beyond vendor promises to verified outcomes. Track agent-driven cost reductions, 
                  efficiency gains, and revenue impact with evidence receipts tied to your value ledger.
                </p>
                <ul className="space-y-2 text-sm text-white/65">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    <span>Baseline vs. actual performance metrics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    <span>Cost attribution per agent and use case</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    <span>Board-ready ROI reports with audit trail</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Deployment Framework: 12-Month Policy */}
          <div className="mt-20 mb-16">
            <div className="text-center max-w-4xl mx-auto mb-12">
              <div className="text-sm uppercase tracking-wider text-cyan-400 mb-3">Governance Framework</div>
              <h2 className="text-4xl font-semibold tracking-tight">
                The <span className="gradient-blue-cyan">12-month AI deployment policy</span>
              </h2>
              <p className="mt-5 text-white/70 text-lg">
                Kincaid IQ's proven phased approach balances innovation velocity with risk management. 
                CIOs maintain control while enabling organizational AI transformation.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="k-panel p-6 hover-lift border-blue-500/20">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-6 h-6 text-blue-400" />
                  <div className="font-semibold text-lg text-blue-300">Months 1-4: Observe</div>
                </div>
                <div className="text-sm text-white/65 mb-4">
                  Deploy agents in read-only or shadow mode. Monitor decision patterns, error rates, 
                  and variance against human baseline. Build confidence before live deployment.
                </div>
                <div className="space-y-2 text-xs text-white/50">
                  <div>✓ Baseline metrics established</div>
                  <div>✓ Agent behavior profiled</div>
                  <div>✓ Risk assessment completed</div>
                </div>
              </div>

              <div className="k-panel p-6 hover-lift border-cyan-500/20">
                <div className="flex items-center gap-2 mb-4">
                  <Activity className="w-6 h-6 text-cyan-400" />
                  <div className="font-semibold text-lg text-cyan-300">Months 5-8: Control</div>
                </div>
                <div className="text-sm text-white/65 mb-4">
                  Graduate to production with automated controls. Real-time monitoring, variance alerts, 
                  and rollback capabilities active. Human oversight for high-risk decisions.
                </div>
                <div className="space-y-2 text-xs text-white/50">
                  <div>✓ Governance policies enforced</div>
                  <div>✓ Anomaly detection live</div>
                  <div>✓ Evidence receipts generated</div>
                </div>
              </div>

              <div className="k-panel p-6 hover-lift border-violet-500/20">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-6 h-6 text-violet-400" />
                  <div className="font-semibold text-lg gradient-violet-fuchsia">Months 9-12: Scale</div>
                </div>
                <div className="text-sm text-white/65 mb-4">
                  Expand agent deployment across additional use cases with validated governance framework. 
                  Continuous improvement based on variance analysis and ROI verification.
                </div>
                <div className="space-y-2 text-xs text-white/50">
                  <div>✓ ROI verified and documented</div>
                  <div>✓ Multi-agent orchestration</div>
                  <div>✓ Board-approved expansion</div>
                </div>
              </div>
            </div>

            <div className="mt-8 k-panel p-6 border-emerald-500/20">
              <div className="flex items-start gap-4">
                <Shield className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                <div>
                  <div className="font-semibold text-emerald-300 mb-2">Continuous Governance Throughout</div>
                  <div className="text-sm text-white/65">
                    Kincaid IQ maintains oversight across all phases: real-time monitoring, variance detection, 
                    evidence trails, and automated controls. CIOs retain kill switches and rollback capabilities 
                    at every stage of the deployment lifecycle.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Use Cases by Industry */}
          <div className="mt-20 mb-16">
            <div className="text-center mb-12">
              <div className="text-sm uppercase tracking-wider text-violet-400 mb-3">Industry Applications</div>
              <h2 className="text-3xl font-semibold tracking-tight">
                Governed AI deployment across <span className="gradient-violet-fuchsia">regulated industries</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="k-panel p-6 hover-lift border-emerald-500/20">
                <div className="text-emerald-400 font-bold text-sm mb-2">Financial Services</div>
                <div className="font-semibold text-lg mb-3 gradient-emerald-teal">Compliance-First Agent Deployment</div>
                <div className="text-sm text-white/65 mb-4">
                  Deploy AI agents for credit decisions, fraud detection, and customer service with 
                  full audit trails and regulatory compliance. SEC, FINRA, and OCC-ready documentation.
                </div>
                <div className="text-xs text-white/50 space-y-1">
                  <div>• Model explainability for fair lending reviews</div>
                  <div>• Decision logs for regulatory inquiries</div>
                  <div>• Automated rollback for model drift detection</div>
                </div>
              </div>

              <div className="k-panel p-6 hover-lift border-violet-500/20">
                <div className="text-violet-400 font-bold text-sm mb-2">Healthcare</div>
                <div className="font-semibold text-lg mb-3 gradient-violet-fuchsia">HIPAA-Compliant Agent Governance</div>
                <div className="text-sm text-white/65 mb-4">
                  Enable AI agents for prior authorization, claims processing, and care coordination with 
                  patient privacy protections and audit-ready evidence trails.
                </div>
                <div className="text-xs text-white/50 space-y-1">
                  <div>• PHI handling with cryptographic receipts</div>
                  <div>• Clinical decision support with physician oversight</div>
                  <div>• Variance alerts for patient safety incidents</div>
                </div>
              </div>

              <div className="k-panel p-6 hover-lift border-cyan-500/20">
                <div className="text-cyan-400 font-bold text-sm mb-2">Manufacturing & Logistics</div>
                <div className="font-semibold text-lg mb-3 gradient-blue-cyan">Operational Risk Mitigation</div>
                <div className="text-sm text-white/65 mb-4">
                  Deploy agents for inventory optimization, supply chain forecasting, and quality control 
                  with real-time variance monitoring and automated rollback for anomalies.
                </div>
                <div className="text-xs text-white/50 space-y-1">
                  <div>• Demand forecasting with confidence intervals</div>
                  <div>• Quality defect prediction with false positive tracking</div>
                  <div>• Supply chain disruption alerts with mitigation protocols</div>
                </div>
              </div>

              <div className="k-panel p-6 hover-lift border-amber-500/20">
                <div className="text-amber-400 font-bold text-sm mb-2">Retail & E-Commerce</div>
                <div className="font-semibold text-lg text-amber-300 mb-3">Customer Experience with Guardrails</div>
                <div className="text-sm text-white/65 mb-4">
                  Scale AI-powered customer service, dynamic pricing, and personalization with governance 
                  controls that prevent brand damage and revenue leakage.
                </div>
                <div className="text-xs text-white/50 space-y-1">
                  <div>• Sentiment monitoring for customer satisfaction</div>
                  <div>• Pricing boundary enforcement to prevent margin erosion</div>
                  <div>• Promotion abuse detection with automated suspension</div>
                </div>
              </div>
            </div>
          </div>

          {/* Integration with Platform Components */}
          <div className="mt-20 mb-16 k-panel p-8 border-violet-500/20">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold gradient-violet-fuchsia">Integrated with Your Value System</h3>
              <p className="text-white/60 mt-2">AI agent governance connects to evidence receipts, value ledger, and war room monitoring</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/evidence-receipts" className="k-panel p-6 hover-lift border-blue-500/20 transition">
                <div className="text-blue-400 text-2xl mb-3">📋</div>
                <div className="font-semibold text-lg text-blue-300 mb-2">Evidence Receipts</div>
                <div className="text-sm text-white/65">
                  Every agent decision generates a cryptographically-signed evidence receipt with full audit trail
                </div>
              </Link>

              <Link href="/ledger" className="k-panel p-6 hover-lift border-emerald-500/20 transition">
                <div className="text-emerald-400 text-2xl mb-3">💎</div>
                <div className="font-semibold text-lg gradient-emerald-teal mb-2">Value Ledger</div>
                <div className="text-sm text-white/65">
                  Track verified ROI and cost savings from AI agents in your CFO-grade value accounting system
                </div>
              </Link>

              <Link href="/war-room" className="k-panel p-6 hover-lift border-violet-500/20 transition">
                <div className="text-violet-400 text-2xl mb-3">🎯</div>
                <div className="font-semibold text-lg gradient-violet-fuchsia mb-2">War Room Monitoring</div>
                <div className="text-sm text-white/65">
                  Real-time dashboard for AI agent performance, anomalies, and governance policy violations
                </div>
              </Link>
            </div>
          </div>

          {/* Security & Compliance */}
          <div className="mt-20 mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold gradient-emerald-teal">Enterprise-Grade Security for AI Governance</h3>
              <p className="text-white/60 mt-2">Built for CIOs and risk officers managing fiduciary duty</p>
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
                <div className="text-xs text-white/50 mt-1">Continuous oversight</div>
              </div>
            </div>
          </div>

          <CTA />
        </Container>
      </div>
    </>
  );
}