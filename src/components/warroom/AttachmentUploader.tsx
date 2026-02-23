import { useRef, useActionState } from "react";
import { toast } from "sonner";
import { attachToEvent, presignUpload, putFile, sha256Hex } from "@/components/warroom/uploadClient";

function fmtBytes(n: number) {
  if (n > 1_000_000_000) return (n / 1_000_000_000).toFixed(2) + " GB";
  if (n > 1_000_000) return (n / 1_000_000).toFixed(2) + " MB";
  if (n > 1_000) return (n / 1_000).toFixed(1) + " KB";
  return n + " B";
}

type UploadState = {
  success: boolean;
  error?: string;
  fileName?: string;
};

// Server action for file upload
async function uploadFileAction(
  prevState: UploadState | null,
  formData: FormData
): Promise<UploadState> {
  const eventId = formData.get("eventId") as string;
  const file = formData.get("file") as File;

  if (!file || file.size === 0) {
    return { success: false, error: "No file selected" };
  }

  if (file.size > 50 * 1024 * 1024) {
    return { success: false, error: "File too large (50MB max)" };
  }

  try {
    const [hash, signed] = await Promise.all([
      sha256Hex(file),
      presignUpload(eventId, file),
    ]);

    await putFile(signed.uploadUrl, file);
    await attachToEvent(eventId, file.name, signed.publicUrl, `sha256:${hash}`);

    return { success: true, fileName: file.name };
  } catch (e: any) {
    return { success: false, error: e?.message ?? "Upload failed" };
  }
}

export function AttachmentUploader({
  eventId,
  onUploaded,
}: {
  eventId: string;
  onUploaded?: () => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  // React 19: useActionState for file upload handling
  const [state, uploadAction, isPending] = useActionState(uploadFileAction, null);

  const handleFileSelect = (file: File | null) => {
    if (!file || isPending) return;

    const formData = new FormData();
    formData.set("eventId", eventId);
    formData.set("file", file);

    // Show loading toast
    const loadingToast = toast.loading(`Uploading ${file.name} (${fmtBytes(file.size)})…`);

    // Submit via action
    uploadAction(formData);

    // Handle result via state effect
    if (state?.success) {
      toast.success("Uploaded and attached", { id: loadingToast });
      onUploaded?.();
      formRef.current?.reset();
    } else if (state?.error) {
      toast.error(state.error, { id: loadingToast });
    }
  };

  return (
    <form ref={formRef} action={uploadAction} className="mt-3">
      <input type="hidden" name="eventId" value={eventId} />
      
      <div
        className={[
          "rounded-xl border p-4 transition cursor-pointer",
          isPending
            ? "border-white/25 bg-white/10 opacity-60 pointer-events-none"
            : "border-white/10 bg-white/5 hover:bg-white/7",
        ].join(" ")}
        onDragEnter={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (isPending) return;
          const file = e.dataTransfer.files[0];
          if (file) handleFileSelect(file);
        }}
        onClick={() => !isPending && inputRef.current?.click()}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-sm font-medium text-white/90">Upload attachment</div>
            <div className="text-xs text-white/60 mt-1">
              Drag & drop a file, or click to browse. SHA-256 hash calculated for verification.
            </div>
            {state?.error && (
              <div className="text-xs text-red-400 mt-2">{state.error}</div>
            )}
            {state?.success && state.fileName && (
              <div className="text-xs text-green-400 mt-2">
                ✓ {state.fileName} uploaded successfully
              </div>
            )}
          </div>

          <button
            type="button"
            disabled={isPending}
            className={`px-3 py-2 rounded-xl text-sm transition ${
              isPending
                ? "opacity-50 pointer-events-none"
                : "border border-white/15 bg-white/5 hover:bg-white/10"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              inputRef.current?.click();
            }}
          >
            {isPending ? "Uploading..." : "Browse"}
          </button>
        </div>

        <input
          ref={inputRef}
          type="file"
          name="file"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFileSelect(file);
          }}
        />
      </div>
    </form>
  );
}