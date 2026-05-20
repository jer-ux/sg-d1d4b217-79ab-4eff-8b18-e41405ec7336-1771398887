import Head from "next/head";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ContractHealthCheck } from "@/components/tools/ContractHealthCheck";

export default function ContractHealthCheckPage() {
  return (
    <>
      <Head>
        <title>Free PBM Contract Health Check | Kincaid IQ Contract X-Ray</title>
        <meta
          name="description"
          content="Upload your PBM contract for instant analysis. Get a free health score and red flag report identifying hidden costs and fiduciary risks."
        />
      </Head>

      <div className="min-h-screen bg-black text-white">
        <SiteHeader />
        
        <main className="pt-32 pb-20 px-4">
          <ContractHealthCheck />
        </main>

        <SiteFooter />
      </div>
    </>
  );
}