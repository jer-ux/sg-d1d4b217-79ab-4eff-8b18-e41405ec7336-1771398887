import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs/promises";
import path from "path";
import { supabase } from "@/integrations/supabase/client";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const form = formidable({
      maxFileSize: 50 * 1024 * 1024,
      maxFiles: 20,
    });

    const [fields, files] = await form.parse(req);

    const formData = {
      companyLegalName: fields.companyLegalName?.[0] || "",
      ein: fields.ein?.[0] || "",
      planName: fields.planName?.[0] || "",
      planYears: JSON.parse(fields.planYears?.[0] || "[]"),
      livesCovered: parseInt(fields.livesCovered?.[0] || "0"),
      fundingType: fields.fundingType?.[0] || "",
      currentBroker: fields.currentBroker?.[0] || "",
      currentPBM: fields.currentPBM?.[0] || "",
      contactName: fields.contactName?.[0] || "",
      contactTitle: fields.contactTitle?.[0] || "",
      contactEmail: fields.contactEmail?.[0] || "",
      contactMobile: fields.contactMobile?.[0] || "",
    };

    const uploadedFiles: Record<string, string[]> = {};

    for (const [fieldName, fileArray] of Object.entries(files)) {
      if (!fileArray) continue;
      
      const fileList = Array.isArray(fileArray) ? fileArray : [fileArray];
      uploadedFiles[fieldName] = [];

      for (const file of fileList) {
        const fileBuffer = await fs.readFile(file.filepath);
        const fileName = `${Date.now()}-${file.originalFilename}`;
        const filePath = `shady-broker-reports/${formData.ein}/${fileName}`;

        const { data, error } = await supabase.storage
          .from("documents")
          .upload(filePath, fileBuffer, {
            contentType: file.mimetype || "application/pdf",
          });

        if (error) {
          console.error("File upload error:", error);
          continue;
        }

        if (data) {
          const { data: urlData } = supabase.storage
            .from("documents")
            .getPublicUrl(filePath);
          
          uploadedFiles[fieldName].push(urlData.publicUrl);
        }
      }
    }

    const { data: engagement, error: dbError } = await supabase
      .from("shady_broker_engagements")
      .insert({
        company_legal_name: formData.companyLegalName,
        ein: formData.ein,
        plan_name: formData.planName,
        plan_years: formData.planYears,
        lives_covered: formData.livesCovered,
        funding_type: formData.fundingType,
        current_broker: formData.currentBroker,
        current_pbm: formData.currentPBM,
        contact_name: formData.contactName,
        contact_title: formData.contactTitle,
        contact_email: formData.contactEmail,
        contact_mobile: formData.contactMobile,
        form_5500_urls: uploadedFiles.form5500_0 || [],
        schedule_a_urls: uploadedFiles.scheduleA_0 || [],
        broker_disclosure_url: uploadedFiles.brokerDisclosure?.[0] || null,
        pbm_contract_url: uploadedFiles.pbmContract?.[0] || null,
        engagement_state: "intake",
        payment_status: "paid",
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      return res.status(500).json({ error: "Failed to create engagement record" });
    }

    await sendClientConfirmationEmail(formData);
    await sendInternalNotification(formData, uploadedFiles, engagement);

    res.status(200).json({ success: true, engagementId: engagement.id });
  } catch (error) {
    console.error("Intake submission error:", error);
    res.status(500).json({ error: "Submission failed" });
  }
}

async function sendClientConfirmationEmail(formData: any) {
  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Inter, system-ui, sans-serif; line-height: 1.6; color: #0B1220; background: #FAF8F5; }
        .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
        .header { font-family: Georgia, serif; font-size: 32px; color: #0B1220; margin-bottom: 24px; }
        .label { font-family: "JetBrains Mono", monospace; font-size: 11px; color: #8C1515; letter-spacing: 0.1em; margin-bottom: 8px; }
        .divider { height: 1px; background: #EDE6D6; margin: 32px 0; }
        a { color: #8C1515; text-decoration: underline; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="label">KINCAID IQ / FORENSIC SERIES</div>
        <h1 class="header">Your engagement is confirmed</h1>
        
        <p>Thank you for commissioning The Shady Broker Report. Your 10 business day delivery window has begun.</p>
        
        <div class="divider"></div>
        
        <p><strong>What happens next:</strong></p>
        <ul>
          <li>Your documents are being processed through our Evidence Spine Protocol</li>
          <li>You will receive progress updates on days 3, 6, and 9</li>
          <li>Your 24-page forensic report will be delivered on or before day 10</li>
        </ul>
        
        <div class="divider"></div>
        
        <p><strong>Schedule your kickoff call:</strong></p>
        <p><a href="https://calendly.com/jer-kincaid/30min">Book a 30-minute kickoff call</a></p>
        
        <div class="divider"></div>
        
        <p>Your mutual NDA is attached to this email.</p>
        
        <p>Questions? Contact Jeremiah Shrack directly at jer@kincaidrmc.com or (317) 362-9840.</p>
        
        <div class="divider"></div>
        
        <p style="font-size: 12px; color: #5B6472;">
          Kincaid Risk Management Co.<br>
          Carmel, Indiana<br>
          kincaidrmc.com
        </p>
      </div>
    </body>
    </html>
  `;

  console.log(`[EMAIL] Would send confirmation to ${formData.contactEmail}`);
}

async function sendInternalNotification(formData: any, files: any, engagement: any) {
  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Inter, system-ui, sans-serif; line-height: 1.6; color: #0B1220; }
        .container { max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { font-family: Georgia, serif; font-size: 24px; margin-bottom: 20px; }
        .field { margin-bottom: 12px; }
        .label { font-weight: 600; color: #5B6472; }
        .divider { height: 1px; background: #EDE6D6; margin: 24px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1 class="header">New Shady Broker Report Engagement</h1>
        
        <div class="field">
          <span class="label">Company:</span> ${formData.companyLegalName}
        </div>
        <div class="field">
          <span class="label">EIN:</span> ${formData.ein}
        </div>
        <div class="field">
          <span class="label">Lives:</span> ${formData.livesCovered}
        </div>
        <div class="field">
          <span class="label">Funding:</span> ${formData.fundingType}
        </div>
        
        <div class="divider"></div>
        
        <div class="field">
          <span class="label">Current Broker:</span> ${formData.currentBroker}
        </div>
        <div class="field">
          <span class="label">Current PBM:</span> ${formData.currentPBM}
        </div>
        
        <div class="divider"></div>
        
        <div class="field">
          <span class="label">Contact:</span> ${formData.contactName}, ${formData.contactTitle}
        </div>
        <div class="field">
          <span class="label">Email:</span> ${formData.contactEmail}
        </div>
        <div class="field">
          <span class="label">Mobile:</span> ${formData.contactMobile}
        </div>
        
        <div class="divider"></div>
        
        <div class="field">
          <span class="label">Engagement ID:</span> ${engagement.id}
        </div>
        <div class="field">
          <span class="label">Database Record:</span> View in Supabase
        </div>
      </div>
    </body>
    </html>
  `;

  console.log(`[EMAIL] Would send internal notification to jer@kincaidrmc.com`);
  console.log(`[SLACK] Would send alert to #engagements channel`);
}