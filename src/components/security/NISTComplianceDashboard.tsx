import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  Search, 
  Eye, 
  AlertTriangle, 
  RefreshCw,
  CheckCircle2,
  XCircle,
  Clock
} from "lucide-react";
import { 
  NIST_CSF_FRAMEWORK, 
  calculateFunctionScore, 
  getComplianceSummary,
  type NISTFunction,
  type NISTCategory
} from "@/lib/security/nist-csf";

const functionIcons: Record<NISTFunction, typeof Shield> = {
  identify: Search,
  protect: Shield,
  detect: Eye,
  respond: AlertTriangle,
  recover: RefreshCw
};

const functionColors: Record<NISTFunction, string> = {
  identify: "text-blue-600",
  protect: "text-green-600",
  detect: "text-yellow-600",
  respond: "text-orange-600",
  recover: "text-purple-600"
};

function getStatusBadge(status: string) {
  switch (status) {
    case 'compliant':
      return <Badge variant="default" className="bg-green-600"><CheckCircle2 className="w-3 h-3 mr-1" />Compliant</Badge>;
    case 'partial':
      return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" />Partial</Badge>;
    case 'not-implemented':
      return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Not Implemented</Badge>;
    default:
      return <Badge variant="outline">N/A</Badge>;
  }
}

export function NISTComplianceDashboard() {
  const summary = getComplianceSummary();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold">NIST Cybersecurity Framework</h1>
        <p className="text-muted-foreground text-lg">
          Compliance Status & Security Controls
        </p>
      </div>

      {/* Overall Compliance Score */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Overall Compliance</h2>
            <span className="text-3xl font-bold text-green-600">
              {Math.round(summary.overall)}%
            </span>
          </div>
          <Progress value={summary.overall} className="h-3" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Total Categories</p>
              <p className="text-xl font-semibold">{summary.totalCategories}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Total Controls</p>
              <p className="text-xl font-semibold">{summary.totalSubcategories}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Compliant</p>
              <p className="text-xl font-semibold text-green-600">{summary.compliantSubcategories}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Framework Version</p>
              <p className="text-xl font-semibold">CSF 1.1</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Functions Overview */}
      <div className="grid md:grid-cols-5 gap-4">
        {summary.byFunction.map(({ function: func, score }) => {
          const Icon = functionIcons[func];
          return (
            <Card key={func} className="p-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Icon className={`w-5 h-5 ${functionColors[func]}`} />
                  <h3 className="font-semibold capitalize">{func}</h3>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Score</span>
                    <span className="font-semibold">{Math.round(score)}%</span>
                  </div>
                  <Progress value={score} className="h-2" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Detailed Controls */}
      <Tabs defaultValue="identify" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="identify">Identify</TabsTrigger>
          <TabsTrigger value="protect">Protect</TabsTrigger>
          <TabsTrigger value="detect">Detect</TabsTrigger>
          <TabsTrigger value="respond">Respond</TabsTrigger>
          <TabsTrigger value="recover">Recover</TabsTrigger>
        </TabsList>

        {(['identify', 'protect', 'detect', 'respond', 'recover'] as NISTFunction[]).map(func => (
          <TabsContent key={func} value={func} className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              {(() => {
                const Icon = functionIcons[func];
                return <Icon className={`w-6 h-6 ${functionColors[func]}`} />;
              })()}
              <h2 className="text-2xl font-bold capitalize">{func}</h2>
              <Badge variant="outline" className="ml-auto">
                {Math.round(calculateFunctionScore(func))}% Complete
              </Badge>
            </div>

            {NIST_CSF_FRAMEWORK.filter(cat => cat.function === func).map((category: NISTCategory) => (
              <Card key={category.id} className="p-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold">{category.id}: {category.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </div>

                  <div className="space-y-3">
                    {category.subcategories.map(sub => (
                      <div key={sub.id} className="border-l-2 border-border pl-4 space-y-2">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-mono text-sm font-semibold">{sub.id}</span>
                              {getStatusBadge(sub.status)}
                            </div>
                            <p className="text-sm">{sub.description}</p>
                          </div>
                        </div>

                        {sub.evidence && sub.evidence.length > 0 && (
                          <div className="mt-2">
                            <p className="text-xs font-semibold text-muted-foreground mb-1">Evidence:</p>
                            <ul className="text-xs space-y-1">
                              {sub.evidence.map((ev, idx) => (
                                <li key={idx} className="text-muted-foreground">• {ev}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}