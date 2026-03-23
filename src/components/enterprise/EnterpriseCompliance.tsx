import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  CheckCircle2, 
  AlertTriangle, 
  Clock,
  FileText,
  Download,
  ExternalLink,
  Lock,
  Server,
  Key
} from "lucide-react";

interface ComplianceItem {
  id: string;
  name: string;
  status: "active" | "pending" | "expired";
  lastAudit: string;
  nextAudit: string;
  coverage: number;
  description: string;
}

export function EnterpriseCompliance() {
  const [certifications] = useState<ComplianceItem[]>([
    {
      id: "soc2",
      name: "SOC 2 Type II",
      status: "active",
      lastAudit: "2026-01-15",
      nextAudit: "2026-12-15",
      coverage: 100,
      description: "Security, availability, and confidentiality controls"
    },
    {
      id: "hipaa",
      name: "HIPAA Compliance",
      status: "active",
      lastAudit: "2026-01-10",
      nextAudit: "2026-07-10",
      coverage: 98,
      description: "Healthcare data protection and privacy"
    },
    {
      id: "iso27001",
      name: "ISO 27001",
      status: "pending",
      lastAudit: "2025-09-20",
      nextAudit: "2026-03-20",
      coverage: 85,
      description: "Information security management system"
    },
    {
      id: "gdpr",
      name: "GDPR Ready",
      status: "active",
      lastAudit: "2026-02-01",
      nextAudit: "2026-08-01",
      coverage: 100,
      description: "European data protection regulation"
    },
    {
      id: "pci-dss",
      name: "PCI DSS Level 1",
      status: "active",
      lastAudit: "2025-12-15",
      nextAudit: "2026-06-15",
      coverage: 95,
      description: "Payment card industry data security"
    }
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500 text-white gap-1"><CheckCircle2 className="h-3 w-3" />Active</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500 text-white gap-1"><Clock className="h-3 w-3" />Pending</Badge>;
      case "expired":
        return <Badge className="bg-red-500 text-white gap-1"><AlertTriangle className="h-3 w-3" />Expired</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Compliance & Security</h2>
          <p className="text-muted-foreground">Certifications, audits, and security posture</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Security Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-2 border-green-500/20 bg-green-500/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Certifications</CardTitle>
            <Shield className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {certifications.filter(c => c.status === "active").length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              All security standards met
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-blue-500/20 bg-blue-500/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Data Encryption</CardTitle>
            <Lock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">AES-256</div>
            <p className="text-xs text-muted-foreground mt-1">
              At rest & in transit
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-purple-500/20 bg-purple-500/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Score</CardTitle>
            <Server className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">A+</div>
            <p className="text-xs text-muted-foreground mt-1">
              Industry leading security
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Certifications */}
      <Card>
        <CardHeader>
          <CardTitle>Compliance Certifications</CardTitle>
          <CardDescription>
            Current status of all security and compliance certifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {certifications.map((cert) => (
            <div 
              key={cert.id}
              className="flex items-start gap-4 p-4 rounded-lg border hover:bg-accent transition-colors"
            >
              <div className="mt-1">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{cert.name}</h3>
                    <p className="text-sm text-muted-foreground">{cert.description}</p>
                  </div>
                  {getStatusBadge(cert.status)}
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Last Audit:</span>
                    <span className="ml-2 font-medium">
                      {new Date(cert.lastAudit).toLocaleDateString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Next Audit:</span>
                    <span className="ml-2 font-medium">
                      {new Date(cert.nextAudit).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Coverage</span>
                    <span className="font-medium">{cert.coverage}%</span>
                  </div>
                  <Progress value={cert.coverage} className="h-2" />
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <FileText className="h-3 w-3" />
                    View Certificate
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <ExternalLink className="h-3 w-3" />
                    Audit Report
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Security Features */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Data Protection
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">End-to-end Encryption</span>
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Data Loss Prevention</span>
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Automated Backups</span>
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Geo-redundancy</span>
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Access Control
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Multi-factor Authentication</span>
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Single Sign-On (SSO)</span>
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Role-based Access Control</span>
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Session Management</span>
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}