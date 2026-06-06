import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter, ChevronDown, ChevronUp, AlertTriangle, Shield, TrendingUp, Building2, ExternalLink } from "lucide-react";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Broker = {
  id: string;
  name: string;
  type: "broker" | "consultant" | "pbm" | "tpa";
  shady_score: number | null;
  grade: "A" | "B" | "C" | "D" | "F" | "INSUFFICIENT";
  hq_region: string;
  summary_finding: string;
  last_updated: string;
};

const gradeColors = {
  A: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  B: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  C: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  D: "bg-orange-500/10 text-orange-400 border-orange-500/30",
  F: "bg-rose-500/10 text-rose-400 border-rose-500/30",
  INSUFFICIENT: "bg-gray-500/10 text-gray-400 border-gray-500/30"
};

const typeLabels = {
  broker: "Broker",
  consultant: "Consultant",
  pbm: "PBM",
  tpa: "TPA"
};

export default function ShadyBrokerIndexTable() {
  const [brokers, setBrokers] = useState<Broker[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [gradeFilter, setGradeFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"score" | "name">("score");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    fetchBrokers();
  }, []);

  const fetchBrokers = async () => {
    try {
      const { data, error } = await supabase
        .from("brokers")
        .select("*")
        .order("shady_score", { ascending: false, nullsFirst: false });

      if (error) throw error;
      setBrokers(data || []);
    } catch (error) {
      console.error("Error fetching brokers:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBrokers = brokers
    .filter(b => {
      if (searchTerm && !b.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      if (typeFilter !== "all" && b.type !== typeFilter) return false;
      if (gradeFilter !== "all" && b.grade !== gradeFilter) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "score") {
        const aScore = a.shady_score ?? -1;
        const bScore = b.shady_score ?? -1;
        return sortOrder === "desc" ? bScore - aScore : aScore - bScore;
      } else {
        return sortOrder === "desc" 
          ? b.name.localeCompare(a.name)
          : a.name.localeCompare(b.name);
      }
    });

  const toggleSort = (column: "score" | "name") => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("desc");
    }
  };

  return (
    <>
      <Head>
        <title>The Shady Broker Index | Live Leaderboard</title>
        <meta name="description" content="The definitive transparency ranking of America's health plan brokers, consultants, and PBMs. Scores derived from public DOL filings." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
        {/* Header */}
        <div className="border-b border-gray-800 bg-gray-950/50 backdrop-blur-xl sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div>
                <Link href="/shady-broker-index" className="text-2xl font-bold text-white hover:text-rose-400 transition-colors">
                  The Shady Broker Index
                </Link>
                <p className="text-sm text-gray-400 mt-1">757,294 public filings analyzed</p>
              </div>
              <Link href="/shady-broker-index">
                <Button variant="outline" className="border-rose-500/30 text-rose-400 hover:bg-rose-500/10">
                  Score My Broker
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <Input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by name..."
                    className="pl-10 bg-gray-950 border-gray-700 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Entity Type</label>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-2 text-white">
                  <option value="all">All Types</option>
                  <option value="broker">Brokers</option>
                  <option value="consultant">Consultants</option>
                  <option value="pbm">PBMs</option>
                  <option value="tpa">TPAs</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Grade</label>
                <select
                  value={gradeFilter}
                  onChange={(e) => setGradeFilter(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-2 text-white">
                  <option value="all">All Grades</option>
                  <option value="A">A - Transparent</option>
                  <option value="B">B - Mostly Clear</option>
                  <option value="C">C - Murky</option>
                  <option value="D">D - Opaque</option>
                  <option value="F">F - Egregious</option>
                  <option value="INSUFFICIENT">Insufficient Evidence</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Results</label>
                <div className="text-2xl font-bold text-white">{filteredBrokers.length}</div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden">
            {loading ? (
              <div className="p-12 text-center text-gray-400">Loading brokers...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-950/50 border-b border-gray-800">
                    <tr>
                      <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">
                        <button
                          onClick={() => toggleSort("name")}
                          className="flex items-center gap-2 hover:text-white transition-colors">
                          Entity
                          {sortBy === "name" && (
                            sortOrder === "desc" ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />
                          )}
                        </button>
                      </th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Type</th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">
                        <button
                          onClick={() => toggleSort("score")}
                          className="flex items-center gap-2 hover:text-white transition-colors">
                          Shady Score
                          {sortBy === "score" && (
                            sortOrder === "desc" ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />
                          )}
                        </button>
                      </th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Grade</th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Finding</th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Updated</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {filteredBrokers.map((broker, idx) => (
                      <motion.tr
                        key={broker.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.02 }}
                        className="hover:bg-gray-800/30 transition-colors group">
                        <td className="px-6 py-4">
                          <Link
                            href={`/shady-broker-index/${broker.id}`}
                            className="text-white font-medium hover:text-rose-400 transition-colors flex items-center gap-2 group-hover:underline">
                            {broker.name}
                            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-400">{typeLabels[broker.type]}</span>
                        </td>
                        <td className="px-6 py-4">
                          {broker.shady_score !== null ? (
                            <span className="text-2xl font-bold text-rose-400">{broker.shady_score}</span>
                          ) : (
                            <span className="text-sm text-gray-500">N/A</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <Badge className={`${gradeColors[broker.grade]} border font-mono`}>
                            {broker.grade}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-400 max-w-md">{broker.summary_finding}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-500">
                            {new Date(broker.last_updated).toLocaleDateString()}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {filteredBrokers.length === 0 && !loading && (
            <div className="text-center py-12 text-gray-400">
              No brokers match your filters.
            </div>
          )}
        </div>

        <Footer />
      </div>
    </>
  );
}