import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { to, subject, text } = await request.json();

    // For testing, we'll just log the email content
    console.log('=== EMAIL TEST ===');
    console.log('To:', to);
    console.log('Subject:', subject);
    console.log('Body:', text);
    console.log('==================');

    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json(
      { 
        message: 'Test email logged to console successfully!',
        emailData: { to, subject, text }
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error('Test email error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process test email' },
      { status: 500 }
    );
  }
}


