import * as React from "react";
import type { DemoReceipt } from "@/pages/api/receipts/generate";

const KEY = "kincaid_iq_demo_receipts_v1";

function read(): DemoReceipt[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as DemoReceipt[]) : [];
  } catch {
    return [];
  }
}

export function useDemoReceipts() {
  const [receipts, setReceipts] = React.useState<DemoReceipt[]>(() => read());

  React.useEffect(() => {
    const refresh = () => setReceipts(read());

    // Updates if another tab writes localStorage
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) refresh();
    };

    // Updates instantly in the same tab when we dispatch CustomEvent
    const onReceipt = () => refresh();
    const onClear = () => refresh();

    window.addEventListener("storage", onStorage);
    window.addEventListener("kincaid:receipt_created", onReceipt as any);
    window.addEventListener("kincaid:receipts_cleared", onClear as any);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("kincaid:receipt_created", onReceipt as any);
      window.removeEventListener("kincaid:receipts_cleared", onClear as any);
    };
  }, []);

  return receipts;
}

export function countBookedReceipts(receipts: DemoReceipt[]) {
  return receipts.filter((r) => (r.subject ?? "").includes("DEMO BOOKED")).length;
}

export function countDemoRequestReceipts(receipts: DemoReceipt[]) {
  return receipts.filter((r) => (r.subject ?? "").includes("DEMO ACCESS")).length;
}