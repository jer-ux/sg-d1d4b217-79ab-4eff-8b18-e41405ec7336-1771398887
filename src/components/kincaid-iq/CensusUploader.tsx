import { useState, useOptimistic, useTransition } from "react";
import { Upload, FileSpreadsheet, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CensusUpload } from "@/lib/kincaid-iq/types";

type Props = {
  onUpload: (data: CensusUpload) => void;
};

type CensusData = {
  employee_count_start: number;
  employee_count_end: number;
  avg_salary: number;
};

export function CensusUploader({ onUpload }: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [formData, setFormData] = useState<CensusData>({
    employee_count_start: 0,
    employee_count_end: 0,
    avg_salary: 0,
  });

  // React 19: useOptimistic for immediate UI feedback
  const [optimisticData, setOptimisticData] = useOptimistic(
    formData,
    (state, newData: Partial<CensusData>) => ({ ...state, ...newData })
  );

  // React 19: useTransition for non-blocking state updates
  const [isPending, startTransition] = useTransition();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file: File) => {
    setFile(file);
    setStatus("processing");

    // React 19: Use startTransition for non-blocking processing
    startTransition(async () => {
      // Simulate CSV parsing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock data extraction with optimistic update
      const mockData: CensusData = {
        employee_count_start: 1200,
        employee_count_end: 1300,
        avg_salary: 75000,
      };
      
      setOptimisticData(mockData);
      setFormData(mockData);
      setStatus("success");
    });
  };

  // React 19: Native async action
  const handleManualSubmit = async () => {
    if (formData.employee_count_start > 0 && formData.employee_count_end > 0) {
      startTransition(async () => {
        setStatus("success");
        
        // Construct full CensusUpload object with generated IDs
        const uploadData: CensusUpload = {
          ...formData,
          id: `manual-${Date.now()}`,
          org_id: "demo-org",
          timestamp: new Date().toISOString(),
        };
        
        onUpload(uploadData);
      });
    }
  };

  return (
    <Card className="border-blue-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/30 p-6">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-blue-500/10 p-2">
            <FileSpreadsheet className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white">Census Data Upload</h3>
            <p className="text-sm text-slate-400">Upload employee census or enter manually</p>
          </div>
        </div>

        {/* Drag & Drop Zone */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`
            relative rounded-lg border-2 border-dashed p-8 text-center transition-all
            ${isDragging 
              ? "border-blue-400 bg-blue-500/10" 
              : "border-slate-700 bg-slate-800/50 hover:border-blue-500/50"
            }
          `}
        >
          <input
            type="file"
            accept=".csv,.xlsx"
            onChange={handleFileInput}
            className="absolute inset-0 cursor-pointer opacity-0"
            disabled={isPending}
          />
          
          <Upload className="mx-auto mb-3 h-10 w-10 text-slate-500" />
          <p className="mb-1 text-sm font-medium text-white">
            Drop your census file here or click to browse
          </p>
          <p className="text-xs text-slate-400">CSV or Excel format</p>

          {file && (
            <div className="mt-4 flex items-center justify-center gap-2 text-sm">
              {status === "processing" && (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
                  <span className="text-slate-300">Processing {file.name}...</span>
                </>
              )}
              {status === "success" && (
                <>
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  <span className="text-green-400">{file.name} loaded successfully</span>
                </>
              )}
              {status === "error" && (
                <>
                  <AlertCircle className="h-4 w-4 text-red-400" />
                  <span className="text-red-400">Error processing {file.name}</span>
                </>
              )}
            </div>
          )}
        </div>

        {/* Manual Entry Form */}
        <div className="space-y-4 rounded-lg border border-slate-700 bg-slate-800/30 p-4">
          <p className="text-sm font-medium text-slate-300">Or enter manually:</p>
          
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label className="text-slate-300">Start Lives</Label>
              <Input
                type="number"
                value={optimisticData.employee_count_start || ""}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setOptimisticData({ employee_count_start: value });
                  setFormData({ ...formData, employee_count_start: value });
                }}
                className="border-slate-700 bg-slate-900 text-white"
                placeholder="1200"
                disabled={isPending}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">End Lives</Label>
              <Input
                type="number"
                value={optimisticData.employee_count_end || ""}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setOptimisticData({ employee_count_end: value });
                  setFormData({ ...formData, employee_count_end: value });
                }}
                className="border-slate-700 bg-slate-900 text-white"
                placeholder="1300"
                disabled={isPending}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Avg Salary</Label>
              <Input
                type="number"
                value={optimisticData.avg_salary || ""}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setOptimisticData({ avg_salary: value });
                  setFormData({ ...formData, avg_salary: value });
                }}
                className="border-slate-700 bg-slate-900 text-white"
                placeholder="75000"
                disabled={isPending}
              />
            </div>
          </div>

          <Button
            onClick={handleManualSubmit}
            className="w-full bg-blue-500 hover:bg-blue-600"
            disabled={!formData.employee_count_start || !formData.employee_count_end || isPending}
          >
            {isPending ? "Processing..." : "Continue with Manual Entry"}
          </Button>
        </div>
      </div>
    </Card>
  );
}