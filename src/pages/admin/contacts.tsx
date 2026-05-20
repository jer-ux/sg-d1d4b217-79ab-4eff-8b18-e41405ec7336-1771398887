import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAdminSession, adminLogout } from "@/lib/auth/adminAuth";
import {
  Shield,
  Search,
  Filter,
  Download,
  LogOut,
  Mail,
  Phone,
  Building2,
  Calendar,
  User,
  ExternalLink,
} from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Contact = Database["public"]["Tables"]["contacts"]["Row"];

const STATUS_COLORS = {
  new: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  contacted: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  qualified: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  converted: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  closed: "bg-gray-500/20 text-gray-400 border-gray-500/30",
};

export default function AdminContactsPage() {
  const router = useRouter();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");

  useEffect(() => {
    // Check if admin is authenticated
    const session = getAdminSession();
    if (!session) {
      router.push("/admin/login");
      return;
    }

    // Fetch contacts
    fetchContacts();
  }, [router]);

  useEffect(() => {
    // Apply filters
    let filtered = contacts;

    if (statusFilter !== "all") {
      filtered = filtered.filter((c) => c.status === statusFilter);
    }

    if (sourceFilter !== "all") {
      filtered = filtered.filter((c) => c.source === sourceFilter);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.full_name?.toLowerCase().includes(term) ||
          c.email?.toLowerCase().includes(term) ||
          c.company?.toLowerCase().includes(term)
      );
    }

    setFilteredContacts(filtered);
  }, [contacts, statusFilter, sourceFilter, searchTerm]);

  const fetchContacts = async () => {
    setIsLoading(true);
    try {
      const session = getAdminSession();
      const response = await fetch("/api/admin/contacts", {
        headers: {
          Authorization: `Bearer ${session?.id || ""}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setContacts(data.contacts || []);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateContactStatus = async (contactId: string, newStatus: string) => {
    try {
      const session = getAdminSession();
      const response = await fetch("/api/admin/contacts", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.id || ""}`,
        },
        body: JSON.stringify({
          contactId,
          status: newStatus,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Update local state
        setContacts((prev) =>
          prev.map((c) => (c.id === contactId ? { ...c, status: newStatus } : c))
        );
      }
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  const handleLogout = () => {
    adminLogout();
    router.push("/admin/login");
  };

  const exportToCSV = () => {
    const headers = ["Name", "Email", "Phone", "Company", "Status", "Source", "Created At"];
    const rows = filteredContacts.map((c) => [
      c.full_name,
      c.email,
      c.phone || "",
      c.company || "",
      c.status,
      c.source,
      new Date(c.created_at).toLocaleDateString(),
    ]);

    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `contacts-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  const session = getAdminSession();

  if (!session) return null;

  return (
    <>
      <Head>
        <title>Contact Management - Admin | SiriusB iQ</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <div className="border-b border-gray-800 bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-purple-500/20 rounded-lg p-2">
                  <Shield className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">Contact Management</h1>
                  <p className="text-sm text-gray-400">
                    Logged in as {session.full_name || session.email}
                  </p>
                </div>
              </div>

              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-gray-700 hover:bg-gray-800"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            {[
              { label: "Total", count: contacts.length, color: "text-gray-400" },
              {
                label: "New",
                count: contacts.filter((c) => c.status === "new").length,
                color: "text-blue-400",
              },
              {
                label: "Contacted",
                count: contacts.filter((c) => c.status === "contacted").length,
                color: "text-yellow-400",
              },
              {
                label: "Qualified",
                count: contacts.filter((c) => c.status === "qualified").length,
                color: "text-purple-400",
              },
              {
                label: "Converted",
                count: contacts.filter((c) => c.status === "converted").length,
                color: "text-emerald-400",
              },
            ].map((stat) => (
              <Card key={stat.label} className="bg-gray-900/50 border-gray-800 p-4">
                <p className="text-sm text-gray-400">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.count}</p>
              </Card>
            ))}
          </div>

          {/* Filters */}
          <Card className="bg-gray-900/50 border-gray-800 p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-gray-400" />
              <h2 className="text-lg font-semibold">Filters</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by name, email, company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-900/50 border-gray-700"
                />
              </div>

              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="bg-gray-900/50 border-gray-700">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="qualified">Qualified</SelectItem>
                  <SelectItem value="converted">Converted</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>

              {/* Source Filter */}
              <Select value={sourceFilter} onValueChange={setSourceFilter}>
                <SelectTrigger className="bg-gray-900/50 border-gray-700">
                  <SelectValue placeholder="All Sources" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  <SelectItem value="website">Website</SelectItem>
                  <SelectItem value="pricing-page">Pricing Page</SelectItem>
                  <SelectItem value="contact-page">Contact Page</SelectItem>
                  <SelectItem value="footer">Footer</SelectItem>
                </SelectContent>
              </Select>

              {/* Export Button */}
              <Button
                onClick={exportToCSV}
                variant="outline"
                className="border-gray-700 hover:bg-gray-800"
              >
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </Card>

          {/* Contacts Table */}
          <Card className="bg-gray-900/50 border-gray-800 overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-800 hover:bg-transparent">
                    <TableHead className="text-gray-400">Contact</TableHead>
                    <TableHead className="text-gray-400">Company</TableHead>
                    <TableHead className="text-gray-400">Message</TableHead>
                    <TableHead className="text-gray-400">Source</TableHead>
                    <TableHead className="text-gray-400">Status</TableHead>
                    <TableHead className="text-gray-400">Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-12 text-gray-400">
                        Loading contacts...
                      </TableCell>
                    </TableRow>
                  ) : filteredContacts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-12 text-gray-400">
                        No contacts found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredContacts.map((contact) => (
                      <TableRow key={contact.id} className="border-gray-800 hover:bg-gray-800/50">
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-gray-400 flex-shrink-0" />
                              <span className="font-medium">{contact.full_name}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                              <Mail className="w-3 h-3 flex-shrink-0" />
                              <a
                                href={`mailto:${contact.email}`}
                                className="hover:text-purple-400"
                              >
                                {contact.email}
                              </a>
                            </div>
                            {contact.phone && (
                              <div className="flex items-center gap-2 text-sm text-gray-400">
                                <Phone className="w-3 h-3 flex-shrink-0" />
                                <span>{contact.phone}</span>
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {contact.company ? (
                            <div className="flex items-center gap-2">
                              <Building2 className="w-4 h-4 text-gray-400 flex-shrink-0" />
                              <span>{contact.company}</span>
                            </div>
                          ) : (
                            <span className="text-gray-500">—</span>
                          )}
                          {contact.job_title && (
                            <div className="text-sm text-gray-400 mt-1">
                              {contact.job_title}
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <p className="text-sm text-gray-300 line-clamp-2 max-w-xs">
                            {contact.message}
                          </p>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="border-gray-700 text-gray-300"
                          >
                            {contact.source}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Select
                            value={contact.status}
                            onValueChange={(value) =>
                              updateContactStatus(contact.id, value)
                            }
                          >
                            <SelectTrigger
                              className={`w-32 border ${
                                STATUS_COLORS[contact.status as keyof typeof STATUS_COLORS]
                              }`}
                            >
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="new">New</SelectItem>
                              <SelectItem value="contacted">Contacted</SelectItem>
                              <SelectItem value="qualified">Qualified</SelectItem>
                              <SelectItem value="converted">Converted</SelectItem>
                              <SelectItem value="closed">Closed</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Calendar className="w-4 h-4 flex-shrink-0" />
                            <span>
                              {new Date(contact.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {new Date(contact.created_at).toLocaleTimeString()}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}