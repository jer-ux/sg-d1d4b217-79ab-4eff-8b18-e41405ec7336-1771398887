import React, { useState } from "react";
import { Database, Upload, Eye } from "lucide-react";
import { SEO } from "@/components/SEO";
import { SiriusBNav } from "@/components/siriusb/SiriusBNav";
import { SiriusBFooter } from "@/components/siriusb/SiriusBFooter";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DatabankUploader } from "@/components/databank/DatabankUploader";
import { DatabankViewer } from "@/components/databank/DatabankViewer";

export default function DatabankManager() {
  const [activeTab, setActiveTab] = useState("upload");

  return (
    <>
      <SEO
        title="Databank Manager | SiriusB iQ"
        description="Upload and manage large datasets across multiple specialized databanks for healthcare analytics, actuarial modeling, and business intelligence."
        image="/og-image.png"
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
        <SiriusBNav />

        <main className="pt-24 pb-16 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Database className="w-12 h-12 text-blue-400" />
                <h1 className="text-4xl md:text-5xl font-bold text-white">
                  Databank Manager
                </h1>
              </div>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Upload and manage massive datasets across specialized databanks for
                comprehensive healthcare analytics and actuarial modeling
              </p>
            </div>

            {/* Databank Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
              {[
                { name: "Claims", color: "blue", icon: "📊" },
                { name: "Member", color: "green", icon: "👥" },
                { name: "Provider", color: "purple", icon: "🏥" },
                { name: "Financial", color: "yellow", icon: "💰" },
                { name: "Contract", color: "red", icon: "📄" },
                { name: "Census", color: "indigo", icon: "📈" },
                { name: "Analytics", color: "pink", icon: "🔬" },
              ].map((bank) => (
                <div
                  key={bank.name}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 text-center hover:bg-white/10 transition-colors"
                >
                  <div className="text-3xl mb-2">{bank.icon}</div>
                  <p className="text-sm font-medium text-white">{bank.name}</p>
                </div>
              ))}
            </div>

            {/* Main Content */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 bg-white/5 backdrop-blur-sm">
                <TabsTrigger
                  value="upload"
                  className="data-[state=active]:bg-blue-500/20"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Data
                </TabsTrigger>
                <TabsTrigger
                  value="view"
                  className="data-[state=active]:bg-blue-500/20"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Databanks
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upload" className="space-y-6">
                <DatabankUploader
                  onUploadComplete={(recordId) => {
                    console.log("Upload complete:", recordId);
                    setActiveTab("view");
                  }}
                  maxSizeMB={100}
                />

                {/* Upload Guidelines */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Upload Guidelines
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>
                        <strong>Claims Data:</strong> Medical claims, pharmacy claims,
                        claim lines, adjudication results
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>
                        <strong>Member Data:</strong> Demographics, eligibility,
                        enrollment history, coverage details
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>
                        <strong>Provider Data:</strong> Provider directories, network
                        information, credentialing
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>
                        <strong>Financial Data:</strong> Premium calculations, reserves,
                        IBNR estimates, financials
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>
                        <strong>Contract Data:</strong> ASA/ASO agreements, benefit
                        plans, fee schedules
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>
                        <strong>Census Data:</strong> Employee census, dependents,
                        demographic distributions
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>
                        <strong>Analytics Data:</strong> KPI metrics, dashboards,
                        custom reports, ML models
                      </span>
                    </li>
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="view" className="space-y-6">
                <DatabankViewer />
              </TabsContent>
            </Tabs>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Secure Storage
                </h3>
                <p className="text-gray-300 text-sm">
                  Enterprise-grade encryption and access controls protect your sensitive
                  healthcare and financial data at rest and in transit.
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Automated Processing
                </h3>
                <p className="text-gray-300 text-sm">
                  Intelligent data validation, parsing, and transformation pipelines
                  automatically process uploads for immediate analytics.
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Unlimited Scale
                </h3>
                <p className="text-gray-300 text-sm">
                  Upload terabytes of data across multiple databanks with no
                  performance degradation or storage limits.
                </p>
              </div>
            </div>
          </div>
        </main>

        <SiriusBFooter />
      </div>
    </>
  );
}