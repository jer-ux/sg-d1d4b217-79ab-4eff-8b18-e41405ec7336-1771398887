import type { NextApiRequest, NextApiResponse } from "next";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { r2Client, r2Bucket, r2PublicBaseUrl } from "@/lib/storage/r2";

export const config = {
  runtime: "nodejs",
};

function safeExt(filename: string) {
  const parts = filename.split(".");
  if (parts.length < 2) return "";
  const ext = parts.pop()!.toLowerCase().slice(0, 8).replace(/[^a-z0-9]/g, "");
  return ext ? `.${ext}` : "";
}

function makeKey(eventId: string, filename: string) {
  const ext = safeExt(filename);
  const stamp = Date.now();
  const rand = Math.random().toString(16).slice(2);
  return `warroom/${eventId}/${stamp}-${rand}${ext}`;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const { eventId, filename, contentType } = req.body;

    if (!eventId || !filename || !contentType) {
      return res.status(400).json({ ok: false, error: "eventId, filename, contentType required" });
    }

    const key = makeKey(String(eventId), String(filename));
    const Bucket = r2Bucket();

    const command = new PutObjectCommand({
      Bucket,
      Key: key,
      ContentType: String(contentType),
    });

    const uploadUrl = await getSignedUrl(r2Client(), command, { expiresIn: 60 });
    const publicUrl = `${r2PublicBaseUrl()}/${key}`;

    return res.json({ ok: true, uploadUrl, publicUrl, key });
  } catch (e: any) {
    console.error("Presign error:", e);
    return res.status(500).json({ ok: false, error: e?.message ?? "Unknown error" });
  }
}