import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';

interface QuoteFormData {
  // Step 1: Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Step 2: Location & Income
  zipCode: string;
  dateOfBirth: string;
  annualIncome: string;
  
  // Step 3: Health Status
  healthStatus: string;
  medications: string;
  
  // Step 4: Dependents
  dependents: Array<{
    name: string;
    relationship: string;
    dateOfBirth: string;
  }>;
  
  // Step 5: Budget & Coverage
  desiredBudget: string;
  coverageType: string;
  additionalInfo: string;
  
  // Step 6: Referral
  referredBy: boolean;
  referralName: string;
}

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 API Route called - submit-quote');
    
    const body = await request.text();
    console.log('📦 Raw request body:', body);
    
    let formData: QuoteFormData;
    try {
      formData = JSON.parse(body);
    } catch (parseError) {
      console.error('❌ JSON Parse Error:', parseError);
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }
    
    console.log('📝 Form submission received:', JSON.stringify(formData, null, 2));

    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'zipCode', 'dateOfBirth', 'annualIncome', 'healthStatus', 'desiredBudget', 'coverageType'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof QuoteFormData]);
    
    if (missingFields.length > 0) {
      console.error('❌ Missing required fields:', missingFields);
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Save to Supabase for premium demo (optional)
    try {
      await saveToSupabase(formData);
      console.log('✅ Form submission saved to Supabase');
    } catch (supabaseError) {
      console.error('❌ Error saving to Supabase:', supabaseError);
      // Continue with email notifications even if Supabase fails
    }

    // Send notification email to site owner
    await sendOwnerNotification(formData);

    // Send confirmation email to customer
    await sendCustomerConfirmation(formData);

    return NextResponse.json(
      { 
        message: 'Quote request submitted successfully',
        storage: 'Email Notifications (Base Service)'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('❌ Error submitting quote:', error);
    console.error('Error details:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { 
        error: 'Failed to submit quote request',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

async function saveToSupabase(formData: QuoteFormData) {
  // Only save to Supabase if configured (for premium demo)
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.log('⚠️  Supabase not configured - skipping database save');
    return;
  }

  // Create a service role client that bypasses RLS
  const serviceRoleClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  );

  const dependentsText = formData.dependents.length > 0 
    ? formData.dependents.map(dep => `${dep.name} (${dep.relationship}, DOB: ${dep.dateOfBirth})`).join('; ')
    : 'None';

  const submissionData = {
    first_name: formData.firstName,
    last_name: formData.lastName,
    email: formData.email,
    phone: formData.phone,
    zip_code: formData.zipCode,
    date_of_birth: formData.dateOfBirth,
    annual_income: formData.annualIncome,
    health_status: formData.healthStatus,
    medications: formData.medications || 'None',
    dependents: dependentsText,
    monthly_budget: formData.desiredBudget,
    coverage_type: formData.coverageType,
    additional_info: formData.additionalInfo || 'None',
    // referred_by: formData.referredBy || false,
    // referral_name: formData.referralName || '',
    status: 'new',
    source: 'Website Quote Form'
  };

  const { data: submission, error: dbError } = await serviceRoleClient
    .from('form_submissions')
    .insert([submissionData])
    .select()
    .single();

  if (dbError) {
    throw new Error(`Database error: ${dbError.message}`);
  }

  return submission;
}

async function sendOwnerNotification(formData: QuoteFormData) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('⚠️  SMTP not configured - skipping email notification');
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const dependentsText = formData.dependents.length > 0 
    ? formData.dependents.map(dep => `${dep.name} (${dep.relationship}, DOB: ${dep.dateOfBirth})`).join('\n')
    : 'None';

  const notificationHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Quote Request</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #2563eb, #7c3aed); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
        <h1 style="margin: 0; font-size: 28px;">🔔 New Quote Request</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">Jordan Health Solutions</p>
      </div>
      
      <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
        <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #2563eb;">
          <h2 style="color: #2563eb; margin: 0 0 15px 0;">Customer Information</h2>
          <p style="margin: 5px 0;"><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
          <p style="margin: 5px 0;"><strong>Email:</strong> ${formData.email}</p>
          <p style="margin: 5px 0;"><strong>Phone:</strong> ${formData.phone}</p>
          <p style="margin: 5px 0;"><strong>ZIP Code:</strong> ${formData.zipCode}</p>
          <p style="margin: 5px 0;"><strong>Date of Birth:</strong> ${formData.dateOfBirth}</p>
        </div>

        <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #16a34a;">
          <h2 style="color: #16a34a; margin: 0 0 15px 0;">Financial & Coverage Details</h2>
          <p style="margin: 5px 0;"><strong>Annual Income:</strong> ${formData.annualIncome}</p>
          <p style="margin: 5px 0;"><strong>Monthly Budget:</strong> ${formData.desiredBudget}</p>
          <p style="margin: 5px 0;"><strong>Coverage Type:</strong> ${formData.coverageType}</p>
        </div>

        <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #d97706;">
          <h2 style="color: #d97706; margin: 0 0 15px 0;">Health Information</h2>
          <p style="margin: 5px 0;"><strong>Health Status:</strong> ${formData.healthStatus}</p>
          <p style="margin: 5px 0;"><strong>Current Medications:</strong> ${formData.medications || 'None listed'}</p>
        </div>

        <div style="background: #f3e8ff; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #7c3aed;">
          <h2 style="color: #7c3aed; margin: 0 0 15px 0;">Dependents</h2>
          <p style="margin: 0; white-space: pre-line;">${dependentsText}</p>
        </div>

        ${formData.additionalInfo ? `
        <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #64748b;">
          <h2 style="color: #64748b; margin: 0 0 10px 0;">Additional Information</h2>
          <p style="margin: 0; white-space: pre-wrap;">${formData.additionalInfo}</p>
        </div>
      ` : ''}

      ${formData.referredBy ? `
        <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #d97706;">
          <h2 style="color: #d97706; margin: 0 0 10px 0;">Referral Information</h2>
          <p style="margin: 0;"><strong>Referred by:</strong> ${formData.referralName}</p>
        </div>
      ` : ''}

        <div style="background: #2563eb; color: white; padding: 20px; border-radius: 8px; text-align: center;">
          <h3 style="margin: 0 0 10px 0;">Next Steps</h3>
          <p style="margin: 0; opacity: 0.9;">Please contact this customer within 12 hours to provide their personalized quote.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const notificationText = `
New Quote Request - Jordan Health Solutions

CUSTOMER INFORMATION:
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}
ZIP Code: ${formData.zipCode}
Date of Birth: ${formData.dateOfBirth}

FINANCIAL & COVERAGE DETAILS:
Annual Income: ${formData.annualIncome}
Monthly Budget: ${formData.desiredBudget}
Coverage Type: ${formData.coverageType}

HEALTH INFORMATION:
Health Status: ${formData.healthStatus}
Current Medications: ${formData.medications || 'None listed'}

DEPENDENTS:
${dependentsText}

${formData.additionalInfo ? `ADDITIONAL INFORMATION:\n${formData.additionalInfo}\n` : ''}

${formData.referredBy ? `REFERRAL INFORMATION:\nReferred by: ${formData.referralName}\n` : ''}

Please contact this customer within 12 hours to provide their personalized quote.
  `;

  try {
    await transporter.sendMail({
      from: {
        name: 'JS Health Solutions',
        address: process.env.SITE_OWNER_EMAIL || 'insuredwithjordan@gmail.com'
      },
      to: process.env.SITE_OWNER_EMAIL || 'insuredwithjordan@gmail.com',
      subject: `🔔 New Quote Request - ${formData.firstName} ${formData.lastName} - JS Health Solutions`,
      html: notificationHtml,
      text: notificationText,
      // Add proper email headers to prevent spam
      headers: {
        'Reply-To': process.env.SITE_OWNER_EMAIL || 'insuredwithjordan@gmail.com',
        'Return-Path': process.env.SITE_OWNER_EMAIL || 'insuredwithjordan@gmail.com',
        'Message-ID': `<${Date.now()}-${Math.random().toString(36).substr(2, 9)}@jordanhealthsolutions.com>`
      }
    });
    console.log('✅ Owner notification sent');
  } catch (emailError) {
    console.error('❌ Failed to send owner notification:', emailError);
  }
}

async function sendCustomerConfirmation(formData: QuoteFormData) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const confirmationHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Thank you for your quote request</title>
    </head>
    <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
      <div style="background: linear-gradient(135deg, #1e40af, #3b82f6); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; position: relative;">
        <div style="margin-bottom: 20px;">
          <img src="https://jordanhealthsolutions.com/logo.png" alt="JS Health Solutions" style="max-height: 60px; width: auto; filter: brightness(0) invert(1);">
        </div>
        <h1 style="margin: 0; font-size: 28px; font-weight: 600;">Thank You!</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">JS Health Solutions</p>
      </div>
      
      <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
        <p style="font-size: 18px; margin-bottom: 20px; color: #1e40af; font-weight: 600;">Dear ${formData.firstName},</p>
        
        <p style="font-size: 16px; margin-bottom: 20px; color: #374151;">Thank you for your interest in our insurance services! We have received your quote request and are excited to help you find the perfect coverage for your needs.</p>
        
        <div style="background: linear-gradient(135deg, #eff6ff, #dbeafe); padding: 25px; border-radius: 12px; margin: 25px 0; border-left: 5px solid #3b82f6; box-shadow: 0 2px 4px rgba(59, 130, 246, 0.1);">
          <h3 style="color: #1e40af; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">What happens next?</h3>
          <ul style="margin: 0; padding-left: 20px; color: #374151;">
            <li style="margin-bottom: 10px; font-size: 15px;">Our insurance expert will review your information</li>
            <li style="margin-bottom: 10px; font-size: 15px;">We'll research the best coverage options for your situation</li>
            <li style="margin-bottom: 10px; font-size: 15px;">You'll receive a personalized quote within 12 hours</li>
            <li style="font-size: 15px;">We'll schedule a consultation to discuss your options</li>
          </ul>
        </div>
        
        <p style="color: #374151; margin-bottom: 15px;">If you have any questions in the meantime, please don't hesitate to contact us:</p>
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e2e8f0;">
          <p style="margin: 5px 0; color: #374151;"><strong style="color: #1e40af;">📞 Phone:</strong> <a href="tel:+18609417770" style="color: #3b82f6; text-decoration: none;">(860) 941-7770</a></p>
          <p style="margin: 5px 0; color: #374151;"><strong style="color: #1e40af;">✉️ Email:</strong> <a href="mailto:insuredwithjordan@gmail.com" style="color: #3b82f6; text-decoration: none;">insuredwithjordan@gmail.com</a></p>
        </div>
        
        <p style="color: #374151; font-size: 16px; margin-bottom: 25px;">We look forward to helping you protect what matters most!</p>
        
        <div style="background: linear-gradient(135deg, #1e40af, #3b82f6); color: white; padding: 25px; border-radius: 12px; text-align: center; margin-top: 30px; box-shadow: 0 4px 6px rgba(30, 64, 175, 0.2);">
          <p style="margin: 0; font-weight: 600; font-size: 18px;">Jordan Smith</p>
          <p style="margin: 8px 0 0 0; opacity: 0.9; font-size: 15px;">Licensed Insurance Professional</p>
          <p style="margin: 5px 0 0 0; opacity: 0.9; font-size: 15px;">JS Health Solutions</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: {
        name: 'JS Health Solutions',
        address: process.env.SITE_OWNER_EMAIL || 'insuredwithjordan@gmail.com'
      },
      to: formData.email,
      subject: 'Thank you for your insurance quote request - JS Health Solutions',
      html: confirmationHtml,
      // Add proper email headers to prevent spam
      headers: {
        'Reply-To': process.env.SITE_OWNER_EMAIL || 'insuredwithjordan@gmail.com',
        'Return-Path': process.env.SITE_OWNER_EMAIL || 'insuredwithjordan@gmail.com',
        'Message-ID': `<${Date.now()}-${Math.random().toString(36).substr(2, 9)}@jordanhealthsolutions.com>`
      }
    });
    console.log(`✅ Confirmation email sent to ${formData.email}`);
  } catch (emailError) {
    console.error(`❌ Failed to send confirmation email:`, emailError);
  }
}