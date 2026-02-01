import Link from "next/link";
import { useRouter } from "next/router";

const nav = [
  { label: "Platform", href: "/platform" },
  { label: "Company", href: "/company" },
  { label: "Request demo", href: "/request-demo", cta: true },
  { label: "Investor access", href: "/investor" },
];

export default function Navbar() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-sm font-semibold tracking-wide text-white/90">
          Kincaid IQ
        </Link>

        <nav className="flex items-center gap-2">
          {nav.map((item) => {
            const active = router.pathname === item.href;
            const base =
              "rounded-xl px-4 py-2 text-sm transition border border-transparent";
            const normal = active
              ? "bg-white/10 text-white"
              : "text-white/70 hover:text-white hover:bg-white/5";
            const cta =
              "border-white/10 bg-white/10 text-white hover:bg-white/15";

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${base} ${item.cta ? cta : normal}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}