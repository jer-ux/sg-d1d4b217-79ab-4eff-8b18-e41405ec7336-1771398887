import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function RequestDemo() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const defaultMsg = useMemo(
    () =>
      `Interested in Kincaid IQ + SiriusB iQ War Room.\n\nCompany:\nHeadcount:\nCurrent broker/TPA/PBM:\nPrimary pain:\nTimeline:\n`,
    []
  );

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="max-w-2xl">
          <div className="text-xs tracking-[0.2em] text-white/50">REQUEST DEMO</div>
          <h1 className="mt-4 text-3xl font-semibold text-white/95">
            Get a war-room walkthrough.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            We'll show the platform in executive mode: ranked events, confidence gating, evidence
            receipts, exports, and verification. Bring one ugly data problem — we love those 😄
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-5">
          <div className="lg:col-span-3 rounded-3xl border border-white/10 bg-white/5 p-6">
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setSending(true);
                setSent(false);

                // For demo: no backend email send. Just simulate + show success.
                await new Promise((r) => setTimeout(r, 450));
                setSent(true);
                setSending(false);
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <input
                  required
                  placeholder="Full name"
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white/90 placeholder:text-white/40 outline-none focus:border-white/25"
                />
                <input
                  required
                  type="email"
                  placeholder="Work email"
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white/90 placeholder:text-white/40 outline-none focus:border-white/25"
                />
                <input
                  placeholder="Company"
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white/90 placeholder:text-white/40 outline-none focus:border-white/25 md:col-span-2"
                />
              </div>

              <textarea
                defaultValue={defaultMsg}
                rows={8}
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white/90 placeholder:text-white/40 outline-none focus:border-white/25"
              />

              <button
                disabled={sending}
                className="w-full rounded-2xl border border-white/10 bg-white/10 px-5 py-3 text-sm text-white hover:bg-white/15 disabled:opacity-60"
              >
                {sending ? "Sending…" : "Request demo →"}
              </button>

              {sent ? (
                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">
                  Submitted ✅ We'll reply with scheduling options.
                </div>
              ) : null}
            </form>
          </div>

          <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-black/40 p-6">
            <div className="text-sm font-semibold text-white/90">What you'll see</div>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              {[
                "SiriusB iQ War Room (ranked events + executive tiles)",
                "Evidence receipts (hashes, gates, reason codes)",
                "Board pack exports (PDF + manifest JSON downloads)",
                "Integrity verification (PASS/FAIL + mismatch detail)",
              ].map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-white/40" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 text-sm font-semibold text-white/90">Prefer to explore first?</div>
            <div className="mt-3 flex flex-wrap gap-3">
              <Link
                href="/platform"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
              >
                Platform →
              </Link>
              <Link
                href="/war-room"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
              >
                War Room →
              </Link>
              <Link
                href="/evidence-receipts"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
              >
                Receipts →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}