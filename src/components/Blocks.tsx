import Link from "next/link";

export function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-[#070A12] text-white">
      {/* Background Elements */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0118] via-[#0A0118] to-[#050008]" />
        <div className="absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-purple-500/8 blur-[120px]" />
        <div className="absolute right-1/4 bottom-1/3 h-[400px] w-[400px] rounded-full bg-blue-500/8 blur-[120px]" />
      </div>
      <div className="mx-auto max-w-6xl px-6 py-12">{children}</div>
    </div>
  );
}

export function CTA() {
  return (
    <div className="rounded-3xl border border-orange-400/25 bg-gradient-to-br from-orange-400/10 via-rose-400/5 to-transparent p-8 mt-10 shadow-[0_20px_70px_rgba(251,191,36,0.15)] backdrop-blur-xl transition-all hover:border-orange-400/35">
      <div className="text-2xl font-bold text-white">Make value provable.</div>
      <div className="text-white/80 mt-3 max-w-2xl text-lg">
        Kincaid IQ turns complex cost and operational opacity into an auditable ledger with evidence receipts, controls, and action workflows.
      </div>
      <div className="mt-6 flex gap-3">
        <Link 
          href="/contact" 
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105"
        >
          Request demo
        </Link>
        <Link
          href="/capital-markets"
          className="px-6 py-3 rounded-2xl border-2 border-orange-400/50 bg-orange-500/10 text-orange-300 font-semibold hover:bg-orange-500/20 hover:border-orange-400 transition-all duration-300 hover:scale-105"
        >
          Investor access
        </Link>
      </div>
    </div>
  );
}

export function PageHero({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="py-14">
      <div className="text-4xl md:text-5xl font-semibold tracking-tight text-white">{title}</div>
      <div className="mt-4 text-white/70 text-lg max-w-3xl">{subtitle}</div>
    </div>
  );
}

// Deprecated: Navigation moved to Header Dropdowns. Kept for backward compatibility.
export function ProofBar() {
  return null;
}

export function CardGrid({ items }: { items: { title: string; body: string; highlight?: string; color?: string }[] }) {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {items.map((it) => {
        const bodyParts = it.highlight ? it.body.split(it.highlight) : [it.body];
        const colorClass = 
          it.color === "cyan" ? "text-cyan-300" :
          it.color === "blue" ? "text-blue-300" :
          "text-blue-200";

        return (
          <div 
            key={it.title} 
            className="rounded-3xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 p-6 shadow-[0_20px_70px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-all hover:border-white/25 duration-300"
          >
            <div className="font-semibold text-lg text-white">{it.title}</div>
            <div className="text-sm text-white/70 mt-2">
              {it.highlight ? (
                <>
                  {bodyParts[0]}
                  <span className={colorClass + " font-medium"}>{it.highlight}</span>
                  {bodyParts[1]}
                </>
              ) : (
                it.body
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}