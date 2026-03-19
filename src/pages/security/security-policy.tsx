import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Eye, AlertTriangle, Server, FileText } from "lucide-react";

export default function SecurityPolicyPage() {
  return (
    <>
      <SEO 
        title="Security Policy - SiriusB iQ"
        description="Our comprehensive security policies and procedures based on NIST Cybersecurity Framework and industry best practices."
      />
      <div className="min-h-screen bg-background">
        <Nav />
        <main className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-600/10 mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-4xl font-bold">Security Policy</h1>
              <p className="text-muted-foreground text-lg">
                NIST Cybersecurity Framework Implementation
              </p>
              <div className="flex justify-center gap-2">
                <Badge variant="default" className="bg-green-600">SOC 2 Type II</Badge>
                <Badge variant="default" className="bg-blue-600">NIST CSF</Badge>
                <Badge variant="default" className="bg-purple-600">HIPAA</Badge>
              </div>
            </div>

            {/* Introduction */}
            <Card className="p-6">
              <p className="text-muted-foreground">
                SiriusB iQ AI Data Sciences Lab is committed to maintaining the highest standards of information security. 
                Our security program is built on the NIST Cybersecurity Framework (CSF) and implements controls from 
                NIST 800-53, ensuring comprehensive protection of customer data and systems.
              </p>
            </Card>

            {/* NIST CSF Core Functions */}
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Eye className="w-5 h-5 text-blue-600" />
                  <h3 className="font-bold">IDENTIFY</h3>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Asset Management (ID.AM)</li>
                  <li>• Risk Assessment (ID.RA)</li>
                  <li>• Governance (ID.GV)</li>
                </ul>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="w-5 h-5 text-green-600" />
                  <h3 className="font-bold">PROTECT</h3>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Access Control (PR.AC)</li>
                  <li>• Data Security (PR.DS)</li>
                  <li>• Protective Technology (PR.PT)</li>
                </ul>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  <h3 className="font-bold">DETECT</h3>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Anomalies & Events (DE.AE)</li>
                  <li>• Continuous Monitoring (DE.CM)</li>
                  <li>• Detection Processes (DE.DP)</li>
                </ul>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Server className="w-5 h-5 text-orange-600" />
                  <h3 className="font-bold">RESPOND</h3>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Response Planning (RS.RP)</li>
                  <li>• Communications (RS.CO)</li>
                  <li>• Analysis (RS.AN)</li>
                </ul>
              </Card>
            </div>

            {/* Technical Security Controls */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-6 h-6 text-green-600" />
                <h2 className="text-2xl font-bold">Technical Security Controls</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Encryption (NIST 800-53 SC-8, SC-13)</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Data at rest: AES-256 encryption via Supabase</li>
                    <li>• Data in transit: TLS 1.3 with HTTPS enforcement</li>
                    <li>• Database encryption with row-level security (RLS)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Access Control (NIST 800-53 AC-2, AC-3, AC-6)</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Multi-factor authentication (MFA) required</li>
                    <li>• Role-based access control (RBAC)</li>
                    <li>• Principle of least privilege enforced</li>
                    <li>• Session management with secure tokens</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Audit & Accountability (NIST 800-53 AU-2, AU-3, AU-12)</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Comprehensive audit logging of all security events</li>
                    <li>• User activity monitoring and tracking</li>
                    <li>• Log retention for compliance requirements</li>
                    <li>• Automated alerting for critical security events</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">System & Communications Protection (NIST 800-53 SC-7)</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Content Security Policy (CSP) headers</li>
                    <li>• HTTP Strict Transport Security (HSTS)</li>
                    <li>• X-Frame-Options protection against clickjacking</li>
                    <li>• Permissions Policy for browser features</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Incident Response */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
                <h2 className="text-2xl font-bold">Incident Response</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                Our incident response plan follows NIST 800-61 guidelines:
              </p>
              <ol className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-foreground">1. Preparation:</span>
                  <span>Incident response team, tools, and procedures established</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-foreground">2. Detection & Analysis:</span>
                  <span>24/7 monitoring and automated alerting systems</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-foreground">3. Containment:</span>
                  <span>Immediate isolation of affected systems</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-foreground">4. Eradication & Recovery:</span>
                  <span>Root cause removal and system restoration</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-foreground">5. Post-Incident:</span>
                  <span>Lessons learned and continuous improvement</span>
                </li>
              </ol>
            </Card>

            {/* Vulnerability Management */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Vulnerability Management</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Regular security assessments and penetration testing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Automated dependency scanning and updates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Code security reviews before production deployment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Responsible disclosure program for security researchers</span>
                </li>
              </ul>
            </Card>

            {/* Compliance */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold">Compliance & Certifications</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Security Frameworks</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• NIST Cybersecurity Framework (CSF)</li>
                    <li>• NIST 800-53 Security Controls</li>
                    <li>• SOC 2 Type II Certified</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Industry Compliance</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• HIPAA Privacy & Security Rules</li>
                    <li>• ERISA Fiduciary Standards</li>
                    <li>• State Privacy Laws (CCPA, etc.)</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Contact */}
            <Card className="p-6 bg-green-600/5 border-green-600/20">
              <h3 className="font-semibold mb-2">Security Contact</h3>
              <p className="text-sm text-muted-foreground mb-2">
                For security concerns or to report vulnerabilities:
              </p>
              <p className="text-sm">
                <strong>Email:</strong> security@siriusbiq.com
              </p>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}