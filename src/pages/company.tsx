import { SEO } from "@/components/SEO";
import Link from "next/link";
import { Container, PageHero } from "@/components/Blocks";
import { Hero3D } from "@/components/Hero3D";

const principles = [
  {
    title: "Controls-first",
    body: "Governance before scale",
    icon: "🛡️",
    color: "from-violet-400 to-purple-300",
  },
  {
    title: "Evidence-led",
    body: "Receipts, not opinions",
    icon: "📋",
    color: "from-cyan-400 to-blue-300",
  },
  {
    title: "Ledger discipline",
    body: "Reconciliation, not dashboards",
    icon: "📊",
    color: "from-emerald-400 to-teal-300",
  },
  {
    title: "Marketplace-native",
    body: "Distribution through trust",
    icon: "🌐",
    color: "from-amber-400 to-orange-300",
  },
];

const practices = [
  {
    title: "Marketplace Practice",
    body: "Productized delivery through Snowflake, Databricks, and ServiceNow. Build once, distribute with trust, scale with margin.",
    icon: "🚀",
    link: "/marketplace",
    color: "border-cyan-500/30 bg-cyan-500/5 hover:bg-cyan-500/10",
    textColor: "text-cyan-300",
  },
  {
    title: "Agentic Transformation",
    body: "Controlled AI agent deployment with 12-month adoption policy. Governance gates, exception monitoring, measurable ROI.",
    icon: "🤖",
    link: "/agentic-transformation",
    color: "border-violet-500/30 bg-violet-500/5 hover:bg-violet-500/10",
    textColor: "text-violet-300",
  },
  {
    title: "Actuarial Benefits",
    body: "PBM/Rx optimization, compliance, and benchmarking with CFO-grade proof. Evidence receipts for every claimed dollar.",
    icon: "💊",
    link: "/actuarial-benefits",
    color: "border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10",
    textColor: "text-emerald-300",
  },
];

export default function Company() {
  return (
    <>
      <SEO
        title="Company — Kincaid IQ"
        description="Built for boards. Run by operators. Kincaid IQ exists to convert opacity into verified value—with governance that survives scrutiny."
      />
      <Container>
        <PageHero
          title="Company"
          subtitle="Built for boards. Run by operators. Kincaid IQ exists to convert opacity into verified value—with governance that survives scrutiny."
        />

        <div className="mb-8">
          <Hero3D />
        </div>

        {/* Mission Statement */}
        <div className="mb-12 k-panel p-10 text-center">
          <div className="text-3xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent animate-gradient">
              Most analytics dies because it can't survive scrutiny.
            </span>
          </div>
          <div className="text-lg text-white/70 max-w-3xl mx-auto">
            Boards don't trust it. Finance can't reconcile it. Value evaporates. 
            <span className="text-white font-medium"> We fix that.</span>
          </div>
        </div>

        {/* What We Do */}
        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          <div className="lg:col-span-2 k-panel p-8">
            <div className="text-2xl font-semibold mb-4 bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent">
              What we do
            </div>
            <div className="text-white/70 mb-6">
              We build decision systems that are finance-native: evidence receipts, value ledgers, control gates, and workflows that close outcomes.
              Our practices span enterprise marketplaces, agentic transformation, and actuarial benefits consulting.
            </div>

            <div className="grid gap-4">
              {practices.map((p) => (
                <Link
                  key={p.title}
                  href={p.link}
                  className={`border rounded-xl p-6 transition ${p.color}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{p.icon}</div>
                    <div className="flex-1">
                      <div className={`font-semibold mb-2 ${p.textColor}`}>{p.title}</div>
                      <div className="text-sm text-white/70">{p.body}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="k-panel p-8">
            <div className="text-2xl font-semibold mb-6 bg-gradient-to-r from-violet-400 to-fuchsia-300 bg-clip-text text-transparent">
              Our approach
            </div>
            <div className="space-y-6">
              {principles.map((p) => (
                <div key={p.title} className="group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-2xl group-hover:scale-110 transition-transform">{p.icon}</div>
                    <div className={`font-semibold bg-gradient-to-r ${p.color} bg-clip-text text-transparent`}>
                      {p.title}
                    </div>
                  </div>
                  <div className="text-sm text-white/60 pl-11">{p.body}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Who We Serve */}
        <div className="mb-12 k-panel p-8">
          <div className="text-2xl font-semibold mb-6 bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
            Who we serve
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3 text-white/70">
              <div className="flex items-start gap-3">
                <div className="text-emerald-400 mt-1">→</div>
                <div>
                  <span className="text-white font-medium">CFOs and finance teams</span> needing defensible value measurement and board-ready reconciliation
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-cyan-400 mt-1">→</div>
                <div>
                  <span className="text-white font-medium">Capital markets (M&A, VC, PE)</span> underwriting value with evidence packs and realization discipline
                </div>
              </div>
            </div>
            <div className="space-y-3 text-white/70">
              <div className="flex items-start gap-3">
                <div className="text-violet-400 mt-1">→</div>
                <div>
                  <span className="text-white font-medium">Family offices</span> managing complex holdings and vendor ecosystems with governance posture
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-amber-400 mt-1">→</div>
                <div>
                  <span className="text-white font-medium">Enterprise buyers</span> seeking marketplace-native, governed solutions with audit trails
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why We Exist */}
        <div className="mb-12 grid md:grid-cols-2 gap-6">
          <div className="k-panel p-8">
            <div className="text-xl font-semibold mb-4 text-rose-300">The Problem</div>
            <div className="text-sm text-white/70 space-y-3">
              <div>• Consultants promise millions in savings with zero evidence</div>
              <div>• AI transformation initiatives lack controls and measurement</div>
              <div>• Value evaporates during integration because there's no ledger</div>
              <div>• Boards demand proof but teams deliver PowerPoint</div>
              <div>• Audits expose gaps that should never have existed</div>
            </div>
          </div>

          <div className="k-panel p-8">
            <div className="text-xl font-semibold mb-4 text-emerald-300">Our Solution</div>
            <div className="text-sm text-white/70 space-y-3">
              <div>• Evidence receipts make every claim verifiable</div>
              <div>• Controlled workflows prevent governance failures</div>
              <div>• Ledger-based accountability tracks value from claim to realization</div>
              <div>• Board-ready reporting with reconciliation built-in</div>
              <div>• Audit trails that withstand scrutiny automatically</div>
            </div>
          </div>
        </div>

        {/* Operating Philosophy */}
        <div className="mb-12 k-panel p-8">
          <div className="text-2xl font-semibold mb-6 bg-gradient-to-r from-amber-400 to-rose-300 bg-clip-text text-transparent">
            Operating philosophy
          </div>
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
            <div className="flex items-start gap-3">
              <div className="text-amber-400 text-xl">•</div>
              <div className="text-white/70">Proof-first outputs beat persuasion</div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-violet-400 text-xl">•</div>
              <div className="text-white/70">Controls make scale safe</div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-emerald-400 text-xl">•</div>
              <div className="text-white/70">Reconciliation beats debate</div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-cyan-400 text-xl">•</div>
              <div className="text-white/70">Productized delivery increases trust and margin</div>
            </div>
          </div>
        </div>

        {/* Action Links */}
        <div className="flex flex-col md:flex-row gap-4">
          <Link
            href="/contact"
            className="k-panel p-8 hover:bg-white/5 transition text-center flex-1 group"
          >
            <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">📞</div>
            <div className="font-semibold text-lg bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent">
              Request a demo
            </div>
            <div className="text-sm text-white/60 mt-2">See how we build decision-grade systems</div>
          </Link>
          
          <Link
            href="/case-studies"
            className="k-panel p-8 hover:bg-white/5 transition text-center flex-1 group"
          >
            <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">📊</div>
            <div className="font-semibold text-lg bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              Case studies
            </div>
            <div className="text-sm text-white/60 mt-2">Real proof patterns and outcomes</div>
          </Link>
          
          <Link
            href="/capital-markets"
            className="k-panel p-8 hover:bg-white/5 transition text-center flex-1 group"
          >
            <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">💼</div>
            <div className="font-semibold text-lg bg-gradient-to-r from-violet-400 to-fuchsia-300 bg-clip-text text-transparent">
              Investor access
            </div>
            <div className="text-sm text-white/60 mt-2">Diligence packs and realization discipline</div>
          </Link>
        </div>
      </Container>
    </>
  );
}