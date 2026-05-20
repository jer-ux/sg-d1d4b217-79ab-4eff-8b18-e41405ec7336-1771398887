import Head from "next/head";
import { EnterpriseHeader } from "@/components/enterprise/EnterpriseHeader";
import { EnterpriseDashboard } from "@/components/enterprise/EnterpriseDashboard";
import { SiteFooter } from "@/components/site/SiteFooter";
import Nav from "@/components/Nav";

export default function EnterpriseDashboardPage() {
  return (
    <>
      <Head>
        <title>Enterprise Dashboard - SiriusB iQ</title>
        <meta
          name="description"
          content="Enterprise contract intelligence dashboard"
        />
      </Head>

      <div className="flex min-h-screen flex-col">
        <EnterpriseHeader />

        <main className="flex-1 py-12 bg-gray-50 dark:bg-gray-900">
          <div className="container max-w-7xl">
            <Nav />
            <EnterpriseDashboard />
          </div>
        </main>

        <SiteFooter />
      </div>
    </>
  );
}