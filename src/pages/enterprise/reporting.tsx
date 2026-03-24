import { useState } from "react";
import Head from "next/head";
import { EnterpriseHeader } from "@/components/enterprise/EnterpriseHeader";
import { EnterpriseReporting } from "@/components/enterprise/EnterpriseReporting";
import { SiteFooter } from "@/components/site/SiteFooter";

export default function EnterpriseReportingPage() {
  return (
    <>
      <Head>
        <title>Enterprise Reporting - SiriusB iQ</title>
        <meta
          name="description"
          content="Advanced enterprise reporting and analytics for contract intelligence"
        />
      </Head>

      <div className="flex min-h-screen flex-col">
        <EnterpriseHeader />

        <main className="flex-1 py-12 bg-gray-50 dark:bg-gray-900">
          <div className="container max-w-7xl">
            <EnterpriseReporting />
          </div>
        </main>

        <SiteFooter />
      </div>
    </>
  );
}