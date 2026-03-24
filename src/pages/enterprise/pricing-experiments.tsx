import Head from "next/head";
import { EnterpriseHeader } from "@/components/enterprise/EnterpriseHeader";
import { PricingABAnalytics } from "@/components/enterprise/PricingABAnalytics";
import { SiteFooter } from "@/components/site/SiteFooter";

export default function PricingExperimentsPage() {
  return (
    <>
      <Head>
        <title>Pricing Experiments - SiriusB iQ</title>
        <meta name="description" content="A/B testing analytics for pricing optimization" />
      </Head>

      <div className="flex min-h-screen flex-col">
        <EnterpriseHeader />

        <main className="flex-1 py-12 bg-gray-50 dark:bg-gray-900">
          <div className="container max-w-7xl">
            <PricingABAnalytics />
          </div>
        </main>

        <SiteFooter />
      </div>
    </>
  );
}