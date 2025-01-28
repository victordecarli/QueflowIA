import { NextResponse } from 'next/server';
import { getPayUFormFields, generateTxnId } from '@/lib/payu';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userID, firstName, phone } = body;

    // PayU payments in INR - Updated price
    const amount = 49; // Changed from 99

    // Ensure we have the base URL
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
    if (!baseUrl) {
      throw new Error('NEXT_PUBLIC_APP_URL environment variable is not set');
    }

    // Get user's email from Supabase
    const { data: userData, error: userError } = await supabaseAdmin
      .from('profiles')
      .select('email')
      .eq('id', userID)
      .single();

    if (userError || !userData?.email) {
      throw new Error('User not found');
    }

    // Ensure absolute URLs for success and failure redirects
    const successUrl = new URL('/payment-success', baseUrl).toString();
    const failureUrl = new URL('/payment-failed', baseUrl).toString();
    
    const orderData = {
      txnid: generateTxnId(),
      amount: amount.toString(),
      productinfo: `pro_monthly`,
      firstname: firstName,
      email: userData.email,
      phone: phone,
      surl: successUrl,
      furl: failureUrl
    };

    // Get form fields with hash
    const formData = getPayUFormFields(orderData);

    return NextResponse.json({
      success: true,
      paymentUrl: process.env.NODE_ENV === 'production' 
        ? 'https://secure.payu.in/_payment'
        : 'https://test.payu.in/_payment',
      formData
    });
  } catch (error) {
    console.error('PayU Create Order Error:', error);
    return NextResponse.json(
      { error: 'Failed to create PayU order' },
      { status: 500 }
    );
  }
}
