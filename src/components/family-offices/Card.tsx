import Link from "next/link";

export function Card(props: { 
  title: string; 
  desc: string; 
  bullets: string[]; 
  href?: string;
  ctaLabel?: string;
}) {
  const { title, desc, bullets, href, ctaLabel } = props;
  
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <div className="text-base font-semibold text-white/90">{title}</div>
      <div className="mt-2 text-sm leading-relaxed text-white/70">{desc}</div>

      <ul className="mt-4 space-y-2 text-sm text-white/70">
        {bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-white/35" />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      {href ? (
        <div className="mt-6">
          <Link
            href={href}
            className="inline-flex rounded-2xl border border-white/10 bg-black/40 px-4 py-2 text-sm text-white/80 hover:bg-white/5"
          >
            {ctaLabel || "Learn more"} →
          </Link>
        </div>
      ) : null}
    </div>
  );
}