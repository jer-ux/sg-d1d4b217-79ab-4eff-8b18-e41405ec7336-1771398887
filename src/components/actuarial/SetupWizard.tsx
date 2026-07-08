/**
 * KINCAID HEALTH™ ACTUARIAL DASHBOARD
 * Guided Setup Wizard for Non-Actuaries
 */

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft, CheckCircle2, Building2, TrendingUp, DollarSign } from "lucide-react";

interface SetupWizardProps {
  onComplete: (config: WizardConfig) => void;
  onCancel: () => void;
}

interface WizardConfig {
  analysisType: string;
  situation: string;
  baseAmount: number;
  employeeCount?: number;
  additionalParams: Record<string, any>;
}

export function SetupWizard({ onComplete, onCancel }: SetupWizardProps) {
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState<Partial<WizardConfig>>({});

  const analysisTypes = [
    {
      id: "healthcare",
      title: "Healthcare Costs",
      description: "Medical, pharmacy, stop-loss analysis",
      icon: Building2,
      scenarios: ["baseline", "high_inflation", "cost_containment"]
    },
    {
      id: "pension",
      title: "Pension Funding",
      description: "Funded status and contribution projections",
      icon: TrendingUp,
      scenarios: ["pension_baseline", "pension_market_shock"]
    },
    {
      id: "workforce",
      title: "Workforce Costs",
      description: "Total compensation and benefits",
      icon: DollarSign,
      scenarios: ["workforce_baseline", "workforce_wage_pressure"]
    }
  ];

  const situations = {
    healthcare: [
      { id: "baseline", label: "Normal year ahead", description: "Expected economic conditions" },
      { id: "high_inflation", label: "High inflation risk", description: "Medical trend spike concerns" },
      { id: "cost_containment", label: "Major changes planned", description: "New cost strategies" }
    ],
    pension: [
      { id: "pension_baseline", label: "Normal year ahead", description: "Expected returns" },
      { id: "pension_market_shock", label: "Market volatility", description: "Recession concerns" }
    ],
    workforce: [
      { id: "workforce_baseline", label: "Normal year ahead", description: "Steady hiring" },
      { id: "workforce_wage_pressure", label: "Wage pressure", description: "Competitive market" }
    ]
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleComplete = () => {
    const finalConfig: WizardConfig = {
      analysisType: config.analysisType!,
      situation: config.situation!,
      baseAmount: config.baseAmount!,
      employeeCount: config.employeeCount,
      additionalParams: {}
    };

    onComplete(finalConfig);
  };

  const selectedType = analysisTypes.find(t => t.id === config.analysisType);
  const availableSituations = config.analysisType ? situations[config.analysisType as keyof typeof situations] : [];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-3xl bg-background p-8">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Step {step} of 3</span>
            <span className="text-sm text-muted-foreground">{Math.round((step / 3) * 100)}% Complete</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Step 1: Analysis Type */}
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold mb-2">What would you like to analyze?</h2>
            <p className="text-muted-foreground mb-6">Choose the type of financial analysis you need</p>

            <div className="grid gap-4 mb-8">
              {analysisTypes.map((type) => {
                const Icon = type.icon;
                const isSelected = config.analysisType === type.id;
                
                return (
                  <button
                    key={type.id}
                    onClick={() => setConfig({ ...config, analysisType: type.id })}
                    className={`p-6 rounded-lg border-2 text-left transition-all ${
                      isSelected 
                        ? "border-primary bg-primary/5" 
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${isSelected ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{type.title}</h3>
                        <p className="text-sm text-muted-foreground">{type.description}</p>
                      </div>
                      {isSelected && <CheckCircle2 className="h-5 w-5 text-primary" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Situation */}
        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold mb-2">What's your situation?</h2>
            <p className="text-muted-foreground mb-6">This helps us set appropriate assumptions</p>

            <div className="grid gap-4 mb-8">
              {availableSituations.map((situation) => {
                const isSelected = config.situation === situation.id;
                
                return (
                  <button
                    key={situation.id}
                    onClick={() => setConfig({ ...config, situation: situation.id })}
                    className={`p-6 rounded-lg border-2 text-left transition-all ${
                      isSelected 
                        ? "border-primary bg-primary/5" 
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{situation.label}</h3>
                        <p className="text-sm text-muted-foreground">{situation.description}</p>
                      </div>
                      {isSelected && <CheckCircle2 className="h-5 w-5 text-primary" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3: Numbers */}
        {step === 3 && (
          <div>
            <h2 className="text-2xl font-bold mb-2">Tell us about your numbers</h2>
            <p className="text-muted-foreground mb-6">We need a few key figures to run the analysis</p>

            <div className="space-y-6 mb-8">
              <div>
                <Label htmlFor="baseAmount" className="text-base mb-2">
                  Current Annual Spend
                  <span className="text-muted-foreground ml-2 font-normal">(What you spend now)</span>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="baseAmount"
                    type="number"
                    className="pl-8 text-lg"
                    placeholder="5000000"
                    value={config.baseAmount || ""}
                    onChange={(e) => setConfig({ ...config, baseAmount: Number(e.target.value) })}
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-1">Example: $5,000,000 for $5M annual spend</p>
              </div>

              {config.analysisType === "healthcare" && (
                <div>
                  <Label htmlFor="employeeCount" className="text-base mb-2">
                    Number of Employees
                    <span className="text-muted-foreground ml-2 font-normal">(Optional)</span>
                  </Label>
                  <Input
                    id="employeeCount"
                    type="number"
                    className="text-lg"
                    placeholder="500"
                    value={config.employeeCount || ""}
                    onChange={(e) => setConfig({ ...config, employeeCount: Number(e.target.value) })}
                  />
                  <p className="text-sm text-muted-foreground mt-1">Helps calculate per-employee metrics</p>
                </div>
              )}

              <Card className="p-4 bg-primary/5 border-primary/20">
                <h4 className="font-semibold mb-2">What happens next?</h4>
                <p className="text-sm text-muted-foreground">
                  We'll run 10,000 simulations using industry-standard assumptions for your situation 
                  and show you the range of likely outcomes. You can adjust everything afterwards.
                </p>
              </Card>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between pt-6 border-t">
          <Button 
            variant="ghost" 
            onClick={step === 1 ? onCancel : handleBack}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {step === 1 ? "Cancel" : "Back"}
          </Button>

          <Button 
            onClick={step === 3 ? handleComplete : handleNext}
            disabled={
              (step === 1 && !config.analysisType) ||
              (step === 2 && !config.situation) ||
              (step === 3 && !config.baseAmount)
            }
          >
            {step === 3 ? "Run Analysis" : "Next"}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </Card>
    </div>
  );
}