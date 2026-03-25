import { useState, useEffect } from "react";
import { SEO } from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { Search, Plus, FileText, Filter, Download } from "lucide-react";
import { pbmContractService } from "@/services/pbmContractService";

export default function ContractsListPage() {
  const [contracts, setContracts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [pbmFilter, setPbmFilter] = useState("all");

  useEffect(() => {
    loadContracts();
  }, []);

  const loadContracts = async () => {
    try {
      const orgId = "demo-org-id";
      const data = await pbmContractService.listContracts(orgId);
      setContracts(data);
    } catch (error) {
      console.error("Error loading contracts:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredContracts = contracts.filter((contract) => {
    const matchesSearch =
      searchQuery === "" ||
      contract.contract_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contract.employer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contract.pbm_name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || contract.status === statusFilter;

    const matchesPBM =
      pbmFilter === "all" || contract.pbm_name === pbmFilter;

    return matchesSearch && matchesStatus && matchesPBM;
  });

  const uniquePBMs = Array.from(
    new Set(contracts.map((c) => c.pbm_name))
  ).sort();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "analyzed":
        return "bg-green-100 text-green-800 border-green-200";
      case "uploaded":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "in review":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "approved":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <>
      <SEO
        title="Contracts - PBM Contract Intelligence | SiriusB iQ"
        description="Manage and analyze your PBM contracts"
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Header */}
        <header className="border-b bg-white/80 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  PBM Contracts
                </h1>
                <p className="text-sm text-slate-600">
                  View and manage all contract analyses
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
                <Link href="/pbm/contracts/upload">
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Upload Contract
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-6 py-8">
          {/* Filters */}
          <Card className="mb-6 p-6">
            <div className="grid gap-4 md:grid-cols-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    placeholder="Search contracts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="uploaded">Uploaded</SelectItem>
                  <SelectItem value="analyzed">Analyzed</SelectItem>
                  <SelectItem value="in review">In Review</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                </SelectContent>
              </Select>

              <Select value={pbmFilter} onValueChange={setPbmFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All PBMs" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All PBMs</SelectItem>
                  {uniquePBMs.map((pbm) => (
                    <SelectItem key={pbm} value={pbm}>
                      {pbm}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </Card>

          {/* Contracts Table */}
          <Card>
            {loading ? (
              <div className="p-12 text-center">
                <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
                <p className="mt-4 text-sm text-slate-600">Loading contracts...</p>
              </div>
            ) : filteredContracts.length === 0 ? (
              <div className="p-12 text-center">
                <FileText className="mx-auto h-16 w-16 text-slate-300" />
                <h3 className="mt-4 text-lg font-semibold text-slate-900">
                  No contracts found
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  {contracts.length === 0
                    ? "Upload your first contract to get started"
                    : "Try adjusting your filters"}
                </p>
                {contracts.length === 0 && (
                  <Link href="/pbm/contracts/upload">
                    <Button className="mt-6 gap-2">
                      <Plus className="h-4 w-4" />
                      Upload Contract
                    </Button>
                  </Link>
                )}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Contract Title</TableHead>
                    <TableHead>Employer</TableHead>
                    <TableHead>PBM</TableHead>
                    <TableHead>Effective Date</TableHead>
                    <TableHead>Renewal Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContracts.map((contract) => (
                    <TableRow key={contract.id}>
                      <TableCell className="font-medium">
                        <Link
                          href={`/pbm/contracts/${contract.id}`}
                          className="text-blue-600 hover:underline"
                        >
                          {contract.contract_title}
                        </Link>
                      </TableCell>
                      <TableCell>{contract.employer_name}</TableCell>
                      <TableCell>{contract.pbm_name}</TableCell>
                      <TableCell>
                        {new Date(contract.effective_date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {new Date(contract.renewal_date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={getStatusColor(contract.status)}
                        >
                          {contract.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Link href={`/pbm/contracts/${contract.id}`}>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Card>
        </main>
      </div>
    </>
  );
}