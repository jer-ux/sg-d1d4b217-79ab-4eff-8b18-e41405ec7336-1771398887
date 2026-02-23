"use server";

/**
 * Ledger Server Actions
 * Replaces /api/ledger/* endpoints
 */

import { revalidatePath } from "next/cache";
import { createActionResult, type ActionState } from "./types";
import { validateFormData, rules } from "./validation";

/**
 * Assign ledger entry
 */
export async function assignLedgerEntry(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState<{ entryId: string }>> {
  try {
    const entryId = formData.get("entryId") as string;
    const assignedTo = formData.get("assignedTo") as string;

    const validation = validateFormData(formData, {
      entryId: [rules.required()],
      assignedTo: [rules.required()],
    });

    if (!validation.valid) {
      return createActionResult(false, {
        message: "Validation failed",
        errors: validation.errors,
      });
    }

    // TODO: Implement actual ledger assignment logic
    // This is a placeholder for your ledger system
    console.log("Assigning ledger entry:", { entryId, assignedTo });

    revalidatePath("/ledger");

    return createActionResult(true, {
      message: "Entry assigned successfully",
      data: { entryId },
    });
  } catch (error) {
    console.error("Error assigning entry:", error);
    return createActionResult(false, {
      message: error instanceof Error ? error.message : "Failed to assign entry",
    });
  }
}

/**
 * Approve ledger entry
 */
export async function approveLedgerEntry(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState<{ entryId: string }>> {
  try {
    const entryId = formData.get("entryId") as string;
    const approvedBy = formData.get("approvedBy") as string;

    const validation = validateFormData(formData, {
      entryId: [rules.required()],
      approvedBy: [rules.required()],
    });

    if (!validation.valid) {
      return createActionResult(false, {
        message: "Validation failed",
        errors: validation.errors,
      });
    }

    console.log("Approving ledger entry:", { entryId, approvedBy });

    revalidatePath("/ledger");

    return createActionResult(true, {
      message: "Entry approved successfully",
      data: { entryId },
    });
  } catch (error) {
    console.error("Error approving entry:", error);
    return createActionResult(false, {
      message: error instanceof Error ? error.message : "Failed to approve entry",
    });
  }
}

/**
 * Close ledger entry
 */
export async function closeLedgerEntry(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState<{ entryId: string }>> {
  try {
    const entryId = formData.get("entryId") as string;
    const closedBy = formData.get("closedBy") as string;

    const validation = validateFormData(formData, {
      entryId: [rules.required()],
      closedBy: [rules.required()],
    });

    if (!validation.valid) {
      return createActionResult(false, {
        message: "Validation failed",
        errors: validation.errors,
      });
    }

    console.log("Closing ledger entry:", { entryId, closedBy });

    revalidatePath("/ledger");

    return createActionResult(true, {
      message: "Entry closed successfully",
      data: { entryId },
    });
  } catch (error) {
    console.error("Error closing entry:", error);
    return createActionResult(false, {
      message: error instanceof Error ? error.message : "Failed to close entry",
    });
  }
}

/**
 * Attach receipt to ledger entry
 */
export async function attachReceiptToEntry(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState<{ receiptId: string }>> {
  try {
    const entryId = formData.get("entryId") as string;
    const receiptUrl = formData.get("receiptUrl") as string;
    const receiptType = formData.get("receiptType") as string;

    const validation = validateFormData(formData, {
      entryId: [rules.required()],
      receiptUrl: [rules.required()],
      receiptType: [rules.required()],
    });

    if (!validation.valid) {
      return createActionResult(false, {
        message: "Validation failed",
        errors: validation.errors,
      });
    }

    console.log("Attaching receipt:", { entryId, receiptUrl, receiptType });

    revalidatePath("/ledger");

    return createActionResult(true, {
      message: "Receipt attached successfully",
      data: { receiptId: `receipt-${Date.now()}` },
    });
  } catch (error) {
    console.error("Error attaching receipt:", error);
    return createActionResult(false, {
      message: error instanceof Error ? error.message : "Failed to attach receipt",
    });
  }
}