import { useEffect, useActionState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { KeyRound, ShieldCheck, Receipt, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

import { submitGateForm } from "@/lib/actions/receipts";
import type { ActionState } from "@/lib/actions/types";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (opts: { url: string }) => void;
    };
  }
}

const Schema = z.object({
  name: z.string().max(80).optional().or(z.literal("")),
  email: z.string().email("Use a valid email").max(140).optional().or(z.literal("")),
  company: z.string().max(120).optional().or(z.literal("")),
});

type FormValues = z.infer<typeof Schema>;

export function DemoGateModal({
  open,
  onOpenChange,
  calendlyUrl,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  calendlyUrl: string;
}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(Schema),
    defaultValues: { name: "", email: "", company: "" },
    mode: "onSubmit",
  });

  // React 19: useActionState for server action handling
  // Initial state matches ActionState structure
  const [state, submitAction, isPending] = useActionState<ActionState<{ receipt: any }>, FormData>(submitGateForm, {
    success: false,
    message: "",
  });

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        form.reset({ name: "", email: "", company: "" });
      }, 150);
    }
  }, [open, form]);

  // Auto-open Calendly on success
  useEffect(() => {
    if (state?.success && state.data?.receipt) {
      if (typeof window !== "undefined" && window.Calendly?.initPopupWidget) {
        window.Calendly.initPopupWidget({ url: calendlyUrl });
      }
    }
  }, [state?.success, state?.data, calendlyUrl]);

  const mode = state?.success ? "done" : "form";
  const receipt = state?.data?.receipt;
  const err = state?.message;
  const fieldErrors = state?.errors;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[720px] rounded-[28px] border-white/10 bg-[#070A12] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
        <DialogHeader>
          <DialogTitle className="text-xl">
            <span className="inline-flex items-center gap-2">
              <KeyRound className="h-5 w-5 text-amber-200/90" />
              Private Terminal Invite
            </span>
          </DialogTitle>
          <DialogDescription className="text-white/60">
            Optional details. We generate a local Evidence Receipt to prove the concept before you ever see the demo.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <div className="flex flex-wrap gap-2">
            <Badge className="rounded-2xl border border-white/10 bg-black/30 px-3 py-1 text-white/80">
              <Lock className="mr-2 h-3.5 w-3.5 text-white/70" />
              Fail-closed
            </Badge>
            <Badge className="rounded-2xl border border-white/10 bg-black/30 px-3 py-1 text-white/80">
              <Receipt className="mr-2 h-3.5 w-3.5 text-white/70" />
              Evidence Receipt
            </Badge>
            <Badge className="rounded-2xl border border-white/10 bg-black/30 px-3 py-1 text-white/80">
              <ShieldCheck className="mr-2 h-3.5 w-3.5 text-white/70" />
              Procurement-safe
            </Badge>
          </div>

          <div className="mt-3 font-mono text-xs text-white/65">
            &gt; receipts --create demo_access<br />
            &gt; integrity_mode --fail-closed<br />
            &gt; open calendly://30min
          </div>
        </div>

        {mode === "form" ? (
          <form action={submitAction} className="mt-5 space-y-4">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <div>
                <div className="mb-1 text-xs text-white/55">Name (optional)</div>
                <Input
                  name="name"
                  className="rounded-2xl border-white/10 bg-black/25 text-white placeholder:text-white/35"
                  placeholder="Jer"
                  // We can still use register for client-side valid/controlled inputs if needed
                  // but form submission is handled by action
                  {...form.register("name")}
                />
                 {fieldErrors?.name ? (
                  <div className="mt-1 text-xs text-rose-300">{fieldErrors.name[0]}</div>
                ) : null}
              </div>
              <div>
                <div className="mb-1 text-xs text-white/55">Email (optional)</div>
                <Input
                  name="email"
                  className="rounded-2xl border-white/10 bg-black/25 text-white placeholder:text-white/35"
                  placeholder="jer@company.com"
                  {...form.register("email")}
                />
                {form.formState.errors.email?.message ? (
                  <div className="mt-1 text-xs text-amber-200/80">{form.formState.errors.email.message}</div>
                ) : fieldErrors?.email ? (
                  <div className="mt-1 text-xs text-rose-300">{fieldErrors.email[0]}</div>
                ) : null}
              </div>
              <div>
                <div className="mb-1 text-xs text-white/55">Company (optional)</div>
                <Input
                  name="company"
                  className="rounded-2xl border-white/10 bg-black/25 text-white placeholder:text-white/35"
                  placeholder="Kincaid RMC"
                  {...form.register("company")}
                />
                 {fieldErrors?.company ? (
                  <div className="mt-1 text-xs text-rose-300">{fieldErrors.company[0]}</div>
                ) : null}
              </div>
            </div>

            {err ? (
              <div className="rounded-2xl border border-rose-400/20 bg-rose-500/10 p-3 text-sm text-rose-100">
                {err}
              </div>
            ) : null}

            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="text-xs text-white/45">
                We don't store this server-side. It's a local demo receipt to show integrity-by-design.
              </div>

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-2xl border-white/15 bg-white/5 text-white hover:bg-white/10"
                  onClick={() => onOpenChange(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="rounded-2xl bg-white text-black hover:bg-white/90"
                  disabled={isPending}
                >
                  {isPending ? "Generating receipt…" : "Generate receipt + book"}
                </Button>
              </div>
            </div>
          </form>
        ) : (
          <div className="mt-5">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="rounded-[26px] border border-emerald-400/20 bg-emerald-500/10 p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm text-white/70">Receipt created</div>
                  <div className="mt-1 text-lg font-semibold text-white">{receipt?.receiptId}</div>
                  <div className="mt-2 text-sm text-white/70">
                    Freshness: <span className="text-white/90">{receipt?.freshnessMinutes}m</span> • DQ pass rate:{" "}
                    <span className="text-white/90">{Math.round((receipt?.dqPassRate ?? 0) * 100)}%</span> • Confidence:{" "}
                    <span className="text-white/90">{Math.round((receipt?.confidence ?? 0) * 100)}%</span>
                  </div>
                </div>

                <Badge className="rounded-2xl border border-emerald-400/20 bg-black/30 px-3 py-1 text-emerald-200">
                  VERIFIED
                </Badge>
              </div>

              <div className="mt-4 font-mono text-xs text-white/75">
                source_hash={receipt?.sourceHash}
                <br />
                transform_hash={receipt?.transformHash}
                <br />
                owner={receipt?.owner}
              </div>
            </motion.div>

            <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="text-xs text-white/45">
                Calendly should be open. If not, click below.
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="rounded-2xl border-white/15 bg-white/5 text-white hover:bg-white/10"
                  onClick={() => onOpenChange(false)}
                >
                  Close
                </Button>
                <Button
                  className="rounded-2xl bg-white text-black hover:bg-white/90"
                  onClick={() => {
                    if (typeof window !== "undefined" && window.Calendly?.initPopupWidget) {
                      window.Calendly.initPopupWidget({ url: calendlyUrl });
                    }
                  }}
                >
                  Open scheduling
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}