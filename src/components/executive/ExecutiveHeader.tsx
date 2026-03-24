import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  Settings, 
  Download, 
  Share2, 
  Filter,
  Brain,
  Activity
} from "lucide-react";

interface ExecutiveHeaderProps {
  timeframe: "24h" | "7d" | "30d" | "90d";
  onTimeframeChange: (timeframe: "24h" | "7d" | "30d" | "90d") => void;
}

export function ExecutiveHeader({ timeframe, onTimeframeChange }: ExecutiveHeaderProps) {
  return (
    <div className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-[1800px] mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              Executive Command Center
            </h1>
            <p className="text-slate-400 text-sm flex items-center gap-2">
              <Activity className="w-4 h-4 text-green-500" />
              Real-time strategic intelligence • AI-powered insights • Last updated: {new Date().toLocaleTimeString()}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Timeframe Selector */}
            <div className="flex bg-slate-900 rounded-lg p-1">
              {(["24h", "7d", "30d", "90d"] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => onTimeframeChange(tf)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    timeframe === tf
                      ? "bg-blue-600 text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>

            <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>

            <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>

            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Share2 className="w-4 h-4 mr-2" />
              Share Board Report
            </Button>

            <Button variant="ghost" className="text-slate-400 hover:text-white relative">
              <Bell className="w-5 h-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
                3
              </Badge>
            </Button>

            <Button variant="ghost" className="text-slate-400 hover:text-white">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}