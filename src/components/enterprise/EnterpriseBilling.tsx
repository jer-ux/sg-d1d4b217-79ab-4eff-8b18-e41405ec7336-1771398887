import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CreditCard,
  DollarSign,
  TrendingUp,
  Download,
  Calendar,
  Receipt,
  AlertCircle,
  CheckCircle2,
  Zap,
  Database,
  Users
} from "lucide-react";

interface BillingData {
  currentPlan: {
    name: string;
    price: number;
    period: string;
    features: string[];
  };
  usage: {
    apiCalls: { used: number; limit: number };
    storage: { used: number; limit: number };
    users: { active: number; limit: number };
  };
  invoices: Array<{
    id: string;
    date: string;
    amount: number;
    status: string;
  }>;
}

export function EnterpriseBilling() {
  const [billingData] = useState<BillingData>({
    currentPlan: {
      name: "Enterprise",
      price: 2999,
      period: "month",
      features: [
        "Unlimited users",
        "Unlimited API calls",
        "1TB storage",
        "24/7 priority support",
        "Custom integrations",
        "Dedicated account manager"
      ]
    },
    usage: {
      apiCalls: { used: 4829384, limit: -1 },
      storage: { used: 67.5, limit: 1024 },
      users: { active: 1847, limit: -1 }
    },
    invoices: [
      { id: "INV-2026-03", date: "2026-03-01", amount: 2999, status: "paid" },
      { id: "INV-2026-02", date: "2026-02-01", amount: 2999, status: "paid" },
      { id: "INV-2026-01", date: "2026-01-01", amount: 2999, status: "paid" }
    ]
  });

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  const getUsagePercentage = (used: number, limit: number) => {
    if (limit === -1) return 0; // Unlimited
    return (used / limit) * 100;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Billing & Usage</h2>
          <p className="text-muted-foreground">Manage your subscription and view usage metrics</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Download Invoice
        </Button>
      </div>

      {/* Current Plan */}
      <Card className="border-2 border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-pink-500/5">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Current Plan</p>
                  <p className="text-3xl font-bold">{billingData.currentPlan.name}</p>
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">${billingData.currentPlan.price}</span>
                <span className="text-muted-foreground">/{billingData.currentPlan.period}</span>
              </div>
            </div>
            <div className="text-right space-y-2">
              <Badge className="bg-green-500 text-white">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Active
              </Badge>
              <p className="text-sm text-muted-foreground">Auto-renews March 31, 2026</p>
              <Button variant="outline" size="sm">Manage Plan</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Usage Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">API Calls</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(billingData.usage.apiCalls.used)}</div>
            <p className="text-xs text-muted-foreground">
              {billingData.usage.apiCalls.limit === -1 ? "Unlimited" : `of ${formatNumber(billingData.usage.apiCalls.limit)}`}
            </p>
            {billingData.usage.apiCalls.limit !== -1 && (
              <Progress 
                value={getUsagePercentage(billingData.usage.apiCalls.used, billingData.usage.apiCalls.limit)} 
                className="mt-2 h-2" 
              />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{billingData.usage.storage.used}GB</div>
            <p className="text-xs text-muted-foreground">
              of {billingData.usage.storage.limit}GB
            </p>
            <Progress 
              value={getUsagePercentage(billingData.usage.storage.used, billingData.usage.storage.limit)} 
              className="mt-2 h-2" 
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(billingData.usage.users.active)}</div>
            <p className="text-xs text-muted-foreground">
              {billingData.usage.users.limit === -1 ? "Unlimited" : `of ${formatNumber(billingData.usage.users.limit)}`}
            </p>
            {billingData.usage.users.limit !== -1 && (
              <Progress 
                value={getUsagePercentage(billingData.usage.users.active, billingData.usage.users.limit)} 
                className="mt-2 h-2" 
              />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Invoice History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Invoice History
          </CardTitle>
          <CardDescription>View and download past invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {billingData.invoices.map((invoice) => (
              <div
                key={invoice.id}
                className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Receipt className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{invoice.id}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {new Date(invoice.date).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-bold">${invoice.amount.toLocaleString()}</p>
                    <Badge className="bg-green-500 text-white text-xs">
                      {invoice.status}
                    </Badge>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Plan Features */}
      <Card>
        <CardHeader>
          <CardTitle>Plan Features</CardTitle>
          <CardDescription>Everything included in your Enterprise plan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            {billingData.currentPlan.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}