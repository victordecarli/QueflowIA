import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogClose } from "./ui/dialog";
import { useRouter } from "next/navigation";
import { usePricing } from '@/contexts/PricingContext';
import { CountrySwitch } from './CountrySwitch';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { isSubscriptionActive } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { Sparkles } from "lucide-react";

interface ProPlanDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProPlanDialog({ isOpen, onClose }: ProPlanDialogProps) {
  const router = useRouter();
  const { selectedCountry, getPrice } = usePricing();
  const { user } = useAuth();
  const [userStatus, setUserStatus] = useState<{
    expires_at: string | null;
    free_generations_used: number;
  } | null>(null);
  const currencySymbol = selectedCountry === 'India' ? '₹' : '$';

  useEffect(() => {
    async function fetchUserStatus() {
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('expires_at, free_generations_used')
          .eq('id', user.id)
          .single();
        
        setUserStatus(data);
      }
    }

    if (isOpen) {
      fetchUserStatus();
    }
  }, [isOpen, user]);

  const getMessage = () => {
    if (!userStatus) return '';
    
    if (userStatus.expires_at) {
      return isSubscriptionActive(userStatus.expires_at)
        ? "Your pro plan is currently active."
        : "Your pro plan has expired. Renew now for unlimited access.";
    }
    
    return "You've used all your free generations. Upgrade to Pro for unlimited access.";
  };

  const handleUpgrade = () => {
    router.push('/pay');
    onClose();
  };

  const getOriginalPrice = () => selectedCountry === 'India' ? 99 : 6;  // Changed from 199/10
  const getDiscountedPrice = () => selectedCountry === 'India' ? 49 : 3; // Changed from 99/6

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] w-[96vw] bg-zinc-900 border-zinc-800">
        <DialogHeader className="relative">
          <DialogTitle className="text-xl font-bold text-white flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            Upgrade to Pro
          </DialogTitle>
          <DialogClose className="absolute right-0 top-0 text-gray-400 hover:text-white">
            <svg width="24" height="24" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                fill="currentColor"
              />
            </svg>
          </DialogClose>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          {/* Added CountrySwitch */}
          <div className="flex justify-center">
            <CountrySwitch />
          </div>

          <div className="p-4 rounded-lg border border-zinc-800 bg-zinc-800/50">
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="font-medium text-white text-lg">Pro Monthly Plan</div>
                <div className="text-sm text-gray-400">Premium features • No auto-renewals</div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 justify-end">
                  <span className="line-through text-gray-500 text-lg">
                    {currencySymbol}{getOriginalPrice()}
                  </span>
                  <span className="font-semibold text-purple-400 text-xl">
                    {currencySymbol}{getDiscountedPrice()}
                  </span>
                </div>
                <div className="text-sm text-gray-400">/month</div>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-400 space-y-2.5">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                ✨ Unlimited Creations
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                ⚡️ High Speed
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                🎨 Premium Quality (PNG)
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={handleUpgrade}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-600 
                     text-white rounded-lg py-3 px-4 transition-all duration-300 transform hover:scale-[1.02] 
                     shadow-lg shadow-purple-600/20 hover:shadow-purple-600/30"
          >
            Upgrade Now
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
