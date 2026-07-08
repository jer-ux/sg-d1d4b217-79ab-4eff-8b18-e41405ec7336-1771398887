import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { submitContact, type ContactFormData } from "@/services/contactService";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export interface ContactFormProps {
  source?: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
  showCompanyField?: boolean;
  showJobTitleField?: boolean;
  submitButtonText?: string;
  successMessage?: string;
}

export function ContactForm({
  source = "website",
  onSuccess,
  onError,
  showCompanyField = true,
  showJobTitleField = true,
  submitButtonText = "Send Message",
  successMessage = "Thank you! We'll be in touch soon.",
}: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    full_name: "",
    email: "",
    phone: "",
    company: "",
    job_title: "",
    message: "",
    source,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to submit form");
      }

      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({
        full_name: "",
        email: "",
        phone: "",
        company: "",
        job_title: "",
        message: "",
        source,
      });
      setErrors({});
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "An error occurred. Please try again.";
      setIsSubmitting(false);
      setSubmitStatus("error");
      setErrorMessage(errorMsg);
      
      if (onError) {
        onError(errorMsg);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Full Name */}
      <div className="space-y-2">
        <Label htmlFor="full_name" className="text-sm font-medium text-gray-300">
          Full Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="full_name"
          name="full_name"
          type="text"
          value={formData.full_name}
          onChange={handleChange}
          placeholder="John Smith"
          required
          disabled={isSubmitting}
          className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500"
        />
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-gray-300">
          Email <span className="text-red-500">*</span>
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john@company.com"
          required
          disabled={isSubmitting}
          className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500"
        />
      </div>

      {/* Phone (optional) */}
      <div className="space-y-2">
        <Label htmlFor="phone" className="text-sm font-medium text-gray-300">
          Phone
        </Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+1 (555) 123-4567"
          disabled={isSubmitting}
          className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500"
        />
      </div>

      {/* Company (optional, conditionally shown) */}
      {showCompanyField && (
        <div className="space-y-2">
          <Label htmlFor="company" className="text-sm font-medium text-gray-300">
            Company
          </Label>
          <Input
            id="company"
            name="company"
            type="text"
            value={formData.company}
            onChange={handleChange}
            placeholder="Acme Corporation"
            disabled={isSubmitting}
            className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500"
          />
        </div>
      )}

      {/* Job Title (optional, conditionally shown) */}
      {showJobTitleField && (
        <div className="space-y-2">
          <Label htmlFor="job_title" className="text-sm font-medium text-gray-300">
            Job Title
          </Label>
          <Input
            id="job_title"
            name="job_title"
            type="text"
            value={formData.job_title}
            onChange={handleChange}
            placeholder="CFO"
            disabled={isSubmitting}
            className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500"
          />
        </div>
      )}

      {/* Message */}
      <div className="space-y-2">
        <Label htmlFor="message" className="text-sm font-medium text-gray-300">
          Message <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us how we can help..."
          required
          disabled={isSubmitting}
          rows={5}
          className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 resize-none"
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Sending...
          </>
        ) : (
          submitButtonText
        )}
      </Button>

      {/* Success Message */}
      {submitStatus === "success" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg"
        >
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <p className="text-sm text-emerald-300">{successMessage}</p>
        </motion.div>
      )}

      {/* Error Message */}
      {submitStatus === "error" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg"
        >
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
          <p className="text-sm text-red-300">{errorMessage}</p>
        </motion.div>
      )}
    </form>
  );
}