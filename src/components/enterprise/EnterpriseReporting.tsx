/**
 * Enterprise Reporting Dashboard
 * Advanced reporting features for contract analysis
 */

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FileText,
  Download,
  Mail,
  Calendar,
  Settings,
  BarChart3,
  FileCheck,
  Users,
  Building,
  Zap,
  Clock,
  TrendingUp,
  FileSpreadsheet,
  FileDown,
} from "lucide-react";

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  sections: string[];
  format: string;
}

interface ScheduledReport {
  id: string;
  name: string;
  frequency: string;
  recipients: string[];
  lastSent: string;
  nextScheduled: string;
}

const REPORT_TEMPLATES: ReportTemplate[] = [
  {
    id: "executive-summary",
    name: "Executive Summary",
    description: "High-level overview for C-suite executives",
    sections: ["Key Metrics", "Risk Overview", "Savings Opportunities"],
    format: "PDF",
  },
  {
    id: "detailed-analysis",
    name: "Detailed Analysis",
    description: "Comprehensive analysis for legal and finance teams",
    sections: ["All Provisions", "Red Flags", "Recommendations", "Benchmarks"],
    format: "PDF",
  },
  {
    id: "board-report",
    name: "Board Report",
    description: "Strategic insights for board presentations",
    sections: ["Strategic Summary", "Financial Impact", "Risk Assessment"],
    format: "PDF",
  },
  {
    id: "compliance-audit",
    name: "Compliance Audit",
    description: "Regulatory compliance checklist and documentation",
    sections: ["Compliance Status", "Regulatory Requirements", "Audit Trail"],
    format: "PDF",
  },
];

export function EnterpriseReporting() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("executive-summary");
  const [batchExport, setBatchExport] = useState(false);
  const [scheduledReports, setScheduledReports] = useState<ScheduledReport[]>([
    {
      id: "1",
      name: "Monthly Executive Summary",
      frequency: "Monthly",
      recipients: ["cfo@company.com", "ceo@company.com"],
      lastSent: "2026-03-01",
      nextScheduled: "2026-04-01",
    },
    {
      id: "2",
      name: "Weekly Risk Assessment",
      frequency: "Weekly",
      recipients: ["legal@company.com", "compliance@company.com"],
      lastSent: "2026-03-17",
      nextScheduled: "2026-03-24",
    },
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Enterprise Reporting</h2>
          <p className="text-muted-foreground mt-1">
            Advanced analytics and automated reporting for your organization
          </p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Generate Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Reports Generated</p>
                <p className="text-2xl font-bold">1,248</p>
                <p className="text-xs text-green-600">+12% this month</p>
              </div>
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Templates</p>
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-blue-600">4 custom</p>
              </div>
              <FileCheck className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Scheduled Reports</p>
                <p className="text-2xl font-bold">8</p>
                <p className="text-xs text-purple-600">2 pending</p>
              </div>
              <Calendar className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Recipients</p>
                <p className="text-2xl font-bold">156</p>
                <p className="text-xs text-orange-600">across 12 teams</p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="templates" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="templates">Report Templates</TabsTrigger>
          <TabsTrigger value="batch">Batch Export</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Report Templates Tab */}
        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Available Report Templates</CardTitle>
              <CardDescription>
                Pre-configured report formats optimized for different stakeholders
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {REPORT_TEMPLATES.map((template) => (
                  <Card key={template.id} className="cursor-pointer hover:border-primary transition-colors">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{template.name}</CardTitle>
                          <CardDescription className="mt-1">
                            {template.description}
                          </CardDescription>
                        </div>
                        <Badge variant="outline">{template.format}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Included Sections:</p>
                        <div className="flex flex-wrap gap-2">
                          {template.sections.map((section) => (
                            <Badge key={section} variant="secondary">
                              {section}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button size="sm" className="flex-1">
                            <Download className="h-4 w-4 mr-2" />
                            Use Template
                          </Button>
                          <Button size="sm" variant="outline">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-6">
                <Button variant="outline" className="w-full">
                  <Zap className="h-4 w-4 mr-2" />
                  Create Custom Template
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Batch Export Tab */}
        <TabsContent value="batch" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Batch Report Export</CardTitle>
              <CardDescription>
                Generate multiple reports simultaneously with bulk processing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Export Format</Label>
                  <Select defaultValue="pdf">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">
                        <div className="flex items-center gap-2">
                          <FileDown className="h-4 w-4" />
                          PDF (Recommended)
                        </div>
                      </SelectItem>
                      <SelectItem value="html">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          HTML
                        </div>
                      </SelectItem>
                      <SelectItem value="excel">
                        <div className="flex items-center gap-2">
                          <FileSpreadsheet className="h-4 w-4" />
                          Excel (Data Only)
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Date Range</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input type="date" />
                    <Input type="date" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Contract Types</Label>
                  <div className="space-y-2">
                    {["PBM Contracts", "Vendor Agreements", "Service Contracts", "All Contracts"].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox id={type} />
                        <label htmlFor={type} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Report Options</Label>
                  <div className="space-y-2">
                    {["Include Visualizations", "Include Raw Data", "Compress as ZIP"].map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <Checkbox id={option} defaultChecked />
                        <label htmlFor={option} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Export 24 Reports
                </Button>
                <Button variant="outline">
                  <Mail className="h-4 w-4 mr-2" />
                  Email Reports
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Scheduled Reports Tab */}
        <TabsContent value="scheduled" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Scheduled Reports</CardTitle>
                  <CardDescription>
                    Automate report generation and distribution
                  </CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule New Report
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Schedule Automated Report</DialogTitle>
                      <DialogDescription>
                        Configure automatic report generation and delivery
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label>Report Name</Label>
                        <Input placeholder="e.g., Monthly Executive Summary" />
                      </div>
                      <div className="space-y-2">
                        <Label>Template</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select template" />
                          </SelectTrigger>
                          <SelectContent>
                            {REPORT_TEMPLATES.map((template) => (
                              <SelectItem key={template.id} value={template.id}>
                                {template.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Frequency</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="quarterly">Quarterly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Recipients (comma-separated emails)</Label>
                        <Input placeholder="email1@company.com, email2@company.com" />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline">Cancel</Button>
                      <Button>Schedule Report</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduledReports.map((report) => (
                  <Card key={report.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <h4 className="font-semibold">{report.name}</h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {report.frequency}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {report.recipients.length} recipients
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Badge variant="outline">
                              Last sent: {new Date(report.lastSent).toLocaleDateString()}
                            </Badge>
                            <Badge variant="secondary">
                              Next: {new Date(report.nextScheduled).toLocaleDateString()}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Settings className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Mail className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Report Usage Trends</CardTitle>
                <CardDescription>Last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Executive Summary</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500" style={{ width: "85%" }} />
                      </div>
                      <span className="text-sm font-medium">156</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Detailed Analysis</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: "65%" }} />
                      </div>
                      <span className="text-sm font-medium">98</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Board Report</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500" style={{ width: "45%" }} />
                      </div>
                      <span className="text-sm font-medium">67</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Compliance Audit</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-500" style={{ width: "30%" }} />
                      </div>
                      <span className="text-sm font-medium">45</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Recipients</CardTitle>
                <CardDescription>Most active report consumers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Sarah Johnson (CFO)", count: 42, trend: "+8%" },
                    { name: "Michael Chen (Legal)", count: 38, trend: "+12%" },
                    { name: "Lisa Anderson (CEO)", count: 35, trend: "+5%" },
                    { name: "Robert Kim (Compliance)", count: 28, trend: "+15%" },
                  ].map((recipient, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{recipient.name}</p>
                        <p className="text-xs text-muted-foreground">{recipient.count} reports</p>
                      </div>
                      <Badge variant="outline" className="text-green-600">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {recipient.trend}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Report Distribution by Department</CardTitle>
                <CardDescription>Organization-wide report consumption</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { dept: "Executive Leadership", count: 245, color: "bg-blue-500" },
                    { dept: "Legal & Compliance", count: 198, color: "bg-purple-500" },
                    { dept: "Finance & Accounting", count: 167, color: "bg-green-500" },
                    { dept: "Operations", count: 142, color: "bg-orange-500" },
                    { dept: "Human Resources", count: 89, color: "bg-pink-500" },
                  ].map((dept) => (
                    <div key={dept.dept}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{dept.dept}</span>
                        <span className="text-sm text-muted-foreground">{dept.count} reports</span>
                      </div>
                      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${dept.color}`}
                          style={{ width: `${(dept.count / 245) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}