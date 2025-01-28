import { NextResponse } from 'next/server';
import { validatePayUResponse } from '@/lib/payu';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { addMonths } from 'date-fns';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const isValidHash = validatePayUResponse(body);

    if (!isValidHash) {
      console.error('Hash validation failed');
      return NextResponse.json(
        { error: 'Invalid payment signature' },
        { status: 400 }
      );
    }

    if (body.status !== 'success' || body.unmappedstatus !== 'captured') {
      console.error('Payment not successful:', { status: body.status, unmapped: body.unmappedstatus });
      return NextResponse.json(
        { error: body.error_Message || 'Payment was not successful' },
        { status: 400 }
      );
    }

    const { txnid, amount, email } = body;

    // Get user from email
    const { data: userData, error: userError } = await supabaseAdmin
      .from('profiles')
      .select('id')
      .eq('email', email)
      .single();

    if (userError || !userData) {
      throw new Error('User not found');
    }

    // Calculate expiration date
    const expiresAt = addMonths(new Date(), 1);

    // Insert into purchase_history
    const { error: insertError } = await supabaseAdmin
      .from('purchase_history')
      .insert({
        user_id: userData.id,
        amount_paid: parseFloat(amount),
        payment_type: 'PAYU',
        currency: 'INR'
    });

    if (insertError) throw insertError;

    // Update profiles table with new expiration date
    const { error: updateError } = await supabaseAdmin
      .from('profiles')
      .update({ 
        expires_at: expiresAt.toISOString()
      })
      .eq('id', userData.id);

    if (updateError) throw updateError;

    return NextResponse.json({
      status: 'success',
      transactionId: txnid
    });

  } catch (error) {
    console.error('PayU Verification Error:', error);
    return NextResponse.json(
      { error: 'Payment verification failed' },
      { status: 500 }
    );
  }
}