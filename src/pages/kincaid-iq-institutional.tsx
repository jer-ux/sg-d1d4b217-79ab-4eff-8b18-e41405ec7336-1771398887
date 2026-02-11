import Head from "next/head";
import Link from "next/link";
import { ArrowRight, TrendingDown, Shield, Target, Database, FileCheck, DollarSign, BarChart3, Lock, AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function KincaidIQInstitutional() {
  return (
    <>
      <Head>
        <title>Kincaid IQ — The War Room for Pharmacy Benefit Economics</title>
        <meta
          name="description"
          content="Decision infrastructure for PBM arbitrage and healthcare cost governance. Bloomberg Terminal authority for pharmacy benefit economics."
        />
      </Head>

      <div className="min-h-screen bg-black text-white">
        <main>
          {/* INSTITUTIONAL HEADER */}
          <section className="border-b border-white/10">
            <div className="mx-auto max-w-6xl px-6 py-12">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium tracking-wide text-white/60">KINCAID IQ</div>
                  <div className="mt-1 text-xs text-white/40">Decision Infrastructure Layer</div>
                </div>
                <div className="flex gap-8 text-xs text-white/60">
                  <div>
                    <div className="text-white/40">Enterprise Grade</div>
                    <div className="mt-0.5 font-medium text-white">Institutional</div>
                  </div>
                  <div>
                    <div className="text-white/40">Deployment</div>
                    <div className="mt-0.5 font-medium text-white">Private Cloud</div>
                  </div>
                  <div>
                    <div className="text-white/40">Certification</div>
                    <div className="mt-0.5 font-medium text-white">SOC 2 Type II</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* HERO - INSTITUTIONAL POSITIONING */}
          <section className="border-b border-white/10">
            <div className="mx-auto max-w-6xl px-6 py-20">
              <div className="max-w-4xl">
                <h1 className="text-5xl font-semibold leading-tight tracking-tight md:text-6xl">
                  The War Room for<br />Pharmacy Benefit Economics
                </h1>

                <div className="mt-8 space-y-6 text-lg leading-relaxed text-white/70">
                  <p className="text-xl font-medium text-white">
                    Healthcare Expense Is Not a Line Item.<br />
                    It Is a Capital Governance Failure.
                  </p>

                  <p>
                    Kincaid IQ is the executive command center for pharmacy benefit economics.
                  </p>

                  <p>
                    We operate at the intersection of enterprise finance, generative AI, and healthcare cost structure — transforming opaque PBM arrangements into measurable, auditable financial intelligence.
                  </p>

                  <p>
                    For middle market and enterprise organizations, pharmacy benefit contracts embed structural information asymmetry, rebate opacity, and incentive misalignment. These dynamics quietly compress EBITDA, distort ROIC, and divert capital from productive growth.
                  </p>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="text-sm text-white/50">Market Reality</div>
                      <div className="mt-1 font-medium">Most companies cannot see it.</div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="text-sm text-white/50">Kincaid IQ Position</div>
                      <div className="mt-1 font-medium">We make it visible.</div>
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <Button asChild size="lg" className="rounded-xl px-8 text-base">
                    <Link href="#briefing">Request War Room Briefing</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="rounded-xl border-white/15 bg-transparent px-8 text-base">
                    <Link href="#war-room">View Intelligence Layer</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* THE PROBLEM - STRUCTURAL ANALYSIS */}
          <section className="border-b border-white/10 bg-white/[0.02]">
            <div className="mx-auto max-w-6xl px-6 py-16">
              <div className="flex items-start justify-between gap-12">
                <div className="flex-1">
                  <div className="text-sm font-medium tracking-wide text-white/60">ECONOMIC ANALYSIS</div>
                  <h2 className="mt-3 text-3xl font-semibold">The Problem: Structural Margin Leakage</h2>

                  <div className="mt-8 space-y-4 text-base leading-relaxed text-white/70">
                    <p>
                      Pharmacy Benefit Managers operate within a complex intermediary ecosystem characterized by:
                    </p>

                    <ul className="space-y-2 pl-5">
                      <li className="relative before:absolute before:-left-5 before:content-['•']">Spread pricing differentials</li>
                      <li className="relative before:absolute before:-left-5 before:content-['•']">Rebate retention opacity</li>
                      <li className="relative before:absolute before:-left-5 before:content-['•']">Formulary steering incentives</li>
                      <li className="relative before:absolute before:-left-5 before:content-['•']">Contractual misalignment</li>
                      <li className="relative before:absolute before:-left-5 before:content-['•']">Limited price discovery</li>
                    </ul>

                    <p className="pt-4 text-lg font-medium text-white">
                      The result is not simply rising healthcare cost.<br />
                      It is embedded economic arbitrage within the employer-sponsored system.
                    </p>

                    <p>
                      This arbitrage accumulates across claims cycles, renewal negotiations, and rebate flows — manifesting as silent margin compression across American enterprises.
                    </p>

                    <p className="font-medium text-white">
                      Kincaid IQ quantifies that compression.
                    </p>
                  </div>
                </div>

                <div className="w-80 space-y-3">
                  <MetricCard label="Avg. Annual Leakage" value="$1.2M–$4.8M" sublabel="Per 1,000 covered lives" />
                  <MetricCard label="Rebate Opacity" value="15–40%" sublabel="Of total pharmacy spend" />
                  <MetricCard label="GLP-1 Acceleration" value="340% YoY" sublabel="Utilization growth rate" />
                  <MetricCard label="Contract Complexity" value="200+ pages" sublabel="Typical PBM agreement" />
                </div>
              </div>
            </div>
          </section>

          {/* THE SOLUTION - DECISION INFRASTRUCTURE */}
          <section className="border-b border-white/10">
            <div className="mx-auto max-w-6xl px-6 py-16">
              <div className="text-sm font-medium tracking-wide text-white/60">INSTITUTIONAL INTELLIGENCE</div>
              <h2 className="mt-3 text-3xl font-semibold">The Solution: Decision Infrastructure for PBM Arbitrage</h2>

              <div className="mt-8 grid gap-6 md:grid-cols-3">
                <PositionCard>
                  <div className="text-sm text-white/50">Not a report.</div>
                </PositionCard>
                <PositionCard>
                  <div className="text-sm text-white/50">Not consulting.</div>
                </PositionCard>
                <PositionCard>
                  <div className="text-sm text-white/50">Not retrospective analytics.</div>
                </PositionCard>
              </div>

              <div className="mt-6 rounded-3xl border border-white/15 bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-10">
                <p className="text-lg leading-relaxed text-white/80">
                  Kincaid IQ is a <span className="font-semibold text-white">continuously updated, executive-facing intelligence layer</span>.
                </p>

                <p className="mt-6 leading-relaxed text-white/70">
                  We reconstruct claims flows, rebate mechanics, GLP-1 exposure, formulary dynamics, and contract structures into verified financial deltas tied directly to EBITDA.
                </p>

                <p className="mt-8 text-xl font-semibold text-white">
                  We are the Bloomberg Terminal of PBM economics.
                </p>
              </div>

              <div className="mt-10 grid gap-4 md:grid-cols-2">
                <CapabilityCard
                  icon={Database}
                  title="Claims Flow Reconstruction"
                  body="Full adjudication logic mapping from point-of-sale through intermediary layers to ultimate settlement."
                />
                <CapabilityCard
                  icon={TrendingDown}
                  title="Rebate Mechanics Analysis"
                  body="Decomposed rebate attribution across manufacturers, PBMs, and pass-through structures."
                />
                <CapabilityCard
                  icon={Target}
                  title="GLP-1 Exposure Modeling"
                  body="Actuarial projections of utilization acceleration and cost trajectory under current formulary design."
                />
                <CapabilityCard
                  icon={FileCheck}
                  title="Contract Structure Mapping"
                  body="Legal and economic interpretation of pricing guarantees, performance guarantees, and exclusivity clauses."
                />
              </div>
            </div>
          </section>

          {/* THE WAR ROOM - FOUR TILE INTERFACE */}
          <section id="war-room" className="border-b border-white/10 bg-white/[0.02]">
            <div className="mx-auto max-w-6xl px-6 py-16">
              <div className="text-sm font-medium tracking-wide text-white/60">EXECUTIVE INTERFACE</div>
              <h2 className="mt-3 text-3xl font-semibold">The War Room: A Four-Tile Executive Interface</h2>

              <p className="mt-4 max-w-3xl text-white/70">
                All intelligence is delivered through a simplified, board-ready interface designed for capital allocators — not analysts.
              </p>

              <div className="mt-10 grid gap-6 md:grid-cols-2">
                <WarRoomTile
                  number="01"
                  title="Verified Margin Leakage"
                  body="Quantified and validated financial impact attributable to PBM spread, rebate retention, and pricing variance."
                  metric="$3.2M"
                  metricLabel="Identified EBITDA drag"
                  href="/war-room"
                />
                <WarRoomTile
                  number="02"
                  title="Arbitrage Exposure"
                  body="Identification of embedded economic differentials across drugs, formularies, and therapeutic classes — including GLP-1 acceleration risk."
                  metric="127"
                  metricLabel="Active exposure events"
                  href="/war-room"
                />
                <WarRoomTile
                  number="03"
                  title="Incentive Misalignment Map"
                  body="Clear visualization of contractual structures where intermediary incentives diverge from employer cost minimization."
                  metric="18"
                  metricLabel="Structural conflicts identified"
                  href="/war-room"
                />
                <WarRoomTile
                  number="04"
                  title="EBITDA Recovery Pathways"
                  body="Actionable governance strategies tied to measurable margin restoration."
                  metric="$2.1M"
                  metricLabel="Projected annual recovery"
                  href="/verified-savings-ledger"
                />
              </div>

              <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
                <p className="text-lg font-medium text-white">
                  This is healthcare cost translated into capital discipline.
                </p>
              </div>

              <div className="mt-8 text-center">
                <Button asChild size="lg" className="rounded-xl px-8">
                  <Link href="/war-room">Enter Full War Room Interface</Link>
                </Button>
              </div>
            </div>
          </section>

          {/* MARKET CLASSIFICATION */}
          <section className="border-b border-white/10">
            <div className="mx-auto max-w-6xl px-6 py-16">
              <div className="text-sm font-medium tracking-wide text-white/60">ECONOMIC TAXONOMY</div>
              <h2 className="mt-3 text-3xl font-semibold">Market Classification Framework</h2>

              <p className="mt-6 max-w-3xl leading-relaxed text-white/70">
                Not all pharmacy models operate under identical economic architecture.
              </p>

              <p className="mt-4 max-w-3xl leading-relaxed text-white/70">
                Kincaid IQ categorizes providers based on structural alignment:
              </p>

              <div className="mt-10 grid gap-4 md:grid-cols-3">
                <ClassificationCard
                  title="Legacy Rebate-Driven PBM Models"
                  characteristics={[
                    "Spread pricing primary revenue",
                    "Retained rebate structures",
                    "Formulary steering incentives",
                    "Limited cost transparency"
                  ]}
                  riskLevel="High information asymmetry"
                />
                <ClassificationCard
                  title="Hybrid Administrative Structures"
                  characteristics={[
                    "Mixed fee and rebate revenue",
                    "Partial pass-through models",
                    "Selective transparency",
                    "Contract complexity variability"
                  ]}
                  riskLevel="Moderate alignment risk"
                />
                <ClassificationCard
                  title="Transparent Cost-Plus Models"
                  characteristics={[
                    "Administrative fee only",
                    "Full rebate pass-through",
                    "Open formulary design",
                    "Audit-grade transparency"
                  ]}
                  riskLevel="Structural alignment"
                />
              </div>

              <div className="mt-10 space-y-4 text-base leading-relaxed text-white/70">
                <p className="font-medium text-white">
                  Our role is not advocacy.<br />
                  Our role is instrumentation.
                </p>

                <p>
                  We enable Boards and executive teams to evaluate providers based on economic reality — not narrative positioning.
                </p>
              </div>
            </div>
          </section>

          {/* WHY NOW */}
          <section className="border-b border-white/10 bg-white/[0.02]">
            <div className="mx-auto max-w-6xl px-6 py-16">
              <div className="text-sm font-medium tracking-wide text-white/60">MARKET DYNAMICS</div>
              <h2 className="mt-3 text-3xl font-semibold">Why This Matters Now</h2>

              <div className="mt-8 grid gap-6 md:grid-cols-3">
                <TrendCard
                  icon={TrendingDown}
                  title="GLP-1 utilization curves are accelerating."
                  body="Actuarial models show 300%+ YoY growth in high-cost therapeutic adoption."
                />
                <TrendCard
                  icon={Shield}
                  title="Rebate structures are increasingly complex."
                  body="Multi-tiered formulary economics obscure true net cost attribution."
                />
                <TrendCard
                  icon={AlertTriangle}
                  title="Renewal cycles are shortening."
                  body="Negotiation windows compress, reducing opportunity for independent analysis."
                />
              </div>

              <div className="mt-10 space-y-4 text-base leading-relaxed text-white/70">
                <p className="text-lg font-medium text-white">
                  Healthcare expense is becoming one of the largest unmanaged variables in enterprise financial performance.
                </p>

                <div className="grid grid-cols-2 gap-6 pt-4">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                    <div className="text-sm text-white/50">Without instrumentation</div>
                    <div className="mt-2 font-medium text-white">Healthcare cost is reactive.</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                    <div className="text-sm text-white/50">With instrumentation</div>
                    <div className="mt-2 font-medium text-white">It becomes governed capital.</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* WHO THIS IS FOR */}
          <section className="border-b border-white/10">
            <div className="mx-auto max-w-6xl px-6 py-16">
              <div className="text-sm font-medium tracking-wide text-white/60">TARGET AUDIENCE</div>
              <h2 className="mt-3 text-3xl font-semibold">Who This Is For</h2>

              <p className="mt-6 text-lg text-white/70">
                Kincaid IQ is built for:
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <AudienceCard
                  icon={Shield}
                  title="Board Directors"
                  body="Requiring fiduciary clarity on one of the largest opaque expense categories in enterprise P&L."
                />
                <AudienceCard
                  icon={Target}
                  title="Founders"
                  body="Protecting margin durability against structural cost acceleration in high-growth environments."
                />
                <AudienceCard
                  icon={BarChart3}
                  title="Private Equity Firms"
                  body="Optimizing portfolio EBITDA through systematic healthcare cost governance across platform companies."
                />
                <AudienceCard
                  icon={DollarSign}
                  title="CFOs"
                  body="Demanding contract transparency and verifiable cost attribution for board-level financial reporting."
                />
                <AudienceCard
                  icon={Lock}
                  title="Institutional Investors"
                  body="Analyzing enterprise cost risk exposure as material factor in investment thesis and valuation models."
                />
                <AudienceCard
                  icon={FileCheck}
                  title="Operating Partners"
                  body="Implementing standardized cost governance frameworks across multi-company investment portfolios."
                />
              </div>

              <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
                <p className="text-lg font-medium text-white">
                  If healthcare expense exceeds seven figures annually,<br />
                  opacity is no longer tolerable.
                </p>
              </div>
            </div>
          </section>

          {/* OUR POSITION */}
          <section className="border-b border-white/10 bg-white/[0.02]">
            <div className="mx-auto max-w-6xl px-6 py-16">
              <div className="text-sm font-medium tracking-wide text-white/60">INSTITUTIONAL POSITIONING</div>
              <h2 className="mt-3 text-3xl font-semibold">Our Position</h2>

              <div className="mt-8 grid gap-6 md:grid-cols-3">
                <PositionCard>
                  <div className="text-sm text-white/50">We do not replace PBMs.</div>
                </PositionCard>
                <PositionCard>
                  <div className="text-sm text-white/50">We do not litigate narratives.</div>
                </PositionCard>
                <PositionCard>
                  <div className="text-sm text-white/50">We do not operate from ideology.</div>
                </PositionCard>
              </div>

              <div className="mt-10 rounded-3xl border border-white/15 bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-10 text-center">
                <p className="text-2xl font-semibold text-white">
                  We restore price signals.
                </p>

                <p className="mt-6 text-lg leading-relaxed text-white/70">
                  Kincaid IQ converts one of the most opaque cost centers in the American enterprise into a measurable, governable capital domain.
                </p>
              </div>
            </div>
          </section>

          {/* STRATEGIC OUTCOME */}
          <section className="border-b border-white/10">
            <div className="mx-auto max-w-6xl px-6 py-16">
              <div className="text-sm font-medium tracking-wide text-white/60">EXPECTED RESULTS</div>
              <h2 className="mt-3 text-3xl font-semibold">The Strategic Outcome</h2>

              <div className="mt-8 space-y-3">
                <OutcomeItem text="Reduced agency costs" />
                <OutcomeItem text="Increased margin durability" />
                <OutcomeItem text="Improved capital allocation accuracy" />
                <OutcomeItem text="Strengthened renewal negotiation leverage" />
                <OutcomeItem text="Institutionalized financial transparency" />
              </div>

              <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-8">
                <p className="text-lg leading-relaxed text-white/70">
                  Healthcare expense should not be a black box.
                </p>

                <p className="mt-4 text-lg font-medium text-white">
                  It should be governed like debt, capital expenditure, or treasury risk.
                </p>
              </div>
            </div>
          </section>

          {/* CALL TO ACTION */}
          <section id="briefing">
            <div className="mx-auto max-w-6xl px-6 py-20">
              <Card className="overflow-hidden rounded-3xl border-white/15 bg-gradient-to-br from-white/[0.07] to-white/[0.02]">
                <CardContent className="p-12 text-center">
                  <h2 className="text-3xl font-semibold md:text-4xl">Request a War Room Briefing</h2>

                  <div className="mx-auto mt-6 max-w-3xl space-y-4 text-lg leading-relaxed text-white/70">
                    <p>
                      If you are a Board member, Founder, CFO, or Investor —<br />
                      and pharmacy benefit expense is material to your enterprise —<br />
                      you need visibility before your next renewal cycle.
                    </p>
                  </div>

                  <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                    <Button asChild size="lg" className="rounded-xl px-10 text-base">
                      <Link href="/contact">Schedule Briefing</Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="rounded-xl border-white/15 bg-transparent px-10 text-base">
                      <a href="mailto:jer@kincaidrmc.com">jer@kincaidrmc.com</a>
                    </Button>
                  </div>

                  <div className="mt-10 flex justify-center gap-12 text-sm text-white/60">
                    <div>
                      <div className="text-white/40">Response Time</div>
                      <div className="mt-1 font-medium text-white">24 hours</div>
                    </div>
                    <div>
                      <div className="text-white/40">Briefing Format</div>
                      <div className="mt-1 font-medium text-white">Executive-only</div>
                    </div>
                    <div>
                      <div className="text-white/40">Duration</div>
                      <div className="mt-1 font-medium text-white">45 minutes</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

// SUPPORTING COMPONENTS

function MetricCard({ label, value, sublabel }: { label: string; value: string; sublabel: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="text-xs text-white/50">{label}</div>
      <div className="mt-1 text-2xl font-semibold text-white">{value}</div>
      <div className="mt-1 text-xs text-white/40">{sublabel}</div>
    </div>
  );
}

function PositionCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
      {children}
    </div>
  );
}

function CapabilityCard({ icon: Icon, title, body }: { icon: React.ComponentType<{ className?: string }>; title: string; body: string }) {
  return (
    <Card className="rounded-2xl border-white/10 bg-white/5">
      <CardContent className="p-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="mt-4 text-base font-semibold">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/70">{body}</p>
      </CardContent>
    </Card>
  );
}

function WarRoomTile({ number, title, body, metric, metricLabel, href }: { number: string; title: string; body: string; metric: string; metricLabel: string; href: string }) {
  return (
    <Link href={href}>
      <Card className="group h-full cursor-pointer rounded-2xl border-white/10 bg-white/5 transition-all duration-300 hover:border-white/20 hover:bg-white/10">
        <CardContent className="p-8">
          <div className="flex items-start justify-between gap-4">
            <div className="text-xs font-medium text-white/40">{number}</div>
            <ArrowRight className="h-4 w-4 text-white/40 transition-all group-hover:translate-x-1 group-hover:text-white/80" />
          </div>
          <h3 className="mt-4 text-xl font-semibold">{title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-white/70">{body}</p>
          <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="text-2xl font-semibold text-white">{metric}</div>
            <div className="mt-1 text-xs text-white/50">{metricLabel}</div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function ClassificationCard({ title, characteristics, riskLevel }: { title: string; characteristics: string[]; riskLevel: string }) {
  return (
    <Card className="rounded-2xl border-white/10 bg-white/5">
      <CardContent className="p-6">
        <h3 className="text-base font-semibold">{title}</h3>
        <ul className="mt-4 space-y-2 text-sm text-white/70">
          {characteristics.map((item, i) => (
            <li key={i} className="relative pl-5 before:absolute before:left-0 before:content-['•']">
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-4 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-white/60">
          {riskLevel}
        </div>
      </CardContent>
    </Card>
  );
}

function TrendCard({ icon: Icon, title, body }: { icon: React.ComponentType<{ className?: string }>; title: string; body: string }) {
  return (
    <Card className="rounded-2xl border-white/10 bg-white/5">
      <CardContent className="p-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="mt-4 text-base font-semibold leading-snug">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-white/70">{body}</p>
      </CardContent>
    </Card>
  );
}

function AudienceCard({ icon: Icon, title, body }: { icon: React.ComponentType<{ className?: string }>; title: string; body: string }) {
  return (
    <Card className="rounded-2xl border-white/10 bg-white/5">
      <CardContent className="p-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="mt-4 text-base font-semibold">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/70">{body}</p>
      </CardContent>
    </Card>
  );
}

function OutcomeItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white/10">
        <ArrowRight className="h-3.5 w-3.5 text-white/60" />
      </div>
      <div className="text-base font-medium text-white">{text}</div>
    </div>
  );
}