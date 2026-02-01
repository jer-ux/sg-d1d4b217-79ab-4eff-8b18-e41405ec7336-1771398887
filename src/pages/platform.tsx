import Link from "next/link";
import { FileText, Shield } from "lucide-react";

function Pillar({
  title,
  tag,
  desc,
  bullets = [],
  href,
  icon,
}: {
  title: string;
  tag?: string;
  desc: string;
  bullets?: string[];
  href: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {icon && <div className="text-white/70">{icon}</div>}
          <div className="text-sm font-semibold text-white/90">{title}</div>
        </div>
        {tag ? (
          <div className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[11px] text-white/70">
            {tag}
          </div>
        ) : null}
      </div>

      <div className="mt-2 text-sm leading-relaxed text-white/65">{desc}</div>

      {bullets.length > 0 && (
        <ul className="mt-4 space-y-2 text-sm text-white/70">
          {bullets.map((b) => (
            <li key={b} className="flex gap-2">
              <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-white/40" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}

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

function FlowStep({
  n,
  title,
  desc,
}: {
  n: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-black/40 p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="text-[11px] tracking-[0.2em] text-white/50">STEP {n}</div>
        <div className="h-6 w-6 rounded-full border border-white/10 bg-white/5" />
      </div>
      <div className="mt-3 text-sm font-semibold text-white/90">{title}</div>
      <div className="mt-2 text-sm leading-relaxed text-white/70">{desc}</div>
    </div>
  );
}

function CTA() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <div className="text-sm font-semibold text-white/90">Want the walkthrough?</div>
      <div className="mt-2 text-sm text-white/70">
        We'll demo the War Room in executive mode, then open the hood: receipts, attachments,
        manifests, and PASS/FAIL verification.
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
          Open War Room →
        </Link>
        <Link
          href="/evidence-receipts"
          className="rounded-2xl border border-white/10 bg-black/40 px-5 py-2.5 text-sm text-white/80 hover:bg-white/5"
        >
          Evidence Receipts →
        </Link>
      </div>
    </div>
  );
}

export default function Platform() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div className="text-xs tracking-[0.2em] text-white/50">PLATFORM</div>
            <h1 className="mt-4 text-4xl font-semibold leading-tight text-white/95">
              An operating system for fiduciary-grade decisions.
            </h1>
            <p className="mt-5 text-sm leading-relaxed text-white/70">
              Kincaid IQ converts messy reality into a board-ready posture: immutable artifacts,
              evidence receipts, export manifests, and integrity verification. This is how you stop
              "trust me" reporting and start provable decisioning.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/request-demo"
                className="rounded-2xl border border-white/10 bg-white/10 px-6 py-3 text-sm text-white hover:bg-white/15"
              >
                Request demo →
              </Link>
              <Link
                href="/war-room"
                className="rounded-2xl border border-white/10 bg-black/40 px-6 py-3 text-sm text-white/80 hover:bg-white/5"
              >
                Open War Room →
              </Link>
            </div>
          </div>

          {/* "visual" placeholder (keeps premium feel without images) */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6">
              <div className="text-sm font-semibold text-white/90">
                SiriusB iQ War Room
              </div>
              <div className="mt-2 text-sm text-white/70">
                Executive tiles + ranked events, with receipts and verification behind every claim.
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                {[
                  { k: "Population Index", v: "Peer-indexed" },
                  { k: "EBITDA Drag", v: "Live estimate" },
                  { k: "Recoverable", v: "Ranked" },
                  { k: "EBITDA at Risk", v: "Forward view" },
                ].map((x) => (
                  <div
                    key={x.k}
                    className="rounded-2xl border border-white/10 bg-black/40 p-4"
                  >
                    <div className="text-[11px] text-white/55">{x.k}</div>
                    <div className="mt-2 text-sm font-semibold text-white/90">{x.v}</div>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-black/40 p-4">
                <div className="text-[11px] text-white/55">Integrity posture</div>
                <div className="mt-2 text-sm text-white/80">
                  Receipts → attachments → manifests → PASS/FAIL verify
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PILLARS */}
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Pillar
            title="SiriusB iQ War Room"
            tag="Executive view"
            desc="4-Tile Executive View with Ranked Events. Quantify impact, prioritize action, and drill into evidence."
            bullets={[
              "Ranked events by severity, velocity, confidence, recoverable EBITDA",
              "Tile drilldown: KPI → event → receipt → attachment",
              "Confidence gating prevents authority inversion",
              "Built to run as a daily operator, not a quarterly deck",
            ]}
            href="/war-room"
          />
          <Pillar
            title="Evidence Receipts"
            tag="Audit trail"
            desc="Every KPI is attached to receipts. Every receipt is hashable. Every decision is defensible."
            bullets={[
              "VERIFIED / UNVERIFIED gating with reason codes",
              "Immutable artifact hashes + versioned transform hashes",
              "Attachments hashed at the byte level (sha256)",
              "Receipts become the system of record for claims",
            ]}
            href="/evidence-receipts"
          />
          <Pillar
            title="Board Pack Exports"
            desc="One click → audit-ready board packs with provenance. Secure proof delivery to investors, auditors, board members."
            icon={<FileText className="h-5 w-5" />}
            href="/platform/evidence"
          />
          <Pillar
            title="Investor Verification Portal"
            desc="Time-stamped proof delivery with read receipts. Cryptographic chain-of-custody for sensitive financial disclosures."
            icon={<Shield className="h-5 w-5" />}
            href="/investor"
          />
          <Pillar
            title="Integrity Verification"
            tag="PASS/FAIL"
            desc="Verify any export on demand. If anything was modified, swapped, or missing—verification fails with details."
            bullets={[
              "Recomputes manifest hashes server-side",
              "Checks receipt presence + hash/gate mismatches",
              "Checks attachment bytes sha256 + content length",
              "Returns exact mismatch diagnostics (audit-friendly)",
            ]}
            href="/api/succession-iq/board-pack-export/demo/verify"
          />
        </div>

        {/* HOW IT WORKS */}
        <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-stretch">
          <div className="lg:col-span-5 rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="text-sm font-semibold text-white/90">How it works</div>
            <div className="mt-2 text-sm leading-relaxed text-white/70">
              The platform is built around a simple thesis: decision authority must be backed by
              verifiable evidence. So we store raw artifacts, produce receipts with lineage, then
              publish exports that can be verified independently.
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-4">
              <div className="text-[11px] text-white/55">Truth Governance model</div>
              <div className="mt-2 text-sm text-white/80">
                Immutable artifacts → versioned transforms → evidence receipts → exports → verify
              </div>
            </div>

            <div className="mt-6">
              <CTA />
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 gap-4 md:grid-cols-2">
            <FlowStep
              n="01"
              title="Capture"
              desc="Ingest raw artifacts (docs, files, feeds). Hash them. Store them immutably."
            />
            <FlowStep
              n="02"
              title="Receipt"
              desc="Compute KPIs from versioned transforms. Emit receipts with lineage + confidence gates."
            />
            <FlowStep
              n="03"
              title="Export"
              desc="Publish a board pack: PDF cover sheet + manifests for receipts and attachments."
            />
            <FlowStep
              n="04"
              title="Verify"
              desc="Recompute hashes and validate existence. PASS/FAIL with mismatch diagnostics."
            />
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-10">
          <CTA />
        </div>
      </section>

      {/* CTA */}
    </main>
  );
}