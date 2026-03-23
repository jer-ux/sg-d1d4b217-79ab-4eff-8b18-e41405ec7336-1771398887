import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Filter, ArrowUpDown, FileText, AlertTriangle, CheckCircle, TrendingUp, Building2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type Contract = Tables<"pbm_contracts">;

export default function PBMContractVault() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [filteredContracts, setFilteredContracts] = useState<Contract[]>([]);
  const [selectedContracts, setSelectedContracts] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPBMs, setSelectedPBMs] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedRisk, setSelectedRisk] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"score" | "date" | "cost">("score");
  const [loading, setLoading] = useState(true);

  const pbms = ["OptumRx", "CVS Health", "Express Scripts", "Prime Therapeutics"];
  const contractTypes = ["Commercial", "Medicare Part D", "Medicaid", "Government", "Self-Funded"];
  const riskLevels = ["Low", "Medium", "High", "Critical"];

  useEffect(() => {
    fetchContracts();
  }, []);

  useEffect(() => {
    filterAndSortContracts();
  }, [contracts, searchTerm, selectedPBMs, selectedTypes, selectedRisk, sortBy]);

  const fetchContracts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("pbm_contracts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching contracts:", error);
    } else {
      setContracts(data || []);
    }
    setLoading(false);
  };

  const filterAndSortContracts = () => {
    let filtered = [...contracts];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(c => 
        c.contract_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.pbm_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // PBM filter
    if (selectedPBMs.length > 0) {
      filtered = filtered.filter(c => selectedPBMs.includes(c.pbm_name));
    }

    // Contract type filter
    if (selectedTypes.length > 0) {
      filtered = filtered.filter(c => selectedTypes.includes(c.contract_type));
    }

    // Risk level filter
    if (selectedRisk.length > 0) {
      filtered = filtered.filter(c => c.risk_level && selectedRisk.includes(c.risk_level));
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === "score") {
        return (b.overall_score || 0) - (a.overall_score || 0);
      } else if (sortBy === "date") {
        return new Date(b.effective_date).getTime() - new Date(a.effective_date).getTime();
      } else if (sortBy === "cost") {
        return (b.annual_cost_estimate || 0) - (a.annual_cost_estimate || 0);
      }
      return 0;
    });

    setFilteredContracts(filtered);
  };

  const toggleContractSelection = (contractId: string) => {
    setSelectedContracts(prev => {
      if (prev.includes(contractId)) {
        return prev.filter(id => id !== contractId);
      } else if (prev.length < 3) {
        return [...prev, contractId];
      }
      return prev;
    });
  };

  const getScoreColor = (score: number | null) => {
    if (!score) return "text-gray-400";
    if (score >= 85) return "text-green-500";
    if (score >= 70) return "text-blue-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  const getRiskColor = (risk: string | null) => {
    if (!risk) return "bg-gray-500";
    if (risk === "Low") return "bg-green-500";
    if (risk === "Medium") return "bg-yellow-500";
    if (risk === "High") return "bg-orange-500";
    return "bg-red-500";
  };

  const stats = {
    total: contracts.length,
    avgScore: Math.round(contracts.reduce((sum, c) => sum + (c.overall_score || 0), 0) / contracts.length),
    highRisk: contracts.filter(c => c.risk_level === "High" || c.risk_level === "Critical").length,
    totalCost: contracts.reduce((sum, c) => sum + (c.annual_cost_estimate || 0), 0)
  };

  return (
    <>
      <Head>
        <title>PBM Contract Vault | SiriusB iQ</title>
        <meta name="description" content="Browse and compare 60+ pharmacy benefit manager contracts across OptumRx, CVS Health, Express Scripts, and Prime Therapeutics" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
        <SiteHeader />

        <main className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              PBM Contract Intelligence Vault
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Analyze and compare {contracts.length} pharmacy benefit manager contracts across the top 4 PBMs
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6 bg-slate-900/50 border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Total Contracts</p>
                  <p className="text-3xl font-bold text-white mt-1">{stats.total}</p>
                </div>
                <FileText className="w-10 h-10 text-blue-400" />
              </div>
            </Card>

            <Card className="p-6 bg-slate-900/50 border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Average Score</p>
                  <p className={`text-3xl font-bold mt-1 ${getScoreColor(stats.avgScore)}`}>{stats.avgScore}</p>
                </div>
                <TrendingUp className="w-10 h-10 text-green-400" />
              </div>
            </Card>

            <Card className="p-6 bg-slate-900/50 border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">High Risk</p>
                  <p className="text-3xl font-bold text-red-400 mt-1">{stats.highRisk}</p>
                </div>
                <AlertTriangle className="w-10 h-10 text-red-400" />
              </div>
            </Card>

            <Card className="p-6 bg-slate-900/50 border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Total Annual Cost</p>
                  <p className="text-2xl font-bold text-white mt-1">${(stats.totalCost / 1000000).toFixed(1)}M</p>
                </div>
                <Building2 className="w-10 h-10 text-purple-400" />
              </div>
            </Card>
          </div>

          {/* Filters and Search */}
          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Search */}
              <div className="lg:col-span-2">
                <label className="text-sm text-slate-400 mb-2 block">Search Contracts</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    type="text"
                    placeholder="Search by name or PBM..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-slate-800 border-slate-600 text-white"
                  />
                </div>
              </div>

              {/* Sort */}
              <div>
                <label className="text-sm text-slate-400 mb-2 block">Sort By</label>
                <Button
                  variant="outline"
                  className="w-full justify-between bg-slate-800 border-slate-600 text-white"
                  onClick={() => {
                    const sorts: Array<"score" | "date" | "cost"> = ["score", "date", "cost"];
                    const currentIndex = sorts.indexOf(sortBy);
                    setSortBy(sorts[(currentIndex + 1) % sorts.length]);
                  }}
                >
                  {sortBy === "score" && "Score"}
                  {sortBy === "date" && "Date"}
                  {sortBy === "cost" && "Cost"}
                  <ArrowUpDown className="w-4 h-4 ml-2" />
                </Button>
              </div>

              {/* Compare Button */}
              <div>
                <label className="text-sm text-slate-400 mb-2 block">Actions</label>
                <Link href={selectedContracts.length >= 2 ? `/contract-comparison?ids=${selectedContracts.join(",")}` : "#"}>
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    disabled={selectedContracts.length < 2}
                  >
                    Compare ({selectedContracts.length}/3)
                  </Button>
                </Link>
              </div>
            </div>

            {/* Filter Checkboxes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 pt-6 border-t border-slate-700">
              {/* PBM Filter */}
              <div>
                <label className="text-sm text-slate-400 mb-3 block font-semibold">PBM Provider</label>
                {pbms.map(pbm => (
                  <div key={pbm} className="flex items-center space-x-2 mb-2">
                    <Checkbox
                      id={`pbm-${pbm}`}
                      checked={selectedPBMs.includes(pbm)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedPBMs([...selectedPBMs, pbm]);
                        } else {
                          setSelectedPBMs(selectedPBMs.filter(p => p !== pbm));
                        }
                      }}
                    />
                    <label htmlFor={`pbm-${pbm}`} className="text-sm text-slate-300 cursor-pointer">
                      {pbm}
                    </label>
                  </div>
                ))}
              </div>

              {/* Contract Type Filter */}
              <div>
                <label className="text-sm text-slate-400 mb-3 block font-semibold">Contract Type</label>
                {contractTypes.map(type => (
                  <div key={type} className="flex items-center space-x-2 mb-2">
                    <Checkbox
                      id={`type-${type}`}
                      checked={selectedTypes.includes(type)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedTypes([...selectedTypes, type]);
                        } else {
                          setSelectedTypes(selectedTypes.filter(t => t !== type));
                        }
                      }}
                    />
                    <label htmlFor={`type-${type}`} className="text-sm text-slate-300 cursor-pointer">
                      {type}
                    </label>
                  </div>
                ))}
              </div>

              {/* Risk Level Filter */}
              <div>
                <label className="text-sm text-slate-400 mb-3 block font-semibold">Risk Level</label>
                {riskLevels.map(risk => (
                  <div key={risk} className="flex items-center space-x-2 mb-2">
                    <Checkbox
                      id={`risk-${risk}`}
                      checked={selectedRisk.includes(risk)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedRisk([...selectedRisk, risk]);
                        } else {
                          setSelectedRisk(selectedRisk.filter(r => r !== risk));
                        }
                      }}
                    />
                    <label htmlFor={`risk-${risk}`} className="text-sm text-slate-300 cursor-pointer">
                      {risk}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contract Grid */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-slate-400">Loading contracts...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredContracts.map(contract => (
                <Card 
                  key={contract.id}
                  className={`p-6 bg-slate-900/50 border-slate-700 hover:border-blue-500 transition-all cursor-pointer ${
                    selectedContracts.includes(contract.id) ? "ring-2 ring-blue-500" : ""
                  }`}
                  onClick={() => toggleContractSelection(contract.id)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1">{contract.contract_name}</h3>
                      <p className="text-sm text-slate-400">{contract.pbm_name}</p>
                    </div>
                    <Checkbox
                      checked={selectedContracts.includes(contract.id)}
                      onCheckedChange={() => toggleContractSelection(contract.id)}
                      disabled={!selectedContracts.includes(contract.id) && selectedContracts.length >= 3}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">Overall Score</span>
                      <span className={`text-2xl font-bold ${getScoreColor(contract.overall_score)}`}>
                        {contract.overall_score || "N/A"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">Risk Level</span>
                      <Badge className={`${getRiskColor(contract.risk_level)} text-white`}>
                        {contract.risk_level || "Unknown"}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">Red Flags</span>
                      <span className="text-sm font-semibold text-red-400">
                        {contract.red_flags || 0} issues
                      </span>
                    </div>

                    <div className="pt-3 border-t border-slate-700">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-slate-500">Type</span>
                        <span className="text-xs text-slate-300">{contract.contract_type}</span>
                      </div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-slate-500">Plan Size</span>
                        <span className="text-xs text-slate-300">{contract.plan_size}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500">Annual Cost</span>
                        <span className="text-xs text-slate-300">
                          ${((contract.annual_cost_estimate || 0) / 1000000).toFixed(1)}M
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {filteredContracts.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-slate-400">No contracts found matching your filters.</p>
            </div>
          )}
        </main>

        <SiteFooter />
      </div>
    </>
  );
}