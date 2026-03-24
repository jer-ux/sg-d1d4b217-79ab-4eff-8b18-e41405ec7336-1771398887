/**
 * Enterprise Security Center
 * Security monitoring and audit logs
 */

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Shield,
  Lock,
  Key,
  AlertTriangle,
  CheckCircle,
  Search,
  Download,
  Eye,
} from "lucide-react";

interface AuditLogEntry {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  resource: string;
  status: "success" | "failed" | "warning";
  ipAddress: string;
}

export function EnterpriseSecurityCenter() {
  const [searchTerm, setSearchTerm] = useState("");
  const [auditLogs] = useState<AuditLogEntry[]>([
    {
      id: "1",
      timestamp: "2026-03-24 10:30:15",
      user: "sarah.johnson@company.com",
      action: "Report Generated",
      resource: "Contract Analysis #1247",
      status: "success",
      ipAddress: "192.168.1.100",
    },
    {
      id: "2",
      timestamp: "2026-03-24 09:15:42",
      user: "mike.chen@company.com",
      action: "Contract Uploaded",
      resource: "CVS_Caremark_2026.pdf",
      status: "success",
      ipAddress: "192.168.1.101",
    },
    {
      id: "3",
      timestamp: "2026-03-24 08:45:22",
      user: "admin@company.com",
      action: "User Role Changed",
      resource: "User: alex.martinez",
      status: "success",
      ipAddress: "192.168.1.102",
    },
    {
      id: "4",
      timestamp: "2026-03-23 16:20:10",
      user: "unknown",
      action: "Failed Login Attempt",
      resource: "Admin Portal",
      status: "failed",
      ipAddress: "185.220.101.45",
    },
  ]);

  const securityMetrics = {
    totalEvents: 1247,
    failedLogins: 12,
    activeApiKeys: 8,
    suspiciousActivity: 2,
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge variant="default">Success</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      case "warning":
        return <Badge variant="secondary">Warning</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Security Center</h2>
        <p className="text-gray-500 mt-1">
          Monitor security events and audit logs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <Shield className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{securityMetrics.totalEvents}</div>
            <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Failed Logins</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {securityMetrics.failedLogins}
            </div>
            <p className="text-xs text-gray-500 mt-1">Requires attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active API Keys</CardTitle>
            <Key className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{securityMetrics.activeApiKeys}</div>
            <p className="text-xs text-gray-500 mt-1">In use</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Suspicious Activity</CardTitle>
            <Lock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {securityMetrics.suspiciousActivity}
            </div>
            <p className="text-xs text-gray-500 mt-1">Under review</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="audit" className="space-y-6">
        <TabsList>
          <TabsTrigger value="audit">Audit Logs</TabsTrigger>
          <TabsTrigger value="access">Access Control</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
        </TabsList>

        <TabsContent value="audit" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Audit Trail</CardTitle>
                  <CardDescription>Complete history of system activities</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search logs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 w-[250px]"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Resource</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>IP Address</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-mono text-xs">{log.timestamp}</TableCell>
                      <TableCell className="text-sm">{log.user}</TableCell>
                      <TableCell className="text-sm">{log.action}</TableCell>
                      <TableCell className="text-sm text-gray-500">{log.resource}</TableCell>
                      <TableCell>{getStatusBadge(log.status)}</TableCell>
                      <TableCell className="font-mono text-xs">{log.ipAddress}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="access">
          <Card>
            <CardHeader>
              <CardTitle>Access Control</CardTitle>
              <CardDescription>Manage user permissions and roles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-xs text-gray-500">Enabled for all admin users</p>
                    </div>
                  </div>
                  <Badge variant="default">Active</Badge>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">IP Whitelisting</p>
                      <p className="text-xs text-gray-500">12 IPs configured</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Configure</Button>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">Session Management</p>
                      <p className="text-xs text-gray-500">Auto-logout after 30 minutes</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Configure</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>API Keys</CardTitle>
                  <CardDescription>Manage API access credentials</CardDescription>
                </div>
                <Button size="sm">
                  <Key className="h-4 w-4 mr-2" />
                  Create Key
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                      <Key className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Production API Key</p>
                      <p className="text-xs text-gray-500 font-mono">sk_prod_***************abc123</p>
                      <p className="text-xs text-gray-400 mt-1">Created on Jan 15, 2026</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="default">Active</Badge>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                      <Key className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium">Staging API Key</p>
                      <p className="text-xs text-gray-500 font-mono">sk_test_***************def456</p>
                      <p className="text-xs text-gray-400 mt-1">Created on Feb 10, 2026</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Staging</Badge>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}