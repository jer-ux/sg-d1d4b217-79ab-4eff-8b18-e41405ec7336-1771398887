import { SEO } from "@/components/SEO";
import Link from "next/link";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Database, Workflow, GitBranch, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

function MarketplaceTile({ 
  title, 
  body, 
  href, 
  icon: Icon,
  color = "purple" 
}: { 
  title: string; 
  body: string; 
  href: string; 
  icon: any;
  color?: string;
}) {
  return (
    <Link href={href}>
      <div className="group relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-white/[0.03] to-transparent backdrop-blur-xl p-8 hover:scale-[1.02] transition-all duration-500 hover:shadow-2xl cursor-pointer">
        <div className={`absolute -inset-0.5 bg-gradient-to-r from-${color}-500/0 to-${color}-500/0 rounded-3xl blur opacity-0 group-hover:opacity-30 group-hover:from-${color}-500/50 group-hover:to-${color}-500/50 transition-all duration-500`} />
        <div className="relative">
          <Icon className={`h-10 w-10 text-${color}-400 mb-4`} />
          <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
          <p className="text-sm text-white/70 mb-6 leading-relaxed">{body}</p>
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-purple-300 group-hover:text-purple-200 transition-colors">
            View detail
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function Marketplace() {
  return (
    <>
      <SEO
        title="Marketplace Practice — Kincaid IQ AI"
        description="Build once. Distribute through Snowflake, Databricks, and ServiceNow-aligned delivery motions—high trust, low delivery drag."
      />
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white">
        <SiteHeader />
        
        {/* Premium 3D Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/30 via-transparent to-transparent" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-cyan-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-emerald-500/20 rounded-full blur-[90px] animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        
        <main className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            {/* Hero Section */}
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-xl px-4 py-2 mb-6">
                <Sparkles className="h-4 w-4 text-purple-400" />
                <span className="text-sm font-semibold text-purple-300">Enterprise Distribution</span>
              </div>
              <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
                Marketplace Practice
              </h1>
              <p className="text-xl text-purple-200/70 max-w-3xl mx-auto leading-relaxed">
                Build once. Distribute through Snowflake, Databricks, and ServiceNow-aligned delivery motions—high trust, low delivery drag.
              </p>
            </div>

            {/* Key Benefits with Premium Design */}
            <div className="grid md:grid-cols-3 gap-8 mb-20">
              {[
                {
                  icon: GitBranch,
                  title: "Productized Delivery",
                  body: "Repeatable packaging, deployment patterns, and governance primitives that reduce implementation variance.",
                  color: "purple"
                },
                {
                  icon: Database,
                  title: "Distribution Advantage",
                  body: "Marketplaces shorten procurement paths and anchor buyer trust when proof and controls are embedded.",
                  color: "cyan"
                },
                {
                  icon: Workflow,
                  title: "High-GM Operating Model",
                  body: "Configuration over custom work. Evidence receipts and ledger outputs become standardized deliverables.",
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
                    <p className="text-purple-200/70 leading-relaxed">{feature.body}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Marketplace Partners */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Available Marketplaces
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <MarketplaceTile
                  title="Snowflake Marketplace"
                  body="Snowflake-native data apps, evidence-ledgers, and deterministic governance patterns."
                  href="/marketplace/snowflake"
                  icon={Database}
                  color="blue"
                />
                <MarketplaceTile
                  title="Databricks Marketplace"
                  body="Lakehouse + agent pipelines with controlled lineage, measurement, and scale-ready patterns."
                  href="/marketplace/databricks"
                  icon={GitBranch}
                  color="purple"
                />
                <MarketplaceTile
                  title="ServiceNow Practice"
                  body="Workflow and approvals layer: actionability, assignment, closure, and audit trail."
                  href="/marketplace/servicenow"
                  icon={Workflow}
                  color="emerald"
                />
              </div>
            </div>

            {/* Why Marketplace Matters */}
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-white/[0.03] to-transparent backdrop-blur-xl p-10 mb-20 shadow-2xl">
              <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Why marketplace distribution matters
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  "Reduces sales cycle from months to weeks",
                  "Pre-vetted security and compliance credentials",
                  "Native data connectivity reduces integration risk",
                  "Trusted brand association accelerates buyer confidence",
                  "Standardized deployment patterns scale faster",
                  "Built-in usage metering and billing infrastructure"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-500">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-purple-100/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <div className="rounded-3xl border border-purple-500/30 bg-gradient-to-br from-purple-500/20 via-purple-500/10 to-transparent backdrop-blur-xl p-12 text-center shadow-2xl">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Ready to accelerate your go-to-market?
              </h2>
              <p className="text-purple-200/70 mb-8 max-w-2xl mx-auto">
                See how marketplace distribution can transform your delivery model.
              </p>
              <Link
                href="/request-demo"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-violet-500 px-8 py-4 text-lg font-semibold text-white hover:from-purple-600 hover:to-violet-600 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
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