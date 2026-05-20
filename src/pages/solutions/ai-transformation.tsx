import { SEO } from "@/components/SEO";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Brain,
  Sparkles,
  TrendingUp,
  Shield,
  Zap,
  Users,
  BarChart3,
  GitBranch,
  Clock,
  DollarSign,
  CheckCircle2,
  ArrowRight,
  Workflow,
  Database,
  Lock,
  Gauge,
  Activity,
  Target,
  Layers,
  Bot,
  Cpu
} from "lucide-react";
import Nav from "@/components/Nav";

export default function AITransformationPage() {
  return (
    <>
      <SEO
        title="100% AI Transformation for Middle & Large Market | SiriusB iQ"
        description="Complete AI-driven business transformation for middle and large market enterprises. Automate operations, reduce costs by 40-60%, and scale intelligently with agentic AI systems."
        image="/slide04_architecture.png"
      />
      <SiteHeader />
      <Nav />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.1),transparent_50%)]" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-blue-500/20 text-blue-300 border-blue-500/30">
              Enterprise AI Transformation
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
              100% AI Transformation
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-4">
              For Middle & Large Market Enterprises
            </p>
            <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
              Complete business transformation powered by agentic AI. Automate operations, reduce costs by 40-60%, and achieve unprecedented scale with intelligent systems that learn and adapt.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/request-demo">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Schedule Transformation Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/platform">
                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  View Platform
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-slate-900 border-y border-slate-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Cost Reduction", value: "40-60%", icon: DollarSign },
              { label: "Efficiency Gain", value: "10x", icon: Zap },
              { label: "Implementation", value: "90 Days", icon: Clock },
              { label: "ROI Timeline", value: "6 Months", icon: TrendingUp }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <stat.icon className="h-8 w-8 mx-auto mb-2 text-blue-400" />
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transformation Pillars */}
      <section className="py-20 bg-slate-950">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Four Pillars of AI Transformation
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              A comprehensive approach to enterprise-wide AI adoption
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Brain,
                title: "Agentic Intelligence",
                description: "Self-learning AI agents that handle complex workflows autonomously",
                features: [
                  "Multi-agent orchestration",
                  "Autonomous decision-making",
                  "Continuous learning & adaptation",
                  "Cross-functional coordination"
                ]
              },
              {
                icon: Workflow,
                title: "Process Automation",
                description: "End-to-end automation of business-critical operations",
                features: [
                  "Claims processing automation",
                  "Contract analysis & review",
                  "Financial reconciliation",
                  "Compliance monitoring"
                ]
              },
              {
                icon: Database,
                title: "Data Intelligence",
                description: "Real-time insights from unified enterprise data",
                features: [
                  "Predictive analytics",
                  "Anomaly detection",
                  "Pattern recognition",
                  "Risk scoring & forecasting"
                ]
              },
              {
                icon: Shield,
                title: "Governance & Trust",
                description: "Enterprise-grade security and compliance built-in",
                features: [
                  "Audit trails & provenance",
                  "SOC 2 Type II certified",
                  "HIPAA & ERISA compliant",
                  "Explainable AI decisions"
                ]
              }
            ].map((pillar, i) => (
              <Card key={i} className="bg-slate-900 border-slate-800 p-8 hover:border-blue-500/50 transition-colors">
                <pillar.icon className="h-12 w-12 text-blue-400 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">{pillar.title}</h3>
                <p className="text-slate-400 mb-6">{pillar.description}</p>
                <ul className="space-y-2">
                  {pillar.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-slate-300">
                      <CheckCircle2 className="h-5 w-5 text-green-400 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Transformation Journey */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-950">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              90-Day Transformation Journey
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Rapid deployment with measurable results at each milestone
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            {[
              {
                phase: "Phase 1",
                duration: "Days 1-30",
                title: "Discovery & Foundation",
                icon: Target,
                activities: [
                  "Business process mapping",
                  "Data landscape assessment",
                  "AI readiness evaluation",
                  "ROI baseline establishment",
                  "Quick-win identification"
                ],
                outcomes: "Initial automation deployed, 15-20% efficiency gain"
              },
              {
                phase: "Phase 2",
                duration: "Days 31-60",
                title: "Core Implementation",
                icon: Cpu,
                activities: [
                  "Agentic workflow deployment",
                  "System integration",
                  "Team training & enablement",
                  "Automated testing & validation",
                  "Performance monitoring setup"
                ],
                outcomes: "70% of workflows automated, 35-40% cost reduction"
              },
              {
                phase: "Phase 3",
                duration: "Days 61-90",
                title: "Scale & Optimize",
                icon: Layers,
                activities: [
                  "Advanced AI agent configuration",
                  "Cross-department orchestration",
                  "Continuous improvement loops",
                  "Executive dashboard deployment",
                  "Change management completion"
                ],
                outcomes: "Full transformation live, 50-60% total cost reduction"
              }
            ].map((phase, i) => (
              <div key={i} className="relative mb-12 last:mb-0">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-24 text-right">
                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 mb-2">
                      {phase.phase}
                    </Badge>
                    <div className="text-sm text-slate-500">{phase.duration}</div>
                  </div>
                  
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                      <phase.icon className="h-6 w-6 text-white" />
                    </div>
                    {i < 2 && (
                      <div className="absolute top-12 left-1/2 w-0.5 h-12 bg-blue-500/30 -ml-px" />
                    )}
                  </div>

                  <Card className="flex-1 bg-slate-900 border-slate-800 p-6">
                    <h3 className="text-2xl font-bold text-white mb-4">{phase.title}</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-semibold text-slate-400 mb-3">Key Activities</h4>
                        <ul className="space-y-2">
                          {phase.activities.map((activity, idx) => (
                            <li key={idx} className="flex items-start text-slate-300 text-sm">
                              <CheckCircle2 className="h-4 w-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                              {activity}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-slate-400 mb-3">Expected Outcomes</h4>
                        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                          <div className="flex items-start text-green-400 text-sm">
                            <TrendingUp className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                            {phase.outcomes}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases by Department */}
      <section className="py-20 bg-slate-950">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              AI Transformation Across Every Department
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Comprehensive automation tailored to your organization's needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                department: "Finance & Operations",
                icon: DollarSign,
                automations: [
                  "Invoice processing & reconciliation",
                  "Expense management & approval",
                  "Financial forecasting & modeling",
                  "Vendor payment automation",
                  "Budget variance analysis"
                ]
              },
              {
                department: "Human Resources",
                icon: Users,
                automations: [
                  "Resume screening & candidate matching",
                  "Onboarding workflow automation",
                  "Benefits administration",
                  "Performance review tracking",
                  "Compliance documentation"
                ]
              },
              {
                department: "Claims & Benefits",
                icon: Shield,
                automations: [
                  "Claims adjudication & processing",
                  "Prior authorization decisions",
                  "Benefits verification",
                  "Appeals management",
                  "Provider credentialing"
                ]
              },
              {
                department: "Legal & Compliance",
                icon: Lock,
                automations: [
                  "Contract review & analysis",
                  "Regulatory change monitoring",
                  "Risk assessment & scoring",
                  "Audit trail generation",
                  "Policy compliance checking"
                ]
              },
              {
                department: "Analytics & Reporting",
                icon: BarChart3,
                automations: [
                  "Real-time dashboard updates",
                  "Predictive analytics",
                  "Anomaly detection",
                  "Executive reporting",
                  "KPI tracking & alerts"
                ]
              },
              {
                department: "Customer Service",
                icon: Activity,
                automations: [
                  "Intelligent ticket routing",
                  "Response generation",
                  "Sentiment analysis",
                  "Issue escalation",
                  "Knowledge base updates"
                ]
              }
            ].map((dept, i) => (
              <Card key={i} className="bg-slate-900 border-slate-800 p-6 hover:border-blue-500/50 transition-colors">
                <dept.icon className="h-10 w-10 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-4">{dept.department}</h3>
                <ul className="space-y-2">
                  {dept.automations.map((auto, idx) => (
                    <li key={idx} className="flex items-start text-slate-300 text-sm">
                      <Bot className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                      {auto}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="py-20 bg-gradient-to-br from-blue-950 to-slate-950">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-slate-900 border-blue-500/30 p-10">
              <div className="text-center mb-8">
                <Gauge className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-white mb-4">
                  Typical ROI: Middle Market Enterprise
                </h2>
                <p className="text-slate-400">
                  $50M-$500M revenue, 200-2,000 employees
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Current State Costs</h3>
                  <div className="space-y-3">
                    {[
                      { label: "Manual processing", value: "$2.4M/year" },
                      { label: "Error remediation", value: "$800K/year" },
                      { label: "Compliance overhead", value: "$600K/year" },
                      { label: "Delayed decisions", value: "$400K/year" }
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center text-slate-300">
                        <span>{item.label}</span>
                        <span className="font-semibold text-red-400">{item.value}</span>
                      </div>
                    ))}
                    <div className="border-t border-slate-700 pt-3 mt-3">
                      <div className="flex justify-between items-center text-white font-bold">
                        <span>Total Annual Cost</span>
                        <span className="text-red-400">$4.2M</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">With AI Transformation</h3>
                  <div className="space-y-3">
                    {[
                      { label: "Automated processing", value: "$480K/year" },
                      { label: "Error reduction (90%)", value: "$80K/year" },
                      { label: "Compliance automation", value: "$120K/year" },
                      { label: "Real-time insights", value: "$80K/year" }
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center text-slate-300">
                        <span>{item.label}</span>
                        <span className="font-semibold text-green-400">{item.value}</span>
                      </div>
                    ))}
                    <div className="border-t border-slate-700 pt-3 mt-3">
                      <div className="flex justify-between items-center text-white font-bold">
                        <span>Total Annual Cost</span>
                        <span className="text-green-400">$760K</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg">
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-green-400 mb-1">$3.44M</div>
                    <div className="text-sm text-slate-400">Annual Savings</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-400 mb-1">82%</div>
                    <div className="text-sm text-slate-400">Cost Reduction</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-purple-400 mb-1">4.5 Months</div>
                    <div className="text-sm text-slate-400">Payback Period</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 bg-slate-950">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Enterprise-Grade Technology Foundation
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Built on proven, scalable infrastructure
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { category: "AI/ML", items: ["GPT-4 Turbo", "Claude 3.5", "Gemini Ultra", "Custom Models"] },
              { category: "Data Platform", items: ["Snowflake", "PostgreSQL", "Redis", "Vector DBs"] },
              { category: "Integration", items: ["REST APIs", "Webhooks", "ETL Pipelines", "Event Streams"] },
              { category: "Security", items: ["SOC 2 Type II", "HIPAA", "Zero Trust", "Encryption"] }
            ].map((stack, i) => (
              <Card key={i} className="bg-slate-900 border-slate-800 p-6">
                <h3 className="text-lg font-bold text-white mb-4">{stack.category}</h3>
                <ul className="space-y-2">
                  {stack.items.map((item, idx) => (
                    <li key={idx} className="flex items-center text-slate-300 text-sm">
                      <Sparkles className="h-3 w-3 text-blue-400 mr-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Enterprise?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Schedule a transformation assessment with our AI experts. We'll analyze your operations and create a custom roadmap for 100% AI transformation.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/request-demo">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                Schedule Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}