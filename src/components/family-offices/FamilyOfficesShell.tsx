import Head from "next/head";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function FamilyOfficesShell(props: {
  title: string;
  eyebrow?: string;
  subtitle?: string;
  backHref?: string;
  backLabel?: string;
  children: React.ReactNode;
}) {
  const { title, eyebrow, subtitle, backHref, backLabel, children } = props;

  return (
    <main className="min-h-screen bg-black text-white">
      <Head>
        <title>{title} | Kincaid IQ</title>
        <meta name="description" content={subtitle || title} />
      </Head>

      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-3xl">
            {backHref && backLabel ? (
              <Link
                href={backHref}
                className="inline-flex items-center rounded-2xl border border-white/10 bg-black/40 px-4 py-2 text-sm text-white/75 hover:bg-white/5"
              >
                ← {backLabel}
              </Link>
            ) : null}

            {eyebrow ? (
              <div className="mt-5 text-xs tracking-[0.2em] text-white/50">{eyebrow}</div>
            ) : null}

            <h1 className="mt-4 text-4xl font-semibold leading-tight text-white/95">
              {title}
            </h1>

            {subtitle ? (
              <p className="mt-5 text-sm leading-relaxed text-white/70">{subtitle}</p>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/request-demo"
              className="rounded-2xl border border-white/10 bg-white/10 px-6 py-3 text-sm text-white hover:bg-white/15"
            >
              Request demo →
            </Link>
            <Link
              href="/contact"
              className="rounded-2xl border border-white/10 bg-black/40 px-6 py-3 text-sm text-white/80 hover:bg-white/5"
            >
              Contact →
            </Link>
          </div>
        </div>

        <div className="mt-10">{children}</div>

        <div className="mt-14 rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-xs tracking-[0.2em] text-white/50">KENDRA™</div>
          <div className="mt-3 text-lg font-semibold text-white/90">Kincaid IQ Client Concierge</div>
          <div className="mt-2 text-sm text-white/70">
            Confidential intake, routing, and scheduling.
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href="mailto:jer@kincaidrmc.com"
              className="rounded-2xl border border-white/10 bg-black/40 px-6 py-3 text-sm text-white/80 hover:bg-white/5"
            >
              Email jer@kincaidrmc.com →
            </a>
            <a
              href="tel:+12192563331"
              className="rounded-2xl border border-white/10 bg-black/40 px-6 py-3 text-sm text-white/80 hover:bg-white/5"
            >
              Call (219) 256-3331 →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}