import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import { CHROWarRoom } from "@/components/warroom/CHROWarRoom";

export default function CHRODashboardPage() {
  return (
    <>
      <SEO
        title="CHRO Dashboard - Human Capital Analytics - SiriusB iQ"
        description="Executive CHRO dashboard with real-time employee benefits, engagement metrics, and human capital analytics."
      />
      <Nav />
      <CHROWarRoom />
    </>
  );
}