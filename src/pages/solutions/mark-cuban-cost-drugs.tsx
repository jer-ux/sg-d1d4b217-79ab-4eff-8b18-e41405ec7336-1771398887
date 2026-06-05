import { useState } from "react";
import Head from "next/head";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingDown, 
  DollarSign, 
  Shield, 
  Package, 
  AlertCircle,
  CheckCircle,
  ArrowRight,
  TrendingUp,
  Pill,
  Calculator,
  FileText,
  Search
} from "lucide-react";

interface DrugComparison {
  name: string;
  genericName: string;
  strength: string;
  cubanPrice: number;
  pbmPrice: number;
  retailPrice: number;
  savingsPercent: number;
}

const sampleDrugs: DrugComparison[] = [
  {
    name: "Lipitor",
    genericName: "Atorvastatin",
    strength: "40mg",
    cubanPrice: 6.20,
    pbmPrice: 89.00,
    retailPrice: 142.50,
    savingsPercent: 93
  },
  {
    name: "Prozac",
    genericName: "Fluoxetine",
    strength: "20mg",
    cubanPrice: 4.50,
    pbmPrice: 67.00,
    retailPrice: 98.00,
    savingsPercent: 93
  },
  {
    name: "Januvia",
    genericName: "Sitagliptin",
    strength: "100mg",
    cubanPrice: 31.80,
    pbmPrice: 527.00,
    retailPrice: 612.00,
    savingsPercent: 94
  },
  {
    name: "Advair",
    genericName: "Fluticasone/Salmeterol",
    strength: "250/50",
    cubanPrice: 55.00,
    pbmPrice: 387.00,
    retailPrice: 465.00,
    savingsPercent: 86
  },
  {
    name: "Xarelto",
    genericName: "Rivaroxaban",
    strength: "20mg",
    cubanPrice: 58.60,
    pbmPrice: 542.00,
    retailPrice: 625.00,
    savingsPercent: 89
  },
  {
    name: "Eliquis",
    genericName: "Apixaban",
    strength: "5mg",
    cubanPrice: 62.40,
    pbmPrice: 558.00,
    retailPrice: 642.00,
    savingsPercent: 89
  }
];

export default function MarkCubanCostDrugs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDrug, setSelectedDrug] = useState<DrugComparison | null>(null);
  const [quantity, setQuantity] = useState(30);

  const filteredDrugs = sampleDrugs.filter(drug => 
    drug.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    drug.genericName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalSavings = sampleDrugs.reduce((acc, drug) => 
    acc + ((drug.pbmPrice - drug.cubanPrice) * 30), 0
  );

  const avgSavingsPercent = Math.round(
    sampleDrugs.reduce((acc, drug) => acc + drug.savingsPercent, 0) / sampleDrugs.length
  );

  return (
    <>
      <Head>
        <title>Mark Cuban Cost Plus Drugs Benchmark | Kincaid IQ</title>
        <meta name="description" content="Compare prescription drug prices using Mark Cuban Cost Plus Drugs transparent pricing model. Benchmark PBM spreads and identify cost savings opportunities." />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950/20 to-slate-950">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          {/* Animated background grid */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(to right, rgb(59, 130, 246) 1px, transparent 1px),
                linear-gradient(to bottom, rgb(59, 130, 246) 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px'
            }} />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
            <div className="text-center space-y-6">
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-sm px-4 py-2">
                <Pill className="w-4 h-4 inline mr-2" />
                Transparent Drug Pricing
              </Badge>
              
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Mark Cuban Cost Plus Drugs
              </h1>
              
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Benchmark your PBM contracts against transparent, cost-plus pricing.
                Identify spread pricing abuse and quantify savings opportunities.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white">
                  <Calculator className="w-5 h-5 mr-2" />
                  Calculate Your Savings
                </Button>
                <Button size="lg" variant="outline" className="border-blue-500/30 hover:bg-blue-500/10">
                  <FileText className="w-5 h-5 mr-2" />
                  View Pricing Model
                </Button>
              </div>
            </div>
          </div>

          {/* Floating stats */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-slate-900/50 border-blue-500/20 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Average Savings</p>
                      <p className="text-3xl font-bold text-blue-400">{avgSavingsPercent}%</p>
                    </div>
                    <TrendingDown className="w-12 h-12 text-blue-500/50" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Monthly Portfolio Savings</p>
                      <p className="text-3xl font-bold text-cyan-400">${totalSavings.toLocaleString()}</p>
                    </div>
                    <DollarSign className="w-12 h-12 text-cyan-500/50" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-green-500/20 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Drugs Analyzed</p>
                      <p className="text-3xl font-bold text-green-400">{sampleDrugs.length}</p>
                    </div>
                    <Package className="w-12 h-12 text-green-500/50" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card className="bg-slate-900/80 border-slate-800 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Search className="w-6 h-6 mr-3 text-blue-400" />
                Drug Price Lookup
              </CardTitle>
              <CardDescription>
                Search for medications to compare Cost Plus pricing vs traditional PBM spreads
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search by drug name or generic..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-950 border-slate-700 text-white"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Price Comparison Table */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card className="bg-slate-900/80 border-slate-800 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Price Comparison Matrix</CardTitle>
              <CardDescription>
                Real-time pricing analysis showing Cost Plus vs PBM spread pricing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-800">
                      <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">Drug Name</th>
                      <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">Generic</th>
                      <th className="text-right py-4 px-4 text-sm font-medium text-gray-400">Cost Plus</th>
                      <th className="text-right py-4 px-4 text-sm font-medium text-gray-400">PBM Price</th>
                      <th className="text-right py-4 px-4 text-sm font-medium text-gray-400">Retail</th>
                      <th className="text-right py-4 px-4 text-sm font-medium text-gray-400">Savings</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDrugs.map((drug, idx) => (
                      <tr 
                        key={idx} 
                        className="border-b border-slate-800/50 hover:bg-blue-500/5 cursor-pointer transition-colors"
                        onClick={() => setSelectedDrug(drug)}
                      >
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-medium text-white">{drug.name}</p>
                            <p className="text-xs text-gray-500">{drug.strength}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-300 text-sm">{drug.genericName}</td>
                        <td className="py-4 px-4 text-right">
                          <span className="text-green-400 font-semibold">${drug.cubanPrice.toFixed(2)}</span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <span className="text-red-400 font-semibold">${drug.pbmPrice.toFixed(2)}</span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <span className="text-gray-400">${drug.retailPrice.toFixed(2)}</span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                            {drug.savingsPercent}%
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Comparison - appears when drug selected */}
        {selectedDrug && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Card className="bg-gradient-to-br from-slate-900 via-blue-950/30 to-slate-900 border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center justify-between">
                  <span>{selectedDrug.name} ({selectedDrug.genericName})</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setSelectedDrug(null)}
                    className="text-gray-400 hover:text-white"
                  >
                    Close
                  </Button>
                </CardTitle>
                <CardDescription>Detailed cost breakdown and savings analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Quantity selector */}
                <div className="flex items-center gap-4">
                  <label className="text-sm text-gray-400">Quantity:</label>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-32 bg-slate-950 border-slate-700"
                    min={1}
                    max={90}
                  />
                  <span className="text-sm text-gray-400">tablets</span>
                </div>

                {/* Visual price comparison */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-green-500/10 border-green-500/30">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <Shield className="w-8 h-8 mx-auto text-green-400 mb-2" />
                        <p className="text-sm text-gray-400 mb-1">Cost Plus Price</p>
                        <p className="text-3xl font-bold text-green-400">
                          ${(selectedDrug.cubanPrice * quantity).toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">Transparent + 15% markup</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-red-500/10 border-red-500/30">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <AlertCircle className="w-8 h-8 mx-auto text-red-400 mb-2" />
                        <p className="text-sm text-gray-400 mb-1">PBM Contract Price</p>
                        <p className="text-3xl font-bold text-red-400">
                          ${(selectedDrug.pbmPrice * quantity).toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">Hidden spreads + rebates</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-cyan-500/10 border-cyan-500/30">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <TrendingDown className="w-8 h-8 mx-auto text-cyan-400 mb-2" />
                        <p className="text-sm text-gray-400 mb-1">Total Savings</p>
                        <p className="text-3xl font-bold text-cyan-400">
                          ${((selectedDrug.pbmPrice - selectedDrug.cubanPrice) * quantity).toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">Per {quantity}-day supply</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Annual projection */}
                <Card className="bg-slate-950 border-slate-800">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Projected Annual Savings</p>
                        <p className="text-4xl font-bold text-cyan-400">
                          ${(((selectedDrug.pbmPrice - selectedDrug.cubanPrice) * quantity) * 12).toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">Based on {quantity}-day refills monthly</p>
                      </div>
                      <TrendingUp className="w-16 h-16 text-cyan-500/30" />
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>
        )}

        {/* How It Works Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Transparent Pricing Model</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Understanding the Cost Plus formula and how it exposes PBM spread pricing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-slate-900/50 border-blue-500/20">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                  <DollarSign className="w-6 h-6 text-blue-400" />
                </div>
                <CardTitle>Manufacturer Cost</CardTitle>
                <CardDescription>
                  True acquisition cost directly from the manufacturer
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Publicly disclosed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>No hidden fees</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Direct sourcing</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-cyan-500/20">
              <CardHeader>
                <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Calculator className="w-6 h-6 text-cyan-400" />
                </div>
                <CardTitle>+ 15% Markup</CardTitle>
                <CardDescription>
                  Fixed, transparent margin for operations and dispensing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Covers pharmacy ops</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>No variable pricing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Consistent margin</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-green-500/20">
              <CardHeader>
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-green-400" />
                </div>
                <CardTitle>+ Pharmacy Fee</CardTitle>
                <CardDescription>
                  $3-$5 flat dispensing fee per prescription
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Flat rate disclosed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>No rebate games</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Simple math</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* PBM Comparison */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-red-950/50 to-slate-900 border-red-500/30">
              <CardHeader>
                <CardTitle className="flex items-center text-red-400">
                  <AlertCircle className="w-6 h-6 mr-3" />
                  Traditional PBM Model
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3 text-gray-300">
                    <span className="text-red-400 mt-1">✗</span>
                    <span>Hidden manufacturer rebates not passed through</span>
                  </div>
                  <div className="flex items-start gap-3 text-gray-300">
                    <span className="text-red-400 mt-1">✗</span>
                    <span>Spread pricing between plan and pharmacy</span>
                  </div>
                  <div className="flex items-start gap-3 text-gray-300">
                    <span className="text-red-400 mt-1">✗</span>
                    <span>Administrative fees, DIR fees, rebate retention</span>
                  </div>
                  <div className="flex items-start gap-3 text-gray-300">
                    <span className="text-red-400 mt-1">✗</span>
                    <span>Non-disclosed pricing formulas</span>
                  </div>
                  <div className="flex items-start gap-3 text-gray-300">
                    <span className="text-red-400 mt-1">✗</span>
                    <span>Complex contracts with hidden clauses</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-red-900/50">
                  <p className="text-xl font-bold text-red-400">Avg. Markup: 300-900%</p>
                  <p className="text-xs text-gray-500 mt-1">Based on spread analysis</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-950/50 to-slate-900 border-green-500/30">
              <CardHeader>
                <CardTitle className="flex items-center text-green-400">
                  <CheckCircle className="w-6 h-6 mr-3" />
                  Cost Plus Drugs Model
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3 text-gray-300">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>Manufacturer cost fully disclosed on website</span>
                  </div>
                  <div className="flex items-start gap-3 text-gray-300">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>Fixed 15% markup applied to all drugs</span>
                  </div>
                  <div className="flex items-start gap-3 text-gray-300">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>Flat $3-$5 pharmacy dispensing fee</span>
                  </div>
                  <div className="flex items-start gap-3 text-gray-300">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>No rebates, no DIR fees, no hidden charges</span>
                  </div>
                  <div className="flex items-start gap-3 text-gray-300">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>Simple, transparent pricing model</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-green-900/50">
                  <p className="text-xl font-bold text-green-400">Fixed Markup: 15%</p>
                  <p className="text-xs text-gray-500 mt-1">Plus dispensing fee</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <Card className="bg-gradient-to-r from-blue-950 via-cyan-950 to-blue-950 border-blue-500/30">
            <CardContent className="py-16 text-center">
              <h2 className="text-4xl font-bold text-white mb-4">
                Ready to Benchmark Your PBM Contract?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Upload your formulary and we'll identify Cost Plus savings opportunities
                across your entire drug portfolio
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white">
                  <FileText className="w-5 h-5 mr-2" />
                  Upload Formulary
                </Button>
                <Button size="lg" variant="outline" className="border-blue-500/50 hover:bg-blue-500/10">
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Schedule Demo
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}