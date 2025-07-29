import { Feedback } from "@/payload-types"; // Assuming payload-types.ts is generated

/**
 * Generates the HTML content for the email sent to the receiver (admin).
 *
 * @param feedbackData The data from the submitted feedback document.
 * @returns HTML string for the email body.
 */
export function generateReceiverEmailHtml(feedbackData: Feedback): string {
  return `
    <html>
      <head>
        <style>
          body { font-family: sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 700px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9; }
          h1 { color: #d9534f; }
          ul { list-style-type: none; padding: 0; }
          li { margin-bottom: 8px; }
          strong { color: #555; }
          .footer { margin-top: 20px; font-size: 0.8em; color: #777; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>New Feedback Submission!</h1>
          <p>A new ${feedbackData.type} has been submitted through the website.</p>
          <p><strong>Submission Details:</strong></p>
          <ul>
            <li><strong>Type:</strong> ${feedbackData.type}</li>
            <li><strong>Name:</strong> ${feedbackData.name}</li>
            <li><strong>IC Number:</strong> ${feedbackData.ic_number}</li>
            <li><strong>Email:</strong> ${feedbackData.email}</li>
            <li><strong>Phone:</strong> ${feedbackData.phone_country_code}${feedbackData.phone}</li>
            <li><strong>Agency:</strong> ${feedbackData.agency}</li>
            <li><strong>Address:</strong> ${feedbackData.address}</li>
            <li><strong>Message:</strong><br/>${feedbackData.message.replace(/\n/g, "<br/>")}</li>
            <li><strong>Submitted On:</strong> ${new Date(feedbackData.createdAt).toLocaleString()}</li>
          </ul>
          <p>Please review this submission in the Payload CMS admin panel.</p>
          <div class="footer">
            <p>Payload CMS Notification System</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

/**
 * Generates the plain text content for the email sent to the receiver (admin).
 *
 * @param feedbackData The data from the submitted feedback document.
 * @returns Plain text string for the email body.
 */
export function generateReceiverEmailText(feedbackData: Feedback): string {
  return `
New Feedback Submission!

A new ${feedbackData.type} has been submitted through the website.

Submission Details:
- Type: ${feedbackData.type}
- Name: ${feedbackData.name}
- IC Number: ${feedbackData.ic_number}
- Email: ${feedbackData.email}
- Phone: ${feedbackData.phone_country_code}${feedbackData.phone}
- Agency: ${feedbackData.agency}
- Address: ${feedbackData.address}
- Message:
  ${feedbackData.message}
- Submitted On: ${new Date(feedbackData.createdAt).toLocaleString()}

Please review this submission in the Payload CMS admin panel.

---
Payload CMS Notification System
`;
}
