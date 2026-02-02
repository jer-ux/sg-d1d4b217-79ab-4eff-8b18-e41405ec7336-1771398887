import { SEO } from "@/components/SEO";
import { ExecutiveWarRoom } from "@/components/warroom/ExecutiveWarRoom";

export default function ExecutiveWarRoomPage() {
  return (
    <>
      <SEO
        title="CFO Healthcare Dashboard | Kincaid IQ"
        description="Real-time CFO dashboard with McKinsey and Bain KPIs for healthcare cost management, contract compliance, and experience metrics"
      />
      <ExecutiveWarRoom />
    </>
  );
}