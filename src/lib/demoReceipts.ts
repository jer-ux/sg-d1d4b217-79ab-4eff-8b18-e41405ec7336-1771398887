import type { DemoReceipt } from "@/pages/api/receipts/generate";

const KEY = "kincaid_iq_demo_receipts_v1";

export function loadDemoReceipts(): DemoReceipt[] {
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

export function saveDemoReceipt(r: DemoReceipt) {
  if (typeof window === "undefined") return;
  const existing = loadDemoReceipts();
  const next = [r, ...existing].slice(0, 25);
  window.localStorage.setItem(KEY, JSON.stringify(next));
}

export function clearDemoReceipts() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
}