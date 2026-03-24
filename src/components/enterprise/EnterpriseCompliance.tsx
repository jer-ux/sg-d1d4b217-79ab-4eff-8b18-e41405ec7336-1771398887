/**
 * Enterprise Compliance Center
 * Compliance monitoring and reporting
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Shield,
  CheckCircle,
  AlertTriangle,
  FileText,
  Download,
  Lock,
  Eye,
} from "lucide-react";

export function EnterpriseCompliance() {
  const complianceStats = {
    overall: 94,
    certifications: [
      { name: "SOC 2 Type II", status: "certified", expiry: "2026-12-31" },
      { name: "HIPAA", status: "certified", expiry: "2027-06-30" },
      { name: "ISO 27001", status: "in-progress", expiry: null },
      { name: "GDPR", status: "certified", expiry: "2026-08-15" },
    ],
    audits: {
      completed: 12,
      pending: 2,
      passed: 11,
    },
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Compliance Center</h2>
        <p className="text-gray-500 mt-1">
          Monitor compliance status and certifications
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Overall Compliance Score</CardTitle>
            <CardDescription>Current compliance standing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="text-4xl font-bold text-green-600">
                {complianceStats.overall}%
              </div>
              <div className="flex-1">
                <Progress value={complianceStats.overall} className="h-2" />
                <p className="text-xs text-gray-500 mt-2">
                  Excellent compliance status
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Audits Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{complianceStats.audits.completed}</div>
            <p className="text-xs text-gray-500 mt-1">
              {complianceStats.audits.pending} pending
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pass Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                (complianceStats.audits.passed / complianceStats.audits.completed) * 100
              )}
              %
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {complianceStats.audits.passed} of {complianceStats.audits.completed}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="certifications" className="space-y-6">
        <TabsList>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
          <TabsTrigger value="audits">Audit Trail</TabsTrigger>
          <TabsTrigger value="policies">Policies</TabsTrigger>
        </TabsList>

        <TabsContent value="certifications" className="space-y-4">
          {complianceStats.certifications.map((cert, idx) => (
            <Card key={idx}>
              <CardContent className="flex items-center justify-between p-6">
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-lg ${
                      cert.status === "certified"
                        ? "bg-green-100 dark:bg-green-900/20"
                        : "bg-yellow-100 dark:bg-yellow-900/20"
                    }`}
                  >
                    {cert.status === "certified" ? (
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    ) : (
                      <AlertTriangle className="h-6 w-6 text-yellow-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold">{cert.name}</h3>
                    {cert.expiry && (
                      <p className="text-sm text-gray-500">
                        Expires: {new Date(cert.expiry).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge
                    variant={cert.status === "certified" ? "default" : "secondary"}
                    className="capitalize"
                  >
                    {cert.status === "in-progress" ? "In Progress" : cert.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="audits">
          <Card>
            <CardHeader>
              <CardTitle>Recent Audits</CardTitle>
              <CardDescription>Compliance audit history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">Q4 2025 SOC 2 Audit</p>
                      <p className="text-xs text-gray-500">Completed on Dec 15, 2025</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">HIPAA Compliance Review</p>
                      <p className="text-xs text-gray-500">Completed on Nov 20, 2025</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="policies">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Policies</CardTitle>
              <CardDescription>Active policies and procedures</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                  <div className="flex items-center gap-3">
                    <Lock className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">Data Protection Policy</span>
                  </div>
                  <Button variant="ghost" size="sm">View</Button>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">Access Control Policy</span>
                  </div>
                  <Button variant="ghost" size="sm">View</Button>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">Incident Response Plan</span>
                  </div>
                  <Button variant="ghost" size="sm">View</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}