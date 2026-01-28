import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { TrendingDown, ShieldCheck, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function CaseStudyTeaser() {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 240, damping: 20 }}
      className="h-full"
    >
      <Card className="rounded-[2rem] border-white/10 bg-white/[0.04] shadow-[0_0_0_1px_rgba(255,255,255,0.04)] overflow-hidden">
        <CardContent className="p-7">
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div className="max-w-2xl">
              <div className="text-xs uppercase tracking-[0.22em] text-white/45">Case study preview</div>
              <div className="mt-2 text-2xl font-semibold text-white">
                "We stopped arguing about numbers."
              </div>
              <div className="mt-2 text-white/65">
                Integrity gates + evidence receipts turned finance + ops into one shared truth system.
                Executive lanes became actionable because every KPI could be proven.
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Badge className="rounded-2xl border border-white/10 bg-black/30 px-3 py-1 text-white/80">
                  RevCycle + Finance
                </Badge>
                <Badge className="rounded-2xl border border-white/10 bg-black/30 px-3 py-1 text-white/80">
                  Audit-ready KPIs
                </Badge>
                <Badge className="rounded-2xl border border-white/10 bg-black/30 px-3 py-1 text-white/80">
                  Verified value trail
                </Badge>
              </div>

              <div className="mt-5 flex items-center gap-3">
                <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
                  <div className="text-[11px] text-white/50">DSO</div>
                  <div className="mt-1 flex items-center gap-2 text-white/85">
                    <TrendingDown className="h-4 w-4 text-emerald-300/80" />
                    <span className="font-semibold">-7.4 days</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
                  <div className="text-[11px] text-white/50">Denials</div>
                  <div className="mt-1 flex items-center gap-2 text-white/85">
                    <TrendingDown className="h-4 w-4 text-emerald-300/80" />
                    <span className="font-semibold">-12.1%</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
                  <div className="text-[11px] text-white/50">Auditability</div>
                  <div className="mt-1 flex items-center gap-2 text-white/85">
                    <ShieldCheck className="h-4 w-4 text-amber-200/80" />
                    <span className="font-semibold">Receipts enforced</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex shrink-0 flex-col gap-2">
              <Button asChild className="rounded-2xl bg-white text-black hover:bg-white/90">
                <Link href="/case-studies">
                  View case studies <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="rounded-2xl border-white/15 bg-white/5 text-white hover:bg-white/10"
              >
                <Link href="/evidence-receipts">See Evidence Receipts</Link>
              </Button>
            </div>
          </div>

          <div className="mt-6 text-xs text-white/45">
            Note: metrics shown are demo-safe preview values. Swap to real proofs with receipts when connected.
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}