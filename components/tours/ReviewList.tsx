'use client';

import { Review } from '@/types/review';
import { useLocale, useTranslations } from 'next-intl';
import { Star, Flag } from 'lucide-react';
import { useState } from 'react';

interface ReviewListProps {
  reviews: Review[];
  averageRating: number;
  reviewCount: number;
}

export function ReviewList({ reviews, averageRating, reviewCount }: ReviewListProps) {
  const locale = useLocale();
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  
  const filteredReviews = filterRating
    ? reviews.filter(r => r.rating === filterRating)
    : reviews;
  
  const displayedReviews = showAll ? filteredReviews : filteredReviews.slice(0, 3);
  
  return (
    <section className="py-12">
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-2xl font-bold text-[#1E293B] dark:text-white">
          Reviews
        </h2>
        <div className="flex items-center gap-2">
          <Star size={20} fill="#F59E0B" className="text-[#F59E0B]" />
          <span className="font-bold text-lg">{averageRating}</span>
          <span className="text-gray-500">({reviewCount} reviews)</span>
        </div>
      </div>
      
      {/* Rating Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilterRating(null)}
          className={`px-4 py-2 rounded-full text-sm transition-colors ${
            filterRating === null
              ? 'bg-[#0EA5E9] text-white'
              : 'bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300'
          }`}
        >
          All
        </button>
        {[5, 4, 3, 2, 1].map((rating) => (
          <button
            key={rating}
            onClick={() => setFilterRating(rating === filterRating ? null : rating)}
            className={`px-4 py-2 rounded-full text-sm transition-colors flex items-center gap-1 ${
              filterRating === rating
                ? 'bg-[#0EA5E9] text-white'
                : 'bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            {rating}★
          </button>
        ))}
      </div>
      
      {/* Reviews */}
      <div className="space-y-6">
        {displayedReviews.map((review) => (
          <div
            key={review.id}
            className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-gray-100 dark:border-zinc-800"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {/* Avatar with initials */}
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: stringToColor(review.reviewer.displayName) }}
                >
                  {getInitials(review.reviewer.displayName)}
                </div>
                <div>
                  <div className="font-semibold text-[#1E293B] dark:text-white">
                    {review.reviewer.displayName}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    {review.reviewer.country && (
                      <span>{review.reviewer.country}</span>
                    )}
                    <span>·</span>
                    <span>{review.visitDate}</span>
                  </div>
                </div>
              </div>
              
              {review.reviewer.verified && (
                <span className="px-2 py-1 bg-[#10B981]/10 text-[#10B981] text-xs font-semibold rounded-full">
                  ✓ Verified
                </span>
              )}
            </div>
            
            {/* Stars */}
            <div className="flex gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={16}
                  className={star <= review.rating ? 'text-[#F59E0B]' : 'text-gray-300'}
                  fill={star <= review.rating ? '#F59E0B' : 'none'}
                />
              ))}
            </div>
            
            {/* Content */}
            <p className="text-[#1E293B] dark:text-gray-300 leading-relaxed">
              {review.content[locale] || review.content.en}
            </p>
            
            {/* Response */}
            {review.response && (
              <div className="mt-4 pl-4 border-l-2 border-[#0EA5E9]">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Response:</strong> {review.response.content[locale] || review.response.content.en}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Show All */}
      {filteredReviews.length > 3 && !showAll && (
        <button
          onClick={() => setShowAll(true)}
          className="mt-6 w-full py-3 border-2 border-[#0EA5E9] text-[#0EA5E9] font-semibold rounded-xl hover:bg-[#0EA5E9] hover:text-white transition-colors"
        >
          Show all {filteredReviews.length} reviews
        </button>
      )}
    </section>
  );
}

// Helper functions
function stringToColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
  return '#' + '00000'.substring(0, 6 - c.length) + c;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}
