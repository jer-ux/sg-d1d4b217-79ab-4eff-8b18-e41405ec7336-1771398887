import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useState } from "react";

export default function InvestorAccess() {
  const [accessCode, setAccessCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for actual authentication
    if (accessCode === "KINCAID2026") {
      // Redirect to investor portal or show content
      window.location.href = "/capital-markets";
    } else {
      setError("Invalid access code");
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mx-auto max-w-md">
          <div className="text-xs tracking-[0.2em] text-white/50">
            INVESTOR ACCESS
          </div>
          <h1 className="mt-4 text-3xl font-semibold text-white/95">
            Gated access for investors and strategic partners.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            Enter your access code to view investor materials, financial models, and strategic roadmap.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label htmlFor="accessCode" className="block text-sm text-white/80">
                Access Code
              </label>
              <input
                id="accessCode"
                type="password"
                value={accessCode}
                onChange={(e) => {
                  setAccessCode(e.target.value);
                  setError("");
                }}
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 focus:border-white/20 focus:outline-none"
                placeholder="Enter code"
              />
              {error && (
                <div className="mt-2 text-sm text-red-400">{error}</div>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl border border-white/10 bg-white/10 px-6 py-3 text-sm text-white hover:bg-white/15"
            >
              Access investor portal →
            </button>
          </form>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs font-semibold text-white/80">
              Need access?
            </div>
            <div className="mt-1 text-sm text-white/60">
              Contact your relationship manager or{" "}
              <Link href="/contact" className="underline hover:text-white">
                reach out to our team
              </Link>
              .
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}