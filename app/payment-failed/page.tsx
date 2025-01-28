'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function PaymentFailedPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    // Get error message from URL parameters
    const errorMessage = searchParams.get('error_Message') || 
                        searchParams.get('error') || 
                        searchParams.get('message') ||
                        'Your payment could not be processed';
    
    toast({
      variant: "destructive",
      title: "Payment Failed",
      description: errorMessage,
    });

    // Redirect back to pay page after 3 seconds
    const timer = setTimeout(() => {
      router.push('/pay');
    }, 3000);

    return () => clearTimeout(timer);
  }, [searchParams, router, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg text-center">
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Payment Failed
        </h1>
        <p className="text-gray-600 mb-6">
          {searchParams.get('error') || "Your payment could not be processed."}
        </p>
        <button
          onClick={() => router.push('/pay')}
          className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
