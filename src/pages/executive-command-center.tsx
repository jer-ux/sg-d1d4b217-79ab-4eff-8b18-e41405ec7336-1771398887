import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Presentation
} from "lucide-react";
import { SEO } from "@/components/SEO";

// Import new executive components
import { ExecutiveHeader } from "@/components/executive/ExecutiveHeader";
import { ExecutiveDashboard } from "@/components/executive/ExecutiveDashboard";
import { ExecutiveAnalytics } from "@/components/executive/ExecutiveAnalytics";
import { BoardReportGenerator } from "@/components/executive/BoardReportGenerator";
import { StrategicDecisionEngine } from "@/components/executive/StrategicDecisionEngine";
import { RealTimeIntelligenceFeed } from "@/components/executive/RealTimeIntelligenceFeed";
import { ExecutiveSecurityPanel } from "@/components/executive/ExecutiveSecurityPanel";

export default function ExecutiveCommandCenter() {
  const [activeView, setActiveView] = useState<"overview" | "strategic" | "board" | "security">("overview");
  const [timeframe, setTimeframe] = useState<"24h" | "7d" | "30d" | "90d">("30d");

  return (
    <>
      <SEO 
        title="Executive Command Center - Strategic Intelligence Dashboard"
        description="Real-time executive dashboard with AI-powered strategic insights, market intelligence, and decision support"
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pb-20">
        <ExecutiveHeader timeframe={timeframe} onTimeframeChange={setTimeframe} />

        {/* Main Content */}
        <div className="max-w-[1800px] mx-auto px-8 py-8">
          
          {/* Navigation Tabs */}
          <div className="flex gap-2 mb-8 bg-slate-900/50 p-2 rounded-xl border border-slate-800 w-fit">
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
              <div className="grid grid-cols-3 gap-8">
                <div className="col-span-2 space-y-8">
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
          </div>
        </div>
      </div>
    </>
  );
}