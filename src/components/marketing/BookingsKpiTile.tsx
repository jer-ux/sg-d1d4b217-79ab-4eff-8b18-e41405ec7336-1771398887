import * as React from "react";
import Link from "next/link";
import { CalendarClock, ChevronRight } from "lucide-react";
import { useDemoReceipts, countBookedReceipts } from "@/lib/useDemoReceipts";

export function BookingsKpiTile({ href = "/evidence-receipts" }: { href?: string }) {
  const receipts = useDemoReceipts();
  const booked = countBookedReceipts(receipts);

  return (
    <Link
      href={href}
      className="group rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] transition hover:bg-white/[0.07]"
    >
      <div className="flex items-start justify-between gap-5">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-2xl border border-white/10 bg-black/30 p-3">
            <CalendarClock className="h-5 w-5 text-amber-200/90" />
          </div>
          <div>
            <div className="text-lg font-semibold text-white">Bookings</div>
            <div className="mt-1 text-sm text-white/60">Calendly scheduled events → proof receipts</div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white/80">
          {booked}
        </div>
      </div>

      <div className="mt-5 text-xs text-white/50">
        Live from local receipt stream. (Demo-safe, production-ready pattern.)
      </div>

      <div className="mt-5 flex items-center justify-between text-sm text-white/60">
        <span className="inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
          VERIFIED PIPELINE
        </span>
        <span className="inline-flex items-center gap-1 text-white/75 group-hover:text-white">
          Open <ChevronRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}