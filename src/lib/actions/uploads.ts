"use server";

/**
 * Upload Server Actions
 * Handles file upload operations with presigned URLs
 */

import { type ActionState, successAction, errorAction } from "./types";

interface PresignedUpload {
  url: string;
  fields: Record<string, string>;
  fileId: string;
}

export async function getPresignedUrl(
  prevState: ActionState<PresignedUpload> | null,
  formData: FormData
): Promise<ActionState<PresignedUpload>> {
  try {
    const filename = formData.get("filename") as string;
    const contentType = formData.get("contentType") as string;

    if (!filename || !contentType) {
      return errorAction("Filename and content type are required");
    }

    // Simulate S3 presign generation
    await new Promise(resolve => setTimeout(resolve, 500));

    const result: PresignedUpload = {
      url: "https://fake-s3-bucket.com/upload",
      fields: {
        key: `uploads/${crypto.randomUUID()}-${filename}`,
        "Content-Type": contentType,
      },
      fileId: crypto.randomUUID(),
    };

    return successAction("Upload URL generated", { data: result });
  } catch (error) {
    return errorAction(
      error instanceof Error ? error.message : "Failed to generate upload URL"
    );
  }
}

export async function confirmUpload(
  prevState: ActionState<{ id: string; url: string }> | null,
  formData: FormData
): Promise<ActionState<{ id: string; url: string }>> {
  try {
    const fileId = formData.get("fileId") as string;
    
    if (!fileId) {
      return errorAction("File ID is required");
    }

    // Simulate verification
    await new Promise(resolve => setTimeout(resolve, 300));

    return successAction("Upload confirmed", {
      data: { 
        id: fileId,
        url: `https://fake-cdn.com/files/${fileId}`
      }
    });
  } catch (error) {
    return errorAction(
      error instanceof Error ? error.message : "Failed to confirm upload"
    );
  }
}