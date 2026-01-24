export type ApiFail = { ok: false; error: string; policyReasons?: string[] };
export type ApiOk<T> = { ok: true; data: T };
export type ApiResult<T> = ApiOk<T> | ApiFail;

async function postJson<T>(url: string, body: any): Promise<ApiResult<T>> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const j = await res.json().catch(() => ({}));
  if (!res.ok || !j.ok) {
    return {
      ok: false,
      error: j.error || "Request failed",
      policyReasons: j.policyReasons || undefined,
    };
  }
  return { ok: true, data: j as T };
}

export async function assignOwner(eventId: string, owner: string) {
  return postJson<{ event: any }>("/api/ledger/assign", { eventId, owner });
}

export async function approveEvent(eventId: string) {
  return postJson<{ event: any }>("/api/ledger/approve", { eventId });
}

export async function closeEvent(eventId: string) {
  return postJson<{ event: any }>("/api/ledger/close", { eventId });
}

export async function generateReceipt(eventId: string, title?: string) {
  return postJson<{ event: any; receipt: any }>("/api/receipts/generate", { eventId, title });
}