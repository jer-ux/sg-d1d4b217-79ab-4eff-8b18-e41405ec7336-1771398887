import type { NextApiRequest, NextApiResponse } from "next";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { eventId, title, value, confidence } = req.body;

  if (!eventId) {
    return res.status(400).json({ error: "Missing eventId" });
  }

  try {
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]); // A4 size
    const { width, height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // Title
    page.drawText("Kincaid IQ — Proof Pack", {
      x: 50,
      y: height - 50,
      size: 20,
      font: boldFont,
      color: rgb(0, 0, 0),
    });

    // Event details
    const details = [
      `Event ID: ${eventId}`,
      `Title: ${title || "N/A"}`,
      `Identified Value: $${value?.toLocaleString() || "0"}`,
      `Confidence: ${confidence ? (confidence * 100).toFixed(0) : "0"}%`,
      "",
      "This proof pack contains:",
      "  • Evidence receipt with lineage and transform hashes",
      "  • Cohort extract (member/claim/Rx records)",
      "  • Contract lever citations (where applicable)",
      "  • DQ report summary",
      "",
      "Generated: " + new Date().toLocaleString(),
      "",
      "For questions, contact: ops@kincaidiq.com",
    ];

    let yPosition = height - 100;
    details.forEach((line) => {
      page.drawText(line, {
        x: 50,
        y: yPosition,
        size: 12,
        font: font,
        color: rgb(0, 0, 0),
      });
      yPosition -= 20;
    });

    // Footer
    page.drawText("Confidential — Internal Use Only", {
      x: 50,
      y: 30,
      size: 10,
      font: font,
      color: rgb(0.5, 0.5, 0.5),
    });

    const pdfBytes = await pdfDoc.save();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="proof-pack-${eventId}.pdf"`);
    res.status(200).send(Buffer.from(pdfBytes));
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).json({ error: "Failed to generate proof pack" });
  }
}