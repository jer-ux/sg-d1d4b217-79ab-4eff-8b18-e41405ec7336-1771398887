import { SEO } from "@/components/SEO";
import { ExecutiveWarRoom } from "@/components/warroom/ExecutiveWarRoom";

export default function ExecutiveWarRoomPage() {
  return (
    <>
      <SEO
        title="Kincaid IQ Rx X-Ray | SiriusB iQ"
        description="Real-time pharmacy benefit management dashboard with McKinsey and Bain KPIs for healthcare cost management, contract compliance, and experience metrics"
      />
      <ExecutiveWarRoom />
    </>
  );
}