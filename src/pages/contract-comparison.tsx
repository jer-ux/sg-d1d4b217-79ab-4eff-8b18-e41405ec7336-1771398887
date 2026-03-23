import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, AlertTriangle, CheckCircle, TrendingUp, DollarSign } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type Contract = Tables<"pbm_contracts">;
type Provision = Tables<"contract_provisions">;

export default function ContractComparison() {
  const router = useRouter();
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [provisions, setProvisions] = useState<Record<string, Provision[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (router.query.ids) {
      fetchContracts();
    }
  }, [router.query.ids]);

  const fetchContracts = async () => {
    const ids = (router.query.ids as string).split(",");
    
    setLoading(true);
    const { data: contractData, error: contractError } = await supabase
      .from("pbm_contracts")
      .select("*")
      .in("id", ids);

    if (contractError) {
      console.error("Error fetching contracts:", contractError);
    } else {
      setContracts(contractData || []);

      // Fetch provisions for each contract
      const provisionPromises = (contractData || []).map(async (contract) => {
        const { data, error } = await supabase
          .from("contract_provisions")
          .select("*")
          .eq("contract_id", contract.id);
        
        if (!error && data) {
          return { contractId: contract.id, provisions: data };
        }
        return { contractId: contract.id, provisions: [] };
      });

      const provisionResults = await Promise.all(provisionPromises);
      const provisionsMap: Record<string, Provision[]> = {};
      provisionResults.forEach(result => {
        provisionsMap[result.contractId] = result.provisions;
      });
      setProvisions(provisionsMap);
    }
    setLoading(false);
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

  const provisionTypes = [
    "Pricing Transparency",
    "Rebate Sharing",
    "Audit Rights",
    "MAC Pricing",
    "Specialty Drug Management",
    "Prior Authorization",
    "Formulary Control",
    "Data Rights",
    "Termination Clauses",
    "Performance Guarantees"
  ];

  const getProvisionForType = (contractId: string, provisionType: string) => {
    return provisions[contractId]?.find(p => p.provision_type === provisionType);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center">
        <p className="text-slate-400">Loading comparison...</p>
      </div>
    );
  }

  if (contracts.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
        <SiteHeader />
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-slate-400 mb-4">No contracts selected for comparison.</p>
          <Link href="/pbm-contract-vault">
            <Button>Return to Vault</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Contract Comparison | SiriusB iQ</title>
        <meta name="description" content="Side-by-side comparison of PBM contracts" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
        <SiteHeader />

        <main className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="mb-8">
            <Link href="/pbm-contract-vault">
              <Button variant="outline" className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Vault
              </Button>
            </Link>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Contract Comparison
                </h1>
                <p className="text-slate-300">Side-by-side analysis of {contracts.length} contracts</p>
              </div>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>

          {/* Overall Comparison */}
          <Card className="p-6 bg-slate-900/50 border-slate-700 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Overall Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4 text-slate-400 font-semibold">Metric</th>
                    {contracts.map(contract => (
                      <th key={contract.id} className="text-left py-3 px-4 text-white font-semibold">
                        {contract.contract_name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-700/50">
                    <td className="py-3 px-4 text-slate-300">PBM Provider</td>
                    {contracts.map(contract => (
                      <td key={contract.id} className="py-3 px-4 text-white">{contract.pbm_name}</td>
                    ))}
                  </tr>
                  <tr className="border-b border-slate-700/50">
                    <td className="py-3 px-4 text-slate-300">Overall Score</td>
                    {contracts.map(contract => (
                      <td key={contract.id} className="py-3 px-4">
                        <span className={`text-2xl font-bold ${getScoreColor(contract.overall_score)}`}>
                          {contract.overall_score}
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-slate-700/50">
                    <td className="py-3 px-4 text-slate-300">Risk Level</td>
                    {contracts.map(contract => (
                      <td key={contract.id} className="py-3 px-4">
                        <Badge className={`${getRiskColor(contract.risk_level)} text-white`}>
                          {contract.risk_level}
                        </Badge>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-slate-700/50">
                    <td className="py-3 px-4 text-slate-300">Red Flags</td>
                    {contracts.map(contract => (
                      <td key={contract.id} className="py-3 px-4">
                        <span className="text-red-400 font-semibold">{contract.red_flags} issues</span>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-slate-700/50">
                    <td className="py-3 px-4 text-slate-300">Annual Cost Estimate</td>
                    {contracts.map(contract => (
                      <td key={contract.id} className="py-3 px-4 text-white font-semibold">
                        ${((contract.annual_cost_estimate || 0) / 1000000).toFixed(2)}M
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-slate-700/50">
                    <td className="py-3 px-4 text-slate-300">Contract Type</td>
                    {contracts.map(contract => (
                      <td key={contract.id} className="py-3 px-4 text-slate-300">{contract.contract_type}</td>
                    ))}
                  </tr>
                  <tr className="border-b border-slate-700/50">
                    <td className="py-3 px-4 text-slate-300">Plan Size</td>
                    {contracts.map(contract => (
                      <td key={contract.id} className="py-3 px-4 text-slate-300">{contract.plan_size}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-slate-300">Effective Date</td>
                    {contracts.map(contract => (
                      <td key={contract.id} className="py-3 px-4 text-slate-300">
                        {new Date(contract.effective_date).toLocaleDateString()}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>

          {/* Cost Variance Analysis */}
          <Card className="p-6 bg-slate-900/50 border-slate-700 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <DollarSign className="w-6 h-6 mr-2 text-green-400" />
              Cost Variance Analysis
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contracts.map((contract, index) => {
                const minCost = Math.min(...contracts.map(c => c.annual_cost_estimate || 0));
                const variance = ((contract.annual_cost_estimate || 0) - minCost) / minCost * 100;
                
                return (
                  <div key={contract.id} className="bg-slate-800/50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white mb-2">{contract.contract_name}</h3>
                    <p className="text-3xl font-bold text-white mb-2">
                      ${((contract.annual_cost_estimate || 0) / 1000000).toFixed(2)}M
                    </p>
                    {variance > 0 ? (
                      <p className="text-red-400 text-sm">
                        +${(variance * minCost / 100 / 1000000).toFixed(2)}M higher ({variance.toFixed(1)}%)
                      </p>
                    ) : (
                      <p className="text-green-400 text-sm flex items-center">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Best value
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Provision Comparison */}
          <Card className="p-6 bg-slate-900/50 border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-6">Provision-by-Provision Comparison</h2>
            <div className="space-y-6">
              {provisionTypes.map(provisionType => (
                <div key={provisionType} className="border-b border-slate-700 pb-6 last:border-0">
                  <h3 className="text-lg font-semibold text-white mb-4">{provisionType}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {contracts.map(contract => {
                      const provision = getProvisionForType(contract.id, provisionType);
                      return (
                        <div key={contract.id} className="bg-slate-800/50 rounded-lg p-4">
                          <p className="text-sm text-slate-400 mb-2">{contract.contract_name}</p>
                          {provision ? (
                            <>
                              <div className="flex items-center justify-between mb-2">
                                <span className={`text-2xl font-bold ${getScoreColor(provision.score)}`}>
                                  {provision.score}
                                </span>
                                {provision.risk_flag && (
                                  <Badge className="bg-red-500 text-white text-xs">
                                    {provision.risk_flag}
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-slate-300 mb-2">{provision.analysis}</p>
                              {provision.cost_impact && (
                                <p className="text-xs text-yellow-400">
                                  Cost Impact: ${(provision.cost_impact / 1000).toFixed(0)}K
                                </p>
                              )}
                            </>
                          ) : (
                            <p className="text-sm text-slate-500">No data available</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Key Findings */}
          <Card className="p-6 bg-slate-900/50 border-slate-700 mt-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <TrendingUp className="w-6 h-6 mr-2 text-blue-400" />
              Key Findings & Recommendations
            </h2>
            <div className="space-y-4">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <h3 className="text-green-400 font-semibold mb-2 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Best Overall Value
                </h3>
                <p className="text-slate-300 text-sm">
                  {contracts.reduce((best, current) => 
                    (current.overall_score || 0) > (best.overall_score || 0) ? current : best
                  ).contract_name} offers the highest overall score with strong provisions across all categories.
                </p>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <h3 className="text-yellow-400 font-semibold mb-2 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Cost Considerations
                </h3>
                <p className="text-slate-300 text-sm">
                  {contracts.reduce((highest, current) => 
                    (current.annual_cost_estimate || 0) > (highest.annual_cost_estimate || 0) ? current : highest
                  ).contract_name} has the highest estimated annual cost at $
                  {((contracts.reduce((highest, current) => 
                    (current.annual_cost_estimate || 0) > (highest.annual_cost_estimate || 0) ? current : highest
                  ).annual_cost_estimate || 0) / 1000000).toFixed(2)}M.
                </p>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <h3 className="text-red-400 font-semibold mb-2 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Risk Assessment
                </h3>
                <p className="text-slate-300 text-sm">
                  {contracts.filter(c => c.risk_level === "High" || c.risk_level === "Critical").length > 0
                    ? `${contracts.filter(c => c.risk_level === "High" || c.risk_level === "Critical").map(c => c.contract_name).join(", ")} ${contracts.filter(c => c.risk_level === "High" || c.risk_level === "Critical").length === 1 ? "has" : "have"} significant risk factors requiring immediate attention.`
                    : "All contracts have acceptable risk levels."
                  }
                </p>
              </div>
            </div>
          </Card>
        </main>

        <SiteFooter />
      </div>
    </>
  );
}