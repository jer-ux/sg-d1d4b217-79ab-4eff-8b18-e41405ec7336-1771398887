import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DollarSign, TrendingUp, Download, CreditCard, FileText } from "lucide-react";

export function EnterpriseBilling() {
  const costBreakdown = [
    { category: 'Legal Department', amount: 15240, percentage: 42 },
    { category: 'Procurement', amount: 10890, percentage: 28 },
    { category: 'Risk Management', amount: 7320, percentage: 18 },
    { category: 'Finance', amount: 4550, percentage: 12 },
  ];

  const invoices = [
    { id: 'INV-2026-03', date: '2026-03-01', amount: 38000, status: 'Paid' },
    { id: 'INV-2026-02', date: '2026-02-01', amount: 38000, status: 'Paid' },
    { id: 'INV-2026-01', date: '2026-01-01', amount: 36500, status: 'Paid' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">Billing & Usage</h3>
          <p className="text-gray-500">Enterprise subscription and cost allocation</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Invoice
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">Current Period</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$38,000</div>
            <p className="text-xs text-gray-500 mt-1">Mar 1 - Mar 31</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">Budget Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">76%</div>
            <Progress value={76} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">Contracts Analyzed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">142</div>
            <p className="text-xs text-gray-500 mt-1">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">Cost per Contract</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$268</div>
            <p className="text-xs text-gray-500 mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
              -12% vs last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cost Allocation by Department</CardTitle>
          <CardDescription>Usage breakdown across your organization</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {costBreakdown.map((item) => (
            <div key={item.category}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{item.category}</span>
                <span className="text-sm font-bold">${item.amount.toLocaleString()}</span>
              </div>
              <Progress value={item.percentage} />
              <div className="text-xs text-gray-500 mt-1">{item.percentage}% of total</div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Subscription Details</CardTitle>
            <CardDescription>Enterprise plan features and limits</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium">Plan Type</span>
              <Badge className="bg-blue-600">Enterprise</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium">Unlimited Contracts</span>
              <Badge variant="outline" className="bg-green-50 text-green-700">✓</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium">White Label</span>
              <Badge variant="outline" className="bg-green-50 text-green-700">✓</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium">API Access</span>
              <Badge variant="outline" className="bg-green-50 text-green-700">✓</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium">Priority Support</span>
              <Badge variant="outline" className="bg-green-50 text-green-700">24/7</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Invoices</CardTitle>
            <CardDescription>Payment history and billing statements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="font-medium">{invoice.id}</div>
                    <div className="text-xs text-gray-500">{invoice.date}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold">${invoice.amount.toLocaleString()}</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    {invoice.status}
                  </Badge>
                  <Button size="sm" variant="ghost">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}