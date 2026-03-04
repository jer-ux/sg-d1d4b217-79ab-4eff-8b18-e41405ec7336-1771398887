import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { McKinseyStrategyPanel } from "./McKinseyStrategyPanel";
import { BainLeadershipPanel } from "./BainLeadershipPanel";
import { Building2, Users } from "lucide-react";

interface ConsultingInsightsTabProps {
  laneId?: string;
  eventData?: any;
}

export function ConsultingInsightsTab({ laneId, eventData }: ConsultingInsightsTabProps) {
  return (
    <div className="h-full">
      <Tabs defaultValue="mckinsey" className="h-full">
        <TabsList className="grid w-full grid-cols-2 bg-slate-800/50 border border-slate-700">
          <TabsTrigger 
            value="mckinsey"
            className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400"
          >
            <Building2 className="h-4 w-4 mr-2" />
            McKinsey Strategy
          </TabsTrigger>
          <TabsTrigger 
            value="bain"
            className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
          >
            <Users className="h-4 w-4 mr-2" />
            Bain Leadership
          </TabsTrigger>
        </TabsList>

        <div className="mt-6 h-[calc(100%-4rem)] overflow-y-auto">
          <TabsContent value="mckinsey" className="mt-0">
            <McKinseyStrategyPanel laneId={laneId} eventData={eventData} />
          </TabsContent>

          <TabsContent value="bain" className="mt-0">
            <BainLeadershipPanel laneId={laneId} eventData={eventData} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}