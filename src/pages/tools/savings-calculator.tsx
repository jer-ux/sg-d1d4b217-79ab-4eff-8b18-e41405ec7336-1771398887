import Head from "next/head";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SavingsCalculator } from "@/components/tools/SavingsCalculator";

export default function SavingsCalculatorPage() {
  return (
    <>
      <Head>
        <title>PBM Savings Calculator | Kincaid IQ Contract X-Ray</title>
        <meta
          name="description"
          content="Calculate your hidden PBM costs and potential savings. Free ROI analysis shows exactly how much you're losing to contract loopholes and hidden fees."
        />
      </Head>

      <div className="min-h-screen bg-black text-white">
        <SiteHeader />
        
        <main className="pt-32 pb-20 px-4">
          <SavingsCalculator />
        </main>

        <SiteFooter />
      </div>
    </>
  );
}