'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { Home, LogIn, CreditCard, Phone, User } from 'lucide-react';
import Link from 'next/link';
import { PaymentStatusDialog } from '@/components/PaymentStatusDialog';
import { useToast } from "@/hooks/use-toast"
import { debounce } from 'lodash'; // Add this import
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthDialog } from '@/components/AuthDialog';
import { usePricing } from '@/contexts/PricingContext';

const PLAN_OPTIONS = {
  international: {
    price: 3, // Changed from 6
    currency: 'USD',
    symbol: '$'
  },
  india: {
    price: 49, // Changed from 99
    currency: 'INR',
    symbol: '₹'
  }
};

function PayPalButtonWrapper({ createOrder, onApprove, onError, onCancel, disabled }: any) {
  const [{ isPending, isRejected }] = usePayPalScriptReducer();

  if (isPending) {
    return <PayPalLoader />;
  }

  if (isRejected) {
    return (
      <div className="text-red-500 text-center p-4">
        Failed to load PayPal. Please refresh the page or try again later.
      </div>
    );
  }

  return (
    <div className="relative">
      <PayPalButtons
        createOrder={createOrder}
        onApprove={async (data, actions) => {
          if (actions.order) {
            try {
              await actions.order.capture();
              onApprove(data);
            } catch (err) {
              console.error('PayPal capture error:', err);
              onError(err);
            }
          }
        }}
        onError={onError}
        onCancel={onCancel}
        style={{ layout: "vertical", shape: "rect", label: "paypal" }}
        disabled={disabled}
      />
    </div>
  );
}

function PayPalLoader() {
  return (
    <div className="h-[150px] flex flex-col items-center justify-center gap-3 bg-gray-50 rounded-lg border border-gray-200">
      <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-sm text-gray-600">Loading PayPal...</p>
    </div>
  );
}

// Add phone validation function
const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone);
};

export default function PayPage() {
  const { selectedCountry, setSelectedCountry } = usePricing();
  const [region, setRegion] = useState<'international' | 'india'>(
    selectedCountry === 'India' ? 'india' : 'international'
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'error' | null>(null);
  const [sdkReady, setSdkReady] = useState(false);
  const [isChangingOption, setIsChangingOption] = useState(false);
  const [payuForm, setPayuForm] = useState({
    firstName: '',
    phone: '',
  });
  const [phoneError, setPhoneError] = useState('');
  const router = useRouter();
  const { user, isLoading } = useAuth(); // Add isLoading here
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  useEffect(() => {
    // Get the saved country preference from localStorage
    const savedCountry = localStorage.getItem('selectedCountry') as 'India' | 'International';
    if (savedCountry) {
      setSelectedCountry(savedCountry);
    }
  }, [setSelectedCountry]);

  useEffect(() => {
    const regionParam = searchParams.get('region') as 'international' | 'india';

    if (regionParam) {
      setRegion(regionParam);
    }
  }, [searchParams]);

  useEffect(() => {
    // Add a small delay to ensure PayPal script loads properly
    const timer = setTimeout(() => {
      setSdkReady(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // If user is not logged in, show auth dialog
    if (!isLoading && !user) {
      setShowAuthDialog(true);
    }
  }, [user, isLoading]);

  // Add this effect to sync region with selectedCountry
  useEffect(() => {
    const newRegion = selectedCountry === 'India' ? 'india' : 'international';
    setRegion(newRegion);
  }, [selectedCountry]);

  const handleCreateOrder = async () => {
    try {
      const response = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userID: user?.id
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      return data.id;
    } catch (error) {
      toast({ variant: 'destructive', title: "Algo deu errado" });
      throw error;
    }
  };

  const handleError = () => {
    toast({ variant: 'destructive', title: "Pagamento cancelado ou falhou" })
    setPaymentStatus('error');
    setIsProcessing(false);
    // Clear error status after 3 seconds
    setTimeout(() => {
      setPaymentStatus(null);
    }, 3000);
  };

  const handleCancel = () => {
    toast({ variant: 'destructive', title: "Pagamento cancelado" })
    setIsProcessing(false);
  };

  async function captureOrder(data: any) {
    if (!user) {
      router.push('/');
      return;
    }

    // Only set processing to true when actually capturing the payment
    setIsProcessing(true);

    try {
      const response = await fetch('/api/payments/capture-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderID: data.orderID,
          userID: user.id,
          plan: 'pro_monthly'
        })
      });

      if (response.ok) {
        setPaymentStatus('success');
        // Wait 2 seconds before redirecting
        setTimeout(() => {
          router.push('/custom-editor');
        }, 2000);
      } else {
        throw new Error('Pagamento falhou');
      }
    } catch (error) {
      toast({ variant: 'destructive', title: "Pagamento falhou" });
      setPaymentStatus('error');
      // Clear error status after 3 seconds
      setTimeout(() => {
        setPaymentStatus(null);
      }, 3000);
    } finally {
      setIsProcessing(false);
    }
  }

  const handlePayUSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({ variant: 'destructive', title: "Por favor, faça login para continuar" });
      return;
    }

    setIsProcessing(true);

    try {
      const response = await fetch('/api/payments/create-payu-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...payuForm,
          amount: PLAN_OPTIONS[region].price,
          plan: 'pro_monthly',
          userID: user.id,
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Falhou ao criar pagamento');
      }

      // Create and submit form
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = data.paymentUrl;

      // Add all required PayU fields
      Object.entries(data.formData).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value as string;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error('PayU Error:', error);
      toast({
        variant: 'destructive',
        title: "Falhou ao inicializar pagamento",
        description: error instanceof Error ? error.message : 'Erro desconhecido ocorreu'
      });
      setIsProcessing(false);
    }
  };

  const initialOptions = {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
    "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
    currency: "USD",
    intent: "capture",
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  // Update region change handler to also update pricing context
  const handleRegionChange = (newRegion: 'international' | 'india') => {
    setRegion(newRegion);
    setSelectedCountry(newRegion === 'india' ? 'India' : 'International');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Simple Header */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
        <div className="container max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Home className="w-6 h-6" />
          </Link>

          {user && (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">{user.email}</span>
              <div className="relative w-8 h-8 rounded-full overflow-hidden">
                <img
                  src={user.user_metadata.avatar_url || ''}
                  alt="User avatar"
                  className="object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-24">
        <div className="container max-w-6xl mx-auto py-12 px-4">
          {!user ? (
            <div className="max-w-md mx-auto text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Por favor, faça login para continuar
              </h2>
              <p className="text-gray-600 mb-6">
                Você precisa estar logado para comprar o plano Pro Mensal.
              </p>
              <button
                onClick={() => setShowAuthDialog(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                <LogIn className="w-5 h-5" />
                <span>Entrar</span>
              </button>
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-gray-900 mb-8">Plano Pro Mensal</h1>
              {/* Reordered Region Toggle */}
              <div className="mb-8">
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => handleRegionChange('india')}
                    className={cn(
                      "px-6 py-2 rounded-lg font-medium transition-all",
                      region === 'india'
                        ? "bg-purple-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    )}
                  >
                    Índia (₹)
                  </button>
                  <button
                    onClick={() => handleRegionChange('international')}
                    className={cn(
                      "px-6 py-2 rounded-lg font-medium transition-all",
                      region === 'international'
                        ? "bg-purple-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    )}
                  >
                    Brasil (R$)
                  </button>
                </div>
              </div>

              <div className="max-w-md mx-auto">
                {/* Payment Section */}
                <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      Plano Pro Mensal
                    </h2>
                    <div className="text-3xl font-bold text-purple-600 mt-2">
                      {PLAN_OPTIONS[region].symbol}{PLAN_OPTIONS[region].price}
                    </div>
                    <p className="text-gray-600 mt-2">
                      Acesso ilimitado por um mês
                    </p>
                  </div>

                  {region === 'international' ? (
                    // PayPal payment section
                    <PayPalScriptProvider options={initialOptions}>
                      <ErrorBoundary fallback={
                        <div className="text-red-500 text-center p-4">
                          Algo deu errado com a integração do PayPal. Por favor, recarregue a página ou tente novamente mais tarde.
                        </div>
                      }>
                        <div className="relative">
                          <PayPalButtonWrapper
                            createOrder={handleCreateOrder}
                            onApprove={(data: any) => captureOrder(data)}
                            onError={handleError}
                            onCancel={handleCancel}
                            disabled={!user || isProcessing}
                          />
                          <p className="text-xs text-gray-500 mt-3 text-center">
                            *Taxas adicionais do PayPal podem ser aplicadas com base na sua moeda ou localização
                          </p>
                          {isProcessing && (
                            <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded z-50">
                              <div className="flex items-center gap-2">
                                <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                                <span className="text-sm text-gray-600">Processando pagamento...</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </ErrorBoundary>
                    </PayPalScriptProvider>
                  ) : (
                    // Enhanced PayU form section for Indian users
                    <div className="bg-white rounded-lg">
                      <form onSubmit={handlePayUSubmit} className="space-y-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName" className="text-gray-700 flex items-center gap-2">
                              <User className="w-4 h-4" />
                              <span>Nome Completo</span>
                            </Label>
                            <Input
                              id="firstName"
                              type="text"
                              required
                              autoComplete="off"
                              className="bg-white text-gray-900 border-gray-200"
                              value={payuForm.firstName}
                              onChange={(e) => setPayuForm(prev => ({ ...prev, firstName: e.target.value }))}
                              placeholder="Digite seu nome completo"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone" className="text-gray-700 flex items-center gap-2">
                              <Phone className="w-4 h-4" />
                              <span>Número de telefone</span>
                            </Label>
                            <Input
                              id="phone"
                              type="tel"
                              required
                              autoComplete="off"
                              className={cn(
                                "bg-white text-gray-900 border-gray-200",
                                phoneError && "border-red-500"
                              )}
                              value={payuForm.phone}
                              onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                                setPayuForm(prev => ({ ...prev, phone: value }));
                                setPhoneError(validatePhone(value) ? '' : 'Por favor, digite um número de telefone válido');
                              }}
                              placeholder="10-digit mobile number"
                            />
                            {phoneError && (
                              <p className="text-red-500 text-xs mt-1">{phoneError}</p>
                            )}
                            <p className="text-gray-500 text-xs mt-1">
                              Digite o número de telefone para receber detalhes da transação
                            </p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <button
                            type="submit"
                            disabled={isProcessing || !user || !!phoneError || !validatePhone(payuForm.phone)}
                            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:hover:bg-purple-600 font-medium flex items-center justify-center gap-2"
                          >
                            <CreditCard className="w-5 h-5" />
                            {isProcessing ? 'Processando...' : `Pagar ₹${PLAN_OPTIONS[region].price}`}
                          </button>
                          <div className="text-center">
                            <p className="text-xs text-gray-500 flex items-center justify-center gap-2">
                              <span>Pagamento seguro via</span>
                              <span className="font-medium">UPI</span>
                              <span>•</span>
                              <span className="font-medium">Cartões</span>
                              <span>•</span>
                              <span className="font-medium">NetBanking</span>
                              <span>& mais</span>
                            </p>
                          </div>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Add AuthDialog */}
      <AuthDialog
        isOpen={showAuthDialog}
        onClose={() => {
          setShowAuthDialog(false);
          // If user is still not logged in, redirect to home
          if (!user) {
            router.push('/');
          }
        }}
        returnUrl="/pay"
      />

      <PaymentStatusDialog
        isOpen={paymentStatus !== null}
        status={paymentStatus || 'error'}
      />
    </div>
  );
}

// Add Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('PayPal Error Boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

