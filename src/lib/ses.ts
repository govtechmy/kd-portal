// lib/ses.ts
import { SESClient } from "@aws-sdk/client-ses";

// Ensure AWS environment variables are set
const awsAccessKeyId = process.env.AWS_ACCESS_KEY_ID;
const awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const awsRegion = process.env.AWS_REGION;

if (!awsAccessKeyId) {
  throw new Error(
    "Missing environment variable: AWS_ACCESS_KEY_ID. This should be your SMTP Username.",
  );
}
if (!awsSecretAccessKey) {
  throw new Error(
    "Missing environment variable: AWS_SECRET_ACCESS_KEY. This should be your SMTP Password.",
  );
}
if (!awsRegion) {
  throw new Error("Missing environment variable: AWS_REGION.");
}

// Initialize AWS SES Client with programmatic credentials
const sesClient = new SESClient({
  region: awsRegion,
  credentials: {
    accessKeyId: awsAccessKeyId,
    secretAccessKey: awsSecretAccessKey,
  },
});

export { sesClient };
