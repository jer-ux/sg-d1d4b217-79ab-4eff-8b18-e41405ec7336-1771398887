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
      whileHover={{ y: -4, scale: 1.005 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="h-full"
    >
      <Card className="overflow-hidden rounded-[2rem] border-white/20 bg-gradient-to-br from-white/[0.1] to-white/[0.04] shadow-[0_20px_80px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.1)_inset] backdrop-blur-xl hover:border-white/30 hover:shadow-[0_24px_96px_rgba(139,92,246,0.3)] transition-all duration-300">
        <CardContent className="p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="max-w-2xl">
              <div className="text-xs font-medium uppercase tracking-[0.24em] text-white/60">Case study preview</div>
              <div className="mt-3 bg-gradient-to-br from-white via-white to-white/90 bg-clip-text text-3xl font-bold text-transparent">
                "We stopped arguing about numbers."
              </div>
              <div className="mt-3 text-base leading-relaxed text-white/75">
                Integrity gates + evidence receipts turned finance + ops into one shared truth system.
                Executive lanes became actionable because every KPI could be proven.
              </div>

              <div className="mt-5 flex flex-wrap gap-2.5">
                <Badge className="rounded-2xl border border-white/20 bg-gradient-to-br from-white/15 to-black/40 px-4 py-1.5 text-white/90 shadow-lg backdrop-blur-sm">
                  RevCycle + Finance
                </Badge>
                <Badge className="rounded-2xl border border-emerald-400/30 bg-gradient-to-br from-emerald-400/15 to-emerald-600/10 px-4 py-1.5 text-emerald-100 shadow-[0_0_20px_rgba(16,185,129,0.3)] backdrop-blur-sm">
                  Audit-ready KPIs
                </Badge>
                <Badge className="rounded-2xl border border-purple-400/30 bg-gradient-to-br from-purple-400/15 to-purple-600/10 px-4 py-1.5 text-purple-100 shadow-[0_0_20px_rgba(168,85,247,0.3)] backdrop-blur-sm">
                  Verified value trail
                </Badge>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <div className="rounded-2xl border border-white/20 bg-gradient-to-br from-white/[0.12] to-black/40 px-5 py-3.5 shadow-[0_8px_24px_rgba(0,0,0,0.3)] backdrop-blur-sm">
                  <div className="text-[11px] font-medium uppercase tracking-wider text-white/60">DSO</div>
                  <div className="mt-1.5 flex items-center gap-2 text-white/90">
                    <TrendingDown className="h-5 w-5 text-emerald-400" />
                    <span className="text-lg font-bold">-7.4 days</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/20 bg-gradient-to-br from-white/[0.12] to-black/40 px-5 py-3.5 shadow-[0_8px_24px_rgba(0,0,0,0.3)] backdrop-blur-sm">
                  <div className="text-[11px] font-medium uppercase tracking-wider text-white/60">Denials</div>
                  <div className="mt-1.5 flex items-center gap-2 text-white/90">
                    <TrendingDown className="h-5 w-5 text-emerald-400" />
                    <span className="text-lg font-bold">-12.1%</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-amber-400/30 bg-gradient-to-br from-amber-400/15 to-amber-600/10 px-5 py-3.5 shadow-[0_8px_24px_rgba(251,191,36,0.3)] backdrop-blur-sm">
                  <div className="text-[11px] font-medium uppercase tracking-wider text-amber-200/70">Auditability</div>
                  <div className="mt-1.5 flex items-center gap-2 text-amber-100">
                    <ShieldCheck className="h-5 w-5 text-amber-300" />
                    <span className="text-lg font-bold">Receipts enforced</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex shrink-0 flex-col gap-3">
              <Button asChild className="rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-6 text-white shadow-[0_0_40px_rgba(139,92,246,0.5)] hover:shadow-[0_0_56px_rgba(139,92,246,0.7)] transition-all duration-300">
                <Link href="/case-studies">
                  View case studies <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="rounded-2xl border-white/25 bg-white/10 px-6 py-6 text-white backdrop-blur-xl hover:border-white/35 hover:bg-white/15 shadow-lg transition-all"
              >
                <Link href="/evidence-receipts">See Evidence Receipts</Link>
              </Button>
            </div>
          </div>

          <div className="mt-7 text-xs text-white/55">
            Note: metrics shown are demo-safe preview values. Swap to real proofs with receipts when connected.
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}