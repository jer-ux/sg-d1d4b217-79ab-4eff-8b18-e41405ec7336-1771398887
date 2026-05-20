import Head from "next/head";
import Link from "next/link";
import { Users, HeartPulse, Shield, FileText, CheckCircle2, Clock } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function HRPage() {
  return (
    <>
      <Head>
        <title>For HR & Benefits: Improve Member Experience | Kincaid IQ</title>
        <meta
          name="description"
          content="Stop letting your PBM frustrate your employees. Discover how Contract X-Ray improves access to care and reduces out-of-pocket costs."
        />
      </Head>

      <div className="min-h-screen bg-black text-white">
        <SiteHeader />

        {/* Hero */}
        <section className="relative pt-32 pb-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-black" />
          <div className="relative max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-full mb-6">
              <Users className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-semibold text-blue-300">For HR & Benefits Leaders</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Your PBM Is Hurting Your Employees
            </h1>
            
            <p className="text-xl text-gray-300 mb-4 max-w-3xl mx-auto">
              Hidden contract clauses allow PBMs to force employees into expensive mail-order pharmacies, delay care with unnecessary prior authorizations, and artificially inflate member out-of-pocket costs.
            </p>
            
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
              Kincaid IQ's Rx PBM Contract X-Ray helps you regain control of the member experience while fulfilling your fiduciary duty.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/tools/contract-health-check">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 w-full sm:w-auto">
                  Free Contract Health Check
                </Button>
              </Link>
              <Link href="/request-demo">
                <Button size="lg" variant="outline" className="border-blue-500/50 text-blue-300 hover:bg-blue-500/10 w-full sm:w-auto">
                  Schedule HR Briefing
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* The Problem */}
        <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">How PBM Contracts Degrade Member Experience</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-gray-900/50 border-blue-500/30 p-6">
                <HeartPulse className="w-10 h-10 text-rose-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Care Delays</h3>
                <p className="text-gray-400 text-sm">
                  "Prior authorization" requirements are frequently used not for clinical safety, but to frustrate members into abandoning therapy for high-cost drugs, improving PBM margins.
                </p>
              </Card>

              <Card className="bg-gray-900/50 border-blue-500/30 p-6">
                <Shield className="w-10 h-10 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Network Lock-in</h3>
                <p className="text-gray-400 text-sm">
                  Contracts restrict where members can fill specialty medications, forcing them to use PBM-owned pharmacies with notoriously poor customer service and delivery delays.
                </p>
              </Card>

              <Card className="bg-gray-900/50 border-blue-500/30 p-6">
                <FileText className="w-10 h-10 text-cyan-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Formulary Bait & Switch</h3>
                <p className="text-gray-400 text-sm">
                  Mid-year formulary changes disrupt care. PBMs routinely drop coverage for medications that don't pay high rebates, forcing members to switch drugs purely for PBM profit.
                </p>
              </Card>
            </div>
          </div>
        </section>

        <SiteFooter />
      </div>
    </>
  );
}