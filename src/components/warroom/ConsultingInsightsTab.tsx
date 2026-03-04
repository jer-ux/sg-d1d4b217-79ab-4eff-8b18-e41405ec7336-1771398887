import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Target, TrendingUp, Shield, FileText, Calendar, Brain
} from "lucide-react";
import { McKinseyStrategyPanel } from "./McKinseyStrategyPanel";
import { BainLeadershipPanel } from "./BainLeadershipPanel";
import { BCGMatrixPanel } from "./BCGMatrixPanel";
import { PorterFiveForcesPanel } from "./PorterFiveForcesPanel";
import { ExecutiveReportGenerator } from "./ExecutiveReportGenerator";
import { StrategySessionMode } from "./StrategySessionMode";

export function ConsultingInsightsTab() {
  return (
    <div className="w-full">
      <Tabs defaultValue="mckinsey" className="w-full">
        <TabsList className="grid w-full grid-cols-6 bg-white/5 mb-8">
          <TabsTrigger 
            value="mckinsey" 
            className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300"
          >
            <Target className="w-4 h-4 mr-2" />
            McKinsey 7S
          </TabsTrigger>
          <TabsTrigger 
            value="bain" 
            className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-300"
          >
            <Brain className="w-4 h-4 mr-2" />
            Bain RAPID
          </TabsTrigger>
          <TabsTrigger 
            value="bcg" 
            className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-300"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            BCG Matrix
          </TabsTrigger>
          <TabsTrigger 
            value="porter" 
            className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-300"
          >
            <Shield className="w-4 h-4 mr-2" />
            Porter's 5 Forces
          </TabsTrigger>
          <TabsTrigger 
            value="reports" 
            className="data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-300"
          >
            <FileText className="w-4 h-4 mr-2" />
            Reports
          </TabsTrigger>
          <TabsTrigger 
            value="strategy" 
            className="data-[state=active]:bg-pink-500/20 data-[state=active]:text-pink-300"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Strategy Session
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="mckinsey" className="mt-0">
            <McKinseyStrategyPanel />
          </TabsContent>

          <TabsContent value="bain" className="mt-0">
            <BainLeadershipPanel />
          </TabsContent>

          <TabsContent value="bcg" className="mt-0">
            <BCGMatrixPanel />
          </TabsContent>

          <TabsContent value="porter" className="mt-0">
            <PorterFiveForcesPanel />
          </TabsContent>

          <TabsContent value="reports" className="mt-0">
            <ExecutiveReportGenerator />
          </TabsContent>

          <TabsContent value="strategy" className="mt-0">
            <StrategySessionMode />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}