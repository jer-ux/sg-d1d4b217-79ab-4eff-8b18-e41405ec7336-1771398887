import { SEO } from "@/components/SEO";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { CalendlyPopupButton } from "@/components/calendly/CalendlyPopupButton";
import { Calendar } from "lucide-react";
import Nav from "@/components/Nav";

export default function ContactPage() {
  return (
    <>
      <SEO
        title="Contact — Kincaid IQ"
        description="Book a strategy call to discuss how Kincaid IQ can help your organization."
      />
      <div className="min-h-screen bg-[#070B12] text-white">
        <SiteHeader />
        <Nav />
        
        <main>
          <div className="mx-auto max-w-3xl px-6 py-16">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Book a Strategy Call</h1>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                Schedule a 30-minute call with Jeremiah to discuss your PBM contract, healthcare costs, and how Kincaid IQ can help.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#0a1520] to-[#050a10] border border-cyan-900/50 rounded-3xl p-8 md:p-12 text-center">
              <div className="mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-500/20 mb-4">
                  <Calendar className="w-8 h-8 text-cyan-400" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Schedule Your Call</h2>
                <p className="text-white/70">
                  Pick a time that works for you
                </p>
              </div>

              <CalendlyPopupButton className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-8 py-6 text-lg font-bold shadow-lg">
                Book 30-Minute Strategy Call
              </CalendlyPopupButton>

              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-sm text-white/60 mb-4">Or reach out directly:</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="mailto:jer@kincaidrmc.com"
                    className="text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    jer@kincaidrmc.com
                  </a>
                  <span className="hidden sm:inline text-white/30">•</span>
                  <a 
                    href="tel:2192563331"
                    className="text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    (219) 256-3331
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>

        <SiteFooter />
      </div>
    </>
  );
}