import { useState } from "react";
import { Upload, DollarSign, CheckCircle2, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ClaimsUpload } from "@/lib/kincaid-iq/types";

type Props = {
  onUpload: (data: ClaimsUpload) => void;
};

type ClaimsData = {
  medical_total: number;
  rx_total: number;
  stop_loss_premium: number;
  admin_fees: number;
  period_start: string;
  period_end: string;
};

export function ClaimsUploader({ onUpload }: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [formData, setFormData] = useState<ClaimsData>({
    medical_total: 0,
    rx_total: 0,
    stop_loss_premium: 0,
    admin_fees: 0,
    period_start: "",
    period_end: "",
  });

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

    setTimeout(() => {
      const mockData: ClaimsData = {
        medical_total: 9500000,
        rx_total: 3200000,
        stop_loss_premium: 450000,
        admin_fees: 125000,
        period_start: "2024-01-01",
        period_end: "2024-12-31",
      };
      setFormData(mockData);
      setStatus("success");
    }, 1500);
  };

  const handleManualSubmit = () => {
    if (formData.medical_total > 0 && formData.period_start && formData.period_end) {
      setStatus("success");
      
      // Construct full ClaimsUpload object with generated IDs
      const uploadData: ClaimsUpload = {
        ...formData,
        id: `manual-${Date.now()}`,
        org_id: "demo-org",
      };
      
      onUpload(uploadData);
    }
  };

  return (
    <Card className="border-emerald-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/30 p-6">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-emerald-500/10 p-2">
            <DollarSign className="h-5 w-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white">Claims Data Upload</h3>
            <p className="text-sm text-slate-400">Upload claims summary or enter manually</p>
          </div>
        </div>

        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`
            relative rounded-lg border-2 border-dashed p-8 text-center transition-all
            ${isDragging 
              ? "border-emerald-400 bg-emerald-500/10" 
              : "border-slate-700 bg-slate-800/50 hover:border-emerald-500/50"
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
            Drop your claims file here
          </p>
          <p className="text-xs text-slate-400">Medical, Rx, Admin, Stop Loss data</p>

          {file && (
            <div className="mt-4 flex items-center justify-center gap-2 text-sm">
              {status === "processing" && (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
                  <span className="text-slate-300">Processing {file.name}...</span>
                </>
              )}
              {status === "success" && (
                <>
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  <span className="text-green-400">{file.name} loaded</span>
                </>
              )}
            </div>
          )}
        </div>

        <div className="space-y-4 rounded-lg border border-slate-700 bg-slate-800/30 p-4">
          <p className="text-sm font-medium text-slate-300">Or enter manually:</p>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-slate-300">Medical Total</Label>
              <Input
                type="number"
                value={formData.medical_total || ""}
                onChange={(e) => setFormData({ ...formData, medical_total: Number(e.target.value) })}
                className="border-slate-700 bg-slate-900 text-white"
                placeholder="9500000"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Rx Total</Label>
              <Input
                type="number"
                value={formData.rx_total || ""}
                onChange={(e) => setFormData({ ...formData, rx_total: Number(e.target.value) })}
                className="border-slate-700 bg-slate-900 text-white"
                placeholder="3200000"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Stop Loss Premium</Label>
              <Input
                type="number"
                value={formData.stop_loss_premium || ""}
                onChange={(e) => setFormData({ ...formData, stop_loss_premium: Number(e.target.value) })}
                className="border-slate-700 bg-slate-900 text-white"
                placeholder="450000"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Admin Fees</Label>
              <Input
                type="number"
                value={formData.admin_fees || ""}
                onChange={(e) => setFormData({ ...formData, admin_fees: Number(e.target.value) })}
                className="border-slate-700 bg-slate-900 text-white"
                placeholder="125000"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Period Start</Label>
              <Input
                type="date"
                value={formData.period_start}
                onChange={(e) => setFormData({ ...formData, period_start: e.target.value })}
                className="border-slate-700 bg-slate-900 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Period End</Label>
              <Input
                type="date"
                value={formData.period_end}
                onChange={(e) => setFormData({ ...formData, period_end: e.target.value })}
                className="border-slate-700 bg-slate-900 text-white"
              />
            </div>
          </div>

          <Button
            onClick={handleManualSubmit}
            className="w-full bg-emerald-500 hover:bg-emerald-600"
            disabled={!formData.medical_total || !formData.period_start || !formData.period_end}
          >
            Continue with Manual Entry
          </Button>
        </div>
      </div>
    </Card>
  );
}