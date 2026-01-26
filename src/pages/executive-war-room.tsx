import { WarRoom } from "@/components/warroom/WarRoom";
import { SEO } from "@/components/SEO";

export default function ExecutiveWarRoomPage() {
  return (
    <>
      <SEO
        title="Executive War Room | SiriusB iQ"
        description="Executive War Room with Evidence Receipts — Verified or it's not real."
      />
      <WarRoom />
    </>
  );
}