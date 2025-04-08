import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';

/**
 * @route POST /api/payment/verify
 * @description Verify a Flutterwave payment transaction
 */
export async function POST(request: NextRequest) {
  // Check authentication
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { transaction_id, tx_ref } = body;

    if (!transaction_id || !tx_ref) {
      return NextResponse.json(
        { error: 'Missing transaction_id or tx_ref' },
        { status: 400 }
      );
    }

    // Verify the transaction with Flutterwave API
    const secret_key = process.env.FLUTTERWAVE_SECRET_KEY;
    if (!secret_key) {
      console.error('FLUTTERWAVE_SECRET_KEY is not defined in environment variables');
      return NextResponse.json(
        { error: 'Payment verification configuration error' },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${secret_key}`,
        },
      }
    );

    const data = await response.json();

    // Check if payment was successful and matches our records
    if (
      data.status === 'success' &&
      data.data.status === 'successful' &&
      data.data.tx_ref === tx_ref
    ) {
      // In a real implementation:
      // 1. Update order status in your database
      // 2. Log the transaction
      // 3. Trigger any necessary post-payment actions
      
      return NextResponse.json({
        status: 'success',
        message: 'Payment verified successfully',
        data: {
          amount: data.data.amount,
          currency: data.data.currency,
          customer: {
            name: data.data.customer.name,
            email: data.data.customer.email
          },
          transactionId: transaction_id,
          reference: tx_ref,
        }
      });
    } else {
      // Payment verification failed
      console.warn('Payment verification failed:', data);
      return NextResponse.json(
        { 
          status: 'failed', 
          message: 'Payment verification failed',
          error: data.message || 'Transaction verification failed' 
        },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error('Error verifying payment:', error);
    return NextResponse.json(
      { status: 'error', message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}
