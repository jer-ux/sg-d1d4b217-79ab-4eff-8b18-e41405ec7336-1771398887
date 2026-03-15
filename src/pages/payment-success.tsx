import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SEO } from "@/components/SEO";
import { SiriusBNav } from "@/components/siriusb/SiriusBNav";
import { SiriusBFooter } from "@/components/siriusb/SiriusBFooter";
import { OrderService } from "@/services/orderService";
import { motion } from "framer-motion";
import { CheckCircle2, FileText, Mail, Clock, Upload, File, Loader2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function PaymentSuccess() {
  const router = useRouter();
  const { session_id } = router.query;
  const [uploadReady, setUploadReady] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [notes, setNotes] = useState("");
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    if (session_id && typeof session_id === "string") {
      initializeOrder(session_id);
    }
  }, [session_id]);

  async function initializeOrder(sessionId: string) {
    // Check if order already exists for this session
    const existingOrder = await OrderService.getOrderBySession(sessionId);
    
    if (existingOrder) {
      setOrderId(existingOrder.id);
      setUploadReady(true);
      
      // If contract already uploaded, show success
      if (existingOrder.contract_file_url) {
        setUploadSuccess(true);
      }
    } else {
      // In production, fetch session details from Stripe and create order
      // For now, we'll wait for the webhook or manual creation
      setUploadReady(true);
    }
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadedFile || !orderId) return;

    setUploading(true);

    try {
      // In production, upload file to storage and update order
      // const fileUrl = await uploadToStorage(uploadedFile);
      // await OrderService.uploadContract(orderId, fileUrl, uploadedFile.name);
      
      // Simulate upload
      setTimeout(() => {
        setUploading(false);
        setUploadSuccess(true);
      }, 2000);
    } catch (error) {
      console.error("Upload failed:", error);
      setUploading(false);
    }
  };

  return (
    <>
      <SEO
        title="Payment Successful - RX Defense Board Report"
        description="Your payment was successful. Upload your PBM contract to receive your comprehensive board report within 48 hours."
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
        <SiriusBNav />
        
        <div className="container mx-auto px-4 py-20 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Success Header */}
            <div className="text-center space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 border-2 border-green-500"
              >
                <CheckCircle2 className="w-10 h-10 text-green-400" />
              </motion.div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Payment Successful!
              </h1>
              
              <p className="text-xl text-blue-200 max-w-2xl mx-auto">
                Thank you for your purchase. Your RX Defense Board Report is ready to be generated.
              </p>
            </div>

            {/* Next Steps Card */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <FileText className="w-6 h-6 text-blue-400" />
                Next Steps
              </h2>

              <div className="space-y-6">
                {/* Step 1 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/20 border-2 border-blue-500 flex items-center justify-center text-blue-400 font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Upload Your PBM Contract
                    </h3>
                    <p className="text-blue-200">
                      Use the upload form below to submit your PBM contract PDF. We accept contracts up to 50MB.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/20 border-2 border-blue-500 flex items-center justify-center text-blue-400 font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Our AI Analyzes Your Contract
                    </h3>
                    <p className="text-blue-200">
                      Our Contract Intelligence Engine performs a comprehensive 20-point analysis, scoring each critical clause for transparency, economic alignment, and fiduciary risk.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/20 border-2 border-blue-500 flex items-center justify-center text-blue-400 font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-blue-400" />
                      Receive Your Board Report (48 Hours)
                    </h3>
                    <p className="text-blue-200">
                      You'll receive a professional, board-ready report via email within 48 hours, including executive summary, clause-by-clause analysis, and negotiation recommendations.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/20 border-2 border-blue-500 flex items-center justify-center text-blue-400 font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                      <Mail className="w-5 h-5 text-blue-400" />
                      Confirmation Email Sent
                    </h3>
                    <p className="text-blue-200">
                      Check your inbox for a confirmation email with your receipt and next steps. We'll also send updates as your report progresses.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Upload Section */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Upload className="w-6 h-6 text-blue-400" />
                Upload Your Contract Now
              </h2>
              <p className="text-blue-200 mb-6">
                Ready to get started? Upload your PBM contract PDF below, and we'll begin the analysis immediately.
              </p>
              
              <div className="flex gap-4">
                <Link href="/contract-intelligence" className="flex-1">
                  <Button size="lg" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Upload className="w-5 h-5 mr-2" />
                    Upload Contract & Start Analysis
                  </Button>
                </Link>
              </div>
            </Card>

            {/* What's Included */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                What's Included in Your $199 Board Report
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-white">20-Point Clause Analysis</h3>
                      <p className="text-sm text-blue-200">Every critical PBM economic category reviewed</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-white">Risk Scoring Dashboard</h3>
                      <p className="text-sm text-blue-200">Red/yellow/green ratings for each clause</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-white">Executive Summary</h3>
                      <p className="text-sm text-blue-200">One-page triage for quick decision-making</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-white">Board-Ready Format</h3>
                      <p className="text-sm text-blue-200">Professional governance-focused reporting</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-white">Negotiation Guide</h3>
                      <p className="text-sm text-blue-200">Recommended language and broker talking points</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-white">Economic Exposure Analysis</h3>
                      <p className="text-sm text-blue-200">Hidden cost risks and margin extraction points</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-white">Transparency Scorecard</h3>
                      <p className="text-sm text-blue-200">Clause-by-clause transparency ratings</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-white">48-Hour Delivery</h3>
                      <p className="text-sm text-blue-200">Guaranteed turnaround time</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Add View Profile Button after success */}
            {uploadSuccess && (
              <div className="text-center">
                <Button
                  size="lg"
                  onClick={() => router.push("/profile")}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                >
                  <User className="w-5 h-5 mr-2" />
                  View My Orders
                </Button>
              </div>
            )}

            {/* Support */}
            <div className="text-center space-y-4">
              <p className="text-blue-200">
                Questions about your order?{" "}
                <Link href="/contact" className="text-blue-400 hover:text-blue-300 underline">
                  Contact our support team
                </Link>
              </p>
              
              <div className="flex items-center justify-center gap-2 text-sm text-blue-300">
                <CheckCircle2 className="w-4 h-4" />
                <span>Order ID: {session_id?.toString().slice(-12).toUpperCase() || "Processing..."}</span>
              </div>
            </div>
          </motion.div>
        </div>

        <SiriusBFooter />
      </div>
    </>
  );
}