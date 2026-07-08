/**
 * KINCAID HEALTH™ ACTUARIAL DASHBOARD
 * Natural Language Parameter Parser
 */

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, CheckCircle2, AlertCircle } from "lucide-react";

interface ParsedParams {
  baseAmount?: number;
  employeeCount?: number;
  trend?: number;
  recognized: string[];
  unrecognized: string[];
}

interface NaturalLanguageInputProps {
  onParse: (params: ParsedParams) => void;
}

export function NaturalLanguageInput({ onParse }: NaturalLanguageInputProps) {
  const [input, setInput] = useState("");
  const [parsed, setParsed] = useState<ParsedParams | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const parseInput = async () => {
    setIsProcessing(true);
    
    // Simple pattern matching (in production, use NLP API)
    const text = input.toLowerCase();
    const result: ParsedParams = {
      recognized: [],
      unrecognized: []
    };

    // Extract dollar amounts
    const dollarMatches = text.match(/\$?([\d,]+(?:\.\d+)?)\s*(m|million|k|thousand)?/gi);
    if (dollarMatches) {
      const firstAmount = dollarMatches[0];
      let amount = parseFloat(firstAmount.replace(/[$,]/g, ''));
      
      if (firstAmount.includes('m') || firstAmount.includes('million')) {
        amount *= 1_000_000;
      } else if (firstAmount.includes('k') || firstAmount.includes('thousand')) {
        amount *= 1_000;
      }
      
      result.baseAmount = amount;
      result.recognized.push(`Annual spend: $${amount.toLocaleString()}`);
    }

    // Extract employee count
    const employeeMatch = text.match(/(\d+)\s*(employees|workers|people|staff)/i);
    if (employeeMatch) {
      result.employeeCount = parseInt(employeeMatch[1]);
      result.recognized.push(`Employee count: ${result.employeeCount}`);
    }

    // Extract trend/growth
    const trendMatch = text.match(/(\d+(?:\.\d+)?)\s*%\s*(growth|trend|increase)/i);
    if (trendMatch) {
      result.trend = parseFloat(trendMatch[1]) / 100;
      result.recognized.push(`Expected trend: ${trendMatch[1]}%`);
    }

    // Check for unrecognized important terms
    const importantTerms = ['deductible', 'coinsurance', 'copay', 'premium', 'network'];
    importantTerms.forEach(term => {
      if (text.includes(term) && !result.recognized.some(r => r.toLowerCase().includes(term))) {
        result.unrecognized.push(term);
      }
    });

    setTimeout(() => {
      setParsed(result);
      setIsProcessing(false);
    }, 500);
  };

  const handleApply = () => {
    if (parsed) {
      onParse(parsed);
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-lg">Describe Your Situation</h3>
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        Tell us about your organization in plain English. We'll extract the key numbers automatically.
      </p>

      <Textarea
        placeholder="Example: We spend $5M on healthcare with 500 employees. Expecting 8% medical trend next year."
        className="min-h-[120px] mb-4"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <Button 
        onClick={parseInput} 
        disabled={!input.trim() || isProcessing}
        className="w-full mb-4"
      >
        {isProcessing ? (
          <>Processing...</>
        ) : (
          <>
            <Sparkles className="h-4 w-4 mr-2" />
            Extract Parameters
          </>
        )}
      </Button>

      {parsed && (
        <div className="space-y-4">
          {parsed.recognized.length > 0 && (
            <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
              <div className="flex items-start gap-2 mb-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-green-900 dark:text-green-100 mb-1">Recognized</h4>
                  <ul className="space-y-1">
                    {parsed.recognized.map((item, i) => (
                      <li key={i} className="text-sm text-green-800 dark:text-green-200">• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {parsed.unrecognized.length > 0 && (
            <div className="p-4 rounded-lg bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-1">Need More Info</h4>
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    Mentioned but not extracted: {parsed.unrecognized.join(", ")}
                  </p>
                </div>
              </div>
            </div>
          )}

          <Button onClick={handleApply} className="w-full">
            Apply These Parameters
          </Button>
        </div>
      )}

      <div className="mt-4 p-3 bg-muted rounded-lg">
        <p className="text-xs text-muted-foreground">
          <strong>Examples to try:</strong><br/>
          "We spend $12M on healthcare"<br/>
          "500 employees, $5M annual spend"<br/>
          "Expecting 8.5% medical trend increase"
        </p>
      </div>
    </Card>
  );
}