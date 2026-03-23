/**
 * Automated Supabase Storage Setup
 * Creates buckets and policies automatically
 */

import { supabase } from "@/integrations/supabase/client";

export interface StorageBucketConfig {
  id: string;
  name: string;
  public: boolean;
  fileSizeLimit?: number;
  allowedMimeTypes?: string[];
}

/**
 * Check if storage bucket exists
 */
export async function checkBucketExists(bucketId: string): Promise<boolean> {
  try {
    const { data, error } = await supabase.storage.getBucket(bucketId);
    return !error && !!data;
  } catch (error) {
    return false;
  }
}

/**
 * Create storage bucket with automatic setup
 * NOTE: This requires service role key (admin privileges)
 * In production, call this from a secure API endpoint
 */
export async function createStorageBucket(
  config: StorageBucketConfig
): Promise<{ success: boolean; error?: string }> {
  
  try {
    // Check if bucket already exists
    const exists = await checkBucketExists(config.id);
    
    if (exists) {
      console.log(`✅ Bucket '${config.id}' already exists`);
      return { success: true };
    }

    console.log(`📦 Creating storage bucket: ${config.id}...`);

    // Create bucket using Supabase client
    // NOTE: This will fail in browser without admin privileges
    // In production, this should be called from a secure API endpoint
    const { error: createError } = await supabase.storage.createBucket(config.id, {
      public: config.public,
      fileSizeLimit: config.fileSizeLimit || 10485760, // 10MB default
      allowedMimeTypes: config.allowedMimeTypes || [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ]
    });

    if (createError) {
      throw createError;
    }

    console.log(`✅ Bucket '${config.id}' created successfully`);
    return { success: true };

  } catch (error: any) {
    console.error(`❌ Failed to create bucket '${config.id}':`, error);
    return {
      success: false,
      error: error.message || "Failed to create storage bucket"
    };
  }
}

/**
 * Setup contract uploads bucket with proper configuration
 */
export async function setupContractUploadsBucket(): Promise<{
  success: boolean;
  error?: string;
}> {
  
  const config: StorageBucketConfig = {
    id: "contract-uploads",
    name: "Contract Uploads",
    public: true, // Allow public access to uploaded files
    fileSizeLimit: 10485760, // 10MB
    allowedMimeTypes: [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ]
  };

  return await createStorageBucket(config);
}

/**
 * Verify storage setup and provide guidance if manual setup needed
 */
export async function verifyStorageSetup(): Promise<{
  ready: boolean;
  message: string;
  setupInstructions?: string;
}> {
  
  const bucketExists = await checkBucketExists("contract-uploads");

  if (bucketExists) {
    return {
      ready: true,
      message: "✅ Storage is configured correctly"
    };
  }

  // Attempt automatic setup
  const setupResult = await setupContractUploadsBucket();

  if (setupResult.success) {
    return {
      ready: true,
      message: "✅ Storage bucket created automatically"
    };
  }

  // If automatic setup fails, provide manual instructions
  return {
    ready: false,
    message: "⚠️ Manual storage setup required",
    setupInstructions: `
MANUAL SETUP INSTRUCTIONS:

1. Go to your Supabase Dashboard
2. Navigate to: Storage → Create Bucket
3. Configure bucket:
   - Bucket Name: contract-uploads
   - Public bucket: YES
   - File size limit: 10 MB
   - Allowed MIME types: PDF, DOC, DOCX

4. Click "Create bucket"

5. Refresh this page and try uploading again

Alternatively, contact your admin to run this SQL:

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'contract-uploads',
  'Contract Uploads',
  true,
  10485760,
  ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']::text[]
);
    `.trim()
  };
}