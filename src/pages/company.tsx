import Link from "next/link";

function Block({
  title,
  desc,
  bullets,
}: {
  title: string;
  desc: string;
  bullets: string[];
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <div className="text-sm font-semibold text-white/90">{title}</div>
      <div className="mt-2 text-sm text-white/70">{desc}</div>
      <ul className="mt-4 space-y-2 text-sm text-white/70">
        {bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-white/40" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Company() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="max-w-3xl">
          <div className="text-xs tracking-[0.2em] text-white/50">COMPANY</div>
          <h1 className="mt-4 text-3xl font-semibold text-white/95">
            Built for fiduciary-grade decisioning.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            Kincaid IQ is an evidence-first operating system. The point isn't dashboards. The point
            is provability: every KPI is backed by receipts, attachments, and integrity verification.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/platform"
              className="rounded-2xl border border-white/10 bg-black/40 px-5 py-2.5 text-sm text-white/80 hover:bg-white/5"
            >
              Explore platform →
            </Link>
            <Link
              href="/request-demo"
              className="rounded-2xl border border-white/10 bg-white/10 px-5 py-2.5 text-sm text-white hover:bg-white/15"
            >
              Request demo →
            </Link>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Block
            title="What we believe"
            desc="If it can't be verified, it doesn't belong in the board room."
            bullets={[
              "Evidence is the unit of truth (not opinions, not slides)",
              "Receipts + manifests + hashes create defensible posture",
              "Confidence gating prevents authority inversion",
              "Exports must be portable and auditable",
            ]}
          />
          <Block
            title="How we operate"
            desc='Systems thinking + governance engineering, not "consulting theater."'
            bullets={[
              "Versioned KPIs with lineage + data quality gates",
              "Immutable artifacts and reproducible transforms",
              "Audit events for overrides and approvals",
              "Security-by-default data access patterns",
            ]}
          />
          <Block
            title="Who it's for"
            desc="Executives and fiduciaries who need clarity at speed."
            bullets={[
              "CFO: quantify EBITDA drag, recoverable value, and risk",
              "CHRO: governance-grade workforce and plan decisions",
              "Board/Owners: integrity-verified exports with receipts",
              "Investors/Lenders: fewer surprises, tighter control",
            ]}
          />
          <Block
            title="Succession IQ (module)"
            desc="Same chassis, new KPI catalog. Measures succession quality as EBITDA risk."
            bullets={[
              "Daily/hourly measurements (as available)",
              "Multi-generational continuity signals",
              "Western KPIs + Gulf-focused additions",
              "Exportable board packs with PASS/FAIL verification",
            ]}
          />
        </div>
      </section>
    </main>
  );
}