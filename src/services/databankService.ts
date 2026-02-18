import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Tables = Database["public"]["Tables"];

// Type definitions for each databank
export type ClaimsRecord = Tables["claims_databank"]["Row"];
export type MemberRecord = Tables["member_databank"]["Row"];
export type ProviderRecord = Tables["provider_databank"]["Row"];
export type FinancialRecord = Tables["financial_databank"]["Row"];
export type ContractRecord = Tables["contract_databank"]["Row"];
export type CensusRecord = Tables["census_databank"]["Row"];
export type AnalyticsRecord = Tables["analytics_databank"]["Row"];

export type DatabankType = 
  | "claims"
  | "member"
  | "provider"
  | "financial"
  | "contract"
  | "census"
  | "analytics";

interface UploadMetadata {
  original_filename: string;
  file_size: number;
  mime_type: string;
  row_count?: number;
  column_count?: number;
  databank_type: DatabankType;
  tags?: string[];
  metadata?: Record<string, unknown>;
}

/**
 * Upload a file to Supabase Storage and create a databank record
 */
export async function uploadToDatabank(
  file: File,
  databankType: DatabankType,
  additionalMetadata?: Partial<UploadMetadata>
): Promise<{ success: boolean; record_id?: string; error?: string }> {
  try {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { success: false, error: "User not authenticated" };
    }

    // Generate unique file path
    const timestamp = Date.now();
    const fileExt = file.name.split(".").pop();
    const filePath = `${user.id}/${databankType}/${timestamp}.${fileExt}`;

    // Upload file to storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("databank-uploads")
      .upload(filePath, file);

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return { success: false, error: uploadError.message };
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from("databank-uploads")
      .getPublicUrl(filePath);

    // Prepare metadata
    const metadata: Partial<UploadMetadata> = {
      original_filename: file.name,
      file_size: file.size,
      mime_type: file.type,
      databank_type: databankType,
      ...additionalMetadata,
    };

    // Create record in appropriate databank table
    const tableName = `${databankType}_databank` as const;
    const { data: record, error: dbError } = await supabase
      .from(tableName)
      .insert({
        user_id: user.id,
        file_path: filePath,
        file_url: publicUrl,
        original_filename: metadata.original_filename,
        file_size: metadata.file_size,
        mime_type: metadata.mime_type,
        row_count: metadata.row_count,
        column_count: metadata.column_count,
        tags: metadata.tags,
        metadata: metadata.metadata,
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      return { success: false, error: dbError.message };
    }

    console.log("Upload successful:", { record });
    return { success: true, record_id: record.id };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { success: false, error: String(error) };
  }
}

/**
 * Get all records from a specific databank
 */
export async function getDatabankRecords(
  databankType: DatabankType,
  filters?: {
    tags?: string[];
    search?: string;
    status?: string;
    limit?: number;
  }
) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { data: [], error: "User not authenticated" };
    }

    const tableName = `${databankType}_databank` as const;
    let query = supabase
      .from(tableName)
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (filters?.limit) {
      query = query.limit(filters.limit);
    }

    if (filters?.status) {
      query = query.eq("status", filters.status);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Query error:", error);
      return { data: [], error: error.message };
    }

    // Apply client-side filters
    let filteredData = data || [];

    if (filters?.tags && filters.tags.length > 0) {
      filteredData = filteredData.filter(record => {
        const recordTags = Array.isArray(record.tags) ? record.tags : [];
        return filters.tags!.some(tag => recordTags.includes(tag));
      });
    }

    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      filteredData = filteredData.filter(record =>
        record.original_filename?.toLowerCase().includes(searchLower)
      );
    }

    return { data: filteredData, error: null };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { data: [], error: String(error) };
  }
}

/**
 * Delete a databank record and its associated file
 */
export async function deleteDatabankRecord(
  databankType: DatabankType,
  recordId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { success: false, error: "User not authenticated" };
    }

    const tableName = `${databankType}_databank` as const;

    // Get the record to find file path
    const { data: record, error: fetchError } = await supabase
      .from(tableName)
      .select("file_path")
      .eq("id", recordId)
      .eq("user_id", user.id)
      .single();

    if (fetchError || !record) {
      return { success: false, error: "Record not found" };
    }

    // Delete file from storage
    const { error: storageError } = await supabase.storage
      .from("databank-uploads")
      .remove([record.file_path]);

    if (storageError) {
      console.error("Storage deletion error:", storageError);
    }

    // Delete database record
    const { error: deleteError } = await supabase
      .from(tableName)
      .delete()
      .eq("id", recordId)
      .eq("user_id", user.id);

    if (deleteError) {
      console.error("Delete error:", deleteError);
      return { success: false, error: deleteError.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { success: false, error: String(error) };
  }
}

/**
 * Update databank record status and metadata
 */
export async function updateDatabankRecord(
  databankType: DatabankType,
  recordId: string,
  updates: {
    status?: string;
    tags?: string[];
    metadata?: Record<string, unknown>;
    row_count?: number;
    column_count?: number;
  }
): Promise<{ success: boolean; error?: string }> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { success: false, error: "User not authenticated" };
    }

    const tableName = `${databankType}_databank` as const;

    const { error } = await supabase
      .from(tableName)
      .update(updates)
      .eq("id", recordId)
      .eq("user_id", user.id);

    if (error) {
      console.error("Update error:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { success: false, error: String(error) };
  }
}

/**
 * Get databank statistics
 */
export async function getDatabankStats(databankType: DatabankType) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { data: null, error: "User not authenticated" };
    }

    const tableName = `${databankType}_databank` as const;

    const { data, error } = await supabase
      .from(tableName)
      .select("file_size, status, created_at")
      .eq("user_id", user.id);

    if (error) {
      console.error("Stats query error:", error);
      return { data: null, error: error.message };
    }

    const stats = {
      total_files: data?.length || 0,
      total_size: data?.reduce((sum, record) => sum + (record.file_size || 0), 0) || 0,
      by_status: data?.reduce((acc, record) => {
        acc[record.status] = (acc[record.status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {},
      recent_uploads: data?.filter(record => {
        const uploadDate = new Date(record.created_at);
        const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        return uploadDate > dayAgo;
      }).length || 0,
    };

    return { data: stats, error: null };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { data: null, error: String(error) };
  }
}