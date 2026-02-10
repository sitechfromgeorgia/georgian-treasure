'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { ChevronDown, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Hero() {
  const { language, t, isRTL } = useLanguage();

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background with Video Placeholder/Gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/40 to-primary dark:from-black/80 dark:via-black/50 dark:to-zinc-950 z-10 transition-colors duration-500" />
        <img 
          src="https://images.unsplash.com/photo-1563220318-7b447883296c?q=80&w=2070&auto=format&fit=crop" 
          alt="Batumi" 
          className="w-full h-full object-cover scale-105 animate-pulse-slow"
        />
      </div>

      <div className="container mx-auto px-4 z-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1 
            className={cn(
              "text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight drop-shadow-2xl tracking-tighter",
              isRTL ? "font-arabic" : "font-inter"
            )}
          >
            {t.hero.title}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-white/90 mb-10 font-light max-w-2xl mx-auto"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <button className="gold-gradient text-primary font-black px-12 py-5 rounded-full text-lg shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] hover:scale-105 active:scale-95 transition-all">
              {t.hero.cta}
            </button>
            <button className="glass text-white px-10 py-5 rounded-full text-lg flex items-center gap-3 hover:bg-white/20 transition-all active:scale-95">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                <Play size={16} className="text-primary ml-0.5" fill="currentColor" />
              </div>
              {language === 'ka' ? 'ვიდეოს ნახვა' : 
               language === 'ru' ? 'Смотреть видео' :
               language === 'uk' ? 'Дивитися відео' :
               language === 'ar' ? 'شاهد الفيديو' :
               language === 'he' ? 'צפה בווידאו' : 'Watch Video'}
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white/30"
      >
        <ChevronDown size={32} />
      </motion.div>
      
      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1.05); }
          50% { transform: scale(1.1); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 20s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
}
