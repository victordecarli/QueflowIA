'use client';

import { usePricing } from '@/contexts/PricingContext';
import { cn } from '@/lib/utils';

export function CountrySwitch() {
  const { selectedCountry, setSelectedCountry } = usePricing();

  return (
    <div className="flex justify-center mb-8">
      <div className="bg-white/5 rounded-full p-1 flex gap-1">
        <button
          onClick={() => setSelectedCountry('India')}
          className={cn(
            "px-4 py-2 rounded-full text-sm transition-all",
            selectedCountry === 'India'
              ? "bg-purple-600 text-white"
              : "text-gray-400 hover:text-white"
          )}
        >
          Índia (₹)
        </button>
        <button
          onClick={() => setSelectedCountry('International')}
          className={cn(
            "px-4 py-2 rounded-full text-sm transition-all",
            selectedCountry === 'International'
              ? "bg-purple-600 text-white"
              : "text-gray-400 hover:text-white"
          )}
        >
          Brasil (R$)
        </button>
      </div>
    </div>
  );
}
