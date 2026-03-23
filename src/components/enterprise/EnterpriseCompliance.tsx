import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Shield, CheckCircle2, AlertTriangle, FileCheck, Download } from "lucide-react";

export function EnterpriseCompliance() {
  const certifications = [
    { name: 'SOC 2 Type II', status: 'Certified', expiry: '2026-12-31', score: 98 },
    { name: 'HIPAA Compliance', status: 'Certified', expiry: '2026-06-30', score: 100 },
    { name: 'ISO 27001', status: 'In Progress', expiry: '2026-09-30', score: 85 },
    { name: 'GDPR Compliance', status: 'Certified', expiry: '2027-03-15', score: 95 },
  ];

  const auditLogs = [
    { action: 'Contract Upload', user: 'john@democorp.com', timestamp: '2026-03-23 14:30', status: 'Success' },
    { action: 'PDF Export', user: 'sarah@democorp.com', timestamp: '2026-03-23 13:45', status: 'Success' },
    { action: 'User Login', user: 'michael@democorp.com', timestamp: '2026-03-23 12:15', status: 'Success' },
    { action: 'API Access', user: 'system', timestamp: '2026-03-23 11:20', status: 'Success' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">Compliance & Certifications</h3>
          <p className="text-gray-500">Enterprise security and compliance status</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Download Compliance Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">Compliance Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">97%</div>
            <Progress value={97} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">Active Certifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">4</div>
            <p className="text-xs text-gray-500 mt-1">All current</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">Audit Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,247</div>
            <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">Security Incidents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">0</div>
            <p className="text-xs text-gray-500 mt-1">Last 90 days</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Security Certifications</CardTitle>
          <CardDescription>Industry-standard compliance and security certifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {certifications.map((cert) => (
              <div key={cert.name} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                  <div>
                    <div className="font-medium">{cert.name}</div>
                    <div className="text-sm text-gray-500">Expires: {cert.expiry}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-medium">Score: {cert.score}%</div>
                    <Progress value={cert.score} className="w-24 mt-1" />
                  </div>
                  <Badge 
                    variant={cert.status === 'Certified' ? 'default' : 'outline'}
                    className={cert.status === 'Certified' ? 'bg-green-600' : 'bg-yellow-500'}
                  >
                    {cert.status === 'Certified' ? (
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                    ) : (
                      <AlertTriangle className="h-3 w-3 mr-1" />
                    )}
                    {cert.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Audit Log</CardTitle>
          <CardDescription>Recent system activity and compliance events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {auditLogs.map((log, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 border-b last:border-0">
                <div className="flex items-center gap-3">
                  <FileCheck className="h-4 w-4 text-gray-400" />
                  <div>
                    <div className="font-medium text-sm">{log.action}</div>
                    <div className="text-xs text-gray-500">{log.user}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-gray-500">{log.timestamp}</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    {log.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}