import { motion } from "framer-motion";
import { Database, Activity, Search, ShieldCheck, ArrowRight, Clock } from "lucide-react";

interface TimelineStep {
  dayRange: string;
  title: string;
  icon: any;
  description: string;
  details: string[];
}

const timelineSteps: TimelineStep[] = [
  {
    dayRange: "Days 1 - 7",
    title: "Secure Claims Ingestion",
    icon: Database,
    description: "Establishing a complete HIPAA-compliant data connection to extract raw medical and prescription historical claim lines.",
    details: [
      "SSAE-18 SOC 2 secure upload environment",
      "De-identification of all PHI record columns",
      "Multi-source historical contract consolidation"
    ]
  },
  {
    dayRange: "Days 8 - 15",
    title: "Telemetry & Mapping Sweep",
    icon: Search,
    description: "Every single claim line is parsed, mapped, and cross-referenced against multiple forensic actuarial databases.",
    details: [
      "Auditing against real-time NADAC wholesale costs",
      "De-substituting brand drug overcharge clusters",
      "Broker compensation & hidden override tracing"
    ]
  },
  {
    dayRange: "Days 16 - 22",
    title: "Plan Leakage Identification",
    icon: Activity,
    description: "Drafting the forensic report detailing specific overcharge segments, billing errors, and rebate withholding.",
    details: [
      "Calculating generic spread markup leakage",
      "Measuring Group Purchasing Organization (GPO) retention",
      "Compounding EBITDA exit valuation multipliers"
    ]
  },
  {
    dayRange: "Days 23 - 30",
    title: "Fiduciary Alignment Launch",
    icon: ShieldCheck,
    description: "Implementing transparent, self-driving fiduciary contract carve-outs to eliminate pharmacy waste permanently.",
    details: [
      "Execution of transparent fee-only contracts",
      "Full pass-through of drug manufacturer rebates",
      "Immediate plan savings realization averaging 20-35%"
    ]
  }
];

export function AuditJourneyTimeline() {
  return (
    <div className="relative w-full">
      {/* Central Connector Line for Desktop */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-800/40 hidden lg:block -translate-x-1/2 pointer-events-none" />

      <div className="space-y-12 lg:space-y-24 relative">
        {timelineSteps.map((step, idx) => {
          const Icon = step.icon;
          const isEven = idx % 2 === 0;

          return (
            <div 
              key={step.title} 
              className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 w-full ${
                isEven ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Content Panel */}
              <motion.div
                initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="w-full lg:w-1/2 flex justify-center"
              >
                <div className="relative rounded-2xl border border-slate-800 bg-[#0C1117]/60 backdrop-blur-xl p-8 hover:border-[#B8860B]/20 transition-all duration-300 shadow-xl max-w-lg w-full">
                  {/* Decorative Subtle Corner Glow */}
                  <div className="absolute top-0 left-0 w-20 h-20 bg-[#B8860B]/5 blur-xl rounded-full" />
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#B8860B] uppercase tracking-wider bg-[#B8860B]/5 border border-[#B8860B]/20 px-3 py-1 rounded">
                        <Clock className="h-3 w-3" />
                        {step.dayRange}
                      </span>
                      <div className="rounded-lg bg-slate-900/50 p-2.5 border border-slate-800 text-[#B8860B]">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>

                    <h3 className="text-xl font-serif font-bold text-white">{step.title}</h3>
                    <p className="text-sm text-slate-300 leading-relaxed">{step.description}</p>

                    <div className="pt-4 border-t border-slate-900/60 space-y-2">
                      <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-semibold">
                        Key Audit Protocols:
                      </div>
                      <ul className="space-y-1.5">
                        {step.details.map((detail) => (
                          <li key={detail} className="flex items-center gap-2 text-xs text-slate-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#B8860B]/60" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Center Timeline Icon Block */}
              <div className="hidden lg:flex items-center justify-center relative z-10">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="w-12 h-11 rounded-full bg-[#0F1419] border-2 border-slate-800 flex items-center justify-center text-slate-400 text-xs font-mono font-bold"
                >
                  {idx + 1}
                </motion.div>
              </div>

              {/* Symmetrical Spacing Spacer for Grid Alignment */}
              <div className="hidden lg:block lg:w-1/2" />
            </div>
          );
        })}
      </div>
    </div>
  );
}