import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { EnterpriseHeader } from "@/components/enterprise/EnterpriseHeader";
import { authService } from "@/services/authService";
import { auditService, type AuditLogEntry } from "@/services/auditService";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Download, Filter } from "lucide-react";

export default function AuditLogsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const user = await authService.getCurrentUser();
    if (!user) {
      router.push("/auth/signin?redirect=/enterprise/audit-logs");
      return;
    }

    if (user.organization_id) {
      const data = await auditService.getAuditLogs({
        organizationId: user.organization_id,
        limit: 100
      });
      setLogs(data);
    }
    setLoading(false);
  };

  const filteredLogs = logs.filter(log => 
    log.action?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.resource_type?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getActionColor = (action: string) => {
    if (action.includes("delete") || action.includes("remove") || action.includes("fail")) return "destructive";
    if (action.includes("create") || action.includes("add") || action.includes("success")) return "default";
    return "secondary";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <SEO title="Audit Logs - Enterprise | SiriusB iQ" />
      <div className="min-h-screen bg-background">
        <EnterpriseHeader />
        <main className="container py-8 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight">Audit Logs</h1>
              <p className="text-muted-foreground">
                Comprehensive security and activity trail for your organization.
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline"><Filter className="h-4 w-4 mr-2" /> Filter</Button>
              <Button variant="outline"><Download className="h-4 w-4 mr-2" /> Export CSV</Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>System Activity</CardTitle>
              <CardDescription>Review all tracked events across your infrastructure.</CardDescription>
              <div className="mt-4 relative max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by action or resource..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Resource</TableHead>
                      <TableHead>User ID</TableHead>
                      <TableHead>IP Address</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLogs.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                          No audit logs found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredLogs.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell className="whitespace-nowrap text-muted-foreground text-sm">
                            {new Date(log.created_at || "").toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <Badge variant={getActionColor(log.action || "") as any}>
                              {log.action}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-mono text-xs">
                            {log.resource_type}
                            {log.resource_id && <span className="text-muted-foreground">:{log.resource_id.substring(0,8)}</span>}
                          </TableCell>
                          <TableCell className="font-mono text-xs truncate max-w-[120px]">
                            {log.user_id}
                          </TableCell>
                          <TableCell className="text-muted-foreground text-sm">
                            {log.ip_address || "N/A"}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </>
  );
}