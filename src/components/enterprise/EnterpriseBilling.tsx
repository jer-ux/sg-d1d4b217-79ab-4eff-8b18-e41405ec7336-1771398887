/**
 * Enterprise Billing Component
 * Usage tracking and billing management
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DollarSign,
  TrendingUp,
  Download,
  CreditCard,
  Calendar,
} from "lucide-react";

export function EnterpriseBilling() {
  const billingData = {
    currentPlan: "Enterprise Plus",
    monthlySpend: 4850,
    billingCycle: "Monthly",
    nextBillingDate: "2026-04-01",
    usageQuota: {
      contracts: { used: 247, limit: 500 },
      reports: { used: 89, limit: 200 },
      apiCalls: { used: 45234, limit: 100000 },
      storage: { used: 125, limit: 500 }, // GB
    },
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Billing & Usage</h2>
        <p className="text-gray-500 mt-1">
          Track your usage and manage billing settings
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Current Plan</CardTitle>
            <Badge variant="default">{billingData.currentPlan}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${billingData.monthlySpend}</div>
            <p className="text-xs text-gray-500 mt-1">per month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Billing Cycle</CardTitle>
            <Calendar className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{billingData.billingCycle}</div>
            <p className="text-xs text-gray-500 mt-1">
              Next: {new Date(billingData.nextBillingDate).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Payment Method</CardTitle>
            <CreditCard className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">•••• 4242</span>
              <Badge variant="outline">Visa</Badge>
            </div>
            <Button variant="link" className="px-0 mt-1 h-auto text-xs">
              Update payment method
            </Button>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="usage" className="space-y-6">
        <TabsList>
          <TabsTrigger value="usage">Usage</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="plans">Plans</TabsTrigger>
        </TabsList>

        <TabsContent value="usage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Resource Usage</CardTitle>
              <CardDescription>Current billing period usage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Contract Analysis</span>
                  <span className="text-sm text-gray-500">
                    {billingData.usageQuota.contracts.used} / {billingData.usageQuota.contracts.limit}
                  </span>
                </div>
                <Progress
                  value={(billingData.usageQuota.contracts.used / billingData.usageQuota.contracts.limit) * 100}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Reports Generated</span>
                  <span className="text-sm text-gray-500">
                    {billingData.usageQuota.reports.used} / {billingData.usageQuota.reports.limit}
                  </span>
                </div>
                <Progress
                  value={(billingData.usageQuota.reports.used / billingData.usageQuota.reports.limit) * 100}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">API Calls</span>
                  <span className="text-sm text-gray-500">
                    {billingData.usageQuota.apiCalls.used.toLocaleString()} /{" "}
                    {billingData.usageQuota.apiCalls.limit.toLocaleString()}
                  </span>
                </div>
                <Progress
                  value={(billingData.usageQuota.apiCalls.used / billingData.usageQuota.apiCalls.limit) * 100}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Storage</span>
                  <span className="text-sm text-gray-500">
                    {billingData.usageQuota.storage.used} GB / {billingData.usageQuota.storage.limit} GB
                  </span>
                </div>
                <Progress
                  value={(billingData.usageQuota.storage.used / billingData.usageQuota.storage.limit) * 100}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoices">
          <Card>
            <CardHeader>
              <CardTitle>Invoice History</CardTitle>
              <CardDescription>Past invoices and payment history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { date: "2026-03-01", amount: 4850, status: "Paid" },
                  { date: "2026-02-01", amount: 4850, status: "Paid" },
                  { date: "2026-01-01", amount: 4850, status: "Paid" },
                ].map((invoice, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 rounded-lg border"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                        <DollarSign className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">
                          {new Date(invoice.date).toLocaleDateString("en-US", {
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                        <p className="text-sm text-gray-500">${invoice.amount.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="default">{invoice.status}</Badge>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plans">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Professional</CardTitle>
                <CardDescription>For small teams</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-bold">$1,499/mo</div>
                <ul className="space-y-2 text-sm">
                  <li>✓ 100 contracts/month</li>
                  <li>✓ 50 reports/month</li>
                  <li>✓ Basic analytics</li>
                  <li>✓ Email support</li>
                </ul>
                <Button variant="outline" className="w-full">Current Plan</Button>
              </CardContent>
            </Card>

            <Card className="border-blue-600 border-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Enterprise Plus</CardTitle>
                  <Badge>Current</Badge>
                </div>
                <CardDescription>For growing organizations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-bold">$4,850/mo</div>
                <ul className="space-y-2 text-sm">
                  <li>✓ 500 contracts/month</li>
                  <li>✓ 200 reports/month</li>
                  <li>✓ Advanced analytics</li>
                  <li>✓ Priority support</li>
                  <li>✓ Custom branding</li>
                </ul>
                <Button className="w-full">Current Plan</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ultimate</CardTitle>
                <CardDescription>For large enterprises</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-bold">Custom</div>
                <ul className="space-y-2 text-sm">
                  <li>✓ Unlimited contracts</li>
                  <li>✓ Unlimited reports</li>
                  <li>✓ White-label solution</li>
                  <li>✓ Dedicated support</li>
                  <li>✓ Custom integrations</li>
                </ul>
                <Button variant="outline" className="w-full">Contact Sales</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}