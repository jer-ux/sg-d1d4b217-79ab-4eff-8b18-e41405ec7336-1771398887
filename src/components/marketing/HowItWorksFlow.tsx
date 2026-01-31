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
    <Card className="group rounded-3xl border-white/15 bg-gradient-to-br from-white/[0.08] to-white/[0.03] shadow-[0_8px_32px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.06)_inset] backdrop-blur-xl hover:border-white/25 hover:shadow-[0_12px_48px_rgba(139,92,246,0.25)] transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 rounded-2xl border border-white/15 bg-gradient-to-br from-white/10 to-black/30 p-3 shadow-lg group-hover:border-white/25 transition-all">
              {icon}
            </div>
            <div>
              <div className="text-lg font-semibold text-white">{title}</div>
              <div className="mt-1 text-sm text-white/70">{desc}</div>
            </div>
          </div>

          <Badge className="rounded-2xl border border-white/15 bg-gradient-to-br from-white/10 to-black/30 px-3 py-1 text-white/85 shadow-lg backdrop-blur-sm">
            {badge}
          </Badge>
        </div>

        <div className="mt-5 space-y-2">
          {bullets.map((b) => (
            <div key={b} className="flex items-start gap-2 text-sm text-white/75">
              <BadgeCheck className="mt-0.5 h-4 w-4 text-emerald-300 flex-shrink-0" />
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
      <div className="hidden md:flex items-center gap-2 text-white/40">
        <ArrowRight className="h-5 w-5 animate-pulse" style={{ animationDelay: "0ms" }} />
        <ArrowRight className="h-5 w-5 opacity-70 animate-pulse" style={{ animationDelay: "200ms" }} />
        <ArrowRight className="h-5 w-5 opacity-50 animate-pulse" style={{ animationDelay: "400ms" }} />
      </div>
      <div className="md:hidden h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  );
}

export function HowItWorksFlow() {
  return (
    <div className="rounded-[2rem] border border-white/15 bg-gradient-to-br from-white/[0.08] to-white/[0.03] p-6 md:p-8 shadow-[0_20px_80px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.06)_inset] backdrop-blur-xl">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.22em] text-white/50">How it works</div>
          <div className="mt-2 text-2xl font-semibold text-white md:text-3xl">
            Receipt → Gate → Verified Value
          </div>
          <div className="mt-2 max-w-2xl text-white/75">
            Kincaid IQ is engineered so executive decisions are backed by provable lineage, enforced controls,
            and closed-loop value tracking.
          </div>
        </div>

        <div className="mt-3 md:mt-0 text-xs text-white/50">
          Rule: if it can't be proven, it renders as <span className="text-amber-300 font-medium">UNVERIFIED</span>.
        </div>
      </div>

      <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-stretch">
        <StepCard
          icon={<Receipt className="h-5 w-5 text-amber-300" />}
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
          icon={<Lock className="h-5 w-5 text-sky-300" />}
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
          icon={<ShieldCheck className="h-5 w-5 text-emerald-300" />}
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