import Link from "next/link";

function Card({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="text-sm font-semibold">{title}</div>
      {subtitle ? <div className="mt-1 text-sm text-white/65">{subtitle}</div> : null}
      <div className="mt-4">{children}</div>
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80">
      {children}
    </span>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 text-sm text-white/70">
      <span className="mt-1 text-white/40">•</span>
      <div>{children}</div>
    </div>
  );
}

export default function GenAIAgentsPage() {
  return (
    <div className="min-h-screen bg-[#070B12] text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Header */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-2">
            <Badge>MIT MBA Operating Lens</Badge>
            <Badge>Agentic Workflows</Badge>
            <Badge>Evidence Receipts</Badge>
            <Badge>Snowflake-Ready</Badge>
          </div>

          <div className="text-3xl font-semibold">
            Gen AI Agents that actually ship value (and survive CFO scrutiny) 🤖🧾
          </div>

          <div className="text-sm text-white/65 max-w-3xl">
            Most "AI agents" fail because they automate tasks without governing truth. Kincaid IQ agents are designed
            as an operating system: deterministic data + evidence lineage + controlled autonomy. The result is
            CEO/COO/CFO/CHRO-grade output, not AI theater.
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-3 text-sm font-semibold text-emerald-200 hover:bg-emerald-500/15"
            >
              Book an Agent Strategy Call ↗
            </Link>
            <Link
              href="/evidence-receipts"
              className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              See Evidence Receipts →
            </Link>
          </div>
        </div>

        {/* MIT MBA Explanation */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card
            title="MIT MBA explanation (straight operator logic)"
            subtitle="If an agent can't prove its inputs and reproduce its outputs, it's not deployable in a real enterprise."
          >
            <div className="space-y-3">
              <Bullet>
                An AI agent is not "a chatbot that clicks buttons." It's a workflow executor with decision rights.
                Decision rights demand governance: controls, logs, reconciliation, and accountable signoff.
              </Bullet>
              <Bullet>
                Agents only create enterprise advantage when they compress cycle time on high-friction work: approvals,
                reconciliations, reporting, exceptions, and coordination across functions.
              </Bullet>
              <Bullet>
                The economic moat is not the model. It's the evidence layer: source artifacts, transform hashes,
                freshness SLAs, data quality gates, and audit-grade receipts attached to every output.
              </Bullet>
              <div className="mt-4 rounded-xl border border-white/10 bg-black/30 p-4">
                <div className="text-xs font-semibold text-white/60">Non-negotiable rule</div>
                <div className="mt-1 text-sm text-white/80">
                  No receipt → no metric. No lineage → no autonomy.
                </div>
              </div>
            </div>
          </Card>

          <Card
            title="What we build"
            subtitle="A full agent suite that maps to executive outcomes, not novelty."
          >
            <div className="space-y-3">
              <Bullet>
                <span className="text-white/85 font-semibold">Executive Reporting Agents:</span> CFO-grade packs,
                variance attribution, and board narratives with click-through proof.
              </Bullet>
              <Bullet>
                <span className="text-white/85 font-semibold">Finance Ops Agents:</span> invoice-to-cash, payment
                integrity, reconciliations, accrual validation, close acceleration.
              </Bullet>
              <Bullet>
                <span className="text-white/85 font-semibold">Benefits / HR Agents:</span> renewals, GLP-1 + specialty
                watchlists, vendor oversight, compliance completion tracking.
              </Bullet>
              <Bullet>
                <span className="text-white/85 font-semibold">Risk & Governance Agents:</span> policy enforcement,
                exception routing, audit logs, model risk controls, and approval workflows.
              </Bullet>
              <Bullet>
                <span className="text-white/85 font-semibold">Arbitrage Event Agents:</span> detect leakage → prove it →
                quantify EBITDA → issue action packets → track realization.
              </Bullet>
            </div>
          </Card>
        </div>

        {/* Service Suite */}
        <div className="mt-10">
          <div className="text-xl font-semibold">Service suite (end-to-end)</div>
          <div className="mt-2 text-sm text-white/65 max-w-3xl">
            Pick one lane or run the full stack. This is designed for fast time-to-value and long-term enterprise
            defensibility.
          </div>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <Card title="1) Agent Strategy & Use-Case Selection" subtitle="2–3 weeks • choose high-ROI workflows">
              <div className="space-y-2">
                <Bullet>Use-case scoring: value × feasibility × risk × time sensitivity</Bullet>
                <Bullet>Decision-rights mapping: what the agent can do vs must escalate</Bullet>
                <Bullet>Operating cadence integration: who consumes outputs, when, and why</Bullet>
              </div>
            </Card>

            <Card title="2) Evidence Lineage Foundation" subtitle="3–6 weeks • receipts + hard gates">
              <div className="space-y-2">
                <Bullet>Artifact registry + transform hashing + freshness SLAs</Bullet>
                <Bullet>DQ suites + reconciliation checks + confidence scoring</Bullet>
                <Bullet>VERIFIED / PARTIAL / BLOCKED enforcement on every output</Bullet>
              </div>
            </Card>

            <Card title="3) Snowflake-Native Build" subtitle="2–6 weeks • production-ready data products">
              <div className="space-y-2">
                <Bullet>Stages/Snowpipe/Dynamic tables for repeatable ingestion</Bullet>
                <Bullet>Canonical domain models (claims/eligibility/GL/vendor/etc.)</Bullet>
                <Bullet>Secure views for app + governance + audit logging</Bullet>
              </div>
            </Card>

            <Card title="4) Agent Implementation" subtitle="2–8 weeks • real workflows, real outcomes">
              <div className="space-y-2">
                <Bullet>Agent orchestration (tools, permissions, escalation)</Bullet>
                <Bullet>Playbooks: actions, owners, due dates, expected value</Bullet>
                <Bullet>Human-in-the-loop: review queues + signoff paths</Bullet>
              </div>
            </Card>

            <Card title="5) Controls, Risk, and Compliance" subtitle="ongoing • board-safe autonomy">
              <div className="space-y-2">
                <Bullet>Policy constraints, audit trails, and change control</Bullet>
                <Bullet>Model risk management + prompt/version governance</Bullet>
                <Bullet>Kill switch + incident response for autonomous workflows</Bullet>
              </div>
            </Card>

            <Card title="6) Adoption & Enablement" subtitle="30 days • make it stick">
              <div className="space-y-2">
                <Bullet>Exec-ready reporting templates + "what changed/why/what next"</Bullet>
                <Bullet>Training for operators: how to read receipts + handle exceptions</Bullet>
                <Bullet>Metrics for adoption: cycle-time reduction + realized savings</Bullet>
              </div>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/[0.03] p-6">
          <div className="text-xl font-semibold">CTA: Build your first agent that's actually defensible</div>
          <div className="mt-2 text-sm text-white/65 max-w-3xl">
            We'll identify the 1–2 workflows with the highest immediate ROI, define hard governance gates, and ship an
            agent that produces VERIFIED outputs with Evidence Receipts. No theater.
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-3 text-sm font-semibold text-emerald-200 hover:bg-emerald-500/15"
            >
              Book the Agent Strategy Call ↗
            </Link>
            <Link
              href="/war-room"
              className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              See the War Room Demo →
            </Link>
          </div>

          <div className="mt-4 text-xs text-white/55">
            Typical first deliverable: 1 agent + receipts + KPI pack + drill-through proof. Then we scale.
          </div>
        </div>
      </div>
    </div>
  );
}