'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Get essential parameters
        const status = searchParams.get('status');
        const txnid = searchParams.get('txnid');

        // If no transaction ID or not success status, redirect to pay page
        if (!txnid || status?.toLowerCase() !== 'success') {
          throw new Error('Invalid payment data');
        }

        // Send verification request
        const response = await fetch('/api/payments/verify-payu-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(Object.fromEntries(searchParams.entries()))
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Payment verification failed');
        }

        // Updated success message
        toast({
          title: "Payment successful!",
          description: "Your Pro Monthly Plan is now active.",
        });

        // Redirect to editor
        setTimeout(() => {
          router.push('/custom-editor');
        }, 2000);

      } catch (error) {
        console.error('Payment verification error:', error);
        toast({
          variant: "destructive",
          title: "Payment verification failed",
          description: "Please contact support if your Pro access is not activated.",
        });
        
        // Redirect to pay page on error
        setTimeout(() => {
          router.push('/pay');
        }, 3000);
      } finally {
        setIsProcessing(false);
      }
    };

    // Only verify if we have search parameters
    if (searchParams.size > 0) {
      verifyPayment();
    } else {
      router.push('/pay');
    }
  }, [router, searchParams, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg text-center">
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <Check className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {isProcessing ? 'Processing Payment...' : 'Payment Successful!'}
        </h1>
        <p className="text-gray-600 mb-6">
          {isProcessing 
            ? 'Please wait while we verify your payment...'
            : 'Your Pro Monthly Plan has been activated.'}
        </p>
        {isProcessing && (
          <div className="flex justify-center">
            <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
}
