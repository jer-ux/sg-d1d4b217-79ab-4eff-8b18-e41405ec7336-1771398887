import Head from "next/head";
import { EnterpriseHeader } from "@/components/enterprise/EnterpriseHeader";
import { PartnerDashboard } from "@/components/enterprise/PartnerDashboard";
import { SiteFooter } from "@/components/site/SiteFooter";

export default function PartnerPortalPage() {
  return (
    <>
      <Head>
        <title>Partner Portal - SiriusB iQ</title>
        <meta name="description" content="Partner analytics and commission tracking" />
      </Head>

      <div className="flex min-h-screen flex-col">
        <EnterpriseHeader />

        <main className="flex-1 py-12 bg-gray-50 dark:bg-gray-900">
          <div className="container max-w-7xl">
            <PartnerDashboard />
          </div>
        </main>

        <SiteFooter />
      </div>
    </>
  );
}