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

export async function generateReceipt(eventId: string, title: string): Promise<ApiResult<any>> {
  const r = await fetch("/api/receipts/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ eventId, title }),
  });
  return r.json();
}

export async function updateNotes(eventId: string, notes: string, actor?: string): Promise<ApiResult<any>> {
  const r = await fetch("/api/war-room/notes/update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ eventId, notes: { notes }, actor }),
  });
  return r.json();
}

export async function addAttachment(
  eventId: string,
  attachment: { title: string; url: string; hash?: string },
  actor?: string
): Promise<ApiResult<any>> {
  const r = await fetch("/api/war-room/notes/attach", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ eventId, attachment, actor }),
  });
  return r.json();
}

export async function submitPacketAction(eventId: string, actor: string, role: string) {
  return postJson<{ event: any }>("/api/packet/submit", { eventId, actor, role });
}

export async function approvePacketAction(eventId: string, actor: string, role: string) {
  return postJson<{ event: any }>("/api/packet/approve", { eventId, actor, role });
}

export async function closePacketAction(eventId: string, actor: string, role: string) {
  return postJson<{ event: any }>("/api/packet/close", { eventId, actor, role });
}