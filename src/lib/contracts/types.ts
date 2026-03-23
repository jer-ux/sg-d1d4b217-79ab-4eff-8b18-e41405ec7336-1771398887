/**
 * Core types for Contract Intelligence Platform
 */

export interface ContractUpload {
  id: string;
  organizationId: string;
  fileName: string;
  fileSize: number;
  filePath: string;
  uploadedAt: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  analysisResult?: ContractAnalysisResult;
}

export interface ContractAnalysisResult {
  overallScore: number;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  provisions: ProvisionAnalysis[];
  redFlags: RedFlag[];
  criticalIssuesCount: number;
  totalRedFlags: number;
  estimatedSavings: number;
  processingTime: number;
  analyzedAt: string;
  aiModel?: string;
  confidence?: number;
}

export interface ContractDocument {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  uploadDate: Date;
}

export interface ExtractionResult {
  success: boolean;
  text: string;
  error?: string;
  metadata: {
    fileName: string;
    fileSize: number;
    fileType: string;
    extractionMethod: string;
    processingTimeMs: number;
    wordCount: number;
    characterCount: number;
    pageCount: number;
  };
}

export interface ProvisionAnalysis {
  name: string;
  description: string;
  score: number;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  estimatedImpact: number;
  recommendation: string;
  extractedText?: string;
  pageReferences?: number[];
}

export interface RedFlag {
  title: string;
  description: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  provision: string;
  estimatedImpact: number;
  recommendation: string;
  pageReference?: number;
}

export interface ContractComparison {
  id: string;
  userId: string;
  contracts: string[]; // Contract IDs
  createdAt: string;
  name?: string;
}

export interface DashboardMetrics {
  totalUploads: number;
  activeAnalyses: number;
  completedAnalyses: number;
  totalUsers: number;
  avgProcessingTime: number;
  totalSavingsIdentified: number;
  criticalIssues: number;
  avgRiskScore: number;
  uploadTrend: number;
  processingTrend: number;
}

export interface RecentActivity {
  id: string;
  organization: string;
  contractName: string;
  status: string;
  riskScore: number;
  savingsIdentified: number;
  uploadedAt: string;
}

export interface TopIssue {
  issue: string;
  frequency: number;
  avgImpact: number;
  trend: 'up' | 'down' | 'stable';
}

export interface RiskAssessment {
  overallRisk: 'Low' | 'Medium' | 'High' | 'Critical';
  riskScore: number;
  riskFactors: RiskFactor[];
  mitigationStrategies: string[];
}

export interface RiskFactor {
  category: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  description: string;
  likelihood: number; // 0-100
  impact: number; // 0-100
}

export interface ContractProvision {
  id: string;
  contractId: string;
  provisionType: string;
  content: string;
  score: number;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  extractedAt: string;
  pageNumber?: number;
  recommendations?: string[];
}

export interface OrganizationSettings {
  id: string;
  organizationId: string;
  subscriptionTier: 'starter' | 'professional' | 'enterprise';
  monthlyUploadLimit: number;
  storageLimit: number; // in GB
  features: {
    bulkUpload: boolean;
    apiAccess: boolean;
    customBranding: boolean;
    prioritySupport: boolean;
    advancedAnalytics: boolean;
  };
}