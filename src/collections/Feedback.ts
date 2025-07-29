import { CollectionConfig } from "payload";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { sesClient } from "../lib/ses";
// Updated import paths to reflect templates being in src/lib/emails/
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
    {
      name: "senderEmailSent", // New field to track if sender email was sent
      type: "checkbox",
      label: "Sender Email Sent",
      defaultValue: false,
      admin: {
        readOnly: true,
      },
    },
    {
      name: "receiverEmailSent", // New field to track if receiver email was sent
      type: "checkbox",
      label: "Receiver Email Sent",
      defaultValue: false,
      admin: {
        readOnly: true,
      },
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, req, operation }) => {
        // Only send emails on 'create' operation
        if (operation === "create") {
          const senderEmail = doc.email;
          const fromAddress = process.env.SES_FROM_ADDRESS;

          // Ensure necessary environment variables are set
          if (!fromAddress) {
            req.payload.logger.error(
              "SES_FROM_ADDRESS environment variable is not set. Cannot send emails.",
            );
            return doc;
          }

          // --- Send Email to Sender ---
          if (senderEmail && !doc.senderEmailSent) {
            try {
              const senderParams = {
                Source: fromAddress, // Your verified sender email
                Destination: {
                  ToAddresses: [senderEmail],
                },
                Message: {
                  Subject: {
                    Charset: "UTF-8",
                    Data: `Confirmation of Your ${doc.type} Submission`, // Subject for sender
                  },
                  Body: {
                    Html: {
                      Charset: "UTF-8",
                      Data: generateSenderEmailHtml(doc), // Use sender's HTML template
                    },
                    Text: {
                      Charset: "UTF-8",
                      Data: generateSenderEmailText(doc), // Use sender's plain text template
                    },
                  },
                },
              };
              const senderCommand = new SendEmailCommand(senderParams);
              await sesClient.send(senderCommand); // Use sesClient directly
              req.payload.logger.info(
                `Confirmation email sent to ${senderEmail} for feedback ID: ${doc.id}`,
              );

              // Update the document to mark sender email as sent
              await req.payload.update({
                collection: "feedback",
                id: doc.id,
                data: { senderEmailSent: true },
              });
            } catch (error: any) {
              req.payload.logger.error(
                `Error sending confirmation email to ${senderEmail}: ${error.message}`,
              );
            }
          }

          // --- Send Email to Receiver (Admin) ---
          // Fetch all admin users to send notification
          let receiverEmails: string[] = [];
          try {
            const adminUsers = await req.payload.find({
              collection: "users",
              where: {
                role: {
                  equals: "admin", // Adjust this 'role' field and 'admin' value to match your user collection's admin role
                },
              },
              limit: 100, // Set a reasonable limit for admin users
            });

            if (adminUsers.docs.length === 0) {
              req.payload.logger.warn(
                "No admin users found to send receiver email notification.",
              );
            } else {
              receiverEmails = adminUsers.docs
                .map((user) => user.email)
                .filter((email): email is string => typeof email === "string"); // Filter out any undefined emails
            }
          } catch (error: any) {
            req.payload.logger.error(
              `Error fetching admin users for email notification: ${error.message}`,
            );
          }

          if (receiverEmails.length > 0 && !doc.receiverEmailSent) {
            try {
              const receiverParams = {
                Source: fromAddress, // Your verified sender email
                Destination: {
                  ToAddresses: receiverEmails, // Send to all fetched admin emails
                },
                Message: {
                  Subject: {
                    Charset: "UTF-8",
                    Data: `New ${doc.type} Submission Received (ID: ${doc.id})`, // Subject for receiver
                  },
                  Body: {
                    Html: {
                      Charset: "UTF-8",
                      Data: generateReceiverEmailHtml(doc), // Use receiver's HTML template
                    },
                    Text: {
                      Charset: "UTF-8",
                      Data: generateReceiverEmailText(doc), // Use receiver's plain text template
                    },
                  },
                },
              };
              const receiverCommand = new SendEmailCommand(receiverParams);
              await sesClient.send(receiverCommand); // Use sesClient directly
              req.payload.logger.info(
                `Notification email sent to admins (${receiverEmails.join(", ")}) for feedback ID: ${doc.id}`,
              );

              // Update the document to mark receiver email as sent
              await req.payload.update({
                collection: "feedback",
                id: doc.id,
                data: { receiverEmailSent: true },
              });
            } catch (error: any) {
              req.payload.logger.error(
                `Error sending notification email to admins (${receiverEmails.join(", ")}): ${error.message}`,
              );
            }
          } else if (!doc.receiverEmailSent) {
            req.payload.logger.warn(
              "No valid receiver emails available to send notification.",
            );
          }
        }
        return doc; // Return the document (potentially updated with emailSent flags)
      },
    ],
  },
};
