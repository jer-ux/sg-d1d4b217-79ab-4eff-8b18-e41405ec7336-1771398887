import { useState } from "react";
import Head from "next/head";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { EnterpriseHeader } from "@/components/enterprise/EnterpriseHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import Nav from "@/components/Nav";
import { 
  Search,
  Star,
  Download,
  TrendingUp,
  Shield,
  Zap,
  Users,
  BarChart3,
  FileText,
  Database,
  Cloud,
  Lock,
  Globe,
  Smartphone,
  CheckCircle
} from "lucide-react";

interface MarketplaceItem {
  id: string;
  name: string;
  description: string;
  price: number;
  billingType: "monthly" | "annual" | "one-time";
  category: string;
  icon: any;
  rating: number;
  installs: number;
  featured: boolean;
  vendor: string;
}

export default function EnterpriseMarketplace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const marketplaceItems: MarketplaceItem[] = [
    {
      id: "premium-processing",
      name: "Premium AI Processing",
      description: "10x faster contract analysis with dedicated GPU resources and priority queue",
      price: 2000,
      billingType: "monthly",
      category: "performance",
      icon: Zap,
      rating: 4.9,
      installs: 247,
      featured: true,
      vendor: "SiriusB iQ"
    },
    {
      id: "advanced-analytics",
      name: "Advanced Analytics Suite",
      description: "Power BI integration, custom dashboards, predictive modeling, and trend analysis",
      price: 1000,
      billingType: "monthly",
      category: "analytics",
      icon: BarChart3,
      rating: 4.8,
      installs: 189,
      featured: true,
      vendor: "SiriusB iQ"
    },
    {
      id: "custom-ai-model",
      name: "Custom AI Model Training",
      description: "Train Claude on your specific contract types and terminology for 30% better accuracy",
      price: 15000,
      billingType: "one-time",
      category: "ai",
      icon: Database,
      rating: 5.0,
      installs: 23,
      featured: true,
      vendor: "SiriusB iQ"
    },
    {
      id: "multi-region-storage",
      name: "Multi-Region Data Residency",
      description: "Store data in EU, APAC, or specific countries for compliance requirements",
      price: 3000,
      billingType: "monthly",
      category: "compliance",
      icon: Globe,
      rating: 4.7,
      installs: 67,
      featured: false,
      vendor: "SiriusB iQ"
    },
    {
      id: "white-label-reseller",
      name: "White-Label Reseller Package",
      description: "Complete rebrand and resell platform under your own brand name",
      price: 5000,
      billingType: "monthly",
      category: "reseller",
      icon: Users,
      rating: 4.9,
      installs: 12,
      featured: true,
      vendor: "SiriusB iQ"
    },
    {
      id: "mobile-app-license",
      name: "Mobile App Access",
      description: "iOS and Android apps for on-the-go contract review and approval",
      price: 500,
      billingType: "monthly",
      category: "mobile",
      icon: Smartphone,
      rating: 4.6,
      installs: 156,
      featured: false,
      vendor: "SiriusB iQ"
    },
    {
      id: "soc2-package",
      name: "SOC 2 Compliance Package",
      description: "Full SOC 2 Type II certification assistance and audit preparation",
      price: 10000,
      billingType: "one-time",
      category: "compliance",
      icon: Shield,
      rating: 5.0,
      installs: 34,
      featured: true,
      vendor: "Compliance Partners"
    },
    {
      id: "hipaa-package",
      name: "HIPAA Compliance Bundle",
      description: "Healthcare-specific compliance tools and BAA templates",
      price: 8000,
      billingType: "one-time",
      category: "compliance",
      icon: Lock,
      rating: 4.8,
      installs: 45,
      featured: false,
      vendor: "HealthTech Security"
    },
    {
      id: "benchmarking-service",
      name: "Industry Benchmarking Data",
      description: "Access to 10,000+ anonymized contract benchmarks by industry and deal size",
      price: 1500,
      billingType: "monthly",
      category: "analytics",
      icon: TrendingUp,
      rating: 4.7,
      installs: 98,
      featured: true,
      vendor: "BenchmarkDB"
    },
    {
      id: "professional-services",
      name: "Dedicated Success Manager",
      description: "Weekly strategy calls, custom training, and priority support",
      price: 3000,
      billingType: "monthly",
      category: "services",
      icon: Users,
      rating: 5.0,
      installs: 56,
      featured: false,
      vendor: "SiriusB iQ"
    },
    {
      id: "api-credits",
      name: "Additional API Credits",
      description: "10,000 extra Claude API calls per month for high-volume processing",
      price: 2000,
      billingType: "monthly",
      category: "performance",
      icon: Cloud,
      rating: 4.5,
      installs: 203,
      featured: false,
      vendor: "SiriusB iQ"
    },
    {
      id: "custom-reports",
      name: "Custom Report Templates",
      description: "5 bespoke report templates designed for your specific use cases",
      price: 3000,
      billingType: "one-time",
      category: "reporting",
      icon: FileText,
      rating: 4.9,
      installs: 78,
      featured: false,
      vendor: "Design Studio"
    }
  ];

  const categories = [
    { id: "all", label: "All Add-Ons", count: marketplaceItems.length },
    { id: "performance", label: "Performance", count: marketplaceItems.filter(i => i.category === "performance").length },
    { id: "analytics", label: "Analytics", count: marketplaceItems.filter(i => i.category === "analytics").length },
    { id: "compliance", label: "Compliance", count: marketplaceItems.filter(i => i.category === "compliance").length },
    { id: "ai", label: "AI & ML", count: marketplaceItems.filter(i => i.category === "ai").length },
    { id: "mobile", label: "Mobile", count: marketplaceItems.filter(i => i.category === "mobile").length },
    { id: "services", label: "Services", count: marketplaceItems.filter(i => i.category === "services").length }
  ];

  const filteredItems = marketplaceItems.filter(item => {
    const matchesSearch = searchQuery === "" || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredItems = marketplaceItems.filter(item => item.featured);

  return (
    <>
      <Head>
        <title>Enterprise Marketplace - SiriusB iQ</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        <EnterpriseHeader />
        <Nav />

        <main className="container mx-auto px-4 py-8 max-w-[1400px]">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Enterprise Marketplace</h1>
            <p className="text-gray-600">Premium features and integrations to supercharge your platform</p>
          </div>

          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
              <Input 
                className="pl-12 h-14 text-lg"
                placeholder="Search add-ons, integrations, and services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-8">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map(cat => (
                <Button
                  key={cat.id}
                  variant={selectedCategory === cat.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(cat.id)}
                  className="whitespace-nowrap"
                >
                  {cat.label} ({cat.count})
                </Button>
              ))}
            </div>
          </div>

          {searchQuery === "" && selectedCategory === "all" && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">⭐ Featured Add-Ons</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredItems.map(item => (
                  <Card key={item.id} className="border-2 border-yellow-400 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-bl-lg">
                      FEATURED
                    </div>
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-blue-100 rounded-lg">
                          <item.icon className="h-8 w-8 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{item.name}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                              <span className="text-sm font-medium">{item.rating}</span>
                            </div>
                            <span className="text-sm text-gray-500">•</span>
                            <span className="text-sm text-gray-500">{item.installs} installs</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold">
                            ${(item.price / 1000).toFixed(item.price >= 1000 ? 0 : 2)}K
                          </div>
                          <div className="text-xs text-gray-500">
                            {item.billingType === "monthly" ? "per month" : 
                             item.billingType === "annual" ? "per year" : "one-time"}
                          </div>
                        </div>
                        <Button>Add to Plan</Button>
                      </div>
                      <div className="text-xs text-gray-500 mt-2">by {item.vendor}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          <div>
            <h2 className="text-2xl font-bold mb-6">
              {searchQuery || selectedCategory !== "all" ? "Search Results" : "All Add-Ons"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map(item => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gray-100 rounded-lg">
                        <item.icon className="h-8 w-8 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{item.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            <span className="text-sm font-medium">{item.rating}</span>
                          </div>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-gray-500">{item.installs} installs</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                    <Badge variant="outline" className="mb-4">{item.category}</Badge>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold">
                          ${(item.price / 1000).toFixed(item.price >= 1000 ? 0 : 2)}K
                        </div>
                        <div className="text-xs text-gray-500">
                          {item.billingType === "monthly" ? "per month" : 
                           item.billingType === "annual" ? "per year" : "one-time"}
                        </div>
                      </div>
                      <Button variant="outline">Learn More</Button>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">by {item.vendor}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <Search className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No results found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          )}
        </main>

        <SiteFooter />
      </div>
    </>
  );
}