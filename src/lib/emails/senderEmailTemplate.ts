import { Feedback } from "@/payload-types";

/**
 * Generates the HTML content for the email sent to the feedback sender.
 * In a real application, you might use a templating engine (e.g., EJS, Handlebars)
 * to load and render content from an actual .html file.
 *
 * @param feedbackData The data from the submitted feedback document.
 * @returns HTML string for the email body.
 */
export function generateSenderEmailHtml(feedbackData: Feedback): string {
  return `
    <html>
      <head>
        <style>
          body { font-family: sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
          h1 { color: #0056b3; }
          p { margin-bottom: 10px; }
          .footer { margin-top: 20px; font-size: 0.8em; color: #777; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Thank You for Your Feedback!</h1>
          <p>Dear ${feedbackData.name},</p>
          <p>We have successfully received your ${feedbackData.type} submission.</p>
          <p>We appreciate you taking the time to provide your input. We will review your message and get back to you if necessary.</p>
          <p><strong>Your Submission Details:</strong></p>
          <ul>
            <li><strong>Type:</strong> ${feedbackData.type}</li>
            <li><strong>Subject:</strong> ${feedbackData.message.substring(0, 50)}...</li>
            <li><strong>Submitted On:</strong> ${new Date(feedbackData.createdAt).toLocaleDateString()}</li>
          </ul>
          <p>If you have any further questions, please do not hesitate to contact us.</p>
          <div class="footer">
            <p>This is an automated email, please do not reply.</p>
            <p>&copy; ${new Date().getFullYear()} Your Organization Name</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

/**
 * Generates the plain text content for the email sent to the feedback sender.
 *
 * @param feedbackData The data from the submitted feedback document.
 * @returns Plain text string for the email body.
 */
export function generateSenderEmailText(feedbackData: Feedback): string {
  return `
Thank You for Your Feedback!

Dear ${feedbackData.name},

We have successfully received your ${feedbackData.type} submission.

We appreciate you taking the time to provide your input. We will review your message and get back to you if necessary.

Your Submission Details:
- Type: ${feedbackData.type}
- Subject: ${feedbackData.message.substring(0, 50)}...
- Submitted On: ${new Date(feedbackData.createdAt).toLocaleDateString()}

If you have any further questions, please do not hesitate to contact us.

---
This is an automated email, please do not reply.
© ${new Date().getFullYear()} KD-PORTAL
`;
}
