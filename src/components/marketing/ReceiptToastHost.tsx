import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BadgeCheck, CalendarCheck, Receipt } from "lucide-react";

type Toast = {
  id: string;
  title: string;
  body?: string;
  tone?: "good" | "neutral";
};

function uid() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function ReceiptToastHost() {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  React.useEffect(() => {
    const onReceipt = (e: any) => {
      const r = e?.detail as any;
      if (!r?.receiptId) return;

      const isBooked = String(r.subject || "").includes("DEMO BOOKED");

      const t: Toast = {
        id: uid(),
        title: isBooked ? "Scheduled ✅ Receipt created" : "Receipt created",
        body: isBooked ? `Proof: ${r.receiptId}` : `Receipt: ${r.receiptId}`,
        tone: isBooked ? "good" : "neutral",
      };

      setToasts((prev) => [t, ...prev].slice(0, 3));

      // auto-dismiss after 4.2 seconds
      setTimeout(() => {
        setToasts((prev) => prev.filter((x) => x.id !== t.id));
      }, 4200);
    };

    window.addEventListener("kincaid:receipt_created", onReceipt as any);
    return () => window.removeEventListener("kincaid:receipt_created", onReceipt as any);
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-[90] w-[340px] max-w-[90vw] space-y-2">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className={[
              "pointer-events-auto rounded-2xl border backdrop-blur-xl",
              t.tone === "good"
                ? "border-emerald-400/20 bg-emerald-500/10"
                : "border-white/10 bg-white/[0.06]",
            ].join(" ")}
          >
            <div className="flex items-start gap-3 p-4">
              <div className="mt-0.5 rounded-xl border border-white/10 bg-black/30 p-2">
                {t.tone === "good" ? (
                  <CalendarCheck className="h-4 w-4 text-emerald-200/90" />
                ) : (
                  <Receipt className="h-4 w-4 text-white/75" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <div className="text-sm font-semibold text-white">{t.title}</div>
                  {t.tone === "good" ? <BadgeCheck className="h-4 w-4 text-emerald-200/90" /> : null}
                </div>
                {t.body ? <div className="mt-1 text-xs text-white/70">{t.body}</div> : null}
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}