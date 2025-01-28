export interface TokenOption {
  tokens: number;
  price: number;
  savings: number;
  perToken: number;
  priceINR?: string;  // Make priceINR optional
}

export const INTERNATIONAL_TOKEN_OPTIONS: TokenOption[] = [
  { tokens: 5, price: 1, savings: 0, perToken: 0.20 },
  { tokens: 10, price: 2, savings: 0, perToken: 0.20 },
  { tokens: 25, price: 4, savings: 20, perToken: 0.16 },
  { tokens: 50, price: 7, savings: 30, perToken: 0.14 },
];

export const INDIAN_TOKEN_OPTIONS: TokenOption[] = [
  { tokens: 10, price: 39, savings: 0, perToken: 3.9, priceINR: "₹39" },
  { tokens: 50, price: 179, savings: 20, perToken: 3.58, priceINR: "₹179" },
];
