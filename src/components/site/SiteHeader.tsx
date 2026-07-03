import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function SiteHeader({ active }: { active?: string }) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/20 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center">
          <Image 
            src="/1772951240194-20bfeb68-285b-4423-9485-b2585796d66a.jpeg"
            alt="Kincaid Health Data Sciences Lab"
            width={150}
            height={38}
            className="h-9 w-auto"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/kincaid-health"
            className={`text-sm ${active === "kincaid-health" ? "text-white" : "text-white/60 hover:text-white"}`}
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
            href="/all-uploads"
            className={`text-sm ${active === "all-uploads" ? "text-white" : "text-white/60 hover:text-white"}`}
          >
            Uploads
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