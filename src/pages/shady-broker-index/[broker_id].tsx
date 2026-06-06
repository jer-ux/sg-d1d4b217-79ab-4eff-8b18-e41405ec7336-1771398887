import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, AlertTriangle, FileText, ExternalLink, ChevronRight, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { Footer } from "@/components/Footer";
import { createClient } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Broker = {
  id: string;
  name: string;
  type: string;
  shady_score: number | null;
  grade: "A" | "B" | "C" | "D" | "F" | "INSUFFICIENT";
  hq_region: string;
  summary_finding: string;
  last_updated: string;
};

type Component = {
  id: string;
  component_name: string;
  component_score: number | null;
  weight: number;
  epistemic_badge: "CERTIFIED" | "MODELED" | "INSUFFICIENT_EVIDENCE";
};

type Filing = {
  id: string;
  plan_sponsor: string;
  plan_year: number;
  schedule_a_line: string;
  amount_disclosed: number | null;
  filing_url: string;
};

const gradeColors = {
  A: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  B: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  C: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  D: "bg-orange-500/10 text-orange-400 border-orange-500/30",
  F: "bg-rose-500/10 text-rose-400 border-rose-500/30",
  INSUFFICIENT: "bg-gray-500/10 text-gray-400 border-gray-500/30"
};

const epistemicBadges = {
  CERTIFIED: { icon: CheckCircle2, color: "text-emerald-400", label: "Certified" },
  MODELED: { icon: AlertCircle, color: "text-amber-400", label: "Modeled" },
  INSUFFICIENT_EVIDENCE: { icon: XCircle, color: "text-gray-400", label: "Insufficient Evidence" }
};

export default function BrokerDetailPage() {
  const router = useRouter();
  const { broker_id } = router.query;
  const [broker, setBroker] = useState<Broker | null>(null);
  const [components, setComponents] = useState<Component[]>([]);
  const [filings, setFilings] = useState<Filing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (broker_id) {
      fetchBrokerData();
    }
  }, [broker_id]);

  const fetchBrokerData = async () => {
    try {
      const supabase = createClient();
      
      const { data: brokerData, error: brokerError } = await supabase
        .from("brokers")
        .select("*")
        .eq("id", broker_id)
        .single();

      if (brokerError) throw brokerError;
      setBroker(brokerData);

      const { data: componentsData } = await supabase
        .from("score_components")
        .select("*")
        .eq("broker_id", broker_id)
        .order("weight", { ascending: false });

      setComponents(componentsData || []);

      const { data: filingsData } = await supabase
        .from("filings")
        .select("*")
        .eq("broker_id", broker_id)
        .order("plan_year", { ascending: false })
        .limit(10);

      setFilings(filingsData || []);
    } catch (error) {
      console.error("Error fetching broker data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center">
        <div className="text-gray-400">Loading broker data...</div>
      </div>
    );
  }

  if (!broker) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Broker not found</p>
          <Link href="/shady-broker-index">
            <Button>Back to Index</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{broker.name} - Transparency Score | The Shady Broker Index</title>
        <meta name="description" content={`${broker.name} transparency analysis. Grade: ${broker.grade}. ${broker.summary_finding}`} />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
        {/* Header */}
        <div className="border-b border-gray-800 bg-gray-950/50 backdrop-blur-xl">
          <div className="max-w-5xl mx-auto px-6 py-6">
            <Link href="/shady-broker-index/index-table" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 mb-4">
              <ChevronRight className="w-4 h-4 rotate-180" />
              Back to Index
            </Link>
          </div>
        </div>

        {/* Broker Header */}
        <div className="max-w-5xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">{broker.name}</h1>
                <p className="text-gray-400">{broker.type.toUpperCase()} • {broker.hq_region}</p>
              </div>
              <Badge className={`${gradeColors[broker.grade]} border font-mono text-2xl px-6 py-2`}>
                {broker.grade}
              </Badge>
            </div>

            {broker.shady_score !== null && (
              <div className="mb-6">
                <div className="text-sm text-gray-400 mb-2">Shady Score</div>
                <div className="text-7xl font-bold text-rose-400">{broker.shady_score}</div>
              </div>
            )}

            <div className="bg-rose-500/5 border border-rose-500/20 rounded-lg p-4">
              <p className="text-rose-300">{broker.summary_finding}</p>
            </div>
          </motion.div>

          {/* Component Breakdown */}
          {components.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-8">
              <h2 className="text-2xl font-bold text-white mb-4">Score Breakdown</h2>
              <div className="space-y-4">
                {components.map((comp) => {
                  const EpistemicIcon = epistemicBadges[comp.epistemic_badge].icon;
                  const epistemicColor = epistemicBadges[comp.epistemic_badge].color;
                  const epistemicLabel = epistemicBadges[comp.epistemic_badge].label;

                  return (
                    <div key={comp.id} className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-medium text-white">{comp.component_name}</h3>
                          <div className={`flex items-center gap-1 text-sm ${epistemicColor}`}>
                            <EpistemicIcon className="w-4 h-4" />
                            <span>{epistemicLabel}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          {comp.component_score !== null ? (
                            <>
                              <div className="text-2xl font-bold text-rose-400">{comp.component_score}</div>
                              <div className="text-xs text-gray-500">Weight: {(comp.weight * 100).toFixed(0)}%</div>
                            </>
                          ) : (
                            <div className="text-sm text-gray-500">N/A</div>
                          )}
                        </div>
                      </div>
                      {comp.component_score !== null && (
                        <div className="w-full bg-gray-800 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-rose-500 to-rose-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${comp.component_score}%` }}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Evidence Panel */}
          {filings.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-8">
              <h2 className="text-2xl font-bold text-white mb-4">Evidence Trail</h2>
              <p className="text-sm text-gray-400 mb-6">
                All scores are derived from public DOL Form 5500 Schedule A filings. Each row below is a cited source.
              </p>
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-950/50 border-b border-gray-800">
                    <tr>
                      <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Plan Sponsor</th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Plan Year</th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Schedule A Line</th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Disclosed</th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Filing</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {filings.map((filing) => (
                      <tr key={filing.id} className="hover:bg-gray-800/30 transition-colors">
                        <td className="px-6 py-4 text-white">{filing.plan_sponsor}</td>
                        <td className="px-6 py-4 text-gray-400">{filing.plan_year}</td>
                        <td className="px-6 py-4 text-gray-400">{filing.schedule_a_line}</td>
                        <td className="px-6 py-4 text-gray-400">
                          {filing.amount_disclosed !== null 
                            ? `$${filing.amount_disclosed.toLocaleString()}`
                            : "Not disclosed"
                          }
                        </td>
                        <td className="px-6 py-4">
                          <a
                            href={filing.filing_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-rose-400 hover:text-rose-300 transition-colors flex items-center gap-1">
                            View
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Provenance Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-amber-400 mt-1 flex-shrink-0" />
              <div className="text-sm text-gray-400">
                <p className="mb-2">
                  This score is derived from public DOL Form 5500 filings and proprietary modeling. It reflects disclosed compensation patterns and does not constitute an allegation of illegality.
                </p>
                <div className="flex gap-4">
                  <Link href="/shady-broker-index/methodology" className="text-rose-400 hover:text-rose-300 transition-colors">
                    See methodology
                  </Link>
                  <a href="mailto:corrections@kincaidrmc.com" className="text-rose-400 hover:text-rose-300 transition-colors">
                    Request correction
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 bg-gradient-to-r from-rose-500/10 to-purple-500/10 border border-rose-500/30 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-2">These are public filings.</h3>
            <p className="text-gray-400 mb-6">Get the forensic report on your own plan.</p>
            <Link href="/shady-broker-index">
              <Button className="bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600">
                Score My Broker
              </Button>
            </Link>
          </motion.div>
        </div>

        <Footer />
      </div>
    </>
  );
}