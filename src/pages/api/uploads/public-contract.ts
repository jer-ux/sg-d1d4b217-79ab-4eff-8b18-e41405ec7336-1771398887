import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/integrations/supabase/client";

/**
 * Public Contract Upload Endpoint
 * No authentication required - for demos and quick tests
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const { fileName, fileSize, fileType } = req.body;

    if (!fileName) {
      return res.status(400).json({ ok: false, error: "fileName required" });
    }

    console.log("📤 Public upload request:", { fileName, fileSize, fileType });

    // Generate unique file path for public uploads
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(7);
    const ext = fileName.split('.').pop() || 'pdf';
    const storagePath = `public/${timestamp}-${random}.${ext}`;

    // Use demo organization for public uploads
    const demoOrgId = "11111111-1111-1111-1111-111111111111";
    const publicUserId = "00000000-0000-0000-0000-000000000001";

    // Create upload record without requiring auth
    const { data: uploadData, error: dbError } = await supabase
      .from('contract_uploads')
      .insert({
        organization_id: demoOrgId,
        user_id: publicUserId,
        file_name: fileName,
        file_size: fileSize || 0,
        file_type: fileType || 'application/pdf',
        storage_path: storagePath,
        upload_status: 'pending',
        metadata: {
          original_name: fileName,
          uploaded_at: new Date().toISOString(),
          public_upload: true
        }
      })
      .select()
      .single();

    if (dbError) {
      console.error("❌ Database error:", dbError);
      return res.status(500).json({ ok: false, error: dbError.message });
    }

    console.log("✅ Public upload record created:", uploadData.id);

    // Return upload details and presigned URL
    return res.json({
      ok: true,
      uploadId: uploadData.id,
      storagePath,
      message: "Upload initiated. Use Supabase client to upload file to this path."
    });

  } catch (error: any) {
    console.error("❌ Public upload error:", error);
    return res.status(500).json({ ok: false, error: error.message });
  }
}