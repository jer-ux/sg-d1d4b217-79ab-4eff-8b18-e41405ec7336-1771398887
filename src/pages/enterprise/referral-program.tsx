import Head from "next/head";
import { EnterpriseHeader } from "@/components/enterprise/EnterpriseHeader";
import { ReferrerProfile } from "@/components/enterprise/ReferrerProfile";
import { SiteFooter } from "@/components/site/SiteFooter";

export default function ReferralProgramPage() {
  return (
    <>
      <Head>
        <title>Referral Program - SiriusB iQ</title>
        <meta name="description" content="Track your referral performance and earnings" />
      </Head>

      <div className="flex min-h-screen flex-col">
        <EnterpriseHeader />

        <main className="flex-1 py-12 bg-gray-50 dark:bg-gray-900">
          <div className="container max-w-7xl">
            <ReferrerProfile />
          </div>
        </main>

        <SiteFooter />
      </div>
    </>
  );
}