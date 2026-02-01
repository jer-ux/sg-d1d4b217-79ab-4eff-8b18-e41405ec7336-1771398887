import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="max-w-3xl">
          <div className="text-xs tracking-[0.2em] text-white/50">
            FIDUCIARY-GRADE TRANSPARENCY ENGINE
          </div>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-white/95">
            Kincaid IQ turns plan complexity into decision clarity.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-white/70">
            Evidence receipts, immutable artifacts, and executive-grade dashboards that quantify
            EBITDA drag and recoverable value—without hand-wavy consulting theater.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/request-demo"
              className="rounded-2xl border border-white/10 bg-white/10 px-6 py-3 text-sm text-white hover:bg-white/15"
            >
              Request demo →
            </Link>
            <Link
              href="/platform"
              className="rounded-2xl border border-white/10 bg-black/40 px-6 py-3 text-sm text-white/80 hover:bg-white/5"
            >
              Explore platform →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}