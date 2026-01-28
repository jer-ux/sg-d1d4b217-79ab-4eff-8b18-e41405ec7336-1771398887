import * as React from "react";
import { BadgeCheck, Lock, Receipt, ArrowRight, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function StepCard({
  icon,
  title,
  desc,
  bullets,
  badge,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  bullets: string[];
  badge: string;
}) {
  return (
    <Card className="rounded-3xl border-white/10 bg-white/[0.04] shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 rounded-2xl border border-white/10 bg-black/30 p-3">
              {icon}
            </div>
            <div>
              <div className="text-lg font-semibold text-white">{title}</div>
              <div className="mt-1 text-sm text-white/60">{desc}</div>
            </div>
          </div>

          <Badge className="rounded-2xl border border-white/10 bg-black/30 px-3 py-1 text-white/80">
            {badge}
          </Badge>
        </div>

        <div className="mt-5 space-y-2">
          {bullets.map((b) => (
            <div key={b} className="flex items-start gap-2 text-sm text-white/70">
              <BadgeCheck className="mt-0.5 h-4 w-4 text-emerald-300/80" />
              <span>{b}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function Connector() {
  return (
    <div className="flex items-center justify-center py-3 md:py-0">
      <div className="hidden md:flex items-center gap-2 text-white/35">
        <ArrowRight className="h-5 w-5" />
        <ArrowRight className="h-5 w-5 opacity-60" />
        <ArrowRight className="h-5 w-5 opacity-40" />
      </div>
      <div className="md:hidden h-px w-full bg-white/10" />
    </div>
  );
}

export function HowItWorksFlow() {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-6 md:p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.22em] text-white/45">How it works</div>
          <div className="mt-2 text-2xl font-semibold text-white md:text-3xl">
            Receipt → Gate → Verified Value
          </div>
          <div className="mt-2 max-w-2xl text-white/65">
            Kincaid IQ is engineered so executive decisions are backed by provable lineage, enforced controls,
            and closed-loop value tracking.
          </div>
        </div>

        <div className="mt-3 md:mt-0 text-xs text-white/45">
          Rule: if it can't be proven, it renders as <span className="text-amber-200/80">UNVERIFIED</span>.
        </div>
      </div>

      <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-stretch">
        <StepCard
          icon={<Receipt className="h-5 w-5 text-amber-200/90" />}
          title="1) Evidence Receipt"
          desc="Every metric ships with a proof object."
          badge="PROVENANCE"
          bullets={[
            "Source artifact + transform hashes",
            "Freshness + reconciliation metadata",
            "Owner + confidence scoring",
          ]}
        />

        <Connector />

        <StepCard
          icon={<Lock className="h-5 w-5 text-sky-200/90" />}
          title="2) Integrity Gate"
          desc="Fail-closed controls prevent silent drift."
          badge="FAIL-CLOSED"
          bullets={[
            "DQ tests enforced before tiles render",
            "Versioned definitions (no silent change)",
            "Explicit reasons when blocked",
          ]}
        />

        <Connector />

        <StepCard
          icon={<ShieldCheck className="h-5 w-5 text-emerald-200/90" />}
          title="3) Verified Value"
          desc="Impact tracked like finance, not vibes."
          badge="VALUE TRAIL"
          bullets={[
            "Modeled → Verified → Realized tracking",
            "Action packets with owners + SLAs",
            "Variance attribution that survives audits",
          ]}
        />
      </div>
    </div>
  );
}