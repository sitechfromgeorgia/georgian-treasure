'use client';

import { Tour } from '@/types/tour';
import { useLocale, useTranslations } from 'next-intl';
import { Phone, Users, Calendar, Check } from 'lucide-react';
import { useState } from 'react';

interface PricingCardProps {
  tour: Tour;
}

export function PricingCard({ tour }: PricingCardProps) {
  const locale = useLocale();
  const [guests, setGuests] = useState(2);
  
  const basePrice = tour.price.amount;
  const groupDiscount = guests >= 5 ? (tour.groupDiscount || 0) : 0;
  const discountMultiplier = 1 - (groupDiscount / 100);
  const totalPrice = basePrice * guests * discountMultiplier;
  
  const whatsappMessage = encodeURIComponent(
    `Hi! I'm interested in booking "${tour.name.en}" for ${guests} people.`
  );
  
  return (
    <div className="sticky top-4 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-zinc-800">
      <div className="mb-6">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-[#F59E0B]">
            {tour.price.currency} {basePrice}
          </span>
          <span className="text-gray-500">per person</span>
        </div>
        
        {groupDiscount > 0 && (
          <div className="mt-2 px-3 py-1 bg-[#F59E0B]/10 text-[#F59E0B] text-sm font-semibold rounded-full inline-block">
            🎉 {groupDiscount}% group discount applied!
          </div>
        )}
      </div>
      
      {/* Guest Selector */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Number of Guests
        </label>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setGuests(Math.max(1, guests - 1))}
            className="w-10 h-10 rounded-lg border border-gray-200 dark:border-zinc-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-zinc-800"
          >
            -
          </button>
          <div className="flex-1 text-center font-semibold">
            <Users size={16} className="inline mr-2" />
            {guests}
          </div>
          <button
            onClick={() => setGuests(Math.min(tour.maxGroupSize, guests + 1))}
            className="w-10 h-10 rounded-lg border border-gray-200 dark:border-zinc-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-zinc-800"
          >
            +
          </button>
        </div>
      </div>
      
      {/* Total */}
      <div className="border-t border-gray-100 dark:border-zinc-800 pt-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-400">Total</span>
          <span className="text-2xl font-bold text-[#1E293B] dark:text-white">
            {tour.price.currency} {totalPrice}
          </span>
        </div>
      </div>
      
      {/* CTA */}
      <a
        href={`https://wa.me/995599033319?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full py-4 bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold rounded-xl transition-colors shadow-lg hover:shadow-xl active:scale-95"
      >
        <Phone size={20} />
        Book on WhatsApp
      </a>
      
      {/* Trust Badges */}
      <div className="mt-4 space-y-2">
        {[
          'Free cancellation',
          'No hidden fees',
          'Instant confirmation'
        ].map((badge, idx) => (
          <div key={idx} className="flex items-center gap-2 text-sm text-gray-500">
            <Check size={14} className="text-[#10B981]" />
            {badge}
          </div>
        ))}
      </div>
    </div>
  );
}
