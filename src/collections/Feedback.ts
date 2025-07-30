import { CollectionConfig } from "payload";
import {
  SESClient,
  SendEmailCommand,
  SendBounceCommandOutput,
} from "@aws-sdk/client-ses";
import { sesClient } from "../lib/ses";
import { feedbackAdminEmail } from "@/globals/feedbackAdminEmails";
import {
  generateSenderEmailHtml,
  generateSenderEmailText,
} from "../lib/emails/senderEmailTemplate";
import {
  generateReceiverEmailHtml,
  generateReceiverEmailText,
} from "../lib/emails/receiverEmailTemplate";

export const Feedback: CollectionConfig = {
  slug: "feedback",
  admin: {
    useAsTitle: "email",
  },
  access: {
    create: () => true,
    read: () => true, // TODO: restrict to admin
    update: () => true, // TODO: restrict to admin
    delete: () => true, // TODO: restrict to admin
  },
  fields: [
    {
      name: "type",
      type: "select",
      options: [
        { label: "Aduan", value: "aduan" },
        { label: "Pertanyaan", value: "pertanyaan" },
        { label: "Cadangan", value: "cadangan" },
      ],
      required: true,
    },
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "ic_number",
      type: "text",
      required: true,
    },
    {
      name: "address",
      type: "textarea",
      required: true,
    },
    {
      name: "phone_country_code",
      type: "text",
      required: true,
    },
    {
      name: "phone",
      type: "text",
      required: true,
    },
    {
      name: "email",
      type: "email",
      required: true,
    },
    {
      name: "agency",
      type: "text",
      required: true,
    },
    {
      name: "message",
      type: "textarea",
      required: true,
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, req, operation }) => {
        if (operation === "create") {
          const senderEmail = doc.email;
          const fromAddress = process.env.SES_FROM_ADDRESS;

          if (!fromAddress) {
            req.payload.logger.error(
              "SES_FROM_ADDRESS environment variable is not set. Cannot send emails.",
            );
            return doc;
          }

          // Send Email to Sender (no check)
          if (senderEmail) {
            try {
              const senderParams = {
                Source: fromAddress,
                Destination: {
                  ToAddresses: [senderEmail],
                },
                Message: {
                  Subject: {
                    Charset: "UTF-8",
                    Data: `Confirmation of Your ${doc.type} Submission`,
                  },
                  Body: {
                    Html: {
                      Charset: "UTF-8",
                      Data: generateSenderEmailHtml(doc),
                    },
                    Text: {
                      Charset: "UTF-8",
                      Data: generateSenderEmailText(doc),
                    },
                  },
                },
              };
              const senderCommand = new SendEmailCommand(senderParams);
              await sesClient.send(senderCommand);
              req.payload.logger.info(
                `Confirmation email sent to ${senderEmail} for feedback ID: ${doc.id}`,
              );
            } catch (error: any) {
              req.payload.logger.error(
                `Error sending confirmation email to ${senderEmail}: ${error.message}`,
              );
            }
          }

          // --- Send Email to Receiver (Admin) ---
          if (feedbackAdminEmail) {
            try {
              const receiverParams = {
                Source: fromAddress,
                Destination: {
                  ToAddresses: [feedbackAdminEmail],
                },
                Message: {
                  Subject: {
                    Charset: "UTF-8",
                    Data: `New ${doc.type} Submission Received (ID: ${doc.id})`,
                  },
                  Body: {
                    Html: {
                      Charset: "UTF-8",
                      Data: generateReceiverEmailHtml(doc),
                    },
                    Text: {
                      Charset: "UTF-8",
                      Data: generateReceiverEmailText(doc),
                    },
                  },
                },
              };

              const receiverCommand = new SendEmailCommand(receiverParams);
              await sesClient.send(receiverCommand);

              req.payload.logger.info(
                `Notification email sent to admin (${feedbackAdminEmail}) for feedback ID: ${doc.id}`,
              );
            } catch (error: any) {
              req.payload.logger.error(
                `Error sending notification email to admin (${feedbackAdminEmail}): ${error.message}`,
              );
            }
          } else {
            req.payload.logger.warn(
              "No valid admin email available to send notification.",
            );
          }
        }
        return doc;
      },
    ],
  },
};
