import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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
    id: string;
    firstName: string;
    lastName: string;
    relationship: string;
    dateOfBirth: string;
    healthStatus: string;
    medications: string;
  }>;
  
  // Step 5: Budget
  desiredBudget: string;
  additionalInfo: string;
}

export async function POST(request: NextRequest) {
  try {
    const formData: QuoteFormData = await request.json();

    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'zipCode', 'dateOfBirth', 'annualIncome', 'healthStatus', 'desiredBudget'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof QuoteFormData]);
    
    if (missingFields.length > 0) {
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

    // Create email transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Create email content
    const emailHtml = createEmailTemplate(formData);
    const emailText = createEmailText(formData);

    // Send email to site owner
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.SITE_OWNER_EMAIL || 'jordan@jordanhealthsolutions.com',
      subject: `New Insurance Quote Request - ${formData.firstName} ${formData.lastName}`,
      html: emailHtml,
      text: emailText,
    });

    // Send confirmation email to customer
    const confirmationHtml = createConfirmationTemplate(formData);
    const confirmationText = createConfirmationText(formData);

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: formData.email,
      subject: 'Thank you for your insurance quote request - Jordan Health Solutions',
      html: confirmationHtml,
      text: confirmationText,
    });

    return NextResponse.json(
      { message: 'Quote request submitted successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error submitting quote:', error);
    return NextResponse.json(
      { error: 'Failed to submit quote request' },
      { status: 500 }
    );
  }
}

function createEmailTemplate(data: QuoteFormData): string {
  const dependentsHtml = data.dependents.length > 0 
    ? data.dependents.map((dep, index) => `
        <div style="margin-bottom: 20px; padding: 15px; background-color: #f8f9fa; border-radius: 8px;">
          <h4 style="color: #2563eb; margin-bottom: 10px;">Dependent ${index + 1}</h4>
          <p><strong>Name:</strong> ${dep.firstName} ${dep.lastName}</p>
          <p><strong>Relationship:</strong> ${dep.relationship}</p>
          <p><strong>Date of Birth:</strong> ${dep.dateOfBirth}</p>
          <p><strong>Health Status:</strong> ${dep.healthStatus}</p>
          <p><strong>Medications:</strong> ${dep.medications || 'None listed'}</p>
        </div>
      `).join('')
    : '<p>No dependents listed</p>';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Insurance Quote Request</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #2563eb, #7c3aed); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
        <h1 style="margin: 0; font-size: 28px;">New Insurance Quote Request</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">Jordan Health Solutions</p>
      </div>
      
      <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
        <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #2563eb;">
          <h2 style="color: #2563eb; margin: 0 0 10px 0;">Customer Information</h2>
          <p style="margin: 5px 0;"><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
          <p style="margin: 5px 0;"><strong>Email:</strong> ${data.email}</p>
          <p style="margin: 5px 0;"><strong>Phone:</strong> ${data.phone}</p>
          <p style="margin: 5px 0;"><strong>ZIP Code:</strong> ${data.zipCode}</p>
        </div>

        <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #16a34a;">
          <h2 style="color: #16a34a; margin: 0 0 10px 0;">Financial & Personal Details</h2>
          <p style="margin: 5px 0;"><strong>Date of Birth:</strong> ${data.dateOfBirth}</p>
          <p style="margin: 5px 0;"><strong>Annual Income:</strong> ${data.annualIncome}</p>
          <p style="margin: 5px 0;"><strong>Desired Budget:</strong> ${data.desiredBudget}</p>
        </div>

        <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #d97706;">
          <h2 style="color: #d97706; margin: 0 0 10px 0;">Health Information</h2>
          <p style="margin: 5px 0;"><strong>Health Status:</strong> ${data.healthStatus}</p>
          <p style="margin: 5px 0;"><strong>Current Medications:</strong> ${data.medications || 'None listed'}</p>
        </div>

        <div style="background: #f3e8ff; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #7c3aed;">
          <h2 style="color: #7c3aed; margin: 0 0 15px 0;">Dependents</h2>
          ${dependentsHtml}
        </div>

        ${data.additionalInfo ? `
          <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #64748b;">
            <h2 style="color: #64748b; margin: 0 0 10px 0;">Additional Information</h2>
            <p style="margin: 0; white-space: pre-wrap;">${data.additionalInfo}</p>
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
}

function createEmailText(data: QuoteFormData): string {
  const dependentsText = data.dependents.length > 0 
    ? data.dependents.map((dep, index) => `
Dependent ${index + 1}:
- Name: ${dep.firstName} ${dep.lastName}
- Relationship: ${dep.relationship}
- Date of Birth: ${dep.dateOfBirth}
- Health Status: ${dep.healthStatus}
- Medications: ${dep.medications || 'None listed'}
`).join('\n')
    : 'No dependents listed';

  return `
New Insurance Quote Request - Jordan Health Solutions

CUSTOMER INFORMATION:
Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Phone: ${data.phone}
ZIP Code: ${data.zipCode}

FINANCIAL & PERSONAL DETAILS:
Date of Birth: ${data.dateOfBirth}
Annual Income: ${data.annualIncome}
Desired Budget: ${data.desiredBudget}

HEALTH INFORMATION:
Health Status: ${data.healthStatus}
Current Medications: ${data.medications || 'None listed'}

DEPENDENTS:
${dependentsText}

${data.additionalInfo ? `ADDITIONAL INFORMATION:\n${data.additionalInfo}\n` : ''}

Please contact this customer within 12 hours to provide their personalized quote.
  `;
}

function createConfirmationTemplate(data: QuoteFormData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Thank you for your quote request</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #2563eb, #7c3aed); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
        <h1 style="margin: 0; font-size: 28px;">Thank You!</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">Jordan Health Solutions</p>
      </div>
      
      <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
        <p style="font-size: 18px; margin-bottom: 20px;">Dear ${data.firstName},</p>
        
        <p>Thank you for your interest in our insurance services! We have received your quote request and are excited to help you find the perfect coverage for your needs.</p>
        
        <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #2563eb;">
          <h3 style="color: #2563eb; margin: 0 0 15px 0;">What happens next?</h3>
          <ul style="margin: 0; padding-left: 20px;">
            <li style="margin-bottom: 8px;">Our insurance expert will review your information</li>
            <li style="margin-bottom: 8px;">We'll research the best coverage options for your situation</li>
            <li style="margin-bottom: 8px;">You'll receive a personalized quote within 12 hours</li>
            <li>We'll schedule a consultation to discuss your options</li>
          </ul>
        </div>
        
        <p>If you have any questions in the meantime, please don't hesitate to contact us:</p>
        <ul style="margin: 20px 0;">
          <li><strong>Phone:</strong> (860) 941-7770</li>
          <li><strong>Email:</strong> jordan@jordanhealthsolutions.com</li>
        </ul>
        
        <p>We look forward to helping you protect what matters most!</p>
        
        <div style="background: #2563eb; color: white; padding: 20px; border-radius: 8px; text-align: center; margin-top: 30px;">
          <p style="margin: 0; font-weight: bold;">Jordan Smith</p>
          <p style="margin: 5px 0 0 0; opacity: 0.9;">Insurance Professional</p>
          <p style="margin: 5px 0 0 0; opacity: 0.9;">Jordan Health Solutions</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function createConfirmationText(data: QuoteFormData): string {
  return `
Thank you for your insurance quote request!

Dear ${data.firstName},

Thank you for your interest in our insurance services! We have received your quote request and are excited to help you find the perfect coverage for your needs.

What happens next?
- Our insurance expert will review your information
- We'll research the best coverage options for your situation  
- You'll receive a personalized quote within 12 hours
- We'll schedule a consultation to discuss your options

If you have any questions in the meantime, please don't hesitate to contact us:
- Phone: (860) 941-7770
- Email: jordan@jordanhealthsolutions.com

We look forward to helping you protect what matters most!

Jordan Smith
Insurance Professional
Jordan Health Solutions
  `;
}

