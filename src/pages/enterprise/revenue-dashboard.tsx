import Head from "next/head";
import { EnterpriseHeader } from "@/components/enterprise/EnterpriseHeader";
import { ABTestResults } from "@/components/enterprise/ABTestResults";
import { SiteFooter } from "@/components/site/SiteFooter";

export default function RevenueDashboardPage() {
  return (
    <>
      <Head>
        <title>Revenue Analytics - SiriusB iQ</title>
        <meta name="description" content="A/B testing and revenue optimization analytics" />
      </Head>

      <div className="flex min-h-screen flex-col">
        <EnterpriseHeader />

        <main className="flex-1 py-12 bg-gray-50 dark:bg-gray-900">
          <div className="container max-w-7xl">
            <ABTestResults />
          </div>
        </main>

        <SiteFooter />
      </div>
    </>
  );
}