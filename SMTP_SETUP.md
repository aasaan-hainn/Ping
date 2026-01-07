# SMTP Email Configuration Guide

## Overview
Ping uses email verification for new user registrations. This guide explains how to configure SMTP email sending for both development and production environments.

## Development Mode

In development (`NODE_ENV=development`), the application has a **fallback mechanism**:
- If email sending fails, users are **automatically verified** to avoid blocking development
- OTP codes are logged to the console for testing the full verification flow
- You can choose to configure SMTP or rely on the auto-verify fallback

## Production Mode

In production (`NODE_ENV=production`), **SMTP must be configured** for email verification to work. Users cannot register without valid email delivery.

---

## Gmail SMTP Setup (Recommended for Testing)

Gmail is free and easy to set up for testing purposes.

### Prerequisites
- A Gmail account
- Two-Factor Authentication (2FA) enabled

### Steps

1. **Enable 2-Factor Authentication**
   - Go to https://myaccount.google.com/security
   - Enable 2-Step Verification

2. **Generate App Password**
   - Visit https://myaccount.google.com/apppasswords
   - Select "Mail" and your device
   - Click "Generate"
   - Copy the 16-character password (format: `xxxx xxxx xxxx xxxx`)

3. **Configure Environment Variables**
   Add these to your `server/.env` file:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_EMAIL=your.email@gmail.com
   SMTP_PASSWORD=your-16-char-app-password
   EMAIL_FROM=Ping Team <your.email@gmail.com>
   ```

4. **Important Notes**
   - Use the **App Password**, NOT your regular Gmail password
   - Remove spaces from the app password
   - Gmail has a sending limit of 500 emails/day for free accounts

---

## Alternative SMTP Providers

### SendGrid (Free Tier: 100 emails/day)

1. Sign up at https://sendgrid.com
2. Create an API key
3. Configure:
   ```env
   SMTP_HOST=smtp.sendgrid.net
   SMTP_PORT=587
   SMTP_EMAIL=apikey
   SMTP_PASSWORD=your-sendgrid-api-key
   EMAIL_FROM=Ping Team <verified-sender@yourdomain.com>
   ```

### Mailgun (Free Tier: 5,000 emails/month)

1. Sign up at https://mailgun.com
2. Verify your domain or use sandbox domain for testing
3. Get SMTP credentials from dashboard
4. Configure:
   ```env
   SMTP_HOST=smtp.mailgun.org
   SMTP_PORT=587
   SMTP_EMAIL=postmaster@your-sandbox.mailgun.org
   SMTP_PASSWORD=your-mailgun-password
   EMAIL_FROM=Ping Team <postmaster@your-sandbox.mailgun.org>
   ```

### AWS SES (Pay-as-you-go: $0.10 per 1,000 emails)

1. Set up AWS SES in your region
2. Verify your sender email or domain
3. Create SMTP credentials in SES console
4. Configure:
   ```env
   SMTP_HOST=email-smtp.us-east-1.amazonaws.com
   SMTP_PORT=587
   SMTP_EMAIL=your-aws-smtp-username
   SMTP_PASSWORD=your-aws-smtp-password
   EMAIL_FROM=Ping Team <verified@yourdomain.com>
   ```

---

## Testing Email Configuration

### Method 1: Registration Test
1. Start your server with `npm run dev` or `nodemon server.js`
2. Register a new user with a real email address
3. Check the server console for success or error messages
4. Check your email inbox for the verification code

### Method 2: Console Verification
If email sending fails in development, check the console output:
```
🔓 Development Mode: Auto-verifying user due to email failure
================================================================
EMAIL SERVICE ALERT (Dev Mode / Failure Fallback)
To: user@example.com
Subject: Ping - Verify your email
----------------------------------------------------------------
>>> OTP CODE: 123456 <<<
----------------------------------------------------------------
```

---

## Troubleshooting

### Error: "Connection timeout"
**Possible causes:**
- SMTP credentials are incorrect
- Firewall blocking port 587 or 465
- SMTP_HOST is wrong

**Solutions:**
- Verify all SMTP environment variables are set correctly
- Try port 465 with `secure: true` (Gmail supports both)
- Check if your hosting provider blocks SMTP ports

### Error: "Authentication failed"
**Possible causes:**
- Using regular password instead of App Password (Gmail)
- 2FA not enabled (Gmail)
- Incorrect credentials

**Solutions:**
- Regenerate App Password from Google
- Double-check email and password have no extra spaces
- Verify the email account exists

### Error: "Failed to send verification email"
**In Production:**
- Check server logs for detailed SMTP configuration diagnostics
- Verify all environment variables are set on your hosting platform

**In Development:**
- User will be auto-verified (check console for OTP)
- You can still test the full flow by configuring SMTP

### Emails going to spam
**Solutions:**
- Use a verified domain with SPF/DKIM records
- Use a dedicated email service (SendGrid, Mailgun, SES)
- Avoid spammy subject lines and content

---

## Environment Variables Reference

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `SMTP_HOST` | Yes* | `smtp.gmail.com` | SMTP server hostname |
| `SMTP_PORT` | Yes* | `587` | SMTP port (587 for TLS, 465 for SSL) |
| `SMTP_EMAIL` | Yes* | - | Sender email or username |
| `SMTP_PASSWORD` | Yes* | - | SMTP password or API key |
| `EMAIL_FROM` | No | Uses `SMTP_EMAIL` | Display name and email for "From" field |
| `NODE_ENV` | Yes | `development` | Set to `production` for deployed environments |

*Required in production. Optional in development (will auto-verify if not configured).

---

## Security Best Practices

1. **Never commit `.env` files** to version control
2. **Use App Passwords** instead of account passwords
3. **Rotate credentials** regularly in production
4. **Use environment-specific configs** (different credentials for dev/staging/prod)
5. **Monitor email sending** to detect abuse or issues early
6. **Set rate limits** to prevent spam (implement in future)

---

## Production Deployment Checklist

- [ ] Set `NODE_ENV=production` in environment variables
- [ ] Configure all SMTP credentials in hosting platform (Render, Heroku, etc.)
- [ ] Test email sending with a real email address
- [ ] Verify emails are not going to spam
- [ ] Set up email monitoring/alerts for failures
- [ ] Consider using a dedicated email service (not Gmail) for reliability
- [ ] Add rate limiting to prevent abuse

---

## Support

If you continue to experience issues:
1. Check server console for detailed error messages and SMTP diagnostics
2. Verify your SMTP provider's documentation
3. Test SMTP credentials with a tool like https://www.smtper.net/
4. Review firewall and network settings on your hosting platform
