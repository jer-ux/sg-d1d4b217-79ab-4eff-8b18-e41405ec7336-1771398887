import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
  FileText,
  Download,
  Calendar,
  Filter,
  BarChart3,
  PieChart,
  LineChart,
  TrendingUp,
  Users,
  DollarSign,
  Activity
} from "lucide-react";

interface Report {
  id: string;
  name: string;
  type: string;
  description: string;
  lastGenerated: string;
  status: "ready" | "generating" | "scheduled";
}

export function EnterpriseReporting() {
  const [reports] = useState<Report[]>([
    {
      id: "rep-001",
      name: "Executive Summary",
      type: "Executive",
      description: "High-level overview of key metrics and trends",
      lastGenerated: "2026-03-23 10:30 AM",
      status: "ready"
    },
    {
      id: "rep-002",
      name: "Security Audit",
      type: "Security",
      description: "Comprehensive security posture and compliance report",
      lastGenerated: "2026-03-22 11:45 PM",
      status: "ready"
    },
    {
      id: "rep-003",
      name: "Usage Analytics",
      type: "Analytics",
      description: "Detailed usage metrics and user behavior analysis",
      lastGenerated: "2026-03-23 09:15 AM",
      status: "ready"
    },
    {
      id: "rep-004",
      name: "Financial Overview",
      type: "Financial",
      description: "Revenue, costs, and ROI analysis",
      lastGenerated: "Generating...",
      status: "generating"
    }
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ready":
        return <Badge className="bg-green-500 text-white">Ready</Badge>;
      case "generating":
        return <Badge className="bg-yellow-500 text-white">Generating</Badge>;
      case "scheduled":
        return <Badge variant="secondary">Scheduled</Badge>;
      default:
        return null;
    }
  };

  const reportTypes = [
    { value: "executive", label: "Executive Summary", icon: TrendingUp },
    { value: "security", label: "Security Audit", icon: Activity },
    { value: "analytics", label: "Usage Analytics", icon: BarChart3 },
    { value: "financial", label: "Financial Report", icon: DollarSign },
    { value: "compliance", label: "Compliance Report", icon: FileText },
    { value: "custom", label: "Custom Report", icon: PieChart }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Enterprise Reporting</h2>
          <p className="text-muted-foreground">Generate and schedule comprehensive business reports</p>
        </div>
        <Button className="gap-2">
          <FileText className="h-4 w-4" />
          Create Custom Report
        </Button>
      </div>

      {/* Report Builder */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Report Generator</CardTitle>
          <CardDescription>Generate a report with custom parameters</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Report Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4" />
                          {type.label}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Date Range</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="ytd">Year to date</SelectItem>
                  <SelectItem value="custom">Custom range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Format</Label>
              <Select defaultValue="pdf">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button className="w-full gap-2">
            <Download className="h-4 w-4" />
            Generate Report
          </Button>
        </CardContent>
      </Card>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
          <CardDescription>Access your previously generated reports</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {reports.map((report) => (
            <div
              key={report.id}
              className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{report.name}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Badge variant="outline" className="text-xs">{report.type}</Badge>
                    <span>•</span>
                    <Calendar className="h-3 w-3" />
                    {report.lastGenerated}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {getStatusBadge(report.status)}
                {report.status === "ready" && (
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Scheduled Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Scheduled Reports</CardTitle>
          <CardDescription>Automatically generate and deliver reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Weekly Executive Summary</p>
                <p className="text-sm text-muted-foreground">Every Monday at 9:00 AM</p>
              </div>
              <Button variant="outline" size="sm">Edit Schedule</Button>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Monthly Security Audit</p>
                <p className="text-sm text-muted-foreground">1st of each month at 12:00 AM</p>
              </div>
              <Button variant="outline" size="sm">Edit Schedule</Button>
            </div>
            <Button variant="outline" className="w-full">
              <Calendar className="h-4 w-4 mr-2" />
              Add Scheduled Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}