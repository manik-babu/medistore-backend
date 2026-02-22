import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.APP_USER,
    pass: process.env.APP_PASS
  },
});

const verifyEmail = async (user: any, url: string, token: string) => {
  const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
  // const verificationLink = url;

  const info = await transporter.sendMail({
    from: '"MediStore" <MediStore@MediStore.com>',
    to: user.email,
    subject: "Verify your email - MediStore",
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
</head>
<body style="margin:0;padding:0;background:#f4f6f8;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 0;">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:10px;box-shadow:0 0 10px rgba(0,0,0,0.05);">
          
          <!-- Header -->
          <tr>
            <td style="padding:30px;text-align:center;background:#4f46e5;color:white;border-radius:10px 10px 0 0;">
              <h1 style="margin:0;">MediStore</h1>
              <p style="margin:5px 0 0;">Email Verification</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <h2 style="color:#111827;">Hello ${user.name || "User"} 👋</h2>
              <p style="color:#4b5563;font-size:16px;line-height:1.6;">
                Thank you for creating an account on <strong>MediStore</strong>.  
                Please confirm your email address by clicking the button below.
              </p>

              <div style="text-align:center;margin:40px 0;">
                <a href="${verificationLink}" 
                   style="background:#4f46e5;color:white;text-decoration:none;padding:15px 30px;border-radius:8px;font-size:16px;display:inline-block;">
                   Verify Email
                </a>
              </div>

              <p style="color:#6b7280;font-size:14px;">
                Or copy and paste this link into your browser:
              </p>

              <p style="word-break:break-all;color:#2563eb;">
                ${verificationLink}
              </p>

              <p style="margin-top:30px;color:#4b5563;font-size:14px;">
                If you didn’t create an account, you can safely ignore this email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px;text-align:center;background:#f9fafb;border-radius:0 0 10px 10px;color:#9ca3af;font-size:12px;">
              © ${new Date().getFullYear()} MediStore. All rights reserved.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`
  });

  console.log("Message sent: ", user.email);
};

const sellerOrder = async (name: string, phone: string, address: string, email: string) => {
  await transporter.sendMail({
    from: '"MediStore" <MediStore@MediStore.com>',
    to: email,
    subject: "🔔 New Order Received - Action Required",
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Order Notification</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f7fa;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
          
          <!-- Header -->
          <tr>
            <td style="padding: 32px 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">New Order Received</h1>
              <p style="margin: 8px 0 0 0; color: #e9d8fd; font-size: 14px;">You have a new customer order to process</p>
            </td>
          </tr>

          <!-- Alert Banner -->
          <tr style="padding-top: 8px">
            <td style="padding: 0 40px;">
              <div style="margin-top: -16px; background-color: #10b981; color: #ffffff; padding: 12px 20px; border-radius: 6px; text-align: center; font-size: 14px; font-weight: 500;">
                ⚡ Immediate Action Required
              </div>
            </td>
          </tr>

          <!-- Customer Information -->
          <tr>
            <td style="padding: 32px 40px 24px 40px;">
              <h2 style="margin: 0 0 20px 0; color: #1f2937; font-size: 18px; font-weight: 600; border-bottom: 2px solid #e5e7eb; padding-bottom: 12px;">Customer Details</h2>
              
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6;">
                    <span style="color: #6b7280; font-size: 14px; display: inline-block; width: 100px;">Name:</span>
                    <span style="color: #111827; font-size: 14px; font-weight: 500;">${name}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6;">
                    <span style="color: #6b7280; font-size: 14px; display: inline-block; width: 100px;">Phone:</span>
                    <a href="tel:${phone}" style="color: #667eea; font-size: 14px; font-weight: 500; text-decoration: none;">${phone}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <span style="color: #6b7280; font-size: 14px; display: inline-block; width: 100px; vertical-align: top;">Address:</span>
                    <span style="color: #111827; font-size: 14px; font-weight: 500; display: inline-block; max-width: 380px; line-height: 1.6;">${address}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Action Items -->
          <tr>
            <td style="padding: 0 40px 32px 40px;">
              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px 20px; border-radius: 4px;">
                <p style="margin: 0; color: #92400e; font-size: 14px; font-weight: 500;">📋 Next Steps:</p>
                <ul style="margin: 8px 0 0 0; padding-left: 20px; color: #78350f; font-size: 13px; line-height: 1.8;">
                  <li>Review the order details in your admin panel</li>
                  <li>Verify product availability</li>
                  <li>Contact the customer to confirm delivery schedule</li>
                  <li>Process the order and update status</li>
                </ul>
              </div>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td align="center" style="padding: 0 40px 32px 40px;">
              <a href="https://medistore-max.vercel.app/seller/orders" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 6px; font-weight: 600; font-size: 15px; box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);">
                View Order Details
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #f9fafb; border-radius: 0 0 8px 8px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #6b7280; font-size: 12px; text-align: center; line-height: 1.6;">
                This is an automated notification from MediStore<br>
                © ${new Date().getFullYear()} MediStore. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `
  })
}


const mailSender = {
  verifyEmail,
  sellerOrder,
}
export default mailSender;

