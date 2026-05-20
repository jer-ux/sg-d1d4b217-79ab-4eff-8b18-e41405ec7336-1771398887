import Link from "next/link";
import { FileSearch, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function FreeContractReviewCTA() {
  return (
    <Card className="bg-gradient-to-br from-purple-900/30 via-gray-900/50 to-pink-900/30 border-purple-500/30 p-8">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="bg-purple-500/20 rounded-full p-6 flex-shrink-0">
          <FileSearch className="w-12 h-12 text-purple-400" />
        </div>
        
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-white mb-2">
            Free PBM Contract Review
          </h3>
          <p className="text-gray-300 mb-4">
            Send us your current PBM contract. Get the 3 biggest red flags identified within 48 hours — no cost, no obligation.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-semibold text-white">Confidential Analysis</div>
                <div className="text-xs text-gray-400">Your contract never leaves our secure system</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-semibold text-white">48-Hour Turnaround</div>
                <div className="text-xs text-gray-400">Top 3 red flags delivered via email</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-semibold text-white">No Sales Pressure</div>
                <div className="text-xs text-gray-400">Just actionable intelligence</div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/request-demo">
              <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 w-full sm:w-auto">
                Get Free Contract Review
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/tools/contract-health-check">
              <Button size="lg" variant="outline" className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10 w-full sm:w-auto">
                Try Self-Service Tool
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}