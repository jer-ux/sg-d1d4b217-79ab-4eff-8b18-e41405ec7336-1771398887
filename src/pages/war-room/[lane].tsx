import { useRouter } from "next/router";
import { SEO } from "@/components/SEO";
import { Container } from "@/components/Blocks";
import { LaneDetail } from "@/components/warroom/LaneDetail";

export default function LanePage() {
  const router = useRouter();
  const { lane } = router.query;

  if (!lane || typeof lane !== "string") {
    return null;
  }

  return (
    <>
      <SEO
        title={`${lane.charAt(0).toUpperCase() + lane.slice(1)} Lane - War Room - Kincaid IQ`}
        description={`Detailed view of the ${lane} operational lane with live event tracking and evidence receipts.`}
      />
      <div className="min-h-[calc(100vh-72px)]">
        <Container>
          <LaneDetail lane={lane} />
        </Container>
      </div>
    </>
  );
}