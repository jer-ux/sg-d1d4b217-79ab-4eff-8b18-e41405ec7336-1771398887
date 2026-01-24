import { SEO } from "@/components/SEO";
import { Container } from "@/components/Blocks";
import { WarRoomGrid } from "@/components/warroom/WarRoomGrid";

export default function WarRoomHome() {
  return (
    <>
      <SEO
        title="War Room - Kincaid IQ"
        description="Live EBITDA ledger with evidence-backed value tracking across all operational lanes."
      />
      <div className="min-h-[calc(100vh-72px)]">
        <Container>
          <WarRoomGrid />
        </Container>
      </div>
    </>
  );
}