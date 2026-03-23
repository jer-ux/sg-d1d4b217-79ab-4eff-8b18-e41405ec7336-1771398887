import { useState } from "react";
import Head from "next/head";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Users, Gift, DollarSign, TrendingUp, Link2, Mail, Twitter, Linkedin, Copy, CheckCircle2, Crown, Star } from "lucide-react";

export default function ReferralProgramPage() {
  const [copied, setCopied] = useState(false);
  const [selectedTier, setSelectedTier] = useState<string>("ambassador");

  const referralCode = "SIRIUSB-ENT-247";
  const referralLink = `https://siriusb.ai/signup?ref=${referralCode}`;

  const stats = [
    { label: "Total Referrals", value: "47", change: "+12 this month", icon: Users, color: "text-blue-600" },
    { label: "Active Customers", value: "23", change: "48.9% conversion", icon: CheckCircle2, color: "text-green-600" },
    { label: "Commission Earned", value: "$18,450", change: "+$4,200 this month", icon: DollarSign, color: "text-purple-600" },
    { label: "Lifetime Value", value: "$127K", change: "Projected over 3 years", icon: TrendingUp, color: "text-orange-600" }
  ];

  const referralTiers = [
    {
      id: "standard",
      name: "Standard Referrer",
      icon: Gift,
      requirements: "0-5 referrals",
      commission: "10% recurring",
      bonuses: "$500 per deal",
      features: [
        "10% of customer's monthly payment",
        "$500 bonus per signed customer",
        "Commission for 12 months",
        "Standard support"
      ],
      currentCount: 0,
      color: "bg-slate-100 border-slate-300"
    },
    {
      id: "ambassador",
      name: "Brand Ambassador",
      icon: Star,
      requirements: "6-20 referrals",
      commission: "15% recurring",
      bonuses: "$1,000 per deal",
      features: [
        "15% of customer's monthly payment",
        "$1,000 bonus per signed customer",
        "Commission for 24 months",
        "Priority support",
        "Co-marketing opportunities",
        "Early access to new features"
      ],
      currentCount: 23,
      color: "bg-blue-100 border-blue-300"
    },
    {
      id: "partner",
      name: "Strategic Partner",
      icon: Crown,
      requirements: "20+ referrals",
      commission: "20% recurring",
      bonuses: "$2,500 per deal",
      features: [
        "20% of customer's monthly payment",
        "$2,500 bonus per signed customer",
        "Lifetime commission (no expiry)",
        "Dedicated partner manager",
        "Joint go-to-market programs",
        "Revenue share on upsells",
        "Exclusive partner portal access",
        "Quarterly business reviews"
      ],
      currentCount: 0,
      color: "bg-purple-100 border-purple-300"
    }
  ];

  const referrals = [
    {
      name: "Acme Healthcare",
      email: "john@acmehealthcare.com",
      status: "active",
      plan: "Enterprise",
      referred_date: "2026-01-15",
      closed_date: "2026-02-01",
      mrr: "$5,000",
      your_commission: "$750/month",
      lifetime_commission: "$18,000",
      tier: "ambassador"
    },
    {
      name: "TechCorp Industries",
      email: "sarah@techcorp.com",
      status: "active",
      plan: "Professional",
      referred_date: "2026-02-10",
      closed_date: "2026-02-28",
      mrr: "$1,250",
      your_commission: "$187.50/month",
      lifetime_commission: "$4,500",
      tier: "ambassador"
    },
    {
      name: "StartupXYZ",
      email: "mike@startupxyz.com",
      status: "trial",
      plan: "Professional",
      referred_date: "2026-03-01",
      closed_date: null,
      mrr: "$1,250",
      your_commission: "$0 (pending)",
      lifetime_commission: "$4,500 (potential)",
      tier: "ambassador"
    },
    {
      name: "Global Pharma Ltd",
      email: "lisa@globalpharma.com",
      status: "active",
      plan: "Enterprise Plus",
      referred_date: "2025-12-01",
      closed_date: "2025-12-15",
      mrr: "$8,333",
      your_commission: "$1,250/month",
      lifetime_commission: "$30,000",
      tier: "ambassador"
    },
    {
      name: "Finance Partners",
      email: "david@financepartners.com",
      status: "churned",
      plan: "Professional",
      referred_date: "2025-11-15",
      closed_date: "2025-12-01",
      mrr: "$0",
      your_commission: "$0",
      lifetime_commission: "$2,500 (earned)",
      tier: "ambassador"
    }
  ];

  const commissionHistory = [
    { month: "March 2026", amount: "$4,200", status: "pending", payout_date: "2026-04-15" },
    { month: "February 2026", amount: "$3,850", status: "paid", payout_date: "2026-03-15" },
    { month: "January 2026", amount: "$3,600", status: "paid", payout_date: "2026-02-15" },
    { month: "December 2025", amount: "$3,200", status: "paid", payout_date: "2026-01-15" },
    { month: "November 2025", amount: "$2,800", status: "paid", payout_date: "2025-12-15" }
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Head>
        <title>Referral Program - Partner Revenue Sharing | SiriusB iQ</title>
        <meta name="description" content="Earn recurring commissions by referring enterprise customers" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-slate-100">
        <SiteHeader />

        <main className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Gift className="h-8 w-8 text-purple-600" />
              <h1 className="text-4xl font-bold">Referral Program</h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Earn recurring revenue by referring enterprise customers. Up to 20% commission + bonuses.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
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

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="referrals">My Referrals</TabsTrigger>
              <TabsTrigger value="commissions">Commission History</TabsTrigger>
              <TabsTrigger value="tiers">Tier Benefits</TabsTrigger>
              <TabsTrigger value="share">Share & Promote</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Current Tier Status */}
              <Card className="border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-purple-50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-3 text-2xl">
                        <Star className="h-6 w-6 text-blue-600" />
                        Brand Ambassador Tier
                        <Badge variant="default" className="bg-blue-600">ACTIVE</Badge>
                      </CardTitle>
                      <CardDescription className="mt-2 text-base">
                        You're earning 15% recurring commission + $1,000 per deal
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-blue-600">23/20</p>
                      <p className="text-sm text-muted-foreground">Active Referrals</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="p-4 bg-white rounded-lg shadow-sm">
                      <p className="text-sm text-muted-foreground mb-1">Monthly Commission</p>
                      <p className="text-2xl font-bold text-green-600">$2,187.50</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg shadow-sm">
                      <p className="text-sm text-muted-foreground mb-1">Sign-Up Bonuses (YTD)</p>
                      <p className="text-2xl font-bold text-purple-600">$23,000</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg shadow-sm">
                      <p className="text-sm text-muted-foreground mb-1">Total Earned (All-Time)</p>
                      <p className="text-2xl font-bold text-blue-600">$127,450</p>
                    </div>
                  </div>

                  <div className="p-4 bg-purple-100 border border-purple-300 rounded-lg">
                    <p className="font-semibold text-purple-900 mb-2">
                      🎉 You're 3 referrals away from Strategic Partner tier!
                    </p>
                    <p className="text-sm text-purple-800">
                      Unlock 20% commission + $2,500 bonuses + lifetime revenue share
                    </p>
                    <Button className="mt-3 bg-purple-600 hover:bg-purple-700">
                      View Partner Benefits
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Metrics */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Conversion Funnel</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Link Clicks</span>
                      <span className="font-bold">234</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Sign-Ups</span>
                      <span className="font-bold">47 (20.1%)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Trial Conversions</span>
                      <span className="font-bold">31 (66.0%)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Paying Customers</span>
                      <span className="font-bold text-green-600">23 (48.9%)</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Top Performing Channels</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Linkedin className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">LinkedIn</span>
                      </div>
                      <span className="font-bold">18 referrals</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Email</span>
                      </div>
                      <span className="font-bold">12 referrals</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Twitter className="h-4 w-4 text-blue-400" />
                        <span className="text-sm">Twitter</span>
                      </div>
                      <span className="font-bold">9 referrals</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Link2 className="h-4 w-4 text-purple-600" />
                        <span className="text-sm">Direct Link</span>
                      </div>
                      <span className="font-bold">8 referrals</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="referrals" className="space-y-6">
              {referrals.map((referral, idx) => (
                <Card key={idx} className="border-2">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-3">
                          {referral.name}
                          <Badge variant={referral.status === "active" ? "default" : referral.status === "trial" ? "secondary" : "outline"}>
                            {referral.status}
                          </Badge>
                        </CardTitle>
                        <CardDescription className="mt-2">
                          {referral.email} • {referral.plan} Plan
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">{referral.your_commission}</p>
                        <p className="text-sm text-muted-foreground">Your Commission</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Referred Date</p>
                        <p className="font-semibold">{referral.referred_date}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Closed Date</p>
                        <p className="font-semibold">{referral.closed_date || "Pending"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Their MRR</p>
                        <p className="font-semibold">{referral.mrr}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Lifetime Commission</p>
                        <p className="font-semibold text-purple-600">{referral.lifetime_commission}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="commissions" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Commission Payment History</CardTitle>
                    <Button>Request Payout</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {commissionHistory.map((payment, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-semibold">{payment.month}</p>
                          <p className="text-sm text-muted-foreground">
                            Payout date: {payment.payout_date}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold">{payment.amount}</p>
                          <Badge variant={payment.status === "paid" ? "default" : "secondary"}>
                            {payment.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-semibold">Next Payout (April 15, 2026)</span>
                      <span className="text-2xl font-bold text-blue-600">$4,200</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Pending commissions from March 2026 activity
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tiers" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                {referralTiers.map((tier) => (
                  <Card key={tier.id} className={`border-2 ${tier.id === "ambassador" ? "ring-2 ring-blue-500" : ""} ${tier.color}`}>
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <tier.icon className={`h-8 w-8 ${tier.id === "partner" ? "text-purple-600" : tier.id === "ambassador" ? "text-blue-600" : "text-slate-600"}`} />
                        <CardTitle>{tier.name}</CardTitle>
                      </div>
                      {tier.id === "ambassador" && (
                        <Badge className="w-fit bg-blue-600">YOUR CURRENT TIER</Badge>
                      )}
                      <CardDescription className="mt-2">
                        {tier.requirements}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 bg-white rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Commission Rate</p>
                        <p className="text-2xl font-bold text-green-600">{tier.commission}</p>
                      </div>
                      <div className="p-4 bg-white rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Sign-Up Bonus</p>
                        <p className="text-2xl font-bold text-purple-600">{tier.bonuses}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="font-semibold text-sm">Benefits:</p>
                        {tier.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                      {tier.id === "partner" && (
                        <Button className="w-full bg-purple-600 hover:bg-purple-700">
                          Unlock Partner Tier (3 more referrals)
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="share" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Referral Link</CardTitle>
                  <CardDescription>Share this link to earn commissions on new customers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input value={referralLink} readOnly className="font-mono" />
                    <Button onClick={handleCopyLink} variant="outline">
                      {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-4 gap-3">
                    <Button variant="outline" className="gap-2">
                      <Mail className="h-4 w-4" />
                      Email
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Twitter className="h-4 w-4" />
                      Twitter
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Link2 className="h-4 w-4" />
                      Copy Link
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pre-Written Social Posts</CardTitle>
                  <CardDescription>Copy and paste these templates to promote SiriusB iQ</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <p className="font-semibold mb-2">LinkedIn Post</p>
                    <p className="text-sm text-muted-foreground italic mb-3">
                      "Just saved our team 200+ hours analyzing PBM contracts with @SiriusBiQ's AI platform. Game-changing transparency for healthcare benefits. Check it out: {referralLink}"
                    </p>
                    <Button variant="outline" size="sm">Copy Post</Button>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <p className="font-semibold mb-2">Twitter/X Post</p>
                    <p className="text-sm text-muted-foreground italic mb-3">
                      "Healthcare CFOs: Stop overpaying PBMs. @SiriusBiQ's AI finds hidden costs in minutes. Worth every penny. {referralLink}"
                    </p>
                    <Button variant="outline" size="sm">Copy Post</Button>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <p className="font-semibold mb-2">Email Template</p>
                    <p className="text-sm text-muted-foreground italic mb-3">
                      Subject: "Cut your benefits costs by 20%+ with AI"<br /><br />
                      Hi [Name],<br /><br />
                      I've been using SiriusB iQ to analyze our PBM contracts and uncover hidden costs. We found $2M in savings in the first month.<br /><br />
                      Thought you might benefit from this: {referralLink}<br /><br />
                      (Full disclosure: I'm a partner and earn commission, but I genuinely love the platform.)
                    </p>
                    <Button variant="outline" size="sm">Copy Email</Button>
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