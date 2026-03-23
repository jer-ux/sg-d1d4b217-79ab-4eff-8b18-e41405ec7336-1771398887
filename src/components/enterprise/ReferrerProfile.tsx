import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gift, Users, DollarSign, TrendingUp, Link2, Copy, CheckCircle2, Star, Crown, Mail, Linkedin, Twitter, Share2 } from "lucide-react";
import { useState } from "react";

interface ReferrerStats {
  referrer_id: string;
  referrer_name: string;
  referrer_email: string;
  tier: "standard" | "ambassador" | "partner";
  total_referrals: number;
  active_customers: number;
  conversion_rate: number;
  monthly_commission: number;
  ytd_commission: number;
  lifetime_value: number;
  referral_code: string;
  next_tier_referrals_needed: number;
  viral_coefficient: number;
}

interface ReferralRecord {
  company_name: string;
  contact_email: string;
  status: "active" | "trial" | "churned";
  plan: string;
  referred_date: string;
  closed_date: string | null;
  mrr: number;
  commission: string;
  lifetime_commission: string;
}

interface ReferrerProfileProps {
  stats: ReferrerStats;
  referrals: ReferralRecord[];
  channelPerformance: Array<{
    channel: string;
    referrals: number;
    icon: typeof Mail;
  }>;
}

export function ReferrerProfile({ stats, referrals, channelPerformance }: ReferrerProfileProps) {
  const [copied, setCopied] = useState(false);
  const referralLink = `https://siriusb.ai/signup?ref=${stats.referral_code}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getTierInfo = (tier: string) => {
    switch (tier) {
      case "partner":
        return {
          name: "Strategic Partner",
          icon: Crown,
          color: "bg-purple-600",
          commission: "20%",
          bonus: "$2,500"
        };
      case "ambassador":
        return {
          name: "Brand Ambassador",
          icon: Star,
          color: "bg-blue-600",
          commission: "15%",
          bonus: "$1,000"
        };
      default:
        return {
          name: "Standard Referrer",
          icon: Gift,
          color: "bg-slate-600",
          commission: "10%",
          bonus: "$500"
        };
    }
  };

  const tierInfo = getTierInfo(stats.tier);
  const TierIcon = tierInfo.icon;

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="border-2 bg-gradient-to-br from-slate-50 to-purple-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {stats.referrer_name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <CardTitle className="text-2xl">{stats.referrer_name}</CardTitle>
                <CardDescription className="flex items-center gap-2 mt-1">
                  <Badge className={tierInfo.color}>
                    {tierInfo.name.toUpperCase()}
                  </Badge>
                  <span>{stats.referrer_email}</span>
                </CardDescription>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-green-600">${stats.monthly_commission.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Monthly Commission</p>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <Users className="h-5 w-5 text-blue-600" />
                <TrendingUp className="h-4 w-4 text-green-600" />
              </div>
              <p className="text-2xl font-bold">{stats.total_referrals}</p>
              <p className="text-xs text-muted-foreground">Total Referrals</p>
            </div>

            <div className="p-4 bg-white rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <span className="text-xs font-semibold text-green-600">{stats.conversion_rate}%</span>
              </div>
              <p className="text-2xl font-bold">{stats.active_customers}</p>
              <p className="text-xs text-muted-foreground">Paying Customers</p>
            </div>

            <div className="p-4 bg-white rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <DollarSign className="h-5 w-5 text-purple-600" />
                <span className="text-xs text-muted-foreground">YTD</span>
              </div>
              <p className="text-2xl font-bold">${stats.ytd_commission.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Commission Earned</p>
            </div>

            <div className="p-4 bg-white rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="h-5 w-5 text-orange-600" />
                <span className="text-xs font-semibold text-orange-600">{stats.viral_coefficient.toFixed(2)}x</span>
              </div>
              <p className="text-2xl font-bold">${stats.lifetime_value.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Lifetime Value</p>
            </div>
          </div>

          {/* Tier Progress */}
          {stats.tier !== "partner" && (
            <div className="p-4 bg-purple-100 border border-purple-300 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <p className="font-semibold text-purple-900 flex items-center gap-2">
                  <Crown className="h-5 w-5" />
                  {stats.next_tier_referrals_needed} more referrals to unlock {stats.tier === "ambassador" ? "Strategic Partner" : "Brand Ambassador"} tier
                </p>
                <span className="text-sm font-bold text-purple-900">
                  {Math.round(((stats.total_referrals % 20) / 20) * 100)}%
                </span>
              </div>
              <Progress value={((stats.total_referrals % 20) / 20) * 100} className="h-2 mb-2" />
              <p className="text-sm text-purple-800">
                Upgrade to unlock {stats.tier === "ambassador" ? "20%" : "15%"} commission + ${stats.tier === "ambassador" ? "2,500" : "1,000"} per deal bonuses
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="referrals">My Referrals</TabsTrigger>
          <TabsTrigger value="share">Share & Earn</TabsTrigger>
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Current Tier Benefits */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <TierIcon className={`h-6 w-6 ${stats.tier === "partner" ? "text-purple-600" : stats.tier === "ambassador" ? "text-blue-600" : "text-slate-600"}`} />
                Your {tierInfo.name} Benefits
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <span className="font-medium">Commission Rate</span>
                <span className="text-2xl font-bold text-green-600">{tierInfo.commission}</span>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <span className="font-medium">Sign-Up Bonus</span>
                <span className="text-2xl font-bold text-purple-600">{tierInfo.bonus}</span>
              </div>
              <div className="grid md:grid-cols-2 gap-3 pt-2">
                <div className="flex items-start gap-2 p-3 border rounded-lg">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Priority support queue</span>
                </div>
                <div className="flex items-start gap-2 p-3 border rounded-lg">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Co-marketing opportunities</span>
                </div>
                {stats.tier === "ambassador" || stats.tier === "partner" ? (
                  <>
                    <div className="flex items-start gap-2 p-3 border rounded-lg">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Early feature access</span>
                    </div>
                    <div className="flex items-start gap-2 p-3 border rounded-lg">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">24-month commission (vs 12)</span>
                    </div>
                  </>
                ) : null}
                {stats.tier === "partner" && (
                  <>
                    <div className="flex items-start gap-2 p-3 border rounded-lg">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Lifetime commission</span>
                    </div>
                    <div className="flex items-start gap-2 p-3 border rounded-lg">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Dedicated partner manager</span>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Channel Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Channels</CardTitle>
              <CardDescription>Where your referrals are coming from</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {channelPerformance.map((channel, idx) => {
                const ChannelIcon = channel.icon;
                return (
                  <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <ChannelIcon className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">{channel.channel}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold">{channel.referrals} referrals</span>
                      <div className="w-24 bg-slate-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(channel.referrals / stats.total_referrals) * 100}%` }}></div>
                      </div>
                      <span className="text-sm text-muted-foreground w-12 text-right">
                        {Math.round((channel.referrals / stats.total_referrals) * 100)}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="referrals" className="space-y-6">
          {referrals.map((referral, idx) => (
            <Card key={idx} className="border-2">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-3">
                      {referral.company_name}
                      <Badge variant={referral.status === "active" ? "default" : referral.status === "trial" ? "secondary" : "outline"}>
                        {referral.status}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {referral.contact_email} • {referral.plan} Plan
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">{referral.commission}</p>
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
                    <p className="font-semibold">${referral.mrr.toLocaleString()}</p>
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

        <TabsContent value="share" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Unique Referral Link</CardTitle>
              <CardDescription>Share this link to earn commissions on new customers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input value={referralLink} readOnly className="font-mono text-sm" />
                <Button onClick={handleCopyLink} variant="outline" className="flex-shrink-0">
                  {copied ? <CheckCircle2 className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
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
                  <Share2 className="h-4 w-4" />
                  More
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pre-Written Templates</CardTitle>
              <CardDescription>Copy these proven templates to boost conversions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-semibold">LinkedIn Post</p>
                  <Button variant="outline" size="sm">Copy</Button>
                </div>
                <p className="text-sm text-muted-foreground italic">
                  "Just saved our team 200+ hours analyzing PBM contracts with @SiriusBiQ's AI platform. 
                  Game-changing transparency for healthcare benefits. Check it out: {referralLink}"
                </p>
              </div>

              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-semibold">Email Template</p>
                  <Button variant="outline" size="sm">Copy</Button>
                </div>
                <p className="text-sm text-muted-foreground italic">
                  Subject: Cut your benefits costs by 20%+ with AI<br /><br />
                  Hi [Name],<br /><br />
                  I've been using SiriusB iQ to analyze our PBM contracts and uncover hidden costs. 
                  We found $2M in savings in the first month.<br /><br />
                  Thought you might benefit from this: {referralLink}<br /><br />
                  (Full disclosure: I'm a partner and earn commission, but I genuinely love the platform.)
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="earnings" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-green-600">${stats.monthly_commission.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-1">Pending payout</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Year to Date</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-blue-600">${stats.ytd_commission.toLocaleString()}</p>
                <p className="text-xs text-green-600 mt-1">+23% vs last year</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Lifetime Total</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-purple-600">${stats.lifetime_value.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-1">All-time earnings</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Earnings Breakdown</CardTitle>
              <CardDescription>Where your commission comes from</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center p-4 border rounded-lg">
                <span className="font-medium">Recurring Commission</span>
                <span className="text-xl font-bold text-green-600">
                  ${(stats.monthly_commission * 0.7).toLocaleString()}/mo
                </span>
              </div>
              <div className="flex justify-between items-center p-4 border rounded-lg">
                <span className="font-medium">Sign-Up Bonuses (YTD)</span>
                <span className="text-xl font-bold text-purple-600">
                  ${(stats.ytd_commission * 0.3).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <span className="font-medium">Next Payout (April 15)</span>
                <span className="text-xl font-bold text-blue-600">
                  ${(stats.monthly_commission * 1.05).toLocaleString()}
                </span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}