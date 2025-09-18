# Austin Woodruff Insurance - Environment Variables Setup

## Required Environment Variables

Create a `.env.local` file in your project root with the following variables:

### 📧 Email Configuration (REQUIRED)
```bash
# Gmail SMTP settings for sending emails
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=austinryanwoodruff@gmail.com
SMTP_PASS=your-gmail-app-password-here
SITE_OWNER_EMAIL=austinryanwoodruff@gmail.com
```

### 🌐 Next.js Configuration
```bash
# Your website URL (update when deployed)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 🗄️ Supabase Configuration (OPTIONAL - for admin dashboard)
```bash
# Get these from your Supabase project settings
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
```

## 🔧 Setup Instructions

### 1. Email Setup (Gmail App Password)
1. **Enable 2-Factor Authentication** on your Gmail account
2. **Go to Google Account settings** → Security → 2-Step Verification
3. **Click "App passwords"**
4. **Generate a password** for "Mail"
5. **Use this 16-character password** in `SMTP_PASS`

### 2. Supabase Setup (Optional - for admin dashboard)
1. **Create a free account** at [supabase.com](https://supabase.com)
2. **Create a new project**
3. **Go to Settings → API** to get your keys
4. **Run the SQL script**: Copy and paste `austin_woodruff_database_setup.sql` into the SQL editor
5. **Add the keys** to your environment variables

### 3. Database Table Setup
Run this SQL in your Supabase SQL editor:
```sql
-- The complete script is in austin_woodruff_database_setup.sql
-- This creates the austin_woodruff_submissions table with referral columns
```

### 4. Deployment Setup
When deploying to Vercel, Netlify, or other platforms:
1. **Add all environment variables** in your hosting platform's dashboard
2. **Update NEXT_PUBLIC_SITE_URL** to your actual domain
3. **Redeploy** your application

## 📋 Complete .env.local File Example

```bash
# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=austinryanwoodruff@gmail.com
SMTP_PASS=abcd-efgh-ijkl-mnop
SITE_OWNER_EMAIL=austinryanwoodruff@gmail.com

# Next.js Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Supabase Configuration (Optional)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

## ✅ Testing Your Setup

1. **Start the development server**: `npm run dev`
2. **Test the quote form** at `http://localhost:3000/quote`
3. **Check that emails are sent** to both you and the customer
4. **Verify the database** (if using Supabase) shows the new submission

## 🚨 Important Notes

- **SMTP_PASS** should be your Gmail App Password, NOT your regular Gmail password
- **Never commit** your `.env.local` file to version control
- **All variables are required** for the email system to work
- **Supabase variables are optional** - the website works without them (emails only)

## 📞 Contact Information

**Austin Woodruff**  
Phone: (727) 248-2108  
Email: austinryanwoodruff@gmail.com  
Service Area: Available Nationwide
