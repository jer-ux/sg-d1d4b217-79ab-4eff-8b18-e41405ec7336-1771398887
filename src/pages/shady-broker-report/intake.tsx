import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Upload, FileText, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { SEO } from "@/components/SEO";
import { useRouter } from "next/router";

export default function ShadyBrokerIntake() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    companyLegalName: "",
    ein: "",
    planName: "",
    planYears: ["2024"],
    livesCovered: "",
    fundingType: "self-funded",
    currentBroker: "",
    currentPBM: "",
    contactName: "",
    contactTitle: "",
    contactEmail: "",
    contactMobile: "",
    ndaAcknowledged: false
  });
  
  const [files, setFiles] = useState({
    form5500: [] as File[],
    scheduleA: [] as File[],
    brokerDisclosure: null as File | null,
    pbmContract: null as File | null
  });

  const handleInputChange = (field: string, value: string | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field: string, fileList: FileList | null, multiple = false) => {
    if (!fileList) return;
    
    if (multiple) {
      setFiles(prev => ({ ...prev, [field]: Array.from(fileList) }));
    } else {
      setFiles(prev => ({ ...prev, [field]: fileList[0] }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!formData.ndaAcknowledged) {
      setError("You must acknowledge the NDA to proceed.");
      return;
    }
    
    if (files.form5500.length === 0 || files.scheduleA.length === 0 || !files.brokerDisclosure) {
      setError("Please upload all required documents.");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const uploadData = new FormData();
      
      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          uploadData.append(key, JSON.stringify(value));
        } else {
          uploadData.append(key, String(value));
        }
      });
      
      files.form5500.forEach((file, i) => {
        uploadData.append(`form5500_${i}`, file);
      });
      
      files.scheduleA.forEach((file, i) => {
        uploadData.append(`scheduleA_${i}`, file);
      });
      
      if (files.brokerDisclosure) {
        uploadData.append("brokerDisclosure", files.brokerDisclosure);
      }
      
      if (files.pbmContract) {
        uploadData.append("pbmContract", files.pbmContract);
      }
      
      const response = await fetch("/api/shady-broker-report/submit-intake", {
        method: "POST",
        body: uploadData
      });
      
      if (response.ok) {
        router.push("/shady-broker-report/confirmation");
      } else {
        const data = await response.json();
        setError(data.error || "Submission failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO 
        title="Intake Form | The Shady Broker Report"
        description="Submit your documents to begin your forensic audit."
      />
      
      <div className="min-h-screen bg-[#FAF8F5] py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="font-mono text-xs tracking-wider text-[#8C1515] mb-6">
              KINCAID IQ / FORENSIC SERIES
            </div>
            
            <h1 className="font-serif text-5xl text-[#0B1220] mb-4">
              Engagement intake
            </h1>
            
            <p className="text-base text-[#5B6472] mb-12 leading-[1.6]">
              Your 10 business day delivery window begins upon completion of this form. All information is confidential and protected under our mutual NDA.
            </p>
          </motion.div>
          
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-4 bg-[#8C1515]/10 border border-[#8C1515]/30 flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 text-[#8C1515] flex-shrink-0 mt-0.5" />
              <span className="text-sm text-[#8C1515]">{error}</span>
            </motion.div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-12">
            <section>
              <h2 className="font-serif text-2xl text-[#0B1220] mb-6">Plan information</h2>
              
              <div className="space-y-6">
                <div>
                  <Label htmlFor="companyLegalName" className="text-sm text-[#5B6472] mb-2 block">
                    Company legal name
                  </Label>
                  <Input
                    id="companyLegalName"
                    value={formData.companyLegalName}
                    onChange={(e) => handleInputChange("companyLegalName", e.target.value)}
                    required
                    className="bg-white border-[#EDE6D6] focus:border-[#8C1515] rounded-none"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="ein" className="text-sm text-[#5B6472] mb-2 block">
                      EIN
                    </Label>
                    <Input
                      id="ein"
                      value={formData.ein}
                      onChange={(e) => handleInputChange("ein", e.target.value)}
                      placeholder="00-0000000"
                      required
                      className="bg-white border-[#EDE6D6] focus:border-[#8C1515] rounded-none"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="livesCovered" className="text-sm text-[#5B6472] mb-2 block">
                      Lives covered
                    </Label>
                    <Input
                      id="livesCovered"
                      type="number"
                      value={formData.livesCovered}
                      onChange={(e) => handleInputChange("livesCovered", e.target.value)}
                      required
                      className="bg-white border-[#EDE6D6] focus:border-[#8C1515] rounded-none"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="planName" className="text-sm text-[#5B6472] mb-2 block">
                    Plan name
                  </Label>
                  <Input
                    id="planName"
                    value={formData.planName}
                    onChange={(e) => handleInputChange("planName", e.target.value)}
                    required
                    className="bg-white border-[#EDE6D6] focus:border-[#8C1515] rounded-none"
                  />
                </div>
                
                <div>
                  <Label className="text-sm text-[#5B6472] mb-3 block">
                    Funding type
                  </Label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="fundingType"
                        value="self-funded"
                        checked={formData.fundingType === "self-funded"}
                        onChange={(e) => handleInputChange("fundingType", e.target.value)}
                        className="w-4 h-4 text-[#8C1515] border-[#EDE6D6] focus:ring-[#8C1515]"
                      />
                      <span className="text-base text-[#0B1220]">Self-funded</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="fundingType"
                        value="fully-insured"
                        checked={formData.fundingType === "fully-insured"}
                        onChange={(e) => handleInputChange("fundingType", e.target.value)}
                        className="w-4 h-4 text-[#8C1515] border-[#EDE6D6] focus:ring-[#8C1515]"
                      />
                      <span className="text-base text-[#0B1220]">Fully insured</span>
                    </label>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="currentBroker" className="text-sm text-[#5B6472] mb-2 block">
                      Current broker of record
                    </Label>
                    <Input
                      id="currentBroker"
                      value={formData.currentBroker}
                      onChange={(e) => handleInputChange("currentBroker", e.target.value)}
                      required
                      className="bg-white border-[#EDE6D6] focus:border-[#8C1515] rounded-none"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="currentPBM" className="text-sm text-[#5B6472] mb-2 block">
                      Current PBM
                    </Label>
                    <Input
                      id="currentPBM"
                      value={formData.currentPBM}
                      onChange={(e) => handleInputChange("currentPBM", e.target.value)}
                      required
                      className="bg-white border-[#EDE6D6] focus:border-[#8C1515] rounded-none"
                    />
                  </div>
                </div>
              </div>
            </section>
            
            <div className="h-px bg-[#EDE6D6]" />
            
            <section>
              <h2 className="font-serif text-2xl text-[#0B1220] mb-6">Document upload</h2>
              
              <div className="space-y-6">
                <FileUploadField
                  label="Form 5500"
                  required
                  multiple
                  files={files.form5500}
                  onChange={(fileList) => handleFileChange("form5500", fileList, true)}
                  helpText="Upload Form 5500 for requested plan years. Multiple files accepted."
                />
                
                <FileUploadField
                  label="Schedule A"
                  required
                  multiple
                  files={files.scheduleA}
                  onChange={(fileList) => handleFileChange("scheduleA", fileList, true)}
                  helpText="Insurance information. Multiple files accepted."
                />
                
                <FileUploadField
                  label="Broker compensation disclosure"
                  required
                  file={files.brokerDisclosure}
                  onChange={(fileList) => handleFileChange("brokerDisclosure", fileList)}
                  helpText="ERISA 408(b)(2) disclosure or broker service agreement."
                />
                
                <FileUploadField
                  label="PBM contract"
                  optional
                  file={files.pbmContract}
                  onChange={(fileList) => handleFileChange("pbmContract", fileList)}
                  helpText="Optional but recommended for complete analysis."
                />
              </div>
            </section>
            
            <div className="h-px bg-[#EDE6D6]" />
            
            <section>
              <h2 className="font-serif text-2xl text-[#0B1220] mb-6">Primary contact</h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="contactName" className="text-sm text-[#5B6472] mb-2 block">
                      Full name
                    </Label>
                    <Input
                      id="contactName"
                      value={formData.contactName}
                      onChange={(e) => handleInputChange("contactName", e.target.value)}
                      required
                      className="bg-white border-[#EDE6D6] focus:border-[#8C1515] rounded-none"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="contactTitle" className="text-sm text-[#5B6472] mb-2 block">
                      Title
                    </Label>
                    <Input
                      id="contactTitle"
                      value={formData.contactTitle}
                      onChange={(e) => handleInputChange("contactTitle", e.target.value)}
                      required
                      className="bg-white border-[#EDE6D6] focus:border-[#8C1515] rounded-none"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="contactEmail" className="text-sm text-[#5B6472] mb-2 block">
                      Email
                    </Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                      required
                      className="bg-white border-[#EDE6D6] focus:border-[#8C1515] rounded-none"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="contactMobile" className="text-sm text-[#5B6472] mb-2 block">
                      Mobile
                    </Label>
                    <Input
                      id="contactMobile"
                      type="tel"
                      value={formData.contactMobile}
                      onChange={(e) => handleInputChange("contactMobile", e.target.value)}
                      required
                      className="bg-white border-[#EDE6D6] focus:border-[#8C1515] rounded-none"
                    />
                  </div>
                </div>
              </div>
            </section>
            
            <div className="h-px bg-[#EDE6D6]" />
            
            <div className="flex items-start gap-3">
              <Checkbox
                id="ndaAcknowledgment"
                checked={formData.ndaAcknowledged}
                onCheckedChange={(checked) => handleInputChange("ndaAcknowledged", checked as boolean)}
                className="mt-1 border-[#EDE6D6] data-[state=checked]:bg-[#8C1515] data-[state=checked]:border-[#8C1515]"
              />
              <label htmlFor="ndaAcknowledgment" className="text-sm text-[#5B6472] leading-[1.6] cursor-pointer">
                I acknowledge that I have reviewed and agree to the terms of the{" "}
                <a
                  href="/shady-broker-report-nda.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8C1515] underline hover:text-[#7A1212]"
                >
                  mutual non-disclosure agreement
                </a>
                {" "}governing this engagement.
              </label>
            </div>
            
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#8C1515] hover:bg-[#7A1212] text-[#FAF8F5] px-8 py-6 text-base font-medium rounded-none shadow-none disabled:opacity-50"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </span>
              ) : (
                "Begin the 10-day clock"
              )}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

interface FileUploadFieldProps {
  label: string;
  required?: boolean;
  optional?: boolean;
  multiple?: boolean;
  file?: File | null;
  files?: File[];
  onChange: (fileList: FileList | null) => void;
  helpText?: string;
}

function FileUploadField({
  label,
  required,
  optional,
  multiple,
  file,
  files,
  onChange,
  helpText
}: FileUploadFieldProps) {
  const displayFiles = multiple ? files || [] : file ? [file] : [];
  
  return (
    <div>
      <Label className="text-sm text-[#5B6472] mb-2 block">
        {label}
        {required && <span className="text-[#8C1515] ml-1">*</span>}
        {optional && <span className="text-[#5B6472] ml-1">(optional)</span>}
      </Label>
      
      <div className="border-2 border-dashed border-[#EDE6D6] hover:border-[#8C1515] transition-colors p-8 text-center cursor-pointer relative">
        <input
          type="file"
          accept=".pdf"
          multiple={multiple}
          onChange={(e) => onChange(e.target.files)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          required={required}
        />
        
        {displayFiles.length > 0 ? (
          <div className="space-y-2">
            {displayFiles.map((f, i) => (
              <div key={i} className="flex items-center justify-center gap-2 text-sm text-[#0B1220]">
                <FileText className="w-4 h-4 text-[#8C1515]" />
                <span>{f.name}</span>
                <CheckCircle2 className="w-4 h-4 text-[#8C1515]" />
              </div>
            ))}
            {multiple && (
              <p className="text-xs text-[#5B6472] mt-2">Click to add more files</p>
            )}
          </div>
        ) : (
          <div>
            <Upload className="w-8 h-8 text-[#5B6472] mx-auto mb-3" />
            <p className="text-sm text-[#0B1220] mb-1">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-[#5B6472]">PDF only, max 50MB per file</p>
          </div>
        )}
      </div>
      
      {helpText && (
        <p className="text-xs text-[#5B6472] mt-2">{helpText}</p>
      )}
    </div>
  );
}