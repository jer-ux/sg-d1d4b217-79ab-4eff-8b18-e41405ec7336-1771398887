import dynamic from "next/dynamic";
import { SEO } from "@/components/SEO";

// Client-side only to prevent hydration mismatches from random demo data
const WarRoom = dynamic(() => import("@/components/warroom/WarRoom").then(mod => ({ default: mod.WarRoom })), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="text-sm text-zinc-400">Loading War Room…</div>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-40 animate-pulse rounded-2xl border border-zinc-800/60 bg-zinc-950/60" />
          ))}
        </div>
      </div>
    </div>
  ),
});

export default function ExecutiveWarRoomPage() {
  return (
    <>
      <SEO
        title="Executive War Room | Kincaid IQ"
        description="Real-time executive dashboard with KPIs, ranked events, and operational intelligence"
      />
      <WarRoom />
    </>
  );
}