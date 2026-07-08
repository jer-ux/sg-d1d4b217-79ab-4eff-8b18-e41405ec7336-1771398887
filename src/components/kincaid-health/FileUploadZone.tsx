/**
 * KINCAID HEALTH™
 * File Upload Drag & Drop Zone
 * Connects to FastAPI ingestion endpoint
 */

import { useState, useCallback } from "react";
import { Upload, FileText, X, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  status: "uploading" | "processing" | "complete" | "error";
  progress: number;
  result?: {
    rows: number;
    columns: string[];
    quality_score: number;
    missing: Record<string, number>;
    duplicates: number;
  };
  error?: string;
}

export function FileUploadZone() {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const uploadFile = async (file: File) => {
    const uploadedFile: UploadedFile = {
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      status: "uploading",
      progress: 0,
    };

    setFiles((prev) => [...prev, uploadedFile]);

    try {
      const formData = new FormData();
      formData.append("file", file);

      // Upload to FastAPI backend
      const response = await fetch("http://localhost:8000/upload/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const result = await response.json();

      // Update file with results
      setFiles((prev) =>
        prev.map((f) =>
          f.id === uploadedFile.id
            ? {
                ...f,
                status: "complete",
                progress: 100,
                result: {
                  rows: result.dataset.rows,
                  columns: result.dataset.columns,
                  quality_score: result.quality.quality_score,
                  missing: result.quality.missing,
                  duplicates: result.quality.duplicates,
                },
              }
            : f
        )
      );
    } catch (error) {
      setFiles((prev) =>
        prev.map((f) =>
          f.id === uploadedFile.id
            ? {
                ...f,
                status: "error",
                error: error instanceof Error ? error.message : "Upload failed",
              }
            : f
        )
      );
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    droppedFiles.forEach((file) => {
      if (
        file.type === "text/csv" ||
        file.type === "application/vnd.ms-excel" ||
        file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        uploadFile(file);
      }
    });
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    selectedFiles.forEach((file) => uploadFile(file));
  }, []);

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div className="space-y-6">
      {/* Drop Zone */}
      <Card
        className={cn(
          "border-2 border-dashed transition-all duration-200",
          isDragging
            ? "border-primary bg-primary/5 scale-[1.02]"
            : "border-border hover:border-primary/50"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="p-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary/10">
            <Upload className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Upload Claims Data</h3>
          <p className="text-muted-foreground mb-6">
            Drag and drop your CSV or Excel files here, or click to browse
          </p>
          <label>
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              multiple
              className="hidden"
              onChange={handleFileSelect}
            />
            <Button>Select Files</Button>
          </label>
          <p className="text-xs text-muted-foreground mt-4">
            Supported formats: CSV, Excel (.xlsx, .xls)
          </p>
        </div>
      </Card>

      {/* Uploaded Files */}
      {files.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Uploaded Files</h4>
          {files.map((file) => (
            <Card key={file.id} className="p-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <FileText className="w-8 h-8 text-muted-foreground" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{file.name}</p>
                      <p className="text-sm text-muted-foreground">{formatFileSize(file.size)}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      {file.status === "uploading" && (
                        <Loader2 className="w-5 h-5 text-primary animate-spin" />
                      )}
                      {file.status === "complete" && (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      )}
                      {file.status === "error" && (
                        <AlertCircle className="w-5 h-5 text-destructive" />
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(file.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {file.status === "uploading" && (
                    <div className="w-full bg-muted rounded-full h-2 mb-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${file.progress}%` }}
                      />
                    </div>
                  )}

                  {/* Results */}
                  {file.status === "complete" && file.result && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3 p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="text-xs text-muted-foreground">Rows</p>
                        <p className="text-sm font-semibold">{file.result.rows.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Columns</p>
                        <p className="text-sm font-semibold">{file.result.columns.length}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Quality Score</p>
                        <p className="text-sm font-semibold">{file.result.quality_score}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Issues</p>
                        <p className="text-sm font-semibold text-amber-600">
                          {file.result.duplicates} duplicates
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Error */}
                  {file.status === "error" && (
                    <div className="p-3 bg-destructive/10 text-destructive rounded-lg mt-3">
                      <p className="text-sm">{file.error}</p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}