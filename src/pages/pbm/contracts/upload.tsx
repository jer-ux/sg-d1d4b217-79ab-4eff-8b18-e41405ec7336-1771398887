import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useRouter } from "next/router";
import { Upload, FileText, AlertCircle, ArrowLeft, Loader2, CheckCircle } from "lucide-react";
import { pbmContractService } from "@/services/pbmContractService";

export default function ContractUploadPage() {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    employerName: "",
    pbmName: "",
    contractTitle: "",
    contractType: "pbm",
    effectiveDate: "",
    renewalDate: "",
    versionName: "v1.0",
    notes: "",
  });
  const [error, setError] = useState("");
  const [uploadProgress, setUploadProgress] = useState("");

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

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === "application/pdf" || 
          droppedFile.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        setFile(droppedFile);
        setError("");
        setUploadProgress(`File selected: ${droppedFile.name}`);
      } else {
        setError("Please upload a PDF or DOCX file");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === "application/pdf" || 
          selectedFile.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        setFile(selectedFile);
        setError("");
        setUploadProgress(`File selected: ${selectedFile.name}`);
      } else {
        setError("Please upload a PDF or DOCX file");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      setError("Please select a file to upload");
      return;
    }

    // Validate required fields
    if (!formData.employerName || !formData.pbmName || !formData.contractTitle || 
        !formData.effectiveDate || !formData.renewalDate) {
      setError("Please fill in all required fields");
      return;
    }

    setUploading(true);
    setError("");
    setUploadProgress("Starting upload...");

    try {
      // Mock organization ID for demo
      const orgId = "demo-org-" + Date.now();

      setUploadProgress("Uploading file to storage...");

      const result = await pbmContractService.uploadContract({
        organizationId: orgId,
        employerName: formData.employerName,
        pbmName: formData.pbmName,
        contractTitle: formData.contractTitle,
        contractType: formData.contractType,
        effectiveDate: formData.effectiveDate,
        renewalDate: formData.renewalDate,
        file,
        versionName: formData.versionName,
        notes: formData.notes,
      });

      setUploadProgress("Upload successful! Redirecting...");

      // Small delay to show success message
      setTimeout(() => {
        router.push(`/pbm/contracts/${result.contractId}`);
      }, 1000);

    } catch (err: any) {
      console.error("Upload error:", err);
      setError(err.message || "Failed to upload contract. Please try again.");
      setUploadProgress("");
      setUploading(false);
    }
  };

  return (
    <>
      <SEO
        title="Upload Contract - PBM Contract Intelligence | SiriusB iQ"
        description="Upload a PBM contract for AI-powered analysis"
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Header */}
        <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="mx-auto max-w-4xl px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/pbm/contracts">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </Button>
                </Link>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">
                    Upload Contract
                  </h1>
                  <p className="text-sm text-slate-600">
                    Upload a PBM contract for analysis
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-4xl px-6 py-8">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* File Upload */}
              <Card className="p-6">
                <h2 className="mb-4 text-lg font-semibold text-slate-900">
                  Contract File
                </h2>
                
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  className={`relative rounded-lg border-2 border-dashed p-12 text-center transition-colors ${
                    dragActive
                      ? "border-blue-500 bg-blue-50"
                      : "border-slate-300 bg-slate-50 hover:border-slate-400"
                  }`}
                >
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    accept=".pdf,.docx"
                    onChange={handleFileChange}
                    disabled={uploading}
                  />
                  
                  {file ? (
                    <div className="space-y-4">
                      <FileText className="mx-auto h-12 w-12 text-blue-600" />
                      <div>
                        <p className="font-medium text-slate-900">{file.name}</p>
                        <p className="text-sm text-slate-600">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      {!uploading && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setFile(null);
                            setUploadProgress("");
                          }}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="mx-auto h-12 w-12 text-slate-400" />
                      <div>
                        <label
                          htmlFor="file-upload"
                          className="cursor-pointer font-medium text-blue-600 hover:text-blue-500"
                        >
                          Click to upload
                        </label>
                        <span className="text-slate-600"> or drag and drop</span>
                      </div>
                      <p className="text-sm text-slate-500">
                        PDF or DOCX up to 50MB
                      </p>
                    </div>
                  )}
                </div>

                {uploadProgress && !error && (
                  <div className="mt-4 flex items-center gap-2 rounded-lg bg-blue-50 p-3 text-sm text-blue-800">
                    {uploading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <CheckCircle className="h-4 w-4" />
                    )}
                    {uploadProgress}
                  </div>
                )}

                {error && (
                  <div className="mt-4 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-800">
                    <AlertCircle className="h-4 w-4" />
                    {error}
                  </div>
                )}
              </Card>

              {/* Contract Metadata */}
              <Card className="p-6">
                <h2 className="mb-4 text-lg font-semibold text-slate-900">
                  Contract Information
                </h2>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="employerName">Employer Name *</Label>
                    <Input
                      id="employerName"
                      value={formData.employerName}
                      onChange={(e) =>
                        setFormData({ ...formData, employerName: e.target.value })
                      }
                      required
                      placeholder="ABC Corporation"
                      disabled={uploading}
                    />
                  </div>

                  <div>
                    <Label htmlFor="pbmName">PBM Name *</Label>
                    <Input
                      id="pbmName"
                      value={formData.pbmName}
                      onChange={(e) =>
                        setFormData({ ...formData, pbmName: e.target.value })
                      }
                      required
                      placeholder="OptumRx"
                      disabled={uploading}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <Label htmlFor="contractTitle">Contract Title *</Label>
                    <Input
                      id="contractTitle"
                      value={formData.contractTitle}
                      onChange={(e) =>
                        setFormData({ ...formData, contractTitle: e.target.value })
                      }
                      required
                      placeholder="Pharmacy Benefit Management Services Agreement"
                      disabled={uploading}
                    />
                  </div>

                  <div>
                    <Label htmlFor="contractType">Contract Type</Label>
                    <Select
                      value={formData.contractType}
                      onValueChange={(value) =>
                        setFormData({ ...formData, contractType: value })
                      }
                      disabled={uploading}
                    >
                      <SelectTrigger id="contractType">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pbm">PBM Services Agreement</SelectItem>
                        <SelectItem value="carve_out">Specialty Carve-Out</SelectItem>
                        <SelectItem value="amendment">Amendment</SelectItem>
                        <SelectItem value="renewal">Renewal</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="versionName">Version Label</Label>
                    <Input
                      id="versionName"
                      value={formData.versionName}
                      onChange={(e) =>
                        setFormData({ ...formData, versionName: e.target.value })
                      }
                      placeholder="v1.0"
                      disabled={uploading}
                    />
                  </div>

                  <div>
                    <Label htmlFor="effectiveDate">Effective Date *</Label>
                    <Input
                      id="effectiveDate"
                      type="date"
                      value={formData.effectiveDate}
                      onChange={(e) =>
                        setFormData({ ...formData, effectiveDate: e.target.value })
                      }
                      required
                      disabled={uploading}
                    />
                  </div>

                  <div>
                    <Label htmlFor="renewalDate">Renewal Date *</Label>
                    <Input
                      id="renewalDate"
                      type="date"
                      value={formData.renewalDate}
                      onChange={(e) =>
                        setFormData({ ...formData, renewalDate: e.target.value })
                      }
                      required
                      disabled={uploading}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <Label htmlFor="notes">Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData({ ...formData, notes: e.target.value })
                      }
                      placeholder="Add any additional context or notes about this contract"
                      rows={3}
                      disabled={uploading}
                    />
                  </div>
                </div>
              </Card>

              {/* Submit */}
              <div className="flex items-center justify-end gap-4">
                <Link href="/pbm/contracts">
                  <Button type="button" variant="outline" disabled={uploading}>
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" disabled={uploading || !file} className="gap-2">
                  {uploading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4" />
                      Upload Contract
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </main>
      </div>
    </>
  );
}