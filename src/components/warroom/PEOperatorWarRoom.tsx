import { useState } from "react";
import { BarChart3, TrendingUp, Target, Users, DollarSign, Award, Zap, ChevronRight, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function PEOperatorWarRoom() {
  const [selectedPortCo, setSelectedPortCo] = useState<"alpha" | "bravo" | "charlie" | null>(null);

  const portCoData = {
    alpha: {
      name: "PortCo Alpha",
      employees: 847,
      rxSpend: 4200000,
      savings: 1200000,
      status: "Contract negotiation phase",
      statusColor: "text-[#B8860B]",
      trend: 14,
      implementationProgress: 65,
      details: {
        currentPBM: "Big Three PBM",
        contractEnd: "Q2 2027",
        avgMemberAge: 42,
        chronicConditions: 28,
        topDrugClasses: ["Diabetes", "Cardiovascular", "Mental Health"]
      }
    },
    bravo: {
      name: "PortCo Bravo",
      employees: 1243,
      rxSpend: 6800000,
      savings: 2100000,
      status: "Implementation complete",
      statusColor: "text-emerald-400",
      trend: 3.2,
      implementationProgress: 100,
      details: {
        currentPBM: "Transparent Cost-Plus",
        contractEnd: "Q4 2028",
        avgMemberAge: 38,
        chronicConditions: 22,
        topDrugClasses: ["Oncology", "Autoimmune", "Respiratory"]
      }
    },
    charlie: {
      name: "PortCo Charlie",
      employees: 562,
      rxSpend: 2900000,
      savings: 847000,
      status: "Due diligence phase",
      statusColor: "text-blue-400",
      trend: 12,
      implementationProgress: 25,
      details: {
        currentPBM: "Regional PBM",
        contractEnd: "Q1 2027",
        avgMemberAge: 45,
        chronicConditions: 31,
        topDrugClasses: ["Specialty", "Pain Management", "Diabetes"]
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-serif font-bold text-white">PE Operator Command Center</h3>
          <p className="text-sm text-neutral-400 mt-1">Portfolio value creation & operational efficiency metrics</p>
        </div>
        <Badge className="bg-[#1A3A52]/20 text-[#B8860B] border border-[#1A3A52]">Portfolio Analytics</Badge>
      </div>

      {/* Portfolio-Level KPIs */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-[#151B23] border border-[#2A3F54] rounded-lg p-5">
          <div className="text-xs font-mono text-neutral-400 mb-1">Portfolio EBITDA Lift</div>
          <div className="text-2xl font-bold text-emerald-400">+$4.8M</div>
          <div className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> Across 3 portcos
          </div>
        </div>
        <div className="bg-[#151B23] border border-[#2A3F54] rounded-lg p-5">
          <div className="text-xs font-mono text-neutral-400 mb-1">Value Creation Multiple</div>
          <div className="text-2xl font-bold text-white">1.8x</div>
          <div className="text-xs text-neutral-400 mt-1">Pharmacy optimization</div>
        </div>
        <div className="bg-[#151B23] border border-[#2A3F54] rounded-lg p-5">
          <div className="text-xs font-mono text-neutral-400 mb-1">Exit Readiness Score</div>
          <div className="text-2xl font-bold text-[#B8860B]">87/100</div>
          <div className="text-xs text-neutral-400 mt-1">Benefits optimization</div>
        </div>
        <div className="bg-[#151B23] border border-[#2A3F54] rounded-lg p-5">
          <div className="text-xs font-mono text-neutral-400 mb-1">Rollup Synergies</div>
          <div className="text-2xl font-bold text-white">$2.1M</div>
          <div className="text-xs text-neutral-400 mt-1">Identified opportunities</div>
        </div>
      </div>

      {/* PortCo Selector Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <button
          onClick={() => setSelectedPortCo("alpha")}
          className={`bg-[#151B23] border rounded-lg p-6 text-left transition-all ${
            selectedPortCo === "alpha" 
              ? "border-[#B8860B] ring-2 ring-[#B8860B]/20" 
              : "border-[#2A3F54] hover:border-[#3A4F64]"
          }`}
        >
          <h4 className="text-sm font-semibold text-white mb-4">PortCo Alpha</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-400">Employees</span>
              <span className="text-sm font-semibold text-white">847</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-400">Rx Spend</span>
              <span className="text-sm font-semibold text-white">$4.2M</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-400">Savings Identified</span>
              <span className="text-sm font-semibold text-emerald-400">$1.2M</span>
            </div>
            <div className="pt-2 border-t border-[#2A3F54]">
              <div className="text-xs text-[#B8860B] font-semibold">Status: Contract negotiation phase</div>
            </div>
          </div>
        </button>

        <button
          onClick={() => setSelectedPortCo("bravo")}
          className={`bg-[#151B23] border rounded-lg p-6 text-left transition-all ${
            selectedPortCo === "bravo" 
              ? "border-emerald-500 ring-2 ring-emerald-500/20" 
              : "border-[#2A3F54] hover:border-[#3A4F64]"
          }`}
        >
          <h4 className="text-sm font-semibold text-white mb-4">PortCo Bravo</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-400">Employees</span>
              <span className="text-sm font-semibold text-white">1,243</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-400">Rx Spend</span>
              <span className="text-sm font-semibold text-white">$6.8M</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-400">Savings Identified</span>
              <span className="text-sm font-semibold text-emerald-400">$2.1M</span>
            </div>
            <div className="pt-2 border-t border-[#2A3F54]">
              <div className="text-xs text-emerald-400 font-semibold">Status: Implementation complete</div>
            </div>
          </div>
        </button>

        <button
          onClick={() => setSelectedPortCo("charlie")}
          className={`bg-[#151B23] border rounded-lg p-6 text-left transition-all ${
            selectedPortCo === "charlie" 
              ? "border-blue-500 ring-2 ring-blue-500/20" 
              : "border-[#2A3F54] hover:border-[#3A4F64]"
          }`}
        >
          <h4 className="text-sm font-semibold text-white mb-4">PortCo Charlie</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-400">Employees</span>
              <span className="text-sm font-semibold text-white">562</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-400">Rx Spend</span>
              <span className="text-sm font-semibold text-white">$2.9M</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-400">Savings Identified</span>
              <span className="text-sm font-semibold text-emerald-400">$847K</span>
            </div>
            <div className="pt-2 border-t border-[#2A3F54]">
              <div className="text-xs text-blue-400 font-semibold">Status: Due diligence phase</div>
            </div>
          </div>
        </button>
      </div>

      {/* PortCo Drill-Down */}
      {selectedPortCo && (
        <div className="bg-[#0C1117] border border-[#1A3A52] rounded-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-semibold text-white">{portCoData[selectedPortCo].name} Deep Dive</h4>
            <Badge className={`border-0 ${
              selectedPortCo === "alpha" ? "bg-[#B8860B]/20 text-[#B8860B]" :
              selectedPortCo === "bravo" ? "bg-emerald-900/20 text-emerald-400" :
              "bg-blue-900/20 text-blue-400"
            }`}>
              {portCoData[selectedPortCo].status}
            </Badge>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-[#151B23] border border-[#2A3F54] rounded p-5">
              <div className="text-sm font-semibold text-white mb-4">Contract Details</div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Current PBM</span>
                  <span className="text-white">{portCoData[selectedPortCo].details.currentPBM}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Contract Expiration</span>
                  <span className="text-white">{portCoData[selectedPortCo].details.contractEnd}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Avg Member Age</span>
                  <span className="text-white">{portCoData[selectedPortCo].details.avgMemberAge} years</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Chronic Conditions</span>
                  <span className="text-white">{portCoData[selectedPortCo].details.chronicConditions}%</span>
                </div>
              </div>
            </div>

            <div className="bg-[#151B23] border border-[#2A3F54] rounded p-5">
              <div className="text-sm font-semibold text-white mb-4">Value Creation Metrics</div>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-neutral-400">Annual Savings</span>
                    <span className="text-emerald-400 font-semibold">
                      ${(portCoData[selectedPortCo].savings / 1000000).toFixed(1)}M
                    </span>
                  </div>
                  <div className="text-xs text-neutral-500">
                    {((portCoData[selectedPortCo].savings / portCoData[selectedPortCo].rxSpend) * 100).toFixed(0)}% reduction in pharmacy spend
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-neutral-400">Trend Improvement</span>
                    <span className="text-white font-semibold">
                      {portCoData[selectedPortCo].trend}% → 3.5%
                    </span>
                  </div>
                  <div className="text-xs text-neutral-500">
                    Predictive stabilization vs industry benchmark
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#151B23] border border-[#2A3F54] rounded p-5 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-semibold text-white">Implementation Progress</div>
              <span className="text-sm font-semibold text-white">
                {portCoData[selectedPortCo].implementationProgress}%
              </span>
            </div>
            <div className="h-3 bg-[#0F1419] rounded overflow-hidden">
              <div 
                className={`h-full ${
                  selectedPortCo === "bravo" ? "bg-emerald-500" :
                  selectedPortCo === "alpha" ? "bg-[#B8860B]" :
                  "bg-blue-500"
                }`}
                style={{ width: `${portCoData[selectedPortCo].implementationProgress}%` }}
              />
            </div>
            <div className="grid md:grid-cols-3 gap-4 mt-4">
              <div className="text-xs">
                <div className="text-neutral-400 mb-1">Phase 1: Analysis</div>
                <div className={selectedPortCo === "charlie" ? "text-blue-400" : "text-emerald-400"}>
                  {selectedPortCo === "charlie" ? "In Progress" : "Complete"}
                </div>
              </div>
              <div className="text-xs">
                <div className="text-neutral-400 mb-1">Phase 2: Contracting</div>
                <div className={selectedPortCo === "bravo" ? "text-emerald-400" : selectedPortCo === "alpha" ? "text-[#B8860B]" : "text-neutral-500"}>
                  {selectedPortCo === "bravo" ? "Complete" : selectedPortCo === "alpha" ? "In Progress" : "Pending"}
                </div>
              </div>
              <div className="text-xs">
                <div className="text-neutral-400 mb-1">Phase 3: Optimization</div>
                <div className={selectedPortCo === "bravo" ? "text-emerald-400" : "text-neutral-500"}>
                  {selectedPortCo === "bravo" ? "Complete" : "Pending"}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#151B23] border border-[#2A3F54] rounded p-5">
            <div className="text-sm font-semibold text-white mb-3">Top Drug Classes</div>
            <div className="flex flex-wrap gap-2">
              {portCoData[selectedPortCo].details.topDrugClasses.map((drugClass, index) => (
                <Badge key={index} className="bg-[#1A3A52]/20 text-neutral-300 border border-[#1A3A52]">
                  {drugClass}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Value Creation Playbook */}
      <div className="bg-[#1A3A52]/10 border border-[#1A3A52] rounded-lg p-6">
        <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-[#B8860B]" />
          Value Creation Playbook Execution
        </h4>
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div>
            <div className="text-xs text-neutral-400 mb-2">Operational Excellence</div>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-[#0F1419] rounded overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: "82%" }} />
              </div>
              <span className="text-xs font-semibold text-white">82%</span>
            </div>
          </div>
          <div>
            <div className="text-xs text-neutral-400 mb-2">Cost Optimization</div>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-[#0F1419] rounded overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: "91%" }} />
              </div>
              <span className="text-xs font-semibold text-white">91%</span>
            </div>
          </div>
          <div>
            <div className="text-xs text-neutral-400 mb-2">Revenue Enhancement</div>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-[#0F1419] rounded overflow-hidden">
                <div className="h-full bg-yellow-500" style={{ width: "67%" }} />
              </div>
              <span className="text-xs font-semibold text-white">67%</span>
            </div>
          </div>
          <div>
            <div className="text-xs text-neutral-400 mb-2">Market Positioning</div>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-[#0F1419] rounded overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: "88%" }} />
              </div>
              <span className="text-xs font-semibold text-white">88%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Synergies */}
      <div className="bg-[#0C1117] border border-[#2A3F54] rounded-lg p-6">
        <h4 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
          <Zap className="w-4 h-4 text-[#B8860B]" />
          Cross-Portfolio Synergy Opportunities
        </h4>
        <div className="space-y-3">
          <div className="bg-[#151B23] border border-[#1A3A52] rounded p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-neutral-300">Consolidated PBM Contracting</span>
              <span className="text-sm font-semibold text-emerald-400">$1.2M potential</span>
            </div>
            <p className="text-xs text-neutral-400">
              Aggregate purchasing power across all three portcos for improved rebates and fee structures
            </p>
          </div>
          <div className="bg-[#151B23] border border-[#1A3A52] rounded p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-neutral-300">Shared Specialty Carve-Out</span>
              <span className="text-sm font-semibold text-emerald-400">$640K potential</span>
            </div>
            <p className="text-xs text-neutral-400">
              Joint specialty pharmacy network access and therapeutic management programs
            </p>
          </div>
          <div className="bg-[#151B23] border border-[#1A3A52] rounded p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-neutral-300">Platform Benefits Administration</span>
              <span className="text-sm font-semibold text-emerald-400">$280K potential</span>
            </div>
            <p className="text-xs text-neutral-400">
              Unified technology platform for member services and clinical program management
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}