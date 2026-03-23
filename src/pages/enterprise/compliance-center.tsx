import { useState } from "react";
import Head from "next/head";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EnterpriseHeader } from "@/components/enterprise/EnterpriseHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { 
  Shield, 
  CheckCircle, 
  Clock,
  AlertTriangle,
  FileText,
  Download,
  Award,
  Lock,
  Globe,
  Database,
  Eye,
  Users,
  Calendar
} from "lucide-react";

interface CompliancePackage {
  id: string;
  name: string;
  icon: any;
  status: "active" | "in-progress" | "available";
  progress: number;
  price: number;
  billingType: "one-time" | "annual";
  description: string;
  features: string[];
  deliverables: string[];
  timeline: string;
}

export default function ComplianceCenter() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const compliancePackages: CompliancePackage[] = [
    {
      id: "soc2",
      name: "SOC 2 Type II Certification",
      icon: Shield,
      status: "active",
      progress: 100,
      price: 15000,
      billingType: "one-time",
      description: "Full SOC 2 Type II audit preparation and certification assistance",
      features: [
        "Security controls audit",
        "Availability monitoring",
        "Processing integrity verification",
        "Confidentiality assessment",
        "Privacy compliance review",
        "Vendor management audit",
        "Incident response testing",
        "Annual re-certification support"
      ],
      deliverables: [
        "SOC 2 Type II Report",
        "Control documentation",
        "Evidence repository",
        "Audit readiness checklist"
      ],
      timeline: "12 weeks"
    },
    {
      id: "hipaa",
      name: "HIPAA Compliance Bundle",
      icon: Lock,
      status: "in-progress",
      progress: 67,
      price: 12000,
      billingType: "one-time",
      description: "Healthcare-specific compliance tools and Business Associate Agreement templates",
      features: [
        "HIPAA Security Rule compliance",
        "Privacy Rule implementation",
        "Breach notification procedures",
        "Business Associate Agreements",
        "PHI encryption validation",
        "Access control audit",
        "Training materials",
        "Annual risk assessment"
      ],
      deliverables: [
        "HIPAA compliance report",
        "BAA templates",
        "Security policies",
        "Staff training program"
      ],
      timeline: "8 weeks"
    },
    {
      id: "iso27001",
      name: "ISO 27001 Certification",
      icon: Award,
      status: "available",
      progress: 0,
      price: 25000,
      billingType: "one-time",
      description: "International information security management system certification",
      features: [
        "ISMS implementation",
        "Risk assessment framework",
        "Security controls catalog",
        "Management review process",
        "Internal audit program",
        "Corrective action procedures",
        "Continuous improvement",
        "Certification preparation"
      ],
      deliverables: [
        "ISO 27001 certificate",
        "ISMS documentation",
        "Security controls matrix",
        "Audit reports"
      ],
      timeline: "16 weeks"
    },
    {
      id: "gdpr",
      name: "GDPR Compliance Package",
      icon: Globe,
      status: "available",
      progress: 0,
      price: 10000,
      billingType: "one-time",
      description: "EU data privacy regulation compliance for international operations",
      features: [
        "Data mapping and inventory",
        "Privacy impact assessments",
        "Consent management system",
        "Data subject rights automation",
        "Cross-border transfer validation",
        "DPO appointment guidance",
        "Breach notification workflow",
        "Cookie consent implementation"
      ],
      deliverables: [
        "GDPR compliance report",
        "Privacy policies",
        "Data processing agreements",
        "Rights management system"
      ],
      timeline: "10 weeks"
    },
    {
      id: "pci-dss",
      name: "PCI-DSS Compliance",
      icon: Database,
      status: "available",
      progress: 0,
      price: 18000,
      billingType: "annual",
      description: "Payment card industry data security standards compliance",
      features: [
        "Network security assessment",
        "Cardholder data protection",
        "Vulnerability management",
        "Access control measures",
        "Security testing protocols",
        "Incident response plan",
        "Quarterly compliance scans",
        "Annual assessment"
      ],
      deliverables: [
        "PCI-DSS certification",
        "Attestation of Compliance (AOC)",
        "Scanning reports",
        "Remediation guidance"
      ],
      timeline: "12 weeks"
    },
    {
      id: "ccpa",
      name: "CCPA/CPRA Compliance",
      icon: Eye,
      status: "available",
      progress: 0,
      price: 8000,
      billingType: "one-time",
      description: "California Consumer Privacy Act compliance for US operations",
      features: [
        "Consumer rights automation",
        "Do Not Sell implementation",
        "Privacy notice generation",
        "Data sale disclosure",
        "Third-party audit trail",
        "Opt-out mechanisms",
        "Record-keeping system",
        "Annual reporting"
      ],
      deliverables: [
        "CCPA compliance report",
        "Privacy notices",
        "Consumer request portal",
        "Compliance documentation"
      ],
      timeline: "6 weeks"
    }
  ];

  const activeCompliance = compliancePackages.filter(p => p.status === "active");
  const inProgressCompliance = compliancePackages.filter(p => p.status === "in-progress");
  const availableCompliance = compliancePackages.filter(p => p.status === "available");

  const overallComplianceScore = Math.round(
    (activeCompliance.length / compliancePackages.length) * 100
  );

  const auditSchedule = [
    { date: "2026-06-15", type: "SOC 2 Type II", auditor: "Deloitte", status: "scheduled" },
    { date: "2026-09-01", type: "HIPAA Annual Review", auditor: "Internal", status: "scheduled" },
    { date: "2026-12-15", type: "ISO 27001 Surveillance", auditor: "BSI", status: "pending" }
  ];

  return (
    <>
      <Head>
        <title>Compliance Center - SiriusB iQ</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        <EnterpriseHeader />

        <main className="container mx-auto px-4 py-8 max-w-[1400px]">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Compliance Center</h1>
            <p className="text-gray-600">Enterprise security and regulatory compliance management</p>
          </div>

          {/* Compliance Score Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="col-span-1 md:col-span-2 border-l-4 border-l-blue-600">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-600">Overall Compliance Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6">
                  <div className="text-5xl font-bold text-blue-600">{overallComplianceScore}%</div>
                  <div className="flex-1">
                    <Progress value={overallComplianceScore} className="h-3 mb-2" />
                    <div className="text-sm text-gray-600">
                      {activeCompliance.length} of {compliancePackages.length} certifications active
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-600">Active Certifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">{activeCompliance.length}</div>
                <div className="text-sm text-gray-500 mt-1">Fully compliant</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-600">In Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-600">{inProgressCompliance.length}</div>
                <div className="text-sm text-gray-500 mt-1">Undergoing audit</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid grid-cols-4 w-full max-w-2xl">
              <TabsTrigger value="overview">
                <Shield className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="active">
                <CheckCircle className="h-4 w-4 mr-2" />
                Active
              </TabsTrigger>
              <TabsTrigger value="available">
                <Award className="h-4 w-4 mr-2" />
                Available
              </TabsTrigger>
              <TabsTrigger value="audits">
                <Calendar className="h-4 w-4 mr-2" />
                Audits
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Compliance Status Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {compliancePackages.map(pkg => (
                      <div key={pkg.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${
                            pkg.status === 'active' ? 'bg-green-100' :
                            pkg.status === 'in-progress' ? 'bg-orange-100' :
                            'bg-gray-100'
                          }`}>
                            <pkg.icon className={`h-5 w-5 ${
                              pkg.status === 'active' ? 'text-green-600' :
                              pkg.status === 'in-progress' ? 'text-orange-600' :
                              'text-gray-600'
                            }`} />
                          </div>
                          <div>
                            <div className="font-medium">{pkg.name}</div>
                            <div className="text-sm text-gray-500">{pkg.timeline} implementation</div>
                          </div>
                        </div>
                        <Badge variant="outline" className={
                          pkg.status === 'active' ? 'bg-green-50 text-green-700 border-green-200' :
                          pkg.status === 'in-progress' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                          'bg-gray-50 text-gray-700 border-gray-200'
                        }>
                          {pkg.status === 'active' ? 'Active' :
                           pkg.status === 'in-progress' ? `${pkg.progress}% Complete` :
                           'Available'}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Investment Summary</CardTitle>
                    <CardDescription>Compliance certification costs</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Total Investment (Active)</div>
                      <div className="text-3xl font-bold text-blue-600">
                        ${activeCompliance.reduce((sum, p) => sum + p.price, 0).toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {activeCompliance.length} certifications
                      </div>
                    </div>

                    <div className="p-4 bg-orange-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">In Progress</div>
                      <div className="text-3xl font-bold text-orange-600">
                        ${inProgressCompliance.reduce((sum, p) => sum + p.price, 0).toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {inProgressCompliance.length} certifications
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Available to Purchase</div>
                      <div className="text-3xl font-bold">
                        ${availableCompliance.reduce((sum, p) => sum + p.price, 0).toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {availableCompliance.length} certifications
                      </div>
                    </div>

                    <Button className="w-full">Purchase Compliance Package</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="active">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {activeCompliance.map(pkg => (
                  <Card key={pkg.id} className="border-2 border-green-200">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-3 bg-green-100 rounded-lg">
                            <pkg.icon className="h-6 w-6 text-green-600" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{pkg.name}</CardTitle>
                            <Badge className="bg-green-600 mt-1">Active</Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">{pkg.description}</p>
                      
                      <div className="space-y-2 mb-4">
                        <h4 className="font-semibold text-sm">Key Features:</h4>
                        {pkg.features.slice(0, 4).map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-2 mb-4">
                        <h4 className="font-semibold text-sm">Deliverables:</h4>
                        {pkg.deliverables.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <FileText className="h-4 w-4 text-blue-600" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1">
                          <Download className="h-4 w-4 mr-2" />
                          Download Report
                        </Button>
                        <Button variant="outline">View Details</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="available">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {availableCompliance.map(pkg => (
                  <Card key={pkg.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className="p-3 bg-gray-100 rounded-lg">
                          <pkg.icon className="h-6 w-6 text-gray-600" />
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">
                            ${(pkg.price / 1000).toFixed(0)}K
                          </div>
                          <div className="text-xs text-gray-500">{pkg.billingType}</div>
                        </div>
                      </div>
                      <CardTitle className="text-lg">{pkg.name}</CardTitle>
                      <CardDescription className="text-sm">{pkg.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-4">
                        {pkg.features.slice(0, 4).map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                        <div className="text-sm text-gray-500 pl-6">
                          +{pkg.features.length - 4} more features
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                        <Clock className="h-4 w-4" />
                        <span>{pkg.timeline} implementation</span>
                      </div>

                      <Button className="w-full">Purchase Package</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="audits">
              <Card>
                <CardHeader>
                  <CardTitle>Audit Schedule</CardTitle>
                  <CardDescription>Upcoming compliance audits and reviews</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {auditSchedule.map((audit, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-blue-100 rounded-lg">
                            <Calendar className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium">{audit.type}</div>
                            <div className="text-sm text-gray-600">
                              {new Date(audit.date).toLocaleDateString('en-US', { 
                                month: 'long', 
                                day: 'numeric', 
                                year: 'numeric' 
                              })}
                            </div>
                            <div className="text-sm text-gray-500">Auditor: {audit.auditor}</div>
                          </div>
                        </div>
                        <Badge variant="outline" className={
                          audit.status === 'scheduled' ? 'bg-green-50 text-green-700 border-green-200' :
                          'bg-gray-50 text-gray-700 border-gray-200'
                        }>
                          {audit.status}
                        </Badge>
                      </div>
                    ))}
                  </div>

                  <Button className="w-full mt-6" variant="outline">
                    Schedule New Audit
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>

        <SiteFooter />
      </div>
    </>
  );
}