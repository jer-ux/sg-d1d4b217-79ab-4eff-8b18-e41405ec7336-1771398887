import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { KeyRound, ChevronRight, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DemoGateModal } from "@/components/marketing/DemoGateModal";

export function TerminalInviteCTA() {
  const [open, setOpen] = React.useState(false);

  const calendlyUrl = "https://calendly.com/jer-kincaidrmc/30min";

  return (
    <>
      <div className="rounded-[2.25rem] border border-white/10 bg-[linear-gradient(180deg,rgba(245,212,142,0.10),rgba(255,255,255,0.03))] p-7 md:p-9 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
        <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/70">
              <Lock className="h-3.5 w-3.5 text-white/60" />
              Private console access
            </div>

            <div className="mt-3 text-2xl font-semibold text-white md:text-3xl">
              Get the War Room demo like a CFO would see it.
            </div>

            <div className="mt-2 text-white/65">
              We'll run lane click-throughs, ledger drilldowns, and Evidence Receipts live. You'll see what gets blocked,
              why it gets blocked, and how verified value is tracked end-to-end.
            </div>

            <motion.div
              className="mt-5 rounded-2xl border border-white/10 bg-black/30 p-4 font-mono text-xs text-white/70"
              initial={{ opacity: 0.85 }}
              whileHover={{ opacity: 1 }}
            >
              <div className="flex items-center gap-2 text-white/60">
                <KeyRound className="h-4 w-4" />
                <span>terminal://kincaid-iq/demo-access</span>
              </div>
              <div className="mt-2 text-white/70">
                &gt; integrity_mode --fail-closed<br />
                &gt; receipts --enforce provenance dq freshness owner confidence<br />
                &gt; value_ledger --modeled --verified --realized
              </div>
            </motion.div>
          </div>

          <div className="flex shrink-0 flex-col gap-3">
            <Button
              className="h-11 rounded-2xl bg-white text-black hover:bg-white/90"
              onClick={() => setOpen(true)}
            >
              Request demo access <ChevronRight className="ml-1 h-4 w-4" />
            </Button>

            <Button
              asChild
              variant="outline"
              className="h-11 rounded-2xl border-white/15 bg-white/5 text-white hover:bg-white/10"
            >
              <Link href="/war-room">Open War Room</Link>
            </Button>

            <div className="text-xs text-white/45">No spam. Just a clean demo + next steps.</div>
          </div>
        </div>
      </div>

      <DemoGateModal open={open} onOpenChange={setOpen} calendlyUrl={calendlyUrl} />
    </>
  );
}