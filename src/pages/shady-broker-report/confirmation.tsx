import { motion } from "framer-motion";
import { CheckCircle2, FileText, Calendar, Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";

export default function ShadyBrokerConfirmation() {
  return (
    <>
      <SEO 
        title="Engagement Confirmed | The Shady Broker Report"
        description="Your forensic audit has been initiated."
      />
      
      <div className="min-h-screen bg-[#FAF8F5] py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-[#8C1515]/10 rounded-full mb-8">
              <CheckCircle2 className="w-10 h-10 text-[#8C1515]" />
            </div>
            
            <h1 className="font-serif text-5xl text-[#0B1220] mb-6">
              Your engagement is confirmed
            </h1>
            
            <p className="text-lg text-[#5B6472] mb-12 leading-[1.6]">
              The 10 business day clock has begun. You will receive a confirmation email with your NDA attachment and a calendar link for the kickoff call within the next hour.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="border border-[#EDE6D6] p-8">
              <div className="flex items-start gap-4">
                <FileText className="w-6 h-6 text-[#8C1515] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-serif text-xl text-[#0B1220] mb-2">
                    Document intake complete
                  </h3>
                  <p className="text-base text-[#5B6472] leading-[1.6]">
                    Your Form 5500, Schedule A, broker disclosures, and PBM contracts have been received and are being processed through our Evidence Spine Protocol.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="border border-[#EDE6D6] p-8">
              <div className="flex items-start gap-4">
                <Calendar className="w-6 h-6 text-[#8C1515] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-serif text-xl text-[#0B1220] mb-2">
                    Delivery timeline
                  </h3>
                  <p className="text-base text-[#5B6472] leading-[1.6]">
                    Your 24-page forensic report will be delivered within 10 business days. You will receive progress updates at days 3, 6, and 9.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="border border-[#EDE6D6] p-8">
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-[#8C1515] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-serif text-xl text-[#0B1220] mb-2">
                    Next steps
                  </h3>
                  <p className="text-base text-[#5B6472] leading-[1.6] mb-3">
                    Check your email for the confirmation message from jer@kincaidrmc.com. It includes your signed NDA and a link to schedule the kickoff call.
                  </p>
                  <p className="text-sm text-[#5B6472]">
                    Questions? Contact Jeremiah Shrack directly at jer@kincaidrmc.com or (317) 362-9840.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <Link href="/">
              <Button
                className="bg-[#8C1515] hover:bg-[#7A1212] text-[#FAF8F5] px-8 py-4 text-base font-medium rounded-none shadow-none"
              >
                Return to home
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
}