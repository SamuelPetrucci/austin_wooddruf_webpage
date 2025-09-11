# Email Configuration Setup

To enable email functionality for the quote form, you'll need to set up the following environment variables:

## Required Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=your-email@gmail.com

# Site Owner Email
SITE_OWNER_EMAIL=jordan@jordanhealthsolutions.com

# Next.js Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Gmail Setup Instructions

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
   - Use this password in `SMTP_PASS`

## Alternative Email Providers

### Outlook/Hotmail
```bash
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
```

### Yahoo
```bash
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
```

### Custom SMTP
```bash
SMTP_HOST=your-smtp-server.com
SMTP_PORT=587
SMTP_USER=your-username
SMTP_PASS=your-password
```

## Testing

Once configured, the form will:
1. Send a detailed email to the site owner with all form data
2. Send a confirmation email to the customer
3. Return success/error responses to the frontend

## Security Notes

- Never commit `.env.local` to version control
- Use app passwords instead of your main email password
- Consider using a dedicated email service like SendGrid for production

