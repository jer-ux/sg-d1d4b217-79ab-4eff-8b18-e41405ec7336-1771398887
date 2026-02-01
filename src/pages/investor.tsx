import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";

export default function InvestorAccess() {
  const [code, setCode] = useState("");
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("INV_ACCESS_OK") : null;
    if (saved === "1") setOk(true);
  }, []);

  async function verify() {
    setErr(null);
    const r = await fetch("/api/investor/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });
    const d = await r.json();
    if (d?.ok) {
      localStorage.setItem("INV_ACCESS_OK", "1");
      setOk(true);
    } else {
      setErr("Invalid code.");
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-5xl px-6 py-14">
        <div className="max-w-2xl">
          <div className="text-xs tracking-[0.2em] text-white/50">INVESTOR ACCESS</div>
          <h1 className="mt-4 text-3xl font-semibold text-white/95">
            Private materials portal.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            This area is gated. If you have an access code, enter it below.
          </p>
        </div>

        {!ok ? (
          <div className="mt-10 max-w-xl rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="text-sm font-semibold text-white/90">Enter access code</div>
            <div className="mt-4 flex gap-3">
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Access code"
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white/90 placeholder:text-white/40 outline-none focus:border-white/25"
              />
              <button
                onClick={verify}
                className="rounded-2xl border border-white/10 bg-white/10 px-5 py-3 text-sm text-white hover:bg-white/15"
              >
                Unlock →
              </button>
            </div>
            {err ? (
              <div className="mt-4 rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">
                {err}
              </div>
            ) : null}
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="text-sm font-semibold text-white/90">What's inside</div>
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                {[
                  "Investment memo (placeholder)",
                  "Product architecture (chassis + modules)",
                  "Go-to-market model",
                  "Financial model + valuation assumptions",
                ].map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-white/40" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/40 p-6">
              <div className="text-sm font-semibold text-white/90">Next step</div>
              <div className="mt-2 text-sm text-white/70">
                If you want, we can add a secure download vault backed by receipts + manifests so
                investor materials are auditable too.
              </div>
              <button
                onClick={() => {
                  localStorage.removeItem("INV_ACCESS_OK");
                  setOk(false);
                }}
                className="mt-6 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
              >
                Lock portal
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}