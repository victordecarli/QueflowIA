import { NextResponse } from 'next/server';
import paypal from '@paypal/checkout-server-sdk';
import { getPayPalClient } from '@/lib/paypal-client';
import { getFreshUserProfile } from '@/lib/supabase-utils';

const PRO_PLAN_PRICE = 3; // Changed from 6 USD for Pro Monthly Plan

function getBaseUrl(req: Request) {
  const host = req.headers.get('host') || 'localhost:3000';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  return `${protocol}://${host}`;
}

export async function POST(req: Request) {
  const baseUrl = getBaseUrl(req);
  
  const headers = new Headers({
    'Content-Security-Policy': [
      "default-src 'self' https://*.paypal.com",
      "script-src 'self' 'unsafe-inline' https://*.paypal.com https://*.paypalobjects.com",
      "frame-src 'self' https://*.paypal.com https://www.paypal.com",
      "connect-src 'self' https://*.paypal.com https://api.paypal.com",
      "form-action 'self' https://*.paypal.com",
      "style-src 'self' 'unsafe-inline' https://*.paypal.com",
      "img-src 'self' data: https: blob: https://*.paypal.com",
      "frame-ancestors 'none'"
    ].join('; '),
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });

  try {
    const { userID } = await req.json();
    
    // Validate user exists before creating order
    const userProfile = await getFreshUserProfile(userID);
    if (!userProfile) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404, headers }
      );
    }

    const client = getPayPalClient();
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: 'BRL',
          value: PRO_PLAN_PRICE.toString(),
          breakdown: {
            item_total: {
              currency_code: 'BRL',
              value: PRO_PLAN_PRICE.toString()
            }
          }
        },
        description: `Plano Pro Mensal`,
        items: [{
          name: `Queflow IA Pro Mensal`,
          description: `Acesso ilimitado por um mês`,
          quantity: '1',
          unit_amount: {
            currency_code: 'BRL',
            value: PRO_PLAN_PRICE.toString()
          }
        }]
      }],
      application_context: {
        user_action: "PAY_NOW",
        return_url: `${baseUrl}/pay`,
        cancel_url: `${baseUrl}/pay`,
        brand_name: "Queflow IA",
        payment_method: {
          payee_preferred: "IMMEDIATE_PAYMENT_REQUIRED"
        }
      }
    });
    
    const order = await client.execute(request);
    
    return NextResponse.json({
      id: order.result.id
    }, { headers });
  } catch (error) {
    console.error('PayPal Erro:', error);
    return NextResponse.json(
      { error: 'Erro ao realizar o pedido' },
      { status: 500, headers }
    );
  }
}
