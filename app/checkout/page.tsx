"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import FlutterwavePayment from '../components/FlutterwavePayment';
import { useCart } from '../hooks/useCart';
import { toast } from 'react-hot-toast';
import PageContainer from '../components/PageContainer';
import Link from 'next/link';

/**
 * @returns {JSX.Element} The checkout page component.
 * @description Provides a Flutterwave payment interface for Nigerian customers.
 */
export default function CheckoutPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { cart, items, total, clearCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [orderProcessing, setOrderProcessing] = useState(false);
  
  // Debug logging
  useEffect(() => {
    console.log('Cart state in checkout:', { cart, items, total });
  }, [cart, items, total]);
  
  useEffect(() => {
    // Redirect if not logged in
    if (!session && !loading) {
      router.push('/login?callbackUrl=/checkout');
      return;
    }
    setLoading(false);
  }, [session, router, loading]);
  
  const handlePaymentSuccess = async (response: any) => {
    setOrderProcessing(true);
    try {
      // Save the order
      const orderResponse = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items,
          total: total,
          payment: {
            reference: response.tx_ref,
            amount: total,
            status: 'paid',
            provider: 'flutterwave',
            transaction_id: response.transaction_id,
          },
        }),
      });
      
      if (orderResponse.ok) {
        // Clear cart after successful order
        clearCart();
        toast.success('Order placed successfully!');
      }
    } catch (error) {
      console.error('Error processing order:', error);
      toast.error('Error saving your order');
    } finally {
      setOrderProcessing(false);
    }
  };
  
  if (loading) {
    return <div className="text-center py-10">Loading checkout...</div>;
  }
  
  if (items.length === 0) {
    const addTestProduct = () => {
      // Create a properly typed test product that matches Product interface
      const testProduct = {
        id: 'test-product-' + Math.random().toString(36).substring(7),
        name: 'Test Product',
        price: 19.99,
        description: 'This is a test product for demonstration purposes.',
        image: '/images/placeholder.png',
        image_urls: ['/images/placeholder.png'],
        stock: 10,
        is_best_seller: false,
        sizes: ['S', 'M', 'L'],
        in_stock: true,
        quantity: 1
      };
      
      useCart.getState().addToCart(testProduct);
      toast.success('Test product added to cart');
      
      // Force a refresh after a short delay to ensure state updates
      setTimeout(() => {
        router.refresh();
      }, 500);
    };
    
    return (
      <PageContainer title="Your Cart is Empty" subtitle="Add some products to your cart before checking out" className="text-center">
        <div className="flex flex-col items-center justify-center py-10">
          <div className="flex flex-col md:flex-row gap-4 justify-center w-full max-w-md">
            <Link
              href="/products"
              className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md transition-colors text-center font-medium"
            >
              Browse Products
            </Link>
            
            {/* Debug button for testing */}
            <button
              onClick={addTestProduct}
              className="border border-gray-300 hover:bg-gray-100 text-gray-700 px-6 py-3 rounded-md transition-colors font-medium"
            >
              Add Test Product
            </button>
          </div>
          
          <div className="mt-8 text-sm text-gray-500">
            <p>Not sure what to buy? Check out our <Link href="/products?is_best_seller=true" className="text-primary hover:underline">best sellers</Link></p>
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer title="Checkout" subtitle="Complete your purchase securely with Flutterwave">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {/* Order summary */}
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Order Summary</h2>
            {items.map((item: any) => (
              <div key={item.id} className="flex justify-between mb-2 py-2 border-b">
                <span className="flex-1">{item.name} × {item.quantity}</span>
                <span className="font-medium">₦{(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
            <div className="mt-4 pt-4 font-bold flex justify-between text-lg">
              <span>Total</span>
              <span>₦{total.toLocaleString()}</span>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-1">
          {/* Payment section */}
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Order Total</h2>
            <FlutterwavePayment
              amount={total}
              customerEmail={session?.user?.email || ''}
              customerName={session?.user?.name || ''}
              onSuccess={handlePaymentSuccess}
            />
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>This is a demo store. For testing, Flutterwave provides test cards.</p>
        <p className="mt-2">You can use the test card: 5531 8866 5214 2950</p>
        <p>Expiry: 09/32, CVV: 564, OTP: 12345</p>
      </div>
    </PageContainer>
  );
}
