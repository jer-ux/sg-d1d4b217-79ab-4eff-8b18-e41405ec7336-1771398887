import Navbar from "@/components/Navbar";
import Link from "next/link";

function Card({
  title,
  desc,
  bullets,
  href,
  tag,
}: {
  title: string;
  desc: string;
  bullets: string[];
  href: string;
  tag?: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm font-semibold text-white/90">{title}</div>
        {tag ? (
          <div className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[11px] text-white/70">
            {tag}
          </div>
        ) : null}
      </div>
      <div className="mt-2 text-sm text-white/65">{desc}</div>

      <ul className="mt-4 space-y-2 text-sm text-white/70">
        {bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-white/40" />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <Link
          href={href}
          className="inline-flex rounded-2xl border border-white/10 bg-black/40 px-4 py-2 text-sm text-white/80 hover:bg-white/5"
        >
          Open →
        </Link>
      </div>
    </div>
  );
}

export default function Platform() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="max-w-3xl">
          <div className="text-xs tracking-[0.2em] text-white/50">PLATFORM</div>
          <h1 className="mt-4 text-3xl font-semibold text-white/95">
            Operating system for evidence-backed decisions.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            Kincaid IQ is built around Truth Governance: immutable artifacts, versioned transforms,
            evidence receipts, and verification gates. The UI is engineered for executives—fast,
            ranked, and audit-ready.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card
            title="SiriusB iQ War Room"
            tag="Executive view"
            desc="4-Tile Executive View with Ranked Events. This is where EBITDA impact becomes visible, prioritized, and actionable."
            bullets={[
              "Tile-level KPI snapshots with evidence lineage and confidence gating",
              "Ranked events: severity, velocity, confidence, and recoverable EBITDA",
              "One-click publish to board pack export (hashes + manifests + verification)",
              "Drilldown: tile → receipt → attachment → download",
            ]}
            href="/war-room"
          />

          <Card
            title="Evidence Receipts"
            tag="Audit trail"
            desc="Every claim is a receipt. Every receipt is hashable. Every export is verifiable."
            bullets={[
              "Immutable raw artifacts + versioned transforms",
              "VERIFIED / UNVERIFIED gates with reason codes",
              "Attachment chain-of-custody (sha256 bytes hashing)",
              "Export manifests and PASS/FAIL integrity verification",
            ]}
            href="/evidence-receipts"
          />
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-black/40 p-6">
          <div className="text-sm font-semibold text-white/90">Where Succession IQ fits</div>
          <div className="mt-2 text-sm text-white/70">
            Succession IQ is a modular layer on top of this chassis. Same Evidence Receipts, same
            exports, same verification—just a different KPI catalog and measurement loop.
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/request-demo"
              className="rounded-2xl border border-white/10 bg-white/10 px-5 py-2.5 text-sm text-white hover:bg-white/15"
            >
              Request demo →
            </Link>
            <Link
              href="/war-room"
              className="rounded-2xl border border-white/10 bg-black/40 px-5 py-2.5 text-sm text-white/80 hover:bg-white/5"
            >
              See War Room →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}