/**
 * KINCAID HEALTH™ ACTUARIAL DASHBOARD
 * Saved Analyses Manager
 */

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Clock,
  Folder,
  Search,
  Star,
  Trash2,
  Download,
  RefreshCw
} from "lucide-react";

interface SavedAnalysis {
  id: string;
  name: string;
  model: string;
  scenario: string;
  createdAt: Date;
  lastModified: Date;
  isFavorite: boolean;
  tags: string[];
  summary: {
    mean: number;
    p95: number;
  };
}

interface SavedAnalysesProps {
  onLoadAnalysis: (id: string) => void;
  onDeleteAnalysis: (id: string) => void;
}

export function SavedAnalyses({ onLoadAnalysis, onDeleteAnalysis }: SavedAnalysesProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [savedAnalyses, setSavedAnalyses] = useState<SavedAnalysis[]>([
    {
      id: "1",
      name: "Q4 2026 Healthcare Projection",
      model: "healthcare",
      scenario: "baseline",
      createdAt: new Date(2026, 6, 1),
      lastModified: new Date(2026, 6, 5),
      isFavorite: true,
      tags: ["quarterly", "board-ready"],
      summary: {
        mean: 5_240_000,
        p95: 5_890_000
      }
    },
    {
      id: "2",
      name: "High Inflation Stress Test",
      model: "healthcare",
      scenario: "high_inflation",
      createdAt: new Date(2026, 5, 15),
      lastModified: new Date(2026, 6, 2),
      isFavorite: false,
      tags: ["stress-test", "risk-analysis"],
      summary: {
        mean: 6_120_000,
        p95: 7_050_000
      }
    },
    {
      id: "3",
      name: "Pension Funded Status - Baseline",
      model: "pension",
      scenario: "pension_baseline",
      createdAt: new Date(2026, 5, 1),
      lastModified: new Date(2026, 5, 1),
      isFavorite: true,
      tags: ["pension", "annual-review"],
      summary: {
        mean: 0.978,
        p95: 1.145
      }
    },
    {
      id: "4",
      name: "Cost Containment Scenario Analysis",
      model: "healthcare",
      scenario: "cost_containment",
      createdAt: new Date(2026, 4, 20),
      lastModified: new Date(2026, 6, 1),
      isFavorite: false,
      tags: ["optimization", "strategic-planning"],
      summary: {
        mean: 4_580_000,
        p95: 5_120_000
      }
    }
  ]);

  const filteredAnalyses = savedAnalyses.filter(analysis =>
    analysis.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    analysis.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
    analysis.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const favoriteAnalyses = filteredAnalyses.filter(a => a.isFavorite);
  const recentAnalyses = filteredAnalyses.filter(a => !a.isFavorite);

  const toggleFavorite = (id: string) => {
    setSavedAnalyses(prev =>
      prev.map(a => a.id === id ? { ...a, isFavorite: !a.isFavorite } : a)
    );
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const formatValue = (value: number, model: string) => {
    if (model === "pension") {
      return `${(value * 100).toFixed(1)}%`;
    }
    return `$${(value / 1_000_000).toFixed(2)}M`;
  };

  const renderAnalysisCard = (analysis: SavedAnalysis) => (
    <Card key={analysis.id} className="p-4 hover:border-primary/50 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="font-semibold mb-1">{analysis.name}</h4>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{formatDate(analysis.lastModified)}</span>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => toggleFavorite(analysis.id)}
        >
          <Star
            className={`h-4 w-4 ${analysis.isFavorite ? "fill-yellow-400 text-yellow-400" : ""}`}
          />
        </Button>
      </div>

      <div className="flex gap-2 mb-3">
        <Badge variant="secondary">{analysis.model}</Badge>
        {analysis.tags.map(tag => (
          <Badge key={tag} variant="outline" className="text-xs">
            {tag}
          </Badge>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3 p-3 bg-muted rounded-lg">
        <div>
          <div className="text-xs text-muted-foreground">Mean</div>
          <div className="font-semibold">
            {formatValue(analysis.summary.mean, analysis.model)}
          </div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">95th %ile</div>
          <div className="font-semibold">
            {formatValue(analysis.summary.p95, analysis.model)}
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          variant="default"
          size="sm"
          onClick={() => onLoadAnalysis(analysis.id)}
          className="flex-1"
        >
          <RefreshCw className="h-3 w-3 mr-2" />
          Load
        </Button>
        <Button variant="outline" size="sm">
          <Download className="h-3 w-3" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDeleteAnalysis(analysis.id)}
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Folder className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Saved Analyses</h2>
        </div>
        <p className="text-muted-foreground">
          Access your saved simulations and load them instantly
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name, model, or tag..."
          className="pl-9"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <ScrollArea className="h-[600px]">
        {favoriteAnalyses.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              <h3 className="font-semibold text-lg">Favorites</h3>
              <Badge variant="secondary">{favoriteAnalyses.length}</Badge>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {favoriteAnalyses.map(renderAnalysisCard)}
            </div>
          </div>
        )}

        {recentAnalyses.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-lg">Recent</h3>
              <Badge variant="secondary">{recentAnalyses.length}</Badge>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {recentAnalyses.map(renderAnalysisCard)}
            </div>
          </div>
        )}

        {filteredAnalyses.length === 0 && (
          <Card className="p-12 text-center">
            <Folder className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="font-semibold mb-2">No Saved Analyses</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {searchTerm
                ? `No analyses found matching "${searchTerm}"`
                : "Run a simulation and save it to access it later"}
            </p>
          </Card>
        )}
      </ScrollArea>
    </div>
  );
}