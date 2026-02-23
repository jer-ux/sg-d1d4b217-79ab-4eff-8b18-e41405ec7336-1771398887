import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { 
  TrendingDown, 
  TrendingUp, 
  Clock, 
  DollarSign, 
  Users, 
  FileText,
  AlertTriangle,
  ChevronRight
} from "lucide-react";
import type { ArbitrageEvent } from "@/lib/arbitrage/mockArbitrageEvents";

interface ArbitrageDeepAnalysisProps {
  event: ArbitrageEvent | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onInvestigationClick: () => void;
}

export function ArbitrageDeepAnalysis({ 
  event, 
  open, 
  onOpenChange,
  onInvestigationClick 
}: ArbitrageDeepAnalysisProps) {
  if (!event) return null;

  const mockClaimsBreakdown = [
    { provider: "ABC Medical Center", claims: 145, amount: 245000, variance: 15.2 },
    { provider: "XYZ Pharmacy", claims: 89, amount: 123000, variance: 22.1 },
    { provider: "Healthcare Plus", claims: 67, amount: 98000, variance: 8.7 },
    { provider: "Quick Care Clinic", claims: 53, amount: 67000, variance: 31.4 },
  ];

  const mockTimeline = [
    { date: "2024-01-15", event: "Initial pattern detected", severity: "low" },
    { date: "2024-01-28", event: "Volume spike observed", severity: "medium" },
    { date: "2024-02-10", event: "Threshold breach confirmed", severity: "high" },
    { date: "2024-02-15", event: "Automated alert triggered", severity: "critical" },
  ];

  const mockImpactAnalysis = {
    currentQuarter: 533000,
    projectedAnnual: 2132000,
    historicalComparison: -18.5,
    memberImpact: 342,
    providerCount: 4,
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-red-400" />
            Deep Analysis: {event.title}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="financial" className="mt-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="financial">Financial Impact</TabsTrigger>
            <TabsTrigger value="claims">Claims Breakdown</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="patterns">Patterns</TabsTrigger>
          </TabsList>

          {/* Financial Impact Tab */}
          <TabsContent value="financial" className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <Card className="p-4 bg-black/20 border-white/10">
                <div className="text-sm text-muted-foreground mb-2">Current Quarter Impact</div>
                <div className="text-2xl font-bold text-red-400">
                  -${mockImpactAnalysis.currentQuarter.toLocaleString()}
                </div>
              </Card>
              <Card className="p-4 bg-black/20 border-white/10">
                <div className="text-sm text-muted-foreground mb-2">Projected Annual</div>
                <div className="text-2xl font-bold text-red-400">
                  -${mockImpactAnalysis.projectedAnnual.toLocaleString()}
                </div>
              </Card>
              <Card className="p-4 bg-black/20 border-white/10">
                <div className="text-sm text-muted-foreground mb-2">vs. Historical Avg</div>
                <div className="text-2xl font-bold text-red-400">
                  {mockImpactAnalysis.historicalComparison}%
                </div>
              </Card>
            </div>

            <Card className="p-6 bg-black/20 border-white/10">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-400" />
                Cost Breakdown by Category
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Inappropriate Utilization</span>
                  <div className="flex items-center gap-3">
                    <div className="w-48 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-red-400" style={{ width: "65%" }} />
                    </div>
                    <span className="font-mono">$346,450</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Billing Errors</span>
                  <div className="flex items-center gap-3">
                    <div className="w-48 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-orange-400" style={{ width: "25%" }} />
                    </div>
                    <span className="font-mono">$133,250</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Documentation Issues</span>
                  <div className="flex items-center gap-3">
                    <div className="w-48 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-400" style={{ width: "10%" }} />
                    </div>
                    <span className="font-mono">$53,300</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-black/20 border-white/10">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-400" />
                Member & Provider Impact
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl font-bold mb-2">{mockImpactAnalysis.memberImpact}</div>
                  <div className="text-sm text-muted-foreground">Members Affected</div>
                  <div className="text-xs text-muted-foreground mt-1">Avg cost per member: $1,559</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">{mockImpactAnalysis.providerCount}</div>
                  <div className="text-sm text-muted-foreground">Providers Involved</div>
                  <div className="text-xs text-muted-foreground mt-1">High concentration risk detected</div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Claims Breakdown Tab */}
          <TabsContent value="claims" className="space-y-4">
            <Card className="p-6 bg-black/20 border-white/10">
              <h3 className="font-semibold mb-4">Top Providers by Impact</h3>
              <div className="space-y-3">
                {mockClaimsBreakdown.map((provider, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="font-medium">{provider.provider}</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {provider.claims} claims affected
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-semibold text-red-400">
                        ${provider.amount.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {provider.variance}% variance
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-black/20 border-white/10">
              <h3 className="font-semibold mb-4">Claim Type Distribution</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Inpatient Services</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-400" style={{ width: "45%" }} />
                    </div>
                    <span className="text-sm font-mono">45%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Outpatient Services</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-green-400" style={{ width: "30%" }} />
                    </div>
                    <span className="text-sm font-mono">30%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Pharmacy</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-400" style={{ width: "15%" }} />
                    </div>
                    <span className="text-sm font-mono">15%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Other</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gray-400" style={{ width: "10%" }} />
                    </div>
                    <span className="text-sm font-mono">10%</span>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Timeline Tab */}
          <TabsContent value="timeline" className="space-y-4">
            <Card className="p-6 bg-black/20 border-white/10">
              <h3 className="font-semibold mb-6">Event Progression Timeline</h3>
              <div className="space-y-4">
                {mockTimeline.map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full ${
                        item.severity === 'critical' ? 'bg-red-500' :
                        item.severity === 'high' ? 'bg-orange-500' :
                        item.severity === 'medium' ? 'bg-yellow-500' :
                        'bg-blue-500'
                      }`} />
                      {idx < mockTimeline.length - 1 && (
                        <div className="w-0.5 h-12 bg-white/10 my-2" />
                      )}
                    </div>
                    <div className="flex-1 pb-8">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">{item.event}</span>
                        <Badge variant="outline" className="text-xs">
                          {item.severity}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(item.date).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Patterns Tab */}
          <TabsContent value="patterns" className="space-y-4">
            <Card className="p-6 bg-black/20 border-white/10">
              <h3 className="font-semibold mb-4">Detected Patterns</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-lg border border-red-500/20 bg-red-500/5">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5" />
                    <div>
                      <div className="font-medium mb-1">Unusual Volume Spike</div>
                      <div className="text-sm text-muted-foreground">
                        Claims volume increased 340% above historical baseline in a 2-week period
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-lg border border-orange-500/20 bg-orange-500/5">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="h-5 w-5 text-orange-400 mt-0.5" />
                    <div>
                      <div className="font-medium mb-1">Cost Per Claim Anomaly</div>
                      <div className="text-sm text-muted-foreground">
                        Average claim cost 285% higher than category benchmark
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-lg border border-yellow-500/20 bg-yellow-500/5">
                  <div className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-yellow-400 mt-0.5" />
                    <div>
                      <div className="font-medium mb-1">Coding Inconsistency</div>
                      <div className="text-sm text-muted-foreground">
                        High variance in procedure codes across similar diagnoses
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-black/20 border-white/10">
              <h3 className="font-semibold mb-4">Similar Historical Events</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between p-2 rounded hover:bg-white/5">
                  <span>Q3 2023 - Provider Billing Irregularity</span>
                  <span className="text-muted-foreground">78% similarity</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded hover:bg-white/5">
                  <span>Q1 2023 - Volume Spike Investigation</span>
                  <span className="text-muted-foreground">65% similarity</span>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex gap-3 pt-6 border-t">
          <Button 
            onClick={onInvestigationClick}
            className="flex-1"
          >
            Open Full Investigation Workspace
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}