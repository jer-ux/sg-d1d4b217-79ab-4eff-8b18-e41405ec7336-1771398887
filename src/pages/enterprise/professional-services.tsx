import { useState } from "react";
import Head from "next/head";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EnterpriseHeader } from "@/components/enterprise/EnterpriseHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { 
  Users,
  GraduationCap,
  Briefcase,
  Target,
  Zap,
  CheckCircle,
  Calendar,
  DollarSign,
  TrendingUp,
  Award,
  Clock,
  MessageSquare
} from "lucide-react";

export default function ProfessionalServices() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const services = [
    {
      id: "onboarding",
      name: "Enterprise Onboarding",
      price: 5000,
      duration: "2 weeks",
      icon: Zap,
      description: "Get your team up and running fast with guided implementation",
      features: [
        "Dedicated onboarding specialist",
        "Custom workflow design",
        "Data migration assistance",
        "Team training sessions",
        "SSO/SAML configuration",
        "Initial contract batch upload",
        "Performance optimization",
        "Go-live support"
      ],
      deliverables: [
        "Customized deployment plan",
        "Training materials",
        "Best practices guide",
        "Success metrics dashboard"
      ]
    },
    {
      id: "training",
      name: "Advanced Training Program",
      price: 3000,
      duration: "1 week",
      icon: GraduationCap,
      description: "Master the platform with role-specific training for your team",
      features: [
        "Executive briefing (C-suite)",
        "Legal team deep-dive",
        "Finance analyst training",
        "IT admin certification",
        "Power user workshops",
        "Custom training videos",
        "Certification program",
        "Ongoing Q&A sessions"
      ],
      deliverables: [
        "Training curriculum",
        "Video library",
        "Certification badges",
        "Knowledge base"
      ]
    },
    {
      id: "custom-integration",
      name: "Custom Integration Build",
      price: 10000,
      duration: "4 weeks",
      icon: Briefcase,
      description: "Connect SiriusB to your existing systems and workflows",
      features: [
        "Requirements gathering",
        "API integration development",
        "Custom middleware",
        "Legacy system connectors",
        "Real-time data sync",
        "Automated workflows",
        "Testing & validation",
        "Production deployment"
      ],
      deliverables: [
        "Integration architecture",
        "Custom API endpoints",
        "Technical documentation",
        "Support & maintenance plan"
      ]
    },
    {
      id: "strategic-consulting",
      name: "Strategic Consulting",
      price: 15000,
      duration: "Ongoing",
      icon: Target,
      description: "Dedicated advisor to maximize ROI and drive adoption",
      features: [
        "Quarterly business reviews",
        "Contract portfolio analysis",
        "Savings opportunity assessment",
        "Industry benchmarking",
        "Process optimization",
        "Change management",
        "Executive reporting",
        "Roadmap planning"
      ],
      deliverables: [
        "Strategic roadmap",
        "ROI analysis reports",
        "Executive dashboards",
        "Optimization recommendations"
      ]
    },
    {
      id: "custom-ai-model",
      name: "Custom AI Model Training",
      price: 25000,
      duration: "6 weeks",
      icon: Award,
      description: "Fine-tune Claude on your specific contract types and terminology",
      features: [
        "Domain-specific training data",
        "Custom entity extraction",
        "Industry terminology tuning",
        "Improved accuracy (30%+)",
        "Proprietary clause detection",
        "Risk scoring calibration",
        "A/B testing validation",
        "Model performance monitoring"
      ],
      deliverables: [
        "Custom AI model",
        "Performance benchmarks",
        "Training documentation",
        "Ongoing model updates"
      ]
    },
    {
      id: "dedicated-support",
      name: "Dedicated Success Manager",
      price: 3000,
      duration: "Monthly",
      icon: Users,
      description: "White-glove support with a dedicated point of contact",
      features: [
        "Named success manager",
        "Weekly check-in calls",
        "Priority support queue",
        "Proactive health checks",
        "Feature recommendations",
        "Beta access",
        "Direct engineering escalation",
        "Quarterly executive briefings"
      ],
      deliverables: [
        "Monthly health reports",
        "Adoption metrics",
        "Feature utilization analysis",
        "Success action plans"
      ]
    }
  ];

  const packages = [
    {
      name: "Startup Package",
      price: 15000,
      savings: 3000,
      services: ["onboarding", "training"],
      popular: false
    },
    {
      name: "Growth Package",
      price: 35000,
      savings: 8000,
      services: ["onboarding", "training", "custom-integration", "dedicated-support"],
      popular: true
    },
    {
      name: "Enterprise Package",
      price: 60000,
      savings: 15000,
      services: ["onboarding", "training", "custom-integration", "strategic-consulting", "custom-ai-model"],
      popular: false
    }
  ];

  return (
    <>
      <Head>
        <title>Professional Services - SiriusB iQ</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        <EnterpriseHeader />

        <main className="container mx-auto px-4 py-8 max-w-[1400px]">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Professional Services</h1>
            <p className="text-gray-600">Expert guidance to maximize your platform investment</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            {packages.map((pkg, idx) => (
              <Card key={idx} className={pkg.popular ? "border-2 border-blue-600 relative" : ""}>
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-bl-lg">
                    MOST POPULAR
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{pkg.name}</CardTitle>
                  <CardDescription>
                    <div className="text-3xl font-bold text-blue-600 mt-2">
                      ${(pkg.price / 1000).toFixed(0)}K
                    </div>
                    <div className="text-sm text-green-600 mt-1">
                      Save ${(pkg.savings / 1000).toFixed(0)}K vs à la carte
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-6">
                    {pkg.services.map(serviceId => {
                      const service = services.find(s => s.id === serviceId);
                      return (
                        <div key={serviceId} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm">{service?.name}</span>
                        </div>
                      );
                    })}
                  </div>
                  <Button className="w-full" variant={pkg.popular ? "default" : "outline"}>
                    Request Quote
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Individual Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map(service => (
                <Card key={service.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <service.icon className="h-8 w-8 text-blue-600" />
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        {service.duration}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{service.name}</CardTitle>
                    <CardDescription className="text-sm mt-2">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <div className="text-3xl font-bold text-blue-600">
                        ${(service.price / 1000).toFixed(0)}K
                      </div>
                      <div className="text-sm text-gray-500">One-time fee</div>
                    </div>
                    <div className="space-y-2 mb-4">
                      {service.features.slice(0, 4).map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </div>
                      ))}
                      {service.features.length > 4 && (
                        <div className="text-sm text-gray-500 pl-6">
                          +{service.features.length - 4} more features
                        </div>
                      )}
                    </div>
                    <Button 
                      className="w-full" 
                      variant="outline"
                      onClick={() => setSelectedService(service.id)}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Why Choose Professional Services?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                    <TrendingUp className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Faster Time to Value</h3>
                  <p className="text-sm text-gray-600">
                    Get up and running 3x faster with expert guidance
                  </p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <Target className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Higher ROI</h3>
                  <p className="text-sm text-gray-600">
                    Clients with professional services see 5x better ROI
                  </p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                    <Award className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Best Practices</h3>
                  <p className="text-sm text-gray-600">
                    Learn from 100+ successful enterprise deployments
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ready to Get Started?</CardTitle>
              <CardDescription>
                Schedule a consultation with our professional services team
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <Button size="lg" className="flex-1">
                  <Calendar className="h-5 w-5 mr-2" />
                  Schedule Consultation
                </Button>
                <Button size="lg" variant="outline" className="flex-1">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Chat with Sales
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>

        <SiteFooter />
      </div>
    </>
  );
}