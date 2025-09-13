# JS Health Solutions Website

A professional insurance website for Jordan Smith's health insurance services, built with Next.js and featuring a comprehensive quote form with email notifications.

## Features

- **Responsive Design**: Modern, mobile-friendly interface
- **Quote Form**: Multi-step form for collecting customer information
- **Email Notifications**: Automated emails to both customer and business owner
- **Admin Dashboard**: Premium feature for managing submissions (Supabase)
- **Professional Branding**: Clean design with company logo and colors

## Tech Stack

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **Email**: Nodemailer with Gmail SMTP
- **Database**: Supabase (premium feature)
- **Deployment**: Vercel

## Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd jordan_smith_webpage
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file with the following variables:
   ```bash
   # Email Configuration (Required)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-gmail-app-password
   SITE_OWNER_EMAIL=insuredwithjordan@gmail.com

   # Next.js Configuration
   NEXT_PUBLIC_SITE_URL=http://localhost:3000

   # Premium Features (Optional - Supabase)
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Email Setup

### Gmail Configuration
1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
   - Use this password in `SMTP_PASS`

### Email Features
- **Customer Confirmation**: Automated thank you email with next steps
- **Owner Notification**: Detailed email with all customer information
- **Professional Design**: Branded emails with company logo

## Deployment

### Vercel Deployment
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add the environment variables in Vercel dashboard
4. Deploy

### Required Environment Variables for Vercel
```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=insuredwithjordan@gmail.com
SMTP_PASS=your-gmail-app-password
SITE_OWNER_EMAIL=insuredwithjordan@gmail.com
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── submit-quote/          # Form submission endpoint
│   ├── admin/                     # Admin dashboard
│   ├── quote/                     # Quote form page
│   └── page.tsx                   # Homepage
├── components/
│   ├── sections/                  # Page sections
│   └── ui/                        # Reusable UI components
└── lib/                          # Utility functions
```

## Features Overview

### Quote Form
- Multi-step form with validation
- Customer information collection
- Health and financial details
- Dependent information
- Referral tracking
- Privacy assurance

### Email System
- Professional email templates
- Branded design with company colors
- Anti-spam headers for better deliverability
- Confirmation and notification emails

### Admin Dashboard (Premium)
- Secure login system
- View all form submissions
- Detailed customer information
- Professional interface

## Contact

**Jordan Smith**  
Phone: (860) 941-7770  
Email: insuredwithjordan@gmail.com  
Service Area: Tampa, FL (Serving 30 States)

## License

© 2025 JS Health Solutions. All rights reserved.