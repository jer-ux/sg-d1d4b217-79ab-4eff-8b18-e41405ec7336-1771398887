import Navbar from "@/components/Navbar";
import Link from "next/link";

function Pillar({
  title,
  tag,
  desc,
  bullets,
  href,
}: {
  title: string;
  tag?: string;
  desc: string;
  bullets: string[];
  href: string;
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
          Explore →
        </Link>
      </div>
    </div>
  );
}

function FlowStep({ num, label, desc }: { num: string; label: string; desc: string }) {
  return (
    <div className="flex gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm font-semibold text-white/90">
        {num}
      </div>
      <div className="pt-1">
        <div className="text-sm font-semibold text-white/90">{label}</div>
        <div className="mt-1 text-sm text-white/65">{desc}</div>
      </div>
    </div>
  );
}

export default function Platform() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="max-w-3xl">
          <div className="text-xs tracking-[0.2em] text-white/50">PLATFORM</div>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-white/95">
            Operating system for evidence-backed decisions.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-white/70">
            Kincaid IQ is built around Truth Governance: immutable artifacts, versioned transforms,
            evidence receipts, and verification gates. The UI is engineered for executives—fast,
            ranked, and audit-ready.
          </p>
        </div>
      </section>

      {/* 4 Capability Pillars */}
      <section className="mx-auto max-w-7xl px-6 pb-14">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Pillar
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

          <Pillar
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

          <Pillar
            title="Verified Savings Ledger"
            tag="Finance-grade"
            desc="Track recoverable value, EBITDA drag, and savings—backed by receipts, not spreadsheets."
            bullets={[
              "Line-item accounting with receipt linkage",
              "Multi-party reconciliation (internal + external sources)",
              "Approval workflows with override audit trail",
              "Exportable board reports with integrity checks",
            ]}
            href="/verified-savings-ledger"
          />

          <Pillar
            title="Proof Library"
            tag="Intelligence vault"
            desc="Searchable, tagged repository of artifacts and receipts. No more lost evidence."
            bullets={[
              "Full-text search across receipts and attachments",
              "Tag-based filtering and taxonomy",
              "Provenance tracking (who uploaded, when, why)",
              "Download with chain-of-custody manifest",
            ]}
            href="/proof-library"
          />
        </div>
      </section>

      {/* How It Works Flow */}
      <section className="mx-auto max-w-7xl px-6 pb-14">
        <div className="rounded-3xl border border-white/10 bg-black/40 p-8">
          <div className="text-sm font-semibold text-white/90">How it works</div>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <FlowStep
              num="1"
              label="Artifact arrives"
              desc="Raw data ingested from API, upload, or connector. No transforms yet—just the original."
            />
            <FlowStep
              num="2"
              label="Receipt generated"
              desc="System creates immutable receipt: sha256 hash, timestamp, source metadata, confidence gates."
            />
            <FlowStep
              num="3"
              label="Export built"
              desc="Board pack or report generated. Manifest JSON lists every receipt + attachment hash."
            />
            <FlowStep
              num="4"
              label="Integrity verified"
              desc="Consumer runs verification script. PASS/FAIL + mismatch detail. Zero trust, total clarity."
            />
          </div>
        </div>
      </section>

      {/* Succession IQ Context */}
      <section className="mx-auto max-w-7xl px-6 pb-14">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
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

      {/* Bottom CTA Bar */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8 text-center">
          <div className="text-lg font-semibold text-white/95">
            Ready to see the platform in action?
          </div>
          <div className="mt-2 text-sm text-white/70">
            Get a personalized walkthrough: ranked events, evidence receipts, board pack exports, and
            integrity verification.
          </div>
          <div className="mt-6">
            <Link
              href="/request-demo"
              className="inline-flex rounded-2xl border border-white/10 bg-white/10 px-6 py-3 text-sm text-white hover:bg-white/15"
            >
              Request demo →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}