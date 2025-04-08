import nodemailer from 'nodemailer';

interface OrderDetails {
  id: string;
  items: any[]; // Replace with your Order Item type
  total: number;
  customerEmail: string;
  customerName: string;
  paymentReference?: string;
  createdAt?: string;
}

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

// Create a transporter using environment variables or default to ethereal email for development
export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER || 'smtp.ethereal.email',
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASSWORD || '',
  },
});

/**
 * Send an email using the configured transporter
 */
export const sendEmail = async (options: EmailOptions): Promise<boolean> => {
  try {
    // If no email configuration is provided, log the email instead of sending it
    if (!process.env.EMAIL_USER) {
      console.log('Email would be sent in production:');
      console.log('To:', options.to);
      console.log('Subject:', options.subject);
      console.log('Content:', options.html);
      console.log('------------');
      return true;
    }

    const info = await transporter.sendMail({
      from: `"${process.env.EMAIL_FROM_NAME || 'Elvix'}" <${process.env.EMAIL_FROM || 'noreply@example.com'}>`,
      ...options,
    });

    console.log('Email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

/**
 * Send an order confirmation email to the customer
 */
export const sendOrderConfirmationEmail = async (order: OrderDetails): Promise<boolean> => {
  const { customerEmail, customerName, id, items, total, paymentReference } = order;
  
  // Format date in a user-friendly way
  const orderDate = order.createdAt 
    ? new Date(order.createdAt).toLocaleDateString('en-NG', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      })
    : new Date().toLocaleDateString('en-NG', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      });

  // Format currency in Naira
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', { 
      style: 'currency', 
      currency: 'NGN',
      minimumFractionDigits: 2 
    }).format(amount);
  };

  // Generate items HTML
  const itemsHtml = items
    .map(
      (item) => `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">${formatCurrency(item.price)}</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">${formatCurrency(item.price * item.quantity)}</td>
        </tr>
      `
    )
    .join('');

  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Order Confirmation</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #4CAF50; color: white; padding: 15px; text-align: center; }
        .content { padding: 20px; background-color: #f9f9f9; }
        .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #777; }
        table { width: 100%; border-collapse: collapse; }
        th { text-align: left; padding: 10px; border-bottom: 1px solid #ddd; background-color: #f2f2f2; }
        .total-row { font-weight: bold; background-color: #f2f2f2; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>Elvix - Order Confirmation</h2>
        </div>
        <div class="content">
          <p>Hello ${customerName},</p>
          <p>Thank you for your order. We're pleased to confirm that your order has been received and is being processed.</p>
          
          <h3>Order Details</h3>
          <p>
            <strong>Order ID:</strong> ${id}<br>
            <strong>Order Date:</strong> ${orderDate}<br>
            <strong>Payment Reference:</strong> ${paymentReference || 'N/A'}<br>
          </p>
          
          <h3>Order Summary</h3>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th style="text-align: center;">Quantity</th>
                <th style="text-align: right;">Unit Price</th>
                <th style="text-align: right;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
              <tr class="total-row">
                <td colspan="3" style="padding: 10px; text-align: right; font-weight: bold;">Total</td>
                <td style="padding: 10px; text-align: right; font-weight: bold;">${formatCurrency(total)}</td>
              </tr>
            </tbody>
          </table>
          
          <p style="margin-top: 30px;">If you have any questions about your order, please contact our customer service.</p>
          
          <p>Regards,<br>Elvix Team</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Elvix. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: customerEmail,
    subject: `Order Confirmation - #${id}`,
    html: emailHtml,
  });
};
