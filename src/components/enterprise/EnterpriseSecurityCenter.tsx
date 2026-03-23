import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Shield,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  TrendingUp,
  Activity,
  Lock,
  Key,
  Users,
  Database,
  Zap
} from "lucide-react";

interface SecurityMetrics {
  score: number;
  threats: { blocked: number; active: number };
  vulnerabilities: { critical: number; high: number; medium: number; low: number };
  compliance: { passed: number; total: number };
}

export function EnterpriseSecurityCenter() {
  const [metrics, setMetrics] = useState<SecurityMetrics>({
    score: 98,
    threats: { blocked: 1247, active: 0 },
    vulnerabilities: { critical: 0, high: 1, medium: 3, low: 8 },
    compliance: { passed: 47, total: 50 }
  });

  const [incidents, setIncidents] = useState([
    {
      id: "inc-001",
      severity: "high",
      type: "Failed Login Attempts",
      count: 15,
      status: "investigating",
      timestamp: new Date(Date.now() - 3600000)
    },
    {
      id: "inc-002",
      severity: "medium",
      type: "Unusual API Activity",
      count: 3,
      status: "resolved",
      timestamp: new Date(Date.now() - 7200000)
    }
  ]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-500 text-white";
      case "high": return "bg-orange-500 text-white";
      case "medium": return "bg-yellow-500 text-white";
      case "low": return "bg-blue-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "resolved": return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "investigating": return <Clock className="h-4 w-4 text-yellow-500" />;
      case "active": return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Security Center</h2>
          <p className="text-muted-foreground">Real-time security monitoring and threat detection</p>
        </div>
        <Button className="gap-2">
          <Shield className="h-4 w-4" />
          Run Security Scan
        </Button>
      </div>

      {/* Security Score */}
      <Card className="border-2 border-green-500/20 bg-green-500/5">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Shield className="h-8 w-8 text-green-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Overall Security Score</p>
                  <p className="text-4xl font-bold text-green-600">{metrics.score}%</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Your security posture is excellent
              </p>
            </div>
            <div className="text-right space-y-2">
              <Badge className="bg-green-500 text-white">
                <TrendingUp className="h-3 w-3 mr-1" />
                +2.3% this month
              </Badge>
              <p className="text-xs text-muted-foreground">Industry avg: 87%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Threats Blocked</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.threats.blocked}</div>
            <p className="text-xs text-muted-foreground">
              {metrics.threats.active} active threats
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Vulnerabilities</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.vulnerabilities.critical}</div>
            <p className="text-xs text-muted-foreground">
              {metrics.vulnerabilities.high} high priority
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((metrics.compliance.passed / metrics.compliance.total) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {metrics.compliance.passed}/{metrics.compliance.total} checks passed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Scan</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2h ago</div>
            <p className="text-xs text-muted-foreground">
              Next scan in 6 hours
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Tabs */}
      <Tabs defaultValue="incidents" className="space-y-4">
        <TabsList>
          <TabsTrigger value="incidents">Security Incidents</TabsTrigger>
          <TabsTrigger value="vulnerabilities">Vulnerabilities</TabsTrigger>
          <TabsTrigger value="access">Access Control</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="incidents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Security Incidents</CardTitle>
              <CardDescription>
                Detected security events requiring attention
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {incidents.map((incident) => (
                <div
                  key={incident.id}
                  className="flex items-start gap-4 p-4 rounded-lg border hover:bg-accent transition-colors"
                >
                  <div className="mt-1">{getStatusIcon(incident.status)}</div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{incident.type}</p>
                      <Badge className={getSeverityColor(incident.severity)}>
                        {incident.severity}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{incident.count} events detected</span>
                      <span>•</span>
                      <span>{incident.timestamp.toLocaleString()}</span>
                      <span>•</span>
                      <span className="capitalize">{incident.status}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">View Details</Button>
                      <Button variant="outline" size="sm">Investigate</Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vulnerabilities" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Vulnerability Distribution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      Critical
                    </span>
                    <span className="font-medium">{metrics.vulnerabilities.critical}</span>
                  </div>
                  <Progress value={0} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                      High
                    </span>
                    <span className="font-medium">{metrics.vulnerabilities.high}</span>
                  </div>
                  <Progress value={8} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      Medium
                    </span>
                    <span className="font-medium">{metrics.vulnerabilities.medium}</span>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      Low
                    </span>
                    <span className="font-medium">{metrics.vulnerabilities.low}</span>
                  </div>
                  <Progress value={67} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Remediation Timeline</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Immediate Action</p>
                    <p className="text-sm text-muted-foreground">Critical vulnerabilities</p>
                  </div>
                  <Badge variant="destructive">{metrics.vulnerabilities.critical}</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">This Week</p>
                    <p className="text-sm text-muted-foreground">High priority issues</p>
                  </div>
                  <Badge className="bg-orange-500 text-white">{metrics.vulnerabilities.high}</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">This Month</p>
                    <p className="text-sm text-muted-foreground">Medium & low priority</p>
                  </div>
                  <Badge variant="secondary">
                    {metrics.vulnerabilities.medium + metrics.vulnerabilities.low}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="access" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Access Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Active Sessions</span>
                  <Badge>142</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">MFA Enabled</span>
                  <Badge className="bg-green-500 text-white">89%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">SSO Users</span>
                  <Badge variant="secondary">67%</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  API Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Active Keys</span>
                  <Badge>24</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Rotated This Month</span>
                  <Badge className="bg-green-500 text-white">8</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Expired Keys</span>
                  <Badge variant="destructive">0</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Data Access
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Encryption</span>
                  <Badge className="bg-green-500 text-white">AES-256</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Backups</span>
                  <Badge className="bg-green-500 text-white">Daily</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Data Residency</span>
                  <Badge variant="secondary">US-East</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Real-time Security Monitoring</CardTitle>
              <CardDescription>
                Continuous threat detection and anomaly analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg">
                <div className="text-center">
                  <Activity className="h-16 w-16 mx-auto mb-4 text-blue-500 opacity-50 animate-pulse" />
                  <p className="text-muted-foreground">Live security monitoring dashboard</p>
                  <p className="text-sm text-muted-foreground">Real-time threat detection active</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}