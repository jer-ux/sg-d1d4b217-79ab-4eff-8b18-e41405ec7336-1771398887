import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, X, Upload, ArrowRight, Shield, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export function RxDefenseReportCTA() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    title: "",
    phone: "",
    message: ""
  });
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would submit to your API
    console.log("Form submitted:", { formData, file });
    setIsSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        company: "",
        title: "",
        phone: "",
        message: ""
      });
      setFile(null);
    }, 3000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <>
      {/* Floating CTA Button */}
      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed bottom-8 right-8 z-50"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-[2px] shadow-2xl"
            >
              <div className="relative rounded-2xl bg-slate-900 px-6 py-4 transition-all hover:bg-slate-900/80">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-semibold text-white">Free Board Report</div>
                    <div className="text-xs text-slate-300">RX Defense IQ Analysis</div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-white transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.button>

            {/* Minimize Button */}
            <button
              onClick={() => setIsMinimized(true)}
              className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-slate-700 text-slate-300 hover:bg-slate-600"
            >
              <X className="h-3 w-3" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Restore Button (when minimized) */}
      <AnimatePresence>
        {isMinimized && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsMinimized(false)}
            className="fixed bottom-8 right-8 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 shadow-2xl hover:shadow-blue-500/50"
          >
            <Shield className="h-8 w-8 text-white" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Modal Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl border-slate-700 bg-slate-900">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">
              Get Your Free RX Defense IQ Board Report
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Upload your PBM contract and receive a comprehensive board-ready analysis highlighting hidden costs, fiduciary risks, and negotiation opportunities.
            </DialogDescription>
          </DialogHeader>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Value Props */}
              <div className="grid grid-cols-1 gap-4 rounded-lg bg-slate-800/50 p-4 md:grid-cols-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-500" />
                  <div>
                    <div className="text-sm font-semibold text-white">20-Point Analysis</div>
                    <div className="text-xs text-slate-400">All critical PBM clauses reviewed</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-500" />
                  <div>
                    <div className="text-sm font-semibold text-white">Board-Ready Format</div>
                    <div className="text-xs text-slate-400">Executive summary included</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-500" />
                  <div>
                    <div className="text-sm font-semibold text-white">48-Hour Delivery</div>
                    <div className="text-xs text-slate-400">Complete analysis guaranteed</div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Full Name *
                  </label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Smith"
                    className="border-slate-700 bg-slate-800 text-white placeholder:text-slate-500"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Email Address *
                  </label>
                  <Input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@company.com"
                    className="border-slate-700 bg-slate-800 text-white placeholder:text-slate-500"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Company *
                  </label>
                  <Input
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Acme Corporation"
                    className="border-slate-700 bg-slate-800 text-white placeholder:text-slate-500"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Job Title *
                  </label>
                  <Input
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="CFO, Benefits Manager, etc."
                    className="border-slate-700 bg-slate-800 text-white placeholder:text-slate-500"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Phone Number (Optional)
                </label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                  className="border-slate-700 bg-slate-800 text-white placeholder:text-slate-500"
                />
              </div>

              {/* Contract Upload */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Upload PBM Contract (PDF) *
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    id="contract-upload"
                    required
                  />
                  <label
                    htmlFor="contract-upload"
                    className="flex cursor-pointer items-center justify-center gap-3 rounded-lg border-2 border-dashed border-slate-700 bg-slate-800 px-6 py-8 transition-colors hover:border-blue-500 hover:bg-slate-800/80"
                  >
                    <Upload className="h-8 w-8 text-slate-400" />
                    <div className="text-center">
                      {file ? (
                        <>
                          <div className="text-sm font-medium text-white">{file.name}</div>
                          <div className="text-xs text-slate-400">Click to change file</div>
                        </>
                      ) : (
                        <>
                          <div className="text-sm font-medium text-white">Click to upload PDF</div>
                          <div className="text-xs text-slate-400">Max file size: 50MB</div>
                        </>
                      )}
                    </div>
                  </label>
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Additional Notes (Optional)
                </label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Any specific concerns or areas you'd like us to focus on?"
                  rows={3}
                  className="border-slate-700 bg-slate-800 text-white placeholder:text-slate-500"
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-3">
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Get Free Board Report
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  className="border-slate-700 bg-slate-800 text-white hover:bg-slate-700"
                >
                  Cancel
                </Button>
              </div>

              {/* Privacy Note */}
              <p className="text-xs text-slate-500">
                Your contract will be analyzed confidentially. We do not share your data with third parties.
                By submitting, you agree to our privacy policy.
              </p>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 text-center"
            >
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20">
                <CheckCircle2 className="h-10 w-10 text-green-500" />
              </div>
              <h3 className="mb-2 text-2xl font-bold text-white">Report Request Submitted!</h3>
              <p className="text-slate-400">
                We've received your contract and will deliver your comprehensive RX Defense IQ Board Report within 48 hours.
              </p>
              <p className="mt-4 text-sm text-slate-500">
                Check your email ({formData.email}) for confirmation.
              </p>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}