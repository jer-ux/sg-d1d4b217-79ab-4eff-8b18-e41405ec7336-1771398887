/**
 * KINCAID HEALTH™
 * Evidence Spine Dashboard
 * Search, filter, and visualize all audit logs and evidence objects
 */

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Shield,
  Search,
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Activity,
  Database,
  Brain,
  User,
  FileText,
  DollarSign,
  Filter,
  Download,
  Eye,
} from "lucide-react";

// Mock data for demonstration
const generateMockEvidenceObjects = () => {
  const types = ["finding", "recommendation", "decision", "risk", "model", "report"];
  const categories = ["financial", "clinical", "operational", "compliance"];
  const confidenceLevels = ["very_low", "low", "medium", "high", "very_high"];
  const riskLevels = ["minimal", "low", "medium", "high", "critical"];
  const agentNames = [
    "Chief Actuary Agent",
    "CFO Agent",
    "CHRO Agent",
    "Chief Risk Officer Agent",
    "Healthcare Economist Agent",
    "Data Quality Agent",
    "Governance Agent",
    "Compliance Agent",
    "Board Reporting Agent",
  ];

  const objects = [];
  for (let i = 0; i < 50; i++) {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));

    objects.push({
      id: `ev-${1000 + i}`,
      object_type: types[Math.floor(Math.random() * types.length)],
      object_category: categories[Math.floor(Math.random() * categories.length)],
      title: `Evidence Object ${1000 + i}`,
      description: `Detailed analysis of ${types[Math.floor(Math.random() * types.length)]}`,
      confidence_score: Math.random(),
      confidence_level: confidenceLevels[Math.floor(Math.random() * confidenceLevels.length)],
      financial_impact_expected: Math.floor(Math.random() * 500000) + 10000,
      risk_score: Math.random(),
      risk_level: riskLevels[Math.floor(Math.random() * riskLevels.length)],
      agent_name: agentNames[Math.floor(Math.random() * agentNames.length)],
      review_status: ["pending", "reviewed", "approved"][Math.floor(Math.random() * 3)],
      created_at: date.toISOString(),
    });
  }
  return objects;
};

const generateMockAuditLogs = () => {
  const actions = ["create", "read", "update", "delete", "approve", "reject", "execute"];
  const actorTypes = ["user", "agent", "system"];
  const actionCategories = ["data", "analysis", "decision", "system", "security"];
  const targetTypes = ["dataset", "evidence_object", "contract", "user", "organization"];

  const logs = [];
  for (let i = 0; i < 100; i++) {
    const date = new Date();
    date.setMinutes(date.getMinutes() - Math.floor(Math.random() * 10000));

    logs.push({
      id: `audit-${1000 + i}`,
      action: actions[Math.floor(Math.random() * actions.length)],
      action_category: actionCategories[Math.floor(Math.random() * actionCategories.length)],
      actor_type: actorTypes[Math.floor(Math.random() * actorTypes.length)],
      actor_name: actorTypes[Math.floor(Math.random() * actorTypes.length)] === "user" 
        ? "admin@company.com" 
        : "Chief Actuary Agent",
      target_type: targetTypes[Math.floor(Math.random() * targetTypes.length)],
      target_id: `target-${Math.floor(Math.random() * 1000)}`,
      description: `Performed ${actions[Math.floor(Math.random() * actions.length)]} on ${targetTypes[Math.floor(Math.random() * targetTypes.length)]}`,
      created_at: date.toISOString(),
    });
  }
  return logs;
};

export default function EvidenceSpineDashboard() {
  const [evidenceObjects] = useState(generateMockEvidenceObjects());
  const [auditLogs] = useState(generateMockAuditLogs());
  const [activeTab, setActiveTab] = useState("evidence");

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [objectType, setObjectType] = useState("all");
  const [confidenceMin, setConfidenceMin] = useState(0);
  const [impactMin, setImpactMin] = useState(0);
  const [riskLevel, setRiskLevel] = useState("all");
  const [reviewStatus, setReviewStatus] = useState("all");
  const [selectedEvidence, setSelectedEvidence] = useState<any>(null);

  // Apply filters
  const filteredEvidence = evidenceObjects.filter((obj) => {
    if (searchQuery && !obj.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (objectType !== "all" && obj.object_type !== objectType) {
      return false;
    }
    if (obj.confidence_score < confidenceMin) {
      return false;
    }
    if (obj.financial_impact_expected < impactMin) {
      return false;
    }
    if (riskLevel !== "all" && obj.risk_level !== riskLevel) {
      return false;
    }
    if (reviewStatus !== "all" && obj.review_status !== reviewStatus) {
      return false;
    }
    if (dateFrom && new Date(obj.created_at) < new Date(dateFrom)) {
      return false;
    }
    if (dateTo && new Date(obj.created_at) > new Date(dateTo)) {
      return false;
    }
    return true;
  });

  // Statistics
  const stats = {
    totalObjects: filteredEvidence.length,
    avgConfidence: (
      filteredEvidence.reduce((sum, obj) => sum + obj.confidence_score, 0) / filteredEvidence.length
    ).toFixed(2),
    totalImpact: filteredEvidence.reduce((sum, obj) => sum + obj.financial_impact_expected, 0),
    highRiskCount: filteredEvidence.filter((obj) => obj.risk_level === "high" || obj.risk_level === "critical").length,
  };

  const getConfidenceBadge = (level: string) => {
    const colors: Record<string, string> = {
      very_low: "bg-red-500/10 text-red-500",
      low: "bg-orange-500/10 text-orange-500",
      medium: "bg-yellow-500/10 text-yellow-500",
      high: "bg-blue-500/10 text-blue-500",
      very_high: "bg-green-500/10 text-green-500",
    };
    return colors[level] || "bg-gray-500/10 text-gray-500";
  };

  const getRiskBadge = (level: string) => {
    const colors: Record<string, string> = {
      minimal: "bg-green-500/10 text-green-500",
      low: "bg-blue-500/10 text-blue-500",
      medium: "bg-yellow-500/10 text-yellow-500",
      high: "bg-orange-500/10 text-orange-500",
      critical: "bg-red-500/10 text-red-500",
    };
    return colors[level] || "bg-gray-500/10 text-gray-500";
  };

  const getReviewBadge = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-yellow-500/10 text-yellow-500",
      reviewed: "bg-blue-500/10 text-blue-500",
      approved: "bg-green-500/10 text-green-500",
    };
    return colors[status] || "bg-gray-500/10 text-gray-500";
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1600px] mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold">Evidence Spine</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Universal Activity Tracking & Evidence Provenance
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Objects</p>
                <p className="text-3xl font-bold">{stats.totalObjects}</p>
              </div>
              <Database className="w-8 h-8 text-muted-foreground" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Confidence</p>
                <p className="text-3xl font-bold">{stats.avgConfidence}</p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Impact</p>
                <p className="text-3xl font-bold">${(stats.totalImpact / 1000000).toFixed(1)}M</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-500" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">High Risk</p>
                <p className="text-3xl font-bold">{stats.highRiskCount}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              <h2 className="text-xl font-semibold">Filters</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search evidence..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Object Type</Label>
                <Select value={objectType} onValueChange={setObjectType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="finding">Finding</SelectItem>
                    <SelectItem value="recommendation">Recommendation</SelectItem>
                    <SelectItem value="decision">Decision</SelectItem>
                    <SelectItem value="risk">Risk</SelectItem>
                    <SelectItem value="model">Model</SelectItem>
                    <SelectItem value="report">Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Risk Level</Label>
                <Select value={riskLevel} onValueChange={setRiskLevel}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="minimal">Minimal</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Review Status</Label>
                <Select value={reviewStatus} onValueChange={setReviewStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="reviewed">Reviewed</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Date From</Label>
                <Input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Date To</Label>
                <Input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Min Confidence ({confidenceMin.toFixed(2)})</Label>
                <Input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={confidenceMin}
                  onChange={(e) => setConfidenceMin(parseFloat(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label>Min Impact (${(impactMin / 1000).toFixed(0)}K)</Label>
                <Input
                  type="range"
                  min="0"
                  max="500000"
                  step="10000"
                  value={impactMin}
                  onChange={(e) => setImpactMin(parseFloat(e.target.value))}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setDateFrom("");
                  setDateTo("");
                  setObjectType("all");
                  setConfidenceMin(0);
                  setImpactMin(0);
                  setRiskLevel("all");
                  setReviewStatus("all");
                }}
              >
                Reset Filters
              </Button>
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Export Results
              </Button>
            </div>
          </div>
        </Card>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="evidence" className="gap-2">
              <Shield className="w-4 h-4" />
              Evidence Objects
            </TabsTrigger>
            <TabsTrigger value="audit" className="gap-2">
              <Activity className="w-4 h-4" />
              Audit Logs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="evidence" className="space-y-4">
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Confidence</TableHead>
                    <TableHead>Financial Impact</TableHead>
                    <TableHead>Risk</TableHead>
                    <TableHead>Agent</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEvidence.slice(0, 20).map((obj) => (
                    <TableRow key={obj.id}>
                      <TableCell className="font-mono text-xs">{obj.id}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{obj.object_type}</Badge>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">{obj.title}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm font-semibold">
                            {obj.confidence_score.toFixed(2)}
                          </div>
                          <Badge className={getConfidenceBadge(obj.confidence_level)}>
                            {obj.confidence_level}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm font-semibold">
                          ${(obj.financial_impact_expected / 1000).toFixed(0)}K
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm font-semibold">
                            {obj.risk_score.toFixed(2)}
                          </div>
                          <Badge className={getRiskBadge(obj.risk_level)}>
                            {obj.risk_level}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[150px] truncate text-xs">
                        {obj.agent_name}
                      </TableCell>
                      <TableCell>
                        <Badge className={getReviewBadge(obj.review_status)}>
                          {obj.review_status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs">
                        {new Date(obj.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedEvidence(obj)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="audit" className="space-y-4">
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Actor</TableHead>
                    <TableHead>Target</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditLogs.slice(0, 20).map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="text-xs">
                        {new Date(log.created_at).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{log.action}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{log.action_category}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {log.actor_type === "user" ? (
                            <User className="w-4 h-4" />
                          ) : log.actor_type === "agent" ? (
                            <Brain className="w-4 h-4" />
                          ) : (
                            <Activity className="w-4 h-4" />
                          )}
                          <span className="text-xs">{log.actor_name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-xs font-mono">{log.target_id}</div>
                          <Badge variant="outline" className="text-xs">
                            {log.target_type}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[300px] truncate text-xs">
                        {log.description}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Detail Modal */}
        {selectedEvidence && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
            <Card className="max-w-3xl w-full max-h-[80vh] overflow-y-auto p-6">
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-bold">{selectedEvidence.title}</h2>
                    <p className="text-sm text-muted-foreground">
                      {selectedEvidence.id} • {selectedEvidence.object_type}
                    </p>
                  </div>
                  <Button variant="ghost" onClick={() => setSelectedEvidence(null)}>
                    ×
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Confidence Score</Label>
                    <div className="flex items-center gap-2">
                      <div className="text-2xl font-bold">
                        {selectedEvidence.confidence_score.toFixed(2)}
                      </div>
                      <Badge className={getConfidenceBadge(selectedEvidence.confidence_level)}>
                        {selectedEvidence.confidence_level}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Risk Score</Label>
                    <div className="flex items-center gap-2">
                      <div className="text-2xl font-bold">
                        {selectedEvidence.risk_score.toFixed(2)}
                      </div>
                      <Badge className={getRiskBadge(selectedEvidence.risk_level)}>
                        {selectedEvidence.risk_level}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Financial Impact</Label>
                    <div className="text-2xl font-bold">
                      ${(selectedEvidence.financial_impact_expected / 1000).toFixed(0)}K
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Review Status</Label>
                    <Badge className={getReviewBadge(selectedEvidence.review_status)}>
                      {selectedEvidence.review_status}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Agent Attribution</Label>
                  <div className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-primary" />
                    <span className="font-semibold">{selectedEvidence.agent_name}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <p className="text-sm text-muted-foreground">{selectedEvidence.description}</p>
                </div>

                <div className="space-y-2">
                  <Label>Evidence Chain</Label>
                  <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <FileText className="w-4 h-4" />
                      <span>Data ingestion → Quality validation → AI analysis</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Timeline</Label>
                  <div className="text-sm text-muted-foreground">
                    Created: {new Date(selectedEvidence.created_at).toLocaleString()}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button>Approve</Button>
                  <Button variant="outline">Request Review</Button>
                  <Button variant="ghost">Reject</Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}