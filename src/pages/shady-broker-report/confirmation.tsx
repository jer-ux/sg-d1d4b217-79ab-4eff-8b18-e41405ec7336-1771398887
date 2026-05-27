import { motion } from "framer-motion";
import { CheckCircle2, Calendar, Mail, FileText, ExternalLink } from "lucide-react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";

export default function ShadyBrokerConfirmation() {
  const router = useRouter();
  const { engagement_id } = router.query;

  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
        <style>{`
          @import url('https://fonts.cdnfonts.com/css/instrument-serif');
          .sbi-report-page { font-family: 'Geist', -apple-system, sans-serif; }
          .sbi-report-page .font-display { font-family: 'Instrument Serif', Georgia, serif; }
          .glass-panel {
            background: rgba(18, 16, 30, 0.42);
            backdrop-filter: blur(28px) saturate(170%);
            border: 1px solid #f5c361;
            border-radius: 22px;
          }
        `}</style>
      </Head>

      <SEO 
        title="Engagement Confirmed | The Shady Broker Report"
        description="Your forensic report engagement has been confirmed"
      />

      <div className="min-h-screen bg-[#08070d] sbi-report-page">
        <Nav />

        <div className="pt-32 pb-20 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-24 h-24 bg-[#4ade80]/20 border-2 border-[#4ade80] rounded-full mb-8">
                <CheckCircle2 className="w-12 h-12 text-[#4ade80]" />
              </div>

              <h1 className="font-display text-5xl text-white mb-4">
                Engagement Confirmed
              </h1>
              
              <p className="text-xl text-gray-400 mb-12">
                Your forensic report is now in production. The 10-day clock has begun.
              </p>

              <div className="glass-panel p-8 mb-8 text-left">
                <h2 className="font-display text-2xl text-white mb-6">What Happens Next</h2>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <Mail className="w-6 h-6 text-[#f5c361] flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-white font-semibold mb-2">Confirmation Email Sent</h3>
                      <p className="text-gray-400 text-sm">
                        Check your inbox for your engagement confirmation, NDA copy, and kickoff call calendar link.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Calendar className="w-6 h-6 text-[#f5c361] flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-white font-semibold mb-2">Kickoff Call Scheduled</h3>
                      <p className="text-gray-400 text-sm">
                        Our team will reach out within 24 hours to schedule your kickoff call and review the evidence requirements.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <FileText className="w-6 h-6 text-[#f5c361] flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-white font-semibold mb-2">Report Delivery in 10 Business Days</h3>
                      <p className="text-gray-400 text-sm">
                        Your 24-page forensic dossier, evidence manifest, and SHA-256 sealed documentation will be delivered via secure link.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-panel p-6 mb-8 bg-[#f5c361]/5">
                <div className="flex items-start gap-3">
                  <div className="bg-[#f5c361]/20 p-2 rounded-lg">
                    <FileText className="w-5 h-5 text-[#f5c361]" />
                  </div>
                  <div className="text-left flex-1">
                    <h3 className="text-white font-semibold mb-1">Engagement ID</h3>
                    <p className="font-mono text-sm text-gray-400">{engagement_id || "Loading..."}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/shady-broker-report">
                  <Button
                    variant="outline"
                    className="border-[#f5c361]/50 hover:border-[#f5c361] text-[#f5c361] hover:bg-[#f5c361]/10"
                  >
                    Return to Report Page
                  </Button>
                </Link>
                <a href="mailto:jer@kincaidrmc.com">
                  <Button className="bg-[#f5c361] hover:bg-[#ffd98a] text-[#0B1220]">
                    Contact Support
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}