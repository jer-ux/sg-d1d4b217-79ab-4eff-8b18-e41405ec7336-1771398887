import Head from "next/head";
import { EnterpriseHeader } from "@/components/enterprise/EnterpriseHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { McKinseyStrategicFramework } from "@/components/enterprise/McKinseyStrategicFramework";
import { BainRepeatabilityFramework } from "@/components/enterprise/BainRepeatabilityFramework";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Briefcase, 
  TrendingUp, 
  Target, 
  Award,
  Download,
  Share2,
  Lightbulb
} from "lucide-react";

export default function StrategyConsulting() {
  return (
    <>
      <Head>
        <title>Strategic Consulting Frameworks | SiriusB iQ Enterprise</title>
        <meta
          name="description"
          content="McKinsey and Bain strategic frameworks for enterprise growth and organizational excellence"
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <EnterpriseHeader />

        <main className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-600 rounded-lg">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">Strategic Consulting</h1>
                <p className="text-muted-foreground text-lg">
                  McKinsey & Bain frameworks for enterprise excellence
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <Target className="h-8 w-8 text-blue-600" />
                    <Badge className="bg-blue-600">Active</Badge>
                  </div>
                  <div className="text-2xl font-bold">7S</div>
                  <p className="text-sm text-muted-foreground">McKinsey Framework</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <TrendingUp className="h-8 w-8 text-green-600" />
                    <Badge className="bg-green-600">Active</Badge>
                  </div>
                  <div className="text-2xl font-bold">3H</div>
                  <p className="text-sm text-muted-foreground">Three Horizons</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <Award className="h-8 w-8 text-purple-600" />
                    <Badge className="bg-purple-600">Active</Badge>
                  </div>
                  <div className="text-2xl font-bold">R³</div>
                  <p className="text-sm text-muted-foreground">Repeatability Model</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <Lightbulb className="h-8 w-8 text-amber-600" />
                    <Badge className="bg-amber-600">Active</Badge>
                  </div>
                  <div className="text-2xl font-bold">NPS</div>
                  <p className="text-sm text-muted-foreground">Net Promoter</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Strategic Frameworks */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Strategic Analysis & Planning</CardTitle>
                  <CardDescription>
                    World-class consulting methodologies integrated into your platform
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export Analysis
                  </Button>
                  <Button size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share with Board
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="mckinsey" className="space-y-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="mckinsey">McKinsey Frameworks</TabsTrigger>
                  <TabsTrigger value="bain">Bain Frameworks</TabsTrigger>
                </TabsList>

                <TabsContent value="mckinsey">
                  <McKinseyStrategicFramework />
                </TabsContent>

                <TabsContent value="bain">
                  <BainRepeatabilityFramework />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Implementation Guide */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>How to Use Strategic Frameworks</CardTitle>
              <CardDescription>
                Best practices for applying McKinsey and Bain methodologies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">McKinsey 7S Framework</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Use for organizational alignment and effectiveness assessment</li>
                    <li>• Review quarterly to track strategic health improvements</li>
                    <li>• Share with executive team for strategic planning sessions</li>
                    <li>• Benchmark against industry leaders and best practices</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Bain Repeatability</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Apply to scale operations and achieve predictable growth</li>
                    <li>• Monitor NPS weekly to drive customer-centric culture</li>
                    <li>• Use for investor presentations and board reporting</li>
                    <li>• Integrate into strategic planning and OKR processes</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Three Horizons Model</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Balance investment across defend, build, and create initiatives</li>
                    <li>• Track initiative progress monthly with leadership team</li>
                    <li>• Allocate resources based on expected returns and timeframes</li>
                    <li>• Adjust portfolio mix based on market conditions and results</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Strategic Actions</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Export analyses for strategic planning sessions</li>
                    <li>• Share dashboards with board members and investors</li>
                    <li>• Use insights to guide hiring and organizational design</li>
                    <li>• Benchmark performance against consulting best practices</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>

        <SiteFooter />
      </div>
    </>
  );
}