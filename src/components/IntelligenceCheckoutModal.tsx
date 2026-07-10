import { useState } from "react";
import { X, Check, Loader2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { IndividualReport } from "@/lib/pricing/individual-reports";

interface IntelligenceCheckoutModalProps {
  report: IndividualReport;
  isOpen: boolean;
  onClose: () => void;
}

export function IntelligenceCheckoutModal({ report, isOpen, onClose }: IntelligenceCheckoutModalProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerCompany: "",
    customerPhone: "",
    notes: ""
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Calculate expected delivery date
      const expectedDeliveryDate = new Date();
      expectedDeliveryDate.setDate(expectedDeliveryDate.getDate() + report.turnaroundDays);

      // Insert order into Supabase
      const { data, error } = await supabase
        .from("intelligence_orders")
        .insert({
          product_id: report.id,
          product_name: report.name,
          product_price: report.price,
          product_category: report.category,
          customer_name: formData.customerName,
          customer_email: formData.customerEmail,
          customer_company: formData.customerCompany || null,
          customer_phone: formData.customerPhone || null,
          notes: formData.notes || null,
          turnaround_days: report.turnaroundDays,
          expected_delivery_date: expectedDeliveryDate.toISOString().split("T")[0],
          required_data: report.requiredData,
          status: "pending"
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Order Submitted Successfully",
        description: `Your order for ${report.name} has been received. We'll contact you at ${formData.customerEmail} within 24 hours to confirm details and arrange payment.`,
        duration: 8000
      });

      // Reset form
      setFormData({
        customerName: "",
        customerEmail: "",
        customerCompany: "",
        customerPhone: "",
        notes: ""
      });

      onClose();
    } catch (error) {
      console.error("Order submission error:", error);
      toast({
        title: "Submission Error",
        description: "Unable to submit order. Please try again or contact support.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#151B23] border border-[#2A3F54] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-[#151B23] border-b border-[#2A3F54] p-6 flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <ShoppingCart className="w-5 h-5 text-amber-400" />
              <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">
                Intelligence Order
              </span>
            </div>
            <h2 className="text-2xl font-serif font-bold text-white mb-1">
              {report.name}
            </h2>
            <div className="flex items-center gap-4 text-sm text-neutral-400">
              <span>{formatCurrency(report.price)}</span>
              <span>•</span>
              <span>{report.turnaroundDays} days delivery</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white transition-colors p-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Customer Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-mono uppercase tracking-wider text-amber-400">
              Customer Information
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="customerName" className="text-neutral-300 text-sm mb-2">
                  Full Name <span className="text-rose-400">*</span>
                </Label>
                <Input
                  id="customerName"
                  required
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  className="bg-[#0F1419] border-[#2A3F54] text-white"
                  placeholder="John Smith"
                />
              </div>

              <div>
                <Label htmlFor="customerEmail" className="text-neutral-300 text-sm mb-2">
                  Email Address <span className="text-rose-400">*</span>
                </Label>
                <Input
                  id="customerEmail"
                  type="email"
                  required
                  value={formData.customerEmail}
                  onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                  className="bg-[#0F1419] border-[#2A3F54] text-white"
                  placeholder="john.smith@company.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="customerCompany" className="text-neutral-300 text-sm mb-2">
                  Company Name
                </Label>
                <Input
                  id="customerCompany"
                  value={formData.customerCompany}
                  onChange={(e) => setFormData({ ...formData, customerCompany: e.target.value })}
                  className="bg-[#0F1419] border-[#2A3F54] text-white"
                  placeholder="Acme Corporation"
                />
              </div>

              <div>
                <Label htmlFor="customerPhone" className="text-neutral-300 text-sm mb-2">
                  Phone Number
                </Label>
                <Input
                  id="customerPhone"
                  type="tel"
                  value={formData.customerPhone}
                  onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                  className="bg-[#0F1419] border-[#2A3F54] text-white"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
          </div>

          {/* Required Data */}
          <div className="bg-[#0F1419]/60 border border-[#2A3F54]/60 rounded-lg p-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-3">
              Required Data You'll Need to Provide
            </h3>
            <div className="space-y-2">
              {report.requiredData.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-sm text-neutral-300">
                  <Check className="w-4 h-4 mt-0.5 text-amber-400 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Notes */}
          <div>
            <Label htmlFor="notes" className="text-neutral-300 text-sm mb-2">
              Additional Notes or Special Requests
            </Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="bg-[#0F1419] border-[#2A3F54] text-white min-h-[100px]"
              placeholder="Any specific areas of focus, deadlines, or requirements..."
            />
          </div>

          {/* Order Summary */}
          <div className="bg-gradient-to-br from-amber-500/5 to-amber-500/10 border border-amber-500/20 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-neutral-300">Report Price</span>
              <span className="text-lg font-bold text-white">{formatCurrency(report.price)}</span>
            </div>
            <div className="flex items-center justify-between text-xs text-neutral-400">
              <span>Expected Delivery</span>
              <span>
                {new Date(Date.now() + report.turnaroundDays * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric"
                })}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-[#2A3F54] text-neutral-300"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-amber-500 hover:bg-amber-600 text-black font-bold"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Order
                  <Check className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>

          <p className="text-xs text-neutral-500 text-center leading-relaxed">
            By submitting this order, you agree to provide the required data within 48 hours of order confirmation.
            Payment details will be arranged via email within 24 hours.
          </p>
        </form>
      </div>
    </div>
  );
}