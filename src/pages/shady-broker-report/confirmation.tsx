import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, FileText, Mail, Clock } from "lucide-react";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function ShadyBrokerReportConfirmation() {
  const router = useRouter();
  const { session_id } = router.query;
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    // In production, you'd verify the session_id with Stripe
    // and fetch the customer email from the session
    if (session_id) {
      // Mock email for demo
      setEmail("buyer@example.com");
    }
  }, [session_id]);

  return (
    <>
      <Head>
        <title>Report Purchase Confirmed | The Shady Broker Index</title>
        <meta name="description" content="Your forensic broker report is being prepared." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
        <div className="max-w-3xl mx-auto px-6 py-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-12 text-center">
            
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center justify-center w-24 h-24 bg-emerald-500/10 rounded-full mb-8">
              <CheckCircle2 className="w-12 h-12 text-emerald-400" />
            </motion.div>

            {/* Confirmation Message */}
            <h1 className="text-4xl font-bold text-white mb-4">
              Payment Confirmed
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Your forensic broker report is being prepared.
            </p>

            {/* What Happens Next */}
            <div className="bg-gray-950/50 border border-gray-800 rounded-xl p-8 mb-8 text-left">
              <h2 className="text-lg font-medium text-white mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-rose-400" />
                What Happens Next
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-rose-500/10 text-rose-400 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-medium">
                    1
                  </div>
                  <div>
                    <div className="text-white font-medium mb-1">Intake Confirmation</div>
                    <div className="text-sm text-gray-400">
                      You'll receive an email at <span className="text-white">{email || "your email"}</span> confirming we've received your request.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-rose-500/10 text-rose-400 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-medium">
                    2
                  </div>
                  <div>
                    <div className="text-white font-medium mb-1">Forensic Analysis</div>
                    <div className="text-sm text-gray-400">
                      Our team begins the 40-page forensic breakdown of your broker's compensation structure, pulling all relevant Schedule A filings and benchmarking data.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-rose-500/10 text-rose-400 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-medium">
                    3
                  </div>
                  <div>
                    <div className="text-white font-medium mb-1">Report Delivery</div>
                    <div className="text-sm text-gray-400">
                      Within 48 hours (usually 24), you'll receive the complete report as a secure PDF with full evidence trail and recovery roadmap.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-rose-500/10 text-rose-400 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-medium">
                    4
                  </div>
                  <div>
                    <div className="text-white font-medium mb-1">Optional Consultation</div>
                    <div className="text-sm text-gray-400">
                      A 30-minute walkthrough call with our team is included. We'll answer questions and help you prioritize the findings.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Receipt Notice */}
            <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-4 mb-8">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-left">
                  <div className="text-sm font-medium text-blue-300 mb-1">Receipt Sent</div>
                  <div className="text-sm text-gray-400">
                    Your payment receipt has been sent to {email || "your email"}. If you don't see it, check your spam folder.
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shady-broker-index">
                <Button variant="outline" className="border-gray-700 text-white hover:bg-white/5">
                  Return to Index
                </Button>
              </Link>
              <Link href="/shady-broker-index/methodology">
                <Button variant="outline" className="border-gray-700 text-white hover:bg-white/5">
                  Read Methodology
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-center">
            <p className="text-gray-400 mb-2">Questions about your report?</p>
            <a href="mailto:reports@kincaidrmc.com" className="text-rose-400 hover:text-rose-300 transition-colors">
              reports@kincaidrmc.com
            </a>
          </motion.div>
        </div>

        <Footer />
      </div>
    </>
  );
}