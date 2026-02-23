"use server";

/**
 * Receipts Server Actions
 * Replaces /api/receipts/* endpoints
 */

import { revalidatePath } from "next/cache";
import { type ActionState, successAction, errorAction } from "./types";
import { saveDemoReceipt } from "@/lib/demoReceipts";

interface Receipt {
  id: string;
  number: string;
  status: string;
  amount: number;
}

export async function generateReceipt(
  prevState: ActionState<Receipt> | null,
  formData: FormData
): Promise<ActionState<Receipt>> {
  try {
    const amount = parseFloat(formData.get("amount") as string);
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;

    if (isNaN(amount)) {
      return errorAction("Valid amount is required");
    }

    // Simulate generation delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const receiptId = crypto.randomUUID();
    const date = new Date().toISOString();

    const receipt = {
      id: receiptId,
      receiptId, // Required by DemoReceipt
      number: `RCP-${Math.floor(Math.random() * 10000)}`,
      status: "generated",
      amount,
      category,
      description,
      date,
      createdAtIso: date, // Required by DemoReceipt
      subject: description, // Mapping description to subject
      verified: true, // Mock value
      merchant: "Demo Merchant", // Mock value
      items: [], // Mock value
      metadata: {}, // Mock value
      rawText: "", // Mock value
    };

    // Save to demo store if available
    if (typeof saveDemoReceipt === "function") {
      saveDemoReceipt(receipt);
    }

    revalidatePath("/evidence-receipts");
    return successAction("Receipt generated successfully", { data: receipt });
  } catch (error) {
    return errorAction(
      error instanceof Error ? error.message : "Failed to generate receipt"
    );
  }
}

export async function submitGateForm(
  prevState: ActionState<{ success: boolean }> | null,
  formData: FormData
): Promise<ActionState<{ success: boolean }>> {
  try {
    const email = formData.get("email") as string;
    
    if (!email) {
      return errorAction("Email is required");
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    return successAction("Access granted", { data: { success: true } });
  } catch (error) {
    return errorAction(
      error instanceof Error ? error.message : "Failed to submit form"
    );
  }
}

export async function processCalendlyBooking(
  prevState: ActionState<{ booked: boolean }> | null,
  formData: FormData
): Promise<ActionState<{ booked: boolean }>> {
  try {
    const eventUri = formData.get("eventUri") as string;
    
    if (!eventUri) {
      return errorAction("Event URI is required");
    }

    await new Promise(resolve => setTimeout(resolve, 500));

    revalidatePath("/evidence-receipts");
    return successAction("Booking processed", { data: { booked: true } });
  } catch (error) {
    return errorAction(
      error instanceof Error ? error.message : "Failed to process booking"
    );
  }
}