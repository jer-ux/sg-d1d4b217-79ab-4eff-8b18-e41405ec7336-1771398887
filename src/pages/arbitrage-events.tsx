import Navbar from "@/components/Navbar";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ArbitrageEventsPanel } from "@/components/arbitrage/ArbitrageEventsPanel";

export default function ArbitrageEventsPage() {
  return (
    <div className="min-h-screen bg-[#060812] text-white selection:bg-white/20">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ArbitrageEventsPanel />
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}