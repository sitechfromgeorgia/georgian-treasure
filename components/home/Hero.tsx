'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

const images = [
  '/images/batumi/aerial-coastline.jpg',
  '/images/batumi/night-beach.jpg',
  '/images/batumi/night-skyline.jpg',
  '/images/batumi/sunset-sea.jpg',
];

export function Hero() {
  const { language, t, isRTL } = useLanguage();
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Animated Background Slideshow */}
      {images.map((img, idx) => (
        <div
          key={img}
          className="absolute inset-0 z-0 transition-opacity duration-[2000ms] ease-in-out"
          style={{ opacity: currentImage === idx ? 1 : 0 }}
        >
          <img
            src={img}
            alt="Batumi"
            className="w-full h-full object-cover scale-105"
            style={{
              animation: currentImage === idx ? 'kenburns 12s ease-in-out forwards' : 'none',
            }}
          />
        </div>
      ))}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/60 via-primary/30 to-primary/90 dark:from-black/80 dark:via-black/40 dark:to-zinc-950 transition-colors duration-500" />

      {/* Animated Particles / Bokeh */}
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-accent/20 blur-xl animate-float"
            style={{
              width: `${60 + i * 30}px`,
              height: `${60 + i * 30}px`,
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 1.5}s`,
              animationDuration: `${8 + i * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="w-20 h-1 gold-gradient mx-auto mb-8 rounded-full"
          />

          <motion.h1
            className={cn(
              "text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight tracking-tighter",
              isRTL ? "font-arabic" : ""
            )}
            style={{
              textShadow: '0 4px 30px rgba(0,0,0,0.5), 0 0 80px rgba(212,175,55,0.15)',
            }}
          >
            {t.hero.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-white/80 mb-10 font-light max-w-2xl mx-auto"
            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <a
              href="#booking"
              className="gold-gradient text-primary font-black px-12 py-5 rounded-full text-lg shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:shadow-[0_0_50px_rgba(212,175,55,0.5)] hover:scale-105 active:scale-95 transition-all relative overflow-hidden group"
            >
              <span className="relative z-10">{t.hero.cta}</span>
              {/* Shine effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            </a>
            <a
              href="#tours"
              className="glass text-white px-10 py-5 rounded-full text-lg flex items-center gap-3 hover:bg-white/20 transition-all active:scale-95 backdrop-blur-md border border-white/20"
            >
              {t.hero.watchVideo || (language === 'ka' ? 'ტურების ნახვა' : 'View Tours')}
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Image indicators */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentImage(idx)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-500",
              currentImage === idx ? "w-8 bg-accent" : "w-3 bg-white/30 hover:bg-white/50"
            )}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-white/30"
      >
        <ChevronDown size={32} />
      </motion.div>

      <style jsx global>{`
        @keyframes kenburns {
          0% { transform: scale(1.05); }
          100% { transform: scale(1.15); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          25% { transform: translateY(-30px) translateX(15px); opacity: 0.6; }
          50% { transform: translateY(-15px) translateX(-10px); opacity: 0.4; }
          75% { transform: translateY(-40px) translateX(20px); opacity: 0.5; }
        }
        .animate-float {
          animation: float 10s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
