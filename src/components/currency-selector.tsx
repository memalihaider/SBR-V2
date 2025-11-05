'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DollarSign, Coins } from 'lucide-react';
import { useCurrencyStore } from '@/stores/currency';
import type { Currency } from '@/stores/currency';

export function CurrencySelector() {
  const { currency, setCurrency } = useCurrencyStore();

  const handleCurrencyChange = (newCurrency: Currency) => {
    setCurrency(newCurrency);
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
        <div className="flex items-center space-x-2">
          {currency === 'USD' ? (
            <DollarSign className="h-4 w-4 text-white" />
          ) : (
            <Coins className="h-4 w-4 text-white" />
          )}
          <Select value={currency} onValueChange={handleCurrencyChange}>
            <SelectTrigger className="w-20 bg-transparent border-white/20 text-white hover:bg-white/10 focus:ring-white/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="AED">AED</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}