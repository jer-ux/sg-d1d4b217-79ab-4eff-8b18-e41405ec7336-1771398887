import { toast } from "sonner";

async function postJson(url: string, body: any) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const json = await res.json();

  if (!res.ok || !json.ok) {
    const reasons = json.policyReasons ?? [];
    const msg = reasons.length
      ? `Policy check failed:\n${reasons.map((r: string) => `• ${r}`).join("\n")}`
      : json.error ?? "Request failed";
    
    toast.error(msg);
    return { ok: false, error: json.error, policyReasons: reasons };
  }

  toast.success("Action completed successfully");
  return { ok: true, data: json.data };
}

export async function assignOwner(eventId: string, owner: string) {
  return postJson("/api/ledger/assign", { eventId, owner });
}

export async function approveEvent(eventId: string) {
  return postJson("/api/ledger/approve", { eventId });
}

export async function closeEvent(eventId: string) {
  return postJson("/api/ledger/close", { eventId });
}

export async function generateReceipt(eventId: string, title?: string) {
  return postJson("/api/receipts/generate", { eventId, title: title ?? "Generated evidence receipt" });
}

export async function attachReceipt(eventId: string, receipt: { id: string; title: string; url?: string; freshness?: string; hash?: string }) {
  return postJson("/api/ledger/attach-receipt", { eventId, receipt });
}