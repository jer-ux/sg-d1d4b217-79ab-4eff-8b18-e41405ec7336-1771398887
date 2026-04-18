import { useState, useCallback } from "react";
import { Upload, FileText, AlertCircle, CheckCircle2, TrendingDown } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { RxClaim } from "@/lib/kincaid-iq/types";

type UploadStatus = "idle" | "processing" | "success" | "error";

type RxClaimsUploaderProps = {
  onClaimsProcessed: (claims: RxClaim[]) => void;
  onUseMockData: () => void;
};

export function RxClaimsUploader({ onClaimsProcessed, onUseMockData }: RxClaimsUploaderProps) {
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const [fileName, setFileName] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [claimsCount, setClaimsCount] = useState<number>(0);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setUploadStatus("processing");
    setErrorMessage("");

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const text = e.target?.result as string;
        const claims = parseClaimsFile(text, file.name);
        
        if (claims.length === 0) {
          throw new Error("No valid claims found in file");
        }

        setClaimsCount(claims.length);
        setUploadStatus("success");
        onClaimsProcessed(claims);
      } catch (error) {
        setUploadStatus("error");
        setErrorMessage(error instanceof Error ? error.message : "Failed to parse claims file");
      }
    };

    reader.onerror = () => {
      setUploadStatus("error");
      setErrorMessage("Failed to read file");
    };

    reader.readAsText(file);
  }, [onClaimsProcessed]);

  return (
    <div className="space-y-4">
      <Card className="border-blue-500/20 bg-gradient-to-br from-slate-900 to-blue-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-blue-400" />
            Upload Rx Claims Data
          </CardTitle>
          <CardDescription>
            Upload pharmacy claims file (CSV/Excel) or use demo data to see Kincaid IQ analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-slate-700 rounded-lg p-8 text-center hover:border-blue-500/50 transition-colors">
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileUpload}
              className="hidden"
              id="claims-upload"
            />
            <label
              htmlFor="claims-upload"
              className="cursor-pointer flex flex-col items-center gap-3"
            >
              <FileText className="h-12 w-12 text-slate-500" />
              <div>
                <p className="text-sm font-medium">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  CSV or Excel file with Rx claims data
                </p>
              </div>
            </label>
          </div>

          {uploadStatus === "processing" && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>Processing {fileName}...</AlertDescription>
            </Alert>
          )}

          {uploadStatus === "success" && (
            <Alert className="border-green-500/50 bg-green-950/20">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <AlertDescription className="text-green-400">
                Successfully processed {claimsCount} claims from {fileName}
              </AlertDescription>
            </Alert>
          )}

          {uploadStatus === "error" && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          <div className="pt-4 border-t border-slate-800">
            <Button
              onClick={onUseMockData}
              variant="outline"
              className="w-full border-blue-500/30 hover:border-blue-500 hover:bg-blue-950/20"
            >
              <TrendingDown className="h-4 w-4 mr-2" />
              Use Demo Data (500 Claims)
            </Button>
          </div>

          <div className="text-xs text-slate-500 space-y-1">
            <p className="font-medium">Expected columns:</p>
            <ul className="list-disc list-inside space-y-0.5 ml-2">
              <li>NDC (National Drug Code)</li>
              <li>Drug Name</li>
              <li>Pharmacy NPI or Name</li>
              <li>Fill Date</li>
              <li>Days Supply</li>
              <li>Quantity</li>
              <li>Paid Amount</li>
              <li>Optional: Rebate Amount, AWP, Member Copay</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function parseClaimsFile(text: string, filename: string): RxClaim[] {
  const claims: RxClaim[] = [];
  const lines = text.split("\n").filter(line => line.trim());
  
  if (lines.length < 2) {
    throw new Error("File must contain headers and at least one data row");
  }

  const headers = lines[0].split(",").map(h => h.trim().toLowerCase());
  
  const requiredColumns = ["ndc", "paid_amount", "fill_date"];
  const missing = requiredColumns.filter(col => !headers.some(h => h.includes(col)));
  
  if (missing.length > 0) {
    throw new Error(`Missing required columns: ${missing.join(", ")}`);
  }

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",").map(v => v.trim());
    const row: Record<string, string> = {};
    
    headers.forEach((header, idx) => {
      row[header] = values[idx] || "";
    });

    const ndc = row["ndc"] || row["national_drug_code"] || "";
    const paidAmount = parseFloat(row["paid_amount"] || row["paid"] || row["total_paid"] || "0");
    const fillDate = row["fill_date"] || row["date"] || row["service_date"] || "";

    if (!ndc || !paidAmount || !fillDate) continue;

    claims.push({
      id: `claim_${i}`,
      ndc,
      drug_name: row["drug_name"] || row["medication"] || ndc,
      pharmacy_npi: row["pharmacy_npi"] || row["npi"] || undefined,
      pharmacy_name: row["pharmacy_name"] || row["pharmacy"] || undefined,
      fill_date: fillDate,
      days_supply: parseInt(row["days_supply"] || row["days"] || "30"),
      quantity: parseFloat(row["quantity"] || row["qty"] || "30"),
      paid_amount: paidAmount,
      member_copay: parseFloat(row["member_copay"] || row["copay"] || "0") || undefined,
      awp: parseFloat(row["awp"] || "0") || undefined,
      rebate_amount: parseFloat(row["rebate_amount"] || row["rebate"] || "0") || undefined,
      is_generic: (row["is_generic"] || row["generic"] || "").toLowerCase() === "true",
      is_specialty: (row["is_specialty"] || row["specialty"] || "").toLowerCase() === "true",
    });
  }

  return claims;
}