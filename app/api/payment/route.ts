import { NextResponse } from 'next/server';

/**
 * @param {Request} request - The incoming request.
 * @returns {Promise<NextResponse>} The response with payment reference.
 * @description Handles POST requests to initialize a Flutterwave payment.
 */
export async function POST(request: Request) {
  try {
    // Get payment details from request
    const { amount = 1000, customer } = await request.json();
    
    // Generate a unique transaction reference
    const txRef = `tx_${Date.now()}_${Math.floor(Math.random() * 1000000)}`;
    
    // In a real app, you'd store this transaction reference with the order details
    // For example, update an order in the database with the txRef
    
    return NextResponse.json({ 
      success: true,
      txRef: txRef,
      amount: amount
    });
  } catch (error: any) {
    console.error('Payment initialization error:', error);
    return NextResponse.json({ 
      error: error.message || 'Failed to initialize payment' 
    }, { status: 500 });
  }
}