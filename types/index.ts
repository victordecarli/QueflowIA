export interface UserProfile {
  id: string;
  email: string;
  avatar_url: string;
  expires_at: string | null;
  free_generations_used: number;
}

export interface PaymentRecord {
  id: string;
  user_id: string;
  amount_paid: number;
  payment_type: 'PAYPAL' | 'PAYU';
  purchase_date: string;
  currency: string;
}
