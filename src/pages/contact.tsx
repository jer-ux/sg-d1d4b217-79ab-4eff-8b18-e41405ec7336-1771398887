import { SEO } from "@/components/SEO";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { CalendlyPopupButton } from "@/components/calendly/CalendlyPopupButton";
import { Calendar, Mail } from "lucide-react";
import Nav from "@/components/Nav";

export default function ContactPage() {
  return (
    <>
      <SEO
        title="Contact — Kincaid Health"
        description="Book a strategy call to discuss how Kincaid Health can help your organization."
      />
      <div className="min-h-screen bg-[#070B12] text-white">
        <SiteHeader />
        <Nav />
        
        <main>
          <div className="mx-auto max-w-3xl px-6 py-16">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                Schedule a meeting or send me an email to discuss your PBM contract, healthcare costs, and how Kincaid Health can help.
              </p>
            </div>

            <div className="space-y-6">
              {/* Calendly Booking */}
              <div className="bg-gradient-to-br from-[#0a1520] to-[#050a10] border border-cyan-900/50 rounded-3xl p-8 md:p-12 text-center">
                <div className="mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-500/20 mb-4">
                    <Calendar className="w-8 h-8 text-cyan-400" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Schedule a Meeting</h2>
                  <p className="text-white/70">
                    Book a time that works for you
                  </p>
                </div>

                <CalendlyPopupButton className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-8 py-6 text-lg font-bold shadow-lg">
                  Book 30-Minute Strategy Call
                </CalendlyPopupButton>
              </div>

              {/* Email */}
              <div className="bg-gradient-to-br from-[#0a1520] to-[#050a10] border border-blue-900/50 rounded-3xl p-8 md:p-12 text-center">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/20 mb-4">
                    <Mail className="w-8 h-8 text-blue-400" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Send an Email</h2>
                  <p className="text-white/70 mb-6">
                    Prefer email? Reach out directly
                  </p>
                  <a 
                    href="mailto:jer@kincaidrmc.com"
                    className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-bold rounded-lg shadow-lg transition-all"
                  >
                    jer@kincaidrmc.com
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-white/60">
                I typically respond within 24 hours
              </p>
            </div>
          </div>
        </main>

        <SiteFooter />
      </div>
    </>
  );
}