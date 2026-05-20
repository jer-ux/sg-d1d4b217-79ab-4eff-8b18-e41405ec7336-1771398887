import { SEO } from "@/components/SEO";
import { CalendlyPopupButton } from "@/components/calendly/CalendlyPopupButton";
import { Shield, AlertTriangle, DollarSign } from "lucide-react";

export function RxDefenseHero() {
  return (
    <>
      <SEO
        title="Rx Defense: PBM Contract x-Ray — Kincaid IQ"
        description="Forensic infrastructure that turns pharmacy contract opacity into board-level intelligence. Stop losing millions to hidden PBM fees."
      />
      
      <section className="relative min-h-screen bg-gradient-to-br from-[#070B12] via-[#0a1520] to-[#050a10]">
        <div className="absolute inset-0 bg-[url('/particle-ring-reference.png')] opacity-5" />
        
        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-400 border border-cyan-500/20 mb-8">
              <Shield className="w-4 h-4" />
              Rx Defense: PBM Contract x-Ray
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent">
              The 7.3 Billion Question
            </h1>
            
            <p className="text-xl md:text-2xl text-white/70 max-w-4xl mx-auto mb-12 leading-relaxed">
              What the Big Three PBMs have cost your plan, your people, and your EBITDA. 
              <span className="block mt-4 text-cyan-400 font-semibold">
                Forensic infrastructure that turns pharmacy contract opacity into board-level intelligence.
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <CalendlyPopupButton className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-bold shadow-lg">
                Request Contract x-Ray
              </CalendlyPopupButton>
              
              <a 
                href="#how-it-works"
                className="px-8 py-4 text-lg font-bold text-white border border-cyan-500/50 hover:border-cyan-500 rounded-lg transition-all"
              >
                See How It Works
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <StatCard
                icon={<DollarSign className="w-8 h-8 text-cyan-400" />}
                value="$247M"
                label="Hidden fees recovered"
              />
              <StatCard
                icon={<AlertTriangle className="w-8 h-8 text-amber-400" />}
                value="89%"
                label="Contracts have material leakage"
              />
              <StatCard
                icon={<Shield className="w-8 h-8 text-emerald-400" />}
                value="100%"
                label="ERISA fiduciary compliant"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function StatCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="bg-gradient-to-br from-[#0a1520] to-[#050a10] border border-cyan-900/50 rounded-2xl p-6">
      <div className="flex items-center justify-center mb-4">{icon}</div>
      <div className="text-3xl font-bold text-white mb-2">{value}</div>
      <div className="text-sm text-white/60">{label}</div>
    </div>
  );
}