"use server";

/**
 * Ledger Server Actions
 * Replaces /api/ledger/* endpoints
 */

import { revalidatePath } from "next/cache";
import { type ActionState, successAction, errorAction } from "./types";

// Types matching the ledger data structure
interface LedgerEntry {
  id: string;
  status: string;
  assignee?: string;
  notes?: string;
}

export async function assignLedgerEntry(
  prevState: ActionState<LedgerEntry> | null,
  formData: FormData
): Promise<ActionState<LedgerEntry>> {
  try {
    const entryId = formData.get("entryId") as string;
    const assignee = formData.get("assignee") as string;

    if (!entryId || !assignee) {
      return errorAction("Entry ID and assignee are required");
    }

    // TODO: Implement actual database update
    await new Promise(resolve => setTimeout(resolve, 500));

    const result: LedgerEntry = {
      id: entryId,
      status: "assigned",
      assignee,
    };

    revalidatePath("/verified-savings-ledger");
    return successAction("Entry assigned successfully", { data: result });
  } catch (error) {
    return errorAction(
      error instanceof Error ? error.message : "Failed to assign entry"
    );
  }
}

export async function approveLedgerEntry(
  prevState: ActionState<LedgerEntry> | null,
  formData: FormData
): Promise<ActionState<LedgerEntry>> {
  try {
    const entryId = formData.get("entryId") as string;

    if (!entryId) {
      return errorAction("Entry ID is required");
    }

    await new Promise(resolve => setTimeout(resolve, 500));

    const result: LedgerEntry = {
      id: entryId,
      status: "approved",
    };

    revalidatePath("/verified-savings-ledger");
    return successAction("Entry approved successfully", { data: result });
  } catch (error) {
    return errorAction(
      error instanceof Error ? error.message : "Failed to approve entry"
    );
  }
}

export async function closeLedgerEntry(
  prevState: ActionState<LedgerEntry> | null,
  formData: FormData
): Promise<ActionState<LedgerEntry>> {
  try {
    const entryId = formData.get("entryId") as string;
    const notes = formData.get("notes") as string;

    if (!entryId) {
      return errorAction("Entry ID is required");
    }

    await new Promise(resolve => setTimeout(resolve, 500));

    const result: LedgerEntry = {
      id: entryId,
      status: "closed",
      notes,
    };

    revalidatePath("/verified-savings-ledger");
    return successAction("Entry closed successfully", { data: result });
  } catch (error) {
    return errorAction(
      error instanceof Error ? error.message : "Failed to close entry"
    );
  }
}