import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Shield, Lock, Eye, FileText } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <>
      <SEO 
        title="Privacy Policy - SiriusB iQ"
        description="Our commitment to protecting your data privacy and security in compliance with NIST Privacy Framework."
      />
      <div className="min-h-screen bg-background">
        <Nav />
        <main className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600/10 mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h1 className="text-4xl font-bold">Privacy Policy</h1>
              <p className="text-muted-foreground text-lg">
                Last Updated: March 19, 2026
              </p>
            </div>

            {/* Introduction */}
            <Card className="p-6">
              <p className="text-muted-foreground">
                At SiriusB iQ AI Data Sciences Lab, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data in accordance with the NIST Privacy Framework and applicable data protection regulations including HIPAA, ERISA, and SOC 2 requirements.
              </p>
            </Card>

            {/* NIST Privacy Framework Compliance */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold">NIST Privacy Framework Compliance</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                Our privacy practices align with the NIST Privacy Framework Core Functions:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Identify-P:</strong> We maintain comprehensive data inventories and understand privacy risks</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Govern-P:</strong> We have established privacy governance and risk management policies</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Control-P:</strong> We implement technical and policy controls to manage privacy risks</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Communicate-P:</strong> We maintain transparency about our privacy practices</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Protect-P:</strong> We safeguard data through technical, administrative, and physical controls</span>
                </li>
              </ul>
            </Card>

            {/* Information We Collect */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Account Information</h3>
                  <p>Name, email address, company information, and authentication credentials</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Healthcare Data</h3>
                  <p>Claims data, actuarial information, benefits data (protected under HIPAA)</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Usage Information</h3>
                  <p>Platform interactions, feature usage, audit logs (NIST AU-2, AU-3)</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Technical Information</h3>
                  <p>IP addresses, browser types, device information for security monitoring</p>
                </div>
              </div>
            </Card>

            {/* Data Security */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-6 h-6 text-green-600" />
                <h2 className="text-2xl font-bold">Data Security Measures</h2>
              </div>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span><strong>Encryption:</strong> AES-256 encryption at rest, TLS 1.3 in transit (NIST 800-53 SC-8, SC-13)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span><strong>Access Controls:</strong> Role-based access control (RBAC) and multi-factor authentication (NIST 800-53 AC-2, AC-3)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span><strong>Audit Logging:</strong> Comprehensive activity logs for security monitoring (NIST 800-53 AU-2, AU-3, AU-12)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span><strong>Data Minimization:</strong> We collect only necessary data and retain it only as long as required</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span><strong>Regular Audits:</strong> SOC 2 Type II certified security practices</span>
                </li>
              </ul>
            </Card>

            {/* Data Usage */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-6 h-6 text-purple-600" />
                <h2 className="text-2xl font-bold">How We Use Your Data</h2>
              </div>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>Provide and improve our platform services</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>Generate analytics and insights for benefits optimization</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>Ensure security and prevent fraud</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>Comply with legal and regulatory requirements</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>Communicate important updates and notifications</span>
                </li>
              </ul>
            </Card>

            {/* Your Rights */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Your Privacy Rights</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Access:</strong> Request access to your personal data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Correction:</strong> Request correction of inaccurate data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Deletion:</strong> Request deletion of your data (subject to legal retention requirements)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Portability:</strong> Request a copy of your data in machine-readable format</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Opt-out:</strong> Opt-out of certain data processing activities</span>
                </li>
              </ul>
            </Card>

            {/* Contact */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="text-muted-foreground mb-4">
                For privacy-related questions, concerns, or to exercise your rights, please contact:
              </p>
              <div className="space-y-2 text-muted-foreground">
                <p><strong>Privacy Officer</strong></p>
                <p>Email: privacy@siriusbiq.com</p>
                <p>Address: SiriusB iQ AI Data Sciences Lab</p>
              </div>
            </Card>

            {/* Compliance Frameworks */}
            <Card className="p-6 bg-blue-600/5 border-blue-600/20">
              <h3 className="font-semibold mb-2">Compliance Frameworks</h3>
              <p className="text-sm text-muted-foreground">
                Our privacy practices comply with: NIST Privacy Framework, NIST 800-53, HIPAA Privacy Rule, 
                ERISA Section 408(b)(2), SOC 2 Type II, and applicable state privacy laws.
              </p>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}