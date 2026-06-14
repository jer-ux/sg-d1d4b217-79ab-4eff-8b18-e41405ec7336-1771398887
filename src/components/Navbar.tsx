import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

const navItems = [
  { label: "Platform", href: "/platform" },
  { label: "Company", href: "/company" },
  { label: "Family Offices", href: "/family-offices" },
  { label: "Uploads", href: "/all-uploads" },
  { label: "Request demo", href: "/request-demo", cta: true },
];

export default function Navbar() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/20 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center">
          <Image 
            src="/1772951240194-20bfeb68-285b-4423-9485-b2585796d66a.jpeg"
            alt="Kincaid IQ Data Sciences Lab"
            width={150}
            height={38}
            className="h-9 w-auto"
            priority
          />
        </Link>

        <nav className="flex items-center gap-2">
          {navItems.map((item) => {
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