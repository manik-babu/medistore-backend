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

const sendMail = async (user: any, url: string, token: string) => {
  const verificationLink = `${process.env.FRONTEND_URL}?token=${token}`;

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


export default sendMail;

