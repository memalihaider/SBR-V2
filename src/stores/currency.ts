'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Currency = 'USD' | 'AED';

interface CurrencyState {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatCurrency: (amount: number) => string;
  formatAmount: (amount: number, baseCurrency?: Currency) => string;
  convertCurrency: (amount: number, from: Currency, to: Currency) => number;
}

// Exchange rates (as of current date - these should be updated with real rates)
const EXCHANGE_RATES = {
  USD_TO_AED: 3.67, // 1 USD = 3.67 AED
  AED_TO_USD: 1 / 3.67, // 1 AED = 0.272 USD
};

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set, get) => ({
      currency: 'USD',

      setCurrency: (currency: Currency) => {
        set({ currency });
      },

      formatCurrency: (amount: number) => {
        const { currency } = get();
        const formattedAmount = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: currency,
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(amount);

        return formattedAmount;
      },

      formatAmount: (amount: number, baseCurrency: Currency = 'USD') => {
        const { currency, convertCurrency } = get();
        const convertedAmount = convertCurrency(amount, baseCurrency, currency);
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: currency,
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(convertedAmount);
      },

      convertCurrency: (amount: number, from: Currency, to: Currency) => {
        if (from === to) return amount;

        if (from === 'USD' && to === 'AED') {
          return amount * EXCHANGE_RATES.USD_TO_AED;
        } else if (from === 'AED' && to === 'USD') {
          return amount * EXCHANGE_RATES.AED_TO_USD;
        }

        return amount;
      },
    }),
    {
      name: 'currency-storage',
    }
  )
);