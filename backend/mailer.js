import { createTransport } from "nodemailer";

const transporter = createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.PASSWORD,
  },
});

export default async function mailer(htmlContent, recipients) {
  const info = await transporter.sendMail({
    from: '"Job Notifications" udaydivyaclinic@gmail.com', // Sender address
    bcc: recipients, // Add recipients in the BCC field
    subject: "New Job Opportunity!", // Subject line
    text: "A new job opportunity is available!", // Fallback plain text
    html: htmlContent, // Rendered HTML body
  });

  return info;
}
