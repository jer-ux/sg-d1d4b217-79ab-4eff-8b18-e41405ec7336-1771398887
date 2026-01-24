import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 mt-20">
      <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-white/70 flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
        <div>
          <div className="text-white/90 font-medium">Kincaid IQ</div>
          <div className="text-white/60">Decision-grade value systems. Controls-first analytics.</div>
        </div>
        <div className="flex gap-5">
          <Link href="/security-governance" className="hover:text-white">Security</Link>
          <Link href="/case-studies" className="hover:text-white">Case Studies</Link>
          <Link href="/contact" className="hover:text-white">Contact</Link>
        </div>
      </div>
    </footer>
  );
}