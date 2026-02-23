"use server";

/**
 * Upload Server Actions
 * Handles file upload operations with presigned URLs
 */

import { createActionResult, type ActionState } from "./types";
import { validateFormData, rules } from "./validation";

/**
 * Generate presigned upload URL
 */
export async function generatePresignedUrl(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState<{ uploadUrl: string; fileKey: string }>> {
  try {
    const fileName = formData.get("fileName") as string;
    const fileType = formData.get("fileType") as string;
    const fileSize = formData.get("fileSize") as string;

    const validation = validateFormData(formData, {
      fileName: [rules.required(), rules.maxLength(255)],
      fileType: [rules.required()],
      fileSize: [rules.required(), rules.number(), rules.max(50 * 1024 * 1024)], // 50MB max
    });

    if (!validation.valid) {
      return createActionResult(false, {
        message: "Validation failed",
        errors: validation.errors,
      });
    }

    // Generate unique file key
    const fileKey = `uploads/${Date.now()}-${fileName}`;

    // Generate presigned URL (implement your cloud storage logic)
    // This is a placeholder - integrate with R2, S3, etc.
    const uploadUrl = `/api/uploads/presign?key=${encodeURIComponent(fileKey)}`;

    console.log("Generated presigned URL:", { fileKey, fileName, fileType, fileSize });

    return createActionResult(true, {
      message: "Upload URL generated",
      data: { uploadUrl, fileKey },
    });
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    return createActionResult(false, {
      message: error instanceof Error ? error.message : "Failed to generate upload URL",
    });
  }
}

/**
 * Confirm file upload completion
 */
export async function confirmUpload(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState<{ fileUrl: string }>> {
  try {
    const fileKey = formData.get("fileKey") as string;

    const validation = validateFormData(formData, {
      fileKey: [rules.required()],
    });

    if (!validation.valid) {
      return createActionResult(false, {
        message: "Validation failed",
        errors: validation.errors,
      });
    }

    // Verify upload and get permanent URL
    const fileUrl = `/uploads/${fileKey}`;

    console.log("Confirmed upload:", { fileKey, fileUrl });

    return createActionResult(true, {
      message: "Upload confirmed",
      data: { fileUrl },
    });
  } catch (error) {
    console.error("Error confirming upload:", error);
    return createActionResult(false, {
      message: error instanceof Error ? error.message : "Failed to confirm upload",
    });
  }
}