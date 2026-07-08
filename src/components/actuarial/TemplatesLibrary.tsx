/**
 * KINCAID HEALTH™ ACTUARIAL DASHBOARD
 * Pre-configured Analysis Templates
 */

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Heart, TrendingUp, Shield, Users, ArrowRight } from "lucide-react";

interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: any;
  modelType: string;
  scenario: string;
  defaultParams: Record<string, any>;
  tags: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
}

interface TemplatesLibraryProps {
  onSelectTemplate: (template: Template) => void;
}

const templates: Template[] = [
  {
    id: "self_funded_baseline",
    title: "Self-Funded Health Plan - Baseline",
    description: "Standard healthcare cost projection for self-insured employers",
    category: "Healthcare",
    icon: Heart,
    modelType: "healthcare",
    scenario: "baseline",
    defaultParams: {
      base_cost: 5_000_000,
      iterations: 10000
    },
    tags: ["healthcare", "self-funded", "beginner"],
    difficulty: "beginner"
  },
  {
    id: "stop_loss_analysis",
    title: "Stop-Loss Insurance Analysis",
    description: "Evaluate stop-loss attachment points and premium costs",
    category: "Healthcare",
    icon: Shield,
    modelType: "stop_loss",
    scenario: "stop_loss_baseline",
    defaultParams: {
      expected_claims: 8_000_000,
      attachment_point: 150_000,
      iterations: 10000
    },
    tags: ["stop-loss", "insurance", "intermediate"],
    difficulty: "intermediate"
  },
  {
    id: "pension_funding",
    title: "Pension Funded Status",
    description: "Project pension plan funded status under various market conditions",
    category: "Retirement",
    icon: TrendingUp,
    modelType: "pension",
    scenario: "pension_baseline",
    defaultParams: {
      plan_assets: 50_000_000,
      plan_liabilities: 45_000_000,
      iterations: 10000
    },
    tags: ["pension", "retirement", "advanced"],
    difficulty: "advanced"
  },
  {
    id: "workforce_planning",
    title: "Workforce Cost Projection",
    description: "Total compensation and benefit cost forecasting",
    category: "HR",
    icon: Users,
    modelType: "workforce",
    scenario: "workforce_baseline",
    defaultParams: {
      base_salary_cost: 10_000_000,
      headcount: 250,
      iterations: 10000
    },
    tags: ["workforce", "compensation", "beginner"],
    difficulty: "beginner"
  },
  {
    id: "high_inflation_scenario",
    title: "High Inflation Stress Test",
    description: "Test healthcare costs under elevated medical trend",
    category: "Healthcare",
    icon: Building2,
    modelType: "healthcare",
    scenario: "high_inflation",
    defaultParams: {
      base_cost: 5_000_000,
      iterations: 10000
    },
    tags: ["healthcare", "stress-test", "intermediate"],
    difficulty: "intermediate"
  },
  {
    id: "pension_market_shock",
    title: "Pension Market Shock Scenario",
    description: "Evaluate pension funded status in market downturn",
    category: "Retirement",
    icon: TrendingUp,
    modelType: "pension",
    scenario: "pension_market_shock",
    defaultParams: {
      plan_assets: 50_000_000,
      plan_liabilities: 45_000_000,
      iterations: 10000
    },
    tags: ["pension", "stress-test", "advanced"],
    difficulty: "advanced"
  }
];

const categoryIcons: Record<string, any> = {
  "Healthcare": Heart,
  "Retirement": TrendingUp,
  "HR": Users
};

export function TemplatesLibrary({ onSelectTemplate }: TemplatesLibraryProps) {
  const categories = Array.from(new Set(templates.map(t => t.category)));

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
      case "intermediate": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100";
      case "advanced": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100";
      default: return "";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Analysis Templates</h2>
        <p className="text-muted-foreground">
          Start with pre-configured analyses. All parameters can be customized after loading.
        </p>
      </div>

      {categories.map((category) => {
        const CategoryIcon = categoryIcons[category];
        const categoryTemplates = templates.filter(t => t.category === category);

        return (
          <div key={category}>
            <div className="flex items-center gap-2 mb-4">
              <CategoryIcon className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-semibold">{category}</h3>
              <Badge variant="secondary">{categoryTemplates.length}</Badge>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {categoryTemplates.map((template) => {
                const TemplateIcon = template.icon;

                return (
                  <Card key={template.id} className="p-6 hover:border-primary/50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <TemplateIcon className="h-5 w-5 text-primary" />
                      </div>
                      <Badge className={getDifficultyColor(template.difficulty)}>
                        {template.difficulty}
                      </Badge>
                    </div>

                    <h4 className="font-semibold text-lg mb-2">{template.title}</h4>
                    <p className="text-sm text-muted-foreground mb-4">{template.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {template.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <Button 
                      onClick={() => onSelectTemplate(template)}
                      className="w-full"
                      variant="outline"
                    >
                      Load Template
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Card>
                );
              })}
            </div>
          </div>
        );
      })}

      <Card className="p-6 bg-primary/5 border-primary/20">
        <h4 className="font-semibold mb-2">Can't find what you need?</h4>
        <p className="text-sm text-muted-foreground mb-3">
          Use the guided wizard to create a custom analysis, or start from scratch with any model.
        </p>
        <Button variant="outline" size="sm">
          Request Custom Template
        </Button>
      </Card>
    </div>
  );
}