import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(amount: number, currency: 'GEL' | 'USD') {
  return new Intl.NumberFormat(currency === 'GEL' ? 'ka-GE' : 'en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount)
}
