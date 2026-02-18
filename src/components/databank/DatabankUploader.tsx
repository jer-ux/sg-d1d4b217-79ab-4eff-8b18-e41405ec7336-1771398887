import React, { useState, useCallback } from "react";
import { Upload, X, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { uploadToDatabank, type DatabankType } from "@/services/databankService";

interface DatabankUploaderProps {
  onUploadComplete?: (recordId: string) => void;
  allowedTypes?: string[];
  maxSizeMB?: number;
}

export function DatabankUploader({
  onUploadComplete,
  allowedTypes = [".csv", ".xlsx", ".xls", ".pdf", ".json"],
  maxSizeMB = 100,
}: DatabankUploaderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [databankType, setDatabankType] = useState<DatabankType>("claims");
  const [tags, setTags] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      setUploadStatus({
        type: "error",
        message: `File size exceeds ${maxSizeMB}MB limit`,
      });
      return;
    }

    setSelectedFile(file);
    setUploadStatus({ type: null, message: "" });
  }, [maxSizeMB]);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (!file) return;

      const maxSizeBytes = maxSizeMB * 1024 * 1024;
      if (file.size > maxSizeBytes) {
        setUploadStatus({
          type: "error",
          message: `File size exceeds ${maxSizeMB}MB limit`,
        });
        return;
      }

      setSelectedFile(file);
      setUploadStatus({ type: null, message: "" });
    },
    [maxSizeMB]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setUploadStatus({ type: null, message: "" });

    try {
      const tagArray = tags
        .split(",")
        .map(t => t.trim())
        .filter(Boolean);

      const result = await uploadToDatabank(selectedFile, databankType, {
        tags: tagArray.length > 0 ? tagArray : undefined,
      });

      if (result.success && result.record_id) {
        setUploadStatus({
          type: "success",
          message: "File uploaded successfully!",
        });
        setSelectedFile(null);
        setTags("");
        onUploadComplete?.(result.record_id);
      } else {
        setUploadStatus({
          type: "error",
          message: result.error || "Upload failed",
        });
      }
    } catch (error) {
      setUploadStatus({
        type: "error",
        message: String(error),
      });
    } finally {
      setUploading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        {/* Databank Type Selection */}
        <div className="space-y-2">
          <Label htmlFor="databank-type">Databank Type</Label>
          <Select
            value={databankType}
            onValueChange={(value) => setDatabankType(value as DatabankType)}
          >
            <SelectTrigger id="databank-type">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="claims">Claims Databank</SelectItem>
              <SelectItem value="member">Member Databank</SelectItem>
              <SelectItem value="provider">Provider Databank</SelectItem>
              <SelectItem value="financial">Financial Databank</SelectItem>
              <SelectItem value="contract">Contract Databank</SelectItem>
              <SelectItem value="census">Census Databank</SelectItem>
              <SelectItem value="analytics">Analytics Databank</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* File Upload Area */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center hover:border-blue-500 dark:hover:border-blue-400 transition-colors cursor-pointer"
        >
          {selectedFile ? (
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3">
                <FileText className="w-12 h-12 text-blue-500" />
                <div className="text-left">
                  <p className="font-medium">{selectedFile.name}</p>
                  <p className="text-sm text-gray-500">
                    {formatFileSize(selectedFile.size)}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedFile(null)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <Upload className="w-12 h-12 mx-auto text-gray-400" />
              <div>
                <label htmlFor="file-upload" className="cursor-pointer">
                  <span className="text-blue-500 hover:text-blue-600 font-medium">
                    Click to upload
                  </span>
                  <span className="text-gray-500"> or drag and drop</span>
                </label>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept={allowedTypes.join(",")}
                  onChange={handleFileSelect}
                />
              </div>
              <p className="text-sm text-gray-500">
                {allowedTypes.join(", ")} (Max {maxSizeMB}MB)
              </p>
            </div>
          )}
        </div>

        {/* Tags Input */}
        <div className="space-y-2">
          <Label htmlFor="tags">Tags (comma-separated)</Label>
          <Input
            id="tags"
            placeholder="e.g., Q4-2024, preliminary, reviewed"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        {/* Upload Status */}
        {uploadStatus.type && (
          <div
            className={`flex items-center gap-2 p-3 rounded-lg ${
              uploadStatus.type === "success"
                ? "bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300"
                : "bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300"
            }`}
          >
            {uploadStatus.type === "success" ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span className="text-sm font-medium">{uploadStatus.message}</span>
          </div>
        )}

        {/* Upload Button */}
        <Button
          onClick={handleUpload}
          disabled={!selectedFile || uploading}
          className="w-full"
        >
          {uploading ? "Uploading..." : "Upload to Databank"}
        </Button>
      </div>
    </Card>
  );
}