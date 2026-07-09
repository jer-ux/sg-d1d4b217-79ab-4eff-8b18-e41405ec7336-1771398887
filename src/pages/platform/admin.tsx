import { useState, useEffect } from "react";
import Head from "next/head";
import Nav from "@/components/Nav";
import { SEO } from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Zap, 
  Brain,
  Calculator,
  TrendingUp,
  Database,
  Activity,
  HelpCircle,
  BookOpen,
  Sparkles,
  CheckCircle,
  XCircle,
  Clock,
  ArrowRight,
  Download,
  Eye,
} from "lucide-react";
import { useEngineStatus } from "@/hooks/useEngines";

// Engine definitions with 10th-grader-friendly descriptions
const ENGINES = [
  {
    id: "economic",
    name: "Money Math Engine",
    icon: Calculator,
    color: "emerald",
    description: "Calculates costs, profits, and returns on investment",
    eliExplanation: "Like a super-smart calculator that can tell you if something will make or lose money",
    examples: [
      "How much money did we save?",
      "What's our return on investment?",
      "Where is money flowing in our business?",
    ],
    computations: [
      { id: "cost_attribution", label: "Cost Breakdown", icon: "💰" },
      { id: "roi", label: "Return Calculator", icon: "📈" },
      { id: "value_flow", label: "Money Flow Map", icon: "🌊" },
    ],
  },
  {
    id: "statistical",
    name: "Pattern Finder Engine",
    icon: TrendingUp,
    color: "blue",
    description: "Finds patterns and relationships in your data",
    eliExplanation: "Like a detective that looks at numbers and finds hidden connections",
    examples: [
      "Do higher prices lead to lower sales?",
      "Is there a relationship between these two things?",
      "What does this trend mean?",
    ],
    computations: [
      { id: "distribution", label: "Data Shape Analyzer", icon: "📊" },
      { id: "regression", label: "Relationship Finder", icon: "🔗" },
      { id: "credibility", label: "Trust Score Calculator", icon: "✅" },
      { id: "hypothesis_test", label: "Proof Tester", icon: "🔬" },
    ],
  },
  {
    id: "simulation",
    name: "Future Predictor Engine",
    icon: Brain,
    color: "purple",
    description: "Runs thousands of 'what-if' scenarios to predict outcomes",
    eliExplanation: "Like a time machine that shows you 1,000 different possible futures",
    examples: [
      "What could happen if we change our pricing?",
      "What's the worst-case scenario?",
      "How likely is this outcome?",
    ],
    computations: [
      { id: "monte_carlo", label: "Future Simulator", icon: "🎲" },
      { id: "correlation", label: "Connection Mapper", icon: "🕸️" },
      { id: "var", label: "Risk Measurer", icon: "⚠️" },
      { id: "scenario", label: "What-If Tester", icon: "🔮" },
    ],
  },
];

// Pre-built recipe templates
const RECIPES = [
  {
    id: "pharmacy_savings",
    name: "Calculate Pharmacy Savings",
    description: "See how much money we saved on prescription drugs",
    difficulty: "Easy",
    time: "30 seconds",
    steps: ["Load drug costs", "Compare to benchmarks", "Calculate savings"],
    engines: ["economic"],
  },
  {
    id: "trend_analysis",
    name: "Spot Cost Trends",
    description: "Find out if costs are going up, down, or staying the same",
    difficulty: "Easy",
    time: "1 minute",
    steps: ["Load historical data", "Analyze trends", "Project future"],
    engines: ["statistical"],
  },
  {
    id: "risk_forecast",
    name: "Predict Future Risks",
    description: "Run 10,000 simulations to see what might happen next year",
    difficulty: "Medium",
    time: "2 minutes",
    steps: ["Set parameters", "Run simulations", "Analyze outcomes"],
    engines: ["simulation"],
  },
  {
    id: "roi_deep_dive",
    name: "Full ROI Analysis",
    description: "Complete return on investment calculation with confidence scores",
    difficulty: "Medium",
    time: "3 minutes",
    steps: ["Calculate ROI", "Test reliability", "Simulate scenarios"],
    engines: ["economic", "statistical", "simulation"],
  },
];

export default function EngineAdminDashboard() {
  const [activeTab, setActiveTab] = useState("control-center");
  const [selectedEngine, setSelectedEngine] = useState<string | null>(null);
  const [eliMode, setEliMode] = useState(false);
  const [runningJobs, setRunningJobs] = useState<any[]>([]);
  const engineStatusData = useEngineStatus();

  const engineStatus = {
    economic: engineStatusData.data?.engines?.economic?.status || "unknown",
    statistical: engineStatusData.data?.engines?.statistical?.status || "unknown",
    simulation: engineStatusData.data?.engines?.simulation?.status || "unknown",
  };

  return (
    <>
      <SEO
        title="Engine Control Center - KINCAID AIOS"
        description="Visual dashboard to launch, monitor, and learn about all 15 Universal Computation Engines"
      />
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                <Zap className="h-10 w-10 text-yellow-400" />
                Engine Control Center
              </h1>
              <p className="text-slate-400">
                Launch powerful computations with a single click
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant={eliMode ? "default" : "outline"}
                onClick={() => setEliMode(!eliMode)}
                className="gap-2">
                <Sparkles className="h-4 w-4" />
                {eliMode ? "Simple Mode ON" : "Simple Mode"}
              </Button>
              
              <Button variant="outline" className="gap-2">
                <BookOpen className="h-4 w-4" />
                User Guide
              </Button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="control-center">
                <Zap className="h-4 w-4 mr-2" />
                Control Center
              </TabsTrigger>
              <TabsTrigger value="recipe-book">
                <BookOpen className="h-4 w-4 mr-2" />
                Recipe Book
              </TabsTrigger>
              <TabsTrigger value="job-monitor">
                <Activity className="h-4 w-4 mr-2" />
                Job Monitor
              </TabsTrigger>
              <TabsTrigger value="learn">
                <Brain className="h-4 w-4 mr-2" />
                Learn
              </TabsTrigger>
            </TabsList>

            {/* CONTROL CENTER TAB */}
            <TabsContent value="control-center" className="space-y-6">
              
              {/* Engine Status Banner */}
              <Card className="p-6 bg-slate-900/50 border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Activity className="h-5 w-5 text-green-400" />
                  Engine Status
                </h3>
                
                <div className="grid grid-cols-3 gap-4">
                  {ENGINES.map((engine) => {
                    const status = engineStatus[engine.id as keyof typeof engineStatus];
                    const isHealthy = status === "healthy";
                    
                    return (
                      <div
                        key={engine.id}
                        className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg bg-${engine.color}-500/20`}>
                            <engine.icon className={`h-5 w-5 text-${engine.color}-400`} />
                          </div>
                          <div>
                            <p className="font-medium text-white">{engine.name}</p>
                            <p className="text-xs text-slate-400">{engine.computations.length} tools</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {isHealthy ? (
                            <CheckCircle className="h-5 w-5 text-green-400" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-400" />
                          )}
                          <span className={`text-sm font-medium ${isHealthy ? "text-green-400" : "text-red-400"}`}>
                            {isHealthy ? "Ready" : "Offline"}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>

              {/* Engine Grid */}
              <div className="grid md:grid-cols-3 gap-6">
                {ENGINES.map((engine) => (
                  <Card
                    key={engine.id}
                    className="p-6 bg-slate-900/50 border-slate-700 hover:border-slate-600 transition-all cursor-pointer group"
                    onClick={() => setSelectedEngine(engine.id)}>
                    
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-${engine.color}-500/20 group-hover:bg-${engine.color}-500/30 transition-colors`}>
                        <engine.icon className={`h-8 w-8 text-${engine.color}-400`} />
                      </div>
                      
                      <Button size="sm" className={`bg-${engine.color}-500 hover:bg-${engine.color}-600`}>
                        <Play className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2">
                      {engine.name}
                    </h3>
                    
                    <p className="text-sm text-slate-400 mb-4">
                      {eliMode ? engine.eliExplanation : engine.description}
                    </p>
                    
                    {eliMode && (
                      <div className="space-y-2 mb-4">
                        <p className="text-xs font-semibold text-slate-300">Example Questions:</p>
                        {engine.examples.slice(0, 2).map((example, i) => (
                          <p key={i} className="text-xs text-slate-500 italic">
                            "{example}"
                          </p>
                        ))}
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-slate-400 mb-2">Available Tools:</p>
                      {engine.computations.map((comp) => (
                        <div
                          key={comp.id}
                          className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors">
                          <span>{comp.icon}</span>
                          <span>{comp.label}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-slate-700 flex items-center justify-between">
                      <HelpCircle className="h-4 w-4 text-slate-500" />
                      <span className="text-xs text-slate-500">Click to launch</span>
                    </div>
                  </Card>
                ))}
              </div>
              
            </TabsContent>

            {/* RECIPE BOOK TAB */}
            <TabsContent value="recipe-book" className="space-y-6">
              
              <Card className="p-6 bg-slate-900/50 border-slate-700">
                <h3 className="text-xl font-bold text-white mb-2">
                  Pre-Built Analysis Recipes
                </h3>
                <p className="text-slate-400 mb-6">
                  {eliMode 
                    ? "Click any recipe to run a complete analysis in seconds—no setup needed!"
                    : "Ready-to-use analysis templates that chain multiple engines together"}
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {RECIPES.map((recipe) => (
                    <Card key={recipe.id} className="p-5 bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all cursor-pointer group">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-white mb-1">{recipe.name}</h4>
                          <p className="text-sm text-slate-400">{recipe.description}</p>
                        </div>
                        <Button size="sm" className="bg-indigo-500 hover:bg-indigo-600 shrink-0">
                          <Play className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                        <Badge variant="outline" className="text-xs">
                          {recipe.difficulty}
                        </Badge>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {recipe.time}
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        {recipe.steps.map((step, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-slate-400">
                            <div className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-semibold">
                              {i + 1}
                            </div>
                            <span>{step}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-slate-700 flex items-center gap-2">
                        {recipe.engines.map((eng) => {
                          const engine = ENGINES.find((e) => e.id === eng);
                          if (!engine) return null;
                          return (
                            <Badge key={eng} variant="secondary" className="text-xs">
                              {engine.name.split(" ")[0]}
                            </Badge>
                          );
                        })}
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
              
            </TabsContent>

            {/* JOB MONITOR TAB */}
            <TabsContent value="job-monitor" className="space-y-6">
              
              <Card className="p-6 bg-slate-900/50 border-slate-700">
                <h3 className="text-xl font-bold text-white mb-4">
                  Running Jobs
                </h3>
                
                {runningJobs.length === 0 ? (
                  <div className="text-center py-12">
                    <Activity className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-400">No jobs running</p>
                    <p className="text-sm text-slate-500 mt-2">
                      Launch an engine or recipe to see live progress here
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {runningJobs.map((job) => (
                      <div key={job.id} className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-white">{job.name}</h4>
                            <p className="text-sm text-slate-400">{job.status}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Pause className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="w-full bg-slate-700 rounded-full h-2 mb-2">
                          <div
                            className="bg-indigo-500 h-2 rounded-full transition-all"
                            style={{ width: `${job.progress}%` }}
                          />
                        </div>
                        
                        <p className="text-xs text-slate-500">
                          {job.progress}% complete • {job.timeRemaining} remaining
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
              
            </TabsContent>

            {/* LEARN TAB */}
            <TabsContent value="learn" className="space-y-6">
              
              <Card className="p-6 bg-slate-900/50 border-slate-700">
                <h3 className="text-xl font-bold text-white mb-2">
                  How Engines Work
                </h3>
                <p className="text-slate-400 mb-6">
                  {eliMode 
                    ? "Think of engines like different tools in a toolbox—each one solves a specific type of problem"
                    : "Understanding the computational engines powering KINCAID AIOS"}
                </p>
                
                <div className="space-y-4">
                  {ENGINES.map((engine) => (
                    <Card key={engine.id} className="p-5 bg-slate-800/50 border-slate-700">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl bg-${engine.color}-500/20 shrink-0`}>
                          <engine.icon className={`h-6 w-6 text-${engine.color}-400`} />
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="font-bold text-white mb-2">{engine.name}</h4>
                          <p className="text-sm text-slate-400 mb-4">
                            {eliMode ? engine.eliExplanation : engine.description}
                          </p>
                          
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs font-semibold text-slate-300 mb-2">
                                Real-World Examples:
                              </p>
                              <ul className="space-y-1">
                                {engine.examples.map((example, i) => (
                                  <li key={i} className="text-sm text-slate-500 flex items-start gap-2">
                                    <ArrowRight className="h-4 w-4 text-slate-600 shrink-0 mt-0.5" />
                                    <span>{example}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <Button variant="outline" size="sm" className="gap-2">
                              <Play className="h-3 w-3" />
                              Try Example Calculation
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
              
            </TabsContent>
          </Tabs>
          
        </div>
      </div>
    </>
  );
}