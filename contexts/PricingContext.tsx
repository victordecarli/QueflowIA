'use client';

import { createContext, useContext, useState, useEffect } from 'react';

type CountryType = 'India' | 'International';

interface PricingContextType {
  selectedCountry: CountryType;
  setSelectedCountry: (country: CountryType) => void;
  getPrice: (basePrice: number) => number;
}

const PricingContext = createContext<PricingContextType | undefined>(undefined);

export function PricingProvider({ children }: { children: React.ReactNode }) {
  const [selectedCountry, setSelectedCountry] = useState<CountryType>('India');

  useEffect(() => {
    const savedCountry = localStorage.getItem('selectedCountry') as CountryType;
    if (savedCountry) {
      setSelectedCountry(savedCountry);
    }
  }, []);

  const handleCountryChange = (country: CountryType) => {
    setSelectedCountry(country);
    localStorage.setItem('selectedCountry', country);
  };

  const getPrice = (basePrice: number) => {
    // For India, use fixed price of 99
    return selectedCountry === 'India' ? 99 : basePrice;
  };

  return (
    <PricingContext.Provider 
      value={{ 
        selectedCountry, 
        setSelectedCountry: handleCountryChange,
        getPrice 
      }}
    >
      {children}
    </PricingContext.Provider>
  );
}

export const usePricing = () => {
  const context = useContext(PricingContext);
  if (!context) {
    throw new Error('usePricing must be used within a PricingProvider');
  }
  return context;
};
