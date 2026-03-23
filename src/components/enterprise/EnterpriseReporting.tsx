import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Download, 
  Calendar, 
  Mail,
  BarChart,
  TrendingUp,
  AlertCircle
} from "lucide-react";

export function EnterpriseReporting() {
  const scheduledReports = [
    { name: 'Monthly Executive Summary', frequency: 'Monthly', nextRun: '2026-04-01', recipients: 3 },
    { name: 'Weekly Risk Dashboard', frequency: 'Weekly', nextRun: '2026-03-25', recipients: 8 },
    { name: 'Quarterly Board Report', frequency: 'Quarterly', nextRun: '2026-06-01', recipients: 5 },
  ];

  const reportTemplates = [
    { name: 'Executive Summary', description: 'High-level contract portfolio overview' },
    { name: 'Risk Analysis', description: 'Detailed risk assessment and trends' },
    { name: 'Savings Report', description: 'Financial impact and opportunities' },
    { name: 'Compliance Report', description: 'Regulatory compliance status' },
    { name: 'Department Report', description: 'Department-specific metrics' },
    { name: 'Custom Report', description: 'Build your own custom report' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">Custom Reporting</h3>
          <p className="text-gray-500">Automated and on-demand enterprise reports</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <FileText className="h-4 w-4 mr-2" />
          Create Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">Reports Generated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">127</div>
            <p className="text-xs text-gray-500 mt-1">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">Scheduled Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3</div>
            <p className="text-xs text-gray-500 mt-1">Active schedules</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">Recipients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">16</div>
            <p className="text-xs text-gray-500 mt-1">Email subscribers</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Scheduled Reports</CardTitle>
          <CardDescription>Automated report delivery</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {scheduledReports.map((report) => (
            <div key={report.name} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <Calendar className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="font-medium">{report.name}</div>
                  <div className="text-sm text-gray-500">
                    {report.frequency} • Next: {report.nextRun}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="outline">
                  <Mail className="h-3 w-3 mr-1" />
                  {report.recipients} recipients
                </Badge>
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  Active
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Report Templates</CardTitle>
          <CardDescription>Pre-built and custom report formats</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reportTemplates.map((template) => (
              <Card key={template.name} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <BarChart className="h-8 w-8 text-blue-600" />
                    <Button size="sm" variant="ghost">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardTitle className="text-sm mt-2">{template.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-gray-500">{template.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>White-Label Branding</CardTitle>
          <CardDescription>Customize reports with your company branding</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <div className="font-medium mb-2">Company Logo</div>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                    <FileText className="h-8 w-8 text-gray-400" />
                  </div>
                  <Button size="sm" variant="outline">Upload Logo</Button>
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <div className="font-medium mb-2">Brand Colors</div>
                <div className="flex gap-2">
                  <div className="w-12 h-12 rounded bg-blue-600"></div>
                  <div className="w-12 h-12 rounded bg-indigo-600"></div>
                  <div className="w-12 h-12 rounded bg-purple-600"></div>
                </div>
              </div>
            </div>

            <div className="p-4 border-2 border-dashed rounded-lg flex items-center justify-center">
              <div className="text-center">
                <FileText className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">Report Preview</p>
                <p className="text-xs text-gray-400 mt-1">Your branded reports will appear here</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}