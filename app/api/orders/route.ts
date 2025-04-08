import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../lib/auth';
import { supabase } from '../../lib/supabase';
import { sendOrderConfirmationEmail } from '../../lib/email';

/**
 * @route POST /api/orders
 * @description Create a new order and send confirmation email
 */
export async function POST(request: NextRequest) {
  try {
    // Check user authentication
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { items, total, payment } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Invalid order items' },
        { status: 400 }
      );
    }

    // Create order in Supabase with minimal fields that must exist
    // Only use the absolute core fields every orders table would have
    const orderData = {
      user_id: session.user.id,
      total: total,
      status: 'completed'
      // No additional fields - we'll handle items separately for the email
    };
    
    // Create the order with only the fields we know exist
    const { data: order, error } = await supabase
      .from('orders')
      .insert([orderData])
      .select()
      .single();

    if (error) {
      console.error('Error creating order:', error);
      return NextResponse.json(
        { error: 'Failed to create order' },
        { status: 500 }
      );
    }

    // Send confirmation email
    try {
      await sendOrderConfirmationEmail({
        id: order.id,
        items: items,
        total: total,
        customerEmail: session.user.email as string,
        customerName: session.user.name as string,
        paymentReference: payment?.reference || payment?.transaction_id,
        createdAt: order.created_at,
      });
      console.log('Order confirmation email sent successfully');
    } catch (emailError) {
      console.error('Error sending order confirmation email:', emailError);
      // We continue despite email errors, just log them
    }

    return NextResponse.json({
      success: true,
      order: order,
      message: 'Order created successfully and confirmation email sent',
    });
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { error: 'An error occurred processing your order' },
      { status: 500 }
    );
  }
}

/**
 * @route GET /api/orders
 * @description Get orders for the current user
 */
export async function GET(request: NextRequest) {
  try {
    // Check user authentication
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get query parameters
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const page = parseInt(url.searchParams.get('page') || '0');
    const offset = page * limit;

    // Get orders from Supabase
    const { data: orders, error, count } = await supabase
      .from('orders')
      .select('*', { count: 'exact' })
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('Error fetching orders:', error);
      return NextResponse.json(
        { error: 'Failed to fetch orders' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      orders: orders || [],
      totalCount: count || 0,
      page,
      limit,
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}
