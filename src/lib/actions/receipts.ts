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
      freshnessMinutes: 1.2,
      dqPassRate: 0.98,
      sourceHash: "sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      transformHash: "sha256:d4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35",
      owner: "System",
      confidence: 0.99,
      lineage: ["source:api", "transform:receipt_generator"],
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
  prevState: ActionState<{ success: boolean; receipt?: any }> | null,
  formData: FormData
): Promise<ActionState<{ success: boolean; receipt?: any }>> {
  try {
    const email = formData.get("email") as string;
    
    if (!email) {
      return errorAction("Email is required");
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    // Generate a demo receipt for the gate
    const receipt = {
      receiptId: crypto.randomUUID(),
      freshnessMinutes: 0.5,
      dqPassRate: 1.0,
      confidence: 1.0,
      sourceHash: "sha256:gate_access_" + Date.now(),
      transformHash: "sha256:auth_verification",
      owner: email,
    };

    return successAction("Access granted", { data: { success: true, receipt } });
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