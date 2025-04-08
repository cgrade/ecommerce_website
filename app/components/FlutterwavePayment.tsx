"use client";

import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useState } from 'react';

// TypeScript interface for Flutterwave response type that matches the library's type
interface FlutterWaveResponse {
  status?: string;
  message?: string;
  transaction_id?: string | number; // Accepting both types for compatibility
  tx_ref?: string;
  amount?: number;
  currency?: string;
  customer?: {
    email?: string;
    name?: string;
    phone_number?: string;
  };
  payment_type?: string;
  meta?: any;
}

interface PaymentProps {
  amount: number;
  customerEmail: string;
  customerName: string;
  customerPhone?: string;
  reference?: string;
  onSuccess?: (response: FlutterWaveResponse) => void;
  onClose?: () => void;
}

export default function FlutterwavePayment({
  amount,
  customerEmail,
  customerName,
  customerPhone = '',
  reference = Date.now().toString(),
  onSuccess,
  onClose
}: PaymentProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  
  // Check if a valid public key is configured
  const publicKey = process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY || '';
  const hasValidKey = publicKey.length > 0;
  
  const config = {
    public_key: publicKey,
    tx_ref: reference,
    amount: amount,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd,banktransfer',
    customer: {
      email: customerEmail,
      phone_number: customerPhone,
      name: customerName,
    },
    customizations: {
      title: 'ShopNow Store',
      description: 'Payment for your order',
      logo: '/logo.png', // Path to your logo
    },
  };
  
  // Debug log to check configuration
  console.log('Flutterwave config:', { ...config, public_key: 'HIDDEN' });

  const handleFlutterPayment = useFlutterwave(config);

  const initiatePayment = () => {
    try {
      // Check if we have a valid API key first
      if (!hasValidKey) {
        toast.error('Flutterwave API key not configured. Please add your key to the .env.local file.');
        console.error('Missing Flutterwave public key. For development, add NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY to your .env.local file.');
        
        // Simulate success for demo purposes
        simulateSuccessfulPayment();
        return;
      }
      
      setIsProcessing(true);
      toast.loading('Initializing payment...', { id: 'payment-loading' });
      
      // Add a timeout to reset the button if the modal doesn't appear
      const resetTimeout = setTimeout(() => {
        setIsProcessing(false);
        toast.dismiss('payment-loading');
        toast.error('Payment initialization timed out. Please try again.');
      }, 10000);
      
      handleFlutterPayment({
        callback: (response: FlutterWaveResponse) => {
          console.log('Payment response:', response);
          clearTimeout(resetTimeout);
          setIsProcessing(false);
          toast.dismiss('payment-loading');
          
          if (response && response.status === 'successful') {
            toast.success('Payment successful! Verifying...');
            // Verify payment on the server
            verifyPayment(response);
          } else {
            toast.error(`Payment failed: ${response?.message || response?.status || 'Unknown error'}`);
          }
          
          closePaymentModal();
        },
        onClose: () => {
          clearTimeout(resetTimeout);
          setIsProcessing(false);
          toast.dismiss('payment-loading');
          if (onClose) onClose();
          toast.error('Payment cancelled');
        },
      });
    } catch (error) {
      console.error('Error initiating payment:', error);
      setIsProcessing(false);
      toast.dismiss('payment-loading');
      toast.error('Failed to initialize payment. Please try again.');
    }
  };
  
  // Simulate a successful payment for demo purposes when no API key is provided
  const simulateSuccessfulPayment = async () => {
    setIsProcessing(true);
    toast.loading('Simulating payment...', { id: 'payment-simulation' });
    
    try {
      // Create a fake response object
      const mockResponse: FlutterWaveResponse = {
        status: 'successful',
        transaction_id: `demo-${Date.now()}`,
        tx_ref: reference,
        amount: amount,
        currency: 'NGN',
        customer: {
          email: customerEmail,
          name: customerName,
          phone_number: customerPhone
        }
      };
      
      // Wait 2 seconds to simulate processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.dismiss('payment-simulation');
      toast.success('Payment simulation completed successfully!');
      
      // Simulate verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Payment verified! (Simulation)');
      
      if (onSuccess) onSuccess(mockResponse);
      router.push('/checkout/success');
    } catch (error) {
      console.error('Simulation error:', error);
      toast.dismiss('payment-simulation');
      toast.error('Simulation failed');
      setIsProcessing(false);
    }
  };
  
  const verifyPayment = async (response: FlutterWaveResponse) => {
    try {
      // For demo purposes, we'll skip the server verification and simulate success
      // Since we're using a test key, the server verification would fail without proper setup
      
      if (process.env.NODE_ENV === 'production') {
        // In production, we would verify with our server
        const verificationResponse = await fetch('/api/payment/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            transaction_id: response.transaction_id,
            tx_ref: response.tx_ref,
          }),
        });
        
        const data = await verificationResponse.json();
        
        if (data.status === 'success') {
          toast.success('Payment verified!');
          if (onSuccess) onSuccess(response);
          router.push('/checkout/success');
        } else {
          toast.error(`Verification failed: ${data.message || 'Unknown error'}`);
          router.push('/checkout/failed');
        }
      } else {
        // In development/demo mode, we'll simulate a successful verification
        console.log('Demo mode: Simulating successful payment verification');
        
        // Short delay to simulate verification process
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        toast.success('Payment verified! (Demo Mode)');
        if (onSuccess) onSuccess(response);
        router.push('/checkout/success');
      }
    } catch (error) {
      console.error('Verification error:', error);
      toast.error('An error occurred while verifying your payment');
      router.push('/checkout/failed');
    }
  };

  return (
    <button
      onClick={initiatePayment}
      disabled={isProcessing}
      className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-md font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {isProcessing ? 'Processing...' : 'Pay with Flutterwave'}
    </button>
  );
}
