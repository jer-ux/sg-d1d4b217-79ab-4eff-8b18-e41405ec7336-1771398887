import * as React from "react";
import { motion } from "framer-motion";
import { Clock, FlaskConical, Link2, UserCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function Token({
  icon,
  title,
  subtitle,
  tag,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  tag: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="h-full"
    >
      <Card className="h-full rounded-3xl border-white/20 bg-gradient-to-br from-white/[0.12] to-white/[0.05] shadow-[0_12px_40px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.1)_inset] backdrop-blur-xl hover:border-white/30 hover:shadow-[0_16px_56px_rgba(139,92,246,0.3)] transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="rounded-2xl border border-white/20 bg-gradient-to-br from-white/15 to-black/40 p-3.5 shadow-[0_8px_24px_rgba(0,0,0,0.3)] backdrop-blur-sm">
                {icon}
              </div>
              <div>
                <div className="text-base font-semibold text-white">{title}</div>
                <div className="mt-1.5 text-sm text-white/75">{subtitle}</div>
              </div>
            </div>

            <Badge className="rounded-2xl border border-white/20 bg-gradient-to-br from-white/15 to-black/40 px-3.5 py-1.5 text-white/90 shadow-lg backdrop-blur-sm">
              {tag}
            </Badge>
          </div>

          <div className="mt-5 text-xs text-white/55">
            If this fails, the UI renders as <span className="font-medium text-amber-300/90">UNVERIFIED</span>.
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function TrustBar() {
  return (
    <div className="rounded-[2rem] border border-white/20 bg-gradient-to-br from-white/[0.1] to-white/[0.04] p-7 md:p-8 shadow-[0_20px_80px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.1)_inset] backdrop-blur-xl">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-xs font-medium uppercase tracking-[0.24em] text-white/60">Trust controls</div>
          <div className="mt-3 bg-gradient-to-br from-white via-white to-white/90 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
            Proof tokens on every KPI
          </div>
          <div className="mt-3 max-w-2xl text-base leading-relaxed text-white/75">
            This is the "numbers we can defend" layer. It's not a feature. It's the product.
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-xs text-white/60 md:mt-0">
          <div className="h-2 w-2 rounded-full bg-emerald-400/80 shadow-[0_0_12px_rgba(16,185,129,0.6)]" />
          Procurement-safe by design
        </div>
      </div>

      <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-4">
        <Token
          icon={<Clock className="h-5 w-5 text-amber-300" />}
          title="Freshness"
          subtitle="Stale pipelines auto-downgrade"
          tag="SLO"
        />
        <Token
          icon={<FlaskConical className="h-5 w-5 text-sky-300" />}
          title="DQ Tests"
          subtitle="Pass rates enforced, not implied"
          tag="QA"
        />
        <Token
          icon={<Link2 className="h-5 w-5 text-emerald-300" />}
          title="Lineage"
          subtitle="Source → transform → output hash"
          tag="HASH"
        />
        <Token
          icon={<UserCheck className="h-5 w-5 text-purple-300" />}
          title="Owner"
          subtitle="Accountability + approvals"
          tag="RACI"
        />
      </div>
    </div>
  );
}