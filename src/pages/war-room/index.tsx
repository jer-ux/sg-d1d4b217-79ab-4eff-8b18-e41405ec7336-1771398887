import { SEO } from "@/components/SEO";
import { SplitPane } from "@/components/SplitPane";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useState, useMemo } from "react";
import { TrendingUp, TrendingDown, Minus, AlertCircle, CheckCircle, Clock, DollarSign, Activity, Shield, Zap, Users, BarChart3, FileText, ArrowRight, X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockWarRoomData } from "@/lib/mocks/mockWarRoom";
import { EventDetailDrawer } from "@/components/warroom/EventDetailDrawer";
import type { WarEvent, LaneKey, EvidenceReceipt } from "@/lib/warroom/types";

type ViewMode = "FOUR_LANE_LEDGER" | "RANKED_EVENTS";

type KPIMetric = {
  label: string;
  value: string | number;
  delta?: string | number;
  delta_pct?: number;
  status?: "HEALTHY" | "WARNING" | "CRITICAL";
  trend?: "up" | "down" | "stable";
  details?: string;
};

type KPILevel1Data = {
  metric: KPIMetric;
  methodology: string;
  dataSource: string;
  freshnessMinutes: number;
  confidenceScore: number;
  relatedEvents: WarEvent[];
  breakdownMetrics: KPIMetric[];
  evidenceReceipts: EvidenceReceipt[];
};

type KPILevel2Data = {
  parentMetric: string;
  subMetric: KPIMetric;
  calculation: string;
  detailedBreakdown: {
    component: string;
    value: string;
    contribution: string;
  }[];
  relatedEvents: WarEvent[];
  evidenceReceipts: EvidenceReceipt[];
};

export default function WarRoomV1() {
  const [currentView, setCurrentView] = useState<ViewMode>("FOUR_LANE_LEDGER");
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [level1Modal, setLevel1Modal] = useState<{ open: boolean; data: KPILevel1Data | null }>({ open: false, data: null });
  const [level2Modal, setLevel2Modal] = useState<{ open: boolean; data: KPILevel2Data | null }>({ open: false, data: null });

  const handleKPIClick = (kpi: KPIMetric) => {
    const level1Data = generateLevel1Data(kpi);
    setLevel1Modal({ open: true, data: level1Data });
  };

  const handleLevel2Click = (parentMetric: string, subMetric: KPIMetric, level1Data: KPILevel1Data) => {
    const level2Data = generateLevel2Data(parentMetric, subMetric, level1Data);
    setLevel2Modal({ open: true, data: level2Data });
  };

  const handleEventClick = (event: WarEvent) => {
    setSelectedEventId(event.id);
  };

  const generateLevel1Data = (kpi: KPIMetric): KPILevel1Data => {
    // Generate related events based on KPI context
    const relatedEvents = mockWarRoomData.events.filter(e => {
      if (kpi.label.includes("Arbitrage")) return e.type === "ARBITRAGE";
      if (kpi.label.includes("DQ")) return e.type === "DQ";
      if (kpi.label.includes("Policy")) return e.type === "POLICY";
      if (kpi.label.includes("Rebate")) return e.lane === "marketplace";
      return e.confidence > 0.85;
    }).slice(0, 5);

    // Generate breakdown metrics
    const breakdownMetrics: KPIMetric[] = [];
    if (kpi.label.includes("Arbitrage")) {
      breakdownMetrics.push(
        { label: "Anthem Opportunities", value: "$780K", delta_pct: 12, trend: "up", status: "HEALTHY" },
        { label: "UHC Network Issues", value: "$540K", delta_pct: 8, trend: "up", status: "HEALTHY" },
        { label: "Cigna Rebate Gaps", value: "$610K", delta_pct: -5, trend: "down", status: "WARNING" },
        { label: "Express Scripts MAC", value: "$1.1M", delta_pct: 15, trend: "up", status: "HEALTHY" }
      );
    } else if (kpi.label.includes("DQ")) {
      breakdownMetrics.push(
        { label: "Member Records", value: "94.2%", delta_pct: 2.1, trend: "up", status: "HEALTHY" },
        { label: "Claims Data", value: "96.8%", delta_pct: 1.5, trend: "up", status: "HEALTHY" },
        { label: "Provider Network", value: "89.3%", delta_pct: -1.2, trend: "down", status: "WARNING" },
        { label: "Pharmacy Files", value: "97.1%", delta_pct: 3.4, trend: "up", status: "HEALTHY" }
      );
    } else if (kpi.label.includes("Forecast")) {
      breakdownMetrics.push(
        { label: "Medical Claims", value: "8.2", delta: "+1.1", trend: "up", status: "HEALTHY" },
        { label: "Pharmacy Costs", value: "9.1", delta: "+0.8", trend: "up", status: "HEALTHY" },
        { label: "Admin Expenses", value: "7.9", delta: "+0.3", trend: "up", status: "HEALTHY" },
        { label: "Stop-Loss", value: "8.5", delta: "-0.2", trend: "down", status: "WARNING" }
      );
    } else {
      breakdownMetrics.push(
        { label: "Primary Component", value: "92%", delta_pct: 3, trend: "up", status: "HEALTHY" },
        { label: "Secondary Component", value: "88%", delta_pct: -2, trend: "down", status: "WARNING" },
        { label: "Tertiary Component", value: "95%", delta_pct: 5, trend: "up", status: "HEALTHY" }
      );
    }

    return {
      metric: kpi,
      methodology: getMethodology(kpi.label),
      dataSource: getDataSource(kpi.label),
      freshnessMinutes: Math.floor(Math.random() * 180) + 30,
      confidenceScore: 0.85 + Math.random() * 0.14,
      relatedEvents,
      breakdownMetrics,
      evidenceReceipts: relatedEvents.flatMap(e => e.receipts || []).slice(0, 3)
    };
  };

  const generateLevel2Data = (parentMetric: string, subMetric: KPIMetric, level1Data: KPILevel1Data): KPILevel2Data => {
    const detailedBreakdown = [];
    if (subMetric.label.includes("Anthem")) {
      detailedBreakdown.push(
        { component: "Admin Fee Variance", value: "$480K", contribution: "61.5%" },
        { component: "Network Steering Spread", value: "$220K", contribution: "28.2%" },
        { component: "Undisclosed Rebate Gap", value: "$80K", contribution: "10.3%" }
      );
    } else if (subMetric.label.includes("Member")) {
      detailedBreakdown.push(
        { component: "Duplicate IDs", value: "347 records", contribution: "42%" },
        { component: "Missing Demographics", value: "218 records", contribution: "26%" },
        { component: "Invalid Addresses", value: "165 records", contribution: "20%" },
        { component: "Date Inconsistencies", value: "98 records", contribution: "12%" }
      );
    } else {
      detailedBreakdown.push(
        { component: "Component A", value: "65%", contribution: "45%" },
        { component: "Component B", value: "25%", contribution: "30%" },
        { component: "Component C", value: "10%", contribution: "25%" }
      );
    }

    return {
      parentMetric,
      subMetric,
      calculation: getCalculation(subMetric.label),
      detailedBreakdown,
      relatedEvents: level1Data.relatedEvents.filter(e => 
        e.title.toLowerCase().includes(subMetric.label.toLowerCase().split(" ")[0])
      ).slice(0, 3),
      evidenceReceipts: level1Data.evidenceReceipts
    };
  };

  const getMethodology = (label: string): string => {
    if (label.includes("Arbitrage")) {
      return "Automated contract variance analysis comparing actual charges vs. contracted rates across 8 major carriers. Uses machine learning to identify systematic deviations and quantify financial impact.";
    }
    if (label.includes("DQ")) {
      return "Comprehensive data quality assessment across 100+ validation rules. Checks completeness, accuracy, consistency, and timeliness of member, claims, and provider data.";
    }
    if (label.includes("Forecast")) {
      return "Predictive model combining historical claims patterns, seasonal trends, and policy changes. Updates hourly with 89% accuracy rate validated against actual outcomes.";
    }
    return "Statistical analysis of key performance indicators with automated anomaly detection and trend forecasting.";
  };

  const getDataSource = (label: string): string => {
    if (label.includes("Arbitrage")) return "Carrier EDI files, Contract schedules, Payment reconciliation";
    if (label.includes("DQ")) return "Member enrollment systems, Claims adjudication platform";
    if (label.includes("Forecast")) return "Financial planning system, Actuarial models";
    return "Enterprise data warehouse, Real-time monitoring systems";
  };

  const getCalculation = (label: string): string => {
    if (label.includes("Anthem")) {
      return "(Actual Admin Fees Charged - Contracted Schedule C Rates) × Annual Volume = $780K variance";
    }
    if (label.includes("Member")) {
      return "COUNT(DISTINCT member_id GROUP BY ssn, dob HAVING COUNT > 1) / TOTAL_MEMBERS × 100";
    }
    return "(Current Value - Baseline) / Baseline × 100";
  };

  return (
    <>
      <SEO 
        title="War Room | SiriusB iQ"
        description="Real-time operational intelligence for health benefits"
      />
      <Nav />
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">War Room</h1>
              <p className="text-slate-400">Real-time operational intelligence for health benefits</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant={currentView === "FOUR_LANE_LEDGER" ? "default" : "outline"}
                onClick={() => setCurrentView("FOUR_LANE_LEDGER")}
              >
                Four Lane Ledger
              </Button>
              <Button
                variant={currentView === "RANKED_EVENTS" ? "default" : "outline"}
                onClick={() => setCurrentView("RANKED_EVENTS")}
              >
                Ranked Events
              </Button>
            </div>
          </div>

          {currentView === "FOUR_LANE_LEDGER" && <FourLaneLedger onKPIClick={handleKPIClick} onEventClick={handleEventClick} />}
          {currentView === "RANKED_EVENTS" && <RankedEventsView onEventClick={handleEventClick} />}
        </div>
      </div>

      {/* Level 1 KPI Modal */}
      <Dialog open={level1Modal.open} onOpenChange={(open) => setLevel1Modal({ open, data: null })}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-slate-900 text-white border-slate-700">
          {level1Modal.data && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl flex items-center justify-between">
                  <span>{level1Modal.data.metric.label}</span>
                  <div className="flex items-center gap-4">
                    <Badge variant={level1Modal.data.metric.status === "HEALTHY" ? "default" : "destructive"}>
                      {level1Modal.data.metric.status || "HEALTHY"}
                    </Badge>
                    <Button variant="ghost" size="sm" onClick={() => setLevel1Modal({ open: false, data: null })}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </DialogTitle>
              </DialogHeader>

              <Tabs defaultValue="overview" className="mt-4">
                <TabsList className="bg-slate-800">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
                  <TabsTrigger value="events">Related Events</TabsTrigger>
                  <TabsTrigger value="evidence">Evidence</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6 mt-6">
                  {/* Main Metric */}
                  <Card className="p-6 bg-slate-800 border-slate-700">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-4xl font-bold mb-2">{level1Modal.data.metric.value}</p>
                        {level1Modal.data.metric.delta && (
                          <div className="flex items-center gap-2">
                            {level1Modal.data.metric.trend === "up" && <TrendingUp className="h-4 w-4 text-green-500" />}
                            {level1Modal.data.metric.trend === "down" && <TrendingDown className="h-4 w-4 text-red-500" />}
                            {level1Modal.data.metric.trend === "stable" && <Minus className="h-4 w-4 text-slate-400" />}
                            <span className="text-lg text-slate-300">{level1Modal.data.metric.delta}</span>
                          </div>
                        )}
                      </div>
                      <div className="text-right text-sm text-slate-400">
                        <p>Confidence: {(level1Modal.data.confidenceScore * 100).toFixed(1)}%</p>
                        <p>Updated: {level1Modal.data.freshnessMinutes}m ago</p>
                      </div>
                    </div>
                    {level1Modal.data.metric.details && (
                      <p className="mt-4 text-slate-300">{level1Modal.data.metric.details}</p>
                    )}
                  </Card>

                  {/* Methodology */}
                  <Card className="p-6 bg-slate-800 border-slate-700">
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-400" />
                      Methodology
                    </h3>
                    <p className="text-slate-300 mb-4">{level1Modal.data.methodology}</p>
                    <div className="pt-4 border-t border-slate-700">
                      <p className="text-sm text-slate-400">
                        <span className="font-semibold">Data Sources:</span> {level1Modal.data.dataSource}
                      </p>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="breakdown" className="space-y-4 mt-6">
                  <h3 className="text-lg font-semibold mb-4">Component Breakdown</h3>
                  <div className="grid gap-4">
                    {level1Modal.data.breakdownMetrics.map((subMetric, idx) => (
                      <Card 
                        key={idx}
                        className="p-4 bg-slate-800 border-slate-700 hover:bg-slate-750 cursor-pointer transition-colors"
                        onClick={() => handleLevel2Click(level1Modal.data!.metric.label, subMetric, level1Modal.data!)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              <h4 className="font-semibold">{subMetric.label}</h4>
                              {subMetric.status && (
                                <Badge variant={subMetric.status === "HEALTHY" ? "default" : "destructive"} className="text-xs">
                                  {subMetric.status}
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-4 mt-2">
                              <span className="text-2xl font-bold">{subMetric.value}</span>
                              {subMetric.delta_pct !== undefined && (
                                <div className="flex items-center gap-1">
                                  {subMetric.trend === "up" && <TrendingUp className="h-4 w-4 text-green-500" />}
                                  {subMetric.trend === "down" && <TrendingDown className="h-4 w-4 text-red-500" />}
                                  <span className={`text-sm ${subMetric.trend === "up" ? "text-green-500" : subMetric.trend === "down" ? "text-red-500" : "text-slate-400"}`}>
                                    {subMetric.delta_pct > 0 ? "+" : ""}{subMetric.delta_pct}%
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                          <ChevronRight className="h-5 w-5 text-slate-400" />
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="events" className="space-y-4 mt-6">
                  <h3 className="text-lg font-semibold mb-4">Related Events ({level1Modal.data.relatedEvents.length})</h3>
                  <div className="space-y-3">
                    {level1Modal.data.relatedEvents.map((event) => (
                      <Card 
                        key={event.id}
                        className="p-4 bg-slate-800 border-slate-700 hover:bg-slate-750 cursor-pointer transition-colors"
                        onClick={() => {
                          setLevel1Modal({ open: false, data: null });
                          handleEventClick(event);
                        }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline">{event.type}</Badge>
                              <Badge variant={event.state === "REALIZED" ? "default" : "secondary"}>{event.state}</Badge>
                            </div>
                            <h4 className="font-semibold mb-1">{event.title}</h4>
                            <p className="text-sm text-slate-400">{event.subtitle}</p>
                            <div className="flex items-center gap-4 mt-3 text-sm">
                              <span className="flex items-center gap-1">
                                <DollarSign className="h-4 w-4 text-green-400" />
                                ${(event.amount / 1000).toFixed(0)}K
                              </span>
                              <span className="flex items-center gap-1">
                                <Activity className="h-4 w-4 text-blue-400" />
                                {(event.confidence * 100).toFixed(0)}% confidence
                              </span>
                            </div>
                          </div>
                          <ArrowRight className="h-5 w-5 text-slate-400" />
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="evidence" className="space-y-4 mt-6">
                  <h3 className="text-lg font-semibold mb-4">Evidence Receipts ({level1Modal.data.evidenceReceipts.length})</h3>
                  <div className="space-y-3">
                    {level1Modal.data.evidenceReceipts.map((receipt, idx) => (
                      <Card key={idx} className="p-4 bg-slate-800 border-slate-700">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            {receipt.verified ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                              <AlertCircle className="h-5 w-5 text-yellow-500" />
                            )}
                            <span className="font-mono text-sm">{receipt.receipt_id}</span>
                          </div>
                          <Badge variant={receipt.verified ? "default" : "secondary"}>
                            {receipt.verified ? "Verified" : "Unverified"}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-slate-400">Confidence</p>
                            <p className="font-semibold">{receipt.confidence ? (receipt.confidence * 100).toFixed(1) : "N/A"}%</p>
                          </div>
                          <div>
                            <p className="text-slate-400">Freshness</p>
                            <p className="font-semibold">{receipt.freshness_minutes || "N/A"}m</p>
                          </div>
                          {receipt.dq_tests_passed !== undefined && (
                            <>
                              <div>
                                <p className="text-slate-400">DQ Tests</p>
                                <p className="font-semibold">{receipt.dq_tests_passed}/{receipt.dq_tests_total}</p>
                              </div>
                              <div>
                                <p className="text-slate-400">Owner</p>
                                <p className="font-semibold">{receipt.owner || "System"}</p>
                              </div>
                            </>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Level 2 Drill-down Modal */}
      <Dialog open={level2Modal.open} onOpenChange={(open) => setLevel2Modal({ open, data: null })}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 text-white border-slate-700">
          {level2Modal.data && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
                  <span>{level2Modal.data.parentMetric}</span>
                  <ChevronRight className="h-4 w-4" />
                  <span className="text-white font-semibold">{level2Modal.data.subMetric.label}</span>
                </div>
                <DialogTitle className="text-2xl flex items-center justify-between">
                  <span>{level2Modal.data.subMetric.label}</span>
                  <Button variant="ghost" size="sm" onClick={() => setLevel2Modal({ open: false, data: null })}>
                    <X className="h-4 w-4" />
                  </Button>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6 mt-6">
                {/* Main Metric */}
                <Card className="p-6 bg-slate-800 border-slate-700">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-4xl font-bold mb-2">{level2Modal.data.subMetric.value}</p>
                      {level2Modal.data.subMetric.delta_pct !== undefined && (
                        <div className="flex items-center gap-2">
                          {level2Modal.data.subMetric.trend === "up" && <TrendingUp className="h-4 w-4 text-green-500" />}
                          {level2Modal.data.subMetric.trend === "down" && <TrendingDown className="h-4 w-4 text-red-500" />}
                          <span className="text-lg">{level2Modal.data.subMetric.delta_pct > 0 ? "+" : ""}{level2Modal.data.subMetric.delta_pct}%</span>
                        </div>
                      )}
                    </div>
                    {level2Modal.data.subMetric.status && (
                      <Badge variant={level2Modal.data.subMetric.status === "HEALTHY" ? "default" : "destructive"}>
                        {level2Modal.data.subMetric.status}
                      </Badge>
                    )}
                  </div>
                  <div className="p-4 bg-slate-900 rounded border border-slate-700">
                    <p className="text-sm text-slate-400 mb-2">Calculation Method</p>
                    <p className="font-mono text-sm text-slate-200">{level2Modal.data.calculation}</p>
                  </div>
                </Card>

                {/* Detailed Breakdown */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Detailed Component Breakdown</h3>
                  <div className="space-y-3">
                    {level2Modal.data.detailedBreakdown.map((component, idx) => (
                      <Card key={idx} className="p-4 bg-slate-800 border-slate-700">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold mb-1">{component.component}</p>
                            <p className="text-2xl font-bold text-blue-400">{component.value}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-slate-400">Contribution</p>
                            <p className="text-xl font-semibold">{component.contribution}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Related Events */}
                {level2Modal.data.relatedEvents.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Related Events ({level2Modal.data.relatedEvents.length})</h3>
                    <div className="space-y-3">
                      {level2Modal.data.relatedEvents.map((event) => (
                        <Card 
                          key={event.id}
                          className="p-4 bg-slate-800 border-slate-700 hover:bg-slate-750 cursor-pointer transition-colors"
                          onClick={() => {
                            setLevel2Modal({ open: false, data: null });
                            handleEventClick(event);
                          }}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-semibold mb-1">{event.title}</h4>
                              <p className="text-sm text-slate-400 mb-2">{event.subtitle}</p>
                              <div className="flex items-center gap-4 text-sm">
                                <Badge variant="outline">{event.type}</Badge>
                                <span className="flex items-center gap-1">
                                  <DollarSign className="h-4 w-4 text-green-400" />
                                  ${(event.amount / 1000).toFixed(0)}K
                                </span>
                              </div>
                            </div>
                            <ArrowRight className="h-5 w-5 text-slate-400" />
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Evidence */}
                {level2Modal.data.evidenceReceipts.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Supporting Evidence</h3>
                    <div className="space-y-3">
                      {level2Modal.data.evidenceReceipts.map((receipt, idx) => (
                        <Card key={idx} className="p-4 bg-slate-800 border-slate-700">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {receipt.verified ? (
                                <CheckCircle className="h-5 w-5 text-green-500" />
                              ) : (
                                <AlertCircle className="h-5 w-5 text-yellow-500" />
                              )}
                              <span className="font-mono text-sm">{receipt.receipt_id}</span>
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                              <span>Confidence: {receipt.confidence ? (receipt.confidence * 100).toFixed(0) : "N/A"}%</span>
                              <Badge variant={receipt.verified ? "default" : "secondary"}>
                                {receipt.verified ? "Verified" : "Unverified"}
                              </Badge>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Event Detail Drawer */}
      <EventDetailDrawer
        eventId={selectedEventId}
        open={!!selectedEventId}
        onClose={() => setSelectedEventId(null)}
      />

      <Footer />
    </>
  );
}

function FourLaneLedger({ onKPIClick, onEventClick }: { onKPIClick: (kpi: KPIMetric) => void; onEventClick: (event: WarEvent) => void }) {
  const lanes: { key: LaneKey; label: string; icon: React.ElementType; color: string }[] = [
    { key: "value", label: "Value Creation", icon: TrendingUp, color: "blue" },
    { key: "controls", label: "Controls & Compliance", icon: Shield, color: "purple" },
    { key: "agentic", label: "Agentic Automation", icon: Zap, color: "green" },
    { key: "marketplace", label: "Marketplace Intel", icon: BarChart3, color: "orange" }
  ];

  const ledgerStats = mockWarRoomData.ledger;
  const kpis: KPIMetric[] = mockWarRoomData.kpis.slice(4, 8).map(kpi => ({
    label: kpi.label,
    value: kpi.value,
    delta: kpi.delta,
    delta_pct: kpi.delta_pct,
    status: (kpi.status as "HEALTHY" | "WARNING" | "CRITICAL" | undefined) || "HEALTHY",
    trend: (kpi.trend as "up" | "down" | "stable" | undefined),
    details: kpi.details
  }));

  return (
    <div className="space-y-8">
      {/* Top KPI Tiles - Now Clickable */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => (
          <Card 
            key={idx}
            className="p-4 bg-slate-800/50 border-slate-700 hover:bg-slate-800 cursor-pointer transition-all hover:scale-105"
            onClick={() => onKPIClick(kpi)}
          >
            <div className="flex items-start justify-between mb-2">
              <p className="text-sm text-slate-400">{kpi.label}</p>
              {kpi.trend === "up" && <TrendingUp className="h-4 w-4 text-green-500" />}
              {kpi.trend === "down" && <TrendingDown className="h-4 w-4 text-red-500" />}
              {kpi.trend === "stable" && <Minus className="h-4 w-4 text-slate-400" />}
            </div>
            <p className="text-2xl font-bold mb-1">{kpi.value}</p>
            {kpi.delta && (
              <p className={`text-sm flex items-center gap-1 ${
                kpi.trend === "up" ? "text-green-500" : 
                kpi.trend === "down" ? "text-red-500" : 
                "text-slate-400"
              }`}>
                {kpi.delta}
              </p>
            )}
            {kpi.details && (
              <p className="text-xs text-slate-500 mt-2">{kpi.details}</p>
            )}
          </Card>
        ))}
      </div>

      {/* Ledger Summary */}
      <Card className="p-6 bg-slate-800/50 border-slate-700">
        <h3 className="text-xl font-semibold mb-4">Value Ledger Overview</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <p className="text-sm text-slate-400 mb-1">Identified</p>
            <p className="text-2xl font-bold text-blue-400">${(ledgerStats.identified / 1000000).toFixed(1)}M</p>
          </div>
          <div>
            <p className="text-sm text-slate-400 mb-1">Approved</p>
            <p className="text-2xl font-bold text-green-400">${(ledgerStats.approved / 1000000).toFixed(1)}M</p>
          </div>
          <div>
            <p className="text-sm text-slate-400 mb-1">Realized</p>
            <p className="text-2xl font-bold text-emerald-400">${(ledgerStats.realized / 1000000).toFixed(1)}M</p>
          </div>
          <div>
            <p className="text-sm text-slate-400 mb-1">At Risk</p>
            <p className="text-2xl font-bold text-red-400">${(ledgerStats.at_risk / 1000).toFixed(0)}K</p>
          </div>
        </div>
      </Card>

      {/* Four Lanes */}
      <div className="grid lg:grid-cols-2 gap-6">
        {lanes.map((lane) => {
          const laneEvents = mockWarRoomData.events.filter(e => e.lane === lane.key);
          const Icon = lane.icon;
          
          return (
            <Card key={lane.key} className="p-6 bg-slate-800/50 border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg bg-${lane.color}-500/20`}>
                  <Icon className={`h-6 w-6 text-${lane.color}-400`} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{lane.label}</h3>
                  <p className="text-sm text-slate-400">{laneEvents.length} active events</p>
                </div>
              </div>

              <div className="space-y-3">
                {laneEvents.slice(0, 3).map((event) => (
                  <Card 
                    key={event.id}
                    className="p-4 bg-slate-900/50 border-slate-700 hover:bg-slate-900 cursor-pointer transition-colors"
                    onClick={() => onEventClick(event)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm mb-1">{event.title}</h4>
                        <p className="text-xs text-slate-400">{event.subtitle}</p>
                      </div>
                      <Badge variant={
                        event.state === "REALIZED" ? "default" :
                        event.state === "APPROVED" ? "secondary" :
                        "outline"
                      }>
                        {event.state}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3 text-green-400" />
                        ${(event.amount / 1000).toFixed(0)}K
                      </span>
                      <span className="flex items-center gap-1">
                        <Activity className="h-3 w-3 text-blue-400" />
                        {(event.confidence * 100).toFixed(0)}%
                      </span>
                      {event.owner && (
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3 text-purple-400" />
                          {event.owner}
                        </span>
                      )}
                    </div>
                  </Card>
                ))}
              </div>

              {laneEvents.length > 3 && (
                <Button variant="ghost" size="sm" className="w-full mt-3">
                  View all {laneEvents.length} events
                </Button>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function RankedEventsView({ onEventClick }: { onEventClick: (event: WarEvent) => void }) {
  const sortedEvents = useMemo(() => {
    return [...mockWarRoomData.events].sort((a, b) => {
      const scoreA = (a.amount / 1000000) * a.confidence * (a.timeSensitivity || 1);
      const scoreB = (b.amount / 1000000) * b.confidence * (b.timeSensitivity || 1);
      return scoreB - scoreA;
    });
  }, []);

  return (
    <div className="space-y-4">
      <Card className="p-6 bg-slate-800/50 border-slate-700">
        <h3 className="text-xl font-semibold mb-2">Ranked Events by Impact</h3>
        <p className="text-sm text-slate-400">Events ranked by financial impact × confidence × time sensitivity</p>
      </Card>

      <div className="space-y-3">
        {sortedEvents.map((event, idx) => {
          const score = ((event.amount / 1000000) * event.confidence * (event.timeSensitivity || 1) * 100).toFixed(1);
          
          return (
            <Card 
              key={event.id}
              className="p-5 bg-slate-800/50 border-slate-700 hover:bg-slate-800 cursor-pointer transition-colors"
              onClick={() => onEventClick(event)}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center">
                  <span className="text-lg font-bold text-blue-400">#{idx + 1}</span>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold mb-1">{event.title}</h4>
                      <p className="text-sm text-slate-400">{event.subtitle}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-400">Impact Score</p>
                      <p className="text-2xl font-bold text-blue-400">{score}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 mt-3">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-400" />
                      <span className="text-sm font-semibold">${(event.amount / 1000).toFixed(0)}K</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-blue-400" />
                      <span className="text-sm">{(event.confidence * 100).toFixed(0)}% confidence</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-orange-400" />
                      <span className="text-sm">{((event.timeSensitivity || 0) * 100).toFixed(0)}% urgency</span>
                    </div>
                    <Badge variant="outline">{event.type}</Badge>
                    <Badge variant={
                      event.state === "REALIZED" ? "default" :
                      event.state === "APPROVED" ? "secondary" :
                      "outline"
                    }>
                      {event.state}
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}