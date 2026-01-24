async function postJson(url: string, body: any) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const json = await res.json();

  if (!res.ok || !json.ok) {
    if (json.reasons && Array.isArray(json.reasons)) {
      const msg = "Policy check failed:\n\n" + json.reasons.map((r: string) => `• ${r}`).join("\n");
      throw new Error(msg);
    }
    throw new Error(json.error || "Request failed");
  }

  return json;
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
  return postJson("/api/receipts/generate", { eventId, title });
}

export async function attachReceipt(eventId: string, receipt: { id: string; title: string; hash?: string }) {
  return postJson("/api/ledger/attach-receipt", { eventId, receipt });
}