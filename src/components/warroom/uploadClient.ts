export async function sha256Hex(file: File): Promise<string> {
  const buf = await file.arrayBuffer();
  const hash = await crypto.subtle.digest("SHA-256", buf);
  const bytes = new Uint8Array(hash);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function presignUpload(eventId: string, file: File) {
  const res = await fetch("/api/uploads/presign", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      eventId,
      filename: file.name,
      contentType: file.type || "application/octet-stream",
    }),
  });
  const j = await res.json();
  if (!res.ok || !j.ok) throw new Error(j.error || "Presign failed");
  return j as { uploadUrl: string; publicUrl: string; key: string };
}

export async function putFile(uploadUrl: string, file: File) {
  const r = await fetch(uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": file.type || "application/octet-stream" },
    body: file,
  });
  if (!r.ok) throw new Error(`Upload failed (${r.status})`);
}

export async function attachToEvent(eventId: string, title: string, url: string, hash?: string, actor?: string) {
  const r = await fetch("/api/war-room/notes/attach", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ eventId, attachment: { title, url, hash }, actor }),
  });
  const j = await r.json();
  if (!r.ok || !j.ok) throw new Error(j.error || "Attach failed");
  return j;
}