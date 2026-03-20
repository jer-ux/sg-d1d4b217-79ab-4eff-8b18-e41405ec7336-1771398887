import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface AcronymTooltipProps {
  acronym: string;
  definition?: string;
  children?: React.ReactNode;
}

export function AcronymTooltip({ acronym, definition, children }: AcronymTooltipProps) {
  // Use provided definition or look up from dictionary
  const def = definition || ACRONYM_DEFINITIONS[acronym] || "Definition not found";

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="cursor-help border-b border-dotted border-gray-400 hover:border-gray-300 transition-colors">
            {children || acronym}
          </span>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs bg-gray-900 border-gray-700 text-white">
          <p className="font-semibold text-amber-400">{acronym}</p>
          <p className="text-sm text-gray-300">{def}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// Common security and compliance acronyms
export const ACRONYM_DEFINITIONS: Record<string, string> = {
  // NIST Standards
  "NIST": "National Institute of Standards and Technology",
  "CSF": "Cybersecurity Framework - A voluntary framework for managing cybersecurity risk",
  "FISMA": "Federal Information Security Management Act",
  "FedRAMP": "Federal Risk and Authorization Management Program",
  
  // Security Controls
  "CSP": "Content Security Policy - HTTP header that helps prevent XSS attacks",
  "HSTS": "HTTP Strict Transport Security - Forces HTTPS connections",
  "CORS": "Cross-Origin Resource Sharing - Security feature that restricts web page resources",
  "XSS": "Cross-Site Scripting - Security vulnerability allowing injection of malicious scripts",
  "CSRF": "Cross-Site Request Forgery - Attack that forces users to execute unwanted actions",
  "MFA": "Multi-Factor Authentication - Security system requiring multiple verification methods",
  "2FA": "Two-Factor Authentication - Security process requiring two different authentication factors",
  "SSO": "Single Sign-On - Authentication scheme allowing users to log in once for multiple systems",
  "RBAC": "Role-Based Access Control - Access management based on user roles",
  "TLS": "Transport Layer Security - Cryptographic protocol for secure communication",
  "SSL": "Secure Sockets Layer - Predecessor to TLS for encrypted connections",
  "AES": "Advanced Encryption Standard - Symmetric encryption algorithm",
  
  // Compliance & Privacy
  "HIPAA": "Health Insurance Portability and Accountability Act - Healthcare data privacy law",
  "GDPR": "General Data Protection Regulation - EU data protection and privacy law",
  "CCPA": "California Consumer Privacy Act - California privacy rights law",
  "SOC 2": "Service Organization Control 2 - Security audit for service providers",
  "ERISA": "Employee Retirement Income Security Act - Retirement plan regulations",
  "PII": "Personally Identifiable Information - Data that identifies an individual",
  "PHI": "Protected Health Information - Health data protected by HIPAA",
  "PCI DSS": "Payment Card Industry Data Security Standard - Security standard for payment card data",
  
  // Security Functions
  "SIEM": "Security Information and Event Management - Real-time analysis of security alerts",
  "IDS": "Intrusion Detection System - Monitors network traffic for suspicious activity",
  "IPS": "Intrusion Prevention System - Actively blocks detected threats",
  "DLP": "Data Loss Prevention - Security strategy preventing data breaches",
  "EDR": "Endpoint Detection and Response - Security solution for endpoint monitoring",
  "WAF": "Web Application Firewall - Filters and monitors HTTP traffic",
  "VPN": "Virtual Private Network - Encrypted connection over a network",
  
  // Database & Infrastructure
  "RLS": "Row Level Security - Database security restricting row access based on user",
  "API": "Application Programming Interface - Set of protocols for building software",
  "REST": "Representational State Transfer - Architectural style for web services",
  "JSON": "JavaScript Object Notation - Lightweight data interchange format",
  "SQL": "Structured Query Language - Language for managing relational databases",
  "NoSQL": "Not Only SQL - Database design for flexible data models",
  
  // Healthcare & Benefits
  "PBM": "Pharmacy Benefit Manager - Company administering prescription drug programs",
  "EBITDA": "Earnings Before Interest, Taxes, Depreciation, and Amortization - Financial metric",
  "EHR": "Electronic Health Record - Digital version of patient medical history",
  "EMR": "Electronic Medical Record - Digital patient chart from one practice",
  "HL7": "Health Level Seven - Healthcare data exchange standards",
  "FHIR": "Fast Healthcare Interoperability Resources - Healthcare data exchange standard",
  "ICD": "International Classification of Diseases - Medical diagnosis codes",
  "CPT": "Current Procedural Terminology - Medical procedure codes",
  
  // Risk Management
  "BCP": "Business Continuity Plan - Strategy for continuing operations during disruption",
  "DR": "Disaster Recovery - Process of restoring systems after catastrophic event",
  "RPO": "Recovery Point Objective - Maximum acceptable data loss measured in time",
  "RTO": "Recovery Time Objective - Maximum acceptable downtime",
  "SLA": "Service Level Agreement - Commitment between service provider and client",
  
  // Development & Operations
  "CI/CD": "Continuous Integration/Continuous Deployment - Automated software delivery",
  "DevOps": "Development Operations - Practices combining software development and IT operations",
  "DevSecOps": "Development Security Operations - Integrating security into DevOps",
  "IAM": "Identity and Access Management - Framework for managing digital identities",
  "SDK": "Software Development Kit - Collection of development tools",
  "API Key": "Application Programming Interface Key - Code for API authentication"
};