import Link from "next/link";
import { Button } from "@/components/ui/button";

export function SiteHeader({ active }: { active?: string }) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="text-lg font-semibold text-white">
          Kincaid IQ
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/kincaid-iq"
            className={`text-sm ${active === "kincaid-iq" ? "text-white" : "text-white/60 hover:text-white"}`}
          >
            Platform
          </Link>
          <Link
            href="/war-room"
            className={`text-sm ${active === "war-room" ? "text-white" : "text-white/60 hover:text-white"}`}
          >
            War Room
          </Link>
          <Link
            href="/company"
            className={`text-sm ${active === "company" ? "text-white" : "text-white/60 hover:text-white"}`}
          >
            Company
          </Link>
          <Button asChild className="h-9 rounded-xl">
            <Link href="/contact">Contact</Link>
          </Button>
        </nav>

        <Button asChild className="h-9 rounded-xl md:hidden">
          <Link href="/contact">Contact</Link>
        </Button>
      </div>
    </header>
  );
}