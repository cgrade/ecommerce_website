import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with a fallback test key (for development only)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_51OzBzNGqPXjUkLCPQDNyWNfPBGvUZQKjBVnbUGdKXKJUwQPkXDTlIeYHcMxJIVvMpyXRrfKdKCnDEiKlNcIGIXRD00Ht9Wy3Qd');

/**
 * @param {Request} request - The incoming request.
 * @returns {Promise<NextResponse>} The response with payment intent.
 * @description Handles POST requests to create a payment intent.
 */
export async function POST(request: Request) {
  try {
    // Get cart total from request or use a default amount for demo
    const { amount = 1000 } = await request.json();
    
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      // In a real app, you'd include metadata about the order
      metadata: {
        integration_check: 'accept_a_payment',
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({ 
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });
  } catch (error: any) {
    console.error('Payment intent error:', error);
    return NextResponse.json({ 
      error: error.message || 'Failed to create payment intent' 
    }, { status: 500 });
  }
}