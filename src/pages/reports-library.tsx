import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { FileText, Download, ExternalLink, TrendingUp, Shield, DollarSign, Building2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const reports = [
  {
    category: "Case Studies",
    icon: TrendingUp,
    color: "emerald",
    reports: [
      {
        title: "Hopebridge Case Study",
        description: "4-page executive brief on benefits optimization and cost reduction strategies",
        file: "/Kincaid_IQ_Hopebridge_4pg_Brief_1_.pdf",
        size: "Brief",
        type: "Case Study",
      },
      {
        title: "Hopebridge Form 5500 Analysis",
        description: "Comprehensive 44-page actuarial analysis and compliance review",
        file: "/Kincaid_IQ_Hopebridge_501_44pg_1_.pdf",
        size: "Full Report",
        type: "Case Study",
      },
      {
        title: "Inotiv Form 5500 Analysis",
        description: "44-page deep-dive into plan performance and optimization opportunities",
        file: "/Kincaid_IQ_Inotiv_501_44pg_1_.pdf",
        size: "Full Report",
        type: "Case Study",
      },
      {
        title: "Schwarz Partners MEWA Defense",
        description: "$14.2M defense strategy for Multiple Employer Welfare Arrangement",
        file: "/Kincaid_iQ_Schwarz_Partners_MEWA_14_2M_Defense.pdf",
        size: "Full Report",
        type: "Case Study",
      },
    ],
  },
  {
    category: "White Papers & Research",
    icon: FileText,
    color: "purple",
    reports: [
      {
        title: "Evidence-First Transformation",
        description: "Strategic white paper on data-driven benefits management",
        file: "/Kincaid_IQ_WP_2026_06_Evidence_First_Transformation.pdf",
        size: "White Paper",
        type: "Research",
      },
      {
        title: "Predictive Intelligence Report",
        description: "Advanced analytics and forecasting methodologies",
        file: "/kincaid-iq-predictive-intelligence-report_3_.pdf",
        size: "Technical Report",
        type: "Research",
      },
      {
        title: "Rx Defense Intelligence",
        description: "PBM contract forensics and pharmaceutical cost optimization",
        file: "/Kincaid-IQ-Rx-Defense-IQ-2026-06-03_1_.pdf",
        size: "Technical Report",
        type: "Research",
      },
    ],
  },
  {
    category: "Platform Documentation",
    icon: Building2,
    color: "cyan",
    reports: [
      {
        title: "Kincaid IQ Executive Deployment",
        description: "Platform overview and implementation guide",
        file: "/SiriusB_iQ_Glassmorphic_v1_Kincaid_IQ_Executive_Deployment_1_.pdf",
        size: "Guide",
        type: "Platform",
      },
      {
        title: "Market Validation Brief",
        description: "Rimes partnership and market positioning analysis",
        file: "/SiriusB_iQ_Glassmorphic_v1_Rimes_Market_Validation_Brief.pdf",
        size: "Brief",
        type: "Platform",
      },
      {
        title: "Nautilus Contract X-Ray Overview (Feb 14)",
        description: "Executive overview of contract intelligence capabilities",
        file: "/Nautilus_Contract_X-Ray_Executive_Overview_v1_02-14-26_2_.pdf",
        size: "Overview",
        type: "Platform",
      },
      {
        title: "Nautilus Contract X-Ray Overview (Feb 24)",
        description: "Updated executive overview with enhanced features",
        file: "/Nautilus_Contract_X-Ray_Executive_Overview_v1_02-24-26_2_.pdf",
        size: "Overview",
        type: "Platform",
      },
      {
        title: "Fiduciary Cloud Connect",
        description: "Integration and connectivity framework documentation",
        file: "/Fiduciary_Cloud_Connect_-_Replit_2_1_.pdf",
        size: "Technical",
        type: "Platform",
      },
    ],
  },
  {
    category: "Form 5500 Filings",
    icon: Shield,
    color: "rose",
    reports: [
      {
        title: "Form 5500 - 2020 Filing",
        description: "Annual return/report (NAL0012876257001)",
        file: "/20200707143005NAL0012876257001.pdf",
        size: "Official Filing",
        type: "Compliance",
      },
      {
        title: "Form 5500 - 2021 Filing",
        description: "Annual return/report (NAL0001127809001)",
        file: "/20210817094911NAL0001127809001.pdf",
        size: "Official Filing",
        type: "Compliance",
      },
      {
        title: "Form 5500 - 2020 Additional",
        description: "Annual return/report (NAL0015835632001)",
        file: "/20200706151135NAL0015835632001.pdf",
        size: "Official Filing",
        type: "Compliance",
      },
      {
        title: "Form 5500 - 2022 Filing",
        description: "Annual return/report (NAL0011609331001)",
        file: "/20220707135857NAL0011609331001.pdf",
        size: "Official Filing",
        type: "Compliance",
      },
      {
        title: "Form 5500 - 2023 Filing",
        description: "Annual return/report (NAL0018610066001)",
        file: "/20230824174425NAL0018610066001.pdf",
        size: "Official Filing",
        type: "Compliance",
      },
    ],
  },
];

const categoryColors = {
  emerald: "border-emerald-500/30 bg-emerald-500/5",
  purple: "border-purple-500/30 bg-purple-500/5",
  cyan: "border-cyan-500/30 bg-cyan-500/5",
  rose: "border-rose-500/30 bg-rose-500/5",
};

const badgeColors = {
  emerald: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  purple: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  cyan: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  rose: "bg-rose-500/20 text-rose-300 border-rose-500/30",
};

export default function ReportsLibrary() {
  return (
    <>
      <SEO
        title="Reports & Research Library | Kincaid IQ Intelligence Series"
        description="Access comprehensive case studies, white papers, Form 5500 analyses, and platform documentation from SiriusB iQ's Kincaid IQ Intelligence Series."
      />
      <Nav />
      
      <main className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950/20 to-gray-950 pt-24 pb-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 mb-16">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4">
              <FileText className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-300">Kincaid IQ Intelligence Series</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent leading-tight">
              Reports & Research Library
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Comprehensive collection of case studies, actuarial analyses, white papers, and platform documentation 
              demonstrating measurable results and thought leadership in benefits intelligence.
            </p>
          </div>
        </section>

        {/* Reports by Category */}
        <section className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto space-y-16">
            {reports.map((category, categoryIndex) => {
              const Icon = category.icon;
              const colorClass = categoryColors[category.color as keyof typeof categoryColors];
              const badgeClass = badgeColors[category.color as keyof typeof badgeColors];
              
              return (
                <div key={categoryIndex} className="space-y-6">
                  {/* Category Header */}
                  <div className="flex items-center gap-4 pb-4 border-b border-gray-800">
                    <div className={`p-3 rounded-lg ${colorClass} border`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">{category.category}</h2>
                      <p className="text-gray-400">{category.reports.length} documents</p>
                    </div>
                  </div>

                  {/* Reports Grid */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {category.reports.map((report, reportIndex) => (
                      <Card key={reportIndex} className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 group">
                        <CardHeader>
                          <div className="flex items-start justify-between mb-2">
                            <CardTitle className="text-lg text-white group-hover:text-purple-400 transition-colors">
                              {report.title}
                            </CardTitle>
                            <Badge variant="outline" className={badgeClass}>
                              {report.size}
                            </Badge>
                          </div>
                          <CardDescription className="text-gray-400">
                            {report.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">{report.type}</span>
                            <a
                              href={report.file}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 rounded-lg transition-colors text-sm font-medium">
                              <Download className="w-4 h-4" />
                              View PDF
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 mt-20">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30">
              <CardContent className="p-8 text-center space-y-6">
                <h2 className="text-3xl font-bold text-white">
                  Request Custom Analysis
                </h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  Need a tailored report for your organization? Our team of actuaries and consultants 
                  can deliver customized intelligence and actionable insights.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors font-medium">
                    Contact Our Team
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                  <Link 
                    href="/kincaid-iq-intelligence-series"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors font-medium border border-white/20">
                    Explore Intelligence Series
                    <TrendingUp className="w-4 h-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}