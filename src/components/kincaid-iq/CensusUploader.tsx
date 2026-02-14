import { useState } from "react";
import { Upload, FileSpreadsheet, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type CensusData = {
  employee_count_start: number;
  employee_count_end: number;
  avg_salary: number;
};

type Props = {
  onUploadComplete: (data: CensusData) => void;
};

export function CensusUploader({ onUploadComplete }: Props) {
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [formData, setFormData] = useState<CensusData>({
    employee_count_start: 0,
    employee_count_end: 0,
    avg_salary: 0,
  });

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

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
    setFileName(file.name);
    setStatus("processing");

    // Simulate CSV parsing
    setTimeout(() => {
      // Mock data extraction
      const mockData: CensusData = {
        employee_count_start: 1200,
        employee_count_end: 1300,
        avg_salary: 75000,
      };
      setFormData(mockData);
      setStatus("success");
    }, 1500);
  };

  const handleManualSubmit = () => {
    if (formData.employee_count_start > 0 && formData.employee_count_end > 0) {
      setStatus("success");
      onUploadComplete(formData);
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
            ${dragActive 
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
          />
          
          <Upload className="mx-auto mb-3 h-10 w-10 text-slate-500" />
          <p className="mb-1 text-sm font-medium text-white">
            Drop your census file here or click to browse
          </p>
          <p className="text-xs text-slate-400">CSV or Excel format</p>

          {fileName && (
            <div className="mt-4 flex items-center justify-center gap-2 text-sm">
              {status === "processing" && (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
                  <span className="text-slate-300">Processing {fileName}...</span>
                </>
              )}
              {status === "success" && (
                <>
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  <span className="text-green-400">{fileName} loaded successfully</span>
                </>
              )}
              {status === "error" && (
                <>
                  <AlertCircle className="h-4 w-4 text-red-400" />
                  <span className="text-red-400">Error processing {fileName}</span>
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
                value={formData.employee_count_start || ""}
                onChange={(e) => setFormData({ ...formData, employee_count_start: Number(e.target.value) })}
                className="border-slate-700 bg-slate-900 text-white"
                placeholder="1200"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">End Lives</Label>
              <Input
                type="number"
                value={formData.employee_count_end || ""}
                onChange={(e) => setFormData({ ...formData, employee_count_end: Number(e.target.value) })}
                className="border-slate-700 bg-slate-900 text-white"
                placeholder="1300"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Avg Salary</Label>
              <Input
                type="number"
                value={formData.avg_salary || ""}
                onChange={(e) => setFormData({ ...formData, avg_salary: Number(e.target.value) })}
                className="border-slate-700 bg-slate-900 text-white"
                placeholder="75000"
              />
            </div>
          </div>

          <Button
            onClick={handleManualSubmit}
            className="w-full bg-blue-500 hover:bg-blue-600"
            disabled={!formData.employee_count_start || !formData.employee_count_end}
          >
            Continue with Manual Entry
          </Button>
        </div>
      </div>
    </Card>
  );
}