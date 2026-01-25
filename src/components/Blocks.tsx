import Link from "next/link";

export function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-6xl px-6">{children}</div>;
}

export function CTA() {
  return (
    <div className="k-panel p-8 mt-10 border-orange-500/20 hover-lift">
      <div className="text-2xl font-bold text-white">Make value provable.</div>
      <div className="text-white/80 mt-3 max-w-2xl text-lg">
        Kincaid IQ turns complex cost and operational opacity into an auditable ledger with evidence receipts, controls, and action workflows.
      </div>
      <div className="mt-6 flex gap-3">
        <Link 
          href="/contact" 
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105"
        >
          Request demo
        </Link>
        <Link
          href="/capital-markets"
          className="px-6 py-3 rounded-xl border-2 border-orange-400/50 bg-orange-500/10 text-orange-300 font-semibold hover:bg-orange-500/20 hover:border-orange-400 transition-all duration-300 hover:scale-105"
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
      <div className="text-4xl md:text-5xl font-semibold tracking-tight">{title}</div>
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
          <div key={it.title} className="k-panel p-6 hover:border-white/20 transition-all duration-300">
            <div className="font-semibold text-lg">{it.title}</div>
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