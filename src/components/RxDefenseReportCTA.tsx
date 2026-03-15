import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, X, DollarSign, CheckCircle2, Loader2, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loadStripe } from "@stripe/stripe-js";

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

export function RxDefenseReportCTA() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    jobTitle: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Create Stripe Checkout Session
      const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerEmail: formData.email,
          customerName: formData.fullName,
          company: formData.company,
          jobTitle: formData.jobTitle,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout session");
      }

      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      if (stripe && data.sessionId) {
        const { error } = await stripe.redirectToCheckout({
          sessionId: data.sessionId,
        });

        if (error) {
          console.error("Stripe redirect error:", error);
          alert("Payment processing error. Please try again.");
        }
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to process payment. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (isMinimized) {
    return (
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
      >
        <Shield className="w-6 h-6 text-white" />
      </motion.button>
    );
  }

  return (
    <>
      <motion.div
        initial={{ x: 400, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <div className="relative">
          <button
            onClick={() => setIsMinimized(true)}
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center shadow-lg z-10 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsOpen(true)}
            className="cursor-pointer bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-[2px] rounded-xl shadow-2xl max-w-sm"
          >
            <div className="bg-slate-900/95 backdrop-blur-xl rounded-xl p-4 space-y-3">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white font-bold text-sm">Board Report</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                      $199
                    </span>
                  </div>
                  <p className="text-blue-200 text-xs leading-relaxed">
                    RX Defense IQ Analysis
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-blue-300 bg-blue-500/10 rounded-lg p-2 border border-blue-500/20">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-blue-400" />
                <span>Instant delivery upon upload</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-2xl text-white flex items-center gap-3">
              <Shield className="w-6 h-6 text-blue-400" />
              Get Your RX Defense IQ Board Report
            </DialogTitle>
            <DialogDescription className="text-blue-200 space-y-4">
              <p className="text-base leading-relaxed">
                Receive a comprehensive, board-ready analysis of your PBM contract. Our AI-powered Contract Intelligence Engine performs a 20-point clause analysis, identifying hidden costs, transparency gaps, and negotiation opportunities.
              </p>
              
              <div className="flex items-center gap-2 text-lg font-semibold text-white bg-blue-500/10 rounded-lg p-3 border border-blue-500/20">
                <DollarSign className="w-5 h-5 text-green-400" />
                <span>One-time payment: $199</span>
              </div>
            </DialogDescription>
          </DialogHeader>

          {/* Value Props */}
          <div className="grid grid-cols-3 gap-4 py-4">
            <div className="text-center space-y-2 p-4 rounded-lg bg-blue-500/5 border border-blue-500/10">
              <div className="text-2xl font-bold text-blue-400">20+</div>
              <div className="text-xs text-blue-200">Critical Clauses Analyzed</div>
            </div>
            <div className="text-center space-y-2 p-4 rounded-lg bg-blue-500/5 border border-blue-500/10">
              <div className="text-2xl font-bold text-blue-400">Board</div>
              <div className="text-xs text-blue-200">Ready Format</div>
            </div>
            <div className="text-center space-y-2 p-4 rounded-lg bg-blue-500/5 border border-blue-500/10">
              <div className="text-2xl font-bold text-blue-400">Instant</div>
              <div className="text-xs text-blue-200">Report Delivery</div>
            </div>
          </div>

          {/* Simplified Payment Form - Just Contact Info */}
          <form onSubmit={handlePayment} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-white">Full Name *</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="bg-slate-800 border-slate-700 text-white"
                  placeholder="John Smith"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="bg-slate-800 border-slate-700 text-white"
                  placeholder="john@company.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company" className="text-white">Company *</Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  required
                  className="bg-slate-800 border-slate-700 text-white"
                  placeholder="Acme Corporation"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobTitle" className="text-white">Job Title *</Label>
                <Input
                  id="jobTitle"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  required
                  className="bg-slate-800 border-slate-700 text-white"
                  placeholder="CFO"
                />
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 space-y-2">
              <h4 className="text-white font-semibold text-sm flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-blue-400" />
                What happens next?
              </h4>
              <ol className="text-xs text-blue-200 space-y-1 list-decimal list-inside">
                <li>Click below to proceed to secure payment (Credit Card or Venmo)</li>
                <li>Complete your $199 payment via Stripe</li>
                <li>Upload your PBM contract PDF on the confirmation page</li>
                <li>Receive your board report instantly via email</li>
              </ol>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="flex-1 border-slate-600 text-white hover:bg-slate-800"
                disabled={isProcessing}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 mr-2" />
                    Continue to Payment ($199)
                  </>
                )}
              </Button>
            </div>

            <p className="text-xs text-center text-blue-300">
              Secure payment processed by Stripe. Accepts all major credit cards and Venmo.
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}