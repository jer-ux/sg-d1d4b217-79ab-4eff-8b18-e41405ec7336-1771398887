import Link from "next/link";
import { Shield, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function FiduciaryPillarsSection() {
  const pillars = [
    { 
      num: "1", 
      title: "Verified Savings Documentation", 
      desc: "Timestamped audit trail with complete chain of custody",
      href: "/pillars/verified-savings-documentation",
      color: "emerald"
    },
    { 
      num: "2", 
      title: "Financial Impact Analysis", 
      desc: "EBITDA quantification and board-ready financial models",
      href: "/pillars/financial-impact-analysis",
      color: "blue"
    },
    { 
      num: "3", 
      title: "Multi-Source Data Reconciliation", 
      desc: "Cross-system verification and data integrity validation",
      href: "/pillars/multi-source-data-reconciliation",
      color: "amber"
    },
    { 
      num: "4", 
      title: "Contract Intelligence & Compliance", 
      desc: "Automated clause extraction and guarantee enforcement",
      href: "/pillars/contract-intelligence-compliance",
      color: "purple"
    },
    { 
      num: "5", 
      title: "Actuarial Risk Modeling", 
      desc: "Monte Carlo simulations and credibility-weighted forecasts",
      href: "/pillars/actuarial-risk-modeling",
      color: "rose"
    },
    { 
      num: "6", 
      title: "Real-Time Claims Surveillance", 
      desc: "Transaction-level anomaly detection and forensic alerts",
      href: "/pillars/realtime-claims-surveillance",
      color: "orange"
    },
    { 
      num: "7", 
      title: "Regulatory & Legal Framework", 
      desc: "ERISA compliance monitoring and DOL audit readiness",
      href: "/pillars/regulatory-legal-framework",
      color: "indigo"
    },
    { 
      num: "8", 
      title: "Predictive Cost Analytics", 
      desc: "AI-powered trend forecasting and intervention modeling",
      href: "/pillars/predictive-cost-analytics",
      color: "cyan"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-black via-[#0A0E27] to-black border-y border-[#1F2937]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <Badge className="bg-[#B8860B]/10 text-[#B8860B] border border-[#B8860B]/30 mb-3 uppercase tracking-wider text-xs">
            Fiduciary Framework
          </Badge>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-3">
            8 Pillars of Fiduciary Responsibility
          </h2>
          <p className="text-lg text-neutral-400 max-w-3xl mx-auto">
            Comprehensive governance framework for board members and plan fiduciaries — defense-ready documentation and continuous oversight infrastructure.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {pillars.map((pillar) => (
            <Link key={pillar.num} href={pillar.href}>
              <div className={`group bg-[#151B23] border-2 border-[#2A3F54] hover:border-${pillar.color}-500/60 rounded-xl p-5 transition-all duration-300 hover:shadow-xl hover:shadow-${pillar.color}-500/10 cursor-pointer h-full`}>
                <div className={`w-10 h-10 rounded-full bg-${pillar.color}-500/10 flex items-center justify-center mb-3 border border-${pillar.color}-500/30`}>
                  <span className={`text-lg font-bold text-${pillar.color}-400`}>{pillar.num}</span>
                </div>
                <h3 className="text-sm font-semibold text-white mb-2 group-hover:text-[#B8860B] transition-colors leading-tight">
                  {pillar.title}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="bg-gradient-to-br from-[#151B23] to-[#0F1419] border-2 border-[#1A3A52] rounded-xl p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-5 h-5 text-[#B8860B]" />
                <h3 className="text-xl font-serif font-bold text-white">Board Fiduciary Defense Package</h3>
              </div>
              <p className="text-neutral-300 leading-relaxed">
                Complete documentation framework demonstrating compliance with ERISA duty of prudence. Defense-ready audit trail for DOL inquiries, litigation response, and board reporting.
              </p>
              <div className="flex flex-wrap gap-3 mt-4">
                <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs">
                  DOL Audit Ready
                </Badge>
                <Badge className="bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs">
                  Litigation Defense
                </Badge>
                <Badge className="bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs">
                  404(c) Compliance
                </Badge>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Link href="/personas/board-members">
                <Button className="bg-[#B8860B] hover:bg-[#D4AF37] text-black font-bold whitespace-nowrap">
                  Board Member Portal
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/board-of-directors">
                <Button variant="outline" className="border-[#2A3F54] text-neutral-300 hover:bg-[#0C1117] whitespace-nowrap">
                  View Executive Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}