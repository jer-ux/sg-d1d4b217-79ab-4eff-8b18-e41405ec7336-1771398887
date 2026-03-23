import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Users, DollarSign, TrendingUp, Briefcase, Crown, Target, Calendar, CheckCircle2 } from "lucide-react";

interface PartnerMetrics {
  partner_id: string;
  partner_name: string;
  tier: "standard" | "silver" | "gold" | "platinum";
  active_clients: number;
  total_clients: number;
  monthly_recurring_revenue: number;
  commission_rate: number;
  monthly_commission: number;
  ytd_commission: number;
  lifetime_commission: number;
  avg_deal_size: number;
  conversion_rate: number;
  client_retention_rate: number;
  net_revenue_retention: number;
  pipeline_value: number;
  deals_in_progress: number;
  next_tier_progress: number;
  clients_to_next_tier: number;
}

interface ClientRecord {
  client_name: string;
  plan: string;
  mrr: number;
  partner_commission: number;
  status: "active" | "trial" | "churned";
  contract_start: string;
  renewal_date: string | null;
  health_score: number;
}

interface PartnerDashboardProps {
  metrics: PartnerMetrics;
  clients: ClientRecord[];
  commissionHistory: Array<{
    month: string;
    amount: number;
    status: "paid" | "pending";
    payout_date: string;
  }>;
}

export function PartnerDashboard({ metrics, clients, commissionHistory }: PartnerDashboardProps) {
  const getTierColor = (tier: string) => {
    switch (tier) {
      case "platinum": return "bg-purple-600";
      case "gold": return "bg-yellow-600";
      case "silver": return "bg-slate-400";
      default: return "bg-slate-600";
    }
  };

  const getTierIcon = (tier: string) => {
    if (tier === "platinum" || tier === "gold") return Crown;
    return Briefcase;
  };

  const TierIcon = getTierIcon(metrics.tier);

  return (
    <div className="space-y-6">
      {/* Partner Status Card */}
      <Card className={`border-2 ${getTierColor(metrics.tier)} bg-gradient-to-br from-slate-50 to-purple-50`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <TierIcon className="h-8 w-8 text-purple-600" />
              <div>
                <CardTitle className="text-2xl">{metrics.partner_name}</CardTitle>
                <CardDescription className="flex items-center gap-2 mt-1">
                  <Badge className={getTierColor(metrics.tier)}>
                    {metrics.tier.toUpperCase()} PARTNER
                  </Badge>
                  <span>{metrics.commission_rate}% commission rate</span>
                </CardDescription>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-green-600">${metrics.monthly_commission.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Monthly Commission</p>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-muted-foreground mb-1">Active Clients</p>
              <p className="text-2xl font-bold">{metrics.active_clients}</p>
              <p className="text-xs text-muted-foreground">of {metrics.total_clients} total</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-muted-foreground mb-1">Client MRR</p>
              <p className="text-2xl font-bold">${metrics.monthly_recurring_revenue.toLocaleString()}</p>
              <p className="text-xs text-green-600">+12% vs last month</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-muted-foreground mb-1">YTD Earnings</p>
              <p className="text-2xl font-bold">${metrics.ytd_commission.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Lifetime: ${metrics.lifetime_commission.toLocaleString()}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-muted-foreground mb-1">Pipeline Value</p>
              <p className="text-2xl font-bold">${metrics.pipeline_value.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">{metrics.deals_in_progress} deals in progress</p>
            </div>
          </div>

          {/* Tier Progress */}
          <div className="p-4 bg-purple-100 border border-purple-300 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <p className="font-semibold text-purple-900">
                Next Tier Progress
              </p>
              <span className="text-sm font-bold text-purple-900">
                {metrics.next_tier_progress}%
              </span>
            </div>
            <Progress value={metrics.next_tier_progress} className="h-2 mb-2" />
            <p className="text-sm text-purple-800">
              {metrics.clients_to_next_tier} more clients to reach the next tier
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Target className="h-4 w-4 text-blue-600" />
              Avg Deal Size
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${metrics.avg_deal_size.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">Per closed deal</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              Win Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">{metrics.conversion_rate}%</p>
            <p className="text-xs text-muted-foreground mt-1">Conversion to paid</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Users className="h-4 w-4 text-purple-600" />
              Retention Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-purple-600">{metrics.client_retention_rate}%</p>
            <p className="text-xs text-muted-foreground mt-1">Client retention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-orange-600" />
              NRR
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-orange-600">{metrics.net_revenue_retention}%</p>
            <p className="text-xs text-muted-foreground mt-1">Net revenue retention</p>
          </CardContent>
        </Card>
      </div>

      {/* Client Portfolio */}
      <Card>
        <CardHeader>
          <CardTitle>Client Portfolio</CardTitle>
          <CardDescription>Your active client base</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {clients.map((client, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <p className="font-semibold">{client.client_name}</p>
                    <Badge variant={client.status === "active" ? "default" : client.status === "trial" ? "secondary" : "outline"}>
                      {client.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {client.plan} • Started {client.contract_start}
                    {client.renewal_date && ` • Renews ${client.renewal_date}`}
                  </p>
                </div>
                <div className="text-right mr-6">
                  <p className="font-semibold">${client.mrr.toLocaleString()}/mo</p>
                  <p className="text-sm text-green-600">${client.partner_commission.toLocaleString()} commission</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Health Score</p>
                  <p className={`font-bold ${client.health_score >= 90 ? "text-green-600" : client.health_score >= 75 ? "text-yellow-600" : "text-red-600"}`}>
                    {client.health_score}/100
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Commission History */}
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
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-semibold">{payment.month}</p>
                    <p className="text-sm text-muted-foreground">Payout: {payment.payout_date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold">${payment.amount.toLocaleString()}</p>
                  <Badge variant={payment.status === "paid" ? "default" : "secondary"} className="mt-1">
                    {payment.status === "paid" ? <CheckCircle2 className="mr-1 h-3 w-3" /> : null}
                    {payment.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}