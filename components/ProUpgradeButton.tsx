'use client';

import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { ProPlanDialog } from './ProPlanDialog';
import { AuthDialog } from './AuthDialog';  // Add this import
import { buttonVariants } from './ui/button';
import { useAuth } from '@/hooks/useAuth';  // Add this import

interface ProUpgradeButtonProps {
  variant?: 'default' | 'nav';
  className?: string;
}

export function ProUpgradeButton({ variant = 'default', className }: ProUpgradeButtonProps) {
  const [showProDialog, setShowProDialog] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const { user } = useAuth();

  const handleUpgradeClick = () => {
    if (!user) {
      setShowAuthDialog(true);
    } else {
      setShowProDialog(true);
    }
  };

  return (
    <>
      <button
        onClick={handleUpgradeClick}
        className={cn(
          buttonVariants({ variant: 'outline' }),
          'group relative overflow-hidden border-purple-600/50 hover:border-purple-600',
          'transition-all duration-300 ease-out hover:scale-105',
          variant === 'nav' ? 'h-8 rounded-full px-3 text-sm' : 'h-9 rounded-lg px-4',
          className
        )}
      >
        <span className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-purple-400/20 group-hover:opacity-80 opacity-0 transition-opacity" />
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-purple-600" />
          <span className="text-purple-600 font-medium">
            Pro
          </span>
        </span>
      </button>

      <AuthDialog
        isOpen={showAuthDialog}
        onClose={() => setShowAuthDialog(false)}
        returnUrl="/pay"  // Redirect to payment page after auth
      />

      <ProPlanDialog
        isOpen={showProDialog}
        onClose={() => setShowProDialog(false)}
      />
    </>
  );
}
