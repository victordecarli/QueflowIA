import crypto from 'crypto';

interface PayUConfig {
  merchantKey: string;
  merchantSalt: string;
  baseUrl: string;
}

interface PayUOrderData {
    txnid: string;
    amount: string;
    productinfo: string;
    firstname: string;
    email: string;
    phone: string;
    surl: string;
    furl: string;
}


export const payuConfig: PayUConfig = {
  merchantKey: process.env.PAYU_MERCHANT_KEY!,
  merchantSalt: process.env.PAYU_MERCHANT_SALT!,
  baseUrl: process.env.NODE_ENV === 'production' 
    ? 'https://secure.payu.in/_payment'
    : 'https://test.payu.in/_payment'
};

// Generate hash for initial request
export function generatePayUHash(data: PayUOrderData): string {
    const input = `${payuConfig.merchantKey}|${data.txnid}|${data.amount}|${data.productinfo}|${data.firstname}|${data.email}|||||||||||${payuConfig.merchantSalt}`;
    return crypto.createHash('sha512').update(input).digest('hex');
}

// Validate response hash from PayU
export function validatePayUResponse(response: any): boolean {
  try {
    const {
      txnid,
      amount,
      productinfo,
      firstname,
      email,
      status,
      hash,
    } = response;

    const hashString = `${payuConfig.merchantSalt}|${status}|||||||||||${email}|${firstname}|${productinfo}|${amount}|${txnid}|${payuConfig.merchantKey}`
    const calculatedHash = crypto.createHash('sha512').update(hashString).digest('hex');
    return calculatedHash === hash;
  } catch (error) {
    console.error('Hash Validation Error:', error);
    return false;
  }
}

export function generateTxnId(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 10);
  const unique = crypto.randomBytes(4).toString('hex');
  return `txn_${timestamp}_${random}_${unique}`;
}

export function getPayUFormFields(data: PayUOrderData) {
  const hash = generatePayUHash(data);
  
  return {
    key: payuConfig.merchantKey,
    txnid: data.txnid,
    amount: data.amount,
    productinfo: data.productinfo,
    firstname: data.firstname,
    email: data.email,
    phone: data.phone,
    surl: data.surl,
    furl: data.furl,
    hash: hash,
  };
}
