'use client';

import React, { useRef } from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface ColorInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  id?: string; // Add optional id prop
}

export function ColorInput({ value, onChange, className, id }: ColorInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const uniqueId = id || `color-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="relative flex items-center gap-2">
      <div 
        className={cn(
          "h-8 w-16 rounded border border-gray-200 dark:border-white/10 cursor-pointer overflow-hidden", // Increased width from w-8 to w-16
          "relative"
        )}
        onClick={() => inputRef.current?.click()}
      >
        <div 
          className="absolute inset-0" 
          style={{ backgroundColor: value }}
        />
        <input
          ref={inputRef}
          type="color"
          id={`${uniqueId}-picker`}
          name={`${uniqueId}-picker`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
          aria-label="Color picker"
        />
      </div>
      <Input
        type="text"
        id={`${uniqueId}-text`}
        name={`${uniqueId}-text`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10",
          "text-gray-900 dark:text-white font-mono uppercase text-sm",
          "h-8", // Added fixed width
          className
        )}
        placeholder="#000000"
      />
    </div>
  );
}
