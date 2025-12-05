import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_PORT === '465',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})

interface SendEmailOptions {
  to: string
  subject: string
  text: string
  html: string
}

export async function sendEmail(options: SendEmailOptions): Promise<void> {
  await transporter.sendMail({
    from: process.env.SMTP_FROM || 'noreply@kwekerijtoffeperen.nl',
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html
  })
}

export async function sendMagicLinkEmail(email: string, token: string): Promise<void> {
  const siteUrl = process.env.SITE_URL || 'http://localhost:3000'
  const verifyUrl = `${siteUrl}/api/auth/verify?token=${token}`

  const subject = 'Inloggen bij Toffe Peren Admin'

  const text = `
Hoi!

Klik op de onderstaande link om in te loggen bij de Toffe Peren admin:

${verifyUrl}

Deze link is 15 minuten geldig.

Heb je niet geprobeerd in te loggen? Dan kun je deze email negeren.

Groetjes,
Kwekerij Toffe Peren
  `.trim()

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 500px; margin: 0 auto; padding: 20px; }
    .button { display: inline-block; padding: 12px 24px; background-color: #4a7c59; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; }
    .button:hover { background-color: #3d6a4a; }
    .footer { margin-top: 30px; font-size: 14px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <h2>Inloggen bij Toffe Peren Admin</h2>
    <p>Hoi!</p>
    <p>Klik op de onderstaande knop om in te loggen:</p>
    <a href="${verifyUrl}" class="button">Inloggen</a>
    <p>Of kopieer deze link naar je browser:</p>
    <p style="word-break: break-all; font-size: 14px; color: #666;">${verifyUrl}</p>
    <p><strong>Deze link is 15 minuten geldig.</strong></p>
    <div class="footer">
      <p>Heb je niet geprobeerd in te loggen? Dan kun je deze email negeren.</p>
      <p>Groetjes,<br>Kwekerij Toffe Peren</p>
    </div>
  </div>
</body>
</html>
  `.trim()

  await sendEmail({
    to: email,
    subject,
    text,
    html
  })
}
