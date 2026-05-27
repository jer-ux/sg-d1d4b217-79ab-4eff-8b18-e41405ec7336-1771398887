import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

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
    const form = formidable({ multiples: true, maxFileSize: 50 * 1024 * 1024 });

    const [fields, files] = await form.parse(req);

    const companyLegalName = fields.companyLegalName?.[0];
    const ein = fields.ein?.[0];
    const planName = fields.planName?.[0];
    const planYears = fields.planYears ? JSON.parse(fields.planYears[0]) : ["2024"];
    const livesCovered = parseInt(fields.livesCovered?.[0] || "0");
    const planType = fields.planType?.[0];
    const currentBroker = fields.currentBroker?.[0];
    const currentPBM = fields.currentPBM?.[0];
    const contactName = fields.contactName?.[0];
    const contactTitle = fields.contactTitle?.[0];
    const contactEmail = fields.contactEmail?.[0];
    const contactMobile = fields.contactMobile?.[0];
    const stripeSessionId = fields.stripe_session_id?.[0];

    const fileUrls: Record<string, string[]> = {
      form5500: [],
      scheduleA: [],
      brokerDisclosure: [],
      pbmContract: []
    };

    for (const [fieldName, fileArray] of Object.entries(files)) {
      if (!Array.isArray(fileArray)) continue;
      
      for (const file of fileArray) {
        const fileBuffer = fs.readFileSync(file.filepath);
        const fileName = `${Date.now()}-${file.originalFilename}`;
        const filePath = `engagements/${stripeSessionId}/${fileName}`;

        const { data, error } = await supabase.storage
          .from("shady-broker-reports")
          .upload(filePath, fileBuffer, {
            contentType: file.mimetype || "application/pdf",
          });

        if (error) {
          console.error("Upload error:", error);
          continue;
        }

        const { data: { publicUrl } } = supabase.storage
          .from("shady-broker-reports")
          .getPublicUrl(filePath);

        if (fieldName.startsWith("form5500")) {
          fileUrls.form5500.push(publicUrl);
        } else if (fieldName.startsWith("scheduleA")) {
          fileUrls.scheduleA.push(publicUrl);
        } else if (fieldName === "brokerDisclosure") {
          fileUrls.brokerDisclosure.push(publicUrl);
        } else if (fieldName === "pbmContract") {
          fileUrls.pbmContract.push(publicUrl);
        }
      }
    }

    const { data: engagement, error: dbError } = await supabase
      .from("shady_broker_engagements")
      .insert({
        company_legal_name: companyLegalName,
        ein,
        plan_name: planName,
        plan_years: planYears,
        lives_covered: livesCovered,
        plan_type: planType,
        current_broker: currentBroker,
        current_pbm: currentPBM,
        contact_name: contactName,
        contact_title: contactTitle,
        contact_email: contactEmail,
        contact_mobile: contactMobile,
        stripe_session_id: stripeSessionId,
        form_5500_urls: fileUrls.form5500,
        schedule_a_urls: fileUrls.scheduleA,
        broker_disclosure_url: fileUrls.brokerDisclosure[0] || null,
        pbm_contract_url: fileUrls.pbmContract[0] || null,
        engagement_state: "intake",
        payment_status: "paid"
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      return res.status(500).json({ error: "Failed to create engagement record" });
    }

    await sendConfirmationEmail(contactEmail, contactName, engagement.id);
    await sendInternalNotification(engagement);

    res.status(200).json({ 
      success: true, 
      engagementId: engagement.id 
    });
  } catch (error: any) {
    console.error("Intake submission error:", error);
    res.status(500).json({ error: "Failed to process intake submission" });
  }
}

async function sendConfirmationEmail(email: string, name: string, engagementId: string) {
  console.log(`[EMAIL] Would send confirmation to ${email}`);
  console.log(`[EMAIL] Name: ${name}, Engagement ID: ${engagementId}`);
}

async function sendInternalNotification(engagement: any) {
  console.log(`[EMAIL] Would send internal notification to jer@kincaidrmc.com`);
  console.log(`[SLACK] Would send alert to #engagements channel`);
  console.log(`[DATA]`, JSON.stringify(engagement, null, 2));
}