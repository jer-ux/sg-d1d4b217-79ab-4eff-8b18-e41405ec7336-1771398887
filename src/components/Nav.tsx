import Link from "next/link";
import { nav } from "@/components/site";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/30 border-b border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">
          <span className="text-white">Kincaid</span>{" "}
          <span className="text-white/70">IQ</span>
        </Link>

        <nav className="hidden md:flex gap-5 text-sm text-white/75">
          {nav.map((i) => (
            <Link key={i.href} href={i.href} className="hover:text-white transition">
              {i.label}
            </Link>
          ))}
        </nav>

        <div className="flex gap-2">
          <Link
            href="/contact"
            className="px-4 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition text-sm"
          >
            Request demo
          </Link>
          <Link
            href="/capital-markets"
            className="px-4 py-2 rounded-xl bg-white text-black hover:bg-white/90 transition text-sm font-medium"
          >
            Investor access
          </Link>
        </div>
      </div>
    </header>
  );
}