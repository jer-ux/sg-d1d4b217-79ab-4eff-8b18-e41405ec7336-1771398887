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
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="h-full"
    >
      <Card className="h-full rounded-3xl border-white/10 bg-white/[0.04] shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-3">
                {icon}
              </div>
              <div>
                <div className="text-sm font-semibold text-white">{title}</div>
                <div className="mt-1 text-sm text-white/60">{subtitle}</div>
              </div>
            </div>

            <Badge className="rounded-2xl border border-white/10 bg-black/30 px-3 py-1 text-white/80">
              {tag}
            </Badge>
          </div>

          <div className="mt-4 text-xs text-white/45">
            If this fails, the UI renders as <span className="text-amber-200/80">UNVERIFIED</span>.
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function TrustBar() {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-6 md:p-7 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.22em] text-white/45">Trust controls</div>
          <div className="mt-2 text-2xl font-semibold text-white md:text-3xl">
            Proof tokens on every KPI
          </div>
          <div className="mt-2 max-w-2xl text-white/65">
            This is the "numbers we can defend" layer. It's not a feature. It's the product.
          </div>
        </div>

        <div className="mt-3 md:mt-0 text-xs text-white/45">
          Procurement-safe by design 🔒
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        <Token
          icon={<Clock className="h-5 w-5 text-amber-200/90" />}
          title="Freshness"
          subtitle="Stale pipelines auto-downgrade"
          tag="SLO"
        />
        <Token
          icon={<FlaskConical className="h-5 w-5 text-sky-200/90" />}
          title="DQ Tests"
          subtitle="Pass rates enforced, not implied"
          tag="QA"
        />
        <Token
          icon={<Link2 className="h-5 w-5 text-emerald-200/90" />}
          title="Lineage"
          subtitle="Source → transform → output hash"
          tag="HASH"
        />
        <Token
          icon={<UserCheck className="h-5 w-5 text-white/80" />}
          title="Owner"
          subtitle="Accountability + approvals"
          tag="RACI"
        />
      </div>
    </div>
  );
}