import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  BarChart3,
  TrendingUp,
  Target,
  DollarSign,
  Activity
} from "lucide-react";

export function ExecutiveAnalytics() {
  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Savings Trend */}
      <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm col-span-2">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <LineChart className="w-5 h-5 text-blue-500" />
              Savings Trend
            </h3>
            <Badge variant="outline" className="border-green-500/30 text-green-500">
              +28% vs Last Quarter
            </Badge>
          </div>

          <div className="h-64 flex items-end gap-2">
            {[
              { month: "Jan", value: 65, label: "$2.1M" },
              { month: "Feb", value: 78, label: "$2.5M" },
              { month: "Mar", value: 82, label: "$2.7M" },
              { month: "Apr", value: 88, label: "$2.9M" },
              { month: "May", value: 92, label: "$3.0M" },
              { month: "Jun", value: 100, label: "$3.3M" }
            ].map((item) => (
              <div key={item.month} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg hover:from-blue-500 hover:to-blue-300 transition-all cursor-pointer group relative" style={{ height: `${item.value}%` }}>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-slate-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      {item.label}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-2">{item.month}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Top Opportunities */}
      <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
        <div className="p-6">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-500" />
            Top Opportunities
          </h3>

          <div className="space-y-4">
            {[
              { name: "PBM Spread Pricing", value: "$480K", priority: "high" },
              { name: "Rebate Optimization", value: "$360K", priority: "high" },
              { name: "Network Savings", value: "$240K", priority: "medium" },
              { name: "Claims Efficiency", value: "$180K", priority: "medium" },
              { name: "Admin Fee Reduction", value: "$120K", priority: "low" }
            ].map((opportunity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center text-green-500 font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{opportunity.name}</p>
                    <Badge 
                      variant="outline" 
                      className={`text-xs mt-1 ${
                        opportunity.priority === "high" 
                          ? "border-red-500/30 text-red-500" 
                          : opportunity.priority === "medium"
                          ? "border-orange-500/30 text-orange-500"
                          : "border-yellow-500/30 text-yellow-500"
                      }`}
                    >
                      {opportunity.priority}
                    </Badge>
                  </div>
                </div>
                <p className="text-lg font-bold text-green-500">{opportunity.value}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}