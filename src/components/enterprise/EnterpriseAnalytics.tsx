import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, LineChart, TrendingUp, DollarSign } from "lucide-react";

export function EnterpriseAnalytics() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Usage Analytics</CardTitle>
          <CardDescription>Contract analysis trends and patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center border-2 border-dashed rounded-lg">
            <div className="text-center">
              <BarChart className="h-12 w-12 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">Interactive charts will be rendered here</p>
              <p className="text-xs text-gray-400 mt-1">Contract uploads, analysis trends, user activity</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top PBM Providers</CardTitle>
            <CardDescription>Contracts analyzed by provider</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {['OptumRx', 'CVS Health', 'Express Scripts', 'Prime Therapeutics'].map((pbm, idx) => (
              <div key={pbm} className="flex items-center justify-between">
                <span className="text-sm font-medium">{pbm}</span>
                <Badge variant="secondary">{15 - idx * 2} contracts</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Department Usage</CardTitle>
            <CardDescription>Analysis by department</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { dept: 'Legal', usage: 42 },
              { dept: 'Procurement', usage: 28 },
              { dept: 'Risk Management', usage: 18 },
              { dept: 'Finance', usage: 12 }
            ].map((item) => (
              <div key={item.dept} className="flex items-center justify-between">
                <span className="text-sm font-medium">{item.dept}</span>
                <Badge variant="secondary">{item.usage}%</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Savings Impact Analysis</CardTitle>
          <CardDescription>Financial impact tracking</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-center justify-center border-2 border-dashed rounded-lg">
            <div className="text-center">
              <DollarSign className="h-12 w-12 mx-auto text-green-600 mb-2" />
              <p className="text-2xl font-bold text-green-600">$12.4M</p>
              <p className="text-sm text-gray-500">Total savings identified</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}