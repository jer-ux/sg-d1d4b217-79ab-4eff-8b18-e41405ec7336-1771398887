"use client";

import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import { attachToEvent, presignUpload, putFile, sha256Hex } from "@/components/warroom/uploadClient";

function fmtBytes(n: number) {
  if (n > 1_000_000_000) return (n / 1_000_000_000).toFixed(2) + " GB";
  if (n > 1_000_000) return (n / 1_000_000).toFixed(2) + " MB";
  if (n > 1_000) return (n / 1_000).toFixed(1) + " KB";
  return n + " B";
}

export function AttachmentUploader({ eventId, onUploaded }: { eventId: string; onUploaded?: () => void }) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [drag, setDrag] = useState(false);
  const [busy, setBusy] = useState(false);

  const handleFiles = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return;
      const file = files[0];

      if (file.size > 50 * 1024 * 1024) {
        toast.error("File too large (50MB max)");
        return;
      }

      setBusy(true);
      const t = toast.loading(`Uploading ${file.name} (${fmtBytes(file.size)})…`);

      try {
        const [hash, signed] = await Promise.all([sha256Hex(file), presignUpload(eventId, file)]);
        await putFile(signed.uploadUrl, file);
        await attachToEvent(eventId, file.name, signed.publicUrl, `sha256:${hash}`);

        toast.success("Uploaded and attached", { id: t });
        onUploaded?.();
      } catch (e: any) {
        toast.error(e?.message ?? "Upload failed", { id: t });
      } finally {
        setBusy(false);
      }
    },
    [eventId, onUploaded]
  );

  return (
    <div className="mt-3">
      <div
        className={[
          "rounded-xl border p-4 transition cursor-pointer",
          drag ? "border-white/25 bg-white/10" : "border-white/10 bg-white/5 hover:bg-white/7",
        ].join(" ")}
        onDragEnter={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDrag(true);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDrag(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDrag(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDrag(false);
          if (busy) return;
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => !busy && inputRef.current?.click()}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-sm font-medium text-white/90">Upload attachment</div>
            <div className="text-xs text-white/60 mt-1">
              Drag & drop a file, or click to browse. SHA-256 hash calculated for verification.
            </div>
          </div>

          <button
            type="button"
            disabled={busy}
            className={`px-3 py-2 rounded-xl text-sm transition ${
              busy ? "opacity-50 pointer-events-none" : "border border-white/15 bg-white/5 hover:bg-white/10"
            }`}
          >
            {busy ? "Uploading..." : "Browse"}
          </button>
        </div>

        <input ref={inputRef} type="file" className="hidden" onChange={(e) => handleFiles(e.target.files)} />
      </div>
    </div>
  );
}