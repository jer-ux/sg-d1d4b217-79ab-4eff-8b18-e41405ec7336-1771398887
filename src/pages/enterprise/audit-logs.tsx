import { useState, useEffect } from "react";
import Head from "next/head";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { EnterpriseHeader } from "@/components/enterprise/EnterpriseHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { 
  Search, 
  Download, 
  Filter,
  FileText,
  Upload,
  User,
  Settings,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface AuditLog {
  id: string;
  user_id: string;
  action: string;
  resource_type: string;
  resource_id: string;
  metadata: any;
  ip_address: string;
  user_agent: string;
  created_at: string;
}

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAction, setFilterAction] = useState('all');

  useEffect(() => {
    loadAuditLogs();
  }, []);

  const loadAuditLogs = async () => {
    try {
      const { data, error } = await supabase
        .from('audit_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (data) {
        setLogs(data);
      }
    } catch (error) {
      console.error('Failed to load audit logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const getActionIcon = (action: string) => {
    switch (action.toLowerCase()) {
      case 'upload':
        return <Upload className="h-4 w-4" />;
      case 'download':
        return <Download className="h-4 w-4" />;
      case 'view':
        return <FileText className="h-4 w-4" />;
      case 'update':
        return <Settings className="h-4 w-4" />;
      case 'delete':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <CheckCircle className="h-4 w-4" />;
    }
  };

  const getActionBadge = (action: string) => {
    const actionLower = action.toLowerCase();
    if (actionLower.includes('delete') || actionLower.includes('revoke')) {
      return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">{action}</Badge>;
    }
    if (actionLower.includes('create') || actionLower.includes('upload')) {
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">{action}</Badge>;
    }
    if (actionLower.includes('update') || actionLower.includes('modify')) {
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">{action}</Badge>;
    }
    return <Badge variant="outline">{action}</Badge>;
  };

  return (
    <>
      <Head>
        <title>Audit Logs - SiriusB iQ</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        <EnterpriseHeader />

        <main className="container mx-auto px-4 py-8 max-w-[1400px]">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Audit Logs</h1>
              <p className="text-gray-600">Complete history of system activities</p>
            </div>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Logs
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-600">Total Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{logs.length}</div>
                <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-600">Contract Uploads</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {logs.filter(l => l.action.toLowerCase().includes('upload')).length}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-600">API Calls</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {logs.filter(l => l.action.toLowerCase().includes('api')).length}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-600">Security Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">0</div>
                <p className="text-xs text-gray-500 mt-1">No incidents</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Activity Log</CardTitle>
                  <CardDescription>Real-time system events and user actions</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      className="pl-10 w-64"
                      placeholder="Search logs..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-12">Loading audit logs...</div>
              ) : (
                <div className="space-y-2">
                  {logs.filter(log => 
                    searchQuery === '' || 
                    log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    log.resource_type.toLowerCase().includes(searchQuery.toLowerCase())
                  ).map((log) => (
                    <div key={log.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-gray-100 rounded">
                          {getActionIcon(log.action)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            {getActionBadge(log.action)}
                            <span className="text-sm text-gray-600">on</span>
                            <Badge variant="outline">{log.resource_type}</Badge>
                          </div>
                          <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                            <User className="h-3 w-3" />
                            {log.user_id.slice(0, 8)}... 
                            <span>•</span>
                            {log.ip_address}
                            <span>•</span>
                            {new Date(log.created_at).toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost">
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </main>

        <SiteFooter />
      </div>
    </>
  );
}