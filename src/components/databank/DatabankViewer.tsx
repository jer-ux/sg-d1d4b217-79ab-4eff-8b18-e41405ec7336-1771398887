import React, { useState, useEffect } from "react";
import {
  Database,
  FileText,
  Download,
  Trash2,
  Search,
  Filter,
  Calendar,
  HardDrive,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import {
  getDatabankRecords,
  deleteDatabankRecord,
  getDatabankStats,
  type DatabankType,
} from "@/services/databankService";

export function DatabankViewer() {
  const [databankType, setDatabankType] = useState<DatabankType>("claims");
  const [records, setRecords] = useState<Array<any>>([]);
  const [stats, setStats] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [loading, setLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, [databankType, statusFilter]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [recordsResult, statsResult] = await Promise.all([
        getDatabankRecords(databankType, {
          status: statusFilter === "all" ? undefined : statusFilter,
          limit: 100,
        }),
        getDatabankStats(databankType),
      ]);

      if (!recordsResult.error) {
        setRecords(recordsResult.data);
      }

      if (!statsResult.error && statsResult.data) {
        setStats(statsResult.data);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (recordId: string) => {
    if (deleteConfirm !== recordId) {
      setDeleteConfirm(recordId);
      return;
    }

    try {
      const result = await deleteDatabankRecord(databankType, recordId);
      if (result.success) {
        setRecords(records.filter(r => r.id !== recordId));
        setDeleteConfirm(null);
        loadData(); // Refresh stats
      }
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  const formatFileSize = (bytes: number | bigint) => {
    const numBytes = Number(bytes);
    if (numBytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(numBytes) / Math.log(k));
    return Math.round(numBytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const filteredRecords = records.filter(record =>
    record.file_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Total Files</p>
                <p className="text-2xl font-bold">{stats.total_files}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <HardDrive className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-sm text-gray-500">Total Storage</p>
                <p className="text-2xl font-bold">{formatFileSize(stats.total_size)}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8 text-purple-500" />
              <div>
                <p className="text-sm text-gray-500">Recent (24h)</p>
                <p className="text-2xl font-bold">{stats.recent_uploads}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Database className="w-8 h-8 text-orange-500" />
              <div>
                <p className="text-sm text-gray-500">Processing</p>
                <p className="text-2xl font-bold">{stats.by_status?.processing || 0}</p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Filters */}
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Databank</label>
            <Select
              value={databankType}
              onValueChange={(value) => setDatabankType(value as DatabankType)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="claims">Claims</SelectItem>
                <SelectItem value="census">Census</SelectItem>
                <SelectItem value="financial">Financial</SelectItem>
                <SelectItem value="contracts">Contracts</SelectItem>
                <SelectItem value="actuarial">Actuarial</SelectItem>
                <SelectItem value="pharmacy">Pharmacy</SelectItem>
                <SelectItem value="analytics">Analytics</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="uploaded">Uploaded</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="processed">Processed</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Records Table */}
      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Filename</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Uploaded</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : filteredRecords.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                    No files found
                  </TableCell>
                </TableRow>
              ) : (
                filteredRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">{record.file_name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{formatFileSize(record.file_size)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          record.status === "processed"
                            ? "default"
                            : record.status === "error"
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {record.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {formatDate(record.created_at)}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => window.open(record.file_url, "_blank")}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(record.id)}
                          className={
                            deleteConfirm === record.id
                              ? "text-red-600 hover:text-red-700"
                              : ""
                          }
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      {deleteConfirm === record.id && (
                        <p className="text-xs text-red-600 mt-1">Click again to confirm</p>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}