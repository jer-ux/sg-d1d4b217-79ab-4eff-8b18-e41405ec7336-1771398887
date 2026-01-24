import Link from "next/link";
import { proofBar } from "@/components/site";

export function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-6xl px-6">{children}</div>;
}

export function ProofBar() {
  return (
    <div className="k-panel px-5 py-3 text-xs text-white/70 flex flex-wrap gap-3">
      {proofBar.map((x) => (
        <span key={x} className="px-3 py-1 rounded-full border border-white/10 bg-white/5">
          {x}
        </span>
      ))}
    </div>
  );
}

export function CTA() {
  return (
    <div className="k-panel p-8 mt-10">
      <div className="text-xl font-semibold text-white">Make value provable.</div>
      <div className="text-white/65 mt-2 max-w-2xl">
        Kincaid IQ turns complex cost and operational opacity into an auditable ledger with evidence receipts, controls, and action workflows.
      </div>
      <div className="mt-5 flex gap-2">
        <Link href="/contact" className="px-4 py-2 rounded-xl bg-white text-black font-medium">
          Request demo
        </Link>
        <Link
          href="/capital-markets"
          className="px-4 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition"
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

export function CardGrid({ items }: { items: { title: string; body: string }[] }) {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {items.map((it) => (
        <div key={it.title} className="k-panel p-6">
          <div className="font-semibold">{it.title}</div>
          <div className="text-sm text-white/70 mt-2">{it.body}</div>
        </div>
      ))}
    </div>
  );
}