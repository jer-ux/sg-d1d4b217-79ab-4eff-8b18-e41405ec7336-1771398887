import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function InvestorAccess() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("INV_ACCESS_OK") : null;
    if (saved === "1") setOk(true);
  }, []);

  useEffect(() => {
    if (ok) {
      router.push("/capital-markets");
    }
  }, [ok, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);

    if (code.trim().toUpperCase() === "KINCAID2026") {
      if (typeof window !== "undefined") {
        localStorage.setItem("INV_ACCESS_OK", "1");
      }
      setOk(true);
    } else {
      setErr("Invalid access code.");
    }
  };

  if (ok) {
    return (
      <main className="min-h-screen bg-black text-white">
        <Navbar />
        <section className="mx-auto max-w-7xl px-6 py-14">
          <div className="max-w-2xl">
            <div className="text-sm text-white/70">Redirecting to investor materials...</div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="max-w-2xl">
          <div className="text-xs tracking-[0.2em] text-white/50">INVESTOR ACCESS</div>
          <h1 className="mt-4 text-3xl font-semibold text-white/95">
            Enter your access code.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            This area contains confidential investor materials, board-level metrics, and capital
            structure disclosures.
          </p>
        </div>

        <div className="mt-10 max-w-md rounded-3xl border border-white/10 bg-white/5 p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              required
              type="text"
              placeholder="Access code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white/90 placeholder:text-white/40 outline-none focus:border-white/25"
            />

            <button
              type="submit"
              className="w-full rounded-2xl border border-white/10 bg-white/10 px-5 py-3 text-sm text-white hover:bg-white/15"
            >
              Submit →
            </button>

            {err ? (
              <div className="rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-100">
                {err}
              </div>
            ) : null}
          </form>

          <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-white/70">
            <div className="font-semibold text-white/90">Need access?</div>
            <div className="mt-2">
              Contact your investor relations representative or email{" "}
              <span className="text-white/90">ir@kincaid-iq.com</span> for credentials.
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}