import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuditState } from "@/contexts/AuditStateContext";
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle2, 
  DollarSign,
  Users,
  FileText,
  Target,
  Zap,
  Brain,
  ChevronRight,
  Download,
  Share2,
  Settings,
  Bell,
  Search,
  Filter,
  BarChart3,
  PieChart,
  LineChart,
  Activity,
  Shield,
  Globe,
  Calendar,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Eye,
  ThumbsUp,
  MessageSquare,
  Presentation,
  ShieldAlert,
  FolderLock,
  ListCheck
} from "lucide-react";
import { SEO } from "@/components/SEO";
import { EngineStatusIndicator } from "@/components/EngineStatusIndicator";

// Import new executive components
import { ExecutiveHeader } from "@/components/executive/ExecutiveHeader";
import { ExecutiveDashboard } from "@/components/executive/ExecutiveDashboard";
import { ExecutiveAnalytics } from "@/components/executive/ExecutiveAnalytics";
import { BoardReportGenerator } from "@/components/executive/BoardReportGenerator";
import { StrategicDecisionEngine } from "@/components/executive/StrategicDecisionEngine";
import { RealTimeIntelligenceFeed } from "@/components/executive/RealTimeIntelligenceFeed";
import { ExecutiveSecurityPanel } from "@/components/executive/ExecutiveSecurityPanel";
import Nav from "@/components/Nav";

export default function ExecutiveCommandCenter() {
  const [activeView, setActiveView] = useState<"overview" | "strategic" | "board" | "security" | "audits">("overview");
  const [timeframe, setTimeframe] = useState<"24h" | "7d" | "30d" | "90d">("30d");

  const { audits, checkedItems, toggleItem, resetAll, selectPreset, getCalculations } = useAuditState();
  const stats = getCalculations();

  return (
    <>
      <SEO 
        title="Executive Command Center - Strategic Intelligence Dashboard"
        description="Real-time executive dashboard with AI-powered strategic insights, market intelligence, and decision support"
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pb-20 text-white">
        <ExecutiveHeader timeframe={timeframe} onTimeframeChange={setTimeframe} />
        <EngineStatusIndicator />

        {/* Main Content */}
        <div className="max-w-[1800px] mx-auto px-8 py-8">
          
          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 bg-slate-900/50 p-2 rounded-xl border border-slate-800 w-fit">
            <button
              onClick={() => setActiveView("overview")}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                activeView === "overview"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Activity className="w-4 h-4" />
              Command Center
            </button>
            <button
              onClick={() => setActiveView("audits")}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                activeView === "audits"
                  ? "bg-pink-600 text-white shadow-lg"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              Persona Audits Hub
              {stats.erisaCriticalRisks > 0 && (
                <Badge variant="destructive" className="ml-1 bg-red-500 animate-pulse text-[10px] px-1.5 py-0">
                  {stats.erisaCriticalRisks}
                </Badge>
              )}
            </button>
            <button
              onClick={() => setActiveView("strategic")}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                activeView === "strategic"
                  ? "bg-purple-600 text-white shadow-lg"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Target className="w-4 h-4" />
              Strategic Intelligence
            </button>
            <button
              onClick={() => setActiveView("board")}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                activeView === "board"
                  ? "bg-emerald-600 text-white shadow-lg"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Presentation className="w-4 h-4" />
              Board Reporting
            </button>
            <button
              onClick={() => setActiveView("security")}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                activeView === "security"
                  ? "bg-orange-600 text-white shadow-lg"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Shield className="w-4 h-4" />
              Executive Security
            </button>
          </div>

          {/* View Content */}
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {activeView === "overview" && (
              <>
                <ExecutiveDashboard />
                <ExecutiveAnalytics />
              </>
            )}

            {activeView === "strategic" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <StrategicDecisionEngine />
                </div>
                <div className="space-y-8">
                  <RealTimeIntelligenceFeed />
                </div>
              </div>
            )}

            {activeView === "board" && (
              <div className="max-w-5xl mx-auto">
                <BoardReportGenerator />
              </div>
            )}

            {activeView === "security" && (
              <div className="max-w-4xl mx-auto">
                <ExecutiveSecurityPanel />
              </div>
            )}

            {activeView === "audits" && (
              <div className="space-y-8">
                {/* Executive Findings Header banner */}
                <div className="bg-gradient-to-r from-slate-900 via-pink-950/20 to-slate-900 border border-pink-500/20 rounded-2xl p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl" />
                  <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Badge className="bg-pink-500/20 text-pink-300 border-pink-500/30">Fiduciary Control Center</Badge>
                        <span className="text-slate-400 text-sm">•</span>
                        <span className="text-slate-400 text-sm flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Updated Real-time</span>
                      </div>
                      <h2 className="text-3xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-pink-200">
                        Aggregated Persona Audits Hub
                      </h2>
                      <p className="text-slate-300 max-w-3xl text-sm leading-relaxed">
                        This unified dashboard aggregates self-audits and threat checklists filled across your organization's different business units. Standardized via global state management, these scores represent your exact exposure under modern ERISA and CAA 2021 mandates.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" variant="outline" className="border-slate-800 text-slate-300 hover:bg-slate-800" onClick={() => selectPreset("high_risk")}>
                        Set High Risk (Baseline)
                      </Button>
                      <Button size="sm" variant="outline" className="border-slate-800 text-slate-300 hover:bg-slate-800" onClick={() => selectPreset("medium_risk")}>
                        Set Medium Risk
                      </Button>
                      <Button size="sm" variant="outline" className="border-slate-800 text-slate-300 hover:bg-slate-800" onClick={() => selectPreset("fully_optimized")}>
                        Set Optimized
                      </Button>
                      <Button size="sm" variant="destructive" className="bg-red-950/40 text-red-300 border border-red-800/40 hover:bg-red-900/40" onClick={resetAll}>
                        Clear Audits
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Key Aggregated Metrics */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="bg-slate-900/60 border-slate-800 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Identified Risk Exposure</span>
                        <div className="p-1.5 bg-red-500/10 text-red-400 rounded-lg"><AlertTriangle className="w-4 h-4" /></div>
                      </div>
                      <div className="text-3xl font-black text-red-400 mb-1">
                        ${stats.totalProjectedLeakage.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </div>
                      <p className="text-xs text-slate-400">Total projected yearly financial & rebate leakage</p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs">
                      <span className="text-slate-400">Remediation rate:</span>
                      <span className="font-semibold text-slate-200">{stats.completionPercent}% Checked</span>
                    </div>
                  </Card>

                  <Card className="bg-slate-900/60 border-slate-800 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">SiriusB Savings Potential</span>
                        <div className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg"><DollarSign className="w-4 h-4" /></div>
                      </div>
                      <div className="text-3xl font-black text-emerald-400 mb-1">
                        ${stats.unlockedSavingsPotential.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </div>
                      <p className="text-xs text-slate-400">Recoverable value via strategic playbook overrides</p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs">
                      <span className="text-slate-400">Average Audit Score:</span>
                      <span className="font-semibold text-emerald-400">{stats.averageScore}/100</span>
                    </div>
                  </Card>

                  <Card className="bg-slate-900/60 border-slate-800 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Critical ERISA / Fiduciary Gaps</span>
                        <div className="p-1.5 bg-orange-500/10 text-orange-400 rounded-lg"><ShieldAlert className="w-4 h-4" /></div>
                      </div>
                      <div className="text-3xl font-black text-orange-400 mb-1">
                        {stats.erisaCriticalRisks}
                      </div>
                      <p className="text-xs text-slate-400">High-priority compliance or transparency gaps</p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs">
                      <span className="text-slate-400">Total Fiduciary Checks:</span>
                      <span className="font-semibold text-slate-200">{stats.totalChecked} / {stats.totalPossible} Done</span>
                    </div>
                  </Card>

                  <Card className="bg-slate-900/60 border-slate-800 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Global Scorecard Progress</span>
                        <div className="p-1.5 bg-blue-500/10 text-blue-400 rounded-lg"><ListCheck className="w-4 h-4" /></div>
                      </div>
                      <div className="space-y-2 mt-1">
                        <div className="flex items-end justify-between">
                          <span className="text-2xl font-black text-slate-100">{stats.completionPercent}%</span>
                          <span className="text-xs text-slate-400">Completion</span>
                        </div>
                        <Progress value={stats.completionPercent} className="h-2 bg-slate-800" />
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs">
                      <span className="text-slate-400">Risk Assessment Posture:</span>
                      <span className={`font-semibold ${
                        stats.averageScore < 40 ? "text-red-400" : stats.averageScore < 80 ? "text-orange-400" : "text-emerald-400"
                      }`}>
                        {stats.averageScore < 40 ? "High Risk Exposure" : stats.averageScore < 80 ? "Moderate Exposure" : "Fiduciary Bulletproof"}
                      </span>
                    </div>
                  </Card>
                </div>

                {/* Main Audits Breakdown & Remediation Pathways */}
                <div className="grid lg:grid-cols-3 gap-8">
                  
                  {/* Persona Summaries Column */}
                  <div className="lg:col-span-2 space-y-6">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <FolderLock className="w-5 h-5 text-pink-400" />
                      Sub-Audit Progress & Exposures
                    </h3>

                    <div className="grid gap-6">
                      {Object.keys(audits).map(pId => {
                        const persona = audits[pId];
                        const checked = checkedItems[pId] || [];
                        const score = Math.round((checked.length / persona.items.length) * 100);
                        const leakage = persona.items
                          .filter(item => !checked.includes(item.id))
                          .reduce((sum, item) => sum + item.weight * persona.riskWeight * 0.15, 0);

                        return (
                          <Card key={pId} className="bg-slate-900/40 border-slate-800 p-6 hover:border-pink-500/30 transition-all">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                              <div>
                                <h4 className="text-lg font-black text-slate-100">{persona.name}</h4>
                                <p className="text-xs text-slate-400">{persona.title}</p>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="text-right">
                                  <span className="text-xs text-slate-400 block">Unit Leakage</span>
                                  <span className={`text-sm font-bold ${leakage > 0 ? "text-red-400" : "text-emerald-400"}`}>
                                    {leakage > 0 ? `$${leakage.toLocaleString(undefined, { maximumFractionDigits: 0 })}` : "Fully Mitigated"}
                                  </span>
                                </div>
                                <div className="text-right border-l border-slate-800 pl-4">
                                  <span className="text-xs text-slate-400 block">Checked</span>
                                  <span className="text-sm font-bold text-slate-200">{checked.length} / {persona.items.length}</span>
                                </div>
                                <div className="text-right border-l border-slate-800 pl-4">
                                  <span className="text-xs text-slate-400 block">Score</span>
                                  <span className={`text-sm font-bold ${score < 50 ? "text-red-400" : score < 100 ? "text-orange-400" : "text-emerald-400"}`}>
                                    {score}%
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Checklist Toggle Area inside centralized view */}
                            <div className="border-t border-slate-800/60 pt-4">
                              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Threat & Fiduciary Controls</h5>
                              <div className="space-y-2">
                                {persona.items.map(item => {
                                  const isChecked = checked.includes(item.id);
                                  return (
                                    <div 
                                      key={item.id} 
                                      onClick={() => toggleItem(pId, item.id)}
                                      className={`flex items-start gap-3 p-2.5 rounded-lg border text-xs cursor-pointer transition-all ${
                                        isChecked 
                                          ? "bg-emerald-950/20 border-emerald-800/40 text-slate-200" 
                                          : "bg-slate-950/40 border-slate-800/80 text-slate-400 hover:bg-slate-800/20"
                                      }`}
                                    >
                                      <input 
                                        type="checkbox" 
                                        checked={isChecked} 
                                        readOnly 
                                        className="mt-0.5 rounded border-slate-700 bg-slate-900 text-pink-600 focus:ring-pink-500"
                                      />
                                      <div className="flex-1">
                                        <div className="flex items-center justify-between mb-0.5">
                                          <span className="font-semibold text-slate-300">{item.category}</span>
                                          <Badge className={`text-[10px] px-1.5 py-0 ${
                                            item.weight >= 9 ? "bg-red-500/10 text-red-400 border-red-500/20" : "bg-slate-800 text-slate-300 border-slate-700"
                                          }`}>
                                            Weight {item.weight}
                                          </Badge>
                                        </div>
                                        <p className="leading-relaxed">{item.text}</p>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </Card>
                        );
                      })}
                    </div>
                  </div>

                  {/* Aggregated Actionable Remediation pathways */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <Zap className="w-5 h-5 text-emerald-400" />
                      Remediation Playbook
                    </h3>

                    <Card className="bg-slate-900/40 border-slate-800 p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Brain className="w-5 h-5 text-pink-400" />
                        <h4 className="font-black text-slate-100">AI Priority Action Items</h4>
                      </div>

                      <div className="space-y-4">
                        {/* Gather unchecked highest weight items across all personas to prioritize */}
                        {(() => {
                          const uncheckedItemsList: { personaName: string; item: any }[] = [];
                          Object.keys(audits).forEach(pId => {
                            const persona = audits[pId];
                            const checked = checkedItems[pId] || [];
                            persona.items.forEach(item => {
                              if (!checked.includes(item.id)) {
                                uncheckedItemsList.push({ personaName: persona.name, item });
                              }
                            });
                          });

                          // Sort by weight descending
                          const priorities = uncheckedItemsList.sort((a, b) => b.item.weight - a.item.weight).slice(0, 5);

                          if (priorities.length === 0) {
                            return (
                              <div className="text-center py-8 text-slate-400">
                                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                                <p className="font-bold text-slate-200">System Bulletproof</p>
                                <p className="text-xs mt-1">All audit items and fiduciary-grade controls are fully validated!</p>
                              </div>
                            );
                          }

                          return priorities.map(({ personaName, item }, idx) => (
                            <div key={idx} className="border-l-2 border-pink-500 pl-4 py-1 space-y-1.5">
                              <div className="flex items-center justify-between text-xs">
                                <span className="font-bold text-pink-400">{personaName}</span>
                                <Badge variant="destructive" className="bg-red-500/10 text-red-400 border-red-500/20 text-[10px]">
                                  Critical Level {item.weight}
                                </Badge>
                              </div>
                              <p className="text-xs text-slate-300 font-medium leading-relaxed">
                                {item.text}
                              </p>
                              <div className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-2.5 text-xs text-emerald-400 flex items-start gap-2">
                                <Zap className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                                <div>
                                  <span className="font-bold block mb-0.5">Recommended Remediation:</span>
                                  {item.remediation}
                                </div>
                              </div>
                            </div>
                          ));
                        })()}
                      </div>
                    </Card>

                    {/* PDF Export Card */}
                    <Card className="bg-gradient-to-br from-slate-900 to-pink-950/10 border-slate-800 p-6">
                      <h4 className="font-bold text-slate-200 mb-2">Export Audit Findings</h4>
                      <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                        Export an aggregated executive summary containing all checked items, calculated scores, projected PBM leakage, and remediation pathways for the Board of Directors or investment committee.
                      </p>
                      <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white text-xs py-5">
                        <Download className="w-4 h-4 mr-2" />
                        Generate Consolidated Report
                      </Button>
                    </Card>
                  </div>

                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}