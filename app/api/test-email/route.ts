import { NextResponse } from 'next/server';
import { sendEmail } from '../../lib/email';

/**
 * @route GET /api/test-email
 * @description Test route to verify email configuration
 */
export async function GET() {
  try {
    const sent = await sendEmail({
      to: process.env.EMAIL_USER || 'test@example.com', // Send to ourselves for testing
      subject: 'Test Email from Elvix',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #4CAF50;">Elvix Email Test Successful!</h1>
          <p>This is a test email to verify your email configuration works correctly.</p>
          <p>Your email settings:</p>
          <ul>
            <li><strong>SERVER:</strong> ${process.env.EMAIL_SERVER}</li>
            <li><strong>PORT:</strong> ${process.env.EMAIL_PORT}</li>
            <li><strong>USER:</strong> ${process.env.EMAIL_USER}</li>
            <li><strong>FROM:</strong> ${process.env.EMAIL_FROM}</li>
          </ul>
          <p>If you received this email, your configuration is working correctly.</p>
          <p>Time sent: ${new Date().toLocaleString()}</p>
        </div>
      `,
    });

    return NextResponse.json({
      success: sent,
      message: sent 
        ? 'Test email sent successfully. Check your inbox.' 
        : 'Failed to send test email. Check server logs for details.',
    });
  } catch (error) {
    console.error('Error sending test email:', error);
    return NextResponse.json(
      { error: 'Failed to send test email' },
      { status: 500 }
    );
  }
}
