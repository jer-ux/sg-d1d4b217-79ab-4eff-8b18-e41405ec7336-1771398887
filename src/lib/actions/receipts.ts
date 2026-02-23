"use server";

/**
 * Receipts Server Actions
 * Replaces /api/receipts/* endpoints
 */

import { revalidatePath } from "next/cache";
import { createActionResult, type ActionState } from "./types";
import { validateFormData, rules } from "./validation";
import { saveDemoReceipt } from "@/lib/demoReceipts";

/**
 * Generate demo receipt
 */
export async function generateDemoReceipt(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState<{ receiptId: string; receiptUrl: string }>> {
  try {
    const amount = formData.get("amount") as string;
    const description = formData.get("description") as string;
    const vendor = formData.get("vendor") as string;

    const validation = validateFormData(formData, {
      amount: [rules.required(), rules.number(), rules.min(0)],
      description: [rules.required(), rules.maxLength(500)],
      vendor: [rules.required(), rules.maxLength(100)],
    });

    if (!validation.valid) {
      return createActionResult(false, {
        message: "Validation failed",
        errors: validation.errors,
      });
    }

    // Generate receipt
    const receiptId = `receipt-${Date.now()}`;
    const receiptUrl = `/api/receipts/${receiptId}`;

    // Store receipt data (implement your storage logic)
    console.log("Generating receipt:", { receiptId, amount, description, vendor });

    revalidatePath("/evidence-receipts");

    return createActionResult(true, {
      message: "Receipt generated successfully",
      data: { receiptId, receiptUrl },
    });
  } catch (error) {
    console.error("Error generating receipt:", error);
    return createActionResult(false, {
      message: error instanceof Error ? error.message : "Failed to generate receipt",
    });
  }
}

/**
 * Handle Calendly booking webhook
 */
export async function handleCalendlyBooking(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState<{ receiptId: string }>> {
  try {
    const eventName = formData.get("eventName") as string;
    const inviteeName = formData.get("inviteeName") as string;
    const inviteeEmail = formData.get("inviteeEmail") as string;

    const validation = validateFormData(formData, {
      eventName: [rules.required()],
      inviteeName: [rules.required()],
      inviteeEmail: [rules.required(), rules.email()],
    });

    if (!validation.valid) {
      return createActionResult(false, {
        message: "Validation failed",
        errors: validation.errors,
      });
    }

    // Create receipt for booking
    const receiptId = `booking-${Date.now()}`;

    console.log("Processing Calendly booking:", { receiptId, eventName, inviteeName, inviteeEmail });

    revalidatePath("/evidence-receipts");

    return createActionResult(true, {
      message: "Booking receipt created",
      data: { receiptId },
    });
  } catch (error) {
    console.error("Error handling booking:", error);
    return createActionResult(false, {
      message: error instanceof Error ? error.message : "Failed to process booking",
    });
  }
}

/**
 * Submit demo gate form
 */
export async function submitGateForm(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState<{ receipt: any }>> {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const company = formData.get("company") as string;

    const validation = validateFormData(formData, {
      email: [rules.email("Please enter a valid email address")],
      name: [rules.maxLength(80)],
      company: [rules.maxLength(120)],
    });

    if (!validation.valid) {
      return createActionResult(false, {
        message: "Validation failed",
        errors: validation.errors,
      });
    }

    // Call the internal API logic directly or replicate it here
    // For now we'll simulate the receipt generation logic to keep it server-side
    // In a real app, this would likely call a service function
    
    // Simulate generation from /api/receipts/generate logic
    const receipt = {
      receiptId: `DEMO-${Date.now().toString(36).toUpperCase()}`,
      freshnessMinutes: 0,
      dqPassRate: 0.98,
      confidence: 0.94,
      sourceHash: `sha256:${Math.random().toString(36).slice(2)}`,
      transformHash: `sha256:${Math.random().toString(36).slice(2)}`,
      owner: "System",
      timestamp: new Date().toISOString(),
      name,
      email,
      company
    };

    // Save to local storage mock
    saveDemoReceipt(receipt as any);

    return createActionResult(true, {
      message: "Receipt generated",
      data: { receipt },
    });
  } catch (error) {
    console.error("Error submitting gate form:", error);
    return createActionResult(false, {
      message: error instanceof Error ? error.message : "Failed to generate receipt",
    });
  }
}