'use client';

import { Tour } from '@/types/tour';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Star, Clock, Users, MapPin, Check, Phone } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface TourHeroProps {
  tour: Tour;
}

export function TourHero({ tour }: TourHeroProps) {
  const locale = useLocale();
  const t = useTranslations('tours');
  const [selectedImage, setSelectedImage] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  
  const allImages = [tour.coverImage, ...tour.gallery];
  
  return (
    <section className="relative">
      {/* Main Image */}
      <div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden">
        <Image
          src={allImages[selectedImage]}
          alt={tour.name[locale] || tour.name.en}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container mx-auto">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 bg-[#0EA5E9] text-white text-sm font-semibold rounded-full">
                {tour.region}
              </span>
              <div className="flex items-center gap-1 bg-black/50 text-white px-3 py-1 rounded-full">
                <Star size={16} fill="#F59E0B" className="text-[#F59E0B]" />
                <span className="font-semibold">{tour.averageRating}</span>
                <span className="text-sm opacity-80">({tour.reviewCount} reviews)</span>
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {tour.name[locale] || tour.name.en}
            </h1>
            <div className="flex flex-wrap gap-4 text-white/90">
              <div className="flex items-center gap-2">
                <Clock size={18} />
                <span>{tour.duration.hours}h {tour.duration.days && `(${tour.duration.days} days)`}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={18} />
                <span>1-{tour.maxGroupSize} people</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={18} />
                <span className="capitalize">{tour.difficulty}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Thumbnail Strip */}
      <div className="container mx-auto px-4 -mt-16 relative z-10">
        <div className="flex gap-3 overflow-x-auto pb-4">
          {allImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(idx)}
              className={`relative flex-shrink-0 w-24 h-16 md:w-32 md:h-20 rounded-lg overflow-hidden transition-all ${
                selectedImage === idx 
                  ? 'ring-2 ring-[#F59E0B] ring-offset-2' 
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              <Image
                src={img}
                alt={`${tour.name[locale]} ${idx + 1}`}
                fill
                className="object-cover"
                sizes="128px"
              />
            </button>
          ))}
        </div>
      </div>
      
      {/* Lightbox */}
      {showLightbox && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setShowLightbox(false)}
        >
          <Image
            src={allImages[selectedImage]}
            alt={tour.name[locale] || tour.name.en}
            width={1200}
            height={800}
            className="max-w-full max-h-[90vh] object-contain"
          />
          <button 
            className="absolute top-4 right-4 text-white text-2xl"
            onClick={() => setShowLightbox(false)}
          >
            ✕
          </button>
        </div>
      )}
    </section>
  );
}
