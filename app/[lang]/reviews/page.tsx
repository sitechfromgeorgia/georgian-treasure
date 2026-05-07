'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Star, Quote, User } from 'lucide-react';
import Image from 'next/image';

export default function ReviewsPage() {
  const t = useTranslations('reviews');

  const reviews = [
    {
      name: 'Sarah & Mike Johnson',
      from: 'United States',
      rating: 5,
      text: t('review1.text'),
      tour: t('review1.tour'),
      image: '/tours/tbilisi-old-town.jpg'
    },
    {
      name: 'Hans Mueller',
      from: 'Germany',
      rating: 5,
      text: t('review2.text'),
      tour: t('review2.tour'),
      image: '/tours/kazbegi-mountain.jpg'
    },
    {
      name: 'The Cohen Family',
      from: 'Israel',
      rating: 5,
      text: t('review3.text'),
      tour: t('review3.tour'),
      image: '/tours/batumi-city-tour.jpg'
    },
    {
      name: 'Marco Rossi',
      from: 'Italy',
      rating: 5,
      text: t('review4.text'),
      tour: t('review4.tour'),
      image: '/tours/kakheti-wine.jpg'
    },
    {
      name: 'Emma Thompson',
      from: 'United Kingdom',
      rating: 5,
      text: t('review5.text'),
      tour: t('review5.tour'),
      image: '/tours/svaneti-towers.jpg'
    },
    {
      name: 'David Chen',
      from: 'Canada',
      rating: 5,
      text: t('review6.text'),
      tour: t('review6.tour'),
      image: '/tours/martvili-canyon.jpg'
    }
  ];

  const stats = [
    { value: '4.9', label: t('stats.rating'), suffix: '/5' },
    { value: '500+', label: t('stats.reviews') },
    { value: '98%', label: t('stats.recommend') }
  ];

  return (
    <main className="min-h-screen bg-[#001F3F] pt-20">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/10 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-white/70">
              {t('hero.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-black text-[#D4AF37] mb-2">
                  {stat.value}
                  <span className="text-2xl">{stat.suffix}</span>
                </div>
                <div className="text-white/60">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-dark rounded-3xl overflow-hidden border border-white/10"
              >
                <div className="relative h-48">
                  <Image
                    src={review.image}
                    alt={review.tour}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001F3F] to-transparent" />
                  <div className="absolute top-4 right-4 flex gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={16} className="text-[#D4AF37] fill-[#D4AF37]" />
                    ))}
                  </div>
                </div>
                
                <div className="p-6">
                  <Quote className="text-[#D4AF37]/30 w-10 h-10 mb-4" />
                  
                  <p className="text-white/80 mb-6 leading-relaxed">
                    "{review.text}"
                  </p>
                  
                  <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                    <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-[#D4AF37]" />
                    </div>
                    <div>
                      <div className="text-white font-bold">{review.name}</div>
                      <div className="text-white/50 text-sm">{review.from}</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-[#D4AF37] text-sm">
                    {review.tour}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-dark rounded-3xl p-12 text-center border border-white/10"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              {t('cta.title')}
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto mb-8">
              {t('cta.subtitle')}
            </p>
            <a
              href="https://wa.me/995599033319"
              target="_blank"
              className="inline-flex items-center gap-2 bg-[#D4AF37] text-[#001F3F] font-bold px-8 py-4 rounded-xl hover:bg-[#E5C048] transition-colors"
            >
              {t('cta.button')}
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
