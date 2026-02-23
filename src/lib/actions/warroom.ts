"use server";

/**
 * War Room Server Actions
 * Replaces /api/war-room/* endpoints with React 19 Server Actions
 */

import { revalidatePath } from "next/cache";
import { createActionResult, type ActionState } from "./types";
import { validateFormData, rules } from "./validation";
import { getWarRoomStore } from "@/lib/warroom/store";

/**
 * Update packet notes
 */
export async function updatePacketNotes(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState<{ notes: string }>> {
  try {
    const eventId = formData.get("eventId") as string;
    const notes = formData.get("notes") as string;

    // Validate
    const validation = validateFormData(formData, {
      eventId: [rules.required()],
      notes: [rules.required(), rules.maxLength(5000)],
    });

    if (!validation.valid) {
      return createActionResult(false, {
        message: "Validation failed",
        errors: validation.errors,
      });
    }

    // Update notes in store
    const store = getWarRoomStore();
    await store.updateEventNotes(eventId, notes);

    // Revalidate the war room page
    revalidatePath("/war-room");

    return createActionResult(true, {
      message: "Notes updated successfully",
      data: { notes },
    });
  } catch (error) {
    console.error("Error updating notes:", error);
    return createActionResult(false, {
      message: error instanceof Error ? error.message : "Failed to update notes",
    });
  }
}

/**
 * Attach file to packet
 */
export async function attachFileToPacket(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState<{ attachmentId: string }>> {
  try {
    const eventId = formData.get("eventId") as string;
    const fileUrl = formData.get("fileUrl") as string;
    const fileName = formData.get("fileName") as string;

    // Validate
    const validation = validateFormData(formData, {
      eventId: [rules.required()],
      fileUrl: [rules.required()],
      fileName: [rules.required()],
    });

    if (!validation.valid) {
      return createActionResult(false, {
        message: "Validation failed",
        errors: validation.errors,
      });
    }

    // Attach file in store
    const store = getWarRoomStore();
    const attachmentId = await store.attachFile(eventId, {
      url: fileUrl,
      name: fileName,
      uploadedAt: new Date().toISOString(),
    });

    revalidatePath("/war-room");

    return createActionResult(true, {
      message: "File attached successfully",
      data: { attachmentId },
    });
  } catch (error) {
    console.error("Error attaching file:", error);
    return createActionResult(false, {
      message: error instanceof Error ? error.message : "Failed to attach file",
    });
  }
}

/**
 * Submit packet for approval
 */
export async function submitPacket(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState<{ packetId: string }>> {
  try {
    const eventId = formData.get("eventId") as string;
    const submittedBy = formData.get("submittedBy") as string;

    const validation = validateFormData(formData, {
      eventId: [rules.required()],
      submittedBy: [rules.required()],
    });

    if (!validation.valid) {
      return createActionResult(false, {
        message: "Validation failed",
        errors: validation.errors,
      });
    }

    const store = getWarRoomStore();
    await store.submitPacket(eventId, submittedBy);

    revalidatePath("/war-room");

    return createActionResult(true, {
      message: "Packet submitted successfully",
      data: { packetId: eventId },
    });
  } catch (error) {
    console.error("Error submitting packet:", error);
    return createActionResult(false, {
      message: error instanceof Error ? error.message : "Failed to submit packet",
    });
  }
}

/**
 * Approve packet
 */
export async function approvePacket(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState<{ packetId: string }>> {
  try {
    const eventId = formData.get("eventId") as string;
    const approvedBy = formData.get("approvedBy") as string;

    const validation = validateFormData(formData, {
      eventId: [rules.required()],
      approvedBy: [rules.required()],
    });

    if (!validation.valid) {
      return createActionResult(false, {
        message: "Validation failed",
        errors: validation.errors,
      });
    }

    const store = getWarRoomStore();
    await store.approvePacket(eventId, approvedBy);

    revalidatePath("/war-room");

    return createActionResult(true, {
      message: "Packet approved successfully",
      data: { packetId: eventId },
    });
  } catch (error) {
    console.error("Error approving packet:", error);
    return createActionResult(false, {
      message: error instanceof Error ? error.message : "Failed to approve packet",
    });
  }
}

/**
 * Close packet
 */
export async function closePacket(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState<{ packetId: string }>> {
  try {
    const eventId = formData.get("eventId") as string;
    const closedBy = formData.get("closedBy") as string;

    const validation = validateFormData(formData, {
      eventId: [rules.required()],
      closedBy: [rules.required()],
    });

    if (!validation.valid) {
      return createActionResult(false, {
        message: "Validation failed",
        errors: validation.errors,
      });
    }

    const store = getWarRoomStore();
    await store.closePacket(eventId, closedBy);

    revalidatePath("/war-room");

    return createActionResult(true, {
      message: "Packet closed successfully",
      data: { packetId: eventId },
    });
  } catch (error) {
    console.error("Error closing packet:", error);
    return createActionResult(false, {
      message: error instanceof Error ? error.message : "Failed to close packet",
    });
  }
}

/**
 * Bulk submit drafts
 */
export async function bulkSubmitDrafts(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState<{ count: number }>> {
  try {
    const eventIds = JSON.parse(formData.get("eventIds") as string) as string[];
    const submittedBy = formData.get("submittedBy") as string;

    const validation = validateFormData(
      { eventIds, submittedBy },
      {
        eventIds: [
          rules.required(),
          rules.custom((val) => Array.isArray(val) && val.length > 0, "Must select at least one event"),
        ],
        submittedBy: [rules.required()],
      }
    );

    if (!validation.valid) {
      return createActionResult(false, {
        message: "Validation failed",
        errors: validation.errors,
      });
    }

    const store = getWarRoomStore();
    await Promise.all(eventIds.map((id) => store.submitPacket(id, submittedBy)));

    revalidatePath("/war-room");

    return createActionResult(true, {
      message: `${eventIds.length} packets submitted successfully`,
      data: { count: eventIds.length },
    });
  } catch (error) {
    console.error("Error bulk submitting:", error);
    return createActionResult(false, {
      message: error instanceof Error ? error.message : "Failed to bulk submit packets",
    });
  }
}