import Link from "next/link";
import { useMemo, useActionState } from "react";

// Server action for demo request submission
async function submitDemoRequest(prevState: any, formData: FormData) {
  "use server";
  
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 450));
  
  // Extract form data
  const name = formData.get("name");
  const email = formData.get("email");
  const company = formData.get("company");
  const message = formData.get("message");

  // In production, this would send to your backend API
  console.log("Demo request:", { name, email, company, message });

  return { 
    success: true, 
    message: "Submitted ✅ We'll reply with scheduling options." 
  };
}

export default function RequestDemo() {
  const [state, formAction, isPending] = useActionState(submitDemoRequest, null);

  const defaultMsg = useMemo(
    () =>
      `Interested in Kincaid IQ War Room.\n\nCompany:\nHeadcount:\nCurrent broker/TPA/PBM:\nPrimary pain:\nTimeline:\n`,
    []
  );

  return (
    <main className="min-h-screen bg-black text-white">
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
            <form action={formAction} className="space-y-4">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <input
                  required
                  name="name"
                  placeholder="Full name"
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white/90 placeholder:text-white/40 outline-none focus:border-white/25"
                />
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="Work email"
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white/90 placeholder:text-white/40 outline-none focus:border-white/25"
                />
                <input
                  name="company"
                  placeholder="Company"
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white/90 placeholder:text-white/40 outline-none focus:border-white/25 md:col-span-2"
                />
              </div>

              <textarea
                name="message"
                defaultValue={defaultMsg}
                rows={8}
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white/90 placeholder:text-white/40 outline-none focus:border-white/25"
              />

              <button
                type="submit"
                disabled={isPending}
                className="w-full rounded-2xl border border-white/10 bg-white/10 px-5 py-3 text-sm text-white hover:bg-white/15 disabled:opacity-60"
              >
                {isPending ? "Sending…" : "Request demo →"}
              </button>

              {state?.success && (
                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">
                  {state.message}
                </div>
              )}
            </form>
          </div>

          <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-black/40 p-6">
            <div className="text-sm font-semibold text-white/90">What you'll see</div>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              {[
                "Kincaid IQ War Room (ranked events + executive tiles)",
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