import { NextResponse } from 'next/server';
import paypal from '@paypal/checkout-server-sdk';
import { getPayPalClient } from '@/lib/paypal-client';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { addMonths } from 'date-fns';

export async function POST(req: Request) {
  try {
    const { orderID, userID } = await req.json();
    if (!orderID || !userID) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    const client = getPayPalClient();
    const request = new paypal.orders.OrdersCaptureRequest(orderID);
    const capture = await client.execute(request);

    if (capture.result.status === 'COMPLETED') {
      const amountPaid = parseFloat(
        capture.result.purchase_units[0].payments.captures[0].amount.value
      );

      // Calculate expiration date
      const expiresAt = addMonths(new Date(), 1);

      // Insert into purchase_history
      const { error: insertError } = await supabaseAdmin
        .from('purchase_history')
        .insert({
          user_id: userID,
          amount_paid: amountPaid,
          payment_type: 'PAYPAL',
          currency: 'USD'
        });

      if (insertError) throw insertError;

      // Update profiles table with new expiration date
      const { error: updateError } = await supabaseAdmin
        .from('profiles')
        .update({ 
          expires_at: expiresAt.toISOString()
        })
        .eq('id', userID);

      if (updateError) throw updateError;

      return NextResponse.json({
        status: 'success',
        orderID: capture.result.id
      });
    }

    throw new Error('Payment not completed');
  } catch (error) {
    console.error('Error capturing PayPal order:', error);
    return NextResponse.json(
      { error: 'Error capturing payment' },
      { status: 500 }
    );
  }
}
