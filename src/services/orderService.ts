import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Order = Database["public"]["Tables"]["orders"]["Row"];
type OrderInsert = Database["public"]["Tables"]["orders"]["Insert"];
type OrderUpdate = Database["public"]["Tables"]["orders"]["Update"];
type ReportDeliverable = Database["public"]["Tables"]["report_deliverables"]["Row"];

export class OrderService {
  /**
   * Create a new order after successful Stripe payment
   */
  static async createOrder(data: {
    stripeSessionId: string;
    customerEmail: string;
    customerName: string;
    company: string;
    jobTitle: string;
    phone?: string;
    amount: number;
  }): Promise<Order | null> {
    const { data: { user } } = await supabase.auth.getUser();
    
    const orderData: OrderInsert = {
      user_id: user?.id,
      stripe_session_id: data.stripeSessionId,
      customer_email: data.customerEmail,
      customer_name: data.customerName,
      customer_company: data.company,
      customer_job_title: data.jobTitle,
      customer_phone: data.phone,
      amount_paid: data.amount,
      report_status: "awaiting_contract",
      payment_status: "succeeded"
    };

    const { data: order, error } = await supabase
      .from("orders")
      .insert(orderData)
      .select()
      .single();

    if (error) {
      console.error("Error creating order:", error);
      return null;
    }

    return order;
  }

  /**
   * Update order with contract file information
   */
  static async uploadContract(orderId: string, contractFileUrl: string, fileName: string): Promise<boolean> {
    const { error } = await supabase
      .from("orders")
      .update({
        contract_file_url: contractFileUrl,
        contract_file_name: fileName,
        report_status: "processing",
        contract_upload_date: new Date().toISOString()
      })
      .eq("id", orderId);

    if (error) {
      console.error("Error uploading contract:", error);
      return false;
    }

    return true;
  }

  /**
   * Get all orders for the current user
   */
  static async getUserOrders(): Promise<Order[]> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return [];

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .or(`user_id.eq.${user.id},customer_email.eq.${user.email}`)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching orders:", error);
      return [];
    }

    return data || [];
  }

  /**
   * Get a single order by ID
   */
  static async getOrder(orderId: string): Promise<Order | null> {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (error) {
      console.error("Error fetching order:", error);
      return null;
    }

    return data;
  }

  /**
   * Get order by Stripe session ID
   */
  static async getOrderBySession(sessionId: string): Promise<Order | null> {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("stripe_session_id", sessionId)
      .single();

    if (error) {
      console.error("Error fetching order by session:", error);
      return null;
    }

    return data;
  }

  /**
   * Update order status
   */
  static async updateOrderStatus(
    orderId: string,
    status: Order["report_status"],
    reportUrl?: string
  ): Promise<boolean> {
    const updateData: OrderUpdate = { report_status: status };
    
    if (reportUrl) {
      updateData.report_url = reportUrl;
      updateData.report_generated_date = new Date().toISOString();
    }

    const { error } = await supabase
      .from("orders")
      .update(updateData)
      .eq("id", orderId);

    if (error) {
      console.error("Error updating order status:", error);
      return false;
    }

    return true;
  }

  /**
   * Get report deliverables for an order
   */
  static async getReportDeliverables(orderId: string): Promise<ReportDeliverable[]> {
    const { data, error } = await supabase
      .from("report_deliverables")
      .select("*")
      .eq("order_id", orderId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching deliverables:", error);
      return [];
    }

    return data || [];
  }

  /**
   * Create a report deliverable
   */
  static async createDeliverable(data: {
    orderId: string;
    deliverableType: ReportDeliverable["deliverable_type"];
    fileUrl: string;
    fileName: string;
    metadata?: Record<string, any>;
  }): Promise<ReportDeliverable | null> {
    const { data: deliverable, error } = await supabase
      .from("report_deliverables")
      .insert({
        order_id: data.orderId,
        deliverable_type: data.deliverableType,
        file_url: data.fileUrl,
        deliverable_name: data.fileName,
        metadata: data.metadata
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating deliverable:", error);
      return null;
    }

    return deliverable;
  }
}