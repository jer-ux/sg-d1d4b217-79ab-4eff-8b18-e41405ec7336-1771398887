import { useState } from "react";
import Head from "next/head";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Crown, Users, DollarSign, FileText, Briefcase, TrendingUp, Package, Settings, BookOpen, MessageSquare } from "lucide-react";

export default function PartnerPortalPage() {
  const [selectedTab, setSelectedTab] = useState("overview");

  const partnerStats = [
    { label: "Active Customers", value: "47", change: "+8 this month", icon: Users, color: "text-blue-600" },
    { label: "Monthly Revenue", value: "$94K", change: "+$18K vs last month", icon: DollarSign, color: "text-green-600" },
    { label: "Revenue Share", value: "$23.5K", change: "25% commission", icon: TrendingUp, color: "text-purple-600" },
    { label: "Active Resellers", value: "12", change: "Under your partnership", icon: Briefcase, color: "text-orange-600" }
  ];

  const clients = [
    {
      name: "Acme Healthcare Corp",
      status: "active",
      plan: "Enterprise Plus",
      seats: 150,
      mrr: "$12,500",
      your_share: "$3,125",
      contract_start: "2025-06-01",
      renewal_date: "2026-06-01",
      health_score: 95
    },
    {
      name: "MedTech Solutions",
      status: "active",
      plan: "Professional",
      seats: 45,
      mrr: "$3,750",
      your_share: "$937.50",
      contract_start: "2025-09-15",
      renewal_date: "2026-09-15",
      health_score: 88
    },
    {
      name: "Global Pharma Inc",
      status: "trial",
      plan: "Enterprise (Trial)",
      seats: 200,
      mrr: "$0 (trial)",
      your_share: "$0 (pending)",
      contract_start: "2026-03-01",
      renewal_date: null,
      health_score: 72
    }
  ];

  const whiteLabel = {
    company_name: "Your Healthcare Analytics",
    logo_url: "/your-logo.png",
    primary_color: "#0066CC",
    domain: "analytics.yourcompany.com",
    support_email: "support@yourcompany.com",
    custom_onboarding: true,
    co_branded: false
  };

  const resources = [
    { title: "Partner Sales Playbook", type: "PDF", url: "#" },
    { title: "Product Demo Videos", type: "Video Series", url: "#" },
    { title: "ROI Calculator Template", type: "Excel", url: "#" },
    { title: "Pricing & Packaging Guide", type: "PDF", url: "#" },
    { title: "Competitive Battlecards", type: "PDF", url: "#" },
    { title: "Technical Architecture Docs", type: "Documentation", url: "#" }
  ];

  const subResellers = [
    { name: "Healthcare Consulting Partners", clients: 8, mrr: "$24K", your_share: "$4.8K", status: "active" },
    { name: "Benefits Advisory Group", clients: 12, mrr: "$38K", your_share: "$7.6K", status: "active" },
    { name: "Strategic Benefits LLC", clients: 6, mrr: "$15K", your_share: "$3K", status: "active" },
    { name: "Compliance Experts Inc", clients: 4, mrr: "$12K", your_share: "$2.4K", status: "onboarding" }
  ];

  return (
    <>
      <Head>
        <title>Partner Portal - White-Label Reseller Hub | SiriusB iQ</title>
        <meta name="description" content="Manage your white-label reseller business and client portfolio" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-slate-100">
        <SiteHeader />

        <main className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Crown className="h-8 w-8 text-purple-600" />
                <div>
                  <h1 className="text-4xl font-bold">Partner Portal</h1>
                  <p className="text-lg text-muted-foreground mt-1">
                    White-Label Reseller Program
                  </p>
                </div>
              </div>
              <Badge variant="default" className="bg-purple-600 text-lg px-4 py-2">
                STRATEGIC PARTNER
              </Badge>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {partnerStats.map((stat) => (
              <Card key={stat.label}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    <p className="text-sm text-green-600 font-medium">{stat.change}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold mt-1">{stat.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="clients">My Clients</TabsTrigger>
              <TabsTrigger value="white-label">White-Label</TabsTrigger>
              <TabsTrigger value="sub-resellers">Sub-Resellers</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="support">Support</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Revenue Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Breakdown (This Month)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                      <span className="text-sm">Direct Client Revenue</span>
                      <span className="font-bold text-blue-600">$58,000</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                      <span className="text-sm">Sub-Reseller Revenue</span>
                      <span className="font-bold text-purple-600">$36,000</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                      <span className="text-sm">Total Client Base MRR</span>
                      <span className="font-bold text-green-600">$94,000</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg">
                      <span className="font-bold">Your Revenue Share (25%)</span>
                      <span className="font-bold text-2xl">$23,500</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Performance Metrics */}
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Avg Deal Size</span>
                        <span className="font-semibold">$2,000/month</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Win Rate</span>
                        <span className="font-semibold text-green-600">72%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Client Retention</span>
                        <span className="font-semibold text-green-600">94%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Net Revenue Retention</span>
                        <span className="font-semibold text-green-600">128%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Avg Customer LTV</span>
                        <span className="font-semibold text-purple-600">$72K</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <p className="text-sm text-muted-foreground mb-2">Partner Tier Progress</p>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-slate-200 rounded-full h-3">
                          <div className="bg-purple-600 h-3 rounded-full" style={{ width: "78%" }}></div>
                        </div>
                        <span className="text-sm font-semibold">78%</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        13 more clients to reach Elite Partner tier (60+ clients)
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-3">
                    <Button className="h-auto py-4 flex-col gap-2">
                      <Users className="h-5 w-5" />
                      <span className="text-sm">Add Client</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                      <Package className="h-5 w-5" />
                      <span className="text-sm">Generate Proposal</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                      <FileText className="h-5 w-5" />
                      <span className="text-sm">Download Contract</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                      <MessageSquare className="h-5 w-5" />
                      <span className="text-sm">Contact Support</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">New client onboarded</p>
                        <p className="text-xs text-muted-foreground">Global Pharma Inc started trial - 2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">Upsell opportunity</p>
                        <p className="text-xs text-muted-foreground">Acme Healthcare at 92% seat utilization - Yesterday</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className="h-2 w-2 bg-purple-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">Commission payout processed</p>
                        <p className="text-xs text-muted-foreground">$21,200 paid to your account - 3 days ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="clients" className="space-y-6">
              {clients.map((client, idx) => (
                <Card key={idx} className="border-2">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-3">
                          {client.name}
                          <Badge variant={client.status === "active" ? "default" : "secondary"}>
                            {client.status}
                          </Badge>
                        </CardTitle>
                        <CardDescription className="mt-2">{client.plan} • {client.seats} seats</CardDescription>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">{client.your_share}</p>
                        <p className="text-sm text-muted-foreground">Your Monthly Share</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Their MRR</p>
                        <p className="font-semibold">{client.mrr}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Contract Start</p>
                        <p className="font-semibold">{client.contract_start}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Renewal Date</p>
                        <p className="font-semibold">{client.renewal_date || "N/A"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Health Score</p>
                        <p className={`font-semibold ${client.health_score >= 90 ? "text-green-600" : client.health_score >= 75 ? "text-yellow-600" : "text-red-600"}`}>
                          {client.health_score}/100
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">View Details</Button>
                      <Button size="sm" variant="outline">Generate Report</Button>
                      <Button size="sm" variant="outline">Contact Client</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="white-label" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>White-Label Configuration</CardTitle>
                  <CardDescription>Customize the platform with your branding</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Company Name</label>
                      <Input value={whiteLabel.company_name} placeholder="Your Healthcare Analytics" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Custom Domain</label>
                      <Input value={whiteLabel.domain} placeholder="analytics.yourcompany.com" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Primary Brand Color</label>
                      <div className="flex gap-2">
                        <Input value={whiteLabel.primary_color} placeholder="#0066CC" />
                        <div className="h-10 w-20 rounded border" style={{ backgroundColor: whiteLabel.primary_color }}></div>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Support Email</label>
                      <Input value={whiteLabel.support_email} placeholder="support@yourcompany.com" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Custom Onboarding Flow</p>
                        <p className="text-sm text-muted-foreground">Use your own onboarding videos and docs</p>
                      </div>
                      <Badge variant="default">ENABLED</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Remove SiriusB Branding</p>
                        <p className="text-sm text-muted-foreground">Hide "Powered by SiriusB" from all pages</p>
                      </div>
                      <Badge variant="default">ENABLED</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Custom Email Templates</p>
                        <p className="text-sm text-muted-foreground">Branded emails for notifications and reports</p>
                      </div>
                      <Badge variant="default">ENABLED</Badge>
                    </div>
                  </div>

                  <Button className="w-full">
                    <Settings className="mr-2 h-4 w-4" />
                    Save White-Label Settings
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Preview Your White-Label Portal</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-slate-100 rounded-lg flex items-center justify-center border-2 border-dashed">
                    <div className="text-center">
                      <Package className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                      <p className="text-muted-foreground">White-label preview will appear here</p>
                      <Button className="mt-4" variant="outline">Generate Preview</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sub-resellers" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Sub-Reseller Network</CardTitle>
                  <CardDescription>Manage partners who resell under your white-label</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {subResellers.map((reseller, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-semibold">{reseller.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {reseller.clients} clients • {reseller.mrr} MRR
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">{reseller.your_share}</p>
                        <p className="text-xs text-muted-foreground">Your share (20%)</p>
                        <Badge variant={reseller.status === "active" ? "default" : "secondary"} className="mt-2">
                          {reseller.status}
                        </Badge>
                      </div>
                    </div>
                  ))}

                  <Button className="w-full mt-4" variant="outline">
                    <Users className="mr-2 h-4 w-4" />
                    Invite New Sub-Reseller
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sub-Reseller Program Benefits</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3 p-3 border rounded-lg">
                    <DollarSign className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">20% Revenue Share</p>
                      <p className="text-xs text-muted-foreground">Earn recurring revenue on all sub-reseller deals</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 border rounded-lg">
                    <Crown className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">White-Label Rights</p>
                      <p className="text-xs text-muted-foreground">Sub-resellers can use your branded platform</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 border rounded-lg">
                    <TrendingUp className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Exponential Growth</p>
                      <p className="text-xs text-muted-foreground">Scale through partners without managing every client</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="resources" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Partner Resources</CardTitle>
                  <CardDescription>Sales enablement materials and documentation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {resources.map((resource, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-4 border rounded-lg hover:bg-slate-50 cursor-pointer">
                        <BookOpen className="h-5 w-5 text-blue-600" />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{resource.title}</p>
                          <p className="text-xs text-muted-foreground">{resource.type}</p>
                        </div>
                        <Button size="sm" variant="outline">Download</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Training & Certification</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-medium">Partner Sales Certification</p>
                        <p className="text-sm text-muted-foreground">4 modules • 2 hours</p>
                      </div>
                      <Badge variant="default" className="bg-green-600">COMPLETED</Badge>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: "100%" }}></div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-medium">Advanced Technical Training</p>
                        <p className="text-sm text-muted-foreground">6 modules • 3 hours</p>
                      </div>
                      <Badge variant="secondary">IN PROGRESS</Badge>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: "66%" }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="support" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Dedicated Partner Manager</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                        SM
                      </div>
                      <div>
                        <p className="font-semibold">Sarah Mitchell</p>
                        <p className="text-sm text-muted-foreground">Strategic Partner Manager</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Button className="w-full" variant="outline">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Schedule Call
                      </Button>
                      <Button className="w-full" variant="outline">
                        Send Message
                      </Button>
                    </div>
                    <div className="pt-3 border-t text-sm text-muted-foreground">
                      <p>📧 sarah.mitchell@siriusb.ai</p>
                      <p>📞 +1 (415) 555-0123</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Support Tickets</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between mb-2">
                        <p className="font-medium text-sm">White-label domain setup</p>
                        <Badge variant="default" className="bg-green-600">RESOLVED</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">Ticket #4521 • Resolved 2 days ago</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between mb-2">
                        <p className="font-medium text-sm">Commission payout question</p>
                        <Badge variant="secondary">IN PROGRESS</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">Ticket #4589 • Opened 3 hours ago</p>
                    </div>
                    <Button className="w-full mt-3" variant="outline">
                      Open New Ticket
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Partner Community</CardTitle>
                  <CardDescription>Connect with other resellers and share best practices</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-4 border rounded-lg hover:bg-slate-50 cursor-pointer">
                      <p className="font-medium text-sm mb-1">Monthly Partner Webinar</p>
                      <p className="text-xs text-muted-foreground">Next session: April 15, 2026 at 2:00 PM PT</p>
                    </div>
                    <div className="p-4 border rounded-lg hover:bg-slate-50 cursor-pointer">
                      <p className="font-medium text-sm mb-1">Partner Slack Channel</p>
                      <p className="text-xs text-muted-foreground">Join #partner-success for real-time help</p>
                    </div>
                    <div className="p-4 border rounded-lg hover:bg-slate-50 cursor-pointer">
                      <p className="font-medium text-sm mb-1">Quarterly Business Review</p>
                      <p className="text-xs text-muted-foreground">Schedule your Q2 review with your partner manager</p>
                    </div>
                  </div>
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