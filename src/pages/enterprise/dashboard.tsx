import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { EnterpriseHeader } from "@/components/enterprise/EnterpriseHeader";
import { EnterpriseDashboard } from "@/components/enterprise/EnterpriseDashboard";
import { EnterpriseAnalytics } from "@/components/enterprise/EnterpriseAnalytics";
import { EnterpriseTeamManagement } from "@/components/enterprise/EnterpriseTeamManagement";
import { EnterpriseCompliance } from "@/components/enterprise/EnterpriseCompliance";
import { EnterpriseSecurityCenter } from "@/components/enterprise/EnterpriseSecurityCenter";
import { EnterpriseBilling } from "@/components/enterprise/EnterpriseBilling";
import { EnterpriseIntegrations } from "@/components/enterprise/EnterpriseIntegrations";
import { EnterpriseReporting } from "@/components/enterprise/EnterpriseReporting";

export default function EnterprisePortal() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <>
      <Head>
        <title>Enterprise Portal - SiriusB iQ Contract Intelligence</title>
        <meta name="description" content="Enterprise administration and analytics" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900">
        <EnterpriseHeader />

        <main className="container mx-auto px-4 py-8 max-w-[1400px]">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Enterprise Portal
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Comprehensive administration, analytics, and team management
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-4 lg:grid-cols-8 gap-2 h-auto p-2 bg-white dark:bg-slate-900 shadow-sm">
              <TabsTrigger value="dashboard" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                Analytics
              </TabsTrigger>
              <TabsTrigger value="team" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                Team
              </TabsTrigger>
              <TabsTrigger value="compliance" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                Compliance
              </TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                Security
              </TabsTrigger>
              <TabsTrigger value="billing" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                Billing
              </TabsTrigger>
              <TabsTrigger value="integrations" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                Integrations
              </TabsTrigger>
              <TabsTrigger value="reporting" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                Reporting
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              <EnterpriseDashboard />
            </TabsContent>

            <TabsContent value="analytics">
              <EnterpriseAnalytics />
            </TabsContent>

            <TabsContent value="team">
              <EnterpriseTeamManagement />
            </TabsContent>

            <TabsContent value="compliance">
              <EnterpriseCompliance />
            </TabsContent>

            <TabsContent value="security">
              <EnterpriseSecurityCenter />
            </TabsContent>

            <TabsContent value="billing">
              <EnterpriseBilling />
            </TabsContent>

            <TabsContent value="integrations">
              <EnterpriseIntegrations />
            </TabsContent>

            <TabsContent value="reporting">
              <EnterpriseReporting />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </>
  );
}