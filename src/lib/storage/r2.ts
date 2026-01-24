import { S3Client } from "@aws-sdk/client-s3";

function must(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing ${name}`);
  return v;
}

export function r2Client() {
  const accountId = must("R2_ACCOUNT_ID");
  const accessKeyId = must("R2_ACCESS_KEY_ID");
  const secretAccessKey = must("R2_SECRET_ACCESS_KEY");

  return new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId, secretAccessKey },
  });
}

export function r2Bucket() {
  return must("R2_BUCKET");
}

export function r2PublicBaseUrl() {
  return must("R2_PUBLIC_BASE_URL").replace(/\/$/, "");
}